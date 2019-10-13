/** 排行榜 */
module game.modules.ranKingList{
    /** 排行榜moudle*/
    export class RanKingListModule extends game.modules.ModuleMediator{
        /**排行榜UI*/
        private _viewUI:ui.common.RanKingListUI;
        /** 排行榜主界面 */
        private _ranKingListMediator:RanKingListMediator;
        
        constructor(app:AppBase){
            super();
            this.uiLayer = app.uiRoot.general;
            this._viewUI = new ui.common.RanKingListUI();
            this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;

            this._ranKingListMediator = new RanKingListMediator(app);
        }

        protected onShow(event:Object):void {
			this._ranKingListMediator.show();
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