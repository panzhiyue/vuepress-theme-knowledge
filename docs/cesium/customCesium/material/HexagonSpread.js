import Effect from "./Effect"
/**
 * 六边形扩散材质
 * @date:2022-01-12
 */
 function HexagonSpreadMaterialProperty(color) {
    this._definitionChanged = new Cesium.Event();
    this._color = undefined;
    this._colorSubscription = undefined;
    this.color = color;
    this._time = new Date().getTime();
  }
  Object.defineProperties(HexagonSpreadMaterialProperty.prototype, {
    isConstant: {
      get: function () {
        return false;
      },
    },
    definitionChanged: {
      get: function () {
        return this._definitionChanged;
      },
    },
    color: Cesium.createPropertyDescriptor("color"),
  });
  HexagonSpreadMaterialProperty.prototype.getType = function (_time) {
    return Cesium.Material.HexagonSpreadMaterialType;
  };
  HexagonSpreadMaterialProperty.prototype.getValue = function (time, result) {
    if (!Cesium.defined(result)) {
      result = {};
    }
    result.color = Cesium.Property.getValueOrClonedDefault(
      this._color,
      time,
      Cesium.Color.WHITE,
      result.color
    );
    result.image = Cesium.Material.HexagonSpreadMaterialImage;
    return result;
  };
  HexagonSpreadMaterialProperty.prototype.equals = function (other) {
    const reData =
      this === other ||
      (other instanceof HexagonSpreadMaterialProperty &&
        Cesium.Property.equals(this._color, other._color));
    return reData;
  };
  Cesium.HexagonSpreadMaterialProperty = HexagonSpreadMaterialProperty;
  Cesium.Material.HexagonSpreadMaterialType = "HexagonSpreadMaterial";
  Cesium.Material.HexagonSpreadMaterialImage =
    "./../../data/pictures/hexagon.png";
  Cesium.Material.HexagonSpreadSource = `
    czm_material czm_getMaterial(czm_materialInput materialInput)
    {
         czm_material material = czm_getDefaultMaterial(materialInput);
         vec2 st = materialInput.st;
         vec4 colorImage = texture2D(image,  vec2(st));
         material.alpha = colorImage.a * color.a * 0.5;
         material.diffuse =  1.8 * color.rgb  ;
         return material;
     }
     `;
  Cesium.Material._materialCache.addMaterial(
    Cesium.Material.HexagonSpreadMaterialType,
    {
      fabric: {
        type: Cesium.Material.HexagonSpreadMaterialType,
        uniforms: {
          color: new Cesium.Color(1, 0, 0, 0.5),
          image: Cesium.Material.HexagonSpreadMaterialImage,
        },
        source: Cesium.Material.HexagonSpreadSource,
      },
      translucent: function (material) {
        return true;
      },
    }
  );
  
  // 六边形扩散效果
  class HexagonSpread extends Effect {
    constructor(viewer, id) {
      super(viewer, id);
    }
    add(position, color, maxRadius, duration, isedit = false) {
      super.add(position, color, maxRadius, duration, isedit);
      const _this = this;
      let currentRadius = 1;
      this.viewer.entities.add({
        id: _this.id,
        position: Cesium.Cartesian3.fromDegrees(
          position[0],
          position[1],
          position[2]
        ),
        ellipse: {
          semiMajorAxis: new Cesium.CallbackProperty(function (n) {
            currentRadius += (1000 / _this.duration) * 50;
            if (currentRadius > _this.maxRadius) {
              currentRadius = 1;
            }
            return currentRadius;
          }, false),
          semiMinorAxis: new Cesium.CallbackProperty(function (n) {
            return currentRadius;
          }, false),
          material: new Cesium.HexagonSpreadMaterialProperty(
            new Cesium.Color.fromCssColorString(color)
          ),
        },
      });
    }
  }

  export default HexagonSpread;