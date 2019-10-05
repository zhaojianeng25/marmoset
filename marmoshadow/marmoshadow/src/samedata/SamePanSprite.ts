
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

                "attribute vec3 vPosition; attribute vec2 vTexCoord; attribute vec2 vTangent; attribute vec2 vBitangent; attribute vec2 vNormal;\n" +
                "uniform mat4 viewMatrix3D;" +
                "void main(void)" +
                "{" +

                "   vec4 vt0= vec4(vPosition, 1.0);" +

                "   vt0 = viewMatrix3D * vt0;" +

                "   gl_Position = vt0;" +

                "}"
            return $str


        }
        getFragmentShaderString(): string {
            var $str: string =
                "#define UV_OFFSET\n" +

                "void main(void) " +
                "{ " +

                "gl_FragColor =vec4(1.0,0.0,0.0,1.0); " +




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


        private drawTempMesh(mesh: Mars3Dmesh): void {
            if (mesh.tAlbedo && mesh.tNormal && mesh.tReflectivity) {
                this.makeTbnBuff(mesh)
                var gl = Scene_data.context3D.renderContext;
                Scene_data.context3D.setProgram(this.program);

                Scene_data.context3D.setVcMatrix4fv(this.shader, "posMatrix3D", this.posMatrix.m);
                var viewM = Scene_data.viewMatrx3D.clone()
                viewM.prepend(Scene_data.cam3D.cameraMatrix)
                viewM.prepend(this.posMatrix)

                var materialsSp = mesh.materials

                Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", viewM.m);
                if (materialsSp["mview"]) {
                    Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", materialsSp["mview"]);
                }
                if (materialsSp["uSkyMatrix"]) {
                    Scene_data.context3D.setVcMatrix4fv(this.shader, "uSkyMatrix", materialsSp["uSkyMatrix"]);
                }

                Scene_data.context3D.setRenderTexture(this.shader, "tAlbedo", mesh.materials.textures.albedo.id, 0);



                gl.enable(gl.CULL_FACE);
                gl.cullFace(gl.BACK);


                Scene_data.context3D.setVa(0, 3, mesh.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 2, mesh.objData.uvBuffer);
                Scene_data.context3D.setVa(2, 3, mesh.objData.tangentBuffer);
                Scene_data.context3D.setVa(3, 3, mesh.objData.bitangentBuffer);
                Scene_data.context3D.setVa(4, 3, mesh.objData.normalsBuffer);
                Scene_data.context3D.drawCall(mesh.objData.indexBuffer, mesh.objData.treNum);
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
        private mesh: Mars3Dmesh
        private indexCount: number
        private indexOffset: number
        private drawBaseMesh(value: Mars3Dmesh): void {

            this.mesh = value
            Scene_data.context3D.setProgram(this.program);


            Scene_data.context3D.setVcMatrix4fv(this.shader, "posMatrix3D", this.posMatrix.m);
            var viewM = Scene_data.viewMatrx3D.clone()
            viewM.prepend(Scene_data.cam3D.cameraMatrix)
            viewM.prepend(this.posMatrix)

            var materialsSp = this.mesh.materials
            Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", viewM.m);
            if (materialsSp["mview"]) {
                 Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", materialsSp["mview"]);
            }

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
            var f = 0;
            b.vertexAttribPointer(a.vPosition, 3, b.FLOAT, !1, c, f);
            f += 12;
            b.vertexAttribPointer(a.vTexCoord, 2, b.FLOAT, !1, c, f);
            f += 8;
            b.vertexAttribPointer(a.vTangent, 2, b.UNSIGNED_SHORT, !0, c, f);
            f += 4;
            b.vertexAttribPointer(a.vBitangent, 2, b.UNSIGNED_SHORT, !0, c, f);
            f += 4;
            b.vertexAttribPointer(a.vNormal, 2, b.UNSIGNED_SHORT, !0, c, f);
 
            b.drawElements(b.TRIANGLES, this.indexCount, this.mesh.indexType, this.indexOffset);


            b.disableVertexAttribArray(a.vPosition);
            b.disableVertexAttribArray(a.vTexCoord);
            b.disableVertexAttribArray(a.vTangent);
            b.disableVertexAttribArray(a.vBitangent);
            b.disableVertexAttribArray(a.vNormal);
            
 

        }



    }

}