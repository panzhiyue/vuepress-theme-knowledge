# Proj6

## 一、下载

PROJ6的官方下载地址为https://proj.org/download.html，我现在的版本为`6.1.0`版本；

cmake官方下载地址为https://cmake.org/download/，下载`cmake-3.15.0-rc3-win64-x64.msi`文件直接载windows上安装，之后添加环境变量，以便在cmd命令行中使用。[详细方法](https://jingyan.baidu.com/article/19192ad8dfa3d8e53e5707c8.html)

## 二、解压

将下载好的`proj-6.1.0`解压到PROJ文件夹内。

## 三、编译

进入库文件夹中，在源码目录中创建`build`文件夹,打开cmake

![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010928612.png)

点击Configure，编译64位，vs2019

![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010928612.png)

会出现一些错误，如图

![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010928612.png)

这时找到Name为EXE_SQLITE3、SQLITE3_INCLUDE_DIR和SQLITE3_LIBRARY三个属性，可以看到现在它们的Value值都为NOTFOUND的状态，我们将SQLite3.exe、include和SQLite3.lib的路径分别赋给它们。
并设置文件生成目录，我设置的是c:/OSGeo4W。

重新点击Configure，提示Configuring done。点击Generate，这时可以看到build文件夹里有PROJ4.sln。打开x64 Native Tools Command Prompt for VS 2019（一般在开始菜单安装VS2019的文件夹里就能看到），进入build文件夹，
![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010928612.png)

- 然后输入命令

```c
msbuild ALL_BUILD.vcxproj /p:Configuration="Release"
msbuild INSTALL.vcxproj /p:Configuration="Release"
```

开启编译（编译debug版是将引号里面的Release改为Debug）。

![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010928612.png)

![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010928612.png)

这时可以在设置的文件生成目录中找到生成的文件

![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010928612.png)

`bin`中有各种`*.exe`文件、 `include`中放有头文件、 `lib` 中是静态库文件、`share`放有一些数据文件。到此PROJ编译完成。

## 四、编译文件

链接：https://pan.baidu.com/s/1Atc9uIhHIQ1O0Fsh_-IH_Q 
提取码：0zh7

## 五、参考资源

https://blog.csdn.net/weixin_42141589/article/details/94357199