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

    var instance = new Cesium.GeometryInstance({
      geometry: new Cesium.EllipseOutlineGeometry({
        center: Cesium.Cartesian3.fromDegrees(-100.0, 20.0),
        semiMinorAxis: 500000.0,
        semiMajorAxis: 1000000.0,
        rotation: Cesium.Math.PI_OVER_FOUR,
        vertexFormat: Cesium.VertexFormat.POSITION_AND_ST,
      }),
      id: "object returned when this instance is picked and to get/set per-instance attributes",
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