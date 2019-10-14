var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var mars3D;
(function (mars3D) {
    var Vector2D = Pan3d.Vector2D;
    var Object3D = Pan3d.Object3D;
    var MouseType = Pan3d.MouseType;
    var LineDisplayShader = Pan3d.LineDisplayShader;
    var GridLineSprite = Pan3d.GridLineSprite;
    var Camera3D = Pan3d.Camera3D;
    var Rectangle = Pan3d.Rectangle;
    var LoadManager = Pan3d.LoadManager;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var Scene_data = Pan3d.Scene_data;
    var EdItorSceneManager = maineditor.EdItorSceneManager;
    var Laya3dSprite = LayaPan3D.Laya3dSprite;
    var LayaSceneChar = layapan_me.LayaSceneChar;
    var Marmoset3dScene = /** @class */ (function (_super) {
        __extends(Marmoset3dScene, _super);
        function Marmoset3dScene(value, bfun) {
            if (bfun === void 0) { bfun = null; }
            var _this = _super.call(this, value, bfun) || this;
            _this.selectId = 0;
            _this.addEvents();
            mars3D.MarmosetModel.getInstance().initData();
            mars3D.MarmosetModel.getInstance().viewFileName = "karen1.mview";
            var rootpath = "pan/marmoset/feiji/6_14/";
            LoadManager.getInstance().load(Scene_data.fileuiRoot + rootpath + "outshder.txt", LoadManager.XML_TYPE, function (outstr) {
                mars3D.MarmosetModel.changerOutshader = outstr;
                LoadManager.getInstance().load(Scene_data.fileuiRoot + rootpath + "vshader.txt", LoadManager.XML_TYPE, function (vstr) {
                    mars3D.MarmosetModel.changerVshader = vstr;
                    LoadManager.getInstance().load(Scene_data.fileuiRoot + rootpath + "fshader.txt", LoadManager.XML_TYPE, function (fstr) {
                        mars3D.MarmosetModel.changerFshader = fstr;
                        marmoset.embed("res/" + mars3D.MarmosetModel.getInstance().viewFileName, { width: 500, height: 400, autoStart: true, fullFrame: false, pagePreset: false });
                    });
                });
            });
            return _this;
        }
        Marmoset3dScene.prototype.addInsetMarmosetSprite = function () {
            window["InsetMarmosetSprite"] = new mars3D.InsetMarmosetSprite();
        };
        Marmoset3dScene.prototype.initScene = function () {
            //this.addInsetMarmosetSprite()
            ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
            this.sceneManager = new EdItorSceneManager();
            this.sceneManager.addDisplay(new GridLineSprite());
            this.mianpian = new mars3D.PicShowDiplay3dSprite();
            this.mianpian.scale = 2;
            this.sceneManager.addDisplay(this.mianpian);
            this.sceneManager.addDisplay(new marmoset.MarShadowSprite);
            this.sceneManager.ready = true;
            this.sceneManager.cam3D = new Camera3D();
            this.sceneManager.cam3D.cavanRect = new Rectangle(0, 0, 512, 512);
            this.sceneManager.cam3D.distance = 200;
            this.sceneManager.focus3D.rotationY = random(360);
            this.sceneManager.focus3D.rotationX = -45;
        };
        Marmoset3dScene.prototype.addBaseChar = function () {
            var $baseChar = new LayaSceneChar();
            $baseChar.setRoleUrl(getRoleUrl("5103"));
            this.sceneManager.addMovieDisplay($baseChar);
        };
        Marmoset3dScene.prototype.addEvents = function () {
            this.on(MouseType.MouseDown, this, this.onStartDrag);
            this.on(MouseType.MouseWheel, this, this.onMouseWheel);
            Laya.stage.on(MouseType.MouseUp, this, this.onMouseUp);
            Laya.stage.on(MouseType.MouseMove, this, this.onMouseMove);
            Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onStageKeyDonw);
        };
        Marmoset3dScene.prototype.onStageKeyDonw = function (evt) {
            if (evt.keyCode == Pan3d.KeyboardType.F) {
                mars3D.MarmosetModel.getInstance().upFileToSvever();
            }
            if (evt.keyCode == Pan3d.KeyboardType.G) {
                mars3D.MarmosetModel.getInstance().upObjDataToSever();
            }
        };
        Marmoset3dScene.prototype.onMouseWheel = function (e) {
            this.sceneManager.cam3D.distance += e.delta;
        };
        Marmoset3dScene.prototype.onStartDrag = function (e) {
            if (this.mouseY < 30) {
                this.startDrag(this.dragRegion, true, this.height * 0.2);
            }
            else {
                this.lastMouseVec2d = new Vector2D(this.mouseX, this.mouseY);
                this.lastfocus3D = new Object3D();
                this.lastfocus3D.rotationY = this.sceneManager.focus3D.rotationY;
                this.lastfocus3D.rotationX = this.sceneManager.focus3D.rotationX;
            }
        };
        Marmoset3dScene.prototype.onMouseUp = function (e) {
            this.lastMouseVec2d = null;
            var len = mars3D.MarmosetModel.getInstance().textureItem.length;
            if (this.mianpian._uvTextureRes && len) {
                this.mianpian._uvTextureRes.texture = mars3D.MarmosetModel.getInstance().textureItem[this.selectId % len];
                this.selectId++;
            }
        };
        Marmoset3dScene.prototype.onMouseMove = function (e) {
            if (this.lastMouseVec2d) {
                this.sceneManager.focus3D.rotationY = this.lastfocus3D.rotationY - (this.mouseX - this.lastMouseVec2d.x);
                this.sceneManager.focus3D.rotationX = this.lastfocus3D.rotationX - (this.mouseY - this.lastMouseVec2d.y) / 10;
            }
        };
        Marmoset3dScene.prototype.upDataLightShadow = function () {
            if (!mars3D.MarmosetLightVo.marmosetLightVo) {
                mars3D.MarmosetLightVo.marmosetLightVo = new mars3D.MarmosetLightVo();
            }
            else {
                mars3D.MarmosetLightVo.marmosetLightVo.update(mars3D.MarmosetModel.meshItem);
            }
        };
        Marmoset3dScene.prototype.upData = function () {
            if (this.sceneManager) {
                this.upDataLightShadow();
                Pan3d.MathClass.getCamView(this.sceneManager.cam3D, this.sceneManager.focus3D); //一定要角色帧渲染后再重置镜头矩阵
                _super.prototype.upData.call(this);
            }
        };
        return Marmoset3dScene;
    }(Laya3dSprite));
    mars3D.Marmoset3dScene = Marmoset3dScene;
})(mars3D || (mars3D = {}));
//# sourceMappingURL=Marmoset3dScene.js.map