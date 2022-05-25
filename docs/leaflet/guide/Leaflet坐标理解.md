[TOC]


# Leaflet坐标理解

## 地图的容器

![1629942979925](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202110291653645.png)

（1）MapContainer:容器div

（2）WorldContainer:实际上不存在,虚拟出来，便于理解原理

（3）LayerContainer：本身没有宽高

## 坐标定义

（1）mapPanePos:LayerContainer左上角相对于MapContainer左上角的像素坐标（）

（2）pixelOrigin:指的是LayerContainer左上角相对于WorldContainer左上角的像素坐标

（3）topLeftPoint:指的是MapContainer左上角相对于WorldContainer左上角的像素坐标

## 在地图上1个点有4中坐标系形式

（1）latlng：地理坐标，[维度,经度]

（2）containerPoint:相对于MapContainer左上角的像素坐标

（3）layerPoint：相对于LayerContainer左上角的像素坐标

（4）projectPoint：相对于WorldContainer左上角的像素坐标



## 坐标计算

（1）project(latlng,zoom)：地理坐标转为相对于WorldContainer左上角的像素坐标

（2）unproject(point,zoom)：相对于WorldContainer左上角的像素坐标转为地理坐标

project与unproject是一切坐标转换的基础

（3）layerPointToLatLng(point)：相对于LayerContainer左上角的像素坐标转地理坐标

（4）latLngToLayerPoint(latlng)：地理坐标转相对于LayerContainer左上角的像素坐标                                                                                                                                                                      （5）containerPointToLayerPoint(point)：相对于MapContainer左上角的像素坐标转为相对于LayerContainer左上角的像素坐标

（6）layerPointToContainerPoint(point)：相对于LayerContainer左上角的像素坐标转为相对于MapContainer左上角的像素坐标

（7）containerPointToLatLng(point)：相对于MapContainer左上角的像素坐标转为地理坐标

（8）latLngToContainerPoint(latlng)：地理坐标转为相对于MapContainer左上角的像素坐标