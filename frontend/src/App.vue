<template>
  <div>
    <ActionBar v-bind:actions="getEnabledActions" />
    <CreateFolderModal v-bind:isCreateModalVisible="getIsCreateModalVisible" />
    <RenameModal v-bind:isRenameModalVisible="getIsRenameModalVisible" />
    <router-view />
    <Upload />
    <ProgressBar />
  </div>
</template>

<script>
// @ is an alias to /src
import ActionBar from "@/components/ActionBar.vue";
import CreateFolderModal from "@/components/modals/CreateFolder";
import RenameModal from "@/components/modals/Rename";
import Upload from "@/components/Upload.vue";
import ProgressBar from "@/components/ProgressBar.vue";

export default {
  name: "App",
  components: {
    ActionBar,
    CreateFolderModal,
    RenameModal,
    Upload,
    ProgressBar
  },
  computed: {
    getEnabledActions: function () {
      return this.$store.getters.StateEnabledActions;
    },
    getIsCreateModalVisible: function () {
      return this.$store.getters.StateIsCreateModalVisible;
    },
    getIsRenameModalVisible: function () {
      return this.$store.getters.StateIsRenameModalVisible;
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
