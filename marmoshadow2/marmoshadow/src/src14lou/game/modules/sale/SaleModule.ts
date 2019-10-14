
module game.modules.sale {
	/** 拍卖行模块module */
	export class SaleModule extends game.modules.ModuleMediator {
		private _viewUI: ui.common.SaleSystemUI;//ui.common.CreateRoleUI;
		/**购买界面 */
		private _AuctionViewMediator: SaleViewMediator;
		/**公示界面 */
		private _AuctionGongshiViewMediator: SaleGongshiViewMediator;
		/**出售界面*/
		private _AuctionSellViewMediator: SaleSellViewMediator;

		constructor(app: AppBase) {
			super();
			this.uiLayer = app.uiRoot.general;
			this._viewUI = new ui.common.SaleSystemUI();
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this._AuctionViewMediator = new SaleViewMediator(this._viewUI, this._app);
			this._AuctionSellViewMediator = new SaleSellViewMediator(this._viewUI, this._app);
			this._AuctionGongshiViewMediator = new SaleGongshiViewMediator(this._viewUI, this._app);
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.clickCloseBtn);
			this._viewUI.m_tab.selectHandler = new Handler(this, this.onMtab);
		}
         
		/**选择购买界面、出售界面、公示界面 */
		public onMtab(index: number) {
			switch (index) {
				case 0:
					this.onGoumai();
					break;
				case 1:
					this.onSell();
					break;
				case 2:
					this.onGongshi();
					break;
			}
		}
		/**购买 */
		public onGoumai() {
			this._AuctionViewMediator.show();
			this._AuctionSellViewMediator.hide();
			this._AuctionGongshiViewMediator.hide();
		}
		/**公示 */
		public onGongshi() {
			this._AuctionViewMediator.hide();
			this._AuctionSellViewMediator.hide();
			this._AuctionGongshiViewMediator.show();
		}
		/**出售 */
		public onSell() {
			this._AuctionViewMediator.hide();
			this._AuctionSellViewMediator.show();
			this._AuctionGongshiViewMediator.hide();
		}

        
		/**点击关闭按钮 */
		public clickCloseBtn(): void {
			mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
			this.hide();
		}

		protected onShow(event: Object): void {
			this.show();
			this._viewUI.m_tab.selectedIndex = models.SaleModel._instance.tiaozhuanid;
			this.onMtab(models.SaleModel._instance.tiaozhuanid);
			this._app.uiRoot.closeLoadProgress();
			mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
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

	}
}