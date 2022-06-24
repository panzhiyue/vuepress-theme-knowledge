转自:https://blog.csdn.net/nineya_com/article/details/103380243 

## 写在前面

本文主要描述了怎么使用hexo-admin插件，hexo-admin的基本配置问题，各种问题。文章可能还有很多不足，请大家谅解，欢迎大佬提意见。

## 本文使用的东西

1. win10电脑
2. hexo 3.1.0
3. hexo-admin 2.3.0

### 文章目录

- [写在前面](http://localhost:4000/2020/04/29/hexo博客使用hexo-admin插件管理文章/#_0)
- [本文使用的东西](http://localhost:4000/2020/04/29/hexo博客使用hexo-admin插件管理文章/#_2)
- [1.安装](http://localhost:4000/2020/04/29/hexo博客使用hexo-admin插件管理文章/#1_8)
- [2.使用](http://localhost:4000/2020/04/29/hexo博客使用hexo-admin插件管理文章/#2_19)
- [2.1普通使用](http://localhost:4000/2020/04/29/hexo博客使用hexo-admin插件管理文章/#21_20)
- [2.2安全设置](http://localhost:4000/2020/04/29/hexo博客使用hexo-admin插件管理文章/#22_26)
- [2.3 hexo-admin新建文章设置参数](http://localhost:4000/2020/04/29/hexo博客使用hexo-admin插件管理文章/#23_hexoadmin_43)
- [2.4linux自动提交脚本](http://localhost:4000/2020/04/29/hexo博客使用hexo-admin插件管理文章/#24linux_61)
- [3.总结](http://localhost:4000/2020/04/29/hexo博客使用hexo-admin插件管理文章/#3_73)

## 1.安装

安装hexo-admin只需要一条命令

```c
npm install hexo-admin --save
```

当然如果你有配置淘宝的数据源可以使用下面的命令，安装时网络会稍微稳定一些，插件不大，感觉也差不多。

```c
cnpm install hexo-admin --save
```

可能在安装时还会出现一些缺少依赖的问题，我这里没有遇到，直接安装就运行成功了。所以在安装上要是还遇到什么其他问题的就只能你自己度娘了，也可以截图留言给我，看到都会回复的。

![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206201650216.png)

在这里插入图片描述



## 2.使用

### 2.1普通使用

输入“`hexo`”运行hexo，打开浏览器输入“http://localhost:4000/admin”，现在就可以正常使用了。

```
http://localhost:4000/admin
```



![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206201650216.png)

在这里插入图片描述



### 2.2安全设置

在hexo的“`_config.yml`”文件中还可以配置一些hexo-admin插件的参数，用于保证安全的。如果是部署到GitHub pages上的话就没必要设置这个，因为GitHub只支持静态，而且hexo-admin的管理界面并不会一起被部署上去。

1.在hexo的“`_config.yml`”文件中添加以下参数

```
admin:
  username: 用户名
  password_hash: md5密码
  secret:  用于加密cookie的密码
```

“`_config.yml`”的参数可以使用hexo-admin自动生成，打开hexo-admin界面，点击导航的“settings”选项，输入内容。

![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206230928983.png)


输入内容后下滑，找到生成的代码，复制到“”中重启hexo，打来hexo-admin的界面。

![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206201650216.png)

在这里插入图片描述


**注意**
`secret`



### 2.3 hexo-admin新建文章设置参数

在hexo-admin新建文章可以设置一些文章参数，文章参数配置如下，参数默认值可以为空：

```
# hexo-admin默认文章参数
metadata:
  参数名1: 参数默认值2
  参数名2: 参数默认值2
```

示例：

```
# hexo-admin默认参数
metadata:
  author_id: defaultAuthorId
  language:
```



![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206230929350.png)



### 2.4linux自动提交脚本

在“`_config.yml`”的“admin”参数中加入一个子参数“`deployCommand: './admin_script.sh'`”

![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206201650186.png)

在这里插入图片描述


在hexo博客目录下新建“”文件，输入以下内容：

```
#!/usr/bin/env sh
hexo clean
hexo g  -d
```

本人是windows系统，该方法未实践过，不知道可不可行。看过官方的GitHub，都没有提过“`deployCommand`”这个东西。

可能在这个插件的使用中会出现一些问题，比如图片插入失败等问题。在另一篇文章里我讲述这些问题的解决方法，我是通过修改源码解决问题的，同时附带了修改后的补丁。见我另一篇文章：[hexo-admin插件windows系统插入图片失败问题解决，hexo-admin汉化，通过修改源码完美解决，以及插件的一点点优化](https://blog.csdn.net/nineya_com/article/details/103384546)

## 3.总结

我在使用hexo-admin的时候有时候还是会出现一些问题，如果有不清楚的地方欢迎评论留言，看到的我都会回复的。本文到此结束，有什么不足的地方请大家不吝指正。