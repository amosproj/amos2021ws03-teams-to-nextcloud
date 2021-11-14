import axios from 'axios';

const state = {
    user: null,
    password: null
};

const getters = {
    /**
     * Checks if the user is autheticated.
     */
    isAuthenticated: function(state) {
        return state.user != null;
    }
};

const actions = {
    /**
     * Initiates the login v2 procedures.
     * 
     * Reference:
     * https://docs.nextcloud.com/server/latest/developer_manual/client_apis/LoginFlow/index.html#login-flow-v2
     */
    async initLogin({dispatch}) {
        const response = await axios.post('index.php/login/v2');
        dispatch('openDefaultBrowser', response.data.login);
        dispatch('pollEndpoint', response.data.poll);
    },
    
    /**
     * Opens the given url in the default browser.
     */
    async openDefaultBrowser(_, strUrl) {
        window.open(strUrl, '_blank');
    },

    /**
     * Starts polling the NextCloud endpoint with the token which we got.
     * When the user completes the login in the browser, we commit the setUser() mutation with the username.
     */
    async pollEndpoint({dispatch, commit}, poll) {
        const response = await axios.post(poll.endpoint, {token: poll.token}, {validateStatus: false});
        console.log(response);
        // If the response status is 404 -> Poll again after 3 second
        if(response.status == 404) {
            setTimeout(function(){ dispatch('pollEndpoint', poll) }, 3000);
        }
        //-- If the response is 200 -> Save the user data
        if(response.status == 200) {
            commit("setUser", response.data);
        }
    },

    /**
     * Commits the logout. Internally the user data gets cleared.
     */
    async logout({commit}){
        commit('logout');
    }
};

const mutations = {
    /**
     * Sets the current user from the response we get at the end of the login flow v2.
     */
    setUser(state, data) {
        state.user = data.loginName;
        state.password = data.appPassword;
    },

    /**
     * Clears the current user
     */
    logout(state){
        state.user = null;
    }
};

export default {
  state,
  getters,
  actions,
  mutations
};
