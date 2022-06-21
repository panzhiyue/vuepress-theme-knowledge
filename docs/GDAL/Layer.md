# Layer

用来描述一个图层,可以通过Layer类来获取数据源中的某些要素和属性值。一个DataSource中可能有多个Layer，Layer对象一般通过DataSource来获取。





#### 1.int AlterFieldDefn(int iField, FieldDefn field_def, int nFlags)

- **函数说明**

 更改图层上现有字段的定义。  

- **参数说明**

| 名称      | 类型      | 说明                   |
| --------- | --------- | ---------------------- |
| iField    | int       | 待更新的属性表的列序号 |
| field_def | FieldDefn | 更新的属性表列定义     |
| nFlags    | int       |                        |
| 返回值    | int       | 表示成功或失败         |





2.int Clip(Layer method_layer, Layer result_layer, string[] options, Ogr.GDALProgressFuncDelegate callback, string callback_data)



3.int CommitTransaction()



#### 4.int CreateFeature(Feature feature)

- **函数说明**

改函数将制定的要素写入图层中。

传递的要素 将作为新要素写入图层，而不是覆盖现有要素。 

- **参数说明**

| 名称    | 类型    | 说明           |
| ------- | ------- | -------------- |
| feature | Feature | 需要写入的要素 |
| 返回值  | int     | 表示成功或失败 |

#### 5.int CreateField(FieldDefn field_def, int approx_ok)

- **函数说明**

 在图层上创建一个新字段。 

- **参数说明**

| 名称      | 类型      | 说明                                               |
| --------- | --------- | -------------------------------------------------- |
| field_def | FieldDefn | 要写入磁盘的字段定义。                             |
| approx_ok | int       | 如果为TRUE，设置的属性表列按照当前格式进行调整兼容 |
| 返回值    | int       | 表示成功或失败                                     |

6.int CreateGeomField(GeomFieldDefn field_def, int approx_ok)



#### 7.int DeleteFeature(long fid)

- **函数说明**

删除指定ID的要素

- **参数说明**

| 名称   | 类型 | 说明            |
| ------ | ---- | --------------- |
| fid    | long | 待删除要素的FID |
| 返回值 | int  | 表示成功或失败  |

#### 8.int DeleteField(int iField)

- **函数说明**

删除指定的属性表列

- **参数说明**

| 名称   | 类型 | 说明                 |
| ------ | ---- | -------------------- |
| iField | int  | 要删除的属性表列序号 |
| 返回值 | int  | 表示成功或失败       |

9.void Dispose()



10.int Erase(Layer method_layer, Layer result_layer, string[] options, Ogr.GDALProgressFuncDelegate callback, string callback_data)





#### 11.int FindFieldIndex(string pszFieldName, int bExactMatch)

- **函数说明**

 在图层中找到字段的索引。 

 返回的数字是字段在图层中的索引；如果字段不存在，则返回-1。 

 如果bExactMatch设置为FALSE且该字段不以给定的形式存在，则驱动程序可能会进行一些更改以使其匹配，例如在创建图层时可能所做的更改（例如，在OCI驱动程序中为LAUNDER）。 

- **参数说明**

| 名称         | 类型   | 说明                                                         |
| ------------ | ------ | ------------------------------------------------------------ |
| pszFieldName | string | 字段名称                                                     |
| bExactMatch  | int    | 设置为FALSE且该字段不以给定的形式存在，则驱动程序可能会进行一些更改以使其匹配 |
| 返回值       | int    | 表示成功或失败                                               |

#### 12.int GetExtent(Envelope extent, int force)

- **函数说明**

获取图层的四至范围

- **参数说明**

| 名称   | 类型     | 说明                                                         |
| ------ | -------- | ------------------------------------------------------------ |
| extent | Envelope | 图层的四至范围                                               |
| force  | int      | 是否精确计算图层的四至范围,如果设置为false,计算的四至范围是一个估计值 |
| 返回值 | int      | 表示成功或失败                                               |

#### 13.Feature GetFeature(long fid)

- **函数说明**

通过要素的FID获取要素。

| 名称   | 类型    | 说明                      |
| ------ | ------- | ------------------------- |
| nFID   | long    | 要素的FID                 |
| 返回值 | Feature | 获取的要素指针,无则为null |

#### 14.long GetFeatureCount(int force)

- **函数说明**

 获取图层中经过筛选器过滤后要素数量

- **参数说明**

| 名称   | 类型    | 说明                                                        |
| ------ | ------- | ----------------------------------------------------------- |
| force  | int     | 是否进行精确统计,如果设置为false，可能返回-1,表示数量不确定 |
| 返回值 | Feature | 获取的要素指针,无则为null                                   |

14.long GetFeaturesRead()



15.string GetFIDColumn()



16.string GetGeometryColumn()



#### 17.wkbGeometryType GetGeomType()

- **函数说明**

 返回图层的几何类型。 

返回的结果与GetLayerDefn（） -> OGRFeatureDefn :: GetGeomType（）相同，但是对于一些驱动程序，直接调用GetGeomType（）可以避免冗长的图层定义初始化。

- **参数说明**

| 名称   | 类型            | 说明           |
| ------ | --------------- | -------------- |
| 返回值 | wkbGeometryType | 图层的几何类型 |



#### 18.FeatureDefn GetLayerDefn()

- **函数说明**

获取当前图层的属性表结构

- **参数说明**

| 名称   | 类型        | 说明             |
| ------ | ----------- | ---------------- |
| 返回值 | FeatureDefn | 图层的属性表结构 |

#### 19.string GetName()

- **函数说明**

 返回图层名称。 

这将返回与GetLayerDefn（） -> OGRFeatureDefn :: GetName（）相同的内容，但是对于一些驱动程序，直接调用GetName（）可以避免冗长的图层定义初始化。

- **参数说明**

| 名称   | 类型   | 说明     |
| ------ | ------ | -------- |
| 返回值 | string | 图层名称 |



#### 20.Feature GetNextFeature()

- **函数说明**

 从该层获取下一个可用功能。 

仅返回与当前空间过滤器与属性过滤器匹配的要素。

此方法实现对图层特征的顺序访问。该ResetReading（）方法可以用来在再次从头开始。

21.int GetRefCount()



#### 22.Geometry GetSpatialFilter()

- **函数说明**

 返回图层的当前空间滤波器。 

 返回的指针指向内部拥有的对象，并且调用者不得更改或删除该指针。 

- **参数说明**

| 名称   | 类型     | 说明                   |
| ------ | -------- | ---------------------- |
| 返回值 | Geometry | 空间过滤器的几何形状。 |

#### 23.SpatialReference GetSpatialRef()

- **函数说明**

 获取此图层的空间参考系统。 

返回的对象归OGRLayer拥有，不应由应用程序修改或释放

- **参数说明**

| 名称   | 类型             | 说明                 |
| ------ | ---------------- | -------------------- |
| 返回值 | SpatialReference | 图层的空间参考系统。 |



#### 24.StyleTable GetStyleTable()

- **函数说明**

获取当前图层的样式表

- **参数说明**

| 名称  | 类型       | 说明   |
| ----- | ---------- | ------ |
| table | StyleTable | 样式表 |



25.int Identity(Layer method_layer, Layer result_layer, string[] options, Ogr.GDALProgressFuncDelegate callback, string callback_data)



26.int Intersection(Layer method_layer, Layer result_layer, string[] options, Ogr.GDALProgressFuncDelegate callback, string callback_data)



#### 27.int ReorderField(int iOldFieldPos, int iNewFieldPos)

- **函数说明**

 调换属性表列的顺序,将位于iOldFieldPos的属性调换到iNewFieldPos位置上。

 例如，假设字段最初是“ 0”，“ 1”，“ 2”，“ 3”，“ 4”。ReorderField（1，3）将它们重新排序为“ 0”，“ 2”，“ 3”，“ 1”，“ 4”。 

- **参数说明**

| 名称         | 类型 | 说明                                   |
| ------------ | ---- | -------------------------------------- |
| iOldFieldPos | int  | 原来属性表列序号,取值范围为[0,count-1] |
| iNewFieldPos | int  | 结果属性表列序号,取值范围为[0,count-1] |
| 返回值int    |      | 表示成功或失败                         |

28.int ReorderFields(int nList, int[] pList)

#### 



#### 29.void ResetReading()

- **函数说明**

把要素读取顺序重置为从第一个开始。

30.int RollbackTransaction()



#### 31.int SetAttributeFilter(string filter_string)

- **函数说明**

  设置一个新的属性查询。 

  此方法设置通过GetNextFeature()方法获取Feature时要使用的属性查询字符串。仅返回查询结果为true的特征。 

  查询字符串应采用SQL WHERE子句的格式。例如，“Count> 1000000，Count<5000000”，其中Count是图层中的一个属性。查询格式通常是SQL WHERE子句的受限形式 

- **参数说明**

| 名称   | 类型   | 说明                                         |
| ------ | ------ | -------------------------------------------- |
| filter | string | SQL WHERE语句格式的属性查询过滤语句          |
|        | int    | 如果查询语句错误或发生其他错误则返回错误代码 |

#### 32.int SetFeature(Feature feature)

- **函数说明**

将制定的要素重新写入图层中

- **参数说明**

| 名称    | 类型    | 说明               |
| ------- | ------- | ------------------ |
| feature | Feature | 需要写入的要素指针 |
| 返回值  | int     | 表示成功或者失败   |

#### 33.int SetIgnoredFields(string[] options)

- **函数说明**

 设置从图层检索要素时可以省略哪些字段。 

除了图层的字段名称之外，还可以传递以下特殊字段：“ OGR_GEOMETRY”忽略几何图形，“ OGR_STYLE”忽略图层样式。

默认情况下，不会忽略任何字段。

- **参数说明**

| 名称    | 类型     | 说明                     |
| ------- | -------- | ------------------------ |
| options | string[] | 设置要忽略的属性表列名称 |
| 返回值  | int      | 表示成功或者失败         |

#### 34.int SetNextByIndex(long new_index)

- **函数说明**

将当前读取要素的位置移至nIndex,如果设置nIndex为3,那么下一次调用GetNextFeature()函数得到的是第四个要素。

- **参数说明**

| 名称   | 类型 | 说明               |
| ------ | ---- | ------------------ |
| nIndex | int  | 当前读取要素的位置 |
| 返回值 | int  | 表示设置成功,失败  |

#### 35.void SetSpatialFilter(int iGeomField, Geometry filter)

- **函数说明**

设置一个新的空间过滤器。 

 通过GetNextFeature()方法获取要素时，仅返回几何形状与滤镜几何形状相交的要素。 

 当前，该测试可能未正确实现，但是可以保证将返回其包络（由 Geometry.GetEnvelope()返回）与空间滤镜的包络重叠的所有要素。严格来说，这可能导致返回更多形状。 

 此方法对传递的几何图形进行内部复制。传递的几何图形仍由调用方负责，并且可以安全地销毁。 

- **参数说明**

| 名称       | 类型     | 说明                                 |
| ---------- | -------- | ------------------------------------ |
| iGeomField | int      | 空间过滤器在其上运行的几何字段的索引 |
| filter     | Geometry | 空间过滤器                           |

#### 36.void SetSpatialFilter(Geometry filter)

- **函数说明**

 设置一个新的空间过滤器。 

 通过GetNextFeature()方法获取要素时，仅返回几何形状与滤镜几何形状相交的要素。 

 当前，该测试可能未正确实现，但是可以保证将返回其包络（由 Geometry.GetEnvelope()返回）与空间滤镜的包络重叠的所有要素。严格来说，这可能导致返回更多形状。 

 此方法对传递的几何图形进行内部复制。传递的几何图形仍由调用方负责，并且可以安全地销毁。 

- **参数说明**

| 名称   | 类型     | 说明       |
| ------ | -------- | ---------- |
| filter | Geometry | 空间过滤器 |



#### 37.void SetSpatialFilterRect(int iGeomField, double minx, double miny, double maxx, double maxy)

- 函数说明**

 设置一个新的矩形空间过滤器。 

 通过GetNextFeature()方法获取要素时，此方法将矩形设置为空间过滤器。仅返回几何上与给定矩形相交的要素。 

 x / y值应与整个图层位于同一坐标系中。在内部，此方法通常通过创建5个顶点闭合的矩形多边形并将其传递给Layer.SetSpatialFilter()来实现。它的存在是为了方便。 

- **参数说明**

| 名称       | 类型   | 说明                                 |
| ---------- | ------ | ------------------------------------ |
| iGeomField | int    | 空间过滤器在其上运行的几何字段的索引 |
| minx       | double | 矩形过滤器的最小X坐标                |
| miny       | double | 矩形过滤器的最小Y坐标                |
| maxx       | double | 矩形过滤器的最大X坐标                |
| maxy       | double | 矩形过滤器的最大Y坐标                |

#### 38.void SetSpatialFilterRect(double minx, double miny, double maxx, double maxy)

- **函数说明**

 设置一个新的矩形空间过滤器。 

 通过GetNextFeature()方法获取要素时，此方法将矩形设置为空间过滤器。仅返回几何上与给定矩形相交的要素。 

 x / y值应与整个图层位于同一坐标系中。在内部，此方法通常通过创建5个顶点闭合的矩形多边形并将其传递给Layer.SetSpatialFilter()来实现。它的存在是为了方便。 

- **参数说明**

| 名称 | 类型   | 说明                  |
| ---- | ------ | --------------------- |
| minx | double | 矩形过滤器的最小X坐标 |
| miny | double | 矩形过滤器的最小Y坐标 |
| maxx | double | 矩形过滤器的最大X坐标 |
| maxy | double | 矩形过滤器的最大Y坐标 |



#### 39.void SetStyleTable(StyleTable table)

- **函数说明**

设置图层样式表

- **参数说明**

| 名称  | 类型       | 说明   |
| ----- | ---------- | ------ |
| table | StyleTable | 样式表 |

40.int StartTransaction()



41.int SymDifference(Layer method_layer, Layer result_layer, string[] options, Ogr.GDALProgressFuncDelegate callback, string callback_data)



#### 42.int SyncToDisk()

- **函数说明**

将更改的内容写入磁盘中。它不适用于用只读方式打开的数据。

- **参数说明**

| 名称   | 类型 | 说明           |
| ------ | ---- | -------------- |
| 返回值 | int  | 表示成功或失败 |

43.bool TestCapability(string cap)



44.int Union(Layer method_layer, Layer result_layer, string[] options, Ogr.GDALProgressFuncDelegate callback, string callback_data)



45.int Update(Layer method_layer, Layer result_layer, string[] options, Ogr.GDALProgressFuncDelegate callback, string callback_data)