/**
* 奖励主窗口 
*/
import RewardModel = game.modules.reward.models.RewardModel
import RewardProxy = game.modules.reward.models.RewardProxy
module game.modules.reward {
	export class RewardModule extends game.modules.ModuleMediator {
		private _viewUI: ui.common.RewardUI;
		private _chargeMediator: ChargeMediator;
		private _levelUpMediator: LevelUpMediator;
		private _monthMediator: MonthMediator;
		private _newPlayMediator: NewPlayMediator;
		private _phoneMediator: PhoneMediator;
		private _sevenDayMediator: SevenDayMediator;
		private _signinMediator: SigninMediator;
		public levelUpItemId: number;
		constructor(app: AppBase) {
			super();
			this.uiLayer = app.uiRoot.general;
			this._viewUI = new ui.common.RewardUI();
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;

			this._chargeMediator = new ChargeMediator(this._viewUI);
			this._levelUpMediator = new LevelUpMediator(this._viewUI);
			this._monthMediator = new MonthMediator(this._viewUI);
			this._newPlayMediator = new NewPlayMediator(this._viewUI);
			this._phoneMediator = new PhoneMediator(this._viewUI);
			this._sevenDayMediator = new SevenDayMediator(this._viewUI);
			this._signinMediator = new SigninMediator(this._viewUI);
			this._chargeMediator.app = this._app;
			this._levelUpMediator.app = this._app;
			this._monthMediator.app = this._app;
			this._newPlayMediator.app = this._app;
			this._phoneMediator.app = this._app;
			this._sevenDayMediator.app = this._app;
			this._signinMediator.app = this._app;

			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.clickCloseBtn);
			this._viewUI.btns_list.renderHandler = new Handler(this, this.onSelect);
			this.eventListener();
		}
		/**初始化界面 */
		public initUI(): void {
			for (var i: number = 0; i < 6; i++) {
				if (RewardModel.getInstance().pointDic.get(i) != 0) {
					var pointImg: Laya.Image = this._viewUI.btns_list.getCell(i).getChildByName("point_img") as Laya.Image;
					pointImg.visible = true;
				}
			}
		}
		/**注册事件监听 */
		public eventListener(): void {
			models.RewardProxy.getInstance().on(models.NEWPLAYERPOINT_EVENT, this, this.onnewplayerPoint);
			models.RewardProxy.getInstance().on(models.NEWPLAYERGET_EVENT, this, this.onnewplayerGet);
			models.RewardProxy.getInstance().on(models.EVERYDAY_EVENT, this, this.oneveryDay);
			models.RewardProxy.getInstance().on(models.SEVENDAY_EVENT, this, this.onsevenDay);
			models.RewardProxy.getInstance().on(models.LEVELUP_EVENT, this, this.onlevelUp);
			models.RewardProxy.getInstance().on(models.STATE_EVENT, this, this.changeText);
			models.RewardProxy.getInstance().on(models.REFRESH, this, this.init, [rewardBtnType.SIGNIN]);
		}
		/**升级礼包红点隐藏 */
		public onlevelUp(): void {
			var pointImg: Laya.Image = this._viewUI.btns_list.getCell(5).getChildByName("point_img") as Laya.Image;
			pointImg.visible = false;
			this.hideRewardPoint();
		}
		/**七日签到红点隐藏 */
		public onsevenDay(): void {
			var pointImg: Laya.Image = this._viewUI.btns_list.getCell(3).getChildByName("point_img") as Laya.Image;
			pointImg.visible = false;
			this.hideRewardPoint();
		}
		/**主界面奖励系统红点隐藏 */
		public hideRewardPoint(): void {
			var key = true;
			for (var i: number = 0; i < 6; i++) {
				if (RewardModel.getInstance().pointDic.get(i) != 0) {
					key = false;
				}
			}
			if (key) {
				RewardProxy.getInstance().event(models.REWARDPOINT_EVENT);//主界面奖励系统红点隐藏
			}
		}
		/**每日签到红点隐藏 */
		public oneveryDay(): void {
			var pointImg: Laya.Image = this._viewUI.btns_list.getCell(0).getChildByName("point_img") as Laya.Image;
			pointImg.visible = false;
			this.hideRewardPoint();
		}
		/**新手礼包红点 */
		public onnewplayerPoint(): void {
			var pointImg: Laya.Image = this._viewUI.btns_list.getCell(4).getChildByName("point_img") as Laya.Image;
			pointImg.visible = true;
		}
		/**新手礼包红点隐藏 */
		public onnewplayerGet(): void {
			var pointImg: Laya.Image = this._viewUI.btns_list.getCell(4).getChildByName("point_img") as Laya.Image;
			pointImg.visible = false;
			this.hideRewardPoint();
		}
		/** 改变首充礼包文字监听 */
		public changeText(): void {
			var lab = this._viewUI.btns_list.getCell(rewardBtnType.CHARGE).getChildByName("btns_lab") as Laya.Label;
			if (RewardModel.getInstance().state > 1) {
				lab.text = "贵礼包";
			} else {
				lab.text = "首充礼包";
			}
		}
		/** 奖励主界面需要显示的按钮合集 */
		public rewardBtns: Array<models.RewardType>;
		private init(index: number): void {
			if (this.selectIndex != undefined) {
				this.viewHide();
			}
			this.selectIndex = -1;
			//_rewardType中相对应的模块的isShow为0时，表示该模块不显示
			var _rewardType = RewardModel.getInstance().rewardType;
			//------------手机关联功能暂时关闭--------------
			/** 是否显示手机关联 */
			// RequesterProtocols._instance.c2s_CGetBindTel();
			// RewardProxy.getInstance().once(models.GETBINDTEL_EVENT, this, () => {
			// 	if (RewardModel.getInstance().bindTel.isGetBindTelAward != 0) {
			_rewardType.get(rewardBtnType.PHONE).isShow = 0;
			// } else {
			// 	_rewardType.get(rewardBtnType.PHONE).isShow = 1;
			// }
			// });

			//是否显示升级礼包
			var itemId = this.getBagItemId();
			if (itemId == 0) {
				_rewardType.get(rewardBtnType.LEVELUP).isShow = 0;
			} else {
				this.levelUpItemId = itemId;
				this._levelUpMediator.init(this.levelUpItemId);
				_rewardType.get(rewardBtnType.LEVELUP).isShow = 1;
			}
			//是否显示 首充/贵礼包
			var vipInfo = RewardModel.getInstance().vipInfo;
			if (vipInfo.viplevel == 11 && vipInfo.gotbounus == vipInfo.bounus) {
				_rewardType.get(rewardBtnType.CHARGE).isShow = 0;
			}
			//是否显示七日签到
			if (!RewardModel.getInstance().mulDayLogin) {
				_rewardType.get(rewardBtnType.SEVENDAY).isShow = 0;
			}
			else if (RewardModel.getInstance().mulDayLogin.logindays >= 7) {
				for (var i: number = 0; i < RewardModel.getInstance().mulDayLogin.rewardmap.values.length; i++) {
					if (RewardModel.getInstance().mulDayLogin.rewardmap.values[i] == 0) {
						_rewardType.get(rewardBtnType.SEVENDAY).isShow = 1;
						break;
					}
					if (i == RewardModel.getInstance().mulDayLogin.rewardmap.values.length - 1 && RewardModel.getInstance().mulDayLogin.rewardmap.values[i] != 0) {
						_rewardType.get(rewardBtnType.SEVENDAY).isShow = 0;
					}
				}
			} else {
				_rewardType.get(rewardBtnType.SEVENDAY).isShow = 1;
			}
			//是否显示新手奖励
			if (RewardModel.getInstance().awardid == -1 || !RewardModel.getInstance().awardid) {
				_rewardType.get(rewardBtnType.NEWPLAYER).isShow = 0;
			}
			this.rewardBtns = [];
			for (var i: number = 0; i < _rewardType.keys.length; i++) {
				if (_rewardType.get(i).isShow != 0) {
					this.rewardBtns.push(_rewardType.get(i));
				}
			}
			var data: Array<any> = [];
			for (var i: number = 0; i < this.rewardBtns.length; i++) {
				var name = this.rewardBtns[i].name;
				if (this.rewardBtns[rewardBtnType.CHARGE].type == i && RewardModel.getInstance().state <= 1) {
					name = "首充礼包";
				}
				data.push({
					cell_btn: { selected: false },
					btns_img: { skin: this.rewardBtns[i].skin },
					btns_lab: { text: name },
				});
			}
			this._viewUI.btns_list.array = data;

			for (var i: number = 0; i < this.rewardBtns.length; i++) {
				if (this.rewardBtns[i].type == index) {
					this.cutView(i);
				}
			}
		}
		/** 当前选中的模块按钮监听 */
		public onSelect(cell: Laya.Box, index: number): void {
			var btn: Laya.Button = cell.getChildByName("cell_btn") as Laya.Button;
			btn.on(LEvent.MOUSE_DOWN, this, this.cutView, [index]);
		}
		/** 选中的模块编号 */
		public selectIndex: number;
		/** 按钮样式设置并切换界面 */
		public cutView(index: number) {
			if (this.selectIndex != index) {
				if (this.selectIndex != -1) {
					this.viewHide();
					var data = { cell_btn: { selected: false } };
					this._viewUI.btns_list.setItem(this.selectIndex, data);
				}
				var data = { cell_btn: { selected: true } };
				this._viewUI.btns_list.setItem(index, data);
				this.selectIndex = index;
				this.viewShow(index);
			}
		}
		/** 界面显示 */
		public viewShow(index: number): void {
			var num = this.rewardBtns[index].type;
			switch (num) {
				case rewardBtnType.SIGNIN:
					RequesterProtocols._instance.c2s_queryregdata();
					RewardProxy.getInstance().once(models.REGDATA_EVENT, this, () => {
						this._signinMediator.show();
					});
					break;
				case rewardBtnType.CHARGE:
					// RequesterProtocols._instance.c2s_CRequestVipInfo();
					// RewardProxy.getInstance().once(models.VIP_EVENT, this, () => {
					this._chargeMediator.show();
					// });
					break;
				case rewardBtnType.MONTH:
					// RequesterProtocols._instance.c2s_CRequestMonthCard();
					// RewardProxy.getInstance().once(models.MONTH_EVENT, this, () => {
					this._monthMediator.show();
					// });
					break;
				case rewardBtnType.SEVENDAY:
					this._sevenDayMediator.show();
					break;
				case rewardBtnType.NEWPLAYER:
					this._newPlayMediator.show();
					break;
				case rewardBtnType.PHONE:
					this._phoneMediator.show();
					break;
				case rewardBtnType.LEVELUP:
					this._levelUpMediator.init(this.levelUpItemId);
					this._levelUpMediator.show();
					break;
			}
		}
		/** 界面隐藏 */
		public viewHide(): void {
			var type = this.rewardBtns[this.selectIndex].type;
			switch (type) {
				case rewardBtnType.SIGNIN:
					this._signinMediator.hide();
					break;
				case rewardBtnType.CHARGE:
					this._chargeMediator.hide();
					break;
				case rewardBtnType.MONTH:
					this._monthMediator.hide();
					break;
				case rewardBtnType.SEVENDAY:
					this._sevenDayMediator.hide();
					break;
				case rewardBtnType.NEWPLAYER:
					this._newPlayMediator.hide();
					break;
				case rewardBtnType.PHONE:
					this._phoneMediator.hide();
					break;
				case rewardBtnType.LEVELUP:
					this._levelUpMediator.hide();
					break;
			}
		}
		/** 判断背包中是否有升级礼包，没有不显示该模块的入口 */
		public getBagItemId(): number {
			var bagArr = game.modules.bag.models.BagModel.getInstance().getBagGameItemData(BagTypes.BAG).items;
			if (bagArr.length <= 0) return 0;
			for (var i: number = 0; i < bagArr.length; i++) {
				var id = bagArr[i].id;
				if (id >= 105000 && id <= 105009) {
					return id;
				}
			}
			return 0;
		}

		protected onShow(event: Object): void {
			RequesterProtocols._instance.c2s_CRequestVipInfo();
			RewardProxy.getInstance().once(models.VIP_EVENT, this, () => {
				this._app.uiRoot.closeLoadProgress();
				mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
				this.init(rewardBtnType.SIGNIN);
				this.show();
				this.initUI();
			});
			// RequesterProtocols._instance.c2s_queryregdata();
			// RewardProxy.getInstance().once(game.modules.reward.models.REGDATA_EVENT, RewardProxy.getInstance(), () => {
			// mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
			// this.init(rewardBtnType.SIGNIN);
			// this.show();
			// this.initUI();
			// });
		}
		public show(): void {
			super.show();
		}
		public clickCloseBtn(): void {
			mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
			this.hide();
		}
		public hide(): void {
			super.hide();
			if (LoginModel.getInstance().CommonPage != "") {
				ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
				LoginModel.getInstance().CommonPage = "";
			}
		}
		public getView(): Sprite {
			return this._viewUI;
		}
		public onJump(event: Object): void {
			this.jumpPage(event);
		}
		public jumpPage(index: any): void {
			RequesterProtocols._instance.c2s_CRequestVipInfo();
			RewardProxy.getInstance().once(models.VIP_EVENT, this, () => {
				this.init(index);
				this.show();
			});
		}
	}
}