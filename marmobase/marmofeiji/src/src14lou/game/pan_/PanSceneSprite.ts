module pan {
    export class PanSceneSprite extends layapan.LayaInsideSprite {
        // 状态信息显示
        private _stat: Stat;

        constructor() {
            super();
            if (!layapan.LayaScene2dInit.isConfig) {
                layapan.LayaScene2dInit.initData();
            }
        }
        protected initData(): void {
            layapan.Pan3dInSideLaya.overrideMethods();
            this.init(null);
            this.scene = new PanScene();
            this.scene.ready = true
            this.addOther()
        }
        
        protected addOther(): void {
            var $other: layapan.OtherLayaRectSprite = new layapan.OtherLayaRectSprite();
            this.addChild($other);
        }
        public init(texture: Laya.Texture, vb: Array<any> = null, ib: Array<any> = null): void {
			// 保证customRender必定执行
			this.frameLoop(1, this, () => {
				this.graphics.clear();
				this.graphics.drawLine(0, 0, 1, 0, '#000');
                this._stat && this._stat.update();
			});
			this.customRenderEnable = true;
			this.customRender = (context: Laya.RenderContext, x: number, y: number) => {
                let webGLContext = context.ctx as Laya.WebGLContext2D;
                this._layaRenderIndex = webGLContext._submits._length;
			}
        }
        protected upFrame(): void {
            Pan3d.Scene_data.context3D.setWriteDepth(true);
            Pan3d.Scene_data.context3D.setDepthTest(true);
            Pan3d.TimeUtil.update();
            //设置为2D的镜头角度
            Pan3d.Scene_data.focus3D.rotationY = 0;
            Pan3d.Scene_data.focus3D.rotationX = -45
            Pan3d.Scene_data.cam3D.distance = 250;
            //这是是移动2D的基础坐标
            scene2d.CanvasPostionModel.getInstance().tureMoveV2d = new Pan3d.Vector2D(this.x, this.y)
            scene2d.CanvasPostionModel.getInstance().resetSize();

            Pan3d.Scene_data.context3D.renderContext.clear(Pan3d.Scene_data.context3D.renderContext.DEPTH_BUFFER_BIT);//重置深度
            Pan3d.MathClass.getCamView(Pan3d.Scene_data.cam3D, Pan3d.Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
            Pan3d.Scene_data.context3D._contextSetTest.clear();
            this.scene.upFrame();
        }

        showStat(): void {
            if (!this._stat) {
                let scene:PanScene = this.scene as PanScene;
                this._stat = new Stat(scene);
                scene.addFocueEvent(true);
            }
        }

        hideStat(): void {
            if (this._stat) {
                let scene:PanScene = this.scene as PanScene;
                this._stat.destroy();
                this._stat = null;
                scene.removeFocueEvent();
            }
        }

        destroy(destroyChild?: boolean): void {
            this.hideStat();
            this.customRenderEnable = false;
            super.destroy(destroyChild);
        }
    }

    class Stat {
        private _scene: PanScene;
        private _statSprite:Sprite;
        private _bgSprite:Sprite;
        private _statText:TextArea;
        constructor(v: PanScene) {
            this._scene = v;
            this._statSprite = new Sprite();
            this._bgSprite = new Sprite();
            this._bgSprite.alpha = .3;
            this._bgSprite.mouseEnabled = false;
            this._statSprite.addChild(this._bgSprite);
            this._statText = new TextArea();
            this._statText.color = '#FFFFFF';
            this._statText.autoSize = true;
            this._statText.editable = false;
            this._statText.mouseEnabled = false;
            this._statText.width = 150;
            this._statText.x = 10;
            this._statText.y = 10;
            this._statSprite.addChild(this._statText);
            this._statSprite.mouseEnabled = true;
            this._statSprite.on(LEvent.MOUSE_DOWN, this, this.onMouseDown);
			Laya.stage.on(LEvent.MOUSE_UP, this, this.onMouseUp);
            this._statSprite.x = (Laya.stage.width-170) / 2;
            this._statSprite.y = 120;//Laya.stage.height / 2;
            Laya.stage.addChild(this._statSprite);
        }

		private onMouseDown(e: LEvent): void {
			this._statSprite.startDrag();
            e.stopPropagation();
		}
		private onMouseUp(e: LEvent): void {
			this._statSprite.stopDrag();
		}


        update(): void {
            let scene = this._scene;

            let text:string = 'cam3D.distance：' + scene.camDistance;
            text += '\r\nfocus3D.rotationX：' + scene.focus3D.rotationX;
            text += '\r\nfocus3D.rotationY：' + scene.focus3D.rotationY;
            text += '\r\nfocus3D.rotationZ：' + scene.focus3D.rotationZ;
            text += '\r\nfocus3D.x：' + scene.focus3D.x;
            text += '\r\nfocus3D.y：' + scene.focus3D.y;
            text += '\r\nfocus3D.z：' + scene.focus3D.z;
            this._statText.text = text;
            

            let w = this._statText.width + 20;
            let h = this._statText.height + 20;
            this._statSprite.width = w;
            this._statSprite.height = h;
            this._bgSprite.graphics.clear();
            this._bgSprite.graphics.drawRect(0, 0, w, h, '#000')
        }

        destroy(): void {
            Laya.stage.off(LEvent.MOUSE_UP, this, this.onMouseUp);
            this._statSprite.destroy(true);
        }
    }

}