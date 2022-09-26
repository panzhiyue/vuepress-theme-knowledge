

## 简介

remote 模块提供了一种在渲染进程（网页）和主进程之间进行进程间通讯（IPC）的简便途 径。 Electron 中, 与 GUI 相关的模块（如 dialog, menu 等)只存在于主进程，而不在渲染进程中 。 为了能从渲染进程中使用它们，需要用 ipc模块来给主进程发送进程间消息。使用 remote 模 块，可以调用主进程对象的方法，而无需显式地发送进程间消息，这类似于 Java 的 RMI

## 安装

```
yarn add electron/remote
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



**在渲染进程中**

```javascript
const remote = require("@electron/remote") //1 

win = new remote.BrowerWindow({
width: 300, height: 200, frame: false, transparent: true
// fullscreen:true
})
win.loadURL(path.join('file:',__dirname,'news.html'));
win.on('close',()=>{win = null})
```

