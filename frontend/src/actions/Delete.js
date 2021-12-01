import Action from "./Action";
import { store } from '@/store/index';

class Delete extends Action {

    constructor() {
        super("delete", "Delete", "./images/delete-button.svg");
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

    async execute (pointerEvent) {
        console.log(pointerEvent);
        let client = store.getters.StateWebdavClient;
        let selected = store.getters.StateSelectedChildren;
        for (let i = 0; i < selected.length; i++) {
            await client.deleteFile(selected[i].path);
        }
        store.dispatch("loadChildrenForPath");
    }
}
export default Delete;