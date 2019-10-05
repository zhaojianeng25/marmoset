module same {
    import Shader3D = Pan3d.Shader3D
    import Display3D = Pan3d.Display3D
    import ProgrmaManager = Pan3d.ProgrmaManager
    import UIManager = Pan3d.UIManager
    import Scene_data = Pan3d.Scene_data
    import TextureRes = Pan3d.TextureRes
    import TextureManager = Pan3d.TextureManager
    export class BaseSametRectShader extends Shader3D {
        static BaseSametRectShader: string = "BaseSametRectShader";
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

    export class BaseSametRectSprite extends dis.BaseRectSprite {

        
        constructor() {
            super();
            this.initData()
        }
        protected initData(): void {
            super.initData()
            ProgrmaManager.getInstance().registe(BaseSametRectShader.BaseSametRectShader, new BaseSametRectShader);
            this.shader = ProgrmaManager.getInstance().getProgram(BaseSametRectShader.BaseSametRectShader);
            this.program = this.shader.program;
  

        }
      
  
 

        public update(): void {

            super.update()
        }
      



    }
}