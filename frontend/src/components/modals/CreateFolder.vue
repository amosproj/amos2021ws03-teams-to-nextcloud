<template>
  <div v-if="isModalVisible"
       class="modal-backdrop"
       tabindex="-1"
       role="dialog"
       aria-labelledby="createFolderModalLabel"
       aria-hidden="true"
       @keypress.enter="createFolder"
       @click="close"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content" @click.stop="">
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
  props: ["isModalVisible"],
  data() {
    return {
      folderName: "",
      errorMessage: "",
    }
  },
  updated() {
    if (this.isModalVisible) {
      window.addEventListener('keydown', this.escapeHandler);
      this.focusOnInputField();
    }
  },
  methods: {
    escapeHandler(event) {
      if (event.key === 'Escape') {
        this.close();
      }
    },
    focusOnInputField() {
      this.$nextTick(function() {
        this.$refs.inputField.focus();
      });
    },
    hideErrorMessage() {
      if (this.errorMessage !== "") {
        this.errorMessage = "";
      }
    },
    createFolder() {
      if (this.folderName === "") {
        this.errorMessage = "You can't leave this blank."
        return;
      }
      let folderExists = false;
      this.$store.getters.StateChildren.forEach(folder => folderExists = folderExists || folder.name === this.folderName);
      if (folderExists) {
        this.errorMessage = "A folder with the name " + '"' + this.folderName + '"' + " already exists.";
        return;
      }
      this.$store.dispatch("createFolder", this.folderName);
      this.close();
    },
    close() {
      this.$store.commit("setIsModalVisible", false);
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

  .modal-dialog {
    top: 150px;
  }

  .modal-content {
    width: 75%;
    height: fit-content;
  }

  .modal-header {
    padding: 20px 28px 1px;
    border-bottom: none;
  }

  .modal-title {
    color: #2f2a2a;
    font-size: 18px;
  }

  #closeButton {
    outline: none;
  }

  .modal-body {
    padding: 15px 28px 0;
    height: 74px;
  }

  .form-control {
    font-size: 14px;
    background-color: #f6f6f6;
    border: 1px solid #8e95d7;
  }

  .form-control:focus {
    background-color: #f6f6f6;
    border: 1px solid #8e95d7;
    box-shadow: 0 0 10px #8e95d7;
  }

  #errorMessage {
    color: #a02d2d;
    font-size: 12px;
    text-align: left;
    padding-top: 5px;
    padding-left: 2px;
  }

  .modal-footer {
    padding: 3px 28px 20px;
    border-top: none;
  }

  #createButton {
    background-color: #6871b6;
    color: white;
    font-size: 14px;
    width: 25%;
    height: 33px;
    padding: 0;
  }

  #createButton:hover {
    background-color: #5861a0;
  }

  #createButton:focus {
    background-color: #5861a0;
    box-shadow: 0 0 15px #8e95d7;
  }
</style>
