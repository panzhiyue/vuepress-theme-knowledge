<script>
let pdfjsLib, pdfjsViewer, workerSrc;
import "pdfjs-dist/web/pdf_viewer.css";
export default {
  data() {
    return {};
  },
  props: {},
  async mounted() {
    pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.js");
    pdfjsViewer = await import("pdfjs-dist/legacy/web/pdf_viewer.js");
    workerSrc = (await import("pdfjs-dist/build/pdf.worker.entry")).default;
    pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

    const container = document.getElementById("viewerContainer", this.$el);

    const eventBus = new pdfjsViewer.EventBus();
    const viewer = new pdfjsViewer.PDFViewer({
      container,
      eventBus,
    });

    // Loading document.
    const loadingTask = pdfjsLib.getDocument(
      "http://doc.panzhiyue.website/%E5%9B%BE%E4%B9%A6/MarkDown%E7%BC%96%E8%BE%91%E5%99%A8%E4%B9%8BTypora.pdf"
    );
    loadingTask.promise.then((pdfDocument) => {
      viewer.setDocument(pdfDocument);
    });
  },
  watch: {},
  methods: {},
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
  height: 400px;

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
