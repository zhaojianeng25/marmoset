/**
* 移动到指定地图坐标栈 
*/
module game.cotrl{
	export class GotoMapPosStack extends BaseStack{
		
		/*目的地地图id*/
		private _toMapid:number;
		private _toX:number;
		private _toY:number;
		private _intoPlugins:boolean = false;
		private _nextUpdateTime:number = 0;
		//是否直接传送
		private _isTeleNow:boolean = false;
		
		constructor(app: AppBase, toMapid:number, toX:number, toY:number, intoPlugins:boolean = false,isTeleNow:boolean = false)
		{
			super(app);
			this._toMapid = toMapid;
			this._toX = toX;
			this._toY = toY;
			this._intoPlugins = intoPlugins;
			this._isTeleNow = isTeleNow;
		}
		
		public initialize():boolean{
			if(!super.initialize()){
				return false;
			}
			let mUnit:game.object.Unit = this._sceneObjectMgr.mainUnit;
			
			if(!mUnit || mUnit.isDied){
				return false;
			}

			if(!this.stack(this._controller, new GotoMapStack(this._app, this._toMapid,this._isTeleNow))){
				return false;
			}
			return true;
		}	
		
		public update(diff:number):boolean{
			//释放了 退出栈
			if(super.update(diff)){
				return true;
			}
			let cur_time:number = Laya.timer.currTimer;
			if(this._nextUpdateTime > 0 && this._nextUpdateTime > cur_time) return false;
			this._nextUpdateTime = cur_time + 100;

			let mUnit:game.object.Unit = this._sceneObjectMgr.mainUnit;
			//自己挂了 退出栈
			if(!mUnit  || mUnit.isDied){
				return true;
			}
			let mpMapid:number = mUnit.mapid;
			let mpx:number = mUnit.pos.x;
			let mpy:number = mUnit.pos.y;

			//如果地图id0  则默认与主玩家同一张地图
			if(this._toMapid == 0){
				this._toMapid = mpMapid;
			}
			if(mpMapid != this._toMapid){
				return !this.stack(this._controller, new GotoMapStack(this._app, this._toMapid,this._isTeleNow));
			}
			
			if(this._toX < 0 || this._toY < 0){
				return true;
			}
			
			if(mpx == this._toX && mpy == this._toY){
				//到达指定点需要挂机
				if(this._intoPlugins){

					console.log("人物停止4")
					this._controller.pluginsStart();
				}
					
				return true;
			}
			
			var mapData:game.data.MapAssetInfo = this._sceneObjectMgr.mapAssetInfo;
			if(!mapData){
				return true;
			}
			//目标为障碍
			if(mapData.isObstacle(this._toX, this._toY))
			{
				var tempPoint:game.data.point = new game.data.point(this._toX,this._toY);
				//查找以目标点为轴心的圆形非障碍点
				mapData.getRoundNotObs(tempPoint,15);
				if(tempPoint.x == this._toX && tempPoint.y == this._toY)
					return true;
				//如果已经到达能到达的点了
				if(mpx == tempPoint.x && mpy == tempPoint.y){
					//到达指定点需要挂机
					if(this._intoPlugins){
						console.log("人物停止5")
						this._controller.pluginsStart();
					}
						
					return true;
				}
			}
			
			return !this.stack(this._controller, new GotoDstStack(this._app, this._toX, this._toY, 1.5));
		}
	}
}