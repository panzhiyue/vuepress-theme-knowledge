# less

### 参数

**定义参数**

```html
  <div
    class="group-box"
    :style="{
      '--borderColor': borderColor,
      '--borderWidth': borderWidth + 'px',
      '--borderStyle': dashed ? 'dashed' : 'solid',
      '--leftWidith': leftWidth,
      '--rightWidth': rightWidth,
    }"
  >
  </div>
```

**使用参数**

```less
.group-box {
  border: var(--borderWidth) var(--borderStyle) var(--borderColor);
  border-top: 0px;
  width: 200px;
  height: 200px;
}
```

### 参数2

```less
@bg: black;
@bg-light: boolean(luma(@bg) > 50%);

div {
  background: @bg; 
  color: if(@bg-light, black, white);
}
```





### 导入其他less文件

```less
@import "global/fonts.less";
```

