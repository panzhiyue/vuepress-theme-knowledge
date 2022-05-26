[TOC]
# let之Map Dom结构

## 一、引言

 

之前一篇文章讲解了如何创建一个简单的地图，本文主要讲解下地图的Dom结构。了解了地图Dom结构之后对于之后的学习会有极大地帮助。

下面先给个Dom截图与思维导图



 地图首先是一个Div，下面包含了2个子Div，分别原来存放图层与控件

## 二、图层容器

图层容器主要存放图层，主要有6个分类图层，1个动画代理图层

### （1）leaflet-tile-pane

存放切片图层的窗口，例如L.tileLayer

### （2）leaflet-shadow-pane

用来隐藏图层的窗口（如标注的隐藏）.

### （3）leaflet-overlay-pane

存放覆盖物窗口,例如L.Path相关的类

### （4）leaflet-marker-pane

存放标注图标的窗口.

### （5）leaflet-tooltip-pane

存放提示窗口

### （6）leaflet-popup-pane

存放弹出的窗口.

### （7）leaflet-zoom-animated

存放用于缩放动画代理

## 三、控件容器

### （1）leaflet-top leaflet-left

存放position值为topleft的控件

### （2）leaflet-top leaflet-right

存放position值为topright的控件

### （3）leaflet-bottom leaflet-left

存放position值为bottomleft的控件

### （4）leaflet-bottom leaflet-right

存放position值为bottomright的控件

## 四、总结

以上是Leaflet地图默认的DOM结构，Leaflet的Map类提供了相关的类创建，获取窗口，Layer类也可以传入pane参数修改默认窗口。