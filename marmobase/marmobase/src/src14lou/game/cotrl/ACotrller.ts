/**
* 栈控制器 
*/
module game.cotrl {
	export class ACotrller extends Laya.EventDispatcher {
		///////////////////// 自定义事件 //////////////////////////////////////
		static READY_QUEST_COMPLETE: string = 'READY_QUEST_COMPLETE';	//准备完成任务
		static COLLECTING: string = 'COLLECTING';						//采集事件
		static COLLECTING_END: string = 'COLLECTING_END';				//结束采集事件
		static UPDATE_HANGUP_STATE: string = "update_hangup_state";		//更新挂机状态
		static UPDATE_AUTOWALK_STATE: string = "update_autowalk_state"; //更新自动寻路状态
		static TELEPORT_STATE_CHANGE: string = 'TELEPORT_STATE_CHANGE';	//传送状态发生变化
		static INSTACNE_EXIT_EVENT: string = "INSTACNE_EXIT_DO";		//退出副本
		static SHOW_ERROR_TIPS: string = "SHOW_ERROR_TIPS";				//显示错误提示
		static BEATEN_BY_PLAYER: string = "BEATEN_BY_PLAYER";			//受玩家攻击
		static OPEN_PANEL: string = "OPEN_PANEL";						//打开某界面
		static CLOSE_PANEL: string = "CLOSE_PANEL";						//关闭某界面
		static UPDATE_FIGHT_STATE: string = "update_fight_state";		//更新战斗状态
		//技能cd 更新事件
		public static UPDATE_SPELL_CD: string = "update_spell_cd";

		static USE_PANEL_FUNC: string = "use_panel_func";				//调用某个界面的方法
		//采集条类型
		static COLLECT_TYPE_COLLECT: number = 0;//采集中
		//采集类型时间延迟
		static COLLECT_QUEST_TIME: number = 1000;//任务
		
		//是否进行挂机
		public ishangup:Boolean = false;
		/**
		 * 允许pk的等级
		 */
		public static NEW_BIRD_LEVEL: number = 20;
		/**
		 * 新手保护地图
		 */
		public static NEW_BIRD_MAP: number = 2;

		//行为状态
		static BEHAVIOR_STATE_NONE: number = 0;//无行为
		static BEHAVIOR_STATE_QUEST: number = 1;//做任务中
		static BEHAVIOR_STATE_HANGUP: number = 2;//挂机中

		/** 当前行为状态*/
		private _curBehaviorState: number = 0;

		

		/*模式*/
		private _isLocked: boolean = false;
		get isLocked(): boolean {
			return this._isLocked;
		}

		/*传送中*/
		private _isTeleporting: boolean = false;
		public get isTeleporting(): boolean {
			return this._isTeleporting;
		}

		public set isTeleporting(value: boolean) {
			this._isTeleporting = value;
			this.event(ACotrller.TELEPORT_STATE_CHANGE);
		}

		/**
		 * 是否自动寻路中
		 */
		private _isAutoMoving: boolean = false;
		private _isNeedMountUp: boolean = false;//是否需要上坐骑
		public get isAutoMoving(): boolean {
			return this._isAutoMoving;
		}
		public setIsAutoMoving(value: boolean, dis?: number) {
			//寻路超过15码 才需要上坐骑 并且不在pk地图里
			let mapInfo: MapInfo = this._app.sceneObjectMgr.mapInfo;
			this._isNeedMountUp = value && dis > 15 && mapInfo && !mapInfo.inPkMap();

			if (this._isAutoMoving == value) return;
			this._isAutoMoving = value;
			this.event(ACotrller.UPDATE_AUTOWALK_STATE);
		}

		// 移动延迟
		moveDelay: number = 0;

		/*行走、攻击、游戏对象使用、NPC碰触分类行为码*/
		private _moveStacks: Array<BaseStack> = new Array<BaseStack>();
		/**
		 * 最后插入攻击栈的时间(防止挂机停止,干道寻路有bug)
		 */
		public lastStackAttack: number = 0

		///////////////////// 自动挂机相关 //////////////////////////////////////
		private _pluginsMgr: PluginsMgr;
		/**
		 * 挂机管理器
		 */
		public get pluginsMgr(): PluginsMgr {
			return this._pluginsMgr;
		}

		private _selectTimeOut: number = 0;
		//上一次移动转向
		private _lastMoveToward: number = -1;
		//最后的攻击者oid
		private _lastAttackerOid: number = 0;
		public lastAttackerName: string = "";
		public lastAttackerType: string = "";
		public lastAttackerLv: number = 0;
		//最后被攻击时间
		private _lastAttackedTime: number = 0;
		public lastAttackedTimeByPlayer: number = 0;

		private _isDied: boolean = false;
		//点击停止挂机次数
		private _clickStopGuaJiCount: number = 0;
		//点击时效性
		private _clickStopGuaJiLoseTime: number = 0;

		// 应用程序引用
		private _app: AppBase;
		constructor(app: AppBase) {
			super();
			this._app = app;
			this._pluginsMgr = new PluginsMgr(app);

			// this.addMainUnitLiveEvent();
			let sceneObjMgr: SceneObjectMgr = this._app.sceneObjectMgr;
			sceneObjMgr.on(SceneObjectMgr.MAINUNIT_UPDATE, this, this.onMainUnitUpdate);
			sceneObjMgr.on(SceneObjectMgr.MAP_TELEPORT, this, this.intoMap);

			sceneObjMgr.on(SceneObjectMgr.DELETE_OBJECT, this, this.onDeleteObject);
			this.onMainUnitUpdate();
		}

		//主玩家
		private onMainUnitUpdate(): void {
			let mainUnit = this._app.sceneObjectMgr.mainUnit;

		}

		//对象移除
		private onDeleteObject(obj: GuidObject) {
			if (!obj) return;
			//检验下 如果是缓存的攻击对象被移除了 那么久释放重新选择
			if (this._attackedUnit && this._attackedUnit.oid == obj.oid) {
				this._attackedUnit = null;
			}
		}

		//进入新地图
		private intoMap(newMapid: number): void {
			if (!newMapid) return;

		}

		/**
		 * 挂起模式 
		 */
		public lock(): void {
			this._isLocked = true;
		}

		/**
		 * 取消挂起模式 
		 */
		public unLock(): void {
			this._isLocked = false;
		}

		//是否挂机中
		public get isHangUp(): boolean {
			return this._curBehaviorState == ACotrller.BEHAVIOR_STATE_HANGUP;
		}

		private _isFightStart: boolean = false;
		//是否战斗中
		public get inFighting(): boolean {
			return this.lastAttackedTime > 0 && this.lastAttackedTime + 5000 > Laya.timer.currTimer;
		}

		//最后一次攻击时间
		public get lastAttackedTime(): number {
			return this._lastAttackedTime;
		}
		public set lastAttackedTime(v: number) {
			//触发进入战斗中
			if (!this.inFighting)
				this.event(ACotrller.UPDATE_FIGHT_STATE, 1);

			this._lastAttackedTime = v;
			this._isFightStart = true;
		}

		/**
		 * 获取当前行为状态 
		 */
		public get curBehaviorState(): number {
			return this._curBehaviorState;
		}
		/**
		 * 设置当前行为状态 
		 */
		public set curBehaviorState(value: number) {
			let oldState: number = this._curBehaviorState;
			if (value == oldState) return;
			//更新状态
			this._curBehaviorState = value;
			switch (value) {
				case ACotrller.BEHAVIOR_STATE_QUEST://做任务中
					if (oldState == ACotrller.BEHAVIOR_STATE_HANGUP) {
						//如果是挂机中  那么就停止
						this.pluginsStop(true, true, true, value);
					}
					break;
				case ACotrller.BEHAVIOR_STATE_NONE://无状态
					if (oldState == ACotrller.BEHAVIOR_STATE_HANGUP) {
						//如果是挂机中  那么就停止
						this.pluginsStop();
					}
					else if (oldState != value) {//跟现在状态不一样
					
						this.stop();
					}
					break;
				case ACotrller.BEHAVIOR_STATE_HANGUP://挂机中
				console.log("人物停止2")
					this.pluginsStart();
					break;
			}

		}


		/**
		 * 开始挂机
		 * @param isAuto 是否需要抛事件  true 抛  false 不抛
		 * @param callStopMove 是否需要发包停止移动
		 * @param unit_entry 指定怪模板id
		 * 
		 */
		public pluginsStart(isAuto: boolean = true, callStopMove: boolean = true, unit_entry: number = 0): void {
			//挂起模式
			if (this._isLocked) return;
			//if(this._pluginsMgr.isHangUp && this._pluginsMgr.attackUnitEntry == unit_entry){
			//	return;
			//}
			//释放所有栈
			console.log("停止状态2")
			this.stop(callStopMove);
			this._curBehaviorState = ACotrller.BEHAVIOR_STATE_HANGUP;
			this._pluginsMgr.start(unit_entry);
			//需要抛事件
			if (isAuto) {
				this.event(ACotrller.UPDATE_HANGUP_STATE);
			}
		}

		/**
		 * 停止挂机
		 * @param isAuto	是否是 主动的 需要抛事件
		 * @param callStopMove 是否需要停止移动
		 * @param isNeedFinaStack 是否需要释放所有栈
		 * @param state 指定状态
		 */
		public pluginsStop(isAuto: boolean = true, callStopMove: boolean = true, isNeedFinaStack: boolean = true, state: number = 0): void {

			this._curBehaviorState = state;
			this._pluginsMgr.stop();
			if (state == 0) {
				this._clickStopGuaJiCount = 0;
				this._clickStopGuaJiLoseTime = 0;
			}
			//释放所有栈
			if (isNeedFinaStack){
			
				this.stop(callStopMove);
			}
				
			//需要抛事件
			if (isAuto) {
				this.event(ACotrller.UPDATE_HANGUP_STATE);
			}
		}

		/**
		 * 执行新动作栈，返回是否执行成功
		 * @param newActionStack 动作栈
		 */
		public exec(newActionStack: BaseStack): boolean {
			if (this._isLocked)
				return false;
			this.stacksFinalize(this._moveStacks);
			return this.stack(newActionStack);
		}

		/**
		 * 加入新的动作栈， 返回是否插入成功
		 * 栈，直接堆积在后面
		 * @param newActionStack
		 */
		public stack(newActionStack: BaseStack): boolean {

			//先插入再说
			this._moveStacks[this._moveStacks.length] = newActionStack;
			//如果初始化失败，则移除
			if (!newActionStack.initialize()) {
				this._moveStacks.pop()
				if (!newActionStack.isFinalize)
					newActionStack.finalize();
				return false;
			}

			if (newActionStack instanceof AttackStack) {
				this.lastStackAttack = Laya.timer.currTimer;
			}
			else if (newActionStack instanceof WaitTeleteportStack) {
				//如果是等待传送栈 则清理攻击栈
				this.finalizeAttackStack();
			}
			return true;
		}

		/**
		 * 停止所有行为栈
		 * @param callStopMove 是否需要发包停止移动
		 * 
		 */
		public stop(callStopMove: boolean = true): void {
			this.stacksFinalize(this._moveStacks);
			console.log("选择停止4");
			if (callStopMove)
				this.sendStopMoving();
		}

		/*释放栈*/
		private stacksFinalize(list: Array<BaseStack>): void {
			var teleteportStacks: Array<BaseStack> = new Array<BaseStack>();
			var len: number = list.length;
			for (var i: number = 0; i < len; i++) {
				if (list[i] instanceof WaitTeleteportStack) {
					teleteportStacks[teleteportStacks.length] = list[i];
				} else {
					if (!list[i].isFinalize)
						list[i].finalize();
				}
			}
			list.length = 0;
			len = teleteportStacks.length;
			for (i = 0; i < len; i++) {
				list[list.length] = teleteportStacks[i];
			}
		}

		/**
		 *清除移动栈 (慎用)
		 * 
		 */
		public finalizeMoveStack(): void {
			for (var i: number = 0; i < this._moveStacks.length; i++) {
				if (!this._moveStacks[i].isFinalize && !(this._moveStacks[i] instanceof WaitTeleteportStack)
					&& !(this._moveStacks[i] instanceof AttackStack) && !(this._moveStacks[i] instanceof SelectTargetSack)) {
					this._moveStacks[i].finalize();
					this._moveStacks.splice(i, 1);
					i--;
				}
			}
		}

		/**
		 *清除攻击栈 (慎用)
		 * 
		 */
		public finalizeAttackStack(): void {
			for (var i: number = 0; i < this._moveStacks.length; i++) {
				if (!this._moveStacks[i].isFinalize && this._moveStacks[i] instanceof AttackStack) {
					this._moveStacks[i].finalize();
					this._moveStacks.splice(i, 1);
					i--;
				}
			}
		}

		/**
		 *清除其他栈 除了转向栈 (慎用)
		 * 
		 */
		public finalizeStackExceptMoveToward(): void {
			for (var i: number = 0; i < this._moveStacks.length; i++) {
				if (!this._moveStacks[i].isFinalize && !(this._moveStacks[i] instanceof MoveTowardStack)) {
					this._moveStacks[i].finalize();
					this._moveStacks.splice(i, 1);
					i--;
				}
			}
		}

		/**
		 * 当前栈类型
		 */
		public lastStackIsType(cc: any): boolean {
			if (this._moveStacks.length)
				return this._moveStacks[this._moveStacks.length - 1] instanceof cc;
			return false;
		}

		/**
		 *栈里面是否有指定的类型 
		 * @param c
		 * @return 
		 * 
		 */
		public haveStack(c: any): boolean {
			for (var i: number = 0; i < this._moveStacks.length; i++) {
				if (this._moveStacks[i] instanceof c)
					return true;
			}
			return false;
		}

		/**
		 *栈里面是否有传送栈
		 * @param c
		 * @return 
		 * 
		 */
		public haveTeleStack(): boolean {
			for (var i: number = 0; i < this._moveStacks.length; i++) {
				if (this._moveStacks[i] instanceof GotoMapPosStack || this._moveStacks[i] instanceof GotoMapStack || this._moveStacks[i] instanceof GotoTeleStack)
					return true;
			}
			return false;
		}

		/**
		 *栈里面是否有移动栈
		 * @param c
		 * @return 
		 * 
		 */
		public haveMoveStack(): boolean {
			for (var i: number = 0; i < this._moveStacks.length; i++) {
				if (this._moveStacks[i] instanceof FindTouchUnitStack || this._moveStacks[i] instanceof BaseMoveStack)
					return true;
			}
			return false;
		}

		/**
		 * 获取某种栈 
		 * @param c
		 * @return 
		 * 
		 */
		public getSomeStack(c: any): BaseStack {
			for (var i: number = 0; i < this._moveStacks.length; i++) {
				if (this._moveStacks[i] instanceof c)
					return this._moveStacks[i];
			}
			return null;
		}

		/**
		 * 栈空闲的
		 */
		public isStackFree(): boolean {
			return this._moveStacks.length == 0;
		}

		/**
		 * 只有攻击栈
		 */
		public justHaveAttackStack(): boolean {
			let haveAttack: boolean = false;
			for (var i: number = 0; i < this._moveStacks.length; i++) {
				if (!this._moveStacks[i]) continue;
				if (this._moveStacks[i] instanceof AttackStack)
					haveAttack = true;
				else
					return false;
			}
			return haveAttack;
		}

		public traceStack(): string {
			var str: string = "";
			for (var i: number = 0; i < this._moveStacks.length; i++) {
				str += typeof (this._moveStacks[i]) + "----\r";
			}
			return str;
		}

		/**
		 * 心跳 
		 */
		public update(diff: number): void {
			if (this.moveDelay > 0) {
				this.moveDelay -= diff;
				// logd('_moveDelay', this.moveDelay);
			}
			let mainUnit = this._app.sceneObjectMgr.mainUnit;
			mainUnit && (mainUnit.moveDelay = this.moveDelay > 0);
			//移动栈
			this.moveStacksUpdate(diff);
			//挂机
			if(this.ishangup){
				console.log("进入挂机");
				this._pluginsMgr.update(diff);
			}
			

			let cur_time: number = Laya.timer.currTimer;

			//检查移动状态
			if (this._isAutoMoving) {
				let isMoveing: boolean = this.haveMoveStack();
				if (!isMoveing) {//没有移动栈了 自动寻路停止
					this.setIsAutoMoving(false);
				}
			}

			//检测战斗状态
			if (this._isFightStart && !this.inFighting) {
				this._isFightStart = false;
				//触发脱离战斗
				this.event(ACotrller.UPDATE_FIGHT_STATE, 2);
			}


			//清理点击挂机操作 时效性
			if (this._clickStopGuaJiLoseTime > 0 && this._clickStopGuaJiLoseTime < cur_time) {
				this._clickStopGuaJiCount = 0;
				this._clickStopGuaJiLoseTime = 0;
			}

			//打印栈
			// logd("----trace stacd------\r",this.traceStack());
		}

		// 获取当前栈
		get curStack(): BaseStack {
			return this._moveStacks[this._moveStacks.length - 1];
		}

		/*移动栈更新*/
		private moveStacksUpdate(diff: number): void {
			var udDiff: number = diff;
			//移动栈
			var startLen: number = this._moveStacks.length;
			if (startLen > 0) {
				var lastStack: BaseStack = this._moveStacks[startLen - 1];
				while (lastStack) {
					var len_begin: number = this._moveStacks.length;
					if (lastStack.update(udDiff)) {
						if (!lastStack.isFinalize)
							lastStack.finalize();
						//产生了新栈
						var hasNewStack: Boolean = len_begin != this._moveStacks.length;
						//有可能产生新栈
						var idx: number = this._moveStacks.lastIndexOf(lastStack)
						if (idx != -1)
							this._moveStacks.splice(idx, 1);
						lastStack = null;
						if (!hasNewStack) {
							//刷新下一个栈
							var curLen: number = this._moveStacks.length;
							if (curLen > 0) {
								lastStack = this._moveStacks[curLen - 1];
								if (curLen < startLen) {
									//老栈使用diff
									udDiff = diff;
								}
								else {
									//新栈
									udDiff = 0;
								}
							}
						}
					}
					else {
						lastStack = null;
					}
				}
			}

			if (this.moveDelay <= 0) {
				//如果没有任何栈行为了 并且还处于遥感控制中 那么就激活遥感
				let mLen: number = this._moveStacks.length;
				if (mLen == 0) {
					//没有就插入
					this.continueMoveToward();
				}
				else {
					//判断下是否有遥感栈存在 有的话 就更新下朝向
					let moveTowardStack: BaseStack = this._moveStacks[mLen - 1];
					if (moveTowardStack instanceof MoveTowardStack) {
						moveTowardStack.setToward(this._lastMoveToward);
					}
				}
			}
		}

		/**
		 * 移动到目的（移动 请调用此接口）
		 * @param dstX 目标坐标x
		 * @param dstY 目标坐标y
		 * @param dstMapid 目标地图
		 * @param state	指定状态
		 * 
		 */
		public moveToDst(dstX: number, dstY: number, dstMapid: number = 0, state: number = 0): boolean {
			//停止其他栈 先这样
		
			this.pluginsStop(true, false, true, state);
			this._pluginsMgr.lastOptTime = Laya.timer.currTimer;
			let mainUnit: Unit = this._app.sceneObjectMgr.mainUnit;
			if (!mainUnit || mainUnit.isDied) return;
			let mapid: number = mainUnit.mapid;
			//如果有设地图了			
			if (dstMapid > 0) this.setIsAutoMoving(true, MathU.getDistance(mainUnit.pos.x, mainUnit.pos.y, dstX, dstY));
			if (dstMapid <= 0 || mapid == dstMapid) {
				return this.exec(new GotoDstStack(this._app, dstX, dstY, 1.5));
			}
			else {
				return this.exec(new GotoMapPosStack(this._app, dstMapid, dstX, dstY));
			}			
		}

		/**
		 * 直接传送到某地图的某传送点
		 * @param mapid 
		 */
		public teleToMapTeleportPos(mapid: number): boolean {
			if (!Template.data) return false;
			let tox: number = 0;
			let toy: number = 0;
			if (mapid == 1) {
				tox = 54;
				toy = 26;
			}
			else {
				let teles: any[] = Template.data["tb_teleport"];
				if (teles && teles.length) {
					for (let i: number = 0; i < teles.length; i++) {
						let tele_data: any = teles[i];
						if (!tele_data) continue;
						if (tele_data.dst_map_id == mapid) {
							tox = tele_data.dst_pos_x;
							toy = tele_data.dst_pos_y;
							break;
						}
					}
				}
			}

			if (tox > 0 && toy > 0) {
				this.sendTeleport(mapid, tox, toy);
				return true;
			}

			return false;
		}

		/**
		 * 直接传送到指定地图，并寻路到该地图的某点
		 * @param dstX 目标坐标x
		 * @param dstY 目标坐标y
		 * 
		 */
		public telAndMoveToDst(dstX: number, dstY: number, dstMapid: number = 0): boolean {
			//停止其他栈 先这样
			this.pluginsStop(true, false);
			this._pluginsMgr.lastOptTime = Laya.timer.currTimer;
			let mainUnit: Unit = this._app.sceneObjectMgr.mainUnit;
			if (!mainUnit || mainUnit.isDied) return false;
			this.exec(new GotoMapPosStack(this._app, dstMapid, dstX, dstY, false, true));
			// let mapid: number = mainUnit.getMapId();
			// if (dstMapid > 0 && mapid != dstMapid) {
			// 	let px = 0;
			// 	let py = 0;
			// 	let teles: any[] = Template.data["tb_teleport"];
			// 	if (teles && teles.length) {
			// 		for (let i: number = 0; i < teles.length; i++) {
			// 			let tele_data: any = teles[i];
			// 			if (!tele_data) continue;
			// 			if (tele_data.dst_map_id == dstMapid) {
			// 				px = tele_data.dst_pos_x;
			// 				py = tele_data.dst_pos_y;
			// 				break;
			// 			}
			// 		}
			// 	}
			// 	this._app.aCotrller.sendTeleport(dstMapid, px, py, true, true, true)
			// }
			// else{
			// 	this.exec(new GotoDstStack(this._app, dstX, dstY, 1.5));
			// }
		
			return true;
		}

		private _moveInfo: number[];
		// 真正执行移动 (发包 栈调用的 慎用)
		public sendMoveTo(dstX: number, dstY: number): void {
			let mainUnit: Unit = this._app.sceneObjectMgr.mainUnit;
			if (mainUnit && !mainUnit.isDied) {
				dstX = MathU.parseInt(dstX);
				dstY = MathU.parseInt(dstY);
				//检验下 是否已经在朝目标移动了
				if (mainUnit.targetPosX == dstX && mainUnit.targetPosY == dstY && mainUnit.isMoving) {
					return;
				}

				//发移动协议
				// this.network.call_move_to(dstX, dstY);
			
	
				mainUnit.SetTargetPosX(dstX);
				mainUnit.SetTargetPosY(dstY);
				//  console.log("移动坐标:"+dstX+","+dstY);
				this._app.sceneObjectMgr.onUnitTargetPosChange(mainUnit, dstX, dstY);
			}
		}

		

		/**
		 * 移动转向	 进栈
		 * @param toward 朝向
		 */
		public moveToward(toward: number): void {
			//被锁定了
			if (this._isLocked || this.isTeleporting) return;
			this._pluginsMgr.lastOptTime = Laya.timer.currTimer;
			if (this._lastMoveToward == toward) return;//同一个方向的
			this._lastMoveToward = toward;
			let mainUnit: Unit = this._app.sceneObjectMgr.mainUnit;
			if (!mainUnit || mainUnit.isDied) return;
			this.pluginsStop(true, false);
			if (this.moveDelay > 0) return;
			//添加一个新栈
			// logd("-------------------------------------开始 转向栈");
			this.stack(new MoveTowardStack(this._app, toward, this.curBehaviorState == ACotrller.BEHAVIOR_STATE_HANGUP));
		}
		public continueMoveToward(): void {
			//被锁定了
			if (this._isLocked || this.isTeleporting || this._lastMoveToward < 0) {
				// this.showErrorTips("怎么回事");
				return;
			}
			this.stack(new MoveTowardStack(this._app, this._lastMoveToward, this.curBehaviorState == ACotrller.BEHAVIOR_STATE_HANGUP));
		}
		public stopMoveToward(): void {
			this._lastMoveToward = -1;
		}
		//是否在遥感控制中
		public inYaoGanControl(): boolean {
			return this._lastMoveToward >= 0;
		}

		/**
		 * 移动转向(发包 )
		 * @param toward 朝向
		 */
		public sendMoveToward(toward: number): void {
			if (this._isLocked || this.isTeleporting) return;
			let mainUnit: Unit = this._app.sceneObjectMgr.mainUnit;
			if (!mainUnit || mainUnit.isDied) return;
		}

		/**
		 * 停止移动
		 */
		public stopMoving(): void {
		
			let mainUnit: Unit = this._app.sceneObjectMgr.mainUnit;
			if (!mainUnit) return;
			this.finalizeMoveStack();
		
			this.sendStopMoving();
		}

		/**
		 * 停止移动(发包)
		 */
		public sendStopMoving(): void {
			this.setIsAutoMoving(false);
			let mainUnit: Unit = this._app.sceneObjectMgr.mainUnit;
			if (!mainUnit || !mainUnit.isMoving) return;
			this._pluginsMgr.lastOptTime = Laya.timer.currTimer;
			console.log("停止移动1");
			mainUnit.MoveStop();
			//发停止移动协议
			// this.network.call_move_stop(mainUnit.oid, mainUnit.pos.x, mainUnit.pos.y);
			//关闭定时器
			// logd("----------------------------------------停止移动发包", mainUnit.pos.x, mainUnit.pos.y, mainUnit.GetTargetPosX(), mainUnit.GetTargetPosY());
		}

		//选中某个对象
		public select_target(oid: number): void {
			if (!this._app.sceneObjectMgr.mainUnit) return;
			let select_oid: number = this._app.sceneObjectMgr.selectOid;
			//已经选中
			if (select_oid == oid) {
				return;
			}

			//选中这个人的过期时间，如果超过一秒了还没选中，继续选中这个对象
			//选择的对象不一样可以直接选中
			var curTime: number = Laya.timer.currTimer;
			if (select_oid == oid && this._selectTimeOut > curTime)
				return;
			this._selectTimeOut = curTime + 1000;
			//当前正在选中谁
			this._app.sceneObjectMgr.selectOid = oid;
		}





		//被攻击者
		private _attackedUnit: Unit;
		//获取可攻击unit
		public getAttackUnit(): Unit {
			let targetUnit: Unit;
			let sceneObjMgr: SceneObjectMgr = this._app.sceneObjectMgr;
			let maxDis: number = 10;//最大距离
			let mapInfo: game.data.MapAssetInfo = sceneObjMgr.mapAssetInfo;
			//不能攻击
			if (!this.canAttack) {
				this._attackedUnit = null;
				return null;
			}

			//优先击杀已选择的目标
			if (sceneObjMgr.selectOid > 0) {
				if (this._attackedUnit && !this.isFriendly(this._attackedUnit) && this._attackedUnit.oid == sceneObjMgr.selectOid
					&& !mapInfo.isObstacle(this._attackedUnit.pos.x, this._attackedUnit.pos.y)) {
					return this._attackedUnit;
				}
				targetUnit = sceneObjMgr.getUnitByOid(sceneObjMgr.selectOid);
				if (targetUnit && this.isFriendly(targetUnit)) {
					targetUnit = null;
				}
			}
			if (!targetUnit) {//没有选择目标的情况
				//如果有在攻击的对象
				if (this._attackedUnit && !this.isFriendly(this._attackedUnit) && sceneObjMgr.mainUnit.Distance(this._attackedUnit) <= maxDis
					&& !mapInfo.isObstacle(this._attackedUnit.pos.x, this._attackedUnit.pos.y)) {
					return this._attackedUnit;
				}

				//在非和平模式下，被玩家攻击时，优先选择玩家
				if (this._lastAttackerOid > 0) {
					targetUnit = sceneObjMgr.getUnitByOid(this._lastAttackerOid);
					//如果距离过大 是否友好
					if (targetUnit && (this.isFriendly(targetUnit) || sceneObjMgr.mainUnit.Distance(targetUnit) > maxDis)) {
						targetUnit = null;
					}
				}
				if (!targetUnit || targetUnit.isDied) {
					targetUnit = this.selectNearUnit();
				}
			}
			this._attackedUnit = targetUnit;
			return targetUnit;
		}

		/**
		 * 选择附近unit
		 * @param excepId 除了某id
		 */
		public selectNearUnit(excepId: number = 0): Unit {
			let targetUnit: Unit;
			let sceneObjMgr: SceneObjectMgr = this._app.sceneObjectMgr;
			let mapAssetInfo: game.data.MapAssetInfo = sceneObjMgr.mapAssetInfo;
			let mapinfo: MapInfo = sceneObjMgr.mapInfo;
			if (!mapinfo || !mapAssetInfo) return null;
			//当前玩家没有目标情况下，BOSS > 任务怪 > 其他怪
			let misDis: number = MapInfo.MAP_WORLDS.indexOf(sceneObjMgr.mapid) >= 0 ? 80 : Number.MAX_VALUE;//设置最大范围

			let inPkMap: boolean = MapInfo.MAP_PKS.indexOf(sceneObjMgr.mapid) >= 0;//在pk地图里 也可锁定玩家攻击
			let mainUnit: Unit = sceneObjMgr.mainUnit;
			let curQuestCreaterId: number = 0;
			sceneObjMgr.ForEachObject((other: any) => {
				if (!(other instanceof Unit) || (!inPkMap && other.isPlayer) || mapAssetInfo.isObstacle(other.pos.x, other.pos.y)
					|| this.isFriendly(other, mainUnit) || other.oid == excepId) return;

				let dis: number = sceneObjMgr.mainUnit.Distance(other);
				//任务怪
				if (targetUnit && targetUnit.entryid == curQuestCreaterId) {
					if (other.entryid == curQuestCreaterId && dis < misDis) {
						misDis = dis;
						targetUnit = other;
					}
				}
				else if (other.entryid == curQuestCreaterId) {
					misDis = dis;
					targetUnit = other;
				}
				//其他怪 如果在pk地图里 机器人也是可以攻击的
				else if (dis < misDis && (inPkMap || !other.isRobot)) {
					misDis = dis;
					targetUnit = other;
				}
			});

			return targetUnit;
		}

		/**
		 * 根据某生物模板id攻击某个对象
		 * @param spellid 使用哪个技能攻击
		 * @param 生物模板id 生物模板id
		 */
		public attackUnitByEntry(entry: number): void {
			let targetUnit: Unit = this._app.sceneObjectMgr.getUnitByEntry(this._app.sceneObjectMgr.mainUnit, entry);
			if (!targetUnit) return;
			this.attackUnit(targetUnit);
		}

		/**
		 * 攻击某个对象
		 * @param spellid 使用哪个技能攻击
		 * @param targetUnit 攻击对象
		 * @param showTip 是否显示路面特效
		 */
		public attackUnit(targetUnit: game.object.Unit, showTip: boolean = false): void {
			//不能攻击  友好对象
			if (!this.canAttack || this.isFriendly(targetUnit)) return;
			let sceneObjMgr: SceneObjectMgr = this._app.sceneObjectMgr;

			//有攻击对象 并且 已经选中了  在攻击中 就不用再弄攻击栈了
			if (sceneObjMgr.selectOid > 0 && sceneObjMgr.selectOid == targetUnit.oid) {
				let atkStack: AttackStack = this.getSomeStack(AttackStack) as AttackStack;
				if (atkStack && atkStack.targetOid == targetUnit.oid) {
					return;
				}
			}

			this._pluginsMgr.lastOptTime = Laya.timer.currTimer;
			this.exec(new AttackStack(this._app, targetUnit));
		}

		/**
		 * 地图id
		 * @param map
		 * @return 
		 */
		public isMapOpen(mapid: number): boolean {
			return true;
		}

		// 是否友好
		isFriendly(unit: Unit, mainUnit?: Unit, showTip: boolean = false): boolean {
			if (!unit || !unit.guid || unit.isDied)
				return true;

			if (!mainUnit && this._app)
				mainUnit = this._app.sceneObjectMgr.mainUnit;
			if (!mainUnit
				|| unit == mainUnit //对自己友好
			) {
				return true;
			}

			if (!unit.isCanAttackType) {
				//npc友好 gameobject友好 宠物一律友好
				if (unit.isPet && showTip && !unit.isPet) this.showErrorTips("不可攻击宠物");
				return true;
			}

			//如果是被锁定选中了
			if (unit.buffMgr && unit.buffMgr.lockSelect) {
				return true;
			}

			//在全模式pk地图了 一定是可以攻击的
			let uMapid: number = unit.mapid;
			if (MapInfo.MAP_PK_ALL_MODES.indexOf(uMapid) >= 0) {
				return false;
			}

			if (unit.isPlayer || unit.isRobot) {

				if (mainUnit.level < ACotrller.NEW_BIRD_LEVEL
					|| unit.level < ACotrller.NEW_BIRD_LEVEL) {
					//自己或对方是新手
					if (showTip) this.showErrorTips("您或对方处于新手保护状态");
					return true;
				}

				//判断对方是否在挂机保护中
				if (unit.isGuajibaohu) {
					if (showTip) this.showErrorTips("挂机保护中无法攻击");
					return true;
				}

				let attackMode: number = mainUnit.attackMode;
				//攻击模式
				switch (attackMode) {
					case UnitField.ATTACK_MODE_HEPING:	//和平模式
						return true;
					case UnitField.ATTACK_MODE_ALL:		//全体模式
						break;
				}
			}
			return false;
		}

		/**
		 * 获取某点附近随机点
		 * @param px 
		 * @param py 
		 * @param rangeMin 
		 * @param rangeMax 
		 */
		public getRandomNearPos(px: number, py: number, rangeMin: number = 2, rangeMax: number = 3): number[] {
			let dpx: number = px;
			let dpy: number = py;
			let ry: number = MathU.randomRange(rangeMin, rangeMax);
			let rx: number = MathU.randomRange(rangeMin, rangeMax);
			dpx += MathU.randomBoolen() ? rx : -rx;
			dpy += MathU.randomBoolen() ? ry : -ry;
			return [dpx, dpy];
		}

		//场景触碰
		public onSceneTouch(cellx: number, celly: number, hitObject: any, showTip: boolean = false): void {
			//挂起模式 或者传送中
			if (this._isLocked || this.isTeleporting) {
				// if (showTip) this.showErrorTips("场景挂起了");
				return;
			}
			// if (showTip) this.showErrorTips("触碰场景");
			// 战斗中
			if (this._app.battleProxy.battle && this._app.battleProxy.battle.onSceneTouch(cellx, celly, hitObject)) {
				return;
			}
			//是否被劫持了
			if (this._app.sceneObjectMgr.sceneStoryMgr && this._app.sceneObjectMgr.sceneStoryMgr.onSceneTouch(cellx, celly, hitObject)) return;

			let cur_time: number = Laya.timer.currTimer;
			this._pluginsMgr.lastOptTime = cur_time;
			
			//如果是挂机状态
			let isGuaJi: boolean = false;
			if (this.isHangUp) {
				isGuaJi = true;
				this._clickStopGuaJiCount++;
				this._clickStopGuaJiLoseTime = cur_time + 5000;
				if (this._clickStopGuaJiCount <= 1) {
					if (showTip) this.showErrorTips("再点击一次停止挂机");
					return;
				}
			}

			//这里搞
			if (hitObject) {//如果有触碰对象
				if (hitObject instanceof object.Unit) {
					//先判断下是否npc 游戏对象 雕像
					if (hitObject.isNpc || hitObject.isGameObject) {
						this._app.sceneObjectMgr.selectOid = hitObject.oid;
						//停止挂机
						if (isGuaJi) this.pluginsStop();
						let hit_entry: number = hitObject.entryid;
						let dpy: number = hitObject.pos.y;
						let dpx: number = hitObject.pos.x;
						this.exec(new FindTouchUnitStack(this._app, hitObject.mapid, dpx, dpy, hit_entry, hitObject.typeid, hitObject.guid))
					}
					//判断下是否友好
					else if (!this.isFriendly(hitObject, null, showTip)) {
						this.attackUnit(hitObject, true);
						this.setIsAutoMoving(false);
					}
					else if (!hitObject.isDied && !hitObject.isPet) {
						this._app.sceneObjectMgr.selectOid = hitObject.oid;
					}
				}
			}
			else {//没有  那就是触碰场景地图了
				if (!this.checkTeleportCtrl(cellx, celly))//检查是否点击了传送点
					this.moveToDst(cellx, celly);
				this._app.sceneObjectMgr.selectOid = 0;
				this.setIsAutoMoving(false);
			}
		}

		//长按场景触碰
		public onLongSceneTouch(hitObject: any ): void {
			if (this._app.battleProxy.battle && this._app.battleProxy.battle.onSceneLongTouch( hitObject)) {
				return;
			}
		}
		//检查是否点击了传送点
		private checkTeleportCtrl(cellx: number, celly: number): boolean {
			//判断下 是否需要传送
			if (this.isTeleporting) return false;
			let mainUnit: Unit = this._app.sceneObjectMgr.mainUnit;
			let mapid: number = this._app.sceneObjectMgr.mapid;
			if (!mainUnit || mapid <= 0) return false;
			let mpx: number = mainUnit.pos.x;
			let mpy: number = mainUnit.pos.y;

			let teleDatas: Array<Teleport> = MapTeleportIndex.inst.getTeleportsByMapid(mapid);
			if (!teleDatas) return false;
			let len: number = teleDatas.length;

			for (let i: number = 0; i < len; i++) {
				let tele: Teleport = teleDatas[i];
				if (!tele) continue;
				if (MathU.getDistance(cellx, celly, tele.srcPortX, tele.srcPortY) < 2) {
					//停止其他栈 先这样
					this.pluginsStop(true, false);
					this._pluginsMgr.lastOptTime = Laya.timer.currTimer;
					this.stack(new GotoTeleStack(this._app, tele.srcPortX, tele.srcPortY, tele.dstMapid, tele.dstPortX, tele.dstPortY, true));
					return true;
				}
			}


			return false;
		}

		/**
		 * 传送发包
		 * @param dstMapid 目标地图
		 * @param dstX 目标坐标x
		 * @param dstY 目标坐标y
		 * @param showTip 错误提示
		 * 
		 */
		public sendTeleport(dstMapid: number, dstX: number, dstY: number, isBattleEnd:boolean = false, showTip: boolean = false, needCheckInstance: boolean = true, needCheckMap: boolean = false, par: string = ""): boolean {
			if (dstMapid <= 0 || (dstX <= 0 && dstY <= 0)) return false;//目标地图不对 目标位置不对
			// 战斗中不能跳地图 除非是服务器通知离开战场
			if (this._app.sceneObjectMgr.mapInfo.inBattle && !isBattleEnd)return;

			if (!this.checkTeleport(needCheckInstance, dstMapid, showTip, needCheckMap)) return false;
			//如果挂机中
			if (this._pluginsMgr.isHangUp){
				this.pluginsStop(true, true, true);
			}
			this.stack(new WaitTeleteportStack(this._app, dstMapid, dstX, dstY, par));
			this.pluginsMgr.lastOptTime = Laya.timer.currTimer;
			return true;
		}

		/**
		 * 传送发包（其他副本）
		 * @param dstMapid 目标地图
		 * @param dstX 目标坐标x
		 * @param dstY 目标坐标y
		 * @param showTip 是否错误提示
		 * @param par 预留参数
		 */
		public sendTeleInstance(dstMapid: number, dstX: number, dstY: number, showTip: boolean = false, par: string = ""): boolean {
			if (dstMapid <= 0 || (dstX <= 0 && dstY <= 0)) return false;//目标地图不对 目标位置不对

			if (!this.checkTeleport(false, dstMapid, showTip)) return false;
			let mainUnit: Unit = this._app.sceneObjectMgr.mainUnit;
			if (!mainUnit) return false;
			this.pluginsStop(true, true, true);

			this.stack(new WaitTeleteportStack(this._app, dstMapid, dstX, dstY, par));
			this.pluginsMgr.lastOptTime = Laya.timer.currTimer;
			logd("----------sendTeleInstance", dstMapid, dstX, dstY);
			return true;
		}

		//退出副本
		public instanceExit(value_work?: Network, closePanel: boolean = true): void {
			//判断是否在副本中了
			let objMgr: SceneObjectMgr = this._app.sceneObjectMgr;
			if (this.isTeleporting || !objMgr.mapAssetInfo /**|| !objMgr.mapAssetInfo.isInstance*/) return;//不在副本
			//原图位置
			let mapid: number = 0;
			let pox_x: number = 0;
			let pox_y: number = 0;
			if (!mapid) {//找不到 回主城
				mapid = MapInfo.MAP_MAIN_CITY_ID;
				pox_x =	MapInfo.MAP_MAIN_CITY_POSX;
				pox_y = MapInfo.MAP_MAIN_CITY_POSY;
			}
			if (mapid <= 0 || pox_x <= 0 || pox_x <= 0) return;
			this.pluginsStop(true, true, true);
			this.stack(new WaitTeleteportStack(this._app, mapid, pox_x, pox_y, ""));
			logd("副本退出发包", mapid, pox_x, pox_y);
			this.pluginsMgr.lastOptTime = Laya.timer.currTimer - (PluginsMgr.QUEST_NO_OPT_TIME - 3000);

			//触发关闭窗口
			if (closePanel)
				this.closePanelById(0);
		}

		/**
		 *传送前的校验 
		 * @param needCheckInstance 是否需要验证当前是否副本中(踩传送点和退出活动的不需要验证)
		 * @param toMap	目标地图
		 * @return 返回能否传送
		 * @param showTip 是否错误提示
		 */
		public checkTeleport(needCheckInstance: boolean = true, toMap: number = 0, showTip: boolean = false, needCheckMap: boolean = false): boolean {
			let sceneObjMgr: SceneObjectMgr = this._app.sceneObjectMgr;
			let mainUnit: game.object.Unit = sceneObjMgr.mainUnit;
			//死亡状态不能传送
			if (!mainUnit || mainUnit.isDied)
				return false;
			//地图未开启
			if (needCheckMap && (!toMap || !this.isMapOpen(toMap))) {
				//提示
				if (showTip) this.showErrorTips("地图未开启");
				return false;
			}

			let mapTemp: Object = Template.getMapTempById(toMap);
			let toInstanceMap: boolean = mapTemp && mapTemp["map_type"] != 1;

			//在副本中无法进入另一个副本 
			if (needCheckInstance && sceneObjMgr.mapInfo && sceneObjMgr.mapAssetInfo && ((sceneObjMgr.mapAssetInfo.isInstance && toInstanceMap)
				|| (MapInfo.MAP_WORLDS.indexOf(toMap) < 0 && !sceneObjMgr.mapInfo.inWorldMap()))) {//已经在副本
				//提示
				if (showTip) this.showErrorTips("请先退出副本");
				return false;
			}

			var mUnit: Unit = sceneObjMgr.mainUnit;
			//传送中不能传送
			if (this.isTeleporting) {
				//提示
				if (showTip) this.showErrorTips("传送中");
				return false;
			}
			return true;
		}

		/**
		 * 是否允许移动
		 */
		public get canMove(): Boolean {
			let mainUnit: Unit = this._app.sceneObjectMgr.mainUnit;
			if (!mainUnit || mainUnit.isDied || mainUnit.buffMgr.lockMove) return false;
			// if(this._lockMoveTime > 0)
			// 	return false;
			// if(this.scene.mainPlayer.buffNotMove)
			// 	return false;
			return true;
		}

		/**
		 * 是否允许攻击他人
		 */
		public get canAttack(): Boolean {
			let mainUnit: Unit = this._app.sceneObjectMgr.mainUnit;
			if (!mainUnit || mainUnit.isDied || mainUnit.buffMgr.lockAttack)
				return false;
			// if(this._lockAttackTime > 0)
			// 	return false;
			// if(this.scene.mainPlayer.buffNotAttack)
			// 	return false;
			return true;
		}

		/**
		 * 是否显示路面特效
		 */
		public get canShowRoadEffect(): boolean {
			return !this.isAutoMoving && !this.isHangUp && !this.inYaoGanControl() && !this._app.sceneObjectMgr.selectOid;//!this.haveStack(MoveTowardStack);
		}

		// 准备完成任务
		readyQuestComplete(npcid: number): void {
			this.event(ACotrller.READY_QUEST_COMPLETE, npcid);
		}

		// 采集
		collecting(type?: number, delay: number = 0): void {
			this.event(ACotrller.COLLECTING, [type, delay]);
		}

		// 结束采集
		collectingEnd(type: number = 0): void {
			this.event(ACotrller.COLLECTING_END, type);
		}

		//从副本退出
		doInstanceExitEvent(): void {
			this.event(ACotrller.INSTACNE_EXIT_EVENT);
		}

		//错误提示
		showErrorTips(mess: string): void {
			this.event(ACotrller.SHOW_ERROR_TIPS, mess);
		}

		/**
		 * 打开窗口
		 * @param pageid 窗口id
		 * @param page_type 窗口类型 0二级 1顶层 2HUD 默认二级
		 */
		openPanelById(pageid: number, page_type: number = 0, openFunc?: Function): void {
			this.event(ACotrller.OPEN_PANEL, [pageid, page_type, openFunc]);
		}

		/**
		 * 关闭窗口
		 * @param pageid 窗口id 如果id 0关闭所有窗口
		 * @param page_type 窗口类型 0二级 1顶层 2HUD 默认二级
		 */
		closePanelById(pageid: number, page_type: number = 0): void {
			this.event(ACotrller.CLOSE_PANEL, [pageid, page_type]);
		}

		/**
		 * 调用某个页面的函数
		 * @param pageid 页面ID
		 * @param func 
		 * @param args 
		 */
		usePanelFunc(container: game.gui.base.PageContainer, pageid: number, func: string, args?: any[]): void {
			this.event(ACotrller.USE_PANEL_FUNC, [container, pageid, func, args]);
		}


		/*******************************************************************************
		 ****************************技能cd**********************************************
		 ********************************************************************************/
		//挂机技能配置
		public static SPELL_HANDUP_CONFIG: any[] = [2, 3, 4];//[[], [3, 4], [8, 9]];
		public static SPELL_ID_NORMAL: number = 1;//普攻
		static SPELL_SHUNYI_CONFIG: number[] = [6, 11, 51];
		//默认激活技能
		static SPELL_DEFAULT_JIHUO: number[] = [2, 3, 4, 6, 11];

		//当前使用群体技能索引
		private _useQunSpellIdx: number = 0;
		//当前使用群体技能id
		private _curUseQunId: number = 0;
		//下一使用群体技能id
		private _nextUseQunId: number = 0;
		//技能cd 
		private _spellCDArr: any[] = [];
		//公共cd
		private _commonSpellCd: number = 0;

		//是否挂机技能
		public isHandUpSpell(spellid: number): boolean {
			return ACotrller.SPELL_HANDUP_CONFIG.indexOf(spellid) >= 0;
		}

		//获取挂机技能索引
		public getHandUpSpellIdx(spellid: number): number {
			return ACotrller.SPELL_HANDUP_CONFIG.indexOf(spellid);
		}

		//获取技能公共cd
		public getSpellCommonCD(delay: number = 0): number {
			let c_cd: number = this._commonSpellCd + delay - this._app.sync.serverTimeBys * 1000;
			return c_cd < 0 ? 0 : c_cd;
		}

		//获取客户端某技能cd 剩余时间 毫秒
		public getClientSpellCDByID(spellid: number, needCommonCd: boolean = true, needCheck: boolean = true): number {
			//如果改技能还没激活 cd为0
			if (needCheck) return 0;
			let cur_time: number = this._app.sync.serverTimeBys * 1000;
			let s_cd: number;
			let cd_len: number = this._spellCDArr.length;
			for (let i: number = 0; i < cd_len; i = i + 2) {
				let s_spell_id: number = this._spellCDArr[i];
				if (s_spell_id == spellid) {
					s_cd = this._spellCDArr[i + 1];
					break;
				}
			}

			s_cd = s_cd ? s_cd : 0;
			s_cd = s_cd - cur_time;

			//是否需要公共cd
			if (needCommonCd) {
				let c_cd: number = this._commonSpellCd - cur_time;
				//自己cd 跟公共cd 谁大取谁的
				if (s_cd < c_cd) {
					s_cd = c_cd;
				}
			}

			return s_cd < 0 ? 0 : s_cd;
		}

		//客户端存储某技能cd 时间戳毫秒
		public setClientSpellCDByID(spellid: number, commodCd: number = 0): void {
			//群体技能共用一个cd
			// if(this.isQunSpell(spellid)){
			// 	this.GetSex() == PlayerDataField.SEX_MAN? spellid = PlayerData.SPELL_QUN_FIRST_ID_NAN : spellid = PlayerData.SPELL_QUN_FIRST_ID_NV;
			// }

			let spellcd: number = this._app.sync.serverTimeBys * 1000;
			//公共cd处理
			if (commodCd == 0)
				this._commonSpellCd = spellcd + 500;
			else
				this._commonSpellCd = spellcd + commodCd;

			let spell_temp: any = Template.getSkillsTempById(spellid);
			if (spell_temp) {
				spellcd += spell_temp.cd;
			}
			let isHave: boolean = false;
			let cd_len: number = this._spellCDArr.length;
			for (let i: number = 0; i < cd_len; i = i + 2) {
				if (this._spellCDArr[i] == spellid) {
					this._spellCDArr[i + 1] = spellcd;
					isHave = true;
					break;
				}
			}

			//没有 补进
			if (!isHave) {
				this._spellCDArr.push(spellid);
				this._spellCDArr.push(spellcd);
			}
			this.event(ACotrller.UPDATE_SPELL_CD);
		}

		/****************************技能cd end******************************************/

		//释放
		public dispose(): void {
			this.stop();
			
			this._moveStacks = null;
			this._lastMoveToward = -1;
			if (this._pluginsMgr) {
				this._pluginsMgr.dispose();
				this._pluginsMgr = null;
			}
		}

	}
}