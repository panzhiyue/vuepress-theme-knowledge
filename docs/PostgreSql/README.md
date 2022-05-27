# 指南

## 安装

### 1.下载地址

https://www.enterprisedb.com/downloads/postgres-postgresql-downloads#windows

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261114436.jpeg) 

### 2.点击安装

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261114434.jpeg) 

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261114425.jpeg) 

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261114428.jpeg) 

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261114313.jpeg) 

密码123456

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261114420.jpeg) 

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261114323.jpeg) 

### 3.选择地区

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261114391.jpeg) 

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261114468.jpeg) 

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261114333.jpeg) 

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261114420.jpeg) 

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261114370.jpeg) 

打开Application Stack Builder

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261114896.jpeg) 

响应时间比较长,耐心等待

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261114945.jpeg) 

选择要安装的应用程序

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261114308.jpeg) 

### 3.错误

### 3.1.安装失败

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261114982.jpeg)

 

https://www.cnblogs.com/wzjfl21/p/5225350.html

http://www.geekscribes.net/blog/2009/04/22/postgresql-database-cluster-initialisation-failed-solution/

http://www.voidcn.com/article/p-ujhdgeom-brr.html(手动创建数据库)

## 参考手册


### 表

#### 1.创建表

**语法**

```sql
CREATE TABLE table_name(
   column1 datatype,
   column2 datatype,
   column3 datatype,
   .....
   columnN datatype,
   PRIMARY KEY( 一个或多个列 )
);
```


#### 2.删除表

```sql
DROP TABLE table_name,table_name,。。。。table_name;

```

#### 3.表注释

```sql
COMMENT ON TABLE test
    IS '测试';
```

### 字段
#### 1.添加字段

```sql
ALTER TABLE tableName
  ADD COLUMN columnName varchar(255);
```



#### 2.修改字段名称

```sql
ALTER TABLE tableName RENAME COLUMN oldName TO newName;
```



#### 3.修改字段类型

```sql
ALTER TABLE tableName 
  ALTER COLUMN columnName TYPE char(12) COLLATE "pg_catalog"."default" USING "xian"::char(12);
```



#### 4.字段注释

```sql
COMMENT ON COLUMN "public"."ab_xiangzhen"."gid" IS '注释';
```



#### 5.添加自增

```sql
--给字段设置自增
alter table shequ_cy alter column gid set default nextval('shequ_cy_gid_seq');
```

### 序列
#### 1.新建序列

**语法**

```sql
CREATE SEQUENCE seqName
START WITH 
INCREMENT BY 
MINVALUE 
MAXVALUE 
CYCLE 
OWNED BY;
```

**参数说明**

- INCREMENT BY ： 每次序列增加（或减少）的步长 

- MINVALUE ： 序列最小值 NO MINVALUE表示没有最小值 
- MAXVALUE ： 序列最大值，NO MAXVALUE表示没有最大值 
- START WITH ：以什么序列值开始 
- CYCLE ： 序列是否循环使用 
- OWNED BY ： 可以直接指定一个表的字段，也可以不指定。 

**示例**

```sql
--新建序列
CREATE SEQUENCE shequ_cy_gid_seq
START WITH 1      --起始值
INCREMENT BY 1    --每次增加
MINVALUE 1       --最小值
MAXVALUE 999999999       --最大值
CACHE 1;         --序列是否循环使用
```

#### 2.删除序列

**语法**

```sql
DROP SEQUENCE seqName;
```

#### 3.查询序列

```sql
--查看数据库中有哪些序列
--r =普通表， i =索引，S =序列，v =视图，m =物化视图， c =复合类型，t = TOAST表，f =外部表
select *  from pg_class where relkind='S'  

```



#### 4.其他函数

##### 4.1.设置序列的当前数值

**语法**

```sql
currval(regclass)
```

**示例**

```sql
 SELECT
    setval(
        '"slzy_zyyzda_2020_gid_seq"' :: regclass,
        100
    );
```



##### 4.2.获取当前序列值

**语法**

```
currval(regclass)
```

**语法**

```sql
SELECT
    currval(
        '"slzy_zyyzda_2020_gid_seq"' :: regclass
    );
```



##### 4.3.递增序列并返回新值

**语法**

```sql
setval(regclass, bigint)
```

**示例**

```sql
SELECT
    nextval(
        '"slzy_zyyzda_2020_gid_seq"' :: regclass
    );
```
### 索引
#### 1.创建索引

##### 1.1.普通索引


```sql
Create Index IndexName ON TableName(field,....,field)
```

##### 1.2.唯一索引


```sql
CREATE UNIQUE INDEX index_name
on table_name (column_name);
```

##### 1.3. **局部索引** 

```sql
CREATE INDEX index_name
on table_name (conditional_expression);
```

##### 1.4.gin索引

普通索引在使用like时无法提高查询速度,需要使用gin索引

```sql
CREATE EXTENSION pg_trgm;
CREATE INDEX IndexName ON TableName USING GIN(field gin_trgm_ops);
```

#### 2.删除索引

```sql
DROP INDEX index_name;
```

#### 3.查询索引

```sql
select * from pg_indexes where tablename='tbname';    

select * from pg_statio_all_indexes where relname='tbname';
```

### 用户
#### 1.创建用户

语法

```sql
CREATE ROLE name;
CREATE USER name;
Create USER name with 权限
```

#### 2.删除用户

```sql
DROP ROLE name;
```

### 数据库
#### 1.创建数据库

**语法**

```sql
CREATE DATABASE DataBaseName
    WITH                                  //以下为可选
    OWNER = postgres                      //所有者
    TEMPLATE = postgis_24_sample          //模板数据库
    ENCODING = 'UTF8'                     //编码
    CONNECTION LIMIT = -1;                //连接限制
    。。。。                               //其他没用到
```


#### 2.删除数据库


```sql
DROP DATABASE [ IF EXISTS ] DataBaseName
```



#### 3.设置数据库注释

```sql
COMMENT ON DATABASE [DataBaseName]
    IS [注释];
```

### 权限
http://blog.itpub.net/30126024/viewspace-2661690/

https://cloud.tencent.com/developer/article/1478109

#### 1.权限列表

| 名称       | 描述 | 示例 |
| ---------- | ---- | ---- |
| SELECT     |      |      |
| INSERT     |      |      |
| UPDATE     |      |      |
| DELETE     |      |      |
| TRUNCATE   |      |      |
| REFERENCES |      |      |
| TRIGGER    |      |      |
| CREATE     |      |      |
| CONNECT    |      |      |
| TEMPORARY  |      |      |
| EXECUTE    |      |      |
| USAGE      |      |      |

#### 2.操作

##### 1.GRANT 赋予权限

对当前已经存在的进行授权,新建的还是没有权限

```sql
GRANT privilege [, ...]
ON object [, ...]
TO { PUBLIC | GROUP group | username }
```

##### 2.revoke撤销权限

```sql
REVOKE privilege [, ...]
ON object [, ...]
FROM { PUBLIC | GROUP groupname | username }
```

##### 4、授予后面新增表的权限

 备注：目前postgresql没有一种方法，可以使以后任何用户新建的表，readaccess都可以访问。 

```sql
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO readaccess;
ALTER DEFAULT PRIVILEGES  for user hzgzsoft,hdy,hzgzsoftservice IN SCHEMA public GRANT SELECT ON TABLES TO readonly;
```

##### 5.登陆权限

```sql
alter user select_only login;
```

##### 6.设置用户为只读

注意:需要是具体的用户,不能是角色

```sql
alter role wangbadan set default_transaction_read_only=true;    //只读
```


#### 1.创建单数据库只读用户

```sql
1、创建只读角色

CREATE ROLE readaccess;
2、授予对现有表的访问权限

GRANT USAGE ON SCHEMA public TO readaccess;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readaccess;
3、授予后面新增表的访问权限

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO readaccess;

CREATE USER testuser WITH PASSWORD 'mypassword';
GRANT readaccess TO testuser;

alter role testuser set default_transaction_read_only=true;    //只读
```





#### 1.查看某用户的表权限 

```sql
select * from information_schema.table_privileges where grantee='user_name';
```



#### 2.查看usage权限表 

```sql
select * from information_schema.usage_privileges where grantee='user_name';
```

#### 3.查看存储过程函数相关权限表

```sql
select * from information_schema.routine_privileges where grantee='user_name';
```



#### 4.总结

4.1.grant授权仅对已经存在的表有效。以后建立的表不会自动有权限 



### 字符串

转自:https://www.cnblogs.com/alianbog/p/5656722.html

#### 列表

| 函数                                                         | 返回值类型   | 描述                                                         | 示例                                                         | 结果                             |
| ------------------------------------------------------------ | ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | -------------------------------- |
| string\|\|string                                             | text         | 字符串连接                                                   | select 'Post'\|\|'gresql'\|\|' good!';                       | Postgresql good!                 |
| string\|\|non-string或non-string\|\|string                   | text         | 非字符串与字符串连接                                         | select 1\|\|' one';                                          | 1 one                            |
| bit_length(string)                                           | int          | 字符串的位数，注意一个汉字是3个字节                          | select bit_length('one');                                    | 24                               |
| char_length(string)                                          | int          | 字符串中字符的个数                                           | select char_length('中国');                                  | 2                                |
| length(string)                                               | int          | 字符串中字符个数，同char_length(string)                      | select length('中国');                                       | 2                                |
| length(string,encoding name)                                 | int          | 以name的编码格式字符串的字符个数                             | select length('中国','GBK');                                 | 3                                |
| octet_length(string)                                         | int          | 字符串的字节数                                               | select octet_length('中国');                                 | 6                                |
| lower(string)                                                | text         | 将字符串转换成小写                                           | select lower('HeLLO');                                       | hello                            |
| upper(string)                                                | text         | 将字符串转换成大写                                           | select lower('HellO');                                       | HELLO                            |
| initcap(string)                                              | text         | 将字符串中每个单词的首字母大写                               | select initcap('hello world !');                             | Hello World !                    |
| overlay(string placing string from int [for int])            | text         | 替换字符串，其中第一个int是开始位置，第二个int是长度，如果没有第二个int则长度默认为第二个字符串的长度 | select overlay('Txxxxas' placing 'hom' from 2 for 4);        | Thomas                           |
| replace(string,string,string)                                | text         | 替换字符串，将第一个字符串中的第二个字符串替换成第三个字符串 | select replace('Txxxxas','xxxx','hom');                      | Thomas                           |
| translate(string text, from text, to text)                   | text         | 把string中from字符替换成对应to中的字符，如('text','tx','nd')中t->n,x->d,替换后结果为nedn;如果from比to长，则删除from多出的字符，如('Txxxxas','Txas','hom')结果为hooom;如果from中有重复字符，对应顺序也是一一对应的，但是重复字符以第一个为准，如('txxxa','xxx','abcd'),结果为taaad | select translate('Txxxxas','xxxxa','hom');select translate('Txxxxas','Txas','hom');select translate('txxxa','xxxa','abcd'); | Thhhhshoooomtaaad                |
| position(substring in string)                                | int          | 给定子字符串在字符串的位置                                   | select position('lo' in 'hello');                            | 4                                |
| strpos(string, substring)                                    | int          | 功能同上，只是入参顺序相反                                   | select strpos('hello','lo');                                 | 4                                |
| substring(string from int [for int])                         | text         | 截取字符串，从from位置截取长度for，如果for省略，则是从from至结尾 | select substring('hello world' from 2 for 3);select substring('hello world' from 2); | ellell world                     |
| substring(string,from int[, for int])                        | text         | 同上                                                         | select substring('hello world',2,3);                         | ell                              |
| substring(string from patte )                                | text         | 截取匹配posix正则表达式的字符串                              | select substring('hello world' from '...$');                 | rld                              |
| substring(string from patte for escape)                      | text         | 截取匹配posix正则表达式的字符串,for为转移字符                | select substring('Thomas' from '%#"o_a#"_' for '#');         | oma                              |
| trim([leading \| trailing \| both][characters] from string)  | text         | 删除字符串头部（leading）,尾部(trailing)或两边的空白活[characters]字符 | select trim(both 'x' from 'xxjdhdxxxx');                     | jdhd                             |
| trim([leading \| trailing \| both][from] string[, characters] ) | text         | 同上                                                         | select trim(both from '  jdhd  ',' ');                       | jdhd                             |
| btrim(string text [, characters text])                       | text         | 删除字符串两边指定的字符                                     | select btrim('xxhhhxxx','x');                                | hhh                              |
| rtrim(string text [, characterstext])                        | text         | 删除字符串尾部指定的字符                                     | select rtrim('xxhhhxxx','x');                                | xxhhh                            |
| ltrim(string text [, characterstext])                        | text         | 删除字符串开头指定的字符                                     | select ltrim('xxhhhxxx','x');                                | hhhxxx                           |
| ascii(string)                                                | int          | 字符串第一个字符的ASCII值                                    | select ascii('xa');select ascii('x');                        | 120120                           |
| chr(int)                                                     | text         | 将数字转换成字符                                             | select chr(65);                                              | A                                |
| concat(str "any" [, str "any" [, ...] ])                     | text         | 连接所有参数，个数不限，类型不限                             | select concat('x','man',3);                                  | xman3                            |
| concat_ws(sep text, str "any" [,str "any" [, ...] ])         | text         | 功能同上，只是第一个参数是连接分隔符                         | select concat_ws(',','x','man',3);                           | x,man,3                          |
| convert(string bytea,src_encoding name, dest_encodingname)   | text         | 将字符串从指定编码转换至目的编码格式                         | select convert('Hello','UTF8','GBK');                        | \x48656c6c6f                     |
| format(formatstr text [,formatarg "any" [, ...] ])           | text         | 格式化字符串，类似C语言的sprintf,其中n$表示第n个参数         | select format('Hello %s, %1$s', 'World');                    | Hello World, World               |
| left(str text, n int)                                        | text         | 返回字符串前n个字符，n为负数时返回除最后\|n\|个字符以外的所有字符 | select left('hello',-2);                                     | hel                              |
| right(str text, n int)                                       | text         | 返回字符串后n个字符，n为负数时返回除最前\|n\|个字符意外的所有字符 | select right('hello',2);                                     | he                               |
| lpad(string text, length int [,fill text])                   | text         | 在字符串开头填充text至长度为length，缺省为空白，如果string的长度已经大于length，则会截断后面多余length的字符 | select lpad('123',5,'0');                                    | 00123                            |
| rpad(string text, length int [,fill text])                   | text         | 在字符串尾部填充text至长度为length，缺省为空白，如果string的长度已经大于length，则会截断后面多余length的字符 | select rpad('he',1,'o');                                     | h                                |
| md5(string)                                                  | text         | 计算string的md5散列值，并以十六进制返回                      | select md5('hello');                                         | 5d41402abc4b2a76b9719d911017c592 |
| parse_ident(qualified_identifiertext [, strictmode booleanDEFAULT true ] ) | text[]       | 将qualified_identifier拆分解析到一个数组中，以句点为分隔符。 | select parse_ident('SomeSchema.someTable');                  | {someschema,sometable}           |
| pg_client_encoding()                                         | name         | 获取当前客户端编码                                           | select pg_client_encoding();                                 | UTF8                             |
| quote_ident(string text)                                     | text         | 返回适合SQL语句标志符且使用适当引号的字符串，在字符串两端加双引号，如果字符串中出现双引号，返回结果中将变成两个，如果有2个连续的单引号，返回时只有1个 | select quote_ident('Foo"''"bar');                            | "Foo""'""bar"                    |
| quote_literal(string text)                                   | text         | 功能同上，只是内嵌的单引号和双引号被原样保留                 | select quote_literal('Foo"''bar');                           | 'Foo"''bar'                      |
| quote_literal(value anyelement)                              | text         | 将给定值转成text                                             | select quote_literal(45);                                    | '45'                             |
| quote_nullable(string text)                                  | text         | 功能同quote_literal(string text)，只是参数是NULL时返回NULL   |                                                              |                                  |
| quote_nullable(value anyelement)                             | text         | 功能同quote_literal(value anyelement)，只是参数为NULL时返回NULL |                                                              |                                  |
| repeat(string text, number int)                              | text         | 将string重复number次                                         | select repeat('Hi',2);                                       | HiHi                             |
| split_part(string text,delimiter text, field int)            | text         | 将字符串string以delimiter进行分割，并返回第field个子串       | select split_part('1#2#3','#',2);                            | 2                                |
| to_hex(number int or bigint)                                 | text         | 将数值转换成十六进制                                         | select to_hex(155);                                          | 9b                               |
| reverse(str)                                                 | text         | 将字符串逆序输出                                             | select reverse('hello');                                     | olleh                            |
| regexp_split_to_array(stringtext, patte text [, flags text]) | text[]       | 将字符串匹配posix正则表达式分割为字符串数组                  | select regexp_split_to_array('hello world', E'\\s+');        | {hello,world}                    |
| regexp_split_to_table(stringtext, patte text [, flagstext])  | setoftext    | 功能同上，只是以单列形式返回                                 | select regexp_split_to_table('hello world', E'\\s+');        | hello world                      |
| regexp_matches(string text,patte text [, flags text])        | setof text[] | 返回string中第一个匹配posix正则表达式的子串，如果flag=g，则返回所有 | select regexp_matches('foobarbequebaz', '(b..)','g');        | {bar} {beq} {baz}                |
| regexp_replace(string text,patte text, replacement text[, flags text]) | text         | 将匹配posix正则表达式的第一个子串替换成指定字符串，如果flag=g，则替换所有 | select regexp_replace('Thomas', '.[mN]a.', 'M');             | ThM                              |

#### 1.||


 字符串连接 

**语法**

```sql
string||string||non-string
```

**参数说明**

- 返回值  text

**示例**

```sql
select 'Post'||'gresql'||' good!'||2;

--结果:Postgresql good!2
```

####  2.bit_length 

 字符串的位数，注意一个汉字是3个字节 

**语法**

```sql
bit_length(string)
```

**参数说明**

- **string**:输入字符串
- 返回值:int

**示例**

```sql
select bit_length('one');

--结果:24
```

#### 3.char_length

 字符串中字符的个数 

**语法**

```sql
char_length(string)
```

**参数说明**

- **string**:输入字符串
- 返回值:int

**示例**

```sql
select char_length('中国');

--结果:2
```

#### 4.length 

 以name的编码格式字符串的字符个数 

**语法**

```sql
length(string,encoding name)
```

**参数说明**

- **string**:输入字符串
- 返回值:int

**示例**

```sql
select length('中国','GBK');

--结果:3
```

#### 5.octet_length

 字符串的字节数 

**语法**

```sql
octet_length(string)
```

**参数说明**

- **string**:输入字符串
- 返回值:int

**示例**

```sql
select octet_length('中国');

--结果:6
```

#### 6.lower 

 将字符串转换成小写 

**语法**

```sql
lower(string)
```

**参数说明**

- **string**:输入字符串
- 返回值:text

**示例**

```sql
select lower('HeLLO');

--结果:hello
```

#### 7.upper 

 将字符串转换成大写 

**语法**

```
upper(string)
```

**参数说明**

- **string**:输入字符串
- 返回值:text

**示例**

```sql
select lower('HellO');

--结果:HELLO
```

#### 8.initcap 

 将字符串中每个单词的首字母大写 

**语法**

```sql
initcap(string)
```

**参数说明**

- **string**:输入字符串
- 返回值:text

**示例**

```sql
select initcap('hello world !');

--结果:Hello World !
```

#### 9.overlay 

 替换字符串，其中第一个int是开始位置，第二个int是长度，如果没有第二个int则长度默认为第二个字符串的长度 

**语法**

```sql
overlay(string1 placing string2 from int1 [for int2])
```

**参数说明**

- string1:源字符串
- string2:替换字符串
- int1:开始位置
- int2:长度(如果没有第二个int则长度默认为第二个字符串的长度)
- 返回值:text

**示例**

```sql
select overlay('Txxxxas' placing 'hom' from 2 for 4);

--结果:Thomas
```

#### 10.replace 

 替换字符串，将第一个字符串中的第二个字符串替换成第三个字符串 

**语法**

```sql
replace(string1,string2,string3)
```

**参数说明**

- string1:

- string2:

- string3:

示例

```sql
select replace('Txxxxas','xxxx','hom');

--结果:Thomas
```

注意：string2,string3匹配大小写

#### 11.translate 

 把string中from字符替换成对应to中的字符，如('text','tx','nd')中t->n,x->d,替换后结果为nedn;如果from比to长，则删除from多出的字符，如('Txxxxas','Txas','hom')结果为hooom;如果from中有重复字符，对应顺序也是一一对应的，但是重复字符以第一个为准，如('txxxa','xxx','abcd'),结果为taaad 

**语法**

```sql
translate(string text1, from text2, to text3)
```

**参数说明**

- **text1:**源字符串

- text2:

- text3:
- 返回值:text



**示例**

```sql
select translate('Txxxxas','xxxxa','hom');
--结果:Thhhhs

select translate('Txxxxas','Txas','hom');
--结果:hoooom

select translate('txxxa','xxxa','abcd');
--结果;taaad
```





#### 12.position 

 给定子字符串在字符串的位置 

**语法**

```sql
position(substring in string)
```

**参数说明**

- **substring：**子字符串

- **string：**母字符串
- 返回值:Int

**示例**

```sql
select position('lo' in 'hello');

--结果:4
```

从1开始，没有匹配到值为0



#### 13.strpos 

给定子字符串在字符串的位置 （与Position功能相同,参数顺序相反）

**语法**

```sql
strpos(string, substring)
```

**参数说明**

- **string:**母字符串

- **substring:**子字符串
- 返回值:int



**示例**

```sql
select strpos('hello','lo');

--结果；4
```

#### 14.substring 

 截取字符串，从from位置截取长度for，如果for省略，则是从from至结尾 

**语法**

```sql
substring(string from startIndex  [for length])
substring(string,startIndex[, length])
```

**参数说明**

- **string:**源字符串
- **startIndex:**起始位置
- **length:**长度
- **返回值:**string

**示例**

```sql
select substring('hello world' from 2 for 3);
--结果:ell 

select substring('hello world' from 2);
--结果:ello world

select substring('hello world',2,3);
--结果:ell
```



#### 15.substring

 截取匹配posix正则表达式的字符串 

**语法**

```sql
substring(string from pattern)
```

**参数说明**

- **string:**源字符串
- **pattern:**正则表达式
- **返回值:**string

**示例**

```sql
select substring('hello world' from '...$');
--结果:rld
```



#### 16.substring 

 截取匹配posix正则表达式的字符串,for为转移字符 

**语法**

```sql
substring(string from pattern for escape)
```

**参数说明**

- **string:**源字符串
- **pattern:**正则表达式
- **escape:**
- **返回值:**

**示例**

```sql
select substring('Thomas' from '%#"o_a#"_' for '#');
--结果:oma
```



#### 17.trim 

 删除字符串头部（leading）,尾部(trailing)或两边的空白或字符 

**语法**

```sql
trim(string)

trim([leading | trailing | both] [characters] from string)

trim([leading | trailing | both] [from] string[, characters] )
```

**参数说明**

- **leading,trailing,both：**分别表示头部,尾部,两边
- **string:**源字符串
- **characters:**被去除字符
- **返回值:**text



**示例**

```sql
select trim('  jdhd   ')
--结果:jdhd

select trim(both 'x' from 'xxjdhdxxxx');
--结果：jdhd

select trim(both from '  jdhd   ',' ');
--结果:jdhd
```



#### 18.btrim

 删除字符串两边指定的字符 

**语法**

```sql
btrim(string [, characters text])
```

**参数说明**

- **string:**源字符串
- **characters:**指定字符
- **返回值:string**



**示例**

```sql
select btrim('xxhhhxxx','x');
--结果:hhh
```

#### 19.rtrim

 删除字符串尾部指定的字符 

**语法**

```sql
rtrim(string [, characters text])
```

**参数说明**

- **string:**源字符串
- **characters:**指定字符
- **返回值:string**



**示例**

```sql
select rtrim('xxhhhxxx','x');
--结果:xxhhh
```

#### 20.ltrim

  删除字符串开头指定的字符 

**语法**

```sql
ltrim(string text [, characterstext])
```

**参数说明**

- **string:**源字符串
- **characters:**指定字符
- **返回值:string**



**示例**

```sql
select ltrim('xxhhhxxx','x');
--结果:hhhxxx
```

#### 21.ascii 

   字符串第一个字符的ASCII值 

**语法**

```sql
ascii(string)
```

**参数说明**

- **string:**源字符串
- **返回值:**int



**示例**

```sql
select ascii('xa');
--结果:120

select ascii('x');
--结果:120
```

#### 22.chr 

    将数字转换成字符 

**语法**

```sql
chr(int)
```

**参数说明**

- **string:**源字符串
- **返回值:**int



**示例**

```sql
select chr(65);
--结果:A
```

#### 23.concat 

     连接所有参数，个数不限，类型不限 

**语法**

```sql
concat(str "any" [, str "any" [, ...] ])
```

**参数说明**

- 参数....
- **返回值:**string



**示例**

```sql
select concat('x','man',3);
--结果:xman3
```

#### 23.concat_ws 

     连接所有参数，个数不限，类型不限 （第一个参数是分隔符）

**语法**

```sql
concat_ws(sep text, str "any" [,str "any" [, ...] ])
```

**参数说明**

- sep:分隔符
- 参数....
- **返回值:**string



**示例**

```sql
select concat_ws(',','x','man',3);
--结果:x,man,3
```

#### 24.convert 

      将字符串从指定编码转换至目的编码格式 

**语法**

```sql
convert(string,src_encodingname, dest_encodingname)
```

**参数说明**

- string:字符串
- src_encodingname:原编码名称
- dest_encodingname:转换编码名称



**示例**

```sql
select convert('Hello','UTF8','GBK');
--结果:\x48656c6c6f
```

#### 25.format 

       格式化字符串，类似C语言的sprintf,其中n$表示第n个参数 

**语法**

```sql
format(formatstr text [,formatarg "any" [, ...] ])
```

**参数说明**

- string:字符串
- src_encodingname:原编码名称
- dest_encodingname:转换编码名称



**示例**

```sql
select format('Hello %2$s, %1$s', 'World','22');
--结果:Hello 22, World
```

格式说明符由 % 字符引进，格式为

%[ position ] type
组件的字段有：
position (optional)
n$ 格式的字符串，这里的n是要打印的参数的索引。索引为1表示在formatstr之后的第一个参数。如果省略了position，默认使用序列中的下一个参数。
type (required)
格式转换的类型用来产生格式说明符的输出。支持下列的类型：

- s 格式参数值为简单的字符串。空值作为空字符串对待。
- I 将参数值作为SQL标识符对待，如果需要，双写它。值为空是错误的。
- L 引用参数值作为SQL文字。空值用字符串 NULL 显示，没有引用。

除了上述的格式说明符，特殊的序列 %% 可以用作输出 % 字符。

 

示例：

```
test=# SELECT format('Hello %s', 'World');
   format    
-------------
 Hello World
(1 row)

test=# SELECT format('Testing %s, %s, %s, %%', 'one', 'two', 'three');
           format           
----------------------------
 Testing one, two, three, %
(1 row)

test=# SELECT format('INSERT INTO %I VALUES(%L)', 'Foo bar', E'O\'Reilly');
                  format                   
-------------------------------------------
 INSERT INTO "Foo bar" VALUES('O''Reilly')
(1 row)
```





#### 26.left

        返回字符串前n个字符，n为负数时返回除最后|n|个字符以外的所有字符 

**语法**

```sql
left(string, int)
```

**参数说明**

- string:字符串
- int:
- 返回值:string



**示例**

```sql
select left('hello',-2);
--结果:hel
```

#### 27.right

         返回字符串后n个字符，n为负数时返回除最前|n|个字符意外的所有字符 

**语法**

```sql
right(str text, n int)
```

**参数说明**

- string:字符串
- int:
- 返回值:string



**示例**

```sql
select right('hello',2);
--结果:lo
```

#### 28.lpad 

          在字符串开头填充text至长度为length，缺省为空白，如果string的长度已经大于length，则会截断后面多余length的字符 

**语法**

```sql
lpad(string text, length int [,fill text])
```

**参数说明**

- string:源字符串
- length:目标长度
- fill:填充字符串
- 返回值:string



**示例**

```sql
select lpad('123',5,'0');
--结果:00123
```



#### 29.rpad 

           在字符串尾部填充text至长度为length，缺省为空白，如果string的长度已经大于length，则会截断后面多余length的字符 

**语法**

```sql
rpad(string text, length int [,fill text])
```

**参数说明**

- string:源字符串
- length:目标长度
- fill:填充字符串
- 返回值:string



**示例**

```sql
select rpad('he',1,'o');
--结果:h
```

#### 30.md5 

           计算string的md5散列值，并以十六进制返回 

**语法**

```sql
md5(string)
```

**参数说明**

- string:源字符串
- 返回值:string



**示例**

```sql
select md5('hello');
--结果:5d41402abc4b2a76b9719d911017c592
```

#### 31.parse_ident

           将qualified_identifier拆分解析到一个数组中，以句点为分隔符。 

**语法**

```sql
parse_ident(qualified_identifier text [, strictmode booleanDEFAULT true ] )
```

**参数说明**

- string:源字符串
- strictmode booleanDEFAULT
- 返回值:string



**示例**

```sql
select parse_ident('SomeSchema.someTable');
--结果:{someschema,sometable}
```

#### 32.pg_client_encoding 

            获取当前客户端编码 

**语法**

```sql
pg_client_encoding()
```

**参数说明**

- 返回值:string



**示例**

```sql
select pg_client_encoding();
--结果:UTF8
```

#### 33.quote_ident 

            返回适合SQL语句标志符且使用适当引号的字符串，在字符串两端加双引号，如果字符串中出现双引号，返回结果中将变成两个，如果有2个连续的单引号，返回时只有1个 

**语法**

```sql
quote_ident(string text)
```

**参数说明**

- string:源字符串
- 返回值:string



**示例**

```sql
select quote_ident('Foo"''"bar');
--结果:"Foo""'""bar"
```

#### 34.quote_literal 

  功能同上，只是内嵌的单引号和双引号被原样保留 

**语法**

```sql
quote_literal(string text)

--将给定值转成text
quote_literal(value anyelement)
```

**参数说明**

- string:源字符串
- value:
- 返回值:string



**示例**

```sql
select quote_literal('Foo"''bar');
--结果:'Foo"''bar'

select quote_literal(45);
--结果:'45'
```

#### 35.quote_nullable 

   功能同quote_literal，只是参数是NULL时返回NULL 

**语法**

```sql
quote_nullable(string text)
quote_nullable(value anyelement)
```

**参数说明**

- string:源字符串
- value:
- 返回值:string



**示例**

```sql
select quote_nullable('Foo"''bar');
--结果:'Foo"''bar'

select quote_nullable(45);
--结果:'45'

select quote_nullable(null);
--结果:null
```

#### 36.repeat 

    将string重复number次 

**语法**

```sql
repeat(string text, number int)
```

**参数说明**

- string:字符串
- number:重复次数
- 返回值:string



**示例**

```sql
select repeat('Hi',2);
--结果:HiHi
```

#### 37.split_part 

   将字符串string以delimiter进行分割，并返回第field个子串 

**语法**

```sql
split_part(string text,delimiter text, field int)
```

**参数说明**

- string:字符串
- delimiter:分割符合
- field:返回的子串索引
- 返回值:string



**示例**

```sql
select split_part('1#2#3','#',2);
--结果:2
```

#### 38.to_hex 

    将数值转换成十六进制 

**语法**

```sql
to_hex(number int or bigint)
```

**参数说明**

- number:
- 返回值:string

**示例**

```sql
select to_hex(155);
--结果:9b
```

#### 39.reverse 

    将字符串逆序输出 

**语法**

```sql
reverse(str)
```

**参数说明**

- str:
- 返回值:string

**示例**

```sql
select reverse('hello');
--结果:olleh
```

#### 40.regexp_split_to_array 

     将字符串匹配posix正则表达式分割为字符串数组 

**语法**

```sql
regexp_split_to_array(string text, pattern text [, flags text])
```

**参数说明**

- string
- pattern
- flags
- 返回值:text[]

**示例**

```sql
select regexp_split_to_array('hello world', E'\\s+');
--结果:{hello,world}
```

#### 41.regexp_split_to_table 

      功能与regexp_split_to_array 相同，只是以单列形式返回 

**语法**

```sql
regexp_split_to_table(stringtext, pattern text [, flagstext])
```

**参数说明**

- string
- pattern
- flags
- 返回值:text[]

**示例**

```sql
select regexp_split_to_table('hello world', E'\\s+');
--结果:hello
    --world
```

#### 42.regexp_matches 

     返回string中第一个匹配posix正则表达式的子串，如果flag=g，则返回所有 

**语法**

```sql
regexp_matches(string text,pattern text [, flags text])
```

**参数说明**

- string
- pattern
- flags
- 返回值:text[]

**示例**

```sql
select regexp_matches('foobarbequebaz', '(b..)','g');
--结果:{bar}
{beq}
{baz}
```

#### 43.regexp_replace 

      将匹配posix正则表达式的第一个子串替换成指定字符串，如果flag=g，则替换所有 

**语法**

```sql
regexp_replace(string text,pattern text, replacement text[, flags text])
```

**参数说明**

- string
- pattern
- replacement
- flags
- 返回值:text[]

**示例**

```sql
select regexp_replace('Thomas', '.[mN]a.', 'M');
--结果:ThM
```




### 通用聚合函数

https://www.cnblogs.com/alianbog/p/5674838.html



#### 列表

| 函数                           | 参数类型                                                     | 返回类型                                                     | 描述                                                         | 示例                                        | 结果               |
| ------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------- | ------------------ |
| array_agg(expressio)           | 任意非数组类型                                               | 参数类型的数组                                               | 将入参包括NULL连接成一个数组                                 | select array_agg(id) from tbl_test;         | {1,2,3}            |
| array_agg(expressio)           | 任意数组类型                                                 | 入参数据类型                                                 | 将入参数组连接成更高维度的数组，输入的数组必须是相同的维度，且不允许是空或NULL | select array_agg(array['b','c','a']);       |                    |
| avg(expressio)                 | smallit, it, bigit, real, double precisio, umeric, or iterval | 整形返回umeric，浮点型返回double precisio，其他和入参类型相同 | 平均值                                                       | select avg(id) from tbl_test;               | 2.0000000000000000 |
| bit_ad(expressio)              | smallit, it, bigit, or bit                                   | 和入参类型相同                                               | 所有非NULL输入值的按位与，如果全为NULL则返回NULL             | select bit_ad(id) from tbl_test;            | 0                  |
| bit_or(expressio)              | smallit, it, bigit, or bit                                   | 和入参类型相同                                               | 所有非NULL输入值的按位或，如果全为NULL则返回NULL             | select bit_or(id) from tbl_test;            | 3                  |
| bool_ad(expressio)             | bool                                                         | bool                                                         | 如果输入全是true则返回true，否则为false                      | select bool_or(id::bool) from tbl_test;     | t                  |
| bool_or(expressio)             | bool                                                         | bool                                                         | 如果输入至少一个true，则返回true，否则返回false              | select bool_or((id-1)::bool) from tbl_test; | t                  |
| cout(*)                        |                                                              | bigit                                                        | 输入行数                                                     | select cout(*) from tbl_test;               | 3                  |
| cout(expressio)                | ay                                                           | bigit                                                        | 输入行中非NULL的行数                                         | select cout(id) from tbl_test;              | 3                  |
| every(expressio)               | bool                                                         | bool                                                         | 功能同bool_ad                                                |                                             |                    |
| jso_agg(expressio)             | ay                                                           | jso                                                          | 将输入聚合成一个jso数组                                      | select jso_agg(id) from tbl_test;           | [1, 2, 3]          |
| jsob_agg(expressio)            | ay                                                           | jsob                                                         | 将输入聚合成一个jso数组                                      | select jsob_agg(id) from tbl_test;          | [1, 2, 3]          |
| jso_object_agg(ame,value)      | (ay, ay)                                                     | jso                                                          | 将输入组成一个key/value对的jso对象                           | select jso_object_agg('a','oe');            | { "a" : "oe" }     |
| jsob_object_agg(ame,value)     | (ay, ay)                                                     | jsob                                                         | 将输入组成一个key/value对的jso对象                           | select jsob_object_agg('a','oe');           | {"a": "oe"}        |
| max(expressio)                 |                                                              |                                                              | 输入最大值                                                   | select max(id) from tbl_test;               | 3                  |
| mi(expressio)                  |                                                              |                                                              | 输入最小值                                                   | select mi(id) from tbl_test;                | 1                  |
| strig_agg(expressio,delimiter) | (text, text) or (bytea, bytea)                               | 同参数类型                                                   | 将输入使用delimiter连接成一个text                            | select strig_agg(ame,',') from tbl_test;    | 张三,李四,王五     |
| sum(expressio)                 | smallit, it, bigit, real, double precisio, umeric, iterval, or moey |                                                              | 输入和                                                       | select sum(id) from tbl_test;               | 6                  |
| xmlagg(expressio)              | xml                                                          | xml                                                          |                                                              | 请参考xml类型及其函数                       |                    |

#### 创建测试库

```sql
create table tbl_test
(
id integer,
name varchar(32),
sex VARCHAR(1)
)

insert into tbl_test(id,name,sex) values(1,'张三','m');
insert into tbl_test(id,name,sex) values(2,'李四','m');
insert into tbl_test(id,name,sex) values(3,'王五','f');
insert into tbl_test(id,name,sex) values(null,null,null);
insert into tbl_test(id,name,sex) values(null,null,'f');
```



#### 1.array_agg 

 将入参包括NULL连接成一个数组 

**语法**

```sql
array_agg(expression)
```

**参数说明**

-  expression: 任意类型  
-  返回值: 参数类型的数组 

**示例**

```sql
select array_agg(id) from tbl_test;
--结果:{1,2,3,NULL,NULL}

select array_agg(array['b','c','a']);
--结果:{{b,c,a}}
```

#### 2.avg 

  平均值(忽略null值) 

**语法**

```sql
avg(expression)
```

**参数说明**

-  expression:  smallint, int, bigint, real, double precision, numeric, or interval 
-  返回值:  整形返回numeric，浮点型返回double precision，其他和入参类型相同 

**示例**

```sql
select avg(id) from tbl_test;
--结果:2.0000000000000000
```

#### 3.bit_and 

   所有非NULL输入值的按位与，如果全为NULL则返回NULL 

   如果输入全是true则返回true，否则为false 

**语法**

```sql
bit_and(expression)
```

**参数说明**

-  expression:  `smallint`, `int`, `bigint`, or `bit` /bool
-  返回值:   和入参类型相同 

**示例**

```sql
select bit_and(id) from tbl_test;
--结果:0

select bool_and(id::bool) from tbl_test;
--结果:t
```

#### 4.bit_or 

 所有非NULL输入值的按位或，如果全为NULL则返回NULL 

 如果输入至少一个true，则返回true，否则返回false 

**语法**

```sql
bit_or(expression)
```

**参数说明**

-  expression:  `smallint`, `int`, `bigint`, or `bit` /bool
-  返回值:   和入参类型相同 

**示例**

```sql
select bit_or(id) from tbl_test;
--结果:3

select bool_or((id-1)::bool) from tbl_test;
--结果:t
```

#### 5.count

 输入行数 

**语法**

```sql
count(*)
count(expression)  忽略Null值
```

**参数说明**

- 任意
- 返回值:    bigint 

**示例**

```sql
select count(*) from tbl_test;
--结果:5

select count(sex) from tbl_test;
--结果:4

select count(id) from tbl_test;
--结果:3
```

#### 6.json_agg 

    将输入聚合成一个json数组 

**语法**

```sql
json_agg(expression)
```

**参数说明**

-  expression:  any
-  返回值:   json

**示例**

```sql
select json_agg(id) from tbl_test;
--结果:[1, 2, 3, null, null]
```

#### 7.jsonb_agg 

     将输入聚合成一个json数组  

**语法**

```sql
jsonb_agg(expression)
```

**参数说明**

-  expression:  any
-  返回值:   jsonb

**示例**

```sql
select jsonb_agg(id) from tbl_test;
--结果:[1, 2, 3, null, null]
```

#### 9. jsonb_object_agg 

将输入组成一个key/value对的json对象 

**语法**

```sql
jsonb_object_agg(name,value)
```

**参数说明**

-  expression:   (any, any) 
-  返回值:   jsonb

**示例**

```sql
 select jsonb_object_agg('a','one');
 --结果:{ "a" : "one" }
 
 select jsonb_object_agg(id,name) from tbl_test where id is not null;
 --结果:{ "1" : "张三", "2" : "李四", "3" : "王五" }
```

#### 10.max

 输入最大值  

**语法**

```sql
max(expression)
```

**参数说明**

-  expression:  any
-  返回值:   输入参数类型

**示例**

```sql
select max(name) from tbl_test;
 --结果:张三
```

#### 11.min  

输入最小值 

**语法**

```sql
min(expression)
```

**参数说明**

-  expression:  any
-  返回值:   输入参数类型

**示例**

```sql
select min(name) from tbl_test;
 --结果:李四
```

#### 12. string_agg  

 将输入使用delimiter连接成一个text(忽略Null值) 

**语法**

```sql
string_agg(expression,delimiter)
```

**参数说明**

- expression:  `text`or  `bytea`
- delimiter :`text`or  `bytea` 
- 返回值:    同参数类型 

**示例**

```sql
select string_agg(name,',') from tbl_test;
 --结果:张三,李四,王五
```

#### 13.sum   

输入和 

**语法**

```sql
sum(expression)
```

**参数说明**

-  expression: `smallint`, `int`, `bigint`, `real`, `double precision`, `numeric`, `interval`, or `money` 
-  返回值:    

**示例**

```sql
select sum(id) from tbl_test;
 --结果:6
```

#### 14.xmlagg   



**语法**

```sql
xmlagg(expression)
```

**参数说明**

-  expression:  xml 
-  返回值:     xml 

**示例**

```sql

```

### 统计聚合函数

#### 列表

| 函数                      | 参数类型                                                 | 返回类型                                                     | 描述                                                         | 示例                                        | 结果                   |
| ------------------------- | -------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------- | ---------------------- |
| corr(`Y`, `X`)            | double precision                                         | double precision                                             | 相关系数                                                     | select corr(id,id) from tbl_test;           | 1                      |
| covar_pop(`Y`, `X`)       | double precision                                         | double precision                                             | 总体协方差                                                   | select covar_pop(id,id) from tbl_test;      | 0.666666666666667      |
| covar_samp(`Y`, `X`)      | double precision                                         | double precision                                             | 样本协方差                                                   | select covar_samp(id,id1) from tbl_test;    | 0                      |
| regr_avgx(`Y`, `X`)       | double precision                                         | double precision                                             | 自变量平均值(sum(X)/N)                                       | select regr_avgx(id,id1) from tbl_test;     | 1                      |
| regr_avgy(`Y`, `X`)       | double precision                                         | double precision                                             | 因变量平均值(sum(Y)/N)                                       | select regr_avgy(id,id1) from tbl_test;     | 2                      |
| regr_count(`Y`, `X`)      | double precision                                         | bigint                                                       | 两个参数都不为NULL的行数                                     | select regr_count(id,id1) from tbl_test;    | 3                      |
| regr_intercept(`Y`, `X`)  | double precision                                         | double precision                                             | 根据所有输入点(X,Y)利用最小二乘法计算一个线性方程式。然后返回该直线的Y轴截距 | select regr_intercept(id,id) from tbl_test; | 0                      |
| regr_r2(`Y`, `X`)         | double precision                                         | double precision                                             | 相关系数平方                                                 | select regr_r2(id,id) from tbl_test;        | 1                      |
| regr_slope(`Y`, `X`)      | double precision                                         | double precision                                             | 根据所有输入点(X,Y)利用最小二乘法计算一个线性方程式。然后返回该直线的斜率 | select regr_slope(id,id) from tbl_test;     | 1                      |
| regr_sxx(`Y`, `X`)        | double precision                                         | double precision                                             | `sum(X^2) - sum(X)^2/N`                                      | select regr_sxx(id,id) from tbl_test;       | 2                      |
| regr_sxy(`Y`, `X`)        | double precision                                         | double precision                                             | `sum(X*Y) - sum(X) * sum(Y)/N`                               | select regr_sxy(id,id) from tbl_test;       | 2                      |
| regr_syy(`Y`, `X`)        | double precision                                         | double precision                                             | `sum(Y^2) - sum(Y)^2/N`                                      | select regr_syy(id,id) from tbl_test;       | 2                      |
| stddev(`expression`)      | smallint, int, bigint, real,double precision, or numeric | double precision for floating-point arguments,otherwise numeric | 同stddev_samp                                                |                                             |                        |
| stddev_pop(`expression`)  | smallint, int, bigint, real,double precision, or numeric | double precision for floating-point arguments,otherwise numeric | 总体标准差                                                   | select stddev_pop(id) from tbl_test;        | 0.81649658092772603273 |
| stddev_samp(`expression`) | smallint, int, bigint, real,double precision, or numeric | double precision for floating-point arguments,otherwise numeric | 样本标准差                                                   | select stddev_samp(id) from tbl_test;       | 1.00000000000000000000 |
| `variance`(`expression`)  | smallint, int, bigint, real,double precision, or numeric | double precision for floating-point arguments,otherwise numeric | 同var_samp                                                   |                                             |                        |
| `var_pop`(`expression`)   | smallint, int, bigint, real,double precision, or numeric | double precision for floating-point arguments,otherwise numeric | 总体方差                                                     | select var_pop(id) from tbl_test;           | 0.66666666666666666667 |
| `var_samp`(`expression`)  | smallint, int, bigint, real,double precision, or numeric | double precision for floating-point arguments,otherwise numeric | 样本方差                                                     | select var_samp(id) from tbl_test;          | 1.00000000000000000000 |

#### 创建测试库

```sql
create table tbl_test
(
	id integer,
	name varchar(32),
	sex VARCHAR(1),
	id1 integer
)

insert into tbl_test(id,name,sex,id1) values(1,'张三','m',1);
insert into tbl_test(id,name,sex,id1) values(2,'李四','m',1);
insert into tbl_test(id,name,sex,id1) values(3,'王五','f',1);
```



#### 1. corr 

 相关系数 

**语法**

```sql
corr(Y, X)
```

**参数说明**

- X:  double precision 

- Y: double precision 
- 返回值: double precision 

**示例**

```sql
select corr(id,id) from tbl_test;
--结果:1
```

#### 2. covar_pop 

 总体协方差 

**语法**

```sql
covar_pop(Y, X)
```

**参数说明**

- X:  double precision 

- Y: double precision 
- 返回值: double precision 

**示例**

```sql
select covar_pop(id,id) from tbl_test;
--结果:0.666666666666667
```



#### 3.  covar_samp 

  样本协方差 

**语法**

```sql
covar_samp(Y, X)
```

**参数说明**

- X:  double precision 

- Y: double precision 
- 返回值: double precision 

**示例**

```sql
select covar_samp(id,id1) from tbl_test;
--结果:0
```

#### 4.regr_avgx 

 自变量平均值(sum(X)/N) 

**语法**

```sql
regr_avgx(Y, X)
```

**参数说明**

- X:  double precision 

- Y: double precision 
- 返回值: double precision 

**示例**

```sql
select regr_avgx(id,id1) from tbl_test;
--结果:1
```

#### 5. regr_avgy 

  因变量平均值(sum(Y)/N) 

**语法**

```sql
regr_avgy(Y, X)
```

**参数说明**

- X:  double precision 

- Y: double precision 
- 返回值: double precision 

**示例**

```sql
select regr_avgy(id,id1) from tbl_test;
--结果:2
```



#### 6. regr_count 

 两个参数都不为NULL的行数 

**语法**

```sql
regr_count(Y, X)
```

**参数说明**

- X:  double precision 

- Y: double precision 
- 返回值:  bigint 

**示例**

```sql
select regr_count(id,id1) from tbl_test;
--结果:3
```

#### 6.  regr_intercept 

  根据所有输入点(X,Y)利用最小二乘法计算一个线性方程式。然后返回该直线的Y轴截距 

**语法**

```sql
regr_intercept(Y, X)
```

**参数说明**

- X:  double precision 

- Y: double precision 
- 返回值:   double precision 

**示例**

```sql
select regr_intercept(id,id) from tbl_test;
--结果:0
```

#### 7.  regr_r2 

    相关系数平方 

**语法**

```sql
regr_r2(Y, X)
```

**参数说明**

- X:  double precision 

- Y: double precision 
- 返回值:   double precision 

**示例**

```sql
select regr_r2(id,id) from tbl_test;
--结果:1
```

#### 8. regr_slope 

     根据所有输入点(X,Y)利用最小二乘法计算一个线性方程式。然后返回该直线的斜率 

**语法**

```sql
regr_slope(Y, X)
```

**参数说明**

- X:  double precision 

- Y: double precision 
- 返回值:   double precision 

**示例**

```sql
select regr_slope(id,id) from tbl_test;
--结果:1
```

#### 9.  regr_sxx 

     `sum(X^2) - sum(X)^2/N`  

**语法**

```sql
regr_sxx(Y, X)
```

**参数说明**

- X:  double precision 

- Y: double precision 
- 返回值:   double precision 

**示例**

```sql
select regr_sxx(id,id) from tbl_test;
--结果:2
```

#### 10. regr_sxy 

  `sum(X*Y) - sum(X) * sum(Y)/N`  

**语法**

```sql
regr_sxy(Y, X)
```

**参数说明**

- X:  double precision 

- Y: double precision 
- 返回值:   double precision 

**示例**

```sql
select regr_sxy(id,id) from tbl_test;
--结果:2
```



#### 11.  regr_syy 

   `sum(Y^2) - sum(Y)^2/N`   

**语法**

```sql
regr_syy(Y, X)
```

**参数说明**

- X:  double precision 

- Y: double precision 
- 返回值:   double precision 

**示例**

```sql
select regr_syy(id,id) from tbl_test;
--结果:2
```



#### 12.stddev

   样本标准差 

**语法**

```sql
stddev(expression)
```

**参数说明**

- expression: smallint, int, bigint, real,double precision, or numeric

- 返回值:   double precision for floating-point arguments,otherwise numeric

**示例**

```sql
select stddev(id) from tbl_test;
--结果:1.00000000000000000000
```

#### 13. stddev_pop 

   总体标准差 

**语法**

```sql
stddev_pop(expression)
```

**参数说明**

- smallint, int, bigint, real,double precision, or numeric

- 返回值:   double precision for floating-point arguments,otherwise numeric

**示例**

```sql
select stddev_pop(id) from tbl_test;
--结果:0.81649658092772603273
```





#### 14. stddev_samp 

   样本标准差 

**语法**

```sql
stddev_samp(expression)
```

**参数说明**

- expression: smallint, int, bigint, real,double precision, or numeric

- 返回值:   double precision for floating-point arguments,otherwise numeric

**示例**

```sql
select stddev_samp(id) from tbl_test;
--结果:1.00000000000000000000
```

#### 15.  variance 

    样本方差 

**语法**

```sql
variance(expression)
```

**参数说明**

- expression: smallint, int, bigint, real,double precision, or numeric

- 返回值:   double precision for floating-point arguments,otherwise numeric

**示例**

```sql
select variance(id) from tbl_test;
--结果:1.00000000000000000000
```

#### 16. var_pop 

    总体方差 

**语法**

```sql
var_pop(expression)
```

**参数说明**

- expression: smallint, int, bigint, real,double precision, or numeric

- 返回值:   double precision for floating-point arguments,otherwise numeric

**示例**

```sql
select var_pop(id) from tbl_test;
--结果:0.66666666666666666667
```

#### 17.  var_samp 

     样本方差 

**语法**

```sql
var_samp(expression)
```

**参数说明**

- expression: smallint, int, bigint, real,double precision, or numeric

- 返回值:   double precision for floating-point arguments,otherwise numeric

**示例**

```sql
select var_samp(id) from tbl_test;
--结果:1.00000000000000000000
```





###  顺序集聚合函数 



#### 1. mode() WITHIN GROUP (ORDER BY`sort_expression`)

返回最频繁的输入值（如果有

多个同样频繁的结果，则返回第一个）

**语法**

```sql
mode() WITHIN GROUP (ORDER BY sort_expression)
```

**参数说明**

- sort_expression： 任意可排序类型 

- 返回值 :同排序类型 

**示例**

```sql
select mode() within group (order by id) from tbl_test;
--结果:1
```

#### 2.percentile_cont(`fraction`) WITHIN GROUP (ORDER BY `sort_expression`) 

 continuous percentile: returns a value corresponding to the specified fraction in the ordering, interpolating between adjacent input items if needed 

**语法**

```

```

####  3.percentile_cont(`fractions`) WITHIN GROUP (ORDER BY `sort_expression`) 

####  4.percentile_disc(`fraction`) WITHIN GROUP (ORDER BY `sort_expression`) 

####  5.percentile_disc(`fractions`) WITHIN GROUP (ORDER BY `sort_expression`)

### 扩展
#### 1.uuid-ossp生成guid

**语法**

```sql
create extension "uuid-ossp"
select uuid_generate_v4()
uuid_generate_v4()  //设置默认值
```

#### 2.postgis

```sql
CREATE EXTENSION postgis
```

## 常见问题

### 1.pgAgent服务启动失败

 **pgagent安装后服务无法启动,错误提示如下图** 

 ![玖涯博客](http://localhost:4000/images/pasted-44.png) 

 1.修改`listen_address`值为`*`，重启数据库 

 ![玖涯博客](http://localhost:4000/images/pasted-46.png) 

 2.host填localhost，不要填ip地址 

 ![玖涯博客](http://localhost:4000/images/pasted-45.png) 

 3.运行成功 

 ![玖涯博客](http://localhost:4000/images/pasted-47.png) 

### 2.PostgreSQL中表名、字段名大小写问题

 学习PostgreSQL时发现SQL语句老是报错 

 ![玖涯博客](http://localhost:4000/images/pasted-28.png) 

SQL语句如下

```sql
select * from Map_Feature
```

数据库表如下图

 ![玖涯博客](http://localhost:4000/images/pasted-29.png) 

 SQL语句和表名都能对上,为什么提示不存在呢,仔细观察发现在错误提示中表名都变成了小写,我把表名改成小写的 

 ![玖涯博客](http://localhost:4000/images/pasted-30.png) 

 发现SQL语句可以正常执行。
在pgAdmin中创建script（具体字段我用*代替了）
这是表名小写生成的SQL语句 

 ![玖涯博客](http://localhost:4000/images/pasted-31.png) 

 这是表名大写生成的SQL语句 

 ![玖涯博客](http://localhost:4000/images/pasted-32.png) 

通过比较我们发现当表名大写是需要用双引号

总结
1.PostgreSQL对表名、字段名都是区分大小写的。在图形化界面可以正常新建。用SQL语句的时候需要加双引号，如果jdbc查询等处，记得使用转义符号。

2.PostgreSQL在SQL语句中对大小写是不敏感的

select ID from table1 的实际结果是查询table1表中的id字段

select “ID” from table1 的实际效果才是查询table1表中的ID字段

### 3.invalid attempt to read when no data is present

 一直以为
while（sqlDataReader.Read())这句话只是用于判断，以免发生异常，而忽略了sqlDataReader.Read()这句方法的执行
照成了invalid attempt to read when no data is present错误
所以以后要是遇到这个错误，请看下是否错少了sqlDataReader.Read() 

### 4.忘记密码

首先，如果忘记密码，必须能够操作数据库服务器所在的机器才有可能重设。

1.找到数据库所在目录

 ![玖涯博客](http://localhost:4000/images/pasted-33.png) 

 2.进入该目录找到pg_hba.conf文件 

 ![玖涯博客](http://localhost:4000/images/pasted-34.png) 



 3.打开pg_hba.conf文件,拖到最下面 

 ![玖涯博客](http://localhost:4000/images/pasted-35.png) 

 4.将METHOD项改为trust 

 ![玖涯博客](http://localhost:4000/images/pasted-36.png) 

 5.使用PostgreSql的可视化工具pgAdmin连接该数据库,此时应该可以正常连接 

 ![玖涯博客](http://localhost:4000/images/pasted-37.png) 

 6.连接成功后,双击数据库名字展开列表,再双击”登录角色”项展开列表 

 ![玖涯博客](http://localhost:4000/images/pasted-38.png) 

 7.右键需要重置密码的账号，属性 

 ![玖涯博客](http://localhost:4000/images/pasted-39.png) 

 8.切换到”定义”选项卡,输入新密码,点击确定保存 

 ![玖涯博客](http://localhost:4000/images/pasted-40.png) 

 9.将pg_hba.conf中对127.0.0.1的验证方式改为原先的（默认是md5） 



### 5.安装失败

 ![玖涯博客](http://localhost:4000/images/pasted-41.png) 

 https://www.cnblogs.com/wzjfl21/p/5225350.html
http://www.geekscribes.net/blog/2009/04/22/postgresql-database-cluster-initialisation-failed-solution/
http://www.voidcn.com/article/p-ujhdgeom-brr.html(手动创建数据库) 



### 6.ip连接失败

 使用localhost连接成功,使用ip地址连接失败
data/postgresql listen_addresses 改为正确的地址 



7.There are 2 other sessions using the database错误处理

 （1）错误信息
RDS for PostgreSQL删除数据库时报错如下：
ERROR: database “mctest” is being accessed by other users 详细：There are 2 other sessions using the database.
（2）原因
当前有其他连接在使用该库。
（3）解决方案
断开mctest上所有的连接，命令如下：
select pg_terminate_backend(pid) from (select pid from pg_stat_activity where datname = ‘<数据库名>’ ) a; 



### 7.PG服务启动后停止

#### (1)

![](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261117451.png)

解决方法

菜单——Windows PowerShell——右键Windows PowerShell——以管理员身份运行——netsh winsoc reset

运行成功后会提示重置成功，重启计算机才能生效

#### (2)

![](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261117451.png)

日志

![1602225280037](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261117045.png)

解决方法

修改   `E:\Program Files\PostgreSQL\10\data\pg_logical\replorigin_checkpoint`的值为`挹W6? j`,我是从其他服务器直接拷贝文件



![1602225360994](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261117660.png)

### **PostgreSQL中表名、字段名大小写问题**

		学习PostgreSQL时发现SQL语句老是报错

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261118537.jpeg) 

SQL语句如下

```sql
select * from Map_Feature
```

数据库表如下图

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261118394.jpeg) 

SQL语句和表名都能对上,为什么提示不存在呢,仔细观察发现在错误提示中表名都变成了小写,我把表名改成小写的

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261118480.jpeg) 

发现SQL语句可以正常执行。

在pgAdmin中创建script（具体字段我用*代替了）

这是表名小写生成的SQL语句

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261118483.jpeg) 

这是表名大写生成的SQL语句

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202201040038433.jpg) 

通过比较我们发现当表名大写是需要用双引号

***\*小结\****

1. PostgreSQL对表名、字段名都是区分大小写的。在图形化界面可以正常新建。用SQL语句的时候需要加双引号，如果jdbc查询等处，记得使用转义符号。

2. PostgreSQL在SQL语句中对大小写是不敏感的

select ID from table1  的实际结果是查询table1表中的id字段

select “ID” from table1  的实际效果才是查询table1表中的ID字段

## 配置

### 1.忘记密码

https://blog.csdn.net/xocoder/article/details/19842069

**首先，如果忘记密码，必须能够操作数据库服务器所在的机器才有可能重设。**

1. 找到数据库所在目录

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261119071.jpeg) 

2. 进入该目录找到**pg_hba.conf**文件

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261119110.jpeg) 

3. 打开**pg_hba.conf**文件,拖到最下面

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261119053.jpeg) 

4. 将**METHOD**项改为**trust**

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261119095.jpeg) 

 

5. 使用PostgreSql的可视化工具pgAdmin连接该数据库,此时应该可以正常连接

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261119057.jpeg) 

6. 连接成功后,双击数据库名字展开列表,再双击**”****登录角色****”**项展开列表

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261119075.jpeg) 

7. 右键需要重置密码的账号，属性

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261119619.jpeg) 

8. 切换到”**定义**”选项卡,输入新密码,点击确定保存

 

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261119637.jpeg) 

9. **将pg_hba.conf中对127.0.0.1的验证方式改为原先的（默认是md5）**

### 2.注册为服务

```
pg_ctl register -N PostgreSQL -D D:\SoftWareInstall\PostgreSQL\12\data
```

### 3.ip连接失败

### **ip连接失败**

使用localhost连接成功,使用ip地址连接失败

data/postgresql   listen_addresses 改为正确的地址

### 4.pgAgent定时备份

https://wenku.baidu.com/view/aa0a1d9ca6c30c2259019eb6.html

https://blog.csdn.net/sunbocong/article/details/77936601

 

1.在Application Stack Bulider 中下载安装pgAgent

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261120038.jpeg) 

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261120103.jpeg) 

 

 

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261120203.jpeg) 

\2. 安装pgagent后打开pgAdmin我们会发现多了一个pgAgent任务目录

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261120045.jpeg) 

\3. 创建一个任务

（1）创建任务

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261120107.jpeg) 

 

 

（2）添加步骤

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261120054.jpeg) 

选择批处理模式

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261120555.jpeg) 

脚本路径

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261120601.jpeg) 

或者直接执行语句

pg_dump -h localhost -p 5432 -d ZJ_SLZYDTGX -U postgres -F c -v -f "F:/DBBAK/ZJ_SLZYDTGX_PG/ZJ_SLZYDTGX_%date:~0,4%%date:~5,2%%date:~8,2%%time:~0,2%%time:~3,2%%time:~6,2%.backup"

前提:设置了bin文件夹环境变量,访问工具

不需要密码

（3）添加时间

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261120672.jpeg) 

\4. 创建脚本文件  

.sh文件语法 

https://blog.csdn.net/weixin_37885539/article/details/79416811

https://blog.csdn.net/sinat_36521655/article/details/79296181

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261120612.jpeg) 

 

\#!/bin/bash  

DATE=$(date '+%Y%m%d');

PATH=f:/softwareinstall/postgresql/bin/./pg_dump

\#START BACKUP

echo "START BACKUP..............." 

export PGPASSWORD='z892105346'

$PATH -h 192.168.2.221 -p 5432 -d test -U postgres -F c -v -f "d:/back/test"$DATE"2.backup"

 

echo "BACKUP  END"

 

\5. 添加环境变量

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261120653.jpeg) 

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261120720.jpeg) 

 

\6. 立即执行

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261120256.jpeg) 

\7. 查看执行结果

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261120135.jpeg) 

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261120138.jpeg) 

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261120176.jpeg) 

 

 

 

附:

直接备份

f:/softwareinstall/postgresql/bin/./pg_dump -h 192.168.2.221 -p 5432 -d test -U postgres -F c -v -f "d:/back/test%date:~0,4%%date:~5,2%%date:~8,2%%time:~0,2%%time:~3,2%%time:~6,2%.backup"

## 常用代码

### 1.cast类型转换

```sql
cast(field as varchar)
```

### 联表更新
```
UPDATE test1
SET name= s.number
FROM
    test2 s
WHERE
    fid= s.fid;
```


### 分析sql语句效率 

```sql
 explain (analyze,verbose,timing,costs,buffers) select * from slzy_xz_2017 
```

### COALESCE,null值转其他值 
 注意:转换必须相同类型,如过field为int型,则COALESCE(field,’’)报错,应该为COALESCE(field,0) 

```sql
COALESCE(field,'')
```



## .net

### 1.驱动程序构建过程



c#  数据库操作类(通用)对postgresql无效

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261121069.jpeg) 

#### 1.下载npgsql

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261121107.jpeg) 

#### 2.把npgsql.dll与Mono.Security.dll放到项目中

 

 

####  3.在web.config中添加配置

```xml
<system.data>

    <DbProviderFactories>

      <add name="Npgsql Data Provider"

         invariant="Npgsql"

         support="FF"

         description=".Net Framework Data Provider for Postgresql Server"

         type="Npgsql.NpgsqlFactory, Npgsql" />

    </DbProviderFactories>

  </system.data>
```



#### 4.数据库连接设置providerName="Npgsql"

```xml
 <add name="GZSoftConnPG" connectionString="*********" providerName="Npgsql"/>
```

### 2.访问数据库

#### 1. **建立连接**

```c#
NpgsqlConnection SqlConn = new NpgsqlConnection(ConStr);
```



#### 2. **使用DataAdapter查询,返回DataSet**

   

```c#
 public DataSet ExecuteQuery(string sqrstr)
    {
      DataSet ds = new DataSet();
      try
      {
        using(NpgsqlDataAdapter sqldap = new NpgsqlDataAdapter(sqrstr, sqlConn))
        {
          sqldap.Fill(ds);
        }
        return ds;
      }
      catch (System.Exception ex)
      {
        CloseConnection();
　　　　　　　　　return ds;
      }      
    }
```



#### 3. **增删改操作**

```c#
public int ExecuteNonQuery(string sqrstr)  
    {
      try
      {
        sqlConn.Open();
        using (NpgsqlCommand SqlCommand = new NpgsqlCommand(sqrstr, sqlConn))
        {
          int r = SqlCommand.ExecuteNonQuery();  //执行查询并返回受影响的行数          sqlConn.Close();
          return r; //r如果是>0操作成功！         }         
      }
      catch (System.Exception ex)
      {
        CloseConnection();
        return 0;
      }
    }
```



#### 4. **返回DataReader的查询**

​    

```c#
public DbDataReader GetReader( string cmdText)
    {
      if (sqlConn.State != ConnectionState.Open)
        sqlConn.Open();
      try
      {
        using (NpgsqlCommand cmd = new NpgsqlCommand(cmdText,sqlConn))
        {
          NpgsqlDataReader sdr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
          return sdr;
        }               
      }
      catch(System.Exception ex)
      {
        CloseConnection();
        return null;
      }
    } 
```

### 3.功能代码

#### 1.把指定表导出为EChartsJSON数据

```c#
        /// <summary>
        /// 获取EChartsJson格式数据
        /// </summary>
        /// <param name="tableName">表名称</param>
        /// <param name="geometryFieldName">图形字段名称</param>
        /// <param name="tidFieldName">tid字段名称</param>
        /// <param name="nameFieldName">name字段名称</param>
        /// <param name="where">筛选条件</param>
        /// <param name="conn">数据库配置</param>
        /// <returns></returns>
        public static string GetECharts(string tableName, string geometryFieldName, string tidFieldName, string nameFieldName, string where, string conn)
        {
            if (!string.IsNullOrEmpty(where))
            {
                where = " where " + where;
            }

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select replace( '{\"type\":\"FeatureCollection\",\"features\":'||json_agg(row_to_json(complete))||'}','\','') ");
            strSql.AppendFormat("from(   select 'Feature' as type, cast( st_asgeojson({1}) as json) as geometry ,json_build_object('fid',{2},'name',{3}) as properties from  {0} {4} ) as complete ", tableName, geometryFieldName, tidFieldName, nameFieldName, where);
            object obj = GZSoft.DBUtility.DbHelper.ExecuteScalarBySql(strSql.ToString(), null, conn);
            if (obj != null)
            {
                return obj.ToString();
            }

            return string.Empty;
        }
```