<template>
  <div class="container-fluid">
    <div class="row flex-row flex-nowrap addressBar small">
      <Address
        v-for="(directory, index) in path"
        v-bind:key="directory.path"
        v-bind:directory="directory"
        v-bind:index="index"
      ></Address>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Address from "@/components/Address.vue";

export default {
  name: "AddressBar",
  components: { Address },
  props: ["path"],
};
</script>

<style>
  .addressBar {
    height: 50px;
    padding: 15px 16px 0 36px;
    overflow: auto;
    white-space: nowrap;
  }
</style>
