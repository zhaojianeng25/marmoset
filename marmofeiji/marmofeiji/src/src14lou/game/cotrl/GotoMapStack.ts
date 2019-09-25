/**
* 移动到指定地图栈 
*/
module game.cotrl{

	export class GotoMapStack extends BaseStack{
		
		/*目的地地图id*/
		private _toMapid:number;
		/*跨地图寻路算法获得的传送点*/
		private _telePorts:Array<any>;
		/*下一个传送点的*/
		private _nextTelePort:game.data.Teleport;
		//是否直接传送
		private _isTeleNow:boolean = false;

		private _nextUpdateTime:number = 0;
		
		constructor(app: AppBase, toMapid:number,isTeleNow:boolean = false)
		{
			super(app);
			this._toMapid = toMapid;
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
			let mpMapid:number = mUnit.mapid;
			if(mpMapid != this._toMapid){
				//找出跨地图路径点
				this._telePorts = MapTeleportIndex.inst.find(mpMapid, this._toMapid);
				if(!this._telePorts)
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
			//传送了 | 自己挂了 退出栈
			if(!mUnit  || mUnit.isDied){
				return true;
			}
			let mpMapid:number = mUnit.mapid;
			let mpx:number = mUnit.pos.x;
			let mpy:number = mUnit.pos.y;
			//如果在同一张地图，不需要跨地图寻路，则直接调用本地干道寻路
			if(mpMapid == this._toMapid){
				return true;
			}
			//地图数据下载中
			if(!this._sceneObjectMgr.mapAssetInfo)
				return false;
			//是否处于等待传送
			if(this._controller.isTeleporting)
				return false;
			//继续寻找下一个传送点
			if(!this._nextTelePort && this._telePorts)
				this._nextTelePort = this._telePorts.shift();
			//如果找不到下一个传送点退出
			if(!this._nextTelePort)
				return true;

			//如果是直接传送
			if(this._isTeleNow){
				//直接发起传送协议
				if(!this._controller.teleToMapTeleportPos(this._toMapid))
					this._controller.sendTeleport(this._nextTelePort.dstMapid,this._nextTelePort.dstPortX, this._nextTelePort.dstPortY);
				return true;
			}
			else{
				//如果距离太小了，就直接传送
				var distance:number = MathU.getDistance(mpx,mpy,this._nextTelePort.srcPortX, this._nextTelePort.srcPortY);
				if(distance < 2){
					//直接发起传送协议
					this._controller.sendTeleport(this._nextTelePort.dstMapid,this._nextTelePort.dstPortX, this._nextTelePort.dstPortY);
					return true;
				}else{
					//加入新栈，干道寻路
					return !this.stack(this._controller, new GotoDstStack(this._app, this._nextTelePort.srcPortX, this._nextTelePort.srcPortY, 1.5));
				}
			}
			
		}
		
		public finalize():void{
			this._nextTelePort = null;
			this._telePorts = null;
			this._nextUpdateTime = 0;
			super.finalize();
		}
		
	}
}