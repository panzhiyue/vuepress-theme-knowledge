# 第一章 Git概述

## 1.1、Git概述

Git 是一个开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。

Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

Git 与常用的版本控制工具 SVN，CVS，Subversion 等不同，它采用了分布式版本库的方式，不必服务器端软件支持。

Git 不仅仅是个版本控制系统，它也是个内容管理系统(CMS)，工作管理系统等。

如果你是一个具有使用 SVN 背景的人，你需要做一定的思想转换，来适应 Git 提供的一些概念和特征。

## 1.2、Git官网

官方地址：https://git-scm.com/

下载地址：https://git-scm.com/downloads

## 1.3、Git安装

> 安装版本：Git-2.22.0-64-bit.exe

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/e205a393fb5876f588b8e1d723841594.png)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/175da3cf24b668a01352f6ce3671ac4d.png)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/4d94b28f93bf22b5e2e08279944382ba.png)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/c810ec876b1b12ebc786ad719e3ff7f5.png)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/e47af4242f56be1118f2ca8f7e74a216.png)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/29ca721b49e405d203f5d804a31704dd.png)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/12eab49ecc0b9346d6da33d409c3b6cc.png)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/e229c99d437b29b247c7330e169a239d.png)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/aeb612cc63ee8a683be20034726ca588.png)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/08f81e23722dde499e3480db226c94d2.png)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/b6de4c00258a69c97bade87ac348999d.png)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/2664dac711daf44a27be834bcf588389.png)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/30a535a5a4892e727ef1b5dbac95a957.png)

# 第二章 Git工作流程

## 2.1、单人开发流程

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/fb2da7978435cd146c017b32c1066a80.png)

## 2.2、团队内部协作

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/7c99a94f7b7f12f2a73e302722e3927b.png)

# 第三章 Git基本操作

## 3.1、配置的操作

### 3.1.1、查看当前Git配置

```bash
git config --list
```

### 3.1.2、编辑当前Git配置

**编辑本地仓库级别的配置文件：** 仅在当前本地仓库范围有效，该文件默认在`工作空间/.git/config`

```bash
git config -e
```

**编辑系统用户级别的配置文件：** 登录操作系统用户范围有效，该文件默认在`~/.gitconfig`

```bash
git config -e --global
```

### 3.1.3、添加当前Git签名

**本地仓库级别Git签名：**

```bash
git config user.name [用户名称]
git config user.email [用户邮箱]
```

**系统用户级别Git签名：**

```bash
git config --global user.name [用户名称]
git config --global user.email [用户邮箱]
```

## 3.2、初始化操作

```bash
# 在当前目录创建一个本地仓库
git init

# 在当前目录创建指定名称目录，并将其初始化本地仓库
git init [仓库名称]
```

## 3.3、暂存区操作

### 3.3.1、添加文件

```bash
# 添加指定文件到暂存区
git add [文件1] [文件2] ...

# 添加指定目录到暂存区
git add [目录名]
# 添加当前目录的所有文件到暂存区
git add .
```

### 3.3.2、删除文件

```bash
# 普通删除工作区文件，并且将这次删除放入暂存区
git rm [文件1] [文件2] ...

# 强制删除工作区文件，并且将这次删除放入暂存区
git rm --force [文件1] [文件2] ...
# 如果想把文件从暂存区域移除，但仍然希望保留在当前工作目录中，使用 --cached 选项即可
git rm --cached [文件1] [文件2] ...
```

### 3.3.3、改名文件

```bash
# 改名文件，并且将这个改名放入暂存区
git mv [旧文件名] [新文件名]
```

### 3.3.4、查看状态

```bash
# 文件，文件夹在工作区，暂存区的状态
git status
```

## 3.4、本地库操作

### 3.4.1、从暂存区提交文件

```bash
# 提交暂存区到本地仓库
git commit -m [备注信息]

# 提交暂存区的指定文件到本地仓库
git commit -m [备注信息] [文件1] [文件2] ...
# 提交工作区自上次commit之后的变化到本地仓库
git commit -a
# 提交时显示所有diff信息
git commit -v
# 使用一次新的commit，替代上一次提交
# 如果文件没有任何新变化，则用来改写上一次commit的备注信息
git commit --amend -m [备注信息]
# 重做上一次commit，并包括指定文件的新变化
git commit --amend [文件1] [文件2] ...
```

### 3.4.2、从远程库克隆文件

```bash
# 下载远程仓库的一个项目（包括历史记录版本）到本地的当前目录下
git clone [远程仓库项目地址]
```

### 3.4.3、从远程库更新文件

```bash
# 下载远程仓库的所有变动
git fetch [远程仓库项目地址]
```

### 3.4.4、查看推送历史版本

```bash
# 显示当前分支的版本历史
git log

# 显示当前分支的版本历史，美化输出格式（显示全部hash值）
git log --pretty=oneline
# 显示当前分支的版本历史，美化输出格式（显示部分hash值）
git log --oneline
# 显示当前分支的版本历史，以及每次commit发生变更的文件
git log --stat
# 根据关键词搜索提交历史
git log -S [关键词]
# 显示指定次数的提交历史
git log -10
```

## 3.5、远程库操作

### 3.5.1、别名设置

```bash
# 查看当前所有远程地址别名
git remote -v

# 增加一个新的远程地址别名
git remote add [远程地址别名] [远程地址]
# 显示指定的远程地址的信息
git remote show [远程地址别名]
```

### 3.5.2、推送分支

```bash
# 上传本地指定分支到远程仓库
git push [远程地址别名] [本地分支名]

# 强行推送当前分支到远程仓库，即使有冲突
git push --force [远程地址别名]
# 推送所有分支到远程仓库
git push --all [远程地址别名]
# 删除远程分支
git push [远程地址别名] --delete [远程分支名]
```

## 3.6、工作区操作

### 3.6.1、从本地库检出

```bash
# 恢复暂存区的指定文件到工作区
git checkout [文件1] [文件2] ...

# 恢复某个commit的指定文件到暂存区和工作区
git checkout [commithash] [文件1] [文件2] ...
# 恢复暂存区的所有文件到工作区
git checkout .
```

### 3.6.2、从远程库拉取

```bash
# 取回远程仓库的变化，并与本地分支合并
git pull [远程地址别名] [本地分支名]
```

### 3.6.3、比较文件差异

```bash
# 将工作区中的文件和暂存区进行比较
git diff [文件名]

# 将工作区中的文件和本地库历史记录比较
git diff [commithash] [文件名]
# 查看未提交的暂存
git diff --cached
```

## 3.7、重置各区内容

```bash
# 用commithash的内容重置HEAD内容
git reset --soft [commithash]

# 用commithash的内容重置HEAD内容，重置暂存区
git reset --mixed [commithash]
# 用commithash的内容重置HEAD内容，重置暂存区，重置工作目录
git reset --hard [commithash]
```

## 3.8、历史版本回退

- 基于哈希索引值的操作
  - `git reset --hard [commithash]`
  - 注意：该方法既可以前进，也可以后退，是推荐使用的方法
- 使用^符号：只能后退
  - `git reset --hard HEAD^`
  - 注意：一个^表示后退一步，n 个表示后退 n 步
- 使用~符号：只能后退
  - `git reset --hard HEAD~n`
  - 注意：表示后退 n 步

## 3.9、标签签名管理

```bash
# 列出所有tag
git tag

# 查看tag信息
git show [tag]
# 新建一个tag在当前commit
git tag [tag]
# 新建一个tag在指定commit
git tag [tag] [commithash]
# 删除本地tag
git tag -d [tag]
# 提交指定tag
git push [远程地址别名] [tag]
# 删除远程tag
git push [远程地址别名] :refs/tags/[tagName]
# 提交所有tag
git push [远程地址别名] --tags
```

# 第四章 Git分支管理

## 4.1、分支概述

几乎所有的版本控制系统都以某种形式支持分支。

使用分支意味着你可以把你的工作从开发主线上分离开来，以免影响开发主线。

在很多版本控制系统中，这是一个略微低效的过程，常常需要完全创建一个源代码目录的副本。

对于大项目来说，这样的过程会耗费很多时间。

有人把 Git 的分支模型称为它的“必杀技特性”，也正因为这一特性，使得 Git 从众多版本控制系统中脱颖而出。

为何 Git 的分支模型如此出众呢？

Git 处理分支的方式可谓是难以置信的轻量，创建新分支这一操作几乎能在瞬间完成，并且在不同分支之间的切换操作也是一样便捷。

与许多其它版本控制系统不同，Git 鼓励在工作流程中频繁地使用分支与合并，哪怕一天之内进行许多次。

理解和精通这一特性，你便会意识到 Git 是如此的强大而又独特，并且从此真正改变你的开发方式。

## 4.2、创建分支

```bash
# 创建指定名称的本地分支
git branch [分支名]
```

## 4.3、查看分支

```bash
# 列出所有本地分支
git branch

# 列出所有本地分支以及每个分支最新的版本
git branch -v
# 列出所有远程分支
git branch -r
# 列出所有本地分支和远程分支
git branch -a
```

## 4.4、切换分支

```bash
# 切换到指定的分支
git checkout [分支名]

# 切换到上一个分支
git checkout -
# 新建一个本地分支，指向某个tag
git checkout -b [新建分支名称] [tag]
```

## 4.5、合并分支

```bash
# 第一步：切换到被合并分支上
git checkout [被合并分支名]

# 第二步：执行 merge 命令
git merge [要合并分支名]
```

## 4.6、删除分支

```bash
# 删除本地分支
git branch -d [本地分支名]
```

## 4.7、解决冲突

**冲突的表现：**

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/b07f3c0cf1a89574b56c93d62e8b5534.png)

**冲突的解决：**

- 第一步：编辑文件，删除特殊符号
- 第二步：把文件修改到满意的程度，保存退出
- 第三步：git add [文件名]
- 第四步：git commit -m “日志信息”













版权声明：本文为CSDN博主「轻松的小希」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_38490457/article/details/111087134