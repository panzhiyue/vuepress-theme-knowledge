# iDesktop操作入门



## (一)创建文件型工作空间

### （1）打开iDesktop软件

![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060910489.png)

### （2）创建一个工作空间文件

右键"未命名工作空间->另存工作空间"把工作空间存储为文档

![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060910490.png)

![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060910364.png)

![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060910492.png)

### （3）设置工作空间命名（防止文件丢失导致数据泄露）

![在这里插入图片描述](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060910493.png)

### （4）点击保存

可以在指定目录下看到"创建工作空间.smwu"文件



[TOC]


## (二)绘制数据

### （1）创建工作空间

按照"操作入门（一）"新建一个工作空间"绘制数据"

![1627974645156](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060912237.png)

### （2）新建数据源

右键"数据源->新建文件型数据源"

![1627974719534](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060912260.png)



![1627974811991](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060912323.png)

![1627974851903](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060912289.png)



### （3）新建数据集

右键"数据源Test->新建数据集"

![1627974958317](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060912265.png)



![1627974967561](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060912411.png)

添加点，线，面，三个图层,坐标系选择为GCS_China_2000

![1627975081456](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060912730.png)

点击创建

![1627975125413](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060912747.png)

### （4）把数据集添加到地图

右键数据集->添加到新地图

![1627975195599](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060912781.png)

也可以直接双击=创建新地图（这种方式创建的地图需要ctrl+s保持后才会在管理界面中显示）

![1627975368435](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060912794.png)

![1627975453669](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060912749.png)

剩下2个添加到当前地图

可以在图层管理器中查看当前地图的图层与图层的状态

![1627975563870](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060912765.png)

### （5）绘制

点击第三图标使之高亮表示进入编辑状态

工具栏会自动进入对象操作模块,这里都是与图形编辑相关的工具

![1627975662204](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060912254.png)

然后我们绘制一些数据

![1627975780401](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060912237.png)

### （6）保存工作空间

## (三)属性表编辑

这里只是简单介绍下，详细说明可以看《SuperMap iDesktop基础教程》第6章，里面介绍的非常详细

### （1）字段编辑

右键"数据集->属性"，在右侧属性出口打开属性表选项卡

![1627976497988](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060912737.png)

在这个界面可以对字段进行“添加”，“删除”，“修改”，“排序”

**字段名称**

字段名称是字段的名字。其中，以Sm开头的，是系统字段。Sm前有*的， 表示使用隐藏系统字段功能时，可以进行隐藏。不带*的可以通过隐藏列的功能 进行隐藏，同样，带*的也可以使用这种方法进行隐藏。 

**别名**

字段别名是在属性表中显示的名字。它能更加简明易懂地描述字段内容。 与字段名称不同，别名不需要遵守数据库的限制，因此它们可以包含特殊字符。 通过指定别名，可以为字段提供比其实际字段名更具描述性的名称。 

**字段类型、长度**

新建立属性字段后，我们可以根据字段内容进行选择字段的类型，是整形， 还是单精度型，还是文本等。长度是根据字段的类型进行设置的。

**缺省值**

新建立字段后，如果没有录入属性内容，默认值是什么，这个就是缺省值。

**必填**

必填表示该项内容是否可以为空。如果选择不为空，那么缺省值一定要进 行设置，默认为0。  

### （2）修改字段特别注意

修改已有字段时，除了修改`别名`软件会自动执行删除并创建操作，原数据集会自定建立一个备份

![1627976868831](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060912656.png)

### （3）修改属性值

右键“数据集->浏览属性表”打开属性表

![1627976965181](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060912739.png)

双击单元格->右下角出现小黑点表示进入编辑

![1627977017979](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060912580.png)

右键"列名->更新列"可以批量修改属性

![1627977071324](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060912626.png)

![1627977116927](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060912674.png)

![1627977127932](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205060912880.png)