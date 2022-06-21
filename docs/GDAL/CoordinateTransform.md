# CoordinateTransformation

	该类用于在不同的坐标系之间进行转换，目前依赖于proj.4库。

#### 1.CoordinateTransformation(SpatialReference src, SpatialReference dst)

- **函数说明**

	构造函数 

- **参数说明**

| 名称 | 类型             | 说明       |
| ---- | ---------------- | ---------- |
| src  | SpatialReference | 源坐标系   |
| dst  | SpatialReference | 目标坐标系 |

- **示例**

```c#
//源坐标系
SpatialReference srcSRS = new SpatialReference("");
srcSRS.SetFromUserInput("EPSG:4490");

//目标坐标系
SpatialReference dstSRS = new SpatialReference("");
dstSRS.SetFromUserInput("EPSG:4549");

CoordinateTransformation transformation = new CoordinateTransformation(srcSRS, dstSRS);

```

#### 2.TransformPoint(double[] inout)

- **函数说明**

坐标转换,直接修改inout的值

- **参数说明**

| 名称  | 类型     | 说明    |
| ----- | -------- | ------- |
| inout | double[] | [x,y,z] |

- **示例**

```c#
//源坐标系
SpatialReference srcSRS = new SpatialReference("");
srcSRS.SetFromUserInput("EPSG:4490");

//目标坐标系
SpatialReference dstSRS = new SpatialReference("");
dstSRS.SetFromUserInput("EPSG:4549");

CoordinateTransformation transformation = new CoordinateTransformation(srcSRS, dstSRS);


double[] point = new double[] { 120, 28, 1 };
transformation.TransformPoint(point);

//point=[500000,3098441.7472966285,1]

```

#### 3.TransformPoint(double[] argout,double x,double y,double z)

- **函数说明**

转换点

- **参数说明**

| 名称   | 类型     | 说明            |
| ------ | -------- | --------------- |
| argout | double[] | 输出坐标[x,y,z] |
| x      | double   |                 |
| y      | double   |                 |
| z      | double   |                 |

- **示例**

```c#
//源坐标系
SpatialReference srcSRS = new SpatialReference("");
srcSRS.SetFromUserInput("EPSG:4490");

//目标坐标系
SpatialReference dstSRS = new SpatialReference("");
dstSRS.SetFromUserInput("EPSG:4549");

CoordinateTransformation transformation = new CoordinateTransformation(srcSRS, dstSRS);


double[] point = new double[3];
double x = 128;
double y = 28;
double z = 1;
transformation.TransformPoint(point, x, y, z);

//point=[1288335.1068986224,3124388.8606996424,1]

```

#### 4.TransformPoints(int nCount, double[] x, double[] y, double[] z)

- **函数说明**

转换点集,nCount决定要转换的点数量

- **参数说明**

| 名称   | 类型     | 说明 |
| ------ | -------- | ---- |
| nCount | int      | 点数 |
| x      | double[] |      |
| y      | double[] |      |
| z      | double[] |      |

- **示例**

```c#
//源坐标系
SpatialReference srcSRS = new SpatialReference("");
srcSRS.SetFromUserInput("EPSG:4490");

//目标坐标系
SpatialReference dstSRS = new SpatialReference("");
dstSRS.SetFromUserInput("EPSG:4549");

CoordinateTransformation transformation = new CoordinateTransformation(srcSRS, dstSRS);


double[] x = new double[] { 128, 129 };
double[] y = new double[] { 28, 29 };
double[] z = new double[] { 1, 2 };
transformation.TransformPoints(1, x, y, z);

//x=[1288335.1068986224,129]
//y=[3124388.8606996424,29]
//z[1,2]

```