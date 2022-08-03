## 1.点

| 类型     | 描述   |
| -------- | ------ |
| square   | 正方形 |
| circle   | 圆形   |
| triangle | 三角形 |
| 。。。   |        |





### 1.1简单点

```css
/* @title yellow point */
* {
    mark: symbol(square);   /*形状*/
    mark-size: 6px;         /*大小*/
    mark-rotation: 45;   /*旋转角度*/
    :mark {
        fill: #ff0000;      /*填充色*/
        fill-opacity:0.5;   /*填充色透明度*/
        stroke: #00cc33;    /*边框色*/
        stroke-width:1;     /*边框宽度*/
    }
}
```

![1603435248879](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021044628.png)

### 1.2图标

```css
* {
    mark: url("images/bsz_gjgy/swjg.png");   /*图标路径*/
    mark-size: 20px;         /*大小*/
}
```

![1603434556031](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021044629.png)

### 1.3显示标签

```css
* {
    mark: symbol(circle);   /*形状*/
    mark-size: 20px;         /*大小*/
    label:[CunName];   /*标注字段*/
    font-fill:#333;     /*标注颜色*/
}
```

![1603435503083](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021044630.png)



### 1.4有样式标签

```css

* {
    mark: symbol(circle);   /*形状*/
    mark-size: 20px;         /*大小*/
    label:[CunName];   /*标注字段*/
    font-fill: black;   /*颜色*/
    font-family: "宋体"; /*字体*/
    font-size: 12;     /*字体大小*/
    font-weight: bold;   /*加粗*/
    label-anchor: 0.5 0;  
    label-offset: 0 5;
    label-rotation: -45; /*旋转*/
}
```

![1603435731331](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021044631.png)

## 2.线

### 2.1简单线条

```css
 * {
   stroke: black;   /*线颜色*/  
   stroke-width: 3px;  /*线宽度*/
 }
```

![1603436109572](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021044632.png)

### 2.2带边框的线

相当于多条线叠加

```css
 * {
   stroke: #333333, #6699FF;   /*颜色*/
   stroke-width: 5px, 3px;     /*宽度*/
   z-index: 0, 1;              /*显示顺序*/
 }
```

![1603436272372](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021044633.png)

### 2.3虚线

```css
 * {
   stroke: black;   /*线颜色*/  
   stroke-width: 3px;  /*线宽度*/
   stroke-dasharray: 5 2;  /*虚线*/
 }
```

![1603436344980](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021044634.png)

### 2.4铁路

```css
* {
   stroke: #333333, symbol("shape://vertline");
   stroke-width: 3px;
   :nth-stroke(2) {
     size: 12;
     stroke: #333333;
     stroke-width: 1px;
   }
 }
```

![1603436631130](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021044635.png)

### 2.5符号线

```css
 * {
   stroke: symbol(circle);   /*符号*/
   stroke-dasharray: 4 6;    /*虚线*/
   :stroke {
     size: 4;
     fill: #666666;
     stroke: #333333;
     stroke-width: 1px;
   }
 }
```

![1603436740701](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021044636.png)

### 2.6基础线间隔符号

```css
 * {
   stroke: blue, symbol(circle);
   stroke-width: 1px;
   stroke-dasharray: 10 10, 5 15;
   stroke-dashoffset: 0, 7.5;
   :nth-stroke(2) {
     stroke: #000033;
     stroke-width: 1px;
     size: 5px;
   }
 }
```

![1603436866190](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021044637.png)

### 2.7默认标签

```css
 * {
   stroke: red;
   label: [mc];
   font-fill: black;
 }
```

![1603437057276](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021044639.png)

### 2.8沿线具有垂直偏移的标签

```css
 * {
   stroke: red;
   label: [name];
   label-offset: 7px;
   font-fill: black;
 }
```

![1603437122138](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021044640.png)

### 2.9跟随线标签

```css
* {
   stroke: red;
   label: [name];
   font-fill: black;
   label-follow-line: true;  /*跟随线*/
 }
```

![1603437272289](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021044641.png)

优化标签位置, 以便显示最大数量的标签。 

```css
 * {
   stroke: red;
   label: [name];
   font-fill: black;
   label-follow-line: true;
   label-max-angle-delta: 90;
   label-max-displacement: 400;
   label-repeat: 150;
 }
```

![1603437350961](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021044642.png)

优化样式

```css
* {
   stroke: red;
   label: [mc];
   font-weight: bold;
   font-fill: black;
   font-size: 10;
   halo-color: white;
   halo-radius: 1;
   label-follow-line: true;
   label-max-angle-delta: 90;
   label-max-displacement: 400;
   label-repeat: 150;
 }
```

![1603437439278](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021044643.png)

## 3.面

### 3.1简单面

```css
* {
   stroke:#ff0000;   /*边框色*/
   stroke-width:2;   /*边框宽度*/
   fill: #000080;    /*填充色*/
   fill-opacity:0.5;  /*透明度*/
 }
```

![1603437781548](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021044644.png)

### 3.2图片填充

```css
 * {
   fill: url("images/bsz_gjgy/swjg.png");
   fill-mime: 'image/png';
 }
```

![1603437870378](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021044645.png)

### 3.3阴影图案填充 

```css
 * {
   fill: symbol("shape://times");
   :fill {
     size: 16;
     stroke: #990099;
     stroke-width: 1px;
   }
 }
```

![1603437958914](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021044646.png)

### 3.4默认标签

```css
 * {
   fill: #40FF40;
   stroke: white;
   stroke-width: 2;
   label: [CunName];
   font-fill: black;
 }
```

![1603438030313](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021044647.png)

### 3.5带有光晕的标签

```css
 * {
   fill: #40FF40;
   stroke: white;
   stroke-width: 2;
   label: [CunName];
   font-fill: black;
   halo-color: white;
   halo-radius: 3;
 }
```

![1603438090320](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021044648.png)

### 3.6带样式标签的多边形

```css
 * {
   fill: #40FF40;
   stroke: white;
   stroke-width: 2;
   label: [name];
   font-family: Arial;
   font-size: 11px;
   font-style: normal;
   font-weight: bold;
   font-fill: black;
   label-anchor: 0.5 0.5;
   label-auto-wrap: 60;
   label-max-displacement: 150;
 }
```

![1603438167776](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021044649.png)