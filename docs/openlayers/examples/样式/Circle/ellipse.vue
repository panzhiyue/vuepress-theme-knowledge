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
import { Vue2olSourceTdt } from "@gis-js/vue2ol-extend";
import { Style, Fill, Circle, Stroke } from "ol/style";
export default {
  components: {
    Vue2olMap,
    Vue2olView,
    Vue2olLayerTile,
    Vue2olSourceTdt,
    Vue2olLayerVector,
    Vue2olSourceVector,
    Vue2olFeature,
    Vue2olGeomPoint,
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
      coordinates: [120, 28],
      style: new Style({
        image: new Circle({
          radius: 40, //圆半径
          fill: new Fill({
            color: "blue",
          }),
          stroke: new Stroke({
            color: "white",
            width: 1,
          }),
          scale:[1,2],
          rotation:1
        }),
      }),
      radius: 0.1,
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
          <vue2ol-geom-point :coordinates="coordinates"> </vue2ol-geom-point>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </vue2ol-map>
</template>