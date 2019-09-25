/**
 * 手机关联界面
 */
module game.modules.commonUI
{
	export class BindTelMediator extends game.modules.UiMediator{
        private _viewUI:ui.common.component.PhoneAssociationUI;

        constructor(app:AppBase)
		{
			super(app.uiRoot.general);
			this._viewUI = new ui.common.component.PhoneAssociationUI();
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;

            
		}

        public show():void 
		{   this._initUI();
            this.registerEvent();
			super.show();
		}
        ////////////////
        ///事件
        ////////////////
        /**注册事件
         * @describe  UI的事件监听注册
         */
        private registerEvent():void{
            //UI事件
            this._viewUI.close_btn.on(LEvent.CLICK,this,this.hide);
        }
        
        /**
         * 初始化界面
         * @describe  
         */
        private _initUI():void{

        }

        public hide():void 
		{
			super.hide();
            this.removeEvent();
		}
		/**
         * 移除事件
         */
        private removeEvent():void{
            this._viewUI.close_btn.off(LEvent.CLICK,this,this.hide);
        }
		public getView():Sprite 
		{
			return this._viewUI;
		}
    }
}