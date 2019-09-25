
module game.modules.strengThening {
	/** 强化系统模块 */
	export class StrengTheningModule extends game.modules.ModuleMediator {
		private _viewUI: ui.common.StrengTheningMainUI;
		/**打造 */
		private _StrengTheningMakeViewMediator: StrengTheningMakeViewMediator;
		/**镶嵌 */
		private _StrengTheningInsertViewMediator: StrengTheningInsertViewMediator;
		/**合成 */
		private _StrengTheningCompoundViewMediator: StrengTheningCompoundViewMediator;
		/**修理 */
		private _StrengTheningFixViewMediator: StrengTheningFixViewMediator;

		constructor(app: AppBase) {
			super();
			this.uiLayer = app.uiRoot.general;
			this._viewUI = new ui.common.StrengTheningMainUI();
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;

			this._StrengTheningMakeViewMediator = new StrengTheningMakeViewMediator(this._viewUI, this._app);
			this._StrengTheningInsertViewMediator = new StrengTheningInsertViewMediator(this._viewUI, this._app);
			this._StrengTheningCompoundViewMediator = new StrengTheningCompoundViewMediator(this._viewUI, this._app);
			this._StrengTheningFixViewMediator = new StrengTheningFixViewMediator(this._viewUI, this._app);
			this._viewUI.m_tab.selectHandler = new Handler(this, this.onMtab);
			this._viewUI.close_btn.on(LEvent.CLICK, this, this.onCloseBtn);
			models.StrengTheningProxy.getInstance().on(models.insertRedDot, this, this.showInsertRedDot);

		}
		/**显示镶嵌红点 */
		public showInsertRedDot(state) {
			if (state == 0) {
				this._viewUI.insertPoint_img.visible = false;
			} else {
				this._viewUI.insertPoint_img.visible = true;
			}
		}

		/**关闭界面 */
		public onCloseBtn(): void {
			mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
			this.hideInterface();
		}

		/**选择显示打造界面、镶嵌界面、合成界面、修理揭秘那 */
		public onMtab(index: number) {
			switch (index) {
				case 0:
					this.onMakeBtn(); //打造界面
					break;
				case 1:
					this.onInsertBtn();  // 镶嵌界面
					break;
				case 2:
					this.onCompoundBtn();  //合成界面
					break;
				case 3:
					this.onFixBtn();  //修理界面
					break;

			}
		}

		/**镶嵌 */
		public onInsertBtn() {
			game.modules.strengThening.models.StrengTheningModel._instance.tabNum = 1;
			this._StrengTheningInsertViewMediator.show();
			this._StrengTheningMakeViewMediator.hide();
			this._StrengTheningCompoundViewMediator.hide();
			this._StrengTheningFixViewMediator.hide();
		}

		/**打造 */
		public onMakeBtn() {
			game.modules.strengThening.models.StrengTheningModel._instance.tabNum = 0;
			this._StrengTheningMakeViewMediator.show();
			this._StrengTheningInsertViewMediator.hide();
			this._StrengTheningCompoundViewMediator.hide();
			this._StrengTheningFixViewMediator.hide();
		}

		/**合成 */
		public onCompoundBtn() {
			game.modules.strengThening.models.StrengTheningModel._instance.tabNum = 2;
			this._StrengTheningCompoundViewMediator.show();
			this._StrengTheningMakeViewMediator.hide();
			this._StrengTheningInsertViewMediator.hide();
			this._StrengTheningFixViewMediator.hide();
		}

		/**修理 */
		public onFixBtn() {
			game.modules.strengThening.models.StrengTheningModel._instance.tabNum = 3;
			this._StrengTheningFixViewMediator.show();
			this._StrengTheningCompoundViewMediator.hide();
			this._StrengTheningMakeViewMediator.hide();
			this._StrengTheningInsertViewMediator.hide();
		}

		protected onShow(event: Object): void {
			this.show();
			this._viewUI.m_tab.selectedIndex = strengThening.models.StrengTheningModel.getInstance().tabNum;
			this.onMtab(strengThening.models.StrengTheningModel.getInstance().tabNum);
			mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
		}

		public hide(): void {
			strengThening.models.StrengTheningModel.getInstance().tabNum = 0;
			if (LoginModel.getInstance().transferInterface != "") {
				// ModuleManager.show(LoginModel.getInstance().transferInterface, this._app);
				// LoginModel.getInstance().CommonPage = "";
			} else if (LoginModel.getInstance().CommonPage != "") {
				ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
				LoginModel.getInstance().CommonPage = "";
			}
			super.hide();

		}
		private hideInterface(): void {
			strengThening.models.StrengTheningModel.getInstance().tabNum = 0;
			if (LoginModel.getInstance().CommonPage != "") {
				ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
				LoginModel.getInstance().CommonPage = "";
			}
			super.hide();
		}

		public getView(): Sprite {
			return this._viewUI;
		}

	}
}