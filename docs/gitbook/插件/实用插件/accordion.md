这个插件名叫手风琴，可以实现将内容隐藏起来，外部显示模块标题和显示箭头，点击箭头可显示里面的内容。

在`book.json`的plugins参数中添加插件名：

```json
{
    "plugins": ["accordion"]
}
```

然后使用`npm install gitbook-plugin-accordion`命令安装插件。
md文件的写法：

```json
%accordion%模块标题%accordion%
内容部分
%/accordion%
```



![clipboard.png](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/bVbvgSv.webp)

