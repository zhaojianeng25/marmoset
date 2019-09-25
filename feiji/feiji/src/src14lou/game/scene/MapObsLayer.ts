/**
* name 
*/
module game.scene{
	export class MapObsLayer extends MapPartLayer{
		private mapData:game.data.MapAssetInfo;

		constructor(app: AppBase){
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
		public initObsLayer(lw:number, lh:number):void
		{
			super.init(0, 0, lw, lh, SceneRes.CELL_WIDTH, SceneRes.CELL_HEIGHT);
			this.mapData = this._app.sceneObjectMgr.mapAssetInfo;
			this.alpha = 0.3;
		}

		/**
		 * 通过摄像机设置窗口位置
		 * @param camera
		 * 
		 */		
		public setViewPortByCamera(camera:Camera):void{
			this.setViewPort(camera.bufferLeft, camera.bufferTop, camera.bufferWidth, camera.bufferHeight);
		}

		//绘制
		protected onBeforDraw():void{
			super.onBeforDraw();
			this.graphics.clear();
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
		protected onCellEach(tx:number, ty:number, tpx:number, tpy:number):void
		{
			//开始绘制
			if(this.mapData.isObstacle(tx, ty))
				this.graphics.drawRect(tpx, tpy, SceneRes.CELL_WIDTH, SceneRes.CELL_HEIGHT, "#FF0000")			
		}

		/**
		 * 绘制圆
		 * @param cx 中心点x
		 * @param cy 中心点y
		 * @param radius 半径
		 * 
		 */		
		public drawCircle(cx:number,cy:number,radius:number,camera:Camera):void{
			this.graphics.clear();
			this.setViewPortByCamera(camera);
			this.graphics.drawCircle(cx*SceneRes.CELL_WIDTH - this._viewPort.x,cy*SceneRes.CELL_HEIGHT-this._viewPort.y,radius*SceneRes.CELL_WIDTH,"#FF0000","#FF0000",2);
		}
	}
}