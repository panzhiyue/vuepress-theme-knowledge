# Envi

ENVI专题精讲:https://www.zhihu.com/column/c_1333158294290952192

## Envi安装教程

### 软件下载



###  安装前须知

1.安装全程须断开电脑网络，否则易安装不成功；

2.解压和安装前先关闭360、电脑管家等所有杀毒软件，防止误杀补丁，导致安装失败；

3.ENVI适用于Win7/8.1/10(64位)系统，亲测可用！

### 安装步骤

（1）右键以管理员身份运行

![1629958037902](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271011446.png)

![1629958129724](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271011339.png)

![1629958139810](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271011340.png)

![1629958221369](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271011318.png)

![1629958235442](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271011362.png)

![1629958246651](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271011152.png)

![1629958307338](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271011572.png)

![1629958315690](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271011755.png)

![1629958324370](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271011932.png)

![1629958373650](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271011142.png)

![1629958467978](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271011591.png)

![1629958495068](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271011100.png)

### 破解步骤

拷贝Crack文件夹下文件替换安装目录下同名文件

![1629958585548](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271011552.png)

![1629958607468](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271011842.png)

## Envi多光谱大气校正

### 1.软件准备

Envi 5.2

### 2.数据准备

![1629962112654](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271012901.png)

### 3.信息备份

备份一下处理过程中需要的信息，以免到时候计算麻烦

#### （1）Time

2020-10-17T03:02:14Z

右键->View Metadata->Time

![1629962364676](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271012586.png)

![1629962377909](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271012556.png)

#### （2）Atmospheric Model( 大气模式)

  Tropical 

大气模式有以下几种

|     Model Atmosphere      | Water Vapor  (std atm-cm) | Water Vapor(g/cm2) | Surface Air Temperature |
| :-----------------------: | :-----------------------: | :----------------: | :---------------------: |
|  Sub-Arctic Winter (SAW)  |            518            |        0.42        |      -16° C (3° F)      |
| Mid-Latitude Winter (MLW) |           1060            |        0.85        |      -1° C (30° F)      |
|    U.S. Standard (US)     |           1762            |        1.42        |      15° C (59° F)      |
|  Sub-Arctic Summer (SAS)  |           2589            |        2.08        |      14° C (57° F)      |
| Mid-Latitude Summer (MLS) |           3636            |        2.92        |      21° C (70° F)      |
|       Tropical (T)        |           5119            |        4.11        |      27° C (80° F)      |





 根据经纬度和时间可以选定研究区的大气模式，见下图。 

| Latitude (°N) | Jan  | March | May  | July | Sept | Nov  |
| :-----------: | :--: | :---: | :--: | :--: | :--: | :--: |
|      80       | SAW  |  SAW  | SAW  | MLW  | MLW  | SAW  |
|      70       | SAW  |  SAW  | MLW  | MLW  | MLW  | SAW  |
|      60       | MLW  |  MLW  | MLW  | SAS  | SAS  | MLW  |
|      50       | MLW  |  MLW  | SAS  | SAS  | SAS  | SAS  |
|      40       | SAS  |  SAS  | SAS  | MLS  | MLS  | SAS  |
|      30       | MLS  |  MLS  | MLS  |  T   |  T   | MLS  |
|      20       |  T   |   T   |  T   |  T   |  T   |  T   |
|      10       |  T   |   T   |  T   |  T   |  T   |  T   |
|       0       |  T   |   T   |  T   |  T   |  T   |  T   |
|      -10      |  T   |   T   |  T   |  T   |  T   |  T   |
|      -20      |  T   |   T   |  T   | MLS  | MLS  |  T   |
|      -30      | MLS  |  MLS  | MLS  | MLS  | MLS  | MLS  |
|      -40      | SAS  |  SAS  | SAS  | SAS  | SAS  | SAS  |
|      -50      | SAS  |  SAS  | SAS  | MLW  | MLW  | SAS  |
|      -60      | MLW  |  MLW  | MLW  | MLW  | MLW  | MLW  |
|      -70      | MLW  |  MLW  | MLW  | MLW  | MLW  | MLW  |
|      -80      | MLW  |  MLW  | MLW  | MLW  | MLW  | MLW  |



#### （3） Aerosol Model(气溶胶模式) 

Tropospheric



有以下几种

- **Rural:** 表示不受城市或工业来源严重影响的区域中的气溶胶。颗粒大小是两种分布的混合，一种是大的，一种是小的。
- **Urban:** 80%的农村气溶胶与20%的煤烟状气溶胶的混合物，适用于高密度城市/工业区。
- **Maritime:** 表示在海洋盛行风作用下，海洋或大陆上的边界层。它由两种成分组成，一种来自海上喷雾，另一种来自农村大陆气溶胶（忽略了最大的颗粒）。
- **Tropospheric:** 适用于陆地上的平静、晴朗（能见度大于40公里）条件，由乡村模型的小颗粒组成。

##### (4)平均海拔

127M

(1)、打开需要统计区域对应的图像。

(2)、选择File->Open World Data ->Elevation(GMTED2010),打开ENVI自带全球900米分辨率的DEM数据。

注：如果其他版本，需要打开其他DEM数据，如90米的srtm或者30米的G-DEM数据。

(3)、在Toolbox中，选择/Statistics/Compute Statistics，打开Compute Statistics输入文件对话框，选择GMTED2010.jp2数据。单击Stats Subset按钮，打开Select Statistics Subset对话框。



(4)、在Select Statistics Subset对话框中，单击File按钮，选择统计区域对应的图像，单击Ok。



(5)、在统计面板中，默认选择Basic Stats基本统计即可，这样就可以得到平均海拔高程127米。






### 数据处理

#### （1）先完成辐射定标处理

#### （2）使用 FLAASH Atmospheric Correction 工具

 在Toolbox中，打开/Radiometric Correction/Atmospheric Correction Module/FLAASH Atmospheric Correction。 

![1629963438262](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111031055377.png)

#### （3）输入参数 

1. 点击Input Radiance Image，前面辐射定标好的数据  ，在Radiance Scale Factors面板中选择Use single scale factor for all bands，由于定标的辐射量数据与FLAASH的辐射亮度的单位一致，所以在此Single scale factor选择：1，单击OK； 

   ![1629963542983](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271012686.png)

![1629963560452](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271012536.png)

2.设置输出文件和文件夹

![1629963685668](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271012176.png)

3. 传感器基本信息设置： 

   成像中心点经纬度FLAASH自动从影像中获取。 

   传感器高度（Sensor Altitude）：645km 

   像元大小（pixel Size）：8m 

   成像区域平均高度可以通过统计DEM数据获取 

   成像时间：在图层管理中右键选View metadata，在Time选项中可以获取。 

4.设置大气模式与气溶胶模式

![1629964134417](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271012187.png)

#### （4）处理前后结果对比

![1629964481414](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271012839.png)

![1629964490115](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271012913.png)

## Envi辐射定标



### 1.加载数据

 选择Open As->CRESDA->GF-1。选择GF1_PMS2_E104.0_N36.0_20140724_L1A0000284766-PAN2.xml和GF1_PMS2_E104.0_N36.0_20140724_L1A0000284766-MSS2.xml文件打开。 

![1629962981939](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271012108.png)

![1629963005406](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271012789.png)

![1629963028363](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111031056177.png)

### （2）打开 Radiometric Calibration 工具

 在Toolbox中，打开/Radiometric Correction/Radiometric Calibration，选择多光谱数据。 

![1629963101777](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111031056178.png)

点击Apply FLAASH Settings



![1629963120501](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271012738.png)

![1629963141587](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271012786.png)

选择输出文件

![1629963170389](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271012123.png)

点击OK后等待一段时间

![1629963217941](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111031056182.png)

![1629963336229](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202111031056183.png)