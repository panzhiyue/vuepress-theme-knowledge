# 等高线转tif

## 一、环境

软件:arcgis 10.6.0

系统:window10

## 二、步骤

### 1.加载等高线shp数据

![image-20220729084912752](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202207290849876.png)

### 2.转为tin

3D Analyst 工具->数据管理->TIN->创建TIN

![image-20220729085958185](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202207290900388.png)

![image-20220729090151091](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202207290901221.png)



### 3.转为栅格

3D Analyst 工具->转换->由TIN转出->TIN转栅格

![image-20220729090558494](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202207290905525.png)

### 4.导出为tif

右键->数据->导出

![image-20220729090709790](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202207290907842.png)
