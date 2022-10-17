# Sqlite



## 函数大全





abs(X) 返回参数X的绝对值。 
coalesce(X,Y,...) 返回第一个非空参数的副本。若所有的参数均为NULL，返回NULL。至少2个参数。 
glob(X,Y) 用于实现SQLite的 "X GLOB Y"语法。可使用 sqlite3_create_function() 重载该函数从而改变GLOB运算符的功能。 
ifnull(X,Y) 返回第一个非空参数的副本。 若两个参数均为NULL，返回NULL。与上面的 coalesce()类似。 
last_insert_rowid() 返回当前数据库连接最后插入行的ROWID。sqlite_last_insert_rowid() API函数同样可用于得到该值。 
length(X) 返回X的长度，以字符计。如果SQLite被配置为支持UTF-8，则返回UTF-8字符数而不是字节数。 
like(X,Y [,Z]) 用于实现SQL语法"X LIKE Y [ESCAPE Z]".若使用可选的ESCAPE子句，则函数被赋予三个参数，否则只有两个。可使用sqlite3_create_function() 重载该函数从而改变LIKE运算符的功能。 注意同时重载like()的两参数和三参数版本，否则在使用/不使用 ESCAPE子句时，LIKE运算符的实现可能使用的是不同的代码。 
lower(X) 返回X字符串的所有字符小写化版本。这一转换使用C语言库的tolower()函数，对UTF-8字符不能提供好的支持。 
max(X,Y,...) 返回最大值。参数可以不仅仅为数字，可以为字符串。大小顺序由常用的排序法则决定。注意，max()在有2个或更多参数时为简单函数，但当仅给出一个参数时它变为聚集函数。 
min(X,Y,...) 返回最小值。与max()类似。 
nullif(X,Y) 当两参数不同时返回X，否则返回NULL. 
quote(X) 返回参数的适于插入其它SQL语句中的值。字符串会被添加单引号，在内部的引号前会加入逃逸符号。 BLOB被编码为十六进制文本。当前的VACUUM使用这一函数实现。在使用触发器实现撤销/重做功能时这一函数也很有用。 
random(*) 返回介于-2147483648和 +2147483647之间的随机整数。 
round(X)
round(X,Y) 将X四舍五入，保留小数点后Y位。若忽略Y参数，则默认其为0。 
soundex(X) 计算字符串X的soundex编码。参数为NULL时返回字符串"?000".缺省的SQLite是不支持该函数的，当编译时选项 -DSQLITE_SOUNDEX=1 时该函数才可用。 
sqlite_version(*) 返回所运行的SQLite库的版本号字符串。如 "2.8.0"。 
substr(X,Y,Z) 返回输入字符串X中以第Y个字符开始，Z个字符长的子串。 X最左端的字符序号为1。若Y为负，则从右至左数起。若SQLite配置支持UTF-8，则“字符”代表的是UTF-8字符而非字节。 
typeof(X) 返回表达式X的类型。返回值可能为"null", "integer", "real", "text", 以及 "blob". SQLite的类型处理参见SQLite3的数据类型. 
upper(X) 返回X字符串的所有字符大写化版本。这一转换使用C语言库的toupper()函数，对UTF-8字符不能提供好的支持。 

以下是缺省可用的聚集函数列表。可以使用C语言写出其它的聚集函数然后使用sqlite3_create_function() API函数添加到数据库引擎中。

在单参数聚集函数中，参数可以加前缀DISTINCT。这时重复参数会被过滤掉，然后才穿入到函数中。例如，函数"count(distinct X)"返回字段X的不重复非空值的个数，而不是字段X的全部非空值。 

avg(X) 返回一组中非空的X的平均值。非数字值作0处理。avg()的结果总是一个浮点数，即使所有的输入变量都是整数。 

count(X)
count(*) 返回一组中X是非空值的次数的第一种形式。第二种形式(不带参数)返回该组中的行数。 
max(X) 返回一组中的最大值。大小由常用排序法决定。 
min(X) 返回一组中最小的非空值。大小由常用排序法决定。仅在所有值为空时返回NULL。 
sum(X)
total(X) 返回一组中所有非空值的数字和。若没有非空行，sum()返回NULL而total()返回0.0. NULL通常情况下并不是对于“没有行”的和的一个有意义的结果，但SQL标准如此要求，且大部分其它SQL数据库引擎这样定义sum()，所以SQLite 也如此定义以保证兼容。我们提供非标准的total()函数作为解决该SQL语言设计问题的一个简易方法。 

total()的返回值式中为浮点数。sum()可以为整数，当所有非空输入均为整数时，和是精确的。 若sum()的任意一个输入既非整数也非NULL或计算中产生整数类型的溢出时，sum()返回接近真和的浮点数。

 

 

SQLite的日期时间函数

 

1.date(日期时间字符串, 修正符, 修正符, ……)
2.time(日期时间字符串, 修正符, 修正符, ……)
3.datetime(日期时间字符串, 修正符, 修正符, ……)
4.julianday(日期时间字符串, 修正符, 修正符, ……)
5.strftime(日期时间格式, 日期时间字符串, 修正符, 修正符, ……)

    上述五个函数需要一个日期时间字符串做参数，后面可以跟零到多个修正符参数。而 strftime() 函数还需要一个日期时间格式字符串做第一个参数。

　　1.date() 函数返回一个以 “YYYY-MM-DD” 为格式的日期；
2.time() 函数返回一个以 “YYYY-MM-DD HH:MM:SS” 为格式的日期时间；
3.julianday() 函数返回一个天数，从格林威治时间公元前4714年11月24号开始算起；
4.strftime() 函数返回一个经过格式话的日期时间，它可以用下面的符号对日期和时间进行格式化：
%d  一月中的第几天 01-31
%f  小数形式的秒，SS.SSSS
%H  小时 00-24
%j  一年中的第几天 01-366
%J  Julian Day Numbers
%m  月份 01-12
%M  分钟 00-59
%s  从 1970-01-01日开始计算的秒数
%S  秒 00-59
%w  星期，0-6，0是星期天
%W  一年中的第几周 00-53
%Y  年份 0000-9999
%%  % 百分号

　　其他四个函数都可以用 strftime() 函数来表示：

　　1.date(…)         ->   strftime(“%Y-%m-%d”,…)
2.time(…)         ->   strftime(“%H:%M:%S”,…)
3.datetime(…)     ->   strftime(“%Y-%m-%d %H:%M:%S”,…)
4.julianday(…)    ->   strftime(“%J”,…)

　　日期时间字符串，可以用以下几种格式：

　　YYYY-MM-DD
YYYY-MM-DD HH:MM
YYYY-MM-DD HH:MM:SS
YYYY-MM-DD HH:MM:SS.SSS
YYYY-MM-DDTHH:MM
YYYY-MM-DDTHH:MM:SS
YYYY-MM-DDTHH:MM:SS.SSS
HH:MM
HH:MM:SS
HH:MM:SS.SSS
now
DDDD.DDDD

　　在第五种到第七种格式中的“T”是一个分割日期和时间的字符；第八种到第十种格式只代表2000-01-01日的时间，第十一种格式的’now’表示返回一个当前的日期和时间，使用格林威治时间(UTC）；第十二种格式表示一个 Julian Day Numbers。

　　修正符，日期和时间可以使用下面的修正符来更改日期或时间：

　　NNN days
NNN hours
NNN minutes
NNN.NNNN seconds
NNN months
NNN years
start of month
start of year
start of week
start of day
weekday N
unixepoch
localtime
utc

　　前六个修正符就是简单的增加指定数值的时间和日期；第七到第十个修正符表示返回当前日期的开始；第十一个修正符表示返回下一个星期是N的日期和时间；第十二个修正符表示返回从1970-01-01开始算起的秒数；第十三个修正符表示返回本地时间。

　　下面举一些例子：

　　计算机当前时间
SELECT date(‘now’)
计算机当前月份的最后一天
SELECT date(‘now’,’start of month’,’+1 month’,’-1 day’)
计算UNIX 时间戳1092941466表示的日期和时间
SELECT datetime(‘1092941466’,’unixepoch’)
计算 UNIX 时间戳1092941466 表示的本地日期和时间
SELECT datetime(‘1092941466’,’unixepoch’,’localtime’)
计算机当前UNIX 时间戳
SELECT strftime(‘%s’,’now’)
两个日期之间相差多少天
SELECT jolianday(‘now’)-jolianday(‘1981-12-23’)
两个日期时间之间相差多少秒
SELECT julianday('now')*86400 - julianday('2004-01-01 02:34:56')*86400
计算今年十月份第一个星期二的日期
SELECT date('now','start of year','+9 months','weekday 2');

 

SQLite函数整理

 

 

SQLite包含了如下时间/日期函数：
datetime().......................产生日期和时间
date()...........................产生日期
time()...........................产生时间
strftime().......................对以上三个函数产生的日期和时间进行格式化

datetime()的用法是：datetime(日期/时间,修正符,修正符...)
date()和time()的语法与datetime()相同。
在时间/日期函数里可以使用如下格式的字符串作为参数：
YYYY-MM-DD
YYYY-MM-DD HH:MM
YYYY-MM-DD HH:MM:SS
YYYY-MM-DD HH:MM:SS.SSS
HH:MM
HH:MM:SS
HH:MM:SS.SSS
now
其中now是产生现在的时间。

举个例子：
select date('2006-10-17','+1 day','+1 year');
结果：2007-10-18

strftime()函数可以把YYYY-MM-DD HH:MM:SS格式的日期字符串转换成其它形式的字符串。
strftime()的语法是strftime(格式, 日期/时间, 修正符, 修正符, ...)

举个例子：
select strftime('%Y.%m.%d %H:%M:%S','now','localtime');
结果：2006.10.17 21:41:09

在使用中发现SQLite不支持YYYY-MM-DD格式化，所以使用了strftime来处理。

SQLite内建函数表

算术函数

abs(X)

返回给定数字表达式的绝对值。

max(X,Y[,...])

返回表达式的最大值。

min(X,Y[,...])

返回表达式的最小值。

random(*)

返回随机数。

round(X[,Y])

返回数字表达式并四舍五入为指定的长度或精度。

字符处理函数

length(X)

返回给定字符串表达式的字符个数。

lower(X)

将大写字符数据转换为小写字符数据后返回字符表达式。

upper(X)

返回将小写字符数据转换为大写的字符表达式。

substr(X,Y,Z)

返回表达式的一部分。

randstr()

 

quote(A)

 

like(A,B)

确定给定的字符串是否与指定的模式匹配。

glob(A,B)

 

条件判断函数

coalesce(X,Y[,...])

 

ifnull(X,Y)

 

nullif(X,Y)

 

集合函数

avg(X)

返回组中值的平均值。

count(X)

返回组中项目的数量。

max(X)

返回组中值的最大值。

min(X)

返回组中值的最小值。

sum(X)

返回表达式中所有值的和。

其他函数

typeof(X)

返回数据的类型。

last_insert_rowid()

返回最后插入的数据的ID。

sqlite_version(*)

返回SQLite的版本。

change_count()

返回受上一语句影响的行数。

last_statement_change_count()



## 其他

### 1.获取所有表名

```sql
SELECT * FROM sqlite_master WHERE type = ‘table’;
```

![image-20221009084035296](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/image-20221009084035296.webp)

### 2.获取表结构

```sql
PRAGMA table_info("MapInfo");
```

![image-20221009085034724](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/image-20221009085034724.webp)