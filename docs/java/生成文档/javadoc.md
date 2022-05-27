## 1.IDEA使用javadoc

### (1)打开`工具->生成JavaDoc`

![null](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271134010.png)

### (2)填写参数

![null](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205271134994.png)
区域设置:zh_CN
其他命令行参数:
`-encoding UTF-8 -charset UTF-8 -windowtitle "你的文档在浏览器窗口标题栏显示的内容" -link http://docs.Oracle.com/javase/7/docs/api`

## 2.常用标记

| 标签                                                  | 说明                                                         | JDK 1.1 doclet | 标准doclet | 标签类型                            |
| :---------------------------------------------------- | :----------------------------------------------------------- | :------------- | :--------- | :---------------------------------- |
| [@author](https://github.com/author) 作者             | 作者标识                                                     | √              | √          | 包、 类、接口                       |
| [@version](https://github.com/version) 版本号         | 版本号                                                       | √              | √          | 包、 类、接口                       |
| [@param](https://github.com/param) 参数名 描述        | 方法的入参名及描述信息，如入参有特别要求，可在此注释。       | √              | √          | 构造函数、 方法                     |
| [@return](https://github.com/return) 描述             | 对函数返回值的注释                                           | √              | √          | 方法                                |
| [@deprecated](https://github.com/deprecated) 过期文本 | 标识随着程序版本的提升，当前API已经过期，仅为了保证兼容性依然存在，以此告之开发者不应再用这个API。 | √              | √          | 包、类、接口、值域、构造函数、 方法 |
| [@throws](https://github.com/throws)异常类名          | 构造函数或方法所会抛出的异常。                               |                | √          | 构造函数、 方法                     |
| [@exception](https://github.com/exception) 异常类名   | 同[@throws](https://github.com/throws)。                     | √              | √          | 构造函数、 方法                     |
| [@see](https://github.com/see) 引用                   | 查看相关内容，如类、方法、变量等。                           | √              | √          | 包、类、接口、值域、构造函数、 方法 |
| [@since](https://github.com/since) 描述文本           | API在什么程序的什么版本后开发支持。                          | √              | √          | 包、类、接口、值域、构造函数、 方法 |
| {[@link](https://github.com/link)包.类#成员 标签}     | 链接到某个特定的成员对应的文档中。                           |                | √          | 包、类、接口、值域、构造函数、 方法 |
| {[@value](https://github.com/value)}                  | 当对常量进行注释时，如果想将其值包含在文档中，则通过该标签来引用常量的值。 |                | √(JDK1.4)  | 静态值域                            |

此外还有[@serial](https://github.com/serial)、[@serialField](https://github.com/serialField)、[@serialData](https://github.com/serialData)、{[@docRoot](https://github.com/docRoot)}、{[@inheritDoc](https://github.com/inheritDoc)}、{[@literal](https://github.com/literal)}、{[@code](https://github.com/code)} {[@value](https://github.com/value) arg}几个不常用的标签，由于不常使用，我们不展开叙述，感兴趣的读者可以查看帮助文档。