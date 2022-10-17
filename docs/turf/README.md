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