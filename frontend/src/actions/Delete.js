import Action from "./Action";
import { app } from '@/main'
import { store } from '@/store/index';
import { useToast } from "vue-toastification";
import { NavBarIcons } from "@/util/NavBarIcons";

class Delete extends Action {

    constructor() {
        super("delete", "Delete", NavBarIcons.DELETE);
    }

    setEnabled (enabled) {
        if(enabled) {
            let selected = store.getters.StateSelectedChildren;
            // Show the delete button only when there are selected items
            if(Array.isArray(selected) && selected.length == 0) {
                this.enabled = false;
                return;
            }
        }
        this.enabled = enabled;
    }

    async execute () {
        // Get toast interface for notifications
        let toast = useToast();
        
        let client = store.getters.StateWebdavClient;
        let selected = store.getters.StateSelectedChildren;
        let deletedFiles = 0;

        let emitter = app.config.globalProperties.emitter;
            
        // Show the progress bar when deleting
        emitter.emit("SHOW_PROGRESS_BAR", "Deleting " + selected.length + " item" + (selected.length == 1 ? "" : "s") + "...");
        
        for (let i = 0; i < selected.length; i++) {
            let currentFile = selected[i];
            await client.deleteFile(currentFile.path);
            deletedFiles++;

            // Fill the progress bar
            emitter.emit("PROGRESS_BAR_WIDTH", (deletedFiles / selected.length) * 100);
            
            // Show a notification
            toast.success("Deleted " + currentFile.name);
        }

        // Hide the progress bar when all the selected files have been deleted
        setTimeout(() => emitter.emit("HIDE_PROGRESS_BAR"), 1000);

        store.dispatch("loadChildrenForPath");
    }
}
export default Delete;