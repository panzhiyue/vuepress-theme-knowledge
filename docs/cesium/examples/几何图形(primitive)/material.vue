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

    var scene = _this.viewer.scene;
    var primitives = scene.primitives;

    var rectangle1 = new Cesium.RectangleGeometry({
      ellipsoid: Cesium.Ellipsoid.WGS84,
      rectangle: Cesium.Rectangle.fromDegrees(-70.0, 39.0, -64.0, 42.0),
      height: 10000.0,
    });
    var geometry1 = Cesium.RectangleGeometry.createGeometry(rectangle1);
    var instance = new Cesium.GeometryInstance({
      geometry: geometry1,
    });
    var primitive = _this.viewer.scene.primitives.add(
      new Cesium.Primitive({
        geometryInstances: [instance],
        appearance: new Cesium.MaterialAppearance({
          material: Cesium.Material.fromType("Blob"),
          faceForward: true,
        }),
      })
    );
    return;

    primitives.add(
      new Cesium.RectanglePrimitive({
        rectangle: Cesium.Rectangle.fromDegrees(-120.0, 30.0, -100.0, 40.0),
        material: Cesium.Material.fromType("Asphalt"),
      })
    );
    return;
    primitives.add(
      new Cesium.RectanglePrimitive({
        rectangle: Cesium.Rectangle.fromDegrees(-100.0, 30.0, -80.0, 40.0),
        material: Cesium.Material.fromType("Blob"),
      })
    );

    primitives.add(
      new Cesium.RectanglePrimitive({
        rectangle: Cesium.Rectangle.fromDegrees(-80.0, 30.0, -60.0, 40.0),
        material: Cesium.Material.fromType("Brick"),
      })
    );

    primitives.add(
      new Cesium.RectanglePrimitive({
        rectangle: Cesium.Rectangle.fromDegrees(-120.0, 20.0, -100.0, 30.0),
        material: Cesium.Material.fromType("Cement"),
      })
    );

    primitives.add(
      new Cesium.RectanglePrimitive({
        rectangle: Cesium.Rectangle.fromDegrees(-100.0, 20.0, -80.0, 30.0),
        material: Cesium.Material.fromType("Facet"),
      })
    );

    primitives.add(
      new Cesium.RectanglePrimitive({
        rectangle: Cesium.Rectangle.fromDegrees(-80.0, 20.0, -60.0, 30.0),
        material: Cesium.Material.fromType("Grass"),
      })
    );

    primitives.add(
      new Cesium.RectanglePrimitive({
        rectangle: Cesium.Rectangle.fromDegrees(-120.0, 10.0, -100.0, 20.0),
        material: Cesium.Material.fromType("TieDye"),
      })
    );

    primitives.add(
      new Cesium.RectanglePrimitive({
        rectangle: Cesium.Rectangle.fromDegrees(-100.0, 10.0, -80.0, 20.0),
        material: Cesium.Material.fromType("Wood"),
      })
    );

    //var rectangle = primitives.add(new Cesium.RectanglePrimitive({
    //    rectangle: Cesium.Rectangle.fromDegrees(-80.0, 10.0, -60.0, 20.0),
    //    material: Cesium.Material.fromType('Erosion')
    //}));
    //scene.tweens.addProperty({
    //    object: rectangle.material.uniforms,
    //    property: 'time',
    //    startValue: 0.0,
    //    stopValue: 1.0,
    //    duration: 10.0
    //});

    var imagePath = "js/custom/material/checkerboard.png";
    var radius = 500000.0;
    var radii = new Cesium.Cartesian3(radius, radius, radius);
    var height = radius * 0.5;

    primitives.add(
      new Cesium.EllipsoidPrimitive({
        center: Cesium.Cartesian3.fromDegrees(-110.0, 50.0, height),
        radii: radii,
        material: new Cesium.Material({
          fabric: {
            materials: {
              fresnel: {
                type: "Fresnel",
                materials: {
                  reflection: {
                    uniforms: {
                      cubeMap: {
                        positiveX: imagePath,
                        negativeX: imagePath,
                        positiveY: imagePath,
                        negativeY: imagePath,
                        positiveZ: imagePath,
                        negativeZ: imagePath,
                      },
                    },
                  },
                  refraction: {
                    uniforms: {
                      cubeMap: {
                        positiveX: imagePath,
                        negativeX: imagePath,
                        positiveY: imagePath,
                        negativeY: imagePath,
                        positiveZ: imagePath,
                        negativeZ: imagePath,
                      },
                    },
                  },
                },
              },
            },
            components: {
              diffuse: "fresnel.diffuse + 0.7",
            },
          },
        }),
      })
    );

    primitives.add(
      new Cesium.EllipsoidPrimitive({
        center: Cesium.Cartesian3.fromDegrees(-90.0, 50.0, height),
        radii: radii,
        material: new Cesium.Material({
          fabric: {
            materials: {
              reflection: {
                type: "Reflection",
                uniforms: {
                  cubeMap: {
                    positiveX: imagePath,
                    negativeX: imagePath,
                    positiveY: imagePath,
                    negativeY: imagePath,
                    positiveZ: imagePath,
                    negativeZ: imagePath,
                  },
                },
              },
            },
            components: {
              diffuse: "reflection.diffuse + 0.7",
            },
          },
        }),
      })
    );

    primitives.add(
      new Cesium.EllipsoidPrimitive({
        center: Cesium.Cartesian3.fromDegrees(-70.0, 50.0, height),
        radii: radii,
        material: new Cesium.Material({
          fabric: {
            materials: {
              refraction: {
                type: "Refraction",
                uniforms: {
                  cubeMap: {
                    positiveX: imagePath,
                    negativeX: imagePath,
                    positiveY: imagePath,
                    negativeY: imagePath,
                    positiveZ: imagePath,
                    negativeZ: imagePath,
                  },
                  indexOfRefractionRatio: 0.9,
                },
              },
            },
            components: {
              diffuse: "refraction.diffuse + 0.7",
            },
          },
        }),
      })
    );
  },
};
</script>