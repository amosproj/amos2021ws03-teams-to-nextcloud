<template>
  <tr @click.exact="selectRow" @click.ctrl.left="selectRowMulti" @click.shift.left="selectRowRange">
    <td class="text-left">
      <div class="custom-control custom-checkbox">
        <input :checked="isSelected" @change="selectFile" type="checkbox" class="form-check-input selection-check-box"/>
      </div>
    </td>

    <td class="text-left">
      <a href="#" @click="open" class="text-dark">
        {{ file.name }}
      </a>
    </td>
    <td class="text-left">{{ file.lastModifiedUserDate }}</td>
  </tr>
</template>

<script>
export default {
  name: "File",
  components: {},
  props: ["file"],
  computed: {
    isSelected(){
        return this.file.selected;
    }
  },
  methods: {
    selectRowRange(){
      this.$store.dispatch('selectRange', { child: this.file });
    },
    selectFile(event){
      this.setFileSelectedInStore(this.file.path, event.currentTarget.checked);
    },
    selectRowMulti: function(){
      this.setFileSelectedInStore(this.file.path, this.file.selected ? false : true)
    },
    selectRow: async function (event) {
      if(!event.target.classList.contains("selection-check-box")){
          await this.$store.dispatch("setAllFilesUnselected");
      }
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
td{
  -moz-user-select: none;
  user-select: none;
}
</style>
