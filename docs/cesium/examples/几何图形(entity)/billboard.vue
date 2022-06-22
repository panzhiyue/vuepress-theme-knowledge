<template>
  <div id="cesiumContainers">
    <div
      id="toolbar"
      style="
        position: absolute;
        z-index: 10;
        background: rgba(42, 42, 42, 0.8);
        padding: 4px;
        border-radius: 4px;
        margin: 5px;
        color: #fff;
        font-size: 14px;
        font-family: 微软雅黑;
      "
    >
      <div id="viewChangDiegoed">View Changed</div>
      <div id="cameraChanged">Camera Changed</div>
    </div>
  </div>
</template>
<script>
import ToolBar from "../../customCesium/control/ToolBar";
import Cesium_Logo_overlay from "./Cesium_Logo_overlay.png"
import facility from "./facility.gif"
import whiteShapes from "./whiteShapes.png"

export default {
  data() {
    return {
      viewer: null,
    };
  },
  mounted() {
    let _this = this;
    Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNmZlMThiNC05MjZjLTRhMzQtYjk1NC04Mzk1OWUzNGQyNDYiLCJpZCI6MTE2NjEsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1NTk1NTEwODh9.1sP9cG15Apatkf1x1g1_P_86wc3gFNOZM66XoWLUsxc";

    _this.viewer = new Cesium.Viewer("cesiumContainers", {
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
    _this.viewer._cesiumWidget._creditContainer.style.display = "none";

    function addBillboard() {
      _this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
        billboard: {
          image: Cesium_Logo_overlay,
        },
      });
    }

    function setBillboardProperties() {
      _this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
        billboard: {
          image: Cesium_Logo_overlay, // default: undefined
          show: true, // default
          pixelOffset: new Cesium.Cartesian2(0, -50), // default: (0, 0)
          eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // default
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // default: CENTER
          scale: 2.0, // default: 1.0
          color: Cesium.Color.LIME, // default: WHITE
          rotation: Cesium.Math.PI_OVER_FOUR, // default: 0.0
          alignedAxis: Cesium.Cartesian3.ZERO, // default
          width: 100, // default: undefined
          height: 25, // default: undefined
        },
      });
    }

    function changeBillboardProperties() {
      var entity = _this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883, 300000.0),
        billboard: {
          image: Cesium_Logo_overlay,
        },
      });

      var billboard = entity.billboard;
      billboard.scale = 3.0;
      billboard.color = Cesium.Color.WHITE.withAlpha(0.25);
    }

    function sizeBillboardInMeters() {
      var entity = _this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
        billboard: {
          image: Cesium_Logo_overlay,
          sizeInMeters: true,
        },
      });

      _this.viewer.zoomTo(entity);
    }

    function addMultipleBillboards() {
      var logoUrl = Cesium_Logo_overlay;
      var facilityUrl = facility;

      _this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
        billboard: {
          image: logoUrl,
        },
      });
      _this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-80.5, 35.14),
        billboard: {
          image: facilityUrl,
        },
      });
      _this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-80.12, 25.46),
        billboard: {
          image: facilityUrl,
        },
      });
    }

    function scaleByDistance() {
      _this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
        billboard: {
          image: facility,
          scaleByDistance: new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
        },
      });
    }

    function fadeByDistance() {
      _this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
        billboard: {
          image: Cesium_Logo_overlay,
          translucencyByDistance: new Cesium.NearFarScalar(
            1.5e2,
            2.0,
            1.5e7,
            0.5
          ),
        },
      });
    }

    function offsetByDistance() {
      Cesium.when.all(
        [
          Cesium.Resource.fetchImage(Cesium_Logo_overlay),
          Cesium.Resource.fetchImage(facility),
        ],
        (images) => {
          // As _this.viewer zooms closer to facility billboard,
          // increase pixelOffset on CesiumLogo billboard to this height
          var facilityHeight = images[1].height;

          // colocated billboards, separate as _this.viewer gets closer
          _this.viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
            billboard: {
              image: images[1],
              horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            },
          });
          _this.viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
            billboard: {
              image: images[0],
              horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              pixelOffset: new Cesium.Cartesian2(0.0, -facilityHeight),
              pixelOffsetScaleByDistance: new Cesium.NearFarScalar(
                1.0e3,
                1.0,
                1.5e6,
                0.0
              ),
              translucencyByDistance: new Cesium.NearFarScalar(
                1.0e3,
                1.0,
                1.5e6,
                0.1
              ),
            },
          });
        }
      );
    }

    function addMarkerBillboards() {
      // Add several billboards based on the above image in the atlas.
      _this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
        billboard: {
          image: whiteShapes,
          imageSubRegion: new Cesium.BoundingRectangle(49, 43, 18, 18),
          color: Cesium.Color.LIME,
        },
      });
      _this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-84.0, 39.0),
        billboard: {
          image: whiteShapes,
          imageSubRegion: new Cesium.BoundingRectangle(61, 23, 18, 18),
          color: new Cesium.Color(0, 0.5, 1.0, 1.0),
        },
      });
      _this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-70.0, 41.0),
        billboard: {
          image: whiteShapes,
          imageSubRegion: new Cesium.BoundingRectangle(67, 80, 14, 14),
          color: new Cesium.Color(0.5, 0.9, 1.0, 1.0),
        },
      });
      _this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-73.0, 37.0),
        billboard: {
          image: whiteShapes,
          imageSubRegion: new Cesium.BoundingRectangle(27, 103, 22, 22),
          color: Cesium.Color.RED,
        },
      });
      _this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-79.0, 35.0),
        billboard: {
          image: whiteShapes,
          imageSubRegion: new Cesium.BoundingRectangle(105, 105, 18, 18),
          color: Cesium.Color.YELLOW,
        },
      });
    }

    var terrainProvider;
    function disableDepthTest() {
      terrainProvider = _this.viewer.terrainProvider;
      _this.viewer.terrainProvider = Cesium.createWorldTerrain();
      _this.viewer.scene.globe.depthTestAgainstTerrain = true;

      _this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-122.1958, 46.1915),
        billboard: {
          image: facility,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
      });
      _this.viewer.zoomTo(_this.viewer.entities);
    }

    new ToolBar(document.getElementById("toolbar")).addMenus([
      {
        name: "show",
        menuType: ToolBar.MenuType.SELECT,
        values: [
          "Add billboard",
          "Set billboard properties at creation",
          "Change billboard properties",
          "Size billboard in meters",
          "Add multiple billboards",
          "Scale by _this.viewer distance",
          "Fade by _this.viewer distance",
          "Offset by _this.viewer distance",
          "Add marker billboards",
          "Disable the depth test when clamped to ground",
        ],
        defaultValue: "Camera Options",
        onchange: (event) => {
          console.log(this);
          switch (event.currentTarget.value) {
            case "Add billboard": {
              addBillboard();
              break;
            }
            case "Set billboard properties at creation": {
              setBillboardProperties();
              break;
            }
            case "Change billboard properties": {
              changeBillboardProperties();
              break;
            }
            case "Size billboard in meters": {
              sizeBillboardInMeters();
              break;
            }
            case "Add multiple billboards": {
              addMultipleBillboards();
              break;
            }
            case "Scale by _this.viewer distance": {
              scaleByDistance();
              break;
            }
            case "Fade by _this.viewer distance": {
              fadeByDistance();
              break;
            }
            case "Offset by _this.viewer distance": {
              offsetByDistance();
              break;
            }
            case "Add marker billboards": {
              addMarkerBillboards();
              break;
            }
            case "Disable the depth test when clamped to ground": {
              disableDepthTest();
              break;
            }
          }
        },
      },
    ]);
  },
};
</script>