# JavaScript对象-Error

Error 对象在错误发生时提供了错误的提示信息。

## 属性

| 属性                                                         | 描述                           |
| :----------------------------------------------------------- | :----------------------------- |
| [name](https://www.runoob.com/jsref/prop-error-name.html)    | 设置或返回一个错误名           |
| [message](https://www.runoob.com/jsref/prop-error-message.html) | 设置或返回一个错误信息(字符串) |

## 非标准 Error 对象属性

**Mozilla 和 Microsoft定义了以下非标准 Error 对象属性：**

```
fileName (Mozilla)
lineNumber (Mozilla)
columnNumber (Mozilla)
stack (Mozilla)
description (Microsoft)
number (Microsoft)
```

不建议使用以上属性，因为不是所有浏览器都支持。