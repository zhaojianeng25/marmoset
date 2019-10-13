/**
* name 
*/
module game.modules.chat{
	export class ChatModule extends game.modules.ModuleMediator{
		private _viewUI:ui.common.ChatUI;//ui.common.CreateRoleUI;
		//private _loginView:ui.common.LoginUI;
		private _chatViewMediator:ChatViewMediator;
		// private _DisappearMessageTipsMediator:DisappearMessageTipsMediator;
		private loginModel:LoginModel;
		constructor(app:AppBase){
			super();
			this.uiLayer = app.uiRoot.general;
			this._viewUI = new ui.common.ChatUI();
			//this._loginView = new ui.common.LoginUI();
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this._chatViewMediator = new ChatViewMediator(app);
			Network._instance.addHanlder(ProtocolsEnum.STransChatMessage2Client, this, this.onRefreshChatData);
			Network._instance.addHanlder(ProtocolsEnum.STransChatMessageNotify2Client, this, this.onRefreshSystemData);
			this.loginModel = game.modules.createrole.models.LoginModel.getInstance();

		}
		protected onShow(event:Object):void 
		{
			this._chatViewMediator.show();
		}
		public hide():void {
			super.hide();
			this._chatViewMediator.hide();
		}
		public show():void {
			super.show();
		}
		
		public getView():Sprite {
			return this._viewUI;
		}

		// 刷新数据
		private onRefreshChatData(optcode: number, msg: hanlder.S2C_trans_chatmessage2client): void {
			var flag : boolean = true;
			flag = msg.roleid == this.loginModel.roleDetail.roleid?false:true;
			var type = msg.messagetype;
			switch (type) {
				case ChannelType.CHANNEL_CURRENT:
					this._chatViewMediator.getChatData(flag,type);
					break;
				case ChannelType.CHANNEL_PROFESSION:
					this._chatViewMediator.getZhiYeChatData(flag,type);
					break;
				case ChannelType.CHANNEL_WORLD:
					this._chatViewMediator.getWorldChatData(flag,type);
					break;
				case ChannelType.FAMILY_CHANNEL:
					this._chatViewMediator.getFamilyChatData(flag,type);
					break;
				case ChannelType.CHANNEL_TEAM:
					this._chatViewMediator.getTeamChatData(flag,type);
					break;
				case ChannelType.CHANNEL_TEAM_APPLY:
					this._chatViewMediator.getZuDuiChatData(flag,type);
					break;
			
				default:
					break;
			}
			
		}
		private onRefreshSystemData(optcode: number, msg: hanlder.S2C_trans_chatmessagenotify2client) :void{
			var data = ChatModel._instance.chatMessageTips[msg.chatmessagenotify2client.messageid];
			if(typeof(data) =="undefined") return;
			let params = msg.chatmessagenotify2client.parameters;
			let tempdata = data.msg;
			var dataType :string = data.type;
		    if(params.length != 0 )
			{
				for (var paramsLength = 0; paramsLength < params.length; paramsLength++) {
					console.log('paramsLength+1==============='+paramsLength+1);
					tempdata = tempdata.replace("$parameter"+[(paramsLength+1)]+"$",params[paramsLength]);
					console.log('"$parameter"+[(paramsLength+1)]+"$"======'+"$parameter"+[(paramsLength+1)]+"$");
				}
			}
			var arr:Array<string> = dataType.split(",");
			for(let key of arr)
			{
				if(Number(key) == TipsMsgType.TIPS_POPMSG)
				{//1

				} 
				if(Number(key) == TipsMsgType.TIPS_SYS_CHANNEL || Number(key) == TipsMsgType.TIPS_IN_CHAT_VIEW )
				{/** 系统消息 */
					this._chatViewMediator.getSystemData(true);
				}
			}
		
			
		}
	}
}