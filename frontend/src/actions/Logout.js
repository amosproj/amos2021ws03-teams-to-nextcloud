import Action from "./Action";
import { store } from '@/store/index';
import { NavBarIcons } from "@/util/NavBarIcons";

class Logout extends Action {

    constructor() {
        super("logout", "Logout", NavBarIcons.LOGOUT);
    }

    setEnabled(enabled) {
        // Logout is only enabled when the user is authenticated
        if (enabled) {
            let isAuthenticated = store.getters.isAuthenticated;
            // If the user is not authenticated -> set disabled
            if(!isAuthenticated) {
                return super.setEnabled(false);
            }
        }
        return super.setEnabled(enabled);
    }
    
    execute() {
        store.dispatch("logout");
    }
}
export default Logout;