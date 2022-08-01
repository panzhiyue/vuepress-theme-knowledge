<template>
  <div id="container" style="height: 400px"></div>
</template>

<script>
import AMapLoader from "amap-sdk";
export default {
  mounted() {
    // import("@amap/amap-jsapi-loader").then((module) => {
    // let AMapLoader = module.default;
    AMapLoader.load({
      key: "c47444380bd1a8fb8168d5adc71bf0b2", //首次load必填
      version: "2.0",
      plugins: [],
    })
      .then((AMap) => {
        let map = new AMap.Map(this.$el, {
          resizeEnable: true,
          zoom: 11,
          center: [116.397428, 39.90923],
        });
      })
      .catch((e) => {
        console.log(e);
      });
    // });
  },
};
</script>