/**
* 副本评级 
*/
module game.modules.commonUI {
	export class FuBenPingJiMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.TuiChuFuBenUI;
		public rate: number;
		public items: Array<number> = [];
		public time: number;
		/** 是否已经选中奖励 */
		public isGetReward: boolean = false;
		/** 选中的物品编号 */
		public index: number;
		/** 选中物品后评分系统的关闭时间 */
		public colseTime: number = 2;
        /** 
		 * 评级系统
		 * @param rate 评分等级 
		 * @param items 抽奖物品
		 * @param time 消失时间
		 */
		constructor(app: AppBase, rate: number, items: Array<number>, time: number) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.TuiChuFuBenUI();
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this.rate = rate;
			this.items = items;
			this.time = time;

			this._viewUI.items_list.renderHandler = new Handler(this, this.onSelect);
		}
		public init() {
			activity.models.ActivityModel._instance.isShowPingJi = true;
			this._viewUI.ditu_img.visible = false;
			Laya.timer.loop(1000, this, this.timerLoop);
			var data: Array<any> = [];
			for (var i: number = 0; i < this.items.length; i++) {
				data.push({
					diban_img: { visible: false },
					icon_img: { visible: false },
					libao_img: { visible: true },
				});
			}
			this._viewUI.items_list.repeatX = this.items.length;
			this._viewUI.items_list.repeatY = 1;
			this._viewUI.items_list.spaceX = 40;
			this._viewUI.items_list.array = data;
			this._viewUI.items_list.x = 339 - (this.items.length - 1) * 60;
			this._viewUI.daojishi_lab.text = this.time + "s";
		}
		/** 评分系统的关闭时间显示 */
		public timerLoop() {
			if (this.time <= 0) this.btnHandler(0);
			this.time -= 1;
			this._viewUI.daojishi_lab.text = (this.time <= 0 ? 0 : this.time) + "s";
		}
		/** list渲染 */
		public onSelect(cell: Laya.Box, index: number) {
			var btn = cell.getChildByName("getItem_btn") as Laya.Button;
			btn.on(LEvent.MOUSE_DOWN, this, this.btnHandler, [index]);
		}
		/** 选中监听 */
		public btnHandler(index: number) {
			this.index = index;
			Laya.timer.clear(this, this.timerLoop);
			RequesterProtocols._instance.c2s_done_fortune_wheel(0, 0, 1, 1);
			modules.bag.models.BagProxy.getInstance().once(modules.bag.models.SHOW_PINGJIITEM_EVENT, this, this.onAddItem);
		}
		/** 显示选中的物品 */
		public onAddItem(items: any) {
			this.isGetReward = true;
			var rateSkins: Array<any> = ["common/ui/fuben/s.png", "common/ui/fuben/a.png",
				"common/ui/fuben/b.png", "common/ui/fuben/c.png"];
			var dibanSkins: Array<any> = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
				"common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
				"common/ui/tongyong/jinkuang.png"];
			var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
			this._viewUI.pingjia_img.skin = rateSkins[this.rate - 1];
			for (var i: number = 0; i < this.items.length; i++) {
				if (items.itemid == this.items[i] && i != this.index) {
					var temp = this.items[i];
					this.items[i] = this.items[this.index];
					this.items[this.index] = temp;
				}
			}
			for (var j: number = 0; j < this.items.length; j++) {
				var diban_img = this._viewUI.items_list.getCell(j).getChildByName("diban_img") as Laya.Image;
				var icon_img = this._viewUI.items_list.getCell(j).getChildByName("icon_img") as Laya.Image;
				var libao_img = this._viewUI.items_list.getCell(j).getChildByName("libao_img") as Laya.Image;
				diban_img.skin = dibanSkins[_itemAttrBinDic[this.items[j]].nquality - 1];
				icon_img.skin = game.modules.shop.models.ShopModel.getInstance().getSrc(_itemAttrBinDic[this.items[j]].icon);
				diban_img.visible = true;
				icon_img.visible = true;
				libao_img.visible = false;
			}
			Laya.timer.loop(1000, this, this.colseView);
		}
		/** 选中物品2秒后关闭界面 */
		public colseView() {
			if (this.colseTime == 0) {
				Laya.timer.clear(this, this.colseView);
				this.hide();
			}
			this.colseTime -= 1;
			this._viewUI.daojishi_lab.text = (this.colseTime <= 0 ? 0 : this.colseTime) + "s";
		}
		public show() {
			this.init();
			super.show();
			game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.OPEN_EVENT);
		}
		public hide() {
			super.hide();
			if (!this.isGetReward) {
				RequesterProtocols._instance.c2s_done_fortune_wheel(0, 0, 1, 1);
			}
			modules.activity.models.ActivityModel.getInstance().isOver = false;
			activity.models.ActivityModel._instance.isShowPingJi = false;
			this._viewUI.ditu_img.offAll(LEvent.CLICK);
			this._viewUI.pingji_box.offAll(LEvent.CLICK);
			Laya.timer.clear(this, this.timerLoop);
			game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.CLOSEVIEW_EVENT);
		}
		public getView(): Sprite {
			return this._viewUI;
		}
	}
}