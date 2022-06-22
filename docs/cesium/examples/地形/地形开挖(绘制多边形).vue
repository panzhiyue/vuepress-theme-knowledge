<template>
  <div id="cesiumContainers"></div>
</template>
<script>
import Polygon from "../../customCesium/draw/Polygon";
export default {
  data() {
    return {
      viewer: null,
    };
  },
  mounted() {
    Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNmZlMThiNC05MjZjLTRhMzQtYjk1NC04Mzk1OWUzNGQyNDYiLCJpZCI6MTE2NjEsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1NTk1NTEwODh9.1sP9cG15Apatkf1x1g1_P_86wc3gFNOZM66XoWLUsxc";

    this.viewer = new Cesium.Viewer("cesiumContainers", {
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
    this.viewer._cesiumWidget._creditContainer.style.display = "none";

    //加载地形
    this.viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
      url: "http://hzgzsoft.com:5681/data/terrain/china/",
    });

    var draw = new Polygon();
    draw.drawStart.addEventListener(() => {
      console.log(11);
    });

    draw.drawEnd.addEventListener((event) => {
      var points = event.positions;

      var pointsLength = points.length;

      var clippingPlanes = [];
      for (var i = 0; i < pointsLength; ++i) {
        var nextIndex = (i + 1) % pointsLength;
        var midpoint = Cesium.Cartesian3.add(
          points[i],
          points[nextIndex],
          new Cesium.Cartesian3()
        );

        midpoint = Cesium.Cartesian3.multiplyByScalar(midpoint, 0.5, midpoint);

        var up = Cesium.Cartesian3.normalize(midpoint, new Cesium.Cartesian3());
        var right = Cesium.Cartesian3.subtract(
          points[nextIndex],
          midpoint,
          new Cesium.Cartesian3()
        );
        right = Cesium.Cartesian3.normalize(right, right);
        var normal = Cesium.Cartesian3.cross(
          right,
          up,
          new Cesium.Cartesian3()
        );
        if (isNaN(normal.x)) {
          continue;
        }
        normal = Cesium.Cartesian3.normalize(normal, normal);

        var originCenteredPlane = new Cesium.Plane(normal, 0.0);
        var distance = Cesium.Plane.getPointDistance(
          originCenteredPlane,
          midpoint
        );

        clippingPlanes.push(new Cesium.ClippingPlane(normal, distance));
      }

      this.viewer.scene.globe.clippingPlanes =
        new Cesium.ClippingPlaneCollection({
          planes: clippingPlanes,
          edgeWidth: 1.0,
          edgeColor: Cesium.Color.BLACK,
        });

      //viewer.camera.lookAt(new Cesium.Cartesian3(-1715298.755222242, 4993163.868150364, 3566670.284367589),
      //    new Cesium.HeadingPitchRange(0, -Cesium.Math.toRadians(90), 10000));
    });
    draw.setViewer(this.viewer);
    draw.setActive(true);
  },
};
</script>