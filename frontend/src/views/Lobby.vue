<template>
  <div class="lobby">
    <h1>This is the lobby page.</h1>
    <h1>
      Login to Nextcloud through the login button at the upper right corner :)
    </h1>
  </div>
</template>
<script>
export default {
    mounted() {
        this.$store.commit("setShowActionBar", true);
    }
}
</script>
