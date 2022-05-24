import type { SidebarConfig } from '@panzhiyue/vuepress-theme-knowledge'
export const sidebar: SidebarConfig = {
    '/《ArcGIS Python编程案例》/': [
        {
            text: 'ArcGIS Python编程案例',
            children: [
                '/0.前言.md',
                '/1.Python语言基础.md'
                // '/zh/guide/README.md',
                // '/zh/guide/getting-started.md',
                // '/zh/guide/configuration.md',
                // '/zh/guide/page.md',
                // '/zh/guide/markdown.md',
                // '/zh/guide/assets.md',
                // '/zh/guide/i18n.md',
                // '/zh/guide/deployment.md',
                // '/zh/guide/theme.md',
                // '/zh/guide/plugin.md',
                // '/zh/guide/bundler.md',
                // '/zh/guide/migration.md',
            ],
        }
    ]
}