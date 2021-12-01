import Action from "./Action";
import { app } from '@/main'
import { store } from '@/store/index';

class Upload extends Action {
    // Emiter for the events
    emitter = null;

    constructor() {
        super("upload", "Upload", "./images/upload-button.svg");
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