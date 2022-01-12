import Action from "./Action";
import { store } from '@/store/index';
import { parseXML } from 'webdav';
import { NavBarIcons } from "@/util/NavBarIcons";

class CopyLink extends Action {

    constructor() {
        super("copyLink", "Copy Link", NavBarIcons.LINK);
    }

    setEnabled (enabled) {
        if (enabled) {
            let children = store.getters.StateSelectedChildren;
            // Only show, when only one object is selected
            if (children.length == 1) {
                return super.setEnabled(enabled);
            }
        }
        return super.setEnabled(false);
        
    }

    async execute () {
        let client = store.getters.StateWebdavClient;
        let path = store.getters.StatePath;
        let directoryPath = path[path.length - 1].path;
        if (directoryPath == null) {
            return;
        }
        let directoryClipboard = "";
        // Checks if the selected object is in a subfolder or not
        if (!directoryPath.endsWith("/")) {
            // If selected object is in a subfolder, adjust path
            directoryPath += "/";
            // Extracts the name of the directory, also deletes last slash in string for clipboard link
            directoryClipboard = directoryPath.split(path[0].path)[1].slice(0,-1);
        }
        // Builds path with directory path + fileName
        let filePath = directoryPath + store.getters.StateSelectedChildren[0].name;
        const response = await client.customRequest(filePath, { 
            method: "PROPFIND",
            data: '<?xml version="1.0" encoding="UTF-8"?><d:propfind xmlns:d="DAV:"><d:prop xmlns:oc="http://owncloud.org/ns"><oc:fileid/></d:prop> </d:propfind>'
        });
        // Splits the response after the first fileId tag and after the second one to receive the fileId
        const xmlData = await parseXML(response.data);
        let fileId = xmlData.multistatus.response[0].propstat.prop.fileid;
        // Builds link for clipboard 
        let clipboardLink = process.env.VUE_APP_NEXTCLOUD_BASE_URL + "index.php/apps/files?dir=/"+directoryClipboard+"&openfile="+fileId;
        // Copy link to clipboard
        await navigator.clipboard.writeText(clipboardLink);
    }
}
export default CopyLink;