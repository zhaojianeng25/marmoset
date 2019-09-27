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
        SamedataModel.initmosort = function () {
            window["webgl"] = Pan3d.Scene_data.context3D.renderContext;
            mars3D.MarmosetModel.getInstance().initData();
            this.overrideFun();
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
                        marmoset.embed("res/" + MarmosetModel.getInstance().viewFileName, { width: 256, height: 256, autoStart: true, fullFrame: false, pagePreset: false });
                    });
                });
            });
        };
        SamedataModel.overrideFun = function () {
            marmoset.WebViewer.prototype.drawScene = function () {
                if (!this.gl.isContextLost()) {
                    if (this.domRoot.clientWidth == this.canvas.clientWidth && this.domRoot.clientHeight == this.canvas.clientHeight) {
                    }
                    else {
                        this.resize();
                    }
                    this.scene.view.size = [this.mainBuffer.width, this.mainBuffer.height];
                    this.scene.view.updateProjection();
                    this.scene.postRender.adjustProjectionForSupersampling(this.scene.view);
                    this.scene.collectShadows(this.mainBuffer);
                    this.mainBuffer.bind();
                    this.scene.draw(this.mainBuffer);
                    if (this.mainDepth) {
                        this.mainBufferNoDepth.bind();
                        this.scene.drawSecondary(this.mainDepth);
                        this.scene.postRender.present(this.mainColor, this.canvas.width, this.canvas.height, this.stripData.active());
                        window["inputTexture"] = { id: this.mainBuffer.color0 };
                        window["inputTexture"] = this.mainColor;
                    }
                }
            };
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
            SamedataModel.upFrame();
        };
        SamedataModel.upDataLightShadow = function () {
            this.drawRenderSprite.update();
        };
        SamedataModel.upFrame = function () {
            this.upDataLightShadow();
            Pan3d.TimeUtil.update();
            Pan3d.Engine.resetSize();
            Pan3d.Scene_data.context3D.update();
            var gl = Pan3d.Scene_data.context3D.renderContext;
            gl.clearColor(255 / 255, 0, 0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
            win.LayerManager.getInstance().update();
            SceneManager.getInstance().update();
        };
        return SamedataModel;
    }());
    same.SamedataModel = SamedataModel;
})(same || (same = {}));
//# sourceMappingURL=SamedataModel.js.map