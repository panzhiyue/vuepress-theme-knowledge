### 3.3 edit-link在线编辑文件

`book.json`中插件名和配置信息：

```json
{
    "plugins": ["edit-link"],
    "pluginsConfig": {
      "edit-link": {
            "base": "//github.com/yulilong/book/edit/master",
            "label": "编辑此页面"
       }
    }
}
```

使用`npm i gitbook-plugin-edit-link`命令安装插件。
下过如下图：

![clipboard.png](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/bVbvzyh.webp)
点击编辑按钮，即可跳转到github仓库在线编辑这个文件。