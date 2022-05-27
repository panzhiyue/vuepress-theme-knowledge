# Erdas

## Erdas学习资料

贴吧:https://tieba.baidu.com/f?kw=erdas&ie=utf-8&pn=850

## ERDAS IMAGINE 2010安装破解

### **第一步：安装包、破解文件下载并解压**

![image-20210922084534882](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271009057.png)

- **imagine2021**:软件主体
- **lps2010**:包含了正射影像制图和镶嵌生成所需的所有处理功能
- **ERD2020 fix**:破解文件

### 第二步：安装Imagine2010

![image-20210922084901756](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271009694.png)

**![image-20210922084918123](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271009082.png)**

等待一段时间

![image-20210922085016595](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271009688.png)



![image-20210922085033643](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271009691.png)

修改安装路径

![image-20210922085146194](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271009684.png)

![image-20210922085202691](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271009384.png)

![image-20210922085213027](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010541.png)



![image-20210922085420826](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271009647.png)

![image-20210922085447834](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271009532.png)



### 第三步：安装LPS2010

![image-20210922090055435](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271009741.png)

![image-20210922090502476](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271009129.png)

**![image-20210922090516978](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010183.png)**

这步会自动选择imagine安装的路径

![image-20210922090534781](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271009299.png)



![image-20210922090607813](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271009321.png)

出现如下错误直接点确定

![image-20210922090719226](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271009920.png)

![image-20210922090742948](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010080.png)



### 第四步：破解

#### 1.FlexNET文件夹里lightgis.dat文件，将第一行中第二个值改为计算机名称，第三个值改为物理地址(去掉横线)

![image-20210922092714170](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010031.png)

![image-20210922092838922](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010429.png)

![image-20210922093000707](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010843.png)


#### 2.FlexNET文件夹里2文件拷到C:\Program Files(x86)\ERDAS\Shared\licensing\bin\ntx86\目录下

![image-20210922094244026](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010927.png)

![image-20210922094228564](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010868.png)



#### 3.将X86文件夹下的所有文件拷贝到 \ERDAS Desktop 2010\bin\ntx86\ 目录下覆盖同名文件。

![image-20210922094348209](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010349.png)

![image-20210922094416058](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010965.png)

#### 4.打开imtools.exe

![image-20210922134048762](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010300.png)

![image-20210922134136769](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010089.png)

#### 5.选择Config Services选项卡

![image-20210922134209934](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010257.png)

输入名称：Erdas2010

Imgrd.exe file:之前拷贝的破解文件

license file:之前拷贝的破解文件



![image-20210922134438225](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010179.png)

配置完之后点击Save Service

![image-20210922134506728](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010565.png)

#### 6.开启服务

在Start/Stop/Reread选项卡点击选中Erdas2010点击Start Server

![image-20210922134624665](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010382.png)

下面的状态变为`Start Successful`表示服务启动成功

### 第五步：打开Erdas

![image-20210922134755286](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010906.png)

![image-20210922134807382](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010432.png)

![image-20210922134835799](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010778.png)

![image-20210922134846854](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010931.png)

![image-20210922134940978](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010340.png)

## ERDAS IMAGINE 2014安装破解

转自:https://www.cnblogs.com/dongteng/p/5568831.html

### **第一步：安装包、破解文件、汉化包下载并解压**

链接：https://pan.baidu.com/s/1w6misprDEtth2oCkV-2zVg 
提取码：z7bk

[![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010854.png)](https://images2015.cnblogs.com/blog/833762/201606/833762-20160608003140683-1613289368.png)

 

   其中汉化包版本是2001的，不影响正常使用。

   汉化的前提是汉化文件和安装文件在同一个目录下。

### **第二步：安装Intergraph_License_Administration**

[![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010350.png)](https://images2015.cnblogs.com/blog/833762/201606/833762-20160608003630418-1021969791.png)

### **第三步：安装Install ERDAS Foundation 2014**

[![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010437.png)](https://images2015.cnblogs.com/blog/833762/201606/833762-20160608003807183-1713565389.png)

[![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010685.png)](https://images2015.cnblogs.com/blog/833762/201606/833762-20160608003856465-1856108842.png)

 

选择安装路径，默认C：\......

[![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010583.png)](https://images2015.cnblogs.com/blog/833762/201606/833762-20160608003907746-1821648035.png)

[![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010544.png)](https://images2015.cnblogs.com/blog/833762/201606/833762-20160608004012886-78376790.png)

finish即可。

[![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010396.png)](https://images2015.cnblogs.com/blog/833762/201606/833762-20160608004151683-1492043513.png)

### **第四步：ERDAS IMAGINE 2014**

注意，对应你的电脑支持的类型，我安装的是64位的。

[![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010044.png)](https://images2015.cnblogs.com/blog/833762/201606/833762-20160608004223418-671458969.png)

[![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010047.png)](https://images2015.cnblogs.com/blog/833762/201606/833762-20160608004252293-2051184922.png)

一路Next

[![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010488.png)](https://images2015.cnblogs.com/blog/833762/201606/833762-20160608004312590-788552312.png)

[![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010144.png)](https://images2015.cnblogs.com/blog/833762/201606/833762-20160608004330183-845912349.png)

[![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010912.png)](https://images2015.cnblogs.com/blog/833762/201606/833762-20160608004343277-744985410.png)

 

### **第五步：进行破解文件替换覆盖**

1、复制破解文件夹：ERDAS IMAGE 2014 CRACK下的ERDAS IMAGE 2014 CRACK\x86\Program Files\Intergraph\ERDAS IMAGINE 2014\bin\win32release里面所有文件到相应安装目录，如默认安装到C:\Program Files\Intergraph\ERDAS IMAGINE 2014\bin\win32release。

2、复制ERDAS IMAGE 2014 CRACK\x86\Program Files\Common Files\Intergraph\Licensing\11.11.1\Program目录下的两个文件LicStatusRpt.exe和ShowHostID.exe到第一步安装的路径下对应的位置。

 

**第六步：进行许可配置**

开始》》所有程序》》

[![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010935.png)](https://images2015.cnblogs.com/blog/833762/201606/833762-20160608005107855-1751718761.png)

打开 Intergraph License Administration

[![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010942.png)](https://images2015.cnblogs.com/blog/833762/201606/833762-20160608005311949-1324974153.png)

在菜单处选择Client>>>Lisence HOST ID

[![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010671.png)](https://images2015.cnblogs.com/blog/833762/201606/833762-20160608005418746-1422042038.png)

点击对话框右上角的Copy，用记事本打开破解文件夹中的Intergraph.lic。将刚才复制的数据进行替换：

[![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010765.png)](https://images2015.cnblogs.com/blog/833762/201606/833762-20160608005701808-559431264.png)

返回到Intergraph License Administration页面，单击File>Import License File，加载刚才修改后的Intergraph.lic，这样应该就破解好了， 可以打开ERDAS IMAGINE2014了。此时你讲神奇的发现，你打开的是已经汉化的ERDAS了。

[![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271010252.png)](https://images2015.cnblogs.com/blog/833762/201606/833762-20160608005901058-262570440.png)

 

------

 

综上述：在没有安装Imagine和function之前将汉化文件考到同目录，系统会自动搜索对应的文件，免去手动复制替换造成的错误。

以上就是本人在安装过程中遇到的，希望能给带大家带来一定的参考价值。不足之处还望多多交流和建议！