/**
* 挂机管理 
*/
module game.cotrl {
	export class PluginsMgr {

		//无操作多长时间 单位毫秒
		static GUAJI_NO_OPT_TIME: number = 60000;
		static QUEST_NO_OPT_TIME: number = 3000;
		//拾取东西间隔检测时间 加保险
		static PICK_TIME_LEN: number = 20000;
		//频率控制
		static GUAJI_INTEL: number = 2000;

		////////////状态//////////////

		/*是否挂机中*/
		private _isHangUp: boolean = false;
		//指定挂机怪
		private _attackUnitEntry: number = 0;
		get attackUnitEntry(): number {
			return this._attackUnitEntry;
		}
		/////////////////////////

		//上一次操作时间
		public lastOptTime: number = 0;
		//栈空闲时间
		private _stackFreeTime: number = 0;
		//下一次捡东西时间
		private _nextPickTime: number = 0;
		//下次战斗时间
		private _nextFightTime: number = 0;

		//是否需要在无操作的时候去做些什么
		public isNeedDoOnFreeTime: boolean = true;

		// 应用程序引用
		protected _app: AppBase;
		constructor(app: AppBase) {
			this._app = app;
		}

		public get isHangUp(): boolean {
			return this._isHangUp;
		}

		//开始挂机
		public start(attack_unit_entry: number = 0): void {
			this._isHangUp = true;
			this._attackUnitEntry = attack_unit_entry;
			this._stackFreeTime = PluginsMgr.GUAJI_INTEL;
		}
		//停止挂机
		public stop(): void {
			this._isHangUp = false;
			this._attackUnitEntry = 0;
		}

		//设置下次拾取检测时间
		public setNextPickTime(): void {
			this._nextPickTime = Laya.timer.currTimer + PluginsMgr.PICK_TIME_LEN;
		}

		//心跳
		public update(diff: number): void {
			let cur_time: number = Laya.timer.currTimer;
			let contrller: ACotrller = this._app.aCotrller;
			let sceneObjectMgr: SceneObjectMgr = this._app.sceneObjectMgr;
			//是否在空閑狀態下
			if (!sceneObjectMgr.mapAssetInfo || !sceneObjectMgr.mapAssetInfo.isInited || contrller.isTeleporting ||
				!contrller.canAttack || !contrller.canMove) {
				this._stackFreeTime = 0;
				return;
			}
			//如果还有栈 但是太久没捡东西了 那么看下有没有东西捡咯
			let jusPick: boolean = false;
			if (!contrller.isStackFree()) {
				let diffPickTime: number = this._nextPickTime ? this._nextPickTime - cur_time : 0;
				//但是如果现在是跟玩家在pk 那么当然不能捡啦
				let attackPlayer: boolean = sceneObjectMgr.selectUnit ? sceneObjectMgr.selectUnit.isPlayer : false;
				if (diffPickTime < 0 && !attackPlayer) {
					jusPick = true;
				}
				else {
					this._stackFreeTime = 0;
					return;
				}
			}
			//控制下频率
			this._stackFreeTime += diff;
			if (this._stackFreeTime < PluginsMgr.GUAJI_INTEL) return;
			//挂机状态下
			if (this._isHangUp) {
				this._nextFightTime += diff;
				this.doHangUp(jusPick);
			}
			else if (this.isNeedDoOnFreeTime) {
				//多久没动后就开始自动挂机
				let diffTime: number = cur_time - this.lastOptTime;
				if (diffTime > PluginsMgr.QUEST_NO_OPT_TIME) {
					console.log("人物停止7")
					contrller.pluginsStart();
				}
			}
		}

		/**
		 * 做挂机该做的事（捡东西或攻击）
		 * @param justPick 只是要捡东西 默认false
		 */
		private doHangUp(justPick: boolean = false): void {
			let sceneObjectMgr: SceneObjectMgr = this._app.sceneObjectMgr;
			//如果有战利品 就先捡战利品
			let needPickALl: boolean = false;
			let pick_dis: number = 40;

			// //时间到了就发起挑战
			// if(this._nextFightTime >= 50){
			// 	if(this._app.sceneObjectMgr.mapid != 27)
			// 		this._app.aCotrller.sendTeleport(27,20,20,true,false,false);
			// 	this._nextFightTime = 0;
			// 	return;
			// }
			this.autoMove();
		}

		//四处走动
		public autoMove(): void {
			if (this._app.sceneObjectMgr.mapInfo && this._app.sceneObjectMgr.mapInfo.inWorldMap())
				this.gotoRandomMovePoint();
		}
		//随机走动点
		private gotoRandomMovePoint(): void {
			let mainUnit: Unit = this._app.sceneObjectMgr.mainUnit;
			if (!mainUnit) return;
			let curMapid: number = this._app.sceneObjectMgr.mapid;
			let all_creatures: any[] = Template.data["tb_questpoint"];
			let arr: any[] = [];
			if (all_creatures) {
				let a_c_len: number = all_creatures.length;
				for (let i: number = 0; i < a_c_len; i++) {
					let c_obj: any = all_creatures[i];
					if (!c_obj || c_obj.map_id != curMapid) continue;
					arr.push(c_obj);
				}
			}
			if (!arr.length) return;

			let px: number = 0;
			let py: number = 0;
			let rand: number = MathU.randomRange(0, arr.length - 1);
			if (rand >= 0 && arr[rand]) {
				let e_obj: any = arr[rand];
				let e_pos = this._app.aCotrller.getRandomNearPos(e_obj.pos_x, e_obj.pos_y, 0, 5);
				px = e_pos[0];
				py = e_pos[1];
			}

			//跑到这个点后
			if (px > 0 && py > 0) {
				this._app.aCotrller.moveToDst(px, py, curMapid);
				// this._app.aCotrller.exec(new FindTouchUnitStack(this._app, curMapid, px, py, targer_id, target_type, null, true));
			}
		}

		//更新攻击对象
		public updateFightTarget(): void {
			//只有挂机状态下才触发
			if (!this._isHangUp) return;
			// logd("updateFightTarget")
			this.doHangUp();//重新洗牌
		}

		//自动攻击
		public autoAttack(): void {
			//获取攻击对象
			let targetUnit: Unit;
			let mapid: number = this._app.sceneObjectMgr.mapid;
			if (this._attackUnitEntry > 0) {
				targetUnit = this._app.sceneObjectMgr.getUnitByEntry(this._app.sceneObjectMgr.mainUnit, this._attackUnitEntry);
			}
			else {
				targetUnit = this._app.aCotrller.getAttackUnit();
			}
			if (targetUnit) {
				this._app.aCotrller.attackUnit(targetUnit);
			}
		}

		//释放
		public dispose(): void {

		}
	}
}