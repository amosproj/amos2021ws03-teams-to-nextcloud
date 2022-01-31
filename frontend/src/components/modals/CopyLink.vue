<template>
  <div v-if="isCopyLinkModalVisible"
       class="modal-backdrop"
       tabindex="-1"
       role="dialog"
       aria-labelledby="copylinkModalLabel"
       aria-hidden="true"
       @keypress.enter="copylink"
       @click="close"
  >
    <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
      <div class="modal-content container-fluid" @click.stop="">
        <div class="modal-header">
          <h5 class="modal-title font-weight-bold">Copy Link</h5>
          <button type="button"
                  class="close"
                  id="closeButton"
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Close"
                  aria-label="Close"
                  @click="close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <div class="input-group">
              <input v-model="itemName"
                     type="text"
                     class="form-control"
                     ref="inputField"
                     placeholder="Link"
                     readonly
              >
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn font-weight-bold" id="copyButton" @click="copylink">
            Select text
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { parseXML } from 'webdav'

  export default {
    name: 'CopyLinkModal',
    props: ["isCopyLinkModalVisible"],
    data() {
      return {
        itemName: "",
      }
    },
    async updated() {
      if (this.isCopyLinkModalVisible) {
        window.addEventListener('keydown', this.escapeHandler);
        let client = this.$store.getters.StateWebdavClient;
        let path = this.$store.getters.StatePath;
        let directoryPath = path[path.length - 1].path;
        if (directoryPath == null) {
            return;
        }

        let directoryClipboard = "";
        // Checks if the selected object is in a subfolder or not
        if (!directoryPath.endsWith("/")) {
            // If selected object is in a subfolder, adjust path
            directoryPath += "/";
            // Extracts the name of the directory, also deletes last slash in string for clipboard link
            directoryClipboard = directoryPath.split(path[0].path)[1].slice(0,-1);
        }
        // Builds path with directory path + fileName
        let filePath = directoryPath + this.$store.getters.StateSelectedChildren[0].name;
        const response = await client.customRequest(filePath, { 
            method: "PROPFIND",
            data: '<?xml version="1.0" encoding="UTF-8"?><d:propfind xmlns:d="DAV:"><d:prop xmlns:oc="http://owncloud.org/ns"><oc:fileid/></d:prop> </d:propfind>'
        });
        // Splits the response after the first fileId tag and after the second one to receive the fileId
        const xmlData = await parseXML(response.data);
        let fileId = xmlData.multistatus.response[0].propstat.prop.fileid;
        // Builds link
        this.itemName = process.env.VUE_APP_NEXTCLOUD_BASE_URL + "index.php/apps/files?dir=/"+directoryClipboard+"&openfile="+fileId;
      }
    },
    methods: {
      escapeHandler(event) {
        if (event.key === 'Escape') {
          this.close();
        }
      },
      copylink() {
        this.$refs.inputField.focus();
        this.$refs.inputField.select();
        
      },
      close() {
        this.$store.commit("setIsCopyLinkModalVisible", false);
        this.$store.dispatch("setAllFilesUnselected");
        window.removeEventListener('keydown', this.escapeHandler);
      },
    },
  };
</script>

<style>
  .input-group-text {
    font-size: 14px;
    background-color: white;
    border: none;
    padding-right: 3px;
    padding-left: 7px;
  }

  #copyButton {
    background-color: #6871b6;
    color: white;
    font-size: 13px;
    width: 30%;
    height: 30px;
    padding: 0;
    margin: 0;
  }

  #copyButton:hover {
    background-color: #5861a0;
  }

  #copyButton:focus {
    background-color: #5861a0;
    box-shadow: 0 0 5px #8e95d7;
  }

</style>
