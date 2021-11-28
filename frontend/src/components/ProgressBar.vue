<template>
  <div class="progress progressBar" v-show="show">
    <div
      class="progress-bar progress-bar-striped progress-bar-animated bg-info"
      role="progressbar"
      :style="{ width: currentWidth + '%' }"
    >
      {{ label }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  components: {},
  data() {
    return {
      show: false,
      label: "",
      currentWidth: 0,
    };
  },
  mounted: function () {
    this.emitter.on("SHOW_PROGRESS_BAR", (label) => {
      this.show = true;
      // Eventually set the label
      if (label) {
        this.label = label;
      }
      this.currentWidth = 0;
    });
    this.emitter.on("HIDE_PROGRESS_BAR", () => {
      this.show = false;
      this.label = "";
      this.currentWidth = 0;
    });
    this.emitter.on("PROGRESS_BAR_WIDTH", (newWidth) => {
      this.currentWidth = newWidth;
    });
  },
};
</script>

<style>
.progressBar {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>