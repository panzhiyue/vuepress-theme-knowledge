

# NodeJS

## 学习资料

英文网：https://nodejs.org/en/download/ 

中文网：http://nodejs.cn/download/

## 命令

| 名称    | 描述             |      |
| ------- | ---------------- | ---- |
| node -v | 查看nodejs版本号 |      |
|         |                  |      |
|         |                  |      |



## 全局模块

定义:何时何地都能访问,不需要引用

| 名称           | 描述                                                         | 示例 |
| -------------- | ------------------------------------------------------------ | ---- |
| **__dirname**  | 表示当前执行脚本所在的目录。                                 |      |
| **__filename** | 表示当前正在执行的脚本的文件名。它将输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同。 如果在模块中，返回的值是模块文件的路径。 |      |
| process        | 是一个全局变量，即 global 对象的属性。提供了一个与操作系统的简单接口 |      |

### process

process 是一个全局变量，即 global 对象的属性。

它用于描述当前Node.js 进程状态的对象，提供了一个与操作系统的简单接口。通常在你写本地命令行程序的时候，少不了要 和它打交道。下面将会介绍 process 对象的一些最常用的成员方法。

| 序号 | 事件 & 描述                                                  |
| :--- | :----------------------------------------------------------- |
| 1    | **exit** 当进程准备退出时触发。                              |
| 2    | **beforeExit** 当 node 清空事件循环，并且没有其他安排时触发这个事件。通常来说，当没有进程安排时 node 退出，但是 'beforeExit' 的监听器可以异步调用，这样 node 就会继续执行。 |
| 3    | **uncaughtException** 当一个异常冒泡回到事件循环，触发这个事件。如果给异常添加了监视器，默认的操作（打印堆栈跟踪信息并退出）就不会发生。 |
| 4    | **Signal 事件** 当进程接收到信号时就触发。信号列表详见标准的 POSIX 信号名，如 SIGINT、SIGUSR1 等。 |

#### 实例

创建文件 main.js ，代码如下所示：

```
process.on('exit', function(code) {

  // 以下代码永远不会执行
  setTimeout(function() {
    console.log("该代码不会执行");
  }, 0);
  
  console.log('退出码为:', code);
});
console.log("程序执行结束");
```

执行 main.js 文件，代码如下所示:

```
$ node main.js
程序执行结束
退出码为: 0
```

#### 退出状态码

退出状态码如下所示：

| 状态码 | 名称 & 描述                                                  |
| :----- | :----------------------------------------------------------- |
| 1      | **Uncaught Fatal Exception** 有未捕获异常，并且没有被域或 uncaughtException 处理函数处理。 |
| 2      | **Unused** 保留                                              |
| 3      | **Internal JavaScript Parse Error** JavaScript的源码启动 Node 进程时引起解析错误。非常罕见，仅会在开发 Node 时才会有。 |
| 4      | **Internal JavaScript Evaluation Failure** JavaScript 的源码启动 Node 进程，评估时返回函数失败。非常罕见，仅会在开发 Node 时才会有。 |
| 5      | **Fatal Error** V8 里致命的不可恢复的错误。通常会打印到 stderr ，内容为： FATAL ERROR |
| 6      | **Non-function Internal Exception Handler** 未捕获异常，内部异常处理函数不知为何设置为on-function，并且不能被调用。 |
| 7      | **Internal Exception Handler Run-Time Failure** 未捕获的异常， 并且异常处理函数处理时自己抛出了异常。例如，如果 process.on('uncaughtException') 或 domain.on('error') 抛出了异常。 |
| 8      | **Unused** 保留                                              |
| 9      | **Invalid Argument** 可能是给了未知的参数，或者给的参数没有值。 |
| 10     | **Internal JavaScript Run-Time Failure** JavaScript的源码启动 Node 进程时抛出错误，非常罕见，仅会在开发 Node 时才会有。 |
| 12     | **Invalid Debug Argument** 设置了参数--debug 和/或 --debug-brk，但是选择了错误端口。 |
| 128    | **Signal Exits** 如果 Node 接收到致命信号，比如SIGKILL 或 SIGHUP，那么退出代码就是128 加信号代码。这是标准的 Unix 做法，退出信号代码放在高位。 |

#### Process 属性

Process 提供了很多有用的属性，便于我们更好的控制系统的交互：

| 序号. | 属性 & 描述                                                  |
| :---- | :----------------------------------------------------------- |
| 1     | **stdout** 标准输出流。                                      |
| 2     | **stderr** 标准错误流。                                      |
| 3     | **stdin** 标准输入流。                                       |
| 4     | **argv** argv 属性返回一个数组，由命令行执行脚本时的各个参数组成。它的第一个成员总是node，第二个成员是脚本文件名，其余成员是脚本文件的参数。 |
| 5     | **execPath** 返回执行当前脚本的 Node 二进制文件的绝对路径。  |
| 6     | **execArgv** 返回一个数组，成员是命令行下执行脚本时，在Node可执行文件与脚本文件之间的命令行参数。 |
| 7     | **env** 返回一个对象，成员为当前 shell 的环境变量            |
| 8     | **exitCode** 进程退出时的代码，如果进程优通过 process.exit() 退出，不需要指定退出码。 |
| 9     | **version** Node 的版本，比如v0.10.18。                      |
| 10    | **versions** 一个属性，包含了 node 的版本和依赖.             |
| 11    | **config** 一个包含用来编译当前 node 执行文件的 javascript 配置选项的对象。它与运行 ./configure 脚本生成的 "config.gypi" 文件相同。 |
| 12    | **pid** 当前进程的进程号。                                   |
| 13    | **title** 进程名，默认值为"node"，可以自定义该值。           |
| 14    | **arch** 当前 CPU 的架构：'arm'、'ia32' 或者 'x64'。         |
| 15    | **platform** 运行程序所在的平台系统 'darwin', 'freebsd', 'linux', 'sunos' 或 'win32' |
| 16    | **mainModule** require.main 的备选方法。不同点，如果主模块在运行时改变，require.main可能会继续返回老的模块。可以认为，这两者引用了同一个模块。 |

#### 实例

创建文件 main.js ，代码如下所示：

```
// 输出到终端
process.stdout.write("Hello World!" + "\n");

// 通过参数读取
process.argv.forEach(function(val, index, array) {
   console.log(index + ': ' + val);
});

// 获取执行路径
console.log(process.execPath);


// 平台信息
console.log(process.platform);
```

执行 main.js 文件，代码如下所示:

```
$ node main.js
Hello World!
0: node
1: /web/www/node/main.js
/usr/local/node/0.10.36/bin/node
darwin
```

#### 方法参考手册

Process 提供了很多有用的方法，便于我们更好的控制系统的交互：

| 序号 | 方法 & 描述                                                  |
| :--- | :----------------------------------------------------------- |
| 1    | **abort()** 这将导致 node 触发 abort 事件。会让 node 退出并生成一个核心文件。 |
| 2    | **chdir(directory)** 改变当前工作进程的目录，如果操作失败抛出异常。 |
| 3    | **cwd()** 返回当前进程的工作目录                             |
| 4    | **exit([code])** 使用指定的 code 结束进程。如果忽略，将会使用 code 0。 |
| 5    | **getgid()** 获取进程的群组标识（参见 getgid(2)）。获取到得时群组的数字 id，而不是名字。 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。 |
| 6    | **setgid(id)** 设置进程的群组标识（参见 setgid(2)）。可以接收数字 ID 或者群组名。如果指定了群组名，会阻塞等待解析为数字 ID 。 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。 |
| 7    | **getuid()** 获取进程的用户标识(参见 getuid(2))。这是数字的用户 id，不是用户名。 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。 |
| 8    | **setuid(id)** 设置进程的用户标识（参见setuid(2)）。接收数字 ID或字符串名字。果指定了群组名，会阻塞等待解析为数字 ID 。 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。 |
| 9    | **getgroups()** 返回进程的群组 iD 数组。POSIX 系统没有保证一定有，但是 node.js 保证有。 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。 |
| 10   | **setgroups(groups)** 设置进程的群组 ID。这是授权操作，所以你需要有 root 权限，或者有 CAP_SETGID 能力。 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。 |
| 11   | **initgroups(user, extra_group)** 读取 /etc/group ，并初始化群组访问列表，使用成员所在的所有群组。这是授权操作，所以你需要有 root 权限，或者有 CAP_SETGID 能力。 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。 |
| 12   | **kill(pid[, signal])** 发送信号给进程. pid 是进程id，并且 signal 是发送的信号的字符串描述。信号名是字符串，比如 'SIGINT' 或 'SIGHUP'。如果忽略，信号会是 'SIGTERM'。 |
| 13   | **memoryUsage()** 返回一个对象，描述了 Node 进程所用的内存状况，单位为字节。 |
| 14   | **nextTick(callback)** 一旦当前事件循环结束，调用回调函数。  |
| 15   | **umask([mask])** 设置或读取进程文件的掩码。子进程从父进程继承掩码。如果mask 参数有效，返回旧的掩码。否则，返回当前掩码。 |
| 16   | **uptime()** 返回 Node 已经运行的秒数。                      |
| 17   | **hrtime()** 返回当前进程的高分辨时间，形式为 [seconds, nanoseconds]数组。它是相对于过去的任意事件。该值与日期无关，因此不受时钟漂移的影响。主要用途是可以通过精确的时间间隔，来衡量程序的性能。 你可以将之前的结果传递给当前的 process.hrtime() ，会返回两者间的时间差，用来基准和测量时间间隔。 |

#### 实例

创建文件 main.js ，代码如下所示：

```
// 输出当前目录
console.log('当前目录: ' + process.cwd());

// 输出当前版本
console.log('当前版本: ' + process.version);

// 输出内存使用情况
console.log(process.memoryUsage());
```

执行 main.js 文件，代码如下所示:

```
$ node main.js
当前目录: /web/com/runoob/nodejs
当前版本: v0.10.36
{ rss: 12541952, heapTotal: 4083456, heapUsed: 2157056 }
```



## 系统模块

定义:需要requird(),但不需要单独下载

| 名称 | 描述                                 |
| ---- | ------------------------------------ |
| path | 用于处理文件路径和目录路径的实用工具 |
| fs   |                                      |
|      |                                      |

### http

```
let http=require('http')

http.createServer(()=>{
console.log('我来了');
}).listen(9090);
```

```
let http=require('http')

http.createServer((req,res)=>{
res.write('index');
res.end('结束了');
}).listen(9090);

```



```
let http=require('http')
let fs=require('fs');
http.createServer((req,res)=>{
fs.readFile(req.url,(err,data)=>{
if(err){
res.writeHead("404");
res.end("404 not found");
}else{
res.end(data);
}

});
}).listen(9090);
```



### querystring
api:http://nodejs.cn/api/querystring.html

`querystring` 模块提供用于解析和格式化 URL 查询字符串的实用工具。 可以使用以下方式访问它：

```js
const querystring = require('querystring');
```

| 方法                                     | 描述                                                         |
| ---------------------------------------- | ------------------------------------------------------------ |
| `decode()`                               | `parse()` 的别名。                                           |
| `encode()`                               | `stringify()` 的别名。                                       |
| `escape(str)`                            | 方法以对 URL 查询字符串的特定要求进行了优化的方式对给定的 `str` 执行 URL 百分比编码。 |
| `parse(str[, sep[, eq[, options]]])`     | 将 URL 查询字符串 `str` 解析为键值对的集合。                 |
| `stringify(obj[, sep[, eq[, options]]])` | 通过遍历对象的自身属性从给定的 `obj` 生成 URL 查询字符串。   |
| `unescape(str)`                          | 方法在给定的 `str` 上执行 URL 百分比编码字符的解码。         |

#### decode()

新增于: v0.1.99

`querystring.decode()` 函数是 `querystring.parse()` 的别名。

#### encode()

新增于: v0.1.99

`querystring.encode()` 函数是 `querystring.stringify()` 的别名。

#### escape(str)

新增于: v0.1.25

- `str` 

`querystring.escape()` 方法以对 URL 查询字符串的特定要求进行了优化的方式对给定的 `str` 执行 URL 百分比编码。

`querystring.escape()` 方法由 `querystring.stringify()` 使用，通常不会被直接地使用。 它的导出主要是为了允许应用程序代码在需要时通过将 `querystring.escape` 赋值给替代函数来提供替换的百分比编码实现。

#### parse(str[, sep[, eq[, options]]])

版本历史

- `str`要解析的 URL 查询字符串。
- `sep` 用于在查询字符串中分隔键值对的子字符串。**默认值:** `'&'`。
- `eq` 用于在查询字符串中分隔键和值的子字符串。**默认值:** `'='`。
- options
  - `decodeURIComponent` 当解码查询字符串中的百分比编码字符时使用的函数。**默认值:** `querystring.unescape()`。
  - `maxKeys` 指定要解析的键的最大数量。指定 `0` 可移除键的计数限制。**默认值:** `1000`。

`querystring.parse()` 方法将 URL 查询字符串 `str` 解析为键值对的集合。

例如，查询字符串 `'foo=bar&abc=xyz&abc=123'` 会被解析为：

```js
{
  foo: 'bar',
  abc: ['xyz', '123']
}
```

`querystring.parse()` 方法返回的对象不是原型地继承自 JavaScript 的 `Object`。 这意味着典型的 `Object` 方法如 `obj.toString()`、 `obj.hasOwnProperty()` 等都没有被定义并且不起作用。

默认情况下，会假定查询字符串中的百分比编码字符使用 UTF-8 编码。 如果使用其他的字符编码，则需要指定其他的 `decodeURIComponent` 选项：

```js
// 假设 gbkDecodeURIComponent 函数已存在。

querystring.parse('w=%D6%D0%CE%C4&foo=bar', null, null,
                  { decodeURIComponent: gbkDecodeURIComponent });
```

#### stringify(obj[, sep[, eq[, options]]])

新增于: v0.1.25

- `obj`要序列化为 URL 查询字符串的对象。
- `sep` 用于在查询字符串中分隔键值对的子字符串。**默认值:** `'&'`。
- `eq`用于在查询字符串中分隔键和值的子字符串。**默认值:** `'='`。
- options
  - `encodeURIComponent`当将查询字符串中不安全的 URL 字符转换为百分比编码时使用的函数。**默认值:** `querystring.escape()`。

`querystring.stringify()` 方法通过遍历对象的自身属性从给定的 `obj` 生成 URL 查询字符串。

它会序列化传入的 `obj` 中以下类型的值：string| number| boolean| string[]|number[]| boolean[]。 任何其他的输入值都将会被强制转换为空字符串。

```js
querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });
// 返回 'foo=bar&baz=qux&baz=quux&corge='

querystring.stringify({ foo: 'bar', baz: 'qux' }, ';', ':');
// 返回 'foo:bar;baz:qux'
```

默认情况下，查询字符串中需要进行百分比编码的字符将会被编码为 UTF-8。 如果需要其他的编码，则需要指定其他的 `encodeURIComponent` 选项：

```js
// 假设 gbkEncodeURIComponent 函数已存在。

querystring.stringify({ w: '中文', foo: 'bar' }, null, null,
                      { encodeURIComponent: gbkEncodeURIComponent });
```

#### unescape(str)

新增于: v0.1.25

- `str` 

`querystring.unescape()` 方法在给定的 `str` 上执行 URL 百分比编码字符的解码。

`querystring.unescape()` 方法由 `querystring.parse()` 使用，通常不会被直接地使用。 它的导出主要是为了允许应用程序代码在需要时通过将 `querystring.unescape` 赋值给替代函数来提供替换的解码实现。

默认情况下， `querystring.unescape()` 方法将会尝试使用 JavaScript 内置的 `decodeURIComponent()` 方法进行解码。 如果失败，则将会使用更保险的不会因格式错误的 URL 而抛出异常的同类方法。



#### 示例

```javascript
let querystring = require('querystring')

console.log(querystring);

let str1 = "username=panzhiyue&password=123456";
let str2 = "username%3Dpanzhiyue%26password%3D123456";
let obj = { username: 'panzhiyue', password: '123456' };

//将 URL 查询字符串 `str` 解析为键值对的集合。
console.log(querystring.decode(str1));
console.log(querystring.parse(str2));

//通过遍历对象的自身属性从给定的 `obj` 生成 URL 查询字符串。
console.log(querystring.encode(obj));
console.log(querystring.stringify(obj));

//方法以对 URL 查询字符串的特定要求进行了优化的方式对给定的 `str` 执行 URL 百分比编码。
console.log(querystring.escape(str2));
//方法在给定的 `str` 上执行 URL 百分比编码字符的解码。
console.log(querystring.unescape(str1));

//把str转为Buffer
console.log(querystring.unescapeBuffer(str1));


{
  unescapeBuffer: [Function: unescapeBuffer],
  unescape: [Function: qsUnescape],
  escape: [Function: qsEscape],
  stringify: [Function: stringify],
  encode: [Function: stringify],
  parse: [Function: parse],
  decode: [Function: parse]
}
[Object: null prototype] { username: 'panzhiyue', password: '123456' }
[Object: null prototype] { 'username=panzhiyue&password=123456': '' }
username=panzhiyue&password=123456
username=panzhiyue&password=123456
username%253Dpanzhiyue%2526password%253D123456
username=panzhiyue&password=123456
<Buffer 75 73 65 72 6e 61 6d 65 3d 70 61 6e 7a 68 69 79 75 65 26 70 61 73 73 77 6f 72 64 3d 31 32 33 34 35 36>
```



### fs

| 序号 | 方法 & 描述                                                  |
| :--- | :----------------------------------------------------------- |
| 1    | **fs.rename(oldPath, newPath, callback)** 异步 rename().回调函数没有参数，但可能抛出异常。 |
| 2    | **fs.ftruncate(fd, len, callback)** 异步 ftruncate().回调函数没有参数，但可能抛出异常。 |
| 3    | **fs.ftruncateSync(fd, len)** 同步 ftruncate()               |
| 4    | **fs.truncate(path, len, callback)** 异步 truncate().回调函数没有参数，但可能抛出异常。 |
| 5    | **fs.truncateSync(path, len)** 同步 truncate()               |
| 6    | **fs.chown(path, uid, gid, callback)** 异步 chown().回调函数没有参数，但可能抛出异常。 |
| 7    | **fs.chownSync(path, uid, gid)** 同步 chown()                |
| 8    | **fs.fchown(fd, uid, gid, callback)** 异步 fchown().回调函数没有参数，但可能抛出异常。 |
| 9    | **fs.fchownSync(fd, uid, gid)** 同步 fchown()                |
| 10   | **fs.lchown(path, uid, gid, callback)** 异步 lchown().回调函数没有参数，但可能抛出异常。 |
| 11   | **fs.lchownSync(path, uid, gid)** 同步 lchown()              |
| 12   | **fs.chmod(path, mode, callback)** 异步 chmod().回调函数没有参数，但可能抛出异常。 |
| 13   | **fs.chmodSync(path, mode)** 同步 chmod().                   |
| 14   | **fs.fchmod(fd, mode, callback)** 异步 fchmod().回调函数没有参数，但可能抛出异常。 |
| 15   | **fs.fchmodSync(fd, mode)** 同步 fchmod().                   |
| 16   | **fs.lchmod(path, mode, callback)** 异步 lchmod().回调函数没有参数，但可能抛出异常。Only available on Mac OS X. |
| 17   | **fs.lchmodSync(path, mode)** 同步 lchmod().                 |
| 18   | **fs.stat(path, callback)** 异步 stat(). 回调函数有两个参数 err, stats，stats 是 fs.Stats 对象。 |
| 19   | **fs.lstat(path, callback)** 异步 lstat(). 回调函数有两个参数 err, stats，stats 是 fs.Stats 对象。 |
| 20   | **fs.fstat(fd, callback)** 异步 fstat(). 回调函数有两个参数 err, stats，stats 是 fs.Stats 对象。 |
| 21   | **fs.statSync(path)** 同步 stat(). 返回 fs.Stats 的实例。    |
| 22   | **fs.lstatSync(path)** 同步 lstat(). 返回 fs.Stats 的实例。  |
| 23   | **fs.fstatSync(fd)** 同步 fstat(). 返回 fs.Stats 的实例。    |
| 24   | **fs.link(srcpath, dstpath, callback)** 异步 link().回调函数没有参数，但可能抛出异常。 |
| 25   | **fs.linkSync(srcpath, dstpath)** 同步 link().               |
| 26   | **fs.symlink(srcpath, dstpath[, type], callback)** 异步 symlink().回调函数没有参数，但可能抛出异常。 type 参数可以设置为 'dir', 'file', 或 'junction' (默认为 'file') 。 |
| 27   | **fs.symlinkSync(srcpath, dstpath[, type])** 同步 symlink(). |
| 28   | **fs.readlink(path, callback)** 异步 readlink(). 回调函数有两个参数 err, linkString。 |
| 29   | **fs.realpath(path[, cache], callback)** 异步 realpath(). 回调函数有两个参数 err, resolvedPath。 |
| 30   | **fs.realpathSync(path[, cache])** 同步 realpath()。返回绝对路径。 |
| 31   | **fs.unlink(path, callback)** 异步 unlink().回调函数没有参数，但可能抛出异常。 |
| 32   | **fs.unlinkSync(path)** 同步 unlink().                       |
| 33   | **fs.rmdir(path, callback)** 异步 rmdir().回调函数没有参数，但可能抛出异常。 |
| 34   | **fs.rmdirSync(path)** 同步 rmdir().                         |
| 35   | **fs.mkdir(path[, mode], callback)** S异步 mkdir(2).回调函数没有参数，但可能抛出异常。 访问权限默认为 0777。 |
| 36   | **fs.mkdirSync(path[, mode])** 同步 mkdir().                 |
| 37   | **fs.readdir(path, callback)** 异步 readdir(3). 读取目录的内容。 |
| 38   | **fs.readdirSync(path)** 同步 readdir().返回文件数组列表。   |
| 39   | **fs.close(fd, callback)** 异步 close().回调函数没有参数，但可能抛出异常。 |
| 40   | **fs.closeSync(fd)** 同步 close().                           |
| 41   | **fs.open(path, flags[, mode], callback)** 异步打开文件。    |
| 42   | **fs.openSync(path, flags[, mode])** 同步 version of fs.open(). |
| 43   | **fs.utimes(path, atime, mtime, callback)**                  |
| 44   | **fs.utimesSync(path, atime, mtime)** 修改文件时间戳，文件通过指定的文件路径。 |
| 45   | **fs.futimes(fd, atime, mtime, callback)**                   |
| 46   | **fs.futimesSync(fd, atime, mtime)** 修改文件时间戳，通过文件描述符指定。 |
| 47   | **fs.fsync(fd, callback)** 异步 fsync.回调函数没有参数，但可能抛出异常。 |
| 48   | **fs.fsyncSync(fd)** 同步 fsync.                             |
| 49   | **fs.write(fd, buffer, offset, length[, position], callback)** 将缓冲区内容写入到通过文件描述符指定的文件。 |
| 50   | **fs.write(fd, data[, position[, encoding]], callback)** 通过文件描述符 fd 写入文件内容。 |
| 51   | **fs.writeSync(fd, buffer, offset, length[, position])** 同步版的 fs.write()。 |
| 52   | **fs.writeSync(fd, data[, position[, encoding]])** 同步版的 fs.write(). |
| 53   | **fs.read(fd, buffer, offset, length, position, callback)** 通过文件描述符 fd 读取文件内容。 |
| 54   | **fs.readSync(fd, buffer, offset, length, position)** 同步版的 fs.read. |
| 55   | **fs.readFile(filename[, options], callback)** 异步读取文件内容。 |
| 56   | **fs.readFileSync(filename[, options])**                     |
| 57   | **fs.writeFile(filename, data[, options], callback)** 异步写入文件内容。 |
| 58   | **fs.writeFileSync(filename, data[, options])** 同步版的 fs.writeFile。 |
| 59   | **fs.appendFile(filename, data[, options], callback)** 异步追加文件内容。 |
| 60   | **fs.appendFileSync(filename, data[, options])** The 同步 version of fs.appendFile. |
| 61   | **fs.watchFile(filename[, options], listener)** 查看文件的修改。 |
| 62   | **fs.unwatchFile(filename[, listener])** 停止查看 filename 的修改。 |
| 63   | **fs.watch(filename[, options][, listener])** 查看 filename 的修改，filename 可以是文件或目录。返回 fs.FSWatcher 对象。 |
| 64   | **fs.exists(path, callback)** 检测给定的路径是否存在。       |
| 65   | **fs.existsSync(path)** 同步版的 fs.exists.                  |
| 66   | **fs.access(path[, mode], callback)** 测试指定路径用户权限。 |
| 67   | **fs.accessSync(path[, mode])** 同步版的 fs.access。         |
| 68   | **fs.createReadStream(path[, options])** 返回ReadStream 对象。 |
| 69   | **fs.createWriteStream(path[, options])** 返回 WriteStream 对象。 |
| 70   | **fs.symlink(srcpath, dstpath[, type], callback)** 异步 symlink().回调函数没有参数，但可能抛出异常。 |

### Path

用于处理文件路径和目录路径的实用工具

```javascript
var path = require("path")
```

#### 方法



| 序号 | 方法 & 描述                                                  |
| :--- | :----------------------------------------------------------- |
| 1    | **path.normalize(p)** 规范化路径，注意'..' 和 '.'。          |
| 2    | **path.join([path1][, path2][, ...])** 用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是"/"，Windows系统是"\"。 |
| 3    | **path.resolve([from ...], to)** 将 **to** 参数解析为绝对路径，给定的路径的序列是从右往左被处理的，后面每个 path 被依次解析，直到构造完成一个绝对路径。 例如，给定的路径片段的序列为：/foo、/bar、baz，则调用 path.resolve('/foo', '/bar', 'baz') 会返回 /bar/baz。 `path.resolve('/foo/bar', './baz'); // 返回: '/foo/bar/baz' path.resolve('/foo/bar', '/tmp/file/'); // 返回: '/tmp/file' path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif'); // 如果当前工作目录为 /home/myself/node， // 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'` |
| 4    | **path.isAbsolute(path)** 判断参数 **path** 是否是绝对路径。 |
| 5    | **path.relative(from, to)** 用于将绝对路径转为相对路径，返回从 from 到 to 的相对路径（基于当前工作目录）。 在 Linux 上： `path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb'); // 返回: '../../impl/bbb'` 在 Windows 上： `path.relative('C:\\orandea\\test\\aaa', 'C:\\orandea\\impl\\bbb'); // 返回: '..\\..\\impl\\bbb'` |
| 6    | **path.dirname(p)** 返回路径中代表文件夹的部分，同 Unix 的dirname 命令类似。 |
| 7    | **path.basename(p[, ext])** 返回路径中的最后一部分。同 Unix 命令 bashname 类似。 |
| 8    | **path.extname(p)** 返回路径中文件的后缀名，即路径中最后一个'.'之后的部分。如果一个路径中并不包含'.'或该路径只包含一个'.' 且这个'.'为路径的第一个字符，则此命令返回空字符串。 |
| 9    | **path.parse(pathString)** 返回路径字符串的对象。            |
| 10   | **path.format(pathObject)** 从对象中返回路径字符串，和 path.parse 相反。 |



#### 属性



| 序号 | 属性 & 描述                                                  |
| :--- | :----------------------------------------------------------- |
| 1    | **path.sep** 平台的文件路径分隔符，'\\' 或 '/'。             |
| 2    | **path.delimiter** 平台的分隔符, ; or ':'.                   |
| 3    | **path.posix** 提供上述 path 的方法，不过总是以 posix 兼容的方式交互。 |
| 4    | **path.win32** 提供上述 path 的方法，不过总是以 win32 兼容的方式交互。 |





**一：path.basename(path[, ext])**



参数解析如下：
path: `string`
ext: `string` 可选的文件扩展名
返回：`string`

path.basename(filepath), 是获取路径的最后一部分。 可以看看如下代码：

```
const path = require('path');

console.log(path.basename("/node/base/path/xx/js/index.js"));

// 最后输出 index.js

console.log(path.basename("/node/base/path/xx/js")); // 输出js

console.log(path.basename("/node/base/path/xx/js/")); // js/ 带反斜杠，也一样输出js
```



1.1 获取文件名



如果只想获取文件名，不需要扩展名则可以使用第二个参数，第二个参数可以指定文件的扩展名；如下代码：



```
const path = require('path');

console.log(path.basename("/node/base/path/xx/js/index.js", '.js'));

// 最后输出 index
```



**二：path.extname(path)**



该方法返回path的扩展名，即从path的最后一部分中的最后一个.(句号)字符到字符串结束。如果path的最后一部分没有 . 或 path的文件名的第一个
字符是 . ，则返回一个空字符串。如下代码：

```
const path = require('path');

console.log(path.extname('index.html')); // .html

console.log(path.extname('index.coffee.md')); // .md

console.log(path.extname('index.')); // 返回 .

console.log(path.extname('index')); // 返回 ''

console.log(path.extname('.index')); // 返回 ''
```



如果path不是一个字符串，则抛出 TypeError; 如下：
console.log(path.extname(111)); // 抛出异常



**三：path.dirname(path)**



该方法返回一个path的目录名。如下代码：



```
const path = require('path');

const filepath = '/node/base/path/index.js';

console.log(path.dirname(filepath)); // 输出 /node/base/path
```



**四：path.parse(path)**
path.parse()方法返回一个对象，对象的属性表示path的元素。如下代码：

```
const path = require('path');
const filepath = '/node/base/path/index.js';
console.log(path.parse(filepath)); 
// 输出如下：
/*
  { 
    root: '/',
    dir: '/node/base/path',
    base: 'index.js',
    ext: '.js',
    name: 'index' 
  }
*/
```

**五：path.format(pathObject)**
该方法会从一个对象返回一个路径字符串，与pase.parse()相反。



当pathObject提供的属性有组合时，有些属性的优先级比其他的高；



  \1. 如果提供了pathObject.dir，则pathObject.root 会被忽略。
  \2. 如果提供了 pathObject.base存在，则pathObject.ext 和 pathObject.name 会被忽略；



如下代码：

```
const path = require('path');

// 如果提供了pathObject.dir，则pathObject.root 会被忽略。
const str = {
  root: '/ignored',
  dir: '/node/base/path',
  base: 'index.js',
  ext: '.js',
  name: 'index'
};

console.log(path.format(str)); // 输出 /node/base/path/index.js

// 如果没有提供了pathObject.dir，则pathObject.root 会使用。
const str2 = {
  root: '/',
  base: 'index.js',
  ext: '.js',
  name: 'index'
};

console.log(path.format(str2)); // 输出 /index.js

// 如果没有指定 'base', 则 'name' + 'ext' 会被使用

const str3 = {
  root: '/',
  ext: '.js',
  name: 'index'
};

console.log(path.format(str3)); // 输出 /index.js
```

**六：path.isAbsolute(path);**



该方法会判定path是否为一个绝对路径。如果给定的path是一个长度为零的字符串，则返回false. 如下代码：

```
const path = require('path');

console.log(path.isAbsolute('/xxx/yy')); // true
console.log(path.isAbsolute('/xxx/')); // true
console.log(path.isAbsolute('xxxx/')); // false
console.log(path.isAbsolute('.')); // false
```

**七：path.join([...paths])**
该方法使用特定的分隔符把全部给定的path片段链接到一起，并规范生成的路径。

如下代码：

```
const path = require('path');

console.log(path.join('/node', 'www', 'local', 'html', '')); 
// 输出 /node/www/local/html

console.log(path.join('node', 11122, 'www')); 
// 会报错，TypeError: Path must be a string. Received 11122
```

**八：path.relative(from, to)**
该方法返回从 from 到 to的相对路径(基于当前工作目录)。
如下代码：

```
const path = require('path');

console.log(path.relative('/data/xx/text/aa', '/data/xx/yyyy/bbb'));

// 输出  ../../yyyy/bbb
```

**九：path.resolve([from...], to);**

将to分解成一个绝对路径。
  如果to不是一个绝对路径的话，那么from会被优先考虑，直到找到一个绝对路径，如果在form内还没有找到绝对路径，就会使用当前的工作目录。
  当然如果 to 是一个绝对路径的话，那么直接返回该绝对路径。

如下代码：

```
const path = require('path');

// to 不是一个绝对路径，form优先被考虑，直到找到一个绝对路径
console.log(path.resolve('/foo/bar', './baz')); // 返回 /foo/bar/baz

// to 是一个绝对路径，那么久直接返回 to
console.log(path.resolve('/foo/bar', '/baz')); // 返回 /baz

// 如果 from 和 to 都不是一个绝对路径的话，就会使用当前的工作目录 + form + to
console.log(path.resolve('foo', 'bar'));  // 返回 /Users/tugenhua/个人demo/node0420/nodeUrl/foo/bar
```

### URL类
API:http://nodejs.cn/api/url.html

```js
const myUrl=new URL(input[, base])
```

| 属性 | 描述 |
| ---- | ---- |
|      |      |
|      |      |
|      |      |

由于GET请求直接被嵌入在路径中，URL是完整的请求路径，包括了?后面的部分，因此你可以手动解析后面的内容作为GET请求的参数。

url 模块中的 parse 函数可以用于解析url中的参数。

#### **url.parse(urlStr, [parseQueryString], [slashesDenoteHost])**

参数说明：

- **urlStr** - 需要接收的url字符串。
- **parseQueryString** - 为true时将使用查询模块分析查询字符串，默认为false。
- **shashesDenoteHost**    

     -默认为false，/foo/bar 形式的字符串将被解释成 { pathname: ‘//foo/bar' }

     -如果设置成true，/foo/bar 形式的字符串将被解释成 { host: ‘foo', pathname: ‘/bar' }

**urlcontent.js**

```
 1 var http = require('http');
 2 var url = require('url');
 3 var util = require('util');
 4 
 5 http.createServer(function (req, res) {
 6     res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
 7     res.write('url:'+req.url+'\n\n');
 8     res.write(util.inspect(url.parse(req.url, true))+'\n\n');
 9 
10     var params = url.parse(req.url, true).query;
11     res.write("name：" + params.name + '\n');
12     res.write("age：" + params.age + '\n');
13 
14     var pathname = url.parse(req.url, true).pathname;
15     res.write('pathname:' + pathname + '\n');
16 
17     var path = url.parse(req.url, true).path;
18     res.write('path:' + path);
19     res.end();
20 }).listen(3000);
```



我们在浏览器中输入以下地址：localhost:3000/user?name=dragon&age=18

显示结果如下：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202204291129832.png)

下面我们新建一个form表单，再来模拟一下。

**index.html**



```
 1 <html>
 2 <head>
 3     <title>test</title>
 4 </head>
 5 <body>
 6     <form action="http://localhost:3000" method="GET">
 7         <table border="0">
 8             <tr>
 9                 <td>username：</td>
10                 <td><input type="text" name="username"><br/></td>
11             </tr>
12             <tr>
13                 <td>password：</td>
14                 <td><input type="text" name="password"><br/></td>
15             </tr>
16             <tr>
17                 <td align="center" colspan="2"><input type="submit" name="" value="提交"></td>
18             </tr>
19         </table>
20     </form>
21 </body>
22 </html>
```



**server.js**



```
 1 var http = require("http");
 2 var url = require("url");
 3 var server = http.createServer(function (req, res) {
 4 
 5 var queryObj = url.parse(req.url, true).query;
 6 var username = queryObj.username;
 7 var password = queryObj.password;
 8  
 9 res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
10 res.write('server received form request:\n\n');
11 res.write('username:'+username+'\n\n'+'password:'+password);
12 res.end();
13 });
14 server.listen(3000);
```



运行server.js，然后打开index.html

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202204291129282.png)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202204291129614.png)

## package.json详解

转自:https://blog.csdn.net/weixin_44135121/article/details/91674772

### 前言

随着前端由多页面到单页面，由零散的文件到模块化开发，在一个完整的项目中，package.json 文件无处不在。首先，在项目根目录会有，其次在 node_modules 中也频现。那么这个文件到底是干嘛的，又有什么作用，今天给大家揭晓。

### 一、package.json 文件作用

package.json 文件其实就是对项目或者模块包的描述，里面包含许多元信息。比如项目名称，项目版本，项目执行入口文件，项目贡献者等等。npm install 命令会根据这个文件下载所有依赖模块。

### 二、package.json 文件创建

package.json 文件创建有两种方式，手动创建或者自动创建。

- 手动创建
  直接在项目根目录新建一个 package.json 文件，然后输入相关的内容。

- 自动创建
  也是在项目根目录下执行 npm init，然后根据提示一步步输入相应的内容完成后即可自动创建。

### 三、package.json 文件示例

```json
{
  "name": "exchange",
  "version": "0.1.0",
  "author": "zhangsan <zhangsan@163.com>",
  "description": "第一个node.js程序",
  "keywords":["node.js","javascript"],
  "private": true,
  "bugs":{"url":"http://path/to/bug","email":"bug@example.com"},
  "contributors":[{"name":"李四","email":"lisi@example.com"}],
  "repository": {
		"type": "git",
		"url": "https://path/to/url"
	},
  "homepage": "http://necolas.github.io/normalize.css",
  "license":"MIT",
  "dependencies": {
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-router-dom": "^5.0.1",
    "react-scripts": "3.0.1"
  },
  "devDependencies": {
    "browserify": "~13.0.0",
    "karma-browserify": "~5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "bin": {
  "webpack": "./bin/webpack.js"
  },
  "main": "lib/webpack.js",
  "module": "es/index.js",
  "eslintConfig": {
    "extends": "react-app"
  },
  "engines" : { 
    "node" : ">=0.10.3 <0.12" 
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "style": [
  "./node_modules/tipso/src/tipso.css"
],
  "files": [
    "lib/",
    "bin/",
    "buildin/",
    "declarations/",
    "hot/",
    "web_modules/",
    "schemas/",
    "SECURITY.md"
  ]
}

```

### 四、package.json 文件配置说明

1. name：项目/模块名称，长度必须小于等于214个字符，不能以"."(点)或者"_"(下划线)开头，不能包含大写字母。
2. version：项目版本。
3. author：项目开发者，它的值是你在https://npmjs.org网站的有效账户名，遵循“账户名<邮件>”的规则，例如：zhangsan zhangsan@163.com。
4. description：项目描述，是一个字符串。它可以帮助人们在使用npm search时找到这个包。
5. keywords：项目关键字，是一个字符串数组。它可以帮助人们在使用npm search时找到这个包。
6. private：是否私有，设置为 true 时，npm 拒绝发布。
7. license：软件授权条款，让用户知道他们的使用权利和限制。
8. bugs：bug 提交地址。
9. contributors：项目贡献者 。
10. repository：项目仓库地址。
11. homepage：项目包的官网 URL。
12. dependencies：生产环境下，项目运行所需依赖。
13. devDependencies：开发环境下，项目所需依赖。
14. scripts：执行 npm 脚本命令简写，比如 “start”: “react-scripts start”, 执行 npm start 就是运行 “react-scripts start”。
15. bin：内部命令对应的可执行文件的路径。
16. main：项目默认执行文件，比如 require(‘webpack’)；就会默认加载 lib 目录下的 webpack.js 文件，如果没有设置，则默认加载项目跟目录下的 index.js 文件。
17. module：是以 ES Module(也就是 ES6)模块化方式进行加载，因为早期没有 ES6 模块化方案时，都是遵循 CommonJS 规范，而 CommonJS 规范的包是以 main 的方式表示入口文件的，为了区分就新增了 module 方式，但是 ES6 模块化方案效率更高，所以会优先查看是否有 module 字段，没有才使用 main 字段。
    eslintConfig：EsLint 检查文件配置，自动读取验证。
18. engines：项目运行的平台。
19. browserslist：供浏览器使用的版本列表。
20. style：供浏览器使用时，样式文件所在的位置；样式文件打包工具parcelify，通过它知道样式文件的打包位置。
21. files：被项目包含的文件名数组。

## tsconfig.json详解

### tsconfig.json文件说明

一般在 `typescript` 的项目中，我们都能看到 `tsconfig.json` 这个文件，它指定了此项目的编译选项，也指定了此项目的根目录，因此这个文件一般也是在项目的根目录下。既然如此，就单单 `typescript` 项目而言，它的编译一般有以下几种方式：

- 命令行直接输入 `tsc` 命令不带任何参数进行编译：

  此时编译器会从当前目录开始查找 `tsconfig.json` 文件，如果当前目录没有发现该文件，则逐级向父级目录搜索。如果一直没有检索到该文件，编译器会给出使用提示。

- 命令行调用 `tsc` 带参数 `--project(或 -p)` 而指定一个目录：

  编译器直接在该目录下查找 `tsconfig.json` 文件，如果没找到则报错。

- 命令行调用 `tsc` 后直接指定文件：

  直接编译指定的文件。

#### 1. files

数组类型，用于表示由 `ts` 管理的 **文件** 的具体路径，可以是相对或绝对路径。这些文件内部有依赖的模块(或者引入了哪些模块)，编译器也会搜索到依赖模块进行编译。如果某些模块并没有在项目中引入，虽然在项目目录中也不会被编译。需要注意的是，`files` 中不支持 `glob` 匹配模式的路径。

#### 2. include 与 exclude

数组类型，`include` 用于表示 `ts` 管理的文件。`exclude`用于表示 `ts` 排除的文件(即不被编译的文件)。其中的文件列表可以使用 `glob` 匹配模式列表，支持的glob通配符有：

- `*` 匹配0或多个字符（不包括目录分隔符）
- `?` 匹配一个任意字符（不包括目录分隔符）
- `**/` 递归匹配任意子目录

**注意**，这三者的优先级是这样的：`files > exclude > include` 。如果不指定 `files` ，项目目录下的所有文件都会被编译器编译。如果同一个文件在三者中均指定，此文件一定会被编译器编译。而 `files` 中不指定而在 `exclude`、`include` 中同时指定的文件也会被编译，因为优先级是这样的 `exclude > include` 。另外，`exclude`默认情况下会排除`node_modules`，`bower_components`，`jspm_packages` 和 `outDir` 目录。

#### 3. compileOnSave

布尔类型，可以让 `IDE` 在保存文件的时候根据 `tsconfig.json` 重新生成编译后的文件。

#### 4. extends

字符串类型，该值是一个路径，指定另一个配置文件用于继承 `tsconfig.json` 中的配置。在原文件里的配置最先被加载，原文件里的配置被继承文件里的同名配置所重写。 如果发现循环引用，则会报错。

#### 5. typeAcquisition

对象类型，设置自动引入库类型定义文件。`acquisition` 翻译过来是 “获得物、获得” 的意思。在整个项目中，如果存在用`JavaScript`写的库，`ts` 会自动去 `compilerOptions.typeRoots` 指定的目录中寻找对应的类型声明文件。这个行为被称为 `typeAcquisition` (类型获得)。这个行为可以通过`enable`来开启或关闭，且以库级别来指定应用的范围。但我在实践中，通过指定 `enable` 的值去控制这个行为并未有明显的感官，即使使用 `vscode` 修改配置后重启也并未生效。

当我使用 `jquery` 做测试的时候，将 `enable` 设为 `false` 且下载了 `@types/jquery` 的时候，`vscode` 并未提示无法找到该声明，也无任何报错。但当我将其设为 `true`，且删除 `@types/jquery`时，`vscode` 仍未提示无法找到该声明，鼠标悬浮引入的 `jquery` 提示在全局的 `typescript/3.8/node_modules/@types/` 目录下找到了该声明。

这个配置项在平时的开发中并不常用，大家也不必深究。

#### 6. watchOptions

对象类型，`typescript3.8` 以上新增加的配置，用来配置使用哪种监听策略来跟踪文件和目录。由于 `tsc` 的监听文件机制依赖于 `node` 的 `fs.watch/fs.watchFile`。这两种方法的实现并不相同，前者是采用文件系统的事件做到通知，而后者使用轮询的机制。更多可以查阅 `node` 官方文档。

1. watchFile

   字符串类型，配置单个文件的监听策略，必须为一下几个值：

   - useFsEvents(默认)：采用系统的文件系统的原生事件机制监听文件更改
   - useFsEventsOnParentDirectory：采用系统的文件系统的原生事件机制监听修改文件所在的目录，这样修改一个文件实际上监听的是此文件所在的目录都被监听了，如此整个项目的文件监听器将显著减少，但可能导致监听并不准确。
   - dynamicPriorityPolling：创建一个动态队列去监听文件，修改频率较低的文件将被减少轮询监听的频率。
   - fixedPollingInterval：固定间隔的检查每个文件是否发生变化。
   - priorityPollingInterval：固定间隔的检查每个文件是否发生变化，但使用启发式监听的文件的检查频率要低于非启发式监听的文件。

2. watchDirectory

   字符串类型，配置监听目录的策略，必须为以下几个值：

   - useFsEvents(默认)
   - dynamicPriorityPolling
   - fixedPollingInterval

   以上三个和 `watchFile` 中相差不多

3. fallbackPolling

   当采用系统的文件系统中原生事件机制监听文件时，此选项指定本机的文件监听器被耗尽或者不支持本机文件监听器是编译器采用的轮询策略，可以设置为以下几个值：

   - fixedPollingInterval
   - dynamicPriorityPolling
   - priorityPollingInterval
   - synchronousWatchDirectory：禁用对目录的延迟监听。如果有大量的文件更改，比如在 `npm install` 时 `node_modules` 目录发生的变化，延迟监听是非常有用的。但总有些不常见的场景需要禁用延迟监听。

4. synchronousWatchDirectory

   布尔类型，是否对目录延迟监听。如果配置为 `true` ，当文件发生修改时同步的调用回调并更新目录监听器。

5. excludeFiles

   字符串数组，用于指定不需要被监听变化的文件

6. excludeDirectories

   字符串数组，用于指定不需要被监听变化的目录

#### 7. reference

> 项目引用是 `TypeScript` 3.0的新特性，它支持将 `TypeScript` 程序的结构分割成更小的组成部分。

这是 `typescript` 官网中的描述，那怎么理解这句话呢。我们通过一个场景认识新出这种的 `reference` 特性。

假设我们要开发一个类似于 `lodash` 的工具库，并在项目中使用，而且后期很有可能还要在业界推广。为了保证这个工具的顺利开发及推广，我们必须要做相应的单元测试。那这个工具库可以看做一个项目，对其中的每个功能的测试也可作为一个独立的项目。但整个过程中，工具库的开发和测试应该是属于同一个项目下 “分项目” 的。那这种情况下 `reference` 就很棒了。首先我们搭一个目录出来：

```jboss-cli
|---- src/
    |---- index.ts    // 整个工具库的入口
    |---- copyDeep.ts // 其中定义了copyDeep方法
|---- test/
    |---- copyDeep.test.ts // copyDeep的单元测试
|---- package.json
|---- tsconfig.json
```

在 `copyDeep.test.ts` 中肯定要引用 `src/copyDeep`，也就是说 `test` 的项目是依赖于 `src` 的。如果 `src` 中的代码发生了变化，整个工具库项目应该重新编译，而 `test` 项目不应该再被编译，这本来就是合理的。如果 `test` 项目中的代码发生了变化，那 `test` 项目应该被重新编译，而 `src` 项目不应该再被编译。如何在一个项目中配置而做到分别编译相应的子项目呢？首先最先想到的应该是在 `tsconfig.json` 文件中引入 `include` 字段配置，我们先尝试一下下面的配置：

```json
{
    "files": [
        "./src/index.ts"
    ],
    "include": [
        "./test/**/*.test.ts"
    ],
    "compilerOptions": {
        "outDir": "./dist/"
    }
}
```

我们来分析这样配置的会有哪些问题：

1. 首先，从整个项目层面，确实做到了修改任意文件重新编译的功能。但注意，编译的是全量的 `ts` 文件。
2. 随着日后项目的增大，在 `*.test.ts` 文件中引入也将逐渐变大。
3. 修改了 `src//**/*.ts` 的内容，`test/**/*.ts` 也将作为输出，这是我们不希望看到的。

此时，`reference` 将解决上述的每一个问题，我们修改项目结构如下：

```jboss-cli
|---- src/
    |---- index.ts        // 整个工具库的入口
    |---- copyDeep.ts     // 其中定义了copyDeep方法
    |---- tsconfig.json // 工具库的编译配置文件
|---- test/
    |---- copyDeep.test.ts     // copyDeep的单元测试
    |---- tsconfig.json     // 测试的编译配置文件
|---- package.json
|---- tsconfig.json
```

并修改为以下配置：

```json
// 根目录下的 /tsconfig.json
{
      "compilerOptions": {
        "declaration": true, // 为子项目生成.d.ts声明文件
        "outDir": "./dist",
      }
}

// src目录下的 /src/tsconfig.json
{
    "extends": "../tsconfig",
    "compilerOptions": {
        "composite": true // 必须设置为true，表明该文件夹为一个子项目
    }
}

// test目录下的 /src/tsconfig.json
{
    "extends": "../tsconfig",
    "references": [
        { "path": "../src" } // 表示引用了工具库项目
    ]
}
```

这样配置后，如果 `src` 项目已经编译完成并且输出了编译后的文件， 那在 `test` 项目中，实际加载的是 `src` 项目声明的 `.d.ts` 文件，而且这个声明文件是对 `test` 项目可见的。另外，如果开启了 `watch` 模式，修改了内容只会编译相应的项目而不会全量编译。这会显著的加速类型检查和编译，减少编辑器的内存占用。而且在代码结构层命有了一个很清晰的规划。

总结来讲，`refrence` 的作用是将两个项目关联起来作为一个项目开发，当某个项目代码修改后还能单独编译相应的项目而不是整个项目。再说的简单点，就是实现了关联项目间的懒编译。

#### 总结

本篇文章先到这里，总结一下：`tsconfig.json` 这个文件是用来界定 `ts` 项目的根目录，也用来配置 `tsc` 在编译 `ts` 文件时的一些选项。`files、exclude、include` 用来配置需要编译哪些文件；`compilerOnSave` 是指定 `IDE` 保存后是否重新编译的；`extends` 用来扩展当前的配置；扩展配置文件中的字段会覆盖当前文件的相同字段；`typeAcquisition` 用来指定某些库的类型声明文件，如：

```json
"typeAcquisition": {
  "jquery": "@/types/jquery"
}
```

`watchOptions` 用来配置 `tsc` 的监听策略；`reference` 指定关联项目，从而提高编译速度。





### **1、与文件相关的选项**

如果 tsconfig.json 中没有任何配置，编译器就会按照默认的配置编译当前目录下的所有 ts 文件，包括三种类型 ts, d.ts, tsx

```json
// tsconfig.json

{
  "files": [ // 数组，表示编译器需要编译的单个文件的列表
    "src/a.ts"  // 运行 tsc 命令时，只有 a.ts 被编译了
  ],
  "include": [ // 数组，表示编译器需要编译的文件或目录
    "src", // 会编译 src 目录下所有的 ts 文件
    "src/*", // 只会编译 src 一级目录下的 ts 文件
    "src/*/*", // 只会编译 src 二级目录下的 ts 文件
  ],
  "exclude": [ // 数组，表示编译器需要排除的文件或目录，默认会排除 node_modules 下的所有文件和所有的声明文件
    "src/lib", // 表示不会编译src下的lib目录
  ]
}
```

配置文件之间是可以继承的，可以把一些基础的配置抽离出来方便复用，然后通过 extends 选项来导入基础配置

```json
// tsconfig.base.json

{
  "files": [ // 数组，表示编译器需要编译的单个文件的列表
    "src/a.ts"  // 运行 tsc 命令时，只有 a.ts 被编译了
  ],
  "include": [ // 数组，表示编译器需要编译的文件或目录
    "src", // 会编译 src 目录下所有的 ts 文件
    "src/*", // 只会编译 src 一级目录下的 ts 文件
    "src/*/*", // 只会编译 src 二级目录下的 ts 文件
  ],
  "exclude": [ // 数组，表示编译器需要排除的文件或目录，默认会排除 node_modules 下的所有文件和所有的声明文件
    "src/lib", // 表示不会编译src下的lib目录
  ]
}
```

```json
// tsconfig.json

{
  "extends": "./tsconfig.base.json",
  // 还可以覆盖 tsconfig.base.json 中的配置
  "exclude": [], // 指定不排除任何目录
  "compileOnSave": true, // 保存文件时让编译器自动编译，vscode暂不支持
}
```



### **2、与编译相关的选项**

```json
// tsconfig.json

{
  "compilerOptions": {
    "incremental": true, // 增量编译，ts 编译器可以在第一次编译后生成一个可以存储编译信息的文件，
    // 在二次编译时会根据这个文件做增量编译，这样就可以提高编译的速度
    "tsBuildInfoFile": "./buildFile", // 增量编译文件的存储位置
    "diagnostics": false, // 打印诊断信息

    "target": "es5", // 目标语言的版本
    "module": "commonjs", // 生成代码的模块标准
    "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在 AMD 模块中
    // 指定 moudle 为 amd ，编译时会将多个 ts 文件合并打包成一个 js 文件

    "lib": [], // ts 需要引用的库，即声明文件。就算没有引用任何类库，当目标语言的版本是 es5 时
    // 也会默认引用 "dom", "es5", "scripthost"
    
    "allowJs": true, // 允许编译 JS 文件（js、jsx）
    "checkJs": true, // 允许指出在 JS 文件中的报错信息，通常与 allowJs 一起使用
    "outDir": "./out", // 指定输出目录（所有编译后的文件会存放于此目录中）
    "rootDir": "./", // 用来控制输出的目录结构（指定输入文件目录）

    "declaration": true, // 用于生成声明文件，如 index.ts -> index.d.ts
    "declarationDir": "./d", // 声明文件的路径
    "emitDeclarationOnly": true, // 只生成声明文件（不会生成 js 文件）
    "sourceMap": true, // 生成目标文件的 sourceMap，如 index.ts -> index.js.map
    "inlineSourceMap": true, // 生成目标文件的 inline sourceMap（包含在生成的 js 文件之中）
    "declarationMap": true, // 生成声明文件的 sourceMap，如 index.ts -> index.d.ts 和 index.d.ts.map
    "typeRoots": [], // 声明文件目录，默认 node_modules/@types
    "types": [], // 指定需要加载的声明文件的包，如果指定了某一个包，就会只加载这个包的声明文件

    "removeComments": true, // 删除注释

    "noEmit": true, // 不输出任何文件
    "noEmitOnError": true, // 发生错误时，不输出文件

    "noEmitHelpers": true, // 不生成 helper 函数，需额外安装 ts-helpers
    "importHelpers": true, // 通过 tslib 引入 helper 函数，文件必须是模块

    "downlevelIteration": true, // 降级遍历器的实现（es3/es5）

    "strict": true, // 开启所有严格的类型检查，为 true 时，下面类型检查相关的取值也都为 true
    "alwaysStrict": true, // 在代码中注入 "use strict"
    "noImplicitAny": true, // 不允许隐式的 any 类型
    "strictNullChecks": true, // 不允许把 null、undefined 赋值给其它类型变量
    "strictFunctionTypes": true, // 不允许函数参数双向协变
    "strictPropertyInitialization": true, // 类的实例属性必须初始化
    "strictBindCallApply": true, // 严格的 bind、call、apply 检查
    "noImplicitThis": true, // 不允许 this 有隐式的 any 类型

    "noUnusedLocals": true, // 检查只声明，未使用的局部变量
    "noUnusedParameters": true, // 检查未使用的函数参数
    "noFallthroughCasesInSwitch": true, // 防止 switch 语句贯穿（如果某一个分支没有 break，下面的分支将会依次执行）
    "noImplicitReturns": true, // 每个分支都要有返回值，如 if else 中都要有返回值

    "esModuleInterop": true, // 如果一个模块用 export = 导出， 既可以用 import from 导入，也可以用 import = 导入
    "allowUmdGlobalAccess": true, // 允许在模块中以全局变量的方式访问 UMD模块 
    "moduleResolution": "node", // 模块解析策略，默认 node，还可以用 classic
    "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
    "paths": { // 路径映射，相对于 baseUrl
      "jquery": ["node_modules/jquery/dist/jquery.slim.min.js"]
    },
    "rootDirs": ["src", "out"], // 将多个目录放在一个虚拟目录下，用于运行时

    "listEmittedFiles": true, // 打印输出的文件
    "listFiles": true, // 打印编译的文件（包括引用的声明文件）
  }
}
```

### classic 模块策略：



### node 模块策略：







### 配置文件

#### 常用配置

```json
tsconfig.json常用配置，tsconfig.json最全配置

// 常用配置

{

  /*

      tsconfig.json是ts编译器的配置文件，ts可以根据它的信息来对待吗进行编译 可以再tsconfig中写注释

      include : 用来指定哪些文件需要被编译

      exclude : 用来指定哪些文件不需要被编译 ：默认node_module

      extends : 用来指定继承的配置文件

      files   : 用来指定被编译的文件列表，只有编译少量文件才使用

      compilerOptions : 编译器的选项是配置文件中非常重要也是非常复杂的配置选项

  */

  "include":[

    // ** : 任意目录 ， * : 任意文件

    "./src/**/*"

  ],

  "exclude": [

    "./src/hello/**/*"

  ],

  // "extends": "./configs/base",

  "files": [

    "1.ts",

    // "2.ts"

  ],

  "compilerOptions": {

    // 用来指定 ES 版本 ESNext : 最新版。 'ES3', 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', 'ESNext'

    "target": "ES2020",

    // 指定要使用模块化的规范 : 'None', 'CommonJS', 'AMD', 'System', 'UMD', 'ES6'/'ES2015', 'ES2020' or 'ESNext'

    "module": "ESNext",

    // 用来指定项目中要使用的库 'ES5', 'ES6', 'ES2015', 'ES7', 'ES2016', 'ES2017', 'ES2018', 'ESNext', 'DOM', 'DOM.Iterable',

    //                          'WebWorker', 'ScriptHost', 'ES2015.Core', 'ES2015.Collection', 'ES2015.Generator', 'ES2015.Iterable', 

    //                          'ES2015.Promise', 'ES2015.Proxy', 'ES2015.Reflect', 'ES2015.Symbol', 'ES2015.Symbol.WellKnown', 

    //                          'ES2016.Array.Include', 'ES2017.object', 'ES2017.Intl', 'ES2017.SharedMemory', 'ES2017.String', 

    //                          'ES2017.TypedArrays', 'ES2018.Intl', 'ES2018.Promise', 'ES2018.RegExp', 'ESNext.AsyncIterable', 

    //                          'ESNext.Array', 'ESNext.Intl', 'ESNext.Symbol'

    // 运行在浏览器中不用设置，运行在node或其他中才需要设置

    // "lib":[]，

    // 用来指定编译后文件的存放位置

    "outDir":"./dist",

    // 将代码合并为一个文件,设置之后所有的全局作用域中的代码会合并到同一个文件中 但是只能在  'amd' and 'system' 中才能使用

    // "outFile": "./dist/app.js",

    // 是否对js文件进行编译，默认false

    "allowJs": false,

    // 是否检查js代码是否符合语法规范，默认false

    "checkJs": false,

    // 是否移除注释，默认false

    "removeComments":false,

    // 是否不生成编译后文件，默认false

    "noEmit": false,

    // 当有错误时是否生成文件，默认false

    "noEmitOnError": false,

    // 是否生成sourceMap，默认false  这个文件里保存的，是转换后代码的位置，和对应的转换前的位置。有了它，出错的时候，通过断点工具可以直接显示原始代码，而不是转换后的代码。

    "sourceMap":false,

    // 所有的严格检查的总开关，默认false

    "strict": false,

    // 编译后的文件是否开启严格模式，默认false

    "alwaysStrict": false,

    // 不允许隐式的any，默认false(允许)

    "noImplicitAny": false,

    // 不允许隐式的this，默认false(允许)

    "noImplicitThis": false,

    // 是否严格的检查空值，默认false 检查有可能为null的地方

    "strictNullChecks": true,

    // 是否严格检查bind、call和apply的参数列表，默认false  检查是否有多余参数

    "strictBindCallApply":false,

    // 是否严格检查函数的类型，

    "strictFunctionTypes":false,

    // 是否严格检查属性是否初始化，默认false

    "strictPropertyInitialization":false,

    // 是否检查switch语句包含正确的break，默认false

    "noFallthroughCasesInSwitch":false,

    // 检查函数没有隐式的返回值，默认false

    "noImplicitReturns":false,

    // 是否检查检查未使用的局部变量，默认false

    "noUnusedLocals":false,

    // 是否检查未使用的参数，默认false

    "noUnusedParameters":false,

    // 是否检查不可达代码报错，默认false   true，忽略不可达代码 false，不可达代码将引起错误

    "allowUnreachableCode":false

  }
}

```

#### 最全配置

https://www.tslang.cn/docs/handbook/compiler-options.html



### 参考资料

https://www.cnblogs.com/crack4/p/15189254.html



