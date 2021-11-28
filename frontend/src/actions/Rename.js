import Action from "./Action";
import { store } from '@/store/index';

class Rename extends Action {
    // Emiter for the events
    emitter = null;

    constructor() {
        super("rename", "Rename", "./images/rename-button.svg");
    }
    setEnabled(enabled) {
      if(enabled) {
        //-- If selected children 0 or more than 1 -> disable the action
        if(store.getters.StateSelectedChildren.length != 1) {
          this.enabled = false;
          return;
        }
      }
      this.enabled = enabled;
    }
    execute() {
      let selectedFiles = store.getters.StateSelectedChildren;
      if(selectedFiles.length == 1){
        selectedFiles[0].inEdit = !selectedFiles[0].inEdit;
      }
    }
}
export default Rename;
