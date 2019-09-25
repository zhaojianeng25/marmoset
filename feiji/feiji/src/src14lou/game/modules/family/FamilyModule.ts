/**
* 帮派系统
*/
module game.modules.family {
	export class FamilyModule extends game.modules.ModuleMediator {
		private _viewUI: ui.common.FamilySystemUI;//ui.common.CreateRoleUI;
		/**帮派信息 */
		private _FamilyInfoViewMediator: FamilyInfoViewMediator;     
		/**帮派成员 */
		private _FamilyMemberViewMediator: FamilyMemberViewMediator;     
		/**帮派福利 */
		private _FamilyWelfareViewMediator: FamilyWelfareViewMediator;     
		/**帮派活动 */
		private _FamilyActivityViewMediator: FamilyActivityViewMediator;     

		constructor(app: AppBase) {
			super();
			this.uiLayer = app.uiRoot.general;
			this._viewUI = new ui.common.FamilySystemUI();
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this._FamilyInfoViewMediator = new FamilyInfoViewMediator(this._viewUI, this._app);
			this._FamilyMemberViewMediator = new FamilyMemberViewMediator(this._viewUI, this._app);
			this._FamilyWelfareViewMediator = new FamilyWelfareViewMediator(this._viewUI, this._app);
			this._FamilyActivityViewMediator = new FamilyActivityViewMediator(this._viewUI, this._app);
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
			this._viewUI.familyBtn_tab.selectHandler = new Handler(this, this.onFamilyBtn);
			models.FamilyProxy._instance.on(models.CloseModule, this, this.hide);
			models.FamilyProxy._instance.on(models.isShowFamilyRedDot, this, this.isShowFamilyRedDot);
			models.FamilyProxy._instance.on(models.SClanRedTip, this, this.showRedDot);

		}
        
		/**是否显示公会红点 */
		public isShowFamilyRedDot(state) {
			if (state == 0) {
				this._viewUI.familyHongdian_img.visible = false;
			} else {
				this._viewUI.familyHongdian_img.visible = true;
			}

		}
        
		/**根据协议返回显示红点 */
		public showRedDot(redtips:Dictionary){
            var keys = redtips.keys;
            if(redtips.get(keys[0]) == 1){
                this._viewUI.familyHongdian_img.visible = true;  //显示
            }else{
                this._viewUI.familyHongdian_img.visible = false;  //关闭
            }
        }

        /**选择显示公会信息界面、公会成员界面、福利界面、活动界面 */
		public onFamilyBtn(index: number) {
			switch (index) {
				case 0:
					this.FamilyInfo();  //公会信息界面
					break;
				case 1:
					this.FamilyMember();  //成员界面
					break;
				case 2:
					this.FamilyWelfare();  //福利界面
					break;
				case 3:
					this.FamilyActivity();  //活动界面
					break;
			}

		}

		/**
		 * 帮派信息
		 */
		public FamilyInfo() {
			this._FamilyInfoViewMediator.show();
			this._FamilyMemberViewMediator.hide();
			this._FamilyWelfareViewMediator.hide();
			this._FamilyActivityViewMediator.hide();
		}

		/**成员 */
		public FamilyMember() {
			this._FamilyInfoViewMediator.hide();
			this._FamilyMemberViewMediator.show();
			this._FamilyWelfareViewMediator.hide();
			this._FamilyActivityViewMediator.hide();

		}

		/**福利 */
		public FamilyWelfare() {
			this._FamilyInfoViewMediator.hide();
			this._FamilyMemberViewMediator.hide();
			this._FamilyWelfareViewMediator.show();
			this._FamilyActivityViewMediator.hide();

		}

		/**活动 */
		public FamilyActivity() {
			this._FamilyInfoViewMediator.hide();
			this._FamilyMemberViewMediator.hide();
			this._FamilyWelfareViewMediator.hide();
			this._FamilyActivityViewMediator.show();

		}

		/**移除主界面tips监听 */
		public offMainEvent() {
			models.FamilyProxy._instance.event(models.removeMainTips);
		}

		protected onShow(event: Object): void {
			this.offMainEvent();
			this.show();
			this._viewUI.familyBtn_tab.selectedIndex = 0;
			var _clanCurrenTabNum = models.FamilyModel.getInstance().clanCurrenTabNum;
			if(_clanCurrenTabNum != -1){
				this._viewUI.familyBtn_tab.selectedIndex = _clanCurrenTabNum;
				models.FamilyModel.getInstance().clanCurrenTabNum = -1;
			}
			else{
				this._FamilyInfoViewMediator.show();
			}
			mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
		}


		public hide(): void {
			super.hide();
			mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
		}

		public getView(): Sprite {
			return this._viewUI;
		}

	}
}