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
        InsetMarmosetSprite.prototype.initBuffers = function (gl) {
            var vertices = new Float32Array([
                -0.0, 0.5, -0.5, -0.5, 0.5, -0.5
            ]);
            //创建缓冲区对象
            this.objData.vertexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.objData.vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
            this.objData.treNum = 3;
        };
        InsetMarmosetSprite.prototype.makeInsetMesh = function () {
            if (!this._insetMarmose) {
                this.objData = new ObjData;
                // this._insetMarmose = this;
                var VSHADER_SOURCE = "attribute vec4 a_Position;" +
                    "void main() {" +
                    "gl_Position = a_Position; " +
                    "} ";
                var FSHADER_SOURCE = "void main() {" +
                    "gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);" +
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
                this.initBuffers(gl);
            }
        };
        InsetMarmosetSprite.prototype.upDataBygl = function (value) {
            this._gl = value;
            if (!this._context3D) {
                this._context3D = new InsetContext3D(this._gl);
            }
            this.makeInsetMesh();
            var gl = this._gl;
            gl.useProgram(this.program);
            var temp = gl.getAttribLocation(this.program, 'a_Position');
            gl.vertexAttribPointer(temp, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(temp);
            gl.drawArrays(gl.TRIANGLES, 0, this.objData.treNum);
        };
        return InsetMarmosetSprite;
    }(Display3D));
    mars3D.InsetMarmosetSprite = InsetMarmosetSprite;
})(mars3D || (mars3D = {}));
//# sourceMappingURL=InsetMarmosetSprite.js.map