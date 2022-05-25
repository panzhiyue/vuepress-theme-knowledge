[TOC]



# eCognition加载tif文件

## 一、加载文件

### 1.打开tif文件

File->New Project

![image-20210917124003785](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202110261059416.png)

![image-20210917124015266](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202110261059417.png)

### 2.重新命名图层名称

一般原始数据是蓝，绿，红，近红外。如果是波段合成之后的数据应该是红，绿，蓝，近红外

![image-20210917124133007](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202110261059418.png)

### 3.添加边界适量

分类时会根据边界进行切割

![image-20210917124328355](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202110261059419.png)

![image-20210917124350464](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202110261059420.png)

### 4.确定

![image-20210917124414986](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202110261059421.png)

![image-20210917124424169](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202110261059422.png)

## 二、优化显示

### 1.修改rgb对应波段

原始数据的波段顺序是蓝，绿，红，我们需要把它们对应到正确的颜色上

打开工具`view->Image Layer Mixing`

![image-20210917124905968](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202110261059423.png)

![image-20210917124925543](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202110261059425.png)

![image-20210917124957705](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202110261059426.png)

### 2.显示矢量边界

打开工具`view/Vector Layer Mixing`

![image-20210917125055038](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202110261054140.png)

![image-20210917125220595](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202110261059427.png)