# Windows 安装教程

https://sourceforge.net/p/geoserver/activity/?page=0&limit=100#60587413695ff81334d7a9f0

![1616555759123](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021036748.png)

## （一）1.安装jre

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021036749.jpg) 

 



## （二）双击geoserver.exe开始安装

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021036750.jpg) 

## （三）选择安装目录

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021036751.jpg) 

## （四）选择jre路径

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021036752.jpg) 

## （五）选择数据目录(默认是在安装目录下,如果安装在C盘,数据量又很大可以单独设置)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021036753.jpg) 

 

## （六）设置账号密码

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021036754.jpg) 

不要再此时修改账号密码,有时候无效

## （七）设置端口号(最好不用用8080,有些服务器需要申请)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021036755.jpg) 

## （八）我喜欢安装为服务

![1608167863313](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021036756.png)

## （九）在服务中运行

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021036757.jpg) 

## （十）管理网站

地址:http://localhost:端口号/geoserver/web/

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021036758.jpg) 

# 绿色版本安装教程

![1616555843157](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021036759.png)

## （一）1.安装jre

 

## （二）解压

直接解压缩在E盘（U盘）；

## （三）启动

直接打开E:\geoserver-2.13.0\**bin\startup.bat**，如果未配置过GeoServer的相关环境变量，会提示如下，即在安装目录下找，服务仍会成功启动：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021036760.png)

## （四）成功

稍等10-20秒左右提示GeoServer启动成功：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021036761.png)

浏览器打开http://localhost:8080/geoserver/

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021036762.png)

## （五）停止

使用bin\shutdown.bat停止服务，这种方式JavaBean缓存可以清理干净，U盘可以正常退出：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021036763.png)

## （六）卸载

1.停止服务；2.删除文件夹所有内容或直接拔出U盘

## （七）可移植性提示

此时U盘可以插在任意机子上使用GeoServer服务，需要注意的是宿主机的GeoServer的环境变量GEOSERVER_HOME，没有配置还好，会在U盘GeoServer目录中找；如果配置了，需要修改为U盘中GeoServer的路径，否则启动U盘中GeoServer服务的startup.bat时，会提示没有找到GeoServer目录中的start.jar：

