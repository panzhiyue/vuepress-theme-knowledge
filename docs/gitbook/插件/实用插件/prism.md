### 3.6 prism代码块颜色插件

插件地址：[https://github.com/gaearon/gi...](https://github.com/gaearon/gitbook-plugin-prism)
此插件需要禁用gitbook自带的`highlight`插件。
`book.json`中插件名和配置信息：

```
{
    "plugins": ["prism", "-highlight"],
    "pluginsConfig": {
      "prism": {
        "css": [
          "prismjs/themes/prism-okaidia.css"
        ]
      }
    }
}
```

使用`npm install gitbook-plugin-prism`命令安装插件。
效果如下图：
![clipboard.png](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/bVbvpGH.webp)

更多的颜色参考：[https://github.com/gaearon/gi...](https://github.com/gaearon/gitbook-plugin-prism)

***注意：\***代码块的语言标注比如`JS`,`CSS`,如果标注一个插件不认识的语言，在运行打包命令`gitbook build .`这个插件会报错，提示不认识这个语言，这里需要注意一下。