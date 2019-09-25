/**
 * 输入道具安全锁密码界面
 */
module game.modules.setBasics
{
	export class SetItemLockMediator extends game.modules.UiMediator{
        private _viewUI:ui.common.SetItemLockPasswordUI;
        /** 输入的密码 */
        private password:string;
        /** 再次输入的密码 */
        private repeatPassword:string;
        /** 消息飘窗界面 */
        private _disappearMessageTipsMediator:modules.commonUI.DisappearMessageTipsMediator;
        /** 成功提示界面 */
        private _setItemLockSuccessMediator:SetItemLockSuccessMediator;
        /** 道具安全锁选项界面 */
        private _itemLockMediator:ItemLockMediator;

        constructor(app:AppBase)
		{
			super(app.uiRoot.general);
			this._viewUI = new ui.common.SetItemLockPasswordUI();
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
            this._viewUI.confirm_btn.on(LEvent.CLICK,this,this.confirmSet);
            this._viewUI.password_textinput.on(LEvent.CLICK,this,this.controlInput);
            this._viewUI.password2_textinput.on(LEvent.CLICK,this,this.controlInput2);
            //消息事件监听
            chat.models.ChatProxy.getInstance().on(chat.models.SHOW_DISSAPEAR_MSG_TIPS,this,this.show_Msg);
            models.SetBasicsProxy.getInstance().on(models.SET_PASSWORD_SUCCESS_EVENT,this,this.show_successUI);
        }
        /**
         * 设置密码成功后的界面
         * @describe 
         */
        private show_successUI():void{
            this._setItemLockSuccessMediator = new SetItemLockSuccessMediator(this._app);
            this._setItemLockSuccessMediator.onShow(this.password);
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
         * 控制输入密码
         * @describe 
         */
        private controlInput():void{
            this._viewUI.password_textinput.align = "left" ;
            this._viewUI.password_textinput.text = " ";
            this._viewUI.password_textinput.prompt = "";
        }
        /**
         * 控制再次输入密码
         * @describe 
         */
        private controlInput2():void{
            this._viewUI.password2_textinput.align = "left" ;
            this._viewUI.password2_textinput.text = " ";
            this._viewUI.password2_textinput.prompt = "";
        }
        /**
         * 确认设置密码
         * @describe 向服务器发起请求
         *          服务器会进行判定密码是否符合要求进行了输入
         *          成功设置即进入设置成功的界面
         */
        private confirmSet():void{
            this.password = this._viewUI.password_textinput.text;
            this.repeatPassword = this._viewUI.password2_textinput.text;
            
            RequesterProtocols._instance.c2s_CSetPassword(this.password,this.repeatPassword);

            this.hide();
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
            this.removeEvent();
			super.hide();            
		}
		/**
         * 移除事件
         */
        private removeEvent():void{
            this._viewUI.close_btn.off(LEvent.CLICK,this,this.goBack);
            this._viewUI.confirm_btn.off(LEvent.CLICK,this,this.confirmSet);
            this._viewUI.password_textinput.off(LEvent.CLICK,this,this.controlInput);
            this._viewUI.password2_textinput.off(LEvent.CLICK,this,this.controlInput2);
            chat.models.ChatProxy.getInstance().off(chat.models.SHOW_DISSAPEAR_MSG_TIPS,this,this.show_Msg);
            models.SetBasicsProxy.getInstance().off(models.SET_PASSWORD_SUCCESS_EVENT,this,this.show_successUI);
        }
		public getView():Sprite 
		{
			return this._viewUI;
		}
    }
}