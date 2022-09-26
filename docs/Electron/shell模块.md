# shell模块

> 所属: 主进程、渲染进程
> 功能: 使用默认应用程序管理文件和 url
> 需求: 在用户的默认浏览器中打开 URL

- **shell.openExternal(href);** 在默认浏览器中打开href链接

```js
const { shell } = require('electron')
shell.openExternal('https://github.com')
```

打开子窗口，并接收子窗口的消息

```js
// 打开子窗口
window.open('popup.html');

// 接收信息
window.addEventListener('message', (msg) => {
  console.log(msg.data);
})
```

```html
// popup.html
<body>
    <h2>我是弹出子窗口</h2>
    <button id="pop-btn">向父窗口传递信息</button>
    <script>
      let btn = document.getElementById("pop-btn");
      btn.onclick = (e) => {
        window.opener.postMessage("我是子窗口传递过来的信息");
      }
    </script>
  </body>
```