



转自:https://www.xdnote.com/typedoc/

# TypeScript 文档化工具: typedoc

由于目前主要前端语言由 JavaScript 切换到了 TypeScript，所以原先用的 `JSDoc` 工具也用不了了，虽说 `JSDoc` 官方也在积极适配TypeScript，但始终产品不能等工具。何况不是核心的文档功能。

于是上Github上找了一下，很快发现了以下项目：

TSDoc
typescript-docs
ts2jsdoc

Star 只有几十不说，安装下来，发现功能粗糙，很多基本的应该有的功能很难进行定制，生成效果和预期差距很大。

## TypeDoc

这些项目的理念是基于 JSDoc 或是自己实现一个简单的 JSDoc 来实现文档化，于是换了换思路，终于找到了神器 typedoc



官网 ： [http://typedoc.org](http://typedoc.org/)

GitHub : https://github.com/TypeStrong/typedoc

简单的用了下，虽然也是肤浅的使用，但认定它应该就是 TypeScript 里面的 jsdoc了。

## 为什么不使用JSDoc?

最重要的一点 ：TypeScript 本身已经是强类型语言了，没有必要退化弱类型的 JavaScript 。

TypeDoc 使用的是 `JavaDoc` 而不是 `JSDoc`，由于 TypeScript 更像 Java 而不像 JavaScript 所以使用了更为简单的 JavaDoc 这样一样，Jsdoc里面的很多标签也就没有什么意义了。

先看一个简单的比较：常用的 @param 标签

```javascript
// 1. 在JSDoc里面的写法

/**
* @param {string} name 姓名
* @param {number} age 年龄
*/


// 2. 在TypeDoc里面的写法
/**
* @param name 姓名
* @param age 年龄
*/
```

在TypeDoc里面，很多类型定义的标签你再也不需要了，比如 `@typedef` 等，标签的使用方法更为简单。

| 名称        | 作用       | 备注                                                         |
| ----------- | ---------- | ------------------------------------------------------------ |
| @param      | 参数描述   | 仅供类、接口、方法注释时使用。同一个注释块可同时出现多个`param`描述。 |
| @return     | 返回描述   | 仅供方法注释时使用。除`void`方法外其它所有方法必须有一个`return`描述。 |
| @throws     | 异常描述   | 零到多个。                                                   |
| @exception  | 异常描述   | 零到多个。                                                   |
| @author     | 作者       | 类和接口注释中必须有。可有零到多个。                         |
| @version    | 版本描述   | 类和接口注释中必须有。零或一个。                             |
| @see        | 参考描述   | 可有零到多个。                                               |
| @since      | 起始版本   | 只有一个。                                                   |
| @serial     | 序列化描述 | 或`@serialField`或`@serialData`，可有多个                    |
| @deprecated | 废除标志   | 最多一个。                                                   |

## 使用小记

### 安装

```bash
npm install -g typedoc
```

### 使用

```bash
typedoc --out path/to/documentation/ path/to/typescript/project/
```
### 使用配置文件
```bash
// typedoc.config.json
{
  "entryPoints" : "./src",
  "exclude": "**/__test__/*.ts",
  "out": "./docs"
}
// package.json
"doc:build": "typedoc --options ./typedoc.config.json",
```
### 配合Gulp构建工具使用


虽然可以使用命令行，但一般都是与 `gulp` `webpack` 等工具集成使用，以 `gulp` 为例：安装插件 `gulp-typedoc`

```bash
npm install --save-dev gulp-typedoc
```

配置任务

```javascript
var typedoc = require("gulp-typedoc");
gulp.task("typedoc", function() {
    return gulp
        .src(["src/**/*.ts"])
        .pipe(typedoc({
            module: "commonjs",
            target: "es5",
            out: "docs/",
            name: "Title"
        }))
    ;
});
```

### 配置项

其中 typedoc 可以传配置参数，详细的参数如下：

| 参数                | 类型    | 说明                                                         |
| ------------------- | ------- | ------------------------------------------------------------ |
| out                 | string  | 输出目录                                                     |
| module              | string  | 模块引入方式，可以是 commonjs, amd, system, umd              |
| target              | string  | ES3(默认), ES5, ES6                                          |
| name                | string  | 项目标题                                                     |
| theme               | string  | 皮肤可以是 `default` or `minimal` or 一个路径，[更多资料](http://typedoc.org/guides/themes/) |
| readme              | string  | readme文件，markdown文件的相对地址                           |
| includeDeclarations | boolean | 是否包含 `.d.ts` 文件，如果你的项目是javascript写的，可以使用声明文件的方式来支持TypeScript并生成文档 |
| excludeExternals    | boolean | 是否排除外部引入的模块                                       |
| excludePrivate      | boolean | 是否排除 `private` 修饰的相关字段方法                        |
| excludeProtected    | boolean | 是否排除 `protected` 修饰的相关字段方法                      |
| hideGenerator       | boolean | 隐藏页底的全局链接                                           |
| version             | boolean | 显示 typedoc 版本                                            |
| help                | boolean | 显示帮助信息                                                 |
| gaID                | string  | 如果有 `Google Analytics` 的跟踪ID，可以设置                 |
| exclude             | string  | 排除文件                                                     |
| includes            | string  | 包含文件，应该是一个文件夹的名字，会将下面所有的md文件包含进来（需要使用 `[[include:document.md]]` 引入） |
| media               | string  | 包含媒体，应该是一个文件夹的名字，会包含文件夹下的图片等各种媒体文件（需要使用 `![logo](media://logo.png)` 引入） |

### 插入自己的内容

刚才说了 `includes` `media` 两个参数。

### 其它方式

Webpack ：https://www.npmjs.com/package/typedoc-webpack-plugin

Gulp ：https://www.npmjs.org/package/gulp-typedoc/

Grunt ：https://www.npmjs.org/package/grunt-typedoc



## 插件

[typedoc-plugin-external-module-name](https://github.com/christopherthielen/typedoc-plugin-external-module-name)

当有多个模块，分为不同文件时，可以用上面的插件将模块区分出来。做类似的二级栏目。

[typedoc-plugin-single-line-tags](https://github.com/christopherthielen/typedoc-plugin-single-line-tags)

以上插件可以用一个注解，将描述展示为一行。而非多行，比如一个私有类，可以增加一个[*@*private](https://www.dazhuanlan.com/private)，然后增加一段说明