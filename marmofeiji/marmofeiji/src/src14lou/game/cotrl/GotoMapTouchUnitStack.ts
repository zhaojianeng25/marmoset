/**
* 查找并使用生物对象栈 
*/
module game.cotrl{
	export class GotoMapTouchUnitStack extends BaseStack{
	
		public static  MAX_NPCTOUCH_DISTANCE	:number = 6;//npc 触碰 最大距离
		
		private _mapid:number;
		private _dstX:number;
		private _dstY:number;
		
		private _touchGuid:string = "";
		private _touchEntry:number;
		private _touchType:number;

		private _nextUpdateTime:number = 0;
		
		/*如果是打怪是否进入挂机*/
		private _intoPlugins:boolean = false;
		
		/*目标*/
		private _target:game.object.Unit;
		/*是否时战利品*/
		private _isLoot:boolean;

		private _isGotoPos:boolean = false;
		/**
		 * 查找并接触生物对象
		 * @param scene	
		 * @param dstMapid 			目标地图id
		 * @param dstX				目标x
		 * @param dstY				目标y
		 * @param tid				生物对象模板id
		 * @param guid				生物对象guid
		 * @param intoPlugins		是否进入挂机
		 * @param isLoot			是否时战利品
		 * @param isGotoPos			需要走着去
		 */
		constructor(app: AppBase, mapid:number, dstX:number, dstY:number, tid:number, type:number, guid:string = "", intoPlugins:boolean = false, isloot:boolean = false,isGotoPos:boolean=false)
		{
			super(app);
			this._mapid = mapid;
			this._dstX = dstX;
			this._dstY = dstY;
			this._touchEntry = tid;
			this._touchType = type;
			this._touchGuid = guid;
			this._intoPlugins = intoPlugins;
			this._isLoot = isloot;
			this._isGotoPos = isGotoPos;
		}
		
		/**
		 * 初始化
		 */		
		public initialize():boolean{
			if(!super.initialize()){
				return false;
			}
			
			if((!this._touchGuid || !this._touchGuid.length) && !this._touchEntry){
				return false;
			}
			
			var mUnit:game.object.Unit = this._sceneObjectMgr.mainUnit;
			if(!mUnit || mUnit.isDied){
				return false;
			}
			return true;
		}
		
		public doReady():void{
			
		}
		
		public update(diff:number):boolean{
			//释放了 退出栈
			if(super.update(diff)){
				return true;
			}
			let cur_time:number = Laya.timer.currTimer;
			if(this._nextUpdateTime && this._nextUpdateTime > cur_time) return false;
			this._nextUpdateTime = cur_time + 200;

			var mUnit:game.object.Unit = this._sceneObjectMgr.mainUnit;
			//传送了 | 自己挂了 退出栈
			if(!mUnit  || mUnit.isDied){
				return true;
			}
			//地图数据下载中
			if(!this._sceneObjectMgr.mapAssetInfo)
				return false;
			//是否处于等待传送
			if(this._controller.isTeleporting)
				return false;
			let mpx:number = mUnit.pos.x;
			let mpy:number = mUnit.pos.y;
			let mpMapid:number = mUnit.mapid;
			//不在这地图里的
			if(mpMapid != this._mapid){
				//传送
				if(this._isGotoPos){
					if(this._controller.teleToMapTeleportPos(this._mapid)) return false;
				}
				this._controller.sendTeleport(this._mapid,this._dstX,this._dstY);
				return false;
			}
			//直接传送到目的 就算在本地图
			else if(!this._isGotoPos){
				let dis:number = MathU.getDistance(mUnit.pos.x,mUnit.pos.y,this._dstX,this._dstY);
				//不在附近
				if(dis > 30){
					this._controller.sendTeleport(this._mapid,this._dstX,this._dstY);
					return false;
				}
			}
			
			return this._controller.stack(new FindTouchUnitStack(this._app, this._mapid, this._dstX, this._dstY, this._touchEntry, this._touchType,null,this._intoPlugins,this._isLoot));
		}

		
		
		public finalize():void{
			this._target = null;
			this._nextUpdateTime = 0;
			super.finalize();
		}
	}
}