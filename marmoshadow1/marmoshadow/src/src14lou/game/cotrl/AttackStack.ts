/**
* 攻击栈 
*/
module game.cotrl{
	
	export class AttackStack extends BaseStack{
		
		/*目标对象*/
		private _targetUnit:game.object.Unit;
		private _addDis:number = 0;
		public targetOid:number = 0;
		/*目标点*/
		private _dstX:number;	
		private _dstY:number;

		/*更新当前技能*/
		private _spellid:number = 0;
		/*技能*/
		private _spellTemp:any;
		
		private  _tryCount:number = 0;
		private _nextUpdateTime:number = 0;
		
		constructor(app: AppBase, targetUnit:game.object.Unit)
		{
			super(app);
			this._targetUnit = targetUnit;
			this._tryCount = 0;
			this._addDis = 0.8;
			if(targetUnit){
				this.targetOid = targetUnit.oid;
				let flag = targetUnit.npcFlag;
				switch (flag) {
					case Unit.CREATURE_TYPE_ELITE:
						this._addDis = 2.8
						break;
					case Unit.CREATURE_TYPE_BOSS:
					case Unit.CREATURE_TYPE_SMALL_BOSS:
						this._addDis = 4.8
						break;
				}
			}
		}
		
		public initialize():boolean{
			if(!super.initialize()){
				return false;
			}
			var mUnit:game.object.Unit = this._sceneObjectMgr.mainUnit;
			
			if(!mUnit || mUnit.isDied){
				return false;
			}
			
			//校验能否攻击
			if(!this.isCanAttack()){
				return false;
			}
			return true;
		}
		
		/**
		 * 心跳，返回是否退出堆栈
		 * @param diff 心跳时差
		 */	
		public update(diff:number):boolean{
			// let cur_time:number = Laya.timer.currTimer;
			// if(this._nextUpdateTime && this._nextUpdateTime > cur_time) return false;
			// this._nextUpdateTime = cur_time + 100;
			//释放了 退出栈
			if(super.update(diff)){
				return true;
			}
			//目标死了
			if(this._targetUnit && this._targetUnit.isDied){
				return true;
			}
			
			var mUnit:game.object.Unit = this._sceneObjectMgr.mainUnit;
			//传送了 | 自己挂了 退出栈
			if(!mUnit  || mUnit.isDied){
				return true;
			}
			let mpx:number = mUnit.pos.x;
			let mpy:number = mUnit.pos.y;
			//选中目标
			if(this._targetUnit && this._sceneObjectMgr.selectOid != this._targetUnit.oid){
				this.stack(this._controller, new SelectTargetSack(this._app, this._targetUnit));
				this._tryCount++;
				if(this._tryCount >= 3) return true;//三次机会
				return false;
			}
			
			//攻击
			if(this.isCanAttack()){
				if(this._spellTemp.need_target > 0 && !this._targetUnit){
					//需要目标但 没有目标
					return true;
				}
				//判断是否处于公共cd 中
				if(this._controller.getSpellCommonCD(200) > 0) return false;

				let dis:number = MathU.getDistance(mpx,mpy,this._dstX,this._dstY);
				let spell_dis:number = this._spellTemp.distance + this._addDis;
				if(dis > spell_dis){
					//logd("距离:",dis,spell_dis)
					//是否使用瞬移
					let sd:number = 15;
					if(this._spellTemp.need_target > 0){
						if(dis <= sd){
							// if(dis >= 10){
							// 	return false;
							// } 
							sd = spell_dis;
						}
					}
					else{
						sd = spell_dis;
					}

					this.stack(this._controller, new TrackUnitStack(this._app, this._dstX, this._dstY, sd, this._spellTemp.need_target > 0 ? this._targetUnit : null));
					return false;
				}
				
				return false;
			}
			return true;
		}
		
		//是否可以攻击
		private isCanAttack():boolean{
			//buff是否能攻击
			if(!this._controller.canAttack) 
				return false;
			//更新技能
			this.updateCurSpell();
			if(!this._spellTemp){
				//不应该啊
				return false;
			}

			//主玩家对象
			let mUnit:Unit = this._sceneObjectMgr.mainUnit;

			if(this._spellTemp.need_target > 0){
				//需要目标 没死 并且可以攻击
				if(!this._targetUnit || this._targetUnit.isDied || this._controller.isFriendly(this._targetUnit)){
					return false;
				}
				this._dstX = this._targetUnit.pos.x;
				this._dstY = this._targetUnit.pos.y;
			}
			else{
				this._dstX = mUnit.pos.x;
				this._dstY = mUnit.pos.y;
			}

			//如果目标在障碍点
			let spell_dis:number = this._spellTemp.distance + this._addDis
			if(this._targetUnit 
			&& mUnit.Distance(this._targetUnit) > spell_dis 
			&& this._sceneObjectMgr.mapAssetInfo.isObstacle(this._dstX,this._dstY)){
				return false;
			}
			return true;
		}
		
		//更新技能
		private updateCurSpell():void{
			let isNoUseSpell:boolean = false;
			
			//不使用技能了
			if(isNoUseSpell){
				this._spellid = 0;
				this._spellTemp = null;
			}
			else{
				//如果还是没有 那就默认1把
				if(this._spellid <= 0){
					this._spellid = 2;
				}
				this._spellTemp = Template.getSkillsTempById(this._spellid);
			}
		}
		
		public finalize():void{
			this._targetUnit = null;
			this._sceneObjectMgr.selectOid = 0;
			this._nextUpdateTime = 0;
			super.finalize();
		}
		
	}
}