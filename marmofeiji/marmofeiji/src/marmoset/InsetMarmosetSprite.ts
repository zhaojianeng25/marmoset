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
        private _insetMarmose: InsetMarmosetSprite
        private initBuffers(gl: WebGLRenderingContext): void {
            var vertices = new Float32Array([
                -0.0, 0.5, -0.5, -0.5, 0.5, -0.5
            ]);
            //创建缓冲区对象
            this.objData.vertexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.objData.vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
            this.objData.treNum=3

  

        }
        private makeInsetMesh(): void {
            if (!this._insetMarmose) {
                this.objData = new ObjData;
               // this._insetMarmose = this;
                var VSHADER_SOURCE =
                    "attribute vec4 a_Position;" +
                    "void main() {" +
                    "gl_Position = a_Position; " +
                    "} ";

                var FSHADER_SOURCE =
                    "void main() {" +
                    "gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);" +
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

                this.initBuffers(gl);

               
            }


            
        }
    
        public upDataBygl(value: WebGLRenderingContext): void {
            this._gl = value;
            if (!this._context3D) {
                this._context3D = new InsetContext3D(this._gl)
            }
            this.makeInsetMesh()

            var gl = this._gl
            gl.useProgram(this.program);
            var temp = gl.getAttribLocation(this.program, 'a_Position')
            gl.vertexAttribPointer(temp, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(temp);
            gl.drawArrays(gl.TRIANGLES, 0, this.objData.treNum);
      
        }



    }
}