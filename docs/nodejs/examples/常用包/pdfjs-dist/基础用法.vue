<script>
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";
import * as pdfjsViewer from "pdfjs-dist/legacy/web/pdf_viewer.js";
import workerSrc from "pdfjs-dist/build/pdf.worker.entry";
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
import "pdfjs-dist/web/pdf_viewer.css";
export default {
  data() {
    return {
    };
  },
  props: {
    pdfUrl: {
      type: String,
    }
  },
  mounted() {
    const container = document.getElementById("viewerContainer", this.$el);

    const eventBus = new pdfjsViewer.EventBus();
    const viewer = new pdfjsViewer.PDFViewer({
      container,
      eventBus,
    });

    // Loading document.
    const loadingTask = pdfjsLib.getDocument(this.pdfUrl);
    loadingTask.promise.then((pdfDocument) => {
      viewer.setDocument(this.pdfDoc);
    });
  },
  watch: {},
  methods: {
    renderDefault() {},
  },
};
</script>
<template>
  <div class="main">
    <div id="viewerContainer">
      <div id="viewer" class="pdfViewer"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.main {
  position: relative;
  overflow: auto;

  #viewerContainer {
    position: absolute;
    width: 100%;
    height: 100%;

    .pdfViewer {
      width: 100%;
      height: 100%;
    }

    /deep/ .page {
      width: 100%;
      padding: 0;
      margin: 0;
    }
  }
}
</style>
