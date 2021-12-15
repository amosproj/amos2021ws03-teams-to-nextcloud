import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth';
import actions from './modules/actions'
import files from './modules/files';
import views from './modules/views';

export const store = createStore({
  modules: {
    auth,
    actions,
    files,
    views
  },
  plugins: [createPersistedState({
    paths: ["auth", "views"]
  })]
});
