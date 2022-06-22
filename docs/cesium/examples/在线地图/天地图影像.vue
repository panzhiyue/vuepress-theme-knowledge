<template>
  <div id="cesiumContainers"></div>
</template>
<script>
export default {
  data() {
    return {
      viewer: null,
    };
  },
  mounted() {
    Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNmZlMThiNC05MjZjLTRhMzQtYjk1NC04Mzk1OWUzNGQyNDYiLCJpZCI6MTE2NjEsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1NTk1NTEwODh9.1sP9cG15Apatkf1x1g1_P_86wc3gFNOZM66XoWLUsxc";

    this.viewer = new Cesium.Viewer("cesiumContainers", {
      animation: false,
      homeButton: false,
      fullscreenButton: false,
      geocoder: false,
      sceneModePicker: false,
      baseLayerPicker: false,
      timeline: false,
      infoBox: false,
      navigationHelpButton: false,
      selectionIndicator: false,
      terrainProvider: null,
      imageryProvider: false,
      baseLayerPicker: false,
    });

    // 隐藏Cesium自身的logo
    this.viewer._cesiumWidget._creditContainer.style.display = "none";

    var tdt_key = "175a5b2808c13412ec9dcf33ba919b94";
    var img_tdt = new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.com/img_w/wmts?tk=" + tdt_key,
      layer: "img",
      style: "default",
      tileMatrixSetID: "w",
      format: "tiles",
      maximumLevel: 18,
    });

    var img_cia = new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.gov.cn/cia_w/wmts?tk=" + tdt_key,
      layer: "cia",
      style: "default",
      tileMatrixSetID: "w",
      format: "tiles",
      maximumLevel: 18,
    });
    var layers = this.viewer.scene.imageryLayers;
    layers.addImageryProvider(img_tdt);
    layers.addImageryProvider(img_cia);
  },
};
</script>