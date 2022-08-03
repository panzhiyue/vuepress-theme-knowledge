# CSS Style定义

##  1.打开New Style页面（Data >Styles >add a new style） 

## 2.Format选择CSS

![1603415394516](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021044178.png)

## 3.生成默认样式

![1603415443248](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208021044180.png)

## 4.修改边框,填充色或其他属性



## 5.过滤器

### 5.1全部设置

```css
//所有图形的边框样式
*{
    stroke: #ff0000;
    stroke-width: 1;
}
```

### 5.2根据属性过滤

<b>谓词运算符</b>

| 操作员 | 含义                                                         |
| :----- | :----------------------------------------------------------- |
| `=`    | 该属性必须完全等于指定的值。                                 |
| `<>`   | 该属性不能完全等于指定的值。                                 |
| `>`    | 该属性必须大于（或按字母顺序晚于）指定值。                   |
| `>=`   | 该属性必须大于或等于指定的值。                               |
| `<`    | 该属性必须小于（或按字母顺序早于）指定值。                   |
| `<=`   | 该属性必须小于或等于指定的值。                               |
| `LIKE` | 该属性必须与指定值描述的模式匹配。模式用于`_`指示单个未指定字符和`%` 指示未知数量的未指定字符。 |

```css
//设置所有name属性为beijing的图形的边框样式
[name='beijing']{
    stroke: #ff0000;
    stroke-width: 1; 
}


```

### 5.3比例尺过滤

| 伪属性 | 含义                                                         |
| :----- | :----------------------------------------------------------- |
| @sd    | 当前渲染的比例分母。更明确地说，这是实际距离与屏幕/渲染距离的比率。 |
| @scale | 与上述相同，当前渲染的比例分母（非比例）。支持向后兼容       |

标度值可以表示为素数，为了简洁起见，可以使用后缀k（千），M（兆），G（千兆）作为后缀，例如：

```css
[@sd > 100k]
[@sd < 12M]
[@sd < 1G]
```

```css
//比例尺小于30000时的边框样式
[@sd<30k]{
    stroke: #ff0000;
    stroke-width: 1; 
}
```

### 5.4根据图层名称过滤

```css
//图层名称为status的图形边框样式
states {
        stroke: #ff0000;
    stroke-width: 1; 
}
```

### 5.5根据ID过滤

 对于提供要素级标识符的图层，您只需指定ID即可对特定要素进行样式设置。这是通过在ID前面加上井号（`#`）来完成的： 

```css
#states.2 {
    stroke: black;
}
```

### 5.6过滤符号

 使用符号创建内联图形时，您可能需要对它们应用一些样式选项。您可以使用一些特殊的选择器为内置符号指定样式属性： 

| 伪选择器         | 含义                                                         |
| :--------------- | :----------------------------------------------------------- |
| `:mark`          | 指定规则适用于用作点标记的符号                               |
| `:stroke`        | 指定规则适用于用作笔划模式的符号                             |
| `:fill`          | 指定规则适用于用作填充图案的符号                             |
| `:symbol`        | 指定规则适用于任何符号，无论在哪个上下文中使用该符号         |
| `:nth-mark(n)`   | 指定规则适用于要素上第n个堆叠点标记所使用的符号。            |
| `:nth-stroke(n)` | 指定规则适用于要素上第n个堆叠的笔划样式所使用的符号。        |
| `:nth-fill(n)`   | 指定规则适用于要素上第n个堆叠填充图案使用的符号。            |
| `:nth-symbol(n)` | 指定将规则应用于要素上第n个堆叠符号所使用的符号，而不管其在哪个上下文中使用。 |

```css
/* @title dark orange 点 */
[dimension(geometry)=0] {
    mark: symbol(square);
    mark-size: 6px;
    :mark {
        fill: #ff9900;
    }
}
```



### 5.7根据图形类型过滤

```css
/* @title 栅格 */
[isCoverage()=true] {
    raster-channels: auto;
    raster-opacity: 1.0;
}

/* @title dark orange 面 */
[dimension(geometry)=2] {
    stroke: #000000;
    stroke-width: 0.5;
    fill: #ff9900;
}

/* @title dark orange 线 */
[dimension(geometry)=1] {
    stroke: #ff9900;
}

/* @title dark orange 点 */
[dimension(geometry)=0] {
    mark: symbol(square);
    mark-size: 6px;
    :mark {
        fill: #ff9900;
    }
}
```

### 5.8组合过滤器

#### 5.8.1 And

```css
//设置所有name属性为beijing的图形在比例尺小于30000时的边框样式
[name='beijing'] [@sd<30k]{
    stroke: #ff0000;
    stroke-width: 1; 
}

[name='beijing' and @sd<30k]{
    stroke: #ff0000;
    stroke-width: 1; 
}

```

#### 5.8.1Or

```css
//设置所有name属性为beijing或为nanjing的图形的边框样式
[name='beijing'],[name='nanjing']{
    stroke: #ff0000;
    stroke-width: 1; 
}

[name='beijing' or name='nanjing']{
    stroke: #ff0000;
    stroke-width: 1; 
}

```

