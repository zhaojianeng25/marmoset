/**
* ljm 导入对应的类 
*/
import _LoginModel = game.modules.createrole.models.LoginModel;
import TeamModel = game.modules.team.models.TeamModel;
import HuoBanModule = game.modules.huoban.HuoBanModule;
import RemindViewMediator = game.modules.commonUI.RemindViewMediator;
import ZhenFaGuangHuanMediator = game.modules.huoban.ZhenFaGuangHuanMediator;
import InviteFriendsMediator = game.modules.commonUI.InviteFriendsMediator;
import TeamMateViewMediator = game.modules.commonUI.TeamMateViewMediators;
import DisappearMessageTipsMediator = game.modules.commonUI.DisappearMessageTipsMediator;
import EditWindowMediator = game.modules.commonUI.EditWindowMediator;
import BattleInstructionMediator = game.modules.commonUI.BattleInstructionMediator;
module game.modules.team.models {
	/** 重返队伍回调事件 */
	export const OPEN_TEAM_EVENT: string = "OpenTeamEvent";
	/** 离开队伍确认事件 */
	export const IS_CONFIRM_EXIT_TEAM: string = "你确定要离开队伍吗";
	/** 创建队伍成功 */
	export const CREATE_TEAM_SUCC: string = "createTeamEvent";
	/** 匹配事件 */
	export const MATCH_EVENT: string = "matchEvent";
	/** 刷新Target数据 */
	export const REFRESH_TARGET: string = "refreshTarget";
	/** 弹窗提示是否接受邀请 */
	export const IS_ACCEPT_INVITE: string = "acceptInvite";
	/** 刷新队伍事件 */
	export const REFRESH_FRIEND_ACCEPT_TEAM: string = "acceptTeamEvent";
	/** 刷新查看装备 */
	export const REFRESH_VIEW_EQUIP: string = "viewEquipEvent";
	/** 响应队长的委托队长事件 */
	export const RESPONSE_TO_CAPTAIN: string = "responseToBeCaptain";
	/** 队伍错误事件 */
	export const RESPONSE_TEAM_ERROR: string = "responseToTeamError";
	/** 一键喊话成功 */
	export const ONE_KEY_YELL_SUCC: string = "oneKeySucc";
	/** 等待匹配事件 */
	export const WAIT_MATCH_EVENT: string = "waitmatchEvent";
	/** 刷新组队队伍信息的事件 */
	export const REFRESH_TEAMINFO_EVENT: string = "refreshTeamInfoEvent";
	/** 同意入队事件 */
	export const AGREE_JOIN_EVENT: string = "agreeJoinTeamEvent";
	/** 刷新主界面上的队伍系统 */
	export const REFRESH_MAININTERFACE_TEAM: string = "refreshMainTeamEvent";
	/** 队员响应队长的召唤 */
	export const RESPONSE_CALL_BACK: string = "responseCallBackEvent";
	/** 主界面响应组队匹配状态 */
	export const MAINHUD_UPDATE_TEAM_STATE: string = "updateMainhudTeamState";
	/** 一键喊话队伍信息 */
	export const ONE_KEY_TEAMINFO: string = "onekeyTeaminfoEvent";
	/** 刷新申请者数据 */
	export const REFRESH_APPLICATION: string = "refreshTeamApplicationEvent";
	/** 队伍相关红点设置 */
	export const TEAM_RED_DOT: string = "teamRedDotEvent";
	/** 队伍允许的最大长度 */
	export const TEAM_MAX: number = 5;
	/** 特殊副本队伍结算 */
	export const TEAM_ROLL_MELON: string = "teamRollMelon";
	/** 特殊副本结算（摇骰子）取消监听 */
	export const JS_CANCEL: string = "jsCancel";
	/** 特殊副本结算（摇骰子）确定监听 */
	export const JS_OK: string = "jsOK";
	/** 更新队员队长信息弹窗 */
	export const UPDATE_TEAMMATE_STATE_POPUP: string = "updateTeammateStatePopupEvent";
	/** 阵法等级提升了 */
	export const ZHENFA_LEVELUP: string = "zhenFaLevelUp";

	export class TeamProxy extends hanlder.ProxyBase {
		constructor() {
			super();
			TeamProxy._instance = this;
			this.init();
		}
		private static _instance: TeamProxy;
		public static getInstance(): TeamProxy {
			if (!this._instance) {
				this._instance = new TeamProxy();
			}
			return this._instance;
		}

		public init(): void {
			TeamModel.getInstance();
			this.addNetworkListener();
			/** 队伍列表信息 */
			Laya.loader.load("common/data/temp/team.cteamlistinfo.bin", Handler.create(this, this.onloadedTeamListInfoComplete), null, Loader.BUFFER);
		}
		private onloadedTeamListInfoComplete(): void {
			console.log("cteamlistinfo表格加载完毕------ completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/team.cteamlistinfo.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, TeamModel.getInstance().teamListConfig, game.data.template.TeamListInfoBaseVo, "id");
			console.log("onloadedCreateRoleConfigComplete:", TeamModel.getInstance().teamListConfig);
		}

		// 添加监听
		private addNetworkListener(): void {
			Network._instance.addHanlder(ProtocolsEnum.SCreateTeam, this, this.onSCreateTeam);
			Network._instance.addHanlder(ProtocolsEnum.SRequestTeamMatch, this, this.onRequestTeamMatch);
			Network._instance.addHanlder(ProtocolsEnum.SStopTeamMatch, this, this.onStopTeamMatch);
			Network._instance.addHanlder(ProtocolsEnum.SInviteJoinSucc, this, this.onSinviteJoinSucc);
			Network._instance.addHanlder(ProtocolsEnum.SInviteJoinTeam, this, this.onSInviteJoinTeam);
			Network._instance.addHanlder(ProtocolsEnum.SAddTeamMember, this, this.onSAddTeamMember);
			Network._instance.addHanlder(ProtocolsEnum.SSetTeamFormation, this, this.onSSetTeamFormation);
			Network._instance.addHanlder(ProtocolsEnum.SDismissTeam, this, this.onSDismissTeam);
			Network._instance.addHanlder(ProtocolsEnum.SGetRoleEquip, this, this.onSGetRoleEquip);
			Network._instance.addHanlder(ProtocolsEnum.SSetCommander, this, this.onSSetCommander);
			Network._instance.addHanlder(ProtocolsEnum.SAskforSetLeader, this, this.onSAskforSetLeader);
			Network._instance.addHanlder(ProtocolsEnum.SRequestSetLeaderSucc, this, this.onSRequestSetLeaderSucc);
			Network._instance.addHanlder(ProtocolsEnum.SAddTeamApply, this, this.onSAddTeamApply);
			Network._instance.addHanlder(ProtocolsEnum.SMemberSequence, this, this.onSMemberSequence);
			Network._instance.addHanlder(ProtocolsEnum.SSetTeamLeader, this, this.onSSetTeamLeader);
			Network._instance.addHanlder(ProtocolsEnum.STeamError, this, this.onSTeamError);
			Network._instance.addHanlder(ProtocolsEnum.SOneKeyTeamMatch, this, this.onSOneKeyTeamMatch);
			Network._instance.addHanlder(ProtocolsEnum.SRequestTeamMatchList, this, this.onSRequestTeamMatchList);
			Network._instance.addHanlder(ProtocolsEnum.SRequestMatchInfo, this, this.onSRequestMatchInfo);
			Network._instance.addHanlder(ProtocolsEnum.SForceInviteJointTeam, this, this.onSForceInviteJointTeam);
			Network._instance.addHanlder(ProtocolsEnum.SRemoveTeamMember, this, this.onSRemoveTeamMember);
			Network._instance.addHanlder(ProtocolsEnum.SUpdateMemberState, this, this.onSUpdateMemberState);
			Network._instance.addHanlder(ProtocolsEnum.SAskforCallBack, this, this.onSAskforCallBack);
			Network._instance.addHanlder(ProtocolsEnum.SOneKeyApplyTeamInfo, this, this.onCOneKeyApplyTeamInfo);
			Network._instance.addHanlder(ProtocolsEnum.SRequestJoinSucc, this, this.onSRequestJoinSucc);
			Network._instance.addHanlder(ProtocolsEnum.SRemoveTeamApply, this, this.onSRemoveTeamApply);
			Network._instance.addHanlder(ProtocolsEnum.SUpdateMemberHPMP, this, this.onSUpdateMemberHPMP);
			Network._instance.addHanlder(ProtocolsEnum.SUpdateMemberMaxHPMP, this, this.onSUpdateMemberMaxHPMP);
			Network._instance.addHanlder(ProtocolsEnum.SUpdateMemberLevel, this, this.onSUpdateMemberLevel);

			Network._instance.addHanlder(ProtocolsEnum.STeamRollMelon, this, this.onSTeamRollMelon);
			Network._instance.addHanlder(ProtocolsEnum.STeamRollMelonInfo, this, this.onSTeamRollMelonInfo);
			Network._instance.addHanlder(ProtocolsEnum.SEnterFuBen, this, this.onEnterFuBen);
		}

		// 移除监听
		private removeNetworkListener(): void {
			//Network._instance.removeHanlder(ProtocolsEnum.SCreateRole, this, this.onCreateRole);
			//Network._instance.removeHanlder(ProtocolsEnum.SEnterWorld, this, this.onEnterWorld);
		}
		private onEnterFuBen(optcode: number, msg: hanlder.S2C_EnterFuBen): void {
			RequesterProtocols._instance.c2s_req_line_task(msg.taskid);
		}
		private onSTeamRollMelonInfo(optcode: number, msg: hanlder.S2C_team_rollmeloninfo): void {
			console.log("-----------战斗结束奖励信息Info----：", msg.melonid);
			console.log("-----------战斗结束奖励信息Info----：", msg.rollinfolist);
			console.log("-----------战斗结束奖励信息Info----：", msg.grabroleid);
			console.log("-----------战斗结束奖励信息Info----：", msg.grabrolename);
			console.log("-----------战斗结束奖励信息Info----：", msg.melonitemlist);
		}
		/** 特殊副本队伍战斗结算奖励信息 */
		private onSTeamRollMelon(optcode: number, msg: hanlder.S2C_team_rollmelon): void {
			TeamModel.getInstance().melonlist = msg.melonlist;
			TeamModel.getInstance().watcher = msg.watcher;
			this.event(TEAM_ROLL_MELON);
		}
		/** 删除队伍申请 */
		private onSRemoveTeamApply(optcode: number, msg: hanlder.S2C_remove_teamapply): void {
			let arr = msg.applyids;
			for (var arrIndex = 0; arrIndex < arr.length; arrIndex++) {
				TeamModel.getInstance().applyList.remove(arr[arrIndex]);
			}
			this.event(REFRESH_APPLICATION);
			/** 刷新红点 */
			this.event(TEAM_RED_DOT, TeamRedDot.HIDE_TEAM_REDDOT);
		}
		/** 服务器返回，申请入队成功 */
		private onSRequestJoinSucc(optcode: number, msg: hanlder.S2C_reques_tjoinsucc): void {
			let leaderName = msg.rolename;
		}
		/** 一键召唤点击查看队伍信息 */
		private onCOneKeyApplyTeamInfo(optcode: number, msg: hanlder.S2C_one_keyapplyteaminfo): void {
			let teamId = msg.teamid;
			let memberlist  = new Laya.Dictionary;
			memberlist.set("memberlist",msg.memberlist);
			this.event(ONE_KEY_TEAMINFO, memberlist);
		}
		/** 队长请求召唤队员 */
		private onSAskforCallBack(optcode: number, msg: hanlder.S2C_askfor_callback): void {
			let leaderId = msg.leaderid;
			this.event(RESPONSE_CALL_BACK);
		}
		/** 更新队员状态 */
		private onSUpdateMemberState(optcode: number, msg: hanlder.S2C_update_memberstate): void {
			let roleid = msg.roleid;
			let roleState = msg.state;
			TeamModel.getInstance().updateMemberState.set(roleid, roleState);
			TeamModel.getInstance().updateMemberState_Del.set(roleid, roleState);
			this.event(REFRESH_FRIEND_ACCEPT_TEAM);
			this.event(UPDATE_TEAMMATE_STATE_POPUP);
		}
		/** 删除玩家 更新数据 */
		private onSRemoveTeamMember(optcode: number, msg: hanlder.S2C_remove_teamMember): void {
			let keys = msg.memberids;
			for (var roleIdKey = 0; roleIdKey < keys.length; roleIdKey++) {
				/** 移除玩家 */
				models.TeamModel.getInstance().teamMemberBasic.remove(keys[roleIdKey]);
				for (let TeamRoleInfoStorageIndex = 0; TeamRoleInfoStorageIndex < models.TeamModel.getInstance().TeamRoleInfoStorage.length; TeamRoleInfoStorageIndex++) {/** 每移除一个玩家，就要进行判断 将主界面的缓存队伍数据清掉*/
					if (models.TeamModel.getInstance().TeamRoleInfoStorage[TeamRoleInfoStorageIndex].roleid == keys[roleIdKey]) {
						models.TeamModel.getInstance().TeamRoleInfoStorage.splice(TeamRoleInfoStorageIndex, 1);
					}
				}

			}
			this.event(REFRESH_FRIEND_ACCEPT_TEAM);
		}
		/** 强制邀请某玩家入队 */
		private onSForceInviteJointTeam(optcode: number, msg: hanlder.S2C_force_invitejointteam) {
			let roleId = msg.roleid;
			this.event(AGREE_JOIN_EVENT, roleId);

		}
		/** 请求队伍匹配和个人匹配数量 */
		private onSRequestMatchInfo(optcode: number, msg: hanlder.S2C_request_matchinfo): void {
			let teammatchnum = msg.teammatchnum;
			let playermatchnum = msg.playermatchnum;
			this.event(WAIT_MATCH_EVENT, [teammatchnum, playermatchnum]);
			/** 这个又有啥用.. */
		}
		/** 返回队伍 */
		private onSRequestTeamMatchList(optcode: number, msg: hanlder.S2C_request_teammatchlist): void {
			TeamModel.getInstance().SRequestTeamMatchList.set("TeamMatchList", msg);
			//这里应该有事件，暂时天停住
			this.event(REFRESH_TEAMINFO_EVENT);
		}
		/** 一键喊话返回 */
		private onSOneKeyTeamMatch(optcode: number, msg: hanlder.S2C_one_keyteammatch): void {
			/** 一键喊话成功返回，有什么用？ */
			let ret = msg.ret;
			if (ret == 0) {/** 一键喊话成功 关闭界面 */
				this.event(ONE_KEY_YELL_SUCC);
			}
		}
		/** 服务器返回 重新设置队长 给所有队员 */
		private onSSetTeamLeader(optcode: number, msg: hanlder.S2C_set_teamleader): void {
			models.TeamModel.getInstance().entrustCaptain = msg.leaderId;
			this.event(REFRESH_FRIEND_ACCEPT_TEAM);
		}
		/** 队伍错误类型返回 */
		private onSTeamError(optcode: number, msg: hanlder.S2C_team_error): void {
			let eventType = msg.teamError;
			this.event(RESPONSE_TEAM_ERROR, eventType);
		}

		/** 服务器返回 队伍成员当前顺序 */
		private onSMemberSequence(optcode: number, msg: hanlder.S2C_member_sequence): void {
			game.modules.team.models.TeamModel.getInstance().nowTeamMember = msg.teamMemeberIdList;
			this.event(REFRESH_FRIEND_ACCEPT_TEAM);
		}
		/**队伍申请入队协议  */
		private onSAddTeamApply(optcode: number, msg: hanlder.S2C_add_teamapply): void {
			let teamApplySize = msg.applySize;
			for (var index = 0; index < teamApplySize; index++) {
				TeamModel.getInstance().applyList.set(msg.applylist[index].roleid, msg.applylist[index]);
				let arr = [msg.applylist[index].rolename];
				let _flag = friend.models.FriendModel.getInstance().isMyBlackList(msg.applylist[index].roleid);//判断申请入队的角色id是否是玩家自己黑名单存在
				if (_flag) return;
				let promot = HudModel.getInstance().promptAssembleBack(PromptExplain.APPLICATION_FOR_ADMISSION, arr);
				game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, promot);
			}
			if (teamApplySize != 0)
				/** 刷新红点 */
				this.event(TEAM_RED_DOT, TeamRedDot.SHOW_TEAM_REDDOT);
		}
		/** 请求提升某个玩家为队长成功（只是请求成功，对方还未同意）给队长？？ */
		private onSRequestSetLeaderSucc(optcode: number, msg: hanlder.S2C_request_setleadersucc): void {
			// models.TeamModel.getInstance().entrustCaptain = msg.inviteeId;
		}
		/** 服务端响应受委托为队长 这个是给受邀者显示的,id为队长 */
		private onSAskforSetLeader(optcode: number, msg: hanlder.S2C_askfor_setleader): void {
			/** 直接同意 */
			this.event(RESPONSE_TO_CAPTAIN);
		}

		/** 委任指挥返回 */
		private onSSetCommander(optcode: number, msg: hanlder.s2c_SSetCommander): void {
			models.TeamModel.getInstance().commanderRoleid = msg.roleId;
			this.event(REFRESH_FRIEND_ACCEPT_TEAM);
		}

		/** 人物装备刷新显示 */
		private onSGetRoleEquip(optcode: number, msg: hanlder.S2C_SGetRole_Equip): void {
			models.TeamModel.getInstance().roleEquipData = msg.SGetRoleEquip;
			this.event(REFRESH_VIEW_EQUIP);
		}

		/** 解散队伍 */
		private onSDismissTeam(optcode: number, msg: hanlder.S2C_dismiss_team): void {
			/** 清除队伍信息 */
			models.TeamModel.getInstance().teamMemberBasic.clear();
			models.TeamModel.getInstance().entrustCaptain = -1;
			models.TeamModel.getInstance().commanderRoleid = -1;
			models.TeamModel.getInstance().swapPosIndex = -1;
			models.TeamModel.getInstance().nowTeamMember = [];
			models.TeamModel.getInstance().TeamRoleInfoStorage = [];
			models.TeamModel.getInstance().friendsReceiveData = null;
			models.TeamModel.getInstance().screateTeam = null;
			this.event(REFRESH_FRIEND_ACCEPT_TEAM);
			this.event(MATCH_EVENT, 1);
		}



		/** 设置队伍光环 */
		private onSSetTeamFormation(optcode: number, msg: hanlder.S2C_set_teamformation): void {
			let _setTeamFormationVo = team.models.TeamModel.getInstance().setTeamFormationVo;
			_setTeamFormationVo.formation = msg.SetTeamFormation.formation;		
			_setTeamFormationVo.formationLevel = msg.SetTeamFormation.formationLevel;
			if(msg.SetTeamFormation.msg == 1){
				this.event(models.ZHENFA_LEVELUP);
			}
			_setTeamFormationVo.msg = msg.SetTeamFormation.msg;
		}


		/** 停止匹配 */
		private onStopTeamMatch(optcode: number, msg: hanlder.S2C_stop_teammatch): void {
			models.TeamModel.getInstance().matchFlag = false;
			let teamdata = new Laya.Dictionary();
			let teamdatas = [];
			teamdatas.push(models.TeamModel.getInstance().matchFlag);
			let key = models.TeamModel.getInstance().teamMemberBasic.keys;
			/** 如果自身组队状况下不做主界面的刷新 */
			let currTarget = TeamModel.getInstance().currMatchTarget;
			if (key.length == 0)
				teamdatas.push(currTarget);
			teamdata.set("data", teamdatas);
			team.models.TeamProxy.getInstance().event(team.models.MAINHUD_UPDATE_TEAM_STATE, teamdata);
			team.models.TeamProxy.getInstance().event(MATCH_EVENT, 1);
		}

		/** 创建队伍好友加入队伍 */
		private onSAddTeamMember(optcode: number, msg: hanlder.S2C_add_teammember): void {
			// models.TeamModel.getInstance().teamMemberBasic.set("teamMate",msg.memberlist);
			for (var index = 0; index < msg.teamSize; index++) {
				/** 这个问题注意值全是在memberlist里面的，这里的key不需要在vo里纠结 */
				models.TeamModel.getInstance().teamMemberBasic.set(msg.memberlist[index].roleid, msg.memberlist[index]);
			}
			this.event(OPEN_TEAM_EVENT);
			this.event(REFRESH_FRIEND_ACCEPT_TEAM);
		}
		/** 邀请 某位好友接收数据 */
		private onSInviteJoinTeam(optcode: number, msg: hanlder.S2C_invite_jointeam): void {
			var inviteJoinTeamVo = new InviteJoinTeamVo();
			inviteJoinTeamVo.leaderroleid = msg.inviteJoinTeamVo.leaderroleid;
			inviteJoinTeamVo.invitername = msg.inviteJoinTeamVo.invitername;
			let _flag = friend.models.FriendModel.getInstance().isMyBlackList(0, msg.inviteJoinTeamVo.invitername);//判断申请入队的角色名字是否是玩家自己黑名单存在
			if (_flag) return;
			inviteJoinTeamVo.inviterlevel = msg.inviteJoinTeamVo.inviterlevel;
			inviteJoinTeamVo.op = msg.inviteJoinTeamVo.op;
			models.TeamModel.getInstance().friendsReceiveData = inviteJoinTeamVo;
			this.event(IS_ACCEPT_INVITE, [inviteJoinTeamVo.invitername, inviteJoinTeamVo.inviterlevel, inviteJoinTeamVo.op,inviteJoinTeamVo.leaderroleid]);
		}
		/** 创建队伍成功 */
		private onSCreateTeam(optcode: number, msg: hanlder.S2C_create_team): void {
			var sCreateTeamVo = new SCreateTeamVo();
			sCreateTeamVo.teamid = msg.sCreateTeamVo.teamid;
			sCreateTeamVo.formation = msg.sCreateTeamVo.formation;
			sCreateTeamVo.teamstate = msg.sCreateTeamVo.teamstate;
			sCreateTeamVo.smapId = msg.sCreateTeamVo.smapId;
			models.TeamModel.getInstance().screateTeam = sCreateTeamVo;
			this.event(CREATE_TEAM_SUCC);

		}
		/** 邀请成功 */
		private onSinviteJoinSucc(optcode: number, msg: hanlder.S2C_invite_joinsucc): void {
			var S2C_invite_joinsucc: hanlder.S2C_invite_joinsucc = new hanlder.S2C_invite_joinsucc();
			S2C_invite_joinsucc.roleId = msg.roleId;
			/** 邀请成功但不知作用，用到再做处理 */

		}
		/** 开始匹配 */
		private onRequestTeamMatch(optcode: number, msg: hanlder.S2C_request_teammatch): void {
			var requestTeamMatchVo = new RequestTeamMatchVo();
			requestTeamMatchVo.typematch = msg.requestTeamMatchVo.typematch;
			requestTeamMatchVo.targetid = msg.requestTeamMatchVo.targetid;
			requestTeamMatchVo.levelmin = msg.requestTeamMatchVo.levelmin;
			requestTeamMatchVo.levelmax = msg.requestTeamMatchVo.levelmax;
			models.TeamModel.getInstance().matchTeam = requestTeamMatchVo;
			/** 只有当前匹配类型不为只设置队伍目标时才改变flag */
			if (requestTeamMatchVo.typematch != TypeMatch.SET_TARGET)
				models.TeamModel.getInstance().matchFlag = true;
			let key = models.TeamModel.getInstance().teamMemberBasic.keys;
			//这里没做请求但是服务端下发了类型为组队匹配的数据
			if (requestTeamMatchVo.typematch != TypeMatch.TEAM_MATCH) {
				/** 未组队状态下才更新主界面 */
				let teamdata = new Laya.Dictionary();
				let teamdatas = [];
				teamdatas.push(models.TeamModel.getInstance().matchFlag);
				let currTarget = TeamModel.getInstance().currMatchTarget;
				if (key.length == 0)
					teamdatas.push(currTarget);
				teamdata.set("data", teamdatas);
				team.models.TeamProxy.getInstance().event(team.models.MAINHUD_UPDATE_TEAM_STATE, teamdata);
			}
			if (requestTeamMatchVo.typematch == TypeMatch.TEAM_MATCH) {
				this.event(MATCH_EVENT, 2);
			}

		}

		/** 刷新队员的hp mp */
		private onSUpdateMemberHPMP(optcode:number, msg:hanlder.S2C_update_memberhpmp ):void
		{
			let keyName = models.TeamModel.getInstance().teamMemberBasic.keys;
			for (let teamIndex = 0; teamIndex < keyName.length; teamIndex++) 
			{
				if(keyName[teamIndex] == msg.roleid )
				{
					let memberBasic: game.modules.team.models.TeamMemberBasicVo = models.TeamModel.getInstance().teamMemberBasic.get(keyName[teamIndex]);
					{
						memberBasic.hp = msg.hp
						memberBasic.mp = msg.mp;
					}
				}
				
			}
			this.event(REFRESH_FRIEND_ACCEPT_TEAM);
		}
		/** 刷新队员的maxhp maxmp */
		private onSUpdateMemberMaxHPMP(optcode:number, msg:hanlder.S2C_update_membermaxhpmp ):void
		{
			let keyName = models.TeamModel.getInstance().teamMemberBasic.keys;
			for (let teamIndex = 0; teamIndex < keyName.length; teamIndex++) 
			{
				if(keyName[teamIndex] == msg.roleid )
				{
					let memberBasic: game.modules.team.models.TeamMemberBasicVo = models.TeamModel.getInstance().teamMemberBasic.get(keyName[teamIndex]);
					{
						memberBasic.maxhp = msg.maxhp
						memberBasic.maxmp = msg.maxmp;
					}
				}
			}
			this.event(REFRESH_FRIEND_ACCEPT_TEAM);
		}
		/** 刷新队员的等级 */
		private onSUpdateMemberLevel(optcode:number,msg:hanlder.S2C_update_memberlevel):void
		{
			let keyName = models.TeamModel.getInstance().teamMemberBasic.keys;
			for (let teamIndex = 0; teamIndex < keyName.length; teamIndex++) 
			{
				if(keyName[teamIndex] == msg.roleid )
				{
					let memberBasic: game.modules.team.models.TeamMemberBasicVo = models.TeamModel.getInstance().teamMemberBasic.get(keyName[teamIndex]);
					memberBasic.level = msg.level
				}
			}
			this.event(REFRESH_FRIEND_ACCEPT_TEAM);

		}
	}
}