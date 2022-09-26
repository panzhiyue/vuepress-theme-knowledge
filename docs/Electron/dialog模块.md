# dialog模块

> 所属: 主进程
> 功能: 显示用于打开和保存文件、警报等的本机系统对话框。
> 需求: 创建一个警告消息

```js
dialog.showMessageBox({
          type: "warning",
          title: "警告消息title",
          message: "我是message",
          buttons: ["收到", "忽略"]
        }).then(result => {
          console.log(result.response)  // 数组下标
        }).catch(err => {
          console.log(err);
        })
```

打开文件

```html
<button id="btn">打开图片</button>
<img id="img" style="width: 100%;" src="" alt="">
```

```js
let btn = document.getElementById("btn");
      btn.onclick = () => {
        dialog.showOpenDialog({
          title: "请选择照片",
          defaultPath: "bg.jpg",
          filters: [
            {
              name: "img",
              extensions: ['jpg', "png"], // 只选择jsp, png
              buttonLabel: "确认"
            }
          ]
        }).then(result => {
          console.log(result);
          let img = document.getElementById("img");
          img.setAttribute("src", result.filePaths[0])
        }).catch(err => {
          console.log(err);
        })
      }
```

保存一个文件

```js
dialog.showSaveDialog({
          title: "保存"
        }).then(result => {
          console.log(result);
          fs.writeFileSync(result.filePath, "aaa")
        }).catch(err => {
          console.log(err);
        })
```