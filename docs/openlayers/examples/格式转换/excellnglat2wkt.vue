<template>
  <div>
    xy点<textarea v-model="input"></textarea>
    <button @click="handleClick">=></button>
    <button @click="handleClick2">{{ btnText }}</button>
    wkt<textarea v-model="output"></textarea>
  </div>
</template>
<script>
import * as proj from "ol/proj";
import { WKT } from "ol/format";
import { MultiPolygon,Polygon } from "ol/geom";
export default {
  data() {
    return {
      input: "",
      output: "",
      btnText: "<=",
    };
  },
  methods: {
    handleClick() {
      this.toWkt(this.input)
        .then((result) => {
          // console.log(result);
          this.output = result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleClick2() {
      this.fromWkt(this.output)
        .then((result) => {
          // console.log(result);
          this.input = result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toWkt(input) {
      let sourceProj = proj.get("EPSG:3857");
      let destProj = proj.get("EPSG:4326");
      return new Promise((resolve, reject) => {
        let pointStrList = input
          .replace(new RegExp("，", "gm"), " ")
          .replace(new RegExp(",", "gm"), " ")
          .replace(new RegExp("	", "gm"), " ")
          .replace(new RegExp("  ", "gm"), " ")
          .split("\n");

        pointStrList = pointStrList.filter((item) => {
          return item.trim() != "";
        });

        let coordinateList = {};
        for (let index = 0; index < pointStrList.length; index++) {
          let item = pointStrList[index];
          let itemSplit = item.split(" ");
          let coordinate = [];

          if (itemSplit.length != 3) {
            reject(`第${index + 1}行‘${item}’：不是‘区块号 X Y’格式！`);
          }
          if (isNaN(itemSplit[1]) || isNaN(itemSplit[2])) {
            reject(`第${index + 1}行‘${item}’：X或Y不是数值！`);
          }

          if (itemSplit[1] < 1000000) {
            coordinate = [parseFloat(itemSplit[1]), parseFloat(itemSplit[2])];
          } else {
            coordinate = [parseFloat(itemSplit[2]), parseFloat(itemSplit[1])];
          }

          if (!coordinateList[itemSplit[0]]) {
            coordinateList[itemSplit[0]] = [];
          }
          coordinateList[itemSplit[0]].push(coordinate);
        }

        let coordinates = [];
        for (let i in coordinateList) {
          let cs = coordinateList[i];
          if (cs.length < 3) {
            reject(`区块‘${i}’点数不足3个！`);
          }
          coordinates.push([
            cs.map((coordinate) => {
              return new proj.transform(coordinate, sourceProj, destProj);
            }),
          ]);
        }

        let geom = new WKT().writeGeometry(new MultiPolygon(coordinates));
        resolve(geom);
      });
    },
    fromWkt(input) {
      let sourceProj = proj.get("EPSG:4326");
      let destProj = proj.get("EPSG:3857");
      return new Promise((resolve, reject) => {
        let geom = new WKT().readGeometry(input);
        let coordinates = [];
        if (geom instanceof Polygon) {
          coordinates = [geom.getCoordinates()];
        } else {
          coordinates = geom.getCoordinates();
        }

        let text = "";
        coordinates.forEach((item, index) => {
          let cs = item[0].map((coordinate) => {
            return new proj.transform(coordinate, sourceProj, destProj);
          });
          cs.forEach((item2) => {
            text += `${index+1} ${item2[1]} ${item2[0]} \r\n`;
          });
        });

        resolve(text);
      });
    },
  },
};
</script>
