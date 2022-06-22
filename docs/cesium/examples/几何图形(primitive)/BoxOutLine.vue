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

    var box = new Cesium.BoxOutlineGeometry({
      vertexFormat: Cesium.VertexFormat.POSITION_ONLY,
      maximum: new Cesium.Cartesian3(250000.0, 250000.0, 250000.0),
      minimum: new Cesium.Cartesian3(-250000.0, -250000.0, -250000.0),
    });
    var geometry_box = Cesium.BoxOutlineGeometry.createGeometry(box);
    var instance_box = new Cesium.GeometryInstance({
      geometry: geometry_box,
      modelMatrix: Cesium.Matrix4.multiplyByTranslation(
        Cesium.Transforms.eastNorthUpToFixedFrame(
          Cesium.Cartesian3.fromDegrees(-95.59777, 40.03883)
        ),
        new Cesium.Cartesian3(0.0, 0.0, 125000.0),
        new Cesium.Matrix4()
      ),
    });

    var primitive = _this.viewer.scene.primitives.add(
      new Cesium.Primitive({
        geometryInstances: [instance_box],
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