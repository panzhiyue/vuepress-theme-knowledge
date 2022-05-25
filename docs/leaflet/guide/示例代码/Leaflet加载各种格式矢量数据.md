[TOC]
# Leaflet加载各种格式矢量数据

## 资料

npm:https://www.npmjs.com/package/omnivore

cdn:https://unpkg.com/leaflet-omnivore@0.3.1/leaflet-omnivore.min.js

github:https://github.com/mapbox/leaflet-omnivore

## 示例

![1629855129984](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202110291637566.png)

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
    <!-- leaflet插件,加载topojson,wkt等格式 -->
    <script src="https://unpkg.com/leaflet-omnivore@0.3.1/leaflet-omnivore.min.js"></script>
    <title>Leaflet加载各种格式矢量数据</title>
    <style>
        body,
        html,
        #map {
            width: 100%;
            height: 100%;
            padding: 0px;
            margin: 0px;
        }
    </style>
</head>

<body>
    <div id="map"></div>
    <script>
        var map = L.map('map').setView([44.8936594065, 6.07968931836], 1);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        omnivore.csv('data/a.csv', {
            latfield: 'lat',
            lonfield: 'lon'
        }).addTo(map);
        omnivore.gpx('data/a.gpx').addTo(map);
        omnivore.kml('data/a.kml').addTo(map);
        omnivore.geojson('data/a.geojson')
            .on('ready', function () {
                console.log('geojson loaded');
            })
            .addTo(map);
        omnivore.topojson('data/a.topojson').addTo(map);
        omnivore.wkt('data/a.wkt').addTo(map);
    </script>
</body>

</html>
```

## 源码地址

链接：https://pan.baidu.com/s/1cug-ypXzixddggfN41XLyw 
提取码：5ytp