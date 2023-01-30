

# HTML

## 第一章 HTML5概述

### 1.1、什么是HTML

HTML（**H**yper**T**ext **M**arkup **L**anguage，超文本标记语言）是用来描述网页的一种语言，它不是一种编程语言，而是一种**标记**语言。

### 1.2、什么是HTML5

HTML5是构建Web内容的一种语言描述方式，HTML5是互联网的下一代标准，是构建以及呈现互联网内容的一种语言方式，被认为是互联网的核心技术之一。HTML产生于1990年，1997年HTML4成为互联网标准，并广泛应用于互联网应用的开发。

HTML5是Web中核心语言HTML的规范，用户使用任何手段进行网页浏览时看到的内容原本都是HTML格式的，在浏览器中通过一些技术处理将其转换成为了可识别的信息，HTML5在从前HTML4.01的基础上进行了一定的改进。

### 1.3、本文重要说明

由于HTML5只是在HTML的基础上进行了新增或者废弃一些标签或者特性，本文默认均为HTML5语法，被废弃的部分就不再提起，HTML一般用于描述网页的结构，所以一些样式和脚本方面的标签和属性以及关于JavaScript部分的特性也不再提及，重点在于梳理常用标签体系。

### 1.4、浏览器的版本

现今浏览器的许多新功能都是从HTML5标准中发展而来的。目前常用的浏览器有IE、火狐、谷歌、Safari和Opera等等，通过对这些主流web浏览器的发展策略调查，发现它们都支持HTML5上采取了措施。

**（1）IE浏览器**

2010年3月16日，微软MIX10技术大会上宣布其推出的IE9浏览器已经支持HTML5。同时还声称，随后将会更多的支持HTML新标准和CSS3新特性。

**（2）FireFox浏览器**

2010年7月，Mozilla基金会发布了即将推出的Firefox4浏览器的第一个早期测试版，该版本中Firefox浏览器中进行了大幅改进，包括新的HTML5语法分析器，以及支持更多的HTML5语法分析器，以及支持更多的HTML5形式的控制等。从官方文档来看，Firefox4对HTML5是完全级别的支持。目前，包括在线视频，在线音频在内的多种应用都已经在版本中实现。

**（3）Google浏览器**

2010年2月19日，谷歌Gears项目经理通过微博宣布，谷歌将放弃对Gears浏览器插件项目的支持，以重点开发HTML5项目。据费特表示，目前在谷歌看来，Gears应用用于HTML5的诸多创新非常相似，并且谷歌一直积极发展HTML5项目。因此只要谷歌不断以加强网络标准的应用功能为工作重点，那么为Gears增加新功能就无太大意义了。另外，Gears面临的需求也在日益下降，这也是谷歌做出吊证的重要原因。

**（4）Safari浏览器**

2010年6月7日，苹果在开发者发布会公布Safari5，这款浏览器支持10个以上的HTML5新技术，包括全屏幕播放、HTML5视频、HTML5地理位置、HTML5切片元素、HTML5的可拖动属性、HTML5的形式验证、HTML5的Ruby、HTML5的Ajaxl.ishi和WebSocket字幕。

**（5）Opera浏览器**

2010年5月5日，Opera软件公司首席技术官，号称“CSS之父”的Hakon Wium Lie认为，HTML5和CSS3，将会是全球互联网发展的未来趋势，包括目前Opera在内的诸多浏览器厂商，纷纷研发HTML5的相关产品，web未来属于HTML5。

综上所述，目前这些浏览器纷纷朝着HTML5的方向迈进，HTML5的时代即将来临。

### 1.5、选择开发工具

- Notepad++
  - 官方地址：[点击打开](https://notepad-plus-plus.org/)
  - 是否免费：免费
- Visual Studio Code
  - 官方地址：[点击打开](https://code.visualstudio.com/)
  - 是否免费：免费
- HBuilderX
  - 官方地址：[点击打开](https://www.dcloud.io/hbuilderx.html)
  - 是否免费：免费
- Dreamweaver
  - 官方地址：[点击打开](https://www.adobe.com/cn/products/dreamweaver.html)
  - 是否免费：收费
- Sublime Text
  - 官方地址：[点击打开](http://www.sublimetext.com/)
  - 是否免费：收费
- Webstorm
  - 官方地址：[点击打开](https://www.jetbrains.com/webstorm/)
  - 是否免费：收费

**Webstorm**为本文使用的工具，请自行购买激活，也可以使用以上的免费工具，安装步骤都较为简单，在此省略！

## 第二章 HTML5语法

### 2.1、基本结构

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>

</body>
</html>
```

### 2.2、语法规范

- HTML中不区分大小写，但是我们一般都使用小写
- HTML中的注释不能嵌套
- HTML标签必须结构完整，要么成对出现，要么自结束标签
- HTML标签可以嵌套，但是不能交叉嵌套
- HTML标签中的属性必须有值，且值必须加引号(双引号单引号都可以)

### 2.3、标签规范

**单标签：**

```
<标签名 [属性名=属性值,...]>
```

**成对标签：**

```
<标签名 [属性名=属性值,...]></标签名>
```

## 第三章 HTML5标签

### 3.1、标题标签

```html
<h1>这是一级标题</h1>
<h2>这是二级标题</h2>
<h3>这是三级标题</h3>
<h4>这是四级标题</h4>
<h5>这是五级标题</h5>
<h6>这是六级标题</h6>
```

### 3.2、段落标签

```html
<p>这是一个段落</p>
```

### 3.3、链接标签

**使用示例：**

```html
<a href="https://www.baidu.com">打开百度，你就知道！</a>
```

**常见属性：**

| 属性   | 值                                  | 描述                                                |
| :----- | :---------------------------------- | :-------------------------------------------------- |
| href   | URL                                 | 规定链接的目标 URL。                                |
| target | _blank _parent _self _top framename | 规定在何处打开目标 URL。 仅在 href 属性存在时使用。 |

### 3.4、图像标签

```html
<img src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" alt="百度LOGO">
```

### 3.5、表格标签

```html
<table border="1px" cellpadding="0px" cellspacing="0px">
    <tr>
        <th>表头一</th>
        <th>表头二</th>
        <th>表头三</th>
        <th>表头四</th>
    </tr>
    <tr>
        <td>单元格一</td>
        <td>单元格二</td>
        <td>单元格三</td>
        <td>单元格四</td>
    </tr>
</table>
```

### 3.6、列表标签

**无序列表：**

```html
<ul>
    <li>列表项</li>
    <li>列表项</li>
    <li>列表项</li>
    <li>列表项</li>
</ul>
```

**有序列表：**

```html
<ol>
    <li>列表项</li>
    <li>列表项</li>
    <li>列表项</li>
    <li>列表项</li>
</ol>
```

**自定义列表：**

```html
<dl>
    <dt>+</dt><dd>列表项</dd>
    <dt>+</dt><dd>列表项</dd>
    <dt>+</dt><dd>列表项</dd>
</dl>
```

### 3.7、分组标签

```html
<div>具体内容</div>
<span>具体内容</span>
```

### 3.8、语义标签

**常见标签：**

| 标签           | 描述                                               |
| :------------- | :------------------------------------------------- |
| `<header>`     | 规定文档或节的页眉。                               |
| `<footer>`     | 定义文档或节的页脚。                               |
| `<main>`       | 规定文档的主内容。                                 |
| `<section>`    | 定义文档的节。                                     |
| `<article>`    | 定义文档的文章。                                   |
| `<aside>`      | 定义页面内容以外的内容。                           |
| `<nav>`        | 定义导航链接。                                     |
| `<mark>`       | 定义重要的或强调的文本。                           |
| `<figure>`     | 规定自包含内容，比如图示、图表、照片、代码清单等。 |
| `<figcaption>` | 定义 `<figure> `元素的标题。                       |
| `<details>`    | 定义用户能够查看或隐藏的额外细节。                 |
| `<summary>`    | 定义 `<details>` 元素的可见标题。                  |
| `<time>`       | 定义日期/时间。                                    |

**基本布局：**

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/438a198f50ba388aa1fed83ff6bebb6d.png)

### 3.9、表单标签

**常见标签：**

| 标签         | 描述                                           |
| :----------- | :--------------------------------------------- |
| `<form>`     | 定义供用户输入的表单。                         |
| `<input>`    | 定义输入域。                                   |
| `<label>`    | 定义了 `<input> `元素的标签，一般为输入标题。  |
| `<textarea>` | 定义文本域 (一个多行的输入控件)。              |
| `<fieldset>` | 定义了一组相关的表单元素，并使用外框包含起来。 |
| `<legend>`   | 定义了 `<fieldset>` 元素的标题。               |
| `<select>`   | 定义了下拉选项列表。                           |
| `<optgroup>` | 定义选项组。                                   |
| `<option>`   | 定义下拉列表中的选项。                         |
| `<button>`   | 定义一个点击按钮。                             |
| `<datalist>` | 指定一个预先定义的输入控件选项列表。           |
| `<keygen>`   | 定义了表单的密钥对生成器字段。                 |
| `<output>`   | 定义一个计算结果。                             |

**案例演示：**

1、form、input、label演示

```html
<form action="" method="get">
    <p>
        <label for="username">账户：</label>
        <input type="text" name="username" id="username">
    </p>
    <p>
        <label for="password">密码：</label>
        <input type="password" name="password" id="password">
    </p>
    <p><input type="submit"></p>
</form>
```

2、textarea演示

```html
<form action="" method="post">
    <textarea name="mycontext" cols="30" rows="10"></textarea>
    <input type="submit">
</form>
```

3、fieldset、legend、select、optgroup、option演示

```html
<form action="" method="post">
    <fieldset>
        <legend>请选择你的爱好：</legend>

        <select name="myhobby" id="myhobby">
            <optgroup label="运动">
                <option value="篮球">篮球</option>
                <option value="足球">足球</option>
            </optgroup>
            <optgroup label="电子">
                <option value="看电影">看电影</option>
                <option value="看电视">看电视</option>
            </optgroup>
        </select>
    </fieldset>
</form>
```



4、datalist演示

```html
<form action="" method="post">
    <input list="browsers">
    <datalist id="browsers">
        <option value="Internet Explorer">
        <option value="Firefox">
        <option value="Chrome">
        <option value="Opera">
        <option value="Safari">
    </datalist>
</form>
```

5、单选框演示

```html
<form action="" method="post">
    <input type="radio" name="sex" id="male" value="male" checked>
    <label for="male">Male</label>

    <input type="radio" name="sex" id="female" value="female">
    <label for="female">female</label>
</form>
```



6、复选框演示

```
<form action="" method="post">
    <input type="checkbox" name="vehicle" id="bike" value="bike">
    <label for="bike">I have a bike</label>

    <input type="checkbox" name="vehicle" id="car" value="car">
    <label for="car">I have a car</label>
</form>
```



### 3.10、框架标签

```html
<iframe src="https://www.baidu.com" frameborder="0" width="500px" height="500px"></iframe>
```

### 3.11、音频标签

```html
<audio controls>
    <source src="horse.ogg" type="audio/ogg">
    <source src="horse.mp3" type="audio/mpeg">
    您的浏览器不支持 Audio 标签。
</audio>
```

### 3.12、视频标签

```html
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
    您的浏览器不支持 Video 标签。
</video>
```

### 3.13、其它标签

```html
水平线：<hr>
换行：<br>
<b>粗体文本</b>
<code>计算机代码</code>
<em>强调文本</em>
<i>斜体文本</i>
<kbd>键盘输入</kbd>
<pre>预格式化文本</pre>
<small>更小的文本</small>
<strong>重要的文本</strong>
<abbr>缩写词或者首字母缩略词</abbr>
<address>联系信息</address>
<bdo>文字方向</bdo>
<blockquote>从另一个源引用的部分</blockquote>
<cite>工作的名称</cite>
<del>删除的文本</del>
<ins>插入的文本</ins>
<sub>下标文本</sub>
<sup>上标文本</sup>
```

### 3.14、头部标签

| 标签       | 描述                                 |
| :--------- | :----------------------------------- |
| `<head>`   | 定义了文档的信息。                   |
| `<title>`  | 定义了文档的标题。                   |
| `<base>`   | 定义了页面链接标签的默认链接地址。   |
| `<link>`   | 定义了一个文档和外部资源之间的关系。 |
| `<meta>`   | 定义了HTML文档中的元数据。           |
| `<script>` | 定义了客户端的脚本文件。             |
| `<style>`  | 定义了HTML文档的样式文件。           |

## 第四章 HTML5属性

### 4.1、属性概述

HTML标签可以设置属性，属性总是以名称/值对的形式出现，比如：name=“value”，它的主要作用是控制或修饰标签。

### 4.2、通用属性

| 属性            | 描述                                                         |
| :-------------- | :----------------------------------------------------------- |
| accesskey       | 设置访问元素的键盘快捷键。                                   |
| class           | 规定元素的类名（classname）。                                |
| contenteditable | 规定是否可编辑元素的内容。                                   |
| contextmenu     | 指定一个元素的上下文菜单。当用户右击该元素，出现上下文菜单。 |
| data-*          | 用于存储页面的自定义数据。                                   |
| dir             | 设置元素中内容的文本方向。                                   |
| draggable       | 指定某个元素是否可以拖动。                                   |
| dropzone        | 指定是否将数据复制，移动，或链接，或删除。                   |
| hidden          | hidden 属性规定对元素进行隐藏。                              |
| id              | 规定元素的唯一 id。                                          |
| lang            | 设置元素中内容的语言代码。                                   |
| spellcheck      | 检测元素是否拼写错误。                                       |
| style           | 规定元素的行内样式（inline style）。                         |
| tabindex        | 设置元素的 Tab 键控制次序。                                  |
| title           | 规定元素的额外信息（可在工具提示中显示）。                   |
| translate       | 指定是否一个元素的值在页面载入时是否需要翻译。               |

## 第五章 HTML5事件

### 5.1、事件概述

HTML事件可以触发浏览器中的行为，比方说当用户点击某个 HTML 元素时启动一段 JavaScript。

### 5.2、窗口事件

由窗口触发该事件 (同样适用于 `<body>` 标签)：

| 属性           | 值     | 描述                                                         |
| :------------- | :----- | :----------------------------------------------------------- |
| onafterprint   | script | 在打印文档之后运行脚本。                                     |
| onbeforeprint  | script | 在文档打印之前运行脚本。                                     |
| onbeforeonload | script | 在文档加载之前运行脚本。                                     |
| onblur         | script | 当窗口失去焦点时运行脚本。                                   |
| onerror        | script | 当错误发生时运行脚本。                                       |
| onfocus        | script | 当窗口获得焦点时运行脚本。                                   |
| onhashchange   | script | 当文档改变时运行脚本。                                       |
| onload         | script | 当文档加载时运行脚本。                                       |
| onmessage      | script | 当触发消息时运行脚本。                                       |
| onoffline      | script | 当文档离线时运行脚本。                                       |
| ononline       | script | 当文档上线时运行脚本。                                       |
| onpagehide     | script | 当窗口隐藏时运行脚本。                                       |
| onpageshow     | script | 当窗口可见时运行脚本。                                       |
| onpopstate     | script | 当窗口历史记录改变时运行脚本。                               |
| onredo         | script | 当文档执行再执行操作（redo）时运行脚本。                     |
| onresize       | script | 当调整窗口大小时运行脚本。                                   |
| onstorage      | script | 当 Web Storage 区域更新时（存储空间中的数据发生变化时）运行脚本。 |
| onundo         | script | 当文档执行撤销时运行脚本。                                   |
| onunload       | script | 当用户离开文档时运行脚本。                                   |

### 5.3、表单事件

表单事件在HTML表单中触发 (适用于所有 HTML 元素，但该HTML元素需在form表单内)：

| 属性          | 值     | 描述                           |
| :------------ | :----- | :----------------------------- |
| onblur        | script | 当元素失去焦点时运行脚本。     |
| onchange      | script | 当元素改变时运行脚本。         |
| oncontextmenu | script | 当触发上下文菜单时运行脚本。   |
| onfocus       | script | 当元素获得焦点时运行脚本。     |
| onformchange  | script | 当表单改变时运行脚本。         |
| onforminput   | script | 当表单获得用户输入时运行脚本。 |
| oninput       | script | 当元素获得用户输入时运行脚本。 |
| oninvalid     | script | 当元素无效时运行脚本。         |
| onselect      | script | 当选取元素时运行脚本。         |
| onsubmit      | script | 当提交表单时运行脚本。         |

### 5.4、键盘事件

通过键盘触发事件，类似用户的行为：

| 属性       | 值     | 描述                         |
| :--------- | :----- | :--------------------------- |
| onkeydown  | script | 当按下按键时运行脚本。       |
| onkeypress | script | 当按下并松开按键时运行脚本。 |
| onkeyup    | script | 当松开按键时运行脚本。       |

### 5.5、鼠标事件

通过鼠标触发事件，类似用户的行为：

| 属性         | 值     | 描述                                     |
| :----------- | :----- | :--------------------------------------- |
| onclick      | script | 当单击鼠标时运行脚本                     |
| ondblclick   | script | 当双击鼠标时运行脚本                     |
| ondrag       | script | 当拖动元素时运行脚本                     |
| ondragend    | script | 当拖动操作结束时运行脚本                 |
| ondragenter  | script | 当元素被拖动至有效的拖放目标时运行脚本   |
| ondragleave  | script | 当元素离开有效拖放目标时运行脚本         |
| ondragover   | script | 当元素被拖动至有效拖放目标上方时运行脚本 |
| ondragstart  | script | 当拖动操作开始时运行脚本                 |
| ondrop       | script | 当被拖动元素正在被拖放时运行脚本         |
| onmousedown  | script | 当按下鼠标按钮时运行脚本                 |
| onmousemove  | script | 当鼠标指针移动时运行脚本                 |
| onmouseout   | script | 当鼠标指针移出元素时运行脚本             |
| onmouseover  | script | 当鼠标指针移至元素之上时运行脚本         |
| onmouseup    | script | 当松开鼠标按钮时运行脚本                 |
| onmousewheel | script | 当转动鼠标滚轮时运行脚本                 |
| onscroll     | script | 当滚动元素的滚动条时运行脚本             |

### 5.6、媒体事件

通过视频（videos），图像（images）或音频（audio） 触发该事件，多应用于HTML媒体元素比如：`<embed>`，`<object>`，`<img>`，`<audio>`和`<video>`。

| 属性               | 值     | 描述                                                         |
| :----------------- | :----- | :----------------------------------------------------------- |
| onabort            | script | 当发生中止事件时运行脚本。                                   |
| oncanplay          | script | 当媒介能够开始播放但可能因缓冲而需要停止时运行脚本。         |
| oncanplaythrough   | script | 当媒介能够无需因缓冲而停止即可播放至结尾时运行脚本。         |
| ondurationchange   | script | 当媒介长度改变时运行脚本。                                   |
| onemptied          | script | 当媒介资源元素突然为空时（网络错误、加载错误等）运行脚本。   |
| onended            | script | 当媒介已抵达结尾时运行脚本。                                 |
| onerror            | script | 当在元素加载期间发生错误时运行脚本。                         |
| onloadeddata       | script | 当加载媒介数据时运行脚本。                                   |
| onloadedmetadata   | script | 当媒介元素的持续时间以及其他媒介数据已加载时运行脚本。       |
| onloadstart        | script | 当浏览器开始加载媒介数据时运行脚本。                         |
| onpause            | script | 当媒介数据暂停时运行脚本。                                   |
| onplay             | script | 当媒介数据将要开始播放时运行脚本。                           |
| onplaying          | script | 当媒介数据已开始播放时运行脚本。                             |
| onprogress         | script | 当浏览器正在取媒介数据时运行脚本。                           |
| onratechange       | script | 当媒介数据的播放速率改变时运行脚本。                         |
| onreadystatechange | script | 当就绪状态（ready-state）改变时运行脚本。                    |
| onseeked           | script | 当媒介元素的定位属性不再为真且定位已结束时运行脚本。         |
| onseeking          | script | 当媒介元素的定位属性为真且定位已开始时运行脚本。             |
| onstalled          | script | 当取回媒介数据过程中（延迟）存在错误时运行脚本。             |
| onsuspend          | script | 当浏览器已在取媒介数据但在取回整个媒介文件之前停止时运行脚本。 |
| ontimeupdate       | script | 当媒介改变其播放位置时运行脚本。                             |
| onvolumechange     | script | 当媒介改变音量亦或当音量被设置为静音时运行脚本。             |
| onwaiting          | script | 当媒介已停止播放但打算继续播放时运行脚本。                   |

### 5.7、其它事件

| 属性     | 值     | 描述                                      |
| :------- | :----- | :---------------------------------------- |
| onshow   | script | 当 `<menu>` 元素在上下文显示时触发。      |
| ontoggle | script | 当用户打开或关闭` <details> `元素时触发。 |


————————————————
版权声明：本文为CSDN博主「轻松的小希」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_38490457/article/details/108672791