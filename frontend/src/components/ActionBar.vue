<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
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
      <ul class="navbar-nav ml-auto">
        <!-- Login/Logout Buttons pushed to the right side-->
        <li v-if="isAuthenticated" id="logout" class="nav-item active action">
          <a @click="logout" class="nav-link" href="#">
            <img
              src="/images/logout-button.svg"
              class="d-inline-block align-center"
              style="width: 24px; height: 24px; padding-right: 2px"
            />Logout</a
          >
        </li>
        <li v-else id="login" class="nav-item active action">
          <a @click="login" class="nav-link" href="#">
            <img
              src="/images/login-button.svg"
              class="d-inline-block align-center"
              style="width: 24px; height: 24px; padding-right: 4px"
            />Login</a
          >
        </li>
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
  methods: {
    async login() {
      await this.$store.dispatch("initLogin");
    },
    async logout() {
      await this.$store.dispatch("logout");
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
  props: ["actions"],
};
</script>

<style>
a:hover {
  cursor: pointer;
}
.action {
  border: 1px solid transparent;
  margin: 0px 2px;
}
.action:hover {
  border: 1px solid #d0d0d0;
}
</style>
