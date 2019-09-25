/**
 * 输入道具安全锁密码成功界面
 */
module game.modules.setBasics
{
	export class SetItemLockSuccessMediator extends game.modules.UiMediator{
        private _viewUI:ui.common.SetItemLockSuccessUI;
        /** 设置道具安全锁选项界面 */
        private _itemLockMediator:ItemLockMediator;
        /** 当前密码 */
        private curr_password:string ="";
        /** 输入安全锁界面 */
        private _setItemLockMediator:SetItemLockMediator;

        constructor(app:AppBase)
		{
			super(app.uiRoot.general);
			this._viewUI = new ui.common.SetItemLockSuccessUI();
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;

		}
        public onShow(password?:string):void{
            this.curr_password = password;
            this.show();
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
            this._viewUI.confirm_btn.on(LEvent.CLICK,this,this.hide);
            this._viewUI.set_btn.on(LEvent.CLICK,this,this.goToSet)
            //消息监听            
            models.SetBasicsProxy.getInstance().on(models.SET_PASSWORD_SUCCESS_EVENT,this,this.show_currPassword);
            models.SetBasicsProxy.getInstance().on(models.RESET_PASSWORD_SUCCESS_EVENT,this,this.show_currResetPassword);
            models.SetBasicsProxy.getInstance().on(models.DEL_PASSWORD_SUCCESS_EVENT,this,this.show_remind);
        }
        /**
         * 跳转设置安全锁
         */
        private goToSet():void{
            this._setItemLockMediator = new SetItemLockMediator(this._app);
            this._setItemLockMediator.show();
        }
        /**
         * 显示提醒
         */
        private show_remind():void{
            this._viewUI.currPassword_textinput.visible = false;
            this._viewUI.tip1_lab.visible = false;    
            this._viewUI.tip2_lab.visible = false;
            this._viewUI.confirm_btn.visible = false;
            this._viewUI.title_lab.text = "解除安全锁";

            this._viewUI.tip3_lab.visible = true;
            this._viewUI.remind_lab.visible = true;
            this._viewUI.set_btn.visible = true; 
        }
        /**
         * 显示当前重置的密码
         */
        private show_currResetPassword():void{
            this._viewUI.currPassword_textinput.text = "当前的安全锁密码为：" + this.curr_password;
            this._viewUI.currPassword_textinput.visible = true;
            this._viewUI.tip1_lab.visible = false;    
            this._viewUI.tip2_lab.visible = true;
            this._viewUI.title_lab.text = "重置安全锁";
        }
        /**
         * 显示当前设置的密码
         */
        private show_currPassword():void{
            this._viewUI.currPassword_textinput.text = "当前的安全锁密码为：" + this.curr_password;
        }
        /**
         * 初始化界面
         * @describe  
         */
        private _initUI():void{
            this._viewUI.currPassword_textinput.visible = true;
            this._viewUI.tip1_lab.visible = true;    
            this._viewUI.tip2_lab.visible = false;
            this._viewUI.confirm_btn.visible = true;
            this._viewUI.title_lab.text = "安全锁设置";

            this._viewUI.tip3_lab.visible = false;
            this._viewUI.remind_lab.visible = false;
            this._viewUI.set_btn.visible = false;   
        }

        public hide():void 
		{
			super.hide();
            this._itemLockMediator = new ItemLockMediator(this._app);
            this._itemLockMediator.show();
            this.removeEvent();
		}
		/**
         * 移除事件
         */
        private removeEvent():void{
            this._viewUI.close_btn.off(LEvent.CLICK,this,this.hide);
            this._viewUI.confirm_btn.off(LEvent.CLICK,this,this.hide);
            this._viewUI.set_btn.off(LEvent.CLICK,this,this.goToSet);
            models.SetBasicsProxy.getInstance().off(models.SET_PASSWORD_SUCCESS_EVENT,this,this.show_currPassword);
            models.SetBasicsProxy.getInstance().off(models.RESET_PASSWORD_SUCCESS_EVENT,this,this.show_currResetPassword);
            models.SetBasicsProxy.getInstance().off(models.DEL_PASSWORD_SUCCESS_EVENT,this,this.show_remind);
        }
		public getView():Sprite 
		{
			return this._viewUI;
		}
    }
}