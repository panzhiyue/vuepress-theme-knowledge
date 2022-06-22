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

    // 1. create a rectangle
    var rectangle1 = new Cesium.RectangleGeometry({
      ellipsoid: Cesium.Ellipsoid.WGS84,
      rectangle: Cesium.Rectangle.fromDegrees(-70.0, 39.0, -64.0, 42.0),
      height: 10000.0,
    });
    var geometry1 = Cesium.RectangleGeometry.createGeometry(rectangle1);

    // 2. create an extruded rectangle without a top
    var rectangle2 = new Cesium.RectangleGeometry({
      ellipsoid: Cesium.Ellipsoid.WGS84,
      rectangle: Cesium.Rectangle.fromDegrees(-80.0, 39.0, -74.0, 42.0),
      height: 10000.0,
      extrudedHeight: 300000,
    });
    var geometry2 = Cesium.RectangleGeometry.createGeometry(rectangle2);
    var instance1 = new Cesium.GeometryInstance({
      geometry: geometry1,
    });
    var instance2 = new Cesium.GeometryInstance({
      geometry: geometry2,
    });
    _this.viewer.scene.primitives.add(
      new Cesium.Primitive({
        geometryInstances: [instance1, instance2],
        appearance: new Cesium.MaterialAppearance({
          material: Cesium.Material.fromType("Color"),
          faceForward: true,
        }),
      })
    );
  },
};
</script>