方法1:直接拼接html

```javascript
left.innerHTML = '<input  type="text" id="ddlData" onclick="console.log(arguments);WdatePicker({ readOnly: true, maxDate:\'%y-%M-%d\' })" />';
```

方法2:appendChild

```javascript
var input = document.createElement("input");
input.setAttribute("id", "id");
input.setAttribute("type", "text");
input.onclick = function () {
    WdatePicker({ skin: 'whyGreen', minDate: '1000-01-01', maxDate: '9999-12-31' });
};
left.appendChild(input);
```

会报错



![玖涯博客](http://localhost:4000/images/pasted-57.png)

玖涯博客


正确写法

```javascript
var input = document.createElement("input");
input.setAttribute("id", "id");
input.setAttribute("type", "text");
input.onclick = function () {
    WdatePicker({ skin: 'whyGreen', minDate: '1000-01-01', maxDate: '9999-12-31', el: input });
};
left.appendChild(input);
```

这个错误弄了好几个小时才解决,其实在官方示例文档中就有了,不过还是不明白为什么拼接html可以自动获取到el,动态绑定就无法获取到



![玖涯博客](http://localhost:4000/images/pasted-58.png)