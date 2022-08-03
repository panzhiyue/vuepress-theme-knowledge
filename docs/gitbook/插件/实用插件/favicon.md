### 3.4 修改网站的favicon.ico

github地址：[https://github.com/menduo/git...](https://github.com/menduo/gitbook-plugin-favicon)
`book.json`中插件名和配置信息：

```
{
    "plugins": ["favicon"],
    "pluginsConfig": {
      "favicon": {
            "shortcut": "asset/img/favicon.ico",
            "bookmark": "asset/img/favicon.ico",
            "appleTouch": "asset/img/favicon.ico",
            "appleTouchMore": {
                "120x120": "asset/img/favicon.ico",
                "180x180": "asset/img/favicon.ico"
            }
        }
    }
}
```

使用`npm install gitbook-plugin-favicon`命令安装插件。
下过如下图：

![clipboard.png](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/bVbvwc3.webp)

***注意：\***
1、图标的格式一定要是`.ico`的，直接修改图片的后缀为`.ico`是无效的。
2、图标的分辨率要是32*32的。
3、可在线把图片转成图标：http://www.bitbug.net/