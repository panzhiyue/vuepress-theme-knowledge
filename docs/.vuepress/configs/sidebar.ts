import { resolveDir } from "./useSidebar"
import { resolve } from "path"
import type { SidebarConfig } from '@panzhiyue/vuepress-theme-knowledge'
export const sidebar: SidebarConfig = {
    '/ArcGIS/': resolveDir(resolve(__dirname, "../../ArcGIS/")),
    '/eCognition/': resolveDir(resolve(__dirname, "../../eCognition/")),
    '/leaflet/': resolveDir(resolve(__dirname, "../../leaflet/")),
    '/openlayers/': resolveDir(resolve(__dirname, "../../openlayers/"),[/examples/]),
    '/SuperMap/': resolveDir(resolve(__dirname, "../../SuperMap/")),
    '/第三方地图/': resolveDir(resolve(__dirname, "../../第三方地图/")),
    '/nodejs/': resolveDir(resolve(__dirname, "../../nodejs/")),
    '/windows/': resolveDir(resolve(__dirname, "../../windows/")),
    '/css/': resolveDir(resolve(__dirname, "../../css/"),[/examples/]),
    '/mongodb/': resolveDir(resolve(__dirname, "../../mongodb/")),
    '/mysql/': resolveDir(resolve(__dirname, "../../mysql/")),
    '/sqlserver/': resolveDir(resolve(__dirname, "../../sqlserver/")),
    '/vue/': resolveDir(resolve(__dirname, "../../vue/")),
    '/PostgreSql/': resolveDir(resolve(__dirname, "../../PostgreSql/")),
    '/编程/': resolveDir(resolve(__dirname, "../../编程/")),
    '/gis/': resolveDir(resolve(__dirname, "../../gis/")),
    '/软件/': resolveDir(resolve(__dirname, "../../软件/")),
    '/java/': resolveDir(resolve(__dirname, "../../java/")),
    '/cesium/': resolveDir(resolve(__dirname, "../../cesium/"),[/examples/,/customCesium/]),
    '/js/': resolveDir(resolve(__dirname, "../../js/"),[/examples/]),
    '/Geoserver/': resolveDir(resolve(__dirname, "../../Geoserver/"))
}

