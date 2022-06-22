class Rectangle {
    constructor(opt_options) {
        var options = Object.assign({
            rectangle: {
                material: Cesium.Color.BLACK.withAlpha(0.4),
                outline: true,
                outlineWidth: 2,
                outlineColor: Cesium.Color.RED,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            }
        }, opt_options);

        this.positions_ = [];
        this.poly_ = undefined;

        /**
         * 矩形样式
         * @type {Cesium.RectangleGraphics}
         */
        this.rectangle_ = options.rectangle;
    }
    /**
     * 绘图控件激活
     * @param {bool} bool true:激活,false:取消
     */
    setActive(bool) {
        if (!this.handler_) {
            this.handler_ = new Cesium.ScreenSpaceEventHandler(this.viewer_.scene.canvas);
        }
        if (bool) {

            //鼠标左键单击画点
            this.handler_.setInputAction(function (event) {
                if (this.positions_.length == 0) {
                    this.drawStart.raiseEvent({
                        type: "drawStart"
                    });

                    var ray = this.viewer_.camera.getPickRay(event.position);
                    var position = this.viewer_.scene.globe.ellipsoid.cartesianToCartographic(this.viewer_.scene.globe.pick(ray, this.viewer_.scene));
                    this.positions_.push(position);
                }
            }.bind(this), Cesium.ScreenSpaceEventType.LEFT_CLICK);
            //鼠标移动
            this.handler_.setInputAction(function (event) {
                if (this.positions_.length == 0) {
                    return;
                }
                var ray = this.viewer_.camera.getPickRay(event.endPosition);
                var position = this.viewer_.scene.globe.ellipsoid.cartesianToCartographic(this.viewer_.scene.globe.pick(ray, this.viewer_.scene));

                var rect = Cesium.Rectangle.fromCartographicArray([position, this.positions_[0]]);
                if (!this.poly_) {
                    this.rectangle_.coordinates = rect;
                    this.poly_ = new Cesium.Entity({
                        rectangle: this.rectangle_
                    });

                    this.viewer_.entities.add(this.poly_);
                } else {
                    this.poly_.rectangle.coordinates = new Cesium.CallbackProperty(function () {
                        return rect;
                    }, false);;

                }

            }.bind(this), Cesium.ScreenSpaceEventType.MOUSE_MOVE);



            //双击鼠标左键结束
            this.handler_.setInputAction(function (event) {
                if (this.positions_.length == 1) {
                    var ray = this.viewer_.camera.getPickRay(event.position);
                    var position = this.viewer_.scene.globe.ellipsoid.cartesianToCartographic(this.viewer_.scene.globe.pick(ray, this.viewer_.scene));

                    var rect = Cesium.Rectangle.fromCartographicArray([position, this.positions_[0]]);

                    this.drawEnd.raiseEvent({
                        type: "drawEnd",
                        rect: rect
                    });
                    this.positions_ = [];
                    this.viewer_.entities.remove(this.poly_);
                    this.poly_ = null;
                }
            }.bind(this), Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);


        } else {
            if (this.handler_) {
                this.handler_.destroy();
            }
        }
    }
}