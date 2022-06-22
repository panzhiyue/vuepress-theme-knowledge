function YMFX(opt_options) {
    var options = $.extend({ entities: null, startH: 100, endH: 1500, scope: 10, speed: 10 }, opt_options);
    /**
    * 分析区域
    * @type {Cesium.EntityCollection}
    */
    this.entities_ = options.entities;
    /**
    * 初始设定的水位高度
    * @type {Number}
    */
    this.startH_ = options.startH;

    /**
    * 最终水位
    * @type {Number}
    */
    this.endH_ = options.endH;

    /**
    * 涨幅,每次增长的海拔高度 米/次
    * @type {Number}
    */
    this.scope_ = options.scope;


    /**
    * 涨速 次/秒
    * @type {Number}
    */
    this.speed_ = options.speed;

    /**
    * 是否启动分析 
    * @type {Boolean}
    */
    this.IsStart_ = true;

    /**
    * 当前水位 
    * @type {Number}
    */
    this.waterHeight_ = 0;


    /**
    *  开始事件
    *  @type {Cesium.Event}
    */
    this.startEvent = new Cesium.Event();

    /**
    * 继续事件
    * @type {Cesium.Event}
    */
    this.continuteEvent = new Cesium.Event();

    /**
    * 暂停事件
    * @type {Cesium.Event}
    */
    this.suspendEvent = new Cesium.Event();

    /**
    * 停止事件
    * @type {Cesium.Event}
    */
    this.stopEvent = new Cesium.Event();

    /**
    * 完成事件
    * @type {Cesium.Event}
    */
    this.completeEvent = new Cesium.Event();

    /**
    * 分析执行事件
    * @type {Cesium.Event}
    */
    this.analysisEvent = new Cesium.Event();


    /**
    * 清除事件
    * @type {Cesium.Event}
    */
    this.clearEvent = new Cesium.Event();
}

/**
* 绑定viewer
* @param {Cesium.Viewer} viewer
*/
YMFX.prototype.setViewer = function (viewer) {
    this.viewer_ = viewer;
}

/**
 * 开始分析 
 */
YMFX.prototype.start=function() {
        this.startEvent.raiseEvent({ type: "startEvent" });
        this.IsStart_ = true;
        this.waterHeight_ = this.startH_;
        for (var i = 0; i < this.entities_.values.length; i++) {
            var entity = this.entities_.values[i];
            entity.polygon.extrudedHeight = this.waterHeight_;
            entity.polygon.perPositionHeight = false;
            this.viewer_.entities.add(entity);
        }



        this.timer_ = setInterval(function () {
            if (this.IsStart_ == false) {
                return;
            }
            if (this.waterHeight_ < this.endH_) {
                this.waterHeight_ += this.scope_;
                if (this.waterHeight_ > this.endH_) {
                    this.waterHeight_ = this.endH_;
                }
                for (var i = 0; i < this.entities_.values.length; i++) {
                    var entity = this.entities_.values[i];
                    entity.polygon.extrudedHeight = new Cesium.CallbackProperty(function () {
                        return this.waterHeight_;
                    }.bind(this), false);
                }

                this.analysisEvent.raiseEvent({ type: "analysisEvent" });
                if (this.waterHeight_ == this.endH_) {
                    this.complete();
                }

            }
        }.bind(this), 1000 / this.speed_);

    }
    /**
    * 继续
    */
YMFX.prototype.continue=function() {
        this.IsStart_ = true;
        //触发结束绘制事件
        this.continuteEvent.raiseEvent({ type: "continuteEvent" });
    }
    /**
     * 暂停 
     */
YMFX.prototype.suspend=function() {
        this.IsStart_ = false;
        this.suspendEvent.raiseEvent({ type: "suspendEvent" });
    }

    /**
     * 停止
     */
YMFX.prototype.stop=function() {
        if (this.timer_) {
            clearInterval(this.timer_);

        }
        this.stopEvent.raiseEvent({ type: "stopEvent" });
    }
    /**
     * 完成
     */
YMFX.prototype.complete=function() {
        if (this.timer_) {
            clearInterval(this.timer_);
        }
        this.completeEvent.raiseEvent({ type: "completeEvent" });
    }

YMFX.prototype.clear=function() {
        if (this.timer_) {
            clearInterval(this.timer_);
        }
        if (this.entities_) {
            for (let i = 0; i < this.entities_.values.length; i++) {
                this.viewer_.entities.remove(this.entities_.values[i]);
            }
          
        }
        this.clearEvent.raiseEvent({ type: "clearEvent" });
    }