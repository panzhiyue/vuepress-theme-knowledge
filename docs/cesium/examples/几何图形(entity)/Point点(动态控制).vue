<template>
  <div id="cesiumContainers" style="position: relative">
    <div
      id="toolbar"
      style="
        position: absolute;
        z-index: 10;
        background: rgba(42, 42, 42, 0.8);
        padding: 4px;
        border-radius: 4px;
        margin: 5px;
        color: #fff;
        font-size: 14px;
        font-family: 微软雅黑;
      "
    ></div>
    <div
      id="scaleByDistance"
      style="
        position: absolute;
        z-index: 10;
        background: rgba(42, 42, 42, 0.8);
        padding: 4px;
        border-radius: 4px;
        margin: 5px;
        color: #fff;
        font-size: 14px;
        font-family: 微软雅黑;
        top: 200px;
      "
    >
      <div>scaleByDistance</div>
    </div>
    <div
      id="translucencyByDistance"
      style="
        position: absolute;
        z-index: 10;
        background: rgba(42, 42, 42, 0.8);
        padding: 4px;
        border-radius: 4px;
        margin: 5px;
        color: #fff;
        font-size: 14px;
        font-family: 微软雅黑;
        top: 380px;
      "
    >
      <div>translucencyByDistance</div>
    </div>
    <div
      id="distanceDisplayCondition"
      style="
        position: absolute;
        z-index: 10;
        background: rgba(42, 42, 42, 0.8);
        padding: 4px;
        border-radius: 4px;
        margin: 5px;
        color: #fff;
        font-size: 14px;
        font-family: 微软雅黑;
        top: 0px;
        left: 500px;
      "
    >
      <div>distanceDisplayCondition</div>
    </div>
  </div>
</template>
<script>
import ToolBar from "../../customCesium/control/ToolBar";
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

    _this.viewer.scene.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(
        119.05283765744,
        27.3397589411195,
        2000000
      ),
      endTransform: Cesium.Matrix4.IDENTITY,
    });
    _this.viewer.scene.globe.depthTestAgainstTerrain = true;

    var entity = _this.viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(
        119.05283765744,
        27.3397589411195
      ),
      point: {
        show: true, //true:显示,false:隐藏
        pixelSize: 10, //大小(不包括边框)
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, //地形属性
        color: Cesium.Color.YELLOW, //填充色
        outlineColor: Cesium.Color.RED, //边框色
        outlineWidth: 2, //边框宽度
        scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.5, 8.0e6, 0), //（近值，近端放大率，远值，远端放大率） 给定距离视点的近值和远值，以及对应的两个近端放大率和远端放大率。当距离在近值和远值之间时，放大/缩小倍数在两个放大两率之间递增。超出这个范围后，放大率保持不变
        translucencyByDistance: new Cesium.NearFarScalar(1.5e2, 1.5, 8.0e6, 0), //根据相机距离设置透明度
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
          0,
          500000000
        ), //指定此点将显示在指定区间内(相机高度)
        disableDepthTestDistance: 50000000, //相机距离小于指定值不会被遮挡
      },
    });
    new ToolBar(document.getElementById("toolbar")).addMenus([
      {
        name: "show",
        menuType: ToolBar.MenuType.CHECKBOX,
        defaultValue: entity.point.show,
        onchange: function (event) {
          entity.point.show = event.currentTarget.checked;
        },
      },
      {
        name: "pixelSize",
        menuType: ToolBar.MenuType.RANGE,
        minValue: 1,
        maxValue: 200,
        step: 1,
        defaultValue: entity.point.pixelSize,
        onchange: function (event) {
          entity.point.pixelSize = event.currentTarget.value;
        },
      },
      {
        name: "heightReference",
        menuType: ToolBar.MenuType.ENUM,
        values: Cesium.HeightReference,
        defaultValue: entity.point.heightReference,
        onchange: function (event) {
          entity.point.heightReference =
            Cesium.HeightReference[event.currentTarget.value];
        },
      },
      {
        name: "color",
        menuType: ToolBar.MenuType.ENUM,
        values: Cesium.Color,
        defaultValue: entity.point.color,
        onchange: function (event) {
          entity.point.color = Cesium.Color[event.currentTarget.value];
        },
      },
      {
        name: "outlineColor",
        menuType: ToolBar.MenuType.ENUM,
        values: Cesium.Color,
        defaultValue: entity.point.outlineColor,
        onchange: function (event) {
          entity.point.outlineColor = Cesium.Color[event.currentTarget.value];
        },
      },
      {
        name: "outlineWidth",
        menuType: ToolBar.MenuType.RANGE,
        minValue: 1,
        maxValue: 200,
        step: 1,
        defaultValue: entity.point.outlineWidth,
        onchange: function (event) {
          entity.point.outlineWidth = event.currentTarget.value;
        },
      },

      {
        name: "disableDepthTestDistance",
        menuType: ToolBar.MenuType.RANGE,
        minValue: 1,
        maxValue: 5000000,
        step: 1,
        defaultValue: entity.point.disableDepthTestDistance,
        onchange: function (event) {
          entity.point.disableDepthTestDistance = event.currentTarget.value;
        },
      },
    ]);
    //#region scaleByDistance
    new ToolBar(document.getElementById("scaleByDistance")).addMenus([
      {
        name: "near",
        menuType: ToolBar.MenuType.RANGE,
        minValue: 1,
        maxValue: 5000000,
        step: 0,
        defaultValue: entity.point.scaleByDistance._value.near,
        onchange: function (event) {
          entity.point.scaleByDistance._value.near = event.currentTarget.value;
        },
      },
      {
        name: "nearValue",
        menuType: ToolBar.MenuType.RANGE,
        minValue: 1,
        maxValue: 5000000,
        step: 0,
        defaultValue: entity.point.scaleByDistance._value.nearValue,
        onchange: function (event) {
          entity.point.scaleByDistance._value.nearValue =
            event.currentTarget.value;
        },
      },
      {
        name: "far",
        menuType: ToolBar.MenuType.RANGE,
        minValue: 1,
        maxValue: 5000000,
        step: 0,
        defaultValue: entity.point.scaleByDistance._value.far,
        onchange: function (event) {
          entity.point.scaleByDistance._value.far = event.currentTarget.value;
        },
      },
      {
        name: "farValue",
        menuType: ToolBar.MenuType.RANGE,
        minValue: 1,
        maxValue: 5000000,
        step: 0,
        defaultValue: entity.point.scaleByDistance._value.farValue,
        onchange: function (event) {
          entity.point.scaleByDistance._value.farValue =
            event.currentTarget.value;
        },
      },
    ]);
    //#endregion
    //#region translucencyByDistance

    new ToolBar(document.getElementById("translucencyByDistance")).addMenus([
      {
        name: "near",
        menuType: ToolBar.MenuType.RANGE,
        minValue: 1,
        maxValue: 5000000,
        step: 0,
        defaultValue: entity.point.translucencyByDistance._value.near,
        onchange: function (event) {
          entity.point.translucencyByDistance._value.near =
            event.currentTarget.value;
        },
      },
      {
        name: "nearValue",
        menuType: ToolBar.MenuType.RANGE,
        minValue: 1,
        maxValue: 10,
        step: 0,
        defaultValue: entity.point.translucencyByDistance._value.nearValue,
        onchange: function (event) {
          entity.point.translucencyByDistance._value.nearValue =
            event.currentTarget.value;
        },
      },
      {
        name: "far",
        menuType: ToolBar.MenuType.RANGE,
        minValue: 1,
        maxValue: 500000000,
        step: 0,
        defaultValue: entity.point.translucencyByDistance._value.far,
        onchange: function (event) {
          entity.point.translucencyByDistance._value.far =
            event.currentTarget.value;
        },
      },
      {
        name: "farValue",
        menuType: ToolBar.MenuType.RANGE,
        minValue: 1,
        maxValue: 10,
        step: 0,
        defaultValue: entity.point.translucencyByDistance._value.farValue,
        onchange: function (event) {
          entity.point.translucencyByDistance._value.farValue =
            event.currentTarget.value;
        },
      },
    ]);
    //#endregion

    //#region
    new ToolBar(document.getElementById("distanceDisplayCondition")).addMenus([
      {
        name: "near",
        menuType: ToolBar.MenuType.RANGE,
        minValue: 1,
        maxValue: 5000000,
        step: 0,
        defaultValue: entity.point.distanceDisplayCondition._value.near,
        onchange: function (event) {
          entity.point.distanceDisplayCondition._value.near =
            event.currentTarget.value;
        },
      },
      {
        name: "far",
        menuType: ToolBar.MenuType.RANGE,
        minValue: 1,
        maxValue: 5000000,
        step: 0,
        defaultValue: entity.point.distanceDisplayCondition._value.far,
        onchange: function (event) {
          entity.point.distanceDisplayCondition._value.far =
            event.currentTarget.value;
        },
      },
    ]);
  },
};
</script>