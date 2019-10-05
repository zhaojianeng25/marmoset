/**
 * 重新设置道具安全锁界面
 */
module game.modules.setBasics
{
	export class ResetItemLockMediator extends game.modules.UiMediator{
        private _viewUI:ui.common.ResetItemLockPasswordUI;
        /** 原密码 */
        private old_pd:string;
        /** 输入重置的密码 */
        private reset_pd:string;
        /** 再次输入重置的密码 */
        private reset_repeatpd:string;
        /** 消息飘窗界面 */
        private _disappearMessageTipsMediator:modules.commonUI.DisappearMessageTipsMediator;
        /** 道具安全锁选项界面 */
        private _itemLockMediator:ItemLockMediator;
        /** 重置成功提示界面 */
        private _setItemLockSuccessMediator:SetItemLockSuccessMediator

        constructor(app:AppBase)
		{
			super(app.uiRoot.general);
			this._viewUI = new ui.common.ResetItemLockPasswordUI();
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
            this._viewUI.close_btn.on(LEvent.CLICK,this,this.goBack);
            this._viewUI.oldPassword_textinput.on(LEvent.CLICK,this,this.controlOldInput);
            this._viewUI.newPassword_textinput.on(LEvent.CLICK,this,this.controlNewInput);
            this._viewUI.newPassword2_textinput.on(LEvent.CLICK,this,this.controlNewInput2);
            this._viewUI.confirmReset_btn.on(LEvent.CLICK,this,this.confirmReset);
            //消息监听
            chat.models.ChatProxy.getInstance().on(chat.models.SHOW_DISSAPEAR_MSG_TIPS,this,this.show_Msg);
            models.SetBasicsProxy.getInstance().on(models.RESET_PASSWORD_SUCCESS_EVENT,this,this.show_resetSuccessUI);
        }
        /**
         * 重置密码成功后界面
         */
        private show_resetSuccessUI():void{
            this._setItemLockSuccessMediator = new SetItemLockSuccessMediator(this._app);
            this._setItemLockSuccessMediator.onShow(this.reset_pd);
            this.hide();
        }
        /**
         * 消息弹窗
         * @describe 接受服务器下发回来的消息，弹出消息气泡
         */
        private show_Msg(msg:any):void{
            this._disappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
            this._disappearMessageTipsMediator.onShow(msg);
        }
        /**
         * 确认重置密码
         */
        private confirmReset():void{
            this.old_pd = this._viewUI.oldPassword_textinput.text;
            this.reset_pd = this._viewUI.newPassword_textinput.text;
            this.reset_repeatpd = this._viewUI.newPassword2_textinput.text;

            RequesterProtocols._instance.c2s_CResetPassword(this.old_pd,this.reset_pd,this.reset_repeatpd);

            this.hide();
        }
        private controlNewInput2():void{

        }
        private controlNewInput():void{

        }
        private controlOldInput():void{

        }
        private _initUI():void{

        }
        private goBack():void{
            this.hide();
            this._itemLockMediator = new ItemLockMediator(this._app);
            this._itemLockMediator.show();
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
            this._viewUI.oldPassword_textinput.on(LEvent.CLICK,this,this.controlOldInput);
            this._viewUI.newPassword_textinput.off(LEvent.CLICK,this,this.controlNewInput);
            this._viewUI.newPassword2_textinput.off(LEvent.CLICK,this,this.controlNewInput2);
            this._viewUI.confirmReset_btn.off(LEvent.CLICK,this,this.confirmReset);
            chat.models.ChatProxy.getInstance().off(chat.models.SHOW_DISSAPEAR_MSG_TIPS,this,this.show_Msg);
            models.SetBasicsProxy.getInstance().off(models.RESET_PASSWORD_SUCCESS_EVENT,this,this.show_resetSuccessUI);
        }
		public getView():Sprite 
		{
			return this._viewUI;
		}
    }
}