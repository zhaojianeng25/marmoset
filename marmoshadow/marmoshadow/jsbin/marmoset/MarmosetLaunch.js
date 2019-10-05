var mars3D;
(function (mars3D) {
    var Browser = Laya.Browser;
    var Stage = Laya.Stage;
    var MarmosetLaunch = /** @class */ (function () {
        function MarmosetLaunch() {
            this.init();
        }
        Object.defineProperty(MarmosetLaunch.prototype, "canvas", {
            get: function () {
                return this._canvas;
            },
            enumerable: true,
            configurable: true
        });
        MarmosetLaunch.prototype.init = function () {
            this._canvas = Laya.init(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio, Laya.WebGL);
            Laya.stage.alignV = Stage.ALIGN_LEFT;
            Laya.stage.alignH = Stage.ALIGN_TOP;
            Laya.stage.scaleMode = "full";
            Laya.stage.bgColor = "#232628";
            Pan3d.Scene_data.ossRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/";
            Pan3d.Scene_data.fileuiRoot = "res/";
            Pan3d.Scene_data.fileRoot = Pan3d.Scene_data.ossRoot + "baseedit/";
            Pan3d.Engine.init(this._canvas);
            var topBox = new Laya.Box();
            Laya.stage.addChild(topBox);
            var midBox = new Laya.Box();
            Laya.stage.addChild(midBox);
            var picA = new Laya.Image("res/ui/icon/lyf_64x.png");
            Laya.stage.addChild(picA);
            picA.scale(0.5, 0.5);
            picA.pos(0, 0);
            console.log(layapan_me.LayaSceneChar);
            var spriteD = new mars3D.Marmoset3dScene("res/ui/icon/512b.jpg", function () {
                spriteD.scale(1.2, 1.2 * (4 / 5));
            });
            Laya.stage.addChild(spriteD);
            spriteD.pos(100, 350);
            Laya.stage.frameLoop(1, this, function () {
                Pan3d.TimeUtil.update();
            });
        };
        MarmosetLaunch.initCanvas = function ($caves) {
            new MarmosetLaunch();
        };
        return MarmosetLaunch;
    }());
    mars3D.MarmosetLaunch = MarmosetLaunch;
})(mars3D || (mars3D = {}));
//# sourceMappingURL=MarmosetLaunch.js.map