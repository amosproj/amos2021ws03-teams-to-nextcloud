import {store} from '@/store/index'

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
                console.log("Hello");
            }
        },

        {
            name: "Upload",
            img: "./images/upload-button.svg",
            enabled: true,
            isEnabled: function () {
                return this.enabled;
            },
            setEnabled: function (enabled) {
                this.enabled = enabled;
            },
            execute: function (pointerEvent) {
                console.log(pointerEvent);
                console.log("Hello");
            }
        },
        {
            name: "Sync",
            img: "./images/sync-button.svg",
            enabled: true,
            isEnabled: function () {
                return this.enabled;
            },
            setEnabled: function (enabled) {
                this.enabled = enabled;
            },
            execute: function (pointerEvent) {
                console.log(pointerEvent);
                console.log("Hello");
            }
        },
        {
            name: "Rename",
            img: "./images/pencil-square.svg",
            enabled: false,
            isEnabled: function () {
                return store.getters.StateSelectedChildren.length == 1;
            },
            setEnabled: function (enabled) {
                this.enabled = enabled;
            },
            execute: function(){
                let selectedFiles = store.getters.StateSelectedChildren;
                if(selectedFiles.length == 1){
                    selectedFiles[0].inEdit = !selectedFiles[0].inEdit;
                }
            }
        },
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
                console.log("Hello");
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
                this.enabled = enabled;
            },
            execute: function (pointerEvent) {
                console.log(pointerEvent);
                console.log("Hello");
            }
        },
        {
            name: "Open in NextCloud",
            img: "./images/nextcloud-button.svg",
            enabled: true,
            isEnabled: function () {
                return this.enabled;
            },
            setEnabled: function (enabled) {
                this.enabled = enabled;
            },
            execute: function (pointerEvent) {
                console.log(pointerEvent);
                window.open(process.env.VUE_APP_NEXTCLOUD_BASE_URL, "_blank");  // can add rel=noreferrer noopener for more security
                console.log("Hello");
            }
        },
        
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
