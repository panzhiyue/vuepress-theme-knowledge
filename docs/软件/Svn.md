# SVN使用教程

## 一、客户端



## 二、服务端

### 其他

#### 1.迁移至新服务器

##### 项目需求

由于项目需要将原实体服务器中的VisualSVN Server迁移至VMware ESXI 6.5虚拟平台主机中。

##### 环境说明

```
服务器A（迁移源服务器）：
操作系统：Windows2012 R2 SE X64
SVN Server版本：VisualSVN-Server-3.3.1-x64
SVN Client版本：TortoiseSVN-1.8.11.26392-x64-svn-1.8.13

服务器B（迁移目标服务器）：
操作系统：Windows2012 R2 SE X64
SVN Server版本：VisualSVN-Server-3.3.1-x64
SVN Client版本：TortoiseSVN-1.8.11.26392-x64-svn-1.8.13
```

##### 实施过程

##### 服务器端操作

1. 停止SVN服务器

```
通知所有技术部人员停止SVN操作。在服务器端进行STOP操作。
```

![image](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271015971.png)

2.备份全部的版本库实体文件

![image](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271015016.png)

建议将文件夹压缩存放

![image](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271015959.png)

3.在服务器B安装好相同的VisualSVN-Server-3.3.1-x64

4.将备份好的文件复制至服务器B，将解压后覆盖至B服务器的Repositories文件夹

```
拷贝的过程可能会提醒是否覆盖“authz”和“htpasswd”等文件，这个时候一定要选择覆盖，
因为只有覆盖之后才能将之前在A上开通的分组和用户的账号密码复制到B上，否则需要重新注册分配分组和用户，这个地方大家注意一下。
```

5.打开B上的VisualSVN Server Manager，就会看到在左侧的“Repositories”下显示了我们迁移过来的代码工程

![image](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271015981.png)

6.用户与权限也一并同步一致了

![image](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271015673.png)

![image](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271015616.png)

7.服务器B启动svn服务

**这样，服务端相关设置和配置的过程就描述完了。**

##### 客户端测试

1.在需要迁移配置的工程文件夹上点击鼠标右键，下拉菜单中选择“TortoiseSVN”，然后选择“Relocate...”

![image](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271015963.png)

2.点击“Relocate...”之后，弹出如下截图的弹出框：

![image](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271015174.png)

3.重新定位后会弹出一个提示框

![image](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271015541.png)

4.重新更新SVN

![image](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271015672.png)

![image](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271015522.png)

至此，已经全部迁移完成，可以投入使用了。

#### 2.设置提交时必须输入日志信息

##### 1.svn提交时强制输入提交信息

```
为了阻止SVN提交空日志信息和垃圾文件可以在SVN服务器端强制必须填写日志信息，这时需用到pre-commit钩子脚本。
```

 

##### 2.设置方法

**（1）打开VisualSVN管理控制台**

[![复制代码](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271015158.gif)](javascript:void(0);)

 ![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271015686.png) 

[![复制代码](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271015158.gif)](javascript:void(0);)

**（2）右键你要设置的代码仓库**

**（3）所有任务-》Manage Hooks……**

 ![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271015756.png) 

 

**（4）编辑“Pre-commit hook"，输入如下内容：**

[![复制代码](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271015158.gif)](javascript:void(0);)

```bash
@echo off
::    
:: Stops commits that have empty log messages.
::

@echo off
set svnlook="F:\VisualSVN-Server\bin\svnlook.exe"
setlocal

rem Subversion sends through the path to the repository and transaction id
set REPOS=%1
set TXN=%2

rem check for an empty log message
%svnlook% log %REPOS% -t %TXN% | findstr . > nul
if %errorlevel% gtr 0 (goto err) else exit 0

:err
echo 本次提交失败,请输入本次修改的日志信息后再进行提交，谢谢 1>&2
exit 1
```

[![复制代码](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271015158.gif)](javascript:void(0);)

这个编辑对应的是在你的代码仓库目录下的Hook子目录生成了一个.cmd的文件，也可以不通过界面修改。

 

直接创建一个文件，文件名为pre-commit.cmd内容为以上脚本，放入版本库的hooks目录下

 ![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271015723.png) 

 

##### 3.测试一下svn提交文件时不写日志信息时的报错

 ![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271015645.png) 

 可见已经设置成功，下面来测试一下输入提交日志时的情况

 ![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271015737.png) 

已经提交成功。