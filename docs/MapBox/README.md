# MapBox

## 一、学习资料

[@mapbox/mapbox-sdk](https://www.npmjs.com/package/@mapbox/mapbox-sdk)

[mapbox github](https://github.com/mapbox/mapbox-gl-js)

官网[API](https://so.csdn.net/so/search?q=API&spm=1001.2101.3001.7020)地址：https://docs.mapbox.com/mapbox-gl-js/api/

Mapbox Studio 新建[地址](https://so.csdn.net/so/search?q=地址&spm=1001.2101.3001.7020)：https://studio.mapbox.com/

mapboxGL在线运行地址：例子代码：https://docs.mapbox.com/mapbox-gl-js/example/simple-map/

离线部署教程：https://blog.csdn.net/qq_29808089/article/details/109737002

## 二、一些基本概念

### 1.是什么

Mapbox GL JS是一个JavaScript库，使用WebGL渲染交互式矢量瓦片地图和栅格瓦片地图。WebGL渲染意味着高性能，MapboxGL能够渲染大量的地图要素，拥有流畅的交互以及动画效果、可以显示立体地图并且支持移动端，是一款十分优秀的WEB GIS开发框架。

### 2.常见的 mapbox.js和mapbox-gl.js的异同点？

**相同点：**

​	1.都是由Mapbox公司推出的免费开源的JavaScript库

​	2.都可以作为前端渲染矢量瓦片交互地图的工具

​	3.它们的样式设置都支持Mapbox Style



**不同点：**

​	1.mapbox.js是Leaflet的一个插件，使用方式是通过结合Leaflet使用

​	2.mapbox-gl.js是

​	3.使用mapbox-gl.js的浏览器必须支持WebGL渲染，在旧的浏览器中是不支持mapbox-gl.js的，而mapbox.js则没有 此限制



### 3.能表达整个Map的style文件

mapbox-gl.js目前是围绕style文件来进行的，其内容如下：

{
    "version": 8, 
    "name": "Mapbox Streets",
    "sprite": "mapbox://sprites/mapbox/streets-v8", 
    "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf", 
    "sources": {...},
    "layers": [...]
}

### 4.Map的组成：

任何GIS引擎必然要处理两个部分，一个是数据来源，一个是这些数据在界面呈现的样子，在style里面的source和layer对应于这两个部分。

### 5.Source：

目前source支持vector，raster， geojson， image，video。geojson的支持比较巧妙，有了这个就可以处理各种矢量类型，包括集合。而vector主要解决的是矢量瓦片，raster解决的是目前常用的栅格化的瓦片。video的加入使得功能更加的现代化。 mapbox在style里面，为source定义了一个type属性，来说明这些类型。





### npm

mapbox-gl

@cgcs2000/mapbox-gl
