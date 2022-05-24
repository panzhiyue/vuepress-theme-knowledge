import type { NavbarConfig } from '@panzhiyue/vuepress-theme-knowledge'

export const navbar: NavbarConfig = [
    {
        text: 'gis',
        children: [
            {
                text: 'ArcGIS',
                children: [
                    {
                        text: '《ArcGIS Python编程案例》',
                        link: '/《ArcGIS Python编程案例》/0.前言.md'
                    }
                    // '/zh/reference/cli.md',
                    // '/zh/reference/config.md',
                    // '/zh/reference/frontmatter.md',
                    // '/zh/reference/components.md',
                    // '/zh/reference/plugin-api.md',
                    // '/zh/reference/theme-api.md',
                    // '/zh/reference/client-api.md',
                    // '/zh/reference/node-api.md',
                ],
            },
        ],
    }
]