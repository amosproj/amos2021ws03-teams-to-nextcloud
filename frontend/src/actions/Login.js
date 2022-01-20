import Action from "./Action";
import { store } from '@/store/index';
import { NavBarIcons } from "@/util/NavBarIcons";

class Login extends Action {

    constructor() {
        super("login", "Login", NavBarIcons.LOGIN);
    }

    setEnabled(enabled) {
        // Login in only available when the user is not authenticated
        if (enabled) {
            let isAuthenticated = store.getters.isAuthenticated;
            // If the user is authenticated -> set disabled
            if(isAuthenticated) {
                return super.setEnabled(false);
            }
        }
        return super.setEnabled(enabled);
    }

    execute() {
        store.dispatch("initLogin");
    }
}
export default Login;