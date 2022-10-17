## Promise什么是？有什么作用？本质是什么?

## 什么是Promise

所谓 Promise，就是一个对象，用来传递异步操作的消息。它代表了某个未来才会知道结果的事件（通常是一个异步操作），并且这个事件提供统一的 API，可供进一步处理。

## Promise的作用

Promise的出现主要是解决地狱回调的问题，比如你需要结果需要请求很多个接口，这些接口的参数需要另外那个的接口返回的数据作为依赖，这样就需要我们一层嵌套一层，但是有了Promise 我们就无需嵌套

## Promise的本质

我认为Promise的本质就是分离了异步数据获取和业务逻辑

## 基本的 api

- Promise.resolve()
- Promise.reject()
- Promise.prototype.then()
- Promise.prototype.catch()
- Promise.all() // 所有的完成
- Promise.all([p1,p2,p3])

## 基础案例

Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是 resolve 方法和 reject 方法。

```javascript
var promise = new Promise(function(resolve, reject) {
    if (/* 异步操作成功 */){
        resolve(value);
    } else {
        reject(error);
    }
});
 
promise.then(function(value) {
    // success
}, function(value) {
    // failure
});
```

 ajax的传统写法

```javascript
function getData(method, url, successFun, failFun) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open(method, url);
    xmlHttp.send();
    xmlHttp.onload = function () {
        if (this.status == 200) {
            successFun(this.response);
        } else {
            failFun(this.statusText);
        }
    };
    xmlHttp.onerror = function () {
        failFun(this.statusText);
    };
}
```

改为 Promise写法

```javascript
function getData(method, url) {
    return new Promise(function (resolve, reject) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open(method, url);
        xmlHttp.send();
        xmlHttp.onload = function () {
            if (this.status == 200) {
                resolve(this.response);
            } else {
                reject(this.statusText);
            }
        };
        xmlHttp.onerror = function () {
            reject(this.statusText);
        };
    })
}

getData('get', 'www.xxx.com').then(successFun, failFun)
```

