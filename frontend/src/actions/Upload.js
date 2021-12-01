import Action from "./Action";
import { app } from '@/main'
import { store } from '@/store/index';

class Upload extends Action {
    // Emiter for the events
    emitter = null;

    constructor() {
        super("upload", "Upload", "M16 16h-3v5h-2v-5h-3l4-4 4 4zm3.479-5.908c-.212-3.951-3.473-7.092-7.479-7.092s-7.267 3.141-7.479 7.092c-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h3.5v-2h-3.5c-1.93 0-3.5-1.57-3.5-3.5 0-2.797 2.479-3.833 4.433-3.72-.167-4.218 2.208-6.78 5.567-6.78 3.453 0 5.891 2.797 5.567 6.78 1.745-.046 4.433.751 4.433 3.72 0 1.93-1.57 3.5-3.5 3.5h-3.5v2h3.5c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408z");
    }

    setEnabled(enabled) {
        // Upload is available only in current directory
        if (enabled) {
            let selected = store.getters.StateSelectedChildren;
            // If there are selected items -> Set disabled
            if (Array.isArray(selected) && selected.length) {
                return super.setEnabled(false);
            }
        }
        return super.setEnabled(enabled);
    }
    
    execute() {
        // The first time the emitter is null -> Initialize it and add FILE_UPLOAD-listener ONLY ONCE
        if (this.emitter === undefined || this.emitter === null) {
            // Get the emitter 
            this.emitter = app.config.globalProperties.emitter;
            // Remove all handlers for FILE_UPLOAD. There should be only one!!!
            this.emitter.off("FILE_UPLOAD");
            // Register a handler for FILE_UPLOAD events
            this.emitter.on("FILE_UPLOAD", async function (fileList) {
                // Get the webdav connection
                let client = store.getters.StateWebdavClient;
                if (client == null) {
                    return;
                }
                // Get the path to the parent directory
                let path = store.getters.StatePath;
                let lastDirectory = path[path.length - 1];
                if (lastDirectory == null) {
                    return;
                }
                let directoryPath = lastDirectory.path + ((lastDirectory.path.endsWith("/")) ? "" : "/");

                // Iterate over the files and upload them one by one
                for (let i = 0; i < fileList.length; i++) {
                    let currentFile = fileList[i];

                    // Check if the file already exists on the server
                    let exists = await client.exists(directoryPath + currentFile.name);
                    if (exists === true) {
                        let emitter = app.config.globalProperties.emitter;
                        emitter.emit("UPLOAD_FINISHED", { success: false, message: "1 item wasn't uploaded to " + lastDirectory.name + ": " + currentFile.name });
                        // Skip the item
                        continue;
                    }

                    // Read the file contents
                    const reader = new FileReader();
                    reader.onload = async function (res) {
                        // Write the data to the remote file
                        let emitter = app.config.globalProperties.emitter;
                        let result = await client.putFileContents(directoryPath + currentFile.name, res.target.result, {
                            onUploadProgress: progress => {
                                emitter.emit("UPLOAD_PROGRESS", progress.loaded);
                            },
                        });
                        // Was the upload successful?
                        if (result == true) {
                            emitter.emit("UPLOAD_FINISHED", { success: true, message: "Uploaded one item to " + lastDirectory.name + ": " + currentFile.name });
                            // Load the children again
                            store.dispatch("loadChildrenForPath");
                        } else {
                            emitter.emit("UPLOAD_FINISHED", { success: false, message: "1 item wasn't uploaded to " + lastDirectory.name + ": " + currentFile.name });
                        }
                    };
                    reader.onerror = function (err) {
                        console.log(err);
                    }
                    reader.readAsArrayBuffer(currentFile);
                }
            });
        }
        // Get the emitter and send an OPEN_FILE_DIALOG event
        this.emitter.emit("OPEN_FILE_DIALOG");
    }
}
export default Upload;