# electron-store

https://baijiahao.baidu.com/s?id=1733141130678685237&wfr=spider&for=pc

## electron-store是什么

- 以文件形式缓存数据，保存[Electron](https://so.csdn.net/so/search?q=Electron&spm=1001.2101.3001.7020)应用程序或模块的简单数据持久性-保存和加载用户首选项，应用程序状态，缓存等
- 数据保存在app.getPath（'userData'）中的JSON文件中。您可以在主进程和渲染器进程中直接使用此模块。

app.getPath(name)-储存你应用程序设置文件的文件夹，默认是 appData 文件夹附加应用的名称。

appData-当前用户的应用数据文件夹，默认对应：

%APPDATA% Windows 中
$XDG_CONFIG_HOME or ~/.config Linux 中
~/Library/Application Support macOS 中

## electron-store怎么用

### 安装

```plain
npm i electron-store
```

### 使用

```javascript
const Store = require('electron-store');
 
let option={
    name:"config",//文件名称,默认 config
    fileExtension:"json",//文件后缀,默认json
    cwd:app.getPath('userData'),//文件位置,尽量不要动，默认情况下，它将通过遵循系统约定来选择最佳位置。C:\Users\xxx\AppData\Roaming\test\config.json
//    encryptionKey:"aes-256-cbc" ,//对配置文件进行加密
    clearInvalidConfig:true, // 发生 SyntaxError  则清空配置,
}
const  store = new Store(option);
 
// 一般直接简化为
const Store = require('electron-store');
 
const  store = new Store();
```

### 获取本地存储路径

electron-store 以json文件的形式将数据存储在本地文件，获取存储文件的目录如下：

```javascript
const { app } = require('electron') // 在程序中获取electron-store文件路径 app.getPath('userData')
```

进入目录，发现文件存储名称为config.json，你可以在主进程与渲染进程使用这个模块



![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/e7cd7b899e510fb3f99f82050f61929fd0430c7f.webp)



一些设置、获取数据的方法

- .set(key, value)
- .set(object)
- .get(key, [defaultValue]) 获取一个数据或defaultValue（如果该数据不存在）。
- .reset(…keys) 将项目重置为其默认值
- .has(key)
- .delete(key)
- .clear()
- .size//获取项目总个数。
- .path //获取存储文件的路径。
- .store //获取所有数据作为对象或将当前数据替换为对象：



### electron-store的小用法

1.如何修改electron-store的数据保存文件的默认位置

通过cwd 配置可以修改，但是最好不要修改，防止出现问题

2.可以进行加密

encryptionKey 设置是否加密

### electron-store的相对于localStorage的优势

- - localStorage仅在渲染进程中起作用。electron-store可以主线程与渲染进程通信，两者都可以用
  - localStorage的容错性不是很高，因此，如果您的应用遇到错误并意外退出，则可能会丢失数据。
  - localStorage仅支持持久字符串。 此模块支持任何JSON支持的类型。
  - localStorage不是很安全，可能是由于xss攻击而泄漏信息。
  - electron-store模块的API更好。 您可以设置并获取嵌套属性。 您可以设置默认的初始配置。
  - 数据卸载后依然存在

与vuex与localstorage的区别

- vuex存储在内存
- localstorage则以文件的方式存储在本地
- electron-store数据存储卸载应用之后依然存在
- 应用场景：vuex用于组件之间的传值，localstorage则主要用于不同页面之间的传值。
- foo: { type: 'number', maximum: 100, minimum: 1, default: 50 }, bar: { type: 'string', format: 'url' }
- 永久性：当刷新页面时vuex存储的值会丢失，localstorage不会。

### electron-store的注意点

1.存储简单信息，不要存储复杂大量信息，容易造成读取速度变慢。

2.每一次get都是一次i/o操作