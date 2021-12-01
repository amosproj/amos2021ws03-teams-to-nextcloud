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
            <div class="section">
              <svg viewBox="0 3.5 28 18" width="22px" height="24px" display="inline">
                <path d="M16 10v-5l8 7-8 7v-5h-8v-4h8zm-16-8v20h14v-2h-12v-16h12v-2h-14z"/>
              </svg>Logout
            </div>
          </a>
        </li>
        <li v-else id="login" class="nav-item active action">
          <a @click="login" class="nav-link" href="#">
            <div class="section">
              <svg viewBox="0 3.5 28 18" width="22px" height="24px" display="inline">
                <path d="M8 9v-4l8 7-8 7v-4h-8v-6h8zm2-7v2h12v16h-12v2h14v-20h-14z"/>
              </svg>
              Login
            </div>
          </a>
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
    margin: 0 2px;
  }

  .section { color: #2d2d2d; }
  .section:hover { color: #5861a0; }
  .section svg { fill: #4b4b4b; }
  .section:hover svg { fill: #5861a0; }
</style>
