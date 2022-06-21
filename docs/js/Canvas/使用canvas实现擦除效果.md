

转自:https://www.cnblogs.com/libin-1/p/6734663.html

# 使用canvas实现擦除效果

> HTML5 的 canvas 元素使用 JavaScript 在网页上绘制图像。
> 画布是一个矩形区域，您可以控制其每一像素。
> canvas 拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。

html代码:

```html
<div class="container">
    <canvas id="canvas" width="200" height="50"></canvas>
    <div class="content">hello world</div>
</div>
```

设置一个父容器，里面包括canvas标签，用于遮罩，content用于显示擦除遮罩层之后的内容

**ps：设置canvas元素需要加上width和height属性，这样绘制的图形才能按照正常尺寸显示，否则在css里面设置宽高，虽然canvas标签的大小会正常显示，绘制的图形则会按照缺省宽高比例放大缩小，缺省的高度是300px，宽度是150px。**

创建context对象，getContext("2d") 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法
var canvas = document.getElementById(id);
var ctx=canvas.getContext('2d');

绘制一个能覆盖容器的矩形，rect() 方法创建矩形，fill()绘制图像，默认颜色为黑色，可以使用fillStyle属性设置其他颜色
ctx.rect(0,0,canvas.width,canvas.height);
ctx.fill();

图像绘制完成，下面是事件绑定，要实现擦除效果，pc上主要绑定鼠标事件，鼠标按下，启动擦除，鼠标松开，关闭擦除
canvas.addEventListener('mousedown', eventDown);
canvas.addEventListener('mouseup', eventUp);
canvas.addEventListener('mousemove', eventMove);

这里先设置一个变量，用以表示，鼠标是否处于按下的状态
var mousedown = false;

鼠标按下松开的事件比较简单，主要是设置状态参数

```html
function eventDown(e){
    e.preventDefault();
    mousedown=true;
}
 
function eventUp(e){
    e.preventDefault();
    mousedown=false;
}
```

鼠标滑动事件，鼠标滑过的地方，以圆形区域清除图形
首先设置ctx.globalCompositeOperation = 'destination-out';

globalCompositeOperation 属性设置或返回如何将一个源（新的）图像绘制到目标（已有）的图像上。
destination-out 在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的。
这个属性是在先后绘制图形情况下，设置两个图形的显示方式。
属性值如下

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206211019604.png)

具体显示效果，红色矩形是（新）目标图像。蓝色矩形是源（旧）图像:

*![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206211019598.png)*

 

鼠标移动函数

```javascript
function eventMove(e){
    e.preventDefault();
    if(mousedown) {
        var x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX || 0;
        var y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY || 0;
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 20);
        ctx.fill();
    }
}
```

arc() 方法创建弧/曲线（用于创建圆或部分圆），context.arc(x,y,r,sAngle,eAngle,counterclockwise);
ps：通过 arc() 来创建圆，请把起始角设置为 0，结束角设置为 2*Math.PI。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206211019586.png)

最终效果：

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202206211019562.png)

此方法只用于pc端，因为绑定的是鼠标事件，如果要在移动设备上也实现，需要绑定触摸事件
canvas.addEventListener('touchstart', eventDown);
canvas.addEventListener('touchend', eventUp);
canvas.addEventListener('touchmove', eventMove);

如果是触摸事件，返回的对象中没有直接的坐标相关信息，需要在changedTouches中去取到触摸事件对应的 Touch 对象。
if(e.changedTouches){
　　e=e.changedTouches[e.changedTouches.length-1];
}

完整代码：[ https://github.com/Martian1/erase.js](https://github.com/Martian1/erase.js)