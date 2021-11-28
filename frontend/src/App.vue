<template>
  <div>
    <ActionBar v-bind:actions="getEnabledActions" />
    <router-view />
    <Upload />
    <ProgressBar />
  </div>
</template>

<script>
// @ is an alias to /src
import ActionBar from "@/components/ActionBar.vue";
import Upload from "@/components/Upload.vue";
import ProgressBar from "@/components/ProgressBar.vue";

export default {
  name: "App",
  components: {
    ActionBar,
    Upload,
    ProgressBar
  },
  computed: {
    getEnabledActions: function () {
      return this.$store.getters.StateEnabledActions;
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
