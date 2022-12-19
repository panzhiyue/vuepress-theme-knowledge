## 简介

Arcpy.mapping 是一个作为 ArcPy 站点包一部分的Python 脚本模块。随 ArcGIS Desktop 一同安装，并对所有许可均可用。其设计初衷主要是用于操作现有地图文档 (**.mxd**) 和图层文件 (**.lyr**) 的内容。此外，还提供自动执行导出和打印的功能。Arcpy.mapping 可用于自动执行地图生产；它扩展了[数据驱动页面](https://desktop.arcgis.com/zh-cn/arcmap/latest/map/page-layouts/what-are-data-driven-pages-.htm)的功能，同时，因其包含导出至 PDF 文档、创建和管理 PDF 文档的函数，而为[构建完整地图册](https://desktop.arcgis.com/zh-cn/arcmap/latest/map/page-layouts/building-map-books-with-arcgis.htm)所必需。最后，可将 arcpy.mapping 脚本发布为地理处理服务，并将脚本功能提供给 Web 应用程序。

通过描述 arcpy.mapping 执行的一些方案来了解其功能将会更容易些。以下是 arcpy.mapping 脚本可完成的众多方案中的一小部分：

- 创建有关地图文档中所含信息（如数据框坐标系、图层数据源、数据源损坏的图层或布局元素位置）的报告。
- 更新、修复或替换地图文档或图层文件中的图层数据源。
- 更新图层符号系统而无需打开地图文档。
- 查找并替换文件夹内所有地图文档的文本字符串。
- 将地图文档保存至之前的 ArcGIS 版本，以便分发。
- 更新地图文档元数据（例如，关键字、摘要和描述）。
- 使用地图导出命令批量创建地理数据，例如，由数据框中要素列表驱动的一系列 GeoTIFF 图像。
- 自动创建和管理要通过 ArcGIS Server 发布的地图服务。
- 构建多种 PDF 地图册：
  - 含标题页、多个地图页面以及任意数量含辅助内容（如表格式报表和联系人列表）的附加页面的专题或时态地图册。
  - 基于[数据驱动页面](https://desktop.arcgis.com/zh-cn/arcmap/latest/map/page-layouts/what-are-data-driven-pages-.htm)输出的参考地图册。

## 教程入门

### Python窗口

开始学习 arcpy.mapping 的最简单方法是从 **Python** 窗口入手。**Python** 窗口是 ArcMap 框架的一部分，它所提供的自动完成功能使您能够轻松读取函数参数的名称和顺序。

（1）地理处理->Python打开窗口

（2）现在输入以下语句（请注意，Python 区分大小写）

```python
>>> arcpy.mapping.
```

Python窗口应如下图所示，会列出模块下所有的函数。

![image-20221206160709140](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/image-20221206160709140.png)

（3）选择ExportToPDF函数

```python
>>> arcpy.mapping.ExportToPDF(
```

Python窗口应如下所示。第一个必需参数称为 **map_document**，处于高亮显示状态。如果输入一个逗号，则第二个参数会变为高亮显示。只有两个必需参数：**map_document** 和 **out_pdf**。可选参数使用大括号 **{}** 括起。

![image-20221206160944762](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/image-20221206160944762.png)

（4）右键单击代码窗格，然后单击**全部清除**以清除代码窗格。



### 引用现有地图文档

通常，通过 arcpy.mapping 脚本执行的首要操作之一即引用要处理的现有地图文档 (**.mxd**) 或图层文件 (**.lyr**)。在本节中，您将了解如何引用地图文档。

引用地图文档的方法有两种。第一种方法是通过提供 **.mxd** 文件的路径在磁盘上进行引用。如果要构建将在 ArcGIS 环境外部运行的脚本，则必须使用地图文档的路径对其进行引用。第二种方法是引用当前加载至 ArcMap 应用程序中的地图文档（在这种情况下，指的是 untitled.mxd）。在 ArcMap 内的 **Python** 窗口中进行操作时，引用当前加载的地图文档十分方便，因为在应用程序中可直接看到对地图文档执行的更改。以下步骤将介绍如何引用当前加载至 ArcMap 中的地图文档。

（1）在 **Python** 窗口中输入以下内容，完成输入后按 Enter：

```python
>>> mxd = arcpy.mapping.MapDocument("CURRENT")
```

[MapDocument](https://desktop.arcgis.com/zh-cn/arcmap/latest/analyze/arcpy-mapping/mapdocument.htm) 函数为称为 **mxd** 的变量返回一个 [MapDocument](https://desktop.arcgis.com/zh-cn/arcmap/latest/analyze/arcpy-mapping/mapdocument-class.htm) 对象参考。字符串 **CURRENT** 是用于引用当前已加载地图文档的关键字。您也可以在此处提供地图文档的路径来代替 **CURRENT**。

```python
>>> mxd = arcpy.mapping.MapDocument("C:/Project/Watersheds.mxd")
```

（2）在Python窗口中，输入以下内容：

```python
>>> mxd.
```

输入点之后，您会看到对 [MapDocument](https://desktop.arcgis.com/zh-cn/arcmap/latest/analyze/arcpy-mapping/mapdocument-class.htm) 对象可用的方法和属性的长列表。

（3）在 **Python** 窗口中输入以下内容，完成输入后按 Enter：

```python
>>> mxd.author = "panzhiyue"
```

[MapDocument](https://desktop.arcgis.com/zh-cn/arcmap/latest/analyze/arcpy-mapping/mapdocument-class.htm) 对象具有一个称为 **author** 的属性。只需将其值设置为字符串即可。

（4）在 ArcMap 中，单击**文件 > 地图文档属性**。

您会看到 **author** 属性已设置为您的字符串。您只需通过名为 mxd 的变量即可直接与 [MapDocument](https://desktop.arcgis.com/zh-cn/arcmap/latest/analyze/arcpy-mapping/mapdocument-class.htm) 对象交互。[MapDocument](https://desktop.arcgis.com/zh-cn/arcmap/latest/analyze/arcpy-mapping/mapdocument-class.htm) 对象还有许多其他方法和属性。现在将保存您的更改。

![image-20221206161844410](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/image-20221206161844410.png)

（5）完成**地图文档属性** 对话框后，单击**取消**。

（6）在 **Python** 窗口中输入以下内容，完成输入后按 Enter：

```python
>>> mxd.save()
```

由于该地图文档未保存，因此会出现一个对话框提示您提供路径和文件名。**save()** 方法不具有任何参数，但由于它是一个方法，因此仍必须加上左、右括号。事实上，您要处理的是现有的地图文档，并不需要处理弹出的保存对话框。要验证地图文档的保存位置，请尝试以下操作：

（7）在 **Python** 窗口中输入以下内容，完成输入后按 Enter：

```python
>>> print mxd.filePath
```

您会看到代码窗格中会打印出路径：

![image-20221206162154962](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/image-20221206162154962.png)

### 将图层文件添加到地图文档中

现在您已引用地图文档，接下来要做的是向地图文档中添加图层文件 (**.lyr**)。此操作可通过 arcpy.mapping [AddLayer](https://desktop.arcgis.com/zh-cn/arcmap/latest/analyze/arcpy-mapping/addlayer.htm) 函数完成。

（1）在 **Python** 窗口中，输入以下内容：

```python
>>> arcpy.mapping.AddLayer(
```

![image-20221206162323552](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/image-20221206162323552.png)

自动完成功能显示有两个必需参数。第一个参数是对地图文档中数据框的引用。第二个参数是对要添加的图层的引用。该图层可以是地图文档或图层文件中的图层。第三个参数是可选参数，用于控制内容列表中图层的放置。由于这是第一个也是仅有的一个图层，您可以忽略第三个参数并使用其默认值。

添加该图层之前，您需要引用相应的对象。首先将引用数据框。

（2）在 **Python** 窗口中，按 Backspace 移除 [AddLayer](https://desktop.arcgis.com/zh-cn/arcmap/latest/analyze/arcpy-mapping/addlayer.htm) 函数，输入以下内容，完成输入后按 Enter：

```python
>>> df = arcpy.mapping.ListDataFrames(mxd, "图层")[0]
```

[ListDataFrames](https://desktop.arcgis.com/zh-cn/arcmap/latest/analyze/arcpy-mapping/listdataframes.htm) 函数需要引用地图文档和通配符过滤器（可选）。您可以提供数据框的全名以进行搜索。还可以输入类似 **"lay\*"** 的内容。

所有 ArcPy 列表函数将返回 Python 列表对象。在列表中返回的这些项从零开始，这表示列表中的第一个项的索引值为 0，第二个项为 1，依此类推，一直到 n-1。由于要让 **df** 变量引用 [DataFrame](https://desktop.arcgis.com/zh-cn/arcmap/latest/analyze/arcpy-mapping/dataframe-class.htm) 对象而不是 Python 列表对象，因此必须在函数后追加索引号。在函数末尾追加 **[0]** 会返回列表中的第一个数据框。对于您的情况，将返回列表中仅有的数据框。如果在地图文档中对数据框进行唯一命名并使用相应的**通配符**值分隔项目，应始终返回仅有一个项目的列表，而索引 **[0]** 将会起到作用。如果在地图文档中有两个数据框，并且您不想通过 **wildcard** 值引用第二个数据框，则需要在函数末尾加上 **[1]**，例如，**df2 = arcpy.mapping.ListDataFrames(mxd)[1]**。

接下来您在使用 [AddLayer](https://desktop.arcgis.com/zh-cn/arcmap/latest/analyze/arcpy-mapping/addlayer.htm) 函数之前需要引用图层文件。引用图层文件的过程与通过提供 **.mxd** 完整路径引用图层文档的过程相同，所不同的是需使用 [Layer](https://desktop.arcgis.com/zh-cn/arcmap/latest/analyze/arcpy-mapping/layer.htm) 函数而非 [MapDocument](https://desktop.arcgis.com/zh-cn/arcmap/latest/analyze/arcpy-mapping/mapdocument.htm) 函数。

（3）在 **Python** 窗口中输入以下内容，完成输入后按 Enter。您提供的路径很可能与以下示例不同。

```python
>>> lyrFile = arcpy.mapping.Layer(r"C:\Users\Admin\Desktop\水网线.lyr")
```

在以上步骤中，创建了对现有图层文件的引用，该引用存储在名为 **lyrFile** 的变量中。

请注意，路径字符串的前面有一个小写 **r**。这是 Python 中的特殊字符，代表 **raw**。这表示要按原样解释该字符串并忽略字符串中的其他任何特殊字符。之所以要使用小写的 **r**，是因为路径字符串中含有反斜线。在 Python 中，反斜线也是特殊字符。例如，字符串中的 **\t** 将转换为制表符，**\n** 将转换为新行。在以上示例中，您不想使用特殊字符，而想使用原始的文本字符串。还有其他两种等效的方法可用于在 Python 中输入相同的路径。第一种，使用正斜线（例如，**“C:/Project/States.lyr”**）。Python 不会尝试解释正斜线，而且它们是跨平台标准。第二种，使用双反斜线（例如，**“C:\\Project\\Lakes.lyr”**）。第一个反斜线抵消了第二个反斜线。记住小写 **r** 方法很重要，因为在 Windows 平台上复制系统路径时带有反斜线。

所有必需的变量参考即已创建完毕。接下来将使用 [AddLayer](https://desktop.arcgis.com/zh-cn/arcmap/latest/analyze/arcpy-mapping/addlayer.htm) 函数将图层文件添加至当前地图文档。

（4）在 **Python** 窗口中输入以下内容，完成输入后按 Enter：

```python
>>> arcpy.mapping.AddLayer(df, lyrFile)
```

您的图层应已添加到内容列表和数据视图中，**Python** 窗口应如下图所示：

（5）最终文档如下所示

![image-20221206164404563](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/image-20221206164404563.png)

### 将地图文档导出至PDF

将地图文档导出至 PDF 极其容易，仅需要单行代码。您在教程开始处已看过 [ExportToPDF](https://desktop.arcgis.com/zh-cn/arcmap/latest/analyze/arcpy-mapping/exporttopdf.htm) 函数的语法。现在将完成该语法。

（1）在 **Python** 窗口中输入以下内容，完成输入后按 Enter。您提供的路径很可能与以下示例不同。

```python
>>> arcpy.mapping.ExportToPDF(mxd, r"C:\Users\Admin\Desktop\Doc1.pdf")
```



有很多参数与 ArcMap 中的设置一致。仅有两个必需参数：**map_document** 和 **out_pdf**。

已在指定位置创建了 PDF 文档，**Python** 窗口应如下图所示：

![image-20221206164724195](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/image-20221206164724195.png)

### 使用 ListLayers 函数引用图层，并更改图层属性

有许多属性和方法可用于处理地图文档中的图层。您之前已将图层文件中的图层添加至地图文档。创建的名为 **lyrFile** 的变量即引用添加至地图文档的图层。使用此变量，可修改已添加图层的某些属性。

（1）在 **Python** 窗口中，输入以下内容：

```python
>>> lyrFile.
```

![image-20221206164912032](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/image-20221206164912032.png)

输入点之后，请注意 [Layer](https://desktop.arcgis.com/zh-cn/arcmap/latest/analyze/arcpy-mapping/layer-class.htm) 对象上的所有不同属性和方法。使用 **lyrFile** 变量，可更改地图文档中的这些属性，在调用 **save()** 方法时，会将这些更改保存至磁盘上的图层文件 (**.lyr**)。

并非所有可能的图层属性都可用于 [Layer](https://desktop.arcgis.com/zh-cn/arcmap/latest/analyze/arcpy-mapping/layer-class.htm) 对象，只有那些对于地图自动化情景最常见的图层属性才可用。可通过创作图层文件中的属性以及使用 arcpy.mapping [UpdateLayer](https://desktop.arcgis.com/zh-cn/arcmap/latest/analyze/arcpy-mapping/updatelayer.htm) 函数来修改更多属性。

您不需要总是添加图层文件。大多数情况下，地图文档中已经具有图层。在以下这些步骤中，将假定图层已在地图文档中，再次对其进行引用。在地图文档中引用图层与引用数据框非常相似。

（2）在 **Python** 窗口中，删除当前文本，输入以下内容，然后按 Enter：

```python
>>> lyr = arcpy.mapping.ListLayers(mxd)[0]
```

[ListLayers](https://desktop.arcgis.com/zh-cn/arcmap/latest/analyze/arcpy-mapping/listlayers.htm) 函数需要您提供地图文档参考。该函数有两个附加参数：一个用于执行通配符搜索，另一个用于指定数据框。由于您只有一个图层和一个数据框，因此不必提供其他参数。同样，语句结尾仍需要加上 **[0]** 索引值，以便返回 [Layer](https://desktop.arcgis.com/zh-cn/arcmap/latest/analyze/arcpy-mapping/layer-class.htm) 对象而不是 Python 列表对象。

使用新的 **lyr** 变量，可更新某些图层属性。

（3）在 **Python** 窗口中输入以下两行，在每行后面按 Enter：

```python
>>> lyr.name = "Some New Name"
>>> lyr.visible = False
```

您不会立即看到更改。不是所有的属性更改或方法都会自动更新应用程序。这是有意设计成这样的，目的在于避免应用程序经常刷新。使用 **CURRENT** 引用 ArcMap 中当前加载的地图文档时，有时需要刷新内容列表或活动视图（数据视图或布局视图）。

（4）在 **Python** 窗口中输入以下两行，在每行后面按 Enter：

```javascript
>>> arcpy.RefreshTOC()
>>> arcpy.RefreshActiveView()
```

内容列表和数据视图将刷新。

### 更改数据框范围

在本节中，您将更改数据框范围以使其与所选要素的范围相符。在脚本中，通常使用类似 [SelectlayerByAttribute](https://desktop.arcgis.com/zh-cn/arcmap/latest/tools/data-management-toolbox/select-layer-by-attribute.htm) 的函数来完成此操作。为了简化操作，您将以图形的方式选择一些要素。首先需要使用 Python 再次开启图层可见性。

（1）在 **Python** 窗口中输入以下三行，在每行后面按 Enter：

```python
>>> lyr.visible = True
>>> arcpy.RefreshTOC()
>>> arcpy.RefreshActiveView()
```

（2）在 ArcMap 中，以图形方式选择图层中的一个或多个要素。

然后，创建存储所选要素范围的变量，并将该范围应用于所引用的 [DataFrame](https://desktop.arcgis.com/zh-cn/arcmap/latest/analyze/arcpy-mapping/dataframe-class.htm) 对象的 **extent** 参数。

（3）在 **Python** 窗口中输入以下两行，在每行后面按 Enter：

```python
>>> lyrExtent = lyr.getSelectedExtent()
>>> df.extent = lyrExtent
```

### 将地图文档（再次）导出至PDF

将再次导出至 PDF。这次将另外创建一个 PDF 文档，该文档最终将与第一个文档一起追加到新文档中。

```python
>>> arcpy.mapping.ExportToPDF(mxd, r"C:\Users\Admin\Desktop\Doc2.pdf")
```



### 新建 PDF 文档并追加两页

arcpy.mapping 模块包含一些 PDF 文档管理函数，这对于创建多页文档十分理想。例如，完整的地图册除包含[数据驱动页面](https://desktop.arcgis.com/zh-cn/arcmap/latest/map/page-layouts/what-are-data-driven-pages-.htm)生成的标准参考地图页面以外，往往还包含一些其他页面。arcpy.mapping 的使用对于[构建完整地图册](https://desktop.arcgis.com/zh-cn/arcmap/latest/map/page-layouts/building-map-books-with-arcgis.htm)来说是必要的步骤。

教程本部分将模拟多页报告的创建过程。首先要新建一个 PDF 文档，然后追加在先前步骤中创建的 PDF。假设这些 PDF 文档只是构成地图册的单个文档。例如，Doc1.pdf 可以是表示标题页和内容列表等的多页 PDF。第二个 PDF 文档可以是将所有[数据驱动页面](https://desktop.arcgis.com/zh-cn/arcmap/latest/map/page-layouts/what-are-data-driven-pages-.htm)地图页面导出至单个多页 PDF 的结果。

第一步是新建 PDF 文档。

（1）在 **Python** 窗口中输入以下内容，完成输入后按 Enter：

```python
>>> PDFdoc = arcpy.mapping.PDFDocumentCreate(r"C:\Users\Admin\Desktop\Final.pdf")
```

称为 **PDFdoc** 的变量引用内存中的 [PDFDocument](https://desktop.arcgis.com/zh-cn/arcmap/latest/analyze/arcpy-mapping/pdfdocument-class.htm) 对象。只有在保存并关闭文档后，该变量才会存在于磁盘中。

下面的步骤将介绍如何追加相应页面。

（2）在 **Python** 窗口中输入以下两行，在每行后面按 Enter：

```python
>>> PDFdoc.appendPages(r"C:\Users\Admin\Desktop\Doc1.pdf")
>>> PDFdoc.appendPages(r"C:\Users\Admin\Desktop\Doc2.pdf")
>>> PDFdoc.saveAndClose()
```

前两行分别将每个 PDF 追加至新建的 PDF 文档中。最后一行是提交更改并在磁盘上创建最终 PDF。

已在指定位置创建了 PDF 文档。



至此，您已使用 arcpy.mapping 完成了一个十分简单但常用的工作流。接下来的步骤是将这些工作流应用于您自己的地图文档和图层。另外，建议您花费一些时间深入了解一下 arcpy.mapping 帮助主题。每个主题末尾都提供了小代码示例，可轻松将其复制并粘贴到 **Python** 窗口中。

## 类

### 列表

| 序号 | 名称                      | 描述 |
| ---- | ------------------------- | ---- |
| 1    | DataDrivenPages           |      |
| 2    | DataFrame                 |      |
| 3    | DataFrameTime             |      |
| 4    | GraduatedColorsSymbology  |      |
| 5    | GraduatedSymbolsSymbology |      |
| 6    | GraphicElement            |      |
| 7    | LabelClass                |      |
| 8    | Layer                     |      |
| 9    | LayerTime                 |      |
| 10   | LegendElement             |      |
| 11   | MapDocument               |      |
| 12   | MapsurroundElement        |      |
| 13   | PDFDocument               |      |
| 14   | PictureElement            |      |
| 15   | RasterClassifiedSymbology |      |
| 16   | StyleItems                |      |
| 17   | TableView                 |      |
| 18   | TextElement               |      |
| 19   | UniqueValuesSymbology     |      |

### 1.DataDrivenPages

#### 属性

| 属性                  | 说明                                                         | 数据类型                                                     |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| currentPageID(可读写) | **currentPageID** 属性表示启用了“数据驱动页面”的地图文档 (**.mxd**) 的活动页面或当前页面。选中“显示页面”后在“数据驱动页面”工具条中显示此值；它代表 y 的第 x 页，共 x 页。 | Long                                                         |
| dataFrame(只读)       | 返回对启用了“数据驱动页面”的地图文档内索引图层所位于的数据框的引用。 | [DataFrame](https://desktop.arcgis.com/zh-cn/arcmap/10.6/analyze/arcpy-mapping/dataframe-class.htm) |
| indexLayer(只读)      | 返回对启用了“数据驱动页面”的地图文档中索引图层的引用。       | [Layer](https://desktop.arcgis.com/zh-cn/arcmap/10.6/analyze/arcpy-mapping/layer-class.htm) |
| pageCount(只读)       | **pageCount** 属性返回启用了“数据驱动页面”的地图文档 (**.mxd**) 的总页数。选中“显示页面”后在“数据驱动页面”工具条中显示此值；它代表 y 的第 y 页，共 x 页。 | Long                                                         |
| pageNameField(只读)   | 返回字段对象，它代表设置“数据驱动页面”时在索引要素类中使用的字段。 | [Field](https://desktop.arcgis.com/zh-cn/arcmap/10.6/analyze/arcpy-classes/field.htm) |
| pageRow(只读)         | 使用 **pageRow** 返回索引图层的针对活动页面或当前页面的行对象。随后可根据需要读取和/或修改此索引图层字段。 | [Row](https://desktop.arcgis.com/zh-cn/arcmap/10.6/analyze/arcpy-classes/row.htm) |
| selectedPages(只读)   | 返回 Python 索引编号列表，它们表示启用了“数据驱动页面”的地图文档中所选的索引图层要素。 | List                                                         |

#### 方法概述

| 方法                                                         | 说明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| exportToPDF (out_pdf, {page_range_type}, {page_range_string}, {multiple_files}, {resolution}, {image_quality}, {colorspace}, {compress_vectors}, {image_compression}, {picture_symbol}, {convert_markers}, {embed_fonts}, {layers_attributes}, {georef_info}, {jpeg_compression_quality}, {show_selection_symbology}) | 将启用了“数据驱动页面”的地图文档 (**.mxd**)的一组指定页面导出为多页面的 PDF 文档 |
| getPageIDFromName (page_name)                                | 基于页面的名称返回“数据驱动页面”索引值                       |
| printPages ({printer_name}, {page_range_type}, {page_range_string}, {out_print_file}, {show_selection_symbology}) | 以特定打印机打印启用数据驱动页面的地图文档 (**.mxd**) 中的特定页面 |
| refresh ()                                                   | 刷新现有“数据驱动页面”系列                                   |



### 2.DataFrame



### 3.DataFrameTime

### 4.GraduatedColorsSymbology

### 5.GraduatedSymbolsSymbology

### 6.GraphicElement

### 7.LabelClass

### 8.Layer

### 9.LayerTime

### 10.LegendElement

### 11.MapDocument

### 12.MapsurroundElement

### 13.PDFDocument

### 14.PictureElement

### 15.RasterClassifiedSymbology

### 16.StyleItems

### 17.TableView

### 18.TextElement

### 19.UniqueValuesSymbology



## 函数

### 列表

| 序号 | 函数                                                         | 名称 |
| ---- | ------------------------------------------------------------ | ---- |
| 1    | AddLayer(data_frame, add_layer, {add_position})              |      |
| 2    | AddLayerToGroup(data_frame, target_group_layer, add_layer, {add_position}) |      |
| 3    | AddTableView(data_frame, add_table)                          |      |
| 4    | AnalyzeForMSD(map_document)                                  |      |
| 5    | AnalyzeForSD(sddraft)                                        |      |
| 6    | ConvertToMSD(map_document, out_msd, {data_frame}, {msd_anti_aliasing}, {msd_text_anti_aliasing}) |      |
| 7    | ConvertWebMapToMapDocument(webmap_json, {template_mxd}, {notes_gdb}, {extra_conversion_options}) |      |
| 8    | CreateGISServerConnectionFile(connection_type, out_folder_path, out_name, server_url, server_type, {use_arcgis_desktop_staging_folder}, {staging_folder_path}, {username}, {password}, {save_username_password}) |      |
| 9    | CreateMapSDDraft(map_document, out_sddraft, service_name, {server_type}, {connection_file_path}, {copy_data_to_server}, {folder_name}, {summary}, {tags}) |      |
| 10   | DeleteMapService(connection_url_or_name, server, service_name, {folder_name}, {connection_username}, {connection_password}, {connection_domain}) |      |
| 11   | ExportReport(report_source, report_layout_file, output_file, {dataset_option}, {report_title}, {starting_page_number}, {page_range}, {report_definition_query}, {extent}, {field_map}) |      |
| 12   | ExportToAI(map_document, out_ai, {data_frame}, {df_export_width}, {df_export_height}, {resolution}, {image_quality}, {colorspace}, {picture_symbol}, {convert_markers}) |      |
| 13   | ExportToBMP(map_document, out_bmp, {data_frame}, {df_export_width}, {df_export_height}, {resolution}, {world_file}, {color_mode}, {rle_compression}) |      |
| 14   | ExportToEMF(map_document, out_emf, {data_frame}, {df_export_width}, {df_export_height}, {resolution}, {image_quality}, {description}, {picture_symbol}, {convert_markers}) |      |
| 15   | ExportToEPS(map_document, out_eps, {data_frame}, {df_export_width}, {df_export_height}, {resolution}, {image_quality}, {colorspace}, {ps_lang_level}, {image_compression}, {picture_symbol}, {convert_markers}, {embed_fonts}, {jpeg_compression_quality}) |      |
| 16   | ExportToGIF(map_document, out_gif, {data_frame}, {df_export_width}, {df_export_height}, {resolution}, {world_file}, {color_mode}, {gif_compression}, {background_color}, {transparent_color}, {interlaced}) |      |
| 17   | ExportToJPEG(map_document, out_jpeg, {data_frame}, {df_export_width}, {df_export_height}, {resolution}, {world_file}, {color_mode}, {jpeg_quality}, {progressive}) |      |
| 18   | ExportToPDF(map_document, out_pdf, {data_frame}, {df_export_width}, {df_export_height}, {resolution}, {image_quality}, {colorspace}, {compress_vectors}, {image_compression}, {picture_symbol}, {convert_markers}, {embed_fonts}, {layers_attributes}, {georef_info}, {jpeg_compression_quality}) |      |
| 19   | ExportToPNG(map_document, out_png, {data_frame}, {df_export_width}, {df_export_height}, {resolution}, {world_file}, {color_mode}, {background_color}, {transparent_color}, {interlaced}) |      |
| 20   | ExportToSVG(map_document, out_svg, {data_frame}, {df_export_width}, {df_export_height}, {resolution}, {image_quality}, {compress_document}, {picture_symbol}, {convert_markers}, {embed_fonts}) |      |
| 21   | ExportToTIFF(map_document, out_tiff, {data_frame}, {df_export_width}, {df_export_height}, {resolution}, {world_file}, {color_mode}, {tiff_compression}, {geoTIFF_tags}) |      |
| 22   | InsertLayer(data_frame, reference_layer, insert_layer, {insert_position}) |      |
| 23   | Layer(lyr_file_path)                                         |      |
| 24   | ListBookmarks(map_document, {wildcard}, {data_frame})        |      |
| 25   | ListBrokenDataSources(map_document_or_layer)                 |      |
| 26   | ListDataFrames(map_document, {wildcard})                     |      |
| 27   | ListLayers(map_document_or_layer, {wildcard}, {data_frame})  |      |
| 28   | ListLayoutElements(map_document, {element_type}, {wildcard}) |      |
| 29   | ListMapServices(connection_url_or_name, server, {connection_username}, {connection_password}, {connection_domain}) |      |
| 30   | ListPrinterNames()                                           |      |
| 31   | ListStyleItems(style_file_path, style_folder_name, {wildcard}) |      |
| 32   | ListTableViews(map_document, {wildcard}, {data_frame})       |      |
| 33   | MapDocument(mxd_path)                                        |      |
| 34   | MoveLayer(data_frame, reference_layer, move_layer, {insert_position}) |      |
| 35   | PDFDocumentCreate(pdf_path)                                  |      |
| 36   | PDFDocumentOpen(pdf_path, {user_password}, {master_password}) |      |
| 37   | PrintMap(map_document, {printer_name}, {data_frame}, {out_print_file}, {image_quality}) |      |
| 38   | PublishMSDToServer(msd_path, connection_url_or_name, server, service_name, {folder_name}, {service_capabilities}, {connection_username}, {connection_password}, {connection_domain}) |      |
| 39   | RemoveLayer(data_frame, remove_layer)                        |      |
| 40   | RemoveTableView(data_frame, remove_table)                    |      |
| 41   | TableView(table_view_data_source)                            |      |
| 42   | UpdateLayer(data_frame, update_layer, source_layer, {symbology_only}) |      |
| 43   | UpdateLayerTime(data_frame, update_layer, source_layer)      |      |



## 常量

### 列表

| 序号 | 名称                     | 描述                                                         |
| ---- | ------------------------ | ------------------------------------------------------------ |
| 1    | {add_position}           | 供 AddLayer 和 AddLayerToGroup 使用。                        |
| 2    | {colorspace}             | 供 DataDrivenPages.exportToPDF、ExportToAI、ExportToEPS 和 ExportToPDF 使用。 |
| 3    | {color_mode}             | 供 ExportToBMP、ExportToGIF、ExportToJPEG、ExportToPNG 和 ExportToTIFF 使用。 |
| 4    | connection_type          | 供 CreateGISServerConnectionFile 使用。                      |
| 5    | {dataset_option}         | 供 ExportReport 使用。                                       |
| 6    | displayUnits             | DataFrame 对象的属性。                                       |
| 7    | {element_type}           | 供 ListLayoutElements 使用。                                 |
| 8    | {encryption}             | 供 PDFDocument.updateDocSecurity 使用。                      |
| 9    | {gif_compression}        | 供 ExportToGIF 使用。                                        |
| 10   | {image_compression}      | 供 DataDrivenPages.exportToPDF、ExportToEPS 和 ExportToPDF 使用。 |
| 11   | {image_quality}          | 供 DataDrivenPages.exportToPDF、ExportToAI、ExportToEMF、ExportToEPS、ExportToPDF、ExportToSVG 和 PrintMap 使用。 |
| 12   | {insert_position}        | 供 InsertLayer 和 MoveLayer 使用。                           |
| 13   | {layers_attributes}      | 供 DataDrivenPages.exportToPDF 和 ExportToPDF 使用。         |
| 14   | {layer_property}         | 供 Layer.supports 使用。                                     |
| 15   | {msd_anti_aliasing}      | 供 ConvertToMSD 使用。                                       |
| 16   | {msd_text_anti_aliasing} | 供 ConvertToMSD 使用。                                       |
| 17   | {multiple_files}         | 供 PDFDocument.exportToPDF 使用。                            |
| 18   | {page_range_type}        | 供 DataDrivenPages.exportToPDF 和 DataDrivenPages.printPages 使用。 |
| 19   | {pdf_layout}             | 供 PDFDocument.updateDocProperties 使用。                    |
| 20   | {pdf_open_view}          | 供 PDFDocument.updateDocProperties 使用。                    |
| 21   | {permissions}            | 供 PDFDocument.updateDocSecurity 使用。                      |
| 22   | {picture_symbol}         | 供 DataDrivenPages.exportToPDF、ExportToAI、ExportToEMF、ExportToEPS、ExportToPDF 和 ExportToSVG 使用。 |
| 23   | {ps_lang_level}          | 供 ExportToEPS 使用。                                        |
| 24   | {record_set}             | 供 ExportReport 使用。                                       |
| 25   | {rle_compression}        | 供 ExportToBMP 使用。                                        |
| 26   | {save_username_password} | 供 CreateGISServerConnectionFile 使用。                      |
| 27   | {service_capabilities}   | 供 PublishMSDToServer 使用。                                 |
| 28   | {server_type}            | 供 CreateGISServerConnectionFile 使用。                      |
| 29   | {server_type}            | 供 CreateMapSDDraft 使用。                                   |
| 30   | symbologyType            | 图层对象的属性。                                             |
| 31   | {tiff_compression}       | 供 ExportToTIFF 使用。                                       |
| 32   | timeWindowUnits          | DataFrameTime 的属性。                                       |
| 33   | {version}                | 供 Layer.saveACopy 和 MapDocument.saveACopy 使用。           |
| 34   | {workspace_type}         | 供 Layer.replaceDataSource、MapDocument.replaceWorkspacePaths 和 TableView.replaceDataSource 使用。 |





### {add_position} 

描述：供 AddLayer 和 AddLayerToGroup 使用。

- **"AUTO_ARRANGE"** - 默认值
- **"BOTTOM"**
- **"TOP"**



### {colorspace} 

描述：供 DataDrivenPages.exportToPDF、ExportToAI、ExportToEPS 和 ExportToPDF 使用。

- **"CMYK"**
- **"RGB"** - 默认值



### connection_type

描述：供 CreateGISServerConnectionFile 使用。

- **"1-BIT_MONOCHROME_MASK"**
- **"1-BIT_MONOCHROME_THRESHOLD"**
- **"24-BIT_TRUE_COLOR"** - 所有函数（ExportToGIF 除外）的默认值
- **"8-BIT_GRAYSCALE"** - ExportToGIF 的默认值
- **"8-BIT_PALETTE"**



**connection_type -** 供 [CreateGISServerConnectionFile](https://desktop.arcgis.com/zh-cn/arcmap/10.6/analyze/arcpy-mapping/creategisserverconnectionfile.htm) 使用。

- **"ADMINISTER_GIS_SERVICES"**
- **"PUBLISH_GIS_SERVICES"**
- **"USE_GIS_SERVICES"**



### {dataset_option}

描述：供 ExportReport 使用。

- **"ALL"**
- **"DEFINITION_QUERY"**
- **"EXTENT"**
- **"SELECTED"**
- **"USE_RLF"** - 默认值



### displayUnits

描述：DataFrame 对象的属性。

- **"Centimeters"**
- **"DecimalDegrees"**
- **"DecimalDegreesMinutes"**
- **"DecimalDegreesSeconds"**
- **"Decimeters"**
- **"Feet"**
- **"Inches"**
- **"Kilometers"**
- **"Meters"**
- **"MGRS"**
- **"Miles"**
- **"Millimeters"**
- **"NauticalMiles"**
- **"Points"**
- **"Unknown"**
- **"USNationalGrid"**
- **"UTM"**
- **"Yards"**



### {element_type}

描述：供 ListLayoutElements 使用。

- **"DATAFRAME_ELEMENT"**
- **"GRAPHIC_ELEMENT"**
- **"LEGEND_ELEMENT"**
- **"MAPSURROUND_ELEMENT"**
- **"PICTURE_ELEMENT"**
- **"TEXT_ELEMENT"**



### {encryption}

描述：供 PDFDocument.updateDocSecurity 使用。

- **"AES_V1"**
- **"AES_V2"**
- **"RC4"** - 默认值



### {gif_compression}

描述：供 ExportToGIF 使用。

- **"LZW"**
- **"NONE"** - 默认值
- **"RLE"**





### {image_compression}

描述：供 DataDrivenPages.exportToPDF、ExportToEPS 和 ExportToPDF 使用。

- **"ADAPTIVE"** - 默认值
- **"DEFLATE"**
- **"JPEG"**
- **"LZW"**
- **"NONE"**
- **"RLE"**



### {image_quality}

描述：供 DataDrivenPages.exportToPDF、ExportToAI、ExportToEMF、ExportToEPS、ExportToPDF、ExportToSVG 和 PrintMap 使用。

- **"BEST"** - 默认值
- **"BETTER"**
- **"FASTER"**
- **"FASTEST"**
- **"NORMAL"**



### {insert_position}

描述：供 InsertLayer 和 MoveLayer 使用。

- **"AFTER"**
- **"BEFORE"** - 默认值



### {layers_attributes}

描述：供 DataDrivenPages.exportToPDF 和 ExportToPDF 使用。

- **"LAYERS_AND_ATTRIBUTES"**
- **"LAYERS_ONLY"** - 默认值
- **"NONE"**



### {layer_property}

描述：供 Layer.supports 使用。

- **"BRIGHTNESS"**
- **"CONTRAST"**
- **"CREDITS"**
- **"DATASETNAME"**
- **"DATASOURCE"**
- **"DEFINITIONQUERY"**
- **"DESCRIPTION"**
- **"LABELCLASSES"**
- **"LONGNAME"**
- **"MAXSCALE"**
- **"MINSCALE"**
- **"NAME"**
- **"SERVICEPROPERTIES"**
- **"SHOWLABELS"**
- **"SYMBOLOGY"**
- **"SYMBOLOGYTYPE"**
- **"TIME"**
- **"TRANSPARENCY"**
- **"VISIBLE"**
- **"WORKSPACEPATH"**



### {msd_anti_aliasing}

描述：供 ConvertToMSD 使用。

- **"BEST"**
- **"FAST"**
- **"FASTEST"**
- **"NONE"** - 默认值
- **"NORMAL"**



### {msd_text_anti_aliasing}

描述：供 ConvertToMSD 使用。

- **"FORCE"** - 默认值
- **"NONE"**
- **"NORMAL"**



### {multiple_files}

描述：供 PDFDocument.exportToPDF 使用。

- **"PDF_MULTIPLE_FILES_PAGE_INDEX"**
- **"PDF_MULTIPLE_FILES_PAGE_NAME"**
- **"PDF_SINGLE_PAGE"** - 默认值



### {page_range_type}

描述：供 DataDrivenPages.exportToPDF 和 DataDrivenPages.printPages 使用。

- **"ALL"** - 默认值
- **"CURRENT"**
- **"RANGE"**
- **"SELECTED"**



### {pdf_layout}

描述：供 PDFDocument.updateDocProperties 使用。

- **"DONT_CARE"**
- **"ONE_COLUMN"**
- **"SINGLE_PAGE"** - 默认值
- **"TWO_COLUMN_LEFT"**
- **"TWO_COLUMN_RIGHT"**
- **"TWO_PAGE_LEFT"**
- **"TWO_PAGE_RIGHT"**



### {pdf_open_view}

描述：供 PDFDocument.updateDocProperties 使用。

- **"ATTACHMENT"**
- **"FULL_SCREEN"**
- **"LAYERS"**
- **"USE_BOOKMARKS"**
- **"USE_NONE"**
- **"USE_THUMBS"** - 默认值
- **"VIEWER_DEFAULT"**



### {permissions}

描述：供 PDFDocument.updateDocSecurity 使用。

- **"ALL"** - 默认值
- **"ALL_MASTER"**
- **"COPY"**
- **"DOC_ASSEMBLY"**
- **"EDIT"**
- **"EDIT_NOTES"**
- **"FILL_AND_SIGN"**
- **"HIGH_PRINT"**
- **"OPEN"**
- **"PRINT"**
- **"SECURE"**



### {picture_symbol}

描述：供 DataDrivenPages.exportToPDF、ExportToAI、ExportToEMF、ExportToEPS、ExportToPDF 和 ExportToSVG 使用。

- **"RASTERIZE_BITMAP"** - 默认值
- **"RASTERIZE_PICTURE"**
- **"VECTORIZE_BITMAP"**



### {ps_lang_level}

描述：供 ExportToEPS 使用。

- 2
- 3 - 默认值



### {record_set}

描述：供 ExportReport 使用。

- **"ALL"**
- **"SELECTED"**
- **"USE_RLF"** - 默认值



### {rle_compression}

描述：供 ExportToBMP 使用。

- **"NONE"** - 默认值
- **"RLE"**



### {save_username_password}

描述：供 CreateGISServerConnectionFile 使用。

- **"DO_NOT_SAVE_USERNAME"** - 默认值
- **"SAVE_USERNAME"** - 默认值



### {service_capabilities}

描述：供 PublishMSDToServer 使用。

- **"MAPPING"** - 默认值
- **"KML"**
- **"WCS"**
- **"WFS"**
- **"WMS"**



### {server_type}

描述：供 CreateGISServerConnectionFile 使用。

- **"ARCGIS_SERVER"** - 默认值
- **"SPATIAL_DATA_SERVER"**



### {server_type}

描述：供 CreateMapSDDraft 使用。

- **"ARCGIS_SERVER"** - 默认值
- **"FROM_CONNECTION_FILE"**
- **"MY_HOSTED_SERVICES"**
- **"SPATIAL_DATA_SERVER"**



### symbologyType

描述：图层对象的属性。

- **"GRADUATED_COLORS"**
- **"GRADUATED_SYMBOLS"**
- **"OTHER"**
- **"RASTER_CLASSIFIED"**
- **"UNIQUE_VALUES"**



### {tiff_compression}

描述：供 ExportToTIFF 使用。

- **"DEFLATE"**
- **"JPEG"**
- **"LZW"**
- **"NONE"** - 默认值
- **"PACK_BITS"**



### timeWindowUnits

描述：DataFrameTime 的属性。

- **“百年”**
- **“十年”**
- **“天”**
- **“小时”**
- **“毫秒”**
- **“分”**
- **“月”**
- **“秒”**
- **“未知”**
- **“周”**
- **“年”**



### {version}

描述：供 Layer.saveACopy 和 MapDocument.saveACopy 使用。

- **"10.1"** - 默认值
- **"10.0"**
- **"8.3"**
- **"9.0/9.1"**
- **"9.2"**
- **"9.3"**



### {workspace_type}

描述：供 Layer.replaceDataSource、MapDocument.replaceWorkspacePaths 和 TableView.replaceDataSource 使用。

- **"ACCESS_WORKSPACE"**
- **"ARCINFO_WORKSPACE"**
- **"CAD_WORKSPACE"**
- **"EXCEL_WORKSPACE"**
- **"FILEGDB_WORKSPACE"**
- **"NONE"**
- **"OLEDB_WORKSPACE"**
- **"PCCOVERAGE_WORKSPACE"**
- **"RASTER_WORKSPACE"**
- **"SDE_WORKSPACE"**
- **"SHAPEFILE_WORKSPACE"**
- **"TEXT_WORKSPACE"**
- **"TIN_WORKSPACE"**
- **"VPF_WORKSPACE"**

## 示例

### 将地图文档导出至PDF

```python
>>> mxd = arcpy.mapping.MapDocument("CURRENT")
>>> df = arcpy.mapping.ListDataFrames(mxd, "图层")[0]
>>> lyrFile = arcpy.mapping.Layer(r"C:\Users\Admin\Desktop\水网线.lyr")
>>> arcpy.mapping.AddLayer(df, lyrFile)
>>> arcpy.mapping.ExportToPDF(mxd,r'C:\Users\Admin\Desktop\Doc1.pdf')
```

