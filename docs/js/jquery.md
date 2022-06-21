# 1. **属性**

## 1.1. **属性**

### 1.1.1. **attr(name)**

取得属性值（第一个）

### 1.1.2. **attr(properties)**

设置多个属性值

### 1.1.3. **attr(key,value)**

设置一个属性值

### 1.1.4. **attr(key,fn)**

设置一个计算的属性值

### 1.1.5. **removeAttr(name)**

删除一个属性

### 1.1.6. **prop(propertyName)**

获取属性值(第一个元素)

### 1.1.7. **prop(key,value)**

设置一个属性值

### 1.1.8. **removeProp(propertyName)**

删除设置的属性

## 1.2. **类**

### 1.2.1. **addClass(class)**

添加类

### 1.2.2. **hasClass(class)**

元素集合至少有一个元素具有指定的class类,则返回true,否则返回false

### 1.2.3. **removeClass(class)**

删除指定的类

### 1.2.4. **toggleClass(class)**

如果存在(不存在)就删除(添加)一个类

### 1.2.5. **toggleClass(class,switch)**

在switch为true时添加一个类,为false时删除这个类

## 1.3. **HTML**

### 1.3.1. **html()**

取得元素的html内容(第一个元素,不能用于XML文档)

### 1.3.2. **html(val)**

设置元素的html内容(不能用于XML文档)

## 1.4. **文本**

### 1.4.1. **text()**

取得所有匹配元素的文本内容

### 1.4.2. **text(val)**

设置所有元素的文本内容

## 1.5. **值**

### 1.5.1. **val()**

取得元素当前值(第一个元素)

### 1.5.2. **val(val)**

设置元素的值

### 1.5.3. **val(val)**

设置所有的单选按钮,复选框和下拉框为指定的值

# 2. 筛选

## 2.1. **过滤**

### 2.1.1. **eq(index)**

取得指定位置的元素,index从0开始

### 2.1.2. **filter(expr)**

筛选出于指定表达式匹配的元素集合

### 2.1.3. **filter(fn)**

筛选出与指定函数返回值匹配的元素集合

### 2.1.4. **hasClass(class)**

元素集合中至少有一个元素含有指定class,则返回true,否则返回false

### 2.1.5. **is(expr)**

如果元素集合中至少有一个元素符合给定的表达式就返回true

### 2.1.6. **map(callback)**

将jQuery对象中的一组元素利用callback方法转换其值,然后添加到一个jQuery数组中

### 2.1.7. **not(expr)**

删除与指定表达式匹配的元素

### 2.1.8. **slice(start,[end])**

从元素集合中取得一个子集

### 2.1.9. **first()**

获取元素集合中第一个元素

### 2.1.10. **last()**

获取元素集合中最后一个元素

### 2.1.11. **has()**

保留包含特定后代的元素,去掉那些不含有指定后代的元素

## 2.2. **查找**

### 2.2.1. **children([expr])**

取得一个包含匹配的元素集合中每一个元素的所有子元素的元素集合

### 2.2.2. **closet([expr])**

从元素本身开始,向上级元素匹配，返回最先匹配的祖先元素

### 2.2.3. **find([expr])**

搜索所有与指定表达式匹配的元素

### 2.2.4. **next([expr])**

下一个同辈元素

### 2.2.5. **nextAll([expr])**

后面所有同辈元素

### 2.2.6. **offsetParent()**

最近的position位absolute或relative的祖先元素

### 2.2.7. **parent([expr])**

父元素

### 2.2.8. **parents([expr])**

祖先元素

### 2.2.9. **prev([expr])**

前一个同辈元素

### 2.2.10. **prevAll([expr])**

前面所有的同辈元素

### 2.2.11. **siblings([expr])**

所有同辈元素

### 2.2.12. **nextUtil([expr])**

后面第一个匹配的同辈元素

### 2.2.13. **parentsUtil([expr])**

第一个匹配的祖先元素

### 2.2.14. **prevUtil([expr])**

前面第一个匹配的同辈元素

## 2.3. **串联&其他**

### 2.3.1. **add(expr)**

把匹配的元素添加到元素集合

### 2.3.2. **andSelf()**

将前一个匹配的元素集合添加到当前的集合

### 2.3.3. **end()**

结束最近的"破坏性"操作，将元素集合恢复到前一个状态

### 2.3.4. **contents()**

获得子元素,包括文本和注释节点

# 3. 文档处理

## 3.1. **内部插入**

### 3.1.1. **append(content)**

向元素中追加内容

### 3.1.2. **appendTo(content)**

把元素追加到另一个元素

### 3.1.3. **prepend(content)**

在元素最顶部添加内容

### 3.1.4. **prependTo(content)**

把元素添加到另一个元素的最顶部

## 3.2. **外部插入**

### 3.2.1. **after(content)**

在元素后面添加内容(同辈)

### 3.2.2. **before(content)**

在元素前面添加内容(同辈)

### 3.2.3. **insertAfter(content)**

把元素添加到另一个元素的后面(同辈)

### 3.2.4. **insertBefore(content)**

把元素添加到另一个元素的前面(同辈)

## 3.3. **包裹**

### 3.3.1. **wrap(html)**

把每一个元素用其他html标记包裹

### 3.3.2. **wrap(elem)**

把每一个元素用其他元素包裹

### 3.3.3. **wrapAll(html)**

把所有元素用一个html标记包裹

### 3.3.4. **wrapAll(elem)**

把所有元素用一个元素包裹

### 3.3.5. **wrapInner(html)**

把每一个元素的子内容(包括文本节点)用一个html结构包裹

### 3.3.6. **wrapInner(elem)**

把每一个元素的子内容(包括文本节点)用一个元素结构包裹

### 3.3.7. **unwrap()**

将元素的父元素删除

## 3.4. **替换**

### 3.4.1. **replaceWith(content)**

把元素替换成指定的内容

### 3.4.2. **replaceAll(selector)**

用指定的内容替换元素

## 3.5. **删除**

### 3.5.1. **empty()**

删除子节点

### 3.5.2. **remove([expr])**

删除元素(包括方法)

### 3.5.3. **detach()**

删除元素(保留方法)

## 3.6. **复制**

### 3.6.1. **clone()**

复制元素(不包括事件)

### 3.6.2. **clone(true)**

复制元素(包括事件)

# 4. CSS

## 4.1. **CSS**

### 4.1.1. **css(name)**

第一个元素的样式属性

### 4.1.2. **css(name,value)**

设置一个样式属性值

### 4.1.3. **css(proerties)**

设置多个样式属性值

## 4.2. **定位**

### 4.2.1. **offset()**

获取第一个元素在当前窗口的相对偏移

### 4.2.2. **offset(cood)**

设置坐标

### 4.2.3. **offsetParent()**

返回最近被定位过的祖先元素

### 4.2.4. **position()**

获取相对父元素的偏移(第一个)

### 4.2.5. **scrollTop()**

滚动条顶部距离(第一个)

### 4.2.6. **scrollTop(val)**

设置滚动条顶部距离

### 4.2.7. **scrollLeft()**

滚动条左边距离(第一个)

### 4.2.8. **scrollLeft(val)**

设置滚动条左边距离

## 4.3. **高宽**

### 4.3.1. **height()**

获取高度(第一个,px)

### 4.3.2. **height(val)**

设置高度

### 4.3.3. **width()**

宽度(第一个,px)

### 4.3.4. **width(val)**

设置宽度

### 4.3.5. **innerHeight()**

内部高度(第一个,不包括border,包括padding)

### 4.3.6. **innerWidth()**

内部宽度(第一个,不包括border,包括padding)

### 4.3.7. **outerHeight([options])**

外部高度(第一个，默认包括border,padding)

### 4.3.8. **outerWidth([options])**

外部宽度(第一个，默认包括border,padding)

# 5. **效果**

## 5.1. **基本**

### 5.1.1. **show()****,****show(speed,[callback])**

显示所有匹配的元素

### 5.1.2. **hide()****,****hide(speed,[callback])**

隐藏所有匹配的元素

### 5.1.3. **toggle()****,****toggle(****[****switch****]****)****,****toggle(speed,[callback])**

在switch为true时显示,为false隐藏

 

## 5.2. **滑动**

### 5.2.1. **slideDown(speed,[callback])**

向下增大高度显示元素,执行函数

### 5.2.2. **slideUp(speed,[callback])**

向上减小高度隐藏元素,执行函数

### 5.2.3. **slideToggle(speed,[callback])**

通过高度变化切换元素可见性,执行函数

## 5.3. **淡入淡出**

### 5.3.1. **fadeIn(speed,[callback])**

通过不透明度实现元素的淡入效果,执行函数

### 5.3.2. **fadeOut(speed,[callback])**

通过不透明度实现元素的淡出效果,执行函数

### 5.3.3. **fadeTo(speed,opacity,[callback])**

将元素不透明度渐进调整到指定值,执行函数

### 5.3.4. **fadeToggle([duration],[easing],[callback])**

通过不透明度变化显示或隐藏元素,执行函数

## 5.4. **自定义**

### 5.4.1. **animate(params[,duration[,easing[,callback]]])**

用于创建自定义动画的函数

### 5.4.2. **animate(params,options)**

用于创建自定义动画的函数

### 5.4.3. **stop([clearQueue],[gotoEnd])**

停止所有在指定元素上正在运行的动画

### 5.4.4. **delay(duration,[queueName])**

设置一个延时来推迟执行队列中之后的项目

## 5.5. **设置**

### 5.5.1. **jQuery.fx.off**

用于全面禁止动画执行(效果将会立即展现出来)

### 5.5.2. **jQuery.fx.interval**

动画的频率(以毫秒为单位)

# 6. **实用项**

## 6.1. **浏览器及特性检测**

### 6.1.1. **jQuery.support**

用于插件和核心开发,方便了解不同浏览器的特性或错误

### 6.1.2. **jQuery.browser**

包含navigator.userAgent取得的标记信息

### 6.1.3. **jQuery.browser.version**

读取用户浏览器的版本信息

### 6.1.4. **jQuery.browser.boxModel**

检测用户浏览器针对当前页的显示是否基于w3ccss的盒模型

## 6.2. **数组和对象操作**

### 6.2.1. **jQuery.each(****collection****,callback)**

描述：通用的遍历方法,可用于遍历对象和数组

参数：

***\*collection:\****遍历的数组或对象

***\*callback(index,element):\****调用的函数

    ***\*index:\****元素在数组中的索引
    
    ***\*element:\****数组元素


​    

### 6.2.2. **jQuery.extend([deep],target,obj1,[objN])**

用一个或多个其他对象来扩展一个对象,返回被扩展的对象

### 6.2.3. **jQuery.grep(array,callback,[invert])**

使用过滤函数过滤数组元素

### 6.2.4. **jQuery.makeArray(obj)**

将一个类似数组的对象转化为数字对象

 

### 6.2.5. **jQuery.map(array,callback)**

描述：把数组的每个元素传递到callback函数,用函数返回值组成一个新的数组

参数

***\*array:\****传入的数组

***\*callback(\****element,index***\*)\****:处理每一个元素的函数

   ***\*element\****:数组元素

   ***\*index\****:元素在数组中的索引值

 

 

### 6.2.6. **jQuery.inArray(value,array)**

返回value在数组中的位置,如果没有找到,则返回-1

### 6.2.7. **jQuery.merge(first,second)**

合并两个数组

### 6.2.8. **jQuery.unique(array)**

删除元素数组中的重复元素

### 6.2.9. **jQuery.noop()**

传递一个空函数

### 6.2.10. **jQuery.proxy(function,content)**	

接受一个函数,然后返回一个新函数,并且这个新函数始终保持了特定的上下文语境

## 6.3. **测试操作**

### 6.3.1. **jQuery.isArray(obj)**

检测参数是否为数组

### 6.3.2. **jQuery.isFunction(obj)**

检测对象是否为function

### 6.3.3. **jQuery.type(obj)**

确定对象的类型

### 6.3.4. **jQuery.isEmptyObject(obj)**

检测对象是否为空(不包含任何属性)

### 6.3.5. **jQuery.isPlainObject(obj)**

检查对象是否是纯粹的对象(通过{}或new Object创建的)

### 6.3.6. **jQuery.isWindow(obj)**

确定参数是否为一个窗口(window对象)

### 6.3.7. **jQuery.isNumeric(value)**

确定参数是否是一个数字

## 6.4. **字符串操作**

### 6.4.1. **jQuery.trim(str)**

去掉字符串起始和结尾的空格

## 6.5. **URLs**

### 6.5.1. **jQuery.param(obj)**

序列化表单数组或对象(是.serialize()的核心代码)

### 6.5.2. **jQuery.parseJSON(json)**

接受一个标准格式的JSON字符串,并返回解析后的javaScript对象

### 6.5.3. **jQuery.parseXML(data)**

解析一个字符串到一个XML文件

 

 

 

## 6.6. **数据功能**

### 6.6.1. **data(name)**

返回元素上存储的相应名字的数据,可以用data(name,value)来设定

### 6.6.2. **removeData(name,value)**

从元素上移除存放的数据

### 6.6.3. **queue()**

获取第一个匹配元素函数队列的引用(返回一个函数数组)

### 6.6.4. **queue(callback)**

在匹配元素的函数队列末尾添加一个可执行函数

### 6.6.5. **dequeue()**

从函数队列中移除一个队列函数

### 6.6.6. **clearQueue([queueName])**

从队列中移除所有为执行的项

# 7. **其他对象**

## 7.1. **事件对象**

### 7.1.1. **currentTarget** 

在事件冒泡阶段中的当前DOM元素。

### 7.1.2. **target**

最初触发事件的DOM元素

### 7.1.3. **data**

在当前执行的处理器被绑定的时候,包含可选的数据传递给jQuery.fn.bind

### 7.1.4. **namespace**

当事件被触发时此属性包含指定的命名空间

### 7.1.5. **pageX**

鼠标相对文档的左边缘位置

### 7.1.6. **pageY**

鼠标相对文档的顶部边缘位置

### 7.1.7. **preventDefault()**

阻止默认事件行为的触发

### 7.1.8. **relatedTarget**

在事件中涉及的其他任何DOM元素

### 7.1.9. **result**

当前事件最后触发的那个函数的返回值,除非值是undefined

### 7.1.10. **stopImmediatePropagation()**

阻止剩余的事件处理函数执行并且防止事件冒泡到DOM树上

### 7.1.11. **stopPropagation()**

防止事件冒泡到DOM树上,也就是不触发任何前辈元素上的事件处理函数

### 7.1.12. **type**

返回事件的类型

### 7.1.13. **which**

针对键盘和鼠标事件,返回点击的键盘值或鼠标的左中右值

### 7.1.14. **isDefaultPrevented()**

数据事件对象中是否调用过event.preventDefault()方法来返回一个布尔值

### 7.1.15. **isImmediatePropagationStopped()**

数据事件对象中是否调用过event.stopPropagation()方法来返回一个布尔值