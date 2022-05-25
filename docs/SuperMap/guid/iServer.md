# iServer操作入门

## (一)发布一个文件型工作空间.

### （1）首页->快速发布一个或一组服务

![1627979465180](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111030849603.png)

### （2）数据来源选择工作空间

![1627979499401](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111030849604.png)

### （3）配置数据

远程浏览->选择用iDesktop保持的工作空间文件

![1627979674341](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111030849605.png)

### （4）选择发布的服务类型

![1627979695433](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111030849606.png)

![1627979705697](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111030849607.png)

![1627979715034](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111030849608.png)

### （5）管理服务

点击"服务->服务管理"可以查看管理我们已经发布的各种服务

![1627979809366](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111030849609.png)

### （6）查看与修改

点击图片可以进入此服务的管理页面

![1627979903660](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111030849610.png)

### （7）查看服务

点击服务地址的连接可以查看这个服务的一些信息

![1627981609807](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111030849611.png)

每个地图对应一个图层

<p style="color:red;">注意:带@的图层在浏览器中访问有时候有问题</p>

```javascript
//不能访问(并不是每次都不能访问,目前已知点@，面@好像会有问题)
L.tileLayer.wms( "http://localhost:8090/iserver/services/map-WMSStudy/wms111/点@WMSStudy", {
        layers: '点@WMSStudy',
        format: 'image/png',
        transparent: true
      }).addTo(map);
      
      
//可以访问
L.tileLayer.wms( "http://localhost:8090/iserver/services/map-WMSStudy/wms111", {
     layers: '点@WMSStudy',
     format: 'image/png',
     transparent: true
}).addTo(map);
```

# 其他

## 安装为Windows服务

https://blog.csdn.net/qq_29176825/article/details/70159361?spm=1001.2014.3001.5501

## 服务

### 一、数据准备

![image-20210905100931262](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060916660.png)

### 二、发布服务

![image-20210903151720017](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060916647.png)

![image-20210903151800421](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060916836.png)

### 三、服务对应

| 服务类型            | 服务名称                     | 说明 |
| ------------------- | ---------------------------- | ---- |
| REST-地图服务       | map-FuWu/rest                |      |
| REST-数据服务       | data-FuWu/rest               |      |
| REST-空间分析服务   | spatialAnalysis-FuWu/restjsr |      |
| REST-地址匹配服务   | addressmatch-FuWu/restjsr    |      |
| REST-矢量瓦片服务   | map-FuWu/restjsr             |      |
| WMS1.1.1服务        | map-FuWu/wms111              |      |
| WMS1.3.0服务        | map-FuWu/wms130              |      |
| WMTS1.0.0服务       | map-FuWu/wmts100             |      |
| WMTS-CHINA服务      | map-FuWu/wmts-china          |      |
| WFS1.0.0服务        | data-FuWu/wfs100             |      |
| WFS2.0.0服务        | data-FuWu/wfs200             |      |
| WCS1.1.1服务        | data-FuWu/wcs111             |      |
| WCS1.1.2服务        | data-FuWu/wcs112             |      |
| WPS1.0.0服务        | spatialAnalysis-FuWu/wps100  |      |
| ArcGIS REST地图服务 | map-FuWu/arcgisrest          |      |
| ArcGIS REST要素服务 | data-FuWu/arcgisrest         |      |
| Baidu REST地图服务  | map-FuWu/baidurest           |      |
| Google REST地图服务 | map-FuWu/googlerest          |      |

我们分析出某些规律

- 图层名称:FuWu
- 数据查询相关:data-开头
- 地图显示相关:map-开头
- 空间分析相关:spatialAnalysis-开头
- 地址匹配:addressmatch-开头



### 四、查看图层服务列表

#### 1.所有服务列表

http://localhost:8090/iserver/services

左右两列分类不同，但都包含所有服务

![image-20210903154942321](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060916679.png)

#### 2.查看地图显示相关服务

http://localhost:8090/iserver/services/map-FuWu

![image-20210903155509084](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060916651.png)

#### 3.查看数据查询相关

http://localhost:8090/iserver/services/data-FuWu

![image-20210903155538123](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060916655.png)

#### 4.查看空间分析相关

http://localhost:8090/iserver/services/spatialAnalysis-FuWu

![image-20210903155620278](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060916186.png)

#### 5.查看地址匹配

http://localhost:8090/iserver/services/addressmatch-FuWu

![image-20210903155709162](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060916226.png)

### 五、OGC服务详解

#### 1.WMS服务

##### 服务地址

http://localhost:8090/iserver/services/map-FuWu/wms111

http://localhost:8090/iserver/services/map-FuWu/wms130

##### 参考资料

https://iserver.supermap.io/iserver/help/html/zh/index.htm

##### 示例

###### GetMap

```javascript
L.tileLayer.wms(wmsServerUrl, {
    layers: mapName,
    format: 'image/png',
    transparent: true
}).addTo(map);
```

###### GetCapabilities

```javascript
$.ajax({
    url: wmsServerUrl,
    data: { service: "wms", version: "1.1.1", request: "GetCapabilities" },
    success: function (result) {
        console.log(result);
    }
});
```

###### GetFeatureInfo

```javascript
        map.on("click", function (e) {
            let bounds = map.getBounds();
            let latlng = e.latlng;
            $.ajax({
                url: wmsServerUrl,
                data: {
                    //必填，请求名称。
                    request: "GetFeatureInfo",
                    service: "WMS",
                    //必填,请求版本号。
                    version: "1.1.1",
                    //必填,地图图层列表，地图图层之间以半角英文逗号进行分隔。最左边的图层在最底，下一个图层放到前一个的上面，依次类推。
                    layers: mapName,
                    //必填，空间坐标参考系统。该参数值应该是 GetCapabilities 操作中服务器声明的 SRS。
                    srs: "EPSG:4326",
                    //必填，Bounding box（地图范围），该参数的值为半角英文逗号分隔的一串实数，形如“minx,miny,maxx,maxy”，分别代表指定 SRS 下的区域坐标最小 X、最小 Y、最大 X、最大 Y。
                    bbox: bounds._southWest.lng + "," + bounds._southWest.lat + "," + bounds._northEast.lng + "," + bounds._northEast.lat,
                    //必填,以像素表示的要素 X 坐标（自左上角测量为0）。
                    x: e.containerPoint.x,
                    //必填,以像素表示的要素 Y 坐标（自左上角测量为0）。
                    y: e.containerPoint.y,
                    //必填，地图图片的像素宽度。
                    width: map.getSize().x,
                    //必填，地图图片的像素高度。
                    height: map.getSize().y,
                    //必填，待查询的图层列表，图层之间以逗号分隔。
                    query_layers: mapName,
                    //非必填,要素信息的返回格式（MIME 类型）。必须为 application/vnd.ogc.wms_xml。
                    INFO_FORMAT: "application/vnd.ogc.wms_xml",
                    //非必填,要返回信息的要素的数量（默认为1）。
                    //以（X, Y）为中心点，根据 GetMap 操作中的请求参数 BBOX,Width 和 Height 确定初始查找范围半径，对指定的查询图层进行查找。如果查询返回结果小于用户指定的 number 值，将查找半径扩大一倍继续查找，如果查询结果数目满足用户要求返回的要素数目，返回结果，否则继续扩大半径。当查找半径达到初始搜索半径的8倍时，终止查询，返回查询结果，进入下一图层的查询。图层的查询顺序与待查询图层列表中的顺序一致。
                    FEATURE_COUNT: 1,
                    //非必填，WMS 的异常错误报告格式（默认为 application/vnd.ogc.se_xml）。
                    EXCEPTIONS: "application/vnd.ogc.se_xml",
                },
                success: function (result) {
                    console.log(result);
                }
            });
```



#### 2.WFS服务

http://localhost:8090/iserver/services/data-FuWu/wfs100

http://localhost:8090/iserver/services/data-FuWu/wfs200

#### 3.WMTS服务

http://localhost:8090/iserver/services/map-FuWu/wmts-china

http://localhost:8090/iserver/services/map-FuWu/wmts100

#### 4.WCS服务

http://localhost:8090/iserver/services/data-FuWu/wcs111

http://localhost:8090/iserver/services/data-FuWu/wcs112

#### 5.WPS服务

http://localhost:8090/iserver/services/spatialAnalysis-FuWu/wps100

### 六、REST服务

#### 1.数据服务

http://localhost:8090/iserver/services/data-FuWu/rest

##### 参考资料

https://iserver.supermap.io/iserver/help/html/zh/index.htm

##### 示例

定义参数

```javascript
//服务url
var serverUrl = "http://localhost:8090/iserver/services/";
//地图服务URL
var mapServerUrl = serverUrl + "map-FuWu/rest/maps";
//数据服务URL
var dataServerUrl = serverUrl + "data-FuWu/rest/data";
//命名空间
var namespace = "服务";
//数据源
var datasource = "服务数据源";
//数据集
var dataset = "浙江省县界数据集";
//地图
var mapName = "地图显示";
```

数据查询

```javascript
//设置任意几何范围查询参数
var geometryParam = new SuperMap.GetFeaturesByGeometryParameters({
    datasetNames: [datasource + ":" + dataset],
    geometry: drawLayer,
    spatialQueryMode: "INTERSECT",// 相交空间查询模式
    toIndex: 1000
});
// 创建任意几何范围查询实例
L.supermap.featureService(dataServerUrl).getFeaturesByGeometry(geometryParam, function (serviceResult) {
    var features = serviceResult.result.features;
    console.log(features);
    if (!features || !features.features || features.features.length == 0) {
        alert("没有找到数据！");
    } else {
        /**
         * 获取服务器返回的结果
         * features是标注的GeoJSON格式
         */
        queryLayer = L.geoJSON(features, {
            //设置样式
            style: function (layer) {
                return { color: "#ff0000" }
            }
        }).addTo(map);
    }
});
```



#### 2.地图服务

http://localhost:8090/iserver/services/map-FuWu/rest

http://localhost:8090/iserver/services/map-FuWu/restjsr

##### 参考资料

https://iclient.supermap.io/web/apis/leaflet.html

##### 示例

定义参数

```javascript
//服务url
var serverUrl = "http://localhost:8090/iserver/services/";
//地图服务URL
var mapServerUrl = serverUrl + "map-FuWu/rest/maps";
//数据服务URL
var dataServerUrl = serverUrl + "data-FuWu/rest/data";
//命名空间
var namespace = "服务";
//数据源
var datasource = "服务数据源";
//数据集
var dataset = "浙江省县界数据集";
//地图
var mapName = "地图显示";
```

显示瓦片

```javascript
mapLayer = L.supermap.tiledMapLayer(mapServerUrl + "/" + mapName);
mapLayer.addTo(map);
```

数据查询

```javascript
//https://iclient.supermap.io/web/apis/leaflet.html
// 设置任意几何范围查询参数
var geometryParam = new SuperMap.QueryByGeometryParameters({
    queryParams: { name: dataset + "@" + datasource },
    geometry: drawLayer,
    spatialQueryMode: "INTERSECT"// 相交空间查询模式
});
// 创建任意几何范围查询实例
L.supermap.queryService(mapServerUrl + "/" + mapName).queryByGeometry(geometryParam, function (serviceResult) {
    if (serviceResult.result.currentCount == 0) {
        alert("没有找到数据！");
    } else {
        /**
         * 获取服务器返回的结果
         * features是标注的GeoJSON格式
         */
        var features = serviceResult.result.recordsets[0].features;
        queryLayer = L.geoJSON(features, {
            //设置样式
            style: function (layer) {
                return { color: "#ff0000" }
            }
        }).addTo(map);
    }
});
```



#### 3.空间分析服务

http://localhost:8090/iserver/services/spatialAnalysis-FuWu/restjsr

### 七、其他服务

#### 1.arcgis数据服务

http://localhost:8090/iserver/services/data-FuWu/arcgisrest

#### 2.arcgis地图服务

http://localhost:8090/iserver/services/map-FuWu/arcgisrest

#### 3.百度地图服务

http://localhost:8090/iserver/services/map-FuWu/baidurest

#### 4.google地图服务

http://localhost:8090/iserver/services/map-FuWu/googlerest