import { resolveDir } from "./useSidebar"
import { resolve } from "path"
import type { SidebarConfig } from '@panzhiyue/vuepress-theme-knowledge'
export const sidebar: SidebarConfig = {
    '/ArcGIS/': resolveDir(resolve(__dirname, "../../ArcGIS/")),
    '/eCognition/': resolveDir(resolve(__dirname, "../../eCognition/")),
    '/leaflet/': resolveDir(resolve(__dirname, "../../leaflet/")),
    '/openlayers/': resolveDir(resolve(__dirname, "../../openlayers/"), [/examples/]),
    '/SuperMap/': resolveDir(resolve(__dirname, "../../SuperMap/")),
    '/第三方地图/': resolveDir(resolve(__dirname, "../../第三方地图/")),
    '/nodejs/': resolveDir(resolve(__dirname, "../../nodejs/")),
    '/windows/': resolveDir(resolve(__dirname, "../../windows/")),
    '/css/': resolveDir(resolve(__dirname, "../../css/"), [/examples/]).concat([{
        text:"链接",
        children:[
            {
                text:"You-need-to-know-css",
                link:"https://lhammer.cn/You-need-to-know-css/#/zh-cn/double-wing-layout?v=1"
            },
            {
                text:"Flexbox演示站",
                link:"https://xluos.github.io/demo/flexbox/"
            }
        ]
    }]),
    '/mongodb/': resolveDir(resolve(__dirname, "../../mongodb/")),
    '/mysql/': resolveDir(resolve(__dirname, "../../mysql/")),
    '/sqlserver/': resolveDir(resolve(__dirname, "../../sqlserver/")),
    '/vue/': resolveDir(resolve(__dirname, "../../vue/")),
    '/PostgreSql/': resolveDir(resolve(__dirname, "../../PostgreSql/")),
    '/编程/': resolveDir(resolve(__dirname, "../../编程/")),
    '/gis/': resolveDir(resolve(__dirname, "../../gis/")),
    '/软件/': resolveDir(resolve(__dirname, "../../软件/")),
    '/java/': resolveDir(resolve(__dirname, "../../java/")),
    '/cesium/': resolveDir(resolve(__dirname, "../../cesium/"), [/examples/, /customCesium/]),
    '/js/': resolveDir(resolve(__dirname, "../../js/"), [/examples/]),
    '/Geoserver/': resolveDir(resolve(__dirname, "../../Geoserver/")),
    '/碎片/': resolveDir(resolve(__dirname, "../../碎片/")),
    '/日常生活/': resolveDir(resolve(__dirname, "../../日常生活/")),
    '/echarts/': resolveDir(resolve(__dirname, "../../echarts/")),
    '/Flutter/': resolveDir(resolve(__dirname, "../../Flutter/")),
    '/GDAL/': resolveDir(resolve(__dirname, "../../GDAL/")),
    '/Geotools/': resolveDir(resolve(__dirname, "../../Geotools/")),
    '/gitbook/': resolveDir(resolve(__dirname, "../../gitbook/")),
    '/hexo/': resolveDir(resolve(__dirname, "../../hexo/")),
    '/html/': resolveDir(resolve(__dirname, "../../html/")),
    '/jsdoc/': resolveDir(resolve(__dirname, "../../jsdoc/")),
    '/Mac/': resolveDir(resolve(__dirname, "../../Mac/")),
    '/MapBox/': resolveDir(resolve(__dirname, "../../MapBox/")),
    '/MapGIS/': resolveDir(resolve(__dirname, "../../MapGIS/")),
    '/python/': resolveDir(resolve(__dirname, "../../python/")),
    '/TypeScript/': resolveDir(resolve(__dirname, "../../TypeScript/")),
    '/Webpack/': resolveDir(resolve(__dirname, "../../Webpack/"))
}

