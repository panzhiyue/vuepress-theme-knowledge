import type { NavbarConfig } from '@panzhiyue/vuepress-theme-knowledge'

export const navbar: NavbarConfig = [
    {
        text: 'gis',
        children: [
            {
                text: 'ArcGIS',
                link: '/ArcGIS/'
            },
            {
                text: 'eCognition',
                link: '/eCognition/'
            },
            {
                text: 'SuperMap',
                link: '/SuperMap/'
            },
            {
                text: 'leaflet',
                link: '/leaflet/'
            },
            {
                text: 'openlayers',
                link: '/openlayers/'
            },
            {
                text: '第三方地图',
                link: '/第三方地图/'
            },
        ],
    }
]