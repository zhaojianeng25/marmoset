/**
* 过图场景 界面
*/
module game.modules.commonUI{
	export class ChangJingChangeMediator extends game.modules.UiMediator{
		private _viewUI:ui.common.component.ChangJingChangeUI;
		/** 用来判断是否从登陆界面调用 */
		private flag:boolean;
		constructor(app:AppBase){
			super(app.uiRoot.general);
			this._viewUI = new ui.common.component.ChangJingChangeUI();
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;			
		}
		public onShow(flag:boolean):void{
			this.flag = flag;
			this.show();
		}
		public show() {
			if(this.flag){
				this._viewUI.bg_img.skin = "common/ui/load/LoginBg.png";
			}
			else{
				this._viewUI.bg_img.skin = "common/ui/tongyong/qiehuan.png";
			}
			super.show();	
			this._viewUI.con_progre.value = 0
			Laya.timer.loop(140,this,this.progress)
		}
		public progress(){
			this._viewUI.con_progre.value+=0.1
			if(this._viewUI.con_progre.value>=1){
				Laya.timer.clear(this,this.progress)
				this.hide()
				 game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.CHNANGJING_PRO)
			}
		}
		public hide(){
			super.hide();
			// if(!game.modules.createrole.models.LoginModel.getInstance().isMainInit)game.modules.createrole.models.LoginProxy.getInstance().event(game.modules.createrole.models.SHOW_MAIN);
		}
		public getView():Sprite {
			return this._viewUI;
		}
	}
}