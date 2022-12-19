# [GeoServer中利用SLD配图之矢量图层配图](https://www.cnblogs.com/naaoveGIS/p/4176198.html)

文章版权由作者李晓晖和博客园共有，若转载请于明显处标明出处：http://www.cnblogs.com/naaoveGIS/。

## 1 背景

我们在ArcMap中可以直接通过symbol功能对图层进行定制化配图。但是，如果我们将配好图的shp图层在GeoServer中发布时，会发现图层样式完全丢失了。其实原因很简单，用ArcMap配好的图层，其样式文件并不是保存在shp中，而是保存在mxd或者msd中。

那么如何才能让GeoServer发布的图层也能达到定制化配图的效果呢？

## 2 SLD简介

SLD是风格化图层描述器（Styled Layer Descriptor）的简称，是2005年OGC提出的一个标准，这个标准在一定条件下允许WMS服务器对地图可视化的表现形式进行扩展。在没有SLD之前，只能使用一些已经在服务器上规定好的样式来对地图进行可视化。而当使用了实现了SLD标准之后，它允许我们从客户端来对地图进行定义自己的样式，分级显示等操作，极大的扩展了地图可视化的灵活性。

该SLD-规范是采用XML定义地图显示样式，通过自定义SLD来配置地图图层渲染的可视化风格，可以设置过滤器，自定义图例等。**rule**是SLD最重要的一个元素，因为她允许根据给定的某个参数（使用过滤器）对数据集进行分类，所有的与分类有关的重要参数都必须在rule元素中设置。

对于使用SLD来进行地图的自定义样式，则必须结合使用**SE**（Symbology Encoding）这个标准。SE是OGC的另一个标准，这个也是基于XML模式定义的，这个标准允许我们自定义不同的符号样式来表达地图上不同的要素。SLD文件使用这种语言，这样在地图渲染时地图服务可以解释由用户定义的样式。

SLD文档的元素架构如下：

   ![img](https://images0.cnblogs.com/blog/656746/201412/210933319527289.png)         

一个SLD样式文档一般包含一个部分，而最重要的如下：

FeatureTypeStyle：这一部分是整个样式文档的根节点，并说明什么是它的样式将被应用的特征类型。FeatureTypeStyle包含一个或者多个Rule元素，Rule元素允许有条件的映射。

RULE（规则）：规则是根据属性条件和地图比例尺来对要素进行分组渲染，一般RULE中只允许渲染一种类型的要素，即点，线，面等其中的一种，但是可以和注记同时使用。

Symbolizer（符号）：Symbolizer指定数据应该如何可视化，在1.0的标准中包含五忠类型的Symbolizer，分别是PointSymbolizer（点符号）、LineSymbolizer(线符号)、PloygonSymbolizer(面符号)、TextSymbolizer(注记)、RasterSymbolizer(栅格)。

通过SLD可以设置的不仅仅是简单的颜色和厚度。点可以设置成常用的形状，如圆形，方形，星形，甚至可以是自定义的图片图形或文字来指定；线可以渲染成虚线或者点虚线等，多边形可以填充自定义的平铺图像，样式可以基于数据的属性给定，以至于要素能够

被渲染成不同的风格。

**常用参数说明：**

| 符号                                 | 含义                             |
| ------------------------------------ | -------------------------------- |
| `<Name>`                             | 样式名称                         |
| `<FeatureTypeStyle>`                 | 要素样式                         |
| `<Rule>`                             | 规则                             |
| <ogc:Filter>                         | 过滤器                           |
| <ogc:PropertyIsBetween>              | 用来定义在两个属性值之间的过滤器 |
| <ogc:PropertyIsLessThan>             | 用来定义在小于某个属性值的过滤器 |
| <ogc:PropertyIsGreaterThan>          | 用来定义在大于某个属性值的过滤器 |
| <ogc:PropertyName>                   | 属性字段名                       |
| <ogc:Literal>                        | 属性值                           |
| `<PointSymbolizer>`                  | 点标记器                         |
| `<LineSymbolizer>`                   | 线标记器                         |
| `<PolygonSymbolizer>`                | 面标记器                         |
| `<CssParameter  name="fill">`        | 填充颜色                         |
| `<CssParameter  name="font-family">` | 字体                             |
| `<CssParameter  name="font-style">`  | 字体样式                         |
| `<CssParameter  name="font-size">`   | 字体大小                         |

## 3.示例

```xml
<?xml version="1.0" encoding="GB2312"?>
<sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
  <sld:NamedLayer>
    <sld:Name>Default Styler</sld:Name>
    <sld:UserStyle>
      <sld:Name>Default Styler</sld:Name>
      <sld:FeatureTypeStyle>
        <sld:Rule>
          <sld:Title>标题</sld:Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>字段名</ogc:PropertyName>
              <ogc:Literal>值</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
            ···PointSymbolizer|LineSymbolizer|PolygonSymbolizer···
        </sld:Rule>
        ···其他rule···
        <sld:VendorOption name="ruleEvaluation">first</sld:VendorOption>
      </sld:FeatureTypeStyle>
    </sld:UserStyle>
  </sld:NamedLayer>
</sld:StyledLayerDescriptor>
```



## 3 以polygon图层为例，详细讲解

### 3.1基本颜色填充

#### 3.1.1 结构

| **…**PolygonSymbolizer                   |        |
| ---------------------------------------- | ------ |
| **……**Fill                               | 填充   |
| **………**CssParameter name="fill"          | 颜色   |
| **………**CssParameter  name="fill-opacity" | 透明度 |
| **……**Stroke                             | 边界   |
| **………**CssParameter name="stroke"        | 颜色   |
| **………**CssParameter  name="stroke-width" | 宽度   |

#### 3.1.2示例

带有边界透明的多边形

SLD：

```xml
<FeatureTypeStyle>
  <Rule>
    <PolygonSymbolizer>
      <Fill>
        <GraphicFill>
          <Graphic>
            <ExternalGraphic>
              <OnlineResource xlink:type="simple" xlink:href="20101.gif" />
              <Format>image/gif</Format>
            </ExternalGraphic>
            <Size>20</Size>
          </Graphic>
        </GraphicFill>
      </Fill>
      <Stroke>
        <CssParameter name="stroke">#000000</CssParameter>
        <CssParameter name="stroke-width">1</CssParameter>
      </Stroke>
    </PolygonSymbolizer>
  </Rule>
</FeatureTypeStyle>
```

 

效果：

 ![img](https://images0.cnblogs.com/blog/656746/201412/210933474379391.png)

### 3.2图片填充

#### 3.2.1结构

| **…****PolygonSymbolizer**   |          |
| ---------------------------- | -------- |
| **……****Fill**               |          |
| **………****GraphicFill**       |          |
| **…………****Graphic**          |          |
| **……………****ExternalGraphic** |          |
| **………………****OnlineResource** | 图片来源 |
| **………………****Format**         | 图片格式 |
| **……………****Size**            | 大小     |

#### 3.2.2示例

带有使用图片填充的多边形

SLD：

```xml
<FeatureTypeStyle>
  <Rule>
    <PolygonSymbolizer>
      <Fill>
        <GraphicFill>
          <Graphic>
            <ExternalGraphic>
              <OnlineResource xlink:type="simple" xlink:href="20101.gif" />
              <Format>image/gif</Format>
            </ExternalGraphic>
            <Size>20</Size>
          </Graphic>
        </GraphicFill>
      </Fill>
      <Stroke>
        <CssParameter name="stroke">#000000</CssParameter>
        <CssParameter name="stroke-width">1</CssParameter>
      </Stroke>
    </PolygonSymbolizer>
  </Rule>
</FeatureTypeStyle>
```

效果：

 ![img](https://images0.cnblogs.com/blog/656746/201412/210934046556165.png)

### 3.3注记显示

#### 3.3.1结构

| **…****TextSymbolizer**                    |                    |
| ------------------------------------------ | ------------------ |
| **……****Label**                            |                    |
| **………****ogc:PropertyName**                | 注记的属性字段名称 |
| **……****Font**                             | 字体               |
| **………****CssParameter name="font-family"** | 字体类型           |
| **………****CssParameter name="font-size"**   | 字体大小           |
| **………****CssParameter name="font-style"**  | 字体样式           |
| **………****CssParameter name="font-weight"** | 字体加粗           |
| **……****LabelPlacement**                   | 注记的位置         |
| **………****PointPlacement**                  | 注记点位置         |
| **…………****AnchorPoint**                    |                    |
| **……………****AnchorPointX**                  |                    |
| **……………****AnchorPointY**                  |                    |
| **…………****Displacement**                   |                    |
| **……………****Displacement X**                |                    |
| **……………****Displacement Y**                |                    |
| **…………****Rotation**                       | 设置旋转角度       |
| **……****Fill**                             | 填充               |
| **………****CssParameter name="fill"**        | 填充颜色           |

#### 3.3.2示例

带有注记的填充色透明的多边形

SLD:

```xml
<TextSymbolizer>
  <Label>
    <ogc:PropertyName>COMNAME</ogc:PropertyName>
  </Label>
  <Font>
    <CssParameter name="font-family">微软雅黑</CssParameter>
    <CssParameter name="font-size">15</CssParameter>
    <CssParameter name="font-style">normal</CssParameter>
    <CssParameter name="font-weight">bold</CssParameter>
  </Font>
  <LabelPlacement>
    <PointPlacement>
      <AnchorPoint>
        <AnchorPointX>0.5</AnchorPointX>
        <AnchorPointY>0.5</AnchorPointY>
      </AnchorPoint>
    </PointPlacement>
  </LabelPlacement>
  <Fill>
    <CssParameter name="fill">#FF5226</CssParameter>
  </Fill>
  <VendorOption name="followLine">true</VendorOption>
</TextSymbolizer> 
```

 

效果：

 ![img](https://images0.cnblogs.com/blog/656746/201412/210934180156883.png)

### 3.4 分属性渲染

#### 3.4.1结构

| **…****PolygonSymbolizer**   |      |
| ---------------------------- | ---- |
| **……****Rule**               |      |
| **………****Filter**            |      |
| **………****PolygonSymbolizer** |      |
| **………****TextSymbolizer**    |      |

#### 3.4.2示例

根据属性字段值范围用不同颜色渲染。

SLD：

```xml
<FeatureTypeStyle>
  <Rule>
    <Name>SmallCOMM</Name>
    <Title>Less Than 510104024008</Title>
    <ogc:Filter>
      <ogc:PropertyIsLessThan>
        <ogc:PropertyName>COMID</ogc:PropertyName>
        <ogc:Literal>510104024008</ogc:Literal>
      </ogc:PropertyIsLessThan>
    </ogc:Filter>
    <PolygonSymbolizer>
      <Fill>
        <CssParameter name="fill">#66FF66</CssParameter>
      </Fill>
    </PolygonSymbolizer>
  </Rule>
  <Rule>
    <Name>MediumCOMM</Name>
    <Title>510104024008 to 510104024011</Title>
    <ogc:Filter>
      <ogc:And>
        <ogc:PropertyIsGreaterThanOrEqualTo>
          <ogc:PropertyName>COMID</ogc:PropertyName>
          <ogc:Literal>510104024008</ogc:Literal>
        </ogc:PropertyIsGreaterThanOrEqualTo>
        <ogc:PropertyIsLessThan>
          <ogc:PropertyName>COMID</ogc:PropertyName>
          <ogc:Literal>510104024011</ogc:Literal>
        </ogc:PropertyIsLessThan>
      </ogc:And>
    </ogc:Filter>
    <PolygonSymbolizer>
      <Fill>
        <CssParameter name="fill">#33CC33</CssParameter>
      </Fill>
    </PolygonSymbolizer>
  </Rule>
  <Rule>
    <Name>LargeCOMM</Name>
    <Title>Greater Than 510104024011</Title>
    <ogc:Filter>
      <ogc:PropertyIsGreaterThan>
        <ogc:PropertyName>COMID</ogc:PropertyName>
        <ogc:Literal>510104024011</ogc:Literal>
      </ogc:PropertyIsGreaterThan>
    </ogc:Filter>
    <PolygonSymbolizer>
      <Fill>
        <CssParameter name="fill">#009900</CssParameter>
      </Fill>
    </PolygonSymbolizer>
  </Rule>
</FeatureTypeStyle>
```

 

效果：

   ![img](https://images0.cnblogs.com/blog/656746/201412/211246408907769.png)          

在SLD中还根据3.3的注记写法，增加了注记的显示。

### 3.5分级渲染

#### 3.5.1结构

| **…****PolygonSymbolizer**     |      |
| ------------------------------ | ---- |
| **……****Rule**                 |      |
| **………****MinScaleDenominator** |      |
| **………****MaxScaleDenominator** |      |
| **………****PolygonSymbolizer**   |      |
| **………****TextSymbolizer**      |      |

 

#### 3.5.2示例

通过设置不同比例尺时的显示颜色，展示不同的效果。

SLD：

```xml
<FeatureTypeStyle>
  <Rule>
    <Name>Large</Name>
    <MaxScaleDenominator>5746</MaxScaleDenominator>
    <PolygonSymbolizer>
      <Fill>
        <CssParameter name="fill">#CCCCCC</CssParameter>
      </Fill>
      <Stroke>
        <CssParameter name="stroke">#000000</CssParameter>
        <CssParameter name="stroke-width">7</CssParameter>
      </Stroke>
    </PolygonSymbolizer>
  </Rule>
  <Rule>
    <Name>Medium</Name>
    <MinScaleDenominator>5746</MinScaleDenominator>
    <MaxScaleDenominator>12000</MaxScaleDenominator>
    <PolygonSymbolizer>
      <Fill>
        <CssParameter name="fill">#0000CC</CssParameter>
      </Fill>
      <Stroke>
        <CssParameter name="stroke">#000000</CssParameter>
        <CssParameter name="stroke-width">4</CssParameter>
      </Stroke>
    </PolygonSymbolizer>
  </Rule>
  <Rule>
    <Name>Small</Name>
    <MinScaleDenominator>12000</MinScaleDenominator>
    <PolygonSymbolizer>
      <Fill>
        <CssParameter name="fill">#0000CC</CssParameter>
      </Fill>
      <Stroke>
        <CssParameter name="stroke">#000000</CssParameter>
        <CssParameter name="stroke-width">1</CssParameter>
      </Stroke>
    </PolygonSymbolizer>
  </Rule>
</FeatureTypeStyle>
```

效果图：

 ![img](https://images0.cnblogs.com/blog/656746/201412/211246531405160.png)

![img](https://images0.cnblogs.com/blog/656746/201412/211247015777183.png)

 

 



## 4 注意

### 4.1 注记渲染时某些注记未显示

初始时，某个要素的注记无法显示：

 ![img](https://images0.cnblogs.com/blog/656746/201412/210934293125432.png)

放大后其又可以出现：

 ![img](https://images0.cnblogs.com/blog/656746/201412/210934380464196.png)

出现这种情况，往往是因为注记显示的地方在另外一个要素下面。

解决方法比较简单，利用LabelPalcement元素调整注记显示的地方便可解决。例如：

```xml
<LabelPlacement>
  <PointPlacement>
    <AnchorPoint>
      <AnchorPointX>0.5</AnchorPointX>
      <AnchorPointY>0.5</AnchorPointY>
    </AnchorPoint>
  </PointPlacement>
</LabelPlacement>
```



### 4.2 中文出现乱码

![img](https://images0.cnblogs.com/blog/656746/201412/210934539218712.png)
出现这样的情况，一般是SLD中未进行正确的格式编码赋值。

首先将编码改成GB2312。例如：

```xml
<?xml version="1.0" encoding="GB2312"?>
```

如果发现还是乱码，则很有可能是目前字体不支持中文。

例如当字体是Arial时，不支持中文：

```xml
<CssParameter name="font-family">Arial</CssParameter>
```

将字体改成微软雅黑，则注记不再重现乱码：

```xml
<CssParameter name="font-family">微软雅黑</CssParameter>
```

## 5 总结

对Point和Line图层的SLD文件编写，其格式和内容与Polygon大体相似，不再累述。GeoServer不仅支持对矢量图层的渲染，还支持对栅格图层的渲染。在以后的章节中我会跟大家继续一起探讨。