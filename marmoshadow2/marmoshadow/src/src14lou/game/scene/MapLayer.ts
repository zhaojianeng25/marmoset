/**
* name 
*/
module game.scene {

	export class MapLayer extends Laya.Sprite {

		/**
		 * 层总宽度 
		 */
		protected _layerRect: Rectangle = new Rectangle();

		/**
		 * 层级视口区域
		 */
		protected _viewPort: Rectangle;

		/**
		 * 单元格宽度和高度 
		 */
		private _cellWidth: number;
		private _cellHeight: number;


		// 应用程序引用
		protected _app: AppBase;
		constructor(app: AppBase) {
			super();
			this._app = app;
			this._viewPort = new Rectangle();
		}

		/**
		 * 初始化 
		 * @param lw 层总宽度
		 * @param lh 层总高度
		 * @param urlFormat 下载mappart的url格式
		 * @param thumb 总缩略图
		 * 
		 */
		protected init(x: number, y: number, lw: number, lh: number, cellWidth: number, cellHeight: number): void {
			this._layerRect.x = x;
			this._layerRect.y = y;
			this._layerRect.width = lw;
			this._layerRect.height = lh;
			this._cellWidth = cellWidth;
			this._cellHeight = cellHeight;
		}

		/**
		 * 设置视口大小 
		 * @param pwidth
		 * @param pheight
		 * 
		 */
		public setViewPort(pX: number, pY: number, pwidth: number, pheight: number): void {
			if (pX != this._viewPort.x || pY != this._viewPort.y) {
				this._viewPort.x = pX;
				this._viewPort.y = pY;
			}

			if (pwidth != this._viewPort.width || pheight != this._viewPort.height) {
				this._viewPort.width = pwidth;
				this._viewPort.height = pheight;
			}
		}

		/**
		 * 通过摄像机设置窗口位置
		 * @param camera
		 * 
		 */
		public setViewPortByCamera(camera: Camera): void {
			this.setViewPort(camera.bufferLeft, camera.bufferTop, camera.bufferWidth, camera.bufferHeight);
		}

		/**
		 * 设置层级的坐标 
		 * @param newX 新位置x
		 * @param newY 新位置y
		 * 
		 */
		public setLayerLocation(newX: number, newY: number): void {
			if (this._layerRect.x == newX && this._layerRect.y == newY) return;
			this._layerRect.x = newX;
			this._layerRect.y = newY;
		}

		/*绘制底图*/
		public update(): void {
			//绘制前
			this.onBeforDraw();
			//1.得到窗口的起始索引位置
			var vLeft: number = -(this._layerRect.x - this._viewPort.x);
			var vTop: number = -(this._layerRect.y - this._viewPort.y);
			//2.定位在哪一个cell索引位置
			var vStartIndexX: number = MathU.parseInt(vLeft / this._cellWidth);
			var vStartIndexY: number = MathU.parseInt(vTop / this._cellHeight);
			//3.得出a端，绘图区域的前段的邻居
			var v_aWidth: number = vLeft % this._cellWidth;
			var v_aHeight: number = vTop % this._cellHeight;
			//4.得到层的索引宽度
			var l_idxWidth: number = MathU.parseInt(this._layerRect.width / this._cellWidth);
			var l_idxHeight: number = MathU.parseInt(this._layerRect.height / this._cellHeight);
			if (this._layerRect.width % this._cellWidth != 0) l_idxWidth++;
			if (this._layerRect.height % this._cellHeight != 0) l_idxHeight++;
			//5.得出偏移量
			l_idxWidth -= vStartIndexX;
			l_idxHeight -= vStartIndexY;
			//6.起始位置负数则跳过
			var scw: number = 0;
			var sch: number = 0;
			if (vStartIndexX < 0) scw = Math.abs(vStartIndexX);
			if (vStartIndexY < 0) sch = Math.abs(vStartIndexY);
			//7.结束位置超过就跳过
			let right:number = this._viewPort.x>0?this._viewPort.right:this._viewPort.width;//修正右侧位置
			let bottom:number = this._viewPort.y>0?this._viewPort.bottom:this._viewPort.height;//修正下侧位置
			var endIndexX: number = MathU.parseInt((this._layerRect.right - right) / this._cellWidth);
			var endIndexY: number = MathU.parseInt((this._layerRect.bottom - bottom) / this._cellHeight);
			if (endIndexX > 0) l_idxWidth -= endIndexX;
			if (endIndexY > 0) l_idxHeight -= endIndexY;

			/////////// 这个位置铺的是面对视口的铺装方式 ////////////
			var cw: number = scw;
			var ch: number = sch;
			while (ch < l_idxHeight) {
				while (cw < l_idxWidth) {
					var tx: number = vStartIndexX + cw;
					var ty: number = vStartIndexY + ch;
					var tpx: number = cw * this._cellWidth - v_aWidth;
					var tpy: number = ch * this._cellHeight - v_aHeight;

					this.onCellEach(tx, ty, tpx, tpy);

					cw++;//列数自增
					tpx += this._cellWidth;//累积列宽的定位
				}

				ch++;//行数自增
				cw = scw;//列数归零	
			}

			this.onAtferDrow();
		}

		/**
		 * 绘制前 
		 * 
		 */
		protected onBeforDraw(): void {

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
			throw new Error("子类未实现");
		}

		protected onAtferDrow(): void {

		}


		//清理地图切片
		public clear(): void {

		}

	}
}