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

    var sphere = new Cesium.SphereOutlineGeometry({
      radius: 500000.0,
      vertexFormat: Cesium.VertexFormat.POSITION_ONLY,
    });
    var geometry = Cesium.SphereOutlineGeometry.createGeometry(sphere);
    var instance1 = new Cesium.GeometryInstance({
      geometry: geometry,
      modelMatrix: Cesium.Matrix4.multiplyByTranslation(
        Cesium.Transforms.eastNorthUpToFixedFrame(
          Cesium.Cartesian3.fromDegrees(-95.59777, 40.03883)
        ),
        new Cesium.Cartesian3(0.0, 0.0, 100.0),
        new Cesium.Matrix4()
      ),
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