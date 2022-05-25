## 导出geodatabase格式

> 注意：需ArcGIS版本10.2.2以上才支持

### 1.启用ArcGIS Runtime工具

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111032039558.jpg) 

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111032039559.jpg) 

### 2.添加数据(样式设计)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111032039560.jpg) 

 

注意:标注字体需要选择”DroidSansFallback.ttf”，否则在平板上中文会显示乱码

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111032039561.jpg) 

### 3. 生成geodatabase

在生成之前先缩放至图层

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111032039562.jpg) 

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111032039563.jpg) 

选择存储位置,点击共享

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111032039564.jpg) 

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111032039565.jpg) 

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111032039566.jpg) 

#### 4.查看结果

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111032039567.jpg)

### 常见问题

#### 1.生成的.geodatabase数据不全，发生了数据丢失的情况。

   发生这种情况一般的有以下两种原因：1、没有调整到全部地图的可见范围生成地图，本文的方法是导出的是当前可视区域内要素，我们通常把地图全部可见之后再次缩放一点，然后再进行 runtime content 即可解决。2、通常是由于数据格式异常，录入数据不规范导致，arcmap生成geodatabase的时候比较挑食，有些字段里的数据不合胃口就直接不管了。解决办法是移动端不需要展示的字段数据可以直接通过arcmap删掉（别忘了备份），一方面可以减小数据包体积，一方面可以解决丢失数据的问题；如果字段必须存在，那么只能从数据本身着手，我处理的数据一般是由于中文标点有问题，全文替换成英文的就可以了。比较常见的有中文的顿号，句号，逗号，分号，引号还有数据前面有空格，甚至是数据直接为空。也不排除别的字符问题，毕竟是国外的软件，对中文支持不太好。这种情况就只能一个一个进行尝试了。

 

#### 2.Analyze的时候报错Multiple workspaces for feature and tabular data are not supported for runtime content 。

   通常来说，生成geodatabase的图层shp必须存在于同一个文件夹下面,发生这种情况我们可以手动把shp都放到一个文件夹下面；如果是在gdb数据库当中的，那么需要用ArcCatalog工具都导入到一个数据库当中，然后在进行Share.如果存在路网数据集，那么只能把shp都导入到gdb数据库当中进行图层加载才可以，如果把gdb数据导出为shp生成会出问题。



 

## geodatabase转gdb

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111032039568.jpg) 

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111032039569.jpg) 

```python
>>> import arcpy
>>> from arcpy import env
>>> env.workspace="D:/Arcgis"
>>>arcpy.CopyRuntimeGdbToFileGdb_conversion(r"E:\Arcgis\geodatabase\aa\data\2018_8_1.geodatabase","2018_8_1FGDB.gdb")
```