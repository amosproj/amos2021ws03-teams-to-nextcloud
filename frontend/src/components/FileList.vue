<template>
  <div class="fileList">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col" style="width: 16px; text-left">
            <div class="custom-control custom-checkbox">
              <input
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
          v-for="(file, index) in fileList"
          v-bind:key="file.filename"
          v-bind:index="index"
          v-bind:name="file.basename"
          v-bind:lastModified="file.lastmod"
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
};
</script>
