### 3.7 Gitalk评论插件

Gitalk插件的使用教程:[https://segmentfault.com/a/11...](https://segmentfault.com/a/1190000018072952)

这个插件是需要在`MD`文件中写入代码的，在需要评论插件的MD文件的最下面写入如下代码：

```html
<link rel="stylesheet" href="//cdn.bootcss.com/gitalk/1.5.0/gitalk.min.css">
<script src="//cdn.bootcss.com/gitalk/1.5.0/gitalk.min.js"></script>
<div id="gitalk-container"></div>
<script>
    var gitalk = new Gitalk({
    clientID: '2eb19afceda708b27e64', // GitHub Application Client ID
    clientSecret: '36aedb5a30321626a8631689fee5fafd5929f612', // GitHub Application Client Secret
    repo: 'book',              // 存放评论的仓库
    owner: 'user',          // 仓库的创建者，
    admin: ['user'],        // 如果仓库有多个人可以操作，那么在这里以数组形式写出
    id: location.pathname,      // 用于标记评论是哪个页面的，确保唯一，并且长度小于50
    });
    gitalk.render('gitalk-container');    // 渲染Gitalk评论组件
 </script>
```

效果如下图：

![clipboard.png](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/bVbvgRp.webp)