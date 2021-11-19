<template>
  <div>
    <img
      v-if="index !== 0"
      src="https://docs.nextcloud.com/server/22/developer_manual/_images/arrow-right.png"
      class="fileSeparator"
    />
    <a href="#" v-on:click="open" class="text-dark">
      {{ directory.name }}
    </a>
  </div>
</template>

<script>
export default {
  name: "Address",
  components: {},
  props: ["directory", "index"],
  methods: {
    open: function () {
      if (this.directory.directory) {
        this.$store.commit("splicePath", this.index + 1);
        this.$store.dispatch("loadChildrenForPath");
      }
    },
  },
};
</script>

<style>
.fileSeparator {
  width: 16px;
  height: 16px;
  margin: 4px;
}
a:hover {
  cursor: pointer;
}
</style>