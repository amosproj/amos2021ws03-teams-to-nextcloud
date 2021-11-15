
const state = {
    actions: [
        {
            name: "New",
            img: "./images/add-button.svg",
            execute: function () {
                console.log("Hello");
            },
            enabled: true,
            setEnabled: function(enabled) {
                this.enabled = enabled;
            },
            isEnabled: function() {
                return this.enabled;
            }
        },
        {
            name: "Upload",
            img: "./images/upload-button.svg",
            execute: function () {
                console.log("Hello");
            },
            enabled: true,
            setEnabled: function(enabled) {
                this.enabled = enabled;
            },
            isEnabled: function() {
                return this.enabled;
            }
        },
        {
            name: "Sync",
            img: "./images/sync-button.svg",
            execute: function () {
                console.log("Hello");
            },
            enabled: true,
            setEnabled: function(enabled) {
                this.enabled = enabled;
            },
            isEnabled: function() {
                return this.enabled;
            }
        },
        {
            name: "Copy link",
            img: "./images/copy-link-button.svg",
            execute: function () {
                console.log("Hello");
            },
            enabled: true,
            setEnabled: function(enabled) {
                this.enabled = enabled;
            },
            isEnabled: function() {
                return this.enabled;
            }
        },
        {
            name: "Download",
            img: "./images/download-button.svg",
            execute: function () {
                console.log("Hello");
            },
            enabled: true,
            setEnabled: function(enabled) {
                this.enabled = enabled;
            },
            isEnabled: function() {
                return this.enabled;
            }
        },
        {
            name: "Open in NextCloud",
            img: "./images/nextcloud-button.svg",
            execute: function () {
                console.log("Hello");
            },
            enabled: true,
            setEnabled: function(enabled) {
                this.enabled = enabled;
            },
            isEnabled: function() {
                return this.enabled;
            }
        },
    ],
};

const getters = {
    StateActions: function (state) {
        return state.actions;
    },
};

const actions = {};

const mutations = {};

export default {
    state,
    getters,
    actions,
    mutations
};
