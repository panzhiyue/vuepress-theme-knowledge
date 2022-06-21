# 编译



https://blog.csdn.net/qq_32153213/article/details/81363588

环境

> windows 10
>
> gdal-3.2.0
>
> swigwin-4.0.2.zip  https://nchc.dl.sourceforge.net/project/swig/swigwin/swigwin-4.0.2/swigwin-4.0.2.zip
>
> vs2019(安装c++开发环境)



1.下载GDAL

 官方下载地址为https://trac.osgeo.org/gdal/wiki/DownloadSource，我下载的版本是gdal-2.3.1。建议将其解压在某个盘的根目录，比如我的解压地址是D:\gdal-2.3.1，为了方便使用，***\*将解压文件名改为gdal\****（一定要改！）。 

2.修改源代码

找到解压目录中的nmake.opt文件，例如本文的文件路径为：D:\gdal\nmake.opt。然后用VS2017打开，不建议用其他文本编辑器。我一共修改了文件中的三个位置：

- 第41行的代码修改为：MSVC_VER=***\*1910\****（根据编译器来确定。1400是指 VS 版本为2010,1800是指 VS 版本为2013,1900是指 VS 版本为2015,1910是指 VS 版本为2017,1921是指 VS 版本为2019）
- 第57行的代码修改为：GDAL_HOME = "***\*D:\gdal\****"
- 修改第184行的代码：原来为# WIN64=YES修改为***\*WIN64=YES\****



3.以管理员身份运行适用与vs2017的x64的本机工具命令提示

**适用于VS2017的X64的本机工具命令提示**可以在开始菜单中找到，一定要以管理员身份运行。如果你的VS2017是英文版，请以管理员身份运行**x64 Native Tools Command Prompt for VS 2017**。



4.编译gdal(3以上版本需要先安装proj库依赖,https://www.cnblogs.com/lwngreat/p/4608308.html,https://www.bbsmax.com/A/pRdBvxednx/)

```bash
d:
cd D:\gdal
nmake /f makefile.vc
```





1.打开visual studio 2019命令提示

![1608257795257](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206201635253.png)

2.定位到GDAL源码目录

```bash
Z:
CD Z:\API\GDAL\3.2.0\gdal-3.2.0
```

3.编译C++版本的GDAL

```bash
nmake /f makefile.vc
nmake /f makefile.vc install
nmake /f makefile.vc devinstall 
```