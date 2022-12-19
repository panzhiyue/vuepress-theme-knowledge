# JavaScript对象-Array

Array 对象用于在变量中存储多个值:

```javascript
var cars = ["Saab", "Volvo", "BMW"];
```

第一个数组元素的索引值为 0，第二个索引值为 1，以此类推。

更多有关 JavaScript Array 内容请参考 [JavaScript Array 对象手册](https://www.runoob.com/js/js-obj-array.html)。

## 属性列表

| 属性                                                         | 描述                             |
| :----------------------------------------------------------- | :------------------------------- |
| [constructor](https://www.runoob.com/jsref/jsref-constructor-array.html) | 返回创建数组对象的原型函数。     |
| [length](https://www.runoob.com/jsref/jsref-length-array.html) | 设置或返回数组元素的个数。       |
| [prototype](https://www.runoob.com/jsref/jsref-prototype-array.html) | 允许你向数组对象添加属性或方法。 |

## 方法列表

| 方法                                                         | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [concat()](http://www.w3school.com.cn/jsref/jsref_concat_array.asp) | 连接两个或更多的数组，并返回结果。                           |
| [join()](http://www.w3school.com.cn/jsref/jsref_join.asp)    | 把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。 |
| [pop()](http://www.w3school.com.cn/jsref/jsref_pop.asp)      | 删除并返回数组的最后一个元素                                 |
| [push()](http://www.w3school.com.cn/jsref/jsref_push.asp)    | 向数组的末尾添加一个或更多元素，并返回新的长度。             |
| [reverse()](http://www.w3school.com.cn/jsref/jsref_reverse.asp) | 颠倒数组中元素的顺序。                                       |
| [shift()](http://www.w3school.com.cn/jsref/jsref_shift.asp)  | 删除并返回数组的第一个元素                                   |
| [slice()](http://www.w3school.com.cn/jsref/jsref_slice_array.asp) | 从某个已有的数组返回选定的元素                               |
| [sort()](http://www.w3school.com.cn/jsref/jsref_sort.asp)    | 对数组的元素进行排序                                         |
| [splice()](http://www.w3school.com.cn/jsref/jsref_splice.asp) | 删除元素，并向数组添加新元素。                               |
| [toSource()](http://www.w3school.com.cn/jsref/jsref_tosource_array.asp) | 返回该对象的源代码。                                         |
| [toString()](http://www.w3school.com.cn/jsref/jsref_toString_array.asp) | 把数组转换为字符串，并返回结果。                             |
| [toLocaleString()](http://www.w3school.com.cn/jsref/jsref_toLocaleString_array.asp) | 把数组转换为本地数组，并返回结果。                           |
| [unshift()](http://www.w3school.com.cn/jsref/jsref_unshift.asp) | 向数组的开头添加一个或更多元素，并返回新的长度。             |
| [valueOf()](http://www.w3school.com.cn/jsref/jsref_valueof_array.asp) | 返回数组对象的原始值                                         |

## 方法

### concat

连接两个或更多的数组，并返回结果。

该方法不会改变现有的数组,而仅仅会返回被连接数组的一个副本。

**语法**

```javascript
array1.concat(array2,array3,array4.....arrayX)
```

**参数说明**

| 参数                              | 描述                                                         |
| :-------------------------------- | :----------------------------------------------------------- |
| *array2*, *array3*, ..., *arrayX* | 必需。该参数可以是具体的值，也可以是数组对象。可以是任意多个。 |
| 返回值                            | Array                                                        |

```javascript
//连接两个或更多的数组，并返回结果
var arr1 = [1, 2, 3, 4];
var arr2 = [6, 7, 8, 9];
var arr3 = [10, 11, 12, 13];

var array = arr1.concat(arr2, arr3);
//输出结果:1,2,3,4,6,7,8,9,10,11,12,13
document.write(array);
document.write("<br/>");
//输出结果:1,2,3,4
//concat不会改变现有的数组，而仅仅会返回被连接数组的一个副本。
document.write(arr1);
```

### copyWitin

从数组的指定位置拷贝元素到数组的另一个指定位置中。

**语法**

```javascript
array.copyWithin(target, start, end)
```

**参数说明**

| 参数     | 描述                                                         |
| :------- | :----------------------------------------------------------- |
| *target* | 必需。复制到指定目标索引位置。                               |
| *start*  | 可选。元素复制的起始位置。                                   |
| *end*    | 可选。停止复制的索引位置 (默认为 *array*.length)。如果为负值，表示倒数。 |





```javascript

```

### entries

entries() 方法把数组变成数组的迭代对象，该对象包含数组的键值对 (key/value)。

迭代对象中数组的索引值作为 key， 数组元素作为 value。

**语法**

```javascript
array.entries()
```

**参数说明**

没有参数

**示例**

```javascript
var array = ["a1", "a2", "a3"];
var a=array.entries();
//输出结果:
//[0, "a1"]
//[1, "a2"]
//[2, "a3"]
console.log(array);
//a并不是数组
console.log(a);
```

### every

every() 方法用于检测数组所有元素是否都符合指定条件（通过函数提供）。

every() 方法使用指定函数检测数组中的所有元素：

- 如果数组中检测到有一个元素不满足，则整个表达式返回 *false* ，且剩余的元素不会再进行检测。
- 如果所有元素都满足条件，则返回 true。

**注意：** every() 不会对空数组进行检测。

**注意：** every() 不会改变原始数组。

**语法**

```javascript
array.every(function(currentValue,index,arr), thisValue)
```

**参数说明**

| 参数                                | 描述                                                         |
| :---------------------------------- | :----------------------------------------------------------- |
| *function(currentValue, index,arr)* | 必须。函数，数组中的每个元素都会执行这个函数 函数参数: *currentValue*必须。当前元素的值，*index*可选。当前元素的索引值，*arr*可选。当前元素属于的数组对象 |
| *thisValue*                         | 可选。对象作为该执行回调时使用，传递给函数，用作 "this" 的值。 如果省略了 thisValue ，"this" 的值为 "undefined" |



**示例**

```javascript
var array = ["a1", "a2", "a3"];
var ages = [32, 33, 16, 40];

//输出结果true
var f1 = ages.every(function (value,index,originArr) {
    return value > 10;
});
document.write(f1);
document.write("<br/>");

//输出结果:false
var f2 = ages.every(function (value, index, originArr) {
    return value > 20;
});
document.write(f2);
document.write("<br/>");
```

### fill

fill() 方法用于将一个固定值替换数组的元素。

**语法**

```javascript
array.fill(value, start, end)
```

**参数说明**

| 参数    | 描述                                       |
| :------ | :----------------------------------------- |
| *value* | 必需。填充的值。                           |
| *start* | 可选。开始填充位置。                       |
| *end*   | 可选。停止填充位置 (默认为 *array*.length) |

**示例**

```javascript

```

## 扩展

### 删除数组中的重复项

**1. 此方法只适合删除相邻的重复元素（记得下标减1）**

```javascript
var array = [2, 3, 3, 5, 7, 7, 7, 9]
for(let i = 0;i < array.length; i++){
	if(array[i] == array[i+1]){
		array.splice(i,1)
		i--
	}
}
console.log(array)
```

**2. 定义一个额外数组**

```javascript
// 创建一个新的数组
let array = [2, 3, 1, 5, 7, 3, 7, 9]
let arr = []
array.forEach(element => {
  if (arr.indexOf(element) === -1) {
    arr.push(element)
  }
})
console.log(arr)
```

**3. 不增加额外数组**

```javascript
// 双向for循环，不增加额外数组 T=O(n2)
let array = [2, 3, 1, 5, 7, 3, 7, 9]
for (let i = 0; i < array.length; i++) {
  for (let j = i + 1; j < array.length; j++) {
    if (array[j] === array[i])
      array.splice(j, 1)
  }
}
console.log(array)
```

**4. ES6–Set方法**

```javascript
// 使用Set
let array = [2, 3, 1, 5, 7, 3, 7, 9]
let arr = []
let set = new Set
array.forEach(element =>
  arr = [...set.add(element)]
)
console.log(arr)
```

**5. ES6–Map方法**

```javascript
// 使用Map
let array = [2, 3, 1, 5, 7, 3, 7, 9]
let arr = []
let map = new Map
array.forEach(element => {
  if (!map.has(element)) {
    map.set(element, element)
    arr.push(element)
  }
})
console.log(arr)
```

