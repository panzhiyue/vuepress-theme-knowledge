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

    // 1. create a polygon from points
    var polygon = new Cesium.PolygonGeometry({
      polygonHierarchy: new Cesium.PolygonHierarchy(
        Cesium.Cartesian3.fromDegreesArray([
          -62.0, 40.0, -60.0, 35.0, -65.0, 30.0, -60.0, 30.0, -58.0, 40.0,
        ])
      ),
    });
    var geometry1 = Cesium.PolygonGeometry.createGeometry(polygon);

    // 2. create a nested polygon with holes
    var polygonWithHole = new Cesium.PolygonGeometry({
      polygonHierarchy: new Cesium.PolygonHierarchy(
        Cesium.Cartesian3.fromDegreesArray([
          -109.0, 30.0, -95.0, 30.0, -95.0, 40.0, -109.0, 40.0,
        ]),
        [
          new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArray([
              -107.0, 31.0, -107.0, 39.0, -97.0, 39.0, -97.0, 31.0,
            ]),
            [
              new Cesium.PolygonHierarchy(
                Cesium.Cartesian3.fromDegreesArray([
                  -105.0, 33.0, -99.0, 33.0, -99.0, 37.0, -105.0, 37.0,
                ]),
                [
                  new Cesium.PolygonHierarchy(
                    Cesium.Cartesian3.fromDegreesArray([
                      -103.0, 34.0, -101.0, 34.0, -101.0, 36.0, -103.0, 36.0,
                    ])
                  ),
                ]
              ),
            ]
          ),
        ]
      ),
    });
    var geometry2 = Cesium.PolygonGeometry.createGeometry(polygonWithHole);

    // 3. create extruded polygon
    var extrudedPolygon = new Cesium.PolygonGeometry({
      polygonHierarchy: new Cesium.PolygonHierarchy(
        Cesium.Cartesian3.fromDegreesArray([
          -72.0, 40.0, -70.0, 35.0, -75.0, 30.0, -70.0, 30.0, -68.0, 40.0,
        ])
      ),
      extrudedHeight: 300000,
    });
    var geometry3 = Cesium.PolygonGeometry.createGeometry(extrudedPolygon);
    var instance1 = new Cesium.GeometryInstance({
      geometry: geometry1,
    });
    var instance2 = new Cesium.GeometryInstance({
      geometry: geometry2,
    });
    var instance3 = new Cesium.GeometryInstance({
      geometry: geometry3,
    });
    _this.viewer.scene.primitives.add(
      new Cesium.Primitive({
        geometryInstances: [instance1, instance2, instance3],
        appearance: new Cesium.MaterialAppearance({
          material: Cesium.Material.fromType("Color"),
          faceForward: true,
        }),
      })
    );
  },
};
</script>