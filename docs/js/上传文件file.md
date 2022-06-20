







# 上传文件file

## 参考资料

菜鸟教程:https://www.runoob.com/jsref/dom-obj-fileupload.html

https://blog.csdn.net/xianweizuo/article/details/88911364

FileReader(WebAPI):https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader

## HTML DOM FileUpload对象

在 HTML 文档中 `<input type="file"> `标签每出现一次，一个 FileUpload 对象就会被创建。

该元素包含一个文本输入字段，用来输入文件名，还有一个按钮，用来打开文件选择对话框以便图形化选择文件。

该元素的 value 属性保存了用户指定的文件的名称，但是当包含一个 file-upload 元素的表单被提交的时候，浏览器会向服务器发送选中的文件的内容而不仅仅是发送文件名。

为安全起见，file-upload 元素不允许 HTML 作者或 JavaScript 程序员指定一个默认的文件名。HTML value 属性被忽略，并且对于此类元素来说，value 属性是只读的，这意味着只有用户可以输入一个文件名。当用户选择或编辑一个文件名，file-upload 元素触发 onchange 事件句柄。

您可以通过遍历表单的 elements[] 数组，或者通过使用 document.getElementById()来访问 FileUpload 对象。

### 属性

| 属性                                                         | 描述                                                   | W3C  |
| :----------------------------------------------------------- | :----------------------------------------------------- | :--- |
| [disabled](https://www.runoob.com/jsref/prop-fileupload-disabled.html) | 设置或返回是否禁用 FileUpload 对象。                   | Yes  |
| [accept](https://www.runoob.com/jsref/prop-fileupload-accept.html) | 设置或返回指示文件传输的 MIME 类型的列表（逗号分隔）。 | Yes  |
| [form](https://www.runoob.com/jsref/prop-fileupload-form.html) | 返回对包含 FileUpload 对象的表单的引用。               | Yes  |
| [name](https://www.runoob.com/jsref/prop-fileupload-name.html) | 设置或返回 FileUpload 对象的名称。                     | Yes  |
| [type](https://www.runoob.com/jsref/prop-fileupload-type.html) | 返回表单元素的类型。对于 FileUpload ，则是 "file" 。   | Yes  |
| [value](https://www.runoob.com/jsref/prop-fileupload-value.html) | 返回由用户输入设置的文本后，FileUpload 对象的文件名。  | Yes  |

### 标准属性和事件

FileUpload 对象同样支持标准的 [属性](https://www.runoob.com/jsref/dom-obj-all.html) 和 [事件](https://www.runoob.com/jsref/dom-obj-event.html)。



### html调用方式

dom元素

```html
 <input type="file">
```





### js调用方式

js创建file对象

```javascript
/**
 * 获取文件
 * @param {boolean} 是否选择多个文件
 * @param {Function} 回调函数
 */
getFile(multiple, callback) {
  let file = document.createElement("input");
  file.type = "file";
  file.multiple = multiple;
  file.onchange = function (event) {
    if (typeof callback == "function") {
      callback(event.path[0].files);
    }
  };
  file.click();
}
```

读取文件内容

```javascript
          this.getFile(false, (files) => {
            if (files && files.length == 1) {
              let file = files[0];

              new Promise((resolve) => {
                let reader = new FileReader();
                reader.onload = function (evt) {
                  resolve(evt.target.result);
                };
                reader.readAsArrayBuffer(file);
              }).then((result) => {

              });

            }
          });
```



## FileReader对象

HTML5定义了FileReader作为文件[API](https://so.csdn.net/so/search?q=API&spm=1001.2101.3001.7020)的重要成员用于读取文件，根据W3C的定义，FileReader接口提供了读取文件的方法和包含读取结果的事件模型。

FileReader的使用方式非常简单，可以按照如下步骤创建FileReader对象并调用其方法：

1.检测浏览器对FileReader的支持

```javascript
if(window.FileReader) {
    var fr = new FileReader();
    // add your code here
}
else {
    alert("Not supported by your browser!");
}
```

2.调用FileReader对象的方法

| 方法名              | 参数             | 描述                                                         |
| ------------------- | ---------------- | ------------------------------------------------------------ |
| abort()             | none             | 中止读取操作。在返回时，`readyState`属性为`DONE`。           |
| readAsArrayBuffer() | file             | 开始读取指定的 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)中的内容, 一旦完成, result 属性中保存的将是被读取文件的 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 数据对象. |
| readAsBinaryString  | file             | 开始读取指定的[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)中的内容。一旦完成，`result`属性中将包含所读取文件的原始二进制数据。 |
| readAsDataURL       | file             | 开始读取指定的[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)中的内容。一旦完成，`result`属性中将包含一个`data:` URL格式的Base64字符串以表示所读取文件的内容。 |
| readAsText          | file, [encoding] | 开始读取指定的[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)中的内容。一旦完成，`result`属性中将包含一个字符串以表示所读取的文件内容。 |

3.处理事件

FileReader 包含了一套完整的事件模型，用于捕获读取文件时的状态，下面这个表格归纳了这些事件。

| 事件        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| onabort     | 该事件在读取操作被中断时触发。                               |
| onerror     | 该事件在读取操作发生错误时触发。                             |
| onload      | 文件读取成功完成时触发                                       |
| onloadstart | 该事件在读取操作开始时触发。                                 |
| onloadend   | 该事件在读取操作结束时（要么成功，要么失败）触发。           |
| onprogress  | 该事件在读取[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)时触发。 |

文件一旦开始读取，无论成功或失败，实例的 result 属性都会被填充。如果读取失败，则 result 的值为 null ，否则即是读取的结果，绝大多数的程序都会在成功读取文件的时候，抓取这个值。

```javascript
fr.onload = function() {
    this.result;
}
```

下面通过一个上传图片预览和带进度条上传来展示FileReader的使用。

```html
<script type="text/javascript">
		function showPreview(source) {
			var file = source.files[0];
			if(window.FileReader) {
				var fr = new FileReader();
				fr.onloadend = function(e) {
					document.getElementById("portrait").src = e.target.result;
				};
				fr.readAsDataURL(file);
			}
		}
	</script>
 
<input type="file" name="file" onchange="showPreview(this)" />
<img id="portrait" src="" width="70" height="75">
```



## 示例

下面通过一个上传图片预览和带进度条上传来展示FileReader的使用。

```html
<script type="text/javascript">
		function showPreview(source) {
			var file = source.files[0];
			if(window.FileReader) {
				var fr = new FileReader();
				fr.onloadend = function(e) {
					document.getElementById("portrait").src = e.target.result;
				};
				fr.readAsDataURL(file);
			}
		}
	</script>
 
<input type="file" name="file" onchange="showPreview(this)" />
<img id="portrait" src="" width="70" height="75">

```

如果要限定上传文件的类型，可以通过文件选择器获取文件对象并通过type属性来检查文件类型

```javascript
if(!/image\/\w+/.test(file.type)){
    alert("请确保文件为图像类型");
    return false;
}
```

不难发现这个检测是基于正则表达式的，因此可以进行各种复杂的匹配，非常有用。

如果要增加一个进度条，可以使用HTML 5的progress标签，通过下面的代码实现。

```html
<form>
    <fieldset>
        <legend>分度读取文件：</legend>
        <input type="file" id="File" />
        <input type="button" value="中断" id="Abort" />
        <p>
            <label>读取进度：</label><progress id="Progress" value="0" max="100"></progress>
        </p>
        <p id="Status"></p>
    </fieldset>
</form>
```

```javascript
var h = {
    init: function() {
        var me = this;
         
        document.getElementById('File').onchange = me.fileHandler;
        document.getElementById('Abort').onclick = me.abortHandler;
         
        me.status = document.getElementById('Status');
        me.progress = document.getElementById('Progress');
        me.percent = document.getElementById('Percent');
         
        me.loaded = 0;
        //每次读取1M
        me.step = 1024 * 1024;
        me.times = 0;
    },
    fileHandler: function(e) {
        var me = h;
         
        var file = me.file = this.files[0];
         
        var reader = me.reader = new FileReader();
         
        //
        me.total = file.size;
         
        reader.onloadstart = me.onLoadStart;
        reader.onprogress = me.onProgress;
        reader.onabort = me.onAbort;
        reader.onerror = me.onerror;
        reader.onload = me.onLoad;
        reader.onloadend = me.onLoadEnd;
        //读取第一块
        me.readBlob(file, 0);
    },
    onLoadStart: function() {
        var me = h;
    },
    onProgress: function(e) {
        var me = h;
         
        me.loaded += e.loaded;
        //更新进度条
        me.progress.value = (me.loaded / me.total) * 100;
    },
    onAbort: function() {
        var me = h;
    },
    onError: function() {
        var me = h;
         
    },
    onLoad: function() {
        var me = h;
 
        if(me.loaded < me.total) {
            me.readBlob(me.loaded);
        } else {
            me.loaded = me.total;
        }
    },
    onLoadEnd: function() {
        var me = h;
         
    },
    readBlob: function(start) {
        var me = h;
         
        var blob,
            file = me.file;
         
        me.times += 1;
         
        if(file.webkitSlice) {
            blob = file.webkitSlice(start, start + me.step + 1);
        } else if(file.mozSlice) {
            blob = file.mozSlice(start, start + me.step + 1);
        }
         
        me.reader.readAsText(blob);
    },
    abortHandler: function() {
        var me = h;
         
        if(me.reader) {
            me.reader.abort();
        }
    }
};
 
h.init();
```

