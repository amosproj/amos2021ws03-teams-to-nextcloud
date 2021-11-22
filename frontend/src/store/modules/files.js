import FileWrapper from "../../file-wrapper/file-wrapper";

const state = {
    path: [],
    children: [],
};

const getters = {
    /**
     * Return the current path
     */
    StatePath: function (state) {
        return state.path;
    },

    /**
     * Return the children of the last item of the current path
     */
    StateChildren: function (state) {
        return state.children;
    },

    StateSelectedChildren: function(state) {
        return state.children.filter(child => child.selected);
    }
};

const actions = {
    /**
     * Checks if the current path is empty and if it is, adds the root directory to the path.
     */
    initPath({ commit, getters }) {
        let path = getters.StatePath;
        if (Array.isArray(path) && path.length == 0) {
            var username = getters.StateUsername;
            let rootName = "Documents"
            let rootPath = "/files/" + username + "/"
            let rootDir = new FileWrapper(rootName, rootPath, true, false, "");
            commit("pushToPath", rootDir);
        }
    },

    /**
     * Loads the children of the last directory in the current path.
     */
    async loadChildrenForPath({ commit, getters }) {
        let path = getters.StatePath;
        if (Array.isArray(path) && path.length) {
            // Get the last directory of the current path
            let lastDirectory = path[path.length - 1];
            // Call the API through the API and get the directory contents
            let client = getters.StateWebdavClient;
            let children = await client.getDirectoryContents(lastDirectory.path);
            // Map the contents to FileWrapper objects
            children = children.map(file => new FileWrapper(file.basename, file.filename, file.type == "directory", file.type == "file", file.lastmod));
            // Save the new children
            commit("setChildren", children);
        }
    },

    setFileSelected({ getters }, data) {
        let path = data.path;
        let selected = data.selected;
        getters.StateChildren.forEach(child => {
            if(child.path == path) {
                child.selected = selected;
            }
        });
    },

    removeEditField(_, data){
        data.file.inEdit = false;
    },

    async editFileName({ commit, getters}, data){
        let selectedFile = data.file;
        let newName = data.name;
        if(newName === ""){
            return
        }
        let client = getters.StateWebdavClient;
        selectedFile.inEdit = false;
        selectedFile.name = newName;
        let newPath = selectedFile.path.split('/').slice(0, -1).join('/') + '/' + newName.trim();
        try{
            await client.moveFile(selectedFile.path, newPath) ;
        }
        catch(error){
            console.error(error)
        }
        await actions.loadChildrenForPath({commit, getters})
    }

};

const mutations = {
    /**
     * Pushes a directory at the end of the path
     */
    pushToPath(state, file) {
        state.path.push(file);
    },

    /**
     * Removes every element of the path from the index till the end 
     */
    splicePath(state, index) {
        state.path.splice(index);
    },

    /**
     * Updates the current children variable
     */
    setChildren(state, children) {
        state.children = children;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
