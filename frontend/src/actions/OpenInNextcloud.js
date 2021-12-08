import Action from "./Action";
import { store } from '@/store/index';

class OpenInNextcloud extends Action {

    constructor() {
        super("openInNextcloud", "Open in Nextcloud", "M16.027 8.713c-3.333 0-6.136 2.287-6.991 5.355-0.744-1.641-2.391-2.808-4.301-2.808-2.609 0.016-4.724 2.131-4.735 4.74 0.011 2.609 2.125 4.724 4.735 4.74 1.911 0 3.552-1.167 4.301-2.813 0.855 3.073 3.657 5.36 6.991 5.36 3.312 0 6.099-2.26 6.973-5.308 0.755 1.615 2.375 2.761 4.26 2.761 2.615-0.016 4.729-2.131 4.74-4.74-0.011-2.609-2.125-4.724-4.74-4.74-1.885 0-3.505 1.147-4.265 2.761-0.869-3.048-3.656-5.308-6.968-5.308zM16.027 11.495c2.5 0 4.5 2 4.5 4.505s-2 4.505-4.5 4.505c-2.496 0.011-4.516-2.016-4.505-4.505 0-2.505 2-4.505 4.505-4.505zM4.735 14.041c1.099 0 1.959 0.86 1.959 1.959s-0.86 1.959-1.959 1.959c-1.084 0.011-1.969-0.876-1.953-1.959 0-1.099 0.859-1.959 1.953-1.959zM27.26 14.041c1.1 0 1.959 0.86 1.959 1.959s-0.859 1.959-1.959 1.959c-1.083 0.011-1.963-0.876-1.953-1.959 0-1.099 0.86-1.959 1.953-1.959z");
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
            let selectedFilesPathSuffix = selectedFiles[0].path.replace(new RegExp('.*' + "com"), '');
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