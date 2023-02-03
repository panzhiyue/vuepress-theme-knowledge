



# JavaScript简介

JavaScript是一种专为与网页交互而设计的脚本语言，由下列三个不同的部分组成：

- ECMAScript：由ECMA-262定义，提供核心语言功能
- 文档对象模型（DOM）:提供访问和操作网页内容的方法和接口
- 浏览器对象模型（BOM）：提供与浏览器交互的方法和接口

## 学习资料

https://zh.javascript.info/

## 在HTML中使用JavaScript

### script元素

- async：可选。表示应该立即下载脚本，但不应妨碍页面中的其他操作，比如下载其他资源或等待加载其他脚本。只对外部脚本文件有效
- charset：可选。表示通过src属性指定的代码的字符集。由于大多数浏览器会忽略它的值，因此这个属性很少有人用。
- defer：可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。IE7及更早版本对嵌入脚本也支持这个属性。
- src：可选。表示包含要执行代码的外部文件
- type：可选。可以看成是labguage的替代属性；表示编写代码使用的脚本语言的内容类型（也称为MIME类型）。

#### 嵌入式

```javascript
<script type="text/javascript">
	function sayHi(){
		alert("Hi!");
	}
</script>
```

#### 外部文件

```javascript
<script type="text/javascript" src="example.js" />
```

#### 小结

无论如何包含代码，只要不存在defer和async属性，浏览器都会按照`<script>`元素在页面中出现的先后顺序对它们依次进行解析。

由于浏览器会先解析完不使用defer属性的`<script>`元素中的代码，然后再解析后面的内容。所以一般应该把`<script>`元素放在页面最后，即主要内容后面，`<body/>`标签前面。

# JavaScript学习资料



w3school:https://www.w3school.com.cn/jsref/dom_obj_all.asp



在线JavaScript编辑器:https://c.runoob.com/front-end/61/





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