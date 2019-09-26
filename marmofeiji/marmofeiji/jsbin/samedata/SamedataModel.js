var same;
(function (same) {
    var Scene_data = Pan3d.Scene_data;
    var LoadManager = Pan3d.LoadManager;
    var MarmosetModel = mars3D.MarmosetModel;
    var MarmosetLightVo = mars3D.MarmosetLightVo;
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
            this.mianpian = new SamePicSprite();
            this.mianpian.scale = 10;
            Pan3d.SceneManager.getInstance().addDisplay(this.mianpian);
            MarmosetLightVo.tempRect = new depth.DepthRectSprite();
            Pan3d.SceneManager.getInstance().addDisplay(MarmosetLightVo.tempRect);
            Pan3d.SceneManager.getInstance().ready = true;
            mars3D.MarmosetModel.getInstance().initData();
            window["webgl"] = Pan3d.Scene_data.context3D.renderContext;
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
            if (!MarmosetLightVo.marmosetLightVo) {
                if (window["uShadowMatrices"]) {
                    MarmosetLightVo.marmosetLightVo = new MarmosetLightVo();
                }
            }
            else {
                MarmosetLightVo.marmosetLightVo.update(MarmosetModel.meshItem);
            }
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
            Pan3d.SceneManager.getInstance().update();
        };
        return SamedataModel;
    }());
    same.SamedataModel = SamedataModel;
})(same || (same = {}));
//# sourceMappingURL=SamedataModel.js.map