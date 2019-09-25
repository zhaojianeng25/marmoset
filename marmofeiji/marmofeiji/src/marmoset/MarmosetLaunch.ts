module mars3D {
    import LoadManager = Pan3d.LoadManager
    import Browser = Laya.Browser;
    import Stage = Laya.Stage;

    import LayaGame2dDemo = LayaPan3D.LayaGame2dDemo;
    export class MarmosetLaunch {
        private _canvas: HTMLCanvasElement;
        get canvas(): HTMLCanvasElement {
            return this._canvas;
        }
        constructor() {
            this.init()
        }
 
     

        private init(): void {
          

            this._canvas = Laya.init(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio, Laya.WebGL);
            Laya.stage.alignV = Stage.ALIGN_LEFT;
            Laya.stage.alignH = Stage.ALIGN_TOP;

            Laya.stage.scaleMode = "full"
            Laya.stage.bgColor = "#232628";

  



            Pan3d.Scene_data.ossRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/";
            Pan3d.Scene_data.fileuiRoot = "res/";
            Pan3d.Scene_data.fileRoot = Pan3d.Scene_data.ossRoot + "baseedit/";



            Pan3d.Engine.init(this._canvas);


            var topBox: Laya.Box = new Laya.Box()
            Laya.stage.addChild(topBox)

            var midBox: Laya.Box = new Laya.Box()
            Laya.stage.addChild(midBox)




            var picA: Laya.Image = new Laya.Image("res/ui/icon/lyf_64x.png");
            Laya.stage.addChild(picA)
            picA.scale(0.5, 0.5)
            picA.pos(0, 0)

            console.log(layapan_me.LayaSceneChar)
 

            var spriteD: Marmoset3dScene = new Marmoset3dScene("res/ui/icon/512b.jpg", () => {
                spriteD.scale(1.2, 1.2*(4/5))
            })
            Laya.stage.addChild(spriteD);
            spriteD.pos(100, 350);


            Laya.stage.frameLoop(1, this, () => {
                Pan3d.TimeUtil.update()
            })
     
        }


  
        public static initCanvas($caves: HTMLCanvasElement): void {

            new MarmosetLaunch();


        }


    }


}