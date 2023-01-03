# Flex 布局

> 背景知识： [flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex), [flex 布局的基本概念](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)

Flex 布局的全称为 CSS Flexible Box Layout Module，是 W3C 提出的一种新型页面布局方案，第一个版本于 2009 年推出，到现在为止，W3C 一共发布了 12 个版本，[最新版本](https://www.w3.org/TR/css-flexbox-1/)于 20171019 推出，已经得到了所有主流浏览器的支持，所以请大胆的使用吧~

**历史版本:**

> \> https://www.w3.org/TR/2016/CR-css-flexbox-1-20160526/
>
> \> https://www.w3.org/TR/2016/CR-css-flexbox-1-20160301/
>
> \> https://www.w3.org/TR/2015/WD-css-flexbox-1-20150514/
>
> \> https://www.w3.org/TR/2014/WD-css-flexbox-1-20140925/
>
> \> https://www.w3.org/TR/2014/WD-css-flexbox-1-20140325/
>
> \> https://www.w3.org/TR/2012/CR-css3-flexbox-20120918/
>
> \> https://www.w3.org/TR/2012/WD-css3-flexbox-20120612/
>
> \> https://www.w3.org/TR/2012/WD-css3-flexbox-20120322/
>
> \> https://www.w3.org/TR/2011/WD-css3-flexbox-20111129/
>
> \> https://www.w3.org/TR/2011/WD-css3-flexbox-20110322/
>
> \> https://www.w3.org/TR/2009/WD-css3-flexbox-20090723/

## Flexbox 原理演示

<iframe :src="$withBase('https://lhammer.cn/Flexbox')" width="100%" height="600px" frameborder="0" scrolling="No"  />

> **感谢：**以上演示 Fork 自[xluos](https://github.com/xluos)的[Flexbox 演示站](https://xluos.github.io/demo/flexbox/)~

Flex 布局由容器`flex container`和项目`flex item`两部分组成，容器默认存在两根轴：水平的主轴`main axis`和垂直的交叉轴`cross axis`，项目默认以主轴排列。 Flex 属性包括容器属性和项目属性两部分，容器上可设置：`flex-direction`、`flex-wrap`、`flex-flow`、`justify-content`、`align-items`、`align-content`6 个属性，项目上同样可设置 6 个属性，分别为：`order`、`flex-grow`、`flex-shrink`、`flex-basis`、`flex`、`align-self`。示例如下：

## 容器属性

### flex-direction 属性

**作用：** 决定主轴的方向。

```css
flex-direction: row | row-reverse | column | column-reverse;
```

> - row：默认值，主轴为水平方向,表示从左向右排列
> - row-reverse：主轴为水平方向，从右向左排列
> - column：主轴为垂直方向，从上向下排列
> - column-reverse：主轴为垂直方向，从下向上排列

::: demo

css/examples/结构布局/flex布局/flex-direction

:::

### flex-wrap 属性

**作用：** 决定项目在一条轴线排不下时如何换行。

```css
flex-wrap: nowrap | wrap | wrap-reverse;
```

> - nowrap：默认值，不换行
> - wrap：换行，第一行在上方
> - wrap-reverse：换行，第一行在下方

::: demo

css/examples/结构布局/flex布局/flex-wrap

:::

### flex-flow 属性

**作用：**`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为 row nowrap。

```css
flex-flow: <flex-direction> || <flex-wrap>;
```

> - row nowrap：默认值，主轴为水平方向，不换行
> - `<flex-direction>`：同[flex-direction](#flex-direction属性)
> - `<flex-wrap>`：同[flex-wrap](#flex-wrap属性)

### justify-content 属性

**作用：** 定义项目在主轴上的对齐方式。

```css
justify-content: flex-start | flex-end | center | space-between | space-around |space-evenly;
```

> - flex-start：默认值，左对齐
> - flex-end：右对齐
> - center：居中
> - space-evenly：每个项目之间及两端的间隔都相等
> - space-around：每个项目两侧间隔相等
> - space-between：两端对齐，项目之间间隔相等

::: demo

css/examples/结构布局/flex布局/justify-content

:::



### align-items 属性

**作用：** 定义项目在交叉轴（默认方向从上到下）上的对齐方式。

```css
align-items: flex-start | flex-end | center | baseline | stretch;
```

> - flex-start：交叉轴的起点对齐
> - flex-end：交叉轴的终点对齐
> - center：交叉轴的中心对齐
> - baseline：项目第一行文字的基线对齐
> - stretch：默认值，项目未设置固定高度时，将占满整个容器

::: demo

css/examples/结构布局/flex布局/align-items

:::



### align-content 属性

**作用：** 定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

```css
align-content: flex-start | flex-end | center | space-between | space-around |
  stretch;
```

> - flex-start：交叉轴的起点对齐
> - flex-end：交叉轴的终点对齐
> - center：交叉轴的中心对齐
> - space-between：与交叉轴两端对齐，轴线之间的间隔平均分布等
> - space-around：每根轴线两侧的间隔都相
> - stretch：默认值，轴线占满整个交叉轴

::: demo

css/examples/结构布局/flex布局/align-content

:::



## 项目属性

### order 属性

**作用：** 定义项目的排列顺序。

```css
order: <number>;
```

> - `<number>`：值为整数，数值越小，排列越靠前，默认为 0

::: demo

css/examples/结构布局/flex布局/order

:::



### flex-grow 属性

**作用：** 定义项目的伸缩比例，按照该比例给项目分配**剩余空间**。

```css
flex-grow: <number>;
```

> - `<number>`：值为整数，数值越大，项目占据空间越大，默认为 0

::: demo

css/examples/结构布局/flex布局/flex-grow

:::



### flex-shrink 属性

**作用：** 指定了 flex 元素的收缩规则，默认值是1。在flex 元素的默认宽度之和大于容器的宽度时候，元素会发生收缩，其收缩的大小的依据是 flex-shrink 值。

```css
flex-shrink: <number>;
```

> - `<number>`：值为整数，数值越大，项目占据空间越小，默认为 1

**示例1**

::: demo 

css/examples/结构布局/flex布局/flex-shrink

:::

**示例2**：某个元素不被压缩

::: demo 

css/examples/结构布局/flex布局/flex-shrink2

:::



### flex-basis 属性

**作用：** 定义在分配多余空间之前，项目占据的主轴空间。浏览器根据这个属性，计算主轴是否有多余空间。

```css
flex-basis: <length> | auto;
```

> - `<length>`：默认为 auto，即项目的原始尺寸；也可设置和 width 或 height 属性一样的值（比如 329px），则项目将占据固定空间。

::: demo

css/examples/结构布局/flex布局/flex-basis

:::



### flex 属性 

**作用：** 是`flex-grow`,`flex-shrink`和`flex-basis`的简写，后两个属性可选。

```css
flex: none | [ < "flex-grow" > < "flex-shrink" >? || < "flex-basis" > ];
```

> - `0 1 auto`：默认值，不伸缩，如果容器空间不足则等比例收缩
> - `1 1 auto`：对应关键字`auto`，如果容器空间多余，则等比例分配多余空间空间；如果容器空间不足则等比例收缩
> - `0 0 auto`：对应关键字`none`，按项目原始大小分配空间

### align-self 属性

**作用：** 定义单个项目的对齐方式，可覆盖 align-items 属性。

```css
align-self: auto | flex-start | flex-end | center | baseline | stretch;
```

> - auto：默认值，继承父元素的`align-items`属性，如果没有父元素，则等同于 stretch
> - flex-start：交叉轴的起点对齐
> - flex-end：交叉轴的终点对齐
> - center：交叉轴的中心对齐
> - baseline：项目第一行文字的基线对齐
> - stretch：未设置固定高度是，将占满整个容器

::: demo

css/examples/结构布局/flex布局/align-self

:::