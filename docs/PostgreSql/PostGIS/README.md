# PostGIS

## 资源

https://www.postgresql.org/

http://www.postgis.org/
http://postgis.net/install/
http://postgis.net/windows_downloads/
https://live.osgeo.org/zh/quickstart/postgis_quickstart.html
http://blog.csdn.net/longshengguoji/article/details/47321733
http://blog.csdn.net/horses/article/details/41758345
http://postgis.net/documentation/

## 安装

打开Builder

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261135038.jpeg) 

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261135103.jpeg) 

选择PostGIS

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261135139.jpeg)一直下一步获取postGIS安装包

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261135978.jpeg) 

双击安装

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261135099.jpeg) 

安装	同时默认创建空间数据库

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261135101.jpeg) 

 

安装路径

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261135594.jpeg) 

设置PostGIS用户名密码，默认端口：5432  postgres  z892105346

HZGZSoftPostGre

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261135603.jpeg) 

设置空间数据库名

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261135685.jpeg)

## 导入



路径和名称中不要出现中文,shp文件要使用utf-8编码
(1)打开工具

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261137889.jpeg)



![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261137739.jpeg)



(2)连接数据库

![1605774302616](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261137708.png)

（3）选择shp文件

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261137775.jpeg)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261137790.jpeg)

(4)修改参数

Tbale:表示要导入哪张表(***\*slzy_xz_年份\****),年份必须对,否则会导入到其他年份的数据中

GeoColumn:图形字段(shape)

SRID:坐标系(4490)

Model:对表的操作(Create:新建表,Append追加到已有表,Delete:删除已有表,重新创建)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261137777.jpeg)

（5）点击import导入

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261137391.jpeg)

## 常用代码

### 1.查询几何图形四至

```sql
select st_xmin(shape),st_xmax(shape),st_ymin(shape),st_ymax(shape) from ab_cun_2019 limit 1
```

![1602818329964](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261138968.png)

### 2.查询几何图形中心点

```sql
select st_centroid(shape) from ab_cun_2019 limit 1
```



### 3.查询点的X,Y值

```sql
select st_x(st_centroid(shape)),st_y(st_centroid(shape)) from ab_cun_2019 limit 1

```

![1602818765553](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261138781.png)

### 1.三维转二维

```sql
update slzy_gyl_chxw set geom=st_force_2d(geom)
```

### 2.坐标系转换

```sql
update slzy_gyl_chxw set geom=st_transform(geom,4490)
```

### 1.栅格数据入库

```c
//【】是通常需要修改的部分，大部分都默认即可（文件位置，数据命名，数据库名）
raster2pgsql -s 4326 -I -C -M 【D:\guizhou\raster.tif】 -F -t 256x256 【guizhou】 | psql -h localhost -p 5432 -U postgres -d 【GeoDataDB】 -W
```



###  2.根据经纬度查询高程 

```c
SELECT  ST_Value(rast,1, ST_SetSRID(ST_Point(119.0882851, 27.7242960), 4490)) As b1pval 
FROM dgx_zj2
```

## 其他

### 查询优化之空间索引失效

**一 前言**

经常有朋友问，为什么我已经建立了空间索引，在空间查询和空间分析时候还是这么慢？是不是PostGIS不行？经常质疑xx不行的人以后应当谨慎点，因为以我个人的经验来看，通常情况都是是使用的人的问题。众所周知，sql是一门非常灵活的查询语言，同一个需求可以有很多种sql表达式实现，不同实现方式性能差异可能很大，在进行空间查询优化的时候首先要明确什么原因导致查询变慢的，本文总结Spatial SQL查询较慢主要原因如下：

- 建立空间索引的图形列通过表达式、函数、类型转换后导致索引失效。
- 部分空间函数根本不会走空间索引。
- 索引效率低，IO与CPU放大严重。

本文主要阐述索引失效的原因和解决办法。



**二 索引失效案例**

  **2.1 表达式导致索引失效

**

索引失效是sql中新手每天都要问的问题，在关系表的查询时候，有很多sql教程要求我们应该这样，不该这样，如表达式不能放左边，假如test表的value字段建立了btree索引，这样的查询语句就是不走索引的：**
**

- 

```
select * from test where (value+2)<10;
```

修改如下就走索引了：

- 

```
select * from test where value<(10-2);
```

很多空间索引查询的准则和关系表是完全一致的，因为对建立索引的字段进行表达式操作，得到的是一份新数据了，和基于原数据构造的索引已经风马牛不相及了（表达式索引除外）。



测试场景：已知250万POI点，查询“我的位置”附近一公里内全部的poi点。

```sql
create table poi(  gid serial primary key,  name text,  geom geometry(Point,4326));create index poi_geom_idx on poi using gist(geom);--区域内构造测试数据insert into poi(geom)select (st_dump(ST_GeneratePoints(  ST_MakeEnvelope(113,24,125,35,4326),  2500000))).geom;
```

![图片](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261138608.webp)

附近的xx**
**

**方案一**：对每个poi点缓冲1公里，判定缓冲区内是否包含“我的位置”：



```sql
explain select a.* from poi a where ST_Intersects(  ST_Buffer(a.geom,0.01),   ST_SetSrid(ST_MakePoint(118.3749,32.0987),4326));                                                                    QUERY PLAN                                                                     ---------------------------------------------------------------------------------------------------------------------------------------------------- Gather  (cost=1000.00..52115609.00 rows=250 width=68)   Workers Planned: 2   ->  Parallel Seq Scan on poi a  (cost=0.00..52114584.00 rows=104 width=68)         Filter: st_intersects(st_buffer(geom, '0.01'::double precision, ''::text), '0101000020E61000004ED1915CFE975D40BF0E9C33A20C4040'::geometry) JIT:   Functions: 2   Options: Inlining true, Optimization true, Expressions true, Deforming true(7 rows)Time: 145.681 ms
```

查看以上语句执行规划，走的是顺序扫描（seq scan on poi），并没有走空间索引，原因是我们对poi的geom建立索引，但是查询时候，对geom进行了缓冲操作，违反表达式放右边的规则，方案一结果正确，实现错误。

**方案二**：根据“我的位置”缓冲1公里，判断缓冲区内有哪些poi点：



```sql
explain select a.* from poi a where ST_Intersects(  a.geom,   st_buffer(ST_SetSrid(ST_MakePoint(118.3749,32.0987),4326),0.01));                            QUERY PLAN                                                                     ----------------------------------------------------------------------------- Index Scan using poi_geom_idx on poi a  (cost=0.41..149.50 rows=5 width=68)
```

方案二结果正确，实现正确。
   **方案三**：使用ST_Distance实现，就是判定poi点与我的位置之间距离小于1公里即可，很明显是遍历poi点与我的位置的距离做判断。



```sql
explain select a.* from poi a where ST_Distance(a.geom,ST_SetSrid(ST_MakePoint(118.3749,32.0987),4326))<0.01;                                                           QUERY PLAN                                                           -------------------------------------------------------------------------------------------------------------------------------- Gather  (cost=1000.00..26159854.80 rows=833333 width=68)   Workers Planned: 2   ->  Parallel Seq Scan on poi a  (cost=0.00..26075521.50 rows=347222 width=68)         Filter: (st_distance(geom, '0101000020E61000004ED1915CFE975D40BF0E9C33A20C4040'::geometry) < '0.01'::double precision) JIT:   Functions: 2   Options: Inlining true, Optimization true, Expressions true, Deforming true(7 rows)Time: 1.015 ms
```

方案三：结果正确，走的是顺序扫描（seq scan on poi）不走索引，实现错误。



**方案四**：使用ST_DWithin实现，走的空间索引。



```sql
explain select a.* from poi a where ST_DWithin(  a.geom,ST_SetSrid(ST_MakePoint(118.3749,32.0987),4326),0.01);                                                         QUERY PLAN                                                          ----------------------------------------------------------------------------------------------------------------------------- Index Scan using poi_geom_idx on poi a  (cost=0.54..149.62 rows=250 width=68)   Index Cond: (geom && st_expand('0101000020E61000004ED1915CFE975D40BF0E9C33A20C4040'::geometry, '0.01'::double precision))   Filter: st_dwithin(geom, '0101000020E61000004ED1915CFE975D40BF0E9C33A20C4040'::geometry, '0.01'::double precision)(3 rows)
```

方案四：结果正确，实现正确，性能最佳。

**
**

**2.2 图形函数与图形类型转换导致索引失效**

回到上文的案例，计算我的位置1公里内的poi，上文使用的是经纬度0.01近似表达（1度约111km），如果想用使用精确距离，可以使用geography类型去参与计算：



```sql
explain select a.* from poi a where ST_DWithin(a.geom::geography, ST_SetSrid(ST_MakePoint(118.3749,32.0987),4326)::geography,1000);                                                                   QUERY PLAN                                                                   ------------------------------------------------------------------------------------------------------------------------------------------------ Gather  (cost=1000.00..26076546.50 rows=250 width=68)   Workers Planned: 2   ->  Parallel Seq Scan on poi a  (cost=0.00..26075521.50 rows=104 width=68)         Filter: st_dwithin((geom)::geography, '0101000020E61000004ED1915CFE975D40BF0E9C33A20C4040'::geography, '1000'::double precision, true) JIT:   Functions: 2   Options: Inlining true, Optimization true, Expressions true, Deforming true(7 rows)
```

为了计算的准确，一不小心将geom从geometry类型转换到geography类型，导致基于geometry类型建立的索引失效了， 走的是顺序扫描（seq scan on poi）。 

那么如何既要保证计算的精度又要保证计算的性能咧？比如上文不得不用geography类型，我们可以通过pg的表达式索引去优化：



```sql
--对必须要进行类型转换计算，可以预先建立表达式索引create index poi_geogra_idx on poi using gist((geom::geography));--查询计划explain select a.* from poi a where ST_DWithin(a.geom::geography, ST_SetSrid(ST_MakePoint(118.3749,32.0987),4326)::geography,1000);                                                                    QUERY PLAN                                                                    -------------------------------------------------------------------------------------------------------------------------------------------------- Bitmap Heap Scan on poi a  (cost=14.47..7181.94 rows=250 width=68)   Filter: st_dwithin((geom)::geography, '0101000020E61000004ED1915CFE975D40BF0E9C33A20C4040'::geography, '1000'::double precision, true)   ->  Bitmap Index Scan on poi_geogra_idx  (cost=0.00..14.41 rows=250 width=0)         Index Cond: ((geom)::geography && _st_expand('0101000020E61000004ED1915CFE975D40BF0E9C33A20C4040'::geography, '1000'::double precision))(4 rows)Time: 0.813 ms
```

好了这下开始根据空间索引扫描了，完美的既保证了查询的精确度又保证了查询的效率。

**三 优化总结

**

- 同一个空间查询业务，可以同时有很多种Spatial SQL可以达到同样的查询结果，一定要仔细分析判定哪些方案根本就不能用，能用的方案对比下哪个性能更好。
- 原则上不要对建立空间索引的图形列在业务应用时对其进行表达式计算或强制类型转换，这会导致索引失效。
- 特殊情况下，可以通过建立表达式索引兼顾业务功能和查询性能。





转自:

https://mp.weixin.qq.com/s?__biz=Mzg2OTUxMzM2MA==&mid=2247483851&idx=1&sn=401ad6484790d73b828cd213316fd904&chksm=ce9aa034f9ed29228ca4503ec5eb6bcafb70656418100f76c67a05100cb9e450d9bde8ea3176&mpshare=1&scene=23&srcid=050655ivnGapJYNifC2YrUIa&sharer_sharetime=1620258460341&sharer_shareid=20c00a3d7cad01da7fb3739ea9141726#rd

### 等值面压盖快速批量裁剪（clip)

面压盖是GIS数据处理中非常常见的场景，熟悉ArcMap的朋友应该清楚，可以使用软件提供的clip工具，很方便的处理两个面之间的裁剪工作，但是这个桌面软件只是手动当个操作，想支持批量就要写各种程序了。本文提供了一种基于PostGIS的sql脚本去实现压盖面快速裁剪的解决方案，重点在于支持批量操作且性能卓越。



**一 名词解释** 

    为了让更多的读者清楚，所以简单解释下什么是压盖面，什么是clip操作。

![图片](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261138584.webp)

  压盖面

   如上图，两个面，他们有共同的一块区域，这就是“面的压盖”问题，但是，真实地理空间里，同一类型的面数据通常都是互斥的，例如房屋面，不可能存在一个面，既在A房屋内，又在B房屋内，这是显而易见的问题，再比如等值面，不可能等值面数值A的区域与等值面数值B的区域有重叠区域，这也明显违反等值面的互斥特性。所以，通常遇到这种数据，都是要处理的，针对这种面状数据的裁剪专业名词叫"clip"。clip就是以某一个面为基准，去裁剪其他的压盖面，如下图所示：

![图片](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261138584.webp)

保留A，用A裁剪B



![图片](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261138584.webp)

保留B，用B裁剪A



   通过图形示意，想必大多数读者都明白什么是面压盖，为什么要裁剪面压盖，裁剪规则和结果是什么了。

**二 技术点说明**

   在PostGIS的矢量函数中是没有Clip方法的，但是有个功能相似的函数ST_Difference，输入图形AB，得到A图形与B图形不同的部分，反过来理解就是就是保留图形B，用图形B去裁剪A，如下图示意：

![图片](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261138584.webp)

```sql
SELECT ST_AsText(  ST_Difference(    'LINESTRING(50 100, 50 200)'::geometry,    'LINESTRING(50 50, 50 150)'::geometry  ));st_astext--------------------------LINESTRING(50 150,50 200)
```



    ST_Difference函数非常简单，但实际数据处理场景非常复杂，因此，在实际应用前，先得介绍下基本操作。

 示例一：一个简单面裁剪另一个简单面

![图片](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261138611.webp)



```sql
select st_astext(st_difference(  ST_MakeEnvelope(118,32,119,33, 4326),  ST_MakeEnvelope(118.5,32,119.5,33, 4326)));st_astext------------------------------------------------POLYGON((118 33,118.5 33,118.5 32,118 32,118 33))
```

示例二：一个简单面批量裁剪多个简单面



![图片](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261138854.webp)



```sql
--建立测试表create table test_pg(  gid serial primary key,  geom geometry(Polygon,4326));--插入测试数据insert into test_pg(geom) values (ST_MakeEnvelope(118,32,119,33, 4326)),(ST_MakeEnvelope(118,33,119,34, 4326));--批量裁剪update test_pg set geom = st_difference(  geom,ST_MakeEnvelope(118.5,32,119.5,34, 4326));
```

通过示例一二，我们基本掌握如何裁剪压盖面和批量裁剪压盖面。但真实业务场景会比示例复杂很多，例如，所要处理的面是多义面，且面图形异常复杂不规则，且数据量较大，在数据查询和数据编辑将耗费非常大的成本，在下一章节将选择一个真实的业务场景介绍如何优化。

​    

**三 真实业务场景**

**场景介绍：**气象领域通常用格点生成等值面用于分析和可视化，在使用各种五花八门的工具生成等值面后，得到大量存在压盖的面数据，如下图：

![图片](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261138875.webp)

   全局图

放大仔细看的话，很容易看到不同等值面会有压盖的情况：

![图片](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261138741.webp)

局部图（无处不在的压盖）



上一章节介绍了如何使用ST_Difference函数，我们这可以简单使用测试下。

测试数据是根据格点生成10、15、20、至70的等值面，由于值越高的数据越重要，所以裁剪的时候，是选择保留高值，裁剪低值等值面：



```sql
--从等值面表中，选择值为10和值为15的两个等值面，用15裁剪10select st_difference(t1.geom,t2.geom) from    (select geom from test_pg where data_value=10) t1,    (select geom from test_pg where data_value=15) t2;ERROR:  lwgeom_difference_prec: GEOS Error: TopologyException: Input geom 0 is invalid: Too few points in geometry component at...SQL state: XX000
```

结论：数据非常复杂，不仅存在肉眼可见的压盖，还有人眼无法识别的图形topo错误，想正确处理这些数据还是很困难的。



**待解决问题：**因此，需要停下来分析下数据存在哪些问题，得逐步把各种问题解决了，才能正确解决图形压盖，数据经过分析存在以下问题：

- 图形Multi类型，复杂，查询和处理效率一定很低，为了降低处理难度和提升处理速度，将图形从多义图形分解成单义图形是很好的思路，这种思路应该形成一个规则，一看到多义图形，首先看是否有拆分的必要。
- 图形存在topo错误。
- 图形不平滑，看着有点丑。
- 图形存在压盖问题。



**四 技术方案分解**

- **Multi拆分**

将已知的10个多义面拆分成三千多个单义面，每个多义面还是很复杂的看起来：

```sql
create table test_pg_single(  gid serial primary key,  data_value int,  geom geometry(Polygon,4326));INSERT INTO test_pg_single(data_value,geom) SELECT a.data_value,ST_GeometryN(a.geom, n) As geom FROM test_pg a CROSS JOIN generate_series(1,10000) n WHERE n <= ST_NumGeometries(a.geom);--拆分前select Count(*) from test_pg; count -------    10--拆分后select Count(*) from test_pg_single; count ---------  3448
```

- **处理topo错误**

删除polygon中顶点重复的点：

```sql
update test_pg_single set geom= ST_RemoveRepeatedPoints(geom);
```

创建topo修正后的结果表：



```sql
create table test_pg_topo(  gid serial primary key,  data_value int,  geom geometry(Polygon,4326));
```

使用ST_MakeValid函数修正topo，该函数会不删除任何顶点的前提下自动修复一些topo错误，但形成的结果有时候会是图形集合（geometryCollection)，因此使用st_dump函数对集合拆分下：



```sql
with temp_table as (select data_value,(st_dump(ST_MakeValid(geom))).geom from test_pg_single) insert into test_pg_topo(data_value,geom) select data_value,geom from temp_table where GeometryType(geom)='POLYGON';--修正topo后的数据量select Count(*) from test_pg_topo; count ---------  3538
```

- **平滑**

问题数据都被修正完了，但是之前看图形有点突兀，我们使用PostGIS自带的平滑函数给数据“美颜”下：

```sql
update test_pg_topo set geom = ST_ChaikinSmoothing(geom);
```

![图片](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261138696.webp)

美颜前

![图片](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261138064.webp)

美颜后

美颜后，突兀的图形平滑了很多，看着舒服了，但正如很多姑娘喜欢反复倒腾修图一样，人对美的追求是停不下来的，如果你还想更平滑一点也没关系，再执行一次平滑函数：

```sql
update test_pg_topo set geom = ST_ChaikinSmoothing(geom);
```

![图片](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261138074.webp)

二次美颜

至此，数据拆分，修正，美颜都完成了，除了压盖，这份数据看起来妥妥的了。。。

- 压盖裁剪

裁剪不是胡切，也是要讲究规矩的，我们认为等值面值更高的数据更有价值，值低的数据可以被裁剪，我们会对数据进行排序裁剪，首先看下目前有哪些分界值：

```sql
select distinct(data_value) from test_pg_topo order by data_Value; data_value ------------         10         15         20         25         30         35         40         45         50         55(10 rows)
```

然后先建立个临时表，因为裁剪的结果也可能是复杂的多义面或图形集合：

```sql
create table test_pg_temp(   data_value numeric,   geom geometry);ALTER TABLE test_pg_temp ALTER COLUMN geom SET STORAGE EXTERNAL;CREATE INDEX test_pg_temp_idx ON test_pg_temp USING gist(geom);
```

写个脚本按照顺序裁剪下：

```sql
do language plpgsql $$   DECLARE     rec record;  i int; BEGIN   --预先插入最低值  insert into test_pg_temp select data_value,geom from test_pg_topo   where data_value=10;    --最大值为55  for i in 15..55 by 5 loop     for rec in select data_value,geom from test_pg_topo where      data_value=i loop      --剪切的图形一定是存在 相交 关系的 ，且用高值裁低值      update test_pg_temp set geom=ST_Difference(geom,rec.geom)       where data_value<i and st_intersects(geom,rec.geom);      insert into test_pg_temp values (rec.data_value,rec.geom);    end loop;  end loop;end;  $$
```

经过漫长的执行过程，我们成功裁剪完毕，耗时176461.639 ms (02:56.462)：

![图片](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261138121.webp)

裁剪前

![图片](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261138432.webp)

裁剪后

裁剪后，原先深色重叠区域已经没有了，得到了又平滑又没有压盖的等值面，美中不足的是耗时太长，和我们说的快速处理并不匹配啊，**性能很慢的问题出在哪？**


仔细检查下处理脚本，它在裁剪的时候查询条件有data_vaue还有空间查询St_Intersect函数，关于是否对data_vaue建立btree索引可以说是无关紧要的，这里满打满算也才3000多行记录。所以可以确定的是性能慢的主要原因是**空间查询和空间计算太慢了，**任意提取有个等值面如下图：

![图片](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261139361.webp)

上图可知，等值面图形很不规则，按照空间索引去查，通常先根据图形的bbox（红框）去查询数据，对查询到的数据进行filter过滤，那么如果bbox越大，但是空白地方越多（红斜线区域），代表IO和CPU放大越严重，我们以此为突破点，对等值面进行更细的切割后去检索关联数据，然后再裁剪。修改后的脚本如下：

```sql
do language plpgsql $$   DECLARE    rec record;    i int; BEGIN   --预先插入最低值  insert into test_pg_temp select data_value,ST_SubDivide(geom,600)   from test_pg_topo where data_value=10;    for i in 15..55 by 5 loop    --最大值为55       for rec in select data_value,geom from test_pg_topo        where data_value=i loop      --剪切的图形一定是存在 相交 关系的 ，且用高值裁低值          update test_pg_temp set geom=ST_Difference(geom,rec.geom)           where ctid=any(array(            select t1.ctid from test_pg_temp t1,(            select * from ST_SubDivide(rec.geom,600) as geom) as t2             where t1.data_value<i and ST_Intersects(t1.geom,t2.geom)            )            );          insert into test_pg_temp values (rec.data_value,ST_SubDivide(rec.geom,600));        end loop;    end loop;end;  $$;
```

执行后耗时：3517.753 ms (00:03.518)，我们从耗时3分钟减小到4s就完成了几千个等值面的裁剪工作。

- 临时表迁移正式表

临时表结果都是正确的，且平滑的，性能是杠杠的，但是图形是geometry，不明确的类型，因为裁剪后的图形可能是polygon也可能是multipolygon或geometrycollection，因此，建立一个图形类型明确的正式表，将数据迁移进去：



```sql
create table test_pg_result(  gid serial primary key,  data_value int,  geom geometry(Polygon,4326));create index test_pg_result_geom_idx on test_pg_result using gist(geom);--迁移insert into test_pg_result(data_value, geom)   select data_value, (st_dump(geom)).geom from test_pg_temp;
```

数据处理已经结束了，如果读者查看数据，会发现最终的数据呈现如下：

![图片](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261138690.webp)

数据好像被刀整整齐齐切过了一样，我们需要合并吗？并不需要，就这样了，这已经是最好的数据了，无论用于可视化还是空间分析，都已经将io和cpu放大问题彻底解决了，**我们并不需要去把“刀口”缝合上！**

**空间分析参考：基于PostGIS叠加分析优化--气象预警分析案例实践 - 简书 (jianshu.com)**

**可视化参考：[PostGIS矢量切片技术助力GIS可视化 (qq.com)](https://mp.weixin.qq.com/s?__biz=Mzg2OTUxMzM2MA==&mid=2247483754&idx=1&sn=228e788c3f846ffa5f75fd763e5bafd7&chksm=ce9aa095f9ed2983df2d418750ef1ea0124f6041b404e27c3920511d91a9587008c2a5246eed&token=2021880545&lang=zh_CN&scene=21#wechat_redirect)**



**五 知识点**

本文使用了PostGIS函数列表如下：

**ST_GeometryN：根据序号获取图形子图元。**

**ST_RemoveRepeatedPoints：删除重叠顶点。**

**ST_MakeValid：不删除任何顶点情况下修复图形topo错误。**

***\*ST_Dump：将图形集合或多义面快速拆分成单体图形。\****

***\*GeometryType：判定图形的类型，点？线？面？\****

***\*ST_ChaikinSmoothing：线面平滑算法\****

***\*ST_Difference：图形A与B的求异，反函数应该是ST_Intersection,返回图形AB的交集。\****

***\*ST_SubDivide：快速将一大图形切割成很小的一堆图形块，是降低IO与CPU放大的利器。\****



很多GIS从业者喜爱用cs软件操作数据，cs通常很不灵活，不能批处理，也有很多喜欢python处理的，但其实你熟悉postgis，它也是一个非常理想的gis处理软件，毕竟数据都在数据库中，毕竟你只用sql就操作了数据相比写代码简单了很多，PostGIS比你想象的能做的更多更好，希望更多的GISer挖掘如何用postgis处理空间数据吧。。。





参考:

https://mp.weixin.qq.com/s?__biz=Mzg2OTUxMzM2MA==&mid=2247483821&idx=1&sn=cc18366cbfe36ce750397a62126f21a5&chksm=ce9aa052f9ed294460b916a7b7cf283f9ad0d46e607f193ac3f11627692f72940e1c7007aa07&scene=132#wechat_redirect

### 如何用图形关系去关联数据

https://mp.weixin.qq.com/s?__biz=Mzg2OTUxMzM2MA==&mid=2247483849&idx=1&sn=f4a6e80ad4834dfc5a5c0c84206fa3e8&chksm=ce9aa036f9ed292027ffd3789b32306d405a12fe0c778b1fc3125925ad134c6ca90652ef2b41&mpshare=1&scene=23&srcid=0505m430cPTHZW0gxEJ1N75k&sharer_sharetime=1620176789677&sharer_shareid=20c00a3d7cad01da7fb3739ea9141726#rd

### 2个获取中心点函数的区别



## 2个获取中心点函数的区别



2 从面内生成一点，本文采用ST_PointOnSurface函数，PostGIS中还有一个ST_Centroid函数，该函数生成图形的中心点，为什么我们本案例没有使用ST_Centroid函数？下图一眼就能看出区别：

![图片](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261140724.png)

ST_Centroid

![图片](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261140463.png)

ST_PointOnSurface

ST_PointOnSurface函数生成的点一定在面内，ST_Centroid函数是中心点，可能会在图形的外面，本例希望生成一个一定位于旧数据面内的点大概代表旧数据的位置，简化和新数据的关联判断。





参考：

https://mp.weixin.qq.com/s?__biz=Mzg2OTUxMzM2MA==&mid=2247483849&idx=1&sn=f4a6e80ad4834dfc5a5c0c84206fa3e8&chksm=ce9aa036f9ed292027ffd3789b32306d405a12fe0c778b1fc3125925ad134c6ca90652ef2b41&mpshare=1&scene=23&srcid=0505m430cPTHZW0gxEJ1N75k&sharer_sharetime=1620176789677&sharer_shareid=20c00a3d7cad01da7fb3739ea9141726#rd