
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

                "d=vTexCoord+uUVOffset;" +
                "dA = u(uSkyMatrix, iW(vTangent));" +
                "dB = u(uSkyMatrix, iW(vBitangent));" +
                "dC = u(uSkyMatrix, iW(vNormal));" +
                "dv = h(uSkyMatrix, vPosition.xyz).xyz;" +



                "}"
            return $str


        }
        getFragmentShaderString(): string {
            var $str: string =
                "#define SHADOW_COUNT 3;\n" +
                "#define LIGHT_COUNT 3;\n" +
                "uniform sampler2D tAlbedo;uniform sampler2D tReflectivity;uniform sampler2D tNormal;uniform sampler2D tExtras;uniform sampler2D tSkySpecular;\n" +
 
                "precision mediump float;varying highp vec3 dv;varying mediump vec2 d;varying mediump vec3 dA;varying mediump vec3 dB;varying mediump vec3 dC;\n" +

                "uniform vec4 uDiffuseCoefficients[9];uniform vec3 uCameraPosition;uniform float uAlphaTest;uniform vec3 uFresnel;uniform float uHorizonOcclude;uniform float uHorizonSmoothing;" +

                "vec3 dG(vec3 c){return c*c;}" +

                "vec3 dJ(vec3 n) {" +
                    "vec3 hn = dA;" +
                    "vec3 ho = dB;" +
                    "vec3 hu = dC;" +
                    "n = 2.0 * n - vec3(1.0);" +
                    "return normalize(hn * n.x + ho * n.y + hu * n.z);" +
                "}" +
 

                "void main(void) " +
                "{ " +

                "vec4 m = texture2D(tAlbedo, d);" +
                "vec3 dF = dG(m.xyz);" +

                "vec3 dI = dJ(texture2D(tNormal, d).xyz);" +
                "vec3 dO = normalize(uCameraPosition - dv);"+
       
                 "m=texture2D(tReflectivity,d);"+

                 "gl_FragColor =vec4(m.xyz,1.0); " +


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
                for (var i: number = 0; i < MarmosetModel.meshItem.length; i++) {
                    // this.drawBaseMesh(MarmosetModel.meshItem[i])
                    this.drawBaseMesh(MarmosetModel.meshItem[i])
                }
            }

        }
        private materialbind(value: Mars3Dmesh): void {
            this.mesh = value
            if (this.mesh.tAlbedo && this.mesh.tNormal && this. mesh.tReflectivity) {
                var gl: WebGLRenderingContext = Scene_data.context3D.renderContext;
                var m: WebGLRenderingContext = gl;
                var vfinfo: any = value.materials["vfinfo"]

                var p: any = {};
                var q = vfinfo["uModelViewProjectionMatrix"]
                var u = vfinfo["uSkyMatrix"]
                var uUVOffset = vfinfo["uUVOffset"];



                p.uModelViewProjectionMatrix = gl.getUniformLocation(this.shader.program, "uModelViewProjectionMatrix")
                p.uSkyMatrix = gl.getUniformLocation(this.shader.program, "uSkyMatrix")
                p.uUVOffset = gl.getUniformLocation(this.shader.program, "uUVOffset")
                p.uCameraPosition = gl.getUniformLocation(this.shader.program, "uCameraPosition")




                m.uniformMatrix4fv(p.uModelViewProjectionMatrix, !1, q);
                m.uniformMatrix4fv(p.uSkyMatrix, !1, u);
                var u = vfinfo["uCameraPosition"];
                m.uniform3f(p.uCameraPosition, u[0], u[1], u[2]);



                //  Scene_data.context3D.setRenderTexture(this.shader, "tAlbedo", this.mesh.materials.textures.albedo.id, 0);
               // Scene_data.context3D.setRenderTexture(this.shader, "tNormal", this.mesh.materials.textures.normal.id, 1);
               // Scene_data.context3D.setRenderTexture(this.shader, "tReflectivity", this.mesh.materials.textures.reflectivity.id, 2);
                Scene_data.context3D.setRenderTexture(this.shader, "tAlbedo", this.mesh.tAlbedo.texture, 0);
                Scene_data.context3D.setRenderTexture(this.shader, "tNormal", this.mesh.tNormal.texture, 1);
                Scene_data.context3D.setRenderTexture(this.shader, "tReflectivity", this.mesh.tReflectivity.texture, 2);
         

                m.uniform2f(p.uUVOffset, uUVOffset.uOffset, uUVOffset.vOffset);
            }
    

        }
        private mesh: Mars3Dmesh
        private indexCount: number
        private indexOffset: number
        private drawBaseMesh(value: Mars3Dmesh): void {

            this.mesh = value
            Scene_data.context3D.setProgram(this.program);

            this.materialbind(value)


            Scene_data.context3D.setVcMatrix4fv(this.shader, "posMatrix3D", this.posMatrix.m);
            var viewM = Scene_data.viewMatrx3D.clone()
            viewM.prepend(Scene_data.cam3D.cameraMatrix)
            viewM.prepend(this.posMatrix)

         
     
            this.indexCount = this.mesh.indexCount;
            this.indexOffset = 0;
            var a = this.mesh.materials.shader.attribs;
            var b: WebGLRenderingContext = Scene_data.context3D.renderContext;
            var c = this.mesh.stride;

            b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, this.mesh.indexBuffer);
            b.bindBuffer(b.ARRAY_BUFFER, this.mesh.vertexBuffer);
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