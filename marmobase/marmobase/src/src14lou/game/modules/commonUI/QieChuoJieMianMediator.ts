/**
* name 
*/
module game.modules.commonUI{
	export class QieChuoJieMianMediator extends game.modules.UiMediator{ 
		private _viewUI:ui.common.QieChuoJieMianUI;
		constructor(app:AppBase){
			super(app.uiRoot.general);
			this._viewUI = new ui.common.QieChuoJieMianUI();
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;			
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN,this,this.hide)
		}
		public init(tabid:number){
			this._viewUI.select_tab.selectedIndex = tabid
			this.show()
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