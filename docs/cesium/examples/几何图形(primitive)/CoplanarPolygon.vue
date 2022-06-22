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

    var polygon = new Cesium.CoplanarPolygonGeometry({
      vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
      polygonHierarchy: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
          -99.0, 38.0, 100000, -97.0, 38.0, 100000, -97.0, 40.0, 100000, -99.0,
          40.0, 100000,
        ]),
        holes: [
          {
            positions: Cesium.Cartesian3.fromDegreesArrayHeights([
              -98.5, 38.5, 100000, -98.5, 39.5, 100000, -97.5, 39.5, 100000,
              -97.5, 38.5, 100000,
            ]),
            holes: [
              {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                  -98.25, 38.75, 100000, -97.75, 38.75, 100000, -97.75, 39.25,
                  100000, -98.25, 39.25, 100000,
                ]),
              },
            ],
          },
        ],
      },
    });

    var instance = new Cesium.GeometryInstance({
      geometry: polygon,
      attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(
          Cesium.Color.RED
        ),
      },
    });

    var primitive = _this.viewer.scene.primitives.add(
      new Cesium.Primitive({
        geometryInstances: instance,
        appearance: new Cesium.MaterialAppearance({
          material: Cesium.Material.fromType("Color"),
          faceForward: false,
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