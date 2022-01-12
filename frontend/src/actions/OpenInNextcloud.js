import Action from "./Action";
import { store } from '@/store/index';
import { NavBarIcons } from "@/util/NavBarIcons";

class OpenInNextcloud extends Action {

    constructor() {
        super("openInNextcloud", "Open in Nextcloud", NavBarIcons.OPEN);
    }

    setEnabled (enabled) {
        if(enabled) {
            let selected = store.getters.StateSelectedChildren;
            // Hide the button when there are more than 1 selected items
            if(Array.isArray(selected) && selected.length > 1) {
                this.enabled = false;
                return;
            }
        }
        this.enabled = enabled;
    }

    execute (pointerEvent) {
        console.log(pointerEvent);
        let selectedFiles = store.getters.StateSelectedChildren;
        let currentDirPath = store.getters.StatePath[store.getters.StatePath.length-1].path;
        let matchUntilDotComRegex = /.*com/;
        let currentDirPathSuffix = currentDirPath.replace(matchUntilDotComRegex, '');
        // One selected item
        if (selectedFiles.length == 1) {
            let selectedFilesPathSuffix = selectedFiles[0].path.replace(matchUntilDotComRegex, '');
            if (selectedFiles[0].directory) {
                window.open(process.env.VUE_APP_NEXTCLOUD_BASE_URL + "index.php/apps/files?dir=//" + selectedFilesPathSuffix, "_blank");
            } else {
                window.open(process.env.VUE_APP_NEXTCLOUD_BASE_URL + "index.php/apps/files?dir=//" + currentDirPathSuffix, "_blank");
            }
        // No selected items 
        } else {
            window.open(process.env.VUE_APP_NEXTCLOUD_BASE_URL + "index.php/apps/files?dir=//" + currentDirPathSuffix, "_blank");
        }
    }
}
export default OpenInNextcloud;