import Action from "./Action";
import { store } from '@/store/index';

class CopyLink extends Action {

    constructor() {
        super("copyLink", "CopyLink", "M13.723 18.654l-3.61 3.609c-2.316 2.315-6.063 2.315-8.378 0-1.12-1.118-1.735-2.606-1.735-4.188 0-1.582.615-3.07 1.734-4.189l4.866-4.865c2.355-2.355 6.114-2.262 8.377 0 .453.453.81.973 1.089 1.527l-1.593 1.592c-.18-.613-.5-1.189-.964-1.652-1.448-1.448-3.93-1.51-5.439-.001l-.001.002-4.867 4.865c-1.5 1.499-1.5 3.941 0 5.44 1.517 1.517 3.958 1.488 5.442 0l2.425-2.424c.993.284 1.791.335 2.654.284zm.161-16.918l-3.574 3.576c.847-.05 1.655 0 2.653.283l2.393-2.389c1.498-1.502 3.94-1.5 5.44-.001 1.517 1.518 1.486 3.959 0 5.442l-4.831 4.831-.003.002c-1.438 1.437-3.886 1.552-5.439-.002-.473-.474-.785-1.042-.956-1.643l-.084.068-1.517 1.515c.28.556.635 1.075 1.088 1.528 2.245 2.245 6.004 2.374 8.378 0l4.832-4.831c2.314-2.316 2.316-6.062-.001-8.377-2.317-2.321-6.067-2.313-8.379-.002z");
    }

    setEnabled (enabled) {
        if (enabled) {
            let children = store.getters.StateSelectedChildren;
            // Only show, when there one object is selected
            if (children.length == 1) {
                return super.setEnabled(enabled);
            }
        }
        return super.setEnabled(false);
        
    }

    async execute (pointerEvent) {
        console.log(pointerEvent);
        let client = store.getters.StateWebdavClient;
        let path = store.getters.StatePath;
        let directoryPath = path[path.length - 1].path;
        if (directoryPath == null) {
            return;
        }
        let dir = "";
        // Check if we are in a subfolder or not
        if (!directoryPath.endsWith("/")) {
            directoryPath += "/";
            // extracts the directory, also deletes last slash in string for clipboard link
            dir = directoryPath.split(path[0].path)[1].slice(0,-1);
        }
        // Builds path with directory path + fileName
        let filePath = directoryPath + store.getters.StateSelectedChildren[0].name;
        const response = await client.customRequest(filePath, { 
            method: "PROPFIND",
            data: '<?xml version="1.0" encoding="UTF-8"?><d:propfind xmlns:d="DAV:"><d:prop xmlns:oc="http://owncloud.org/ns"><oc:fileid/></d:prop> </d:propfind>'
        });
        // Splits the response after the first fileId tag and after the second one to receive the fileId
        let fileId = response.data.split("<oc:fileid>")[1].split("</oc:fileid>")[0];
        // Builds link 
        let clipboardlink = process.env.VUE_APP_NEXTCLOUD_BASE_URL + "index.php/apps/files?dir=/"+dir+"&openfile="+fileId;
        // Copy link to clipboard
        await navigator.clipboard.writeText(clipboardlink);
    }
}
export default CopyLink;