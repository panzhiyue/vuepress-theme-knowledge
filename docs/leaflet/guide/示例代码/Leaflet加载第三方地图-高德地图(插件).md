[TOC]


# Leaflet加载第三方地图-高德地图(插件)

 把高德地图提供的图层封装成插件，统一调用

 

效果如下

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202110291636793.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)



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

L.TileProvider.GaoDe.js代码如下

```javascript
/**
 * 高德图层提供者
 * @param {Object} maps 
 * @param {Object} options
 */
 L.TileProviders.GaoDe = L.TileProviders.Base.extend({
    maps: {
        Normal_Map: {
            url: "//webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
            name: "矢量地图"
        },
        Satellite_Map: {
            url: "//webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
            name: "影像地图"
        },
        Satellite_Annotion: {
            url: "//webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}",
            name: "影像注记"
        }
    },
    options: {
        subdomains: ["1", "2", "3", "4"],
        tileSize: 256
    }
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
    <script src="L.TileProvider.GaoDe.js"></script>
    <title>Leaflet加载第三方地图-高德地图(插件)</title>
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
        var tileProviders = new L.TileProviders.GaoDe();

        //初始化地图
        var map = L.map("map", { crs: tileProviders.crs });
        map.setView([28.46337852800008, 120.967045726], 6);

        //创建图层
        var baseLayers = {
            "矢量地图": tileProviders.getLayer("Normal_Map").addTo(map),
            "影像地图": tileProviders.getLayer("Satellite_Map")
        }

        var annotionLayers = {
            "影像注记": tileProviders.getLayer("Satellite_Annotion")
        }
        //创建图层管理控件
        L.control.layers(baseLayers, annotionLayers).addTo(map);
    </script>
</body>

</html>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

源码地址

链接：https://pan.baidu.com/s/1Q-TjEvofrOtt6HCjO5njHw 
 提取码：yf1f