/**
 * 手机安全界面
 */
module game.modules.setBasics
{
	export class TelphoneSafeMediator extends game.modules.UiMediator{
        private _viewUI:ui.common.ShouJiAnQuanUI;
        private _bindTelMediator:modules.commonUI.BindTelMediator;
        private _itemLockMediator:ItemLockMediator;

        constructor(app:AppBase)
		{
			super(app.uiRoot.general);
			this._viewUI = new ui.common.ShouJiAnQuanUI();
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
            this._viewUI.bindTel_btn.on(LEvent.CLICK,this,this.controlBindTel);
            this._viewUI.itemLock_btn.on(LEvent.CLICK,this,this.controlItemLock);
        }
        /**
         * 控制道具安全锁
         * @describe 进入设置道具安全锁界面
         */
        private controlItemLock():void{
            this._itemLockMediator = new ItemLockMediator(this._app);
            this._itemLockMediator.show();
        }
        /**
         * 控制手机关联
         * @describe 如果用户没有设置手机关联，按钮名字为“手机关联”；如果用户设置了手机关联，按钮名字为解除关联
         *          被点击后，都出现手机关联窗口
         */
        private controlBindTel():void{
            //暂不知道如何去判断用户是否设置了手机关联
            this._bindTelMediator = new modules.commonUI.BindTelMediator(this._app);
            this._bindTelMediator.show();
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
            this._viewUI.bindTel_btn.off(LEvent.CLICK,this,this.controlBindTel);
            this._viewUI.itemLock_btn.off(LEvent.CLICK,this,this.controlItemLock);
        }
		public getView():Sprite 
		{
			return this._viewUI;
		}
    }
}