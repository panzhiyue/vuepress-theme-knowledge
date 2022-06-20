<template>
  <vue2ol-map style="height: 400px">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
  </vue2ol-map>
</template>
<script>
import { Vue2olMap, Vue2olView, Vue2olLayerTile } from "@gis-js/vue2ol";
// const { Vue2olSourceTDT } = require("@gis-js/vue2ol-extend");
import { Vue2olSourceTdt } from "@gis-js/vue2ol-extend";
export default {
  components: {
    Vue2olMap,
    Vue2olView,
    Vue2olLayerTile,
    Vue2olSourceTdt,
  },
  data() {
    return {
      zoom: 10, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326", //坐标系
      },
    };
  },
  mounted() {},
};
</script>