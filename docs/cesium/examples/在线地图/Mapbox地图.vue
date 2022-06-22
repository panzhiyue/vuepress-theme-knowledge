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

    var mapbox_street = new Cesium.MapboxImageryProvider({
      mapId: "mapbox.mapbox-streets-v8",
      accessToken:
        "sk.eyJ1IjoicGFuemhpeXVlIiwiYSI6ImNsNG51cGoyMjAxYXYzY3BkMmU2eDZvd3UifQ.YitoVH4YvpWPnQ3b74oGqg",
    });
    var layers = this.viewer.scene.imageryLayers;
    layers.addImageryProvider(mapbox_street);
  },
};
</script>