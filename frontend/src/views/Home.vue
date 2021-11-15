<template>
  <div class="home">
    <!--
    Here we add our next components: Lets say
    -----------------------------------------
    AddressBar.vue  
    -----------------------------------------
    FileList.vue
      File.vue
      File.vue
      ...
    -----------------------------------------
    AddressBar contains the current path. The FileList component contains all the file components and so on... 
     -->
    <FileList v-bind:fileList="this.fileList" />
  </div>
</template>

<script>
// @ is an alias to /src
import FileList from "@/components/FileList.vue";

export default {
  name: "Home",
  components: {
    FileList,
  },
  data() {
    return {
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
