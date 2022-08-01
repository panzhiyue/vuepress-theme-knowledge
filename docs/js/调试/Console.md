# Console

JS的Console函数与浏览器的Console(控制台)是JS非常强大的调试工具。

console.log可以在浏览器控制台输出JS对象

console.time,console.timeEnd可以在控制台输出函数执行时间

# 代码

```javascript
        var container;
        console.time();
        for(let i=0;i<1000000;i++)
        {
             container=document.getElementById("container");
        }
        console.timeEnd();

        console.log(container2);
```

### 查看结果

![image-20220801084931004](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010849032.png)

### 查看源码

除了输出结果，我们还能在右侧看到代码执行的位置，点击可以直接跳转到源码，在查找错误时更显强大。

![image-20220801084940322](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202208010849360.png)