<template>
  <div class="container-fluid">
    <div class="row flex-row flex-nowrap addressBar">
      <span>Documents</span>
      <div v-for="directory in path" :key="directory.filename">
        <img
          src="https://docs.nextcloud.com/server/22/developer_manual/_images/arrow-right.png"
          class="fileSeparator"
        />
        <span>{{ directory.basename }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddressBar",
  components: {},
  props: ["path"],
};
</script>

<style>
.addressBar {
  height: 40px;
  padding: 8px 16px 0px 16px;
  overflow: auto;
  white-space: nowrap;
}
.fileSeparator {
  width: 16px;
  height: 16px;
  margin: 4px;
}
</style>