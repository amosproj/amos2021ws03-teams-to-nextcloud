import {store} from '@/store/index';
import axios from 'axios';
import Upload from '@/actions/Upload';
import Rename from '@/actions/Rename';
import OpenInNextcloud from '@/actions/OpenInNextcloud';

const state = {
    actions: [
        {
            key: "NewFile",
            name: "New",
            img: "./images/add-button.svg",
            enabled: true,
            isEnabled: function () {
                return this.enabled;
            },
            setEnabled: function (enabled) {
                // New File is available only in current directory
                if(enabled) {
                    let selected = store.getters.StateSelectedChildren;
                    // If there are selected items -> Set disabled
                    if(Array.isArray(selected) && selected.length) {
                        this.enabled = false;
                        return;
                    }
                }
                this.enabled = enabled;
            },
            execute: function (pointerEvent) {
                console.log(pointerEvent);
                console.log("Pressed: New");
            }
        },
        new Upload(),
        new Rename(),
        {
            name: "Copy link",
            img: "./images/copy-link-button.svg",
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
            img: "./images/download-button.svg",
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
        {
            name: "Delete",
            img: "./images/delete-button.svg",
            enabled: true,
            isEnabled: function () {
                return this.enabled;
            },
            setEnabled: function (enabled) {
                // New File is available only in current directory
                if(enabled) {
                    let selected = store.getters.StateSelectedChildren;
                    // If there are selected items -> Set disabled
                    if(Array.isArray(selected) && selected.length == 0) {
                        this.enabled = false;
                        return;
                    }
                }
                this.enabled = enabled;
            },
            async execute (pointerEvent) {
                console.log(pointerEvent);
                let client = store.getters.StateWebdavClient;
                let selected = store.getters.StateSelectedChildren;
                console.log(selected);
                for (let i = 0; i < selected.length; i++) {
                    await client.deleteFile(selected[i].path);
                }
                store.dispatch("loadChildrenForPath");
            }
        }
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
    }
};

const actions = {
};

const mutations = {
};

export default {
    state,
    getters,
    actions,
    mutations
};
