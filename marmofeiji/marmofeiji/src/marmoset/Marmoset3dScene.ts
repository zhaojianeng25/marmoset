
module mars3D {
    import Vector2D = Pan3d.Vector2D
    import Object3D = Pan3d.Object3D
    import MouseType = Pan3d.MouseType
    import LineDisplayShader = Pan3d.LineDisplayShader
    import GridLineSprite = Pan3d.GridLineSprite
    import Camera3D = Pan3d.Camera3D
    import Rectangle = Pan3d.Rectangle
    import LoadManager = Pan3d.LoadManager
    import ProgrmaManager = Pan3d.ProgrmaManager
    import Scene_data = Pan3d.Scene_data
 

    import EdItorSceneManager = maineditor.EdItorSceneManager;

    import Laya3dSprite = LayaPan3D.Laya3dSprite;
     
    import LayaSceneChar = layapan_me.LayaSceneChar;
 
  
    export class Marmoset3dScene extends Laya3dSprite {

        public constructor(value: string, bfun: Function = null) { //"res/ui/icon/512.jpg"
            super(value, bfun)
            this.addEvents();

            MarmosetModel.getInstance().initData();
            MarmosetModel.getInstance().viewFileName = "karen1.mview"

            var rootpath: string = "pan/marmoset/feiji/6_14/";
            LoadManager.getInstance().load(Scene_data.fileuiRoot + rootpath+"outshder.txt", LoadManager.XML_TYPE, (outstr: any) => {
                MarmosetModel.changerOutshader = outstr
                LoadManager.getInstance().load(Scene_data.fileuiRoot + rootpath +"vshader.txt", LoadManager.XML_TYPE, (vstr: any) => {
                    MarmosetModel.changerVshader = vstr
                    LoadManager.getInstance().load(Scene_data.fileuiRoot + rootpath +"fshader.txt", LoadManager.XML_TYPE, (fstr: any) => {
                        MarmosetModel.changerFshader = fstr
                        marmoset.embed("res/" + MarmosetModel.getInstance().viewFileName, { width: 500, height: 400, autoStart: true, fullFrame: false, pagePreset: false });
                    });

                });
            });
 
        }


        private mianpian: PicShowDiplay3dSprite
        protected initScene(): void {
            ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
            this.sceneManager = new EdItorSceneManager()
   
            this.sceneManager.addDisplay(new GridLineSprite())
    
   

            this.mianpian = new PicShowDiplay3dSprite()
            this.mianpian.scale = 2;
            this.sceneManager.addDisplay(this.mianpian)



            this.sceneManager.ready = true;
            this.sceneManager.cam3D = new Camera3D();
            this.sceneManager.cam3D.cavanRect = new Rectangle(0, 0, 512, 512)
            this.sceneManager.cam3D.distance = 200;
            this.sceneManager.focus3D.rotationY = random(360);
            this.sceneManager.focus3D.rotationX = -45;

        }
        private addBaseChar(): void {
            var $baseChar: LayaSceneChar = new LayaSceneChar();
            $baseChar.setRoleUrl(getRoleUrl("5103"));
            this.sceneManager.addMovieDisplay($baseChar);
        }
        protected addEvents(): void {
            this.on(MouseType.MouseDown, this, this.onStartDrag);
            this.on(MouseType.MouseWheel, this, this.onMouseWheel);
            Laya.stage.on(MouseType.MouseUp, this, this.onMouseUp);
            Laya.stage.on(MouseType.MouseMove, this, this.onMouseMove);
            Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onStageKeyDonw);
        }
        private onStageKeyDonw(evt: Laya.Event): void {

 
            if (evt.keyCode == Pan3d.KeyboardType.F) {

                MarmosetModel.getInstance().upFileToSvever()
            }
            if (evt.keyCode == Pan3d.KeyboardType.G) {

                MarmosetModel.getInstance().upObjDataToSever()
            }

        }
    
      
        private onMouseWheel(e: any): void {
            this.sceneManager.cam3D.distance += e.delta
        }
        private lastMouseVec2d: Vector2D;
        private lastfocus3D: Object3D;
        private dragRegion: Laya.Rectangle;
        private onStartDrag(e: Event): void {
            if (this.mouseY < 30) {
                this.startDrag(this.dragRegion, true, this.height * 0.2);
            } else {
                this.lastMouseVec2d = new Vector2D(this.mouseX, this.mouseY)
                this.lastfocus3D = new Object3D()
                this.lastfocus3D.rotationY = this.sceneManager.focus3D.rotationY
                this.lastfocus3D.rotationX = this.sceneManager.focus3D.rotationX

    
            }

        }

        private selectId: number=0
        private onMouseUp(e: Event): void {
            this.lastMouseVec2d = null
            var len: number = MarmosetModel.getInstance().textureItem.length
            if (this.mianpian._uvTextureRes && len) {
 
                this.mianpian._uvTextureRes.texture = MarmosetModel.getInstance().textureItem[this.selectId % len]

                this.selectId++
            }

        }
        private onMouseMove(e: Event): void {

            if (this.lastMouseVec2d) {
                this.sceneManager.focus3D.rotationY = this.lastfocus3D.rotationY - (this.mouseX - this.lastMouseVec2d.x)
                this.sceneManager.focus3D.rotationX = this.lastfocus3D.rotationX - (this.mouseY - this.lastMouseVec2d.y) / 10

            }
        }
 
     
        public upDataLightShadow(): void {
            if (!MarmosetLightVo.marmosetLightVo) {
                if (window["uShadowMatrices"]) {
                    MarmosetLightVo.marmosetLightVo = new MarmosetLightVo();
                }
            } else {
                MarmosetLightVo.marmosetLightVo.update(MarmosetModel.meshItem);
            }
        }

        public upData(): void {
            if (this.sceneManager) {
                this.upDataLightShadow();
                Pan3d.MathClass.getCamView(this.sceneManager.cam3D, this.sceneManager.focus3D); //一定要角色帧渲染后再重置镜头矩阵
                super.upData();
            }

        }

    }
}