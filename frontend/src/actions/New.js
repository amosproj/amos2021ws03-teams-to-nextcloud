import Action from "./Action";
import { store } from '@/store/index';

class New extends Action {

    constructor() {
        super("new", "New", "M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z");
    }

    setEnabled(enabled) {
        if (enabled) {
            let selected = store.getters.StateSelectedChildren;
            // If there are selected items -> Set disabled
            if (Array.isArray(selected) && selected.length) {
                return super.setEnabled(false);
            }
        }
        return super.setEnabled(enabled);
    }

    execute() {
        store.commit("setIsModalVisible", true);
    }
}

export default New;
