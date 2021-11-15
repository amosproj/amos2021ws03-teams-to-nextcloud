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
      let actions = this.$store.getters.StateActions;
      
      /* 
      actions.filter((action) => {
        action.setEnabled(true); // Try to enable the action. Set enabled has to check if this can be done.
        return action.isEnabled(); // Return the result
      });
     */      
      return actions;
    },
  },
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
