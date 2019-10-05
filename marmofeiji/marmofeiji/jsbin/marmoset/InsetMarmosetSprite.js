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
    var Shader3D = Pan3d.Shader3D;
    var Display3D = Pan3d.Display3D;
    var InsetMarmosetShader = /** @class */ (function (_super) {
        __extends(InsetMarmosetShader, _super);
        function InsetMarmosetShader() {
            return _super.call(this) || this;
        }
        InsetMarmosetShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
        };
        InsetMarmosetShader.prototype.getVertexShaderString = function () {
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
        InsetMarmosetShader.prototype.getFragmentShaderString = function () {
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
        InsetMarmosetShader.InsetMarmosetShader = "InsetMarmosetShader";
        return InsetMarmosetShader;
    }(Shader3D));
    mars3D.InsetMarmosetShader = InsetMarmosetShader;
    var InsetMarmosetSprite = /** @class */ (function (_super) {
        __extends(InsetMarmosetSprite, _super);
        function InsetMarmosetSprite() {
            return _super.call(this) || this;
        }
        InsetMarmosetSprite.prototype.makeInsetMesh = function () {
            if (!this._insetMarmose) {
                this._insetMarmose = this;
                var VSHADER_SOURCE = "void main() {" +
                    //设置坐标
                    "gl_Position = vec4(0.0, 0.0, 0.0, 1.0); " +
                    //设置尺寸
                    "gl_PointSize = 10.0; " +
                    "} ";
                //片元着色器
                var FSHADER_SOURCE = "void main() {" +
                    //设置颜色
                    "gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);" +
                    "}";
                //获取canvas元素
                //获取绘制二维上下文
                var gl = this._gl;
                //编译着色器
                var vertShader = gl.createShader(gl.VERTEX_SHADER);
                gl.shaderSource(vertShader, VSHADER_SOURCE);
                gl.compileShader(vertShader);
                var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
                gl.shaderSource(fragShader, FSHADER_SOURCE);
                gl.compileShader(fragShader);
                //合并程序
                var shaderProgram = gl.createProgram();
                gl.attachShader(shaderProgram, vertShader);
                gl.attachShader(shaderProgram, fragShader);
                gl.linkProgram(shaderProgram);
                this.shaderProgram = shaderProgram;
            }
        };
        InsetMarmosetSprite.prototype.upDataBygl = function (value) {
            this._gl = value;
            var gl = this._gl;
            this.makeInsetMesh();
            gl.useProgram(this.shaderProgram);
            gl.drawArrays(gl.POINTS, 0, 1);
        };
        return InsetMarmosetSprite;
    }(Display3D));
    mars3D.InsetMarmosetSprite = InsetMarmosetSprite;
})(mars3D || (mars3D = {}));
//# sourceMappingURL=InsetMarmosetSprite.js.map