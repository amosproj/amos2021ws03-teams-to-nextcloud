import Action from "./Action";
import { store } from '@/store/index';

class OpenInNextcloud extends Action {

    constructor() {
        super("openInNextcloud", "Open in Nextcloud", "./images/nextcloud-button.svg");
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
        let currentDir = store.getters.StatePath[store.getters.StatePath.length-1].name;
        // One selected item
        if (selectedFiles.length == 1) {
            if (selectedFiles[0].directory) {
                window.open(process.env.VUE_APP_NEXTCLOUD_BASE_URL + "index.php/apps/files?dir=//" + selectedFiles[0].name, "_blank");
            } else {
                window.open(process.env.VUE_APP_NEXTCLOUD_BASE_URL + "index.php/apps/files?dir=//" + currentDir, "_blank");
            }
        // No selected items 
        } else {
            window.open(process.env.VUE_APP_NEXTCLOUD_BASE_URL + "index.php/apps/files?dir=//" + currentDir, "_blank");
        }
    }
}
export default OpenInNextcloud;