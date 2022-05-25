[TOC]

# 浅淡我对Leaflet的理解



## 简介

Leaflet是轻量级的开源js地图，支持浏览器端与移动端。官方的API仅提供了最基础的地图功能，其他功能依靠它强大的插件系统。非常方便使用者开发自己的功能插件。

## 和其他框架比较

本人刚开始接触地图是从ArcGIS For JS->OpenLayers->Cesium,最后学习的Leaflet。一接触Leaflet就感觉特别得心应手,是在学习其他三中框架时从来没有的感觉。

- **Cesium**:API都整不动，更没勇气看源码。
- **ArcGIS for js**:功能齐全，但是不开源啊不开源,只能用官方提供的功能，而且出了问题除了等官方解决很难自己解决（大佬略过）。
- **OpenLayers**:功能齐全,源码也相对比较容易理解，配合GeoServer+PostgreSQL更是非常好用，但是对于想要了解WebGIS底层技术架构的人来说门槛还是比较高，扩展性一般。
- **Leaflet**:功能简单，源码简单，插件系统强大，非常适合一些简单的地图应用，适合作为了解WebGIS技术的入门。

## Leaflet的缺点：

（1）Leaflet最大的优点也是它最大的缺点，功能简单，很多功能需要寻找对应的插件解决。

（2）Leaflet插件随着版本迭代可能会不可用，如果作者没有持续更新也没有其他插件可以替代就需要开发者自己开发。

（3）国内资源学习资源比较少

（4）怎么说呢，可能是先研究过OpenLayers的缘故，感觉源码写的不是很好，一个组件（例如Map）的源码可能会分布在好几个或者几十个文件之中。内部参数也没有先定义后使用，注释也很分散，不像OpenLayers一个文件,一个模块。

## 总结：

总的来说，我认为Leaflet还是很适合一些简单地图，也适合WebGIS兴趣爱好者入门。如果想省心一步到位的话推荐OpenLayers和Arcgis for js。其中OpenLayers+GeoServer+PostgreSQL都是开源的，非常适合一些小公司。ArcGIS For JS 当然是配合ArcGIS最好，是要付费的。

## 下面分享一下Leaflet的资源

源码地址:https://github.com/Leaflet/Leaflet

官方文档:https://leafletjs.com/

CDN:写示例时更方便

```html
<!-- leaflet样式 -->
<link href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" rel="stylesheet" />
<!-- leaflet类库 -->
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet-src.js"></script>
```

实用插件:https://www.cnblogs.com/telwanggs/p/14794413.html