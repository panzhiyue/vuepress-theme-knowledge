官网:https://stuk.github.io/jszip/
参考:https://www.cnblogs.com/wuqilang/p/13567136.html
>jszip是一个用于创建、读取和编辑.zip文件的JavaScript库，且API的使用也很简单。


## npm安装

```bash
npm install jszip
```

##cdn
```html
<script src="https://unpkg.zhimg.com/jszip@3.7.1"></script>

```

## 官方示例



```jsx
var zip = new JSZip();
zip.file("Hello.txt", "Hello World\n");
var img = zip.folder("images");
img.file("smile.gif", imgData, {base64: true});
zip.generateAsync({type:"blob"})
.then(function(content) {
    // see FileSaver.js
    saveAs(content, "example.zip");
});
```

### 创建一个JSZip实例：



```csharp
var zip = new JSZip();
```

### 使用.file(fileName,fileContent)添加一个txt文件



```swift
zip.file("Hello.txt", "Hello World\n");
```

### 使用.folder(folderName)添加一个文件夹



```swift
var img = zip.folder("images");
```

### 使用.file(fileName,fileContent,base64FLag)在文件夹下添加一个图片文件



```bash
img.file("smile.gif", imgData, {base64: true});
```

> 注：fileContent可以是File文件也可以是Blob二进制数据

### 生成一个zip文件



```jsx
zip.generateAsync({type:"blob"})
.then(function(content) {
    // see FileSaver.js
    saveAs(content, "example.zip");
});
```

> type:"blob" 压缩的结果为二进制流,可用作文件上传
> saveAs(content, "example.zip"); 直接在浏览器打成example.zip包并下载，saveAs依赖的js是FileSaver.js