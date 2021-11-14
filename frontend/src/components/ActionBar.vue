<template>
<div id="actionBar">
    <!-- Place for the other actions... -->

    <!-- Login/Logout Buttons pushed to the right side-->
    <span v-if="isAuthenticated" id="logout">
        <a @click="logout">Logout</a>
    </span>
    <span v-else id="login">
        <a @click="login">Login</a>
    </span>
</div>
</template>

<script>
export default {
    name: "ActionBar",
    computed: {
        isAuthenticated: function () {
            return this.$store.getters.isAuthenticated;
        }
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
        isAuthenticated: function(newValue, oldValue) {
            if(newValue) {
                this.$router.push("/");
            }
            if(oldValue) {
                this.$router.push("/lobby");
            }
        }
    }
};
</script>

<style>
#actionBar {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
a:hover {
  cursor: pointer;
}
#login, #logout{
    float: right;
}
</style>
