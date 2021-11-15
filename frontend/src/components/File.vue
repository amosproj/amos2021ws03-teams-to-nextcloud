<template>
  <tr v-on:click="selectRow">
    <td class="text-left">
      <div class="custom-control custom-checkbox">
        <input type="checkbox" class="form-check-input" id="customCheck1" />
      </div>
    </td>
    <td class="text-left">{{ name }}</td>
    <td class="text-left">{{ lastModified }}</td>
  </tr>
</template>

<script>
export default {
  name: "File",
  components: {},
  props: ["key", "index", "name", "lastModified"],
  methods: {
    selectRow: function (event) {
      let target = event.target;
      // If the target is the input -> just skip
      if (target == null || target.nodeName == "INPUT") {
        return;
      }
      // Otherwise get the parent element, this should be a table row
      let tableRow = target.parentElement;
      if (tableRow != null && tableRow.nodeName == "TR") {
        // Select the input in the table row and check the element
        let firstInput = tableRow.getElementsByTagName("input")[0];
        firstInput.checked = !firstInput.checked;
      }
    },
  },
};
</script>
