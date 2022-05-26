

1.右键菜单

```javascript
    window.oncontextmenu = function (e) {
        e.preventDefault(); //阻止浏览器自带的右键菜单显示
        var menu = document.getElementById("right-menu");
        menu.style.display = "block"; //将自定义的“右键菜单”显示出来
        menu.style.left = e.clientX + "px";  //设置位置，跟随鼠标
        menu.style.top = e.clientY + "px";
        console.log(1291);
    }
```



### iframe

#### 1.获取子窗体属性

```javascript
$("#myFrame").get(0).contentWindow.name
```

#### 2.执行子窗口方法 

```javascript
var ie = IEVersion();
if (ie == 'ie') {
    window.frames["content_item_iframe_home"].drawIcon(coordinate);
} else {
    window.frames["content_item_iframe_home"].contentWindow.drawIcon(coordinate);
}

```

### select

#### 1.获取选中项的value

```javascript
$("#id").val()
```

#### 2.获取选中项的文本 

```c#
$("#id").find("option:selected").text()
```

#### 3.获取选中的索引

```javascript
 $("#id").get(0).selectedIndex;
```



#### 4.设置选中的索引

```javascript
$("#id").get(0).selectedIndex=index;//index为索引值
```



#### 5.设置选中的value

```javascript
$("#id").attr("value","normal“);
$("#id").val("normal");
$("#id").get(0).value = value;
```

#### 6.设置选中的 text 

```javascript
var count=$("#id option").length;
	for(var i=0;i<count;i++)
		{
            if($("#id ").get(0).options[i].text == text)
            {
                $("#id").get(0).options[i].selected = true;
                break;
            }
        }
$("#id option[text='jquery']").attr("selected", true);
```



#### 6.设置 option项:

```javascript
    $("#select_id").append("<option value='value'>text</option>");  //添加一项option
    $("#select_id").prepend("<option value='0'>请选择</option>"); //在前面插入一项option
    $("#select_id option:last").remove(); //删除索引值最大的option
    $("#select_id option[index='0']").remove();//删除索引值为0的option
    $("#select_id option[value='3']").remove(); //删除值为3的option
    $("#select_id option[text='4']").remove(); //删除text值为4的option
```

### url

#### 1.中文乱码

```javascript
encodeURI('XXX')--把非英文字符转化为英文编码

decodeURI('XXX')--把转化后的英文编码转化回来
```