<template>
  <div class="home">
    <AddressBar v-bind:path="path" />
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
  computed: {
    path() {
      return this.$store.state.files.path;
    },
    fileList() {
      return this.$store.state.files.children;
    }
  },
  mounted() {
    this.$store.dispatch("initPath");
    this.$store.dispatch("loadChildrenForPath");
    this.$store.commit("setShowActionBar", true);
  },
};
</script>
