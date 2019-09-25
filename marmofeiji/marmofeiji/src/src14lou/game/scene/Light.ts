/**
* 灯光
*/
module game.scene {
	export class LightBase {

		//是否启用
		protected _isEnable: Boolean = false;

		//素材
		protected _textTures: Array<Texture>;

		// 贴图加载器
		protected _assetsLoader: AssetsLoader;
		
		// 应用程序引用
		protected _app: AppBase;
		constructor(app: AppBase) {
			this._app = app;
		}

		/**
		 * 启用
		 */
		public enable(): void {
			this._isEnable = true;
		}

		/**
		 *  禁用
		 */
		public disable(): void {
			this._isEnable = false;
		}

		clear():void{
			this.disable();
			if(this._assetsLoader){
				this._assetsLoader.clear(true);
				this._assetsLoader = null;
			}
		}

		public onResComplete(): void {
		}

		/**
		 * 心跳 
		 */
		public onDraw(camera: game.scene.Camera, g: Graphics): void {
			//没添加到显示列表，则退出
			if(!this._isEnable){
				return;
			}
			if (!camera.bufferWidth || !camera.bufferHeight) return;
			this.onUpdate(camera, g);
		}

		/**
		 * 开始更新
		 */
		protected onUpdate(camera: game.scene.Camera, g: Graphics): void {
			logd("WeatherBase.onUpdate 没有被子类覆盖");
		}
	}

	// 蜡烛
	export class LightCandle extends LightBase {

		private _matrix: Matrix = new Matrix();
		private _scale: number = 0;
		private _scaleAdd: number = 0;
		private _black: string = "#000000";

		constructor(app: AppBase) {
			super(app);
			let assets = ["scene/light/light_lz1.png", "scene/light/light_lz2.png"];
			this._assetsLoader = new AssetsLoader();
			this._assetsLoader.load(assets, Handler.create(this, this.onResComplete));
		}

		public onResComplete(): void {
			//贴图集
			this._textTures = new Array<Texture>(1);
			let textTure: Texture = Laya.loader.getRes("scene/light/light_lz1.png");
			this._textTures[0] = Texture.createFromTexture(textTure, 1, 1, textTure.width - 2, textTure.height - 2);
			textTure = Laya.loader.getRes("scene/light/light_lz2.png");
			this._textTures[1] = Texture.createFromTexture(textTure, 1, 1, textTure.width - 2, textTure.height - 2);
			super.enable();
		}

		protected onUpdate(camera: game.scene.Camera, g: Graphics): void {
			this._scale += this._scaleAdd;
			if (!this._scale) {
				this._scale = 1.3;
			} else if (this._scale > 1.5) {
				this._scaleAdd = -0.005
			}
			else if (!this._scaleAdd || this._scale < 1.3) {
				this._scaleAdd = 0.005
			}

			let texture: Texture = this._textTures[0];
			let unit = this._app.sceneObjectMgr.mainUnit;
			let pos = unit.pos;
			let offsetY = 0;
			if (unit.userData instanceof AvatarBase) {
				offsetY = - unit.userData.headHeight / 2
			}

			let parseInt = MathU.parseInt;
			let drawW = parseInt(texture.width * this._scale);
			let drawH = parseInt(texture.sourceHeight * this._scale);

			let drawX = parseInt(camera.getScenePxByCellX(pos.x) - drawW / 2);
			let drawY = parseInt(camera.getScenePxByCellY(pos.y) - drawH / 2 + offsetY);
			let alpha: number = 0.5;
			g.drawTexture(texture, drawX, drawY, drawW, drawH, null, alpha);
			texture = this._textTures[1];

			g.drawTexture(texture, 0, 0, camera.width, drawY, null, alpha);
			g.drawTexture(texture, 0, drawY + drawH, camera.width, camera.height - drawY - drawH, null, alpha);
			g.drawTexture(texture, 0, drawY, drawX, drawH, null, alpha);
			g.drawTexture(texture, drawX + drawW, drawY, camera.width - drawX - drawW, drawH, null, alpha);
		}
	}
}