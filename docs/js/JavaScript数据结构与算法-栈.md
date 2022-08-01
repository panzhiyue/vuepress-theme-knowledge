# 数据结构与算法-栈

## 简介

栈是一种遵从**后进先出(LIFO)**原则的有序集合。新添加的或待删除的元素都保存在栈的末尾，称作栈顶，另一端就叫栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底。

## 定义栈

```javascript
        function Stack() {
            var items = [];
            /**
             * 添加一个(或几个)新元素到栈顶
             * @param {*|Array.<*>} element
             */
            this.push = function (element) {
                items.push(element);
            }

            /**
             * 移除栈顶的元素，同时返回被移除的元素
             * @return {*} 
             */
            this.pop = function () {
                return items.pop();
            }

            /**
             * 返回栈顶的元素，不对栈做如何修改（这个方法不会移除栈顶的元素，仅仅返回它）
             * @return {*}
             */
            this.peek = function () {
                return items[items.length - 1]
            }

            /**
             * 如果栈里没有任何元素就返回true,否则返回false
             * @return {boolean}
             */
            this.isEmpty = function () {
                return items.length == 0;
            }

            /**
             * 返回栈里的元素个数。这个方法和数组的length属性很类似
             * @return {number}
             */
            this.size = function () {
                return items.length;
            }

            /**
             * 移除栈里所有的元素
             */
            this.clear = function () {
                items = [];
            }

            /**
             * 把栈里的元素都输出到控制台
             */
            this.print = function () {
                console.log(items.toString());
            }
        }
```

# 测试

```javascript
		var stack=new Stack();
        console.log(stack.isEmpty());  //true

        stack.push(5);
        stack.push(8);

        console.log(stack.peek());  //8
        stack.push(11);
        console.log(stack.size());  //3
        console.log(stack.isEmpty());  //false
        stack.push(15);

        stack.pop();
        stack.pop();
        console.log(stack.size());  //2
        stack.print();  //[5,8]
```

# 完整代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JS数据结构与算法-栈</title>
</head>

<body>
    <div></div>
    <script>
        function Stack() {
            var items = [];
            /**
             * 添加一个(或几个)新元素到栈顶
             * @param {*|Array.<*>} element
             */
            this.push = function (element) {
                items.push(element);
            }

            /**
             * 移除栈顶的元素，同时返回被移除的元素
             * @return {*} 
             */
            this.pop = function () {
                return items.pop();
            }

            /**
             * 返回栈顶的元素，不对栈做如何修改（这个方法不会移除栈顶的元素，仅仅返回它）
             * @return {*}
             */
            this.peek = function () {
                return items[items.length - 1]
            }

            /**
             * 如果栈里没有任何元素就返回true,否则返回false
             * @return {boolean}
             */
            this.isEmpty = function () {
                return items.length == 0;
            }

            /**
             * 返回栈里的元素个数。这个方法和数组的length属性很类似
             * @return {number}
             */
            this.size = function () {
                return items.length;
            }

            /**
             * 移除栈里所有的元素
             */
            this.clear = function () {
                items = [];
            }

            /**
             * 把栈里的元素都输出到控制台
             */
            this.print = function () {
                console.log(items.toString());
            }

        }

        var stack=new Stack();
        console.log(stack.isEmpty());  //true

        stack.push(5);
        stack.push(8);

        console.log(stack.peek());  //8
        stack.push(11);
        console.log(stack.size());  //3
        console.log(stack.isEmpty());  //false
        stack.push(15);

        stack.pop();
        stack.pop();
        console.log(stack.size());  //2
        stack.print();  //[5,8]

    </script>
</body>
</html>
```

