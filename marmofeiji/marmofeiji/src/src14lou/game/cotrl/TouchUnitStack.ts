/**
* 触碰生物对象 
*/
module game.cotrl {
	export class TouchUnitStack extends BaseStack {

		static COLLECT_DIS_QUEST: number = 2;
		static COLLECT_DIS_OTHER: number = 5;

		private _touchGuid: string;
		private _timeOut: number = 2000;
		private _nextUpdatTime: number = 0;

		constructor(app: AppBase, guid: string) {
			super(app);
			this._touchGuid = guid;
		}

		public initialize(): boolean {
			if (!super.initialize()) {
				return false;
			}
			//没有目标
			if (!this._touchGuid || !this._touchGuid.length) {
				return false;
			}
			let mUnit: game.object.Unit = this._sceneObjectMgr.mainUnit;
			//传送了 | 自己挂了 退出攻击栈
			if (!mUnit || mUnit.isDied) {
				return false;
			}
			this._controller.sendStopMoving();
			return true;
		}

		public doReady(): void {

		}

		public update(diff: number): boolean {
			//释放了 退出栈
			if (super.update(diff)) {
				return true;
			}
			let cur_time: number = Laya.timer.currTimer;
			if (this._nextUpdatTime > 0 && this._nextUpdatTime > cur_time) return false;
			this._nextUpdatTime = cur_time + 200;
			//找显示对象
			var targetUnit: game.object.Unit = this._sceneObjectMgr.getUnitByGuid(this._touchGuid);
			if (!targetUnit) {
				if (this._timeOut > diff) {
					this._timeOut -= diff;
					return false;
				}
				else {
					return true;
				}
			}

			let mUnit: game.object.Unit = this._sceneObjectMgr.mainUnit;
			//传送了 | 自己挂了 退出攻击栈
			if (!mUnit || mUnit.isDied) {
				return true;
			}

			//选中对象
			if (!targetUnit.isGameObject && this._sceneObjectMgr.selectOid != targetUnit.oid) {
				if (!(this._sceneObjectMgr.selectOid == null || this._sceneObjectMgr.selectOid == 0)) {
					this._controller.stack(new SelectTargetSack(this._app, null));
					return false;
				}
				this._controller.stack(new SelectTargetSack(this._app, targetUnit));
				return false;
			}
			let targetEntry: number = targetUnit.entryid;
			if (targetUnit.isGameObject) {
				//距离太远
				let dis: number = mUnit.Distance(targetUnit);
				let minDis: number = TouchUnitStack.COLLECT_DIS_QUEST;
				if (dis > minDis) {
					this._controller.setIsAutoMoving(true, dis);
					this._controller.stack(new GotoDstStack(this._app, targetUnit.pos.x, targetUnit.pos.y, minDis));
					return false;
				}
				this._controller.stack(new UseGoStack(this._app, targetUnit));
				return true;
			}
			//如果是npc就直接弄npc，如果不是就砍
			else if (targetUnit.isNpc) {
				//距离太远了，就退出吧。
				var dis: number = mUnit.Distance(targetUnit);
				let need_dis: number = mUnit.isRiding ? FindTouchUnitStack.MAX_NPCTOUCH_MOUNT_DISTANCE : FindTouchUnitStack.MAX_NPCTOUCH_DISTANCE;
				if (Math.floor(dis) > need_dis) {
					// logd("touch unit stack far:",dis);
					return true;
				}
				//如果还在移动 那就停止
				if (mUnit.isMoving) {
					this._controller.sendStopMoving();
				}
				//朝向处理下
				mUnit.faceTarget(targetUnit);
			}
			
			return true;
		}
	}
}