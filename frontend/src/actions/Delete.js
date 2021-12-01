import Action from "./Action";
import { store } from '@/store/index';

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