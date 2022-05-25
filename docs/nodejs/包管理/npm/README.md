## 命令大全

### 1.初始化项目命令

| 名称        | 描述                  | 实例 |
| ----------- | --------------------- | ---- |
| npm init    | 创建一个项目          |      |
| npm init -y | 创建项目,全部选项默认 |      |

### 2.安装模块

| 名称                                                         | 描述                                                         | 实例                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| npm install Module Name[@版本号]                             | 将js库安装在当前执行命令时所在目录下                         | npm install express                                          |
| npm install Module Name[@版本号]  -g                         | 将js库安装到你的全局目录下                                   | npm install express -g                                       |
| npm install  -g Module Name[@版本号]                         | 将js库安装到你的全局目录下                                   | npm install -g express                                       |
| npm install -gd Module Name[@版本号]  --registry=http://registry.npm.taobao.org | 手动指定从哪个镜像服务器获取资源                             | npm install -gd express --registry=http://registry.npm.taobao.org |
| npm install 或npm i                                          | 安装package.json中全部插件                                   |                                                              |
| npm install Module Name [--save\|-S]                         | 安装包信息将加入到dependencies（生产阶段的依赖）             | npm install vue -S                                           |
| npm install Module Name [--save-dev\|-D]                     | 安装包信息将加入到devDependencies（开发阶段的依赖）,所以开发阶段一般使用它 | npm install eslint -D                                        |

如果安装时出现如下错误

```bash
npm err! Error:connect ECONNREFUSED 127.0.0.1:8087
```

解决方法:

```bash
npm config set proxy null
```

### 3.更新模块

| 名称           | 描述                                                         |      |
| -------------- | ------------------------------------------------------------ | ---- |
| npm update     | 可以把当前目录下`node_modules`子目录里边的对应模块更新至最新版本 |      |
| npm update  -g | 可以把全局安装的对应命令行程序更新至最新版。                 |      |
|                |                                                              |      |

### 4.发布模块

| 名称            | 描述                                   | 实例 |
| --------------- | -------------------------------------- | ---- |
| npm unpublish @ | 可以撤销发布自己发布过的某个版本代码。 |      |
|                 |                                        |      |
|                 |                                        |      |

### 5.查看模块

| 名称                          | 描述                   | 实例                     |
| ----------------------------- | ---------------------- | ------------------------ |
| npm list =npm ls              | 查看本地安装的所有模块 |                          |
| npm list  Module Name         | 查看指定模板           |                          |
| npm view Module Name version  | 查看模块远程最新版本   | npm view jquery version  |
| npm view Module Name versions | 查看模块远程所有版本   | npm view jquery versions |
|                               |                        |                          |

### 6.卸载模块

| 名称                           | 描述         | 实例 |
| ------------------------------ | ------------ | ---- |
| npm uninstall\|uni Module Name | 卸载局部模块 |      |
| npm uninstall  -g  Module Name | 卸载全局模块 |      |



### 7.其他

| 名称                                                         | 描述                                                         | 实例                           |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------ |
| npm config set registry http://registry.npm.taobao.org       | 永久设置镜像服务器                                           |                                |
| npm config set registry https://registry.npmjs.org/          | 还原默认镜像地址                                             |                                |
| npm get registry                                             | 获取镜像地址                                                 |                                |
| npm root -g                                                  | 查看全局安装的位置                                           |                                |
| npm help [name]                                              | 可查看某条命令的详细帮助                                     | `npm help install`             |
| npm cache clear                                              | 可以清空NPM本地缓存，用于对付使用相同版本号发布新版本代码的人 |                                |
| npm install cnpm -g --registry=https://registry.npm.taobao.org | 下载cnpm                                                     | npm init                       |
| npm config set prefix  folderpath                            | 修改全局安装目录                                             | npm config set prefix "D:\npm" |



## 发布npm包

转自:https://blog.csdn.net/zz00008888/article/details/109024826

### 一、注册NPM账号

https://www.npmjs.com/

注册好之后记得去填的注册邮箱里面验证一下，在继续下一步，否则发布会报错。

### 二、打开命令行，登录 NPM

在登录之前，先确定一下 `NPM` 镜像，如果镜像在之前设置为了淘宝镜像，那么在使用 `npm login` 登录时会出错，所以需要先将源替换为官方源，然后再上传。

```bash
// 查看当前 npm 源配置
$ npm config ls
// 查看当前 npm 全部源配置
$ npm config ls -l
// 修改 npm 源地址为官方源
$ npm config set registry https://registry.npmjs.org/
// 将 npm 源地址修改为淘宝源（用于安装 npm 速度慢的时候使用）
$ npm config set registry  https://registry.npm.taobao.org/
```

- 通过执行 `$ npm config ls -l` 命令查看 `metrics-registry = "https://registry.npmjs.org/"` 是否为官方源，如果不是则使用上面命令设置为官方源。

- 进行登录

```bash
// 登录命令
$ npm login

// 退出登录命令
$ npm logout
```

运行登录命令之后输入 NPM 账号、密码、邮件

```bash
dengzemiaodeMacBook-Pro:DZMTest dengzemiao$ npm login
Username: dengzemiao
Password: 
Email: (this IS public) xxxxx@163.com
Logged in as dengzemiao on https://registry.npmjs.org/.
```

登录之后出现最下面这行 Logged in as dengzemiao on https://registry.npmjs.org/. 就说明登录成功了。


### 三、创建包

创建一个文件夹，例如：DZMTest

```bash
$ cd DZMTest
```

在文件中创建 package.json，运行命令之后一路回车到底，没啥好改的，等下到文件里面也可以改。

```bash
$ npm init
```

package.json 文件全部字段解释：

一般创建出来的 package.json 文件只会包含下面其中一部分字段，其他都是隐藏可选字段，根据自己的情况使用，下面列出来大部分常用的字段用于参考：

```bash
{
  // 发布的包名，默认是上级文件夹名。不得与现在npm中的包名重复。包名不能有大写字母/空格/下滑线!
  "name": "#####",
  // 版本号，每次要更新
  "version": "1.0.0",
  // 包的描述
  "description": "仅供测试，别下载",
  // 文件入口，默认是 index.js，可修改
  "main": "index.js",
  "scripts": {
    // 测试命令，可以不填直接回车
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // 作者名称
  "author": "###",
  // 包遵循的开源协议，默认是ISC
  "license": "ISC",
  // 因为组件包是公用的，所以 private 为 false
  "private": false,
  // 当前包需要依赖的第三方组件，如何安装使用依赖包，可以看看文章顶部的NPM命令介绍文章
  "dependencies": {},
  // "devDependencies": {}
  // 指定代码所在的仓库地址
  "repository": {
    "type": "git",
    "url": "git+https://github.com/dengzemiao/DZMFullPage.git"
  },
  // bug在哪里提
  "bugs": {
     "url": "https://github.com/dengzemiao/DZMFullPage/issues"
  },
  // 项目官网的地址
  "homepage": "https://github.com/dengzemiao/DZMFullPage",
  // 指定打包后,包中存在的文件夹
  "files": [
    "dist",
    "src"
  ],
  // 指定了项目的目标浏览器的范围
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ],
  // 项目关键词，供搜索
  "keywords": [
    "测试"
  ]
}

```

调整 `package.json`，文件中这两个是必须要填写的，第一个是包名，第二个是版本号，其他随意，更具自己需求调整，没什么特别需求就修改名字跟版本号直接上，其他默认是啥就是啥，看自己需求去改或者增删。

```bash
{
  "name": "dzmtest",
  "version": "1.0.0"
}
```

- 去 `NPM` 官网查询一下当前包名是否存在，存在的话就需要换一个：

  ![img](https://img-blog.csdnimg.cn/img_convert/52d40da0da0f71f7e8f04e0a58efe587.png)

- 在 `DZMTest` 文件夹里面在创建一个 `index.js` 文件，这也是上面设置的入口文件

  `index.js`:

```javascript
// index.js 页面方法
function indexTest () {
  console.log('index.js 测试输出')
}
// 导出 （module.exports 如果使用不是很熟，百度一下就知道了，用法很简单）
module.exports = { indexTest }
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202201110832934.png)

(如果不需要本地测试一下可以跳过) 创建好 index.js 之后可以本地测试一下，创建一个 test.js 在这个文件里面导入 index.js 进行本地使用一下

`test.js`:

```javascript
// 导入 index.js 中的方法进行本地测试
var index = require('./index')
// 执行方法
index.indexTest()
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202201110832935.png)

我这边用的是 VSCode 装了运行 js 的插件可以直接右键运行代码，输出为

```bash
[Running] node "/Users/dengzemiao/Desktop/NPM/DZMTest/test.js"
index.js 测试输出

[Done] exited with code=0 in 0.054 seconds
```

这样，说明代码是没有问题的，那么可以进行发布了！！

(可选) 可以在根目录下新建 .npmignore 文件，设置忽略发布文件，文件不多可以不加，看自己心情。


```
.DS_Store
node_modules/
examples/
packages/
public/
vue.config.js
babel.config.js
*.map
*.html

# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw*
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202201110832936.png)

- 发布代码

```bash
$ npm publish
```

- 如果登录的 NPM 账号没有验证邮箱，运行命令之后会报错 you must verify your email before publishing a new package，所以注册之后记得去邮箱里面验证一下，验证之后可以再次运行发布命令，如果还报这个错误可以重新登录一下 NPM 账号:

```bash
dengzemiaodeMacBook-Pro:DZMTest dengzemiao$ npm publish
npm notice 
npm notice 📦  dzmtest@1.0.0
......
npm ERR! code E403
// 主要是这行错误
npm ERR! 403 403 Forbidden - PUT https://registry.npmjs.org/dzmtest - you must verify your email before publishing a new package: https://www.npmjs.com/email-edit
npm ERR! 403 In most cases, you or one of your dependencies are requesting
npm ERR! 403 a package version that is forbidden by your security policy.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/dengzemiao/.npm/_logs/2020-07-22T03_27_19_859Z-debug.log

```

- 如果出现这个错误，意思是需要修改 `package.json` 中的 `version` 版本号，一般是版本已经存在，新项目发布应该不会报这个错误。

```bash
dengzemiaodeMacBook-Pro:DZMTest dengzemiao$ npm publish
npm notice 
npm notice 📦  dzmtest@1.0.0
......
npm ERR! code E403
// 主要是这行错误
npm ERR! 403 403 Forbidden - PUT https://registry.npmjs.org/dzmtest - You cannot publish over the previously published versions: 1.0.0.
npm ERR! 403 In most cases, you or one of your dependencies are requesting
npm ERR! 403 a package version that is forbidden by your security policy.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/dengzemiao/.npm/_logs/2020-07-23T03_32_29_970Z-debug.log

```

- `You cannot publish over the previously published versions: 1.0.0.` 这个错误是版本已经存在，需要修改一个新版本号在上传，这种问题一般在后续版本迭代中出现，忘记修改版本号就直接提交。

- 下面是 `version` 字段版本格式（这里只是建议这么写，不在意可以随意）

```
1、版本格式：主版本号、次版本号、修订号

2、版本号递增规则如下：（例如：我原本的项目是 1.0.0 版本的话）
   主版本号：当你做了不兼容的 API 修改，此情况版本应该为 1.0.1
   次版本号：当你做了向下兼容的功能性新增，此情况版本应该为 1.1.0
   修订号：当你做了向下兼容的问题修正。此情况版本应该为 2.0.0

3、通过 npm version <update_type> 自动改变版本
   update_type 为 patch、minor,、major 其中之一，分别表示补丁，小改，大改。
   例如: $ npm version minor v2.0.0
```

- 如果有这个错误，可以修改一下 `package.json` 中的 `version` 为 `1.0.1` 版本，然后再次执行发布命令

```
{
  "name": "dzmtest",
  "version": "1.0.1",
}
```

再次执行发布命令

```
$ npm publish
```

```bash
dengzemiaodeMacBook-Pro:DZMTest dengzemiao$ npm publish
npm notice 
npm notice 📦  dzmtest@1.0.0
npm notice === Tarball Contents === 
npm notice 130B index.js    
npm notice 114B test.js     
npm notice 202B package.json
npm notice === Tarball Details === 
npm notice name:          dzmtest                                 
npm notice version:       1.0.0                                   
npm notice package size:  471 B                                   
npm notice unpacked size: 446 B                                   
npm notice shasum:        fc4453748f8b0ca687a2ddea8f650ab75b4c5bec
npm notice integrity:     sha512-V+RHefgSXWB/Q[...]Qm/FP3BNcaL9g==
npm notice total files:   3                                       
npm notice 
+ dzmtest@1.0.0
dengzemiaodeMacBook-Pro:DZMTest dengzemiao$ 

```

- 这样就发布成功了！！！

### 四、使用刚发布的包

#### 1.[创建一个vue项目](https://juejin.im/post/6877429051242479624)，并运行起来。

```
$ vue create npm-test
```

#### 2.在新建的 `npm-test` 项目中导入 `dzmtest` 包，[npm 命令使用介绍以及区别](https://juejin.im/post/6877420922538573832)。

```
$ npm i dzmtest
```

```
dengzemiaodeMacBook-Pro:npm-test dengzemiao$ npm i dzmtest
+ dzmtest@1.0.0
added 1 package and audited 1170 packages in 6.872s

41 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

这样就导入成功了！！

之前在编写 `NPM` 项目的时候内部文件是这样的：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202201110832937.png)

导入到其他项目之后文件内部是这样的，在 `node_modules` 文件目录下：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202201110832938.png)

这样就很清楚明白该怎么去编写 `NPM` 项目了，它是直接整个导入进来了之前的 `NPM` 项目。

#### 3.导入成功之后，支持使用

需要在新建的 `npm-test` 项目里面找到 `main.js` 全局导入一下 `dzmtest`

```javascript
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 如果不是很明白这两种导入方式，可自己百度一下
// JS是这样导入
import DZMTest from 'dzmtest'
Vue.prototype.$dzmtest = DZMTest

// 如果是自定义UI组件，就需要这样使用，这样就可以直接支持全局使用
// import DZMTest from 'dzmtest'
// Vue.use(DZMTest)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

导入成功之后，可以在任何页面中去使用 `$dzmtest` 这个属性了，这里是新建的项目，就直接在 `Home` 页面测试一下就行了

```javascript
<template>
  <div class="home"> </div>
</template>

<script>

export default {
  mounted () {
    this.$dzmtest.indexTest()
  }
}
</script>
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202201110832940.png)

然后运行项目就会输出成功了

```
npm run serve
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202201110832941.png)

上传自定义组件到 `NPM` 到这里就完成了！！！！！！

### 五、快速发布

```
// 修改 npm 源地址为官方源
$ npm config set registry https://registry.npmjs.org/
//登录
npm login
//在原来的版本上自动加1,实际上是将package.json文件中的version值修改了
npm version patch
//重新发布包
npm publish
//删除指定的版本
npm unpublish 包名@版本号
//删除整个包,删除需要24之后才能发布相同名字的包
npm unpublish 包名 --force

//发布成@panzhiyue/plugin这种形式
npm publish --access=public
```

## link

### git + npm link

先来看一下[npm install 文档](https://link.jianshu.com/?t=https%3A%2F%2Fdocs.npmjs.com%2Fcli%2Finstall)。 npm 支持安装 git 仓库，支持 `git` , `git+ssh` , `git+http` , `git+https` , or `git+file` 几种协议，例如：

```shell
npm install git+<https://xxx.com/private-package.git>
```

这样会安装这个仓库的最新版本，如果需要指定版本依赖可以使用 git 的 Tag 来控制。

#### 使用 Tag 控制版本

```shell
npm install git+https://xxx.com/private-package.git#v1.0.0
```

#### npm link 的使用

很多时候我们需要修改 private-package 模块，但又不想每次先提交git，再执行 `npm install` 命令来看效果，这样效率太低也太麻烦，`npm link` 可以帮助我们很方便的实现这样的功能。

两种使用方法：

第一种、

```shell
# clone 私有包
git clone https://xxx.com/private-package.git
# 进入私有包目录
cd private-package
# 创建全局的link
npm link

# 进入项目目录
cd ../project/abc
# 将private-package link 到项目
npm link private-package

# 取消link 
npm unlink private-package第二种、直接进入项目目录
cd ~/project/abc
# link 相对路径的 private-package
npm link ../private-package

# 取消相对路径的 private-package
npm unlink ../private-package
```

这种方式成本最低，试用于规模比较小的团队，无需搭建私服，只要 git 仓库就可以搞定。