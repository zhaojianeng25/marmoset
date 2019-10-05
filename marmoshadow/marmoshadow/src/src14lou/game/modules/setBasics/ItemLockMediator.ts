/**
 * 设置道具安全锁选项界面
 */
module game.modules.setBasics
{
	export class ItemLockMediator extends game.modules.UiMediator{
        private _viewUI:ui.common.ItemSecurityLockUI;
        /** 输入并设置道具安全锁 */
        private _setItemLockMediator:SetItemLockMediator;
        /** 输入重置的道具安全锁 */
        private _resetItemLockMediator:ResetItemLockMediator;
        /** 解除道具安全锁 */
        private _delItemLockMediator:DelItemLockMediator;

        constructor(app:AppBase)
		{
			super(app.uiRoot.general);
			this._viewUI = new ui.common.ItemSecurityLockUI();
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
            this._viewUI.close_btn.on(LEvent.CLICK,this,this.hide);
            this._viewUI.lockSet_btn.on(LEvent.CLICK,this,this.controlLockSet);
            this._viewUI.resetPassword_btn.on(LEvent.CLICK,this,this.controlResetPassword);
            this._viewUI.lockRelease_btn.on(LEvent.CLICK,this,this.controlLockRelease);
            this._viewUI.lockReleaseForce_btn.on(LEvent.CLICK,this,this.controlLockReleaseForce);
        }
        /**
         * 设置道具安全锁
         * @describe 进入输入道具安全锁界面
         *          如果已经有安全锁，则弹出提示“已设置好安全锁”飘窗
         *      
         */
        private controlLockSet():void{
            this._setItemLockMediator = new SetItemLockMediator(this._app);
            this._setItemLockMediator.show();

            this.hide();
        }
        /**
         * 重置道具安全锁
         * @describe 进入重新输入道具安全锁界面
         *          如果没安全锁，则弹出提示“请先设置安全锁”飘窗
         */
        private controlResetPassword():void{
            this._resetItemLockMediator = new ResetItemLockMediator(this._app);
            this._resetItemLockMediator.show();

            this.hide();
        }
        /**
         * 解除道具安全锁
         * @describe 进入输入道具安全锁界面
         *          如果没安全锁，则弹出提示“请先设置安全锁”飘窗
         */
        private controlLockRelease():void{
            this._delItemLockMediator = new DelItemLockMediator(this._app);
            this._delItemLockMediator.show();

            this.hide();
        }
        /**
         * 强制解除道具安全锁
         * @describe 进入强制解除道具安全锁界面
         *          如果没安全锁，则弹出提示“请先设置安全锁”飘窗
         */
        private controlLockReleaseForce():void{
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
            this._viewUI.lockSet_btn.off(LEvent.CLICK,this,this.controlLockSet);
            this._viewUI.resetPassword_btn.off(LEvent.CLICK,this,this.controlResetPassword);
            this._viewUI.lockRelease_btn.off(LEvent.CLICK,this,this.controlLockRelease);
            this._viewUI.lockReleaseForce_btn.off(LEvent.CLICK,this,this.controlLockReleaseForce);
        }
		public getView():Sprite 
		{
			return this._viewUI;
		}
    }
}