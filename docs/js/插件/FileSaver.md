https://gitee.com/original-culture_0/FileSaver.js?_from=gitee_search#saving-urls

## npm安装
```bash
npm i file-saver

# Additional typescript definitions
npm install @types/file-saver --save-dev
```

```html
import { saveAs } from 'file-saver';

FileSaver saveAs(Blob/File/Url, optional DOMString filename, optional Object { autoBom })
```

## cdn
```html
<script src="https://unpkg.zhimg.com/file-saver@2.0.5"></script>
```

```html
FileSaver saveAs(Blob/File/Url, optional DOMString filename, optional Object { autoBom })
```

## 示例
### 1.保存文本
```javascript
var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
FileSaver.saveAs(blob, "hello world.txt");
```

### 2.保存url
```javascript
FileSaver.saveAs("https://httpbin.org/image", "image.jpg");
```

### 3.保存画布
```javascript
var canvas = document.getElementById("my-canvas");
canvas.toBlob(function(blob) {
    saveAs(blob, "pretty image.png");
});
```
### 4.保存文件
```javascript
// Note: Ie and Edge don't support the new File constructor,
// so it's better to construct blobs and use saveAs(blob, filename)
var file = new File(["Hello, world!"], "hello world.txt", {type: "text/plain;charset=utf-8"});
FileSaver.saveAs(file);
```