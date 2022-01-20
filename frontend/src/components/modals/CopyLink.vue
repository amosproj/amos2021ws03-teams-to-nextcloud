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
          <h5 class="modal-title font-weight-bold">CopyLink</h5>
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
                     placeholder="Enter your new name"
                     @input="hideErrorMessage"
              >
              <div v-if='fileFormat !== ""' class="input-group-text">{{fileFormat}}</div>
            </div>
            <p v-if='errorMessage !== ""' id="errorMessage">{{errorMessage}}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn font-weight-bold" id="saveButton" @click="copylink">
            Save
          </button>
          <button type="button" class="btn font-weight-bold" id="cancelButton" @click="close">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CopyLinkModal',
    props: ["isCopyLinkModalVisible"],
    data() {
      return {
        itemName: "",
        fileFormat: "",
        initialValuesSet: false,
        errorMessage: "",
      }
    },
    updated() {
      if (this.isCopyLinkModalVisible) {
        window.addEventListener('keydown', this.escapeHandler);
        this.$refs.inputField.focus();
        if (!this.initialValuesSet) {
          let selectedItem = this.$store.getters.StateSelectedChildren[0];
          if (selectedItem.isDirectory()) {
            this.itemName = selectedItem.name;
            this.fileFormat = "";
          }
          else {
            this.itemName = selectedItem.name.substring(0, selectedItem.name.lastIndexOf("."));
            this.fileFormat = selectedItem.name.substring(selectedItem.name.lastIndexOf("."), selectedItem.name.length);
          }
          this.initialValuesSet = true;
        }
      }
    },
    methods: {
      escapeHandler(event) {
        if (event.key === 'Escape') {
          this.close();
        }
      },
      hideErrorMessage() {
        if (this.errorMessage !== "") {
          this.errorMessage = "";
        }
      },
      copylink() {
        if (this.itemName === "") {
          this.errorMessage = "You can't leave this blank.";
          return;
        }
        let selectedItem = this.$store.getters.StateSelectedChildren[0];
        let itemNameWithFormat = this.itemName.trim() + this.fileFormat;
        if (itemNameWithFormat !== selectedItem.name) {
          let itemExists = false;
          this.$store.getters.StateChildren.forEach(item => itemExists = itemExists || item.name === itemNameWithFormat);
          if (itemExists) {
            if (selectedItem.isDirectory()) {
              this.errorMessage = "A folder with the name " + '"' + itemNameWithFormat + '"' + " already exists.";
            }
            else {
              this.errorMessage = "A file with the name " + '"' + itemNameWithFormat + '"' + " already exists.";
            }
            return;
          }
          this.$store.dispatch("copylink", { currentPath: selectedItem.path,
                                           newPath: this.$store.getters.StatePath.at(-1).path + '/' + itemNameWithFormat });
          this.close();
        }
        else {
          this.close();
        }
      },
      close() {
        this.$store.commit("setIsCopyLinkModalVisible", false);
        this.initialValuesSet = false;
        this.errorMessage = "";
        window.removeEventListener('keydown', this.escapeHandler);
        this.$store.dispatch("setAllFilesUnselected");
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

  #saveButton {
    background-color: #6871b6;
    color: white;
    font-size: 13px;
    width: 23%;
    height: 30px;
    padding: 0;
    margin: 0;
  }

  #saveButton:hover {
    background-color: #5861a0;
  }

  #saveButton:focus {
    background-color: #5861a0;
    box-shadow: 0 0 5px #8e95d7;
  }

  #cancelButton {
    color: #2f2a2a;
    border: 1px solid #c1c2c9;
    font-size: 13px;
    width: 23%;
    height: 30px;
    padding: 0;
  }

  #cancelButton:hover {
    background-color: #f6f6f6;
  }

  #cancelButton:focus {
    background-color: #f6f6f6;
    box-shadow: 0 0 5px #8e95d7;
  }
</style>
