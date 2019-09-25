/**
* name 
*/
module game.scene{

	export class Camera{
		/*查看范围扩充*/
		public static LOGIC_INNER_LOOK:number = 4;
		
		/**
		 * 摄像头跟随模式
		 */		
		public static MODE_FOLLOW:number = 0;
		
		/**
		 * 手动模式 
		 */		
		public static MODE_MANUAL:number = 1;
		
		/**
		 * 移动模式 （缓动）
		 */		
		public static MODE_MOVE:number = 2;
		
		
		/*地震*/
		private _earthShock:Shock = new Shock();		
		/*摄像头跟随模式*/
		private _mode:number = Camera.MODE_MANUAL;

		// 是否跟随模式
		get isFollow():boolean{
			return this._mode == Camera.MODE_FOLLOW;
		}

		//设置摄像头模式
		set mode(v:number){
			this._mode = v;
		}

		/*摄像机位置*/
		private _worldPostion:Vector2 = new Vector2();
		get worldPostion():Vector2
		{
			return this._worldPostion;
		}
		/*所跟随的对象*/
		private _followPostion:Vector2;
		/**
		 * 手动坐标x和手动坐标y 
		 */		
		private _manualX:number = 0;
		private _manualY:number = 0;
		
		/**
		 * viewPort宽度 
		 */		
		public width:number = 800;
		
		/**
		 * viewPort高度 
		 */		
		public height:number = 600;

		/**
		 * 地图像素总宽度
		 */
		public map_width_px:number = 0;

		/**
		 * 地图像素总高度
		 */
		public map_height_px:number = 0;
		
		/**
		 * 缓冲区宽度/像素 
		 */		
		public bufferWidth:number;
		
		/**
		 * 缓冲区高度/像素 
		 */		
		public bufferHeight:number;
		
		/**
		 * 缓冲区位置的左边线 
		 */		
		public bufferLeft:number;
		
		/**
		 * 缓冲区位置的右边线 
		 */		
		public bufferRight:number;
		
		/**
		 * 缓冲区位置的上边线 
		 */		
		public bufferTop:number;
		
		/**
		 * 缓冲区位置的下边线 
		 */		
		public bufferBottom:number;
		
		/**
		 * 是否碍于边缘及地图大小被修正 
		 */		
		public isCorrection:boolean;
		
		/*逻辑左值，右值，上值，下值*/
		public logicLeft:number;
		public logicRight:number;
		public logicTop:number;
		public logicBottom:number;
		
		/*视野内逻辑左值，右值，上值，下值*/
		public look_logicLeft:number;
		public look_logicRight:number;
		public look_logicTop:number;
		public look_logicBottom:number;
		
		/**
		 * 摄像头的位置x，y,z
		 */		
		private _x:number = 0;
		get x():number{
			return this._x;
		}
		private _y:number = 0;
		get y():number{
			return this._y;
		}
		
		/*移动标记*/
		// private _moveFlag:number;
		/*窗口大小标记*/
		private _sizeFlag:number;
		
		// /**
		//  * 镜头产生移动 
		//  * @return 
		//  * 
		//  */		
		// public get isMove():boolean{
		// 	return this._moveFlag >= Laya.timer.currFrame;
		// }
		
		/**
		 * 镜头产生移动 
		 * @return 
		 * 
		 */		
		public get isResize():boolean{
			return this._sizeFlag >= Laya.timer.currFrame;
		}
		
		/**
		 * 是否启用滤镜 
		 */		
		public enableFilter:boolean = true;
		
		/**
		 * 设置摄像机可视大小 
		 * @param newWidth 新高
		 * @param newHeight 新宽
		 * 
		 */		
		setSize(newWidth:number, newHeight:number):void{
			this.width = newWidth;
			this.height= newHeight;
			
			/*
			enableFilter = 
				Starling.current.viewPort.width <= 1920 &&
				Starling.current.viewPort.height <= 1080 &&
				bufferWidth < Starling.current.maxTextureSize && 
				bufferHeight < Starling.current.maxTextureSize;
				*/
		}

		/**
		 * 设置地图像素总大小 
		 * @param newWidth 新高
		 * @param newHeight 新宽
		 * 
		 */	
		setMapSize(newWidth:number, newHeight:number):void{
			this.map_width_px = newWidth;
			this.map_height_px = newHeight;
		}
		
		// 切换到跟随模式 
		follow(pos:Vector2):void{
			//logd('follow', pos)
			this._mode = Camera.MODE_FOLLOW;
			if(this._followPostion != pos){
				this._followPostion = pos;
			}
		}

		// 取消跟随点
		unFollow(pos:Vector2):void{
			if(this._mode != Camera.MODE_FOLLOW){
				return;
			}
			if(this._followPostion == pos){
				this._followPostion = null;
			}
		}
		
		/**
		 * 摄像头位置的定位中心点位置
		 * @param newX 新的x
		 * @param newY 新的y
		 * 
		 */
		public setLeftTopLocation(newX:number, newY:number):void
		{
			this._mode = Camera.MODE_MANUAL;
			this._manualX = this.centerPointX + newX;
			this._manualY = this.centerPointY + newY;
			this.__location(this._manualX, this._manualY);
		}
		
		public setCenterLocation(newX:number, newY:number):void{
			this._mode = Camera.MODE_MANUAL;
			this._manualX = newX;
			this._manualY = newY;
			this.__location(this._manualX, this._manualY);
		}
		
		/**
		 * 设置摄像头的位置，通过逻辑坐标 
		 * @param newX 逻辑坐标x
		 * @param newY 逻辑坐标y
		 * 
		 */		
		public setWorldPostion(newX:number, newY:number):void{
			this._worldPostion.x = newX;
			this._worldPostion.y = newY;
		}
		
		/*内部函数，设置位置*/
		private __location(newX:number, newY:number):void
		{			
			this._x = newX;
			this._y = newY;
			
			//震动效果
			// if(this._earthShock.update()){
			// 	this._x += this._earthShock.offsetX;
			// 	this._y += this._earthShock.offsetY;
			// }
			//震动效果
			if(Pan3d.Scene_data.cam3D.offset.x || Pan3d.Scene_data.cam3D.offset.y){
				this._x += 2*Pan3d.Scene_data.cam3D.offset.x;
				this._y += 2*Pan3d.Scene_data.cam3D.offset.y;
			}
			
			//得出视口的大小
			var bw:number = Math.min(this.width, this.map_width_px);
			var bh:number = Math.min(this.height, this.map_height_px);
			//判断窗口是否发生改变
			if(bw != this.bufferWidth || bh != this.bufferHeight)
				this._sizeFlag = Laya.timer.currFrame;
			
			//设置窗口大小
			this.bufferWidth = bw;
			this.bufferHeight = bh

			this.centerPointX = Math.round(this.bufferWidth/2);
			this.centerPointY = Math.round(this.bufferHeight/2) + this.centerPointYOffset;
			
			//左线
			this.bufferLeft = this._x - this.centerPointX;
			//右线
			this.bufferRight = this.bufferLeft + this.bufferWidth;
			//上线
			this.bufferTop = this._y - this.centerPointY;
			//下线
			this.bufferBottom = this.bufferTop + this.bufferHeight;
			
			//修正
			this.isCorrection = false;
			
			//控制画面不得超过地图区域
			if(this.bufferLeft < 0){
				this.bufferLeft = 0;
				this.bufferRight = this.bufferWidth;
				this.isCorrection = true;
			}
			
			if(this.bufferTop < 0){
				this.bufferTop = 0;
				this.bufferBottom = this.bufferHeight;
				this.isCorrection = true;
			}
			
			if(this.width > this.map_width_px){
				this.bufferLeft = -(this.width - this.map_width_px) / 2;
				this.bufferRight = this.bufferLeft + this.map_width_px;
				this.isCorrection = true;
			}
			else if(this.bufferRight > this.map_width_px){
				this.bufferRight = this.map_width_px;
				this.bufferLeft = this.bufferRight - this.bufferWidth;
				this.isCorrection = true;
			}
			
			if(this.height > this.map_height_px){
				this.bufferTop =  -(this.height - this.map_height_px) / 2;
				this.bufferBottom = this.bufferTop + this.map_height_px;
				this.isCorrection = true;
			}
			else if(this.bufferBottom > this.map_height_px){
				this.bufferBottom = this.map_height_px;
				this.bufferTop = this.bufferBottom - this.bufferHeight;
				this.isCorrection = true;
			}
			if(this.isCorrection){
				// 镜头有调整需要重算一下 位置
				this._x = this.bufferLeft + this.centerPointX;
				this._y = this.bufferTop + this.centerPointY;
			}
		}
		
		/**
		 * 视线范围中央点x，y 
		 */		
		public centerPointX:number;
		public centerPointY:number;

		public centerPointYOffset:number = 85;
		
		/**
		 * 场景对应的摄像机 
		 * @param scene
		 * 
		 */		
		constructor()
		{
		}
		
		
		/**
		 * 更新摄像机 
		 * @param diff 时差
		 * @param width 摄像机宽度
		 * @param height 摄像机高度
		 * 
		 */		
		public update():void
		{			
			switch(this._mode)
			{
				//跟随模式
				case Camera.MODE_FOLLOW:
					this.updateModeFollow();
					break;
				//移动模式
				case Camera.MODE_MOVE:
					this.updateModeMove();
					break;
				//手动模式,直接调用location设置位置
				case Camera.MODE_MANUAL:
					this.__location(this._manualX, this._manualY);
					break;
			}

			if(this.bufferLeft < 0) this.bufferRight = this.bufferWidth;
			if(this.bufferTop < 0) this.bufferBottom = this.bufferHeight;
			
			//逻辑坐标范围
			this.logicLeft = this.bufferLeft / SceneRes.CELL_WIDTH;
			this.logicRight= this.bufferRight/ SceneRes.CELL_WIDTH;
			this.logicTop  = this.bufferTop  / SceneRes.CELL_HEIGHT;
			this.logicBottom = this.bufferBottom / SceneRes.CELL_HEIGHT;
			
			//更新逻辑范围，用于lookIn函数
			this.look_logicLeft = this.logicLeft - Camera.LOGIC_INNER_LOOK;
			this.look_logicRight= this.logicRight + Camera.LOGIC_INNER_LOOK;
			this.look_logicTop  = this.logicTop - Camera.LOGIC_INNER_LOOK;
			this.look_logicBottom = this.logicBottom + Camera.LOGIC_INNER_LOOK;
		}
		
		
		//////////////////////////////////////////////////////////////////////////////
		//							移动模式										//
		//////////////////////////////////////////////////////////////////////////////
		
		/*移动模式下的x，y*/
		private _moveSrcX:number;
		private _moveSrcY:number;
		private _moveDstX:number;
		private _moveDstY:number;
		/*时长*/
		private _move_duration:number;
		
		/*移动朝向*/
		private _move_toward:Number;
		/*移动的启动时间*/
		private _move_StartTime:number;
		/*移动的结束时间*/
		private _move_endTime:number;

		/*移动模式*/
		public updateModeMove():void
		{
			if(this._move_endTime < Laya.timer.currTimer){
				this.__location(this._moveDstX, this._moveDstY);
				return;
			}
			
			//移动量
			var pi:number = (Laya.timer.currTimer - this._move_StartTime) / this._move_duration;			
			var x:number = this._moveSrcX + ((this._moveDstX - this._moveSrcX) * pi);
			var y:number = this._moveSrcY + ((this._moveDstY - this._moveSrcY) * pi);
			
			//设置摄像头位置
			this.__location(x, y);
		}
		
		
		
		/**
		 * 获得基于屏幕的X像素位置，通过逻辑X 
		 * @param x 逻辑x
		 * @return 
		 */	
		public getScenePxByCellX(x:number):number{
			return x * SceneRes.CELL_WIDTH - this.bufferLeft;
		}		
		
		/**
		 * 获得基于屏幕的Y像素位置，通过逻辑Y 
		 * @param y 逻辑y
		 * @return 
		 */		
		public getScenePxByCellY(y:number):number{
			return y * SceneRes.CELL_HEIGHT - this.bufferTop;
		}
		
		/*通过实际像素获得相对于屏幕的位置*/
		private getSceneX(xPX:number):number{
			return xPX - this.bufferLeft;
		}
		
		/*通过实际像素获得相对于屏幕的位置*/
		private getSceneY(yPX:number):number{
			return yPX - this.bufferTop;			
		}
		
		/**
		 * 通过当前屏幕的像素x获得逻辑位置x  
		 * @param x
		 * @return 
		 * 
		 */		
		public getCellXByScene(x:number):number{
			var v:number = x + this.bufferLeft;
			return v / SceneRes.CELL_WIDTH;
		}
		
		/**
		 * 通过当前屏幕的像素y获得逻辑位置y
		 * @param y
		 * @return 
		 * 
		 */		
		public getCellYByScene(y:number):number{			
			var v:number = y + this.bufferTop;
			return v / SceneRes.CELL_HEIGHT;
		}
		
		/**
		 * 移动到指定的逻辑坐标 
		 * @param dstLogicX
		 * @param dstLogicY
		 * @param duration
		 * 
		 */		
		public moveto2(dstLogicX:number, dstLogicY:number, duration:number):void{
			this.moveto(SceneRes.CELL_WIDTH * dstLogicX, SceneRes.CELL_HEIGHT* dstLogicY, duration);
		}
		
		/**
		 * 移动到指定的位置 
		 * @param dstX 目标x 像素单位
		 * @param dstY 目标y 像素单位
		 * @param duration 时长
		 * @param srcX 目标x
		 * @param srcY 目标y
		 * 
		 */		
		public moveto(dstX:number, dstY:number, duration:number, srcX:number = -1, srcY:number = -1):void
		{			
			if(srcX == -1 || srcY== -1){
				srcX = this._x;
				srcY = this._y;
			}
			
			/*记录位置*/	
			this._moveSrcX = srcX;
			this._moveSrcY = srcY;
			
			this._moveDstX = dstX;
			this._moveDstY = dstY;
			
			this._move_duration = duration;
			
			//获得角度
			this._move_toward = MathU.getAngle(srcX, srcY, dstX, dstY);
			// //获得距离
			// var distance:Number = MathU.getDistance(srcX, srcY, dstX, dstY);
			//启动时间
			this._move_StartTime = Laya.timer.currTimer;
			//获取停止时间
			this._move_endTime = this._move_StartTime + duration;	
			//设置为移动模式
			this._mode = Camera.MODE_MOVE;
		}
		
		/*更新跟随模式*/
		private updateModeFollow():void
		{			
			if(!this._followPostion){
				//逻辑坐标范围
				this.bufferLeft = NaN;
				this.bufferRight = NaN;
				this.bufferTop = NaN;
				this.bufferBottom = NaN;
				//logd('!this._followPostion', this._worldPostion.x, this._worldPostion.y)
				return;
			} 
			this._worldPostion.x = this._followPostion.x;
			this._worldPostion.y = this._followPostion.y;
			
			//通过主玩家的实际坐标位置，得到屏幕中央偏移及格子中央偏移			
			var srX:number = this._worldPostion.x * SceneRes.CELL_WIDTH;
			var srY:number = this._worldPostion.y * SceneRes.CELL_HEIGHT;
			
			//设置窗口位置
			this.__location(srX, srY);
		}
		/**
		 * 是否存在于摄像头里（区域碰撞检测） 
		 * @param postion 位置
		 * @return 
		 */	
		lookIn(postion:Vector2):boolean;
		/**
		 *  是否存在于摄像头里（区域碰撞检测）
		 * @param postionX
		 * @param postionY
		 * @return 
		 */		
		lookIn(postionX:number, postionY:number):boolean;
		
		lookIn(...args:any[]):boolean{
			let look = false;
			let postionX:number, postionY:number;
			switch(args.length){
				case 1:
					if(args[0] instanceof Vector2){
						postionX = args[0].x
						postionY = args[0].y
						look = !(this.look_logicLeft > postionX || this.look_logicRight < postionX || this.look_logicTop > postionY || this.look_logicBottom < postionY);
					}
					break;
				case 2:
					if(args[0] instanceof Number && args[1] instanceof Number){
						postionX = args[0]
						postionY = args[1]
						look = !(this.look_logicLeft > postionX || this.look_logicRight < postionX || this.look_logicTop > postionY || this.look_logicBottom < postionY);
					}
					break;
			}
			return look;
		}

		lookInBuffer(x1:number, y1:number, width:number, height:number):boolean{
			// 判断两矩形是否相交、原理狠简单、如果相交、肯定其中一个矩形的顶点在另一个顶点内、
			let x2:number = x1 + width;
			let y2:number = y1 + height;

			let x3:number = this.bufferLeft;
			let y3:number = this.bufferTop;
			let x4:number = this.bufferRight;
			let y4:number = this.bufferBottom;

			return ( ( (x1 >=x3 && x1 < x4) || (x3 >= x1 && x3 <= x2) ) &&
				( (y1 >=y3 && y1 < y4) || (y3 >= y1 && y3 <= y2) ) ) ? true : false;

		}
			
		/**
		 * 屏幕震动 
		 * @param duration 持续时间，默认500ms
		 * 
		 */		
		public shock(duration:number = 250):void{
			this._earthShock.start(duration);
		}
		
		/**
		 * 停止屏幕震动 
		 * 
		 */		
		public shockStop():void
		{
			this._earthShock.stop();
		}
	}
}