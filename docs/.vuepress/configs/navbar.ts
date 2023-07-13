import type { NavbarConfig } from '@panzhiyue/vuepress-theme-knowledge'

export const navbar: NavbarConfig = [
    {
        text: '编程',
        link: '/编程/'
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
                text: 'cesium',
                link: '/cesium/'
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
                text: 'MapBox',
                link: '/MapBox/'
            },
            {
                text: '第三方地图',
                link: '/第三方地图/'
            },
            {
                text: 'Geoserver',
                link: '/Geoserver/'
            }, {
                text: 'GDAL',
                link: '/GDAL/'
            }, {
                text: 'Geotools',
                link: '/Geotools/'
            }, {
                text: 'MapBox',
                link: '/MapBox/'
            }, {
                text: 'MapGIS',
                link: '/MapGIS/'
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
            {
                text: 'js',
                link: '/js/'
            }, {
                text: 'html',
                link: '/html/'
            }, {
                text: 'TypeScript',
                link: '/TypeScript/'
            }, {
                text: 'Webpack',
                link: '/Webpack/'
            },
        ],
    },
    {
        text: '系统',
        children: [
            {
                text: 'windows',
                link: '/windows/'
            }, {
                text: 'Mac',
                link: '/Mac/'
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
        text: 'java',
        link: '/java/'

    },
    {
        text: '软件',
        link: '/软件/'

    }, {
        text: '其他',
        children: [
            {
                text: '碎片',
                link: '/碎片/'
            },
            {
                text: '日常生活',
                link: '/日常生活/'
            },
            {
                text: 'echarts',
                link: '/echarts/'
            }, {
                text: 'Flutter',
                link: '/Flutter/'
            }, {
                text: 'gitbook',
                link: '/gitbook/'
            },
            {
                text: 'hexo',
                link: '/hexo/'
            }, {
                text: 'jsdoc',
                link: '/jsdoc/'
            }, {
                text: 'python',
                link: '/python/'
            }, {
                text: '文档语法',
                link: '/文档语法/'
            },
        ],
    },
    // {
    //     text: '考试',
    //     children: [
    //         {
    //             text: '考公',
    //             link: '/考试/考公'
    //         },
    //         {
    //             text: '考编',
    //             link: '/考试/考编'
    //         },
    //     ],

    // }

]