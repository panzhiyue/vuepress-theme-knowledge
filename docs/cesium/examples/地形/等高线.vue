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
      terrainProvider: Cesium.createWorldTerrain({
        requestVertexNormals: true,
        requestWaterMask: true,
      }),
    });

    // 隐藏Cesium自身的logo
    this.viewer._cesiumWidget._creditContainer.style.display = "none";

    let view = {
      destination: Cesium.Rectangle.fromDegrees(
        119.05283765744,
        27.3397589411195,
        119.252892017179,
        27.3897617948041
      ),
      orientation: {
        heading: Cesium.Math.toRadians(0), //水平角度   //是当前方向 由北向东旋转的角度
        pitch: Cesium.Math.toRadians(-30), //俯视角度    //方向和水平平面的夹角,为正 表示方向向量指向水平平面上方，反之表示方向向量指向平面下方
        roll: 0, //是方向向量以正东方向为轴的旋转角度
      },
    };
    this.viewer.camera.setView(view);

    // 创建一个拥有高程阴影和等高线的组合样式
    function getElevationContourMaterial() {
      return new Cesium.Material({
        fabric: {
          type: "ElevationColorContour",
          materials: {
            contourMaterial: {
              type: "ElevationContour",
            },
            elevationRampMaterial: {
              type: "ElevationRamp",
            },
          },
          components: {
            diffuse:
              "contourMaterial.alpha == 0.0 ? elevationRampMaterial.diffuse : contourMaterial.diffuse",
            alpha: "max(contourMaterial.alpha, elevationRampMaterial.alpha)",
          },
        },
        translucent: false,
      });
    }

    var minHeight = -414.0; // 最低接近死海高度
    var maxHeight = 8777.0; // 最高接近珠峰高度
    var contourColor = Cesium.Color.RED.withAlpha(0.4); // 等高线的颜色
    var contourSpacing = 200.0; // 等高线的等间距
    var contourWidth = 1.0; // 等高线的宽度

    // 1、高程阴影
    // var material = Cesium.Material.fromType('ElevationRamp');
    // var shadingUniforms = material.uniforms;
    // shadingUniforms.minimumHeight = minHeight;
    // shadingUniforms.maximumHeight = maxHeight;
    // shadingUniforms.image = getColorRamp();

    // 2、等高线
    // var material = Cesium.Material.fromType('ElevationContour');
    // var contourUniforms = material.uniforms;
    // contourUniforms.width = contourWidth;
    // contourUniforms.spacing = contourSpacing;
    // contourUniforms.color = contourColor;

    // 3、高程阴影+等高线
    var material = getElevationContourMaterial();
    var shadingUniforms = material.materials.elevationRampMaterial.uniforms;
    shadingUniforms.minimumHeight = minHeight;
    shadingUniforms.maximumHeight = maxHeight;
    shadingUniforms.image = getColorRamp();

    var contourUniforms = material.materials.contourMaterial.uniforms;
    contourUniforms.width = contourWidth;
    contourUniforms.spacing = contourSpacing;
    contourUniforms.color = contourColor;

    this.viewer.scene.globe.material = material;

    function getColorRamp() {
      var ramp = document.createElement("canvas");
      ramp.width = 100;
      ramp.height = 1;
      var ctx = ramp.getContext("2d");
      var values = [0.0, 0.045, 0.1, 0.15, 0.37, 0.54, 1.0];
      var grd = ctx.createLinearGradient(0, 0, 100, 0);
      grd.addColorStop(values[0], "rgba(0,0,0,0.8)"); //black
      grd.addColorStop(values[1], "rgba(39,71,224,0.8)"); //blue
      grd.addColorStop(values[2], "rgba(211,59,125,0.8)"); //pink
      grd.addColorStop(values[3], "rgba(211,48,56,0.8)"); //red
      grd.addColorStop(values[4], "rgba(255,151,66,0.8)"); //orange
      grd.addColorStop(values[5], "rgba(255,215,0,0.8)"); //yellow
      grd.addColorStop(values[6], "rgba(255,255,255,0.8)"); //white
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, 100, 1);
      return ramp;
    }
  },
};
</script>