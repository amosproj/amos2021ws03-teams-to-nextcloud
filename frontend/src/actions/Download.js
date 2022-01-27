import Action from "./Action";
import { store } from '@/store/index';
import { useToast } from "vue-toastification";
import { NavBarIcons } from "@/util/NavBarIcons";
import JSZip from "jszip";
import { saveAs } from 'file-saver';

class Download extends Action {

    constructor() {
        super("download", "Download", NavBarIcons.DOWNLOAD);
    }
    setEnabled(enabled) {
        if (enabled) {
            let children = store.getters.StateSelectedChildren;
            // Only show, when at least one file or directory is selected
            if (children.length != 0) {
                return super.setEnabled(enabled);
            }
        }
        return super.setEnabled(false);
    }
    async execute() {
        // Get the toast interface
        let toast = useToast();
        // Get webdav client
        let client = store.getters.StateWebdavClient;
        if (client == null) {
            return;
        }
        // Get path of present directory
        let path = store.getters.StatePath;
        let directoryPath = path[path.length - 1].path;
        if (directoryPath == null) {
            return;
        }
        // Check if present directory is in a subfolder, because then its missing a "/"
        if (!directoryPath.endsWith("/")) {
            directoryPath += "/";
        }
        // Filter out the items that are only files or directories
        let items = store.getters.StateSelectedChildren;
        let directory = items.filter(items => items.directory === true);
        let fileItems = items.filter(items => items.file === true);

        // Download all selected directories and zip them each
        for(let j = 0; j < directory.length; j++){
            // Get jszip library
            var zip = JSZip();
            // Build new path for child elements of directory
            let newPath = directoryPath + directory[j].name;
            // Get all items
            let allItems = await client.getDirectoryContents(newPath,{deep: true});
            // Iterate through all items
            for(let x = 0; x < allItems.length; x++){
                if(allItems[x].type === "directory"){
                    // Create a folder for all subdirectories
                    zip.folder(allItems[x].filename.replace(newPath+"/",""));
                }else if(allItems[x].type === "file"){
                    // Download all files inside the directory and add them to the zip file
                    const buff = await client.getFileContents(allItems[x].filename);
                    zip.file(allItems[x].filename.replace(newPath+"/",""),buff);
                }
            }

            // Download the zip file
            zip.generateAsync({type:"blob"})
                .then(function (blob) {
                saveAs(blob, directory[j].name+".zip");
                });
            }

        // Download all selected files
        for (let i = 0; i < fileItems.length; i++) {
            // Build the correct path for the file
            let filePath = directoryPath + fileItems[i].name;
            try {
                // Download the file as array buffer
                const buff = await client.getFileContents(filePath);
                // Convert array buffer to blob object
                let blob = new Blob([buff]);
                // Create a temporary link element
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.download = fileItems[i].name;
                // Append the element on the document
                document.body.appendChild(link);
                // Trigger a click event
                link.click();
                window.URL.revokeObjectURL(url);
            } catch (e) {
                // If the download failed, an error message will be displayed and resume with the next file
                toast.error("There was an error while trying to download: " + fileItems[i].name);
                continue;
            }
        }
    }
}
export default Download;