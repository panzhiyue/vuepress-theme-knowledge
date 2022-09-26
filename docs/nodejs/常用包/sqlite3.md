

## 参考资料

https://www.jianshu.com/p/33b132078b05

## 基本使用

```
npm install sqlite3
```

**引入SQLite3模块**

```jsx
 var fs = require('fs');
 var file = 'test.db';//这里写的就是数据库文件的路径
 var exists = fs.existsSync(file);
 var sqlite3 = require('sqlite3').verbose();
 var db = new sqlite3.Database(file);
```

**增删改查操作**

```jsx
//增
var sql1 = db.prepare("insert into 表名 values (内容，跟mysql一样)");
sql1.run();
//删
var sql2 = db.prepare("delete from 表名 where id = 1");
sql2.run();
//改
var sql3 = db.prepare("update 表名 set name = winston where id = 1");
sql3.run();
 //查
 //查一个表的所有数据
 db.all("select * from 表名",function(err,row){
     console.log(JSON.stringify(row));
 })
 //查一条数据
 db().each("select * from 表名",function(err,row){
      console.log(row);
 })
```

**调用SQLite3的接口**

```javascript
 var sqlite3 = require('sqlite3');
 var db = new sqlite3.Database('/tmp/1.db',function() {
   db.run("create table test(name varchar(15))",function(){
     db.run("insert into test values('hello,world')",function(){
       db.all("select * from test",function(err,res){
         if(!err)
           console.log(JSON.stringify(res));
         else
           console.log(err);
       });
     })
   });
 });
```

**执行：**

```csharp
node test.js
[{"name":"hello,world"}]
```

## SQLite3 API介绍

在nodejs的模块安装模块下，进入sqlite3/lib目录下，打开sqlite3.js文件查看，操作数据库主要是用Database，Database相关的函数有：run、prepare、each、get、all、exec、map和close。

### Database

•   用法：new sqlite3.Database(filename,[mode],[callback])。
 •   功能：返回数据库对象并且自动打开和连接数据库，它没有独立打开数据库的方法。

### close

•   用法：close([callback])。
 •   功能：关闭和释放数据库对象。

#### run

•   用法：run(sql,param,...],[callback])。
 •   功能：运行指定参数的SQL语句，完成之后调用回调函数，它不返回任何数据，在回调函数里面有一个参数，SQL语句执行成功，则参数的值为null,反之为一个错误的对象，它返回的是数据库的操作对象。在这个回调函数里面当中的this,里面包含有lastId(插入的ID)和change(操作影响的行数,如果执行SQL语句失败，则change的值永远为0)。

### get

•   用法：get(sql,[param,...],[callback])。
 •   功能：运行指定参数的SQL语句，完成过后调用回调函数。如果执行成功，则回调函数中的第一个参数为null,第二个参数为结果集中的第一行数据，反之则回调函数中只有一个参数，只参数为一个错误的对象。

### all

•   用法：all(sql,[param,...],[callback])。
 •   功能：运行指定参数的SQL语句，完成过后调用回调函数。如果执行成功，则回调函数中的第一个参数为null,第二个参数为查询的结果集，反之，则只有一个参数，且参数的值为一个错误的对象。

### prepare

•   用法：prepare(sql,[param,...],[callback])。
 •   功能：预执行绑定指定参数的SQL语句，返回一个Statement对象，如果执行成功，则回调函数的第一个参数为null,反之为一个错误的对象。

## 示例

由于sqlite3 API具体使用过程中重复代码量较多，所以进行了简单封装，在使用过程中如果第一次创建数据库和表，紧接着插入数据的话，可能导致表还未创建完成就查询出现错误（Nodejs是基于异步的且顺序不可控），所以在表创建和插入数据时使用同步方式操作来保证表已经存在。封装的代码如下：

```jsx
 var fs = require('fs');
 var sqlite3 = require('sqlite3').verbose();
  
 var DB = DB || {};
  
 DB.SqliteDB = function(file){
     DB.db = new sqlite3.Database(file);
  
     DB.exist = fs.existsSync(file);
     if(!DB.exist){
         console.log("Creating db file!");
         fs.openSync(file, 'w');
     };
 };
  
 DB.printErrorInfo = function(err){
     console.log("Error Message:" + err.message + " ErrorNumber:" + errno);
 };
  
 DB.SqliteDB.prototype.createTable = function(sql){
     DB.db.serialize(function(){
         DB.db.run(sql, function(err){
             if(null != err){
                 DB.printErrorInfo(err);
                 return;
             }
         });
     });
 };
  
 /// tilesData format; [[level, column, row, content], [level, column, row, content]]
 DB.SqliteDB.prototype.insertData = function(sql, objects){
     DB.db.serialize(function(){
         var stmt = DB.db.prepare(sql);
         for(var i = 0; i < objects.length; ++i){
             stmt.run(objects[i]);
         }
     
         stmt.finalize();
     });
 };
  
 DB.SqliteDB.prototype.queryData = function(sql, callback){
     DB.db.all(sql, function(err, rows){
         if(null != err){
             DB.printErrorInfo(err);
             return;
         }
  
         /// deal query data.
         if(callback){
             callback(rows);
         }
     });
 };
  
 DB.SqliteDB.prototype.executeSql = function(sql){
     DB.db.run(sql, function(err){
         if(null != err){
             DB.printErrorInfo(err);
         }
     });
 };
  
 DB.SqliteDB.prototype.close = function(){
     DB.db.close();
 };
  
 /// export SqliteDB.
 exports.SqliteDB = DB.SqliteDB;
```

针对以上封装接口的调用代码如下：

```jsx
 /// Import SqliteDB.
 var SqliteDB = require('./sqlite.js').SqliteDB;
 var file = "Gis1.db";
 var sqliteDB = new SqliteDB(file);
  
 /// create table.
 var createTileTableSql = "create table if not exists tiles(level INTEGER, column INTEGER, row INTEGER, content BLOB);";
 var createLabelTableSql = "create table if not exists labels(level INTEGER, longitude REAL, latitude REAL, content BLOB);";
 sqliteDB.createTable(createTileTableSql);
 sqliteDB.createTable(createLabelTableSql);
  
 /// insert data.
 var tileData = [[1, 10, 10], [1, 11, 11], [1, 10, 9], [1, 11, 9]];
 var insertTileSql = "insert into tiles(level, column, row) values(?, ?, ?)";
 sqliteDB.insertData(insertTileSql, tileData);
  
 /// query data.
 var querySql = 'select * from tiles where level = 1 and column >= 10 and column <= 11 and row >= 10 and row <=11';
 sqliteDB.queryData(querySql, dataDeal);
  
 /// update data.
 var updateSql = 'update tiles set level = 2 where level = 1 and column = 10 and row = 10';
 sqliteDB.executeSql(updateSql);
  
 /// query data after update.
 querySql = "select * from tiles where level = 2";
 sqliteDB.queryData(querySql, dataDeal);
 sqliteDB.close();
  
 function dataDeal(objects){
     for(var i = 0; i < objects.length; ++i){
         console.log(objects[i]);
     }
 }
```



