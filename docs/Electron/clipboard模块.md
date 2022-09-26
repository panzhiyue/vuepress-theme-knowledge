# clipboard模块

> 所属: 主进程、渲染进程
> 功能: 在系统剪贴板上执行复制和粘贴操作。
> 需求: 复制一段文字

- **clipboard.writeText(text);** 复制一段文字text

```html
<body>
    激活码：
    <span id="code">wbrwihfhwhfhwuheruhwue</span>
    <button id="btn">复制激活码</button>

    <script>
      const { clipboard } = require('electron');

      const code = document.getElementById("code");
      const btn = document.getElementById("btn");

      btn.onclick = () => {
        clipboard.writeText(code.innerHTML);
        alert("复制成功");
      }
    </script>
  </body>
```