

<template>
  <div>
    <div style="z-index: 9000">
      <input type="text" v-model="address" />
      <input
        type="button"
        style="z-index: 1000"
        @click="geocoder"
        value="确定"
      />
      <!-- <BUtton type="private"></BUtton> -->
    </div>
    <div
      id="geocoder_container"
      style="position: relative; height: 400px; z-index: 0"
    ></div>
  </div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
console.log(AMapLoader);
export default {
  data() {
    return {
      address: "建业路418号",
      AMap: null,
      map: null,
    };
  },
  mounted() {
    window._AMapSecurityConfig = {
      securityJsCode: "825c7a80988be7e7757fcbc6ad8e417c",
    };
    AMapLoader.load({
      key: "c47444380bd1a8fb8168d5adc71bf0b2", //首次load必填
      version: "2.0",
      plugins: [],
    })
      .then((AMap) => {
        this.AMap = AMap;
        this.map = new AMap.Map("geocoder_container", {
          resizeEnable: true,
          zoom: 11,
          center: [116.397428, 39.90923],
        });
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    geocoder() {
      this.AMap.plugin("AMap.Geocoder", () => {
        var geocoder = new this.AMap.Geocoder({
          // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
          city: "全国",
        });

        //地理编码,返回地理编码结果
        geocoder.getLocation(this.address, (status, result) => {
          console.log(status, result);
          if (status === "complete" && result.info === "OK") {
            this.geocoder_CallBack(result);
          }
        });
      });
      //   console.log(this.AMap);
      //   var geocoder = new this.AMap.Geocoder({
      //     city: "010", //城市，默认：“全国”
      //     radius: 1000, //范围，默认：500
      //   });
      //   //地理编码,返回地理编码结果
      //   geocoder.getLocation(this.address, (status, result) => {
      //     console.log(status, result);
      //     if (status === "complete" && result.info === "OK") {
      //       this.geocoder_CallBack(result);
      //     }
      //   });
    },
    addMarker(i, d) {
      var marker = new this.AMap.Marker({
        map: this.map,
        position: [d.location.getLng(), d.location.getLat()],
      });
      var infoWindow = new this.AMap.InfoWindow({
        content: d.formattedAddress,
        offset: {
          x: 0,
          y: -30,
        },
      });
      marker.on("mouseover", function (e) {
        infoWindow.open(this.map, marker.getPosition());
      });
    },
    geocoder_CallBack(data) {
      //地理编码结果数组
      var geocode = data.geocodes;
      for (var i = 0; i < geocode.length; i++) {
        this.addMarker(i, geocode[i]);
      }
      this.map.setFitView();
    },
  },
};
</script>