module same {
    import Scene_data = Pan3d.Scene_data;
    import LoadManager = Pan3d.LoadManager;
    import SceneManager = Pan3d.SceneManager;
    import MarmosetModel = mars3D.MarmosetModel;
    import MarmosetLightVo = mars3D.MarmosetLightVo;
    import SamePicSprite = same.SamePicSprite;

    export class SamedataModel {
        public static initCanvas($caves: HTMLCanvasElement): void {
            mainpan3d_me.canvas = $caves;
            Pan3d.Scene_data.fileRoot = "res/";
            Pan3d.Engine.init($caves);
            window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
            if (requestAnimationFrame) {
                requestAnimationFrame(SamedataModel.step);
            }
            SamedataModel.resetSize();
            this.initmosort()
        }
        private static overrideFunUpData(): void {
            marmoset.WebViewer.prototype.update = function () {
                var a = this.scene.sceneAnimator && !this.scene.sceneAnimator.paused;
                if (0 < this.sleepCounter || this.ui.animating() || a || this.stripData.animationActive) {
                    this.stripData.update();
                    this.ui.animate();
                    this.scene.update();
                    this.drawScene();
                    this.requestFrame(this.update.bind(this));
                }
                a ? this.scene.postRender.discardAAHistory() : this.sleepCounter--
                SamedataModel.upFrame()
         
            }

            let marmosetFun = function (fun: Function, ...args): any {
                let v = fun.apply(this, args);
                return v;
            }
    
            let context3DupDate = Pan3d.Context3D.prototype.update
            Pan3d.Context3D.prototype.update = function () {
                marmosetFun.call(this, context3DupDate)
                this.renderContext.frontFace(this.renderContext.CCW);
            }
          

        }
        private static drawRenderSprite: DrawRenderSprite;
        private static initmosort(): void {
            window["webgl"] = Pan3d.Scene_data.context3D.renderContext
            mars3D.MarmosetModel.getInstance().initData();
            this.overrideFunUpData()
          //  this.addBaseRectSprite()
         //   this.addInsetMarmosetSprite()
            this.drawRenderSprite = new DrawRenderSprite();
            SceneManager.getInstance().addDisplay(new samepan.SamePanSprite());

            var _samePicSprite: BaseCavanRectSprite = new BaseCavanRectSprite;
            SceneManager.getInstance().addDisplay(_samePicSprite);
          SceneManager.getInstance().addDisplay(new sameshadow.BaseShadowSprite());



            SceneManager.getInstance().ready = true

            MarmosetModel.getInstance().viewFileName = "karen1.mview"
            var rootpath: string = "pan/marmoset/feiji/6_14/";
            LoadManager.getInstance().load(Scene_data.fileuiRoot + rootpath + "outshder.txt", LoadManager.XML_TYPE, (outstr: any) => {
                MarmosetModel.changerOutshader = outstr
                LoadManager.getInstance().load(Scene_data.fileuiRoot + rootpath + "vshader.txt", LoadManager.XML_TYPE, (vstr: any) => {
                    MarmosetModel.changerVshader = vstr
                    LoadManager.getInstance().load(Scene_data.fileuiRoot + rootpath + "fshader.txt", LoadManager.XML_TYPE, (fstr: any) => {
                        MarmosetModel.changerFshader = fstr
                        marmoset.embed("res/" + MarmosetModel.getInstance().viewFileName, { width: 400, height: 300, autoStart: true, fullFrame: false, pagePreset: false });
                    });

                });
            });


        }

        public static resetSize(): void {
            if (mainpan3d_me.canvas) {
                mainpan3d_me.canvas.width = document.body.clientWidth
                mainpan3d_me.canvas.height = document.body.clientHeight
                Pan3d.Engine.resetSize(mainpan3d_me.canvas.width, mainpan3d_me.canvas.height); //设置canvas大小
                win.LayerManager.getInstance().resize();

            }
        }
        private static step(timestamp): void {
            requestAnimationFrame(SamedataModel.step);
      
        }
        public static upDataLightShadow(): void {
            this.drawRenderSprite.update()
 

        }

        private static addBaseRectSprite(): void {
            window["baseRect"] = new BaseSametRectSprite();
            Pan3d.TextureManager.getInstance().getTexture(Scene_data.fileuiRoot + "256.jpg", (a: Pan3d.TextureRes) => {
                window["baseRect"]._uvTextureRes = a;

            });
  
            window["baseRectSprite"] = new dis.BaseRectSprite();
            Pan3d.TextureManager.getInstance().getTexture(Scene_data.fileuiRoot + "256.jpg", (a: Pan3d.TextureRes) => {
                window["baseRectSprite"]._uvTextureRes = a;
            });
 

        }
        private static addInsetMarmosetSprite(): void {
            window["InsetMarmosetSprite"] = new mars3D.InsetMarmosetSprite();

        }
        private static upFrame(): void {
             
            this.upDataLightShadow();
            Pan3d.TimeUtil.update();
            Pan3d.Engine.resetSize()
            Pan3d.Scene_data.context3D.update();
            let gl = Pan3d.Scene_data.context3D.renderContext
            gl.clearColor(255 / 255, 0, 0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
          
    
       
            SceneManager.getInstance().update()

       
          
            if (window["baseRect"]) {
                window["baseRect"].update();
            }


        }

    }
}