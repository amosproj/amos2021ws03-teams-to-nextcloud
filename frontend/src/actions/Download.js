import Action from "./Action";
import { store } from '@/store/index';
import { useToast } from "vue-toastification";
import { NavBarIcons } from "@/util/NavBarIcons";
import JSZip from "jszip";
import { saveAs } from 'file-saver';
import { app } from '@/main'

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
        // Get the toast interface and progress bar
        let toast = useToast();
        let emitter = app.config.globalProperties.emitter;
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

        // String builder (singular/plural) for progress bar message
        let msg = "";
        let msgStart = "Downloading ";
        let bothTypes = directory.length > 0 && fileItems.length > 0 ? true : false ;
        let folderCount = directory.length > 0 ? (directory.length == 1 ? (directory.length+" folder") : (directory.length+" folders")) : ("");
        let msgMiddle = bothTypes ? (" and ") : ("") ;
        let filesCount = fileItems.length > 0 ? (fileItems.length == 1 ? (fileItems.length+" file") : (fileItems.length+" files")) : ("");
        let overallitems = directory.length+fileItems.length;
        // Show progress bar while downloading files and creating zip
        emitter.emit("SHOW_PROGRESS_BAR", msgStart+folderCount+msgMiddle+filesCount);
        console.log( msgStart+folderCount+msgMiddle+filesCount);

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

            // Progress bar for folders, check if files message is needed
            msg = bothTypes ? msgStart+(j+1+"/")+folderCount+msgMiddle+0+"/"+filesCount : msgStart+(j+1+"/")+folderCount ;
            emitter.emit("SHOW_PROGRESS_BAR", msg);
            emitter.emit("PROGRESS_BAR_WIDTH", (((j+1)/(overallitems))*100));
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
            // Progress bar for files and check if folder message is needed
            msg = bothTypes ?  msgStart+(directory.length)+"/"+folderCount+msgMiddle+(i+1+"/")+filesCount : msgStart+(i+1+"/")+filesCount ;
            emitter.emit("SHOW_PROGRESS_BAR", msg);
            emitter.emit("PROGRESS_BAR_WIDTH", (((i+1+directory.length)/(overallitems))*100));
        }
        // Hide the progress bar once download is completed
        setTimeout(() => emitter.emit("HIDE_PROGRESS_BAR"), 1000);
    }
}
export default Download;