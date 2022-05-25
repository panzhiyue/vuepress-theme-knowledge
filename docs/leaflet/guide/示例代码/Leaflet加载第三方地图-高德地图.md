[TOC]

# Leaflet加载第三方地图-高德地图

## 效果图

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202110291636008.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)



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
    <title>Leaflet加载第三方地图-高德地图</title>
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

        //添加高德地图
        var sl = L.tileLayer('http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
            name: '矢量地图',
            maxZoom: 20,
            minZoom: 1,
            subdomains: "1234"
        }).addTo(map);

        var yx = L.tileLayer('http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', {
            name: '影像地图',
            maxZoom: 20,
            minZoom: 1,
            subdomains: "1234"
        });

        var yx_bz = L.tileLayer('http://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}', {
            name: '影像标注',
            maxZoom: 20,
            minZoom: 1,
            subdomains: "1234"
        });

        //添加图层管理控件
        L.control.layers(null, { "影像": yx, "影像标注": yx_bz, "矢量": sl }).addTo(map);


    </script>
</body>

</html>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

## 源码地址

链接：https://pan.baidu.com/s/1soRQCGJgOMK9wUQTMRDmJg 
 提取码：44bs