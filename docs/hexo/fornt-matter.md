转自:https://blog.csdn.net/weixin_42252518/article/details/99550466



### 什么是front-matter

```markdown
---
title: tags
date: 2019-08-13 09:39:50
type: tags
layout: tag
---
```

就是.md文件最上面的这部分内容

### 标签详解（只讲解官方文档中说的模糊的）



#### 1.layout	布局	

- 作用：指定要使用的模版样式
- 例如我上面的例子中使用的`tag`模版

#### 2.title	标题	

#### 3.date	建立日期	

文件建立日期

#### 4.updated	更新日期	

文件更新日期

#### 5.comments	开启文章的评论功能	true

#### 6.tags	标签（不适用于分页）	

- 作用：给文章添加标签，使其能在标签页中显示

- 如何使用：

- ```markdown
  tags:
  - PS3
  - Games
  123
  ```

- 如上所示一篇文章可以设置多个标签

#### 7.categories	分类（不适用于分页）	

- 整体内容基本与 `tags` 一致

- 区别在于在进行分类管理的时候此标签下的内容是`有严格的顺序和层次`的，tags没有

- ```markdown
  categories:
  - Diary
  
  因为hexo的分类具有层次关系，同一文章不能同时存在两个同级分类中，所以下面这种方式
  
  categories:
  - Diary
  - Life
  会使分类Life成为Diary的子分类，而不是并列分类。因此，有必要为您的文章选择尽可能准确的分类。
  ```

#### 8.permalink	覆盖文章网址	

- 直白的说就是静态文件的存放地址
- 如果不指定这个将会使用`根目录/_config.yml`中的默认配置`permalink: :year/:month/:day/:title/`
- 如果指定的文件夹不存在就会创建一个
- 你如何设置最后在页面中使用的连接地址就会是什么样的，例如上面这种方式最终生成的文章的连接地址就是`xxx.github.io/2019/08/11/：title/`

#### 9.keywords	仅用于 meta 标签和 Open Graph 的关键词（不推荐使用）

- 用于SEO优化
- 你这篇文章包含哪些关键词
- 人家百度这些关键词的时候可能就会显示你的页面

### 拓展：当前的主题中没有分类页和标签页怎么办

```
这个问题困扰了我一段时间，网上也没有比较好的答案所以现在写出来，给大家。
```

#### 1.tags创建步骤

>  根据你的配置创建文件夹，在我的配置中`（根目录/_config.yml）`设置的标签根目录为`tag_dir: tags`，所以我新建额是tags目录，你可以根据你的情况处理。

1. 创建tags文件夹，在命令行中输入：

   ```bash
   hexo new page "tags"
   12
   ```

2. 找到新建的文件夹`\source\tags`下的index.md文件

3. 修改其`front-matter`为如下格式

   ```markdown
   ---
   title: tags
   date: 2019-08-13 09:39:50
   type: tags	// 帮助脚本识别这是一个用来创建tags的文档
   layout: tag // 我的tags模版标签叫tag你可以根据你的模版名称输入对应的名称
   ---
   123456
   ```

4. 生成静态文件

   ```bash
   hexo g
   1
   ```

5. 通过主题设置`/themes/你的主题名称/_config.yml`中的配置，在页面指定一个连接指向`tags`文件夹，就可以在页面中看到标签页了

   ```
   menu:
     # Project:
     #   path: /categories/Projects
     #   card: project-card
     # Stuffs:
     #   path: /tags/Stuffs
     #   card: article-card
     Home: /
     tags: /tags
   123456789
   ```

![](D:/SoftWareInstall/Typora2/uploads/hexo/images/m_0c772c20fa2a19ddade2ba19e5e42004_r.png)

#### 2.categories创建步骤

与tags步骤一致我就不再赘述。