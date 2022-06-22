class DrawModel {
    constructor() {
        /**
         *  开始绘制事件
         *  @type {Cesium.Event}
         */
        this.drawStart = new Cesium.Event();

        /**
         * 绘制结束时间
         * @type {Cesium.Event}
         */
        this.drawEnd = new Cesium.Event();
    }
    /**
     * 绑定viewer
     * @param {Cesium.Viewer} viewer
     */
    setViewer(viewer) {
        this.viewer_ = viewer;
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

        } else {

        }
    }
}

export default DrawModel;