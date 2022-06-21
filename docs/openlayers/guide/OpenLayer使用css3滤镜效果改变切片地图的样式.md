# Openlayers使用css3滤镜效果改变切坡地图的样式



转自:https://blog.csdn.net/weixin_40184249/article/details/95197642 

> css3有一个属性很好玩，filter(滤镜属性)，可以做一些图片的滤镜和ps相同的效果，但是还和ps效果有些差距，如何将filter滤镜属性用到OpenLayer中？下面讲一下如何让通过滤镜的效果来改变地图底图切片样式。

一、效果图
1、滤镜前

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190709151208714.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MDE4NDI0OQ==,size_16,color_FFFFFF,t_70)

在这里插入图片描述


2、滤镜后

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190709151015185.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MDE4NDI0OQ==,size_16,color_FFFFFF,t_70)

在这里插入图片描述


看了上面是不是感觉好神奇，我们竟然可以改变切片地图样式。二、css3的filter属性值

```javascript
1　　grayscale灰度

2　　sepia褐色（有种复古的旧照片感觉）

3　　saturate饱和度

4　　hue-rotate色相旋转

5　　invert反色

6　　opacity透明度

7　　brightness亮度

8　　contrast对比度

9　　blur模糊

10　　drop-shadow阴影
```

具体效果看https://www.cnblogs.com/zheshiyigemanong/p/6943205.html
　三、如何实现？

```javascript
       let baseLayer = new ol.layer.Tile({
            title: "base",
            source: new ol.source.OSM()
        });
       baseLayer.on('postcompose', function (event) {
            event.context.filter = "invert(100%)";
            console.log(event.context);
        });
```

单个图层，这个很重要，我们可以设置单个图层滤镜，使其能够突出的效果。
如果要设置多个filter属性，我们该如何做？（空格隔开）

```javascript
        baseLayer.on('postcompose', function (event) {
            event.context.filter = "sepia(120%) saturate(140%) hue-rotate(165deg) brightness(101%)";
            console.log(event.context);
        });
```