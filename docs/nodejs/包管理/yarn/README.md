

# Yarn

## 参考资料

中文文档:https://www.bookstack.cn/read/yarn-cn/0.md

https://www.yarnpkg.cn/

工作区(博客):https://blog.csdn.net/ivenqin/article/details/118522135



## 工作区

本节我们学习 [Yarn](https://so.csdn.net/so/search?q=Yarn&spm=1001.2101.3001.7020) 工作区，什么是工作区呢？ 工作区是设置软件包体系结构的一种新方式，默认情况下从 Yarn 1.0 开始使用。我们可以使用这种方式安装多个软件包， 也就是只需要执行一次 yarn install 命令便可以将所有依赖包全部安装。

### 如何使用工作区

在 package.json 文件中添加以下内容，接下来我们将此目录称为 “工作区[根目录](https://so.csdn.net/so/search?q=根目录&spm=1001.2101.3001.7020)”：

```json
{
    "private": true,
    "workspaces": ["workspace-a", "workspace-b]
}
```

其中 private:true 是必填项，工作区并不是要发布的，因为添加了此安全措施来确保没有任何东西可以意外地暴露它们。

创建这个文件之后，我们需要在创建两个新的子文件夹：workspace-a 和 workspace-b。在每个文件夹里面，创建一个具有以下内容的 package. json 文件：
workspace-a/package.json：

```json
{
  "name": "workspace-a",
  "version": "1.0.0",

  "dependencies": {
    "cross-env": "5.0.5"
  }
}
```

workspace-b/package.json：

```json
{
    "name": "workspace-b",
    "version": "1.0.0",
    
    "dependencies": {
        "cross-env": "5.0.5",
        "workspace-a": "1.0.0"
    }
}
```

最后可以在工作区根目录中执行 yarn install 命令，如果一切正常，现在应该有一个类似下面这样的文件层次结构：

```
/package.json
/yarn.lock

/node_modules
/node_modules/cross-env
/node_modules/workspace-a -> /workspace-a

/workspace-a/package.json
/workspace-b/package.json
```

workspace-b 需要一个在 workspace-a 中的文件，现在将直接使用当前项目内部的文件，而不是从 Github 上面获取。cross-env 包已正确去重并放在项目的根目录下，让 workspace-a 和 workspace-b可以一起使用这个包。

### 限制和警告

- 包层级在工作区和用户得到的内容之间将有所不同（工作区依赖将提升到文件系统层次结构中）。 对这个层级的假设已经是危险的，因为提升过程不是标准化的，所以理论上没有什么新东西。
- 在上面的示例中，如果 workspace-b 依赖于 workspace-a 的包，但是引用的是不同的版本，那么依赖包将从 Github 安装，而不是从本地文件系统链接。 这是因为一些软件包实际上需要使用以前的版本，以建立新的版本（Babel 是其中之一）。
- 在工作区中发布包时要留心。 如果你正准备发布下一个版本，并且你决定引用一个新依赖但忘了在 package.json 中声明，你的测试仍可能在本地通过（如果其他包已经把那个引用下载到了项目根目录）。 然而其他从源中拉取包的用户就不行了，由于依赖列表现在是不完整的，他们没办法下载那个新依赖。 目前没有办法在这种情况下抛出警告。
- 工作区必须是项目根目录的子目录，我们不能也不应当引用位于项目目录之外的工作区。
  工作区不支持嵌套。







## 其他

速度优化

```
yarn config set registry https://registry.npm.taobao.org -g
```

```
yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
```

不行再搞上这句

```
yarn config set ignore-engines true
```





清理本地缓存

yarn cache clean

查找目录

yarn cache dir



查看当前registry
 `yarn config get registry`
 修改registry为特定的链接( 下方时修改为淘宝的源)

 `yarn config set registry https://registry.npm.taobao.org`





