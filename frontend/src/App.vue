<template>
  <div>
    <ActionBar />
    <router-view />
    <ShowFiles />
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
