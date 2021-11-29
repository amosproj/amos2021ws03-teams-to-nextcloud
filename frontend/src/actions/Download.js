import Action from "./Action";
//import { app } from '@/main'
//import axios from 'axios';
import { store } from '@/store/index';

class Download extends Action {
    // Emiter for the events
    emitter = null;

    constructor() {
        super("download", "Download", "./images/download-button.svg");
    }

    setEnabled(enabled) {
        if(enabled){
            this.enabled = false;
            let children = store.getters.StateSelectedChildren;
            // Only show, when the object is an actual file
            for(let i = 0; i < children.length;i++){
                if(children[i].file){
                    this.enabled = enabled;
                }
            }
        }
    }
    
    async execute() {
        // Get all selected objects
        let children = store.getters.StateSelectedChildren;
        for(let i = 0; i< children.length;i++){
            // Check if selected objects are file elements
            if(children[i].file){
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
                // Build the correct path for the file
                directoryPath += children[i].name;
                // Receive file as arraybuffer object
                let buffer = new ArrayBuffer();
                buffer = await client.getFileContents(directoryPath);
                // Convert arraybuffer to blob object
                let blob = new Blob([buffer]);
                // Create a temporary link element
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = children[i].name;
                // Append the element on the document
                document.body.appendChild(link);
                // Trigger the element
                link.click();
                // Remove the elementfrom the document
                document.body.removeChild(link);
            }
        }
    }
}
export default Download;