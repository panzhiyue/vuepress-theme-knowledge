<script>
import {
  Vue2olMap,
  Vue2olView,
  Vue2olLayerTile,
  Vue2olLayerVector,
  Vue2olSourceVector,
  Vue2olFeature,
  Vue2olGeomPolygon,
} from "@gis-js/vue2ol";
import { Vue2olSourceTdt } from "@gis-js/vue2ol-extend";
import { Style, Fill } from "ol/style";
export default {
  components: {
    Vue2olMap,
    Vue2olView,
    Vue2olLayerTile,
    Vue2olSourceTdt,
    Vue2olLayerVector,
    Vue2olSourceVector,
    Vue2olFeature,
    Vue2olGeomPolygon,
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
      coordinates: [
        [
          [120, 28],
          [121, 28],
          [121, 27],
          [120, 27],
          [120, 28],
        ],
      ],
      style: new Style({
        fill: new Fill({
          color: "rgba(255,0,0,0.5)",
        }),
      }),
    };
  },
  mounted() {},
};
</script>

<template>
  <vue2ol-map style="height: 400px" :options="mapOptions">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-tdt></vue2ol-source-tdt>
    </vue2ol-layer-tile>
    <vue2ol-layer-tile>
      <vue2ol-source-tdt :layer="'cia'"></vue2ol-source-tdt>
    </vue2ol-layer-tile>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature :style-obj="style">
          <vue2ol-geom-polygon :coordinates="coordinates">
          </vue2ol-geom-polygon>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </vue2ol-map>
</template>