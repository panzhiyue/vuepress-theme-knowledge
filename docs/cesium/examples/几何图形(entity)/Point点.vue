<template>
  <div id="toolbar" style="position: absolute; z-index: 10"></div>
  <div id="cesiumContainers"></div>
</template>
<script>
import "../../customCesium/extend/Sandcastle-header.js";
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

    function addPoint() {
      Sandcastle.declare(addPoint);

      _this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
        point: {
          pixelSize: 10,
          color: Cesium.Color.YELLOW,
        },
      });
    }

    function setPointProperties() {
      Sandcastle.declare(setPointProperties);

      _this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
        point: {
          show: true, // default
          color: Cesium.Color.SKYBLUE, // default: WHITE
          pixelSize: 10, // default: 1
          outlineColor: Cesium.Color.YELLOW, // default: BLACK
          outlineWidth: 3, // default: 0
        },
      });
    }

    function changePointProperties() {
      Sandcastle.declare(changePointProperties);

      var entity = _this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883, 300000.0),
        point: {
          pixelSize: 2,
        },
      });

      var point = entity.point;
      point.pixelSize = 20.0;
      point.color = Cesium.Color.YELLOW.withAlpha(0.33);
    }

    function addMultiplePoints() {
      Sandcastle.declare(addMultiplePoints);

      _this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
        point: {
          color: Cesium.Color.RED,
          pixelSize: 8,
        },
      });
      _this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-80.5, 35.14),
        point: {
          color: Cesium.Color.BLUE,
          pixelSize: 16,
        },
      });
      _this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-80.12, 25.46),
        point: {
          color: Cesium.Color.LIME,
          pixelSize: 32,
        },
      });
    }

    function scaleByDistance() {
      Sandcastle.declare(scaleByDistance);

      _this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
        point: {
          // pixelSize will multiply by the scale factor, so in this
          // example the size will range from 20px (near) to 5px (far).
          pixelSize: 10,
          scaleByDistance: new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
        },
      });
    }

    function fadeByDistance() {
      Sandcastle.declare(fadeByDistance);

      _this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
        point: {
          pixelSize: 20,
          translucencyByDistance: new Cesium.NearFarScalar(
            1.5e2,
            1.0,
            1.5e7,
            0.2
          ),
        },
      });
    }

    Sandcastle.addToolbarMenu([
      {
        text: "Add point",
        onselect: function () {
          addPoint();
          Sandcastle.highlight(addPoint);
        },
      },
      {
        text: "Set point properties at creation",
        onselect: function () {
          setPointProperties();
          Sandcastle.highlight(setPointProperties);
        },
      },
      {
        text: "Change point properties",
        onselect: function () {
          changePointProperties();
          Sandcastle.highlight(changePointProperties);
        },
      },
      {
        text: "Add multiple points",
        onselect: function () {
          addMultiplePoints();
          Sandcastle.highlight(addMultiplePoints);
        },
      },
      {
        text: "Scale by _this.viewer distance",
        onselect: function () {
          scaleByDistance();
          Sandcastle.highlight(scaleByDistance);
        },
      },
      {
        text: "Fade by _this.viewer distance",
        onselect: function () {
          fadeByDistance();
          Sandcastle.highlight(fadeByDistance);
        },
      },
    ]);

    Sandcastle.reset = function () {
      _this.viewer.entities.removeAll();
    };
  },
};
</script>