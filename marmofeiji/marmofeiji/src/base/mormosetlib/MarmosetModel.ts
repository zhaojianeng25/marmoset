module mars3D {
    import Scene_data = Pan3d.Scene_data
    import TextureManager = Pan3d.TextureManager
    import TextureRes = Pan3d.TextureRes
    
    import ByteStream = marmoset.ByteStream
    import Scene = marmoset.Scene
    import Matrix = marmoset.Matrix
    import Vect = marmoset.Vect
    
    export class FileVo {
        public name: string
        public type: string
        public data: Uint8Array
    }

   

    export class MarmosetModel {
        private static _instance: MarmosetModel;
        public static getInstance(): MarmosetModel {
            if (!this._instance) {
                this._instance = new MarmosetModel();
            }
            return this._instance;
        }
        public static meshItem: Array<Mars3Dmesh>
        private static preaMeshFile(modeInfo: any, materials: any, fileDic: any): void {
            if (!this.meshItem) {
                this.meshItem=[]
            }
            this.meshItem.push(new Mars3Dmesh(Scene_data.context3D.renderContext, modeInfo, materials, fileDic[modeInfo.file]))
 
        }
        public viewFileName: string
        public static tSkySpecularTexture: WebGLTexture
        private static makeSkyData(a: any): void {

            this.tSkySpecularTexture = Scene_data.context3D.creatTexture(256, 2048)
            var gl: WebGLRenderingContext = Scene_data.context3D.renderContext;
            gl.bindTexture(gl.TEXTURE_2D, this.tSkySpecularTexture );
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, 2048, 0, gl.RGBA, gl.UNSIGNED_BYTE, a);
            gl.bindTexture(gl.TEXTURE_2D, null)
 
        }
        private overrideFun(): void {
            let marmosetFun = function (fun: Function, ...args): any {
                let v = fun.apply(this, args);
                return v;
            }
            let Scene_load = Scene.prototype.load;
            Scene.prototype.load = function (a: any): any {
                var fileDic: any = {};
                var sceneInfo: any
                for (var fileKey in a.files) {
                    var fileVo: FileVo = new FileVo();
                    fileVo.name = a.files[fileKey].name;
                    fileVo.type = a.files[fileKey].type;
                    fileVo.data = a.files[fileKey].data;
                    fileDic[fileVo.name] = fileVo
                    if (fileVo.name.indexOf("scene.json") != -1) {
                         sceneInfo  = JSON.parse((new ByteStream(fileVo.data)).asString());
                    }
                }
                let tempBack = marmosetFun.call(this, Scene_load, a)
                this.meshRenderables
                for (var g: number = 0; g < sceneInfo.meshes.length; ++g) {
                    MarmosetModel.preaMeshFile(sceneInfo.meshes[g], this.materialsList[g], fileDic)
                }
                console.log(fileDic)
               // this.sky = new Sky(this.gl, a, c.sky);
               // sceneInfo.sky
               // console.log(window["specularTexturedata"])

                MarmosetModel.makeSkyData(window["specularTexturedata"])

                return tempBack;
            }
            let TextureCache_parseFile = marmoset.TextureCache.parseFile;
            marmoset.TextureCache.parseFile = function (a: any, b: any, c: any): void {
                var tempImg: any = new Image();
                var tempBlob = new Blob([a.data], {
                    type: a.type
                });
                var tempURL = URL.createObjectURL(tempBlob);
                tempImg.onload = function () {
                    URL.revokeObjectURL(tempURL);
                    var webGLTexture: WebGLTexture = Pan3d.TextureManager.getInstance().getImageDataTexture(tempImg);
                    MarmosetModel.getInstance().textureItem.push(webGLTexture);
                }
                tempImg.src = tempURL;
                TextureCache_parseFile.call(this, a, b,c);
                MarmosetModel.imgBolb[a.name] = new Blob([a.data], { type: "application/octet-binary" });
            }

            let Shader_build = marmoset.Shader.prototype.build;
            marmoset.Shader.prototype.build = function (a: string, b: string): void {
                //console.log("---------------------------------")
                //console.log(a.length, b.length)
                console.log(a)
                console.log(b)
                if (b.length == 18238) { //读取顶点和纹理着色器
                    //   console.log(b)
                    a = MarmosetModel.changerVshader;
                    b = MarmosetModel.changerFshader;
                } else {
                    if (a.length == 212) {//更新输出着色器
                         b = MarmosetModel.changerOutshader;
                        //    console.log(b)
                    }
                }
                Shader_build.call(this, a, b);
            }



 

        }
        public static changerVshader: string
        public static changerFshader: string
        public static changerOutshader: string
   
        public upFileToSvever(): void {
            var num: number=0
            for (var key in MarmosetModel.imgBolb) {
                num++
            }
            this.needFoald = num>1
            for (var key in MarmosetModel.imgBolb) {
       

                if (key == "mat0_r.jpg.jpg") {
                    this.dataURLtoBlob(MarmosetModel.imgBolb[key], key)
                }
            }
        }
        private saveObjData(objData: ObjData, pathurl: string, $name: string): string {
            var objStr: any = {}
            objStr.vertices = objData.vertices;
            objStr.normals = objData.normals;
            objStr.uvs = objData.uvs;
            objStr.lightuvs = objData.lightuvs ? objData.lightuvs : objData.uvs;
            objStr.indexs = objData.indexs;
            objStr.treNum = objData.indexs.length;

            var strXml: string = JSON.stringify(objStr)
            var $file: File = new File([strXml], $name);

            if (this.needFoald) {
                pathurl+="objs/"
            }
            var pathUrl: string = Pan3d.Scene_data.fileRoot + pathurl + $name
            var ossPathUrl: string = pathUrl.replace(Pan3d.Scene_data.ossRoot, "");
            pack.FileOssModel.upOssFile($file, ossPathUrl, (value: any) => {
                console.log(value)
                pack.FileOssModel.getDisByOss(ossPathUrl, (arrDic: Array<FileVo>) => {
                   // console.log(arrDic)
                })

            })
            return pathurl + $name
        }
        private savePrefab(objsUrl: string, fileSonPath: string, fileName: string): string {
            var ossPath: string = Pan3d.Scene_data.fileRoot.replace(Pan3d.Scene_data.ossRoot, "");
            var materialUrl: string = fileSonPath + fileName + ".material";
          
 
            pack.FileOssModel.copyFile(ossPath + materialUrl, "baseedit/assets/base/base.material", () => { });
 
            var prefabStaticMesh: pack.PrefabStaticMesh = new pack.PrefabStaticMesh();
            prefabStaticMesh.url = fileSonPath + fileName + ".prefab"
            prefabStaticMesh.objsurl = objsUrl;
            prefabStaticMesh.textureurl = materialUrl;

            var $byte: Pan3d.Pan3dByteArray = new Pan3d.Pan3dByteArray();
            var $temp: any = prefabStaticMesh.getObject();
            $temp.version = pack.FileOssModel.version;
            $byte.writeUTF(JSON.stringify($temp));

            var prafabFile: File = new File([$byte.buffer], "temp.prefab");
            var pathurl: string = ossPath + prefabStaticMesh.url;
            pack.FileOssModel.upOssFile(prafabFile, pathurl, (value) => {
                console.log(value)
            });

            return prefabStaticMesh.url
        }
        private needFoald: boolean
        public upObjDataToSever(): void {
            var fileSonPath: string = "pan/marmoset/" + this.viewFileName.replace(".mview", "/");
            var $hierarchyList: Array<any> = [];

            this.needFoald = MarmosetModel.meshItem.length>1
            for (var i: number = 0; i < MarmosetModel.meshItem.length; i++) {

                var $name = this.viewFileName.replace(".mview", "_" + i + "")
                var objUrl: string = this.saveObjData(MarmosetModel.meshItem[i].objData, fileSonPath, $name + ".objs");
                var prefabUrl: string = this.savePrefab(objUrl, fileSonPath, $name);
                $hierarchyList.push(this.makeTemapModeInfo(prefabUrl, $name));
            }

            this.saveMarmosetMap(fileSonPath + this.viewFileName.replace(".mview", ".map"),  $hierarchyList)

        }
        private makeTemapModeInfo(prefabUrl: string, $name: string): any {
            var $obj: any = {};
            $obj.type = maineditor.HierarchyNodeType.Prefab;
            $obj.name = $name
            $obj.url = prefabUrl;
             $obj.data = "name"
            $obj.x = 0
            $obj.y =0
            $obj.z = 0
            $obj.scaleX = 1
            $obj.scaleY = 1
            $obj.scaleZ = 1
            $obj.rotationX = 0
            $obj.rotationY = 0
            $obj.rotationZ = 0


            return $obj
        }
        private saveMarmosetMap(mapUrl: string, listArr: Array<any>): void {
            var ossPath: string = Pan3d.Scene_data.fileRoot.replace(Pan3d.Scene_data.ossRoot, "");
            var tempSceneVo: maineditor.SceneProjectVo = new maineditor.SceneProjectVo({})

            tempSceneVo.gildline = true
            tempSceneVo.textureurl = "base.material";

            var tempObj: any = tempSceneVo.getSaveObj();
            tempObj.list = listArr;
            tempObj.version = pack.FileOssModel.version;
            var $byte: Pan3d.Pan3dByteArray = new Pan3d.Pan3dByteArray();
            $byte.writeUTF(JSON.stringify(tempObj))
            var $file: File = new File([$byte.buffer], "scene.map");

            pack.FileOssModel.upOssFile($file, ossPath+ mapUrl, () => {
                console.log("上传完成")
            })
        }
        public static imgBolb: any;
 
        public dataURLtoBlob(value: Blob, name: string): void {

            //"image/jpeg"
            var img: any = new Image();
            img.url = name
            img.onload = (evt: Event) => {
                var etimg: any = evt.target;
                URL.revokeObjectURL(etimg.src);

                let files = new File([value], name, { type: "image/jpeg" })

                var sonPath: string = "pan/marmoset/" + this.viewFileName.replace(".mview", "/")
                if (this.needFoald) {
                    sonPath+="pic/"
                }
                var pathUrl: string = Pan3d.Scene_data.fileRoot + sonPath + name;
                var pathurl: string = pathUrl.replace(Pan3d.Scene_data.ossRoot, "");
                pack.FileOssModel.upOssFile(files, pathurl, (value: any) => {
                    console.log(pathurl)
                })
 
            }
            img.src = URL.createObjectURL(value);


        }
        private dataURLtoFile(dataurl: string, filename: string): File {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        }
  
        public textureItem: Array<WebGLTexture>;
        public constructor() {
            this.textureItem = []
            MarmosetModel.imgBolb = {};
        
        }
        public initData(): void {
            this.overrideFun()
            this.overrideDrawScene();
 
        }
     
        private overrideDrawScene(): void {
         
            marmoset.Scene.prototype.draw = function (a) {
                var b = this.gl;
                if (this.sceneLoaded) {
                    this.sky.setClearColor();
                    b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT | b.STENCIL_BUFFER_BIT);
                    b.enable(b.DEPTH_TEST);
                    this.sky.draw(this);
                    this.shadowFloor && this.shadowFloor.draw(this);

                    if (window["baseRectSprite"]) {
                        window["baseRectSprite"].update();
                    }
                    if (window["InsetMarmosetSprite"]) {
                        window["InsetMarmosetSprite"].upDataBygl(b);
                    }

                    for (var c = 0; c < this.meshRenderables.length; ++c)
                        this.meshRenderables[c].material.usesBlending || this.meshRenderables[c].material.usesRefraction || !this.meshRenderables[c].visible || this.meshRenderables[c].draw(this);
                    b.enable(b.POLYGON_OFFSET_FILL);
                    b.polygonOffset(1, 1);
                    b.colorMask(!1, !1, !1, !1);
                    for (c = 0; c < this.meshRenderables.length; ++c)
                        this.meshRenderables[c].drawAlphaPrepass(this);
                    b.colorMask(!0, !0, !0, !0);
                    b.disable(b.POLYGON_OFFSET_FILL);
                    b.depthFunc(b.LEQUAL);
                    b.depthMask(!1);
                    for (c = 0; c < this.meshRenderables.length; ++c)
                        this.meshRenderables[c].material.usesBlending && this.meshRenderables[c].visible && this.meshRenderables[c].draw(this);
                    b.disable(b.BLEND);
                    b.depthMask(!0);
                    b.depthFunc(b.LESS);
                    for (var d = !1, c = 0; c < this.meshRenderables.length; ++c)
                        if (this.meshRenderables[c].material.usesRefraction) {
                            d = !0;
                            break
                        }
                    if (d)
                        for (this.refractionSurface && this.refractionSurface.desc.width == a.color0.desc.width && this.refractionSurface.desc.height == a.color0.desc.height || (this.refractionSurface = new marmoset.Texture(b, a.color0.desc),
                            this.refractionSurface.loadArray(null, a.color0.format, a.color0.componentType),
                            this.refractionBuffer = new marmoset.Framebuffer(this.gl, {
                                color0: this.refractionSurface
                            })),
                            this.refractionBuffer.bind(),
                            this.postRender.blitTexture(a.color0),
                            a.bind(),
                            c = 0; c < this.meshRenderables.length; ++c)
                            this.meshRenderables[c].material.usesRefraction && this.meshRenderables[c].visible && this.meshRenderables[c].draw(this);
                    if (this.stripData.activeWireframe() && 0 < this.meshRenderables.length) {
                        for (c = 0; c < this.meshRenderables.length; ++c)
                            this.meshRenderables[c].visible && this.meshRenderables[c].drawWire(this);
                        b.depthMask(!0)
                    }
                    b.disable(b.BLEND)
                }
            }
            marmoset.WebViewer.prototype.drawScene = function (): void {
   
                if (!this.gl.isContextLost()) {
                    Pan3d.GlReset.saveBasePrarame(this.gl);
                    if (this.domRoot.clientWidth == this.canvas.clientWidth && this.domRoot.clientHeight == this.canvas.clientHeight) {
                    } else {
                        this.resize()
                    }
                
                    this.resize()
                    this.scene.view.size = [this.mainBuffer.width, this.mainBuffer.height];
                    this.scene.view.updateProjection();
                    this.scene.postRender.adjustProjectionForSupersampling(this.scene.view);
                    this.scene.collectShadows(this.mainBuffer);
                    this.mainBuffer.bind();
                    this.scene.draw(this.mainBuffer);
                    if (this.mainDepth) {
                        this.scene.postRender.present(this.mainColor, this.canvas.width, this.canvas.height, this.stripData.active());
               
                    }
                    Pan3d.GlReset.resetBasePrarame(this.gl);
                }



            }
        }
       
    }
}