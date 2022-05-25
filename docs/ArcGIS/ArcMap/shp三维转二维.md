## **Shp三维转二维**

### 1. **shp文件三维判断**

用arcgisjiazaishp文件,右键打开属性表,带有ZM的表示是三维矢量,否则就是二维

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111032040077.jpg) 

### 2. **打开地理处理->环境窗口**

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111032040078.jpg) 

### 3. **Z,M值都选中disable**

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111032040079.jpg) 

 

### 4. **重新导出数据**

注意:不要使用右键->数据->数据导出,这种方法导出无效

使用投影工具进行导出

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111032040080.jpg) 

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111032040081.jpg)