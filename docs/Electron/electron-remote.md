

## 简介

remote 模块提供了一种在渲染进程（网页）和主进程之间进行进程间通讯（IPC）的简便途 径。 Electron 中, 与 GUI 相关的模块（如 dialog, menu 等)只存在于主进程，而不在渲染进程中 。 为了能从渲染进程中使用它们，需要用 ipc模块来给主进程发送进程间消息。使用 remote 模 块，可以调用主进程对象的方法，而无需显式地发送进程间消息，这类似于 Java 的 RMI

## 安装

```
yarn add @electron/remote
```

## 使用

**在主进程中**

```javascript
const remote = require("@electron/remote/main") //1 
remote.initialize()//2

async function createWindow() {
	............
	remote.enable(win.webContents);
	............
}
```



**在渲染进程中使用**

```javascript
const remote = require("@electron/remote") //1 

win = new remote.BrowerWindow({
width: 300, height: 200, frame: false, transparent: true
// fullscreen:true
})
win.loadURL(path.join('file:',__dirname,'news.html'));
win.on('close',()=>{win = null})
```

## API

```javascript
const {BrowserWindow,app,getCurrentWindow,getCurrentWebContents,getGlobal,process } = require ( '@electron/remote' )
```



### BrowserWindow

创建窗口

```javascript
const { BrowserWindow } = require('@electron/remote')
let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```



### app 

### getCurrentWindow()

返回 BrowserWindow - 此网页所属的窗口。

注意：不要在 BrowserWindow 上使用 removeAllListeners。 使用它可以删除所有模糊侦听器、禁用触摸栏按钮上的点击事件以及其他意想不到的后果。

### getCurrentWebContents()

返回 WebContents - 此网页的内容。

### getGlobal(name)

返回 any - 主进程中 name 的全局变量（例如 global[name]）。

### process

一个 NodeJS.Process 对象。 主进程中的进程对象。 这与 remote.getGlobal('process') 相同，但被缓存。

### withRendererCallback 

### withLocalCallback 

### require(module)
