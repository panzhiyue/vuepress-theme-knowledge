# Driver



#### 1.创建

```c#
OSGeo.OGR.Driver oDerive = Ogr.GetDriverByName("ESRI Shapefile");
```

#### 2.CopyDataSource(DataSource copy_ds, string utf8_path, string[] options)

- **函数说明**

拷贝数据源 

- **参数说明**

| 名称      | 类型       | 说明             |
| --------- | ---------- | ---------------- |
| copy_ds   | DataSource | 数据源           |
| utf8_path | String     | 拷贝路径         |
| options   | string[]   | 一般填null       |
| 返回值    | DataSource | 拷贝的数据源对象 |

- **示例**

```c#
OSGeo.OGR.Driver oDerive = Ogr.GetDriverByName("ESRI Shapefile");
DataSource dstDataSource = oDerive.CopyDataSource(oDerive.Open("d:\\source.shp", 1), "d:\\test.shp", null);

```



#### 3.CreateDataSource(string utf8_path, string[] options)

- **函数说明**

创建数据源(已经存在的会删除)

- **参数说明**

| 名称      | 类型       | 说明             |
| --------- | ---------- | ---------------- |
| utf8_path | String     | 创建路径         |
| options   | string[]   | 一般填null       |
| 返回值    | DataSource | 创建的数据源对象 |

- **示例**

```c#
OSGeo.OGR.Driver oDerive = Ogr.GetDriverByName("ESRI Shapefile");
DataSource ds = oDerive.CreateDataSource("d:\\test.shp", null);
```

#### 4.DeleteDataSource(string utf8_path)

- **函数说明**

  删除数据源

- **参数说明**

| 名称      | 类型   | 说明           |
| --------- | ------ | -------------- |
| utf8_path | String | 删除数据源路径 |
| 返回值    | int    |                |

- **示例**

```c#
OSGeo.OGR.Driver oDerive = Ogr.GetDriverByName("ESRI Shapefile");
int result = oDerive.DeleteDataSource("d:\\test.shp");
```

#### 5.Deregister()



#### 6.Dispose()





#### 7.GetName()

- **函数说明**

获取驱动的名称,也就是文件格式,返回的是驱动的短名称(10-40个字符组成),比如ESRI的shp就是"ESRI Shapefile"

- **示例**

```c#
OSGeo.OGR.Driver oDerive = Ogr.GetDriverByName("ESRI Shapefile");
string name = oDerive.GetName();
```

#### 8.Open(string utf8_path, int update)

- **函数说明**

打开数据源

**参数说明**

- **示例**

```c#
OSGeo.OGR.Driver oDerive = Ogr.GetDriverByName("ESRI Shapefile");
DataSource ds = oDerive.Open("d:\\test.shp", 1);
```



#### 9.Register()



#### 10.TestCapability(string cap)