# Electron

## 学习资料

中文文档:https://simulatedgreg.gitbooks.io/electron-vue/content/cn/

https://www.electronjs.org/zh/docs/latest

[electron-vue项目构建打包错误失败问题合集](https://blog.csdn.net/qq_43548590/article/details/120021371)

[ecectron_w3c教程](https://www.w3cschool.cn/electronmanual/wcx31ql6.html)

[踩坑 electron-vue](https://www.jianshu.com/p/202993e2abe7)

[vue-cli-plugin-electron-builder](https://nklayman.github.io/vue-cli-plugin-electron-builder/)

[electron-builder](https://www.electron.build/)

[electron-vue 常用api（持续更新)](https://www.jianshu.com/p/0a43bf25c318)

## 开发

### 1.fs不要使用相对路径读取static目录下的文件

```javascript
const url = './static/config/mapInfo.json'
fs.readFileSync(url, 'utf-8')
```

改为

```javascript
const url = path.join(__static, '/config/mapInfo.json')
fs.readFileSync(url, 'utf-8')
```







## 打包bug

### 1.关于task的bug

这个bug是很多人反馈过的，在.electron-vue/build.js中重复申明了task，导致在打包时报错，所以需要对其中一个task进行重命名，我的习惯是将

```javascript
  const tasks = ['main', 'renderer']
  const m = new Multispinner(tasks, {
    preText: 'building',
    postText: 'process'
  })
```

改为

```javascript
 const tasks1 = ['main', 'renderer']
 const m = new Multispinner(tasks1, {
   preText: 'building',
   postText: 'process'
 })
```

### 2.关于electron-xxxx.zip安装下载失败

一般是由网络引起的，需要翻墙下载

离线下载放到`C:\Users\Administrator\AppData\Local\electron\Cache`文件夹下

### 3.关于multispinner的bug

```
npm install multispinner -D
```

这里之所以要单独install一下multispinner，是因为官方里面没有添加multispinner的依赖，同时install以后还需要在
.electron-vue\build.js文件中进行引用

```
const Multispinner = require('multispinner')
```

### 4.关于winCodeSign-2.6.0.7z 或者sis-3.0.4.1/nsis-3.0.4.1.7z 下载出错

### 5.index.html404

dev时正常,build后无法index.html报404错误。

说明在开发环境(production)时网页构建失败，我是这样改的

`.electron-vue/webpack.renderer.config.js`

```javascript
/**
 * Adjust rendererConfig for production settings
 */
if (process.env.NODE_ENV === 'production') {
  rendererConfig.devtool = ''

  rendererConfig.plugins.push(
    new MinifyPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../static'),
        to: path.join(__dirname, '../dist/electron/static'),
        ignore: ['.*']
      }
    ]),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),

  )
}

```

改为

```javascript
/**
 * Adjust rendererConfig for production settings
 */
if (process.env.NODE_ENV === 'production') {
  // rendererConfig.devtool = ''

  rendererConfig.plugins.push(
    new MinifyPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../static'),
        to: path.join(__dirname, '../dist/electron/static'),
        ignore: ['.*']
      }
    ]),

    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': '"production"'
    // }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),

  )
}

```

### 6.资源下载不下来通用方法(设置代理)

```
set HTTP_PROXY=http://127.0.0.1:1080
set HTTPS_PROXY=http://127.0.0.1:1080
```



## 配置

### （1）构建后打开开发者工具

`src/main/index.js`

```javascript
function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)


  mainWindow.webContents.openDevTools();  //打开开发者工具

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}
```

### （2）最大化禁用

```javascript
// 在main.js中 加入transparent: true
mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    transparent: true
  })
```



## 打包配置

### （1）不打包为aras

`packages`

```json
"build":{
	...
	"aras":false,
	...
}
```



### （2）允许自定义安装路径

`packages`

```json
"build":{
	...
	 "nsis": {
      	"oneClick": false,
      	"allowToChangeInstallationDirectory": true,
      	"perMachine": true
     }
	...
}
```







