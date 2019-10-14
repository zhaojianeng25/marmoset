/**
* 移动转向栈 
*/
module game.cotrl{
	export class MoveTowardStack extends BaseStack{

		static MAX_DISTANC:number = 20;

		private _curToward:number = 0;
		private _isSend:boolean = false;
		private _isHangUp:boolean = false;
		private _attackOid:number = 0;
		private _moveStatus:boolean = false;
		private _nextUpdateTime:number = 0;
		private _tryCount:number = 0;

		constructor(app: AppBase, toward:number,isHangUp:boolean = false){
			super(app);
			this._curToward = toward;
			this._isSend = false;
			this._isHangUp = isHangUp;
		}
		
		//更新下朝向
		public setToward(toward:number):void{
			//如果遥感方向不一致
			if(this._curToward == toward) return;
			this._curToward = toward;
			this._isSend = false;
			this._tryCount = 0;
		}

		public initialize():boolean{
			if(!super.initialize()){
				return false;
			}
			var mUnit:game.object.Unit = this._sceneObjectMgr.mainUnit;
			
			if(this._curToward < 0 || !mUnit || mUnit.isDied || !this._controller.canMove){
				return false;
			}
			this._attackOid = this._sceneObjectMgr.selectOid;//记录下当前选择的攻击对象
			this._isSend = false;
			
			return true;
		}

		/**
		 * 心跳 
		 * @param diff
		 */		
		public update(diff:number):boolean{
			//释放了 退出栈
			if(super.update(diff)){
				return true;
			}
			var mUnit:game.object.Unit = this._sceneObjectMgr.mainUnit;
			//传送了 | 自己挂了 退出栈
			if(!mUnit  || mUnit.isDied){
				return true;
			}
			let curTime:number = Laya.timer.currTimer;
			let mpx:number = mUnit.pos.x;
			let mpy:number = mUnit.pos.y;
			if(!this._isSend && this._curToward >= 0){
				this._controller.sendMoveToward(this._curToward);
				this._tryCount++;
				this._isSend = true;
				// logd("------------zzzzzz------send toward",this._curToward,mUnit.isMoving);
				this._nextUpdateTime = curTime + 1000;
				return false;
			}
			else if(this._nextUpdateTime > 0 && this._nextUpdateTime <= curTime ){
				if( this._isSend && !this._moveStatus && this._tryCount < 3){
					//再发一次  不超过3次
					if(!mUnit.isMoving){
						this._controller.sendMoveToward(this._curToward);
						this._tryCount++;
					}
					this._moveStatus = mUnit.isMoving;
					this._nextUpdateTime = curTime + 1000;
					// logd("------------zzzzzz------ _tryCount",this._curToward,mUnit.isMoving,this._tryCount);
					return false;
				}
				else if( this._isSend && this._moveStatus ){
					//判断玩家是否停止移动了
					if(!mUnit.isMoving){
						//判断当前是否有选择的对象  如果有 判断选择的对象与自己的距离 太远 另外选择
						if(this._attackOid > 0){
							let targetUnit:game.object.Unit = this._sceneObjectMgr.getUnitByOid(this._attackOid);
							if(targetUnit && !targetUnit.isDied){
								let dis:number = mUnit.Distance(targetUnit);
								if(dis >= MoveTowardStack.MAX_DISTANC){
									this._sceneObjectMgr.selectOid = 0;
									this._controller.stop(false);
								}
								else{
									this._sceneObjectMgr.selectOid = this._attackOid;// 则还原原本的攻击对象
								}
							}
						}
						// logd("------------restart hangup");
						//重新开启挂机
						if(this._isHangUp){
							console.log("人物停止6")
								this._controller.pluginsStart();
						}
							
						return true;
					}
				}
			} 
			
			return false;
		}

		/**
		 * 释放 
		 */		
		public finalize():void{
			this._curToward = -1;
			this._isSend = false;
			this._isHangUp = false;
			this._moveStatus = false;
			this._attackOid = 0;
			super.finalize();
		}
	}
}