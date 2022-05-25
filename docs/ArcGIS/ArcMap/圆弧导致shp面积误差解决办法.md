## **一问题描述**:

原始数据是2000投影坐标系,转为2000地理坐标系后面积出现误差

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111032038033.jpg) 

## **二问题分析**:

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111032038034.jpg) 

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111032038035.jpg) 

经过分析,发现源数据的圆弧在经过投影转换之后,弧变成多个线段组成,线段点不够多,所以出现了误差

 

## **三解决办法:**

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111032038036.jpg) 

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111032038037.jpg) 

(1) 选择angle模式(根据角度增密度),如果选择其他模式容易出现直线段也增密,导致点数量过多。

(2) 最大偏转角度请选择合适的数值(根据实际数据为准),否则容易出现点数量过多

 

对源数据使用arcgis增密方法,增加点的密度,减少误差

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111032038038.jpg) 

原始数据

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111032038039.jpg) 

增密后数据

 

## **四结果:**

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111032038040.jpg) 

 

##