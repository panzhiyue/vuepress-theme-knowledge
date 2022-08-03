

# 编译SQLite库

## 一、下载

SQLite3的官方下载地址为https://www.sqlite.org/download.html

下载Source Code下的sqlite-amalgamation-3360000.zip，和Precompiled Binaries for Windows下的sqlite-dll-win32-x86-3360000.zip sqlite-tools-win32-x86-3360000.zip
![image-20220801093756311](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010937360.png)

## 二、解压

将下载好的两个文件sqlite-amalgamation-3360000.zip、和sqlite-dll-win32-x86-3360000.zip解压到SQLite文件夹内,如下所示：

```
F:.
├─sqlite-amalgamation-3360000
│      shell.c
│      sqlite3.c
│      sqlite3.h
│      sqlite3ext.h
│
└─sqlite-dll-win64-x64-3360000
        sqlite3.def
        sqlite3.dll

```

## 三、创建静态库工程

在SQLite目录下创建一个新工程

![image-20220801171411997](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208011714049.png)



![image-20220801093818379](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010938428.png)

选好工程创建位置之后，将`sqlite3.c`、`sqlite3.h`、`sqlite3ext.h`、`sqlite3.def`四个文件添加到工程中，如下图所示：

![image-20220801093827465](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010938519.png)

C/C++ --> 预处理器 --> 预处理器定义：设置预定义处理
`_USRDLL`
`SQLITE_ENABLE_RTREE`
`SQLITE_ENABLE_COLUMN_METADATA`
`SQLITE_ENABLE_FTS5`
`SQLITE_ENABLE_UNLOCK_NOTIFY`

![image-20220801093855152](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010938194.png)

设置模块定义文件,链接器 --> 输入 --> 模块定义文件：`sqlite3.def`

![image-20220801093904280](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010939319.png)

修改模块定义文件:在最后追加`sqlite3_unlock_notify`

![image-20220801093911431](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010939470.png)

配置类型改为静态库lib

![image-20220801093918295](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010939339.png)

最后生成解决方案(需要生成debug版时，选择debug，这里一release版为例），在F:\SQLite\SQLite3\x64\Release文件夹可以看到SQLite3.lib静态库和SQLite3.exe(debug版在F:\SQLite\SQLite3\x64\Release文件夹中)。
在SQLite目录中分别创建include和lib和bin文件夹,将刚才生成的.lib文件放入lib文件夹中,将sqlite3.h、sqlite3ext.h放入include中，将sqlite-tools-win32-x86-3360000.zip中的sqlite3.exe放在bin文件夹中以备后用。

## 四、编译文件

链接：https://pan.baidu.com/s/1PLW0HuAa89uFCsIATbDqsg 
提取码：4crn

## 五、参考资源

https://blog.csdn.net/weixin_42141589/article/details/94357199