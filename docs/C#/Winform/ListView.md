### 1.ListView

#### 1.1常用属性

（1）`FullRowSelect`：设置是否行选择模式。(默认为false) 提示：只有在Details视图该属性才有意义。 
（2）`GridLines`：设置行和列之间是否显示网格线。（默认为false）提示：只有在Details视图该属性才有意义。 
（3）`AllowColumnReorder`：设置是否可拖动列标头来对改变列的顺序。（默认为false）提示：只有在Details视图该属性才有意义。 
（4）`View`：获取或设置项在控件中的显示方式，包括`Details`、`LargeIcon`、`List`、`SmallIcon`、`Tile`（默认为 `LargeIcon`） 
（5）`MultiSelect`：设置是否可以选择多个项。（默认为`false`） 
（6）`HeaderStyle`：获取或设置列标头样式。 
				`Clickable`：列标头的作用类似于按钮，单击时可以执行操作（例如排序）。 
				`NonClickable`：列标头不响应鼠标单击。 
				`None`：不显示列标头。 
（7）`LabelEdit`：设置用户是否可以编辑控件中项的标签，对于Detail视图，只能编辑行第一列的内容。（默认为false） 
（8）`CheckBoxes`：设置控件中各项的旁边是否显示复选框。（默认为false） 
（9）`LargeImageList`：大图标集。提示：只在`LargeIcon`视图使用。 
（10）`SmallImageList`：小图标集。提示：只有在`SmallIcon`视图使用。 
（11）`StateImageList`：图像蒙板。这些图像蒙板可用作`LargeImageList`和`SmallImageList`图像的覆盖图，这些图像可用于指示项的应用程序定义的状态。（暂时不大懂） 
（12）`SelectedItems`：获取在控件中选定的项。 
（13）`CheckedItems`：获取控件中当前复选框选中的项。 
（14）`Soritng`：对列表视图的项进行排序。(默认为`None`) 
				`Ascending`：项按递增顺序排序。 
				`Descending`：项按递减顺序排序。 
				`None`：项未排序。 
（15）`Scrollable`：设置当没有足够空间来显示所有项时是否显示滚动条。（默认为`true`) 
（16）`HoverSelection`：设置当鼠标指针悬停于项上时是否自动选择项。（默认为`false`） 
（17）`HotTracking`：设置当鼠标指针经过项文本时，其外观是否变为超链接的形式。（默认为`false`） 
（18）`HideSelection`：设置选定项在控件没焦点时是否仍突出显示。（默认为`false`） 
（19）`ShowGroups`：设置是否以分组方式显示项。（默认为`false`); 
（20）`Groups`：设置分组的对象集合。 
（21）`TopItem`：获取或设置控件中的第一个可见项，可用于定位。（效果类似于`EnsureVisible`方法）

#### 1.2常用方法

（1）`BeginUpdate`：避免在调用`EndUpdate` 方法之前描述控件。当插入大量数据时，可以有效地避免控件闪烁，并能大大提高速度。 
（2）`EndUpdate`：在`BeginUpdate` 方法挂起描述后，继续描述列表视图控件。（结束更新） 
（3）`EnsureVisible`：列表视图滚动定位到指定索引项的选项行。（效果类似于`TopItem`属性） 
（4）`FindItemWithText`：查找以给定文本值开头的第一个 `ListViewItem`。 
（5）`FindNearestItem`：按照指定的搜索方向，从给定点开始查找下一个项。提示：只有在`LargeIcon`或`SmallIcon`视图才能使用该方法。

#### 1.3常用事件

（1）`AfterLabelEdit`：当用户编辑完项的标签时发生，需要`LabelEdit`属性为`true`。 
（2）`BeforeLabelEdit`：当用户开始编辑项的标签时发生。 
（3）`ColumnClick`：当用户在列表视图控件中单击列标头时发生。

#### 1.4 ListView的五种视图

1、`LargeIcon`：每个项都显示为一个最大化图标，在它的下面有一个标签。（效果见下图） 
2、`SmallIcon`：每个项都显示为一个小图标，在它的右边带一个标签。（效果见下图） 
3、`List`：每个项都显示为一个小图标，在它的右边带一个标签。各项排列在列中，没有列标头。（效果见下图） 
4、`Details`：可以显示任意的列，但只有第一列可以包含一个小图标和标签，其它的列项只能显示文字信息，有列表头。（效果见下图） 
5、`Tile`：每个项都显示为一个完整大小的图标，在它的右边带项标签和子项信息。（只有`Windows XP` 和 `Windows Server 2003` 系列支持）

##### 1.Details视图：

```c#
this.listView1.SmallImageList = this.imageList1; //将listView的图标集与imageList1绑定
```

（1）列表头创建（记得，需要先创建列表头）

```c#
 ColumnHeader ch= new ColumnHeader(); 
 nbsp;ch.Text = "列标题1"; //设置列标题 
 ch.Width = 120; //设置列宽度 
 ch.TextAlign = HorizontalAlignment.Left; //设置列的对齐方式 
 this.listView1.Columns.Add(ch); //将列头添加到ListView控件。
```

或者

```c#
this.listView1.Columns.Add("列标题1", 120, HorizontalAlignment.Left); //一步添加
```

（2）添加数据项

 

```c#
 this.listView1.BeginUpdate(); //数据更新，UI暂时挂起，直到EndUpdate绘制控件，可以有效避免闪烁并大大提高加载速度 
 for (int i = 0; i < 10; i++) //添加10行数据 
 { 
   ListViewItem lvi = new ListViewItem(); 
   lvi.ImageIndex = i; //通过与imageList绑定，显示imageList中第i项图标 
   lvi.Text = "subitem" + i; lvi.SubItems.Add("第2列,第"+i+"行"); 
   lvi.SubItems.Add("第3列,第"+i+"行"); 
   this.listView1.Items.Add(lvi); 
 } 
 this.listView1.EndUpdate(); //结束数据处理，UI界面一次性绘制。
```

（3）显示项

```c#
foreach (ListViewItem item in this.listView1.Items)
 { 
   for (int i = 0; i < item.SubItems.Count; i++) { 
     MessageBox.Show(item.SubItems[i].Text);
  } 
 }
```

（4）移除某项

```c#
 foreach (ListViewItem lvi in listView1.SelectedItems) //选中项遍历 { 
   listView1.Items.RemoveAt(lvi.Index); // 按索引移除 
   //listView1.Items.Remove(lvi); //按项移除 
 }
```

（5）行高设置（利用`imageList`实现）

```c#
 ImageList imgList = new ImageList(); 
 imgList.ImageSize = new Size(1, 20);// 设置行高 20 //分别是宽和高 
 listView1.SmallImageList = imgList; //这里设置listView的SmallImageList ,用imgList将其撑大
```

（6）清空

```c#
 this.listView1.Clear(); //从控件中移除所有项和列（包括列表头）。 
 this.listView1.Items.Clear(); //只移除所有的项。
```

![img](C:/Users/892105~1/AppData/Local/Temp/ksohtml8816/wps1.png) 

##### 2.largeIcon视图：

```c#
 this.listView1.View = View.LargeIcon;
 this.listView1.LargeImageList = this.imageList2; 
 this.listView1.BeginUpdate(); 
 for (int i = 0; i < 10; i++) 
 { 
   ListViewItem lvi = new ListViewItem(); 
   lvi.ImageIndex = i; lvi.Text = "item" + i; this.listView1.Items.Add(lvi); 
 }
 this.listView1.EndUpdate();
```

![img](C:/Users/892105~1/AppData/Local/Temp/ksohtml8816/wps2.png) 

##### 3.SmallIcon视图：

```c#
 this.listView1.View = View.SmallIcon; 
 this.listView1.SmallImageList= this.imageList1;
 this.listView1.BeginUpdate();
 for (int i = 0; i < 10; i++) { 
   ListViewItem lvi = new ListViewItem(); 
   lvi.ImageIndex = i; 
   lvi.Text = "item" + i; this.listView1.Items.Add(lvi); 
 } 
 this.listView1.EndUpdate();
```

![img](C:/Users/892105~1/AppData/Local/Temp/ksohtml8816/wps3.png) 

##### 4.List视图

```c#
 this.listView1.View = View.List; 
 this.listView1.SmallImageList= this.imageList1; 
 this.listView1.BeginUpdate(); 
 for (int i = 0; i < 10; i++) {
   ListViewItem lvi = new ListViewItem(); 
   lvi.ImageIndex = i; 
   lvi.Text = "item" + i;
   this.listView1.Items.Add(lvi); 
 } 
 this.listView1.EndUpdate();
```

![img](C:/Users/892105~1/AppData/Local/Temp/ksohtml8816/wps4.png) 

### 

#### 1.5代码

##### 1.允许选中整行并获取选中行数据

```c#
设置listview的属性FullRowSelect，即可实现选中整行。（默认是false状态）
//获取选中行的数据
string personid = ListView_renyuan.FocusedItem.SubItems[0].Text;
//其中0表示行的第一个值，如果想取第二个改为1就可以了
```

##### 2.分组

```c#
 ListViewGroup man_lvg = new ListViewGroup(); //创建男生分组 
 man_lvg.Header = "男生"; //设置组的标题。
 //man_lvg.Name = "man"; //设置组的名称。
 man_lvg.HeaderAlignment = HorizontalAlignment.Left; 
 //设置组标题文本的对齐方式。（默认为Left）
 ListViewGroup women_lvg = new ListViewGroup(); //创建女生分组 
 women_lvg.Header = "女生"; 
 //women_lvg.Name = "women"; 
 women_lvg.HeaderAlignment = HorizontalAlignment.Center; //组标题居中对齐 
 this.listView1.Groups.Add(man_lvg); //把男生分组添加到listview中 
 this.listView1.Groups.Add(women_lvg); //把男生分组添加到listview中 
 this.listView1.ShowGroups = true; //记得要设置ShowGroups属性为true（默认是false），否则显示不出分组 
 for (int i = 0; i < 5; i++) { 
   ListViewItem lvi = new ListViewItem(); 
   lvi.ImageIndex = i;
   lvi.Text = "item"+i; 
   lvi.ForeColor = Color.Blue; //设置行颜色 
   lvi.SubItems.Add("第2列,第"+i+"行"); 
   lvi.SubItems.Add("第3列,第"+i+"行"); 
   man_lvg.Items.Add(lvi); //分组添加子项 
   // 或 lvi.Group = man_lvg; //分组添加子项 
   this.listView1.Items.Add(lvi); 
 }
```

![img](C:/Users/892105~1/AppData/Local/Temp/ksohtml8816/wps5.png) 

##### 3.查找文本（只能查找到匹配前缀的文本且只能找出第一个符合的项）

```c#
 ListViewItem foundItem= this.listView1.FindItemWithText(this.textBox1.Text,true,0);
 //参数1：要查找的文本；参数2：是否子项也要查找；参数3：开始查找位置 
 if (foundItem != null) {
   this.listView1.TopItem = foundItem; //定位到该项 
   foundItem.ForeColor = Color.Red; 
 }
```

