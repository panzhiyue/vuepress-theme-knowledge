# MarkDown编辑器之Typora

## 一、参考资料

官网: https://www.typora.io/ 

## 二、介绍Typora

Typora 是一款**支持实时预览的 Markdown 文本编辑器**。它有 OS X、Windows、Linux 三个平台的版本，并且由于仍在测试中，是**完全免费**的。

在这篇文章中，我希望以「Typora 是什么」这个问题为线索，向大家全面介绍这款令人爱不释手的笔记应用。



 **一个 Markdown 文本编辑器**

Typora 首先是一个 Markdown 文本编辑器，它支持且仅支持 Markdown 语法的文本编辑。在 [Typora 官网](https://typora.io/) 上他们将 Typora 描述为 「A truly **minimal** markdown editor. 」。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271014696.png)



## 三、使用Typora

### 3.1 自定义Markdown 语法风格

一个文本编辑器，**写得舒服**是关键。我曾说过，「更有趣的是，一个笔记应用不会因为它支持 Markdown 语法而高级或易用很多。」，细枝末节处的人性化考虑才是最重要的。而 Typora 的编辑体验显然是经过深思熟虑设计的产物。

我认为：一个优秀的笔记应用应该给用户**选择 Markdown 语法风格的权利**。而 Typora 在这一点上是我目前见过所有 Markdown 笔记应用中做得最好的。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271014764.jpeg)文本编辑设置

通过打开 `文件 - 偏好设置` 你会发现 Typora 为编辑体验的考虑细致到了令人叹为观止的程度。Typora 中提供了大量有关 Markdown 偏好的设置，据此，你可以构建一个几乎完全适合自己的 Markdown 编辑器。下面我将依次介绍一些与文本编辑体验有关的功能亮点。

#### 3.1.1 智能标点

我认为「智能标点」是比较有趣的一点。它可以自动帮你将不是很美观的直引号 `"` `'` 转化为更美观的弯引号 `“` `‘` `’` `”`。具体内容你可以在官方的 [这篇文档](http://support.typora.io/SmartyPants/) 中查看。关于直弯引号在 macOS 上如何输入你也可以看 [这篇文章](https://sspai.com/post/38342)。

#### 3.1.2 图片插入

Typora 的图片插入功能是广受好评的。要知道，Markdown 原生不太注重图片插入的功能，但你可以在 Typora 中：

- 直接使用 `右键 - 复制 Ctrl + V` 将网络图片、剪贴板图片复制到文档中
- 拖动本地图片到文档中

Typora 会自动帮你插入符合 Markdown 语法的图片语句，并给它加上标题。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271014771.png)

你也完全可以使用图床来保证文档在分享后图片仍能正常显示。

更强大的是，Typora 支持在拖动或 `Ctrl + V` 网络图片后自动将其保存到本地。你可以在 `文件 - 偏好设置 - 编辑器 - 图片插入` 中选择复制到哪个路径，什么情况下需要复制。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271014747.png)图片插入

这一功能保证了即使网络图片源失效了，你还有本地的备份可用。同时也能使你的文档文件夹更合理、完整。

#### 3.1.3 打字机模式和专注模式

**打字机模式」**使得你所编辑的那一行永远处于屏幕正中。

**「专注模式」**使你正在编辑的那一行保留颜色，而其他行的字体呈灰色。

你可以在 `视图 - 专注模式 / 打字机模式` 中勾选使用这两个模式。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271014033.gif)

#### 3.1.4 实时预览

我想很果断地下这个结论：到现在还不支持编辑界面实时预览的 Markdown 编辑器基本可以退出市场了。Typora 在这一方面显然已经领先了一大步——他们连 Markdown 语法的标记都在实时预览中消去了。当你离开正在编辑的有格式的文本段后，Typora 会自动隐藏 Markdown 标记，只留下**「所见即所得」**的美妙。*他们把这称为 Hybrid View。*

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271014743.gif)所见即所得

为了防止一些程序 bug 的发生（虽然在我使用下来感到是很少的）导致格式问题无法修改，Typora 保留了一个**「源代码模式」**。你可以通过 `视图 - 源代码模式` 或左下角的 `</>` 按钮进入。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271014045.gif)



#### 3.1.5 大纲 / 文件侧边栏

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271014173.png)侧边栏

Typora 会根据你 Markdown 标记的 H1、H2、H3…… 各级标题为你呈现一个大纲。

你也可以选择查看文件夹中的文件，但由于目前 Typora 只支持查看 md 文件，因此我认为文件侧边栏这个功能还是很鸡肋的。

#### 3.1.6 空格与换行

Typora 在空格与换行部分主要是使用 [CommonMark](http://www.commonmark.cn/w/) 作为标注规范。与前文提到的 GFM 一样，CommonMark 也是比较流行的 Markdown 语言规范（解析器）之一。

- **空格：**在输入连续的空格后，Typora 会在编辑器视图里为你保留这些空格，但当你打印或导出时，这些空格会被省略成一个。 
  你可以在源代码模式下，为每个空格前加一个 `\` 转义符，或者直接使用 HTML 风格的 `&nbps;` 来保持连续的空格。
- **软换行：**需要说明的是，在 Markdown 语法中，换行（line break）与换段是不同的。且换行分为软换行和硬换行。在 Typora 中，你可以通过 `Shift + Enter` 完成一次软换行。软换行只在编辑界面可见，当文档被导出时换行会被省略。
- **硬换行：**你可以通过 `空格 + 空格 + Shift + Enter` 完成一次硬换行，而这也是许多 Markdown 编辑器所原生支持的。硬换行在文档被导出时将被保留，且没有换段的段后距。
- **换段：**你可以通过 `Enter` 完成一次换段。Typora 会自动帮你完成两次 `Shift + Enter` 的软换行，从而完成一次换段。这也意味着在 Markdown 语法下，换段是通过在段与段之间加入空行来实现的。
- **Windows 风格（CR+LF）与 Unix 风格（CR）的换行符：**CR 表示回车 `\r` ，即回到一行的开头，而 LF 表示换行 `\n` ，即另起一行。 
  所以 Windows 风格的换行符本质是「回车 + 换行」，而 Unix 风格的换行符是「换行」。这也是为什么 Unix / Mac 系统下的文件，如果在 Windows 系统直接打开会全部在同一行内。 你可以在 `文件 - 偏好设置 - 编辑器 - 默认换行符` 中对此进行切换。

下附以上各空格、换行、换段的测试结果图。具体内容你可以在官网的 [这篇文档](http://support.typora.io/Line-Break/) 中查阅。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271014474.png)

#### 3.1.7 emoji 表情

如今 emoji 表情越来越多地出现在一些网站文章中，但在桌面端（特别是 Windows 系统）文本编辑器上插入 emoji 是一件十分麻烦的事情。在使用 Typora 之前，我打出 emoji 表情的办法基本有两个：

1. **输入法联想：**优点是比较方便，但会插入一张图片而不是一个字符，在许多情景下都不是很合适。 
2. **复制 emoji 符号：**优点是能保证符号的形式，但显然每次用都需要去复制，比较麻烦。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271014623.png)输入法联想

在 Typora 中，你可以用 `:emoji:` 的形式来打出 emoji，软件会自动给出图形的提示，还是比较好用的。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271014428.png)Typora 中输入 emoji

### 3.2 一个学术文档编辑器

除了基本的文本编辑体验极佳之外，Typora 还是一个非常优秀的学术文档编辑器。当然作为一个轻量级的、基于 Markdown 的编辑器，它不能与那些 LaTeX 编辑器相提并论，但它仍支持了许多可用于学术写作的功能。

#### 3.2.1 LaTeX

> LaTeX 是一种基于 TeX 的排版系统，由于它易于快速生成复杂表格和数学公式，非常适用于生成高印刷质量的科技和数学类文档。如果你常阅读数学、计算机等领域的学术论文，你一定对 LaTeX 不陌生。

Typora 原生支持 LaTeX 语法，你有两种方式输入 LaTeX 风格的数学公式：

1. **行内公式（inline）：**用 `$...$` 括起公式，公式会出现在行内。
2. **块间公式（display）：**用 `$$...$$` 括起公式（注意 `$$` 后需要换行），公式会默认显示在行中间。

具体的 LaTeX 语法在此不赘述了，你可以在 [这篇文章](https://blog.csdn.net/happyday_d/article/details/83715440) 中查看。

#### 3.2.2 代码高亮

Typora 中代码的插入也可以分为行内和块间两种：

1. 行内代码：用 ``...`` 或 ```...``` 括起代码，代码会以主题中设置的样式出现在行内，但不会实现代码高亮。
2. 代码块：输入 ````` 后并输入语言名，换行，开始写代码，Typora 就会自动帮你实现代码高亮。Typora 原生支持许多编程语言代码块的语法高亮，基本日常常用的编程语言它都能很好地支持。 
   除此以外，你也可以直接换行开始写，而后再选择语言。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271014579.png)

#### 3.2.3 表格

在 Markdown 中插入表格一直是一件比较头疼的事情。在一般的 Markdown 编辑器中，你可以通过以下的格式插入表格：

```
| 左对齐 | 右对齐 | 居中对齐 |
| :-----| ----: | :----: |
| 单元格 | 单元格 | 单元格 |
| 单元格 | 单元格 | 单元格 |
```

乍一看还挺直观好用的是吧？但想想，一旦表格内容层次不齐，又或是表格长得难以下手，直接用键盘输入表格就显得十分麻烦和痛苦了。

好在 Typora 为我们提供了图形界面的插入表格的功能，你只需要在行内 `鼠标右键 - 插入 - 表格` ，并输入行数和列数，Typora 就会自动生成一张样式不错的空表格。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271014510.png)

#### 3.2.4 链接引用与脚注

**链接引用**类似于我们常在论文末尾看到的「参考文献」的写法，你可以通过 `[]:` 的语法来为你的文档加上链接引用。

**脚注**在少数派的文章中也很常见，即某段话结尾右上角标有数字标记，页面底部进行注释的写法。你可以在需要插入脚注标号的位置写 `[^ number ]` ，再在下方通过 `[^ number ]:` 在文档中插入脚注。注意不要遗漏了脚注编号 `number` 前后的空格。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271014937.png)

#### 3.2.5 文件系统

除了前文提到的文件侧边栏，Typora 还提供了一些耦合度不高的文件系统。

- **快速打开：**你可以通过 `文件 - 快速打开...` 或 `Ctrl + P` 快捷键快速打开最近的文档。
- **保存：**Typora 支持自动保存，一般很少有写好的文档丢失的情况。同时它也提供了诸如「保存」、「另存为」、「保存全部打开的文件...」之类的功能。
- **导入：**Typora 支持非常多的文件格式：.docx, .latex, .tex, .ltx, .rst, .rest, .org, .wiki, .dokuwiki, .textile, .opml, .epub。
- **导出：**Typora 原生支持导出 PDF，HTML等格式。你可以根据软件内提示安装 **Pandoc 插件**来导出更多例如 docx，LaTeX 等格式。 

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271014990.png)



### 3.3 浏览器

当我的一个朋友问我「Typora 有什么好写的？」时，我回答「Typora 是一个伪装成文本编辑器的浏览器」。是的，事实上如果你有一定的计算机基础，你可以找到许多有关于「Typora 其实是一个浏览器」的蛛丝马迹。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271014963.png)图片插入

在图片插入的选项中，Typora 用了「复制图片到 ./${filename}.assets 文件夹」的说法，而这其实是网页前端常用的 Javascript 字符串模板语法的风格。

再比如，Typora 将更遵循 GFM 标准的 Markdown 语法模式称为「严格模式 Strict Mode」，这一说法常见于 HTML 和 JavaScript 编程中。类似「源代码模式」的说法也是同理。

当然，最明显的一点是当你按下 `Shift + F12` 快捷键时，页面会弹出一个基于 Chrome 的开发者工具栏，也就是我们在浏览器中常说的「审查元素」。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271014283.png)审查元素

**伪装从何而来**？

当我们把视角放在「Typora 是一个支持 Markdown 语言的文本编辑器」的出发点来考虑这个问题，一切就都显得很明白了。

John Gruber 在 2004 年用 Perl 创造了 Markdown 语言，这个语言的目的是希望大家使用「易于阅读、易于撰写的纯文字格式，并选择性的转换成有效的 XHTML（或是 HTML）」。也就是说，**在 Markdown 诞生之初，它就是为了被浏览器阅读而设计的。**

我们在用 Markdown 语言撰写文稿的时候，其实本质上是在借助某种编程语言的转化（解析器）来编写一个 HTML 网页。Markdown 从它诞生之初就与 Web 技术有着及其紧密的联系。

如果我说，我们每一篇文稿都是一个网页，那就很好理解了。Typora 利用解析器先将我们写的 Markdown 文档解析成为 HTML 文档，再为它嵌入一个 CSS 样式，最后再加上可能需要的脚本等。

#### 3.3.1 HTML写法

HTML 是一种标记语言，主要负责构成网页的骨架，它包含所有不加装饰的网页元素。在 Typora 的使用场景下则是所有的**文本、段落、标题等**的记号。

你可以把一张网页想象成一幅数字油画，HTML 就是那个黑白线条的底，上面写满了数字标记，示意你哪一块区域要涂什么颜色。而 CSS 则负责在对应的区域涂上颜色，甚至加上一些装饰等。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271014317.jpeg)数字油画

 **HTML 标签**

Typora 支持许多常用的 HTML 标签，如果你了解 HTML 语法的话，你可以写出十分美观丰富的文档页面。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271014471.png)HTML 标签

事实上你可以在 Typora 中完成许多基本的 HTML 风格的文本输入，例如 HTML 字符、HTML 块、HTML 风格的注释，甚至是视频和音频。具体支持的功能和限制请在 [官方文档](http://support.typora.io/HTML/) 中查阅。

有了这一功能，我们就可以在 Typora 中创造出远超普通 Markdown 文档的页面效果。

#### 3.3.2导出为HTML

Typora 原生支持将文档导出为 HTML 格式的文件，并选择是否要嵌入 style（也就是后文我将提到的 CSS 的部分）。

除此之外，由于其本身「浏览器」的属性，你可以直接在实时预览界面用 `Ctrl +C` 复制到 HTML 代码。一个实用的用处是将这些 HTML 代码直接 `Ctrl + V` 黏贴到微信公众号后台，基本可以保证两边显示效果相同。这一点不仅使公众号推送可以有更自由、美观的样式，也让编辑、排版更轻松了。（由于微信自带浏览器的一些特性，可能有少部分 CSS style 不能生效，建议多多校对。）

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271014234.png)公众号

具体如何用 Typora 完成公众号写作，你可以在 [这篇文章](https://sspai.com/post/40524) 中进一步了解。

#### 3.3.3 主题(css)

更多主题上[官网](http://theme.typora.io/)查询

为了让文档更美观，我们可以为其加上 CSS style。我认为 Typora 对 CSS 的支持让它成为一众桌面笔记应用中最与众不同的一个。在 Typora 中 CSS 被称为「主题」，但其本质仍是 CSS 文件。你可以在 `文件 - 偏好设置 - 主题 - 打开主题文件夹` 看到这些 CSS 文件。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271014599.png)主题

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271014581.png)

选择不同的主题可以使文档拥有不同的外观，但不会影响内容。Typora 自带了若干主题，你也可以在 [官网](http://theme.typora.io/) 下载更多的主题。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271014094.png)

除此以外，如果你有一定的 Web 编程基础，你当然也可以自己修改、新建适合你使用需求的 CSS 文件。我自己就写了一份名为 WeChat 的 CSS 文件，来符合我公众号特定的排版需求，例如正文是 15px，页边距是 8，小标题是 18px 等等。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271014336.png)

使用 Typora 的「主题」功能写公众号的一个好处是，只需要每次都套用同样的主题，我们就可以在保证每次排版规范都相同的同时，节省许多重复的工作。

##### 3.3.4.1 简书主题示例



```css
:root {
    background: #f9f9f9;
    --side-bar-bg-color: #fff;
    --control-text-color: #666;
    --code-block-bg-color: yellow !important;
}

html {
    font-size: 14px;
}

body {
    margin: 0;
    color: rgba(0, 0, 0, 0.9);
    font-size: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    line-height: 1.5;
    -webkit-font-feature-settings: "tnum", "tnum";
    font-feature-settings: "tnum", "tnum"
}

#write {
    max-width: 860px;
    margin: 0 auto;
    padding: 20px 30px 100px;
    background: #fff;
    /* box-shadow: 0px 20px 10px #ccc; */
}

#write p {
    line-height: 1.5rem;
    word-spacing: 0.05rem;
}

#write ol li {
    text-indent: 0.5rem;
}

#write>ul:first-child,
#write>ol:first-child {
    margin-top: 30px;
}

body>*:first-child {
    margin-top: 0 !important;
}

body>*:last-child {
    margin-bottom: 0 !important;
}

a { color: #42b983; font-weight: 600; padding: 0 2px; text-decoration: none; }

h1,
h2,
h3,
h4,
h5,
h6 {
    position: relative;
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-weight: bold;
    line-height: 1.4;
    cursor: text;
}

h1:hover a.anchor,
h2:hover a.anchor,
h3:hover a.anchor,
h4:hover a.anchor,
h5:hover a.anchor,
h6:hover a.anchor {
    text-decoration: none;
}

h1 tt,
h2 tt,
h3 tt,
h4 tt,
h5 tt,
h6 tt,
h1 code,
h2 code,
h3 code,
h4 code,
h5 code,
h6 code {
    font-size: inherit !important;
}

h2 a,
h3 a {
    color: #34495e;
}

h1 { font-size: 2.2rem; line-height: 1.3; padding-bottom: 0.4rem; }
h2 { font-size: 1.75rem; line-height: 1.225; margin: 35px 0 15px; padding-bottom: 0.5em; border-bottom: 1px solid #ddd; }
h3 { font-size: 1.4rem; line-height: 1.43; margin: 20px 0 7px; }
h4 { font-size: 1.2rem; }
h5 { font-size: 1rem; }
h6 { font-size: 1rem; color: #777; }

p,
blockquote,
ul,
ol,
dl,
table {
    margin: 0.8em 0;
}

li>ol,
li>ul {
    margin: 0 0;
}

hr {
    height: 2px;
    padding: 0;
    margin: 16px 0;
    background-color: #e7e7e7;
    border: 0 none;
    overflow: hidden;
    box-sizing: content-box;
}

body>h2:first-child {
    margin-top: 0;
    padding-top: 0;
}

body>h1:first-child {
    margin-top: 0;
    padding-top: 0;
}

body>h1:first-child+h2 {
    margin-top: 0;
    padding-top: 0;
}

body>h3:first-child,
body>h4:first-child,
body>h5:first-child,
body>h6:first-child {
    margin-top: 0;
    padding-top: 0;
}

a:first-child h1,
a:first-child h2,
a:first-child h3,
a:first-child h4,
a:first-child h5,
a:first-child h6 {
    margin-top: 0;
    padding-top: 0;
}

h1 p,
h2 p,
h3 p,
h4 p,
h5 p,
h6 p {
    margin-top: 0;
}

li p.first {
    display: inline-block;
}

ul,
ol {
    padding-left: 30px;
}

ul:first-child,
ol:first-child {
    margin-top: 0;
}

ul:last-child,
ol:last-child {
    margin-bottom: 0;
}

blockquote {
    border-left: 5px solid #e6e6e6;
    padding: 10px 15px;
    color: #666;
    background-color: #fafafa;
}

table {
    padding: 0;
    word-break: initial;
}

table tr {
    border-top: 1px solid #dfe2e5;
    margin: 0;
    padding: 0;
}

table tr:nth-child(2n),
thead {
    background-color: #fafafa;
}

table tr th {
    font-weight: bold;
    border: 1px solid #dfe2e5;
    border-bottom: 0;
    text-align: left;
    margin: 0;
    padding: 6px 13px;
}

table tr td {
    border: 1px solid #dfe2e5;
    text-align: left;
    margin: 0;
    padding: 6px 13px;
}

table tr th:first-child,
table tr td:first-child {
    margin-top: 0;
}

table tr th:last-child,
table tr td:last-child {
    margin-bottom: 0;
}

#write strong {
    padding: 0 1px;
}

#write em {
    padding: 0 5px 0 2px;
}

#write table thead th {
    background-color: #f2f2f2;
}

#write .CodeMirror-gutters {
    border-right: none;
}

/* 代码块框 */
#write .md-fences {
    -webkit-font-smoothing: initial;
    margin: 0.8rem 0 !important;
    /* padding: 0.5rem 0 !important; */
    padding: 0.5rem 13px !important;
    line-height: 1.43rem;
    background-color: #2d2d2d !important;
    border-radius: 3px;
    font-family: Consolas, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 0.95rem;
    word-wrap: normal;
    color: #999;
}


/* 代码块 */
#write .CodeMirror-wrap .CodeMirror-code pre {
    /* padding-left: 13px; */
    color: #999;
    /* font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace; */
    font-family: Consolas, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; */
}


/* 打印块 */
#write code,
tt {
    margin: 0 2px;
    padding: 2px 4px;
    border-radius: 2px;
    font-size: 14px;
    color: #e96900;
    background-color: #f8f8f8;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#write .md-footnote {
    background-color: #f8f8f8;
    color: #e96900;
}


/* heighlight 高亮部分 */

#write mark {
    background-color: #EBFFEB;
    border-radius: 2px;
    padding: 2px 4px;
    margin: 0 2px;
    color: #222;
    font-weight: 500;
}

#write del {
    padding: 1px 2px;
} 

/* 光标 */
.cm-s-inner .CodeMirror-cursor { border-left: 1px solid #00FF00 !important; }

/* 链接 */
.cm-s-inner .cm-link, .cm-s-inner.cm-link { color: #22a2c9; }


/* HTML标签 */
.cm-s-inner .cm-tag { color: #e2777a; }

/* HTML标签属性 */
.cm-s-inner .cm-attribute { color: #e2777a; }


/* CSS变量 */
.cm-s-inner .cm-variable-3 { color: #eee; }

/* CSS 属性 */
.cm-s-inner .cm-property { color: #f8c555; }

/* CSS选择器 */
.cm-s-inner .cm-qualifier { color: #cc99cd !important; }


/* 代码块里面JS字体 */
.cm-s-inner .cm-variable { color: #eee; }

/* JS变量 */
.cm-s-inner .cm-variable-2 { color: #eee; }

/* JS字符串 */
.cm-s-inner .cm-string { color: #7ec699; }

/* .cm-s-inner .cm-string-2 { color: yellow !important; } */

/* JS数字 */
.cm-s-inner .cm-number { color: #f08d49; }

/* JS保留字, JS声明的变量名、方法名 */
.cm-s-inner .cm-def { color: #eee; }

/* JS属性, 对象属性、log */
.cm-s-inner .cm-property { color:#f08d49; }

/* JS关键词, 如function、var、let、const、return */
.cm-s-inner .cm-keyword { color: #cc99cd; }

/* JS关键字 比如：true、false、null、undefined、NaN */
.cm-s-inner .cm-atom { color: #cc99cd; }

/* JS运算符 */
.cm-s-inner .cm-operator { color: #67cdcc; }

/* JS关键字，如ES6 (...)扩展运算符 */
.cm-s-inner .cm-meta { color: #67cdcc; }

/* JS注释 */
.cm-s-inner .cm-comment { color: #999; }



/* window保留字, 如console */
.cm-s-inner .cm-variable { color: #eee; }

/* 暂时未知 */
.cm-s-inner .cm-builtin { color: pink !important; }


/* HTML错误提示 */
/* .cm-s-inner .cm-error {
    color: rgba(255, 255, 255, 1.0);
    background-color: #EC5F67;
} */


/* 系统命令行命令关键字 0*/
.cm-s-inner .cm-builtin { color: #BA55D3 !important; }

.md-task-list-item>input {
    margin-left: -1.3em;
}

@media print {
    html {
        font-size: 13px;
    }
    table,
    pre {
        page-break-inside: avoid;
    }
    pre {
        word-wrap: break-word;
    }
}

/* 代码块右下角选择语言区域 */
.md-fences {
    background-color: #f8f8f8;
}
/* 代码块右下角选择语言区域 */
.md-fences .code-tooltip {
  color: #eee;
}

/* 代码块选中文字背景 */

/* .cm-s-inner div.CodeMirror-selected { background-color: #1099ff !important; } */

/* .cm-s-inner.CodeMirror-focused div.CodeMirror-selected { background-color: #1099ff; } */

#write pre.md-meta-block {
    padding: 1rem;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f7f7f7;
    border: 0;
    border-radius: 3px;
    color: #777777;
    margin-top: 0 !important;
}

.mathjax-block>.code-tooltip {
    bottom: .375rem;
}

#write>h3.md-focus:before {
    left: -1.5625rem;
    top: .375rem;
}

#write>h4.md-focus:before {
    left: -1.5625rem;
    top: .285714286rem;
}

#write>h5.md-focus:before {
    left: -1.5625rem;
    top: .285714286rem;
}

#write>h6.md-focus:before {
    left: -1.5625rem;
    top: .285714286rem;
}

.md-image>.md-meta {
    border-radius: 3px;
    font-family: Consolas, "Liberation Mono", Courier, monospace;
    padding: 2px 0 0 4px;
    font-size: 0.9em;
    color: inherit;
}

.md-tag {
    color: inherit;
}

.md-toc {
    margin-top: 20px;
    padding-bottom: 20px;
}

.sidebar-tabs {
    border-bottom: none;
}

#typora-quick-open {
    border: 1px solid #ddd;
    background-color: #f8f8f8;
}

#typora-quick-open-item {
    background-color: #FAFAFA;
    border-color: #FEFEFE #e5e5e5 #e5e5e5 #eee;
    border-style: solid;
    border-width: 1px;
}

#md-notification:before {
    top: 10px;
}


/** focus mode */

.on-focus-mode blockquote {
    border-left-color: rgba(85, 85, 85, 0.12);
}


/* 侧边栏 */
header,
.context-menu,
.megamenu-content,
footer {
    font-family: "Segoe UI", "Arial", sans-serif;
}

.file-node-content:hover .file-node-icon,
.file-node-content:hover .file-node-open-state {
    visibility: visible;
}

.mac-seamless-mode #typora-sidebar {
    background-color: var(--side-bar-bg-color);
}

.md-lang {
    color: #b4654d;
}

.html-for-mac .context-menu {
    --item-hover-bg-color: #E6F0FE;
}
```



#### 3.3.4 YAML front-matter

Typora 支持在文档头部加上基于 YAML 的 front-matter 信息，这一特性适用于把 Markdown 文档分类归档上传到用 Hexo 框架搭建的博客中。我对于这一点不太了解，这里就不误导大家了。有所了解的朋友可以在评论区谈谈！



### 3.4快捷键



#### 3.4.1 菜单栏

- 文件：alt+F
- 编辑：alt+E
- 段落：alt+P
- 格式：alt+O
- 视图：alt+V
- 主题：alt+T
- 帮助：alt+H

#### 3.4.2 文件

- 新建：Ctrl+N
- 新建窗口：Ctrl+Shift+N
- 打开：Ctrl+O
- 快速打开：Ctrl+P
- 保存：Ctrl+S
- 另存为：Ctrl+Shift+S
- 偏好：Ctrl+,
- 关闭：Ctrl+W

#### 3.4.3 编辑

- 撤销：Ctrl+Z
- 重做：Ctrl+Y
- 剪切：Ctrl+X
- 复制：Ctrl+C
- 粘贴：Ctrl+V
- 复制为MarkDown：Ctrl+Shift+C
- 粘贴为纯文本：Ctrl+Shift+V
- 全选：Ctrl+A
- 选中当前行/句：Ctrl+L
- 选中当前格式文本：Ctrl+E
- 选中当前词：Ctrl+D
- 跳转到文首：Ctrl+Home
- 跳转到所选内容：Ctrl+J
- 跳转到文末：Ctrl+End
- 查找：Ctrl+F
- 查找下一个：F3
- 查找上一个：Shift+F3
- 替换：Ctrl+H

#### 3.4.4 段落

- 标题：Ctrl+1/2/3/4/5
- 段落：Ctrl+0
- 增大标题级别：Ctrl+=
- 减少标题级别：Ctrl+-
- 表格：Ctrl+T
- 代码块：Ctrl+Shift+K
- 公式块：Ctrl+Shift+M
- 引用：Ctrl+Shift+Q
- 有序列表：Ctrl+Shift+[
- 无序列表：Ctrl+Shift+]
- 增加缩进：Ctrl+]
- 减少缩进：Ctrl+[

#### 3.4.5 格式

- 加粗：Ctrl+B
- 斜体：Ctrl+I
- 下划线：Ctrl+U
- 代码：Ctrl+Shift+`
- 删除线：Alt+Shift+5
- 超链接：Ctrl+K
- 图像：Ctrl+Shift+I
- 清除样式：Ctrl+

#### 3.4.6 视图

- 显示隐藏侧边栏：Ctrl+Shift+L

- 大纲视图：Ctrl+Shift+1

- 文档列表视图：Ctrl+Shift+2

- 文件树视图：Ctrl+Shift+3

- 源代码模式：Ctrl+/

- 专注模式：F8

- 打字机模式：F9

- 切换全屏：F11

- 实际大小：Ctrl+Shift+0

- 放大：Ctrl+Shift+=

- 缩小：Ctrl+Shift+-

- 应用内窗口切换：Ctrl+Tab

- 打开DevTools：Shift+F12

  

## 四、插件

### 4.1.Pandoc

导入导出部分功能需要用到Pandoc（例如导出为word）

（1）下载

github:https://github.com/jgm/pandoc

百度网盘:https://pan.baidu.com/s/1vJB08u_Wbak7NvDxVLoDRg   提取码:3oi7

（2）安装

直接双击安装就行了

（3）使用

需要重新启动typora

## 参考

[Typora 完全使用详解](Typora 完全使用详解)