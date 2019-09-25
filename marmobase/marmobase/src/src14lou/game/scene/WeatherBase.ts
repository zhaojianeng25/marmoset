/**
* name 
*/
module game.scene {
	export class WeatherBase {
		static LOCK_RESET = false;
		//密度
		protected _density: number;
		//重置标记
		protected _snowResetFlag: Boolean = false;

		//起始位置数组
		protected _startPosVector: Array<number>;
		//起始时间
		protected _startTime: number;
		//是否启用
		protected isEnable: Boolean = false;

		//素材
		protected TEXTURES_SETTING: Array<Texture>;
		//种类数量
		protected _lens: Array<number>;
		//种类数量
		protected LEN_SETTING: Array<number>;
		//种类速度
		protected SPEED_SETTING: Array<number>;

		// 贴图加载器
		protected _assetsLoader: AssetsLoader;

		protected setQuadStartPos(quadID: number, x: number, y: number, rnd: number, disance: number = 0): void {
			let vec: Array<number> = this._startPosVector;
			vec[quadID * 4] = x;
			vec[quadID * 4 + 1] = y;
			vec[quadID * 4 + 2] = rnd;
			vec[quadID * 4 + 3] = disance;
		}

		protected setQuadStartPos2(quadID: number, x: number, y: number): void {
			let vec: Array<number> = this._startPosVector;
			vec[quadID * 4] = x;
			vec[quadID * 4 + 1] = y;
		}


		protected getQuadStartX(quadID: number): number {
			return this._startPosVector[quadID * 4];
		}


		protected getQuadStartY(quadID: number): number {
			return this._startPosVector[quadID * 4 + 1];
		}


		protected getQuadRnd(quadID: number): number {
			return this._startPosVector[quadID * 4 + 2];
		}


		protected getQuadDisance(quadID: number): number {
			return this._startPosVector[quadID * 4 + 3];
		}

		// 应用程序引用
		protected _app: AppBase;
		constructor(app: AppBase) {
			this._app = app;
		}

		protected onResComplete(): void {
		}

		/**
		 * 启用天气 
		 * 
		 */
		public enable(): void {
			this.isEnable = true;
			//立刻重置
			this._snowResetFlag = true;
		}

		/**
		 *  禁用天气
		 * 
		 */
		public disable(): void {
			this.isEnable = false;
			//不再重置
			this._snowResetFlag = false;
		}

		clear():void{
			this.disable();
			if(this._assetsLoader){
				this._assetsLoader.clear(true);
				this._assetsLoader = null;
			}
		}

		/**
		 * 重置天气 
		 * @return 重置是否成功
		 * 
		 */
		protected onReset(camera: game.scene.Camera): boolean {
			//如果地图不存在，则退出初始化
			if (!this.TEXTURES_SETTING || !this.TEXTURES_SETTING[0]) return false;
			//可以重置咯
			this._snowResetFlag = false;

			//设置起始时间
			this._startTime = Laya.timer.currTimer;
			//摄像机
			//根据屏幕面积来设定雪花比率
			this._density = (camera.bufferWidth * camera.bufferHeight) / (1920 * 1080);

			//总数
			var makeCount: number = this.setTextureLens(camera);

			//位置数组
			this._startPosVector = new Array<number>(makeCount * 4);
			//位置起点
			var quadID: number = 0;
			//初始化
			for (var imgId: number = 0; imgId < this.TEXTURES_SETTING.length; imgId++) {
				//数量
				var count: number = this._lens[imgId];
				for (var i: number = 0; i < count; i++) {

					let info = this.getInitInfo(camera, imgId, i);
					//保存起始位置
					this.setQuadStartPos(quadID, info[0], info[1], info[4]);
					quadID++;
				}
			}
			// logd("[WeatherLayer] 重置，粒子数量:", makeCount, "远中近分别：", this._lens);
			return true;
		}

		/**设置素材显示数量*/
		protected setTextureLens(camera: game.scene.Camera): number {
			var makeCount: number = 0;
			for (let j: number = 0; j < this.LEN_SETTING.length; j++) {
				//根据屏幕面积密度新设置数量
				this._lens[j] = MathU.parseInt(this.LEN_SETTING[j] * this._density);
				//累计数量
				makeCount += this._lens[j];
			}
			return makeCount;
		}

		/**获取素材初始信息:x,y,scale,alpha,rnd*/
		protected getInitInfo(camera: game.scene.Camera, idxT: number, idxC: number): Array<number> {
			var newX: number = MathU.randomRange(camera.bufferLeft, camera.bufferRight);
			var newY: number = MathU.randomRange(camera.bufferTop, camera.bufferBottom);
			return [newX, newY, 1, 1, Math.random()];
		}

		/**
		 * 心跳 
		 * 
		 */
		onDraw(scene:SceneRoot, g: Graphics): void {
			if(!this.isEnable){
				return;
			}
			let camera = scene.camera;
			//没添加到显示列表，则退出
			if (!camera.bufferWidth || !camera.bufferHeight || isNaN(camera.bufferTop)
				|| isNaN(camera.bufferBottom) || isNaN(camera.bufferLeft) || isNaN(camera.bufferRight)) return;

			//有重置标记
			if (this._snowResetFlag || (!WeatherBase.LOCK_RESET && camera.isResize)) {
				//初始化不成功则退出
				if (!this.onReset(camera)) return;
			}

			this.onUpdate(scene, g);
		}

		/**
		 * 开始更新
		 * 
		 */
		protected onUpdate(scene:SceneRoot, g: Graphics): void {
			logd("WeatherBase.onUpdate 没有被子类覆盖");
		}
	}
}