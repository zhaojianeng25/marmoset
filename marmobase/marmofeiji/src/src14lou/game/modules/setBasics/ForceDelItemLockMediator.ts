/**
 * 强制解除道具安全锁界面
 */
module game.modules.setBasics
{
	export class ForceDelItemLockMediator extends game.modules.UiMediator{
        private _viewUI:ui.common.ForceDelItemLockUI;
        /** 道具安全锁选项界面 */
        private _itemLockMediator:ItemLockMediator;
        /** 消息飘窗界面 */
        private _disappearMessageTipsMediator:modules.commonUI.DisappearMessageTipsMediator;
        /** 当前验证码 */
        private curr_code:string = '';

        constructor(app:AppBase)
		{
			super(app.uiRoot.general);
			this._viewUI = new ui.common.ForceDelItemLockUI();
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
            this._viewUI.getPin_btn.on(LEvent.CLICK,this,this.getPin);
            this._viewUI.confirm_btn.on(LEvent.CLICK,this,this.confirmForce);
            //消息事件监听
   
        }
        /**
         * 确认强制解除道具安全锁
         */
        private confirmForce():void{
            this.curr_code = this._viewUI.pin_textinput.text;
            RequesterProtocols._instance.c2s_CForceDelPassword(this.curr_code);
        }
        /**
         * 获取验证码
         * @describe 根据手机号码，向服务器发起请求，获取验证码
         */
        private getPin():void{
            RequesterProtocols._instance.c2s_CGetCheckCode(110);//110是临时填写号码，后续修正
        }
        
         /* 初始化界面
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
        }
		public getView():Sprite 
		{
			return this._viewUI;
		}
    }
}