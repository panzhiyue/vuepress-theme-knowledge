import { resolveDir } from "./useSidebar"
import { resolve } from "path"
import type { SidebarConfig } from '@panzhiyue/vuepress-theme-knowledge'
console.log(resolveDir(resolve(__dirname, "../../ArcGIS/")));
export const sidebar: SidebarConfig = {
    '/ArcGIS/': resolveDir(resolve(__dirname, "../../ArcGIS/")),
    '/eCognition/': resolveDir(resolve(__dirname, "../../eCognition/")),
    '/leaflet/': resolveDir(resolve(__dirname, "../../leaflet/")),
    '/openlayers/': resolveDir(resolve(__dirname, "../../openlayers/")),
    '/SuperMap/': resolveDir(resolve(__dirname, "../../SuperMap/")),
    '/第三方地图/': resolveDir(resolve(__dirname, "../../第三方地图/")),
}

