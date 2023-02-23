# requestAnimationFrame与cancelAnimationFrame

## 学习资料

API：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame

https://www.jianshu.com/p/fa5512dfb4f5

https://www.cnblogs.com/xiaohuochai/p/5777186.html



在学习Leaflet源码的时候看到了这个函数，感觉很有意思所以研究一下

## 简介

这个函数在API里面介绍的很详细，我就简单概括一下。把浏览器当成一部电影，我们都知道电影是一帧一帧的图片组成的，而浏览器的帧率是60帧/秒。在每次刷新下一帧时都会执行一次`requestAnimationFrame`函数，大概16秒多一次。

## 语法

```javascript
//callback会被传入一个时间参数(ms)表示触发时间,在同一个帧中的多个回调函数，它们每一个都会接受到一个相同的时间戳，即使在计算上一个回调函数的工作负载期间已经消耗了一些时间。
let id=window.requestAnimationFrame(callback);

window.cancelAnimationFrame(id)
```

## 与计时器比较

传统的动画都是使用计时器实现的。requestAnimationFrame相对于计时器有什么优势呢。

很多人都把requestAnimationFrame称为神器，从机制与效率上都比计时器好。

但是根据我的实践发现requestAnimationFrame并没有这么好，设置有网友做了实验，在某些情况下计时器的效率比requestAnimationFrame高。https://www.cnblogs.com/silenttiger/p/3143785.html

我觉得requestAnimationFrame最大的优点在于可控性。它每次执行都是在页面重绘前，能保持动画的一致性。而计时器本职上是添加任务队列，多个计时器需要排队，长时间执行动画会发现结果与预期的不一样。可看示例3

## 示例1-简单执行

通过一下示例我们可以明确知道，requestAnimationFrame是60次/s

```javascript
        (function animloop(diffTime) {
            console.log(diffTime);
            window.requestAnimationFrame(animloop);
        })();
```



![image-20220801090104291](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010901324.png)

## 示例2-一个简单动画

下面我们分别用计时器与`requestAnimationFrame`实现一个简单动画，查看执行1000次所用时间，基本看不出什么区别

**计时器**

```html
<!doctype html>
<html lang="en">

<head>
    <title>Document</title>
    <style>
        #e {
            width: 100px;
            height: 100px;
            background: red;
            position: absolute;
            left: 0;
            top: 0;
            zoom: 1;
        }
    </style>
</head>

<body>
    <div id="e"></div>
    <script>
        var e = document.getElementById("e");
        var flag = true;
        var left = 0;
        let count = 0;
        function render() {
            count++;
            if (flag == true) {
                if (left >= 100) {
                    flag = false
                }
                e.style.left = ` ${left++}px`
            } else {
                if (left <= 0) {
                    flag = true
                }
                e.style.left = ` ${left--}px`
            }
        }
        var key = setInterval(function () {
            if (count == 1000) {
                console.log(performance.now());
                clearInterval(key);
                return;
            }
            render()
        }, 1000 / 60)

        // let id;

        // //requestAnimationFrame效果
        // (function animloop(diffTime) {
        //     if (count == 1000) {
        //         console.log(performance.now());
        //         window.cancelAnimationFrame(id);
        //         return;
        //     }
        //     render();
        //     id = window.requestAnimationFrame(animloop);
        // })();

    </script>
</body>

</html>
```

![image-20220801090114997](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010901026.png)

**requestAnimationFrame**

```html
<!doctype html>
<html lang="en">

<head>
    <title>Document</title>
    <style>
        #e {
            width: 100px;
            height: 100px;
            background: red;
            position: absolute;
            left: 0;
            top: 0;
            zoom: 1;
        }
    </style>
</head>

<body>
    <div id="e"></div>
    <script>
        var e = document.getElementById("e");
        var flag = true;
        var left = 0;
        let count = 0;
        function render() {
            count++;
            if (flag == true) {
                if (left >= 100) {
                    flag = false
                }
                e.style.left = ` ${left++}px`
            } else {
                if (left <= 0) {
                    flag = true
                }
                e.style.left = ` ${left--}px`
            }
        }
        // var key = setInterval(function () {
        //     if (count == 1000) {
        //         console.log(performance.now());
        //         clearInterval(key);
        //         return;
        //     }
        //     render()
        // }, 1000 / 60)

        let id;

        //requestAnimationFrame效果
        (function animloop(diffTime) {
            if (count == 1000) {
                console.log(performance.now());
                window.cancelAnimationFrame(id);
                return;
            }
            render();
            id = window.requestAnimationFrame(animloop);
        })();

    </script>
</body>

</html>
```

![image-20220801090132769](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010901799.png)

## 示例3-多动画

我们创建多个示例2的动画，执行一段时间之后，使用计时器的动画无法保持一致，而使用`requestAnimationFrame`动画还是保持一致

**计时器**

```html
<!doctype html>
<html lang="en">

<head>
    <title>Document</title>
    <style>
        .ani {
            width: 100px;
            height: 100px;
            background: red;
            position: absolute;
            left: 0;
            top: 0;
            zoom: 1;
        }
    </style>
</head>

<body>
    <div id="time"></div>
    <script>
        var timeContainer = document.getElementById("time");
        setInterval(function () {
            timeContainer.innerHTML = performance.now();
        }, 1000 / 60);
        function create() {
            var ani = document.createElement("div");
            ani.className = "ani";
            let left = 0;
            let flag = true;
            document.body.appendChild(ani);
            return function () {
                if (flag == true) {
                    if (left >= 1000) {
                        flag = false
                    }
                    ani.style.left = ` ${left++}px`
                } else {
                    if (left <= 0) {
                        flag = true
                    }
                    ani.style.left = ` ${left--}px`
                }
            }
        }

        for (let i = 0; i < 100; i++) {
            let render = create();
            setInterval(function () {
                render();
            }, 1000 / 60);
        }

    </script>
</body>

</html>
```

![image-20220801090144103](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010901149.png)

**requestAnimationFrame**

```html
<!doctype html>
<html lang="en">

<head>
    <title>Document</title>
    <style>
        .ani {
            width: 100px;
            height: 100px;
            background: red;
            position: absolute;
            left: 0;
            top: 0;
            zoom: 1;
        }
    </style>
</head>

<body>
    <div id="time"></div>
    <script>
        var timeContainer = document.getElementById("time");
        setInterval(function () {
            timeContainer.innerHTML = performance.now();
        }, 1000 / 60);
        function create() {
            var ani = document.createElement("div");
            ani.className = "ani";
            let left = 0;
            let flag = true;
            document.body.appendChild(ani);
            return function () {
                if (flag == true) {
                    if (left >= 1000) {
                        flag = false
                    }
                    ani.style.left = ` ${left++}px`
                } else {
                    if (left <= 0) {
                        flag = true
                    }
                    ani.style.left = ` ${left--}px`
                }
            }
        }

        for (let i = 0; i < 100; i++) {
            let render = create();
            (function animloop(diffTime) {
                render();
                id = window.requestAnimationFrame(animloop);
            })();

        }

    </script>
</body>

</html>
```

![image-20220801090152057](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010901104.png)

## 跨浏览器

```javascript
function getPrefixed(name) {
	return window['webkit' + name] || window['moz' + name] || window['ms' + name];
}
// fallback for IE 7-8
function timeoutDefer(fn) {
	var time = +new Date(),
	    timeToCall = Math.max(0, 16 - (time - lastTime));

	lastTime = time + timeToCall;
	return window.setTimeout(fn, timeToCall);
}
var requestFn = window.requestAnimationFrame || getPrefixed('RequestAnimationFrame') || timeoutDefer;
var cancelFn = window.cancelAnimationFrame || getPrefixed('CancelAnimationFrame') ||
		getPrefixed('CancelRequestAnimationFrame') || function (id) { window.clearTimeout(id); };

/**
 * 浏览器重绘时要执行fn方法。如果指定了context，
 * 则fn上下文绑定到 context。当设置了immediate，则如果浏览器不具备原生[`window.requestAnimationFrame`](https://developer.mozilla.org/docs/Web/API/window/requestAnimationFrame),立即执行fn。
 * 
 * 否则就延迟了,并返回可用于取消请求的请求 ID。
 */
function requestAnimFrame(fn, context, immediate) {
	if (immediate && requestFn === timeoutDefer) {
		fn.call(context);
	} else {
		return requestFn.call(window, bind(fn, context));
	}
}

/**
 * 取消之前的requestAnimFrame. 另请参阅[window.cancelAnimationFrame](https://developer.mozilla.org/docs/Web/API/window/cancelAnimationFrame).
 */
function cancelAnimFrame(id) {
	if (id) {
		cancelFn.call(window, id);
	}
}
```

## 注意事项

