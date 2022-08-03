参考:

https://www.cnblogs.com/naaoveGIS/p/5508882.html

https://blog.csdn.net/u012599377/article/details/109483079

http://docs.geoserver.org/stable/en/user/services/wfs/index.html

### 1.WFS简介

Web要素服务（WFS）返回的是要素级的GML编码，并提供对要素的增加、修改、删除等事务操作，是对Web地图服务的进一步深入。OGC Web要素服务允许客户端从多个Web要素服务中取得使用地理标记语言（GML）编码的地理空间数据，这个远东定义了五个操作：GetCapabilites返回Web要素服务性能描述文档（用XML描述）；DescribeFeatureType返回描述可以提供服务的任何要素结构的XML文档；GetFeature为一个获取要素实例的请求提供服务；Transaction为事务请求提供服务；LockFeature处理在一个事务期间对一个或多个要素类型实例上锁的请求。

GeoServer官网上对其WFS规范的描述地址为http://docs.geoserver.org/stable/en/user/services/wfs/index.html。

### 2.WFS的好处

 WFS标准定义了一种框架，用于以独立于基础数据源的方式提供对离散地理特征的访问并支持其交易。通过发现，查询，锁定和事务处理操作的组合，用户可以以允许查询，样式设置，编辑（创建，更新和删除）和下载单个功能的方式访问源空间和属性数据。WFS的事务处理功能还支持协作映射应用程序的开发和部署。 

### 3.WFS请求规范

#### 3.1 Exceptions

 WFS还支持多种报告异常的格式。异常报告支持的值为： 

| 格式     | 句法                          | 描述                                                         |
| :------- | :---------------------------- | :----------------------------------------------------------- |
| XML格式  | `exceptions=text/xml`         | *（默认）* XML输出                                           |
| JSON格式 | `exceptions=application/json` | 简单的JSON                                                   |
| JSONP    | `exceptions=text/javascript`  | 以以下形式返回JsonP：parseResponse（…jsonp…）。请参阅[WMS供应商参数](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html#wms-vendor-parameters)以更改回调名称。请注意，默认情况下禁用此格式（请参阅[影响WMS的全局变量](https://docs.geoserver.org/stable/en/user/services/wms/global.html#wms-global-variables)）。 |

#### 3.2 GetCapabilities

 生成描述服务器提供的WFS服务以及有效的WFS操作和参数的元数据文档 

**必填参数**

-  **service**： 服务名称-值为 `WFS` 
-  **version** ： 服务版本-值是当前的版本号。必须提供完整的版本号（“ 1.1.0”，“ 1.0.0”），而不是缩写形式（“ 1”或“ 1.1”）。  
-  **request** ： 操作名称-值为 `GetCapabilities` 

 尽管按照规范在技术上需要上述所有参数，但是如果请求中省略了任何参数，则GeoServer将提供默认值。 

 GetCapabilities响应是一个冗长的XML文档，其格式对于每个受支持的版本都是不同的。GetCapabilities文档中有五个主要组件： 

| 成分                    | 描述                                                         |
| :---------------------- | :----------------------------------------------------------- |
| `ServiceIdentification` | 包含请求的基本标头信息，例如`Title`和`ServiceType`。该`ServiceType`指示的WFS支持哪个版本（S）。 |
| `ServiceProvider`       | 提供有关发布WFS服务的公司的联系信息，包括电话，网站和电子邮件。 |
| `OperationsMetadata`    | 描述WFS服务器支持的操作以及每个操作的参数。可以将WFS服务器配置为不响应上面列出的操作。 |
| `FeatureTypeList`       | 列出WFS服务器发布的功能类型。要素类型以形式列出`namespace:featuretype`。还列出了要素类型的默认投影以及指定投影中数据的边界框。 |
| `Filter_Capabilities`   | 列出可用于形成查询谓词的过滤器或表达式，例如`SpatialOperators`（如`Equals`，`Touches`）和`ComparisonOperators`（如`LessThan`，`GreaterThan`）。筛选器本身未包含在GetCapabilities文档中。 |

##### 示例1 常规

```json
http://localhost:8080/geoserver/wfs?
service=wfs
&version=1.1.0
&request=GetCapabilities
```

使用POST的等效请求：

```xml
<GetCapabilities
 service="WFS"
 xmlns="http://www.opengis.net/wfs"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://www.opengis.net/wfs
 http://schemas.opengis.net/wfs/1.1.0/wfs.xsd"/>
```

**返回结果**

```xml
This XML file does not appear to have any style information associated with it. The document tree is shown below.
<wfs:WFS_Capabilities xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wfs" xmlns:wfs="http://www.opengis.net/wfs" xmlns:ows="http://www.opengis.net/ows" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:cite="http://www.opengeospatial.net/cite" xmlns:tiger="http://www.census.gov" xmlns:nurc="http://www.nurc.nato.int" xmlns:sde="http://geoserver.sf.net" xmlns:it.geosolutions="http://www.geo-solutions.it" xmlns:topp="http://www.openplans.org/topp" xmlns:sf="http://www.openplans.org/spearfish" version="1.1.0" xsi:schemaLocation="http://www.opengis.net/wfs http://localhost:8080/geoserver/schemas/wfs/1.1.0/wfs.xsd" updateSequence="152">
<ows:ServiceIdentification>
<ows:Title>GeoServer Web Feature Service</ows:Title>
<ows:Abstract>This is the reference implementation of WFS 1.0.0 and WFS 1.1.0, supports all WFS operations including Transaction.</ows:Abstract>
<ows:Keywords>
<ows:Keyword>WFS</ows:Keyword>
<ows:Keyword>WMS</ows:Keyword>
<ows:Keyword>GEOSERVER</ows:Keyword>
</ows:Keywords>
<ows:ServiceType>WFS</ows:ServiceType>
<ows:ServiceTypeVersion>1.1.0</ows:ServiceTypeVersion>
<ows:Fees>NONE</ows:Fees>
<ows:AccessConstraints>NONE</ows:AccessConstraints>
</ows:ServiceIdentification>
<ows:ServiceProvider>
<ows:ProviderName>The Ancient Geographers</ows:ProviderName>
<ows:ServiceContact>
<ows:IndividualName>Claudius Ptolomaeus</ows:IndividualName>
<ows:PositionName>Chief Geographer</ows:PositionName>
<ows:ContactInfo>
<ows:Phone>
<ows:Voice/>
<ows:Facsimile/>
</ows:Phone>
<ows:Address>
<ows:DeliveryPoint/>
<ows:City>Alexandria</ows:City>
<ows:AdministrativeArea/>
<ows:PostalCode/>
<ows:Country>Egypt</ows:Country>
<ows:ElectronicMailAddress>claudius.ptolomaeus@gmail.com</ows:ElectronicMailAddress>
</ows:Address>
</ows:ContactInfo>
</ows:ServiceContact>
</ows:ServiceProvider>
<ows:OperationsMetadata>
<ows:Operation name="GetCapabilities">
<ows:DCP>
<ows:HTTP>
<ows:Get xlink:href="http://localhost:8080/geoserver/wfs"/>
<ows:Post xlink:href="http://localhost:8080/geoserver/wfs"/>
</ows:HTTP>
</ows:DCP>
<ows:Parameter name="AcceptVersions">
<ows:Value>1.0.0</ows:Value>
<ows:Value>1.1.0</ows:Value>
</ows:Parameter>
<ows:Parameter name="AcceptFormats">
<ows:Value>text/xml</ows:Value>
</ows:Parameter>
</ows:Operation>
<ows:Operation name="DescribeFeatureType">
<ows:DCP>
<ows:HTTP>
<ows:Get xlink:href="http://localhost:8080/geoserver/wfs"/>
<ows:Post xlink:href="http://localhost:8080/geoserver/wfs"/>
</ows:HTTP>
</ows:DCP>
<ows:Parameter name="outputFormat">
<ows:Value>text/xml; subtype=gml/3.1.1</ows:Value>
</ows:Parameter>
</ows:Operation>
<ows:Operation name="GetFeature">
<ows:DCP>
<ows:HTTP>
<ows:Get xlink:href="http://localhost:8080/geoserver/wfs"/>
<ows:Post xlink:href="http://localhost:8080/geoserver/wfs"/>
</ows:HTTP>
</ows:DCP>
<ows:Parameter name="resultType">
<ows:Value>results</ows:Value>
<ows:Value>hits</ows:Value>
</ows:Parameter>
<ows:Parameter name="outputFormat">
<ows:Value>text/xml; subtype=gml/3.1.1</ows:Value>
<ows:Value>GML2</ows:Value>
<ows:Value>KML</ows:Value>
<ows:Value>SHAPE-ZIP</ows:Value>
<ows:Value>application/gml+xml; version=3.2</ows:Value>
<ows:Value>application/json</ows:Value>
<ows:Value>application/vnd.google-earth.kml xml</ows:Value>
<ows:Value>application/vnd.google-earth.kml+xml</ows:Value>
<ows:Value>csv</ows:Value>
<ows:Value>gml3</ows:Value>
<ows:Value>gml32</ows:Value>
<ows:Value>json</ows:Value>
<ows:Value>text/xml; subtype=gml/2.1.2</ows:Value>
<ows:Value>text/xml; subtype=gml/3.2</ows:Value>
</ows:Parameter>
<ows:Constraint name="LocalTraverseXLinkScope">
<ows:Value>2</ows:Value>
</ows:Constraint>
</ows:Operation>
<ows:Operation name="GetGmlObject">
<ows:DCP>
<ows:HTTP>
<ows:Get xlink:href="http://localhost:8080/geoserver/wfs"/>
<ows:Post xlink:href="http://localhost:8080/geoserver/wfs"/>
</ows:HTTP>
</ows:DCP>
</ows:Operation>
<ows:Operation name="LockFeature">
<ows:DCP>
<ows:HTTP>
<ows:Get xlink:href="http://localhost:8080/geoserver/wfs"/>
<ows:Post xlink:href="http://localhost:8080/geoserver/wfs"/>
</ows:HTTP>
</ows:DCP>
<ows:Parameter name="releaseAction">
<ows:Value>ALL</ows:Value>
<ows:Value>SOME</ows:Value>
</ows:Parameter>
</ows:Operation>
<ows:Operation name="GetFeatureWithLock">
<ows:DCP>
<ows:HTTP>
<ows:Get xlink:href="http://localhost:8080/geoserver/wfs"/>
<ows:Post xlink:href="http://localhost:8080/geoserver/wfs"/>
</ows:HTTP>
</ows:DCP>
<ows:Parameter name="resultType">
<ows:Value>results</ows:Value>
<ows:Value>hits</ows:Value>
</ows:Parameter>
<ows:Parameter name="outputFormat">
<ows:Value>text/xml; subtype=gml/3.1.1</ows:Value>
<ows:Value>GML2</ows:Value>
<ows:Value>KML</ows:Value>
<ows:Value>SHAPE-ZIP</ows:Value>
<ows:Value>application/gml+xml; version=3.2</ows:Value>
<ows:Value>application/json</ows:Value>
<ows:Value>application/vnd.google-earth.kml xml</ows:Value>
<ows:Value>application/vnd.google-earth.kml+xml</ows:Value>
<ows:Value>csv</ows:Value>
<ows:Value>gml3</ows:Value>
<ows:Value>gml32</ows:Value>
<ows:Value>json</ows:Value>
<ows:Value>text/xml; subtype=gml/2.1.2</ows:Value>
<ows:Value>text/xml; subtype=gml/3.2</ows:Value>
</ows:Parameter>
</ows:Operation>
<ows:Operation name="Transaction">
<ows:DCP>
<ows:HTTP>
<ows:Get xlink:href="http://localhost:8080/geoserver/wfs"/>
<ows:Post xlink:href="http://localhost:8080/geoserver/wfs"/>
</ows:HTTP>
</ows:DCP>
<ows:Parameter name="inputFormat">
<ows:Value>text/xml; subtype=gml/3.1.1</ows:Value>
</ows:Parameter>
<ows:Parameter name="idgen">
<ows:Value>GenerateNew</ows:Value>
<ows:Value>UseExisting</ows:Value>
<ows:Value>ReplaceDuplicate</ows:Value>
</ows:Parameter>
<ows:Parameter name="releaseAction">
<ows:Value>ALL</ows:Value>
<ows:Value>SOME</ows:Value>
</ows:Parameter>
</ows:Operation>
</ows:OperationsMetadata>
<FeatureTypeList>
<Operations>
<Operation>Query</Operation>
<Operation>Insert</Operation>
<Operation>Update</Operation>
<Operation>Delete</Operation>
<Operation>Lock</Operation>
</Operations>
<FeatureType xmlns:tiger="http://www.census.gov">
<Name>tiger:poly_landmarks</Name>
<Title>Manhattan (NY) landmarks</Title>
<Abstract>Manhattan landmarks, identifies water, lakes, parks, interesting buildilngs</Abstract>
<ows:Keywords>
<ows:Keyword>landmarks</ows:Keyword>
<ows:Keyword>DS_poly_landmarks</ows:Keyword>
<ows:Keyword>manhattan</ows:Keyword>
<ows:Keyword>poly_landmarks</ows:Keyword>
</ows:Keywords>
<DefaultSRS>urn:x-ogc:def:crs:EPSG:4326</DefaultSRS>
<ows:WGS84BoundingBox>
<ows:LowerCorner>-74.047185 40.679648</ows:LowerCorner>
<ows:UpperCorner>-73.90782 40.882078</ows:UpperCorner>
</ows:WGS84BoundingBox>
</FeatureType>
<FeatureType xmlns:tiger="http://www.census.gov">
<Name>tiger:poi</Name>
<Title>Manhattan (NY) points of interest</Title>
<Abstract>Points of interest in New York, New York (on Manhattan). One of the attributes contains the name of a file with a picture of the point of interest.</Abstract>
<ows:Keywords>
<ows:Keyword>poi</ows:Keyword>
<ows:Keyword>Manhattan</ows:Keyword>
<ows:Keyword>DS_poi</ows:Keyword>
<ows:Keyword>points_of_interest</ows:Keyword>
</ows:Keywords>
<DefaultSRS>urn:x-ogc:def:crs:EPSG:4326</DefaultSRS>
<ows:WGS84BoundingBox>
<ows:LowerCorner>-74.0118315772888 40.70754683896324</ows:LowerCorner>
<ows:UpperCorner>-74.00857344353275 40.711945649065406</ows:UpperCorner>
</ows:WGS84BoundingBox>
</FeatureType>
<FeatureType xmlns:tiger="http://www.census.gov">
<Name>tiger:tiger_roads</Name>
<Title>Manhattan (NY) roads</Title>
<Abstract>Highly simplified road layout of Manhattan in New York..</Abstract>
<ows:Keywords>
<ows:Keyword>DS_tiger_roads</ows:Keyword>
<ows:Keyword>tiger_roads</ows:Keyword>
<ows:Keyword>roads</ows:Keyword>
</ows:Keywords>
<DefaultSRS>urn:x-ogc:def:crs:EPSG:4326</DefaultSRS>
<ows:WGS84BoundingBox>
<ows:LowerCorner>-74.02722 40.684221</ows:LowerCorner>
<ows:UpperCorner>-73.907005 40.878178</ows:UpperCorner>
</ows:WGS84BoundingBox>
</FeatureType>
<FeatureType xmlns:sf="http://www.openplans.org/spearfish">
<Name>sf:archsites</Name>
<Title>Spearfish archeological sites</Title>
<Abstract>Sample data from GRASS, archeological sites location, Spearfish, South Dakota, USA</Abstract>
<ows:Keywords>
<ows:Keyword>archsites</ows:Keyword>
<ows:Keyword>spearfish</ows:Keyword>
<ows:Keyword>sfArchsites</ows:Keyword>
<ows:Keyword>archeology</ows:Keyword>
</ows:Keywords>
<DefaultSRS>urn:x-ogc:def:crs:EPSG:26713</DefaultSRS>
<ows:WGS84BoundingBox>
<ows:LowerCorner>-103.8725637911543 44.37740330855979</ows:LowerCorner>
<ows:UpperCorner>-103.63794182141925 44.48804280772808</ows:UpperCorner>
</ows:WGS84BoundingBox>
</FeatureType>
<FeatureType xmlns:sf="http://www.openplans.org/spearfish">
<Name>sf:bugsites</Name>
<Title>Spearfish bug locations</Title>
<Abstract>Sample data from GRASS, bug sites location, Spearfish, South Dakota, USA</Abstract>
<ows:Keywords>
<ows:Keyword>spearfish</ows:Keyword>
<ows:Keyword>sfBugsites</ows:Keyword>
<ows:Keyword>insects</ows:Keyword>
<ows:Keyword>bugsites</ows:Keyword>
<ows:Keyword>tiger_beetles</ows:Keyword>
</ows:Keywords>
<DefaultSRS>urn:x-ogc:def:crs:EPSG:26713</DefaultSRS>
<ows:WGS84BoundingBox>
<ows:LowerCorner>-103.86796131703647 44.373938816704396</ows:LowerCorner>
<ows:UpperCorner>-103.63773523234195 44.43418821380063</ows:UpperCorner>
</ows:WGS84BoundingBox>
</FeatureType>
<FeatureType xmlns:sf="http://www.openplans.org/spearfish">
<Name>sf:restricted</Name>
<Title>Spearfish restricted areas</Title>
<Abstract>Sample data from GRASS, restricted areas, Spearfish, South Dakota, USA</Abstract>
<ows:Keywords>
<ows:Keyword>spearfish</ows:Keyword>
<ows:Keyword>restricted</ows:Keyword>
<ows:Keyword>areas</ows:Keyword>
<ows:Keyword>sfRestricted</ows:Keyword>
</ows:Keywords>
<DefaultSRS>urn:x-ogc:def:crs:EPSG:26713</DefaultSRS>
<ows:WGS84BoundingBox>
<ows:LowerCorner>-103.85057172920756 44.39436387625042</ows:LowerCorner>
<ows:UpperCorner>-103.74741494853805 44.48215752041131</ows:UpperCorner>
</ows:WGS84BoundingBox>
</FeatureType>
<FeatureType xmlns:sf="http://www.openplans.org/spearfish">
<Name>sf:roads</Name>
<Title>Spearfish roads</Title>
<Abstract>Sample data from GRASS, road layout, Spearfish, South Dakota, USA</Abstract>
<ows:Keywords>
<ows:Keyword>sfRoads</ows:Keyword>
<ows:Keyword>spearfish</ows:Keyword>
<ows:Keyword>roads</ows:Keyword>
</ows:Keywords>
<DefaultSRS>urn:x-ogc:def:crs:EPSG:26713</DefaultSRS>
<ows:WGS84BoundingBox>
<ows:LowerCorner>-103.87741691493184 44.37087275281798</ows:LowerCorner>
<ows:UpperCorner>-103.62231404880659 44.50015918338962</ows:UpperCorner>
</ows:WGS84BoundingBox>
</FeatureType>
<FeatureType xmlns:sf="http://www.openplans.org/spearfish">
<Name>sf:streams</Name>
<Title>Spearfish streams</Title>
<Abstract>Sample data from GRASS, streams, Spearfish, South Dakota, USA</Abstract>
<ows:Keywords>
<ows:Keyword>spearfish</ows:Keyword>
<ows:Keyword>sfStreams</ows:Keyword>
<ows:Keyword>streams</ows:Keyword>
</ows:Keywords>
<DefaultSRS>urn:x-ogc:def:crs:EPSG:26713</DefaultSRS>
<ows:WGS84BoundingBox>
<ows:LowerCorner>-103.87789019829768 44.372335260095554</ows:LowerCorner>
<ows:UpperCorner>-103.62287788915457 44.502218486214815</ows:UpperCorner>
</ows:WGS84BoundingBox>
</FeatureType>
<FeatureType xmlns:topp="http://www.openplans.org/topp">
<Name>topp:tasmania_cities</Name>
<Title>Tasmania cities</Title>
<Abstract>Cities in Tasmania (actually, just the capital)</Abstract>
<ows:Keywords>
<ows:Keyword>cities</ows:Keyword>
<ows:Keyword>Tasmania</ows:Keyword>
</ows:Keywords>
<DefaultSRS>urn:x-ogc:def:crs:EPSG:4326</DefaultSRS>
<ows:WGS84BoundingBox>
<ows:LowerCorner>145.19754 -43.423512</ows:LowerCorner>
<ows:UpperCorner>148.27298000000002 -40.852802</ows:UpperCorner>
</ows:WGS84BoundingBox>
</FeatureType>
<FeatureType xmlns:topp="http://www.openplans.org/topp">
<Name>topp:tasmania_roads</Name>
<Title>Tasmania roads</Title>
<Abstract>Main Tasmania roads</Abstract>
<ows:Keywords>
<ows:Keyword>Roads</ows:Keyword>
<ows:Keyword>Tasmania</ows:Keyword>
</ows:Keywords>
<DefaultSRS>urn:x-ogc:def:crs:EPSG:4326</DefaultSRS>
<ows:WGS84BoundingBox>
<ows:LowerCorner>145.19754 -43.423512</ows:LowerCorner>
<ows:UpperCorner>148.27298000000002 -40.852802</ows:UpperCorner>
</ows:WGS84BoundingBox>
</FeatureType>
<FeatureType xmlns:topp="http://www.openplans.org/topp">
<Name>topp:tasmania_state_boundaries</Name>
<Title>Tasmania state boundaries</Title>
<Abstract>Tasmania state boundaries</Abstract>
<ows:Keywords>
<ows:Keyword>boundaries</ows:Keyword>
<ows:Keyword>tasmania_state_boundaries</ows:Keyword>
<ows:Keyword>Tasmania</ows:Keyword>
</ows:Keywords>
<DefaultSRS>urn:x-ogc:def:crs:EPSG:4326</DefaultSRS>
<ows:WGS84BoundingBox>
<ows:LowerCorner>143.83482400000003 -43.648056</ows:LowerCorner>
<ows:UpperCorner>148.47914100000003 -39.573891</ows:UpperCorner>
</ows:WGS84BoundingBox>
</FeatureType>
<FeatureType xmlns:topp="http://www.openplans.org/topp">
<Name>topp:tasmania_water_bodies</Name>
<Title>Tasmania water bodies</Title>
<Abstract>Tasmania water bodies</Abstract>
<ows:Keywords>
<ows:Keyword>Lakes</ows:Keyword>
<ows:Keyword>Bodies</ows:Keyword>
<ows:Keyword>Australia</ows:Keyword>
<ows:Keyword>Water</ows:Keyword>
<ows:Keyword>Tasmania</ows:Keyword>
</ows:Keywords>
<DefaultSRS>urn:x-ogc:def:crs:EPSG:4326</DefaultSRS>
<ows:WGS84BoundingBox>
<ows:LowerCorner>145.97161899999998 -43.031944</ows:LowerCorner>
<ows:UpperCorner>147.219696 -41.775558</ows:UpperCorner>
</ows:WGS84BoundingBox>
</FeatureType>
<FeatureType xmlns:topp="http://www.openplans.org/topp">
<Name>topp:states</Name>
<Title>USA Population</Title>
<Abstract>This is some census data on the states.</Abstract>
<ows:Keywords>
<ows:Keyword>census</ows:Keyword>
<ows:Keyword>united</ows:Keyword>
<ows:Keyword>boundaries</ows:Keyword>
<ows:Keyword>state</ows:Keyword>
<ows:Keyword>states</ows:Keyword>
</ows:Keywords>
<DefaultSRS>urn:x-ogc:def:crs:EPSG:4326</DefaultSRS>
<ows:WGS84BoundingBox>
<ows:LowerCorner>-124.731422 24.955967</ows:LowerCorner>
<ows:UpperCorner>-66.969849 49.371735</ows:UpperCorner>
</ows:WGS84BoundingBox>
</FeatureType>
<FeatureType xmlns:tiger="http://www.census.gov">
<Name>tiger:giant_polygon</Name>
<Title>World rectangle</Title>
<Abstract>A simple rectangular polygon covering most of the world, it's only used for the purpose of providing a background (WMS bgcolor could be used instead)</Abstract>
<ows:Keywords>
<ows:Keyword>DS_giant_polygon</ows:Keyword>
<ows:Keyword>giant_polygon</ows:Keyword>
</ows:Keywords>
<DefaultSRS>urn:x-ogc:def:crs:EPSG:4326</DefaultSRS>
<ows:WGS84BoundingBox>
<ows:LowerCorner>-180.0 -90.0</ows:LowerCorner>
<ows:UpperCorner>180.0 90.0</ows:UpperCorner>
</ows:WGS84BoundingBox>
</FeatureType>
</FeatureTypeList>
<ogc:Filter_Capabilities>
<ogc:Spatial_Capabilities>
<ogc:GeometryOperands>
<ogc:GeometryOperand>gml:Envelope</ogc:GeometryOperand>
<ogc:GeometryOperand>gml:Point</ogc:GeometryOperand>
<ogc:GeometryOperand>gml:LineString</ogc:GeometryOperand>
<ogc:GeometryOperand>gml:Polygon</ogc:GeometryOperand>
</ogc:GeometryOperands>
<ogc:SpatialOperators>
<ogc:SpatialOperator name="Disjoint"/>
<ogc:SpatialOperator name="Equals"/>
<ogc:SpatialOperator name="DWithin"/>
<ogc:SpatialOperator name="Beyond"/>
<ogc:SpatialOperator name="Intersects"/>
<ogc:SpatialOperator name="Touches"/>
<ogc:SpatialOperator name="Crosses"/>
<ogc:SpatialOperator name="Within"/>
<ogc:SpatialOperator name="Contains"/>
<ogc:SpatialOperator name="Overlaps"/>
<ogc:SpatialOperator name="BBOX"/>
</ogc:SpatialOperators>
</ogc:Spatial_Capabilities>
<ogc:Scalar_Capabilities>
<ogc:LogicalOperators/>
<ogc:ComparisonOperators>
<ogc:ComparisonOperator>LessThan</ogc:ComparisonOperator>
<ogc:ComparisonOperator>GreaterThan</ogc:ComparisonOperator>
<ogc:ComparisonOperator>LessThanEqualTo</ogc:ComparisonOperator>
<ogc:ComparisonOperator>GreaterThanEqualTo</ogc:ComparisonOperator>
<ogc:ComparisonOperator>EqualTo</ogc:ComparisonOperator>
<ogc:ComparisonOperator>NotEqualTo</ogc:ComparisonOperator>
<ogc:ComparisonOperator>Like</ogc:ComparisonOperator>
<ogc:ComparisonOperator>Between</ogc:ComparisonOperator>
<ogc:ComparisonOperator>NullCheck</ogc:ComparisonOperator>
</ogc:ComparisonOperators>
<ogc:ArithmeticOperators>
<ogc:SimpleArithmetic/>
<ogc:Functions>
<ogc:FunctionNames>
<ogc:FunctionName nArgs="1">abs</ogc:FunctionName>
<ogc:FunctionName nArgs="1">abs_2</ogc:FunctionName>
<ogc:FunctionName nArgs="1">abs_3</ogc:FunctionName>
<ogc:FunctionName nArgs="1">abs_4</ogc:FunctionName>
<ogc:FunctionName nArgs="1">acos</ogc:FunctionName>
<ogc:FunctionName nArgs="2">AddCoverages</ogc:FunctionName>
<ogc:FunctionName nArgs="-1">Affine</ogc:FunctionName>
<ogc:FunctionName nArgs="-2">Aggregate</ogc:FunctionName>
<ogc:FunctionName nArgs="1">Area</ogc:FunctionName>
<ogc:FunctionName nArgs="1">area2</ogc:FunctionName>
<ogc:FunctionName nArgs="3">AreaGrid</ogc:FunctionName>
<ogc:FunctionName nArgs="1">asin</ogc:FunctionName>
<ogc:FunctionName nArgs="1">atan</ogc:FunctionName>
<ogc:FunctionName nArgs="2">atan2</ogc:FunctionName>
<ogc:FunctionName nArgs="1">attributeCount</ogc:FunctionName>
<ogc:FunctionName nArgs="-1">BandMerge</ogc:FunctionName>
<ogc:FunctionName nArgs="-2">BandSelect</ogc:FunctionName>
<ogc:FunctionName nArgs="-6">BarnesSurface</ogc:FunctionName>
<ogc:FunctionName nArgs="3">between</ogc:FunctionName>
<ogc:FunctionName nArgs="1">boundary</ogc:FunctionName>
<ogc:FunctionName nArgs="1">boundaryDimension</ogc:FunctionName>
<ogc:FunctionName nArgs="1">Bounds</ogc:FunctionName>
<ogc:FunctionName nArgs="2">buffer</ogc:FunctionName>
<ogc:FunctionName nArgs="-2">BufferFeatureCollection</ogc:FunctionName>
<ogc:FunctionName nArgs="3">bufferWithSegments</ogc:FunctionName>
<ogc:FunctionName nArgs="7">Categorize</ogc:FunctionName>
<ogc:FunctionName nArgs="1">ceil</ogc:FunctionName>
<ogc:FunctionName nArgs="1">centroid</ogc:FunctionName>
<ogc:FunctionName nArgs="2">classify</ogc:FunctionName>
<ogc:FunctionName nArgs="-2">ClassifyByRange</ogc:FunctionName>
<ogc:FunctionName nArgs="-2">Clip</ogc:FunctionName>
<ogc:FunctionName nArgs="1">CollectGeometries</ogc:FunctionName>
<ogc:FunctionName nArgs="1">Collection_Average</ogc:FunctionName>
<ogc:FunctionName nArgs="1">Collection_Bounds</ogc:FunctionName>
<ogc:FunctionName nArgs="0">Collection_Count</ogc:FunctionName>
<ogc:FunctionName nArgs="1">Collection_Max</ogc:FunctionName>
<ogc:FunctionName nArgs="1">Collection_Median</ogc:FunctionName>
<ogc:FunctionName nArgs="1">Collection_Min</ogc:FunctionName>
<ogc:FunctionName nArgs="1">Collection_Nearest</ogc:FunctionName>
<ogc:FunctionName nArgs="1">Collection_Sum</ogc:FunctionName>
<ogc:FunctionName nArgs="1">Collection_Unique</ogc:FunctionName>
<ogc:FunctionName nArgs="-2">Concatenate</ogc:FunctionName>
<ogc:FunctionName nArgs="2">contains</ogc:FunctionName>
<ogc:FunctionName nArgs="-1">Contour</ogc:FunctionName>
<ogc:FunctionName nArgs="-1">contrast</ogc:FunctionName>
<ogc:FunctionName nArgs="2">convert</ogc:FunctionName>
<ogc:FunctionName nArgs="1">convexHull</ogc:FunctionName>
<ogc:FunctionName nArgs="-1">ConvolveCoverage</ogc:FunctionName>
<ogc:FunctionName nArgs="1">cos</ogc:FunctionName>
<ogc:FunctionName nArgs="1">Count</ogc:FunctionName>
<ogc:FunctionName nArgs="-1">CoverageClassStats</ogc:FunctionName>
<ogc:FunctionName nArgs="2">CropCoverage</ogc:FunctionName>
<ogc:FunctionName nArgs="2">crosses</ogc:FunctionName>
<ogc:FunctionName nArgs="-2">darken</ogc:FunctionName>
<ogc:FunctionName nArgs="2">dateFormat</ogc:FunctionName>
<ogc:FunctionName nArgs="2">dateParse</ogc:FunctionName>
<ogc:FunctionName nArgs="-2">desaturate</ogc:FunctionName>
<ogc:FunctionName nArgs="2">difference</ogc:FunctionName>
<ogc:FunctionName nArgs="1">dimension</ogc:FunctionName>
<ogc:FunctionName nArgs="2">disjoint</ogc:FunctionName>
<ogc:FunctionName nArgs="2">disjoint3D</ogc:FunctionName>
<ogc:FunctionName nArgs="2">distance</ogc:FunctionName>
<ogc:FunctionName nArgs="2">distance3D</ogc:FunctionName>
<ogc:FunctionName nArgs="1">double2bool</ogc:FunctionName>
<ogc:FunctionName nArgs="1">endAngle</ogc:FunctionName>
<ogc:FunctionName nArgs="1">endPoint</ogc:FunctionName>
<ogc:FunctionName nArgs="1">env</ogc:FunctionName>
<ogc:FunctionName nArgs="1">envelope</ogc:FunctionName>
<ogc:FunctionName nArgs="2">EqualInterval</ogc:FunctionName>
<ogc:FunctionName nArgs="2">equalsExact</ogc:FunctionName>
<ogc:FunctionName nArgs="3">equalsExactTolerance</ogc:FunctionName>
<ogc:FunctionName nArgs="2">equalTo</ogc:FunctionName>
<ogc:FunctionName nArgs="1">exp</ogc:FunctionName>
<ogc:FunctionName nArgs="1">exteriorRing</ogc:FunctionName>
<ogc:FunctionName nArgs="3">Feature</ogc:FunctionName>
<ogc:FunctionName nArgs="-2">FeatureClassStats</ogc:FunctionName>
<ogc:FunctionName nArgs="1">floor</ogc:FunctionName>
<ogc:FunctionName nArgs="0">geometry</ogc:FunctionName>
<ogc:FunctionName nArgs="1">geometryType</ogc:FunctionName>
<ogc:FunctionName nArgs="1">geomFromWKT</ogc:FunctionName>
<ogc:FunctionName nArgs="1">geomLength</ogc:FunctionName>
<ogc:FunctionName nArgs="2">getGeometryN</ogc:FunctionName>
<ogc:FunctionName nArgs="1">getX</ogc:FunctionName>
<ogc:FunctionName nArgs="1">getY</ogc:FunctionName>
<ogc:FunctionName nArgs="1">getz</ogc:FunctionName>
<ogc:FunctionName nArgs="1">grayscale</ogc:FunctionName>
<ogc:FunctionName nArgs="2">greaterEqualThan</ogc:FunctionName>
<ogc:FunctionName nArgs="2">greaterThan</ogc:FunctionName>
<ogc:FunctionName nArgs="-3">Grid</ogc:FunctionName>
<ogc:FunctionName nArgs="-5">Heatmap</ogc:FunctionName>
<ogc:FunctionName nArgs="3">hsl</ogc:FunctionName>
<ogc:FunctionName nArgs="0">id</ogc:FunctionName>
<ogc:FunctionName nArgs="2">IEEEremainder</ogc:FunctionName>
<ogc:FunctionName nArgs="3">if_then_else</ogc:FunctionName>
<ogc:FunctionName nArgs="-2">in</ogc:FunctionName>
<ogc:FunctionName nArgs="11">in10</ogc:FunctionName>
<ogc:FunctionName nArgs="3">in2</ogc:FunctionName>
<ogc:FunctionName nArgs="4">in3</ogc:FunctionName>
<ogc:FunctionName nArgs="5">in4</ogc:FunctionName>
<ogc:FunctionName nArgs="6">in5</ogc:FunctionName>
<ogc:FunctionName nArgs="7">in6</ogc:FunctionName>
<ogc:FunctionName nArgs="8">in7</ogc:FunctionName>
<ogc:FunctionName nArgs="9">in8</ogc:FunctionName>
<ogc:FunctionName nArgs="10">in9</ogc:FunctionName>
<ogc:FunctionName nArgs="2">InclusionFeatureCollection</ogc:FunctionName>
<ogc:FunctionName nArgs="1">int2bbool</ogc:FunctionName>
<ogc:FunctionName nArgs="1">int2ddouble</ogc:FunctionName>
<ogc:FunctionName nArgs="1">interiorPoint</ogc:FunctionName>
<ogc:FunctionName nArgs="2">interiorRingN</ogc:FunctionName>
<ogc:FunctionName nArgs="-5">Interpolate</ogc:FunctionName>
<ogc:FunctionName nArgs="2">intersection</ogc:FunctionName>
<ogc:FunctionName nArgs="-2">IntersectionFeatureCollection</ogc:FunctionName>
<ogc:FunctionName nArgs="2">intersects</ogc:FunctionName>
<ogc:FunctionName nArgs="2">intersects3D</ogc:FunctionName>
<ogc:FunctionName nArgs="1">isClosed</ogc:FunctionName>
<ogc:FunctionName nArgs="0">isCoverage</ogc:FunctionName>
<ogc:FunctionName nArgs="1">isEmpty</ogc:FunctionName>
<ogc:FunctionName nArgs="1">isInstanceOf</ogc:FunctionName>
<ogc:FunctionName nArgs="2">isLike</ogc:FunctionName>
<ogc:FunctionName nArgs="1">isNull</ogc:FunctionName>
<ogc:FunctionName nArgs="2">isometric</ogc:FunctionName>
<ogc:FunctionName nArgs="1">isRing</ogc:FunctionName>
<ogc:FunctionName nArgs="1">isSimple</ogc:FunctionName>
<ogc:FunctionName nArgs="1">isValid</ogc:FunctionName>
<ogc:FunctionName nArgs="3">isWithinDistance</ogc:FunctionName>
<ogc:FunctionName nArgs="3">isWithinDistance3D</ogc:FunctionName>
<ogc:FunctionName nArgs="2">Jenks</ogc:FunctionName>
<ogc:FunctionName nArgs="1">length</ogc:FunctionName>
<ogc:FunctionName nArgs="2">lessEqualThan</ogc:FunctionName>
<ogc:FunctionName nArgs="2">lessThan</ogc:FunctionName>
<ogc:FunctionName nArgs="-2">lighten</ogc:FunctionName>
<ogc:FunctionName nArgs="-1">list</ogc:FunctionName>
<ogc:FunctionName nArgs="2">listMultiply</ogc:FunctionName>
<ogc:FunctionName nArgs="1">log</ogc:FunctionName>
<ogc:FunctionName nArgs="4">LRSGeocode</ogc:FunctionName>
<ogc:FunctionName nArgs="-4">LRSMeasure</ogc:FunctionName>
<ogc:FunctionName nArgs="5">LRSSegment</ogc:FunctionName>
<ogc:FunctionName nArgs="2">max</ogc:FunctionName>
<ogc:FunctionName nArgs="2">max_2</ogc:FunctionName>
<ogc:FunctionName nArgs="2">max_3</ogc:FunctionName>
<ogc:FunctionName nArgs="2">max_4</ogc:FunctionName>
<ogc:FunctionName nArgs="2">min</ogc:FunctionName>
<ogc:FunctionName nArgs="2">min_2</ogc:FunctionName>
<ogc:FunctionName nArgs="2">min_3</ogc:FunctionName>
<ogc:FunctionName nArgs="2">min_4</ogc:FunctionName>
<ogc:FunctionName nArgs="1">mincircle</ogc:FunctionName>
<ogc:FunctionName nArgs="1">minimumdiameter</ogc:FunctionName>
<ogc:FunctionName nArgs="1">minrectangle</ogc:FunctionName>
<ogc:FunctionName nArgs="3">mix</ogc:FunctionName>
<ogc:FunctionName nArgs="2">modulo</ogc:FunctionName>
<ogc:FunctionName nArgs="2">MultiplyCoverages</ogc:FunctionName>
<ogc:FunctionName nArgs="-2">Nearest</ogc:FunctionName>
<ogc:FunctionName nArgs="1">NormalizeCoverage</ogc:FunctionName>
<ogc:FunctionName nArgs="1">not</ogc:FunctionName>
<ogc:FunctionName nArgs="2">notEqualTo</ogc:FunctionName>
<ogc:FunctionName nArgs="-2">numberFormat</ogc:FunctionName>
<ogc:FunctionName nArgs="5">numberFormat2</ogc:FunctionName>
<ogc:FunctionName nArgs="1">numGeometries</ogc:FunctionName>
<ogc:FunctionName nArgs="1">numInteriorRing</ogc:FunctionName>
<ogc:FunctionName nArgs="1">numPoints</ogc:FunctionName>
<ogc:FunctionName nArgs="1">octagonalenvelope</ogc:FunctionName>
<ogc:FunctionName nArgs="3">offset</ogc:FunctionName>
<ogc:FunctionName nArgs="2">overlaps</ogc:FunctionName>
<ogc:FunctionName nArgs="-1">parameter</ogc:FunctionName>
<ogc:FunctionName nArgs="1">parseBoolean</ogc:FunctionName>
<ogc:FunctionName nArgs="1">parseDouble</ogc:FunctionName>
<ogc:FunctionName nArgs="1">parseInt</ogc:FunctionName>
<ogc:FunctionName nArgs="1">parseLong</ogc:FunctionName>
<ogc:FunctionName nArgs="0">pi</ogc:FunctionName>
<ogc:FunctionName nArgs="-1">PointBuffers</ogc:FunctionName>
<ogc:FunctionName nArgs="2">pointN</ogc:FunctionName>
<ogc:FunctionName nArgs="-7">PointStacker</ogc:FunctionName>
<ogc:FunctionName nArgs="-1">PolygonExtraction</ogc:FunctionName>
<ogc:FunctionName nArgs="2">pow</ogc:FunctionName>
<ogc:FunctionName nArgs="1">property</ogc:FunctionName>
<ogc:FunctionName nArgs="1">PropertyExists</ogc:FunctionName>
<ogc:FunctionName nArgs="2">Quantile</ogc:FunctionName>
<ogc:FunctionName nArgs="-1">Query</ogc:FunctionName>
<ogc:FunctionName nArgs="0">random</ogc:FunctionName>
<ogc:FunctionName nArgs="-1">RangeLookup</ogc:FunctionName>
<ogc:FunctionName nArgs="-1">RasterAsPointCollection</ogc:FunctionName>
<ogc:FunctionName nArgs="-2">RasterZonalStatistics</ogc:FunctionName>
<ogc:FunctionName nArgs="-6">RasterZonalStatistics2</ogc:FunctionName>
<ogc:FunctionName nArgs="5">Recode</ogc:FunctionName>
<ogc:FunctionName nArgs="-2">RectangularClip</ogc:FunctionName>
<ogc:FunctionName nArgs="2">relate</ogc:FunctionName>
<ogc:FunctionName nArgs="3">relatePattern</ogc:FunctionName>
<ogc:FunctionName nArgs="-1">Reproject</ogc:FunctionName>
<ogc:FunctionName nArgs="-3">rescaleToPixels</ogc:FunctionName>
<ogc:FunctionName nArgs="1">rint</ogc:FunctionName>
<ogc:FunctionName nArgs="1">round</ogc:FunctionName>
<ogc:FunctionName nArgs="1">round_2</ogc:FunctionName>
<ogc:FunctionName nArgs="1">roundDouble</ogc:FunctionName>
<ogc:FunctionName nArgs="-2">saturate</ogc:FunctionName>
<ogc:FunctionName nArgs="-5">ScaleCoverage</ogc:FunctionName>
<ogc:FunctionName nArgs="2">setCRS</ogc:FunctionName>
<ogc:FunctionName nArgs="2">shade</ogc:FunctionName>
<ogc:FunctionName nArgs="3">Simplify</ogc:FunctionName>
<ogc:FunctionName nArgs="1">sin</ogc:FunctionName>
<ogc:FunctionName nArgs="-2">Snap</ogc:FunctionName>
<ogc:FunctionName nArgs="2">spin</ogc:FunctionName>
<ogc:FunctionName nArgs="1">sqrt</ogc:FunctionName>
<ogc:FunctionName nArgs="2">StandardDeviation</ogc:FunctionName>
<ogc:FunctionName nArgs="1">startAngle</ogc:FunctionName>
<ogc:FunctionName nArgs="1">startPoint</ogc:FunctionName>
<ogc:FunctionName nArgs="1">strCapitalize</ogc:FunctionName>
<ogc:FunctionName nArgs="2">strConcat</ogc:FunctionName>
<ogc:FunctionName nArgs="2">strEndsWith</ogc:FunctionName>
<ogc:FunctionName nArgs="2">strEqualsIgnoreCase</ogc:FunctionName>
<ogc:FunctionName nArgs="2">strIndexOf</ogc:FunctionName>
<ogc:FunctionName nArgs="4">stringTemplate</ogc:FunctionName>
<ogc:FunctionName nArgs="2">strLastIndexOf</ogc:FunctionName>
<ogc:FunctionName nArgs="1">strLength</ogc:FunctionName>
<ogc:FunctionName nArgs="2">strMatches</ogc:FunctionName>
<ogc:FunctionName nArgs="3">strPosition</ogc:FunctionName>
<ogc:FunctionName nArgs="4">strReplace</ogc:FunctionName>
<ogc:FunctionName nArgs="2">strStartsWith</ogc:FunctionName>
<ogc:FunctionName nArgs="3">strSubstring</ogc:FunctionName>
<ogc:FunctionName nArgs="2">strSubstringStart</ogc:FunctionName>
<ogc:FunctionName nArgs="1">strToLowerCase</ogc:FunctionName>
<ogc:FunctionName nArgs="1">strToUpperCase</ogc:FunctionName>
<ogc:FunctionName nArgs="1">strTrim</ogc:FunctionName>
<ogc:FunctionName nArgs="3">strTrim2</ogc:FunctionName>
<ogc:FunctionName nArgs="-1">strURLEncode</ogc:FunctionName>
<ogc:FunctionName nArgs="2">StyleCoverage</ogc:FunctionName>
<ogc:FunctionName nArgs="2">symDifference</ogc:FunctionName>
<ogc:FunctionName nArgs="1">tan</ogc:FunctionName>
<ogc:FunctionName nArgs="2">tint</ogc:FunctionName>
<ogc:FunctionName nArgs="1">toDegrees</ogc:FunctionName>
<ogc:FunctionName nArgs="1">toRadians</ogc:FunctionName>
<ogc:FunctionName nArgs="2">touches</ogc:FunctionName>
<ogc:FunctionName nArgs="1">toWKT</ogc:FunctionName>
<ogc:FunctionName nArgs="2">Transform</ogc:FunctionName>
<ogc:FunctionName nArgs="1">TransparencyFill</ogc:FunctionName>
<ogc:FunctionName nArgs="2">union</ogc:FunctionName>
<ogc:FunctionName nArgs="2">UnionFeatureCollection</ogc:FunctionName>
<ogc:FunctionName nArgs="2">Unique</ogc:FunctionName>
<ogc:FunctionName nArgs="2">UniqueInterval</ogc:FunctionName>
<ogc:FunctionName nArgs="-4">VectorToRaster</ogc:FunctionName>
<ogc:FunctionName nArgs="3">VectorZonalStatistics</ogc:FunctionName>
<ogc:FunctionName nArgs="1">vertices</ogc:FunctionName>
<ogc:FunctionName nArgs="2">within</ogc:FunctionName>
</ogc:FunctionNames>
</ogc:Functions>
</ogc:ArithmeticOperators>
</ogc:Scalar_Capabilities>
<ogc:Id_Capabilities>
<ogc:FID/>
<ogc:EID/>
</ogc:Id_Capabilities>
</ogc:Filter_Capabilities>
</wfs:WFS_Capabilities>
```



#### 3.3 DescribeFeatureType（没搞明白）

返回图层描述信息

**必填参数**

- **service**：服务名称-值为 WFS
- **version**：服务版本-值是当前的版本号
- **request**：操作名称-值为 DescribeFeatureType
- **typeNames**：要描述的功能类型名称（typeName对于WFS 1.1.0和更早版本）

**选填参数**

- **exceptions**：报告异常的格式-默认值为 application/vnd.ogc.se_xml
- **outputFormat**：定义用于描述要素类型的方案描述语言

##### 示例1 

```json
http://localhost:8080/geoserver/wfs?service=wfs
&version=1.0.0
&request=DescribeFeatureType
&typeName=poly_landmarks
```

**返回结果**

```xml
<xsd:schema xmlns:gml="http://www.opengis.net/gml" xmlns:tiger="http://www.census.gov" xmlns:xsd="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified" targetNamespace="http://www.census.gov">
<xsd:import namespace="http://www.opengis.net/gml" schemaLocation="http://localhost:8080/geoserver/schemas/gml/2.1.2/feature.xsd"/>
<xsd:complexType name="poly_landmarksType">
<xsd:complexContent>
<xsd:extension base="gml:AbstractFeatureType">
<xsd:sequence>
<xsd:element maxOccurs="1" minOccurs="0" name="the_geom" nillable="true" type="gml:MultiPolygonPropertyType"/>
<xsd:element maxOccurs="1" minOccurs="0" name="LAND" nillable="true" type="xsd:double"/>
<xsd:element maxOccurs="1" minOccurs="0" name="CFCC" nillable="true" type="xsd:string"/>
<xsd:element maxOccurs="1" minOccurs="0" name="LANAME" nillable="true" type="xsd:string"/>
</xsd:sequence>
</xsd:extension>
</xsd:complexContent>
</xsd:complexType>
<xsd:element name="poly_landmarks" substitutionGroup="gml:_Feature" type="tiger:poly_landmarksType"/>
</xsd:schema>
```





#### 3.4 GetFeature（获取图层要素）

**语法**

```json
http://localhost:8080/geoserver/wfs?
service=wfs        
&version=1.0.0
&request=GetFeature
&typeNames=tiger:poi,topp:tasmania_cities
&outputformat=application/json
&maxFeatures=100
&cql_filter=NAME='church';CITY_NAME='Hobart'
&sortBy=NAME+D
&propertyName=NAME,THUMBNAIL
&srsName=EPSG:4326
&bbox=-74.11083751,40.60754684,-74.0004611,40.80758763,EPSG:4326
&FILTER=<Filter><Within><PropertyName>InWaterA_1M/wkbGeom<PropertyName> <gml:Envelope><gml:lowerCorner>10,10</gml:lowerCorner> <gml:upperCorner>20 20</gml:upperCorner></gml:Envelope></Within></Filter>
&featureid=poi.2,poi.3,poi.4
```

**必填参数**

- **service**：服务名称-值为wfs
- **version**:版本号
- **request**:操作名称-值为GetFeature
- **typeNames**: 图层名称（命名空间.图层名称），多个图层名称用逗号隔开 , typeName=bj.xzqy, bj:sqdw_font_point 

**选填参数**

- **outputformat**：输出格式
-  **startindex**:起始索引,从该位置开始查询
- **maxFeatures**: 限制返回数量 (2.0.0之前版本)
- **count**: 限制返回数量  (2.0.0版本)
- **bbox**:  矩形范围（左下角X坐标,左下角Y坐标,右上角X坐标，右上角Y坐标，EPSG：4326） 
- **resolve**:资源文件位置,默认none
- **resolvedepth**:资源解析深度，默认*
- **filter**: 过滤条件，gml格式定义空间范围，可包含属性条件。Filter是一种符合OGC规范的语言，一种XML实现的语言。SLD用它来实现复杂的Rule选择。WFS在所有需要定位操作对象的地方都会使用Filter。Filter的作用是构建一个表达式，返回值就是Feature的集合。 
- **cql_filter**:
- **sortBy**：排序，name1+A|D,name2+A|D.....
- **propertyName**: 字段名称，逗号隔开 ,name1,name2,......
- **srsName**:坐标系列表
- **storedquery_id**: 资源标识ID 
- **resourceid**:资源标识id
- **resulttype**:查询响应操作， 默认results,返回结果文档 
- **featureid**: ID号(图层名称.ID号),多个用逗号隔开 

##### 示例1 Get查询

```json
http://localhost:8080/geoserver/wfs?
service=wfs
&version=2.0.0
&request=GetFeature
&typeNames=tiger:poi
&outputformat=application/json
```

**返回结果**

```json
{"type":"FeatureCollection","totalFeatures":6,"features":[{"type":"Feature","id":"poi.1","geometry":{"type":"Point","coordinates":[-74.0104611,40.70758763]},"geometry_name":"the_geom","properties":{"NAME":"museam","THUMBNAIL":"pics/22037827-Ti.jpg","MAINPAGE":"pics/22037827-L.jpg"}},{"type":"Feature","id":"poi.2","geometry":{"type":"Point","coordinates":[-74.01083751,40.70754684]},"geometry_name":"the_geom","properties":{"NAME":"stock","THUMBNAIL":"pics/22037829-Ti.jpg","MAINPAGE":"pics/22037829-L.jpg"}},{"type":"Feature","id":"poi.3","geometry":{"type":"Point","coordinates":[-74.01053024,40.70938712]},"geometry_name":"the_geom","properties":{"NAME":"art","THUMBNAIL":"pics/22037856-Ti.jpg","MAINPAGE":"pics/22037856-L.jpg"}},{"type":"Feature","id":"poi.4","geometry":{"type":"Point","coordinates":[-74.00857344,40.71194565]},"geometry_name":"the_geom","properties":{"NAME":"lox","THUMBNAIL":"pics/22037884-Ti.jpg","MAINPAGE":"pics/22037884-L.jpg"}},{"type":"Feature","id":"poi.5","geometry":{"type":"Point","coordinates":[-74.01183158,40.70852996]},"geometry_name":"the_geom","properties":{"NAME":"church","THUMBNAIL":"pics/22037839-Ti.jpg","MAINPAGE":"pics/22037839-L.jpg"}},{"type":"Feature","id":"poi.6","geometry":{"type":"Point","coordinates":[-74.00153046,40.71988512]},"geometry_name":"the_geom","properties":{"NAME":"fire","THUMBNAIL":"pics/28640984-Ti.jpg","MAINPAGE":"pics/28640984-L.jpg"}}],"crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4326"}}}

```

##### 示例2 指定featureid

```json
http://localhost:8080/geoserver/wfs?
service=wfs
&version=2.0.0
&request=GetFeature
&typeNames=tiger:poi
&outputformat=application/json
&featureid=poi.4,poi.1
```

**返回结果**

```json
{"type":"FeatureCollection","totalFeatures":2,"features":[{"type":"Feature","id":"poi.1","geometry":{"type":"Point","coordinates":[-74.0104611,40.70758763]},"geometry_name":"the_geom","properties":{"NAME":"museam","THUMBNAIL":"pics/22037827-Ti.jpg","MAINPAGE":"pics/22037827-L.jpg"}},{"type":"Feature","id":"poi.4","geometry":{"type":"Point","coordinates":[-74.00857344,40.71194565]},"geometry_name":"the_geom","properties":{"NAME":"lox","THUMBNAIL":"pics/22037884-Ti.jpg","MAINPAGE":"pics/22037884-L.jpg"}}],"crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4326"}}}

```

##### 示例三  最大数量

 如果功能的ID未知，但您仍想限制返回的功能数，请`count`对WFS 2.0.0使用参数，或对WFS`maxFeatures`早期版本使用参数。在下面的示例中，`N`表示要返回的特征数： 

```json
http://localhost:8080/geoserver/wfs?
service=wfs
&version=2.0.0
&request=GetFeature
&typeNames=tiger:poi
&outputformat=application/json
&count=2

http://localhost:8080/geoserver/wfs?
service=wfs
&version=1.1.0
&request=GetFeature
&typeNames=tiger:poi
&outputformat=application/json
&maxFeatures=2
```

**返回结果**

```json
{"type":"FeatureCollection","totalFeatures":6,"features":[{"type":"Feature","id":"poi.1","geometry":{"type":"Point","coordinates":[-74.0104611,40.70758763]},"geometry_name":"the_geom","properties":{"NAME":"museam","THUMBNAIL":"pics/22037827-Ti.jpg","MAINPAGE":"pics/22037827-L.jpg"}},{"type":"Feature","id":"poi.2","geometry":{"type":"Point","coordinates":[-74.01083751,40.70754684]},"geometry_name":"the_geom","properties":{"NAME":"stock","THUMBNAIL":"pics/22037829-Ti.jpg","MAINPAGE":"pics/22037829-L.jpg"}}],"crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4326"}}}
```

##### 示例四 maxFeatures,sortBy,propertyName,bbox

```json
http://localhost:8080/geoserver/wfs?
service=wfs
&version=1.1.0
&request=GetFeature
&typeNames=tiger:poi
&outputformat=application/json
&maxFeatures=2
&sortBy=NAME+D
&propertyName=NAME,THUMBNAIL
&srsName=EPSG:4326
&bbox=-74.11083751,40.60754684,-74.0004611,40.80758763,EPSG:4326
```

**返回结果**

```json
{"type":"FeatureCollection","totalFeatures":6,"features":[{"type":"Feature","id":"poi.2","geometry":null,"properties":{"NAME":"stock","THUMBNAIL":"pics/22037829-Ti.jpg"}},{"type":"Feature","id":"poi.1","geometry":null,"properties":{"NAME":"museam","THUMBNAIL":"pics/22037827-Ti.jpg"}}],"crs":null}
```

##### 示例5 featureid与bbox不能同时使用

```json
http://localhost:8080/geoserver/wfs?
service=wfs
&version=1.1.0
&request=GetFeature
&typeNames=tiger:poi
&outputformat=application/json
&maxFeatures=2
&sortBy=NAME+D
&propertyName=NAME,THUMBNAIL
&srsName=EPSG:4326
&bbox=-74.11083751,40.60754684,-74.0004611,40.80758763,EPSG:4326
&featureid=poi.2
```

**返回结果**

```xml
<ows:ExceptionReport xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:ows="http://www.opengis.net/ows" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0.0" xsi:schemaLocation="http://www.opengis.net/ows http://localhost:8080/geoserver/schemas/ows/1.0.0/owsExceptionReport.xsd">
<ows:Exception exceptionCode="NoApplicableCode">
<ows:ExceptionText>featureId and bbox both specified but are mutually exclusive</ows:ExceptionText>
</ows:Exception>
</ows:ExceptionReport>
```



###### 2.3.1.1点查询Filter

```xml
<Filter xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">

<Intersects>

<PropertyName>the_geom</PropertyName>

<gml:Envelope srsName="EPSG:4326">   

<gml:lowerCorner>120.15336460382575 30.2743621901609</gml:lowerCorner>

<gml:upperCorner>120.167097513982 30.28809510031715</gml:upperCorner>

</gml:Envelope>

</Intersects>

</Filter>
```



###### 2.3.1.2自定义多边形查询Filter

```xml
<Filter xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">

<Intersects> 

<PropertyName>the_geom</PropertyName>

<gml:MultiPolygon srsName="EPSG:4326"> 

<gml:polygonMember> 

<gml:Polygon> 

<gml:outerBoundaryIs> 

<gml:LinearRing>

<gml:coordinates xmlns:gml="http://www.opengis.net/gml" decimal="." cs="," ts="">

120.15677,30.2557 120.15677,30.26351 120.16833,30.26351 120.16833,30.2557 120.15677,30.2557

</gml:coordinates> 

</gml:LinearRing> 

</gml:outerBoundaryIs> 

</gml:Polygon> 

</gml:polygonMember> 

</gml:MultiPolygon>

</Intersects>

</Filter>
```

 

##### 2.3.2Post查询

因为GET请求的数据量大小在4kb以内，所以Post为更常用的方法。以下为一个具体的例子：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021049677.png) 

其中直接发送的为一个XML文件，其Filter中可以填写的内容和GET中的Filter一样。

具体内容如下：

```xml
<?xml version='1.0' encoding='GBK'?><wfs:GetFeature service='WFS' version='1.0.0' outputFormat='JSON'

xmlns:wfs='http://www.opengis.net/wfs'

xmlns:ogc='http://www.opengis.net/ogc'

xmlns:gml='http://www.opengis.net/gml' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xsi:schemaLocation='http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-basic.xsd'>

<wfs:Query typeName='cell'>

<wfs:PropertyName>the_geom</wfs:PropertyName>

<wfs:PropertyName>test1</wfs:PropertyName>

<ogc:Filter>

<Or>

<PropertyIsEqualTo><PropertyName>test1</PropertyName><Literal>valuetest1</Literal></PropertyIsEqualTo>

<PropertyIsEqualTo><PropertyName>test2</PropertyName><Literal>valuetest2</Literal></PropertyIsEqualTo>

</Or>

</ogc:Filter>

</wfs:Query>

</wfs:GetFeature>
```



#### 3.5 LockFeature

 用户通过Transaction请求时，为了保证要素信息的一致性，即当一个事务访问一个数据项时，其他的事务不能修改这个数据项，对要素数据加要素锁。 

#### 3.6 Transaction（编辑要素）

 与要素实例的交互操作。该操作不仅能提供要素读取，同时支持要素在线编辑和事务处理。Transaction操作是可选的，服务器根据数据性质选择是否支持该操作。 

有关事务处理语法的更多信息，请参见[WFS规范](http://www.opengeospatial.org/standards/wfs)和[GeoServer示例请求](https://docs.geoserver.org/stable/en/user/configuration/demos/index.html#demos)。

##### 2.4.1添加要素

```xml
<wfs:Transaction service="WFS" version="1.0.0" 
    outputFormat="GML2" 
    xmlns:opengis="[http://www.cetusOpengis.com](http://www.cetusopengis.com/)" 
    xmlns:wfs="http://www.opengis.net/wfs" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:gml="http://www.opengis.net/gml" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xsi:schemaLocation="http://www.opengis.net/wfs  http://schemas.opengis.net/wfs/1.0.0/WFS-basic.xsd">  
    <wfs:Insert handle="someprj1">
     <opengis:someprj>
       <opengis:the_geom>
        <gml:Point srsName="http://www.opengis.net/gml/srs/epsg.xml#3395" >
               <gml:coordinates decimal="." cs="," ts="">13404701.212,3850391.781</gml:coordinates>
        </gml:Point>
       </opengis:the_geom>
       <opengis:ssds>13</opengis:ssds>
       <opengis:qqybh>12</opengis:qqybh>
       <opengis:status>0</opengis:status>
     </opengis:someprj>
    </wfs:Insert> 
  </wfs:Transaction>
```



##### 2.4.2修改要素

```xml
<wfs:Transaction service="WFS" version="1.0.0" 
    outputFormat="GML2" 
    xmlns:opengis="[http://www.cetusOpengis.com](http://www.cetusopengis.com/)" 
    xmlns:wfs="http://www.opengis.net/wfs" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:gml="http://www.opengis.net/gml" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xsi:schemaLocation="http://www.opengis.net/wfs  http://schemas.opengis.net/wfs/1.0.0/WFS-basic.xsd">  
    <wfs:Update typeName="opengis:qqyproject">
   <wfs:Property> 
    <wfs:Name>qqybh</wfs:Name>
    <wfs:Value>12</wfs:Value>
   </wfs:Property>
   <ogc:Filter>  
   <ogc:PropertyIsEqualTo>
   <ogc:PropertyName>qqybh</ogc:PropertyName>
   <ogc:Literal>0</ogc:Literal>
   </ogc:PropertyIsEqualTo>
   </ogc:Filter>  
    </wfs:Update>  
  </wfs:Transaction>
```



##### 2.4.3删除要素

```xml
<wfs:Transaction service="WFS" version="1.0.0" 
    outputFormat="GML2" 
    xmlns:opengis="[http://www.cetusOpengis.com](http://www.cetusopengis.com/)" 
    xmlns:wfs="http://www.opengis.net/wfs" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:gml="http://www.opengis.net/gml" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xsi:schemaLocation="http://www.opengis.net/wfs  http://schemas.opengis.net/wfs/1.0.0/WFS-basic.xsd">  
    <wfs:Delete typeName="opengis:qqyproject">
   <ogc:Filter>  
   <ogc:PropertyIsLessThan>
   <ogc:PropertyName>qqybh</ogc:PropertyName>
   <ogc:Literal>12</ogc:Literal>
   </ogc:PropertyIsLessThan>
   <ogc:PropertyIsGreaterThan>
   <ogc:PropertyName>qqybh</ogc:PropertyName>
   <ogc:Literal>0</ogc:Literal>
   </ogc:PropertyIsGreaterThan>
   </ogc:Filter>  
    </wfs:Delete>  
  </wfs:Transaction>
```





#### 3.7 GetGMLObject 

此操作仅对**WFS 1.1.0版**有效。

甲**GetGMLObject**操作接受GML对象（特征或几何形状），并返回该对象的标识符。通过允许客户端仅提取[复杂功能](https://docs.geoserver.org/stable/en/user/data/app-schema/complex-features.html#app-schema-complex-features)的一部分嵌套属性，此操作仅在需要[复杂功能](https://docs.geoserver.org/stable/en/user/data/app-schema/complex-features.html#app-schema-complex-features)的情况下才有意义。结果，此操作未被客户端应用程序广泛使用。

#### 3.8 GetPropertyValue 

此操作仅对**WFS 2.0.0版**有效。

甲**GetPropertyValue**操作检索一个特征性质，或一个复杂的特征属性的值的部分的值，从一组给定的由查询识别的特征的数据源。

本示例仅检索`topp:states`图层中要素的地理内容：

```
http://example.com/geoserver/wfs?
  service=wfs&
  version=2.0.0&
  request=GetPropertyValue&
  typeNames=topp:states&
  valueReference=the_geom
```

POST请求中的相同示例：

```
<wfs:GetPropertyValue service='WFS' version='2.0.0'
 xmlns:topp='http://www.openplans.org/topp'
 xmlns:fes='http://www.opengis.net/fes/2.0'
 xmlns:wfs='http://www.opengis.net/wfs/2.0'
 valueReference='the_geom'>
  <wfs:Query typeNames='topp:states'/>
</wfs:GetPropertyValue>
```

要检索其他属性的值，请更改`valueReference`参数。

#### 3.9 GetFeatureWithLock 

此操作仅对**WFS 2.0.0版**有效。

甲**GetFeatureWithLock**操作类似于一个**GetFeature**操作，不同之处在于当该组特征被从WFS服务器返回，这些特征也被锁定在后续的事务操作的预期。

该POST示例检索`topp:states`图层的特征，但另外将这些特征锁定了五分钟。

```
<wfs:GetFeatureWithLock service='WFS' version='2.0.0'
 handle='GetFeatureWithLock-tc1' expiry='5' resultType='results'
 xmlns:topp='http://www.openplans.org/topp'
 xmlns:fes='http://www.opengis.net/fes/2.0'
 xmlns:wfs='http://www.opengis.net/wfs/2.0'
 valueReference='the_geom'>
  <wfs:Query typeNames='topp:states'/>
</wfs:GetFeatureWithLock>
```

要调整锁定时间，请更改`expiry`参数。

#### 3.10 CreateStoredQuery 

此操作仅对**WFS 2.0.0版**有效。

一个**CreateStoredQuery**操作创建的WFS服务器上存储的查询。存储的查询的定义编码在`StoredQueryDefinition`参数中，并提供一个ID作为参考。

该POST示例创建一个新的存储查询（称为“ myStoredQuery”），该查询将`topp:states`图层过滤为给定关注区域（`${AreaOfInterest}`）内的那些要素：

```
<wfs:CreateStoredQuery service='WFS' version='2.0.0'
 xmlns:wfs='http://www.opengis.net/wfs/2.0'
 xmlns:fes='http://www.opengis.org/fes/2.0'
 xmlns:gml='http://www.opengis.net/gml/3.2'
 xmlns:myns='http://www.someserver.com/myns'
 xmlns:topp='http://www.openplans.org/topp'>
  <wfs:StoredQueryDefinition id='myStoredQuery'>
    <wfs:Parameter name='AreaOfInterest' type='gml:Polygon'/>
    <wfs:QueryExpressionText
     returnFeatureTypes='topp:states'
     language='urn:ogc:def:queryLanguage:OGC-WFS::WFS_QueryExpression'
     isPrivate='false'>
      <wfs:Query typeNames='topp:states'>
        <fes:Filter>
          <fes:Within>
            <fes:ValueReference>the_geom</fes:ValueReference>
             ${AreaOfInterest}
          </fes:Within>
        </fes:Filter>
      </wfs:Query>
    </wfs:QueryExpressionText>
  </wfs:StoredQueryDefinition>
</wfs:CreateStoredQuery>
```

#### 3.11 DropStoredQuery 

此操作仅对**WFS 2.0.0版**有效。

一个**DropStoredQuery**操作删除由CreateStoredQuery操作创建一个以前存储的查询。该请求接受要删除的查询的ID。

本示例将删除ID为的存储查询`myStoredQuery`：

```
http://example.com/geoserver/wfs?
  request=DropStoredQuery&
  storedQuery_Id=myStoredQuery
```

POST请求中的相同示例：

```
<wfs:DropStoredQuery
 xmlns:wfs='http://www.opengis.net/wfs/2.0'
 service='WFS' id='myStoredQuery'/>
```

#### 3.12 ListStoredQueries 

此操作仅对**WFS 2.0.0版**有效。

一个**ListStoredQueries**操作返回当前由WFS服务器维护的存储查询列表。

本示例列出了服务器上所有存储的查询：

```
http://example.com/geoserver/wfs?
  request=ListStoredQueries&
  service=wfs&
  version=2.0.0
```

POST请求中的相同示例：

```
<wfs:ListStoredQueries service='WFS'
 version='2.0.0'
 xmlns:wfs='http://www.opengis.net/wfs/2.0'/>
```

#### 3.13 DescribeStoredQueries 

此操作仅对**WFS 2.0.0版**有效。

甲**DescribeStoredQuery**操作返回详述关于由WFS服务器维护的每个存储的查询的元数据。可以通过提供特定查询的ID来请求单个查询的描述。如果未提供ID，则会描述所有查询。

本示例描述了ID为的现有存储查询`urn:ogc:def:query:OGC-WFS::GetFeatureById`：

```
http://example.com/geoserver/wfs?
  request=DescribeStoredQueries&
  storedQuery_Id=urn:ogc:def:query:OGC-WFS::GetFeatureById
```

POST请求中的相同示例：

```
<wfs:DescribeStoredQueries
 xmlns:wfs='http://www.opengis.net/wfs/2.0'
 service='WFS'>
  <wfs:StoredQueryId>urn:ogc:def:query:OGC-WFS::GetFeatureById</wfs:StoredQueryId>
</wfs:DescribeStoredQueries>
```

### 4.WFS输出格式

 WFS以多种格式返回要素和要素信息。指定输出格式的语法为： 

```json
outputFormat=<format>
```

| 格式     | 句法                            | 笔记                                                         |
| :------- | :------------------------------ | :----------------------------------------------------------- |
| GML2     | `outputFormat=GML2`             | WFS 1.0.0的默认选项                                          |
| GML3     | `outputFormat=GML3`             | WFS 1.1.0和2.0.0的默认选项                                   |
| 形状文件 | `outputFormat=shape-zip`        | 将生成包含shapefile的ZIP归档文件（请参见下面的[Shapefile输出](https://docs.geoserver.org/stable/en/user/services/wfs/outputformats.html#wfs-outputformat-shapezip)）。 |
| JSON格式 | `outputFormat=application/json` | 返回GeoJSON或JSON输出。注意`outputFormat=json`仅受getFeature支持（出于向后兼容性）。 |
| JSONP    | `outputFormat=text/javascript`  | 返回格式为的[JSONP](http://en.wikipedia.org/wiki/JSONP)`parseResponse(...json...)`。请参阅[WMS供应商参数](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html#wms-vendor-parameters)以更改回调名称。请注意，默认情况下禁用此格式（请参阅[影响WMS的全局变量](https://docs.geoserver.org/stable/en/user/services/wms/global.html#wms-global-variables)）。 |
| CSV      | `outputFormat=csv`              | 返回CSV（逗号分隔值）文件                                    |

通过扩展可以使用一些其他输出格式（例如[Excel](https://docs.geoserver.org/stable/en/user/extensions/excel.html#excel-extension)）。通过执行WFS [GetCapabilities](https://docs.geoserver.org/stable/en/user/services/wfs/reference.html#wfs-getcap)请求，可以找到特定GeoServer实例支持的输出格式的完整列表。

GeoServer提供`format_options`特定于供应商的参数，以指定特定于每种格式的参数。语法为：

```json
format_options=param1:value1;param2:value2;...
```

#### 4.1Shapefile输出

shapefile格式具有许多限制，这些限制会阻止将数据源转换为等效的shapefile。为了遵守这些限制，shape-zip输出格式将自动对源数据进行一些转换，并最终将单个集合拆分为多个shapefile。特别地，shape-zip格式将：

- 将属性名称减少到DBF接受的长度，确保没有冲突（在属性名称的末尾添加了计数器以处理此问题）。
- 将多个几何类型扇出成平行的shapefile，以原始要素类型命名，再加上几何类型作为后缀。
- 扇出多个shapefile，以防达到最大大小

.shp和.dbf文件的默认最大大小为2GB，可以通过将GS_SHP_MAX_SIZE和GS_DBF_MAX_SIZE系统变量设置为其他值（作为字节数，默认值为2147483647）来修改这些限制。

Shapefile输出`format_options`：

- `format_option=filename:`：如果提供了文件名，则将该名称用作输出文件名。例如，`format_options=filename:roads.zip`。

#### 4.2 Shapefile文件名自定义

如果未指定文件名，则从请求的要素类型名称中推断出输出文件名。可以通过准备[Freemarker模板来自](https://docs.geoserver.org/stable/en/user/tutorials/freemarker.html#tutorial-freemarkertemplate)定义shapefile输出格式的输出，该[模板](https://docs.geoserver.org/stable/en/user/tutorials/freemarker.html#tutorial-freemarkertemplate)将配置档案文件的名称（ZIP文件）及其包含的文件。默认模板是：

```json
zip=${typename}
shp=${typename}${geometryType}
txt=wfsrequest
```

该`zip`属性是存档的名称，该`shp`属性是给定要素类型的shapefile的名称，并且`txt`是实际WFS请求的转储。

模板中可用的属性为：

> - `typename`—功能类型名称（对于`zip`属性，如果请求包含许多功能类型，它将是第一个功能类型）
> - `geometryType`— shapefile中包含的几何类型。仅当输出几何类型为通用类型且每种类型的各种几何存储在一个shapefile中时，才使用此选项。
> - `workspace`—要素类型的工作区
> - `timestamp`—带有请求时间戳记的日期对象
> - `iso_timestamp`—字符串（`yyyyMMdd_HHmmss`格式为GMT的请求的ISO时间戳）



#### 4.3 JSON和JSONP输出

JSON输出格式（如果启用，则为JSONP）将要素内容作为[GeoJSON](http://geojson.org/)文档返回。这是一个简单的GeoJSON文件的示例；

```json
{  "type": "Feature",
   "geometry": {
      "type": "Point",
      "coordinates": [125.6, 10.1]
   },
   "properties": {
      "name": "Dinagat Islands"
   }
}
```

输出属性可以包括列表和地图的使用：

```json
{
  "type": "Feature",
  "id": "example.3",
  "geometry": {
    "type": "POINT",
    "coordinates": [ -75.70742, 38.557476 ],
  },
  "geometry_name": "geom",
  "properties": {
    "CONDITION": "Orange",
    "RANGE": {"min":"37","max":"93"}
  }
}
```

JSON输出`format_options`：

- `format_options=id_policy:=` 用于确定id值是否包含在输出中。

  > 使用`format_options=id_policy:reference_no`使用reference_no属性功能ID生成，或`format_options=id_policy:reference_no=true`默认的功能ID生成，或`format_options=id_policy:reference_no=false`为了抑制功能ID输出。
  >
  > 如果未指定id_policy，则使用geotools默认要素ID生成。

- `format_options=callback:`仅适用于JSONP输出格式。请参阅[WMS供应商参数](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html#wms-vendor-parameters)以更改回调名称。请注意，默认情况下禁用此格式（请参阅[影响WMS的全局变量](https://docs.geoserver.org/stable/en/user/services/wms/global.html#wms-global-variables)）。

- `format_option=filename:`：如果提供了文件名，则将该名称用作输出文件名。该扩展名`json`是可选的，例如`format_options=filename:export`或`format_options=features.json`

JSON输出：`system properties`

- `json.maxDepth=`用于确定在编码阶段允许的JSON嵌套对象的最大数量。默认情况下，值为100。

### 5.WFS供应商参数

####  5.1 cql_filter 

在WFS [GetFeature](https://docs.geoserver.org/stable/en/user/services/wfs/reference.html#wfs-getfeature) GET请求中，该`cql_filter`参数可用于以ECQL（扩展公共查询语言）格式指定过滤器。与OGC XML过滤器相比，ECQL提供了更紧凑和易读的语法。

有关完整的详细信息，请参阅《[ECQL参考》](https://docs.geoserver.org/stable/en/user/filter/ecql_reference.html#filter-ecql-reference)以及《[CQL和ECQL](https://docs.geoserver.org/stable/en/user/tutorials/cql/cql_tutorial.html#cql-tutorial)教程》。

以下示例说明了GET请求OGC过滤器：

```xml
filter=<Filter xmlns:gml="http://www.opengis.net/gml"><Intersects><PropertyName>the_geom</PropertyName><gml:Point srsName="4326"><gml:coordinates>-74.817265,40.5296504</gml:coordinates></gml:Point></Intersects></Filter>
```

使用ECQL，相同的过滤器将定义如下：

```json
cql_filter=INTERSECTS(the_geom,%20POINT%20(-74.817265%2040.5296504))
```

#### 5.2  format_options 

该`format_options`参数是其他特定于格式的参数的容器。语法为：

```json
format_options=param1:value1;param2:value2;...
```

支持的格式选项是：

- `callback`（默认值为`parseResponse`）-指定JSONP响应格式的回调函数名称
- `id_policy`（默认值为`true`）-指定JSON输出格式的ID生成。要在输出中包含功能部件ID，请使用属性名称，或`format_options=id_policy:true`用于功能部件ID的生成。为避免使用功能部件ID，请完全使用`format_options=id_policy:false`。
- `filename`（默认值为`features`或由功能类型名称生成）-提供`Content-Disposition`指示附件文件名的标头（用作浏览器的建议，使用“**另存为”**将内容**保存**到磁盘）。举个例子`format_options=filename:content.txt`。

#### 5.3 Reprojection

由于WFS 1.1.0和2.0.0都支持数据重新投影，因此GeoServer可以将数据存储在一个投影中，并在另一个投影中返回GML。虽然不是规范的一部分，但GeoServer也支持使用WFS 1.0.0。提交WFS [GetFeature](https://docs.geoserver.org/stable/en/user/services/wfs/reference.html#wfs-getfeature) GET请求时，可以添加此参数以指定重新投影SRS，如下所示：

```json
srsName=<srsName>
```

投影的代码``例如由表示`EPSG:4326`。对于POST请求，您可以将相同的代码添加到`Query`元素。

#### 5.4 XML请求验证

在XML请求的有效性方面，GeoServer的严格性不如WFS规范。要强制传入的XML请求有效，请使用以下参数：

```xml
strict=[true|false]
```

此参数的默认选项是`false`。

例如，以下请求无效：

```xml
<wfs:GetFeature service="WFS" version="1.0.0"
 xmlns:wfs="http://www.opengis.net/wfs">
  <Query typeName="topp:states"/>
</wfs:GetFeature>
```

该请求无效的原因有两个：

- 该`Query`元素应以开头`wfs:`。
- 名称空间前缀尚未映射到名称空间URI。

也就是说，默认情况下仍会处理该请求。`strict=true`但是，使用参数执行上述命令会导致错误。正确的语法应为：

```xml
<wfs:GetFeature service="WFS" version="1.0.0"
 xmlns:wfs="http://www.opengis.net/wfs"
 xmlns:topp="http://www.openplans.org/topp">
  <wfs:Query typeName="topp:states"/>
</wfs:GetFeature>
```

#### 5.5 GetCapabilities命名空间过滤器

通过将参数添加到请求中，可以过滤WFS [GetCapabilities](https://docs.geoserver.org/stable/en/user/services/wfs/reference.html#wfs-getcap)请求以仅返回与特定名称空间相对应的那些层``。

此参数仅影响GetCapabilities请求。

要应用此过滤器，请将以下代码添加到您的请求中：

```json
namespace=<namespace>
```

尽管提供无效的名称空间不会导致任何错误，但是返回的GetCapabilities文档将不包含任何层信息。

使用此参数可能会导致您的GetCapabilities文档无效，因为WFS规范要求该文档至少返回一层。

此过滤器与[虚拟服务有关](https://docs.geoserver.org/stable/en/user/configuration/virtual-services.html#virtual-services)。



### 6.WFS版本差异

 WFS服务共有三个版本：1.0.0，1.1.0，以及2.0.0，比较一下常见的1.1.0与2.0.0 

#### 6.1 WFS1.1.0 

```json
http://example.com/geoserver/wfs?
service=wfs
&version=1.1.0
&request=GetFeature
&typeName=namespace:featuretype
&maxFeatures=N
```

#### 6.2  WFS2.0.0 

```json
http://example.com/geoserver/wfs?
service=wfs
&version=2.0.0
&request=GetFeature
&typeNames=namespace:featuretype
&count=N
```

####  6.3 WFS各版本差异如下：

（1）2.0.0增加了对时间过滤器的支持

（2）2.0.0支持SOAP协议

（3）1.0.0用maxFeatures限制返回数量，2.0.0用count限制

（4）仅限1.1.0支持的操作接口：GetGMLObject

（5） 仅限2.0.0支持的操作接口：GetPropertyValue、GetFeatureWithLock、CreateStoredQuery、DropStoredQuery、ListStoredQueries、DescribeStoredQueries

### 7.Geoserver中WFS服务常见参数设置

####  7.1 要素设置 

1. 最大要素数（Maximum number of features）

   Geoserver中对于GetFeature所能返回的极值，与实际查询无关，默认值为1000000

2. 预览的最大要素数（Maximum number of features for preview）

   用于前端预览的最大要素数，默认为50

3. 返回的Bbox范围框

   默认关闭，打开可能会影响前端渲染速度

#### 7.2  服务等级 

 服务等级分为3类 

1. 基本WFS服务：提供使用getCapabilities、describeFeatureType和getFeature操作搜索和检索功能数据的功能

2. WFS-T服务：基本WFS服务+事务请求

3. 完整的WFS服务：WFS-T服务+LockFeature

#### 7.3  GML（地理标记语言）版本 

GML是一种基于XML的规范，OGC定义，用与标识地理特征。GML2包含空间和非空间属性，GML3在GML2基础之上扩展了复杂几何、空间时间参考、拓扑及3D等复杂功能。

   WFS1.0.0默认返回GML2，WFS1.1.0请求,默认返回GML3.0，WFS2.0.0默认返回GML3.2



### 8.扩展

#### 8.1  FILTER详解

详情看OGC Filter.md文档

#### 3.1 空间查询 

#####  3.1.1划分区域，查询区域内的点 

```xml
http://localhost:28080/geoserver/sf/ows?service=WFS&version=1.0.0
&request=GetFeature
&typeName=sf:bugsites
&maxFeatures=50
&outputFormat=application%2Fjson
&filter=  
<Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">  
    <Intersects>
	<PropertyName>the_geom</PropertyName>
	<gml:Polygon>  
        <gml:outerBoundaryIs> 
	<gml:LinearRing>   
          <gml:coordinates>604264,4919992 604340,4913350 611059,4915487 604264,4919992</gml:coordinates> 
    </gml:LinearRing> 
        </gml:outerBoundaryIs> 
 </gml:Polygon>		
    </Intersects>
</Filter>
```

空间关系

​     ![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021049678.png)

​    参数说明

​    A：此次采取的几何方式是Intersects，即采用面与点相交，得到这个面里面的点数据

​    B：多边形经纬度为一个数组，第一个点经纬度要与最后一个点一致，保证多边形的闭合

​    C：过滤条件里有一个PropertyName属性，为必须字段，根据图层的属性来查看，具体查看方式为点击图层，然后点及要查询的图层名称，要素类型的第一个属性，即为该字段的值，过程如下图所示

​    ![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021049679.png)

​     ![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021049680.png)

​     查询结果

​     ![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021049681.png)

##### 3.1.2 传入点坐标，查询该点所在的区域信息  

```xml
http://localhost:28080/geoserver/topp/ows?service=WFS&version=1.0.0
&request=GetFeature&typeName=topp:tasmania_water_bodies&maxFeatures=50
&outputFormat=application%2Fjson
&filter=<Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">  
    <Intersects>
	<PropertyName>the_geom</PropertyName>
	<gml:Point>   
          <gml:coordinates>146.200,-42.700</gml:coordinates> 
    </gml:Point> 	
    </Intersects>
</Filter>
```

 空间关系

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021049682.png)

   查询说明：

   A：此次采取的几何方式是Intersects，即采用点与面相交，得到包含这个点的面数据

   查询结果：

   ![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021049683.png)

3.1.3 查看被线穿过的区域 

```xml
http://localhost:28080/geoserver/topp/ows?service=WFS&version=1.0.0
&request=GetFeature&typeName=topp:tasmania_water_bodies&maxFeatures=50
&outputFormat=application%2Fjson
&filter=
    <Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">  
        <Crosses>  
            <PropertyName>the_geom</PropertyName>  
            <gml:LineString>  
        <gml:coordinates>146.62903,-41.85171 147.27448,-42.18130</gml:coordinates>  
            </gml:LineString>  
        </Crosses>  
</Filter>
```

空间关系

​     ![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021049684.png)     

​     查询结果

​     ![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021049685.png)  

下面是所有的空间关系介绍

| **Name**             | **Arguments**                             | **Description**                                              |
| -------------------- | ----------------------------------------- | ------------------------------------------------------------ |
| contains             | a:Geometry, b:Geometry                    | Returns true if the geometry a contains b                    |
| crosses              | a:Geometry, b:Geometry                    | Returns true if a crosses b                                  |
| disjoint             | a:Geometry, b:Geometry                    | Returns true if the two geometries are disjoint, false otherwise |
| equalsExact          | a:Geometry, b:Geometry                    | Returns true if the two geometries are exactly equal, same coordinates in the same order |
| equalsExactTolerance | a:Geometry, b:Geometry, tol:Double        | Returns true if the two geometries are exactly equal, same coordinates in the same order, allowing for a tol distance in the corresponding points |
| intersects           | a:Geometry, b:Geometry                    | Returns true if a intersects b                               |
| isWithinDistance     | a: Geometry, b:Geometry, distance: Double | Returns true if the distance between a and b is less than distance (measured as an euclidean distance) |
| overlaps             | a: Geometry, b:Geometry                   | Returns true a overlaps with b                               |
| relate               | a: Geometry, b:Geometry                   | Returns the DE-9IM intersection matrix for a and b           |
| relatePattern        | a: Geometry, b:Geometry, pattern:String   | Returns true if the DE-9IM intersection matrix for aand b matches the specified pattern |
| touches              | a: Geometry, b: Geometry                  | Returns true if a touches b according to the SQL simple feature specification rules |
| within               | a: Geometry, b:Geometry                   | Returns true is fully contained inside b                     |

 

 