

# SpatialReference

常用方法

#### 1.SpatialReference(string wkt)

- **函数说明**

构造函数,该函数可以使用一个WKT字符串来构造一个SpatialReference对象,如果没有指定WKT字符串,可以在后面使用函数importFromWkt函数来继续构造

- **参数说明**

| 名称 | 说明                                                         |
| ---- | ------------------------------------------------------------ |
| wkt  | 指定的WKT字符串来初始化该类,使用""则初始化一个空对象，可以在后面使用函数importFromWkt函数来继续构造 |

- **示例**

```c#
string wkt = "GEOGCS[\"WGS 84\",DATUM[\"WGS_1984\",SPHEROID[\"WGS 84\",6378137,298.257223563,AUTHORITY[\"EPSG\",7030]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY[\"EPSG\",6326]],PRIMEM[\"Greenwich\",0,AUTHORITY[\"EPSG\",8901]],UNIT[\"DMSH\",0.0174532925199433,AUTHORITY[\"EPSG\",9108]],AXIS[\"Lat\",NORTH],AXIS[\"Long\",EAST],AUTHORITY[\"EPSG\",4326]]";
OSGeo.OSR.SpatialReference oSRS = new OSGeo.OSR.SpatialReference(wkt);
```



#### ~~3.Clear()~~ 

- **函数说明**

该函数用来清除当前空间参考信息



#### 4.Clone()

- **函数说明:**

用来复制一个SpatialReference对象



- **参数说明**

| 名称   | 说明                             |
| ------ | -------------------------------- |
| 返回值 | 返回一个新的SpatialReference对象 |

- **示例**

```c#
string wkt = "";
SpatialReference oSRS = new SpatialReference(wkt);
SpatialReference oSRS2=oSRS.Clone();
```



#### 5.CloneGeogCS()

- **函数说明:**

用来复制该对象中的GEOGCS节点作为一个SpatialReference对象,如果该空间参考是一个投影坐标系,该函数将把该投影坐标系中的大地坐标系系统取出来

- **参数说明**

| 名称   | 说明                                                     |
| ------ | -------------------------------------------------------- |
| 返回值 | 返回当前空间参考的大地坐标系统对应的SpatialReference对象 |



#### ~~6.CloneGeogCSFrom()~~

#### ~~7.Dereference()~~

#### ~~8.DestorySpatialReference()~~

#### 9.ExportToWktTest(out string wkt)

- **函数说明:**

将空间参考转为WKT格式的字符串。



- **参数说明:**

| 名称   | 说明                                                 |
| ------ | ---------------------------------------------------- |
| wkt    | 返回的WKT字符串存储地址                              |
| 返回值 | 目前返回值只有OGRERR_NONE,将来可能会增加其他的返回值 |



- **示例:**

```c#
string wkt = "";
SpatialReference oSRS = new SpatialReference(wkt);

string wkt2;
oSRS.ExportToWkt(out wkt2);
```



#### 10.ExportToPrettyWkt(out string wkt,int bSimplify)

- **函数说明**

该函数将空间参考转换为一种较为美观的WKT格式。

- **参数说明**

| 名称      | 说明                                                         |
| --------- | ------------------------------------------------------------ |
| wkt       | 返回的WKT字符串存储地址                                      |
| bSimplify | 如果为TRUE,那么AXIS,AUTHORITY和EXTENSION等节点也会使用回车和缩进隔开 |
| 返回值    | 目前返回值只有OGRERR_NONE,将来可能会增加其他的返回值         |



#### 11.ExportToProj4(out string proj4)

- **函数说明**

该函数将空间参考转换为PROJ.4格式。

- **参数说明**

| 名称   | 说明                                     |
| ------ | ---------------------------------------- |
| proj4  | 存储Mapinfo的CoordSys格式                |
| 返回值 | 返回OGRERR_NONE表示转换成功,其他表示失败 |

#### 12.ImportFromWkt(ref string wkt)

- **函数说明**

  通过WKT格式的字符串来设置空间参考,如果空间参考中已经有其他信息,使用该函数将会修改之前的信息。



- **参数说明**

| 名称   | 说明                                                        |
| ------ | ----------------------------------------------------------- |
| wkt    | wkt格式字符串                                               |
| 返回值 | 返回OGRERR_NONE表示设置成功,返回OGRERR_CORRUPT_DATA表示失败 |

#### 13.ImportFromProj4(string proj4)

- **函数说明**

  通过PROJ.4格式的字符串来设置控件参考。如果空间参考中已经有其他的信息,使用该函数将会修改之前的信息。

- **参数说明**

| 名称   | 说明                                     |
| ------ | ---------------------------------------- |
| proj4  | 存储Mapinfo的CoordSys格式                |
| 返回值 | 返回OGRERR_NONE表示转换成功,其他表示失败 |



#### 14.ImportFromEPSG和ImportFromEPSGA

- **函数说明**

  该函数通过EPSG的GCS或PCS代码来设置空间参考。如果空间参考中已经有其他的信息,使用该函数将会修改之前的信息。EPSG定义的代码定义在文件pcs.csv,gcs.csv,pcs.override.csv,gcs.override.csv和使用PROJ.4定义的epsg.wkt文件中

- **参数说明**

| 名称   | 说明                                     |
| ------ | ---------------------------------------- |
| nCode  | EPSG的GCS或PCS代码                       |
| 返回值 | 返回OGRERR_NONE表示设置成功,其他表示失败 |

#### 15.ImportFromESRI

- **函数说明**

       该函数通过ESRI的prj格式字符串来设置空间参考。如果空间参考中已经有其他的信息,使用该函数将会修改之前的信息。它会读取prj文件的内容，然后转换为一个SpatialReference定义。该函数支持很多(注意不是全部),老的格式(Arc/Info 7.x)的prj文件,新版本的prj文件是一种类似OGC的WKT格式。注意,新版本的prj文件属于OGC的WKT格式,但是有一些大地水准面的名字,单位和某些投影参数需要进行转换。这些转换已经在该函数中调用morphFromESRI()函数来自动完成。


   ​    

- **参数说明**



- **示例**

```c#
OSGeo.OSR.SpatialReference oSRS = new OSGeo.OSR.SpatialReference("");
string esri = "GEOGCS[\"GCS_China_Geodetic_Coordinate_System_2000\",DATUM[\"D_China_2000\",SPHEROID[\"CGCS2000\",6378137.0,298.257222101]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]]";
oSRS.ImportFromESRI(new string[] { esri });
```



#### 16.morphToESRI和morphFromESRI

- **函数说明**

1. morphToESRI转为ESRI的WKT格式的字符串
2. morphFromESRI把ESRI的WKT格式字符串转为OGC格式的WKT字符串

- **参数说明**

| 名称   | 类型 | 说明 |
| ------ | ---- | ---- |
| 返回值 |      |      |

- **示例**

```c#
string wkt = "GEOGCS[\"WGS 84\",DATUM[\"WGS_1984\",SPHEROID[\"WGS 84\",6378137,298.257223563,AUTHORITY[\"EPSG\",7030]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY[\"EPSG\",6326]],PRIMEM[\"Greenwich\",0,AUTHORITY[\"EPSG\",8901]],UNIT[\"DMSH\",0.0174532925199433,AUTHORITY[\"EPSG\",9108]],AXIS[\"Lat\",NORTH],AXIS[\"Long\",EAST],AUTHORITY[\"EPSG\",4326]]";
OSGeo.OSR.SpatialReference oSRS = new OSGeo.OSR.SpatialReference(wkt);
oSRS.MorphToESRI();
oSRS.MorphFromESRI();
```



#### 17.IsGeographic,IsProjected,IsGeocentric,IsLocal,IsVertical

函数说明

用来检查空间参考是不是某种类型的空间参考。

1. IsGeographic 用来检查是否为地理坐标系统
2. IsProjected 用来检查是否为投影坐标系统
3. IsGeocentric用来检查是否为地心坐标系统
4. IsLocal用来检查是否为地方坐标系统
5. IsVertical用来检查是否为垂直坐标系统

参数说明

| 名称   | 类型 | 说明 |
| ------ | ---- | ---- |
| 返回值 | int  |      |

示例

```c#
string wkt = "GEOGCS[\"WGS 84\",DATUM[\"WGS_1984\",SPHEROID[\"WGS 84\",6378137,298.257223563,AUTHORITY[\"EPSG\",7030]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY[\"EPSG\",6326]],PRIMEM[\"Greenwich\",0,AUTHORITY[\"EPSG\",8901]],UNIT[\"DMSH\",0.0174532925199433,AUTHORITY[\"EPSG\",9108]],AXIS[\"Lat\",NORTH],AXIS[\"Long\",EAST],AUTHORITY[\"EPSG\",4326]]";
OSGeo.OSR.SpatialReference oSRS = new OSGeo.OSR.SpatialReference(wkt);
oSRS.IsGeographic();
oSRS.IsProjected();
oSRS.IsGeocentric();
oSRS.IsLocal();
oSRS.IsVertical();
```



#### 18.IsSameGeogCS,IsSameVertCS和IsSame

- **函数说明**

        这三个函数用来判断指定的空间参考和当前的空间参考是否相同

1. IsSameGeogCS函数用来判断地理坐标系统是否相同
2. IsSameVertCS函数用来判断垂直坐标系统是否相同
3. IsSame用来判断空间参考是否相同

- **参数说明**

| 名称   | 类型             | 说明           |
| ------ | ---------------- | -------------- |
| rhs    | SpatialReference | 指定的空间参考 |
| 返回值 |                  |                |

- **示例**

```c#
string wkt1 = "GEOGCS[\"WGS 84\",DATUM[\"WGS_1984\",SPHEROID[\"WGS 84\",6378137,298.257223563,AUTHORITY[\"EPSG\",7030]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY[\"EPSG\",6326]],PRIMEM[\"Greenwich\",0,AUTHORITY[\"EPSG\",8901]],UNIT[\"DMSH\",0.0174532925199433,AUTHORITY[\"EPSG\",9108]],AXIS[\"Lat\",NORTH],AXIS[\"Long\",EAST],AUTHORITY[\"EPSG\",4326]]";
OSGeo.OSR.SpatialReference oSRS1 = new OSGeo.OSR.SpatialReference(wkt1);

string wkt2 = "GEOGCS[\"WGS 84\",DATUM[\"WGS_1984\",SPHEROID[\"WGS 84\",6378137,298.257223563,AUTHORITY[\"EPSG\",7030]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY[\"EPSG\",6326]],PRIMEM[\"Greenwich\",0,AUTHORITY[\"EPSG\",8901]],UNIT[\"DMSH\",0.0174532925199433,AUTHORITY[\"EPSG\",9108]],AXIS[\"Lat\",NORTH],AXIS[\"Long\",EAST],AUTHORITY[\"EPSG\",4326]]";
OSGeo.OSR.SpatialReference oSRS2 = new OSGeo.OSR.SpatialReference(wkt2);

oSRS1.IsSameGeogCS(oSRS2);
oSRS1.IsSameVertCS(oSRS2);
oSRS1.IsSame(oSRS2);
```



#### 19.SetWellKnownGeogCS

- **函数说明**

该函数使用常用的名字设置空间参考中的地理坐标系,使用该函数可以给一个空的空间参考中指定一个地理坐标系统,常用的字符串如下

1. "WGS84"="EPSG:4326"，不依赖EPSG数据文件
2. "WGS72"="EPSG:4322"，不依赖EPSG数据文件
3. "NAD27"="EPSG:4267"，不依赖EPSG数据文件
4. "NAD83"="EPSG:4269"，不依赖EPSG数据文件
5. "EPSG:n"与函数ImportFromEPSG(n)一样

- **参数说明**

| 名称   | 说明                   |
| ------ | ---------------------- |
| name   | 常用的地理坐标系统名称 |
| 返回值 |                        |

- **示例**

```c#
OSGeo.OSR.SpatialReference oSRS = new OSGeo.OSR.SpatialReference("");
oSRS.SetWellKnownGeogCS("WGS84");
```



#### 20.SetUTM

- **函数说明**

        设置UTM(通过横轴墨卡托Universal Transverse Mercator)投影

- **参数说明**

| 名称   | 说明                       |
| ------ | -------------------------- |
| NZone  | UTM带号                    |
| BNorth | TRUE为北半球,FALSE为南半球 |
| 返回值 |                            |

- **示例**

```c#
OSGeo.OSR.SpatialReference oSRS = new OSGeo.OSR.SpatialReference("");
oSRS.SetUTM(1, 1);
```

#### 21.SetTM

- **函数说明**

设置TM(横轴墨卡托Transverse Mercator)投影

- **参数说明**

| 名称            | 说明     |
| --------------- | -------- |
| dfCenterLat     | 中央纬线 |
| dfCenterLong    | 中央经线 |
| dfScale         | 尺度因子 |
| dfFalseEasting  | 东偏移量 |
| dfFalseNorthing | 北偏移量 |
| 返回值          |          |

- **示例**

```c#
OSGeo.OSR.SpatialReference oSRS = new OSGeo.OSR.SpatialReference("");
oSRS.SetTM(1, 1, 1, 1, 1);
```

#### 22.SetLCC

- **函数说明**

设置兰伯特等面积圆锥投影(Lambert Conformal Conic)

- **参数说明**

| 名称            | 说明      |
| --------------- | --------- |
| dfStdP1         | 标准纬线1 |
| dfStdP2         | 标准纬线2 |
| dfCenterLat     | 中央经线  |
| dfCenterLong    | 中央经线  |
| dfFalseEasting  | 东偏移量  |
| dfFalseNorthing | 北偏移量  |
| 返回值          |           |

- **示例**

```c#
OSGeo.OSR.SpatialReference oSRS = new OSGeo.OSR.SpatialReference("");
oSRS.SetTM(1, 1, 1, 1, 1);
```

#### 23.SetFromUserInput

- **函数说明**

        这个函数的功能比较强大,可以使用各种各样的定义来设置空间参考。该函数会对输入的参数进行检查,然后用合适的来对空间参考进行设置。该函数支持以下字符串格式进行设置空间参考

1. WKT字符串格式:通过调用ImportFromWkt()来设置
2. "EPSG:n",通过调用ImportFromEPSG()来设置
3. "EPSGA:n":通过调用ImportFromEPSGA()来设置
4. "AUTO:proj_id,unit_id,lon0,lat0":WMS投影格式
5. "urn:ogc:def:crs:EPSG::n":ogc urns
6. PROJ.4字符串格式:通过调用ImportFromProj4()来设置
7. 文件名:文件中使用WMT,XML或者PROJ.4格式来定义
8. 常用的字符串使用SetWellKnownGeogCS()来设置,比如NAD27,NAD83,WGS84或者WGS72
9. ESRI的WKT(字符串或文件),前面需要加前缀ESRI::,自动使用MorphFromESRI()处理
10. "IGNF:xxx":"+init=IGNF:xxx"通过ImportFromProj4()来设置

- **参数说明**

| 名称   | 说明               |
| ------ | ------------------ |
| name   | 各种空间参考字符串 |
| 返回值 | int                |

- **示例**

```c#
OSGeo.OSR.SpatialReference oSRS = new OSGeo.OSR.SpatialReference("");
oSRS.SetFromUserInput("EPSG:4326");
```













IsProjected`判断空间参考是否投影坐标系

| 字母和数字键的键码值(keyCode) |      |
| ----------------------------- | ---- |
| 按键                          | 键码 |
| A                             | 65   |

2.`IsGeographic`判断空间参考是否地理坐标系

3.`GetSemiMajor`获取参考椭球体的长半轴

4.`GetSemiMinor`获取参考椭球体的短半轴

5.`GetInvFlattening`获取参考椭球体的扁率的倒数

6.`GetAttrValue`可以用来获取`PROJCS`,`GEOGCS`,`DATUM`,`SPHEROID`和`PROJECTION`的名称字符串

7.`GetLinearUnits`方法可以获取长度单位类型并将其转换为米