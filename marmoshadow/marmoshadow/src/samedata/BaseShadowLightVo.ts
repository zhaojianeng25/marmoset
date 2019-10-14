module samedata {
    import Scene_data = Pan3d.Scene_data
    import Shader3D = Pan3d.Shader3D
    import ProgrmaManager = Pan3d.ProgrmaManager
    import GlReset = Pan3d.GlReset
    import Matrix3D = Pan3d.Matrix3D
    import Mars3Dmesh = mars3D.Mars3Dmesh


    export class MarFBO extends Pan3d.FBO {
        public constructor(w: number = 128, h: number = 128) {
            super(w, h)
        }
        public depthViewMatrix3D: any
        public depthTexture: WebGLTexture
    }


    export class BaseShadowLightShader extends Shader3D {
        static BaseShadowLightShader: string = "BaseShadowLightShader";
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
                "d = vec2(u2Texture.x, u2Texture.y);" +
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
    export class BaseShadowLightVo {
        public depthFBO: MarFBO;


        public constructor() {
            this.depthFBO = new MarFBO(2048, 2048);
            this.depthFBO.color = new Vector3D(0, 0, 0, 0);


            ProgrmaManager.getInstance().registe(BaseShadowLightShader.BaseShadowLightShader, new BaseShadowLightShader);
            this.shader = ProgrmaManager.getInstance().getProgram(BaseShadowLightShader.BaseShadowLightShader);



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
        private shader: Shader3D;
        private updateDepthTexture(fbo: MarFBO): void {

            var gl: WebGLRenderingContext = Scene_data.context3D.renderContext

            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.frameBuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.depthFBO.texture, 0);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthFBO.depthTexture, 0);

            //  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthFBO.depthTexture ,0)

            gl.viewport(0, 0, fbo.width, fbo.height);
            gl.clearColor(fbo.color.x, fbo.color.y, fbo.color.z, fbo.color.w);
            gl.clearColor(1, 1, 1, 1);
            gl.clearDepth(1.0);
            gl.clearStencil(0.0);
            gl.enable(gl.DEPTH_TEST);
            gl.depthMask(true);
            gl.enable(gl.BLEND);
            gl.disable(gl.BLEND); //不用混合模式
            gl.frontFace(gl.CW);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);





        }
        public static tempRect: depth.DepthRectSprite;
        public update(value: Array<Mars3Dmesh>): void {

            if (value && value.length) {
                var gl: WebGLRenderingContext = Scene_data.context3D.renderContext;
                GlReset.saveBasePrarame(gl);
                this.updateDepthTexture(this.depthFBO);

                for (var i: number = 0; i < value.length; i++) {
                    this.drawTempMesh(value[i], mars3D.MarmosetModel.meshRenderables[i]);
                }

                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                gl.bindTexture(gl.TEXTURE_2D, null);
                //   gl.bindRenderbuffer(gl.RENDERBUFFER, null);
                GlReset.resetBasePrarame(gl);


            }
        }

        private skipNum: number = 1
        private fract(value: number): number {
            return value - Math.floor(value)
        }
        private make255(value: number): number {

            return Math.floor(value * 255) / 255
        }
        private packdepth(depth: number): void {
            console.log("base", depth)
            var bitShift: Vector3D = new Vector3D(1.0, 255.0, 255.0 * 255.0, 255.0 * 255.0 * 255.0);
            var bitMask: Vector3D = new Vector3D(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0, 0.0)

            var rgbaDepth: Vector3D = bitShift.clone()
            rgbaDepth.x *= depth
            rgbaDepth.y *= depth
            rgbaDepth.z *= depth
            rgbaDepth.w *= depth
            console.log(rgbaDepth)

            rgbaDepth.x = this.fract(rgbaDepth.x)
            rgbaDepth.y = this.fract(rgbaDepth.y)
            rgbaDepth.z = this.fract(rgbaDepth.z)
            rgbaDepth.w = this.fract(rgbaDepth.w)
            console.log(rgbaDepth)
            rgbaDepth.x -= rgbaDepth.y * bitMask.x
            rgbaDepth.y -= rgbaDepth.z * bitMask.y
            rgbaDepth.z -= rgbaDepth.w * bitMask.z
            rgbaDepth.w -= rgbaDepth.w * bitMask.w
            console.log(rgbaDepth)

            rgbaDepth.x = this.make255(rgbaDepth.x)
            rgbaDepth.y = this.make255(rgbaDepth.y)
            rgbaDepth.z = this.make255(rgbaDepth.z)
            rgbaDepth.w = this.make255(rgbaDepth.w)
            console.log(rgbaDepth)

            rgbaDepth.w = 0.1

            var outNum: number = this.upackDepth(rgbaDepth)
            console.log("outNum=>", outNum)
            console.log("basereb=>", Math.floor(depth * 255) / 255)
            console.log("----------------", depth - outNum)

            //"vec4 rgbaDepth = fract(depth * bitShift);  \n" +
            //"rgbaDepth -= rgbaDepth.yzww * bitMask;  \n" +
            //"return rgbaDepth;\n" +

        }
        private upackDepth(value: Vector3D): number {
            var bitShift: Vector3D = new Vector3D(1.0, 1.0 / 255.0, 1.0 / (255.0 * 255.0), 1.0 / (255.0 * 255.0 * 255.0));

            var outNum: number = bitShift.x * value.x + bitShift.y * value.y + bitShift.z * value.z + bitShift.w * value.w
            //   console.log(outNum)

            //" vec4 bitShift = vec4(1.0, 1.0 / 255.0, 1.0 / (255.0 * 255.0), 1.0 / (255.0 * 255.0 * 255.0));" +
            //    "return dot(rgbaDepth, bitShift);" 
            return outNum
        }
        private getViewMatrax3d(temp: Float32Array): Matrix3D {
            //从最后的阴影矩阵中反回扫描矩阵
            var tempMatrx: Matrix3D = new Matrix3D()
            var addOther: Matrix3D = new Matrix3D()


           // var baseArr: Array<number> = [-0.3008589744567871, -0.46715670824050903, -1.697446584701538, -0.95980304479599, 0.010379503481090069, 0.6497568488121033, 0.03671305626630783, 0.020759006962180138, -0.7538937330245972, -0.13623611629009247, -0.4950234591960907, -0.2799057364463806, 13.955045700073242, 7.7973480224609375, 17.586936950683594, 25.643653869628906]
            // var baseArr: Array<number> = [-0.03556060791015625, 0.46315664052963257, 0.7268134355545044, 0.5655789971351624, -0.29182812571525574, 0.06843513250350952, -0.7500441074371338, -0.5836562514305115, 0.6003482341766357, 0.47712552547454834, 0.7487342357635498, 0.5826369524002075, 7.433165550231934, 9.85171890258789, 16.273618698120117, 20.049705505371094]
           var baseArr: Array<number> = [-0.5565775632858276, -0.4951910376548767, -1.551121711730957, -0.9903820753097534, -2.6765993865751625e-9, 0.4436734914779663, -8.384100524949645e-9, -5.353198773150325e-9, -0.3702264428138733, 0.06917984038591385, 0.2166968584060669, 0.1383596807718277, 11.517491340637207, 9.341407775878906, 14.866768836975098, 20.56804656982422]

            for (var i: number = 0; i < 16; i++) {
                tempMatrx.m[i] = baseArr[i];
                addOther.m[i] = temp[i];
            }
            tempMatrx.prepend(addOther);
            tempMatrx.appendTranslation(-0.5, -0.5, -0.5);
            tempMatrx.appendScale(2, 2, 2);



            return tempMatrx
        }
        private drawTempMesh(mesh: Mars3Dmesh, meshRenderable: any): void {
            if (mesh.tAlbedo && mesh.tNormal && mesh.tReflectivity) {


                var b = Scene_data.context3D.renderContext;

                Scene_data.context3D.setWriteDepth(true);
                Scene_data.context3D.setDepthTest(true);
                Scene_data.context3D.setCullFaceModel(1)
                Scene_data.context3D.setBlendParticleFactors(Math.floor(this.skipNum / 100) % 6)

                Scene_data.context3D.setProgram(this.shader.program);
                if (!this.depthFBO.depthViewMatrix3D) {
                    if (mesh.materials["mview"]) {
                        this.depthFBO.depthViewMatrix3D = mesh.materials["mview"];
                    } else {
                        return
                    }
                }
                var tempArr: Array<number> = [-0.8713266253471375, 8.985513999526518e-10, 0.40336546301841736, 0.1891629546880722, 0, 0.8873469829559326, -1.1415001388570545e-8, -5.353198773150325e-9, 0.16785317659378052, 4.664383990160559e-9, 2.093871831893921, 0.9819457530975342, 2.4669361114501953, -1.8852306604385376, 9.165491104125977, 20.56804656982422]
                //var tempArr: Array<number> = [0.6500183939933777, 0.3525499999523163, 0.867900013923645, 0.5527472496032715, 0, 0.7205265164375305, -0.9164319634437561, -0.5836562514305115, 0.6040370464324951, -0.3793872892856598, -0.9339674711227417, -0.5948242545127869, -5.183374404907227, -0.34626707434654236, 12.497532844543457, 20.049705505371094]
                //var tempArr: Array<number> = [-1.2446883916854858, 0.006111379712820053, -0.5838364362716675, -0.23012207448482513, 0, 1.278754711151123, 0.05266710743308067, 0.020759006962180138, -0.2943965494632721, -0.025838496163487434, 2.4684202671051025, 0.9729403257369995, 2.26643705368042, -10.048957824707031, 9.530219078063965, 25.643653869628906]


                //var tempArr: Array<number> = [-0.3008589744567871, -0.46715670824050903, -1.697446584701538, -0.95980304479599, 0.010379503481090069, 0.6497568488121033, 0.03671305626630783, 0.020759006962180138, -0.7538937330245972, -0.13623611629009247, -0.4950234591960907, -0.2799057364463806, 13.955045700073242, 7.7973480224609375, 17.586936950683594, 25.643653869628906]
                //var tempArr: Array<number> = [-0.03556060791015625, 0.46315664052963257, 0.7268134355545044, 0.5655789971351624, -0.29182812571525574, 0.06843513250350952, -0.7500441074371338, -0.5836562514305115, 0.6003482341766357, 0.47712552547454834, 0.7487342357635498, 0.5826369524002075, 7.433165550231934, 9.85171890258789, 16.273618698120117, 20.049705505371094]
                //var tempArr: Array<number> = [-0.5565775632858276, -0.4951910376548767, -1.551121711730957, -0.9903820753097534, -2.6765993865751625e-9, 0.4436734914779663, -8.384100524949645e-9, -5.353198773150325e-9, -0.3702264428138733, 0.06917984038591385, 0.2166968584060669, 0.1383596807718277, 11.517491340637207, 9.341407775878906, 14.866768836975098, 20.56804656982422]

                for (var kt: number = 0; kt < tempArr.length; kt++) {
                    this.depthFBO.depthViewMatrix3D[kt] = tempArr[kt];
               
                }

                var viewMatrix3DCone: Matrix3D = this.getViewMatrax3d(mesh.materials["vfinfo"]["uSkyMatrix"])

                //console.log(viewMatrix3D.m)
               // console.log(viewMatrix3DCone.m)
                //console.log("--------------------------")

                

                Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", viewMatrix3DCone.m);

                Scene_data.context3D.setRenderTexture(this.shader, "tAlbedo", mesh.tAlbedo.texture, 0);

                //    Scene_data.context3D.setVa(0, 3, mesh.objData.vertexBuffer);

                //    Scene_data.context3D.setVa(1, 2, mesh.objData.uvBuffer);



                b.enableVertexAttribArray(0);
                b.enableVertexAttribArray(1);
                b.bindBuffer(b.ARRAY_BUFFER, meshRenderable.mesh.vertexBuffer);
                b.vertexAttribPointer(0, 3, b.FLOAT, !1, 32, 0);
                b.vertexAttribPointer(1, 2, b.FLOAT, !1, 32, 12);


                Scene_data.context3D.drawCall(mesh.objData.indexBuffer, mesh.objData.treNum);
                this.skipNum++
            }


        }
        public static baseShadowLightVo: BaseShadowLightVo


    }
}