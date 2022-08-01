# PostgreSQL



GDAL不仅支持shp驱动，还支持PostGIS驱动，GDAL支持的矢量驱动可以到这里（https://www.gdal.org/ogr_formats.html）去看，但是默认的编译结果是不支持PostGIS的，需要自己重新编译，下面就详细说明下，如何编译GDAL使其支持PostGIS驱动。

## 一、修改nmake.opt文件

在nmake.opt文件中找到PostGIS库，修改包含目录和库目录（到PostGIS安装目录底下去看）

![image-20210901153205364](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010928978.png)

改为

![image-20210901153737471](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010928965.png)

```
PG_INC_DIR = D:\SoftWareInstall\PostgreSQL\12\include
PG_LIB = D:\SoftWareInstall\PostgreSQL\12\lib\libpq.lib wsock32.lib
```





改为64位

![image-20210902100255757](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010928974.png)







否则会报如下错误

![image-20210902100329578](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010928954.png)

## 二、重新编译

https://panzhiyue.gitee.io/post/GDAL/%E7%BC%96%E8%AF%91GDAL



## 三、参考资源

https://blog.csdn.net/qq_24309981/article/details/82831421