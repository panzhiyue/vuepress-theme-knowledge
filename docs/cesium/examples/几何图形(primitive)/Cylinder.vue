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

    var cylinder = new Cesium.CylinderGeometry({
      length: 200000,
      topRadius: 80000,
      bottomRadius: 200000,
    });
    var geometry = Cesium.CylinderGeometry.createGeometry(cylinder);

    // create cylinder geometry
    var cylinder2 = new Cesium.CylinderOutlineGeometry({
      length: 200000,
      topRadius: 200000,
      bottomRadius: 200000,
    });
    var geometry2 = Cesium.CylinderOutlineGeometry.createGeometry(cylinder2);

    var instance = new Cesium.GeometryInstance({
      geometry: geometry,
      modelMatrix: Cesium.Matrix4.multiplyByTranslation(
        Cesium.Transforms.eastNorthUpToFixedFrame(
          Cesium.Cartesian3.fromDegrees(-95.59777, 40.03883)
        ),
        new Cesium.Cartesian3(0.0, 0.0, 0.0),
        new Cesium.Matrix4()
      ),
    });
    var instance2 = new Cesium.GeometryInstance({
      geometry: geometry2,
      modelMatrix: Cesium.Matrix4.multiplyByTranslation(
        Cesium.Transforms.eastNorthUpToFixedFrame(
          Cesium.Cartesian3.fromDegrees(-105.59777, 40.03883)
        ),
        new Cesium.Cartesian3(0.0, 0.0, 0.0),
        new Cesium.Matrix4()
      ),
    });
    var primitive = _this.viewer.scene.primitives.add(
      new Cesium.Primitive({
        geometryInstances: [instance, instance2],
        appearance: new Cesium.MaterialAppearance({
          material: Cesium.Material.fromType("Color"),
          faceForward: true,
        }),
      })
    );
  },
};
</script>