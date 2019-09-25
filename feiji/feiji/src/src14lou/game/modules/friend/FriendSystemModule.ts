/**好友系统底板类 */
// import FriendSystemUI = ui.common.FriendSystemUI;
module game.modules.friend {
    enum ButtonType {
        /**好友按钮 */
        FRIEND_BTN  = 0,
        /**邮件按钮 */
        MAIL_BTN    = 1,
        /**招募按钮 */
        RECRUIT_BTN = 2
    }
    /**标题名称 */
    const TitleName = [
        {name: "好友"},
        {name: "邮件"},
        {name: "招募"},
    ]
    export class FriendSystemModule extends game.modules.ModuleMediator {

        //好友界面
        private _friendViewMediator: FriendViewMediator;
        //邮件界面
        private _mailViewMediator: MailViewMediator;
        //招募界面
        private _recruitViewMediator: RecruitViewMediator;
        //底板UI
        private _viewUI: ui.common.FriendSystemUI;

        /**标题名称 */
        private _titleName: string;
        constructor(app: AppBase) {
            super();
            //初始化
            this.uiLayer = app.uiRoot.general;
            //底图
            this._viewUI = new ui.common.FriendSystemUI();
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
            this._app = app; 
            //好友界面
            this._friendViewMediator = new FriendViewMediator(this._viewUI,this._app);
            // 邮件界面
            this._mailViewMediator = new MailViewMediator(this._viewUI);
            //招募界面
            this._recruitViewMediator = new RecruitViewMediator(this._viewUI);
            this.registerEvent();
            this.eventListener();
            models.FriendModel.getInstance().appBase =  this._app;
        }
          /**注册事件监听 */
		public eventListener():void{
            //收到消息
			game.modules.friend.models.FriendProxy.getInstance().on(game.modules.friend.models.receiveMessage_EVENT, this, this.onMessageReceive);
			//消息已被阅读
			game.modules.friend.models.FriendProxy.getInstance().on(game.modules.friend.models.readMessage_EVENT, this, this.onMessageRead);
            //有未读邮件
			game.modules.friend.models.FriendProxy.getInstance().on(game.modules.friend.models.receiveMail_EVENT, this, this.onReceiveMail);
			//邮件已被阅读
			game.modules.friend.models.FriendProxy.getInstance().on(game.modules.friend.models.readMail_EVENT, this, this.onReadMail);
        }

		/**消息已被阅读 */
		public onMessageRead(e: any): void {
			this._viewUI.friendPoint_img.visible = false;
		}

		/**收到消息 */
		public onMessageReceive(e: any): void {
			this._viewUI.friendPoint_img.visible = true;
		}

        /** 有未读邮件*/
        public onReceiveMail(e:any):void{
            this._viewUI.mailPoint_img.visible = true;
        }

        /** 邮件已被阅读*/
        public onReadMail(e:any):void{
            this._viewUI.mailPoint_img.visible = false;
        }
        /**
         * 切换子界面
         * @param index : button的类型
         */
        private switchChildUI(index: ButtonType) {

            this._viewUI.friend_btn.selected = false;
            this._viewUI.mail_btn.selected = false;
            this._viewUI.recruit_btn.selected = false;
  
            switch(index) {
                case ButtonType.FRIEND_BTN:
                    this._viewUI.friend_btn.selected = true;
                    
                    this._friendViewMediator.show();
                    this._mailViewMediator.hide();
                    this._recruitViewMediator.hide();
                    this._titleName = TitleName[ButtonType.FRIEND_BTN].name;
                    break;
                case ButtonType.MAIL_BTN:
                    this._friendViewMediator.hide();
                    this._mailViewMediator.show();
                    this._recruitViewMediator.hide();
                    this._viewUI.mail_btn.selected = true;
                    this._titleName = TitleName[ButtonType.MAIL_BTN].name;
                    break;
                case ButtonType.RECRUIT_BTN:
                    this._friendViewMediator.hide();
                    this._mailViewMediator.hide();
                    this._recruitViewMediator.show();
                    this._viewUI.recruit_btn.selected = true;
                    this._titleName = TitleName[ButtonType.RECRUIT_BTN].name;
                    break;
                default:
                    console.log("FriendSystemModule.switchButton error");             
            }
            this.setTileName(this._titleName);
        }
        /**注册按钮点击事件 */
        private registerEvent(): void {
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN,this,this.clickCloseBtnEvent);
            this._viewUI.friend_btn.on(LEvent.MOUSE_DOWN,this,this.clickFriendBtnEvent);
            this._viewUI.mail_btn.on(LEvent.MOUSE_DOWN,this,this.clickMailBtnEvent);
            this._viewUI.recruit_btn.on(LEvent.MOUSE_DOWN,this,this.clickRecruitBtnEvent);
        }

        /**点击关闭按钮 */
        private clickCloseBtnEvent(): void {            
            this.hide(); 
        }

        /**点击好友按钮 */
        private clickFriendBtnEvent(): void {
            if (!this._viewUI.friend_btn.selected) {
                this.switchChildUI(ButtonType.FRIEND_BTN);
            }
        }

        /**点击邮件按钮 */
        private clickMailBtnEvent(): void {
            if (!this._viewUI.mail_btn.selected) {
                this.switchChildUI(ButtonType.MAIL_BTN);
            }
        }

        /**点击招募按钮 */
        private clickRecruitBtnEvent(): void {
            if (!this._viewUI.recruit_btn.selected) {
                this.switchChildUI(ButtonType.RECRUIT_BTN);
            }
        }
        public show():void {
			super.show();
            this.onLoad();
            mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
		}

		public hide():void {
			super.hide();
            mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
            this._friendViewMediator.hide();
            this._mailViewMediator.hide();
            this._recruitViewMediator.hide();
            if(LoginModel.getInstance().CommonPage != "")
			{
				ModuleManager.show(LoginModel.getInstance().CommonPage,this._app);
				LoginModel.getInstance().CommonPage = "";
			}
		}
		
		public getView():Sprite {
			return this._viewUI;
		}

        /**初始加载 */
        private onLoad(): void {
            this.switchChildUI(ButtonType.FRIEND_BTN);
        }

        /**设置当前面板名 */
        private setTileName(name: string): void {
            this._viewUI.title_lab.text = name;
        }
    }
}