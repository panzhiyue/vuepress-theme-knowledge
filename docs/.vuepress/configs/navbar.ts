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
    },
    {
        text: '前端',
        children: [
            {
                text: 'nodejs',
                link: '/nodejs/'
            },
            {
                text: 'css',
                link: '/css/'
            },
        ],
    },
    {
        text: '系统',
        children: [
            {
                text: 'windows',
                link: '/windows/'
            },
        ],
    },
    {
        text: '数据库',
        children: [
            {
                text: 'mongodb',
                link: '/mongodb/'
            },
            {
                text: 'mysql',
                link: '/mysql/'
            },
            {
                text: 'sqlserver',
                link: '/sqlserver/'
            },
        ],
    },
    {
        text: 'vue',
        children: [
            {
                text: 'vue',
                link: '/vue/'
            },
        ],
    }

]