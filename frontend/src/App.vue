<template>
  <div>
    <ActionBar v-bind:actions="getEnabledActions" />
    <CreateFolderModal v-bind:isModalVisible="getIsModalVisible" />
    <router-view />
    <Upload />
    <ProgressBar />
  </div>
</template>

<script>
// @ is an alias to /src
import ActionBar from "@/components/ActionBar.vue";
import CreateFolderModal from "@/components/modals/CreateFolder";
import Upload from "@/components/Upload.vue";
import ProgressBar from "@/components/ProgressBar.vue";

export default {
  name: "App",
  components: {
    ActionBar,
    CreateFolderModal,
    Upload,
    ProgressBar
  },
  computed: {
    getEnabledActions: function () {
      return this.$store.getters.StateEnabledActions;
    },
    getIsModalVisible: function () {
      return this.$store.getters.StateIsModalVisible;
    },
  },
  created: function () {
    // If the user is authenticated when the Vue instance is created -> Refresh the webdav client
    if(this.$store.getters.isAuthenticated) {
      this.$store.dispatch("refreshWebdavClient");
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
