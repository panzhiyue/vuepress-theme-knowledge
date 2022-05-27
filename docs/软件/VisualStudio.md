# VisualStudio

## 快捷键

###  1.**项目相关的快捷键**

**Ctrl + Shift + B** = 生成项目

**Ctrl + Alt + L** = 显示Solution Explorer（解决方案资源管理器）

**Shift + Alt+ C** = 添加新类

**Shift + Alt + A** = 添加新项目到项目

### **2.编辑相关的键盘快捷键**

**Ctrl + Enter** = 在当前行插入空行

**Ctrl + Shift + Enter** = 在当前行下方插入空行

**Ctrl +空格键** = 使用IntelliSense（智能感知）自动完成

**Alt + Shift +箭头键**(←,↑,↓,→) = 选择代码的自定义部分

**Ctrl + }** = 匹配大括号、括号

**Ctrl + Shift +}** = 在匹配的括号、括号内选择文本

**Ctrl + Shift + S** = 保存所有文件和项目

**Ctrl + K，Ctrl + C** = 注释选定行

**Ctrl + K，Ctrl + U** = 取消选定行的注释

**Ctrl + K，Ctrl + D** = 正确对齐所有代码

**Shift + End** = 从头到尾选择整行

**Shift + Home** = 从尾到头选择整行

**Ctrl + Delete** = 删除光标右侧的所有字



### **3.导航相关的键盘快捷键**

**Ctrl +Up/Down** = 滚动窗口但不移动光标

**Ctrl + -** = 让光标移动到它先前的位置

**Ctrl ++** = 让光标移动到下一个位置

**F12** = 转到定义



### **4.调试相关的键盘快捷键**

**Ctrl + Alt + P** = 附加到进程

**F10** = 调试单步执行

**F5** = 开始调试

**Shift + F5** = 停止调试

**Ctrl + Alt + Q** = 添加快捷匹配

**F9** = 设置或删除断点



### **5.搜索相关的键盘快捷键**

**Ctrl + K Ctrl + K** = 将当前行添加书签

**Ctrl + K Ctrl + N** = 导航至下一个书签

**Ctrl + .** = 如果你键入一个类名如Collection<string>，且命名空间导入不正确的话，那么这个快捷方式组合将自动插入导入

**Ctrl + Shift + F** = 在文件中查找

**Shift + F12** = 查找所有引用

**Ctrl + F** = 显示查找对话框

**Ctrl + H** = 显示替换对话框

**Ctrl + G** = 跳转到行号或行

**Ctrl + Shift + F** = 查找所选条目在整个解决方案中的引用

## 扩展

### 1.vs2019设置默认字符集为UTF8 With BOM

 *1、扩展》管理扩展》联机-> 搜索 Format On Save 安装；*
*2、工具》选项》Format On Save》setting》LineBreak -->选择 windows。*
*生效：保存文件扩展即生效。（注意：安装扩展时，有重启 VS2019 的操作）* 

### 2.vs2019高级保存功能

1. 单击“工具”|“自定义”命令，弹出“自定义”对话框。
2. 单击“命令”标签，进入“命令”选项卡。
3. 在“菜单栏”下拉列表中，选择“文件”选项。
4. 单击“添加命令”按钮，弹出“添加命令”对话框。
5. 在“类别”列表中，选择“文件”选项；在“命令”列表中，选择“高级保存选项”选项。 单击“确定”按钮，关闭“添加命令”对话框。
6. 选中“控件”列表中的“高级保存选项”选项，单击“上移”或者“下移”按钮，调整该命令的位置。
7. 单击“关闭”按钮，完成“高级保存选项”命令的添加操作。



 ![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271120542.png) 

 **添加高级保存选项** 

 ![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271120554.png) 

 **最后在文件里找到高级保存选项，点开就可以修改编码了。** 

 ![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271120559.png) 

 ![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271120520.png) 



### 3.代码辅助工具(ReSharper)

https://www.it610.com/article/1227730669069766656.htm

https://www.cnblogs.com/bedfly/p/12295658.html q	

### 4.添加在浏览器中打开功能



## 版本号

 VC版本 _MSC_VER VS版本
VC6.0 1200 VS 6.0
VC7.0 1300 VS2002
VC7.1 1310 VS2003
VC8.0 1400 VS2005
VC9.0 1500 VS008
VC10.0 1600 VS2010
VC11.0 1700 VS012
VC12.0 1800 VS2013
VC14.0 1900 VS2015 



## 其他

### VS2019项目模板中没有[ASP.NET空网站]的解决方案

转自:https://blog.csdn.net/weixin_44527588/article/details/100710791



#### 一、新建解决方案（课本第十页有教程）

#### 二、打开新建的解决方案

1、在项目资源管理器中右击自己创建的解决方案，依次点击添加、新建项目（如图所示）

![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271120557.png)

在这里插入图片描述



#### 二、进入项目模板

1、进入项目模板之后，如果发现自己没有ASP.NET空网站这个模板，则点击安装多个工具和功能（如图所示）

![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271120566.png)

在这里插入图片描述



#### 三、进入安装修改界面

1、打开ASP.NET和Web开发这个下拉菜单
2、勾选<其他项目模板(早期版本) >这个选项
4、点击修改
5、等待下载安装完成之后就有ASP.NET空网站了
注：
1、所有操作均在连网环境下，因为要下载安装
2、如下载安装完成之后没有ASP.NET空网站，请重启VS2019后再查看。

![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271121027.png)

在这里插入图片描述





![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271120997.png)

## 密钥

### 2010  

 **YCFHQ-9DWCY-DKV88-T2TMH-G7BHP**



## vs2010打开vs2012

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271121734.jpeg)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271121864.jpeg) 

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271121712.jpeg)