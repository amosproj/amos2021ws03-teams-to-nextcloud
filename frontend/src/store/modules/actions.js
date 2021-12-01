import {store} from '@/store/index';
import axios from 'axios';
import New from '@/actions/New';
import Upload from '@/actions/Upload';
import Rename from '@/actions/Rename';
import OpenInNextcloud from '@/actions/OpenInNextcloud';
import Delete from '@/actions/Delete';

const state = {
    isModalVisible: false,
    actions: [
        new New(),
        new Upload(),
        new Rename(),
        {
            name: "Copy link",
            img: "M13.723 18.654l-3.61 3.609c-2.316 2.315-6.063 2.315-8.378 0-1.12-1.118-1.735-2.606-1.735-4.188 0-1.582.615-3.07 1.734-4.189l4.866-4.865c2.355-2.355 6.114-2.262 8.377 0 .453.453.81.973 1.089 1.527l-1.593 1.592c-.18-.613-.5-1.189-.964-1.652-1.448-1.448-3.93-1.51-5.439-.001l-.001.002-4.867 4.865c-1.5 1.499-1.5 3.941 0 5.44 1.517 1.517 3.958 1.488 5.442 0l2.425-2.424c.993.284 1.791.335 2.654.284zm.161-16.918l-3.574 3.576c.847-.05 1.655 0 2.653.283l2.393-2.389c1.498-1.502 3.94-1.5 5.44-.001 1.517 1.518 1.486 3.959 0 5.442l-4.831 4.831-.003.002c-1.438 1.437-3.886 1.552-5.439-.002-.473-.474-.785-1.042-.956-1.643l-.084.068-1.517 1.515c.28.556.635 1.075 1.088 1.528 2.245 2.245 6.004 2.374 8.378 0l4.832-4.831c2.314-2.316 2.316-6.062-.001-8.377-2.317-2.321-6.067-2.313-8.379-.002z",
            enabled: true,
            isEnabled: function () {
                return this.enabled;
            },
            setEnabled: function (enabled) {
                this.enabled = enabled;
            },
            execute: function (pointerEvent) {
                console.log(pointerEvent);
                console.log("Pressed: Copy link");
            }
        },
        {
            name: "Download",
            img: "M12 5c3.453 0 5.891 2.797 5.567 6.78 1.745-.046 4.433.751 4.433 3.72 0 1.93-1.57 3.5-3.5 3.5h-13c-1.93 0-3.5-1.57-3.5-3.5 0-2.797 2.479-3.833 4.433-3.72-.167-4.218 2.208-6.78 5.567-6.78zm0-2c-4.006 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408-.212-3.951-3.473-7.092-7.479-7.092zm-4 10h3v-4h2v4h3l-4 4-4-4z",
            enabled: true,
            isEnabled: function () {
                return this.enabled;
            },
            setEnabled: function (enabled) {
                if(enabled){
                    this.enabled = false;
                    let children = store.getters.StateSelectedChildren;
                    // only show, when the object is an actual file
                    for(let i = 0; i < children.length;i++){
                        if(children[i].file){
                            this.enabled = enabled;
                        }
                    }
                }
            },
            execute: function (pointerEvent) {
                console.log(pointerEvent);
                let children = store.getters.StateSelectedChildren;
                for(let i = 0; i< children.length;i++){
                    if(children[i].file){
                        let child = children[i];
                        let client = store.getters.StateWebdavClient;
                        let downloadLink = client.getFileDownloadLink(child.name);
                        let dir = child.path.split(store.getters.StateUsername);
                        downloadLink = downloadLink.split("dav")[0];
                        downloadLink = downloadLink.concat("webdav"+dir[1]);
                        axios({
                            url:  downloadLink,
                            method: 'GET',
                            responseType: 'blob',
                        }).then((response) => {
                            const url = window.URL.createObjectURL(new Blob([response.data]));
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', child.name);
                            document.body.appendChild(link);
                            link.click();
                        });
                    }
                }
            }
        },
        new OpenInNextcloud(),
        new Delete()
    ],
};

const getters = {
    StateActions: function (state) {
        return state.actions;
    },

    StateEnabledActions: function(state) {
        // Get all actions
        let actions = state.actions;
        // Try enabling the actions and filter these that are disabled after that
        actions = actions.filter((action) => {
            action.setEnabled(true);
            return action.isEnabled();
        });
        return actions;
    },

    StateIsModalVisible: function(state) {
        return state.isModalVisible;
    },
};

const actions = {
};

const mutations = {
    setIsModalVisible(state, isModalVisible) {
        state.isModalVisible = isModalVisible;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};
