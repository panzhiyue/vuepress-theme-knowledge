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

    var position = Cesium.Cartographic.toCartesian(
      new Cesium.Cartographic.fromDegrees(119.15, 27.8, 100)
    );
    var distance = -3000.0; // 开挖距离
    var boundingSphere = new Cesium.BoundingSphere(position, distance);

    var clippingPlaneCollection = new Cesium.ClippingPlaneCollection({
      modelMatrix: Cesium.Transforms.eastNorthUpToFixedFrame(position),
      planes: [
        new Cesium.ClippingPlane(
          new Cesium.Cartesian3(1.0, 0.0, 0.0),
          distance
        ),
        new Cesium.ClippingPlane(
          new Cesium.Cartesian3(-1.0, 0.0, 0.0),
          distance
        ),
        new Cesium.ClippingPlane(
          new Cesium.Cartesian3(0.0, 1.0, 0.0),
          distance
        ),
        new Cesium.ClippingPlane(
          new Cesium.Cartesian3(0.0, -1.0, 0.0),
          distance
        ),
      ],
      edgeWidth: 0.0,
      edgeColor: Cesium.Color.WHITE,
    });

    this.viewer.scene.globe.clippingPlanes = clippingPlaneCollection;

    this.viewer.camera.viewBoundingSphere(
      boundingSphere,
      new Cesium.HeadingPitchRange(0.5, 1.0, boundingSphere.radius * 5.0)
    );
    this.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
  },
};
</script>