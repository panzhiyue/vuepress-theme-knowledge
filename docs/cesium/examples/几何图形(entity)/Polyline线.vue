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

    //加载地形
    _this.viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
      url: "http://hzgzsoft.com:5681/data/terrain/china/",
    });

    //红色线
    var redLine = _this.viewer.entities.add({
      name: "redLine",
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([-75, 35, -125, 35]),
        width: 5,
        material: Cesium.Color.RED,
        clampToGround: true,
      },
    });

    var glowingLine = _this.viewer.entities.add({
      name: "Glowing blue line on the surface",
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([-75, 37, -125, 37]),
        width: 10,
        material: new Cesium.PolylineGlowMaterialProperty({
          glowPower: 0.2,
          taperPower: 0.5,
          color: Cesium.Color.CORNFLOWERBLUE,
        }),
      },
    });

    //黑色边,橘色填充
    var orangeOutlined = _this.viewer.entities.add({
      name: "Orange line with black outline at height and following the surface",
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
          -75, 39, 250000, -125, 39, 250000,
        ]),
        width: 5,
        material: new Cesium.PolylineOutlineMaterialProperty({
          color: Cesium.Color.ORANGE,
          outlineWidth: 2,
          outlineColor: Cesium.Color.BLACK,
        }),
      },
    });
    //箭头
    var purpleArrow = _this.viewer.entities.add({
      name: "Purple straight arrow at height",
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
          -75, 43, 500000, -125, 43, 500000,
        ]),
        width: 10,
        arcType: Cesium.ArcType.NONE,
        material: new Cesium.PolylineArrowMaterialProperty(Cesium.Color.PURPLE),
      },
    });

    //虚线
    var dashedLine = _this.viewer.entities.add({
      name: "Blue dashed line",
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
          -75, 45, 500000, -125, 45, 500000,
        ]),
        width: 4,
        material: new Cesium.PolylineDashMaterialProperty({
          color: Cesium.Color.CYAN,
        }),
      },
    });
  },
};
</script>