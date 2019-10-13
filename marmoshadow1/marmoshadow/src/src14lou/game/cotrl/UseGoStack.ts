/**
* 使用游戏对象 
*/
module game.cotrl {
	export class UseGoStack extends BaseStack {

		/*目标对象*/
		private _targetUnit: game.object.Unit;
		/*是否面向目标*/
		private _turnToTarget: boolean;
		/*读条时间*/
		private _prepareTime: number;
		/*采集CD*/
		private _cd: number;
		/*传输消耗*/
		private _consume: number = 100;
		/*存储读条时间*/
		private _prepareTimeTemp: number; //多次采集使用
		private _localCollectTime: number;
		private _entry: number = 0;
		private _hasCollecting: boolean = false;
		private _mapid: number = -1;

		constructor(app: AppBase, target: game.object.Unit, turnToTarget: boolean = true, hasCollecting: boolean = true) {
			super(app);
			this._targetUnit = target;
			this._turnToTarget = turnToTarget;
			this._hasCollecting = hasCollecting;
		}

		public initialize(): boolean {
			if (!super.initialize()) {
				return false;
			}

			let mUnit: game.object.Unit = this._sceneObjectMgr.mainUnit;
			if (!mUnit || mUnit.isDied) {
				return false;
			}

			if (!this._targetUnit || !this._targetUnit.isGameObject /*|| !this._target.canUse*/)
				return false;

			this._mapid = -1;
			this._entry = this._targetUnit.entryid;
			let mpx: number = mUnit.pos.x;
			let mpy: number = mUnit.pos.y;
			let tpx: number = this._targetUnit.pos.x;
			let tpy: number = this._targetUnit.pos.y;
			//需要读条的 才需要延迟时间
			let delay: number = this.needDuTiaoTime();
			this._prepareTimeTemp = Laya.timer.currTimer + delay; //读条时间
			//停止移动
			this._controller.sendStopMoving();
			if (this._turnToTarget) {
				//面对目标
				mUnit.faceTarget(this._targetUnit);
			}
			return true;
		}

		//读条时间 有时间代表需要读条
		private needDuTiaoTime(): number {
			return 0;
		}

		/*目标被采集特效&采集进度条*/
		private collecting(): void {
			this._hasCollecting = false;
			this._prepareTime = this._prepareTimeTemp + this._consume;
			let need_time: number = this.needDuTiaoTime();
			if (this._prepareTime > 0 && need_time > 0) {
				this._controller.collecting(ACotrller.COLLECT_TYPE_COLLECT, need_time);
			}
		}


		public update(diff: number): boolean {
			//释放了 退出栈
			if (super.update(diff)) {
				return true;
			}
			if (!this._targetUnit)
				return true;
			if (this._cd > diff) {
				//采集cd中
				this._cd -= diff;
				return false;
			}
			this._cd = 200;

			if (this._targetUnit.isDied) {
				//下一个目标
				this._controller.exec(new FindTouchUnitStack(this._app, this._targetUnit.mapid, this._targetUnit.pos.x, this._targetUnit.pos.y,
					this._targetUnit.entryid, Unit.TYPE_GAMEOBJECT));
				//清空
				this.stack(this._controller, new SelectTargetSack(this._app, null));
				this._targetUnit = null;
				return true;
			}

			if (this._hasCollecting && this._prepareTimeTemp > 0) {
				if (this._mapid == -1)
					this._mapid = this._sceneObjectMgr.mapAssetInfo.id;
				else {
					if (this._mapid != this._sceneObjectMgr.mapAssetInfo.id) return true;
				}
				this.collecting();
				return false;
			}

			//读条
			let cur_time: number = Laya.timer.currTimer;
			if (this._prepareTime > cur_time) {
				return false;
			}
			return true;
		}
		

		public finalize(): void {
			//如果是选中的是本对象
			if (this._targetUnit && this._targetUnit.oid == this._sceneObjectMgr.selectOid) {
				this._sceneObjectMgr.selectOid = 0;
			}
			super.finalize();
			this._prepareTime = 0;
			this._controller.collectingEnd(ACotrller.COLLECT_TYPE_COLLECT);
			this._targetUnit = null;
		}
	}
}