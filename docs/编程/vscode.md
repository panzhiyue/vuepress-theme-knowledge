# VSCode

## 快捷键



https://blog.csdn.net/hypon2016/article/details/80831266

| 按 Press             | 功能 Function                       |
| :------------------- | :---------------------------------- |
| Ctrl + Shift + P，F1 | 显示命令面板 Show Command Palette   |
| Ctrl + P             | 快速打开 Quick Open                 |
| Ctrl + Shift + N     | 新窗口/实例 New window/instance     |
| Ctrl + Shift + W     | 关闭窗口/实例 Close window/instance |

### 基础编辑 Basic editing

| 按 Press          | 功能 Function                                               |
| :---------------- | :---------------------------------------------------------- |
| Ctrl+X            | 剪切行（空选定） Cut line (empty selection)                 |
| Ctrl+C            | 复制行（空选定）Copy line (empty selection)                 |
| Alt+ ↑ / ↓        | 向上/向下移动行 Move line up/down                           |
| Shift+Alt + ↓ / ↑ | 向上/向下复制行 Copy line up/down                           |
| Ctrl+Shift+K      | 删除行 Delete line                                          |
| Ctrl+Enter        | 在下面插入行 Insert line below                              |
| Ctrl+Shift+Enter  | 在上面插入行 Insert line above                              |
| Ctrl+Shift+\      | 跳到匹配的括号 Jump to matching bracket                     |
| Ctrl+] / [        | 缩进/缩进行 Indent/outdent line                             |
| Home              | 转到行首 Go to beginning of line                            |
| End               | 转到行尾 Go to end of line                                  |
| Ctrl+Home         | 转到文件开头 Go to beginning of file                        |
| Ctrl+End          | 转到文件末尾 Go to end of file                              |
| Ctrl+↑ / ↓        | 向上/向下滚动行 Scroll line up/down                         |
| Alt+PgUp / PgDown | 向上/向下滚动页面 Scroll page up/down                       |
| Ctrl+Shift+[      | 折叠（折叠）区域 Fold (collapse) region                     |
| Ctrl+Shift+]      | 展开（未折叠）区域 Unfold (uncollapse) region               |
| Ctrl+K Ctrl+[     | 折叠（未折叠）所有子区域 Fold (collapse) all subregions     |
| Ctrl+K Ctrl+]     | 展开（未折叠）所有子区域 Unfold (uncollapse) all subregions |
| Ctrl+K Ctrl+0     | 折叠（折叠）所有区域 Fold (collapse) all regions            |
| Ctrl+K Ctrl+J     | 展开（未折叠）所有区域 Unfold (uncollapse) all regions      |
| Ctrl+K Ctrl+C     | 添加行注释 Add line comment                                 |
| Ctrl+K Ctrl+U     | 删除行注释 Remove line comment                              |
| Ctrl+/            | 切换行注释 Toggle line comment                              |
| Shift+Alt+A       | 切换块注释 Toggle block comment                             |
| Alt+Z             | 切换换行 Toggle word wrap                                   |

### 导航 Navigation

| 按 Press           | 功能 Function                                        |
| :----------------- | :--------------------------------------------------- |
| Ctrl + T           | 显示所有符号 Show all Symbols                        |
| Ctrl + G           | 转到行... Go to Line...                              |
| Ctrl + P           | 转到文件... Go to File...                            |
| Ctrl + Shift + O   | 转到符号... Go to Symbol...                          |
| Ctrl + Shift + M   | 显示问题面板 Show Problems panel                     |
| F8                 | 转到下一个错误或警告 Go to next error or warning     |
| Shift + F8         | 转到上一个错误或警告 Go to previous error or warning |
| Ctrl + Shift + Tab | 导航编辑器组历史记录 Navigate editor group history   |
| Alt + ←/→          | 返回/前进 Go back / forward                          |
| Ctrl + M           | 切换选项卡移动焦点 Toggle Tab moves focus            |

### 搜索和替换 Search and replace

| 按 Press          | 功能 Function                                                |
| :---------------- | :----------------------------------------------------------- |
| Ctrl + F          | 查找 Find                                                    |
| Ctrl + H          | 替换 Replace                                                 |
| F3 / Shift + F3   | 查找下一个/上一个 Find next/previous                         |
| Alt + Enter       | 选择查找匹配的所有出现 Select all occurences of Find match   |
| Ctrl + D          | 将选择添加到下一个查找匹配 Add selection to next Find match  |
| Ctrl + K Ctrl + D | 将最后一个选择移至下一个查找匹配项 Move last selection to next Find match |
| Alt + C / R / W   | 切换区分大小写/正则表达式/整个词 Toggle case-sensitive / regex / whole word |

### 多光标和选择 Multi-cursor and selection

| 按 Press                           | 功能 Function                                                |
| :--------------------------------- | :----------------------------------------------------------- |
| Alt +单击                          | 插入光标 Insert cursor                                       |
| Ctrl + Alt +↑/↓                    | 在上/下插入光标 Insert cursor above / below                  |
| Ctrl + U                           | 撤消上一个光标操作 Undo last cursor operation                |
| Shift + Alt + I                    | 在选定的每一行的末尾插入光标 Insert cursor at end of each line selected |
| Ctrl + I                           | 选择当前行 Select current line                               |
| Ctrl + Shift + L                   | 选择当前选择的所有出现 Select all occurrences of current selection |
| Ctrl + F2                          | 选择当前字的所有出现 Select all occurrences of current word  |
| Shift + Alt + →                    | 展开选择 Expand selection                                    |
| Shift + Alt + ←                    | 缩小选择 Shrink selection                                    |
| Shift + Alt + （拖动鼠标）         | 列（框）选择 Column (box) selection                          |
| Ctrl + Shift + Alt +（箭头键）     | 列（框）选择 Column (box) selection                          |
| Ctrl + Shift + Alt + PgUp / PgDown | 列（框）选择页上/下 Column (box) selection page up/down      |

### 丰富的语言编辑 Rich languages editing

| 按 Press             | 功能 Function                                          |
| :------------------- | :----------------------------------------------------- |
| Ctrl + 空格          | 触发建议 Trigger suggestion                            |
| Ctrl + Shift + Space | 触发器参数提示 Trigger parameter hints                 |
| Tab                  | Emmet 展开缩写 Emmet expand abbreviation               |
| Shift + Alt + F      | 格式化文档 Format document                             |
| Ctrl + K Ctrl + F    | 格式选定区域 Format selection                          |
| F12                  | 转到定义 Go to Definition                              |
| Alt + F12            | Peek定义 Peek Definition                               |
| Ctrl + K F12         | 打开定义到边 Open Definition to the side               |
| Ctrl + .             | 快速解决 Quick Fix                                     |
| Shift + F12          | 显示引用 Show References                               |
| F2                   | 重命名符号 Rename Symbol                               |
| Ctrl + Shift + . /， | 替换为下一个/上一个值 Replace with next/previous value |
| Ctrl + K Ctrl + X    | 修剪尾随空格 Trim trailing whitespace                  |
| Ctrl + K M           | 更改文件语言 Change file language                      |

### 编辑器管理 Editor management

| 按 Press                 | 功能 Function                                                |
| :----------------------- | :----------------------------------------------------------- |
| Ctrl+F4, Ctrl+W          | 关闭编辑器 Close editor                                      |
| Ctrl+K F                 | 关闭文件夹 Close folder                                      |
| Ctrl+\                   | 拆分编辑器 Split editor                                      |
| Ctrl+ 1 / 2 / 3          | 聚焦到第1，第2或第3编辑器组 Focus into 1st, 2nd or 3rd editor group |
| Ctrl+K Ctrl+ ←/→         | 聚焦到上一个/下一个编辑器组 Focus into previous/next editor group |
| Ctrl+Shift+PgUp / PgDown | 向左/向右移动编辑器 Move editor left/right                   |
| Ctrl+K ← / →             | 移动活动编辑器组 Move active editor group                    |

### 文件管理 File management

| 按 Press       | 功能 Function                                                |
| :------------- | :----------------------------------------------------------- |
| Ctrl+N         | 新文件 New File                                              |
| Ctrl+O         | 打开文件... Open File...                                     |
| Ctrl+S         | 保存 Save                                                    |
| Ctrl+Shift+S   | 另存为... Save As...                                         |
| Ctrl+K S       | 全部保存 Save All                                            |
| Ctrl+F4        | 关闭 Close                                                   |
| Ctrl+K Ctrl+W  | 关闭所有 Close All                                           |
| Ctrl+Shift+T   | 重新打开关闭的编辑器 Reopen closed editor                    |
| Ctrl+K         | 输入保持打开 Enter Keep Open                                 |
| Ctrl+Tab       | 打开下一个 Open next                                         |
| Ctrl+Shift+Tab | 打开上一个 Open previous                                     |
| Ctrl+K P       | 复制活动文件的路径 Copy path of active file                  |
| Ctrl+K R       | 显示资源管理器中的活动文件 Reveal active file in Explorer    |
| Ctrl+K O       | 显示新窗口/实例中的活动文件 Show active file in new window/instance |

### 显示 Display

| 按 Press     | 功能 Function                                            |
| :----------- | :------------------------------------------------------- |
| F11          | 切换全屏 Toggle full screen                              |
| Shift+Alt+1  | 切换编辑器布局 Toggle editor layout                      |
| Ctrl+ = / -  | 放大/缩小 Zoom in/out                                    |
| Ctrl+B       | 切换侧栏可见性 Toggle Sidebar visibility                 |
| Ctrl+Shift+E | 显示浏览器/切换焦点 Show Explorer / Toggle focus         |
| Ctrl+Shift+F | 显示搜索 Show Search                                     |
| Ctrl+Shift+G | 显示Git Show Git                                         |
| Ctrl+Shift+D | 显示调试 Show Debug                                      |
| Ctrl+Shift+X | 显示扩展 Show Extensions                                 |
| Ctrl+Shift+H | 替换文件 Replace in files                                |
| Ctrl+Shift+J | 切换搜索详细信息 Toggle Search details                   |
| Ctrl+Shift+C | 打开新命令提示符/终端 Open new command prompt/terminal   |
| Ctrl+Shift+U | 显示输出面板 Show Output panel                           |
| Ctrl+Shift+V | 切换Markdown预览 Toggle Markdown preview                 |
| Ctrl+K V     | 从旁边打开Markdown预览 Open Markdown preview to the side |

### 调试 Debug

| 按 Press        | 功能 Function               |
| :-------------- | :-------------------------- |
| F9              | 切换断点 Toggle breakpoint  |
| F5              | 开始/继续 Start/Continue    |
| Shift+F5        | 停止 Stop                   |
| F11 / Shift+F11 | 下一步/上一步 Step into/out |
| F10             | 跳过 Step over              |
| Ctrl+K Ctrl+I   | 显示悬停 Show hover         |

### 集成终端 Integrated terminal



| 按 Press            | 功能 Function                             |
| :------------------ | :---------------------------------------- |
| Ctrl+`              | 显示集成终端 Show integrated terminal     |
| Ctrl+Shift+`        | 创建新终端 Create new terminal            |
| Ctrl+Shift+C        | 复制选定 Copy selection                   |
| Ctrl+Shift+V        | 粘贴到活动端子 Paste into active terminal |
| Ctrl+↑ / ↓          | 向上/向下滚动 Scroll up/down              |
| Shift+PgUp / PgDown | 向上/向下滚动页面 Scroll page up/down     |
| Ctrl+Home / End     | 滚动到顶部/底部 Scroll to top/bottom      |



## 插件

https://www.zhihu.com/question/58165388/answer/301827585

通用

| 名称                                                      | 描述                                                         |
| --------------------------------------------------------- | ------------------------------------------------------------ |
| Chinese (Simplified) Language Pack for Visual Studio Code | 中文简体包                                                   |
| LOCAL HISTORY                                             | 代码历史版本                                                 |
| Partial Diff                                              | 查看2段代码的不同                                            |
| TODO Tree                                                 | 添加代码标签,快速定位                                        |
| vscode-icons                                              | 自定义图标                                                   |
| Better Comments                                           | 注释信息更加人性化                                           |
| Bracket Pair Colorizer                                    | 给{}[]添加不同的颜色                                         |
| Better Align                                              | 主要用于代码的**上下对齐**。                                 |
| change-case                                               | 快速修改当前选定内容或当前单词的命名的插件。                 |
| Markdown All in One                                       | Markdown文档编辑                                             |
| open in browser                                           | 在浏览器中访问html页面,                                      |
| Auto Rename Tag                                           | `<div></div>`改为`<div2></div>`时会自动改为`<div2></div2>`   |
| Auto Close Tag                                            | 自动闭合HTML标签                                             |
| Path Intellisense                                         | 自动路径补全                                                 |
| HTML CSS Suport                                           | 让html标签上写class智能提示当前项目所支持的样式,安装后有快捷提示 |
| vscode-fileheader                                         | 自动添加作者、时间信息                                       |


vue

|                |                  |
| -------------- | ---------------- |
| vetur          | .vue文件语法高亮 |
| vue 2 snippets |                  |
|                |                  |

### Better_Align
整洁的代码，是一个优秀程序员必须要做到的。当我们阅读那些大型公司开源的代码时，会发现，它的设计模式、它的编程规范都让人赞叹不已。

**Better Align**就是这样一款能够实现代码规范的工具，它主要用于代码的**上下对齐**。

它能够用冒号（：）、赋值（=，+=，-=，*=，/=）和箭头（=>）对齐代码。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205270955948.jpeg)

**使用方法：Ctrl+Shift+p输入“Align”确认即可。**

### BetterComments
![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205270955988.jpeg)

是不是觉得注释信息千篇一律？

**Better Comments**这款插件可以让VS Code注释信息更加人性化。

它可以根据告警、查询、TODO、高亮等标记对注释进行不同的展示。此外，还可以对注释掉的代码进行样式设置。

您想要的任何其他注释样式都可以在设置中指定

### Bracket_Pair_Colorizer

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205270955930.jpeg)

当你看到上述示例中这样包含多层嵌套的括号时，是不是觉得很凌乱？至少，我是这样的，每当看到这样复杂嵌套括号时，尤其代码行数多起来以后，就很难确定哪些是处于同一层次的。不弄明白层次结构，当然阅读代码也会麻烦很多。

**Bracket Pair Colorizer**这款插件可以给`()`、`[]`、`{}`这些常用括号显示不同颜色，当点击对应括号时能够用线段直接链接到一起，让层次结构一目了然。除此之外，它还支持用户自定义符号。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205270955939.jpeg)

这款神器的确解决了我的痛点。

### change-case
标识符和命名规则是学习一门语言最基本，也是必须要了解的一项。

不同语言对变量名、函数名、类名的命名要求不同，有的是驼峰、有的是下划线...但是，不管是什么要求，都有一个共性--**命名很重要**。

有些编程语言甚至对命名严格到如果不按规范要求，执行时会直接报错。

而**change-case**就是一款快速修改当前选定内容或当前单词的命名的插件。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205270955012.jpeg)

**使用方法：Ctrl+Shift+p输入“change”**然后选择要修改的格式即可。

### LOCALHISTORY
修改代码之后想找回历史代码怎么办？

在使用Pycharm、IDEA时可以直接查看本地历史代码，然后轻松恢复之前某个版本。但是，VS Code默认是不支持**local history**的，所以，仅凭**Ctrl+z**撤销操作时不行的。何况，撤销操作是把前面步骤所有的操作都撤销了，其中有很多是我们不需要的。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202201032147818.jpg)

但是，为VS Code配合上**local history**，所有问问题就迎刃而解了。

安装这款插件之后在侧边栏会出现**LOCAL HISTORY**的字样，每当我们保存更改时，它都会备份一份历史文件，当我们需要恢复之前版本时，只需要点击一下对应的文件即可。此外，它还会在编辑框显示**对比详情**，能够让你对修改位置一目了然。

### Markdown_All_in_One
![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205270955727.jpeg)

Markdown对于开发者而言，应该是一种常用的文档书写方式，虽然我在独立Markdown文档书写时习惯于使用Typora，但是对于开发过程中涉及到的API接口文档、README，我还是习惯于使用VS Code。

**Markdown All in One**这款插件可以实现媲美Typora的Markdown编辑体验，它具备如下特性，

- 丰富的快捷键
- TOC标签
- 数学公式
- 自动完成
- 列表编辑
- 输出HTML同时转PDF
- Github风格文档
- ......

这款插件真正做到了**All in One**。

### PartialDiff
**文件比较**是一种即常用有实用的一项功能，例如，我们想查看哪里修改了代码、查看输出的日志信息有什么区别等等，如果用肉眼逐个词的去分辨，显然是无法承受的。

提起文件比较，我首先想到的就是**Beyond Compare**，这是一款好用的工具，但是，仅凭收费这一点就把很多人拒之门外了。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205270955719.webp)

还好，VS Code插件库里有**Partial Diff**这款神奇的插件，选中一代码，右键**Select Text for Compare**，选中另外一部分代码，右键**Compare Text with Previous Selection**即可。

### TODOTree
我在此前多篇文章中提到过，习惯使用`TODO`、`FIXME`标签是一个非常好的习惯。

当我们发现某块代码需要修改，或者某块代码需要以后进一步完善，如果能够给它做一个标记，那么后续定位到对应位置是一件非常轻松高效的事情。

关于`TODO`标签，很多作者都推荐过**TODO Highlight**这款插件，但是，我更加推荐使用**TODO Tree**。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205270955652.jpeg)

虽然很多标签工具能够实现`TODO`标签高亮，但问题是“我们怎么快速定位到对应的标签？”逐个的打开文件去寻找显然是很麻烦的，效率并没有得到太大的提升。

**TODO Tree**则不同，它不仅可以实现**标签高亮**，还可以在活动栏添加一个选项卡，它能够以不同视图展示我们标记的位置，单击对应标签就能够快速定位到指定位置。

### vscode-icons
一个好的编辑界面能够让开发过程心情舒畅，甚至可以提升开发效率。

显然，VS Code默认的图标是达不到这种程度的。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205270955224.jpeg)

但是，配合**vscode-icons**这款插件就不同了，它具有以下特性，

- 自定义图标
- 自动检测项目
- 自定义配置

它不仅能够给文件夹、文件添加上舒适的图标，而且可以自动检测项目，根据项目不同功能配上不同图标，例如，git、Markdown、配置项、工具类等等。

### vscode-fileheader

转自:https://blog.csdn.net/bocongbo/article/details/114089912

#### 1、概述

大型项目开发，都是多人合作，需要明确每个开发的功能模块，以便遇到问题及时找到对应负责人解决、统计开发量等，vscode就提供了这样的功能

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205270959182.png)

#### 2、安装vscode-fileheader插件

#### 3、配置setting.json

```json
"fileheader.Author": "Cong.Bu",
"fileheader.LastModifiedBy": "Cong.Bu"
```



#### 4、window系统使用Ctrl+Alt+i，mac系统使用control+option+i即可在文件顶部生成



### vetur

vscode支持vue文件template读取ts类型

配置vetur
![null](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271001640.png)
`"vetur.experimental.templateInterpolationService": true`





## 配置

### 1.自动换行

点击菜单栏 View--> Toggle Word Wrap 选项.

点击菜单栏 查看--> 切换自动换行 选项.

或者直接 **快捷键** : **alt + Z**

### 2.打开setting.json

1.打开Command Palette

![1620608972520](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271000606.png)

2.输入setting

![1620609038955](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205270959942.png)

3.结果

![1620609123803](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205270959998.png)

### 3.添加用户片段

https://segmentfault.com/a/1190000015336481

1. 打开用户片段

   ![image-20220103214402284](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271000382.png)

2. 选择或创建

   ```
   vue.json
   ```

   代码片段

   ![image-20220103214336259](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271000786.png)

3. 粘贴下面代码片段即可

   ```json
   {
       "Print to console": {
           "prefix": "vue",
           "body": [
               "<template>",
               "    <div>\n",
               "    </div>",
               "</template>\n",
               "<script>",
               "export default {",
               "    props: {\n",
               "    },",
               "    data() {",
               "        return {\n",
               "        };",
               "    },",
               "    computed: {\n",
               "    },",
               "    created() {\n",
               "    },",
               "    mounted() {\n",
               "    },",
               "    watch: {\n",
               "    },",
               "    methods: {\n",
               "    },",
               "    components: {\n",
               "    },",
               "};",
               "</script>\n",
               "<style scoped lang=\"${1:scss}\">\n",
               "</style>\n",
           ],
           "description": "Create vue template"
       }
   }
   ```

二、如何使用?

新建`*.vue`文件，输入`vue`，按`tab`即可

### 4.右键文件与文件夹使用code打开

https://www.jianshu.com/p/e8c29211fba9

 "D:\SoftWareInstall\Microsoft VS Code/Code.exe"   "%1"





### VScode快速生成vue3代码模板

1. 首先在[vscode](https://so.csdn.net/so/search?q=vscode)编辑器中打开，【文件】–>【首选项】–>【用户片段】–>【新代码片段】–> 取名vue3js.json 确定
2. 把下列代码放进去

```json
{
  "Print to console": {
    "prefix": "vue3",
    "body": [
      "<template>",
      "  <div></div>",
      "</template>",
      "",
      "<script>",
      "import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'",
      "export default {",
      "  name: '',",
      "  setup() {",
      "    console.log('1-开始创建组件-setup')",
      "    const data = reactive({})",
      "    onBeforeMount(() => {",
      "      console.log('2.组件挂载页面之前执行----onBeforeMount')",
      "    })",
      "    onMounted(() => {",
      "      console.log('3.-组件挂载到页面之后执行-------onMounted')",
      "    })",
      "    return {",
      "      ...toRefs(data),",
      "    }",
      "  },",
      "}",
      "",
      "</script>",
      "<style scoped lang='less'>",
      "</style>",
      
  ],
    "description": "Log output to console"
  }
}
```

3.新建.vue结尾的文件,输入vue3 按键盘的TAB即可自动生成模板，省心省力！
```html
<template>
  <div></div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
export default {
  name: '',
  setup() {
    console.log('1-开始创建组件-setup')
    const data = reactive({})
    onBeforeMount(() => {
      console.log('2.组件挂载页面之前执行----onBeforeMount')
    })
    onMounted(() => {
      console.log('3.-组件挂载到页面之后执行-------onMounted')
    })
    return {
      ...toRefs(data),
    }
  },
}

</script>
<style scoped lang='less'>
</style>

```