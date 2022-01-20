import Action from "./Action";
import { store } from '@/store/index';
import { NavBarIcons } from "@/util/NavBarIcons";

class CopyLink extends Action {

    constructor() {
        super("copyLink", "Copy Link", NavBarIcons.LINK);
    }

    setEnabled (enabled) {
        if (enabled) {
            let children = store.getters.StateSelectedChildren;
            // Only show, when only one object is selected
            if (children.length == 1) {
                return super.setEnabled(enabled);
            }
        }
        return super.setEnabled(false);
        
    }

    async execute () {
        store.commit("setIsCopyLinkModalVisible", true);
    }
}
export default CopyLink;