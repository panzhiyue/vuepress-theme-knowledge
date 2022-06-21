# openlayers+proj4自定义坐标系



## 正文

  地图中坐标系是非常多的，最常用的是EPSG:3857（等于谷歌的900913，等于esri的102100）的web墨卡托投影和GPS的EPSG:4326的WGS84坐标系。然而实际应用中很多时候并不会使用这这些常用坐标系。可是openlayers中只定义了4326,3857俩种坐标系怎么办呢？如果我实现不知道坐标系,需要动态加载怎么办呢?下面介绍如何使用proj4自定义坐标系。


## 1.首先列出参考文档和开源地址

1.openlayers官网 https://openlayers.org/

2.proj4源码 https://github.com/proj4js/proj4js

3.查询EPSG坐标系相关信息的好网站 https://epsg.io/

4.Proj4常见投影  https://blog.csdn.net/chencao100/article/details/102917251

5.一个大神写的自定义坐标系的博客,本文是在此片文章的基础上进行一些扩展
https://www.jianshu.com/p/9eca1bc8a12d


## 2.自定义坐标系

这步可以直接看上面给的大神写的博客,这里只是作为转载

### (1)定义坐标系

每个坐标系都是有一个EPSG定义，本文准备以EPSG:3395举例。
首先在http://epsg.io/网站，查找坐标系定义。


![自定义坐标系](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202203201547161.png)


这里我们是定义ol3的，于是选择proj4js的，复制粘贴下来。

```javascript
var projection_3395 = new ol.proj.Projection({
    code: 'EPSG:3395',
    extent:[-20026376.39,-15496570.74,20026376.39,18764656.23],
    units: 'm',
    axisOrientation: 'neu'
});
//定义3395坐标系，且与其他4326,3857的互相转换
proj4.defs("EPSG:3395","+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs");

```

### (2)坐标系转换

说白了，其实是通过proj4对坐标系转换，然后作为匿名回调重写ol.proj的坐标转换功能，以下代码定义了3395转4326,3857方法。

<a style='color:red;'>注意:如果定义了2个自定义坐标系(如4490,4549),则这2个坐标系也需要重写转换功能,否则这2个坐标系的数据无法进行坐标系转换</a>

``` javascript
//结合proj4在ol3中自定义坐标系
ol.proj.addProjection(projection_3395);
ol.proj.addCoordinateTransforms("EPSG:4326", "EPSG:3395",
    function(coordinate) {
        return proj4("EPSG:4326","EPSG:3395",coordinate);
    },
    function(coordinate) {
        return proj4("EPSG:3395","EPSG:4326",coordinate);;
    }
);
ol.proj.addCoordinateTransforms("EPSG:3857", "EPSG:3395",
    function(coordinate) {
        return proj4("EPSG:3857","EPSG:3395",coordinate);
    },
    function(coordinate) {
        return proj4("EPSG:3395","EPSG:3857",coordinate);;
    }
);
```

### (3)测试坐标系转换

```javascript
ol.proj.transform([118,32],'EPSG:4326','EPSG:3395');
//这种如果测试成功，代表定义成功了。
```

### (4)加载自定义坐标系图层

```javascript
//定义自定义坐标系
proj4.defs("EPSG:2384","+proj=tmerc +lat_0=0 +lon_0=117 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs");

    var projection = new ol.proj.Projection({
          code: 'EPSG:2384',
          extent : [345754.23,2501018.29,607809.05,5528581.54],
          units: 'm',
          axisOrientation: 'neu',
          global: false
      });   
//结合proj4在ol3中自定义坐标系
ol.proj.addProjection(projection);
ol.proj.addCoordinateTransforms("EPSG:4326", "EPSG:2384",
    function (coordinate) {
        return proj4("EPSG:4326", "EPSG:2384", coordinate);
    },
    function (coordinate) {
        return proj4("EPSG:2384", "EPSG:4326", coordinate);
    }
);

//测试坐标系转换
var coor1 = ol.proj.transform([118.8260199966696, 32.03620907291769], 'EPSG:4326', 'EPSG:2384');
console.log(coor1);

    var format = 'image/png';
    var bounds = [628556.2744487218, 3452829.882138792,
                    716571.1992278139, 3618292.411380542];
//定义一个坐标系图层                 
    var tiled = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://localhost:8090/geoserver/cite/wms',
            params: {
                'FORMAT': format, 
                'VERSION': '1.1.1',
                tiled: true,
                STYLES: '',
                LAYERS: 'cite:roads',
             //tilesOrigin: 628556.2744487218 + "," + 3452829.882138792
            }
        })
    });
     
    var map = new ol.Map({
        target : 'map',
        layers : [
            tiled
        ],
        view : new ol.View({
            projection: projection
        })
    });
    map.getView().fit(bounds, map.getSize());
```

## 3.读取.prj文件动态加载坐标系

上面大部分内容都是转载自大神的博客,一般情况下也够用了,那我为什么还要写这篇文章呢,直接给个链接就好了。
因为看了上面这篇在已知坐标系的情况下已经足够使用了,无非就是根据业务换不同的坐标系,但是如果是未知的呢,是根据传入的数据来确定坐标系的怎么办？就像我现在需要实现的功能,动态加载shp文件,我们不可能把所有的坐标系都列出来然后去匹配,那怎么办呢?接下来我们赞美proj4.js,
我用了2年才发现,proj4.js不仅支持proj4.js格式的坐标系如图


![玖涯博客](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202203201547162.png)
而且还支持wkt格式的,就像arcgis使用的坐标系

![玖涯博客](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202203201547164.png)

我们可以看proj4.js官网

![玖涯博客](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202203201547165.png)

读取.prj文件获取坐标系

```javascript
                    //读取坐标系
                    if (fileName == shpFileName && ext == "prj") {
                        promiseArr.push(new Promise(function (resolve, reject) {
                            let reader = new FileReader();
                            reader.onload = function (evt) {
                                prj = evt.target.result;
                                resolve(evt.target.result);
                            }
                            reader.readAsText(file);
                        }));

                    }
```

定义坐标系

```javascript
                    if (wkid == "auto") {
                        wkid = "9999";
                        if (!prj) {
                            alert("无法识别坐标系！");
                            return;
                        }
                 
                        proj4.defs("EPSG:9999", prj);
                        let newProj = new Projection({
                            code: 'EPSG:9999'
                        });
                        proj.addProjection(newProj);
                        CoordinateSystem.addCoordinateTransforms("4326", wkid);
                        CoordinateSystem.addCoordinateTransforms("3857", wkid);
                    }
                    CoordinateSystem.addCoordinateTransforms("4490", wkid);
```

##  4.部分bug修复

以为到这里已经完了吗？当然还没有。下面我就讲一下我遇到的一些bug和解决方法。

### （1）投影名称错误

自定义4549坐标系是出现了如下错误

![玖涯博客](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202203201547166.png)

手动改为epsg.io上的代码正常加载

![玖涯博客](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202203201547167.png)

比较2边代码

```
//arcgis
PROJCS["CGCS2000_3_Degree_GK_CM_120E",GEOGCS["GCS_China_Geodetic_Coordinate_System_2000",DATUM["D_China_2000",SPHEROID["CGCS2000",6378137.0,298.257222101]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Gauss_Kruger"],PARAMETER["False_Easting",500000.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",120.0],PARAMETER["Scale_Factor",1.0],PARAMETER["Latitude_Of_Origin",0.0],UNIT["Meter",1.0]]
//epsg.io
PROJCS["CGCS2000_3_degree_Gauss_Kruger_CM_120E",GEOGCS["GCS_China Geodetic Coordinate System 2000",DATUM["D_China_2000",SPHEROID["CGCS2000",6378137,298.257222101]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",0],PARAMETER["central_meridian",120],PARAMETER["scale_factor",1],PARAMETER["false_easting",500000],PARAMETER["false_northing",0],UNIT["Meter",1]]
```


![玖涯博客](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202203201547168.png)

![玖涯博客](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202203201547169.png)

一共发现了4处不同
1,2处为名称,不影响
3处为小数位数不同,也不会影响加载
问题出在第四处
我们看下proj4.js的源码

![玖涯博客](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202203201547170.png)

proj4.js识别了Transverse_Mercator,却没有识别Gauss_Kruger

我们再看下这篇博客
https://blog.csdn.net/chencao100/article/details/102917251

![玖涯博客](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202203201547171.png)
Gauss_Kruger与Transverse_Mercator是同一种投影的不同名称

我们改一下代码

```javascript
                    //读取坐标系
                    if (fileName == shpFileName && ext == "prj") {
                        promiseArr.push(new Promise(function (resolve, reject) {
                            let reader = new FileReader();
                            reader.onload = function (evt) {
                                prj = evt.target.result.replace("Gauss_Kruger", "Transverse_Mercator");
                                resolve(evt.target.result);
                            }
                            reader.readAsText(file);
                        }));

                    }
```

这样就大功告成了,当然也可以修改proj4.js源码,不过我不建议,因为以后proj4版本更替或者业务交接就比较麻烦