# Cesium



## 知识点

1.Viewer







### 1.Camera

https://www.cnblogs.com/telwanggs/p/11290052.html

#### 方法列表

| 名称                                             | 返回值     | 描述 |
| ------------------------------------------------ | ---------- | ---- |
| cameraToWorldCoordinates(cartesian, result)      | Cartesian4 |      |
| cameraToWorldCoordinatesPoint(cartesian, result) | Cartesian3 |      |
|                                                  |            |      |
|                                                  |            |      |
|                                                  |            |      |
|                                                  |            |      |

### 2.Ray  射线

获取相机到某点的射线

```javascript
const ray = this.viewer_.camera.getPickRay(position);
```



### 1.裁切

#### ClippingPlane 

##### **语法**

```javascript
new ClippingPlane(normal, distance)
```

##### **参数**

| 名称     | 类型       | 描述                                                         |
| -------- | ---------- | ------------------------------------------------------------ |
| normal   | Cartesian3 | 平面的法线（标准化）。                                       |
| distance | Number     | 从原点到平面的最短距离。 如果`distance`为正，则原点在法线方向的半空间中；如果为负，则原点在与法线相反的半空间中；如果为零，则平面通过原点。 |

##### **原理剖析**

###### （1）`normal`

决定了平面的方向

`new Cesium.Cartesian3(1,1,1)`平面如下所示

![1626075277157](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206201625865.png)



`new Cesium.Cartesian3(1,0,0)`平面如下所示

![1626074762924](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206201625881.png)



`new Cesium.Cartesian3(0,1,0)`平面如下所示

![1626074652140](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206201625001.png)



`new Cesium.Cartesian3(0,0,1)`平面如下所示

![1626074919369](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206201625885.png)



###### （2）distance

代表了平面与原点的距离,如下图展示了`new Cesium.Cartesian3(0,0,1)`平面`distance`值不同所显示的不同效果

![img](https://gitee.com/panzhiyue/picgo-image/raw/master/img/202111010858874.gif) 



###### （3）实现原理剖析

	通过分析Cesium源码发现裁剪的实现是在片源着色器中，在视空间坐标系下通过判断模型与裁剪位置构成向量与裁剪平面法向量点乘的正负来判断片源是否剔除。如果点乘为正，说明两个向量的夹角小于90度，在裁剪面要显示的一侧，保留，否则剔除。通过下面这张图应该能更容易理解一点。 

 ![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206201625867.png) 



 其中，绿色为裁剪平面，O点为裁剪平面的位置点，OA是裁剪平面的法向量，B点为模型的某个顶点，通过判断向量OA与OB点乘的结果就可以判断模型顶点是否需要剔除。下面分析一下Cesium中代码的实现。Cesium通过在绘制Model的片源着色器代码中追加一段代码实现平面裁剪，追加后的代码如下： 

```cpp
precision highp float;
varying vec3 v_normal;
varying vec2 v_texcoord0;
uniform sampler2D u_diffuse;
uniform vec4 u_specular;
uniform float u_shininess;
void gltf_clip_main() {
vec3 normal = normalize(v_normal);
vec4 color = vec4(0., 0., 0., 0.);
vec4 diffuse = vec4(0., 0., 0., 1.);
vec4 specular;
diffuse = texture2D(u_diffuse, v_texcoord0);
specular = u_specular;
diffuse.xyz *= max(dot(normal,vec3(0.,0.,1.)), 0.);
color.xyz += diffuse.xyz;
color = vec4(color.rgb * diffuse.a, diffuse.a);
gl_FragColor = color;
}
vec4 getClippingPlane(sampler2D packedClippingPlanes, int clippingPlaneNumber, mat4 transform)
{
    int pixY = clippingPlaneNumber / 1;
    int pixX = clippingPlaneNumber - (pixY * 1);
    float u = (float(pixX) + 0.5) * 1.0;
    float v = (float(pixY) + 0.5) * 0.5;
    vec4 plane = texture2D(packedClippingPlanes, vec2(u, v));
    return czm_transformPlane(plane, transform);
}

float clip(vec4 fragCoord, sampler2D clippingPlanes, mat4 clippingPlanesMatrix)
{
    bool clipped = true;
    vec4 position = czm_windowToEyeCoordinates(fragCoord);
    vec3 clipNormal = vec3(0.0);
    vec3 clipPosition = vec3(0.0);
    float clipAmount = 0.0;
    float pixelWidth = czm_metersPerPixel(position);
    for (int i = 0; i < 1; ++i)
    {
        vec4 clippingPlane = getClippingPlane(clippingPlanes, i, clippingPlanesMatrix);
        clipNormal = clippingPlane.xyz;
        clipPosition = -clippingPlane.w * clipNormal;
        float amount = dot(clipNormal, (position.xyz - clipPosition)) / pixelWidth;
        clipAmount = max(amount, clipAmount);
        clipped = clipped && (amount <= 0.0);
    }
    if (clipped)
    {
        discard;
    }
    return clipAmount;
}

uniform sampler2D gltf_clippingPlanes; 
uniform mat4 gltf_clippingPlanesMatrix; 
uniform vec4 gltf_clippingPlanesEdgeStyle; 
void main() 
{ 
    gltf_clip_main(); 
    float clipDistance = clip(gl_FragCoord, gltf_clippingPlanes, gltf_clippingPlanesMatrix); 
    vec4 clippingPlanesEdgeColor = vec4(1.0); 
    clippingPlanesEdgeColor.rgb = gltf_clippingPlanesEdgeStyle.rgb; 
    float clippingPlanesEdgeWidth = gltf_clippingPlanesEdgeStyle.a; 
    if (clipDistance > 0.0 && clipDistance < clippingPlanesEdgeWidth) 
    { 
        gl_FragColor = clippingPlanesEdgeColor;
    } 
} 
```

其中，gltf_clip_main函数中的内容是没有追加平面裁剪之前片源着色器中的main函数中的代码，主要是负责绘制模型本身。我们看到和平面裁剪相关的uniform变量有gltf_clippingPlanes、gltf_clippingPlanesMatrix、gltf_clippingPlanesEdgeStyle三个，其中gltf_clippingPlanes是sampler2D类型，将所有的裁剪平面的position、normal放到一张图片中；gltf_clippingPlanesMatrix变量是将平面从世界坐标转换到视空间下的变换矩阵；gltf_clippingPlanesEdgeStyle存储了裁剪的样式信息，其中gltf_clippingPlanesEdgeStyle.rgb存储了裁剪衔接处模型的颜色，gltf_clippingPlanesEdgeStyle.a存储了裁剪边界处的像素宽度。

　　在调用gltf_clip_main函数后，通过clip函数实现裁剪，并在像素没有剔除的情况下返回该片源与裁剪平面的像素距离。clip函数是整个裁剪功能实现的关键所在，我们将精力重点放在clip这个函数上。通过czm_windowToEyeCoordinates这个Cesium自带函数计算当前片源在视空间下的三维坐标position，然后通过czm_metersPerPixel这个函数计算视空间下position这个位置每个像素代表的空间长度。接下来就是通过一个for循环计算每个裁剪平面对该像素的影响。我们来分析一下for循环中的内部代码。首先通过getClippingPlane这个函数计算出在视空间下的平面坐标，clipNormal表示平面的法线，clipPosition代表平面的位置，然后position.xyz - clipPosition计算出了模型顶点和平面位置之间的向量，此处暂记为向量m，dot(clipNormal, (position.xyz - clipPosition))得到该向量和平面法线的点乘结果，由于clipNormal为单位向量，所以dot(clipNormal, (position.xyz - clipPosition))的结果就是向量m在法线方向上的投影长度，用这个长度除以pixelWidth转换为像素，记为amount。clipAmount取每次平面计算结果的最大值，对于单个的平面裁剪当amount < 0时，将该片源剔除，对于多个平面，通过clipped && (amount <= 0.0)进行判断，最后在没剔除的情况下返回clipAmount，这就是clip函数的所有内容。

　　通过clip函数计算出了clipDistance（模型顶点和平面的像素距离），最后就是设置裁剪处的颜色gl_FragColor = clippingPlanesEdgeColor。好了，这就是模型平面裁剪的所有内容了。



##### 2点构建裁剪面

**代码**

```javascript
function getClippingPlane(p1, p2){
            //获取中间点
            var midpoint = Cesium.Cartesian3.add(
                p1,
                p2,
                new Cesium.Cartesian3()
            );
            //获取圆心到中点的法线
            var up = Cesium.Cartesian3.normalize(
                midpoint,
                new Cesium.Cartesian3()
            );
            //获取逆时针法线
            var right = Cesium.Cartesian3.subtract(
                p2,
                midpoint,
                new Cesium.Cartesian3()
            );
            //normalize：按比例把x,y,z限制在-1~1
            right = Cesium.Cartesian3.normalize(right, right);
    		//计算up与right的叉积=2个向量构成的平面的向量
            var normal = Cesium.Cartesian3.cross(
                right,
                up,
                new Cesium.Cartesian3()
            );
            normal = Cesium.Cartesian3.normalize(normal, normal);

            var originCenteredPlane = new Cesium.Plane(normal, 0.0);
            //计算中点与裁剪平面的距离
            var distance = Cesium.Plane.getPointDistance(
                originCenteredPlane,
                midpoint
            );
            return new Cesium.ClippingPlane(normal, distance);
}
```

**分析**

![1626077193230](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206201625308.png)

![1626077972019](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206201625311.png)



**源码解析**

 Cartesian3.cross 源码

```javascript
  var leftX = left.x;
  var leftY = left.y;
  var leftZ = left.z;
  var rightX = right.x;
  var rightY = right.y;
  var rightZ = right.z;

  var x = leftY * rightZ - leftZ * rightY;
  var y = leftZ * rightX - leftX * rightZ;
  var z = leftX * rightY - leftY * rightX;

  result.x = x;
  result.y = y;
  result.z = z;
  return result;
```

**结论**

其实就是求算,球心,p1,p2所构成平面的法向量





#### ClippingPlaneCollection

unionClippingRegion为false,裁切就和切蛋糕一样,一刀下去,一边留下,一边不要。当切多刀时候只有都不要的部分才会删除。

#### 参考资料

**入门**

https://xiaozhuanlan.com/topic/6743912805

https://xiaozhuanlan.com/topic/8159370462

https://blog.csdn.net/weixin_30367543/article/details/98489697

**裁切tile3d(推荐深入学习)**

https://www.it610.com/article/1295812830922088448.htm







## 代码

### 1.trackedEntity动态追踪实体entity

```javascript
//动态追踪entity
viewer.trackedEntity = entity;
//设置与entity视角
entity.viewFrom = new Cesium.Cartesian3(-2080,-1715,2000)

//接绑
viewer.trackedEntity = undefined;
```

 ![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206201625731.png) 

 ![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206201625736.png) 

### 2.追踪 primitive 

```javascript
//绑定方式
tileset.readyPromise.then(function(model) {
    var camera = viewer.camera;
    var scene = viewer.scene;
 
    var center = Cesium.Matrix4.multiplyByPoint(model.modelMatrix,model.boundingSphere.center, new Cesium.Cartesian3());
    var hpr = new Cesium.HeadingPitchRange(Cesium.Math.toRadians(91), viewerPitch, viewerHeight);
    camera.lookAt(center,hpr );
})

//解绑方式
viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
```

### 3.淹没分析

  ![效果图](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206201625437.png)  

代码

```javascript
/**
 *  水淹分析 
 */
function SYFX(viewer) {
    var waterHeight = 100;//初始设定的水位高度
    var targetHeight = 1000;
    console.log(targetHeight);
    var PolygonPrimitive = (function () {
        function _(positions) {
            this.options = {
                name: '多边形',
                polygon: {
                    hierarchy: [],
                    perPositionHeight: true,
                    extrudedHeight: 0,
                    material: new Cesium.Color.fromBytes(64, 157, 253, 150),
                }
            };
            this.hierarchy = positions;
            this._init();
        }

        _.prototype._init = function () {
            var _self = this;
            var _updateHierarchy = function () {
                return _self.hierarchy;
            };
            //实时更新polygon.hierarchy
            this.options.polygon.hierarchy = new Cesium.CallbackProperty(_updateHierarchy, false);
            this.timer = setInterval(() => {
                if (waterHeight < targetHeight) {
                    waterHeight += 10;
                    if (waterHeight > targetHeight) {
                        waterHeight = targetHeight
                    }
                    if (!this.entity) {
                        this.entity = viewer.entities.add({
                            name: '多边形',
                            polygon: {
                                hierarchy: positions,
                                perPositionHeight: true,
                                extrudedHeight: waterHeight,
                                material: new Cesium.Color.fromBytes(64, 157, 253, 150),
                            }
                        })
                    } else {
                        this.entity.polygon.extrudedHeight = new Cesium.CallbackProperty(function () {
                            return waterHeight;
                        }, false);;

                    }

                }
            }, 100);
            //viewer.entities.add(this.options);
        };
        return _;
    })();

    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    var positions = [];
    var poly = undefined;

    //鼠标单击画点
    handler.setInputAction(function (movement) {
        var cartesian = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
        if (positions.length == 0) {
            positions.push(cartesian.clone());
        }
        positions.push(cartesian);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    //鼠标移动
    handler.setInputAction(function (movement) {
        var cartesian = viewer.scene.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);
        if (positions.length >= 2) {
            if (!Cesium.defined(poly)) {
                poly = new PolygonPrimitive(positions);
            } else {
                if (cartesian != undefined) {
                    positions.pop();
                    cartesian.y += (1 + Math.random());
                    positions.push(cartesian);
                }
            }
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    //鼠标右键单击结束绘制
    handler.setInputAction(function (movement) {
        handler.destroy();
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}
```



### 4.cartographicLimitRectangle (只显示指定区域)

指定用于将全局渲染限制在绘图区域内的矩形。默认地图坐标的最大范围。

```javascript
viewer.scene.globe.cartographicLimitRectangle = Cesium.Rectangle.fromDegrees(119.05283765744, 27.3397589411195, 119.252892017179, 27.3897617948041);
```

 ![玖涯博客](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206201625545.png) 

### 5.修改3dtiles位置

```javascript
            var translation = Cesium.Cartesian3.fromArray([0, 0, -40]);
            let m = Cesium.Matrix4.fromTranslation(translation);
            //move生效
            layer._modelMatrix = m;
```

### 6.坐标系转换

#### 6.1 笛卡尔坐标系转WGS84坐标系

```javascript
//笛卡尔坐标系转WGS84坐标系
function Cartesian3_to_WGS84(point) {
    var cartesian33 = new Cesium.Cartesian3(point.x, point.y, point.z);
    var cartographic = Cesium.Cartographic.fromCartesian(cartesian33);
    var lat = Cesium.Math.toDegrees(cartographic.latitude);
    var lng = Cesium.Math.toDegrees(cartographic.longitude);
    var alt = cartographic.height;
    return { lat: lat, lng: lng, alt: alt };
}
```

#### 6.2 WGS84坐标系转笛卡尔坐标系

```javascript
//WGS84坐标系转笛卡尔坐标系
function WGS84_to_Cartesian3(point) {
    var car33 = Cesium.Cartesian3.fromDegrees(point.lng, point.lat, point.alt);
    var x = car33.x;
    var y = car33.y;
    var z = car33.z;
    return { x: x, y: y, z: z };
}
```

### 7.pickEllipsoid和pickPosition获取空间坐标

https://blog.csdn.net/wgf1997/article/details/107387346

### 8.获取中间点

```
        var midpoint = Cesium.Cartesian3.add(
          points[i],
          points[nextIndex],
          new Cesium.Cartesian3()
        );
        midpoint = Cesium.Cartesian3.multiplyByScalar(midpoint, 0.5, midpoint);
```

### 9.模型加载之 Entity类型 

```javascript
var entity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(lon,lat),
    model: {
        uri:"../mapdatas/model.glb",
        color: Cesium.Color.GAINSBORO,
        colorBlendAmount: 0.4
    }
});
```

### 10.模型加载之 Primitive类型模型。 

```javascript
var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        url: './mapdatas/model/tiles/tileset.json',
        maximumScreenSpaceError:10,
        show:true
}));
```

## 参考手册

### Math

http://cesium.xin/cesium/cn/Documentation1.62/Math.html?classFilter=Math

数学方法

**属性**

| 名称                       | 描述                                                         | 示例 |
| -------------------------- | ------------------------------------------------------------ | ---- |
| acosClamped (value)        | 计算`Math.acos(value)`，但首先限制`value`在 [-1.0, 1.0] 范围内，以便函数永远不会返回 NaN。如果值在 [-1.0, 1.0] 范围内，则为值的 acos，如果值在范围外，则为 -1.0 或 1.0 的 acos，以更接近者为准。 |      |
| asinClamped (value)        | 计算`Math.asin(value)`，但首先限制`value`在 [-1.0, 1.0] 范围内，以便函数永远不会返回 NaN。如果值在 [-1.0, 1.0] 范围内，则为值的 asin，如果值在范围外，则为 -1.0 或 1.0（以较接近者为准）的 asin。 |      |
| cbrt ( number )            | 求一个数的立方根。如果`number`未提供，则返回 NaN             |      |
| chordLength(angle, radius) | 给定圆的半径和两点之间的角度，求两点之间的弦长。             |      |
| clamp (value, min, max)    | 将值限制在两个值之间。该值被限制为最小值 <= 值 <= 最大值。   |      |
|                            |                                                              |      |
|                            |                                                              |      |
|                            |                                                              |      |
|                            |                                                              |      |
|                            |                                                              |      |
|                            |                                                              |      |
|                            |                                                              |      |
|                            |                                                              |      |
|                            |                                                              |      |
|                            |                                                              |      |
|                            |                                                              |      |
|                            |                                                              |      |
|                            |                                                              |      |
|                            |                                                              |      |
