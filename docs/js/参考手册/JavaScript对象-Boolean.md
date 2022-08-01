# JavaScript对象-Boolean

Boolean 对象用于转换一个不是 Boolean 类型的值转换为 Boolean 类型值 (true 或者false).

Boolean 对象完整教程, 请访问 [JavaScript Boolean 对象教程](https://www.runoob.com/js/js-obj-boolean.html)。

## 属性列表

| 属性                                                         | 描述                                  |
| :----------------------------------------------------------- | :------------------------------------ |
| [constructor](https://www.runoob.com/jsref/jsref-constructor-boolean.html) | 返回对创建此对象的 Boolean 函数的引用 |
| [prototype](https://www.runoob.com/jsref/jsref-prototype-boolean.html) | 使您有能力向对象添加属性和方法。      |

## 方法列表

| 方法                                                         | 描述                               |
| :----------------------------------------------------------- | :--------------------------------- |
| [toString()](https://www.runoob.com/jsref/jsref-tostring-boolean.html) | 把布尔值转换为字符串，并返回结果。 |
| [valueOf()](https://www.runoob.com/jsref/jsref-valueof-boolean.html) | 返回 Boolean 对象的原始值。        |

## 属性

### constructor

constructor 属性返回对创建此对象的 Boolean 函数的引用。

**语法**

```javascript
boolean.constructor
```



**示例**

```javascript
var myvar = new Boolean(1);
//输出结果:function Boolean() { [native code] }
console.log(myvar.constructor;)

```

### prototype

prototype 属性使您有能力向对象添加属性和方法。

当构造一个原型，所有的布尔对象默认都添加了属性或方法。

**注意：** Boolean.prototype 不是引用布尔值，但 Boolean() 对象是。

**注意：** Prototype是一个全局属性，这对于几乎全部的JavaScript对象。

**语法**

```javascript
Boolean.prototype.name=value
```



**示例**

```javascript
Boolean.prototype.myColor=function()
{
    if (this.valueOf()==true)
    {
        this.color="green";
    }
    else
    {
        this.color="red";
    }
}

var a=new Boolean(1);
a.myColor();
var b=a.color;
//输出结果:green
console.log(b);
```

## 方法

### toString

toString() 方法可把一个逻辑值转换为字符串，并返回结果。

**注意：**当需要把Boolean对象转换成字符串的情况JavaScript会自动调用此方法。

**语法**

```javascript
boolean.toString()
```

**参数说明**

没有参数

**返回值**

| 类型   | 描述                |
| :----- | :------------------ |
| String | "true" 或者 "false" |

**示例**

```javascript
var bool = new Boolean(1);
var myvar = bool.toString();
//输出结果:true
console.log(myvar);
```

### toString

valueOf() 方法可返回 Boolean 对象的原始值。

**语法**

```javascript
boolean.valueOf()
```

**参数说明**

没有参数

**返回值**

| 类型    | 描述               |
| :------ | :----------------- |
| Boolean | *true* 或者*false* |

**示例**

```javascript
var bool = new Boolean(0);
var myvar = bool.valueOf();
//输出结果:true
console.log(myvar);
```

