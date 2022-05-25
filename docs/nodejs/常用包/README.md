## 列表
| 名称         | 描述                                                         | 示例 |
| ------------ | ------------------------------------------------------------ | ---- |
| front-matter | 从文档中提取元数据（最重要的内容）。                         |      |
| fs-extra     | 是系统fs模块的扩展，提供了更多便利的 API，并继承了fs模块的 API |      |
| marked       | Markdown 解析和编译器。                                      |      |
| buble        | ES2015编译器                                                 |      |
| walk         | 遍历文件目录                                                 |      |
| rollup       | JavaScript 模块打包器                                        |      |
| chalk        | 命令行打印美化                                               |      |


## buble 

### **概述**

ES2015编译器

### API

https://www.npmjs.com/package/buble


### **安装**

```bash
npm install  buble
```

或者再package中添加节点后运行`npm install`

```json
{
"devDependencies": {
    "buble": "^0.19.3",
    "buble-loader": "^0.5.1"
  }
} 
```

### **语法**

```javascript
//命令行编译单个js文件
buble --input input.js  --output  output.js
//命令行编译文件夹下所有文件
buble --input inputPath  --output  outputPath

//代码中
var buble = require( 'buble' );
var result = buble.transform( source ); // { code: ..., map: ... }
```

### 示例1

```bash
npm buble --input src/JsDocTest --output build/JsDocTest --no modules --sourcemap
```

### 示例2



假如你有一个文件`example.js`：

```javascript
/**
 * @module example 
 */

/**
 * @classdesc
 * 测试类
 * @api
 */
class example {
    /**
     * 构造函数
     * @param {Object} options 构造参数
     * @param {string} [options.id] 唯一号
     * @param {string} [options.name] 名称
     */
    constructor(options) {
        this.id_ = options.id;
        this.name_ = options.name;
    }
}
```

 然后，您可以执行以下操作： 

```javascript
var buble = require('buble');
const fs = require('fs');

const readOptions = { encoding: 'utf8' };
//md文件
fs.readFile("example.js", readOptions, function (err, data) {
    if (err) {
        return console.error(err);
    }
    var result = buble.transform(data);
    console.log(result);
});
```

输出结果

```json
{
  code: '/**\r\n' +
    ' * @module example \r\n' +
    ' */\r\n' +
    '\r\n' +
    '/**\r\n' +
    ' * @classdesc\r\n' +
    ' * 测试类\r\n' +
    ' * @api\r\n' +
    ' */\r\n' +
    'var example = function example(options) {\r\n' +
    '    this.id_ = options.id;\r\n' +
    '    this.name_ = options.name;\r\n' +
    '};',
  map: SourceMap {
    version: 3,
    file: null,
    sources: [ null ],
    sourcesContent: [
      '/**\r\n' +
        ' * @module example \r\n' +
        ' */\r\n' +
        '\r\n' +
        '/**\r\n' +
        ' * @classdesc\r\n' +
        ' * 测试类\r\n' +
        ' * @api\r\n' +
        ' */\r\n' +
        'class example {\r\n' +
        '    /**\r\n' +
        '     * 构造函数\r\n' +
        '     * @param {Object} options 构造参数\r\n' +
        '     * @param {string} [options.id] 唯一号\r\n' +
        '     * @param {string} [options.name] 名称\r\n' +
        '     */\r\n' +
        '    constructor(options) {\r\n' +
        '        this.id_ = options.id;\r\n' +
        '        this.name_ = options.name;\r\n' +
        '    }\r\n' +
        '}'
    ],
    names: [],
    mappings: 'AAAA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA,IAAM,OAAO,GAOT,gBAAW,CAAC,OAAO,EAAE;AACzB,IAAQ,IAAI,CAAC,GAAG,GAAG,OAAO,CAAC,EAAE,CAAC;AAC9B,IAAQ,IAAI,CAAC,KAAK,GAAG,OAAO,CAAC,IAAI,CAAC;AAC9B'
  }
}
```

## fort-matter

### API

https://www.npmjs.com/package/front-matter

### 描述

 从文档中提取元数据（最重要的内容）。 


### 安装

使用[npm](http://npmjs.org/)可以：

```javascript
npm install front-matter
```

### 语法

```javascript
const frontMatter = require('front-matter');
或
const { attributes, body } = frontMatter(htmlSource);
```

### 示例

假如你有一个文件`example.md`：

```
---
title: Just hack'n
description: Nothing to see here
---
 
This is some text about some stuff that happened sometime ago
```

 **注意：**从`front-matter@2.0.0`有效的开头开始，第一行被认为是起始分隔符。 

 然后，您可以执行以下操作： 

```javascript
var fs = require('fs')
  , fm = require('front-matter')
fs.readFile('./example.md', 'utf8', function(err, data){
  if (err) throw err
  var content = fm(data)
  console.log(content)
})
```

输出结果

```json
{
    attributes: {
        title: 'Just hack\'n',
        description: 'Nothing to see here'
    },
    body: 'This is some text about some stuff that happened sometime ago',
    bodyBegin: 6,
    frontmatter: 'title: Just hack\'n\ndescription: Nothing to see here'
}
```

### 方法

#### fm（string，{allowUnsafe：false}）

返回`content`具有两个属性的对象：

- `content.attributes` 包含以json形式提取的yaml属性
- `content.body` 包含yaml分隔符下方的字符串内容
- `content.bodyBegin` 包含正文内容开始的行号
- `content.frontmatter` 包含原始的yaml字符串内容

**注：**默认情况下`fm()`使用`ys-yaml`的`safeLoad`，除非你设置 `allowUnsafe`的选项对象为true。

#### fm.test(string)

检查字符串是否包含“ ---”或“ = yaml =“的开头事项标头。主要在内部使用，但在模块外部有用。

退货`true`或`false`

```javascript
fm.test(string) #=> true || false
```



## fs-extra -- 文件操作相关工具库
转自:https://www.jianshu.com/p/d6990a03d610?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation

### 项目地址：

[github(fs-extra)](https://link.jianshu.com?t=https://github.com/jprichardson/node-fs-extra)


### 概述

fs-extra模块是系统fs模块的扩展，提供了更多便利的 API，并继承了fs模块的 API

### 安装：

```bash
npm install --save-dev fs-extra
```

### 使用：

```javascript
var fse = require('fs-extra')
```

### API：

#### 1. copy 复制文件

```javascript
copy(src, dest, [option],callback)
```

**option:**

- clobber (boolean): 覆盖现有的文件或目录,默认true
- dereference (boolean): dereference symlinks, default is false
- preserveTimestamps (boolean): 最后修改和访问时间和原始的源文件一致，默认为false
- filter: 函数或正则表达式过滤复制文件,返回true包含，否则排除

**同步:**
 `copySync()`

**示例：**



```javascript
var fs = require('fs-extra');
fs.copy('/tmp/myfile', '/tmp/mynewfile', function (err) {
   if (err) return console.error(err); 
   console.log("success!")
}) //拷贝文件
fs.copy('/tmp/mydir', '/tmp/mynewdir', function (err) {
   if (err) return console.error(err) 
   console.log('success!')
}) //拷贝目录
```

#### 2. emptyDir 清空目录

确保一个目录是空的。如果目录非空删除目录内容。如果目录不存在,就创建一个。目录本身并不是删除。

**异步:**
 `emptydir()`
 **同步:**
 `emptyDirSync(), emptydirSync()`
 **示例：**



```javascript
var fs = require('fs-extra')
//假设这个目录下有很多文件和文件夹
fs.emptyDir('/tmp/some/dir', function (err) {
  if (!err) console.log('success!')
})
```

#### 3. ensureFile 创建文件

确保文件存在。如果被请求的文件的目录不存在,创建这些目录。如果文件已经存在,它不修改。
 **异步:**
 `createFile()`
 **同步:**
 `createFileSync(),ensureFileSync()`
 **示例：**



```javascript
var fs = require('fs-extra');
var file = '/tmp/this/path/does/not/exist/file.txt';
fs.ensureFile(file, function (err) { 
   console.log(err) ;
})
```

#### 4. ensureDir 创建目录

确保目录的存在。如果目录结构不存在,就创建一个。
 **同步: **
 `ensureDirSync()`
 **示例：**



```javascript
var fs = require('fs-extra');
var dir = '/tmp/this/path/does/not/exist';
fs.ensureDir(dir, function (err) {
   console.log(err);
}
```

## marked   

### 概述

marked 是一个 JavaScript 编写的全功能 Markdown 解析和编译器。

marked 的目的是快速的编译超大块的Markdown文本而不必担心结果会出乎意料或者花费很长时间。

### 安装

```bash
npm install marked@0.4.0
```

或者再package中添加节点后运行`npm install`

```json
{
"devDependencies": {
    "marked": "0.4.0"
  }
} 
```

### 语法

```javascript
const marked = require('marked');
marked(str)
```



### 示例

假如你有一个文件`index.md`：

```markdown
## marked   

### 概述

marked 是一个 JavaScript 编写的全功能 Markdown 解析和编译器。

marked 的目的是快速的编译超大块的Markdown文本而不必担心结果会出乎意料或者花费很长时间。

### 安装

​```bash
npm install marked@0.4.0
​```

或者再package中添加节点后运行`npm install`

​```json
{
"devDependencies": {
    "marked": "0.4.0"
  }
} 
​```

### 语法

​```javascript
const marked = require('marked');
marked(str)
​```


```

 然后，您可以执行以下操作： 

```javascript
const marked = require('marked');
const fs = require('fs');


const readOptions = { encoding: 'utf8' };
//md文件
fs.readFile("index.md", readOptions, function (err, data) {
    if (err) {
        return console.error(err);
    }
    console.log(marked(data));
});
```

输出结果

```html
<h2 id="marked">marked</h2>
<h3 id="-">概述</h3>
<p>marked 是一个 JavaScript 编写的全功能 Markdown 解析和编译器。</p>
<p>marked 的目的是快速的编译超大块的Markdown文本而不必担心结果会出乎意料或者花费很长时间。</p>
<h3 id="-">安装</h3>
<pre><code class="language-bash">npm install marked@0.4.0</code></pre>
<p>或者再package中添加节点后运行<code>npm install</code></p>
<pre><code class="language-json">{
&quot;devDependencies&quot;: {
    &quot;marked&quot;: &quot;0.4.0&quot;
  }
} </code></pre>
<h3 id="-">语法</h3>
<pre><code class="language-javascript">const marked = require(&#39;marked&#39;);
marked(str)</code></pre>
```

## rollup 



### 概述

 Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。Rollup 对代码模块使用新的标准化格式，这些标准都包含在 JavaScript 的 ES6 版本中，而不是以前的特殊解决方案，如 CommonJS 和 AMD。ES6 模块可以使你自由、无缝地使用你最喜爱的 library 中那些最有用独立函数，而你的项目不必携带其他未使用的代码。ES6 模块最终还是要由浏览器原生实现，但当前 Rollup 可以使你提前体验。

### API

https://www.npmjs.com/package/rollup

 [**rollup.js 中文文档**](https://www.rollupjs.com/)  

### 安装

```bash
npm install --global rollup
```

### 例子

 假设应用程序入口起点的名称为 main.js，并且你想要所有 import 的依赖(all imports)都编译到一个名为 bundle.js 的单个文件中。 

```bash
# compile to a CommonJS module ('cjs')
$ rollup main.js --file bundle.js --format cjs
```

## walk 

### 概述

 遍历目录

### API:

https://www.npmjs.com/package/walk

### 安装

```bash
npm install  walk
```

或者再package中添加节点后运行`npm install`

```json
{
"devDependencies": {
 "walk": "^2.3.9"
  }
} 
```

### 语法

```javascript
 options = {
    followLinks: false
    // 以下文件夹将被跳过
  , filters: ["Temp", "_Temp"]
  };

//异步
walker = walk.walk("/tmp", options);
//同步
walker = walk.walkSync("/tmp", options);
```

### 事件列表

- `names`
- `directory`
- `directories`
- `file`
- `files`
- `end`
- `nodeError`（`stat`失败）
- `directoryError`（`stat`成功，但`readdir`失败）
- `errors` （遇到的任何错误的集合）

### 例子1

**目录结构**

![1620291404082](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202203201544005.png)

 然后，您可以执行以下操作：

```javascript
var walk = require('walk');
var files = [];

// Walker options
var walker = walk.walk('./test', { followLinks: false,
    // 以下文件夹将被跳过
    filters: [] });

walker.on('file', function (root, stat, next) {
    // Add this file to the list of files
    files.push(root + '/' + stat.name);
    next();
});

walker.on("errors", function (root, nodeStatsArray, next) {
    next();
});

walker.on('end', function () {
    console.log(files);
});

```

输出结果

```json
[
  './test/1.js',
  './test/2.html',
  './test/3.md',
  './test\\temp/temp.js'
]
```

### 示例2

**目录结构**

![1620291404082](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202203201544005.png)

 然后，您可以执行以下操作：

```javascript
var walk = require('walk');
var files = [];
var directories = [];
// Walker options
var walker = walk.walk('./test', {
    followLinks: false,
    // 以下文件夹将被跳过
    filters: ["temp"],
    listeners: {
        names: function (root, nodeNamesArray) {
            nodeNamesArray.sort(function (a, b) {
                if (a > b) return 1;
                if (a < b) return -1;
                return 0;
            });
        }, directory: function (root, dirStatsArray, next) {
            // dirStatsArray is an array of `stat` objects with the additional attributes
            // * type
            // * error
            // * name
            directories.push(root + '/' + dirStatsArray.name);
            next();
        }, file: function (root, fileStats, next) {
            files.push(root + '/' + fileStats.name);
            next();
        }, errors: function (root, nodeStatsArray, next) {
            next();
        },
        end: function () {
            console.log(files, directories);
        }
    }
});


```

输出结果

```json
[ './test/1.js', './test/2.html', './test/3.md' ] [ './test/temp' ]
```

### 



### 示例3



### 

**目录结构**

![1620292732300](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202203201544006.png)

 然后，您可以执行以下操作：

```javascript
var walk = require('walk');
var files = [];
var directories = [];
// Walker options
var walker = walk.walk('./test', {
    followLinks: true,
    // 以下文件夹将被跳过
    filters: ["temp"],
    listeners: {
        /**
         * 
         * @param {string} root 根目录路径
         * @param {Array<string>} nodeNamesArray  子节点名称,包括文件与文件夹
         * @param {Function} next 往下执行
         */
        names: function (root, nodeNamesArray, next) {
            console.log(root, nodeNamesArray);
            nodeNamesArray.sort(function (a, b) {
                if (a > b) return 1;
                if (a < b) return -1;
                return 0;
            });
            next();
        },
        /**
         * 监听文件夹
         * @param {string} root 根目录路径
         * @param {@module dirStats} dirStats 文件夹状态
         * @param {Function} 往下执行
         */
        directory: function (root, dirStats, next) {
            console.log(root, dirStats, next);
            // dirStatsArray is an array of `stat` objects with the additional attributes
            // * type
            // * error
            // * name
            directories.push(root + '/' + dirStats.name);
            next();
        },
        /**
         * 
         * @param {string} root 根目录路径
         * @param {Array<@module dirStats>} dirStatsArray 文件夹状态数组
         * @param {Function} 往下执行
         */
        directories: function (root, dirStatsArray, next) {
            next();
        },
        /**
         * 
         * @param {string} root 根目录路径
         * @param {@module fileStats} fileStats 文件状态
         * @param {Function} 往下执行
         */
        file: function (root, fileStats, next) {
            console.log(fileStats);
            files.push(root + '/' + fileStats.name);
            next();
        },
        /**
         * 
         * @param {string} root 根目录路径
         * @param {Array<@module fileStats>} fileStatsArray 文件状态数组
         * @param {Function} 往下执行
         */
        files: function (root, fileStatsArray, next) {
            next();
        },
        /**
         * 错误
         * @param {string} root 根目录路径
         * @param {any} nodeStatsArray
         * @param {Function} 往下执行
         */
        errors: function (root, nodeStatsArray, next) {
            next();
        },
        /**
         * 结束 
         */
        end: function () {
            console.log(files, directories);
        }
    }
});


/**
 * @typedef dirStats
 * Stats{
  dev: 1620223474,
  mode: 16822,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  blksize: 4096,
  ino: 51784843552,
  size: 0,
  blocks: 0,
  atimeMs: 1620291212000,
  mtimeMs: 1620291212700,
  ctimeMs: 3373865674955.1616,
  birthtimeMs: 1620291212700,
  atime: 2021-05-06T08:53:32.000Z,
  mtime: 2021-05-06T08:53:32.700Z,
  ctime: 2076-11-29T08:54:34.955Z,
  birthtime: 2021-05-06T08:53:32.700Z,
  name: 'temp',
  type: 'directory'
}
 */



/**
 * @typedef fileStats
 *Stats {
  dev: 1620223474,
  mode: 33206,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  blksize: 4096,
  ino: 51784843456,
  size: 0,
  blocks: 0,
  atimeMs: 1620290630000,
  mtimeMs: 1620290630200,
  ctimeMs: 3373865674955.1616,
  birthtimeMs: 1620290630200,
  atime: 2021-05-06T08:43:50.000Z,
  mtime: 2021-05-06T08:43:50.200Z,
  ctime: 2076-11-29T08:54:34.955Z,
  birthtime: 2021-05-06T08:43:50.200Z,
  name: '3.md',
  type: 'file'
}
 */

```

输出结果

```json
./test [ '1.js', '2.html', '3.md', 'temp' ]
Stats {
  dev: 1620223474,
  mode: 33206,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  blksize: 4096,
  ino: 51784843264,
  size: 0,
  blocks: 0,
  atimeMs: 1620290620000,
  mtimeMs: 1620290620790,
  ctimeMs: 3373865674955.1616,
  birthtimeMs: 1620290620790,
  atime: 2021-05-06T08:43:40.000Z,
  mtime: 2021-05-06T08:43:40.790Z,
  ctime: 2076-11-29T08:54:34.955Z,
  birthtime: 2021-05-06T08:43:40.790Z,
  name: '1.js',
  type: 'file'
}
Stats {
  dev: 1620223474,
  mode: 33206,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  blksize: 4096,
  ino: 51784843360,
  size: 0,
  blocks: 0,
  atimeMs: 1620290624000,
  mtimeMs: 1620290625650,
  ctimeMs: 3373865674955.1616,
  birthtimeMs: 1620290625650,
  atime: 2021-05-06T08:43:44.000Z,
  mtime: 2021-05-06T08:43:45.650Z,
  ctime: 2076-11-29T08:54:34.955Z,
  birthtime: 2021-05-06T08:43:45.650Z,
  name: '2.html',
  type: 'file'
}
Stats {
  dev: 1620223474,
  mode: 33206,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  blksize: 4096,
  ino: 51784843456,
  size: 0,
  blocks: 0,
  atimeMs: 1620290630000,
  mtimeMs: 1620290630200,
  ctimeMs: 3373865674955.1616,
  birthtimeMs: 1620290630200,
  atime: 2021-05-06T08:43:50.000Z,
  mtime: 2021-05-06T08:43:50.200Z,
  ctime: 2076-11-29T08:54:34.955Z,
  birthtime: 2021-05-06T08:43:50.200Z,
  name: '3.md',
  type: 'file'
}
./test Stats {
  dev: 1620223474,
  mode: 16822,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  blksize: 4096,
  ino: 51784843552,
  size: 0,
  blocks: 0,
  atimeMs: 1620291212000,
  mtimeMs: 1620291212700,
  ctimeMs: 3373865674955.1616,
  birthtimeMs: 1620291212700,
  atime: 2021-05-06T08:53:32.000Z,
  mtime: 2021-05-06T08:53:32.700Z,
  ctime: 2076-11-29T08:54:34.955Z,
  birthtime: 2021-05-06T08:53:32.700Z,
  name: 'temp',
  type: 'directory'
} [Function: nextWhenReady]
[ './test/1.js', './test/2.html', './test/3.md' ] [ './test/temp' ]
```

## chalk

```javascript
const chalk = require('chalk') // 命令行打印美化
console.log(chalk.yellow(`warning: 该目录 "${toc}" 内部没有任何文件或文件序号出错，将忽略生成对应侧边栏`))
```
