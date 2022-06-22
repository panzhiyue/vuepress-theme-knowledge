function Polyline(opt_options) {
    var options = $.extend({
        polyline: {
            material: Cesium.Color.RED,
            width: 5,
            clampToGround: true
        }
    }, opt_options);
    DrawModel.call(this, options);

    /**
    * 点集合
    * @type {Array}
    */
    this.positions_ = [];

    /**
    * 临时线对象
    * @type {Cesium.Entity}
    */
    this.entity_ = undefined;

    /**
    * 线样式
    * @type {Cesium.PolylineGraphics}
    */
    this.polyline_ = options.polyline;
}
Polyline.prototype = new DrawModel();
/**
* 绘图控件激活
* @param {bool} bool true:激活,false:取消
*/
Polyline.prototype.setActive = function (bool) {

//定义事件对象
        if (!this.handler_) {
            this.handler_ = new Cesium.ScreenSpaceEventHandler(this.viewer_.scene.canvas);
        }
        //激活
        if (bool) {

            //鼠标左键单击画点
            this.handler_.setInputAction(function (event) {
                //触发开始绘制事件
                if (this.positions_.length == 0) {
                    this.drawStart.raiseEvent({ type: "drawStart" });
                }
                //添加点
                var ray = this.viewer_.camera.getPickRay(event.position);
                var position = this.viewer_.scene.globe.pick(ray, this.viewer_.scene);
                this.positions_.push(position);
            }.bind(this), Cesium.ScreenSpaceEventType.LEFT_CLICK);
            //鼠标移动
            this.handler_.setInputAction(function (event) {
                //大于等于1个点是鼠标移动实时构建临时线
                if (this.positions_.length == 0) {
                    return;
                }
                //构建临时线对象
                var ray = this.viewer_.camera.getPickRay(event.endPosition);
                var position = this.viewer_.scene.globe.pick(ray, this.viewer_.scene);

                var positions = this.positions_.concat();
                positions.push(position);
                //构建新的线
                if (!this.entity_) {
                    this.polyline_.positions = positions;
                    this.entity_ = new Cesium.Entity({
                        polyline: this.polyline_
                    });

                    this.viewer_.entities.add(this.entity_);
                } else {
                    //刷新线的点集合
                    this.entity_.polyline.positions = new Cesium.CallbackProperty(function () {
                        return positions;
                    }, false);;

                }

            }.bind(this), Cesium.ScreenSpaceEventType.MOUSE_MOVE);



            //双击鼠标左键结束
            this.handler_.setInputAction(function (event) {
                //大于等于2个点时双击结束绘制
                if (this.positions_.length >= 2) {
                    //触发结束绘制事件
                    this.drawEnd.raiseEvent({ type: "drawEnd", positions: this.positions_ });
                    //清空临时对象
                    this.positions_ = [];
                    this.viewer_.entities.remove(this.entity_);
                    this.entity_ = null;
                }


            }.bind(this), Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);


        } else {
            //注销事件对象  
            if (this.handler_) {
                this.handler_.destroy();
            }
        }
}