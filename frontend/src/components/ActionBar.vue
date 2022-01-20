<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light small">
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#actionBar"
      aria-controls="actionBar"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="actionBar">
      <!-- The list with actions. Only visible if the user is authenticated. -->
      <ul class="navbar-nav mr-auto" v-if="isAuthenticated">
        <Action
          v-for="action in actions"
          v-bind:key="action.name"
          v-bind:name="action.name"
          v-bind:img="action.img"
          v-bind:execute="action.execute"
        ></Action>
      </ul>

      <!-- The list with the right side actions. -->
      <ul class="navbar-nav ml-auto">
        <Action
          v-for="action in rightSideActions"
          v-bind:key="action.name"
          v-bind:name="action.name"
          v-bind:img="action.img"
          v-bind:execute="action.execute"
        ></Action>
      </ul>
    </div>
  </nav>
</template>

<script>
// @ is an alias to /src
import Action from "@/components/Action.vue";

export default {
  name: "ActionBar",
  components: {
    Action,
  },
  computed: {
    isAuthenticated: function () {
      return this.$store.getters.isAuthenticated;
    },
  },
  watch: {
    /**
     * Watcher for the "isAuthenticated" function in the "computed" object.
     * The moment the value changes this watcher-function is triggered.
     * If newValue is true, this means the user has logged in and we redirect him to home
     * If oldValue is true, this means he is not logged in anymore and we redirect him to the lobby
     */
    isAuthenticated: function (newValue, oldValue) {
      if (newValue) {
        this.$router.push("/");
      }
      if (oldValue) {
        this.$router.push("/lobby");
      }
    },
  },
  props: ["actions", "rightSideActions"],
};
</script>

<style>
  .small {
    font-size: 1.7ex;
  }
  a:hover {
    cursor: pointer;
  }

  .action {
    border: 1px solid transparent;
    margin: 0 2px;
  }

  .section { color: #2d2d2d; }
  .section:hover { color: #5861a0; }
  .section svg { fill: #4b4b4b; }
  .section:hover svg { fill: #5861a0; }
</style>
