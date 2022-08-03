

https://docs.geoserver.org/2.12.2/user/filter/filter_reference.html

### 1.OGCFilter简介

 Filter是一种基于XML的并且符合OGC规范的语言。SLD用它来实现复杂的Rule选择。WFS在所有需要定位操作对象的地方都会使用Filter。Filter的作用是构建一个表达式，返回值就是Feature的集合，换句话说Filter就如他的名字一般为我们从一个集合中过滤出一个满足我们要求的子集。而过滤的方法就是Filter定义的操作符。Filter定义了三种操作符： 

地理操作符（Spatial operators）

比较操作符（Comparison operators）

逻辑操作符（Logical operators）。 

### 2.OGCFilter详解

#### 2.1.比较运算符

 比较运算符用于指定非空间属性的条件。 

**原始数据**

```json
http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poi
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
```



##### **1.** 相等(PropertyIsEqualTo)

**语法**

```xml
 /* 第一个%s填写字段名称，第二个%s填写字段值 */ 
<PropertyIsEqualTo> 
   <PropertyName>%s</PropertyName> 
   <Literal>%s</Literal> 
</PropertyIsEqualTo> 
```

 **示例**

```json
http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poi
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
&filter=<Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">  
<PropertyIsEqualTo> 
   <PropertyName>NAME</PropertyName> 
   <Literal>church</Literal> 
</PropertyIsEqualTo>
</Filter>
```



![1616383258940](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021048004.png) 





##### **2.** 不等(PropertyIsNotEqualTo)

```xml
 /* 第一个%s填写字段名称，第二个%s填写字段值 */ 
 <PropertyIsNotEqualTo> 
   <PropertyName>%s</PropertyName> 
   <Literal>%s</Literal> 
 </PropertyIsNotEqualTo>  
```

 **示例**

```json
http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poi
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
&filter=<Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">  
<PropertyIsNotEqualTo> 
   <PropertyName>NAME</PropertyName> 
   <Literal>church</Literal> 
</PropertyIsNotEqualTo>
</Filter>
```

 ![1616383282967](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021048005.png) 

##### **3.** 小于(PropertyIsLessThan)

```xml
 /* 第一个%s填写字段名称，第二个%s填写字段值 */ 
 <PropertyIsLessThan> 
   <PropertyName>%s</PropertyName> 
   <Literal>%s</Literal> 
 </PropertyIsLessThan> 
```

 **示例**

```json
http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poi
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
&filter=<Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">  
<PropertyIsLessThan> 
   <PropertyName>NAME</PropertyName> 
   <Literal>lox</Literal> 
</PropertyIsLessThan>
</Filter>
```

![1616383303479](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021048006.png) 

##### **4.** 大于(PropertyIsGreaterThan)

```xml
/* 第一个%s填写字段名称，第二个%s填写字段值 */ 
<PropertyIsGreaterThan> 
   <PropertyName>%s</PropertyName> 
   <Literal>%s</Literal> 
</PropertyIsGreaterThan>  
```

 **示例**

```json
http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poi
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
&filter=<Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">  
<PropertyIsGreaterThan> 
   <PropertyName>NAME</PropertyName> 
   <Literal>lox</Literal> 
</PropertyIsGreaterThan>
</Filter>
```

![1616383321496](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021048007.png)

##### **5.** 小于等于(PropertyIsLessThanOrEqualTo) 

```xml
 /* 第一个%s填写字段名称，第二个%s填写字段值 */ 
 <PropertyIsLessThanOrEqualTo> 
   <PropertyName>%s</PropertyName> 
   <Literal>%s</Literal> 
 </PropertyIsLessThanOrEqualTo> 
```

 **示例**

```json
http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poi
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
&filter=<Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">  
<PropertyIsLessThanOrEqualTo> 
   <PropertyName>NAME</PropertyName> 
   <Literal>lox</Literal> 
</PropertyIsLessThanOrEqualTo>
</Filter>
```

  ![1616383340365](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021048008.png)

##### **6.** 大于等于(PropertyIsGreaterThanOrEqualTo)

```xml
 /* 第一个%s填写字段名称，第二个%s填写字段值 */ 
 <PropertyIsGreaterThanOrEqualTo> 
   <PropertyName>%s</PropertyName> 
   <Literal>%s</Literal> 
 </PropertyIsGreaterThanOrEqualTo>  
```

 **示例**

```json
http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poi
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
&filter=<Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">  
<PropertyIsGreaterThanOrEqualTo> 
   <PropertyName>NAME</PropertyName> 
   <Literal>lox</Literal> 
</PropertyIsGreaterThanOrEqualTo>
</Filter>
```

![1616383362648](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021048009.png)

##### **7.** 模糊查询(PropertyIsLike)

该模式由一系列常规字符和三个特殊模式字符指定。模式字符由元素的以下*必需*属性定义`<PropertyIsLike>`：

·    wildCard 指定匹配零个或多个字符串字符的任何序列的模式字符

·    singleChar 指定匹配任何单个字符串字符的模式字符

·    escapeChar 指定可用于转义模式字符的转义字符

```xml
 /* 第一个%s填写字段名称，第二个%s填写字段值 */ 
 <PropertyIsLike wildCard="*" singleChar="?" escapeChar="\"> 
   <PropertyName>%s</PropertyName> 
   <Literal>%s</Literal> 
 </PropertyIsLike> 
```

**示例**

```json
 http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poi
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
&filter=<Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml"> <PropertyIsLike wildCard="*" singleChar="?" escapeChar="\"> 
   <PropertyName>NAME</PropertyName> 
   <Literal>chur??</Literal> 
 </PropertyIsLike> 
</Filter>
```

 ![1616383380995](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021048010.png)

##### **8.** 为空(PropertyIsNull)

```xml
 /* 第一个%s填写字段名称 */ 
<PropertyIsNull> 
   <PropertyName>%s</PropertyName> 
</PropertyIsNull> 
```

 **示例**

```json
 http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poi
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
&filter= <Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml"> <PropertyIsNull> 
   <PropertyName>NAME</PropertyName> 
</PropertyIsNull> 
</Filter>

```

 ![1616383402923](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021048011.png)

##### **9.** 之间(PropertyIsBetween)

```xml
 /* 第一个%s填写字段名称，第二个%s填写字段值下限(大于等于)，第三个%s填写字段值上限(小于等于) */ 
 <PropertyIsBetween> 
   <PropertyName>%s</PropertyName> 
   <LowerBoundary>%s</LowerBoundary> 
   <UpperBoundary>%s</UpperBoundary> 
 </PropertyIsBetween> 

```

**示例**

```json
  http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poi
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
&filter=<Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml"><PropertyIsBetween> 
   <PropertyName>NAME</PropertyName> 
   <LowerBoundary> 
     <Literal>fire</Literal> 
   </LowerBoundary> 
   <UpperBoundary> 
     <Literal>museam</Literal> 
   </UpperBoundary> 
 </PropertyIsBetween> 
</Filter>

```

 ![1616383816671](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021048012.png)

##### 10. 最大比例尺(MaxScaleDenominator)

只能在sld中作为筛选

```xml
<sld:MaxScaleDenominator>70000.0</sld:MaxScaleDenominator> 

```

 

##### **11.** 最小比例尺(MinScaleDenominator)

只能在sld中作为筛选

```xml
 <sld:MinScaleDenominator>70000.0</sld:MinScaleDenominator> 

```

 

#### 2.2.空间操作符

 空间运算符用于指定要素几何属性的条件。可以使用以下空间运算符： 

##### 2.2.1拓扑操作符

| 名称             | 类型 | 说明               |
| ---------------- | ---- | ------------------ |
| `<PropertyName>` |      | 指定几何图形的名称 |
| GML Geometry     |      | GML值,指定几何图形 |

###### 2.2.1.1是否相交 ( Intersects )

```xml
	<Intersects>
		<PropertyName>the_geom</PropertyName>
		<gml:Envelope srsName="EPSG:4326">   
			<gml:lowerCorner>-74.0104612 40.70758762</gml:lowerCorner>
			<gml:upperCorner>-74.0104610 40.70758764</gml:upperCorner>
		</gml:Envelope>
	</Intersects>

```

**示例**

```json
http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poi
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
&filter=<Filter xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">
	<Intersects>
		<PropertyName>the_geom</PropertyName>
		<gml:Envelope srsName="EPSG:4326">   
			<gml:lowerCorner>-74.0104612 40.70758762</gml:lowerCorner>
			<gml:upperCorner>-74.0104610 40.70758764</gml:upperCorner>
		</gml:Envelope>
	</Intersects>
</Filter>

```

![1616383836992](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021048013.png)



###### 2.1.2 是否不相交( Disjoint )

```xml
	<Disjoint>
		<PropertyName>the_geom</PropertyName>
		<gml:Envelope srsName="EPSG:4326">   
			<gml:lowerCorner>-74.0104612 40.70758762</gml:lowerCorner>
			<gml:upperCorner>-74.0104610 40.70758764</gml:upperCorner>
		</gml:Envelope>
	</Disjoint>


```

**示例**

```json
http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poi
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
&filter=<Filter xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">
	<Disjoint>
		<PropertyName>the_geom</PropertyName>
		<gml:Envelope srsName="EPSG:4326">   
			<gml:lowerCorner>-74.0104612 40.70758762</gml:lowerCorner>
			<gml:upperCorner>-74.0104610 40.70758764</gml:upperCorner>
		</gml:Envelope>
	</Disjoint>
</Filter>

```

![1616383857956](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021048014.png)

###### 2.1.3 是否包含( Contains )

```xml
	<Contains>
		<PropertyName>the_geom</PropertyName>
		<gml:Envelope srsName="EPSG:4326">   
			<gml:lowerCorner>-74.0104612 40.70758762</gml:lowerCorner>
			<gml:upperCorner>-74.0104610 40.70758764</gml:upperCorner>
		</gml:Envelope>
	</Contains>


```

**示例**

```json
http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poi
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
&filter=<Filter xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">
	<Contains>
		<PropertyName>the_geom</PropertyName>
		<gml:Envelope srsName="EPSG:4326">   
			<gml:lowerCorner>-74.0104612 40.70758762</gml:lowerCorner>
			<gml:upperCorner>-74.0104610 40.70758764</gml:upperCorner>
		</gml:Envelope>
	</Contains>
</Filter>

```

  

###### 2.1.4 是否在另一个之内 ( Within )

```xml
	<Within>
		<PropertyName>the_geom</PropertyName>
		<gml:Envelope srsName="EPSG:4326">   
			<gml:lowerCorner>-74.0104612 40.70758762</gml:lowerCorner>
			<gml:upperCorner>-74.0104610 40.70758764</gml:upperCorner>
		</gml:Envelope>
	</Within>


```

**示例**

```json
http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poi
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
&filter=<Filter xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">
	<Within>
		<PropertyName>the_geom</PropertyName>
		<gml:Envelope srsName="EPSG:4326">   
			<gml:lowerCorner>-74.0104612 40.70758762</gml:lowerCorner>
			<gml:upperCorner>-74.0104610 40.70758764</gml:upperCorner>
		</gml:Envelope>
	</Within>
</Filter>

```



###### 2.1.5 是否接触 ( Touches )



```xml
	<Touches>
		<PropertyName>the_geom</PropertyName>
		<gml:Envelope srsName="EPSG:4326">   
			<gml:lowerCorner>-74.0104612 40.70758762</gml:lowerCorner>
			<gml:upperCorner>-74.0104610 40.70758764</gml:upperCorner>
		</gml:Envelope>
	</Touches>


```

**示例**

```json
http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poi
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
&filter=<Filter xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">
	<Touches>
		<PropertyName>the_geom</PropertyName>
		<gml:Envelope srsName="EPSG:4326">   
			<gml:lowerCorner>-74.0104612 40.70758762</gml:lowerCorner>
			<gml:upperCorner>-74.0104610 40.70758764</gml:upperCorner>
		</gml:Envelope>
	</Touches>
</Filter>

```



###### 2.1.6 是否交叉 ( Crosses )



```xml
	<Crosses>
		<PropertyName>the_geom</PropertyName>
		<gml:Envelope srsName="EPSG:4326">   
			<gml:lowerCorner>-74.0104612 40.70758762</gml:lowerCorner>
			<gml:upperCorner>-74.0104610 40.70758764</gml:upperCorner>
		</gml:Envelope>
	</Crosses>


```

**示例**

```json
http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poi
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
&filter=<Filter xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">
	<Crosses>
		<PropertyName>the_geom</PropertyName>
		<gml:Envelope srsName="EPSG:4326">   
			<gml:lowerCorner>-74.0104612 40.70758762</gml:lowerCorner>
			<gml:upperCorner>-74.0104610 40.70758764</gml:upperCorner>
		</gml:Envelope>
	</Crosses>
</Filter>

```



###### 2.1.7 是否重叠 ( Overlaps )



```xml
	<Overlaps>
		<PropertyName>the_geom</PropertyName>
		<gml:Envelope srsName="EPSG:4326">   
			<gml:lowerCorner>-74.0104612 40.70758762</gml:lowerCorner>
			<gml:upperCorner>-74.0104610 40.70758764</gml:upperCorner>
		</gml:Envelope>
	</Overlaps>


```

**示例**

```json
http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poi
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
&filter=<Filter xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">
	<Overlaps>
		<PropertyName>the_geom</PropertyName>
		<gml:Envelope srsName="EPSG:4326">   
			<gml:lowerCorner>-74.0104612 40.70758762</gml:lowerCorner>
			<gml:upperCorner>-74.0104610 40.70758764</gml:upperCorner>
		</gml:Envelope>
	</Overlaps>
</Filter>

```



###### 2.1.8 是否在拓扑上相等 ( Equals )



```xml
	<Equals>
		<PropertyName>the_geom</PropertyName>
		<gml:Envelope srsName="EPSG:4326">   
			<gml:lowerCorner>-74.0104612 40.70758762</gml:lowerCorner>
			<gml:upperCorner>-74.0104610 40.70758764</gml:upperCorner>
		</gml:Envelope>
	</Equals>


```

**示例**

```json
http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poi
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
&filter=<Filter xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">
	<Equals>
		<PropertyName>the_geom</PropertyName>
		<gml:Envelope srsName="EPSG:4326">   
			<gml:lowerCorner>-74.0104612 40.70758762</gml:lowerCorner>
			<gml:upperCorner>-74.0104610 40.70758764</gml:upperCorner>
		</gml:Envelope>
	</Equals>
</Filter>

```







##### 2.2距离运算符

| 名称             | 类型 | 说明               |
| ---------------- | ---- | ------------------ |
| `<PropertyName>` |      | 指定几何图形的名称 |
| GML Geometry     |      | GML值,指定几何图形 |
| `<Distance>`     |      | 距离               |

###### 2.2.1 距离小于(DWithin) 



```xml
	<DWithin>
		<PropertyName>the_geom</PropertyName>
		<gml:Envelope srsName="EPSG:4326">   
			<gml:lowerCorner>-74.0104612 40.70758762</gml:lowerCorner>
			<gml:upperCorner>-74.0104610 40.70758764</gml:upperCorner>
		</gml:Envelope>
        <Distance>1</Distance>
	</DWithin>

```

**示例**

```json
http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poi
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
&filter=<Filter xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">
	<DWithin>
		<PropertyName>the_geom</PropertyName>
		<gml:Envelope srsName="EPSG:4326">   
			<gml:lowerCorner>-74.0104612 40.70758762</gml:lowerCorner>
			<gml:upperCorner>-74.0104610 40.70758764</gml:upperCorner>
		</gml:Envelope>
        <Distance>0.001</Distance>
	</DWithin>
</Filter>

```

 ![1616383884437](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021048015.png)

###### 2.2.2距离大于( Beyond )



```xml
	<Beyond>
		<PropertyName>the_geom</PropertyName>
		<gml:Envelope srsName="EPSG:4326">   
			<gml:lowerCorner>-74.0104612 40.70758762</gml:lowerCorner>
			<gml:upperCorner>-74.0104610 40.70758764</gml:upperCorner>
		</gml:Envelope>
        <Distance>1</Distance>
	</Beyond>

```

**示例**

```json
http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poi
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
&filter=<Filter xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">
	<Beyond>
		<PropertyName>the_geom</PropertyName>
		<gml:Envelope srsName="EPSG:4326">   
			<gml:lowerCorner>-74.0104612 40.70758762</gml:lowerCorner>
			<gml:upperCorner>-74.0104610 40.70758764</gml:upperCorner>
		</gml:Envelope>
        <Distance>0.001</Distance>
	</Beyond>
</Filter>

```

  ![1616383905437](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021048016.png)

##### 2.3边框运算符

| 名称               | 类型 | 说明                              |
| ------------------ | ---- | --------------------------------- |
| `<PropertyName>`   |      | 指定几何图形的名称                |
| [gml:Box](gml:Box) |      | GML Box文字值，指定要测试的边界框 |

###### 2.3.1与地理范围相交(BBOX)

```xml
	<BBOX> 
		<PropertyName>the_geom</PropertyName> 
		<gml:Box  srsName="EPSG:4326" > 
			<gml:coordinates>-74.0104612,40.70758762 -74.0104610,40.70758764</gml:coordinates>
		</gml:Box> 
	</BBOX>

```

**示例**

```json
http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poi
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
&filter=<Filter xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">
	<BBOX> 
		<PropertyName>the_geom</PropertyName> 
		<gml:Box  srsName="EPSG:4326" > 
			<gml:coordinates>-74.0104612,40.70758762 -74.0104610,40.70758764</gml:coordinates>
		</gml:Box> 
	</BBOX>
</Filter>

```

![1616387672599](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021048017.png) 

#### 3逻辑运算符

##### **3.1** 与(And)



```xml
 <And> 
  	<Intersects>
		<PropertyName>the_geom</PropertyName>
		<gml:Envelope srsName="EPSG:4326">   
			<gml:lowerCorner>-74.0104612 40.70758762</gml:lowerCorner>
			<gml:upperCorner>-74.0104610 40.70758764</gml:upperCorner>
		</gml:Envelope>
	</Intersects>
   <PropertyIsEqualTo> 
     <PropertyName>NAME</PropertyName> 
     <Literal>museam</Literal> 
   </PropertyIsEqualTo>  
 </And> 

```

**示例**

```json
http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poi
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
&filter=<Filter xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">
 <And> 
  	<Intersects>
		<PropertyName>the_geom</PropertyName>
		<gml:Envelope srsName="EPSG:4326">   
			<gml:lowerCorner>-74.0104612 40.70758762</gml:lowerCorner>
			<gml:upperCorner>-74.0104610 40.70758764</gml:upperCorner>
		</gml:Envelope>
	</Intersects>
   <PropertyIsEqualTo> 
     <PropertyName>NAME</PropertyName> 
     <Literal>museam</Literal> 
   </PropertyIsEqualTo>  
 </And> 
</Filter>

```

 ![1616387712588](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021048018.png) 

##### 3.2** 或者(Or)



```xml
 <Or> 
   <PropertyIsEqualTo> 
     <PropertyName>NAME</PropertyName> 
     <Literal>museam</Literal> 
   </PropertyIsEqualTo> 
   <PropertyIsEqualTo> 
     <PropertyName>NAME</PropertyName> 
     <Literal>fire</Literal> 
   </PropertyIsEqualTo>  
 </Or>  

```

**示例**

```json
http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poi
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
&filter=<Filter xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">
 <Or> 
   <PropertyIsEqualTo> 
     <PropertyName>NAME</PropertyName> 
     <Literal>museam</Literal> 
   </PropertyIsEqualTo> 
   <PropertyIsEqualTo> 
     <PropertyName>NAME</PropertyName> 
     <Literal>fire</Literal> 
   </PropertyIsEqualTo>  
 </Or>
</Filter>

```

 ![1616387733025](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021048019.png) 



##### 3.3取反(Not)



```xml
 <Not> 
   <PropertyIsEqualTo> 
     <PropertyName>NAME</PropertyName> 
     <Literal>museam</Literal> 
   </PropertyIsEqualTo> 
   <PropertyIsEqualTo> 
     <PropertyName>NAME</PropertyName> 
     <Literal>fire</Literal> 
   </PropertyIsEqualTo>  
 </Not>  

```

**示例**

```json
http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poi
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
&filter=<Filter xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">
<Not>
<Or>
   <PropertyIsEqualTo> 
     <PropertyName>NAME</PropertyName> 
     <Literal>museam</Literal> 
   </PropertyIsEqualTo> 
   <PropertyIsEqualTo> 
     <PropertyName>NAME</PropertyName> 
     <Literal>fire</Literal> 
   </PropertyIsEqualTo>  
</Or>  
</Not>
</Filter>

```



![1616383184203](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021048020.png)  

#### 4.表达式

 **过滤器表达式**指定常量，变量或计算的数据值。表达式由以下元素之一构成（其中一些包含子表达式，这意味着表达式可以具有任意深度）： 

##### 4.1算术运算符

 该**算术运算**单元计算的数值运算。 

###### 4.1.1 将两个操作数相加 (Add)



```xml
<Add>
	<PropertyName>cat</PropertyName>
	<Literal>2</Literal>
</Add> 

```

**示例**

```json
http://localhost:8080/geoserver/sf/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=sf:bugsites
&styles=
&bbox=590223.4382724703,4914107.882513998,608462.4604629107,4920523.89081033
&width=768
&height=330
&srs=EPSG:26713
&format=image%2Fpng
&filter=<Filter xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">
   <PropertyIsEqualTo> 
	<Add>
		<PropertyName>cat</PropertyName>
		<Literal>2</Literal>
	</Add> 
     <Literal>3</Literal> 
   </PropertyIsEqualTo> 
</Filter>


```

![1616388921426](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021048021.png)

###### 4.1.2 从第一个操作数中减去第二个操作数 (Sub)



```xml
<Sub>
	<PropertyName>cat</PropertyName>
	<Literal>2</Literal>
</Sub> 

```

**示例**

```json
http://localhost:8080/geoserver/sf/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=sf:bugsites
&styles=
&bbox=590223.4382724703,4914107.882513998,608462.4604629107,4920523.89081033
&width=768
&height=330
&srs=EPSG:26713
&format=image%2Fpng
&filter=<Filter xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">
   <PropertyIsEqualTo> 
	<Sub>
		<PropertyName>cat</PropertyName>
		<Literal>2</Literal>
	</Sub> 
     <Literal>3</Literal> 
   </PropertyIsEqualTo> 
</Filter>


```



![1616388939663](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021048022.png)

###### 4.1.3 将两个操作数相乘 (Mul)



```xml
<Mul>
	<PropertyName>cat</PropertyName>
	<Literal>2</Literal>
</Mul> 

```

**示例**

```json
http://localhost:8080/geoserver/sf/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=sf:bugsites
&styles=
&bbox=590223.4382724703,4914107.882513998,608462.4604629107,4920523.89081033
&width=768
&height=330
&srs=EPSG:26713
&format=image%2Fpng
&filter=<Filter xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">
   <PropertyIsEqualTo> 
	<Mul>
		<PropertyName>cat</PropertyName>
		<Literal>2</Literal>
	</Mul> 
     <Literal>100</Literal> 
   </PropertyIsEqualTo> 
</Filter>


```



![1616388992013](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021048023.png)

###### 4.1.4 将第一个操作数除以第二个 (Div)



```xml
<Div>
	<PropertyName>cat</PropertyName>
	<Literal>2</Literal>
</Div> 

```

**示例**

```json
http://localhost:8080/geoserver/sf/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=sf:bugsites
&styles=
&bbox=590223.4382724703,4914107.882513998,608462.4604629107,4920523.89081033
&width=768
&height=330
&srs=EPSG:26713
&format=image%2Fpng
&filter=<Filter xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">
   <PropertyIsEqualTo> 
	<Div>
		<PropertyName>cat</PropertyName>
		<Literal>2</Literal>
	</Div> 
     <Literal>10</Literal> 
   </PropertyIsEqualTo> 
</Filter>


```

![1616389031819](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021048024.png)

##### 4.2功能

`<Function>`元素指定要被评估的滤波器功能。required`name`属性提供函数名称。元素包含一系列零个或多个提供功能参数值的[Expression](https://docs.geoserver.org/2.12.2/user/filter/filter_reference.html#filter-expression)元素。 

 有关GeoServer提供的功能的详细信息，请参见过[滤器功能参考](https://docs.geoserver.org/2.12.2/user/filter/function_reference.html#filter-function-reference)。 

**语法**

```xml
<Function name="geometryType">
	<PropertyName>geom</PropertyName>
</Function>

```

**示例**

显示几何类型为Point的数据

```json
http://localhost:8080/geoserver/tiger/wms?
service=WMS
&version=1.1.0
&request=GetMap
&layers=tiger:poi
&styles=
&srs=EPSG:4326
&bbox=-74.047185,40.679648,-73.90782,40.882078
&width=528
&height=768
&format=image%2Fpng
&filter=<Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">  
       <PropertyIsEqualTo>
          <Function name="geometryType">
             <PropertyName>the_geom</PropertyName>
          </Function>
          <Literal>Point</Literal>
       </PropertyIsEqualTo>
</Filter>

```



#### 4.3属性值

 `<PropertyName>`元件是指一种特征属性的值。它包含指定属性名称的**字符串**或**XPath表达式**。 

**语法**

```xml
<PropertyName>the_geom</PropertyName>

```



#### 4.4文字

 `<Literal>`元素指定的恒定值。它包含以下类型之一的数据： 

| **类型** | **描述**                                                     |
| -------- | ------------------------------------------------------------ |
| 数字     | 代表数字值（整数或十进制）的字符串。                         |
| 布尔型   | `true`或的布尔值`false`。                                    |
| 串       | 字符串值。通过使用**字符实体**或` `]]>`定界符可以包含XML不兼容的文本。 |
| 日期     | 代表日期的字符串。                                           |
| 几何     | 指定GML3格式的几何的元素。                                   |

**语法**

```xml
<Literal>Point</Literal>

```



### 5. WFS 2.0命名空间

 WFS 2.0不依赖任何一个GML版本，因此需要GML的显式名称空间和schemaLocation。在GET请求中，可以将名称空间放置在Filter元素（即`filter=`下面的块，URL编码）上： 

```xml
<fes:Filter 
        xmlns:fes = “http://www.opengis.net/fes/2.0” 
        xmlns:gml = “http://www.opengis.net/gml/3.2”> 
    <fes:Not> 
        <fes :Disjoint> 
            <fes:ValueReference> sf:the_geom </fes:ValueReference> 
            <gml:Polygon 
                    gml:id = “polygon.1” 
                    srsName = 'http://www.opengis.net/def/crs/EPSG/0/26713'> 
                <gml:exterior> 
                    <gml:LinearRing> 
                        <gml:posList> 590431 4915204 590430
                            4915205 590429 4915204 590430
                            4915203 590431 4915204 </gml:posList> 
                    </gml:LinearRing> 
                </gml:exterior> 
            </gml:Polygon> 
        </fes:Disjoint> 
    </fes:Not> 
</fes:Filter>

```

