/**
* 精英副本 
*/
module game.modules.commonUI {
	export class JingYingFuBenMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.JingYingFuBenUI;
		private _itemTips: game.modules.tips.tipsModule;
		/** 精英副本参数表的id-不是活动副本id */
		public id: number;
		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.JingYingFuBenUI();
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide)

			this._viewUI.getTips_btn1.on(LEvent.MOUSE_DOWN, this, this.getTips, [1]);
			this._viewUI.getTips_btn2.on(LEvent.MOUSE_DOWN, this, this.getTips, [2]);
			this._viewUI.getTips_btn3.on(LEvent.MOUSE_DOWN, this, this.getTips, [3]);
			this._viewUI.getTips_btn4.on(LEvent.MOUSE_DOWN, this, this.getTips, [4]);
			this._viewUI.getTips_btn5.on(LEvent.MOUSE_DOWN, this, this.getTips, [5]);

			this._viewUI.left_btn.on(LEvent.MOUSE_DOWN, this, this.goLeft);
			this._viewUI.right_btn.on(LEvent.MOUSE_DOWN, this, this.goRight);

			this._viewUI.tiaoZhan_btn.on(LEvent.MOUSE_DOWN, this, this.tiaoZhan);

			game.modules.activity.models.ActivityProxy.getInstance().on(game.modules.activity.models.JINGYINGFUBEN_EVENT, this, this.init);
		}
		public init(): void {
			//当前显示的关卡id,默认从第一关开始显示
			this.id = 1;
			this.setData();

			/*for (let key in Taskmodels.getInstance().accepttask.keys) {
				let accepttasks: MissionCMainMissionInfoBaseVo = Taskmodels.getInstance().missionCMainMissionInfoData[Taskmodels.getInstance().accepttask.keys[key]];
				console.log("-----key相关", key);
				console.log("-----key相关", Taskmodels.getInstance().accepttask.keys);
				console.log("-----key相关", Taskmodels.getInstance().accepttask.keys[key]);
				if (Taskmodels.getInstance().accepttask.keys[key] == 120) {
					console.log("-----accepttasks.missionName", accepttasks.MissionName);
					console.log("-----accepttasks.missionName", accepttasks.MissionName);
				}
			}*/
		}
		public setData(): void {
			var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
			var _instances = ActivityModel.getInstance().instances;
			var _shiGuangZhiXueBinDic = ActivityModel.getInstance().ShiGuangZhiXueBinDic;
			var skinArr: Array<any> = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
				"common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
				"common/ui/tongyong/jinkuang.png"];

			this._viewUI.name_lab.text = _shiGuangZhiXueBinDic[this.id].name;
			this._viewUI.explain_lab.text = _shiGuangZhiXueBinDic[this.id].explain;

			this._viewUI.JiangLi1_img.skin = skinArr[_itemAttrBinDic[_shiGuangZhiXueBinDic[this.id].award1].nquality - 1];
			this._viewUI.JiangLi2_img.skin = skinArr[_itemAttrBinDic[_shiGuangZhiXueBinDic[this.id].award2].nquality - 1];
			this._viewUI.JiangLi3_img.skin = skinArr[_itemAttrBinDic[_shiGuangZhiXueBinDic[this.id].award3].nquality - 1];
			this._viewUI.JiangLi4_img.skin = skinArr[_itemAttrBinDic[_shiGuangZhiXueBinDic[this.id].award4].nquality - 1];
			this._viewUI.JiangLi5_img.skin = skinArr[_itemAttrBinDic[_shiGuangZhiXueBinDic[this.id].award5].nquality - 1];
			this._viewUI.icon_img1.skin = this.getSrc(_itemAttrBinDic[_shiGuangZhiXueBinDic[this.id].award1].icon);
			this._viewUI.icon_img2.skin = this.getSrc(_itemAttrBinDic[_shiGuangZhiXueBinDic[this.id].award2].icon);
			this._viewUI.icon_img3.skin = this.getSrc(_itemAttrBinDic[_shiGuangZhiXueBinDic[this.id].award3].icon);
			this._viewUI.icon_img4.skin = this.getSrc(_itemAttrBinDic[_shiGuangZhiXueBinDic[this.id].award4].icon);
			this._viewUI.icon_img5.skin = this.getSrc(_itemAttrBinDic[_shiGuangZhiXueBinDic[this.id].award5].icon);

			if (_shiGuangZhiXueBinDic[this.id].enterLevel <= HudModel.getInstance().levelNum && _instances.get(_shiGuangZhiXueBinDic[this.id].fubenId).state != 0) {
				this._viewUI.tiaoZhan_btn.disabled = false;
				this._viewUI.weijihuo_img.visible = false;
				this._viewUI.heiMu_img.visible = false;
			} else {
				this._viewUI.tiaoZhan_btn.disabled = true;
				this._viewUI.weijihuo_img.visible = true;
				this._viewUI.heiMu_img.visible = true;
			}
		}
		/** 查看左边副本 */
		public goLeft(): void {
			if (this.id <= 1) return;
			this.id -= 1;
			this.setData();
		}
		/** 查看右边副本 */
		public goRight(): void {
			if (this.id >= Object.getOwnPropertyNames(game.modules.activity.models.ActivityModel.getInstance().ShiGuangZhiXueBinDic).length) return;
			this.id += 1;
			this.setData();
		}
		/** 挑战副本 */
		public tiaoZhan(): void {
			this.hide();
			RequesterProtocols._instance.c2s_req_line_task(ActivityModel.getInstance().ShiGuangZhiXueBinDic[this.id].fubenId);
		}
		/** 物品信息弹窗 */
		public getTips(num: number): void {
			var _shiGuangZhiXueBinDic = game.modules.activity.models.ActivityModel.getInstance().ShiGuangZhiXueBinDic;
			var itemId: number;
			switch (num) {
				case 1:
					itemId = _shiGuangZhiXueBinDic[this.id].award1;
					break;
				case 2:
					itemId = _shiGuangZhiXueBinDic[this.id].award2;
					break;
				case 3:
					itemId = _shiGuangZhiXueBinDic[this.id].award3;
					break;
				case 4:
					itemId = _shiGuangZhiXueBinDic[this.id].award4;
					break;
				case 5:
					itemId = _shiGuangZhiXueBinDic[this.id].award5;
					break;
			}
			var parame: Dictionary = new Dictionary();
			parame.set("itemId", itemId);
			this._itemTips = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
		}
		/** 获取物品图标 */
		public getSrc(index: number): string {
			var src: string = "";
			if (index <= 10000) { src = "common/icon/skill/" + index + ".png"; }
			else if (index <= 10500) { src = "common/icon/bustrole/" + index + ".png"; }
			else if (index <= 11000) { src = "common/icon/bustmonster/" + index + ".png"; }
			else if (index <= 11100) { src = "common/icon/bustpartner/" + index + ".png"; }
			else if (index <= 11200) { src = "common/icon/bustmount/" + index + ".png"; }
			else if (index <= 12000) { src = "common/icon/bustpet/" + index + ".png"; }
			else if (index <= 30000) { src = "common/icon/item/" + index + ".png"; }
			else if (index <= 30500) { src = "common/icon/avatarrole/" + index + ".png"; }
			else if (index <= 31000) { src = "common/icon/avatarmonster/" + index + ".png"; }
			else if (index <= 31100) { src = "common/icon/avatarpartner/" + index + ".png"; }
			else if (index <= 31200) { src = "common/icon/avatarmount/" + index + ".png"; }
			else if (index <= 32000) { src = "common/icon/avatarpet/" + index + ".png"; }
			else if (index <= 40500) { src = "common/icon/grayavatarrole/" + index + ".png"; }
			else if (index <= 41000) { src = "common/icon/grayavatarmonster/" + index + ".png"; }
			else if (index <= 41100) { src = "common/icon/grayavatarpartner/" + index + ".png"; }
			else if (index <= 41200) { src = "common/icon/grayavatarmount/" + index + ".png"; }
			else if (index <= 42000) { src = "common/icon/grayavatarpet/" + index + ".png"; }
			return src;
		}
		public show() {
			super.show();
			RequesterProtocols._instance.c2s_get_line_state();
			game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.OPEN_EVENT);
		}
		public hide() {
			super.hide()
			game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.CLOSEVIEW_EVENT);
		}
		public getView(): Sprite {
			return this._viewUI;
		}
	}
}