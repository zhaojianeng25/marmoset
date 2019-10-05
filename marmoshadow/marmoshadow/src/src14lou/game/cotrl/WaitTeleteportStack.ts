/**
* 传送栈
*/
module game.cotrl {
	export class WaitTeleteportStack extends BaseStack {
		/*传送超时纠错*/
		private _timeOut: number = 20000;
		// 传送最短时间
		private _timeMust: number = this._timeOut - 1400;
		private _mapAssetInfo: game.data.MapAssetInfo;
		/*目的地地图id*/
		private _toMapid: number;
		private _toX: number;
		private _toY: number;
		private _par: string;

		private _assetsLoader: AssetsLoader;

		constructor(app: AppBase, toMapid: number, dstX: number, dstY: number, par: string) {
			super(app);
			this._toMapid = toMapid;
			this._toX = dstX;
			this._toY = dstY;
			this._par = par;
			this._mapAssetInfo = this._sceneObjectMgr.mapAssetInfo;
		}


		initialize(): boolean {
			if (!super.initialize()) {
				return false;
			}
			// 标记为传送中
			this._controller.isTeleporting = true;
			// 清理选中对象
			this._sceneObjectMgr.selectOid = 0;

			// 进入地图前需要加载的素材
			let assets: Array<string>;
			if (!assets) {
				assets = [];
			}
			let skin = Path.ui + 'load/loading0.jpg';
			assets.push(skin);
			this._assetsLoader = new AssetsLoader();
			this._assetsLoader.load(assets, Handler.create(this, this.onComplete));
			return true;
		}

		onJoinMapResult(mapid: number): void {
			this._toMapid = mapid;
			this._app.sceneRoot && this._app.sceneRoot.waitTeleteport(true);
		}

		protected onComplete(url: string): void {
			this.callTeleport();
		}

		private callTeleport(): void {
			this._sceneObjectMgr.joinFakeMap(this._toMapid, this._toX, this._toY);
		}

		finalize(): void {
			if (this._assetsLoader) {
				this._assetsLoader.clear();
				this._assetsLoader = null;
			}
			this._mapAssetInfo = null;
			this._controller.isTeleporting = false;
			super.finalize();
		}

		update(diff: number): boolean {
			this._timeOut -= diff;
			if (this._timeOut < 0) {
				return true;
			}
			if (this._timeOut > this._timeMust) {
				return false;
			}
			if (!this._sceneObjectMgr.mapInfo)
				return false;
			//等待地图数据下载
			if (this._mapAssetInfo.id != this._toMapid || !this._mapAssetInfo.isInited)
				return false;
			let mainUnit: Unit = this._sceneObjectMgr.mainUnit;
			if (!mainUnit)
				return false;
			return mainUnit.mapid == this._toMapid;
		}
	}
}