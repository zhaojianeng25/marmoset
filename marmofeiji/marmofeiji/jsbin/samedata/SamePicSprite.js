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
var same;
(function (same) {
    var Shader3D = Pan3d.Shader3D;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var BaseDiplay3dSprite = Pan3d.BaseDiplay3dSprite;
    var Scene_data = Pan3d.Scene_data;
    var MarmosetModel = mars3D.MarmosetModel;
    var SamePicShader = /** @class */ (function (_super) {
        __extends(SamePicShader, _super);
        function SamePicShader() {
            return _super.call(this) || this;
        }
        SamePicShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "vPosition");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
            $context.bindAttribLocation(this.program, 2, "vTangent");
            $context.bindAttribLocation(this.program, 3, "vBitangent");
            $context.bindAttribLocation(this.program, 4, "vNormal");
        };
        SamePicShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 vPosition;" +
                "attribute vec2 u2Texture;" +
                "attribute vec3 vTangent;" +
                "attribute vec3 vBitangent;" +
                "attribute vec3 vNormal;" +
                "uniform mat4 uSkyMatrix;" +
                "uniform mat4 viewMatrix3D;" +
                //  "uniform mat4 posMatrix3D;" +
                "varying vec2 d;\n" +
                "varying  vec3 dA; " +
                "varying  vec3 dB; " +
                "varying  vec3 dC; " +
                "varying highp vec3 dv;" +
                "varying highp vec3 vPos;" + //模型顶点
                " vec3 iW(vec2 v) {;" +
                "  v.x=v.x/65535.0;" +
                "  v.y=v.y/65535.0;" +
                "  bool iX = (v.y > (32767.1 / 65535.0));" +
                "  v.y = iX ? (v.y - (32768.0 / 65535.0)) : v.y;" +
                "  vec3 r;" +
                "  r.x = (2.0 * 65535.0 / 32767.0) * v.x - 1.0;" +
                "  r.y = (2.0 * 65535.0 / 32767.0) * v.y - 1.0;" +
                "  r.z = sqrt(max(min(1.0 - (r.x*r.x+r.y*r.y), 1.0), 0.0));" +
                "  r.z = iX ? -r.z : r.z;" +
                "  return r;" +
                " }" +
                "void main(void)" +
                "{" +
                "   d = vec2(u2Texture.x, u2Texture.y);" +
                "   dA=(uSkyMatrix*vec4(vTangent, 1.0)).xyz;" +
                "   dB=(uSkyMatrix*vec4(vBitangent, 1.0)).xyz;" +
                "   dC=(uSkyMatrix*vec4(vNormal, 1.0)).xyz;" +
                "dv=(uSkyMatrix*vec4(vPosition, 1.0)).xyz;" +
                "   vPos= vPosition;" + //模型顶点
                "   vec4 vt0= vec4(vPosition, 1.0);" +
                // "   vt0 = posMatrix3D * vt0;" +
                "   vt0 = viewMatrix3D * vt0;" +
                "   gl_Position = vt0;" +
                "}";
            return $str;
        };
        SamePicShader.prototype.getFragmentShaderString = function () {
            var $str = "#define UV_OFFSET\n" +
                "#define SHADOW_NATIVE_DEPTH\n" +
                "#define NOBLEND\n" +
                "#define SHADOW_COUNT 3\n" +
                "#define LIGHT_COUNT 3\n" +
                "#define SHADOW_KERNEL (4.0/1536.0)\n" +
                "#extension GL_OES_standard_derivatives : enable\n" +
                "precision highp float;\n" +
                "uniform sampler2D tAlbedo;\n" +
                "uniform sampler2D tNormal;\n" +
                "uniform sampler2D tReflectivity;\n" +
                "uniform sampler2D tSkySpecular;\n" +
                "uniform sampler2D tDepth0;\n" +
                "uniform sampler2D tDepth1;\n" +
                "uniform sampler2D tDepth2;\n" +
                "uniform sampler2D tDepthTexture;\n" +
                "varying vec2 d;\n" +
                "varying  vec3 dA; " +
                "varying  vec3 dB; " +
                "varying  vec3 dC; " +
                "varying highp vec3 dv;" +
                "varying highp vec3 vPos;" + //模型顶点
                "uniform vec3 uCameraPosition;" +
                "uniform vec4 uDiffuseCoefficients[9];" +
                "uniform highp vec4 uShadowTexelPadProjections[SHADOW_COUNT];" +
                "uniform highp mat4 uShadowMatrices[SHADOW_COUNT];" +
                "uniform highp mat4 depthViewMatrix3D;" + //阴影深度矩阵
                "uniform float uHorizonOcclude;" +
                "uniform highp vec2 uShadowKernelRotation;" +
                "\n#define SHADOW_COMPARE(a,b) ((a) < (b) ? 1.0 : 0.0)\n" +
                "void main(void) " +
                "{ " +
                "gl_FragColor =vec4(1.0,0.0,0.0,1.0); " +
                "}";
            return $str;
        };
        SamePicShader.SamePicShader = "SamePicShader";
        return SamePicShader;
    }(Shader3D));
    same.SamePicShader = SamePicShader;
    var SamePicSprite = /** @class */ (function (_super) {
        __extends(SamePicSprite, _super);
        function SamePicSprite() {
            var _this = _super.call(this) || this;
            _this.initData();
            return _this;
        }
        SamePicSprite.prototype.initData = function () {
            ProgrmaManager.getInstance().registe(SamePicShader.SamePicShader, new SamePicShader);
            this.shader = ProgrmaManager.getInstance().getProgram(SamePicShader.SamePicShader);
            this.program = this.shader.program;
            this.objData = new ObjData;
            this.objData.vertices = new Array();
            this.objData.vertices.push(-100, 0, -100);
            this.objData.vertices.push(100, 0, -100);
            this.objData.vertices.push(100, 0, 100);
            this.objData.vertices.push(-100, 0, 100);
            this.objData.uvs = new Array();
            this.objData.uvs.push(0, 0);
            this.objData.uvs.push(1, 0);
            this.objData.uvs.push(1, 1);
            this.objData.uvs.push(0, 1);
            this.objData.indexs = new Array();
            this.objData.indexs.push(0, 1, 2);
            this.objData.indexs.push(0, 2, 3);
            this.loadTexture();
            this.upToGpu();
        };
        SamePicSprite.prototype.makeTbnBuff = function (mesh) {
            if (!mesh.objData.tangents || mesh.objData.tangents.length <= 0) {
                TBNUtils.processTBN(mesh.objData);
                mesh.objData.tangentBuffer = Scene_data.context3D.uploadBuff3D(mesh.objData.tangents);
                mesh.objData.bitangentBuffer = Scene_data.context3D.uploadBuff3D(mesh.objData.bitangents);
            }
        };
        SamePicSprite.prototype.drawTempMesh = function (mesh) {
            if (mesh.tAlbedo && mesh.tNormal && mesh.tReflectivity) {
                this.makeTbnBuff(mesh);
                var gl = Scene_data.context3D.renderContext;
                Scene_data.context3D.setProgram(this.program);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "posMatrix3D", this.posMatrix.m);
                var viewM = Scene_data.viewMatrx3D.clone();
                viewM.prepend(Scene_data.cam3D.cameraMatrix);
                viewM.prepend(this.posMatrix);
                var materialsSp = mesh.materials;
                Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", viewM.m);
                if (materialsSp["mview"]) {
                    Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", materialsSp["mview"]);
                }
                if (materialsSp["uSkyMatrix"]) {
                    Scene_data.context3D.setVcMatrix4fv(this.shader, "uSkyMatrix", materialsSp["uSkyMatrix"]);
                }
                gl.disable(gl.CULL_FACE);
                gl.cullFace(gl.FRONT);
                Scene_data.context3D.setCullFaceModel(0);
                Scene_data.context3D.setVa(0, 3, mesh.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 2, mesh.objData.uvBuffer);
                Scene_data.context3D.setVa(2, 3, mesh.objData.tangentBuffer);
                Scene_data.context3D.setVa(3, 3, mesh.objData.bitangentBuffer);
                Scene_data.context3D.setVa(4, 3, mesh.objData.normalsBuffer);
                Scene_data.context3D.drawCall(mesh.objData.indexBuffer, mesh.objData.treNum);
            }
        };
        SamePicSprite.prototype.makeMeshItemTexture = function () {
            var albedArr = [];
            albedArr.push("mat1_c");
            albedArr.push("mat2_c");
            albedArr.push("mat0_c");
            var nrmArr = [];
            nrmArr.push("mat1_n");
            nrmArr.push("mat2_n");
            nrmArr.push("mat0_n");
            var reflectArr = [];
            reflectArr.push("mat1_r");
            reflectArr.push("mat2_r");
            reflectArr.push("mat0_r");
            var glossArr = [];
            glossArr.push("mat1_g");
            glossArr.push("mat2_g");
            glossArr.push("mat0_g");
            for (var i = 0; i < MarmosetModel.meshItem.length; i++) {
                var vo = MarmosetModel.meshItem[i];
                vo.setAlbedoUrl(albedArr[i]);
                vo.setNormalUrl(nrmArr[i]);
                vo.setReflectRgbAlphaUrl(reflectArr[i], glossArr[i]);
            }
            this.isFinish = true;
        };
        SamePicSprite.prototype.update = function () {
            if (MarmosetModel.meshItem && MarmosetModel.meshItem.length) {
                if (!this.isFinish) {
                    this.makeMeshItemTexture();
                }
                for (var i = 0; i < MarmosetModel.meshItem.length; i++) {
                    this.drawTempMesh(MarmosetModel.meshItem[i]);
                }
            }
            else {
                _super.prototype.update.call(this);
            }
        };
        return SamePicSprite;
    }(BaseDiplay3dSprite));
    same.SamePicSprite = SamePicSprite;
})(same || (same = {}));
//# sourceMappingURL=SamePicSprite.js.map