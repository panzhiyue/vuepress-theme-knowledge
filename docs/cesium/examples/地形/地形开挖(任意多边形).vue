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

    // 逆时针方向采集
    var points = [
      new Cesium.Cartesian3(
        -1715292.6999753984,
        4993153.157628936,
        3566663.752912529
      ),
      new Cesium.Cartesian3(
        -1715285.8150713604,
        4993167.07260133,
        3566647.6921528564
      ),
      new Cesium.Cartesian3(
        -1715286.59857654,
        4993181.309761941,
        3566627.519787549
      ),
      new Cesium.Cartesian3(
        -1715299.0249209427,
        4993191.177501195,
        3566607.86126436
      ),
      new Cesium.Cartesian3(
        -1715349.5762367432,
        4993176.675656664,
        3566603.878289345
      ),
      new Cesium.Cartesian3(
        -1715375.5538853381,
        4993159.990032478,
        3566614.671147202
      ),
      new Cesium.Cartesian3(
        -1715370.1945772346,
        4993141.041835706,
        3566643.580587877
      ),
      new Cesium.Cartesian3(
        -1715359.7019716015,
        4993131.063945592,
        3566662.468046927
      ),
      new Cesium.Cartesian3(
        -1715321.9141253997,
        4993137.762602262,
        3566671.205164391
      ),
    ];

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

      var normal = Cesium.Cartesian3.cross(right, up, new Cesium.Cartesian3());
      normal = Cesium.Cartesian3.normalize(normal, normal);

      var originCenteredPlane = new Cesium.Plane(normal, 0.0);
      var distance = Cesium.Plane.getPointDistance(
        originCenteredPlane,
        midpoint
      );

      clippingPlanes.push(new Cesium.ClippingPlane(normal, distance));
    }
    this.viewer.scene.globe.clippingPlanes = new Cesium.ClippingPlaneCollection({
      planes: clippingPlanes,
      edgeWidth: 1.0,
      edgeColor: Cesium.Color.WHITE,
    });

    this.viewer.camera.lookAt(
      new Cesium.Cartesian3(
        -1715298.755222242,
        4993163.868150364,
        3566670.284367589
      ),
      new Cesium.HeadingPitchRange(0, -Cesium.Math.toRadians(90), 10000)
    );
  },
};
</script>