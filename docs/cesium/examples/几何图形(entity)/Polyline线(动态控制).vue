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
    <div
      id="material"
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
        top: 400px;
        left: 0px;
      "
    >
      <div>material</div>
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
    _this.viewer.scene.globe.depthTestAgainstTerrain = false;

    var entity = _this.viewer.entities.add({
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
          118.05283765744, 27.3397589411195, 119.05283765744, 27.3397589411195,
          119.55283765744, 27.3397589411195,
        ]),
        show: true, //true:显示,false:隐藏
        width: 10, //宽度
        granularity: 0,
        material: Cesium.Color.RED, //材质
        depthFailMaterial: Cesium.Color.GREEN, //低于地形的材质
        arcType: Cesium.ArcType.GEODESIC,
        clampToGround: true, //是否贴地
        shadows: Cesium.ShadowMode.DISABLED, //指定多段线是从光源投射阴影还是从光源接收阴影
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
          0,
          100000000
        ), //指定此点将显示在指定区间内(相机高度)
        classificationType: Cesium.ClassificationType.BOTH, //指定此多段线在地面上是对地形、三维平铺还是同时对两者进行分类。
        zIndex: 1000,
      },
    });

    console.log(entity);
    new ToolBar(document.getElementById("toolbar")).addMenus([
      {
        name: "show",
        menuType: ToolBar.MenuType.CHECKBOX,
        defaultValue: entity.polyline.show,
        onchange: function (event) {
          entity.polyline.show = event.currentTarget.checked;
        },
      },
      {
        name: "width",
        menuType: ToolBar.MenuType.RANGE,
        minValue: 1,
        maxValue: 200,
        step: 1,
        defaultValue: entity.polyline.width,
        onchange: function (event) {
          entity.polyline.width = event.currentTarget.value;
        },
      },
      {
        name: "granularity",
        menuType: ToolBar.MenuType.RANGE,
        minValue: 0,
        maxValue: 200,
        step: 1,
        defaultValue: entity.polyline.granularity,
        onchange: function (event) {
          entity.polyline.granularity = event.currentTarget.value;
        },
      },

      {
        name: "material",
        menuType: ToolBar.MenuType.SELECT,
        values: [
          "Color",
          "PolylineArrowMaterialProperty",
          "PolylineDashMaterialProperty",
          "PolylineGlowMaterialProperty",
          "PolylineMaterialAppearance",
          "PolylineOutlineMaterialProperty",
        ],
        defaultValue: "Color",
        onchange: function (event) {
          //                        entity.polyline.material = Cesium.Color[event.currentTarget.value];
          // this.initMaterial(event.currentTarget.value);
          switch (event.currentTarget.value) {
            case "Color": {
              var material = Cesium.Color.YELLOW;
              entity.polyline.material = material;
              initColor();
              break;
            }
            case "PolylineArrowMaterialProperty": {
              //带箭头线
              var material = new Cesium.PolylineArrowMaterialProperty(
                Cesium.Color.PURPLE
              );
              entity.polyline.material = material;
              initPolylineArrowMaterialProperty();
              break;
            }
            case "PolylineDashMaterialProperty": {
              //虚线
              var material = new Cesium.PolylineDashMaterialProperty({
                color: Cesium.Color.CYAN, //颜色
                gapColor: Cesium.Color.YELLOW, //间隔颜色
                dashLength: 16,
                dashPattern: 255,
              });
              entity.polyline.material = material;
              initPolylineDashMaterialProperty();
              break;
            }
            case "PolylineGlowMaterialProperty": {
              //发光的线段
              var material = new Cesium.PolylineGlowMaterialProperty({
                glowPower: 0.2, //发光的长度，值为线宽的百分比(0~1.0)
                taperPower: 0.5,
                color: Cesium.Color.CORNFLOWERBLUE, //发光的颜色(中心颜色为白色)
              });
              entity.polyline.material = material;
              initPolylineGlowMaterialProperty();
              break;
            }
            case "PolylineMaterialAppearance": {
              //                                var material = new Cesium.PolylineMaterialAppearance({
              //                                    material: new Cesium.Material({
              //                                        fabric: {
              //                                            type: 'PolylineDash',
              //                                            uniforms: {
              //                                                color: {
              //                                                    red: 1,
              //                                                    green: 1,
              //                                                    blue: 0,
              //                                                    alpha: 1
              //                                                },
              //                                                gapColor: {
              //                                                    red: 1,
              //                                                    green: 1,
              //                                                    blue: 1,
              //                                                    alpha: 1
              //                                                },
              //                                                dashLength: 50
              //                                            }
              //                                        }
              //                                    })
              //                                });
              //                                entity.polyline.material = material;
              break;
            }
            case "PolylineOutlineMaterialProperty": {
              var material = new Cesium.PolylineOutlineMaterialProperty({
                color: Cesium.Color.ORANGE, //线的颜色
                outlineWidth: 2, //线纹理宽度
                outlineColor: Cesium.Color.BLACK, //线纹理颜色
              });
              entity.polyline.material = material;
              initPolylineOutlineMaterialProperty();
              break;
            }
          }
        },
      },
      {
        name: "depthFailMaterial",
        menuType: ToolBar.MenuType.ENUM,
        values: Cesium.Color,
        defaultValue: entity.polyline.material._color,
        onchange: function (event) {
          entity.polyline.depthFailMaterialColor =
            Cesium.Color[event.currentTarget.value];
        },
      },

      {
        name: "arcType",
        menuType: ToolBar.MenuType.ENUM,
        values: Cesium.ArcType,
        defaultValue: entity.polyline.arcType,
        onchange: function (event) {
          entity.polyline.arcType = Cesium.ArcType[event.currentTarget.value];
        },
      },
      {
        name: "clampToGround",
        menuType: ToolBar.MenuType.CHECKBOX,
        defaultValue: entity.polyline.clampToGround,
        onchange: function (event) {
          entity.polyline.clampToGround = event.currentTarget.checked;
        },
      },
      {
        name: "shadows",
        menuType: ToolBar.MenuType.ENUM,
        values: Cesium.ShadowMode,
        defaultValue: entity.polyline.shadows,
        onchange: function (event) {
          entity.polyline.shadows =
            Cesium.ShadowMode[event.currentTarget.value];
        },
      },
      {
        name: "classificationType",
        menuType: ToolBar.MenuType.ENUM,
        values: Cesium.ClassificationType,
        defaultValue: entity.polyline.classificationType,
        onchange: function (event) {
          entity.polyline.classificationType =
            Cesium.ClassificationType[event.currentTarget.value];
        },
      },
      {
        name: "zIndex",
        menuType: ToolBar.MenuType.RANGE,
        minValue: 1,
        maxValue: 1000,
        step: 1,
        defaultValue: entity.polyline.zIndex,
        onchange: function (event) {
          entity.polyline.zIndex = event.currentTarget.value;
        },
      },
    ]);

    //#region
    new ToolBar(document.getElementById("distanceDisplayCondition")).addMenus([
      {
        name: "near",
        menuType: ToolBar.MenuType.RANGE,
        minValue: 1,
        maxValue: 5000000,
        step: 0,
        defaultValue: entity.polyline.distanceDisplayCondition._value.near,
        onchange: function (event) {
          entity.polyline.distanceDisplayCondition =
            new Cesium.DistanceDisplayCondition(
              parseFloat(event.currentTarget.value),
              entity.polyline.distanceDisplayCondition._value.far
            );
        },
      },
      {
        name: "far",
        menuType: ToolBar.MenuType.RANGE,
        minValue: 1,
        maxValue: 5000000,
        step: 0,
        defaultValue: entity.polyline.distanceDisplayCondition._value.far,
        onchange: function (event) {
          entity.polyline.distanceDisplayCondition =
            new Cesium.DistanceDisplayCondition(
              entity.polyline.distanceDisplayCondition._value.near,
              parseFloat(event.currentTarget.value)
            );
        },
      },
    ]);

    //#endregion
    initColor();
    //#material
    function initColor() {
      document.getElementById("material").innerHTML = "<div>Color</div>";
      new ToolBar(document.getElementById("material")).addMenus([
        {
          name: "color",
          menuType: ToolBar.MenuType.ENUM,
          values: Cesium.Color,
          defaultValue: entity.polyline.material._color,
          onchange: function (event) {
            entity.polyline.material = Cesium.Color[event.currentTarget.value];
          },
        },
      ]);
    }

    function initPolylineArrowMaterialProperty() {
      document.getElementById("material").innerHTML =
        "<div>PolylineArrowMaterialProperty</div>";
      new ToolBar(document.getElementById("material")).addMenus([
        {
          name: "color",
          menuType: ToolBar.MenuType.ENUM,
          values: Cesium.Color,
          defaultValue: entity.polyline.material._color,
          onchange: function (event) {
            entity.polyline.material.color =
              Cesium.Color[event.currentTarget.value];
          },
        },
      ]);
    }

    function initPolylineDashMaterialProperty() {
      document.getElementById("material").innerHTML =
        "<div>initPolylineDashMaterialProperty</div>";
      new ToolBar(document.getElementById("material")).addMenus([
        {
          name: "color",
          menuType: ToolBar.MenuType.ENUM,
          values: Cesium.Color,
          defaultValue: entity.polyline.material.color,
          onchange: function (event) {
            entity.polyline.material.color =
              Cesium.Color[event.currentTarget.value];
          },
        },
        {
          name: "gapColor",
          menuType: ToolBar.MenuType.ENUM,
          values: Cesium.Color,
          defaultValue: entity.polyline.material.gapColor,
          onchange: function (event) {
            entity.polyline.material.gapColor =
              Cesium.Color[event.currentTarget.value];
          },
        },
        {
          name: "dashLength",
          menuType: ToolBar.MenuType.RANGE,
          minValue: 0,
          maxValue: 200,
          step: 1,
          defaultValue: entity.polyline.material.dashLength,
          onchange: function (event) {
            entity.polyline.material.dashLength = event.currentTarget.value;
          },
        },
        {
          name: "dashPattern",
          menuType: ToolBar.MenuType.RANGE,
          minValue: 0,
          maxValue: 200,
          step: 1,
          defaultValue: entity.polyline.material.dashPattern,
          onchange: function (event) {
            entity.polyline.material.dashPattern = event.currentTarget.value;
          },
        },
      ]);
    }

    function initPolylineGlowMaterialProperty() {
      document.getElementById("material").innerHTML =
        "<div>PolylineGlowMaterialProperty</div>";
      new ToolBar(document.getElementById("material")).addMenus([
        {
          name: "color",
          menuType: ToolBar.MenuType.ENUM,
          values: Cesium.Color,
          defaultValue: entity.polyline.material.color,
          onchange: function (event) {
            entity.polyline.material.color =
              Cesium.Color[event.currentTarget.value];
          },
        },

        {
          name: "glowPower",
          menuType: ToolBar.MenuType.RANGE,
          minValue: 0,
          maxValue: 1,
          step: 0.1,
          defaultValue: entity.polyline.material.glowPower,
          onchange: function (event) {
            entity.polyline.material.taperPower = event.currentTarget.value;
          },
        },
        {
          name: "taperPower",
          menuType: ToolBar.MenuType.RANGE,
          minValue: 0,
          maxValue: 1,
          step: 0.1,
          defaultValue: entity.polyline.material.taperPower,
          onchange: function (event) {
            entity.polyline.material.taperPower = event.currentTarget.value;
          },
        },
      ]);
    }

    function initPolylineOutlineMaterialProperty() {
      document.getElementById("material").innerHTML =
        "<div>PolylineOutlineMaterialProperty</div>";
      new ToolBar(document.getElementById("material")).addMenus([
        {
          name: "color",
          menuType: ToolBar.MenuType.ENUM,
          values: Cesium.Color,
          defaultValue: entity.polyline.material.color,
          onchange: function (event) {
            entity.polyline.material.color =
              Cesium.Color[event.currentTarget.value];
          },
        },
        {
          name: "outlineColor",
          menuType: ToolBar.MenuType.ENUM,
          values: Cesium.Color,
          defaultValue: entity.polyline.material.outlineColor,
          onchange: function (event) {
            entity.polyline.material.outlineColor =
              Cesium.Color[event.currentTarget.value];
          },
        },
        {
          name: "outlineWidth",
          menuType: ToolBar.MenuType.RANGE,
          minValue: 0,
          maxValue: 200,
          step: 1,
          defaultValue: entity.polyline.material.outlineWidth,
          onchange: function (event) {
            entity.polyline.material.outlineWidth = event.currentTarget.value;
          },
        },
      ]);
    }
  },
};
</script>