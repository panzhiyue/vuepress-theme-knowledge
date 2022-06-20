# Input

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept

## accept属性详解

input accept属性是用来限制上传的文件格式.接受上传的[文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)

```html
<input type="file" id="file" style="display:none;"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
<a href="javascript:selectFile()">加载本地excel文件</a>
```

```javascript
function selectFile() {
    document.getElementById('file').click();
}
```

- 上传.csv格式

```html
<input text="file" accept=".csv" />
```

- 上传.xls格式

```html
<input text="file"  accept="application/vnd.ms-excel"/>
```

- 上传.xslx格式

```html
<input text="fiel" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
```

- 上传.png/.jpg/etc格式

```html
<input type="file" accept="text/plain" />
```

- 上传图片格式

```html
<input type="file" accept="image/*" />
```

- 上传.htm,.html格式

```html
<input type="file" accept="text/html" />
```

- 上传video(.avi, .mpg, .mpeg, .mp4)格式

```html
<input type="file" accept="video/*" />
```

- 上传.pdf格式

```html
<input type="file" accept=".pdf" />
```

- 如果限制两种文件格式，同时限制

```html
<input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel">
```

