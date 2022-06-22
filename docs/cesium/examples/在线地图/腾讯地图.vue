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

    var layers = this.viewer.scene.imageryLayers;
    layers.addImageryProvider(
      new Cesium.UrlTemplateImageryProvider({
        url: "https://p2.map.gtimg.com/sateTiles/{z}/{sx}/{sy}/{x}_{reverseY}.jpg?version=229",
        customTags: {
          sx: function (imageryProvider, x, y, level) {
            return x >> 4;
          },
          sy: function (imageryProvider, x, y, level) {
            return ((1 << level) - y) >> 4;
          },
        },
      })
    );
    var custom = new Cesium.UrlTemplateImageryProvider({
      url: "https://rt3.map.gtimg.com/tile?z={z}&x={x}&y={reverseY}&styleid=2&version=297",
    });

    this.viewer.imageryLayers.addImageryProvider(custom);
  },
};
</script>