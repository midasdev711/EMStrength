<template>
  <vue-dropzone
    :options="dropzoneOptions"
    :use-custom-slot="true"
    ref="myDropzone"
    id="0xffff0122"
    class="avatar-upload"
  >
    <div class="dropzone-custom-content">
      <h3 class="dropzone-custom-title">Drag and drop to upload content</h3>
      <div class="subtitle">or click to select a file from your computer</div>
      <div class="subtitle">“150 x 150 pixels”</div>
    </div>
  </vue-dropzone>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  data: function() {
    return {
      dropzoneOptions: {
        id: "mydropzone",
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        thumbnailHeight: 150,
        addRemoveLinks: true,
        maxFiles: 1,
        maxFileSize: 1 //1MB
      }
    };
  },
  methods: {
    getFiles() {
      return this.$refs.myDropzone.getAcceptedFiles();
    },
    removeAllFiles() {
      return this.$refs.myDropzone.removeAllFiles();
    }
  }
};
</script>

<style scoped>
.vue-dropzone {
  position: relative;
}

.avatar-upload {
  z-index: 1 !important;
}

.dropzone-custom-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}

.subtitle {
  color: #314b5f;
}
</style>
