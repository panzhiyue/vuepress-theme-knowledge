转自:https://www.crifan.com/gitbook_change_better_looking_theme/

换theme-comscore

```json
“plugins”: [

 “theme-comscore”,

]
```

效果：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/05bfc828ff3f338d28332acd502a8900.webp)

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/d4c363600a763462e26967ae16ac10d4.webp)

各级标题都有颜色了，好看多了。

另外突然发现，本身gitbook就有实时自动换样式的效果：

每个页面的顶部靠左边，有对应的A按钮，点击后，弹出框，可以更改样式：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/25dfa4194ee43ce13dbe28d9af713a20.webp)

默认是White：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/d7fdfcfd06bdfc74bf97aab2929e9c25.webp)

点击Sepia：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/f5ce61bf4ffa72c6eaad03d958159425.webp)

点击Night：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/f55bde6b9315d9f5e773605387a1346c.webp)

效果很赞。

【总结】

gitbook中，可以直接换成：

```
<code>"plugins": [
  "theme-comscore”,
]
</code>
```

即可换成，标题带蓝色的comscore的theme。

另外，对于每个页面中，都可以点击页面左上角的A，去切换不同样式：

- White：（默认的）白色背景
- Sepia：沙漠黄色背景
- Night：深色背景

也相当于换主题了。