<template>
  <div>
    <img
      v-if="index !== 0"
      src="https://docs.nextcloud.com/server/22/developer_manual/_images/arrow-right.png"
      class="fileSeparator"
    />
    <a v-if="index === this.$store.getters.StatePath.length - 1" href="#" v-on:click="open" id="active">
      {{ directory.name }}
    </a>
    <a v-if="index !== this.$store.getters.StatePath.length - 1" href="#" v-on:click="open" id="inactive">
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
    width: 15px;
    height: 15px;
  }

  a {
    padding-right: 7px;
    padding-left: 7px;
  }

  a:hover {
    text-decoration: none;
    cursor: pointer;
  }

  #active {
    color: #2d2d2d;
    font-weight: bold;
  }

  #inactive {
    color: #2d2d2d;
  }

  #inactive:hover {
    color: #5861a0;
  }
</style>
