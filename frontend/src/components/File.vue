<template>
  <tr @click="selectRow">
    <td class="text-left">
      <div class="custom-control custom-checkbox">
        <input :checked="isSelected" @change="selectFile" type="checkbox" class="form-check-input selection-check-box"/>
      </div>
    </td>

    <td v-show="!file.inEdit" class="text-left">
      <a href="#" @click="open" class="text-dark">
        {{ file.name }}
      </a>
    </td>
    <td v-show="file.inEdit" class="text-left">
        <input type="text" class="text-left filename-input" :value="file.name" @keydown.enter="submitEdit" @keydown.escape="removeEditField" @blur="removeEditField" @click.stop/>
    </td>
    <td class="text-left">{{ file.lastModified }}</td>
  </tr>
</template>

<script>
export default {
  name: "File",
  components: {},
  props: ["file"],
  computed: {
    isSelected(){
        return this.file.selected
    }
  },
  updated () {
    if(this.file.inEdit){
      let filenameInput = this.$el.querySelector(".filename-input");
      filenameInput.focus();
      filenameInput.select();
    }
  },
  methods: {
    selectFile(event){
      this.setFileSelectedInStore(this.file.path, event.currentTarget.checked);
    },
    submitEdit: async function(event) {
        await this.editFileName(this.file, event.currentTarget.value);
    },
    selectRow: function () {
      this.setFileSelectedInStore(this.file.path, this.file.selected ? false : true)
    },
    setFileSelectedInStore: function (path, selected) {
      // Set the value in the store programmatically
      this.$store.dispatch("setFileSelected", {
        path: path,
        selected: selected,
      });
      this.$store.getters.StateEnabledActions;
    },
    editFileName: async function(file, name){
        await this.$store.dispatch("editFileName", {file: file, name: name});
        await this.$store.dispatch("loadChildrenForPath");
    },
    removeEditField: function(){
        this.$store.dispatch("removeEditField", {file: this.file});
    },
    open: function (event) {
      if (this.file.file) {
        console.log(this.file);
      } else if (this.file.directory) {
        event.stopPropagation();
        this.$store.commit("pushToPath", this.file);
        this.$store.dispatch("loadChildrenForPath");
      }
    },
  },
};
</script>

<style>
a:hover {
  cursor: pointer;
}
.filename-input{
    border: none;
    outline: none
}
</style>
