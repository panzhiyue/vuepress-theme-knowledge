[TOC]

# Leaflet加载第三方地图-智图

##  效果图

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202110291636648.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)



## 代码

没什么好废话的,直接上代码

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- leaflet样式 -->
    <link href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" rel="stylesheet" />
    <!-- leaflet类库 -->
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet-src.js"></script>
    <title>Leaflet加载第三方地图-智图</title>
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
    <script type="text/javascript">
        //初始化地图
        var map = L.map('map', { crs: L.CRS.EPSG3857 }).setView([28, 120], 6);

        //添加图层
        var sl = L.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}', {
            name: "矢量",
        }).addTo(map);

        var wyl = L.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}', {
            name: "午夜蓝",
        });

        var hs = L.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}', {
            name: "灰色",
        });

        var ns = L.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}', {
            name: "暖色",
        });

        var sx = L.tileLayer('http://thematic.geoq.cn/arcgis/rest/services/ThematicMaps/WorldHydroMap/MapServer/tile/{z}/{y}/{x}', {
            name: "水系",
        });


        //添加图层管理控件
        L.control.layers( { "矢量": sl, "午夜蓝": wyl, "灰色": hs, "暖色": ns, "水系": sx },null).addTo(map);


    </script>
</body>

</html>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

## 源码地址

链接：https://pan.baidu.com/s/1nP8JPple4K5OKPCCzq3lfA 
 提取码：15rf