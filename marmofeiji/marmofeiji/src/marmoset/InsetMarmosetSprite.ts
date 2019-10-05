module mars3D {
 
    import Display3D = Pan3d.Display3D
    import Context3D = Pan3d.Context3D
 
    

    export class InsetContext3D extends Context3D {
        constructor(value: WebGLRenderingContext) {
            super();
            this.renderContext = value;
        }
    }
    export class InsetMarmosetSprite extends Display3D {
        private _context3D: InsetContext3D
        constructor() {
            super();
        }
        private _gl: WebGLRenderingContext
 
        private makeBaseObjData(): void {
            if (!this._context3D) {
                this._context3D = new InsetContext3D(this._gl)
            }
            if (!this.objData) {
                this.objData = new ObjData;
                this.objData.vertices = new Array();
                var sizeNum: number = 0.5;
                var tx: number = -0.5

                var setDepth: number = 0.001;
                this.objData.vertices.push(-sizeNum + tx, +sizeNum, setDepth);
                this.objData.vertices.push(+sizeNum + tx, +sizeNum, 0.999);
                this.objData.vertices.push(+sizeNum + tx, -sizeNum, 0.999);
                this.objData.vertices.push(-sizeNum + tx, -sizeNum, setDepth);

                this.objData.uvs = new Array()
                this.objData.uvs.push(0, 0);
                this.objData.uvs.push(1, 0);
                this.objData.uvs.push(1, 1);
                this.objData.uvs.push(0, 1);

                this.objData.indexs = new Array();
                this.objData.indexs.push(0, 1, 2);
                this.objData.indexs.push(0, 2, 3);
                this.upToGpu()


                var VSHADER_SOURCE =
                    "attribute vec3 v3Position;" +
                    "attribute vec2 u2Texture;" +
                    "varying vec2 v_texCoord;" +
                    "void main(void)" +
                    "{" +
                    "   v_texCoord = vec2(u2Texture.x, u2Texture.y);" +
                    "   vec4 vt0= vec4(v3Position.xyz, 1.0);" +
                    "   gl_Position = vt0;" +
                    "}";

                var FSHADER_SOURCE =
                    "precision mediump float;\n" +
 
                    "varying vec2 v_texCoord;\n" +
                    "void main(void)\n" +
                    "{\n" +
                        "gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n" +
                    "}";
                var gl = this._gl

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
            }
     
        }
        public upToGpu(): void {
            if (this.objData.indexs.length) {
                this.objData.treNum = this.objData.indexs.length
                this.objData.vertexBuffer = this._context3D.uploadBuff3D(this.objData.vertices);
                this.objData.uvBuffer = this._context3D.uploadBuff3D(this.objData.uvs);
                this.objData.indexBuffer = this._context3D.uploadIndexBuff3D(this.objData.indexs);
    
            }
        }

    
        public upDataBygl(value: WebGLRenderingContext): void {
            this._gl = value;

            this.makeBaseObjData();

            var gl = this._gl;
            gl.useProgram(this.program);
            this._context3D.setVa(0, 3, this.objData.vertexBuffer);
            this._context3D.setVa(1, 2, this.objData.uvBuffer);
            this._context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);

          

 
        }



    }
}