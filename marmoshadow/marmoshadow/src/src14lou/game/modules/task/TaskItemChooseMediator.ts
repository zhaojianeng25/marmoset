
module game.modules.task {
	/** 任务上交界面 */
	export class TaskItemChooseMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.TaskItemChooseUI;
		/**道具id*/
		public itemlist: Array<number> = []
		/**提示框*/
		private tips: game.modules.tips.tipsModule;
		/**等待时间*/
		public waittime: number;
		/*道具key*/
		public itemkey: number;
		/** 界面UI（用作判断是否从天机仙令界面申请的道具提交） */
		private isUI: any;
		/** 道具复合表 */
		private itemArrCofig: Object;
		/** 存放道具列表渲染时要用到道具id的数组 */
		private renderItemIDArr: Array<number>;
		/** 存放道具列表点击时要用带道具key的数组 */
		private selectItemKeyArr: Array<number>;
		/** 选中动画特效 */
		private selectAni: Laya.Animation;
		/** 被选中道具的索引 */
		private selectedItemIndex: number;

		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.TaskItemChooseUI();
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide)
			this._viewUI.confirm_btn.on(LEvent.MOUSE_DOWN, this, this.itemsubmit)

			this.itemArrCofig = bag.models.BagModel.getInstance().itemAttrData;
			this.selectAni = new Animation();
		}
		/**初始化数据*/
		public init(itemid: Array<number>, isUI?: any) {
			if (isUI) {//是否从天机仙令界面跳转过来
				this.isUI = isUI;
			}
			this.show();
			this.itemlist = itemid
			this.waittime = 0
			this.renderItemIDArr = [];
			this.selectItemKeyArr = [];
			var data: Array<any> = []
			for (var index = 0; index < itemid.length; index++) {
				let iteminfo: ItemAttrBaseVo = game.modules.bag.models.BagModel.getInstance().itemAttrData[itemid[index]]
				let baginfo: BagVo = game.modules.bag.models.BagModel.getInstance().bagMap[BagTypes.QUEST]
				let baginfo1: BagVo = game.modules.bag.models.BagModel.getInstance().bagMap[BagTypes.BAG]
				for (var num = 0; num < baginfo.items.length; num++) {
					let item: game.modules.bag.models.ItemVo = baginfo.items[num]
					if (item.id == itemid[index]) {
						if (item.number == 1) {//上交数量是否为1
							data.push({ itemicon_img: "common/icon/item/" + iteminfo.icon + ".png", numcount_lab: "" });
						}
						else {
							data.push({ itemicon_img: "common/icon/item/" + iteminfo.icon + ".png", numcount_lab: item.number });
						}
						this.renderItemIDArr.push(item.id);
						this.selectItemKeyArr.push(item.key);
					}
				}
				for (var num = 0; num < baginfo1.items.length; num++) {
					let item: game.modules.bag.models.ItemVo = baginfo1.items[num]
					if (item.id == itemid[index]) {
						if (item.number == 1) {//上交数量是否为1
							data.push({ itemicon_img: "common/icon/item/" + iteminfo.icon + ".png", numcount_lab: "" });
						}
						else {
							data.push({ itemicon_img: "common/icon/item/" + iteminfo.icon + ".png", numcount_lab: item.number });
						}
						this.renderItemIDArr.push(item.id);
						this.selectItemKeyArr.push(item.key);
					}
				}
			}
			this._viewUI.item_list.array = data
			this._viewUI.item_list.vScrollBarSkin = ""
			this._viewUI.item_list.repeatY = data.length
			this._viewUI.item_list.scrollBar.elasticBackTime = 100;
			this._viewUI.item_list.scrollBar.elasticDistance = 10;
			this._viewUI.item_list.renderHandler = new Handler(this, this.renderItem);
			//this._viewUI.item_list.selectHandler = new Handler(this,this.selectItem);
			if (AutoHangUpModels.getInstance().autotask == 1) {//是否自动
				Laya.timer.loop(1000, this, this.timersubmit)
			}
			//默认选中第一个
			this.selectedItemIndex = 0;
			this.PlaySelectEffect(this._viewUI.item_list, 0);
		}
		/** 渲染道具 */
		private renderItem(cell: Laya.Box, index: number) {
			var itemFrame_img: Laya.Image = cell.getChildByName("itemFrame_img") as Laya.Image;
			var _nquality = this.itemArrCofig[this.renderItemIDArr[index]]["nquality"];
			itemFrame_img.skin = bag.BagSystemModule.getGameItemFrameColorResource(_nquality);
			var selectEffect_img: Laya.Image = cell.getChildByName("selectEffect_img") as Laya.Image;
			selectEffect_img.on(LEvent.CLICK, this, this.selectItem, [index]);
		}
		/** 选中道具 */
		private selectItem(index: number): void {
			this.selectedItemIndex = index;
			this.PlaySelectEffect(this._viewUI.item_list, index);
			Laya.timer.once(500, this, this.showItemInfoTips);
		}
		/** 显示道具信息提示 */
		private showItemInfoTips(): void {
			var _parame = new Laya.Dictionary();
			var _itemid = this.renderItemIDArr[this.selectedItemIndex];
			_parame.set("itemId", _itemid);
			_parame.set("key", this.selectItemKeyArr[this.selectedItemIndex]);
			_parame.set("packid", BagTypes.BAG);
			_parame.set("showBtn", false);
			var _tipsModule = new tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, _parame);
		}
		/** 播放选中特效 */
		private PlaySelectEffect(list: Laya.List, index: number): void {
			let cell = list.getCell(index);
			let selectEffect_img: Laya.Image = cell.getChildByName("selectEffect_img") as Laya.Image;
			this.selectAni.loadAtlas("common/res/atlas/ui/tuji.atlas", Laya.Handler.create(this, this.onCreateFrame));
			selectEffect_img.addChild(this.selectAni);
			this.selectAni.scaleX = 1;
			this.selectAni.scaleY = 1;
		}
		/** 创建动画 */
		public onCreateFrame() {
			let effecthPath = bagModel.getInstance().getEffectUrls("xuanzhong", 9);
			Laya.Animation.createFrames(effecthPath, "xuanzhong");
			this.selectAni.play(0, true, "xuanzhong");
			this.selectAni.interval = 112;
		}
		/**物品提交*/
		public itemsubmit(): void {
			Laya.timer.clear(this, this.timersubmit)
			if (AutoHangUpModels.getInstance().autotask == 0) {
				AutoHangUpModels.getInstance().istaskwalk = 0
				AutoHangUpModels.getInstance().notaketimer = 0
			}
			this.hide()
			var _itemkey;
			if (this.selectedItemIndex != undefined) {
				_itemkey = this.selectItemKeyArr[this.selectedItemIndex];
			}
			if (this.isUI) {//天机仙令任务的上交界面
				game.modules.tianjixianling.models.TianJiXianLingProxy.getInstance().event(game.modules.tianjixianling.models.SHOW_ITEM_SUBMIT_JIEMIAN, [_itemkey]);
			}
			else {
				game.modules.task.models.TaskProxy.getInstance().event(game.modules.task.models.ITEMORPETSUBMIT, [_itemkey]);
			}
		}
		/**延迟提交*/
		public timersubmit() {
			this.waittime += 1;
			if (this.waittime >= 3) {//延迟3秒
				this.itemsubmit()
			}
		}
		public show() {
			super.show();
		}
		public hide(): void {
			if (this.selectAni) {
				this.selectAni.clear();
			}
			super.hide();
		}
		public getView(): Sprite {
			return this._viewUI;
		}
	}
}