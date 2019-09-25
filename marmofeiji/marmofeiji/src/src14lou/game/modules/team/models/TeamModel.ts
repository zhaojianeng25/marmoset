/**
* by ljm 
*/
enum TeamError 
{
	    /** 未知错误 */
		UnkownError = 0,                
		/** 自己已经在队伍中 */
		SelfInTeam = 1,						
		/** 自己不在队伍中 */
		SelfNotInTeam = 2,					
		/** 对方已经在队伍中 */
		ObjectInTeam = 3,				
		/** 自己不是队长 */
		SelfNOtLeader = 4,					
		/** 对方不是队长 */
		ObjectNotLeader = 5 ,				
		/** 对方不在线（有统一的Error吗） */
		ObjectOffline = 6,					
		/** 自己组队开关关闭 */
		SelfTeamFunctionClose = 7,			
		/** 对方组队开关关闭 */
		ObjectTeamFunctionClose = 8,		
		/** 自己在不可组队状态 */
		SelfInUnteamState = 9,				
		/** 对方在不可组队状态 */
		ObjectInUnteamState = 10,			
		/** 队伍人数已满 */
		TeamFull = 11,						
		/** 邀请 */
		InvitedInTeam = 12,					
		/** 对方正在被其他人邀请中 */
		BeingInvited = 13,					
		/** 30秒内只能邀请一次同一玩家 */
		InvitedIn30s = 14,					
		/** 正在邀请人数达到4个，不能再邀请更多 */
		InviteingsFull = 15,				
		/** 邀请您的队伍已经解散 */
		InviterTeamNotExist = 16,			
		/** 邀请者不是队长 */
		InviterNotLeader = 17,				
		/** 申请者已经在队伍中 */
		ApplierInTeam = 18,					
		/** 该申请已经超时 */
		ApplyTimeout = 19,					
		/** 队伍申请列表已满 */
		ApplyListFull = 20,					
		/** 申请者级别不符合队伍要求 */
		ApplierLevelValid = 21,				
		/** 队伍处在不可以换队长的状态 */
		ChangeLeaderUnable = 22,			
		/** 已经提出更换队长，等待回应中 */
		InChangeLeaderStatus = 23,			
		/** 队伍2分钟只能更换队长一次 */
		ChangeLeaderInCD = 24,				
		/** 队员不处于正常状态 */
		MembersNotNormal = 25,				
		/** 距离过远，不能归队 */
		TooFar = 26,						
		/** 队伍没有暂离的队员 */
		NoAbsentMember = 27,				
		/** 拒绝成为队长 */
		RefuseChangeLeader = 28,			
		/** 对方不在队伍中 */
		ObjectNotInTeam = 29,				
		/** 对方已经在此队伍的申请列表中 */
		AlreadyApply = 30,					
		/** 暂离队员不能成为队长 */
		AbsentCantBeLeader = 31,			
		/** 等级设置错误 */
		LevelSetError = 32,					
		/** 等级不符合 */
		LevelError = 33,					
		/** 没有设置目标 */
		NoTarget = 34,						
		/** 队伍已经组满 */
		TeamEnoughFull = 35,				
		/** 已经在匹配中 */
		InMatching = 36,					
		/** 活动未开放 */
		ActiveNotOpen = 37,					
		/** 没有工会 */
		NoFaction = 38,						
		/** 组队状态客户端服务器不同步 */
		TeamStateError = 39,				
		/** 一键喊话不到时间 */
		OneKeyApplyTeamNoTime = 40,			
		/** 不在队伍中不能ROLL点 */
		NoRollNotInTeam = 50,				
		/** 没有奖励可分配 */
		NoReward = 51,						
		/** 光环残卷不足 */
		FormBookHalfNotEnough = 55 ,		
		/** 无效的光环书 */
		UnKnuownFormBook = 56,				
		/** 光环等级已经最高了 */
		FromLevelMax = 57,					
		/** 光环ID */
		FormIdError = 58,					
		/** 光环书不足 */
		FormBookNotEnough = 59,				
	   
}
/** 队伍状态 */
enum TeamState
{
	/** 正常状态 */
	eNormalTeam = 1,						
	/** 等待中的队伍状态 */
	eWaitingSummonTeam = 2,					
	/** 等待中的队伍状态 */
	eSummonTeam = 3,						
}
/** 队员状态 */
enum TeamMemberState
{
	/** 正常状态 */
	eTeamNormal = 1,						
	/** 暂离状态 */
	eTeamAbsent = 2,						
	/** 回归队伍状态 */
	eTeamReturn = 3,						
	/** 离线状态 */
	eTeamFallline = 4,						
}
/** 队员申请 */
enum TeamMemberApply
{
	/** 回归 */
	CAME_BACK  = 0,						   
	/** 暂离队伍 */
	LEAVE_SOON = 1,						   
	 
}
/** 伙伴类型 */
enum huoBanType
{
	/** 物理型 */
	PHYSICAL_TYPE    = 1,					
	/** 法术型 */
	SPELL_TYPE       = 2,					
	/** 治疗型 */
	THERAPEUTIC_TYPE = 3,					
	/** 辅助型 */
	AUXILIARY_TYPE   = 4,					
	/** 控制型 */
	CONTROL_TYPE     = 5,					
}
/** 门派类型 */
enum huoBanType
{
	/** 云霄殿 */
	YUN_XIAO   	  = 11,					
	/** 火云岭 */
	HUO_YUN       = 12,					
	/** 苍羽宫 */
	CANG_YU 	  = 13,					
	/** 飞雪崖 */
	FEI_XUE   	  = 14,					
	/** 天雷狱 */
	TIAN_LEI      = 15,					
	/** 无量宫 */
	WU_LIANG      = 16,					
	/** 幽冥池 */
	YOU_MIN       = 17,					
	/** 七星观 */
	QI_XING       = 18,					
	/** 丹阳官 */
	DAN_YANG      = 19,					
}
/** 类型匹配 */
enum TypeMatch
{
	/** 个人组队匹配 */
	 PERSONEL_MATCH  =  0,					
	 /** 队伍匹配 */
     TEAM_MATCH      =  1,					
	 /** 只设置队伍目标 */
	 SET_TARGET      =  3,     			                 
}
/** 频道类型 */
enum ChannelType
{
	 /** 当前频道 */
	 CURRENR_CHANNEL  	  =  1,					 
	 /** 帮派频道 */
     FAMILY_CHANNEL       =  4,					 
	 /** 世界频道 */
	 WORLD_CHANNEL        =  5,     			    
	 /** 组队申请 */           
	 TEAM_APPLY        	  =  14,     			               
}
/** 邀请类型 */
enum InviteType
{
	/** 正常邀请 */
	 NORMAL_INVITE  	  =  0,					 
	 /** 强制邀请 */
     FORCE_INVITE         =  1,
	 /** 邀请好友 */
	 INVITE_FRIEND        =  2,
	 /** 邀请帮派成员 */
	 INVITE_FAMILY        =  3,						 
	       
}
/** 响应申请入队 */
enum ResponseApplicationTeam
{
	/** 拒绝响应 */
	REJECT_TEAM = 0,
	/**同意响应 */
	AGREEE_TEAM = 1,
}
/** 红点显示或隐藏 */
enum TeamRedDot
{
	/** 显示红点 */
	SHOW_TEAM_REDDOT = 1,
	/** 隐藏红点 */
	HIDE_TEAM_REDDOT = 2,
}

module game.modules.team.models
{
	export class TeamModel
	{
		/** 简单的队伍队员数据结构 */
		public TeamMemberSimple : Array<TeamMemberSimpleVo> = [];
		constructor()
		{
			TeamModel._instance = this;
			this.matchTeam       =  new RequestTeamMatchVo();
			this.teamMemberBasic =  new Laya.Dictionary();
			this.applyList 		 =  new Laya.Dictionary();
			this.roleEquipData   =  new SGetRoleEquipVo();
			this.SRequestTeamMatchList  =  new Laya.Dictionary();
			this.updateMemberState = new Laya.Dictionary();
			this.updateMemberState_Del = new Laya.Dictionary();
		}
		/** 门派图标 */
		public school: Array<string> = ["zs.png","qs.png","lr.png","dly.png","fs.png","ms.png","sm.png","dz.png","ss.png"];
		/** 最小的门派编号 */
		public schoolNumberLimitMin = 11;
		/** 最大的门派编号 */
		public schoolNumberLimitMax = 19;
		/** 被委任指挥的玩家 */
		public commanderRoleid : number;
		/** 被委托成为队长的玩家 */
		public entrustCaptain  : number;
		/** 取消或者匹配的Flag */
		public matchFlag: boolean = false;
		/** 点击交换位置的 */
		public swapPosIndex: number = -1;
		/** 队伍副本配置表 */
		public teamListConfig: Object = {} ;
		/** 创建队伍返回数据 */
		public screateTeam: Object = {};
		/** 邀请 其他好友接收的数据 */
		public friendsReceiveData: Object = {};
		/** 角色的装备信息 */
		public roleEquipData: SGetRoleEquipVo;
		/** 匹配返回目标数据 */
		public matchTeam: RequestTeamMatchVo;
		/** d队伍基本数据 取数据在这里 */
		public teamMemberBasic: Laya.Dictionary;
		/** 返回队伍 */
		public SRequestTeamMatchList: Laya.Dictionary;
		/** 更新队员的状态--存储 */
		public updateMemberState: Laya.Dictionary;
		/** 更新队员的状态--派发完事件即删 弹窗用 */
		public updateMemberState_Del: Laya.Dictionary;
		/** 现有队伍的角色 */
		public nowTeamMember: Array <any> = [];
		/** 队伍角色信息存储 */
		public TeamRoleInfoStorage: Array<any> = [];
		/** 添加申请者列表 */
		public applyList: Laya.Dictionary;
		/** 当前匹配目标 */
		public currMatchTarget: string;
		// /** 存储组队喊话之后点击的队伍信息 */
		// public oneKeyTeamnfo:
		/** 特殊副本结算奖励信息 */
		public melonlist:Array<game.modules.team.models.RollMelonVo>=[];
		/** 阵法数据 */
		public setTeamFormationVo = new SetTeamFormationVo();
		public watcher: number;
		private static _instance:TeamModel;
		public static getInstance():TeamModel 
		{
			if(!this._instance) 
			{
				this._instance = new TeamModel();

			}
			return this._instance;
		}
		public static clearModelData(): void {
			team.models.TeamModel._instance.matchTeam       =  new RequestTeamMatchVo();
			team.models.TeamModel._instance.teamMemberBasic =  new Laya.Dictionary();
			team.models.TeamModel._instance.applyList 		 =  new Laya.Dictionary();
			team.models.TeamModel._instance.roleEquipData   =  new SGetRoleEquipVo();
			team.models.TeamModel._instance.SRequestTeamMatchList  =  new Laya.Dictionary();
			team.models.TeamModel._instance.updateMemberState = new Laya.Dictionary();
			team.models.TeamModel._instance.updateMemberState_Del = new Laya.Dictionary();
			team.models.TeamModel._instance.matchFlag = false;
			team.models.TeamModel._instance.swapPosIndex = -1;
			team.models.TeamModel._instance.currMatchTarget = "";
			team.models.TeamModel._instance.nowTeamMember = [];
			team.models.TeamModel._instance.TeamRoleInfoStorage = [];
			team.models.TeamModel._instance.melonlist = [];
			team.models.TeamModel._instance.watcher = 0;
			team.models.TeamModel._instance.setTeamFormationVo = new SetTeamFormationVo();
		}
		/** 获取职业图标
		 * @param school 职业
		 */
		public getSchoolImgBack(school:number):any
		{ 
			if(school < this.schoolNumberLimitMin || school > this.schoolNumberLimitMax ) return null;
			let url = "";
			url = "ui/huoban/"+this.school[school -this.schoolNumberLimitMin];
			return url ;
			
		}
		/** 组队提示语句 
		 * @param type 提示Id
		*/
		public getTipsPromoto(type:number):string
		{
			let promoto = "";
			switch (type) {
				case TeamError.UnkownError: promoto = "<span style='color:#f6f6f4;fontSize:24'>未知错误</span>"; break;
				case TeamError.SelfInTeam: promoto = "<span style='color:#f6f6f4;fontSize:24'>自己已经在队伍中</span>"; break;
				case TeamError.SelfNotInTeam: promoto = "<span style='color:#f6f6f4;fontSize:24'>自己不在队伍中</span>"; break;
				case TeamError.ObjectInTeam: promoto = "<span style='color:#f6f6f4;fontSize:24'>对方已经在队伍中</span>"; break;
				case TeamError.SelfNOtLeader: promoto = "<span style='color:#f6f6f4;fontSize:24'>自己不是队长</span>"; break;
				case TeamError.ObjectNotLeader: promoto = "<span style='color:#f6f6f4;fontSize:24'>对方不是队长</span>"; break;
				case TeamError.ObjectOffline: promoto = "<span style='color:#f6f6f4;fontSize:24'>对方不在线（有统一的Error吗）</span>"; break;
				case TeamError.SelfTeamFunctionClose: promoto = "<span style='color:#f6f6f4;fontSize:24'>自己组队开关关闭</span>"; break;
				case TeamError.ObjectTeamFunctionClose: promoto = "<span style='color:#f6f6f4;fontSize:24'>对方组队开关关闭</span>"; break;
				case TeamError.SelfInUnteamState: promoto = "<span style='color:#f6f6f4;fontSize:24'>自己在不可组队状态</span>"; break;
				case TeamError.ObjectInUnteamState: promoto = "<span style='color:#f6f6f4;fontSize:24'>对方在不可组队状态</span>"; break;
				case TeamError.TeamFull: promoto = "<span style='color:#f6f6f4;fontSize:24'>队伍人数已满</span>"; break;
				case TeamError.InvitedInTeam: promoto = "<span style='color:#f6f6f4;fontSize:24'>对方已经在队伍中</span>"; break;
				case TeamError.BeingInvited: promoto = "<span style='color:#f6f6f4;fontSize:24'>对方正在被其他人邀请中</span>"; break;
				case TeamError.InvitedIn30s: promoto = "<span style='color:#f6f6f4;fontSize:24'>30秒内只能邀请一次同一玩家</span>"; break;
				case TeamError.InviteingsFull: promoto = "<span style='color:#f6f6f4;fontSize:24'>正在邀请人数达到4个，不能再邀请更多</span>"; break;
				case TeamError.InviterTeamNotExist: promoto = "<span style='color:#f6f6f4;fontSize:24'>邀请您的队伍已经解散</span>"; break;
				case TeamError.InviterNotLeader: promoto = "<span style='color:#f6f6f4;fontSize:24'>邀请者不是队长</span>"; break;
				case TeamError.ApplierInTeam: promoto = "<span style='color:#f6f6f4;fontSize:24'>申请者已经在队伍中</span>"; break;
				case TeamError.ApplyTimeout: promoto = "<span style='color:#f6f6f4;fontSize:24'>该申请已经超时</span>"; break;
				case TeamError.ApplyListFull: promoto = "<span style='color:#f6f6f4;fontSize:24'>队伍申请列表已满</span>"; break;
				case TeamError.ApplierLevelValid: promoto = "<span style='color:#f6f6f4;fontSize:24'>申请者级别不符合队伍要求</span>"; break;
				case TeamError.ChangeLeaderUnable: promoto = "<span style='color:#f6f6f4;fontSize:24'>队伍处在不可以换队长的状态</span>"; break;
				case TeamError.InChangeLeaderStatus: promoto = "<span style='color:#f6f6f4;fontSize:24'>已经提出更换队长，等待回应中</span>"; break;
				case TeamError.ChangeLeaderInCD: promoto = "<span style='color:#f6f6f4;fontSize:24'>队伍2分钟只能更换队长一次</span>"; break;
				case TeamError.MembersNotNormal: promoto = "<span style='color:#f6f6f4;fontSize:24'>队员不处于正常状态</span>"; break;
				case TeamError.TooFar: promoto = "<span style='color:#f6f6f4;fontSize:24'>距离过远，不能归队</span>"; break;
				case TeamError.NoAbsentMember: promoto = "<span style='color:#f6f6f4;fontSize:24'>队伍没有暂离的队员</span>"; break;
				case TeamError.RefuseChangeLeader: promoto = "<span style='color:#f6f6f4;fontSize:24'>拒绝成为队长</span>"; break;
				case TeamError.ObjectNotInTeam: promoto = "<span style='color:#f6f6f4;fontSize:24'>对方不在队伍中</span>"; break;
				case TeamError.AlreadyApply: promoto = "<span style='color:#f6f6f4;fontSize:24'>对方已经在此队伍的申请列表中</span>"; break;
				case TeamError.AbsentCantBeLeader: promoto = "<span style='color:#f6f6f4;fontSize:24'>暂离队员不能成为队长</span>"; break;
				case TeamError.LevelSetError: promoto = "<span style='color:#f6f6f4;fontSize:24'>等级设置错误</span>"; break;
				case TeamError.LevelError: promoto = "<span style='color:#f6f6f4;fontSize:24'>等级不符合</span>"; break;
				case TeamError.NoTarget: promoto = "<span style='color:#f6f6f4;fontSize:24'>没有设置目标</span>"; break;
				case TeamError.TeamEnoughFull: promoto = "<span style='color:#f6f6f4;fontSize:24'>队伍已经组满</span>"; break;
				case TeamError.InMatching: promoto = "<span style='color:#f6f6f4;fontSize:24'>已经在匹配中</span>"; break;
				case TeamError.ActiveNotOpen: promoto = "<span style='color:#f6f6f4;fontSize:24'>活动未开放</span>"; break;
				case TeamError.NoFaction: promoto = "<span style='color:#f6f6f4;fontSize:24'>没有工会</span>"; break;
				case TeamError.TeamStateError: promoto = "<span style='color:#f6f6f4;fontSize:24'>组队状态客户端服务器不同步</span>"; break;
				case TeamError.OneKeyApplyTeamNoTime: promoto = "<span style='color:#f6f6f4;fontSize:24'>一键喊话不到时间</span>"; break;
				case TeamError.NoRollNotInTeam: promoto = "<span style='color:#f6f6f4;fontSize:24'>不在队伍中不能ROLL点</span>"; break;
				case TeamError.NoReward: promoto = "<span style='color:#f6f6f4;fontSize:24'>没有奖励可分配</span>"; break;
				case TeamError.FormBookHalfNotEnough: promoto = "<span style='color:#f6f6f4;fontSize:24'>光环残卷不足</span>"; break;
				case TeamError.UnKnuownFormBook: promoto = "<span style='color:#f6f6f4;fontSize:24'>无效的光环书</span>"; break;
				case TeamError.FromLevelMax: promoto = "<span style='color:#f6f6f4;fontSize:24'>光环等级已经最高了</span>"; break;
				case TeamError.FormIdError: promoto = "<span style='color:#f6f6f4;fontSize:24'>光环ID</span>"; break;
				case TeamError.FormBookNotEnough: promoto = "<span style='color:#f6f6f4;fontSize:24'>光环书不足</span>"; break; 
				default:
				break;
			}
			return promoto;

		
		}
	}
}