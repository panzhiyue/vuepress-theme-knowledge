

# GDAL编译

## 一、编译SQLite

https://panzhiyue.gitee.io/post/GDAL/%E7%BC%96%E8%AF%91SQLite%E5%BA%93

## 二、编译Proj6

https://panzhiyue.gitee.io/post/GDAL/%E7%BC%96%E8%AF%91Proj6

## 三、下载

GDAL官方下载地址为https://gdal.org/download.html，我下载的版本是`gdal-3.0.0`；

## 四、解压

将下载好的`GDAL3.0.0`解压到`GDAL`文件夹内。

## 五、编译c++

首先简单了解一下`nmake.opt`文件中变量的意义([链接](http://trac.osgeo.org/gdal/wiki/BuildingOnWindows#BasicOptions))：

| 项目      | Value            |
| --------- | ---------------- |
| MSVC_VER  | 编译器版本       |
| WIN64     | 是否编译64位版本 |
| GDAL_HOME | 生成文件的目录   |
| DLLBUILD  | 是否动态编译     |

进入库文件夹中，找到nmake.opt文件，用VS2019打开。

第41行左右，找到MSVC_VER=设置为1921(VS2019版本应该为1920及以上，视自己编译器而定)。
第57行左右找到GDAL_HOME =将生成文件的路径设置成你想要的位置，我这里设置成"F:\warmerda_release"。
第194行左右找到WIN64=YES，如果生成64位版本取消注释本行。
第218行左右找到DLLBUILD=设置为1启动动态编译、 0为静态编译。我这里进行静态编译设置DLLBUILD=0。
第238行左右，找到PROJ_INCLUDE PROJ_LIBRARY,分别设置成你刚才生成PROJ时的include和lib文件夹(其中PROJ_INCLUDE的-I后为地址），并将.lib的名称改对。
第509行左右，找到SQLITE_INC SQLITE_LIB,路径设置同上。
至此设置完成，保存文件。
打开x64 Native Tools Command Prompt for VS 2019进入库文件夹，输入命令：

```bash
nmake /f makefile.vc
nmake -f makefile.vc install
nmake /f makefile.vc devinstall
```

debug版输入

```bash
nmake /f makefile.vc DEBUG=1
nmake -f makefile.vc install
nmake /f makefile.vc devinstall
```


进行编译和安装，完毕后可以在生成文件夹找到5个文件夹

![image-20220801092607180](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010926205.png)

完成！

## 六、编译结果

链接：https://pan.baidu.com/s/15Dnuet5kvylct8oVERSGwQ 
提取码：519h


## 七、参考资源

https://blog.csdn.net/weixin_42141589/article/details/94357199