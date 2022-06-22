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

    // 使用ViewportQuad创建一个显示图片的区域
    var viewportQuad = new Cesium.ViewportQuad();
    viewportQuad.rectangle = new Cesium.BoundingRectangle(5, 5, 80, 92);
    this.viewer.scene.primitives.add(viewportQuad);

    viewportQuad.material = new Cesium.Material({
      fabric: {
        type: "Image",
        uniforms: {
          color: new Cesium.Color(1.0, 1.0, 1.0, 1.0),
          image:
            "https://images.gitee.com/uploads/images/2018/0808/221053_67e3c1d9_470194.png",
        },
      },
    });
  },
};
</script>