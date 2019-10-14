/**
* name 
*/
module game.scene {
	export class MapPartLayer extends game.scene.MapLayer {
		/**
		 * 缩略图比例 
		 */
		public static THUM_RADIO: number = 10;

		//轮询检查地图切片时间间隔
		private static INTERVAL_TIME: number = 1000;
		//释放时间
		private static EXPIRATION_TIME: number = 2000;
		/*地图切片*/
		private _mapParts: Object = new Object();
		//路径格式
		private _urlFormat: string;
		//缩略图
		private _thumb: Texture;
		//最后一次检查地图切片时间
		private _lastCheckMapPartTime: number;
		/*最后系统标记*/
		private _lastSysFrameFlag: number;
		//是否最优先
		private _highestPriority: boolean;
		//是否需要排序
		private _needSort: boolean = true;
		//是否所有素材都加载完毕
		protected _isNoAction: boolean = false;

		/**
		 * 所有素材加载完毕 
		 * @return 
		 * 
		 */
		public get isNoAction(): boolean {
			return this._isNoAction;
		}

		/**
		 * 路径格式
		 * @return 
		 * 
		 */
		public get urlFormat(): String {
			return this._urlFormat;
		}


		constructor(app: AppBase) {
			super(app);
		}

		/**
		 * 初始化 
		 * @param lx 层位置x
		 * @param lx 层位置y
		 * @param lw 层总宽度
		 * @param lh 层总高度
		 * @param urlFormat 下载mappart的url格式
		 * @param thumb 总缩略图
		 * 
		 */
		public initMapPartLayer(lx: number, ly: number, lw: number, lh: number, urlFormat: string, thumb: Texture): void {
			super.init(lx, ly, lw, lh, MapPart.mapPartWidth, MapPart.mapPartHeight);
			this._urlFormat = urlFormat;
			let r: number = MapPartLayer.THUM_RADIO;
			if (thumb)
				this._thumb = Texture.createFromTexture(thumb, lx / r, ly / r, lw / r, lh / r);
		}

		public update(): void {
			//检查地图
			this.checkMapPart();
			super.update();

		}

		//检测地图切片是否释放
		private checkMapPart(): void {
			//时间在检测间隔内，则退出
			if ((Laya.timer.currTimer - this._lastCheckMapPartTime) < MapPartLayer.INTERVAL_TIME) {
				return;
			}
			//重置时间
			this._lastCheckMapPartTime = Laya.timer.currTimer;

			//开始检查
			for (var key in this._mapParts) {
				if (this._mapParts.hasOwnProperty(key)) {
					var mp = this._mapParts[key] as MapPart;
					//超过默认15秒过期时间，则释放
					if ((Laya.timer.currTimer - mp.lastVisiTime) > MapPartLayer.EXPIRATION_TIME) {
						mp.clear(false);
						delete this._mapParts[mp.key];
					}
				}
			}
		}

		//绘制
		protected onBeforDraw(): void {
			super.onBeforDraw();
			this.graphics.clear();
		}

		protected onAtferDrow(): void {
			super.onAtferDrow();
		}

		/**
		 * 每个格子循环到达时都触发 
		 * @param tx 单元格子x
		 * @param ty 单元格子y
		 * @param tpx 新的格子坐标x
		 * @param tpy 新的格子坐标y
		 * @param sysFrameFlag 帧标记
		 * 
		 */
		protected onCellEach(tx: number, ty: number, tpx: number, tpy: number): void {
			var src: MapPart = this.getMapPart(tx, ty);
			//保持访问
			src.lastVisiTime = Laya.timer.currTimer;

			//开始绘制
			if (src.texture) {
				this.graphics.drawTexture(src.texture, tpx, tpy);
			} else if (src.thumTexture) {
				this.graphics.drawTexture(src.thumTexture, tpx, tpy, MapPart.mapPartWidth, MapPart.mapPartHeight);
			}

		}

		/**
		 * 获得地图切片
		 * @param x 切片x
		 * @param y 切片y
		 * @return 
		 * 
		 */
		public getMapPart(x: number, y: number): MapPart {
			var key: number = (x << 6) + y;
			var mapPart: MapPart = this._mapParts[key];
			if (!mapPart) {
				//先搞定缩略图
				var th: Texture
				if (this._thumb) {
					th = Texture.createFromTexture(this._thumb,
						x * MapPart.mapPartWidth / MapPartLayer.THUM_RADIO, 	//x
						y * MapPart.mapPartHeight / MapPartLayer.THUM_RADIO, 		//y
						MapPart.mapPartWidth / MapPartLayer.THUM_RADIO,  			//width
						MapPart.mapPartHeight / MapPartLayer.THUM_RADIO);			//height
				}

				//获取素材路径
				var url: string = game.utils.StringU.substitute(this._urlFormat, x, y);
				//构造地图切片
				mapPart = new MapPart(th, url, key);
				this._mapParts[key] = mapPart;
			}
			mapPart.lastVisiTime = Laya.timer.currTimer;
			return mapPart;
		}


		//清理资源
		clear(): void {
			//清理地图切片
			for (var key in this._mapParts) {
				if (this._mapParts.hasOwnProperty(key)) {
					var mp: MapPart = this._mapParts[key];
					if (mp) {
						mp.clear(true);
					}
					delete this._mapParts[key];
				}
			}
			super.clear();
		}

		destroy(destroyChild?: boolean): void {
			this.clear();
			super.destroy(destroyChild);
		}
	}
}