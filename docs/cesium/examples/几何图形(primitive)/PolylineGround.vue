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
      geometry: new Cesium.GroundPolylineGeometry({
        positions: Cesium.Cartesian3.fromDegreesArray([
          -112.1340164450331, 36.05494287836128, -112.08821010582645,
          36.097804071380715, -112.13296079730024, 36.168769146801104,
        ]),
        loop: true,
        width: 4.0,
      }),
      attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(
          Cesium.Color.fromCssColorString("green").withAlpha(0.7)
        ),
        distanceDisplayCondition:
          new Cesium.DistanceDisplayConditionGeometryInstanceAttribute(
            1000,
            30000
          ),
      },
      id: "object returned when this instance is picked and to get/set per-instance attributes",
    });

    var primitive = _this.viewer.scene.groundPrimitives.add(
      new Cesium.GroundPolylinePrimitive({
        geometryInstances: instance,
        appearance: Cesium.PolylineColorAppearance(),
      })
    );
    _this.viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(
        -112.09946341766613,
        35.934821174169755,
        8757.28969336941
      ),
      orientation: {
        heading: 6.118309363882608,
        pitch: -0.42080844198621703,
        roll: 6.282610628632483,
      },
    });
  },
};
</script>