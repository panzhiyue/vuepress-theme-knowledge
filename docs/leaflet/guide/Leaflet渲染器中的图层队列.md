[TOC]
# Leaflet渲染器中的图层队列

在开始之前先简单介绍下渲染器。

渲染器是Leaflet中用于渲染显示矢量数据的。API自带的渲染器有以下3种：

- L.Renderer:渲染器的基类，不进行实例化
- L.Canvas:使用Canvas渲染矢量数据
- L.SVG:使用SVG渲染矢量数据

渲染器中使用`_layers`字段存储图层对象。`key`值是`layer._leaflet_id`,`value`值是`layer`



![1630050027522](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202110291651236.png)

![1630050130545](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202110291651238.png)



使用`_drawLast`存储最后一个图层，使用`_drawFirst`指向第一个图层

每个添加到渲染器中的图层都会初始化一个_order对象

```javascript
layer._order={
	layer:layer,
	prev:this._drawLast,
	next:null
}
```

- layer:指向图层本身
- prev:指向上一个order对象
- next:指向下一个order对象

![image-20210827161815335](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202110291651239.png)



当我们要遍历图层时

```javascript
//从第一个一直next
let order=this._drawFirst;
while(order)
{
	order=order.next;
}

//从最后一个一直prev
let order=this._drawLast;
while(order)
{
	order=order.prev;        
}
```

当我们想从队列中删除某个图层

```javascript
	/**
	 * 移除图层
	 * 
	 * @param {L.Layer} layer
	 */
	_removePath: function (layer) {
		var order = layer._order;
		var next = order.next;
		var prev = order.prev;

		//不是最后一个
		if (next) {
			next.prev = prev;
		} else {  //是最后一个
			this._drawLast = prev;
		}

		//不是第一个
		if (prev) {
			prev.next = next;
		} else {  //是第一个
			this._drawFirst = next;
		}

		delete layer._order;

		delete this._layers[Util.stamp(layer)];
		//重新渲染
		this._requestRedraw(layer);
	}
```

```

```

当我们想把图层排序为最后，渲染在最上面

```javascript
_bringToFront: function (layer) {
		var order = layer._order;

		if (!order) { return; }

		var next = order.next;
		var prev = order.prev;

		if (next) {
			next.prev = prev;
		} else {
			// 已经是最后一个
			return;
		}
		if (prev) {
			prev.next = next;
		} else if (next) {
			// Update first entry unless this is the
			// single entry
			this._drawFirst = next;
		}

		//放到最后一个
		order.prev = this._drawLast;
		this._drawLast.next = order;

		order.next = null;
		this._drawLast = order;

		this._requestRedraw(layer);
	},
```

当我们想把图层排序为第一，渲染在最下面