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

    var corridor = new Cesium.CorridorOutlineGeometry({
      vertexFormat: Cesium.VertexFormat.POSITION_ONLY,
      positions: Cesium.Cartesian3.fromDegreesArray([-72.0, 40.0, -70.0, 35.0]),
      width: 100000,
    });
    var geometry = Cesium.CorridorOutlineGeometry.createGeometry(corridor);
    var instance = new Cesium.GeometryInstance({
      geometry: geometry,
    });

    var primitive = _this.viewer.scene.primitives.add(
      new Cesium.Primitive({
        geometryInstances: instance,
        appearance: new Cesium.MaterialAppearance({
          material: Cesium.Material.fromType("Color"),
          faceForward: true,
        }),
      })
    );
    Cesium.when(primitive.readyPromise)
      .then(function (primitive) {
        _this.viewer.camera.viewBoundingSphere(primitive._boundingSpheres[0]);
      })
      .otherwise(function (error) {
        window.alert(error);
      });
  },
};
</script>