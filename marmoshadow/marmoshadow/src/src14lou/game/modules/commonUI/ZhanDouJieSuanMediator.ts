/**
* 特殊副本战斗结算-摇骰子
*/
module game.modules.commonUI {
	export class ZhanDouJieSuanMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.JieHunHuoDongUI;
		public rollMelon: game.modules.team.models.RollMelonVo;
		constructor(app: AppBase, rollMelon: game.modules.team.models.RollMelonVo) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.JieHunHuoDongUI();
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this.rollMelon = rollMelon;

			this._viewUI.cancel_img.on(LEvent.MOUSE_DOWN, this, this.cancel);
			this._viewUI.ok_img.on(LEvent.MOUSE_DOWN, this, this.ok);
		}
		public time: number;
		public jieSuanView(): void {
			this._viewUI.item_box.visible = true;
			this._viewUI.xieZhu_img.visible = false;
			this._viewUI.cancel_img.x = 306;
			this._viewUI.ok_img.x = 478;
			this._viewUI.name_img.x = 315;
			this._viewUI.name_lab.x = 327;

			var skinArr: Array<any> = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
				"common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
				"common/ui/tongyong/jinkuang.png"];

			var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
			this._viewUI.name_lab.text = _itemAttrBinDic[this.rollMelon.itemid].name;
			this._viewUI.icon_img.skin = game.modules.shop.models.ShopModel.getInstance().getSrc(_itemAttrBinDic[this.rollMelon.itemid].icon);
			this._viewUI.diban_img.skin = skinArr[_itemAttrBinDic[this.rollMelon.itemid].nquality - 1];
			this._viewUI.num_lab.text = this.rollMelon.itemnum + "";
			this.show();
			this.time = 0;
			Laya.timer.loop(1000, this, this.cancel);
		}
		public jieHunView(): void {
			this._viewUI.item_box.visible = false;
			this._viewUI.xieZhu_img.visible = true;
			this._viewUI.xieZhu_img.x = 145;
			this._viewUI.cancel_img.x = 318;
			this._viewUI.ok_img.x = 498;
			this._viewUI.name_img.x = 255;
			this._viewUI.name_lab.x = 268;
			this.show();
		}
		public timeLoop(): void {
			this.time++;
			this._viewUI.time_pro.value = this.time / 10;
			if (this.time >= 5) {
				this.cancel();
			}
		}
		public cancel(): void {
			this.hide();
			Laya.timer.clear(this, this.timeLoop);
			modules.team.models.TeamProxy.getInstance().event(modules.team.models.JS_CANCEL);
		}
		public ok(): void {
			this.hide();
			Laya.timer.clear(this, this.timeLoop);
			modules.team.models.TeamProxy.getInstance().event(modules.team.models.JS_OK);
		}
		public show() {
			super.show();
		}
		public hide() {
			super.hide()
		}
		public getView(): Sprite {
			return this._viewUI;
		}
	}
}