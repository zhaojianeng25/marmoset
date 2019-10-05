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
    var TextureManager = Pan3d.TextureManager;
    var UIManager = Pan3d.UIManager;
    var LoadManager = Pan3d.LoadManager;
    var ByteStream = marmoset.ByteStream;
    var Matrix = marmoset.Matrix;
    var Vect = marmoset.Vect;
    var Mars3Dmesh = /** @class */ (function (_super) {
        __extends(Mars3Dmesh, _super);
        function Mars3Dmesh(gl, modeInfo, materials, c) {
            var _this = _super.call(this, gl, modeInfo, c) || this;
            _this.modeInfo = modeInfo;
            _this.materials = materials;
            return _this;
        }
        Mars3Dmesh.prototype.setAlbedoUrl = function (value) {
            var _this = this;
            TextureManager.getInstance().getTexture(Scene_data.fileuiRoot + "pan/marmoset/feiji/pic/" + value + ".jpg", function (a) {
                _this.tAlbedo = a;
            });
        };
        Mars3Dmesh.prototype.setNormalUrl = function (value) {
            var _this = this;
            TextureManager.getInstance().getTexture(Scene_data.fileuiRoot + "pan/marmoset/feiji/pic/" + value + ".jpg", function (a) {
                _this.tNormal = a;
            });
        };
        /*
        public setReflectivityUrl(value: string): void {
            TextureManager.getInstance().getTexture(Scene_data.fileuiRoot + "pan/marmoset/feiji/pic/" + value + ".jpg", (a: TextureRes) => {
                this.tReflectivity = a

            });
        }
        */
        Mars3Dmesh.prototype.setReflectRgbAlphaUrl = function (rgbUrl, alphaUrl) {
            var _this = this;
            LoadManager.getInstance().load(Scene_data.fileuiRoot + "pan/marmoset/feiji/pic/" + rgbUrl + ".jpg", LoadManager.IMG_TYPE, function (rgbImg) {
                LoadManager.getInstance().load(Scene_data.fileuiRoot + "pan/marmoset/feiji/pic/" + alphaUrl + ".jpg", LoadManager.IMG_TYPE, function (alphaImg) {
                    _this.fromFilesMergeAlpha(rgbImg, alphaImg);
                });
            });
        };
        Mars3Dmesh.prototype.fromFilesMergeAlpha = function (img, alphaImg) {
            console.log(img, alphaImg);
            var gl = Scene_data.context3D.renderContext;
            var ctx = UIManager.getInstance().getContext2D(img.width, img.height);
            ctx.drawImage(img, 0, 0);
            var imgData = ctx.getImageData(0, 0, img.width, img.height);
            ctx.clearRect(0, 0, img.width, img.height);
            ctx.drawImage(alphaImg, 0, 0);
            var alphaImgdata = ctx.getImageData(0, 0, img.width, img.height);
            for (var i = 0; i < imgData.data.length; i += 4) {
                //  var per: number = alphaImgdata.data[i] / 255;
                imgData.data[i + 3] = alphaImgdata.data[i];
            }
            this.tReflectivity = new Pan3d.TextureRes();
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            this.tReflectivity.texture = Scene_data.context3D.getTexture(imgData);
        };
        Mars3Dmesh.prototype.meshVect = function (value, stride) {
            var buffer = new ArrayBuffer(value.length);
            var changeArr = new Uint8Array(buffer);
            var outArr = new Float32Array(buffer);
            for (var i = 0; i < value.length; i++) {
                changeArr[i] = value[i];
            }
            for (var i = 0; i < outArr.length / 8; i++) {
                var id = i * 8 + 0;
                outArr[id] = outArr[id] * 0.5;
            }
            return outArr;
        };
        //public vectBuffer: WebGLBuffer //顶点
        //public uvBuffer: WebGLBuffer //UV
        //public nrmBuffer: WebGLBuffer; //法线
        Mars3Dmesh.prototype.meshIndexFloat = function (value) {
            var buffer = new ArrayBuffer(value.length);
            var changeArr = new Uint8Array(buffer);
            var chang32 = new Uint16Array(buffer);
            for (var i = 0; i < value.length; i++) {
                changeArr[i] = value[i];
            }
            this.objData.indexs = [];
            for (var i = 0; i < chang32.length; i++) {
                this.objData.indexs.push(chang32[i]);
            }
            this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
        };
        Mars3Dmesh.prototype.meshVecFloat = function (value, stride, gl) {
            var len8 = stride / 4;
            var buffer = new ArrayBuffer(value.length);
            var changeArr = new Uint8Array(buffer);
            var chang32 = new Float32Array(buffer);
            for (var i = 0; i < value.length; i++) {
                changeArr[i] = value[i];
            }
            this.objData.vertices = [];
            for (var i = 0; i < chang32.length / len8; i++) {
                var id = i * len8;
                this.objData.vertices.push(chang32[id + 0]);
                this.objData.vertices.push(chang32[id + 1]);
                this.objData.vertices.push(chang32[id + 2]);
            }
            this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
        };
        Mars3Dmesh.prototype.meshUvFloat = function (value, stride, gl) {
            var len8 = stride / 4;
            var buffer = new ArrayBuffer(value.length);
            var changeArr = new Uint8Array(buffer);
            var change32 = new Float32Array(buffer);
            for (var i = 0; i < value.length; i++) {
                changeArr[i] = value[i];
            }
            this.objData.uvs = [];
            for (var i = 0; i < change32.length / len8; i++) {
                var id = i * len8;
                this.objData.uvs.push(change32[id + 3]);
                this.objData.uvs.push(change32[id + 4]);
                // this.objData.uvs.push(1 - (change32[id + 4]))
            }
            this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
        };
        Mars3Dmesh.prototype.meshNrmFloat = function (value, stride, gl) {
            var len16 = stride / 2;
            var buffer = new ArrayBuffer(value.length);
            var changeArr = new Uint8Array(buffer);
            for (var i = 0; i < value.length; i++) {
                changeArr[i] = value[i];
            }
            var tbnArr = new Uint16Array(buffer);
            this.objData.normals = [];
            var m = new Pan3d.Matrix3D;
            m.appendRotation(90, Pan3d.Vector3D.Z_AXIS);
            for (var i = 0; i < tbnArr.length / len16; i++) { //tbn
                var id = i * len16 + 10;
                if (this.secondaryTexCoord) {
                    //  id += 4; //有第二张贴图需要TBN要后移动 
                }
                var a = tbnArr[id + 4];
                var b = tbnArr[id + 5];
                var outVec3 = this.getNrmByXY(new Vector2D(a, b));
                this.objData.normals.push(outVec3.x, outVec3.y, outVec3.z);
            }
            this.objData.normalsBuffer = Scene_data.context3D.uploadBuff3D(this.objData.normals);
        };
        Mars3Dmesh.prototype.getNrmByXY = function (v) {
            v.x = v.x / 65535.0;
            v.y = v.y / 65535.0;
            var iX = (v.y > (32767.1 / 65535.0));
            v.y = iX ? (v.y - (32768.0 / 65535.0)) : v.y;
            var r = new Vector3D();
            r.x = (2.0 * 65535.0 / 32767.0) * v.x - 1.0;
            r.y = (2.0 * 65535.0 / 32767.0) * v.y - 1.0;
            r.z = Math.sqrt(Math.max(Math.min(1.0 - (r.x * r.x + r.y * r.y), 1.0), 0.0));
            r.z = iX ? -r.z : r.z;
            return r;
        };
        Mars3Dmesh.prototype.initdata = function (a, b, c) {
            this.objData = new Pan3d.ObjData;
            this.gl = a;
            var elementArrayBuffer = this.gl.getParameter(this.gl.ELEMENT_ARRAY_BUFFER_BINDING);
            var arrayBuffer = this.gl.getParameter(this.gl.ARRAY_BUFFER_BINDING);
            this.gl = a;
            this.desc = b;
            var d = b.isDynamicMesh;
            this.numSubMeshes = this.dynamicVertexData = 0;
            this.displayMatrix = Matrix.identity();
            this.name = b.name;
            this.modelMatrix = Matrix.identity();
            this.origin = b.transform ? Vect.create(b.transform[12], b.transform[13], b.transform[14], 1) : Vect.create(0, 5, 0, 1);
            this.stride = 32;
            if (this.vertexColor = b.vertexColor) {
                this.stride += 4;
            }
            if (this.secondaryTexCoord = b.secondaryTexCoord) {
                this.stride += 8;
            }
            if (this.stride != 32) {
                alert("顶点数据不为32，可能需要处理BUG");
            }
            c = new ByteStream(c.data);
            this.indexCount = b.indexCount;
            this.indexTypeSize = b.indexTypeSize;
            this.indexType = 4 == this.indexTypeSize ? a.UNSIGNED_INT : a.UNSIGNED_SHORT;
            this.indexBuffer = a.createBuffer();
            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            var e = c.readBytes(this.indexCount * this.indexTypeSize);
            this.meshIndexFloat(e);
            a.bufferData(a.ELEMENT_ARRAY_BUFFER, e, a.STATIC_DRAW);
            this.wireCount = b.wireCount;
            this.wireBuffer = a.createBuffer();
            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.wireBuffer);
            e = c.readBytes(this.wireCount * this.indexTypeSize);
            a.bufferData(a.ELEMENT_ARRAY_BUFFER, e, a.STATIC_DRAW);
            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, null);
            this.vertexCount = b.vertexCount;
            c = c.readBytes(this.vertexCount * this.stride);
            this.meshVecFloat(c, this.stride, a);
            this.meshUvFloat(c, this.stride, a);
            this.meshNrmFloat(c, this.stride, a);
            this.objData.treNum = this.indexCount;
            if (this.secondaryTexCoord) {
                alert("有法线纹理要处理");
            }
            c = this.meshVect(c, this.stride);
            this.vertexBuffer = a.createBuffer();
            a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer);
            a.bufferData(a.ARRAY_BUFFER, c, a.STATIC_DRAW);
            a.bindBuffer(a.ARRAY_BUFFER, null);
            this.bounds = void 0 === b.minBound || void 0 === b.maxBound ? {
                min: Vect.create(-10, -10, -10, 1),
                max: Vect.create(10, 10, -0, 1)
            } : {
                min: Vect.create(b.minBound[0], b.minBound[1], b.minBound[2], 1),
                max: Vect.create(b.maxBound[0], b.maxBound[1], b.maxBound[2], 1)
            };
            this.bounds.maxExtent = Math.max(Math.max(b.maxBound[0] - b.minBound[0], b.maxBound[1] - b.minBound[1]), b.maxBound[2] - b.minBound[2]);
            this.bounds.averageExtent = (b.maxBound[0] - b.minBound[0] + (b.maxBound[1] - b.minBound[1]) + (b.maxBound[2] - b.minBound[2])) / 3;
            if (elementArrayBuffer) {
                this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, elementArrayBuffer);
            }
            if (arrayBuffer) {
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, arrayBuffer);
            }
        };
        return Mars3Dmesh;
    }(marmoset.Mesh));
    mars3D.Mars3Dmesh = Mars3Dmesh;
})(mars3D || (mars3D = {}));
//# sourceMappingURL=Mars3Dmesh.js.map