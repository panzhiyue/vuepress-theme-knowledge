

# Lerna



## 一、什么是Lerna

多包管理工具，方便我们在一个项目中管理多个 npm 包，能够在发包时统一每个包的版本号。

优雅的解决大型多包项目中每发一次包都要手动修改各个包的版本号并单独发布的烦恼。

## 二、环境搭建

```sh
npm i lerna -g

yarn global add lerna
```

安装完成后执行 `lerna -v` 看下是否能够正确的输出 `lerna` 的版本号。

## 三、使用

#### 初始化项目

找一个空文件夹执行 lerna init 初始化项目。

初始化后的目录结构如下所示

```
├── lerna.json // lerna 的相关配置
├── package.json
└── packages // 约定了该文件夹下存放多个 `npm` 包。
    |
```

#### 创建项目包

通过命令行创建项目

```sh
lerna create one
```

在终端输入完 `pkg.json` 的内容时，可以在 `packages` 文件夹下看到 `one` 项目已经被创建好了。

那么现在继续执行 `lerna create two` 创建第二个包出来。

目录结构如下：

```shell
├── lerna.json
├── package.json
└── packages
    ├── one
    │   ├── __tests__
    │   ├── lib
    │   ├── README.md
    │   └── package.json
    └── two
        ├── __tests__
        ├── lib
        ├── README.md
        └── package.json

```

#### lerna [bootstrap](https://so.csdn.net/so/search?q=bootstrap&spm=1001.2101.3001.7020)

每个包都会有单独的依赖需要安装，现在我们在 `one` 包下增加个依赖。

packages/one/package.json

```json
{
  ...

  "dependencies": {
    "classnames": "^2.2.6"
  },

  ...
}
```

在终端执行

```sh
lerna bootstrap
```

会在包中帮你安装完这些依赖。

## 四、发布

#### 登录 npm

```bash
npm login
```

如果没有 `npm` 账号，可以到 [npm 官网](https://www.npmjs.com/) 注册一个。

#### 发布

现在我们把 `packages` 下的两个包发布到 `npm` 上。执行:

```sh
lerna publish

info cli using local version of lerna
lerna notice cli v4.0.0
lerna info current version 0.0.0
lerna ERR! ENOCOMMIT No commits in this repository. Please commit something before using version.
```

#### err: 此存储库中没有提交

这里报错了，来看下错误的信息：

```sh
此存储库中没有提交。请在使用版本之前提交一些内容。
```

说明，要想在 `npm` 上发布包，需要有 `git` 仓库。

那么可以创建个 `git` 仓库，先将代码提交。

为了防止提交 `node_modules` 的文件夹，在根目录中增加 `.gitignore` 文件。

```
/node_modules
/packages/*/lib
/packages/*/dist
/packages/*/node_modules
```

给每个包的 `package.json` 增加 `git` 地址：

`/packages/one/package.json`:

```json
{
  ...

  "repository": {
    "type": "git",
    "url": "https://github.com/hang1017/lernaStudy"
  },

  ...
}
```

#### err: 项目中存在未提交的代码

现在再执行下 `lerna publish`

```
lerna ERR! EUNCOMMIT Working tree has uncommitted changes, please commit or remove the following changes before continuing:
lerna ERR! EUNCOMMIT  M packages/one/package.json
lerna ERR! EUNCOMMIT  M packages/two/package.json
```

这个报错信息说明，我们的项目还有未提交到 `git` 上的内容，这里我们把上面新增的代码提交到 `git` 上去。

说明每次发包前都要将代码提交干净再去发包。

再次执行 `lerna publish`

```sh
lerna publish

? Select a new version (currently 0.0.0) (Use arrow keys)
❯ Patch (0.0.1)------------------小版本
  Minor (0.1.0)------------------中版本
  Major (1.0.0)------------------大版本
  Prepatch (0.0.1-alpha.0)
  Preminor (0.1.0-alpha.0)
  Premajor (1.0.0-alpha.0)
  Custom Prerelease
  Custom Version
```

那么选择 `Patch` 发布一个小版本的包。

又出现报错信息：

```sh
lerna notice Skipping all user and access validation due to third-party registry
lerna notice Make sure youre authenticated properly ¯\_(ツ)_/¯
lerna WARN ENOLICENSE Packages one and two are missing a license.
lerna WARN ENOLICENSE One way to fix this is to add a LICENSE.md file to the root of this repository.
lerna WARN ENOLICENSE See https://choosealicense.com for additional guidance.
lerna http fetch PUT 403 http://registry.npmjs.org/one 615ms
lerna ERR! E403 You do not have permission to publish "one". Are you logged in as the correct user?
```

#### err: 403 没有权限\增加许可证

因为 npm 有一百多万的包，所以我们使用 one || two 这样简单名字的包会因为和别的包重名导致没有该包的权限而无法发布。而有些私有包，你在 npm 上无法找到，但也确确实实存在。因此

1、需要修改下 one || two 两个包的名称。

2、在两个包的 package.json 增加 "license": "MIT"

3、在根目录增加 LICENSE 的文件，内容如下：

**要修改第三行的名称和邮箱**

```
The MIT License (MIT)

Copyright (c) 2017-present yournane (*********@qq.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

至此我们再次执行 `lerna publish` 命令，试试能不能成功发布。

在我本地还是会出现 `403` 的权限问题。

不懂有没有社会好心人士能够帮忙看看这个问题。

**但是为了能够顺利发包，我们可以建立一个私有组织，以私有组织的名义来发包。**

### 四、私有包

#### 1、创建 npm 组织和 git 组织。

先创建一个 npm 组织，以 dlijs 为例(小伙伴换一个名称，这个名称已经被我用了)。

并且在 git 上创建一个 dlijs 的组织。并且把项目迁移到这个组织下。

#### 2、修改项目仓库名称

将两个包的 package.json 修改成 @dlijs/one 和 @dlijs/two。

好了那么接下来就可以尝试发包了。

在笔者的测试下，是可以顺利的发包了。在 npm 上就能够搜索到 @dlijs/one 和 @dlijs/two 这两个包了。







## 参考资料

https://blog.csdn.net/weixin_42278979/article/details/118458638