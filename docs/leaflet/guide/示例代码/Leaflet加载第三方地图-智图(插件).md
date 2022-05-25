[TOC]


# Leaflet加载第三方地图-智图(插件)

 把智图提供的图层封装成插件，统一调用

效果如下

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202110291637205.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)



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

L.TileProvider.GeoQ.js代码如下

```javascript
/**
 * 智图图层提供者
 * @param {Object} maps 
 * @param {Object} options
 */
 L.TileProviders.GeoQ = L.TileProviders.Base.extend({
    maps: {
        Normal_Map: {
            url: "//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
            name: "地图"
        },
        Normal_PurplishBlue: {
            url: "//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
            name: "午夜蓝"
        },
        Normal_Gray: {
            url: "//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}",
            name: "灰色"
        },
        Normal_Warm: {
            url: "//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}",
            name: "暖色"
        },
        Theme_Hydro: {
            url: "//thematic.geoq.cn/arcgis/rest/services/ThematicMaps/WorldHydroMap/MapServer/tile/{z}/{y}/{x}",
            name: "水系"
        },
    },
    options: {
        subdomains: ""
    },
    crs:L.CRS.EPSG3857
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
    <script src="L.TileProvider.GeoQ.js"></script>
    <title>Leaflet加载第三方地图-智图(插件)</title>
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
        var tileProviders = new L.TileProviders.GeoQ();

        //初始化地图
        var map = L.map("map", { crs: tileProviders.crs });
        map.setView([28.46337852800008, 120.967045726], 6);

        //创建图层
        var baseLayers = {
            "地图": tileProviders.getLayer("Normal_Map").addTo(map),
            "午夜蓝": tileProviders.getLayer("Normal_PurplishBlue"),
            "灰色": tileProviders.getLayer("Normal_Gray"),
            "暖色": tileProviders.getLayer("Normal_Warm"),
            "水系": tileProviders.getLayer("Theme_Hydro")
        }

        //创建图层管理控件
        L.control.layers(baseLayers, {}).addTo(map);
    </script>
</body>

</html>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

源码地址

链接：https://pan.baidu.com/s/18LDjS6IdtivnsbIPqoKJyQ 
 提取码：j9uo