import Action from "./Action";
import { store } from '@/store/index';
import { NavBarIcons } from "@/util/NavBarIcons";

class Rename extends Action {

    constructor() {
        super("rename", "Rename", NavBarIcons.RENAME);
    }

    setEnabled(enabled) {
      if(enabled) {
        //-- If selected children 0 or more than 1 -> disable the action
        if (store.getters.StateSelectedChildren.length !== 1) {
          this.enabled = false;
          return;
        }
      }
      this.enabled = enabled;
    }
    
    execute() {
        store.commit("setIsRenameModalVisible", true);
    }
}
export default Rename;
