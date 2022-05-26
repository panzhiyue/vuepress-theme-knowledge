import type { Plugin } from '@vuepress/core'
import { hash, path } from '@vuepress/utils'
const demoBlockContainers = require('./common/containers')
const chokidar = require('chokidar')
import prepareClientAppEnhanceFile from './prepareClientAppEnhanceFile'
export const demoBlockPlugin = (options: any = {}): any => {
    options = Object.assign({
        components: {},
        componentsDir: null,
        componentsPatterns: ['**/*.vue'],
        getComponentName: (filename) => path.trimExt(filename.replace(/\/|\\/g, '-'))
    }, options)
    const optionsHash = hash(options)
    const { componentsDir, componentsPatterns } = options
    return {
        name: 'demo-block',
        clientConfigFile: (app) => {
            return prepareClientAppEnhanceFile(app, options, optionsHash)
        },
        extendsMarkdown: md => {
            md.use(demoBlockContainers(options))
        },
        onInitialized(app) {
        },
        onWatched: (app, watchers) => {
            if (componentsDir) {
                const componentsWatcher = chokidar.watch(componentsPatterns, {
                    cwd: componentsDir,
                    ignoreInitial: true,
                })
                componentsWatcher.on('add', () => {
                    prepareClientAppEnhanceFile(app, options, optionsHash)
                })
                componentsWatcher.on('change', () => {
                    prepareClientAppEnhanceFile(app, options, optionsHash)
                })
                componentsWatcher.on('unlink', () => {
                    prepareClientAppEnhanceFile(app, options, optionsHash)
                })
                watchers.push(componentsWatcher)
            }
        },
    }
}
