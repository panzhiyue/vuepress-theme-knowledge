vue-devtools是基于google chrome浏览器的一款调试vue.js应用的开发者浏览器扩展，可以在浏览器开发者工具下调试代码。前端开发工程师应该比较熟悉这款工具，可以边侧边栏窗格中的页面，边检查代码。由于vue是数据驱动的，所以就会存在在开发调试中查看DOM结构并不能看到我们想看到的内容，那么借助vue-devtools插件，我们就可以很容易的对数据结构进行解析和调试。

## 安装

1.下载好vue-devtools压缩包(crx类型的压缩包)，直接解压到本地目录中。如下图：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBASmFuZWIxMDE4,size_20,color_FFFFFF,t_70,g_se,x_16.webp)

 

2.打开Chrome浏览器，选择“自定义及控制”单击，在下拉菜单中选择“更多工具”->“扩展程序”，如下图：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBASmFuZWIxMDE4,size_20,color_FFFFFF,t_70,g_se,x_16.webp)

 

3.将右上角的开发者模式打开，如下图：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/c1949eb917ae4674afa4e6b877a9e91f.webp)

 

4.点击''加载已解压的扩展程序''按钮，选择第一步中保存vue-devtools的目录,点击''选择文件夹''按钮即可。自动回到浏览器后出现如下图所示：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBASmFuZWIxMDE4,size_20,color_FFFFFF,t_70,g_se,x_16.webp)

 

5.在Chrome浏览器中访问vue项目，并打开调试模式（F12），可以看到Vue选项卡，如下图：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBASmFuZWIxMDE4,size_20,color_FFFFFF,t_70,g_se,x_16.webp)

## 自己打包

1.下载源码

 https://github.com/vuejs/vue-devtools.git

2.修改mainifest.json 中的persistent为true

![image-20220825141136180](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/image-20220825141136180.webp)

3.安装依赖

```
yarn
```

4.构建

```
npm run build
```

5. chrome中找到 更多工具 / 扩展程序 选项，吧packages/shell-chrome拖到浏览器中

## 参考资料

https://blog.csdn.net/chenhaiy/article/details/123747229

https://www.cnblogs.com/yxq-funny-soul/p/13389604.html