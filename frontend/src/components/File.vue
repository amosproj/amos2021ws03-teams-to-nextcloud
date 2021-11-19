<template>
  <tr v-on:click="selectRow">
    <td class="text-left">
      <div class="custom-control custom-checkbox">
        <input type="checkbox" class="form-check-input" id="customCheck1" />
      </div>
    </td>
    <td class="text-left">
      <a href="#" v-on:click="open" class="text-dark">
        {{ file.name }}
      </a>
    </td>
    <td class="text-left">{{ file.lastModified }}</td>
  </tr>
</template>

<script>
export default {
  name: "File",
  components: {},
  props: ["file"],
  methods: {
    selectRow: function (event) {
      let target = event.target;
      // If the target is the input -> just skip
      if (target == null || target.nodeName == "INPUT") {
        this.setFileSelectedInStore(this.file.path, target.checked);
        return;
      }
      // Otherwise get the parent element, this should be a table row
      let tableRow = target.parentElement;
      if (tableRow != null && tableRow.nodeName == "TR") {
        // Select the input in the table row and check the element
        let firstInput = tableRow.getElementsByTagName("input")[0];
        firstInput.checked = !firstInput.checked;
        this.setFileSelectedInStore(this.file.path, firstInput.checked);
      }
    },
    setFileSelectedInStore: function (path, selected) {
      // Set the value in the store programmatically
      this.$store.dispatch("setFileSelected", {
        path: path,
        selected: selected,
      });
      this.$store.getters.StateEnabledActions;
    },
    open: function () {
      if (this.file.file) {
        console.log(this.file);
      } else if (this.file.directory) {
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
</style>