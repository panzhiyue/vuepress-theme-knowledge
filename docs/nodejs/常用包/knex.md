## 参考资料

https://blog.csdn.net/qq_40358032/article/details/120451244

https://www.bloghome.com.cn/post/knex-jszhong-wen-wen-dang-cha-xun-a-you-de-sheng-huo.html

https://blog.csdn.net/solocao/article/details/108938434

## 安装

```bash
yarn add -D knex
```



## 创建knex对象

### 1.sqlite

```javascript
    const db = knex({
      client: "better-sqlite3",
      connection: {
        filename: "I:\\MapTool\\static\\Map_Data.ti",
      },
      useNullAsDefault: true,
    });
```





## 表操作

### 判断表是否操作

```javascript
db.hasTable("MapInfo",(exists)=>{
    
})
```

### 创建表

```javascript
    db.schema.createTable("MapInfo",(table)=>{
      t.increments('id').primary();   //自增id主键
      table.string('name');  //字符串字段
      table.dropColumn('name')
      table.text('name')
      table.timestamps()
      
    })
```

### 自增id

```
table.increments('id');
```

### 主键

```
table.primary(['id']);
```

### 不允许为空

```
table.increments('id').notNullable()
```

### 查询第一条

```
knex('users')
  .where('id')
  .first(); // Resolves to any
```

### 事务

```
    await db.transaction((trx: any) => {
        // trx2 = trx;
        const query1 = db("MapLayerInfo").whereIn('id', checkedKeys).update({
            checked: true
        }).transacting(trx)
        const query2 = db("MapLayerInfo").whereNotIn('id', checkedKeys).update({
            checked: false
        }).transacting(trx)
        Promise.all([query1, query2]).then((result: any) => {
            trx.commit();
            return new Promise((resolve, reject) => {
                resolve(ResponseResult.buildSuccess(result));
            })
        }).catch((err: any) => {
            trx.rollback();
            return new Promise((resolve, reject) => {
                resolve(ResponseResult.buildError(err))
            })
        })
    })
```

