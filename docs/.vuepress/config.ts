// import vue from '@vitejs/plugin-vue'
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { defineUserConfig } from '@vuepress/cli'
// import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { searchPlugin } from '@vuepress/plugin-search'
// import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
// import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
// import { shikiPlugin } from '@vuepress/plugin-shiki'
import { defaultTheme } from '@panzhiyue/vuepress-theme-knowledge'
import { navbar, sidebar } from './configs'
import demoBloclPlugin from '@panzhiyue/vuepress-plugin-demo-block'
// import { viteCommonjs } from "@originjs/vite-plugin-commonjs";



const isProd = process.env.NODE_ENV === 'production'

export default defineUserConfig({
  // set site base to default value
  base: '/vuepress-theme-knowledge/',
  dest: '../dist',
  // // extra tags in `<head>`
  // head,
  head: [['script', { src: '/vuepress-theme-knowledge/js/Cesium1.89/Cesium.js' }], ['link', { rel: "stylesheet", type: "text/css", href: '/vuepress-theme-knowledge/js/Cesium1.89/Widgets/widgets.css' }]],
  // site-level locales config
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'vuepress-theme-knowledge',
      description: 'vuepress的一个主题',
    },
  },

  // specify bundler via environment variable
  // bundler:
  //   process.env.DOCS_BUNDLER === 'webpack' ? webpackBundler() : viteBundler(),
  bundler:
    // viteBundler({
    //   viteOptions: {
    //     plugins: [],
    //     // define: {
    //     //   global: "globalThis",
    //     // },
    //     build: {
    //       // rollupOptions: {
    //       //   plugins: [nodePolyfills()],
    //       // },
    //       // commonjsOptions: {
    //       //   transformMixedEsModules: true,
    //       // },
    //       // target: "esnext",
    //       // ssr: true
    //     },
    //     ssr: {
    //       noExternal: ['vue-demi'],
    //     },
    //     // worker: {
    //     //   format: "es"
    //     // }
    //     // optimizeDeps: {
    //     //   esbuildOptions: {
    //     //     // Node.js global to browser globalThis
    //     //     // define: {
    //     //     //   global: "window",
    //     //     // },
    //     //     // Enable esbuild polyfill plugins
    //     //     plugins: [
    //     //       // NodeGlobalsPolyfillPlugin({
    //     //       //   buffer: true,
    //     //       // }),
    //     //       esbuildCommonjs(['ol']) 
    //     //     ],
    //     //   },
    //     //   },
    //   }

    // }),
    webpackBundler({
      configureWebpack() {
        return {
          resolve: {
            extensions: ['.js', '.vue', ".json"],
          },
          module: {
            rules: [
              {
                test: /\.m?js$/,
                type: "javascript/auto",
              },
              {
                test: /\.m?js$/,
                resolve: {
                  fullySpecified: false,
                },
              },
              // {
              //   test: /\.json$/,
              //   use: "json-loader"
              // },
              // {
              //   test: /\.(png|gif|jpg|jpeg|svg|xml|jfif)$/,
              //   use: ['url-loader']
              // }
            ]
          }
        }
      }

    }),

  // configure default theme
  theme: defaultTheme({
    logo: '/images/hero.png',
    repo: 'panzhiyue/vuepress-theme-knowledge',
    docsDir: 'docs',
    navbar,
    selectLanguageName: '简体中文',
    selectLanguageText: '选择语言',
    selectLanguageAriaLabel: '选择语言',
    sidebarDepth: 5, // 侧边栏显示深度，默认1，最大2（显示到h3标题）
    // sidebar
    sidebar,
    // page meta
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdatedText: '上次更新',
    contributorsText: '贡献者',
    // custom containers
    tip: '提示',
    warning: '注意',
    danger: '警告',
    // 404 page
    notFound: [
      '这里什么都没有',
      '我们怎么到这来了？',
      '这是一个 404 页面',
      '看起来我们进入了错误的链接',
    ],
    backToHome: '返回首页',
    // a11y
    openInNewWindow: '在新窗口打开',
    toggleDarkMode: '切换夜间模式',
    toggleSidebar: '切换侧边栏',

    themePlugins: {
      // only enable git plugin in production mode
      git: isProd,
      // use shiki plugin in production mode instead
      prismjs: !isProd,
    },

  }),
  // configure markdown
  markdown: {
  },
  // use plugins
  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: '搜索',
        },
      },
    }),
    // docsearchPlugin({
    //   appId: '34YFD9IUQ2',
    //   apiKey: '9a9058b8655746634e01071411c366b8',
    //   indexName: 'vuepress',
    //   searchParameters: {
    //     facetFilters: ['tags:v2'],
    //   },
    //   locales: {
    //     '/': {
    //       placeholder: '搜索文档',
    //       translations: {
    //         button: {
    //           buttonText: '搜索文档',
    //           buttonAriaLabel: '搜索文档',
    //         },
    //         modal: {
    //           searchBox: {
    //             resetButtonTitle: '清除查询条件',
    //             resetButtonAriaLabel: '清除查询条件',
    //             cancelButtonText: '取消',
    //             cancelButtonAriaLabel: '取消',
    //           },
    //           startScreen: {
    //             recentSearchesTitle: '搜索历史',
    //             noRecentSearchesText: '没有搜索历史',
    //             saveRecentSearchButtonTitle: '保存至搜索历史',
    //             removeRecentSearchButtonTitle: '从搜索历史中移除',
    //             favoriteSearchesTitle: '收藏',
    //             removeFavoriteSearchButtonTitle: '从收藏中移除',
    //           },
    //           errorScreen: {
    //             titleText: '无法获取结果',
    //             helpText: '你可能需要检查你的网络连接',
    //           },
    //           footer: {
    //             selectText: '选择',
    //             navigateText: '切换',
    //             closeText: '关闭',
    //             searchByText: '搜索提供者',
    //           },
    //           noResultsScreen: {
    //             noResultsText: '无法找到相关结果',
    //             suggestedQueryText: '你可以尝试查询',
    //             reportMissingResultsText: '你认为该查询应该有结果？',
    //             reportMissingResultsLinkText: '点击反馈',
    //           },
    //         },
    //       },
    //     },
    //   },
    // }),
    // googleAnalyticsPlugin({
    //   // we have multiple deployments, which would use different id
    //   id: process.env.DOCS_GA_ID ?? '',
    // }),
    // registerComponentsPlugin({
    //   componentsDir: path.resolve(__dirname, './components'),
    // }),
    // // only enable shiki plugin in production mode
    // isProd ? shikiPlugin({ theme: 'dark-plus' }) : [],
    demoBloclPlugin({
      componentsDir: "./",
      lang: "zh-CN"

    })
  ],
})
