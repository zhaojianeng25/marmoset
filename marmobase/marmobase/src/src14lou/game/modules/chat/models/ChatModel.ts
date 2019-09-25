/**
* name 
*/
enum TipsMsgType {
	/** 透明框提示 */
	TIPS_POPMSG = 1,
	/** npc对话框提示 */
	TIPS_NPCTALK = 2,
	/** 消息频道提示 */
	TIPS_MSG_CHANNEL = 3,
	/** 系统公告提示 */
	TIPS_SYSBOARD = 4,
	/** 确认框提示 */
	TIPS_CONFIRM = 5,
	/** 公会频道提示 */
	TIPS_CLAN = 7,
	/** 当前频道提示 */
	TIPS_CUR_CHANNEL = 8,
	/** 世界频道提示 */
	TIPS_WORLD = 9,
	/** 队伍频道提示 */
	TIPS_TEAM_CHANNEL = 13,
	/** 职业频道提示 */
	TIPS_PRO_CHANNEL = 14,
	/** 系统频道提示 */
	TIPS_SYS_CHANNEL = 15,
	/** 跑马灯提示 */
	TIPS_ROLE_CHANNEL = 18,
	/** 不在综合频道显示只在聊天频道 */
	TIPS_IN_CHAT_VIEW = -15,

}
enum InterfaceSwitch {
	/** 频道接收 */
	INTERFACE_OPEN = 1,
	/** 频道关闭 */
	INTERFACE_CLOSE = 0,
}
enum ChannelType {
	/** 当前频道 */
	CHANNEL_CURRENT = 1,
	/** 队伍频道 */
	CHANNEL_TEAM = 2,
	/** 职业频道 */
	CHANNEL_PROFESSION = 3,
	/** 公会频道 */
	CHANNEL_CLAN = 4,
	/** 世界频道 */
	CHANNEL_WORLD = 5,
	/** 系统频道 */
	CHANNEL_SYSTEM = 6,
	/** 消息频道 */
	CHANNEL_MESSAGE = 7,
	/** 气泡消息 */
	CHANNEL_BUBBLE = 8,
	/** 滑动消息 */
	CHANNEL_SLIDE = 9,
	/** 跨服天梯消息 */
	CHANNEL_CROSS_TT = 10,
	/** 跨服房间消息 */
	CHANNEL_CROSS_ROOM = 11,
	/** 组队申请频道 */
	CHANNEL_TEAM_APPLY = 14,
}
enum ChatMsgId {
	/** 请不要说话太快 */
	CHAT_SPEED_LIMIT = 0,
	/** 你还没有队伍 */
	CANNOT_USE_TEAM_CHANNEL = 140498,
	/** 每隔N秒才能在世界频道发言 */
	CHAT_WORLD_CHANNEL_TIME_LIMIT = 140500,
	/** 等级不足N级不能在世界频道发言 */
	CHAT_WORLD_CHANNEL_LEVEL_LIMIT = 140501,
	/** 未加入公会,不能使用公会频道 */
	CANNOT_USE_FACTION_CHANNEL = 141053,
	/** 每隔N秒才能在组队申请频道发言 */
	CHAT_TEAM_APPLY_CHANNEL_TIME_LIMIT = 150028,
	/**  等级不足N级不能在职业频道发言 */
	CHAT_SCHOOL_CHANNEL_LEVEL_LIMIT = 160471,
	/** 等级不足N级不能在当前频道发言 */
	CHAT_CURRENT_CHANNEL_LEVEL_LIMIT = 142924,
	/** 每隔N秒才能在天梯频道发言 */
	CHAT_CROSSTT_CHANNEL_TIME_LIMIT = 172103
}
/** 点击查看在聊天框里某条消息信息的类型 */
enum DisplayType {
	DISPLAY_ITEM = 1,								// 
	DISPLAY_PET = 2,								// 
	DISPLAY_TASK = 8,								// 任务介绍
	DISPLAY_TEAM_APPLY = 9,							// 组队申请
	DISPLAY_ROLL_ITEM = 11,							// ROLL点
	DISPLAY_ACTIVITY_ANSWER = 12,					// 活动答题
	DISPLAY_LIVEDIE = 13,							// 生死战连接
	DISPLAY_BATTLE = 14,							// 战斗录像连接
	DISPLAY_SACE_ROLE = 15,							// 每隔N秒才能在天梯频道发言
	DISPLAY_CROSS_TT = 16,							// 跨服天梯消息  这个类型读取crosstt 和 serverid 两个属性  
	DISPLAY_CROSS_ROOM = 17,						// 跨服房间消息  这个类型读取serverid一个属性
}
/** 任务类型（商店id，成就类型的时候是完成时间）*/
enum ShopId {
	/** 主线任务 */
	MAIN_MISSION = 1,
	/** 循环任务 */
	CYCLIC_TASK = 2,
	/** 暗夜马戏团任务（天机仙令任务） */
	ANYE_TASK = 3
}
enum ChannelSet {
	/** 世界频道 */
	SET_WORLD_CHANNEL = 12,
	/** 帮派频道 */
	SET_FAMILY_CHANNEL = 13,
	/** 门派频道 */
	SET_SECTS_CHANNEL = 14,
	/** 当前频道 */
	SET_CURRENT_CHANNEL = 15,
	/** 队伍频道 */
	SET_TEAM_CHANNEL = 16,
	/** 组队频道 */
	SET_ZUDUI_CHANNEL = 29,
}
/** 聊天消息的功能类型 */
enum FunModelType {
	/** 任务求助道具功能 */
	FUN_TASKITEM = 1,
	/** 生死战公会频道分享 */
	FUN_DIELIVE_CLAN = 2,
	/** 生死战世界频道分享 */
	FUN_DIELIVE_WORLD = 3,
	/** 求助 */
	QIU_ZHU = 4
}
module game.modules.chat.models {

	export class ChatModel {
		public userId: string;
		/** 屏蔽字 */
		public chatConfigBinDic: Object = {};
		/** 客户端提示信息表/客户端提示 */
		public chatMessageTips: Object = {};
		public chatQuickChat: Object = {};
		/** 队伍频道数据 */
		public teamMsgList: Array<ChatMessageVo> = [];
		// //系统消息数据
		public systemMsgList: Array<ChatMessageNotifyVo> = [];
		// //系统消息数据
		public SystemMsgList: Array<ChatMessageVo> = [];
		// //世界频道数据
		public wordChatList: Array<ChatMessageVo> = [];
		// //当前频道数据
		public nowChatList: Array<ChatMessageVo> = [];
		// //职业频道数据
		public zhiYeChatList: Array<ChatMessageVo> = [];
		// //帮派频道数据
		public familyChatList: Array<ChatMessageVo> = [];
		// //组队频道数据
		public zuDuiChatList: Array<ChatMessageVo> = [];
		// //所有频道数据
		public allChatList: Array<ChatMessageVo> = [];
		// 聊天数据<频道，消息>
		public chatMessageMap: Object = [];
		// 聊天Tips数据存储
		public chatTips: Array<any> = [];
		/**list空間的array */
		public chatList: Laya.Dictionary;
		/** 聊天返回提示 */
		public chatMessageNotify: ChatMessageNotifyVo;
		private _ChatViewMediator: ChatViewMediator;
		/** 聊天限制的条目 */
		public chatLimitNum: number = 30;
		/** 查看别人的道具Id */
		public viewItemId: number;
		/** 锁定视角接收数据 */
		public lockData: number = 0;
		/** 上个当前窗口Img */
		public lastCurrentImg: Laya.Image;
		/** 上个世界窗口Img */
		public lastWorldImg: Laya.Image;
		/** 上个队伍窗口Img */
		public lastTeamImg: Laya.Image;
		/** 上个工会窗口Img */
		public lastFamilyImg: Laya.Image;
		/** 上个职业窗口Img */
		public lastZhiYeImg: Laya.Image;
		/** 上个系统窗口Img */
		public lastSystemImg: Laya.Image;
		/** 上个组队窗口Img */
		public lastZuDuiImg:Laya.Image;
		/** 初始化频道 */
		public Firstchannel: number = -1;
		/** 特殊数据存储 如红包和组队信息 */
		public specialChannelData: Laya.Dictionary;
		/** 战斗结束弹窗 key:id  values:弹窗内容 */
		public battleEndTips:Laya.Dictionary = new Laya.Dictionary;
		/** 战斗奖励结算存储 */
		public battleEndTipsArray = [];
		constructor() {
			ChatModel._instance = this;
			this.initChatMessageMap();
			this.chatList = new Laya.Dictionary();
			this.specialChannelData = new Laya.Dictionary();
		}
		public static _instance: ChatModel;
		public static getInstance(): ChatModel {
			if (!this._instance) {
				this._instance = new ChatModel();
			}
			return this._instance;
		}
		public static clearModelData(): void {
			chat.models.ChatModel._instance.teamMsgList = [];
			chat.models.ChatModel._instance.systemMsgList = [];
			chat.models.ChatModel._instance.SystemMsgList = [];
			chat.models.ChatModel._instance.wordChatList = [];
			chat.models.ChatModel._instance.nowChatList = [];
			chat.models.ChatModel._instance.zhiYeChatList = [];
			chat.models.ChatModel._instance.familyChatList = [];
			chat.models.ChatModel._instance.zuDuiChatList = [];
			chat.models.ChatModel._instance.allChatList = [];
			chat.models.ChatModel._instance.chatMessageMap = [];
			chat.models.ChatModel._instance.chatTips = [];
			chat.models.ChatModel._instance.chatList = new Laya.Dictionary();
			chat.models.ChatModel._instance.chatMessageNotify = new models.ChatMessageNotifyVo();
			chat.models.ChatModel._instance.chatLimitNum = 30;
			chat.models.ChatModel._instance.viewItemId = 0;
			chat.models.ChatModel._instance.lockData = 0;
			chat.models.ChatModel._instance.lastCurrentImg = new Laya.Image();
			chat.models.ChatModel._instance.lastWorldImg = new Laya.Image();
			chat.models.ChatModel._instance.lastTeamImg = new Laya.Image();
			chat.models.ChatModel._instance.lastFamilyImg = new Laya.Image();
			chat.models.ChatModel._instance.lastZhiYeImg = new Laya.Image();
			chat.models.ChatModel._instance.lastSystemImg = new Laya.Image();
			chat.models.ChatModel._instance.lastZuDuiImg = new Laya.Image();
			chat.models.ChatModel._instance.Firstchannel = -1;
			chat.models.ChatModel._instance.specialChannelData = new Laya.Dictionary();
			chat.models.ChatModel._instance.battleEndTips = new Laya.Dictionary;
		}

		/** 初始化聊天频道容器 */
		public initChatMessageMap(): void {
			ChatModel._instance.chatMessageMap[ChannelType.CHANNEL_CURRENT] = [];
			ChatModel._instance.chatMessageMap[ChannelType.CHANNEL_TEAM] = [];
			ChatModel._instance.chatMessageMap[ChannelType.CHANNEL_PROFESSION] = [];
			ChatModel._instance.chatMessageMap[ChannelType.CHANNEL_CLAN] = [];
			ChatModel._instance.chatMessageMap[ChannelType.CHANNEL_WORLD] = [];
			ChatModel._instance.chatMessageMap[ChannelType.CHANNEL_SYSTEM] = [];
			ChatModel._instance.chatMessageMap[ChannelType.CHANNEL_MESSAGE] = [];
			ChatModel._instance.chatMessageMap[ChannelType.CHANNEL_BUBBLE] = [];
			ChatModel._instance.chatMessageMap[ChannelType.CHANNEL_SLIDE] = [];
			ChatModel._instance.chatMessageMap[ChannelType.CHANNEL_CROSS_TT] = [];
			ChatModel._instance.chatMessageMap[ChannelType.CHANNEL_TEAM_APPLY] = [];
		}
		/** 取ChannelType类型 */
		public getChannelBack(): any {
			return ChannelType;
		}

		/** 插入聊天消息 */
		public insertChatMessage(message: ChatMessageVo): void {
			switch (message.messagetype) {
				case ChannelType.CHANNEL_CURRENT:
					if (this.nowChatList.length > this.chatLimitNum) this.nowChatList.shift();
					this.nowChatList.push(message);
					this.chatList.set(ChannelType.CHANNEL_CURRENT, this.nowChatList);
					break;
				case ChannelType.CHANNEL_TEAM:
					if (this.teamMsgList.length > this.chatLimitNum) this.teamMsgList.shift();
					this.teamMsgList.push(message);
					this.chatList.set(ChannelType.CHANNEL_TEAM, this.teamMsgList);
					break;
				case ChannelType.CHANNEL_PROFESSION:
					if (this.zhiYeChatList.length > this.chatLimitNum) this.zhiYeChatList.shift();
					this.zhiYeChatList.push(message);
					this.chatList.set(ChannelType.CHANNEL_PROFESSION, this.zhiYeChatList);
					break;
				case ChannelType.CHANNEL_CLAN:
					if (this.familyChatList.length > this.chatLimitNum) this.familyChatList.shift();
					this.familyChatList.push(message);
					this.chatList.set(ChannelType.CHANNEL_CLAN, this.familyChatList);
					break;
				case ChannelType.CHANNEL_WORLD:
					if (this.wordChatList.length > this.chatLimitNum) this.wordChatList.shift();
					this.wordChatList.push(message);
					this.chatList.set(ChannelType.CHANNEL_WORLD, this.wordChatList);
					break;
				case ChannelType.CHANNEL_SYSTEM:
					this.SystemMsgList.push(message);
					this.chatList.set(ChannelType.CHANNEL_SYSTEM, this.SystemMsgList);
					break;
				case ChannelType.CHANNEL_TEAM_APPLY:
					if (this.zuDuiChatList.length > this.chatLimitNum) this.zuDuiChatList.shift();
					this.zuDuiChatList.push(message);
					this.chatList.set(ChannelType.CHANNEL_TEAM_APPLY, this.zuDuiChatList);
					break;
				default:
					break;
			}
		}
		/** 判断是否是屏蔽字
		 * @param str 判断的字符串
		 */
		public judgeBanWords(str: string): any {
			for (var index = 1; index < Object.keys(this.chatConfigBinDic).length; index++) {
				if (str.search(this.chatConfigBinDic[index].tips) == -1) return false;
			}
			return true;
		}
		//图文混排格式替换
		public getFaceHtmlText(data: string): any {
			var newMsg: string = "";
			for (var faceIndex = 0; faceIndex < 54; faceIndex++) {
				data =
					data.replace("@" + faceIndex + "@", "<img src ='ui/liaotian/1384592709_" + (faceIndex + 1) + ".png' style = 'width:50px;valign:center; height:50px' ></img>") //

			}
			return data;
		}

		/** 
	 * 申请事件按钮属性
	 * @param apply_btn 按钮对象
	 * @param color     按钮颜色
	 */
		public SetBtnAtribute(apply_btn: Laya.Button, color: string): void {
			apply_btn.width = 110;
			apply_btn.height = 24;
			apply_btn.skin = "";
			apply_btn.labelSize = 24;
			apply_btn.labelAlign = "left";
			apply_btn.labelColors = color;
		}

		/** 
		 * 显示科举求助
		 * @param question 题目Id 
		 * @param examtype 科举类型
		 */
		public onShowKejuTitle(question: number, examtype: number, rolename: string, roleid: number, app: AppBase): void {
			/** 角色Id */
			let roleId = LoginModel.getInstance().roleDetail.roleid;
			/** 自己不能回答自己的问题 */
			if (roleid == roleId) {
				let DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(app);
				let prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.CANNO_ANSWER_SELF);
				DisappearMessageTipsMediator.onShow(prompt);
				return;
			}
			let KejuHelpMediator = keju.KejuHelpMediator.getInstance(app);
			KejuHelpMediator.onShow(question, examtype, rolename);
			ModuleManager.hide(ModuleNames.Chat);
		}

		/**
		 * 天机仙令求助信息点击响应
		 * @param tasktype 天机仙令任务类型
		 * @param targetid 目标id
		 * @param taskid 天机仙令任务id
         * @param useapp 
         * @param useUI 
		 * @param helperid 发布求助的角色id(或是协助完成的角色id)
		 * @param taskpos 天机仙令任务栏位
		 */
		public responseTJXLHelp(tasktype: number, targetid: any, taskid: any, useapp: any, useUI: any,helperid:any,taskpos?:number): void {
			/** 目标数量 */
			var ownedTargetNum: string;//用string类型来存数据，为了做判断时，能让0这个数值通过
			/** 商店类型 */
			var shoptype:number;
			switch (tasktype) {
				case TaskType.Item:
					//获取拥有目标道具数量
					ownedTargetNum = game.modules.bag.models.BagModel._instance.chargeItemNum(targetid).toString();
					shoptype = tianjixianling.models.TianJiXianLingModel.getInstance().getShopType(targetid);//获得商店类型
					break;
				case TaskType.Pet:
					//获取拥有目标宠物数量
					ownedTargetNum = tianjixianling.models.TianJiXianLingModel.getInstance().checkOwnPetNum(targetid).toString();
					shoptype = shopType.PET_SHOP;
					break;
				case TaskType.NPC:
					if(helperid){
						RequesterProtocols._instance.c2s_CRequestJoinTeam(helperid);//发布这条求助信息之前会创建队伍，所以发布求助者角色id就是队长角色id
					}
					else{
						console.log("-----------------------------------没有有效的队伍的队长角色id！---------------------------");
					}
					break;
			}
			if (ownedTargetNum){
				if(helperid == LoginModel.getInstance().roleDetail.roleid){//如果协助完成的角色id就是本人角色id
					//弹出提示飘窗
					var bayWindow = new commonUI.DisappearMessageTipsMediator(useapp);
					//提示语句为：自己不可以帮助自己完成任务
					var prompt = chat.models.ChatModel.getInstance().chatMessageTips["166082"]["msg"];
					bayWindow.onShow(prompt);
					return;
				}
				if (Number(ownedTargetNum) == 0) {//如果无该目标道具					
					HudModel.getInstance().useapp = useapp;
					HudModel.getInstance().directOpenShop(targetid, shoptype);//打开相应能购买到该目标道具的商店
				}
				else {//有满足任务要求数量的目标道具
					var _tempTargetIdArray = [targetid];
					tianjixianling.models.TianJiXianLingModel.getInstance().completedTaskRoleId = helperid;
					tianjixianling.models.TianJiXianLingModel.getInstance().taskPos = taskpos;
					HudModel.getInstance().tjxlData = [];
					let _dstitemnum = 1;
					HudModel.getInstance().tjxlData.push({id: taskid, dstitemnum:_dstitemnum})
					tianjixianling.models.TianJiXianLingModel.getInstance().submitTarget(_tempTargetIdArray, taskid, useapp, useUI);//上交目标道具
				}
			}
		}
	}

}