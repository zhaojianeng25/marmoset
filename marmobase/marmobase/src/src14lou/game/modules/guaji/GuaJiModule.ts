/**
 * 挂机系统
 */
module game.modules.guaji{
	export class GuaJiModule extends game.modules.ModuleMediator{
        private _viewUI:ui.common.GuaJIUI;
        private _guaJiMediator:GuaJiMediator;

        constructor(app:AppBase){
			super();
			this.uiLayer = app.uiRoot.general;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;

			this._guaJiMediator = new GuaJiMediator(this._app);
		}

        protected onShow(event:Object):void {
			this._guaJiMediator.show();
			this._app.uiRoot.closeLoadProgress();
		}
		public hide():void {
			super.hide();
		}
		
		public getView():Sprite {
			return this._viewUI;
		}

    }
}