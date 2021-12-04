import FileWrapper from "../../file-wrapper/file-wrapper";
import moment from 'moment'

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

    StateSelectedChildren: function (state) {
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
            children = children.map(file => {
                // Parse the UTC date, so that it looks better
                let now = moment(new Date()); //todays date
                let lastmod = moment(file.lastmod); // last modified date
                let duration = moment.duration(now.diff(lastmod));
                let days = duration.asDays();
                let hours = duration.asHours();
                let lastModified = "";
                if(hours <= 24) {
                    lastModified = lastmod.fromNow(); // 3 hours ago, an hour ago
                } else if(days <= 7) {
                    lastModified = lastmod.calendar(); // Yesterday at 2:57 AM, Wednesday at 2:58 AM
                } else {
                    lastModified = lastmod.format('LL'); // November 28, 2021
                }
                return new FileWrapper(file.basename, file.filename, file.type == "directory", file.type == "file", lastModified);
            });

            children.sort(function (a, b) {
                // If the files are of the same type
                if (a.directory == b.directory) {
                    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                    // names must be equal
                    return 0;
                } 
                // Elements have differnet type -> Directories should come first
                else {
                    if(a.directory && b.file) {
                        return -1;
                    }
                    if(a.file && b.directory) {
                        return 1;
                    }
                    return 0;
                }
            });

            // Save the new children
            commit("setChildren", children);
        }
    },

    setFileSelected({ getters }, data) {
        let path = data.path;
        let selected = data.selected;
        getters.StateChildren.forEach(child => {
            if (child.path == path) {
                child.selected = selected;
            }
        });
    },

    setAllFilesUnselected({ getters }) {
        getters.StateChildren.forEach(child =>{
            child.selected = false;
        });
    },

    removeEditField(_, data) {
        data.file.inEdit = false;
    },

    async editFileName({ getters }, data) {
        let selectedFile = data.file;
        let newName = data.name;
        if (newName === "") {
            return
        }
        let client = getters.StateWebdavClient;
        selectedFile.inEdit = false;
        selectedFile.name = newName;
        let currentPath = state.path.at(-1).path;
        let newPath = currentPath + '/' + newName.trim();
        try {
            await client.moveFile(selectedFile.path, newPath);
        }
        catch (error) {
            console.error(error)
        }
    },

    async createFolder({ commit, getters }, data) {
        let folderName = data;
        let client = getters.StateWebdavClient;
        let path = getters.StatePath[getters.StatePath.length - 1].path + folderName;
        try {
            await client.createDirectory(path);
        } catch (e) {
            console.error(e);
        }
        await actions.loadChildrenForPath({ commit, getters });
    },
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
