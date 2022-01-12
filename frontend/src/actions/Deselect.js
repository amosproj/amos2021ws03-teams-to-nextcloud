import Action from "./Action";
import { store } from '@/store/index';
import { NavBarIcons } from "@/util/NavBarIcons";

class Deselect extends Action {

    constructor() {
        super("deselect", "0 selected", NavBarIcons.DESELECT);
    }

    setEnabled (enabled) {
        if(enabled) {
            let selected = store.getters.StateSelectedChildren;
            // Show the delete button only when there are selected items
            if(Array.isArray(selected) && selected.length == 0) {
                this.enabled = false;
                return;
            }
            this.name = `${selected.length} selected`
        }
        this.enabled = enabled;
    }

    async execute () {
        let selected = store.getters.StateSelectedChildren;
        selected.forEach(child =>{
            child.selected = false;
        })
    }
}
export default Deselect;
