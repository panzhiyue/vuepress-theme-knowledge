# globalShortcut模块

> 所属: 主进程
> 功能: 在应用程序没有键盘焦点时，监听键盘事件
> 需求: 创建和注销全局快捷键

```js
// 注册快捷键
  globalShortcut.register('ctrl+e', () => {
    win.loadURL("https://www.jianshu.com");  // 加载网站 https://www.jianshu.com
  })

// 判断是否注册快捷键成功
  const isRegister = globalShortcut.isRegistered("ctrl+e") ? "register true" : "resgister false";
  console.log(isRegister);  // true/false

app.on('will-quit', () => {
  // 注销单个快捷键
  globalShortcut.unregistter("ctrl+e");
 // 注销全局快捷键
  globalShortcut.unregistterAll();
})
```