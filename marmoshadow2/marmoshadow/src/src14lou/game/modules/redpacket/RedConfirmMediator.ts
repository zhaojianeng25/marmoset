/**
 * 发送红包确认界面
 */module game.modules.redPacket{
	export class RedConfirmMediator extends game.modules.UiMediator{
        private _viewUI : ui.common.RedConfirmUI;
        private _redPacketSendMediator : RedPacketSendMediator;
        private redPack_modeltype:number;
        private redPack_money_text:string;
        private redPack_number_text:string;
        private redPack_JiYu_text:string;

        constructor(app:AppBase){
			super(app.uiRoot.general);
			this._viewUI = new ui.common.RedConfirmUI();
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
		}
        public show_UI(modeltype:number, redPack_money:string,redPack_number:string,redPack_JiYu:string):void{
            this.redPack_modeltype = modeltype;
            this.redPack_money_text = redPack_money;
            this.redPack_number_text = redPack_number;
            this.redPack_JiYu_text = redPack_JiYu;
            this.show();
        }
        public show():void {
            this._init_UI();
			super.show();
			this._viewUI.close_btn.on(LEvent.MOUSE_UP,this,this.back_redPackSend);
		}
        private _init_UI():void{
            this._init_label();
            this._init_btn();
        }
        private _init_btn():void{
            this._viewUI.reset_btn.on(LEvent.CLICK,this,this.back_redPackSend);
            this._viewUI.confirm_btn.on(LEvent.CLICK,this,this.send_redPack);
        }
        //发送红包，并给服务器发送数据
        private send_redPack():void{
            var fushinum:number = Number(this.redPack_money_text);
            var redpacknum:number = Number(this.redPack_number_text);
            RequesterProtocols._instance.c2s_CSendRedPack(this.redPack_modeltype,fushinum,redpacknum,this.redPack_JiYu_text);
            
            if(LoginModel.getInstance().CommonPage != ""){
				ModuleManager.show(LoginModel.getInstance().CommonPage,this.app);
				LoginModel.getInstance().CommonPage == "";
			}
            mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
            this.hide();
        }
        //返回红包的发送界面
        private back_redPackSend():void{
            //this.redPackSendUI.visible = true;
            this._redPacketSendMediator = new RedPacketSendMediator(this._app);
            this._redPacketSendMediator.showUI(this.redPack_modeltype);
            this.hide();
        }
        private _init_label():void{
            this._viewUI.hongBaoMoney_lab.text =this.redPack_money_text;
            this._viewUI.hongBaoNumber_lab.text = this.redPack_number_text;
            this._viewUI.hongBaoJiYu_output.text = this.redPack_JiYu_text;
        }

        public hide():void {
			super.hide();
            this._viewUI.close_btn.off(LEvent.MOUSE_UP,this,this.back_redPackSend);
            this._viewUI.reset_btn.off(LEvent.CLICK,this,this.back_redPackSend);
            this._viewUI.confirm_btn.off(LEvent.CLICK,this,this.send_redPack);
		}
		
		public getView():Sprite {
			return this._viewUI;
		}
    }
 }