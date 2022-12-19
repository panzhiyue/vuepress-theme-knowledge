## 参考资料

[arcgis for js](https://developers.arcgis.com/javascript/3/jsapi/querytask-amd.html)

[query](https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-Query.html)

## 示例地址

https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0/query?where=1%20=%20%271%27&text=&objectIds=&time=&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnZ=false&returnM=false&returnCountOnly=false&featureEncoding=esriDefault&f=pjson&outFields=*

## 参数解析

### 服务地址

https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer

这个页面提供了服务的一些信息，例如图层列表，坐标系等

![image-20221215091046746](C:/Users/Admin/AppData/Roaming/Typora/typora-user-images/image-20221215091046746.png)

### 图层地址

https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0

这个页面提供了图层的一些信息，字段列表，几何类型等

![image-20221215091148629](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/image-20221215091148629.png)

### query服务

#### 服务地址

https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0/query

![image-20221215093203675](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/image-20221215093203675.png)

#### 示例地址

https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0/query?where=&text=&objectIds=&time=&timeRelation=esriTimeRelationOverlaps&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=10&resultRecordCount=&returnExtentOnly=false&sqlFormat=none&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson

![image-20221215093343387](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/image-20221215093343387.png)

#### 参数解析

https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-Query.html

##### where  查询的sql语句

```
where = xzqhdm like '33%'
```

可以参考官网地址学习怎么拼写arcgis的sql语句 [https://pro.arcgis.com/zh-cn/pro-app/help/mapping/navigation/sql-reference-for-elements-used-in-query-expressions.htm](https://links.jianshu.com/go?to=https%3A%2F%2Fpro.arcgis.com%2Fzh-cn%2Fpro-app%2Fhelp%2Fmapping%2Fnavigation%2Fsql-reference-for-elements-used-in-query-expressions.htm)

##### text  使用“like”的 where 子句的简写

type:String



##### objectIds  用于查询图层中要素的 ObjectID 数组

```
objectIds  = 1,2,3,6,7,8
```

##### time

##### timeRelation

##### geometry  应用于空间过滤器的几何体。

##### geometryType   几何类型

##### inSR

##### spatialRel

##### distance 在空间查询中指定距给定几何的搜索距离。

##### units 空间查询指定距离时计算缓冲距离的单位。

##### relationParam

##### outFields  返回结果的属性字段。*返回所有字段

##### returnGeometry  如果`true`，则返回的FeatureSet中的每个要素都包含几何。

##### returnTrueCurves

##### maxAllowableOffset

##### geometryPrecision

##### outSR:

##### havingClause

##### returnIdsOnly

##### returnCountOnly

##### orderByFields  用于对查询结果进行排序的一个或多个字段名称。

##### groupByFieldsForStatistics

##### outStatistics

##### returnZ  如果`true`，并且returnGeometry是`true`，则 z 值包含在几何中。

##### returnM  如果`true`，并且returnGeometry是`true`，则 m 值包含在几何中。

##### gdbVersion

##### historicMoment

##### returnDistinctValues

##### resultOffset

##### resultRecordCount

##### returnExtentOnly

##### sqlFormat

##### datumTransformation

##### parameterValues

##### rangeValues

##### quantizationParameters

##### featureEncoding

##### f 

