/**
* 序列帧特效  ui
*/
module game.gui.component {
	export class EffectFrameUI implements IPoolsObject {
		poolName: string = 'EffectFrameUI';

		private _assetPath: string;
		private _textures: Texture[];
		private _centrePoints: Vector2[];
		private _total: number = 0;
		// 贴图加载器
		private _assetsLoader: AssetsLoader;

		centrePoint: Vector2;

		protected static _tempMix: Matrix;
		//根贴图编码
		get __ROOT_ID(): number {
			return this._texture ? this._texture["__ROOT_ID"] : 0;
		}

		// 特效启动时间 
		protected _startTime: number;
		// 每帧时长 (直接固定死)
		protected _frameTime: number = 83;
		// 帧数量
		protected _frameCount: number;
		// 获得特效的时长 
		protected _duration: number;
		// 当前帧
		protected _curFrameIndex: number;
		// 是否循环播放 注意：循环播放为true时，必须手工释放
		protected _loop: boolean;

		// 延迟时间
		private _delayTimer: number = 0;
		set delayTimer(v: number) {
			this._delayTimer = v;
			this._startTime = Laya.timer.currTimer + this._delayTimer;
		}

		//是否循环
		get loop():boolean{
			return this._loop;
		}

		setLoop(v: boolean) {
			this._loop = v;
		}

		// 碰撞信息
		private _hitRect: Rectangle;
		private _isMouseEnabled: boolean = false;
		setMouseEnabled(value: boolean): void {
			if (this._isMouseEnabled == value) return;
			this._isMouseEnabled = value;
			if (this._isMouseEnabled) {
				if (!this._hitRect) {
					this._hitRect = new Rectangle();
				}
			}
			else {
				this._hitRect = null;
			}
		}

		// 是否已经播放到末尾 
		isPlayEnd: boolean;

		anchorPosX: number = 0;
		anchorPosY: number = 0;

		protected _texture: Texture;
		protected _regX: number = 0;
		protected _regY: number = 0;
		protected _drawX: number;
		protected _drawY: number;
		protected _drawW: number;
		protected _drawH: number;
		protected _drawMix: Matrix;

		protected _scale: number = 1;

		protected _offsetX: number = 0;
		protected _offsetY: number = 0;

		protected _data: string;
		protected _startIdx: number = 0;
		protected _fps: number;
		protected _callBack: Function;

		constructor() {
			if (!EffectFrameUI._tempMix) {
				EffectFrameUI._tempMix = new Matrix();
			}
			this.reset();
			this._assetsLoader = new AssetsLoader();
			this.setAssetPath(PathConst.ui_effect);
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
			this._total = arg[0];
			this._fps = arg[1];
			this._callBack = arg.length > 2 ? arg[2] : null;
			this.setFps(this._fps);
			this.setAssetPath(PathConst.ui_effect);
		}

		/**
		 * 设置默认路径
		 * @param value 
		 */
		setAssetPath(value: string): void {
			this._assetPath = value;
		}

		// 设置数据
		setData(data: string, fps: number = 12, startIdx: number = 10000, dataFix: string = "", reverse: boolean = false): void {
			this._data = data;
			this._startIdx = startIdx;
			this.setFps(fps);
			this._assetsLoader.load(['res/atlas/' + this._assetPath + data + '.atlas'], Handler.create(this, this.onAssetsLoaded, [data, dataFix, startIdx, reverse]));
		}

		// 设置数据
		setFps(v: number) {
			this._fps = v;
			this._frameTime = Math.floor(1000 / v);
			this._startTime = Laya.timer.currTimer + this._delayTimer;
		}

		set scale(v: number) {
			this._scale = v;
		}

		// 设置偏移
		setOffset(x: number, y: number): void {
			this._offsetX = x;
			this._offsetY = y;
		}

		private onAssetsLoaded(data: string, dataFix: string = "", startIdx: number = 10000, reverse: boolean = false): void {
			this.setFrames(this._assetPath + data + '/' + dataFix + "{0}.png", startIdx, reverse)
		}

		setFrames(img: string, start: number = 0, reverse: boolean = false): void {
			let frames = PathConst.getSeqFrames(img, this._total, start, reverse);
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
			//判断播放时间是否结束，循环的除外
			if (!this._loop && (currTimer - this._startTime) >= this._duration) {
				this.isPlayEnd = true;
				this._callBack && this._callBack(this);//播完有回调的话
				return;
			}
			//获得无限完整动画循环之后剩余的时间
			let totalTime = this._frameTime * this._frameCount;
			var frameYu: number = (currTimer - this._startTime) % totalTime;
			//定位到帧位置
			this._curFrameIndex = MathU.parseInt(frameYu / this._frameTime);
			if (this._curFrameIndex >= this._frameCount) {
				this._curFrameIndex = this._frameCount - 1;
			}
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
		protected updateTransform(): void {
			let posX: number, posY: number;
			if (this.anchorPosX >= 0 && this.anchorPosY >= 0) {
				posX = this.anchorPosX;
				posY = this.anchorPosY;
			}
			this._drawX = posX + this._offsetX;
			this._drawY = posY + this._offsetY;
			if (this._texture) {
				this._drawW = this._texture.sourceWidth;
				this._drawH = this._texture.sourceHeight;
			}
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

		private updateHitRect(texture: Texture): void {
			if (!this._isMouseEnabled || !this._hitRect) return;
			let rect = this._hitRect;
			rect.setTo(0, 0, 0, 0);
			if (!texture) {
				return;
			}
			rect.width = texture.width * this._scale;
			rect.height = texture.height * this._scale;
			rect.x = this._drawX;
			rect.y = this._drawY;
		}

		// 设置数据(不打包)
		setDataFrames(data: string, loadArr: any, fps: number = 12, startIdx: number = 10000, dataFix: string = ""): void {
			this._data = data;
			this._startIdx = startIdx;
			this.setFps(fps);
			this._assetsLoader.load(loadArr, Handler.create(this, this.onAssetsLoadedFrame, [data, dataFix, startIdx]));
		}
		private onAssetsLoadedFrame(data: string, dataFix: string = "", startIdx: number = 10000): void {
			this.setFrames(this._assetPath + data + '/' + dataFix + "{0}.jpg", startIdx);
		}

		// 绘制
		onDraw(g: Graphics): void {
			if (!this._texture || this._startTime > Laya.timer.currTimer) {
				return;
			}
			this.updateTransform();
			// g.drawRect(this._drawX, this._drawY, this._drawW, this._drawH, "#000000");
			g.drawTexture(this._texture, this._drawX, this._drawY, this._drawW, this._drawH, this._drawMix);
			this.updateHitRect(this._texture);
			this._texture = null;
			this._drawMix = null;
		}

		/**
		 * 鼠标碰撞检测
		 */
		hitTest(xMouse: number, yMouse: number): boolean {
			if (this._isMouseEnabled && this._hitRect) {
				return this._hitRect.contains(xMouse, yMouse);
			}
			return false;
		}


		reset(): void {
			this.anchorPosX = 0;
			this.anchorPosY = 0;
			this._textures = null;
			this._centrePoints = null;
			this.centrePoint = null;
			this._total = 0;
			this._assetsLoader && this._assetsLoader.clear();
			this._loop = false;
			this.isPlayEnd = false;
			this._duration = 600000;
			this._startTime = 0;
			this._delayTimer = 0;
			this._frameCount = 0;
			this._curFrameIndex = 0;
			this._regX = 0;
			this._regY = 0;
			this._scale = 1;
			this._offsetX = 0;
			this._offsetY = 0;
			this._texture = null;
			this._drawMix = null;
			this._data = null;
			this._isMouseEnabled = false;
			this._hitRect = null;
			this._callBack = null;
			this._assetPath = "";
		}
	}
}