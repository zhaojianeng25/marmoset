var same;
(function (same) {
    var Scene_data = Pan3d.Scene_data;
    var LoadManager = Pan3d.LoadManager;
    var SceneManager = Pan3d.SceneManager;
    var MarmosetModel = mars3D.MarmosetModel;
    var SamePicSprite = same.SamePicSprite;
    var SamedataModel = /** @class */ (function () {
        function SamedataModel() {
        }
        SamedataModel.initCanvas = function ($caves) {
            mainpan3d_me.canvas = $caves;
            Pan3d.Scene_data.fileRoot = "res/";
            Pan3d.Engine.init($caves);
            window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
            if (requestAnimationFrame) {
                requestAnimationFrame(SamedataModel.step);
            }
            SamedataModel.resetSize();
            this.initmosort();
        };
        SamedataModel.overrideFunUpData = function () {
            marmoset.WebViewer.prototype.update = function () {
                var a = this.scene.sceneAnimator && !this.scene.sceneAnimator.paused;
                if (0 < this.sleepCounter || this.ui.animating() || a || this.stripData.animationActive) {
                    this.stripData.update();
                    this.ui.animate();
                    this.scene.update();
                    this.drawScene();
                    this.requestFrame(this.update.bind(this));
                }
                a ? this.scene.postRender.discardAAHistory() : this.sleepCounter--;
                SamedataModel.upFrame();
            };
            var marmosetFun = function (fun) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                var v = fun.apply(this, args);
                return v;
            };
            var context3DupDate = Pan3d.Context3D.prototype.update;
            Pan3d.Context3D.prototype.update = function () {
                marmosetFun.call(this, context3DupDate);
                this.renderContext.frontFace(this.renderContext.CCW);
            };
        };
        SamedataModel.initmosort = function () {
            window["webgl"] = Pan3d.Scene_data.context3D.renderContext;
            mars3D.MarmosetModel.getInstance().initData();
            this.overrideFunUpData();
            //  this.addBaseRectSprite()
            //   this.addInsetMarmosetSprite()
            this.drawRenderSprite = new same.DrawRenderSprite();
            var _samePicSprite = new same.BaseCavanRectSprite;
            _samePicSprite.otherSprite = this.drawRenderSprite;
            SceneManager.getInstance().addDisplay(new SamePicSprite);
            SceneManager.getInstance().addDisplay(_samePicSprite);
            SceneManager.getInstance().ready = true;
            MarmosetModel.getInstance().viewFileName = "karen1.mview";
            var rootpath = "pan/marmoset/feiji/6_14/";
            LoadManager.getInstance().load(Scene_data.fileuiRoot + rootpath + "outshder.txt", LoadManager.XML_TYPE, function (outstr) {
                MarmosetModel.changerOutshader = outstr;
                LoadManager.getInstance().load(Scene_data.fileuiRoot + rootpath + "vshader.txt", LoadManager.XML_TYPE, function (vstr) {
                    MarmosetModel.changerVshader = vstr;
                    LoadManager.getInstance().load(Scene_data.fileuiRoot + rootpath + "fshader.txt", LoadManager.XML_TYPE, function (fstr) {
                        MarmosetModel.changerFshader = fstr;
                        marmoset.embed("res/" + MarmosetModel.getInstance().viewFileName, { width: 400, height: 300, autoStart: true, fullFrame: false, pagePreset: false });
                    });
                });
            });
        };
        SamedataModel.resetSize = function () {
            if (mainpan3d_me.canvas) {
                mainpan3d_me.canvas.width = document.body.clientWidth;
                mainpan3d_me.canvas.height = document.body.clientHeight;
                Pan3d.Engine.resetSize(mainpan3d_me.canvas.width, mainpan3d_me.canvas.height); //设置canvas大小
                win.LayerManager.getInstance().resize();
            }
        };
        SamedataModel.step = function (timestamp) {
            requestAnimationFrame(SamedataModel.step);
        };
        SamedataModel.upDataLightShadow = function () {
            this.drawRenderSprite.update();
        };
        SamedataModel.addBaseRectSprite = function () {
            window["baseRect"] = new same.BaseSametRectSprite();
            Pan3d.TextureManager.getInstance().getTexture(Scene_data.fileuiRoot + "256.jpg", function (a) {
                window["baseRect"]._uvTextureRes = a;
            });
            window["baseRectSprite"] = new dis.BaseRectSprite();
            Pan3d.TextureManager.getInstance().getTexture(Scene_data.fileuiRoot + "256.jpg", function (a) {
                window["baseRectSprite"]._uvTextureRes = a;
            });
        };
        SamedataModel.addInsetMarmosetSprite = function () {
            window["InsetMarmosetSprite"] = new mars3D.InsetMarmosetSprite();
        };
        SamedataModel.upFrame = function () {
            this.upDataLightShadow();
            Pan3d.TimeUtil.update();
            Pan3d.Engine.resetSize();
            Pan3d.Scene_data.context3D.update();
            var gl = Pan3d.Scene_data.context3D.renderContext;
            gl.clearColor(255 / 255, 0, 0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
            SceneManager.getInstance().update();
            if (window["baseRect"]) {
                window["baseRect"].update();
            }
        };
        return SamedataModel;
    }());
    same.SamedataModel = SamedataModel;
})(same || (same = {}));
//# sourceMappingURL=SamedataModel.js.map