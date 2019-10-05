/**
 *  by : cwp
 * 系统设置模块
 */
module game.modules.setBasics
{
	export class SetBasicsModule extends game.modules.ModuleMediator{
        /** 系统设置UI */
        private _viewUI:ui.common.SetJiChuUI;
        /** 系统设置主界面 */
		private _setBasicsMediator:SetBasicsMediator;

        constructor(app:AppBase)
		{
			super();
			this.uiLayer = app.uiRoot.general;
			this._viewUI = new ui.common.SetJiChuUI();
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
            
			this._setBasicsMediator = new SetBasicsMediator(app);

			
		}


        protected onShow(event:Object):void 
		{
			this._setBasicsMediator.show();
			this._app.uiRoot.closeLoadProgress();
		}
		public hide():void 
		{
			super.hide();
		}
		
		public getView():Sprite 
		{
			return this._viewUI;
		}
    }
}