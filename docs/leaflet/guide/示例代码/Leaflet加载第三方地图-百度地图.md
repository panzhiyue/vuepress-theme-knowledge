[TOC]


# Leaflet加载第三方地图-百度地图

百度地图有自己的坐标系,所以要想加载百度地图需要先自定义坐标系

 

Leaflet定义坐标系需要添加proj4与proj4leaflet库

```html
    <!-- proj4 -->
    <script src="https://unpkg.com/proj4@2.7.5/dist/proj4.js"></script>
    <!-- proj4leaflet -->
    <script src="https://unpkg.com/proj4leaflet@1.0.2/src/proj4leaflet.js"></script>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

定义坐标系

```javascript
        //设置投影参照系
        var crs = new L.Proj.CRS('EPSG:900913',
            '+proj=merc +a=6378206 +b=6356584.314245179 +lat_ts=0.0 +lon_0=0.0 +x_0=0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs',
            {
                //设置分辨率
                resolutions: function () {
                    //定义分辨率数组
                    var res = [];
                    res[0] = Math.pow(2, 18);
                    for (var i = 1; i < 19; i++) {
                        res[i] = Math.pow(2, (18 - i))
                    }
                    //返回分辨率结果
                    return res;
                }(),
                //设置原点
                origin: [0, 0],
                //设置范围
                bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244])
            });
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

加载地图

```javascript
var map = L.map('map', { crs: crs }).setView([28, 120], 10);

        //加载百度地图
        new L.TileLayer('http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl&udt=20150518', {
            //最大显示等级
            maxZoom: 18,
            //最小显示等级
            minZoom: 3,
            //子域
            subdomains: [0, 1, 2],
            //设置为tms
            tms: true
        }).addTo(map);
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

完整代码

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
    <!-- proj4 -->
    <script src="https://unpkg.com/proj4@2.7.5/dist/proj4.js"></script>
    <!-- proj4leaflet -->
    <script src="https://unpkg.com/proj4leaflet@1.0.2/src/proj4leaflet.js"></script>
    <title>Leaflet加载第三方地图-百度地图</title>
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
        //设置投影参照系
        var crs = new L.Proj.CRS('EPSG:900913',
            '+proj=merc +a=6378206 +b=6356584.314245179 +lat_ts=0.0 +lon_0=0.0 +x_0=0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs',
            {
                //设置分辨率
                resolutions: function () {
                    //定义分辨率数组
                    var res = [];
                    res[0] = Math.pow(2, 18);
                    for (var i = 1; i < 19; i++) {
                        res[i] = Math.pow(2, (18 - i))
                    }
                    //返回分辨率结果
                    return res;
                }(),
                //设置原点
                origin: [0, 0],
                //设置范围
                bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244])
            });

        var map = L.map('map', { crs: crs }).setView([28, 120], 10);

        //加载百度地图
        new L.TileLayer('http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl&udt=20150518', {
            //最大显示等级
            maxZoom: 18,
            //最小显示等级
            minZoom: 3,
            //子域
            subdomains: [0, 1, 2],
            //设置为tms
            tms: true
        }).addTo(map);
    </script>
</body>

</html>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

效果图

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202110291635365.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

 源码地址

链接：https://pan.baidu.com/s/13L7c5fKZLshu3EGWMRe11w 
 提取码：pr38