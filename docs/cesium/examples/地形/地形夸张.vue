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
      terrainExaggeration: 2.0, //夸张系数
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
    });

    const scene = this.viewer.scene;
    const globe = scene.globe;
    globe.terrainExaggeration = 2.0;
    globe.terrainExaggerationRelativeHeight = 2400.0;

    // 隐藏Cesium自身的logo
    this.viewer._cesiumWidget._creditContainer.style.display = "none";

    //加载地形
    this.viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
      url: "http://hzgzsoft.com:5681/data/terrain/china/",
    });

    var initialPosition = new Cesium.Cartesian3.fromDegrees(
      118.927,
      27.945,
      5000
    );
    //var initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(21.27879878293835, -21.34390550872461, 0.0716951918898415);
    this.viewer.scene.camera.setView({
      destination: initialPosition,
      // orientation: initialOrientation,
      endTransform: Cesium.Matrix4.IDENTITY,
    });
  },
};
</script>