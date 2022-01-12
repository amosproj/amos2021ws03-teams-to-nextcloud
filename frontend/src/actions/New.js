import Action from "./Action";
import { store } from '@/store/index';
import { NavBarIcons } from "@/util/NavBarIcons";

class New extends Action {

    constructor() {
        super("new", "New", NavBarIcons.CREATE);
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
        store.commit("setIsCreateModalVisible", true);
    }
}

export default New;
