import type { NavbarConfig } from '@panzhiyue/vuepress-theme-knowledge'

export const navbar: NavbarConfig = [
    {
        text: '编程',
        link:'/编程/'
    },
    {
        text: 'gis',
        children: [
            {
                text: 'gis',
                link: '/gis/'
            },
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
            {
                text: 'PostgreSql',
                link: '/PostgreSql/'
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
    },
    {
        text: '软件',
        link: '/软件/'
        
    }

]