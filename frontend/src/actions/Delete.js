import Action from "./Action";
import { app } from '@/main'
import { store } from '@/store/index';
import { useToast } from "vue-toastification";

class Delete extends Action {

    constructor() {
        super("delete", "Delete", "M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm0-19h-14v16.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5zm-9 4c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm-2-7h-4v1h4v-1z");
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