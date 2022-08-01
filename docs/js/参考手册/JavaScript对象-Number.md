# JavaScript对象-Number

Number 对象是原始数值的包装对象。

Number 创建方式 new Number()。

## 语法

```javascript
var num = new Number(value);
```

**注意：** 如果一个参数值不能转换为一个数字将返回 NaN (非数字值)。

## 属性

| 属性                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [constructor](https://www.runoob.com/jsref/jsref-constructor-number.html) | 返回对创建此对象的 Number 函数的引用。                       |
| [MAX_VALUE](https://www.runoob.com/jsref/jsref-max-value.html) | 可表示的最大的数。                                           |
| [MIN_VALUE](https://www.runoob.com/jsref/jsref-min-value.html) | 可表示的最小的数。                                           |
| [NEGATIVE_INFINITY](https://www.runoob.com/jsref/jsref-negative-infinity.html) | 负无穷大，溢出时返回该值。                                   |
| [NaN](https://www.runoob.com/jsref/jsref-number-nan.html)    | 非数字值。                                                   |
| [POSITIVE_INFINITY](https://www.runoob.com/jsref/jsref-positive-infinity.html) | 正无穷大，溢出时返回该值。                                   |
| [prototype](https://www.runoob.com/jsref/jsref-prototype-num.html) | 允许您可以向对象添加属性和方法。                             |
| **ES6 新增 Number 属性**                                     | **描述**                                                     |
| EPSILON                                                      | 表示 1 和比最接近 1 且大于 1 的最小 Number 之间的差别        |
| MIN_SAFE_INTEGER                                             | 表示在 JavaScript中最小的安全的 integer 型数字 (`-(253 - 1)`)。 |
| MAX_SAFE_INTEGER                                             | 表示在 JavaScript 中最大的安全整数（`253 - 1`）。            |

### 方法

| 方法                                                         | 描述                                                 |
| :----------------------------------------------------------- | :--------------------------------------------------- |
| [isFinite](https://www.runoob.com/jsref/jsref-isfinite-number.html) | 检测指定参数是否为无穷大。                           |
| [toExponential(x)](https://www.runoob.com/jsref/jsref-toexponential.html) | 把对象的值转换为指数计数法。                         |
| [toFixed(x)](https://www.runoob.com/jsref/jsref-tofixed.html) | 把数字转换为字符串，结果的小数点后有指定位数的数字。 |
| [toPrecision(x)](https://www.runoob.com/jsref/jsref-toprecision.html) | 把数字格式化为指定的长度。                           |
| [toString()](https://www.runoob.com/jsref/jsref-tostring-number.html) | 把数字转换为字符串，使用指定的基数。                 |
| [valueOf()](https://www.runoob.com/jsref/jsref-valueof-number.html) | 返回一个 Number 对象的基本数字值。                   |
| **ES6 新增 Number 方法**                                     | **描述**                                             |
| isInteger                                                    | 用来判断给定的参数是否为整数。                       |
| isSafeInteger                                                | 判断传入的参数值是否是一个"安全整数"。               |

