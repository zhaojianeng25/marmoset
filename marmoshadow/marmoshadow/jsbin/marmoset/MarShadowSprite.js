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
var marmoset;
(function (marmoset) {
    var Shader3D = Pan3d.Shader3D;
    var Display3D = Pan3d.Display3D;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var UIManager = Pan3d.UIManager;
    var Scene_data = Pan3d.Scene_data;
    var TextureManager = Pan3d.TextureManager;
    var MarmosetLightVo = mars3D.MarmosetLightVo;
    var MarShadowShader = /** @class */ (function (_super) {
        __extends(MarShadowShader, _super);
        function MarShadowShader() {
            return _super.call(this) || this;
        }
        MarShadowShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
        };
        MarShadowShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Position;" +
                "attribute vec2 u2Texture;" +
                "varying vec2 v_texCoord;" +
                "void main(void)" +
                "{" +
                "   v_texCoord = vec2(u2Texture.x, u2Texture.y);" +
                "   vec4 vt0= vec4(v3Position.xyz, 1.0);" +
                "   gl_Position = vt0;" +
                "}";
            return $str;
        };
        MarShadowShader.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "uniform vec4 fColor;" +
                "varying vec2 v_texCoord;\n" +
                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
                //   "infoUv.xyz=(infoUv.xxx-0.5)*2.0 ;\n " +
                "gl_FragColor = infoUv;\n" +
                "}";
            return $str;
        };
        MarShadowShader.MarShadowShader = "MarShadowShader";
        return MarShadowShader;
    }(Shader3D));
    marmoset.MarShadowShader = MarShadowShader;
    var MarShadowSprite = /** @class */ (function (_super) {
        __extends(MarShadowSprite, _super);
        function MarShadowSprite() {
            var _this = _super.call(this) || this;
            _this.skipNum = 0;
            _this.initData();
            return _this;
        }
        MarShadowSprite.prototype.initData = function () {
            ProgrmaManager.getInstance().registe(MarShadowShader.MarShadowShader, new MarShadowShader);
            this.shader = ProgrmaManager.getInstance().getProgram(MarShadowShader.MarShadowShader);
            this.program = this.shader.program;
            this.objData = new ObjData;
            this.objData.vertices = new Array();
            var sizeNum = 0.3;
            var tx = -0.6;
            var ty = -0.3;
            var setDepth = 0.001;
            this.objData.vertices.push(-sizeNum + tx, +sizeNum + ty, 0.001);
            this.objData.vertices.push(+sizeNum + tx, +sizeNum + ty, 0.001);
            this.objData.vertices.push(+sizeNum + tx, -sizeNum + ty, 0.001);
            this.objData.vertices.push(-sizeNum + tx, -sizeNum + ty, 0.001);
            this.objData.uvs = new Array();
            this.objData.uvs.push(0, 1);
            this.objData.uvs.push(1, 1);
            this.objData.uvs.push(1, 0);
            this.objData.uvs.push(0, 0);
            this.objData.indexs = new Array();
            this.objData.indexs.push(0, 1, 2);
            this.objData.indexs.push(0, 2, 3);
            this.loadTexture();
            this.upToGpu();
        };
        MarShadowSprite.prototype.loadTexture = function () {
            var $ctx = UIManager.getInstance().getContext2D(128, 128, false);
            $ctx.fillStyle = "rgb(255,0,255)";
            $ctx.fillRect(0, 0, 128, 128);
            this._uvTextureRes = TextureManager.getInstance().getCanvasTexture($ctx);
            TextureManager.getInstance().getTexture(Scene_data.fileuiRoot + "512.jpg", function (a) {
            });
        };
        MarShadowSprite.prototype.upToGpu = function () {
            if (this.objData.indexs.length) {
                this.objData.treNum = this.objData.indexs.length;
                this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
                this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            }
        };
        MarShadowSprite.prototype.update = function () {
            if (this.objData && this.objData.indexBuffer && this._uvTextureRes) {
                Scene_data.context3D.setCullFaceModel(2);
                var gl = Scene_data.context3D.renderContext;
                gl.disable(gl.CULL_FACE);
                Scene_data.context3D.setProgram(this.program);
                Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);
                Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this._uvTextureRes.texture, 0);
                if (MarmosetLightVo.marmosetLightVo && MarmosetLightVo.marmosetLightVo.depthFBO && MarmosetLightVo.marmosetLightVo.depthFBO.texture) {
                    Scene_data.context3D.setRenderTexture(this.shader, "s_texture", MarmosetLightVo.marmosetLightVo.depthFBO.depthTexture, 0);
                }
                Scene_data.context3D.setVc4fv(this.shader, "fColor", [0.999, 0, 0, 1]);
                Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            }
        };
        return MarShadowSprite;
    }(Display3D));
    marmoset.MarShadowSprite = MarShadowSprite;
})(marmoset || (marmoset = {}));
//# sourceMappingURL=MarShadowSprite.js.map