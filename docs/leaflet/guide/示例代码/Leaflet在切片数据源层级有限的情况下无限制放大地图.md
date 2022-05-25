[TOC]
# Leaflet在切片数据源层级有限的情况下无限制放大地图

地图切片服务往往是有限的一般都只有17-20级，可是这种级别往往无法满足业务需求,可是继续放大底图消失也是不行的。

关键在于`L.TileLayer`继承自`L.GridLayer`的`maxNativeZoom`参数，它可以限制瓦片源最大级别,当地图缩放级别大于这个级别时,会从这个级别请求瓦片然后缩放。

注意:需要说明一下的是`maxNativeZoom`必须配合`maxZoom`使用，否则无效

```javascript
        //初始化地图
        var map = L.map('viewDiv', {
            crs: L.CRS.EPSG4326,
            maxZoom: 22,  //矢量数据过于密集,需要放大才能更清晰的看到标注
            minZoom: 14   //防止过量请求矢量数据,导致地图服务卡死

        }).setView([28.77731514847374, 120.111453538227806], 17);
        
        
                //天地图影像底图
        var img = L.tileLayer('http://t4.tianditu.gov.cn/img_c/wmts?tk=fca960333584ee45d72473c3cdb76a20&layer=img&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}', {
            name: "中国天地图影像",
            maxZoom: 22, //设置瓦片最大级别
            maxNativeZoom: 17,  //瓦片源最大级别,当地图缩放级别大于这个级别时,会从这个级别请求瓦片然后缩放
            tileSize: 256,  //瓦片大小
            zoomOffset: 1,  //天地图要设置为1,表示实际瓦片级别比当前地图级别大1

        });

        img.addTo(map);
        var cia = L.tileLayer('http://t6.tianditu.gov.cn/cia_c/wmts?tk=fca960333584ee45d72473c3cdb76a20&layer=cia&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}', {
            name: "中国天地图影像标注",
            maxZoom: 22,    //设置瓦片最大级别
            maxNativeZoom: 17,   //瓦片源最大级别,当地图缩放级别大于这个级别时,会从这个级别请求瓦片然后缩放
            tileSize: 256,   //瓦片大小
            zoomOffset: 1    //天地图要设置为1,表示实际瓦片级别比当前地图级别大1
        }).addTo(map);
```

## 源码地址

链接：https://pan.baidu.com/s/13Ri3JIq4YfPEZNsTtT05TQ 
提取码：1ynr