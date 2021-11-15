import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth';
import actions from './modules/actions'

export const store = createStore({
  modules: {
    auth,
    actions
  },
  plugins: [createPersistedState()]
});
