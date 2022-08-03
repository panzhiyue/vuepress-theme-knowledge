参考:

https://www.cnblogs.com/naaoveGIS/p/5508882.html

http://docs.geoserver.org/stable/en/user/services/wms/index.html



### 1.WMS简介

 OGC [Web地图服务](http://www.opengeospatial.org/standards/wms)（WMS）规范定义了一个HTTP接口，用于从服务器请求地理参考的地图图像。GeoServer支持WMS 1.1.1（最广泛使用的WMS版本）以及WMS 1.3.0。这个规范定义了三个操作：GetCapabitities返回服务级元数据，它是对服务信息内容和要求参数的一种描述； GetMap返回一个地图影像，其地理空间参考和大小参数是明确定义了的；GetFeatureInfo（可选）返回显示在地图上的某些特殊要素的信息。

GeoServer官网上对其WMS规范的描述地址为http://docs.geoserver.org/stable/en/user/services/wms/index.html。

相关的OGC WMS规范为：

- [OGC Web地图服务实施规范，版本1.1.1](http://portal.opengeospatial.org/files/?artifact_id=1081&version=1&format=pdf)
- [OGC Web地图服务实施规范，版本1.3.0](http://portal.opengeospatial.org/files/?artifact_id=14416)

GeoServer还支持样式化图层描述符（SLD）标准对WMS规范的一些扩展，以控制地图输出的样式。这些定义在：

- [Web Map Service实现规范版本1.1.0的OpenGIS样式层描述符配置文件](http://portal.opengeospatial.org/files/?artifact_id=22364)

### 2.WMS的好处

 WMS提供了用于请求地理空间地图图像的标准接口。这样的好处是WMS客户端可以从多个WMS服务器请求图像，然后将它们组合成一个单一的视图供用户使用。该标准保证了这些图像都可以像现实中那样完全重叠。许多服务器和客户端支持WMS。 

### 3.WMS请求规范详解

#### 3.1 Exceptions

  WMS可以报告异常的格式。支持的异常值为： 

| **格式** | **句法**                                    | **描述**                                                     |
| -------- | ------------------------------------------- | ------------------------------------------------------------ |
| XML格式  | `EXCEPTIONS=application/vnd.ogc.se_xml`     | Xml输出。（默认格式）                                        |
| 形象     | `EXCEPTIONS=application/vnd.ogc.se_inimage` | 生成图像                                                     |
| 空白的   | `EXCEPTIONS=application/vnd.ogc.se_blank`   | 生成空白图像                                                 |
| 局部图   | `EXCEPTIONS=application/vnd.gs.wms_partial` | 这是一个GeoServer供应商参数，仅适用于getMap请求。返回渲染过程引发异常时渲染的所有内容。可以与[WMS配置限制](https://docs.geoserver.org/stable/en/user/services/wms/configuration.html#wms-configuration-limits)一起使用，以返回部分图像，即使由于超过这些限制之一而被终止的请求也是如此。它也可以与`timeout` [vendor参数一起使用](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html#wms-vendor-parameters)。 |
| JSON格式 | `EXCEPTIONS=application/json`               | 简单的Json表示形式。                                         |
| JSONP    | `EXCEPTIONS=text/javascript`                | 返回以下格式的JsonP：paddingOutput（…jsonp…）。请参阅[WMS供应商参数](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html#wms-vendor-parameters)以更改回调名称。请注意，默认情况下禁用此格式（请参阅[影响WMS的全局变量](https://docs.geoserver.org/stable/en/user/services/wms/global.html#wms-global-variables)）。 |

##### 示例1 输出为json格式

```json
http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poly_landmarks1
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
&bgcolor=0xff0000
&transparent=false
&EXCEPTIONS=application/json
```

**返回结果**

```json
{"version":"1.1.0","exceptions":[{"code":"LayerNotDefined","locator":"layers","text":"Could not find layer tiger:poly_landmarks1"}]}
```



#### 3.2 GetCapabitities

 由WMS服务器提供的GetCapabitities操作请求有关服务的元数据。 

**必填参数**

- **service**:服务名称,值为WMS, 告诉WMS服务器即将收到WMS请求 
- **version**:服务版本, 表示正在请求哪个版本的WMS 。1.0.0,1.1.0,1.1.1,1.3.0
- **request**: 操作名称,指定GetCapabilities操作 

**选填参数**

-  **namespace**: 将响应限制为给定名称空间中的层 
-  **format**: 请求某种格式的功能文档(具体信息看3.供应商参数) 
-  **rootLayer**: 标记以启用/禁用标准“根”顶层图层元素。值是对还是错。如果为false，则仅当存在多个顶级层时才包括Root元素，如果只有一层，则它将是根层本身。指定后，将以相同的行为覆盖全局WMS设置或图层/组设置。 

##### 示例1 常规

**URL例子**

```json
http://localhost:8080/geoserver/wms?
service=wms
&version=1.1.1
&request=GetCapabilities
```

2个没有区别



**返回结果**

会下载下来一个描述性的xml文件，包含了以下三个要素,具体内容看**附录1**：

-  **Service**：包含服务元数据，例如服务于服务器的组织的服务名称，关键字和联系信息。 
-  **Request**：描述WMS服务提供的操作以及每个操作的参数和输出格式。如果需要，可以将GeoServer配置为禁用对某些WMS操作的支持。 
-  **Layer**： 列出可用的坐标系和图层。在GeoServer中，图层以“名称空间：图层”的形式命名。每一层都提供服务元数据，例如标题，摘要和关键字。 



##### **示例2 添加可选参数namespace**

**URL例子**

```json
http://localhost:8080/geoserver/wms?
service=wms
&version=1.1.1
&request=GetCapabilities
&namespace=nurc
```

 **返回结果**

Layer中列出了给定命名空间的图层信息,具体内容看**附录2**

##### **示例3 添加可选参数 format** 

**URL例子**

```json
http://localhost:8080/geoserver/wms?
service=wms
&version=1.1.1
&request=GetCapabilities
&format=text/xml
```

**返回结果**

返回结果直接在页面上显示而不是文件

##### 示例4 添加可选参数rootLayer

**URL例子**

```json
http://localhost:8080/geoserver/wms?
service=wms
&version=1.1.1
&request=GetCapabilities
&rootlayer=false
```

**返回结果**

暂时没有看出什么特殊变化

#### 3.3GetMap（获取影像）

 **GetMap**操作请求，服务器生成的地图。核心参数指定要在地图上显示的一个或多个图层和样式，地图范围的边界框，目标空间参考系统以及输出的宽度，高度和格式。所需的信息为参数，例如指定值`layers`，`styles`并且`srs`可以从功能文件而获得。 



**必填参数**

-  **service**： 服务名称。值是`WMS`。
-  **version**： 服务版本。值是一个`1.0.0`，`1.1.0`，`1.1.1`，`1.3.0`。 
-  **request**： 操作名称。值是`GetMap`。 
-  **layers**： 要在地图上显示的图层。值是图层名称的逗号分隔列表。  
-  **styles**： 要渲染图层的样式。值是样式名称的逗号分隔列表，如果需要默认样式，则为空。列表中的样式名称可能为空，以使用默认的图层样式。  
-  **srs或者crs**： 地图输出的空间参考系统。值格式为`EPSG:nnn`。 `crs`是WMS 1.3.0中使用的参数键。 
-  **bbox**： 地图范围的边界框。值`minx,miny,maxx,maxy`以SRS为单位。  
-  **width**： 地图输出的宽度（以像素为单位） 
-  **height**： 地图输出的高度（以像素为单位）。  
-  **format**： 地图输出的格式。有关支持的值 ,请参阅WMS输出格式

**选填参数**

-  **transparent**： 地图背景是否应该透明。值是`true`或`false`。默认为`false`  
-  **bgcolor**： 地图图像的背景色。价值是形式`RRGGBB`。默认为`FFFFFF`（白色）。在transparent=true时bgcolor无效 
-  **exceptions**： 报告异常的格式。默认值为`application/vnd.ogc.se_xml`。 
-  **time**： 地图数据的时间值或范围。有关更多信息，请参见[GeoServer WMS中的时间支持](https://docs.geoserver.org/stable/en/user/services/wms/time.html#wms-time)。    
-  **sld**：引用[StyledLayerDescriptor](https://docs.geoserver.org/stable/en/user/styling/index.html#styling) XML文件的URL，该XML文件控制或增强地图图层和样式  
-  **sld_body**： URL编码的[StyledLayerDescriptor](https://docs.geoserver.org/stable/en/user/styling/index.html#styling) XML文档，用于控制或增强地图图层和样式 

##### 示例1 常规

**URL例子：**

```json
http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poly_landmarks
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
```

**xml例子**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ogc:GetMap xmlns:ogc="http://www.opengis.net/ows"
            xmlns:gml="http://www.opengis.net/gml"
   version="1.1.1" service="WMS">
   <StyledLayerDescriptor version="1.0.0">
      <NamedLayer>
        <Name>topp:states</Name>
        <NamedStyle><Name>population</Name></NamedStyle>
      </NamedLayer>
   </StyledLayerDescriptor>
   <BoundingBox srsName="http://www.opengis.net/gml/srs/epsg.xml#4326">
      <gml:coord><gml:X>-130</gml:X><gml:Y>24</gml:Y></gml:coord>
      <gml:coord><gml:X>-55</gml:X><gml:Y>50</gml:Y></gml:coord>
   </BoundingBox>
   <Output>
      <Format>image/png</Format>
      <Size><Width>550</Width><Height>250</Height></Size>
   </Output>
</ogc:GetMap>
```





返回结果**

 ![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021049395.png) 

 

##### 示例2 添加transparent，bgcolor参数



 **URL例子：**

```json
http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poly_landmarks
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
&bgcolor=0xff0000
&transparent=false
```

**返回结果**

 ![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021049396.png) 







#### 3.4GetFeatureInfo（返回要素信息）

 **GetFeatureInfo**操作请求地图上给定位置处的**要素**的空间和属性数据。它与WFS [GetFeature](https://docs.geoserver.org/stable/en/user/services/wfs/reference.html#wfs-getfeature)操作类似，但输入和输出的灵活性较差。由于GeoServer提供了WFS服务，因此建议您尽可能不要使用`GetFeatureInfo`。

 `GetFeatureInfo`的一个优点是请求使用来自返回的WMS图像的（x，y）像素值。对于无法执行真正的地理参考的天真客户端，此方法更易于使用。 

**必填参数**

-  **service**： 服务名称。值是`WMS`。 
-  **version** ： 服务版本。值是一个`1.0.0`，`1.1.0`，`1.1.1`，`1.3.0`。  
-  **request** ： 操作名称。值是`GetFeatureInfo`。 
-  **layers**： 参见GetMap
-  **styles** ： 参见GetMap
-  **srs 或者crs**： 参见GetMap
-  **bbox** ： 参见GetMap
-  **width** ： 参见GetMap
-  **height** ： 参见GetMap
-  **query_layers**： 要查询的一层或多层的逗号分隔列表。  
-  **x 或者 i**： 地图上查询点的X坐标，以像素为单位。左侧为0。 `i`是WMS 1.3.0中使用的参数键。
-  **y 或者 j**： 地图上查询点的Y坐标，以像素为单位。0是最高的。 `j`是WMS 1.3.0中使用的参数键  

**选填参数**

-  **info_format**： 功能信息响应的格式。有关值，请参见下文。  

-  **feature_count**: 要返回的最大特征数。默认值为1。  

-  **exceptions**: 报告异常的格式。默认值为`application/vnd.ogc.se_xml`。

-  **buffer**:查询点周围搜索半径的宽度。它们在[WMS供应商参数](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html#wms-vendor-parameters)部分中有完整记录。

-  **cql_filter**:过滤返回的数据，采用ECQL格式。它们在[WMS供应商参数](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html#wms-vendor-parameters)部分中有完整记录。

-  **filter**:过滤返回的数据，采用OGC过滤格式。它们在[WMS供应商参数](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html#wms-vendor-parameters)部分中有完整记录。

-  **propertyName**:要返回的特征属性。它们在[WMS供应商参数](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html#wms-vendor-parameters)部分中有完整记录。

-  **exclude_nodata_result**:设置为true时，当要素的查询像素值为nodata时，将返回*NaN*。它们在[WMS供应商参数](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html#wms-vendor-parameters)部分中有完整记录。

  如果要发送针对图层组的GetFeatureInfo请求，则该图层组中的所有图层都必须设置为“可查询”才能获得结果（请参见[“图层”上的“ WMS设置”](https://docs.geoserver.org/stable/en/user/data/webadmin/layers.html#data-webadmin-layers)） 

 GeoServer支持多种`GetFeatureInfo`响应输出格式。服务器样式的HTML是最常用的格式。为了最大程度地进行控制和自定义，客户端应使用GML3并对原始数据本身进行样式设置。支持的格式为： 

| **格式** | **句法**                                    | **笔记**                                                     |
| -------- | ------------------------------------------- | ------------------------------------------------------------ |
| 文本     | `info_format=text/plain`                    | 简单文本输出。（默认格式）                                   |
| GML 2    | `info_format=application/vnd.ogc.gml`       | 仅适用于简单功能（请参阅“[复杂功能”](https://docs.geoserver.org/stable/en/user/data/app-schema/complex-features.html#app-schema-complex-features)） |
| GML 3    | `info_format=application/vnd.ogc.gml/3.1.1` | 适用于简单功能和复杂功能（请参阅“[复杂功能”](https://docs.geoserver.org/stable/en/user/data/app-schema/complex-features.html#app-schema-complex-features)） |
| 的HTML   | `info_format=text/html`                     | 使用服务器上定义的HTML模板。请参阅[HTML输出格式，](https://docs.geoserver.org/stable/en/user/tutorials/GetFeatureInfo/html.html#tutorials-getfeatureinfo-html)以获取有关如何将HTML输出模板化的信息。 |
| JSON格式 | `info_format=application/json`              | 简单的Json表示形式。请参阅[GeoJSON输出格式，](https://docs.geoserver.org/stable/en/user/tutorials/GetFeatureInfo/geojson.html#tutorials-getfeatureinfo-geojson)以获取有关如何对Json输出进行模板化的信息。 |
| JSONP    | `info_format=text/javascript`               | 返回格式为的JsonP `parseResponse(...json...)`。请参阅[WMS供应商参数](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html#wms-vendor-parameters)以更改回调名称。请注意，默认情况下禁用此格式（请参阅[影响WMS的全局变量](https://docs.geoserver.org/stable/en/user/services/wms/global.html#wms-global-variables)）。 |



##### 示例1 常规

```json
http://localhost:8080/geoserver/wms?
request=GetFeatureInfo
&service=WMS
&version=1.1.1
&layers=topp:states
&styles=
&srs=EPSG:4326
&format=image/png
&bbox=-145.151041,21.73192,-57.154894,58.961059
&width=780
&height=330
&query_layers=topp:states
&info_format=text/html
&feature_count=50
&x=353
&y=145
&exceptions=application/vnd.ogc.se_xml
```

**返回结果**

![1616205222331](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021049397.png)

##### 示例2 添加buffer

```json
http://localhost:8080/geoserver/wms?
request=GetFeatureInfo
&service=WMS
&version=1.1.1
&layers=topp:states
&styles=
&srs=EPSG:4326
&format=image/png
&bbox=-145.151041,21.73192,-57.154894,58.961059
&width=780
&height=330
&query_layers=topp:states
&info_format=text/html
&feature_count=50
&x=353
&y=145
&exceptions=application/vnd.ogc.se_xml
&buffer=500
```

**返回结果**

![1616206873337](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021049398.png)

#####  示例3  添加参数buffer，cql_filter,propertyName

```json
http://localhost:8080/geoserver/wms?
request=GetFeatureInfo
&service=WMS
&version=1.1.1
&layers=topp:states
&styles=
&srs=EPSG:4326
&format=image/png
&bbox=-145.151041,21.73192,-57.154894,58.961059
&width=780
&height=330
&query_layers=topp:states
&info_format=text/html
&feature_count=50
&x=353
&y=145
&exceptions=application/vnd.ogc.se_xml
&buffer=500
&cql_filter=STATE_NAME='Colorado'
&propertyname=EMPLOYED,STATE_NAME
```

返回结果

![1616207529109](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021049399.png)

#### 3.5 DescribeLayer 

 该**DescribeLayer**操作主要是通过了解基于SLD-WMS客户端使用。为了制作SLD，需要知道数据的结构。WMS和WFS都有执行此操作的操作，因此**DescribeLayer**操作仅将客户端路由到适当的服务。 

**必填参数**

-  **service**： 服务名称。值是`WMS`。
-  **version**： 服务版本。值是`1.1.1`。 
-  **request**： 操作名称。值是`DescribeLayer`。    
-  **layers**： 参见[GetMap](https://docs.geoserver.org/stable/en/user/services/wms/reference.html#wms-getmap) 

 **选填参数**

-  **exceptions**： 报告异常的格式。默认值为`application/vnd.ogc.se_xml`。 
-  **output_format**：   输出格式。 

output_format值列表

| **格式** | **句法**                                    | **笔记**                                                     |
| -------- | ------------------------------------------- | ------------------------------------------------------------ |
| 文本     | `output_format=text/xml`                    | 与默认值相同。                                               |
| GML 2    | `output_format=application/vnd.ogc.wms_xml` | 默认格式。                                                   |
| JSON格式 | `output_format=application/json`            | 简单的Json表示形式。                                         |
| JSONP    | `output_format=text/javascript`             | 返回以下格式的JsonP：paddingOutput（…jsonp…）。请参阅[WMS供应商参数](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html#wms-vendor-parameters)以更改回调名称。请注意，默认情况下禁用此格式（请参阅[影响WMS的全局变量](https://docs.geoserver.org/stable/en/user/services/wms/global.html#wms-global-variables)）。 |

##### 示例1 常规

```json
http://localhost:8080/geoserver/wms?
service=wms
&version=1.1.1
&request=DescribeLayer
&layers=topp:states
```

**返回结果**

geoserver-DescribeLayer.application文件

```xml
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE WMS_DescribeLayerResponse SYSTEM "http://localhost:8080/geoserver/schemas/wms/1.1.1/WMS_DescribeLayerResponse.dtd">
<WMS_DescribeLayerResponse version="1.1.1"><LayerDescription name="topp:states" wfs="http://localhost:8080/geoserver/wfs?" owsURL="http://localhost:8080/geoserver/wfs?" owsType="WFS"><Query typeName="topp:states"/></LayerDescription></WMS_DescribeLayerResponse>
```



##### 示例2 输出格式为json

```json
http://localhost:8080/geoserver/wms?
service=wms
&version=1.1.1
&request=DescribeLayer
&layers=topp:states
&output_format=application/json
```

**返回结果**

```json
{"version":"1.1.1","layerDescriptions":[{"layerName":"topp:states","owsURL":"http://localhost:8080/geoserver/wfs?","owsType":"WFS","typeName":"topp:states"}]}
```



#### 3.6 GetLegendGraphic

 所述**GetLegendGraphic**操作提供了用于产生图例图形图像，超出WMS能力的LegendURL参考的机构。它根据服务器上定义的样式或基于用户提供的SLD生成图例。有关此操作以及GeoServer支持的各种选项的更多信息，请参见[GetLegendGraphic](https://docs.geoserver.org/stable/en/user/services/wms/get_legend_graphic/index.html#get-legend-graphic)。 



### 4.WMS输出参数

https://docs.geoserver.org/stable/en/user/services/wms/outputformats.html#wms-output-formats

 WMS以多种可能的格式返回图像。此页面显示输出格式的列表。设置输出格式的语法为： 

**语法**

```
format=<format>
```

可以通过WMS [GetCapabilities](https://docs.geoserver.org/stable/en/user/services/wms/reference.html#wms-getcap)请求找到GeoServer实例支持的输出格式列表。

| **格式**   | **句法**                               | **笔记**                                                     |
| ---------- | -------------------------------------- | ------------------------------------------------------------ |
| PNG        | `format=image/png`                     | 默认                                                         |
| PNG8       | `format=image/png8`                    | 与PNG相同，但是计算出最佳的256色（8位）调色板，因此图像尺寸通常较小 |
| JPEG格式   | `format=image/jpeg`                    |                                                              |
| JPEG-PNG   | `format=image/vnd.jpeg-png`            | 一种自定义格式，它将根据图像内容动态决定是否最好使用JPEG或PNG压缩。如果图像完全不透明且没有调色板，则以JPEG格式返回图像。为了以有意义的方式使用此格式，GetMap必须包含一个“＆transparent = TRUE”参数，因为没有它，GeoServer会生成具有默认/要求的背景色的不透明图像，从而使该格式始终返回JPEG图像（或者始终返回PNG，如果他们被调色板）。使用图层预览测试此格式时，请记住在预览URL中添加“＆transparent = TRUE”，因为通常预览会生成非透明图像。 |
| JPEG-PNG8  | `format=image/vnd.jpeg-png8`           | 与JPEG-PNG相同，但是如果选择了PNG格式，则会生成调色板输出    |
| GIF        | `format=image/gif`                     |                                                              |
| TIFF       | `format=image/tiff`                    |                                                              |
| TIFF8      | `format=image/tiff8`                   | 与TIFF相同，但计算最佳256色（8位）调色板，因此图像尺寸通常较小 |
| GeoTIFF    | `format=image/geotiff`                 | 与TIFF相同，但包含额外的GeoTIFF元数据                        |
| GeoTIFF8   | `format=image/geotiff8`                | 与TIFF相同，但包含额外的GeoTIFF元数据并计算最佳256色（8位）调色板，因此图像尺寸通常较小 |
| SVG        | `format=image/svg`                     |                                                              |
| PDF格式    | `format=application/pdf`               |                                                              |
| GeoRSS     | `format=rss`                           |                                                              |
| KML        | `format=kml`                           |                                                              |
| KMZ        | `format=kmz`                           |                                                              |
| OpenLayers | `format=application/openlayers`        | 生成一个OpenLayers HTML应用程序。                            |
| UTFGrid    | `format=application/json;type=utfgrid` | 生成[UTFGrid 1.3](https://github.com/mapbox/utfgrid-spec/blob/master/1.3/utfgrid.md) JSON响应。需要矢量输出，无论是从矢量图层还是通过渲染转换将其转换为矢量的栅格图层输出。 |

### 5.供应商参数

https://docs.geoserver.org/stable/en/user/services/wms/vendor.html#wms-vendor-parameters

#### 5.1 angle

 `angle`参数绕其中心顺时针旋转输出贴图。语法为： 

```json
angle=<x>
```

##### 示例1 旋转30度

**不旋转url**

```json
http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poly_landmarks
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
```

**返回结果**

 ![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021049401.png) 

**旋转30度url**

```json
http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poly_landmarks
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
&angle=30
```

**返回结果**

 ![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021049402.png) 

#### 5.2 buffer

 `buffer`参数指定在`GetMap`和`GetFeatureInfo`操作中使用的其他边框像素的数量。语法为： 

```json
buffer=<bufferwidth>
```

 其中``，缓冲区的宽度（以像素为单位）。 

 在[GetMap](https://docs.geoserver.org/stable/en/user/services/wms/reference.html#wms-getmap)操作中，缓冲包括位于请求边界框之外的功能，但是其样式足够厚，无法在地图区域内看到。 

 在[GetFeatureInfo](https://docs.geoserver.org/stable/en/user/services/wms/reference.html#wms-getfeatureinfo)操作中，缓冲将在请求的位置周围创建一个“搜索半径”。返回与搜索区域相交的要素的要素信息。在使用OpenLayers地图（例如由“[图层预览”](https://docs.geoserver.org/stable/en/user/data/webadmin/layerpreview.html#layerpreview)页面生成的地图）时，这很有用，因为它放宽了在要返回适当的要素信息的点上精确单击的需求。 

在这两种操作中，GeoServer都会尝试`buffer`通过检查每个图层的样式来自动计算值。评估所有活动符号器，并使用最大符号器的大小（即最大点符号器，最粗线符号器）。在以下情况下，无法计算自动缓冲区大小：

- SLD包含指定为要素属性值的尺寸
- SLD包含外部图形，并且未明确指定其大小

在这种情况下，将使用以下默认值：

- 0像素的[GetMap](https://docs.geoserver.org/stable/en/user/services/wms/reference.html#wms-getmap)请求
- [GetFeatureInfo](https://docs.geoserver.org/stable/en/user/services/wms/reference.html#wms-getfeatureinfo)请求的像素为5个像素（可以通过`org.geoserver.wms.featureinfo.minBuffer`系统变量设置不同的最小值，例如，添加`-Dorg.geoserver.wms.featureinfo.minBuffer=10`以使最小缓冲区为10像素）

如果它们不够大，则可以使用显式参数。

#### 5.3 cql_filter

 该`cql_filter`参数类似于标准`filter`参数，但是使用ECQL（扩展的通用查询语言）表示过滤器。与OGC XML过滤器相比，ECQL提供了更紧凑，更易读的语法。有关完整的详细信息，请参阅《[ECQL参考》](https://docs.geoserver.org/stable/en/user/filter/ecql_reference.html#filter-ecql-reference)以及《[CQL和ECQL](https://docs.geoserver.org/stable/en/user/tutorials/cql/cql_tutorial.html#cql-tutorial)教程》。 

 如果在`layers`参数中指定了多个层，则可以为每个层指定一个单独的过滤器，并用分号分隔。语法为： 

```json
cql_filter=filter1;filter2...
```

一个简单的CQL过滤器的示例是：

```json
cql_filter=INTERSECTS(the_geom,%20POINT%20(-74.817265%2040.5296504))
```

#### 5.4 sortBy

 该`sortBy`参数允许使用与WFS 1.0相同的语法来控制地图中显示的要素/栅格的顺序，即： 

- `&sortBy=att1 A|D,att2 A|D, ...` 对于单层请求
- `&sortBy=(att1Layer1 A|D,att2Layer1 A|D, ...)(att1Layer2 A|D,att2Layer2 A|D, ...)...` 请求多层时

 使用它时应格外小心，因为它对栅格图层，矢量图层和图层组具有不同的行为。特别是： 

- 对于**栅格图层**，`sortBy`映射到阅读器可能会显示的“ SORTING”读取参数（图像镶嵌会显示该参数）。

  在图像镶嵌中，这会导致在排序中找到的第一个颗粒显示在顶部，然后其他颗粒随后出现。

  因此，要对卫星图像的散布马赛克进行分类，以使最新图像显示在顶部，并假设`ingestion`在马赛克索引中调用了time属性，则规格将为。`&sortBy=ingestion D`

- 对于**矢量图层**，`sortBy`将映射到矢量数据源中的sort by子句，然后使用正常的“ painter model”规则进行绘制，因此首先绘制返回的第一项，然后在其顶部进行所有其他操作。

  因此，要对一组事件点进行排序，以便将最近的事件绘制在顶部，并假设该属性在矢量层中被称为“日期”，则规范将为`&sortBy=date`或（升序为默认值）。`&sortBy=date A`

- 对于**层组**，将在所有内部层上复制排序规范，因此该规范必须对所有内部层均有效，否则将报告错误。

  在这种情况下，可以将空规范用于图层组，例如， `layers=theGroup,theLayer&sortBy=(),(date A)`

#### 5.5 ENV

 该`env`参数定义可以在SLD变量替换中使用的替换值集。语法为： 

```json
env=param1:value1;param2:value2;...
```

 有关更多信息，请参见[SLD中的变量替换](https://docs.geoserver.org/stable/en/user/styling/sld/extensions/substitution.html#sld-variable-substitution)。 

#### 5.6 featureid

 该`featureid`参数筛选通过功能ID，给所有功能独特的价值。可以通过用逗号分隔功能部件标识来选择多个功能部件，如本例所示： 

```json
featureid=states.1,states.45
```

#### 5.7 filter

WMS规范仅允许有限的数据过滤。GeoServer增强了WMS筛选器功能，以匹配WFS提供的功能。该`filter`参数可以指定OGC XML过滤器列表。该列表包含在括号**（）中**。在GET请求中使用时，XML标记括号必须经过URL编码。

如果在`layers`参数中指定了多个层，则可以为每个层指定一个单独的过滤器。

 GET请求中编码的OGC过滤器的示例为： 

```xml
filter=<Filter xmlns:gml="http://www.opengis.net/gml"><Intersects><PropertyName>the_geom</PropertyName><gml:Point srsName="4326"><gml:coordinates>-74.817265,40.5296504</gml:coordinates></gml:Point></Intersects></Filter>
```



#### 5.8 format_options

 `format_options`是对于那些格式特定参数的容器。语法为： 

```json
format_options=param1:value1;param2:value2;...
```

支持的格式选项是：

- `antialias`（值= `on`，`off`，`text`）：控制在光栅输出中使用抗锯齿呈现。
- `callback`：指定jsonp响应格式的回调函数名称（默认为`parseResponse`）。
- `dpi`：设置栅格输出的渲染DPI（每英寸点数）。OGC标准输出分辨率为90 DPI。如果需要创建高分辨率图像（例如，用于打印），建议请求更大的图像尺寸并指定更高的DPI。通常，应`targetDPI/90`在格式选项中设置目标dpi ，然后将图像尺寸增加等于的因数。例如，要以300 DPI打印100x100图像，请请求DPI值设置为300的333x333图像：`&width=333&height=333&format_options=dpi:300`
- `layout`：指定要使用的布局名称。布局用于添加装饰器，例如指南针和图例。“ [WMS装饰”](https://docs.geoserver.org/stable/en/user/services/wms/decoration.html#wms-decorations)部分将进一步讨论此功能。
- `quantizer`（值= `octree`，`mediancut`）：控制用于生成PNG8图像的颜色量化器。GeoServer 2.2.0提供了两个量化器，一个称为快速RGB量化器（`octree`不处理半透明），另一个是较慢但更准确的RGBA量化器（称为）`mediancut`。默认情况下，第一个用于不透明图像，而第二个则在客户端要求透明图像（`transparent=true`）时启用。此供应商参数可用于手动强制使用特定的量化器。
- `timeout`：为getMap请求应用超时值。如果超时，则取消getMap请求并返回错误。用于超时的值将是此格式选项和[WMS配置中](https://docs.geoserver.org/stable/en/user/services/wms/configuration.html#wms-configuration)定义的全局WMS超时中的最小值。零值表示没有超时。
- `kmattr`（值= `true`，`false`）：确定GeoServer返回的KML是否应包含可点击属性。此参数主要影响Google Earth的渲染。
- `legend`（值= `true`，`false`）：KML可能会添加图例。
- `kmscore`（值=`0`强制栅格输出和`100`强制矢量输出之间）：参数设置GeoServer是将KML数据呈现为矢量还是栅格。此参数主要影响Google Earth的渲染。
- `kmltitle`：参数设置KML标题。
- `kmlrefresh`（值=大于`0`或`expires`）：每隔几秒钟以刷新模式强制重新加载网络链接。指定了到期时间时，只要在缓存过期标头中指定的时间过去，客户端就会刷新。可以在“发布”选项卡设置“ HTTP缓存时间”下的“层”配置中设置缓存时间。此参数主要影响Google Earth的呈现，并且取决于客户端是否遵守。使用第二个间隔是一个更可靠的选择。
- `kmlvisible`（值= `true`，`false`）：指示所选图层是否默认为启用。默认行为已启用。此参数主要影响Google Earth的渲染。
- `advancedProjectionHandling`（值= `true`，`false`）：启用如果在GUI中启用了高级投影处理，则将其禁用。如果在GUI中将其禁用，则此选项无效。
- `mapWrapping`（值= `true`，`false`）：启用如果在GUI中启用了连续地图换行，则将其禁用。如果在GUI中将其禁用，则此选项无效。如果`advancedProjectionHandling`被禁用，连续地图换行也将被禁用。
- `decorationsOnly`（值= `true`，`false`）：默认情况下处于禁用状态。当value为true时，它允许为未渲染地图的请求获取透明大小的图像，但保留装饰（如果存在）。



#### 5.9 maxFeatures and startIndex

这些参数`maxFeatures`和`startIndex`可以一起使用以提供“分页”支持。分页在诸如KML爬网的情况下很有用，在这种情况下，当有大量要素时，希望能够在各部分中检索地图。

该`startindex=n`参数指定从索引开始的索引，这些索引开始于特征的有序列表中。 `n`必须为正整数。

该`maxfeatures=n`参数设置了渲染特征的数量限制。 `n`必须为正整数。与结合使用时`startindex`，呈现的要素将是从`startindex`值开始的要素。

请注意，并非所有层都支持分页。对于以这种方式查询的图层，基础要素源必须支持分页。对于数据库（例如PostGIS）通常是这种情况。

#### 5.10 namespace

该`namespace`参数使WMS [GetCapabilities](https://docs.geoserver.org/stable/en/user/services/wms/reference.html#wms-getcap)响应被过滤为仅包含特定命名空间中的层。语法为：

```json
namespace=<namespace>
```

命名空间前缀在哪里。

警告:使用无效的名称空间前缀不会导致错误，但是返回的功能文档将不包含任何图层，仅包含图层组。

笔记:这仅影响功能文档，不影响其他请求。即使指定了名称空间，其他WMS操作仍将处理所有层。

#### 5.11 palette

有时（出于速度和带宽的原因）建议对返回映射的位深度进行下采样。这样做的方法是创建一个调色板有限的图像，并将其保存在`palettes`GeoServer数据目录内的目录中。然后可以指定`palette`形式的参数：

```json
palette=<image>
```

``调色板图像的文件名在哪里（不带扩展名）。要强制使用网络安全调色板，请使用语法`palette=safe`。有关更多信息，请参见关于[调色板图像](https://docs.geoserver.org/stable/en/user/tutorials/palettedimage/palettedimage.html#tutorials-palettedimages)的教程。

#### 5.12 propertyName

该`propertyName`参数指定在`GetFeatureInfo`操作的响应中包括哪些属性。语法与WFS`GetFeature`操作中的语法相同。对于单层请求，语法为：

```json
propertyName=name1,...,nameN
```

对于多层，语法为：

```
propertyName=(nameLayer11,...,nameLayer1N)...(name1LayerN,...,nameNLayerN)
```

属性的性质取决于图层类型：

- 对于矢量图层，名称指定要素属性。
- 对于栅格图层，名称指定了波段。
- 对于级联的WMS层，名称指定了远程服务器要返回的GML属性。

#### 5.13 tiled

使用平铺客户端（例如OpenLayers）时，元平铺可防止标签重复出现问题。使用meta-tiling时，将渲染图像，然后将其分成较小的图块（默认为3x3模式），然后再投放。为了使元拼贴工作，*必须*将图块大小设置为256x256像素，并且必须指定`tiled`和`tilesorigin`参数。

该`tiled`参数控制是否使用元平铺。语法为：

```json
tiled=[true|false]
```

调用meta-tiling use `tiled=true`。

#### 5.14 tilesorigin

该`tilesorigin`参数对于元平铺也是必需的。语法为：

```json
tilesorigin=x,y
```

其中`x`和`y`是图块网格系统的左下角（“原点”）的坐标。



#### 5.15 OpenLayers示例

 在OpenLayers中，指定的一种好方法`tilesorigin`是直接引用地图范围。 

警告：如果地图范围是动态修改的，则`tilesorigin`必须相应更新每个元平铺图层的图层范围。

以下代码显示了如何指定元平铺参数：

```javascript
 var options = {
     ...
     maxExtent: new OpenLayers.Bounds(-180, -90, 180, 90),
     ...
 };
 map = new OpenLayers.Map('map', options);

 tiled = new OpenLayers.Layer.WMS(
     "Layer name", "http://localhost:8080/geoserver/wms",
     {
         srs: 'EPSG:4326',
         width: 391,
         styles: '',
         height: 550,
         layers: 'layerName',
         format: 'image/png',
         tiled: true,
         tilesorigin: map.maxExtent.left + ',' + map.maxExtent.bottom
     },
     {buffer: 0}
 );
```

#### 5.16 scaleMethod

该`scaleMethod`参数控制GeoServer如何计算比例分母两个可能的值是：

- `OGC` （默认）：比例分母是根据OGC SLD规范计算的，为了互操作性而强加了简化的公式
- `Accurate`：使用完整的表达式来计算针对地理的比例分母数据，并考虑到地球的椭球形状

两种方法都倾向于在赤道附近返回非常接近的值，但是当纬度接近极点时，它们的确会产生较大的差异。

#### 5.17 interpolations

该`interpolations`参数允许选择特定的重采样（插值）方法。可以在`GetMap`操作中使用。

如果在`layers`参数中指定了多个图层，则可以为每个图层指定一个单独的插值方法，以逗号分隔。语法为：

```json
interpolations=method1,method2,...
```

method 值可以是以下值之一：

- **nearest neighbor**
- **bilinear**
- **bicubic**

如果必须将默认方法用于相关层，则为空。

该参数允许逐层覆盖全局“ *WMS栅格渲染选项”*设置（有关更多信息，请参阅[WMS设置](https://docs.geoserver.org/stable/en/user/services/wms/webadmin.html#services-webadmin-wms)）以及特定于图层的*默认插值方法*发布参数（有关更多信息，请参见“[层](https://docs.geoserver.org/stable/en/user/data/webadmin/layers.html#data-webadmin-layers)”）。

#### 5.18 format

该`format`参数可用于以某种格式请求功能文档。如果不支持请求的格式，则将使用默认格式。

一个示例请求：

```json
http://localhost:8080/geoserver/wms?
service=wms
&version=1.1.1
&request=GetCapabilities
&format=text/xml
```

笔记:当前，此参数仅可用于请求以编码的WMS 1.1.1功能文档`text/xml`，如果与其他WMS版本或其他格式一起使用，则该参数将无效。

#### 5.19 rootLayer

该`rootLayer`参数可用于请求功能文档以包括或不包括顶级根Layer容器。默认情况下，此顶层根始终始终作为已配置图层和组的父级包含在内。可以在服务（WMS）级别或层/组级别更改默认值。

当生成的文档具有单个top元素（例如，具有嵌套子代的单个组）时，使用此参数可以排除默认根。为此，请使用**false**值。

该参数还可用于覆盖在WMS或层/组级别定义的内容。例如，如果将服务配置为排除Root元素，则可以使用**rootLayer = true**强制它。

一个示例请求：

```json
http://localhost:8080/geoserver/wms?
service=wms
&version=1.1.1
&request=GetCapabilities
＆rootLayer=false
```

XML POST的示例：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ogc:GetCapabilities xmlns:ogc="http://www.opengis.net/ows"
            xmlns:gml="http://www.opengis.net/gml"
   version="1.1.1" service="WMS" rootLayer="false">
</ogc:GetCapabilities>
```

#### 5.20 clip

该`clip`参数可用于使用由有效WKT字符串表示的多边形蒙版来裁剪WMS响应。

这是两个示例，第一个使用WKT，第二个使用EWKT：

```json
clip=POLYGON((-14.50804652396198 55.579454354599356,34.53492222603802 55.579454354599356,34.53492222603802 32.400173313532584,-14.50804652396198 32.400173313532584,-14.50804652396198 55.579454354599356))
clip=srid=900913;POLYGON ((-1615028.3514525702 7475148.401208023, 3844409.956787858 7475148.401208023, 3844409.956787858 3815954.983140064, -1615028.3514525702 3815954.983140064, -1615028.3514525702 7475148.401208023))
```

笔记:无论WMS版本如何，WKT的Axis顺序都必须为East / North。当前，对于具有复杂特征的图层，此参数将被忽略。

一个示例请求（无效）：

```json
http://localhost:8080/geoserver/wms?
request=GetFeatureInfo
&service=WMS
&version=1.1.1
&layers=topp:states
&styles=
&srs=EPSG:4326
&format=image/png
&bbox=-145.151041,21.73192,-57.154894,58.961059
&width=780
&height=330
&query_layers=topp:states
&info_format=text/xml
&feature_count=50
&x=353
&y=145
&exceptions=application/json
&buffer=1000
&clip=POLYGON((37.64146 -102.043999,37.386261 -102.041557,36.988972 -102.036758,36.998505 -102.997223,36.999741 -103.077377,37.64146 -102.043999))
```



### 附录1 GetCapabilities1.1.1 删除部分坐标系信息

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE WMT_MS_Capabilities SYSTEM "http://localhost:8080/geoserver/schemas/wms/1.1.1/WMS_MS_Capabilities.dtd">
<WMT_MS_Capabilities version="1.1.1" updateSequence="152">
  <Service>
    <Name>OGC:WMS</Name>
    <Title>GeoServer Web Map Service</Title>
    <Abstract>A compliant implementation of WMS plus most of the SLD extension (dynamic styling). Can also generate PDF, SVG, KML, GeoRSS</Abstract>
    <KeywordList>
      <Keyword>WFS</Keyword>
      <Keyword>WMS</Keyword>
      <Keyword>GEOSERVER</Keyword>
    </KeywordList>
    <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://geoserver.org"/>
    <ContactInformation>
      <ContactPersonPrimary>
        <ContactPerson>Claudius Ptolomaeus</ContactPerson>
        <ContactOrganization>The Ancient Geographers</ContactOrganization>
      </ContactPersonPrimary>
      <ContactPosition>Chief Geographer</ContactPosition>
      <ContactAddress>
        <AddressType>Work</AddressType>
        <Address/>
        <City>Alexandria</City>
        <StateOrProvince/>
        <PostCode/>
        <Country>Egypt</Country>
      </ContactAddress>
      <ContactVoiceTelephone/>
      <ContactFacsimileTelephone/>
      <ContactElectronicMailAddress>claudius.ptolomaeus@gmail.com</ContactElectronicMailAddress>
    </ContactInformation>
    <Fees>NONE</Fees>
    <AccessConstraints>NONE</AccessConstraints>
  </Service>
  <Capability>
    <Request>
      <GetCapabilities>
        <Format>application/vnd.ogc.wms_xml</Format>
        <Format>text/xml</Format>
        <DCPType>
          <HTTP>
            <Get>
              <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?SERVICE=WMS&amp;"/>
            </Get>
            <Post>
              <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?SERVICE=WMS&amp;"/>
            </Post>
          </HTTP>
        </DCPType>
      </GetCapabilities>
      <GetMap>
        <Format>image/png</Format>
        <Format>application/atom xml</Format>
        <Format>application/atom+xml</Format>
        <Format>application/json;type=utfgrid</Format>
        <Format>application/openlayers</Format>
        <Format>application/pdf</Format>
        <Format>application/rss xml</Format>
        <Format>application/rss+xml</Format>
        <Format>application/vnd.google-earth.kml</Format>
        <Format>application/vnd.google-earth.kml xml</Format>
        <Format>application/vnd.google-earth.kml+xml</Format>
        <Format>application/vnd.google-earth.kml+xml;mode=networklink</Format>
        <Format>application/vnd.google-earth.kmz</Format>
        <Format>application/vnd.google-earth.kmz xml</Format>
        <Format>application/vnd.google-earth.kmz+xml</Format>
        <Format>application/vnd.google-earth.kmz;mode=networklink</Format>
        <Format>atom</Format>
        <Format>image/geotiff</Format>
        <Format>image/geotiff8</Format>
        <Format>image/gif</Format>
        <Format>image/gif;subtype=animated</Format>
        <Format>image/jpeg</Format>
        <Format>image/png8</Format>
        <Format>image/png; mode=8bit</Format>
        <Format>image/svg</Format>
        <Format>image/svg xml</Format>
        <Format>image/svg+xml</Format>
        <Format>image/tiff</Format>
        <Format>image/tiff8</Format>
        <Format>image/vnd.jpeg-png</Format>
        <Format>kml</Format>
        <Format>kmz</Format>
        <Format>openlayers</Format>
        <Format>rss</Format>
        <Format>text/html; subtype=openlayers</Format>
        <Format>utfgrid</Format>
        <DCPType>
          <HTTP>
            <Get>
              <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?SERVICE=WMS&amp;"/>
            </Get>
          </HTTP>
        </DCPType>
      </GetMap>
      <GetFeatureInfo>
        <Format>text/plain</Format>
        <Format>application/vnd.ogc.gml</Format>
        <Format>text/xml</Format>
        <Format>application/vnd.ogc.gml/3.1.1</Format>
        <Format>text/xml; subtype=gml/3.1.1</Format>
        <Format>text/html</Format>
        <Format>application/json</Format>
        <DCPType>
          <HTTP>
            <Get>
              <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?SERVICE=WMS&amp;"/>
            </Get>
            <Post>
              <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?SERVICE=WMS&amp;"/>
            </Post>
          </HTTP>
        </DCPType>
      </GetFeatureInfo>
      <DescribeLayer>
        <Format>application/vnd.ogc.wms_xml</Format>
        <DCPType>
          <HTTP>
            <Get>
              <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?SERVICE=WMS&amp;"/>
            </Get>
          </HTTP>
        </DCPType>
      </DescribeLayer>
      <GetLegendGraphic>
        <Format>image/png</Format>
        <Format>image/jpeg</Format>
        <Format>image/gif</Format>
        <DCPType>
          <HTTP>
            <Get>
              <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?SERVICE=WMS&amp;"/>
            </Get>
          </HTTP>
        </DCPType>
      </GetLegendGraphic>
      <GetStyles>
        <Format>application/vnd.ogc.sld+xml</Format>
        <DCPType>
          <HTTP>
            <Get>
              <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?SERVICE=WMS&amp;"/>
            </Get>
          </HTTP>
        </DCPType>
      </GetStyles>
    </Request>
    <Exception>
      <Format>application/vnd.ogc.se_xml</Format>
      <Format>application/vnd.ogc.se_inimage</Format>
      <Format>application/vnd.ogc.se_blank</Format>
      <Format>application/json</Format>
    </Exception>
    <UserDefinedSymbolization SupportSLD="1" UserLayer="1" UserStyle="1" RemoteWFS="1"/>
    <Layer>
      <Title>GeoServer Web Map Service</Title>
      <Abstract>A compliant implementation of WMS plus most of the SLD extension (dynamic styling). Can also generate PDF, SVG, KML, GeoRSS</Abstract>
      <!--All supported EPSG projections:-->
      <SRS>AUTO:42001</SRS>
      <SRS>AUTO:42002</SRS>
      <SRS>AUTO:42003</SRS>
      
      <LatLonBoundingBox minx="-180.0" miny="-90.0" maxx="180.0" maxy="90.0"/>
      <Layer queryable="1">
        <Name>spearfish</Name>
        <Title>Spearfish</Title>
        <Abstract>Spearfish City in Lawrence County, South Dakota&#13;
&#13;
The area covered by the data set is in the vicinity of Spearfish and includes a majority of the Black Hills National Forest (i.e., Mount Rushmore).</Abstract>
        <KeywordList/>
        <SRS>EPSG:26713</SRS>
        <LatLonBoundingBox minx="-103.87791475407893" miny="44.37246687108142" maxx="-103.62278893469492" maxy="44.50235105543566"/>
        <BoundingBox SRS="EPSG:26713" minx="589425.9342365642" miny="4913959.224611808" maxx="609518.6719560538" maxy="4928082.949945881"/>
      </Layer>
      <Layer queryable="1">
        <Name>tasmania</Name>
        <Title>Tasmania</Title>
        <Abstract>Tasmania Australia from Digital Chart of the World.</Abstract>
        <KeywordList/>
        <SRS>EPSG:4326</SRS>
        <LatLonBoundingBox minx="143.83482400000003" miny="-43.648056" maxx="148.47914100000003" maxy="-39.573891"/>
        <BoundingBox SRS="EPSG:4326" minx="143.83482400000003" miny="-43.648056" maxx="148.47914100000003" maxy="-39.573891"/>
      </Layer>
      <Layer queryable="1">
        <Name>tiger-ny</Name>
        <Title>TIGER New York</Title>
        <Abstract>Topologically Integrated Geographic Encoding and Referencing (TIGER) dataset for New York.</Abstract>
        <KeywordList/>
        <SRS>EPSG:4326</SRS>
        <LatLonBoundingBox minx="-74.047185" miny="40.679648" maxx="-73.907005" maxy="40.882078"/>
        <BoundingBox SRS="EPSG:4326" minx="-74.047185" miny="40.679648" maxx="-73.907005" maxy="40.882078"/>
      </Layer>
      <Layer queryable="1" opaque="0">
        <Name>nurc:Arc_Sample</Name>
        <Title>A sample ArcGrid file</Title>
        <Abstract/>
        <KeywordList>
          <Keyword>WCS</Keyword>
          <Keyword>arcGridSample</Keyword>
          <Keyword>arcGridSample_Coverage</Keyword>
        </KeywordList>
        <SRS>EPSG:4326</SRS>
        <LatLonBoundingBox minx="-180.0" miny="-90.0" maxx="180.0" maxy="90.0"/>
        <BoundingBox SRS="EPSG:4326" minx="-180.0" miny="-90.0" maxx="180.0" maxy="90.0"/>
        <Style>
          <Name>rain</Name>
          <Title>Rain distribution</Title>
          <LegendURL width="22" height="121">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=nurc%3AArc_Sample"/>
          </LegendURL>
        </Style>
        <Style>
          <Name>raster</Name>
          <Title>Default Raster</Title>
          <Abstract>A sample style that draws a raster, good for displaying imagery</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=nurc%3AArc_Sample&amp;style=raster"/>
          </LegendURL>
        </Style>
      </Layer>
      <Layer queryable="1" opaque="0">
        <Name>nurc:Img_Sample</Name>
        <Title>North America sample imagery</Title>
        <Abstract/>
        <KeywordList>
          <Keyword>WCS</Keyword>
          <Keyword>worldImageSample</Keyword>
          <Keyword>worldImageSample_Coverage</Keyword>
        </KeywordList>
        <SRS>EPSG:4326</SRS>
        <LatLonBoundingBox minx="-130.85168" miny="20.7052" maxx="-62.0054" maxy="54.1141"/>
        <BoundingBox SRS="EPSG:4326" minx="-130.85168" miny="20.7052" maxx="-62.0054" maxy="54.1141"/>
        <Style>
          <Name>raster</Name>
          <Title>Default Raster</Title>
          <Abstract>A sample style that draws a raster, good for displaying imagery</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=nurc%3AImg_Sample"/>
          </LegendURL>
        </Style>
      </Layer>
      <Layer queryable="1" opaque="0">
        <Name>nurc:Pk50095</Name>
        <Title>Pk50095</Title>
        <Abstract>Pk50095 is a raster file accompanied by a spatial data file.</Abstract>
        <KeywordList>
          <Keyword>WCS</Keyword>
          <Keyword>img_sample2</Keyword>
          <Keyword>Pk50095</Keyword>
        </KeywordList>
        <SRS>EPSG:32633</SRS>
        <LatLonBoundingBox minx="12.999446822650462" miny="46.722110379286" maxx="13.308182612644663" maxy="46.91359611878293"/>
        <BoundingBox SRS="EPSG:32633" minx="347649.93086859107" miny="5176214.082539256" maxx="370725.976428591" maxy="5196961.352859256"/>
        <Style>
          <Name>raster</Name>
          <Title>Default Raster</Title>
          <Abstract>A sample style that draws a raster, good for displaying imagery</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=nurc%3APk50095"/>
          </LegendURL>
        </Style>
      </Layer>
      <Layer queryable="1" opaque="0">
        <Name>sf:archsites</Name>
        <Title>Spearfish archeological sites</Title>
        <Abstract>Sample data from GRASS, archeological sites location, Spearfish, South Dakota, USA</Abstract>
        <KeywordList>
          <Keyword>archsites</Keyword>
          <Keyword>spearfish</Keyword>
          <Keyword>sfArchsites</Keyword>
          <Keyword>archeology</Keyword>
        </KeywordList>
        <SRS>EPSG:26713</SRS>
        <LatLonBoundingBox minx="-103.8725637911543" miny="44.37740330855979" maxx="-103.63794182141925" maxy="44.48804280772808"/>
        <BoundingBox SRS="EPSG:26713" minx="589851.4376666048" miny="4914490.882968263" maxx="608346.4603107043" maxy="4926501.8980334345"/>
        <Style>
          <Name>point</Name>
          <Title>Default Point</Title>
          <Abstract>A sample style that draws a point</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=sf%3Aarchsites"/>
          </LegendURL>
        </Style>
        <Style>
          <Name>burg</Name>
          <Title>A small red flag</Title>
          <Abstract>A sample of how to use an SVG based symbolizer</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=sf%3Aarchsites&amp;style=burg"/>
          </LegendURL>
        </Style>
        <Style>
          <Name>capitals</Name>
          <Title>Capital cities</Title>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=sf%3Aarchsites&amp;style=capitals"/>
          </LegendURL>
        </Style>
      </Layer>
      <Layer queryable="1" opaque="0">
        <Name>sf:bugsites</Name>
        <Title>Spearfish bug locations</Title>
        <Abstract>Sample data from GRASS, bug sites location, Spearfish, South Dakota, USA</Abstract>
        <KeywordList>
          <Keyword>spearfish</Keyword>
          <Keyword>sfBugsites</Keyword>
          <Keyword>insects</Keyword>
          <Keyword>bugsites</Keyword>
          <Keyword>tiger_beetles</Keyword>
        </KeywordList>
        <SRS>EPSG:26713</SRS>
        <LatLonBoundingBox minx="-103.86796131703647" miny="44.373938816704396" maxx="-103.63773523234195" maxy="44.43418821380063"/>
        <BoundingBox SRS="EPSG:26713" minx="590223.4382724703" miny="4914107.882513998" maxx="608462.4604629107" maxy="4920523.89081033"/>
        <Style>
          <Name>capitals</Name>
          <Title>Capital cities</Title>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=sf%3Abugsites"/>
          </LegendURL>
        </Style>
        <Style>
          <Name>burg</Name>
          <Title>A small red flag</Title>
          <Abstract>A sample of how to use an SVG based symbolizer</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=sf%3Abugsites&amp;style=burg"/>
          </LegendURL>
        </Style>
        <Style>
          <Name>point</Name>
          <Title>Default Point</Title>
          <Abstract>A sample style that draws a point</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=sf%3Abugsites&amp;style=point"/>
          </LegendURL>
        </Style>
      </Layer>
      <Layer queryable="1" opaque="0">
        <Name>tiger:giant_polygon</Name>
        <Title>World rectangle</Title>
        <Abstract>A simple rectangular polygon covering most of the world, it's only used for the purpose of providing a background (WMS bgcolor could be used instead)</Abstract>
        <KeywordList>
          <Keyword>DS_giant_polygon</Keyword>
          <Keyword>giant_polygon</Keyword>
        </KeywordList>
        <SRS>EPSG:4326</SRS>
        <LatLonBoundingBox minx="-180.0" miny="-90.0" maxx="180.0" maxy="90.0"/>
        <BoundingBox SRS="EPSG:4326" minx="-180.0" miny="-90.0" maxx="180.0" maxy="90.0"/>
        <Style>
          <Name>giant_polygon</Name>
          <Title>Border-less gray fill</Title>
          <Abstract>Light gray polygon fill without a border</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=tiger%3Agiant_polygon"/>
          </LegendURL>
        </Style>
      </Layer>
      <Layer queryable="1" opaque="0">
        <Name>nurc:mosaic</Name>
        <Title>mosaic</Title>
        <Abstract>Italian sample mosaic</Abstract>
        <KeywordList>
          <Keyword>WCS</Keyword>
          <Keyword>ImageMosaic</Keyword>
          <Keyword>mosaic</Keyword>
        </KeywordList>
        <SRS>EPSG:4326</SRS>
        <LatLonBoundingBox minx="6.346" miny="36.492" maxx="20.83" maxy="46.591"/>
        <BoundingBox SRS="EPSG:4326" minx="6.346" miny="36.492" maxx="20.83" maxy="46.591"/>
        <Style>
          <Name>raster</Name>
          <Title>Default Raster</Title>
          <Abstract>A sample style that draws a raster, good for displaying imagery</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=nurc%3Amosaic"/>
          </LegendURL>
        </Style>
      </Layer>
      <Layer queryable="1" opaque="0">
        <Name>tiger:poi</Name>
        <Title>Manhattan (NY) points of interest</Title>
        <Abstract>Points of interest in New York, New York (on Manhattan). One of the attributes contains the name of a file with a picture of the point of interest.</Abstract>
        <KeywordList>
          <Keyword>poi</Keyword>
          <Keyword>Manhattan</Keyword>
          <Keyword>DS_poi</Keyword>
          <Keyword>points_of_interest</Keyword>
        </KeywordList>
        <SRS>EPSG:4326</SRS>
        <LatLonBoundingBox minx="-74.0118315772888" miny="40.70754683896324" maxx="-74.00857344353275" maxy="40.711945649065406"/>
        <BoundingBox SRS="EPSG:4326" minx="-74.0118315772888" miny="40.70754683896324" maxx="-74.00153046439813" maxy="40.719885123828675"/>
        <Style>
          <Name>poi</Name>
          <Title>Points of interest</Title>
          <Abstract>Manhattan points of interest</Abstract>
          <LegendURL width="22" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=tiger%3Apoi"/>
          </LegendURL>
        </Style>
        <Style>
          <Name>burg</Name>
          <Title>A small red flag</Title>
          <Abstract>A sample of how to use an SVG based symbolizer</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=tiger%3Apoi&amp;style=burg"/>
          </LegendURL>
        </Style>
        <Style>
          <Name>point</Name>
          <Title>Default Point</Title>
          <Abstract>A sample style that draws a point</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=tiger%3Apoi&amp;style=point"/>
          </LegendURL>
        </Style>
      </Layer>
      <Layer queryable="1" opaque="0">
        <Name>tiger:poly_landmarks</Name>
        <Title>Manhattan (NY) landmarks</Title>
        <Abstract>Manhattan landmarks, identifies water, lakes, parks, interesting buildilngs</Abstract>
        <KeywordList>
          <Keyword>landmarks</Keyword>
          <Keyword>DS_poly_landmarks</Keyword>
          <Keyword>manhattan</Keyword>
          <Keyword>poly_landmarks</Keyword>
        </KeywordList>
        <SRS>EPSG:4326</SRS>
        <LatLonBoundingBox minx="-74.047185" miny="40.679648" maxx="-73.90782" maxy="40.882078"/>
        <BoundingBox SRS="EPSG:4326" minx="-74.047185" miny="40.679648" maxx="-73.90782" maxy="40.882078"/>
        <Style>
          <Name>poly_landmarks</Name>
          <Title>poly_landmarks</Title>
          <LegendURL width="22" height="60">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=tiger%3Apoly_landmarks"/>
          </LegendURL>
        </Style>
        <Style>
          <Name>grass</Name>
          <Title>Grass fill</Title>
          <Abstract>A style filling polygons with a grass theme coming from a PNG file</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=tiger%3Apoly_landmarks&amp;style=grass"/>
          </LegendURL>
        </Style>
        <Style>
          <Name>restricted</Name>
          <Title>Red, translucent style</Title>
          <Abstract>A sample style that just prints out a transparent red interior with a red outline</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=tiger%3Apoly_landmarks&amp;style=restricted"/>
          </LegendURL>
        </Style>
        <Style>
          <Name>polygon</Name>
          <Title>Default Polygon</Title>
          <Abstract>A sample style that draws a polygon</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=tiger%3Apoly_landmarks&amp;style=polygon"/>
          </LegendURL>
        </Style>
      </Layer>
      <Layer queryable="1" opaque="0">
        <Name>sf:restricted</Name>
        <Title>Spearfish restricted areas</Title>
        <Abstract>Sample data from GRASS, restricted areas, Spearfish, South Dakota, USA</Abstract>
        <KeywordList>
          <Keyword>spearfish</Keyword>
          <Keyword>restricted</Keyword>
          <Keyword>areas</Keyword>
          <Keyword>sfRestricted</Keyword>
        </KeywordList>
        <SRS>EPSG:26713</SRS>
        <LatLonBoundingBox minx="-103.85057172920756" miny="44.39436387625042" maxx="-103.74741494853805" maxy="44.48215752041131"/>
        <BoundingBox SRS="EPSG:26713" minx="591579.1858092896" miny="4916236.662227167" maxx="599648.9251686076" maxy="4925872.146218054"/>
        <Style>
          <Name>restricted</Name>
          <Title>Red, translucent style</Title>
          <Abstract>A sample style that just prints out a transparent red interior with a red outline</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=sf%3Arestricted"/>
          </LegendURL>
        </Style>
        <Style>
          <Name>polygon</Name>
          <Title>Default Polygon</Title>
          <Abstract>A sample style that draws a polygon</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=sf%3Arestricted&amp;style=polygon"/>
          </LegendURL>
        </Style>
      </Layer>
      <Layer queryable="1" opaque="0">
        <Name>sf:roads</Name>
        <Title>Spearfish roads</Title>
        <Abstract>Sample data from GRASS, road layout, Spearfish, South Dakota, USA</Abstract>
        <KeywordList>
          <Keyword>sfRoads</Keyword>
          <Keyword>spearfish</Keyword>
          <Keyword>roads</Keyword>
        </KeywordList>
        <SRS>EPSG:26713</SRS>
        <LatLonBoundingBox minx="-103.87741691493184" miny="44.37087275281798" maxx="-103.62231404880659" maxy="44.50015918338962"/>
        <BoundingBox SRS="EPSG:26713" minx="589434.8564686741" miny="4914006.337837095" maxx="609527.2102150217" maxy="4928063.398014731"/>
        <Style>
          <Name>simple_roads</Name>
          <Title>Default Styler for simple road segments</Title>
          <Abstract>Light red line, 2px wide</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=sf%3Aroads"/>
          </LegendURL>
        </Style>
        <Style>
          <Name>line</Name>
          <Title>Default Line</Title>
          <Abstract>A sample style that draws a line</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=sf%3Aroads&amp;style=line"/>
          </LegendURL>
        </Style>
      </Layer>
      <Layer queryable="1" opaque="0">
        <Name>sf:sfdem</Name>
        <Title>Spearfish elevation</Title>
        <Abstract>Digital elevation model for the Spearfish region.&#13;
&#13;
sfdem is a Tagged Image File Format with Geographic information</Abstract>
        <KeywordList>
          <Keyword>WCS</Keyword>
          <Keyword>sfdem</Keyword>
          <Keyword>sfdem</Keyword>
        </KeywordList>
        <SRS>EPSG:26713</SRS>
        <LatLonBoundingBox minx="-103.87108701853181" miny="44.370187074132616" maxx="-103.62940739432703" maxy="44.5016011535299"/>
        <BoundingBox SRS="EPSG:26713" minx="589980.0" miny="4913700.0" maxx="609000.0" maxy="4928010.0"/>
        <Style>
          <Name>dem</Name>
          <Title>Simple DEM style</Title>
          <Abstract>Classic elevation color progression</Abstract>
          <LegendURL width="58" height="182">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=sf%3Asfdem"/>
          </LegendURL>
        </Style>
      </Layer>
      <Layer queryable="1" opaque="0">
        <Name>topp:states</Name>
        <Title>USA Population</Title>
        <Abstract>This is some census data on the states.</Abstract>
        <KeywordList>
          <Keyword>census</Keyword>
          <Keyword>united</Keyword>
          <Keyword>boundaries</Keyword>
          <Keyword>state</Keyword>
          <Keyword>states</Keyword>
        </KeywordList>
        <SRS>EPSG:4326</SRS>
        <LatLonBoundingBox minx="-124.731422" miny="24.955967" maxx="-66.969849" maxy="49.371735"/>
        <BoundingBox SRS="EPSG:4326" minx="-124.73142200000001" miny="24.955967" maxx="-66.969849" maxy="49.371735"/>
        <Style>
          <Name>population</Name>
          <Title>Population in the United States</Title>
          <Abstract>A sample filter that filters the United States into three
        categories of population, drawn in different colors</Abstract>
          <LegendURL width="77" height="80">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=topp%3Astates"/>
          </LegendURL>
        </Style>
        <Style>
          <Name>pophatch</Name>
          <Title>Population in the United States</Title>
          <Abstract>A sample filter that filters the United States into three
        categories of population, drawn in different colors</Abstract>
          <LegendURL width="77" height="80">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=topp%3Astates&amp;style=pophatch"/>
          </LegendURL>
        </Style>
        <Style>
          <Name>polygon</Name>
          <Title>Default Polygon</Title>
          <Abstract>A sample style that draws a polygon</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=topp%3Astates&amp;style=polygon"/>
          </LegendURL>
        </Style>
      </Layer>
      <Layer queryable="1" opaque="0">
        <Name>sf:streams</Name>
        <Title>Spearfish streams</Title>
        <Abstract>Sample data from GRASS, streams, Spearfish, South Dakota, USA</Abstract>
        <KeywordList>
          <Keyword>spearfish</Keyword>
          <Keyword>sfStreams</Keyword>
          <Keyword>streams</Keyword>
        </KeywordList>
        <SRS>EPSG:26713</SRS>
        <LatLonBoundingBox minx="-103.87789019829768" miny="44.372335260095554" maxx="-103.62287788915457" maxy="44.502218486214815"/>
        <BoundingBox SRS="EPSG:26713" minx="589434.4971235897" miny="4913947.342298816" maxx="609518.2117427464" maxy="4928071.049965891"/>
        <Style>
          <Name>simple_streams</Name>
          <Title>Default Styler for streams segments</Title>
          <Abstract>Blue lines, 2px wide</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=sf%3Astreams"/>
          </LegendURL>
        </Style>
        <Style>
          <Name>line</Name>
          <Title>Default Line</Title>
          <Abstract>A sample style that draws a line</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=sf%3Astreams&amp;style=line"/>
          </LegendURL>
        </Style>
      </Layer>
      <Layer queryable="1" opaque="0">
        <Name>topp:tasmania_cities</Name>
        <Title>Tasmania cities</Title>
        <Abstract>Cities in Tasmania (actually, just the capital)</Abstract>
        <KeywordList>
          <Keyword>cities</Keyword>
          <Keyword>Tasmania</Keyword>
        </KeywordList>
        <SRS>EPSG:4326</SRS>
        <LatLonBoundingBox minx="145.19754" miny="-43.423512" maxx="148.27298000000002" maxy="-40.852802"/>
        <BoundingBox SRS="EPSG:4326" minx="145.19754" miny="-43.423512" maxx="148.27298000000002" maxy="-40.852802"/>
        <Style>
          <Name>capitals</Name>
          <Title>Capital cities</Title>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=topp%3Atasmania_cities"/>
          </LegendURL>
        </Style>
      </Layer>
      <Layer queryable="1" opaque="0">
        <Name>topp:tasmania_roads</Name>
        <Title>Tasmania roads</Title>
        <Abstract>Main Tasmania roads</Abstract>
        <KeywordList>
          <Keyword>Roads</Keyword>
          <Keyword>Tasmania</Keyword>
        </KeywordList>
        <SRS>EPSG:4326</SRS>
        <LatLonBoundingBox minx="145.19754" miny="-43.423512" maxx="148.27298000000002" maxy="-40.852802"/>
        <BoundingBox SRS="EPSG:4326" minx="145.19754" miny="-43.423512" maxx="148.27298000000002" maxy="-40.852802"/>
        <Style>
          <Name>simple_roads</Name>
          <Title>Default Styler for simple road segments</Title>
          <Abstract>Light red line, 2px wide</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=topp%3Atasmania_roads"/>
          </LegendURL>
        </Style>
      </Layer>
      <Layer queryable="1" opaque="0">
        <Name>topp:tasmania_state_boundaries</Name>
        <Title>Tasmania state boundaries</Title>
        <Abstract>Tasmania state boundaries</Abstract>
        <KeywordList>
          <Keyword>boundaries</Keyword>
          <Keyword>tasmania_state_boundaries</Keyword>
          <Keyword>Tasmania</Keyword>
        </KeywordList>
        <SRS>EPSG:4326</SRS>
        <LatLonBoundingBox minx="143.83482400000003" miny="-43.648056" maxx="148.47914100000003" maxy="-39.573891"/>
        <BoundingBox SRS="EPSG:4326" minx="143.83482400000003" miny="-43.648056" maxx="148.47914100000003" maxy="-39.573891"/>
        <Style>
          <Name>green</Name>
          <Title>Green polygon</Title>
          <Abstract>Green fill with black outline</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=topp%3Atasmania_state_boundaries"/>
          </LegendURL>
        </Style>
      </Layer>
      <Layer queryable="1" opaque="0">
        <Name>topp:tasmania_water_bodies</Name>
        <Title>Tasmania water bodies</Title>
        <Abstract>Tasmania water bodies</Abstract>
        <KeywordList>
          <Keyword>Lakes</Keyword>
          <Keyword>Bodies</Keyword>
          <Keyword>Australia</Keyword>
          <Keyword>Water</Keyword>
          <Keyword>Tasmania</Keyword>
        </KeywordList>
        <SRS>EPSG:4326</SRS>
        <LatLonBoundingBox minx="145.97161899999998" miny="-43.031944" maxx="147.219696" maxy="-41.775558"/>
        <BoundingBox SRS="EPSG:4326" minx="145.97161899999998" miny="-43.031944" maxx="147.219696" maxy="-41.775558"/>
        <Style>
          <Name>cite_lakes</Name>
          <Title>Blue lake</Title>
          <Abstract>A blue fill, solid black outline style</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=topp%3Atasmania_water_bodies"/>
          </LegendURL>
        </Style>
      </Layer>
      <Layer queryable="1" opaque="0">
        <Name>tiger:tiger_roads</Name>
        <Title>Manhattan (NY) roads</Title>
        <Abstract>Highly simplified road layout of Manhattan in New York..</Abstract>
        <KeywordList>
          <Keyword>DS_tiger_roads</Keyword>
          <Keyword>tiger_roads</Keyword>
          <Keyword>roads</Keyword>
        </KeywordList>
        <SRS>EPSG:4326</SRS>
        <LatLonBoundingBox minx="-74.02722" miny="40.684221" maxx="-73.907005" maxy="40.878178"/>
        <BoundingBox SRS="EPSG:4326" minx="-74.02722" miny="40.684221" maxx="-73.907005" maxy="40.878178"/>
        <Style>
          <Name>tiger_roads</Name>
          <Title>tiger_roads</Title>
          <LegendURL width="22" height="40">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=tiger%3Atiger_roads"/>
          </LegendURL>
        </Style>
        <Style>
          <Name>line</Name>
          <Title>Default Line</Title>
          <Abstract>A sample style that draws a line</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=tiger%3Atiger_roads&amp;style=line"/>
          </LegendURL>
        </Style>
        <Style>
          <Name>simple_roads</Name>
          <Title>Default Styler for simple road segments</Title>
          <Abstract>Light red line, 2px wide</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=tiger%3Atiger_roads&amp;style=simple_roads"/>
          </LegendURL>
        </Style>
      </Layer>
    </Layer>
  </Capability>
</WMT_MS_Capabilities>


```



### 附录2 GetCapabilities1.1.1 添加namespace参数,删除部分坐标系信息



```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE WMT_MS_Capabilities SYSTEM "http://localhost:8080/geoserver/schemas/wms/1.1.1/WMS_MS_Capabilities.dtd">
<WMT_MS_Capabilities version="1.1.1" updateSequence="152">
  <Service>
    <Name>OGC:WMS</Name>
    <Title>GeoServer Web Map Service</Title>
    <Abstract>A compliant implementation of WMS plus most of the SLD extension (dynamic styling). Can also generate PDF, SVG, KML, GeoRSS</Abstract>
    <KeywordList>
      <Keyword>WFS</Keyword>
      <Keyword>WMS</Keyword>
      <Keyword>GEOSERVER</Keyword>
    </KeywordList>
    <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://geoserver.org"/>
    <ContactInformation>
      <ContactPersonPrimary>
        <ContactPerson>Claudius Ptolomaeus</ContactPerson>
        <ContactOrganization>The Ancient Geographers</ContactOrganization>
      </ContactPersonPrimary>
      <ContactPosition>Chief Geographer</ContactPosition>
      <ContactAddress>
        <AddressType>Work</AddressType>
        <Address/>
        <City>Alexandria</City>
        <StateOrProvince/>
        <PostCode/>
        <Country>Egypt</Country>
      </ContactAddress>
      <ContactVoiceTelephone/>
      <ContactFacsimileTelephone/>
      <ContactElectronicMailAddress>claudius.ptolomaeus@gmail.com</ContactElectronicMailAddress>
    </ContactInformation>
    <Fees>NONE</Fees>
    <AccessConstraints>NONE</AccessConstraints>
  </Service>
  <Capability>
    <Request>
      <GetCapabilities>
        <Format>application/vnd.ogc.wms_xml</Format>
        <Format>text/xml</Format>
        <DCPType>
          <HTTP>
            <Get>
              <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?SERVICE=WMS&amp;"/>
            </Get>
            <Post>
              <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?SERVICE=WMS&amp;"/>
            </Post>
          </HTTP>
        </DCPType>
      </GetCapabilities>
      <GetMap>
        <Format>image/png</Format>
        <Format>application/atom xml</Format>
        <Format>application/atom+xml</Format>
        <Format>application/json;type=utfgrid</Format>
        <Format>application/openlayers</Format>
        <Format>application/pdf</Format>
        <Format>application/rss xml</Format>
        <Format>application/rss+xml</Format>
        <Format>application/vnd.google-earth.kml</Format>
        <Format>application/vnd.google-earth.kml xml</Format>
        <Format>application/vnd.google-earth.kml+xml</Format>
        <Format>application/vnd.google-earth.kml+xml;mode=networklink</Format>
        <Format>application/vnd.google-earth.kmz</Format>
        <Format>application/vnd.google-earth.kmz xml</Format>
        <Format>application/vnd.google-earth.kmz+xml</Format>
        <Format>application/vnd.google-earth.kmz;mode=networklink</Format>
        <Format>atom</Format>
        <Format>image/geotiff</Format>
        <Format>image/geotiff8</Format>
        <Format>image/gif</Format>
        <Format>image/gif;subtype=animated</Format>
        <Format>image/jpeg</Format>
        <Format>image/png8</Format>
        <Format>image/png; mode=8bit</Format>
        <Format>image/svg</Format>
        <Format>image/svg xml</Format>
        <Format>image/svg+xml</Format>
        <Format>image/tiff</Format>
        <Format>image/tiff8</Format>
        <Format>image/vnd.jpeg-png</Format>
        <Format>kml</Format>
        <Format>kmz</Format>
        <Format>openlayers</Format>
        <Format>rss</Format>
        <Format>text/html; subtype=openlayers</Format>
        <Format>utfgrid</Format>
        <DCPType>
          <HTTP>
            <Get>
              <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?SERVICE=WMS&amp;"/>
            </Get>
          </HTTP>
        </DCPType>
      </GetMap>
      <GetFeatureInfo>
        <Format>text/plain</Format>
        <Format>application/vnd.ogc.gml</Format>
        <Format>text/xml</Format>
        <Format>application/vnd.ogc.gml/3.1.1</Format>
        <Format>text/xml; subtype=gml/3.1.1</Format>
        <Format>text/html</Format>
        <Format>application/json</Format>
        <DCPType>
          <HTTP>
            <Get>
              <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?SERVICE=WMS&amp;"/>
            </Get>
            <Post>
              <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?SERVICE=WMS&amp;"/>
            </Post>
          </HTTP>
        </DCPType>
      </GetFeatureInfo>
      <DescribeLayer>
        <Format>application/vnd.ogc.wms_xml</Format>
        <DCPType>
          <HTTP>
            <Get>
              <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?SERVICE=WMS&amp;"/>
            </Get>
          </HTTP>
        </DCPType>
      </DescribeLayer>
      <GetLegendGraphic>
        <Format>image/png</Format>
        <Format>image/jpeg</Format>
        <Format>image/gif</Format>
        <DCPType>
          <HTTP>
            <Get>
              <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?SERVICE=WMS&amp;"/>
            </Get>
          </HTTP>
        </DCPType>
      </GetLegendGraphic>
      <GetStyles>
        <Format>application/vnd.ogc.sld+xml</Format>
        <DCPType>
          <HTTP>
            <Get>
              <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?SERVICE=WMS&amp;"/>
            </Get>
          </HTTP>
        </DCPType>
      </GetStyles>
    </Request>
    <Exception>
      <Format>application/vnd.ogc.se_xml</Format>
      <Format>application/vnd.ogc.se_inimage</Format>
      <Format>application/vnd.ogc.se_blank</Format>
      <Format>application/json</Format>
    </Exception>
    <UserDefinedSymbolization SupportSLD="1" UserLayer="1" UserStyle="1" RemoteWFS="1"/>
    <Layer>
      <Title>GeoServer Web Map Service</Title>
      <Abstract>A compliant implementation of WMS plus most of the SLD extension (dynamic styling). Can also generate PDF, SVG, KML, GeoRSS</Abstract>
      <!--All supported EPSG projections:-->
      <SRS>AUTO:42001</SRS>
      <SRS>AUTO:42002</SRS>
      <SRS>AUTO:42003</SRS>
      
      <LatLonBoundingBox minx="-180.0" miny="-90.0" maxx="180.0" maxy="90.0"/>
      <Layer queryable="1">
        <Name>spearfish</Name>
        <Title>Spearfish</Title>
        <Abstract>Spearfish City in Lawrence County, South Dakota&#13;
&#13;
The area covered by the data set is in the vicinity of Spearfish and includes a majority of the Black Hills National Forest (i.e., Mount Rushmore).</Abstract>
        <KeywordList/>
        <SRS>EPSG:26713</SRS>
        <LatLonBoundingBox minx="-103.87791475407893" miny="44.37246687108142" maxx="-103.62278893469492" maxy="44.50235105543566"/>
        <BoundingBox SRS="EPSG:26713" minx="589425.9342365642" miny="4913959.224611808" maxx="609518.6719560538" maxy="4928082.949945881"/>
      </Layer>
      <Layer queryable="1">
        <Name>tasmania</Name>
        <Title>Tasmania</Title>
        <Abstract>Tasmania Australia from Digital Chart of the World.</Abstract>
        <KeywordList/>
        <SRS>EPSG:4326</SRS>
        <LatLonBoundingBox minx="143.83482400000003" miny="-43.648056" maxx="148.47914100000003" maxy="-39.573891"/>
        <BoundingBox SRS="EPSG:4326" minx="143.83482400000003" miny="-43.648056" maxx="148.47914100000003" maxy="-39.573891"/>
      </Layer>
      <Layer queryable="1">
        <Name>tiger-ny</Name>
        <Title>TIGER New York</Title>
        <Abstract>Topologically Integrated Geographic Encoding and Referencing (TIGER) dataset for New York.</Abstract>
        <KeywordList/>
        <SRS>EPSG:4326</SRS>
        <LatLonBoundingBox minx="-74.047185" miny="40.679648" maxx="-73.907005" maxy="40.882078"/>
        <BoundingBox SRS="EPSG:4326" minx="-74.047185" miny="40.679648" maxx="-73.907005" maxy="40.882078"/>
      </Layer>
      <Layer queryable="1" opaque="0">
        <Name>nurc:Arc_Sample</Name>
        <Title>A sample ArcGrid file</Title>
        <Abstract/>
        <KeywordList>
          <Keyword>WCS</Keyword>
          <Keyword>arcGridSample</Keyword>
          <Keyword>arcGridSample_Coverage</Keyword>
        </KeywordList>
        <SRS>EPSG:4326</SRS>
        <LatLonBoundingBox minx="-180.0" miny="-90.0" maxx="180.0" maxy="90.0"/>
        <BoundingBox SRS="EPSG:4326" minx="-180.0" miny="-90.0" maxx="180.0" maxy="90.0"/>
        <Style>
          <Name>rain</Name>
          <Title>Rain distribution</Title>
          <LegendURL width="22" height="121">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=nurc%3AArc_Sample"/>
          </LegendURL>
        </Style>
        <Style>
          <Name>raster</Name>
          <Title>Default Raster</Title>
          <Abstract>A sample style that draws a raster, good for displaying imagery</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=nurc%3AArc_Sample&amp;style=raster"/>
          </LegendURL>
        </Style>
      </Layer>
      <Layer queryable="1" opaque="0">
        <Name>nurc:Img_Sample</Name>
        <Title>North America sample imagery</Title>
        <Abstract/>
        <KeywordList>
          <Keyword>WCS</Keyword>
          <Keyword>worldImageSample</Keyword>
          <Keyword>worldImageSample_Coverage</Keyword>
        </KeywordList>
        <SRS>EPSG:4326</SRS>
        <LatLonBoundingBox minx="-130.85168" miny="20.7052" maxx="-62.0054" maxy="54.1141"/>
        <BoundingBox SRS="EPSG:4326" minx="-130.85168" miny="20.7052" maxx="-62.0054" maxy="54.1141"/>
        <Style>
          <Name>raster</Name>
          <Title>Default Raster</Title>
          <Abstract>A sample style that draws a raster, good for displaying imagery</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=nurc%3AImg_Sample"/>
          </LegendURL>
        </Style>
      </Layer>
      <Layer queryable="1" opaque="0">
        <Name>nurc:Pk50095</Name>
        <Title>Pk50095</Title>
        <Abstract>Pk50095 is a raster file accompanied by a spatial data file.</Abstract>
        <KeywordList>
          <Keyword>WCS</Keyword>
          <Keyword>img_sample2</Keyword>
          <Keyword>Pk50095</Keyword>
        </KeywordList>
        <SRS>EPSG:32633</SRS>
        <LatLonBoundingBox minx="12.999446822650462" miny="46.722110379286" maxx="13.308182612644663" maxy="46.91359611878293"/>
        <BoundingBox SRS="EPSG:32633" minx="347649.93086859107" miny="5176214.082539256" maxx="370725.976428591" maxy="5196961.352859256"/>
        <Style>
          <Name>raster</Name>
          <Title>Default Raster</Title>
          <Abstract>A sample style that draws a raster, good for displaying imagery</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=nurc%3APk50095"/>
          </LegendURL>
        </Style>
      </Layer>
      <Layer queryable="1" opaque="0">
        <Name>nurc:mosaic</Name>
        <Title>mosaic</Title>
        <Abstract>Italian sample mosaic</Abstract>
        <KeywordList>
          <Keyword>WCS</Keyword>
          <Keyword>ImageMosaic</Keyword>
          <Keyword>mosaic</Keyword>
        </KeywordList>
        <SRS>EPSG:4326</SRS>
        <LatLonBoundingBox minx="6.346" miny="36.492" maxx="20.83" maxy="46.591"/>
        <BoundingBox SRS="EPSG:4326" minx="6.346" miny="36.492" maxx="20.83" maxy="46.591"/>
        <Style>
          <Name>raster</Name>
          <Title>Default Raster</Title>
          <Abstract>A sample style that draws a raster, good for displaying imagery</Abstract>
          <LegendURL width="20" height="20">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:8080/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=nurc%3Amosaic"/>
          </LegendURL>
        </Style>
      </Layer>
    </Layer>
  </Capability>
</WMT_MS_Capabilities>


```

