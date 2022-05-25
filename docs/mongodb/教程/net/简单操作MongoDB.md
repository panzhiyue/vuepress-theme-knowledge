# 一 安装MongoDB

官网按需下载, 安装, 一步到位.

# 二 VS创建新项目

创建一个.netcore console项目, 然后nuget安装驱动MongoDB.Driver

# 三 建立连接

在Program.Main函数中添加代码

```c#
var client = new MongoClient("mongodb://127.0.0.1:27017");
var database = client.GetDatabase("foo"); 
var collection = database.GetCollection<BsonDocument>("bar");
```

三个对象, client是连接数据库的客户端, database对应库, collection是对象集合.

对对象的操作是争对collection来的.

# 四 操作

## 1> 插入[#](https://www.cnblogs.com/pasoraku/p/9634946.html#3201679518)



```c#
 var document = new BsonDocument
            {
                { "name", "测试数据1" },
                { "type", "大类" },
                { "number", 5 },
                { "info", new BsonDocument
                          {
                              { "x", 111 },
                              { "y", 222 }
                          }}
            };
collection.InsertOne(document);
```



同理还有InsertMany(), 鉴于VS高超的智能提示, 一目了然.

## 2> 查找[#](https://www.cnblogs.com/pasoraku/p/9634946.html#1886954774)

上一步插入之后, 通过find将它查找出来

find()需要一个filter参数, 根据条件查询

```c#
collection.Find(Builders<BsonDocument>.Filter.Empty);
```

上述表示无条件查询, matches everything.

如果有条件的话, 可以从Builders<BsonDocument>.Filter中选择, 比如Eq为相等, Lt为小于, Gt大于...顾名思义. 基于VS强大的智能提示, 非常清晰.

举例条件查询:

```c#
collection.Find(Builders<BsonDocument>.Filter.Eq("name", "测试数据1") & Builders<BsonDocument>.Filter.Lt("number", 6));
```

多项条件之间的与或关系, 对应使用&和|符号

## 3> 更新[#](https://www.cnblogs.com/pasoraku/p/9634946.html#2337988599)

```c#
collection.UpdateMany(Builders<BsonDocument>.Filter.Eq("name", "测试数据1"), Builders<BsonDocument>.Update.Set("number", 6));
```

更新使用UpdateMany(), 同样支持条件从Builders<BsonDocument>.Filter中获取.

更新支持添加新的field, 如:

```c#
collection.UpdateMany(Builders<BsonDocument>.Filter.Eq("name", "测试数据1"), Builders<BsonDocument>.Update.Set("number2", 666));
```

## 4> 删除[#](https://www.cnblogs.com/pasoraku/p/9634946.html#2872132722)

collection.DeleteMany()

其他几个API大同小异

# 五 BsonDocument到自定义class Object的相互转换

不要引入Json.Net(Newtonsoft.Json)

## 1> 自定义类型到BsonDocument[#](https://www.cnblogs.com/pasoraku/p/9634946.html#3866647849)

　　扩展函数:

　　　　entity.ToBsonDocument()

## 2> BsonDocument到自定义类型[#](https://www.cnblogs.com/pasoraku/p/9634946.html#4019037081)

　　通常是在Find的时候吧, IFindFluent.As<TEntity>()转就可以了. 



```c#
 var result = collection
                .Find((Builders<BsonDocument>.Filter.Lt("number",999) & Builders<BsonDocument>.Filter.Gt("number", 110)) & Builders<BsonDocument>.Filter.Eq("name", "测试数据1"))　　　　　　　　　 .OrderBy(x=>x["number"])//排序
                .Skip(10)//跳过
                .Limit(10)//限制                .As<Bar>()//m=>o
                .ToList();//像极了Linq吧?
```



　　如果不是呢?

```c#
var entity = BsonSerializer.Deserialize<Bar>(bson);
```

用到的自定义class大概长这样:



```c#
    public class Bar
    {
        public ObjectId _id { get; set; }
        public string name { get; set; }
        public string type { get; set; }
        public int number { get; set; }
        public int number2 { get; set; }
        public BarInfo info { get; set; }

        public class BarInfo
        {
            public int x { get; set; }
            public int y { get; set; }
        }
    }
```