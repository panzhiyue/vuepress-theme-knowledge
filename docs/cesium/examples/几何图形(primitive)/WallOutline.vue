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
    let _this = this;
    Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNmZlMThiNC05MjZjLTRhMzQtYjk1NC04Mzk1OWUzNGQyNDYiLCJpZCI6MTE2NjEsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1NTk1NTEwODh9.1sP9cG15Apatkf1x1g1_P_86wc3gFNOZM66XoWLUsxc";

    _this.viewer = new Cesium.Viewer("cesiumContainers", {
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

    // 隐藏Cesium自身的logo
    _this.viewer._cesiumWidget._creditContainer.style.display = "none";

    // create a wall that spans from ground level to 10000 meters
    var wall = new Cesium.WallOutlineGeometry({
      positions: Cesium.Cartesian3.fromDegreesArrayHeights([
        -109.0, 30.0, 1000000.0, -95.0, 30.0, 1000000.0, -95.0, 40.0, 1000000.0,
        -109.0, 40.0, 1000000.0, -109.0, 30.0, 1000000.0,
      ]),
    });
    var geometry = Cesium.WallOutlineGeometry.createGeometry(wall);
    var instance1 = new Cesium.GeometryInstance({
      geometry: geometry,
    });
    _this.viewer.scene.primitives.add(
      new Cesium.Primitive({
        geometryInstances: instance1,
        appearance: new Cesium.MaterialAppearance({
          material: Cesium.Material.fromType("Color"),
          faceForward: true,
        }),
      })
    );
  },
};
</script>