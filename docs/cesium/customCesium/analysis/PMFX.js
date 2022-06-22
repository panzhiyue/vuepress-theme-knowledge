function PMFX(opt_options) {
    var options = $.extend({ startP: null, endP: null, minC: 100, maxC: 1000, count: 200 }, opt_options);

    /**
    * 起始点
    * @type {Cesium.Cartesian3}
    */
    this.startP_ = options.startP;

    /**
    * 结束点
    * @type {Cesium.Cartesian3}
    */
    this.endP_ = options.endP;

    /**
    * 最小数量
    * @type {Number}
    */
    this.minC_ = options.minC;
    /**
    * 最小数量
    * @type {Number}
    */
    this.maxC_ = options.maxC;

    /**
    * 数量
    * @type {Number}
    */
    this.count_ = options.count;
}

/**
* 绑定viewer
* @param {Cesium.Viewer} viewer
*/
PMFX.prototype.setViewer = function (viewer) {
    this.viewer_ = viewer;
}

PMFX.prototype.getResult=function() {
    var start = this.startP_;
    var end = this.endP_;

    var points = [];
    points.push(start);
    for (let i = 1; i < this.count_ - 1; i++) {
        var cart = Cesium.Cartesian3.lerp(start, end, i / this.count_, new Cesium.Cartesian3());

        points.push(cart);
    }
    points.push(end);

    var result = [];
    //得到当前三维场景
    var scene = this.viewer_.scene;
    //得到当前三维场景的椭球体
    var ellipsoid = scene.globe.ellipsoid;
    for (let i = 0; i < points.length; i++) {
        var point = points[i];

        var point1cartographic = Cesium.Cartographic.fromCartesian(point);
        var point2cartographic = Cesium.Cartographic.fromCartesian(points[0]);

        /**根据经纬度计算出距离**/
        var geodesic = new Cesium.EllipsoidGeodesic();
        geodesic.setEndPoints(point1cartographic, point2cartographic);
        var distance = geodesic.surfaceDistance;



        var cartesian = point;
        //将笛卡尔坐标转换为地理坐标
        var cartographic = ellipsoid.cartesianToCartographic(cartesian);

        //经度
        var longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
        //纬度
        var latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
        //海拔
        var h = this.viewer_.scene.globe.getHeight(cartographic);
        result.push({ distance: distance, x: longitudeString, y: latitudeString, z: h });
    }
    return result;
}