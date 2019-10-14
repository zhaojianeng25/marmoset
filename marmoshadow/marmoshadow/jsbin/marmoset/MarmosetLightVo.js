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
var mars3D;
(function (mars3D) {
    var Scene_data = Pan3d.Scene_data;
    var Shader3D = Pan3d.Shader3D;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var GlReset = Pan3d.GlReset;
    var MarFBO = /** @class */ (function (_super) {
        __extends(MarFBO, _super);
        function MarFBO(w, h) {
            if (w === void 0) { w = 128; }
            if (h === void 0) { h = 128; }
            return _super.call(this, w, h) || this;
        }
        return MarFBO;
    }(Pan3d.FBO));
    mars3D.MarFBO = MarFBO;
    var MarmosetLightVoShader = /** @class */ (function (_super) {
        __extends(MarmosetLightVoShader, _super);
        function MarmosetLightVoShader() {
            return _super.call(this) || this;
        }
        MarmosetLightVoShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "vPosition");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
        };
        MarmosetLightVoShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 vPosition;" +
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
                "}";
            return $str;
        };
        MarmosetLightVoShader.prototype.getFragmentShaderString = function () {
            var $str = "precision highp  float;\n" +
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
                "}";
            return $str;
        };
        MarmosetLightVoShader.MarmosetLightVoShader = "MarmosetLightVoShader";
        return MarmosetLightVoShader;
    }(Shader3D));
    mars3D.MarmosetLightVoShader = MarmosetLightVoShader;
    var MarmosetLightVo = /** @class */ (function () {
        function MarmosetLightVo() {
            this.skipNum = 1;
            this.depthFBO = new MarFBO(2048, 2048);
            this.depthFBO.color = new Vector3D(0, 0, 0, 0);
            ProgrmaManager.getInstance().registe(MarmosetLightVoShader.MarmosetLightVoShader, new MarmosetLightVoShader);
            this.shader = ProgrmaManager.getInstance().getProgram(MarmosetLightVoShader.MarmosetLightVoShader);
            //深度贴图
            var gl = Scene_data.context3D.renderContext;
            var ext = gl.getExtension('WEBGL_depth_texture');
            this.depthFBO.depthTexture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this.depthFBO.depthTexture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, this.depthFBO.width, this.depthFBO.height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);
            console.log("---3---", gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, this.depthFBO.width, this.depthFBO.height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);
            gl.bindTexture(gl.TEXTURE_2D, null);
        }
        MarmosetLightVo.prototype.updateDepthTexture = function (fbo) {
            var gl = Scene_data.context3D.renderContext;
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.frameBuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.depthFBO.texture, 0);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthFBO.depthTexture, 0);
            //  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthFBO.depthTexture ,0)
            gl.viewport(0, 0, fbo.width, fbo.height);
            gl.clearColor(fbo.color.x, fbo.color.y, fbo.color.z, fbo.color.w);
            gl.clearDepth(1.0);
            gl.clearStencil(0.0);
            gl.enable(gl.DEPTH_TEST);
            gl.depthMask(true);
            gl.enable(gl.BLEND);
            gl.disable(gl.BLEND); //不用混合模式
            gl.frontFace(gl.CW);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        };
        MarmosetLightVo.prototype.update = function (value) {
            if (value && value.length) {
                var gl = Scene_data.context3D.renderContext;
                GlReset.saveBasePrarame(gl);
                this.updateDepthTexture(this.depthFBO);
                for (var i = 0; i < value.length; i++) {
                    this.drawTempMesh(value[i]);
                }
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                gl.bindTexture(gl.TEXTURE_2D, null);
                //   gl.bindRenderbuffer(gl.RENDERBUFFER, null);
                GlReset.resetBasePrarame(gl);
            }
        };
        MarmosetLightVo.prototype.fract = function (value) {
            return value - Math.floor(value);
        };
        MarmosetLightVo.prototype.make255 = function (value) {
            return Math.floor(value * 255) / 255;
        };
        MarmosetLightVo.prototype.packdepth = function (depth) {
            console.log("base", depth);
            var bitShift = new Vector3D(1.0, 255.0, 255.0 * 255.0, 255.0 * 255.0 * 255.0);
            var bitMask = new Vector3D(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0, 0.0);
            var rgbaDepth = bitShift.clone();
            rgbaDepth.x *= depth;
            rgbaDepth.y *= depth;
            rgbaDepth.z *= depth;
            rgbaDepth.w *= depth;
            console.log(rgbaDepth);
            rgbaDepth.x = this.fract(rgbaDepth.x);
            rgbaDepth.y = this.fract(rgbaDepth.y);
            rgbaDepth.z = this.fract(rgbaDepth.z);
            rgbaDepth.w = this.fract(rgbaDepth.w);
            console.log(rgbaDepth);
            rgbaDepth.x -= rgbaDepth.y * bitMask.x;
            rgbaDepth.y -= rgbaDepth.z * bitMask.y;
            rgbaDepth.z -= rgbaDepth.w * bitMask.z;
            rgbaDepth.w -= rgbaDepth.w * bitMask.w;
            console.log(rgbaDepth);
            rgbaDepth.x = this.make255(rgbaDepth.x);
            rgbaDepth.y = this.make255(rgbaDepth.y);
            rgbaDepth.z = this.make255(rgbaDepth.z);
            rgbaDepth.w = this.make255(rgbaDepth.w);
            console.log(rgbaDepth);
            rgbaDepth.w = 0.1;
            var outNum = this.upackDepth(rgbaDepth);
            console.log("outNum=>", outNum);
            console.log("basereb=>", Math.floor(depth * 255) / 255);
            console.log("----------------", depth - outNum);
            //"vec4 rgbaDepth = fract(depth * bitShift);  \n" +
            //"rgbaDepth -= rgbaDepth.yzww * bitMask;  \n" +
            //"return rgbaDepth;\n" +
        };
        MarmosetLightVo.prototype.upackDepth = function (value) {
            var bitShift = new Vector3D(1.0, 1.0 / 255.0, 1.0 / (255.0 * 255.0), 1.0 / (255.0 * 255.0 * 255.0));
            var outNum = bitShift.x * value.x + bitShift.y * value.y + bitShift.z * value.z + bitShift.w * value.w;
            //   console.log(outNum)
            //" vec4 bitShift = vec4(1.0, 1.0 / 255.0, 1.0 / (255.0 * 255.0), 1.0 / (255.0 * 255.0 * 255.0));" +
            //    "return dot(rgbaDepth, bitShift);" 
            return outNum;
        };
        MarmosetLightVo.prototype.drawTempMesh = function (mesh) {
            if (mesh.tAlbedo && mesh.tNormal && mesh.tReflectivity) {
                //    Pan3d.Scene_data.context3D.setWriteDepth(true);
                //   Pan3d.Scene_data.context3D.setDepthTest(true);
                //  Pan3d.Scene_data.context3D.setBlendParticleFactors(0)
                var gl = Scene_data.context3D.renderContext;
                Scene_data.context3D.setCullFaceModel(1);
                Scene_data.context3D.setWriteDepth(true);
                Scene_data.context3D.setDepthTest(true);
                //  Scene_data.context3D.setCullFaceModel(2);
                // Scene_data.context3D.setBlendParticleFactors(Math.floor(this.skipNum / 100)%6)
                Scene_data.context3D.setBlendParticleFactors(Math.floor(this.skipNum / 100) % 6);
                //console.log(Math.floor(this.skipNum / 100) % 6)
                //  this.packdepth(0.91234)
                Scene_data.context3D.setProgram(this.shader.program);
                if (!this.depthFBO.depthViewMatrix3D) {
                    if (mesh.materials["mview"]) {
                        this.depthFBO.depthViewMatrix3D = mesh.materials["mview"];
                    }
                    else {
                        return;
                    }
                }
                var tempArr = [-0.8713266253471375, 0, 0.40336543321609497, 0.1891629546880722, 0, 0.8873469829559326, -1.1415002276748965e-8, -5.353198773150325e-9, 0.16785311698913574, 0, 2.093871831893921, 0.9819457530975342, 2.4669361114501953, -1.8852310180664062, 9.165491104125977, 20.56804656982422];
                for (var kt = 0; kt < tempArr.length; kt++) {
                    this.depthFBO.depthViewMatrix3D[kt] = tempArr[kt];
                }
                Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", this.depthFBO.depthViewMatrix3D);
                Scene_data.context3D.setRenderTexture(this.shader, "tAlbedo", mesh.tAlbedo.texture, 0);
                Scene_data.context3D.setVa(0, 3, mesh.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 2, mesh.objData.uvBuffer);
                Scene_data.context3D.drawCall(mesh.objData.indexBuffer, mesh.objData.treNum);
                this.skipNum++;
            }
        };
        return MarmosetLightVo;
    }());
    mars3D.MarmosetLightVo = MarmosetLightVo;
})(mars3D || (mars3D = {}));
//# sourceMappingURL=MarmosetLightVo.js.map