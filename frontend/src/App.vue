<template>
  <div>
    <ActionBar v-bind:actions="getEnabledActions" />
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import ActionBar from "@/components/ActionBar.vue";

export default {
  name: "App",
  components: {
    ActionBar,
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
