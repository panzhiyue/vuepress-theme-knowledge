## 1. _config.yml

*注意：这里面的东西不一定都要设置的，如果全部设置也是完全可以的，甚至你没必要在这个_config.yml设置，你可以自定义多个*

**SITE**
`title` 网站标题
`subtitle` 网站副标题
`description` 网站描述,告诉搜索引擎站点的简单描述
`keywords` 关键字,便于搜索引擎的搜索
`author` 作者名字，用于显示文章的作者
`language` 网站使用的语言,默认是英语，可设置的语言见[语言列表](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
`timezone` 网站时区，Hexo 默认使用电脑的时区，可设置的时区见[时区列表](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

**URL**
`url` 网址
`root` 网站根目录
`permalink` 文章的永久链接格式
`permalink_defaults` 设置永久链接中各部分的默认值

**DIRECTORY**
`source_dir` 资源文件夹，这个文件夹用来存放内容，默认是source
`public_dir` 公共文件夹，这个文件夹用于存放生成的站点文件，默认是public
`tag_dir` 标签文件夹，默认是tags
`archive_dir` 归档文件夹，默认是archives
`category_dir` 分类文件夹，默认是categories
`code_dir` Include code 文件夹，默认是downloads/code
`i18n_dir` 国际化（i18n）文件夹，默认是lang
`skip_render` 跳过指定文件的渲染。比如source/mypage/hello.md 将会输出为index.html，而source/mypage/code.js不会渲染它，更多请移步我的其他文章

**WRITING**
`new_post_name` 新文章的文件名称格式 `:title.md`或者`:year-:month-:day-:title.md`
`default_layout` 预设布局,默认是post
`auto_spacing` 在中文和英文之间加入空格，默认是false
`titlecase` 把标题转换为title case,默认是false
`external_link` 在新标签中打开链接,默认是true
`filename_case` 把文件名称转换为小写(1)或大写(2),默认是0不转换
`render_drafts` 显示草稿，默认是false
`post_asset_folder` 启动资源文件夹，默认是 false，表示source文件夹中除了文章以外的所有文件，例如图片、CSS、JS 文件等。比方说，如果你的Hexo项目中只有少量图片，那最简单的方法就是将它们放在source/images 文件夹中。
`relative_link` 把链接改为与根目录的相对位址，默认是false，默认情况下，Hexo生成的超链接都是绝对地址。例如，如果你的网站域名为[example.com](http://example.com/),您有一篇文章名为hello，那么绝对链接可能像这样：http://example.com/hello.html，它是绝对于域名的。相对链接像这样：/hello.html，也就是说，无论用什么域名访问该站点,一般建议用绝对路径
`future` 显示未来的文章，默认是true
`highlight` 代码块的设置
  `enable: true` 启动高亮
  `line_number: true` 显示行号
  `auto_detect: false` 自动检查
  `tab_replace:` 缩进大小

**HOME PAGE SETTING**
`path` 博客默认页面的路径，默认为空
`per_page` 主页中每页显示的贴子，0表示禁止分页
`order_by` 按时间倒序排列

**CATEGORY & TAG**
`default_category` 默认分类，默认为没有分类uncategorized
`category_map` 分类别名，默认为空
`tag_map` 标签别名，默认为空

**DATE / TIME FORMAT**
`date_format` 日期格式 YYYY-MM-DD
`time_format` 时间格式 H:mm:ss
按照[格式列表](http://momentjs.com/docs/#/displaying/format/)设置格式

**PAGINATION**
`per_page` 每页显示的文章量（0表示关闭分页），默认是10
`pagination_dir` 分页目录，默认是page

**EXTENSIONS**
`plugins` 插件，[插件列表](https://hexo.io/plugins/)
`theme` 当前主题名称,为false时禁用主题,[主题列表](https://hexo.io/themes/)
`theme_config` 自定义主题配置，这和全局的_config.yml文件是分离的，你可以写themes/my-theme/_config.yml，如果全局的_config.yml文件是
`theme_config:`
 `bio: "hello_world"`

而在你的`themes/my-theme/_config.yml`是
`bio: "HELLO_WORLD"`
`logo: "hi.png"`
那么结果是
`bio: "hello_world"`
`logo: "hi.png"`
也就是说如果在`themes/my-theme/_config.yml`中修改了全局`_config.yml`中的定义的参数，那么是无效的，但是可以添加全局`_config.yml`中没有的参数，如这里的logo

**DEPLOYMENT**
`deploy:` 部署格式如下
  `type: git`
  `repository: https://github.com/xxx/xxx.github.io.git`
  `branch: master`

**INCLUDE/EXCLUDE FILES OR FOLDERS**
设置键值使hexo显式或忽略某些文件
`include`
 `-Impo` 包含Impo这个文件，include参数一般不使用，需要包含的文件hexo都做好了
`exclude`
 `-.Igno` 忽略.Igno这个文件

**USING AN ALTERNATE CONFIG**
自定义配置文件，使用`hexo server`启动时是默认加载_config.yml里面的配置，如果我们自定义文件custom.yml，那么启动时使用`hexo server --config custom.yml`,甚至是多个自定义文件custom1.yml,custom2.json,启动时使用`hexo server --config custom1.yml,custom2.json`，注意默认后面文件的优先级高，也就是先加载.json，多个自定义文件可以写入`_multiconfig.yml`中，同样最后一个文件优先加载

------

## 2. package.json

这是一些应用程序的信息，json格式，建议不要改动

------

## 3. scaffolds

这是一个模板文件夹，当你新写了一片文章时，其显示格式都会以scaffolds中post.md的内容来加载。

------

## 4. source

这是一个资源文件夹。以_开头的文件都会被忽略，.md和.html文件会被解析并放到public，其他文件也会被拷贝过去 (如果文件可以被渲染的话，会经过解析然后储存到 public 文件夹，否则会直接拷贝到 public 文件夹)

------

## 5. themes

主题文件夹，这部分请移步到其他文章。

------

## 6. 关于文件名

Hexo 默认以标题做为文件名称，编辑 new_post_name 参数来改变默认的文件名称,提供以下参数

> ```xml
> :title    标题（小写，空格将会被替换为短杠）
> :year 建立的年份，比如， 2015
> :month    建立的月份（有前导零），比如， 04
> :i_month  建立的月份（无前导零），比如， 4
> :day  建立的日期（有前导零），比如， 07
> :i_day    建立的日期（无前导零），比如， 7
> ```

------

## 7. 关于模板

在新建文章时，Hexo 会根据 scaffolds 文件夹内相对应的文件来建立文件，例如：`hexo new photo "My Gallery"`，在执行这行指令时，Hexo 会尝试在 scaffolds 文件夹中寻找 photo.md模板，并根据其内容建立文章，默认使用 _config.yml 中的 default_layout 参数post代替，模板文件中的参数有

> ```xml
> layout    布局
> title 标题
> date  文件建立日期
> ```

------

## 8. 关于Front-matter

Front-matter 是文件最上方以 — 分隔的区域，用于指定个别文件的变量，举例来说：

> ```xml
> title: Hello World
> date: 2013/7/13 20:46:25
> ---
> ```

以下是预先定义的参数，在模板中使用这些参数值并加以利用。

> ```xml
> 参数           描述                   默认值
> layout       布局   
> title        标题
> date         建立日期              文件建立日期
> updated      更新日期              文件更新日期
> comments     开启文章的评论功能     true
> tags         标签（不适用于分页）
> categories   分类（不适用于分页）
> permalink    覆盖文章网址
> ```

------

## 9. 关于分类和标签

> 只有文章支持分类和标签，您可以在 Front-matter 中设置。在其他系统中，分类和标签听起来很接近，但是在 Hexo 中两者有着明显的差别：分类具有顺序性和层次性，也就是说 Foo, Bar 不等于 Bar, Foo；而标签没有顺序和层次

示例

> ```xml
> categories:
> - Diary
> tags:
> - PS3
> - Games
> ```

**注意** 下面的方法会使分类Life成为Diary的子分类，而不是并列分类

> ```xml
> categories:
> - Diary
> - Life
> ```

------

## 10. 关于.json和.yml配置文件的区别

两者都可以来编写front-matter,只要将`---`换成`;;;`即可
例如

> ```xml
> "title": "Hello World",
> "date": "2013/7/13 20:46:25"
> ;;;
> ```

------

## 11. 关于文章内部的标签引用

1，引用块
格式

```xml
{% blockquote [author[, source]] [link] [source_link_title] %}
    content
    {% endblockquote %}
```

示例1

```
{% blockquote @DevDocs https://twitter.com/devdocs/status/356095192085962752 %}
>     NEW: DevDocs now comes with syntax highlighting. http://devdocs.io
>     {% endblockquote %}

输出

NEW: DevDocs now comes with syntax highlighting. http://devdocs.io

@DevDocst--witter.com/devdocs/status/356095192085962752
```

示例2

```
{% blockquote Seth Godin http://sethgodin.typepad.com/seths_blog/2009/07/welcome-to-island-marketing.html Welcome to Island Marketing %}
>     Every interaction is both precious and an opportunity to delight.
>     {% endblockquote %}

输出

Every interaction is both precious and an opportunity to delight.

Seth GodinWelcome to Island Marketing
```

**注意：对应关系**

2，代码块

示例1

```
{% codeblock %}
>     alert('Hello World!');
>     {% endcodeblock %}

输出

alert('Hello World!');
```

3，在文章中插入指定大小的图片。

```
![[width] [height] [title text [alt text]]](http://localhost:4000/path/to/image)
```



------

## 12. 关于Asset资源文件夹

资源（Asset）代表 source 文件夹中除了文章以外的所有文件，例如图片、CSS、JS 文件等。比方说，如果你的Hexo项目中只有少量图片，那最简单的方法就是将它们放在 source/images 文件夹中。然后通过类似于 `[图片上传失败...(image-22899b-1541302947970)]` 的方法访问它们。
当资源文件管理功能打开后(`post_asset_folder: true`)，Hexo将会在你每一次通过 `hexo new [layout] `命令创建新文章时自动创建一个文件夹。这个资源文件夹将会有与这个 markdown 文件一样的名字。将所有与你的文章有关的资源放在这个关联文件夹中之后，你可以通过相对路径来引用它们，这样你就得到了一个更简单而且方便得多的工作流。

------

## 13. 关于图片的显示

当你打开文章资源文件夹功能后，你把一个 example.jpg 图片放在了你的资源文件夹中，如果通过使用相对路径的常规 markdown 语法 `[图片上传失败...(image-9a9526-1541302947971)]` ，它将 不会 出现在首页上。（但是它会在文章中按你期待的方式工作）
正确的引用图片方式是使用下列的标签插件而不是 markdown ：``通过这种方式，图片将会同时出现在文章和主页以及归档页中。

------

## 14. 关于Permalinks永久链接

在 _config.yml 配置中调整网站的永久链接或者在每篇文章的 Front-matter 中指定。
除了下列变量外，您还可使用 Front-matter 中的所有属性。

> ```
> 变量            描述
> :year          文章的发表年份（4 位数）
> :month         文章的发表月份（2 位数）
> :i_month       文章的发表月份（去掉开头的零）
> :day           文章的发表日期 (2 位数)
> :i_day         文章的发表日期（去掉开头的零）
> :title         文件名称
> :post_title    文章标题
> :id            文章 ID
> :category      分类。如果文章没有分类，则是 default_category 配置信息。permalink_defaults 参数调整永久链接中各变量的默认值：
> ```

示例
假设 source/_posts 文件夹中有个 [hello-world.md](http://hello-world.md/)，包含以下内容：

> ```
> title: Hello World
> date: 2013-07-14 17:01:34
> categories:
> - foo
> - bar
> 参数                             结果
> :year/:month/:day/:title/       2013/07/14/hello-world
> :year-:month-:day-:title.html   2013-07-14-hello-world.html
> :category/:title                foo/bar/hello-world
> ```

------

## 15. 关于多语种

修改 new_post_name 和 permalink 参数，如下：

```
new_post_name: :lang/:title.md
permalink: :lang/:title/
```

建立文章时，文章会被储存到：

```
hexo new "Hello World" --lang en
# =source/_posts/en/Hello-World.md
```

而网址会是：
`http://localhost:4000/en/hello-world/`

------

## 16. 关于Themes主题设置

在 themes 文件夹内，下载[主题](https://hexo.io/themes/)，并修改 _config.yml 内的 theme 设定，即可切换主题。