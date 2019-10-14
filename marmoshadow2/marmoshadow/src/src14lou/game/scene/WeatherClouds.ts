module game.scene{
	/**
	 * 云
	 */
	export class WeatherClouds extends WeatherBase {

		private _windDirection: number;			//风的方向
		private _groundSpacing: number;			//同种地表风沙的间隙
		private _groundOverlapping: number;		//地表风沙重叠间隙
		private _fadeOutAlpha: number;			//淡出alpha
		private _groundOffsetX: number;			//整体偏移X
		private _groundOffsetY: number;			//整体偏移Y
		private _canvasWidth: number;			//画布宽
		private _canvasHeight: number;			//画布高
		private _groundRowCount: number;			//数量定义:行 × 每行数量

		constructor(app: AppBase) {
			super(app);
			this._assetsLoader = new AssetsLoader();
			this._assetsLoader.load([Path.atlas_scene + "weather/clouds.atlas"], Handler.create(this, this.onResComplete));
		}

		protected onResComplete(): void {
			let path = 'scene/weather/clouds/'
			this.TEXTURES_SETTING = new Array<Texture>(4);
			this.TEXTURES_SETTING[0] = Laya.loader.getRes(path + '10001.png');												//地面0
			this.TEXTURES_SETTING[1] = Laya.loader.getRes(path + '10002.png');	//地面1
			this.TEXTURES_SETTING[2] = Laya.loader.getRes(path + '10003.png');	//空中0
			this.TEXTURES_SETTING[3] = Laya.loader.getRes(path + '10004.png');	//空中1

			//远景，中景，近景数量定义
			this.LEN_SETTING = new Array<number>(this.TEXTURES_SETTING.length);
			this.LEN_SETTING[0] = 2;
			this.LEN_SETTING[1] = 2;
			this.LEN_SETTING[2] = 4;
			this.LEN_SETTING[3] = 4;

			//远景，中景，近景速度定义
			this.SPEED_SETTING = new Array<number>(this.TEXTURES_SETTING.length);
			this.SPEED_SETTING[0] = 0.31;
			this.SPEED_SETTING[1] = 0.32;
			this.SPEED_SETTING[2] = 0.33;
			this.SPEED_SETTING[3] = 0.35;

			//设置
			this._lens = this.LEN_SETTING.concat();

			this._lens = this.SPEED_SETTING.concat();
			this._windDirection = Math.PI / 180 * 140;
			this._groundSpacing = 1600;
			this._groundOverlapping = 400;
			this._fadeOutAlpha = 1.0;

			super.enable();
		}

		/**
		 * 重置天气 
		 * @return 重置是否成功
		 */
		protected onReset(camera: game.scene.Camera): boolean {
			if (this.TEXTURES_SETTING) {
				//底层整体偏移
				this._groundOffsetX = -Math.max(this.TEXTURES_SETTING[0].width, this.TEXTURES_SETTING[3].width) * 2;
				this._groundOffsetY = -Math.max(this.TEXTURES_SETTING[0].height, this.TEXTURES_SETTING[3].height) * 2;
				//画布宽高
				this._canvasWidth = camera.bufferWidth - this._groundOffsetX;
				this._canvasHeight = camera.bufferHeight - this._groundOffsetY;
				var diagonal: number = MathU.getDistance(0, 0, this._canvasWidth, this._canvasHeight);//对角线
				this._groundRowCount = diagonal / this._groundOverlapping;
			}
			return super.onReset(camera);
		}

		/**设置素材显示数量*/
		protected setTextureLens(): number {
			this._lens[0] = MathU.parseInt((this._canvasWidth / this._groundSpacing) * this._groundRowCount * this._density);
			this._lens[1] = this._lens[0];
			this._lens[2] = 1;
			this._lens[3] = 1;
			return this._lens[0] + this._lens[1] + this._lens[2] + this._lens[3];
		}

		/**获取素材初始信息:x,y,scale,alpha,rnd*/
		protected getInitInfo(camera: game.scene.Camera, idxT: number, idxC: number): Array<number> {
			let offsetRow: number = (idxT == 0) ? 0 : (this._groundSpacing / 2 + 300);
			let x: number, y: number, rand: number;
			if (idxT == 0 || idxT == 1) {
				var distance: number = MathU.parseInt(idxC % this._groundRowCount) * this._groundOverlapping;//距离
				x = distance * Math.cos(this._windDirection);
				y = distance * Math.sin(this._windDirection);
				x += MathU.parseInt(idxC / this._groundRowCount) * this._groundSpacing + offsetRow; //x偏移量
				rand = 2 + Math.random() * 0.5;//随机尺寸
			} else {
				x = MathU.randomRange(-200, camera.bufferWidth);
				y = - 200;
				rand = 3;
			}
			return [camera.bufferLeft + x, camera.bufferTop + y, 1, this._fadeOutAlpha * 0.999, rand];
		}

		protected setQuadStartPos(quadID: number, x: number, y: number, rnd: number, disance: number = 0): void {
			let vec: Array<number> = this._startPosVector;
			vec[quadID * 4] = x;
			vec[quadID * 4 + 1] = y;
			vec[quadID * 4 + 2] = rnd;
			vec[quadID * 4 + 3] = disance;
		}


		protected onUpdate(scene:SceneRoot, g: Graphics): void {
			if (!this.isEnable) {
				return;
			}
			let camera = scene.camera;
			//得出持续时间
			var durationMS: number = Laya.timer.currTimer - this._startTime;
			var breadthTime: number = durationMS / 1000;

			//位置起点
			var quadID: number = 0;
			//初始化
			for (var imgId: number = 0; imgId < this._lens.length; imgId++) {
				//选择贴图
				let texture: Texture = this.TEXTURES_SETTING[imgId];

				//移动量
				var moveY: number = this.SPEED_SETTING[imgId] * durationMS;
				var moveX: number = moveY * -.8;

				//数量
				var count: number = this._lens[imgId];
				for (var i: number = 0; i < count; i++) {
					//速度
					var rnd: number = this.getQuadRnd(quadID);
					//震幅
					var breadth: number = Math.cos(breadthTime * rnd) * 10;
					var newX: number = this.getQuadStartX(quadID) - camera.bufferLeft + moveX + breadth;
					var newY: number = this.getQuadStartY(quadID) - camera.bufferTop + moveY;
					//循环的作用
					newX %= camera.bufferWidth + texture.width;
					newY %= camera.bufferHeight + texture.height;
					if (newX < 0) newX = camera.bufferWidth + newX;
					if (newY < 0) newY = camera.bufferHeight + newY;

					//设置新位置,绘制点
					g.drawTexture(texture, newX - texture.height, newY - texture.height);

					quadID++;
				}
			}
		}

		clear():void{
			this._assetsLoader.clear();
			super.clear();
		}
	}
}