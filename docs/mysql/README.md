# MySql



## 学习资料

官网:https://dev.mysql.com/

官方文档:https://dev.mysql.com/doc/refman/8.0/en/gis-wkt-functions.html#function_st-geomfromtext

软件下载:https://dev.mysql.com/downloads/



## 空间操作

```sql
insert into test_geometry(shape) value(ST_GeomFromText('MULTIPOLYGON (((119.550021795109799 29.52221103578114, 119.550034782391194 29.522176828678091, 119.550045921649001 29.522180059092129, 119.550085310324903 29.522076770721331, 119.550001240696503 29.522052717211121, 119.549989317523 29.522083984195131, 119.549956321116298 29.522074417957239, 119.549953977801096 29.522079491840628, 119.549948498898601 29.522084997163098, 119.549943463966102 29.522093668733689, 119.549941672578697 29.522103386051722, 119.549942484971794 29.522110007883139, 119.549940568084295 29.52211521943466, 119.549973564091502 29.522124878596681, 119.549948865674807 29.522189746243839, 119.550021795109799 29.52221103578114)))',4490,'axis-order=long-lat'))
```

## 空间函数汇总

https://blog.csdn.net/ununie/article/details/101014849

|      | 名称                                                         | 描述                                 |
| ---- | ------------------------------------------------------------ | ------------------------------------ |
| 1    | [ST_StartPoint()](https://dev.mysql.com/doc/refman/8.0/en/gis-linestring-property-functions.html#function_st-startpoint) | LineString的起始点                   |
| 2    | [ST_EndPoint()](https://dev.mysql.com/doc/refman/8.0/en/gis-linestring-property-functions.html#function_st-endpoint) | LineString的终点                     |
| 3    | [ST_Transform()](https://dev.mysql.com/doc/refman/8.0/en/spatial-operator-functions.html#function_st-transform) | 变换几何的坐标                       |
| 4    | [ST_GeoHash()](https://dev.mysql.com/doc/refman/8.0/en/spatial-geohash-functions.html#function_st-geohash) | 产生geohash值                        |
| 5    | [ST_LongFromGeoHash()](https://dev.mysql.com/doc/refman/8.0/en/spatial-geohash-functions.html#function_st-longfromgeohash) | 从geohash值返回经度                  |
| 6    | [ST_LatFromGeoHash()](https://dev.mysql.com/doc/refman/8.0/en/spatial-geohash-functions.html#function_st-latfromgeohash) | 从geohash值返回纬度                  |
| 7    | [ST_GeomFromGeoJSON()](https://dev.mysql.com/doc/refman/8.0/en/spatial-geojson-functions.html#function_st-geomfromgeojson) | 从GeoJSON对象生成几何                |
| 8    | [Polygon()](https://dev.mysql.com/doc/refman/8.0/en/gis-mysql-specific-functions.html#function_polygon) | 从LineString参数构造多边形           |
| 9    | [ST_PointN()](https://dev.mysql.com/doc/refman/8.0/en/gis-linestring-property-functions.html#function_st-pointn) | 从LineString返回第N个点              |
| 10   | [MultiLineString()](https://dev.mysql.com/doc/refman/8.0/en/gis-mysql-specific-functions.html#function_multilinestring) | 从LineString值构造MultiLineString    |
| 11   | [LineString()](https://dev.mysql.com/doc/refman/8.0/en/gis-mysql-specific-functions.html#function_linestring) | 从Point值构造LineString              |
| 12   | [MultiPoint()](https://dev.mysql.com/doc/refman/8.0/en/gis-mysql-specific-functions.html#function_multipoint) | 从Point值构造MultiPoint              |
| 13   | [MultiPolygon()](https://dev.mysql.com/doc/refman/8.0/en/gis-mysql-specific-functions.html#function_multipolygon) | 从Polygon值构造MultiPolygon          |
| 14   | [ST_GeomFromWKB()， ST_GeometryFromWKB()](https://dev.mysql.com/doc/refman/8.0/en/gis-wkb-functions.html#function_st-geomfromwkb) | 从WKB返回几何                        |
| 15   | [ST_GeomCollFromWKB()， ST_GeometryCollectionFromWKB()](https://dev.mysql.com/doc/refman/8.0/en/gis-wkb-functions.html#function_st-geomcollfromwkb) | 从WKB返回几何集合                    |
| 16   | [ST_LineFromWKB()， ST_LineStringFromWKB()](https://dev.mysql.com/doc/refman/8.0/en/gis-wkb-functions.html#function_st-linefromwkb) | 从WKB构造LineString                  |
| 17   | [ST_MLineFromWKB()， ST_MultiLineStringFromWKB()](https://dev.mysql.com/doc/refman/8.0/en/gis-wkb-functions.html#function_st-mlinefromwkb) | 从WKB构造MultiLineString             |
| 18   | [ST_MPointFromWKB()， ST_MultiPointFromWKB()](https://dev.mysql.com/doc/refman/8.0/en/gis-wkb-functions.html#function_st-mpointfromwkb) | 从WKB构造MultiPoint                  |
| 19   | [ST_MPolyFromWKB()， ST_MultiPolygonFromWKB()](https://dev.mysql.com/doc/refman/8.0/en/gis-wkb-functions.html#function_st-mpolyfromwkb) | 从WKB构造MultiPolygon                |
| 20   | [ST_PointFromWKB()](https://dev.mysql.com/doc/refman/8.0/en/gis-wkb-functions.html#function_st-pointfromwkb) | 从WKB构造点                          |
| 21   | [ST_PolyFromWKB()， ST_PolygonFromWKB()](https://dev.mysql.com/doc/refman/8.0/en/gis-wkb-functions.html#function_st-polyfromwkb) | 从WKB构造多边形                      |
| 22   | [ST_GeomFromText()， ST_GeometryFromText()](https://dev.mysql.com/doc/refman/8.0/en/gis-wkt-functions.html#function_st-geomfromtext) | 从WKT返回几何                        |
| 23   | [ST_GeomCollFromText()，ST_GeometryCollectionFromText()，ST_GeomCollFromTxt()](https://dev.mysql.com/doc/refman/8.0/en/gis-wkt-functions.html#function_st-geomcollfromtext) | 从WKT返回几何集合                    |
| 24   | [ST_PointFromText()](https://dev.mysql.com/doc/refman/8.0/en/gis-wkt-functions.html#function_st-pointfromtext) | 从WKT构建点                          |
| 25   | [ST_LineFromText()， ST_LineStringFromText()](https://dev.mysql.com/doc/refman/8.0/en/gis-wkt-functions.html#function_st-linefromtext) | 从WKT构造LineString                  |
| 26   | [ST_MLineFromText()， ST_MultiLineStringFromText()](https://dev.mysql.com/doc/refman/8.0/en/gis-wkt-functions.html#function_st-mlinefromtext) | 从WKT构造MultiLineString             |
| 27   | [ST_MPointFromText()， ST_MultiPointFromText()](https://dev.mysql.com/doc/refman/8.0/en/gis-wkt-functions.html#function_st-mpointfromtext) | 从WKT构造MultiPoint                  |
| 28   | [ST_MPolyFromText()， ST_MultiPolygonFromText()](https://dev.mysql.com/doc/refman/8.0/en/gis-wkt-functions.html#function_st-mpolyfromtext) | 从WKT构造MultiPolygon                |
| 29   | [ST_PolyFromText()， ST_PolygonFromText()](https://dev.mysql.com/doc/refman/8.0/en/gis-wkt-functions.html#function_st-polyfromtext) | 从WKT构造多边形                      |
| 30   | [GeomCollection()](https://dev.mysql.com/doc/refman/8.0/en/gis-mysql-specific-functions.html#function_geomcollection) | 从几何构造几何集合                   |
| 31   | [GeometryCollection()](https://dev.mysql.com/doc/refman/8.0/en/gis-mysql-specific-functions.html#function_geometrycollection) | 从几何构造几何集合                   |
| 32   | [ST_GeometryN()](https://dev.mysql.com/doc/refman/8.0/en/gis-geometrycollection-property-functions.html#function_st-geometryn) | 从几何集合中返回第N个几何            |
| 33   | [ST_AsGeoJSON()](https://dev.mysql.com/doc/refman/8.0/en/spatial-geojson-functions.html#function_st-asgeojson) | 从几何体生成GeoJSON对象              |
| 34   | [ST_AsBinary()， ST_AsWKB()](https://dev.mysql.com/doc/refman/8.0/en/gis-format-conversion-functions.html#function_st-asbinary) | 从内部几何格式转换为WKB              |
| 35   | [ST_AsText()， ST_AsWKT()](https://dev.mysql.com/doc/refman/8.0/en/gis-format-conversion-functions.html#function_st-astext) | 从内部几何格式转换为WKT              |
| 36   | [Point()](https://dev.mysql.com/doc/refman/8.0/en/gis-mysql-specific-functions.html#function_point) | 从坐标构造点                         |
| 37   | [ST_Length()](https://dev.mysql.com/doc/refman/8.0/en/gis-linestring-property-functions.html#function_st-length) | 返回LineString的长度                 |
| 38   | [ST_NumPoints()](https://dev.mysql.com/doc/refman/8.0/en/gis-linestring-property-functions.html#function_st-numpoints) | 返回LineString中的点数               |
| 39   | [ST_X()](https://dev.mysql.com/doc/refman/8.0/en/gis-point-property-functions.html#function_st-x) | 返回Point的X坐标                     |
| 40   | [ST_Y()](https://dev.mysql.com/doc/refman/8.0/en/gis-point-property-functions.html#function_st-y) | 返回Point的Y坐标                     |
| 41   | [ST_Longitude()](https://dev.mysql.com/doc/refman/8.0/en/gis-point-property-functions.html#function_st-longitude) | 返回Point的经度                      |
| 42   | [ST_Latitude()](https://dev.mysql.com/doc/refman/8.0/en/gis-point-property-functions.html#function_st-latitude) | 返回Point的纬度                      |
| 43   | [ST_InteriorRingN()](https://dev.mysql.com/doc/refman/8.0/en/gis-polygon-property-functions.html#function_st-interiorringn) | 返回Polygon的第N个内环               |
| 44   | [ST_ExteriorRing()](https://dev.mysql.com/doc/refman/8.0/en/gis-polygon-property-functions.html#function_st-exteriorring) | 返回Polygon的外环                    |
| 45   | [ST_Area()](https://dev.mysql.com/doc/refman/8.0/en/gis-polygon-property-functions.html#function_st-area) | 返回Polygon或MultiPolygon区域        |
| 46   | [ST_Union()](https://dev.mysql.com/doc/refman/8.0/en/spatial-operator-functions.html#function_st-union) | 返回点集两个几何的并集               |
| 47   | [ST_SymDifference()](https://dev.mysql.com/doc/refman/8.0/en/spatial-operator-functions.html#function_st-symdifference) | 返回点设置两个几何的对称差异         |
| 48   | [ST_Intersection()](https://dev.mysql.com/doc/refman/8.0/en/spatial-operator-functions.html#function_st-intersection) | 返回点设置两个几何的交集             |
| 49   | [ST_NumInteriorRing()， ST_NumInteriorRings()](https://dev.mysql.com/doc/refman/8.0/en/gis-polygon-property-functions.html#function_st-numinteriorrings) | 返回多边形内圈的数量                 |
| 50   | [ST_Envelope()](https://dev.mysql.com/doc/refman/8.0/en/gis-general-property-functions.html#function_st-envelope) | 返回几何的MBR                        |
| 51   | [ST_SRID()](https://dev.mysql.com/doc/refman/8.0/en/gis-general-property-functions.html#function_st-srid) | 返回几何的空间参考系统ID             |
| 52   | [ST_NumGeometries()](https://dev.mysql.com/doc/refman/8.0/en/gis-geometrycollection-property-functions.html#function_st-numgeometries) | 返回几何集合中的几何数量             |
| 53   | [ST_GeometryType()](https://dev.mysql.com/doc/refman/8.0/en/gis-general-property-functions.html#function_st-geometrytype) | 返回几何类型的名称                   |
| 54   | [ST_ConvexHull()](https://dev.mysql.com/doc/refman/8.0/en/spatial-operator-functions.html#function_st-convexhull) | 返回几何体的凸包                     |
| 55   | [ST_Simplify()](https://dev.mysql.com/doc/refman/8.0/en/spatial-convenience-functions.html#function_st-simplify) | 返回简化几何                         |
| 56   | [ST_Buffer()](https://dev.mysql.com/doc/refman/8.0/en/spatial-operator-functions.html#function_st-buffer) | 返回距离几何体的给定距离内的点的几何 |
| 57   | [ST_Validate()](https://dev.mysql.com/doc/refman/8.0/en/spatial-convenience-functions.html#function_st-validate) | 返回验证的几何体                     |
| 58   | [ST_Centroid()](https://dev.mysql.com/doc/refman/8.0/en/gis-polygon-property-functions.html#function_st-centroid) | 返回质心作为一个点                   |
| 59   | [ST_Dimension()](https://dev.mysql.com/doc/refman/8.0/en/gis-general-property-functions.html#function_st-dimension) | 几何尺寸                             |
| 60   | [ST_IsClosed()](https://dev.mysql.com/doc/refman/8.0/en/gis-linestring-property-functions.html#function_st-isclosed) | 几何是否封闭且简单                   |
| 61   | [ST_IsSimple()](https://dev.mysql.com/doc/refman/8.0/en/gis-general-property-functions.html#function_st-issimple) | 几何是否简单                         |
| 62   | [ST_IsValid()](https://dev.mysql.com/doc/refman/8.0/en/spatial-convenience-functions.html#function_st-isvalid) | 几何是否有效                         |
| 63   | [ST_PointFromGeoHash()](https://dev.mysql.com/doc/refman/8.0/en/spatial-geohash-functions.html#function_st-pointfromgeohash) | 将geohash值转换为POINT值             |
| 64   | [ST_SwapXY()](https://dev.mysql.com/doc/refman/8.0/en/gis-format-conversion-functions.html#function_st-swapxy) | 交换X / Y坐标的返回参数              |
| 65   | [ST_MakeEnvelope()](https://dev.mysql.com/doc/refman/8.0/en/spatial-convenience-functions.html#function_st-makeenvelope) | 两点左右的矩形                       |
| 66   | [MBREquals()](https://dev.mysql.com/doc/refman/8.0/en/spatial-relation-functions-mbr.html#function_mbrequals) | 两个几何的MBR是否相等                |
| 67   | [MBRIntersects()](https://dev.mysql.com/doc/refman/8.0/en/spatial-relation-functions-mbr.html#function_mbrintersects) | 两个几何的MBR是否相交                |
| 68   | [MBROverlaps()](https://dev.mysql.com/doc/refman/8.0/en/spatial-relation-functions-mbr.html#function_mbroverlaps) | 两个几何的MBR是否重叠                |
| 69   | [ST_Difference()](https://dev.mysql.com/doc/refman/8.0/en/spatial-operator-functions.html#function_st-difference) | 两个几何的返回点集差异               |
| 70   | [MBRDisjoint()](https://dev.mysql.com/doc/refman/8.0/en/spatial-relation-functions-mbr.html#function_mbrdisjoint) | 两个几何形状的MBR是否不相交          |
| 71   | [ST_Distance_Sphere()](https://dev.mysql.com/doc/refman/8.0/en/spatial-convenience-functions.html#function_st-distance-sphere) | 两个几何形状之间的最小地球距离       |
| 72   | [MBRTouches()](https://dev.mysql.com/doc/refman/8.0/en/spatial-relation-functions-mbr.html#function_mbrtouches) | 两种几何形状的MBR是否接触            |
| 73   | [ST_Buffer_Strategy()](https://dev.mysql.com/doc/refman/8.0/en/spatial-operator-functions.html#function_st-buffer-strategy) | 为ST_Buffer（）生成策略选项          |
| 74   | [MBRCoveredBy()](https://dev.mysql.com/doc/refman/8.0/en/spatial-relation-functions-mbr.html#function_mbrcoveredby) | 一个MBR是否被另一个MBR覆盖           |
| 75   | [MBRCovers()](https://dev.mysql.com/doc/refman/8.0/en/spatial-relation-functions-mbr.html#function_mbrcovers) | 一个MBR是否涵盖另一个MBR             |
| 76   | [MBRContains()](https://dev.mysql.com/doc/refman/8.0/en/spatial-relation-functions-mbr.html#function_mbrcontains) | 一个几何的MBR是否包含另一个几何的MBR |
| 77   | [MBRWithin()](https://dev.mysql.com/doc/refman/8.0/en/spatial-relation-functions-mbr.html#function_mbrwithin) | 一个几何的MBR是否在另一个几何的MBR内 |
| 78   | [ST_Contains()](https://dev.mysql.com/doc/refman/8.0/en/spatial-relation-functions-object-shapes.html#function_st-contains) | 一个几何是否包含另一个               |
| 79   | [ST_Touches()](https://dev.mysql.com/doc/refman/8.0/en/spatial-relation-functions-object-shapes.html#function_st-touches) | 一个几何是否接触另一个               |
| 80   | [ST_Disjoint()](https://dev.mysql.com/doc/refman/8.0/en/spatial-relation-functions-object-shapes.html#function_st-disjoint) | 一个几何是否与另一个几何脱节         |
| 81   | [ST_Equals()](https://dev.mysql.com/doc/refman/8.0/en/spatial-relation-functions-object-shapes.html#function_st-equals) | 一个几何是否与另一个几何相等         |
| 82   | [ST_Crosses()](https://dev.mysql.com/doc/refman/8.0/en/spatial-relation-functions-object-shapes.html#function_st-crosses) | 一个几何是否与另一个几何相交         |
| 83   | [ST_Intersects()](https://dev.mysql.com/doc/refman/8.0/en/spatial-relation-functions-object-shapes.html#function_st-intersects) | 一个几何是否与另一个相交             |
| 84   | [ST_Overlaps()](https://dev.mysql.com/doc/refman/8.0/en/spatial-relation-functions-object-shapes.html#function_st-overlaps) | 一个几何是否与另一个重叠             |
| 85   | [ST_Within()](https://dev.mysql.com/doc/refman/8.0/en/spatial-relation-functions-object-shapes.html#function_st-within) | 一个几何是否在另一个之内             |
| 86   | [ST_Distance()](https://dev.mysql.com/doc/refman/8.0/en/spatial-relation-functions-object-shapes.html#function_st-distance) | 一个几何与另一个几何的距离           |
| 87   | [ST_IsEmpty()](https://dev.mysql.com/doc/refman/8.0/en/gis-general-property-functions.html#function_st-isempty) | 占位符功能                           |





## 其他

### 1.8以上修改密码

https://blog.csdn.net/weixin_41463971/article/details/88010770

```sql
ALTER USER 'test'@'localhost' IDENTIFIED WITH MYSQL_NATIVE_PASSWORD BY '新密码';

```

### 2.修改坐标轴顺序

最近准备使用mySQL存储空间坐标，遇到了一个比较麻烦的问题，下面记录一下并给出解决方案。

#### 问题描述

mySQL8版本之后对空间函数做了一些不兼容之前版本的修改

（1）空间函数名前面加ST_（这导致低版本Geoserver不支持高版本的mySQL），直接把Geoserver升级到最新文档版本18.4，之后不在说明。

```sql
Caused by: java.sql.SQLSyntaxErrorException: FUNCTION test11.asWKB does not exist
```

（2）经纬度顺序从（经度-维度）改为（维度-经度）

![1629078957980](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208011013306.png)

#### 问题分析

##### （1）创建表并添加空间数据

```sql
CREATE TABLE `test_geometry`  (
  `id` int NOT NULL,
  `shape` geometry NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

insert into test_geometry(id,shape) values(1,ST_GeomFromText('MULTIPOLYGON (((120.300450309302803 28.962115120622599, 120.300449566580099 28.962115131303559, 120.300449893561705 28.96215234187348, 120.300490507107398 28.96215166471854, 120.300491399721693 28.962155244595049, 120.300555105971895 28.962149110105059, 120.300538652857995 28.962116008244969, 120.300492698170601 28.96211817791027, 120.300492627511403 28.96211449198988, 120.300491400507298 28.962038278938941, 120.300447452527905 28.96203956397715, 120.300448098949104 28.962056654911422, 120.300450309302803 28.962115120622599)))',4326))
```

![1629075192916](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208011013294.png)

错误：维度必须在[-90,90]之间

在mySQL中默认维度在前面，经度在后面，所以120就超出了维度范围

##### （2）调换顺序

https://dev.mysql.com/doc/refman/8.0/en/gis-wkt-functions.html

mySQL提供了设置坐标顺序的参数

-  **lat-long**:维度-经度
-  **long-lat**:经度-维度
-  **srid-defined**:(默认值)根据坐标系设置

修改入库语句

```sql
insert into TEST_geometry(id,shape) values(1,ST_GeomFromText('MULTIPOLYGON (((120.300450309302803 28.962115120622599, 120.300449566580099 28.962115131303559, 120.300449893561705 28.96215234187348, 120.300490507107398 28.96215166471854, 120.300491399721693 28.962155244595049, 120.300555105971895 28.962149110105059, 120.300538652857995 28.962116008244969, 120.300492698170601 28.96211817791027, 120.300492627511403 28.96211449198988, 120.300491400507298 28.962038278938941, 120.300447452527905 28.96203956397715, 120.300448098949104 28.962056654911422, 120.300450309302803 28.962115120622599)))',4326,'axis-order=long-lat'))
```

##### （3）查询

```sql
select ST_ASTEXT(SHAPE) FROM test_geometry
```

![1629077292813](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208011013298.png)

```sql
select ST_ASTEXT(SHAPE,'axis-order=long-lat') FROM test_geometry
```

![1629077325657](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208011013281.png)

#### 解决方案

通过传入配置参数我们可以修改坐标的经纬度顺序，但是对于一些第三方的地图服务，我们没法控制他们传入对应的参数。所以以上只是分析，不是最终解决方案。

通过“问题分析第二部”我们可以做到，mySQL默认读取坐标系的配置信息来觉得经纬度顺序。

![1629077730443](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208011013290.png)

空间参考系统支持:https://dev.mysql.com/doc/refman/8.0/en/spatial-reference-systems.html

##### （1）查询坐标系

```sql
SELECT *
       FROM INFORMATION_SCHEMA.ST_SPATIAL_REFERENCE_SYSTEMS
       WHERE SRS_ID = 4326
```

![1629077780792](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208011013286.png)

**definition**

```sql
GEOGCS["WGS 84",DATUM["World Geodetic System 1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.017453292519943278,AUTHORITY["EPSG","9122"]],AXIS["Lat",NORTH],AXIS["Lon",EAST],AUTHORITY["EPSG","4326"]]
```

`AXIS["Lat",NORTH],AXIS["Lon",EAST]`我们可以猜测，这段决定了经纬度的顺序，下面我们调换顺序

**修改后的definition**

```sql
GEOGCS["WGS 84",DATUM["World Geodetic System 1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.017453292519943278,AUTHORITY["EPSG","9122"]],AXIS["Lon",EAST],AXIS["Lat",NORTH],AUTHORITY["EPSG","4326"]]
```

##### （2）删除坐标系

删除之前请先备份好信息

```sql
 DROP SPATIAL REFERENCE SYSTEM 4326;
```

##### （3）创建新的坐标系

```sql
CREATE SPATIAL REFERENCE SYSTEM 4326
NAME 'WGS 84'
ORGANIZATION 'EPSG' IDENTIFIED BY 4326
DEFINITION
  'GEOGCS["WGS 84",DATUM["World Geodetic System 1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.017453292519943278,AUTHORITY["EPSG","9122"]],AXIS["Lon",EAST],AXIS["Lat",NORTH],AUTHORITY["EPSG","4326"]]';
```

##### （4）测试

插入成功

```sql
insert into test_geometry(id,shape) values(3,ST_GeomFromText('MULTIPOLYGON (((120.300450309302803 28.962115120622599, 120.300449566580099 28.962115131303559, 120.300449893561705 28.96215234187348, 120.300490507107398 28.96215166471854, 120.300491399721693 28.962155244595049, 120.300555105971895 28.962149110105059, 120.300538652857995 28.962116008244969, 120.300492698170601 28.96211817791027, 120.300492627511403 28.96211449198988, 120.300491400507298 28.962038278938941, 120.300447452527905 28.96203956397715, 120.300448098949104 28.962056654911422, 120.300450309302803 28.962115120622599)))',4326))
```

![1629078065660](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208011013700.png)

查询正确

```sql
select ST_ASTEXT(SHAPE) FROM test_geometry
```

![1629078103513](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208011013708.png)

### 3.操作指令

#### 1.mySql操作

1．mysql语句查询安装路径   select @@basedir as basePath from dual;

2．进入mysql目录			 cd c:\Program Files\MySql\MySql Server 5.7\bin

3．进入MySql			   mysql -hlocalhost -uroot -p

 

#### 2.数据库操作

1．创建数据库       create database （数据库名）

2．连接指定数据库     use  （数据库名）

3．创建一个表       create table （表名）(字段名 字段类型,..........重复)

4．列出数据库中现有的表  show tables

5．检查表结构       describe （表名）

6．限制返回的函数（非标准sql）   select * from (表名） LIMIT （行数）;   LIMT （偏移量:0开始）  （行数）  返回从偏移量行开始的行数

7．删除数据库       drop database （数据库名）

8．删除表名        drop table （表名）

9．给表添加一个字段   alter table （表名） add （字段名） （字段类型）

10．改变列的定义    alter table （表名） change （旧名称） （新名称） （类型）

11．修改表名       alter table （表名） rename （新表名）

12．删除列        alter table （表名） drop （列名）

13．返回当前日期     select now(),current_date();

14．连接列（如把姓和名连接）  select concat(first_name,'',surname) from （表名）

### 4.MySql安装错误Starting The Server

安装mysql时一直卡在starting the server这一位置，解决办法：

 

1：保持住这个页面，不用叉掉从装

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208011015146.png)

 

2：计算机--->右键--->管理。找到mysql

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208011015221.png)

3：右键--->属性--->登录

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208011015187.png)

4：点击允许服务于桌面交互，回到这一界面再一次安装

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208011015155.png)

 

