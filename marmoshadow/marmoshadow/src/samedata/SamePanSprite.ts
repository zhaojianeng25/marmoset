
module samepan {
    import Vector2D = Pan3d.Vector2D
    import Object3D = Pan3d.Object3D
    import MouseType = Pan3d.MouseType
    import LineDisplayShader = Pan3d.LineDisplayShader
    import Shader3D = Pan3d.Shader3D
    import Matrix3D = Pan3d.Matrix3D
    import TextureManager = Pan3d.TextureManager
    import ProgrmaManager = Pan3d.ProgrmaManager
    import BaseDiplay3dSprite = Pan3d.BaseDiplay3dSprite
    import TextureRes = Pan3d.TextureRes
    import Scene_data = Pan3d.Scene_data
    import Mars3Dmesh = mars3D.Mars3Dmesh
    import MarmosetLightVo = mars3D.MarmosetLightVo
    import MarmosetModel = mars3D.MarmosetModel



    export class SamePanShader extends Shader3D {
        static SamePanShader: string = "SamePanShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "vPosition");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
            $context.bindAttribLocation(this.program, 2, "vTangent");
            $context.bindAttribLocation(this.program, 3, "vBitangent");
            $context.bindAttribLocation(this.program, 4, "vNormal");
        }
        getVertexShaderString(): string {
            var $str: string =

                "precision highp float;uniform mat4 uModelViewProjectionMatrix;uniform mat4 uSkyMatrix;uniform vec2 uUVOffset;attribute vec3 vPosition;attribute vec2 vTexCoord;attribute vec2 vTangent;attribute vec2 vBitangent;attribute vec2 vNormal;\n" +
                "varying highp vec3 dv;varying mediump vec2 d;varying mediump vec3 dA;varying mediump vec3 dB;varying mediump vec3 dC;" +

                "vec3 iW(vec2 v) {" +
                    "bool iX = (v.y > (32767.1 / 65535.0));" +
                    "v.y = iX ? (v.y - (32768.0 / 65535.0)) : v.y; vec3 r;" +
                    "r.xy = (2.0 * 65535.0 / 32767.0) * v - vec2(1.0);" +
                    "r.z = sqrt(clamp(1.0 - dot(r.xy, r.xy), 0.0, 1.0));" +
                    "r.z = iX ? -r.z : r.z; return r;" +
                "}" +
                "vec4 h(mat4 i, vec3 p) {" +
                    "return i[0] * p.x + (i[1] * p.y + (i[2] * p.z + i[3]));" +
                "}" +
                "vec3 u(mat4 i, vec3 v){" +
                   "return i[0].xyz * v.x + i[1].xyz * v.y + i[2].xyz * v.z;" +
                "}" +

                "uniform mat4 viewMatrix3D;" +
                "void main(void)" +
                "{" +

     

                "gl_Position=h(uModelViewProjectionMatrix,vPosition.xyz);" +

                "d=vTexCoord;" +
      

                "dA = u(uSkyMatrix, iW(vTangent));" +
                "dB = u(uSkyMatrix, iW(vBitangent));" +
                "dC = u(uSkyMatrix, iW(vNormal));" +
                "dv = h(uSkyMatrix, vPosition.xyz).xyz;" +



                "}"
            return $str


        }
        getFragmentShaderString(): string {
            var $str: string =
                "#define UV_OFFSET\n" +
                "#define SHADOW_NATIVE_DEPTH\n" +
                "#define NOBLEND\n" +
                "#define SHADOW_COUNT 3\n" +
                "#define LIGHT_COUNT 3\n" +
                "#define SHADOW_KERNEL (4.0/1536.0)\n" +
 

                "uniform sampler2D tAlbedo;uniform sampler2D tReflectivity;uniform sampler2D tNormal;uniform sampler2D tExtras;uniform sampler2D tSkySpecular;\n" +

                "uniform sampler2D tDepth0;\n" +
                "uniform sampler2D tDepth1;\n" +
                "uniform sampler2D tDepth2;\n" +
 
                "precision mediump float;varying highp vec3 dv;varying mediump vec2 d;varying mediump vec3 dA;varying mediump vec3 dB;varying mediump vec3 dC;\n" +

                "uniform vec4 uDiffuseCoefficients[9];uniform vec3 uCameraPosition;uniform float uAlphaTest;uniform vec3 uFresnel;uniform float uHorizonOcclude;uniform float uHorizonSmoothing;\n" +

                "uniform highp vec2 uShadowKernelRotation;uniform highp vec2 uShadowMapSize;uniform highp mat4 uShadowMatrices[SHADOW_COUNT];uniform highp vec4 uShadowTexelPadProjections[SHADOW_COUNT];\n"+

                "\n#define SHADOW_COMPARE(a,b) ((a) < (b) ? 1.0 : 0.0)\n" +

                "vec3 dG(vec3 c){return c*c;} \n" +

                "struct ev{\n" +
                   "float eL[LIGHT_COUNT];\n" +
                   "vec3 oT[LIGHT_COUNT];\n" +
                "};\n" +

                "highp float hJ(highp vec3 G) {\n" +
                    "return  G.x ;\n" +
                "}\n" +

                "float hK(sampler2D hL, highp vec2 hA, highp float H) {" +
                     "highp float G = hJ(texture2D(hL, hA.xy).xyz);" +
                     "return SHADOW_COMPARE(H,G);" +
            
                "}" +

                "highp vec4 h(highp mat4 i,highp vec3 p){" +
                    "return i[0] * p.x + (i[1] * p.y + (i[2] * p.z + i[3]));" +
                "}" +

                "highp float hN(sampler2D hL, highp vec3 hA, float hO) {\n" +
                     "highp vec2 l = uShadowKernelRotation * hO;\n" +
                    "float s;\n" +
                    "s = hK(hL, hA.xy +l, hA.z);\n" +
                   // "s = hK(hL, hA.xy + l, hA.z);\n" +
                    //"s += hK(hL, hA.xy - l, hA.z);\n" +
                    //"s += hK(hL, hA.xy + vec2(-l.y, l.x), hA.z);\n" +
                    //"s += hK(hL, hA.xy + vec2(l.y, -l.x), hA.z);\n" +
                    //"s *= 0.25;\n" +
                    "return s * s;\n" +
             
                "}\n" +

                "void eB(out ev ss, float hO){" +
                     "highp vec3 hP[SHADOW_COUNT];" +
                     "vec3 hu = gl_FrontFacing ? dC : -dC;" +
                    "for (int k = 0; k < SHADOW_COUNT; ++k) {" +
                        "vec4 hQ = uShadowTexelPadProjections[k];" +
                         "float hR = hQ.x * dv.x + (hQ.y * dv.y + (hQ.z * dv.z + hQ.w));" +
                         "hR*=.0005+0.5 * hO;" +
       
        
                         "highp vec4 hS = h(uShadowMatrices[k], dv );" +
                         "hP[k] = hS.xyz / hS.w;" +
      
 

                    "}" +
                    "float m;\n" +
                    "\n#if SHADOW_COUNT > 0 \n" +
                        "m = hN(tDepth0, hP[0], hO);" +
                        "ss.eL[0] = m;" +
                    "\n#endif\n" +
                    "\n#if SHADOW_COUNT > 1\n" +
                        "m = hN(tDepth1, hP[1], hO);" +
                        "ss.eL[1] =m;" +
                    "\n#endif\n" +
                        "\n#if SHADOW_COUNT > 2\n" +
                        "m = hN(tDepth2, hP[2], hO);\n" +
                        "ss.eL[2] =m;\n" +
        
                     "\n#endif\n" +

                "}" +

                "vec3 dJ(vec3 n) {" +
                    "vec3 hn = dA;" +
                    "vec3 ho = dB;" +
                    "vec3 hu = dC;" +
                    "n = 2.0 * n - vec3(1.0);" +
                    "return normalize(hn * n.x + ho * n.y + hu * n.z);" +
                "}" +

                " vec3 em(vec3 fJ, float dQ) {" +
                    "fJ /= dot(vec3(1.0), abs(fJ));" +
                    "vec2 fU = abs(fJ.zx) - vec2(1.0, 1.0);" +
                    "vec2 fV = vec2(fJ.x < 0.0 ? fU.x : -fU.x, fJ.z < 0.0 ? fU.y : -fU.y);" +
                    "vec2 fW = (fJ.y < 0.0) ? fV : fJ.xz;" +
                    "fW = vec2(0.5 * (254.0 / 256.0), 0.125 * 0.5 * (254.0 / 256.0)) * fW + vec2(0.5, 0.125 * 0.5);" +
                    "float fX = fract(7.0 * dQ);" +
                    "fW.y += 0.125 * (7.0 * dQ - fX); vec2 fY = fW + vec2(0.0, 0.125);" +
                    "vec4 fZ = mix(texture2D(tSkySpecular, fW), texture2D(tSkySpecular, fY), fX);" +
                    "vec3 r = fZ.xyz * (7.0 * fZ.w);" +
                    "return r * r; " +

                " }" +



      
 

                "void main(void) " +
                "{ " +

                "vec4 m = texture2D(tAlbedo, d);" +
                "vec3 dF = dG(m.xyz);" +

                "vec3 dI = dJ(texture2D(tNormal, d).xyz);" +
                "vec3 dO = normalize(uCameraPosition - dv);"+
       
                "m=texture2D(tReflectivity,d);"+
                "float dQ = m.w;"+
                "vec3 dP = dG(m.xyz);" +

                "vec3 ek = reflect(-dO, dI);" +

              
                "ev eA;" +
                "eB(eA,SHADOW_KERNEL);"+


                "vec4 outcolor=vec4(eA.eL[2], eA.eL[2], eA.eL[2], 1.0);" +

                "gl_FragColor =outcolor; " +

 



                "}"
            return $str

        }

    }


    export class SamePanSprite extends BaseDiplay3dSprite {


        constructor() {
            super();
            this.initData()


        }

        protected initData(): void {
            ProgrmaManager.getInstance().registe(SamePanShader.SamePanShader, new SamePanShader);
            this.shader = ProgrmaManager.getInstance().getProgram(SamePanShader.SamePanShader);
            this.program = this.shader.program;

            this.objData = new ObjData;
            this.objData.vertices = new Array();
            this.objData.vertices.push(-100, 0, -100);
            this.objData.vertices.push(100, 0, -100);
            this.objData.vertices.push(100, 0, 100);
            this.objData.vertices.push(-100, 0, 100);

            this.objData.uvs = new Array()
            this.objData.uvs.push(0, 0);
            this.objData.uvs.push(1, 0);
            this.objData.uvs.push(1, 1);
            this.objData.uvs.push(0, 1);

            this.objData.indexs = new Array();
            this.objData.indexs.push(0, 1, 2);
            this.objData.indexs.push(0, 2, 3);

            this.loadTexture();


            this.upToGpu()


        }
        private makeTbnBuff(mesh: Mars3Dmesh): void {
            if (!mesh.objData.tangents || mesh.objData.tangents.length <= 0) {
                TBNUtils.processTBN(mesh.objData)
                mesh.objData.tangentBuffer = Scene_data.context3D.uploadBuff3D(mesh.objData.tangents);
                mesh.objData.bitangentBuffer = Scene_data.context3D.uploadBuff3D(mesh.objData.bitangents);
            }
        }


      
        private isFinish: boolean
        private makeMeshItemTexture(): void {
            var albedArr: Array<string> = []
            albedArr.push("mat1_c")
            albedArr.push("mat2_c")
            albedArr.push("mat0_c")

            var nrmArr: Array<string> = []
            nrmArr.push("mat1_n")
            nrmArr.push("mat2_n")
            nrmArr.push("mat0_n")

            var reflectArr: Array<string> = []
            reflectArr.push("mat1_r")
            reflectArr.push("mat2_r")
            reflectArr.push("mat0_r")

            var glossArr: Array<string> = []
            glossArr.push("mat1_g")
            glossArr.push("mat2_g")
            glossArr.push("mat0_g")

            for (var i: number = 0; i < MarmosetModel.meshItem.length; i++) {
                var vo: Mars3Dmesh = MarmosetModel.meshItem[i]
                vo.setAlbedoUrl(albedArr[i])
                vo.setNormalUrl(nrmArr[i])
                vo.setReflectRgbAlphaUrl(reflectArr[i], glossArr[i])

            }
            this.isFinish = true
        }
        public update(): void {

            if (MarmosetModel.meshItem && MarmosetModel.meshItem.length) {
                if (!this.isFinish) {
                    this.makeMeshItemTexture()
                }
                let gl = Scene_data.context3D.renderContext;
                gl.clearColor(0, 0, 0, 1.0);
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
                gl.clearColor(0, 0, 0, 1.0);
                for (var i: number = 0; i < MarmosetModel.meshItem.length; i++) {
                    this.drawBaseMesh(MarmosetModel.meshItem[i], MarmosetModel.meshRenderables[i])
                  
                }
               // this.drawBaseMesh(MarmosetModel.meshItem[0])
            }

        }
        private getViewMatrax3d(temp: Float32Array): Matrix3D {
            var tempMatrx: Matrix3D = new Matrix3D()
            var addOther: Matrix3D = new Matrix3D()

           // var baseArr: Array<number> = [-0.8713266253471375, 8.985513999526518e-10, 0.40336546301841736, 0.1891629546880722, 0, 0.8873469829559326, -1.1415001388570545e-8, -5.353198773150325e-9, 0.16785317659378052, 4.664383990160559e-9, 2.093871831893921, 0.9819457530975342, 2.4669361114501953, -1.8852306604385376, 9.165491104125977, 20.56804656982422]
            //var baseArr: Array<number> = [0.6500183939933777, 0.3525499999523163, 0.867900013923645, 0.5527472496032715, 0, 0.7205265164375305, -0.9164319634437561, -0.5836562514305115, 0.6040370464324951, -0.3793872892856598, -0.9339674711227417, -0.5948242545127869, -5.183374404907227, -0.34626707434654236, 12.497532844543457, 20.049705505371094]
            // var baseArr: Array<number> = [-1.2446883916854858, 0.006111379712820053, -0.5838364362716675, -0.23012207448482513, 0, 1.278754711151123, 0.05266710743308067, 0.020759006962180138, -0.2943965494632721, -0.025838496163487434, 2.4684202671051025, 0.9729403257369995, 2.26643705368042, -10.048957824707031, 9.530219078063965, 25.643653869628906]


            //var baseArr: Array<number> = [-0.3008589744567871, -0.46715670824050903, -1.697446584701538, -0.95980304479599, 0.010379503481090069, 0.6497568488121033, 0.03671305626630783, 0.020759006962180138, -0.7538937330245972, -0.13623611629009247, -0.4950234591960907, -0.2799057364463806, 13.955045700073242, 7.7973480224609375, 17.586936950683594, 25.643653869628906]
            //var baseArr: Array<number> = [-0.03556060791015625, 0.46315664052963257, 0.7268134355545044, 0.5655789971351624, -0.29182812571525574, 0.06843513250350952, -0.7500441074371338, -0.5836562514305115, 0.6003482341766357, 0.47712552547454834, 0.7487342357635498, 0.5826369524002075, 7.433165550231934, 9.85171890258789, 16.273618698120117, 20.049705505371094]
            var baseArr: Array<number> = [-0.5565775632858276, -0.4951910376548767, -1.551121711730957, -0.9903820753097534, -2.6765993865751625e-9, 0.4436734914779663, -8.384100524949645e-9, -5.353198773150325e-9, -0.3702264428138733, 0.06917984038591385, 0.2166968584060669, 0.1383596807718277, 11.517491340637207, 9.341407775878906, 14.866768836975098, 20.56804656982422]



            for (var i: number = 0; i < 16; i++) {
                tempMatrx.m[i] = baseArr[i];
                addOther.m[i] = temp[i];
            }

            tempMatrx.prepend(addOther)


            return tempMatrx
        }
        private skipNum: number=0
        private materialbind(value: Mars3Dmesh): void {
            this.mesh = value
            if (this.mesh.tAlbedo && this.mesh.tNormal && this. mesh.tReflectivity) {
                var gl: WebGLRenderingContext = Scene_data.context3D.renderContext;
                var m: WebGLRenderingContext = gl;
                var vfinfo: any = value.materials["vfinfo"]

                var p: any = {};
                var q = vfinfo["uModelViewProjectionMatrix"]
                var u = vfinfo["uSkyMatrix"]
                var s = vfinfo["s"];
                var f = vfinfo["f"];
                var uUVOffset = vfinfo["uUVOffset"];

             //   console.log(vfinfo["uSkyMatrix"])



                p.uModelViewProjectionMatrix = gl.getUniformLocation(this.shader.program, "uModelViewProjectionMatrix")
                p.uSkyMatrix = gl.getUniformLocation(this.shader.program, "uSkyMatrix")
                p.uUVOffset = gl.getUniformLocation(this.shader.program, "uUVOffset")
                p.uCameraPosition = gl.getUniformLocation(this.shader.program, "uCameraPosition")

                Scene_data.context3D.setVc4fv(this.shader, "uShadowTexelPadProjections", vfinfo["uShadowTexelPadProjections"]);

                Scene_data.context3D.renderContext.uniformMatrix4fv(this.shader.getWebGLUniformLocation("uShadowMatrices"), false, vfinfo["finalTransformBuffer"]);

                var tempFloat32Array: Float32Array = vfinfo["finalTransformBuffer"];
                var tempBegin: number=32
           //     console.log(tempFloat32Array.subarray(tempBegin, tempBegin+16))

                Scene_data.context3D.setVc2f(this.shader, "uShadowKernelRotation", 0.5, 0.5);


                m.uniformMatrix4fv(p.uModelViewProjectionMatrix, !1, q);
                m.uniformMatrix4fv(p.uSkyMatrix, !1, u);
      
                var u = vfinfo["uCameraPosition"];
                m.uniform3f(p.uCameraPosition, u[0], u[1], u[2]);

 

               // Scene_data.context3D.setRenderTexture(this.shader, "tAlbedo", this.mesh.materials.textures.albedo.id, 0);
               // Scene_data.context3D.setRenderTexture(this.shader, "tNormal", this.mesh.materials.textures.normal.id, 1);
               // Scene_data.context3D.setRenderTexture(this.shader, "tReflectivity", this.mesh.materials.textures.reflectivity.id, 2);

                Scene_data.context3D.setRenderTexture(this.shader, "tAlbedo", this.mesh.tAlbedo.texture, 0);
                Scene_data.context3D.setRenderTexture(this.shader, "tNormal", this.mesh.tNormal.texture, 1);
                Scene_data.context3D.setRenderTexture(this.shader, "tReflectivity", this.mesh.tReflectivity.texture, 2);

                Scene_data.context3D.setRenderTexture(this.shader, "tDepth0", f.depthTextures[0].id, 3);
                Scene_data.context3D.setRenderTexture(this.shader, "tDepth1", f.depthTextures[1].id, 4);
                Scene_data.context3D.setRenderTexture(this.shader, "tDepth2", f.depthTextures[2].id, 5);

                this.skipNum++;

               
                if (same.SamedataModel.baseShadowLightVo && same.SamedataModel.baseShadowLightVo.depthFBO.depthTexture && Math.floor(this.skipNum / 200) % 2 == 1) {
                    Scene_data.context3D.setRenderTexture(this.shader, "tDepth2", same.SamedataModel.baseShadowLightVo.depthFBO.depthTexture,5);
          
                }
 

                m.uniform2f(p.uUVOffset, uUVOffset.uOffset, uUVOffset.vOffset);
            }
    

        }
        private lastTexture: WebGLTexture
        private mesh: Mars3Dmesh
        private indexCount: number
        private indexOffset: number
        private drawBaseMesh(value: Mars3Dmesh, meshRenderable: any): void {

            this.mesh = value
            Scene_data.context3D.setProgram(this.program);

            this.materialbind(value)

 
     
            this.indexCount = this.mesh.indexCount;
            this.indexOffset = 0;
            var a = this.mesh.materials.shader.attribs;
            var b: WebGLRenderingContext = Scene_data.context3D.renderContext;
            var c = this.mesh.stride;

            b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, this.mesh.indexBuffer);
     
            b.bindBuffer(b.ARRAY_BUFFER, meshRenderable.mesh.vertexBuffer);
            b.enableVertexAttribArray(a.vPosition);
            b.enableVertexAttribArray(a.vTexCoord);
            b.enableVertexAttribArray(a.vTangent);
            b.enableVertexAttribArray(a.vBitangent);
            b.enableVertexAttribArray(a.vNormal);
            var d = this.mesh.vertexColor && void 0 !== a.vColor;
            d && b.enableVertexAttribArray(a.vColor);
            var e = this.mesh.secondaryTexCoord && void 0 !== a.vTexCoord2;
            e && b.enableVertexAttribArray(a.vTexCoord2);
            var f = 0;
            b.vertexAttribPointer(a.vPosition, 3, b.FLOAT, !1, c, f);
            f += 12;
            b.vertexAttribPointer(a.vTexCoord, 2, b.FLOAT, !1, c, f);
            f += 8;
            this.mesh.secondaryTexCoord && (e && b.vertexAttribPointer(a.vTexCoord2, 2, b.FLOAT, !1, c, f),
                f += 8);
            b.vertexAttribPointer(a.vTangent, 2, b.UNSIGNED_SHORT, !0, c, f);
            f += 4;
            b.vertexAttribPointer(a.vBitangent, 2, b.UNSIGNED_SHORT, !0, c, f);
            f += 4;
            b.vertexAttribPointer(a.vNormal, 2, b.UNSIGNED_SHORT, !0, c, f);
            d && b.vertexAttribPointer(a.vColor, 4, b.UNSIGNED_BYTE, !0, c, f + 4);
            b.drawElements(b.TRIANGLES, this.indexCount, this.mesh.indexType, this.indexOffset);
            b.disableVertexAttribArray(a.vPosition);
            b.disableVertexAttribArray(a.vTexCoord);
            b.disableVertexAttribArray(a.vTangent);
            b.disableVertexAttribArray(a.vBitangent);
            b.disableVertexAttribArray(a.vNormal);
            d && b.disableVertexAttribArray(a.vColor);
            e && b.disableVertexAttribArray(a.vTexCoord2)
            
 

        }



    }

}