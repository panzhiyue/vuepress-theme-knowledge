[TOC]


# Leaflet加载第三方地图-天地图

## 代码

没什么好废话的,直接上代码

需要注意的是`zoomOffset`的值需要设置为1

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
    <title>Leaflet加载第三方地图-天地图</title>
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
        var map = L.map('map', { crs: L.CRS.EPSG4326 }).setView([28, 120], 6);

        //添加天地图图层
        //唯一要注意的是zoomOffset要设置为1
        var img = L.tileLayer('http://t4.tianditu.gov.cn/img_c/wmts?tk=6dfd31e3b55a8466f34997aee5551a9c&layer=img&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}', {
            name: "中国天地图影像",
            maxZoom: 20,
            tileSize: 256,
            zoomOffset: 1
        }).addTo(map);

        var cia = L.tileLayer('http://t6.tianditu.gov.cn/cia_c/wmts?tk=6dfd31e3b55a8466f34997aee5551a9c&layer=cia&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}', {
            name: "中国天地图影像标注",
            maxZoom: 20,
            tileSize: 256,
            zoomOffset: 1
        }).addTo(map);

        var vec = L.tileLayer('http://t4.tianditu.gov.cn/vec_c/wmts?tk=6dfd31e3b55a8466f34997aee5551a9c&layer=vec&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}', {
            name: "中国天地图矢量",
            maxZoom: 20,
            tileSize: 256,
            zoomOffset: 1
        });

        var cva = L.tileLayer('http://t2.tianditu.gov.cn/cva_c/wmts?tk=6dfd31e3b55a8466f34997aee5551a9c&layer=cva&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}', {
            name: "中国天地图矢量标注",
            maxZoom: 20,
            tileSize: 256,
            zoomOffset: 1
        });

        //添加图层管理控件
        L.control.layers(null, { "影像": img, "影像标注": cia, "矢量": vec, "矢量标注": cva }).addTo(map);


    </script>
</body>

</html>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

## 源码地址

链接：https://pan.baidu.com/s/1-MYlYKq4fMF8Mu24xJswbQ 
 提取码：y6iw