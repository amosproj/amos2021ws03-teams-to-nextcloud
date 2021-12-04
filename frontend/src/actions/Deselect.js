import Action from "./Action";
import { store } from '@/store/index';

class Deselect extends Action {

    constructor() {
        super("deselect", "0 selected", "m7.5 4.4a1.25 1.25 90 011.77 0l6.615 6.6175 6.615-6.6175a1.25 1.25 90 011.77 1.77l-6.6175 6.615 6.6175 6.615a1.25 1.25 90 01-1.77 1.77l-6.615-6.6175-6.615 6.6175a1.25 1.25 90 01-1.77-1.77l6.6175-6.615-6.6175-6.615a1.25 1.25 90 010-1.77z");
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
