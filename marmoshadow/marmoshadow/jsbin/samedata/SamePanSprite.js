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
var samepan;
(function (samepan) {
    var Shader3D = Pan3d.Shader3D;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var BaseDiplay3dSprite = Pan3d.BaseDiplay3dSprite;
    var Scene_data = Pan3d.Scene_data;
    var MarmosetModel = mars3D.MarmosetModel;
    var SamePanShader = /** @class */ (function (_super) {
        __extends(SamePanShader, _super);
        function SamePanShader() {
            return _super.call(this) || this;
        }
        SamePanShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "vPosition");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
            $context.bindAttribLocation(this.program, 2, "vTangent");
            $context.bindAttribLocation(this.program, 3, "vBitangent");
            $context.bindAttribLocation(this.program, 4, "vNormal");
        };
        SamePanShader.prototype.getVertexShaderString = function () {
            var $str = "precision highp float;uniform mat4 uModelViewProjectionMatrix;uniform mat4 uSkyMatrix;uniform vec2 uUVOffset;attribute vec3 vPosition;attribute vec2 vTexCoord;attribute vec2 vTangent;attribute vec2 vBitangent;attribute vec2 vNormal;\n" +
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
                "}";
            return $str;
        };
        SamePanShader.prototype.getFragmentShaderString = function () {
            var $str = "#define UV_OFFSET\n" +
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
                "uniform highp vec2 uShadowKernelRotation;uniform highp vec2 uShadowMapSize;uniform highp mat4 uShadowMatrices[SHADOW_COUNT];uniform highp vec4 uShadowTexelPadProjections[SHADOW_COUNT];\n" +
                "\n#define SHADOW_COMPARE(a,b) ((a) < (b) ? 1.0 : 0.0)\n" +
                "vec3 dG(vec3 c){return c*c;} \n" +
                "struct ev{\n" +
                "float eL[LIGHT_COUNT];\n" +
                "};\n" +
                "highp float hJ(highp vec3 G) {\n" +
                "return  G.x ;\n" +
                "}\n" +
                "float hK(sampler2D hL, highp vec2 hA, highp float H) {" +
                "highp float G = hJ(texture2D(hL, hA.xy).xyz);" +
                "return SHADOW_COMPARE(H,G);" +
                "}" +
                "highp float hN(sampler2D hL, highp vec3 hA, float hO) {\n" +
                "highp vec2 l = uShadowKernelRotation * hO;\n" +
                "float s;\n" +
                "s = hK(hL, hA.xy + l, hA.z);\n" +
                "s += hK(hL, hA.xy - l, hA.z);\n" +
                "s += hK(hL, hA.xy + vec2(-l.y, l.x), hA.z);\n" +
                "s += hK(hL, hA.xy + vec2(l.y, -l.x), hA.z);\n" +
                "s *= 0.25;\n" +
                "return s * s;\n" +
                "}\n" +
                "void eB(out ev ss, float hO){" +
                "highp vec3 hP[SHADOW_COUNT];" +
                "vec3 hu = gl_FrontFacing ? dC : -dC;" +
                "for (int k = 0; k < SHADOW_COUNT; ++k) {" +
                "vec4 hQ = uShadowTexelPadProjections[k];" +
                "float hR = hQ.x * dv.x + (hQ.y * dv.y + (hQ.z * dv.z + hQ.w));" +
                "hR*=.0005+0.5 * hO;" +
                "highp vec4 hS =uShadowMatrices[2]* vec4(dv, 1.0);" +
                "hP[k]=hS.xyz/hS.w;" +
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
                "vec3 dO = normalize(uCameraPosition - dv);" +
                "m=texture2D(tReflectivity,d);" +
                "float dQ = m.w;" +
                "vec3 dP = dG(m.xyz);" +
                "vec3 ek = reflect(-dO, dI);" +
                "ev eA;" +
                "eB(eA,SHADOW_KERNEL);" +
                "vec4 outcolor=vec4(eA.eL[0], eA.eL[0], eA.eL[0], 1.0);" +
                "gl_FragColor =vec4(ek.xyz,1.0); " +
                "}";
            return $str;
        };
        SamePanShader.SamePanShader = "SamePanShader";
        return SamePanShader;
    }(Shader3D));
    samepan.SamePanShader = SamePanShader;
    var SamePanSprite = /** @class */ (function (_super) {
        __extends(SamePanSprite, _super);
        function SamePanSprite() {
            var _this = _super.call(this) || this;
            _this.initData();
            return _this;
        }
        SamePanSprite.prototype.initData = function () {
            ProgrmaManager.getInstance().registe(SamePanShader.SamePanShader, new SamePanShader);
            this.shader = ProgrmaManager.getInstance().getProgram(SamePanShader.SamePanShader);
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
        SamePanSprite.prototype.makeTbnBuff = function (mesh) {
            if (!mesh.objData.tangents || mesh.objData.tangents.length <= 0) {
                TBNUtils.processTBN(mesh.objData);
                mesh.objData.tangentBuffer = Scene_data.context3D.uploadBuff3D(mesh.objData.tangents);
                mesh.objData.bitangentBuffer = Scene_data.context3D.uploadBuff3D(mesh.objData.bitangents);
            }
        };
        SamePanSprite.prototype.makeMeshItemTexture = function () {
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
        SamePanSprite.prototype.update = function () {
            if (MarmosetModel.meshItem && MarmosetModel.meshItem.length) {
                if (!this.isFinish) {
                    this.makeMeshItemTexture();
                }
                var gl = Scene_data.context3D.renderContext;
                gl.clearColor(0, 0, 0, 1.0);
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
                gl.clearColor(0, 0, 0, 1.0);
                for (var i = 0; i < MarmosetModel.meshItem.length; i++) {
                    this.drawBaseMesh(MarmosetModel.meshItem[i]);
                }
                // this.drawBaseMesh(MarmosetModel.meshItem[0])
            }
        };
        SamePanSprite.prototype.materialbind = function (value) {
            this.mesh = value;
            if (this.mesh.tAlbedo && this.mesh.tNormal && this.mesh.tReflectivity) {
                var gl = Scene_data.context3D.renderContext;
                var m = gl;
                var vfinfo = value.materials["vfinfo"];
                var p = {};
                var q = vfinfo["uModelViewProjectionMatrix"];
                var u = vfinfo["uSkyMatrix"];
                var s = vfinfo["s"];
                var f = vfinfo["f"];
                var uUVOffset = vfinfo["uUVOffset"];
                p.uModelViewProjectionMatrix = gl.getUniformLocation(this.shader.program, "uModelViewProjectionMatrix");
                p.uSkyMatrix = gl.getUniformLocation(this.shader.program, "uSkyMatrix");
                p.uUVOffset = gl.getUniformLocation(this.shader.program, "uUVOffset");
                p.uCameraPosition = gl.getUniformLocation(this.shader.program, "uCameraPosition");
                Scene_data.context3D.setVc4fv(this.shader, "uShadowTexelPadProjections", vfinfo["uShadowTexelPadProjections"]);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "uShadowMatrices", vfinfo["uShadowMatrices"]);
                Scene_data.context3D.setVc2f(this.shader, "uShadowKernelRotation", 0.7853, 0.7853);
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
                m.uniform2f(p.uUVOffset, uUVOffset.uOffset, uUVOffset.vOffset);
            }
        };
        SamePanSprite.prototype.drawBaseMesh = function (value) {
            this.mesh = value;
            Scene_data.context3D.setProgram(this.program);
            this.materialbind(value);
            this.indexCount = this.mesh.indexCount;
            this.indexOffset = 0;
            var a = this.mesh.materials.shader.attribs;
            var b = Scene_data.context3D.renderContext;
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
            e && b.disableVertexAttribArray(a.vTexCoord2);
        };
        return SamePanSprite;
    }(BaseDiplay3dSprite));
    samepan.SamePanSprite = SamePanSprite;
})(samepan || (samepan = {}));
//# sourceMappingURL=SamePanSprite.js.map