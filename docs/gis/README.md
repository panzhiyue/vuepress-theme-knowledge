# GIS

## 学习资源

坐标系查询:https://epsg.io/

下载坐标系:https://epsg.io/{wkid}.wkt?download

https://epsg.io/4549.wkt?download

麻辣GIS:https://malagis.com/tag/MapGIS/

gis云生态圈:http://www.smaryun.com/dev/resource_center.html#/type27/tag10/page1

无人机数据下载；https://www.sensefly.com/education/datasets/?dataset=3121

demo数据下载：https://blog.csdn.net/weixin_34072159/article/details/93388215?utm_medium=distribute.pc_feed_404.none-task-blog-BlogCommendFromBaidu-2.nonecase&depth_1-utm_source=distribute.pc_feed_404.none-task-blog-BlogCommendFromBaidu-2.nonecas

全球地理信息资源目录服务系统：https://www.webmap.cn/main.do?method=index

零基础入门GIS开发课程及资料：https://zhuanlan.zhihu.com/p/567468114

## 数据格式

### geojson

#### 参考资料

https://www.oschina.net/translate/geojson-spec

#### 简介

GeoJSON是一种对各种地理数据结构进行编码的格式。GeoJSON对象可以表示几何、特征或者特征集合。GeoJSON支持下面几何类型：点、线、面、多点、多线、多面和几何集合。GeoJSON里的特征包含一个几何对象和其他属性，特征集合表示一系列特征。

一个完整的GeoJSON数据结构总是一个（JSON术语里的）对象。在GeoJSON里，对象由名/值对--也称作成员的集合组成。对每个成员来说，名字总是字符串。成员的值要么是字符串、数字、对象、数组，要么是下面文本常量中的一个："true","false"和"null"。数组是由值是上面所说的元素组成。

#### 语法

```json
{"type": "FeatureCollection","features":[featureObj,....featureObj],crs:crsObj,bbox:bboxObj}
```

#### 属性

**type:**始终为`FeatureCollection`

**features:**是feature对象数组

**crs:**(可选)默认 WGS84 地理坐标系

**bbox:**(可选) 包含几何、特征或者特征集合的坐标范围信息 

#### 举例

```json
{ "type": "FeatureCollection",
  "features": [
    { "type": "Feature",
      "geometry": {"type": "Point", "coordinates": [102.0, 0.5]},
      "properties": {"prop0": "value0"}
      },
    { "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
          ]
        },
      "properties": {
        "prop0": "value0",
        "prop1": 0.0
        }
      },
    { "type": "Feature",
       "geometry": {
         "type": "Polygon",
         "coordinates": [
           [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
             [100.0, 1.0], [100.0, 0.0] ]
           ]
       },
       "properties": {
         "prop0": "value0",
         "prop1": {"this": "that"}
         }
       }
     ]
   }
```

#### Feature

##### 简介

 类型为"Feature"的GeoJSON对象是特征对象。 

##### 语法

```json
{"type": "Feature",
 "geometry":geometryObj,
 "properties":Object,
 "bbox":bboxObj
}
```

##### 属性

**type:**始终为`Feature`

**geometry:**几何对象

**properties:**属性对象

**bbox:**(可选) 包含几何、特征或者特征集合的坐标范围信息 

##### 举例

```json
    { "type": "Feature",
       "geometry": {
         "type": "Polygon",
         "coordinates": [
           [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
             [100.0, 1.0], [100.0, 0.0] ]
           ]
       },
       "properties": {
         "prop0": "value0",
         "prop1": {"this": "that"}
         }
       }
```

#### Geometry

Geometry是一种GeoJSON对象，这时type成员的值是下面字符串之一："Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon", 或者"GeometryCollection"。

 除了“GeometryCollection”外的其他任何类型的GeoJSON几何对象必须由一个名字为"coordinates"的成员。coordinates成员的值总是数组。这个数组里的元素的结构由几何类型来确定。



 位置是基本的几何结构。几何对象的"coordinates"成员由一个位置（这儿是几何点）、位置数组（线或者几何多点），位置数组的数组（面、多线）或者位置的多维数组（多面）组成。 

 位置由数字数组表示。必须至少两个元素，可以有更多元素。元素的顺序必须遵从x,y,z顺序（投影坐标参考系统中坐标的东向、北向、高度或者地理坐标参考系统中的坐标长度、纬度、高度）。任何数目的其他元素是允许的---其他元素的说明和意义超出了这篇规格说明的范围。 

##### 1.Point

```json
{"type":"Point","coordinates":[120,28]}
```

##### 2.MultiPoint

```json
{"type":"MultiPoint","coordinates":[[120,28],[120,29]]}
```

##### 3.LineString

```json
{"type":"LineString","coordinates":[[120,28],[120,29]]}
```

##### 4.MultiLineString

```json
{"type":"MultiLineString","coordinates":[[[120,28],[120,29]],[[120,27],[119,27]]]}
```

##### 5.Polygon

```json
{"type":"Polygon","coordinates":[[[120,28],[120,29],[119,29],[120,28]]]}
```

##### 6.MultiPolygon

```json
{"type":"MultiPolygon","coordinates":[[[[120,28],[120,29],[119,29],[120,28]]],[[[118,28],[118,29],[117,29],[118,28]]]]}
```

##### 7.GeometryCollection

```json
{"type":"GeometryCollection","geometries":[{"type":"Point","coordinates":[116,28]},{"type":"MultiPolygon","coordinates":[[[[120,28],[120,29],[119,29],[120,28]]],[[[118,28],[118,29],[117,29],[118,28]]]]}]}
```

#### CRS

GeoJSON对象的坐标参考系统（CRS）是由它的"crs"成员（指的是下面的CRS对象）来确定的。如果对象没有crs成员，那么它的父对象或者祖父对象的crs成员可能被获取作为它的crs。如果这样还没有获得crs成员，那么默认的CRS将应用到GeoJSON对象。

- 默认的CRS是地理坐标参考系统，使用的是WGS84数据，长度和高度的单位是十进制标示。
- 名字为"crs"成员的值必须是JSON对象（指的是下面的CRS对象）或者JSON的null。如果CRS的值为null,那么就假设没有CRS了。
- crs成员应当位于（特征集合、特征、几何的顺序的）层级结构里GeoJSON对象的最顶级，而且在自对象或者孙子对象里不应该重复或者覆盖。
- 非空的CRS对象有两个强制拥有的对象:"type"和"properties"。
- type成员的值必须是字符串，这个字符串说明了CRS对象的类型。
- 属性成员的值必须是对象。
- CRS应不能更改坐标顺序。

##### name格式

CRS对象可以通过名字来表明坐标参考系统。在这种情况下，它的"type"成员的值必须是字符串"name"。它的"properties"成员的值必须是包含"name"成员的对象。这个"name"成员的值必须是标识坐标参考系统的字符串。比如“urn:ogc:def:crs:OGC:1.3:CRS84"的OGC CRS的URN应当优先于旧的标识符如"EPSG:4326"得到选用：

```JSON
"crs": {
  "type": "name",
  "properties": {
    "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
    }
  }
```

##### link格式

 CRS对象也可以连接到互联网上的CRS参数。在这种情况下，它的"type"成员的值必须是字符串"link",它的"properties"成员的值必须是一个连接对象

连接对象由一个必需的成员："href"，和一个可选的成员:"type"。

必需的"href"成员的值必须是解引用的URI（统一资源标识）。

可选的"type"成员的值必须是字符串，而且这个字符串暗示了所提供的URI里用来表示CRS参数的格式。建议值是:"proj4","ogcwkt",esriwkt",不过可以使用其他值：

```json
"crs": {
  "type": "link",
  "properties": {
    "href": "http://example.com/crs/42",
    "type": "proj4"
    }
  }
```

相对连接常常可以作为辅助文件里的CRS的直接处理器：

```json
"crs": {
  "type": "link",
  "properties": {
    "href": "data.crs",
    "type": "ogcwkt"
    }
  }
```

#### bbox

为了包含几何、特征或者特征集合的坐标范围信息，GeoJSON对象可能有一个名字为"bbox的成员。bbox成员的值必须是2*n数组，这儿n是所包含几何对象的维数，并且所有坐标轴的最低值后面跟着最高者值。bbox的坐标轴的顺序遵循几何坐标轴的顺序。除此之外，bbox的坐标参考系统假设匹配它所在GeoJSON对象的坐标参考系统。

特征对象上的bbox成员的例子：

```json
{ "type": "Feature",
  "bbox": [-180.0, -90.0, 180.0, 90.0],
  "geometry": {
    "type": "Polygon",
    "coordinates": [[
      [-180.0, 10.0], [20.0, 90.0], [180.0, -5.0], [-30.0, -90.0]
      ]]
    }
  ...
  }
```

特征集合对象bbox成员的例子：

```json
{ "type": "FeatureCollection",
  "bbox": [100.0, 0.0, 105.0, 1.0],
  "features": [
    ...
    ]
  }
```

### WKT

WKT格式--OGC well-known text，是OGC制定的空间数据的组织规范，wkt是以文本形式描述。

使用wkt能够很好到和其他系统进行数据交换，目前大部分支持空间数据存储的数据库构造空间数据都采用这两种方式。

#### 常见几何格式

##### 1.点

```
POINT(0 0)
```

##### 2.线

```
LINESTRING(0 0,1 1,1 2)
```

##### 3.面

```
POLYGON((0 0,4 0,4 4,0 4,0 0),(1 1, 2 1, 2 2, 1 2,1 1))
```

##### 4.多点

```
MULTIPOINT(0 0,1 2) 
```

##### 5.多线

```
MULTILINESTRING((0 0,1 1,1 2),(2 3,3 2,5 4))
```

##### 6.多面

```
MULTIPOLYGON(((0 0,4 0,4 4,0 4,0 0),(1 1,2 1,2 2,1 2,1 1)), ((-1 -1,-1 -2,-2 -2,-2 -1,-1 -1)))
```

##### 7.几何集合

```
GEOMETRYCOLLECTION(POINT(2 3),LINESTRING((2 3,3 4)))

```

##### 8.空几何

```
POINT EMPTY
LINESTRING EMPTY
POLYGON EMPTY
MULTIPOINT EMPTY
MULTILINESTRING EMPTY
MULTIPOLYGON EMPTY

```

##### 9.格式列表

https://blog.csdn.net/weixin_30502965/article/details/98138345

### GML

#### 1点

```xml
<gml:Point srsName="EPSG:4490"><gml:coordinates>120,28</gml:coordinates></gml:Point>

```

#### 2多点

```xml
<gml:MultiPoint srsName="EPSG:4490"><gml:pointMember><gml:Point><gml:coordinates>120,28</gml:coordinates></gml:Point></gml:pointMember><gml:pointMember><gml:Point><gml:coordinates>120,29</gml:coordinates></gml:Point></gml:pointMember></gml:MultiPoint>

```



#### 3线

```xml
<gml:LineString srsName="EPSG:4490"><gml:coordinates>120,28 120,29</gml:coordinates></gml:LineString>

```



#### 4多线

```xml
<gml:MultiLineString srsName="EPSG:4490"><gml:lineStringMember><gml:LineString><gml:coordinates>120,28 120,29</gml:coordinates></gml:LineString></gml:lineStringMember><gml:lineStringMember><gml:LineString><gml:coordinates>120,27 119,27</gml:coordinates></gml:LineString></gml:lineStringMember></gml:MultiLineString>

```



#### 5面

```xml
<gml:Polygon srsName="EPSG:4490"><gml:outerBoundaryIs><gml:LinearRing><gml:coordinates>120,28 120,29 119,29 120,28</gml:coordinates></gml:LinearRing></gml:outerBoundaryIs></gml:Polygon>

```



#### 6多面

```xml
<gml:MultiPolygon srsName="EPSG:4490"><gml:polygonMember><gml:Polygon><gml:outerBoundaryIs><gml:LinearRing><gml:coordinates>120,28 120,29 119,29 120,28</gml:coordinates></gml:LinearRing></gml:outerBoundaryIs></gml:Polygon></gml:polygonMember><gml:polygonMember><gml:Polygon><gml:outerBoundaryIs><gml:LinearRing><gml:coordinates>118,28 118,29 117,29 118,28</gml:coordinates></gml:LinearRing></gml:outerBoundaryIs></gml:Polygon></gml:polygonMember></gml:MultiPolygon>

```



#### 7几何集合

```xml
<gml:MultiGeometry srsName="EPSG:4490"><gml:geometryMember><gml:Point><gml:coordinates>116,28</gml:coordinates></gml:Point></gml:geometryMember><gml:geometryMember><gml:MultiPolygon><gml:polygonMember><gml:Polygon><gml:outerBoundaryIs><gml:LinearRing><gml:coordinates>120,28 120,29 119,29 120,28</gml:coordinates></gml:LinearRing></gml:outerBoundaryIs></gml:Polygon></gml:polygonMember><gml:polygonMember><gml:Polygon><gml:outerBoundaryIs><gml:LinearRing><gml:coordinates>118,28 118,29 117,29 118,28</gml:coordinates></gml:LinearRing></gml:outerBoundaryIs></gml:Polygon></gml:polygonMember></gml:MultiPolygon></gml:geometryMember></gml:MultiGeometry>

```

### TopoJson

TopoJSON中，点与GeoJSON没有什么区别，线和面都由弧段（arcs）构建，geometries中arcs如果是负值，说明逆序。

TopoJSON格式规范见：

https://github.com/topojson/topojson-specification

##### 简介

TopoJSON是GeoJSON的扩展，对拓扑进行编码。TopoJSON文件中的几何图形不是从离散的角度表示，而是从称为弧段的共享线段中拼合在一起的。Mapshaper和arcgis都采用过这种拓扑格式。

TopoJSON消除了冗余，共享的弧段仅存储一次，允许将相关的几何有效地存储在同一文件中。例如，内蒙古自治区和辽宁省之间的共享边界仅存储一次，而不是在两个省都重复。

单个TopoJSON文件可以包含多层级要素集合，而无需重复，例如省和市。TopoJSON文件可以有效地将多边形（用于填充）和边界（用于描边）表示为共享同一弧形网格的两个要素集合。

为了进一步减小文件大小，TopoJSON可以对整数坐标使用差分向量编码。这类似于舍入坐标值，但是具有更高的效率和对信息丢失的控制。与GeoJSON一样，TopoJSON文件可以在文本编辑器中轻松修改，并且可以进行gzip压缩。

TopoJSON比GeoJSON更加紧凑，即使不进行简化也经常可以压缩80％甚至更多。拓扑编码在地图和可视化方面有许多有用的应用程序。它允许简化保留拓扑的形状，从而确保相邻特征在简化后保持连接；这适用于所有要素集，例如同时一致简化省和市的边界。拓扑还可以用于Dorling或六边形制图，以及其他需要共享边界信息的技术，例如自动地图着色。

TopoJSON支持多种几何类型：Point，LineString，Polygon，MultiPoint，MultiLineString，MultiPolygon和GeometryCollection。

这里有一个转换TopoJson，GeoJson，Shp的网站http://mapshaper.org/；好像不好使

GeoJson和TopopJson在线转换：http://jeffpaine.github.io/geojson-topojson/

现在大多数地图API支持GeoJson和TopoJson格式数据地图的调用（Openlayers、Leaflet等），这些Json文件只记录空间要素的几何属性，数据在前端渲染进行展示。 

##### GeoJson示例

```json
{ "type": "FeatureCollection",
    "features": [
      { "type": "Feature",
        "geometry": {"type": "Point", "coordinates": [102.0, 0.5]},
        "properties": {"prop0": "value0"}
        },
      { "type": "Feature",
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
            ]
          },
        "properties": {
          "prop0": "value0",
          "prop1": 0.0
          }
        },
      { "type": "Feature",
         "geometry": {
           "type": "Polygon",
           "coordinates": [
             [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
               [100.0, 1.0], [100.0, 0.0] ]
             ]
         },
         "properties": {
           "prop0": "value0",
           "prop1": {"this": "that"}
           }
         }
       ]
}

```

#####  转化为TopoJson示例

```json
{
    "type": "Topology",
    "objects": {
        "collection": {
            "type": "GeometryCollection",
            "geometries": [
                {
                    "type": "Point",
                    "coordinates": [
                        4000,
                        5000
                    ]
                },
                {
                    "type": "LineString",
                    "arcs": [
                        0
                    ]
                },
                {
                    "type": "Polygon",
                    "arcs": [
                        [
                            1
                        ]
                    ]
                }
            ]
        }
    },
    "arcs": [
        [
            [
                4000,
                0
            ],
            [
                1999,
                9999
            ],
            [
                2000,
                -9999
            ],
            [
                2000,
                9999
            ]
        ],
        [
            [
                0,
                0
            ],
            [
                2000,
                0
            ],
            [
                0,
                9999
            ],
            [
                -2000,
                0
            ],
            [
                0,
                -9999
            ]
        ]
    ],
    "bbox": [
        100,
        0,
        105,
        1
    ],
    "transform": {
        "scale": [
            0.0005000500050005,
            0.00010001000100010001
        ],
        "translate": [
            100,
            0
        ]
    }
}

```

### SVG

https://www.runoob.com/svg/svg-tutorial.html



### GPX

#### 参考资料

https://blog.csdn.net/qq_24452475/article/details/81024836

https://blog.csdn.net/gdp12315_gu/article/details/51823486

https://www.cyclingroad.cn/5167/.html

https://github.com/placemark/togeojson#readme



#### 简介

	GPX, 或称 GPS exchange 格式, 是一种用于存储坐标数据的 XML 文件格式。它可以储存在一条路上的路点，轨迹，路线，且易于处理和转换到其他格式。OpenStreetMap 使用的所有 GPS 数据要转换为 GPX 格式才能上传。 

#### 格式

![1628562209172](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261331214.png)

#### 示例

```xml
<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.0">
    <name>Example gpx</name>
    <wpt lat="46.57638889" lon="8.89263889">
        <ele>2372</ele>
        <name>LAGORETICO</name>
    </wpt>
    <trk><name>Example gpx</name><number>1</number><trkseg>
        <trkpt lat="46.57608333" lon="8.89241667"><ele>2376</ele><time>2007-10-14T10:09:57Z</time></trkpt>
        <trkpt lat="46.57619444" lon="8.89252778"><ele>2375</ele><time>2007-10-14T10:10:52Z</time></trkpt>
        <trkpt lat="46.57641667" lon="8.89266667"><ele>2372</ele><time>2007-10-14T10:12:39Z</time></trkpt>
        <trkpt lat="46.57650000" lon="8.89280556"><ele>2373</ele><time>2007-10-14T10:13:12Z</time></trkpt>
        <trkpt lat="46.57638889" lon="8.89302778"><ele>2374</ele><time>2007-10-14T10:13:20Z</time></trkpt>
        <trkpt lat="46.57652778" lon="8.89322222"><ele>2375</ele><time>2007-10-14T10:13:48Z</time></trkpt>
        <trkpt lat="46.57661111" lon="8.89344444"><ele>2376</ele><time>2007-10-14T10:14:08Z</time></trkpt>
    </trkseg></trk>
</gpx>

```

### KML

#### 参考资源

https://blog.csdn.net/finemoon/article/details/83361646

https://www.doc88.com/p-540550995801.html

https://blog.csdn.net/weixin_35959554/article/details/102387635

http://blog.sina.com.cn/s/blog_4d92ed8e010008ql.html

#### 简介



#### 标签列表

##### 1.address

**说明**

位置或邮编信息

**语法**

```xml
<address>浙江省杭州市</address>

```

**值域**

代表一个点所在位置或邮政编码的字符串. 

**父元素**

- Placemark>

**子元素**

无

##### 2.altitudeMode

**说明**

**语法**

**值域**

-  clampedToGround 
-  relativeToGround 
-  absolute 

**父元素**

- Point>
- LineString>
- Polygon>

**子元素**

无

##### 3.begin

##### 4.color

**说明**

 单一标签，代表一个32位的16进制颜色值. 

**语法**

```xml
<color>00000000</color>

```

**值域**

 00000000 to ffffffff 

**父元素**

- PolyStyle>
- LineStyle>
- IconStyle>

**子元素**

无

##### 5.coordinates

**说明**

 单一标签，可以是是任何几何形状的子元素，定义每一个点的经度、纬度和高度(按照严格的顺序). 多个点使用空格隔开，经纬度按照WGS84标准. 

**语法**

```xml
<Point>
    <coordinates>-111.661,33.2212,0 </coordinates>
</Point>

```

**值域**

由点的坐标决定，经纬度的单位是度，而高度的单位是米(海拔).

注意:应该按照 经度,纬度,高度 这样的格式和顺序来设置，否则坐标可能会不准确. 

**父元素**

所有几何标签

**子元素**

无

##### 6.description

**说明**

单一标签.提供描述信息.描述显示在用户点击该目录或标注时的弹出窗口中. 

支持纯文本和HTML语法，如果其中包含有效的网址，则Google Earth会自动显示为一个连接T(例如http://www.google.com).而不需要使用任何标签 

如果你使用任何的HTML语法，就必须使用字符实体引用或者CDATA来防止HTML字符如><被当作XML解析。

CDATA元素让KML解析器忽略其内部的特殊字符.按以下方式使用该元素:

`<![CDATA[ special characters here ]]>`

如果你不喜欢使用CDATA元素，你也可以使用实体引用来替换所有的特殊字符. 

**语法**

```xml
<description>
<![CDATA[<a href="http://www.google.com.honeycomb.cs.cornell.edu:8888/">Google Search!</a>]]>
</description>

```

**值域**

	任意字符串
	
	注意: description标签只是支持HTML格式化，并不支持其他的网络性能，比如脚本语言和Iframe. 

**父元素**

- Document>
- Folder>
- NetworkLink>
- GroundOverlay>
- ScreenOverlay>
- Placemark>

**子元素**

无

##### 7.Document

**说明**

kml文档的根元素.同时也是一个目录，可是它不是必需的，如果你的kml文件使用到了schemas和样式表，就一定要使用该标签. 

**语法**

```xml
<Document>
	<Style id="my_style">
    	<Icon>./images/my_image.png </Icon>
    </Style>
. . . .
</Document>

```

**值域**

无

**父元素**

无

**子元素**

- Folder>
- name>
- description>
- LookAt>
- visibility>
- Placemark>
- GroundOverlay>
- ScreenOverlay>
- NetworkLink>
- Document>

##### 8.drawOrder

**说明**

单一标签，是 `<GroundOverlay>`和` <ScreenOverlay>`的子元素. 用来定义当多个图片重叠的时候的摆放顺序.默认值是0，该值大的图片显示将在该值小一些的图片的上面.

**语法**

```xml
<drawOrder>0 </drawOrder>

```

**值域**

 从0到99的范围. 

**父元素**

- GroundOverlay>
- ScreenOverlay>

**子元素**

无

##### 9.east

**说明**

单一标签，是 `<LatLonBox>`.的子元素.指定图片标注右边缘的经度值.

**语法**

```xml
<east>-95.1583 </east>

```

**值域**

由图片标记所描述的实际地理位置决定，经度和纬度以度数表示，而高度则以海拔高度(以米为单位)来表示. 

**父元素**

- LatLonBox>

**子元素**

无

##### 10.end

##### 11.extrude

**说明**

 单一标签，允许对2维的图形如地名标注、路径、多边形进行立体化处理. 

**值域**

以米为单位的extrusion高度值. 

**父元素**

- LineString>
- Polygon>
- Point>

**子元素**

无

##### 12.fill

**说明**

单一标签.指示是否对多边形进行填充. 

**值域**

 0 (不填充)或1. 

**父元素**

- PolyStyle>

**子元素**

无

##### 13.Folder

**说明**

 复合标签.用来对所有的标注进行树形分类. 请看关于目录的介绍获得更多信息. 

**语法**

```xml
<Folder>
    <name>Name of Folder </name>
    <description>Descriptive text </description>
	<Folder>
    	<name>SubFolder #1 Name </name>
        <description>Descriptive text </description>
		<Placemark>
			[placemark data here ...]
        </Placemark>Placemark>
    </Folder>
	<Folder>
        <name>SubFolder #2 Name </name>
        <description>Descriptive text </description>
		<Placemark>
			[placemark data here ...]
        </Placemark>
    </Folder>
</Folder>

```

**值域**

无

**父元素**

- Document>
- Folder>
- NetworkLink>

**子元素**

- Folder>
- name>
- description>
- LookAt>
- visibility>
- Placemark>
- GroundOverlay>
- ScreenOverlay>
- NetworkLink>
- Document>

##### 14.geomColor

**说明**

单一标签.是` <Style>`的子元素. 用来给地理点、线和多边形设置颜色。

注意:颜色被设置后,图标的表面颜色会被` <geomColor>`的颜色值进行multiply(正片叠底)处理. 例如,如果图表颜色是蓝绿色,并且你设置` <geomColor>`为绿黄色,最后显示出来就将会是绿色. 注意这个正片叠底模式, RGB颜色值分别相乘(R*R, G*G, B*B).因此,红色(1, 0, 0)和绿色(0, 1, 0) 最后会生成黑色,因为(1*0, 0*1, 0*0)最后是(0, 0, 0).

**语法**

```xml
<Placemark>
	<Style ID="myIconStyleID">
    	<geomColor>ff640000 </geomColor>
    </Style>
	<Point>
        <coordinates>-122.072408, 37.412161, 6.936751 </coordinates>
    </Point>
    <styleUrl>#myIconStyleID </styleUrl>
	...
</Placemark>

```

**值域**

 16进制表示的颜色，包括透明度的值，顺序是alpha, blue, green, red (ABGR). 

**父元素**

- Style

**子元素**

无

##### 15.GeometryCollection

**说明**

 复合标签，用来组合多个几何形状，例如组合多个多边形用来在Google Earth中描述一个单一的标注. 

**语法**

```xml
<GeometryCollection>
	<Polygon>
		<outerBoundaryIs>
			<LinearRing>
				<coordinates>
                    .....
    			</coordinates>
            </LinearRing>
        </outerBoundaryIs>
    </Polygon>
	<Polygon>
		<outerBoundaryIs>
			<LinearRing>
				<coordinates>
                    .....
                </coordinates>
            </LinearRing>
        </outerBoundaryIs>
    </Polygon>
</GeometryCollection>

```

**值域**

无

**父元素**

- Placemark>

**子元素**

能够包含任何几何形状，包括其它GeometryCollection. 

##### 16.geomScale

**说明**

单一标签.是 `<Style>`的子元素.用这个标签来缩放图标(也就是地理点)和线以改变它们在Google Earth之中的显示大小.

通常，这个标签并不影响多边形，除非多边形使用outline模式，在这个模式下，只有多边形的外轮廓的线有效果. 

**语法**

```xml
<Style id="myPlacemarkID">
    <geomScale>2 </geomScale>
	<labelScale>1.08</labelScale>
    <labelColor>ff08ceff </labelColor>
	<Icon>
        <href>root://icons/.... </href>
    </Icon>
</Style>

```

**值域**

代表缩放到的倍数的小数.例如，默认的图标大小是1而geomScale设置为.5，则设置后图标大小便为原来的一半同样,如果geomScale设置为2则将使图表大小翻倍. 对于线段,这个只代表线宽，默认的线宽是1. 

**父元素**

- Style

**子元素**

无

##### 17.GroundOverlay

**说明**

 复合标签，本标签代表一个地理图片标注. 

**语法**

```xml
<GroundOverlay>
    <visibility>0 </visibility>
	<Icon>
        <href>C:/GoogleEarth/example.jpg </href>
    </Icon>
    <drawOrder>0 </drawOrder>
	<LatLonBox>
        <rotation>36.9994 </rotation>
        <north>39.3082 </north>
        <south>38.5209 </south>
        <east>-95.1583 </east>
        <west>-96.3874 </west>
    </LatLonBox>
</GroundOverlay>

```

**值域**

无

**父元素**

 任何有目录功能的标签. 

**子元素**

- drawOrder>
  `<Icon> `(必需)
  `<LatLonBox> `(必需)
  `<visibility>`
  `<rotation>`

##### 18.h

**说明**

当在用作图标的图片上选择一个区域的时候,h是图片上被提取区域的高度像素值. 

**值域**

 一个整数值，指定图片上被提取区域的高度像素值. 

**父元素**

- Icon>

**子元素**

无

##### 19.heading

**说明**

单一标签.是` <LookAt>`的子元素. 当前视角在水平面上的投影和正北的夹角，下面的例子表现了一个向西的视角.

**语法**

```xml
<heading>-90 </heading>

```

**值域**

 由观测者（视点）方向决定.以度为单位. 

**父元素**

- LookAt>

**子元素**

无

##### 20.href

单一标签.是 `<Icon>`的子元素. 用来指定图片或图标的路径.可以是本地或远程网络服务器的路径.

另外，如果要指定一个的图片做图标，你也可以实现从大图片上截取一块区域作为图标.而且这样将会有更好的性能.

例如,你可能有一张图片，由16个小图片按4X4排列而成，你可以实现引用其中的一每小块图片作为图标，只要你指定该小块图片在整个图片上的的以下四个坐标值:

x、y 坐标,小块区域左上角的像素坐标
w、h 坐标,小块区域的宽度和高度像素值

```xml
<Style id="Example">
	<IconStyle>
		<Icon>
    		<href>example.png </href>
    		<x>128 </x>
    		<y>0 </y>
    		<w>64 </w>
    		<h>64 </h>
    	</Icon>
    </IconStyle>
</Style>

```

**语法**

```xml
<Icon>
    <href>C:/GoogleEarth/example.jpg </href>
</Icon>

```

**值域**

图片路径.

C:/GoogleEarth/example.jpg

如果是网络服务器上的图片，则给出该图片的URL地址:

http://www.keyhole.com/images/nav/navTopLogo.png 

**父元素**

- Icon>

**子元素**

无

##### 21.Icon

**说明**

复合标签，是` <GroundOverlay>`, `<ScreenOverlay>`,和 `<IconStyle>`的子元素. 必需的 `<href>`子元素定义图片或图标的路径. 可以是本地或远程网络服务器的路径.

**值域**

无

**父元素**

- GroundOverlay>
- ScreenOverlay>
- Style

**子元素**

- href>
- x>
- y>
- w>
- h>

##### 22.IconStyle

**说明**

复合标签，是 `<Style>`的子元素并包含` <Icon>`元素. IconStyle指定图标的样式.

**值域**

字符串 

**父元素**

- Style

**子元素**

- Icon>
  `<scale>`

##### 23.innerBoundaryIs

**说明**

 复合标签，定义一个多变形的边. 

**语法**

```xml
<Polygon>
	<innerBoundaryIs>
		<LinearRing>
			<coordinates>
				-88.306534, 30.227852, 0.000000 ...... -88.306534, 30.227852, 0.000000
            </coordinates>
        </LinearRing>
    </innerBoundaryIs>
</Polygon>

```

**值域**

无

**父元素**

- Polygon>

**子元素**

无

##### 24.key

**说明**

单一标签，是 `<Pair>`的子元素.用来定义一个高亮或正常情况下的样式

**语法**

```xml
<StyleMap id="example_style">
	<Pair>
	<key>normal</key>
        <styleUrl>#example_style_off </styleUrl>
    </Pair>
	<Pair>
	<key>highlight</key>
        <styleUrl>#example_style_on </styleUrl>
    </Pair>
</StyleMap>

```

**值域**

 normal代表该标注的正常样式,highlight代表该标注被选中情况下的样式. 

 **父元素**

- Pair>

**子元素**

无

##### 25.labelColor

**说明**

单一标签，用来指定Google Earth之中的标签颜色.在 `<Style>`标签之中使用.

**语法**

```xml
<labelColor>ffff0055 </labelColor>

```

**值域**

 默认值是ffffffff (白色,不透明).可以是16进制的符号并按照aabbggrr(alpha, blue, green, red)排列,其中，透明度是从0(透明)-255(不透明). 要了解更多请查看关于颜色的介绍文章. 

**父元素**

- Style

**子元素**

无

##### 26.latitude

**说明**

单一标签，是 `<LookAt>`的子元素. 指定从-90到90的纬度值.

**语法**

```xml
<latitude>33.3205 </latitude>

```

**值域**

 由视点坐标决定，单位是度. 

**父元素**

- LookAt>

**子元素**

无

##### 27.LatLonBox

**说明**

复合标签，是 `<GroundOverlay>`的子元素.用来指定该图片标注的地理坐标.

**语法**

```xml
<LatLonBox>
    <rotation>36.9994 </rotation>
    <west>-96.3874 </west>
    <east>-95.1583 </east>
    <south>38.5209 </south>
    <north>39.3082 </north>
</LatLonBox>

```

**值域**

无

**父元素**

- GroundOverlay>

**子元素**

- east>
- west>
- north>
- south>
- rotation> (可选)

##### 28.LinearRing

**说明**

复合标签，定义一个闭合的折线，以描述一个多边形. 使用 `<coordinates>`标签说明折线的每一个点的坐标，最后的点将会和第一点连接以使图形闭合.

**语法**

```xml
<Polygon>
	<outerBoundaryIs>
		<LinearRing>
			<coordinates>
				-88.306534, 30.227852, 0.000000 ...... -88.306534, 30.227852, 0.000000
            </coordinates>
        </LinearRing>
    </outerBoundaryIs>
</Polygon>

```

**值域**

无

**父元素**

- Polygon>

**子元素**

无

##### 29.LineString

**说明**

复合标签，用来定义一段折线. 以坐标值字符串的形式定义该折线的轨迹.使用 `<coordinates>`元素来描绘每个点的坐标.

**值域**

无

**父元素**

- Placemark>
- GeometryCollection>

**子元素**

- coordinates>

##### 30.longitude

**说明**

单一标签，是 `<LookAt>`的子元素. 指定从-180到180的经度值.

**语法**

```xml
<longitude>-111.965 </longitude>

```

**值域**

 由视点坐标决定，单位是度. 

**父元素**

- LookAt>

**子元素**

无

##### 31.LookAt

**说明**

 复合标签.为标注或目录定义观测者坐标(视点). 

**语法**

```xml
<LookAt>
    <heading>-0.00895499 </heading>
    <tilt>39.4365 </tilt>
    <range>214.17 </range>
    <latitude>37.3895 </latitude>
    <longitude>-122.086 </longitude>
<LookAt>

```

**值域**

无

**父元素**

- Folder>
- Document>
- Placemark>
- GroundOverlay>

**子元素**

- heading>
- latitude>
- longitude>
- range>

##### 32.name

**说明**

单一标签.用来显示为一个标注的简单名称，或者在 `<Schema>`元素之中代表标示符.

**语法**

```xml
<Folder>
    <name>Favourite Places </name>
	. . .
</Folder>

```

**值域**

 任意字符串 

**父元素**

- Folder>
- Document>
- GroundOverlay>
- Placemark>
- ScreenOverlay>
- Schema>

**子元素**

无

##### 33.NetworkLink

**说明**

复合标签，用来定义一个引用的本地或远程的KML文件.

**语法**

```xml
<NetworkLink>
    <refreshVisibility>0 </refreshVisibility>
    <refreshInterval>121 </refreshInterval>
	<Url>
        <href>//myServer/Googleearth/example.kmlM. </href>
    </Url>
    <visibility>1 </visibility>
    <name>TestNetworkLink </name>
</NetworkLink>

```

**值域**

无

**父元素**

- Folder>
- Document>

**子元素**

- refreshVisibility>
- refreshInterval>
- Url>
- name>
- visibility>

##### 34.north

**说明**

单一标签，是 `<LatLonBox>`的子元素.指定图片标注上边缘的纬度值.

**语法**

```xml
<north>39.3082 </north>

```

**值域**

 由图片标记所描述的实际地理位置决定，经度和纬度以度数表示. 

**父元素**

- LatLonBox>

**子元素**

无

##### 35.ObjArrayField

**说明**

复合标签，是 `<Schema>`的子元素.用来为一个schema对象定义一个字段数组类型. 使用` <type>`元素指定数组中类型的名称.

**值域**

 无

**父元素**

- Schema>

**子元素**

- name>
- type>

##### 36.ObjField

**说明**

复合标签，是 `<Schema>`的子元素.用来为一个schema对象定义一个字段类型.使用 `<type>`元素指定类型的名称.

**值域**

 无

**父元素**

- Schema>

**子元素**

- name>
- type>

##### 37.open

**说明**

 单一标签，指示目录是否默认被展开. 

**值域**

在载入时，如果值为1，则该目录默认会被展开，如果值为1，则默认是闭合的，如果目录包含大量的标注，最好确保目录默认闭合状态. 

**父元素**

- Folder>

**子元素**

无

##### 38.outerBoundaryIs

**说明**

 复合标签，定义一个多边形的各个边.必需. 

**语法**

```xml
<Polygon>
	<outerBoundaryIs>
		<LinearRing>
			<coordinates>
				-88.306534, 30.227852, 0.000000 ...... -88.306534, 30.227852, 0.000000
            </coordinates>
        </LinearRing>
    </outerBoundaryIs>
</Polygon>

```

**值域**

无

**父元素**

- Polygon>

**子元素**

- LinearRing>

##### 39.outline

**说明**

单一标签，只是多边形是否只绘制轮廓 

**值域**

 0 (no outline) or 1. 

**父元素**

- PolyStyle>

**子元素**

无

##### 40.overlayXY

**说明**

单一标签，是 `<ScreenOverlay>`的子元素. 定义标注图片上用来和屏幕坐标对应的一点在图片自身上的坐标. 应该有X和Y两个值和各自的单位(像素(pixels)或比例(fraction)). 例如： 

`<overlayXY x="1" y="1" xunits="fraction" yunits="fraction"/>`代表图片的右上角. 

和 `<screenXY of x="-50" y="0.9" xunits="pixels" yunits="fraction"/>`一起使用, 将会使图片右上角离屏幕右边缘距离为50像素，距离屏幕顶端距离是屏幕高度的10%.

**值域**

x和y能够用以下方式指定:

将图片显示在屏幕的中间:
`<overlayXY x="0.5" y="0.5" xunits="fraction" yunits="fraction"/>`
`<screenXY x="0.5" y="0.5" xunits="fraction" yunits="fraction"/>`

将图片显示在屏幕的左上角:
`<overlayXY x="0" y="1" xunits="fraction" yunits="fraction"/>`
`<screenXY x="0" y="1" xunits="fraction" yunits="fraction"/>`

将图片显示在屏幕的右边:
`<overlayXY x="1" y="1" xunits="fraction" yunits="fraction"/>`
`<screenXY x="1" y="1" xunits="fraction" yunits="fraction"/>`

**父元素**

- ScreenOverlay>

**子元素**

无

##### 41.Pair

**说明**

复合标签，是 `<StyleMap>`的子元素.用力定义一个 名称/值对以便为标注提供多样化的样式支持.

**值域**

无

**父元素**

- StyleMap>

**子元素**

- key>
- styleUrl>

##### 42.parent

**说明**

单一标签，是 `<Schema>`的子元素.指定添加的schema字段所继承的基本类型.

**语法**

```xml
<Schema>
    <name>High School </name>
    <parent>Placemark </parent>
	<SimpleField>
        <name>Address </name>
        <type>wstring </type>
    </SimpleField>
	<SimpleField>
        <name>Average SAT score </name>
        <type>int </type>
    </SimpleField>
</Schema>

```

**值域**

 一个已经存在的KML基本类型，查看KML基本类型获得更多信息. 

**父元素**

- Schema>

**子元素**

无

##### 43.Placemark

**说明**

复合标签.用来描述一个地名标注.例如，可以用来描述一个地理坐标点，坐标必须以[经度,纬度,高度]来指定，而且:

经度: 在-180和180之间
纬度:在-90和90
高度:以米为单位的海拔高度(WGS84). 在地表面下面的点将会自动显示在地表面以上.

另外，你可以为placemark定义一系列其他的元素如视点、名称和描述.

**语法**

```xml
<Placemark>
    <name>Queen Creek </name>
	<LookAt>
        <longitude>-111.634 </longitude>
        <latitude>33.2407 </latitude>
        <range>5571.15 </range>
        <tilt>-0.0129749 </tilt>
        <heading>-0.0651017 </heading>
    </LookAt>
    <visibility>1 </visibility>
    <styleUrl>root://styleMaps#default?iconId=0x300 </styleUrl>
	<Point>
        <coordinates>-111.634,33.2486,413.037 </coordinates>
    </Point>
</Placemark>

```

**值域**

 无

**父元素**

- Folder>
- Document>

**子元素**

- description>
- name>
- Point>
- styleUrl>
- LookAt>
- visibility>

##### 44.Point

**说明**

复合标签.定义地图上一个点的坐标.使用` <coordinates>`指定坐标的位置.

**语法**

```xml
<Point>
    <coordinates>-111.965,33.3217,355.27 </coordinates>
</Point>

```

**值域**

 无

**父元素**

- Placemark>
- GeometryCollection>

**子元素**

- coordinates>

##### 45.Polygon

**说明**

复合标签，在地图上定义一个多边形.默认使用 `<outerBoundaryIs>`来定义各边.

**语法**

```xml
<Polygon>
	<outerBoundaryIs>
		<LinearRing>
			<coordinates>
				-88.306534, 30.227852, 0.000000 ...... -88.306534, 30.227852, 0.000000
            </coordinates>
        </LinearRing>
    </outerBoundaryIs>
</Polygon>

```

**值域**

无

**父元素**

- Placemark>
- GeometryCollection>

**子元素**

- outerBoundaryIs>
- innerBoundaryIs>

##### 46.PolyStyle

**说明**

复合标签.使用在 `<Style>`标签之中，为多边形指定样式

**值域**

无

**父元素**

- Style

**子元素**

- color>
- fill>
- outline>

##### 47.range

**说明**

单一标签，是 `<LookAt>`的子元素.描述当前视点的海拔，以米为单位.

**语法**

```xml
<range>909.907 </range>

```

**值域**

 由视点的位置决定. 

**父元素**

- LookAt>

**子元素**

无

##### 48.refreshInterval

**说明**

 单一标签.用来指定刷新一个网络KML文件或图片标注的时间秒数. 

**语法**

```xml
<NetworkLink>
    <refreshVisibility>0 </refreshVisibility>
    <refreshInterval>121 </refreshInterval>
	<Url>//myServer/GoogleEarth/example.kml</Url>
    <visibility>1 </visibility>
    <name>TestNetworkLink </name>
</NetworkLink>

```

**值域**

 以秒为单位.如果该值大于0，则该项每n秒刷新一次，如果该值小于0，则该项根本不会被加载，如果该值等于0，则该项会被加载一次而不会再被刷新. 

**父元素**

- NetworkLink>
- GroundOverlay>
- ScreenOverlay>

**子元素**

无

##### 49.refreshVisibility

**说明**

单一标签，是 `<NetworkLink>`的子元素.指定网络KML文件被重新加载刷新的时候是否忽略KML文档之中各标注的默认可见性.

**值域**

默认值是0,即忽略KML文档中的默认可见性设置而使所有标注的可见性不变 . 更改为1既可以在每次网络KML文件被刷新之后重新根据KML文件内容设置标注的可见性. 例如，假设有一项在KML文件之中可见性设置为0，而且refreshVisibility设置为1，当文件第一次加载到Google Earth之中的时候，该项是不显示的如果用户通过点击该项的复选框而已经使该项显示出来，这种情况下该网络KML文件被刷新之后，该项又会重新变成不显示.
翻译到这里，我只好感叹又学了一招，我刚才试了一下，果然不错，非常有用。 

**父元素**

- NetworkLink>

**子元素**

无

##### 50.rotation

**说明**

单一标签，是 `<ScreenOverlay>`, `<GroundOverlay>`和 `<LatLonBox>`的子元素.用来指定图片围绕本身中心的旋转角.

**值域**

使用-180~+180的角度值来指定从0度开始的顺时针旋转角.0为默认值(不旋转)

**父元素**

- GroundOverlay>
- ScreenOverlay>
- LatLonBox>

**子元素**

无

##### 51.Schema

**说明**

 复合标签.用来定义一个schema以便让KML理解并不被默认支持的语法.您可以用XML模式定义您自己的语法 

**值域**

无

**父元素**

无

**子元素**

- name>
- parent>
- ObjField>
- ObjArrayField>
- SimpleField>
- SimpleArrayField>

##### 52.scale

**说明**

指定该标注横向、纵向的缩放倍数. 

**值域**

 从0-1的小数. 

**父元素**

- IconStyle>
- LabelStyle>

**子元素**

无

##### 53.ScreenOverlay

**说明**

 复合标签. 本标定义一个屏幕图片标注.将一个图片（以图片本身大小和纵横比）显示在屏幕的正中间的代码如下: 

**语法**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://earth.google.com/kml/2.0">
	<ScreenOverlay id="khScreenOverlay756">
		<description>
        	This screen overlay uses fractional positioning to put the image in the exact center of the screen 
        </description>
        <name>Simple crosshairs </name>
        <visibility>0 </visibility>
		<Icon>
            <href>http://myserver/myimage.jpg </href>
        </Icon>
		<overlayXY x="0.5" y="0.5" xunits="fraction" yunits="fraction"/>
		<screenXY x="0.5" y="0.5" xunits="fraction" yunits="fraction"/>
		<rotationXY x="0.5" y="0.5" xunits="fraction" yunits="fraction"/>
		<size x="0" y="0" xunits="pixels" yunits="pixels"/>
    </ScreenOverlay>
</kml>

```

**值域**

 无

**父元素**

- Folder>
- Document>

**子元素**

- drawOrder>
- Icon> (必需)
- visibility>
- rotation>
- size>
- screenXY>
- overlayXY>

##### 54.screenXY

**说明**

单一标签，是 `<ScreenOverlay>`的子元素. 定义图片标注在屏幕上的绘制位置.例如,screenXY为(-50, .9)并且overlayXY为(1,1)将会使图片右上角离屏幕右边缘距离为50像素，距离屏幕顶端距离是屏幕高度的10%.

**值域**

x和y能够用以下方式指定:

将图片显示在屏幕的中间:
`<overlayXY x="0.5" y="0.5" xunits="fraction" yunits="fraction"/>`
`<screenXY x="0.5" y="0.5" xunits="fraction" yunits="fraction"/>`

将图片显示在屏幕的左上角:
`<overlayXY x="0" y="1" xunits="fraction" yunits="fraction"/>`
`<screenXY x="0" y="1" xunits="fraction" yunits="fraction"/>`

将图片显示在屏幕的右边:
`<overlayXY x="1" y="1" xunits="fraction" yunits="fraction"/>`
`<screenXY x="1" y="1" xunits="fraction" yunits="fraction"/>`

**父元素**

- ScreenOverlay>

**子元素**

无

##### 55.SimpleArrayField

**说明**

复合标签，是 `<Schema>`的子元素.用来定义单个字段类型的数组例如整数数组、浮点数数组或字符串数组.

**值域**

无

**父元素**

- Schema>

**子元素**

- name>
- type>

##### 56.SimpleField

**说明**

复合标签，是 `<Schema>`的子元素.用来定义单个字段类型例如整数、浮点数或字符串.

**语法**

```xml
<SimpleField>
    <name>height </name>
    <type>int </type>
</SimpleField>

```

**值域**

无

**父元素**

- Schema>

**子元素**

- name>
- type>

##### 57.size

**说明**

单一标签，是 `<ScreenOverlay>`.的子元素.用来指定图片的大小.

**值域**

用法如下.

使用图片本身的大小和纵横比,应将值设成0:
`<size x="0" y="0" xunits="fraction" yunits="fraction"/>`

使图片宽度不变，高度变为原来的80%:
`<size x="0" y="0.2" xunits="fraction" yunits="fraction"/>`

强制图片大小为100*500:
`<size x="100" y="500" xunits="pixels" yunits="pixels"/>`

**父元素**

- ScreenOverlay>

**子元素**

无

##### 58.south

**说明**

单一标签，是 `<LatLonBox>`.的子元素.指定图片标注底边缘的纬度值.

**语法**

```xml
<south>38.5209 </south>

```

**值域**

  由图片标记所描述的实际地理位置决定，经度和纬度以度数表示 

**父元素**

- LatLonBox>

**子元素**

无

##### 59.snippet

**说明**

 单一标签，用来显示在Google Earth之中的对description的简短概要. 

**值域**

任意值

**父元素**

- Placemark>

**子元素**

无

##### 60.Style

##### 61.StyleMap

##### 62.styleUrl

##### 63.tessellate

##### 64.tilt

##### 65.TimePeriod

##### 66.TimeInstant

##### 67.timePosition

##### 68.type

##### 69.href

##### 70.Url

##### 71.viewRefreshMode

##### 72.viewRefreshTime

##### 73.visibility

##### 74.w

##### 75.west

##### 76.x

##### 77.y