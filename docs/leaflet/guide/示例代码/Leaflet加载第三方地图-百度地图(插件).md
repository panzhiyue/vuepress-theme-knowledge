[TOC]


# Leaflet加载第三方地图-百度地图(插件)

把百度地图提供的图层封装成插件，统一调用

 

效果如下

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202110291635270.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)



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

L.TileProvider.BaiDu.js代码如下

```javascript
//定义坐标系
if (L.Proj) {
    L.CRS.Baidu = new L.Proj.CRS('EPSG:900913', '+proj=merc +a=6378206 +b=6356584.314245179 +lat_ts=0.0 +lon_0=0.0 +x_0=0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs', {
        resolutions: function () {
            var level = 19
            var res = [];
            res[0] = Math.pow(2, 18);
            for (var i = 1; i < level; i++) {
                res[i] = Math.pow(2, (18 - i))
            }
            return res;
        }(),
        origin: [0, 0],
        bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244])
    });
}


/**
 * 百度图层提供者
 * @param {Object} maps 
 * @param {Object} options
 */
 L.TileProviders.BaiDu = L.TileProviders.Base.extend({
    maps: {
        Normal_Map: {
            url: "//online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1",
            name: "矢量地图"
        },
        Satellite_Map: {
            url: "//shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46",
            name: "影像地图"
        },
        Satellite_Annotion: {
            url: "//online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=sl&v=020",
            name: "影像注记"
        }
    },
    options: {
        subdomains: "0123456789",
        tms:true

    },
    crs:L.CRS.Baidu
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
    <!-- proj4 -->
    <script src="https://unpkg.com/proj4@2.7.5/dist/proj4.js"></script>
    <!-- proj4leaflet -->
    <script src="https://unpkg.com/proj4leaflet@1.0.2/src/proj4leaflet.js"></script>
    <!-- 插件 -->
    <script src="L.TileProviders.Base.js"></script>
    <script src="L.TileProvider.BaiDu.js"></script>
    <title>Leaflet加载第三方地图-百度地图(插件)</title>
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
        var tileProviders = new L.TileProviders.BaiDu();

        //地图初始化
        var map = L.map("map", { crs: tileProviders.crs });
        console.log(map);
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

链接：https://pan.baidu.com/s/1qlrvJLLigKzwbUoCtsDeHQ 
 提取码：swxs