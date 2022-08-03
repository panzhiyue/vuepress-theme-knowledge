# ECQL参考

## 1.语法说明

以下各节描述了主要的语言构造。每个构造都为其列出所有语法选项。每个选项都定义为其他构造的序列，或者就其本身而言是递归的。

- ECQL语言的一部分符号显示在中。所有其他符号都是语法说明的一部分。`code font`
- ECQL关键字不区分大小写。
- 竖线符号' **|** '表示可以选择关键字。
- 方括号' **[** … **]** '界定了可选的语法。
- 大括号' **{** … **}** '分隔可能出现零次或多次的语法。

## 2条件

 过滤条件是单个谓词，或其他条件的逻辑组合。 

| **句法**                                                     | **描述**                 |
| ------------------------------------------------------------ | ------------------------ |
| [谓词](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-pred) | 单谓词表达               |
| [条件](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-cond) `AND`| `OR` [条件](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-cond) | 条件的合并或分离         |
| `NOT` [条件](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-cond) | 否定条件                 |
| `(`| `[` [条件](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-cond) `]`|`)` | 包围`(`或`[`控制评估顺序 |

## 3谓词

 谓词是布尔值表达式，用于指定值之间的关系。 

| **句法**                                                     | **描述**                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `=`| `<>`| `<`| `<=`| `>`| `>=` [表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) | 比较操作                                                     |
| [表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) **[** `NOT` **]** `BETWEEN` [表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `AND` [表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) | 测试值是在范围内还是范围外（包括范围）                       |
| [表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) **[** `NOT` **]** `LIKE` | `ILIKE` *like-pattern* | 简单的模式匹配。 *like-pattern*使用该`%`字符作为任意数量的字符的通配符。 `ILIKE`不区分大小写的匹配。 |
| [表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) **[** `NOT` **]** `IN (`[表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr)**{**`,`[表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr)**}**`)` | 测试表达式值是否在一组值中（不是）                           |
| [Expression](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `IN (` [Literal](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-literal) **{** `,`[Literal](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-literal) **}** `)` | 测试功能ID值是否在给定集中。ID值是整数或字符串文字           |
| [表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `IS` **[** `NOT` **]** `NULL` | 测试值是否为（非）空                                         |
| [属性](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-attr) `EXISTS` **|** `DOES-NOT-EXIST` | 测试要素类型是否具有给定属性                                 |
| `INCLUDE` | `EXCLUDE`                                        | 始终包括（排除）应用此过滤器的功能                           |

## 4时间谓词

 时间谓词指定时间值表达式与时间或时间段的关系。 

| [Expression](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `BEFORE` [Time](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-literal) | 测试时间值是否在时间点之前       |
| ------------------------------------------------------------ | -------------------------------- |
| [Expression](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `BEFORE OR DURING` [Time Period](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-period) | 测试时间值是在时间段之前还是期间 |
| [Expression](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `DURING` [Time Period](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-period) | 测试时间值是否在一个时间段内     |
| [Expression](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `DURING OR AFTER` [Time Period](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-period) | 测试时间值是在一段时间内还是之后 |
| [Expression](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `AFTER` [Time](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-literal) | 测试时间值是否在时间点之后       |

## 5空间谓词

 空间谓词指定几何值之间的关系。拓扑空间谓词（`INTERSECTS`，`DISJOINT`，`CONTAINS`，`WITHIN`，`TOUCHES` `CROSSES`，`OVERLAPS`和`RELATE`）以在OGC描述的DE-9IM模型来定义[为SQL简单特征](http://www.opengeospatial.org/standards/sfs)规范。 

| **句法**                                                     | **描述**                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `INTERSECTS(`[表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `,` [表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr)`)` | 测试两个几何是否相交。相反`DISJOINT`                         |
| `DISJOINT(`[表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `,` [表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `)` | 测试两个几何是否不相交。相反`INTERSECTS`                     |
| `CONTAINS(`[表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `,` [表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `)` | 测试第一个几何图形是否拓扑包含第二个几何图形。相反 `WITHIN`  |
| `WITHIN(`[表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `,` [表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `)` | 测试第一个几何图形是否在第二个几何图形内。相反`CONTAINS`     |
| `TOUCHES(`[表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `,` [表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `)` | 测试两个几何是否接触。如果几何图形至少有一个共同点，则它们会接触，但是它们的内部不会相交。 |
| `CROSSES(`[表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `,` [表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `)` | 测试两个几何是否交叉。如果它们具有一些但不是全部内部点，则几何会交叉 |
| `OVERLAPS(`[表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `,` [表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `)` | 测试两个几何是否重叠。如果几何具有相同的尺寸，则它们重叠，并且至少有一个点彼此不共享，并且两个几何的内部交点具有与几何本身相同的尺寸 |
| `EQUALS(`[表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `,` [表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `)` | 测试两个几何在拓扑上是否相等                                 |
| `RELATE(` [表达](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `,` [表达](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `,` *模式*`)` | 测试几何图形是否具有DE-9IM矩阵*模式*指定的空间关系。DE-9IM模式是使用字符指定的长度为9的字符串`*TF012`。例：`'1*T***T**'` |
| `DWITHIN(` [表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `,` [表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `,`*距离* `,` *单位* `)` | 测试两个几何之间的距离是否不超过指定距离。 *distance*是距离公差的无符号数字值。 *单元*是下列之一`feet`，`meters`，，，`statute miles``nautical miles``kilometers` |
| `BEYOND(` [表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `,` [表达式](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `,`*距离* `,` *单位* `)` | 与相似`DWITHIN`，但测试两个几何之间的距离是否大于给定距离。  |
| `BBOX (` [表达](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `,` [数](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-literal) `,` [数](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-literal) `,` [数](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-literal)`,` [数](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-literal) [`,` *CRS* ]`)` | 测试几何图形是否与由其最小和最大X和Y值指定的边界框相交。可选的*CRS*是包含SRS代码的字符串（例如，`'EPSG:1234'`。默认为使用查询层的CRS） |

## 6表达式(Expression)

 

| **句法**                                                     | **描述**                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [Attribute](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-attr) | 要素属性的名称                                               |
| [Literal](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-literal) | 文字价值                                                     |
| Expression  + - * / Expression                               |                                                              |
| *function* `(` [ [Expression](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) { `,` [Expression](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) } ] `)` | 通过对 零个或多个参数的[过滤器函数](https://docs.geoserver.org/2.12.2/user/filter/function_reference.html#filter-function-reference)求值而计算出的值。 |
| `(`| `[` [表达](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-expr) `]`|`)` | 包围`(`或`[`控制评估顺序                                     |

## 7属性

属性名称表示要素属性的值。

- 简单的属性名称是字母和数字的序列，
- 用双引号引起来的属性名称可以是任何字符序列。

## 8文字

 文字指定各种类型的常量值。 

| **类型**   | **描述**                                                     |
| ---------- | ------------------------------------------------------------ |
| *Number*   | 整数或浮点数。支持科学计数法。                               |
| *Boolean*  | `TRUE` 要么 `FALSE`                                          |
| *String*   | 用单引号分隔的字符串文字。要在字符串中包含单引号，请使用两个单引号：`''` |
| *Geometry* | WKT格式的几何。WKT在OGC[简单功能SQL](http://www.opengeospatial.org/standards/sfs)规范中定义。所有标准的几何类型的支持：`POINT`，`LINESTRING`，`POLYGON`，`MULTIPOINT`，`MULTILINESTRING`，`MULTIPOLYGON`，`GEOMETRYCOLLECTION`。语法*x1* *x2* *y1* *y2*也支持自定义类型的信封。`ENVELOPE (` `)` |
| *Time*     | UTC日期/时间值，格式为`yyyy-mm-hhThh:mm:ss`。秒值可以有一个小数部分。时区可以指定为`Z`或`+/-hh:mm`。例：`2006-11-30T00:30:00Z` |
| *Duration* | 指定为`P` **[** y `Y`m `M`d `D` **]** `T` **[** h `H`m `M`s `S` **]的**持续时间。通过仅包括所需的年，月，日，小时，分钟和秒部分，可以将持续时间指定为任何所需的精度。例如： `P1Y2M`，`P4Y2M20D`， `P4Y2M1DT20H3M36S` |

## 9时间周期

 指定时间段，采用几种不同的格式。 

| **句法**                                                     | **描述**                             |
| ------------------------------------------------------------ | ------------------------------------ |
| [Time](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-literal) `/` [Time](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-literal) | 由开始时间和结束时间指定的时间段     |
| [Duration](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-literal) `/` [Time](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-literal) | 由给定时间之前的持续时间指定的时间段 |
| [Time](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-literal) `/` [Duration](https://docs.geoserver.org/2.12.2/user/filter/ecql_reference.html#ecql-literal) | 给定时间后的持续时间指定的时间段     |