import New from '@/actions/New';
import Upload from '@/actions/Upload';
import Rename from '@/actions/Rename';
import OpenInNextcloud from '@/actions/OpenInNextcloud';
import Delete from '@/actions/Delete';
import Download from '@/actions/Download';
import Deselect from '@/actions/Deselect';
import CopyLink from '@/actions/CopyLink';

const state = {
    isModalVisible: false,
    actions: [
        new New(),
        new Upload(),
        new CopyLink(),
        new Download(),
        new Delete(),
        new Rename(),
        new OpenInNextcloud(),
        new Deselect(),
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
