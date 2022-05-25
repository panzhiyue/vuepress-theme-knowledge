OpenLayers 3中提供了加载Bing地图的source [`ol.source.BingMaps`](https://link.jianshu.com/?t=http://openlayers.org/en/v3.13.1/apidoc/ol.source.BingMaps.html)，但是并不支持中文，构造函数的参数`culture`设置为中国是不行的，应该是Bing地图目前并没有提供中国区域的瓦片在线服务。但其实我们浏览Bing地图，看到的是中文版的地图。

那么能否直接加载我们看到的中文版的Bing地图呢？OpenLayers针对瓦片地图提供了`ol.source.XYZ`和对应的`ol.layer.Tile`，可以帮助我们加载，之前的离线瓦片地图就是通过这种方式加载的 。 下面用同样的方式，我尝试加载Bing地图，遇到了稍许麻烦，主要在Tile的url拼接上。下面直接上代码：

```javascript
<html>

<head>
  <title>演示在ol3中加载Bing在线地图</title>
  <link rel="stylesheet" type="text/css" href="ol3.7.0/ol.css">
  <script type="text/javascript" src="ol-debug.js" charset="utf-8"></script>
</head>

<body>
    <div id="map" style="width:100%;"></div>
    <script>
        
        // 创建地图
        new ol.Map({
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        wrapX: false,
                        tileUrlFunction: tileUrlFunction
                    })
                })
            ],
            view: new ol.View({
                center: [0, 0],
                zoom: 2
            }),
            target: "map"
        });
        
        // Bing在线地图的url构造函数
        function tileUrlFunction(coord, params1, params2) {
            return getVETileUrl(coord[0], coord[1], -coord[2] - 1);
        }
        
        function getVETileUrl(z, x, y) {
            for(var a="",c=x,d=y,e=0;e<z;e++) {
                a=((c&1)+2*(d&1)).toString()+a;
                c>>=1;
                d>>=1
            }
            return 'http://dynamic.t0.tiles.ditu.live.com/comp/ch/' + a + '?it=G,VE,BX,L,LA&mkt=zh-cn,syr&n=z&og=111&ur=CN'
        }
    </script>
</body>

</html>
```

上面是完整代码，复制到本地保存成页面，然后根据OpenLayers 3的库的位置，修改一下代码中的库位置，即可打开浏览看到中文版的Bing地图了。