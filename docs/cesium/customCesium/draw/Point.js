class Point {
    constructor(opt_options) {

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
            //单击鼠标左键画点
            this.handler_.setInputAction(function (event) {
                //触发开始绘制事件
                this.drawStart.raiseEvent({
                    type: "drawStart"
                });

                //获取点击的地图坐标点
                var ray = this.viewer_.camera.getPickRay(event.position);
                var position = this.viewer_.scene.globe.pick(ray, this.viewer_.scene);

                //触发结束绘制事件
                this.drawEnd.raiseEvent({
                    type: "drawEnd",
                    position: position
                });
            }.bind(this), Cesium.ScreenSpaceEventType.LEFT_CLICK);
        } else { //取消激活
            //注销事件对象
            if (this.handler_) {
                this.handler_.destroy();
            }
        }
    }
}