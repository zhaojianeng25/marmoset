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
var same;
(function (same) {
    var Shader3D = Pan3d.Shader3D;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var BaseSametRectShader = /** @class */ (function (_super) {
        __extends(BaseSametRectShader, _super);
        function BaseSametRectShader() {
            return _super.call(this) || this;
        }
        BaseSametRectShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
        };
        BaseSametRectShader.prototype.getVertexShaderString = function () {
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
        BaseSametRectShader.prototype.getFragmentShaderString = function () {
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
        BaseSametRectShader.BaseSametRectShader = "BaseSametRectShader";
        return BaseSametRectShader;
    }(Shader3D));
    same.BaseSametRectShader = BaseSametRectShader;
    var BaseSametRectSprite = /** @class */ (function (_super) {
        __extends(BaseSametRectSprite, _super);
        function BaseSametRectSprite() {
            var _this = _super.call(this) || this;
            _this.initData();
            return _this;
        }
        BaseSametRectSprite.prototype.initData = function () {
            _super.prototype.initData.call(this);
            ProgrmaManager.getInstance().registe(BaseSametRectShader.BaseSametRectShader, new BaseSametRectShader);
            this.shader = ProgrmaManager.getInstance().getProgram(BaseSametRectShader.BaseSametRectShader);
            this.program = this.shader.program;
        };
        BaseSametRectSprite.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        return BaseSametRectSprite;
    }(dis.BaseRectSprite));
    same.BaseSametRectSprite = BaseSametRectSprite;
})(same || (same = {}));
//# sourceMappingURL=BaseSametRectSprite.js.map