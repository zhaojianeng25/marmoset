/**
 * 解除道具安全锁界面
 */
module game.modules.setBasics
{
	export class DelItemLockMediator extends game.modules.UiMediator{
        private _viewUI:ui.common.DelItemLockPasswordUI;
        /** 输入重置的密码 */
        private old_pd:string;
        /** 再次输入重置的密码 */
        private old_repeatpd:string;
        /** 消息飘窗界面 */
        private _disappearMessageTipsMediator:modules.commonUI.DisappearMessageTipsMediator;
        /** 解除成功提示界面 */
        private _setItemLockSuccessMediator:SetItemLockSuccessMediator;
        /** 道具安全锁选项界面 */
        private _itemLockMediator:ItemLockMediator;

        constructor(app:AppBase)
		{
			super(app.uiRoot.general);
			this._viewUI = new ui.common.DelItemLockPasswordUI();
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
            this._viewUI.oldPassword_textinput.on(LEvent.CLICK,this,this.controlInput);
            this._viewUI.oldPassword2_textinput.on(LEvent.CLICK,this,this.controlInput2);
            this._viewUI.confirmDel_btn.on(LEvent.CLICK,this,this.confirmDel);           
            models.SetBasicsProxy.getInstance().on(models.RESET_PASSWORD_SUCCESS_EVENT,this,this.show_delSuccessUI);
        }
        /**
         * 重置密码成功后界面
         */
        private show_delSuccessUI():void{
            this._setItemLockSuccessMediator = new SetItemLockSuccessMediator(this._app);
            this._setItemLockSuccessMediator.onShow();
            this.hide();
        }
       
        /**
         * 确认解除
         */
        private confirmDel():void{
            this.old_pd = this._viewUI.oldPassword_textinput.text;
            this.old_repeatpd = this._viewUI.oldPassword2_textinput.text;

            RequesterProtocols._instance.c2s_CDelPassword(this.old_pd,this.old_repeatpd);

            this.hide();
        }
        private controlInput():void{

        }
        private controlInput2():void{

        }
        /**
         * 初始化界面
         * @describe  
         */
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
        }
		public getView():Sprite 
		{
			return this._viewUI;
		}
    }
}