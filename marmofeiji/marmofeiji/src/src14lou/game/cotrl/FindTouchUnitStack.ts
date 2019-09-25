/**
* 查找并使用生物对象栈 
*/
module game.cotrl{
	export class FindTouchUnitStack extends BaseStack{
	
		public static  MAX_NPCTOUCH_DISTANCE	:number = 6;//npc 触碰 最大距离
		public static  MAX_NPCTOUCH_MOUNT_DISTANCE	:number = 12;//npc 触碰 最大距离 坐骑
		
		private _mapid:number;
		private _dstX:number;
		private _dstY:number;
		
		private _touchGuid:string = "";
		private _touchEntry:number;
		private _touchType:number;

		private _nextUpdateTime:number = 0;
		
		/*如果是打怪是否进入挂机*/
		private _intoPlugins:boolean = false;

		/*初始寻找AvatarUnit距离*/
		private _longDistance:number = 12;
		/*渐进寻找AvatarUnit距离*/
		private _gradualDistance:number = 3;
		
		/*目标*/
		private _target:game.object.Unit;
		/*是否时战利品*/
		private _isLoot:boolean;
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
		 */
		constructor(app: AppBase, mapid:number, dstX:number, dstY:number, tid:number, type:number, guid:string = "", intoPlugins:boolean = false, isloot:boolean = false)
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

			let mpx:number = mUnit.pos.x;
			let mpy:number = mUnit.pos.y;
			let mpMapid:number = mUnit.mapid;
			//不在这地图里的
			if(mpMapid != this._mapid){
				this._controller.setIsAutoMoving(true,999);
				//插入移动栈
				return !this.stack(this._controller, new GotoMapStack(this._app, this._mapid));
			}

			//距离太远的 暂时用12码
			let dis:number = MathU.getDistance(mpx,mpy,this._dstX,this._dstY);
			if(dis > this._longDistance){
				this._controller.setIsAutoMoving(true,dis);
				//插入移动栈
				return !this.stack(this._controller, new GotoDstStack(this._app, this._dstX, this._dstY, this._longDistance));
			}
			
			if(!this._target){
				//寻找目标
				if(this._touchGuid && this._touchGuid.length){
					//Guid优先
					this._target = this._sceneObjectMgr.getUnitByGuid(this._touchGuid);
				}
				else{
					if(!this._target && this._touchEntry)
						this._target = this._sceneObjectMgr.getUnitByEntry(mUnit,this._touchEntry);
				}
			}
			
			if(!this._target){
				//没找到  再渐进寻找
				if(MathU.getDistance(mpx,mpy,this._dstX,this._dstY) > 2){
					this._longDistance = this._longDistance > this._gradualDistance ? this._longDistance - this._gradualDistance : 0;
					return false;
				}
				return true;//已经距离这么近了 还找不到 就退出
			}
			
			let target_map_id:number = this._target.mapid;
			if( mpMapid != target_map_id){
				this._target = null;
				//清空
				this.stack(this._controller, new SelectTargetSack(this._app, null));
				return false;
			}
			
			if(this._sceneObjectMgr.selectOid != this._target.oid ){
				//插如选择目标栈
				this.stack(this._controller, new SelectTargetSack(this._app, this._target));
			}
			//触发unit的距离
			if(this._controller.isFriendly(this._target)){
				//距离太远的
				let dx:number = this._dstX;
				let dy:number = this._dstY;
				let touchDistance:number = mUnit.isRiding? 2.5 : 1.5;
				if(Math.floor(dis) > touchDistance){
					this._controller.setIsAutoMoving(true,dis);
					this.stack(this._controller, new GotoDstStack(this._app, dx, dy, touchDistance));
					return false;
				}
				else{
					//切换触发栈
					this._controller.exec(new TouchUnitStack(this._app, this._target.guid));
				}
			}else{
				if(this._intoPlugins)
				{
					console.log("人物停止3")
						this._controller.pluginsStart(true,true,this._touchEntry);
					}
				
				if(!this._target)return true;
				var targetEntry:number = this._target.entryid;
				if(!this._target.isDied){
					//敌对的切换成攻击栈
					this._controller.exec(new AttackStack(this._app, this._target));
				}
			}
			return true;
		}
		
		public finalize():void{
			this._target = null;
			this._nextUpdateTime = 0;
			super.finalize();
		}
	}
}