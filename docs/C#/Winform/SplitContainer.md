## splitContainer

splitContainer可以把窗口拆分为两部分

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210925602.jpg)

可以使用多个splitContainer

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206210925607.jpg)

**splitContainer**不能被鼠标直接点击选中，可通过右击-\>选择splitContainer选中。

### 1.常用属性

#### 1.1.IsSplitterFixed

用于设置拆分器能否移动。

### 1.2.FixedPanel

若设置为Panel1(或Panel2)，在调整窗体的大小时，Panel1面板(或Panel2面板)的大小默认不变；若设置为None，则Panel1面板和Panel2面板按比例缩放。

### 1.3.Orientation

决定拆分器的方向，当该属性设置为Vertical时，拆分器将垂直放置，从而产生左面板和右面板。

#### 1.4.Panel1Collapsed

和属性Panel2Collapsed分别设定Panel1和Panel2两个容器是否被折叠，所谓折叠即是否隐藏。

#### 1.5.Panel1MinSize

用于设置Panel1容器的最小宽度，Panel2MinSize属性用于设置Panel2容器的最小宽度。

#### 1.6.SplitterDistance

用于设置拆分器与左边缘或上边缘的像素距离。

#### 1.7.SplitterIncrement

用于设置用户拖动拆分器时，每次移动的距离。属性SplitterWidth用于设置拆分条的宽度。

#### 1.8.其他常用属性及常用取值：

BorderStyle(FixedSingle)，Dock(Fill)，Locked(True)，TabStop(False)。

### 2.常用事件

#### 2.1.SplitterMoving事件

拆分器移动时发生；拆分条移动过程中发生

委托类型；SplitterCancelEventHandler

参数类型：SplitterCancelEventArgs :CancelEventArgs

Moving事件是指，鼠标按住拆分器不放，进行移动时发生，只要拆分器移动就会发生，不移动则事件不会发生！

#### 2.2.SplitterMoved事件

拆分器移动后发生，在Moving事件之后

委托类型；SplitterEventHandler

参数类型；SplitterEventArgs :EventArgs

Moved事件是指，移动拆分器之后，释放鼠标时发生的，它在Moving事件之后发生！