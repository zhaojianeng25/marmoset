/**
* name 
*/
import ChatModel = game.modules.chat.models.ChatModel;
module game.modules.chat {
	export class ChatViewMediator extends game.modules.UiMediator {
		public static LOGIN_EVENT: string = "loginEvent";
		private _viewUI: ui.common.ChatUI;
		// private chatContent:Laya.HTMLDivElement;
		// private chatcontent1:Laya.TextArea;
		/** 聊天框输入 */
		private repstr: string;
		// data : Array<any> = [];
		/** 屏蔽字 */
		private shield_word: Array<string> = [];
		/** 任务 */
		private task: Array<any> = [];
		/** 未有聊天内容时的输入 */
		private nohistory: Array<any> = [{ context: "您還沒有發言哦，趕緊去發言吧~" }];
		/** 历时输入 */
		private historyInput: Array<any> = [];
		/** 表情数据 */
		private faceList: Array<any> = [];
		/** 物品数据 */
		private itemList: Array<any> = [];
		/** 宠物数据 */
		private petLits: Array<any> = [];
		/** 关键字屏蔽 */
		private banWords: Object;
		/** 常用语 */
		private quickChat: Array<any> = [];
		/** 当前频道 */
		private channel: number = 1;
		/** 初始化判断 */
		private flag: boolean = true;
		/** DisplayInfo 聊天有特殊格式时存储的数据 */
		private displayInfo: Array<any> = [];
		/** 聊天数据 */
		private chatData: any;
		/** 历史输入 */
		private historyMsg: any;
		/** LoginModel 模块 */
		private _loginModel: LoginModel;
		/** 当前聊天字体的颜色 */
		private color: string = "#000000";
		/** 当前频道类型 */
		private channelType: any;
		/** 分享的道具名称 */
		private shareItem: string;
		/** 角色信息 */
		private roleinfo: Array<any> = [];
		/** 初始化标志 */
		private initFlag: boolean = false;
		/** 判断当前频道是否有值 */
		private channelFlag: boolean = false;
		/** 主界面 */
		private mainhud: mainhud.MainHudModule;
		private _tipsModule: game.modules.tips.tipsModule;
		private PetXiangQingMediator: game.modules.pet.PetXiangQingMediator;
		private TaskDescriberMediators: game.modules.commonUI.TaskDescriberMediators;
		private px;
		private py;
		/** 角色id */
		private roleId: number;
		/** 当前聊天Y坐标 */
		private scrollY: number;
		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.ChatUI();
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this.isCenter = true;
			this.unlock();
			this._loginModel = game.modules.createrole.models.LoginModel.getInstance();
			//this.onList();
			this._viewUI.input_txtinput.maxChars = 80;
			this._viewUI.input_txtinput.on(Laya.Event.KEY_DOWN, this, this.keydown);
		}
		/** 键盘落下监听-判断输入是否超过限制 */
		public keydown(): void {
			if (this._viewUI.input_txtinput.text.length >= 80) {
				let promot = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.CHARACTER_IS_TOO_LONG);
				game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, promot);
			}
		}
		public show(): void {
			super.show();
			//初始化界面ui信息
			this.px = this._viewUI.msgTips1_img.x;
			this.py = this._viewUI.msgTips1_img.y
			chat.models.ChatProxy.getInstance().event(chat.models.OPEN_MAINHUD_PET_LISTEN);
			//按钮点击事件
			this.onBtn();
			this.channelType = ChatModel.getInstance().getChannelBack();
			/** 初始化频道频道 */
			this._initChannel();
			this.closeChatContent(this._viewUI.tabBtn_tab.selectedIndex);
			this.banWords = models.ChatModel.getInstance().chatConfigBinDic;
			if (this.initFlag) {
				console.log("已经初始化该界面，数据不在重复配置！")
			} else { this.initData(); }
		}
		/** 初始化数据 */
		private initData(): void {
			this.initFlag = true;
			var objKeys = models.ChatModel.getInstance().chatQuickChat;
			for (var i = 1; i <= Object.keys(objKeys).length; i++) {
				this.quickChat.push(models.ChatModel.getInstance().chatQuickChat[i].tips);
			}

			for (var a = 1; a < 33; a++) {
				this.shield_word.push(this.banWords[a].tips);
			}
			//表情素材加载
			for (var a = 1; a <= 53; a++) {
				this.faceList.push({ url: "ui/liaotian/1384592709_" + a + ".png" });
			}
			var roleIcon = this._loginModel.cnpcShapeInfo;
			for (let index in roleIcon) {
				this.roleinfo.push(roleIcon[index].littleheadID);
			}

		}
		/** 初始化频道选择 */
		private _initChannel(): void {
			if (ChatModel.getInstance().Firstchannel != -1) {
				this._viewUI.tabBtn_tab.selectedIndex = ChatModel.getInstance().Firstchannel;
				// if (this._viewUI.tabBtn_tab.selectedIndex == 1) {/** 选中的是第一个标签 即世界频道 */
				// 	this.channel = ChannelType.CHANNEL_WORLD;
				// } else if (this._viewUI.tabBtn_tab.selectedIndex == 4) {/** 选中的是第四个标签 即工会频道 */
				// 	this.channel = ChannelType.CHANNEL_CLAN;
				// }
				switch (this._viewUI.tabBtn_tab.selectedIndex) {
					case 0:	//系统频道
						this.channel = ChannelType.CHANNEL_SYSTEM;
						break;
					case 1:	//世界频道
						this.channel = ChannelType.CHANNEL_WORLD;
						break;
					case 2:	//当前频道
						this.channel = ChannelType.CHANNEL_CURRENT;
						break;
					case 3:	//职业频道
						this.channel = ChannelType.CHANNEL_PROFESSION;
						break;
					case 4:	//公会频道
						this.channel = ChannelType.CHANNEL_CLAN;
						break;
					case 5:	//队伍频道
						this.channel = ChannelType.CHANNEL_TEAM;
						break;
					case 6:	//组队频道
						this.channel = ChannelType.CHANNEL_TEAM_APPLY;
						break;
				}
				ChatModel.getInstance().Firstchannel = -1;
			}
		}
		//所有按钮的点击事件初始化
		private onBtn(): void {
			this._viewUI.changecolor_btn.on(LEvent.MOUSE_DOWN, this, this.changeColor);
			this._viewUI.face_btn.on(LEvent.MOUSE_DOWN, this, this.openFace);
			this._viewUI.close1_btn.on(LEvent.MOUSE_DOWN, this, this.closeTiaoSe);
			this._viewUI.close2_btn.on(LEvent.MOUSE_DOWN, this, this.closeFace);
			this._viewUI.send_btn.on(LEvent.MOUSE_UP, this, this.sendChat);
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
			this._viewUI.tabBtn_tab.selectHandler = new Handler(this, this.closeChatContent);
			this._viewUI.lock_btn.on(LEvent.CLICK, this, this.onLock);
			this._viewUI.unreadMsg_img.on(LEvent.MOUSE_DOWN, this, this.onUpdMsg);
			chat.models.ChatProxy.getInstance().on(chat.models.SHOW_ITEM_TIPS, this, this._ShowTips);
			chat.models.ChatProxy.getInstance().on(chat.models.VIWE_OTHER_ITEM, this, this._ViewOtherItem);
			chat.models.ChatProxy.getInstance().on(chat.models.VIWE_SHARE_TASK, this, this._ViewShareTask);
			pet.models.PetProxy.getInstance().on(pet.models.GETPETINFO, this, this.OpPetInfo);
			// chat.models.ChatProxy.getInstance().on(chat.models.SYS_MSG_IN_CHANNEL, this, this.refreshSysMsg);



		}
		/** 刷新系统消息在频道中的表现 */
		private refreshSysMsg(channel: number): void {
			switch (channel) {
				case ChannelType.CHANNEL_WORLD:
					this.getWorldChatData(true, channel);
					break;
				case ChannelType.CHANNEL_TEAM:
					this.getTeamChatData(true, channel);
					break;
				case ChannelType.CHANNEL_CLAN:
					this.getFamilyChatData(true, channel);
					break;

				default:
					break;
			}
		}
		/** 更新数据 */
		private onUpdMsg(): void {
			this.onLock();
			var flag: boolean = false;
			switch (this.channel) {
				case this.channel = this.channelType.CHANNEL_SYSTEM: this.unlock(); this.showSystem(this.channel, flag); break;
				case this.channel = this.channelType.CHANNEL_WORLD: this.unlock(); this.showWorld(this.channel, flag); break;
				case this.channel = this.channelType.CHANNEL_CURRENT: this.unlock(); this.showNow(this.channel, flag); break;
				case this.channel = this.channelType.CHANNEL_PROFESSION: this.unlock(); this.showZhiYe(this.channel, flag); break;
				case this.channel = this.channelType.CHANNEL_CLAN: this.unlock(); this.showFamily(this.channel, flag); break;
				case this.channel = this.channelType.CHANNEL_TEAM: this.unlock(); this.showTeam(this.channel, flag); break;
				case this.channel = this.channelType.CHANNEL_TEAM_APPLY: this.unlock(); this.showZuzDui(this.channel, flag); break;
				default: break;
			}
		}
		/** 频道切换时要解锁 */
		private unlock(): void {
			/** 如果开锁就关闭 ，否则不操作*/
			if (this.flag) {
				this._viewUI.clsoeLock.play(null, false);
				this.flag = false;
				this._viewUI.unreadMsg_img.visible = false;
				ChatModel.getInstance().lockData = 0;
			}
		}
		/** 打开任务说明 
		 * @param displayInfo models.DisplayInfoVo
		*/
		private _ViewShareTask(displayInfo: models.DisplayInfoVo): void {
			this.TaskDescriberMediators = game.modules.commonUI.TaskDescriberMediators.getInstance(this._app);
			this.TaskDescriberMediators.onShow(displayInfo);
		}

		/** 
		 * 打开宠物详情界面
		 * @param petinfo 宠物详情
		 * @param nowPage 存储的当前页码
		 */
		public OpPetInfo(petinfo: game.modules.pet.models.PetInfoVo, nowPage?: boolean): void {
			let isShowInStage = super.isShow();
			this.PetXiangQingMediator = new game.modules.pet.PetXiangQingMediator(this._app);
			this.PetXiangQingMediator.init(petinfo);
			LoginModel.getInstance().CommonPage = "liaotian";
			this.hide();
		}

		/** 查看别人的Tips */
		public _ViewOtherItem(viewUI?, app?: AppBase): void {
			let parame;
			if (ChatModel.getInstance().viewItemId != 0) {
				let ItemId = ChatModel.getInstance().viewItemId;
				let obj = BagModel.getInstance().getItemAttrData(ItemId);
				parame = new Laya.Dictionary();
				try {
					var equipType = StrengTheningModel.getInstance().equipEffectData[ItemId].eequiptype;
				} catch (error) {
					equipType = -1;
				}
				parame.set("itemId", ItemId);
				parame.set("key", ChatModel.getInstance().chatTips[ChatModel.getInstance().chatTips.length - 1].uniqid);
				parame.set("packid", -1);
				parame.set("outbattleuse", obj.outbattleuse);//("packid",1)
				parame.set("shopid", obj.bCanSaleToNpc);
				parame.set("number", 1);
				parame.set("equiptype", equipType);
				let isShow = true;
				if (!viewUI) {
					this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame, isShow);
				} else {/** 方便主界面调用 */
					this._tipsModule = new game.modules.tips.tipsModule(viewUI, app, TIPS_TYPE.BAG, parame, isShow);
				}

			}
		}
		/** 显示背包道具Tips */
		private _ShowTips(): void {
			var parame: any;
			let selectItem = this.getItemBack();
			if (selectItem) {
				parame = new Laya.Dictionary();
				let obj = BagModel.getInstance().getItemAttrData(selectItem.id);
				try {
					var equipType = StrengTheningModel.getInstance().equipEffectData[selectItem.id].eequiptype;
				} catch (error) {
					equipType = -1;
				}
				parame.set("itemId", selectItem.id);
				parame.set("key", selectItem.key);
				parame.set("packid", 1);
				parame.set("outbattleuse", obj.outbattleuse);//("packid",1)
				parame.set("shopid", obj.bCanSaleToNpc);
				parame.set("number", selectItem.number);
				parame.set("equiptype", equipType);
				let isShow = true;
				this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame, isShow);
			}

		}
		/**根据 item key 获取选中的道具信息 */
		private getItemBack(chatkey?: number, fromBag?: boolean): any {
			let TipsLength = ChatModel.getInstance().chatTips.length;
			let key;
			if (chatkey) {
				key = chatkey;
			}
			else {
				key = ChatModel.getInstance().chatTips[TipsLength - 1].uniqid;
			}
			if (!fromBag) {
				for (let itemListIndex = 0; itemListIndex < this.itemList.length; itemListIndex++) {
					if (this.itemList[itemListIndex].key == key) {
						return this.itemList[itemListIndex];
					}
				}
			} else {
				let itemList = bagModel.getInstance().getBagGameItemData(BagTypes.BAG).items;
				for (let itemListIndex = 0; itemListIndex < itemList.length; itemListIndex++) {
					if (itemList[itemListIndex].key == key) {
						return itemList[itemListIndex];
					}

				}
			}

			return false;
		}
		/** 聊天频道点击显示物品的Tips */
		public showItemTips(displayinfo, fromBag?: boolean, app?: AppBase, viewUI?): void {/** 代码复用，后面是主界面的聊天点击传过来的参数 */
			let chatkey = displayinfo.uniqid;
			let item;
			if (!fromBag) {
				item = this.getItemBack(chatkey);
			} else {
				item = this.getItemBack(chatkey, fromBag);
			}

			if (item) {
				let parame: any;
				parame = new Laya.Dictionary();
				let obj = BagModel.getInstance().getItemAttrData(item.id);
				try {
					var equipType = StrengTheningModel.getInstance().equipEffectData[item.id].eequiptype;
				} catch (error) {
					equipType = -1;
				}
				parame.set("itemId", item.id);
				parame.set("key", item.key);
				parame.set("packid", 1);
				parame.set("outbattleuse", obj.outbattleuse);//("packid",1)
				parame.set("shopid", obj.bCanSaleToNpc);
				parame.set("number", item.number);
				parame.set("equiptype", equipType);
				let isShow = true;
				if (!app) {
					this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame, isShow);
				} else {
					this._tipsModule = new game.modules.tips.tipsModule(viewUI, app, TIPS_TYPE.BAG, parame, isShow);
				}


			}
		}


		/** Lock按钮 */
		private onLock(): void {
			if (!this.flag) {/** 左关-->右开 */
				this._viewUI.opLock.play(null, false);
				this.flag = true;
			} else if (this.flag) {/** 开-->关 */
				this._viewUI.clsoeLock.play(null, false);
				this.flag = false;
				this.scrollViwe();
			}

		}
		/** 聊天数据滚动 */
		private scrollViwe(): void {
			if (this.chatData == null) return;
			switch (this.channel) {
				case this.channelType.CHANNEL_WORLD:
					this._viewUI.worldChatList_panel.scrollTo(null, this.scrollY);
					break;
				case this.channelType.CHANNEL_CURRENT:
					this._viewUI.chatlist_panel.scrollTo(null, this.scrollY);
					break;
				case this.channelType.CHANNEL_PROFESSION:
					this._viewUI.zhiYeChatList_panel.scrollTo(null, this.scrollY);
					break;
				case this.channelType.CHANNEL_CLAN:
					this._viewUI.familyChatList_panel.scrollTo(null, this.scrollY);
					break;
				case this.channelType.CHANNEL_TEAM:
					this._viewUI.teamChatList_panel.scrollTo(null, this.scrollY);
					break;


				default:
					break;
			}
		}

		/** tab组件自按钮点击
		 * @param key tab组件下标
		 */
		private closeChatContent(key: number): void {
			this._viewUI.chatlist_panel.visible = false;
			this._viewUI.worldChatList_panel.visible = false;
			this._viewUI.zhiYeChatList_panel.visible = false;
			this._viewUI.familyChatList_panel.visible = false;
			this._viewUI.teamChatList_panel.visible = false;
			this._viewUI.nofamily_label.visible = false;
			this._viewUI.systemMsg_list.visible = false;
			this._viewUI.othersChat_list.visible = false;
			this._viewUI.zuduiList_panel.visible = false;
			var flag: boolean = false;
			switch (key) {
				case 0: this.channel = this.channelType.CHANNEL_SYSTEM; this.unlock(); this.showSystem(this.channel, flag); break;
				case 1: this.channel = this.channelType.CHANNEL_WORLD; this.unlock(); this.showWorld(this.channel, flag); break;
				case 2: this.channel = this.channelType.CHANNEL_CURRENT; this.unlock(); this.showNow(this.channel, flag); break;
				case 3: this.channel = this.channelType.CHANNEL_PROFESSION; this.unlock(); this.showZhiYe(this.channel, flag); break;
				case 4: this.channel = this.channelType.CHANNEL_CLAN; this.unlock(); this.showFamily(this.channel, flag); break;
				case 5: this.channel = this.channelType.CHANNEL_TEAM; this.unlock(); this.showTeam(this.channel, flag); break;
				case 6: this.channel = this.channelType.CHANNEL_TEAM_APPLY; this.unlock(); this.showZuzDui(this.channel, flag); break;
				default: break;
			}
		}
		/** 系统界面
		 * @param channel 频道
		 * @param flag 是否显示
		 */
		private showSystem(channel: number, flag: boolean): void {
			this.closeTips();
			this._viewUI.systemTips_lab.visible = true;
			this.chatData = ChatModel.getInstance().systemMsgList;
			this.getSystemData(flag);
		}
		/** 世界频道界面
		 * @param channel 频道
		 * @param flag 是否显示
		 */
		private showWorld(channel: number, flag: boolean): void {
			this.closeTips();
			this._viewUI.input_img.visible = true;
			this.chatData = ChatModel.getInstance().chatList.get(channel);
			if (this.chatData != null)
				this._viewUI.worldChatList_panel.visible = true;
			this.getWorldChatData(flag);
		}
		/** 当前界面
		 * @param channel 频道
		 * @param flag 是否显示
		 */
		private showNow(channel: number, flag: boolean): void {
			console.log("showNow....channel...." + channel);
			this.closeTips();
			this._viewUI.input_img.visible = true;
			this.chatData = ChatModel.getInstance().chatList.get(channel);
			if (this.chatData != null)
				this._viewUI.chatlist_panel.visible = true;
			this.getChatData(flag);


		}
		/** 职业频道界面
		 * @param channel 频道
		 * @param flag 是否显示
		 */
		private showZhiYe(channel: number, flag: boolean): void {
			console.log("showZhiYe....channel...." + channel);
			this.closeTips();
			this._viewUI.input_img.visible = true;
			this.chatData = ChatModel.getInstance().chatList.get(channel);
			if (this.chatData != null)
				this._viewUI.zhiYeChatList_panel.visible = true;
			this.getZhiYeChatData(flag);

		}
		/** 帮派频道界面
		 * @param channel 频道
		 * @param flag 是否显示
		 */
		private showFamily(channel: number, flag: boolean): void {
			this.closeTips();
			var clankey = game.modules.mainhud.models.HudModel._instance.clankey;
			if (clankey > 0) {  //有工会
				this._viewUI.nofamily_label.visible = false;
			} else { //没有公会
				this._viewUI.nofamily_label.visible = true;
			}
			this._viewUI.input_img.visible = true;
			this.chatData = ChatModel.getInstance().chatList.get(channel);
			if (this.chatData != null)
				this._viewUI.familyChatList_panel.visible = true;
			this.getFamilyChatData(flag);
			this._viewUI.goFamily_btn.on(LEvent.MOUSE_DOWN, this, this.goFamily);

		}
		/** 队伍组队界面
		 * @param channel 频道
		 * @param flag 是否显示
		 */
		private showTeam(channel: number, flag: boolean): void {
			this.closeTips();
			this._viewUI.input_img.visible = true;
			this.chatData = ChatModel.getInstance().chatList.get(channel);
			if (this.chatData != null)
				this._viewUI.teamChatList_panel.visible = true;
			this.getTeamChatData(flag);

		}
		/** 组队界面
		 * @param channel 频道
		 * @param flag 是否显示
		 */
		private showZuzDui(channel: number, flag: boolean): void {
			this.closeTips();
			this._viewUI.duiwuTips_lab.visible = true;
			this._viewUI.input_img.visible = false;
			this.chatData = ChatModel.getInstance().chatList.get(channel);
			if (this.chatData != null)
				this._viewUI.zuduiList_panel.visible = true;
			this.getZuDuiChatData(flag);


		}
		/** 跳往帮派界面 */
		public goFamily() {
			ModuleManager.show(ModuleNames.Family, this._app);
			this.hide();
		}
		/** 渲染系统消息 */
		private showSystemRender(index: number, panel: Laya.Panel): void {
			if (index < 0 || index > (this.chatData.length - 1)) return;
			var systemhtml = new Laya.HTMLDivElement;
			var channer_img = new Laya.Image;
			var channer_lab = new Laya.Label;
			channer_lab.x = 13;
			channer_lab.y = 6;
			channer_lab.color = "#ea0f0a";
			channer_lab.fontSize = 15;
			channer_lab.width = 30;
			channer_lab.height = 15;
			channer_lab.text = "系统";
			channer_img.x = 0;
			channer_img.y = 0;
			channer_img.skin = "common/ui/liaotian/liaotian_pindaodiban.png";
			channer_img.addChild(channer_lab);
			systemhtml.x = 58;
			systemhtml.y = 0;
			systemhtml.width = 351;
			let mainImg = new Laya.Image;
			mainImg.x = 0;
			mainImg.y = 0;
			mainImg.width = 420;
			mainImg.height = 50;
			mainImg.addChild(channer_img);
			mainImg.addChild(systemhtml);
			var msgId = this.chatData[index].messageid;
			let parameters = this.chatData[index].parameters;
			var data = HudModel.getInstance().promptAssembleBack(msgId, parameters);
			let times = 0;
			do {
				times = data.indexOf("#f6f6f4");
				data = data.replace("#f6f6f4", "#000000");
			} while (times != -1)
			systemhtml.innerHTML = data;
			/** 设置位置 */
			if (ChatModel.getInstance().lastSystemImg == null) mainImg.y = 1;
			else mainImg.y = ChatModel.getInstance().lastSystemImg.y + ChatModel.getInstance().lastSystemImg.height;
			mainImg.height = (systemhtml.contextHeight + 5);
			/** 存储位置信息 */
			ChatModel.getInstance().lastSystemImg = mainImg;
			// mainImg.skin = "common/ui/liaotian/liaotian_pindaodiban.png"
			panel.addChild(mainImg);
		}
		/** 发送聊天信息 */
		public sendChat(): void {
			if (this._viewUI.input_txtinput.text != "") {
				this.repstr = this._viewUI.input_txtinput.text;
				/** 关键字屏蔽 */
				for (var i = 0; i < this.shield_word.length; i++) {
					var index: number = this.repstr.search(this.shield_word[i]);
					if (index != -1) {
						this.repstr = this.repstr.replace(this.shield_word[i], "**");
					}
				}
				this.historyMsg = this.repstr;
				var msg = this.repstr;
				msg = this.color + "*split" + msg;
				//发送消息请求
				var isChenkGMCmd = this.chenkGMCmd(this.repstr, this.repstr);
				if (isChenkGMCmd) return;
				this.sendMsg(this.channel, msg, this.repstr, this.displayInfo, 0, 0);
				this.color = "#000000";
			}
			else {
				this.tipsTweenTo("输入点内容再发送吧！");
			}
		}
		/** 发送聊天协议 
		 * @param channel 频道
		 * @param msg 消息串
		 * @param repMsg 消息串
		 * @param displayInfo 
		 * @param funType 任务类型
		 * @param TaskId 任务Id
		*/
		private sendMsg(channel: number, msg: string, repMsg: string, displayInfo: any, funType: number, TaskId: number): void {
			let splitmsg = msg.split("*split");
			if (splitmsg.length == 2) {
				/** 如果分享道具被修改，将displayinfo置空 */
				if (displayInfo.length != 0 && displayInfo[0].displaytype != DisplayType.DISPLAY_TASK && splitmsg[1] != this.shareItem) displayInfo = [];
			} else {
				if (displayInfo.length != 0 && displayInfo[0].displaytype != DisplayType.DISPLAY_TASK && msg != this.shareItem) displayInfo = [];
			}

			RequesterProtocols._instance.c2s_CTransChatMessage2Serv(this.channel, msg, repMsg, displayInfo, funType, TaskId);
			this.shareItem = "";
		}
		/** 确认是否是GM命令
		 * @param msg 聊天内容
		 * @param pureMsg 特殊的格式
		 */
		private chenkGMCmd(msg: string, pureMsg): any {
			var GMflag: boolean = false;
			var flag = msg.search("//");
			if (flag != -1) {
				if (pureMsg.search("bgm") != -1) {
					GMflag = true;
				} else if (pureMsg.search("ssz") != -1) {
					GMflag = true;
				} else if (pureMsg.search("ssg") != -1) {
					GMflag = true;
				}
				else if (pureMsg.search("ssgw") != -1) {
					GMflag = true;
				}
				else if (pureMsg.search("ssb") != -1) {
					GMflag = true;
				} else {
					RequesterProtocols._instance.c2s_CSendCommand(msg);
					GMflag = true;
				}
			}

			return GMflag;

		}
		/** 提示信息缓动
		 * @param data 弹窗消息
		 */
		public tipsTweenTo(data: any): void {
			var terminalY: number = 300;
			this._viewUI.msgTips1_img.visible = true;
			this._viewUI.msgTips_lab.visible = true;
			this._viewUI.msgTips_lab.innerHTML = data;
			Laya.Tween.to(this._viewUI.msgTips1_img, { y: terminalY }, 500, null, Laya.Handler.create(this, function ()
			{ this._viewUI.msgTips1_img.visible = false; this._viewUI.msgTips1_img.x = this.px; this._viewUI.msgTips1_img.y = this.py; }), null, false);

		}
		/** 
		 * 判断当前的锁定视角
		 * @param panel Laya.Panel
		 */
		private chargeLockView(panel: Panel): void {
			if (!this.flag) {/** 锁关闭 第一视角*/
				panel.scrollTo(null, this.scrollY);
				this._viewUI.unreadMsg_img.visible = false;
				ChatModel.getInstance().lockData = 0;
			} else if (this.flag && this.scrollY > 674) //674为父节点显示的高度
			{/** 锁打开 不接受最新数据 */
				this._viewUI.unreadMsg_img.visible = true;
				ChatModel.getInstance().lockData = ChatModel.getInstance().lockData + 1;
				this._viewUI.unreadMsg_lab.text = "未读消息" + ChatModel.getInstance().lockData + "条";
			}
		}
		/** 
		 * 滚动panel窗口的时候
		 * @param panel Laya.Panel
		 */
		private onScrollPanel(panel: Laya.Panel): void {
			let val = panel.vScrollBar.value;
			let max = panel.vScrollBar.max;
			let ratio = val / max;
			if (ratio < 1) {/** 中间或前面 */
				if (!this.flag) {
					this._viewUI.opLock.play(null, false);
					this.flag = true;
				}
			} else if (ratio >= 1) {/** 最低端 */
				if (this.flag)
					this.onUpdMsg();
			}
		}
		/** 当前窗口 
		 * @param isUpdata 是否刷新
		*/
		public getChatData(isUpdata: boolean, channel: number = -1): void {
			/** 消息下发时，将displayinfo清空 */
			this.displayInfo = [];
			//如果传过来的频道与当前频道不一致返回
			if (channel != -1 && channel != this.channel) return;
			this.chatData = ChatModel.getInstance().chatList.get(this.channel);
			if (this.chatData == null) return;
			// console.trace("--this.chatData----"+this.chatData[this.chatData.length-1]);
			let roleid = LoginModel.getInstance().roleDetail.roleid;
			var length = this.chatData.length;
			console.log("this.chatData.length--...---" + this.chatData.length);
			//判断自己的记录并将记录保存在指定存放历史记录的数组里
			if (this.chatData[length - 1].roleid == roleid) { this.historyInput.push({ context: this.historyMsg }); }
			this.repstr = "";
			if (!isUpdata || !this.channelFlag) {
				this._viewUI.chatlist_panel.visible = true;
				this.channelFlag = true;
			}
			this._viewUI.chatlist_panel.vScrollBarSkin = "";
			this._viewUI.input_txtinput.text = "";
			//   this._viewUI.chatlist_panel.repeatY =this.chatData.length;			
			//   this._viewUI.chatlist_panel.array = this.chatData;
			this._viewUI.chatlist_panel.vScrollBar.elasticDistance = 10;
			this._viewUI.chatlist_panel.vScrollBar.elasticBackTime = 200;
			this.roleId = roleid;
			//    }
			//this._viewUI.chatlist_panel.renderHandler = new Handler(this,this.onRenderChatItem);
			this._viewUI.chatlist_panel.vScrollBar.on(LEvent.END, this, this.onScrollPanel, [this._viewUI.chatlist_panel]);
			// if ((this._viewUI.chatlist_panel.numChildren - 2) < this.chatData.length)
			// 	this.onRenderChatItem(this.chatData.length - 1, this._viewUI.chatlist_panel, this.channel);
			if (this._viewUI.chatlist_panel.numChildren - 2 < this.chatData.length) {
				let num = this._viewUI.chatlist_panel.numChildren - 2;
				for (var _index = num; _index < this.chatData.length; _index++) {
					this.onRenderChatItem(_index, this._viewUI.chatlist_panel, this.channel);
				}
			}
			this.chargeLockView(this._viewUI.chatlist_panel);
		}
		/** 世界窗口
		 * @param isUpdata 是否刷新显示
		 */
		public getWorldChatData(isUpdata: boolean, channel: number = -1): void {
			/** 消息下发时，将displayinfo清空 */
			this.displayInfo = [];
			//如果传过来的频道与当前频道不一致返回
			if (channel != -1 && channel != this.channel) return;
			this.chatData = ChatModel.getInstance().chatList.get(this.channel);
			if (this.chatData == null) return;
			let roleid = this._loginModel.roleDetail.roleid;
			var length = this.chatData.length;
			//判断自己的记录并将记录保存在指定存放历史记录的数组里
			if (this.chatData[length - 1].roleid == roleid) { this.historyInput.push({ context: this.historyMsg }); }
			this.repstr = "";
			if (!isUpdata) this._viewUI.worldChatList_panel.visible = true;
			this._viewUI.worldChatList_panel.vScrollBarSkin = "";
			this._viewUI.input_txtinput.text = "";
			this._viewUI.worldChatList_panel.vScrollBar.elasticBackTime = 10;
			this._viewUI.worldChatList_panel.vScrollBar.elasticDistance = 200;
			this.roleId = roleid;
			this._viewUI.worldChatList_panel.vScrollBar.on(LEvent.END, this, this.onScrollPanel, [this._viewUI.worldChatList_panel]);
			// if ((this._viewUI.worldChatList_panel.numChildren - 2) < this.chatData.length)
			// 	this.onRenderChatItem(this.chatData.length - 1, this._viewUI.worldChatList_panel, this.channel);
			if (this._viewUI.worldChatList_panel.numChildren - 2 < this.chatData.length) {
				let num = this._viewUI.worldChatList_panel.numChildren - 2;
				for (var _index = num; _index < this.chatData.length; _index++) {
					this.onRenderChatItem(_index, this._viewUI.worldChatList_panel, this.channel);
				}
			}
			this.chargeLockView(this._viewUI.worldChatList_panel);
		}
		/** 职业窗口 
		 * @param isUpdata 是否刷新显示
		*/
		public getZhiYeChatData(isUpdata: boolean, channel: number = -1): void {
			/** 消息下发时，将displayinfo清空 */
			this.displayInfo = [];
			//如果传过来的频道与当前频道不一致返回
			if (channel != -1 && channel != this.channel) return;
			this.chatData = ChatModel.getInstance().chatList.get(this.channel);
			if (this.chatData == null) return;
			let roleid = this._loginModel.roleDetail.roleid;
			var roleIcon = this._loginModel.createRoleConfigBinDic;
			var length = this.chatData.length;
			//判断自己的记录并将记录保存在指定存放历史记录的数组里
			if (this.chatData[length - 1].roleid == roleid) { this.historyInput.push({ context: this.historyMsg }); }
			this.repstr = "";
			if (!isUpdata) this._viewUI.zhiYeChatList_panel.visible = true;
			this._viewUI.zhiYeChatList_panel.vScrollBarSkin = "";
			this._viewUI.input_txtinput.text = "";
			this._viewUI.zhiYeChatList_panel.vScrollBar.elasticBackTime = 10;
			this._viewUI.zhiYeChatList_panel.vScrollBar.elasticDistance = 200;
			this.roleId = roleid;
			this._viewUI.zhiYeChatList_panel.vScrollBar.on(LEvent.END, this, this.onScrollPanel, [this._viewUI.zhiYeChatList_panel]);
			// if ((this._viewUI.zhiYeChatList_panel.numChildren - 2) < this.chatData.length)
			// 	this.onRenderChatItem(this.chatData.length - 1, this._viewUI.zhiYeChatList_panel, this.channel);
			if (this._viewUI.zhiYeChatList_panel.numChildren - 2 < this.chatData.length) {
				let num = this._viewUI.zhiYeChatList_panel.numChildren - 2;
				for (var _index = num; _index < this.chatData.length; _index++) {
					this.onRenderChatItem(_index, this._viewUI.zhiYeChatList_panel, this.channel);
				}
			}
			//保持输入的值在第一视角
			this.chargeLockView(this._viewUI.zhiYeChatList_panel);
		}
		/** 帮会窗口
		 * @param isUpdata 是否刷新显示
		 */
		public getFamilyChatData(isUpdata: boolean, channel: number = -1): void {
			/** 消息下发时，将displayinfo清空 */
			this.displayInfo = [];
			//如果传过来的频道与当前频道不一致返回
			if (channel != -1 && channel != this.channel) return;
			this.chatData = ChatModel.getInstance().chatList.get(this.channel);
			if (this.chatData == null) return;
			let roleid = this._loginModel.roleDetail.roleid;
			var roleIcon = this._loginModel.createRoleConfigBinDic;
			var length = this.chatData.length;
			//判断自己的记录并将记录保存在指定存放历史记录的数组里
			if (this.chatData[length - 1].roleid == roleid) { this.historyInput.push({ context: this.historyMsg }); }
			this.repstr = "";
			if (!isUpdata) this._viewUI.familyChatList_panel.visible = true;
			this._viewUI.familyChatList_panel.vScrollBarSkin = "";
			this._viewUI.input_txtinput.text = "";
			this._viewUI.familyChatList_panel.vScrollBar.elasticBackTime = 10;
			this._viewUI.familyChatList_panel.vScrollBar.elasticDistance = 200;
			this.roleId = roleid;
			this._viewUI.familyChatList_panel.vScrollBar.on(LEvent.END, this, this.onScrollPanel, [this._viewUI.familyChatList_panel]);
			// if ((this._viewUI.familyChatList_panel.numChildren - 2) < this.chatData.length)
			// 	this.onRenderChatItem(this.chatData.length - 1, this._viewUI.familyChatList_panel, this.channel);
			if (this._viewUI.familyChatList_panel.numChildren - 2 < this.chatData.length) {
				let num = this._viewUI.familyChatList_panel.numChildren - 2;
				for (var _index = num; _index < this.chatData.length; _index++) {
					this.onRenderChatItem(_index, this._viewUI.familyChatList_panel, this.channel);
				}
			}
			//保持输入的值在第一视角
			this.chargeLockView(this._viewUI.familyChatList_panel);

		}
		/** 队伍窗口 
		 * @param isUpdata 是否刷新显示
		*/
		public getTeamChatData(isUpdata: boolean, channel: number = -1): void {
			/** 消息下发时，将displayinfo清空 */
			this.displayInfo = [];
			//如果传过来的频道与当前频道不一致返回
			if (channel != -1 && channel != this.channel) return;
			this.chatData = ChatModel.getInstance().chatList.get(this.channel);
			if (this.chatData == null) return;
			let roleid = this._loginModel.roleDetail.roleid;
			var roleIcon = this._loginModel.createRoleConfigBinDic;
			var length = this.chatData.length;
			//判断自己的记录并将记录保存在指定存放历史记录的数组里
			if (this.chatData[length - 1].roleid == roleid) { this.historyInput.push({ context: this.historyMsg }); }
			this.repstr = "";
			if (!isUpdata) this._viewUI.teamChatList_panel.visible = true;
			this._viewUI.teamChatList_panel.vScrollBarSkin = "";
			this._viewUI.input_txtinput.text = "";
			this._viewUI.teamChatList_panel.vScrollBar.elasticBackTime = 10;
			this._viewUI.teamChatList_panel.vScrollBar.elasticDistance = 200;
			this.roleId = roleid;
			this._viewUI.teamChatList_panel.vScrollBar.on(LEvent.END, this, this.onScrollPanel, [this._viewUI.teamChatList_panel]);
			// if ((this._viewUI.teamChatList_panel.numChildren - 2) < this.chatData.length)
			// 	this.onRenderChatItem(this.chatData.length - 1, this._viewUI.teamChatList_panel, this.channel);
			if (this._viewUI.teamChatList_panel.numChildren - 2 < this.chatData.length) {
				let num = this._viewUI.teamChatList_panel.numChildren - 2;
				for (var _index = num; _index < this.chatData.length; _index++) {
					this.onRenderChatItem(_index, this._viewUI.teamChatList_panel, this.channel);
				}
			}
			//保持输入的值在第一视角
			this.chargeLockView(this._viewUI.teamChatList_panel);
		}

		/** 组队窗口
		 * @param isUpdata 是否刷新显示
		 */
		public getZuDuiChatData(isUpdata: boolean, channel: number = -1): void {
			/** 消息下发时，将displayinfo清空 */
			this.displayInfo = [];
			//如果传过来的频道与当前频道不一致返回
			if (channel != -1 && channel != this.channel) return;
			this.chatData = ChatModel.getInstance().chatList.get(this.channel);
			if (this.chatData == null) return;
			if (!isUpdata) this._viewUI.zuduiList_panel.visible = true;
			this._viewUI.zuduiList_panel.vScrollBarSkin = "";
			this._viewUI.input_txtinput.text = "";
			let roleid = this._loginModel.roleDetail.roleid;
			this.roleId = roleid;
			this._viewUI.zuduiList_panel.vScrollBar.elasticBackTime = 10;
			this._viewUI.zuduiList_panel.vScrollBar.elasticDistance = 200;
			this._viewUI.zuduiList_panel.vScrollBar.on(LEvent.END, this, this.onScrollPanel, [this._viewUI.zuduiList_panel]);
			// if ((this._viewUI.zuduiList_panel.numChildren - 2) < this.chatData.length)
			// 	this.onRenderChatItem(this.chatData.length - 1, this._viewUI.zuduiList_panel, this.channel);
			if (this._viewUI.zuduiList_panel.numChildren - 2 < this.chatData.length) {
				let num = this._viewUI.zuduiList_panel.numChildren - 2;
				for (var _index = num; _index < this.chatData.length; _index++) {
					this.onRenderChatItem(_index, this._viewUI.zuduiList_panel, this.channel);
				}
			}
			//保持输入的值在第一视角
			this.chargeLockView(this._viewUI.zuduiList_panel);
		}

		/** 系统数据下发
		 * @param isUpdata 是否刷新显示
		 */
		public getSystemData(isUpdata: boolean): void {
			this.chatData = ChatModel.getInstance().systemMsgList;
			console.log("systemData-----" + this.chatData);
			if (this.chatData.length == 0) return;
			if (!isUpdata || this.channel == ChannelType.CHANNEL_SYSTEM) this._viewUI.systemMsg_list.visible = true;
			this._viewUI.systemMsg_list.vScrollBarSkin = "";
			this._viewUI.systemMsg_list.vScrollBar.elasticBackTime = 200;
			this._viewUI.systemMsg_list.vScrollBar.elasticDistance = 100;
			// this._viewUI.systemMsg_list.renderHandler = new Handler(this,this.showSystemRender);
			if (this._viewUI.systemMsg_list.numChildren - 1 < this.chatData.length) {
				let num = this._viewUI.systemMsg_list.numChildren - 1;
				for (var _index = num; _index < this.chatData.length; _index++) {
					this.showSystemRender(_index, this._viewUI.systemMsg_list);
				}

			}

		}

		/** 关闭标签 */
		private closeTips(): void {
			this._viewUI.systemTips_lab.visible = false;
			this._viewUI.duiwuTips_lab.visible = false;
			this._viewUI.input_img.visible = false;
		}
		/** 聊天记录渲染 */
		public onRenderChatItem(index: number, list: Laya.Panel, channel: number): void {
			// this._viewUI.otherChatLogo_img.visible = false;
			if (typeof (this.chatData[index].roleid) == "number") {/** 存储正常聊天信息 */
				let roleid = this.roleId;
				if (index < 0 || index > this.chatData.length) return;
				console.log("index----" + index);
				var shape = this.chatData[index].shapeid;
				// let shape = this.roleinfo[id];
				var otherChat: Laya.Image = new Laya.Image;//cell.getChildByName("otherChatLogo_img") as Laya.Image;
				/** 是否是智慧试炼求助 */
				let iskejuHelp = false;
				/** 是否是组队喊话 */
				let isTeamYell = false;
				/** 是否是天机仙令 */
				let isTianJI = false;
				/** 是否是求助 */
				let isQiuZhu = false;
				/** 这里切割字符串，包含颜色和聊天内容 */
				let arr = this.chatData[index].message.split("*split");
				/** 切割主线求助信息 */
				let qiuZhu = this.chatData[index].message.split("*qz");
				/** 组队喊话切割 */
				let teamyell = this.chatData[index].message.split("#,");
				/** 智慧试炼求助切割->帮派频道 */
				let kejuHelp = this.chatData[index].message.split(",fq,");
				/** 天机仙令求助信息 */
				let tianji = this.chatData[index].message.split("^");
				/** 天机仙令任务类型 */
				let tasktype = -1;
				let apply_btn = new Laya.Button;
				let apply_btn2 = new Laya.Button;
				if (teamyell && teamyell.length == 7) {/** 是队伍的一键喊话信息 添加申请按钮 */
					isTeamYell = true;
					ChatModel.getInstance().SetBtnAtribute(apply_btn, "#888817");
					apply_btn.label = "[申请加入]";
				} else if (kejuHelp && kejuHelp.length == 4) {
					iskejuHelp = true;
					ChatModel.getInstance().SetBtnAtribute(apply_btn, "#ff6600");
					apply_btn.label = "[回答问题]";
				} else if (tianji && (tianji.length == 8 || tianji.length == 2)) {
					isTianJI = true;
					ChatModel.getInstance().SetBtnAtribute(apply_btn, "#ff6600");
					let taskid = tianji[0];
					tasktype = game.modules.tianjixianling.models.TianJiXianLingModel.getInstance().tjxlConfig[taskid].tasktype;
					if (tasktype == TaskType.Item || tasktype == TaskType.Pet)
						apply_btn.label = "[帮助完成]";
					else if (tasktype == TaskType.NPC)
						apply_btn.label = "[申请加入]";
				} else if (qiuZhu && qiuZhu.length > 1) {
					isQiuZhu = true;
					ChatModel.getInstance().SetBtnAtribute(apply_btn, "#888817");
					ChatModel.getInstance().SetBtnAtribute(apply_btn2, "#ff6600");
					apply_btn.label = qiuZhu[1];
					apply_btn2.label = "[申请加入]";
				}
				/** 这里开始添加ui */
				/** 父节点 */
				let subject_img: Laya.Image = new Laya.Image;
				subject_img.height = 81;
				subject_img.width = 429;
				/** 背景头像 */
				var weChat: Laya.Image = new Laya.Image;
				subject_img.addChild(weChat);
				weChat.skin = "common/ui/tongyong/dikuangda.png";
				weChat.height = 60;
				weChat.width = 60;
				weChat.visible = true;
				/** 名称 */
				var we_playerName: Label = new Laya.Label;//cell.getChildByName("weChatLogo_img").getChildByName("playerName") as Label;
				subject_img.addChild(we_playerName);
				we_playerName.height = 29;
				we_playerName.width = 146;
				we_playerName.color = "#8d2222";
				we_playerName.valign = "middle";
				we_playerName.align = "center";
				we_playerName.font = "SimHei";
				we_playerName.fontSize = 25;
				we_playerName.text = this.chatData[index].rolename;
				/** 聊天富文本框衔接聊天内容 */
				var chatContent: Laya.HTMLDivElement = new Laya.HTMLDivElement;
				chatContent.visible = true;
				/** 聊天背景衔接富文本框 */
				var we_img: Laya.Image = new Laya.Image;
				we_img.skin = "common/ui/tongyong/banzi7.png";
				we_img.height = 35;
				we_img.width = 266;
				subject_img.addChild(we_img);
				subject_img.addChild(chatContent);
				/** 箭头 */
				var arrow_img: Laya.Image = new Laya.Image;//cell.getChildByName("weChatLogo_img").getChildByName("weChat_img") as Laya.Image;
				subject_img.addChild(arrow_img);
				arrow_img.skin = "common/ui/liaotian/liaotian_kuang2_arrow.png";
				var wechannel_img: Laya.Image = new Laya.Image;//cell.getChildByName("weChatLogo_img").getChildByName("weChat_img") as Laya.Image;
				subject_img.addChild(wechannel_img);
				wechannel_img.skin = "common/ui/liaotian/liaotian_pindaodiban.png";
				/** 频道 */
				var weChannel_lab: Label = new Laya.Label;//cell.getChildByName("weChatLogo_img").getChildByName("playerName") as Label;
				wechannel_img.addChild(weChannel_lab);
				/** 选择频道 */
				this.changeChannelAndColor(weChannel_lab);
				/** 角色头像信息 */
				var roleLogo: Laya.Image = new Laya.Image;
				subject_img.addChild(roleLogo);
				roleLogo.skin = "icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + shape) + ".png";
				roleLogo.height = 54;
				roleLogo.width = 54;
				weChannel_lab.fontSize = 20;
				we_playerName.text = this.chatData[index].rolename;
				if (this.chatData[index].roleid == roleid) { //我们自己的聊天
					weChat.x = 352;
					weChat.y = 5;
					we_playerName.x = 133;
					we_playerName.y = 4;
					chatContent.x = 80;
					chatContent.y = 46;
					we_img.x = 337;
					we_img.y = 38;
					we_img.anchorX = 1;
					we_img.anchorY = 0;
					arrow_img.x = 337;
					arrow_img.y = 47;
					wechannel_img.x = 277;
					wechannel_img.y = 5;
					weChannel_lab.x = 8;
					weChannel_lab.y = 4;
					roleLogo.x = 355;
					roleLogo.y = 8;
					if (isTeamYell) {
						/** 是队伍喊话信息 特殊处理数据 */
						let html = "<span style='font:24px ;color:#000000'>[ " + teamyell[0] + "</span>";
						html += "<span style='color:#000000;fontSize:24'>(" + teamyell[1] + "/5),</span>";
						html += "<span style='color:#000000;fontSize:24'>等级" + teamyell[2] + "-" + teamyell[3] + "开组了! </span>";
						html += "<span style='color:#000000;fontSize:24'>" + teamyell[4] + " ]</span>";
						// html += "<span style='color:#888817;fontSize:24'> [申请加入] </span>";
						chatContent.style.leading = 3;
						chatContent.innerHTML = html;
						subject_img.addChild(apply_btn);
					} else if (iskejuHelp) {
						/** 智慧试炼求助 */
						let questionId = Number(kejuHelp[0]);//题目Id
						let examtype = kejuHelp[3];
						let data = KejuModel.getInstance().getExamConfigData(examtype);
						let html = "<span style='font:24px ;color:#ff6600'>" + data[questionId].name + "</span>";
						chatContent.style.leading = 3;
						chatContent.innerHTML = html;
						subject_img.addChild(apply_btn);
					} else if (isTianJI) {
						/** 天机仙令寻求帮助 */
						let rolename = this.chatData[index].rolename;
						let html = "<span style='font:24px ;color:#0066ff'>" + rolename + "</span>";
						html += "<span style='font:24px ;color:#000000'>发布了任务求助信息</span>";
						let taskId = tianji[0];
						let taskname = game.modules.tianjixianling.models.TianJiXianLingModel.getInstance().tjxlConfig[taskId].strtasknameui;

						html += "<span style='font:24px ;color:#33cc00'>" + taskname + "</span>";
						if (tasktype != -1 && tasktype == TaskType.Pet) //需求
						{
							html += "<span style='font:24px ;color:#000000'>需求</span>";
							let targetId = tianji[6];
							let targetNum = tianji[7];
							let petName = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[targetId].name;
							html += "<span style='font:24px ;color:#33cc00'>" + petName + "x" + targetNum + "</span>";
							chatContent.innerHTML = html;
							HudModel.getInstance().setApplyBtnPos(4, apply_btn, chatContent);
						} else if (tasktype != -1 && tasktype == TaskType.Item) {
							html += "<span style='font:24px ;color:#000000'>需求</span>";
							let targetId = tianji[6];
							let targetNum = tianji[7];
							let itemName = game.modules.bag.models.BagModel.getInstance().itemAttrData[targetId].name;
							html += "<span style='font:24px ;color:#33cc00'>" + itemName + "x" + targetNum + "</span>";
							chatContent.innerHTML = html;
							HudModel.getInstance().setApplyBtnPos(4, apply_btn, chatContent);
						} else if (tasktype != -1 && tasktype == TaskType.NPC) {
							chatContent.innerHTML = html;
							HudModel.getInstance().setApplyBtnPos(2, apply_btn, chatContent);
						}
						chatContent.style.leading = 3;

						subject_img.addChild(apply_btn);
					} else if (isQiuZhu) {
						we_img.addChild(apply_btn);
						we_img.addChild(apply_btn2);
						apply_btn.labelAlign = "center";
						apply_btn2.labelAlign = "center";
						var width = apply_btn.label.length - apply_btn2.label.length <= 0 ? 0 : (apply_btn.label.length - apply_btn2.label.length) * 20;
						apply_btn.width += width;
						chatContent.visible = false;
						apply_btn.x = 5;
						apply_btn2.x = apply_btn.width;
						apply_btn.on(LEvent.CLICK, this, this.otherOnItem, [this.chatData[index].displayinfos[0]]);
						apply_btn2.on(LEvent.CLICK, this, this.onApplyTeam, [this.chatData[index].roleid]);
						we_img.width = apply_btn.width + apply_btn2.width + 15;
					} else if (arr.length == 2) {/** 正常输入聊天记录 */
						var facehtml = arr[1];
						if ((arr[1].indexOf("@") != -1)) {
							facehtml = ChatModel.getInstance().getFaceHtmlText(arr[1]);
						}
						chatContent.innerHTML = "<span style='font:24px ;color:" + arr[0] + "'>" + facehtml + "</span>";
					} else {/** 任务时直接请求 */
						chatContent.innerHTML = "<span style='font:24px '>" + this.chatData[index].message + "</span>";
					}

					/** 改变富文本坐标，多还少补！！！ */
					chatContent.width = 245;
					let cha = 245 - chatContent.contextWidth;
					cha = parseInt(cha.toFixed(0));
					if (cha != 0) {
						/** 之前在这对富文本框的宽度重新处理，但是如果末尾出现字母时会自动换行，所以这里不对宽度处理 */
						chatContent.x += cha;
						if (isTeamYell) {/** 组队邀请格式 */
							let lastwordXpos = chatContent._childs[3]._text.words[chatContent._childs[3]._text.words.length - 1]._x + chatContent._childs[3]._text.words[chatContent._childs[3]._text.words.length - 1]._w;
							let lastwordYpos = chatContent._childs[3]._text.words[chatContent._childs[3]._text.words.length - 1]._y + 1;
							this.setApplyBtnPos(3, apply_btn, chatContent, true);
							// apply_btn.x = lastwordXpos + chatContent.x;
							// let contentwidth = lastwordXpos + apply_btn.width; //加入按钮后的实际宽度
							// if (contentwidth > chatContent.contextWidth) {
							// 	let hang = chatContent.contextHeight / 27; //行数行高27 = 字体大小24+行间距3
							// 	/** 按钮宽110，超过一半就换行 */
							// 	if (contentwidth - 55 <= chatContent.contextWidth) { /** 处理不换行 */
							// 		let x = contentwidth - chatContent.contextWidth;
							// 		let cha = Math.floor(x / hang);
							// 		chatContent.width = chatContent.width + cha;
							// 		chatContent.x = chatContent.x - cha;
							// 		let xs = chatContent._childs[3]._text.words[chatContent._childs[3]._text.words.length - 1]._x + chatContent._childs[3]._text.words[chatContent._childs[3]._text.words.length - 1]._w;
							// 		apply_btn.x = xs + chatContent.x;
							// 		apply_btn.y = chatContent.y + chatContent._childs[3]._text.words[chatContent._childs[3]._text.words.length - 1]._y + 1;
							// 	} else {/** 换行处理 */
							// 		chatContent.contextHeight = chatContent.contextHeight + apply_btn.height + chatContent.style.leading;
							// 		apply_btn.x = chatContent.x;
							// 		apply_btn.y = chatContent.y + (chatContent.style.leading + 24) * hang;
							// 	}
							// } else {
							// 	apply_btn.y = chatContent.y + chatContent._childs[3]._text.words[chatContent._childs[3]._text.words.length - 1]._y + 1;
							// }
							chatContent.on(LEvent.CLICK, this, this.onRequestTeamInfo, [teamyell[6]]);
							apply_btn.on(LEvent.CLICK, this, this.onApplyTeam, [teamyell[5]]);
						} else if (iskejuHelp) {/** 科举 */
							let lastwordXpos = chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length - 1]._x + chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length - 1]._w;
							let lastwordYpos = chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length - 1]._y + 1;
							this.setApplyBtnPos(0, apply_btn, chatContent, true);
							// apply_btn.x = lastwordXpos + chatContent.x;
							// let contentwidth = lastwordXpos + apply_btn.width; //加入按钮后的实际宽度
							// if (contentwidth > chatContent.contextWidth) {
							// 	let hang = chatContent.contextHeight / 27; //行数行高27 = 字体大小24+行间距3
							// 	/** 按钮宽110，超过一半就换行 */
							// 	if (contentwidth - 55 <= chatContent.contextWidth) { /** 处理不换行 */
							// 		let x = contentwidth - chatContent.contextWidth;
							// 		let cha = Math.floor(x / hang);
							// 		chatContent.width = chatContent.width + cha;
							// 		chatContent.x = chatContent.x - cha;
							// 		let xs = chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length - 1]._x + chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length - 1]._w;
							// 		apply_btn.x = xs + chatContent.x;
							// 		apply_btn.y = chatContent.y + chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length - 1]._y + 1;
							// 	} else {/** 换行处理 */
							// 		chatContent.contextHeight = chatContent.contextHeight + apply_btn.height + chatContent.style.leading;
							// 		apply_btn.x = chatContent.x;
							// 		apply_btn.y = chatContent.y + (chatContent.style.leading + 24) * hang;
							// 	}
							// } else {
							// 	apply_btn.y = chatContent.y + chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length - 1]._y + 1;
							// }
							apply_btn.on(LEvent.CLICK, this, ChatModel.getInstance().onShowKejuTitle, [kejuHelp[0], kejuHelp[3], kejuHelp[1], kejuHelp[2], this._app]);
						}
						else if (isTianJI) {
							/** 天机仙令 */
							// let lastwordXpos = chatContent._childs[4]._text.words[chatContent._childs[4]._text.words.length - 1]._x + chatContent._childs[4]._text.words[chatContent._childs[4]._text.words.length - 1]._w;
							// let lastwordYpos = chatContent._childs[4]._text.words[chatContent._childs[4]._text.words.length - 1]._y;

							if (tasktype == TaskType.Item || tasktype == TaskType.Pet) {
								apply_btn.on(LEvent.CLICK, this, ChatModel.getInstance().responseTJXLHelp, [tasktype, tianji[6], tianji[0], this._app, this._viewUI, this.chatData[index].roleid, tianji[4]]);
								this.setApplyBtnPos(4, apply_btn, chatContent, true);
							} else if (tasktype == TaskType.NPC) {
								apply_btn.on(LEvent.CLICK, this, ChatModel.getInstance().responseTJXLHelp, [tasktype, 0, 0, this._app, this._viewUI, this.chatData[index].roleid]);
								this.setApplyBtnPos(2, apply_btn, chatContent, true);
							}

						}
					}
				} else { /** 其他人的聊天数据 */
					weChat.x = 4;
					weChat.y = 5;
					roleLogo.x = 7;
					roleLogo.y = 8;
					we_playerName.x = 127;
					we_playerName.y = 4;
					chatContent.x = 90;
					chatContent.y = 49;
					we_img.x = 82;
					we_img.y = 43;
					we_img.anchorX = 0;
					we_img.anchorY = 0;
					arrow_img.x = 81;
					arrow_img.y = 68;
					arrow_img.rotation = 180;
					wechannel_img.x = 68;
					wechannel_img.y = 5;
					weChannel_lab.x = 8;
					weChannel_lab.y = 4;
					/** 改变富文本坐标，多还少补！！！ */
					chatContent.width = 245;
					if (isTeamYell) {/** 是队伍喊话信息 特殊处理数据 */
						let html = "<span style='font:24px ;color:#000000'>[ " + teamyell[0] + "</span>";
						html += "<span style='color:#000000;fontSize:24'>(" + teamyell[1] + "/5),</span>";
						html += "<span style='color:#000000;fontSize:24'>等级" + teamyell[2] + "-" + teamyell[3] + "开组了! </span>";
						html += "<span style='color:#000000;fontSize:24'>" + teamyell[4] + " ]</span>";
						chatContent.style.leading = 3;
						chatContent.innerHTML = html;
						subject_img.addChild(apply_btn);
						let lastwordXpos = chatContent._childs[3]._text.words[chatContent._childs[3]._text.words.length - 1]._x + chatContent._childs[3]._text.words[chatContent._childs[3]._text.words.length - 1]._w;
						let lastwordYpos = chatContent._childs[3]._text.words[chatContent._childs[3]._text.words.length - 1]._y + 3;
						this.setApplyBtnPos(3, apply_btn, chatContent, false);
						// apply_btn.x = lastwordXpos + chatContent.x;
						// apply_btn.on(LEvent.MOUSE_DOWN, this, this.onApplyTeam, [teamyell[5]]);
						// let contentwidth = lastwordXpos + apply_btn.width; //加入按钮后的实际宽度
						// /** 判断按钮显示位置，是否需要换行 */
						// if (contentwidth > chatContent.contextWidth) {
						// 	let hang = chatContent.contextHeight / 27; //行数行高27 = 字体大小24+行间距3
						// 	/** 按钮宽110，超过一半就换行 */
						// 	if (contentwidth - 55 <= chatContent.contextWidth) { /** 处理不换行 */
						// 		let x = contentwidth - chatContent.contextWidth;
						// 		let cha = Math.floor(x / hang);
						// 		chatContent.width = chatContent.width + cha;
						// 		// chatContent.x = chatContent.x - cha;
						// 		let xs = chatContent._childs[3]._text.words[chatContent._childs[3]._text.words.length - 1]._x + chatContent._childs[3]._text.words[chatContent._childs[3]._text.words.length - 1]._w;
						// 		apply_btn.x = xs + chatContent.x;
						// 		apply_btn.y = chatContent.y + chatContent._childs[3]._text.words[chatContent._childs[3]._text.words.length - 1]._y + 3;
						// 	} else {/** 换行处理 */
						// 		chatContent.contextHeight = chatContent.contextHeight + apply_btn.height + chatContent.style.leading;
						// 		apply_btn.x = chatContent.x;
						// 		apply_btn.y = chatContent.y + (chatContent.style.leading + 24) * hang + 3;
						// 	}
						// } else {/** 不需要特殊处理 */
						// 	apply_btn.y = chatContent.y + chatContent._childs[3]._text.words[chatContent._childs[3]._text.words.length - 1]._y + 3;
						// }
					} else if (iskejuHelp) {/** 智慧试炼求助 */
						let questionId = Number(kejuHelp[0]);//题目Id
						let examtype = kejuHelp[3];
						let data = KejuModel.getInstance().getExamConfigData(examtype);
						let html = "<span style='font:24px ;color:#ff6600'>" + data[questionId].name + "</span>";
						chatContent.style.leading = 3;
						chatContent.innerHTML = html;
						subject_img.addChild(apply_btn);
						let lastwordXpos = chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length - 1]._x + chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length - 1]._w;
						let lastwordYpos = chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length - 1]._y + 3;
						this.setApplyBtnPos(0, apply_btn, chatContent, false);
						// apply_btn.x = lastwordXpos + chatContent.x;
						// // apply_btn.y = chatContent.y + chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length-1]._y +1;
						// apply_btn.on(LEvent.CLICK, this, ChatModel.getInstance().onShowKejuTitle, [kejuHelp[0], kejuHelp[3], kejuHelp[1], kejuHelp[2], this._app]);
						// let contentwidth = lastwordXpos + apply_btn.width; //加入按钮后的实际宽度
						// /** 判断按钮显示位置，是否需要换行 */
						// if (contentwidth > chatContent.contextWidth) {
						// 	let hang = chatContent.contextHeight / 27; //行数行高27 = 字体大小24+行间距3
						// 	/** 按钮宽110，超过一半就换行 */
						// 	if (contentwidth - 55 <= chatContent.contextWidth) { /** 处理不换行 */
						// 		let x = contentwidth - chatContent.contextWidth;
						// 		let cha = Math.floor(x / hang);
						// 		chatContent.width = chatContent.width + cha;
						// 		// chatContent.x = chatContent.x - cha;
						// 		let xs = chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length - 1]._x + chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length - 1]._w;
						// 		apply_btn.x = xs + chatContent.x;
						// 		apply_btn.y = chatContent.y + chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length - 1]._y + 3;
						// 	} else {/** 换行处理 */
						// 		chatContent.contextHeight = chatContent.contextHeight + apply_btn.height + chatContent.style.leading;
						// 		apply_btn.x = chatContent.x;
						// 		apply_btn.y = chatContent.y + (chatContent.style.leading + 24) * hang + 3;
						// 	}
						// } else {/** 不需要特殊处理 */
						// 	apply_btn.y = chatContent.y + chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length - 1]._y + 3;
						// }
					}
					else if (isTianJI) {/** 天机仙令 */
						let rolename = this.chatData[index].rolename;
						let taskId = tianji[0];
						let taskname = game.modules.tianjixianling.models.TianJiXianLingModel.getInstance().tjxlConfig[taskId].strtasknameui;
						let html = "<span style='font:24px ;color:#0066ff'>" + rolename + "</span>";
						html += "<span style='font:24px ;color:#000000'>发布了任务求助信息</span>";
						html += "<span style='font:24px ;color:#33cc00'>" + taskname + "</span>";
						if (tasktype != -1 && tasktype == TaskType.Pet) //需求
						{
							html += "<span style='font:24px ;color:#000000'>需求</span>";
							let targetId = tianji[6];
							let targetNum = tianji[7];
							let petName = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[targetId].name;
							html += "<span style='font:24px ;color:#33cc00'>" + petName + "x" + targetNum + "</span>";
							chatContent.innerHTML = html;
							// HudModel.getInstance().setApplyBtnPos(4, apply_btn, chatContent);
							this.setApplyBtnPos(4, apply_btn, chatContent, false);
							apply_btn.on(LEvent.CLICK, this, ChatModel.getInstance().responseTJXLHelp, [tasktype, tianji[6], tianji[0], this._app, this._viewUI, this.chatData[index].roleid, tianji[4]]);
						} else if (tasktype != -1 && tasktype == TaskType.Item) {
							html += "<span style='font:24px ;color:#000000'>需求</span>";
							let targetId = tianji[6];
							let targetNum = tianji[7];
							let itemName = game.modules.bag.models.BagModel.getInstance().itemAttrData[targetId].name;
							html += "<span style='font:24px ;color:#33cc00'>" + itemName + "x" + targetNum + "</span>";
							chatContent.innerHTML = html;
							this.setApplyBtnPos(4, apply_btn, chatContent, false);
							apply_btn.on(LEvent.CLICK, this, ChatModel.getInstance().responseTJXLHelp, [tasktype, tianji[6], tianji[0], this._app, this._viewUI, this.chatData[index].roleid, tianji[4]]);
						} else if (tasktype != -1 && tasktype == TaskType.NPC) {
							chatContent.innerHTML = html;
							this.setApplyBtnPos(2, apply_btn, chatContent, false);
							apply_btn.on(LEvent.CLICK, this, ChatModel.getInstance().responseTJXLHelp, [tasktype, 0, 0, this._app, this._viewUI, this.chatData[index].roleid]);
						}
						chatContent.style.leading = 3;

						subject_img.addChild(apply_btn);
						// let lastwordXpos = chatContent._childs[4]._text.words[chatContent._childs[4]._text.words.length - 1]._x + chatContent._childs[4]._text.words[chatContent._childs[4]._text.words.length - 1]._w;
						// let lastwordYpos = chatContent._childs[4]._text.words[chatContent._childs[4]._text.words.length - 1]._y;
						// this.setApplyBtnPos(4, apply_btn, chatContent,false);

					} else if (isQiuZhu) {
						we_img.addChild(apply_btn);
						we_img.addChild(apply_btn2);
						apply_btn.labelAlign = "center";
						apply_btn2.labelAlign = "center";
						var width = apply_btn.label.length - apply_btn2.label.length <= 0 ? 0 : (apply_btn.label.length - apply_btn2.label.length) * 20;
						apply_btn.width += width;
						chatContent.visible = false;
						apply_btn.x = 5;
						apply_btn2.x = apply_btn.width;
						apply_btn.on(LEvent.CLICK, this, this.otherOnItem, [this.chatData[index].displayinfos[0]]);
						apply_btn2.on(LEvent.CLICK, this, this.onApplyTeam, [this.chatData[index].roleid]);
						we_img.width = apply_btn.width + apply_btn2.width + 15;
					} else if (arr.length == 2) {
						var facehtml = arr[1];
						if ((arr[1].indexOf("@") != -1)) {
							facehtml = ChatModel.getInstance().getFaceHtmlText(arr[1]);
						}
						chatContent.innerHTML = "<span style='font:24px ;color:" + arr[0] + "'>" + facehtml + "</span>";
						// let facehtml = ChatModel.getInstance().getFaceHtmlText(arr[1]);
						// chatContent.innerHTML = "<span style='font:24px ;color:" + arr[0] + "; SimHei'> " + facehtml + "</span>";
					} else { //没明白这是干什么 if (index != this.chatData.length - 1) 
						chatContent.innerHTML = "<span style='font:24px ; SimHei'> " + this.chatData[index].message + "</span>";
					}
				}
				if (isTeamYell) {
					//   chatContent.on(LEvent.MOUSE_DOWN,this,this.show)
					chatContent.on(LEvent.CLICK, this, this.onRequestTeamInfo, [teamyell[6]]);
					apply_btn.on(LEvent.CLICK, this, this.onApplyTeam, [teamyell[5]]);
				} else if (this.chatData[index].displayinfos.length != 0 && this.chatData[index].displayinfos[0].displaytype == DisplayType.DISPLAY_ITEM) {/**自己的 道具请求tips */
					// let key = this.chatData[index].displayinfos[0].uniqid;
					// let item = this.getItemBack(key);
					// let obj = BagModel.getInstance().getItemAttrData(item.id);
					// let quality = obj.nquality;
					// if(quality != 1)
					// {
					// 	let color = this.judgeColor(quality);
					// 	we_chatContent.innerHTML = "<span style='font:24px ;color:"+color+"'>"+this.chatData[index].message+"</span>";
					// }
					if (this.chatData[index].roleid == LoginModel.getInstance().roleDetail.roleid)
						chatContent.on(LEvent.CLICK, this, this.showItemTips, [this.chatData[index].displayinfos[0]]);
					else chatContent.on(LEvent.CLICK, this, this.otherOnItem, [this.chatData[index].displayinfos[0], arr[1]])
				} else if (this.chatData[index].displayinfos.length != 0) {/** 宠物信息或任务请求 */
					chatContent.on(LEvent.CLICK, this, this.otherOnItem, [this.chatData[index].displayinfos[0], this.chatData[index].message])
				}
				/** 存在的表情数 */
				// let imgTimes = facehtml.split("<img").length-1  ;
				chatContent.style.align = "left";
				chatContent.style.leading = 3;
				if (!isQiuZhu) {
					we_img.height = chatContent.contextHeight + 25;
					we_img.width = chatContent.contextWidth + 25;
				}
				if (we_img.height > 50) {/** 位置重新处理 */
					subject_img.height += (we_img.height - 35);
				}

				switch (channel) {
					case ChannelType.CURRENR_CHANNEL:
						if (ChatModel.getInstance().lastCurrentImg == null) subject_img.y = 1;
						else subject_img.y = ChatModel.getInstance().lastCurrentImg.y + ChatModel.getInstance().lastCurrentImg.height + 5;
						ChatModel.getInstance().lastCurrentImg = subject_img;
						break;
					case ChannelType.WORLD_CHANNEL:
						if (ChatModel.getInstance().lastWorldImg == null) subject_img.y = 1;
						else subject_img.y = ChatModel.getInstance().lastWorldImg.y + ChatModel.getInstance().lastWorldImg.height + 5;
						ChatModel.getInstance().lastWorldImg = subject_img;
						break;
					case ChannelType.FAMILY_CHANNEL:
						if (ChatModel.getInstance().lastFamilyImg == null) subject_img.y = 1;
						else subject_img.y = ChatModel.getInstance().lastFamilyImg.y + ChatModel.getInstance().lastFamilyImg.height + 5;
						ChatModel.getInstance().lastFamilyImg = subject_img;
						break;
					case ChannelType.CHANNEL_PROFESSION:
						if (ChatModel.getInstance().lastZhiYeImg == null) subject_img.y = 1;
						else subject_img.y = ChatModel.getInstance().lastZhiYeImg.y + ChatModel.getInstance().lastZhiYeImg.height + 5;
						ChatModel.getInstance().lastZhiYeImg = subject_img;
						break;
					case ChannelType.CHANNEL_TEAM:
						if (ChatModel.getInstance().lastTeamImg == null) subject_img.y = 1;
						else subject_img.y = ChatModel.getInstance().lastTeamImg.y + ChatModel.getInstance().lastTeamImg.height + 5;
						ChatModel.getInstance().lastTeamImg = subject_img;
						break;
					case ChannelType.CHANNEL_TEAM_APPLY:
						if (ChatModel.getInstance().lastZuDuiImg == null) subject_img.y = 1;
						else subject_img.y = ChatModel.getInstance().lastZuDuiImg.y + ChatModel.getInstance().lastZuDuiImg.height + 5;
						ChatModel.getInstance().lastZuDuiImg = subject_img;
						break;

					default:
						break;
				}
				list.addChild(subject_img);
				/** 滚动条信息 */
				this.scrollY = subject_img.y + subject_img.height;
				if (!this.flag) {
					/** 重新设置滚动条 */
					list.vScrollBar.setScroll(0, this.scrollY, this.scrollY);
					list.scrollTo(null, this.scrollY);
				}

			} else {/** 组队或红包消息 */
				var html = new Laya.HTMLDivElement;
				var channer_img = new Laya.Image;
				var channer_lab = new Laya.Label;
				var clickbtn = new Laya.Button;
				let param = ChatModel.getInstance().specialChannelData.get(this.chatData[index].roleid);
				if (typeof (this.chatData[index].roleid) == "string") {
					clickbtn.label = "[抢红包]";
					clickbtn.skin = "";
				}
				channer_lab.x = 13;
				channer_lab.y = 6;
				channer_lab.fontSize = 15;
				channer_lab.width = 30;
				channer_lab.height = 15;
				channer_img.x = 0;
				channer_img.y = 0;
				channer_img.skin = "common/ui/liaotian/liaotian_pindaodiban.png";
				html.x = 58;
				html.y = 0;
				html.width = 300;
				let mainImg = new Laya.Image;
				mainImg.x = 0;
				mainImg.y = 0;
				mainImg.width = 420;
				mainImg.height = 50;
				channer_img.addChild(channer_lab);
				mainImg.addChild(channer_img);
				mainImg.addChild(html);
				mainImg.addChild(clickbtn);
				var data = this.chatData[index].message;
				let times = 0;
				do {
					times = data.indexOf("#f6f6f4");
					data = data.replace("#f6f6f4", "#000000");
					data = data.replace("undefined", " ");
				} while (times != -1);
				let x;
				/** 是否是未定义的空字符串 */
				let isundefined = this.chatData[index].message.search("undefined");
				html.innerHTML = data;
				mainImg.height = (html.contextHeight);
				html.style.leading = 4;
				if (html.contextHeight == 24) {
					clickbtn.x = html.x + html.contextWidth + 2;
					clickbtn.y = html.y + 3;
				} else {/** 第二行 */
					html.width = 351;
					let x;
					if (isundefined != -1) {
						/** 换行后的实际宽度 */
						x = html._childs[1]._text.words[html._childs[1]._text.words.length - 1]._x + html._childs[1]._text.words[html._childs[1]._text.words.length - 1]._w;
					} else
						x = html._childs[2]._text.words[html._childs[2]._text.words.length - 1]._x + html._childs[2]._text.words[html._childs[2]._text.words.length - 1]._w;
					clickbtn.x = html.x + x + 2;
					clickbtn.y = html.y + (html.contextHeight / 2) + 3;
				}
				html.style.leading = 2;
				clickbtn.mouseEnabled = true;
				clickbtn.labelSize = 20;
				clickbtn.labelColors = "#008000";
				clickbtn.width = 72;
				clickbtn.height = 15;
				clickbtn.on(LEvent.MOUSE_DOWN, this, this.onEvent, [param]);
				switch (Number(this.chatData[index].messagetype)) {
					case ChannelType.CHANNEL_WORLD:
						channer_lab.text = "世界";
						channer_lab.color = "#00FF00";
						/** 设置位置 */
						if (ChatModel.getInstance().lastWorldImg == null) mainImg.y = 1;
						else mainImg.y = ChatModel.getInstance().lastWorldImg.y + ChatModel.getInstance().lastWorldImg.height + 7;
						/** 存储位置信息 */
						ChatModel.getInstance().lastWorldImg = mainImg;
						break;
					case ChannelType.CHANNEL_TEAM:
						channer_lab.text = "队伍";
						channer_lab.color = "#FFFFFF";
						if (ChatModel.getInstance().lastTeamImg == null) mainImg.y = 1;
						else mainImg.y = ChatModel.getInstance().lastTeamImg.y + ChatModel.getInstance().lastTeamImg.height + 7;
						ChatModel.getInstance().lastTeamImg = mainImg;
						break;
					case ChannelType.CHANNEL_CLAN:
						channer_lab.text = "帮派";
						channer_lab.color = "#FFFF00";
						if (ChatModel.getInstance().lastFamilyImg == null) mainImg.y = 1;
						else mainImg.y = ChatModel.getInstance().lastFamilyImg.y + ChatModel.getInstance().lastFamilyImg.height + 7;
						ChatModel.getInstance().lastFamilyImg = mainImg;
						break;
					default: break;
				}
				list.addChild(mainImg);
				this.scrollY = mainImg.y + mainImg.height;
				if (!this.flag) {
					list.vScrollBar.setScroll(0, this.scrollY, this.scrollY);
					list.scrollTo(null, this.scrollY);
				}
			}


		}
		/** 点击富文本显示该角色队伍信息 */
		private onRequestTeamInfo(teamid: number): void {
			RequesterProtocols._instance.c2s_COneKeyApplyTeamInfo(teamid);
			team.models.TeamProxy.getInstance().once(team.models.ONE_KEY_TEAMINFO, this, this.onShowTeamInfo);
		}
		/** 队伍情况界面 */
		private onShowTeamInfo(teaminfo: Laya.Dictionary): void {
			let _memberlist = teaminfo.get("memberlist");
			let TeamInfoMediator = new team.TeamInfoMediator(this._app);
			TeamInfoMediator.onshow(_memberlist);
		}

		/** 设置特殊按钮位置信息
		 * @param lastword 组装语句最后一个子节点长度-1
		 * @param apply_btn 组装语句按钮
		 * @param chatContent 组装语句富文本框
		 * @param speakForYourself 是否是自己发
		 */
		private setApplyBtnPos(lastword: number, apply_btn: Laya.Button, chatContent: Laya.HTMLDivElement, speakForYourself: boolean): void {
			chatContent
			apply_btn.x = chatContent.x + chatContent._childs[lastword]._text.words[chatContent._childs[lastword]._text.words.length - 1]._x + chatContent._childs[lastword]._text.words[chatContent._childs[lastword]._text.words.length - 1]._w;
			let contentwidth = chatContent._childs[lastword]._text.words[chatContent._childs[lastword]._text.words.length - 1]._x + chatContent._childs[lastword]._text.words[chatContent._childs[lastword]._text.words.length - 1]._w + apply_btn.width; //加入按钮后的实际宽度
			if (contentwidth > chatContent.contextWidth) {
				let hang = chatContent.contextHeight / 27; //行数行高27 = 字体大小24+行间距3
				/** 按钮宽110，超过一半就换行 */
				if (contentwidth - 55 <= chatContent.contextWidth) { /** 处理不换行 */
					let x = contentwidth - chatContent.contextWidth;
					let cha = Math.floor(x / hang);
					// chatContent.width = chatContent.width + cha;
					chatContent.contextWidth = chatContent.contextWidth + cha;
					if (speakForYourself)
						chatContent.x = chatContent.x - cha;
					// let xs = chatContent._childs[4]._text.words[chatContent._childs[4]._text.words.length - 1]._x + chatContent._childs[4]._text.words[chatContent._childs[4]._text.words.length - 1]._w;
					apply_btn.x = chatContent.x + chatContent._childs[lastword]._text.words[chatContent._childs[lastword]._text.words.length - 1]._x + chatContent._childs[lastword]._text.words[chatContent._childs[lastword]._text.words.length - 1]._w;
					apply_btn.y = chatContent.y + chatContent._childs[lastword]._text.words[chatContent._childs[lastword]._text.words.length - 1]._y;
				} else {/** 换行处理 */
					chatContent.contextHeight = chatContent.contextHeight + apply_btn.height + chatContent.style.leading;
					apply_btn.x = chatContent.x;
					apply_btn.y = chatContent.y + (chatContent.style.leading + 24) * hang;
				}
			} else {
				apply_btn.y = chatContent.y + chatContent._childs[lastword]._text.words[chatContent._childs[lastword]._text.words.length - 1]._y;
			}
		}

		/** 
		 * 申请组队事件
		 * @param leaderid 队长Id
		 */
		private onApplyTeam(leaderid: number): void {
			RequesterProtocols._instance.c2s_CRequestJoinTeam(leaderid);
		}
		/** 抢红包事件 */
		private onEvent(data: any): void {
			redPacket.models.RedPacketModel.getInstance().qiangRedPack(data[3], data[2]);
			ModuleManager.hide(ModuleNames.Chat);
		}

		/** 其他人点击的道具分享 */
		public otherOnItem(displayinfo: models.DisplayInfoVo, ItemName: string): void {
			// e.stopPropagation();
			if (displayinfo.displaytype == DisplayType.DISPLAY_ITEM) {/** 道具相关 */
				ItemName = ItemName.replace("[", "");
				ItemName = ItemName.replace("]", "");
				let itemID;
				let itemAttrData = BagModel.getInstance().itemAttrData;
				for (let itemId in itemAttrData) {
					if (itemAttrData[itemId].name == ItemName) {
						itemID = itemAttrData[itemId].id;
						break;
					}
				}
				if (itemID != 0) {
					ChatModel.getInstance().viewItemId = itemID;
				}
				RequesterProtocols._instance.c2s_CChatItemTips(displayinfo);
			} else if (displayinfo.displaytype == DisplayType.DISPLAY_PET) {/** 宠物相关 */
				RequesterProtocols._instance.c2s_get_petinfo(displayinfo.roleid, displayinfo.uniqid);
			} else if (displayinfo.displaytype == DisplayType.DISPLAY_TASK) {/** 任务相关 */
				RequesterProtocols._instance.c2s_CChatItemTips(displayinfo);
			}




		}



		/** 调色板组件 */
		private changeColor(): void {
			if (this._viewUI.tiaosePanel_img.visible == false) {
				this._viewUI.tiaosePanel_img.visible = true;
				this._viewUI.content_img.visible = false;
			}
			this._viewUI.resetColor_img.on(LEvent.MOUSE_DOWN, this, this.changeToColor, ["resert"]);
			this._viewUI.pink_img.on(LEvent.MOUSE_DOWN, this, this.changeToColor, ["pink"]);
			this._viewUI.darkBlue_img.on(LEvent.MOUSE_DOWN, this, this.changeToColor, ["blue"]);
			this._viewUI.green_img.on(LEvent.MOUSE_DOWN, this, this.changeToColor, ["green"]);
			this._viewUI.yellow_img.on(LEvent.MOUSE_DOWN, this, this.changeToColor, ["yellow"]);
			this._viewUI.red_img.on(LEvent.MOUSE_DOWN, this, this.changeToColor, ["red"]);


		}
		/** 文本框颜色调整
		 * @param color 颜色
		 */
		private changeToColor(color: string): void {
			switch (color) {
				case "resert":
					this.color = "#000000";
					break;
				case "pink":
					this.color = "#FFCCCC";
					break;
				case "blue":
					this.color = "#0000FF";
					break;
				case "green":
					this.color = "#00FF00";
					break;
				case "yellow":
					this.color = "#FFFF00";
					break;
				case "red":
					this.color = "#FF0000";
					break;
				default:
					break;
			}
			this.closeTiaoSe();

		}
		/** 根据物品的品质取得不同颜色
		 * @param quality 品质
		 */
		private judgeColor(quality: number): string {
			if (quality == 2) {
				return "#9F35FF";
			} else if (quality == 3) {
				return "#921AFF";
			} else if (quality == 4) {
				return "#EA0000";
			}

		}



		/** 开启表情 */
		private openFace(): void {
			if (this._viewUI.content_img.visible == false) {
				this._viewUI.content_img.visible = true;
				this._viewUI.tiaosePanel_img.visible = false;
			} else return;
			for (var i = 1; i <= 6; i++) {
				var btn: Button = this._viewUI.getChildByName("chat_img").getChildByName("content_img").getChildByName("facebox_box").getChildByName("facebtn" + [i] + "_btn") as Button;
				var name = "facebtn" + [i] + "_btn";
				btn.on(LEvent.MOUSE_UP, this, this.opFaceContent, [name]);
			}
			this.Face();

		}
		/** 聊天表情的初始化
		 * @param name 聊天表情模块名称
		 */
		private opFaceContent(name: string): void {
			for (var i = 1; i <= 6; i++) {
				var img: Laya.Image = this._viewUI.getChildByName("chat_img").getChildByName("content_img").getChildByName("facebox_box").getChildByName("facebtn" + [i] + "_btn").getChildByName("state" + [i] + "_img") as Laya.Image;
				img.visible = false;
			}

			switch (name) {
				case "facebtn1_btn": //表情 
					this.Face();
					break;
				case "facebtn2_btn": //常用语
					this._viewUI.state2_img.visible = true
					this._viewUI.contentlist1_list.visible = true;
					this._viewUI.contentlist2_list.visible = false;
					this._viewUI.contentlist3_list.visible = false;
					this._viewUI.contentlist4_list.visible = false;
					this._viewUI.contentlist5_list.visible = false;
					this._viewUI.face_list.visible = false;
					this.CommonLanguage();
					break;
				case "facebtn3_btn":  //任务
					this._viewUI.state3_img.visible = true
					this._viewUI.contentlist1_list.visible = false;
					this._viewUI.contentlist2_list.visible = true;
					this._viewUI.contentlist3_list.visible = false;
					this._viewUI.contentlist4_list.visible = false;
					this._viewUI.contentlist5_list.visible = false;
					this._viewUI.face_list.visible = false;
					this.Task();
					break;
				case "facebtn4_btn":   //历史输入
					this._viewUI.state4_img.visible = true
					this._viewUI.contentlist1_list.visible = false;
					this._viewUI.contentlist2_list.visible = false;
					this._viewUI.contentlist3_list.visible = true;
					this._viewUI.contentlist4_list.visible = false;
					this._viewUI.contentlist5_list.visible = false;
					this._viewUI.face_list.visible = false;
					this.HistoryInput();
					break;
				case "facebtn5_btn":   // 物品分享
					this._viewUI.state5_img.visible = true
					this._viewUI.contentlist1_list.visible = false;
					this._viewUI.contentlist2_list.visible = false;
					this._viewUI.contentlist3_list.visible = false;
					this._viewUI.contentlist4_list.visible = true;
					this._viewUI.contentlist5_list.visible = false;
					this._viewUI.face_list.visible = false;
					this.Item();
					break;
				case "facebtn6_btn":  //宠物分享
					this._viewUI.state6_img.visible = true
					this._viewUI.contentlist1_list.visible = false;
					this._viewUI.contentlist2_list.visible = false;
					this._viewUI.contentlist3_list.visible = false;
					this._viewUI.contentlist4_list.visible = false;
					this._viewUI.contentlist5_list.visible = true;
					this._viewUI.face_list.visible = false;
					this.Pet();


					break;

				default:
					break;
			}

		}
		/** 
		 * 计算页数
		 * @param pageNum 每页显示的数量  @param 数据源长度 @param ratio 滚动条比例 @param reCalucate 重新计算规则
		 */
		private calculationNumPage(pageNum: number, length: number, ratio: number = 0, reCalucate: boolean = true): void {
			/** 总页码 */
			let totalPage = Math.ceil(length / pageNum);
			/** 总共5个小球 */
			let allBall = 5;
			if (reCalucate) {
				for (let pageIndex = 1; pageIndex <= allBall; pageIndex++) {/** 先隐藏所有 */
					let indexBall: Laya.Image = this._viewUI.content_img.getChildByName("darkball" + pageIndex + "_img") as Laya.Image;
					indexBall.visible = false;
				}
				for (let nowpage = 1; nowpage <= totalPage; nowpage++) {/** 显示 */
					let nowBall: Laya.Image = this._viewUI.content_img.getChildByName("darkball" + nowpage + "_img") as Laya.Image;
					let greenBall = nowBall.getChildByName("greenball" + nowpage + "_img") as Laya.Image;
					if (nowBall) {
						nowBall.visible = true;
						//除第一个其他隐藏
						if (nowpage == 1) greenBall.visible = true;
						else greenBall.visible = false;
					}
				}
			}
			if (ratio && ratio != 0) {
				let ball = Math.ceil(totalPage * ratio);
				for (var index = 1; index <= totalPage; index++) {
					let allball: Laya.Image = this._viewUI.content_img.getChildByName("darkball" + index + "_img").getChildByName("greenball" + index + "_img") as Laya.Image;
					if (allball) allball.visible = false;
				}
				if (ball <= 0) ball = 1;
				if (ball > totalPage) ball = totalPage;
				let nowball: Laya.Image = this._viewUI.content_img.getChildByName("darkball" + ball + "_img").getChildByName("greenball" + ball + "_img") as Laya.Image;
				if (nowball) nowball.visible = true;

			}

		}
		/** 
		 * 滑动到指定页码
		 * @param viewNum 单页的数量 @param datasourceLength 数据源长度 @param list 指定ui
		 */
		private countCurrentPage(viewNum: number, datasourceLength: number, list: Laya.List): void {
			let val = list.scrollBar.value;
			let max = list.scrollBar.max;
			let ratio = max == 0 ? 0 : val / max;
			/** 首先计算页数 */
			this.calculationNumPage(viewNum, datasourceLength, ratio, false)

		}
		/** 表情界面 */
		private Face(): void {
			/** 首先计算页数 */
			this.calculationNumPage(35, this.faceList.length, 0, true);
			this._viewUI.state1_img.visible = true
			this._viewUI.contentlist1_list.visible = false;
			this._viewUI.contentlist2_list.visible = false;
			this._viewUI.contentlist3_list.visible = false;
			this._viewUI.contentlist4_list.visible = false;
			this._viewUI.contentlist5_list.visible = false;
			this._viewUI.face_list.visible = true;
			var face: number = 0;
			this._viewUI.face_list.hScrollBarSkin = "";
			if (this.faceList.length <= 7) {
				this._viewUI.face_list.repeatX = this.faceList.length;
				this._viewUI.face_list.repeatY = 1;
			} else {
				this._viewUI.face_list.repeatX = this.faceList.length;
				this._viewUI.face_list.repeatY = 5;
			}
			this._viewUI.face_list.array = this.faceList;
			this._viewUI.face_list.spaceX = 22;
			this._viewUI.face_list.scrollBar.elasticBackTime = 200;
			this._viewUI.face_list.scrollBar.elasticDistance = 100;
			this._viewUI.face_list.scrollBar.changeHandler = new Laya.Handler(this, this.countCurrentPage, [35, this.faceList.length, this._viewUI.face_list]) //on(LEvent.BLUR, this, this.countCurrentPage, [35, this.faceList.length, this._viewUI.face_list]);
			this._viewUI.face_list.on(LEvent.MOUSE_WHEEL, this, this.countCurrentPage, [35, this.faceList.length, this._viewUI.face_list]);
			this._viewUI.face_list.renderHandler = new Handler(this, this.onContentListRender, [face]);

		}

		/** 常用语 */
		private CommonLanguage(): void {
			/** 首先计算页数 */
			this.calculationNumPage(8, this.quickChat.length, 0, true);
			var commonLanageArg: number = 1;
			this._viewUI.contentlist1_list.hScrollBarSkin = "";
			this._viewUI.contentlist1_list.repeatX = this.quickChat.length;
			this._viewUI.contentlist1_list.array = this.quickChat;
			this._viewUI.contentlist1_list.scrollBar.elasticBackTime = 200;
			this._viewUI.contentlist1_list.scrollBar.elasticDistance = 100;
			this._viewUI.contentlist1_list.scrollBar.changeHandler = new Handler(this, this.countCurrentPage, [8, this.quickChat.length, this._viewUI.contentlist1_list]);
			this._viewUI.contentlist1_list.renderHandler = new Handler(this, this.onContentListRender, [commonLanageArg], false);
			this._viewUI.contentlist1_list.on(LEvent.MOUSE_WHEEL, this, this.countCurrentPage, [8, this.quickChat.length, this._viewUI.contentlist1_list]);
		}
		/** 任务 */
		private Task(): void {

			var taskArg: number = 2;
			this._viewUI.contentlist2_list.hScrollBarSkin = "";
			let accepttask = Taskmodels.getInstance().accepttask;
			let schooltask = Taskmodels.getInstance().schooltask;
			let maintask = Taskmodels.getInstance().maintask;
			/** 每次点击清空数据 */
			this.task = [];
			for (let accepttaskIndex = 0; accepttaskIndex < accepttask.keys.length; accepttaskIndex++) {/** 存推荐任务的 key 任务iD */
				this.task.push(accepttask.keys[accepttaskIndex]);
			}
			for (let schooltaskIndex = 0; schooltaskIndex < schooltask.keys.length; schooltaskIndex++) {/** 存师门任务的 value 任务iD */

				this.task.push(Taskmodels.getInstance().schooltask.keys[schooltaskIndex]);
			}
			for (let maintaskIndex = 0; maintaskIndex < maintask.keys.length; maintaskIndex++) {/** 存主任务的 key 任务iD */
				this.task.push(maintask.keys[maintaskIndex]);
			}
			/** 首先计算页数 */
			this.calculationNumPage(8, this.task.length, 0, true);
			this._viewUI.contentlist2_list.repeatX = this.task.length;
			this._viewUI.contentlist2_list.array = this.task;
			this._viewUI.contentlist2_list.scrollBar.elasticBackTime = 200;
			this._viewUI.contentlist2_list.scrollBar.elasticDistance = 100;
			this._viewUI.contentlist2_list.scrollBar.changeHandler = new Laya.Handler(this, this.countCurrentPage, [8, this.task.length, this._viewUI.contentlist2_list]);
			this._viewUI.contentlist2_list.on(LEvent.MOUSE_WHEEL, this, this.countCurrentPage, [8, this.task.length, this._viewUI.contentlist2_list]);
			this._viewUI.contentlist2_list.renderHandler = new Handler(this, this.onContentListRender, [taskArg]);
		}
		/** 宠物 */
		private Pet(): void {
			let petKeys = PetModel.getInstance().pets.keys;
			if (petKeys.length <= 0) {
				this._viewUI.contentlist5_list.visible = false;
				return;
			} else {
				this.petLits = [];
				for (let petKey = 0; petKey < petKeys.length; petKey++) {
					this.petLits.push(PetModel.getInstance().pets.get(petKeys[petKey]));
				}

			}
			var petArg: number = 5;
			this._viewUI.contentlist5_list.hScrollBarSkin = "";
			/** 首先计算页数 */
			this.calculationNumPage(4, this.petLits.length, 0, true);
			if (this.petLits.length <= 2) {
				this._viewUI.contentlist5_list.repeatX = this.petLits.length;
				this._viewUI.contentlist5_list.repeatY = 1;
			} else {
				this._viewUI.contentlist5_list.repeatX = this.petLits.length;
				this._viewUI.contentlist5_list.repeatY = 2;
			}
			this._viewUI.contentlist5_list.array = this.petLits;
			this._viewUI.contentlist5_list.scrollBar.elasticBackTime = 200;
			this._viewUI.contentlist5_list.scrollBar.elasticDistance = 10;
			this._viewUI.contentlist5_list.scrollBar.changeHandler = new Laya.Handler(this, this.countCurrentPage, [4, this.petLits.length, this._viewUI.contentlist5_list]);
			this._viewUI.contentlist5_list.on(LEvent.MOUSE_WHEEL, this, this.countCurrentPage, [4, this.petLits.length, this._viewUI.contentlist5_list]);
			this._viewUI.contentlist5_list.renderHandler = new Handler(this, this.onContentListRender, [petArg]);
		}
		/** 背包道具 */
		private Item(): void {
			this.itemList = bagModel.getInstance().getBagGameItemData(BagTypes.BAG).items;
			if (this.itemList.length <= 0) {
				this._viewUI.contentlist4_list.visible = false;
				return;
			}
			var itemArg: number = 4;
			/** 首先计算页数 */
			this.calculationNumPage(24, this.itemList.length, 0, true);
			this._viewUI.contentlist4_list.hScrollBarSkin = "";
			if (this.itemList.length <= 6) {
				this._viewUI.contentlist4_list.repeatX = this.itemList.length;
				this._viewUI.contentlist4_list.repeatY = 1;
			} else {
				this._viewUI.contentlist4_list.repeatX = this.itemList.length;
				this._viewUI.contentlist4_list.repeatY = 4;
			}
			this._viewUI.contentlist4_list.array = this.itemList;
			this._viewUI.contentlist4_list.scrollBar.elasticBackTime = 200;
			this._viewUI.contentlist4_list.scrollBar.elasticDistance = 10;
			this._viewUI.contentlist4_list.scrollBar.changeHandler = new Laya.Handler(this, this.countCurrentPage, [24, this.itemList.length, this._viewUI.contentlist4_list]);
			this._viewUI.contentlist4_list.on(LEvent.MOUSE_WHEEL, this, this.countCurrentPage, [24, this.itemList.length, this._viewUI.contentlist4_list]);
			this._viewUI.contentlist4_list.renderHandler = new Handler(this, this.onContentListRender, [itemArg]);
		}
		/** 历时输入 */
		private HistoryInput(): void {
			var historyInputArg: number = 3;
			this._viewUI.contentlist3_list.hScrollBarSkin = "";
			if (this.historyInput != null) {
				this._viewUI.contentlist3_list.repeatX = this.historyInput.length;
				this._viewUI.contentlist3_list.array = this.historyInput;
			} else {
				this._viewUI.contentlist3_list.repeatX = this.nohistory.length;
				this._viewUI.contentlist3_list.array = this.nohistory;
			}
			/** 首先计算页数 */
			this.calculationNumPage(8, this.historyInput.length, 0, true);
			this._viewUI.contentlist3_list.scrollBar.elasticBackTime = 200;
			this._viewUI.contentlist3_list.scrollBar.elasticDistance = 100;
			this._viewUI.contentlist3_list.scrollBar.changeHandler = new Laya.Handler(this, this.countCurrentPage, [8, this.historyInput.length, this._viewUI.contentlist3_list]);
			this._viewUI.contentlist3_list.on(LEvent.MOUSE_WHEEL, this, this.countCurrentPage, [8, this.historyInput.length, this._viewUI.contentlist3_list]);
			this._viewUI.contentlist3_list.renderHandler = new Handler(this, this.onContentListRender, [historyInputArg]);
		}
		/** 频道颜色 */
		private changeChannelAndColor(channelLab: Label): void {
			switch (this.channel) {
				case this.channelType.CHANNEL_WORLD:
					channelLab.text = "世界";
					channelLab.color = "#00FF00";
					break;
				case this.channelType.CHANNEL_CURRENT:
					channelLab.text = "当前";
					channelLab.color = "#FFFFFF";
					break;
				case this.channelType.CHANNEL_PROFESSION:
					channelLab.text = "职业";
					channelLab.color = "#87CEFA";
					break;
				case this.channelType.CHANNEL_CLAN:
					channelLab.text = "工会";
					channelLab.color = "#FFFF00";
					break;
				case this.channelType.CHANNEL_TEAM:
					channelLab.text = "队伍";
					channelLab.color = "#FFFFFF";
					break;
				case this.channelType.CHANNEL_TEAM_APPLY:
					channelLab.text = "组队";
					channelLab.color = "#ffffff";
					break;

				default:
					break;
			}

		}


		/** 聊天表情渲染
		 * @param 模块下标
		 */
		private onContentListRender(arg: number, cell: Box, index: number): void {
			switch (arg) {
				case 0:
					// console.trace("聊天表情渲染index----"+index);
					var img: Laya.Image = cell.getChildByName("faceimg_img") as Laya.Image;
					img.skin = this.faceList[index].url;
					img.on(Laya.Event.CLICK, this, this.onFaceClick, ["@" + index + "@"]);
					break;
				case 1:
					var contentbox1_lab: Label = cell.getChildByName("contentbox1_img").getChildByName("contentbox1_lab") as Label;
					contentbox1_lab.text = this.quickChat[index];
					contentbox1_lab.on(LEvent.CLICK, this, this.getCommonInput, [contentbox1_lab.text])

					break;
				case 2: /** 任务点击 */
					var contentbox2_lab: Label = cell.getChildByName("contentbox2_img").getChildByName("contentbox2_lab") as Label;
					let taskType;
					if (this.task[index] >= 1010000 && this.task[index] <= 2000000) {/** 师门任务 */
						// let info:CRepeatTaskBaseVo = game.modules.task.models.TaskModel.getInstance().cRepeatTaskData[this.task[index]];
						let info: game.modules.task.models.SRefreshSpecialQuestVo = Taskmodels.getInstance().schooltask.get(this.task[index]);
						let schoolinfo: CRepeatTaskBaseVo = Taskmodels.getInstance().cRepeatTaskData[info.questtype];
						let titleinfo: string = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(schoolinfo.strtasktitletrack, info.round, 2);
						let allcount: CSchoolTaskBaseVo = game.modules.task.models.TaskModel.getInstance().cSchoolTaskData[schoolinfo.nacceptchatid];
						if (allcount) {
							titleinfo = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(titleinfo, allcount.maxnum, 7)
							contentbox2_lab.text = titleinfo;
						}
						taskType = 2;
					} else {
						let info: MissionCMainMissionInfoBaseVo = game.modules.task.models.TaskModel.getInstance().missionCMainMissionInfoData[this.task[index]]
						contentbox2_lab.text = info.MissionName;
						taskType = 1;
					}
					contentbox2_lab.on(LEvent.MOUSE_DOWN, this, this.onTask, [index, contentbox2_lab.text, taskType, this.task[index]]);


					break;
				case 3://历史输入
					var contentbox3_lab: Label = cell.getChildByName("contentbox3_img").getChildByName("contentbox3_lab") as Label;
					if (this.historyInput != null) {
						contentbox3_lab.text = this.historyInput[index].context;
						contentbox3_lab.on(LEvent.CLICK, this, this.getHistoryInput, [contentbox3_lab.text]);
					} else
						contentbox3_lab.text = this.nohistory[index].context;
					break;
				case 4://物品渲染
					if (index > this.itemList.length) return;
					let id = this.itemList[index].id;
					let itemDatas = BagModel.getInstance().getItemAttrData(id);
					let itemName = itemDatas.name;
					let gameItemBgImg: Laya.Image = cell.getChildByName("gameItemBg_img") as Laya.Image;
					let gameItemImg: Laya.Image = cell.getChildByName("gameItem_Img") as Laya.Image;
					let gameItemNumberLabel: Laya.Label = cell.getChildByName("gameItemNumber_lab") as Laya.Label;
					if (itemDatas != null) {
						let str: string = this.itemList[index].number > 1 ? this.itemList[index].number.toString() : "";
						gameItemNumberLabel.visible = true;
						gameItemBgImg.skin = game.modules.bag.BagSystemModule.getGameItemFrameColorResource(itemDatas.nquality);
						gameItemImg.skin = "common/icon/item/" + itemDatas.icon + ".png";
						gameItemNumberLabel.changeText(str);
						let type = 1;
						let shopId = 0;
						// let displayInfo :models.DisplayInfoVo;
						/** 道具分享发送 */
						gameItemBgImg.on(LEvent.MOUSE_UP, this, this.onItem, [itemName, this.itemList[index].key, type, shopId, id])//[0,"","",displayInfo,0,0]
					} else {
						gameItemBgImg.skin = "";
						gameItemImg.skin = "";
						gameItemNumberLabel.visible = false;
					}
					break;
				case 5://宠物数据
					if (index > this.petLits.length) return;
					let petAttr = PetModel.getInstance().petCPetAttrData;
					let shapeId = LoginModel.getInstance().cnpcShapeInfo;
					let petName: Laya.Label = cell.getChildByName("contentbox3_img").getChildByName("petName_lab") as Laya.Label;
					let petlevel: Laya.Label = cell.getChildByName("contentbox3_img").getChildByName("petLevel_lab") as Laya.Label;
					let petScore: Laya.Label = cell.getChildByName("contentbox3_img").getChildByName("petScore_lab") as Laya.Label;
					let petIcon: Laya.Image = cell.getChildByName("contentbox3_img").getChildByName("petBg_img").getChildByName("pet_img") as Laya.Image;
					let petQuality: Laya.Image = cell.getChildByName("contentbox3_img").getChildByName("petBg_img") as Laya.Image;
					let petId = this.petLits[index].id;
					petName.color = petAttr[petId].colour;
					let Quality = petAttr[petId].quality;
					let modelid = petAttr[petId].modelid;
					petName.text = this.petLits[index].name;
					petlevel.text = this.petLits[index].level;
					petScore.text = this.petLits[index].petscore;
					let littleShapeId = LoginModel.getInstance().cnpcShapeInfo[modelid];
					petIcon.skin = "common/icon/avatarpet/" + littleShapeId.littleheadID + ".png";
					petQuality.skin = game.modules.bag.BagSystemModule.getGameItemFrameColorResource(Quality);
					let type = 2;
					petIcon.on(LEvent.MOUSE_DOWN, this, this.onItem, [this.petLits[index].name, this.petLits[index].key, type, petId])

					break;

				default:
					break;
			}

		}
		/** 点击物品
		 * @param ItemName 物品名称
		 * @param key 物品的Key
		 * @param type 类型
		 * @param petId 宠物ID
		 */
		private onItem(ItemName: string, key: number, type: number, petId, itemId: number = 0): void {
			let shareItem = "[" + ItemName + "]";
			this._viewUI.input_txtinput.text = shareItem;
			if (itemId != 0 && type == 1) //道具
			{
				this.color = BagModel.getInstance().itemAttrData[itemId].colour
			} else if (type == 2) //宠物
			{
				let sss = PetModel.getInstance().petCPetAttrData
				this.color = "#" + PetModel.getInstance().petCPetAttrData[petId].colour;
			}
			this.shareItem = shareItem;
			let disPlayInfo: models.DisplayInfoVo;
			disPlayInfo = new models.DisplayInfoVo();
			disPlayInfo.displaytype = type;
			disPlayInfo.roleid = this._loginModel.roleDetail.roleid;
			disPlayInfo.shopid = petId;
			disPlayInfo.counterid = 1;
			disPlayInfo.uniqid = key;
			disPlayInfo.teamid = 0;
			disPlayInfo.crosstt = 0;
			disPlayInfo.serverid = 0;
			this.displayInfo = [];
			this.displayInfo.push(disPlayInfo);
			if (type == 1)
				RequesterProtocols._instance.c2s_CChatItemTips(disPlayInfo);

		}
		/** 表情点击 */
		private onFaceClick(str: string): void {
			this.closeFace();
			this._viewUI.input_txtinput.text += str;
		}
		/** 点击任务栏
		 * @param index 下标
		 * @param taskTitle 任务名称
		 * @param tasktype 任务类型
		 * @param taskid 任务Id
		 */
		private onTask(index: number, taskTitle: string, tasktype: number, taskid: number): void {
			let format = "#000000*split";
			this.historyMsg = taskTitle;
			taskTitle = format + "[" + taskTitle + "]";
			let disPlayInfo: models.DisplayInfoVo;
			disPlayInfo = new models.DisplayInfoVo();
			disPlayInfo.displaytype = DisplayType.DISPLAY_TASK;
			disPlayInfo.roleid = this._loginModel.roleDetail.roleid;
			disPlayInfo.shopid = tasktype;
			disPlayInfo.counterid = 1;
			disPlayInfo.uniqid = taskid;
			disPlayInfo.teamid = 0;/** 任务类型为师门时，这里 */
			disPlayInfo.crosstt = 0;
			disPlayInfo.serverid = 0;
			this.displayInfo = [];
			this.displayInfo.push(disPlayInfo);

			this.sendMsg(this.channel, taskTitle, taskTitle, this.displayInfo, 0, 0);
			this._viewUI.content_img.visible = false;
		}
		/** 获取历史输入数据
		 * @param historyInput 输入字符串
		 */
		private getHistoryInput(historyInput: string): void {
			this._viewUI.input_txtinput.text = historyInput;
			this.closeFace();
		}
		/** 获取常用聊天数据
		 * @param commonInput 输入字符串
		 */
		private getCommonInput(commonInput: string): void {
			this._viewUI.input_txtinput.text = commonInput;
			this.closeFace();
		}
		/** 关闭调色组件 */
		private closeTiaoSe(): void {
			this._viewUI.tiaosePanel_img.visible = false;

		}
		/** 关闭表情 */
		private closeFace(): void {
			this._viewUI.content_img.visible = false;
			for (var i = 1; i <= 6; i++) {
				var img: Laya.Image = this._viewUI.getChildByName("chat_img").getChildByName("content_img").getChildByName("facebox_box").getChildByName("facebtn" + [i] + "_btn").getChildByName("state" + [i] + "_img") as Laya.Image;
				img.visible = false;
			}

		}
		public hide(): void {
			super.hide();
			/** 移除侦听 */
			chat.models.ChatProxy.getInstance().off(chat.models.SHOW_ITEM_TIPS, this, this._ShowTips);
			chat.models.ChatProxy.getInstance().off(chat.models.VIWE_OTHER_ITEM, this, this._ViewOtherItem);
			// chat.models.ChatProxy.getInstance().off(chat.models.VIWE_SHARE_TASK,this,this._ViewShareTask);
			pet.models.PetProxy.getInstance().off(pet.models.GETPETINFO, this, this.OpPetInfo);
			chat.models.ChatProxy.getInstance().event(chat.models.CLOSE_MAINHUD_PET_LISTEN);
			if (LoginModel.getInstance().CommonPage == "keju") {
				LoginModel.getInstance().CommonPage = "";
				let KejuModule = game.modules.keju.KejuModule.getInstance(this._app);
				KejuModule.show();
			}


		}

		public getView(): Sprite {
			return this._viewUI;
		}
	}
}