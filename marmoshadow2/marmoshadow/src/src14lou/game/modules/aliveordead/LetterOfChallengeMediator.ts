module game.modules.aliveordead {
	/** 战仙会（生死斗）的下战书界面 */
	export class LetterOfChallengeMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.ChallengeToUI;
		/** 下战书成功返回的信息数据 */
		private _invitationSuccessVo: models.InvitationSuccessVo;
		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.ChallengeToUI();
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
		}
		public show() {
			super.show();
			this.registerEvent();
			this.init();
			mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
		}

		/** 界面的初始化 */
		private init(): void {
			this._viewUI.determine_btn.mouseEnabled = false;
			this._viewUI.determine_btn.gray = true;
			this._viewUI.battleWith_rag.selectedIndex = 0;
		}

		/** 事件注册 */
		private registerEvent(): void {
			//UI控件事件监听
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
			this._viewUI.roleNameOrRoleId_txtinput.on(LEvent.INPUT, this, this.changeBtn);
			this._viewUI.determine_btn.on(LEvent.MOUSE_DOWN, this, this.determine);
			this._viewUI.cancel_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
			//消息事件监听
			models.AliveOrDeadProxy.getInstance().on(models.InvitationLiveDieSuccess, this, this.showConfirmUI);
			models.AliveOrDeadProxy.getInstance().on(models.InvitationLiveDieOK, this, this.hide);
		}
		/** 确认下战书 */
		private confirmInvitation():void{
			let yinBiNum = BagModel.getInstance().sliverIcon;//获取银币数量
			if(yinBiNum < this._invitationSuccessVo.costmoney){//不能支付下战书所需花费的银币
				/** 需要兑换的银币 */
				let duihuanMoney = this._invitationSuccessVo.costmoney - yinBiNum;
				/** 兑换所需的仙晶 */
				let _needFuShi: number;
				if ((Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI) - HudModel.getInstance().fuShiNum) <= 0) {
					_needFuShi = Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI);
				}
				else {
					_needFuShi = (Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI) - HudModel.getInstance().fuShiNum);
				}
				/** 兑换所需的金币 */
				let _needGold: number;
				if ((Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI) - HudModel.getInstance().goldNum) <= 0) {
					_needGold = Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI);
				}
				else {
					_needGold = (Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI) - HudModel.getInstance().goldNum);
				}
				let _jinBiBuZu = new commonUI.JinBiBuZuViewMediator(this._viewUI, this._app);
				_jinBiBuZu.onShow(false, duihuanMoney.toString(), _needFuShi.toString(), _needGold.toString());
				_jinBiBuZu.once(commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.yuanBaoDuiHuanYinBi, [_needFuShi]);
				_jinBiBuZu.once(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.yuanBaoDuiHuanJinBi, [_needFuShi]);
			}		
			else{
				RequesterProtocols._instance.c2s_CInvitationLiveDieBattleOK(this._invitationSuccessVo.objectid, this._invitationSuccessVo.selecttype);
			}
			this.hide();
		}
		/**仙晶兑换金币 */
		private yuanBaoDuiHuanJinBi(yuanbao) {
			var fuShiNum = HudModel.getInstance().fuShiNum;
			if (fuShiNum < yuanbao) {
				var param: Dictionary = new Dictionary();
				param.set("contentId", RoleEnum.XIANJIN_TIP);
				let _tipsModule = new tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, param);
				game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
			} else {
				RequesterProtocols._instance.c2s_exchange_currency(3, 2, yuanbao);
			}
		}
		/** 元宝兑换银币 */
		private yuanBaoDuiHuanYinBi(yuanbao) {
			var fuShiNum = HudModel.getInstance().fuShiNum;
			if (fuShiNum < yuanbao) {
				var param: Dictionary = new Dictionary();
				param.set("contentId", RoleEnum.XIANJIN_TIP);
				let _tipsModule = new tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, param);
				game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
			} else {
				RequesterProtocols._instance.c2s_exchange_currency(3, 1, yuanbao);
			}

		} 
		/**充值 */
		private goRecharge() {
			ModuleManager.jumpPage(ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
			game.modules.shop.models.ShopProxy._instance.event(game.modules.shop.models.Go_Charge);   //前往充值界面。关闭当前界
		}
		/** 显示确认界面 */
		private showConfirmUI(vo:models.InvitationSuccessVo):void{
			this._invitationSuccessVo = vo;
			let parame = new Laya.Dictionary();
			parame.set("contentId", 162070);
			parame.set("parame", [vo.objectname, vo.costmoney.toString()]);
			tips.models.TipsProxy.getInstance().once(tips.models.TIPS_ON_OK, this, this.confirmInvitation);
			let _tipsModule = new tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, parame);
		}
		/** 确定下战书 */
		private determine(): void {
			let txtStr = this._viewUI.roleNameOrRoleId_txtinput.text;
			let _selecttype = LiveDeadSelectType.OnePerson;
			if(this._viewUI.battleWith_rag.selectedIndex == 1){
				_selecttype = LiveDeadSelectType.MultiplePerson;
			}
			RequesterProtocols._instance.c2s_CInvitationLiveDieBattle(txtStr, _selecttype);
		}
		/** 更改按钮状态
		 * @describe 以防玩家没输入任何名字或者id就下战书
		 */
		private changeBtn(): void {
			if (this._viewUI.roleNameOrRoleId_txtinput.text == ""){
				this._viewUI.determine_btn.mouseEnabled = false;
				this._viewUI.determine_btn.gray = true;
			}
			else{
				this._viewUI.determine_btn.mouseEnabled = true;
				this._viewUI.determine_btn.gray = false;
			}
		}

		public hide() {
			super.hide();
			this.removeEvent();
			mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
		}

		/** 移除事件 */
		private removeEvent(): void {
			this._viewUI.close_btn.off(LEvent.MOUSE_DOWN, this, this.hide);
			this._viewUI.roleNameOrRoleId_txtinput.off(LEvent.INPUT, this, this.changeBtn);
			this._viewUI.determine_btn.off(LEvent.MOUSE_DOWN, this, this.determine);
			this._viewUI.cancel_btn.off(LEvent.MOUSE_DOWN, this, this.hide);
			models.AliveOrDeadProxy.getInstance().off(models.InvitationLiveDieSuccess, this, this.showConfirmUI);
			models.AliveOrDeadProxy.getInstance().off(models.InvitationLiveDieOK, this, this.hide);
		}

		public getView(): Sprite {
			return this._viewUI;
		}
	}
}