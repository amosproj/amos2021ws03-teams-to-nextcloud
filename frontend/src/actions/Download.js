import Action from "./Action";
import { app } from '@/main'
import { store } from '@/store/index';
import { useToast } from "vue-toastification";

class Download extends Action {
    // Emiter for the events
    emitter = null;

    constructor() {
        super("download", "Download", "./images/download-button.svg");
    }

    setEnabled(enabled) {
        if(enabled){
            let children = store.getters.StateSelectedChildren;
            // Only show, when the object is an actual file
            for(let i = 0; i < children.length;i++){
                if(children[i].file){
                    return super.setEnabled(enabled);
                }
            }
            return super.setEnabled(false);
        }
    }
    
    execute() {
        // Check if the emitter is null, if so initialize it
        if (this.emitter === undefined || this.emitter === null) {
            // Get the emitter 
            this.emitter = app.config.globalProperties.emitter;
        }
        // Get the toast interface
        let toast = useToast();
        // Get webdav client
        let client = store.getters.StateWebdavClient;
        if(client == null){
            return;
        }
        // Get path of present directory
        let path = store.getters.StatePath;
        let directoryPath = path[path.length - 1].path;
        if(directoryPath == null){
            return;
        }
        // Check if present directory is in a subfolder, because then its missing a "/"
        if(!directoryPath.endsWith("/")){
            directoryPath += "/";
        }

        // Filter out the items that are only files
        let items = store.getters.StateSelectedChildren;
        let fileItems = items.filter(items => items.file == true);
        // Start with the progress bar
        this.emitter.emit("SHOW_PROGRESS_BAR", "Downloading " + fileItems.length + " item" + (fileItems.length == 1 ? "" : "s") + "...");
        // Start downloading process for every file
        for(let i = 0; i< fileItems.length;i++){
            // Build the correct path for the file
            let filePath = directoryPath + fileItems[i].name;
            try{
                // Receive file as arraybuffer object
                let buffer = new ArrayBuffer();
                const call = async () => {
                    buffer = await client.getFileContents(filePath);
                }
                // Update the progress bar 
                call().then(this.emitter.emit("PROGRESS_BAR_WIDTH", (i+1/fileItems.length)*100));
                // Convert arraybuffer to blob object
                let blob = new Blob([buffer]);
                // Create a temporary link element
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = fileItems[i].name;
                // Append the element on the document
                document.body.appendChild(link);
                // Trigger the element
                link.click();
                // Remove the elementfrom the document
                document.body.removeChild(link);
            }catch(e){
                // If the download failed, an error message will be displayed and resume with the next file
                toast.error("There was an error while trying to download: "+fileItems[i].name);
                continue;
            }
            // Send message including the filename
            toast.success(fileItems[i].name+ " was downloaded");
        }
        // Hide the message after 1 second
        setTimeout(() => this.emitter.emit("HIDE_PROGRESS_BAR"), 1000);
    }
}
export default Download;