[TOC]


# Leaflet加载第三方地图-综合篇

本文主要把天地图,高德地图,百度地图,智图封装成插件统一调用

插件代码

```javascript
if (L.Proj) {
    L.CRS.Baidu = new L.Proj.CRS('EPSG:900913', '+proj=merc +a=6378206 +b=6356584.314245179 +lat_ts=0.0 +lon_0=0.0 +x_0=0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs', {
        resolutions: function () {
            var level = 19
            var res = [];
            res[0] = Math.pow(2, 18);
            for (var i = 1; i < level; i++) {
                res[i] = Math.pow(2, (18 - i))
            }
            return res;
        }(),
        origin: [0, 0],
        bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244])
    });
}

L.TileProviders = {};

L.TileProviders.Base = L.Class.extend({
    maps: {},
    options: {},
    crs: L.CRS.EPSG3857,
    initialize(maps, options) {
        this.maps = L.Util.extend(this.maps, maps || {});
        this.options = L.Util.extend(this.options, options || {});
    },
    /**
     * 获取图层
     * @param {string} type 图层类型
     * @param {Object} options TileLayer Options
     */
    getLayer(type, options) {
        var map = this.maps[type];
        var url = map.url;
        options = L.Util.extend(this.options, options || {});
        options.key = map.key ? map.key : options.key;
        return L.tileLayer(url, options);
    }
});
/**
 * 天地图图层提供者
 * @param {Object} maps 
 * @param {Object} options
 */
L.TileProviders.TianDiTu = L.TileProviders.Base.extend({
    maps: {
        //#region 经纬度图层
        Normal_Map: {
            url: "//t{s}.tianditu.gov.cn/vec_c/wmts?layer=vec&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk={key}",
            name: "矢量地图"
        },
        Normal_Annotion: {
            url: "//t{s}.tianditu.gov.cn/cva_c/wmts?layer=cva&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk={key}",
            name: "矢量注记"
        },
        Normal_AnnotionEnglish: {
            url: "//t{s}.tianditu.gov.cn/eva_c/wmts?layer=eva&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk={key}",
            name: "矢量英文注记"
        },
        Satellite_Map: {
            url: "//t{s}.tianditu.gov.cn/img_c/wmts?layer=img&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk={key}",
            name: "影像地图"
        },
        Satellite_Annotion: {
            url: "//t{s}.tianditu.gov.cn/cia_c/wmts?layer=cia&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk={key}",
            name: "影像注记"
        },
        Satellite_AnnotionEnglish: {
            url: "//t{s}.tianditu.gov.cn/eia_c/wmts?layer=eia&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk={key}",
            name: "影像英文注记"
        },
        Terrain_Map: {
            url: "//t{s}.tianditu.gov.cn/ter_c/wmts?layer=ter&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk={key}",
            name: "地形地图"
        },
        Terrain_Annotion: {
            url: "//t{s}.tianditu.gov.cn/cta_c/wmts?layer=cta&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk={key}",
            name: "地形注记"
        },
        Global_Line: {
            url: "//t{s}.tianditu.gov.cn/ibo_c/wmts?layer=ibo&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk={key}",
            name: "全球境界"
        },
        //#endregion 经纬度图层
    },
    options: {
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
        key: "6703c18da8b111f1ac38fdcfc4a138d8",
        zoomOffset: 1,
        tileSize: 256
    },
    crs: L.CRS.EPSG4326,
    
});


/**
 * 高德图层提供者
 * @param {Object} maps 
 * @param {Object} options
 */
L.TileProviders.GaoDe = L.TileProviders.Base.extend({
    maps: {
        Normal_Map: {
            url: "//webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
            name: "矢量地图"
        },
        Satellite_Map: {
            url: "//webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
            name: "影像地图"
        },
        Satellite_Annotion: {
            url: "//webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}",
            name: "影像注记"
        }
    },
    options: {
        subdomains: ["1", "2", "3", "4"],
        tileSize: 256
    }
});


/**
 * 百度图层提供者
 * @param {Object} maps 
 * @param {Object} options
 */
 L.TileProviders.BaiDu = L.TileProviders.Base.extend({
    maps: {
        Normal_Map: {
            url: "//online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1",
            name: "矢量地图"
        },
        Satellite_Map: {
            url: "//shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46",
            name: "影像地图"
        },
        Satellite_Annotion: {
            url: "//online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=sl&v=020",
            name: "影像注记"
        }
    },
    options: {
        subdomains: "0123456789",
        //百度地图必须设置
        tms:true
    },
    crs:L.CRS.Baidu
});


/**
 * OSM图层提供者
 * @param {Object} maps 
 * @param {Object} options
 */
 L.TileProviders.OSM = L.TileProviders.Base.extend({
    maps: {
        Normal_Map: {
            url: "//{s}.tile.osm.org/{z}/{x}/{y}.png",
            name: "矢量地图"
        }
    },
    options: {
        subdomains: "abc"
    },
    crs:L.CRS.EPSG3857
});

/**
 * 智图图层提供者
 * @param {Object} maps 
 * @param {Object} options
 */
 L.TileProviders.GeoQ = L.TileProviders.Base.extend({
    maps: {
        Normal_Map: {
            url: "//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
            name: "地图"
        },
        Normal_PurplishBlue: {
            url: "//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
            name: "午夜蓝"
        },
        Normal_Gray: {
            url: "//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}",
            name: "灰色"
        },
        Normal_Warm: {
            url: "//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}",
            name: "暖色"
        },
        Theme_Hydro: {
            url: "//thematic.geoq.cn/arcgis/rest/services/ThematicMaps/WorldHydroMap/MapServer/tile/{z}/{y}/{x}",
            name: "水系"
        },
    },
    options: {
        subdomains: ""
    },
    crs:L.CRS.EPSG3857
});
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

gitee：https://gitee.com/panzhiyue/leaflet-tileproviders