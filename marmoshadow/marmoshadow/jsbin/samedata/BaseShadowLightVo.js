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
var samedata;
(function (samedata) {
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
    samedata.MarFBO = MarFBO;
    var BaseShadowLightShader = /** @class */ (function (_super) {
        __extends(BaseShadowLightShader, _super);
        function BaseShadowLightShader() {
            return _super.call(this) || this;
        }
        BaseShadowLightShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "vPosition");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
        };
        BaseShadowLightShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 vPosition;" +
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
                "}";
            return $str;
        };
        BaseShadowLightShader.prototype.getFragmentShaderString = function () {
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
        BaseShadowLightShader.BaseShadowLightShader = "BaseShadowLightShader";
        return BaseShadowLightShader;
    }(Shader3D));
    samedata.BaseShadowLightShader = BaseShadowLightShader;
    var BaseShadowLightVo = /** @class */ (function () {
        function BaseShadowLightVo() {
            this.skipNum = 1;
            this.depthFBO = new MarFBO(2048, 2048);
            this.depthFBO.color = new Vector3D(0, 0, 0, 0);
            ProgrmaManager.getInstance().registe(BaseShadowLightShader.BaseShadowLightShader, new BaseShadowLightShader);
            this.shader = ProgrmaManager.getInstance().getProgram(BaseShadowLightShader.BaseShadowLightShader);
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
        BaseShadowLightVo.prototype.updateDepthTexture = function (fbo) {
            var gl = Scene_data.context3D.renderContext;
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
        };
        BaseShadowLightVo.prototype.update = function (value) {
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
        BaseShadowLightVo.prototype.fract = function (value) {
            return value - Math.floor(value);
        };
        BaseShadowLightVo.prototype.make255 = function (value) {
            return Math.floor(value * 255) / 255;
        };
        BaseShadowLightVo.prototype.packdepth = function (depth) {
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
        BaseShadowLightVo.prototype.upackDepth = function (value) {
            var bitShift = new Vector3D(1.0, 1.0 / 255.0, 1.0 / (255.0 * 255.0), 1.0 / (255.0 * 255.0 * 255.0));
            var outNum = bitShift.x * value.x + bitShift.y * value.y + bitShift.z * value.z + bitShift.w * value.w;
            //   console.log(outNum)
            //" vec4 bitShift = vec4(1.0, 1.0 / 255.0, 1.0 / (255.0 * 255.0), 1.0 / (255.0 * 255.0 * 255.0));" +
            //    "return dot(rgbaDepth, bitShift);" 
            return outNum;
        };
        BaseShadowLightVo.prototype.drawTempMesh = function (mesh) {
            if (mesh.tAlbedo && mesh.tNormal && mesh.tReflectivity) {
                //    Pan3d.Scene_data.context3D.setWriteDepth(true);
                //   Pan3d.Scene_data.context3D.setDepthTest(true);
                //  Pan3d.Scene_data.context3D.setBlendParticleFactors(0)
                var gl = Scene_data.context3D.renderContext;
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
                var tempArr = [-2.399169445037842, 0.007191055919975042, 0.026615558192133904, 0.026615558192133904, 0.00008928590250434354, 2.9879062175750732, -0.08928610384464264, -0.08928610384464264, 0.06313783675432205, 0.26900720596313477, 0.9956503510475159, 0.9956503510475159, 0.7742966413497925, -2.6027095317840576, 27.5628662109375, 28.162866592407227];
                for (var kt = 0; kt < tempArr.length; kt++) {
                    //   this.depthFBO.depthViewMatrix3D[kt] = tempArr[kt];
                }
                var tempArr = [-0.8713266253471375, 8.985513999526518e-10, 0.40336546301841736, 0.1891629546880722, 0, 0.8873469829559326, -1.1415001388570545e-8, -5.353198773150325e-9, 0.16785317659378052, 4.664383990160559e-9, 2.093871831893921, 0.9819457530975342, 2.4669361114501953, -1.8852306604385376, 9.165491104125977, 20.56804656982422];
                var tempArr = [0.6500183939933777, 0.3525499999523163, 0.867900013923645, 0.5527472496032715, 0, 0.7205265164375305, -0.9164319634437561, -0.5836562514305115, 0.6040370464324951, -0.3793872892856598, -0.9339674711227417, -0.5948242545127869, -5.183374404907227, -0.34626707434654236, 12.497532844543457, 20.049705505371094];
                var tempArr = [-1.2446883916854858, 0.006111379712820053, -0.5838364362716675, -0.23012207448482513, 0, 1.278754711151123, 0.05266710743308067, 0.020759006962180138, -0.2943965494632721, -0.025838496163487434, 2.4684202671051025, 0.9729403257369995, 2.26643705368042, -10.048957824707031, 9.530219078063965, 25.643653869628906];
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
        return BaseShadowLightVo;
    }());
    samedata.BaseShadowLightVo = BaseShadowLightVo;
})(samedata || (samedata = {}));
//# sourceMappingURL=BaseShadowLightVo.js.map