﻿module same {
    import Scene_data = Pan3d.Scene_data
    import Shader3D = Pan3d.Shader3D
    import ProgrmaManager = Pan3d.ProgrmaManager
    import GlReset = Pan3d.GlReset
    import Matrix3D = Pan3d.Matrix3D


    export class MarFBO extends Pan3d.FBO {
        public constructor(w: number = 128, h: number = 128) {
            super(w, h)
        }
        public depthViewMatrix3D: any
        public depthTexture: WebGLTexture
    }


    export class MarmosetLightVoShader extends Shader3D {
        static MarmosetLightVoShader: string = "MarmosetLightVoShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "vPosition");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 vPosition;" +
                "attribute vec2 u2Texture;" +
                "uniform mat4 viewMatrix3D;" +
                "varying vec2 d;\n" +
                "varying vec2 jG; \n" +
                "void main(void)" +
                "{" +
                "   d = vec2(u2Texture.x, u2Texture.y);" +
                "vec4 vt0= vec4(vPosition, 1.0);" +
                "vt0 = viewMatrix3D * vt0;" +

                "jG=vt0.zw;" +
                //      "vt0 = vec4( vt0.x, vt0.y,0.90,  vt0.w*2.0);" +
                "gl_Position = vt0;" +


                "}"
            return $str


        }
        getFragmentShaderString(): string {
            var $str: string =
                "precision highp  float;\n" +
                "uniform sampler2D tAlbedo;\n" +

                "varying vec2 d;\n" +
                "varying vec2 jG; \n" +
                "vec3 jH(float v){\n" +
                "vec4 jI = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\n" +
                "jI = fract(jI);\n" +
                "jI.xyz -= jI.yzw * (1.0 / 255.0);\n" +
                "return jI.xyz;\n" +
                "} \n" +

                "vec4 pack (float depth) {\n" +
                "depth=depth*0.5+0.5;\n" +
                " vec4 bitShift = vec4(1.0, 255.0, 255.0 * 255.0, 255.0 * 255.0 * 255.0);\n" +
                " vec4 bitMask = vec4(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0, 0.0);\n" +
                "vec4 rgbaDepth = fract(depth * bitShift);  \n" +
                "rgbaDepth -= rgbaDepth.yzww * bitMask;  \n" +
                "return rgbaDepth;\n" +
                "}\n" +
                "float unpack( vec4 rgbaDepth) {" +
                " vec4 bitShift = vec4(1.0, 1.0 / 255.0, 1.0 / (255.0 * 255.0), 1.0 / (255.0 * 255.0 * 255.0));" +
                "float outnum=  dot(rgbaDepth, bitShift);" +
                "outnum=(outnum-0.5)*2.0;\n" +
                "return outnum;" +
                "}" +

                "void main(void) " +
                "{ " +
                "vec4 tAlbedoColor =texture2D(tAlbedo,d.xy); " +
                // "gl_FragColor.xyz=jH((jG.x/jG.y)*0.5+0.5); " +
                //"float tempz =0.9123456 ;"+
                "float tempz =jG.x/jG.y;" +
                "vec4 tempVec4 = pack(tempz); " +
                "float tempFoalt = unpack(tempVec4); " +
                "gl_FragColor = pack(tempz); " +
                // "gl_FragColor =tAlbedoColor; " +

                "if (tempFoalt>0.9123455) { " +
                // "gl_FragColor = vec4(0.0,1.0,0.0,1.0); " +
                "}  " +

                // "gl_FragColor =vec4(1.0,0.0,0.0,1.0); " +
                //  "gl_FragColor =vec4(1.0,0.0,0.0,0.1); " +
                //   "gl_FragColor = vec4(gl_FragCoord.z,0.0,0.1236,1.0);\n" +
                //   "gl_FragColor.w=0.0; " +

                "}"
            return $str

        }

    }
    export class DrawRenderSprite {
        public depthFBO: MarFBO;


        public constructor() {
            this.depthFBO = new MarFBO(2048, 2048);
            this.depthFBO.color = new Vector3D(0, 0, 0, 0);


      


            //深度贴图
            var gl: WebGLRenderingContext = Scene_data.context3D.renderContext;
            var ext = gl.getExtension('WEBGL_depth_texture');

            this.depthFBO.depthTexture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this.depthFBO.depthTexture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, this.depthFBO.width, this.depthFBO.height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);


            console.log("---3---", gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, this.depthFBO.width, this.depthFBO.height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null)
            gl.bindTexture(gl.TEXTURE_2D, null);

        }
      
        private updateDepthTexture(fbo: MarFBO): void {

            var gl: WebGLRenderingContext = Scene_data.context3D.renderContext

            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.frameBuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.depthFBO.texture, 0);
            //   gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthFBO.depthTexture, 0);
 
            gl.viewport(0, 0, fbo.width, fbo.height);
            gl.clearColor(fbo.color.x, fbo.color.y, fbo.color.z, fbo.color.w);

            gl.clearDepth(1.0);
            gl.clearStencil(0.0);
            gl.enable(gl.DEPTH_TEST);
            gl.depthMask(true);
            gl.enable(gl.BLEND);
            gl.disable(gl.BLEND); //不用混合模式
            gl.frontFace(gl.CW);

 

            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
            gl.clearColor(fbo.color.x, fbo.color.y, fbo.color.z, fbo.color.w);


        }
        public static tempRect: depth.DepthRectSprite;
        public update(): void {

            var gl: WebGLRenderingContext = Scene_data.context3D.renderContext;
            GlReset.saveBasePrarame(gl);
            this.updateDepthTexture(this.depthFBO);

            this.depthFBO.color.x = Math.random();
            this.depthFBO.color.y = Math.random();
            this.depthFBO.color.z = Math.random();
            this.depthFBO.color.w = Math.random();

    
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.bindTexture(gl.TEXTURE_2D, null);
            GlReset.resetBasePrarame(gl);


        }
 


    }
}