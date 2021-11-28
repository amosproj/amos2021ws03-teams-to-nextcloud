<template>
  <input
    type="file"
    id="fileInput"
    ref="fileInput"
    multiple
    v-on:change="handleFileUpload()"
    style="display: none"
  />
</template>

<script>
import { useToast } from "vue-toastification";

export default {
  name: "Upload",
  components: {},
  data() {
    return {
      uploadedSize: 0,
      totalSize: 0,
      processedFiles: 0,
      totalFiles: 0,
      toast: null
    };
  },
  mounted() {
    // Get toast interface
    this.toast = useToast();

    // Trigger the file input programmatically
    this.emitter.on("OPEN_FILE_DIALOG", () => {
      this.$refs.fileInput.click();
      this.uploadedSize = 0;
      this.totalSize = 0;
      this.processedFiles = 0;
      this.totalFiles = 0;
    });
    // Here we monitor the upload progress and update the progress bar.
    this.emitter.on("UPLOAD_PROGRESS", (uploadedBytes) => {
      if (uploadedBytes) {
        this.uploadedSize += uploadedBytes;
      }
      this.emitter.emit("PROGRESS_BAR_WIDTH",(this.uploadedSize / this.totalSize) * 100);
    });
    // Here we monitor how many file are uploaded. Once all are uploaded we hide the progress bar
    this.emitter.on("UPLOAD_FINISHED", (result) => {
      // Increment the number of processed files
      this.processedFiles++;
      // Hide the progress bar after the upload is done
      if (this.processedFiles == this.totalFiles) {
        setTimeout(() => this.emitter.emit("HIDE_PROGRESS_BAR"), 1000);
      }

      // Show a notification
      if(result.success) {
        this.toast.success(result.message);
      } else {
        this.toast.error(result.message);
      }
    });
  },
  methods: {
    handleFileUpload() {
      let files = this.$refs.fileInput.files;
      if(files.length == 0) {
        return;
      }
      // Show the progress bar
      this.emitter.emit("SHOW_PROGRESS_BAR", "Uploading " + files.length + " item" + (files.length == 1 ? "" : "s") + "...");
      // Calculate the total size
      for (let i = 0; i < files.length; i++) {
        this.totalSize += files[i].size;
      }
      // Set the total files
      this.totalFiles = files.length;
      // Start the upload
      this.emitter.emit("FILE_UPLOAD", files);
    },
  },
};
</script>
