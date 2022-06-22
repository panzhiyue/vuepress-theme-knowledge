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

    // Create a pointPrimitive collection with two points
    var points = _this.viewer.scene.primitives.add(
      new Cesium.PointPrimitiveCollection()
    );
    points.add({
      position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
      color: Cesium.Color.YELLOW,
    });
    points.add({
      position: Cesium.Cartesian3.fromDegrees(-65.59777, 40.03883),
      color: Cesium.Color.CYAN,
    });

    // Create a billboard collection with two billboards
    var billboards = _this.viewer.scene.primitives.add(
      new Cesium.BillboardCollection()
    );
    billboards.add({
      position: new Cesium.Cartesian3.fromDegrees(-55.59777, 40.03883),
      image: "./img/igs/fly.png",
    });
    billboards.add({
      position: new Cesium.Cartesian3.fromDegrees(-45.59777, 40.03883),
      image: "./img/igs/fly.png",
    });

    // Create a label collection with two labels
    var labels = _this.viewer.scene.primitives.add(
      new Cesium.LabelCollection()
    );
    labels.add({
      position: new Cesium.Cartesian3.fromDegrees(-75.59777, 30.03883),
      text: "A label",
    });
    labels.add({
      position: new Cesium.Cartesian3.fromDegrees(-65.59777, 30.03883),
      text: "Another label",
    });

    // Create a polyline collection with two polylines
    var polylines = new Cesium.PolylineCollection();
    polylines.add({
      positions: Cesium.Cartesian3.fromDegreesArray([
        -75.1, 39.57, -77.02, 38.53, -80.5, 35.14, -80.12, 25.46,
      ]),
      width: 2,
      material: new Cesium.Material({
        fabric: {
          type: "Color",
          uniforms: {
            color: new Cesium.Color(1.0, 1.0, 0.0, 1.0),
          },
        },
      }),
    });

    polylines.add({
      positions: Cesium.Cartesian3.fromDegreesArray([
        -73.1, 37.57, -75.02, 36.53, -78.5, 33.14, -78.12, 23.46,
      ]),
      width: 4,
      material: new Cesium.Material({
        fabric: {
          type: "Color",
          uniforms: {
            color: new Cesium.Color(1.0, 0.0, 1.0, 1.0),
          },
        },
      }),
    });
    var collection = new Cesium.PrimitiveCollection();
    collection.add(polylines);
    _this.viewer.scene.primitives.add(collection);
  },
};
</script>