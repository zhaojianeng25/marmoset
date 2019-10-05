/**
* 序列帧特效 
*/
module game.scene {
	export class EffectFrame extends Effect implements IPoolsObject {
	
		poolName: string = 'EffectFrame';

		private _assetPath:string;
		private _textures: Texture[];
		private _centrePoints: Vector2[];
		private _total: number = 0;
		// 贴图加载器
		private _assetsLoader: AssetsLoader;

		centrePoint: Vector2;

		constructor() {
			super();
			this._assetsLoader = new AssetsLoader();
			this.setAssetPath(PathConst.scene_sf);
		}

		/**
		 * 进池 （相当于对象dispose函数）
		 */
		intoPool(...arg): void {
			this.reset();
		}
		/**
		 * 出池 （相当于对象初始化函数）
		 */
		outPool(...arg): void {
			this.setAssetPath(PathConst.scene_sf);
			this._total = arg[0];
			this._fps = arg[1];
			this.setFps(this._fps);
		}

		setAssetPath(value):void{
			this._assetPath = value;
		}

		// 设置数据
		setData(data: string, fps: number = 12,dataFix:string="",start:number=10000): void {
			super.setData(data, fps);
			this._assetsLoader.load(['res/atlas/' + this._assetPath + data + '.atlas'], Handler.create(this, this.onAssetsLoaded, [data,dataFix,start]));
		}

		private onAssetsLoaded(data: string,dataFix:string="",start:number=10000): void {
			this.setFrames(this._assetPath + data + '/'+ dataFix + "{0}.png", start)
		}

		setFrames(img: string, start: number = 0): void {
			let frames = PathConst.getSeqFrames(img, this._total, start);
			let empty: boolean = true;
			this._textures = [];
			for (let i = 0; i < frames.length; i++) {
				let texture = Loader.getRes(frames[i]) as Texture;
				if (texture) {
					empty = false;
					if (!this.centrePoint) {
						// 没有设置中心点的话默认首张图的中心点为特效中心点
						this.centrePoint = new Vector2();
						this.centrePoint.x = - texture.sourceWidth / 2;
						this.centrePoint.y = - texture.sourceHeight / 2;
					}
				}
				this._textures.push(Loader.getRes(frames[i]));
			}
			if (empty) {
				this.isPlayEnd = true;
			}
			else {
				this._frameCount = this._textures.length;
				this._duration = this._frameCount * this._frameTime;
			}
		}

		updateTexture(): void {
			let currTimer = Laya.timer.currTimer;
			if (this._startTime > currTimer) {
				return;
			}
			if (!this._textures) {
				// 没有数据
				return;
			}
			super.updateTexture();
			if (this.isPlayEnd) {
				return;
			}
			this._texture = this._textures[this._curFrameIndex];
			let point: Vector2;
			this._centrePoints && (point = this._centrePoints[this._curFrameIndex]);
			if (point) {
				this._regX = point.x;
				this._regY = point.y;
			}
			else {
				this._regX = this.centrePoint.x;
				this._regY = this.centrePoint.y;
			}
		}

		// 更新变换信息
		protected updateTransform(camera: Camera): void {
			super.updateTransform(camera);
			if (this._scale == 1) {
				this._drawX += this._regX;
				this._drawY += this._regY;
			}
			else {
				this._drawW = this._drawW * this._scale;
				this._drawH = this._drawH * this._scale;
				this._drawX += this._regX * this._scale;
				this._drawY += this._regY * this._scale;
			}
		}

		// 绘制
		onDraw(g: Graphics, camera: Camera): void {
			if (!this._texture || this._startTime > Laya.timer.currTimer) {
				return;
			}
			this.updateTransform(camera);
			g.drawTexture(this._texture, this._drawX, this._drawY, this._drawW, this._drawH, this._drawMix);
			this._texture = null;
			this._drawMix = null;
		}

		reset(): void {
			this._textures = null;
			this._centrePoints = null;
			this.centrePoint = null;
			this._total = 0;
			this._assetsLoader && this._assetsLoader.clear();
			super.reset();
		}
	}
}