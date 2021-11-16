<template>
  <div class="home">
    <AddressBar v-bind:path="this.path" />
    <FileList v-bind:fileList="this.fileList" />
  </div>
</template>

<script>
// @ is an alias to /src
import AddressBar from "@/components/AddressBar.vue";
import FileList from "@/components/FileList.vue";

export default {
  name: "Home",
  components: {
    AddressBar,
    FileList,
  },
  data() {
    return {
      path: [{ filename: "Documents/Test", basename: "Test" }, { filename: "Documents/Test/Example", basename: "Example" }],
      fileList: [],
    };
  },
  async mounted() {
    var client = this.$store.getters.StateWebdavClient;
    var username = this.$store.getters.StateUsername;
    console.log(client);
    this.fileList = await client.getDirectoryContents(
      "/files/" + username + "/"
    );
  },
};
</script>
