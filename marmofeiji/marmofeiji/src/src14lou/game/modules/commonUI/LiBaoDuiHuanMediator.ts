/**
* name 
*/
module game.modules.commonUI{
	export class LiBaoDuiHuanMediator extends game.modules.UiMediator{
		private _viewUI:ui.common.LiBaoDuiHuanUI;
		constructor(app:AppBase){
			super(app.uiRoot.general);
			this._viewUI = new ui.common.LiBaoDuiHuanUI();
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;			
			this._viewUI.cancel_btn.on(LEvent.MOUSE_DOWN,this,this.hide)
		}
		public show() {
			super.show();			
		}
		public hide(){
			super.hide()
		}
		public getView():Sprite {
			return this._viewUI;
		}
	}
}