<template>
  <input
    id="to2D"
    type="button"
    value="转二维"
    @click="viewer.scene.morphTo2D(1)"
  />
  <input
    id="to3D"
    type="button"
    value="转三维"
    @click="viewer.scene.morphTo3D(1)"
  />
  <input
    id="toGLB"
    type="button"
    value="伦布视图"
    @click="viewer.scene.morphToColumbusView(1)"
  />
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
    });
  },
};
</script>