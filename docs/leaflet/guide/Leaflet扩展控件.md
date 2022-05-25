[TOC]
---
title: Leaflet扩展控件
date: 2021-08-24
categories: 
- Leaflet
tags:
- GIS 
- Leaflet
cover: /images/cover/1.jpg
preview: 50

---





### Leaflet扩展控件

#### （1）L.Control

所有控件都是从L.Control扩展的,我们先看下源码

```javascript
/**
 * @class 
 * @inheritdoc
 * @classdesc
 * L.Control 是控件基类.
 * 所有其他控件都从此类扩展。
 * 有L.control快捷方法,不需要使用new
 * @api
 */
export var Control = Class.extend({
	options: {
		position: 'topright'
	},
	/**
	 * @memberof L​/Control​~Control.initialize
	 * 构造函数
	 * @param {Object} options
	 * @param {module:L/Control~Position} [options.position="topright"] 控件位置
	 * @api
	 */
	initialize: function (options) {
		Util.setOptions(this, options);
	},

	/**
	 * 获取控件的位置
	 * @return {module:L/Control~Position} 控件的位置
	 * @api
	 */
	getPosition: function () {
		return this.options.position;
	},


	/**
	 * 设置控件的位置
	 * @param {module:L/Control~Position} position 控件的位置
	 * @api
	 */
	setPosition: function (position) {
		var map = this._map;

		if (map) {
			map.removeControl(this);
		}

		this.options.position = position;

		if (map) {
			map.addControl(this);
		}

		return this;
	},

	/**
	 * 获取控件容器
	 * @return {Element} 控件容器
	 */
	getContainer: function () {
		return this._container;
	},

	/**
	 * 把控件添加到指定地图
	 * @param {module:L/Map} 地图
	 * @return {module:L/Control} this
	 */
	addTo: function (map) {
		//防止重复添加
		this.remove();
		//绑定地图
		this._map = map;
		//控件容器,根据控件位置一共有4个容器
		var container = this._container = this.onAdd(map),
		//控件位置
		    pos = this.getPosition(),
			//获取当前控件所在容器内的所有控件
		    corner = map._controlCorners[pos];

		DomUtil.addClass(container, 'leaflet-control');
		//控件位置在下方,则添加到第一个位置
		if (pos.indexOf('bottom') !== -1) {
			corner.insertBefore(container, corner.firstChild);
		} else { //如果不是,添加到最后一个位置
			corner.appendChild(container);
		}
		//地图unload时移除控件
		this._map.on('unload', this.remove, this);

		return this;
	},

	/**
	 * 从地图中移除控件
	 * @return {module:L/Control} this
	 */
	remove: function () {
		//先添加才有移除
		if (!this._map) {
			return this;
		}
		//移除控件节点
		DomUtil.remove(this._container);
		//触发onRemove事件
		if (this.onRemove) {
			this.onRemove(this._map);
		}
		//注销unload事件
		this._map.off('unload', this.remove, this);
		this._map = null;

		return this;
	},

	_refocusOnMap: function (e) {
		// if map exists and event is not a keyboard event
		if (this._map && e && e.screenX > 0 && e.screenY > 0) {
			this._map.getContainer().focus();
		}
	},
	/**
	 * @function onAdd
	 * @description
	 * 从“Control”继承的类必须实现onAdd(map)方法：用于创建控件dom节点,当调用addTo方法时会调用onAdd方法创建控件节点并添加到地图的控件容器中
	 * @param {module:L/Map} map 地图
	 * @return {HTMLElement} dom节点
	 */
	onAdd(map){

	},
	/**
	 * @function onRemove
	 * @description
	 * 可以选择性扩展onRemove(map)方法,在执行remove是触发
	 * @param {module:L/Map} map 地图
	 */
	onRemove(map){

	}

});

export var control = function (options) {
	return new Control(options);
};
```

#### （2）分析

要扩展控件,必须实现onAdd方法,用于创建控件节点,onRemove选择性实现,在remove时触发

#### （3）实现一个简单的控件

```javascript
/**
 * 鼠标跟随提示信息控件
 */
L.Control.MouseTips = L.Control.extend({
  options: {
    position: 'topleft',    //必须选topleft
    message: '鼠标提示信息！', //默认信息
    show: false   //默认不显示
  },

  /**
   * 添加到地图时触发
   * 1.创建控件
   * 2.绑定map的mousemove事件,实时更改控件位置
   * @param {module:L/Map} map 
   */
  onAdd: function (map) {
    this._container = L.DomUtil.create('div', 'leaflet-control-mousetips');
    L.DomEvent.disableClickPropagation(this._container);
    map.on('mousemove', this._onMouseMove, this);
    this._container.innerHTML = this.options.message;
    return this._container;
  },

  /**
   * 控件从地图移除时触发
   * 移除map的mousemove事件
   * @param {module:L/Map} map 
   */
  onRemove: function (map) {
    map.off('mousemove', this._onMouseMove,this)
  },

  /**
   * 鼠标在地图上移动时触发
   * 实时修改控件在屏幕中的位置
   * @param {MouseEvent} event 
   */
  _onMouseMove: function (event) {
    if (this.options.show) {
      this.show();
    } else {
      this.hide();
    }
    this._container.style.transform = 'translate3d(' + event.originalEvent.layerX + 'px, ' + event.originalEvent.layerY + 'px, 0px)';
  },
  /**
   * 设置内容
   * @param {string} message 鼠标跟随提示的内容
   */
  setMessage(message) {
    this.options.message = message;
    this._container.innerHTML = message;
  },

  /**
   * 获取内容
   * @return {string} 鼠标跟随提示的内容
   */
  getMessage() {
    return this.options.message;
  },

  /**
   * 显示
   */
  show() {
    this.options.show=true;
    this._container.style.display = "block";
  },

  /**
   * 隐藏
   */
  hide() {
    this.options.show=false;
    this._container.style.display = "none";
  },
  /**
   * 切换显示/隐藏
   */
  toggle(){
    if(this.options.show)
    {
      this.hide();
    }else{
      this.show();
    }
  }

});

/**
 * 1.给地图添加第一个参数mouseTipsControl用来控制创建地图时是否自动创建控件
 * true:创建地图时自动创建控件
 * false:创建地图时不自动创建控件
 * 2.给地图添加第二个参数mouseTipsOptions,用来设置当mouseTipsControl为true时控件的构造参数
 */
L.Map.mergeOptions({
  mouseTipsControl: false,
  mouseTipsOptions: {
    position: 'topleft',    //必须选topleft
    message: '鼠标提示信息！', //默认信息
    show: false   //默认不显示
  }
});

/**
 * 当mouseTipsControl的值为true时自动创建控件
 */
L.Map.addInitHook(function () {
  if (this.options.mouseTipsControl) {
    this.mouseTipsControl = new L.Control.MouseTips(this.options.mouseTipsOptions);
    this.addControl(this.mouseTipsControl);
  }
});

/**
 * 快捷方式
 * @param {*} options 
 * @returns 
 */
L.control.mouseTips = function (options) {
  return new L.Control.MouseTips(options);
};
```

## 源码地址

gitee:https://gitee.com/panzhiyue/leaflet-mousetips