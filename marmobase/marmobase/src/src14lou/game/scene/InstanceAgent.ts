/**
* 副本代理 
*/
module game.scene {
	export class InstanceAgent {
		//是否开始了
		private _isStart: boolean = false;

		//锁妖塔是否已发起挑战了
		private _isSendTiaoZhanEquip: boolean = false;
		//有假对象
		private _haveFakeUnit: boolean = false;
		//假对象集合
		private _fakeUnitList: FakeUnit[];

		private _app: AppBase;
		constructor(app: AppBase) {
			this._app = app;
		}

		//初始
		public init(): void {
			let mapinfo: MapInfo = this._app.sceneObjectMgr.mapInfo;
			if (!mapinfo) return;
			this._isStart = false;
			this._isSendTiaoZhanEquip = false;
			//主玩家对象
			if (!this._app.sceneObjectMgr.mainUnit) {
				this._app.sceneObjectMgr.on(SceneObjectMgr.MAINUNIT_UPDATE, this, this.onMainUnitUpdate)
			}
			else {
				this.onMainUnitUpdate();
			}
			//地图对象
			mapinfo.AddListen(MapInfo.MAP_INT_MAP_BYTE, this, this.onUpdateState);
			this.onUpdateState();
		}

		// 主玩家unit对象有更新
		private onMainUnitUpdate(): void {
			this._app.sceneObjectMgr.off(SceneObjectMgr.MAINUNIT_UPDATE, this, this.onMainUnitUpdate);

		}

		//更新状态
		private onUpdateState(): void {
			let mapinfo: MapInfo = this._app.sceneObjectMgr.mapInfo;
			if (!mapinfo) return;
			let aCotrller: ACotrller = this._app.aCotrller;
			let map_status: number = mapinfo.GetMapState();
			let mainUnit: Unit = this._app.sceneObjectMgr.mainUnit;
			// logd("地图状态",mapid,map_status);
			
		}

		//挂机处理
		private onStartGuaJi(): void {
			let controler: ACotrller = this._app.aCotrller;
			if (controler.curBehaviorState != game.cotrl.ACotrller.BEHAVIOR_STATE_HANGUP){
				console.log("人物停止8")
				controler.pluginsStart();
			}
				
		}
		private onStopGuaJi(): void {
			let controler: ACotrller = this._app.aCotrller;
			if (controler.curBehaviorState == game.cotrl.ACotrller.BEHAVIOR_STATE_HANGUP)
				controler.pluginsStop();
		}

		//退出
		private instanceExit(): void {
			this._app.aCotrller.instanceExit();
		}

		//触发退出监听
		private eventInstanceExit(): void {
			this._app.aCotrller.doInstanceExitEvent();
		}


		//清理
		public clear(): void {
			Laya.timer.clearAll(this);
			//清理假对象
			if (this._haveFakeUnit) {
				this._app.sceneObjectMgr.clearFakeObject();
				this._fakeUnitList = null;
			}
			this._isStart = false;
			let mapinfo: MapInfo = this._app.sceneObjectMgr.mapInfo;
			if (mapinfo)
				mapinfo.removeListene(MapInfo.MAP_INT_MAP_BYTE, this, this.onUpdateState);

		}
	}
}