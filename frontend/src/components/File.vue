<template>
  <tr v-on:click="selectRow">
    <td class="text-left">
      <div class="custom-control custom-checkbox">
        <input v-model="isSelected" type="checkbox" class="form-check-input"/>
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
  data (){
    return {
        isSelected: false
    }
  },
  updated () {
    if(this.file.inEdit){
        let filenameInput = this.$el.querySelector(".filename-input");
        filenameInput.focus()
        filenameInput.select()
    }
  },
  methods: {
    submitEdit: function(event) {
        this.editFileName(this.file, event.currentTarget.value);
    },
    selectRow: function () {
      // the checkbox will always sync with this.isSelected
      this.isSelected = !this.isSelected
      // since we deselected the current field we are editing make it a non-edit field again
      if(!this.isSelected){
        this.removeEditField()
      }
      this.setFileSelectedInStore(this.file.path, this.isSelected);
    },
    setFileSelectedInStore: function (path, selected) {
      // Set the value in the store programmatically
      this.$store.dispatch("setFileSelected", {
        path: path,
        selected: selected,
      });
      this.$store.getters.StateEnabledActions;
    },
    editFileName: function(file, name){
        this.$store.dispatch("editFileName", {file: file, name: name})
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
