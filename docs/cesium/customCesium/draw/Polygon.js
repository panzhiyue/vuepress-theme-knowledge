import DrawModel from "./DrawModel"
class Polygon extends DrawModel {
    constructor(opt_options) {
        var options = Object.assign({
            polygon: {
                material: Cesium.Color.GREEN.withAlpha(1),
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            }
        }, opt_options);

        super(options);
        /**
         * 点集合 
         * @type {Array}
         */
        this.positions_ = [];

        /**
         * 临时面对象
         * @type {Cesium.Entity}
         */
        this.poly_ = undefined;

        /**
         * 面样式
         * @type {Cesium.PolygonGraphics}
         */
        this.polygon_ = options.polygon;

    }
    /**
     * 绘图控件激活
     * @param {bool} bool true:激活,false:取消
     */
    setActive(bool) {
        //定义事件对象
        if (!this.handler_) {
            this.handler_ = new Cesium.ScreenSpaceEventHandler(this.viewer_.scene.canvas);
        }
        //激活
        if (bool) {

            //鼠标左键单击画点
            this.handler_.setInputAction((event) => {
                //触发开始绘制事件
                if (this.positions_.length == 0) {
                    this.drawStart.raiseEvent({
                        type: "drawStart"
                    });
                }
                //添加点
                var ray = this.viewer_.camera.getPickRay(event.position);
                var position = this.viewer_.scene.globe.pick(ray, this.viewer_.scene);
                this.positions_.push(position);
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
            //鼠标移动
            this.handler_.setInputAction((event) => {
                //大于等于2个点是鼠标移动实时构建临时面
                if (this.positions_.length < 2) {
                    return;
                }
                //构建临时面对象
                var ray = this.viewer_.camera.getPickRay(event.endPosition);
                var position = this.viewer_.scene.globe.pick(ray, this.viewer_.scene);

                var positions = this.positions_.concat();
                positions.push(position);
                positions.push(positions[0]);
                //构建新的面
                if (!this.poly_) {
                    this.polygon_.positions = positions;
                    this.poly_ = new Cesium.Entity({
                        polygon: this.polygon_
                    });

                    this.viewer_.entities.add(this.poly_);
                } else {
                    //刷新面的点集合
                    this.poly_.polygon.hierarchy = new Cesium.CallbackProperty(function () {
                        return {
                            positions: positions
                        };
                    }, false);;

                }

            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);



            //双击鼠标左键结束
            this.handler_.setInputAction((event) => {
                //大于等于3个点时双击结束绘制
                if (this.positions_.length >= 3) {
                    //触发结束绘制事件
                    this.drawEnd.raiseEvent({
                        type: "drawEnd",
                        positions: this.positions_
                    });
                    //清空临时对象
                    this.positions_ = [];
                    this.viewer_.entities.remove(this.poly_);
                    this.poly_ = null;
                }


            }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);


        } else {
            //注销事件对象
            if (this.handler_) {
                this.handler_.destroy();
            }
        }
    }
}

export default Polygon;