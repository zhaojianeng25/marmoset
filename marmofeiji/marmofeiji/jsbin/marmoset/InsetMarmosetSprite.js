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
    var Display3D = Pan3d.Display3D;
    var Context3D = Pan3d.Context3D;
    var InsetContext3D = /** @class */ (function (_super) {
        __extends(InsetContext3D, _super);
        function InsetContext3D(value) {
            var _this = _super.call(this) || this;
            _this.renderContext = value;
            return _this;
        }
        return InsetContext3D;
    }(Context3D));
    mars3D.InsetContext3D = InsetContext3D;
    var InsetMarmosetSprite = /** @class */ (function (_super) {
        __extends(InsetMarmosetSprite, _super);
        function InsetMarmosetSprite() {
            return _super.call(this) || this;
        }
        InsetMarmosetSprite.prototype.makeBaseObjData = function () {
            if (!this._context3D) {
                this._context3D = new InsetContext3D(this._gl);
            }
            this.objData = new ObjData;
            this.objData.vertices = new Array();
            var sizeNum = 0.5;
            var tx = -0.5;
            var setDepth = 0.001;
            this.objData.vertices.push(-sizeNum + tx, +sizeNum, setDepth);
            this.objData.vertices.push(+sizeNum + tx, +sizeNum, 0.999);
            this.objData.vertices.push(+sizeNum + tx, -sizeNum, 0.999);
            this.objData.vertices.push(-sizeNum + tx, -sizeNum, setDepth);
            this.objData.uvs = new Array();
            this.objData.uvs.push(0, 0);
            this.objData.uvs.push(1, 0);
            this.objData.uvs.push(1, 1);
            this.objData.uvs.push(0, 1);
            this.objData.indexs = new Array();
            this.objData.indexs.push(0, 1, 2);
            this.objData.indexs.push(0, 2, 3);
            this.upToGpu();
            var VSHADER_SOURCE = "attribute vec3 v3Position;" +
                "attribute vec2 u2Texture;" +
                "varying vec2 v_texCoord;" +
                "void main(void)" +
                "{" +
                "   v_texCoord = vec2(u2Texture.x, u2Texture.y);" +
                "   vec4 vt0= vec4(v3Position.xyz, 1.0);" +
                "   gl_Position = vt0;" +
                "}";
            var FSHADER_SOURCE = "precision mediump float;\n" +
                "varying vec2 v_texCoord;\n" +
                "void main(void)\n" +
                "{\n" +
                "gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n" +
                "}";
            var gl = this._gl;
            var vertShader = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vertShader, VSHADER_SOURCE);
            gl.compileShader(vertShader);
            var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fragShader, FSHADER_SOURCE);
            gl.compileShader(fragShader);
            this.program = gl.createProgram();
            gl.attachShader(this.program, vertShader);
            gl.attachShader(this.program, fragShader);
            gl.linkProgram(this.program);
        };
        InsetMarmosetSprite.prototype.upToGpu = function () {
            if (this.objData.indexs.length) {
                this.objData.treNum = this.objData.indexs.length;
                this.objData.vertexBuffer = this._context3D.uploadBuff3D(this.objData.vertices);
                this.objData.uvBuffer = this._context3D.uploadBuff3D(this.objData.uvs);
                this.objData.indexBuffer = this._context3D.uploadIndexBuff3D(this.objData.indexs);
            }
        };
        InsetMarmosetSprite.prototype.upDataBygl = function (value) {
            this._gl = value;
            if (!this.objData) {
                this.makeBaseObjData();
            }
            this._gl.useProgram(this.program);
            this._context3D.setVa(0, 3, this.objData.vertexBuffer);
            this._context3D.setVa(1, 2, this.objData.uvBuffer);
            this._context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
        };
        return InsetMarmosetSprite;
    }(Display3D));
    mars3D.InsetMarmosetSprite = InsetMarmosetSprite;
})(mars3D || (mars3D = {}));
//# sourceMappingURL=InsetMarmosetSprite.js.map