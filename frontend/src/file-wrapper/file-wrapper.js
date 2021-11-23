class FileWrapper {
    /**
     * Name of the file
     */
    name = null;

    /**
     * Path of the file
     */
    path = null;

    /**
     * The time that the file was last modified
     */
    lastModified = null;

    /**
     * Boolean value indicating if the file is a directory
     */
    directory = false;

    /**
     * Boolean value indicated if the file is a normal file
     */
    file = false;

    /**
     * Boolean value indicating if the file currenty selected
     */
    selected = false;

    /**
     * sets the file into Edit mode so that a user can change its filename
     */
    inEdit = false;

    constructor(name, path, directory, file, lastModified) {
        this.name = name;
        this.path = path;
        this.directory = directory;
        this.file = file;
        this.lastModified = lastModified;
    }

    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }

    getPath() {
        return this.path;
    }
    setPath(path) {
        this.path = path;
    }

    getLastModified() {
        return this.name;
    }
    setLastModified(lastModified) {
        this.lastModified = lastModified;
    }

    isDirectory() {
        return this.directory;
    }
    setDirectory(b) {
        this.directory = b;
    }

    isFile() {
        return this.file;
    }
    setFile(b) {
        this.file = b;
    }

    isSelected() {
        return this.selected;
    }
    setSelected(b) {
        this.selected = b;
    }
    getInEdit(){
        return this.inEdit;
    }
    setInEdit(isEdit){
        this.inEdit = isEdit;
    }
}

export default FileWrapper;