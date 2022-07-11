<script>
import {
  Vue2olMap,
  Vue2olView,
  Vue2olLayerTile,
  Vue2olLayerVector,
  Vue2olSourceVector,
  Vue2olFeature,
  Vue2olGeomPoint,
} from "@gis-js/vue2ol";
// import { reactive } from "node_modules/vue/dist/vue";

// const mapOptions = reactive({
//   controls: [],
// });

// const zoom = ref(7);

// const center = ref([120, 28]);

// const viewOptions = reactive({
//   projection: "EPSG:4326", //坐标系
// });

// const layer = ref("img");

export default {
  components: {
    Vue2olMap,
    Vue2olView,
  },
  data() {
    return {
      mapOptions: {
        controls: [],
      },
      zoom: 7, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326", //坐标系
      },
      layer: "img",
    };
  },
  computed() {},
  mounted() {},
};
</script>

<template>
  <select v-model="layer">
    <option></option>
  </select>
  <vue2ol-map style="height: 400px" :options="mapOptions">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
  </vue2ol-map>
</template>