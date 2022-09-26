如果报错`ReferenceError: require is not defined`则是因为没有启用Node功能模块，需要配置如下参数



```javascript
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    // 在渲染进程中使用node, 需要要配置webPreferences属性
    webPreferences: {
      	nodeIntegration: true,
      	contextIsolation: false,
    }
  });
```

