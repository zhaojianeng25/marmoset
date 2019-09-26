var mars3D;
(function (mars3D) {
    var Scene_data = Pan3d.Scene_data;
    var ByteStream = marmoset.ByteStream;
    var Scene = marmoset.Scene;
    var FileVo = /** @class */ (function () {
        function FileVo() {
        }
        return FileVo;
    }());
    mars3D.FileVo = FileVo;
    var MarmosetModel = /** @class */ (function () {
        function MarmosetModel() {
            this.textureItem = [];
            MarmosetModel.imgBolb = {};
        }
        MarmosetModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new MarmosetModel();
            }
            return this._instance;
        };
        MarmosetModel.preaMeshFile = function (modeInfo, materials, fileDic) {
            if (!this.meshItem) {
                this.meshItem = [];
            }
            this.meshItem.push(new mars3D.Mars3Dmesh(Scene_data.context3D.renderContext, modeInfo, materials, fileDic[modeInfo.file]));
        };
        MarmosetModel.makeSkyData = function (a) {
            this.tSkySpecularTexture = Scene_data.context3D.creatTexture(256, 2048);
            var gl = Scene_data.context3D.renderContext;
            gl.bindTexture(gl.TEXTURE_2D, this.tSkySpecularTexture);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, 2048, 0, gl.RGBA, gl.UNSIGNED_BYTE, a);
            gl.bindTexture(gl.TEXTURE_2D, null);
        };
        MarmosetModel.prototype.overrideFun = function () {
            var marmosetFun = function (fun) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                var v = fun.apply(this, args);
                return v;
            };
            var Scene_load = Scene.prototype.load;
            Scene.prototype.load = function (a) {
                var fileDic = {};
                var sceneInfo;
                for (var fileKey in a.files) {
                    var fileVo = new FileVo();
                    fileVo.name = a.files[fileKey].name;
                    fileVo.type = a.files[fileKey].type;
                    fileVo.data = a.files[fileKey].data;
                    fileDic[fileVo.name] = fileVo;
                    if (fileVo.name.indexOf("scene.json") != -1) {
                        sceneInfo = JSON.parse((new ByteStream(fileVo.data)).asString());
                    }
                }
                var tempBack = marmosetFun.call(this, Scene_load, a);
                this.meshRenderables;
                for (var g = 0; g < sceneInfo.meshes.length; ++g) {
                    MarmosetModel.preaMeshFile(sceneInfo.meshes[g], this.materialsList[g], fileDic);
                }
                console.log(fileDic);
                // this.sky = new Sky(this.gl, a, c.sky);
                // sceneInfo.sky
                // console.log(window["specularTexturedata"])
                MarmosetModel.makeSkyData(window["specularTexturedata"]);
                return tempBack;
            };
            var TextureCache_parseFile = marmoset.TextureCache.parseFile;
            marmoset.TextureCache.parseFile = function (a, b, c) {
                var tempImg = new Image();
                var tempBlob = new Blob([a.data], {
                    type: a.type
                });
                var tempURL = URL.createObjectURL(tempBlob);
                tempImg.onload = function () {
                    URL.revokeObjectURL(tempURL);
                    var webGLTexture = Pan3d.TextureManager.getInstance().getImageDataTexture(tempImg);
                    MarmosetModel.getInstance().textureItem.push(webGLTexture);
                };
                tempImg.src = tempURL;
                TextureCache_parseFile.call(this, a, b, c);
                MarmosetModel.imgBolb[a.name] = new Blob([a.data], { type: "application/octet-binary" });
            };
            var Shader_build = marmoset.Shader.prototype.build;
            marmoset.Shader.prototype.build = function (a, b) {
                //console.log("---------------------------------")
                //console.log(a.length, b.length)
                console.log(a);
                console.log(b);
                if (b.length == 18238) { //读取顶点和纹理着色器
                    //   console.log(b)
                    a = MarmosetModel.changerVshader;
                    b = MarmosetModel.changerFshader;
                }
                else {
                    if (a.length == 212) { //更新输出着色器
                        b = MarmosetModel.changerOutshader;
                        //    console.log(b)
                    }
                }
                Shader_build.call(this, a, b);
            };
        };
        MarmosetModel.prototype.upFileToSvever = function () {
            var num = 0;
            for (var key in MarmosetModel.imgBolb) {
                num++;
            }
            this.needFoald = num > 1;
            for (var key in MarmosetModel.imgBolb) {
                if (key == "mat0_r.jpg.jpg") {
                    this.dataURLtoBlob(MarmosetModel.imgBolb[key], key);
                }
            }
        };
        MarmosetModel.prototype.saveObjData = function (objData, pathurl, $name) {
            var objStr = {};
            objStr.vertices = objData.vertices;
            objStr.normals = objData.normals;
            objStr.uvs = objData.uvs;
            objStr.lightuvs = objData.lightuvs ? objData.lightuvs : objData.uvs;
            objStr.indexs = objData.indexs;
            objStr.treNum = objData.indexs.length;
            var strXml = JSON.stringify(objStr);
            var $file = new File([strXml], $name);
            if (this.needFoald) {
                pathurl += "objs/";
            }
            var pathUrl = Pan3d.Scene_data.fileRoot + pathurl + $name;
            var ossPathUrl = pathUrl.replace(Pan3d.Scene_data.ossRoot, "");
            pack.FileOssModel.upOssFile($file, ossPathUrl, function (value) {
                console.log(value);
                pack.FileOssModel.getDisByOss(ossPathUrl, function (arrDic) {
                    // console.log(arrDic)
                });
            });
            return pathurl + $name;
        };
        MarmosetModel.prototype.savePrefab = function (objsUrl, fileSonPath, fileName) {
            var ossPath = Pan3d.Scene_data.fileRoot.replace(Pan3d.Scene_data.ossRoot, "");
            var materialUrl = fileSonPath + fileName + ".material";
            pack.FileOssModel.copyFile(ossPath + materialUrl, "baseedit/assets/base/base.material", function () { });
            var prefabStaticMesh = new pack.PrefabStaticMesh();
            prefabStaticMesh.url = fileSonPath + fileName + ".prefab";
            prefabStaticMesh.objsurl = objsUrl;
            prefabStaticMesh.textureurl = materialUrl;
            var $byte = new Pan3d.Pan3dByteArray();
            var $temp = prefabStaticMesh.getObject();
            $temp.version = pack.FileOssModel.version;
            $byte.writeUTF(JSON.stringify($temp));
            var prafabFile = new File([$byte.buffer], "temp.prefab");
            var pathurl = ossPath + prefabStaticMesh.url;
            pack.FileOssModel.upOssFile(prafabFile, pathurl, function (value) {
                console.log(value);
            });
            return prefabStaticMesh.url;
        };
        MarmosetModel.prototype.upObjDataToSever = function () {
            var fileSonPath = "pan/marmoset/" + this.viewFileName.replace(".mview", "/");
            var $hierarchyList = [];
            this.needFoald = MarmosetModel.meshItem.length > 1;
            for (var i = 0; i < MarmosetModel.meshItem.length; i++) {
                var $name = this.viewFileName.replace(".mview", "_" + i + "");
                var objUrl = this.saveObjData(MarmosetModel.meshItem[i].objData, fileSonPath, $name + ".objs");
                var prefabUrl = this.savePrefab(objUrl, fileSonPath, $name);
                $hierarchyList.push(this.makeTemapModeInfo(prefabUrl, $name));
            }
            this.saveMarmosetMap(fileSonPath + this.viewFileName.replace(".mview", ".map"), $hierarchyList);
        };
        MarmosetModel.prototype.makeTemapModeInfo = function (prefabUrl, $name) {
            var $obj = {};
            $obj.type = maineditor.HierarchyNodeType.Prefab;
            $obj.name = $name;
            $obj.url = prefabUrl;
            $obj.data = "name";
            $obj.x = 0;
            $obj.y = 0;
            $obj.z = 0;
            $obj.scaleX = 1;
            $obj.scaleY = 1;
            $obj.scaleZ = 1;
            $obj.rotationX = 0;
            $obj.rotationY = 0;
            $obj.rotationZ = 0;
            return $obj;
        };
        MarmosetModel.prototype.saveMarmosetMap = function (mapUrl, listArr) {
            var ossPath = Pan3d.Scene_data.fileRoot.replace(Pan3d.Scene_data.ossRoot, "");
            var tempSceneVo = new maineditor.SceneProjectVo({});
            tempSceneVo.gildline = true;
            tempSceneVo.textureurl = "base.material";
            var tempObj = tempSceneVo.getSaveObj();
            tempObj.list = listArr;
            tempObj.version = pack.FileOssModel.version;
            var $byte = new Pan3d.Pan3dByteArray();
            $byte.writeUTF(JSON.stringify(tempObj));
            var $file = new File([$byte.buffer], "scene.map");
            pack.FileOssModel.upOssFile($file, ossPath + mapUrl, function () {
                console.log("上传完成");
            });
        };
        MarmosetModel.prototype.dataURLtoBlob = function (value, name) {
            var _this = this;
            //"image/jpeg"
            var img = new Image();
            img.url = name;
            img.onload = function (evt) {
                var etimg = evt.target;
                URL.revokeObjectURL(etimg.src);
                var files = new File([value], name, { type: "image/jpeg" });
                var sonPath = "pan/marmoset/" + _this.viewFileName.replace(".mview", "/");
                if (_this.needFoald) {
                    sonPath += "pic/";
                }
                var pathUrl = Pan3d.Scene_data.fileRoot + sonPath + name;
                var pathurl = pathUrl.replace(Pan3d.Scene_data.ossRoot, "");
                pack.FileOssModel.upOssFile(files, pathurl, function (value) {
                    console.log(pathurl);
                });
            };
            img.src = URL.createObjectURL(value);
        };
        MarmosetModel.prototype.dataURLtoFile = function (dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        };
        MarmosetModel.prototype.initData = function () {
            this.overrideFun();
        };
        return MarmosetModel;
    }());
    mars3D.MarmosetModel = MarmosetModel;
})(mars3D || (mars3D = {}));
//# sourceMappingURL=MarmosetModel.js.map