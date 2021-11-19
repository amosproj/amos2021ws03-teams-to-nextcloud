import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth';
import actions from './modules/actions'
import files from './modules/files';

export const store = createStore({
  modules: {
    auth,
    actions,
    files
  },
  plugins: [createPersistedState({
    paths: ["auth"]
  })]
});
