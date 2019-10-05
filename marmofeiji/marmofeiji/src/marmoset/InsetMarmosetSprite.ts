module mars3D {
    import Shader3D = Pan3d.Shader3D
    import Display3D = Pan3d.Display3D
    import ProgrmaManager = Pan3d.ProgrmaManager
    import UIManager = Pan3d.UIManager
    import Scene_data = Pan3d.Scene_data
    import TextureRes = Pan3d.TextureRes
    import TextureManager = Pan3d.TextureManager
    export class InsetMarmosetShader extends Shader3D {
        static InsetMarmosetShader: string = "InsetMarmosetShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Position;" +
                "attribute vec2 u2Texture;" +
                "varying vec2 v_texCoord;" +
                "void main(void)" +
                "{" +
                "   v_texCoord = vec2(u2Texture.x, u2Texture.y);" +
                "   vec4 vt0= vec4(v3Position.xyz, 1.0);" +
                "   gl_Position = vt0;" +
                "}"
            return $str
        }
        getFragmentShaderString(): string {
            var $str: string =
                "precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "uniform vec4 fColor;" +
                "varying vec2 v_texCoord;\n" +

                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
             //   "infoUv.xyz=(infoUv.xxx-0.5)*2.0 ;\n " +
 
                "gl_FragColor = infoUv;\n" +
                "}"
            return $str

        }

    }

    export class InsetMarmosetSprite extends Display3D {

        constructor() {
            super();
 
        }
        private _gl: WebGLRenderingContext
        private _insetMarmose: InsetMarmosetSprite

        private makeInsetMesh(): void {
            if (!this._insetMarmose) {
                this._insetMarmose = this;

                var VSHADER_SOURCE =
                    "void main() {" +
                    //设置坐标
                    "gl_Position = vec4(0.0, 0.0, 0.0, 1.0); " +
                    //设置尺寸
                    "gl_PointSize = 10.0; " +
                    "} ";

                //片元着色器
                var FSHADER_SOURCE =
                    "void main() {" +
                    //设置颜色
                    "gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);" +
                    "}";
                //获取canvas元素

                //获取绘制二维上下文
                var gl = this._gl

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

                this.shaderProgram = shaderProgram
               
            }


            
        }
        private shaderProgram: WebGLProgram;
        public upDataBygl(value: WebGLRenderingContext): void {
            this._gl = value;
            var gl = this._gl

            this.makeInsetMesh()
            gl.useProgram(this.shaderProgram);
            gl.drawArrays(gl.POINTS, 0, 1);
      
        }



    }
}