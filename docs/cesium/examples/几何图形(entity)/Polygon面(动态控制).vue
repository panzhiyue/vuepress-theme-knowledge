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
        top: 500px;
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

    _this.viewer.scene.globe.depthTestAgainstTerrain = false;

    //红色面
    var entity = _this.viewer.entities.add({
      name: "Red polygon on surface",
      polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArray([
          -115.0, 37.0, -115.0, 32.0, -107.0, 33.0, -102.0, 31.0, -102.0, 35.0,
        ]),
        show: true,
        height: 0,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        extrudedHeight: 0,
        extrudedHeightReference: Cesium.HeightReference.NONE,
        stRotation: 0,
        //                    granularity: 0,
        fill: true,
        material: Cesium.Color.RED,
        outline: false,
        outlineColor: Cesium.Color.YELLOW,
        outlineWidth: 2,
        perPositionHeight: false,
        closeTop: true,
        closeBottom: true,
        arcType: Cesium.ArcType.GEODESIC,
        shadows: Cesium.ShadowMode.DISABLED,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
          0,
          10000000000
        ), //指定此点将显示在指定区间内(相机高度)
        classificationType: Cesium.ClassificationType.BOTH,
        zIndex: 1000,
      },
    });

    new ToolBar(document.getElementById("toolbar")).addMenus([
      {
        name: "show",
        menuType: ToolBar.MenuType.CHECKBOX,
        defaultValue: entity.polygon.show,
        onchange: function (event) {
          entity.polygon.show = event.currentTarget.checked;
        },
      },
      {
        name: "height",
        menuType: ToolBar.MenuType.RANGE,
        minValue: 0,
        maxValue: 200,
        step: 1,
        defaultValue: entity.polygon.height,
        onchange: function (event) {
          entity.polygon.height = event.currentTarget.value;
        },
      },
      {
        name: "heightReference",
        menuType: ToolBar.MenuType.ENUM,
        values: Cesium.HeightReference,
        defaultValue: entity.polygon.heightReference,
        onchange: function (event) {
          entity.polygon.heightReference =
            Cesium.HeightReference[event.currentTarget.value];
        },
      },
      {
        name: "extrudedHeight",
        menuType: ToolBar.MenuType.RANGE,
        minValue: 0,
        maxValue: 200,
        step: 1,
        defaultValue: entity.polygon.extrudedHeight,
        onchange: function (event) {
          entity.polygon.extrudedHeight = event.currentTarget.value;
        },
      },
      {
        name: "extrudedHeightReference",
        menuType: ToolBar.MenuType.ENUM,
        values: Cesium.HeightReference,
        defaultValue: entity.polygon.extrudedHeightReference,
        onchange: function (event) {
          entity.polygon.extrudedHeightReference =
            Cesium.HeightReference[event.currentTarget.value];
        },
      },
      {
        name: "stRotation",
        menuType: ToolBar.MenuType.RANGE,
        minValue: 0,
        maxValue: 200,
        step: 0.1,
        defaultValue: entity.polygon.stRotation,
        onchange: function (event) {
          entity.polygon.stRotation = event.currentTarget.value;
        },
      },
      {
        name: "granularity",
        menuType: ToolBar.MenuType.RANGE,
        minValue: 0,
        maxValue: 200,
        step: 1,
        defaultValue: entity.polygon.granularity,
        onchange: function (event) {
          entity.polygon.granularity = event.currentTarget.value;
        },
      },
      {
        name: "fill",
        menuType: ToolBar.MenuType.CHECKBOX,
        defaultValue: entity.polygon.fill,
        onchange: function (event) {
          entity.polygon.fill = event.currentTarget.checked;
        },
      },

      {
        name: "material",
        menuType: ToolBar.MenuType.SELECT,
        values: [
          "Color",
          "polygonArrowMaterialProperty",
          "polygonDashMaterialProperty",
          "polygonGlowMaterialProperty",
          "polygonMaterialAppearance",
          "polygonOutlineMaterialProperty",
        ],
        defaultValue: "Color",
        onchange: function (event) {
          //                        entity.polygon.material = Cesium.Color[event.currentTarget.value];
          // this.initMaterial(event.currentTarget.value);
          switch (event.currentTarget.value) {
            case "Color": {
              var material = Cesium.Color.YELLOW;
              entity.polygon.material = material;
              initColor();
              break;
            }
            case "polygonArrowMaterialProperty": {
              //带箭头线
              var material = new Cesium.polygonArrowMaterialProperty(
                Cesium.Color.PURPLE
              );
              entity.polygon.material = material;
              initpolygonArrowMaterialProperty();
              break;
            }
            case "polygonDashMaterialProperty": {
              //虚线
              var material = new Cesium.polygonDashMaterialProperty({
                color: Cesium.Color.CYAN, //颜色
                gapColor: Cesium.Color.YELLOW, //间隔颜色
                dashLength: 16,
                dashPattern: 255,
              });
              entity.polygon.material = material;
              initpolygonDashMaterialProperty();
              break;
            }
            case "polygonGlowMaterialProperty": {
              //发光的线段
              var material = new Cesium.polygonGlowMaterialProperty({
                glowPower: 0.2, //发光的长度，值为线宽的百分比(0~1.0)
                taperPower: 0.5,
                color: Cesium.Color.CORNFLOWERBLUE, //发光的颜色(中心颜色为白色)
              });
              entity.polygon.material = material;
              initpolygonGlowMaterialProperty();
              break;
            }
            case "polygonMaterialAppearance": {
              //                                var material = new Cesium.polygonMaterialAppearance({
              //                                    material: new Cesium.Material({
              //                                        fabric: {
              //                                            type: 'polygonDash',
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
              //                                entity.polygon.material = material;
              break;
            }
            case "polygonOutlineMaterialProperty": {
              var material = new Cesium.polygonOutlineMaterialProperty({
                color: Cesium.Color.ORANGE, //线的颜色
                outlineWidth: 2, //线纹理宽度
                outlineColor: Cesium.Color.BLACK, //线纹理颜色
              });
              entity.polygon.material = material;
              initpolygonOutlineMaterialProperty();
              break;
            }
          }
        },
      },
      {
        name: "outline",
        menuType: ToolBar.MenuType.CHECKBOX,
        defaultValue: entity.polygon.outline,
        onchange: function (event) {
          entity.polygon.outline = event.currentTarget.checked;
        },
      },

      {
        name: "outlineColor",
        menuType: ToolBar.MenuType.ENUM,
        values: Cesium.Color,
        defaultValue: entity.polygon.outlineColor,
        onchange: function (event) {
          entity.polygon.outlineColor = Cesium.Color[event.currentTarget.value];
        },
      },
      {
        name: "outlineWidth",
        menuType: ToolBar.MenuType.RANGE,
        minValue: 0,
        maxValue: 100,
        step: 1,
        defaultValue: entity.polygon.outlineWidth,
        onchange: function (event) {
          entity.polygon.outlineWidth = event.currentTarget.value;
        },
      },
      {
        name: "perPositionHeight",
        menuType: ToolBar.MenuType.CHECKBOX,
        defaultValue: entity.polygon.perPositionHeight,
        onchange: function (event) {
          entity.polygon.perPositionHeight = event.currentTarget.checked;
        },
      },
      {
        name: "closeTop",
        menuType: ToolBar.MenuType.CHECKBOX,
        defaultValue: entity.polygon.closeTop,
        onchange: function (event) {
          entity.polygon.closeTop = event.currentTarget.checked;
        },
      },
      {
        name: "closeBottom",
        menuType: ToolBar.MenuType.CHECKBOX,
        defaultValue: entity.polygon.closeBottom,
        onchange: function (event) {
          entity.polygon.closeBottom = event.currentTarget.checked;
        },
      },

      {
        name: "arcType",
        menuType: ToolBar.MenuType.ENUM,
        values: Cesium.ArcType,
        defaultValue: entity.polygon.arcType,
        onchange: function (event) {
          entity.polygon.arcType = Cesium.ArcType[event.currentTarget.value];
        },
      },

      {
        name: "shadows",
        menuType: ToolBar.MenuType.ENUM,
        values: Cesium.ShadowMode,
        defaultValue: entity.polygon.shadows,
        onchange: function (event) {
          entity.polygon.shadows = Cesium.ShadowMode[event.currentTarget.value];
        },
      },

      {
        name: "classificationType",
        menuType: ToolBar.MenuType.ENUM,
        values: Cesium.ClassificationType,
        defaultValue: entity.polygon.classificationType,
        onchange: function (event) {
          entity.polygon.classificationType =
            Cesium.ClassificationType[event.currentTarget.value];
        },
      },
      {
        name: "zIndex",
        menuType: ToolBar.MenuType.RANGE,
        minValue: 1,
        maxValue: 1000,
        step: 1,
        defaultValue: entity.polygon.zIndex,
        onchange: function (event) {
          entity.polygon.zIndex = event.currentTarget.value;
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
        defaultValue: entity.polygon.distanceDisplayCondition._value.near,
        onchange: function (event) {
          entity.polygon.distanceDisplayCondition =
            new Cesium.DistanceDisplayCondition(
              parseFloat(event.currentTarget.value),
              entity.polygon.distanceDisplayCondition._value.far
            );
        },
      },
      {
        name: "far",
        menuType: ToolBar.MenuType.RANGE,
        minValue: 1,
        maxValue: 5000000,
        step: 0,
        defaultValue: entity.polygon.distanceDisplayCondition._value.far,
        onchange: function (event) {
          entity.polygon.distanceDisplayCondition =
            new Cesium.DistanceDisplayCondition(
              entity.polygon.distanceDisplayCondition._value.near,
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
          defaultValue: entity.polygon.material._color,
          onchange: function (event) {
            entity.polygon.material = Cesium.Color[event.currentTarget.value];
          },
        },
      ]);
    }

    function initpolygonArrowMaterialProperty() {
      document.getElementById("material").innerHTML =
        "<div>polygonArrowMaterialProperty</div>";
      new ToolBar(document.getElementById("material")).addMenus([
        {
          name: "color",
          menuType: ToolBar.MenuType.ENUM,
          values: Cesium.Color,
          defaultValue: entity.polygon.material._color,
          onchange: function (event) {
            entity.polygon.material.color =
              Cesium.Color[event.currentTarget.value];
          },
        },
      ]);
    }

    function initpolygonDashMaterialProperty() {
      document.getElementById("material").innerHTML =
        "<div>initpolygonDashMaterialProperty</div>";
      new ToolBar(document.getElementById("material")).addMenus([
        {
          name: "color",
          menuType: ToolBar.MenuType.ENUM,
          values: Cesium.Color,
          defaultValue: entity.polygon.material.color,
          onchange: function (event) {
            entity.polygon.material.color =
              Cesium.Color[event.currentTarget.value];
          },
        },
        {
          name: "gapColor",
          menuType: ToolBar.MenuType.ENUM,
          values: Cesium.Color,
          defaultValue: entity.polygon.material.gapColor,
          onchange: function (event) {
            entity.polygon.material.gapColor =
              Cesium.Color[event.currentTarget.value];
          },
        },
        {
          name: "dashLength",
          menuType: ToolBar.MenuType.RANGE,
          minValue: 0,
          maxValue: 200,
          step: 1,
          defaultValue: entity.polygon.material.dashLength,
          onchange: function (event) {
            entity.polygon.material.dashLength = event.currentTarget.value;
          },
        },
        {
          name: "dashPattern",
          menuType: ToolBar.MenuType.RANGE,
          minValue: 0,
          maxValue: 200,
          step: 1,
          defaultValue: entity.polygon.material.dashPattern,
          onchange: function (event) {
            entity.polygon.material.dashPattern = event.currentTarget.value;
          },
        },
      ]);
    }

    function initpolygonGlowMaterialProperty() {
      document.getElementById("material").innerHTML =
        "<div>polygonGlowMaterialProperty</div>";
      new ToolBar(document.getElementById("material")).addMenus([
        {
          name: "color",
          menuType: ToolBar.MenuType.ENUM,
          values: Cesium.Color,
          defaultValue: entity.polygon.material.color,
          onchange: function (event) {
            entity.polygon.material.color =
              Cesium.Color[event.currentTarget.value];
          },
        },

        {
          name: "glowPower",
          menuType: ToolBar.MenuType.RANGE,
          minValue: 0,
          maxValue: 1,
          step: 0.1,
          defaultValue: entity.polygon.material.glowPower,
          onchange: function (event) {
            entity.polygon.material.taperPower = event.currentTarget.value;
          },
        },
        {
          name: "taperPower",
          menuType: ToolBar.MenuType.RANGE,
          minValue: 0,
          maxValue: 1,
          step: 0.1,
          defaultValue: entity.polygon.material.taperPower,
          onchange: function (event) {
            entity.polygon.material.taperPower = event.currentTarget.value;
          },
        },
      ]);
    }

    function initpolygonOutlineMaterialProperty() {
      document.getElementById("material").innerHTML =
        "<div>polygonOutlineMaterialProperty</div>";
      new ToolBar(document.getElementById("material")).addMenus([
        {
          name: "color",
          menuType: ToolBar.MenuType.ENUM,
          values: Cesium.Color,
          defaultValue: entity.polygon.material.color,
          onchange: function (event) {
            entity.polygon.material.color =
              Cesium.Color[event.currentTarget.value];
          },
        },
        {
          name: "outlineColor",
          menuType: ToolBar.MenuType.ENUM,
          values: Cesium.Color,
          defaultValue: entity.polygon.material.outlineColor,
          onchange: function (event) {
            entity.polygon.material.outlineColor =
              Cesium.Color[event.currentTarget.value];
          },
        },
        {
          name: "outlineWidth",
          menuType: ToolBar.MenuType.RANGE,
          minValue: 0,
          maxValue: 200,
          step: 1,
          defaultValue: entity.polygon.material.outlineWidth,
          onchange: function (event) {
            entity.polygon.material.outlineWidth = event.currentTarget.value;
          },
        },
      ]);
    }
  },
};
</script>