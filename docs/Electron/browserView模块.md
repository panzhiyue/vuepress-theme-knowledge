# browserView模块

> 所属: 主进程
> 功能: 创建和控制视图
> 需求: 创建一个视图

- `BrowserView` 被用来让 [`BrowserWindow`](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.electronjs.org%2Fdocs%2Fapi%2Fbrowser-window) 嵌入更多的 web 内容。 它就像一个子窗口，除了它的位置是相对于父窗口。 这意味着可以替代`webview`标签.

```js
let bv = new BrowserView();
mainWindow.setBrowserView(bv);
bv.setBounds({ x: 0, y: 100, width: 1000, height: 600 })
bv.webContents.loadURL('https://www.baidu.com')
```