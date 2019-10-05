/**
* name 
*/

enum switchUI {
	CreateTeam = 1,   //建完队伍的情况
	ExitTeam = 2,   //完成队伍的创建
}
// import TeamSetMediator = game.modules.team.TeamSetMediator;
module game.modules.team {
	export class TeamModule extends game.modules.ModuleMediator {
		private _viewUI: ui.common.TeamUI;
		private schoolInfo: Object = {};
		/** 队伍信息 */
		private roleInfo: Array<any> = [];
		/** 申请者数据 */
		private applicationInfo: Array<any> = [];
		private isInit: boolean = false;
		private _huobanModel: HuoBanModel;
		private _teamModel: TeamModel;
		private _huoBanZhuZhan: HuoBanModule;
		private _RemindViewMediator: RemindViewMediator;
		private _ZhenFaGuangHuanMediator: ZhenFaGuangHuanMediator;
		private _InviteFriendsMediator: InviteFriendsMediator;
		private _TeamSetMediator: TeamSetMediator;
		private _TeamOrganizeMediator: TeamOrganizeMediator;
		private _TeamMateViewMediator: TeamMateViewMediator;
		private _BattleInstructionMediator: BattleInstructionMediator;
		private _EditWindowMediator: EditWindowMediator;
		private _RedPacketMediator: redPacket.RedPacketMediator;
		/** 模型类 */
		public model: ModelsCreate;
		/** 最小等级 */
		private minLevel: number;
		/** 最大等级 */
		private maxLevel: number;
		/** 目标名称 */
		private targetName: string;
		/** 目标Id */
		private targetId: number;
		/** 伙伴之间交换位置的flag */
		private shadowFlag = false;
		/** 委任指挥的flag */
		private AppointedConductoFlag = false;
		/** 点击时伙伴的下标 */
		private huoBanINdex: number = -1;
		/** 队长和队友的长度数 */
		private teamMember: number = 0;
		/** 交换队员的位置 */
		private swapPosIndex: number = -1;
		/** 是否是队员 */
		private isMmeber = false;
		/** 角色造型数据 */
		private roleShapeData: any;
		/** 伙伴造型数据 */
		private huobanShapeData: any;
		/**动画 */
		private ani: Laya.Animation;
		/**手指图标 */
		private dianImg: Laya.Image;
		/**当前引导编号 */
		private yindaoId: number;
		constructor(app: AppBase) {
			super();
			this.uiLayer = app.uiRoot.general;
			this._viewUI = new ui.common.TeamUI();
			//this._loginView = new ui.common.LoginUI();
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this.model = new ModelsCreate();
			// this._SystemMediator =  new SystemMediator(app);
			// Network._instance.addHanlder(ProtocolsEnum.SEnterWorld, this, this.onEnterWorld);
			this._huoBanZhuZhan = new HuoBanModule(app);
			this._RemindViewMediator = new RemindViewMediator(app.uiRoot.general, app);
			this._ZhenFaGuangHuanMediator = new ZhenFaGuangHuanMediator(app);
			this._InviteFriendsMediator = new InviteFriendsMediator(app.uiRoot.general, app);
			this._TeamSetMediator = new TeamSetMediator(app);
			this._TeamMateViewMediator = new TeamMateViewMediator(app.uiRoot.general, app);
			this._BattleInstructionMediator = new BattleInstructionMediator(app.uiRoot.general, app);
			this._EditWindowMediator = new EditWindowMediator(app.uiRoot.general, app);
			this._TeamOrganizeMediator = new TeamOrganizeMediator(this._app);
			this._RedPacketMediator = new redPacket.RedPacketMediator(this._app);
			this.initialize();
		}
		/**初始化 */
		public initialize(): void {
			this.ani = new Laya.Animation();
			this.dianImg = new Laya.Image();
		}
		private onLoad(): void {
			/** 这里加上界面初始化的所有点击事件和通信事件等 */
			this.registerEvent();
			this._initConfigurationTable();
			this.refreshTeamData();
			this.initIsMatch();
			this.updZhenFa();


		}
		/** 刷新阵法数据 */
		private updZhenFa(): void {
			let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[3]
			if (HuoBanModel.getInstance().zrhuobanlist.length != 0) {//是否有阵容
				let aa = HuoBanModel.getInstance().zrhuobanlist;
				let zr: game.modules.huoban.models.ZhenrongInfoVo = HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid];
				if (typeof (zr) == "undefined") {
					this._viewUI.zhenfa_btn.label = "无阵法";
					return;
				}
				let zfinfo: game.modules.huoban.models.FormBeanVo = LoginModel.getInstance().roleDetail.learnedFormsMap.get(zr.zhenfa);
				if (zfinfo != null) {
					let zhenfa: FormationbaseConfigBaseVo = HuoBanModel.getInstance().FormationbaseConfigData[zr.zhenfa]
					this._viewUI.zhenfa_btn.label = zfinfo.level + chattext.msg + zhenfa.name
				} else
					this._viewUI.zhenfa_btn.label = "无阵法";

			}
			else {
				let zfinfo: game.modules.huoban.models.FormBeanVo = LoginModel.getInstance().roleDetail.learnedFormsMap.get(HuoBanModel.getInstance().currentzf[HuoBanModel.getInstance().currentzr]);
				let zhenfa: FormationbaseConfigBaseVo = HuoBanModel.getInstance().FormationbaseConfigData[HuoBanModel.getInstance().currentzf[HuoBanModel.getInstance().currentzr]];
				if (zfinfo != null) this._viewUI.zhenfa_btn.label = zfinfo.level + chattext.msg + zhenfa.name;
			}
		}
		/** 判断是否在匹配状态 */
		private initIsMatch(): void {
			let state = TeamModel.getInstance().matchFlag;
			if (state == true) {/** 在线匹配状态 */
				this._viewUI.tishi_label.text = "提示：正在自动匹配...";
			} else if (state == false) {/** 未在匹配中 */
				this._viewUI.tishi_label.text = "提示：没有队友的时候伙伴将前来助阵";
			}
		}
		/** 注册按钮事件 */
		private registerEvent(): void {
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.clickCloseBtn);
			this._viewUI.creatTeam_btn.on(LEvent.MOUSE_DOWN, this, this.pleaseCreateTeam);//,this.switch_RealtiveUI,[switchUI.CreateTeam]
			this._viewUI.hepPartner_btn.on(LEvent.MOUSE_DOWN, this, this._OpenHuoBan);
			this._viewUI.commandBattle_btn.on(LEvent.MOUSE_DOWN, this, this._OPBattleMannage);
			this._viewUI.partnerHelp_btn.on(LEvent.MOUSE_DOWN, this, this._OpenHuoBan);
			this._viewUI.exitTeam_btn.on(LEvent.MOUSE_DOWN, this, this._ExitTeamConfirm);
			this._viewUI.zhenfa_btn.on(LEvent.MOUSE_DOWN, this, this._OpenZhenFa);
			this._viewUI.teamRedEnvelopes_btn.on(LEvent.MOUSE_DOWN, this, this._OpenTeamRedPacket);
			this._viewUI.InvitingPlayers_btn.on(LEvent.MOUSE_DOWN, this, this._ShowInvite);
			this._viewUI.team_tab.selectHandler = new Handler(this, this._ChooseTeamTab);
			this._viewUI.applyExitTeam_btn.on(LEvent.MOUSE_DOWN, this, this._ExitTeamConfirm);
			this._viewUI.inviteFriends_btn.on(LEvent.MOUSE_DOWN, this, this._InviteEvent, [InviteType.INVITE_FRIEND]);
			this._viewUI.inviteSider_btn.on(LEvent.CLICK, this, this._InviteEvent, [InviteType.INVITE_FAMILY]);
			this._viewUI.teamSet_btn.on(LEvent.MOUSE_DOWN, this, this._OpenTeamSet);
			this._viewUI.Match_btn.on(LEvent.MOUSE_DOWN, this, this._MatchEvent);
			this._viewUI.bianJieieTeam_btn.on(LEvent.MOUSE_DOWN, this, this._OpenBianJie);
			this._viewUI.aKeyYell_btn.on(LEvent.MOUSE_DOWN, this, this._OpenYell);
			this._viewUI.editCommand_btn.on(LEvent.MOUSE_DOWN, this, this._OpenBattleInstruction);
			this._viewUI.applyPartnerHelp_btn.on(LEvent.MOUSE_DOWN, this, this._OpenHuoBan);
			this._viewUI.teamTarget_btn.on(LEvent.MOUSE_DOWN, this, this._OpenTeamSet);
			this._viewUI.mask_img.on(LEvent.MOUSE_DOWN, this, this.hideInviteEvent);
			this._viewUI.clearApplyList_btn.on(LEvent.CLICK, this, this.clearApplyList);
			this._viewUI.weirenzhihui_btn.on(LEvent.CLICK, this, this.setAppointedConductor);
			models.TeamProxy.getInstance().on(models.CREATE_TEAM_SUCC, this, this.createTeam);
			models.TeamProxy.getInstance().on(models.REFRESH_TARGET, this, this.refreshTarget);
			models.TeamProxy.getInstance().on(models.MATCH_EVENT, this, this.MatchEvent);
			models.TeamProxy.getInstance().on(models.REFRESH_FRIEND_ACCEPT_TEAM, this, this.refreshTeamData);
			game.modules.huoban.models.HuoBanProxy.getInstance().on(game.modules.huoban.models.ZHENRONG_EVENT, this, this.refreshTeamData);
			models.TeamProxy.getInstance().on(models.RESPONSE_TO_CAPTAIN, this, this.responseToCaptain);
			models.TeamProxy.getInstance().on(models.RESPONSE_TEAM_ERROR, this, this.errorTips);
			models.TeamProxy.getInstance().on(models.AGREE_JOIN_EVENT, this, this.onInvite);
			models.TeamProxy.getInstance().on(models.REFRESH_APPLICATION, this, this.getapplication);
			models.TeamProxy.getInstance().on(models.TEAM_RED_DOT, this, this.setTeamRedDot);


		}
		/** 设置委任指挥的flag */
		private setAppointedConductor(): void {
			this._viewUI.commandShow.visible = false;
			if (this.AppointedConductoFlag) return;
			let keyName = models.TeamModel.getInstance().teamMemberBasic.keys;
			let commander: number = models.TeamModel.getInstance().commanderRoleid;
			//长度大于3 或者第一个队员不是委托者
			if (keyName.length >= 3 || (keyName.length == 2 && keyName[1] != commander)) {
				this.AppointedConductoFlag = true;
				this.refreshTeamData();
			}
			else this.AppointedConductoFlag = false;

		}
		/** 队伍红点刷新
		 * @param  type 显示或者隐藏红点类型
		 */
		private setTeamRedDot(type: number): void {
			if (!this._viewUI.team_tab.visible) {
				this._viewUI.application_reddot_img.visible = false;
				return;
			}
			if (type == TeamRedDot.SHOW_TEAM_REDDOT && !this._viewUI.application_reddot_img.visible) {
				this._viewUI.application_reddot_img.visible = true;
			} else if (type == TeamRedDot.HIDE_TEAM_REDDOT && this._viewUI.application_reddot_img.visible) {
				this._viewUI.application_reddot_img.visible = false;
			}
		}
		/** 创建模型 */
		modelcreate(cell: Box, modelid: number, index: number): void {

			let xpos = -180;
			let ypos = -330;
			if (index == 2) {
				xpos = 80;
				ypos = -100;
			} else if (index == 3) {
				xpos = 200;
				ypos = -50;
			}

			this.model.modelcreate(modelid + "", xpos, ypos, -80, 105)
			cell.addChild(this.model)
		}
		/** 清除申请者信息 */
		private clearApplyList(): void {
			if (this.applicationInfo.length != 0)
				RequesterProtocols._instance.c2s_CAcceptToTeam(0, ResponseApplicationTeam.REJECT_TEAM);
		}
		/** 隐藏邀请队伍按钮组 */
		private hideInviteEvent(): void {
			if (this._viewUI.invite_img.visible)
				this._viewUI.invite_img.visible = false;
		}
		/** 打开队伍红包界面 */
		private _OpenTeamRedPacket(): void {
			this._RedPacketMediator.show(RedPackType.TYPE_TEAM);
		}
		/** 邀请好友点击事件 */
		private onInvite(roleId: number): void {
			if (roleId != 0) {
				RequesterProtocols._instance.c2s_CInviteJoinTeam(roleId, 1);
			}

		}
		/** 
		 * 响应成为队长
		 * @param 0 拒绝   @param 1 同意
		 */
		private responseToCaptain(): void {
			RequesterProtocols._instance.c2s_CAnswerforSetLeader(1);
		}
		/** 战斗指令编辑 */
		private _OpenBattleInstruction(): void {
			this._BattleInstructionMediator.onShow();
			LoginModel.getInstance().CommonPage = "team";
			this.hide();
		}
		/** 错误提示事件 */
		private errorTips(errType: number): void {
			let promoto = TeamModel.getInstance().getTipsPromoto(errType);
			game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, promoto);
		}
		/** 匹配按钮点击事件 */
		private _MatchEvent(): void {
			let roleId = LoginModel.getInstance().roleDetail.roleid;			//角色
			let leaderId = this.roleInfo[0].roleid;				//队长id
			let flag = models.TeamModel.getInstance().matchFlag;
			if (roleId != leaderId) {
				let prompt = HudModel.getInstance().promptAssembleBack(162138);
				let disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
				disappearMsgTips.onShow(prompt);
			} else {
				if (flag == true) {/** 已经正在匹配点击取消 */
					RequesterProtocols._instance.c2s_CRequestStopTeamMatch();
				} else if (flag == false) {/**点击请求匹配  */
					RequesterProtocols._instance.c2s_CRequestTeamMatch(1, this.targetId, this.minLevel, this.maxLevel);
				}
			}
		}
		/** 创建成功 */
		private createTeam(): void {
			this.switch_RealtiveUI(switchUI.CreateTeam);
		}

		/** 设置界面 */
		private _OpenTeamSet(): void {
			let isCaptain = this.isCaptain();
			if (isCaptain) {
				this._TeamSetMediator.show();
			} else {
				let prompt = HudModel.getInstance().promptAssembleBack(420040);
				let disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
				disappearMsgTips.onShow(prompt);
			}
		}
		/** 判断是不是队长 */
		private isCaptain(): any {
			let roleId = LoginModel.getInstance().roleDetail.roleid;
			let leaderId = this.roleInfo[0].roleid;
			if (roleId == leaderId) return true;
			return false;

		}
		/** 便捷界面 */
		private _OpenBianJie(e: any): void {
			this._TeamOrganizeMediator.show();
			/** 这里需要把主界面关闭，否则按钮点击会冲突 */
			LoginModel.getInstance().CommonPage = "team";
			this.hide();
			if (this.yindaoId == YinDaoEnum.ZUIDUI_YINDAO)
				this.closeAni();
		}
		/** 一键喊话 */
		private _OpenYell(e: any): void {
			if (this.targetName == "" || this.targetName == null) {/** 没有设置目标 */
				let promoto = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.NO_TARGET);
				game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, promoto);
			} else {
				this._EditWindowMediator.onShow(this.targetName, this.minLevel, this.maxLevel);
				LoginModel.getInstance().CommonPage = "team";
				this.hide();
			}

		}

		/** 邀请好友 帮派成员
		 * @param _type 邀请类型
		 */
		private _InviteEvent(_type: number): void {
			if (InviteType.INVITE_FAMILY == _type) {

				let clankey = HudModel.getInstance().clankey;
				let memberlist = game.modules.family.models.FamilyModel.getInstance().memberlist;
				if (clankey > 0 && memberlist.length <= 1)
					//先请求数据
					RequesterProtocols._instance.c2s_CRefreshMemberList();
				else if (clankey <= 0) //无工会
				{
					let disappar = new DisappearMessageTipsMediator(this._app);
					let prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.NO_FAMILY);
					disappar.onShow(prompt);
					return;
				}
			}
			this.hide();
			this._ShowInvite();
			LoginModel.getInstance().CommonPage = ModuleNames.Team;
			Laya.timer.once(500, this, this.showInvite, [_type])
			// this._InviteFriendsMediator.once(commonUI.OPEN_TEAM, this, this.show);
		}
		private showInvite(_type: number): void {
			this._InviteFriendsMediator.onShow(_type);
		}
		/** 匹配事件 */
		private MatchEvent(type: number): void {
			if (type == 2) {/** 开始匹配 */
				this._viewUI.Match_btn.label = "取消匹配";
				this._viewUI.tishi_label.text = "提示：正在自动匹配...";
			} else if (type == 1) {/** 取消匹配 */
				this._viewUI.Match_btn.label = "自动匹配";
				this._viewUI.tishi_label.text = "提示：没有队友的时候伙伴将前来助阵";
			}

		}


		/** 
		 * 头顶tab显示切换
		 * @param index 下标
		 */
		private _ChooseTeamTab(index: number): void {
			if (index == 0)/** 我的队伍 */ {
				this._viewUI.myTeamPanel.visible = true;
				this._viewUI.applyListPanel.visible = false;
			} else if (index == 1)/** 申请列表 */ {
				this._viewUI.myTeamPanel.visible = false;
				this._viewUI.applyListPanel.visible = true;
				this.getapplication();
			}

		}

		/** 获取申请名单数据 */
		private getapplication(): void {
			/** 重新申请者的数据信息 */
			this.getApplicationData();
			if (this.applicationInfo.length == 0) {/** 如果没有数据则重置ui */
				this._viewUI.no_applicant_img.visible = true;
				this._viewUI.applicant_list.visible = false;
				return;
			} else if (this.applicationInfo.length > 0) {/** 有数据 */
				this._viewUI.no_applicant_img.visible = false;
				this._viewUI.applicant_list.visible = true;
			}
			this._viewUI.applicant_list.vScrollBarSkin = "";
			if (this.applicationInfo.length <= 3) {
				this._viewUI.applicant_list.repeatX = this.applicationInfo.length;
				this._viewUI.applicant_list.repeatY = 1;
			} else if (this.applicationInfo.length > 3) {
				this._viewUI.applicant_list.repeatX = 3;
				this._viewUI.applicant_list.repeatY = Math.ceil(this.applicationInfo.length / 3);
			}

			this._viewUI.applicant_list.array = this.applicationInfo;
			this._viewUI.applicant_list.scrollBar.elasticBackTime = 200;
			this._viewUI.applicant_list.scrollBar.elasticDistance = 100;
			this._viewUI.applicant_list.renderHandler = new Handler(this, this.onRenderTeamApply);
		}
		/** 申请者数据加载 */
		private getApplicationData(): void {
			let applicationKey = TeamModel.getInstance().applyList.keys;
			this.applicationInfo = [];
			if (applicationKey.length == 0) return;
			for (var appIndex = 0; appIndex < applicationKey.length; appIndex++) {
				let applyIndexData = TeamModel.getInstance().applyList.get(applicationKey[appIndex]);
				this.applicationInfo.push(applyIndexData);
			}

		}
		/** 申请者数据渲染 */
		private onRenderTeamApply(cell: Box, index: number): void {
			if (index < 0 || index > (this.applicationInfo.length - 1)) return;
			let name_label: Laya.Label = cell.getChildByName("teamCard").getChildByName("name_label") as Laya.Label;
			let schoolName: Laya.Label = cell.getChildByName("teamCard").getChildByName("playerSchool_label") as Laya.Label;
			let playerLevel_label: Laya.Label = cell.getChildByName("teamCard").getChildByName("playerLevel_label") as Laya.Label;
			let playerSchool_img: Laya.Image = cell.getChildByName("teamCard").getChildByName("playerSchool_img") as Laya.Image;
			let agree_apply_btn: Laya.Button = cell.getChildByName("teamCard").getChildByName("agree_apply_btn") as Laya.Button;
			name_label.text = this.applicationInfo[index].rolename;
			let school = this.applicationInfo[index].school;
			playerLevel_label.text = this.applicationInfo[index].level;
			schoolName.text = this.schoolInfo[school].name;
			let schoolImgUrl = this._teamModel.getSchoolImgBack(school);
			playerSchool_img.visible = true;
			playerSchool_img.skin = schoolImgUrl;
			let roleid = this.applicationInfo[index].roleid;
			agree_apply_btn.on(LEvent.CLICK, this, this.AgreeToJoinTheTeam, [roleid])

		}

		/** 
		 * 同意入队申请事件
		 * @param roleid 申请者Id
		 */
		private AgreeToJoinTheTeam(roleid: number): void {
			RequesterProtocols._instance.c2s_CAcceptToTeam(roleid, ResponseApplicationTeam.AGREEE_TEAM);
		}
		/** 显示邀请 */
		private _ShowInvite(): void {
			if (this._viewUI.invite_img.visible) {
				this._viewUI.invite_img.visible = false;
			} else {
				this._viewUI.invite_img.visible = true;
			}
		}

		/** 打开阵法 */
		private _OpenZhenFa(): void {
			LoginModel.getInstance().CommonPage = ModuleNames.Team;
			this._ZhenFaGuangHuanMediator.show(1);
			this.hide();
			/** 汝是真的马叉虫 */
			// models.TeamProxy.getInstance().once(models.OPEN_TEAM_EVENT,this,this.show);
		}
		/** 确认是否退出队伍 */
		private _ExitTeamConfirm(): void {
			let prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.ENSURE);
			this._RemindViewMediator.onShow(models.IS_CONFIRM_EXIT_TEAM, prompt);
			this._RemindViewMediator.once(commonUI.RIGHT_BUTTON_EVENT, this, this.exitTeam);
		}
		/** 退出队伍 */
		private exitTeam(): void {
			RequesterProtocols._instance.c2s_CQuitTeam();
			this.switch_RealtiveUI(switchUI.ExitTeam);

		}
		/** 战斗指挥 */
		private _OPBattleMannage(): void {
			if (this._viewUI.commandShow.visible) {
				this._viewUI.commandShow.visible = false;
			} else {
				this._viewUI.commandShow.visible = true;
			}
			let keyName = models.TeamModel.getInstance().teamMemberBasic.keys;
			let roleid = LoginModel.getInstance().roleDetail.roleid;
			if (keyName.length >= 1 && keyName[0] == roleid) //队长是自己
			{
				this._viewUI.weirenzhihui_btn.disabled = false;
			} else if (keyName.length >= 1 && keyName[0] != roleid) {
				this._viewUI.weirenzhihui_btn.disabled = true;
			}

		}
		/** 伙伴助战 */
		private _OpenHuoBan(): void {
			ModuleManager.show(ModuleNames.HUOBAN, this._app);
			this.hide();
			LoginModel.getInstance().CommonPage = "team";

		}


		/** 初始化表格等数据 */
		private _initConfigurationTable(): void {
			if (!this.isInit) {	/** 界面初始化 */
				/** 门派配资表 */
				this.schoolInfo = _LoginModel.getInstance().schoolInfo;
				this.isInit = true;
				this.roleShapeData = LoginModel.getInstance().createRoleConfigBinDic;
				this.huobanShapeData = game.modules.createrole.models.LoginModel.getInstance().cnpcShapeInfo;
			}


		}
		/** 获取队伍数据 */
		private getTeamData(): void {
			/** 数据置空*/
			this.roleInfo = [];
			/** 个人角色信息 */
			// this.roleInfo.push(_LoginModel.getInstance().roleDetail);
			let keyName = models.TeamModel.getInstance().teamMemberBasic.keys;
			let roleId = _LoginModel.getInstance().roleDetail.roleid;
			if (keyName.length == 0) /** 未组队的情况下 */ {
				this.roleInfo.push(_LoginModel.getInstance().roleDetail);
				/** 根据队伍状态控制ui */
				this.switch_RealtiveUI(switchUI.ExitTeam);
			} else {
				/** 根据队伍状态控制ui */
				this.switch_RealtiveUI(switchUI.CreateTeam);
				let entrustCaptain = TeamModel.getInstance().entrustCaptain;
				let entrusterId = -1;

				/** 将所有数据放入 */
				for (let teamIndex = 0; teamIndex < keyName.length; teamIndex++) {
					/** 委托者的位置 */
					if (keyName[teamIndex] == entrustCaptain) entrusterId = teamIndex;
					this.roleInfo.push(models.TeamModel.getInstance().teamMemberBasic.get(keyName[teamIndex]));
				}
				if (entrusterId != -1 && entrustCaptain != keyName[0])/** 排除第一位已经是队长的情况下 */ {/**  重新排布顺序 */
					let captainInfo = this.roleInfo[0];
					this.roleInfo.splice(entrusterId, 1); //删除一个
					let tempData = models.TeamModel.getInstance().teamMemberBasic.get(keyName[entrusterId]);//
					this.roleInfo.splice(0, 0, tempData);
					this.roleInfo.splice(1, 1);
					this.roleInfo.splice(entrusterId, 0, captainInfo);
				}
				let nowTeamMember = game.modules.team.models.TeamModel.getInstance().nowTeamMember;
				let tempPos1 = -1;
				let tempPos2 = -1;
				/** 队长调整队员位置 */
				if (typeof (nowTeamMember) != "undefined" && nowTeamMember.length > 0) {
					for (let roleIndex = 0; roleIndex < this.roleInfo.length; roleIndex++) {
						let roleInfoId = this.roleInfo[roleIndex].roleid;
						let rolePosId = nowTeamMember[roleIndex];
						if (roleInfoId != rolePosId && tempPos1 == -1) {
							tempPos1 = roleIndex;
						} else if (roleInfoId != rolePosId) {
							tempPos2 = roleIndex;
						}
					}
					if (tempPos1 != -1 && tempPos2 != -1) {
						let tempData1 = this.roleInfo[tempPos1]; //
						let tempData2 = this.roleInfo[tempPos2]; //4
						this.roleInfo.splice(tempPos1, 1, tempData2);
						this.roleInfo.splice(tempPos2, 1, tempData1);
					}


				}
				/** 将当前的队伍信息存放在model中,主界面可以直接使用 */
				TeamModel.getInstance().TeamRoleInfoStorage = [];
				for (var roleInfoIndex = 0; roleInfoIndex < this.roleInfo.length; roleInfoIndex++) {

					TeamModel.getInstance().TeamRoleInfoStorage.push(this.roleInfo[roleInfoIndex]);

				}
				if (TeamModel.getInstance().TeamRoleInfoStorage.length != 0) {
					models.TeamProxy.getInstance().event(models.REFRESH_MAININTERFACE_TEAM);
				}
				this.teamMember = this.roleInfo.length;
				this.swapPosIndex = TeamModel.getInstance().swapPosIndex;
			}
			/** 取伙伴信息界面的当前阵容放入数组中 */
			this._huobanModel = HuoBanModel.getInstance();
			this._teamModel = TeamModel.getInstance();
			let huoBanGroupKey = this._huobanModel.zhenrongid;
			/** */
			if (typeof (huoBanGroupKey) != "undefined" && roleId == this.roleInfo[0].roleid) {
				let cheroBaseInfoData = this._huobanModel.cheroBaseInfoData;
				if (typeof (this._huobanModel.zrhuobanlist[huoBanGroupKey]) != "undefined") {
					let huoBanInfo = this._huobanModel.zrhuobanlist[huoBanGroupKey];
					for (let huoBanIndex = 0; huoBanIndex < huoBanInfo.huobanlist.length; huoBanIndex++) {
						let huoBanId = huoBanInfo.huobanlist[huoBanIndex];
						if (this.roleInfo.length < models.TEAM_MAX)
							this.roleInfo.push(cheroBaseInfoData[huoBanId]);
					}

				}

			}

		}
		/** 刷新队伍的数据 */
		private refreshTeamData(): void {
			/** 重新获取队伍数据 */
			this.getTeamData();
			this._viewUI.teamCard_list.vScrollBarSkin = "";
			if (this.roleInfo.length <= 3) {
				this._viewUI.teamCard_list.repeatX = this.roleInfo.length;
				this._viewUI.teamCard_list.repeatY = 1;
			} else if (this.roleInfo.length > 3) {
				this._viewUI.teamCard_list.repeatX = 3;
				this._viewUI.teamCard_list.repeatY = Math.ceil(this.roleInfo.length / 3);
			}

			this._viewUI.teamCard_list.array = this.roleInfo;
			this._viewUI.teamCard_list.scrollBar.elasticBackTime = 200;
			this._viewUI.teamCard_list.scrollBar.elasticDistance = 100;
			this._viewUI.teamCard_list.renderHandler = new Handler(this, this.onRenderTeam);

		}
		/** 队伍数据渲染 */
		private onRenderTeam(cell: Box, index: number): void {
			if (index > (this.roleInfo.length - 1)) return;
			let name_label: Laya.Label = cell.getChildByName("teamCard").getChildByName("name_label") as Laya.Label;
			let mask_image: Laya.Image = cell.getChildByName("teamCard").getChildByName("mask_image") as Laya.Image;
			let schoolName: Laya.Label = cell.getChildByName("teamCard").getChildByName("playerSchool_label") as Laya.Label;
			let playerLevel_label: Laya.Label = cell.getChildByName("teamCard").getChildByName("playerLevel_label") as Laya.Label;
			let teamPosition_img: Laya.Image = cell.getChildByName("teamCard").getChildByName("teamPosition_img") as Laya.Image;
			let playerSchool_img: Laya.Image = cell.getChildByName("teamCard").getChildByName("playerSchool_img") as Laya.Image;
			let teamOrder_clip: Laya.Clip = cell.getChildByName("teamCard").getChildByName("teamOrder_clip") as Laya.Clip;
			mask_image.visible = false;
			if (typeof (this.roleInfo[index].rolename) != "undefined") {
				/** 是否是角色 */
				name_label.text = this.roleInfo[index].rolename;
				// let modelId = this.roleShapeData[this.roleInfo[index].shape].model;
				// this.modelcreate(cell, modelId,(index+1));
				let school = this.roleInfo[index].school;
				playerLevel_label.text = this.roleInfo[index].level;
				schoolName.text = this.schoolInfo[school].name;
				let roleId = this.roleInfo[index].roleid;
				let commander: number = models.TeamModel.getInstance().commanderRoleid;
				let swapPosIndex = TeamModel.getInstance().swapPosIndex;
				if (index == 0) {/** 首位队长为队长的皮肤 */
					teamPosition_img.skin = "ui/team/team_duizhang.png";
				} else if (commander != 0 && commander == roleId) {
					teamPosition_img.skin = "ui/team/zhihui.png";
				} else {
					if (TeamModel.getInstance().updateMemberState.keys.length != 0) {
						let keys = TeamModel.getInstance().updateMemberState.keys;
						let keyLength = TeamModel.getInstance().updateMemberState.keys.length;
						for (let updateMemberStateIndex = 0; updateMemberStateIndex < keyLength; updateMemberStateIndex++) {
							let teamMemberState = TeamModel.getInstance().updateMemberState.get(keys[updateMemberStateIndex]);
							if (roleId == keys[updateMemberStateIndex] && teamMemberState == TeamMemberState.eTeamAbsent) {/** 该角色处于暂离状态 */
								teamPosition_img.skin = "ui/team/team_zanli.png";
							} else if (roleId == keys[updateMemberStateIndex] && teamMemberState == TeamMemberState.eTeamFallline) { /** 离线状态 */
								teamPosition_img.skin = "ui/team/team_lixian.png";
							}else if(roleId == keys[updateMemberStateIndex] )
							 teamPosition_img.skin = "";
						}
					} else {
						if( this.roleInfo[index].state == TeamMemberState.eTeamAbsent )
						{
							teamPosition_img.skin = "ui/team/team_zanli.png";
							TeamModel.getInstance().updateMemberState.set(this.roleInfo[index].roleid,this.roleInfo[index].state);
						}else teamPosition_img.skin = "";
					}

				}

				let schoolImgUrl = this._teamModel.getSchoolImgBack(school);
				playerSchool_img.visible = true;
				playerSchool_img.skin = schoolImgUrl;
				teamOrder_clip.index = index;
				if (swapPosIndex == -1 || swapPosIndex == index) {
					mask_image.visible = false;
				} else if (index != 0) {/** 队长不会换位置 */
					mask_image.visible = true;
				}
				cell.on(LEvent.CLICK, this, this.showTeamMateTips, [index]);
				/** 处理委任指挥 队长不会被委任 当前的委托者也不会被委任*/
				if (this.AppointedConductoFlag && index != 0 && commander != roleId) {
					mask_image.visible = true;
					let changePos_lab = cell.getChildByName("teamCard").getChildByName("mask_image").getChildByName("changePos_lab") as Laya.Label;
					changePos_lab.text = "点击委任指挥";
					mask_image.on(LEvent.CLICK, this, this.appointCondctor, [roleId]);
				}
			} else {
				/** 伙伴 */
				let npcBaseVo: CNpcShapeBaseVo = this.huobanShapeData[this.roleInfo[index].id];
				this.modelcreate(cell, parseInt(npcBaseVo.shape), (index + 1));
				name_label.text = this.roleInfo[index].name;
				let _huoBanType = this.roleInfo[index].type;
				switch (_huoBanType) {
					case huoBanType.PHYSICAL_TYPE: schoolName.text = "物理型"; break;
					case huoBanType.SPELL_TYPE: schoolName.text = "法术型"; break;
					case huoBanType.THERAPEUTIC_TYPE: schoolName.text = "治疗型"; break;
					case huoBanType.AUXILIARY_TYPE: schoolName.text = "辅助型"; break;
					case huoBanType.CONTROL_TYPE: schoolName.text = "控制型"; break;
					default: break;
				}
				playerLevel_label.text = _LoginModel.getInstance().roleDetail.level.toString();
				teamPosition_img.skin = "ui/team/team_zhuzhan.png";
				teamOrder_clip.index = index;
				playerSchool_img.visible = false;
				if (this.shadowFlag) {
					mask_image.visible = this.huoBanINdex == index ? false : true;
				} else {
					mask_image.visible = false;
				}
				cell.on(LEvent.CLICK, this, this.changePos, [index]);
			}
		}
		/** 请求委任指挥 
		 * @param roleid 角色id
		*/
		private appointCondctor(roleid: number, e: Event): void {
			e.stopPropagation();
			RequesterProtocols._instance.c2s_CSetCommander(0, roleid);
			this.AppointedConductoFlag = false;
		}
		/** 队长和队员的查看messagetips */
		private showTeamMateTips(index: number, e: LEvent): void {
			if (TeamModel.getInstance().swapPosIndex != -1 && index != TeamModel.getInstance().swapPosIndex) { /** 存在交换位置的index并且点击的位置不是选中的index ，直接发送交换位置的协议*/
				RequesterProtocols._instance.c2s_CSwapMember(this.swapPosIndex, index);
				TeamModel.getInstance().swapPosIndex = -1;
			}
			else if (TeamModel.getInstance().swapPosIndex != -1 && index == TeamModel.getInstance().swapPosIndex) {/** 在移动位置情况下点击的是自己 */
				TeamModel.getInstance().swapPosIndex = -1;
				this.refreshTeamData();
				this.swapPosIndex = TeamModel.getInstance().swapPosIndex;
			} else {
				let selectRoleId = this.roleInfo[index].roleid;
				let roleId = LoginModel.getInstance().roleDetail.roleid;
				if (index <= this.teamMember - 1 && selectRoleId != roleId) {
					let xPos = e.currentTarget.mouseX; //e.currentTarget.mouseX; //e.target.mouseX;  	e.stageX
					let yPos = e.currentTarget.mouseY; //e.currentTarget.mouseY;//e.target.mouseY; 		e.stageY
					this._TeamMateViewMediator.onShow(xPos, yPos, index, this.roleInfo);
				}
			}


		}
		/** 伙伴位置请求交换
		 * @param index 伙伴下标
		 */
		private changePos(index: number, e: LEvent): void {

			this.showTeamMateTips(index, e);
			let huoBanGroupKey = this._huobanModel.currentzrid;
			let huoBanInfo = this._huobanModel.zrhuobanlist[huoBanGroupKey];
			huoBanInfo.huobanlist
			if (this.shadowFlag == true && index != this.huoBanINdex) {/** 已经有阴影的情况下 发送交换位置的请求 */

				let huoBanGroupKey = this._huobanModel.currentzrid;
				let huoBanInfo = this._huobanModel.zrhuobanlist[huoBanGroupKey];
				let huoBanList: Array<any> = [];
				let first_huoBanId = this.roleInfo[this.huoBanINdex].id;
				let second_huoBanId = this.roleInfo[index].id;
				let firstIndex = huoBanInfo.huobanlist.indexOf(first_huoBanId);
				let secondIndex = huoBanInfo.huobanlist.indexOf(second_huoBanId);
				var temp = huoBanInfo.huobanlist[firstIndex];
				huoBanInfo.huobanlist[firstIndex] = huoBanInfo.huobanlist[secondIndex];
				huoBanInfo.huobanlist[secondIndex] = temp;
				RequesterProtocols._instance.c2s_CZhenrong_Member(huoBanGroupKey, huoBanInfo.huobanlist);
				this.shadowFlag = false;
				this.huoBanINdex = -1;
			} else if (this.teamMember - 1 < index) {/** 没有阴影的情况下 不发送交换位置的请求，但是刷新list */
				this.huoBanINdex = index;
				this.shadowFlag = true;

			}
			this.refreshTeamData();

		}
		/** 请求创建队伍 */
		private pleaseCreateTeam(): void {
			RequesterProtocols._instance.c2s_CCreateTeam();
		}


		/** 控制ui
		 * @param type 创建队伍类型
		 */
		private switch_RealtiveUI(type: number): void {
			if (type == switchUI.ExitTeam) {/** 未创建队伍的情况 */
				this._viewUI.exitTeam_img.visible = false;
				this._viewUI.group_btn.visible = false;
				this._viewUI.battle_img.visible = false;
				this._viewUI.commandShow.visible = false;
				this._viewUI.team_tab.visible = false;
				this._viewUI.creatTeam_img.visible = true;
				this._viewUI.bianJieieTeam_btn.visible = true;
				this._viewUI.myTeamPanel.visible = true;
				this._viewUI.applyListPanel.visible = false;
			} else if (type = switchUI.CreateTeam) {/** 创建完队伍的情况 */

				this._viewUI.exitTeam_img.visible = true;
				this._viewUI.group_btn.visible = true;
				this._viewUI.battle_img.visible = true;
				this._viewUI.commandShow.visible = false;
				this._viewUI.team_tab.visible = true;
				this._viewUI.creatTeam_img.visible = false;
				this._viewUI.bianJieieTeam_btn.visible = false;

			}

			/** JUMPPAGE */
			// ModuleManager.jumpPage("Bag",0,this._app);

		}
		/** 刷新目标副本
		 * @param minlevel 最低等级
		 * @param maxlevel 最高等级
		 * @param targetName 目标名称
		 * @param targetId 目标Id
		 */
		public refreshTarget(minlevel: number, maxlevel: number, targetName: string, targetId: number): void {
			if (minlevel > maxlevel) {
				let temp = minlevel;
				minlevel = maxlevel;
				maxlevel = temp;
			}
			this.minLevel = minlevel;
			this.maxLevel = maxlevel;
			if (typeof (targetName) != "undefined")
				this.targetName = targetName;
			else this.targetName = "无";
			this._viewUI.teamTarget_label.text = this.targetName;
			this.targetId = targetId;
			this._viewUI.ttargetLevel_label.text = minlevel + "-" + maxlevel;
		}

		public show(): void {
			this.onLoad();
			super.show();
		}
		protected onShow(event: Object): void {
			this.show();
			mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
			if (HudModel.getInstance().yindaoId == YinDaoEnum.RICHANG_YINDAO)
				this.richangYindao();
		}
		/**日常副本引导 */
		public richangYindao(): void {
			var x1 = this._viewUI.bianJieieTeam_btn.x + this._viewUI.bianJieieTeam_btn.width;
			var y1 = this._viewUI.myTeamPanel.y + this._viewUI.bianJieieTeam_btn.y - 60;
			var x2 = x1 - 50;
			var y2 = y1 + 120;
			this.setTipPos(x1, y1);
			this.setAniPos(x2, y2);
			this.startYindao(YinDaoEnum.ZUIDUI_YINDAO_TIP);
			HudModel.getInstance().yindaoId = YinDaoEnum.ZUIDUI_YINDAO;
			this.yindaoId = YinDaoEnum.ZUIDUI_YINDAO;
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
		public clickCloseBtn(): void {
			mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
			this.hide();
		}
		public hide(): void {
			super.hide();
			this.model.modeldelt();
			models.TeamProxy.getInstance().event(models.REFRESH_MAININTERFACE_TEAM);;
		}

		public getView(): Sprite {
			return this._viewUI;
		}


	}
}