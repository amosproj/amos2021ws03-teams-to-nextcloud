import axios from 'axios';
const { createClient } = require("webdav");
import { useToast } from "vue-toastification";
const toast = useToast();

const state = {
    username: null,
    password: null,
    webdavClient: null
};

const getters = {
    /**
     * Checks if the user is autheticated.
     */
    isAuthenticated: function (state) {
        return state.username != null;
    },

    /**
     * Returns the username of the currently logged in user.
     */
    StateUsername: function (state) {
        return state.username;
    },

    /**
     * Returns a webdav client to the NextCloud instnace.
     */
    StateWebdavClient: function (state) {
        return state.webdavClient;
    }
};

const actions = {
    /**
     * Initiates the login v2 procedures.
     * 
     * Reference:
     * https://docs.nextcloud.com/server/latest/developer_manual/client_apis/LoginFlow/index.html#login-flow-v2
     */
    async initLogin({ dispatch }) {
      try{
        const response = await axios.post('index.php/login/v2');
        dispatch('openDefaultBrowser', response.data.login);
        dispatch('pollEndpoint', response.data.poll);
      }
      catch (error){
        console.error(error)
        toast.error(`There was an error while opening the login page: ${error.message}.\nContact the admin of your nextcloud instance if this error persists.`);
      }
    },

    /**
     * Opens the given url in the default browser.
     */
    async openDefaultBrowser(_, strUrl) {
        window.open(strUrl, '_blank', 'noopener noreferrer nofollow');
    },

    /**
     * Starts polling the NextCloud endpoint with the token which we got.
     * When the user completes the login in the browser, we commit the setUser() mutation with the username.
     */
    async pollEndpoint({ dispatch, commit, getters }, poll) {
      try{

        const response = await axios.post(poll.endpoint, { token: poll.token }, { validateStatus: false });
        // If the response status is 404 -> Poll again after 3 seconds
        if (response.status == 404) {
          setTimeout(function () { dispatch('pollEndpoint', poll) }, 3000);
        }
        //-- If the response is 200 -> Save the user data
        else if (response.status == 200) {
          // Create a Webdav client
          await dispatch("initWebdavClient", response.data);
          // Commit the user once we have the webdav client
          if (getters.StateWebdavClient != null) {
            commit("setUser", response.data);
          }
        }
        else{
          toast.error(`Unexpected response from Nextcloud: ${response.status} ${response.statusText}`);
        }
      }
      catch (error){
        toast.error(`There was an error while opening the login page: ${error.message}.\nContact the admin of your nextcloud instance if this error persists.`);
      }
    },

    /**
     * Initiates a client connection to the webdav endpoint of the NextClound instance and save this connection in the store.
     */
    async initWebdavClient({ commit }, data) {
        try {
            let username = data.loginName;
            let password = data.appPassword;
            //process.env.<varname>
            const client = createClient(process.env.VUE_APP_NEXTCLOUD_BASE_URL + "remote.php/dav", {
                username: username,
                password: password
            });
            commit("setWebdavClient", client);
        } catch (e) {
          toast.error(`An Error occured while initializing connection to Nextcloud: ${e.message}`);
        }
    },

    /**
     * Refreshes the webdav client connection if the user is authenticated.
     */
    async refreshWebdavClient({ dispatch, state }) {
        let data = {
            loginName: state.username,
            appPassword: state.password,
        }
        await dispatch("initWebdavClient", data);
    },

    /**
     * Commits the logout. Internally the user data gets cleared.
     */
    async logout({ commit }) {
        commit('logout');
    }
};

const mutations = {
    /**
     * Sets the current user from the response we get at the end of the login flow v2.
     */
    setUser(state, data) {
        state.username = data.loginName;
        state.password = data.appPassword;
    },

    /**
     * Saves the newly created webdav client in the vuex store.
     */
    setWebdavClient(state, client) {
        state.webdavClient = client;
    },

    /**
     * Clears the current user data
     */
    logout(state) {
        state.username = null;
        state.password = null;
        state.webdavClient = null;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
