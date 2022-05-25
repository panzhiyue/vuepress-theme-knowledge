[TOC]
# Leaflet源码-GridLayer



本文主要研究L.GridLayer源码。简化了GridLayer浏览器兼容，错误处理等代码，保留主干，主要是便于理解。

## 1.创建一个简单图层

```javascript
        L.GridLayerStudy = L.Layer.extend({
            initialize: function (options) {
                L.Util.setOptions(this, options);
            },
            /**
             * 图层添加到地图
             */
            onAdd: function () {
                this._initContainer();
            },
            /**
             * 图层从地图移除
             */
            onRemove() {
                L.DomUtil.remove(this._container);
            },

            /**
             * 初始化瓦片容器
             */
            _initContainer: function () {
                if (this._container) { return; }

                this._container = L.DomUtil.create('div', 'leaflet-layer ' + (this.options.className || ''));

                this.getPane().appendChild(this._container);
            }
        });
```

这段代码只创建一个图层容器，然后添加到指定窗口

## 2.添加网格图层必须的参数

```javascript
        L.GridLayerStudy = L.Layer.extend({
            options: {
                pane: 'tilePane',
                tileSize: 256,
                minZoom: 0,
                maxZoom: undefined,
                keepBuffer: 2
            },
            initialize: function (options) {
                L.Util.setOptions(this, options);
            },
            /**
             * 图层添加到地图
             */
            onAdd: function () {
                this._initContainer();
            },
            /**
             * 图层从地图移除
             */
            onRemove() {
                L.DomUtil.remove(this._container);
            },

            /**
             * 初始化瓦片容器
             */
            _initContainer: function () {
                if (this._container) { return; }

                this._container = L.DomUtil.create('div', 'leaflet-layer ' + (this.options.className || ''));

                this.getPane().appendChild(this._container);
            },

            /**
             * 获取瓦片大小
             * @return {L.Point}
             */
            getTileSize() {
                var s = this.options.tileSize;
                return s instanceof L.Point ? s : new L.Point(s, s);
            },

        });
```

## 3.添加当前层级容器

```javascript
        L.GridLayerStudy = L.Layer.extend({
            options: {
                pane: 'tilePane',
                tileSize: 256,
                minZoom: 0,
                maxZoom: undefined,
                keepBuffer: 2
            },
            initialize: function (options) {
                L.Util.setOptions(this, options);
            },
            /**
             * 图层添加到地图
             */
            onAdd: function () {
                this._initContainer();
                //保存每个层级的容器
                this._levels = {};
                //保存瓦片对象
                this._tiles = {};
                this._setView(this._map.getCenter(), this._map.getZoom());
            },
            /**
             * 图层从地图移除
             */
            onRemove() {
                L.DomUtil.remove(this._container);
            },

            /**
             * 初始化瓦片容器
             */
            _initContainer: function () {
                if (this._container) { return; }

                this._container = L.DomUtil.create('div', 'leaflet-layer ' + (this.options.className || ''));

                this.getPane().appendChild(this._container);
            },

            /**
             * 获取瓦片大小
             * @return {L.Point}
             */
            getTileSize() {
                var s = this.options.tileSize;
                return s instanceof L.Point ? s : new L.Point(s, s);
            },

            /**
             * 设置视图
             * @param {L.LatLng} center 中心点
             * @param {number} zoom 地图缩放级别
             */
            _setView: function (center, zoom) {
                //计算瓦片级别，区别于地图缩放级别(地图缩放级别可配置为浮点数)
                var tileZoom = Math.round(zoom);

                //瓦片级别修改
                if (tileZoom !== this._tileZoom) {
                    //更新瓦片级别
                    this._tileZoom = tileZoom;

                    //更新levels
                    this._updateLevels();
                }
            },

            /**
             * 更新层级容器
             */ 
            _updateLevels: function () {

                var zoom = this._tileZoom;
                var maxZoom = 20;
                if (zoom === undefined) { return undefined; }

                //获取当前层级瓦片对象
                var level = this._levels[zoom],
                    map = this._map;

                //层级对象不存在则创建
                if (!level) {
                    level = this._levels[zoom] = {};

                    level.el = L.DomUtil.create('div', 'leaflet-tile-container leaflet-zoom-animated', this._container);
                    level.el.style.zIndex = maxZoom;

                    level.origin = map.project(map.unproject(map.getPixelOrigin()), zoom).round();
                    level.zoom = zoom;
                }

                this._level = level;

                return level;
            }
        });
        
```

## 4.添加瓦片

```javascript
        L.GridLayerStudy = L.Layer.extend({
            options: {
                pane: 'tilePane',
                tileSize: 256,
                minZoom: 0,
                maxZoom: undefined,
                keepBuffer: 2
            },
            initialize: function (options) {
                L.Util.setOptions(this, options);
            },
            /**
             * 图层添加到地图
             */
            onAdd: function () {
                this._initContainer();
                //保存每个层级的容器
                this._levels = {};
                //保存瓦片对象
                this._tiles = {};
                this._setView(this._map.getCenter(), this._map.getZoom());
            },
            /**
             * 图层从地图移除
             */
            onRemove() {
                L.DomUtil.remove(this._container);
            },

            /**
             * 初始化瓦片容器
             */
            _initContainer: function () {
                if (this._container) { return; }

                this._container = L.DomUtil.create('div', 'leaflet-layer ' + (this.options.className || ''));

                this.getPane().appendChild(this._container);
            },

            /**
             * 获取瓦片大小
             * @return {L.Point}
             */
            getTileSize() {
                var s = this.options.tileSize;
                return s instanceof L.Point ? s : new L.Point(s, s);
            },

            /**
             * 设置视图
             * @param {L.LatLng} center 中心点
             * @param {number} zoom 地图缩放级别
             */
            _setView: function (center, zoom) {
                //计算瓦片级别，区别于地图缩放级别(地图缩放级别可配置为浮点数)
                var tileZoom = Math.round(zoom);

                //瓦片级别修改
                if (tileZoom !== this._tileZoom) {
                    //更新瓦片级别
                    this._tileZoom = tileZoom;

                    //更新levels
                    this._updateLevels();
                    //计算当前层级全球瓦片范围
                    this._resetGrid();

                    this._update(center);
                }
            },

            /**
             * 更新层级容器
             */
            _updateLevels: function () {

                var zoom = this._tileZoom;
                var maxZoom = 20;
                if (zoom === undefined) { return undefined; }

                //获取当前层级瓦片对象
                var level = this._levels[zoom],
                    map = this._map;

                //层级对象不存在则创建
                if (!level) {
                    level = this._levels[zoom] = {};

                    level.el = L.DomUtil.create('div', 'leaflet-tile-container leaflet-zoom-animated', this._container);
                    level.el.style.zIndex = maxZoom;

                    level.origin = map.project(map.unproject(map.getPixelOrigin()), zoom).round();
                    level.zoom = zoom;
                }

                this._level = level;

                return level;
            },

            //计算当前层级全球瓦片范围
            _resetGrid: function () {
                var map = this._map,
                    crs = map.options.crs,
                    tileSize = this._tileSize = this.getTileSize(),
                    tileZoom = this._tileZoom;

                this._wrapX = crs.wrapLng && !this.options.noWrap && [
                    Math.floor(map.project([0, crs.wrapLng[0]], tileZoom).x / tileSize.x),
                    Math.ceil(map.project([0, crs.wrapLng[1]], tileZoom).x / tileSize.y)
                ];
                this._wrapY = crs.wrapLat && !this.options.noWrap && [
                    Math.floor(map.project([crs.wrapLat[0], 0], tileZoom).y / tileSize.x),
                    Math.ceil(map.project([crs.wrapLat[1], 0], tileZoom).y / tileSize.y)
                ];
            },

            // 根据地图边界在网格的活动缩放级别中加载分幅的私有方法
            _update: function (center) {
                var map = this._map;
                if (!map) { return; }
                var zoom = map.getZoom();

                if (center === undefined) { center = map.getCenter(); }
                if (this._tileZoom === undefined) { return; }	// if out of minzoom/maxzoom

                var pixelBounds = this._getTiledPixelBounds(center),  //图层像素范围
                    tileRange = this._pxBoundsToTileRange(pixelBounds),  //瓦片范围
                    tileCenter = tileRange.getCenter(),  //中心点瓦片坐标
                    queue = [],  //瓦片队列
                    margin = this.options.keepBuffer,   //瓦片填充数量
                    noPruneRange = new L.Bounds(tileRange.getBottomLeft().subtract([margin, -margin]),
                        tileRange.getTopRight().add([margin, -margin]));   //真实需要加载的瓦片范围

                //循环当前存在的瓦片,如果不在范围内，设置current标识为false
                for (var key in this._tiles) {
                    var c = this._tiles[key].coords;
                    if (c.z !== this._tileZoom || !noPruneRange.contains(new Point(c.x, c.y))) {
                        this._tiles[key].current = false;
                    }
                }

                //循环添加瓦片
                for (var j = tileRange.min.y; j <= tileRange.max.y; j++) {
                    for (var i = tileRange.min.x; i <= tileRange.max.x; i++) {
                        var coords = new L.Point(i, j);
                        coords.z = this._tileZoom;

                        var tile = this._tiles[coords.x + ':' + coords.y + ':' + coords.z];
                        if (tile) {
                            tile.current = true;
                        } else {
                            this._addTile(coords, this._level.el);
                        }
                    }
                }
            },
            /**
             * 获取地图像素范围
             */
            _getTiledPixelBounds: function (center) {
                var map = this._map,
                    mapZoom = map._animatingZoom ? Math.max(map._animateToZoom, map.getZoom()) : map.getZoom(),
                    scale = map.getZoomScale(mapZoom, this._tileZoom),
                    pixelCenter = map.project(center, this._tileZoom).floor(),
                    halfSize = map.getSize().divideBy(scale * 2);

                return new L.Bounds(pixelCenter.subtract(halfSize), pixelCenter.add(halfSize));
            },
            //获取图层瓦片范围
            _pxBoundsToTileRange: function (bounds) {
                var tileSize = this.getTileSize();
                return new L.Bounds(
                    bounds.min.unscaleBy(tileSize).floor(),
                    bounds.max.unscaleBy(tileSize).ceil().subtract([1, 1]));
            },
            
            /**
             * 添加瓦片
             */
            _addTile: function (coords, container) {
                var tilePos = coords.scaleBy(this.getTileSize()).subtract(this._level.origin),  //瓦片位置
                    key = coords.x + ':' + coords.y + ':' + coords.z;  //瓦片唯一号

                var tile = document.createElement('div');
                tile.innerHTML = key;
                L.DomUtil.addClass(tile, 'leaflet-tile leaflet-tile-loaded');

                var tileSize = this.getTileSize();
                tile.style.width = tileSize.x + 'px';
                tile.style.height = tileSize.y + 'px';
                tile.style.border = "1px solid #ccc";
                tile.onselectstart = L.Util.falseFn;
                tile.onmousemove = L.Util.falseFn;

                L.DomUtil.setPosition(tile, tilePos);

                // 保持瓦片缓存
                this._tiles[key] = {
                    el: tile,
                    coords: coords,
                    current: true
                };

                container.appendChild(tile);
            }
        });

```

## 5.添加移动与缩放更新

```javascript
 L.GridLayerStudy = L.Layer.extend({
            options: {
                pane: 'tilePane',
                tileSize: 256,
                minZoom: 0,
                maxZoom: undefined,
                keepBuffer: 2
            },
            initialize: function (options) {
                L.Util.setOptions(this, options);
            },
            /**
             * 图层添加到地图
             */
            onAdd: function () {
                this._initContainer();
                //保存每个层级的容器
                this._levels = {};
                //保存瓦片对象
                this._tiles = {};
                this._setView(this._map.getCenter(), this._map.getZoom());
            },
            /**
             * 图层从地图移除
             */
            onRemove() {
                L.DomUtil.remove(this._container);
            },

            /**
             * 初始化瓦片容器
             */
            _initContainer: function () {
                if (this._container) { return; }

                this._container = L.DomUtil.create('div', 'leaflet-layer ' + (this.options.className || ''));

                this.getPane().appendChild(this._container);
            },

            /**
             * 获取瓦片大小
             * @return {L.Point}
             */
            getTileSize() {
                var s = this.options.tileSize;
                return s instanceof L.Point ? s : new L.Point(s, s);
            },

            /**
             * 设置视图
             * @param {L.LatLng} center 中心点
             * @param {number} zoom 地图缩放级别
             */
            _setView: function (center, zoom) {
                //计算瓦片级别，区别于地图缩放级别(地图缩放级别可配置为浮点数)
                var tileZoom = Math.round(zoom);

                //瓦片级别修改
                if (tileZoom !== this._tileZoom) {
                    //更新瓦片级别
                    this._tileZoom = tileZoom;

                    //更新levels
                    this._updateLevels();
                    //计算当前层级全球瓦片范围
                    this._resetGrid();

                    this._update(center);
                }
            },

            /**
             * 更新层级容器
             */
            _updateLevels: function () {

                var zoom = this._tileZoom;
                var maxZoom = 20;
                if (zoom === undefined) { return undefined; }

                for (var z in this._levels) {
                    z = Number(z);
                    if (z === zoom) {
                        this._levels[z].el.style.zIndex = maxZoom - Math.abs(zoom - z);
                    } else {
                        L.DomUtil.remove(this._levels[z].el);
                        for (var key in this._tiles) {
                            if (this._tiles[key].coords.z !== z) {
                                continue;
                            }
                            this._removeTile(key);
                        }
                        delete this._levels[z];
                    }
                }

                //获取当前层级瓦片对象
                var level = this._levels[zoom],
                    map = this._map;

                //层级对象不存在则创建
                if (!level) {
                    level = this._levels[zoom] = {};

                    level.el = L.DomUtil.create('div', 'leaflet-tile-container leaflet-zoom-animated', this._container);
                    level.el.style.zIndex = maxZoom;

                    level.origin = map.project(map.unproject(map.getPixelOrigin()), zoom).round();
                    level.zoom = zoom;
                }

                this._level = level;

                return level;
            },

            //计算当前层级全球瓦片范围
            _resetGrid: function () {
                var map = this._map,
                    crs = map.options.crs,
                    tileSize = this._tileSize = this.getTileSize(),
                    tileZoom = this._tileZoom;

                this._wrapX = crs.wrapLng && !this.options.noWrap && [
                    Math.floor(map.project([0, crs.wrapLng[0]], tileZoom).x / tileSize.x),
                    Math.ceil(map.project([0, crs.wrapLng[1]], tileZoom).x / tileSize.y)
                ];
                this._wrapY = crs.wrapLat && !this.options.noWrap && [
                    Math.floor(map.project([crs.wrapLat[0], 0], tileZoom).y / tileSize.x),
                    Math.ceil(map.project([crs.wrapLat[1], 0], tileZoom).y / tileSize.y)
                ];
            },

            // 根据地图边界在网格的活动缩放级别中加载分幅的私有方法
            _update: function (center) {
                var map = this._map;
                if (!map) { return; }
                var zoom = map.getZoom();

                if (center === undefined) { center = map.getCenter(); }
                if (this._tileZoom === undefined) { return; }	// if out of minzoom/maxzoom

                var pixelBounds = this._getTiledPixelBounds(center),  //图层像素范围
                    tileRange = this._pxBoundsToTileRange(pixelBounds),  //瓦片范围
                    tileCenter = tileRange.getCenter(),  //中心点瓦片坐标
                    queue = [],  //瓦片队列
                    margin = this.options.keepBuffer,   //瓦片填充数量
                    noPruneRange = new L.Bounds(tileRange.getBottomLeft().subtract([margin, -margin]),
                        tileRange.getTopRight().add([margin, -margin]));   //真实需要加载的瓦片范围

                //循环当前存在的瓦片,如果不在范围内，设置current标识为false
                for (var key in this._tiles) {
                    var c = this._tiles[key].coords;
                    if (c.z !== this._tileZoom || !noPruneRange.contains(new L.Point(c.x, c.y))) {
                        this._tiles[key].current = false;
                    }
                }

                //循环添加瓦片
                for (var j = tileRange.min.y; j <= tileRange.max.y; j++) {
                    for (var i = tileRange.min.x; i <= tileRange.max.x; i++) {
                        var coords = new L.Point(i, j);
                        coords.z = this._tileZoom;

                        var tile = this._tiles[coords.x + ':' + coords.y + ':' + coords.z];
                        if (tile) {
                            tile.current = true;
                        } else {
                            this._addTile(coords, this._level.el);
                        }
                    }
                }
            },
            /**
             * 获取地图像素范围
             */
            _getTiledPixelBounds: function (center) {
                var map = this._map,
                    mapZoom = map._animatingZoom ? Math.max(map._animateToZoom, map.getZoom()) : map.getZoom(),
                    scale = map.getZoomScale(mapZoom, this._tileZoom),
                    pixelCenter = map.project(center, this._tileZoom).floor(),
                    halfSize = map.getSize().divideBy(scale * 2);

                return new L.Bounds(pixelCenter.subtract(halfSize), pixelCenter.add(halfSize));
            },
            //获取图层瓦片范围
            _pxBoundsToTileRange: function (bounds) {
                var tileSize = this.getTileSize();
                return new L.Bounds(
                    bounds.min.unscaleBy(tileSize).floor(),
                    bounds.max.unscaleBy(tileSize).ceil().subtract([1, 1]));
            },

            /**
             * 添加瓦片
             */
            _addTile: function (coords, container) {
                var tilePos = coords.scaleBy(this.getTileSize()).subtract(this._level.origin),  //瓦片位置
                    key = coords.x + ':' + coords.y + ':' + coords.z;  //瓦片唯一号

                var tile = document.createElement('div');
                tile.innerHTML = key;
                L.DomUtil.addClass(tile, 'leaflet-tile leaflet-tile-loaded');

                var tileSize = this.getTileSize();
                tile.style.width = tileSize.x + 'px';
                tile.style.height = tileSize.y + 'px';
                tile.style.border = "1px solid #ccc";
                tile.onselectstart = L.Util.falseFn;
                tile.onmousemove = L.Util.falseFn;

                L.DomUtil.setPosition(tile, tilePos);

                // 保持瓦片缓存
                this._tiles[key] = {
                    el: tile,
                    coords: coords,
                    current: true
                };

                container.appendChild(tile);
            },
            /**
             * @description 
             * 获取事件对象
             * 
             * 表示给map添加的监听器
             * @return {Object} 监听器/函数键值对
             */
            getEvents: function () {
                var events = {
                    viewreset: function () {
                        this._setView(this._map.getCenter(), this._map.getZoom());
                    }.bind(this),
                    zoom: function () {
                        this._setView(this._map.getCenter(), this._map.getZoom());
                    }.bind(this),
                    moveend: function () {
                        this._update();
                    }.bind(this)
                };
           
                return events;
            },
            //移除瓦片
            _removeTile: function (key) {
                var tile = this._tiles[key];
                if (!tile) { return; }

                L.DomUtil.remove(tile.el);

                delete this._tiles[key];
            },
        });
```

## 6.缩放时保持上一级瓦片

```javascript
L.GridLayerStudy = L.Layer.extend({
            options: {
                pane: 'tilePane',
                tileSize: 256,
                minZoom: 0,
                maxZoom: undefined,
                keepBuffer: 2
            },
            initialize: function (options) {
                L.Util.setOptions(this, options);
            },
            /**
             * 图层添加到地图
             */
            onAdd: function () {
                this._initContainer();
                //保存每个层级的容器
                this._levels = {};
                //保存瓦片对象
                this._tiles = {};
                this._setView(this._map.getCenter(), this._map.getZoom());
            },
            /**
             * 图层从地图移除
             */
            onRemove() {
                L.DomUtil.remove(this._container);
            },

            /**
             * 初始化瓦片容器
             */
            _initContainer: function () {
                if (this._container) { return; }

                this._container = L.DomUtil.create('div', 'leaflet-layer ' + (this.options.className || ''));

                this.getPane().appendChild(this._container);
            },

            /**
             * 获取瓦片大小
             * @return {L.Point}
             */
            getTileSize() {
                var s = this.options.tileSize;
                return s instanceof L.Point ? s : new L.Point(s, s);
            },

            /**
             * 设置视图
             * @param {L.LatLng} center 中心点
             * @param {number} zoom 地图缩放级别
             */
            _setView: function (center, zoom) {
                //计算瓦片级别，区别于地图缩放级别(地图缩放级别可配置为浮点数)
                var tileZoom = Math.round(zoom);

                //瓦片级别修改
                if (tileZoom !== this._tileZoom) {
                    //更新瓦片级别
                    this._tileZoom = tileZoom;

                    //更新levels
                    this._updateLevels();
                    //计算当前层级全球瓦片范围
                    this._resetGrid();

                    this._update(center);
                }
                this._setZoomTransforms(center, zoom);
            },

            /**
             * 更新层级容器
             */
            _updateLevels: function () {

                var zoom = this._tileZoom;
                var maxZoom = 20;
                if (zoom === undefined) { return undefined; }

                for (var z in this._levels) {
                    z = Number(z);
                    if (z === zoom) {
                        this._levels[z].el.style.zIndex = maxZoom - Math.abs(zoom - z);
                    } else {
                        L.DomUtil.remove(this._levels[z].el);
                        for (var key in this._tiles) {
                            if (this._tiles[key].coords.z !== z) {
                                continue;
                            }
                            this._removeTile(key);
                        }
                        delete this._levels[z];
                    }
                }

                //获取当前层级瓦片对象
                var level = this._levels[zoom],
                    map = this._map;

                //层级对象不存在则创建
                if (!level) {
                    level = this._levels[zoom] = {};

                    level.el = L.DomUtil.create('div', 'leaflet-tile-container leaflet-zoom-animated', this._container);
                    level.el.style.zIndex = maxZoom;

                    level.origin = map.project(map.unproject(map.getPixelOrigin()), zoom).round();
                    level.zoom = zoom;

                    this._setZoomTransform(level, map.getCenter(), map.getZoom());
                }

                this._level = level;

                return level;
            },

            //计算当前层级全球瓦片范围
            _resetGrid: function () {
                var map = this._map,
                    crs = map.options.crs,
                    tileSize = this._tileSize = this.getTileSize(),
                    tileZoom = this._tileZoom;

                this._wrapX = crs.wrapLng && !this.options.noWrap && [
                    Math.floor(map.project([0, crs.wrapLng[0]], tileZoom).x / tileSize.x),
                    Math.ceil(map.project([0, crs.wrapLng[1]], tileZoom).x / tileSize.y)
                ];
                this._wrapY = crs.wrapLat && !this.options.noWrap && [
                    Math.floor(map.project([crs.wrapLat[0], 0], tileZoom).y / tileSize.x),
                    Math.ceil(map.project([crs.wrapLat[1], 0], tileZoom).y / tileSize.y)
                ];
            },

            // 根据地图边界在网格的活动缩放级别中加载分幅的私有方法
            _update: function (center) {
                var map = this._map;
                if (!map) { return; }
                var zoom = map.getZoom();

                if (center === undefined) { center = map.getCenter(); }
                if (this._tileZoom === undefined) { return; }	// if out of minzoom/maxzoom

                var pixelBounds = this._getTiledPixelBounds(center),  //图层像素范围
                    tileRange = this._pxBoundsToTileRange(pixelBounds),  //瓦片范围
                    tileCenter = tileRange.getCenter(),  //中心点瓦片坐标
                    queue = [],  //瓦片队列
                    margin = this.options.keepBuffer,   //瓦片填充数量
                    noPruneRange = new L.Bounds(tileRange.getBottomLeft().subtract([margin, -margin]),
                        tileRange.getTopRight().add([margin, -margin]));   //真实需要加载的瓦片范围

                //循环当前存在的瓦片,如果不在范围内，设置current标识为false
                for (var key in this._tiles) {
                    var c = this._tiles[key].coords;
                    if (c.z !== this._tileZoom || !noPruneRange.contains(new L.Point(c.x, c.y))) {
                        this._tiles[key].current = false;
                    }
                }

                //循环添加瓦片
                for (var j = tileRange.min.y; j <= tileRange.max.y; j++) {
                    for (var i = tileRange.min.x; i <= tileRange.max.x; i++) {
                        var coords = new L.Point(i, j);
                        coords.z = this._tileZoom;

                        var tile = this._tiles[coords.x + ':' + coords.y + ':' + coords.z];
                        if (tile) {
                            tile.current = true;
                        } else {
                            this._addTile(coords, this._level.el);
                        }
                    }
                }
            },
            /**
             * 获取地图像素范围
             */
            _getTiledPixelBounds: function (center) {
                var map = this._map,
                    mapZoom = map._animatingZoom ? Math.max(map._animateToZoom, map.getZoom()) : map.getZoom(),
                    scale = map.getZoomScale(mapZoom, this._tileZoom),
                    pixelCenter = map.project(center, this._tileZoom).floor(),
                    halfSize = map.getSize().divideBy(scale * 2);

                return new L.Bounds(pixelCenter.subtract(halfSize), pixelCenter.add(halfSize));
            },
            //获取图层瓦片范围
            _pxBoundsToTileRange: function (bounds) {
                var tileSize = this.getTileSize();
                return new L.Bounds(
                    bounds.min.unscaleBy(tileSize).floor(),
                    bounds.max.unscaleBy(tileSize).ceil().subtract([1, 1]));
            },

            /**
             * 添加瓦片
             */
            _addTile: function (coords, container) {
                var tilePos = coords.scaleBy(this.getTileSize()).subtract(this._level.origin),  //瓦片位置
                    key = coords.x + ':' + coords.y + ':' + coords.z;  //瓦片唯一号

                var tile = document.createElement('div');
                tile.innerHTML = key;
                L.DomUtil.addClass(tile, 'leaflet-tile leaflet-tile-loaded');

                var tileSize = this.getTileSize();
                tile.style.width = tileSize.x + 'px';
                tile.style.height = tileSize.y + 'px';
                tile.style.border = "1px solid #ccc";
                tile.onselectstart = L.Util.falseFn;
                tile.onmousemove = L.Util.falseFn;

                L.DomUtil.setPosition(tile, tilePos);

                // 保持瓦片缓存
                this._tiles[key] = {
                    el: tile,
                    coords: coords,
                    current: true
                };

                container.appendChild(tile);
            },
            /**
             * @description 
             * 获取事件对象
             * 
             * 表示给map添加的监听器
             * @return {Object} 监听器/函数键值对
             */
            getEvents: function () {
                var events = {
                    viewreset: function () {
                        this._setView(this._map.getCenter(), this._map.getZoom());
                    }.bind(this),
                    zoom: function () {
                        this._setView(this._map.getCenter(), this._map.getZoom());
                    }.bind(this),
                    moveend: function () {
                        this._update();
                    }.bind(this)
                };

                if (this._zoomAnimated) {
                    events.zoomanim = function(e){
                        this._setView(e.center, e.zoom, true, e.noUpdate);
                    }
                }

                return events;
            },
            //移除瓦片
            _removeTile: function (key) {
                var tile = this._tiles[key];
                if (!tile) { return; }

                L.DomUtil.remove(tile.el);

                delete this._tiles[key];
            },
            //设置所有层级缩放
            _setZoomTransforms: function (center, zoom) {
                for (var i in this._levels) {
                    this._setZoomTransform(this._levels[i], center, zoom);
                }
            },
            //设置指定层级缩放
            _setZoomTransform: function (level, center, zoom) {
                var scale = this._map.getZoomScale(zoom, level.zoom),
                    translate = level.origin.multiplyBy(scale)
                        .subtract(this._map._getNewPixelOrigin(center, zoom)).round();

                if (L.Browser.any3d) {
                    L.DomUtil.setTransform(level.el, translate, scale);
                } else {
                    L.DomUtil.setPosition(level.el, translate);
                }
            },
        });
```

## 源码地址

链接：https://pan.baidu.com/s/1uxmAKqEJoHhyV7gHhnW9TQ 
提取码：vth4