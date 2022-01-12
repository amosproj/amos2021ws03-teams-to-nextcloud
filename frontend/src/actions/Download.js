import Action from "./Action";
import { store } from '@/store/index';
import { useToast } from "vue-toastification";
import { NavBarIcons } from "@/util/NavBarIcons";

class Download extends Action {

    constructor() {
        super("download", "Download", NavBarIcons.DOWNLOAD);
    }
    setEnabled(enabled) {
        if (enabled) {
            let children = store.getters.StateSelectedChildren;
            let files = children.filter(child => child.file === true);
            // Only show, when there are selected files and all of them are actually files and not directories
            if (children.length != 0 && children.length === files.length) {
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
        // Filter out the items that are only files
        let items = store.getters.StateSelectedChildren;
        let fileItems = items.filter(items => items.file === true);

        // Start downloading process for every file
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