/**
* UI
*/
module game {
	export class UIRoot extends game.gui.base.Container {
		//UI模式
		public static MODE_HORIZONTAL: number = 0;//横屏模式
		public static MODE_VERTICAL: number = 1;//竖屏模式

		//热键枚举
		public static KEYCODE_A: number = 65;//A键
		public static KEYCODE_Q: number = 81;//Q键
		public static KEYCODE_Z: number = 90;//Z键
		public static KEYCODE_V: number = 86;//V键
		public static KEYCODE_ESC: number = 27;//eac键
		public static KEYCODE_M: number = 77;//M键
		public static KEYCODE_SPAPCE: number = 32;//Space键
		public static KEYCODE_TAB: number = 9;//Tab键
		public static KEYCODE_ENTER: number = 13;//enter键
		public static KEYCODE_UP: number = 38;//↑
		public static KEYCODE_DOWN: number = 40;//↓
		public static KEYCODE_LEFT: number = 37;//←
		public static KEYCODE_RIGHT: number = 39;//→

		/**游戏gm命令开启 */
		public gameGmOpen: boolean = false;

		// 当前UI模式
		public _uiMode: number;
		get uiMode(): number {
			return this._uiMode;
		}

		// 初始化事件
		public static INIT: string = 'init';
		/** 已经移除事件 */
		public static REMOVE: string = 'remove';
		// 顶层ui
		private _topUI: TopUI;
		//提示层
		private _topUnderUI: TopunderUI;
		// 一般UI层
		private _generalUI: GeneralUI;
		// HUD层
		private _HUD: HUD;

		// 是否竖屏标志 
		private _isVertical: boolean;
		//主玩家数据是否获得标志
		private _isGetPlayerData: boolean = false;

		//是否暂停热键
		private _isPauseKey: boolean = false;
		//前地图id
		private _prevMapId: number = 0;

		//聊天 发出消息记录 最多存5条
		private _chatRecordeInfo: string[] = [];
		//能否更新UI
		private _isCanUpdateHUD: boolean = true;
		//随机名字缓存
		private _randomName: string = "";
		//随机性别缓存
		private _randomGender: number = 0;

		//黑边
		private _spriteLeft: Sprite;
		private _spriteRight: Sprite;

		get randomGender() {
			if (this._randomGender == 0) {
				this._randomGender = Random.randInt(1, 2);
			}
			return this._randomGender;
		}
		set randomGender(value: number) {
			this._randomGender = value;
		}

		get randomName() {
			if (this._randomName == "") {
				this._randomName = game.utils.NicknameU.getRandomNickname(this.randomGender);
			}
			return this._randomName;
		}
		set randomName(value: string) {
			this._randomName = value;
		}

		get isPauseKey() {
			return this._isPauseKey;
		}

		set isPauseKey(value: boolean) {
			this._isPauseKey = value;
		}

		get top(): TopUI {
			return this._topUI;
		}

		get topUnder(): TopunderUI {
			return this._topUnderUI;
		}

		get general(): GeneralUI {
			return this._generalUI;
		}

		get HUD(): HUD {
			return this._HUD;
		}

		private _mouseLock: boolean = false;
		set mouseLock(v: boolean) {
			this._mouseLock = v;
		}

		//获得物品列表
		private _getItemList: any[];
		private _isShowItemTips: boolean = false;

		constructor(app: AppBase) {
			super(app);
			this.gameGmOpen = isDebug;

			PageDef.init();
			this._preLoad = (<GameApp>this._app).preLoad;
			// 顶层ui
			this._topUI = new TopUI(app);
			// 一般UI层
			this._generalUI = new GeneralUI(app);
			// HUD层
			this._HUD = new HUD(app);
			//提示层
			this._topUnderUI = new TopunderUI(app);

			this.addChild(this._HUD);
			this.addChild(this._generalUI);
			this.addChild(this._topUnderUI);
			this.addChild(this._topUI);

			this._getItemList = [];
			//打开加载界面
			this._topUI.open(PageDef.LOADING, (page: game.gui.page.Loading) => {
				this.event(UIRoot.INIT);
				// 加载必要素材
				let assetsLoader = new AssetsLoader();
				assetsLoader.load([Path.atlas_ui + 'tongyong.atlas'], Handler.create(this, this.onNeedAssetLoaded));
			});
		}

		onNeedAssetLoaded(): void {
			let aCotrller = this._app.aCotrller;
			aCotrller.on(ACotrller.TELEPORT_STATE_CHANGE, this, this.onUpdateTeleportState);
			//mainUnit变化监听
			this._app.sceneObjectMgr.on(SceneObjectMgr.MAINUNIT_UPDATE, this, this.onMainUnit);
			this.onMainUnit();

			this._app.sceneObjectMgr.on(SceneObjectMgr.MAP_TELEPORT, this, this.intoMap);
		}

		//当mainUnit获取到的时候 
		private onMainUnit(): void {
			let mainUnit = this._app.sceneObjectMgr.mainUnit;
			if (!mainUnit) return;
			//死亡状态监听
			mainUnit.AddListen(UnitField.UNIT_INT_BYTE0, this, this.updatePlayerLiveState);
			this.updatePlayerLiveState();
		}

		//进入某张地图
		public intoMap(newMapid: number): void {
			if (!newMapid) return;
			this.checkUIMode(true);
			//记录
			this._prevMapId = newMapid;
		}

		//死亡状态
		private updatePlayerLiveState(): void {
			let mainUnit = this._app.sceneObjectMgr.mainUnit;
			if (!mainUnit) return;
		}

		private onUpdateTeleportState(): void {
			if (this._app.aCotrller.isTeleporting) {
				//this.showLoadProgress(EnumToString.randomTeleGameTip(), 0, 0.04);
				var _changJingChangeMediator = new game.modules.commonUI.ChangJingChangeMediator(this._app);
            	_changJingChangeMediator.onShow(true);
			}
			else {
				this.closeLoadProgress();
			}
		}


		// 显示加载进度条
		showLoadProgress(str: string, value: number = -1, add: number = 0, max: number = -1): void {
			let loading = this._topUI.getPage(PageDef.LOADING);
			if (!loading) {
				loading = this._topUI.open(PageDef.LOADING, (page) => {
					page['setProgress'](str, value, add, max);
				});
			}
			else {
				loading['setProgress'](str, value, add, max);
			}
		}

		// 关闭加载进度条
		closeLoadProgress(): void {
			this._topUI.close(PageDef.LOADING);
		}

		//在PC端
		private openHUD(): void {
			this._HUD.closeAll();
			this._HUD.open(PageDef.HUD_MAIN_PAGE);
		}

		private _preLoad: PreLoad;
		// 预加载素材
		private _preLoadUrls = [
			'res/atlas/scene/common.atlas',
			// 'res/atlas/ui/effect.atlas',
			// 'scene/avatar/avatar.data',
			// 'scene/avatar/idxzip.bin',

			'res/atlas/ui/hud.atlas',
			'res/atlas/ui/tongyong.atlas',
			// 'res/atlas/scene/mask.atlas',
			// 'res/atlas/ui/banshenxiang.atlas',
			// 'scene/avatar/1100body00_1.png',
			// 'scene/avatar/1132wq00_1.png',
			// 'scene/avatar/2000ms_0001_1.png',
			// 'scene/avatar/2000npc_0001_1.png',
		];
		// 主玩家数据下来了
		public toLoadMainPlayerData(): void {
			this._isGetPlayerData = true;
			this._preLoad.on(LEvent.CHANGED, this, this.checkIntoScene);
			for (let url of this._preLoadUrls) {
				let asset = RefAsset.Get(url, false);
				if (!asset || !asset.parseComplete) {
					this._preLoad.load(url, RefAsset.GENRAL);
				}
			}
			this.checkIntoScene();

			this._app.aCotrller.pluginsMgr.lastOptTime = Laya.timer.currTimer;
		}

		/*private onPlugin(): void {
			this.checkUIMode(true);

		}*/

		// 进入场景校验
		private checkIntoScene(): void {
			let loadCount = this._preLoad.loadCount;
			let totalCount = this._preLoad.totalCount;
			if (loadCount == totalCount) {
				this._preLoad.off(LEvent.CHANGED, this, this.checkIntoScene);
				for (let url of this._preLoadUrls) {
					this._preLoad.clear(url);
				}
				// 这里等待传送栈关闭加载界面
				this.closeLoadProgress();
        		//this._app.sceneObjectMgr.joinFakeMap(MapInfo.MAP_XINSHOUCUN,MapInfo.MAP_XINSHOUCUN_POSX,MapInfo.MAP_XINSHOUCUN_POSY);
			}
			else {
				this.showLoadProgress('正在加载....', loadCount / totalCount, 0.003, (loadCount + 1) / totalCount);
			}
		}

		public resize(w: number, h: number): void {
			this._clientWidth = w;
			this._clientHeight = h;
			// this.updateBackBg();
			this._topUI.resize(w, h);
			this._generalUI.resize(w, h);
			this._HUD.resize(w, h);
			this._topUnderUI.resize(w, h);
			// this._isVertical = h > w;
			// if (this._HUD && this._isGetPlayerData) {
			// 	this.checkUIMode();
			// }
		}

		//检查当前的UI模式
		private checkUIMode(frush?: boolean): void {
			if (!this._isCanUpdateHUD) return;
			let oldMode = this._uiMode;
			if (this._isVertical) {
				this._uiMode = UIRoot.MODE_VERTICAL;
			}
			else {
				this._uiMode = UIRoot.MODE_HORIZONTAL;
			}
			//this._uiMode = UIRoot.MODE_HORIZONTAL;
			if (frush || this._uiMode != oldMode)
				this.onChangeUIMode();
		}

		//检查UI模式之后，构建UI
		private onChangeUIMode(): void {
			//特殊地图 特殊处理
			let mapid: number = this._app.sceneObjectMgr.mapid;
			let mapinfo: MapInfo = this._app.sceneObjectMgr.mapInfo;

			//战斗场景
			if (mapinfo && mapinfo.inBattle) {
				this._HUD.closeAll();
				this._generalUI.closeAll();
				this._HUD.open(PageDef.HUD_MAIN_PAGE);
				this._HUD.open(PageDef.HUD_FIGHT_PAGE);
			} else {
				//没有特殊要求就直接打开HUD
				this.openHUD();
			}
		}

		onKeyDown(e: LEvent): void {
			if (this._isPauseKey) return;
			let api: any = gameApi;

			//以下都是需要进入游戏的快捷键
			if (!this._app.sceneObjectMgr.mainUnit) return;

			//PC端热键
			if (api && api.isIntranet && e.keyCode == 121) {//F10
				
			}
			else if (e.keyCode == UIRoot.KEYCODE_Z)//z键
			{
				let controler: ACotrller = this._app.aCotrller;
				console.log("人物停止1")
				controler.curBehaviorState == ACotrller.BEHAVIOR_STATE_HANGUP ? controler.pluginsStop(true) : controler.pluginsStart(true);
			}
			else if (e.keyCode == UIRoot.KEYCODE_ESC)//Esc键
			{
				this.onKeyESC();
			}
			else if (e.keyCode == UIRoot.KEYCODE_M)//M键
			{

			}
			else if (e.keyCode == UIRoot.KEYCODE_Q)//q键
			{

			}
			else if (e.keyCode == UIRoot.KEYCODE_TAB)//Tab键
			{
				//切换攻击目标。不能切换到NPC和门派成员身上
				let t_unit: Unit = this._app.aCotrller.selectNearUnit(this._app.sceneObjectMgr.selectOid);
				if (t_unit) this._app.sceneObjectMgr.selectOid = t_unit.oid;
			}
			else if (e.keyCode == UIRoot.KEYCODE_SPAPCE)//Space键
			{
			}
			else if (e.keyCode == UIRoot.KEYCODE_A)//a键
			{

			}
			else if (e.keyCode == UIRoot.KEYCODE_V) {
			}
			else if (e.keyCode == Laya.Keyboard.F4) {
				this._app.uiRoot.visible = !this._app.uiRoot.visible;
			}
		}

		public update(diff: number): void {
			if (!diff || diff < 0) return;
			this.topUnder.checkQueue();
		}

		/*按下Enter键后*/
		private onKeyEnter(): void {
			!this._topUI.enter() && this._generalUI.enter();
		}

		/*按下Esc键后*/
		private onKeyESC(): void {
			!this._topUI.cancel() && this._generalUI.cancel();
		}

		private _hasBgCount: number = 0;
		private _blackSprite: Sprite;

		addBgCount(key: number): void {
			if (this.checkKey(key))
				this.hasBgCount++;
		}
		subBgCount(key: number): void {
			if (this.checkKey(key))
				this.hasBgCount--;
		}
		checkKey(key: number): boolean {
			switch (key) {
				default:
					return false;
			}
		}
		private set hasBgCount(v: number) {
			this._hasBgCount = v;
			this.updateBackBg();
		}

		private get hasBgCount(): number {
			return this._hasBgCount;
		}

		private updateBackBg(): void {
			if (this._blackSprite)
				this._blackSprite.graphics.clear();
			//logd("当前页面数量：" + this._hasBgCount);
			if (this._hasBgCount > 0) {
				this.drawBlack();
			} else {
				this.clearBlack();
			}
		}

		/**
		 * 绘制黑底
		 */
		private drawBlack(): void {
			if (!this._blackSprite) {
				this._blackSprite = new Sprite();
				this._blackSprite.alpha = 0.7;
				this._generalUI.addChildAt(this._blackSprite, 0);
				this._blackSprite.on(LEvent.CLICK, this, this.onBlackClick);
			}
			this._blackSprite.size(this._clientWidth, this._clientHeight);
			this._blackSprite.graphics.clear();
			this._blackSprite.graphics.drawRect(0, 0, this._clientWidth, this._clientHeight, "#000000");
		}

		/**
		 * 黑底点击事件
		 */
		private onBlackClick(): void {
			this._generalUI && this._generalUI.cancel();
		}

		/**
		 * 清理黑底
		 */
		clearBlack(): void {
			if (this._blackSprite) {
				this._blackSprite.off(LEvent.CLICK, this, this.onBlackClick);
				this._blackSprite.destroy(true);
				this._blackSprite = null;
			}
			if (this._spriteLeft) {
				this._spriteLeft.graphics.clear();
				this._spriteLeft.destroy();
				this._spriteLeft = null;
			}
			if (this._spriteRight) {
				this._spriteRight.graphics.clear();
				this._spriteRight.destroy();
				this._spriteRight = null;
			}
		}

		//一级界面按钮点击后做些什么呢
		doSomethingByClickHudBtn(needPlayMusic: boolean = true): void {
			if (needPlayMusic)
				this.playClickBtnSound();

		}

		//播放按钮音乐
		playClickBtnSound(): void {
			this._app.playSound("sounds/u_btn.mp3");
		}

		// 鼠标按下事件
		onMouseDown(e: LEvent): boolean {
			return false;
		}

		// 鼠标移动事件
		onMouseMove(e: LEvent): boolean {
			return false;
		}

		// 鼠标弹起事件
		onMouseUp(e: LEvent): boolean {
			return false;
		}

		// 鼠标移开
		onMouseOut(e: LEvent): boolean {
			return false;
		}

	}
}