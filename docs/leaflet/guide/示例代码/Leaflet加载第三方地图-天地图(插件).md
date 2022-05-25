[TOC]

# Leaflet加载第三方地图-天地图(插件)

把天地图提供的图层封装成插件，统一调用

L.TileProviders.Base.js代码如下

```javascript
//定义插件
L.TileProviders = {};

L.TileProviders.Base = L.Class.extend({
    maps: {},
    options: {},
    crs: L.CRS.EPSG3857,
    initialize(maps, options) {
        this.maps = L.Util.extend(this.maps, maps || {});
        this.options = L.Util.extend(this.options, options || {});
    },
    /**
     * 获取图层
     * @param {string} type 图层类型
     * @param {Object} options TileLayer Options
     */
    getLayer(type, options) {
        var map = this.maps[type];
        var url = map.url;
        options = L.Util.extend(this.options, options || {});
        options.key = map.key ? map.key : options.key;
        return L.tileLayer(url, options);
    }
});
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

L.TileProvider.TianDiTu.js代码如下

```javascript
/**
 * 天地图图层提供者
 * @param {Object} maps 
 * @param {Object} options
 */
L.TileProviders.TianDiTu = L.TileProviders.Base.extend({
    maps: {
        //#region 经纬度图层
        Normal_Map: {
            url: "//t{s}.tianditu.gov.cn/vec_c/wmts?layer=vec&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk={key}",
            name: "矢量地图"
        },
        Normal_Annotion: {
            url: "//t{s}.tianditu.gov.cn/cva_c/wmts?layer=cva&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk={key}",
            name: "矢量注记"
        },
        Normal_AnnotionEnglish: {
            url: "//t{s}.tianditu.gov.cn/eva_c/wmts?layer=eva&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk={key}",
            name: "矢量英文注记"
        },
        Satellite_Map: {
            url: "//t{s}.tianditu.gov.cn/img_c/wmts?layer=img&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk={key}",
            name: "影像地图"
        },
        Satellite_Annotion: {
            url: "//t{s}.tianditu.gov.cn/cia_c/wmts?layer=cia&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk={key}",
            name: "影像注记"
        },
        Satellite_AnnotionEnglish: {
            url: "//t{s}.tianditu.gov.cn/eia_c/wmts?layer=eia&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk={key}",
            name: "影像英文注记"
        },
        Terrain_Map: {
            url: "//t{s}.tianditu.gov.cn/ter_c/wmts?layer=ter&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk={key}",
            name: "地形地图"
        },
        Terrain_Annotion: {
            url: "//t{s}.tianditu.gov.cn/cta_c/wmts?layer=cta&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk={key}",
            name: "地形注记"
        },
        Global_Line: {
            url: "//t{s}.tianditu.gov.cn/ibo_c/wmts?layer=ibo&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk={key}",
            name: "全球境界"
        },
        //#endregion 经纬度图层
    },
    options: {
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
        key: "6703c18da8b111f1ac38fdcfc4a138d8",
        zoomOffset: 1,
        tileSize: 256
    },
    crs: L.CRS.EPSG4326,

});
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

index.html代码如下

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- leaflet样式 -->
    <link href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" rel="stylesheet" />
    <!-- leaflet类库 -->
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet-src.js"></script>
    <!-- 插件 -->
    <script src="L.TileProviders.Base.js"></script>
    <script src="L.TileProvider.TianDiTu.js"></script>
    <title>Document</title>
    <style>
        html,
        body,
        #map {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }
    </style>
</head>

<body>
    <div id="map">

    </div>
    <script>
        //初始化插件
        var tileProviders = new L.TileProviders.TianDiTu({}, {
            key: "6703c18da8b111f1ac38fdcfc4a138d8"   //自己的秘钥
        });

        //初始化地图
        var map = L.map("map", { crs: tileProviders.crs });
        map.setView([28.46337852800008, 120.967045726], 6);

        //创建图层
        var baseLayers = {
            "矢量地图": tileProviders.getLayer("Normal_Map").addTo(map),
            "影像地图": tileProviders.getLayer("Satellite_Map"),
            "地形地图": tileProviders.getLayer("Terrain_Map")
        }

        var annotionLayers = {
            "矢量注记": tileProviders.getLayer("Normal_Annotion").addTo(map),
            "矢量英文注记": tileProviders.getLayer("Normal_AnnotionEnglish"),
            "影像注记": tileProviders.getLayer("Satellite_Annotion"),
            "影像英文注记": tileProviders.getLayer("Satellite_AnnotionEnglish"),
            "地形注记": tileProviders.getLayer("Terrain_Annotion"),
            "全球境界": tileProviders.getLayer("Global_Line")
        }

        //创建图层管理控件
        L.control.layers(baseLayers, annotionLayers).addTo(map);
    </script>
</body>

</html>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

源码地址

链接：https://pan.baidu.com/s/1J2KRafeNCc7VBWN-dw20pg 
 提取码：vhph