转自:https://blog.csdn.net/nineya_com/article/details/103384546 

## 写在前面

本人win10系统，在使用插件时插入图片遇到了图片插入裂图的问题，在网上找了一下教程都无法解决，只有说手动改路径，但是我觉得手动改太麻烦，于是开始翻源码，被我找到了问题所在，顺便根据个人喜好做了一点点修改。文章可能还有很多不足，请大家谅解，欢迎大佬提意见。

附带插件GitHub地址：[hexo-admin](https://github.com/jaredly/hexo-admin)

文章可能有点长，这代表着我写的详细，时间并没有多少内容，每一步我都写的很详细，简单易懂。

## 本文使用到的东西

1. win10电脑
2. hexo 3.1.0
3. hexo-admin 2.3.0

### 文章目录

- [写在前面](http://localhost:4000/2020/04/29/hexo-admin插件windows系统插入图片失败问题解决，hexo-admin汉化，通过修改源码完美解决，以及插件的一点点优化/#_0)
- [本文使用到的东西](http://localhost:4000/2020/04/29/hexo-admin插件windows系统插入图片失败问题解决，hexo-admin汉化，通过修改源码完美解决，以及插件的一点点优化/#_6)
- [1.问题描述](http://localhost:4000/2020/04/29/hexo-admin插件windows系统插入图片失败问题解决，hexo-admin汉化，通过修改源码完美解决，以及插件的一点点优化/#1_12)
- [2.问题分析](http://localhost:4000/2020/04/29/hexo-admin插件windows系统插入图片失败问题解决，hexo-admin汉化，通过修改源码完美解决，以及插件的一点点优化/#2_16)
- [3.问题解决第一步](http://localhost:4000/2020/04/29/hexo-admin插件windows系统插入图片失败问题解决，hexo-admin汉化，通过修改源码完美解决，以及插件的一点点优化/#3_18)
- [4.问题解决第二步](http://localhost:4000/2020/04/29/hexo-admin插件windows系统插入图片失败问题解决，hexo-admin汉化，通过修改源码完美解决，以及插件的一点点优化/#4_43)
- [5.插件修复+优化（附补丁下载地址）](http://localhost:4000/2020/04/29/hexo-admin插件windows系统插入图片失败问题解决，hexo-admin汉化，通过修改源码完美解决，以及插件的一点点优化/#5_68)
- [5.1优化1：修复了插图失败](http://localhost:4000/2020/04/29/hexo-admin插件windows系统插入图片失败问题解决，hexo-admin汉化，通过修改源码完美解决，以及插件的一点点优化/#511_69)
- [5.2优化2：汉化](http://localhost:4000/2020/04/29/hexo-admin插件windows系统插入图片失败问题解决，hexo-admin汉化，通过修改源码完美解决，以及插件的一点点优化/#522_71)
- [5.3优化3：添加按文章存储图片功能（方便管理）](http://localhost:4000/2020/04/29/hexo-admin插件windows系统插入图片失败问题解决，hexo-admin汉化，通过修改源码完美解决，以及插件的一点点优化/#533_74)
- [5.4优化4：修复了编辑界面预览链接错误bug](http://localhost:4000/2020/04/29/hexo-admin插件windows系统插入图片失败问题解决，hexo-admin汉化，通过修改源码完美解决，以及插件的一点点优化/#544bug_79)
- [5.5优化5：修复了新建分页失败bug](http://localhost:4000/2020/04/29/hexo-admin插件windows系统插入图片失败问题解决，hexo-admin汉化，通过修改源码完美解决，以及插件的一点点优化/#555bug_83)
- [5.6补丁下载地址](http://localhost:4000/2020/04/29/hexo-admin插件windows系统插入图片失败问题解决，hexo-admin汉化，通过修改源码完美解决，以及插件的一点点优化/#56_131)
- [6.总结](http://localhost:4000/2020/04/29/hexo-admin插件windows系统插入图片失败问题解决，hexo-admin汉化，通过修改源码完美解决，以及插件的一点点优化/#6_154)

## 1.问题描述

在使用hexo插入图片的时候，我发现插入的 图片显示错误，而且链接有问题，不应该是“’！[upload successful] (\images\pasted-1.png)’”
应该是“’！[upload successful] (/images/pasted-1.png)’”

![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206230927360.png)



## 2.问题分析

既然图片链接格式有错，我就手动改了一下链接，发现图片成功显示了，发布之后都可以正常使用。但是不能每次都怎么自己改代码，太麻烦了。后来我赵找到了问题所在。

![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206230927484.png)



## 3.问题解决第一步

1.打开我们博客的目录的“`node_modules`”子目录，找到“`hexo-admin`”快捷方式。

![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206201650899.png)

在这里插入图片描述


2.双击进入该文件夹，打开“”文件，通过搜索“”字符找到下图的代码片段，红框内就是我们要改的代码。

![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206230927179.png)


3.将代码修改为

```
    filename = imagePath+"/"+ filename	//修改点
    var outpath = path.join(hexo.source_dir, filename)

    var dataURI = req.body.data.slice('data:image/png;base64,'.length)
    var buf = new Buffer(dataURI, 'base64')
    hexo.log.d(`saving image to ${outpath}`)
    fs.writeFile(outpath, buf, function (err) {
      if (err) {
        console.log(err)
      }
      hexo.source.process().then(function () {
        res.done({
          src: filename,	//修改点
          msg: msg
        })
      });
    })
```

## 4.问题解决第二步

修改代码之后，我们可以看到，生成的已经是正确的图片路径了，但是图片还是加载失败了，我发现是因为图片刚上传上前去，hexo还没来得及让图片链接生效，重新刷新一下界面就可以显示了。

但是不能让我们插入一张图片就刷新一次，我们可以让图片上传后暂停一分钟再显示，所以要修改第二处代码。

1.打开hexo-admin目录下的子目录，找到“bundle.js文件”，并打开它。

![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206230927135.png)


2.搜索“‘upload’”找到以下代码

```
uploadImage: function(data, filename)  {return post('/images/upload', {data: data, filename: filename});},
```

修改为

```
    uploadImage: function(data, filename)  {
		var imgJson=post('/images/upload', {data: data, filename: filename});
		var start = (new Date()).getTime();
		while((new Date()).getTime() - start < 1000) {
			continue;
		}
		return imgJson;
	},
```

到这里，图片无法显示的问题完美解决。

## 5.插件修复+优化（附补丁下载地址）

### 5.1优化1：修复了插图失败

就是如上1-4步骤、修改源码，修复了插图失败bug。

### 5.2优化2：汉化

虽然hexo-admin使用起来非常简单，但是作为一个英语学渣，看着英文界面就是不舒服，所以汉化了该插件，爽。

![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206201650740.png)

在这里插入图片描述

![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206230928450.png)



### 5.3优化3：添加按文章存储图片功能（方便管理）

原本系统默认将图片统一存储在“`images`”目录下，文章一多，图片数量疯涨，就不容易维护，所以我添加了按文章存储图片的功能，图片将存储在与文章同目录的同名文件夹下。

![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206230928387.png)


只需要在设置界面，勾选“图片存储在资源目录下”选项即可，取消勾选则将图片存放在hexo-admin定义的存储目录下。



### 5.4优化4：修复了编辑界面预览链接错误bug

原本“分页”的编辑界面的预览链接是错误的，跳转的页面不正确，这里也修复了一下。

![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206201650900.png)

在这里插入图片描述



### 5.5优化5：修复了新建分页失败bug

最初新建分页无法点击确定时会提示如下错误，并且界面没有反应。但是刷新之后可以看到分页是新建成功的，就是有点麻烦，要刷新。

```
Unhandled rejection TypeError: Cannot read property 'source' of undefined
    at addIsDraft (G:\blog\node_modules\_hexo-admin@2.3.0@hexo-admin\api.js:14:25)
    at G:\blog\node_modules\_hexo-admin@2.3.0@hexo-admin\api.js:218:18
    at tryCatcher (G:\blog\node_modules\bluebird\js\release\util.js:16:23)
    at Promise._settlePromiseFromHandler (G:\blog\node_modules\bluebird\js\release\promise.js:547:31)
    at Promise._settlePromise (G:\blog\node_modules\bluebird\js\release\promise.js:604:18)
    at Promise._settlePromise0 (G:\blog\node_modules\bluebird\js\release\promise.js:649:10)
    at Promise._settlePromises (G:\blog\node_modules\bluebird\js\release\promise.js:729:18)
    at Promise._fulfill (G:\blog\node_modules\bluebird\js\release\promise.js:673:18)
    at Promise._resolveCallback (G:\blog\node_modules\bluebird\js\release\promise.js:466:57)
    at Promise._settlePromiseFromHandler (G:\blog\node_modules\bluebird\js\release\promise.js:559:17)
    at Promise._settlePromise (G:\blog\node_modules\bluebird\js\release\promise.js:604:18)
    at Promise._settlePromise0 (G:\blog\node_modules\bluebird\js\release\promise.js:649:10)
    at Promise._settlePromises (G:\blog\node_modules\bluebird\js\release\promise.js:725:18)
    at _drainQueueStep (G:\blog\node_modules\bluebird\js\release\async.js:93:12)
    at _drainQueue (G:\blog\node_modules\bluebird\js\release\async.js:86:9)
    at Async._drainQueues (G:\blog\node_modules\bluebird\js\release\async.js:102:5)
    at Immediate.Async.drainQueues [as _onImmediate] (G:\blog\node_modules\bluebird\js\release\async.js:15:14)
    at processImmediate (internal/timers.js:439:21)
```

修复之后该功能可以正常使用，但是还是会提示另一个错误，我弄了好久，没办法解决，等待懂的大佬教教我。

```
Unhandled rejection WarehouseError: ID `source/444444/index.md` has been used
    at new WarehouseError (G:\blog\node_modules\warehouse\lib\error.js:14:11)
    at _Model._insertOne (G:\blog\node_modules\warehouse\lib\model.js:153:29)
    at G:\blog\node_modules\warehouse\lib\model.js:179:63
    at tryCatcher (G:\blog\node_modules\bluebird\js\release\util.js:16:23)
    at G:\blog\node_modules\bluebird\js\release\using.js:185:26
    at tryCatcher (G:\blog\node_modules\bluebird\js\release\util.js:16:23)
    at Promise._settlePromiseFromHandler (G:\blog\node_modules\bluebird\js\release\promise.js:547:31)
    at Promise._settlePromise (G:\blog\node_modules\bluebird\js\release\promise.js:604:18)
    at Promise._settlePromise0 (G:\blog\node_modules\bluebird\js\release\promise.js:649:10)
    at Promise._settlePromises (G:\blog\node_modules\bluebird\js\release\promise.js:729:18)
    at Promise._fulfill (G:\blog\node_modules\bluebird\js\release\promise.js:673:18)
    at PromiseArray._resolve (G:\blog\node_modules\bluebird\js\release\promise_array.js:127:19)
    at PromiseArray._promiseFulfilled (G:\blog\node_modules\bluebird\js\release\promise_array.js:145:14)
    at Promise._settlePromise (G:\blog\node_modules\bluebird\js\release\promise.js:609:26)
    at Promise._settlePromise0 (G:\blog\node_modules\bluebird\js\release\promise.js:649:10)
    at Promise._settlePromises (G:\blog\node_modules\bluebird\js\release\promise.js:729:18)
    at _drainQueueStep (G:\blog\node_modules\bluebird\js\release\async.js:93:12)
    at _drainQueue (G:\blog\node_modules\bluebird\js\release\async.js:86:9)
    at Async._drainQueues (G:\blog\node_modules\bluebird\js\release\async.js:102:5)
    at Immediate.Async.drainQueues [as _onImmediate] (G:\blog\node_modules\bluebird\js\release\async.js:15:14)
    at processImmediate (internal/timers.js:439:21)
```

### 5.6补丁下载地址

**使用方法**
打开博客目录下的“`\node_modules\hexo-admin`”目录，全选复制所有补丁覆盖原文件即可。

**注意**
我使用的是`hexo-admin 2.3.0`版本，其他版本补丁覆盖之后可能会有问题，可能会有问题，没有测试。

如果使用的和我不是同一个版本，建议先卸载插件，然后再重新添加和我同个版本的hexo-admin，这样就不会有问题。

卸载hexo-admin：

```
npm uninstall hexo-admin –save
```

重新安装2.3.0版本

```
npm install hexo-admin@2.3.0 –save
```

然后覆盖插件。

**下载链接**：链接：https://pan.baidu.com/s/19nJyISHiUEWc4KgrmrXyuw
提取码：t3r0

## 6.总结

弄这个插件耗费我一整天时间，做了一些些优化，目前本人用着还好，没有发现什么问题。有不清楚的地方欢迎评论留言，看到的我都会回复的。本文到此结束，有什么不足的地方请大家不吝指正。