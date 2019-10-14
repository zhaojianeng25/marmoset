/**
* name 
*/
module game.modules.chat.models {
	/** 消息提示Tips */
	export const SHOW_DISSAPEAR_MSG_TIPS = "showDisMsgTips";
	/** 显示物品Tips */
	export const SHOW_ITEM_TIPS = "showItemTips";
	/** 查看别人的分享Item */
	export const VIWE_OTHER_ITEM = " viewOtherItem";
	/** 查看任务 */
	export const VIWE_SHARE_TASK = " viewShareTask";
	/** 打开主界面监听宠物详情 */
	export const OPEN_MAINHUD_PET_LISTEN = "openHudPetListener";
	/** 关闭主界面监听宠物详情 */
	export const CLOSE_MAINHUD_PET_LISTEN = "closeHudPetListener";
	/** 跑马灯消息提示tips */
	export const SHOW_TIPS_ROLE_CHANNEL = "showTipsRoleChannel";
	/** 世界频道消息提示tips */
	export const SHOW_TIPS_WORLD = "showTipsWorld";
	/** NPC对话消息 */
	export const NPC_Dialog_Msg = "npcDialogEvent";
	/** 刷新各个系统消息在不同频道的表现 */
	export const SYS_MSG_IN_CHANNEL = "showMsgInChannel";
	/** 弹窗提示Tips */
	export const SHOW_TIPS_MESSAGE = "showTipsMessage";
	export class ChatProxy extends hanlder.ProxyBase {
		constructor() {
			super();
			ChatProxy._instance = this;
			this.init();
		}
		public static _instance: ChatProxy;
		public static getInstance(): ChatProxy {
			if (!this._instance) {
				this._instance = new ChatProxy();
			}
			return this._instance;
		}

		public init(): void {
			ChatModel.getInstance();
			this.addNetworkListener();
			this._battleEndTipsStorage();
			/** l聊天屏蔽字.xlsx */
			Laya.loader.load("common/data/temp/chat.cbanwords.bin", Handler.create(this, this.onloadedChatConfigComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/message.cmessagetip.bin", Handler.create(this, this.onloadedMessageTipsComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/chat.cquickchat.bin", Handler.create(this, this.onloadedQuickChatComplete), null, Loader.BUFFER);
		}
		onloadedChatConfigComplete(): void {
			//console.log("cbanwords聊天表格加载完毕------ completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/chat.cbanwords.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, ChatModel._instance.chatConfigBinDic, game.data.template.CBanWordsBaseVo, "id");
			console.log("onloadedChatConfigComplete:", ChatModel._instance.chatConfigBinDic);
		}
		onloadedMessageTipsComplete(): void {
			//console.log("cmessagetip聊天表格加载完毕------ completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/message.cmessagetip.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, ChatModel._instance.chatMessageTips, game.data.template.CMessageTipBaseVo, "id");
			console.log("onloadedMessageTipsComplete:", ChatModel._instance.chatMessageTips);
		}
		onloadedQuickChatComplete(): void {
			//console.log("QuickChat聊天表格加载完毕------ completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/chat.cquickchat.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, ChatModel._instance.chatQuickChat, game.data.template.CquickchatBaseVo, "id");
			console.log("onloadedQuickChatComplete:", ChatModel._instance.chatQuickChat);
		}
		// 添加监听
		private addNetworkListener(): void {
			Network._instance.addHanlder(ProtocolsEnum.STransChatMessage2Client, this, this.onTransChatMessage2Client);
			Network._instance.addHanlder(ProtocolsEnum.STransChatMessageNotify2Client, this, this.onSTransChatMessageNotify2Client);
			Network._instance.addHanlder(ProtocolsEnum.SChatItemTips, this, this.onSChatItemTips);
			Network._instance.addHanlder(ProtocolsEnum.SExpMessageTips, this, this.onSExpMessageTips);
			Network._instance.addHanlder(ProtocolsEnum.SChatHelpResult, this, this.onSChatHelpResult);
			Network._instance.addHanlder(ProtocolsEnum.SDropInstance, this, this.onSDropInstance);

		}

		// 移除监听
		private removeNetworkListener(): void {
			Network._instance.removeHanlder(ProtocolsEnum.STransChatMessage2Client, this, this.onTransChatMessage2Client);
			Network._instance.removeHanlder(ProtocolsEnum.STransChatMessageNotify2Client, this, this.onSTransChatMessageNotify2Client);
			Network._instance.removeHanlder(ProtocolsEnum.SChatItemTips, this, this.onSChatItemTips);
			Network._instance.removeHanlder(ProtocolsEnum.SExpMessageTips, this, this.onSExpMessageTips);
			Network._instance.removeHanlder(ProtocolsEnum.SChatHelpResult, this, this.onSChatHelpResult);
		}

		// 聊天求助发送结果
		private onSDropInstance(optcode: number, msg: hanlder.S2C_dropInstance): void {
			this.event(SHOW_TIPS_MESSAGE, [msg.messageid, msg.landname]);
		}
		// 聊天求助发送结果
		private onSChatHelpResult(optcode: number, msg: hanlder.S2C_chat_helpresult): void {
			console.log("TransChatMessage2Client", msg.result);
			let rolesNum: number = 2;

		}

		// 
		private onSExpMessageTips(optcode: number, msg: hanlder.S2C_exp_messagetips): void {
			console.log("TransChatMessage2Client", msg.expvalue);
			let rolesNum: number = 2;
		}

		// 
		private onTransChatMessage2Client(optcode: number, msg: hanlder.S2C_trans_chatmessage2client): void {
			var chatMessageVo = new ChatMessageVo();
			chatMessageVo.roleid = msg.roleid;
			chatMessageVo.rolename = msg.rolename;
			chatMessageVo.shapeid = msg.shapeid;
			chatMessageVo.messagetype = msg.messagetype;
			chatMessageVo.message = msg.message;
			chatMessageVo.titleid = msg.titleid;
			chatMessageVo.displayinfos = msg.displayinfos;
			ChatModel._instance.insertChatMessage(chatMessageVo);
			this.event(SYS_MSG_IN_CHANNEL, chatMessageVo.messagetype);

		}
		// 
		private onSTransChatMessageNotify2Client(optcode: number, msg: hanlder.S2C_trans_chatmessagenotify2client): void {
			var chatMessageNotifyVo = new ChatMessageNotifyVo();
			chatMessageNotifyVo.messageid = msg.chatmessagenotify2client.messageid;
			chatMessageNotifyVo.npcbaseid = msg.chatmessagenotify2client.npcbaseid;
			chatMessageNotifyVo.parameters = msg.chatmessagenotify2client.parameters;
			var data = ChatModel._instance.chatMessageTips[chatMessageNotifyVo.messageid];
			if (typeof (data) == "undefined" || data == null) return;
			let tempMsg = data.msg;
			var dataType = data.type;
			let params = chatMessageNotifyVo.parameters;
			if (chatMessageNotifyVo.messageid == 140201) {
				let _flag = friend.models.FriendModel.getInstance().isMyBlackList(0, params[0]);//判断添加当前玩家为好友的角色名字是否是玩家自己黑名单存在
				if (_flag) return;
			}
			if (params.length != 0) {/** 参数替换 */

				for (var paramsLength = 0; paramsLength < params.length; paramsLength++) {
					tempMsg = tempMsg.replace("$parameter" + [(paramsLength + 1)] + "$", params[paramsLength]);
				}
				tempMsg = tempMsg.replace("$parameterjinb$", "<img src ='ui/tongyong/common_jinb.png' style = 'width:30px;valign:center; height:30px'></img>");
				//<span style='color:#00c6ff;fontSize:24'>$parameter1$</span><span style='color:#261407;fontSize:24'>:</span><span style='color:#261407;fontSize:24'>$parameter2$</span><A t="[抢红包]" questionid="1111" name="$parameter3$" roleid="$parameter4$" type="300"  c="ff00ff00</span>
			}
			var arr: Array<string> = dataType.split(",");
			for (var key of arr) {
				if (Number(key) == TipsMsgType.TIPS_SYS_CHANNEL || Number(key) == TipsMsgType.TIPS_IN_CHAT_VIEW || Number(key) == TipsMsgType.TIPS_SYSBOARD) {
					ChatModel._instance.systemMsgList.push(chatMessageNotifyVo);
					if (ChatModel._instance.systemMsgList.length > ChatModel.getInstance().chatLimitNum) ChatModel._instance.systemMsgList.shift();
				}
				else if (Number(key) == TipsMsgType.TIPS_POPMSG) {
					let isBattle  = battle.BattleProxy.inBattle; //是否处于战斗中
					if( isBattle ) 
					{
						let endTip = this.chargeIsAwardTips(chatMessageNotifyVo.messageid,tempMsg);
						if( !endTip ) this.event(SHOW_DISSAPEAR_MSG_TIPS, tempMsg);
					} else this.event(SHOW_DISSAPEAR_MSG_TIPS, tempMsg);
				} else if (Number(key) == TipsMsgType.TIPS_WORLD) {/** 世界频道消息 */
					this.event(SHOW_TIPS_WORLD, tempMsg);
				} else if (Number(key) == TipsMsgType.TIPS_ROLE_CHANNEL) {/** 跑马灯消息 */
					this.event(SHOW_TIPS_ROLE_CHANNEL, tempMsg);
				} else if (Number(key) == TipsMsgType.TIPS_NPCTALK) {/** NPC对话类型 */
					this.event(NPC_Dialog_Msg, tempMsg);
				} else if (Number(key) == TipsMsgType.TIPS_CONFIRM) {
					this.event(SHOW_TIPS_MESSAGE, chatMessageNotifyVo.messageid);
				}
				if (chatMessageNotifyVo.messageid == 172012) {/** 世界频道->红包拾取 数据组装 */
					let chatMessageVo = new ChatMessageVo();
					chatMessageVo.message = tempMsg;
					if (params.length == 4) {
						let type = params[3];
						switch (Number(type)) {
							case RedPackType.TYPE_WORLD:
								chatMessageVo.messagetype = ChannelType.CHANNEL_WORLD;
								break;
							case RedPackType.TYPE_TEAM:
								chatMessageVo.messagetype = ChannelType.CHANNEL_TEAM;
								break;
							case RedPackType.TYPE_CLAN:
								chatMessageVo.messagetype = ChannelType.CHANNEL_CLAN;
								break;

							default:
								break;
						}
						chatMessageVo.roleid = params[2];
						ChatModel.getInstance().specialChannelData.set(params[2], params);
					}
					ChatModel.getInstance().insertChatMessage(chatMessageVo);
					this.event(SYS_MSG_IN_CHANNEL, chatMessageVo.messagetype);
				}

			}


		}
		/** SChatItemTips 回调函数  */
		private onSChatItemTips(optcode: number, msg: hanlder.S2C_chatItem_tips): void {
			var _DisplayInfoVo = new DisplayInfoVo();
			_DisplayInfoVo.displaytype = msg.displaytype;
			_DisplayInfoVo.roleid = msg.roleid;
			_DisplayInfoVo.shopid = msg.shopid;
			_DisplayInfoVo.counterid = msg.counterid;
			_DisplayInfoVo.uniqid = msg.uniqid;
			_DisplayInfoVo.teamid = msg.teamid;
			_DisplayInfoVo.crosstt = msg.crosstt;
			_DisplayInfoVo.serverid = msg.serverid;
			ChatModel.getInstance().chatTips.push({ uniqid: msg.uniqid, tips: msg.tips });
			let roleid = LoginModel.getInstance().roleDetail.roleid;
			if (roleid == _DisplayInfoVo.roleid && _DisplayInfoVo.displaytype == 1) {/** 自己查看 物品*/
				this.event(SHOW_ITEM_TIPS);
			} else if (roleid == _DisplayInfoVo.roleid && _DisplayInfoVo.displaytype == 2) {/** 自己查看宠物 */

			} else if (roleid != _DisplayInfoVo.roleid && _DisplayInfoVo.displaytype == 2) {/** 别人查看宠物 */

			} else if (roleid != _DisplayInfoVo.roleid && _DisplayInfoVo.displaytype == 1) {/** 别人查看你的物品 */
				this.event(VIWE_OTHER_ITEM);
			} else if (roleid == _DisplayInfoVo.roleid && _DisplayInfoVo.displaytype == 8) {/** 自己查看任务 */
				this.event(VIWE_SHARE_TASK, _DisplayInfoVo);

			} else if (roleid != _DisplayInfoVo.roleid && _DisplayInfoVo.displaytype == 8) {/** 别人查看你的任务 */
				this.event(VIWE_SHARE_TASK, _DisplayInfoVo);
			}

		}
		/** 判断是否id是否是结束战斗奖励或者提示的id
		 * @param msgId 弹窗id
		 * @param str 弹窗字符串
		 */
		private chargeIsAwardTips(msgId:Number,str:string):boolean
		{
			if( ChatModel.getInstance().battleEndTipsArray.indexOf( msgId )!= -1 )
			{
				ChatModel.getInstance().battleEndTips.set(msgId ,str);
				return true;
			}
			return false;
			 
		}
		/** 存储战斗结算弹窗消息 */
		private _battleEndTipsStorage():void
		{
			ChatModel.getInstance().battleEndTipsArray.push(142381);
			ChatModel.getInstance().battleEndTipsArray.push(141157);
			ChatModel.getInstance().battleEndTipsArray.push(141404);
			ChatModel.getInstance().battleEndTipsArray.push(160005);
			ChatModel.getInstance().battleEndTipsArray.push(142508);
			ChatModel.getInstance().battleEndTipsArray.push(141156);
			ChatModel.getInstance().battleEndTipsArray.push(140982);
			ChatModel.getInstance().battleEndTipsArray.push(160344);
			ChatModel.getInstance().battleEndTipsArray.push(160347);
			ChatModel.getInstance().battleEndTipsArray.push(180046);
			ChatModel.getInstance().battleEndTipsArray.push(190024);
			ChatModel.getInstance().battleEndTipsArray.push(162055);
			ChatModel.getInstance().battleEndTipsArray.push(141154);
			ChatModel.getInstance().battleEndTipsArray.push(160063);
			ChatModel.getInstance().battleEndTipsArray.push(160126);
			ChatModel.getInstance().battleEndTipsArray.push(180001);
			ChatModel.getInstance().battleEndTipsArray.push(190024);
		}

	}
}