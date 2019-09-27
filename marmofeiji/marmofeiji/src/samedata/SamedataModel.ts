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
        private static drawRenderSprite: DrawRenderSprite;
        private static initmosort(): void {
            window["webgl"] = Pan3d.Scene_data.context3D.renderContext
            mars3D.MarmosetModel.getInstance().initData();
           


            this.drawRenderSprite = new DrawRenderSprite();

            var _samePicSprite: BaseCavanRectSprite = new BaseCavanRectSprite;
            _samePicSprite.otherSprite = this.drawRenderSprite;
            SceneManager.getInstance().addDisplay(new SamePicSprite);
            SceneManager.getInstance().addDisplay(_samePicSprite);



            SceneManager.getInstance().ready = true

            MarmosetModel.getInstance().viewFileName = "karen1.mview"
            var rootpath: string = "pan/marmoset/feiji/6_14/";
            LoadManager.getInstance().load(Scene_data.fileuiRoot + rootpath + "outshder.txt", LoadManager.XML_TYPE, (outstr: any) => {
                MarmosetModel.changerOutshader = outstr
                LoadManager.getInstance().load(Scene_data.fileuiRoot + rootpath + "vshader.txt", LoadManager.XML_TYPE, (vstr: any) => {
                    MarmosetModel.changerVshader = vstr
                    LoadManager.getInstance().load(Scene_data.fileuiRoot + rootpath + "fshader.txt", LoadManager.XML_TYPE, (fstr: any) => {
                        MarmosetModel.changerFshader = fstr
                        marmoset.embed("res/" + MarmosetModel.getInstance().viewFileName, { width: 256, height: 256, autoStart: true, fullFrame: false, pagePreset: false });
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
            SamedataModel.upFrame()
        }
        public static upDataLightShadow(): void {
            this.drawRenderSprite.update()
 

        }
        private static upFrame(): void {
            this.upDataLightShadow();
            Pan3d.TimeUtil.update();
            Pan3d.Engine.resetSize()
            Pan3d.Scene_data.context3D.update();
            let gl = Pan3d.Scene_data.context3D.renderContext
            gl.clearColor(255 / 255, 0, 0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
            win.LayerManager.getInstance().update();

            SceneManager.getInstance().update()
 

        }

    }
}