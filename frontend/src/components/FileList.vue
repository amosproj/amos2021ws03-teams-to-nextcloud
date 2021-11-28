<template>
  <div class="fileList">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col" style="width: 16px; text-left">
            <div class="custom-control custom-checkbox">
              <input
                :checked="allFilesSelected"
                @change="updateSelectionAll"
                type="checkbox"
                class="form-check-input"
                id="tableCheckbox"
              />
            </div>
          </th>
          <th scope="col" class="text-left">Name</th>
          <th scope="col" class="text-left">Last Modified</th>
        </tr>
      </thead>
      <tbody>
        <File
          v-for="file in fileList"
          v-bind:key="file.path"
          v-bind:file="file"
        ></File>
      </tbody>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
import File from "@/components/File.vue";

export default {
  name: "FileList",
  components: {
    File,
  },
  props: ["fileList"],
  computed: {
    allFilesSelected(){
      let selectedChildren = this.$store.getters.StateSelectedChildren;
      return selectedChildren.length == this.fileList.length;
    }
  },
  methods: {
    updateSelectionAll(event){
      for(let file of this.fileList){
        this.$store.dispatch("setFileSelected",{
          path: file.path,
          selected: event.currentTarget.checked
        });
      }
    }
  },
};
</script>
