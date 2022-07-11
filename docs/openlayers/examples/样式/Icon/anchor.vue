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
import { Style, Icon, Circle, Fill } from "ol/style";
import markerIcon from "./marker.png";

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
      //   style: null,
      radius: 0.1,
      position: "left-top",
    };
  },
  computed: {
    style() {
      let styles = [];
      styles.push(
        new Style({
          image: new Circle({
            fill: new Fill({
              color: "#fff",
            }),
            radius: 4,
          }),
        })
      );

      let anchor = null;
      switch (this.position) {
        case "left-top": {
          anchor = [0, 0];
          break;
        }
        case "right-top": {
          anchor = [1, 0];
          break;
        }
        case "left-bottom": {
          anchor = [0, 1];
          break;
        }
        case "right-bottom": {
          anchor = [1, 1];
          break;
        }
      }
      styles.push(
        new Style({
          image: new Icon({
            anchor: anchor,
            scale: 0.15,
            src: markerIcon,
          }),
        })
      );
      return styles;
    },
  },
  mounted() {
  },
};
</script>

<template>
  <select v-model="position">
    <option value="left-top">左上角</option>
    <option value="right-top">右上角</option>
    <option value="left-bottom">左下角</option>
    <option value="right-bottom">右下角</option>
  </select>
  <vue2ol-map style="height: 400px" :options="mapOptions">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-tdt></vue2ol-source-tdt>
    </vue2ol-layer-tile>
    <vue2ol-layer-tile>
      <vue2ol-source-tdt :layer="'cia'"></vue2ol-source-tdt>
    </vue2ol-layer-tile>
    <vue2ol-layer-vector :style-obj="style">
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-point :coordinates="coordinates"> </vue2ol-geom-point>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </vue2ol-map>
</template>