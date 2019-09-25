
module game.modules.commonUI{
	/** 战仙会（生死斗）的决斗规则 */
	export class JueDouRuleMediator extends game.modules.UiMediator{
		private _viewUI:ui.common.ChallengeRuleUI;
		constructor(app:AppBase){
			super(app.uiRoot.general);
			this._viewUI = new ui.common.ChallengeRuleUI();
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;			
		}
		public show() {
			super.show();	
			this._viewUI.close_btn.once(LEvent.MOUSE_DOWN,this,this.hide);	
			mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
		}
		public hide(){
			super.hide();
			mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
		}
		public getView():Sprite {
			return this._viewUI;
		}
	}
}