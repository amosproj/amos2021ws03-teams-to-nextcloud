<template>
  <div v-if="isCreateModalVisible"
       class="modal-backdrop"
       tabindex="-1"
       role="dialog"
       aria-labelledby="createFolderModalLabel"
       aria-hidden="true"
       @keypress.enter="createFolder"
       @click="close"
  >
    <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
      <div class="modal-content container-fluid" @click.stop="">
        <div class="modal-header">
          <h5 class="modal-title font-weight-bold">Create a Folder</h5>
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
            <input v-model="folderName"
                   type="text"
                   class="form-control"
                   ref="inputField"
                   placeholder="Enter your folder name"
                   @input="hideErrorMessage"
            >
            <p v-if='errorMessage !== ""' id="errorMessage">{{errorMessage}}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn font-weight-bold" id="createButton" @click="createFolder">
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CreateFolderModal',
    props: ["isCreateModalVisible"],
    data() {
      return {
        folderName: "",
        errorMessage: "",
      }
    },
    updated() {
      if (this.isCreateModalVisible) {
        window.addEventListener('keydown', this.escapeHandler);
        this.$refs.inputField.focus();
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
      createFolder() {
        if (this.folderName === "") {
          this.errorMessage = "You can't leave this blank.";
          return;
        }
        let folderExists = false;
        this.$store.getters.StateChildren.forEach(item => folderExists = folderExists || item.name === this.folderName.trim());
        if (folderExists) {
          this.errorMessage = "A folder with the name " + '"' + this.folderName.trim() + '"' + " already exists.";
          return;
        }
        this.$store.dispatch("createFolder", this.$store.getters.StatePath.at(-1).path + '/' + this.folderName.trim());
        this.close();
      },
      close() {
        this.$store.commit("setIsCreateModalVisible", false);
        this.folderName = "";
        this.errorMessage = "";
        window.removeEventListener('keydown', this.escapeHandler);
      },
    },
  };
</script>

<style>
  .modal-backdrop {
    background-color: rgba(1, 3, 3, 0.5);
  }

  .modal-content {
    padding: 0;
  }

  .modal-header {
    padding: 15px 22px 1px;
    border-bottom: none;
  }

  .modal-title {
    color: #2f2a2a;
    font-size: 16px;
  }

  #closeButton {
    outline: none;
  }

  .modal-body {
    padding: 15px 25px 7px 23px;
    max-height: 90px;
  }

  .form-control {
    font-size: 13px;
    background-color: #efefef;
    border: none;
  }

  .form-control:focus {
    background-color: #efefef;
    border: none;
    box-shadow: 0 4px 5px -2px #8e95d7;
  }

  #errorMessage {
    color: #a02d2d;
    font-size: 11px;
    text-align: left;
    padding-top: 5px;
    padding-left: 2px;
  }

  .modal-footer {
    padding: 5px 22px 18px;
    border-top: none;
  }

  #createButton {
    background-color: #6871b6;
    color: white;
    font-size: 13px;
    width: 25%;
    height: 30px;
    padding: 0;
  }

  #createButton:hover {
    background-color: #5861a0;
  }

  #createButton:focus {
    background-color: #5861a0;
    box-shadow: 0 0 5px #8e95d7;
  }
</style>
