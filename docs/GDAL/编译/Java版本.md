# 编译Java版本

## 一、准备工作

编译Java版GDAL需要用到以下东西：JRE、SWIG、Ant，JRE当然就不用说了，在安装JDK的时候大家肯定已经配置好了，这里不再赘述。

### 1.SWIG

SWIG：http://www.swig.org/download.html 到这里下载解压即可：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010947147.png)

然后把swig.exe文件夹所在目录（D:\SoftWare\SWIG\swigwin-3.0.12）添加到环境变量path中：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010947153.png)

测试是否安装成功，cmd中输入swig，如果出现下面情况，则表明成功了：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010947142.png)

### 2.Ant

Ant：http://ant.apache.org/ 到这里下载解压即可：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010947156.png)

### 3.修改namke.opt文件



修改如下内容即可：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010947160.png)



修改完成后如下所示：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010947164.png)

```
SWIG = D:\SoftWareInstall\swigwin-4.0.2\swig.exe
ANT_HOME=D:\SoftWareInstall\apache-ant-1.9.16
```



## 二、编译c++版本

https://panzhiyue.gitee.io/post/GDAL/%E7%BC%96%E8%AF%91GDAL

## 三、编译Java

```bash
 cd swig （进入到swig文件夹）

 nmake -f makefile.vc java （编译Java版GDAL）
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010947531.png)

## 四、编译结果

 除了c盘输出文件夹里面的内容外，源码swig\java文件夹里面也多了gdal.jar和gdalalljni.dll等文件（这些文件在GDAL环境搭建的时候会用到，当然还包括之前的gdal203.dll，肯定也是会用到的）：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010947514.png)

链接：https://pan.baidu.com/s/176oLU0bXRBV5O8ZP2K4yJg 
提取码：9rgx

## 五、参考资料

https://blog.csdn.net/qq_24309981/article/details/82831421