---
title: Leaflet加载Esri矢量图层
date: 2021-08-24
categories: 
- Leaflet
tags:
- GIS 
- Leaflet
cover: /images/cover/14.jpg
preview: 50

---

# Leaflet加载Esri矢量图层

## 资料

npm:https://www.npmjs.com/package/esri-leaflet

cdn:https://unpkg.zhimg.com/esri-leaflet@3.0.2/dist/esri-leaflet.js

github:https://github.com/Esri/esri-leaflet

## 效果图

![1629767250752](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202110291637374.png)

## 代码

```javascript
        //添加arcgis图层
        var esriFeatureLayer = L.esri.featureLayer({
            url: "https://services1.arcgis.com/fBc8EJBxQRMcHlei/ArcGIS/rest/services/NPS_Land_Resources_Division_Boundary_and_Tract_Data_Service/FeatureServer/2",
            style:function(){
                return { color: "#70ca49", weight: 2 };
            }
        }).addTo(map);
```

## 源码地址

链接：https://pan.baidu.com/s/1SG85wi_3oAT2WCpi3AjUeQ 
提取码：6gni