# Turf

## 参考资料

https://www.proyy.com/6968626897156603918.html

[中文网](https://turfjs.fenxianglu.cn/category/measurement/center.html)

## 方法

### 计算

#### area（计算区域面积）

获取一个或多个`feature`，并返回其面积平方米。

**参数**

| 参数    | 类型    | 描述                     |
| ------- | ------- | ------------------------ |
| geojson | GeoJSON | input GeoJSON feature(s) |

**返回**

number – area in square meters

**示例**

```js
var polygon = turf.polygon([[
        [108.09876, 37.200787],
        [106.398901, 33.648651],
        [114.972103, 33.340483],
        [113.715685, 37.845557],
        [108.09876, 37.200787]
      ]]);

var area = turf.area(polygon);
```

![image-20210531171407541.png](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/b8e418b0386c8195d80cec950d649085.webp)

#### centerOfMass（计算多边形质心）

取任何`Feature`或`FeatureCollection`，并利用这个公式返回其质心:多边形质心。

**参数**

| 参数       | 类型    | 描述                                                |
| ---------- | ------- | --------------------------------------------------- |
| geojson    | GeoJSON | GeoJSON to be centered                              |
| properties | Object  | an Object that is used as the Feature ‘s properties |

**返回**

Feature – the center of mass

**示例**

```js
var polygon = turf.polygon([[[-81, 41], [-88, 36], [-84, 31], [-80, 33], [-77, 39], [-81, 41]]]);

var center = turf.centerOfMass(polygon);

```

npm install @turf/center-of-mass

![image-20210531171328729.png](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/f534e742786ee1dd0142f1edb24678e6.webp)

### difference（计算差异）

![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1dlbGxUaWdlcg==,size_16,color_FFFFFF,t_70.webp)
Finds the difference between two [polygons](https://tools.ietf.org/html/rfc7946#section-3.1.6) by clipping the second polygon from the first.

如图示计算的是属于面1不属于面2的部分；千万不要理解错了。

**参数**

| **Argument** | **Type**                          | **Description**                             |
| ------------ | --------------------------------- | ------------------------------------------- |
| polygon1     | Feature <(Polygon、MultiPolygon)> | input Polygon feature                       |
| polygon2     | Feature <(Polygon、MultiPolygon)> | Polygon feature to difference from polygon1 |

翻译如下

| 参数 | 类型                  | 描述                   |
| ---- | --------------------- | ---------------------- |
| 面1  | 特征对象 <(面、多面)> | 输入面                 |
| 面2  | 特征对象 <(面、多面)> | 相对于面1用于做差的面2 |

**Returns返回值**
(Feature <(Polygon|MultiPolygon)>|null) - a Polygon or MultiPolygon feature showing the area of polygon1 excluding the area of polygon2 (if empty returns null )

一个Polygon或MultiPolygon要素，显示了polygon1的面积，不包括polygon2的面积（如果empty返回null）
**Example例子**

```javascript
var polygon1 = turf.polygon([[
  [128, -26],
  [141, -26],
  [141, -21],
  [128, -21],
  [128, -26]
]], {
  "fill": "#F00",
  "fill-opacity": 0.1
});
var polygon2 = turf.polygon([[
  [126, -28],
  [140, -28],
  [140, -20],
  [126, -20],
  [126, -28]
]], {
  "fill": "#00F",
  "fill-opacity": 0.1
});

var difference = turf.difference(polygon1, polygon2);

```

