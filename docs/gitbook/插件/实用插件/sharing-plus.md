#### 分享

分享当前页面，比默认的 sharing 插件多了一些分享方式

```json
"plugins": ["-sharing", "sharing-plus"],
    "pluginsConfig": {
        "sharing": {
             "douban": false,
             "facebook": false,
             "google": true,
             "pocket": false,
             "qq": false,
             "qzone": true,
             "twitter": false,
             "weibo": true,
          "all": [
               "douban", "facebook", "google", "instapaper", "linkedin","twitter", "weibo", 
               "messenger","qq", "qzone","viber","whatsapp"
           ]
       }

```

参数配置里面true的默认展示图标，false的默认不展示；all里面的会在分享按钮的下拉列表里面全部展示出来。

效果如下：

![image-20200720145713703](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/aHR0cHM6Ly90dmExLnNpbmFpbWcuY24vbGFyZ2UvMDA3UzhaSWxseTFnZ3hnMjVkZnN0ajMwaWUwczh3ZzEuanBn.webp)

分享效果如下：

![image-20200720145824437](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/aHR0cHM6Ly90dmExLnNpbmFpbWcuY24vbGFyZ2UvMDA3UzhaSWxseTFnZ3hnM2RleTg5ajMxNWEwdG90Y2wuanBn.webp)