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

    // A polyline with two connected line segments
    function computeCircle(radius) {
      var positions = [];
      for (var i = 0; i < 360; i++) {
        var radians = Cesium.Math.toRadians(i);
        positions.push(
          new Cesium.Cartesian2(
            radius * Math.cos(radians),
            radius * Math.sin(radians)
          )
        );
      }
      return positions;
    }

    var volume = new Cesium.PolylineVolumeGeometry({
      vertexFormat: Cesium.VertexFormat.POSITION_ONLY,
      polylinePositions: Cesium.Cartesian3.fromDegreesArray([
        -72.0, 40.0, -70.0, 35.0,
      ]),
      shapePositions: computeCircle(100000.0),
    });
    var instance = new Cesium.GeometryInstance({
      geometry: volume,
    });
    var primitive = _this.viewer.scene.primitives.add(
      new Cesium.Primitive({
        geometryInstances: instance,
        appearance: new Cesium.PolylineMaterialAppearance({
          material: Cesium.Material.fromType("Color"),
        }),
      })
    );
  },
};
</script>