/**
* name 
*/
module game.modules.mainhud {
	/** 最高等级 99*/
	export const LEVEL_MAX: number = 99;
	export class MainHudModule extends game.modules.ModuleMediator {
		private _viewUI: ui.common.MainHudUI;
		private chatData: Array<any> = [];
		private sysData: any;
		private chatContentHeight: number = 10;
		// private msgType: number;
		/** 队伍数据 */
		private teamInfo: any;
		/** 初始化主界面flag */
		private initFlag: boolean = false;
		/** 造型配置信息 */
		private shapeInfo: Array<any> = [];
		private _smallmapUI: game.modules.mapworld.SmallMapMediator;
		private _remindViewMediator: game.modules.commonUI.RemindViewMediator;
		private _TeamOrganizeMediator: TeamOrganizeMediator;
		private _TempBagMediator: game.modules.bag.TempBagMediator;
		private _taskUI: game.modules.task.TaskModule;
		private disappearMessageTipsMediator: game.modules.commonUI.DisappearMessageTipsMediator;
		private _TeamViewLeaderMediators: TeamViewLeaderMediators;
		/**s升级经验限制表 */
		private expObj: Object;
		private _TeamViewMainMediators: TeamViewMainMediators;
		private _TeamViewMyselfMediators: TeamViewMyselfMediators;
		public dialog: game.modules.commonUI.JuQingMediator;
		public npcui: game.modules.commonUI.NpcDialogMediator;
		public UseItem: game.modules.commonUI.UseToRemindCardMediator;
		public makepro: game.modules.commonUI.MakeProgressMediator;
		private tips: game.modules.commonUI.DisappearMessageTipsMediator;
		private ChatViewMediator: game.modules.chat.ChatViewMediator;
		private PetXiangQingMediator: game.modules.pet.PetXiangQingMediator;
		private _tipsModule: game.modules.tips.tipsModule;
		private _selectChannelMediator: game.modules.chat.SelectChannelMediator;
		private autobatt: game.modules.autohangup.AutoHangUpModuls
		private _ContactCharacterMediator: game.modules.friend.ContactCharacterMediator;
		private changjingchange: game.modules.commonUI.ChangJingChangeMediator
		/**镶嵌 */
		private _StrengTheningInsertViewMediator: game.modules.strengThening.StrengTheningInsertViewMediator;
		/**帮派 */
		public FamilyMemberViewMediator: game.modules.family.FamilyMemberViewMediator;
		public XianHui3V3Module: game.modules.xianhui.XianHui3V3Module;
		public XianHui5V5Mediator: game.modules.xianhui.XianHui5V5Mediator;


		/**动画 */
		private ani: Laya.Animation;
		/**手指图标 */
		private dianImg: Laya.Image;
		/**当前引导编号 */
		private yindaoId: number;
		/**锚点 */
		private px;
		private py;

		/**所有任务的索引对应的任务ID */
		private alltasklist: Array<number> = [];
		public tjxlpos: number = -1
		public htmltest: Array<string> = [];
		public lastbtn: Button;
		public lastImg: Laya.Image;
		public tasklistkey: Array<number> = [];
		/**第一条主线任务id */
		private maintaskArr: Array<any>;

		public _TipsMessageMediator: game.modules.tips.TipsMessageMediator;
		//** 飘窗时间间隔 */
		public timeNum: number;
		/**第一任务ID*/
		public firsttaskid: number = 0;
		public lastimer: string//倒计时时间文本
		/** 特殊副本结算（摇骰子）界面 */
		public jieSuanMediator: game.modules.commonUI.ZhanDouJieSuanMediator;
		/** 共有物品摇骰编号 */
		public dataNum: number;
		constructor(app: AppBase) {
			super();
			this.uiLayer = app.uiRoot.HUD;
			this._viewUI = new ui.common.MainHudUI();
			this._viewUI.mouseThrough = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			models.HudModel.getInstance().useUI = this._viewUI;
			this.c2sGetItemTips();
			/** 初始化配置表 */
			this.initConfig();
			/**  打开宠物信息界面监听*/
			// this.openPetInfoListener();
			//显示主界面
			//Laya.stage.on(LEvent.RESIZE, this, this.onResize);
			this._ContactCharacterMediator = new game.modules.friend.ContactCharacterMediator(this._viewUI, app);
			var _loginModel = game.modules.createrole.models.LoginModel.getInstance();//人物信息
			this._remindViewMediator = new game.modules.commonUI.RemindViewMediator(app.uiRoot.general, app);
			this.dialog = new game.modules.commonUI.JuQingMediator(this._app);
			this.changjingchange = new game.modules.commonUI.ChangJingChangeMediator(this._app)
			this.UseItem = new game.modules.commonUI.UseToRemindCardMediator(this._app);
			this.makepro = new game.modules.commonUI.MakeProgressMediator(this._app)
			this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
			this.disappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
			this.ChatViewMediator = new game.modules.chat.ChatViewMediator(this._app);
			HudModel.getInstance().autobatt = new game.modules.autohangup.AutoHangUpModuls(this._app)
			this._StrengTheningInsertViewMediator = new game.modules.strengThening.StrengTheningInsertViewMediator(this._viewUI, this._app);


			RequesterProtocols._instance.c2s_CGetPetEquipInfo()
			//var _roleLevel:string = _roleinfo.roleDetail.level.toString;
			//顶部区域
			//网络监听
			// Network._instance.addHanlder(ProtocolsEnum.STransChatMessage2Client, this, this.onRefreshChatData);
			Network._instance.addHanlder(ProtocolsEnum.STransChatMessageNotify2Client, this, this.onRefreshSystemData);

			this.expObj = game.modules.roleinfo.models.RoleInfoModel.getInstance().CResMoneyConfigBinDic;

			this.initialize();
			//服务器等级
			this.initServerLevel();
			//人物信息
			this.initRoleData();
			//宠物信息
			this.initPetData();
			//按钮初始化
			this.initBtn();
			//按钮监听
			this.registerEvent();
			//任务列表
			this._viewUI.middleBox.mouseThrough = true;
			//刷新当前时间
			this.getNowTime();
			Laya.timer.loop(20000, this, this.getNowTime);
			//任务列表
			this.onRefreshTaskList();
			/** 商品限购加载 */
			this.getShopArr();
			/** 活动推送状态初始化 */
			game.modules.activity.models.ActivityModel.getInstance().setTuiSongState();
			Laya.timer.loop(1000, this, this.actLoop);
			//** 活动推送监听 */
			// game.modules.createrole.models.LoginProxy.getInstance().on(game.modules.createrole.models.SHOW_MAIN, this, this.tuiSongOn);
			game.modules.activity.models.ActivityProxy._instance.on(game.modules.activity.models.TUISONG_EVENT, this, this.tuiSongOn);
			this.tuiSongOn();
			//** 飘窗监听 */
			this.timeNum = 0;
			Laya.timer.loop(10000, this, this.clearTimeNum);
			game.modules.chat.models.ChatProxy.getInstance().on(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, this, this.regestEvent);
			/** 特殊副本结算奖励监听 */
			game.modules.team.models.TeamProxy.getInstance().on(game.modules.team.models.TEAM_ROLL_MELON, this, this.teamRollMelon);
			/** npc对话Tips弹窗提示监听 */
			game.modules.chat.models.ChatProxy.getInstance().on(game.modules.chat.models.SHOW_TIPS_MESSAGE, this, this.showNpcTips);
			/** 本地系统消息加载 */
			game.modules.friend.models.FriendModel.getInstance().setSystemMessageRecord();
			//队伍列表
			this._viewUI.mainTeamList.vScrollBarSkin = "";
			this._viewUI.mainTeamList.scrollBar.elasticDistance = 10;
			this._viewUI.mainTeamList.scrollBar.elasticBackTime = 200;
			this._viewUI.mainTeamList.selectEnable = true;

			var teamArr: Array<any> = [];
			for (var i: number = 0; i < 3; i++) {
				teamArr.push({ roleLevel: "9" + i, roleName: "万金贵" });
			}
			this._viewUI.mainTeamList.array = teamArr;
			this._viewUI.mainTeamList.selectHandler = new Laya.Handler(this, this.onTeamSelect);

			/** 停止移动取消特效 */
			game.scene.models.SceneProxy.getInstance().on(game.scene.models.MOVE_STOP, this, this.movestop)
			//队伍列表

			//聊天数据
			// this.onGetChatData();

			if (this.chatData == null) {
				this._viewUI.chatList_panel.visible = false;
			}
			//console.log("this.chatData...........", this.chatData);
			this.initQianghuaData();
			this.initFamilyData();
			this._viewUI.xianhui_btn.visible = false;
			this._viewUI.xianhui_lab.visible = false;
			if (1784 <= HudModel.getInstance().sceneid && HudModel.getInstance().sceneid <= 1786) {
				var _teaminfo = modules.team.models.TeamModel.getInstance().teamMemberBasic.values;
				let roleDetail = game.modules.createrole.models.LoginModel.getInstance().roleDetail;
				if (_teaminfo.length > 0 && _teaminfo[0].roleid != roleDetail.roleid) return;
				this._viewUI.xianhui_btn.visible = true;
				this._viewUI.xianhui_lab.visible = true;
				this._viewUI.xianhui_lab.text = "叁对叁证道战";
			} else if (1787 <= HudModel.getInstance().sceneid && HudModel.getInstance().sceneid <= 1798) {
				var _teaminfo = modules.team.models.TeamModel.getInstance().teamMemberBasic.values;
				let roleDetail = game.modules.createrole.models.LoginModel.getInstance().roleDetail;
				if (_teaminfo.length > 0 && _teaminfo[0].roleid != roleDetail.roleid) return;
				this._viewUI.xianhui_btn.visible = true;
				this._viewUI.xianhui_lab.visible = true;
				this._viewUI.xianhui_lab.text = "伍对伍证道战";
			}
		}
		/** 主界面单例 */
		public static _instance: MainHudModule;
		public static getInstance(app: AppBase): MainHudModule {
			if (!this._instance) {
				this._instance = new MainHudModule(app);
			}
			return this._instance;
		}
		get view(): ui.common.MainHudUI {
			return this._viewUI;
		}
		/**停止移动 */
		public movestop() {
			// if (AutoHangUpModels.getInstance().isstar != 1 && (this._app.sceneObjectMgr.mainUnit.xunluo != 3 || this._app.sceneObjectMgr.mainUnit.autowalk == 3)) 
			if ((AutoHangUpModels.getInstance().isstar != 1 && this._app.sceneObjectMgr.mainUnit.xunluo != 3) || this._app.sceneObjectMgr.mainUnit.autowalk == 3) {
				this._app.sceneObjectMgr.mainUnit.stopwalk = 1
			}
			this._app.sceneObjectMgr.mainUnit.autowalk = 0
		}
		/**初始化 */
		public initialize(): void {
			this.ani = new Laya.Animation();
			this.dianImg = new Laya.Image();
			this.maintaskArr = [180101, 180201, 180301, 180401, 180501, 180601, 180701, 180801, 180901];
		}
		/** 显示属性变化的提示飘窗
		 * @param diff 差值
		 * @param flag true:增加，false:减少
		 * @param shuxingType 属性类型
		 */
		private onShowChangeDifferenceTips(diff: number, flag: boolean, shuxingType: number): void {
			let time = this.timeNum * 500;
			this.timeNum += 1;
			let disTips = new commonUI.DisappearMessageTipsMediator(this._app);
			Laya.timer.once(time, this, () => {
				disTips.onLoadRolePropertyChangeEffect(diff, flag, shuxingType);
			})
		}
		/** 监听各类窗口 */
		private initListenerEvent(): void {
			game.modules.team.models.TeamProxy.getInstance().on(team.models.IS_ACCEPT_INVITE, this, this._ShowConfirmWindow);
			//刷新经验
			models.HudProxy.getInstance().on(models.SRefreshUserExp_EVENT, this, this.onRefreshUserExp);
			//经验提示
			models.HudProxy.getInstance().on(models.SExpMessageTips_EVENT, this, this.onExpMessageTips);
			//显示属性变化的提示飘窗
			models.HudProxy.getInstance().on(models.SHOW_CHANGE_DIFFERENCE, this, this.onShowChangeDifferenceTips);
			//刷新属性
			models.HudProxy.getInstance().on(models.SRefreshRoleData_EVENT, this, this.onRefreshRoleData);
			//收到消息
			game.modules.friend.models.FriendProxy.getInstance().on(game.modules.friend.models.receiveMessage_EVENT, this, this.onMessageReceive);
			//消息已被阅读
			game.modules.friend.models.FriendProxy.getInstance().on(game.modules.friend.models.readMessage_EVENT, this, this.onMessageRead);
			//有未读邮件
			game.modules.friend.models.FriendProxy.getInstance().on(game.modules.friend.models.receiveMail_EVENT, this, this.onReceiveMail);
			//邮件已被阅读
			game.modules.friend.models.FriendProxy.getInstance().on(game.modules.friend.models.readMail_EVENT, this, this.onReadMail);
			//显示奖励系统红点（每日登陆）
			reward.models.RewardProxy.getInstance().on(reward.models.REGDATA_EVENT, this, this.onRewardPoint);
			//显示奖励系统红点（新手礼包）
			reward.models.RewardProxy.getInstance().on(reward.models.NEWPLAYERPOINT_EVENT, this, this.onRewardPoint);
			//隐藏奖励系统红点
			reward.models.RewardProxy.getInstance().on(reward.models.REWARDPOINT_EVENT, this, this.onHideRewardPoint);
			//显示成就系统红点
			achievent.models.AchieventProxy.getInstance().on(achievent.models.ACHIEVEPOINT_EVENT, this, this.onAchievePoint);
			//隐藏成就系统红点
			achievent.models.AchieventProxy.getInstance().on(achievent.models.HIDEACHIEVEPOINT_EVENT, this, this.onHideAchievePoint);
			game.modules.pet.models.PetProxy.getInstance().on(game.modules.pet.models.REFRESHSTATE_EVENT, this, this.onRefreshshstate);
			game.modules.pet.models.PetProxy.getInstance().on(game.modules.pet.models.ADD_EVENT, this, this.onAddpet);
			game.modules.pet.models.PetProxy.getInstance().on(game.modules.pet.models.REFRESHSHOUMING_EVENT, this, this.onRefreshshouming);
			models.HudProxy.getInstance().on(models.SETPOST_EVENT, this, this.changemap);
			game.modules.mainhud.models.HudProxy.getInstance().on(game.modules.mainhud.models.GETPOST_EVENT, this, this.changepost);
			game.scene.models.SceneProxy.getInstance().on(game.scene.models.ROLE_MOVE, this, this.rolemove);
			game.modules.team.models.TeamProxy.getInstance().on(team.models.IS_ACCEPT_INVITE, this, this._ShowConfirmWindow);
			game.modules.team.models.TeamProxy.getInstance().on(team.models.RESPONSE_CALL_BACK, this, this._ShowConfirmWindow);
			game.modules.team.models.TeamProxy.getInstance().on(game.modules.team.models.REFRESH_MAININTERFACE_TEAM, this, this.getTeamData);
			game.modules.team.models.TeamProxy.getInstance().on(game.modules.team.models.REFRESH_FRIEND_ACCEPT_TEAM, this, this.getTeamData);
			game.modules.task.models.TaskProxy.getInstance().on(game.modules.task.models.TAKSREFRESH, this, this.onRefreshTaskList)
			game.modules.task.models.TaskProxy.getInstance().on(game.modules.task.models.NEWTASK, this, this.onRefreshTaskList)
			chat.models.ChatProxy.getInstance().on(chat.models.VIWE_OTHER_ITEM, this, this._ViewOtherItem);
			chat.models.ChatProxy.getInstance().on(chat.models.OPEN_MAINHUD_PET_LISTEN, this, this.removePetInfoListener);
			chat.models.ChatProxy.getInstance().on(chat.models.CLOSE_MAINHUD_PET_LISTEN, this, this.openPetInfoListener);
			chat.models.ChatProxy.getInstance().on(chat.models.SYS_MSG_IN_CHANNEL, this, this.onGetChatData);
			team.models.TeamProxy.getInstance().on(team.models.MAINHUD_UPDATE_TEAM_STATE, this, this.updataTeamState);
			team.models.TeamProxy.getInstance().on(team.models.UPDATE_TEAMMATE_STATE_POPUP, this, this.updataTeamMatePopup);
			// team.models.TeamProxy.getInstance().on(team.models.MATCH_EVENT, this, this.cancleMatch);
			bag.models.BagProxy.getInstance().on(bag.models.ADDITEM_USE_GUIDE, this, this.showItemGuide);
			bag.models.BagProxy.getInstance().on(bag.models.DELET_USE_GUIDE, this, this.deletItemGuide);
			bag.models.BagProxy.getInstance().on(bag.models.ITEM_SLIDE, this, this.ItemSlide);
			game.modules.mainhud.models.HudProxy._instance.on(game.modules.mainhud.models.changeMoneyReturn, this, this.fushibuzu);

			/**是否有公会 */
			// models.HudProxy._instance.on(models.SRefreshRoleClan, this, this.openClan);
			/**公会被邀请加入 */
			game.modules.family.models.FamilyProxy._instance.on(game.modules.family.models.SClanInvitation, this, this.showClanInvitation);
			game.modules.tips.models.TipsProxy.getInstance().on(game.modules.tips.models.TIPS_ON_CANCEL, this, this.cancelTips);
			game.modules.family.models.FamilyProxy.getInstance().on(game.modules.family.models.removeMainTips, this, this.removeClantips);
			/** 判断背包是否已满 */
			bag.models.BagProxy.getInstance().on(bag.models.REFRESH_TEMP_BAG, this, this.judgeBagIsFull);
			//关闭界面
			models.HudProxy.getInstance().on(models.CLOSEVIEW_EVENT, this, this.closeMengban);
			//打开界面
			models.HudProxy.getInstance().on(models.OPEN_EVENT, this, this.openMengban);
			/**人物小窗口监听*/
			mainhud.models.HudProxy.getInstance().on(models.ROLE, this, this.showrole)
			/**帮派红点关闭 */
			game.modules.family.models.FamilyProxy._instance.on(game.modules.family.models.isShowFamilyRedDot, this, this.closeFamilyRedDot);
			/**帮派红点 */
			game.modules.family.models.FamilyProxy._instance.on(game.modules.family.models.SClanRedTip, this, this.showRedDot);
			/**强化红点 */
			game.modules.bag.models.BagProxy.getInstance().on(game.modules.bag.models.REFRESH_BAG_DEPOT_COUNT, this, this.initQianghuaData);
			game.modules.strengThening.models.StrengTheningProxy.getInstance().on(game.modules.strengThening.models.insertRedDot, this, this.showQianghuaRedDot);
			bag.models.BagProxy.getInstance().on(bag.models.BAG_YINDAO, this, this.bagYindao);
			/** 队伍红点 */
			team.models.TeamProxy.getInstance().on(team.models.TEAM_RED_DOT, this, this.setTeamRedDot);
			/**人物升级 */
			models.HudProxy.getInstance().on(models.LevelUp_EVENT, this, this.onLevelUp);
			/** 断线监听 */
			Network._instance.on(game.modules.setBasics.models.TYPE_LINK_BROKEN_EVENT, this, this.lingBroken);
			//监听是否要领取多倍点数
			game.modules.task.models.TaskProxy.getInstance().once(game.modules.task.models.GETDPOINT, this, this.isGetDPoint);
			//是否接受下一轮日常副本任务
			game.modules.task.models.TaskProxy.getInstance().once(game.modules.task.models.ACCEPTNEXTROUNDTASK, this, this.isAcceptNextRoundTask);
			//是否接受下一轮门派任务
			game.modules.task.models.TaskProxy.getInstance().on(task.models.ACCEPTNEXTROUND_SCHOOLTASK, this, this.isAcceptNextRoundTask);
			//主线剧情隐藏主界面后重新显示监听
			models.HudProxy.getInstance().on(models.SHOW_MAINHUD_AGAIN, this, this.showAgain);
			//评级显示监听
			game.modules.activity.models.ActivityProxy.getInstance().on(game.modules.activity.models.PINGJI_EVENT, this, this.pingJi);
			//是否同步队长进度弹窗
			game.modules.activity.models.ActivityProxy.getInstance().on(game.modules.activity.models.DEFINETEAM, this, this.defineTeam);
			game.modules.sale.models.SaleProxy.getInstance().on(game.modules.sale.models.SaleIsInit, this, () => {
				game.modules.sale.models.SaleProxy.getInstance().event(game.modules.sale.models.SearchItemResult);
			});

			tianjixianling.models.TianJiXianLingProxy.getInstance().on(tianjixianling.models.SHOW_ITEM_SUBMIT_JIEMIAN, this, this.cSubmitItem);
			tianjixianling.models.TianJiXianLingProxy.getInstance().on(tianjixianling.models.SUBMIT_PET, this, this.cSubmitPet);
			//阵法等级提升
			team.models.TeamProxy.getInstance().on(team.models.ZHENFA_LEVELUP, this, this.showZhenFaLevelUpTips);
			//切磋界面弹窗
			friend.models.FriendProxy.getInstance().on(friend.models.PK_EVENT, this, this.PK);
			//5v5证道战匹配状态监听
			xianhui.models.XianHuiProxy.getInstance().on(xianhui.models.REFRESH_MATCHSTATE2_EVENT, this, this.showpipei);
			aliveordead.models.AliveOrDeadProxy.getInstance().on(aliveordead.models.InvitationLiveDieOK, this, this.showIsAcceptInvitationLiveDieBattle);
			//求助倒计时
			models.HudProxy._instance.on(models.REFRESH_TIME, this, this.refreshTime);
		}
		/** 求助倒计时 */
		public refreshTime(str: string) {
			switch (str) {
				case "bangpai":
					Laya.timer.clear(this, this.qiuzhuBP);
					Laya.timer.loop(1000, this, this.qiuzhuBP);
					break;
				case "quanfu":
					Laya.timer.clear(this, this.qiuzhuQF);
					Laya.timer.loop(1000, this, this.qiuzhuQF);
					break;
			}
		}
		public qiuzhuBP() {
			models.HudModel._instance.qiuzhuBP -= 1;
			if (models.HudModel._instance.qiuzhuBP == 0) Laya.timer.clear(this, this.qiuzhuBP);
		}
		public qiuzhuQF() {
			models.HudModel._instance.qiuzhuQF -= 1;
			if (models.HudModel._instance.qiuzhuQF == 0) Laya.timer.clear(this, this.qiuzhuQF);
		}
		/** 显示是否接受生死战的确认框 */
		private showIsAcceptInvitationLiveDieBattle(vo: aliveordead.models.InvitationLiveDieOKVo): void {
			let parame = new Laya.Dictionary();
			let msgId: number;
			if (vo.selecttype == LiveDeadSelectType.OnePerson) {
				msgId = 162071;
			}
			else {
				msgId = 162082;
			}
			parame.set("contentId", msgId);
			parame.set("parame", [vo.sourcename]);
			tips.models.TipsProxy.getInstance().once(tips.models.TIPS_ON_CANCEL, this, this.refuseAcceptInvitationLiveDieBattle, [vo.sourceid]);
			tips.models.TipsProxy.getInstance().once(tips.models.TIPS_ON_OK, this, this.confirmAcceptInvitationLiveDieBattle, [vo.sourceid]);
			let _tipsModule = new tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, parame);
		}
		/** 拒绝接受生死战
		 * @param sourceid 所下战书的角色id
		 */
		private refuseAcceptInvitationLiveDieBattle(sourceid: number): void {
			RequesterProtocols._instance.c2s_CAcceptInvitationLiveDieBattle(sourceid, isAccept.refuse);
		}
		/** 确认接受生死战
		 * @param sourceid 所下战书的角色id
		 */
		private confirmAcceptInvitationLiveDieBattle(sourceid: number): void {
			RequesterProtocols._instance.c2s_CAcceptInvitationLiveDieBattle(sourceid, isAccept.confirm);
		}

		/** 显示5V5匹配窗口 */
		public showpipei() {
			let XianHuiPipeiMediator = new modules.xianhui.XianHuiPipeiMediator(this._app);
			XianHuiPipeiMediator.init(1);
		}
		/** 切磋弹窗 */
		public PK(roleId: number, roleName: string, roleLevel: number) {
			this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
			this._TipsMessageMediator.show();
			var param: Dictionary = new Dictionary();
			var parameArr: Array<any> = [];
			parameArr.push(roleName);
			parameArr.push(roleLevel);
			param.set("contentId", PromptExplain.PK_INVITATION);
			param.set("parame", parameArr);
			this._TipsMessageMediator.showContent(param);
			this._TipsMessageMediator.counTime(19);
			game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_CANCEL, this, this.isAcceptPK, [roleId, 0]);
			game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.isAcceptPK, [roleId, 1]);
		}
		/** 是否接受PK */
		public isAcceptPK(roleId: number, num: number) {
			RequesterProtocols._instance.c2s_CInvitationPlayPKResult(roleId, num);
		}
		/** 显示阵法等级提升的飘窗 */
		private showZhenFaLevelUpTips(): void {
			let _tips: string = ChatModel.getInstance().chatMessageTips[420046]["msg"];
			let _setTeamFormationVo = team.models.TeamModel.getInstance().setTeamFormationVo;
			let zhenfaId = _setTeamFormationVo.formation;//阵法id
			let zhenfaName = HuoBanModel.getInstance().FormationbaseConfigData[zhenfaId]["name"];
			let zhenfaLevel = _setTeamFormationVo.formationLevel;//阵法等级
			_tips = _tips.replace("$parameter1$", zhenfaName);
			_tips = _tips.replace("$parameter2$", (zhenfaLevel).toString());
			this.showTips(_tips);
		}
		/**
         * 因天机仙令任务请求上交目标宠物对象
         */
		private cSubmitPet(things: any): void {
			let _tjxlData = models.HudModel.getInstance().tjxlData;
			/** 任务栏位 */
			var _taskpos = tianjixianling.models.TianJiXianLingModel.getInstance().taskPos;
			/** 任务id */
			var _taskid = _tjxlData[0]["id"];
			/** 完成任务的角色id */
			var _taskrole = tianjixianling.models.TianJiXianLingModel.getInstance().completedTaskRoleId;
			if (!_taskrole) {
				_taskrole = LoginModel.getInstance().roleDetail.roleid;
			}
			RequesterProtocols._instance.c2s_CSubmitThings(_taskpos, _taskid, _taskrole, SubmitType.PET, things);
		}
		/**
         * 因天机仙令任务请求上交目标道具对象
         */
		private cSubmitItem(itemkey: any): void {
			let _tjxlData = models.HudModel.getInstance().tjxlData;
			/** 任务栏位 */
			var _taskpos = tianjixianling.models.TianJiXianLingModel.getInstance().taskPos;
			/** 任务id */
			var _taskid = _tjxlData[0]["id"];//
			/** 完成任务的角色id */
			var _taskrole = tianjixianling.models.TianJiXianLingModel.getInstance().completedTaskRoleId;
			if (!_taskrole) {
				_taskrole = LoginModel.getInstance().roleDetail.roleid;
			}
			/** 存放目标对象 */
			let _things: Array<game.modules.task.models.SubmitUnitVo> = [];
			/** 上交对象 */
			let _submit: game.modules.task.models.SubmitUnitVo = new game.modules.task.models.SubmitUnitVo();
			_submit.key = itemkey;
			_submit.num = _tjxlData[0]["dstitemnum"];//
			_things.push(_submit);
			RequesterProtocols._instance.c2s_CSubmitThings(_taskpos, _taskid, _taskrole, SubmitType.ITEM, _things);
		}
		/** 是否同步队长进度弹窗 */
		public defineTeam(instid: number, mystep: number, tlstep: number): void {
			this.openMengban();
			this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
			this._TipsMessageMediator.show();
			var param: Dictionary = new Dictionary();
			var parameArr: Array<string> = [];
			parameArr.push(ActivityModel._instance.ShiGuangZhiXueByFuBenId.get(instid)[0].name);
			parameArr.push(tlstep + "/5");
			parameArr.push(mystep + "/5");
			param.set("contentId", 166059);
			param.set("parame", parameArr);
			this._TipsMessageMediator.showContent(param);
			this._TipsMessageMediator.counTime(10);
			game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_CANCEL, this, this.defineTeamCancel);
			game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.defineTeamOk);
		}
		public defineTeamCancel() {
			this.closeMengban();
			RequesterProtocols._instance.c2s_CAbsentReturnTeam(TeamMemberApply.LEAVE_SOON);
			RequesterProtocols._instance.c2s_CDefineTeam(0);
		}
		public defineTeamOk() {
			this.closeMengban();
			RequesterProtocols._instance.c2s_CDefineTeam(1);
		}
		/** 显示评级界面 */
		public pingJi(): void {
			var data: hanlder.s2c_req_fortune_wheel = game.modules.friend.models.FriendModel.getInstance().SReqFortuneWheelData.get("data");
			var grate: number = game.modules.activity.models.ActivityModel.getInstance().grade;
			if (!grate || !data) return;
			var items: Array<number> = [];
			for (var i: number = 0; i < data.itemids.length; i++) {
				if (data.itemids[i].itemtype == 1) {	//1为物品
					items.push(data.itemids[i].id);
				}
			}
			let fuBenPingJiMediator = new game.modules.commonUI.FuBenPingJiMediator(this._app, grate, items, 5);
			fuBenPingJiMediator.show();
		}
		/**
		 * 是否接受下一轮任务
		 */
		private isAcceptNextRoundTask(taskid: number): void {
			var parame: Dictionary = new Laya.Dictionary();
			switch (taskid) {
				case 1030000://日常副本任务
					parame.set("contentId", 150535);
					break;
				case 1010000://门派任务
					parame.set("contentId", 420038);
					break;
			}
			//预先监听点击确定接受下一轮日常副本任务的事件消息
			tips.models.TipsProxy.getInstance().once(tips.models.TIPS_ON_OK, this, this.acceptNextRoundTask, [taskid]);
			var _tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, parame);
		}
		/**
		 * 确定接受下一轮任务
		 */
		private acceptNextRoundTask(taskid: number): void {
			/** 临时存放日常活动数据 */
			var tempArray = [];
			for (var i: number = 0; i < ActivityModel.getInstance().ActivityNewBinDicAtType.get(viewType.VIEW1).length; i++) {
				tempArray.push(ActivityModel.getInstance().ActivityNewBinDicAtType.get(viewType.VIEW1)[i]);
			}
			var _activityModule = new activity.ActivityModule(this._app);
			switch (taskid) {
				case 1030000://日常副本任务
					_activityModule.onBtn(1, tempArray);//这里写死的数字1，是代表日常副本在活动主界面日常活动中活动配置表的位置
					break;
				case 1010000://门派任务
					_activityModule.onBtn(0, tempArray);//这里写死的数字0，是代表门派任务在活动主界面日常活动中活动配置表的位置
					break;
			}
		}
		/**
		 * 是否领取多倍点数
		 */
		private isGetDPoint(): void {
			var parame: Dictionary = new Laya.Dictionary();
			parame.set("contentId", 160059);
			//预先监听点击确定接取多倍点数的事件消息
			tips.models.TipsProxy.getInstance().once(tips.models.TIPS_ON_OK, this, this.getDPointOK);
			var _tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, parame);
		}
		/**
		 * 确定领取多倍点数
		 */
		private getDPointOK(): void {
			RequesterProtocols._instance.c2s_CGetDPoint();
		}
		/**按钮监听 */
		public registerEvent(): void {
			this._viewUI.mainSkill_btn.on(LEvent.MOUSE_DOWN, this, this.showSkill);//技能系统
			this._viewUI.mainRoleAvatar.on(LEvent.MOUSE_DOWN, this, this.showRoleinfo);//角色系统
			this._viewUI.mainTask_btn.on(LEvent.MOUSE_DOWN, this, this.mainTaskHandler);
			this._viewUI.mainTeam_btn.on(LEvent.MOUSE_DOWN, this, this.mainTeamHandler);
			this._viewUI.leaveCopy_btn.on(LEvent.MOUSE_DOWN, this, this.leaveCopy);
			this._viewUI.hideTask_btn.on(LEvent.MOUSE_DOWN, this, this.hideMiddleBox);
			this._viewUI.showTask_btn.on(LEvent.MOUSE_DOWN, this, this.showMiddleBox);
			this._viewUI.mainShowBot_btn.on(LEvent.MOUSE_DOWN, this, this.showBottomBox);
			this._viewUI.mainQianghua_btn.on(LEvent.MOUSE_DOWN, this, this.qianghua);
			this._viewUI.mainFriend_btn.on(LEvent.MOUSE_DOWN, this, this.onClickFriendBtnEvent);
			this._viewUI.mainBag_btn.on(LEvent.MOUSE_DOWN, this, this.showBagSystem);
			this._viewUI.smallmap_img.on(LEvent.MOUSE_DOWN, this, this.showSmallMap);
			this._viewUI.mainGuaji_btn.on(LEvent.MOUSE_DOWN, this, this.showGuaJi);//挂机系统
			this._viewUI.mainChat_btn.on(LEvent.CLICK, this, this.chatHandler);
			this._viewUI.mainBigMap_btn.on(LEvent.MOUSE_DOWN, this, this.bigMap);
			this._viewUI.mainAchievent_btn.on(LEvent.MOUSE_DOWN, this, this.AchieventHandler);//成就系統
			this._viewUI.mainZhuzhan_btn.on(LEvent.CLICK, this, this.huoban);//伙伴系统
			this._viewUI.mainPetAvatar.on(LEvent.CLICK, this, this.pet);//宠物系统
			this._viewUI.mainJiangli_btn.on(LEvent.MOUSE_DOWN, this, this.rewardShow);
			this._viewUI.mainActivity_btn.on(LEvent.MOUSE_DOWN, this, this.activity);
			this._viewUI.mainShop_btn.on(LEvent.MOUSE_DOWN, this, this.shop);
			this._viewUI.mainPaimai_btn.on(LEvent.MOUSE_DOWN, this, this.paimai);  //拍卖
			this._viewUI.serverExpUp_img.on(LEvent.MOUSE_DOWN, this, this.expTip);
			this._viewUI.mainBanpai_btn.on(LEvent.MOUSE_DOWN, this, this.Bangpai);  //帮派
			this._viewUI.mainPaihang_btn.on(LEvent.CLICK, this, this.paihangbang);//排行榜系统
			this._viewUI.mainRedPacket_btn.on(LEvent.CLICK, this, this.hongbao);//红包系统
			this._viewUI.mainSystem_btn.on(LEvent.CLICK, this, this.setBasics);//系统设置
			this._viewUI.tempBag_btn.on(LEvent.CLICK, this, this.opTempBag);//打开临时背包
			this._viewUI.mainChatset_btn.on(LEvent.CLICK, this, this.opChatSet);//聊天频道设置
			this._viewUI.yingcang_box.on(LEvent.MOUSE_DOWN, this, this.hideExpTip);
			this._viewUI.chat_shadow_img.on(LEvent.MOUSE_DOWN, this, this.showChatSelectRender);
			this._viewUI.xianhui_btn.on(LEvent.CLICK, this, this.xianhuiShow);
		}
		/** 主线剧情隐藏主界面后重新显示 */
		public showAgain(): void {
			if (models.HudModel.getInstance().hideMain) {
				this.closeMengban();
				this.show();
			}
		}
		/** 断线弹窗提示 */
		public lingBroken(): void {
			this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
			this._TipsMessageMediator.show();
			var param: Dictionary = new Dictionary();
			param.set("contentId", 11264);
			param.set("btnName", "重试");
			this._TipsMessageMediator.showContent(param);
			game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_CANCEL, this, () => {
				Network._instance.off(game.modules.setBasics.models.TYPE_LINK_BROKEN_EVENT, this, this.lingBroken);
				this._TipsMessageMediator.hide();
				mainhud.models.HudProxy.getInstance().event(mainhud.models.MAINHUD_UI_HIDE);
				game.modules.setBasics.models.SetBasicsProxy.getInstance().event(game.modules.setBasics.models.TYPE_LINK_BROKEN_BACK_EVENT);
			});
			game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, () => {
				game.modules.createrole.models.LoginModel.getInstance().isBreakLink = true;
				Network._instance.connectByUrl(Browser.window.server);
				Laya.timer.loop(1000, this, this.link);
			});
		}
		/** 检测是否已经连接成功，成功后进行登陆操作 */
		public link(): void {
			if (Network._instance.connected) {
				Laya.timer.clear(this, this.link);
				// game.modules.createrole.models.LoginProxy.getInstance().event(game.modules.createrole.models.LOGIN_EVENT2);
				RequesterProtocols._instance.c2s_login(LoginModel.getInstance().userLoginAccount, LoginModel.getInstance().userLoginPassword);
			}
		}
		/** 符石不足 充值确认
		 * @param moduleName 跳转之前的模块
		 */
		public fushibuzu(moduleName: string) {
			this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
			this._TipsMessageMediator.show();
			var param: Dictionary = new Dictionary();
			param.set("contentId", 150506);
			if (moduleName) this._TipsMessageMediator.showContent(param, moduleName);
			else this._TipsMessageMediator.showContent(param);
			game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
		}
		/** 跳转充值界面
		 * @param moduleName 模块名称
		 */
		public goRecharge(moduleName: string) {
			if (moduleName) {
				ModuleManager.hide(moduleName);
				if (LoginModel.getInstance().CommonPage == "") {
					LoginModel.getInstance().CommonPage = moduleName;
				}
			}
			ModuleManager.jumpPage(ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);


		}

		public initQianghuaData() {
			this._StrengTheningInsertViewMediator.initLists();
		}

		public showQianghuaRedDot(state) {
			if (state == 0) {
				this._viewUI.qiangHuaRedDot_img.visible = false;
				this._viewUI.mainShowPoint_img.visible = false;
			} else {
				this._viewUI.qiangHuaRedDot_img.visible = true;
				this._viewUI.mainShowPoint_img.visible = true;
			}
		}

		public initFamilyData() {
			this.FamilyMemberViewMediator = new game.modules.family.FamilyMemberViewMediator(this._viewUI, this._app);
			this.FamilyMemberViewMediator.CRequestApplyList();
		}

		public closeFamilyRedDot(state) {
			if (state == 0) {
				this._viewUI.familyRedDot_img.visible = false;
				this._viewUI.mainShowPoint_img.visible = false;
			} else {
				this._viewUI.familyRedDot_img.visible = true;
				this._viewUI.mainShowPoint_img.visible = true;
			}

		}

		public showRedDot(redtips: Dictionary) {
			var keys = redtips.keys;
			if (redtips.get(keys[0]) == 1) {
				this._viewUI.familyRedDot_img.visible = true;
				this._viewUI.mainShowPoint_img.visible = true;
			} else {
				this._viewUI.familyRedDot_img.visible = false;
				this._viewUI.mainShowPoint_img.visible = false;
			}
		}

		/**一级引导 */
		public renwuYindao(): void {
			var x1 = this._viewUI.mainTask_panel.x + this._viewUI.mainTask_panel.width;
			var y1 = this._viewUI.middleBox.y + this._viewUI.mainTask_panel.y;
			var x2 = this._viewUI.mainTask_panel.x;
			var y2 = y1 - 50;
			this.setTipPos(x1, y1);
			this.setAniPos(x2, y2);
			this.startYindao(YinDaoEnum.RENWU_YINDAO_TIP);
			this.yindaoId = YinDaoEnum.RENWU_YINDAO;
		}
		/**日常副本引导 */
		public richangYindao(): void {
			var x1 = this._viewUI.mainTeam_btn.x + this._viewUI.mainTeam_btn.width + 20;
			var y1 = this._viewUI.middleBox.y + this._viewUI.mainTeam_btn.y;
			var x2 = x1 - 200;
			var y2 = y1 - 100;
			this.setTipPos(x1, y1);
			this.setAniPos(x2, y2);
			this.startYindao(YinDaoEnum.RICHANG_YINDAO_TIP);
			this.yindaoId = YinDaoEnum.RICHANG_YINDAO;
			HudModel.getInstance().yindaoId = YinDaoEnum.RICHANG_YINDAO;
		}
		/**技能引导 */
		public skillYindao(key: number): void {
			var x1 = this._viewUI.mainSkill_btn.x + this._viewUI.mainSkill_btn.width;
			var y1 = this._viewUI.bottom_box.y + this._viewUI.mainSkill_btn.y - 20;
			var x2 = x1 - 180;
			var y2 = y1 - 60;
			this.setTipPos(x1, y1);
			this.setAniPos(x2, y2);
			this.startYindao(YinDaoEnum.SKILL_YINDAO_TIP);
			this.yindaoId = YinDaoEnum.SKILL_YINDAO;
			if (key == SkillEnum.LIFE_KEY)//生活技能引导
				HudModel.getInstance().yindaoId = YinDaoEnum.LIFESKILL_YINDAO;
			else if (key == SkillEnum.ZHUANGJING_KEY)//专精技能引导
				HudModel.getInstance().yindaoId = YinDaoEnum.ZHUANJING_CLICK_YINDAO;
		}
		/**背包引导 */
		public bagYindao(e: any): void {
			var x1 = this._viewUI.rightBtn_box.x - 400;
			var y1 = this._viewUI.rightBtn_box.y + this._viewUI.mainBag_btn.y;
			var x2 = x1 + 300;
			var y2 = y1 - 60;
			this.setTipPos(x1, y1);
			this.setAniPos(x2, y2);
			this.startYindao(YinDaoEnum.BAG_YINDAO_TIP);
			this.yindaoId = YinDaoEnum.BAG_YINDAO;
			HudModel.getInstance().yindaoId = e;
		}
		/**宠物加点引导 */
		public petPointYindao(): void {
			var x1 = this._viewUI.pet_img.x + this._viewUI.pet_img.width;
			var y1 = this._viewUI.top_box.y + this._viewUI.pet_img.y;
			var x2 = x1 - 230;
			var y2 = y1 - 80;
			this.setTipPos(x1, y1);
			this.setAniPos(x2, y2);
			this.startYindao(YinDaoEnum.PET_YINDAO_TIP);
			this.yindaoId = YinDaoEnum.CLICK_PET_YINDAO;
			HudModel.getInstance().yindaoId = YinDaoEnum.CLICK_PET_YINDAO;
		}
		/**引导开始 */
		public startYindao(tipid: number): void {
			var tip = HudModel._instance.carroweffectData;
			this.onload();
			Laya.timer.loop(1000, this, this.moveImg);
			Laya.timer.loop(5000, this, this.closeAni);
			this._viewUI.yindaoTip_htm.text = tip[tipid].text;
			this._viewUI.addChild(this.ani);
			this._viewUI.addChild(this.dianImg);
			this._viewUI.yindaoTip_img.visible = true;
			this.dianImg.visible = true;
		}
		/**设置引导提示位置 */
		public setTipPos(x: number, y: number) {
			this._viewUI.yindaoTip_img.x = x;
			this._viewUI.yindaoTip_img.y = y;
		}
		/**设置动画位置*/
		public setAniPos(x: number, y: number) {
			this.ani.x = x;
			this.ani.y = y;
			this.dianImg.x = x;
			this.dianImg.y = y;
		}
		/**关闭动画 */
		public closeAni(): void {
			this.ani.clear();
			Laya.timer.clear(this, this.closeAni);
			Laya.timer.clear(this, this.moveImg);
			this._viewUI.yindaoTip_img.visible = false;
			this.dianImg.visible = false;
		}
		/**播放动画 */
		public onload() {
			Laya.Animation.createFrames(this.anUrls("", 9), "yindao")
			this.ani.play(0, true, "yindao");
			this.ani.interval = 112;
			this.dianImg.skin = "common/ui/mainhud/dian.png";
			this.dianImg.mouseThrough = true;
			this.ani.mouseThrough = true;
		}
		/**移动手指图标 */
		public moveImg(): void {
			if (this.dianImg.y <= this.ani.y)
				Laya.Tween.to(this.dianImg, { x: this.ani.x + 25, y: this.ani.y + 25 }, 1000, null, Laya.Handler.create(this, function () { }), null, false);
			else
				Laya.Tween.to(this.dianImg, { x: this.ani.x - 5, y: this.ani.y - 5 }, 1000, null, Laya.Handler.create(this, function () { }), null, false);
		}
		public anUrls(aniName: string, length: number): any {
			var urls: any = []
			for (var index = 1; index <= length; index++) {
				urls.push("common/ui/yindao/" + aniName + index + ".png")
			}
			return urls
		}
		/**获取时间戳 */
		public getNowTime(): void {
			var date = new Date();
			var str2 = ":";
			var strHour = (date.getHours()).toString();
			var strMinute = (date.getMinutes()).toString();
			if (parseInt(strHour) >= 1 && parseInt(strHour) <= 9) {
				strHour = "0" + strHour;
			}
			if (parseInt(strMinute) >= 1 && parseInt(strMinute) <= 9) {
				strMinute = "0" + strMinute;
			}
			var currentdate = strHour + str2 + strMinute;
			this._viewUI.mainTime.text = currentdate;
		}
		/**打开蒙版 */
		public openMengban(): void {
			this._viewUI.mengban_img.visible = true;
		}
		/**关闭蒙版 */
		public closeMengban(): void {
			this._viewUI.mengban_img.visible = false;
		}
		/** 聊天频道设置点击 */
		private opChatSet(): void {
			this._selectChannelMediator = game.modules.chat.SelectChannelMediator.getInstance(this._app);
			this._selectChannelMediator.onShow();
		}
		/**隐藏服务器经验提示 */
		public hideExpTip(): void {
			this._viewUI.yingcang_box.visible = false;
			this._viewUI.tip_box.visible = false;
		}
		/**服务器经验提示 */
		public expTip(): void {
			this._viewUI.yingcang_box.visible = true;
			this._viewUI.tip_box.visible = true;
		}
		/** 打开临时背包 */
		private opTempBag(): void {
			this._TempBagMediator = new game.modules.bag.TempBagMediator(this._viewUI, this._app);
			this._TempBagMediator.show();
		}

		/**帮派 */
		public Bangpai() {
			// RequesterProtocols._instance.c2s_CRefreshRoleClan();
			this.openClan();
		}

		public openClan() {
			var clankey = models.HudModel.getInstance().clankey;
			if (clankey > 0) {
				ModuleManager.show(ModuleNames.haveFamily, this._app);  //有帮派界面
			} else {
				ModuleManager.show(ModuleNames.Family, this._app);  //没有帮派界面
			}
		}

		/**移除主界面tips的监听 */
		public removeClantips() {
			game.modules.tips.models.TipsProxy.getInstance().off(game.modules.tips.models.TIPS_ON_CANCEL, this, this.cancelTips);
			game.modules.tips.models.TipsProxy.getInstance().off(game.modules.tips.models.TIPS_ON_OK, this, this.okTips);
		}

		/** 排行榜系统 */
		private paihangbang(): void {
			game.modules.ranKingList.models.RanKingListProxy.getInstance().init();
			ModuleManager.show(ModuleNames.RANKING_LIST, this._app);
		}
		/** 红包系统 */
		private hongbao(): void {
			game.modules.redPacket.models.RedPacketProxy.getInstance().init();
			ModuleManager.show(ModuleNames.RED_PACKET, this._app);
		}
		/** 系统设置  */
		private setBasics(): void {
			RequesterProtocols._instance.c2s_CGetGoodLocksInfo();
			game.modules.setBasics.models.SetBasicsProxy.getInstance().init();
			ModuleManager.show(ModuleNames.SET_BASICS, this._app);
		}

		/**初始化按钮 */
		public initBtn(): void {
			this._viewUI.mainSkill_btn.visible = false;//技能
			this._viewUI.mainBanpai_btn.visible = false;//帮会
			this._viewUI.mainZhuzhan_btn.visible = false;//助战
			this._viewUI.mainPaihang_btn.visible = false;//排行
			this._viewUI.mainQianghua_btn.visible = false;//强化
			this._viewUI.mainActivity_btn.visible = false;//活动
			this._viewUI.mainGuaji_btn.visible = false;//挂机
			var _loginModel = game.modules.createrole.models.LoginModel.getInstance();
			//技能按钮,等级触发14，任务完成 180106,180206,180306,180406,180506,180606,180706,180806,180906
			if (_loginModel.roleDetail.level >= unlock.SKILL_LEVEL) {
				this._viewUI.mainSkill_btn.visible = true;
			}
			//帮派按钮,等级触发16，任务完成 180163
			if (_loginModel.roleDetail.level >= unlock.BANGPAI_LEVEL) {
				this._viewUI.mainBanpai_btn.visible = true;
			}

			//助战按钮,等级触发17，任务完成 180176
			if (_loginModel.roleDetail.level >= unlock.ZHUZHAN_LEVEL) {
				this._viewUI.mainZhuzhan_btn.visible = true;
			}
			//活动按钮,等级触发19
			if (_loginModel.roleDetail.level >= unlock.ACTIVITY_LEVEL) {
				this._viewUI.mainActivity_btn.visible = true;
			}
			//挂机按钮,等级触发25，任务完成 180176
			if (_loginModel.roleDetail.level >= unlock.GUAJI_LEVEL) {
				this._viewUI.mainGuaji_btn.visible = true;
			}
			//排行按钮,等级触发31，任务完成 180176
			if (_loginModel.roleDetail.level >= unlock.PAIHANG_LEVEL) {
				this._viewUI.mainPaihang_btn.visible = true;
			}
			//强化按钮,等级触发32，任务完成 180176
			if (_loginModel.roleDetail.level >= unlock.QIANGHUA_LEVEL) {
				this._viewUI.mainQianghua_btn.visible = true;
			}
			//经验加成,等级触发35，任务完成 180176
			if (_loginModel.roleDetail.level >= unlock.EXPUP_LEVEL) {
				this._viewUI.serverExpUp_img.visible = true;
			}
			this.sortBtn(_loginModel.roleDetail.level);
			RequesterProtocols._instance.c2s_queryregdata();//请求每日签到状态
			RequesterProtocols._instance.c2s_get_archive_info();//请求成就信息
			RequesterProtocols._instance.c2s_CRefreshRoleClan();//请求是否有公会

			//console.log("this.chatData...........", this.chatData)
		}
		/**初始化经验加成提示 */
		public initServerLevel(): void {
			var data = HudModel._instance.cserviceexpconfigData;
			var cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
			var roleDetail = game.modules.createrole.models.LoginModel.getInstance().roleDetail;//人物信息
			var level = roleDetail.level - HudModel.getInstance().serverLevel;//当前等级和服务器等级的差值
			//确定最小值
			if (level < data[21]["midlevel"]) {
				level = data[21]["midlevel"];
			}
			//确定最大值
			if (level > data[1]["midlevel"]) {
				level = data[1]["midlevel"];
			}
			var jiacheng;
			var tip;
			//确定经验加成数值
			for (var i: number = 1; i < 22; i++) {
				if (data[i]["midlevel"] == level) {
					if (level == -1 || level == 0) {
						this._viewUI.serverExpUp_img.skin = "common/ui/tongyong/deng.png";
						jiacheng = data[i]["bili"] * 100 + "%";
						tip = cstringResConfigData[11505].msg;
					} else if (level < -1) {
						this._viewUI.serverExpUp_img.skin = "common/ui/pet/chongwu_jingyanup.png";
						jiacheng = (data[i]["bili"] - 1) * 100 + "%";
						tip = cstringResConfigData[11432].msg;
					} else if (level > 0) {
						this._viewUI.serverExpUp_img.skin = "common/ui/pet/chongwu_jingyandown.png";
						jiacheng = (1 - data[i]["bili"]) * 100 + "%";
						tip = cstringResConfigData[11433].msg;
					}
				}
			}
			tip = tip.replace("$parameter1$", jiacheng);
			this._viewUI.jiacheng_htm.innerHTML = tip;

			var parame = [HudModel.getInstance().serverLevel, HudModel.getInstance().newleveldays];
			var msg = cstringResConfigData[11506].msg;
			for (var i: number = 0; i < parame.length; i++) {
				msg = msg.replace("$parameter" + (i + 1) + "$", parame[i]);
			}
			this._viewUI.serverLevel_htm.innerHTML = msg;
			this._viewUI.tip_htm.innerHTML = cstringResConfigData[11434].msg;
		}
		/**初始化人物信息 */
		public initRoleData(): void {
			var roleDetail = game.modules.createrole.models.LoginModel.getInstance().roleDetail;//人物信息
			this._viewUI.mainRoleRed.value = HudModel.getInstance().hpNum / HudModel.getInstance().maxHpNum;	//血条
			this._viewUI.mainRoleBule.value = HudModel.getInstance().mpNum / HudModel.getInstance().maxMpNum;//蓝条
			//怒气条
			if (HudModel.getInstance().maxSpNum == 0) {
				this._viewUI.mainRoleYellow.value = 0;
			} else {
				this._viewUI.mainRoleYellow.value = HudModel.getInstance().spNum / HudModel.getInstance().maxSpNum;
			}
			this._viewUI.mainRoleLevel.text = <string><any>roleDetail.level;//等级
			this._viewUI.exp_pro.value = roleDetail.exp / roleDetail.nexp;//经验条
			this._viewUI.mainRoleAvatar.skin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + roleDetail.shape) + ".png";//头像
			//第一条任务引导（暂时不要了）
			// if (roleDetail.level == 1) {
			// 	for (let key in Taskmodels.getInstance().maintask.keys) {
			// 		for (let id in this.maintaskArr) {
			// 			if (Taskmodels.getInstance().maintask.keys[key] == this.maintaskArr[id]) {
			// 				this.renwuYindao();
			// 			}
			// 		}
			// 	}
			// }
		}
		/**初始化宠物信息 */
		public initPetData(): void {
			var _loginModel = game.modules.createrole.models.LoginModel.getInstance();
			if (_loginModel.roleDetail.pets.length == 0) {
				//没有宠物时，不显示
				this._viewUI.pet_img.visible = false;
				this._viewUI.mainPetAvatar.visible = false;
				this._viewUI.mainPetRed.visible = false;
				this._viewUI.mainPetBlue.visible = false;
				this._viewUI.mainPetLevel.visible = false;
			} else if (_loginModel.roleDetail.petIndex == -1 && _loginModel.roleDetail.pets.length != 0) {
				//有宠物但是不参战时，不显示具体蓝条和血条
				this._viewUI.pet_img.visible = true;
				this._viewUI.mainPetAvatar.visible = true;
				this._viewUI.mainPetRed.visible = true;
				this._viewUI.mainPetBlue.visible = true;
				this._viewUI.mainPetLevel.visible = true;
				this._viewUI.mainPetRed.value = 0;//宠物血条
				this._viewUI.mainPetBlue.value = 0;//宠物蓝条
				this._viewUI.mainPetLevel.text = "";//宠物等级
				this._viewUI.mainPetAvatar.skin = "common/ui/tongyong/chongwudiwen.png";//宠物头像
			} else {
				let petinfo: game.modules.pet.models.PetInfoVo = PetModel._instance.pets.get(_LoginModel.getInstance().roleDetail.petIndex);
				let allpetbase: PetCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[petinfo.id];
				let icondata: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[allpetbase.modelid] as CNpcShapeBaseVo;
				this._viewUI.pet_img.visible = true;
				this._viewUI.mainPetAvatar.visible = true;
				this._viewUI.mainPetRed.visible = true;
				this._viewUI.mainPetBlue.visible = true;
				this._viewUI.mainPetLevel.visible = true;
				this._viewUI.mainPetRed.value = petinfo.hp / petinfo.maxhp;//宠物血条
				this._viewUI.mainPetBlue.value = petinfo.mp / petinfo.maxmp;//宠物蓝条
				this._viewUI.mainPetLevel.text = petinfo.level.toString();//宠物等级
				this._viewUI.mainPetAvatar.skin = "common/icon/avatarpet/" + icondata.littleheadID + ".png";//宠物头像
			}
		}
		/**成就系统红点显示 */
		public onAchievePoint(e: any): void {
			this._viewUI.chengjiuPoint_img.visible = true;
		}
		/**成就系统红点隐藏 */
		public onHideAchievePoint(e: any): void {
			this._viewUI.chengjiuPoint_img.visible = false;
		}
		/**奖励系统红点显示 */
		public onRewardPoint(e: any): void {
			for (var i: number = 0; i < 6; i++) {
				if (RewardModel.getInstance().pointDic.get(i) != 0) {
					this._viewUI.jiangliPoint.visible = true;
				}
			}
		}
		/**奖励系统红点隐藏 */
		public onHideRewardPoint(e: any): void {
			this._viewUI.jiangliPoint.visible = false;
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
		public onReceiveMail(e: any): void {
			this._viewUI.mailPoint_img.visible = true;

		}
		/** 邮件已被阅读*/
		public onReadMail(e: any): void {
			this._viewUI.mailPoint_img.visible = false;
		}
		/**添加宠物 */
		public onAddpet(e: any): void {
			var state = LoginModel.getInstance().roleDetail.petIndex;
			//有参战宠物
			if (state != -1) {
				return
			} else {
				this._viewUI.pet_img.visible = true;
				this._viewUI.mainPetAvatar.visible = true;
				this._viewUI.mainPetRed.visible = true;
				this._viewUI.mainPetBlue.visible = true;
				this._viewUI.mainPetLevel.visible = true;
				this._viewUI.mainPetRed.value = 0;//宠物血条
				this._viewUI.mainPetBlue.value = 0;//宠物蓝条
				this._viewUI.mainPetLevel.text = "";//宠物等级
				this._viewUI.mainPetAvatar.skin = "common/ui/tongyong/chongwudiwen.png";//宠物头像
			}
		}
		/**宠物出战状态改变 */
		public onRefreshshstate(e: any): void {
			this._viewUI.pet_img.visible = true;
			this._viewUI.mainPetAvatar.visible = true;
			this._viewUI.mainPetRed.visible = true;
			this._viewUI.mainPetBlue.visible = true;
			this._viewUI.mainPetLevel.visible = true;
			var state = LoginModel.getInstance().roleDetail.petIndex;
			//有参战宠物
			if (state != -1) {
				var petData = PetModel.getInstance().pets.get(state);
				let allpetbase: PetCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[petData.id];
				let icondata: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[allpetbase.modelid] as CNpcShapeBaseVo;
				this._viewUI.mainPetRed.value = petData.hp / petData.maxhp;//宠物血条
				this._viewUI.mainPetBlue.value = petData.mp / petData.maxmp;//宠物蓝条
				this._viewUI.mainPetLevel.text = petData.level.toString();//宠物等级
				this._viewUI.mainPetAvatar.skin = "common/icon/avatarpet/" + icondata.littleheadID + ".png";//宠物头像
			} else {
				this._viewUI.mainPetRed.value = 0;//宠物血条
				this._viewUI.mainPetBlue.value = 0;//宠物蓝条
				this._viewUI.mainPetLevel.text = "";//宠物等级
				this._viewUI.mainPetAvatar.skin = "common/ui/tongyong/chongwudiwen.png";//宠物头像
			}
		}
		/**刷新宠物信息 */
		public onRefreshshouming(e: any): void {
			var data = game.modules.pet.models.PetModel.getInstance().petbasedata;
			this._viewUI.mainPetRed.value = data.hp / data.maxhp;//宠物血条
			this._viewUI.mainPetBlue.value = data.mp / data.maxmp;//宠物蓝条
			this._viewUI.mainPetLevel.text = data.level.toString();//宠物等级
		}
		/**人物升级 */
		public onLevelUp(e: any): void {
			let promoto = HudModel.getInstance().promptAssembleBack(140406);
			this.disappearMessageTipsMediator.xuanzhuan();
			this.disappearMessageTipsMediator.onShow(promoto, 1);
			this.unlockFunction(HudModel.getInstance().levelNum);
			this._app.sceneObjectMgr.mainUnit.levelup = 1
			Laya.timer.clear(this, this.closetx)
			Laya.timer.loop(2000, this, this.closetx)
			//宠物加点引导
			if (HudModel.getInstance().levelNum == 56 && this._viewUI.mainPetAvatar.visible == true)
				this.petPointYindao();
		}
		/**刷新人物属性 */
		public onRefreshRoleData(e: any): void {
			var roleDetail = game.modules.createrole.models.LoginModel.getInstance().roleDetail;
			var oldlevel = parseInt(this._viewUI.mainRoleLevel.text);
			//判断是否升级
			if (oldlevel != HudModel.getInstance().levelNum) {
				/** 判断等级礼包是否达到领取要求 */
				this.JudgeLevelPacks(oldlevel, HudModel.getInstance().levelNum);
			}
			this._viewUI.mainRoleLevel.text = HudModel.getInstance().levelNum.toString();//等级
			//刷新服务器经验加成数值
			var data = HudModel._instance.cserviceexpconfigData;
			var cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
			var level = HudModel.getInstance().levelNum - HudModel.getInstance().serverLevel;//当前等级和服务器等级的差值
			//确定最小值
			if (level < data[21]["midlevel"]) {
				level = data[21]["midlevel"];
			}
			//确定最大值
			if (level > data[1]["midlevel"]) {
				level = data[1]["midlevel"];
			}
			var jiacheng;
			var tip;
			//确定经验加成数值
			for (var i: number = 1; i < 22; i++) {
				if (data[i]["midlevel"] == level) {
					if (level == -1 || level == 0) {
						this._viewUI.serverExpUp_img.skin = "common/ui/tongyong/deng.png";
						jiacheng = data[i]["bili"] * 100 + "%";
						tip = cstringResConfigData[11505].msg;
					} else if (level < -1) {
						this._viewUI.serverExpUp_img.skin = "common/ui/pet/chongwu_jingyanup.png";
						jiacheng = (data[i]["bili"] - 1) * 100 + "%";
						tip = cstringResConfigData[11432].msg;
					} else if (level > 0) {
						this._viewUI.serverExpUp_img.skin = "common/ui/pet/chongwu_jingyandown.png";
						jiacheng = (1 - data[i]["bili"]) * 100 + "%";
						tip = cstringResConfigData[11433].msg;
					}
				}
			}
			tip = tip.replace("$parameter1$", jiacheng);
			this._viewUI.jiacheng_htm.innerHTML = tip;
			this._viewUI.mainRoleRed.value = HudModel.getInstance().hpNum / HudModel.getInstance().maxHpNum;//生命值
			this._viewUI.mainRoleBule.value = HudModel.getInstance().mpNum / HudModel.getInstance().maxMpNum;//魔法值
			this._viewUI.mainRoleYellow.value = HudModel.getInstance().spNum / HudModel.getInstance().maxSpNum;//愤怒值
		}
		/**解锁新功能 */
		public unlockFunction(level: number): void {
			switch (level) {
				case unlock.SKILL_LEVEL:
					//技能
					ModuleManager.hide(ModuleNames.Chat);
					this.disappearMessageTipsMediator.xingongneng();
					this._viewUI.mengban_img.visible = true;
					this._viewUI.unlockSkill_btn.visible = true;
					Laya.Tween.to(this._viewUI.unlockSkill_btn, { x: 549, y: 19 }, 1500, null, Laya.Handler.create(this, function () {
						this._viewUI.unlockSkill_btn.visible = false;
						this._viewUI.mengban_img.visible = false;
						this._viewUI.mainSkill_btn.visible = true;
						// ModuleManager.show(ModuleNames.Chat, this._app);
					}), null, false);
					this.sortBtn(level);
					break;
				case unlock.BANGPAI_LEVEL:
					//帮会
					ModuleManager.hide(ModuleNames.Chat);
					this.disappearMessageTipsMediator.xingongneng();
					this._viewUI.mengban_img.visible = true;
					this._viewUI.unlockBangpai_btn.visible = true;
					Laya.Tween.to(this._viewUI.unlockBangpai_btn, { x: 449, y: 19 }, 1500, null, Laya.Handler.create(this, function () {
						this._viewUI.unlockBangpai_btn.visible = false;
						this._viewUI.mengban_img.visible = false;
						this._viewUI.mainBanpai_btn.visible = true;
						// ModuleManager.show(ModuleNames.Chat, this._app);
					}), null, false);
					this.sortBtn(level);
					break;
				case unlock.ZHUZHAN_LEVEL:
					//助战
					ModuleManager.hide(ModuleNames.Chat);
					this.disappearMessageTipsMediator.xingongneng();
					this._viewUI.mengban_img.visible = true;
					this._viewUI.unlockZhuzhan_btn.visible = true;
					Laya.Tween.to(this._viewUI.unlockZhuzhan_btn, { x: 549, y: 19 }, 1500, null, Laya.Handler.create(this, function () {
						this._viewUI.unlockZhuzhan_btn.visible = false;
						this._viewUI.mengban_img.visible = false;
						this._viewUI.mainZhuzhan_btn.visible = true;
						// ModuleManager.show(ModuleNames.Chat, this._app);
					}), null, false);
					this.sortBtn(level);
					break;
				case unlock.ACTIVITY_LEVEL:
					//活动
					ModuleManager.hide(ModuleNames.Chat);
					this.disappearMessageTipsMediator.xingongneng();
					this._viewUI.unlockHuodong_btn.visible = true;
					this._viewUI.mengban_img.visible = true;
					Laya.Tween.to(this._viewUI.unlockHuodong_btn, { x: 1, y: -11 }, 1500, null, Laya.Handler.create(this, function () {
						this._viewUI.unlockHuodong_btn.visible = false;
						this._viewUI.mengban_img.visible = false;
						this._viewUI.mainActivity_btn.visible = true;
						// ModuleManager.show(ModuleNames.Chat, this._app);
					}), null, false);
					this.sortBtn(level);
					break;
				case unlock.GUAJI_LEVEL:
					//挂机
					ModuleManager.hide(ModuleNames.Chat);
					this.disappearMessageTipsMediator.xingongneng();
					this._viewUI.mengban_img.visible = true;
					this._viewUI.unlockGuaji_btn.visible = true;
					Laya.Tween.to(this._viewUI.unlockGuaji_btn, { x: 2, y: 291 }, 1500, null, Laya.Handler.create(this, function () {
						this._viewUI.unlockGuaji_btn.visible = false;
						this._viewUI.mengban_img.visible = false;
						this._viewUI.mainGuaji_btn.visible = true;
						// ModuleManager.show(ModuleNames.Chat, this._app);
					}), null, false);
					this.sortBtn(level);
					break;
				case unlock.PAIHANG_LEVEL:
					//排行榜
					ModuleManager.hide(ModuleNames.Chat);
					this.disappearMessageTipsMediator.xingongneng();
					this._viewUI.mengban_img.visible = true;
					this._viewUI.unlockPaihang_btn.visible = true;
					Laya.Tween.to(this._viewUI.unlockPaihang_btn, { x: 240, y: 19 }, 1500, null, Laya.Handler.create(this, function () {
						this._viewUI.unlockPaihang_btn.visible = false;
						this._viewUI.mengban_img.visible = false;
						this._viewUI.mainPaihang_btn.visible = true;
						// ModuleManager.show(ModuleNames.Chat, this._app);
					}), null, false);
					this.sortBtn(level);
					break;
				case unlock.QIANGHUA_LEVEL:
					//强化
					ModuleManager.hide(ModuleNames.Chat);
					this.disappearMessageTipsMediator.xingongneng();
					this._viewUI.mengban_img.visible = true;
					this._viewUI.unlockQianghua_btn.visible = true;
					Laya.Tween.to(this._viewUI.unlockQianghua_btn, { x: 136, y: 19 }, 1500, null, Laya.Handler.create(this, function () {
						this._viewUI.unlockQianghua_btn.visible = false;
						this._viewUI.mengban_img.visible = false;
						this._viewUI.mainQianghua_btn.visible = true;
						// ModuleManager.show(ModuleNames.Chat, this._app);
					}), null, false);
					this.sortBtn(level);
					break;
				case unlock.EXPUP_LEVEL:
					this._viewUI.serverExpUp_img.visible = true;//经验加成
					this.sortBtn(level);
					break;

			}
		}
		/**按钮排序 */
		public sortBtn(level: number): void {
			if (level >= unlock.START_LEVEL && level < unlock.SKILL_LEVEL) {
				this._viewUI.mainJiangli_btn.y = pos.YPOS_1;
				this._viewUI.mainAchievent_btn.y = pos.YPOS_2;
			} else if (level >= unlock.SKILL_LEVEL && level < unlock.BANGPAI_LEVEL) {
				this._viewUI.mainSkill_btn.x = pos.XPOS_1;
				this._viewUI.mainJiangli_btn.y = pos.YPOS_1;
				this._viewUI.mainAchievent_btn.y = pos.YPOS_2;
			} else if (level >= unlock.BANGPAI_LEVEL && level < unlock.ZHUZHAN_LEVEL) {
				this._viewUI.mainSkill_btn.x = pos.XPOS_1;
				this._viewUI.mainBanpai_btn.x = pos.XPOS_2;
				this._viewUI.mainJiangli_btn.y = pos.YPOS_1;
				this._viewUI.mainAchievent_btn.y = pos.YPOS_2;
			} else if (level >= unlock.ZHUZHAN_LEVEL && level < unlock.ACTIVITY_LEVEL) {
				this._viewUI.mainZhuzhan_btn.x = pos.XPOS_1;
				this._viewUI.mainSkill_btn.x = pos.XPOS_2;
				this._viewUI.mainBanpai_btn.x = pos.XPOS_3;
				this._viewUI.mainJiangli_btn.y = pos.YPOS_1;
				this._viewUI.mainAchievent_btn.y = pos.YPOS_2;
			} else if (level >= unlock.ACTIVITY_LEVEL && level < unlock.GUAJI_LEVEL) {
				this._viewUI.mainZhuzhan_btn.x = pos.XPOS_1;
				this._viewUI.mainSkill_btn.x = pos.XPOS_2;
				this._viewUI.mainBanpai_btn.x = pos.XPOS_3;
				this._viewUI.mainActivity_btn.y = pos.YPOS_1;
				this._viewUI.mainJiangli_btn.y = pos.YPOS_2;
				this._viewUI.mainAchievent_btn.y = pos.YPOS_3;
			} else if (level >= unlock.GUAJI_LEVEL && level < unlock.PAIHANG_LEVEL) {
				this._viewUI.mainZhuzhan_btn.x = pos.XPOS_1;
				this._viewUI.mainSkill_btn.x = pos.XPOS_2;
				this._viewUI.mainBanpai_btn.x = pos.XPOS_3;
				this._viewUI.mainActivity_btn.y = pos.YPOS_1;
				this._viewUI.mainJiangli_btn.y = pos.YPOS_2;
				this._viewUI.mainAchievent_btn.y = pos.YPOS_3;
				this._viewUI.mainGuaji_btn.y = pos.YPOS_4;
			}
			else if (level >= unlock.PAIHANG_LEVEL && level < unlock.QIANGHUA_LEVEL) {
				this._viewUI.mainZhuzhan_btn.x = pos.XPOS_1;
				this._viewUI.mainSkill_btn.x = pos.XPOS_2;
				this._viewUI.mainBanpai_btn.x = pos.XPOS_3;
				this._viewUI.mainPaihang_btn.x = pos.XPOS_4;
				this._viewUI.mainActivity_btn.y = pos.YPOS_1;
				this._viewUI.mainJiangli_btn.y = pos.YPOS_2;
				this._viewUI.mainAchievent_btn.y = pos.YPOS_3;
				this._viewUI.mainGuaji_btn.y = pos.YPOS_4;
			} else if (level >= unlock.QIANGHUA_LEVEL) {
				this._viewUI.mainZhuzhan_btn.x = pos.XPOS_1;
				this._viewUI.mainSkill_btn.x = pos.XPOS_2;
				this._viewUI.mainBanpai_btn.x = pos.XPOS_3;
				this._viewUI.mainPaihang_btn.x = pos.XPOS_4;
				this._viewUI.mainQianghua_btn.x = pos.XPOS_5;
				this._viewUI.mainActivity_btn.y = pos.YPOS_1;
				this._viewUI.mainJiangli_btn.y = pos.YPOS_2;
				this._viewUI.mainAchievent_btn.y = pos.YPOS_3;
				this._viewUI.mainGuaji_btn.y = pos.YPOS_4;
			}
		}
		/**任务初始化 参数1为是否为天机仙令倒计时刷新的 , 参数2为精英副本是否通关*/
		public onRefreshTaskList(istianji?: number, isLeaveCopy?: boolean): void {
			if (game.modules.task.models.TaskModel.getInstance().isRefreshSpecialQuest) {
				game.modules.task.models.TaskModel.getInstance().isRefreshSpecialQuest = false;
			}
			this._viewUI.leaveCopy_btn.visible = false;
			var arr: Array<any> = [];
			this.alltasklist = [];
			this.htmltest = [];
			let num: number = 0;
			if (HudModel.getInstance().taskxl == 1 && !HudModel.InHandUpMap) {	//是否是巡逻状态
				this._app.sceneRoot.hangup = 0
				if (istianji)
					this._app.sceneObjectMgr.mainUnit.xunluo = 3
				else
					this._app.sceneObjectMgr.mainUnit.xunluo = 2
				HudModel.getInstance().taskxl = 0
			}
			this.removetaskbtn();
			this.removeFuBenBtn();
			//判断是否在精英副本地图中
			if (ActivityModel._instance.JingYingNpc.get(models.HudModel.getInstance().sceneid) || isLeaveCopy) {
				this._viewUI.leaveCopy_btn.visible = true;
				this.createFuBenBtn(isLeaveCopy);
			} else {
				/**日常副本引导 */
				if (Taskmodels.getInstance().taskStateDic.get(500602) != undefined) {
					//如果任务栏是收缩的，弹出
					if (this._viewUI.showTask_btn.visible)
						this.showMiddleBox();
					this.richangYindao();
					Taskmodels.getInstance().taskStateDic.remove(500602);
				} else if (Taskmodels.getInstance().taskStateDic.get(501301) != undefined || Taskmodels.getInstance().taskStateDic.get(501401) != undefined) {
					//如果开始引导时，底部是收缩状态，展开
					if (this._viewUI.mainSystem_btn.visible == true)
						this.showBottomBox();
					this.skillYindao(3);//专精技能引导(包括宠物和人物专精)
					Taskmodels.getInstance().taskStateDic.remove(501301);
				} else if (Taskmodels.getInstance().taskStateDic.get(500104) != undefined) {
					//如果开始引导时，底部是收缩状态，展开
					if (this._viewUI.mainSystem_btn.visible == true)
						this.showBottomBox();
					this.skillYindao(2);//生活技能引导
					Taskmodels.getInstance().taskStateDic.remove(500104);
				}
				if (this.firsttaskid != 0) {//未执行一系列任务
					if (Taskmodels.getInstance().maintask.get(this.firsttaskid)) {//是否是主线
						let maininfo: MissionCMainMissionInfoBaseVo = Taskmodels.getInstance().missionCMainMissionInfoData[this.firsttaskid]
						let taskstate: game.modules.task.models.MissionInfoVo = Taskmodels.getInstance().maintask.get(this.firsttaskid)
						if (taskstate.missionstatus == 4) {//是否完成
							this.htmltest.push(game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(maininfo.TaskInfoTraceListA, taskstate.missionvalue, 2));
							this.createbtn(num, maininfo.MissionName, game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(maininfo.TaskInfoTraceListA, taskstate.missionvalue, 2), this.firsttaskid)
							num++
						}
						else {
							this.htmltest.push(maininfo.TaskInfoTraceListA)
							this.createbtn(num, maininfo.MissionName, maininfo.TaskInfoTraceListA, this.firsttaskid)
							num++
						}
						this.alltasklist.push(this.firsttaskid)
					}
					else if (Taskmodels.getInstance().schooltask.get(this.firsttaskid)) {//是否是循环任务
						let task: game.modules.task.models.SRefreshSpecialQuestVo = Taskmodels.getInstance().schooltask.get(this.firsttaskid)
						let schoolinfo: CRepeatTaskBaseVo = Taskmodels.getInstance().cRepeatTaskData[task.questtype];
						this.htmltest.push(schoolinfo.strtaskdestrack)
						this.createbtn(num, schoolinfo.strtaskname, schoolinfo.strtaskdestrack, this.firsttaskid)
						num++
						this.alltasklist.push(this.firsttaskid)
					}
					else if (Taskmodels.getInstance().accepttask.get(this.firsttaskid)) {//是否是支线任务
						let accepttasks: MissionCMainMissionInfoBaseVo = Taskmodels.getInstance().missionCMainMissionInfoData[this.firsttaskid];
						let taskstate: game.modules.task.models.MissionInfoVo = Taskmodels.getInstance().accepttask.get(this.firsttaskid)
						this.htmltest.push(game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(accepttasks.TaskInfoTraceListA, taskstate.missionvalue, 2))
						this.createbtn(num, accepttasks.MissionName, game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(accepttasks.TaskInfoTraceListA, taskstate.missionvalue, 2), this.firsttaskid)
						num++
						this.alltasklist.push(this.firsttaskid)
					}
				}
				if (Taskmodels.getInstance().maintask.keys.length) {//主线
					for (let key in Taskmodels.getInstance().maintask.keys) {
						let maininfo: MissionCMainMissionInfoBaseVo = Taskmodels.getInstance().missionCMainMissionInfoData[Taskmodels.getInstance().maintask.keys[key]]
						let taskstate: game.modules.task.models.MissionInfoVo = Taskmodels.getInstance().maintask.get(Taskmodels.getInstance().maintask.keys[key])
						if (this.firsttaskid == Taskmodels.getInstance().maintask.keys[key])//是否为执行一系列任务的
							continue;
						if (taskstate.missionstatus == 4) {//是否完成
							this.htmltest.push(game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(maininfo.TaskInfoTraceListA, taskstate.missionvalue, 2));
							this.createbtn(num, maininfo.MissionName, game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(maininfo.TaskInfoTraceListA, taskstate.missionvalue, 2), Taskmodels.getInstance().maintask.keys[key])
							num++
						}
						else {
							this.htmltest.push(maininfo.TaskInfoTraceListA)
							this.createbtn(num, maininfo.MissionName, maininfo.TaskInfoTraceListA, Taskmodels.getInstance().maintask.keys[key])
							num++
						}
						this.alltasklist.push(Taskmodels.getInstance().maintask.keys[key])
					}
				}
				if (Taskmodels.getInstance().schooltask.keys.length) {//推荐任务
					for (let key in Taskmodels.getInstance().schooltask.keys) {
						let task: game.modules.task.models.SRefreshSpecialQuestVo = Taskmodels.getInstance().schooltask.get(Taskmodels.getInstance().schooltask.keys[key])
						let schoolinfo: CRepeatTaskBaseVo = Taskmodels.getInstance().cRepeatTaskData[task.questtype];
						if (this.firsttaskid == Taskmodels.getInstance().schooltask.keys[key])//是否为执行一系列任务的
							continue;
						this.htmltest.push(schoolinfo.strtaskdestrack)
						this.createbtn(num, schoolinfo.strtaskname, schoolinfo.strtaskdestrack, Taskmodels.getInstance().schooltask.keys[key])
						num++
						this.alltasklist.push(Taskmodels.getInstance().schooltask.keys[key])
					}
				}
				if (game.modules.tianjixianling.models.TianJiXianLingModel.getInstance().tjxlInfoData.jointime != 0 && mainhud.models.HudModel.getInstance().levelNum >= 50) {//天机仙令
					let allcount: CSchoolTaskBaseVo
					let ishave: number = 0 //0为无
					let strinfo1: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11500]
					let strinfo2: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11592]
					let _taskCount = game.modules.tianjixianling.models.TianJiXianLingModel._instance.tjxlInfoData.times;//获取天机仙令累积完成次数
					let _round = Math.ceil(_taskCount / 8);//获得天机仙令任务当前处于的轮数值
					if (_taskCount % 8 == 0 && _taskCount < 160) {
						_round += 1;
					}
					else if (_taskCount == 160) {
						_round = 20;
					}
					let str1 = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(strinfo1.msg, _round, 11);
					let str2 = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(strinfo2.msg, _taskCount, 11);
					for (var index = 20; index <= 27; index++) {
						allcount = game.modules.task.models.TaskModel.getInstance().cSchoolTaskData[index]
						//是否满足等级
						if (allcount.levelmin <= mainhud.models.HudModel.getInstance().levelNum && allcount.levelmax >= mainhud.models.HudModel.getInstance().levelNum) {
							ishave = 1
							break;
						}
					}
					if (ishave == 1) {//是否满足等级									
						str1 = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str1, 20, 13)
						str2 = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str2, allcount.maxnum, 13)
					}
					this.createbtn(num, str1, str2, 1080000)
					num++
					this.alltasklist.push(1080000)
					//天机仙令某轮小任务数据
					let _someRoundTasks = game.modules.tianjixianling.models.TianJiXianLingModel.getInstance().someRoundTasks;
					for (var index = 0; index < _someRoundTasks.length; index++) {
						ishave = 0
						let anye: AnYeTaskVo = _someRoundTasks[index]
						if (anye.legend == 2 || anye.pos == Taskmodels.getInstance().tjxltansuo) {//处于探索状态	
							var anyetask: CAnYeMaXiTuanConfBaseVo = game.modules.tianjixianling.models.TianJiXianLingModel._instance.tjxlConfig[anye.id]
							let title: string = anyetask.followtitle
							let content: string
							if (anye.legend == 3)//是否完成
								content = anyetask.dialogdessuccess
							else if (anye.legend == 4)//是否失败
								content = anyetask.dialogdesfail
							else
								content = anyetask.dialogdes
							var _mapId: number = game.modules.task.models.TaskModel.getInstance().tjxlExploreMapId;
							let mapinfo: WorldMapConfigBaseVo = game.modules.mapworld.models.MapModel.getInstance().WorldMapConfigData[_mapId]
							let iteminfo: ItemAttrBaseVo = game.modules.bag.models.BagModel.getInstance().itemAttrData[anye.dstitemid]
							if (iteminfo) {	//是否需要道具信息					
								content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, iteminfo.name, 6);
								content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, anye.dstitemnum, 9);
								let ishave: number = 0;
								if (iteminfo.itemtypeid == 25) {//道具类型 5为任务道具 1为普通背包道具
									var bag: game.modules.bag.models.BagVo = game.modules.bag.models.BagModel.getInstance().bagMap[5]
									for (var index = 0; index < bag.items.length; index++) {
										let item: game.modules.bag.models.ItemVo = bag.items[index]
										if (item.id == anye.dstitemid) {
											content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, item.number, 8);
											ishave = 1;
											break;
										}
									}
								}
								else {
									var bag: game.modules.bag.models.BagVo = game.modules.bag.models.BagModel.getInstance().bagMap[1]
									for (var index = 0; index < bag.items.length; index++) {
										let item: game.modules.bag.models.ItemVo = bag.items[index]
										if (item.id == anye.dstitemid) {
											content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, item.number, 8);
											ishave = 1;
											break;
										}
									}
								}
								if (ishave == 0) {//是否拥有
									content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, 0, 8);
								}
							}
							if (mapinfo) {//地图
								content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, mapinfo.mapName, 15);
							}
							var _date = new Date();
							var nums = _date.getTime()
							var date = new Date(anye.legendend - nums)
							var str = date.getMinutes() + ":" + date.getSeconds()
							Laya.timer.loop(1000, this, this.reducetimer, [content, anye.legendend, anye.id])
							this.lastimer = str
							content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, str, 16);
							this.createbtn(num, title, content, anye.id)
							num++
							this.alltasklist.push(anye.id)
							this.tjxlpos = anye.pos
							break;
						}
					}
				}
				if (Taskmodels.getInstance().accepttask.keys.length) {//支线任务
					for (let key in Taskmodels.getInstance().accepttask.keys) {
						let accepttasks: MissionCMainMissionInfoBaseVo = Taskmodels.getInstance().missionCMainMissionInfoData[Taskmodels.getInstance().accepttask.keys[key]];
						let taskstate: game.modules.task.models.MissionInfoVo = Taskmodels.getInstance().accepttask.get(Taskmodels.getInstance().accepttask.keys[key])
						if (this.firsttaskid == Taskmodels.getInstance().accepttask.keys[key])//是否执行一系列任务
							continue;
						this.htmltest.push(game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(accepttasks.TaskInfoTraceListA, taskstate.missionvalue, 2))
						this.createbtn(num, accepttasks.MissionName, game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(accepttasks.TaskInfoTraceListA, taskstate.missionvalue, 2), Taskmodels.getInstance().accepttask.keys[key])
						num++
						this.alltasklist.push(Taskmodels.getInstance().accepttask.keys[key])
					}
				}
			}
			this._viewUI.mainTask_panel.vScrollBarSkin = ""
			this._viewUI.mainTask_panel.vScrollBar.elasticDistance = 50
			this._viewUI.mainTask_panel.vScrollBar.elasticBackTime = 200
			HudModel.getInstance().autobatt.init()
			if (HudModel.getInstance().joingame == 1) {//是否界面加载完毕
				game.scene.models.SceneProxy.getInstance().event(game.scene.models.TASK_TIPS)
			}
			HudModel.getInstance().isrefreshall++
		}
		//**定时器减少时间 天机仙令限时*/
		public reducetimer(content: string, timer: number, taskid: number) {
			var _date = new Date();
			var nums = _date.getTime()
			if (timer - nums <= 0) {//时间是否超过
				Laya.timer.clear(this, this.reducetimer)
				return;
			}
			this.onRefreshTaskList(1)
		}
		/** 商城数据加载 */
		public getShopArr(): void {
			RequesterProtocols._instance.c2s_query_limit(1, game.modules.shop.models.ShopModel.getInstance().shangHuiArr);
			RequesterProtocols._instance.c2s_query_limit(1, game.modules.shop.models.ShopModel.getInstance().shangChengArr);
		}
		/** 推送数据加载 */
		public tuiSongOn(): void {
			game.modules.createrole.models.LoginModel.getInstance().isMainInit = true;
			var _tuiSongSettingBinDic = game.modules.activity.models.ActivityModel.getInstance().TuiSongSettingBinDic;
			var _activityNewBinDic = game.modules.activity.models.ActivityModel.getInstance().ActivityNewBinDic;
			var date = new Date();
			var time = date.toLocaleDateString();
			var day = date.getDay();
			//date中的周日为0，表中的周日为7
			if (day == 0) {
				day = 7;
			}
			for (var num in _tuiSongSettingBinDic) {
				var account = LocalStorage.getItem("daowang_userLoginAccount");
				if (LocalStorage.getItem(account + num) != null) {
					//arr内容信息---0为是否开启推送，1为是否已经推送完毕，2为活动ID
					var arr: Array<any> = LocalStorage.getItem(account + num).split("_");
					if (arr[TuiSongMessage.ISOPEN] != "1") continue;
					if (arr[TuiSongMessage.ISTUISONG] == "1") continue;
					if (_activityNewBinDic[parseInt(arr[TuiSongMessage.ACTID])] != undefined && HudModel.getInstance().levelNum < _activityNewBinDic[parseInt(arr[TuiSongMessage.ACTID])].level) continue;
					var actId = game.modules.activity.models.ActivityModel.getInstance().CheculedActivityBinDicAtActId.get(arr[TuiSongMessage.ACTID]);
					for (var i: number = 0; i < actId.length; i++) {
						//weekrepeat-----0表示节日，1-7为普通周循环周1-周日
						if (actId[i].weekrepeat == day) {
							let actMessage = new game.modules.activity.models.ActMessageVo();
							actMessage.startTime = time + " " + actId[i].startTime;
							actMessage.startTime2 = time + " " + actId[i].startTime2;
							actMessage.endTime = time + " " + actId[i].endTime;
							actMessage.num = num;
							game.modules.activity.models.ActivityModel.getInstance().actTuiSongInfos.set(parseInt(arr[TuiSongMessage.ACTID]), actMessage);
						}
					}
				}
			}
			this.actDetection();
		}
		/** 推送循环检测 */
		public seconds: number = 0;
		public actLoop() {
			if (this.seconds == 30) {
				this.actDetection();
			}
			this.seconds++;
		}
		/** 判断时间并按要求弹出活动推送窗口 */
		public actDetection(): void {
			this.seconds = 0;
			// var time = new Date().getTime();
			var _actTuiSongInfos = game.modules.activity.models.ActivityModel.getInstance().actTuiSongInfos;
			RequesterProtocols._instance.c2s_CGameTime();
			models.HudProxy.getInstance().once(models.SERVER_TIME, this, (time) => {
				for (var i: number = 0; i < _actTuiSongInfos.keys.length; i++) {
					var id = _actTuiSongInfos.keys[i];
					var num = _actTuiSongInfos.values[i].num;
					var account = LocalStorage.getItem("daowang_userLoginAccount");
					//正式开启时间
					var startTime2 = new Date(_actTuiSongInfos.values[i].startTime2).getTime();
					//活动结束时间
					var endTime = new Date(_actTuiSongInfos.values[i].endTime).getTime();
					if (LocalStorage.getItem(account + num) != null &&
						LocalStorage.getItem(account + num).split("_")[TuiSongMessage.ISTUISONG] != "1") {
						//console.log("------服务器时间：", time);
						//console.log("------活动" + id + "开启时间：", startTime2);
						//console.log("------活动" + id + "结束时间：", endTime);
						//科举乡试-需要另外服务器下发的协议判断
						if (id == ImpExamType.IMPEXAM_VILL_INSERVER && game.modules.keju.models.KejuModel.getInstance().impexamtype != ImpExamType.IMPEXAM_VILL) { continue }
						//科举会试-需要另外服务器下发的协议判断
						else if (id == ImpExamType.IMPEXAM_PROV_INSERVER && game.modules.keju.models.KejuModel.getInstance().impexamtype != ImpExamType.IMPEXAM_PROV) { continue }
						else if (startTime2 > time || time > endTime) { continue }
						//设置本地数据表示该活动已推送完毕
						var str = LocalStorage.getItem(account + num).split("_")[TuiSongMessage.ISOPEN] + "_1_" + id;
						LocalStorage.setItem(account + num, str);
						//打开蒙版
						this.openMengban();
						//活动参加弹窗
						this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
						this._TipsMessageMediator.show();
						var param: Dictionary = new Dictionary();
						var parameArr: Array<string> = [];
						parameArr.push(game.modules.activity.models.ActivityModel.getInstance().ActivityNewBinDic[id].name);
						param.set("contentId", Intra_ProgramString.ACT_START);
						param.set("parame", parameArr);
						this._TipsMessageMediator.showContent(param);
						this._TipsMessageMediator.counTime(29);
						game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_CANCEL, this, this.onCancle);
						game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.onSure, [id]);
						return;
					}
				}
			});
		}
		private onSure(id: number): void {
			// game.modules.tips.models.TipsProxy.getInstance().off(game.modules.tips.models.TIPS_ON_CANCEL, this, this.onCancle);
			this.closeMengban();
			this.seconds = 0;
			game.modules.activity.models.ActivityProxy.getInstance().event(game.modules.activity.models.TUISONG_TIAOZHUAN_EVENT, id);
			this.actDetection();
		}

		private onCancle(): void {
			// game.modules.tips.models.TipsProxy.getInstance().off(game.modules.tips.models.TIPS_ON_OK, this, this.onSure);
			this.closeMengban();
			this.seconds = 0;
			this.actDetection();
		}
		/** 清除飘窗时间间隔 */
		public clearTimeNum(): void {
			this.timeNum = 0;
		}
		/** 飘窗事件监听 */
		public regestEvent(promoto: string, id?: number): void {
			var time = this.timeNum * 500;
			this.timeNum += 1;
			if (!id) {
				Laya.timer.once(time, this, this.showTips, [promoto], false);
			}
			else {
				Laya.timer.once(time, this, this.showTips, [promoto, id], false);
			}
		}
		/** 飘窗显示 */
		public showTips(promoto: string, id?: number): void {
			let disappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
			if (!id) {
				disappearMessageTipsMediator.onShow(promoto);
			} else {
				disappearMessageTipsMediator.onShow(promoto, id);
			}
		}
		/** 特殊副本结算骰子窗口 */
		public teamRollMelon(): void {
			if (modules.team.models.TeamModel.getInstance().melonlist.length > 0) {
				for (var i: number = 0; i < modules.team.models.TeamModel.getInstance().melonlist.length; i++) {
					var rollMelon = modules.team.models.TeamModel.getInstance().melonlist[i];
					RequesterProtocols._instance.c2s_CTeamRollMelon(rollMelon.melonid, 1);
				}
			}
			// if (modules.team.models.TeamModel.getInstance().melonlist.length > 0 && this.dataNum < modules.team.models.TeamModel.getInstance().melonlist.length) {
			// 	var rollMelon = modules.team.models.TeamModel.getInstance().melonlist[this.dataNum];
			// 	this.jieSuanMediator = new game.modules.commonUI.ZhanDouJieSuanMediator(this._app, rollMelon);
			// 	this.jieSuanMediator.jieSuanView();
			// 	this.dataNum++;
			// 	game.modules.team.models.TeamProxy.getInstance().once(game.modules.team.models.JS_CANCEL, this, this.jsCancel, [rollMelon.melonid, modules.team.models.TeamModel.getInstance().melonlist.length]);
			// 	game.modules.team.models.TeamProxy.getInstance().once(game.modules.team.models.JS_OK, this, this.jsOk, [rollMelon.melonid, modules.team.models.TeamModel.getInstance().melonlist.length]);
			// } else if (modules.team.models.TeamModel.getInstance().melonlist.length <= this.dataNum) {
			// 	this.dataNum = 0;
			// }
		}
		/** 结算取消按钮 */
		public jsCancel(melonid: number, arrLength: number): void {
			game.modules.team.models.TeamProxy.getInstance().off(game.modules.team.models.JS_OK, this, this.jsOk);
			RequesterProtocols._instance.c2s_CTeamRollMelon(melonid, 0);
			this.teamRollMelon();
		}
		/** 结算确定摇骰按钮 */
		public jsOk(melonid: number, arrLength: number): void {
			game.modules.team.models.TeamProxy.getInstance().off(game.modules.team.models.JS_CANCEL, this, this.jsCancel);
			RequesterProtocols._instance.c2s_CTeamRollMelon(melonid, 1);
			this.teamRollMelon();
		}
		/** npc对话弹窗 */
		public showNpcTips(messageId: number, landname: string): void {
			//打开蒙版
			this.openMengban();
			this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
			this._TipsMessageMediator.show();
			var param: Dictionary = new Dictionary();
			param.set("contentId", messageId);
			if (landname) {
				var parameArr: Array<string> = [];
				parameArr.push(landname);
				param.set("parame", parameArr);
				game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_CANCEL, this, this.onTipsCancel);
				game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.onTipsSure, [true]);
			} else {
				this._TipsMessageMediator.setBtnVisi();
				game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.onTipsSure);
			}
			this._TipsMessageMediator.showContent(param);
		}
		/** npc对话弹窗-取消按钮 */
		public onTipsCancel(): void {
			this.closeMengban();
			game.modules.tips.models.TipsProxy.getInstance().off(game.modules.tips.models.TIPS_ON_OK, this, this.onTipsSure);
		}
		/** npc对话弹窗-确定按钮 */
		public onTipsSure(isSend: boolean): void {
			this.closeMengban();
			game.modules.tips.models.TipsProxy.getInstance().off(game.modules.tips.models.TIPS_ON_CANCEL, this, this.onTipsCancel);
			if (isSend) RequesterProtocols._instance.c2s_drop_instance();
		}
		public removetaskbtn() {
			for (var index = 0; index < this.tasklistkey.length; index++) {
				this._viewUI.mainTask_panel.removeChildByName("btn" + this.tasklistkey[index])
				this._viewUI.mainTask_panel.removeChildByName("label" + this.tasklistkey[index])
				this._viewUI.mainTask_panel.removeChildByName("html" + this.tasklistkey[index])
			}
			this.tasklistkey = []
			this.lastbtn = null
		}
		/** 删除精英副本任务栏进度 */
		public removeFuBenBtn() {
			if (this._viewUI.mainTask_panel.getChildByName("FBbtn")) {
				this._viewUI.mainTask_panel.removeChildByName("FBbtn");
				this._viewUI.mainTask_panel.removeChildByName("FBlabel");
				this._viewUI.mainTask_panel.removeChildByName("FBhtml");
			}
		}
		/** 进入精英副本任务栏添加进度 */
		public createFuBenBtn(isOver?: boolean) {
			var sceneid = models.HudModel.getInstance().sceneid;
			// var questdata: game.modules.task.models.ActiveQuestDataVo = ActivityModel.getInstance().questdata;
			var newnpclist = game.scene.models.SceneModel.getInstance().newnpclist;
			// let npcinfo: CNPCConfigBaseVo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[questdata.dstnpcid] as CNPCConfigBaseVo;
			let npcinfo: CNPCConfigBaseVo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[newnpclist.values[0].id] as CNPCConfigBaseVo;
			var npcArr = ActivityModel._instance.JingYingNpc.get(models.HudModel.getInstance().sceneid);
			var index: number;
			for (var i: number = 0; i < npcArr.length; i++) {
				var jingYingConfigBaseVo: game.data.template.JingyingConfigBaseVo = npcArr[i];
				// if (jingYingConfigBaseVo.solonpcid == questdata.dstnpcid) index = i + 1;
				if (jingYingConfigBaseVo.solonpcid == newnpclist.values[0].id) index = i + 1;
			}
			var btn: Button = new Button();
			btn.skin = "common/ui/mainhud/renwuxuanzhong2.png";
			btn.stateNum = 2;
			btn.name = "FBbtn";
			btn.sizeGrid = "20,20,20,20";
			btn.width = 248;
			btn.y = 7;
			// if (!modules.activity.models.ActivityModel.getInstance().isOver) {
			if (!isOver) {
				var label: Label = new Label();
				label.text = "精英副本-进度(" + index + "/5)";
				label.x = 10;
				label.name = "FBlabel";
				label.y = 9;
				label.font = "SimHei";
				label.color = "#ffeb10";
				label.fontSize = 23;
				btn.addChild(label);
			} else {
				btn.removeChild(label);
			}
			let html: Laya.HTMLDivElement = new Laya.HTMLDivElement();
			// if (!modules.activity.models.ActivityModel.getInstance().isOver) {
			if (!isOver) {
				// btn.on(LEvent.CLICK, this, this.searchNpc, [sceneid, questdata.dstnpcid]);
				btn.on(LEvent.CLICK, this, this.searchNpc, [sceneid, newnpclist.values[0].id]);
				html.innerHTML = "<span style='color:#fff2df;fontSize:23'>请前往击败</span><span style='color:#00ff00;fontSize:23'>" + npcinfo.name + "</span>";
			} else {
				btn.on(LEvent.CLICK, this, this.leaveCopy);
				html.innerHTML = "<span style='color:#ffeb10;fontSize:23'>副本已完成</span>";
			}
			html.width = 221;
			html.y = 35;
			html.x = 11;
			html.name = "FBhtml";
			btn.height = html.contextHeight + 51;
			html.mouseEnabled = false;
			html.mouseThrough = true;
			btn.addChild(html);
			this._viewUI.mainTask_panel.addChild(btn);
		}
		/** 副本寻路 */
		public searchNpc(sceneid: number, npcid: number) {
			let inTeamGroup = HudModel.getInstance().chargeInGroup();
			if (inTeamGroup) {
				let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[PromptExplain.IN_TEAM_GROUP];
				game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, [chattext.msg]);
				return;
			}
			this._app.sceneRoot.istask = 2;
			mainhud.models.HudModel._instance.useapp = this._app;
			game.modules.mainhud.models.HudModel.getInstance().jumpmap(sceneid, npcid);
		}
		/** 离开精英副本 */
		public leaveCopy() {
			let inTeamGroup = HudModel.getInstance().chargeInGroup();
			if (inTeamGroup) {
				let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[PromptExplain.IN_TEAM_GROUP];
				game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, [chattext.msg]);
				return;
			}
			RequesterProtocols._instance.c2s_req_goto(1651, 149, 24);
		}
		/** 创建副本按钮 */
		public createbtn(index: number, tasktitle: string, tasktext: string, taskkey: number): void {//box btn		
			var btn: Button = new Button()
			btn.skin = "common/ui/mainhud/renwuxuanzhong2.png"
			btn.stateNum = 2
			btn.name = "btn" + taskkey
			btn.sizeGrid = "20,20,20,20"
			btn.width = 248
			btn.on(LEvent.CLICK, this, this.onTaskSelect, [index])
			if (this.lastbtn == null) {
				btn.y = 115 * index
				this.lastbtn = btn
			}
			else {
				btn.y = this.lastbtn.y + this.lastbtn.height
				this.lastbtn = btn
			}

			var label: Label = new Label()
			label.text = tasktitle
			label.x = 10
			label.name = "label" + taskkey
			label.y = 9
			label.font = "SimHei"
			if (taskkey >= 180101 && taskkey < 190000) {
				label.color = "#FF00FF"
			}
			else {
				label.color = "#ffeb10"
			}
			label.fontSize = 23
			btn.addChild(label)
			let html: Laya.HTMLDivElement = new Laya.HTMLDivElement()
			html.width = 221
			let str: string = tasktext
			if (taskkey >= 1010000 && taskkey <= 1070000) {//循环任务
				let info: game.modules.task.models.SRefreshSpecialQuestVo = Taskmodels.getInstance().schooltask.get(taskkey);
				let schoolinfo: CRepeatTaskBaseVo = Taskmodels.getInstance().cRepeatTaskData[info.questtype];
				let titleinfo: string = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(schoolinfo.strtasktitletrack, info.round, 2);
				let allcount: CSchoolTaskBaseVo = game.modules.task.models.TaskModel.getInstance().cSchoolTaskData[schoolinfo.nacceptchatid]
				let mapinfo: WorldMapConfigBaseVo = game.modules.mapworld.models.MapModel.getInstance().WorldMapConfigData[info.dstmapid]
				let npcinfo: CNPCConfigBaseVo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[info.dstnpcid];
				let petinfo: PetCPetAttrBaseVo = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[info.dstitemid]
				let iteminfo: ItemAttrBaseVo = game.modules.bag.models.BagModel.getInstance().itemAttrData[info.dstitemid]
				if (mapinfo) {//地图
					str = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str, mapinfo.mapName, 3);
				}
				if (npcinfo) {//npc
					str = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str, npcinfo.name, 4);
				}
				if (petinfo) {//宠物
					let petnum: number = 0
					str = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str, petinfo.name, 5);
					for (let key in PetModel.getInstance().pets.keys) {
						let pet: game.modules.pet.models.PetInfoVo = PetModel.getInstance().pets.get(PetModel.getInstance().pets.keys[key])
						if (pet.key == game.modules.createrole.models.LoginModel.getInstance().roleDetail.petIndex) {
							continue;
						}
						if (pet.id == petinfo.id) {
							petnum++;
						}
					}
					str = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str, petnum, 8);
					str = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str, 1, 9);
				}
				if (iteminfo) {//道具
					str = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str, iteminfo.name, 6);
					if (info.dstitemid != 0 || info.dstitemidnum2 != 0) {
						if (info.dstitemidnum2 != 0)
							str = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str, info.dstitemidnum2, 9);
						else if (info.dstitemnum != 0)
							str = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str, info.dstitemnum, 9);
						else
							str = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str, info.dstitemid2, 9);
						var _dataKeys = Object.keys(game.modules.tianjixianling.models.TianJiXianLingModel._instance.findItemConfig);
						for (let i = 0; i < _dataKeys.length; i++) {
							let cirinfo: CCircTaskItemFindBaseVo = game.modules.tianjixianling.models.TianJiXianLingModel._instance.findItemConfig[_dataKeys[i]]
							if (cirinfo.ctgroup == schoolinfo.ngroupid && cirinfo.levelmin <= mainhud.models.HudModel.getInstance().levelNum && cirinfo.levelmax >= mainhud.models.HudModel.getInstance().levelNum) {
								str = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str, mainhud.models.HudModel.getInstance().levelNum * cirinfo.nqualitya / 1000 - cirinfo.nqualityb, 14);
								break;
							}
						}
						//去背包查看是否有该道具					
						let ishave: number = 0;
						let bags: game.modules.bag.models.BagVo
						if (iteminfo.itemtypeid == 25) {
							bags = game.modules.bag.models.BagModel.getInstance().bagMap[5]
							for (var index = 0; index < bags.items.length; index++) {
								let item: game.modules.bag.models.ItemVo = bags.items[index]
								if (item.id == info.dstitemid) {
									str = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str, item.number, 8);
									ishave = 1;
									break;
								}
							}
						}
						else {
							bags = game.modules.bag.models.BagModel.getInstance().bagMap[1]
							for (var index = 0; index < bags.items.length; index++) {
								let item: game.modules.bag.models.ItemVo = bags.items[index]
								if (item.id == info.dstitemid) {
									str = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str, item.number, 8);
									ishave = 1;
									break;
								}
							}
						}
						if (ishave == 0) {
							str = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str, 0, 8);
						}
					}
				}
				if (allcount) {//任务的总数
					titleinfo = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(titleinfo, allcount.maxnum, 7)
					label.text = titleinfo
				}
			}
			else if (taskkey >= 180101 && taskkey < 190000) {//主任务，判断是否是收集道具的
				let maininfo: MissionCMainMissionInfoBaseVo = Taskmodels.getInstance().missionCMainMissionInfoData[taskkey]
				if (maininfo.MissionType == 40) { //40为与npc战斗
					var img: Laya.Image = new Laya.Image();
					img.skin = "common/ui/mainhud/mainui_zhan.png";
					img.x = 210;
					img.y = -2;
					img.width = 40;
					img.height = 40;
					btn.addChild(img);
				}
				let taskstate: game.modules.task.models.MissionInfoVo = Taskmodels.getInstance().maintask.get(taskkey)
				if (taskstate.missionstatus == 3) {
					str = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str, taskstate.missionvalue, 2);
				}
			}
			html.innerHTML = str;
			html.y = 35
			html.x = 11
			html.name = "html" + taskkey
			btn.height = html.contextHeight + 51
			html.mouseEnabled = false
			html.mouseThrough = true
			this.tasklistkey.push(taskkey)
			btn.addChild(html)
			this._viewUI.mainTask_panel.addChild(btn)
		}

		/**这个是用来提示有多种加经验的情况 */
		public onExpMessageTips(e: any): void {
			var data: hanlder.S2C_exp_messagetips = HudModel.getInstance().SExpMessageTipsData.get("data");
			var exp = data.expvalue;
			let promoto = HudModel.getInstance().promptAssembleBack(data.messageid, [exp]);
			let chatmessageNotify = new game.modules.chat.models.ChatMessageNotifyVo;
			chatmessageNotify.messageid = data.messageid;
			chatmessageNotify.parameters = [exp];
			ChatModel._instance.systemMsgList.push(chatmessageNotify);
			let isBattle = battle.BattleProxy.inBattle; //是否处于战斗中
			if (!isBattle) this.disappearMessageTipsMediator.onShow(promoto, 2);
			else {
				ChatModel.getInstance().battleEndTips.set(data.messageid, promoto);

			}
		}
		/** 通知客户端刷新人物经验*/
		public onRefreshUserExp(e: any): void {
			this._viewUI.exp_pro.value = HudModel.getInstance().expNum / this.expObj[parseInt(this._viewUI.mainRoleLevel.text)].nextexp;//经验条
		}
		private shop() {
			ModuleManager.show(ModuleNames.SHOP, this._app);
		}
		private activity() {
			ModuleManager.show(ModuleNames.ACTIVITY, this._app);
		}
		private rewardShow() {
			ModuleManager.show(ModuleNames.REWARD, this._app);
		}
		/** 组队邀请弹窗确认
		 * @param roleName 受邀人
		 * @param roleLevel 受邀者等级
		 * @param op 邀请类型
		 */
		private _ShowConfirmWindow(roleName?: string, roleLevel?: number, op?: number,leaderid:number = 0 ): void {
			if (typeof (roleName) != "undefined") {
				if (op == InviteType.NORMAL_INVITE) {/** 普通弹窗邀请 */
					// let array: Array<any> = [];
					// array.push(roleName); array.push(roleLevel);
					// let prompt = mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.INVITE_JOIN_TEAM, array);
					// // let prompt = "玩家"+ roleName+"( " + roleLevel+"级 ) 邀请你加入他的队伍,是否接受？";
					// let rightBtnName = mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.AGREE);
					// let leftBtnName = mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.REJECT);
					// this._remindViewMediator.onShow(prompt, rightBtnName, leftBtnName);
					// this._remindViewMediator.addSecond(20);
					this._showConfirmTeamApply(roleName,roleLevel);
					this._remindViewMediator.on(game.modules.commonUI.LEFT_BUTTON_EVENT, this, this.rejectRespond, [ConfirmWindowType.CONFIRM_INVITE]);
					this._remindViewMediator.on(game.modules.commonUI.RIGHT_BUTTON_EVENT, this, this.agreeRespond, [ConfirmWindowType.CONFIRM_INVITE]);
				} else if (op == InviteType.FORCE_INVITE) {/** 强制邀请 */
					this.agreeRespond();
				}else if(op == InviteType.INVITE_FRIEND && leaderid != 0)
				{
					this._showConfirmTeamApply(roleName,roleLevel);
					this._remindViewMediator.on(game.modules.commonUI.LEFT_BUTTON_EVENT, this, this.rejectRespond, [ConfirmWindowType.CONFIRM_INVITE]);
					this._remindViewMediator.on(game.modules.commonUI.RIGHT_BUTTON_EVENT, this, this.agreeRespond, [ConfirmWindowType.AGREE_RESPONSE,leaderid]);
					
				}
					
			} else {/** 召唤队员回归  */
				let prompt = this.teamInfo[0].rolename + "要召唤你归队，是否同意？";
				let rightBtnName = "接受";
				let leftBtnName = "拒绝";
				this._remindViewMediator.onShow(prompt, rightBtnName, leftBtnName);
				this._remindViewMediator.addSecond(30);
				this._remindViewMediator.on(game.modules.commonUI.LEFT_BUTTON_EVENT, this, this.rejectRespond, [ConfirmWindowType.CONFIRM_INVITE]);
				this._remindViewMediator.on(game.modules.commonUI.RIGHT_BUTTON_EVENT, this, this.agreeRespond, [ConfirmWindowType.AGREE_RESPONSE]);
			}


		}
		/** 响应邀请弹窗确认 
		 * @param roleName 申请人
		 * @param roleLevel 申请者等级
		 */
		private _showConfirmTeamApply(roleName:string,roleLevel:number):void
		{
			let array: Array<any> = [];
			array.push(roleName); array.push(roleLevel);
			let prompt = mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.INVITE_JOIN_TEAM, array);
			// let prompt = "玩家"+ roleName+"( " + roleLevel+"级 ) 邀请你加入他的队伍,是否接受？";
			let rightBtnName = mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.AGREE);
			let leftBtnName = mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.REJECT);
			this._remindViewMediator.onShow(prompt, rightBtnName, leftBtnName);
			this._remindViewMediator.addSecond(20);
		}

		public rolemove(e: any): void {
			let mainUnit: Unit = this._app.sceneObjectMgr.mainUnit;
			mainUnit.SetPosX(e.x);
			mainUnit.SetPosY(e.y);
			mainUnit.SetPos(e.x, e.y);
			this._app.sceneObjectMgr.joinFakeMap(game.modules.mainhud.models.HudModel.getInstance().movesceneid, mainUnit.pos.x, mainUnit.pos.y);
		}
		/** 
		 * 拒绝组队邀请
		 * @param type 拒绝类型
		 */
		private rejectRespond(type?: number): void {
			if (typeof (type) != "undefined") {
				switch (type) {
					case ConfirmWindowType.CONFIRM_INVITE:/** 拒绝邀请入队 */
						RequesterProtocols._instance.c2s_CRespondInvite(0);
						break;
					case ConfirmWindowType.CONFIRM_BACKTEAM:/** 拒绝归队 */
						RequesterProtocols._instance.c2s_CAnswerforCallBack(0);
						break;

					default:
						break;
				}
			}
			this._remindViewMediator.off(game.modules.commonUI.LEFT_BUTTON_EVENT, this, this.rejectRespond);
		}
		/** 同意邀请 */
		private agreeRespond(type?: number,leaderid:number = 0): void {
			if (typeof (type) != "undefined") {
				switch (type) {
					case ConfirmWindowType.CONFIRM_INVITE:/** 同意邀请入队 */
						RequesterProtocols._instance.c2s_CRespondInvite(1);
						break;
					case ConfirmWindowType.CONFIRM_BACKTEAM: /**同意归队 */
						RequesterProtocols._instance.c2s_CAbsentReturnTeam(2);
						break;
					case ConfirmWindowType.AGREE_RESPONSE: /** 同意邀请并进行申请 */
						if( leaderid != 0) 
						RequesterProtocols._instance.c2s_CRequestJoinTeam(leaderid);//申请入队
						break;
					default:
						break;
				}
			} else {/** 类型未定义 */
				RequesterProtocols._instance.c2s_CRespondInvite(1);
			}
			this._remindViewMediator.off(game.modules.commonUI.LEFT_BUTTON_EVENT, this, this.agreeRespond);
		}

		private paimai(): void {
			ModuleManager.show(ModuleNames.SALE, this._app);
		}

		private qianghua(): void {
			ModuleManager.show(ModuleNames.STRENG_THENING, this._app);
		}

		private bigMap() {
			//世界地图
			//game.modules.mainhud.models.HudProxy.getInstance();	
			ModuleManager.show(ModuleNames.MAP_WORLD, this._app);
		}
		private showSmallMap(): void {
			this._smallmapUI = new game.modules.mapworld.SmallMapMediator(this._app);
			this._smallmapUI.show();
		}
		public changemap(): void {
			// let mainUnit: Unit = this._app.sceneObjectMgr.mainUnit;		
			if (models.HudModel.getInstance().pos) {
				this._viewUI.mainMapPos.text = models.HudModel.getInstance().pos.x.toFixed(0) + "," + models.HudModel.getInstance().pos.y.toFixed(0);
				this._viewUI.mainMapName.text = models.HudModel.getInstance().mapname;
			}
		}
		/**
		 * 显示挂机系统界面
		 */
		private showGuaJi(): void {
			ModuleManager.show(ModuleNames.GUA_JI, this._app);
			//RequesterProtocols._instance.c2s_CReqNewHandBattle();
		}
		// private hookHandler(e: any): void {
		// 	//console.log("MainHudModule hookHandler", e);
		// 	//this._app.battleMgr.start();			
		//     /*var curPos:any = {};
		//     curPos.x = 100;
		//     curPos.y = 100;
		// 	RequesterProtocols._instance.c2s_check_move(curPos,[curPos,curPos],101);*/
		// 	RequesterProtocols._instance.c2s_CReqNewHandBattle();
		// }
		private chatHandler(): void {
			//  game.modules.chat.models.ChatProxy.getInstance();
			ModuleManager.show(ModuleNames.Chat, this._app);
		}
		private AchieventHandler(): void {
			game.modules.achievent.models.AchieventProxy.getInstance();
			ModuleManager.show(ModuleNames.ACHIEVENT, this._app);
			RequesterProtocols._instance.c2s_get_archive_info();
		}
		//主界面任务按钮
		private mainTaskHandler(e: any): void {
			//console.log("mainTaskHandler", e);
			if (this._viewUI.mainTask_panel.visible) {
				ModuleManager.show(ModuleNames.TASK, this._app);
			}
			let _isMatch = mainhud.models.HudModel.getInstance().isMatch;
			if (this._viewUI.teamMtch_img.visible && _isMatch) {
				this._viewUI.teamMtch_img.visible = false;
			}
			this._viewUI.mainTeam_btn.selected = false;
			this._viewUI.mainTask_btn.selected = true;
			this._viewUI.mainTask_panel.visible = true
			this._viewUI.mainTeamList.visible = false;
		}
		/** 主界面队伍按钮 */
		private mainTeamHandler(e: any): void {
			//console.log("mainTeamHandler", e);
			this.teamInfo = TeamModel.getInstance().TeamRoleInfoStorage;
			if (this.yindaoId == YinDaoEnum.RICHANG_YINDAO) {
				this.closeAni();
			}
			if (this.teamInfo.length == 0) {
				ModuleManager.show(ModuleNames.Team, this._app);
				/** 如果匹配状态下不更新数据 */
				if (!this._viewUI.teamMtch_img.visible && !mainhud.models.HudModel.getInstance().isMatch) this.getTeamData();
			} else if (this._viewUI.mainTeamList.visible) {
				ModuleManager.show(ModuleNames.Team, this._app);
			} else {
				this.getTeamData();
			}
			this._viewUI.mainTask_btn.selected = false;
			this._viewUI.mainTeam_btn.selected = true;
			this._viewUI.mainTask_panel.visible = false;
			/** 不共存 */
			if (!this._viewUI.teamMtch_img.visible && !mainhud.models.HudModel.getInstance().isMatch) {
				this._viewUI.mainTeamList.visible = true;
			} else {
				this._viewUI.mainTeamList.visible = false;
			}
			let _isMatch = mainhud.models.HudModel.getInstance().isMatch;
			if (_isMatch) {
				this._viewUI.teamMtch_img.visible = true;
			}
		}
		private onTaskSelect(index: number): void {
			if (this.yindaoId == YinDaoEnum.RENWU_YINDAO)
				this.closeAni();
			mainhud.models.HudModel.getInstance().autobatt.stop()
			this._app.sceneRoot.isnpc = 1
			if (AutoHangUpModels.getInstance().autotask == 0) {
				AutoHangUpModels.getInstance().notaketimer = 0;
			}
			let role: game.scene.models.RoleBasicVo = game.scene.models.SceneModel.getInstance().rolelist.get(game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);
			let team: game.scene.models.TeamOctetsVo = role.rolebasicOctets.datas.get(2);
			if (team) {
				if (team.teamindexstate > 0) {//在队伍中 暂离的话值为负数
					if ((team.teamindexstate >> 4) != 1) {//141216
						let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[141216];
						this.tips.onShow(chattext.msg);
						return;
					}
				}
			}
			mainhud.models.HudModel._instance.taskid = this.alltasklist[index]
			this._app.sceneRoot.istask = 2;
			mainhud.models.HudModel._instance.useapp = this._app
			if (this.alltasklist[index] >= 180000 && this.alltasklist[index] <= 190000) {//主线
				AutoHangUpModels.getInstance().istaskwalk = 0//主线任务
				this._app.sceneRoot.isnpc = 1
				let info: MissionCMainMissionInfoBaseVo = game.modules.task.models.TaskModel.getInstance().missionCMainMissionInfoData[this.alltasklist[index]]
				this.firsttaskid = info.PostMissionList[0]
				mainhud.models.HudModel._instance.eventid = info.id;
				mainhud.models.HudModel._instance.tasktype = info.MissionType
				mainhud.models.HudModel._instance.desnpc.x = info.ActiveInfoLeftPos
				mainhud.models.HudModel._instance.desnpc.y = info.ActiveInfoTopPos
				mainhud.models.HudModel._instance.npcid = info.ActiveInfoNpcID
				mainhud.models.HudModel._instance.jumpmapid = info.ActiveInfoMapID;
				mainhud.models.HudModel._instance.taskstart();
			}
			else if (this.alltasklist[index] == 1080000) {//跳转天机仙令接取窗口
				AutoHangUpModels.getInstance().istaskwalk = 0
				mainhud.models.HudModel._instance.jumpmapid = 0;
				mainhud.models.HudModel._instance.npcid = 0
				mainhud.models.HudModel._instance.eventid = 1080000
				mainhud.models.HudModel._instance.tasktype = -1;
				mainhud.models.HudModel._instance.taskstart();
			}
			else if (this.alltasklist[index] >= 1010000 && this.alltasklist[index] <= 1160000) {//推荐任务
				AutoHangUpModels.getInstance().istaskwalk = 2//循环任务
				this._app.sceneRoot.isnpc = 1
				AutoHangUpModels.getInstance().tasktype = this.alltasklist[index]//循环任务类型
				let schooltaskinfo: game.modules.task.models.SRefreshSpecialQuestVo = game.modules.task.models.TaskModel.getInstance().schooltask.get(this.alltasklist[index]);
				let info: CRepeatTaskBaseVo = game.modules.task.models.TaskModel.getInstance().cRepeatTaskData[schooltaskinfo.questtype]
				this.firsttaskid = schooltaskinfo.questid
				mainhud.models.HudModel._instance.eventid = schooltaskinfo.questtype;
				mainhud.models.HudModel._instance.tasktype = info.etasktype
				mainhud.models.HudModel._instance.desnpc.x = schooltaskinfo.dstx
				mainhud.models.HudModel._instance.desnpc.y = schooltaskinfo.dsty
				mainhud.models.HudModel._instance.npcid = schooltaskinfo.dstnpcid
				mainhud.models.HudModel._instance.jumpmapid = schooltaskinfo.dstmapid;
				mainhud.models.HudModel._instance.taskstart();
			}
			else if (this.alltasklist[index] >= 2100202 && this.alltasklist[index] <= 2511202) {//天机仙令任务判断
				var anyetask: CAnYeMaXiTuanConfBaseVo = game.modules.tianjixianling.models.TianJiXianLingModel._instance.tjxlConfig[this.alltasklist[index]]
				let anye: AnYeTaskVo = game.modules.tianjixianling.models.TianJiXianLingModel.getInstance().someRoundTasks[this.tjxlpos]
				let cirinfo: CCircTaskItemCollectBaseVo = game.modules.tianjixianling.models.TianJiXianLingModel._instance.collectItemConfig[anyetask.group]
				var _mapId: number = game.modules.task.models.TaskModel.getInstance().tjxlExploreMapId;
				if (anye.legend == 2) {
					mainhud.models.HudModel._instance.jumpmapid = _mapId;
				}
				else
					mainhud.models.HudModel._instance.jumpmapid = 0;
				mainhud.models.HudModel._instance.npcid = 0
				mainhud.models.HudModel._instance.eventid = this.alltasklist[index]
				mainhud.models.HudModel._instance.tasktype = -1;
				mainhud.models.HudModel._instance.taskstart();
			}
			else {//支线
				let feederinfo: game.modules.task.models.MissionInfoVo = game.modules.task.models.TaskModel.getInstance().accepttask.get(this.alltasklist[index]);
				let info: MissionCMainMissionInfoBaseVo = game.modules.task.models.TaskModel.getInstance().missionCMainMissionInfoData[this.alltasklist[index]]
				this.firsttaskid = info.PostMissionList[0]
				mainhud.models.HudModel._instance.eventid = info.id;
				mainhud.models.HudModel._instance.tasktype = info.MissionType
				mainhud.models.HudModel._instance.desnpc.x = info.ActiveInfoLeftPos
				mainhud.models.HudModel._instance.desnpc.y = info.ActiveInfoTopPos
				mainhud.models.HudModel._instance.npcid = info.ActiveInfoNpcID
				mainhud.models.HudModel._instance.jumpmapid = info.ActiveInfoMapID;
				mainhud.models.HudModel._instance.taskstart();
			}
		}
		private onTeamSelect(index: number): void {
			//console.log("队伍当前索引:" + index);
			// //console.log("选中的box:" + selBox);			
		}

		//隐藏中间板块
		private hideMiddleBox(): void {
			//console.log("隐藏中间板块");
			var _showMiddleBox = this._viewUI.showTask_btn;
			Laya.Tween.to(this._viewUI.middleBox, { x: -400 }, 100);

			setTimeout(function () {
				_showMiddleBox.visible = true;
			}, 101);
		}
		//显示底部板块
		private showMiddleBox(): void {
			//console.log("隐藏中间板块");
			Laya.Tween.to(this._viewUI.middleBox, { x: 0 }, 230);
			this._viewUI.showTask_btn.visible = false;

		}
		//显示底部板块
		private showBottomBox(): void {
			var _mainShowicon = this._viewUI.mainShowicon;
			Laya.Tween.clearAll(_mainShowicon);
			if (_mainShowicon.tag == null) {
				Laya.Tween.to(_mainShowicon, { rotation: 360 }, 200);
				Laya.Tween.to(_mainShowicon, { scaleX: 0.5, scaleY: 0.5 }, 50, null, Laya.Handler.create(this, function () {
					Laya.Tween.to(_mainShowicon, { scaleX: 1, scaleY: 1 }, 50);
				}));

				var _mainSystem_btn = this._viewUI.mainSystem_btn;
				var _mainBottomBox = this._viewUI.mainBottomBox
				Laya.Tween.to(_mainBottomBox, { x: 568 }, 300, Laya.Ease.bounceIn, Laya.Handler.create(this, function () {
					_mainBottomBox.visible = false;
					_mainSystem_btn.visible = true;
				}));

				_mainShowicon.tag = 1;

			} else {
				Laya.Tween.to(_mainShowicon, { rotation: 225 }, 200);
				Laya.Tween.to(_mainShowicon, { scaleX: 0.5, scaleY: 0.5 }, 50, null, Laya.Handler.create(this, function () {
					Laya.Tween.to(_mainShowicon, { scaleX: 1, scaleY: 1 }, 50);
				}));

				var _mainSystem_btn = this._viewUI.mainSystem_btn;
				var _mainBottomBox = this._viewUI.mainBottomBox
				Laya.Tween.to(_mainBottomBox, { x: 0 }, 300);

				_mainBottomBox.visible = true;
				_mainSystem_btn.visible = false;

				_mainShowicon.tag = null;
			}
		}
		/** 主界面聊天信息
		 * @param type 频道类型
		 */
		private onGetChatData(type: number): void {
			//console.log("主界面聊天数据下发类型...." + type);
			// this.msgType = type;
			if (type != ChannelType.CHANNEL_SYSTEM) {/** 这里需要做类型判断(接收频道的开关是否关闭) */
				let _whetherShow = HudModel.getInstance().whertherShow(type);
				if (!_whetherShow) return;
			}
			this._viewUI.chatList_panel.vScrollBarSkin = "";
			// if(this.chatData.length > 5) this.chatData.shift();
			if (type == ChannelType.CHANNEL_SYSTEM) {
				// this.sysData = modules.chat.models.ChatModel.getInstance().systemMsgList;
				var sysdata: Array<any> = modules.chat.models.ChatModel.getInstance().systemMsgList;
				try {
					sysdata[sysdata.length - 1].messigeid;
					if (sysdata == null) return;
					this.chatData.push(sysdata[sysdata.length - 1]);
				} catch (error) {
					//console.log('捕获类型异常处理，执行系统聊天的类型...');
					var Sysdata: Array<any> = modules.chat.models.ChatModel.getInstance().SystemMsgList;
					if (Sysdata == null) return;
					this.chatData.push(Sysdata[Sysdata.length - 1]);
				}
			} else {
				var data: Array<any> = modules.chat.models.ChatModel.getInstance().chatList.get(type);
				if (data == null) return;
				this.chatData.push(data[data.length - 1]);
			}
			if (this.chatData.length == 0) return;
			if (this._viewUI.chat_shadow_img.hasListener(LEvent.MOUSE_DOWN)) {/** 判断当前ui是否存在监听，有则移除 */
				this._viewUI.chat_shadow_img.off(LEvent.MOUSE_DOWN, this, this.showChatSelectRender);
			}
			this._viewUI.chatList_panel.visible = true;
			this._viewUI.chatList_panel.vScrollBar.elasticDistance = 100;
			this._viewUI.chatList_panel.vScrollBar.elasticBackTime = 200;
			this.showChatRender(this.chatData.length - 1);

		}
		/** 选中数据显示聊天界面 */
		private showChatSelectRender(): void {
			ModuleManager.show(ModuleNames.Chat, this._app);
		}

		/** 
		 * 系统消息下发
		 */
		private onRefreshSystemData(optcode: number, msg: hanlder.S2C_trans_chatmessagenotify2client): void {
			// this._chatViewMediator.getSystemData();
			var data = ChatModel._instance.chatMessageTips[msg.chatmessagenotify2client.messageid];

			if (data == null) return;
			var dataType: string = data.type;
			//console.log("主界面的提示消息下发dataType--------", dataType)
			//接收跑马灯信息
			if (data.type == 18) {
				let msgId = msg.chatmessagenotify2client.messageid;
				var parame = msg.chatmessagenotify2client.parameters;
				let promt = HudModel.getInstance().promptAssembleBack(msgId, parame);
				var terminalX: number = 0;
				var visbleX: number = 530;
				this._viewUI.gonggao_htm.innerHTML = promt;
				Laya.Tween.to(this._viewUI.gonggao_htm, { x: visbleX }, 100, null, Laya.Handler.create(this, function () {
					this._viewUI.gonggao_img.visible = true;
					this._viewUI.gonggao_htm.visible = true;
				}), null, false);
				Laya.Tween.to(this._viewUI.gonggao_htm, { x: terminalX }, 5000, null, Laya.Handler.create(this, function () {
					this._viewUI.gonggao_img.visible = false;
					this._viewUI.gonggao_htm.visible = false;
					this._viewUI.gonggao_htm.x = this.px;
					this._viewUI.gonggao_htm.y = this.py;
				}), null, false);

			}
			var arr: Array<string> = dataType.split(",");
			for (var key of arr) {
				// if (Number(key) == 15) {
				if (Number(key) == TipsMsgType.TIPS_SYS_CHANNEL || Number(key) == TipsMsgType.TIPS_SYSBOARD) {
					//console.log("主界面来了======类型=15");
					this.onGetChatData(ChannelType.CHANNEL_SYSTEM);
				}
			}
		}
		/** 
		 * 主界面聊天渲染
		 * @param index 当前渲染下标
		 */
		private showChatRender(index: number): void {
			if (index != this.chatData.length - 1) return;
			let mainChatImg: Laya.Image = new Laya.Image;
			mainChatImg.x = 90;
			mainChatImg.y = 5;
			mainChatImg.height = 29;
			mainChatImg.width = 615;
			let logo: Laya.Image = new Laya.Image;
			logo.x = 2;
			logo.y = 1;
			let content: Laya.HTMLDivElement = new Laya.HTMLDivElement;
			content.x = 3;
			content.y = -1;
			content.width = 615;
			/** 频道资源加载 */
			HudModel.getInstance().getChannelImg(logo, this.chatData[index].messagetype);
			if (this.chatData[index].messagetype && this.chatData[index].messagetype != ChannelType.CHANNEL_SYSTEM && typeof (this.chatData[index].roleid) == "number") {/** 判断是否是系统消息 */
				let arr = this.chatData[index].message.split("*split");
				/** 切割主线求助信息 */
				let qiuZhu = this.chatData[index].message.split("*qz");
				/** 队伍一键喊话切割 */
				let teamyell = this.chatData[index].message.split("#,");
				/** 智慧试炼求助切割->帮派频道 */
				let kejuHelp = this.chatData[index].message.split(",fq,");
				/** 天机仙令求助信息 */
				let tianji = this.chatData[index].message.split("^");
				let isTeamYell = false;
				let apply_btn = new Laya.Button;
				let apply_btn2 = new Laya.Button;
				mainChatImg.addChild(content);
				if (teamyell && teamyell.length == 7) {/** 是队伍的一键喊话信息 添加申请按钮 */
					isTeamYell = true;
					apply_btn.label = "[申请加入]";
					ChatModel.getInstance().SetBtnAtribute(apply_btn, "#7bcf2d");
					let html = "<img src ='' style = 'width:48px;height:1px'></img>" + "<span style='font:24px ;color:#87CEFA;SimHei'>【" + this.chatData[index].rolename + "】</span>"
					html += "<span style='font:24px ;color:#ffffff'>[ " + teamyell[0] + "</span>";
					html += "<span style='color:#ffffff;fontSize:24'>(" + teamyell[1] + "/5),</span>";
					html += "<span style='color:#ffffff;fontSize:24'>等级" + teamyell[2] + "-" + teamyell[3] + "开组了! </span>";
					html += "<span style='color:#ffffff;fontSize:24'>" + teamyell[4] + " ]</span>";
					content.style.leading = 3;
					content.innerHTML = html;
					let lastwordXpos = content._childs[5]._text.words[content._childs[5]._text.words.length - 1]._x + content._childs[5]._text.words[content._childs[5]._text.words.length - 1]._w;
					HudModel.getInstance().setApplyBtnPos(5, apply_btn, content);
					// apply_btn.x = lastwordXpos + content.x + 2;
					// // apply_btn.scaleX = 1.17;
					// // apply_btn.y = content.y + content._childs[5]._text.words[content._childs[5]._text.words.length - 1]._y;
					// let contentwidth = lastwordXpos + apply_btn.width; //加入按钮后的实际宽度
					// /** 判断按钮显示位置，是否需要换行 */
					// if(contentwidth > content.contextWidth )
					// {
					// 	let hang = content.contextHeight / 27; //行数行高27 = 字体大小24+行间距3
					// 	{/** 换行处理 */
					// 		content.contextHeight = content.contextHeight + apply_btn.height +content.style.leading;
					// 		apply_btn.x = content.x ;
					// 	    apply_btn.y = content.y + (content.style.leading +24)* hang +3;
					// 	}
					// }else
					// {/** 不需要特殊处理 */
					// 	   apply_btn.y = content.y + content._childs[5]._text.words[content._childs[5]._text.words.length - 1]._y + 3;
					// }
					mainChatImg.addChild(apply_btn);
					apply_btn.on(LEvent.CLICK, this, HudModel.getInstance().onApplyJoinTeam, [teamyell[5]]);
					content.on(LEvent.CLICK, this, this.onRequestTeamInfo, [teamyell[6]]);

				} else if (kejuHelp && kejuHelp.length == 4) {
					// apply_btn.scaleX = 1.17;
					apply_btn.label = "[回答问题]";
					ChatModel.getInstance().SetBtnAtribute(apply_btn, "#ff6600");
					let questionId = Number(kejuHelp[0]);//题目Id
					let examtype = kejuHelp[3];
					let data = KejuModel.getInstance().getExamConfigData(examtype);
					let html = "<img src ='' style = 'width:48px;height:1px'></img>";
					html += "<span style='font:24px ;color:#87CEFA;SimHei'>【" + kejuHelp[1] + "】</span>";
					html += "<span style='font:24px ;color:#ff6600'>" + data[questionId].name + "</span>";
					content.style.leading = 3;
					content.innerHTML = html;
					mainChatImg.addChild(apply_btn);
					let lastwordXpos = content._childs[2]._text.words[content._childs[2]._text.words.length - 1]._x + content._childs[2]._text.words[content._childs[2]._text.words.length - 1]._w;
					HudModel.getInstance().setApplyBtnPos(2, apply_btn, content);
					// apply_btn.x = lastwordXpos + content.x  + 30;

					// // apply_btn.y = content.y + content._childs[2]._text.words[content._childs[2]._text.words.length - 1]._y;
					// let contentwidth = lastwordXpos + apply_btn.width; //加入按钮后的实际宽度
					// /** 判断按钮显示位置，是否需要换行 */
					// if(contentwidth > content.contextWidth )
					// {
					// 	let hang = content.contextHeight / 27; //行数行高27 = 字体大小24+行间距3
					// 	{/** 换行处理 */
					// 		content.contextHeight = content.contextHeight + apply_btn.height +content.style.leading;
					// 		apply_btn.x = content.x ;
					// 	    apply_btn.y = content.y + (content.style.leading +24)* hang +3;
					// 	}
					// }else
					// {/** 不需要特殊处理 */
					// 	    apply_btn.y = content.y + content._childs[2]._text.words[content._childs[2]._text.words.length-1]._y +3;
					// }
					apply_btn.on(LEvent.CLICK, this, ChatModel.getInstance().onShowKejuTitle, [kejuHelp[0], kejuHelp[3], kejuHelp[1], kejuHelp[2], this._app]);
					content.on(LEvent.CLICK, this, this.showChatSelectRender);
				} else if (tianji && (tianji.length == 8 || tianji.length == 2)) {/** 天机仙令 */
					let rolename = this.chatData[index].rolename;
					let html = "<img src ='' style = 'width:48px;height:1px'></img>";
					html += "<span style='font:24px ;color:#87CEFA;SimHei'>【" + this.chatData[index].rolename + "】</span>"
					html += "<span style='font:24px ;color:#87CEFA'>" + rolename + "</span>";
					html += "<span style='font:24px ;color:#ffff00'>发布了任务求助信息</span>";
					let taskId = tianji[0];
					let tasktype = game.modules.tianjixianling.models.TianJiXianLingModel.getInstance().tjxlConfig[taskId].tasktype;
					let taskname = game.modules.tianjixianling.models.TianJiXianLingModel.getInstance().tjxlConfig[taskId].strtasknameui;
					html += "<span style='font:24px ;color:#33cc00'>" + taskname + "</span>";
					if (tasktype != -1 && tasktype == TaskType.Pet) //需求
					{
						html += "<span style='font:24px ;color:#000000'>需求</span>";
						let targetId = tianji[6];
						let targetNum = tianji[7];
						let petName = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[targetId].name;
						html += "<span style='font:24px ;color:#33cc00'>" + petName + "x" + targetNum + "</span>";
						content.innerHTML = html;
						HudModel.getInstance().setApplyBtnPos(6, apply_btn, content);
						apply_btn.on(LEvent.CLICK, this, ChatModel.getInstance().responseTJXLHelp, [tasktype, tianji[6], tianji[0], this._app, this._viewUI, this.chatData[index].roleid]);
					} else if (tasktype != -1 && tasktype == TaskType.Item) {
						html += "<span style='font:24px ;color:#000000'>需求</span>";
						let targetId = tianji[6];
						let targetNum = tianji[7];
						let itemName = game.modules.bag.models.BagModel.getInstance().itemAttrData[targetId].name;
						html += "<span style='font:24px ;color:#33cc00'>" + itemName + "x" + targetNum + "</span>";
						content.innerHTML = html;
						HudModel.getInstance().setApplyBtnPos(6, apply_btn, content);
						apply_btn.on(LEvent.CLICK, this, ChatModel.getInstance().responseTJXLHelp, [tasktype, tianji[6], tianji[0], this._app, this._viewUI, this.chatData[index].roleid]);
					} else if (tasktype != -1 && tasktype == TaskType.NPC) {
						content.innerHTML = html;
						HudModel.getInstance().setApplyBtnPos(4, apply_btn, content);
						apply_btn.on(LEvent.CLICK, this, ChatModel.getInstance().responseTJXLHelp, [tasktype, 0, 0, this._app, this._viewUI, this.chatData[index].roleid]);
					}
					if (tasktype == TaskType.Item || tasktype == TaskType.Pet)
						apply_btn.label = "[帮助完成]";
					else if (tasktype == TaskType.NPC)
						apply_btn.label = "[申请加入]";
					ChatModel.getInstance().SetBtnAtribute(apply_btn, "#ffff00");
					content.style.leading = 3;
					mainChatImg.addChild(apply_btn);
				} else if (arr.length == 2 && this.chatData[index].displayinfos.length != 0) {/** 分享之有点击事件*/
					let share_btn = new Laya.Button;
					var facehtml = arr[1];
					if ((arr[1].indexOf("@") != -1)) {
						facehtml = ChatModel.getInstance().getFaceHtmlText(arr[1]);
					}
					/** 主界面聊天颜色默认为白色 */
					arr[0] = arr[0].replace("#000000", "#f6f6f4");
					/** 根据长度计算按钮长度 */
					let len = facehtml.length;
					share_btn.width = 18.5 * len;
					share_btn.height = 24;
					share_btn.skin = "";
					// share_btn.scaleX = 1.17;
					share_btn.labelSize = 24;
					share_btn.labelAlign = "left";
					share_btn.labelColors = arr[0];
					share_btn.label = facehtml;
					share_btn.mouseEnabled = true;
					share_btn.mouseThrough = false;
					mainChatImg.addChild(share_btn);
					content.innerHTML = "<img src ='' style = 'width:48px;height:1px'></img>" + "<span style='font:22px ;color:#87CEFA;SimHei'>【" + this.chatData[index].rolename + "】</span>";
					let x = content._childs[1]._text.words[content._childs[1]._text.words.length - 1]._x + content._childs[1]._text.words[content._childs[1]._text.words.length - 1]._w;
					share_btn.x = x + content.x + 20;
					share_btn.y = content.y + content._childs[1]._text.words[content._childs[1]._text.words.length - 1]._y;
					share_btn.on(LEvent.CLICK, this, this.onMainProp, [this.chatData[index].displayinfos[0], this.chatData[index].message, this.chatData[index].roleid]);
				} else if (arr.length == 2) {/** 正常输入切割 */
					var facehtml = arr[1];
					if ((arr[1].indexOf("@") != -1)) {
						facehtml = ChatModel.getInstance().getFaceHtmlText(arr[1]);
					}
					/** 主界面聊天颜色默认为白色 */
					arr[0] = arr[0].replace("#000000", "#f6f6f4");
					content.innerHTML = "<img src ='' style = 'width:48px;height:1px'></img>" + "<span style='font:22px ;color:#87CEFA;SimHei'>【" + this.chatData[index].rolename + "】</span>" + "<span style='font:22px;color:" + arr[0] + "; SimHei'>" + facehtml + " </span> ";
				} else if (qiuZhu && qiuZhu.length > 1) {
					ChatModel.getInstance().SetBtnAtribute(apply_btn, "#888817");
					ChatModel.getInstance().SetBtnAtribute(apply_btn2, "#ff6600");
					apply_btn.label = qiuZhu[1];
					apply_btn2.label = "[申请加入]";
					mainChatImg.addChild(apply_btn);
					mainChatImg.addChild(apply_btn2);
					apply_btn.labelAlign = "center";
					apply_btn2.labelAlign = "center";
					var width = apply_btn.label.length - apply_btn2.label.length <= 0 ? 0 : (apply_btn.label.length - apply_btn2.label.length) * 20;
					apply_btn.width += width;
					apply_btn.x = 50;
					apply_btn2.x = apply_btn.x + apply_btn.width;
					apply_btn.on(LEvent.CLICK, this, this.ChatViewMediator.otherOnItem, [this.chatData[index].displayinfos[0]]);
					apply_btn2.on(LEvent.CLICK, this, HudModel.getInstance().onApplyJoinTeam, [this.chatData[index].roleid]);
				} else {/** 任务时直接请求 */
					content.innerHTML = "<img src ='' style = 'width:48px;height:1px'></img>" + "<span style='font:24px ;color:#87CEFA; SimHei'>【" + this.chatData[index].rolename + "】</span>" + "<span style='font:24px;color:#ffffff; SimHei'>" + this.chatData[index].message + " </span> ";
				}

				/** 点击事件 */
				if (teamyell && teamyell.length == 7) {/** 组队 */
					// content.on(LEvent.MOUSE_DOWN,this,this.showTeamMember);
				} //else if (this.chatData[index].displayinfos.length != 0) {/** 指定点击事件 */
				//content.on(LEvent.CLICK, this, this.onMainProp, [this.chatData[index].displayinfos[0], this.chatData[index].message, this.chatData[index].roleid]);

				//} 
				else {/** 正常点击事件--》跳转至聊天界面 */
					content.on(LEvent.CLICK, this, this.showChatSelectRender);
				}

				// generalInfo_lab.text = "";
			} else if (this.chatData[index].roleid && typeof (this.chatData[index].roleid) == "string") {/** 红包处理 */
				var clickbtn = new Laya.Button;
				// clickbtn.scaleX = 1.17;
				let param = ChatModel.getInstance().specialChannelData.get(this.chatData[index].roleid);
				clickbtn.label = "[抢红包]";
				clickbtn.skin = "";
				content.style.leading = 2;
				let ss = "csfsf";
				let x;
				/** 是否是未定义的空字符串 */
				let isundefined = this.chatData[index].message.search("undefined");
				if (isundefined != -1) {
					let message = this.chatData[index].message.replace("undefined", " ");
					content.innerHTML = "<img src ='' style = 'width:48px;height:1px'></img>" + message;
					x = content._childs[2]._text.words[content._childs[2]._text.words.length - 1]._x + content._childs[2]._text.words[content._childs[2]._text.words.length - 1]._w;
				} else {
					content.innerHTML = "<img src ='' style = 'width:48px;height:1px'></img>" + this.chatData[index].message;
					x = content._childs[3]._text.words[content._childs[3]._text.words.length - 1]._x + content._childs[3]._text.words[content._childs[3]._text.words.length - 1]._w;
				}

				if (content.contextHeight == 26) {/** 一行数据 */
					clickbtn.x = content.x + x;
					clickbtn.y = content.y - 2;
				} else {
					/** 换行后的实际宽度 */
					clickbtn.x = content.x + x;
					clickbtn.y = content.y + (content.contextHeight / 2);
				}
				clickbtn.mouseEnabled = true;
				clickbtn.labelSize = 24;
				clickbtn.labelColors = "#008000";
				clickbtn.width = 90;
				clickbtn.height = 26;
				clickbtn.on(LEvent.CLICK, this, HudModel.getInstance().onRedPacketEvent, [param]);
				mainChatImg.addChild(content);
				mainChatImg.addChild(clickbtn);
				content.on(LEvent.CLICK, this, this.showChatSelectRender);
			}
			else {/** 系统频道消息 */
				if (typeof (this.chatData[index].messageid) != "undefined") {
					var msgId = this.chatData[index].messageid;
					var data = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[msgId];
					let param = this.chatData[index].parameters;
					content.style.leading = 2;
					let tempdata = HudModel.getInstance().promptAssembleBack(msgId, param);
					content.innerHTML = "<img src ='' style = 'width:48px;height:1px'> </img>" + tempdata;//"<span style='font:24px ;color:#FFFFFF; SimHei'> " + tempdata + " </span>";//data.msg
					mainChatImg.on(LEvent.CLICK, this, this.showChatSelectRender);
					// generalInfo_lab.text = "";
					mainChatImg.addChild(content);
				} else if (typeof (this.chatData[index].message) != "undefined") {
					var generalInfo_lab: Laya.Label = new Laya.Label;
					generalInfo_lab.x = 52;
					generalInfo_lab.y = 0;
					generalInfo_lab.width = 582;
					generalInfo_lab.height = 27;
					generalInfo_lab.fontSize = 25;
					generalInfo_lab.color = "#ffffff";
					generalInfo_lab.align = "left";
					generalInfo_lab.overflow = "visible";
					generalInfo_lab.wordWrap = true;
					// generalInfo_lab.scaleX = 1.17;
					let tempData = this.chatData[index].message;
					generalInfo_lab.text = tempData;
					mainChatImg.on(LEvent.CLICK, this, this.showChatSelectRender);
					// content.innerHTML = "";
					mainChatImg.addChild(generalInfo_lab);
				}
			}
			if (this.lastImg == null) {
				mainChatImg.y = 1;
			} else {/**第二个以上 */
				mainChatImg.y = this.lastImg.y + this.lastImg.height + 2;
			}
			if (content.contextHeight > mainChatImg.height) {/** 位置重新处理 */
				mainChatImg.height = content.contextHeight;
				if (content.contextHeight == 80) {/** 表情位置处理 */
					content.y = -30;
					mainChatImg.height -= 30;
					mainChatImg.y += 30;
				}
			} else if (generalInfo_lab && generalInfo_lab.text != "") {
				mainChatImg.height = 2 * generalInfo_lab.height;
			}
			/** 滚动条信息 */
			let scrollY = mainChatImg.y;
			// mainChatImg.skin = "common/ui/liaotian/liaotian_tiaose_hong.png";
			mainChatImg.addChild(logo);
			this.lastImg = mainChatImg; //JSON.stringify(logo); //Object.assign({},logo)  //$.extend(true,{},logo);
			this._viewUI.chatList_panel.addChild(mainChatImg);
			if (scrollY >= 150) {/** 大于 容器节点的高度时才滚动*/
				this._viewUI.chatList_panel.vScrollBar.setScroll(0, scrollY, scrollY);
				this._viewUI.chatList_panel.scrollTo(null, scrollY);
			}

		}


		/** 点击富文本显示该角色队伍信息 */
		public onRequestTeamInfo(teamid: number): void {
			RequesterProtocols._instance.c2s_COneKeyApplyTeamInfo(teamid);
			team.models.TeamProxy.getInstance().once(team.models.ONE_KEY_TEAMINFO, this, this.onShowTeamInfo);
		}
		/** 队伍情况界面 */
		private onShowTeamInfo(teaminfo: Laya.Dictionary): void {
			let _memberlist = teaminfo.get("memberlist");
			let TeamInfoMediator = new team.TeamInfoMediator(this._app);
			TeamInfoMediator.onshow(_memberlist);
		}


		/** 主界面点击聊天记录弹出tips */
		private onMainProp(displayinfos: chat.models.DisplayInfoVo, itemName: string, roleId: number, e: LEvent): void {
			e.stopPropagation();
			let roleid = LoginModel.getInstance().roleDetail.roleid;
			if (roleId == roleid && displayinfos.displaytype == DisplayType.DISPLAY_ITEM) {/** 自己点击并且是道具物品时 */
				let fromBag = true;
				this.ChatViewMediator.showItemTips(displayinfos, fromBag, this._app, this._viewUI);
			} else {
				let arr = itemName.split("*split");
				if (arr.length == 2) itemName = arr[1];
				this.ChatViewMediator.otherOnItem(displayinfos, itemName);
			}
		}
		/** 查看其它玩家tips */
		private _ViewOtherItem(): void {
			this.ChatViewMediator._ViewOtherItem(this._viewUI, this._app);
		}
		/** 打开宠物详情界面 */
		private OpPetInfoInMain(petinfo: game.modules.pet.models.PetInfoVo): void {
			let isShowInStage = super.isShow();
			this.PetXiangQingMediator = new game.modules.pet.PetXiangQingMediator(this._app);
			this.PetXiangQingMediator.init(petinfo);
		}
		/** 移除打开宠物详情的监听 */
		public removePetInfoListener(): void {
			let flag = HudModel.getInstance().isListenerPetInfo;
			if (!HudModel.getInstance().isListenerPetInfo) return;
			pet.models.PetProxy.getInstance().off(pet.models.GETPETINFO, this, this.OpPetInfoInMain);
			HudModel.getInstance().isListenerPetInfo = false;
		}
		/** 打开主界面宠物详情的监听 */
		public openPetInfoListener(): void {
			let flag = HudModel.getInstance().isListenerPetInfo;
			if (HudModel.getInstance().isListenerPetInfo) return;
			pet.models.PetProxy.getInstance().on(pet.models.GETPETINFO, this, this.OpPetInfoInMain);
			HudModel.getInstance().isListenerPetInfo = true;
		}

		/**进入角色系统 */
		public showRoleinfo(): void {
			ModuleManager.show(ModuleNames.ROLE_Info, this._app);
		}

		/**进入技能系统 */
		public showSkill(): void {
			ModuleManager.show(ModuleNames.SKILL, this._app);
			if (this.yindaoId == YinDaoEnum.SKILL_YINDAO)
				this.closeAni();
		}
		/**
		 * @describe  显示背包系统
		 */
		private showBagSystem(): void {
			ModuleManager.show(ModuleNames.BAG, this._app);
			if (this.yindaoId == YinDaoEnum.BAG_YINDAO)
				this.closeAni();
		}
		/**
		 * @describe  点击好友按钮的事件
		 */
		private onClickFriendBtnEvent(): void {
			let _isShowSystemFriendMsg = friend.models.FriendModel.getInstance().isShowSystemFriendMsg;
			if (_isShowSystemFriendMsg) {
				ModuleManager.show(ModuleNames.FRIEND, this._app);
				return;
			}
			let _duringOfflineFriendGiveItem = friend.models.FriendModel.getInstance().duringOfflineFriendGiveItem;
			if (_duringOfflineFriendGiveItem.length != 0) {
				bagModel.getInstance().SlideItem = [];
				for (let i = 0; i < _duringOfflineFriendGiveItem.length; i++) {
					bagModel.getInstance().SlideItem.unshift(_duringOfflineFriendGiveItem[i].itemid);//头插入所赠送道具的id
					if (bagModel.getInstance().SlideItem.length != 0) {
						Laya.timer.once(1000, this, this.sendBagEvent);//延迟一秒播放道具滑动到背包的效果
					}
				}
				friend.models.FriendModel.getInstance().isShowSystemFriendMsg = true;
			}
			ModuleManager.show(ModuleNames.FRIEND, this._app);
		}
		/** 派发道具滑动到背包事件 */
		private sendBagEvent() {
			bag.models.BagProxy.getInstance().event(bag.models.ITEM_SLIDE);
		}
		private huoban(): void {
			game.modules.huoban.models.HuoBanProxy.getInstance().init();
			HuoBanModel.getInstance().is_frome_ZFGH_to_SH = true;
			ModuleManager.show(ModuleNames.HUOBAN, this._app);
		}
		private pet(): void {
			if (this.yindaoId = YinDaoEnum.CLICK_PET_YINDAO)
				this.closeAni();
			game.modules.pet.models.PetProxy.getInstance().init();
			ModuleManager.show(ModuleNames.PET, this._app);
		}
		public show(): void {
			super.show();
			this._app.uiRoot.closeLoadProgress();
			var data: hanlder.S2C_SOffLineMsgMessageToRole = game.modules.friend.models.FriendModel.getInstance().SOffLineMsgMessageToRoleData.get("data");
			var sysdata: hanlder.S2C_SSendSystemMessageToRole = game.modules.friend.models.FriendModel.getInstance().SSendSystemMessageToRoleData.get("data");
			//如果有离线消息或系统消息，好友显示红点
			if (data != null || sysdata != null) {
				this._viewUI.friendPoint_img.visible = true;
			}
			this.px = this._viewUI.gonggao_htm.x;
			this.py = this._viewUI.gonggao_htm.y;

			models.HudProxy.getInstance().on(models.MAINHUD_UI_HIDE, this, this.hide);
		}
		public hide(): void {
			super.hide();
		}
		public getView(): Sprite {
			return this._viewUI;
		}

		public c2sGetItemTips() {
			this.cgetitemTips(BagTypes.BAG);
			this.cgetitemTips(BagTypes.EQUIP);
		}

		public cgetitemTips(bagType) {
			var bag = BagModel.getInstance().getBagGameItemData(bagType);
			var items = bag.items;
			for (var i = 0; i < items.length; i++) {
				var id = items[i].id;
				var key = items[i].key;
				if (120000 <= id && id <= 126675 || 140000 <= id && id <= 140005 || 10000 <= id && id <= 10009) {
					RequesterProtocols._instance.c2s_CGetItem_Tips(bagType, key);
				} else if (111000 <= id && id <= 111053) {
					RequesterProtocols._instance.c2s_CGetItem_Tips(bagType, key);
				} else if (100000 <= id && id <= 107044 || 330100 <= id && id <= 340074) {
					RequesterProtocols._instance.c2s_CGetItem_Tips(bagType, key);
				}
			}

		}
		public changepost(e: any): void {
			if (1784 <= HudModel.getInstance().sceneid && HudModel.getInstance().sceneid <= 1786) {
				this._viewUI.xianhui_btn.visible = true;
				this._viewUI.xianhui_lab.visible = true;
				this._viewUI.xianhui_lab.text = "叁对叁证道战";
			} else if (1787 <= HudModel.getInstance().sceneid && HudModel.getInstance().sceneid <= 1798) {
				this._viewUI.xianhui_btn.visible = true;
				this._viewUI.xianhui_lab.visible = true;
				this._viewUI.xianhui_lab.text = "伍对伍证道战";
			}
			let mainUnit: Unit = this._app.sceneObjectMgr.mainUnit;
			mainUnit.SetPosX(e.x);
			mainUnit.SetPosY(e.y);
			mainUnit.SetPos(e.x, e.y);
			game.scene.models.SceneModel.getInstance().smallallnpc.clear();
			this._app.sceneObjectMgr.joinFakeMap(game.modules.mainhud.models.HudModel.getInstance().movesceneid, mainUnit.pos.x, mainUnit.pos.y);
			this.changjingchange.show()
		}
		/** 显示战仙会 */
		public xianhuiShow() {
			if (1784 <= HudModel.getInstance().sceneid && HudModel.getInstance().sceneid <= 1786) {
				ModuleManager.show(ModuleNames.XIANHUI, this._app);
			} else if (1787 <= HudModel.getInstance().sceneid && HudModel.getInstance().sceneid <= 1798) {
				this.XianHui5V5Mediator = new game.modules.xianhui.XianHui5V5Mediator(this._app);
				this.XianHui5V5Mediator.show();
			}
		}
		/** 初始化配置表 */
		public initConfig(): void {
			if (!this.initFlag) {
				let shapeInfo = LoginModel.getInstance().cnpcShapeInfo;
				for (let index in shapeInfo) {/** 造型表数据放入 */
					this.shapeInfo.push(shapeInfo[index].littleheadID);
				}
				/** 监听事件 */
				this.initListenerEvent();
				this.judgeBagIsFull();
			}
			this.initFlag = true;

		}
		/** 
		 * 判断背包是否已满并隐显临时背包
		 * @param isElasticFrame 是否弹窗
		 */
		private judgeBagIsFull(isElasticFrame?: boolean): void {
			let bag: game.modules.bag.models.BagVo = LoginModel.getInstance().roleDetail.bagInfo[BagTypes.TEMP];
			if (typeof (bag) == "undefined") {
				this._viewUI.tempBag_btn.visible = false;
				return;
			}
			let capacity = bag.capacity;
			let item = bag.items;
			this._viewUI.tempBag_btn.visible = true;
			if (item.length != 0) {/** 临时背包存在数据 */
				this._viewUI.tempBag_btn.visible = true;
				if (isElasticFrame) {/** 增加临时背包的物品才刷新 */
					let promoto = HudModel.getInstance().promptAssembleBack(PromptExplain.FULL_OF_BAG);
					this.disappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
					this.disappearMessageTipsMediator.onShow(promoto);
				}

			} else {/**  */
				this._viewUI.tempBag_btn.visible = false;
			}
		}
		/** 获取队伍数据信息 */
		private getTeamData(): void {
			this.teamInfo = TeamModel.getInstance().TeamRoleInfoStorage;
			this._viewUI.mainTeamList.vScrollBarSkin = "";
			if (this.teamInfo.length == 0) {/** 未组队状态 */
				let promoto = ["请创建队伍或者申请加入"];
				this._viewUI.mainTeamList.repeatY = 1;
				this._viewUI.mainTeamList.array = promoto;
			} else {
				this._viewUI.mainTeamList.repeatY = this.teamInfo.length;
				this._viewUI.mainTeamList.array = this.teamInfo;
			}
			this._viewUI.mainTeamList.scrollBar.elasticDistance = 200;
			this._viewUI.mainTeamList.scrollBar.elasticBackTime = 100;
			this._viewUI.mainTeamList.renderHandler = new Handler(this, this.onRenderTeamList);
		}
		/** 
		 * 渲染队伍数据
		 * @param cell Box
		 * @param index 渲染下标
		 */
		private onRenderTeamList(cell: Box, index: number): void {
			if (this.teamInfo.length == 0) {
				if (index > 0) return;
			} else if (index < 0 || index > this.teamInfo.length - 1) return;
			var teamBtn_btn: Laya.Button = cell.getChildByName("teamBtn_btn") as Laya.Button;
			let roleIconBg_img: Laya.Image = cell.getChildByName("roleinfo").getChildByName("roleIconBg_img") as Laya.Image;
			let roleLogo_img: Laya.Image = cell.getChildByName("roleinfo").getChildByName("roleLogo_img") as Laya.Image;
			let roleSchool_img: Laya.Image = cell.getChildByName("roleinfo").getChildByName("roleSchool_img") as Laya.Image;
			let leaderLogo_img: Laya.Image = cell.getChildByName("roleinfo").getChildByName("leaderLogo_img") as Laya.Image;
			let roleLevel_lab: Laya.Label = cell.getChildByName("roleinfo").getChildByName("roleLevel_lab") as Laya.Label;
			let roleName_lab: Laya.Label = cell.getChildByName("roleinfo").getChildByName("roleName_lab") as Laya.Label;
			let HPProgress_bar: Laya.ProgressBar = cell.getChildByName("roleinfo").getChildByName("HPProgress_bar") as Laya.ProgressBar;
			let HPProgress_bg_img: Laya.Image = cell.getChildByName("roleinfo").getChildByName("hp_bg_img") as Laya.Image;
			let MPProgres_bar: Laya.ProgressBar = cell.getChildByName("roleinfo").getChildByName("MPProgres_bar") as Laya.ProgressBar;
			let MPProgress_bg_img: Laya.Image = cell.getChildByName("roleinfo").getChildByName("mp_bg_img") as Laya.Image;
			if (this.teamInfo.length == 0) {
				let prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.CREATE_TEAM_REPLY);
				teamBtn_btn.label = prompt;
				teamBtn_btn.on(LEvent.MOUSE_DOWN, this, this.openTeamMatch);
				HPProgress_bg_img.visible = false;
				MPProgress_bg_img.visible = false;
				roleLogo_img.visible = false;
				roleSchool_img.visible = false;
				leaderLogo_img.visible = false;
				HPProgress_bar.visible = false;
				MPProgres_bar.visible = false;
				roleIconBg_img.visible = false;
				roleLevel_lab.text = "";
				roleName_lab.text = "";
			} else {
				HPProgress_bg_img.visible = true;
				MPProgress_bg_img.visible = true;
				roleLogo_img.visible = true;
				roleSchool_img.visible = true;
				leaderLogo_img.visible = true;
				HPProgress_bar.visible = true;
				MPProgres_bar.visible = true;
				roleIconBg_img.visible = true;;
				teamBtn_btn.label = "";
				let shape = this.teamInfo[index].shape;
				let shapeId = this.shapeInfo[shape];
				roleLogo_img.skin = "icon/avatarrole/" + (30000 + shape) + ".png";
				let school = this.teamInfo[index].school;
				let schoolImgUrl = TeamModel.getInstance().getSchoolImgBack(school);
				roleSchool_img.skin = schoolImgUrl;
				roleLevel_lab.text = this.teamInfo[index].level;
				roleName_lab.text = this.teamInfo[index].rolename;
				teamBtn_btn.on(LEvent.CLICK, this, this.openTeamTip, [index]);
				let memberbasic: game.modules.team.models.TeamMemberBasicVo = TeamModel.getInstance().teamMemberBasic.get(this.teamInfo[index].roleid);
				if (memberbasic) {
					HPProgress_bar.value = memberbasic.hp / memberbasic.maxhp;
					MPProgres_bar.value = memberbasic.mp / memberbasic.maxmp;
				}

				if (index == 0) {/** 队长位置 */
					leaderLogo_img.visible = true;
					leaderLogo_img.skin = "ui/team/team_dui.png";
				} else {
					if (TeamModel.getInstance().updateMemberState.keys.length != 0) {/** 玩家状态需要更新 */
						let keys = TeamModel.getInstance().updateMemberState.keys;
						let isInZanLI = false;
						for (let updateMemberStateIndex = 0; updateMemberStateIndex < keys.length; updateMemberStateIndex++) {
							let teamMemberState = TeamModel.getInstance().updateMemberState.get(keys[updateMemberStateIndex]);
							if (keys[updateMemberStateIndex] == this.teamInfo[index].roleid && teamMemberState == TeamMemberState.eTeamAbsent)/** 玩家状态需要更新 */
								leaderLogo_img.skin = "ui/team/team_zan.png";
							else if(keys[updateMemberStateIndex] == this.teamInfo[index].roleid && teamMemberState == TeamMemberState.eTeamFallline)
								leaderLogo_img.skin = "ui/team/team_zan.png";
							else if(keys[updateMemberStateIndex] == this.teamInfo[index].roleid)
								leaderLogo_img.skin = "";
						}
					} else {
						if( this.teamInfo[index].state == TeamMemberState.eTeamAbsent )
						{
							leaderLogo_img.skin = "ui/team/team_zan.png";
							TeamModel.getInstance().updateMemberState.set(this.teamInfo[index].roleid,this.teamInfo[index].state);
						}
						else leaderLogo_img.skin = "";
					}

				}
			}
		}
		/** 打开队伍速配界面 */
		private openTeamMatch(): void {
			if (this.teamInfo.length != 0) return;
			this._TeamOrganizeMediator = new game.modules.team.TeamOrganizeMediator(this._app);
			this._TeamOrganizeMediator.show();
		}
		/** 刷新组队是否匹配在主界面表现 */
		private updataTeamState(data: Laya.Dictionary): void {
			let teamData = data.get("data");
			//console.log('teamData刷新组队是否匹配在主界面表现teamData.length == ', teamData.length);
			/** 是否在匹配 */
			let isMatch = teamData[0] as boolean;
			mainhud.models.HudModel.getInstance().isMatch = isMatch;
			if (isMatch) {/** 在线匹配中 */
				/** 目标名称 */
				let targetName = teamData[1];
				this._viewUI.mainTeamList.visible = false;
				this._viewUI.teamMtch_img.visible = true;
				this._viewUI.target_lab.text = targetName;
				this._viewUI.match_btn.on(LEvent.CLICK, this, this.cancleMatch);
			} else if (!isMatch) {/** 未在匹配 */
				//console.log('teamData刷新组队是否匹配在主界面表现isMatch == ', isMatch);
				this._viewUI.mainTeamList.visible = true;
				this._viewUI.teamMtch_img.visible = false;
			}
		}
		/** 更新队员状态弹窗 */
		private updataTeamMatePopup(): void {
			let teamMemberBasic = TeamModel.getInstance().teamMemberBasic;
			if (TeamModel.getInstance().updateMemberState_Del.keys.length != 0) {/** 玩家状态需要更新 */
				let keys = TeamModel.getInstance().updateMemberState_Del.keys;
				let roleid = keys[0];
				let roleinfo = teamMemberBasic.get(roleid);
				let state = TeamModel.getInstance().updateMemberState_Del.get(roleid);
				let rolrname = roleinfo.rolename;
				let prompt;
				let arr = [];
				arr.push(rolrname);
				let disappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
				if (state == TeamMemberState.eTeamAbsent) {
					prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.TEAMMEMBER_TEMPROARILY_PART, arr);
					disappearMessageTipsMediator.onShow(prompt);
				} else if (state == TeamMemberState.eTeamNormal) {
					prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.TEAMMEMBER_REGRESSION, arr);
					disappearMessageTipsMediator.onShow(prompt);
				}
				TeamModel.getInstance().updateMemberState_Del.remove(roleid);
			}
		}
		/** 取消匹配 */
		private cancleMatch(tyep: number): void {
			HudModel.getInstance().isMatch = false;
			mainhud.models.HudProxy.getInstance().event(mainhud.models.UPDATA_TEAM_UI, 0);
			// if(typeof(tyep) != "number") RequesterProtocols._instance.c2s_CRequestStopTeamMatch();
		}

		/** 打开组队玩家对应的tips */
		private openTeamTip(index: number, e: LEvent): void {
			if (this.teamInfo.length == 0) return;
			let roleid = LoginModel.getInstance().roleDetail.roleid;
			let xPos = e.currentTarget.mouseX;
			let yPos = e.currentTarget.mouseY;
			if (roleid == this.teamInfo[0].roleid) {/** 队长视角 */
				if (index == 0) {/** 点击的是自己的信息 */
					this._TeamViewMyselfMediators = new game.modules.commonUI.TeamViewMyselfMediators(this._app);
					this._TeamViewMyselfMediators.onShow(xPos, yPos, index, this.teamInfo);
				} else {/** 其他队员的信息 */
					this._TeamViewLeaderMediators = new game.modules.commonUI.TeamViewLeaderMediators(this._app);
					this._TeamViewLeaderMediators.onShow(xPos, yPos, index, this.teamInfo);
				}
			} else if (this.teamInfo[index].roleid == roleid) {/** 队员视角 点击的是自己的信息 */
				this._TeamViewMyselfMediators = new game.modules.commonUI.TeamViewMyselfMediators(this._app);
				this._TeamViewMyselfMediators.onShow(xPos, yPos, index, this.teamInfo);

			} else {/** 点击的是其他玩家，包括队长和队员 */
				this._TeamViewMainMediators = new game.modules.commonUI.TeamViewMainMediators(this._app);
				this._TeamViewMainMediators.onShow(xPos, yPos, index, this.teamInfo);
			}



		}


		/**公会被邀请加入 */
		public showClanInvitation() {
			var ClanInvitation = game.modules.family.models.FamilyModel.getInstance().ClanInvitation;
			var param: Dictionary = new Dictionary();
			param.set("contentId", 145034);
			var hostrolename = ClanInvitation.get("hostrolename");
			var clannname = ClanInvitation.get("clannname");
			var pa = [hostrolename, clannname];
			param.set("parame", pa);
			this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, param);
			game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.okTips);

		}

		/**拒绝加入公会 */
		public cancelTips() {
			//console.log("-----------拒绝加入：---------")
			var ClanInvitation = game.modules.family.models.FamilyModel.getInstance().ClanInvitation;
			var roleid = ClanInvitation.get("hostroleid");
			//console.log("-------------hostroleid:", roleid)
			RequesterProtocols._instance.c2s_CAcceptOrRefuseInvitation(roleid, AcceptOrRefuseApply.refuse);
		}

		/**同意加入公会 */
		public okTips() {
			//console.log("-----------同意加入---------")
			var ClanInvitation = game.modules.family.models.FamilyModel.getInstance().ClanInvitation;
			var roleid = ClanInvitation.get("hostroleid");
			//console.log("-------------hostroleid:", roleid)
			RequesterProtocols._instance.c2s_CAcceptOrRefuseInvitation(roleid, AcceptOrRefuseApply.accept);
		}

		/**显示人物小窗口 */
		public showrole(rolemodelid: number, roleid: number) {
			if (rolemodelid != -1) {
				this._viewUI.role_box.visible = true
				let shape: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[rolemodelid]
				this._viewUI.roleicon_img.skin = "common/icon/avatarrole/" + shape.littleheadID + ".png"
				this._viewUI.roleicon_img.on(LEvent.MOUSE_DOWN, this, this.showrolemenu, [roleid])
			}
			else {
				this._viewUI.role_box.visible = false
				this._viewUI.roleicon_img.off(LEvent.MOUSE_DOWN, this, this.showrolemenu)
			}
		}
		/**人物菜单 */
		public showrolemenu(roleid: number) {
			var xPos = -20;
			var yPos = 80;
			RequesterProtocols._instance.c2s_CRequestUpdateRoleInfo(roleid);//请求玩家信息
			RequesterProtocols._instance.c2s_CReqRoleTeamState(roleid);//客户端请求其他玩家的组队情况
			var isFriendFlag = FriendModel.getInstance().isMyFriend(roleid);
			this._ContactCharacterMediator.onShow(xPos, yPos, isFriendFlag);
		}
		/** 响应物品使用指引 */
		private showItemGuide(strs: string = ""): void {
			let itemKey = BagModel.getInstance().addItemUseGuide.keys;
			if (itemKey.length == 0) return;
			let itemId = itemKey[0];
			let item = BagModel.getInstance().addItemUseGuide.get(itemId);
			let num = item.number;
			let instance = game.modules.commonUI.UseToRemindCardMediator._instance
			this.UseItem = game.modules.commonUI.UseToRemindCardMediator.getInstance(this._app);
			let str;
			if (strs != "") str = strs;
			else str = "使用";
			this.UseItem.init(itemId, str, num);

		}
		/** 
		 * 升级判断达成等级礼包使用
		 * @param oldlevel 未升级前等级
		 * @param newlevel 升级之后的等级
		 */
		private JudgeLevelPacks(oldlevel: number, newlevel: number): void {
			if (newlevel <= LEVEL_MAX) {
				let oldtendigitNum = Math.floor(oldlevel % 100 / 10); //十位数;
				let tendigitNum = Math.floor(newlevel % 100 / 10); //十位数;
				/** 逢10进 */
				if (oldtendigitNum == tendigitNum) return;
				let _giftPackageId;
				for (var index = 0; index < tendigitNum; index++) {
					_giftPackageId = 105000 + index;
					/** 判断背包是否有该物品 */
					let item = BagModel.getInstance().chargeItem(_giftPackageId);
					if (item && item != 0) {
						BagModel.getInstance().addItemUseGuide.set(item.id, item);
						this.showItemGuide();
					}
				}


			}
		}
		/** 删除物品使用指引 */
		private deletItemGuide(): void {
			this.UseItem = game.modules.commonUI.UseToRemindCardMediator.getInstance(this._app);
			this.UseItem.close();
		}
		/** 新增物品滑动特效 */
		private ItemSlide(): void {
			if (BagModel.getInstance().SlideItem.length == 0) return;
			let bagItemFlyToBag = bag.BagItemFlyToBagMediator.getInstance(this._app);
			bagItemFlyToBag.show();
		}

		/** 
		 * 队伍红点设置
		 * @param type 设置类型
		 */
		private setTeamRedDot(type): void {
			if (type == TeamRedDot.SHOW_TEAM_REDDOT && !this._viewUI.team_reddot_img.visible) {
				this._viewUI.team_reddot_img.visible = true;
			} else if (type == TeamRedDot.HIDE_TEAM_REDDOT && this._viewUI.team_reddot_img.visible) {
				this._viewUI.team_reddot_img.visible = false;
			}
		}

		/**关闭升级特效 */
		public closetx() {
			Laya.timer.clear(this, this.closetx)
			this._app.sceneObjectMgr.mainUnit.levelup = 2
		}
	}
}