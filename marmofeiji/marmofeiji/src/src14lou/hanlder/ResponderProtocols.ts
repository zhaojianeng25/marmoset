/**
* name 
*/
module hanlder {
	export class ResponderProtocols {
		constructor() {
			ResponderProtocols._instance = this;
		}
		private static _instance: ResponderProtocols;
		public static getInstance(): ResponderProtocols {
			if (!this._instance) {
				this._instance = new ResponderProtocols();
			}
			return this._instance;
		}
		public readPacket(optcode: number, bs: ByteArray): any {
			console.log("readPacket:", optcode, bs);
			//console.log("readPacket:", optcode);
			switch (optcode) {

				case ProtocolsEnum.SCreateRole:	//创建角色返回
					var obj_create_role_action: S2C_create_role = new S2C_create_role();
					S2C_create_role.read(obj_create_role_action, bs);
					return obj_create_role_action;
				case ProtocolsEnum.ErrorInfo: //登录错误信息返回
					var obj_error_info_action: S2C_error_info = new S2C_error_info();
					S2C_error_info.read(obj_error_info_action, bs);
					return obj_error_info_action;
				case ProtocolsEnum.SOnlineAnnounce:	//登录返回
					var obj_online_announce_action: S2C_Online_Announce = new S2C_Online_Announce();
					S2C_Online_Announce.read(obj_online_announce_action, bs);
					return obj_create_role_action;
				case ProtocolsEnum.SRoleList:// 返回角色列表
					var obj_SRoleList: S2C_SRoleList = new S2C_SRoleList();
					S2C_SRoleList.read(obj_SRoleList, bs);
					return obj_SRoleList;
				case ProtocolsEnum.SEnterWorld:// 进入游戏返回
					var obj_SEnterWorld: S2C_SEnterWorld = new S2C_SEnterWorld();
					S2C_SEnterWorld.read(obj_SEnterWorld, bs);
					return obj_SEnterWorld;
				case ProtocolsEnum.SSendRoundScript://服务器向客户端发送剧本
					var obj_SSendRoundScript: S2C_SSendRoundScript = new S2C_SSendRoundScript();
					S2C_SSendRoundScript.read(obj_SSendRoundScript, bs);
					return obj_SSendRoundScript;
				case ProtocolsEnum.SRefreshRoleScore://刷新人物评分的消息
					var obj_SRefreshRoleScore: s2c_SRefreshRoleScore = new s2c_SRefreshRoleScore();
					s2c_SRefreshRoleScore.read(obj_SRefreshRoleScore, bs);
					return obj_SRefreshRoleScore;
				//txx
				case ProtocolsEnum.SRefreshRoleData://刷新人物属性的消息
					var obj_SRefreshRoleData: s2c_SRefreshRoleData = new s2c_SRefreshRoleData();
					s2c_SRefreshRoleData.read(obj_SRefreshRoleData, bs);
					return obj_SRefreshRoleData;
				case ProtocolsEnum.SRefreshRoleCurrency://刷新人物通货的消息
					var obj_SRefreshRoleCurrency: s2c_SRefreshRoleCurrency = new s2c_SRefreshRoleCurrency();
					s2c_SRefreshRoleCurrency.read(obj_SRefreshRoleCurrency, bs);
					return obj_SRefreshRoleCurrency;
				case ProtocolsEnum.SRefreshPointType://刷新人物加点后的加点面板数值
					var obj_SRefreshPointType: s2c_SRefreshPointType = new s2c_SRefreshPointType();
					s2c_SRefreshPointType.read(obj_SRefreshPointType, bs);
					return obj_SRefreshPointType;
				case ProtocolsEnum.SRefreshCurrency:  //S2C_SRefresh_Currency
					var obj_SRefresh_Currency_action: S2C_SRefresh_Currency = new S2C_SRefresh_Currency();
					S2C_SRefresh_Currency.read(obj_SRefresh_Currency_action, bs);
					return obj_SRefresh_Currency_action;
				case ProtocolsEnum.SSendInborns:
					var obj_send_inborns_action: S2C_send_inborns = new S2C_send_inborns();
					S2C_send_inborns.read(obj_send_inborns_action, bs)
					return obj_send_inborns_action;
				case ProtocolsEnum.SRspRoleInfo://人物信息界面回复
					var obj_SRspRoleInfo: S2C_SRspRoleInfo = new S2C_SRspRoleInfo();
					S2C_SRspRoleInfo.read(obj_SRspRoleInfo, bs);
					return obj_SRspRoleInfo;
				case ProtocolsEnum.SBeginSchoolWheel:	//<!-- -->
					var obj_SBeginSchoolWheel_action: S2C_SBeginSchoolWheel = new S2C_SBeginSchoolWheel();
					S2C_SBeginSchoolWheel.read(obj_SBeginSchoolWheel_action, bs);
					return obj_SBeginSchoolWheel_action;
				case ProtocolsEnum.SUpdateInborn:
					var obj_update_inborn_action: S2C_update_inborn = new S2C_update_inborn();
					S2C_update_inborn.read(obj_update_inborn_action, bs)
					return obj_update_inborn_action;
				case ProtocolsEnum.SUpdateLearnLiveSkill:
					var obj_update_learnliveskill_action: S2C_update_learnliveskill = new S2C_update_learnliveskill();
					S2C_update_learnliveskill.read(obj_update_learnliveskill_action, bs)
					return obj_update_learnliveskill_action;
				case ProtocolsEnum.SRequestParticleSkillList:
					var obj_request_particleskilllist_action: S2C_request_particleskilllist = new S2C_request_particleskilllist();
					S2C_request_particleskilllist.read(obj_request_particleskilllist_action, bs)
					return obj_request_particleskilllist_action;
				case ProtocolsEnum.SUpdateLearnParticleSkill:
					var obj_update_learnparticleskill_action: S2C_update_learnparticleskill = new S2C_update_learnparticleskill();
					S2C_update_learnparticleskill.read(obj_update_learnparticleskill_action, bs)
					return obj_update_learnparticleskill_action;
				case ProtocolsEnum.SLiveSkillMakeFood:
					var obj_live_skillsakefood_action: S2C_live_skillsakefood = new S2C_live_skillsakefood();
					S2C_live_skillsakefood.read(obj_live_skillsakefood_action, bs)
					return obj_live_skillsakefood_action;
				case ProtocolsEnum.SLiveSkillMakeStuff:
					var obj_live_skillmakestuff_action: S2C_live_skillmakestuff = new S2C_live_skillmakestuff();
					S2C_live_skillmakestuff.read(obj_live_skillmakestuff_action, bs)
					return obj_live_skillmakestuff_action;
				case ProtocolsEnum.SLiveSkillMakeCard:
					var obj_live_skillmakecard_action: S2C_live_skillmakecard = new S2C_live_skillmakecard();
					S2C_live_skillmakecard.read(obj_live_skillmakecard_action, bs)
					return obj_live_skillmakecard_action;
				case ProtocolsEnum.SLiveSkillMakeDrug:
					var obj_live_skillmakedrug_action: S2C_live_skillmakedrug = new S2C_live_skillmakedrug();
					S2C_live_skillmakedrug.read(obj_live_skillmakedrug_action, bs)
					return obj_live_skillmakedrug_action;
				case ProtocolsEnum.SSendSystemMessageToRole:	// 聊天S-->C
					var obj_SSendSystemMessageToRole_action: S2C_SSendSystemMessageToRole = new S2C_SSendSystemMessageToRole();
					S2C_SSendSystemMessageToRole.read(obj_SSendSystemMessageToRole_action, bs);
					return obj_SSendSystemMessageToRole_action;
				case ProtocolsEnum.SRecommendFriend:	//服务器返回推荐好友
					var obj_SRecommendFriend_action: S2C_SRecommendFriend = new S2C_SRecommendFriend();
					S2C_SRecommendFriend.read(obj_SRecommendFriend_action, bs);
					return obj_SRecommendFriend_action;
				case ProtocolsEnum.SSearchFriend:	//搜索好友成功S->C
					var obj_SSearchFriend_action: S2C_SSearchFriend = new S2C_SSearchFriend();
					S2C_SSearchFriend.read(obj_SSearchFriend_action, bs);
					return obj_SSearchFriend_action;
				case ProtocolsEnum.SAddFriend:
					var obj_SAddFriend_action: S2C_SAddFriend = new S2C_SAddFriend();
					S2C_SAddFriend.read(obj_SAddFriend_action, bs);
					return obj_SAddFriend_action;
				case ProtocolsEnum.SStrangerMessageToRole:
					var obj_SStrangerMessageToRole_action: S2C_SStrangerMessageToRole = new S2C_SStrangerMessageToRole();
					S2C_SStrangerMessageToRole.read(obj_SStrangerMessageToRole_action, bs);
					return obj_SStrangerMessageToRole_action;
				case ProtocolsEnum.SFriendsInfoInit:
					var obj_SFriendsInfoInit_action: S2C_SFriendsInfoInit = new S2C_SFriendsInfoInit();
					S2C_SFriendsInfoInit.read(obj_SFriendsInfoInit_action, bs);
					return obj_SFriendsInfoInit_action;
				case ProtocolsEnum.SSearchBlackRoleInfo:
					var obj_search_blackroleinfo_action: S2C_search_blackroleinfo = new S2C_search_blackroleinfo();
					S2C_search_blackroleinfo.read(obj_search_blackroleinfo_action, bs);
					return obj_search_blackroleinfo_action;
				case ProtocolsEnum.SBlackRoles:
					var obj_black_roles_action: S2C_black_roles = new S2C_black_roles();
					S2C_black_roles.read(obj_black_roles_action, bs);
					return obj_black_roles_action;
				case ProtocolsEnum.SFriendMessageToRole:
					var obj_SFriendMessageToRole_action: S2C_SFriendMessageToRole = new S2C_SFriendMessageToRole();
					S2C_SFriendMessageToRole.read(obj_SFriendMessageToRole_action, bs);
					return obj_SFriendMessageToRole_action;
				case ProtocolsEnum.SOffLineMsgMessageToRole:
					var obj_SOffLineMsgMessageToRole_action: S2C_SOffLineMsgMessageToRole = new S2C_SOffLineMsgMessageToRole();
					S2C_SOffLineMsgMessageToRole.read(obj_SOffLineMsgMessageToRole_action, bs);
					return obj_SOffLineMsgMessageToRole_action;
				case ProtocolsEnum.SRspServerId:	//<!-- -->
					var obj_SRspServerId_action: S2C_SRspServerId = new S2C_SRspServerId();
					S2C_SRspServerId.read(obj_SRspServerId_action, bs);
					return obj_SRspServerId_action;
				case ProtocolsEnum.SReqRecruitWheel:	//<!-- 请求招募大转盘信息结果 -->
					var obj_req_recruitwheel_action: S2C_req_recruitwheel = new S2C_req_recruitwheel();
					S2C_req_recruitwheel.read(obj_req_recruitwheel_action, bs);
					return obj_req_recruitwheel_action;
				case ProtocolsEnum.SReqFortuneWheel:
					var obj_req_fortune_wheel_action: s2c_req_fortune_wheel = new s2c_req_fortune_wheel();
					s2c_req_fortune_wheel.read(obj_req_fortune_wheel_action, bs)
					return obj_req_fortune_wheel_action;
				case ProtocolsEnum.SMailInfo:  //S2C_SMail_Info
					var obj_SMail_Info_action: S2C_SMail_Info = new S2C_SMail_Info();
					S2C_SMail_Info.read(obj_SMail_Info_action, bs);
					return obj_SMail_Info_action;
				case ProtocolsEnum.SMailState:  //S2C_SMail_State
					var obj_SMail_State_action: S2C_SMail_State = new S2C_SMail_State();
					S2C_SMail_State.read(obj_SMail_State_action, bs);
					return obj_SMail_State_action;
				case ProtocolsEnum.SMailList:  //S2C_SMail_List
					var obj_SMail_List_action: S2C_SMail_List = new S2C_SMail_List();
					S2C_SMail_List.read(obj_SMail_List_action, bs);
					return obj_SMail_List_action;
				case ProtocolsEnum.SGiveGift:	//<!-- 赠送礼物结果 -->
					var obj_givegift_action: S2C_give_gift = new S2C_give_gift();
					S2C_give_gift.read(obj_givegift_action, bs);
					return obj_givegift_action;
				case ProtocolsEnum.SUpdateFriendLevel:
					var obj_SUpdateFriendLevel_action: S2C_SUpdateFriendLevel = new S2C_SUpdateFriendLevel();
					S2C_SUpdateFriendLevel.read(obj_SUpdateFriendLevel_action, bs);
					return obj_SUpdateFriendLevel_action;
				case ProtocolsEnum.SGiveItem:	//<!-- 赠送道具结果 -->
					var obj_giveitem_action: S2C_give_item = new S2C_give_item();
					S2C_give_item.read(obj_giveitem_action, bs);
					return obj_giveitem_action;
				case ProtocolsEnum.SBreakOffRelation:
					var obj_SBreakOffRelation_action: S2C_SBreakOffRelation = new S2C_SBreakOffRelation();
					S2C_SBreakOffRelation.read(obj_SBreakOffRelation_action, bs);
					return obj_SBreakOffRelation_action;
				case ProtocolsEnum.SAnswerRoleTeamState://返回玩家请求的其他玩家的组队情况
					var obj_SAnswerRoleTeamState: S2C_SAnswerRoleTeamState = new S2C_SAnswerRoleTeamState();
					S2C_SAnswerRoleTeamState.read(obj_SAnswerRoleTeamState, bs);
					return obj_SAnswerRoleTeamState;
				case ProtocolsEnum.SRoleAccusationCheck:	//<!-- -->
					var obj_SRoleAccusationCheck_action: S2C_SRoleAccusationCheck = new S2C_SRoleAccusationCheck();
					S2C_SRoleAccusationCheck.read(obj_SRoleAccusationCheck_action, bs);
					return obj_SRoleAccusationCheck_action;
				case ProtocolsEnum.SRequestUpdateRoleInfo:
					var obj_SRequestUpdateRoleInfo_action: S2C_SRequestUpdateRoleInfo = new S2C_SRequestUpdateRoleInfo();
					S2C_SRequestUpdateRoleInfo.read(obj_SRequestUpdateRoleInfo_action, bs);
					return obj_SRequestUpdateRoleInfo_action;
				case ProtocolsEnum.SRefreshUserExp:// 通知客户端刷新人物经验
					var obj_SRefreshUserExp: S2C_SRefreshUserExp = new S2C_SRefreshUserExp();
					S2C_SRefreshUserExp.read(obj_SRefreshUserExp, bs);
					return obj_SRefreshUserExp;
				case ProtocolsEnum.SRequestLiveSkillList:
					var obj_request_liveskilllist_action: S2C_request_liveskilllist = new S2C_request_liveskilllist();
					S2C_request_liveskilllist.read(obj_request_liveskilllist_action, bs)
					return obj_request_liveskilllist_action;
				case ProtocolsEnum.SLiveSkillMakeFarm:
					var obj_live_skillmakefarm_action: S2C_live_skillmakefarm = new S2C_live_skillmakefarm();
					S2C_live_skillmakefarm.read(obj_live_skillmakefarm_action, bs)
					return obj_live_skillmakefarm_action;
				case ProtocolsEnum.SLiveSkillMakeEnhancement:
					var obj_live_skillmakeenhancement_action: S2C_live_skillmakeenhancement = new S2C_live_skillmakeenhancement();
					S2C_live_skillmakeenhancement.read(obj_live_skillmakeenhancement_action, bs)
					return obj_live_skillmakeenhancement_action;
				case ProtocolsEnum.SReqHelpCountView://
					var obj_SReqHelpCountView: S2C_SReqHelpCountView = new S2C_SReqHelpCountView();
					S2C_SReqHelpCountView.read(obj_SReqHelpCountView, bs);
					return obj_SReqHelpCountView;
				case ProtocolsEnum.SSendHelpSW://援助声望当前值
					var obj_SSendHelpSW: S2C_SSendHelpSW = new S2C_SSendHelpSW();
					S2C_SSendHelpSW.read(obj_SSendHelpSW, bs);
					return obj_SSendHelpSW;
				case ProtocolsEnum.SServerLevel://
					var obj_SServerLevel: S2C_SServerLevel = new S2C_SServerLevel();
					S2C_SServerLevel.read(obj_SServerLevel, bs);
					return obj_SServerLevel;
				case ProtocolsEnum.SReqPointSchemeTime://返回人物切换加点方案次数
					var obj_SReqPointSchemeTime: S2C_SReqPointSchemeTime = new S2C_SReqPointSchemeTime();
					S2C_SReqPointSchemeTime.read(obj_SReqPointSchemeTime, bs);
					return obj_SReqPointSchemeTime;
				case ProtocolsEnum.SExpMessageTips:
					var obj_exp_messagetips_action: S2C_exp_messagetips = new S2C_exp_messagetips();
					S2C_exp_messagetips.read(obj_exp_messagetips_action, bs)
					return obj_exp_messagetips_action;
				case ProtocolsEnum.SQueryRegData://每日签到奖励
					var obj_queryregdata: s2c_SQueryRegData = new s2c_SQueryRegData();
					s2c_SQueryRegData.read(obj_queryregdata, bs);
					return obj_queryregdata;
				/*case ProtocolsEnum.SQueryFestivalData://节日签到数据
					var obj_queryfestivaldata: s2c_QueryFestivalData = new s2c_QueryFestivalData();
					s2c_QueryFestivalData.read(obj_queryfestivaldata, bs);
					return obj_queryfestivaldata;
				case ProtocolsEnum.SQueryJRAwardData://请求节日活跃度奖励表数据
					var obj_QueryJRAwardData: s2c_QueryJRAwardData = new s2c_QueryJRAwardData();
					s2c_QueryJRAwardData.read(obj_QueryJRAwardData, bs);
					return obj_QueryJRAwardData;
				case ProtocolsEnum.SQueryChargeAwardCountData://请求累计充值奖励表数据
					var obj_QueryChargeAwardCountData: s2c_QueryChargeAwardCountData = new s2c_QueryChargeAwardCountData();
					s2c_QueryChargeAwardCountData.read(obj_QueryChargeAwardCountData, bs);
					return obj_QueryChargeAwardCountData;
				case ProtocolsEnum.SQueryHydScoreData://请求节日积分奖励表数据
					var obj_QueryHydScoreData: s2c_QueryHydScoreData = new s2c_QueryHydScoreData();
					s2c_QueryHydScoreData.read(obj_QueryHydScoreData, bs);
					return obj_QueryHydScoreData;
				case ProtocolsEnum.SQQExchangeCodeStatus://服务端发送QQ会员兑换码状态
					var obj_QQExchangeCodeStatus: s2c_QQExchangeCodeStatus = new s2c_QQExchangeCodeStatus();
					s2c_QQExchangeCodeStatus.read(obj_QQExchangeCodeStatus, bs);
					return obj_QQExchangeCodeStatus;
				case ProtocolsEnum.SExchangeCode://服务端返回兑换成功标志
					var obj_SExchangeCode: s2c_SExchangeCode = new s2c_SExchangeCode();
					s2c_SExchangeCode.read(obj_SExchangeCode, bs);
					return obj_SExchangeCode;
				case ProtocolsEnum.SXMRNPCView://请求熊猫人界面
					var obj_SXMRNPCView: s2c_SXMRNPCView = new s2c_SXMRNPCView();
					s2c_SXMRNPCView.read(obj_SXMRNPCView, bs);
					return obj_SXMRNPCView;
				case ProtocolsEnum.SXMRBossNPCView://请求熊猫人boss界面
					var obj_SXMRBossNPCView: s2c_SXMRBossNPCView = new s2c_SXMRBossNPCView();
					s2c_SXMRBossNPCView.read(obj_SXMRBossNPCView, bs);
					return obj_SXMRBossNPCView;
				case ProtocolsEnum.SXMRGiveRose://点赞
					var obj_SXMRGiveRose: s2c_SXMRGiveRose = new s2c_SXMRGiveRose();
					s2c_SXMRGiveRose.read(obj_SXMRGiveRose, bs);
					return obj_SXMRGiveRose;*/
				// case ProtocolsEnum.SRefreshRoleData://刷新人物属性的消息
				// 	var obj_SRefreshRoleData: s2c_SRefreshRoleData = new s2c_SRefreshRoleData();
				// 	s2c_SRefreshRoleData.read(obj_SRefreshRoleData, bs);
				// 	return obj_SRefreshRoleData;
				case ProtocolsEnum.SRefreshPetData://刷新宠物属性的消息
					var obj_SRefreshPetData: s2c_SRefreshPetData = new s2c_SRefreshPetData();
					s2c_SRefreshPetData.read(obj_SRefreshPetData, bs);
					return obj_SRefreshPetData;
				case ProtocolsEnum.SRefreshPointType://刷新人物加点后的加点面板数值
					var obj_SRefreshPointType: s2c_SRefreshPointType = new s2c_SRefreshPointType();
					s2c_SRefreshPointType.read(obj_SRefreshPointType, bs);
					return obj_SRefreshPointType;

				case ProtocolsEnum.SRefreshRoleCurrency://刷新人物通货的消息
					var obj_SRefreshRoleCurrency: s2c_SRefreshRoleCurrency = new s2c_SRefreshRoleCurrency();
					s2c_SRefreshRoleCurrency.read(obj_SRefreshRoleCurrency, bs);
					return obj_SRefreshRoleCurrency;
				case ProtocolsEnum.SApplyYingFuExprience://服务器回复角色盈福经验
					var obj_SApplyYingFuExprience: s2c_SApplyYingFuExprience = new s2c_SApplyYingFuExprience();
					s2c_SApplyYingFuExprience.read(obj_SApplyYingFuExprience, bs);
					return obj_SApplyYingFuExprience;
				case ProtocolsEnum.SSendBattleStart://服务器向客户端发送战斗信息
					var obj_SSendBattleStart: s2c_SSendBattleStart = new s2c_SSendBattleStart();
					s2c_SSendBattleStart.read(obj_SSendBattleStart, bs);
					return obj_SSendBattleStart;
				case ProtocolsEnum.SSendAddFighters://服务器向客户端发送战斗信息
					var obj_SSendAddFighters: s2c_SSendAddFighters = new s2c_SSendAddFighters();
					s2c_SSendAddFighters.read(obj_SSendAddFighters, bs);
					return obj_SSendAddFighters;
				case ProtocolsEnum.SSendRoundStart://服务器向客户端发送 开始回合操作选择
					var obj_SSendRoundStart: s2c_SSendRoundStart = new s2c_SSendRoundStart();
					s2c_SSendRoundStart.read(obj_SSendRoundStart, bs);
					return obj_SSendRoundStart;
				case ProtocolsEnum.SSendBattleEnd://服务器向客户端发送结束战斗消息
					var obj_SSendBattleEnd: s2c_SSendBattleEnd = new s2c_SSendBattleEnd();
					s2c_SSendBattleEnd.read(obj_SSendBattleEnd, bs);
					return obj_SSendBattleEnd;
				case ProtocolsEnum.SRemoveWatcher://退出观战的fighter
					var obj_SRemoveWatcher: s2c_SRemoveWatcher = new s2c_SRemoveWatcher();
					s2c_SRemoveWatcher.read(obj_SRemoveWatcher, bs);
					return obj_SRemoveWatcher;
				case ProtocolsEnum.SSendWatchBattleStart://服务器向客户端发送观战开始信息
					var obj_SSendWatchBattleStart: s2c_SSendWatchBattleStart = new s2c_SSendWatchBattleStart();
					s2c_SSendWatchBattleStart.read(obj_SSendWatchBattleStart, bs);
					return obj_SSendWatchBattleStart;
				case ProtocolsEnum.SSendBattlerOperateState://发送人物操作状态（准备中，请等待，掉线）
					var obj_SSendBattlerOperateState: s2c_SSendBattlerOperateState = new s2c_SSendBattlerOperateState();
					s2c_SSendBattlerOperateState.read(obj_SSendBattlerOperateState, bs);
					return obj_SSendBattlerOperateState;
				case ProtocolsEnum.SSendRoleInitAttrs://服务器发给客户端，进战斗时主角的二级属性
					var obj_SSendRoleInitAttrs: s2c_SSendRoleInitAttrs = new s2c_SSendRoleInitAttrs();
					s2c_SSendRoleInitAttrs.read(obj_SSendRoleInitAttrs, bs);
					return obj_SSendRoleInitAttrs;
				case ProtocolsEnum.SSendPetInitAttrs://服务器发给客户端，进战斗时主角宠物的二级属性
					var obj_SSendPetInitAttrs: s2c_SSendPetInitAttrs = new s2c_SSendPetInitAttrs();
					s2c_SSendPetInitAttrs.read(obj_SSendPetInitAttrs, bs);
					return obj_SSendPetInitAttrs;
				case ProtocolsEnum.SSendAlreadyUseItem://服务器向客户端发送已经使用过的道具列表，baseid
					var obj_SSendAlreadyUseItem: s2c_SSendAlreadyUseItem = new s2c_SSendAlreadyUseItem();
					s2c_SSendAlreadyUseItem.read(obj_SSendAlreadyUseItem, bs);
					return obj_SSendAlreadyUseItem;
				case ProtocolsEnum.SSynchroBossHp://服务器向客户端发送公会boss血量
					var obj_SSynchroBossHp: s2c_SSynchroBossHp = new s2c_SSynchroBossHp();
					s2c_SSynchroBossHp.read(obj_SSynchroBossHp, bs);
					return obj_SSynchroBossHp;
				case ProtocolsEnum.SSendRoundPlayEnd://服务器广播给战斗内所有人，某个角色已经播放动画完毕了
					var obj_SSendRoundPlayEnd: s2c_SSendRoundPlayEnd = new s2c_SSendRoundPlayEnd();
					s2c_SSendRoundPlayEnd.read(obj_SSendRoundPlayEnd, bs);
					return obj_SSendRoundPlayEnd;

				/*case ProtocolsEnum.SDeadLess20://20级之前死了发送这个消息
					var obj_SDeadLess20: s2c_SDeadLess20 = new s2c_SDeadLess20();
					s2c_SDeadLess20.read(obj_SDeadLess20, bs);
					return obj_SDeadLess20;
				case ProtocolsEnum.SPvP1MyInfo://服务器发送自己的信息
					var obj_SPvP1MyInfo: s2c_SPvP1MyInfo = new s2c_SPvP1MyInfo();
					s2c_SPvP1MyInfo.read(obj_SPvP1MyInfo, bs);
					return obj_SPvP1MyInfo;
				case ProtocolsEnum.SPvP1RankingList://服务器发送排行榜
					var obj_SPvP1RankingList: s2c_SPvP1RankingList = new s2c_SPvP1RankingList();
					s2c_SPvP1RankingList.read(obj_SPvP1RankingList, bs);
					return obj_SPvP1RankingList;
				case ProtocolsEnum.SPvP1ReadyFight://服务器发送准备状态
					var obj_SPvP1ReadyFight: s2c_SPvP1ReadyFight = new s2c_SPvP1ReadyFight();
					s2c_SPvP1ReadyFight.read(obj_SPvP1ReadyFight, bs);
					return obj_SPvP1ReadyFight;
				case ProtocolsEnum.SPvP1BattleInfo://服务器发送场内战斗信息
					var obj_SPvP1BattleInfo: s2c_SPvP1BattleInfo = new s2c_SPvP1BattleInfo();
					s2c_SPvP1BattleInfo.read(obj_SPvP1BattleInfo, bs);
					return obj_SPvP1BattleInfo;
				case ProtocolsEnum.SPvP1MatchResult://通知客户端匹配结果
					var obj_SPvP1MatchResult: s2c_SPvP1MatchResult = new s2c_SPvP1MatchResult();
					s2c_SPvP1MatchResult.read(obj_SPvP1MatchResult, bs);
					return obj_SPvP1MatchResult;
				case ProtocolsEnum.SPvP1OpenBoxState://服务器发送箱子状态
					var obj_SPvP1OpenBoxState: s2c_SPvP1OpenBoxState = new s2c_SPvP1OpenBoxState();
					s2c_SPvP1OpenBoxState.read(obj_SPvP1OpenBoxState, bs);
					return obj_SPvP1OpenBoxState;*/
				case ProtocolsEnum.SPvP3MyInfo://服务器发送自己的信息
					var obj_SPvP3MyInfo: s2c_SPvP3MyInfo = new s2c_SPvP3MyInfo();
					s2c_SPvP3MyInfo.read(obj_SPvP3MyInfo, bs);
					return obj_SPvP3MyInfo;
				case ProtocolsEnum.SPvP3RankingList://服务器发送排行榜
					var obj_SPvP3RankingList: s2c_SPvP3RankingList = new s2c_SPvP3RankingList();
					s2c_SPvP3RankingList.read(obj_SPvP3RankingList, bs);
					return obj_SPvP3RankingList;
				case ProtocolsEnum.SPvP3ReadyFight://服务器发送准备状态
					var obj_SPvP3ReadyFight: s2c_SPvP3ReadyFight = new s2c_SPvP3ReadyFight();
					s2c_SPvP3ReadyFight.read(obj_SPvP3ReadyFight, bs);
					return obj_SPvP3ReadyFight;
				case ProtocolsEnum.SPvP3MatchResult://通知客户端匹配结果
					var obj_SPvP3MatchResult: s2c_SPvP3MatchResult = new s2c_SPvP3MatchResult();
					s2c_SPvP3MatchResult.read(obj_SPvP3MatchResult, bs);
					return obj_SPvP3MatchResult;
				case ProtocolsEnum.SPvP3BattleInfo://服务器发送场内战斗信息
					var obj_SPvP3BattleInfo: s2c_SPvP3BattleInfo = new s2c_SPvP3BattleInfo();
					s2c_SPvP3BattleInfo.read(obj_SPvP3BattleInfo, bs);
					return obj_SPvP3BattleInfo;
				case ProtocolsEnum.SPvP3OpenBoxState://服务器发送箱子状态
					var obj_SPvP3OpenBoxState: s2c_SPvP3OpenBoxState = new s2c_SPvP3OpenBoxState();
					s2c_SPvP3OpenBoxState.read(obj_SPvP3OpenBoxState, bs);
					return obj_SPvP3OpenBoxState;
				case ProtocolsEnum.SPvP5MyInfo://服务器发送自己的信息
					var obj_SPvP5MyInfo: s2c_SPvP5MyInfo = new s2c_SPvP5MyInfo();
					s2c_SPvP5MyInfo.read(obj_SPvP5MyInfo, bs);
					return obj_SPvP5MyInfo;
				case ProtocolsEnum.SPvP5RankingList://服务器发送排行榜
					var obj_SPvP5RankingList: s2c_SPvP5RankingList = new s2c_SPvP5RankingList();
					s2c_SPvP5RankingList.read(obj_SPvP5RankingList, bs);
					return obj_SPvP5RankingList;
				case ProtocolsEnum.SPvP5ReadyFight://服务器发送准备状态
					var obj_SPvP5ReadyFight: s2c_SPvP5ReadyFight = new s2c_SPvP5ReadyFight();
					s2c_SPvP5ReadyFight.read(obj_SPvP5ReadyFight, bs);
					return obj_SPvP5ReadyFight;
				case ProtocolsEnum.SPvP5MatchResult://通知客户端匹配结果
					var obj_SPvP5MatchResult: s2c_SPvP5MatchResult = new s2c_SPvP5MatchResult();
					s2c_SPvP5MatchResult.read(obj_SPvP5MatchResult, bs);
					return obj_SPvP5MatchResult;
				case ProtocolsEnum.SPvP5BattleInfo://服务器发送场内战斗信息
					var obj_SPvP5BattleInfo: s2c_SPvP5BattleInfo = new s2c_SPvP5BattleInfo();
					s2c_SPvP5BattleInfo.read(obj_SPvP5BattleInfo, bs);
					return obj_SPvP5BattleInfo;
				case ProtocolsEnum.SPvP5OpenBoxState://服务器发送箱子状态
					var obj_SPvP5OpenBoxState: s2c_SPvP5OpenBoxState = new s2c_SPvP5OpenBoxState();
					s2c_SPvP5OpenBoxState.read(obj_SPvP5OpenBoxState, bs);
					return obj_SPvP5OpenBoxState;
				case ProtocolsEnum.SPlayPKFightView://返回对手界面
					var obj_SPlayPKFightView: s2c_SPlayPKFightView = new s2c_SPlayPKFightView();
					s2c_SPlayPKFightView.read(obj_SPlayPKFightView, bs);
					return obj_SPlayPKFightView;
				case ProtocolsEnum.SInvitationPlayPK:
					var obj_SInvitationPlayPK: s2c_SInvitationPlayPK = new s2c_SInvitationPlayPK();
					s2c_SInvitationPlayPK.read(obj_SInvitationPlayPK, bs);
					return obj_SInvitationPlayPK;
				case ProtocolsEnum.SInvitationPlayPKResult://是拒绝还是接受切磋
					var obj_SInvitationPlayPKResult: s2c_SInvitationPlayPKResult = new s2c_SInvitationPlayPKResult();
					s2c_SInvitationPlayPKResult.read(obj_SInvitationPlayPKResult, bs);
					return obj_SInvitationPlayPKResult;
				/*case ProtocolsEnum.SSendCameraUrl://返回录像url
					var obj_SSendCameraUrl: s2c_SSendCameraUrl = new s2c_SSendCameraUrl();
					s2c_SSendCameraUrl.read(obj_SSendCameraUrl, bs);
					return obj_SSendCameraUrl;
				case ProtocolsEnum.SReqRePlay://请求播放录像返回
					var obj_SReqRePlay: s2c_SReqRePlay = new s2c_SReqRePlay();
					s2c_SReqRePlay.read(obj_SReqRePlay, bs);
					return obj_SReqRePlay;*/
				case ProtocolsEnum.SInvitationLiveDieBattle://返回下战书
					var obj_SInvitationLiveDieBattle: s2c_SInvitationLiveDieBattle = new s2c_SInvitationLiveDieBattle();
					s2c_SInvitationLiveDieBattle.read(obj_SInvitationLiveDieBattle, bs);
					return obj_SInvitationLiveDieBattle;
				case ProtocolsEnum.SInvitationLiveDieBattleOK://返回是否接受下战书结果
					var obj_SInvitationLiveDieBattleOK: s2c_SInvitationLiveDieBattleOK = new s2c_SInvitationLiveDieBattleOK();
					s2c_SInvitationLiveDieBattleOK.read(obj_SInvitationLiveDieBattleOK, bs);
					return obj_SInvitationLiveDieBattleOK;
				case ProtocolsEnum.SAcceptInvitationLiveDieBattle://确定是否接受战书
					var obj_SAcceptInvitationLiveDieBattle: s2c_SAcceptInvitationLiveDieBattle = new s2c_SAcceptInvitationLiveDieBattle();
					s2c_SAcceptInvitationLiveDieBattle.read(obj_SAcceptInvitationLiveDieBattle, bs);
					return obj_SAcceptInvitationLiveDieBattle;
				case ProtocolsEnum.SLiveDieBattleWatchView://返回请求生死战观战界面
					var obj_SLiveDieBattleWatchView: s2c_SLiveDieBattleWatchView = new s2c_SLiveDieBattleWatchView();
					s2c_SLiveDieBattleWatchView.read(obj_SLiveDieBattleWatchView, bs);
					return obj_SLiveDieBattleWatchView;
				case ProtocolsEnum.SLiveDieBattleRankView://返回请求生死战排行界面
					var obj_SLiveDieBattleRankView: s2c_SLiveDieBattleRankView = new s2c_SLiveDieBattleRankView();
					s2c_SLiveDieBattleRankView.read(obj_SLiveDieBattleRankView, bs);
					return obj_SLiveDieBattleRankView;
				case ProtocolsEnum.SLiveDieBattleGiveRose://点赞
					var obj_SLiveDieBattleGiveRose: s2c_SLiveDieBattleGiveRose = new s2c_SLiveDieBattleGiveRose();
					s2c_SLiveDieBattleGiveRose.read(obj_SLiveDieBattleGiveRose, bs);
					return obj_SLiveDieBattleGiveRose;
				case ProtocolsEnum.SAcceptLiveDieBattleFirst://返回玩家来应战(第一个确认按钮)
					var obj_SAcceptLiveDieBattleFirst: s2c_SAcceptLiveDieBattleFirst = new s2c_SAcceptLiveDieBattleFirst();
					s2c_SAcceptLiveDieBattleFirst.read(obj_SAcceptLiveDieBattleFirst, bs);
					return obj_SAcceptLiveDieBattleFirst;
				case ProtocolsEnum.SSendBattleFlag://
					var obj_SSendBattleFlag: s2c_SSendBattleFlag = new s2c_SSendBattleFlag();
					s2c_SSendBattleFlag.read(obj_SSendBattleFlag, bs);
					return obj_SSendBattleFlag;
				/*case ProtocolsEnum.SModifyBattleFlag://
					var obj_SModifyBattleFlag: s2c_SModifyBattleFlag = new s2c_SModifyBattleFlag();
					s2c_SModifyBattleFlag.read(obj_SModifyBattleFlag, bs);
					return obj_SModifyBattleFlag;*/
				case ProtocolsEnum.SSetCommander://
					var obj_SSetCommander: s2c_SSetCommander = new s2c_SSetCommander();
					s2c_SSetCommander.read(obj_SSetCommander, bs);
					return obj_SSetCommander;
				/*case ProtocolsEnum.SSetBattleFlag://
					var obj_SSetBattleFlag: s2c_SSetBattleFlag = new s2c_SSetBattleFlag();
					s2c_SSetBattleFlag.read(obj_SSetBattleFlag, bs);
					return obj_SSetBattleFlag;*/
				case ProtocolsEnum.SBuffChangeResult://buff改变结果更新协议
					var obj_SBuffChangeResult: s2c_SBuffChangeResult = new s2c_SBuffChangeResult();
					s2c_SBuffChangeResult.read(obj_SBuffChangeResult, bs);
					return obj_SBuffChangeResult;
				case ProtocolsEnum.SRefreshSpecialQuest://
					var obj_SRefreshSpecialQuest: s2c_SRefreshSpecialQuest = new s2c_SRefreshSpecialQuest();
					s2c_SRefreshSpecialQuest.read(obj_SRefreshSpecialQuest, bs);
					return obj_SRefreshSpecialQuest;
				case ProtocolsEnum.SRefreshSpecialQuestState://
					var obj_SRefreshSpecialQuestState: s2c_SRefreshSpecialQuestState = new s2c_SRefreshSpecialQuestState();
					s2c_SRefreshSpecialQuestState.read(obj_SRefreshSpecialQuestState, bs);
					return obj_SRefreshSpecialQuestState;
				case ProtocolsEnum.SRefreshActiveQuest:
					var obj_SRefreshActiveQuest: s2c_SRefreshActiveQuest = new s2c_SRefreshActiveQuest();
					s2c_SRefreshActiveQuest.read(obj_SRefreshActiveQuest, bs);
					return obj_SRefreshActiveQuest;
				case ProtocolsEnum.SSendActiveQuestList://角色上线的时候服务器发给客户端所有当前未完成的任务列表
					var obj_SSendActiveQuestList: s2c_SSendActiveQuestList = new s2c_SSendActiveQuestList();
					s2c_SSendActiveQuestList.read(obj_SSendActiveQuestList, bs);
					return obj_SSendActiveQuestList;
				case ProtocolsEnum.SRefreshQuestData://任务数据发生变化时，服务器向客户端发送的刷新消息
					var obj_SRefreshQuestData: s2c_SRefreshQuestData = new s2c_SRefreshQuestData();
					s2c_SRefreshQuestData.read(obj_SRefreshQuestData, bs);
					return obj_SRefreshQuestData;
				/*case ProtocolsEnum.SQuestionnaireTitleAndExp://问卷调查获得称号和经验
					var obj_SQuestionnaireTitleAndExp: s2c_SQuestionnaireTitleAndExp = new s2c_SQuestionnaireTitleAndExp();
					s2c_SQuestionnaireTitleAndExp.read(obj_SQuestionnaireTitleAndExp, bs);
					return obj_SQuestionnaireTitleAndExp;
				case ProtocolsEnum.SRenXingCircleTask://服务通知客户端任性
					var obj_SRenXingCircleTask: s2c_SRenXingCircleTask = new s2c_SRenXingCircleTask();
					s2c_SRenXingCircleTask.read(obj_SRenXingCircleTask, bs);
					return obj_SRenXingCircleTask;*/
				case ProtocolsEnum.SQueryCircleTaskState://回复任务状态
					var obj_SQueryCircleTaskState: s2c_SQueryCircleTaskState = new s2c_SQueryCircleTaskState();
					s2c_SQueryCircleTaskState.read(obj_SQueryCircleTaskState, bs);
					return obj_SQueryCircleTaskState;
				case ProtocolsEnum.SRefreshAnYeData:// 暗夜马戏团任务相关
					var obj_SRefreshAnYeData: s2c_SRefreshAnYeData = new s2c_SRefreshAnYeData();
					s2c_SRefreshAnYeData.read(obj_SRefreshAnYeData, bs);
					return obj_SRefreshAnYeData;
				case ProtocolsEnum.SLengendAnYetask:// 返回寻宝结果
					var obj_SLengendAnYetask: s2c_SLengendAnYetask = new s2c_SLengendAnYetask();
					s2c_SLengendAnYetask.read(obj_SLengendAnYetask, bs);
					return obj_SLengendAnYetask;
				case ProtocolsEnum.SOpenClanMedic:// 返回请求药房信息
					var obj_SOpenClanMedic: s2c_SOpenClanMedic = new s2c_SOpenClanMedic();
					s2c_SOpenClanMedic.read(obj_SOpenClanMedic, bs);
					return obj_SOpenClanMedic;
				case ProtocolsEnum.SOpenClanList:// 服务端响应客户端请求公会列表协议：没有公会
					var obj_SOpenClanList: s2c_SOpenClanList = new s2c_SOpenClanList();
					s2c_SOpenClanList.read(obj_SOpenClanList, bs);
					return obj_SOpenClanList;
				case ProtocolsEnum.SOpenClan:// 服务端响应客户端请求公会界面协议：有公会
					var obj_SOpenClan: s2c_SOpenClan = new s2c_SOpenClan();
					s2c_SOpenClan.read(obj_SOpenClan, bs);
					return obj_SOpenClan;
				case ProtocolsEnum.SLeaveClan:// 脱离公会成功,客户端将公会界面关闭
					var obj_SLeaveClan: s2c_SLeaveClan = new s2c_SLeaveClan();
					s2c_SLeaveClan.read(obj_SLeaveClan, bs);
					return obj_SLeaveClan;
				case ProtocolsEnum.SRequestApply:// 服务端返回申请加入公会的人员列表
					var obj_SRequestApply: s2c_SRequestApply = new s2c_SRequestApply();
					s2c_SRequestApply.read(obj_SRequestApply, bs);
					return obj_SRequestApply;
				case ProtocolsEnum.SRefuseApply:// 服务器返回拒绝申请人员
					var obj_SRefuseApply: s2c_SRefuseApply = new s2c_SRefuseApply();
					s2c_SRefuseApply.read(obj_SRefuseApply, bs);
					return obj_SRefuseApply;
				case ProtocolsEnum.SChangeClanAim:// 服务器返回新宗旨
					var obj_SChangeClanAim: s2c_SChangeClanAim = new s2c_SChangeClanAim();
					s2c_SChangeClanAim.read(obj_SChangeClanAim, bs);
					return obj_SChangeClanAim;
				case ProtocolsEnum.SClanInvitation:// 公会邀请
					var obj_SClanInvitation: s2c_SClanInvitation = new s2c_SClanInvitation();
					s2c_SClanInvitation.read(obj_SClanInvitation, bs);
					return obj_SClanInvitation;
				case ProtocolsEnum.SRefreshPosition:// 返回职务
					var obj_SRefreshPosition: s2c_SRefreshPosition = new s2c_SRefreshPosition();
					s2c_SRefreshPosition.read(obj_SRefreshPosition, bs);
					return obj_SRefreshPosition;
				case ProtocolsEnum.SFireMember:// 驱逐成员返回
					var obj_SFireMember: s2c_SFireMember = new s2c_SFireMember();
					s2c_SFireMember.read(obj_SFireMember, bs);
					return obj_SFireMember;

				//lqw
				// SDissolveRelation
				/*case ProtocolsEnum.SDissolveRelation:
					var obj_dissolve_relation_action: s2c_dissolve_relation = new s2c_dissolve_relation();
					s2c_dissolve_relation.read(obj_dissolve_relation_action, bs)
					return obj_dissolve_relation_action;
				// SPreviousMasters
				case ProtocolsEnum.SPreviousMasters:
					var obj_previous_masters_action: s2c_previous_masters = new s2c_previous_masters();
					s2c_previous_masters.read(obj_previous_masters_action, bs)
					return obj_previous_masters_action;
				// SPrenticeList
				case ProtocolsEnum.SPrenticeList:
					var obj_prentice_list_action: s2c_prentice_list = new s2c_prentice_list();
					s2c_prentice_list.read(obj_prentice_list_action, bs)
					return obj_prentice_list_action;
				case ProtocolsEnum.SRequestAsMaster:
					var obj_request_as_master_action: s2c_request_as_master = new s2c_request_as_master();
					s2c_request_as_master.read(obj_request_as_master_action, bs)
					return obj_request_as_master_action;
				// SInitPrenticeList
				case ProtocolsEnum.SInitPrenticeList:
					var obj_init_prentice_list_action: s2c_init_prentice_list = new s2c_init_prentice_list();
					s2c_init_prentice_list.read(obj_init_prentice_list_action, bs)
					return obj_init_prentice_list_action;
				// SCanRequestAsPrentice
				case ProtocolsEnum.SCanRequestAsPrentice:
					var obj_can_request_as_prentice_action: s2c_can_request_as_prentice = new s2c_can_request_as_prentice();
					s2c_can_request_as_prentice.read(obj_can_request_as_prentice_action, bs)
					return obj_can_request_as_prentice_action;
				// SCanRequestAsMaster
				case ProtocolsEnum.SCanRequestAsMaster:
					var obj_can_request_as_master_action: s2c_can_request_as_master = new s2c_can_request_as_master();
					s2c_can_request_as_master.read(obj_can_request_as_master_action, bs)
					return obj_can_request_as_master_action;
				// SCantRequestAsPrentice
				case ProtocolsEnum.SCantRequestAsPrentice:
					var obj_cat_request_as_prentice_action: s2c_cat_request_as_prentice = new s2c_cat_request_as_prentice();
					s2c_cat_request_as_prentice.read(obj_cat_request_as_prentice_action, bs)
					return obj_cat_request_as_prentice_action;
				// sCantRequestAsMaster
				case ProtocolsEnum.SCantRequestAsMaster:
					var obj_cant_request_as_master_action: s2c_cant_request_as_master = new s2c_cant_request_as_master();
					s2c_cant_request_as_master.read(obj_cant_request_as_master_action, bs)
					return obj_cant_request_as_master_action;
				// SSendMasterPrenticeList
				case ProtocolsEnum.SSendMasterPrenticeList:
					var obj_send_master_prentice_list_action: s2c_send_master_prentice_list = new s2c_send_master_prentice_list();
					s2c_send_master_prentice_list.read(obj_send_master_prentice_list_action, bs)
					return obj_send_master_prentice_list_action;
				// sAddPrePrentice
				case ProtocolsEnum.SAddPrePrentice:
					var obj_add_pre_prentice_action: s2c_add_pre_prentice = new s2c_add_pre_prentice();
					s2c_add_pre_prentice.read(obj_add_pre_prentice_action, bs)
					return obj_add_pre_prentice_action;
				// SSendPrenticeOnLineState
				case ProtocolsEnum.SSendPrenticeOnLineState:
					var obj_send_prentice_on_line_state_action: s2c_send_prentice_on_line_state = new s2c_send_prentice_on_line_state();
					s2c_send_prentice_on_line_state.read(obj_send_prentice_on_line_state_action, bs)
					return obj_send_prentice_on_line_state_action;
				// SNotifyMaster
				case ProtocolsEnum.SNotifyMaster:
					var obj_notify_master_action: s2c_notify_master = new s2c_notify_master();
					s2c_notify_master.read(obj_notify_master_action, bs)
					return obj_notify_master_action;
				// SEvaluate
				case ProtocolsEnum.SEvaluate:
					var obj_evaluate_action: s2c_evaluate = new s2c_evaluate();
					s2c_evaluate.read(obj_evaluate_action, bs)
					return obj_evaluate_action;
				// SDismissApprentces
				case ProtocolsEnum.SDismissApprentces:
					var obj_dismiss_apprentces_action: s2c_dismiss_apprentces = new s2c_dismiss_apprentces();
					s2c_dismiss_apprentces.read(obj_dismiss_apprentces_action, bs)
					return obj_dismiss_apprentces_action;
				// sNotifyDismissMaster
				case ProtocolsEnum.SNotifyDismissMaster:
					var obj_notify_dismiss_master_action: s2c_notify_dismiss_master = new s2c_notify_dismiss_master();
					s2c_notify_dismiss_master.read(obj_notify_dismiss_master_action, bs)
					return obj_notify_dismiss_master_action;
				// SPrenticesList
				case ProtocolsEnum.SPrenticesList:
					var obj_prentices_list_action: s2c_prentices_list = new s2c_prentices_list();
					s2c_prentices_list.read(obj_prentices_list_action, bs)
					return obj_prentices_list_action;
				// STakeAchiveFresh
				case ProtocolsEnum.STakeAchiveFresh:
					var obj_take_achive_fresh_action: s2c_take_achive_fresh = new s2c_take_achive_fresh();
					s2c_take_achive_fresh.read(obj_take_achive_fresh_action, bs)
					return obj_take_achive_fresh_action;
				case ProtocolsEnum.SNotifyAppMaster:
					var obj_notify_app_master_action: s2c_notify_app_master = new s2c_notify_app_master();
					s2c_notify_app_master.read(obj_notify_app_master_action, bs)
					return obj_notify_app_master_action;*/
				case ProtocolsEnum.SAcceptMission:
					var obj_accept_mission_action: s2c_accept_mission = new s2c_accept_mission();
					s2c_accept_mission.read(obj_accept_mission_action, bs)
					return obj_accept_mission_action;
				case ProtocolsEnum.SRefreshMissionState:
					var obj_refresh_mission_state_action: s2c_refresh_mission_state = new s2c_refresh_mission_state();
					s2c_refresh_mission_state.read(obj_refresh_mission_state_action, bs)
					return obj_refresh_mission_state_action;
				case ProtocolsEnum.SRefreshMissionValue:
					var obj_refresh_mission_value_action: s2c_refresh_mission_value = new s2c_refresh_mission_value();
					s2c_refresh_mission_value.read(obj_refresh_mission_value_action, bs)
					return obj_refresh_mission_value_action;
				case ProtocolsEnum.STrackMission:
					var obj_track_mission_action: s2c_track_mission = new s2c_track_mission();
					s2c_track_mission.read(obj_track_mission_action, bs)
					return obj_track_mission_action;
				/*case ProtocolsEnum.SFairylandStatus:
					var obj_fairyland_status_action: s2c_fairyland_status = new s2c_fairyland_status();
					s2c_fairyland_status.read(obj_fairyland_status_action, bs)
					return obj_fairyland_status_action;*/
				case ProtocolsEnum.SReqMissionCanAccept:
					var obj_req_mission_can_accept_action: s2c_req_mission_can_accept = new s2c_req_mission_can_accept();
					s2c_req_mission_can_accept.read(obj_req_mission_can_accept_action, bs)
					return obj_req_mission_can_accept_action;
				/*// SUseMissionItemFail
				case ProtocolsEnum.SUseMissionItemFail:
					var obj_use_mission_item_fail_action: s2c_use_mission_item_fail = new s2c_use_mission_item_fail();
					s2c_use_mission_item_fail.read(obj_use_mission_item_fail_action, bs)
					return obj_use_mission_item_fail_action;
				// sNpcFollowStart
				case ProtocolsEnum.SNpcFollowStart:
					var obj_npc_follow_start_action: s2c_npc_follow_start = new s2c_npc_follow_start();
					s2c_npc_follow_start.read(obj_npc_follow_start_action, bs)
					return obj_npc_follow_start_action;
				// sNpcFollowEnd
				case ProtocolsEnum.SNpcFollowEnd:
					var obj_npc_follow_end_action: s2c_npc_follow_end = new s2c_npc_follow_end();
					s2c_npc_follow_end.read(obj_npc_follow_end_action, bs)
					return obj_npc_follow_end_action;
				// sLandTimes
				case ProtocolsEnum.SLandTimes:
					var obj_land_times_action: s2c_land_times = new s2c_land_times();
					s2c_land_times.read(obj_land_times_action, bs)
					return obj_land_times_action;
				// sCopyDestroyTime
				case ProtocolsEnum.SCopyDestroyTime:
					var obj_copy_destroy_time_action: s2c_copy_destroy_time = new s2c_copy_destroy_time();
					s2c_copy_destroy_time.read(obj_copy_destroy_time_action, bs)
					return obj_copy_destroy_time_action;
				case ProtocolsEnum.SGetInstanceState:
					var obj_get_instance_state_action: s2c_get_instance_state = new s2c_get_instance_state();
					s2c_get_instance_state.read(obj_get_instance_state_action, bs)
					return obj_get_instance_state_action;*/
				// sGetLineState
				case ProtocolsEnum.SGetLineState:
					var obj_get_line_state_action: s2c_get_line_state = new s2c_get_line_state();
					s2c_get_line_state.read(obj_get_line_state_action, bs)
					return obj_get_line_state_action;
				// sRefreshActivityListFinishTimes
				case ProtocolsEnum.SRefreshActivityListFinishTimes:
					var obj_refresh_activity_listfinish_times_action: s2c_refresh_activity_listfinish_times = new s2c_refresh_activity_listfinish_times();
					s2c_refresh_activity_listfinish_times.read(obj_refresh_activity_listfinish_times_action, bs)
					return obj_refresh_activity_listfinish_times_action;
				// SDrawGiftBox
				case ProtocolsEnum.SDrawGiftBox:
					var obj_draw_gift_box_action: s2c_draw_gift_box = new s2c_draw_gift_box();
					s2c_draw_gift_box.read(obj_draw_gift_box_action, bs)
					return obj_draw_gift_box_action;
				// sActivityOpen
				/*case ProtocolsEnum.SActivityOpen:
					var obj_activity_open_action: s2c_activity_open = new s2c_activity_open();
					s2c_activity_open.read(obj_activity_open_action, bs)
					return obj_activity_open_action;
				// sNotifyTuiSongList
				case ProtocolsEnum.SNotifyTuiSongList:
					var obj_notify_tuisong_list_action: s2c_notify_tuisong_list = new s2c_notify_tuisong_list();
					s2c_notify_tuisong_list.read(obj_notify_tuisong_list_action, bs)
					return obj_notify_tuisong_list_action;
				// sDailyTaskStateList
				case ProtocolsEnum.SDailyTaskStateList:
					var obj_daily_task_state_list_action: s2c_daily_task_state_list = new s2c_daily_task_state_list();
					s2c_daily_task_state_list.read(obj_daily_task_state_list_action, bs)
					return obj_daily_task_state_list_action;
				// sRemoveTuiSong
				case ProtocolsEnum.SRemoveTuiSong:
					var obj_remove_tui_song_action: s2c_remove_tui_song = new s2c_remove_tui_song();
					s2c_remove_tui_song.read(obj_remove_tui_song_action, bs)
					return obj_remove_tui_song_action;
				// SQuestion
				case ProtocolsEnum.SQuestion:
					var obj_question_action: s2c_question = new s2c_question();
					s2c_question.read(obj_question_action, bs)
					return obj_question_action;
				// sUseTreasureMap
				case ProtocolsEnum.SUseTreasureMap:
					var obj_use_treasure_map_action: s2c_use_treasure_map = new s2c_use_treasure_map();
					s2c_use_treasure_map.read(obj_use_treasure_map_action, bs)
					return obj_use_treasure_map_action;*/
				// sGetActivityInfo
				case ProtocolsEnum.SGetActivityInfo:
					var obj_get_activity_info_action: s2c_get_activity_info = new s2c_get_activity_info();
					s2c_get_activity_info.read(obj_get_activity_info_action, bs)
					return obj_get_activity_info_action;
				// sAskIntoInstance
				/*case ProtocolsEnum.SAskIntoInstance:
					var obj_ask_into_instance_action: s2c_ask_into_instance = new s2c_ask_into_instance();
					s2c_ask_into_instance.read(obj_ask_into_instance_action, bs)
					return obj_ask_into_instance_action;*/
				// sGetArchiveInfo
				case ProtocolsEnum.SGetArchiveInfo:
					var obj_get_archive_info_action: s2c_get_archive_info = new s2c_get_archive_info();
					s2c_get_archive_info.read(obj_get_archive_info_action, bs)
					return obj_get_archive_info_action;
				// sWaitRollTime
				/*case ProtocolsEnum.SWaitRollTime:
					var obj_wait_roll_time_action: s2c_wait_roll_time = new s2c_wait_roll_time();
					s2c_wait_roll_time.read(obj_wait_roll_time_action, bs)
					return obj_wait_roll_time_action;
				// SPlayXianJingCG
				case ProtocolsEnum.SPlayXianJingCG:
					var obj_play_xianjing_cg_action: s2c_play_xianjing_cg = new s2c_play_xianjing_cg();
					s2c_play_xianjing_cg.read(obj_play_xianjing_cg_action, bs)
					return obj_play_xianjing_cg_action;
				// SAddTreasureMap
				case ProtocolsEnum.SAddTreasureMap:
					var obj_add_treasure_map_action: s2c_add_treasure_map = new s2c_add_treasure_map();
					s2c_add_treasure_map.read(obj_add_treasure_map_action, bs)
					return obj_add_treasure_map_action;
				// sAnswerInstance
				case ProtocolsEnum.SAnswerInstance:
					var obj_answer_instance_action: s2c_answer_instance = new s2c_answer_instance();
					s2c_answer_instance.read(obj_answer_instance_action, bs)
					return obj_answer_instance_action;
				// sRequestChapterInfo
				case ProtocolsEnum.SRequestChapterInfo:
					var obj_request_chapter_info_action: s2c_request_chapter_info = new s2c_request_chapter_info();
					s2c_request_chapter_info.read(obj_request_chapter_info_action, bs)
					return obj_request_chapter_info_action;
				// sRequestChapterChallenge
				case ProtocolsEnum.SRequestChapterChallenge:
					var obj_request_chapter_challenge_action: s2c_request_chapter_challenge = new s2c_request_chapter_challenge();
					s2c_request_chapter_challenge.read(obj_request_chapter_challenge_action, bs)
					return obj_request_chapter_challenge_action;
				//move.xml*/
				case ProtocolsEnum.SRoleMove:
					var obj_role_move_action: s2c_role_move = new s2c_role_move();
					s2c_role_move.read(obj_role_move_action, bs)
					return obj_role_move_action;
				// sSetRoleLocation
				case ProtocolsEnum.SSetRoleLocation:
					var obj_set_role_location_action: s2c_set_role_location = new s2c_set_role_location();
					s2c_set_role_location.read(obj_set_role_location_action, bs)
					return obj_set_role_location_action;
				// sAddUserScreen*/
				case ProtocolsEnum.SAddUserScreen:
					var obj_add_user_screen_action: s2c_add_user_screen = new s2c_add_user_screen();
					s2c_add_user_screen.read(obj_add_user_screen_action, bs)
					return obj_add_user_screen_action;
				// sRemoveUserScreen
				case ProtocolsEnum.SRemoveUserScreen:
					var obj_remove_user_screen_action: s2c_remove_user_screen = new s2c_remove_user_screen();
					s2c_remove_user_screen.read(obj_remove_user_screen_action, bs)
					return obj_remove_user_screen_action;
				/*	// SRoleTurn
					case ProtocolsEnum.SRoleTurn:
						var obj_role_turn_action: s2c_role_turn = new s2c_role_turn();
						s2c_role_turn.read(obj_role_turn_action, bs)
						return obj_role_turn_action;
					// sRoleEnterScene*/
				case ProtocolsEnum.SRoleEnterScene:
					var obj_role_enter_scene_action: s2c_role_enter_scene = new s2c_role_enter_scene();
					s2c_role_enter_scene.read(obj_role_enter_scene_action, bs)
					return obj_role_enter_scene_action;
				// sRoleStop
				case ProtocolsEnum.SRoleStop:
					var obj_role_stop_action: s2c_role_stop = new s2c_role_stop();
					s2c_role_stop.read(obj_role_stop_action, bs)
					return obj_role_stop_action;
				// SSetRoleTeamInfo
				case ProtocolsEnum.SSetRoleTeamInfo:
					var obj_set_role_team_info_action: s2c_set_role_team_info = new s2c_set_role_team_info();
					s2c_set_role_team_info.read(obj_set_role_team_info_action, bs)
					return obj_set_role_team_info_action;
				// // sAddPickupScreen
				/*case ProtocolsEnum.SAddPickupScreen:
					var obj_add_pickup_screen_action: s2c_add_pickup_screen = new s2c_add_pickup_screen();
					s2c_add_pickup_screen.read(obj_add_pickup_screen_action, bs)
					return obj_add_pickup_screen_action;
				// sRemovePickupScreen
				case ProtocolsEnum.SRemovePickupScreen:
					var obj_remove_pickup_screen_action: s2c_remove_pickup_screen = new s2c_remove_pickup_screen();
					s2c_remove_pickup_screen.read(obj_remove_pickup_screen_action, bs)
					return obj_remove_pickup_screen_action;
				// SHideRole
				case ProtocolsEnum.SHideRole:
					var obj_hide_role_action: s2c_hide_role = new s2c_hide_role();
					s2c_hide_role.read(obj_hide_role_action, bs)
					return obj_hide_role_action;
				// SRelocateRolePos
				case ProtocolsEnum.SRelocateRolePos:
					var obj_relocate_rolepos_action: s2c_relocate_rolepos = new s2c_relocate_rolepos();
					s2c_relocate_rolepos.read(obj_relocate_rolepos_action, bs)
					return obj_relocate_rolepos_action;
				// sAddActivityNpc
				case ProtocolsEnum.SAddActivityNpc:
					var obj_add_activity_npc_action: s2c_add_activity_npc = new s2c_add_activity_npc();
					s2c_add_activity_npc.read(obj_add_activity_npc_action, bs)
					return obj_add_activity_npc_action;
				// sRemoveActivityNpc
				case ProtocolsEnum.SRemoveActivityNpc:
					var obj_remove_activity_npc_action: s2c_remove_activity_npc = new s2c_remove_activity_npc();
					s2c_remove_activity_npc.read(obj_remove_activity_npc_action, bs)
					return obj_remove_activity_npc_action;
				// sTransfromShape
				case ProtocolsEnum.STransfromShape:
					var obj_transfrom_shape_action: s2c_transfrom_shape = new s2c_transfrom_shape();
					s2c_transfrom_shape.read(obj_transfrom_shape_action, bs)
					return obj_transfrom_shape_action;
				// sGMGetAroundRoles
				case ProtocolsEnum.SGMGetAroundRoles:
					var obj_gm_get_around_roles_action: s2c_gm_get_around_roles = new s2c_gm_get_around_roles();
					s2c_gm_get_around_roles.read(obj_gm_get_around_roles_action, bs)
					return obj_gm_get_around_roles_action;
				// sUpdateRoleSceneState*/
				case ProtocolsEnum.SUpdateRoleSceneState:
					var obj_update_role_scene_state_action: s2c_update_role_scene_state = new s2c_update_role_scene_state();
					s2c_update_role_scene_state.read(obj_update_role_scene_state_action, bs)
					return obj_update_role_scene_state_action;
				// sUpdateNpcSceneState
				/*case ProtocolsEnum.SUpdateNpcSceneState:
					var obj_update_npc_scene_state_action: s2c_update_npc_scene_state = new s2c_update_npc_scene_state();
					s2c_update_npc_scene_state.read(obj_update_npc_scene_state_action, bs)
					return obj_update_npc_scene_state_action;
				// sUpdateNpcSceneState
				case ProtocolsEnum.SUpdateNpcSceneState:
					var obj_update_npc_scene_state_action: s2c_update_npc_scene_state = new s2c_update_npc_scene_state();
					s2c_update_npc_scene_state.read(obj_update_npc_scene_state_action, bs)
					return obj_update_npc_scene_state_action;
				// sRoleModelChange
				case ProtocolsEnum.SRoleModelChange:
					var obj_role_model_change_action: s2c_role_model_change = new s2c_role_model_change();
					s2c_role_model_change.read(obj_role_model_change_action, bs)
					return obj_role_model_change_action;
				// sRoleComponentsChange */
				case ProtocolsEnum.SRoleComponentsChange:
					var obj_role_components_change_action: s2c_role_components_change = new s2c_role_components_change();
					s2c_role_components_change.read(obj_role_components_change_action, bs)
					return obj_role_components_change_action;
				// SRoleJump
				/*case ProtocolsEnum.SRoleJump:
					var obj_role_jump_action: s2c_role_jump = new s2c_role_jump();
					s2c_role_jump.read(obj_role_jump_action, bs)
					return obj_role_jump_action;
				// sRoleJumpDrawback
				case ProtocolsEnum.SRoleJumpDrawback:
					var obj_role_jump_drawback_action: s2c_role_jump_drawback = new s2c_role_jump_drawback();
					s2c_role_jump_drawback.read(obj_role_jump_drawback_action, bs)
					return obj_role_jump_drawback_action;
				// sNPCMoveTo
				case ProtocolsEnum.SNPCMoveTo:
					var obj_npc_moveto_action: s2c_npc_moveto = new s2c_npc_moveto();
					s2c_npc_moveto.read(obj_npc_moveto_action, bs)
					return obj_npc_moveto_action;
				// sBeginBaitang
				case ProtocolsEnum.SBeginBaitang:
					var obj_begin_baitang_action: s2c_begin_baitang = new s2c_begin_baitang();
					s2c_begin_baitang.read(obj_begin_baitang_action, bs)
					return obj_begin_baitang_action;
				// sRoleChangeShape
				case ProtocolsEnum.SRoleChangeShape:
					var obj_role_change_shape_action: s2c_role_change_shape = new s2c_role_change_shape();
					s2c_role_change_shape.read(obj_role_change_shape_action, bs)
					return obj_role_change_shape_action;
				// sRolePlayAction
				case ProtocolsEnum.SRolePlayAction:
					var obj_role_play_action_action: s2c_role_play_action = new s2c_role_play_action();
					s2c_role_play_action.read(obj_role_play_action_action, bs)
					return obj_role_play_action_action;
				// sChangeEquipEffect
				case ProtocolsEnum.SChangeEquipEffect:
					var obj_change_equip_effect_action: s2c_change_equip_effect = new s2c_change_equip_effect();
					s2c_change_equip_effect.read(obj_change_equip_effect_action, bs)
					return obj_change_equip_effect_action;
				// sVisitNpc*/
				case ProtocolsEnum.SVisitNpc:
					var obj_visit_npc_action: s2c_visit_npc = new s2c_visit_npc();
					s2c_visit_npc.read(obj_visit_npc_action, bs)
					return obj_visit_npc_action;
				/*	// sReqFortuneWheel
					case ProtocolsEnum.SReqFortuneWheel:
						var obj_req_fortune_wheel_action: s2c_req_fortune_wheel = new s2c_req_fortune_wheel();
						s2c_req_fortune_wheel.read(obj_req_fortune_wheel_action, bs)
						return obj_req_fortune_wheel_action;
					// sBattleToNpcError
					case ProtocolsEnum.SBattleToNpcError:
						var obj_battle_to_npc_error_action: s2c_battle_to_npc_error = new s2c_battle_to_npc_error();
						s2c_battle_to_npc_error.read(obj_battle_to_npc_error_action, bs)
						return obj_battle_to_npc_error_action;
					// SSendNpcMsg
					case ProtocolsEnum.SSendNpcMsg:
						var obj_send_npc_msg_action: s2c_send_npc_msg = new s2c_send_npc_msg();
						s2c_send_npc_msg.read(obj_send_npc_msg_action, bs)
						return obj_send_npc_msg_action;
					// SSubmit2Npc*/
				case ProtocolsEnum.SSubmit2Npc:
					var obj_submit_2npc_action: s2c_submit_2npc = new s2c_submit_2npc();
					s2c_submit_2npc.read(obj_submit_2npc_action, bs)
					return obj_submit_2npc_action;
				//19029
				//STrackedMissions
				case ProtocolsEnum.STrackedMissions:
					var obj_tracked_missions_action: s2c_tracked_missions = new s2c_tracked_missions();
					s2c_tracked_missions.read(obj_tracked_missions_action, bs)
					return obj_tracked_missions_action;
				/*	case ProtocolsEnum.SGameTime:// 广播服务器时间
						var obj_SGameTime: S2C_SGameTime = new S2C_SGameTime();
						S2C_SGameTime.read(obj_SGameTime, bs);
						return obj_SGameTime;
					case ProtocolsEnum.SCreateRoleError:// 
						var obj_SCreateRoleError: S2C_SCreateRoleError = new S2C_SCreateRoleError();
						S2C_SCreateRoleError.read(obj_SCreateRoleError, bs);
						return obj_SCreateRoleError;
					case ProtocolsEnum.SRefreshUserExp:// 通知客户端刷新人物经验
						var obj_SRefreshUserExp: S2C_SRefreshUserExp = new S2C_SRefreshUserExp();
						S2C_SRefreshUserExp.read(obj_SRefreshUserExp, bs);
						return obj_SRefreshUserExp;
					case ProtocolsEnum.SRefreshHp:// 通知客户端刷新血量
						var obj_SRefreshHp: S2C_SRefreshHp = new S2C_SRefreshHp();
						S2C_SRefreshHp.read(obj_SRefreshHp, bs);
						return obj_SRefreshHp;
					case ProtocolsEnum.SResetSysConfig:// 服务器发送客户端最新的系统设置
						var obj_SResetSysConfig: S2C_SResetSysConfig = new S2C_SResetSysConfig();
						S2C_SResetSysConfig.read(obj_SResetSysConfig, bs);
						return obj_SResetSysConfig;
					case ProtocolsEnum.SRefSmoney:// 通知客户端刷新储备金
						var obj_SRefSmoney: S2C_SRefSmoney = new S2C_SRefSmoney();
						S2C_SRefSmoney.read(obj_SRefSmoney, bs);
						return obj_SRefSmoney;
					case ProtocolsEnum.SError://
						var obj_SError: S2C_SError = new S2C_SError();
						S2C_SError.read(obj_SError, bs);
						return obj_SError;
					case ProtocolsEnum.SRetRoleProp://返回玩家请求的属性对应的属性值
						var obj_SRetRoleProp: S2C_SRetRoleProp = new S2C_SRetRoleProp();
						S2C_SRetRoleProp.read(obj_SRetRoleProp, bs);
						return obj_SRetRoleProp;
					case ProtocolsEnum.SStartPlayCG://返回玩家请求的属性对应的属性值
						var obj_SStartPlayCG: S2C_SStartPlayCG = new S2C_SStartPlayCG();
						S2C_SStartPlayCG.read(obj_SStartPlayCG, bs);
						return obj_SStartPlayCG;
					case ProtocolsEnum.SBeginnerTip://
						var obj_SBeginnerTip: S2C_SBeginnerTip = new S2C_SBeginnerTip();
						S2C_SBeginnerTip.read(obj_SBeginnerTip, bs);
						return obj_SBeginnerTip;
					case ProtocolsEnum.SShowedBeginnerTips://
						var obj_SShowedBeginnerTips: S2C_SShowedBeginnerTips = new S2C_SShowedBeginnerTips();
						S2C_SShowedBeginnerTips.read(obj_SShowedBeginnerTips, bs);
						return obj_SShowedBeginnerTips;
					case ProtocolsEnum.SAnswerRoleTeamState://返回玩家请求的其他玩家的组队情况
						var obj_SAnswerRoleTeamState: S2C_SAnswerRoleTeamState = new S2C_SAnswerRoleTeamState();
						S2C_SAnswerRoleTeamState.read(obj_SAnswerRoleTeamState, bs);
						return obj_SAnswerRoleTeamState;*/
				case ProtocolsEnum.SGiveName://返回请求生成随机角色名字
					var obj_SGiveName: S2C_SGiveName = new S2C_SGiveName();
					S2C_SGiveName.read(obj_SGiveName, bs);
					return obj_SGiveName;
				case ProtocolsEnum.SRecommendsNames://创建角色重名时，服务器回给客户端推荐名字
					var obj_SRecommendsNames: S2C_SRecommendsNames = new S2C_SRecommendsNames();
					S2C_SRecommendsNames.read(obj_SRecommendsNames, bs);
					return obj_SRecommendsNames;
				/*case ProtocolsEnum.SReturnRoleList://服务器发给客户端，允许返回角色选择界面，并发送已有角色信息列表，同SRoleList
					var obj_SReturnRoleList: S2C_SReturnRoleList = new S2C_SReturnRoleList();
					S2C_SReturnRoleList.read(obj_SReturnRoleList, bs);
					return obj_SReturnRoleList;
				case ProtocolsEnum.SSendQueueInfo://服务器：发送排队信息
					var obj_SSendQueueInfo: S2C_SSendQueueInfo = new S2C_SSendQueueInfo();
					S2C_SSendQueueInfo.read(obj_SSendQueueInfo, bs);
					return obj_SSendQueueInfo;*/
				case ProtocolsEnum.SRoleOffline://服务器：通知客户端下线
					var obj_SRoleOffline: S2C_SRoleOffline = new S2C_SRoleOffline();
					S2C_SRoleOffline.read(obj_SRoleOffline, bs);
					return obj_SRoleOffline;
				case ProtocolsEnum.SReturnLogin://服务器：通知客户端返回登录界面
					var obj_SReturnLogin: S2C_SReturnLogin = new S2C_SReturnLogin();
					S2C_SReturnLogin.read(obj_SReturnLogin, bs);
					return obj_SReturnLogin;
				/*case ProtocolsEnum.SSendSlowQueueInfo://服务器：发送缓慢进入排队信息
					var obj_SSendSlowQueueInfo: S2C_SSendSlowQueueInfo = new S2C_SSendSlowQueueInfo();
					S2C_SSendSlowQueueInfo.read(obj_SSendSlowQueueInfo, bs);
					return obj_SSendSlowQueueInfo;
				case ProtocolsEnum.SFirstDayExitGame://客户端使用千里寻踪蝶请求玩家坐标
					var obj_SFirstDayExitGame: S2C_SFirstDayExitGame = new S2C_SFirstDayExitGame();
					S2C_SFirstDayExitGame.read(obj_SFirstDayExitGame, bs);
					return obj_SFirstDayExitGame;
				case ProtocolsEnum.SGACDKickoutMsg://客户端进入场景完毕
					var obj_SGACDKickoutMsg: S2C_SGACDKickoutMsg = new S2C_SGACDKickoutMsg();
					S2C_SGACDKickoutMsg.read(obj_SGACDKickoutMsg, bs);
					return obj_SGACDKickoutMsg;
				case ProtocolsEnum.SSendServerMultiExp://发送服务器多倍信息
					var obj_SSendServerMultiExp: S2C_SSendServerMultiExp = new S2C_SSendServerMultiExp();
					S2C_SSendServerMultiExp.read(obj_SSendServerMultiExp, bs);
					return obj_SSendServerMultiExp;
				case ProtocolsEnum.SSendLoginIp://发送登录IP信息
					var obj_SSendLoginIp: S2C_SSendLoginIp = new S2C_SSendLoginIp();
					S2C_SSendLoginIp.read(obj_SSendLoginIp, bs);
					return obj_SSendLoginIp;
				case ProtocolsEnum.SRequestUsedNameData://使用改名道具的时候发送这个协议获取曾用名
					var obj_SRequestUsedNameData: S2C_SRequestUsedNameData = new S2C_SRequestUsedNameData();
					S2C_SRequestUsedNameData.read(obj_SRequestUsedNameData, bs);
					return obj_SRequestUsedNameData;*/
				case ProtocolsEnum.SModifyRoleName://客户端请求更改名字
					var obj_SModifyRoleName: S2C_SModifyRoleName = new S2C_SModifyRoleName();
					S2C_SModifyRoleName.read(obj_SModifyRoleName, bs);
					return obj_SModifyRoleName;
				/*	// sReqFortuneWheel
					case ProtocolsEnum.SReqFortuneWheel:
						var obj_req_fortune_wheel_action: s2c_req_fortune_wheel = new s2c_req_fortune_wheel();
						s2c_req_fortune_wheel.read(obj_req_fortune_wheel_action, bs)
						return obj_req_fortune_wheel_action;
					// sBattleToNpcError
					case ProtocolsEnum.SBattleToNpcError:
						var obj_battle_to_npc_error_action: s2c_battle_to_npc_error = new s2c_battle_to_npc_error();
						s2c_battle_to_npc_error.read(obj_battle_to_npc_error_action, bs)
						return obj_battle_to_npc_error_action;
					// SSendNpcMsg
					case ProtocolsEnum.SSendNpcMsg:
						var obj_send_npc_msg_action: s2c_send_npc_msg = new s2c_send_npc_msg();
						s2c_send_npc_msg.read(obj_send_npc_msg_action, bs)
						return obj_send_npc_msg_action;
					// SSubmit2Npc
					case ProtocolsEnum.SSubmit2Npc:
						var obj_submit_2npc_action: s2c_submit_2npc = new s2c_submit_2npc();
						s2c_submit_2npc.read(obj_submit_2npc_action, bs)
						return obj_submit_2npc_action;
					//19029
					//STrackedMissions
					case ProtocolsEnum.STrackedMissions:
						var obj_tracked_missions_action: s2c_tracked_missions = new s2c_tracked_missions();
						s2c_tracked_missions.read(obj_tracked_missions_action, bs)
						return obj_tracked_missions_action;*/
				case ProtocolsEnum.SGameTime:// 广播服务器时间
					var obj_SGameTime: S2C_SGameTime = new S2C_SGameTime();
					S2C_SGameTime.read(obj_SGameTime, bs);
					return obj_SGameTime;
				case ProtocolsEnum.SCreateRoleError:// 
					var obj_SCreateRoleError: S2C_SCreateRoleError = new S2C_SCreateRoleError();
					S2C_SCreateRoleError.read(obj_SCreateRoleError, bs);
					return obj_SCreateRoleError;
				/*case ProtocolsEnum.SRefreshUserExp:// 通知客户端刷新人物经验
					var obj_SRefreshUserExp: S2C_SRefreshUserExp = new S2C_SRefreshUserExp();
					S2C_SRefreshUserExp.read(obj_SRefreshUserExp, bs);
					return obj_SRefreshUserExp;
				case ProtocolsEnum.SRefreshHp:// 通知客户端刷新血量
					var obj_SRefreshHp: S2C_SRefreshHp = new S2C_SRefreshHp();
					S2C_SRefreshHp.read(obj_SRefreshHp, bs);
					return obj_SRefreshHp;*/
				case ProtocolsEnum.SResetSysConfig:// 服务器发送客户端最新的系统设置
					var obj_SResetSysConfig: S2C_SResetSysConfig = new S2C_SResetSysConfig();
					S2C_SResetSysConfig.read(obj_SResetSysConfig, bs);
					return obj_SResetSysConfig;
				/*case ProtocolsEnum.SRefSmoney:// 通知客户端刷新储备金
					var obj_SRefSmoney: S2C_SRefSmoney = new S2C_SRefSmoney();
					S2C_SRefSmoney.read(obj_SRefSmoney, bs);
					return obj_SRefSmoney;
				case ProtocolsEnum.SError://
					var obj_SError: S2C_SError = new S2C_SError();
					S2C_SError.read(obj_SError, bs);
					return obj_SError;
				case ProtocolsEnum.SRetRoleProp://返回玩家请求的属性对应的属性值
					var obj_SRetRoleProp: S2C_SRetRoleProp = new S2C_SRetRoleProp();
					S2C_SRetRoleProp.read(obj_SRetRoleProp, bs);
					return obj_SRetRoleProp;
				case ProtocolsEnum.SStartPlayCG://返回玩家请求的属性对应的属性值
					var obj_SStartPlayCG: S2C_SStartPlayCG = new S2C_SStartPlayCG();
					S2C_SStartPlayCG.read(obj_SStartPlayCG, bs);
					return obj_SStartPlayCG;
				case ProtocolsEnum.SBeginnerTip://
					var obj_SBeginnerTip: S2C_SBeginnerTip = new S2C_SBeginnerTip();
					S2C_SBeginnerTip.read(obj_SBeginnerTip, bs);
					return obj_SBeginnerTip;
				case ProtocolsEnum.SShowedBeginnerTips://
					var obj_SShowedBeginnerTips: S2C_SShowedBeginnerTips = new S2C_SShowedBeginnerTips();
					S2C_SShowedBeginnerTips.read(obj_SShowedBeginnerTips, bs);
					return obj_SShowedBeginnerTips;
				case ProtocolsEnum.SAnswerRoleTeamState://返回玩家请求的其他玩家的组队情况
					var obj_SAnswerRoleTeamState: S2C_SAnswerRoleTeamState = new S2C_SAnswerRoleTeamState();
					S2C_SAnswerRoleTeamState.read(obj_SAnswerRoleTeamState, bs);
					return obj_SAnswerRoleTeamState;
				case ProtocolsEnum.SGiveName://返回玩家请求的其他玩家的组队情况
					var obj_SGiveName: S2C_SGiveName = new S2C_SGiveName();
					S2C_SGiveName.read(obj_SGiveName, bs);
					return obj_SGiveName;
				case ProtocolsEnum.SRecommendsNames://创建角色重名时，服务器回给客户端推荐名字
					var obj_SRecommendsNames: S2C_SRecommendsNames = new S2C_SRecommendsNames();
					S2C_SRecommendsNames.read(obj_SRecommendsNames, bs);
					return obj_SRecommendsNames;
				case ProtocolsEnum.SReturnRoleList://服务器发给客户端，允许返回角色选择界面，并发送已有角色信息列表，同SRoleList
					var obj_SReturnRoleList: S2C_SReturnRoleList = new S2C_SReturnRoleList();
					S2C_SReturnRoleList.read(obj_SReturnRoleList, bs);
					return obj_SReturnRoleList;
				case ProtocolsEnum.SSendQueueInfo://服务器：发送排队信息
					var obj_SSendQueueInfo: S2C_SSendQueueInfo = new S2C_SSendQueueInfo();
					S2C_SSendQueueInfo.read(obj_SSendQueueInfo, bs);
					return obj_SSendQueueInfo;
				case ProtocolsEnum.SRoleOffline://服务器：通知客户端下线
					var obj_SRoleOffline: S2C_SRoleOffline = new S2C_SRoleOffline();
					S2C_SRoleOffline.read(obj_SRoleOffline, bs);
					return obj_SRoleOffline;
				case ProtocolsEnum.SReturnLogin://服务器：通知客户端返回登录界面
					var obj_SReturnLogin: S2C_SReturnLogin = new S2C_SReturnLogin();
					S2C_SReturnLogin.read(obj_SReturnLogin, bs);
					return obj_SReturnLogin;
				case ProtocolsEnum.SSendSlowQueueInfo://服务器：发送缓慢进入排队信息
					var obj_SSendSlowQueueInfo: S2C_SSendSlowQueueInfo = new S2C_SSendSlowQueueInfo();
					S2C_SSendSlowQueueInfo.read(obj_SSendSlowQueueInfo, bs);
					return obj_SSendSlowQueueInfo;
				case ProtocolsEnum.SFirstDayExitGame://客户端使用千里寻踪蝶请求玩家坐标
					var obj_SFirstDayExitGame: S2C_SFirstDayExitGame = new S2C_SFirstDayExitGame();
					S2C_SFirstDayExitGame.read(obj_SFirstDayExitGame, bs);
					return obj_SFirstDayExitGame;
				case ProtocolsEnum.SGACDKickoutMsg://客户端进入场景完毕
					var obj_SGACDKickoutMsg: S2C_SGACDKickoutMsg = new S2C_SGACDKickoutMsg();
					S2C_SGACDKickoutMsg.read(obj_SGACDKickoutMsg, bs);
					return obj_SGACDKickoutMsg;
				case ProtocolsEnum.SSendServerMultiExp://发送服务器多倍信息
					var obj_SSendServerMultiExp: S2C_SSendServerMultiExp = new S2C_SSendServerMultiExp();
					S2C_SSendServerMultiExp.read(obj_SSendServerMultiExp, bs);
					return obj_SSendServerMultiExp;
				case ProtocolsEnum.SSendLoginIp://发送登录IP信息
					var obj_SSendLoginIp: S2C_SSendLoginIp = new S2C_SSendLoginIp();
					S2C_SSendLoginIp.read(obj_SSendLoginIp, bs);
					return obj_SSendLoginIp;
				case ProtocolsEnum.SRequestUsedNameData://使用改名道具的时候发送这个协议获取曾用名
					var obj_SRequestUsedNameData: S2C_SRequestUsedNameData = new S2C_SRequestUsedNameData();
					S2C_SRequestUsedNameData.read(obj_SRequestUsedNameData, bs);
					return obj_SRequestUsedNameData;
				case ProtocolsEnum.SModifyRoleName://客户端请求更改名字
					var obj_SModifyRoleName: S2C_SModifyRoleName = new S2C_SModifyRoleName();
					S2C_SModifyRoleName.read(obj_SModifyRoleName, bs);
					return obj_SModifyRoleName;*/
				/*	// sReqFortuneWheel
					case ProtocolsEnum.SReqFortuneWheel:
						var obj_req_fortune_wheel_action: s2c_req_fortune_wheel = new s2c_req_fortune_wheel();
						s2c_req_fortune_wheel.read(obj_req_fortune_wheel_action, bs)
						return obj_req_fortune_wheel_action;
					// sBattleToNpcError
					case ProtocolsEnum.SBattleToNpcError:
						var obj_battle_to_npc_error_action: s2c_battle_to_npc_error = new s2c_battle_to_npc_error();
						s2c_battle_to_npc_error.read(obj_battle_to_npc_error_action, bs)
						return obj_battle_to_npc_error_action;
					// SSendNpcMsg
					case ProtocolsEnum.SSendNpcMsg:
						var obj_send_npc_msg_action: s2c_send_npc_msg = new s2c_send_npc_msg();
						s2c_send_npc_msg.read(obj_send_npc_msg_action, bs)
						return obj_send_npc_msg_action;
					// SSubmit2Npc
					case ProtocolsEnum.SSubmit2Npc:
						var obj_submit_2npc_action: s2c_submit_2npc = new s2c_submit_2npc();
						s2c_submit_2npc.read(obj_submit_2npc_action, bs)
						return obj_submit_2npc_action;
					//19029*/
				//STrackedMissions
				case ProtocolsEnum.STrackedMissions:
					var obj_tracked_missions_action: s2c_tracked_missions = new s2c_tracked_missions();
					s2c_tracked_missions.read(obj_tracked_missions_action, bs)
					return obj_tracked_missions_action;
				/*	case ProtocolsEnum.SGameTime:// 广播服务器时间
						var obj_SGameTime: S2C_SGameTime = new S2C_SGameTime();
						S2C_SGameTime.read(obj_SGameTime, bs);
						return obj_SGameTime;
					case ProtocolsEnum.SCreateRoleError:// 
						var obj_SCreateRoleError: S2C_SCreateRoleError = new S2C_SCreateRoleError();
						S2C_SCreateRoleError.read(obj_SCreateRoleError, bs);
						return obj_SCreateRoleError;
					case ProtocolsEnum.SRefreshUserExp:// 通知客户端刷新人物经验
						var obj_SRefreshUserExp: S2C_SRefreshUserExp = new S2C_SRefreshUserExp();
						S2C_SRefreshUserExp.read(obj_SRefreshUserExp, bs);
						return obj_SRefreshUserExp;
					case ProtocolsEnum.SRefreshHp:// 通知客户端刷新血量
						var obj_SRefreshHp: S2C_SRefreshHp = new S2C_SRefreshHp();
						S2C_SRefreshHp.read(obj_SRefreshHp, bs);
						return obj_SRefreshHp;
					case ProtocolsEnum.SResetSysConfig:// 服务器发送客户端最新的系统设置
						var obj_SResetSysConfig: S2C_SResetSysConfig = new S2C_SResetSysConfig();
						S2C_SResetSysConfig.read(obj_SResetSysConfig, bs);
						return obj_SResetSysConfig;
					case ProtocolsEnum.SRefSmoney:// 通知客户端刷新储备金
						var obj_SRefSmoney: S2C_SRefSmoney = new S2C_SRefSmoney();
						S2C_SRefSmoney.read(obj_SRefSmoney, bs);
						return obj_SRefSmoney;
					case ProtocolsEnum.SError://
						var obj_SError: S2C_SError = new S2C_SError();
						S2C_SError.read(obj_SError, bs);
						return obj_SError;
					case ProtocolsEnum.SRetRoleProp://返回玩家请求的属性对应的属性值
						var obj_SRetRoleProp: S2C_SRetRoleProp = new S2C_SRetRoleProp();
						S2C_SRetRoleProp.read(obj_SRetRoleProp, bs);
						return obj_SRetRoleProp;
					case ProtocolsEnum.SStartPlayCG://返回玩家请求的属性对应的属性值
						var obj_SStartPlayCG: S2C_SStartPlayCG = new S2C_SStartPlayCG();
						S2C_SStartPlayCG.read(obj_SStartPlayCG, bs);
						return obj_SStartPlayCG;
					case ProtocolsEnum.SBeginnerTip://
						var obj_SBeginnerTip: S2C_SBeginnerTip = new S2C_SBeginnerTip();
						S2C_SBeginnerTip.read(obj_SBeginnerTip, bs);
						return obj_SBeginnerTip;
					case ProtocolsEnum.SShowedBeginnerTips://
						var obj_SShowedBeginnerTips: S2C_SShowedBeginnerTips = new S2C_SShowedBeginnerTips();
						S2C_SShowedBeginnerTips.read(obj_SShowedBeginnerTips, bs);
						return obj_SShowedBeginnerTips;
					case ProtocolsEnum.SAnswerRoleTeamState://返回玩家请求的其他玩家的组队情况
						var obj_SAnswerRoleTeamState: S2C_SAnswerRoleTeamState = new S2C_SAnswerRoleTeamState();
						S2C_SAnswerRoleTeamState.read(obj_SAnswerRoleTeamState, bs);
						return obj_SAnswerRoleTeamState;
					case ProtocolsEnum.SGiveName://返回玩家请求的其他玩家的组队情况
						var obj_SGiveName: S2C_SGiveName = new S2C_SGiveName();
						S2C_SGiveName.read(obj_SGiveName, bs);
						return obj_SGiveName;
					case ProtocolsEnum.SRecommendsNames://创建角色重名时，服务器回给客户端推荐名字
						var obj_SRecommendsNames: S2C_SRecommendsNames = new S2C_SRecommendsNames();
						S2C_SRecommendsNames.read(obj_SRecommendsNames, bs);
						return obj_SRecommendsNames;
					case ProtocolsEnum.SReturnRoleList://服务器发给客户端，允许返回角色选择界面，并发送已有角色信息列表，同SRoleList
						var obj_SReturnRoleList: S2C_SReturnRoleList = new S2C_SReturnRoleList();
						S2C_SReturnRoleList.read(obj_SReturnRoleList, bs);
						return obj_SReturnRoleList;
					case ProtocolsEnum.SSendQueueInfo://服务器：发送排队信息
						var obj_SSendQueueInfo: S2C_SSendQueueInfo = new S2C_SSendQueueInfo();
						S2C_SSendQueueInfo.read(obj_SSendQueueInfo, bs);
						return obj_SSendQueueInfo;
					case ProtocolsEnum.SRoleOffline://服务器：通知客户端下线
						var obj_SRoleOffline: S2C_SRoleOffline = new S2C_SRoleOffline();
						S2C_SRoleOffline.read(obj_SRoleOffline, bs);
						return obj_SRoleOffline;
					case ProtocolsEnum.SReturnLogin://服务器：通知客户端返回登录界面
						var obj_SReturnLogin: S2C_SReturnLogin = new S2C_SReturnLogin();
						S2C_SReturnLogin.read(obj_SReturnLogin, bs);
						return obj_SReturnLogin;
					case ProtocolsEnum.SSendSlowQueueInfo://服务器：发送缓慢进入排队信息
						var obj_SSendSlowQueueInfo: S2C_SSendSlowQueueInfo = new S2C_SSendSlowQueueInfo();
						S2C_SSendSlowQueueInfo.read(obj_SSendSlowQueueInfo, bs);
						return obj_SSendSlowQueueInfo;
					case ProtocolsEnum.SFirstDayExitGame://客户端使用千里寻踪蝶请求玩家坐标
						var obj_SFirstDayExitGame: S2C_SFirstDayExitGame = new S2C_SFirstDayExitGame();
						S2C_SFirstDayExitGame.read(obj_SFirstDayExitGame, bs);
						return obj_SFirstDayExitGame;
					case ProtocolsEnum.SGACDKickoutMsg://客户端进入场景完毕
						var obj_SGACDKickoutMsg: S2C_SGACDKickoutMsg = new S2C_SGACDKickoutMsg();
						S2C_SGACDKickoutMsg.read(obj_SGACDKickoutMsg, bs);
						return obj_SGACDKickoutMsg;
					case ProtocolsEnum.SSendServerMultiExp://发送服务器多倍信息
						var obj_SSendServerMultiExp: S2C_SSendServerMultiExp = new S2C_SSendServerMultiExp();
						S2C_SSendServerMultiExp.read(obj_SSendServerMultiExp, bs);
						return obj_SSendServerMultiExp;
					case ProtocolsEnum.SSendLoginIp://发送登录IP信息
						var obj_SSendLoginIp: S2C_SSendLoginIp = new S2C_SSendLoginIp();
						S2C_SSendLoginIp.read(obj_SSendLoginIp, bs);
						return obj_SSendLoginIp;
					case ProtocolsEnum.SRequestUsedNameData://使用改名道具的时候发送这个协议获取曾用名
						var obj_SRequestUsedNameData: S2C_SRequestUsedNameData = new S2C_SRequestUsedNameData();
						S2C_SRequestUsedNameData.read(obj_SRequestUsedNameData, bs);
						return obj_SRequestUsedNameData;
					case ProtocolsEnum.SModifyRoleName://客户端请求更改名字
						var obj_SModifyRoleName: S2C_SModifyRoleName = new S2C_SModifyRoleName();
						S2C_SModifyRoleName.read(obj_SModifyRoleName, bs);
						return obj_SModifyRoleName;*/
				case ProtocolsEnum.SRspRoleInfo://人物信息界面回复
					var obj_SRspRoleInfo: S2C_SRspRoleInfo = new S2C_SRspRoleInfo();
					S2C_SRspRoleInfo.read(obj_SRspRoleInfo, bs);
					return obj_SRspRoleInfo;
				/*case ProtocolsEnum.SUserNeedActive://如果玩家需要激活,服务器发这个
					var obj_SUserNeedActive: S2C_SUserNeedActive = new S2C_SUserNeedActive();
					S2C_SUserNeedActive.read(obj_SUserNeedActive, bs);
					return obj_SUserNeedActive;
				case ProtocolsEnum.SNotifyDeviceInfo://
					var obj_SNotifyDeviceInfo: S2C_SNotifyDeviceInfo = new S2C_SNotifyDeviceInfo();
					S2C_SNotifyDeviceInfo.read(obj_SNotifyDeviceInfo, bs);
					return obj_SNotifyDeviceInfo;
				case ProtocolsEnum.SNotifyShieldState://
					var obj_SNotifyShieldState: S2C_SNotifyShieldState = new S2C_SNotifyShieldState();
					S2C_SNotifyShieldState.read(obj_SNotifyShieldState, bs);
					return obj_SNotifyShieldState;
				case ProtocolsEnum.SGACDKickoutMsg1://
					var obj_SGACDKickoutMsg1: S2C_SGACDKickoutMsg1 = new S2C_SGACDKickoutMsg1();
					S2C_SGACDKickoutMsg1.read(obj_SGACDKickoutMsg1, bs);
					return obj_SGACDKickoutMsg1;
				case ProtocolsEnum.SServerLevel://
					var obj_SServerLevel: S2C_SServerLevel = new S2C_SServerLevel();
					S2C_SServerLevel.read(obj_SServerLevel, bs);
					return obj_SServerLevel;
				case ProtocolsEnum.STeamVote://客户端进入场景完毕
					var obj_STeamVote: S2C_STeamVote = new S2C_STeamVote();
					S2C_STeamVote.read(obj_STeamVote, bs);
					return obj_STeamVote;*/
				case ProtocolsEnum.SGetSysConfig://服务器发送客户端最新的系统设置
					var obj_SGetSysConfig: S2C_SGetSysConfig = new S2C_SGetSysConfig();
					S2C_SGetSysConfig.read(obj_SGetSysConfig, bs);
					return obj_SGetSysConfig;
				/*case ProtocolsEnum.SServerIDResponse://跨服相关的协议
					var obj_SServerIDResponse: S2C_SServerIDResponse = new S2C_SServerIDResponse();
					S2C_SServerIDResponse.read(obj_SServerIDResponse, bs);
					return obj_SServerIDResponse;
				case ProtocolsEnum.SAddPointAttrData://
					var obj_SAddPointAttrData: S2C_SAddPointAttrData = new S2C_SAddPointAttrData();
					S2C_SAddPointAttrData.read(obj_SAddPointAttrData, bs);
					return obj_SAddPointAttrData;
				case ProtocolsEnum.SReqHelpCountView://
					var obj_SReqHelpCountView: S2C_SReqHelpCountView = new S2C_SReqHelpCountView();
					S2C_SReqHelpCountView.read(obj_SReqHelpCountView, bs);
					return obj_SReqHelpCountView;
				case ProtocolsEnum.SReqColorRoomView://返回人物染色衣橱信息
					var obj_SReqColorRoomView: S2C_SReqColorRoomView = new S2C_SReqColorRoomView();
					S2C_SReqColorRoomView.read(obj_SReqColorRoomView, bs);
					return obj_SReqColorRoomView;
				case ProtocolsEnum.SReqUseColor://返回使用染色成功
					var obj_SReqUseColor: S2C_SReqUseColor = new S2C_SReqUseColor();
					S2C_SReqUseColor.read(obj_SReqUseColor, bs);
					return obj_SReqUseColor;
				case ProtocolsEnum.SReqUsePetColor://返回宠物染色
					var obj_SReqUsePetColor: S2C_SReqUsePetColor = new S2C_SReqUsePetColor();
					S2C_SReqUsePetColor.read(obj_SReqUsePetColor, bs);
					return obj_SReqUsePetColor;
				case ProtocolsEnum.SReqPointSchemeTime://返回人物切换加点方案次数
					var obj_SReqPointSchemeTime: S2C_SReqPointSchemeTime = new S2C_SReqPointSchemeTime();
					S2C_SReqPointSchemeTime.read(obj_SReqPointSchemeTime, bs);
					return obj_SReqPointSchemeTime;
				case ProtocolsEnum.SSetFunOpenClose://设置功能开关
					var obj_SSetFunOpenClose: S2C_SSetFunOpenClose = new S2C_SSetFunOpenClose();
					S2C_SSetFunOpenClose.read(obj_SSetFunOpenClose, bs);
					return obj_SSetFunOpenClose;
				case ProtocolsEnum.SSendHelpSW://援助声望当前值
					var obj_SSendHelpSW: S2C_SSendHelpSW = new S2C_SSendHelpSW();
					S2C_SSendHelpSW.read(obj_SSendHelpSW, bs);
					return obj_SSendHelpSW;*/
				case ProtocolsEnum.SSetLineConfig://
					var obj_SSetLineConfig: S2C_SSetLineConfig = new S2C_SSetLineConfig();
					S2C_SSetLineConfig.read(obj_SSetLineConfig, bs);
					return obj_SSetLineConfig;
				case ProtocolsEnum.SDefineTeam:
					var obj_SDefineTeam: S2C_SDefineTeam = new S2C_SDefineTeam();
					S2C_SDefineTeam.read(obj_SDefineTeam, bs);
					return obj_SDefineTeam;
				case ProtocolsEnum.SCheckCodeFinishTime://验证码倒计时完成时间点
					var obj_SCheckCodeFinishTime: S2C_SCheckCodeFinishTime = new S2C_SCheckCodeFinishTime();
					S2C_SCheckCodeFinishTime.read(obj_SCheckCodeFinishTime, bs);
					return obj_SCheckCodeFinishTime;
				case ProtocolsEnum.SBindTel://确认关联手机返回状态1成功0失败
					var obj_SBindTel: S2C_SBindTel = new S2C_SBindTel();
					S2C_SBindTel.read(obj_SBindTel, bs);
					return obj_SBindTel;
				/*case ProtocolsEnum.SUnBindTel://解除关联手机返回状态1成功0失败
					var obj_SUnBindTel: S2C_SUnBindTel = new S2C_SUnBindTel();
					S2C_SUnBindTel.read(obj_SUnBindTel, bs);
					return obj_SUnBindTel;*/
				case ProtocolsEnum.SGetBindTel://返回关联手机信息
					var obj_SGetBindTel: S2C_SGetBindTel = new S2C_SGetBindTel();
					S2C_SGetBindTel.read(obj_SGetBindTel, bs);
					return obj_SGetBindTel;
				case ProtocolsEnum.SGetBindTelAward://返回绑定手机奖励状态
					var obj_SGetBindTelAward: S2C_SGetBindTelAward = new S2C_SGetBindTelAward();
					S2C_SGetBindTelAward.read(obj_SGetBindTelAward, bs);
					return obj_SGetBindTelAward;
				/*case ProtocolsEnum.SBindTelAgain://重新绑定手机
					var obj_SBindTelAgain: S2C_SBindTelAgain = new S2C_SBindTelAgain();
					S2C_SBindTelAgain.read(obj_SBindTelAgain, bs);
					return obj_SBindTelAgain;*/
				case ProtocolsEnum.SSetPassword://返回成功与否
					var obj_SSetPassword: S2C_SSetPassword = new S2C_SSetPassword();
					S2C_SSetPassword.read(obj_SSetPassword, bs);
					return obj_SSetPassword;
				case ProtocolsEnum.SResetPassword://返回成功与否
					var obj_SResetPassword: S2C_SResetPassword = new S2C_SResetPassword();
					S2C_SResetPassword.read(obj_SResetPassword, bs);
					return obj_SResetPassword;
				case ProtocolsEnum.SDelPassword://返回成功与否
					var obj_SDelPassword: S2C_SDelPassword = new S2C_SDelPassword();
					S2C_SDelPassword.read(obj_SDelPassword, bs);
					return obj_SDelPassword;
				case ProtocolsEnum.SForceDelPassword://解除时间点
					var obj_SForceDelPassword: S2C_SForceDelPassword = new S2C_SForceDelPassword();
					S2C_SForceDelPassword.read(obj_SForceDelPassword, bs);
					return obj_SForceDelPassword;
				case ProtocolsEnum.SCancelForceDelPassword://返回成功与否
					var obj_SCancelForceDelPassword: S2C_SCancelForceDelPassword = new S2C_SCancelForceDelPassword();
					S2C_SCancelForceDelPassword.read(obj_SCancelForceDelPassword, bs);
					return obj_SCancelForceDelPassword;
				case ProtocolsEnum.SOpenGoodLocks://返回成功与否
					var obj_SOpenGoodLocks: S2C_SOpenGoodLocks = new S2C_SOpenGoodLocks();
					S2C_SOpenGoodLocks.read(obj_SOpenGoodLocks, bs);
					return obj_SOpenGoodLocks;
				case ProtocolsEnum.SCloseGoodLocks://返回成功与否
					var obj_SCloseGoodLocks: S2C_SCloseGoodLocks = new S2C_SCloseGoodLocks();
					S2C_SCloseGoodLocks.read(obj_SCloseGoodLocks, bs);
					return obj_SCloseGoodLocks;
				case ProtocolsEnum.SGetGoodLocksInfo://道具安全锁信息
					var obj_SGetGoodLocksInfo: S2C_SGetGoodLocksInfo = new S2C_SGetGoodLocksInfo();
					S2C_SGetGoodLocksInfo.read(obj_SGetGoodLocksInfo, bs);
					return obj_SGetGoodLocksInfo;
				/*case ProtocolsEnum.SGoodUnLock://道具输入密码解锁状态
					var obj_SGoodUnLock: S2C_SGoodUnLock = new S2C_SGoodUnLock();
					S2C_SGoodUnLock.read(obj_SGoodUnLock, bs);
					return obj_SGoodUnLock;
				case ProtocolsEnum.SForceUnlockTimeExpire://强制解锁到期状态
					var obj_SForceUnlockTimeExpire: S2C_SForceUnlockTimeExpire = new S2C_SForceUnlockTimeExpire();
					S2C_SForceUnlockTimeExpire.read(obj_SForceUnlockTimeExpire, bs);
					return obj_SForceUnlockTimeExpire;
				case ProtocolsEnum.SChangeGoodLockState://改变道具锁的状态
					var obj_SChangeGoodLockState: S2C_SChangeGoodLockState = new S2C_SChangeGoodLockState();
					S2C_SChangeGoodLockState.read(obj_SChangeGoodLockState, bs);
					return obj_SChangeGoodLockState;
				case ProtocolsEnum.SCheckCodeFinishTimePoint://验证码倒计时完成时间点
					var obj_SCheckCodeFinishTimePoint: S2C_SCheckCodeFinishTimePoint = new S2C_SCheckCodeFinishTimePoint();
					S2C_SCheckCodeFinishTimePoint.read(obj_SCheckCodeFinishTimePoint, bs);
					return obj_SCheckCodeFinishTimePoint;
				case ProtocolsEnum.SCBGUpCheckCode://藏宝阁上架验证
					var obj_SCBGUpCheckCode: S2C_SCBGUpCheckCode = new S2C_SCBGUpCheckCode();
					S2C_SCBGUpCheckCode.read(obj_SCBGUpCheckCode, bs);
					return obj_SCBGUpCheckCode;*/
				case ProtocolsEnum.SGetPetEquipInfo://
					var obj_SGetPetEquipInfo: S2C_SGetPetEquipInfo = new S2C_SGetPetEquipInfo();
					S2C_SGetPetEquipInfo.read(obj_SGetPetEquipInfo, bs);
					return obj_SGetPetEquipInfo;
				/** 智慧试炼开始 */
				case ProtocolsEnum.SAttendImpExam:
					var obj_attend_impexam_action: S2C_attend_impexam = new S2C_attend_impexam();
					S2C_attend_impexam.read(obj_attend_impexam_action, bs);
					return obj_attend_impexam_action;

				case ProtocolsEnum.SSendImpExamVill:
					var obj_send_impexamvill_action: S2C_send_impexamvill = new S2C_send_impexamvill();
					S2C_send_impexamvill.read(obj_send_impexamvill_action, bs);
					return obj_send_impexamvill_action;

				case ProtocolsEnum.SSendImpExamProv:
					var obj_send_impexamprov_action: S2C_send_impexamprov = new S2C_send_impexamprov();
					S2C_send_impexamprov.read(obj_send_impexamprov_action, bs);
					return obj_send_impexamprov_action;

				case ProtocolsEnum.SSendImpExamState:
					var obj_send_impexamstate_action: S2C_send_impexamstate = new S2C_send_impexamstate();
					S2C_send_impexamstate.read(obj_send_impexamstate_action, bs);
					return obj_send_impexamstate_action;

				case ProtocolsEnum.SSendImpExamStart:
					var obj_send_impexamstart_action: S2C_send_impexamstart = new S2C_send_impexamstart();
					S2C_send_impexamstart.read(obj_send_impexamstart_action, bs);
					return obj_send_impexamstart_action;

				case ProtocolsEnum.SSendImpExamAssist:
					var obj_send_impexamassist_action: S2C_send_impexamassist = new S2C_send_impexamassist();
					S2C_send_impexamassist.read(obj_send_impexamassist_action, bs);
					return obj_send_impexamassist_action;

				case ProtocolsEnum.SImpExamHelp:
					var obj_imp_examhelp_action: S2C_imp_examhelp = new S2C_imp_examhelp();
					S2C_imp_examhelp.read(obj_imp_examhelp_action, bs);
					return obj_imp_examhelp_action;

				case ProtocolsEnum.SQueryImpExamState:
					var obj_query_impexamstate_action: S2C_query_impexamstate = new S2C_query_impexamstate();
					S2C_query_impexamstate.read(obj_query_impexamstate_action, bs);
					return obj_query_impexamstate_action;
				/** 智慧试炼结束 */
				/*			case ProtocolsEnum.SWinnerChangeTask:
								var obj_winner_changetask_action: S2C_winner_changetask = new S2C_winner_changetask();
								S2C_winner_changetask.read(obj_winner_changetask_action, bs);
								return obj_winner_changetask_action;
							case ProtocolsEnum.SGeneralSummonCommand:
								var obj_general_summoncommand_action: S2C_general_summoncommand = new S2C_general_summoncommand();
								S2C_general_summoncommand.read(obj_general_summoncommand_action, bs);
								return obj_general_summoncommand_action;
							case ProtocolsEnum.SAskQuestion:
								var obj_ask_question_action: S2C_ask_question = new S2C_ask_question();
								S2C_ask_question.read(obj_ask_question_action, bs);
								return obj_ask_question_action;
							case ProtocolsEnum.SGrabActivityReward:
								var obj_grab_activityreward_action: S2C_grab_activityreward = new S2C_grab_activityreward();
								S2C_grab_activityreward.read(obj_grab_activityreward_action, bs);
								return obj_grab_activityreward_action;
							case ProtocolsEnum.SActivityAnswerQuestionHelp:
								var obj_activity_answerquestionhelp_action: S2C_activity_answerquestionhelp = new S2C_activity_answerquestionhelp();
								S2C_activity_answerquestionhelp.read(obj_activity_answerquestionhelp_action, bs);
								return obj_activity_answerquestionhelp_action;
							case ProtocolsEnum.SVisitNpcContainChatMsg:
								var obj_visit_npccontainchatmsg_action: S2C_visit_npccontainchatmsg = new S2C_visit_npccontainchatmsg();
								S2C_visit_npccontainchatmsg.read(obj_visit_npccontainchatmsg_action, bs);
								return obj_visit_npccontainchatmsg_action;*/
				case ProtocolsEnum.SPingJi:
					var obj_ping_ji_action: S2C_ping_ji = new S2C_ping_ji();
					S2C_ping_ji.read(obj_ping_ji_action, bs);
					return obj_ping_ji_action;
				case ProtocolsEnum.SNpcBattleTime:
					var obj_npc_battletime_action: S2C_npc_battletime = new S2C_npc_battletime();
					S2C_npc_battletime.read(obj_npc_battletime_action, bs);
					return obj_npc_battletime_action;
				case ProtocolsEnum.SMacthResult:
					var obj_macth_result_action: S2C_macth_result = new S2C_macth_result();
					S2C_macth_result.read(obj_macth_result_action, bs);
					return obj_macth_result_action;
				case ProtocolsEnum.SSendNpcService:
					var obj_send_npcservice_action: S2C_send_npcservice = new S2C_send_npcservice();
					S2C_send_npcservice.read(obj_send_npcservice_action, bs);
					return obj_send_npcservice_action;
				case ProtocolsEnum.SShowPetAround:
					var obj_show_petaround_action: S2C_show_petaround = new S2C_show_petaround();
					S2C_show_petaround.read(obj_show_petaround_action, bs);
					return obj_show_petaround_action;
				case ProtocolsEnum.SRefreshPetInfo:
					var obj_refresh_petinfo_action: S2C_refresh_petinfo = new S2C_refresh_petinfo();
					S2C_refresh_petinfo.read(obj_refresh_petinfo_action, bs);
					return obj_refresh_petinfo_action;
				case ProtocolsEnum.SRefreshPetExp:
					var obj_refresh_petexp_action: S2C_refresh_petexp = new S2C_refresh_petexp();
					S2C_refresh_petexp.read(obj_refresh_petexp_action, bs);
					return obj_refresh_petexp_action;
				case ProtocolsEnum.SSetFightPet:
					var obj_set_fightpet_action: S2C_set_fightpet = new S2C_set_fightpet();
					S2C_set_fightpet.read(obj_set_fightpet_action, bs);
					return obj_set_fightpet_action;
				case ProtocolsEnum.SSetFightPetRest:
					var obj_set_fightpetrest_action: S2C_set_fightpetrest = new S2C_set_fightpetrest();
					S2C_set_fightpetrest.read(obj_set_fightpetrest_action, bs);
					return obj_set_fightpetrest_action;
				case ProtocolsEnum.SAddPetToColumn:
					var obj_add_pettocolumn_action: S2C_add_pettocolumn = new S2C_add_pettocolumn();
					S2C_add_pettocolumn.read(obj_add_pettocolumn_action, bs);
					return obj_add_pettocolumn_action;
				case ProtocolsEnum.SRemovePetFromCol:
					var obj_remove_petfromcol_action: S2C_remove_petfromcol = new S2C_remove_petfromcol();
					S2C_remove_petfromcol.read(obj_remove_petfromcol_action, bs);
					return obj_remove_petfromcol_action;
				case ProtocolsEnum.SGetPetcolumnInfo:
					var obj_get_petcolumninfo_action: S2C_get_petcolumninfo = new S2C_get_petcolumninfo();
					S2C_get_petcolumninfo.read(obj_get_petcolumninfo_action, bs);
					return obj_get_petcolumninfo_action;
				case ProtocolsEnum.SPetError:
					var obj_pet_error_action: S2C_pet_error = new S2C_pet_error();
					S2C_pet_error.read(obj_pet_error_action, bs);
					return obj_pet_error_action;
				case ProtocolsEnum.SModPetName:
					var obj_mod_petname_action: S2C_mod_petname = new S2C_mod_petname();
					S2C_mod_petname.read(obj_mod_petname_action, bs);
					return obj_mod_petname_action;
				case ProtocolsEnum.SPetGossip:
					var obj_pet_gossip_action: S2C_pet_gossip = new S2C_pet_gossip();
					S2C_pet_gossip.read(obj_pet_gossip_action, bs);
					return obj_pet_gossip_action;
				case ProtocolsEnum.SRefreshPetSkill:
					var obj_refresh_petskill_action: S2C_refresh_petskill = new S2C_refresh_petskill();
					S2C_refresh_petskill.read(obj_refresh_petskill_action, bs);
					return obj_refresh_petskill_action;
				case ProtocolsEnum.SShowPetInfo:
					var obj_show_petinfo_action: S2C_show_petinfo = new S2C_show_petinfo();
					S2C_show_petinfo.read(obj_show_petinfo_action, bs);
					return obj_show_petinfo_action;
				case ProtocolsEnum.SRefreshPetColumnCapacity:
					var obj_refresh_petcolumncapacity_action: S2C_refresh_petcolumncapacity = new S2C_refresh_petcolumncapacity();
					S2C_refresh_petcolumncapacity.read(obj_refresh_petcolumncapacity_action, bs);
					return obj_refresh_petcolumncapacity_action;
				case ProtocolsEnum.SRefreshPetScore:
					var obj_refresh_petscore_action: S2C_refresh_petscore = new S2C_refresh_petscore();
					S2C_refresh_petscore.read(obj_refresh_petscore_action, bs);
					return obj_refresh_petscore_action;
				case ProtocolsEnum.SPetSetAutoAddPoint:
					var obj_pet_setautoaddpoint_action: S2C_pet_setautoaddpoint = new S2C_pet_setautoaddpoint();
					S2C_pet_setautoaddpoint.read(obj_pet_setautoaddpoint_action, bs);
					return obj_pet_setautoaddpoint_action;
				case ProtocolsEnum.SPetWash:
					var obj_pet_wash_action: S2C_pet_wash = new S2C_pet_wash();
					S2C_pet_wash.read(obj_pet_wash_action, bs);
					return obj_pet_wash_action;
				case ProtocolsEnum.SPetSynthesize:
					var obj_pet_synthesize_action: S2C_pet_synthesize = new S2C_pet_synthesize();
					S2C_pet_synthesize.read(obj_pet_synthesize_action, bs);
					return obj_pet_synthesize_action;
				case ProtocolsEnum.SPetSkillCertification:
					var obj_pet_skillcertification_action: S2C_pet_skillcertification = new S2C_pet_skillcertification();
					S2C_pet_skillcertification.read(obj_pet_skillcertification_action, bs);
					return obj_pet_skillcertification_action;
				case ProtocolsEnum.SPetAptitudeCultivate:
					var obj_pet_aptitudecultivate_action: S2C_pet_aptitudecultivate = new S2C_pet_aptitudecultivate();
					S2C_pet_aptitudecultivate.read(obj_pet_aptitudecultivate_action, bs);
					return obj_pet_aptitudecultivate_action;
				case ProtocolsEnum.SGetPetInfo:
					var obj_get_petinfo_action: S2C_get_petinfo = new S2C_get_petinfo();
					S2C_get_petinfo.read(obj_get_petinfo_action, bs);
					return obj_get_petinfo_action;
				case ProtocolsEnum.SPetRecoverList:
					var obj_pet_recoverlist_action: S2C_pet_recoverlist = new S2C_pet_recoverlist();
					S2C_pet_recoverlist.read(obj_pet_recoverlist_action, bs);
					return obj_pet_recoverlist_action;
				case ProtocolsEnum.SPetRecover:
					var obj_pet_recover_action: S2C_pet_recover = new S2C_pet_recover();
					S2C_pet_recover.read(obj_pet_recover_action, bs);
					return obj_pet_recover_action;
				case ProtocolsEnum.SRecoverPetInfo:
					var obj_recover_petinfo_action: S2C_recover_petinfo = new S2C_recover_petinfo();
					S2C_recover_petinfo.read(obj_recover_petinfo_action, bs);
					return obj_recover_petinfo_action;/*
				case ProtocolsEnum.SBlackRoles:
					var obj_black_roles_action: S2C_black_roles = new S2C_black_roles();
					S2C_black_roles.read(obj_black_roles_action, bs);
					return obj_black_roles_action;
				case ProtocolsEnum.SSearchBlackRoleInfo:
					var obj_search_blackroleinfo_action: S2C_search_blackroleinfo = new S2C_search_blackroleinfo();
					S2C_search_blackroleinfo.read(obj_search_blackroleinfo_action, bs);
					return obj_search_blackroleinfo_action; */
				case ProtocolsEnum.SErrorCode:
					var obj_error_code_action: S2C_error_code = new S2C_error_code();
					S2C_error_code.read(obj_error_code_action, bs);
					return obj_error_code_action;
				case ProtocolsEnum.SProductMadeUp:
					var obj_product_madeup_action: S2C_product_madeup = new S2C_product_madeup();
					S2C_product_madeup.read(obj_product_madeup_action, bs);
					return obj_product_madeup_action;
				case ProtocolsEnum.SRequestRankList:
					var obj_request_ranklist_action: S2C_request_ranklist = new S2C_request_ranklist();
					S2C_request_ranklist.read(obj_request_ranklist_action, bs);
					return obj_request_ranklist_action;
				case ProtocolsEnum.SSendRankPetData:
					var obj_send_rankpetdata_action: S2C_send_rankpetdata = new S2C_send_rankpetdata();
					S2C_send_rankpetdata.read(obj_send_rankpetdata_action, bs);
					return obj_send_rankpetdata_action;
				case ProtocolsEnum.SRankRoleInfo:
					var obj_rank_roleinfo_action: S2C_rank_roleinfo = new S2C_rank_roleinfo();
					S2C_rank_roleinfo.read(obj_rank_roleinfo_action, bs);
					return obj_rank_roleinfo_action;
				case ProtocolsEnum.SRankRoleInfo2:
					var obj_rank_roleinfo2_action: S2C_rank_roleinfo2 = new S2C_rank_roleinfo2();
					S2C_rank_roleinfo2.read(obj_rank_roleinfo2_action, bs);
					return obj_rank_roleinfo2_action;
				case ProtocolsEnum.SFactionRankInfo:
					var obj_faction_rankinfo_action: S2C_faction_rankinfo = new S2C_faction_rankinfo();
					S2C_faction_rankinfo.read(obj_faction_rankinfo_action, bs);
					return obj_faction_rankinfo_action;
				/*case ProtocolsEnum.SSendShouxiInfo:
					var obj_send_shouxiinfo_action: S2C_send_shouxiinfo = new S2C_send_shouxiinfo();
					S2C_send_shouxiinfo.read(obj_send_shouxiinfo_action, bs);
					return obj_send_shouxiinfo_action;
				case ProtocolsEnum.SSendCandidates:
					var obj_send_candidates_action: S2C_send_candidates = new S2C_send_candidates();
					S2C_send_candidates.read(obj_send_candidates_action, bs);
					return obj_send_candidates_action;
				case ProtocolsEnum.SVoteCandidate:
					var obj_vote_candidate_action: S2C_vote_candidate = new S2C_vote_candidate();
					S2C_vote_candidate.read(obj_vote_candidate_action, bs);
					return obj_vote_candidate_action;
				case ProtocolsEnum.SMyElector:
					var obj_my_elector_action: S2C_my_elector = new S2C_my_elector();
					S2C_my_elector.read(obj_my_elector_action, bs);
					return obj_my_elector_action;
				case ProtocolsEnum.SCanElect:
					var obj_can_elect_action: S2C_can_elect = new S2C_can_elect();
					S2C_can_elect.read(obj_can_elect_action, bs);
					return obj_can_elect_action;
				case ProtocolsEnum.SShouxiShape:
					var obj_shouxi_shape_action: S2C_shouxi_shape = new S2C_shouxi_shape();
					S2C_shouxi_shape.read(obj_shouxi_shape_action, bs);
					return obj_shouxi_shape_action;
				case ProtocolsEnum.SOldSchoolList:
					var obj_old_schoollist_action: S2C_old_schoollist = new S2C_old_schoollist();
					S2C_old_schoollist.read(obj_old_schoollist_action, bs);
					return obj_old_schoollist_action;
				case ProtocolsEnum.SChangeSchoolExtInfo:
					var obj_change_schoolextinfo_action: S2C_change_schoolextinfo = new S2C_change_schoolextinfo();
					S2C_change_schoolextinfo.read(obj_change_schoolextinfo_action, bs);
					return obj_change_schoolextinfo_action;
				case ProtocolsEnum.SChangeWeapon:
					var obj_change_weapon_action: S2C_change_weapon = new S2C_change_weapon();
					S2C_change_weapon.read(obj_change_weapon_action, bs);
					return obj_change_weapon_action;
				case ProtocolsEnum.SChangeGem:
					var obj_change_gem_action: S2C_change_gem = new S2C_change_gem();
					S2C_change_gem.read(obj_change_gem_action, bs);
					return obj_change_gem_action;*/
				case ProtocolsEnum.SResponseShopPrice:
					var obj_response_shopprice_action: S2C_response_shopprice = new S2C_response_shopprice();
					S2C_response_shopprice.read(obj_response_shopprice_action, bs);
					return obj_response_shopprice_action;
				case ProtocolsEnum.SQueryLimit:
					var obj_query_limit_action: S2C_query_limit = new S2C_query_limit();
					S2C_query_limit.read(obj_query_limit_action, bs);
					return obj_query_limit_action;
				case ProtocolsEnum.SMarketBrowse:
					var obj_market_browse_action: S2C_market_browse = new S2C_market_browse();
					S2C_market_browse.read(obj_market_browse_action, bs);
					return obj_market_browse_action;
				case ProtocolsEnum.SMarketBuy:
					var obj_market_buy_action: S2C_market_buy = new S2C_market_buy();
					S2C_market_buy.read(obj_market_buy_action, bs);
					return obj_market_buy_action;
				case ProtocolsEnum.SMarketTradeLog:
					var obj_market_tradelog_action: S2C_market_tradelog = new S2C_market_tradelog();
					S2C_market_tradelog.read(obj_market_tradelog_action, bs);
					return obj_market_tradelog_action;
				case ProtocolsEnum.SMarketContainerBrowse:
					var obj_market_containerbrowse_action: S2C_market_containerbrowse = new S2C_market_containerbrowse();
					S2C_market_containerbrowse.read(obj_market_containerbrowse_action, bs);
					return obj_market_containerbrowse_action;
				case ProtocolsEnum.SMarketPetTips:
					var obj_market_pettips_action: S2C_market_pettips = new S2C_market_pettips();
					S2C_market_pettips.read(obj_market_pettips_action, bs);
					return obj_market_pettips_action;
				case ProtocolsEnum.SGetMarketUpPrice:
					var obj_get_marketupprice_action: S2C_get_marketupprice = new S2C_get_marketupprice();
					S2C_get_marketupprice.read(obj_get_marketupprice_action, bs);
					return obj_get_marketupprice_action;
				case ProtocolsEnum.SMarketUpSucc:
					var obj_market_upsucc_action: S2C_market_upsucc = new S2C_market_upsucc();
					S2C_market_upsucc.read(obj_market_upsucc_action, bs);
					return obj_market_upsucc_action;
				case ProtocolsEnum.SNotifyBuySuccess:
					var obj_notify_buysuccess_action: S2C_notify_buysuccess = new S2C_notify_buysuccess();
					S2C_notify_buysuccess.read(obj_notify_buysuccess_action, bs);
					return obj_notify_buysuccess_action;
				//ljm
				/*case ProtocolsEnum.SGMCheckRoleID :	//GM 检测的角色ID正确时，服务器回复 GM 角色ID检测的请求， 角色ID不正确，服务器只发送提示消息
					var obj_sgmcheck_roleid_action:S2C_sgmcheck_roleid = new S2C_sgmcheck_roleid();
					S2C_sgmcheck_roleid.read(obj_sgmcheck_roleid_action,bs);
					return obj_sgmcheck_roleid_action;
				case ProtocolsEnum.SCheckGM :	//GM帐号才回消息
					var obj_SCheck_GM_action:S2C_SCheck_GM = new S2C_SCheck_GM();
					S2C_SCheck_GM.read(obj_SCheck_GM_action,bs);
					return obj_SCheck_GM_action;*/
				case ProtocolsEnum.SHuobanList:  //<!-- huoban协议号从 32400 到32500 结束 -->
					var obj_SHuoban_List_action: S2C_SHuoban_List = new S2C_SHuoban_List();
					S2C_SHuoban_List.read(obj_SHuoban_List_action, bs);
					return obj_SHuoban_List_action;
				case ProtocolsEnum.SHuobanDetail:  //我的一个伙伴信息
					var obj_SHuoban_Detail_action: S2C_SHuoban_Detail = new S2C_SHuoban_Detail();
					S2C_SHuoban_Detail.read(obj_SHuoban_Detail_action, bs);
					return obj_SHuoban_Detail_action;
				case ProtocolsEnum.SZhenrongInfo:  //S2C_SZhenrong_Info
					var obj_SZhenrong_Info_action: S2C_SZhenrong_Info = new S2C_SZhenrong_Info();
					S2C_SZhenrong_Info.read(obj_SZhenrong_Info_action, bs);
					return obj_SZhenrong_Info_action;
				case ProtocolsEnum.SChangeZhenrong:  //伙伴解锁请求
					var obj_SChange_Zhenrong_action: S2C_SChange_Zhenrong = new S2C_SChange_Zhenrong();
					S2C_SChange_Zhenrong.read(obj_SChange_Zhenrong_action, bs);
					return obj_SChange_Zhenrong_action;
				case ProtocolsEnum.SActiveHuoBan:  //伙伴解锁返回
					var obj_SActive_HuoBan_action: S2C_SActive_HuoBan = new S2C_SActive_HuoBan();
					S2C_SActive_HuoBan.read(obj_SActive_HuoBan_action, bs);
					return obj_SActive_HuoBan_action;
				case ProtocolsEnum.SSwitchZhenfa:  //改变阵容的光环返回
					var obj_SSwitch_Zhenfa_action: S2C_SSwitch_Zhenfa = new S2C_SSwitch_Zhenfa();
					S2C_SSwitch_Zhenfa.read(obj_SSwitch_Zhenfa_action, bs);
					return obj_SSwitch_Zhenfa_action;/*
				case ProtocolsEnum.SGongHuiFuBenLastTime :  //S2C_SGongHuiFuBen_LastTime
					var obj_SGongHuiFuBen_LastTime_action:S2C_SGongHuiFuBen_LastTime = new S2C_SGongHuiFuBen_LastTime();
					S2C_SGongHuiFuBen_LastTime.read(obj_SGongHuiFuBen_LastTime_action,bs);
					return obj_SGongHuiFuBen_LastTime_action;
				case ProtocolsEnum.SBingFengLandInfo :  //S2C_SBingFeng_LandInfo
					var obj_SBingFeng_LandInfo_action:S2C_SBingFeng_LandInfo = new S2C_SBingFeng_LandInfo();
					S2C_SBingFeng_LandInfo.read(obj_SBingFeng_LandInfo_action,bs);
					return obj_SBingFeng_LandInfo_action;
				case ProtocolsEnum.SEnterBingFengLand :  //S2C_SEnter_BingFengLand
					var obj_SEnter_BingFengLand_action:S2C_SEnter_BingFengLand = new S2C_SEnter_BingFengLand();
					S2C_SEnter_BingFengLand.read(obj_SEnter_BingFengLand_action,bs);
					return obj_SEnter_BingFengLand_action;*/
				case ProtocolsEnum.SCanEnterBingFeng:  //S2C_SCanEnter_BingFeng
					var obj_SCanEnter_BingFeng_action: S2C_SCanEnter_BingFeng = new S2C_SCanEnter_BingFeng();
					S2C_SCanEnter_BingFeng.read(obj_SCanEnter_BingFeng_action, bs);
					return obj_SCanEnter_BingFeng_action;
				case ProtocolsEnum.SGetBingFengDetail:  //S2C_SGetBingFeng_Detail
					var obj_SGetBingFeng_Detail_action: S2C_SGetBingFeng_Detail = new S2C_SGetBingFeng_Detail();
					S2C_SGetBingFeng_Detail.read(obj_SGetBingFeng_Detail_action, bs);
					return obj_SGetBingFeng_Detail_action;
				case ProtocolsEnum.SItemNumChange:  //S2C_SItemNum_Change
					var obj_SItemNum_Change_action: S2C_SItemNum_Change = new S2C_SItemNum_Change();
					S2C_SItemNum_Change.read(obj_SItemNum_Change_action, bs);
					return obj_SItemNum_Change_action;
				case ProtocolsEnum.SDelItem:  //S2C_SDel_Item
					var obj_SDel_Item_action: S2C_SDel_Item = new S2C_SDel_Item();
					S2C_SDel_Item.read(obj_SDel_Item_action, bs);
					return obj_SDel_Item_action;
				case ProtocolsEnum.SGetPackInfo:  //S2C_SGetPack_Info
					var obj_SGetPack_Info_action: S2C_SGetPack_Info = new S2C_SGetPack_Info();
					S2C_SGetPack_Info.read(obj_SGetPack_Info_action, bs);
					return obj_SGetPack_Info_action;
				case ProtocolsEnum.SRefreshCurrency:  //S2C_SRefresh_Currency
					var obj_SRefresh_Currency_action: S2C_SRefresh_Currency = new S2C_SRefresh_Currency();
					S2C_SRefresh_Currency.read(obj_SRefresh_Currency_action, bs);
					return obj_SRefresh_Currency_action;
				case ProtocolsEnum.SRefreshPackSize:  //S2C_SRefreshPack_Size
					var obj_SRefreshPack_Size_action: S2C_SRefreshPack_Size = new S2C_SRefreshPack_Size();
					S2C_SRefreshPack_Size.read(obj_SRefreshPack_Size_action, bs);
					return obj_SRefreshPack_Size_action;
				case ProtocolsEnum.SPetEquipAddItem:  //S2C_SPetEquip_AddItem
					var obj_SPetEquip_AddItem_action: S2C_SPetEquip_AddItem = new S2C_SPetEquip_AddItem();
					S2C_SPetEquip_AddItem.read(obj_SPetEquip_AddItem_action, bs);
					return obj_SPetEquip_AddItem_action;
				case ProtocolsEnum.SGetDepotInfo:  //S2C_SGetDepot_Info
					var obj_SGetDepot_Info_action: S2C_SGetDepot_Info = new S2C_SGetDepot_Info();
					S2C_SGetDepot_Info.read(obj_SGetDepot_Info_action, bs);
					return obj_SGetDepot_Info_action;
				case ProtocolsEnum.SModifyDepotName:  //S2C_SModify_DepotName
					var obj_SModify_DepotName_action: S2C_SModify_DepotName = new S2C_SModify_DepotName();
					S2C_SModify_DepotName.read(obj_SModify_DepotName_action, bs);
					return obj_SModify_DepotName_action;
				case ProtocolsEnum.SAddItem:  //S2C_SAdd_Item
					var obj_SAdd_Item_action: S2C_SAdd_Item = new S2C_SAdd_Item();
					S2C_SAdd_Item.read(obj_SAdd_Item_action, bs);
					return obj_SAdd_Item_action;
				case ProtocolsEnum.SRefreshItemFlag:  //S2C_SRefresh_ItemFlag
					var obj_SRefresh_ItemFlag_action: S2C_SRefresh_ItemFlag = new S2C_SRefresh_ItemFlag();
					S2C_SRefresh_ItemFlag.read(obj_SRefresh_ItemFlag_action, bs);
					return obj_SRefresh_ItemFlag_action;
				/*case ProtocolsEnum.SRefreshItemTimeout :  //S2C_SRefreshItem_Timeout
					var obj_SRefreshItem_Timeout_action:S2C_SRefreshItem_Timeout = new S2C_SRefreshItem_Timeout();
					S2C_SRefreshItem_Timeout.read(obj_SRefreshItem_Timeout_action,bs);
					return obj_SRefreshItem_Timeout_action;
				case ProtocolsEnum.SItemPosChange :  //S2C_SItemPos_Change
					var obj_SItemPos_Change_action:S2C_SItemPos_Change = new S2C_SItemPos_Change();
					S2C_SItemPos_Change.read(obj_SItemPos_Change_action,bs);
					return obj_SItemPos_Change_action;*/

				/*case ProtocolsEnum.SGetItemTips :  //S2C_SGetItem_Tips
					S2C_SGetPack_Info.read(obj_SGetPack_Info_action,bs);
					return obj_SGetPack_Info_action;*/
				case ProtocolsEnum.SRefreshCurrency:  //S2C_SRefresh_Currency
					var obj_SRefresh_Currency_action: S2C_SRefresh_Currency = new S2C_SRefresh_Currency();
					S2C_SRefresh_Currency.read(obj_SRefresh_Currency_action, bs);
					return obj_SRefresh_Currency_action;
				case ProtocolsEnum.SGetItemTips:  //S2C_SGetItem_Tips
					var obj_SGetItem_Tips_action: S2C_SGetItem_Tips = new S2C_SGetItem_Tips();
					S2C_SGetItem_Tips.read(obj_SGetItem_Tips_action, bs);
					return obj_SGetItem_Tips_action;
				case ProtocolsEnum.SGetPetEquipTips:  //S2C_SGetPetEquip_Tips
					var obj_SGetPetEquip_Tips_action: S2C_SGetPetEquip_Tips = new S2C_SGetPetEquip_Tips();
					S2C_SGetPetEquip_Tips.read(obj_SGetPetEquip_Tips_action, bs);
					return obj_SGetPetEquip_Tips_action;
				/*
								case ProtocolsEnum.SCleanTempPack :  //S2C_SCleanTemp_Pack
									var obj_SCleanTemp_Pack_action:S2C_SCleanTemp_Pack = new S2C_SCleanTemp_Pack();
									S2C_SCleanTemp_Pack.read(obj_SCleanTemp_Pack_action,bs);
									return obj_SCleanTemp_Pack_action;*/
				case ProtocolsEnum.SRefreshNaiJiu:  //S2C_SRefresh_NaiJiu
					var obj_SRefresh_NaiJiu_action: S2C_SRefresh_NaiJiu = new S2C_SRefresh_NaiJiu();
					S2C_SRefresh_NaiJiu.read(obj_SRefresh_NaiJiu_action, bs);
					return obj_SRefresh_NaiJiu_action;
				case ProtocolsEnum.SRefreshMaxNaiJiu:  //S2C_SRefresh_MaxNaiJiu
					var obj_SRefresh_MaxNaiJiu_action: S2C_SRefresh_MaxNaiJiu = new S2C_SRefresh_MaxNaiJiu();
					S2C_SRefresh_MaxNaiJiu.read(obj_SRefresh_MaxNaiJiu_action, bs);
					return obj_SRefresh_MaxNaiJiu_action;
				case ProtocolsEnum.SXiuLiFailTimes:  //S2C_SXiuLiFail_Times
					var obj_SXiuLiFail_Times_action: S2C_SXiuLiFail_Times = new S2C_SXiuLiFail_Times();
					S2C_SXiuLiFail_Times.read(obj_SXiuLiFail_Times_action, bs);
					return obj_SXiuLiFail_Times_action;

				case ProtocolsEnum.SGetRoleEquip:  //S2C_SGetRole_Equip
					var obj_SGetRole_Equip_action: S2C_SGetRole_Equip = new S2C_SGetRole_Equip();
					S2C_SGetRole_Equip.read(obj_SGetRole_Equip_action, bs);
					return obj_SGetRole_Equip_action;

				case ProtocolsEnum.SPetEquipDelItem:  //S2C_SPetEquip_DelItem
					var obj_SPetEquip_DelItem_action: S2C_SPetEquip_DelItem = new S2C_SPetEquip_DelItem();
					S2C_SPetEquip_DelItem.read(obj_SPetEquip_DelItem_action, bs);
					return obj_SPetEquip_DelItem_action;
				/*case ProtocolsEnum.SItemSign :  //S2C_SItem_Sign
					var obj_SItem_Sign_action:S2C_SItem_Sign = new S2C_SItem_Sign();
					S2C_SItem_Sign.read(obj_SItem_Sign_action,bs);
					return obj_SItem_Sign_action;
				case ProtocolsEnum.SHeChengRet :  //S2C_SHeCheng_Ret
					var obj_SHeCheng_Ret_action:S2C_SHeCheng_Ret = new S2C_SHeCheng_Ret();
					S2C_SHeCheng_Ret.read(obj_SHeCheng_Ret_action,bs);
					return obj_SHeCheng_Ret_action;
				case ProtocolsEnum.SAllEquipScore :  //S2C_SAllEquip_Score
					var obj_SAllEquip_Score_action:S2C_SAllEquip_Score = new S2C_SAllEquip_Score();
					S2C_SAllEquip_Score.read(obj_SAllEquip_Score_action,bs);
					return obj_SAllEquip_Score_action;*/
				case ProtocolsEnum.SGetTimeAward:  //S2C_SGetTime_Award
					var obj_SGetTime_Award_action: S2C_SGetTime_Award = new S2C_SGetTime_Award();
					S2C_SGetTime_Award.read(obj_SGetTime_Award_action, bs);
					return obj_SGetTime_Award_action;
				/*case ProtocolsEnum.SGetEquipTips :  //S2C_SGetEquip_Tips
					var obj_SGetEquip_Tips_action:S2C_SGetEquip_Tips = new S2C_SGetEquip_Tips();
					S2C_SGetEquip_Tips.read(obj_SGetEquip_Tips_action,bs);
					return obj_SGetEquip_Tips_action;*/
				case ProtocolsEnum.SItemAdded:  //S2C_SItem_Added
					var obj_SItem_Added_action: S2C_SItem_Added = new S2C_SItem_Added();
					S2C_SItem_Added.read(obj_SItem_Added_action, bs);
					return obj_SItem_Added_action;
				case ProtocolsEnum.SHeChengItem:  //S2C_SHeCheng_Item
					var obj_SHeCheng_Item_action: S2C_SHeCheng_Item = new S2C_SHeCheng_Item();
					S2C_SHeCheng_Item.read(obj_SHeCheng_Item_action, bs);
					return obj_SHeCheng_Item_action;
				/*case ProtocolsEnum.SHeChengPetEquip:  //S2C_SHeChengPet_Equip
					var obj_SHeChengPet_Equip_action: S2C_SHeChengPet_Equip = new S2C_SHeChengPet_Equip();
					S2C_SHeChengPet_Equip.read(obj_SHeChengPet_Equip_action, bs);
					return obj_SHeChengPet_Equip_action;
				/*case ProtocolsEnum.SMailList :  //S2C_SMail_List
					var obj_SMail_List_action:S2C_SMail_List = new S2C_SMail_List();
					S2C_SMail_List.read(obj_SMail_List_action,bs);
					return obj_SMail_List_action;
				case ProtocolsEnum.SMailInfo :  //S2C_SMail_Info
					var obj_SMail_Info_action:S2C_SMail_Info = new S2C_SMail_Info();
					S2C_SMail_Info.read(obj_SMail_Info_action,bs);
					return obj_SMail_Info_action;
				case ProtocolsEnum.SMailState :  //S2C_SMail_State
					var obj_SMail_State_action:S2C_SMail_State = new S2C_SMail_State();
					S2C_SMail_State.read(obj_SMail_State_action,bs);
					return obj_SMail_State_action;
				case ProtocolsEnum.SGetRoleInfo :  //S2C_SGetRole_Info
					var obj_SGetRole_Info_action:S2C_SGetRole_Info = new S2C_SGetRole_Info();
					S2C_SGetRole_Info.read(obj_SGetRole_Info_action,bs);
					return obj_SGetRole_Info_action;
				case ProtocolsEnum.SNoticeRoleGetInfo :  //S2C_SNoticeRole_GetInfo
					var obj_SNoticeRole_GetInfo_action:S2C_SNoticeRole_GetInfo = new S2C_SNoticeRole_GetInfo();
					S2C_SNoticeRole_GetInfo.read(obj_SNoticeRole_GetInfo_action,bs);
					return obj_SNoticeRole_GetInfo_action;*/
				case ProtocolsEnum.SMulDayLogin:  //S2C_SMulDayLogin
					var obj_SMulDay_Login_action: S2C_SMulDayLogin = new S2C_SMulDayLogin();
					S2C_SMulDayLogin.read(obj_SMulDay_Login_action, bs);
					return obj_SMulDay_Login_action;
				/*case ProtocolsEnum.SOpenPack :  //S2C_SOpen_Pack
					var obj_SOpen_Pack_action:S2C_SOpen_Pack = new S2C_SOpen_Pack();
					S2C_SOpen_Pack.read(obj_SOpen_Pack_action,bs);
					return obj_SOpen_Pack_action;
				case ProtocolsEnum.SBuyPackMoney :  //S2C_SBuyPack_Money
					var obj_SBuyPack_Money_action:S2C_SBuyPack_Money = new S2C_SBuyPack_Money();
					S2C_SBuyPack_Money.read(obj_SBuyPack_Money_action,bs);
					return obj_SBuyPack_Money_action;
				case ProtocolsEnum.SFreshRepairData :  //S2C_SFreshRepair_Data
					var obj_SFreshRepair_Data_action:S2C_SFreshRepair_Data = new S2C_SFreshRepair_Data();
					S2C_SFreshRepair_Data.read(obj_SFreshRepair_Data_action,bs);
					return obj_SFreshRepair_Data_action;*/

				case ProtocolsEnum.SUseEnhancementItem:  //S2C_SUseEnhancement_Item
					var obj_SUseEnhancement_Item_action: S2C_SUseEnhancement_Item = new S2C_SUseEnhancement_Item();
					S2C_SUseEnhancement_Item.read(obj_SUseEnhancement_Item_action, bs);
					return obj_SUseEnhancement_Item_action;
				/*case ProtocolsEnum.SReplaceGem :  //S2C_SReplace_Gem
					var obj_SReplace_Gem_action:S2C_SReplace_Gem = new S2C_SReplace_Gem();
					S2C_SReplace_Gem.read(obj_SReplace_Gem_action,bs);
					return obj_SReplace_Gem_action;*/
				case ProtocolsEnum.SOtherItemTips:  //S2C_SOther_ItemTips
					var obj_SOther_ItemTips_action: S2C_SOther_ItemTips = new S2C_SOther_ItemTips();
					S2C_SOther_ItemTips.read(obj_SOther_ItemTips_action, bs);
					return obj_SOther_ItemTips_action;
				case ProtocolsEnum.SRepairResult:  //S2C_SRepair_Result
					var obj_SRepair_Result_action: S2C_SRepair_Result = new S2C_SRepair_Result();
					S2C_SRepair_Result.read(obj_SRepair_Result_action, bs);
					return obj_SRepair_Result_action;
				case ProtocolsEnum.SRideUpdate:  //S2C_SRide_Update
					var obj_SRide_Update_action: S2C_SRide_Update = new S2C_SRide_Update();
					S2C_SRide_Update.read(obj_SRide_Update_action, bs);
					return obj_SRide_Update_action;

				case ProtocolsEnum.SItemRecoverList:  //S2C_SItemRecover_List
					var obj_SItemRecover_List_action: S2C_SItemRecover_List = new S2C_SItemRecover_List();
					S2C_SItemRecover_List.read(obj_SItemRecover_List_action, bs);
					return obj_SItemRecover_List_action;
				case ProtocolsEnum.SItemRecover:  //S2C_SItem_Recover
					var obj_SItem_Recover_action: S2C_SItem_Recover = new S2C_SItem_Recover();
					S2C_SItem_Recover.read(obj_SItem_Recover_action, bs);
					return obj_SItem_Recover_action;
				case ProtocolsEnum.SRecoverItemInfo:  //S2C_SRecoverItem_Info
					var obj_SRecoverItem_Info_action: S2C_SRecoverItem_Info = new S2C_SRecoverItem_Info();
					S2C_SRecoverItem_Info.read(obj_SRecoverItem_Info_action, bs);
					return obj_SRecoverItem_Info_action;
				case ProtocolsEnum.SRefineEquipBase:  //S2C_SRefineEquip_Base
					var obj_SRefineEquip_Base_action: S2C_SRefineEquip_Base = new S2C_SRefineEquip_Base();
					S2C_SRefineEquip_Base.read(obj_SRefineEquip_Base_action, bs);
					return obj_SRefineEquip_Base_action;
				case ProtocolsEnum.SRefineEquipResult:  //S2C_SRefineEquip_Result
					var obj_SRefineEquip_Result_action: S2C_SRefineEquip_Result = new S2C_SRefineEquip_Result();
					S2C_SRefineEquip_Result.read(obj_SRefineEquip_Result_action, bs);
					return obj_SRefineEquip_Result_action;/*
				case ProtocolsEnum.SExpFactorEffect :  //S2C_SExpFactor_Effect
					var obj_SExpFactor_Effect_action:S2C_SExpFactor_Effect = new S2C_SExpFactor_Effect();
					S2C_SExpFactor_Effect.read(obj_SExpFactor_Effect_action,bs);
					return obj_SExpFactor_Effect_action;
				case ProtocolsEnum.SLockInfo :  //S2C_SLock_Info
					var obj_SLock_Info_action:S2C_SLock_Info = new S2C_SLock_Info();
					S2C_SLock_Info.read(obj_SLock_Info_action,bs);
					return obj_SLock_Info_action;
				case ProtocolsEnum.SNeedUnlock :  //S2C_SNeedUn_lock
					var obj_SNeedUn_lock_action:S2C_SNeedUn_lock = new S2C_SNeedUn_lock();
					S2C_SNeedUn_lock.read(obj_SNeedUn_lock_action,bs);
					return obj_SNeedUn_lock_action;
				case ProtocolsEnum.SAddLockSuc :  //S2C_SAddLock_Suc
					var obj_SAddLock_Suc_action:S2C_SAddLock_Suc = new S2C_SAddLock_Suc();
					S2C_SAddLock_Suc.read(obj_SAddLock_Suc_action,bs);
					return obj_SAddLock_Suc_action;
				case ProtocolsEnum.SUnlockSuc :  //S2C_SUnlock_Suc
					var obj_SUnlock_Suc_action:S2C_SUnlock_Suc = new S2C_SUnlock_Suc();
					S2C_SUnlock_Suc.read(obj_SUnlock_Suc_action,bs);
					return obj_SUnlock_Suc_action;
				case ProtocolsEnum.SCancelLockSuc :  //S2C_SCancelLock_Suc
					var obj_SCancelLock_Suc_action:S2C_SCancelLock_Suc = new S2C_SCancelLock_Suc();
					S2C_SCancelLock_Suc.read(obj_SCancelLock_Suc_action,bs);
					return obj_SCancelLock_Suc_action;
				case ProtocolsEnum.SForceUnlockSuc :  //S2C_SForceUnlock_Suc
					var obj_SForceUnlock_Suc_action:S2C_SForceUnlock_Suc = new S2C_SForceUnlock_Suc();
					S2C_SForceUnlock_Suc.read(obj_SForceUnlock_Suc_action,bs);
					return obj_SForceUnlock_Suc_action;
				case ProtocolsEnum.SChangePasswordSuc :  //S2C_SChangePassword_Suc
					var obj_SChangePassword_Suc_action:S2C_SChangePassword_Suc = new S2C_SChangePassword_Suc();
					S2C_SChangePassword_Suc.read(obj_SChangePassword_Suc_action,bs);
					return obj_SChangePassword_Suc_action;
				case ProtocolsEnum.SUpdateLockInfo :  //S2C_SUpdateLock_Info
					var obj_SUpdateLock_Info_action:S2C_SUpdateLock_Info = new S2C_SUpdateLock_Info();
					S2C_SUpdateLock_Info.read(obj_SUpdateLock_Info_action,bs);
					return obj_SUpdateLock_Info_action;
				case ProtocolsEnum.SRegMaster :  //S2C_SReg_Master
					var obj_SReg_Master_action:S2C_SReg_Master = new S2C_SReg_Master();
					S2C_SReg_Master.read(obj_SReg_Master_action,bs);
					return obj_SReg_Master_action;
				case ProtocolsEnum.SReadyRegMaster :  //S2C_SReadyReg_Master
					var obj_SReadyReg_Master_action:S2C_SReadyReg_Master = new S2C_SReadyReg_Master();
					S2C_SReadyReg_Master.read(obj_SReadyReg_Master_action,bs);
					return obj_SReadyReg_Master_action;
				case ProtocolsEnum.SSearchMaster :  //S2C_SSearch_Master
					var obj_SSearch_Master_action:S2C_SSearch_Master = new S2C_SSearch_Master();
					S2C_SSearch_Master.read(obj_SSearch_Master_action,bs);
					return obj_SSearch_Master_action;
				case ProtocolsEnum.SRequestAsApprentice :  //S2C_SRequestAs_Apprentice
					var obj_SRequestAs_Apprentice_action:S2C_SRequestAs_Apprentice = new S2C_SRequestAs_Apprentice();
					S2C_SRequestAs_Apprentice.read(obj_SRequestAs_Apprentice_action,bs);
					return obj_SRequestAs_Apprentice_action;
				case ProtocolsEnum.SRequestPrenticeSuccess :  //S2C_SRequestPrentice_Success
					var obj_SRequestPrentice_Success_action:S2C_SRequestPrentice_Success = new S2C_SRequestPrentice_Success();
					S2C_SRequestPrentice_Success.read(obj_SRequestPrentice_Success_action,bs);
					return obj_SRequestPrentice_Success_action;
				case ProtocolsEnum.SCanAcceptPrentice :  //S2C_SCanAccept_Prentice
					var obj_SCanAccept_Prentice_action:S2C_SCanAccept_Prentice = new S2C_SCanAccept_Prentice();
					S2C_SCanAccept_Prentice.read(obj_SCanAccept_Prentice_action,bs);
					return obj_SCanAccept_Prentice_action;
				case ProtocolsEnum.SSearchPrentice :  //S2C_SSearch_Prentice
					var obj_SSearch_Prentice_action:S2C_SSearch_Prentice = new S2C_SSearch_Prentice();
					S2C_SSearch_Prentice.read(obj_SSearch_Prentice_action,bs);
					return obj_SSearch_Prentice_action;
				case ProtocolsEnum.SMasterPrenticeData :  //S2C_SMasterPrentice_Data
					var obj_SMasterPrentice_Data_action:S2C_SMasterPrentice_Data = new S2C_SMasterPrentice_Data();
					S2C_SMasterPrentice_Data.read(obj_SMasterPrentice_Data_action,bs);
					return obj_SMasterPrentice_Data_action;*/


				//wangf
				case ProtocolsEnum.SClanLevelup:	//返回公会级别信息变化
					var obj_SClanLevelup_action: S2C_SClanLevelup = new S2C_SClanLevelup();
					S2C_SClanLevelup.read(obj_SClanLevelup_action, bs);
					return obj_SClanLevelup_action;

				case ProtocolsEnum.SGrabBonus:	//领取分红
					var obj_SGrabBonus_action: S2C_SGrabBonus = new S2C_SGrabBonus();
					S2C_SGrabBonus.read(obj_SGrabBonus_action, bs);
					return obj_SGrabBonus_action;

				case ProtocolsEnum.SBonusQuery:	//查询分红结果
					var obj_SBonusQuery_action: S2C_SBonusQuery = new S2C_SBonusQuery();
					S2C_SBonusQuery.read(obj_SBonusQuery_action, bs);
					return obj_SBonusQuery_action;

				case ProtocolsEnum.SAcceptApply:	//服务器返回接受申请人员
					var obj_SAcceptApply_action: S2C_SAcceptApply = new S2C_SAcceptApply();
					S2C_SAcceptApply.read(obj_SAcceptApply_action, bs);
					return obj_SAcceptApply_action;

				case ProtocolsEnum.SClanAim:	//服务端返回公会宗旨
					var obj_SClanAim_action: S2C_SClanAim = new S2C_SClanAim();
					S2C_SClanAim.read(obj_SClanAim_action, bs);
					return obj_SClanAim_action;

				case ProtocolsEnum.SChangeClanName:	//服务端返回公会名字
					var obj_SChangeClanName_action: S2C_SChangeClanName = new S2C_SChangeClanName();
					S2C_SChangeClanName.read(obj_SChangeClanName_action, bs);
					return obj_SChangeClanName_action;

				case ProtocolsEnum.SSearchClan:	//返回搜索公会
					var obj_SSearchClan_action: S2C_SSearchClan = new S2C_SSearchClan();
					S2C_SSearchClan.read(obj_SSearchClan_action, bs);
					return obj_SSearchClan_action;

				case ProtocolsEnum.SBannedtalk:	//禁言
					var obj_SBannedtalk_action: S2C_SBannedtalk = new S2C_SBannedtalk();
					S2C_SBannedtalk.read(obj_SBannedtalk_action, bs);
					return obj_SBannedtalk_action;

				case ProtocolsEnum.SRefreshMemberList:	//返回成员列表
					var obj_SRefreshMemberList_action: S2C_SRefreshMemberList = new S2C_SRefreshMemberList();
					S2C_SRefreshMemberList.read(obj_SRefreshMemberList_action, bs);
					return obj_SRefreshMemberList_action;

				case ProtocolsEnum.SApplyClanList:	//返回申请过的公会列表
					var obj_SApplyClanList_action: S2C_SApplyClanList = new S2C_SApplyClanList();
					S2C_SApplyClanList.read(obj_SApplyClanList_action, bs);
					return obj_SApplyClanList_action;

				case ProtocolsEnum.SCancelApplyClan:	//取消申请公会
					var obj_SCancelApplyClan_action: S2C_SCancelApplyClan = new S2C_SCancelApplyClan();
					S2C_SCancelApplyClan.read(obj_SCancelApplyClan_action, bs);
					return obj_SCancelApplyClan_action;

				/*case ProtocolsEnum.SRefreshContribution :	//更新个人帮贡信息
					var obj_SRefreshContribution_action:S2C_SRefreshContribution = new S2C_SRefreshContribution();
					S2C_SRefreshContribution.read(obj_SRefreshContribution_action,bs);
					return obj_SRefreshContribution_action;*/

				case ProtocolsEnum.SOpenAutoJoinClan:	//是否开启自动接收入会
					var obj_SOpenAutoJoinClan_action: S2C_SOpenAutoJoinClan = new S2C_SOpenAutoJoinClan();
					S2C_SOpenAutoJoinClan.read(obj_SOpenAutoJoinClan_action, bs);
					return obj_SOpenAutoJoinClan_action;

				case ProtocolsEnum.SRequestEventInfo:	//返回公会事件信息
					var obj_SRequestEventInfo_action: S2C_SRequestEventInfo = new S2C_SRequestEventInfo();
					S2C_SRequestEventInfo.read(obj_SRequestEventInfo_action, bs);
					return obj_SRequestEventInfo_action;

				/*case ProtocolsEnum.SRequestRoleInfo :	//返回公会事件详情信息
					var obj_SRequestRoleInfo_action:S2C_SRequestRoleInfo = new S2C_SRequestRoleInfo();
					S2C_SRequestRoleInfo.read(obj_SRequestRoleInfo_action,bs);
					return obj_SRequestRoleInfo_action;*/

				case ProtocolsEnum.SBuyMedic:	//返回购买药房的药品
					var obj_SBuyMedic_action: S2C_SBuyMedic = new S2C_SBuyMedic();
					S2C_SBuyMedic.read(obj_SBuyMedic_action, bs);
					return obj_SBuyMedic_action;

				case ProtocolsEnum.SRequestSelectType:	//返回修改产药倍数
					var obj_SRequestSelectType_action: S2C_SRequestSelectType = new S2C_SRequestSelectType();
					S2C_SRequestSelectType.read(obj_SRequestSelectType_action, bs);
					return obj_SRequestSelectType_action;

				case ProtocolsEnum.SRequestRuneInfo:	//返回请求符文请求信息
					var obj_SRequestRuneInfo_action: S2C_SRequestRuneInfo = new S2C_SRequestRuneInfo();
					S2C_SRequestRuneInfo.read(obj_SRequestRuneInfo_action, bs);
					return obj_SRequestRuneInfo_action;

				/*case ProtocolsEnum.SRuneGive :	//返回捐献符文
					var obj_SRuneGive_action:S2C_SRuneGive = new S2C_SRuneGive();
					S2C_SRuneGive.read(obj_SRuneGive_action,bs);
					return obj_SRuneGive_action;*/

				case ProtocolsEnum.SRuneRequest:	//请求符文
					var obj_SRuneRequest_action: S2C_SRuneRequest = new S2C_SRuneRequest();
					S2C_SRuneRequest.read(obj_SRuneRequest_action, bs);
					return obj_SRuneRequest_action;

				case ProtocolsEnum.SRequestRuneCount:	//返回请求符文统计
					var obj_SRequestRuneCount_action: S2C_SRequestRuneCount = new S2C_SRequestRuneCount();
					S2C_SRequestRuneCount.read(obj_SRequestRuneCount_action, bs);
					return obj_SRequestRuneCount_action;

				case ProtocolsEnum.SRuneRequestView:	//返回请求符文界面
					var obj_SRuneRequestView_action: S2C_SRuneRequestView = new S2C_SRuneRequestView();
					S2C_SRuneRequestView.read(obj_SRuneRequestView_action, bs);
					return obj_SRuneRequestView_action;

				case ProtocolsEnum.SClanRedTip:	//通知客户端红点信息  value=0 没有红点  value=1有红点
					var obj_SClanRedTip_action: S2C_SClanRedTip = new S2C_SClanRedTip();
					S2C_SClanRedTip.read(obj_SClanRedTip_action, bs);
					return obj_SClanRedTip_action;

				case ProtocolsEnum.SRefreshRoleClan:	//服务器返回该玩家是否有公会
					var obj_SRefreshRoleClan_action: S2C_SRefreshRoleClan = new S2C_SRefreshRoleClan();
					S2C_SRefreshRoleClan.read(obj_SRefreshRoleClan_action, bs);
					return obj_SRefreshRoleClan_action;

				case ProtocolsEnum.SClanInvitationView:	//客户端请求邀请界面
					var obj_SClanInvitationView_action: S2C_SClanInvitationView = new S2C_SClanInvitationView();
					S2C_SClanInvitationView.read(obj_SClanInvitationView_action, bs);
					return obj_SClanInvitationView_action;

				case ProtocolsEnum.SRequestSearchRole:	//搜索好成功
					var obj_SRequestSearchRole_action: S2C_SRequestSearchRole = new S2C_SRequestSearchRole();
					S2C_SRequestSearchRole.read(obj_SRequestSearchRole_action, bs);
					return obj_SRequestSearchRole_action;

				case ProtocolsEnum.SChangeClanInst:	//改变公会副本成功
					var obj_SChangeClanInst_action: S2C_SChangeClanInst = new S2C_SChangeClanInst();
					S2C_SChangeClanInst.read(obj_SChangeClanInst_action, bs);
					return obj_SChangeClanInst_action;

				case ProtocolsEnum.SRequestImpeachMentView:	//返回发起界面
					var obj_SRequestImpeachMentView_action: S2C_SRequestImpeachMentView = new S2C_SRequestImpeachMentView();
					S2C_SRequestImpeachMentView.read(obj_SRequestImpeachMentView_action, bs);
					return obj_SRequestImpeachMentView_action;

				case ProtocolsEnum.SGetClanFightList:	//返回对战列表
					var obj_SGetClanFightList_action: S2C_SGetClanFightList = new S2C_SGetClanFightList();
					S2C_SGetClanFightList.read(obj_SGetClanFightList_action, bs);
					return obj_SGetClanFightList_action;

				/*case ProtocolsEnum.SBattleFieldScore :	//公会战时统计
					var obj_SBattleFieldScore_action:S2C_SBattleFieldScore = new S2C_SBattleFieldScore();
					S2C_SBattleFieldScore.read(obj_SBattleFieldScore_action,bs);
					return obj_SBattleFieldScore_action;

				case ProtocolsEnum.SBattleFieldAct :	//公会战时统计
					var obj_SBattleFieldAct_action:S2C_SBattleFieldAct = new S2C_SBattleFieldAct();
					S2C_SBattleFieldAct.read(obj_SBattleFieldAct_action,bs);
					return obj_SBattleFieldAct_action;

				case ProtocolsEnum.SBattleFieldRankList :	//公会战时统计
					var obj_SBattleFieldRankList_action:S2C_SBattleFieldRankList = new S2C_SBattleFieldRankList();
					S2C_SBattleFieldRankList.read(obj_SBattleFieldRankList_action,bs);
					return obj_SBattleFieldRankList_action;

				case ProtocolsEnum.SBattleFieldInfo :	//公会战时信息
					var obj_SBattleFieldInfo_action:S2C_SBattleFieldInfo = new S2C_SBattleFieldInfo();
					S2C_SBattleFieldInfo.read(obj_SBattleFieldInfo_action,bs);
					return obj_SBattleFieldInfo_action;

				case ProtocolsEnum.SRequestRoleIsEnemy :	//请求是否是敌对
					var obj_SRequestRoleIsEnemy_action:S2C_SRequestRoleIsEnemy = new S2C_SRequestRoleIsEnemy();
					S2C_SRequestRoleIsEnemy.read(obj_SRequestRoleIsEnemy_action,bs);
					return obj_SRequestRoleIsEnemy_action;

				case ProtocolsEnum.SClanFightOver :	//战场结束
					var obj_SClanFightOver_action:S2C_SClanFightOver = new S2C_SClanFightOver();
					S2C_SClanFightOver.read(obj_SClanFightOver_action,bs);
					return obj_SClanFightOver_action;

				case ProtocolsEnum.SLeaveBattleField :	//离开战场
					var obj_SLeaveBattleField_action:S2C_SLeaveBattleField = new S2C_SLeaveBattleField();
					S2C_SLeaveBattleField.read(obj_SLeaveBattleField_action,bs);
					return obj_SLeaveBattleField_action;*/

				case ProtocolsEnum.SGetClearTime:	//得到下次清零时间
					var obj_SGetClearTime_action: S2C_SGetClearTime = new S2C_SGetClearTime();
					S2C_SGetClearTime.read(obj_SGetClearTime_action, bs);
					return obj_SGetClearTime_action;

				/*case ProtocolsEnum.SendRoleInfo :	//<!--  跨服和原服之间的协议  start  协议号从25000 协议号从25499 -->
					var obj_SendRoleInfo_action:S2C_SendRoleInfo = new S2C_SendRoleInfo();
					S2C_SendRoleInfo.read(obj_SendRoleInfo_action,bs);
					return obj_SendRoleInfo_action;

				case ProtocolsEnum.SendRoleInfo_Rep :	
					var obj_SendRoleInfo_Rep_action:S2C_SendRoleInfo_Rep = new S2C_SendRoleInfo_Rep();
					S2C_SendRoleInfo_Rep.read(obj_SendRoleInfo_Rep_action,bs);
					return obj_SendRoleInfo_Rep_action;

				case ProtocolsEnum.SendRoleData :	
					var obj_SendRoleData_action:S2C_SendRoleData = new S2C_SendRoleData();
					S2C_SendRoleData.read(obj_SendRoleData_action,bs);
					return obj_SendRoleData_action;

				case ProtocolsEnum.SendWordMsg :	
					var obj_SendWordMsg_action:S2C_SendWordMsg = new S2C_SendWordMsg();
					S2C_SendWordMsg.read(obj_SendWordMsg_action,bs);
					return obj_SendWordMsg_action;

				case ProtocolsEnum.SCReqCrosserInfo :	
					var obj_SCReqCrosserInfo_action:S2C_SCReqCrosserInfo = new S2C_SCReqCrosserInfo();
					S2C_SCReqCrosserInfo.read(obj_SCReqCrosserInfo_action,bs);
					return obj_SCReqCrosserInfo_action;

				case ProtocolsEnum.SCCreateRoom :	
					var obj_SCCreateRoom_action:S2C_SCCreateRoom = new S2C_SCCreateRoom();
					S2C_SCCreateRoom.read(obj_SCCreateRoom_action,bs);
					return obj_SCCreateRoom_action;

				case ProtocolsEnum.SCReqRoomInfos :	
					var obj_SCReqRoomInfos_action:S2C_SCReqRoomInfos = new S2C_SCReqRoomInfos();
					S2C_SCReqRoomInfos.read(obj_SCReqRoomInfos_action,bs);
					return obj_SCReqRoomInfos_action;

				case ProtocolsEnum.SCLeaveRoom :	
					var obj_SCLeaveRoom_action:S2C_SCLeaveRoom = new S2C_SCLeaveRoom();
					S2C_SCLeaveRoom.read(obj_SCLeaveRoom_action,bs);
					return obj_SCLeaveRoom_action;

				case ProtocolsEnum.SCStandCross :	
					var obj_SCStandCross_action:S2C_SCStandCross = new S2C_SCStandCross();
					S2C_SCStandCross.read(obj_SCStandCross_action,bs);
					return obj_SCStandCross_action;

				case ProtocolsEnum.SCEnterRoom :	
					var obj_SCEnterRoom_action:S2C_SCEnterRoom = new S2C_SCEnterRoom();
					S2C_SCEnterRoom.read(obj_SCEnterRoom_action,bs);
					return obj_SCEnterRoom_action;

				case ProtocolsEnum.SCRoomStand :	
					var obj_SCRoomStand_action:S2C_SCRoomStand = new S2C_SCRoomStand();
					S2C_SCRoomStand.read(obj_SCRoomStand_action,bs);
					return obj_SCRoomStand_action;

				case ProtocolsEnum.SCReqRoomInfo :	
					var obj_SCReqRoomInfo_action:S2C_SCReqRoomInfo = new S2C_SCReqRoomInfo();
					S2C_SCReqRoomInfo.read(obj_SCReqRoomInfo_action,bs);
					return obj_SCReqRoomInfo_action;

				case ProtocolsEnum.SCChangeCrosserForm :	
					var obj_SCChangeCrosserForm_action:S2C_SCChangeCrosserForm = new S2C_SCChangeCrosserForm();
					S2C_SCChangeCrosserForm.read(obj_SCChangeCrosserForm_action,bs);
					return obj_SCChangeCrosserForm_action;

				case ProtocolsEnum.SCChangeRoomPwd :	
					var obj_SCChangeRoomPwd_action:S2C_SCChangeRoomPwd = new S2C_SCChangeRoomPwd();
					S2C_SCChangeRoomPwd.read(obj_SCChangeRoomPwd_action,bs);
					return obj_SCChangeRoomPwd_action;

				case ProtocolsEnum.SCModifyCrossMoney :	
					var obj_SCModifyCrossMoney_action:S2C_SCModifyCrossMoney = new S2C_SCModifyCrossMoney();
					S2C_SCModifyCrossMoney.read(obj_SCModifyCrossMoney_action,bs);
					return obj_SCModifyCrossMoney_action;

				case ProtocolsEnum.SCEndCross :	
					var obj_SCEndCross_action:S2C_SCEndCross = new S2C_SCEndCross();
					S2C_SCEndCross.read(obj_SCEndCross_action,bs);
					return obj_SCEndCross_action;

				case ProtocolsEnum.SCReqTTBonus :	
					var obj_SCReqTTBonus_action:S2C_SCReqTTBonus = new S2C_SCReqTTBonus();
					S2C_SCReqTTBonus.read(obj_SCReqTTBonus_action,bs);
					return obj_SCReqTTBonus_action;

				case ProtocolsEnum.SCResultTTBonus :	
					var obj_SCResultTTBonus_action:S2C_SCResultTTBonus = new S2C_SCResultTTBonus();
					S2C_SCResultTTBonus.read(obj_SCResultTTBonus_action,bs);
					return obj_SCResultTTBonus_action;

				case ProtocolsEnum.SCInvitJoinRoom :	
					var obj_SCInvitJoinRoom_action:S2C_SCInvitJoinRoom = new S2C_SCInvitJoinRoom();
					S2C_SCInvitJoinRoom.read(obj_SCInvitJoinRoom_action,bs);
					return obj_SCInvitJoinRoom_action;

				case ProtocolsEnum.SCReqCrossRankList :	
					var obj_SCReqCrossRankList_action:S2C_SCReqCrossRankList = new S2C_SCReqCrossRankList();
					S2C_SCReqCrossRankList.read(obj_SCReqCrossRankList_action,bs);
					return obj_SCReqCrossRankList_action;

				case ProtocolsEnum.SCKickoffRoom :	
					var obj_SCKickoffRoom_action:S2C_SCKickoffRoom = new S2C_SCKickoffRoom();
					S2C_SCKickoffRoom.read(obj_SCKickoffRoom_action,bs);
					return obj_SCKickoffRoom_action;

				case ProtocolsEnum.SCAddCrossIntegral :	
					var obj_SCAddCrossIntegral_action:S2C_SCAddCrossIntegral = new S2C_SCAddCrossIntegral();
					S2C_SCAddCrossIntegral.read(obj_SCAddCrossIntegral_action,bs);
					return obj_SCAddCrossIntegral_action;

				case ProtocolsEnum.SCCrossLvUp :	
					var obj_SCCrossLvUp_action:S2C_SCCrossLvUp = new S2C_SCCrossLvUp();
					S2C_SCCrossLvUp.read(obj_SCCrossLvUp_action,bs);
					return obj_SCCrossLvUp_action;

				case ProtocolsEnum.SCSetRoomOwner :	
					var obj_SCSetRoomOwner_action:S2C_SCSetRoomOwner = new S2C_SCSetRoomOwner();
					S2C_SCSetRoomOwner.read(obj_SCSetRoomOwner_action,bs);
					return obj_SCSetRoomOwner_action;

				case ProtocolsEnum.SCSwapRoomMember :	
					var obj_SCSwapRoomMember_action:S2C_SCSwapRoomMember = new S2C_SCSwapRoomMember();
					S2C_SCSwapRoomMember.read(obj_SCSwapRoomMember_action,bs);
					return obj_SCSwapRoomMember_action;

				case ProtocolsEnum.SBeginCorssServer :	
					var obj_SBeginCorssServer_action:S2C_SBeginCorssServer = new S2C_SBeginCorssServer();
					S2C_SBeginCorssServer.read(obj_SBeginCorssServer_action,bs);
					return obj_SBeginCorssServer_action;

				case ProtocolsEnum.SSendCrosserInfo :	
					var obj_SSendCrosserInfo_action:S2C_SSendCrosserInfo = new S2C_SSendCrosserInfo();
					S2C_SSendCrosserInfo.read(obj_SSendCrosserInfo_action,bs);
					return obj_SSendCrosserInfo_action;

				case ProtocolsEnum.SSendRoomInfos :	
					var obj_SSendRoomInfos_action:S2C_SSendRoomInfos = new S2C_SSendRoomInfos();
					S2C_SSendRoomInfos.read(obj_SSendRoomInfos_action,bs);
					return obj_SSendRoomInfos_action;

				case ProtocolsEnum.SUpdataRoomInfo :	
					var obj_SUpdataRoomInfo_action:S2C_SUpdataRoomInfo = new S2C_SUpdataRoomInfo();
					S2C_SUpdataRoomInfo.read(obj_SUpdataRoomInfo_action,bs);
					return obj_SUpdataRoomInfo_action;

				case ProtocolsEnum.SLeaveRoom :	
					var obj_SLeaveRoom_action:S2C_SLeaveRoom = new S2C_SLeaveRoom();
					S2C_SLeaveRoom.read(obj_SLeaveRoom_action,bs);
					return obj_SLeaveRoom_action;

				case ProtocolsEnum.SStandCross :	
					var obj_SStandCross_action:S2C_SStandCross = new S2C_SStandCross();
					S2C_SStandCross.read(obj_SStandCross_action,bs);
					return obj_SStandCross_action;

				case ProtocolsEnum.SNotifyMsg :	
					var obj_SNotifyMsg_action:S2C_SNotifyMsg = new S2C_SNotifyMsg();
					S2C_SNotifyMsg.read(obj_SNotifyMsg_action,bs);
					return obj_SNotifyMsg_action;

				case ProtocolsEnum.SRoomStand :	
					var obj_SRoomStand_action:S2C_SRoomStand = new S2C_SRoomStand();
					S2C_SRoomStand.read(obj_SRoomStand_action,bs);
					return obj_SRoomStand_action;

				case ProtocolsEnum.SCrossBattleInfo :	
					var obj_SCrossBattleInfo_action:S2C_SCrossBattleInfo = new S2C_SCrossBattleInfo();
					S2C_SCrossBattleInfo.read(obj_SCrossBattleInfo_action,bs);
					return obj_SCrossBattleInfo_action;

				case ProtocolsEnum.SCrossBattleMemberState :	
					var obj_SCrossBattleMemberState_action:S2C_SCrossBattleMemberState = new S2C_SCrossBattleMemberState();
					S2C_SCrossBattleMemberState.read(obj_SCrossBattleMemberState_action,bs);
					return obj_SCrossBattleMemberState_action;

				case ProtocolsEnum.SCrossBattleResult :	
					var obj_SCrossBattleResult_action:S2C_SCrossBattleResult = new S2C_SCrossBattleResult();
					S2C_SCrossBattleResult.read(obj_SCrossBattleResult_action,bs);
					return obj_SCrossBattleResult_action;

				case ProtocolsEnum.SChangeCrosserForm :	
					var obj_SChangeCrosserForm_action:S2C_SChangeCrosserForm = new S2C_SChangeCrosserForm();
					S2C_SChangeCrosserForm.read(obj_SChangeCrosserForm_action,bs);
					return obj_SChangeCrosserForm_action;

				case ProtocolsEnum.SResultTTBonus :	
					var obj_SResultTTBonus_action:S2C_SResultTTBonus = new S2C_SResultTTBonus();
					S2C_SResultTTBonus.read(obj_SResultTTBonus_action,bs);
					return obj_SResultTTBonus_action;

				case ProtocolsEnum.SInvitJoinRoom :	
					var obj_SInvitJoinRoom_action:S2C_SInvitJoinRoom = new S2C_SInvitJoinRoom();
					S2C_SInvitJoinRoom.read(obj_SInvitJoinRoom_action,bs);
					return obj_SInvitJoinRoom_action;

				case ProtocolsEnum.SReqCrossRankList :	
					var obj_SReqCrossRankList_action:S2C_SReqCrossRankList = new S2C_SReqCrossRankList();
					S2C_SReqCrossRankList.read(obj_SReqCrossRankList_action,bs);
					return obj_SReqCrossRankList_action;

				case ProtocolsEnum.SKickoffRoom :	
					var obj_SKickoffRoom_action:S2C_SKickoffRoom = new S2C_SKickoffRoom();
					S2C_SKickoffRoom.read(obj_SKickoffRoom_action,bs);
					return obj_SKickoffRoom_action;

				case ProtocolsEnum.SEnterLeaveHell :	
					var obj_SEnterLeaveHell_action:S2C_SEnterLeaveHell = new S2C_SEnterLeaveHell();
					S2C_SEnterLeaveHell.read(obj_SEnterLeaveHell_action,bs);
					return obj_SEnterLeaveHell_action;

				case ProtocolsEnum.SSwapRoomMember :	
					var obj_SSwapRoomMember_action:S2C_SSwapRoomMember = new S2C_SSwapRoomMember();
					S2C_SSwapRoomMember.read(obj_SSwapRoomMember_action,bs);
					return obj_SSwapRoomMember_action;

				case ProtocolsEnum.SEndCross :	
					var obj_SEndCross_action:S2C_SEndCross = new S2C_SEndCross();
					S2C_SEndCross.read(obj_SEndCross_action,bs);
					return obj_SEndCross_action;

				case ProtocolsEnum.SFriendsInfoInit :	
					var obj_SFriendsInfoInit_action:S2C_SFriendsInfoInit = new S2C_SFriendsInfoInit();
					S2C_SFriendsInfoInit.read(obj_SFriendsInfoInit_action,bs);
					return obj_SFriendsInfoInit_action;*/

				case ProtocolsEnum.SFriendsOnline:
					var obj_SFriendsOnline_action: S2C_SFriendsOnline = new S2C_SFriendsOnline();
					S2C_SFriendsOnline.read(obj_SFriendsOnline_action, bs);
					return obj_SFriendsOnline_action;

				/*case ProtocolsEnum.SFriendMessageToRole :	
					var obj_SFriendMessageToRole_action:S2C_SFriendMessageToRole = new S2C_SFriendMessageToRole();
					S2C_SFriendMessageToRole.read(obj_SFriendMessageToRole_action,bs);
					return obj_SFriendMessageToRole_action;

				case ProtocolsEnum.SStrangerMessageToRole :	
					var obj_SStrangerMessageToRole_action:S2C_SStrangerMessageToRole = new S2C_SStrangerMessageToRole();
					S2C_SStrangerMessageToRole.read(obj_SStrangerMessageToRole_action,bs);
					return obj_SStrangerMessageToRole_action;

				case ProtocolsEnum.SOffLineMsgMessageToRole :	
					var obj_SOffLineMsgMessageToRole_action:S2C_SOffLineMsgMessageToRole = new S2C_SOffLineMsgMessageToRole();
					S2C_SOffLineMsgMessageToRole.read(obj_SOffLineMsgMessageToRole_action,bs);
					return obj_SOffLineMsgMessageToRole_action;

				case ProtocolsEnum.SBreakOffRelation :	
					var obj_SBreakOffRelation_action:S2C_SBreakOffRelation = new S2C_SBreakOffRelation();
					S2C_SBreakOffRelation.read(obj_SBreakOffRelation_action,bs);
					return obj_SBreakOffRelation_action;

				case ProtocolsEnum.SAddFriend :	
					var obj_SAddFriend_action:S2C_SAddFriend = new S2C_SAddFriend();
					S2C_SAddFriend.read(obj_SAddFriend_action,bs);
					return obj_SAddFriend_action;

				case ProtocolsEnum.SChangeBaseConfig :	
					var obj_SChangeBaseConfig_action:S2C_SChangeBaseConfig = new S2C_SChangeBaseConfig();
					S2C_SChangeBaseConfig.read(obj_SChangeBaseConfig_action,bs);
					return obj_SChangeBaseConfig_action;

				case ProtocolsEnum.SRequestUpdateRoleInfo:
					var obj_SRequestUpdateRoleInfo_action: S2C_SRequestUpdateRoleInfo = new S2C_SRequestUpdateRoleInfo();
					S2C_SRequestUpdateRoleInfo.read(obj_SRequestUpdateRoleInfo_action, bs);
					return obj_SRequestUpdateRoleInfo_action;

				case ProtocolsEnum.SRequestSpaceRoleInfo :	
					var obj_SRequestSpaceRoleInfo_action:S2C_SRequestSpaceRoleInfo = new S2C_SRequestSpaceRoleInfo();
					S2C_SRequestSpaceRoleInfo.read(obj_SRequestSpaceRoleInfo_action,bs);
					return obj_SRequestSpaceRoleInfo_action;

				case ProtocolsEnum.SUpdateFriendLevel :	
					var obj_SUpdateFriendLevel_action:S2C_SUpdateFriendLevel = new S2C_SUpdateFriendLevel();
					S2C_SUpdateFriendLevel.read(obj_SUpdateFriendLevel_action,bs);
					return obj_SUpdateFriendLevel_action;

				case ProtocolsEnum.SSendSystemMessageToRole :	// 聊天S-->C
					var obj_SSendSystemMessageToRole_action:S2C_SSendSystemMessageToRole = new S2C_SSendSystemMessageToRole();
					S2C_SSendSystemMessageToRole.read(obj_SSendSystemMessageToRole_action,bs);
					return obj_SSendSystemMessageToRole_action;

				case ProtocolsEnum.SJionCamp :	//加入阵营
					var obj_SJionCamp_action:S2C_SJionCamp = new S2C_SJionCamp();
					S2C_SJionCamp.read(obj_SJionCamp_action,bs);
					return obj_SJionCamp_action;

				case ProtocolsEnum.SSearchFriend :	//搜索好友成功S->C
					var obj_SSearchFriend_action:S2C_SSearchFriend = new S2C_SSearchFriend();
					S2C_SSearchFriend.read(obj_SSearchFriend_action,bs);
					return obj_SSearchFriend_action;

				case ProtocolsEnum.SUpdateFriendState :	
					var obj_SUpdateFriendState_action:S2C_SUpdateFriendState = new S2C_SUpdateFriendState();
					S2C_SUpdateFriendState.read(obj_SUpdateFriendState_action,bs);
					return obj_SUpdateFriendState_action;

				case ProtocolsEnum.SRecommendFriend :	//服务器返回推荐好友
					var obj_SRecommendFriend_action:S2C_SRecommendFriend = new S2C_SRecommendFriend();
					S2C_SRecommendFriend.read(obj_SRecommendFriend_action,bs);
					return obj_SRecommendFriend_action;

				case ProtocolsEnum.FinishCopyRole :	
					var obj_FinishCopyRole_action:S2C_FinishCopyRole = new S2C_FinishCopyRole();
					S2C_FinishCopyRole.read(obj_FinishCopyRole_action,bs);
					return obj_FinishCopyRole_action;
					
				//sugq	
				case ProtocolsEnum.SGiveInfoList :	//<!-- 服务器返回好友赠送信息列表 -->
					var obj_give_infolist_action:S2C_give_infolist = new S2C_give_infolist();
					S2C_give_infolist.read(obj_give_infolist_action,bs);
					return obj_give_infolist_action;

				case ProtocolsEnum.SGiveItem :	//<!-- 赠送道具结果 -->
					var obj_giveitem_action:S2C_give_item = new S2C_give_item();
					S2C_give_item.read(obj_giveitem_action,bs);
					return obj_giveitem_action;		

				case ProtocolsEnum.SGiveGift :	//<!-- 赠送礼物结果 -->
					var obj_givegift_action:S2C_give_gift = new S2C_give_gift();
					S2C_give_gift.read(obj_givegift_action,bs);
					return obj_givegift_action;	

				case ProtocolsEnum.SGetSpaceInfo :	//<!-- 获取某角色空间数据结果 -->
					var obj_get_spaceinfo_action:S2C_get_sapceinfo = new S2C_get_sapceinfo();
					S2C_get_sapceinfo.read(obj_get_spaceinfo_action,bs);
					return obj_get_spaceinfo_action;	

				case ProtocolsEnum.SSetSpaceGift :	//<!-- 放置角色空间礼物结果 -->
					var obj_set_spacegift_action:S2C_set_spacegift = new S2C_set_spacegift();
					S2C_set_spacegift.read(obj_set_spacegift_action,bs);
					return obj_set_spacegift_action;	

				case ProtocolsEnum.SStepSpace :	//<!-- 踩某个角色空间结果 -->
					var obj_step_space_action:S2C_step_space = new S2C_step_space();
					S2C_step_space.read(obj_step_space_action,bs);
					return obj_step_space_action;

				case ProtocolsEnum.SGetRolesLevel :	//<!-- 返回一批角色等级 -->
					var obj_get_roleslevel_action:S2C_get_roleslevel = new S2C_get_roleslevel();
					S2C_get_roleslevel.read(obj_get_roleslevel_action,bs);
					return obj_get_roleslevel_action;

				case ProtocolsEnum.SXshSpace :	//<!-- 踩说不得大师空间结果 -->
					var obj_xsh_space_action:S2C_xshSpace = new S2C_xshSpace();
					S2C_xshSpace.read(obj_xsh_space_action,bs);
					return obj_xsh_space_action;

				case ProtocolsEnum.SXshGiveGift :	//<!-- 赠送说不得大师礼物结果 -->
					var obj_xsh_givegift_action:S2C_xshgivegift = new S2C_xshgivegift();
					S2C_xshgivegift.read(obj_xsh_givegift_action,bs);
					return obj_xsh_givegift_action;

				case ProtocolsEnum.SGetXshSpaceInfo :	//<!-- 获取说不得大师空间数据结果 -->
					var obj_get_xshspaceinfo_action:S2C_get_xshspaceinfo = new S2C_get_xshspaceinfo();
					S2C_get_xshspaceinfo.read(obj_get_xshspaceinfo_action,bs);
					return obj_get_xshspaceinfo_action;

				case ProtocolsEnum.SGetRecruitAward :	//<!-- 招募结果 -->
					var obj_get_recruitAward_action:S2C_get_recruitAward = new S2C_get_recruitAward();
					S2C_get_recruitAward.read(obj_get_recruitAward_action,bs);
					return obj_get_recruitAward_action;

				case ProtocolsEnum.SReqRecruitWheel :	//<!-- 请求招募大转盘信息结果 -->
					var obj_req_recruitwheel_action:S2C_req_recruitwheel = new S2C_req_recruitwheel();
					S2C_req_recruitwheel.read(obj_req_recruitwheel_action,bs);
					return obj_req_recruitwheel_action;

				case ProtocolsEnum.SBeginRecruitWheel :	//<!-- 开始转招募大转盘结果 -->
					var obj_begin_recruitwheel_action:S2C_begin_recruitwheel = new S2C_begin_recruitwheel();
					S2C_begin_recruitwheel.read(obj_begin_recruitwheel_action,bs);
					return obj_begin_recruitwheel_action;

				case ProtocolsEnum.SSignList :	//<!-- 签名列表 key=角色id value=签名内容 -->
					var obj_signlist_action:S2C_signlist = new S2C_signlist();
					S2C_signlist.read(obj_signlist_action,bs);
					return obj_signlist_action;

				case ProtocolsEnum.SRequestMarry :	//<!-- 申请结婚结果(广播给队员) -->
					var obj_request_marry_action:S2C_request_marry = new S2C_request_marry();
					S2C_request_marry.read(obj_request_marry_action,bs);
					return obj_request_marry_action;

				case ProtocolsEnum.SRespondMarry :	//<!-- 响应结婚申请结果(广播给队员) -->
					var obj_respond_marry_action:S2C_respond_marry = new S2C_respond_marry();
					S2C_respond_marry.read(obj_respond_marry_action,bs);
					return obj_respond_marry_action;

				case ProtocolsEnum.SGetMarriageInfo :	//<!-- 返还玩家婚姻信息 -->
					var obj_get_marriageinfo_action:S2C_get_marriageinfo = new S2C_get_marriageinfo();
					S2C_get_marriageinfo.read(obj_get_marriageinfo_action,bs);
					return obj_get_marriageinfo_action;

				case ProtocolsEnum.SRequestWedding :	//<!-- 申请举办婚宴结果 -->
					var obj_request_wedding_action:S2C_request_wedding = new S2C_request_wedding();
					S2C_request_wedding.read(obj_request_wedding_action,bs);
					return obj_request_wedding_action;

				case ProtocolsEnum.SInviteFriend :	//<!-- 通知被邀请的好友 -->
					var obj_SInviteFriend_action:S2C_SInviteFriend = new S2C_SInviteFriend();
					S2C_SInviteFriend.read(obj_SInviteFriend_action,bs);
					return obj_SInviteFriend_action;

				case ProtocolsEnum.SWeddingBegin :	//<!-- 婚宴开始(广播婚宴地图所有玩家) -->
					var obj_SWeddingBegin_action:S2C_SWeddingBegin = new S2C_SWeddingBegin();
					S2C_SWeddingBegin.read(obj_SWeddingBegin_action,bs);
					return obj_SWeddingBegin_action;

				case ProtocolsEnum.SRespondWeddingInvite :	//<!-- 好友响应邀请结果 -->
					var obj_SRespondWeddingInvite_action:S2C_SRespondWeddingInvite = new S2C_SRespondWeddingInvite();
					S2C_SRespondWeddingInvite.read(obj_SRespondWeddingInvite_action,bs);
					return obj_SRespondWeddingInvite_action;

				case ProtocolsEnum.SGiveAsPresent :	//<!-- 赠送新人礼物结果 -->
					var obj_SGiveAsPresent_action:S2C_SGiveAsPresent = new S2C_SGiveAsPresent();
					S2C_SGiveAsPresent.read(obj_SGiveAsPresent_action,bs);
					return obj_SGiveAsPresent_action;

				case ProtocolsEnum.SBeginWeddingRoll :	//<!-- 婚礼roll点开始(广播所有参加婚礼的玩家) -->
					var obj_SBeginWeddingRoll_action:S2C_SBeginWeddingRoll = new S2C_SBeginWeddingRoll();
					S2C_SBeginWeddingRoll.read(obj_SBeginWeddingRoll_action,bs);
					return obj_SBeginWeddingRoll_action;

				case ProtocolsEnum.SWeddingEnd :	//<!-- 婚宴结束(广播所有参加婚礼的玩家) -->
					var obj_SWeddingEnd_action:S2C_SWeddingEnd = new S2C_SWeddingEnd();
					S2C_SWeddingEnd.read(obj_SWeddingEnd_action,bs);
					return obj_SWeddingEnd_action;

				case ProtocolsEnum.SRequestForcibleDivorce :	//<!-- 申请强制离婚结果 -->
					var obj_SRequestForcibleDivorce_action:S2C_SRequestForcibleDivorce = new S2C_SRequestForcibleDivorce();
					S2C_SRequestForcibleDivorce.read(obj_SRequestForcibleDivorce_action,bs);
					return obj_SRequestForcibleDivorce_action;

				case ProtocolsEnum.SRefuseForcibleDivorce :	//<!-- 拒绝强制离婚结果 -->
					var obj_SRefuseForcibleDivorce_action:S2C_SRefuseForcibleDivorce = new S2C_SRefuseForcibleDivorce();
					S2C_SRefuseForcibleDivorce.read(obj_SRefuseForcibleDivorce_action,bs);
					return obj_SRefuseForcibleDivorce_action;

				case ProtocolsEnum.SCancelForcibleDivorce :	//<!-- 确取消强制离婚结果 -->
					var obj_SCancelForcibleDivorce_action:S2C_SCancelForcibleDivorce = new S2C_SCancelForcibleDivorce();
					S2C_SCancelForcibleDivorce.read(obj_SCancelForcibleDivorce_action,bs);
					return obj_SCancelForcibleDivorce_action;

				case ProtocolsEnum.SConfirmForcibleDivorce :	//<!-- 确认强制离婚结果 -->
					var obj_SConfirmForcibleDivorce_action:S2C_SConfirmForcibleDivorce = new S2C_SConfirmForcibleDivorce();
					S2C_SConfirmForcibleDivorce.read(obj_SConfirmForcibleDivorce_action,bs);
					return obj_SConfirmForcibleDivorce_action;

				case ProtocolsEnum.SRequestPeacefulDivorce :	//<!-- 申请协议离婚结果 -->
					var obj_SRequestPeacefulDivorce_action:S2C_SRequestPeacefulDivorce = new S2C_SRequestPeacefulDivorce();
					S2C_SRequestPeacefulDivorce.read(obj_SRequestPeacefulDivorce_action,bs);
					return obj_SRequestPeacefulDivorce_action;

				case ProtocolsEnum.SRespondPeacefulDivorce :	//<!-- 响应协议离婚申请结果 -->
					var obj_SRespondPeacefulDivorce_action:S2C_SRespondPeacefulDivorce = new S2C_SRespondPeacefulDivorce();
					S2C_SRespondPeacefulDivorce.read(obj_SRespondPeacefulDivorce_action,bs);
					return obj_SRespondPeacefulDivorce_action;

				case ProtocolsEnum.SGetMarriageSkillInfo :	//<!-- 响应请求婚姻技能信息 -->
					var obj_SGetMarriageSkillInfo_action:S2C_SGetMarriageSkillInfo = new S2C_SGetMarriageSkillInfo();
					S2C_SGetMarriageSkillInfo.read(obj_SGetMarriageSkillInfo_action,bs);
					return obj_SGetMarriageSkillInfo_action;

				case ProtocolsEnum.SStudyMarriageSkill :	//<!-- 请求学习婚姻技能结果 -->
					var obj_SStudyMarriageSkill_action:S2C_SStudyMarriageSkill = new S2C_SStudyMarriageSkill();
					S2C_SStudyMarriageSkill.read(obj_SStudyMarriageSkill_action,bs);
					return obj_SStudyMarriageSkill_action;

				case ProtocolsEnum.SRefreshMarriageMission :	//<!-- 结婚任务协议 20331-20350 -->
					var obj_SRefreshMarriageMission_action:S2C_SRefreshMarriageMission = new S2C_SRefreshMarriageMission();
					S2C_SRefreshMarriageMission.read(obj_SRefreshMarriageMission_action,bs);
					return obj_SRefreshMarriageMission_action;*/

				case ProtocolsEnum.SReqFushiNum:	//<!-- 通知客户端刷新符石的数量 -->
					var obj_SReqFushiNum_action: S2C_SReqFushiNum = new S2C_SReqFushiNum();
					S2C_SReqFushiNum.read(obj_SReqFushiNum_action, bs);
					return obj_SReqFushiNum_action;

				case ProtocolsEnum.SReqCharge:	//<!-- 符石商品的列表 -->
					var obj_SReqCharge_action: S2C_SReqCharge = new S2C_SReqCharge();
					S2C_SReqCharge.read(obj_SReqCharge_action, bs);
					return obj_SReqCharge_action;

				case ProtocolsEnum.SConfirmCharge:	//<!--  -->
					var obj_SConfirmCharge_action: S2C_SConfirmCharge = new S2C_SConfirmCharge();
					S2C_SConfirmCharge.read(obj_SConfirmCharge_action, bs);
					return obj_SConfirmCharge_action;

				case ProtocolsEnum.SRefreshChargeState:	//<!-- 服务器同步充值状态-->
					var obj_SRefreshChargeState_action: S2C_SRefreshChargeState = new S2C_SRefreshChargeState();
					S2C_SRefreshChargeState.read(obj_SRefreshChargeState_action, bs);
					return obj_SRefreshChargeState_action;

				case ProtocolsEnum.SRspServerId:	//<!-- -->
					var obj_SRspServerId_action: S2C_SRspServerId = new S2C_SRspServerId();
					S2C_SRspServerId.read(obj_SRspServerId_action, bs);
					return obj_SRspServerId_action;

				case ProtocolsEnum.SRequestChargeReturnProfit:	//<!-- 返回充值返利数据-->
					var obj_SRequestChargeReturnProfit_action: S2C_SRequestChargeReturnProfit = new S2C_SRequestChargeReturnProfit();
					S2C_SRequestChargeReturnProfit.read(obj_SRequestChargeReturnProfit_action, bs);
					return obj_SRequestChargeReturnProfit_action;

				/*case ProtocolsEnum.SGrabChargeReturnProfitReward :	//<!-- 领取结果 by changhao-->
					var obj_SGrabChargeReturnProfitReward_action:S2C_SGrabChargeReturnProfitReward = new S2C_SGrabChargeReturnProfitReward();
					S2C_SGrabChargeReturnProfitReward.read(obj_SGrabChargeReturnProfitReward_action,bs);
					return obj_SGrabChargeReturnProfitReward_action;

				case ProtocolsEnum.SReqChargeRefundsInfo :	//<!-- 返回封测充值返还数据-->
					var obj_SReqChargeRefundsInfo_action:S2C_SReqChargeRefundsInfo = new S2C_SReqChargeRefundsInfo();
					S2C_SReqChargeRefundsInfo.read(obj_SReqChargeRefundsInfo_action,bs);
					return obj_SReqChargeRefundsInfo_action;

				case ProtocolsEnum.SGetChargeRefunds :	//<!-- 领取封测充值返还数据结果-->
					var obj_SGetChargeRefunds_action:S2C_SGetChargeRefunds = new S2C_SGetChargeRefunds();
					S2C_SGetChargeRefunds.read(obj_SGetChargeRefunds_action,bs);
					return obj_SGetChargeRefunds_action;*/

				case ProtocolsEnum.SSendVipInfo:	//<!-- -->
					var obj_SSendVipInfo_action: S2C_SSendVipInfo = new S2C_SSendVipInfo();
					S2C_SSendVipInfo.read(obj_SSendVipInfo_action, bs);
					return obj_SSendVipInfo_action;

				/*case ProtocolsEnum.SReqFushiInfo :	//<!-- -->
					var obj_SReqFushiInfo_action:S2C_SReqFushiInfo = new S2C_SReqFushiInfo();
					S2C_SReqFushiInfo.read(obj_SReqFushiInfo_action,bs);
					return obj_SReqFushiInfo_action;*/

				case ProtocolsEnum.SSendRedPackView:	//<!--返回红包界面 -->
					var obj_SSendRedPackView_action: S2C_SSendRedPackView = new S2C_SSendRedPackView();
					S2C_SSendRedPackView.read(obj_SSendRedPackView_action, bs);
					return obj_SSendRedPackView_action;

				case ProtocolsEnum.SSendRedPack:	//<!--发送红包成功返回 -->
					var obj_SSendRedPack_action: S2C_SSendRedPack = new S2C_SSendRedPack();
					S2C_SSendRedPack.read(obj_SSendRedPack_action, bs);
					return obj_SSendRedPack_action;

				case ProtocolsEnum.SGetRedPack:	//<!--返回领取红包 -->
					var obj_SGetRedPack_action: S2C_SGetRedPack = new S2C_SGetRedPack();
					S2C_SGetRedPack.read(obj_SGetRedPack_action, bs);
					return obj_SGetRedPack_action;

				case ProtocolsEnum.SSendRedPackHisView:	//<!--返回红包历史 -->
					var obj_SSendRedPackHisView_action: S2C_SSendRedPackHisView = new S2C_SSendRedPackHisView();
					S2C_SSendRedPackHisView.read(obj_SSendRedPackHisView_action, bs);
					return obj_SSendRedPackHisView_action;

				case ProtocolsEnum.SSendRedPackRoleRecordView:	//<!--查看玩家红包记录 -->
					var obj_SSendRedPackRoleRecordView_action: S2C_SSendRedPackRoleRecordView = new S2C_SSendRedPackRoleRecordView();
					S2C_SSendRedPackRoleRecordView.read(obj_SSendRedPackRoleRecordView_action, bs);
					return obj_SSendRedPackRoleRecordView_action;

				case ProtocolsEnum.SNoticeRedPack:	//<!--推送红包信息 -->
					var obj_SNoticeRedPack_action: S2C_SNoticeRedPack = new S2C_SNoticeRedPack();
					S2C_SNoticeRedPack.read(obj_SNoticeRedPack_action, bs);
					return obj_SNoticeRedPack_action;

				case ProtocolsEnum.SNoticeRedPackList:	//<!--上线推送红包信息 -->
					var obj_SNoticeRedPackList_action: S2C_SNoticeRedPackList = new S2C_SNoticeRedPackList();
					S2C_SNoticeRedPackList.read(obj_SNoticeRedPackList_action, bs);
					return obj_SNoticeRedPackList_action;

				/*case ProtocolsEnum.SPayServerType :	//<!-- -->
					var obj_SPayServerType_action:S2C_SPayServerType = new S2C_SPayServerType();
					S2C_SPayServerType.read(obj_SPayServerType_action,bs);
					return obj_SPayServerType_action;

				case ProtocolsEnum.SHaveDayPay :	//<!-- 是否已经消耗日卡-->
					var obj_SHaveDayPay_action:S2C_SHaveDayPay = new S2C_SHaveDayPay();
					S2C_SHaveDayPay.read(obj_SHaveDayPay_action,bs);
					return obj_SHaveDayPay_action;

				case ProtocolsEnum.SQueryConsumeDayPay :	//<!-- 询问是否发送消耗点卡-->
					var obj_SQueryConsumeDayPay_action:S2C_SQueryConsumeDayPay = new S2C_SQueryConsumeDayPay();
					S2C_SQueryConsumeDayPay.read(obj_SQueryConsumeDayPay_action,bs);
					return obj_SQueryConsumeDayPay_action;

				case ProtocolsEnum.SConsumeDayPay :	//<!-- 消耗点卡-->
					var obj_SConsumeDayPay_action:S2C_SConsumeDayPay = new S2C_SConsumeDayPay();
					S2C_SConsumeDayPay.read(obj_SConsumeDayPay_action,bs);
					return obj_SConsumeDayPay_action;

				case ProtocolsEnum.SQuerySubscribeInfo :	//<!-- 返回订阅信息-->
					var obj_SQuerySubscribeInfo_action:S2C_SQuerySubscribeInfo = new S2C_SQuerySubscribeInfo();
					S2C_SQuerySubscribeInfo.read(obj_SQuerySubscribeInfo_action,bs);
					return obj_SQuerySubscribeInfo_action;

				case ProtocolsEnum.SBuySpotCard :	//<!-- -->
					var obj_SBuySpotCard_action:S2C_SBuySpotCard = new S2C_SBuySpotCard();
					S2C_SBuySpotCard.read(obj_SBuySpotCard_action,bs);
					return obj_SBuySpotCard_action;

				case ProtocolsEnum.SSellSpotCard :	//<!-- -->
					var obj_SSellSpotCard_action:S2C_SSellSpotCard = new S2C_SSellSpotCard();
					S2C_SSellSpotCard.read(obj_SSellSpotCard_action,bs);
					return obj_SSellSpotCard_action;

				case ProtocolsEnum.STradingSpotCardView :	//<!-- 交易区界面-->
					var obj_STradingSpotCardView_action:S2C_STradingSpotCardView = new S2C_STradingSpotCardView();
					S2C_STradingSpotCardView.read(obj_STradingSpotCardView_action,bs);
					return obj_STradingSpotCardView_action;

				case ProtocolsEnum.SRoleTradingView :	//<!-- 个人买卖界面-->
					var obj_SRoleTradingView_action:S2C_SRoleTradingView = new S2C_SRoleTradingView();
					S2C_SRoleTradingView.read(obj_SRoleTradingView_action,bs);
					return obj_SRoleTradingView_action;

				case ProtocolsEnum.SRoleTradingRecordView :	//<!-- 个人买卖记录界面-->
					var obj_SRoleTradingRecordView_action:S2C_SRoleTradingRecordView = new S2C_SRoleTradingRecordView();
					S2C_SRoleTradingRecordView.read(obj_SRoleTradingRecordView_action,bs);
					return obj_SRoleTradingRecordView_action;

				case ProtocolsEnum.SCancelTrading :	//<!-- 撤销订单-->
					var obj_SCancelTrading_action:S2C_SCancelTrading = new S2C_SCancelTrading();
					S2C_SCancelTrading.read(obj_SCancelTrading_action,bs);
					return obj_SCancelTrading_action;

				case ProtocolsEnum.STradingOpenState :	//<!-- 交易所功能是否开启-->
					var obj_STradingOpenState_action:S2C_STradingOpenState = new S2C_STradingOpenState();
					S2C_STradingOpenState.read(obj_STradingOpenState_action,bs);
					return obj_STradingOpenState_action;*/

				case ProtocolsEnum.SMonthCard:	//<!-- 返回月卡结束时间戳-->
					var obj_SMonthCard_action: S2C_SMonthCard = new S2C_SMonthCard();
					S2C_SMonthCard.read(obj_SMonthCard_action, bs);
					return obj_SMonthCard_action;

				/*case ProtocolsEnum.SBeginSchoolWheel :	//<!-- -->
					var obj_SBeginSchoolWheel_action:S2C_SBeginSchoolWheel = new S2C_SBeginSchoolWheel();
					S2C_SBeginSchoolWheel.read(obj_SBeginSchoolWheel_action,bs);
					return obj_SBeginSchoolWheel_action;

				case ProtocolsEnum.SBeginXueYueWheel :	//<!-- -->
					var obj_SBeginXueYueWheel_action:S2C_SBeginXueYueWheel = new S2C_SBeginXueYueWheel();
					S2C_SBeginXueYueWheel.read(obj_SBeginXueYueWheel_action,bs);
					return obj_SBeginXueYueWheel_action;

				case ProtocolsEnum.SUseXueYueKey :	//<!-- -->
					var obj_SUseXueYueKey_action:S2C_SUseXueYueKey = new S2C_SUseXueYueKey();
					S2C_SUseXueYueKey.read(obj_SUseXueYueKey_action,bs);
					return obj_SUseXueYueKey_action;

				case ProtocolsEnum.SRoleAccusation :	//<!-- -->
					var obj_SRoleAccusation_action:S2C_SRoleAccusation = new S2C_SRoleAccusation();
					S2C_SRoleAccusation.read(obj_SRoleAccusation_action,bs);
					return obj_SRoleAccusation_action;

				case ProtocolsEnum.SRoleAccusationCheck :	//<!-- -->
					var obj_SRoleAccusationCheck_action:S2C_SRoleAccusationCheck = new S2C_SRoleAccusationCheck();
					S2C_SRoleAccusationCheck.read(obj_SRoleAccusationCheck_action,bs);
					return obj_SRoleAccusationCheck_action;

				case ProtocolsEnum.SRefreshRoleHookData :	//<!-- 服务器刷新挂机数据-->
					var obj_SRefreshRoleHookData_action:S2C_SRefreshRoleHookData = new S2C_SRefreshRoleHookData();
					S2C_SRefreshRoleHookData.read(obj_SRefreshRoleHookData_action,bs);
					return obj_SRefreshRoleHookData_action;*/

				case ProtocolsEnum.SRefreshRoleHookBattleData:	//<!-- 服务器刷新挂机战斗相关数据-->
					var obj_SRefreshRoleHookBattleData_action: S2C_SRefreshRoleHookBattleData = new S2C_SRefreshRoleHookBattleData();
					S2C_SRefreshRoleHookBattleData.read(obj_SRefreshRoleHookBattleData_action, bs);
					return obj_SRefreshRoleHookBattleData_action;

				case ProtocolsEnum.SRefreshRoleHookExpData:	//<!-- 服务器刷新挂机经验相关数据-->
					var obj_SRefreshRoleHookExpData_action: S2C_SRefreshRoleHookExpData = new S2C_SRefreshRoleHookExpData();
					S2C_SRefreshRoleHookExpData.read(obj_SRefreshRoleHookExpData_action, bs);
					return obj_SRefreshRoleHookExpData_action;

				case ProtocolsEnum.SFlushRoleFightAI:	//<!-- 刷新人物战斗ai-->
					var obj_SFlushRoleFightAI_action: S2C_SFlushRoleFightAI = new S2C_SFlushRoleFightAI();
					S2C_SFlushRoleFightAI.read(obj_SFlushRoleFightAI_action, bs);
					return obj_SFlushRoleFightAI_action;

				case ProtocolsEnum.SAttentionGoods:	  //<!--物品关注成功-->
					var obj_attention_goods_action: S2C_attention_goods = new S2C_attention_goods();
					S2C_attention_goods.read(obj_attention_goods_action, bs)
					return obj_attention_goods_action;
				case ProtocolsEnum.SEnterFuBen:	  //队员同意进入精英副本
					var obj_enter_fuben: S2C_EnterFuBen = new S2C_EnterFuBen();
					S2C_EnterFuBen.read(obj_enter_fuben, bs)
					return obj_enter_fuben;
				case ProtocolsEnum.SMarketSearchResult:	//<!--珍品装备和珍品宠物搜索-->
					var obj_market_searchresult_action: S2C_market_searchresult = new S2C_market_searchresult();
					S2C_market_searchresult.read(obj_market_searchresult_action, bs)
					return obj_market_searchresult_action;
				/*
				case ProtocolsEnum.SMarketItemChatShow:
					var obj_marketItem_chatshow_action: S2C_marketItem_chatshow = new S2C_marketItem_chatshow();
					S2C_marketItem_chatshow.read(obj_marketItem_chatshow_action, bs)
					return obj_marketItem_chatshow_action;
				case ProtocolsEnum.STempMarketContainer:
					var obj_temp_marketcontainer_action: S2C_temp_marketcontainer = new S2C_temp_marketcontainer();
					S2C_temp_marketcontainer.read(obj_temp_marketcontainer_action, bs)
					return obj_temp_marketcontainer_action;
				case ProtocolsEnum.STakeBackTempMarketContainerItem:
					var obj_take_backtempmarketcontainerItem_action: S2C_take_backtempmarketcontainerItem = new S2C_take_backtempmarketcontainerItem();
					S2C_take_backtempmarketcontainerItem.read(obj_take_backtempmarketcontainerItem_action, bs)
					return obj_take_backtempmarketcontainerItem_action;
				case ProtocolsEnum.SGoldOrderBrowseBlackMarket:
					var obj_gold_orderbrowseblackmarket_action: S2C_gold_orderbrowseblackmarket = new S2C_gold_orderbrowseblackmarket();
					S2C_gold_orderbrowseblackmarket.read(obj_gold_orderbrowseblackmarket_action, bs)
					return obj_gold_orderbrowseblackmarket_action;

				case ProtocolsEnum.SGoldOrderUpBlackMarket:
					var obj_gold_orderupblackmarket_action: S2C_gold_orderupblackmarket = new S2C_gold_orderupblackmarket();
					S2C_gold_orderupblackmarket.read(obj_gold_orderupblackmarket_action, bs)
					return obj_gold_orderupblackmarket_action;
				case ProtocolsEnum.SRefreshGoldOrderState:
					var obj_refresh_goldorderstate_action: S2C_refresh_goldorderstate = new S2C_refresh_goldorderstate();
					S2C_refresh_goldorderstate.read(obj_refresh_goldorderstate_action, bs)
					return obj_refresh_goldorderstate_action;
				case ProtocolsEnum.SGoldOrderDownBlackMarket:
					var obj_gold_orderdownblackmarket_action: S2C_gold_orderdownblackmarket = new S2C_gold_orderdownblackmarket();
					S2C_gold_orderdownblackmarket.read(obj_gold_orderdownblackmarket_action, bs)
					return obj_gold_orderdownblackmarket_action;
				case ProtocolsEnum.SItemOrderUpBlackMarket:
					var obj_item_orderupblackmarket_action: S2C_item_orderupblackmarket = new S2C_item_orderupblackmarket();
					S2C_item_orderupblackmarket.read(obj_item_orderupblackmarket_action, bs)
					return obj_item_orderupblackmarket_action;
				case ProtocolsEnum.SRefreshItemOrderState:
					var obj_refresh_itemorderstate_action: S2C_refresh_itemorderstate = new S2C_refresh_itemorderstate();
					S2C_refresh_itemorderstate.read(obj_refresh_itemorderstate_action, bs)
					return obj_refresh_itemorderstate_action;
				case ProtocolsEnum.SItemOrderDownBlackMarket:
					var obj_item_orderdownblackmarket_action: S2C_item_orderdownblackmarket = new S2C_item_orderdownblackmarket();
					S2C_item_orderdownblackmarket.read(obj_item_orderdownblackmarket_action, bs)
					return obj_item_orderdownblackmarket_action;
				case ProtocolsEnum.SItemOrderBrowseBlackMarket:
					var obj_item_orderbrowseblackmarket_action: S2C_item_orderbrowseblackmarket = new S2C_item_orderbrowseblackmarket();
					S2C_item_orderbrowseblackmarket.read(obj_item_orderbrowseblackmarket_action, bs)
					return obj_item_orderbrowseblackmarket_action;*/
				case ProtocolsEnum.SSkillError:
					var obj_skill_error_action: S2C_skill_error = new S2C_skill_error();
					S2C_skill_error.read(obj_skill_error_action, bs)
					return obj_skill_error_action;
				/*case ProtocolsEnum.SUpdateAssistSkill:
					var obj_update_assistskill_action: S2C_update_assistskill = new S2C_update_assistskill();
					S2C_update_assistskill.read(obj_update_assistskill_action, bs)
					return obj_update_assistskill_action;
				case ProtocolsEnum.SSendAssistSkillMaxLevels:
					var obj_send_assistskillmaxlevels_action: S2C_send_assistskillmaxlevels = new S2C_send_assistskillmaxlevels();
					S2C_send_assistskillmaxlevels.read(obj_send_assistskillmaxlevels_action, bs)
					return obj_send_assistskillmaxlevels_action;
				case ProtocolsEnum.SSendSpecialSkills:
					var obj_send_specialskills_action: S2C_send_specialskills = new S2C_send_specialskills();
					S2C_send_specialskills.read(obj_send_specialskills_action, bs)
					return obj_send_specialskills_action;
				case ProtocolsEnum.SUpdateInborn:
					var obj_update_inborn_action: S2C_update_inborn = new S2C_update_inborn();
					S2C_update_inborn.read(obj_update_inborn_action, bs)
					return obj_update_inborn_action;

				case ProtocolsEnum.SSendInborns:
					var obj_send_inborns_action: S2C_send_inborns = new S2C_send_inborns();
					S2C_send_inborns.read(obj_send_inborns_action, bs)
					return obj_send_inborns_action;
				case ProtocolsEnum.SUpdateExtSkill:
					var obj_update_extskill_action: S2C_update_extskill = new S2C_update_extskill();
					S2C_update_extskill.read(obj_update_extskill_action, bs)
					return obj_update_extskill_action;
				case ProtocolsEnum.SRequestParticleSkillList:
					var obj_request_particleskilllist_action: S2C_request_particleskilllist = new S2C_request_particleskilllist();
					S2C_request_particleskilllist.read(obj_request_particleskilllist_action, bs)
					return obj_request_particleskilllist_action;
				case ProtocolsEnum.SUpdateLearnParticleSkill:
					var obj_update_learnparticleskill_action: S2C_update_learnparticleskill = new S2C_update_learnparticleskill();
					S2C_update_learnparticleskill.read(obj_update_learnparticleskill_action, bs)
					return obj_update_learnparticleskill_action;
				case ProtocolsEnum.SRequestLiveSkillList:
					var obj_request_liveskilllist_action: S2C_request_liveskilllist = new S2C_request_liveskilllist();
					S2C_request_liveskilllist.read(obj_request_liveskilllist_action, bs)
					return obj_request_liveskilllist_action;
				case ProtocolsEnum.SUpdateLearnLiveSkill:
					var obj_update_learnliveskill_action: S2C_update_learnliveskill = new S2C_update_learnliveskill();
					S2C_update_learnliveskill.read(obj_update_learnliveskill_action, bs)
					return obj_update_learnliveskill_action;
				case ProtocolsEnum.SLiveSkillMakeStuff:
					var obj_live_skillmakestuff_action: S2C_live_skillmakestuff = new S2C_live_skillmakestuff();
					S2C_live_skillmakestuff.read(obj_live_skillmakestuff_action, bs)
					return obj_live_skillmakestuff_action;
				case ProtocolsEnum.SLiveSkillMakeDrug:
					var obj_live_skillmakedrug_action: S2C_live_skillmakedrug = new S2C_live_skillmakedrug();
					S2C_live_skillmakedrug.read(obj_live_skillmakedrug_action, bs)
					return obj_live_skillmakedrug_action;
				case ProtocolsEnum.SLiveSkillMakeFood:
					var obj_live_skillsakefood_action: S2C_live_skillsakefood = new S2C_live_skillsakefood();
					S2C_live_skillsakefood.read(obj_live_skillsakefood_action, bs)
					return obj_live_skillsakefood_action;
				case ProtocolsEnum.SLiveSkillMakeFriendGift:
					var obj_live_skillmakefriendgift_action: S2C_live_skillmakefriendgift = new S2C_live_skillmakefriendgift();
					S2C_live_skillmakefriendgift.read(obj_live_skillmakefriendgift_action, bs)
					return obj_live_skillmakefriendgift_action;
				case ProtocolsEnum.SLiveSkillMakeEnhancement:
					var obj_live_skillmakeenhancement_action: S2C_live_skillmakeenhancement = new S2C_live_skillmakeenhancement();
					S2C_live_skillmakeenhancement.read(obj_live_skillmakeenhancement_action, bs)
					return obj_live_skillmakeenhancement_action;

				case ProtocolsEnum.SLiveSkillMakeFarm:
					var obj_live_skillmakefarm_action: S2C_live_skillmakefarm = new S2C_live_skillmakefarm();
					S2C_live_skillmakefarm.read(obj_live_skillmakefarm_action, bs)
					return obj_live_skillmakefarm_action;
				case ProtocolsEnum.SLiveSkillMakeCard:
					var obj_live_skillmakecard_action: S2C_live_skillmakecard = new S2C_live_skillmakecard();
					S2C_live_skillmakecard.read(obj_live_skillmakecard_action, bs)
					return obj_live_skillmakecard_action;
				case ProtocolsEnum.SShapeCardInfoList:
					var obj_shape_cardInfolist_action: S2C_shape_cardInfolist = new S2C_shape_cardInfolist();
					S2C_shape_cardInfolist.read(obj_shape_cardInfolist_action, bs)
					return obj_shape_cardInfolist_action;
				case ProtocolsEnum.SAddShapeCardPoint:
					var obj_add_shapecardpoint_action: S2C_add_shapecardpoint = new S2C_add_shapecardpoint();
					S2C_add_shapecardpoint.read(obj_add_shapecardpoint_action, bs)
					return obj_add_shapecardpoint_action;
				case ProtocolsEnum.SUseShapeCard:
					var obj_use_shapecard_action: S2C_use_shapecard = new S2C_use_shapecard();
					S2C_use_shapecard.read(obj_use_shapecard_action, bs)
					return obj_use_shapecard_action;
				case ProtocolsEnum.SUseRoleShape:
					var obj_use_roleshape_action: S2C_use_roleshape = new S2C_use_roleshape();
					S2C_use_roleshape.read(obj_use_roleshape_action, bs)
					return obj_use_roleshape_action;*/
				case ProtocolsEnum.STransChatMessage2Client:
					var obj_trans_chatmessage2client_action: S2C_trans_chatmessage2client = new S2C_trans_chatmessage2client();
					S2C_trans_chatmessage2client.read(obj_trans_chatmessage2client_action, bs)
					return obj_trans_chatmessage2client_action;
				case ProtocolsEnum.STransChatMessageNotify2Client:
					var obj_trans_chatmessagenotify2client_action: S2C_trans_chatmessagenotify2client = new S2C_trans_chatmessagenotify2client();
					S2C_trans_chatmessagenotify2client.read(obj_trans_chatmessagenotify2client_action, bs)
					return obj_trans_chatmessagenotify2client_action;
				case ProtocolsEnum.SDropInstance:
					var obj_dropInstance: S2C_dropInstance = new S2C_dropInstance();
					S2C_dropInstance.read(obj_dropInstance, bs)
					return obj_dropInstance;
				case ProtocolsEnum.SChatItemTips:
					var obj_chatItem_tips_action: S2C_chatItem_tips = new S2C_chatItem_tips();
					S2C_chatItem_tips.read(obj_chatItem_tips_action, bs)
					return obj_chatItem_tips_action;
				/*case ProtocolsEnum.SExpMessageTips:
					var obj_exp_messagetips_action: S2C_exp_messagetips = new S2C_exp_messagetips();
					S2C_exp_messagetips.read(obj_exp_messagetips_action, bs)
					return obj_exp_messagetips_action;
				case ProtocolsEnum.SChatHelpResult:
					var obj_chat_helpresult_action: S2C_chat_helpresult = new S2C_chat_helpresult();
					S2C_chat_helpresult.read(obj_chat_helpresult_action, bs)
					return obj_chat_helpresult_action;*/
				case ProtocolsEnum.SCreateTeam:
					var obj_create_team_action: S2C_create_team = new S2C_create_team();
					S2C_create_team.read(obj_create_team_action, bs)
					return obj_create_team_action;
				case ProtocolsEnum.SAddTeamMember:
					var obj_add_teammember_action: S2C_add_teammember = new S2C_add_teammember();
					S2C_add_teammember.read(obj_add_teammember_action, bs)
					return obj_add_teammember_action;
				case ProtocolsEnum.SAddTeamApply:
					var obj_add_teamapply_action: S2C_add_teamapply = new S2C_add_teamapply();
					S2C_add_teamapply.read(obj_add_teamapply_action, bs)
					return obj_add_teamapply_action;


				case ProtocolsEnum.SRemoveTeamMember:
					var obj_remove_teamMember_action: S2C_remove_teamMember = new S2C_remove_teamMember();
					S2C_remove_teamMember.read(obj_remove_teamMember_action, bs)
					return obj_remove_teamMember_action;
				case ProtocolsEnum.SRemoveTeamApply:
					var obj_remove_teamapply_action: S2C_remove_teamapply = new S2C_remove_teamapply();
					S2C_remove_teamapply.read(obj_remove_teamapply_action, bs)
					return obj_remove_teamapply_action;
				case ProtocolsEnum.SAbsentReturnTeam:
					var obj_absent_returnteam_action: S2C_absent_returnteam = new S2C_absent_returnteam();
					S2C_absent_returnteam.read(obj_absent_returnteam_action, bs)
					return obj_absent_returnteam_action;
				case ProtocolsEnum.SSetTeamLeader:
					var obj_set_teamleader_action: S2C_set_teamleader = new S2C_set_teamleader();
					S2C_set_teamleader.read(obj_set_teamleader_action, bs)
					return obj_set_teamleader_action;


				case ProtocolsEnum.SInviteJoinTeam:
					var obj_invite_jointeam_action: S2C_invite_jointeam = new S2C_invite_jointeam();
					S2C_invite_jointeam.read(obj_invite_jointeam_action, bs)
					return obj_invite_jointeam_action;

				case ProtocolsEnum.SSwapMember:
					var obj_swap_member_action: S2C_swap_member = new S2C_swap_member();
					S2C_swap_member.read(obj_swap_member_action, bs)
					return obj_swap_member_action;

				case ProtocolsEnum.SAskforSetLeader:
					var obj_askfor_setleader_action: S2C_askfor_setleader = new S2C_askfor_setleader();
					S2C_askfor_setleader.read(obj_askfor_setleader_action, bs)
					return obj_askfor_setleader_action;

				case ProtocolsEnum.SAskforCallBack:
					var obj_askfor_callback_action: S2C_askfor_callback = new S2C_askfor_callback();
					S2C_askfor_callback.read(obj_askfor_callback_action, bs)
					return obj_askfor_callback_action;
				case ProtocolsEnum.SUpdateMemberState:
					var obj_update_memberstate_action: S2C_update_memberstate = new S2C_update_memberstate();
					S2C_update_memberstate.read(obj_update_memberstate_action, bs)
					return obj_update_memberstate_action;
				case ProtocolsEnum.SUpdateMemberLevel:
					var obj_update_memberlevel_action: S2C_update_memberlevel = new S2C_update_memberlevel();
					S2C_update_memberlevel.read(obj_update_memberlevel_action, bs)
					return obj_update_memberlevel_action;
				case ProtocolsEnum.SUpdateMemberHPMP:
					var obj_update_memberhpmp_action: S2C_update_memberhpmp = new S2C_update_memberhpmp();
					S2C_update_memberhpmp.read(obj_update_memberhpmp_action, bs)
					return obj_update_memberhpmp_action;
				case ProtocolsEnum.SUpdateMemberMaxHPMP:
					var obj_update_membermaxhpmp_action: S2C_update_membermaxhpmp = new S2C_update_membermaxhpmp();
					S2C_update_membermaxhpmp.read(obj_update_membermaxhpmp_action, bs)
					return obj_update_membermaxhpmp_action;
				case ProtocolsEnum.SSetTeamLevel:
					var obj_set_teamlevel_action: S2C_set_teamlevel = new S2C_set_teamlevel();
					S2C_set_teamlevel.read(obj_set_teamlevel_action, bs)
					return obj_set_teamlevel_action;

				case ProtocolsEnum.SDismissTeam:
					var obj_dismiss_team_action: S2C_dismiss_team = new S2C_dismiss_team();
					S2C_dismiss_team.read(obj_dismiss_team_action, bs)
					return obj_dismiss_team_action;
				case ProtocolsEnum.SMemberSequence:
					var obj_member_sequence_action: S2C_member_sequence = new S2C_member_sequence();
					S2C_member_sequence.read(obj_member_sequence_action, bs)
					return obj_member_sequence_action;


				case ProtocolsEnum.STeamError:
					var obj_team_error_action: S2C_team_error = new S2C_team_error();
					S2C_team_error.read(obj_team_error_action, bs)
					return obj_team_error_action;
				case ProtocolsEnum.SRequestJoinSucc:
					var obj_reques_tjoinsucc_action: S2C_reques_tjoinsucc = new S2C_reques_tjoinsucc();
					S2C_reques_tjoinsucc.read(obj_reques_tjoinsucc_action, bs)
					return obj_reques_tjoinsucc_action;
				case ProtocolsEnum.SUpdateMemberPosition:
					var obj_update_memberposition_action: S2C_update_memberposition = new S2C_update_memberposition();
					S2C_update_memberposition.read(obj_update_memberposition_action, bs)
					return obj_update_memberposition_action;
				case ProtocolsEnum.SSendSingleCharacterList:
					var obj_send_singlecharacterlist_action: S2C_send_singlecharacterlist = new S2C_send_singlecharacterlist();
					S2C_send_singlecharacterlist.read(obj_send_singlecharacterlist_action, bs)
					return obj_send_singlecharacterlist_action;

				case ProtocolsEnum.SInviteJoinSucc:
					var obj_invite_joinsucc_action: S2C_invite_joinsucc = new S2C_invite_joinsucc();
					S2C_invite_joinsucc.read(obj_invite_joinsucc_action, bs)
					return obj_invite_joinsucc_action;
				case ProtocolsEnum.SRequestSetLeaderSucc:
					var obj_request_setleadersucc_action: S2C_request_setleadersucc = new S2C_request_setleadersucc();
					S2C_request_setleadersucc.read(obj_request_setleadersucc_action, bs)
					return obj_request_setleadersucc_action;

				case ProtocolsEnum.SSetTeamState:
					var obj_set_teamstate_action: S2C_set_teamstate = new S2C_set_teamstate();
					S2C_set_teamstate.read(obj_set_teamstate_action, bs)
					return obj_set_teamstate_action;

				case ProtocolsEnum.SUpdateTeamMemberBasic:
					var obj_update_teammemberbasic_action: S2C_update_teammemberbasic = new S2C_update_teammemberbasic();
					S2C_update_teammemberbasic.read(obj_update_teammemberbasic_action, bs)
					return obj_update_teammemberbasic_action;

				case ProtocolsEnum.SRespondInvite:
					var obj_respond_invite_action: S2C_respond_invite = new S2C_respond_invite();
					S2C_respond_invite.read(obj_respond_invite_action, bs)
					return obj_respond_invite_action;
				case ProtocolsEnum.SUpdateTeamMemberComponent:
					var obj_update_teammembercomponent_action: S2C_update_teammembercomponent = new S2C_update_teammembercomponent();
					S2C_update_teammembercomponent.read(obj_update_teammembercomponent_action, bs)
					return obj_update_teammembercomponent_action;

				case ProtocolsEnum.SRequestTeamMatch:
					var obj_request_teammatch_action: S2C_request_teammatch = new S2C_request_teammatch();
					S2C_request_teammatch.read(obj_request_teammatch_action, bs)
					return obj_request_teammatch_action;
				case ProtocolsEnum.SStopTeamMatch:
					var obj_stop_teammatch_action: S2C_stop_teammatch = new S2C_stop_teammatch();
					S2C_stop_teammatch.read(obj_stop_teammatch_action, bs)
					return obj_stop_teammatch_action;

				case ProtocolsEnum.SOneKeyTeamMatch:
					var obj_one_keyteammatch_action: S2C_one_keyteammatch = new S2C_one_keyteammatch();
					S2C_one_keyteammatch.read(obj_one_keyteammatch_action, bs)
					return obj_one_keyteammatch_action;

				case ProtocolsEnum.SRequestTeamMatchList:
					var obj_request_teammatchlist_action: S2C_request_teammatchlist = new S2C_request_teammatchlist();
					S2C_request_teammatchlist.read(obj_request_teammatchlist_action, bs)
					return obj_request_teammatchlist_action;

				case ProtocolsEnum.SForceInviteJointTeam:
					var obj_force_invitejointteam_action: S2C_force_invitejointteam = new S2C_force_invitejointteam();
					S2C_force_invitejointteam.read(obj_force_invitejointteam_action, bs)
					return obj_force_invitejointteam_action;
				case ProtocolsEnum.SRequestMatchInfo:
					var obj_request_matchinfo_action: S2C_request_matchinfo = new S2C_request_matchinfo();
					S2C_request_matchinfo.read(obj_request_matchinfo_action, bs)
					return obj_request_matchinfo_action;
				case ProtocolsEnum.SRequestHaveTeam:
					var obj_request_haveteam_action: S2C_request_haveteam = new S2C_request_haveteam();
					S2C_request_haveteam.read(obj_request_haveteam_action, bs)
					return obj_request_haveteam_action;
				case ProtocolsEnum.SOneKeyApplyTeamInfo:
					var obj_one_keyapplyteaminfo_action: S2C_one_keyapplyteaminfo = new S2C_one_keyapplyteaminfo();
					S2C_one_keyapplyteaminfo.read(obj_one_keyapplyteaminfo_action, bs)
					return obj_one_keyapplyteaminfo_action;
				case ProtocolsEnum.STeamRollMelon:
					var obj_team_rollmelon_action: S2C_team_rollmelon = new S2C_team_rollmelon();
					S2C_team_rollmelon.read(obj_team_rollmelon_action, bs)
					return obj_team_rollmelon_action;
				case ProtocolsEnum.STeamRollMelonInfo:
					var obj_team_rollmeloninfo_action: S2C_team_rollmeloninfo = new S2C_team_rollmeloninfo();
					S2C_team_rollmeloninfo.read(obj_team_rollmeloninfo_action, bs)
					return obj_team_rollmeloninfo_action;
				case ProtocolsEnum.SOneTeamRollMelonInfo:
					var obj_one_teamrollmelonunfo_action: S2C_one_teamrollmelonunfo = new S2C_one_teamrollmelonunfo();
					S2C_one_teamrollmelonunfo.read(obj_one_teamrollmelonunfo_action, bs)
					return obj_one_teamrollmelonunfo_action;

				case ProtocolsEnum.SSetTeamFormation:
					var obj_set_teamformation_action: S2C_set_teamformation = new S2C_set_teamformation();
					S2C_set_teamformation.read(obj_set_teamformation_action, bs)
					return obj_set_teamformation_action;

				case ProtocolsEnum.SSetMyFormation:
					var obj_set_myformation_action: S2C_set_myformation = new S2C_set_myformation();
					S2C_set_myformation.read(obj_set_myformation_action, bs)
					return obj_set_myformation_action;

				case ProtocolsEnum.SFormationsMap:
					var obj_formations_map_action: S2C_formations_map = new S2C_formations_map();
					S2C_formations_map.read(obj_formations_map_action, bs)
					return obj_formations_map_action;

				/*case ProtocolsEnum.SRequestClanFightTeamList:
					var obj_request_clanfightteamlist_action: S2C_request_clanfightteamlist = new S2C_request_clanfightteamlist();
					S2C_request_clanfightteamlist.read(obj_request_clanfightteamlist_action, bs)
					return obj_request_clanfightteamlist_action;
				case ProtocolsEnum.SRequestClanFightRoleList:
					var obj_request_clanfightrolelist_action: S2C_request_clanfightrolelist = new S2C_request_clanfightrolelist();
					S2C_request_clanfightrolelist.read(obj_request_clanfightrolelist_action, bs)
					return obj_request_clanfightrolelist_action;
				case ProtocolsEnum.SRequestClanFightTeamRoleNum:
					var obj_request_clanfightteamrolenum_action: S2C_request_clanfightteamrolenum = new S2C_request_clanfightteamrolenum();
					S2C_request_clanfightteamrolenum.read(obj_request_clanfightteamrolenum_action, bs)
					return obj_request_clanfightteamrolenum_action;*/

				case ProtocolsEnum.SAddTitle:
					var obj_add_title_action: S2C_add_title = new S2C_add_title();
					S2C_add_title.read(obj_add_title_action, bs)
					return obj_add_title_action;
				/*case ProtocolsEnum.SRemoveTitle:
					var obj_remove_title_action: S2C_remove_title = new S2C_remove_title();
					S2C_remove_title.read(obj_remove_title_action, bs)
					return obj_remove_title_action;*/
				case ProtocolsEnum.SOnTitle:
					var obj_on_title_action: S2C_on_title = new S2C_on_title();
					S2C_on_title.read(obj_on_title_action, bs)
					return obj_on_title_action;
				case ProtocolsEnum.SOffTitle:
					var obj_off_title_action: S2C_off_title = new S2C_off_title();
					S2C_off_title.read(obj_off_title_action, bs)
					return obj_off_title_action;
				/*case ProtocolsEnum.STitleErr:
					var obj_title_err_action: S2C_title_err = new S2C_title_err();
					S2C_title_err.read(obj_title_err_action, bs)
					return obj_title_err_action;*/
				default:
					break;
			}
			return null;
		}
	}
	/** 登录错误信息返回 */
	export class S2C_error_info {
		public errorCode: number;
		public info: any;
		public static read(self: S2C_error_info, data: ByteArray): void {
			self.errorCode = data.readInt32();
			self.info = ByteArrayUtils.readUtf16String(data);
		}
	}

	export class S2C_Online_Announce {
		public userid: number;
		public localsid: number;
		public remain_time: number;
		public zoneid: number;
		public aid: number;
		public algorithm: number;
		public static read(self: S2C_Online_Announce, data: ByteArray): void {
			self.userid = data.readInt32();
			self.localsid = data.readInt32();
			self.remain_time = data.readInt32();
			self.zoneid = data.readInt32();
			self.aid = data.readInt32();
			self.algorithm = data.readInt32();
			console.log("S2C_Online_Announce self", self);
		}
	}
	//txx
	//返回角色列表
	export class S2C_SRoleList {
		public prevLoginRoleid: number;
		public prevRoleInBattle: number;// 1 = 在战斗托管中；0 = 不在游戏中	
		public roles: Array<game.modules.createrole.models.RoleInfoVo>;
		//public roleInfoVo:game.modules.createrole.models.RoleInfoVo;
		public gacdon: number;	// gacd是否开启,1为开启,0为关闭

		public static read(self: S2C_SRoleList, data: ByteArray): void {
			/*var sRoleList = Network._instance.protoTypePool.SRoleList.decode(data);
			self.prevLoginRoleid = sRoleList.prevLoginRoleid;
			self.prevRoleInBattle = sRoleList.prevRoleInBattle;
			self.roles = sRoleList.roles;
			self.gacdon = sRoleList.gacdon;
			console.log("S2C_SRoleList sRoleList:", sRoleList);*/

			self.prevLoginRoleid = data.readLong();
			self.prevRoleInBattle = data.readInt8();
			self.roles = [];
			var roleInfoVo;
			let arraySize: number = data.readByte();
			for (var index = 0; index < arraySize; index++) {
				roleInfoVo = new game.modules.createrole.models.RoleInfoVo();
				roleInfoVo.fromByteArray(data);
				self.roles.push(roleInfoVo);
			}
			self.gacdon = data.readInt32();

		}
	}

	export class S2C_create_role {
		public newRoleInfo: game.modules.createrole.models.RoleInfoVo;
		public static read(self: S2C_create_role, data: ByteArray): void {
			//let byteArray:ByteArray = new ByteArray();
			//byteArray._writeUint8Array(data);
			//byteArray.position = 0;                
			//byteArray.endian = Byte.BIG_ENDIAN;

			self.newRoleInfo = new game.modules.createrole.models.RoleInfoVo();
			self.newRoleInfo.fromByteArray(data);
			console.log("S2C_create_role self.newRoleInfo", self.newRoleInfo);
		}
		/*public static read(self: S2C_create_role, data: ByteArray): void {
			//console.log("S2C_create_role data:", data, data.buffer, data.getUint8Array());
			//var arrayBuffer:ArrayBuffer = data.dataView.buffer;			
            //var byte: Byte = new Byte(arrayBuffer);
			//var sCreatRole = Network._instance.protoTypePool.SCreateRole.decode(byte.getUint8Array(0, byte.length));

			var sCreatRole = Network._instance.protoTypePool.SCreateRole.decode(data);
			self.newRoleInfo = sCreatRole.newRoleInfo;
			console.log("S2C_create_role sCreatRole:", sCreatRole);
			console.log("S2C_create_role sCreatRole.newRoleInfo", sCreatRole.newRoleInfo);
		}*/
	}
	//进入游戏返回
	export class S2C_SEnterWorld {
		public roleDetail: game.modules.createrole.models.RoleDetailVo;
		public static read(self: S2C_SEnterWorld, data: ByteArray): void {
			/*var sEnterWorld = Network._instance.protoTypePool.SEnterWorld.decode(data);
			//self.mydata = sEnterWorld.mydata;
			var roleDetail = sEnterWorld.mydata;
			self.mydata = roleDetail;*/

			//let byteArray:ByteArray = new ByteArray();
			//byteArray._writeUint8Array(data);
			//byteArray.position = 0;                
			//byteArray.endian = Byte.BIG_ENDIAN;
			self.roleDetail = new game.modules.createrole.models.RoleDetailVo();
			self.roleDetail.fromByteArray(data);
			console.log("S2C_SEnterWorld self.roleDetail:", self.roleDetail);
		}
	}
	//服务器向客户端发送剧本
	export class S2C_SSendRoundScript {
		public playItem: Array<game.scene.models.NewResultItemVo>;
		public aiactions: Array<game.scene.models.AIOperationVo>;//随战斗脚本播放的客户端AI动作
		public roleChangedAttrs: Laya.Dictionary;				//回合结束时主角属性的变化（战斗中属性实时变化）
		public petChangedAttrs: Laya.Dictionary;				//回合结束时主角宠物属性的变化
		public fighterfinallyhps: Laya.Dictionary;				//回合结束时战斗者血量的最终值
		public fighterfinallymps: Laya.Dictionary;				//回合结束时战斗者兰量的最终值
		public static read(self: S2C_SSendRoundScript, data: ByteArray): void {
			/*var sSendRoundScript = Network._instance.protoTypePool.SSendRoundScript.decode(data);
			self.playItem = sSendRoundScript.playItem;
			self.aiactions = sSendRoundScript.aiactions;
			self.roleChangedAttrs = sSendRoundScript.roleChangedAttrs;
			self.petChangedAttrs = sSendRoundScript.petChangedAttrs;
			self.fighterfinallyhps = sSendRoundScript.fighterfinallyhps;
			self.fighterfinallymps = sSendRoundScript.fighterfinallymps;
			console.log("S2C_SSendRoundScript playItem:", sSendRoundScript.playItem);*/

			self.playItem = [];
			let playItemSize: number = data.readUint8();
			let newResultItem: game.scene.models.NewResultItemVo;
			for (var index = 0; index < playItemSize; index++) {
				newResultItem = new game.scene.models.NewResultItemVo();
				newResultItem.fromByteArray(data);
				self.playItem.push(newResultItem);
			}//NewResultItem

			self.aiactions = [];
			let aiactionsSize: number = data.readUint8();
			let aIOperation: game.scene.models.AIOperationVo;
			for (var index = 0; index < aiactionsSize; index++) {
				aIOperation = new game.scene.models.AIOperationVo();
				aIOperation.fromByteArray(data);
				self.aiactions.push(aIOperation);
			}//AIOperation

			let mapSize: number = data.readUint8();
			self.roleChangedAttrs = new Laya.Dictionary();
			for (var index = 0; index < mapSize; index++) {
				self.roleChangedAttrs.set(data.readUint32(), data.readFloat());
			}
			mapSize = data.readUint8();
			self.petChangedAttrs = new Laya.Dictionary();
			for (var index = 0; index < mapSize; index++) {
				self.petChangedAttrs.set(data.readUint32(), data.readFloat());
			}
			mapSize = data.readUint8();
			self.fighterfinallyhps = new Laya.Dictionary();
			for (var index = 0; index < mapSize; index++) {
				self.fighterfinallyhps.set(data.readUint32(), data.readUint32());
			}
			mapSize = data.readUint8();
			self.fighterfinallymps = new Laya.Dictionary();
			for (var index = 0; index < mapSize; index++) {
				self.fighterfinallymps.set(data.readUint32(), data.readUint32());
			}
			console.log("S2C_SSendRoundScript self:", self);




		}
	}
	export class S2C_notify_buysuccess {
		public notifytype: number;
		public name: string;
		public number: number;
		public money: number;
		public currency: number;
		public itemorpet: number;
		public units: string;

		public static read(self: S2C_notify_buysuccess, data: ByteArray): void {
			self.notifytype = data.readInt32();
			self.name = ByteArrayUtils.readUtf16String(data);
			self.number = data.readInt32();
			self.money = data.readInt32();
			self.currency = data.readInt32();
			self.itemorpet = data.readInt32();
			self.units = ByteArrayUtils.readUtf16String(data);
		}
	}
	export class S2C_market_upsucc {
		public israrity: number;

		public static read(self: S2C_market_upsucc, data: ByteArray): void {
			self.israrity = data.readInt32();

		}
	}
	export class S2C_get_marketupprice {
		public containertype: number;
		public price: number;
		public stallprice: number;
		public recommendations: Array<number> = [];

		public static read(self: S2C_get_marketupprice, data: ByteArray): void {
			self.containertype = data.readInt32();
			self.price = data.readInt32();
			self.stallprice = data.readInt32();
			let size = data.readInt8();
			if (size > 0) {
				for (var index = 0; index < size; index++) {
					self.recommendations.push(data.readInt32());
				}
			}
		}
	}
	export class S2C_market_pettips {
		public pettips: any;
		public tipstype: number;
		public PetInfoVo: game.modules.pet.models.PetInfoVo;
		public static read(self: S2C_market_pettips, data: ByteArray): void {
			self.PetInfoVo = new game.modules.pet.models.PetInfoVo();
			self.PetInfoVo.fromByteArray(data);
			self.pettips = self.PetInfoVo;
			self.tipstype = data.readInt32();
		}
	}


	export class S2C_market_containerbrowse {
		public actiontype: number;
		public goodslist: Array<any> = [];

		public static read(self: S2C_market_containerbrowse, data: ByteArray): void {
			self.actiontype = data.readInt32();
			let MarketGoodsVo: game.modules.sale.models.MarketGoodsVo;
			let listSize = data.readInt8();
			for (var index = 0; index < listSize; index++) {
				MarketGoodsVo = new game.modules.sale.models.MarketGoodsVo();
				MarketGoodsVo.fromByteArray(data);
				self.goodslist.push(MarketGoodsVo);
			}
		}
	}
	export class S2C_market_tradelog {
		public buylog: Array<any> = [];
		public salelog: Array<any> = [];
		public static read(self: S2C_market_tradelog, data: ByteArray): void {
			// var sMarketTradeLog = Network._instance.protoTypePool.SMarketTradeLog.decode(data);
			// self.buylog = sMarketTradeLog.buylog;
			// self.salelog = sMarketTradeLog.salelog;
			// console.log("S2C_market_tradelog sMarketTradeLog:", sMarketTradeLog);
			// console.log("S2C_market_tradelog sMarketTradeLog.buylog", sMarketTradeLog.buylog);
			// console.log("S2C_market_tradelog sMarketTradeLog.salelog", sMarketTradeLog.salelog);
			let buySize = data.readInt8();
			var LogVo1: game.modules.sale.models.LogVo;
			var LogVo2: game.modules.sale.models.LogVo;
			for (var index = 0; index < buySize; index++) {
				LogVo1 = new game.modules.sale.models.LogVo();
				LogVo1.fromByteArray(data);
			}
			self.buylog.push(LogVo1);
			let saleSize = data.readInt8();
			for (var index = 0; index < saleSize; index++) {
				LogVo2 = new game.modules.sale.models.LogVo();
				LogVo2.fromByteArray(data);
			}
			self.salelog.push(LogVo2);
		}
	}
	export class S2C_market_buy {
		public id: number;
		public surplusnum: number;

		public static read(self: S2C_market_buy, data: ByteArray): void {
			// var sMarketBuy = Network._instance.protoTypePool.SMarketBuy.decode(data);
			// self.id = sMarketBuy.id;
			// self.surplusnum = sMarketBuy.surplusnum;
			// console.log("S2C_market_buy sMarketBuy:", sMarketBuy);
			// console.log("S2C_market_buy sMarketBuy.id", sMarketBuy.id);
			// console.log("S2C_market_buy sMarketBuy.surplusnum", sMarketBuy.surplusnum);
			self.id = data.readLong();
			self.surplusnum = data.readInt32();

		}
	}
	export class S2C_market_browse {
		public browsetype: number;
		public firstno: number;
		public twono: number;
		public threeno: Array<number>;
		public itemtype: number;
		public limitmin: number;
		public limitmax: number;
		public currpage: number;
		public totalpage: number;
		public goodslist: Array<any> = [];
		public priceSort: number;
		public MarketGoodsVo: game.modules.sale.models.MarketGoodsVo;
		public static read(self: S2C_market_browse, data: ByteArray): void {
			self.browsetype = data.readInt32();
			self.firstno = data.readInt32();
			self.twono = data.readInt32();
			let size = data.readByte();
			self.threeno = [];
			for (var i = 0; i < size; i++) {
				var th = data.readInt32();
				self.threeno.push(th);
			}
			self.itemtype = data.readInt32();
			self.limitmin = data.readInt32();
			self.limitmax = data.readInt32();
			self.currpage = data.readInt32();
			self.totalpage = data.readInt32();
			let listSize = data.readByte();
			for (var i = 0; i < listSize; i++) {
				self.MarketGoodsVo = new game.modules.sale.models.MarketGoodsVo();
				self.MarketGoodsVo.fromByteArray(data);
				self.goodslist.push(self.MarketGoodsVo);
			}
			self.priceSort = data.readInt32();
		}
	}
	export class S2C_query_limit {
		public querytype: number;
		public goodslimits: Array<game.modules.shop.models.GoodsLimitVo>;

		public static read(self: S2C_query_limit, data: ByteArray): void {
			self.querytype = data.readUint32();
			self.goodslimits = [];
			var goodsLimitVo;
			let arraySize: number = ByteArrayUtils.uncompact_uint32(data);
			for (var index = 0; index < arraySize; index++) {
				goodsLimitVo = new game.modules.shop.models.GoodsLimitVo();
				goodsLimitVo.fromByteArray(data);
				self.goodslimits.push(goodsLimitVo);
			}
		}
	}
	export class S2C_response_shopprice {
		public shopid: number;
		public goodsList: Array<game.modules.pet.models.GoodsVo>;
		public static read(self: S2C_response_shopprice, data: ByteArray): void {
			self.shopid = data.readLong();
			let size: number = ByteArrayUtils.uncompact_uint32(data);
			self.goodsList = [];
			for (var index = 0; index < size; index++) {
				let goods: game.modules.pet.models.GoodsVo = new game.modules.pet.models.GoodsVo();
				goods.fromByteArray(data);
				self.goodsList.push(goods);
			}
		}
	}
	export class S2C_change_gem {

		public static read(self: S2C_change_gem, data: ByteArray): void {
			var sChangeGem = Network._instance.protoTypePool.SChangeGem.decode(data);
			console.log("S2C_change_gem sChangeGem:", sChangeGem);
		}
	}
	export class S2C_change_weapon {
		public remainChangeWeaponCount: number;
		public remainchangeClothescount: number;
		public remainchangeHelmcount: number;

		public static read(self: S2C_change_weapon, data: ByteArray): void {
			var sChangeWeapon = Network._instance.protoTypePool.SChangeWeapon.decode(data);
			self.remainChangeWeaponCount = sChangeWeapon.remainChangeWeaponCount;
			self.remainchangeClothescount = sChangeWeapon.remainchangeClothescount;
			self.remainchangeHelmcount = sChangeWeapon.remainchangeHelmcount;
			console.log("S2C_change_weapon sChangeWeapon:", sChangeWeapon);
			console.log("S2C_change_weapon sChangeWeapon.remainChangeWeaponCount", sChangeWeapon.remainChangeWeaponCount);
			console.log("S2C_change_weapon sChangeWeapon.remainchangeClothescount", sChangeWeapon.remainchangeClothescount);
			console.log("S2C_change_weapon sChangeWeapon.remainchangeHelmcount", sChangeWeapon.remainchangeHelmcount);
		}
	}
	export class S2C_change_schoolextinfo {
		public remainChangeWeaponCount: number;
		public remainchangeClothescount: number;
		public remainchangeHelmcount: number;
		public remainChangeGemCount: number;

		public static read(self: S2C_change_schoolextinfo, data: ByteArray): void {
			var sChangeSchoolExtInfo = Network._instance.protoTypePool.SChangeSchoolExtInfo.decode(data);
			self.remainChangeWeaponCount = sChangeSchoolExtInfo.remainChangeWeaponCount;
			self.remainchangeClothescount = sChangeSchoolExtInfo.remainchangeClothescount;
			self.remainchangeHelmcount = sChangeSchoolExtInfo.remainchangeHelmcount;
			self.remainChangeGemCount = sChangeSchoolExtInfo.remainChangeGemCount;
			console.log("S2C_change_schoolextinfo sChangeSchoolExtInfo:", sChangeSchoolExtInfo);
			console.log("S2C_change_schoolextinfo sChangeSchoolExtInfo.remainChangeWeaponCount", sChangeSchoolExtInfo.remainChangeWeaponCount);
			console.log("S2C_change_schoolextinfo sChangeSchoolExtInfo.remainchangeClothescount", sChangeSchoolExtInfo.remainchangeClothescount);
			console.log("S2C_change_schoolextinfo sChangeSchoolExtInfo.remainchangeHelmcount", sChangeSchoolExtInfo.remainchangeHelmcount);
			console.log("S2C_change_schoolextinfo sChangeSchoolExtInfo.remainChangeGemCount", sChangeSchoolExtInfo.remainChangeGemCount);
		}
	}
	export class S2C_old_schoollist {
		public oldShapeList: Array<number>;
		public oldSchoolList: Array<number>;

		public static read(self: S2C_old_schoollist, data: ByteArray): void {
			var sOldSchoolList = Network._instance.protoTypePool.SOldSchoolList.decode(data);
			self.oldShapeList = sOldSchoolList.oldShapeList;
			self.oldSchoolList = sOldSchoolList.oldSchoolList;
			console.log("S2C_old_schoollist sOldSchoolList:", sOldSchoolList);
			console.log("S2C_old_schoollist sOldSchoolList.oldShapeList", sOldSchoolList.oldShapeList);
			console.log("S2C_old_schoollist sOldSchoolList.oldSchoolList", sOldSchoolList.oldSchoolList);
		}
	}
	export class S2C_shouxi_shape {
		public shouxikey: number;
		public name: string;
		public shape: number;
		public components: any;
		public titleId: number;

		public static read(self: S2C_shouxi_shape, data: ByteArray): void {
			var sShouxiShape = Network._instance.protoTypePool.SShouxiShape.decode(data);
			self.shouxikey = sShouxiShape.shouxikey;
			self.name = sShouxiShape.name;
			self.shape = sShouxiShape.shape;
			self.components = sShouxiShape.components;
			self.titleId = sShouxiShape.titleId;
			console.log("S2C_shouxi_shape sShouxiShape:", sShouxiShape);
			console.log("S2C_shouxi_shape sShouxiShape.shouxikey", sShouxiShape.shouxikey);
			console.log("S2C_shouxi_shape sShouxiShape.name", sShouxiShape.name);
			console.log("S2C_shouxi_shape sShouxiShape.shape", sShouxiShape.shape);
			console.log("S2C_shouxi_shape sShouxiShape.components", sShouxiShape.components);
			console.log("S2C_shouxi_shape sShouxiShape.titleId", sShouxiShape.titleId);
		}
	}
	export class S2C_can_elect {
		public shouxikey: any;

		public static read(self: S2C_can_elect, data: ByteArray): void {
			var sCanElect = Network._instance.protoTypePool.SCanElect.decode(data);
			self.shouxikey = sCanElect.shouxikey;
			console.log("S2C_can_elect sCanElect:", sCanElect);
			console.log("S2C_can_elect sCanElect.shouxikey", sCanElect.shouxikey);
		}
	}
	export class S2C_my_elector {
		public electorwords: string;

		public static read(self: S2C_my_elector, data: ByteArray): void {
			var sMyElector = Network._instance.protoTypePool.SMyElector.decode(data);
			self.electorwords = sMyElector.electorwords;
			console.log("S2C_my_elector sMyElector:", sMyElector);
			console.log("S2C_my_elector sMyElector.electorwords", sMyElector.electorwords);
		}
	}
	export class S2C_vote_candidate {
		public alreadyVote: number;
		public candidateList: Array<any>;
		public shouxikey: number;

		public static read(self: S2C_vote_candidate, data: ByteArray): void {
			var sVoteCandidate = Network._instance.protoTypePool.SVoteCandidate.decode(data);
			self.alreadyVote = sVoteCandidate.alreadyVote;
			self.candidateList = sVoteCandidate.candidateList;
			self.shouxikey = sVoteCandidate.shouxikey;
			console.log("S2C_vote_candidate sVoteCandidate:", sVoteCandidate);
			console.log("S2C_vote_candidate sVoteCandidate.alreadyVote", sVoteCandidate.alreadyVote);
			console.log("S2C_vote_candidate sVoteCandidate.candidateList", sVoteCandidate.candidateList);
			console.log("S2C_vote_candidate sVoteCandidate.shouxikey", sVoteCandidate.shouxikey);
		}
	}
	export class S2C_send_candidates {
		public alreadyVote: number;
		public candidateList: Array<any>;
		public shouxikey: number;

		public static read(self: S2C_send_candidates, data: ByteArray): void {
			var sSendCandidates = Network._instance.protoTypePool.SSendCandidates.decode(data);
			self.alreadyVote = sSendCandidates.alreadyVote;
			self.candidateList = sSendCandidates.candidateList;
			self.shouxikey = sSendCandidates.shouxikey;
			console.log("S2C_send_candidates sSendCandidates:", sSendCandidates);
			console.log("S2C_send_candidates sSendCandidates.alreadyVote", sSendCandidates.alreadyVote);
			console.log("S2C_send_candidates sSendCandidates.candidateList", sSendCandidates.candidateList);
			console.log("S2C_send_candidates sSendCandidates.shouxikey", sSendCandidates.shouxikey);
		}
	}
	export class S2C_send_shouxiinfo {
		public shouxi: any;
		public shouxikey: number;

		public static read(self: S2C_send_shouxiinfo, data: ByteArray): void {
			var sSendShouxiInfo = Network._instance.protoTypePool.SSendShouxiInfo.decode(data);
			self.shouxi = sSendShouxiInfo.shouxi;
			self.shouxikey = sSendShouxiInfo.shouxikey;
			console.log("S2C_send_shouxiinfo sSendShouxiInfo:", sSendShouxiInfo);
			console.log("S2C_send_shouxiinfo sSendShouxiInfo.shouxi", sSendShouxiInfo.shouxi);
			console.log("S2C_send_shouxiinfo sSendShouxiInfo.shouxikey", sSendShouxiInfo.shouxikey);
		}
	}
	//帮派排名
	export class S2C_faction_rankinfo {
		public factionkey: number;
		public lastname: string;
		public title: string;
		public factionmasterid: number;

		public static read(self: S2C_faction_rankinfo, data: ByteArray): void {
			self.factionkey = data.readLong();
			self.lastname = ByteArrayUtils.readUtf16String(data);
			self.title = ByteArrayUtils.readUtf16String(data);
			self.factionmasterid = data.readLong();
		}
	}
	//查看排行榜上某排名的信息
	export class S2C_rank_roleinfo2 {
		public roleid: number;
		public ranktype: number;
		public rolename: string;
		public shape: number;
		public school: number;
		public level: number;
		public baginfo: any;
		public tips: any;
		public footlogoid: number;
		public rank: number;
		public totalscore: number;
		public rolescore: number;
		public petscore: number;
		public manypetscore: number;
		public skillscore: number;
		public levelscore: number;
		public xiulianscore: number;
		public equipscore: number;
		public components: any;
		public factionname: string;

		public static read(self: S2C_rank_roleinfo2, data: ByteArray): void {
			console.log("--------------------开始读取数据！-------------------------------");
			self.roleid = data.readLong();//validator="value=[1,)"
			self.ranktype = data.readInt32();
			self.rolename = ByteArrayUtils.readUtf16String(data);
			self.shape = data.readInt32();
			self.school = data.readInt32();
			self.level = data.readInt32();
			//self.baginfo type="fire.pb.Bag"
			//var packid:number = data.readInt32();
			self.baginfo = new BagVo();
			self.baginfo.fromByteArray(data);

			//self.tips type="map" key="int" value="octets"
			self.tips = new Laya.Dictionary();
			let map_size = ByteArrayUtils.uncompact_uint32(data);
			for (let index = 0; index < map_size; index++) {
				let key: number;
				key = data.readInt32();
				let value = new game.modules.strengThening.models.TipsVo();
				value.fromByteArray(data);
				self.tips.set(key, value);
			}
			self.footlogoid = data.readInt32();
			self.rank = data.readInt32();
			self.totalscore = data.readInt32();
			self.rolescore = data.readInt32();
			self.petscore = data.readInt32();
			self.manypetscore = data.readInt32();
			self.skillscore = data.readInt32();
			self.levelscore = data.readInt32();
			self.xiulianscore = data.readInt32();
			self.equipscore = data.readInt32();
			//self.components type="map" key="byte" value="int"
			self.components = new Laya.Dictionary();
			var _map_size = ByteArrayUtils.uncompact_uint32(data);
			for (let index = 0; index < _map_size; index++) {
				self.components.set(data.readUint8(), data.readInt32());
			}
			self.factionname = ByteArrayUtils.readUtf16String(data);
		}
	}
	export class S2C_rank_roleinfo {
		public roleid: number;
		public rolename: string;
		public shape: number;
		public level: number;
		public zonghescore: number;
		public petscore: number;
		public camp: number;
		public school: number;
		public factionname: string;
		public rank: number;

		public static read(self: S2C_rank_roleinfo, data: ByteArray): void {
			self.roleid = data.readLong();
			self.rolename = ByteArrayUtils.readUtf16String(data);
			self.shape = data.readInt32();
			self.level = data.readInt32();
			self.zonghescore = data.readInt32();
			self.petscore = data.readInt32();
			self.camp = data.readInt32();
			self.school = data.readInt32();
			self.factionname = ByteArrayUtils.readUtf16String(data);
			self.rank = data.readInt32();
		}
	}
	//查看排行榜上宠物信息
	export class S2C_send_rankpetdata {
		public uniquePetId: number;
		public petinfo: any;

		public static read(self: S2C_send_rankpetdata, data: ByteArray): void {
			self.uniquePetId = data.readLong();
			self.petinfo = new Array<any>();
			let _pet_info: PetInfoVo;
			_pet_info = new PetInfoVo();
			_pet_info.fromByteArray(data);
			self.petinfo(_pet_info);
		}
	}
	//排行榜系统各种排行榜的信息
	export class S2C_request_ranklist {
		public ranktype: number;
		public myrank: number;
		public list: Array<any>;
		public page: number;
		public hasMore: number;
		public myTitle: string;
		public takeAwardFlag: number;
		public extdata: number;
		public extdata1: number;
		public extdata2: number;
		public extdata3: string;

		public static read(self: S2C_request_ranklist, data: ByteArray): void {
			self.ranktype = data.readInt32();
			self.myrank = data.readInt32();
			self.list = new Array<any>();
			switch (self.ranktype) {//判断读取是什么类型的排行榜，然后对与之对应类型的数组填充数据，先拿人综榜测试
				case RankType.ROLE_ZONGHE_RANK://人综榜
				case RankType.ROLE_RANK://人物榜
					let _rank_renzong_info: RanKingList_renzong_InfoVo;
					var _list_size = ByteArrayUtils.uncompact_uint32(data);
					for (var _index = 0; _index < _list_size; _index++) {
						ByteArrayUtils.uncompact_uint32(data);
						_rank_renzong_info = new RanKingList_renzong_InfoVo();
						_rank_renzong_info.fromByteArray(data);
						self.list.push(_rank_renzong_info);
					}
					break;
				case RankType.LEVEL_RANK://等级榜
					let _rank_level_info: LevelRank_infoVo;
					var _list_size = ByteArrayUtils.uncompact_uint32(data);
					for (var _index = 0; _index < _list_size; _index++) {
						ByteArrayUtils.uncompact_uint32(data);
						_rank_level_info = new LevelRank_infoVo();
						_rank_level_info.fromByteArray(data);
						self.list.push(_rank_level_info);
					}
					break;
				case RankType.PET_GRADE_RANK://宠物榜
					let _rank_pet_info: PetGradeRank_infoVo;
					var _list_size = ByteArrayUtils.uncompact_uint32(data);
					for (var _index = 0; _index < _list_size; _index++) {
						ByteArrayUtils.uncompact_uint32(data);
						_rank_pet_info = new PetGradeRank_infoVo();
						_rank_pet_info.fromByteArray(data);
						self.list.push(_rank_pet_info);
					}
					break;
				case RankType.PROFESSION_WARRIOR_RANK://战士榜
				case RankType.PROFESSION_MAGIC_RANK://法师榜
				case RankType.PROFESSION_PRIEST_RANK://牧师榜
				case RankType.PROFESSION_PALADIN_RANK://圣骑榜
				case RankType.PROFESSION_HUNTER_RANK://猎人榜
				case RankType.PROFESSION_DRUID_RANK://德鲁伊榜
				case RankType.PROFESSION_ROGUE_RANK://盗贼榜
				case RankType.PROFESSION_SAMAN_RANK://萨满榜
				case RankType.PROFESSION_WARLOCK_RANK://术士榜
					let _rank_profession_info: RoleProfessionRankRecord_infoVo;
					var _list_size = ByteArrayUtils.uncompact_uint32(data);
					for (var _index = 0; _index < _list_size; _index++) {
						ByteArrayUtils.uncompact_uint32(data);
						_rank_profession_info = new RoleProfessionRankRecord_infoVo();
						_rank_profession_info.fromByteArray(data);
						self.list.push(_rank_profession_info);
					}
					break;
				case RankType.FACTION_RANK_LEVEL://帮派等级榜 
				case RankType.FACTION_ZONGHE://帮派综合实力榜
					let _rank_factionzonghe_info: FactionRankRecordEx_infoVo;
					var _list_size = ByteArrayUtils.uncompact_uint32(data);
					for (var _index = 0; _index < _list_size; _index++) {
						ByteArrayUtils.uncompact_uint32(data);
						_rank_factionzonghe_info = new FactionRankRecordEx_infoVo();
						_rank_factionzonghe_info.fromByteArray(data);
						self.list.push(_rank_factionzonghe_info);
					}
					break;
				case RankType.FACTION_MC://熔火之心榜，帮派副本之一
				case RankType.FACTION_NAXX://纳克萨玛斯榜，帮派副本之一
				case RankType.FACTION_COPY://公会副本竞速，即帮派副本竞速榜
					let _rank_factionraid_info: FactionRaidRank_infoVo;
					var _list_size = ByteArrayUtils.uncompact_uint32(data);
					for (var _index = 0; _index < _list_size; _index++) {
						ByteArrayUtils.uncompact_uint32(data);
						_rank_factionraid_info = new FactionRaidRank_infoVo();
						_rank_factionraid_info.fromByteArray(data);
						self.list.push(_rank_factionraid_info);
					}
					break;
				case RankType.PVP5_LAST_GRADE1://5v5竞技场上届初级组，上届精英组
				case RankType.PVP5_LAST_GRADE2://5v5竞技场上届中级组，上届神威组
				case RankType.PVP5_LAST_GRADE3://5v5竞技场上届高级组，上届王者组
				case RankType.PVP5_HISTORY_GRADE1://5v5竞技场历史初级组，历史精英组
				case RankType.PVP5_HISTORY_GRADE2://5v5竞技场历史中级组，历史神威组
				case RankType.PVP5_HISTORY_GRADE3://5v5竞技场历史高级组，历史王者组
					let _rank_PVP5_info: PvP5RankData_infoVo;
					var _list_size = ByteArrayUtils.uncompact_uint32(data);
					for (var _index = 0; _index < _list_size; _index++) {
						ByteArrayUtils.uncompact_uint32(data);
						_rank_PVP5_info = new PvP5RankData_infoVo();
						_rank_PVP5_info.fromByteArray(data);
						self.list.push(_rank_PVP5_info);
					}
					break;
				case RankType.RED_PACK_1://红包榜 普通服
				case RankType.RED_PACK_2://红包榜 点卡服
					let _rank_redpack_info: RedPackRankRecord_infoVo;
					var _list_size = ByteArrayUtils.uncompact_uint32(data);
					for (var _index = 0; _index < _list_size; _index++) {
						ByteArrayUtils.uncompact_uint32(data);
						_rank_redpack_info = new RedPackRankRecord_infoVo();
						_rank_redpack_info.fromByteArray(data);
						self.list.push(_rank_redpack_info);
					}
					break;
				case RankType.FLOWER_RECEIVE://收花榜
				case RankType.FLOWER_GIVE://送花榜
					let _rank_flower_info: FlowerRankRecord_infoVo;
					var _list_size = ByteArrayUtils.uncompact_uint32(data);
					for (var _index = 0; _index < _list_size; _index++) {
						ByteArrayUtils.uncompact_uint32(data);
						_rank_flower_info = new FlowerRankRecord_infoVo();
						_rank_flower_info.fromByteArray(data);
						self.list.push(_rank_flower_info);
					}
					break;
				case RankType.CLAN_FIGHT_HISTROY://公会战历史排名
					let _rank_clanFight_info: ClanFightHistroyRank_infoVo;
					var _list_size = ByteArrayUtils.uncompact_uint32(data);
					for (var _index = 0; _index < _list_size; _index++) {
						ByteArrayUtils.uncompact_uint32(data);
						_rank_clanFight_info = new ClanFightHistroyRank_infoVo();
						_rank_clanFight_info.fromByteArray(data);
						self.list.push(_rank_clanFight_info);
					}
					break;
				case RankType.CLAN_FIGHT_2://公会战竞赛排名周二那场
				case RankType.CLAN_FIGHT_4://公会战竞赛排名周四那场
				case RankType.CLAN_FIGHT_WEEK://公会战竞赛排名本轮
					let rank_clanFight_info: ClanFightRaceRank_infoVo;
					var _list_size = ByteArrayUtils.uncompact_uint32(data);
					for (var _index = 0; _index < _list_size; _index++) {
						ByteArrayUtils.uncompact_uint32(data);
						rank_clanFight_info = new ClanFightRaceRank_infoVo();
						rank_clanFight_info.fromByteArray(data);
						self.list.push(rank_clanFight_info);
					}
					break;
				default:
					console.log("服务器端读取排行榜数据失败！");
					break;
			}
			self.page = data.readInt32();
			self.hasMore = data.readInt32();
			self.myTitle = ByteArrayUtils.readUtf16String(data);
			self.takeAwardFlag = data.readByte();
			self.extdata = data.readInt32();
			self.extdata1 = data.readLong();
			self.extdata2 = data.readFloat();
			self.extdata3 = !ByteArrayUtils.readUtf16String(data) ? "" : ByteArrayUtils.readUtf16String(data);
		}
	}
	export class S2C_product_madeup {
		public maketype: number;
		public itemkey: number;

		public static read(self: S2C_product_madeup, data: ByteArray): void {
			// var sProductMadeUp = Network._instance.protoTypePool.SProductMadeUp.decode(data);
			// self.maketype = sProductMadeUp.maketype;
			// self.itemkey = sProductMadeUp.itemkey;
			self.maketype = data.readUint32();
			self.itemkey = data.readUint32();
			// console.log("S2C_product_madeup sProductMadeUp:", self.sProductMadeUp);
			console.log("S2C_product_madeup sProductMadeUp.maketype", self.maketype);
			console.log("S2C_product_madeup sProductMadeUp.itemkey", self.itemkey);
		}
	}
	export class S2C_error_code {
		public errorCode: number;

		public static read(self: S2C_error_code, data: ByteArray): void {
			// var sErrorCode = Network._instance.protoTypePool.SErrorCode.decode(data);
			// self.errorCode = sErrorCode.errorCode;
			self.errorCode = data.readInt32();
			console.log("S2C_error_code self.errorCode", self.errorCode);
		}
	}
	export class S2C_search_blackroleinfo {
		public searchBlackRole: game.modules.friend.models.SearchBlackRoleInfoVo;

		public static read(self: S2C_search_blackroleinfo, data: ByteArray): void {
			// var sSearchBlackRoleInfo = Network._instance.protoTypePool.SSearchBlackRoleInfo.decode(data);
			// self.searchBlackRole = sSearchBlackRoleInfo.searchBlackRole;
			// console.log("S2C_search_blackroleinfo sSearchBlackRoleInfo:", sSearchBlackRoleInfo);
			// console.log("S2C_search_blackroleinfo sSearchBlackRoleInfo.searchBlackRole", sSearchBlackRoleInfo.searchBlackRole);
			self.searchBlackRole = new game.modules.friend.models.SearchBlackRoleInfoVo();
			self.searchBlackRole.fromByteArray(data);
			console.log("S2C_search_blackroleinfo++++++++++++++++", self.searchBlackRole);
		}
	}
	export class S2C_black_roles {
		public blackRoles: Array<any>;
		public static read(self: S2C_black_roles, data: ByteArray): void {
			// var sBlackRoles = Network._instance.protoTypePool.SBlackRoles.decode(data);
			// self.blackRoles = sBlackRoles.blackRoles;
			// console.log("S2C_black_roles sBlackRoles:", sBlackRoles);
			// console.log("S2C_black_roles sBlackRoles.blackRoles", sBlackRoles.blackRoles);
			self.blackRoles = new Array<any>();
			let blackRolesSize: number = data.readUint8();
			let blackRoleInfo: game.modules.friend.models.BlackRoleInfoVo;
			for (var index = 0; index < blackRolesSize; index++) {
				blackRoleInfo = new game.modules.friend.models.BlackRoleInfoVo();
				blackRoleInfo.fromByteArray(data);
				self.blackRoles.push(blackRoleInfo);
			}
			console.log("S2C_black_roles+++++++++++++++++++++", self.blackRoles);
		}

	}
	export class S2C_recover_petinfo {
		public petInfo: any;

		public static read(self: S2C_recover_petinfo, data: ByteArray): void {
			self.petInfo = new game.modules.pet.models.PetInfoVo();
			self.petInfo.fromByteArray(data);
		}
	}
	export class S2C_pet_recover {
		public petId: number;
		public uniqId: number;

		public static read(self: S2C_pet_recover, data: ByteArray): void {
			self.petId = data.readInt32();
			self.uniqId = data.readLong();
		}
	}
	export class S2C_pet_recoverlist {
		public pets: Array<any>;

		public static read(self: S2C_pet_recoverlist, data: ByteArray): void {
			self.pets = [];
			let petsSize: number = data.readUint8();
			if (petsSize != 0) {
				let petRecoverInfoBean: game.modules.pet.models.PetRecoverInfoBeanVo;
				for (var index = 0; index < petsSize; index++) {
					petRecoverInfoBean = new game.modules.pet.models.PetRecoverInfoBeanVo();
					petRecoverInfoBean.fromByteArray(data);
					self.pets.push(petRecoverInfoBean);
				}
			}
		}
	}
	export class S2C_get_petinfo {
		public petinfo: game.modules.pet.models.PetInfoVo;

		public static read(self: S2C_get_petinfo, data: ByteArray): void {
			self.petinfo = new game.modules.pet.models.PetInfoVo();
			self.petinfo.fromByteArray(data);
		}
	}
	export class S2C_pet_aptitudecultivate {
		public petkey: number;
		public aptid: number;
		public aptvalue: number;

		public static read(self: S2C_pet_aptitudecultivate, bytes: ByteArray): void {
			self.petkey = bytes.readInt32();
			self.aptid = bytes.readInt32();
			self.aptvalue = bytes.readInt32();
		}
	}
	export class S2C_pet_skillcertification {
		public petkey: number;
		public skillId: number;
		public isconfirm: number;

		public static read(self: S2C_pet_skillcertification, bytes: ByteArray): void {
			self.petkey = bytes.readInt32();
			self.skillId = bytes.readInt32();
			self.isconfirm = bytes.readInt32();
		}
	}
	export class S2C_pet_synthesize {
		public petkey: any;
		public static read(self: S2C_pet_synthesize, bytes: ByteArray): void {
			self.petkey = bytes.readInt32();
		}
	}
	export class S2C_pet_wash {
		public petkey: any;

		public static read(self: S2C_pet_wash, bytes: ByteArray): void {
			self.petkey = bytes.readInt32();
		}
	}
	export class S2C_pet_setautoaddpoint {
		public petkey: number;
		public str: number;
		public iq: number;
		public cons: number;
		public endu: number;
		public agi: number;

		public static read(self: S2C_pet_setautoaddpoint, bytes: ByteArray): void {
			self.petkey = bytes.readInt32();
			self.str = bytes.readInt32();
			self.iq = bytes.readInt32();
			self.cons = bytes.readInt32();
			self.endu = bytes.readInt32();
			self.agi = bytes.readInt32();
		}
	}
	export class S2C_refresh_petscore {
		public petkey: number;
		public petscore: number;
		public petbasescore: number;

		public static read(self: S2C_refresh_petscore, bytes: ByteArray): void {
			self.petkey = bytes.readInt32();
			self.petscore = bytes.readInt32();
			self.petbasescore = bytes.readInt32();
		}
	}
	export class S2C_refresh_petcolumncapacity {
		public columnid: number;
		public capacity: number;

		public static read(self: S2C_refresh_petcolumncapacity, bytes: ByteArray): void {
			self.columnid = bytes.readInt32();
			self.capacity = bytes.readInt32();
		}
	}
	export class S2C_show_petinfo {
		public isXunBaoPet: number;
		public petdata: any;

		public static read(self: S2C_show_petinfo, bytes: ByteArray): void {
			self.isXunBaoPet = bytes.readInt32();
			self.petdata = new game.modules.pet.models.PetInfoVo();
			self.petdata.fromByteArray(bytes);
		}
	}
	export class S2C_refresh_petskill {
		public petkey: number;
		public skills: Array<any>;
		public expiredtimes: any;

		public static read(self: S2C_refresh_petskill, bytes: ByteArray): void {
			self.petkey = bytes.readInt32();
			self.skills = [];
			let skillsSize: number = bytes.readUint8();
			let petskill: game.modules.pet.models.PetSkillVo;
			for (var index = 0; index < skillsSize; index++) {
				petskill = new game.modules.pet.models.PetSkillVo();
				petskill.fromByteArray(bytes);
				self.skills.push(petskill);
			}
			let mapSize: number = bytes.readUint8();
			self.expiredtimes = new Laya.Dictionary();
			for (var index = 0; index < mapSize; index++) {
				self.expiredtimes.set(bytes.readInt32(), bytes.readLong());
			}
		}
	}
	export class S2C_pet_gossip {
		public battleid: number;
		public chatindex: number;

		public static read(self: S2C_pet_gossip, bytes: ByteArray): void {
			self.battleid = bytes.readInt32();
			self.chatindex = bytes.readInt32();
		}
	}
	export class S2C_mod_petname {
		public roleid: number;
		public petkey: number;
		public petname: string;

		public static read(self: S2C_mod_petname, bytes: ByteArray): void {
			self.roleid = bytes.readLong();
			self.petkey = bytes.readInt32();
			self.petname = ByteArrayUtils.readUtf16String(bytes);
		}
	}
	export class S2C_pet_error {
		public peterror: number;

		public static read(self: S2C_pet_error, bytes: ByteArray): void {
			self.peterror = bytes.readInt32();
		}
	}
	export class S2C_get_petcolumninfo {
		public columnid: number;
		public pets: Array<any>;
		public colunmSize: number;

		public static read(self: S2C_get_petcolumninfo, bytes: ByteArray): void {
			self.columnid = bytes.readInt32();
			self.pets = [];
			let petsSize: number = bytes.readUint8();
			let pet: game.modules.pet.models.PetInfoVo;
			for (var index = 0; index < petsSize; index++) {
				pet = new game.modules.pet.models.PetInfoVo();
				pet.fromByteArray(bytes);
				self.pets.push(pet);
			}
			self.colunmSize = bytes.readInt32();
		}
	}
	export class S2C_remove_petfromcol {
		public columnid: number;
		public petkey: number;

		public static read(self: S2C_remove_petfromcol, bytes: ByteArray): void {
			self.columnid = bytes.readInt32();
			self.petkey = bytes.readInt32();
		}
	}
	export class S2C_add_pettocolumn {
		public columnid: number;
		public petdata: any;

		public static read(self: S2C_add_pettocolumn, data: ByteArray): void {
			self.columnid = data.readInt32();
			self.petdata = new game.modules.pet.models.PetInfoVo();
			self.petdata.fromByteArray(data);
		}
	}
	export class S2C_set_fightpetrest {
		public isinbattle: any;

		public static read(self: S2C_set_fightpetrest, bytes: ByteArray): void {
			self.isinbattle = bytes.readByte();
		}
	}
	export class S2C_set_fightpet {
		public petkey: number;
		public isinbattle: number;

		public static read(self: S2C_set_fightpet, bytes: ByteArray): void {
			self.petkey = bytes.readInt32();
			self.isinbattle = bytes.readByte();
		}
	}
	export class S2C_refresh_petexp {
		public petkey: number;
		public curexp: number;

		public static read(self: S2C_refresh_petexp, bytes: ByteArray): void {
			self.petkey = bytes.readInt32();
			self.curexp = bytes.readLong();
		}
	}
	export class S2C_refresh_petinfo {
		public petinfo: any;

		public static read(self: S2C_refresh_petinfo, bytes: ByteArray): void {
			self.petinfo = new game.modules.pet.models.PetInfoVo();
			self.petinfo.fromByteArray(bytes);
		}
	}
	export class S2C_show_petaround {
		public roleid: number;
		public showpetkey: number;
		public showpetid: number;
		public showpetname: string;
		public colour: number;
		public size: number;
		public showeffect: number;

		public static read(self: S2C_show_petaround, data: ByteArray): void {
			self.roleid = data.readLong();
			self.showpetkey = data.readInt32();
			self.showpetid = data.readInt32();
			self.showpetname = ByteArrayUtils.readUtf16String(data);
			self.colour = data.readByte();
			self.size = data.readByte();
			self.showeffect = data.readByte();
		}
	}
	export class S2C_send_npcservice {
		public npckey: number;
		public service: number;
		public title: string;

		public static read(self: S2C_send_npcservice, data: ByteArray): void {
			self.npckey = data.readLong();
			self.service = data.readInt32();
			self.title = ByteArrayUtils.readUtf16String(data);
		}
	}
	export class S2C_macth_result {
		public npckey: number;
		public result: number;

		public static read(self: S2C_macth_result, data: ByteArray): void {
			var sMacthResult = Network._instance.protoTypePool.SMacthResult.decode(data);
			self.npckey = sMacthResult.npckey;
			self.result = sMacthResult.result;
			console.log("S2C_macth_result sMacthResult:", sMacthResult);
			console.log("S2C_macth_result sMacthResult.npckey", sMacthResult.npckey);
			console.log("S2C_macth_result sMacthResult.result", sMacthResult.result);
		}
	}
	export class S2C_npc_battletime {
		public npcid: number;
		public npckey: number;
		public usetime: number;
		public lasttime: number;

		public static read(self: S2C_npc_battletime, data: ByteArray): void {
			var sNpcBattleTime = Network._instance.protoTypePool.SNpcBattleTime.decode(data);
			self.npcid = sNpcBattleTime.npcid;
			self.npckey = sNpcBattleTime.npckey;
			self.usetime = sNpcBattleTime.usetime;
			self.lasttime = sNpcBattleTime.lasttime;
			console.log("S2C_npc_battletime sNpcBattleTime:", sNpcBattleTime);
			console.log("S2C_npc_battletime sNpcBattleTime.npcid", sNpcBattleTime.npcid);
			console.log("S2C_npc_battletime sNpcBattleTime.npckey", sNpcBattleTime.npckey);
			console.log("S2C_npc_battletime sNpcBattleTime.usetime", sNpcBattleTime.usetime);
			console.log("S2C_npc_battletime sNpcBattleTime.lasttime", sNpcBattleTime.lasttime);
		}
	}
	export class S2C_ping_ji {
		public grade: number;
		public exp: number;

		public static read(self: S2C_ping_ji, data: ByteArray): void {
			self.grade = data.readByte();
			self.exp = data.readInt32();
		}
	}
	export class S2C_visit_npccontainchatmsg {
		public npckey: number;
		public services: Array<number>;
		public scenarioquests: Array<number>;
		public msgId: number;
		public parameters: Array<any>;

		public static read(self: S2C_visit_npccontainchatmsg, data: ByteArray): void {
			var sVisitNpcContainChatMsg = Network._instance.protoTypePool.SVisitNpcContainChatMsg.decode(data);
			self.npckey = sVisitNpcContainChatMsg.npckey;
			self.services = sVisitNpcContainChatMsg.services;
			self.scenarioquests = sVisitNpcContainChatMsg.scenarioquests;
			self.msgId = sVisitNpcContainChatMsg.msgId;
			self.parameters = sVisitNpcContainChatMsg.parameters;
			console.log("S2C_visit_npccontainchatmsg sVisitNpcContainChatMsg:", sVisitNpcContainChatMsg);
			console.log("S2C_visit_npccontainchatmsg sVisitNpcContainChatMsg.npckey", sVisitNpcContainChatMsg.npckey);
			console.log("S2C_visit_npccontainchatmsg sVisitNpcContainChatMsg.services", sVisitNpcContainChatMsg.services);
			console.log("S2C_visit_npccontainchatmsg sVisitNpcContainChatMsg.scenarioquests", sVisitNpcContainChatMsg.scenarioquests);
			console.log("S2C_visit_npccontainchatmsg sVisitNpcContainChatMsg.msgId", sVisitNpcContainChatMsg.msgId);
			console.log("S2C_visit_npccontainchatmsg sVisitNpcContainChatMsg.parameters", sVisitNpcContainChatMsg.parameters);
		}
	}
	export class S2C_activity_answerquestionhelp {
		public helpnum: number;

		public static read(self: S2C_activity_answerquestionhelp, data: ByteArray): void {
			var sActivityAnswerQuestionHelp = Network._instance.protoTypePool.SActivityAnswerQuestionHelp.decode(data);
			self.helpnum = sActivityAnswerQuestionHelp.helpnum;
			console.log("S2C_activity_answerquestionhelp sActivityAnswerQuestionHelp:", sActivityAnswerQuestionHelp);
			console.log("S2C_activity_answerquestionhelp sActivityAnswerQuestionHelp.helpnum", sActivityAnswerQuestionHelp.helpnum);
		}
	}
	export class S2C_grab_activityreward {		//此服务端消息属性为空

		public static read(self: S2C_grab_activityreward, data: ByteArray): void {		//此服务端消息属性为空
			var sGrabActivityReward = Network._instance.protoTypePool.SGrabActivityReward.decode(data);
			console.log("S2C_grab_activityreward sGrabActivityReward:", sGrabActivityReward);
		}
	}
	export class S2C_ask_question {
		public lastresult: number;
		public questionid: number;
		public questiontype: number;
		public npckey: number;
		public xiangguanid: number;
		public lasttime: number;
		public cur: number;
		public num: number;
		public totalexp: number;
		public totalmoney: number;
		public helptimes: number;
		public grab: number;
		public rightanswer: Array<number>;

		public static read(self: S2C_ask_question, data: ByteArray): void {
			var sAskQuestion = Network._instance.protoTypePool.SAskQuestion.decode(data);
			self.lastresult = sAskQuestion.lastresult;
			self.questionid = sAskQuestion.questionid;
			self.questiontype = sAskQuestion.questiontype;
			self.npckey = sAskQuestion.npckey;
			self.xiangguanid = sAskQuestion.xiangguanid;
			self.lasttime = sAskQuestion.lasttime;
			self.cur = sAskQuestion.cur;
			self.num = sAskQuestion.num;
			self.totalexp = sAskQuestion.totalexp;
			self.totalmoney = sAskQuestion.totalmoney;
			self.helptimes = sAskQuestion.helptimes;
			self.grab = sAskQuestion.grab;
			self.rightanswer = sAskQuestion.rightanswer;
			console.log("S2C_ask_question sAskQuestion:", sAskQuestion);
			console.log("S2C_ask_question sAskQuestion.lastresult", sAskQuestion.lastresult);
			console.log("S2C_ask_question sAskQuestion.questionid", sAskQuestion.questionid);
			console.log("S2C_ask_question sAskQuestion.questiontype", sAskQuestion.questiontype);
			console.log("S2C_ask_question sAskQuestion.npckey", sAskQuestion.npckey);
			console.log("S2C_ask_question sAskQuestion.xiangguanid", sAskQuestion.xiangguanid);
			console.log("S2C_ask_question sAskQuestion.lasttime", sAskQuestion.lasttime);
			console.log("S2C_ask_question sAskQuestion.cur", sAskQuestion.cur);
			console.log("S2C_ask_question sAskQuestion.num", sAskQuestion.num);
			console.log("S2C_ask_question sAskQuestion.totalexp", sAskQuestion.totalexp);
			console.log("S2C_ask_question sAskQuestion.totalmoney", sAskQuestion.totalmoney);
			console.log("S2C_ask_question sAskQuestion.helptimes", sAskQuestion.helptimes);
			console.log("S2C_ask_question sAskQuestion.grab", sAskQuestion.grab);
			console.log("S2C_ask_question sAskQuestion.rightanswer", sAskQuestion.rightanswer);
		}
	}
	export class S2C_general_summoncommand {
		public summontype: number;
		public roleid: number;
		public npckey: number;
		public mapid: number;
		public minimal: number;

		public static read(self: S2C_general_summoncommand, data: ByteArray): void {
			var sGeneralSummonCommand = Network._instance.protoTypePool.SGeneralSummonCommand.decode(data);
			self.summontype = sGeneralSummonCommand.summontype;
			self.roleid = sGeneralSummonCommand.roleid;
			self.npckey = sGeneralSummonCommand.npckey;
			self.mapid = sGeneralSummonCommand.mapid;
			self.minimal = sGeneralSummonCommand.minimal;
			console.log("S2C_general_summoncommand sGeneralSummonCommand:", sGeneralSummonCommand);
			console.log("S2C_general_summoncommand sGeneralSummonCommand.summontype", sGeneralSummonCommand.summontype);
			console.log("S2C_general_summoncommand sGeneralSummonCommand.roleid", sGeneralSummonCommand.roleid);
			console.log("S2C_general_summoncommand sGeneralSummonCommand.npckey", sGeneralSummonCommand.npckey);
			console.log("S2C_general_summoncommand sGeneralSummonCommand.mapid", sGeneralSummonCommand.mapid);
			console.log("S2C_general_summoncommand sGeneralSummonCommand.minimal", sGeneralSummonCommand.minimal);
		}
	}
	export class S2C_winner_changetask {	//此服务端消息属性为空

		public static read(self: S2C_winner_changetask, data: ByteArray): void {
			var sWinnerChangeTask = Network._instance.protoTypePool.SWinnerChangeTask.decode(data);
			console.log("S2C_winner_changetask sWinnerChangeTask:", sWinnerChangeTask);
		}
	}
	export class S2C_query_impexamstate {
		public isattend: number;

		public static read(self: S2C_query_impexamstate, data: ByteArray): void {
			var sQueryImpExamState = Network._instance.protoTypePool.SQueryImpExamState.decode(data);
			self.isattend = sQueryImpExamState.isattend;
			console.log("S2C_query_impexamstate sQueryImpExamState:", sQueryImpExamState);
			console.log("S2C_query_impexamstate sQueryImpExamState.isattend", sQueryImpExamState.isattend);
		}
	}
	export class S2C_imp_examhelp {
		public helpcnt: number;
		public static read(self: S2C_imp_examhelp, data: ByteArray): void {
			self.helpcnt = data.readByte();
		}
	}
	export class S2C_send_impexamassist {
		public impexamtype: number;	//考试类型
		public assisttype: number;//协助类型
		public answerid: number;//答案的id，在去除错误的协助类型下是错误答案的id

		public static read(self: S2C_send_impexamassist, data: ByteArray): void {
			self.impexamtype = data.readByte();
			self.assisttype = data.readByte();
			self.answerid = data.readInt32();
		}
	}
	export class S2C_send_impexamstart {
		public remaintime: number;//距离活动结束时间毫秒 long
		public impexamtype: number; //byte
		public historymaxright: number;//历史最多答对题目数 int
		public historymintime: number;//历史最短用时 long
		public static read(self: S2C_send_impexamstart, data: ByteArray): void {
			self.remaintime = ByteArrayUtils.readLong(data);
			self.impexamtype = data.readByte();
			self.historymaxright = data.readInt32();
			self.historymintime = ByteArrayUtils.readLong(data);
		}
	}
	export class S2C_send_impexamstate {
		public impexamdata: any;
		public historymintime: number;//历史最短用时
		public historymaxright: number;//历史最多答对题目数
		public titlename: string;//获得的称号
		public lost: number;//0=继续 1=失败
		public impexamusetime: number;//当前考试用时

		public static read(self: S2C_send_impexamstate, data: ByteArray): void {
			self.impexamdata = new game.modules.keju.models.ImpExamBeanVo();
			self.impexamdata.fromByteArray(data);
			self.historymintime = ByteArrayUtils.readLong(data);
			self.historymaxright = data.readInt32();
			self.titlename = ByteArrayUtils.readUtf16String(data);
			self.lost = data.readByte();
			self.impexamusetime = ByteArrayUtils.readLong(data);

		}
	}
	export class S2C_send_impexamprov {
		public impexamdata: any;
		public lost: number;//0=继续 1=失败
		public titlename: string;//获得的称号
		public rightmap: any;

		public static read(self: S2C_send_impexamprov, data: ByteArray): void {
			self.impexamdata = new game.modules.keju.models.ImpExamBeanVo();
			self.impexamdata.fromByteArray(data);
			self.lost = data.readByte();
			self.titlename = ByteArrayUtils.readUtf16String(data);
			let mapSize: number = data.readUint8();
			self.rightmap = new Laya.Dictionary();
			for (var index = 0; index < mapSize; index++) {
				self.rightmap.set(data.readInt32(), data.readInt32());
			}

		}
	}
	export class S2C_send_impexamvill {
		public impexamdata: game.modules.keju.models.ImpExamBeanVo; //
		public historyright: number; //历史最多答对题目数
		public isover: number;  // 结束 0=没结束 1=结束

		public static read(self: S2C_send_impexamvill, data: ByteArray): void {
			self.impexamdata = new game.modules.keju.models.ImpExamBeanVo();
			self.impexamdata.fromByteArray(data);
			self.historyright = data.readInt32();
			self.isover = data.readByte();
		}
	}
	/** 进入游戏的时候发起的确认框 */
	export class S2C_attend_impexam {
		public impexamtype: number;
		public static read(self: S2C_attend_impexam, data: ByteArray): void {
			self.impexamtype = data.readInt32();
		}
	}
	//驱逐成员返回
	export class s2c_SFireMember {
		public memberroleid: number
		public static read(self: s2c_SFireMember, data: ByteArray): void {
			self.memberroleid = data.readLong();
		}
	}
	//返回职务
	export class s2c_SRefreshPosition {
		public roleid: number;
		public position: number;

		public static read(self: s2c_SRefreshPosition, data: ByteArray): void {
			self.roleid = data.readLong();
			self.position = data.readInt32();
		}
	}
	//公会邀请
	export class s2c_SClanInvitation {
		public hostroleid: number;
		public hostrolename: string;
		public clanlevel: number;
		public clannname: string;
		public invitetype: number;

		public static read(self: s2c_SClanInvitation, data: ByteArray): void {
			self.hostroleid = data.readLong();
			self.hostrolename = ByteArrayUtils.readUtf16String(data);
			self.clanlevel = data.readInt32();
			self.clannname = ByteArrayUtils.readUtf16String(data);
			self.invitetype = data.readByte();
		}
	}
	//服务器返回新宗旨
	export class s2c_SChangeClanAim {
		public newaim: string;
		public static read(self: s2c_SChangeClanAim, data: ByteArray): void {
			self.newaim = ByteArrayUtils.readUtf16String(data);
		}
	}
	//服务器返回拒绝申请人员
	export class s2c_SRefuseApply {
		public applyroleid: number;
		public static read(self: s2c_SRefuseApply, data: ByteArray): void {
			self.applyroleid = ByteArrayUtils.readLong(data);
		}
	}
	//服务端返回申请加入公会的人员列表
	export class s2c_SRequestApply {
		public applylist: Array<any> = [];
		public static read(self: s2c_SRequestApply, data: ByteArray): void {
			var RoleBaseInfoVo: game.modules.family.models.RoleBaseInfoVo;
			let size = data.readInt8();
			for (var i = 0; i < size; i++) {
				RoleBaseInfoVo = new game.modules.family.models.RoleBaseInfoVo();
				RoleBaseInfoVo.fromByteArray(data);
				self.applylist.push(RoleBaseInfoVo);
			}
		}
	}
	//服务端响应客户端请求公会列表协议：没有公会
	export class s2c_SLeaveClan {
		public memberid: number
		public static read(self: s2c_SLeaveClan, data: ByteArray): void {
			// var SLeaveClan = Network._instance.protoTypePool.SLeaveClan.decode(data);
			// console.log("SLeaveClan memberid:", SLeaveClan.memberid);
			self.memberid = data.readLong();
		}
	}
	//服务端响应客户端请求公会界面协议：有公会
	export class s2c_SOpenClan {
		// public house: any;
		// public costmax: any;
		// public claninstservice: any;
		// public memberlist: any;
		public index: number;   //公会序号
		public clanname: string;  //公会名称
		public clanid: number;  //公会id
		public clanlevel: number;  //公会等级
		public membersnum: number;  //成员人数
		public clanmaster: string;  //帮主
		public masterid: number;  //帮主ID
		public vicemasterid: number;  //副帮主ID
		public clancreator: string;  //创始人
		public clanaim: string;  //公会宗旨
		public memberlist: Array<any>;  //公会成员列表
		public money: number;  //公会资金
		public house: Dictionary;  //2是金库3是药房4是旅店   3个建筑的等级 
		public oldclanname: string;  //公会曾用名
		public clancreatorid: number;  //创始人ID
		public autostate: number;  //公会自动接收申请人入会的状态：0关闭 1开启
		public requestlevel: number;  //公会自动接收申请人入会的等级
		public applylevel: number;  //提交申请的等级限制
		public costeverymoney: number;  //每天维护需要的资金
		public costmax: Dictionary;  //1是大厅 2是金库3是药房4是旅店   4个建筑升级需要的最大资金
		public claninstservice: Dictionary;  //公会副本  key 是进入副本服务编号 value 是是否是选中的副本
		public static read(self: s2c_SOpenClan, data: ByteArray): void {
			self.index = data.readInt32();
			self.clanname = ByteArrayUtils.readUtf16String(data);
			self.clanid = data.readLong();
			self.clanlevel = data.readInt32();
			self.membersnum = data.readInt32();
			self.clanmaster = ByteArrayUtils.readUtf16String(data);
			self.masterid = data.readLong();
			self.vicemasterid = data.readLong();
			self.clancreator = ByteArrayUtils.readUtf16String(data);
			self.clanaim = ByteArrayUtils.readUtf16String(data);

			self.memberlist = [];
			let memberlistSize: number = data.readUint8();
			let clanMember: game.modules.family.models.ClanMemberVo;
			for (var index = 0; index < memberlistSize; index++) {
				clanMember = new game.modules.family.models.ClanMemberVo();
				clanMember.fromByteArray(data);
				self.memberlist.push(clanMember);
			}//ClanMember
			self.money = data.readInt32();

			let mapSize: number = data.readUint8();
			self.house = new Laya.Dictionary();
			for (var index = 0; index < mapSize; index++) {
				self.house.set(data.readUint32(), data.readUint32());
			}
			self.oldclanname = ByteArrayUtils.readUtf16String(data);
			self.clancreatorid = data.readLong();
			self.autostate = data.readInt32();
			self.requestlevel = data.readInt16();
			self.applylevel = data.readInt16();
			self.costeverymoney = data.readInt32();

			mapSize = data.readUint8();
			self.costmax = new Laya.Dictionary();
			for (var index = 0; index < mapSize; index++) {
				self.costmax.set(data.readUint32(), data.readUint32());
			}
			mapSize = data.readUint8();
			self.claninstservice = new Laya.Dictionary();
			for (var index = 0; index < mapSize; index++) {
				self.claninstservice.set(data.readUint32(), data.readUint32());
			}
		}
	}
	//服务端响应客户端请求公会列表协议：没有公会
	export class s2c_SOpenClanList {
		public currpage: number;
		public clanlist: Array<any> = [];
		public static read(self: s2c_SOpenClanList, data: ByteArray): void {
			self.currpage = data.readInt32();
			let ClanSummaryInfoVo: game.modules.family.models.ClanSummaryInfoVo;
			let size = data.readInt8();
			for (var i = 0; i < size; i++) {
				ClanSummaryInfoVo = new game.modules.family.models.ClanSummaryInfoVo();
				ClanSummaryInfoVo.fromByteArray(data);
				self.clanlist.push(ClanSummaryInfoVo);
			}
		}
	}
	//返回请求药房信息
	export class s2c_SOpenClanMedic {
		public selecttype: number;
		public buyitemnum: number;
		public medicitemlist = [];
		public static read(self: s2c_SOpenClanMedic, data: ByteArray): void {
			self.selecttype = data.readInt32();
			self.buyitemnum = data.readInt32();
			let MedicItemVo: game.modules.family.models.MedicItemVo;
			let size = data.readInt8();
			for (var i = 0; i < size; i++) {
				MedicItemVo = new game.modules.family.models.MedicItemVo();
				MedicItemVo.fromByteArray(data);
				self.medicitemlist.push(MedicItemVo);
			}

		}
	}
	//返回寻宝结果
	export class s2c_SLengendAnYetask {
		/** 结果 */
		public result: number;
		public static read(self: s2c_SLengendAnYetask, data: ByteArray): void {
			self.result = data.readInt32();
		}
	}
	/** 暗夜马戏团任务相关 */
	export class s2c_SRefreshAnYeData {
		/** 任务累计次数 */
		public times: number;
		/** 已经任性次数 */
		public renxins: number;
		/** 任务信息 */
		public anyetasks: any;
		/** 奖励经验 */
		public awardexp: number;//long型数据
		/** 奖励银币 */
		public awardsilver: number;//long型数据
		/** 奖励金币 */
		public swardgold: number;//long型数据
		/** 首次参加时间 */
		public jointime: number;//long型数据
		/** 当前的在传说任务，如果是超出0~7（显示范围）外的值，代表当前没有传说任务 */
		public legendpos: number;

		public static read(self: s2c_SRefreshAnYeData, data: ByteArray): void {
			self.times = data.readInt32();
			self.renxins = data.readInt32();
			self.anyetasks = [];
			let _dataSize = ByteArrayUtils.uncompact_uint32(data);
			for (let i = 0; i < _dataSize; i++) {
				let _anyetasks = new AnYeTaskVo();
				_anyetasks.fromByteArray(data);
				self.anyetasks.push(_anyetasks);
			}
			self.awardexp = data.readLong();
			self.awardsilver = data.readLong();
			self.swardgold = data.readLong();
			self.jointime = data.readLong();
			self.legendpos = data.readInt32();
		}
	}
	//回复任务状态
	export class s2c_SQueryCircleTaskState {
		public questid: number;
		public state: number;
		public static read(self: s2c_SQueryCircleTaskState, data: ByteArray): void {
			self.questid = data.readUint32();
			self.state = data.readUint32();
		}
	}
	//服务通知客户端任性
	export class s2c_SRenXingCircleTask {
		public static read(self: s2c_SRenXingCircleTask, data: ByteArray): void {
			var SRenXingCircleTask = Network._instance.protoTypePool.SRenXingCircleTask.decode(data);
			console.log("SRenXingCircleTask serviceid:", SRenXingCircleTask.serviceid);
			console.log("SRenXingCircleTask questid:", SRenXingCircleTask.questid);
			console.log("SRenXingCircleTask renxingtimes:", SRenXingCircleTask.renxingtimes);
			console.log("SRenXingCircleTask npckey:", SRenXingCircleTask.npckey);
		}
	}
	//问卷调查获得称号和经验
	export class s2c_SQuestionnaireTitleAndExp {
		public static read(self: s2c_SQuestionnaireTitleAndExp, data: ByteArray): void {
			var SQuestionnaireTitleAndExp = Network._instance.protoTypePool.SQuestionnaireTitleAndExp.decode(data);
			console.log("SQuestionnaireTitleAndExp title:", SQuestionnaireTitleAndExp.title);
			console.log("SQuestionnaireTitleAndExp exp:", SQuestionnaireTitleAndExp.exp);
		}
	}
	/** 任务数据发生变化时，服务器向客户端发送的刷新消息 */
	export class s2c_SRefreshQuestData {
		/** 刷新的任务id */
		public questid: number;
		/** 变量值ID(参见RefreshDataType)，变量值 */
		public datas: any;
		public static read(self: s2c_SRefreshQuestData, data: ByteArray): void {
			self.questid = data.readInt32();
			self.datas = new Laya.Dictionary();
			let size = data.readUint8();
			for (var index = 0; index < size; index++) {
				self.datas.set(data.readInt32(), data.readLong());
			}
		}
	}
	//角色上线的时候服务器发给客户端所有当前未完成的任务列表
	export class s2c_SSendActiveQuestList {
		public memberlist: Array<any>;
		public static read(self: s2c_SSendActiveQuestList, data: ByteArray): void {
			self.memberlist = [];
			let memberlistSize: number = data.readUint8();
			let activeQuestData: game.modules.task.models.ActiveQuestDataVo;
			for (var index = 0; index < memberlistSize; index++) {
				activeQuestData = new game.modules.task.models.ActiveQuestDataVo();
				activeQuestData.fromByteArray(data);
				self.memberlist.push(activeQuestData);
			}

		}
	}
	export class s2c_SRefreshActiveQuest {
		public questdata: game.modules.task.models.ActiveQuestDataVo;
		public static read(self: s2c_SRefreshActiveQuest, data: ByteArray): void {
			self.questdata = new game.modules.task.models.ActiveQuestDataVo();
			self.questdata.fromByteArray(data);
		}
	}
	export class s2c_SRefreshSpecialQuestState {
		public questid: number;
		public state: number;
		public static read(self: s2c_SRefreshSpecialQuestState, data: ByteArray): void {
			self.questid = data.readUint32();
			self.state = data.readUint32();
		}
	}
	export class s2c_SRefreshSpecialQuest {
		public menpaitaks: game.modules.task.models.SRefreshSpecialQuestVo;
		public static read(self: s2c_SRefreshSpecialQuest, data: ByteArray): void {
			self.menpaitaks = new game.modules.task.models.SRefreshSpecialQuestVo();
			self.menpaitaks.fromByteArray(data);
		}
	}
	//buff改变结果更新协议
	export class s2c_SBuffChangeResult {
		public agentType: number;
		public id: number;
		public petid: number;
		public addedbuffs: Laya.Dictionary;
		public deletedBuffs: Array<number>;
		public static read(self: s2c_SBuffChangeResult, data: ByteArray): void {
			/*var SBuffChangeResult = Network._instance.protoTypePool.SBuffChangeResult.decode(data);
			self.addedbuffs = SBuffChangeResult.addedbuffs;
			console.log("SBuffChangeResult agentType:", SBuffChangeResult.agentType);*/

			self.agentType = data.readUint32();
			self.id = data.readLong();
			self.petid = data.readUint32();

			self.addedbuffs = new Laya.Dictionary();
			let addedbuffsSize: number = data.readUint8();
			/*let sBuffChangeResult:SBuffChangeResultVo;
			for (var index = 0; index < addedbuffsSize; index++) {
				sBuffChangeResult = new SBuffChangeResultVo();
				self.addedbuffs.set(data.readUint32(),sBuffChangeResult);
				sBuffChangeResult.fromByteArray(data);
			}
			self.deletedBuffs = [];	
			let deletedBuffsSize:number = data.readUint8();
			for (var index = 0; index < deletedBuffsSize; index++) {
				self.deletedBuffs.push(data.readLong());
			}*/
			console.log("s2c_SBuffChangeResult self:", self);

		}
	}
	//
	export class s2c_SSetBattleFlag {
		public static read(self: s2c_SSetBattleFlag, data: ByteArray): void {
			var SSetBattleFlag = Network._instance.protoTypePool.SSetBattleFlag.decode(data);
			console.log("SSetBattleFlag opttype:", SSetBattleFlag.opttype);
			console.log("SSetBattleFlag index:", SSetBattleFlag.index);
			console.log("SSetBattleFlag flag:", SSetBattleFlag.flag);
		}
	}
	// 
	export class s2c_SSetCommander {
		public roleId: number;
		public static read(self: s2c_SSetCommander, data: ByteArray): void {
			self.roleId = ByteArrayUtils.readLong(data);
		}
	}
	// 
	export class s2c_SModifyBattleFlag {
		public static read(self: s2c_SModifyBattleFlag, data: ByteArray): void {
			var SModifyBattleFlag = Network._instance.protoTypePool.SModifyBattleFlag.decode(data);
			console.log("SModifyBattleFlag opttype:", SModifyBattleFlag.opttype);
			console.log("SModifyBattleFlag index:", SModifyBattleFlag.index);
			console.log("SModifyBattleFlag flag:", SModifyBattleFlag.flag);
		}
	}
	// 
	export class s2c_SSendBattleFlag {
		public friendflags: Array<any> = [];
		public enemyflags: Array<any> = [];
		public static read(self: s2c_SSendBattleFlag, data: ByteArray): void {
			let friendflagsSize = ByteArrayUtils.uncompact_uint32(data);
			for (var index = 0; index < friendflagsSize; index++) {
				self.friendflags.push(ByteArrayUtils.readUtf16String(data));
			}
			let enemyflagsSize = ByteArrayUtils.uncompact_uint32(data);
			for (var index = 0; index < enemyflagsSize; index++) {
				self.enemyflags.push(ByteArrayUtils.readUtf16String(data));
			}

		}
	}
	// 返回玩家来应战(第一个确认按钮)
	export class s2c_SAcceptLiveDieBattleFirst {
		/** 发战书的人 */
		public hostroleid;//0表示没有发战书的人，大于0表示有发战书的人的id  long型数据
		/** 发战书的人的名称 */
		public hostrolename;
		public static read(self: s2c_SAcceptLiveDieBattleFirst, data: ByteArray): void {
			self.hostroleid = data.readLong();
			self.hostrolename = ByteArrayUtils.readUtf16String(data);
		}
	}
	// 点赞
	export class s2c_SLiveDieBattleGiveRose {
		/** 录像id */
		public vedioid: string;
		/** 次数 */
		public rosenum: number;
		/** 是否可以点赞 */
		public roseflag: number;
		public static read(self: s2c_SLiveDieBattleGiveRose, data: ByteArray): void {
			self.vedioid = ByteArrayUtils.readUtf16String(data);
			self.rosenum = data.readInt32();
			self.roseflag = data.readInt32();
		}
	}
	// 返回请求生死战排行界面
	export class s2c_SLiveDieBattleRankView {
		/** 生死榜类型 */
		public modeltype: number
		/** 生死战排行榜列表数据(对手信息) */
		public rolefightlist: Array<game.modules.aliveordead.models.LDVideoRoleInfoDesVo>;
		public static read(self: s2c_SLiveDieBattleRankView, data: ByteArray): void {
			self.modeltype = data.readInt32();
			self.rolefightlist = [];
			let _listSize = ByteArrayUtils.uncompact_uint32(data);
			for (let i = 0; i < _listSize; i++) {
				let _rolewatch = new game.modules.aliveordead.models.LDVideoRoleInfoDesVo();
				_rolewatch.fromByteArray(data);
				self.rolefightlist.push(_rolewatch);
			}
		}
	}
	// 返回请求生死战观战界面
	export class s2c_SLiveDieBattleWatchView {
		/** 生死战观战列表数据 */
		public rolewatchlist: Array<game.modules.aliveordead.models.LDRoleInfoWatchDesVo>;
		public static read(self: s2c_SLiveDieBattleWatchView, data: ByteArray): void {
			self.rolewatchlist = [];
			let _listSize = ByteArrayUtils.uncompact_uint32(data);
			for (let i = 0; i < _listSize; i++) {
				let _rolewatch = new game.modules.aliveordead.models.LDRoleInfoWatchDesVo();
				_rolewatch.fromByteArray(data);
				self.rolewatchlist.push(_rolewatch);
			}
		}
	}
	// 确定是否接受战书
	export class s2c_SAcceptInvitationLiveDieBattle {
		public static read(self: s2c_SAcceptInvitationLiveDieBattle, data: ByteArray): void {

		}
	}
	/** 返回是否接受下战书结果 */
	export class s2c_SInvitationLiveDieBattleOK {
		/** 所下战书的对方id */
		public sourceid: number;//long型数据
		/** 所下战书的对方名字 */
		public sourcename: string;
		/** 所下战书的类型 */
		public selecttype: number;//0单人   1组队

		public static read(self: s2c_SInvitationLiveDieBattleOK, data: ByteArray): void {
			self.sourceid = data.readLong();
			self.sourcename = ByteArrayUtils.readUtf16String(data);
			self.selecttype = data.readInt32();
		}
	}
	/** 返回下战书 */
	export class s2c_SInvitationLiveDieBattle {
		/** 被下战书的对方id */
		public objectid: number;//long型数据
		/** 被下战书的对方名字 */
		public objectname: string;
		/** 所下战书的类型 */
		public selecttype: number;//0单人   1组队
		/** 下战书所需花费 */
		public costmoney: number;

		public static read(self: s2c_SInvitationLiveDieBattle, data: ByteArray): void {
			self.objectid = data.readLong();
			self.objectname = ByteArrayUtils.readUtf16String(data);
			self.selecttype = data.readInt32();
			self.costmoney = data.readInt32();
		}
	}
	// 请求播放录像返回
	export class s2c_SReqRePlay {

		public static read(self: s2c_SReqRePlay, data: ByteArray): void {
			var SReqRePlay = Network._instance.protoTypePool.SReqRePlay.decode(data);
			console.log("SReqRePlay candoit:", SReqRePlay.candoit);
			console.log("SReqRePlay battleCameraUrl:", SReqRePlay.battleCameraUrl);

		}
	}
	// 返回录像url
	export class s2c_SSendCameraUrl {

		public static read(self: s2c_SSendCameraUrl, data: ByteArray): void {
			var SSendCameraUrl = Network._instance.protoTypePool.SSendCameraUrl.decode(data);
			console.log("SSendCameraUrl battleid:", SSendCameraUrl.battleid);
			console.log("SSendCameraUrl isHave:", SSendCameraUrl.isHave);
			console.log("SSendCameraUrl sizebeforezip:", SSendCameraUrl.sizebeforezip);
			console.log("SSendCameraUrl sizeafterzip:", SSendCameraUrl.sizeafterzip);
			console.log("SSendCameraUrl battleCameraUrl:", SSendCameraUrl.battleCameraUrl);
		}
	}
	// 是拒绝还是接受切磋
	export class s2c_SInvitationPlayPKResult {
		public static read(self: s2c_SInvitationPlayPKResult, data: ByteArray): void {
			var SInvitationPlayPKResult = Network._instance.protoTypePool.SInvitationPlayPKResult.decode(data);
		}
	}
	export class s2c_SInvitationPlayPK {
		public sourceid: number;
		public rolename: string;
		public rolelevel: number;
		public teamnum: number;

		public static read(self: s2c_SInvitationPlayPK, data: ByteArray): void {
			self.sourceid = data.readLong();
			// self.rolename = data.readUTFBytes(data.readUint8());
			self.rolename = ByteArrayUtils.readUtf16String(data);
			self.rolelevel = data.readInt32();
			self.teamnum = data.readInt32();
		}
	}

	// 返回对手界面
	export class s2c_SPlayPKFightView {
		public rolelist: any;
		public rolewatchlist: any;
		public static read(self: s2c_SPlayPKFightView, data: ByteArray): void {
			var SPlayPKFightView = Network._instance.protoTypePool.SPlayPKFightView.decode(data);
			self.rolelist = SPlayPKFightView.rolelist;
			self.rolewatchlist = SPlayPKFightView.rolewatchlist;
			console.log("SPlayPKFightView modeltype:", SPlayPKFightView.modeltype);
			console.log("SPlayPKFightView school:", SPlayPKFightView.school);
			console.log("SPlayPKFightView levelindex:", SPlayPKFightView.levelindex);
			console.log("SPlayPKFightView rolelist:", SPlayPKFightView.rolelist);
			console.log("SPlayPKFightView rolewatchlist:", SPlayPKFightView.rolewatchlist);
		}
	}
	// 服务器发送箱子状态
	export class s2c_SPvP5OpenBoxState {
		public boxtype: number;
		public state: number;
		public static read(self: s2c_SPvP5OpenBoxState, data: ByteArray): void {
			self.boxtype = data.readByte();
			self.state = data.readByte();
		}
	}
	// 服务器发送场内战斗信息
	export class s2c_SPvP5BattleInfo {
		public ismine: number;
		public msgId: number;
		public parameters: Array<string> = [];
		public static read(self: s2c_SPvP5BattleInfo, data: ByteArray): void {
			self.ismine = data.readByte();
			self.msgId = data.readInt32();
			let parametersSize = ByteArrayUtils.uncompact_uint32(data);
			for (var index = 0; index < parametersSize; index++) {
				self.parameters.push(ByteArrayUtils.readUtf16String(data));
			}
		}
	}
	// 通知客户端匹配结果
	export class s2c_SPvP5MatchResult {
		public targets: Array<game.modules.xianhui.models.PvP3RoleSingleMatchVo>;
		public static read(self: s2c_SPvP5MatchResult, data: ByteArray): void {
			self.targets = [];
			let targetsSize: number = data.readUint8();
			let PvP3RoleSingleMatch: game.modules.xianhui.models.PvP3RoleSingleMatchVo;
			for (var index = 0; index < targetsSize; index++) {
				PvP3RoleSingleMatch = new game.modules.xianhui.models.PvP3RoleSingleMatchVo();
				PvP3RoleSingleMatch.fromByteArray(data);
				self.targets.push(PvP3RoleSingleMatch);
			}
		}
	}

	// 服务器发送准备状态
	export class s2c_SPvP5ReadyFight {
		public static read(self: s2c_SPvP5ReadyFight, data: ByteArray): void {
		}
	}
	// 服务器发送排行榜
	export class s2c_SPvP5RankingList {
		public roleScores1: Array<game.modules.xianhui.models.PvP5RoleSingleScoreVo> = [];
		public roleScores2: Array<game.modules.xianhui.models.PvP5RoleSingleScoreVo> = [];
		public myScore: game.modules.xianhui.models.PvP5RoleSingleScoreMidVo;
		public static read(self: s2c_SPvP5RankingList, data: ByteArray): void {
			self.roleScores1 = [];
			let roleScores1Size: number = data.readUint8();
			let pvP5RoleSingleScore1: game.modules.xianhui.models.PvP5RoleSingleScoreVo;
			for (var index = 0; index < roleScores1Size; index++) {
				pvP5RoleSingleScore1 = new game.modules.xianhui.models.PvP5RoleSingleScoreVo();
				pvP5RoleSingleScore1.fromByteArray(data);
				self.roleScores1.push(pvP5RoleSingleScore1);
			}

			self.roleScores2 = [];
			let roleScores2Size: number = data.readUint8();
			let pvP5RoleSingleScore2: game.modules.xianhui.models.PvP5RoleSingleScoreVo;
			for (var index = 0; index < roleScores2Size; index++) {
				pvP5RoleSingleScore2 = new game.modules.xianhui.models.PvP5RoleSingleScoreVo();
				pvP5RoleSingleScore2.fromByteArray(data);
				self.roleScores2.push(pvP5RoleSingleScore2);
			}

			self.myScore = new game.modules.xianhui.models.PvP5RoleSingleScoreMidVo();
			self.myScore.fromByteArray(data);
		}
	}
	// 服务器发送自己的信息
	export class s2c_SPvP5MyInfo {
		public firstwin: number;
		public fivefight: number;
		public battlenum: number;
		public winnum: number;
		public combowinnum: number;
		public score: number;
		public camp: number;
		public waitstarttime: number;
		public static read(self: s2c_SPvP5MyInfo, data: ByteArray): void {
			self.firstwin = data.readByte();
			self.fivefight = data.readByte();
			self.battlenum = data.readByte();
			self.winnum = data.readByte();
			self.combowinnum = data.readByte();
			self.score = data.readInt32();
			self.camp = data.readByte();
			self.waitstarttime = data.readLong();
		}
	}
	// 服务器发送箱子状态
	export class s2c_SPvP3OpenBoxState {
		public boxtype: number;
		public state: number;
		public static read(self: s2c_SPvP3OpenBoxState, data: ByteArray): void {
			self.boxtype = data.readByte();
			self.state = data.readByte();
		}
	}
	// 服务器发送场内战斗信息
	export class s2c_SPvP3BattleInfo {
		public ismine: number;
		public msgId: number;
		public parameters: Array<string> = [];
		public static read(self: s2c_SPvP3BattleInfo, data: ByteArray): void {
			self.ismine = data.readByte();
			self.msgId = data.readInt32();
			let parametersSize = ByteArrayUtils.uncompact_uint32(data);
			for (var index = 0; index < parametersSize; index++) {
				self.parameters.push(ByteArrayUtils.readUtf16String(data));
			}
		}
	}
	// 通知客户端匹配结果
	export class s2c_SPvP3MatchResult {
		public targets: Array<game.modules.xianhui.models.PvP3RoleSingleMatchVo>;
		public static read(self: s2c_SPvP3MatchResult, data: ByteArray): void {
			self.targets = [];
			let targetsSize: number = data.readUint8();
			let PvP3RoleSingleMatch: game.modules.xianhui.models.PvP3RoleSingleMatchVo;
			for (var index = 0; index < targetsSize; index++) {
				PvP3RoleSingleMatch = new game.modules.xianhui.models.PvP3RoleSingleMatchVo();
				PvP3RoleSingleMatch.fromByteArray(data);
				self.targets.push(PvP3RoleSingleMatch);
			}
		}
	}
	// 服务器发送准备状态
	export class s2c_SPvP3ReadyFight {
		public ready: number;

		public static read(self: s2c_SPvP3ReadyFight, data: ByteArray): void {
			self.ready = data.readByte();
		}
	}
	// 服务器发送排行榜
	export class s2c_SPvP3RankingList {
		public history: number
		public roleScores: Array<game.modules.xianhui.models.PvP3RoleSingleScoreVo>;
		public myScore: Array<game.modules.xianhui.models.PvP3RoleSingleScoreMidVo>;
		public static read(self: s2c_SPvP3RankingList, data: ByteArray): void {
			self.history = data.readByte();

			self.roleScores = [];
			let roleScoresSize: number = data.readUint8();
			let pvP3RoleSingleScore: game.modules.xianhui.models.PvP3RoleSingleScoreVo;
			for (var index = 0; index < roleScoresSize; index++) {
				pvP3RoleSingleScore = new game.modules.xianhui.models.PvP3RoleSingleScoreVo();
				pvP3RoleSingleScore.fromByteArray(data);
				self.roleScores.push(pvP3RoleSingleScore);
			}

			self.myScore = [];
			let myScoreSize: number = data.readUint8();
			let pvP3RoleSingleScoreMid: game.modules.xianhui.models.PvP3RoleSingleScoreMidVo;
			for (var index = 0; index < myScoreSize; index++) {
				pvP3RoleSingleScoreMid = new game.modules.xianhui.models.PvP3RoleSingleScoreMidVo();
				pvP3RoleSingleScoreMid.fromByteArray(data);
				self.myScore.push(pvP3RoleSingleScoreMid);
			}
		}
	}
	// 服务器发送自己的信息
	export class s2c_SPvP3MyInfo {
		public firstwin: number;
		public tenfight: number;
		public eightwin: number;
		public battlenum: number;
		public winnum: number;
		public combowinnum: number;
		public score: number;
		public ready: number;
		public static read(self: s2c_SPvP3MyInfo, data: ByteArray): void {
			self.firstwin = data.readByte();
			self.tenfight = data.readByte();
			self.eightwin = data.readByte();
			self.battlenum = data.readByte();
			self.winnum = data.readByte();
			self.combowinnum = data.readInt16();
			self.score = data.readInt32();
			self.ready = data.readByte();
		}
	}
	// 服务器发送箱子状态
	export class s2c_SPvP1OpenBoxState {

		public static read(self: s2c_SPvP1OpenBoxState, data: ByteArray): void {
			var SPvP1OpenBoxState = Network._instance.protoTypePool.SPvP1OpenBoxState.decode(data);
			console.log("SPvP1OpenBoxState boxtype:", SPvP1OpenBoxState.boxtype);
			console.log("SPvP1OpenBoxState state:", SPvP1OpenBoxState.state);
		}
	}
	// 通知客户端匹配结果
	export class s2c_SPvP1MatchResult {
		public target: any;
		public static read(self: s2c_SPvP1MatchResult, data: ByteArray): void {
			var SPvP1MatchResult = Network._instance.protoTypePool.SPvP1MatchResult.decode(data);
			self.target = SPvP1MatchResult.target;
			console.log("SPvP1MatchResult target:", SPvP1MatchResult.target);

		}
	}
	// 服务器发送场内战斗信息
	export class s2c_SPvP1BattleInfo {
		public parameters: Array<number>;
		public static read(self: s2c_SPvP1BattleInfo, data: ByteArray): void {
			var SPvP1BattleInfo = Network._instance.protoTypePool.SPvP1BattleInfo.decode(data);
			self.parameters = SPvP1BattleInfo.parameters;
			console.log("SPvP1BattleInfo ismine:", SPvP1BattleInfo.ismine);
			console.log("SPvP1BattleInfo msgId:", SPvP1BattleInfo.msgId);
			console.log("SPvP1BattleInfo parameters:", SPvP1BattleInfo.parameters);
		}
	}
	// 服务器发送准备状态
	export class s2c_SPvP1ReadyFight {
		public static read(self: s2c_SPvP1ReadyFight, data: ByteArray): void {
			var SPvP1ReadyFight = Network._instance.protoTypePool.SPvP1ReadyFight.decode(data);
			console.log("SPvP1ReadyFight ready:", SPvP1ReadyFight.ready);
		}
	}
	// 服务器发送排行榜
	export class s2c_SPvP1RankingList {
		public roleScores: any;//一页积分榜的玩家信息
		public roleScores3: any;//我的前一名,我,我的后一名3名玩家信息
		public roleWins: any;//连胜榜
		public static read(self: s2c_SPvP1RankingList, data: ByteArray): void {
			var SPvP1RankingList = Network._instance.protoTypePool.SPvP1RankingList.decode(data);
			self.roleScores = SPvP1RankingList.roleScores;
			self.roleScores3 = SPvP1RankingList.roleScores3;
			self.roleWins = SPvP1RankingList.roleWins;
			console.log("SPvP1RankingList roleScores:", SPvP1RankingList.roleScores);
			console.log("SPvP1RankingList roleScores3:", SPvP1RankingList.roleScores3);
			console.log("SPvP1RankingList roleWins:", SPvP1RankingList.roleWins);
		}
	}
	// 服务器发送自己的信息
	export class s2c_SPvP1MyInfo {
		public static read(self: s2c_SPvP1MyInfo, data: ByteArray): void {
			var SPvP1MyInfo = Network._instance.protoTypePool.SPvP1MyInfo.decode(data);
			console.log("s2c_SPvP1MyInfo firstwin:", SPvP1MyInfo.firstwin);
			console.log("s2c_SPvP1MyInfo tenfight:", SPvP1MyInfo.tenfight);
			console.log("s2c_SPvP1MyInfo tencombowin:", SPvP1MyInfo.tencombowin);
			console.log("s2c_SPvP1MyInfo battlenum:", SPvP1MyInfo.battlenum);
			console.log("s2c_SPvP1MyInfo score:", SPvP1MyInfo.score);
			console.log("s2c_SPvP1MyInfo winnum:", SPvP1MyInfo.winnum);
			console.log("s2c_SPvP1MyInfo combowinnum:", SPvP1MyInfo.combowinnum);
			console.log("s2c_SPvP1MyInfo formation:", SPvP1MyInfo.formation);
			console.log("s2c_SPvP1MyInfo ready:", SPvP1MyInfo.ready);
			console.log("s2c_SPvP1MyInfo jieci:", SPvP1MyInfo.jieci);
			console.log("s2c_SPvP1MyInfo changci:", SPvP1MyInfo.changci);
		}
	}
	// 20级之前死了发送这个消息
	export class s2c_SDeadLess20 {
		public static read(self: s2c_SDeadLess20, data: ByteArray): void {
			var SDeadLess20 = Network._instance.protoTypePool.SDeadLess20.decode(data);
			console.log("s2c_SDeadLess20 eventtype:", SDeadLess20.eventtype);

		}
	}
	// 服务器广播给战斗内所有人，某个角色已经播放动画完毕了
	export class s2c_SSendRoundPlayEnd {
		public fighterId: number;
		public static read(self: s2c_SSendRoundPlayEnd, data: ByteArray): void {
			/*var SSendRoundPlayEnd = Network._instance.protoTypePool.SSendRoundPlayEnd.decode(data);
			console.log("s2c_SSendRoundPlayEnd fighterId:", SSendRoundPlayEnd.fighterId);*/

			self.fighterId = data.readInt32();
			console.log("s2c_SSendRoundPlayEnd fighterId:", self.fighterId)
		}
	}
	//服务器向客户端发送公会boss血量
	export class s2c_SSynchroBossHp {
		public static read(self: s2c_SSynchroBossHp, data: ByteArray): void {
			var SSynchroBossHp = Network._instance.protoTypePool.SSynchroBossHp.decode(data);
			console.log("s2c_SSynchroBossHp bossMonsterID:", SSynchroBossHp.bossMonsterID);
			console.log("s2c_SSynchroBossHp flag:", SSynchroBossHp.flag);
			console.log("s2c_SSynchroBossHp maxhp:", SSynchroBossHp.maxhp);
			console.log("s2c_SSynchroBossHp hp:", SSynchroBossHp.hp);
			console.log("s2c_SSynchroBossHp rolename:", SSynchroBossHp.rolename);
			console.log("s2c_SSynchroBossHp changehp:", SSynchroBossHp.changehp);
		}
	}
	//服务器发给客户端，进战斗时主角宠物的二级属性
	export class s2c_SSendPetInitAttrs {
		public petInitAttrs: any;
		public static read(self: s2c_SSendPetInitAttrs, data: ByteArray): void {
			// var SSendPetInitAttrs = Network._instance.protoTypePool.SSendPetInitAttrs.decode(data);
			// self.petInitAttrs = SSendPetInitAttrs.petInitAttrs;
			// console.log("s2c_SSendPetInitAttrs petInitAttrs:", SSendPetInitAttrs.petInitAttrs);

		}
	}
	//服务器发给客户端，进战斗时主角的二级属性
	export class s2c_SSendRoleInitAttrs {
		public roleInitAttrs: Laya.Dictionary;
		public static read(self: s2c_SSendRoleInitAttrs, data: ByteArray): void {
			/*var SSendRoleInitAttrs = Network._instance.protoTypePool.SSendRoleInitAttrs.decode(data);
			self.roleInitAttrs = SSendRoleInitAttrs.roleInitAttrs;
			console.log("s2c_SSendRoleInitAttrs roleInitAttrs:", SSendRoleInitAttrs.roleInitAttrs);*/

			let mapSize: number = data.readUint8();
			self.roleInitAttrs = new Laya.Dictionary();
			for (var index = 0; index < mapSize; index++) {
				self.roleInitAttrs.set(data.readUint32(), data.readFloat());
			}
			console.log("s2c_SSendRoleInitAttrs self:", self);


		}
	}
	//刷新人物属性的消息
	// export class s2c_SRefreshRoleData {
	// 	public datas: any;
	// 	public static read(self: s2c_SRefreshRoleData, data: ByteArray): void {
	// 		/*var SRefreshRoleData = Network._instance.protoTypePool.SRefreshRoleData.decode(data);
	// 		self.datas = SRefreshRoleData.datas;
	// 		console.log("s2c_SRefreshRoleData datas.maps:", SRefreshRoleData.datas);*/

	// 		let mapSize:number = data.readUint8();
	// 		self.datas = new Laya.Dictionary(); 		
	// 		for (var index = 0; index < mapSize; index++) {
	// 			self.datas.set(data.readInt32(),data.readFloat());
	// 		}
	// 		console.log("s2c_SRefreshRoleData self:", self);
	// 	}
	// }	
	//服务器向客户端发送已经使用过的道具列表，baseid
	export class s2c_SSendAlreadyUseItem {
		public itemlist: Laya.Dictionary;
		public static read(self: s2c_SSendAlreadyUseItem, data: ByteArray): void {
			/*var SSendAlreadyUseItem = Network._instance.protoTypePool.SSendAlreadyUseItem.decode(data);
			self.itemlist = SSendAlreadyUseItem.itemlist;
			console.log("s2c_SSendAlreadyUseItem itemlist:", SSendAlreadyUseItem.itemlist);*/

			let mapSize: number = data.readUint8();
			self.itemlist = new Laya.Dictionary();
			for (var index = 0; index < mapSize; index++) {
				self.itemlist.set(data.readUint32(), data.readUint32());
			}
			console.log("s2c_SSendAlreadyUseItem self:", self);

		}
	}
	//发送人物操作状态（准备中，请等待，掉线）
	export class s2c_SSendBattlerOperateState {
		public battleid: number;
		public state: number;
		public static read(self: s2c_SSendBattlerOperateState, data: ByteArray): void {
			self.battleid = data.readInt32();
			self.state = data.readInt32();
		}
	}
	//退出观战的fighter
	export class s2c_SRemoveWatcher {
		public roleindex: number;
		public static read(self: s2c_SRemoveWatcher, data: ByteArray): void {
			self.roleindex = data.readInt32();
		}
	}
	//服务器向客户端发送观战开始信息
	export class s2c_SSendWatchBattleStart {
		public enemyside: number;
		public leftcount: number; //如果战斗者正在操作状态，则leftcount代表操作倒计时时间，如果为0代表处于战斗演示状态
		public battletype: number;//枚举值见BattleType
		public roundnum: number; //回合数，默认是0
		public friendsformation: number; //己方的光环
		public enemyformation: number; //敌人的光环
		public friendsformationLevel: number; //己方的光环等级
		public enemyformationLevel: number;//敌方的光环等级
		public background: number; //战斗底图id
		public backmusic: number; //战斗背景音乐id
		public battlekey: number; //观战的战斗id
		public static read(self: s2c_SSendWatchBattleStart, data: ByteArray): void {
			self.enemyside = data.readInt32();
			self.leftcount = data.readInt32();
			self.battletype = data.readInt32();
			self.roundnum = data.readInt32();
			self.friendsformation = data.readInt32();
			self.enemyformation = data.readInt32();
			self.friendsformationLevel = data.readInt32();
			self.enemyformationLevel = data.readInt32();
			self.background = data.readByte();
			self.backmusic = data.readByte();
			self.battlekey = ByteArrayUtils.readLong(data);
		}
	}
	//服务器向客户端发送结束战斗消息
	export class s2c_SSendBattleEnd {
		public aiactions: Laya.Dictionary;
		public static read(self: s2c_SSendBattleEnd, data: ByteArray): void {
			/*var SSendBattleEnd = Network._instance.protoTypePool.SSendBattleEnd.decode(data);
			self.aiactions = SSendBattleEnd.aiactions;
			console.log("s2c_SSendBattleEnd aiactions:", SSendBattleEnd.aiactions);*/

			let mapSize: number = data.readUint8();
			self.aiactions = new Laya.Dictionary();
			for (var index = 0; index < mapSize; index++) {
				self.aiactions.set(data.readUint32(), data.readUint32());
			}
			console.log("s2c_SSendBattleEnd self:", self);

		}
	}
	//服务器向客户端发送 开始回合操作选择
	export class s2c_SSendRoundStart {
		public time: number;
		public environment: number;
		public aiactions: Laya.Dictionary;
		public static read(self: s2c_SSendRoundStart, data: ByteArray): void {
			/*var SSendRoundStart = Network._instance.protoTypePool.SSendRoundStart.decode(data);
			self.aiactions = SSendRoundStart.aiactions;
			console.log("s2c_SSendRoundStart time:", SSendRoundStart.time);
			console.log("s2c_SSendRoundStart environment:", SSendRoundStart.environment);
			console.log("s2c_SSendRoundStart aiactions:", SSendRoundStart.aiactions);*/

			self.time = data.readInt32();
			self.environment = data.readInt32();

			let mapSize: number = data.readUint8();
			self.aiactions = new Laya.Dictionary();
			for (var index = 0; index < mapSize; index++) {
				self.aiactions.set(data.readUint32(), data.readUint32());
			}
			console.log("s2c_SSendRoundStart self:", self);


		}
	}
	//服务器向客户端发送战斗信息
	export class s2c_SSendAddFighters {
		public fighterList: Array<game.scene.models.FighterInfoVo>;
		public fighterList0: Array<game.scene.models.FighterInfoVo>;
		public fighterList1: Array<game.scene.models.FighterInfoVo>;
		public static read(self: s2c_SSendAddFighters, data: ByteArray): void {
			/*var SSendAddFighters = Network._instance.protoTypePool.SSendAddFighters.decode(data);
			self.fighterList = SSendAddFighters.fighterList;
			console.log("s2c_SSendAddFighters fighterList:", SSendAddFighters.fighterList);*/

			self.fighterList = [];
			self.fighterList0 = [];
			self.fighterList1 = [];
			let fighterListSize: number = data.readUint8();
			let fighterInfo: game.scene.models.FighterInfoVo;
			for (var index = 0; index < fighterListSize; index++) {
				fighterInfo = new game.scene.models.FighterInfoVo();
				fighterInfo.fromByteArray(data);
				self.fighterList.push(fighterInfo); //FighterInfo
				if (fighterInfo.index <= 14) {
					self.fighterList0.push(fighterInfo);
				} else {
					self.fighterList1.push(fighterInfo);
				}

				console.log("s2c_SSendAddFighters fighterInfo.shape:", fighterInfo.shape);
			}
			console.log("s2c_SSendAddFighters self:", self);

		}
	}
	//服务器向客户端发送战斗信息
	export class s2c_SSendBattleStart {
		public enemyside: number;
		public friendsformation: number;
		public enemyformation: number;
		public friendsformationLevel: number;
		public enemyformationLevel: number;
		public battleConfigId: number;
		public battletype: number;
		public roundnum: number;
		public background: number;
		public backmusic: number;
		public static read(self: s2c_SSendBattleStart, data: ByteArray): void {
			// var SSendBattleStart = Network._instance.protoTypePool.SSendBattleStart.decode(data);

			self.enemyside = data.readInt32();
			self.friendsformation = data.readInt32();
			self.enemyformation = data.readInt32();
			self.friendsformationLevel = data.readInt32();
			self.enemyformationLevel = data.readInt32();
			self.battleConfigId = data.readInt32();
			self.battletype = data.readInt32();
			self.roundnum = data.readInt32();
			self.background = data.readByte();
			self.backmusic = data.readByte();
			console.log("s2c_SSendBattleStart self:", self);
		}
	}
	//服务器回复角色盈福经验
	export class s2c_SApplyYingFuExprience {
		public exprience: number;
		public static read(self: s2c_SApplyYingFuExprience, data: ByteArray): void {
			self.exprience = data.readLong();

			console.log("s2c_SApplyYingFuExprience+++++++++++++++++++++:", self.exprience);
		}
	}
	//刷新人物通货的消息
	export class s2c_SRefreshRoleCurrency {
		public datas: any;
		public static read(self: s2c_SRefreshRoleCurrency, data: ByteArray): void {
			// var SRefreshRoleCurrency = Network._instance.protoTypePool.SRefreshRoleCurrency.decode(data);
			// self.datas = SRefreshRoleCurrency.datas;
			// console.log("s2c_SRefreshRoleCurrency datas:", SRefreshRoleCurrency.datas);
			let mapSize: number = data.readUint8();
			self.datas = new Laya.Dictionary();
			for (var index = 0; index < mapSize; index++) {
				self.datas.set(data.readInt32(), data.readLong());
			}
			console.log("s2c_SRefreshRoleCurrency+++++++++++++++", self.datas);
		}
	}
	//刷新人物评分的消息
	export class s2c_SRefreshRoleScore {
		public datas: Laya.Dictionary;
		public static read(self: s2c_SRefreshRoleScore, data: ByteArray): void {
			// var SRefreshRoleScore = Network._instance.protoTypePool.SRefreshRoleScore.decode(data);
			// self.datas = SRefreshRoleScore.datas;
			// console.log("s2c_SRefreshRoleScore datas:", SRefreshRoleScore.datas);

			let mapSize = data.readUint8();
			self.datas = new Laya.Dictionary();
			for (var index = 0; index < mapSize; index++) {
				self.datas.set(data.readInt32(), data.readInt32());
			}
		}
	}
	//刷新人物加点后的加点面板数值
	export class s2c_SRefreshPointType {
		public point: any;
		public bfp: any;
		public pointscheme: number;
		public schemechanges: number;
		public static read(self: s2c_SRefreshPointType, data: ByteArray): void {
			// var SRefreshPointType = Network._instance.protoTypePool.SRefreshPointType.decode(data);
			// self.point = SRefreshPointType.point;
			// self.bfp = SRefreshPointType.bfp;
			// console.log("s2c_SRefreshPointType bfp:", SRefreshPointType.bfp);
			// console.log("s2c_SRefreshPointType point:", SRefreshPointType.point);
			// console.log("s2c_SRefreshPointType pointscheme:", SRefreshPointType.pointscheme);
			// console.log("s2c_SRefreshPointType schemechanges:", SRefreshPointType.schemechanges);
			self.bfp = new game.modules.roleinfo.models.RoleBasicFightPropertiesVo();
			self.bfp.fromByteArray(data);
			let mapSize: number = data.readUint8();
			self.point = new Laya.Dictionary();
			for (var index = 0; index < mapSize; index++) {
				self.point.set(data.readInt32(), data.readInt32());
			}
			self.pointscheme = data.readInt32();
			self.schemechanges = data.readInt32();
			console.log("s2c_SRefreshPointType+++++++++++++", self.bfp);
		}
	}
	//刷新宠物属性的消息
	export class s2c_SRefreshPetData {
		public columnid: number;
		public petkey: number;
		public datas: Laya.Dictionary;
		public static read(self: s2c_SRefreshPetData, data: ByteArray): void {
			self.columnid = data.readInt32();
			self.petkey = data.readInt32();
			let mapSize: number = data.readUint8();
			self.datas = new Laya.Dictionary();
			for (var index = 0; index < mapSize; index++) {
				self.datas.set(data.readInt32(), data.readFloat());
			}
		}
	}
	//刷新人物属性的消息
	export class s2c_SRefreshRoleData {
		public datas: any;
		public static read(self: s2c_SRefreshRoleData, data: ByteArray): void {
			// var SRefreshRoleData = Network._instance.protoTypePool.SRefreshRoleData.decode(data);
			// self.datas = SRefreshRoleData.datas;
			// console.log("s2c_SRefreshRoleData datas.maps:", SRefreshRoleData.datas);
			let mapSize: number = data.readUint8();
			self.datas = new Laya.Dictionary();
			for (var index = 0; index < mapSize; index++) {
				self.datas.set(data.readInt32(), data.readFloat());
			}
			console.log("s2c_SRefreshRoleData+++++++++", self.datas);
		}
	}
	//点赞
	export class s2c_SXMRGiveRose {

		public static read(self: s2c_SXMRGiveRose, data: ByteArray): void {
			var SXMRGiveRose = Network._instance.protoTypePool.SXMRGiveRose.decode(data);
			console.log("s2c_ExchangeCode videoid:", SXMRGiveRose.videoid);
			console.log("s2c_ExchangeCode rosenum:", SXMRGiveRose.rosenum);
			console.log("s2c_ExchangeCode roseflag:", SXMRGiveRose.roseflag);
		}
	}
	//请求熊猫人boss界面
	export class s2c_SXMRBossNPCView {
		public xmrteaminfos: any;
		public static read(self: s2c_SXMRBossNPCView, data: ByteArray): void {
			var SXMRBossNPCView = Network._instance.protoTypePool.SXMRBossNPCView.decode(data);
			self.xmrteaminfos = SXMRBossNPCView.xmrteaminfos;
			console.log("s2c_ExchangeCode viewtype:", SXMRBossNPCView.viewtype);
			console.log("s2c_ExchangeCode xmrteaminfos:", SXMRBossNPCView.xmrteaminfos);

		}
	}
	//请求熊猫人界面
	export class s2c_SXMRNPCView {
		public xmrteaminfos: any;
		public static read(self: s2c_SXMRNPCView, data: ByteArray): void {
			var sXMRNPCView = Network._instance.protoTypePool.SXMRNPCView.decode(data);
			self.xmrteaminfos = sXMRNPCView.xmrteaminfos;
			console.log("s2c_ExchangeCode xmrteaminfos:", sXMRNPCView.xmrteaminfos);
			console.log("s2c_ExchangeCode curstar:", sXMRNPCView.curstar);
		}
	}
	//服务端返回兑换成功标志
	export class s2c_SExchangeCode {
		public ExchangeCodeRetInfo: any;
		public static read(self: s2c_SExchangeCode, data: ByteArray): void {
			var sExchangeCode = Network._instance.protoTypePool.SExchangeCode.decode(data);
			self.ExchangeCodeRetInfo = sExchangeCode.ExchangeCodeRetInfo;
			console.log("s2c_ExchangeCode flag:", sExchangeCode.flag);
			console.log("s2c_ExchangeCode ExchangeCodeRetInfo:", sExchangeCode.ExchangeCodeRetInfo);
		}
	}
	//服务端发送QQ会员兑换码状态
	export class s2c_QQExchangeCodeStatus {
		public static read(self: s2c_QQExchangeCodeStatus, data: ByteArray): void {
			var sQQExchangeCodeStatus = Network._instance.protoTypePool.SQQExchangeCodeStatus.decode(data);
			console.log("s2c_QQExchangeCodeStatus status:", sQQExchangeCodeStatus.status);
		}
	}
	//请求节日积分奖励表数据
	export class s2c_QueryHydScoreData {
		public static read(self: s2c_QueryHydScoreData, data: ByteArray): void {
			var sQueryHydScoreData = Network._instance.protoTypePool.SQueryHydScoreData.decode(data);
			console.log("s2c_QueryHydScoreData hydvalue:", sQueryHydScoreData.hydvalue);
			console.log("s2c_QueryHydScoreData chargevalue:", sQueryHydScoreData.chargevalue);

		}
	}
	//请求累计充值奖励表数据
	export class s2c_QueryChargeAwardCountData {
		public static read(self: s2c_QueryChargeAwardCountData, data: ByteArray): void {
			var sQueryChargeAwardCountData = Network._instance.protoTypePool.SQueryChargeAwardCountData.decode(data);
			console.log("s2c_QueryChargeAwardCountData hydvalue:", sQueryChargeAwardCountData.hydvalue);
			console.log("s2c_QueryChargeAwardCountData chargevalue:", sQueryChargeAwardCountData.chargevalue);

		}
	}
	//请求节日活跃度奖励表数据
	export class s2c_QueryJRAwardData {
		public static read(self: s2c_QueryJRAwardData, data: ByteArray): void {
			var sQueryJRAwardData = Network._instance.protoTypePool.SQueryJRAwardData.decode(data);
			console.log("s2c_QueryJRAwardData hydvalue:", sQueryJRAwardData.hydvalue);
			console.log("s2c_QueryJRAwardData chargevalue:", sQueryJRAwardData.chargevalue);
			console.log("s2c_QueryJRAwardData hydrewards:", sQueryJRAwardData.hydrewards);
			console.log("s2c_QueryJRAwardData chargerewards:", sQueryJRAwardData.chargerewards);
		}
	}
	//返回节日签到数据
	export class s2c_QueryFestivalData {
		public static read(self: s2c_QueryFestivalData, data: ByteArray): void {
			var sQueryFestivalData = Network._instance.protoTypePool.SQueryFestivalData.decode(data);
			console.log("s2c_QueryFestivalData rewards:", sQueryFestivalData.rewards);

		}
	}
	export class s2c_SQueryRegData {
		public month: number // 月
		public times: number; // 签到次数
		public suppregtimes: number; // 补签次数
		public cansuppregtimes: number; // 可补签次数
		public suppregdays: Array<number>; // 补签日子
		public rewardflag: number; //1-领取过 2-未领取

		public static read(self: s2c_SQueryRegData, data: ByteArray): void {
			self.month = data.readUint32();
			self.times = data.readUint32();
			self.suppregtimes = data.readUint32();
			self.cansuppregtimes = data.readUint32();

			self.suppregdays = [];
			let suppregdaysSize: number = data.readUint8();
			for (var index = 0; index < suppregdaysSize; index++) {
				self.suppregdays.push(data.readInt32());
			}

			self.rewardflag = data.readUint32();
		}
	}
	export class s2c_join_map_result {
		public optcode: number = 0;
		public optname: string = "onJoin_map_result";

		/**
		* 主玩家unit
		*/
		public guid: string;	//String
		/**
		* 地图id
		*/
		public mapid: number;	//uint32
		public constructor() {

		}

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: s2c_join_map_result, bytes: ByteArray): void {
			var parmLen: number;
			var i: number;
			//主玩家unit
			self.guid = bytes.readString();
			//地图id
			self.mapid = bytes.readUint32();
		}
	}
	export class both_move_stop {
		public optcode: number = 0;
		public optname: string = "onMove_stop";

		/**
		* 谁啊
		*/
		public oid: number;	//uint16
		/**
		* 目标点x轴
		*/
		public target_x: number;	//float
		/**
		* 目标点y轴
		*/
		public target_y: number;	//float
		public constructor() {

		}

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: both_move_stop, bytes: ByteArray): void {
			var parmLen: number;
			var i: number;
			//谁啊
			self.oid = bytes.readUint16();
			//目标点x轴
			self.target_x = bytes.readFloat();
			//目标点y轴
			self.target_y = bytes.readFloat();
		}
	}


	export class c2s_wujiang_peiyang_apply {
		public optcode: number = 0;
		public optname: string = "onWujiang_peiyang_apply";

		/**
		* 武将位置
		*/
		public index: number;	//uint16
		/**
		* 0放弃1应用
		*/
		public is_apply: number;	//uint8
		public constructor() {

		}

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: c2s_wujiang_peiyang_apply, bytes: ByteArray): void {
			var parmLen: number;
			var i: number;
			//武将位置
			self.index = bytes.readUint16();
			//0放弃1应用
			self.is_apply = bytes.readUint8();
		}
	}


	// /*斗仙台信息*/

	export class dtx_info_t {
		// 名字
		public name: string; //String
		// 排名
		rank: number;	//uint16
		// GUID
		public guid: string; //String
		// 头像ID
		head_id: number;	//uint8
		// 战斗力
		force: number;	//uint32
		// 性别
		sex: number;	//uint32
		// 翅膀
		wings: number;	//uint32
		// 衣服
		coat: number;	//uint32
		// 武器
		weapon: number;	//uint32
		// 从输入二进制流中读取结构体
		read(input: ByteArray): void {
			this.name = input.readString();
			this.rank = input.readUint16();
			this.guid = input.readString();
			this.head_id = input.readUint8();
			this.force = input.readUint32();
			this.sex = input.readUint32();
			this.wings = input.readUint32();
			this.coat = input.readUint32();
			this.weapon = input.readUint32();
		}

		// 将结构体写入到输出二进制流中
		write(output: ByteArray): void {
			output.writeString(this.name);
			output.writeUint16(this.rank);
			output.writeString(this.guid);
			output.writeUint8(this.head_id);
			output.writeUint32(this.force);
			output.writeUint32(this.sex);
			output.writeUint32(this.wings);
			output.writeUint32(this.coat);
			output.writeUint32(this.weapon);
		}
	}
	// /*竞技场对手简要*/

	export class jjc_info_t {
		// GUID
		public guid: string; //String
		// 排名
		rank: number;	//uint32
		// 战力
		force: number;	//uint32
		// 昵称
		public name: string; //String
		// 等级
		lv: number;	//uint32
		// 头像
		head: number;	//int32
		// 从输入二进制流中读取结构体
		read(input: ByteArray): void {
			this.guid = input.readString();
			this.rank = input.readUint32();
			this.force = input.readUint32();
			this.name = input.readString();
			this.lv = input.readUint32();
			this.head = input.readInt32();
		}

		// 将结构体写入到输出二进制流中
		write(output: ByteArray): void {
			output.writeString(this.guid);
			output.writeUint32(this.rank);
			output.writeUint32(this.force);
			output.writeString(this.name);
			output.writeUint32(this.lv);
			output.writeInt32(this.head);
		}
	}

	/**
	 * by lqw
	 * s2c
	 */
	export class s2c_dissolve_relation {
		public relation: number;
		public initiative: number;
		public playerid: number;

		public static read(self: s2c_dissolve_relation, data: ByteArray): void {
			var sDissolveRelation = Network._instance.protoTypePool.SDissolveRelation.decode(data);
			self.relation = sDissolveRelation.relation;
			self.initiative = sDissolveRelation.initiative;
			self.playerid = sDissolveRelation.playerid;
			console.log("s2c_dissolve_relation sDissolveRelation:", sDissolveRelation);
			console.log("s2c_dissolve_relation sDissolveRelation.relation", sDissolveRelation.relation);
			console.log("s2c_dissolve_relation sDissolveRelation.initiative", sDissolveRelation.initiative);
			console.log("s2c_dissolve_relation sDissolveRelation.playerid", sDissolveRelation.playerid);
		}
	}

	// SPreviousMasters
	export class s2c_previous_masters {
		//定义类型
		public masters: any;

		public static read(self: s2c_previous_masters, data: ByteArray): void {
			var sPreviousMasters = Network._instance.protoTypePool.SPreviousMasters.decode(data);
			self.masters = sPreviousMasters.masters;
			console.log("s2c_previous_masters sPreviousMasters:", sPreviousMasters);
			console.log("s2c_previous_masters sPreviousMasters.masters:", sPreviousMasters.masters);
		}
	}
	// SPrenticeList
	export class s2c_prentice_list {
		//定义类型
		public prentice: any;
		public itemkey: number;
		public static read(self: s2c_prentice_list, data: ByteArray): void {
			var sPrenticeList = Network._instance.protoTypePool.SPrenticeList.decode(data);
			self.prentice = sPrenticeList.prentice;
			self.itemkey = sPrenticeList.itemkey;
			console.log("s2c_prentice_list sPrenticeList:", sPrenticeList);
			console.log("s2c_prentice_list sPrenticeList.prentice:", sPrenticeList.prentice);
			console.log("s2c_prentice_list sPrenticeList.itemkey:", sPrenticeList.itemkey);
		}
	}

	export class s2c_request_as_master {
		//定义类型
		//定义类型
		public masterid: number;	//师父id
		public prenticename: string;	//师父名称
		public school: number;	//职业
		public level: number;	//等级
		public requestword: string;	//留言

		public static read(self: s2c_request_as_master, data: ByteArray): void {
			var sReceiveAsMaster = Network._instance.protoTypePool.SReceiveAsMaster.decode(data);
			self.masterid = sReceiveAsMaster.masterid;
			self.prenticename = sReceiveAsMaster.prenticeid;
			self.school = sReceiveAsMaster.school;
			self.level = sReceiveAsMaster.level;
			self.requestword = sReceiveAsMaster.requestword;
			console.log("s2c_request_as_master sReceiveAsMaster:", sReceiveAsMaster);
			console.log("s2c_request_as_master sReceiveAsMaster.masterid:", sReceiveAsMaster.masterid);
			console.log("s2c_request_as_master sReceiveAsMaster.prenticename:", sReceiveAsMaster.prenticename);
			console.log("s2c_request_as_master sReceiveAsMaster.school:", sReceiveAsMaster.school);
			console.log("s2c_request_as_master sReceiveAsMaster.level:", sReceiveAsMaster.level);
			console.log("s2c_request_as_master sReceiveAsMaster.requestword:", sReceiveAsMaster.requestword);

		}
	}
	// SInitPrenticeList
	export class s2c_init_prentice_list {
		//定义类型
		public prenticelist: any;
		public static read(self: s2c_init_prentice_list, data: ByteArray): void {
			var sInitPrenticeList = Network._instance.protoTypePool.SInitPrenticeList.decode(data);
			self.prenticelist = sInitPrenticeList.prenticelist;
			console.log("s2c_init_prentice_list sInitPrenticeList:", sInitPrenticeList);
			console.log("s2c_init_prentice_list sInitPrenticeList.prenticelist:", sInitPrenticeList.prenticelist);
		}
	}
	// SCanRequestAsPrentice
	export class s2c_can_request_as_prentice {
		//定义类型
		public roleid: number;
		public rolename: string;
		public static read(self: s2c_can_request_as_prentice, data: ByteArray): void {
			var sCanRequestAsPrentice = Network._instance.protoTypePool.SCanRequestAsPrentice.decode(data);
			self.roleid = sCanRequestAsPrentice.roleid;	//请求徒弟的id
			self.rolename = sCanRequestAsPrentice.rolename;	//请求徒弟的名字
			console.log("s2c_can_request_as_prentice sCanRequestAsPrentice:", sCanRequestAsPrentice);
			console.log("s2c_can_request_as_prentice sCanRequestAsPrentice.roleid:", sCanRequestAsPrentice.roleid);
			console.log("s2c_can_request_as_prentice sCanRequestAsPrentice.rolename:", sCanRequestAsPrentice.rolename);
		}
	}
	// SCanRequestAsMaster
	export class s2c_can_request_as_master {
		//定义类型
		public roleid: number;
		public rolename: string;

		public static read(self: s2c_can_request_as_master, data: ByteArray): void {
			var sCanrequestAsMaster = Network._instance.protoTypePool.SCanrequestAsMaster.decode(data);

			self.roleid = sCanrequestAsMaster.roleid;	//请求徒弟的id
			self.rolename = sCanrequestAsMaster.rolename;	//请求徒弟的名字
			console.log("s2c_can_request_as_master sCanrequestAsMaster:", sCanrequestAsMaster);
			console.log("s2c_can_request_as_master sCanrequestAsMaster.roleid:", sCanrequestAsMaster.roleid);
			console.log("s2c_can_request_as_master sCanrequestAsMaster.rolename:", sCanrequestAsMaster.rolename);
		}
	}

	// sCantRequestAsPrentice
	export class s2c_cat_request_as_prentice {
		//定义类型
		public roleid: number;
		public reason: number;

		public static read(self: s2c_cat_request_as_prentice, data: ByteArray): void {
			var sCantRequestAsPrentice = Network._instance.protoTypePool.SCantRequestAsPrentice.decode(data);

			self.roleid = sCantRequestAsPrentice.roleid;	//请求徒弟的id
			self.reason = sCantRequestAsPrentice.reason;	//请求徒弟的名字
			console.log("s2c_cat_request_as_prentice sCantRequestAsPrentice:", sCantRequestAsPrentice);
			console.log("s2c_cat_request_as_prentice sCantRequestAsPrentice.roleid:", sCantRequestAsPrentice.roleid);
			console.log("s2c_cat_request_as_prentice sCantRequestAsPrentice.reason:", sCantRequestAsPrentice.reason);
		}
	}
	// sCantRequestAsMaster
	export class s2c_cant_request_as_master {
		//定义类型
		public roleid: number;
		public reason: number;

		public static read(self: s2c_cant_request_as_master, data: ByteArray): void {
			var sCantRequestAsMaster = Network._instance.protoTypePool.SCantRequestAsMaster.decode(data);

			self.roleid = sCantRequestAsMaster.roleid;	//请求徒弟的id
			self.reason = sCantRequestAsMaster.reason;	//请求徒弟的名字
			console.log("s2c_cant_request_as_master sCantRequestAsMaster:", sCantRequestAsMaster);
			console.log("s2c_cant_request_as_master sCantRequestAsMaster.roleid:", sCantRequestAsMaster.roleid);
			console.log("s2c_cant_request_as_master sCantRequestAsMaster.reason:", sCantRequestAsMaster.reason);
		}
	}
	// SSendMasterPrenticeList
	export class s2c_send_master_prentice_list {
		//定义类型
		public masterlist: any;
		public prenticelist: any;
		public static read(self: s2c_send_master_prentice_list, data: ByteArray): void {
			var sSendMasterPrenticeList = Network._instance.protoTypePool.SSendMasterPrenticeList.decode(data);
			self.masterlist = sSendMasterPrenticeList.masterlist;
			self.prenticelist = sSendMasterPrenticeList.prenticelist;
			console.log("s2c_send_master_prentice_list sSendMasterPrenticeList:", sSendMasterPrenticeList);
			console.log("s2c_send_master_prentice_list sSendMasterPrenticeList.masterlist:", sSendMasterPrenticeList.masterlist);
			console.log("s2c_send_master_prentice_list sSendMasterPrenticeList.prenticelist:", sSendMasterPrenticeList.prenticelist);

		}
	}
	// sAddPrePrentice
	export class s2c_add_pre_prentice {
		//定义类型
		public roleid: number;

		public static read(self: s2c_add_pre_prentice, data: ByteArray): void {
			var sAddPrePrentice = Network._instance.protoTypePool.SAddPrePrentice.decode(data);

			self.roleid = sAddPrePrentice.roleid;	//请求徒弟的id
			console.log("s2c_add_pre_prentice sAddPrePrentice:", sAddPrePrentice);
			console.log("s2c_add_pre_prentice sAddPrePrentice.roleid:", sAddPrePrentice.roleid);
		}
	}
	// SSendPrenticeOnLineState
	export class s2c_send_prentice_on_line_state {
		//定义类型
		public roleid: number;
		public rolename: string;
		public lastOfflineTime: number;
		public onlinestate: number;
		public static read(self: s2c_send_prentice_on_line_state, data: ByteArray): void {
			var sSendPrenticeOnLineState = Network._instance.protoTypePool.SSendPrenticeOnLineState.decode(data);
			self.roleid = sSendPrenticeOnLineState.roleid;
			self.rolename = sSendPrenticeOnLineState.rolename;
			self.lastOfflineTime = sSendPrenticeOnLineState.lastOfflineTime;
			self.onlinestate = sSendPrenticeOnLineState.onlinestate;
			console.log("s2c_send_prentice_on_line_state sSendPrenticeOnLineState:", sSendPrenticeOnLineState);
			console.log("s2c_send_prentice_on_line_state sSendPrenticeOnLineState.roleid:", sSendPrenticeOnLineState.roleid);
			console.log("s2c_send_prentice_on_line_state sSendPrenticeOnLineState.rolename:", sSendPrenticeOnLineState.rolename);
			console.log("s2c_send_prentice_on_line_state sSendPrenticeOnLineState.lastOfflineTime:", sSendPrenticeOnLineState.lastOfflineTime);
			console.log("s2c_send_prentice_on_line_state sSendPrenticeOnLineState.onlinestate:", sSendPrenticeOnLineState.onlinestate);
		}
	}
	// <!-- 师徒系统 定义协议  -->
	// SNotifyMaster
	export class s2c_notify_master {
		//定义类型
		public flag: number;
		public static read(self: s2c_notify_master, data: ByteArray): void {
			var sNotifyMaster = Network._instance.protoTypePool.SNotifyMaster.decode(data);
			self.flag = sNotifyMaster.flag;
			console.log("s2c_notify_master sNotifyMaster:", sNotifyMaster);
			console.log("s2c_notify_master sNotifyMaster.flag:", sNotifyMaster.flag);
		}
	}
	// SEvaluate
	export class s2c_evaluate {
		//定义类型
		public flag: number;
		public roleId: number;
		public static read(self: s2c_evaluate, data: ByteArray): void {
			var sEvaluate = Network._instance.protoTypePool.SEvaluate.decode(data);
			self.flag = sEvaluate.flag;
			self.roleId = sEvaluate.roleId;
			console.log("s2c_evaluate sEvaluate:", sEvaluate);
			console.log("s2c_evaluate sEvaluate.flag:", sEvaluate.flag);
			console.log("s2c_evaluate sEvaluate.roleId:", sEvaluate.roleId);
		}
	}

	// SDismissApprentces
	export class s2c_dismiss_apprentces {
		//定义类型
		public prenticelist: any;
		public static read(self: s2c_dismiss_apprentces, data: ByteArray): void {
			var sDismissApprentces = Network._instance.protoTypePool.SDismissApprentces.decode(data);
			self.prenticelist = sDismissApprentces.prenticelist;
			console.log("s2c_dismiss_apprentces sDismissApprentces:", sDismissApprentces);
			console.log("s2c_dismiss_apprentces sDismissApprentces.prenticelist:", sDismissApprentces.prenticelist);

		}
	}
	// sNotifyDismissMaster
	export class s2c_notify_dismiss_master {
		//定义类型
		public masterName: string;

		public static read(self: s2c_notify_dismiss_master, data: ByteArray): void {
			var sNotifyDismissMaster = Network._instance.protoTypePool.SNotifyDismissMaster.decode(data);
			self.masterName = sNotifyDismissMaster.masterName;
			console.log("s2c_notify_dismiss_master sNotifyDismissMaster:", sNotifyDismissMaster);
			console.log("s2c_notify_dismiss_master sNotifyDismissMaster.masterName:", sNotifyDismissMaster.masterName);

		}
	}
	// SPrenticesList
	export class s2c_prentices_list {
		//定义类型
		public prenticelist: any;
		public chushiList: any;
		public shide: number;
		public static read(self: s2c_prentices_list, data: ByteArray): void {
			var sPrenticeList = Network._instance.protoTypePool.SPrenticeListsPrenticeList.decode(data);
			self.prenticelist = sPrenticeList.prenticelist;
			self.chushiList = sPrenticeList.chushiList;
			self.shide = sPrenticeList.shide;
			console.log("s2c_prentices_list sPrenticeList:", sPrenticeList);
			console.log("s2c_prentices_list sPrenticeList.chushiList:", sPrenticeList.chushiList);
			console.log("s2c_prentices_list sPrenticeList.shide:", sPrenticeList.shide);

		}
	}
	// STakeAchiveFresh
	export class s2c_take_achive_fresh {
		//定义类型
		public roleid: number;
		public key: number;
		public flag: number;

		public static read(self: s2c_take_achive_fresh, data: ByteArray): void {
			var sTakeAchiveFresh = Network._instance.protoTypePool.STakeAchiveFresh.decode(data);
			self.roleid = sTakeAchiveFresh.roleid;
			self.key = sTakeAchiveFresh.key;
			self.flag = sTakeAchiveFresh.flag;
			console.log("s2c_take_achive_fresh sTakeAchiveFresh:", sTakeAchiveFresh);
			console.log("s2c_take_achive_fresh sTakeAchiveFresh.roleid:", sTakeAchiveFresh.roleid);
			console.log("s2c_take_achive_fresh sTakeAchiveFresh.key:", sTakeAchiveFresh.key);
			console.log("s2c_take_achive_fresh sTakeAchiveFresh.flag:", sTakeAchiveFresh.flag);
		}
	}

	// SNotifyAppMaster
	export class s2c_notify_app_master {
		//定义类型
		public masterName: string;
		public static read(self: s2c_notify_app_master, data: ByteArray): void {
			var sNotifyAppMaster = Network._instance.protoTypePool.SNotifyAppMaster.decode(data);
			self.masterName = sNotifyAppMaster.masterName;
			console.log("s2c_notify_app_master sNotifyAppMaster:", sNotifyAppMaster);
			console.log("s2c_notify_app_master sNotifyAppMaster.masterName:", sNotifyAppMaster.masterName);
		}
	}
	export class s2c_accept_mission {
		public missioninfo: game.modules.task.models.MissionInfoVo;
		public static read(self: s2c_accept_mission, data: ByteArray): void {
			self.missioninfo = new game.modules.task.models.MissionInfoVo();
			self.missioninfo.fromByteArray(data);
		}
	}
	// sRefreshMissionState
	export class s2c_refresh_mission_state {
		//定义类型
		public missionid: number;
		public missionstatus: number;
		public static read(self: s2c_refresh_mission_state, data: ByteArray): void {
			self.missionid = data.readInt32();
			self.missionstatus = data.readInt32();
		}
	}
	// sRefreshMissionValue
	export class s2c_refresh_mission_value {
		//定义类型
		public missionid: number;
		public missionidvalue: number;
		public missionidround: number;

		public static read(self: s2c_refresh_mission_value, data: ByteArray): void {
			self.missionid = data.readInt32();
			self.missionidvalue = data.readInt32();
			self.missionidround = data.readInt32();
		}
	}
	// sTrackMission
	export class s2c_track_mission {
		//定义类型
		public missionid: number;
		public track: number;
		public static read(self: s2c_track_mission, data: ByteArray): void {
			self.missionid = data.readInt32();
			self.track = data.readInt32();
		}
	}

	// sFairylandStatus
	export class s2c_fairyland_status {
		//定义类型
		public status: number;
		public static read(self: s2c_fairyland_status, data: ByteArray): void {
			var sFairylandStatus = Network._instance.protoTypePool.SFairylandStatus.decode(data);
			self.status = sFairylandStatus.status;
			console.log("s2c_fairyland_status sFairylandStatus:", sFairylandStatus);
			console.log("s2c_fairyland_status sFairylandStatus.status:", sFairylandStatus.status);
		}
	}
	// sReqMissionCanAccept
	export class s2c_req_mission_can_accept {
		//定义类型
		public missions: Array<number>;
		public static read(self: s2c_req_mission_can_accept, data: ByteArray): void {
			self.missions = [];
			let missionsSize: number = ByteArrayUtils.uncompact_uint32(data)

			for (var index = 0; index < missionsSize; index++) {
				self.missions.push(data.readInt32());
			}
		}
	}
	// SUseMissionItemFail
	export class s2c_use_mission_item_fail {
		//定义类型

		public static read(self: s2c_use_mission_item_fail, data: ByteArray): void {
			var sUseMissionItemFail = Network._instance.protoTypePool.SUseMissionItemFail.decode(data);

			console.log("s2c_use_mission_item_fail sUseMissionItemFail:", sUseMissionItemFail);

		}
	}
	// sNpcFollowStart
	export class s2c_npc_follow_start {
		//定义类型
		public npcid: number;
		public static read(self: s2c_npc_follow_start, data: ByteArray): void {
			var sNpcFollowStart = Network._instance.protoTypePool.SNpcFollowStart.decode(data);
			self.npcid = sNpcFollowStart.npcid;
			console.log("s2c_npc_follow_start sNpcFollowStart:", sNpcFollowStart);
			console.log("s2c_npc_follow_start sNpcFollowStart.npcid:", sNpcFollowStart.npcid);
		}
	}
	// sNpcFollowEnd
	export class s2c_npc_follow_end {
		//定义类型
		public npcid: number;
		public static read(self: s2c_npc_follow_end, data: ByteArray): void {
			var sNpcFollowEnd = Network._instance.protoTypePool.SNpcFollowEnd.decode(data);
			self.npcid = sNpcFollowEnd.npcid;
			console.log("s2c_npc_follow_end sNpcFollowEnd:", sNpcFollowEnd);
			console.log("s2c_npc_follow_end sNpcFollowEnd.npcid:", sNpcFollowEnd.npcid);
		}
	}
	// sLandTimes
	export class s2c_land_times {
		//定义类型
		public instances: any;
		public static read(self: s2c_land_times, data: ByteArray): void {
			var sLandTimes = Network._instance.protoTypePool.SLandTimes.decode(data);
			self.instances = sLandTimes.instances;
			console.log("s2c_land_times sLandTimes:", sLandTimes);
			console.log("s2c_land_times sLandTimes.instances:", sLandTimes.instances);
		}
	}
	// sCopyDestroyTime
	export class s2c_copy_destroy_time {
		//定义类型
		public destroyTime: number;
		public static read(self: s2c_copy_destroy_time, data: ByteArray): void {
			var sCopyDestroyTime = Network._instance.protoTypePool.SCopyDestroyTime.decode(data);
			self.destroyTime = sCopyDestroyTime.destroyTime;
			console.log("s2c_copy_destroy_time sCopyDestroyTime:", sCopyDestroyTime);
			console.log("s2c_copy_destroy_time sCopyDestroyTime.destroyTime:", sCopyDestroyTime.destroyTime);
		}
	}
	// sGetInstanceState
	export class s2c_get_instance_state {
		//定义类型
		public instances: any;
		public static read(self: s2c_get_instance_state, data: ByteArray): void {
			var sGetInstanceState = Network._instance.protoTypePool.SGetInstanceState.decode(data);
			self.instances = sGetInstanceState.instances;
			console.log("s2c_get_instance_state sGetInstanceState:", sGetInstanceState);
			console.log("s2c_get_instance_state sGetInstanceState.instances:", sGetInstanceState.instances);
		}
	}
	// sGetLineState
	export class s2c_get_line_state {
		//定义类型
		public instances: any;
		public static read(self: s2c_get_line_state, data: ByteArray): void {
			self.instances = new Laya.Dictionary();
			let instancesSize: number = data.readUint8();
			let lineInfo: game.modules.activity.models.LineInfoVo;
			for (var index = 0; index < instancesSize; index++) {
				lineInfo = new game.modules.activity.models.LineInfoVo();
				self.instances.set(data.readInt32(), lineInfo);
				lineInfo.fromByteArray(data);
			}
		}
	}
	// sRefreshActivityListFinishTimes
	export class s2c_refresh_activity_listfinish_times {
		public activities: Laya.Dictionary;
		public activevalue: number;
		public chests: Laya.Dictionary;
		public recommend: number;
		public closeids: Array<number>;
		public static read(self: s2c_refresh_activity_listfinish_times, data: ByteArray): void {
			self.activities = new Laya.Dictionary();
			let activitiesSize: number = data.readUint8();
			let simpleActivityInfo: game.modules.activity.models.SimpleActivityInfoVo;
			for (var index = 0; index < activitiesSize; index++) {
				simpleActivityInfo = new game.modules.activity.models.SimpleActivityInfoVo();
				simpleActivityInfo.fromByteArray(data);
				self.activities.set(data.readInt32(), simpleActivityInfo);
			}

			self.activevalue = data.readInt32();

			let mapSize = data.readUint8();
			self.chests = new Laya.Dictionary();
			for (var index = 0; index < mapSize; index++) {
				self.chests.set(data.readUint32(), data.readUint32());
			}

			self.recommend = data.readInt32();

			self.closeids = [];
			let closeidsSize: number = data.readUint8();
			for (var index = 0; index < closeidsSize; index++) {
				self.closeids.push(data.readInt32());
			}
		}
	}
	// SDrawGiftBox
	export class s2c_draw_gift_box {
		public static read(self: s2c_draw_gift_box, data: ByteArray): void {
			// var SDrawGiftBox = Network._instance.protoTypePool.SDrawGiftBox.decode(data);
			console.log("---------已经取过宝箱---------");
		}
	}
	// sActivityOpen
	export class s2c_activity_open {
		//定义类型
		public activityId: any;
		public static read(self: s2c_activity_open, data: ByteArray): void {
			var sActivityOpen = Network._instance.protoTypePool.SActivityOpen.decode(data);
			self.activityId = sActivityOpen.activityId;
			console.log("s2c_activity_open sActivityOpen:", sActivityOpen);
			console.log("s2c_activity_open sActivityOpen.activityId:", sActivityOpen.activityId);
		}
	}
	// sNotifyTuiSongList
	export class s2c_notify_tuisong_list {
		//定义类型
		public notifyList: Array<number>;
		public static read(self: s2c_notify_tuisong_list, data: ByteArray): void {
			var sNotifyTuiSongList = Network._instance.protoTypePool.SNotifyTuiSongList.decode(data);
			self.notifyList = sNotifyTuiSongList.notifyList;
			console.log("s2c_notify_tuisong_list sNotifyTuiSongList:", sNotifyTuiSongList);
			console.log("s2c_notify_tuisong_list sNotifyTuiSongList.notifyList:", sNotifyTuiSongList.notifyList);
		}
	}
	// sDailyTaskStateList
	export class s2c_daily_task_state_list {
		//定义类型
		public notifyList: Array<any>;
		public static read(self: s2c_daily_task_state_list, data: ByteArray): void {
			var sDailyTaskStateList = Network._instance.protoTypePool.SDailyTaskStateList.decode(data);
			self.notifyList = sDailyTaskStateList.notifyList;
			console.log("s2c_daily_task_state_list sDailyTaskStateList:", sDailyTaskStateList);
			console.log("s2c_daily_task_state_list sDailyTaskStateList.notifyList:", sDailyTaskStateList.notifyList);
		}
	}
	// sRemoveTuiSong
	export class s2c_remove_tui_song {
		//定义类型
		public removeId: number;
		public static read(self: s2c_remove_tui_song, data: ByteArray): void {
			var sRemoveTuiSong = Network._instance.protoTypePool.SRemoveTuiSong.decode(data);
			self.removeId = sRemoveTuiSong.removeId;
			console.log("s2c_remove_tui_song sRemoveTuiSong:", sRemoveTuiSong);
			console.log("s2c_remove_tui_song sRemoveTuiSong.removeId:", sRemoveTuiSong.removeId);
		}
	}
	// SQuestion
	export class s2c_question {
		//定义类型
		public lastresult: number;
		public npckey: number;
		public questionid: number;
		public flag: number;
		public static read(self: s2c_question, data: ByteArray): void {
			var SQuestion = Network._instance.protoTypePool.SQuestion.decode(data);
			self.lastresult = SQuestion.lastresult;
			self.npckey = SQuestion.npckey;
			self.questionid = SQuestion.questionid;
			self.flag = SQuestion.flag;
			console.log("s2c_question SQuestion:", SQuestion);
			console.log("s2c_question SQuestion.lastresult:", SQuestion.lastresult);
			console.log("s2c_question SQuestion.npckey:", SQuestion.npckey);
			console.log("s2c_question SQuestion.questionid:", SQuestion.questionid);
			console.log("s2c_question SQuestion.flag:", SQuestion.flag);
		}
	}
	// sUseTreasureMap
	export class s2c_use_treasure_map {
		//定义类型
		public awardId: number;
		public maptype: number;
		public static read(self: s2c_use_treasure_map, data: ByteArray): void {
			var sUseTreasureMap = Network._instance.protoTypePool.SUseTreasureMap.decode(data);
			self.awardId = sUseTreasureMap.awardId;
			self.maptype = sUseTreasureMap.maptype;
			console.log("s2c_use_treasure_map sUseTreasureMap:", sUseTreasureMap);
			console.log("s2c_use_treasure_map sUseTreasureMap.awardId:", sUseTreasureMap.awardId);
			console.log("s2c_use_treasure_map sUseTreasureMap.maptype:", sUseTreasureMap.maptype);
		}
	}
	// sGetActivityInfo
	export class s2c_get_activity_info {
		public activityinfos: Array<game.modules.activity.models.ActivityInfoVo>;
		public static read(self: s2c_get_activity_info, data: ByteArray): void {
			self.activityinfos = [];
			var activityInfo;
			let arraySize: number = data.readByte();
			for (var index = 0; index < arraySize; index++) {
				activityInfo = new game.modules.activity.models.ActivityInfoVo();
				activityInfo.fromByteArray(data);
				self.activityinfos.push(activityInfo);
			}

		}
	}
	// sAskIntoInstance
	export class s2c_ask_into_instance {
		//定义类型
		public msgid: number;
		public teamleadername: string;
		public awardtimes: number;
		public step: number;
		public tlstep: number;
		public mystep: number;
		public allstep: number;
		public steplist: Array<number>;
		public insttype: number;
		public autoenter: number;
		public static read(self: s2c_ask_into_instance, data: ByteArray): void {
			var sAskIntoInstance = Network._instance.protoTypePool.SAskIntoInstance.decode(data);
			self.msgid = sAskIntoInstance.msgid;
			self.teamleadername = sAskIntoInstance.teamleadername;
			self.awardtimes = sAskIntoInstance.awardtimes;
			self.step = sAskIntoInstance.step;
			self.tlstep = sAskIntoInstance.tlstep;
			self.mystep = sAskIntoInstance.mystep;
			self.allstep = sAskIntoInstance.allstep;
			self.steplist = sAskIntoInstance.steplist;
			self.insttype = sAskIntoInstance.insttype;
			self.autoenter = sAskIntoInstance.autoenter;

			console.log("s2c_ask_into_instance sAskIntoInstance:", sAskIntoInstance);
			console.log("s2c_ask_into_instance sAskIntoInstance.msgid:", sAskIntoInstance.msgid);
			console.log("s2c_ask_into_instance sAskIntoInstance.teamleadername:", sAskIntoInstance.teamleadername);
			console.log("s2c_ask_into_instance sAskIntoInstance.awardtimes:", sAskIntoInstance.awardtimes);
			console.log("s2c_ask_into_instance sAskIntoInstance.step:", sAskIntoInstance.step);
			console.log("s2c_ask_into_instance sAskIntoInstance.tlstep:", sAskIntoInstance.tlstep);
			console.log("s2c_ask_into_instance sAskIntoInstance.mystep:", sAskIntoInstance.mystep);
			console.log("s2c_ask_into_instance sAskIntoInstance.allstep:", sAskIntoInstance.allstep);
			console.log("s2c_ask_into_instance sAskIntoInstance.steplist:", sAskIntoInstance.steplist);
			console.log("s2c_ask_into_instance sAskIntoInstance.insttype:", sAskIntoInstance.insttype);
			console.log("s2c_ask_into_instance sAskIntoInstance.autoenter:", sAskIntoInstance.autoenter);

		}
	}

	// sGetArchiveInfo
	export class s2c_get_archive_info {
		//定义类型
		public archiveinfos: Array<AchieventInfoVo>;
		public static read(self: s2c_get_archive_info, data: ByteArray): void {
			// var sGetArchiveInfo = Network._instance.protoTypePool.SGetArchiveInfo.decode(data);
			// self.archiveinfos = sGetArchiveInfo.archiveinfos;
			// console.log("s2c_get_archive_info sGetArchiveInfo:", sGetArchiveInfo);
			// console.log("s2c_get_archive_info sGetArchiveInfo.archiveinfos:", sGetArchiveInfo.archiveinfos);
			// self.archiveinfos = new AchieventInfoVo();
			//self.archiveinfos.fromByteArray(data);

			self.archiveinfos = [];
			//let archiveinfosSize1:number = data.readUint8();
			//let archiveinfosSize: number = data.readUint8();//ByteArrayUtils.uncompact_uint32(data);

			//  let archiveinfosSize1:number = data.readUint8();//128
			/** 此处数据流存在问题,没有找到解法，暂时如此处理 */
			let archiveinfosSize: number = data.readUint8();//68
			if (archiveinfosSize == 128) {
				archiveinfosSize = data.readUint8();
			}
			let archiveInfo: AchieventInfoVo;
			for (var index = 0; index < archiveinfosSize; index++) {
				archiveInfo = new AchieventInfoVo();
				archiveInfo.fromByteArray(data);
				self.archiveinfos.push(archiveInfo);
			}
		}
	}

	// sWaitRollTime
	export class s2c_wait_roll_time {
		//定义类型
		public messageid: number;
		public static read(self: s2c_wait_roll_time, data: ByteArray): void {
			var sWaitRollTime = Network._instance.protoTypePool.SWaitRollTime.decode(data);
			self.messageid = sWaitRollTime.messageid;
			console.log("s2c_wait_roll_time sWaitRollTime:", sWaitRollTime);
			console.log("s2c_wait_roll_time sWaitRollTime.messageid:", sWaitRollTime.messageid);
		}
	}
	// SPlayXianJingCG
	export class s2c_play_xianjing_cg {
		public static read(self: s2c_play_xianjing_cg, data: ByteArray): void {
			var sPlayXianJingCG = Network._instance.protoTypePool.SPlayXianJingCG.decode(data);
			console.log("s2c_play_xianjing_cg SPlayXianJingCG:", sPlayXianJingCG);
		}
	}
	// SAddTreasureMap
	export class s2c_add_treasure_map {
		public static read(self: s2c_add_treasure_map, data: ByteArray): void {
			var sAddTreasureMap = Network._instance.protoTypePool.SAddTreasureMap.decode(data);
			console.log("s2c_add_treasure_map SAddTreasureMap:", sAddTreasureMap);
		}
	}
	// sAnswerInstance
	export class s2c_answer_instance {
		//定义类型
		public messageid: number;
		public landname: string;
		public static read(self: s2c_answer_instance, data: ByteArray): void {
			var sAnswerInstance = Network._instance.protoTypePool.SAnswerInstance.decode(data);
			self.messageid = sAnswerInstance.messageid;
			self.landname = sAnswerInstance.landname;
			console.log("s2c_answer_instance sAnswerInstance:", sAnswerInstance);
			console.log("s2c_answer_instance sAnswerInstance.messageid:", sAnswerInstance.messageid);
			console.log("s2c_answer_instance sAnswerInstance.landname:", sAnswerInstance.landname);
		}
	}
	// sRequestChapterInfo
	export class s2c_request_chapter_info {
		//定义类型
		public chapters: Array<number>;
		public static read(self: s2c_request_chapter_info, data: ByteArray): void {
			var sRequestChapterInfo = Network._instance.protoTypePool.SRequestChapterInfo.decode(data);
			self.chapters = sRequestChapterInfo.chapters;
			console.log("s2c_request_chapter_info sRequestChapterInfo:", sRequestChapterInfo);
			console.log("s2c_request_chapter_info sRequestChapterInfo.chapters:", sRequestChapterInfo.chapters);
		}
	}

	// sRequestChapterChallenge
	export class s2c_request_chapter_challenge {
		//定义类型
		public result: number;
		public static read(self: s2c_request_chapter_challenge, data: ByteArray): void {
			var sRequestChapterChallenge = Network._instance.protoTypePool.SRequestChapterChallenge.decode(data);
			self.result = sRequestChapterChallenge.result;
			console.log("s2c_request_chapter_challenge sRequestChapterChallenge:", sRequestChapterChallenge);
			console.log("s2c_request_chapter_challenge sRequestChapterChallenge.result:", sRequestChapterChallenge.result);
		}
	}

	//move.xml
	// sRoleMove
	export class s2c_role_move {
		//定义类型
		public roleid: number;
		public destPos: any;
		public static read(self: s2c_role_move, data: ByteArray): void {
			self.roleid = data.readLong();
			self.destPos = new Vector2();
			self.destPos.x = data.readShort() / 16;
			self.destPos.y = data.readShort() / 16;
		}
	}
	// sSetRoleLocation
	export class s2c_set_role_location {
		//定义类型
		public roleid: number;
		public position: Vector2;
		public locz: number;

		public static read(self: s2c_set_role_location, data: ByteArray): void {
			self.roleid = data.readLong();
			self.position = new Vector2();
			self.position.x = data.readInt16();
			self.position.y = data.readInt16();
			self.locz = data.readByte();
		}
	}
	// sAddUserScreen
	export class s2c_add_user_screen {
		//定义类型
		public rolelist: Array<any>;
		public npclist: Array<any>;
		public static read(self: s2c_add_user_screen, data: ByteArray): void {
			let rolelistSize: number = ByteArrayUtils.uncompact_uint32(data);
			self.rolelist = [];
			let roleBasic: game.scene.models.RoleBasicVo;
			for (var index = 0; index < rolelistSize; index++) {
				roleBasic = new game.scene.models.RoleBasicVo();
				roleBasic.fromByteArray(data);
				self.rolelist.push(roleBasic);
			}

			self.npclist = [];
			let npclistSize: number = ByteArrayUtils.uncompact_uint32(data);
			let npcBasic: game.scene.models.NpcBasicVo;
			for (var index = 0; index < npclistSize; index++) {
				npcBasic = new game.scene.models.NpcBasicVo();
				npcBasic.fromByteArray(data);
				self.npclist.push(npcBasic);
			}
		}
	}
	// sRemoveUserScreen
	export class s2c_remove_user_screen {
		//定义类型
		public roleids: Array<number>;
		public npcids: Array<number>;
		public static read(self: s2c_remove_user_screen, data: ByteArray): void {
			self.roleids = [];
			let roleidsSize: number = data.readUint8();
			for (var index = 0; index < roleidsSize; index++) {
				let long: number = data.readLong();
				self.roleids.push(long);
			}
			self.npcids = [];
			let npcidsSize: number = data.readUint8();
			for (var index = 0; index < npcidsSize; index++) {
				let long: number = data.readLong();
				self.npcids.push(long);
			}
		}
	}
	// SRoleTurn
	export class s2c_role_turn {
		//定义类型
		public roleid: number;
		public direction: number;
		public static read(self: s2c_role_turn, data: ByteArray): void {
			var SRoleTurn = Network._instance.protoTypePool.SRoleTurn.decode(data);
			self.roleid = SRoleTurn.roleid;
			self.direction = SRoleTurn.direction;
			console.log("s2c_role_turn SRoleTurn:", SRoleTurn);
			console.log("s2c_role_turn SRoleTurn.roleid:", SRoleTurn.roleid);
			console.log("s2c_role_turn SRoleTurn.direction:", SRoleTurn.direction);
		}
	}
	// sRoleEnterScene
	export class s2c_role_enter_scene {
		//定义类型
		public ownerName: string;
		public destPos: any;
		public destz: number;
		public changetype: number;
		public sceneID: number;
		public weatherId: number;
		public tipsParm: string;

		public static read(self: s2c_role_enter_scene, data: ByteArray): void {
			self.ownerName = ByteArrayUtils.readUtf16String(data);

			self.destPos = new Vector2();
			self.destPos.x = data.readInt16() / 16;
			self.destPos.y = data.readInt16() / 16;

			self.destz = data.readByte();
			self.changetype = data.readInt32();
			self.sceneID = ByteArrayUtils.readLong(data);
			self.weatherId = data.readByte();
			self.tipsParm = ByteArrayUtils.readUtf16String(data);
		}
	}

	// sRoleStop
	export class s2c_role_stop {
		//定义类型
		public roleid: number;
		public pos: Vector2;
		public static read(self: s2c_role_stop, data: ByteArray): void {
			self.roleid = data.readLong();

			self.pos = new Vector2();
			self.pos.x = data.readInt16() / 16;
			self.pos.y = data.readInt16() / 16;
		}
	}

	// SSetRoleTeamInfo
	export class s2c_set_role_team_info {
		//定义类型
		public roleid: number;
		public teamid: number;
		public teamindex: number;
		public teamstate: number;
		public teamnormalnum: number;

		public static read(self: s2c_set_role_team_info, data: ByteArray): void {
			self.roleid = data.readLong();
			self.teamid = data.readLong();
			self.teamindex = data.readInt32();
			self.teamstate = data.readInt32();
			self.teamnormalnum = data.readInt32();


		}
	}
	// sAddPickupScreen
	export class s2c_add_pickup_screen {
		//定义类型
		public pickuplist: Array<any>;
		public static read(self: s2c_add_pickup_screen, data: ByteArray): void {
			var sAddPickupScreen = Network._instance.protoTypePool.SAddPickupScreen.decode(data);
			self.pickuplist = sAddPickupScreen.pickuplist;
			console.log("s2c_add_pickup_screen sAddPickupScreen:", sAddPickupScreen);
			console.log("s2c_add_pickup_screen sAddPickupScreen.pickuplist:", sAddPickupScreen.pickuplist);
		}
	}
	// sRemovePickupScreen
	export class s2c_remove_pickup_screen {
		//定义类型
		public pickupids: Array<number>;
		public static read(self: s2c_remove_pickup_screen, data: ByteArray): void {
			var sRemovePickupScreen = Network._instance.protoTypePool.SRemovePickupScreen.decode(data);
			self.pickupids = sRemovePickupScreen.pickupids;
			console.log("s2c_remove_pickup_screen sRemovePickupScreen:", sRemovePickupScreen);
			console.log("s2c_remove_pickup_screen sRemovePickupScreen.pickupids:", sRemovePickupScreen.pickupids);
		}
	}
	// SHideRole
	export class s2c_hide_role {
		//定义类型
		public hide: number;
		public static read(self: s2c_hide_role, data: ByteArray): void {
			var sHideRole = Network._instance.protoTypePool.SHideRole.decode(data);
			self.hide = sHideRole.hide;
			console.log("s2c_hide_role sHideRole:", sHideRole);
			console.log("s2c_hide_role sHideRole.hide:", sHideRole.hide);
		}
	}
	// SRelocateRolePos
	export class s2c_relocate_rolepos {
		public static read(self: s2c_relocate_rolepos, data: ByteArray): void {
			var sRelocateRolePos = Network._instance.protoTypePool.SRelocateRolePos.decode(data);
			console.log("s2c_relocate_rolepos SRelocateRolePos:", sRelocateRolePos);
		}
	}
	// sAddActivityNpc
	export class s2c_add_activity_npc {
		//定义类型
		public npcids: Array<number>;
		public poslist: Array<any>;
		public static read(self: s2c_add_activity_npc, data: ByteArray): void {
			var sAddActivityNpc = Network._instance.protoTypePool.SAddActivityNpc.decode(data);
			self.npcids = sAddActivityNpc.npcids;
			self.poslist = sAddActivityNpc.poslist;
			console.log("s2c_add_activity_npc sAddActivityNpc:", sAddActivityNpc);
			console.log("s2c_add_activity_npc sAddActivityNpc.npcids:", sAddActivityNpc.npcids);
			console.log("s2c_add_activity_npc sAddActivityNpc.poslist:", sAddActivityNpc.poslist);
		}
	}
	// sRemoveActivityNpc
	export class s2c_remove_activity_npc {
		//定义类型
		public npcids: Array<number>;
		public static read(self: s2c_remove_activity_npc, data: ByteArray): void {
			var sRemoveActivityNpc = Network._instance.protoTypePool.SRemoveActivityNpc.decode(data);
			self.npcids = sRemoveActivityNpc.npcids;
			console.log("s2c_remove_activity_npc sRemoveActivityNpc:", sRemoveActivityNpc);
			console.log("s2c_remove_activity_npc sRemoveActivityNpc.npcids:", sRemoveActivityNpc.npcids);
		}
	}
	// sTransfromShape
	export class s2c_transfrom_shape {
		//定义类型
		public playerid: number;
		public shape: number;
		public static read(self: s2c_transfrom_shape, data: ByteArray): void {
			var sTransfromShape = Network._instance.protoTypePool.STransfromShape.decode(data);
			self.playerid = sTransfromShape.playerid;
			self.shape = sTransfromShape.shape;
			console.log("s2c_transfrom_shape sTransfromShape:", sTransfromShape);
			console.log("s2c_transfrom_shape sTransfromShape.playerid:", sTransfromShape.playerid);
			console.log("s2c_transfrom_shape sTransfromShape.shape:", sTransfromShape.shape);
		}
	}

	// sGMGetAroundRoles
	export class s2c_gm_get_around_roles {
		//定义类型
		public roles: Array<any>;
		public static read(self: s2c_gm_get_around_roles, data: ByteArray): void {
			var sGMGetAroundRoles = Network._instance.protoTypePool.SGMGetAroundRoles.decode(data);
			self.roles = sGMGetAroundRoles.roles;
			console.log("s2c_gm_get_around_roles sGMGetAroundRoles:", sGMGetAroundRoles);
			console.log("s2c_gm_get_around_roles sGMGetAroundRoles.roles:", sGMGetAroundRoles.roles);
		}
	}
	// sUpdateRoleSceneState
	export class s2c_update_role_scene_state {
		//定义类型
		public roleId: number;
		public scenestate: number;
		public static read(self: s2c_update_role_scene_state, data: ByteArray): void {
			/*var sUpdateRoleSceneState = Network._instance.protoTypePool.SUpdateRoleSceneState.decode(data);
			self.roleId = sUpdateRoleSceneState.roleId;
			self.scenestate = sUpdateRoleSceneState.scenestate;*/

			self.roleId = data.readLong();
			self.scenestate = data.readInt32();
			console.log("s2c_update_role_scene_state self:", self);
		}
	}
	// sUpdateNpcSceneState
	export class s2c_update_npc_scene_state {
		//定义类型
		public npckey: number;
		public scenestate: number;
		public static read(self: s2c_update_npc_scene_state, data: ByteArray): void {
			var sUpdateNpcSceneState = Network._instance.protoTypePool.SUpdateNpcSceneState.decode(data);
			self.npckey = sUpdateNpcSceneState.npckey;
			self.scenestate = sUpdateNpcSceneState.scenestate;
			console.log("s2c_update_npc_scene_state sUpdateNpcSceneState:", sUpdateNpcSceneState);
			console.log("s2c_update_npc_scene_state sUpdateNpcSceneState.npckey:", sUpdateNpcSceneState.npckey);
			console.log("s2c_update_npc_scene_state sUpdateNpcSceneState.scenestate:", sUpdateNpcSceneState.scenestate);
		}
	}
	// sRoleModelChange
	export class s2c_role_model_change {
		//定义类型
		public roleid: number;
		public shape: number;
		public static read(self: s2c_role_model_change, data: ByteArray): void {
			var sRoleModelChange = Network._instance.protoTypePool.SRoleModelChange.decode(data);
			self.roleid = sRoleModelChange.roleid;
			self.shape = sRoleModelChange.shape;
			console.log("s2c_role_model_change sRoleModelChange:", sRoleModelChange);
			console.log("s2c_role_model_change sRoleModelChange.roleid:", sRoleModelChange.roleid);
			console.log("s2c_role_model_change sRoleModelChange.shape:", sRoleModelChange.shape);
		}
	}
	// sRoleComponentsChange
	export class s2c_role_components_change {
		//定义类型
		public roleid: number;  //精灵ID（包括人物和npc）
		public spritetype: any;  //0代表角色，1代表npc
		public components: Laya.Dictionary;  //角色换装信息key值参考SpriteComponents的枚举，value为0代表脱下某件换装

		public static read(self: s2c_role_components_change, data: ByteArray): void {
			self.roleid = ByteArrayUtils.readLong(data);
			self.spritetype = data.readByte();
			let length = data.readInt8();
			self.components = new Laya.Dictionary();
			for (var componentsIndex = 0; componentsIndex < length; componentsIndex++) {
				self.components.set(data.readByte(), data.readInt32());

			}
		}
	}
	// SRoleJump
	export class s2c_role_jump {
		//定义类型
		public roleid: number;
		public srcpos: any;
		public destPos: any;
		public jumptype: number;

		public static read(self: s2c_role_jump, data: ByteArray): void {
			var sRoleJump = Network._instance.protoTypePool.SRoleJump.decode(data);
			self.roleid = sRoleJump.roleid;
			self.srcpos = sRoleJump.srcpos;
			self.destPos = sRoleJump.destPos;
			self.jumptype = sRoleJump.jumptype;
			console.log("s2c_role_jump sRoleJump:", sRoleJump);
			console.log("s2c_role_jump sRoleJump.roleid:", sRoleJump.roleid);
			console.log("s2c_role_jump sRoleJump.srcpos:", sRoleJump.srcpos);
			console.log("s2c_role_jump sRoleJump.destPos:", sRoleJump.destPos);
			console.log("s2c_role_jump sRoleJump.jumptype:", sRoleJump.jumptype);

		}
	}
	// sRoleJumpDrawback
	export class s2c_role_jump_drawback {
		//定义类型
		public roleid: number;
		public srcpos: any;
		public srcz: number;

		public static read(self: s2c_role_jump_drawback, data: ByteArray): void {
			var sRoleJumpDrawback = Network._instance.protoTypePool.SRoleJumpDrawback.decode(data);
			self.roleid = sRoleJumpDrawback.roleid;
			self.srcpos = sRoleJumpDrawback.srcpos;
			self.srcz = sRoleJumpDrawback.srcz;
			console.log("s2c_role_jump_drawback sRoleJumpDrawback:", sRoleJumpDrawback);
			console.log("s2c_role_jump_drawback sRoleJumpDrawback.roleid:", sRoleJumpDrawback.roleid);
			console.log("s2c_role_jump_drawback sRoleJumpDrawback.srcpos:", sRoleJumpDrawback.srcpos);
			console.log("s2c_role_jump_drawback sRoleJumpDrawback.srcz:", sRoleJumpDrawback.srcz);
		}
	}
	// sNPCMoveTo
	export class s2c_npc_moveto {
		//定义类型
		public npckey: number;
		public speed: number;
		public destpos: any;

		public static read(self: s2c_npc_moveto, data: ByteArray): void {
			var sNPCMoveTo = Network._instance.protoTypePool.SNPCMoveTo.decode(data);
			self.npckey = sNPCMoveTo.npckey;
			self.speed = sNPCMoveTo.speed;
			self.destpos = sNPCMoveTo.destpos;
			console.log("s2c_npc_moveto sNPCMoveTo:", sNPCMoveTo);
			console.log("s2c_npc_moveto sNPCMoveTo.npckey:", sNPCMoveTo.npckey);
			console.log("s2c_npc_moveto sNPCMoveTo.speed:", sNPCMoveTo.speed);
			console.log("s2c_npc_moveto sNPCMoveTo.destpos:", sNPCMoveTo.destpos);
		}
	}
	// sBeginBaitang
	export class s2c_begin_baitang {
		//定义类型
		public roleid1: number;
		public roleid2: number;
		public static read(self: s2c_begin_baitang, data: ByteArray): void {
			var sBeginBaitang = Network._instance.protoTypePool.SBeginBaitang.decode(data);
			self.roleid1 = sBeginBaitang.roleid1;
			self.roleid2 = sBeginBaitang.roleid2;
			console.log("s2c_begin_baitang sBeginBaitang:", sBeginBaitang);
			console.log("s2c_begin_baitang sBeginBaitang.roleid1:", sBeginBaitang.roleid1);
			console.log("s2c_begin_baitang sBeginBaitang.roleid2:", sBeginBaitang.roleid2);
		}
	}
	// sRoleChangeShape
	export class s2c_role_change_shape {
		//定义类型
		public roleid: number;
		public shape: number;
		public static read(self: s2c_role_change_shape, data: ByteArray): void {
			var sRoleChangeShape = Network._instance.protoTypePool.SRoleChangeShape.decode(data);
			self.roleid = sRoleChangeShape.roleid;
			self.shape = sRoleChangeShape.shape;
			console.log("s2c_role_change_shape sRoleChangeShape:", sRoleChangeShape);
			console.log("s2c_role_change_shape sRoleChangeShape.roleid:", sRoleChangeShape.roleid);
			console.log("s2c_role_change_shape sRoleChangeShape.shape:", sRoleChangeShape.shape);
		}
	}
	// sRolePlayAction
	export class s2c_role_play_action {
		//定义类型
		public roleid: number;
		public actionid: number;
		public static read(self: s2c_role_play_action, data: ByteArray): void {
			var sRolePlayAction = Network._instance.protoTypePool.SRolePlayAction.decode(data);
			self.roleid = sRolePlayAction.roleid;
			self.actionid = sRolePlayAction.actionid;
			console.log("s2c_role_play_action sRolePlayAction:", sRolePlayAction);
			console.log("s2c_role_play_action sRolePlayAction.roleid:", sRolePlayAction.roleid);
			console.log("s2c_role_play_action sRolePlayAction.actionid:", sRolePlayAction.actionid);
		}
	}
	// sChangeEquipEffect
	export class s2c_change_equip_effect {
		//定义类型
		public playerid: number;
		public effect: number;
		public static read(self: s2c_change_equip_effect, data: ByteArray): void {
			var sChangeEquipEffect = Network._instance.protoTypePool.SChangeEquipEffect.decode(data);
			self.playerid = sChangeEquipEffect.playerid;
			self.effect = sChangeEquipEffect.effect;
			console.log("s2c_change_equip_effect sChangeEquipEffect:", sChangeEquipEffect);
			console.log("s2c_change_equip_effect sChangeEquipEffect.playerid:", sChangeEquipEffect.playerid);
			console.log("s2c_change_equip_effect sChangeEquipEffect.effect:", sChangeEquipEffect.effect);
		}
	}
	// sVisitNpc
	export class s2c_visit_npc {
		//定义类型
		public npckey: number;
		public services: Array<number>;
		public scenarioquests: Array<number>;

		public static read(self: s2c_visit_npc, data: ByteArray): void {
			self.npckey = data.readLong();

			self.services = [];
			let servicesSize: number = data.readUint8();

			for (var index = 0; index < servicesSize; index++) {

				self.services[index] = data.readInt32();
			}
			self.scenarioquests = [];
			let scenarioquestsSize: number = data.readUint8();
			for (var index = 0; index < scenarioquestsSize; index++) {
				self.scenarioquests[index] = data.readInt32();
			}
		}
	}
	// sReqFortuneWheel
	export class s2c_req_fortune_wheel {
		//定义类型
		public npckey: number;
		public serviceid: any;
		public itemids: Array<any>;
		public index: number;
		public flag: number;

		public static read(self: s2c_req_fortune_wheel, data: ByteArray): void {
			self.npckey = data.readLong();
			self.serviceid = data.readInt32();

			self.itemids = [];
			let itemidsSize: number = data.readUint8();
			let forturneWheelType: game.modules.friend.models.ForturneWheelTypeVo;
			for (var index = 0; index < itemidsSize; index++) {
				forturneWheelType = new game.modules.friend.models.ForturneWheelTypeVo();
				forturneWheelType.fromByteArray(data);
				self.itemids.push(forturneWheelType);
			}
			self.index = data.readInt32();
			self.flag = data.readByte();

		}
	}
	// sBattleToNpcError
	export class s2c_battle_to_npc_error {
		//定义类型
		public battleerror: number;
		public static read(self: s2c_battle_to_npc_error, data: ByteArray): void {
			var sBattleToNpcError = Network._instance.protoTypePool.SBattleToNpcError.decode(data);
			self.battleerror = sBattleToNpcError.battleerror;
			console.log("s2c_battle_to_npc_error sBattleToNpcError:", sBattleToNpcError);
			console.log("s2c_battle_to_npc_error sBattleToNpcError.battleerror:", sBattleToNpcError.battleerror);
		}
	}
	// SSendNpcMsg
	export class s2c_send_npc_msg {
		//定义类型
		public npckey: number;
		public npcid: number;
		public msgid: number;
		public args: Array<number>;

		public static read(self: s2c_send_npc_msg, data: ByteArray): void {
			var SSendNpcMsg = Network._instance.protoTypePool.SSendNpcMsg.decode(data);
			self.npckey = SSendNpcMsg.npckey;
			self.npcid = SSendNpcMsg.npcid;
			self.msgid = SSendNpcMsg.msgid;
			self.args = SSendNpcMsg.args;

			console.log("s2c_send_npc_msg SSendNpcMsg:", SSendNpcMsg);
			console.log("s2c_send_npc_msg SSendNpcMsg.npckey:", SSendNpcMsg.npckey);
			console.log("s2c_send_npc_msg SSendNpcMsg.npcid:", SSendNpcMsg.serviceid);
			console.log("s2c_send_npc_msg SSendNpcMsg.msgid:", SSendNpcMsg.msgid);
			console.log("s2c_send_npc_msg SSendNpcMsg.args:", SSendNpcMsg.args);
		}
	}
	// SSubmit2Npc
	export class s2c_submit_2npc {
		//定义类型
		public questid: number;
		public npckey: number;
		public submittype: number;
		public availableIds: Array<any>;
		public availablePos: number;

		public static read(self: s2c_submit_2npc, data: ByteArray): void {
			self.questid = data.readInt32();
			self.npckey = data.readLong();
			self.submittype = data.readInt32();
			self.availableIds = [];
			let availableIdsSize: number = data.readUint8();
			for (var index = 0; index < availableIdsSize; index++) {
				self.availableIds.push(data.readInt32);
			}
			self.availablePos = data.readInt32();
		}
	}
	// sTrackedMissions
	export class s2c_tracked_missions {
		//定义类型
		public trackedmissions: Laya.Dictionary;
		public static read(self: s2c_tracked_missions, data: ByteArray): void {
			self.trackedmissions = new Laya.Dictionary();
			let trackedmissionsSize: number = data.readUint8();
			let trackedMission: game.modules.task.models.TrackedMissionVo;
			for (var index = 0; index < trackedmissionsSize; index++) {
				trackedMission = new game.modules.task.models.TrackedMissionVo();
				let key = data.readInt32();
				self.trackedmissions.set(key, trackedMission);
				trackedMission.fromByteArray(data);
			}
		}
	}

	//广播服务器时间
	export class S2C_SGameTime {
		public servertime: number;//广播服务器时间

		public static read(self: S2C_SGameTime, data: ByteArray): void {
			// var sGameTime = Network._instance.protoTypePool.SGameTime.decode(data);
			// self.servertime = sGameTime.servertime;
			// console.log("S2C_SGameTime sGameTime:", sGameTime);
			// console.log("S2C_SGameTime sGameTime.servertime", sGameTime.servertime);
			self.servertime = data.readLong();
		}
	}

	//
	export class S2C_SCreateRoleError {
		public errCode: number;//错误码

		public static read(self: S2C_SCreateRoleError, data: ByteArray): void {
			self.errCode = data.readInt32();
		}
	}

	//通知客户端刷新人物经验
	export class S2C_SRefreshUserExp {
		public curexp: number;//当前经验

		public static read(self: S2C_SRefreshUserExp, data: ByteArray): void {
			self.curexp = data.readLong();
			console.log("S2C_SRefreshUserExp++++++++++++++++++++++++", self.curexp);
		}
	}

	//通知客户端刷新血量
	export class S2C_SRefreshHp {
		public hp: number;//

		public static read(self: S2C_SRefreshHp, data: ByteArray): void {
			var sRefreshHp = Network._instance.protoTypePool.SRefreshHp.decode(data);
			self.hp = sRefreshHp.hp;
			console.log("S2C_SRefreshHp sRefreshHp:", sRefreshHp);
			console.log("S2C_SRefreshHp sRefreshHp.hp", sRefreshHp.hp);
		}
	}

	//服务器发送客户端最新的系统设置
	export class S2C_SResetSysConfig {
		public sysconfigmap: any;//

		public static read(self: S2C_SResetSysConfig, data: ByteArray): void {
			self.sysconfigmap = new Laya.Dictionary();
			let mapSize = data.readUint8();
			for (let index = 0; index < mapSize; index++) {
				self.sysconfigmap.set(data.readInt32(), data.readInt32());
			}
		}
	}

	//通知客户端刷新储备金
	export class S2C_SRefSmoney {
		public smoney: number;//

		public static read(self: S2C_SRefSmoney, data: ByteArray): void {
			var sRefSmoney = Network._instance.protoTypePool.SRefSmoney.decode(data);
			self.smoney = sRefSmoney.smoney;
			console.log("S2C_SRefSmoney sRefSmoney:", sRefSmoney);
			console.log("S2C_SRefSmoney sRefSmoney.smoney", sRefSmoney.smoney);
		}
	}

	//
	export class S2C_SError {
		public error: number;//

		public static read(self: S2C_SError, data: ByteArray): void {
			var sError = Network._instance.protoTypePool.SError.decode(data);
			self.error = sError.error;
			console.log("S2C_SError sError:", sError);
			console.log("S2C_SError sError.error", sError.error);
		}
	}

	//返回玩家请求的属性对应的属性值
	export class S2C_SRetRoleProp {
		public roleid: number;//
		public datas: any;//属性值对

		public static read(self: S2C_SRetRoleProp, data: ByteArray): void {
			var sRetRoleProp = Network._instance.protoTypePool.SRetRoleProp.decode(data);
			self.roleid = sRetRoleProp.roleid;
			self.datas = sRetRoleProp.datas;
			console.log("S2C_SRetRoleProp sRetRoleProp:", sRetRoleProp);
			console.log("S2C_SRetRoleProp sRetRoleProp.roleid", sRetRoleProp.roleid);
			console.log("S2C_SRetRoleProp sRetRoleProp.datas", sRetRoleProp.datas);
		}
	}

	//返回玩家请求的属性对应的属性值
	export class S2C_SStartPlayCG {
		public id: number;//

		public static read(self: S2C_SStartPlayCG, data: ByteArray): void {
			var sStartPlayCG = Network._instance.protoTypePool.SStartPlayCG.decode(data);
			self.id = sStartPlayCG.id;
			console.log("S2C_SStartPlayCG sStartPlayCG:", sStartPlayCG);
			console.log("S2C_SStartPlayCG sStartPlayCG.id", sStartPlayCG.id);
		}
	}

	//
	export class S2C_SBeginnerTip {
		public tipid: number;//id为BeginnerTipType
		public tipvalue: number;//0为未显示,1为已显示

		public static read(self: S2C_SBeginnerTip, data: ByteArray): void {
			var sBeginnerTip = Network._instance.protoTypePool.SBeginnerTip.decode(data);
			self.tipid = sBeginnerTip.tipid;
			self.tipvalue = sBeginnerTip.tipvalue;
			console.log("S2C_SBeginnerTip sBeginnerTip:", sBeginnerTip);
			console.log("S2C_SBeginnerTip sBeginnerTip.tipid", sBeginnerTip.tipid);
			console.log("S2C_SBeginnerTip sBeginnerTip.tipvalue", sBeginnerTip.tipvalue);
		}
	}

	//
	export class S2C_SShowedBeginnerTips {
		public tipid: number;//
		public pilotType: number;//适配引导类型

		public static read(self: S2C_SShowedBeginnerTips, data: ByteArray): void {
			var sShowedBeginnerTips = Network._instance.protoTypePool.SShowedBeginnerTips.decode(data);
			self.tipid = sShowedBeginnerTips.tipid;
			self.pilotType = sShowedBeginnerTips.pilotType;
			console.log("S2C_SShowedBeginnerTips sBeginnerTip:", sShowedBeginnerTips);
			console.log("S2C_SShowedBeginnerTips sBeginnerTip.tipid", sShowedBeginnerTips.tipid);
			console.log("S2C_SShowedBeginnerTips sBeginnerTip.pilotType", sShowedBeginnerTips.pilotType);
		}
	}

	//返回玩家请求的其他玩家的组队情况
	export class S2C_SAnswerRoleTeamState {
		public roleid: number;//
		public level: number;//等级
		public teamstate: number;//是否有队伍，0表示没有队伍，1表示有队伍

		public static read(self: S2C_SAnswerRoleTeamState, data: ByteArray): void {
			self.roleid = data.readLong();
			self.level = data.readInt32();
			self.teamstate = data.readInt32();
			console.log("S2C_SAnswerRoleTeamState++++++++++++++++++++++", self.teamstate);
		}
	}

	//返回请求生成随机名字
	export class S2C_SGiveName {
		public rolename: string;//

		public static read(self: S2C_SGiveName, data: ByteArray): void {
			self.rolename = ByteArrayUtils.readUtf16String(data);
		}
	}

	//创建角色重名时，服务器回给客户端推荐名字
	export class S2C_SRecommendsNames {
		public recommendNames: any;//

		public static read(self: S2C_SRecommendsNames, data: ByteArray): void {
			self.recommendNames = [];
			let mapSize = ByteArrayUtils.uncompact_uint32(data);
			for (let index = mapSize; index > -1; index--) {
				ByteArrayUtils.uncompact_uint32(data);
				self.recommendNames.push(ByteArrayUtils.readUtf16String(data));
			}
		}
	}

	//服务器发给客户端，允许返回角色选择界面，并发送已有角色信息列表，同SRoleList
	export class S2C_SReturnRoleList {
		public prevLoginRoleid: number;//
		public prevRoleInBattle: number;//1 = 在战斗托管中；0 = 不在游戏中
		public roles: any;//
		public gacdon: number;//gacd是否开启,1为开启,0为关闭

		public static read(self: S2C_SReturnRoleList, data: ByteArray): void {
			var sReturnRoleList = Network._instance.protoTypePool.SReturnRoleList.decode(data);
			self.prevLoginRoleid = sReturnRoleList.prevLoginRoleid;
			self.prevRoleInBattle = sReturnRoleList.prevRoleInBattle;
			self.roles = sReturnRoleList.roles;
			self.gacdon = sReturnRoleList.gacdon;
			console.log("S2C_SReturnRoleList sReturnRoleList:", sReturnRoleList);
			console.log("S2C_SReturnRoleList sReturnRoleList.prevLoginRoleid", sReturnRoleList.prevLoginRoleid);
			console.log("S2C_SReturnRoleList sReturnRoleList.prevRoleInBattle", sReturnRoleList.prevRoleInBattle);
			console.log("S2C_SReturnRoleList sReturnRoleList.roles", sReturnRoleList.roles);
			console.log("S2C_SReturnRoleList sReturnRoleList.gacdon", sReturnRoleList.gacdon);
		}
	}

	//服务器：发送排队信息
	export class S2C_SSendQueueInfo {
		public order: number;//排位 ，等于0时为在0位次，等于-1时表示排队人数已满
		public queuelength: number;//队列总长度
		public minutes: number;//剩余时间

		public static read(self: S2C_SSendQueueInfo, data: ByteArray): void {
			var sSendQueueInfo = Network._instance.protoTypePool.SSendQueueInfo.decode(data);
			self.order = sSendQueueInfo.order;
			self.queuelength = sSendQueueInfo.queuelength;
			self.minutes = sSendQueueInfo.minutes;
			console.log("S2C_SSendQueueInfo sSendQueueInfo:", sSendQueueInfo);
			console.log("S2C_SSendQueueInfo sSendQueueInfo.order", sSendQueueInfo.order);
			console.log("S2C_SSendQueueInfo sSendQueueInfo.queuelength", sSendQueueInfo.queuelength);
			console.log("S2C_SSendQueueInfo sSendQueueInfo.minutes", sSendQueueInfo.minutes);
		}
	}

	//服务器：通知客户端下线
	export class S2C_SRoleOffline {
		public static read(self: S2C_SRoleOffline, data: ByteArray): void {

		}
	}

	//服务器：通知客户端返回登录界面
	export class S2C_SReturnLogin {
		public reason: number;//
		public ext: number;//

		public static read(self: S2C_SReturnLogin, data: ByteArray): void {
			self.reason = data.readInt32();;
			self.ext = data.readInt32();
		}
	}

	//服务器：发送缓慢进入排队信息
	export class S2C_SSendSlowQueueInfo {
		public order: number;//排位
		public queuelength: number;//总排队人数
		public second: number;//剩余时间(秒)

		public static read(self: S2C_SSendSlowQueueInfo, data: ByteArray): void {
			var sSendSlowQueueInfo = Network._instance.protoTypePool.SSendSlowQueueInfo.decode(data);
			self.order = sSendSlowQueueInfo.order;
			self.queuelength = sSendSlowQueueInfo.queuelength;
			self.second = sSendSlowQueueInfo.second;
			console.log("S2C_SSendSlowQueueInfo sSendSlowQueueInfo:", sSendSlowQueueInfo);
			console.log("S2C_SSendSlowQueueInfo sSendSlowQueueInfo.order", sSendSlowQueueInfo.order);
			console.log("S2C_SSendSlowQueueInfo sSendSlowQueueInfo.queuelength", sSendSlowQueueInfo.queuelength);
			console.log("S2C_SSendSlowQueueInfo sSendSlowQueueInfo.second", sSendSlowQueueInfo.second);
		}
	}

	//客户端使用千里寻踪蝶请求玩家坐标
	export class S2C_SFirstDayExitGame {
		public firstdayleftsecond: number;//今天还剩多少秒

		public static read(self: S2C_SFirstDayExitGame, data: ByteArray): void {
			var sFirstDayExitGame = Network._instance.protoTypePool.SFirstDayExitGame.decode(data);
			self.firstdayleftsecond = sFirstDayExitGame.firstdayleftsecond;
			console.log("S2C_SFirstDayExitGame sFirstDayExitGame:", sFirstDayExitGame);
			console.log("S2C_SFirstDayExitGame sFirstDayExitGame.firstdayleftsecond", sFirstDayExitGame.firstdayleftsecond);
		}
	}

	//客户端进入场景完毕
	export class S2C_SGACDKickoutMsg {
		public reason: string;//
		public endtime: number;//

		public static read(self: S2C_SGACDKickoutMsg, data: ByteArray): void {
			var sGACDKickoutMsg = Network._instance.protoTypePool.SGACDKickoutMsg.decode(data);
			self.reason = sGACDKickoutMsg.reason;
			self.endtime = sGACDKickoutMsg.endtime;
			console.log("S2C_SGACDKickoutMsg sGACDKickoutMsg:", sGACDKickoutMsg);
			console.log("S2C_SGACDKickoutMsg sGACDKickoutMsg.reason", sGACDKickoutMsg.reason);
			console.log("S2C_SGACDKickoutMsg sGACDKickoutMsg.endtime", sGACDKickoutMsg.endtime);
		}
	}

	//发送服务器多倍信息
	export class S2C_SSendServerMultiExp {
		public addValue: number;//0为没有多倍，1-3为多1到3倍（即2-4倍）

		public static read(self: S2C_SSendServerMultiExp, data: ByteArray): void {
			var sSendServerMultiExp = Network._instance.protoTypePool.SSendServerMultiExp.decode(data);
			self.addValue = sSendServerMultiExp.addValue;
			console.log("S2C_SSendServerMultiExp sSendServerMultiExp:", sSendServerMultiExp);
			console.log("S2C_SSendServerMultiExp sSendServerMultiExp.addValue", sSendServerMultiExp.addValue);
		}
	}

	//发送登录IP信息
	export class S2C_SSendLoginIp {
		public loginip: number;//
		public lastip: number;//
		public lasttime: number;//

		public static read(self: S2C_SSendLoginIp, data: ByteArray): void {
			var sSendLoginIp = Network._instance.protoTypePool.SSendLoginIp.decode(data);
			self.loginip = sSendLoginIp.loginip;
			self.lastip = sSendLoginIp.lastip;
			self.lasttime = sSendLoginIp.lasttime;
			console.log("S2C_SSendLoginIp sSendLoginIp:", sSendLoginIp);
			console.log("S2C_SSendLoginIp sSendLoginIp.loginip", sSendLoginIp.loginip);
			console.log("S2C_SSendLoginIp sSendLoginIp.lastip", sSendLoginIp.lastip);
			console.log("S2C_SSendLoginIp sSendLoginIp.lasttime", sSendLoginIp.lasttime);
		}
	}

	//使用改名道具的时候发送这个协议获取曾用名
	export class S2C_SRequestUsedNameData {
		public usedNames: string;//曾用名
		public itemkey: number;//使用的改名符itemkey

		public static read(self: S2C_SRequestUsedNameData, data: ByteArray): void {
			var sRequestUsedNameData = Network._instance.protoTypePool.SRequestUsedNameData.decode(data);
			self.usedNames = sRequestUsedNameData.usedNames;
			self.itemkey = sRequestUsedNameData.itemkey;
			console.log("S2C_SRequestUsedNameData sRequestUsedNameData:", sRequestUsedNameData);
			console.log("S2C_SRequestUsedNameData sRequestUsedNameData.usedNames", sRequestUsedNameData.usedNames);
			console.log("S2C_SRequestUsedNameData sRequestUsedNameData.itemkey", sRequestUsedNameData.itemkey);
		}
	}

	//客户端请求更改名字
	export class S2C_SModifyRoleName {
		public roleid: number;//
		public newName: string;//

		public static read(self: S2C_SModifyRoleName, data: ByteArray): void {
			self.roleid = ByteArrayUtils.readLong(data);
			self.newName = ByteArrayUtils.readUtf16String(data);
		}
	}

	//人物信息界面回复
	export class S2C_SRspRoleInfo {
		public hpMpStore: any;//
		public wenCaiValue: number;//值
		public wuxun: number;//功力值
		public gongde: number;//公德值
		public honour: number;//荣誉值
		public reqkey: number;//请求类型 1表示请求人物信息界面;2 表示战斗结束

		public static read(self: S2C_SRspRoleInfo, data: ByteArray): void {
			// var sRspRoleInfo = Network._instance.protoTypePool.SRspRoleInfo.decode(data);
			// self.hpMpStore = sRspRoleInfo.hpMpStore;
			// self.wenCaiValue = sRspRoleInfo.wenCaiValue;
			// self.wuxun = sRspRoleInfo.wuxun;
			// self.gongde = sRspRoleInfo.gongde;
			// self.honour = sRspRoleInfo.honour;
			// self.reqkey = sRspRoleInfo.reqkey;
			// console.log("S2C_SRspRoleInfo sRspRoleInfo:", sRspRoleInfo);
			// console.log("S2C_SRspRoleInfo sRspRoleInfo.hpMpStore", sRspRoleInfo.hpMpStore);
			// console.log("S2C_SRspRoleInfo sRspRoleInfo.wenCaiValue", sRspRoleInfo.wenCaiValue);
			// console.log("S2C_SRspRoleInfo sRspRoleInfo.wuxun", sRspRoleInfo.wuxun);
			// console.log("S2C_SRspRoleInfo sRspRoleInfo.gongde", sRspRoleInfo.gongde);
			// console.log("S2C_SRspRoleInfo sRspRoleInfo.honour", sRspRoleInfo.honour);
			// console.log("S2C_SRspRoleInfo sRspRoleInfo.reqkey", sRspRoleInfo.reqkey);
			let mapSize: number = data.readUint8();
			self.hpMpStore = new Laya.Dictionary();
			for (var index = 0; index < mapSize; index++) {
				self.hpMpStore.set(data.readUint32(), data.readLong());
			}
			self.wenCaiValue = data.readInt32();
			self.wuxun = data.readInt32();
			self.gongde = data.readInt32();
			self.honour = data.readLong();
			self.reqkey = data.readInt32();
			console.log("S2C_SRspRoleInfo++++++++++++++", self.honour);
		}
	}

	//如果玩家需要激活,服务器发这个
	export class S2C_SUserNeedActive {
		public retCode: number;//0需要激活, 1激活码输入错误 2激活码已被使用

		public static read(self: S2C_SUserNeedActive, data: ByteArray): void {
			var sUserNeedActive = Network._instance.protoTypePool.SUserNeedActive.decode(data);
			self.retCode = sUserNeedActive.retCode;
			console.log("S2C_SUserNeedActive sUserNeedActive:", sUserNeedActive);
			console.log("S2C_SUserNeedActive sUserNeedActive.retCode", sUserNeedActive.retCode);
		}
	}

	//
	export class S2C_SNotifyDeviceInfo {
		public ip: string;//

		public static read(self: S2C_SNotifyDeviceInfo, data: ByteArray): void {
			var sNotifyDeviceInfo = Network._instance.protoTypePool.SNotifyDeviceInfo.decode(data);
			self.ip = sNotifyDeviceInfo.ip;
			console.log("S2C_SNotifyDeviceInfo sNotifyDeviceInfo:", sNotifyDeviceInfo);
			console.log("S2C_SNotifyDeviceInfo sNotifyDeviceInfo.ip", sNotifyDeviceInfo.ip);
		}
	}

	//
	export class S2C_SNotifyShieldState {
		public state: number;//0, shield 1, not shield

		public static read(self: S2C_SNotifyShieldState, data: ByteArray): void {
			var sNotifyShieldState = Network._instance.protoTypePool.SNotifyShieldState.decode(data);
			self.state = sNotifyShieldState.state;
			console.log("S2C_SNotifyShieldState sNotifyShieldState:", sNotifyShieldState);
			console.log("S2C_SNotifyShieldState sNotifyShieldState.state", sNotifyShieldState.state);
		}
	}

	//
	export class S2C_SGACDKickoutMsg1 {
		public msg: string;//

		public static read(self: S2C_SGACDKickoutMsg1, data: ByteArray): void {
			var sGACDKickoutMsg1 = Network._instance.protoTypePool.SGACDKickoutMsg1.decode(data);
			self.msg = sGACDKickoutMsg1.msg;
			console.log("S2C_SGACDKickoutMsg1 sGACDKickoutMsg1:", sGACDKickoutMsg1);
			console.log("S2C_SGACDKickoutMsg1 sGACDKickoutMsg1.msg", sGACDKickoutMsg1.msg);
		}
	}

	//
	export class S2C_SServerLevel {
		public slevel: number;//服务器等级
		public newleveldays: number;//开启新等级的剩余天数

		public static read(self: S2C_SServerLevel, data: ByteArray): void {
			self.slevel = data.readInt32();
			self.newleveldays = data.readInt32();
			console.log("S2C_SServerLevel+++++++++++++++++++", self.slevel);
		}
	}

	//客户端进入场景完毕
	export class S2C_STeamVote {
		public flag: number;//2=pvp地图提醒
		public parms: string;//

		public static read(self: S2C_STeamVote, data: ByteArray): void {
			var sTeamVote = Network._instance.protoTypePool.STeamVote.decode(data);
			self.flag = sTeamVote.flag;
			self.parms = sTeamVote.parms;
			console.log("S2C_STeamVote sTeamVote:", sTeamVote);
			console.log("S2C_STeamVote sTeamVote.flag", sTeamVote.flag);
			console.log("S2C_STeamVote sTeamVote.parms", sTeamVote.parms);
		}
	}

	//服务器发送客户端最新的系统设置
	export class S2C_SGetSysConfig {
		public sysconfigmap: any;//

		public static read(self: S2C_SGetSysConfig, data: ByteArray): void {
			self.sysconfigmap = new Laya.Dictionary();
			let mapSize = data.readUint8();
			for (let index = 0; index < mapSize; index++) {
				self.sysconfigmap.set(data.readInt32(), data.readInt32());
			}
		}
	}

	//跨服相关的协议
	export class S2C_SServerIDResponse {
		public serverid: number;//

		public static read(self: S2C_SServerIDResponse, data: ByteArray): void {
			var sServerIDResponse = Network._instance.protoTypePool.SServerIDResponse.decode(data);
			self.serverid = sServerIDResponse.serverid;
			console.log("S2C_SServerIDResponse sServerIDResponse:", sServerIDResponse);
			console.log("S2C_SServerIDResponse sServerIDResponse.serverid", sServerIDResponse.serverid);
		}
	}

	//
	export class S2C_SAddPointAttrData {
		public max_hp: number;//生命
		public max_mp: number;//魔法
		public attack: number;//物攻
		public defend: number;//物防
		public magic_attack: number;//法攻
		public magic_def: number;//法防
		public speed: number;//速度

		public static read(self: S2C_SAddPointAttrData, data: ByteArray): void {
			var sAddPointAttrData = Network._instance.protoTypePool.SAddPointAttrData.decode(data);
			self.max_hp = sAddPointAttrData.max_hp;
			self.max_mp = sAddPointAttrData.max_mp;
			self.attack = sAddPointAttrData.attack;
			self.defend = sAddPointAttrData.defend;
			self.magic_attack = sAddPointAttrData.magic_attack;
			self.magic_def = sAddPointAttrData.magic_def;
			self.speed = sAddPointAttrData.speed;
			console.log("S2C_SAddPointAttrData sAddPointAttrData:", sAddPointAttrData);
			console.log("S2C_SAddPointAttrData sAddPointAttrData.max_hp", sAddPointAttrData.max_hp);
			console.log("S2C_SAddPointAttrData sAddPointAttrData.max_mp", sAddPointAttrData.max_mp);
			console.log("S2C_SAddPointAttrData sAddPointAttrData.attack", sAddPointAttrData.attack);
			console.log("S2C_SAddPointAttrData sAddPointAttrData.defend", sAddPointAttrData.defend);
			console.log("S2C_SAddPointAttrData sAddPointAttrData.magic_attack", sAddPointAttrData.magic_attack);
			console.log("S2C_SAddPointAttrData sAddPointAttrData.magic_def", sAddPointAttrData.magic_def);
			console.log("S2C_SAddPointAttrData sAddPointAttrData.speed", sAddPointAttrData.speed);
		}
	}

	//
	export class S2C_SReqHelpCountView {
		public expvalue: number;//
		public expvaluemax: number;//
		public shengwangvalue: number;//
		public shengwangvaluemax: number;//
		public factionvalue: number;//
		public factionvaluemax: number;//
		public helpgiveitemnum: number;//援助物品次数
		public helpgiveitemnummax: number;//援助物品次数最大值
		public helpitemnum: number;//求助物品次数
		public helpitemnummax: number;//求助物品次数最大值

		public static read(self: S2C_SReqHelpCountView, data: ByteArray): void {
			self.expvalue = data.readLong();
			self.expvaluemax = data.readLong();
			self.shengwangvalue = data.readInt32();
			self.shengwangvaluemax = data.readInt32();
			self.factionvalue = data.readInt32();
			self.factionvaluemax = data.readInt32();
			self.helpgiveitemnum = data.readInt32();
			self.helpgiveitemnummax = data.readInt32();
			self.helpitemnum = data.readInt32();
			self.helpitemnummax = data.readInt32();
			console.log("S2C_SReqHelpCountView+++++++++++++++++++++");
		}
	}

	//返回人物染色衣橱信息
	export class S2C_SReqColorRoomView {
		public nummax: number;//最大空间
		public rolecolortypelist: any;//染色方案列表

		public static read(self: S2C_SReqColorRoomView, data: ByteArray): void {
			var sReqColorRoomView = Network._instance.protoTypePool.SReqColorRoomView.decode(data);
			self.nummax = sReqColorRoomView.nummax;
			self.rolecolortypelist = sReqColorRoomView.rolecolortypelist;
			console.log("S2C_SReqColorRoomView sReqColorRoomView:", sReqColorRoomView);
			console.log("S2C_SReqColorRoomView sReqColorRoomView.nummax", sReqColorRoomView.nummax);
			console.log("S2C_SReqColorRoomView sReqColorRoomView.rolecolortypelist", sReqColorRoomView.rolecolortypelist);
		}
	}

	//返回使用染色成功
	export class S2C_SReqUseColor {
		public rolecolorinfoo: any;//染色信息

		public static read(self: S2C_SReqUseColor, data: ByteArray): void {
			var sReqUseColor = Network._instance.protoTypePool.SReqUseColor.decode(data);
			self.rolecolorinfoo = sReqUseColor.rolecolorinfoo;
			console.log("S2C_SReqUseColor sReqUseColor:", sReqUseColor);
			console.log("S2C_SReqUseColor sReqUseColor.rolecolorinfoo", sReqUseColor.rolecolorinfoo);
		}
	}

	//返回宠物染色
	export class S2C_SReqUsePetColor {
		public petkey: number;//宠物ID
		public colorpos1: number;//部位1
		public colorpos2: number;//部位2

		public static read(self: S2C_SReqUsePetColor, data: ByteArray): void {
			var sReqUsePetColor = Network._instance.protoTypePool.SReqUsePetColor.decode(data);
			self.petkey = sReqUsePetColor.petkey;
			self.colorpos1 = sReqUsePetColor.colorpos1;
			self.colorpos2 = sReqUsePetColor.colorpos2;
			console.log("S2C_SReqUsePetColor sReqUsePetColor:", sReqUsePetColor);
			console.log("S2C_SReqUsePetColor sReqUsePetColor.petkey", sReqUsePetColor.petkey);
			console.log("S2C_SReqUsePetColor sReqUsePetColor.colorpos1", sReqUsePetColor.colorpos1);
			console.log("S2C_SReqUsePetColor sReqUsePetColor.colorpos2", sReqUsePetColor.colorpos2);
		}
	}

	//返回人物切换加点方案次数
	export class S2C_SReqPointSchemeTime {
		public schemetimes: number;//切换加点方案次数

		public static read(self: S2C_SReqPointSchemeTime, data: ByteArray): void {
			self.schemetimes = data.readInt32();
			console.log("S2C_SReqPointSchemeTime+++++++++++++++++", self.schemetimes);
		}
	}

	//设置功能开关
	export class S2C_SSetFunOpenClose {
		public info: any;//设置功能开关

		public static read(self: S2C_SSetFunOpenClose, data: ByteArray): void {
			var sSetFunOpenClose = Network._instance.protoTypePool.SSetFunOpenClose.decode(data);
			self.info = sSetFunOpenClose.info;
			console.log("S2C_SSetFunOpenClose sSetFunOpenClose:", sSetFunOpenClose);
			console.log("S2C_SSetFunOpenClose sSetFunOpenClose.info", sSetFunOpenClose.info);
		}
	}

	//援助声望当前值
	export class S2C_SSendHelpSW {
		public helpsw: number;//

		public static read(self: S2C_SSendHelpSW, data: ByteArray): void {
			self.helpsw = data.readInt32();
			console.log("S2C_SSendHelpSW+++++++++++++++++++", self.helpsw);
		}
	}

	//
	export class S2C_SSetLineConfig {
		public configmap: any;//

		public static read(self: S2C_SSetLineConfig, data: ByteArray): void {
			var _tempDic = new Laya.Dictionary();
			let mapSize = data.readUint8();
			for (let index = 0; index < mapSize; index++) {
				_tempDic.set(data.readInt32(), data.readInt32());
			}
			self.configmap = _tempDic;
		}
	}
	export class S2C_SDefineTeam {
		public instid: number;
		public tlstep: number;
		public mystep: number;

		public static read(self: S2C_SDefineTeam, data: ByteArray): void {
			self.instid = data.readInt32();
			self.tlstep = data.readInt32();
			self.mystep = data.readInt32();
		}
	}

	//验证码倒计时完成时间点
	export class S2C_SCheckCodeFinishTime {
		public finishTimePoint: number;

		public static read(self: S2C_SCheckCodeFinishTime, data: ByteArray): void {
			self.finishTimePoint = data.readLong();
		}
	}

	//确认关联手机返回状态1成功0失败
	export class S2C_SBindTel {
		public status: number;
		public bindTelTime: number;

		public static read(self: S2C_SBindTel, data: ByteArray): void {
			self.status = data.readByte();
			self.bindTelTime = data.readLong();
		}
	}

	//解除关联手机返回状态1成功0失败
	export class S2C_SUnBindTel {
		public status: number;//

		public static read(self: S2C_SUnBindTel, data: ByteArray): void {
			var sUnBindTel = Network._instance.protoTypePool.SUnBindTel.decode(data);
			self.status = sUnBindTel.status;
			console.log("S2C_SUnBindTel sUnBindTel:", sUnBindTel);
			console.log("S2C_SUnBindTel sUnBindTel.status", sUnBindTel.status);
		}
	}

	//返回关联手机信息
	export class S2C_SGetBindTel {
		public tel: number;
		public createDate: number;
		public isFistLoginOfDay: number;
		public isGetBindTelAward: number;
		public isBindTelAgain: number;
		public bindTelTime: number;

		public static read(self: S2C_SGetBindTel, data: ByteArray): void {
			self.tel = data.readLong();
			self.createDate = data.readLong();
			self.isFistLoginOfDay = data.readByte();
			self.isGetBindTelAward = data.readByte();
			self.isBindTelAgain = data.readByte();
			self.bindTelTime = data.readLong();
		}
	}

	//返回绑定手机奖励状态
	export class S2C_SGetBindTelAward {
		public status: number;

		public static read(self: S2C_SGetBindTelAward, data: ByteArray): void {
			self.status = data.readByte();
		}
	}

	//重新绑定手机
	export class S2C_SBindTelAgain {
		public static read(self: S2C_SBindTelAgain, data: ByteArray): void {
			var sBindTelAgain = Network._instance.protoTypePool.SBindTelAgain.decode(data);
			console.log("S2C_SBindTelAgain sBindTelAgain:", sBindTelAgain);
		}
	}

	//返回成功与否
	export class S2C_SSetPassword {
		public status: number;//1 成功 0失败

		public static read(self: S2C_SSetPassword, data: ByteArray): void {
			self.status = data.readByte();
		}
	}

	//返回成功与否
	export class S2C_SResetPassword {
		public status: number;//1 成功 0失败

		public static read(self: S2C_SResetPassword, data: ByteArray): void {
			self.status = data.readByte();
		}
	}

	//返回成功与否
	export class S2C_SDelPassword {
		public status: number;//1 成功 0失败

		public static read(self: S2C_SDelPassword, data: ByteArray): void {
			self.status = data.readByte();
		}
	}

	//解除时间点
	export class S2C_SForceDelPassword {
		public startTimePoint: number;//
		public finishTimePoint: number;//

		public static read(self: S2C_SForceDelPassword, data: ByteArray): void {
			self.startTimePoint = data.readInt32();
			self.finishTimePoint = data.readInt32();
		}
	}

	//返回成功与否
	export class S2C_SCancelForceDelPassword {
		public status: number;//1 成功 0失败

		public static read(self: S2C_SCancelForceDelPassword, data: ByteArray): void {
			self.status = data.readInt32();
		}
	}

	//返回成功与否
	export class S2C_SOpenGoodLocks {
		public status: number;//1 成功 0失败

		public static read(self: S2C_SOpenGoodLocks, data: ByteArray): void {
			self.status = data.readInt32();
		}
	}

	//返回成功与否
	export class S2C_SCloseGoodLocks {
		public status: number;//
		public closeType: number;//

		public static read(self: S2C_SCloseGoodLocks, data: ByteArray): void {
			self.status = data.readInt32();
			self.closeType = data.readInt32();
		}
	}

	//道具安全锁信息
	export class S2C_SGetGoodLocksInfo {
		public password: string;//安全锁密码
		public forceDelPdTime: number;//强制删除密码时间
		public forceDelEndTime: number;//强制删除密码结束时间
		public isFistLoginOfDay: number;//是否第一次登陆
		public errorTimes: number;//密码输入错误次数
		public lockEndTime: number;//锁定结束时间点
		public isOpenSafeLock: number;//是否开启了道具安全锁

		public static read(self: S2C_SGetGoodLocksInfo, data: ByteArray): void {
			self.password = ByteArrayUtils.readUtf16String(data);
			self.forceDelPdTime = data.readInt32();
			self.forceDelEndTime = data.readInt32();
			self.isFistLoginOfDay = data.readInt32();
			self.errorTimes = data.readInt32();
			self.lockEndTime = data.readInt32();
			self.isOpenSafeLock = data.readInt32();
		}
	}

	//道具输入密码解锁状态
	export class S2C_SGoodUnLock {
		public status: number;//

		public static read(self: S2C_SGoodUnLock, data: ByteArray): void {
			var sGoodUnLock = Network._instance.protoTypePool.SGoodUnLock.decode(data);
			self.status = sGoodUnLock.status;
			console.log("S2C_SGoodUnLock sGoodUnLock:", sGoodUnLock);
			console.log("S2C_SGoodUnLock sGoodUnLock.status", sGoodUnLock.status);
		}
	}

	//强制解锁到期状态
	export class S2C_SForceUnlockTimeExpire {
		public status: number;//1 成功 0失败时间还未到

		public static read(self: S2C_SForceUnlockTimeExpire, data: ByteArray): void {
			var sForceUnlockTimeExpire = Network._instance.protoTypePool.SForceUnlockTimeExpire.decode(data);
			self.status = sForceUnlockTimeExpire.status;
			console.log("S2C_SForceUnlockTimeExpire sForceUnlockTimeExpire:", sForceUnlockTimeExpire);
			console.log("S2C_SForceUnlockTimeExpire sForceUnlockTimeExpire.status", sForceUnlockTimeExpire.status);
		}
	}

	//改变道具锁的状态
	export class S2C_SChangeGoodLockState {
		public static read(self: S2C_SChangeGoodLockState, data: ByteArray): void {
			var sChangeGoodLockState = Network._instance.protoTypePool.SChangeGoodLockState.decode(data);
			console.log("S2C_SChangeGoodLockState sChangeGoodLockState:", sChangeGoodLockState);
		}
	}

	//验证码倒计时完成时间点
	export class S2C_SCheckCodeFinishTimePoint {
		public checkCodeType: number;//2 道具安全锁 3藏宝阁
		public finishTimePoint: number;//

		public static read(self: S2C_SCheckCodeFinishTimePoint, data: ByteArray): void {
			var sCheckCodeFinishTimePoint = Network._instance.protoTypePool.SCheckCodeFinishTimePoint.decode(data);
			self.checkCodeType = sCheckCodeFinishTimePoint.checkCodeType;
			self.finishTimePoint = sCheckCodeFinishTimePoint.finishTimePoint;
			console.log("S2C_SCheckCodeFinishTimePoint sCheckCodeFinishTimePoint:", sCheckCodeFinishTimePoint);
			console.log("S2C_SCheckCodeFinishTimePoint sCheckCodeFinishTimePoint.checkCodeType", sCheckCodeFinishTimePoint.checkCodeType);
			console.log("S2C_SCheckCodeFinishTimePoint sCheckCodeFinishTimePoint.finishTimePoint", sCheckCodeFinishTimePoint.finishTimePoint);
		}
	}

	//藏宝阁上架验证
	export class S2C_SCBGUpCheckCode {
		public status: number;//1 成功 0失败

		public static read(self: S2C_SCBGUpCheckCode, data: ByteArray): void {
			var sCBGUpCheckCode = Network._instance.protoTypePool.SCBGUpCheckCode.decode(data);
			self.status = sCBGUpCheckCode.status;
			console.log("S2C_SCBGUpCheckCode sCBGUpCheckCode:", sCBGUpCheckCode);
			console.log("S2C_SCBGUpCheckCode sCBGUpCheckCode.status", sCBGUpCheckCode.status);
		}
	}

	//
	export class S2C_SGetPetEquipInfo {
		public mydata: game.modules.pet.models.PetEquipInfoVo;//

		public static read(self: S2C_SGetPetEquipInfo, data: ByteArray): void {
			console.log("下发宠物装备信息");
			self.mydata = new game.modules.pet.models.PetEquipInfoVo()
			let size = data.readUint8();
			let bag: game.modules.bag.models.BagVo
			for (let num = 0; num < size; num++) {
				let petkey = data.readInt32();
				bag = new game.modules.bag.models.BagVo()
				bag.fromByteArray(data)
				self.mydata.petequipinfo.set(petkey, bag)
			}
		}
	}
	//9002 ljm

	//GM 检测的角色ID正确时，服务器回复 GM 角色ID检测的请求， 角色ID不正确，服务器只发送提示消息
	export class S2C_sgmcheck_roleid {
		public checkRoleId: any;	//String
		public static read(self: S2C_sgmcheck_roleid, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sCreatRole = Browser.window.SGMCheckRoleID.decode(data);
			self.checkRoleId = sCreatRole.checkRoleId;
			console.log("S2C_sgmcheck_roleid sCreatRole:", sCreatRole);
			console.log("S2C_sgmcheck_roleid sCreatRole.newRoleInfo", sCreatRole.checkRoleId);
		}
	}
	//GM帐号才回消息
	export class S2C_SCheck_GM {
		//public checkRoleId: any ;	//String
		public static read(self: S2C_SCheck_GM, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			// var sCreatRole = Browser.window.SGMCheckRoleID.decode(data);
			// self.checkRoleId = sCreatRole.newRoleInfo;
			// console.log("S2C_sgmcheck_roleid sCreatRole:",sCreatRole);
			// console.log("S2C_sgmcheck_roleid sCreatRole.newRoleInfo",sCreatRole.checkRoleId);
		}
	}
	//我的伙伴列表
	export class S2C_SHuoban_List {
		public huobans: Array<game.modules.huoban.models.HuoBanInfoVo> = [];	//String
		public static read(self: S2C_SHuoban_List, bytes: ByteArray): void {
			self.huobans = [];
			let huobansSize: number = bytes.readUint8();
			let huoBanInfo: game.modules.huoban.models.HuoBanInfoVo;
			for (var index = 0; index < huobansSize; index++) {
				huoBanInfo = new game.modules.huoban.models.HuoBanInfoVo();
				huoBanInfo.fromByteArray(bytes);
				self.huobans.push(huoBanInfo);
			}
		}
	}
	//我的一个伙伴信息
	export class S2C_SHuoban_Detail {
		public huoban: game.modules.huoban.models.HuoBanDetailVo;	//String
		public static read(self: S2C_SHuoban_Detail, bytes: ByteArray): void {
			let huoBandetail: game.modules.huoban.models.HuoBanDetailVo;
			huoBandetail = new game.modules.huoban.models.HuoBanDetailVo();
			huoBandetail.fromByteArray(bytes);
			self.huoban = huoBandetail;
		}
	}

	//
	export class S2C_SZhenrong_Info {
		public dangqianzhenrong: number;	//當前陣容
		public zhenrongxinxi: Array<game.modules.huoban.models.ZhenrongInfoVo>;
		public static read(self: S2C_SZhenrong_Info, bytes: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			self.dangqianzhenrong = bytes.readUint32();

			self.zhenrongxinxi = new Array<game.modules.huoban.models.ZhenrongInfoVo>();
			let zhenrongxinxiSize: number = bytes.readUint8();
			let zhenrongInfo: game.modules.huoban.models.ZhenrongInfoVo;
			for (var index = 0; index < zhenrongxinxiSize; index++) {
				zhenrongInfo = new game.modules.huoban.models.ZhenrongInfoVo();
				self.zhenrongxinxi[bytes.readUint32()] = zhenrongInfo;
				zhenrongInfo.fromByteArray(bytes);
			}
		}
	}


	//SChange_Zhenrong
	export class S2C_SChange_Zhenrong {
		public zhenrong: number;	//陣容編號
		public zhenfa: number;	//光環編號
		public huobanlist: Array<number>;	//参战伙伴
		public reason: number;	//更新原因 1-系统第一次自动更新 2-光环更新 3-参战伙伴更新 4-伙伴阵容切换

		public static read(self: S2C_SChange_Zhenrong, bytes: ByteArray): void {
			self.zhenrong = bytes.readUint32();
			self.zhenfa = bytes.readUint32();
			self.huobanlist = [];
			let huobanlistSize: number = bytes.readUint8();
			for (var index = 0; index < huobanlistSize; index++) {
				self.huobanlist.push(bytes.readUint32());
			}
			self.reason = bytes.readUint32();
		}
	}

	//解锁伙伴返回
	export class S2C_SActive_HuoBan {
		public huobanId: number;	//伙伴Id
		public state: number;	//0为未解锁; 1为永久使用; 2为本周免费; 大于10为有多少分钟的剩余时间,如 134 表示为免费134 - 10 = 124分钟

		public static read(self: S2C_SActive_HuoBan, bytes: ByteArray): void {
			self.huobanId = bytes.readUint32();
			self.state = bytes.readUint32();
		}
	}

	//<!-- 改变阵容的光环返回-->
	export class S2C_SSwitch_Zhenfa {
		public zhenrongid: number;	//
		public zhenfaid: number;	//

		public static read(self: S2C_SSwitch_Zhenfa, data: ByteArray): void {
			self.zhenrongid = data.readUint32();
			self.zhenfaid = data.readUint32();
		}
	}
	//SGongHuiFuBenLastTime
	export class S2C_SGongHuiFuBen_LastTime {
		public lasttime: number;	//公会副本剩余时间

		public static read(self: S2C_SGongHuiFuBen_LastTime, data: ByteArray): void {
			var lasttimes = Network._instance.protoTypePool.SGongHuiFuBenLastTime.decode(data);
			self.lasttime = lasttimes.lasttime;
			console.log("S2C_SChange_Zhenrong sCreatRole:", lasttimes);
			console.log("S2C_SChange_Zhenrong sCreatRole.newRoleInfo", lasttimes.lasttime);
		}
	}
	//每个冰封王座副本的信息,冰封王座的排行榜通过SRequestRankList发送给客户端,本人的排名也在SRequestRankList中
	export class S2C_SBingFeng_LandInfo {
		public ranktype: number;	//公会副本剩余时间
		public landId: number;	//公会副本剩余时间
		public lastrank: number;	//公会副本剩余时间
		public receiveaward: number;	//公会副本剩余时间
		public stage: number;	//公会副本剩余时间
		public yesterdaystage: number;	//公会副本剩余时间
		public entertimes: number;	//公会副本剩余时间
		public vip: number;	//公会副本剩余时间

		public static read(self: S2C_SBingFeng_LandInfo, data: ByteArray): void {
			var bingfenginfo = Network._instance.protoTypePool.SBingFengLandInfo.decode(data);
			self.ranktype = bingfenginfo.ranktype;//参加RankType
			self.landId = bingfenginfo.landId;//
			self.lastrank = bingfenginfo.lastrank;//上次的排名
			self.receiveaward = bingfenginfo.receiveaward;//如果已经领过奖励,为1，客户端应该把领取奖励灰掉
			self.stage = bingfenginfo.stage;//我的进度,根据landId和stage可以确定已经挑战过的npc
			self.yesterdaystage = bingfenginfo.yesterdaystage;//昨日进度
			self.entertimes = bingfenginfo.entertimes;//还能进入的次数
			self.vip = bingfenginfo.vip;//vip等级
			console.log("SBingFengLandInfo sCreatRole:", bingfenginfo);
			console.log("SBingFengLandInfo sCreatRole.newRoleInfo", bingfenginfo.ranktype);
		}
	}

	//玩家进入冰封王座地图的时候,会发这条消息,客户端根据这条协议可以决定显示哪些npc和挑战的关数
	export class S2C_SEnter_BingFengLand {
		public landId: number;	//
		public stage: number;	//
		public autogo: number;	//
		public finishstage: number;	//


		public static read(self: S2C_SEnter_BingFengLand, data: ByteArray): void {
			var bingfenginfo = Network._instance.protoTypePool.SEnterBingFengLand.decode(data);
			self.landId = bingfenginfo.landId;//
			self.stage = bingfenginfo.stage;//
			self.autogo = bingfenginfo.autogo;//
			self.finishstage = bingfenginfo.finishstage;//
			console.log("SEnterBingFengLand sCreatRole:", bingfenginfo);
			console.log("SEnterBingFengLand sCreatRole.newRoleInfo", bingfenginfo.landId);
		}
	}

	//玩家能够进入冰封王座
	export class S2C_SCanEnter_BingFeng {
		public finish: number;	//是否已经完成
		public static read(self: S2C_SCanEnter_BingFeng, data: ByteArray): void {
			self.finish = data.readUint32();
		}
	}
	//关卡最快通关信息
	export class S2C_SGetBingFeng_Detail {
		public rolename: string;	//
		public usetime: number;	//
		public stagestate: number;	//自己是否通关, 0 未通关, 1 已通关
		public myusetime: number;	//
		public static read(self: S2C_SGetBingFeng_Detail, data: ByteArray): void {
			var bingfenginfo = Network._instance.protoTypePool.SGetBingFengDetail.decode(data);
			self.rolename = bingfenginfo.rolename;//
			self.usetime = bingfenginfo.usetime;//
			self.stagestate = bingfenginfo.stagestate;//
			self.myusetime = bingfenginfo.myusetime;//
			console.log("SGetBingFengDetail sCreatRole:", bingfenginfo);
			console.log("SGetBingFengDetail sCreatRole.newRoleInfo", bingfenginfo.rolename);
		}
	}
	export class S2C_SItemNum_Change {
		public packid: number;
		public keyinpack: number;
		public curnum: number;
		public static read(self: S2C_SItemNum_Change, data: ByteArray): void {
			self.packid = data.readInt32();
			self.keyinpack = data.readInt32();
			self.curnum = data.readInt32();

		}
	}
	//
	export class S2C_SDel_Item {
		public packid: number;	//
		public itemKey: number;	//

		public static read(self: S2C_SDel_Item, data: ByteArray): void {
			// var delitem = Network._instance.protoTypePool.SDelItem.decode(data);
			// self.packid = delitem.packid;//
			// self.itemKey = delitem.itemKey;//
			self.packid = data.readInt32();
			self.itemKey = data.readInt32();
			// console.log("SDelItem sCreatRole:",delitem);
			console.log("SDelItem packid", self.packid);
			console.log("SDelItem itemkey", self.itemKey);
		}
	}
	//S2C_SAdd_Item
	export class S2C_SAdd_Item {
		public packid: number;	//
		public data: any;	//

		public static read(self: S2C_SAdd_Item, data: ByteArray): void {
			// var additem = Network._instance.protoTypePool.SAddItem.decode(data);
			// self.packid = additem.packid;//
			// self.data = additem.data;//
			self.packid = data.readInt32();

			self.data = [];
			let dataSize: number = data.readUint8();
			let item: game.modules.bag.models.ItemVo;
			for (var index = 0; index < dataSize; index++) {
				item = new game.modules.bag.models.ItemVo();
				item.fromByteArray(data);
				self.data.push(item);
			}//Item
			// console.log("SAddItem sCreatRole:",additem);
			console.log("SAddItem sCreatRole.newRoleInfo", self.packid);
			console.log("SAddItem sCreatRole.newRoleInfo", self.data);
		}
	}
	//服务器通知客户端刷新道具的flag
	export class S2C_SRefresh_ItemFlag {
		public itemkey: number;	//道具key
		public flag: number;	//道具flag
		public packid: number;	//pack的类型
		public static read(self: S2C_SRefresh_ItemFlag, data: ByteArray): void {
			self.itemkey = data.readInt32();
			self.flag = data.readInt32();
			self.packid = data.readInt32();
		}
	}
	//SRefreshItemTimeout
	export class S2C_SRefreshItem_Timeout {
		public itemkey: number;	//道具key
		public timeout: number;	//道具flag
		public packid: number;	//pack的类型
		public static read(self: S2C_SRefreshItem_Timeout, data: ByteArray): void {
			var refreshitem = Network._instance.protoTypePool.SRefreshItemTimeout.decode(data);
			self.packid = refreshitem.packid;//
			self.itemkey = refreshitem.itemkey;//
			self.timeout = refreshitem.timeout;//
			console.log("SRefreshItemTimeout sCreatRole:", refreshitem);
			console.log("SRefreshItemTimeout sCreatRole.newRoleInfo", refreshitem.itemkey);
		}
	}
	//SRefreshItemTimeout
	export class S2C_SItemPos_Change {
		public packid: number;	//道具key
		public keyinpack: number;	//道具flag
		public pos: number;	//pack的类型
		public static read(self: S2C_SItemPos_Change, data: ByteArray): void {
			var itempos = Network._instance.protoTypePool.SItemPosChange.decode(data);
			self.packid = itempos.packid;//
			self.keyinpack = itempos.keyinpack;//
			self.pos = itempos.pos;//
			console.log("SItemPosChange sCreatRole:", itempos);
			console.log("SItemPosChange sCreatRole.newRoleInfo", itempos.packid);
		}
	}
	//背包信息下发
	export class S2C_SGetPack_Info {
		public packid: number;	//
		public baginfo: game.modules.bag.models.BagVo;	//
		public static read(self: S2C_SGetPack_Info, data: ByteArray): void {
			// var packinfo = Network._instance.protoTypePool.SGetPackInfo.decode(data);
			// self.packid = packinfo.packid;//
			// self.baginfo = packinfo.baginfo;//
			// console.log("SGetPackInfo sCreatRole:",packinfo);
			// console.log("SGetPackInfo sCreatRole.newRoleInfo",packinfo.packid);
			self.packid = data.readInt32();
			self.baginfo = new game.modules.bag.models.BagVo();
			self.baginfo.fromByteArray(data);
		}
	}
	//SRefreshCurrency
	export class S2C_SRefresh_Currency {
		public packid: number;	//
		public currency: any;	//
		public static read(self: S2C_SRefresh_Currency, data: ByteArray): void {
			// var refreshcurr = Network._instance.protoTypePool.SRefreshCurrency.decode(data);
			// self.packid = refreshcurr.packid;//
			// self.currency = refreshcurr.currency;//
			// console.log("SRefreshCurrency sCreatRole:",refreshcurr);
			// console.log("SRefreshCurrency sCreatRole.newRoleInfo",refreshcurr.packid);
			self.packid = data.readInt32();
			let mapSize: number = data.readUint8();
			self.currency = new Laya.Dictionary();
			for (var index = 0; index < mapSize; index++) {
				self.currency.set(data.readByte(), data.readLong());
				console.log("S2C_SRefresh_Currency self:", self);
			}
			console.log("S2C_SRefresh_Currency+++++++++++", self.currency);
		}
	}
	//SGetItemTips
	export class S2C_SGetItem_Tips {
		public packid: number;	//
		public keyinpack: number;	//
		public tips: any = {};	//
		public tipsVo: game.modules.strengThening.models.TipsVo;
		public foodVo: game.modules.strengThening.models.FoodVo;
		public mapVo: game.modules.strengThening.models.ArchMapVo;
		public EnhancementVo: game.modules.strengThening.models.EnhancementVo;
		public static read(self: S2C_SGetItem_Tips, data: ByteArray): void {
			self.packid = data.readInt32();
			self.keyinpack = data.readInt32();
			self.tipsVo = new game.modules.strengThening.models.TipsVo();
			self.foodVo = new game.modules.strengThening.models.FoodVo();
			self.mapVo = new game.modules.strengThening.models.ArchMapVo();
			self.EnhancementVo = new game.modules.strengThening.models.EnhancementVo();

			var bag = BagModel.getInstance().getBagGameItemData(self.packid);
			if (!bag) return;
			var _items = bag.items;
			if (!_items) {
				if (self.packid == BagTypes.DEPOT) {
					let objkeys = Object.keys(bag);
					let tempitems = [];
					for (let depotid = 1; depotid < objkeys.length + 1; depotid++) {
						tempitems = tempitems.concat(bag[depotid].items);
					}
					_items = tempitems;
				}
				else {
					return;
				}
			}
			for (var i = 0; i < _items.length; i++) {
				var key = _items[i].key;
				if (key == self.keyinpack) {
					var id = _items[i].id;
					if (120000 <= id && id <= 126675 || 140000 <= id && id <= 140005 || 10000 <= id && id <= 10009 || id >= 130000 && id <= 130099) {   //装备
						self.tipsVo.fromByteArray(data);
						self.tips = self.tipsVo;
					} else if (111000 <= id && id <= 111053) {
						self.foodVo.fromByteArray(data);
						self.tips = self.foodVo;
					} else if (100000 <= id && id <= 107044 || 330100 <= id && id <= 340074) {
						if (101100 <= id && id <= 101108) {
							self.EnhancementVo.fromByteArray(data);
							self.tips = self.EnhancementVo;
						} else {
							self.mapVo.fromByteArray(data);
							self.tips = self.mapVo;
						}
					}
				}
			}
		}
	}
	//SGetPetEquipTips
	export class S2C_SGetPetEquip_Tips {
		public petkey: number;	//
		public keyinpack: number;	//
		public tips: any;	//
		public tipsVo: game.modules.strengThening.models.TipsVo
		public static read(self: S2C_SGetPetEquip_Tips, data: ByteArray): void {
			self.petkey = data.readInt32();
			self.keyinpack = data.readInt32();
			self.tipsVo = new game.modules.strengThening.models.TipsVo();
			self.tipsVo.fromByteArray(data)
			self.tips = self.tipsVo
		}
	}
	//SRefreshPackSize
	export class S2C_SRefreshPack_Size {
		public packid: number;	//
		public cap: number;	//
		public static read(self: S2C_SRefreshPack_Size, data: ByteArray): void {
			// var refreshpacksize = Network._instance.protoTypePool.SRefreshPackSize.decode(data);
			// self.packid = refreshpacksize.packid;//
			// self.cap = refreshpacksize.cap;//
			// console.log("SRefreshPackSize sCreatRole:",refreshpacksize);
			// console.log("SRefreshPackSize sCreatRole.newRoleInfo",refreshpacksize.packid);
			console.log('刷新背包格子..........');
			self.packid = data.readInt32();
			self.cap = data.readInt32();
		}
	}
	//SCleanTempPack
	export class S2C_SCleanTemp_Pack {

		public static read(self: S2C_SCleanTemp_Pack, data: ByteArray): void {
			var refreshpacksize = Network._instance.protoTypePool.SCleanTempPack.decode(data);
			console.log("SCleanTempPack sCreatRole:", refreshpacksize);

		}
	}
	//SRefreshNaiJiu
	export class S2C_SRefresh_NaiJiu {
		public packid: number;	//
		public data: any;	//
		public static read(self: S2C_SRefresh_NaiJiu, data: ByteArray): void {
			// var refreshpacksize = Network._instance.protoTypePool.SRefreshNaiJiu.decode(data);
			// self.packid = refreshpacksize.packid;//
			// self.data = refreshpacksize.data;//

			self.packid = data.readInt32();
			self.data = [];
			let dataSize: number = data.readUint8();
			let equipNaiJiu: game.modules.strengThening.models.EquipNaiJiuVo;
			for (var index = 0; index < dataSize; index++) {
				equipNaiJiu = new game.modules.strengThening.models.EquipNaiJiuVo();
				equipNaiJiu.fromByteArray(data);
				self.data.push(equipNaiJiu);
			}
			console.log("SRefreshNaiJiu self", self);
		}
	}
	//SRefreshMaxNaiJiu
	export class S2C_SRefresh_MaxNaiJiu {
		public packid: number;	//
		public keyinpack: number;	//
		public maxendure: number;	//
		public static read(self: S2C_SRefresh_MaxNaiJiu, data: ByteArray): void {
			// var refreshpacksize = Network._instance.protoTypePool.SRefreshMaxNaiJiu.decode(data);
			// self.packid = refreshpacksize.packid;//
			// self.keyinpack = refreshpacksize.keyinpack;//
			// self.maxendure = refreshpacksize.maxendure;//
			self.packid = data.readInt32();
			self.keyinpack = data.readInt32();
			self.maxendure = data.readInt32();
			// console.log("SRefreshMaxNaiJiu sCreatRole:",refreshpacksize);
			console.log("SRefreshMaxNaiJiu sCreatRole.newRoleInfo", self.packid);
		}
	}
	//SXiuLiFailTimes
	export class S2C_SXiuLiFail_Times {
		public packid: number;	//
		public keyinpack: number;	//
		public failtimes: number;	//
		public static read(self: S2C_SXiuLiFail_Times, data: ByteArray): void {
			// var xiulifailtimes = Network._instance.protoTypePool.SXiuLiFailTimes.decode(data);
			// self.packid = xiulifailtimes.packid;//
			// self.keyinpack = xiulifailtimes.keyinpack;//
			// self.failtimes = xiulifailtimes.failtimes;//
			self.packid = data.readInt32();
			self.keyinpack = data.readInt32();
			self.failtimes = data.readInt32();
			// console.log("SXiuLiFailTimes sCreatRole:",xiulifailtimes);
			console.log("SXiuLiFailTimes sCreatRole.newRoleInfo", self.packid);
		}
	}
	//SGetRoleEquip
	export class S2C_SGetRole_Equip {
		// public rolename: string;	//
		// public totalscore: number;	//
		// public equipinfo: any;	//
		// public tips: any;	//
		// public components: any;	//
		// public profession: number;	//
		// public rolelevel: number;	//
		// public roleid: number;	//
		// public shape: number;	//
		public SGetRoleEquip: game.modules.team.models.SGetRoleEquipVo;
		public static read(self: S2C_SGetRole_Equip, data: ByteArray): void {
			console.log('来过............................................................');
			self.SGetRoleEquip = new game.modules.team.models.SGetRoleEquipVo();
			self.SGetRoleEquip.fromByteArray(data);
		}
	}

	//SPetEquipAddItem
	export class S2C_SPetEquip_AddItem {
		public packid: number;	//
		public petkey: number;	//
		public data: Array<game.modules.bag.models.ItemVo>;	//
		public static read(self: S2C_SPetEquip_AddItem, data: ByteArray): void {
			self.packid = data.readInt32();
			self.petkey = data.readInt32();

			self.data = []
			let dataSize: number = data.readUint8();
			let item: game.modules.bag.models.ItemVo;
			for (var index = 0; index < dataSize; index++) {
				item = new game.modules.bag.models.ItemVo();
				item.fromByteArray(data);
				self.data.push(item);
			}
		}
	}
	//SPetEquipDelItem
	export class S2C_SPetEquip_DelItem {
		public packid: number;	//
		public petkey: number;	//
		public itemKey: number;	//
		public static read(self: S2C_SPetEquip_DelItem, data: ByteArray): void {
			self.packid = data.readInt32();
			self.petkey = data.readInt32();
			self.itemKey = data.readInt32();
		}
	}
	//SItemSign
	export class S2C_SItem_Sign {
		public keyinpack: number;	//
		public sign: number;	//
		public packid: number;	//
		public static read(self: S2C_SItem_Sign, data: ByteArray): void {
			var itemsign = Network._instance.protoTypePool.SItemSign.decode(data);
			self.keyinpack = itemsign.keyinpack;//
			self.sign = itemsign.sign;//
			self.packid = itemsign.packid;//
			console.log("SItemSign sCreatRole:", itemsign);
			console.log("SItemSign sCreatRole.newRoleInfo", itemsign.keyinpack);
		}
	}
	//SHeChengRet
	export class S2C_SHeCheng_Ret {
		public ret: number;	//

		public static read(self: S2C_SHeCheng_Ret, data: ByteArray): void {
			var hechengret = Network._instance.protoTypePool.SHeChengRet.decode(data);
			self.ret = hechengret.ret;//

			console.log("SHeChengRet sCreatRole:", hechengret);
			console.log("SHeChengRet sCreatRole.newRoleInfo", hechengret.ret);
		}
	}
	//SAllEquipScore
	export class S2C_SAllEquip_Score {
		public score: number;	//

		public static read(self: S2C_SAllEquip_Score, data: ByteArray): void {
			var equpscore = Network._instance.protoTypePool.SAllEquipScore.decode(data);
			self.score = equpscore.score;//

			console.log("SAllEquipScore sCreatRole:", equpscore);
			console.log("SAllEquipScore sCreatRole.newRoleInfo", equpscore.score);
		}
	}
	//SGetTimeAward
	export class S2C_SGetTime_Award {
		public awardid: number;
		public waittime: number;

		public static read(self: S2C_SGetTime_Award, data: ByteArray): void {
			self.awardid = data.readInt32();
			self.waittime = data.readLong();
		}
	}
	//SGetEquipTips
	export class S2C_SGetEquip_Tips {
		public packid: number;	//
		public keyinpack: number;	//
		public key2inpack: number;	//
		public tips: any;	//	
		public static read(self: S2C_SGetEquip_Tips, data: ByteArray): void {
			var equtips = Network._instance.protoTypePool.SGetEquipTips.decode(data);
			self.packid = equtips.packid;//
			self.keyinpack = equtips.keyinpack;//
			self.key2inpack = equtips.key2inpack;//
			self.tips = equtips.tips;//
			console.log("SGetEquipTips sCreatRole:", equtips);
			console.log("SGetEquipTips sCreatRole.newRoleInfo", equtips.packid);
		}
	}
	//SItemAdded
	export class S2C_SItem_Added {
		public items: Array<any> = [];	//
		public static read(self: S2C_SItem_Added, data: ByteArray): void {
			let itemaddVo: game.modules.bag.models.ItemAddVo;
			let dataSize: number = data.readUint8();
			for (var itemIndex = 0; itemIndex < dataSize; itemIndex++) {
				itemaddVo = new game.modules.bag.models.ItemAddVo();
				itemaddVo.fromByteArray(data);
				self.items.push(itemaddVo);
			}
		}
	}
	//SHeChengItem
	export class S2C_SHeCheng_Item {
		public itemnum: number;	//
		public getitemid: number;	//
		public static read(self: S2C_SHeCheng_Item, data: ByteArray): void {
			self.itemnum = data.readInt32();
			self.getitemid = data.readInt32();
		}
	}
	//SHeChengPetEquip
	export class S2C_SHeChengPet_Equip {
		public itemnum: number;	//
		public getitemid: number;	//
		public static read(self: S2C_SHeChengPet_Equip, data: ByteArray): void {
			self.itemnum = data.readInt32();
			self.getitemid = data.readInt32();
		}
	}
	//通知客户端邮件列表
	export class S2C_SMail_List {
		public mailList: Array<any>;	//邮件列表
		public static read(self: S2C_SMail_List, data: ByteArray): void {
			self.mailList = new Array<any>();
			let mailListSize: number = data.readUint8();
			let mailInfo: game.modules.friend.models.MailInfoVo;
			for (var index = 0; index < mailListSize; index++) {
				mailInfo = new game.modules.friend.models.MailInfoVo();
				mailInfo.fromByteArray(data);
				self.mailList.push(mailInfo);
			}//MailInfo
			console.log("S2C_SMail_List++++++++++++++++++++++", self.mailList);
		}
	}
	//通知客户端刷新邮件
	export class S2C_SMail_Info {
		public mail: game.modules.friend.models.MailInfoVo;	//邮件列表
		public static read(self: S2C_SMail_Info, data: ByteArray): void {
			self.mail = new game.modules.friend.models.MailInfoVo();
			self.mail.fromByteArray(data);
			console.log("S2C_SMail_Info++++++++++++++++++", self.mail);
		}
	}
	//通知客户端刷新邮件状态
	export class S2C_SMail_State {
		public kind: number;	//类型 0=定时邮件 1=GM邮件
		public id: number;	//id
		public statetype: number;	//状态类型 0=读取状态 1=领取状态
		public statevalue: number;	//	状态值 0=否 1=是
		public static read(self: S2C_SMail_State, data: ByteArray): void {
			self.kind = data.readByte();
			self.id = data.readLong();
			self.statetype = data.readByte();
			self.statevalue = data.readByte();
			console.log("S2C_SMail_State++++++++++++++++++++", self.statetype);
		}
	}
	//SGetRoleInfo
	export class S2C_SGetRole_Info {
		public roleid: number;	//
		public rolename: string;	//
		public shape: number;	//
		public school: number;	//	
		public level: number;	//
		public equipscore: number;	//
		public packinfo: any;	//
		public tips: any;	//	
		public static read(self: S2C_SGetRole_Info, data: ByteArray): void {
			var roleinfo = Network._instance.protoTypePool.SGetRoleInfo.decode(data);
			self.roleid = roleinfo.roleid;//
			self.rolename = roleinfo.rolename;//
			self.shape = roleinfo.shape;//
			self.school = roleinfo.school;//
			self.level = roleinfo.level;//
			self.equipscore = roleinfo.equipscore;//
			self.packinfo = roleinfo.packinfo;//
			self.tips = roleinfo.tips;//
			console.log("SGetRoleInfo sCreatRole:", roleinfo);
			console.log("SGetRoleInfo sCreatRole.newRoleInfo", roleinfo.roleid);
		}
	}

	//SNoticeRoleGetInfo
	export class S2C_SNoticeRole_GetInfo {
		public roleid: number;	//
		public rolename: string;	//
		public static read(self: S2C_SNoticeRole_GetInfo, data: ByteArray): void {
			var roleinfo = Network._instance.protoTypePool.SNoticeRoleGetInfo.decode(data);
			self.roleid = roleinfo.roleid;//
			self.rolename = roleinfo.rolename;//
			console.log("SNoticeRoleGetInfo sCreatRole:", roleinfo);
			console.log("SNoticeRoleGetInfo sCreatRole.newRoleInfo", roleinfo.roleid);
		}
	}
	//SMulDayLogin
	export class S2C_SMulDayLogin {
		public logindays: number;	//累计登录天数
		public rewardmap: Laya.Dictionary;	//七日登录礼包奖励数据(1.key-奖励配置ID 2.val-领取时间(0-未领取))
		public static read(self: S2C_SMulDayLogin, data: ByteArray): void {
			self.logindays = data.readInt32();
			let mapSize: number = data.readUint8();
			self.rewardmap = new Laya.Dictionary();
			for (var index = 0; index < mapSize; index++) {
				self.rewardmap.set(data.readUint32(), data.readLong());
			}
		}
	}


	//SOpenPack
	export class S2C_SOpen_Pack {

		public static read(self: S2C_SOpen_Pack, data: ByteArray): void {
			var daylogin = Network._instance.protoTypePool.SOpenPack.decode(data);
			console.log("SOpenPack sCreatRole:", daylogin);
			console.log("SOpenPack sCreatRole.newRoleInfo", daylogin);
		}
	}
	//SBuyPackMoney
	export class S2C_SBuyPack_Money {
		public money: number;	//

		public static read(self: S2C_SBuyPack_Money, data: ByteArray): void {
			var packmoney = Network._instance.protoTypePool.SBuyPackMoney.decode(data);
			self.money = packmoney.money;//
			console.log("SBuyPackMoney sCreatRole:", packmoney);
			console.log("SBuyPackMoney sCreatRole.newRoleInfo", packmoney.money);
		}
	}

	//刷新修理物品界面数据
	export class S2C_SFreshRepair_Data {

		public static read(self: S2C_SFreshRepair_Data, data: ByteArray): void {
			var packmoney = Network._instance.protoTypePool.SFreshRepairData.decode(data);
			console.log("SFreshRepairData sCreatRole:", packmoney);
			console.log("SFreshRepairData sCreatRole.newRoleInfo", packmoney);
		}
	}

	//SRepairResult
	export class S2C_SRepair_Result {
		public ret: number;	//0为失败，1为成功

		public static read(self: S2C_SRepair_Result, data: ByteArray): void {
			// var repairresult = Network._instance.protoTypePool.SRepairResult.decode(data);
			// self.ret = repairresult.ret;//
			self.ret = data.readInt32();
			// console.log("SRepairResult sCreatRole:",repairresult);
			console.log("SRepairResult sCreatRole.newRoleInfo", self.ret);
		}
	}

	//SUseEnhancementItem
	export class S2C_SUseEnhancement_Item {
		public equippos: number;	//装备的位置

		public static read(self: S2C_SUseEnhancement_Item, data: ByteArray): void {
			self.equippos = data.readInt32();
		}
	}

	//宝石替换
	export class S2C_SReplace_Gem {
		public srckey: number;	//在背包栏里源装备的key
		public deskey: number;  //在装备栏里目标装备的key
		public static read(self: S2C_SReplace_Gem, data: ByteArray): void {
			var repgem = Network._instance.protoTypePool.SReplaceGem.decode(data);
			self.srckey = repgem.srckey;//
			self.deskey = repgem.deskey;//
			console.log("SReplaceGem sCreatRole:", repgem);
			console.log("SReplaceGem sCreatRole.newRoleInfo", repgem.srckey);
		}
	}
	//摆摊物品Tip返回SOtherItemTips
	export class S2C_SOther_ItemTips {
		public roleid: number;	//y
		public packid: number;  //
		public keyinpack: number;	//
		public tips: any = {};  //

		public tipsVo: game.modules.strengThening.models.TipsVo;
		public foodVo: game.modules.strengThening.models.FoodVo;
		public mapVo: game.modules.strengThening.models.ArchMapVo;
		public EnhancementVo: game.modules.strengThening.models.EnhancementVo;
		public static read(self: S2C_SOther_ItemTips, data: ByteArray): void {

			self.roleid = data.readLong();
			self.packid = data.readInt32();
			self.keyinpack = data.readInt32();
			self.tipsVo = new game.modules.strengThening.models.TipsVo();
			self.foodVo = new game.modules.strengThening.models.FoodVo();
			self.mapVo = new game.modules.strengThening.models.ArchMapVo();
			self.EnhancementVo = new game.modules.strengThening.models.EnhancementVo();

			if (self.packid == BagTypes.MARKET) {
				var id = SaleModel._instance.itemId;
				if (120000 <= id && id <= 126675 || 140000 <= id && id <= 140005 || 10000 <= id && id <= 10009) {   //装备
					self.tipsVo.fromByteArray(data);
					self.tips = self.tipsVo;
				} else if (111000 <= id && id <= 111053) {
					self.foodVo.fromByteArray(data);
					self.tips = self.foodVo;
				} else if (100000 <= id && id <= 107044 || 330100 <= id && id <= 340074) {
					if (101100 <= id && id <= 101108) {
						self.EnhancementVo.fromByteArray(data);
						self.tips = self.EnhancementVo;
					} else {
						self.mapVo.fromByteArray(data);
						self.tips = self.mapVo;
					}
				}
			}
		}
	}
	//SGetDepotInfo
	export class S2C_SGetDepot_Info {
		public pageid: number;	//从1开始
		public baginfo: game.modules.bag.models.BagVo;  //
		public static read(self: S2C_SGetDepot_Info, data: ByteArray): void {
			// var depotinfo = Network._instance.protoTypePool.SGetDepotInfo.decode(data);
			// self.pageid = depotinfo.pageid;//
			// self.baginfo = depotinfo.baginfo;//
			// console.log("SGetDepotInfo sCreatRole:",depotinfo);
			// console.log("SGetDepotInfo sCreatRole.newRoleInfo",depotinfo.pageid);
			self.pageid = data.readInt32();
			self.baginfo = new game.modules.bag.models.BagVo();
			self.baginfo.fromByteArray(data);
		}
	}

	// 修改仓库名称返回 SModifyDepotName
	export class S2C_SModify_DepotName {
		public errcode: number;	//从1开始
		public depotIndex: number;  //
		public depotName: string;  //
		public static read(self: S2C_SModify_DepotName, data: ByteArray): void {
			// var moddepotname = Network._instance.protoTypePool.SModifyDepotName.decode(data);
			// self.errcode = moddepotname.errcode;//
			// self.depotIndex = moddepotname.depotIndex;//
			// self.depotName = moddepotname.depotName;//
			// console.log("SModifyDepotName sCreatRole:",moddepotname);
			// console.log("SModifyDepotName sCreatRole.newRoleInfo",moddepotname.depotName);

			self.errcode = data.readInt32();
			self.depotIndex = data.readInt32();
			self.depotName = ByteArrayUtils.readUtf16String(data);
		}
	}
	//  SRideUpdate
	export class S2C_SRide_Update {
		public itemkey: number;	//包里道具key by changhao
		public itemid: number;  //道具id by changhao
		public rideid: number;  //坐骑id by changhao
		public static read(self: S2C_SRide_Update, data: ByteArray): void {
			// var ride = Network._instance.protoTypePool.SRideUpdate.decode(data);
			// self.itemkey = ride.itemkey;//
			// self.itemid = ride.itemid;//
			// self.rideid = ride.rideid;//
			self.itemkey = data.readInt32();
			self.itemid = data.readInt32();
			self.rideid = data.readInt32();
			console.log("SRideUpdate sCreatRole.newRoleInfo", self.itemkey);
		}
	}
	//  服务器返回道具找回列表
	export class S2C_SItemRecover_List {
		/** 道具列表 */
		public items: Array<any>;
		public static read(self: S2C_SItemRecover_List, data: ByteArray): void {
			self.items = [];
			let listSize: number = ByteArrayUtils.uncompact_uint32(data);
			if (listSize == 0) {
				self.items = [];
			}
			else {
				for (let i = 0; i < listSize; i++) {
					let _ItemRecoverInfoVo = new game.modules.bag.models.ItemRecoverInfoVo();
					_ItemRecoverInfoVo.fromByteArray(data);
					self.items.push(_ItemRecoverInfoVo);
				}
			}
		}
	}
	//  服务器返回道具找回结果
	export class S2C_SItem_Recover {
		public itemId: number;	//道具id
		public uniqId: number;	//唯一id
		public static read(self: S2C_SItem_Recover, data: ByteArray): void {
			self.itemId = data.readInt32();
			self.uniqId = data.readLong();
		}
	}
	//  服务器返回一个找回道具的信息
	export class S2C_SRecoverItem_Info {
		public uniqId: number;	//
		public tips: any;	//
		public static read(self: S2C_SRecoverItem_Info, data: ByteArray): void {
			self.uniqId = data.readLong();
			let recoverItems = game.modules.bag.models.BagModel.getInstance().itemRecoverInfoData;
			for (let i = 0; i < recoverItems.length; i++) {
				let _uniqId = recoverItems[i].uniqId;
				if (_uniqId == self.uniqId) {
					let itemtotaltype = game.modules.bag.models.BagModel.getInstance().getItemTotalType(recoverItems[i].itemId);
					switch (itemtotaltype) {
						case ItemTotalType.PetItem:
							break;
						case ItemTotalType.GroceriesItem:
							break;
						case ItemTotalType.EquipItem:
							let equipItem_tips = new game.modules.strengThening.models.TipsVo();
							equipItem_tips.fromByteArray(data);
							self.tips = equipItem_tips;
							break;
					}
					break;
				}
			}
			if (!self.tips) {
				self.tips = null;
			}
		}
	}
	//  SRefineEquipBase
	export class S2C_SRefineEquip_Base {
		public freshtype: number;	//刷新类型 0 预览, 1 保存
		public packid: number;	//背包id
		public keyinpack: number;	//key
		public attr: Dictionary;	//预览属性
		public static read(self: S2C_SRefineEquip_Base, data: ByteArray): void {
			var bytes = data;
			self.freshtype = bytes.readInt32();
			self.packid = bytes.readInt32();
			self.keyinpack = bytes.readInt32();

			let mapSize: number = bytes.readUint8();
			self.attr = new Laya.Dictionary();
			for (var index = 0; index < mapSize; index++) {
				self.attr.set(bytes.readUint32(), bytes.readUint32());
			}


		}
		// 	var equipbase = Network._instance.protoTypePool.SRefineEquipBase.decode(data);
		// 	self.freshtype = equipbase.freshtype;//
		// 	self.packid = equipbase.packid;//
		// 	self.keyinpack = equipbase.keyinpack;//
		// 	self.attr = equipbase.attr;//
		// 	console.log("SRefineEquipBase sCreatRole:", equipbase);
		// 	console.log("SRefineEquipBase sCreatRole.newRoleInfo", equipbase.freshtype);
		// }


	}
	//  SRefineEquipResult
	export class S2C_SRefineEquip_Result {
		public packid: number;	//背包id
		public keyinpack: number;	//key
		public result: number;	//0,失败; 1,成功
		public refinetype: number;	//类型 0,基础属性; 1,技能; 2,全部
		public static read(self: S2C_SRefineEquip_Result, data: ByteArray): void {
			self.packid = data.readInt32();
			self.keyinpack = data.readInt32();
			self.result = data.readInt32();
			self.refinetype = data.readInt32();
		}
	}
	// 洗所有属性 SExpFactorEffect
	export class S2C_SExpFactor_Effect {
		public itemId: number;	//道具ID
		public factor: number;	//倍率
		public endTime: number;	//倍率
		public static read(self: S2C_SExpFactor_Effect, data: ByteArray): void {
			var equipeff = Network._instance.protoTypePool.SExpFactorEffect.decode(data);
			self.itemId = equipeff.itemId;//
			self.factor = equipeff.factor;//
			self.endTime = equipeff.endTime;//
			console.log("SExpFactorEffect sCreatRole:", equipeff);
			console.log("SExpFactorEffect sCreatRole.newRoleInfo", equipeff.itemId);
		}
	}


	// 服务器返回角色安全锁信息 SLockInfo
	export class S2C_SLock_Info {
		public status: number;	//安全锁状态0未设置安全锁1未解锁2已解锁
		public static read(self: S2C_SLock_Info, data: ByteArray): void {
			var lockino = Network._instance.protoTypePool.SLockInfo.decode(data);
			self.status = lockino.status;//
			console.log("SLockInfo sCreatRole:", lockino);
			console.log("SLockInfo sCreatRole.newRoleInfo", lockino.status);
		}
	}
	// 服务器通知客户端需要解锁 SNeedUnlock
	export class S2C_SNeedUn_lock {
		public static read(self: S2C_SNeedUn_lock, data: ByteArray): void {
			var lockino = Network._instance.protoTypePool.SNeedUnlock.decode(data);
			console.log("SNeedUnlock sCreatRole:", lockino);
			console.log("SNeedUnlock sCreatRole.newRoleInfo", lockino);
		}
	}
	// 服务器通知客户端设置安全锁成功 SAddLockSuc
	export class S2C_SAddLock_Suc {
		public static read(self: S2C_SAddLock_Suc, data: ByteArray): void {
			var lockino = Network._instance.protoTypePool.SAddLockSuc.decode(data);
			console.log("SAddLockSuc sCreatRole:", lockino);
			console.log("SAddLockSuc sCreatRole.newRoleInfo", lockino);
		}
	}
	// 服务器通知客户端解锁成功 SUnlockSuc
	export class S2C_SUnlock_Suc {
		public static read(self: S2C_SUnlock_Suc, data: ByteArray): void {
			var lockino = Network._instance.protoTypePool.SUnlockSuc.decode(data);
			console.log("SUnlockSuc sCreatRole:", lockino);
			console.log("SUnlockSuc sCreatRole.newRoleInfo", lockino);
		}
	}
	// 服务器通知客户端取消安全锁成功 SCancelLockSuc
	export class S2C_SCancelLock_Suc {
		public static read(self: S2C_SCancelLock_Suc, data: ByteArray): void {
			var lockino = Network._instance.protoTypePool.SCancelLockSuc.decode(data);
			console.log("SCancelLockSuc sCreatRole:", lockino);
			console.log("SCancelLockSuc sCreatRole.newRoleInfo", lockino);
		}
	}
	// 服务器通知客户端申请强行解锁成功 SForceUnlockSuc
	export class S2C_SForceUnlock_Suc {
		public static read(self: S2C_SForceUnlock_Suc, data: ByteArray): void {
			var lockino = Network._instance.protoTypePool.SForceUnlockSuc.decode(data);
			console.log("SForceUnlockSuc sCreatRole:", lockino);
			console.log("SForceUnlockSuc sCreatRole.newRoleInfo", lockino);
		}
	}


	// 服务器通知客户端修改密码成功 SChangePasswordSuc
	export class S2C_SChangePassword_Suc {
		public static read(self: S2C_SChangePassword_Suc, data: ByteArray): void {
			var lockino = Network._instance.protoTypePool.SChangePasswordSuc.decode(data);
			console.log("SChangePasswordSuc sCreatRole:", lockino);
			console.log("SChangePasswordSuc sCreatRole.newRoleInfo", lockino);
		}
	}


	// 服务器返回更新的角色安全锁信息 SUpdateLockInfo
	export class S2C_SUpdateLock_Info {
		public status: number;	//安全锁状态0未设置安全锁1未解锁2已解锁
		public static read(self: S2C_SUpdateLock_Info, data: ByteArray): void {
			var lockino = Network._instance.protoTypePool.SUpdateLockInfo.decode(data);
			self.status = lockino.status;
			console.log("SUpdateLockInfo sCreatRole:", lockino);
			console.log("SUpdateLockInfo sCreatRole.newRoleInfo", lockino.status);
		}
	}
	//  SRegMaster
	export class S2C_SReg_Master {
		public result: number;	//安全锁状态0未设置安全锁1未解锁2已解锁
		public static read(self: S2C_SReg_Master, data: ByteArray): void {
			var regmaster = Network._instance.protoTypePool.SRegMaster.decode(data);
			self.result = regmaster.result;
			console.log("SRegMaster sCreatRole:", regmaster);
			console.log("SRegMaster sCreatRole.newRoleInfo", regmaster.result);
		}
	}
	//  SReadyRegMaster
	export class S2C_SReadyReg_Master {
		public masters: any;	//
		public static read(self: S2C_SReadyReg_Master, data: ByteArray): void {
			var regmaster = Network._instance.protoTypePool.SReadyRegMaster.decode(data);
			self.masters = regmaster.masters;
			console.log("SReadyRegMaster sCreatRole:", regmaster);
			console.log("SReadyRegMaster sCreatRole.newRoleInfo", regmaster.masters);
		}
	}
	//  SSearchMaster
	export class S2C_SSearch_Master {
		public pageid: number;	//页数
		public totalpage: number;	//总页数
		public masters: any;	//师傅
		public static read(self: S2C_SSearch_Master, data: ByteArray): void {
			var searchmaster = Network._instance.protoTypePool.SSearchMaster.decode(data);
			self.pageid = searchmaster.pageid;
			self.totalpage = searchmaster.totalpage;
			self.masters = searchmaster.masters;
			console.log("SSearchMaster sCreatRole:", searchmaster);
			console.log("SSearchMaster sCreatRole.newRoleInfo", searchmaster.pageid);
		}
	}
	// 是否接受徒弟的确认框 SRequestAsApprentice
	export class S2C_SRequestAs_Apprentice {
		public prenticeid: number;	//徒弟id
		public prenticename: string;	//徒弟名称
		public school: any;	//职业
		public level: number;	//等级
		public requestword: string;	//留言
		public static read(self: S2C_SRequestAs_Apprentice, data: ByteArray): void {
			var searchmaster = Network._instance.protoTypePool.SRequestAsApprentice.decode(data);
			self.prenticeid = searchmaster.prenticeid;
			self.prenticename = searchmaster.prenticename;
			self.school = searchmaster.school;
			self.level = searchmaster.level;
			self.requestword = searchmaster.requestword;
			console.log("SRequestAsApprentice sCreatRole:", searchmaster);
			console.log("SRequestAsApprentice sCreatRole.newRoleInfo", searchmaster.prenticeid);
		}
	}

	//  SRequestPrenticeSuccess
	export class S2C_SRequestPrentice_Success {
		public masterid: number;	//师傅的id
		public mastername: string;	//师父名称
		public bInitiative: number;	//是否是主动请求当徒弟，1为主动请求，0为师父申请收徒，之所以区分，是因为提示信息不一样
		public static read(self: S2C_SRequestPrentice_Success, data: ByteArray): void {
			var searchmaster = Network._instance.protoTypePool.SRequestPrenticeSuccess.decode(data);
			self.masterid = searchmaster.masterid;
			self.mastername = searchmaster.mastername;
			self.bInitiative = searchmaster.bInitiative;
			console.log("SRequestPrenticeSuccess sCreatRole:", searchmaster);
			console.log("SRequestPrenticeSuccess sCreatRole.newRoleInfo", searchmaster.masterid);
		}
	}

	//  SCanAcceptPrentice
	export class S2C_SCanAccept_Prentice {
		public static read(self: S2C_SCanAccept_Prentice, data: ByteArray): void {
			var searchmaster = Network._instance.protoTypePool.SCanAcceptPrentice.decode(data);
			console.log("SCanAcceptPrentice sCreatRole:", searchmaster);
			console.log("SCanAcceptPrentice sCreatRole.newRoleInfo", searchmaster);
		}
	}

	//  寻找徒弟  SSearchPrentice
	export class S2C_SSearch_Prentice {
		public pageid: number;	//页数
		public totalpage: number;	//总页数
		public prentice: any;	//徒弟
		public static read(self: S2C_SSearch_Prentice, data: ByteArray): void {
			var searchmaster = Network._instance.protoTypePool.SSearchPrentice.decode(data);
			self.pageid = searchmaster.pageid;
			self.totalpage = searchmaster.totalpage;
			self.prentice = searchmaster.prentice;
			console.log("SSearchPrentice sCreatRole:", searchmaster);
			console.log("SSearchPrentice sCreatRole.newRoleInfo", searchmaster.pageid);
		}
	}
	//  寻找徒弟  SMasterPrenticeData
	export class S2C_SMasterPrentice_Data {
		public members: any;	//
		public static read(self: S2C_SMasterPrentice_Data, data: ByteArray): void {
			var searchmaster = Network._instance.protoTypePool.SMasterPrenticeData.decode(data);
			self.members = searchmaster.members;
			console.log("SMasterPrenticeData sCreatRole:", searchmaster);
			console.log("SMasterPrenticeData sCreatRole.newRoleInfo", searchmaster.members);
		}
	}

	/**
		* 返回公会级别信息变化
		*/
	export class S2C_SClanLevelup {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public change: Dictionary = new Dictionary();	//String
		public costmax: Dictionary = new Dictionary();	//String
		public money: number;	//String

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SClanLevelup, data: ByteArray): void {
			let Size = data.readInt8();
			for (var i = 0; i < Size; i++) {
				self.change.set(data.readInt32(), data.readInt32());
			}
			let costmaxSize = data.readInt8();
			for (var i = 0; i < costmaxSize; i++) {
				self.costmax.set(data.readInt32(), data.readInt32());
			}
			self.money = data.readInt32();

		}
	}
	/**
	 * 领取分红
	 */
	export class S2C_SGrabBonus {

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SGrabBonus, data: ByteArray): void {
		}
	}

	/**
	 * 查询分红结果
	 */
	export class S2C_SBonusQuery {
		public bonus: number;	//返回最新分红

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SBonusQuery, data: ByteArray): void {
			self.bonus = data.readInt32();
		}
	}

	/**
	 * 服务器返回接受申请人员
	 */
	export class S2C_SAcceptApply {
		public memberinfo: Array<any> = [];	//

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SAcceptApply, data: ByteArray): void {
			let ClanMemberVo: game.modules.family.models.ClanMemberVo;
			ClanMemberVo = new game.modules.family.models.ClanMemberVo();
			ClanMemberVo.fromByteArray(data);
			self.memberinfo.push(ClanMemberVo);
		}
	}

	/**
	 * 服务端返回公会宗旨
	 */
	export class S2C_SClanAim {
		public clanid: number;	//公会id
		public clanaim: string;	//公会宗旨
		public oldclanname: string;	//公会曾用名

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SClanAim, data: ByteArray): void {
			self.clanid = data.readLong();
			self.clanaim = ByteArrayUtils.readUtf16String(data);
			self.oldclanname = ByteArrayUtils.readUtf16String(data);

		}
	}

	/**
	 * 服务端返回公会名字
	 */
	export class S2C_SChangeClanName {
		public newname: string;	//公会名字

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SChangeClanName, data: ByteArray): void {
			self.newname = ByteArrayUtils.readUtf16String(data);
		}
	}

	/**
	 * 服务端返回公会名字
	 */
	export class S2C_SSearchClan {
		public clanSummaryInfo: Array<any> = [];	//返回搜索公会

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SSearchClan, data: ByteArray): void {
			// var SSearchClan = Browser.window.SSearchClan.decode(data);
			// self.clanSummaryInfo = SSearchClan.clanSummaryInfo;
			// console.log("S2C_SSearchClan SSearchClan:", SSearchClan);
			let ClanSummaryInfoVo: game.modules.family.models.ClanSummaryInfoVo;
			ClanSummaryInfoVo = new game.modules.family.models.ClanSummaryInfoVo();
			ClanSummaryInfoVo.fromByteArray(data);
			self.clanSummaryInfo.push(ClanSummaryInfoVo);
		}
	}

	/**
	 * 禁言
	 */
	export class S2C_SBannedtalk {
		public memberid: number;	//角色id
		public flag: number;	//操作标示：1禁言  2解禁

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SBannedtalk, data: ByteArray): void {
			self.memberid = data.readLong();
			self.flag = data.readInt32();
		}
	}

	/**
	 * 返回成员列表
	 */
	export class S2C_SRefreshMemberList {
		public memberlist: Array<any> = [];	//公会成员列表

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SRefreshMemberList, data: ByteArray): void {
			let ClanMemberVo: game.modules.family.models.ClanMemberVo;
			let size = data.readInt8();
			for (var i = 0; i < size; i++) {
				ClanMemberVo = new game.modules.family.models.ClanMemberVo();
				ClanMemberVo.fromByteArray(data);
				self.memberlist.push(ClanMemberVo);
			}
		}
	}

	/**
	 * 返回申请过的公会列表
	 */
	export class S2C_SApplyClanList {
		public roleid: number;	//角色id
		public applyClanList: Array<any> = [];	//申请过的公会列表		

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SApplyClanList, data: ByteArray): void {
			self.roleid = data.readLong();
			var ApplyClanVo: game.modules.family.models.ApplyClanVo;
			let size = data.readInt8();
			for (var i = 0; i < size; i++) {
				ApplyClanVo = new game.modules.family.models.ApplyClanVo();
				ApplyClanVo.fromByteArray(data);
				self.applyClanList.push(ApplyClanVo);
			}
		}
	}

	/**
	 * 取消申请公会
	 */
	export class S2C_SCancelApplyClan {
		public clanid: number;	//公会id

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SCancelApplyClan, data: ByteArray): void {
			self.clanid = data.readLong();
		}
	}

	/**
	 * 更新个人帮贡信息
	 */
	export class S2C_SRefreshContribution {
		public currentcontribution: number;	//当前帮贡

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SRefreshContribution, data: ByteArray): void {
			var SRefreshContribution = Browser.window.SRefreshContribution.decode(data);
			self.currentcontribution = SRefreshContribution.currentcontribution;
			console.log("S2C_SRefreshContribution SRefreshContribution:", SRefreshContribution);
		}
	}

	/**
	 * 是否开启自动接收入会
	 */
	export class S2C_SOpenAutoJoinClan {
		public autostate: number;	//开启状态：0关闭  1开启
		public requestlevel: number;	//公会自动接收申请人入会的等级
		public applylevel: number;	//提交申请的等级限制

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SOpenAutoJoinClan, data: ByteArray): void {
			self.autostate = data.readInt32();
			self.requestlevel = data.readInt16();
			self.applylevel = data.readInt16();
		}
	}

	/**
	 * 返回公会事件信息
	 */
	export class S2C_SRequestEventInfo {
		public eventlist: Array<any> = [];	//

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SRequestEventInfo, data: ByteArray): void {
			let ClanEventInfoVo: game.modules.family.models.ClanEventInfoVo;
			let size = ByteArrayUtils.uncompact_uint32(data);
			for (var i = 0; i < size; i++) {
				ClanEventInfoVo = new game.modules.family.models.ClanEventInfoVo();
				ClanEventInfoVo.fromByteArray(data);
				self.eventlist.push(ClanEventInfoVo);
			}
		}
	}

	/**
	 * 返回公会事件详情信息
	 */
	export class S2C_SRequestRoleInfo {
		public roleinfo: any;	//角色详情

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SRequestRoleInfo, data: ByteArray): void {
			var SRequestRoleInfo = Browser.window.SRequestRoleInfo.decode(data);
			self.roleinfo = SRequestRoleInfo.roleinfo;
			console.log("S2C_SRequestRoleInfo SRequestRoleInfo:", SRequestRoleInfo);
		}
	}

	/**
	 * 返回购买药房的药品
	 */
	export class S2C_SBuyMedic {
		public itemid: number;	//药品id	
		public itemnum: number;
		public buyitemnum: number;	//当天已经购买数量

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SBuyMedic, data: ByteArray): void {
			self.itemid = data.readInt32();
			self.itemnum = data.readInt32();
			self.buyitemnum = data.readInt32();
		}
	}

	/**
	 * 返回修改产药倍数
	 */
	export class S2C_SRequestSelectType {
		public selecttype: number;	//选择几倍产药	

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SRequestSelectType, data: ByteArray): void {
			self.selecttype = data.readInt32();
		}
	}

	/**
	 * 返回请求符文请求信息
	 */
	export class S2C_SRequestRuneInfo {
		public requestnum: number;	//请求次数	
		public useenergy: number;	//消耗活力	
		public runeinfolist = [];	//	

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SRequestRuneInfo, data: ByteArray): void {
			self.requestnum = data.readInt32();
			self.useenergy = data.readInt32();
			let RuneInfoVo: game.modules.family.models.RuneInfoVo;
			let size = data.readInt8();
			for (var i = 0; i < size; i++) {
				RuneInfoVo = new game.modules.family.models.RuneInfoVo();
				RuneInfoVo.fromByteArray(data);
				self.runeinfolist.push(RuneInfoVo);
			}
		}
	}

	/**
	 * 返回捐献符文
	 */
	export class S2C_SRuneGive {
		public givevalue: number;	//当前活力值	

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SRuneGive, data: ByteArray): void {
			var SRuneGive = Browser.window.SRuneGive.decode(data);
			self.givevalue = SRuneGive.givevalue;
			console.log("S2C_SRuneGive SRuneGive:", SRuneGive);
		}
	}

	/**
	 * 请求符文
	 */
	export class S2C_SRuneRequest {
		public requestnum: number;	//请求次数	
		public runerequestinfolist = [];	//选择的信息	

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SRuneRequest, data: ByteArray): void {
			self.requestnum = data.readInt32();
			let size = data.readInt8();
			let RuneRequestInfoVo: game.modules.family.models.RuneRequestInfoVo;
			for (var i = 0; i < size; i++) {
				RuneRequestInfoVo = new game.modules.family.models.RuneRequestInfoVo();
				RuneRequestInfoVo.fromByteArray(data);
				self.runerequestinfolist.push(RuneRequestInfoVo);
			}
		}
	}

	/**
	 * 返回请求符文统计
	 */
	export class S2C_SRequestRuneCount {
		public runecountinfolist = [];	//	

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SRequestRuneCount, data: ByteArray): void {
			let size = data.readInt8();
			let RuneCountInfoVo: game.modules.family.models.RuneCountInfoVo;
			for (var i = 0; i < size; i++) {
				RuneCountInfoVo = new game.modules.family.models.RuneCountInfoVo;
				RuneCountInfoVo.fromByteArray(data);
				self.runecountinfolist.push(RuneCountInfoVo);
			}
		}
	}

	/**
	 * 返回请求符文界面
	 */
	export class S2C_SRuneRequestView {
		public requestnum: number;	//	请求次数
		public runerequestinfolist = [];	//	选择的信息

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SRuneRequestView, data: ByteArray): void {
			self.requestnum = data.readInt32();
			let RuneRequestInfoVo: game.modules.family.models.RuneRequestInfoVo;
			let size = data.readInt8();
			for (var i = 0; i < size; i++) {
				RuneRequestInfoVo = new game.modules.family.models.RuneRequestInfoVo();
				RuneRequestInfoVo.fromByteArray(data);
				self.runerequestinfolist.push(RuneRequestInfoVo);
			}
		}
	}

	/**
	 * 通知客户端红点信息  value=0 没有红点  value=1有红点
	 */
	export class S2C_SClanRedTip {
		public redtips: Dictionary;	//	

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SClanRedTip, data: ByteArray): void {
			// var SClanRedTip = Browser.window.SClanRedTip.decode(data);
			// self.redtips = SClanRedTip.redtips;
			// console.log("S2C_SClanRedTip SClanRedTip:", SClanRedTip);
			self.redtips = new Dictionary();
			let size = data.readUint8();
			for (var i = 0; i < size; i++) {
				self.redtips.set(data.readInt32(), data.readInt32());
			}
		}
	}

	/**
	 * 服务器返回该玩家是否有公会
	 */
	export class S2C_SRefreshRoleClan {
		public clankey: number;	//	公会key 大于0表示有公会
		public clanname: string;	//	公会名称

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SRefreshRoleClan, data: ByteArray): void {
			// 
			self.clankey = data.readLong();
			self.clanname = ByteArrayUtils.readUtf16String(data);
		}
	}

	/**
	 * 客户端请求邀请界面
	 */
	export class S2C_SClanInvitationView {
		public invitationroleinfolist = [];	//

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SClanInvitationView, data: ByteArray): void {
			// var SClanInvitationView = Browser.window.SClanInvitationView.decode(data);
			// self.invitationroleinfolist = SClanInvitationView.invitationroleinfolist;
			// console.log("S2C_SClanInvitationView SClanInvitationView:", SClanInvitationView);
			let InvitationRoleInfoVo: game.modules.family.models.InvitationRoleInfoVo;
			let size = data.readInt8();
			for (var i = 0; i < size; i++) {
				InvitationRoleInfoVo = new game.modules.family.models.InvitationRoleInfoVo();
				InvitationRoleInfoVo.fromByteArray(data);
				self.invitationroleinfolist.push(InvitationRoleInfoVo);
			}
		}
	}

	/**
	 * 搜索好成功
	 */
	export class S2C_SRequestSearchRole {
		public invitationroleinfolist = [];	//

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SRequestSearchRole, data: ByteArray): void {
			let InvitationRoleInfoVo: game.modules.family.models.InvitationRoleInfoVo;
			// let size = data.readInt8();
			// for(var i=0; i < size; i++){
			InvitationRoleInfoVo = new game.modules.family.models.InvitationRoleInfoVo();
			InvitationRoleInfoVo.fromByteArray(data);
			self.invitationroleinfolist.push(InvitationRoleInfoVo);
			// }
		}
	}

	/**
	 * 改变公会副本成功
	 */
	export class S2C_SChangeClanInst {
		public claninstservice: number;	//进入副本服务编号

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SChangeClanInst, data: ByteArray): void {
			self.claninstservice = data.readInt32();
		}
	}

	/**
	 * 返回发起界面
	 */
	export class S2C_SRequestImpeachMentView {
		public impeachstate: number;	//弹劾状态  0发起弹劾    1响应弹劾
		public maxnum: number;	//弹劾成功需要的人数
		public impeachname: string;	//发起弹劾人的名称
		public impeachtime: number;	//发起弹劾时间
		public curnum: number;	//当前响应人数

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SRequestImpeachMentView, data: ByteArray): void {
			self.impeachstate = data.readByte();
			self.maxnum = data.readInt16();
			self.impeachname = ByteArrayUtils.readUtf16String(data);
			self.impeachtime = data.readLong();
			self.curnum = data.readInt16();
		}
	}

	/**
	 * 返回对战列表
	 */
	export class S2C_SGetClanFightList {
		public clanfightlist: Array<any> = [];	//当前这轮的对阵信息链表
		public curweek: number;	//当前轮数(从0开始, 返回-1表示还没开始或已经过了8轮)
		public over: number;	//0是没结束1是已结束

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SGetClanFightList, data: ByteArray): void {
			let ClanFightVo: game.modules.family.models.ClanFightVo;
			let size = data.readInt8();
			for (var i = 0; i < size; i++) {
				ClanFightVo = new game.modules.family.models.ClanFightVo();
				ClanFightVo.fromByteArray(data);
				self.clanfightlist.push(ClanFightVo);
			}
			self.curweek = data.readInt32();
			self.over = data.readInt32();
		}
	}

	/**
	 * 公会战时统计
	 */
	export class S2C_SBattleFieldScore {
		public clanscore1: number;	//公会1积分
		public clanscroe2: number;	//公会2积分
		public myscore: number;	//我的积分
		public myrank: number;	//我的排名

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SBattleFieldScore, data: ByteArray): void {
			var SBattleFieldScore = Browser.window.SBattleFieldScore.decode(data);
			self.clanscore1 = SBattleFieldScore.clanscore1;
			self.clanscroe2 = SBattleFieldScore.clanscroe2;
			self.myscore = SBattleFieldScore.myscore;
			self.myrank = SBattleFieldScore.myrank;
			console.log("S2C_SBattleFieldScore SBattleFieldScore:", SBattleFieldScore);
		}
	}

	/**
	 * 公会战时统计
	 */
	export class S2C_SBattleFieldAct {
		public roleact: number;	//玩家行动力

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SBattleFieldAct, data: ByteArray): void {
			var SBattleFieldAct = Browser.window.SBattleFieldAct.decode(data);
			self.roleact = SBattleFieldAct.roleact;
			console.log("S2C_SBattleFieldScore SBattleFieldAct:", SBattleFieldAct);
		}
	}

	/**
	 * 公会战时统计
	 */
	export class S2C_SBattleFieldRankList {
		public clanscore1: number;	//公会1积分
		public clanscroe2: number;	//公会2积分
		public ranklist1: Array<number>;	//战场积分排名list
		public ranklist2: Array<number>;	//战场积分排名list
		public myscore: number;	//我的积分
		public myrank: number;	//我的排名(从0开始)	

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SBattleFieldRankList, data: ByteArray): void {
			var SBattleFieldRankList = Browser.window.SBattleFieldRankList.decode(data);
			self.clanscore1 = SBattleFieldRankList.clanscore1;
			self.clanscroe2 = SBattleFieldRankList.clanscroe2;
			self.ranklist1 = SBattleFieldRankList.ranklist1;
			self.ranklist2 = SBattleFieldRankList.ranklist2;
			self.myscore = SBattleFieldRankList.myscore;
			self.myrank = SBattleFieldRankList.myrank;
			console.log("S2C_SBattleFieldRankList SBattleFieldRankList:", SBattleFieldRankList);
		}
	}

	/**
	 * 公会战时信息
	 */
	export class S2C_SBattleFieldInfo {
		public clanname1: string;	//公会名字1
		public clanname2: string;	//公会名字2
		public clanid1: number;	//公会1ID
		public clanid2: number;	//公会2ID

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SBattleFieldInfo, data: ByteArray): void {
			var SBattleFieldInfo = Browser.window.SBattleFieldInfo.decode(data);
			self.clanname1 = SBattleFieldInfo.clanname1;
			self.clanname2 = SBattleFieldInfo.clanname2;
			self.clanid1 = SBattleFieldInfo.clanid1;
			self.clanid2 = SBattleFieldInfo.clanid2;
			console.log("S2C_SBattleFieldInfo SBattleFieldInfo:", SBattleFieldInfo);
		}
	}

	/**
	 * 请求是否是敌对
	 */
	export class S2C_SRequestRoleIsEnemy {
		public rolelist: any;	//-1是未知1是自己2是敌对

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SRequestRoleIsEnemy, data: ByteArray): void {
			var SRequestRoleIsEnemy = Browser.window.SRequestRoleIsEnemy.decode(data);
			self.rolelist = SRequestRoleIsEnemy.rolelist;
			console.log("S2C_SRequestRoleIsEnemy SRequestRoleIsEnemy:", SRequestRoleIsEnemy);
		}
	}

	/**
	 * 战场结束
	 */
	export class S2C_SClanFightOver {
		public status: number;	//--1是没结束0是第一个赢了1是第2个赢了
		public overtimestamp: number;	//-结束时服务器的时间戳

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SClanFightOver, data: ByteArray): void {
			var SClanFightOver = Browser.window.SClanFightOver.decode(data);
			self.status = SClanFightOver.status;
			self.overtimestamp = SClanFightOver.overtimestamp;
			console.log("S2C_SClanFightOver SClanFightOver:", SClanFightOver);
		}
	}

	/**
	 * 离开战场
	 */
	export class S2C_SLeaveBattleField {

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SLeaveBattleField, data: ByteArray): void {
			var SLeaveBattleField = Browser.window.SLeaveBattleField.decode(data);
			console.log("S2C_SLeaveBattleField SLeaveBattleField:", SLeaveBattleField);
		}
	}

	/**
	 * 得到下次清零时间
	 */
	export class S2C_SGetClearTime {

		public cleartime: number;  //清除时间戳
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SGetClearTime, data: ByteArray): void {
			self.cleartime = data.readLong();
		}
	}

	/**
	 * <!--  跨服和原服之间的协议  start  协议号从25000 协议号从25499 -->
	 */
	export class S2C_SendRoleInfo {

		public myZoneId: number;
		public userId: number;
		public roleId: number;
		public flag: number;  //1到跨服，2到原服
		public needClearData: number;  //是否需要重置跨服临时数据
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SendRoleInfo, data: ByteArray): void {
			var SendRoleInfo = Browser.window.SendRoleInfo.decode(data);
			self.myZoneId = SendRoleInfo.myZoneId;
			self.userId = SendRoleInfo.userId;
			self.roleId = SendRoleInfo.roleId;
			self.flag = SendRoleInfo.flag;
			self.needClearData = SendRoleInfo.needClearData;
			console.log("S2C_SendRoleInfo SendRoleInfo:", SendRoleInfo);
		}
	}

	/**
	 * 
	 */
	export class S2C_SendRoleInfo_Rep {

		public roleId: number;
		public myZoneId: number;
		public flag: number; 　　//1到跨服，2到原服
		public copydata: number;  //0不需要，1需要
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SendRoleInfo_Rep, data: ByteArray): void {
			var SendRoleInfo_Rep = Browser.window.SendRoleInfo_Rep.decode(data);
			self.roleId = SendRoleInfo_Rep.roleId;
			self.myZoneId = SendRoleInfo_Rep.myZoneId;
			self.flag = SendRoleInfo_Rep.flag;
			self.copydata = SendRoleInfo_Rep.copydata;
			console.log("S2C_SendRoleInfo_Rep SendRoleInfo_Rep:", SendRoleInfo_Rep);
		}
	}

	/**
	 * 
	 */
	export class S2C_SendRoleData {

		public roleId: number;
		public tableName: string;
		public valueData: number;
		public keyData: number;
		public isEmptyTable: number;  //是否为空表，1是
		public relationData: Array<number>;  //相关联数据
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SendRoleData, data: ByteArray): void {
			var SendRoleData = Browser.window.SendRoleData.decode(data);
			self.roleId = SendRoleData.roleId;
			self.tableName = SendRoleData.tableName;
			self.valueData = SendRoleData.valueData;
			self.keyData = SendRoleData.keyData;
			self.isEmptyTable = SendRoleData.isEmptyTable;
			self.relationData = SendRoleData.relationData;
			console.log("S2C_SendRoleData SendRoleData:", SendRoleData);
		}
	}

	/**
	 * 
	 */
	export class S2C_SendWordMsg {

		public messagetype: number;  //消息类型	
		public roleId: number;  //角色id
		public roleName: string; 　//角色名字
		public shapeId: number; 　//角色头像
		public serverName: string;  //服务器
		public serverId: string;  //服务器id
		public worldMsg: string;  //消息内容
		public recRoleId: number;  //接收消息房间成员角色id
		public isRoom: number;  //是否有房间标识：0、无房间  1、有房间
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SendWordMsg, data: ByteArray): void {
			var SendWordMsg = Browser.window.SendWordMsg.decode(data);
			self.messagetype = SendWordMsg.messagetype;
			self.roleId = SendWordMsg.roleId;
			self.roleName = SendWordMsg.roleName;
			self.shapeId = SendWordMsg.shapeId;
			self.serverName = SendWordMsg.serverName;
			self.serverId = SendWordMsg.serverId;
			self.worldMsg = SendWordMsg.worldMsg;
			self.recRoleId = SendWordMsg.recRoleId;
			self.isRoom = SendWordMsg.isRoom;
			console.log("S2C_SendRoleData SendWordMsg:", SendWordMsg);
		}
	}
	/**
	 * 
	 */
	export class S2C_SCReqCrosserInfo {

		public zoneId: number;  //	
		public roleId: number;  //
		public roleName: string; 　//
		public rolelv: number; 　//
		public roleschool: number;  //
		public roleShapeid: number;
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SCReqCrosserInfo, data: ByteArray): void {
			var SCReqCrosserInfo = Browser.window.SCReqCrosserInfo.decode(data);
			self.zoneId = SCReqCrosserInfo.zoneId;
			self.roleId = SCReqCrosserInfo.roleId;
			self.roleName = SCReqCrosserInfo.roleName;
			self.rolelv = SCReqCrosserInfo.rolelv;
			self.roleschool = SCReqCrosserInfo.roleschool;
			self.roleShapeid = SCReqCrosserInfo.roleShapeid;
			console.log("S2C_SCReqCrosserInfo SCReqCrosserInfo:", SCReqCrosserInfo);
		}
	}
	/**
	 * 
	 */
	export class S2C_SCCreateRoom {

		public zoneId: number;  //	
		public roomName: string;  //
		public pwd: string; 　//
		public members: Array<number>; 　//
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SCCreateRoom, data: ByteArray): void {
			var SCCreateRoom = Browser.window.SCCreateRoom.decode(data);
			self.zoneId = SCCreateRoom.zoneId;
			self.roomName = SCCreateRoom.roomName;
			self.pwd = SCCreateRoom.pwd;
			self.members = SCCreateRoom.members;
			console.log("S2C_SCCreateRoom SCCreateRoom:", SCCreateRoom);
		}
	}

	/**
	 * 
	 */
	export class S2C_SCReqRoomInfos {

		public roleId: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SCReqRoomInfos, data: ByteArray): void {
			var SCReqRoomInfos = Browser.window.SCReqRoomInfos.decode(data);
			self.roleId = SCReqRoomInfos.roleId;
			console.log("S2C_SCReqRoomInfos SCReqRoomInfos:", SCReqRoomInfos);
		}
	}

	/**
	 * 
	 */
	export class S2C_SCLeaveRoom {

		public roleId: number;  //	
		public roomid: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SCLeaveRoom, data: ByteArray): void {
			var SCLeaveRoom = Browser.window.SCLeaveRoom.decode(data);
			self.roleId = SCLeaveRoom.roleId;
			self.roomid = SCLeaveRoom.roomid;
			console.log("S2C_SCLeaveRoom SCLeaveRoom:", SCLeaveRoom);
		}
	}
	/**
	 * 
	 */
	export class S2C_SCStandCross {

		public roleId: number;  //	
		public flag: number;  //	1准备，2取消
		public roomid: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SCStandCross, data: ByteArray): void {
			var SCStandCross = Browser.window.SCStandCross.decode(data);
			self.roleId = SCStandCross.roleId;
			self.flag = SCStandCross.flag;
			self.roomid = SCStandCross.roomid;
			console.log("S2C_SCStandCross SCStandCross:", SCStandCross);
		}
	}
	/**
	 * 
	 */
	export class S2C_SCEnterRoom {

		public zoneId: number;  //	
		public roomid: number;  //	1准备，2取消
		public pwd: number;  //	
		public members: Array<any>;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SCEnterRoom, data: ByteArray): void {
			var SCEnterRoom = Browser.window.SCEnterRoom.decode(data);
			self.zoneId = SCEnterRoom.zoneId;
			self.roomid = SCEnterRoom.roomid;
			self.pwd = SCEnterRoom.pwd;
			self.members = SCEnterRoom.members;
			console.log("S2C_SCEnterRoom SCEnterRoom:", SCEnterRoom);
		}
	}

	/**
	 * 
	 */
	export class S2C_SCRoomStand {

		public roleId: number;  //	
		public flag: number;  //	1准备，2取消
		public roomid: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SCRoomStand, data: ByteArray): void {
			var SCRoomStand = Browser.window.SCRoomStand.decode(data);
			self.roleId = SCRoomStand.roleId;
			self.flag = SCRoomStand.flag;
			self.roomid = SCRoomStand.roomid;
			console.log("S2C_SCRoomStand SCRoomStand:", SCRoomStand);
		}
	}

	/**
	 * 
	 */
	export class S2C_SCReqRoomInfo {

		public zoneId: number;  //	
		public roleId: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SCReqRoomInfo, data: ByteArray): void {
			var SCReqRoomInfo = Browser.window.SCReqRoomInfo.decode(data);
			self.zoneId = SCReqRoomInfo.zoneId;
			self.roleId = SCReqRoomInfo.roleId;
			console.log("S2C_SCReqRoomInfo SCReqRoomInfo:", SCReqRoomInfo);
		}
	}

	/**
	 * 
	 */
	export class S2C_SCChangeCrosserForm {

		public zoneId: number;  //	
		public roleId: number;  //	
		public formId: number;  //	
		public formlv: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SCChangeCrosserForm, data: ByteArray): void {
			var SCChangeCrosserForm = Browser.window.SCChangeCrosserForm.decode(data);
			self.zoneId = SCChangeCrosserForm.zoneId;
			self.roleId = SCChangeCrosserForm.roleId;
			self.formId = SCChangeCrosserForm.formId;
			self.formlv = SCChangeCrosserForm.formlv;
			console.log("S2C_SCChangeCrosserForm SCChangeCrosserForm:", SCChangeCrosserForm);
		}
	}

	/**
	 * 
	 */
	export class S2C_SCChangeRoomPwd {

		public zoneId: number;  //	
		public roleId: number;  //	
		public roompwd: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SCChangeRoomPwd, data: ByteArray): void {
			var SCChangeRoomPwd = Browser.window.SCChangeRoomPwd.decode(data);
			self.zoneId = SCChangeRoomPwd.zoneId;
			self.roleId = SCChangeRoomPwd.roleId;
			self.roompwd = SCChangeRoomPwd.roompwd;
			console.log("S2C_SCChangeRoomPwd SCChangeRoomPwd:", SCChangeRoomPwd);
		}
	}

	/**
	 * 
	 */
	export class S2C_SCModifyCrossMoney {

		public zoneId: number;  //	
		public crossMoney: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SCModifyCrossMoney, data: ByteArray): void {
			var SCModifyCrossMoney = Browser.window.SCModifyCrossMoney.decode(data);
			self.zoneId = SCModifyCrossMoney.zoneId;
			self.crossMoney = SCModifyCrossMoney.crossMoney;
			console.log("S2C_SCModifyCrossMoney SCModifyCrossMoney:", SCModifyCrossMoney);
		}
	}


	/**
	 * 
	 */
	export class S2C_SCEndCross {

		public roleId: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SCEndCross, data: ByteArray): void {
			var SCEndCross = Browser.window.SCEndCross.decode(data);
			self.roleId = SCEndCross.roleId;
			console.log("S2C_SCEndCross SCEndCross:", SCEndCross);
		}
	}


	/**
	 * 
	 */
	export class S2C_SCReqTTBonus {

		public roleId: number;  //	
		public ttBonusid: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SCReqTTBonus, data: ByteArray): void {
			var SCReqTTBonus = Browser.window.SCReqTTBonus.decode(data);
			self.roleId = SCReqTTBonus.roleId;
			self.ttBonusid = SCReqTTBonus.ttBonusid;
			console.log("S2C_SCReqTTBonus SCReqTTBonus:", SCReqTTBonus);
		}
	}

	/**
	 * 
	 */
	export class S2C_SCResultTTBonus {

		public roleId: number;  //	
		public ttBonusid: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SCResultTTBonus, data: ByteArray): void {
			var SCResultTTBonus = Browser.window.SCResultTTBonus.decode(data);
			self.roleId = SCResultTTBonus.roleId;
			self.ttBonusid = SCResultTTBonus.ttBonusid;
			console.log("S2C_SCResultTTBonus SCResultTTBonus:", SCResultTTBonus);
		}
	}
	/**
	 * 
	 */
	export class S2C_SCInvitJoinRoom {

		public roleId: number;  //	
		public beInvitroleId: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SCInvitJoinRoom, data: ByteArray): void {
			var SCInvitJoinRoom = Browser.window.SCInvitJoinRoom.decode(data);
			self.roleId = SCInvitJoinRoom.roleId;
			self.beInvitroleId = SCInvitJoinRoom.beInvitroleId;
			console.log("S2C_SCInvitJoinRoom SCInvitJoinRoom:", SCInvitJoinRoom);
		}
	}

	/**
	 * 
	 */
	export class S2C_SCReqCrossRankList {

		public zoneId: number;  //	
		public roleId: number;  //	
		public ranklevel: number;  //	
		public ranktype: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SCReqCrossRankList, data: ByteArray): void {
			var SCReqCrossRankList = Browser.window.SCReqCrossRankList.decode(data);
			self.zoneId = SCReqCrossRankList.zoneId;
			self.roleId = SCReqCrossRankList.roleId;
			self.ranklevel = SCReqCrossRankList.ranklevel;
			self.ranktype = SCReqCrossRankList.ranktype;
			console.log("S2C_SCReqCrossRankList SCReqCrossRankList:", SCReqCrossRankList);
		}
	}

	/**
	 * 
	 */
	export class S2C_SCKickoffRoom {

		public roleId: number;  //	
		public bekickoffroleId: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SCKickoffRoom, data: ByteArray): void {
			var SCKickoffRoom = Browser.window.SCKickoffRoom.decode(data);
			self.roleId = SCKickoffRoom.roleId;
			self.bekickoffroleId = SCKickoffRoom.bekickoffroleId;
			console.log("S2C_SCKickoffRoom SCKickoffRoom:", SCKickoffRoom);
		}
	}

	/**
	 * 
	 */
	export class S2C_SCAddCrossIntegral {

		public roleId: number;  //	
		public IntegralCount: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SCAddCrossIntegral, data: ByteArray): void {
			var SCAddCrossIntegral = Browser.window.SCAddCrossIntegral.decode(data);
			self.roleId = SCAddCrossIntegral.roleId;
			self.IntegralCount = SCAddCrossIntegral.IntegralCount;
			console.log("S2C_SCAddCrossIntegral SCAddCrossIntegral:", SCAddCrossIntegral);
		}
	}
	/**
	 * 
	 */
	export class S2C_SCCrossLvUp {

		public roleId: number;  //	
		public rolelv: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SCCrossLvUp, data: ByteArray): void {
			var SCCrossLvUp = Browser.window.SCCrossLvUp.decode(data);
			self.roleId = SCCrossLvUp.roleId;
			self.rolelv = SCCrossLvUp.rolelv;
			console.log("S2C_SCCrossLvUp SCCrossLvUp:", SCCrossLvUp);
		}
	}
	/**
	 * 
	 */
	export class S2C_SCSetRoomOwner {

		public roleId: number;  //	
		public newownerroleId: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SCSetRoomOwner, data: ByteArray): void {
			var SCSetRoomOwner = Browser.window.SCSetRoomOwner.decode(data);
			self.roleId = SCSetRoomOwner.roleId;
			self.newownerroleId = SCSetRoomOwner.newownerroleId;
			console.log("S2C_SCSetRoomOwner SCSetRoomOwner:", SCSetRoomOwner);
		}
	}
	/**
	 * 
	 */
	export class S2C_SCSwapRoomMember {

		public roleId: number;  //	
		public index1: number;  //	index是队员的序号，5人队伍的话，就是0~4
		public index2: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SCSwapRoomMember, data: ByteArray): void {
			var SCSwapRoomMember = Browser.window.SCSwapRoomMember.decode(data);
			self.roleId = SCSwapRoomMember.roleId;
			self.index1 = SCSwapRoomMember.index1;
			self.index2 = SCSwapRoomMember.index2;
			console.log("S2C_SCSwapRoomMember SCSwapRoomMember:", SCSwapRoomMember);
		}
	}
	/**
	 * 
	 */
	export class S2C_SBeginCorssServer {

		public account: string;  //	帐号
		public ticket: string;  //	门票
		public crossIp: string;  //	
		public crossPort: number;  //	
		public crossNum: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SBeginCorssServer, data: ByteArray): void {
			var SBeginCorssServer = Browser.window.SBeginCorssServer.decode(data);
			self.account = SBeginCorssServer.account;
			self.ticket = SBeginCorssServer.ticket;
			self.crossIp = SBeginCorssServer.crossIp;
			self.crossPort = SBeginCorssServer.crossPort;
			self.crossNum = SBeginCorssServer.crossNum;
			console.log("S2C_SBeginCorssServer SBeginCorssServer:", SBeginCorssServer);
		}
	}
	/**
	 * 
	 */
	export class S2C_SSendCrosserInfo {

		public season: number;  //	帐号
		public week: number;  //	门票
		public seasonendtime: number;  //	
		public crosserinfo: any;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SSendCrosserInfo, data: ByteArray): void {
			var SSendCrosserInfo = Browser.window.SSendCrosserInfo.decode(data);
			self.season = SSendCrosserInfo.season;
			self.week = SSendCrosserInfo.week;
			self.seasonendtime = SSendCrosserInfo.seasonendtime;
			self.crosserinfo = SSendCrosserInfo.crosserinfo;
			console.log("S2C_SSendCrosserInfo SSendCrosserInfo:", SSendCrosserInfo);
		}
	}

	/**
	 * 
	 */
	export class S2C_SSendRoomInfos {

		public roomInfos: Array<any>;  //	帐号
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SSendRoomInfos, data: ByteArray): void {
			var SSendRoomInfos = Browser.window.SSendRoomInfos.decode(data);
			self.roomInfos = SSendRoomInfos.roomInfos;
			console.log("S2C_SSendRoomInfos SSendRoomInfos:", SSendRoomInfos);
		}
	}


	/**
	 * 
	 */
	export class S2C_SUpdataRoomInfo {

		public roomInfo: any;  //	帐号
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SUpdataRoomInfo, data: ByteArray): void {
			var SUpdataRoomInfo = Browser.window.SUpdataRoomInfo.decode(data);
			self.roomInfo = SUpdataRoomInfo.roomInfo;
			console.log("S2C_SUpdataRoomInfo SUpdataRoomInfo:", SUpdataRoomInfo);
		}
	}


	/**
	 * 
	 */
	export class S2C_SLeaveRoom {

		public roleId: number;  //	帐号
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SLeaveRoom, data: ByteArray): void {
			var SLeaveRoom = Browser.window.SLeaveRoom.decode(data);
			self.roleId = SLeaveRoom.roleId;
			console.log("S2C_SLeaveRoom SLeaveRoom:", SLeaveRoom);
		}
	}
	/**
	 * 
	 */
	export class S2C_SStandCross {

		public roleId: number;  //	
		public flag: number;  //	 1准备，2取消
		public roomid: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SStandCross, data: ByteArray): void {
			var SStandCross = Browser.window.SStandCross.decode(data);
			self.roleId = SStandCross.roleId;
			self.flag = SStandCross.flag;
			self.roomid = SStandCross.roomid;
			console.log("S2C_SStandCross SStandCross:", SStandCross);
		}
	}
	/**
	 * 
	 */
	export class S2C_SNotifyMsg {

		public errorType: number;  //	
		public msgID: number;  //	 1准备，2取消
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SNotifyMsg, data: ByteArray): void {
			var SNotifyMsg = Browser.window.SNotifyMsg.decode(data);
			self.errorType = SNotifyMsg.errorType;
			self.msgID = SNotifyMsg.msgID;
			console.log("S2C_SNotifyMsg SNotifyMsg:", SNotifyMsg);
		}
	}
	/**
	 * 
	 */
	export class S2C_SRoomStand {

		public flag: number;  //	
		public roomid: number;  //	 1准备，2取消
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SRoomStand, data: ByteArray): void {
			var SRoomStand = Browser.window.SRoomStand.decode(data);
			self.flag = SRoomStand.flag;
			self.roomid = SRoomStand.roomid;
			console.log("S2C_SRoomStand SRoomStand:", SRoomStand);
		}
	}
	/**
	 * 
	 */
	export class S2C_SCrossBattleInfo {

		public Room1members: Array<string>;  //	
		public Room2members: Array<string>;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SCrossBattleInfo, data: ByteArray): void {
			var SCrossBattleInfo = Browser.window.SCrossBattleInfo.decode(data);
			self.Room1members = SCrossBattleInfo.Room1members;
			self.Room2members = SCrossBattleInfo.Room2members;
			console.log("S2C_SCrossBattleInfo SCrossBattleInfo:", SCrossBattleInfo);
		}
	}

	export class S2C_SCrossBattleMemberState {

		public stateChangeroleId: number;  //	
		public state: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SCrossBattleMemberState, data: ByteArray): void {
			var SCrossBattleMemberState = Browser.window.SCrossBattleMemberState.decode(data);
			self.stateChangeroleId = SCrossBattleMemberState.stateChangeroleId;
			self.state = SCrossBattleMemberState.state;
			console.log("S2C_SCrossBattleMemberState SCrossBattleMemberState:", SCrossBattleMemberState);
		}
	}

	export class S2C_SCrossBattleResult {

		public resultType: number;  //	
		public heroIntegral: number;  //	
		public heroMaxIntegral: number;  //	
		public herolistFightTime: number;  //	
		public herolistWinTime: number;  //	
		public herolistRunawayTime: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SCrossBattleResult, data: ByteArray): void {
			var SCrossBattleResult = Browser.window.SCrossBattleResult.decode(data);
			self.resultType = SCrossBattleResult.resultType;
			self.heroIntegral = SCrossBattleResult.heroIntegral;
			self.heroMaxIntegral = SCrossBattleResult.herheroMaxIntegraloIntegral;
			self.herolistFightTime = SCrossBattleResult.herolistFightTime;
			self.herolistWinTime = SCrossBattleResult.herolistWinTime;
			self.herolistRunawayTime = SCrossBattleResult.herolistRunawayTime;
			console.log("S2C_SCrossBattleResult SCrossBattleResult:", SCrossBattleResult);
		}
	}

	export class S2C_SChangeCrosserForm {

		public roleId: number;  //	
		public formId: number;  //	
		public formlv: number;  //	
		public herolistFightTime: number;  //	
		public herolistWinTime: number;  //	
		public herolistRunawayTime: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SChangeCrosserForm, data: ByteArray): void {
			var SChangeCrosserForm = Browser.window.SChangeCrosserForm.decode(data);
			self.roleId = SChangeCrosserForm.roleId;
			self.formId = SChangeCrosserForm.formId;
			self.formlv = SChangeCrosserForm.formlv;
			console.log("S2C_SChangeCrosserForm SChangeCrosserForm:", SChangeCrosserForm);
		}
	}


	export class S2C_SResultTTBonus {

		public ttBonusid: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SResultTTBonus, data: ByteArray): void {
			var SResultTTBonus = Browser.window.SResultTTBonus.decode(data);
			self.ttBonusid = SResultTTBonus.ttBonusid;
			console.log("S2C_SResultTTBonus SResultTTBonus:", SResultTTBonus);
		}
	}

	export class S2C_SInvitJoinRoom {

		public Invitername: string;  //	
		public Invitroomid: number;  //	
		public Invitroomname: string;  //	
		public pwd: string;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SInvitJoinRoom, data: ByteArray): void {
			var SInvitJoinRoom = Browser.window.SInvitJoinRoom.decode(data);
			self.Invitername = SInvitJoinRoom.Invitername;
			self.Invitroomid = SInvitJoinRoom.Invitroomid;
			self.Invitroomname = SInvitJoinRoom.Invitroomname;
			self.pwd = SInvitJoinRoom.pwd;
			console.log("S2C_SResultTTBonus SInvitJoinRoom:", SInvitJoinRoom);
		}
	}

	export class S2C_SReqCrossRankList {

		public ranklevel: string;  //	
		public ranktype: number;  //	
		public rankindex: string;  //	
		public RankLists: Array<any>;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SReqCrossRankList, data: ByteArray): void {
			var SReqCrossRankList = Browser.window.SReqCrossRankList.decode(data);
			self.ranklevel = SReqCrossRankList.ranklevel;
			self.ranktype = SReqCrossRankList.ranktype;
			self.rankindex = SReqCrossRankList.rankindex;
			self.RankLists = SReqCrossRankList.RankListspwd;
			console.log("S2C_SReqCrossRankList SReqCrossRankList:", SReqCrossRankList);
		}
	}

	export class S2C_SKickoffRoom {

		public bekickoffroleId: string;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SKickoffRoom, data: ByteArray): void {
			var SKickoffRoom = Browser.window.SKickoffRoom.decode(data);
			self.bekickoffroleId = SKickoffRoom.bekickoffroleId;
			console.log("S2C_SKickoffRoom SKickoffRoom:", SKickoffRoom);
		}
	}

	export class S2C_SEnterLeaveHell {

		public enterleave: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SEnterLeaveHell, data: ByteArray): void {
			var SEnterLeaveHell = Browser.window.SEnterLeaveHell.decode(data);
			self.enterleave = SEnterLeaveHell.enterleave;
			console.log("S2C_SEnterLeaveHell SEnterLeaveHell:", SEnterLeaveHell);
		}
	}

	export class S2C_SSwapRoomMember {

		public index1: number;  //	
		public index2: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SSwapRoomMember, data: ByteArray): void {
			var SSwapRoomMember = Browser.window.SSwapRoomMember.decode(data);
			self.index1 = SSwapRoomMember.index1;
			self.index2 = SSwapRoomMember.index2;
			console.log("S2C_SSwapRoomMember SSwapRoomMember:", SSwapRoomMember);
		}
	}

	export class S2C_SEndCross {

		//  public index1:number;  //	
		//  public index2:number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SEndCross, data: ByteArray): void {
			var SEndCross = Browser.window.SEndCross.decode(data);
			// self.index1 = SEndCross.index1;
			// self.index2 = SEndCross.index2;
			console.log("S2C_SEndCross SEndCross:", SEndCross);
		}
	}
	export class S2C_SFriendsInfoInit {

		public friends: Array<any>;  //	
		public friendNumLimit: number;  //	好友人数限制
		public refuseStrangerMsg: number;  //	 0=接收陌生人消息 1=拒绝陌生人信息
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SFriendsInfoInit, data: ByteArray): void {
			// var SFriendsInfoInit = Browser.window.SFriendsInfoInit.decode(data);
			// self.friends = SFriendsInfoInit.friends;
			// self.refuseStrangerMsg = SFriendsInfoInit.refuseStrangerMsg;
			// console.log("S2C_SFriendsInfoInit SFriendsInfoInit:", SFriendsInfoInit);
			self.friends = new Array<any>();
			let friendsSize: number = data.readUint8();
			let friendInfo: game.modules.friend.models.FriendInfoVo;
			for (var index = 0; index < friendsSize; index++) {
				friendInfo = new game.modules.friend.models.FriendInfoVo();
				friendInfo.fromByteArray(data);
				self.friends.push(friendInfo);
			}//FriendInfo
			self.friendNumLimit = data.readInt16();
			self.refuseStrangerMsg = data.readByte();
			console.log("S2C_SFriendsInfoInit++++++++++++++++++++", self.friends);
		}
	}
	/**
	 * 好友上下线
	 */

	export class S2C_SFriendsOnline {

		public roleid: any;  //	
		public online: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SFriendsOnline, data: ByteArray): void {
			self.roleid = data.readLong();
			self.online = data.readByte();
		}
	}

	/**
	 * 好友聊天聊天S-->C
	 */

	export class S2C_SFriendMessageToRole {

		public roleid: number;  //	
		public content: string;  //	
		public roleLevel: number;  //	
		public details: Array<any>; //	
		public displayinfo: Array<any>;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SFriendMessageToRole, data: ByteArray): void {
			// var SFriendMessageToRole = Browser.window.SFriendMessageToRole.decode(data);
			// self.roleid = SFriendMessageToRole.roleid;
			// self.content = SFriendMessageToRole.content;
			// self.roleLevel = SFriendMessageToRole.roleLevel;
			// self.details = SFriendMessageToRole.details;
			// self.displayinfo = SFriendMessageToRole.displayinfo;
			// console.log("S2C_SFriendMessageToRole SFriendMessageToRole:", SFriendMessageToRole);
			self.roleid = data.readLong();
			self.content = ByteArrayUtils.readUtf16String(data);
			self.roleLevel = data.readShort();

			self.details = new Array<any>();
			let detailsInfo: number;
			let detailsSize: number = data.readUint8();
			for (var index = 0; index < detailsSize; index++) {
				detailsInfo = data.readUint8();
				self.details.push(detailsInfo);
			}
			self.displayinfo = new Array<any>();
			let displayInfoVo: game.modules.chat.models.DisplayInfoVo;
			let displayinfosSize: number = data.readUint8();
			displayInfoVo = new game.modules.chat.models.DisplayInfoVo();
			for (var index = 0; index < displayinfosSize; index++) {
				displayInfoVo.fromByteArray(data);
				self.displayinfo.push(displayInfoVo);
			}
			console.log("S2C_SFriendMessageToRole++++++++++++++++++++++++", self.content);
		}
	}
	/**
	 * 
	 */

	export class S2C_SStrangerMessageToRole {

		public strangerMessage: game.modules.friend.models.StrangerMessageBeanVo;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SStrangerMessageToRole, data: ByteArray): void {
			// var SStrangerMessageToRole = Browser.window.SStrangerMessageToRole.decode(data);
			// self.strangerMessage = SStrangerMessageToRole.strangerMessage;
			// console.log("S2C_SStrangerMessageToRole SStrangerMessageToRole:", SStrangerMessageToRole);
			self.strangerMessage = new game.modules.friend.models.StrangerMessageBeanVo();
			self.strangerMessage.fromByteArray(data);
			console.log("S2C_SStrangerMessageToRole++++++++++++++++++", self.strangerMessage);
		}
	}
	/**
	 * 
	 */

	export class S2C_SOffLineMsgMessageToRole {

		public offLineMsgList: Array<any>;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SOffLineMsgMessageToRole, data: ByteArray): void {
			// var SOffLineMsgMessageToRole = Browser.window.SOffLineMsgMessageToRole.decode(data);
			// self.offLineMsgList = SOffLineMsgMessageToRole.offLineMsgList;
			// console.log("S2C_SOffLineMsgMessageToRole SOffLineMsgMessageToRole:", SOffLineMsgMessageToRole);
			self.offLineMsgList = new Array<any>();
			let offLineMsgListSize: number = data.readUint8();
			let offLinemsgBean: game.modules.friend.models.offLineMsgBeanVo;
			for (var index = 0; index < offLineMsgListSize; index++) {
				offLinemsgBean = new game.modules.friend.models.offLineMsgBeanVo();
				offLinemsgBean.fromByteArray(data);
				self.offLineMsgList.push(offLinemsgBean);
			}//offLineMsgBean
			console.log("S2C_SOffLineMsgMessageToRole+++++++++++++++++++++++++++++", self.offLineMsgList);
		}
	}



	/**
	 * 
	 */

	export class S2C_SBreakOffRelation {

		public roleid: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SBreakOffRelation, data: ByteArray): void {
			self.roleid = data.readLong();
			console.log("S2C_SBreakOffRelation++++++++++++++", self.roleid);
		}
	}
	/**
	 * 
	 */

	export class S2C_SAddFriend {

		public FriendInfoBean: game.modules.friend.models.InfoBeanVo;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SAddFriend, data: ByteArray): void {
			// var SAddFriend = Browser.window.SAddFriend.decode(data);
			// self.FriendInfoBean = SAddFriend.FriendInfoBean;
			// console.log("S2C_SAddFriend SAddFriend:", SAddFriend);
			self.FriendInfoBean = new game.modules.friend.models.InfoBeanVo();
			self.FriendInfoBean.fromByteArray(data);
			console.log("S2C_SAddFriend++++++++++++++++++++", self.FriendInfoBean);
		}
	}


	/**
	 * 
	 */

	export class S2C_SChangeBaseConfig {

		public refuseStrangerMsg: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SChangeBaseConfig, data: ByteArray): void {
			var SChangeBaseConfig = Browser.window.SChangeBaseConfig.decode(data);
			self.refuseStrangerMsg = SChangeBaseConfig.refuseStrangerMsg;
			console.log("S2C_SChangeBaseConfig SChangeBaseConfig:", SChangeBaseConfig);
		}
	}

	/**
	 * 
	 */

	export class S2C_SRequestUpdateRoleInfo {

		public FriendInfoBean: game.modules.friend.models.InfoBeanVo;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SRequestUpdateRoleInfo, data: ByteArray): void {
			self.FriendInfoBean = new game.modules.friend.models.InfoBeanVo();
			self.FriendInfoBean.fromByteArray(data);
			console.log("S2C_SRequestUpdateRoleInfo++++++++++++++++++++", self.FriendInfoBean);
		}
	}
	/**
	 * 
	 */

	export class S2C_SRequestSpaceRoleInfo {

		public FriendInfoBean: any;  //	
		public Title: number;  //	
		public reqtype: number;  //	
		public components: any;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SRequestSpaceRoleInfo, data: ByteArray): void {
			var SRequestSpaceRoleInfo = Browser.window.SRequestSpaceRoleInfo.decode(data);
			self.FriendInfoBean = SRequestSpaceRoleInfo.FriendInfoBean;
			self.Title = SRequestSpaceRoleInfo.Title;
			self.reqtype = SRequestSpaceRoleInfo.reqtype;
			self.components = SRequestSpaceRoleInfo.components;
			console.log("S2C_SRequestSpaceRoleInfo SRequestSpaceRoleInfo:", SRequestSpaceRoleInfo);
		}
	}
	/**
	 * 
	 */

	export class S2C_SUpdateFriendLevel {

		public currentFriendLevel: number;  //	
		public friendid: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SUpdateFriendLevel, data: ByteArray): void {
			self.currentFriendLevel = data.readInt32();
			self.friendid = data.readLong();
			console.log("S2C_SUpdateFriendLevel++++++++++++++++++++", self.currentFriendLevel);
		}
	}
	/**
	 * 
	 */

	export class S2C_SSendSystemMessageToRole {

		public systemRoleId: number;  //	
		public contentId: number;  //	
		public contentParam: Array<any>;  //	
		public time: string;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SSendSystemMessageToRole, data: ByteArray): void {
			// var SSendSystemMessageToRole = Browser.window.SSendSystemMessageToRole.decode(data);
			// self.systemRoleId = SSendSystemMessageToRole.systemRoleId;
			// self.contentId = SSendSystemMessageToRole.contentId;
			// self.contentParam = SSendSystemMessageToRole.contentParam;
			// self.time = SSendSystemMessageToRole.time;
			// console.log("S2C_SSendSystemMessageToRole SSendSystemMessageToRole:", SSendSystemMessageToRole);
			self.systemRoleId = data.readLong();
			self.contentId = data.readInt32();
			self.contentParam = new Array<any>();
			let contentParamSize: number = data.readUint8();
			let contentParamInfo: string;
			for (var index = 0; index < contentParamSize; index++) {
				contentParamInfo = ByteArrayUtils.readUtf16String(data);
				self.contentParam.push(contentParamInfo);
			}

			// self.time = data.readUTFBytes(data.readUint8());
			self.time = ByteArrayUtils.readUtf16String(data);
			console.log("S2C_SSendSystemMessageToRole++++++++++++++++++++++++++++++++", self.contentParam);
		}
	}

	/**
	 * 
	 */

	export class S2C_SJionCamp {

		public roleId: number;  //	
		public campType: number;  //	
		public selectType: any;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SJionCamp, data: ByteArray): void {
			var SJionCamp = Browser.window.SJionCamp.decode(data);
			self.roleId = SJionCamp.roleId;
			self.campType = SJionCamp.campType;
			self.selectType = SJionCamp.selectType;
			console.log("S2C_SJionCamp SJionCamp:", SJionCamp);
		}
	}
	/**
	 * 搜索好友C-->S
	 */

	export class S2C_SSearchFriend {

		public FriendInfoBean: game.modules.friend.models.InfoBeanVo;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SSearchFriend, data: ByteArray): void {
			self.FriendInfoBean = new game.modules.friend.models.InfoBeanVo();
			self.FriendInfoBean.fromByteArray(data);
			console.log("S2C_SSearchFriend++++++++++++++++++++", self.FriendInfoBean);
		}
	}
	/**
	 * 
	 */

	export class S2C_SUpdateFriendState {

		public roleid: number;  //	
		public relation: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SUpdateFriendState, data: ByteArray): void {
			var SUpdateFriendState = Browser.window.SUpdateFriendState.decode(data);
			self.roleid = SUpdateFriendState.roleid;
			self.relation = SUpdateFriendState.relation;
			console.log("S2C_SUpdateFriendState SUpdateFriendState:", SUpdateFriendState);
		}
	}
	/**
	 * 
	 */

	export class S2C_SRecommendFriend {

		public friendInfoBeanList: Array<any>;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SRecommendFriend, data: ByteArray): void {
			// var SRecommendFriend = Browser.window.SRecommendFriend.decode(data);
			// self.friendInfoBeanList = SRecommendFriend.friendInfoBeanList;
			// console.log("S2C_SRecommendFriend SRecommendFriend:", SRecommendFriend);
			let infoBean: game.modules.friend.models.InfoBeanVo;
			self.friendInfoBeanList = new Array<any>();
			var friendInfoBeanListSize: number = data.readUint8();
			for (var index = 0; index < friendInfoBeanListSize; index++) {
				infoBean = new game.modules.friend.models.InfoBeanVo();
				infoBean.fromByteArray(data);
				self.friendInfoBeanList.push(infoBean);
			}//InfoBean
			console.log("S2C_SRecommendFriend++++++++++++++++++++", self.friendInfoBeanList);
		}
	}
	/**
	 * 
	 */

	export class S2C_FinishCopyRole {

		public roleId: number;  //	
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_FinishCopyRole, data: ByteArray): void {
			var FinishCopyRole = Browser.window.FinishCopyRole.decode(data);
			self.roleId = FinishCopyRole.roleId;
			console.log("S2C_FinishCopyRole FinishCopyRole:", FinishCopyRole);
		}
	}

	//sugq 服务端3
	//SGiveInfoList
	export class S2C_give_infolist {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public newGiveNumMap: any;	//map

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_give_infolist, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sGiveInfoList = Network._instance.protoTypePool.SGiveInfoList.decode(data);
			self.newGiveNumMap = sGiveInfoList.newGiveNumMap;
			console.log("S2C_give_infolist sGiveInfoList:", sGiveInfoList);
			console.log("S2C_give_infolist sGiveInfoList.newGiveNumMap", sGiveInfoList.newGiveNumMap);
		}
	}
	//SGiveItem
	export class S2C_give_item {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public roleId: number;	//
		public itemNum: number;	//

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_give_item, data: ByteArray): void {
			self.roleId = data.readLong();
			self.itemNum = data.readByte();
			console.log("S2C_give_item++++++++++++++++++++++++", self.itemNum);
		}
	}
	//SGiveGift
	export class S2C_give_gift {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public result: number;	//String

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_give_gift, data: ByteArray): void {
			self.result = data.readByte();
			console.log("S2C_give_gift+++++++++++++++++++++", self.result);
		}
	}
	//SGetSpaceInfo
	export class S2C_get_sapceinfo {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public giftnum: number;
		public popularity: number;
		public revnum: number;

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_get_sapceinfo, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sGetSpaceInfo = Network._instance.protoTypePool.SGetSpaceInfo.decode(data);
			self.giftnum = sGetSpaceInfo.giftnum;
			self.popularity = sGetSpaceInfo.popularity;
			self.revnum = sGetSpaceInfo.revnum;
			console.log("S2C_get_sapceinfo SGiveGift:", sGetSpaceInfo);
			console.log("S2C_get_sapceinfo SGiveGift.giftnum", sGetSpaceInfo.giftnum);
			console.log("S2C_get_sapceinfo SGiveGift.popularity", sGetSpaceInfo.popularity);
			console.log("S2C_get_sapceinfo SGiveGift.revnum", sGetSpaceInfo.revnum);
		}
	}
	//SSetSpaceGift
	export class S2C_set_spacegift {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public result: number;

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_set_spacegift, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sSetSpaceGift = Network._instance.protoTypePool.SSetSpaceGift.decode(data);
			self.result = sSetSpaceGift.result;
			console.log("S2C_set_spacegift SGiveGift:", sSetSpaceGift);
			console.log("S2C_set_spacegift SGiveGift.result", sSetSpaceGift.result);
		}
	}
	//SStepSpace
	export class S2C_step_space {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public result: number;

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_step_space, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sStepSpace = Network._instance.protoTypePool.SStepSpace.decode(data);
			self.result = sStepSpace.result;
			console.log("S2C_step_space sStepSpace:", sStepSpace);
			console.log("S2C_step_space sStepSpace.result", sStepSpace.result);
		}
	}
	//SGetRolesLevel
	export class S2C_get_roleslevel {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public roleslevel: any;
		public gettype: number;

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_get_roleslevel, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sGetRolesLevel = Network._instance.protoTypePool.SGetRolesLevel.decode(data);
			self.roleslevel = sGetRolesLevel.roleslevel;
			self.gettype = sGetRolesLevel.gettype;
			console.log("S2C_get_roleslevel sGetRolesLevel:", sGetRolesLevel);
			console.log("S2C_get_roleslevel sGetRolesLevel.roleslevel", sGetRolesLevel.roleslevel);
			console.log("S2C_get_roleslevel sGetRolesLevel.gettype", sGetRolesLevel.gettype);
		}
	}
	//SXshSpace
	export class S2C_xshSpace {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public result: number;

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_xshSpace, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sXshSpace = Network._instance.protoTypePool.SXshSpace.decode(data);
			self.result = sXshSpace.result;
			console.log("S2C_xshSpace sXshSpace:", sXshSpace);
			console.log("S2C_xshSpace sXshSpace.result", sXshSpace.result);
		}
	}
	//SXshGiveGift
	export class S2C_xshgivegift {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public result: number;

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_xshgivegift, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sXshGiveGift = Network._instance.protoTypePool.SXshGiveGift.decode(data);
			self.result = sXshGiveGift.result;
			console.log("S2C_xshgivegift sXshGiveGift:", sXshGiveGift);
			console.log("S2C_xshgivegift sXshGiveGift.result", sXshGiveGift.result);
		}
	}
	//SGetXshSpaceInfo
	export class S2C_get_xshspaceinfo {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public giftnum: number;
		public popularity: number;
		public revnum: number;

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_get_xshspaceinfo, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sGetXshSpaceInfo = Network._instance.protoTypePool.SGetXshSpaceInfo.decode(data);
			self.giftnum = sGetXshSpaceInfo.giftnum;
			self.popularity = sGetXshSpaceInfo.popularity;
			self.revnum = sGetXshSpaceInfo.revnum;
			console.log("S2C_get_xshspaceinfo sGetXshSpaceInfo:", sGetXshSpaceInfo);
			console.log("S2C_get_xshspaceinfo sGetXshSpaceInfo.giftnum", sGetXshSpaceInfo.giftnum);
			console.log("S2C_get_xshspaceinfo sGetXshSpaceInfo.popularity", sGetXshSpaceInfo.popularity);
			console.log("S2C_get_xshspaceinfo sGetXshSpaceInfo.revnum", sGetXshSpaceInfo.revnum);
		}
	}
	//SGetRecruitAward
	export class S2C_get_recruitAward {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public result: number;
		public awardtype: number;
		public recruitrole: number;
		public recruitserver: string;

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_get_recruitAward, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sGetXshSpaceInfo = Network._instance.protoTypePool.SGetRecruitAward.decode(data);
			self.result = sGetXshSpaceInfo.result;
			self.awardtype = sGetXshSpaceInfo.awardtype;
			self.recruitrole = sGetXshSpaceInfo.recruitrole;
			self.recruitserver = sGetXshSpaceInfo.recruitserver;
			console.log("S2C_get_recruitAward sGetXshSpaceInfo:", sGetXshSpaceInfo);
			console.log("S2C_get_recruitAward sGetXshSpaceInfo.result", sGetXshSpaceInfo.result);
			console.log("S2C_get_recruitAward sGetXshSpaceInfo.awardtype", sGetXshSpaceInfo.awardtype);
			console.log("S2C_get_recruitAward sGetXshSpaceInfo.recruitrole", sGetXshSpaceInfo.recruitrole);
			console.log("S2C_get_recruitAward sGetXshSpaceInfo.recruitserver", sGetXshSpaceInfo.recruitserver);
		}
	}
	//SReqRecruitWheel
	export class S2C_req_recruitwheel {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public result: number;

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_req_recruitwheel, data: ByteArray): void {
			self.result = data.readInt32();
			console.log("S2C_req_recruitwheel+++++++++++++++++++++++", self.result);
		}
	}
	//SBeginRecruitWheel
	export class S2C_begin_recruitwheel {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public result: number;

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_begin_recruitwheel, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sBeginRecruitWheel = Network._instance.protoTypePool.SBeginRecruitWheel.decode(data);
			self.result = sBeginRecruitWheel.result;
			console.log("S2C_begin_recruitwheel sBeginRecruitWheel:", sBeginRecruitWheel);
			console.log("S2C_begin_recruitwheel sBeginRecruitWheel.result", sBeginRecruitWheel.result);
		}
	}
	//SSignList
	export class S2C_signlist {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public signContentMap: any;//map

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_signlist, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sSignList = Network._instance.protoTypePool.SSignList.decode(data);
			self.signContentMap = sSignList.signContentMap;
			console.log("S2C_signlist sSignList:", sSignList);
			console.log("S2C_signlist sSignList.signContentMap", sSignList.signContentMap);
		}
	}
	//SRequestMarry
	export class S2C_request_marry {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public result: number;//
		public torolename: string;//

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_request_marry, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sRequestMarry = Network._instance.protoTypePool.SRequestMarry.decode(data);
			self.result = sRequestMarry.result;
			self.torolename = sRequestMarry.torolename;
			console.log("S2C_request_marry sRequestMarry:", sRequestMarry);
			console.log("S2C_request_marry sRequestMarry.result", sRequestMarry.result);
			console.log("S2C_request_marry sRequestMarry.torolename", sRequestMarry.torolename);
		}
	}
	//SRespondMarry
	export class S2C_respond_marry {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public result: number;//

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_respond_marry, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sRespondMarry = Network._instance.protoTypePool.SRespondMarry.decode(data);
			self.result = sRespondMarry.result;
			console.log("S2C_respond_marry sRespondMarry:", sRespondMarry);
			console.log("S2C_respond_marry sRespondMarry.result", sRespondMarry.result);
		}
	}
	//SGetMarriageInfo
	export class S2C_get_marriageinfo {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public toroleid: number;//
		public torolename: string;//
		public marrytime: number;//
		public iswedding: number;//
		public forcibledivorcerole: number;//
		public forcibledivorcetime: number;//

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_get_marriageinfo, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sGetMarriageInfo = Network._instance.protoTypePool.SGetMarriageInfo.decode(data);
			self.toroleid = sGetMarriageInfo.toroleid;
			self.torolename = sGetMarriageInfo.torolename;
			self.marrytime = sGetMarriageInfo.marrytime;
			self.iswedding = sGetMarriageInfo.iswedding;
			self.forcibledivorcerole = sGetMarriageInfo.forcibledivorcerole;
			self.forcibledivorcetime = sGetMarriageInfo.forcibledivorcetime;
			console.log("S2C_get_marriageinfo sGetMarriageInfo:", sGetMarriageInfo);
			console.log("S2C_get_marriageinfo sGetMarriageInfo.toroleid", sGetMarriageInfo.toroleid);
			console.log("S2C_get_marriageinfo sGetMarriageInfo.torolename", sGetMarriageInfo.torolename);
			console.log("S2C_get_marriageinfo sGetMarriageInfo.marrytime", sGetMarriageInfo.marrytime);
			console.log("S2C_get_marriageinfo sGetMarriageInfo.iswedding", sGetMarriageInfo.iswedding);
			console.log("S2C_get_marriageinfo sGetMarriageInfo.forcibledivorcerole", sGetMarriageInfo.forcibledivorcerole);
			console.log("S2C_get_marriageinfo sGetMarriageInfo.forcibledivorcetime", sGetMarriageInfo.forcibledivorcetime);
		}
	}
	//SRequestWedding
	export class S2C_request_wedding {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public result: number;//
		public weddingtype: number;//
		public weddingtime: number;//
		public roleshape: number;//
		public rolecolor1: number;//
		public rolecolor2: number;//
		public toroleshape: number;//
		public torolecolor1: number;//
		public torolecolor2: number;//

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_request_wedding, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sRequestWedding = Network._instance.protoTypePool.SRequestWedding.decode(data);
			self.result = sRequestWedding.result;
			self.weddingtype = sRequestWedding.weddingtype;
			self.weddingtime = sRequestWedding.weddingtime;
			self.roleshape = sRequestWedding.roleshape;
			self.rolecolor1 = sRequestWedding.rolecolor1;
			self.rolecolor2 = sRequestWedding.rolecolor2;
			self.toroleshape = sRequestWedding.toroleshape;
			self.torolecolor1 = sRequestWedding.torolecolor1;
			self.torolecolor2 = sRequestWedding.torolecolor2;
			console.log("S2C_request_wedding sRequestWedding:", sRequestWedding);
			console.log("S2C_request_wedding sRequestWedding.result", sRequestWedding.result);
			console.log("S2C_request_wedding sRequestWedding.weddingtype", sRequestWedding.weddingtype);
			console.log("S2C_request_wedding sRequestWedding.weddingtime", sRequestWedding.weddingtime);
			console.log("S2C_request_wedding sRequestWedding.roleshape", sRequestWedding.roleshape);
			console.log("S2C_request_wedding sRequestWedding.rolecolor1", sRequestWedding.rolecolor1);
			console.log("S2C_request_wedding sRequestWedding.rolecolor2", sRequestWedding.rolecolor2);
			console.log("S2C_request_wedding sRequestWedding.toroleshape", sRequestWedding.toroleshape);
			console.log("S2C_request_wedding sRequestWedding.torolecolor1", sRequestWedding.torolecolor1);
			console.log("S2C_request_wedding sRequestWedding.torolecolor2", sRequestWedding.torolecolor2);
		}
	}
	//SInviteFriend
	export class S2C_SInviteFriend {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public weddingid: number;//
		public roleid: number;//
		public rolename: string;//
		public toroleid: number;//
		public torolename: string;//
		public marrytime: number;//
		public weddingtype: number;//
		public weddingtime: number;//
		public roleshape: number;//
		public rolecolor1: number;//
		public rolecolor2: number;//
		public toroleshape: number;//
		public torolecolor1: number;//
		public torolecolor2: number;//

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SInviteFriend, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sInviteFriend = Network._instance.protoTypePool.SInviteFriend.decode(data);
			self.weddingid = sInviteFriend.weddingid;
			self.roleid = sInviteFriend.roleid;
			self.rolename = sInviteFriend.rolename;
			self.toroleid = sInviteFriend.toroleid;
			self.torolename = sInviteFriend.torolename;
			self.marrytime = sInviteFriend.marrytime;
			self.weddingtype = sInviteFriend.result;
			self.weddingtime = sInviteFriend.weddingtime;
			self.roleshape = sInviteFriend.roleshape;
			self.rolecolor1 = sInviteFriend.rolecolor1;
			self.rolecolor2 = sInviteFriend.rolecolor2;
			self.toroleshape = sInviteFriend.toroleshape;
			self.torolecolor1 = sInviteFriend.torolecolor1;
			self.torolecolor2 = sInviteFriend.torolecolor2;
			console.log("S2C_SInviteFriend sInviteFriend:", sInviteFriend);
			console.log("S2C_SInviteFriend sInviteFriend.weddingid", sInviteFriend.weddingid);
			console.log("S2C_SInviteFriend sInviteFriend.roleid", sInviteFriend.roleid);
			console.log("S2C_SInviteFriend sInviteFriend.rolename", sInviteFriend.rolename);
			console.log("S2C_SInviteFriend sInviteFriend.toroleid", sInviteFriend.toroleid);
			console.log("S2C_SInviteFriend sInviteFriend.torolename", sInviteFriend.torolename);
			console.log("S2C_SInviteFriend sInviteFriend.marrytime", sInviteFriend.marrytime);
			console.log("S2C_SInviteFriend sInviteFriend.weddingtype", sInviteFriend.weddingtype);
			console.log("S2C_SInviteFriend sInviteFriend.weddingtime", sInviteFriend.weddingtime);
			console.log("S2C_SInviteFriend sInviteFriend.roleshape", sInviteFriend.roleshape);
			console.log("S2C_SInviteFriend sInviteFriend.rolecolor1", sInviteFriend.rolecolor1);
			console.log("S2C_SInviteFriend sInviteFriend.rolecolor2", sInviteFriend.rolecolor2);
			console.log("S2C_SInviteFriend sInviteFriend.toroleshape", sInviteFriend.toroleshape);
			console.log("S2C_SInviteFriend sInviteFriend.torolecolor1", sInviteFriend.torolecolor1);
			console.log("S2C_SInviteFriend sInviteFriend.torolecolor2", sInviteFriend.torolecolor2);
		}
	}
	//SWeddingBegin
	export class S2C_SWeddingBegin {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public realweddingtime: number;//

		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SWeddingBegin, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sWeddingBegin = Network._instance.protoTypePool.SWeddingBegin.decode(data);
			self.realweddingtime = sWeddingBegin.realweddingtime;
			console.log("S2C_SWeddingBegin sWeddingBegin:", sWeddingBegin);
			console.log("S2C_SWeddingBegin sWeddingBegin.realweddingtime", sWeddingBegin.realweddingtime);
		}
	}
	//SRespondWeddingInvite
	export class S2C_SRespondWeddingInvite {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public result: number;//
		public weddingid: number;//
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SRespondWeddingInvite, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sRespondWeddingInvite = Network._instance.protoTypePool.SRespondWeddingInvite.decode(data);
			self.result = sRespondWeddingInvite.result;
			self.weddingid = sRespondWeddingInvite.weddingid;
			console.log("S2C_SRespondWeddingInvite sRespondWeddingInvite:", sRespondWeddingInvite);
			console.log("S2C_SRespondWeddingInvite sRespondWeddingInvite.result", sRespondWeddingInvite.result);
			console.log("S2C_SRespondWeddingInvite sRespondWeddingInvite.weddingid", sRespondWeddingInvite.weddingid);
		}
	}
	//SGiveAsPresent
	export class S2C_SGiveAsPresent {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public target: number;//
		public result: number;//
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SGiveAsPresent, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sGiveAsPresent = Network._instance.protoTypePool.SGiveAsPresent.decode(data);
			self.target = sGiveAsPresent.target;
			self.result = sGiveAsPresent.result;
			console.log("S2C_SGiveAsPresent sGiveAsPresent:", sGiveAsPresent);
			console.log("S2C_SGiveAsPresent sGiveAsPresent.target", sGiveAsPresent.target);
			console.log("S2C_SGiveAsPresent sGiveAsPresent.result", sGiveAsPresent.result);
		}
	}
	//SBeginWeddingRoll
	export class S2C_SBeginWeddingRoll {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public rolltype: number;//
		public roleid: number;//
		public rolename: string;//
		public rollid: number;//
		/**
		从输入二进制流中读取结构体
		*/

		public static read(self: S2C_SBeginWeddingRoll, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sBeginWeddingRoll = Network._instance.protoTypePool.SBeginWeddingRoll.decode(data);
			self.rolltype = sBeginWeddingRoll.rolltype;
			self.roleid = sBeginWeddingRoll.roleid;
			self.rolename = sBeginWeddingRoll.rolename;
			self.rollid = sBeginWeddingRoll.rollid;
			console.log("SBeginWeddingRoll sBeginWeddingRoll:", sBeginWeddingRoll);
			console.log("SBeginWeddingRoll sBeginWeddingRoll.rolltype", sBeginWeddingRoll.rolltype);
			console.log("SBeginWeddingRoll sBeginWeddingRoll.roleid", sBeginWeddingRoll.roleid);
			console.log("SBeginWeddingRoll sBeginWeddingRoll.rolename", sBeginWeddingRoll.rolename);
			console.log("SBeginWeddingRoll sBeginWeddingRoll.rollid", sBeginWeddingRoll.rollid);
		}
	}
	//SWeddingEnd
	export class S2C_SWeddingEnd {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public weddingid: number;//
		/**
		从输入二进制流中读取结构体
		*/

		public static read(self: S2C_SWeddingEnd, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sWeddingEnd = Network._instance.protoTypePool.SWeddingEnd.decode(data);
			self.weddingid = sWeddingEnd.weddingid;
			console.log("SBeginWeddingRoll sBeginWeddingRoll:", sWeddingEnd);
			console.log("SBeginWeddingRoll sBeginWeddingRoll.weddingid", sWeddingEnd.weddingid);
		}
	}
	//SRequestForcibleDivorce
	export class S2C_SRequestForcibleDivorce {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public result: number;//
		/**
		从输入二进制流中读取结构体
		*/

		public static read(self: S2C_SRequestForcibleDivorce, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sRequestForcibleDivorce = Network._instance.protoTypePool.SRequestForcibleDivorce.decode(data);
			self.result = sRequestForcibleDivorce.result;
			console.log("SRequestForcibleDivorce sBeginWeddingRoll:", sRequestForcibleDivorce);
			console.log("SRequestForcibleDivorce sBeginWeddingRoll.result", sRequestForcibleDivorce.result);
		}
	}
	//SRefuseForcibleDivorce
	export class S2C_SRefuseForcibleDivorce {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public result: number;//
		/**
		从输入二进制流中读取结构体
		*/

		public static read(self: S2C_SRefuseForcibleDivorce, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sRequestForcibleDivorce = Network._instance.protoTypePool.SRefuseForcibleDivorce.decode(data);
			self.result = sRequestForcibleDivorce.result;
			console.log("SRefuseForcibleDivorce sBeginWeddingRoll:", sRequestForcibleDivorce);
			console.log("SRefuseForcibleDivorce sBeginWeddingRoll.result", sRequestForcibleDivorce.result);
		}
	}
	//SCancelForcibleDivorce
	export class S2C_SCancelForcibleDivorce {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public result: number;//
		/**
		从输入二进制流中读取结构体
		*/

		public static read(self: S2C_SCancelForcibleDivorce, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sCancelForcibleDivorce = Network._instance.protoTypePool.SCancelForcibleDivorce.decode(data);
			self.result = sCancelForcibleDivorce.result;
			console.log("SCancelForcibleDivorce sBeginWeddingRoll:", sCancelForcibleDivorce);
			console.log("SCancelForcibleDivorce sBeginWeddingRoll.result", sCancelForcibleDivorce.result);
		}
	}
	//SConfirmForcibleDivorce
	export class S2C_SConfirmForcibleDivorce {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public result: number;//
		public torolename: string;//
		/**
		从输入二进制流中读取结构体
		*/

		public static read(self: S2C_SConfirmForcibleDivorce, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sConfirmForcibleDivorce = Network._instance.protoTypePool.SConfirmForcibleDivorce.decode(data);
			self.result = sConfirmForcibleDivorce.result;
			self.torolename = sConfirmForcibleDivorce.torolename;
			console.log("SConfirmForcibleDivorce sBeginWeddingRoll:", sConfirmForcibleDivorce);
			console.log("SConfirmForcibleDivorce sBeginWeddingRoll.result", sConfirmForcibleDivorce.result);
			console.log("SConfirmForcibleDivorce sBeginWeddingRoll.torolename", sConfirmForcibleDivorce.torolename);
		}
	}
	//SRequestPeacefulDivorce
	export class S2C_SRequestPeacefulDivorce {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public result: number;//
		public torolename: string;//
		/**
		从输入二进制流中读取结构体
		*/

		public static read(self: S2C_SRequestPeacefulDivorce, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sRequestPeacefulDivorce = Network._instance.protoTypePool.SRequestPeacefulDivorce.decode(data);
			self.result = sRequestPeacefulDivorce.result;
			self.torolename = sRequestPeacefulDivorce.torolename;
			console.log("SRequestPeacefulDivorce sBeginWeddingRoll:", sRequestPeacefulDivorce);
			console.log("SRequestPeacefulDivorce sBeginWeddingRoll.result", sRequestPeacefulDivorce.result);
			console.log("SRequestPeacefulDivorce sBeginWeddingRoll.torolename", sRequestPeacefulDivorce.torolename);
		}
	}
	//SRespondPeacefulDivorce
	export class S2C_SRespondPeacefulDivorce {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public result: number;//
		/**
		从输入二进制流中读取结构体
		*/

		public static read(self: S2C_SRespondPeacefulDivorce, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sRespondPeacefulDivorce = Network._instance.protoTypePool.SRespondPeacefulDivorce.decode(data);
			self.result = sRespondPeacefulDivorce.result;
			console.log("SRespondPeacefulDivorce sBeginWeddingRoll:", sRespondPeacefulDivorce);
			console.log("SRespondPeacefulDivorce sBeginWeddingRoll.result", sRespondPeacefulDivorce.result);
		}
	}
	//SGetMarriageSkillInfo
	export class S2C_SGetMarriageSkillInfo {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public marriageskills: any;//
		/**
		从输入二进制流中读取结构体
		*/

		public static read(self: S2C_SGetMarriageSkillInfo, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sGetMarriageSkillInfo = Network._instance.protoTypePool.SGetMarriageSkillInfo.decode(data);
			self.marriageskills = sGetMarriageSkillInfo.marriageskills;
			console.log("SGetMarriageSkillInfo sGetMarriageSkillInfo:", sGetMarriageSkillInfo);
			console.log("SGetMarriageSkillInfo sGetMarriageSkillInfo.marriageskills", sGetMarriageSkillInfo.marriageskills);
		}
	}
	//SStudyMarriageSkill
	export class S2C_SStudyMarriageSkill {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public result: number;//
		/**
		从输入二进制流中读取结构体
		*/

		public static read(self: S2C_SStudyMarriageSkill, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sStudyMarriageSkill = Network._instance.protoTypePool.SStudyMarriageSkill.decode(data);
			self.result = sStudyMarriageSkill.result;
			console.log("SStudyMarriageSkill sStudyMarriageSkill:", sStudyMarriageSkill);
			console.log("SStudyMarriageSkill sStudyMarriageSkill.result", sStudyMarriageSkill.result);
		}
	}
	//SRefreshMarriageMission
	export class S2C_SRefreshMarriageMission {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public id: number;//
		public kind: number;//
		public isdual: number;//
		public state: number;//
		public dstitemid: number;//
		public dstitemnum: number;//
		public dstnpckey: number;//
		public dstnpcid: number;//
		public dstmapid: number;//
		public dstx: number;//
		public dsty: number;//
		public extparam: number;//
		public accepttime: number;//
		public count: number;//
		/**
		从输入二进制流中读取结构体
		*/

		public static read(self: S2C_SRefreshMarriageMission, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sRefreshMarriageMission = Network._instance.protoTypePool.SRefreshMarriageMission.decode(data);
			self.id = sRefreshMarriageMission.id;
			self.kind = sRefreshMarriageMission.kind;
			self.isdual = sRefreshMarriageMission.isdual;
			self.state = sRefreshMarriageMission.state;
			self.dstitemid = sRefreshMarriageMission.dstitemid;
			self.dstitemnum = sRefreshMarriageMission.dstitemnum;
			self.dstnpckey = sRefreshMarriageMission.dstnpckey;
			self.dstnpcid = sRefreshMarriageMission.dstnpcid;
			self.dstmapid = sRefreshMarriageMission.dstmapid;
			self.dstx = sRefreshMarriageMission.dstx;
			self.dsty = sRefreshMarriageMission.dsty;
			self.extparam = sRefreshMarriageMission.extparam;
			self.accepttime = sRefreshMarriageMission.accepttime;
			self.count = sRefreshMarriageMission.count;
			console.log("SRefreshMarriageMission sRefreshMarriageMission:", sRefreshMarriageMission);
			console.log("SRefreshMarriageMission sRefreshMarriageMission.id", sRefreshMarriageMission.id);
			console.log("SRefreshMarriageMission sRefreshMarriageMission.kind", sRefreshMarriageMission.kind);
			console.log("SRefreshMarriageMission sRefreshMarriageMission.isdual", sRefreshMarriageMission.isdual);
			console.log("SRefreshMarriageMission sRefreshMarriageMission.state", sRefreshMarriageMission.state);
			console.log("SRefreshMarriageMission sRefreshMarriageMission.dstitemid", sRefreshMarriageMission.dstitemid);
			console.log("SRefreshMarriageMission sRefreshMarriageMission.dstitemnum", sRefreshMarriageMission.dstitemnum);
			console.log("SRefreshMarriageMission sRefreshMarriageMission.dstnpckey", sRefreshMarriageMission.dstnpckey);
			console.log("SRefreshMarriageMission sRefreshMarriageMission.dstnpcid", sRefreshMarriageMission.dstnpcid);
			console.log("SRefreshMarriageMission sRefreshMarriageMission.dstmapid", sRefreshMarriageMission.dstmapid);
			console.log("SRefreshMarriageMission sRefreshMarriageMission.dstx", sRefreshMarriageMission.dstx);
			console.log("SRefreshMarriageMission sRefreshMarriageMission.dsty", sRefreshMarriageMission.dsty);
			console.log("SRefreshMarriageMission sRefreshMarriageMission.extparam", sRefreshMarriageMission.extparam);
			console.log("SRefreshMarriageMission sRefreshMarriageMission.accepttime", sRefreshMarriageMission.accepttime);
			console.log("SRefreshMarriageMission sRefreshMarriageMission.count", sRefreshMarriageMission.count);
		}
	}
	export class S2C_SReqFushiNum {
		public num: number;
		public bindNum: number;
		public totalnum: number;
		public static read(self: S2C_SReqFushiNum, data: ByteArray): void {
			self.num = data.readInt32();
			self.bindNum = data.readInt32();
			self.totalnum = data.readInt32();
		}
	}
	export class S2C_SReqCharge {
		public goods: Array<any>;
		public opendy: number;
		public static read(self: S2C_SReqCharge, data: ByteArray): void {
			self.goods = [];
			let goodsSize: number = data.readUint8();
			let goodInfo: game.modules.shop.models.GoodInfoVo;
			for (var index = 0; index < goodsSize; index++) {
				goodInfo = new game.modules.shop.models.GoodInfoVo();
				goodInfo.fromByteArray(data);
				self.goods.push(goodInfo);
			}

			self.opendy = data.readInt32();
		}
	}
	//SConfirmCharge
	export class S2C_SConfirmCharge {

		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public billid: number;//
		public goodid: number;//
		public goodnum: number;//
		public goodname: string;//
		public price: number;//
		public serverid: number;//
		public extra: string;//
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SConfirmCharge, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sConfirmCharge = Network._instance.protoTypePool.SConfirmCharge.decode(data);
			self.billid = sConfirmCharge.billid;
			self.goodid = sConfirmCharge.goodid;
			self.goodnum = sConfirmCharge.goodnum;
			self.goodname = sConfirmCharge.goodname;
			self.price = sConfirmCharge.price;
			self.serverid = sConfirmCharge.serverid;
			self.extra = sConfirmCharge.extra;
			console.log("SConfirmCharge sConfirmCharge:", sConfirmCharge);
			console.log("SConfirmCharge sConfirmCharge.billid", sConfirmCharge.billid);
			console.log("SConfirmCharge sConfirmCharge.goodid", sConfirmCharge.goodid);
			console.log("SConfirmCharge sConfirmCharge.goodnum", sConfirmCharge.goodnum);
			console.log("SConfirmCharge sConfirmCharge.goodname", sConfirmCharge.goodname);
			console.log("SConfirmCharge sConfirmCharge.price", sConfirmCharge.price);
			console.log("SConfirmCharge sConfirmCharge.serverid", sConfirmCharge.serverid);
			console.log("SConfirmCharge sConfirmCharge.extra", sConfirmCharge.extra);
		}
	}
	//SRefreshChargeState
	export class S2C_SRefreshChargeState {
		public state: number;
		public flag: number;
		public static read(self: S2C_SRefreshChargeState, data: ByteArray): void {
			self.state = data.readInt32();
			self.flag = data.readInt32();
		}
	}
	//SRspServerId
	export class S2C_SRspServerId {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public serverid: number;//
		public flag: number;//
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SRspServerId, data: ByteArray): void {
			self.serverid = data.readInt32();
			self.flag = data.readInt32();
			console.log("S2C_SRspServerId++++++++++++++++++++++++++++++", self.serverid);
		}
	}
	//SRequestChargeReturnProfit
	export class S2C_SRequestChargeReturnProfit {
		public listchargereturnprofit: Array<game.modules.shop.models.ChargeReturnProfitVo>;
		public static read(self: S2C_SRequestChargeReturnProfit, data: ByteArray): void {
			self.listchargereturnprofit = [];
			let listchargereturnprofitSize: number = data.readUint8();
			let chargeReturnProfit: game.modules.shop.models.ChargeReturnProfitVo;
			for (var index = 0; index < listchargereturnprofitSize; index++) {
				chargeReturnProfit = new game.modules.shop.models.ChargeReturnProfitVo();
				chargeReturnProfit.fromByteArray(data);
				self.listchargereturnprofit.push(chargeReturnProfit);
			}
		}
	}
	//SGrabChargeReturnProfitReward
	export class S2C_SGrabChargeReturnProfitReward {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public id: number;//
		public state: number;//
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SGrabChargeReturnProfitReward, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sGrabChargeReturnProfitReward = Network._instance.protoTypePool.SGrabChargeReturnProfitReward.decode(data);
			self.id = sGrabChargeReturnProfitReward.id;
			self.state = sGrabChargeReturnProfitReward.state;
			console.log("SGrabChargeReturnProfitReward sGrabChargeReturnProfitReward:", sGrabChargeReturnProfitReward);
			console.log("SGrabChargeReturnProfitReward sGrabChargeReturnProfitReward.id", sGrabChargeReturnProfitReward.id);
			console.log("SGrabChargeReturnProfitReward sGrabChargeReturnProfitReward.state", sGrabChargeReturnProfitReward.state);
		}
	}
	//SReqChargeRefundsInfo
	export class S2C_SReqChargeRefundsInfo {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public result: number;//
		public chargevalue: number;//
		public charge: number;//
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SReqChargeRefundsInfo, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sReqChargeRefundsInfo = Network._instance.protoTypePool.SReqChargeRefundsInfo.decode(data);
			self.result = sReqChargeRefundsInfo.result;
			self.chargevalue = sReqChargeRefundsInfo.chargevalue;
			self.charge = sReqChargeRefundsInfo.charge;
			console.log("SReqChargeRefundsInfo sReqChargeRefundsInfo:", sReqChargeRefundsInfo);
			console.log("SReqChargeRefundsInfo sReqChargeRefundsInfo.result", sReqChargeRefundsInfo.result);
			console.log("SReqChargeRefundsInfo sReqChargeRefundsInfo.chargevalue", sReqChargeRefundsInfo.chargevalue);
			console.log("SReqChargeRefundsInfo sReqChargeRefundsInfo.charge", sReqChargeRefundsInfo.charge);
		}
	}
	//SGetChargeRefunds
	export class S2C_SGetChargeRefunds {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public result: number;//
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SGetChargeRefunds, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sGetChargeRefunds = Network._instance.protoTypePool.SGetChargeRefunds.decode(data);
			self.result = sGetChargeRefunds.result;
			console.log("SGetChargeRefunds sGetChargeRefunds:", sGetChargeRefunds);
			console.log("SGetChargeRefunds sGetChargeRefunds.result", sGetChargeRefunds.result);
		}
	}
	//SSendVipInfo   
	export class S2C_SSendVipInfo {
		public vipexp: number;
		public viplevel: number;
		public bounus: number;
		public gotbounus: number;
		public viprights: Array<number>;
		public static read(self: S2C_SSendVipInfo, data: ByteArray): void {
			self.vipexp = data.readInt32();
			self.viplevel = data.readInt32();
			self.bounus = data.readInt32();
			self.gotbounus = data.readInt32();

			self.viprights = [];
			let viprightsSize: number = data.readUint8();
			for (var index = 0; index < viprightsSize; index++) {
				self.viprights.push(data.readInt32());
			}
		}
	}
	//SReqFushiInfo
	export class S2C_SReqFushiInfo {

		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public balance: number;//
		public genbalance: number;//
		public firstsave: number;//
		public saveamt: number;//
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SReqFushiInfo, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sReqFushiInfo = Network._instance.protoTypePool.SReqFushiInfo.decode(data);
			self.balance = sReqFushiInfo.balance;
			self.genbalance = sReqFushiInfo.genbalance;
			self.firstsave = sReqFushiInfo.firstsave;
			self.saveamt = sReqFushiInfo.saveamt;
			console.log("SReqFushiInfo sReqFushiInfo:", sReqFushiInfo);
			console.log("SReqFushiInfo sReqFushiInfo.balance", sReqFushiInfo.balance);
			console.log("SReqFushiInfo sReqFushiInfo.genbalance", sReqFushiInfo.genbalance);
			console.log("SReqFushiInfo sReqFushiInfo.firstsave", sReqFushiInfo.firstsave);
			console.log("SReqFushiInfo sReqFushiInfo.saveamt", sReqFushiInfo.saveamt);
		}
	}
	//SSendRedPackView   查看玩家红包记录
	export class S2C_SSendRedPackView {
		public modeltype: number;//
		public firstpageflag: number;//
		public redpackinfolist: Array<any>;//
		public daysrnum: any;//
		public static read(self: S2C_SSendRedPackView, data: ByteArray): void {
			self.modeltype = data.readInt32();
			self.firstpageflag = data.readInt32();
			self.redpackinfolist = new Array<any>();
			let mapSize = ByteArrayUtils.uncompact_uint32(data);
			let info_list: RedPackInfoVo;
			console.log("--------------------开始读红包列表数据！----------------------------------------");
			for (var index = 0; index < mapSize; index++) {
				info_list = new RedPackInfoVo();
				info_list.fromByteArray(data);
				self.redpackinfolist.push(info_list);
			}
			self.daysrnum = new SRRedPackNumVo();
			self.daysrnum.fromByteArray(data);
		}
	}
	//SSendRedPack  发送红包成功返回
	export class S2C_SSendRedPack {

		public static read(self: S2C_SSendRedPack, data: ByteArray): void {
			console.log("--------------------发送红包成功！-------------------------");
		}
	}
	//SGetRedPack 领取红包
	export class S2C_SGetRedPack {
		public modeltype: number;//
		public redpackid: string;//
		public state: number;//
		public successflag: number;//
		public fushinum: number;//
		public static read(self: S2C_SGetRedPack, data: ByteArray): void {
			self.modeltype = data.readInt32();
			data.readInt8();
			self.redpackid = ByteArrayUtils.readUtf16String(data);
			self.state = data.readInt();
			self.successflag = data.readInt();
			self.fushinum = data.readInt();
		}
	}
	//SSendRedPackHisView  查看红包被领取的情况
	export class S2C_SSendRedPackHisView {
		public modeltype: number;//
		public redpackid: string;//
		public redpackdes: string;//
		public redpackallnum: number;//
		public redpackallmoney: number;//
		public time: number;//
		public redpackrolehisinfolist: Array<any>;//
		public static read(self: S2C_SSendRedPackHisView, data: ByteArray): void {
			self.modeltype = data.readInt32();
			data.readUint8();
			self.redpackid = ByteArrayUtils.readUtf16String(data);
			self.redpackdes = ByteArrayUtils.readUtf16String(data);
			self.redpackallnum = data.readInt32();
			self.redpackallmoney = data.readInt32();
			self.time = data.readLong();
			self.redpackrolehisinfolist = new Array<any>();
			let mapSize = ByteArrayUtils.uncompact_uint32(data);
			let info_list: RedPackRoleHisInfoVo;
			console.log("--------------------开始读红包被领取情况的数据！----------------------------------------");
			for (var index = 0; index < mapSize; index++) {
				info_list = new RedPackRoleHisInfoVo();
				info_list.fromByteArray(data);
				self.redpackrolehisinfolist.push(info_list);
			}
		}
	}
	//SSendRedPackRoleRecordView  查看个人红包记录
	export class S2C_SSendRedPackRoleRecordView {
		public modeltype: number;//
		public firstpageflag: number;//
		public redpackallnum: number;//
		public redpackallmoney: number;//
		public redpackallfushi: number;//
		public redpackrolerecord: Array<RedPackRoleRecordVo>;//
		public static read(self: S2C_SSendRedPackRoleRecordView, data: ByteArray): void {
			self.modeltype = data.readInt32();
			self.firstpageflag = data.readInt32();
			self.redpackallnum = data.readInt32();
			self.redpackallmoney = data.readLong();
			self.redpackallfushi = data.readLong();
			self.redpackrolerecord = new Array<any>();
			let mapSize = ByteArrayUtils.uncompact_uint32(data);
			let record: RedPackRoleRecordVo;
			for (var index = 0; index < mapSize; index++) {
				record = new RedPackRoleRecordVo();
				record.fromByteArray(data);
				self.redpackrolerecord.push(record);
			}
		}
	}
	//SNoticeRedPack  系统推送红包信息
	export class S2C_SNoticeRedPack {
		public redpackroletip: any;
		public static read(self: S2C_SNoticeRedPack, data: ByteArray): void {
			let tipVo: RedPackRoleTipVo;
			tipVo = new RedPackRoleTipVo();
			tipVo.fromByteArray(data);
			self.redpackroletip = tipVo;
		}
	}
	//SNoticeRedPackList  玩家上线，系统推送红包信息
	export class S2C_SNoticeRedPackList {
		public redpackroletiplist: Array<any>;//
		public static read(self: S2C_SNoticeRedPackList, data: ByteArray): void {
			self.redpackroletiplist = [];
			let mapSize = ByteArrayUtils.uncompact_uint32(data);
			let tipVo: RedPackRoleTipVo;
			for (var index = 0; index < mapSize; index++) {
				tipVo = new RedPackRoleTipVo();
				tipVo.fromByteArray(data);
				self.redpackroletiplist.push(tipVo);
			}
		}
	}
	//SPayServerType
	export class S2C_SPayServerType {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public paytype: number;//
		public opendy: number;//
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SPayServerType, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sPayServerType = Network._instance.protoTypePool.SPayServerType.decode(data);
			self.paytype = sPayServerType.paytype;
			self.opendy = sPayServerType.opendy;
			console.log("SPayServerType sPayServerType:", sPayServerType);
			console.log("SPayServerType sPayServerType.paytype", sPayServerType.paytype);
			console.log("SPayServerType sPayServerType.opendy", sPayServerType.opendy);
		}
	}
	//SHaveDayPay
	export class S2C_SHaveDayPay {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public daypay: number;//
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SHaveDayPay, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sHaveDayPay = Network._instance.protoTypePool.SHaveDayPay.decode(data);
			self.daypay = sHaveDayPay.daypay;
			console.log("SHaveDayPay sHaveDayPay:", sHaveDayPay);
			console.log("SHaveDayPay sHaveDayPay.daypay", sHaveDayPay.daypay);
		}
	}
	//SQueryConsumeDayPay
	export class S2C_SQueryConsumeDayPay {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		//public daypay: number;//
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SQueryConsumeDayPay, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sQueryConsumeDayPay = Network._instance.protoTypePool.SQueryConsumeDayPay.decode(data);
			//self.daypay = sQueryConsumeDayPay.daypay;
			console.log("SQueryConsumeDayPay sHaveDayPay:", sQueryConsumeDayPay);
			//console.log("SQueryConsumeDayPay sHaveDayPay.daypay",sQueryConsumeDayPay.daypay);
		}
	}
	//SConsumeDayPay
	export class S2C_SConsumeDayPay {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		//public daypay: number;//
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SConsumeDayPay, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sConsumeDayPay = Network._instance.protoTypePool.SConsumeDayPay.decode(data);
			//self.daypay = sConsumeDayPay.daypay;
			console.log("SConsumeDayPay sHaveDayPay:", sConsumeDayPay);
			//console.log("SQueryConsumeDayPay sHaveDayPay.daypay",sConsumeDayPay.daypay);
		}
	}
	//SQuerySubscribeInfo
	export class S2C_SQuerySubscribeInfo {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public subscribetime: number;//
		public expiretime: number;//
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SQuerySubscribeInfo, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sQuerySubscribeInfo = Network._instance.protoTypePool.SQuerySubscribeInfo.decode(data);
			self.subscribetime = sQuerySubscribeInfo.subscribetime;
			self.expiretime = sQuerySubscribeInfo.expiretime;
			console.log("SQuerySubscribeInfo sQuerySubscribeInfo:", sQuerySubscribeInfo);
			console.log("SQuerySubscribeInfo sQuerySubscribeInfo.subscribetime", sQuerySubscribeInfo.subscribetime);
			console.log("SQuerySubscribeInfo sQuerySubscribeInfo.expiretime", sQuerySubscribeInfo.expiretime);
		}
	}
	//SBuySpotCard
	export class S2C_SBuySpotCard {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		//public subscribetime: number;//
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SBuySpotCard, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sBuySpotCard = Network._instance.protoTypePool.SBuySpotCard.decode(data);
			// self.subscribetime = sBuySpotCard.subscribetime;
			// self.expiretime = sBuySpotCard.expiretime;
			console.log("SBuySpotCard sBuySpotCard:", sBuySpotCard);
			// console.log("SBuySpotCard sBuySpotCard.subscribetime",sBuySpotCard.subscribetime);
			// console.log("SBuySpotCard sBuySpotCard.expiretime",sBuySpotCard.expiretime);
		}
	}
	//SSellSpotCard
	export class S2C_SSellSpotCard {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		//public subscribetime: number;//
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SSellSpotCard, data: ByteArray): void {
			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sSellSpotCard = Network._instance.protoTypePool.SSellSpotCard.decode(data);
			// self.subscribetime = sBuySpotCard.subscribetime;
			// self.expiretime = sBuySpotCard.expiretime;
			console.log("SSellSpotCard sBuySpotCard:", sSellSpotCard);
			// console.log("SSellSpotCard sBuySpotCard.subscribetime",sBuySpotCard.subscribetime);
			// console.log("SSellSpotCard sBuySpotCard.expiretime",sBuySpotCard.expiretime);
		}
	}
	//STradingSpotCardView
	export class S2C_STradingSpotCardView {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public sellspotcardinfolist: Array<any>;//
		public buyspotcardinfolist: Array<any>;//
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_STradingSpotCardView, data: ByteArray): void {

			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sTradingSpotCardView = Network._instance.protoTypePool.STradingSpotCardView.decode(data);
			self.sellspotcardinfolist = sTradingSpotCardView.sellspotcardinfolist;
			self.buyspotcardinfolist = sTradingSpotCardView.buyspotcardinfolist;
			console.log("STradingSpotCardView sTradingSpotCardView:", sTradingSpotCardView);
			console.log("STradingSpotCardView sTradingSpotCardView.sellspotcardinfolist", sTradingSpotCardView.sellspotcardinfolist);
			console.log("STradingSpotCardView sTradingSpotCardView.buyspotcardinfolist", sTradingSpotCardView.buyspotcardinfolist);
		}
	}
	//SRoleTradingView
	export class S2C_SRoleTradingView {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public sellspotcardinfolist: Array<any>;//
		public buyspotcardinfolist: Array<any>;//
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SRoleTradingView, data: ByteArray): void {

			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sRoleTradingView = Network._instance.protoTypePool.SRoleTradingView.decode(data);
			self.sellspotcardinfolist = sRoleTradingView.sellspotcardinfolist;
			self.buyspotcardinfolist = sRoleTradingView.buyspotcardinfolist;
			console.log("SRoleTradingView sRoleTradingView:", sRoleTradingView);
			console.log("SRoleTradingView sRoleTradingView.sellspotcardinfolist", sRoleTradingView.sellspotcardinfolist);
			console.log("SRoleTradingView sRoleTradingView.buyspotcardinfolist", sRoleTradingView.buyspotcardinfolist);
		}
	}
	//SRoleTradingRecordView
	export class S2C_SRoleTradingRecordView {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public roletradingrecordlist: Array<any>;//
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SRoleTradingRecordView, data: ByteArray): void {

			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sRoleTradingRecordView = Network._instance.protoTypePool.SRoleTradingRecordView.decode(data);
			self.roletradingrecordlist = sRoleTradingRecordView.roletradingrecordlist;
			console.log("SRoleTradingRecordView sRoleTradingRecordView:", sRoleTradingRecordView);
			console.log("SRoleTradingRecordView sRoleTradingRecordView.roletradingrecordlist", sRoleTradingRecordView.roletradingrecordlist);
		}
	}
	//SCancelTrading
	export class S2C_SCancelTrading {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		//public roletradingrecordlist: Array<any>;//
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SCancelTrading, data: ByteArray): void {

			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sCancelTrading = Network._instance.protoTypePool.SCancelTrading.decode(data);
			//self.roletradingrecordlist = sCancelTrading.roletradingrecordlist;
			console.log("SCancelTrading sCancelTrading:", sCancelTrading);
			//console.log("SCancelTrading sCancelTrading.roletradingrecordlist",sCancelTrading.roletradingrecordlist);
		}
	}
	//STradingOpenState
	export class S2C_STradingOpenState {
		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public openstate: number;//
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_STradingOpenState, data: ByteArray): void {

			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sTradingOpenState = Network._instance.protoTypePool.STradingOpenState.decode(data);
			self.openstate = sTradingOpenState.openstate;
			console.log("STradingOpenState sTradingOpenState:", sTradingOpenState);
			console.log("STradingOpenState sTradingOpenState.openstate", sTradingOpenState.openstate);
		}
	}
	//SMonthCard
	export class S2C_SMonthCard {
		public endtime: number;
		public grab: number;
		public static read(self: S2C_SMonthCard, data: ByteArray): void {
			self.endtime = data.readLong();
			self.grab = data.readInt32();
		}
	}
	//SBeginSchoolWheel
	export class S2C_SBeginSchoolWheel {

		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public wheelindex: number;//
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SBeginSchoolWheel, data: ByteArray): void {

			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			// var sBeginSchoolWheel = Network._instance.protoTypePool.SBeginSchoolWheel.decode(data);
			// self.wheelindex = sBeginSchoolWheel.wheelindex;
			// console.log("SBeginSchoolWheel sBeginSchoolWheel:",sBeginSchoolWheel);
			// console.log("SBeginSchoolWheel sBeginSchoolWheel.wheelindex",sBeginSchoolWheel.wheelindex);
			self.wheelindex = data.readUint32();
			console.log("S2C_SBeginSchoolWheel+++++++++++++++++++++", self.wheelindex);
		}
	}
	//SBeginXueYueWheel
	export class S2C_SBeginXueYueWheel {

		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public wheelindex: number;//
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SBeginXueYueWheel, data: ByteArray): void {

			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sBeginXueYueWheel = Network._instance.protoTypePool.SBeginXueYueWheel.decode(data);
			self.wheelindex = sBeginXueYueWheel.wheelindex;
			console.log("SBeginXueYueWheel sBeginXueYueWheel:", sBeginXueYueWheel);
			console.log("SBeginXueYueWheel sBeginXueYueWheel.wheelindex", sBeginXueYueWheel.wheelindex);
		}
	}
	//SUseXueYueKey
	export class S2C_SUseXueYueKey {

		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public npckid: number;//
		public npckey: number;//
		public mapid: number;//
		public xpos: number;//
		public ypos: number;//
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SUseXueYueKey, data: ByteArray): void {

			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sUseXueYueKey = Network._instance.protoTypePool.SUseXueYueKey.decode(data);
			self.npckid = sUseXueYueKey.npckid;
			self.npckey = sUseXueYueKey.npckey;
			self.mapid = sUseXueYueKey.mapid;
			self.xpos = sUseXueYueKey.xpos;
			self.ypos = sUseXueYueKey.ypos;
			console.log("SUseXueYueKey sUseXueYueKey:", sUseXueYueKey);
			console.log("SUseXueYueKey sUseXueYueKey.npckid", sUseXueYueKey.npckid);
			console.log("SUseXueYueKey sUseXueYueKey.npckey", sUseXueYueKey.npckey);
			console.log("SUseXueYueKey sUseXueYueKey.mapid", sUseXueYueKey.mapid);
			console.log("SUseXueYueKey sUseXueYueKey.xpos", sUseXueYueKey.xpos);
			console.log("SUseXueYueKey sUseXueYueKey.ypos", sUseXueYueKey.ypos);
		}
	}
	//SRoleAccusation
	export class S2C_SRoleAccusation {

		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public isbereported: number;//
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SRoleAccusation, data: ByteArray): void {

			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sRoleAccusation = Network._instance.protoTypePool.SRoleAccusation.decode(data);
			self.isbereported = sRoleAccusation.isbereported;
			console.log("SRoleAccusation sRoleAccusation:", sRoleAccusation);
			console.log("SRoleAccusation sRoleAccusation.isbereported", sRoleAccusation.isbereported);
		}
	}
	//SRoleAccusationCheck
	export class S2C_SRoleAccusationCheck {
		public errorcode: number;//
		public static read(self: S2C_SRoleAccusationCheck, data: ByteArray): void {
			self.errorcode = data.readUint32();
			console.log("S2C_SRoleAccusationCheck+++++++++++++++++++++++++", self.errorcode);
		}
	}
	//SRefreshRoleHookData
	export class S2C_SRefreshRoleHookData {

		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public RoleHookData: any;//
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SRefreshRoleHookData, data: ByteArray): void {

			//self.sessionkey = bytes. readString ();	
			//self.sign = bytes. readString ();
			//self.version = bytes. readString ();		
			var sRefreshRoleHookData = Network._instance.protoTypePool.SRefreshRoleHookData.decode(data);
			self.RoleHookData = sRefreshRoleHookData.RoleHookData;
			console.log("SRefreshRoleHookData sRefreshRoleHookData:", sRefreshRoleHookData);
			console.log("SRefreshRoleHookData sRefreshRoleHookData.RoleHookData", sRefreshRoleHookData.RoleHookData);
		}
	}
	//SRefreshRoleHookBattleData
	export class S2C_SRefreshRoleHookBattleData {

		//public optcode:number = 0;
		//public optname:string = "onCreateRole";
		public RoleHookBattleData: any;//
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SRefreshRoleHookBattleData, data: ByteArray): void {
			self.RoleHookBattleData = new game.modules.guaji.models.HookBattleDataVo();
			self.RoleHookBattleData.fromByteArray(data);
		}
	}
	//SRefreshRoleHookExpData
	export class S2C_SRefreshRoleHookExpData {
		public RoleHookExpData: game.modules.activity.models.RoleHookExpVo;
		public static read(self: S2C_SRefreshRoleHookExpData, data: ByteArray): void {

			self.RoleHookExpData = new game.modules.activity.models.RoleHookExpVo();
			self.RoleHookExpData.fromByteArray(data);
		}
	}
	//SFlushRoleFightAI
	export class S2C_SFlushRoleFightAI {
		public fightaiids: Array<number>;//
		/**
		从输入二进制流中读取结构体
		*/
		public static read(self: S2C_SFlushRoleFightAI, data: ByteArray): void {
			self.fightaiids = [];
			var dataSize = ByteArrayUtils.uncompact_uint32(data);
			for (let i = 0; i < dataSize; i++) {
				self.fightaiids.push(data.readInt32());
			}
		}
	}

	//sugq服务端4
	//-------------CKL

	//--------------------CKL---------------------------------------------

	export class S2C_title_err {
		public titleerr: number;



		public static read(self: S2C_title_err, data: ByteArray): void {
			var sTitleErr = Network._instance.protoTypePool.STitleErr.decode(data);
			self.titleerr = sTitleErr.titleerr;

			console.log("S2C_title_err sTitleErr:", sTitleErr);
			console.log("S2C_title_err sTitleErr.titleerr", sTitleErr.titleerr);

		}
	}
	export class S2C_off_title {
		public roleid: number;
		public static read(self: S2C_off_title, data: ByteArray): void {
			self.roleid = ByteArrayUtils.readLong(data);;

		}
	}
	export class S2C_on_title {
		public roleid: number;
		public titleid: number;
		public titlename: any;


		public static read(self: S2C_on_title, data: ByteArray): void {
			self.roleid = ByteArrayUtils.readLong(data);
			self.titleid = data.readInt32();
			self.titlename = ByteArrayUtils.readUtf16String(data);

		}
	}
	export class S2C_remove_title {
		public titleid: number;


		public static read(self: S2C_remove_title, data: ByteArray): void {
			var sRemoveTitle = Network._instance.protoTypePool.SRemoveTitle.decode(data);
			self.titleid = sRemoveTitle.titleid;

			console.log("S2C_remove_title sRemoveTitle:", sRemoveTitle);
			console.log("S2C_remove_title sRemoveTitle.titleid", sRemoveTitle.titleid);

		}
	}
	export class S2C_add_title {
		public Titleinfo: game.modules.bag.models.RoleTitleVo;
		public static read(self: S2C_add_title, data: ByteArray): void {
			var RoleTitleVo: game.modules.bag.models.RoleTitleVo;
			RoleTitleVo = new game.modules.bag.models.RoleTitleVo();
			RoleTitleVo.fromByteArray(data);
			self.Titleinfo = RoleTitleVo;

		}
	}
	export class S2C_request_clanfightteamrolenum {
		public teamnum: number;
		public rolenum: number;


		public static read(self: S2C_request_clanfightteamrolenum, data: ByteArray): void {
			var sRequestClanFightTeamRoleNum = Network._instance.protoTypePool.SRequestClanFightTeamRoleNum.decode(data);
			self.teamnum = sRequestClanFightTeamRoleNum.teamnum;
			self.rolenum = sRequestClanFightTeamRoleNum.rolenum;

			console.log("S2C_request_clanfightteamrolenum sRequestClanFightTeamRoleNum:", sRequestClanFightTeamRoleNum);
			console.log("S2C_request_clanfightteamrolenum sRequestClanFightTeamRoleNum.teamnum", sRequestClanFightTeamRoleNum.teamnum);
			console.log("S2C_request_clanfightteamrolenum sRequestClanFightTeamRoleNum.rolenum", sRequestClanFightTeamRoleNum.rolenum);

		}
	}
	export class S2C_request_clanfightrolelist {
		public isfresh: number;
		public rolelist: Array<any>;
		public ret: number;


		public static read(self: S2C_request_clanfightrolelist, data: ByteArray): void {
			var sRequestClanFightRoleList = Network._instance.protoTypePool.SRequestClanFightRoleList.decode(data);
			self.isfresh = sRequestClanFightRoleList.isfresh;
			self.rolelist = sRequestClanFightRoleList.rolelist;
			self.ret = sRequestClanFightRoleList.ret;

			console.log("S2C_request_clanfightrolelist sRequestClanFightRoleList:", sRequestClanFightRoleList);
			console.log("S2C_request_clanfightrolelist sRequestClanFightRoleList.isfresh", sRequestClanFightRoleList.isfresh);
			console.log("S2C_request_clanfightrolelist sRequestClanFightRoleList.rolelist", sRequestClanFightRoleList.rolelist);
			console.log("S2C_request_clanfightrolelist sRequestClanFightRoleList.ret", sRequestClanFightRoleList.ret);

		}
	}

	export class S2C_request_clanfightteamlist {
		public isfresh: number;
		public teamlist: Array<any>;
		public ret: number;


		public static read(self: S2C_request_clanfightteamlist, data: ByteArray): void {
			var sRequestClanFightTeamList = Network._instance.protoTypePool.SRequestClanFightTeamList.decode(data);
			self.isfresh = sRequestClanFightTeamList.isfresh;
			self.teamlist = sRequestClanFightTeamList.teamlist;
			self.ret = sRequestClanFightTeamList.ret;

			console.log("S2C_request_clanfightteamlist sRequestClanFightTeamList:", sRequestClanFightTeamList);
			console.log("S2C_request_clanfightteamlist sRequestClanFightTeamList.isfresh", sRequestClanFightTeamList.isfresh);
			console.log("S2C_request_clanfightteamlist sRequestClanFightTeamList.teamlist", sRequestClanFightTeamList.teamlist);
			console.log("S2C_request_clanfightteamlist sRequestClanFightTeamList.ret", sRequestClanFightTeamList.ret);

		}
	}
	export class S2C_formations_map {
		public formationMap: any;


		public static read(self: S2C_formations_map, data: ByteArray): void {
			self.formationMap = new Laya.Dictionary();
			let formationMapSize: number = data.readUint8();
			let formBean: game.modules.huoban.models.FormBeanVo;
			for (var index = 0; index < formationMapSize; index++) {
				formBean = new game.modules.huoban.models.FormBeanVo();
				self.formationMap.set(data.readUint32(), formBean);
				formBean.fromByteArray(data);
			}

		}
	}
	export class S2C_set_myformation {
		public formation: number;
		public entersend: number;


		public static read(self: S2C_set_myformation, data: ByteArray): void {


			console.log("S2C_set_myformation ----------------:");

		}
	}
	export class S2C_set_teamformation {
		public SetTeamFormation: game.modules.team.models.SetTeamFormationVo;
		public static read(self: S2C_set_teamformation, data: ByteArray): void {
			self.SetTeamFormation = new game.modules.team.models.SetTeamFormationVo();
			self.SetTeamFormation.fromByteArray(data);
		}
	}
	export class S2C_one_teamrollmelonunfo {
		public melonid: number;
		public itemid: number;
		public rollinfo: any;


		public static read(self: S2C_one_teamrollmelonunfo, data: ByteArray): void {


			console.log("S2C_one_teamrollmelonunfo ---------------:");

		}
	}
	export class S2C_team_rollmeloninfo {
		public melonid: number;
		public rollinfolist: Array<game.modules.team.models.RoleRollInfoVo>;
		public grabroleid: number;
		public grabrolename: string;
		public melonitemlist: Array<game.modules.team.models.MelonItemBagInfoVo>;

		public static read(self: S2C_team_rollmeloninfo, data: ByteArray): void {
			self.melonid = data.readLong();

			self.rollinfolist = [];
			let rollinfolistSize: number = data.readUint8();
			let roleRollInfo: game.modules.team.models.RoleRollInfoVo;
			for (var index = 0; index < rollinfolistSize; index++) {
				roleRollInfo = new game.modules.team.models.RoleRollInfoVo();
				roleRollInfo.fromByteArray(data);
				self.rollinfolist.push(roleRollInfo);
			}

			self.grabroleid = data.readLong();
			self.grabrolename = data.readUTFBytes(data.readUint8());

			self.melonitemlist = [];
			let melonitemlistSize: number = data.readUint8();
			let melonItemBagInfo: game.modules.team.models.MelonItemBagInfoVo;
			for (var index = 0; index < melonitemlistSize; index++) {
				melonItemBagInfo = new game.modules.team.models.MelonItemBagInfoVo();
				melonItemBagInfo.fromByteArray(data);
				self.melonitemlist.push(melonItemBagInfo);
			}
		}
	}
	export class S2C_team_rollmelon {
		public melonlist: Array<game.modules.team.models.RollMelonVo>;
		public watcher: number;

		public static read(self: S2C_team_rollmelon, data: ByteArray): void {
			self.melonlist = [];
			let melonlistSize: number = data.readUint8();
			let rollMelon: game.modules.team.models.RollMelonVo;
			for (var index = 0; index < melonlistSize; index++) {
				rollMelon = new game.modules.team.models.RollMelonVo();
				rollMelon.fromByteArray(data);
				self.melonlist.push(rollMelon);
			}
			self.watcher = data.readInt32();
		}
	}
	export class S2C_one_keyapplyteaminfo {
		public teamid: number;
		public memberlist: Array<any>;
		public static read(self: S2C_one_keyapplyteaminfo, data: ByteArray): void {
			self.teamid = ByteArrayUtils.readLong(data);
			self.memberlist = new Array<any>();
			let size = ByteArrayUtils.uncompact_uint32(data);
			for (var index = 0; index < size; index++) {
				let teamMemberSimpleVo = new game.modules.team.models.TeamMemberSimpleVo;
				teamMemberSimpleVo.fromByteArray(data);
				self.memberlist.push(teamMemberSimpleVo);
			}
		}
	}
	export class S2C_request_haveteam {
		public ret: number;

		public static read(self: S2C_request_haveteam, data: ByteArray): void {

			console.log("S2C_request_haveteam ---------------:");


		}
	}
	export class S2C_request_matchinfo {
		public teammatchnum: number;
		public playermatchnum: number;

		public static read(self: S2C_request_matchinfo, data: ByteArray): void {

			self.teammatchnum = data.readInt32();
			self.playermatchnum = data.readInt32();

		}
	}
	export class S2C_force_invitejointteam {
		public roleid: number;


		public static read(self: S2C_force_invitejointteam, data: ByteArray): void {

			self.roleid = ByteArrayUtils.readLong(data);

		}
	}
	export class S2C_request_teammatchlist {
		public ret: number;
		public targetid: number;
		public tteamlist: Array<any> = [];
		// <variable name="ret" type="int"/> 错误返回0正确1目标错误2数量错误3其他未知错误 by changhao
		// <variable name="targetid" type="int" /> 目标ID by changhao
		// <variable name="teamlist" type="list" value="TeamInfoBasicWithMembers"/> 一个队伍简单信息 by changhao

		public static read(self: S2C_request_teammatchlist, data: ByteArray): void {
			self.ret = data.readInt32();
			self.targetid = data.readInt32();
			let teamListSize = data.readUint8();
			// let teamInfoBasicVo : game.modules.team.models.TeamInfoBasicVo; //obj
			// teamInfoBasicVo =  new game.modules.team.models.TeamInfoBasicVo();
			// let teamMemberSimple : game.modules.team.models.TeamMemberSimpleVo;//list
			// teamMemberSimple =  new game.modules.team.models.TeamMemberSimpleVo();
			let teamInfoBasicWithMembersVo: game.modules.team.models.TeamInfoBasicWithMembersVo;
			/** 最外面这一层的长度 */
			for (let teamListIndex = 0; teamListIndex < teamListSize; teamListIndex++) {
				teamInfoBasicWithMembersVo = new game.modules.team.models.TeamInfoBasicWithMembersVo();
				// let status : number;
				// teamInfoBasicVo.fromByteArray(data);
				// let teamMemberSimpleSize = data.readUint8();
				// for (var teamMemberSimpleIndex = 0; teamMemberSimpleIndex < teamMemberSimpleSize; teamMemberSimpleIndex++) 
				// {
				// 	teamMemberSimple.roleid = ByteArrayUtils.readLong(data);
				// 	teamMemberSimple.rolename = ByteArrayUtils.readUtf16String(data);
				// 	teamMemberSimple.level  = data.readInt32();
				// 	teamMemberSimple.school  = data.readInt32();
				// 	teamMemberSimple.shape  = data.readInt32();
				// }
				// status = data.readInt32();
				teamInfoBasicWithMembersVo.fromByteArray(data);
				self.tteamlist.push(teamInfoBasicWithMembersVo);
			}


		}
	}
	export class S2C_one_keyteammatch {
		public ret: number;
		public static read(self: S2C_one_keyteammatch, data: ByteArray): void {
			self.ret = data.readInt32();

		}
	}
	export class S2C_stop_teammatch {
		public static read(self: S2C_stop_teammatch, data: ByteArray): void {

		}
	}
	export class S2C_update_teammembercomponent {
		public memberid: number;
		public components: any;


		public static read(self: S2C_update_teammembercomponent, data: ByteArray): void {


			console.log("S2C_update_teammembercomponent --------------------:")

		}
	}
	export class S2C_request_teammatch {
		// public typematch: any;
		// public targetid: any;
		// public levelmin: any;
		// public levelmax: any;
		public requestTeamMatchVo: game.modules.team.models.RequestTeamMatchVo;
		public static read(self: S2C_request_teammatch, data: ByteArray): void {
			self.requestTeamMatchVo = new game.modules.team.models.RequestTeamMatchVo();
			self.requestTeamMatchVo.fromByteArray(data);
		}
	}
	export class S2C_respond_invite {
		public roleId: number;
		public agree: number;


		public static read(self: S2C_respond_invite, data: ByteArray): void {

			console.log("S2C_respond_invite ----------------:");

		}
	}
	export class S2C_update_teammemberbasic {
		public data: any;
		public static read(self: S2C_update_teammemberbasic, data: ByteArray): void {
			let TeamMemberBasicVo: game.modules.team.models.TeamMemberBasicVo;
			TeamMemberBasicVo = new game.modules.team.models.TeamMemberBasicVo();
			TeamMemberBasicVo.fromByteArray(data);
			self.data = TeamMemberBasicVo;
		}
	}
	export class S2C_set_teamstate {
		public state: number;
		public smapId: number;

		public static read(self: S2C_set_teamstate, data: ByteArray): void {


			console.log("S2C_set_teamstate ------------------------:");

		}
	}
	//SRequestSetLeaderSucc
	export class S2C_request_setleadersucc {
		/** 受邀者Id */
		public inviteeId: number;
		public static read(self: S2C_request_setleadersucc, data: ByteArray): void {
			self.inviteeId = ByteArrayUtils.readLong(data);

		}
	}
	export class S2C_invite_joinsucc {
		public roleId: number;
		public static read(self: S2C_invite_joinsucc, data: ByteArray): void {
			self.roleId = data.readLong();
		}
	}
	export class S2C_send_singlecharacterlist {
		public update_memberposition: Array<any>;


		public static read(self: S2C_send_singlecharacterlist, data: ByteArray): void {

			console.log("S2C_send_singlecharacterlist--------------------------");


		}
	}
	export class S2C_update_memberposition {
		public roleid: number;
		public position: any;
		public sceneid: number;

		public static read(self: S2C_update_memberposition, data: ByteArray): void {


			console.log("S2C_update_memberposition---------------------------0");


		}
	}
	export class S2C_reques_tjoinsucc {
		public rolename: string;
		public static read(self: S2C_reques_tjoinsucc, data: ByteArray): void {

			self.rolename = ByteArrayUtils.readUtf16String(data);

		}
	}
	//STeamError
	export class S2C_team_error {
		public teamError: number;

		public static read(self: S2C_team_error, data: ByteArray): void {
			self.teamError = data.readUint32();

		}
	}
	export class S2C_member_sequence {
		public teamMemeberIdList: Array<number> = [];

		public static read(self: S2C_member_sequence, data: ByteArray): void {
			let memeberSize = ByteArrayUtils.uncompact_uint32(data);
			for (var memeberIndex = 0; memeberIndex < memeberSize; memeberIndex++) {
				self.teamMemeberIdList.push(ByteArrayUtils.readLong(data));

			}

		}
	}
	export class S2C_dismiss_team {

		public static read(self: S2C_dismiss_team, data: ByteArray): void {

		}
	}
	export class S2C_set_teamlevel {
		public minlevel: number;
		public maxlevel: number;

		public static read(self: S2C_set_teamlevel, data: ByteArray): void {

			console.log("S2C_set_teamlevel :------------------");

		}
	}
	export class S2C_update_membermaxhpmp {
		public roleid: number;
		public maxhp: number;
		public maxmp: number;

		public static read(self: S2C_update_membermaxhpmp, data: ByteArray): void {
			self.roleid = ByteArrayUtils.readLong(data);
			self.maxhp = data.readInt32();
			self.maxmp = data.readInt32();
		}
	}
	export class S2C_update_memberhpmp {
		public roleid: number;
		public hp: number;
		public mp: number;

		public static read(self: S2C_update_memberhpmp, data: ByteArray): void {
			self.roleid = ByteArrayUtils.readLong(data);
			self.hp = data.readInt32();
			self.mp = data.readInt32();

		}
	}
	export class S2C_update_memberlevel {
		public roleid: number;
		public level: number;

		public static read(self: S2C_update_memberlevel, data: ByteArray): void {
			console.log("S2C_update_memberlevel------------------------");
			self.roleid = ByteArrayUtils.readLong(data);
			self.level = data.readInt32();

		}
	}
	export class S2C_update_memberstate {
		public roleid: number;
		public state: number;
		public static read(self: S2C_update_memberstate, data: ByteArray): void {

			self.roleid = ByteArrayUtils.readLong(data);
			self.state = data.readInt32();

		}
	}
	export class S2C_askfor_callback {
		public leaderid: number;

		public static read(self: S2C_askfor_callback, data: ByteArray): void {

			self.leaderid = ByteArrayUtils.readLong(data);

		}
	}
	export class S2C_askfor_setleader {
		public leaderid: number;

		public static read(self: S2C_askfor_setleader, data: ByteArray): void {
			self.leaderid = ByteArrayUtils.readLong(data);
		}
	}
	export class S2C_swap_member {
		public iindex1: number;
		public index2: number;

		public static read(self: S2C_swap_member, data: ByteArray): void {


			console.log("S2C_swap_member ---------------");


		}
	}
	export class S2C_invite_jointeam {
		public inviteJoinTeamVo: game.modules.team.models.InviteJoinTeamVo;

		public static read(self: S2C_invite_jointeam, data: ByteArray): void {
			self.inviteJoinTeamVo = new game.modules.team.models.InviteJoinTeamVo();
			self.inviteJoinTeamVo.fromByteArray(data);
		}
	}
	//SSetTeamLeader
	export class S2C_set_teamleader {
		public leaderId: number;

		public static read(self: S2C_set_teamleader, data: ByteArray): void {

			self.leaderId = ByteArrayUtils.readLong(data);

		}
	}
	export class S2C_absent_returnteam {
		public ret: number;

		public static read(self: S2C_absent_returnteam, data: ByteArray): void {

			console.log("S2C_absent_returnteam---------------------", );


		}
	}
	/** 服务器返回 删除申请者 */
	export class S2C_remove_teamapply {
		public applyids: Array<number> = [];
		public static read(self: S2C_remove_teamapply, data: ByteArray): void {
			let memberSize = ByteArrayUtils.uncompact_uint32(data);
			for (let memberIndex = 0; memberIndex < memberSize; memberIndex++) {
				let memberid = ByteArrayUtils.readLong(data);
				self.applyids.push(memberid);
			}




		}
	}
	export class S2C_remove_teamMember {
		public memberids: Array<any> = [];
		public static read(self: S2C_remove_teamMember, data: ByteArray): void {
			let memberSize = ByteArrayUtils.uncompact_uint32(data);
			for (var memberIndex = 0; memberIndex < memberSize; memberIndex++) {
				let memberid = ByteArrayUtils.readLong(data);
				self.memberids.push(memberid);
			}


		}
	}
	export class S2C_add_teamapply {
		public applylist: Array<any> = [];
		public applySize: number;
		public static read(self: S2C_add_teamapply, data: ByteArray): void {
			self.applySize = ByteArrayUtils.uncompact_uint32(data);
			let TeamApplyBasicVo: game.modules.team.models.TeamApplyBasicVo;
			TeamApplyBasicVo = new game.modules.team.models.TeamApplyBasicVo();
			for (let applyIndex = 0; applyIndex < self.applySize; applyIndex++) {
				TeamApplyBasicVo.fromByteArray(data);
				self.applylist.push(TeamApplyBasicVo);
			}

		}
	}
	export class S2C_add_teammember {
		public memberlist: Array<any>;
		public teamSize: number;
		public teamMemberBasicVo: game.modules.team.models.TeamMemberBasicVo;
		public static read(self: S2C_add_teammember, data: ByteArray): void {
			self.memberlist = new Array<any>();
			self.teamSize = ByteArrayUtils.uncompact_uint32(data);
			// let teamMemberBasicVo :game.modules.team.models.TeamMemberBasicVo; 
			for (var index = 0; index < self.teamSize; index++) {
				self.teamMemberBasicVo = new game.modules.team.models.TeamMemberBasicVo();
				self.teamMemberBasicVo.fromByteArray(data);
				self.memberlist.push(self.teamMemberBasicVo);
			}


		}
	}
	export class S2C_create_team {
		// public teamid: number;
		// public formation: number;
		// public teamstate: number;
		// public smapId: number;
		public sCreateTeamVo: game.modules.team.models.SCreateTeamVo;
		public static read(self: S2C_create_team, data: ByteArray): void {
			self.sCreateTeamVo = new game.modules.team.models.SCreateTeamVo();
			self.sCreateTeamVo.fromByteArray(data);
		}
	}
	export class S2C_chat_helpresult {
		public result: number;

		public static read(self: S2C_chat_helpresult, data: ByteArray): void {
			var sChatHelpResult = Network._instance.protoTypePool.SChatHelpResult.decode(data);
			self.result = sChatHelpResult.result;

			console.log("S2C_chat_helpresult sChatHelpResult:", sChatHelpResult);
			console.log("S2C_chat_helpresult sChatHelpResult.result", sChatHelpResult.result);

		}
	}
	export class S2C_exp_messagetips {
		public messageid: number;
		public expvalue: number;
		public messageinfo: Laya.Dictionary;

		public static read(self: S2C_exp_messagetips, data: ByteArray): void {
			self.messageid = data.readUint32();
			self.expvalue = data.readLong();

			let mapSize: number = data.readUint8();
			self.messageinfo = new Laya.Dictionary();
			for (var index = 0; index < mapSize; index++) {
				self.messageinfo.set(data.readUint32(), data.readLong());
			}
			console.log("S2C_exp_messagetips+++++++++++++++++++", self.expvalue);
		}
	}
	export class S2C_chatItem_tips {
		public displayinfos: any;
		public displaytype: number;
		public roleid: number;
		public shopid: number;
		public counterid: number;
		public uniqid: number;
		public teamid: number;
		public crosstt: number;
		public serverid: number;
		// public tips: Array<any>;
		public pet: Array<any>;

		public tips: any = {};	//
		public tipsVo: game.modules.strengThening.models.TipsVo;
		public foodVo: game.modules.strengThening.models.FoodVo;
		public mapVo: game.modules.strengThening.models.ArchMapVo;
		public EnhancementVo: game.modules.strengThening.models.EnhancementVo;

		public static read(self: S2C_chatItem_tips, data: ByteArray): void {
			let displayInfoVo: game.modules.chat.models.DisplayInfoVo;
			let foodIteamTipsVo: game.modules.chat.models.FoodItemTipsVo;
			let PetItemTipsVo: game.modules.chat.models.PetItemTipsVo;

			self.tipsVo = new game.modules.strengThening.models.TipsVo();
			self.foodVo = new game.modules.strengThening.models.FoodVo();
			self.mapVo = new game.modules.strengThening.models.ArchMapVo();
			self.EnhancementVo = new game.modules.strengThening.models.EnhancementVo();
			// let displayinfosSize:number = data.readUint8();
			displayInfoVo = new game.modules.chat.models.DisplayInfoVo();
			self.displaytype = data.readUint32();
			self.roleid = data.readLong();
			self.shopid = data.readLong();
			self.counterid = data.readUint32();
			self.uniqid = data.readUint32();
			self.teamid = data.readLong();
			self.crosstt = data.readLong();
			self.serverid = data.readLong();
			self.displayinfos = displayInfoVo;
			let roleId = LoginModel.getInstance().roleDetail.roleid;
			if (roleId == self.roleid) {/** 自己 */
				if (self.displaytype == 1) {
					var bag1 = BagModel.getInstance().getBagGameItemData(BagTypes.BAG);
					var items1 = bag1.items;
					for (var i = 0; i < items1.length; i++) {
						var key = items1[i].key;
						if (key == self.uniqid) {
							var id = items1[i].id;
							if (120000 <= id && id <= 126675 || 140000 <= id && id <= 140005 || 10000 <= id && id <= 10009) {   //装备
								self.tipsVo.fromByteArray(data);
								self.tips = self.tipsVo;
							} else if (111000 <= id && id <= 111053) {/** 普通物品 */
								self.foodVo.fromByteArray(data);
								self.tips = self.foodVo;
							} else if (100000 <= id && id <= 107044 || 330100 <= id && id <= 340074) {/** 装备的附魔 */
								if (101100 <= id && id <= 101108) {
									self.EnhancementVo.fromByteArray(data);
									self.tips = self.EnhancementVo;
								} else if (id == 101200 || id == 101201) {/** 地图 */
									self.mapVo.fromByteArray(data);
									self.tips = self.mapVo;
								}
							}
						}
					}
				}/** 宠物类型数据 */
				else if (self.displaytype == 2) {
					PetItemTipsVo = new game.modules.chat.models.PetItemTipsVo();
					let petsSize: number = data.readUint8();
					for (var index = 0; index < petsSize; index++) {
						PetItemTipsVo.fromByteArray(data);
					}
					self.pet.push(PetItemTipsVo);
				}
			} else {/** 别人查看的tips */
				if (self.displaytype == 1) {/** 物品 */
					let id = ChatModel.getInstance().viewItemId;
					if (id != 0) {
						if (120000 <= id && id <= 126675 || 140000 <= id && id <= 140005 || 10000 <= id && id <= 10009) {   //装备
							self.tipsVo.fromByteArray(data);
							self.tips = self.tipsVo;
						} else if (111000 <= id && id <= 111053) {/** 普通物品 */
							self.foodVo.fromByteArray(data);
							self.tips = self.foodVo;
						} else if (100000 <= id && id <= 107044 || 330100 <= id && id <= 340074) {/** 装备的附魔 */
							if (101100 <= id && id <= 101108) {
								self.EnhancementVo.fromByteArray(data);
								self.tips = self.EnhancementVo;
							} else if (id == 101200 || id == 101201) {/** 地图 */
								self.mapVo.fromByteArray(data);
								self.tips = self.mapVo;
							}
						}
					}
				} else if (self.displaytype == 2) {/** 宠物 */

				}
			}
		}
	}
	export class S2C_trans_chatmessagenotify2client {
		public messageid: number;
		public npcbaseid: number;
		public parameters: Array<any>;
		public chatmessagenotify2client: game.modules.chat.models.ChatMessageNotifyVo;

		public static read(self: S2C_trans_chatmessagenotify2client, data: ByteArray): void {
			//var sTransChatMessageNotify2Client = Network._instance.protoTypePool.STransChatMessageNotify2Client.decode(data);
			// self.messageid = sTransChatMessageNotify2Client.messageid;
			// self.npcbaseid = sTransChatMessageNotify2Client.npcbaseid;
			// self.parameters = sTransChatMessageNotify2Client.parameters;
			// console.log("S2C_trans_chatmessagenotify2client sTransChatMessageNotify2Client:", sTransChatMessageNotify2Client);
			// console.log("S2C_trans_chatmessagenotify2client sTransChatMessageNotify2Client.messageid", sTransChatMessageNotify2Client.messageid);
			// console.log("S2C_trans_chatmessagenotify2client sTransChatMessageNotify2Client.npcbaseid", sTransChatMessageNotify2Client.npcbaseid);
			// console.log("S2C_trans_chatmessagenotify2client sTransChatMessageNotify2Client.parameters", sTransChatMessageNotify2Client.parameters);
			self.chatmessagenotify2client = new game.modules.chat.models.ChatMessageNotifyVo();
			self.chatmessagenotify2client.fromByteArray(data);

		}
	}
	export class S2C_dropInstance {
		public messageid: number;
		public landname: string;

		public static read(self: S2C_dropInstance, data: ByteArray): void {
			self.messageid = data.readInt32();
			self.landname = ByteArrayUtils.readUtf16String(data);
		}
	}

	export class S2C_trans_chatmessage2client {
		public roleid: number;
		public rolename: string;
		public shapeid: number;
		public titleid: number;
		public messagetype: number;
		public message: string;
		public displayinfos: Array<any> = [];
		public static read(self: S2C_trans_chatmessage2client, data: ByteArray): void {
			//var sTransChatMessage2Client = Network._instance.protoTypePool.STransChatMessage2Client.decode(data);
			let displayInfoVo: game.modules.chat.models.DisplayInfoVo;
			self.roleid = data.readLong();//sTransChatMessage2Client.roleid;
			self.rolename = ByteArrayUtils.readUtf16String(data); //data.readUTFBytes(data.readUint8());//sTransChatMessage2Client.rolename;
			self.shapeid = data.readUint32();//TransChatMessage2Client.shapeid;
			self.titleid = data.readUint32();//sTransChatMessage2Client.titleid;
			self.messagetype = data.readUint32();//sTransChatMessage2Client.messagetype;
			self.message = ByteArrayUtils.readUtf16String(data);//sTransChatMessage2Client.message;
			//self.displayinfos = sTransChatMessage2Client.displayinfos;
			// self.displayinfos = [];
			// let displayInfo : game.modules.chat.models.DisplayInfoVo ;
			let displayinfosSize: number = ByteArrayUtils.uncompact_uint32(data);
			// for (var index = 0; index < displayinfosSize; index++) {
			// 	displayInfo = displayInfo[index];
			// 	self.displayinfos.push(displayInfo);
			// }
			displayInfoVo = new game.modules.chat.models.DisplayInfoVo();
			for (var index = 0; index < displayinfosSize; index++) {
				displayInfoVo.fromByteArray(data);
				self.displayinfos.push(displayInfoVo);

			}

		}
	}
	export class S2C_use_roleshape {
		public shapecard: number;

		public static read(self: S2C_use_roleshape, data: ByteArray): void {
			var sUseRoleShape = Network._instance.protoTypePool.SUseRoleShape.decode(data);
			self.shapecard = sUseRoleShape.shapecard;

			console.log("S2C_use_roleshape sUseRoleShape:", sUseRoleShape);
			console.log("S2C_use_roleshape sUseRoleShape.shapecard", sUseRoleShape.shapecard);

		}
	}
	export class S2C_use_shapecard {
		public shapecard: number;


		public static read(self: S2C_use_shapecard, data: ByteArray): void {
			var sUseShapeCard = Network._instance.protoTypePool.SUseShapeCard.decode(data);
			self.shapecard = sUseShapeCard.shapecard;

			console.log("S2C_use_shapecard sUseShapeCard:", sUseShapeCard);
			console.log("S2C_use_shapecard sUseShapeCard.shapecard", sUseShapeCard.shapecard);

		}
	}
	export class S2C_add_shapecardpoint {
		public shapecard: number;
		public shapecardpoint: number;

		public static read(self: S2C_add_shapecardpoint, data: ByteArray): void {
			var sAddShapeCardPoint = Network._instance.protoTypePool.SAddShapeCardPoint.decode(data);
			self.shapecard = sAddShapeCardPoint.shapecard;
			self.shapecardpoint = sAddShapeCardPoint.shapecardpoint;

			console.log("S2C_add_shapecardpoint sAddShapeCardPoint:", sAddShapeCardPoint);
			console.log("S2C_add_shapecardpoint sAddShapeCardPoint.shapecard", sAddShapeCardPoint.shapecard);
			console.log("S2C_add_shapecardpoint sAddShapeCardPoint.shapecardpoint", sAddShapeCardPoint.shapecardpoint);

		}
	}
	export class S2C_shape_cardInfolist {
		public shapecardpoints: any;
		public curshapecard: number;
		public useroleshape: number;

		public static read(self: S2C_shape_cardInfolist, data: ByteArray): void {
			var sShapeCardInfoList = Network._instance.protoTypePool.SShapeCardInfoList.decode(data);
			self.shapecardpoints = sShapeCardInfoList.shapecardpoints;
			self.curshapecard = sShapeCardInfoList.curshapecard;
			self.useroleshape = sShapeCardInfoList.useroleshape;

			console.log("S2C_shape_cardInfolist sShapeCardInfoList:", sShapeCardInfoList);
			console.log("S2C_shape_cardInfolist sShapeCardInfoList.shapecardpoints", sShapeCardInfoList.shapecardpoints);
			console.log("S2C_shape_cardInfolist sShapeCardInfoList.curshapecard", sShapeCardInfoList.curshapecard);
			console.log("S2C_shape_cardInfolist sShapeCardInfoList.useroleshape", sShapeCardInfoList.useroleshape);
		}
	}
	export class S2C_live_skillmakecard {
		public level: number;			//选择的等级

		public static read(self: S2C_live_skillmakecard, data: ByteArray): void {
			// var sLiveSkillMakeCard = Network._instance.protoTypePool.SLiveSkillMakeCard.decode(data);
			// self.level = sLiveSkillMakeCard.level;

			// console.log("S2C_live_skillmakecard sLiveSkillMakeCard:", sLiveSkillMakeCard);
			// console.log("S2C_live_skillmakecard sLiveSkillMakeCard.level", sLiveSkillMakeCard.level);
			self.level = data.readUint32();
			console.log("S2C_live_skillmakecard+++++++++++++++", self.level);
		}
	}
	export class S2C_live_skillmakefarm {
		public addgold: number;

		public static read(self: S2C_live_skillmakefarm, data: ByteArray): void {
			self.addgold = data.readUint32();
			console.log("S2C_live_skillmakefarm++++++++++++++++++++++", self.addgold);
		}
	}
	export class S2C_live_skillmakeenhancement {

		public static read(self: S2C_live_skillmakeenhancement, data: ByteArray): void {

			console.log("S2C_live_skillmakeenhancement+++++++++++++++++++++++++++++");
		}

	}
	export class S2C_live_skillmakefriendgift {
		public itemid: number;

		public static read(self: S2C_live_skillmakefriendgift, data: ByteArray): void {
			var sLiveSkillMakeFriendGift = Network._instance.protoTypePool.SLiveSkillMakeFriendGift.decode(data);
			self.itemid = sLiveSkillMakeFriendGift.itemid;

			console.log("S2C_live_skillmakefriendgift sLiveSkillMakeFriendGift:", sLiveSkillMakeFriendGift);
			console.log("S2C_live_skillmakefriendgift sLiveSkillMakeFriendGift.itemid", sLiveSkillMakeFriendGift.itemid);

		}
	}
	export class S2C_live_skillsakefood {
		public itemid: number;
		public ret: number;

		public static read(self: S2C_live_skillsakefood, data: ByteArray): void {
			// var sLiveSkillMakeFood = Network._instance.protoTypePool.SLiveSkillMakeFood.decode(data);
			// self.itemid = sLiveSkillMakeFood.itemid;
			// self.ret = sLiveSkillMakeFood.ret;

			// console.log("S2C_live_skillsakefood sLiveSkillMakeFood:", sLiveSkillMakeFood);
			// console.log("S2C_live_skillsakefood sLiveSkillMakeFood.itemid", sLiveSkillMakeFood.itemid);
			// console.log("S2C_live_skillsakefood sLiveSkillMakeFood.ret", sLiveSkillMakeFood.ret);
			self.itemid = data.readUint32();
			self.ret = data.readUint32();
			console.log("S2C_live_skillsakefood +++++++++++++++++++++++++", self.itemid);
		}
	}
	export class S2C_live_skillmakedrug {
		public itemid: number;
		public ret: number;

		public static read(self: S2C_live_skillmakedrug, data: ByteArray): void {
			// var sLiveSkillMakeDrug = Network._instance.protoTypePool.SLiveSkillMakeDrug.decode(data);
			// self.itemid = sLiveSkillMakeDrug.itemid;
			// self.ret = sLiveSkillMakeDrug.ret;

			// console.log("S2C_live_skillmakedrug sLiveSkillMakeDrug:", sLiveSkillMakeDrug);
			// console.log("S2C_live_skillmakedrug sLiveSkillMakeDrug.itemid", sLiveSkillMakeDrug.itemid);
			// console.log("S2C_live_skillmakedrug sLiveSkillMakeDrug.ret", sLiveSkillMakeDrug.ret);
			self.itemid = data.readUint32();
			self.ret = data.readUint32();
			console.log("S2C_live_skillmakedrug++++++++++++++++++++++", self.itemid);
		}
	}
	export class S2C_live_skillmakestuff {
		public ret: number;

		public static read(self: S2C_live_skillmakestuff, data: ByteArray): void {
			// var sLiveSkillMakeStuff = Network._instance.protoTypePool.SLiveSkillMakeStuff.decode(data);
			// self.ret = sLiveSkillMakeStuff.ret;

			// console.log("S2C_live_skillmakestuff sLiveSkillMakeStuff:", sLiveSkillMakeStuff);
			// console.log("S2C_live_skillmakestuff sLiveSkillMakeStuff.ret", sLiveSkillMakeStuff.ret);
			self.ret = data.readUint32();
			console.log("S2C_live_skillmakestuff++++++++++++++++++++++", self.ret);
		}
	}
	export class S2C_update_learnliveskill {
		public skill: game.modules.skill.models.LiveSkillVo;

		public static read(self: S2C_update_learnliveskill, data: ByteArray): void {
			// var sUpdateLearnLiveSkill = Network._instance.protoTypePool.SUpdateLearnLiveSkill.decode(data);
			// self.skill = sUpdateLearnLiveSkill.skill;

			// console.log("S2C_update_learnliveskill sUpdateLearnLiveSkill:", sUpdateLearnLiveSkill);
			// console.log("S2C_update_learnliveskill sUpdateLearnLiveSkill.skill", sUpdateLearnLiveSkill.skill);
			self.skill = new game.modules.skill.models.LiveSkillVo();
			self.skill.fromByteArray(data);
			console.log("S2C_update_learnliveskill+++++++++++++", self.skill);

		}
	}
	export class S2C_request_liveskilllist {
		public skilllist: Array<any>;

		public static read(self: S2C_request_liveskilllist, data: ByteArray): void {
			self.skilllist = new Array<any>();
			let skilllistSize: number = data.readUint8();
			let skilllistInfo: game.modules.skill.models.LiveSkillVo;
			for (var index = 0; index < skilllistSize; index++) {
				skilllistInfo = new game.modules.skill.models.LiveSkillVo();
				skilllistInfo.fromByteArray(data);
				self.skilllist.push(skilllistInfo);
			}
			console.log("S2C_request_liveskilllist+++++++++++++++++++++", self.skilllist);
		}
	}
	export class S2C_update_learnparticleskill {
		public skill: any;
		public static read(self: S2C_update_learnparticleskill, data: ByteArray): void {
			// var sUpdateLearnParticleSkill = Network._instance.protoTypePool.SUpdateLearnParticleSkill.decode(data);
			// self.skill = sUpdateLearnParticleSkill.skill;
			// console.log("S2C_update_learnparticleskill sUpdateLearnParticleSkill:", sUpdateLearnParticleSkill);
			// console.log("S2C_update_learnparticleskill sUpdateLearnParticleSkill.skill", sUpdateLearnParticleSkill.skill);
			self.skill = new game.modules.skill.models.ParticleSkillVo();
			self.skill.fromByteArray(data);
			console.log("S2C_update_learnparticleskill++++++++++++", self.skill);
		}

	}

	export class S2C_request_particleskilllist {
		public skilllist: Array<any>;
		public curcontribution: number;
		public factionlevel: number;

		public static read(self: S2C_request_particleskilllist, data: ByteArray): void {
			// var sRequestParticleSkillList = Network._instance.protoTypePool.SRequestParticleSkillList.decode(data);
			// self.skilllist = sRequestParticleSkillList.skilllist;
			// self.curcontribution = sRequestParticleSkillList.curcontribution;
			// self.factionlevel = sRequestParticleSkillList.factionlevel;

			// console.log("S2C_request_particleskilllist sRequestParticleSkillList:", sRequestParticleSkillList);
			// console.log("S2C_request_particleskilllist sRequestParticleSkillList.skilllist", sRequestParticleSkillList.skilllist);
			// console.log("S2C_request_particleskilllist sRequestParticleSkillList.curcontribution", sRequestParticleSkillList.curcontribution);
			// console.log("S2C_request_particleskilllist sRequestParticleSkillList.factionlevel", sRequestParticleSkillList.factionlevel);
			self.skilllist = new Array<any>();
			let skilllistSize: number = data.readUint8();
			let skilllistInfo: game.modules.skill.models.ParticleSkillVo;
			for (var index = 0; index < skilllistSize; index++) {
				skilllistInfo = new game.modules.skill.models.ParticleSkillVo();
				skilllistInfo.fromByteArray(data);
				self.skilllist.push(skilllistInfo);
			}
			self.curcontribution = data.readInt32();
			self.factionlevel = data.readInt32();
			console.log("S2C_request_particleskilllist++++++++++++++++++", self.skilllist);
		}
	}
	export class S2C_update_extskill {
		public extskilllists: any;

		public static read(self: S2C_update_extskill, data: ByteArray): void {
			var sUpdateExtSkill = Network._instance.protoTypePool.SUpdateExtSkill.decode(data);
			self.extskilllists = sUpdateExtSkill.extskilllists;

			console.log("S2C_update_extskill sUpdateExtSkill:", sUpdateExtSkill);
			console.log("S2C_update_extskill sUpdateExtSkill.extskilllists", sUpdateExtSkill.extskilllists);

		}
	}
	export class S2C_send_inborns {
		public inborns: any;

		public static read(self: S2C_send_inborns, data: ByteArray): void {
			// var sSendInborns = Network._instance.protoTypePool.SSendInborns.decode(data);
			// self.inborns = sSendInborns.inborns;

			// console.log("S2C_send_inborns sSendInborns:", sSendInborns);
			// console.log("S2C_send_inborns sSendInborns.inborns", sSendInborns.inborns);
			let mapSize: number = data.readUint8();
			self.inborns = new Laya.Dictionary();
			for (var index = 0; index < mapSize; index++) {
				self.inborns.set(data.readUint32(), data.readUint32());
			}
			console.log("S2C_send_inborns++++++++++", self.inborns);
		}
	}

	export class S2C_update_inborn {
		public flag: number;
		public inborns: any;

		public static read(self: S2C_update_inborn, data: ByteArray): void {
			// var sUpdateInborn = Network._instance.protoTypePool.SUpdateInborn.decode(data);
			// self.flag = sUpdateInborn.flag;
			// self.inborns = sUpdateInborn.inborns;

			// console.log("S2C_update_inborn sUpdateInborn:", sUpdateInborn);
			// console.log("S2C_update_inborn sUpdateInborn.flag", sUpdateInborn.flag);
			// console.log("S2C_update_inborn sUpdateInborn.inborns", sUpdateInborn.inborns);
			self.flag = data.readByte();
			let mapSize: number = data.readUint8();
			self.inborns = new Laya.Dictionary();
			for (var index = 0; index < mapSize; index++) {
				self.inborns.set(data.readUint32(), data.readUint32());
			}
			console.log("S2C_update_inborn++++++++++++++", self.inborns);
		}
	}

	export class S2C_send_specialskills {
		public skills: number;
		public effects: number;

		public static read(self: S2C_send_specialskills, data: ByteArray): void {
			var sSendSpecialSkills = Network._instance.protoTypePool.SSendSpecialSkills.decode(data);
			self.skills = sSendSpecialSkills.skills;
			self.effects = sSendSpecialSkills.effects;

			console.log("S2C_send_specialskills sSendSpecialSkills:", sSendSpecialSkills);
			console.log("S2C_send_specialskills sSendSpecialSkills.skills", sSendSpecialSkills.skills);
			console.log("S2C_send_specialskills sSendSpecialSkills.effects", sSendSpecialSkills.effects);

		}
	}
	export class S2C_send_assistskillmaxlevels {
		public npckey: number;
		public maxlevels: any;

		public static read(self: S2C_send_assistskillmaxlevels, data: ByteArray): void {
			var sSendAssistSkillMaxLevels = Network._instance.protoTypePool.SSendAssistSkillMaxLevels.decode(data);
			self.npckey = sSendAssistSkillMaxLevels.npckey;
			self.maxlevels = sSendAssistSkillMaxLevels.maxlevels;

			console.log("S2C_send_assistskillmaxlevels sSendAssistSkillMaxLevels:", sSendAssistSkillMaxLevels);
			console.log("S2C_send_assistskillmaxlevels sSendAssistSkillMaxLevels.npckey", sSendAssistSkillMaxLevels.npckey);
			console.log("S2C_send_assistskillmaxlevels sSendAssistSkillMaxLevels.maxlevels", sSendAssistSkillMaxLevels.maxlevels);

		}
	}
	export class S2C_update_assistskill {
		public assistSkill: any;

		public static read(self: S2C_update_assistskill, data: ByteArray): void {
			var sUpdateAssistSkill = Network._instance.protoTypePool.SUpdateAssistSkill.decode(data);
			self.assistSkill = sUpdateAssistSkill.assistSkill;

			console.log("S2C_update_assistskill sUpdateAssistSkill:", sUpdateAssistSkill);
			console.log("S2C_update_assistskill sUpdateAssistSkill.assistSkill", sUpdateAssistSkill.assistSkill);
		}
	}

	export class S2C_skill_error {
		public skillError: number;

		public static read(self: S2C_skill_error, data: ByteArray): void {
			self.skillError = data.readInt32();
		}
	}
	export class S2C_item_orderbrowseblackmarket {
		public itemtype: number;
		public salelist: Array<any>;
		public buylist: Array<any>;

		public static read(self: S2C_item_orderbrowseblackmarket, data: ByteArray): void {
			var sItemOrderBrowseBlackMarket = Network._instance.protoTypePool.SItemOrderBrowseBlackMarket.decode(data);
			self.itemtype = sItemOrderBrowseBlackMarket.itemtype;
			self.salelist = sItemOrderBrowseBlackMarket.salelist;
			self.buylist = sItemOrderBrowseBlackMarket.buylist;

			console.log("S2C_item_orderbrowseblackmarket sItemOrderBrowseBlackMarket:", sItemOrderBrowseBlackMarket);
			console.log("S2C_item_orderbrowseblackmarket sItemOrderBrowseBlackMarket.itemtype", sItemOrderBrowseBlackMarket.itemtype);
			console.log("S2C_item_orderbrowseblackmarket sItemOrderBrowseBlackMarket.salelist", sItemOrderBrowseBlackMarket.salelist);
			console.log("S2C_item_orderbrowseblackmarket sItemOrderBrowseBlackMarket.buylist", sItemOrderBrowseBlackMarket.buylist);
		}
	}

	export class S2C_item_orderdownblackmarket {
		public itemtype: number;
		public pid: number;

		public static read(self: S2C_item_orderdownblackmarket, data: ByteArray): void {
			var sItemOrderDownBlackMarket = Network._instance.protoTypePool.SItemOrderDownBlackMarket.decode(data);
			self.itemtype = sItemOrderDownBlackMarket.itemtype;
			self.pid = sItemOrderDownBlackMarket.pid;

			console.log("S2C_item_orderdownblackmarket sItemOrderDownBlackMarket:", sItemOrderDownBlackMarket);
			console.log("S2C_item_orderdownblackmarket sItemOrderDownBlackMarket.itemtype", sItemOrderDownBlackMarket.itemtype);
			console.log("S2C_item_orderdownblackmarket sItemOrderDownBlackMarket.pid", sItemOrderDownBlackMarket.pid);

		}
	}
	export class S2C_refresh_itemorderstate {
		public itemtype: number;
		public pid: number;
		public state: number;

		public static read(self: S2C_refresh_itemorderstate, data: ByteArray): void {
			var sRefreshItemOrderState = Network._instance.protoTypePool.SRefreshItemOrderState.decode(data);
			self.itemtype = sRefreshItemOrderState.itemtype;
			self.pid = sRefreshItemOrderState.pid;
			self.state = sRefreshItemOrderState.state;

			console.log("S2C_refresh_itemorderstate sRefreshItemOrderState:", sRefreshItemOrderState);
			console.log("S2C_refresh_itemorderstate sRefreshItemOrderState.itemtype", sRefreshItemOrderState.itemtype);
			console.log("S2C_refresh_itemorderstate sRefreshItemOrderState.pid", sRefreshItemOrderState.pid);
			console.log("S2C_refresh_itemorderstate sRefreshItemOrderState.state", sRefreshItemOrderState.state);
		}
	}
	export class S2C_item_orderupblackmarket {
		public order: any;
		public itemtype: number;

		public static read(self: S2C_item_orderupblackmarket, data: ByteArray): void {
			var sRefreshItemOrderState = Network._instance.protoTypePool.SItemOrderUpBlackMarket.decode(data);
			self.order = sRefreshItemOrderState.order;
			self.itemtype = sRefreshItemOrderState.itemtype;

			console.log("S2C_item_orderupblackmarket sRefreshItemOrderState:", sRefreshItemOrderState);
			console.log("S2C_item_orderupblackmarket sRefreshItemOrderState.order", sRefreshItemOrderState.order);
			console.log("S2C_item_orderupblackmarket sRefreshItemOrderState.itemtype", sRefreshItemOrderState.itemtype);
		}
	}

	export class S2C_gold_orderdownblackmarket {
		public pid: number;

		public static read(self: S2C_gold_orderdownblackmarket, data: ByteArray): void {
			var sGoldOrderDownBlackMarket = Network._instance.protoTypePool.SGoldOrderDownBlackMarket.decode(data);
			self.pid = sGoldOrderDownBlackMarket.pid;

			console.log("S2C_gold_orderdownblackmarket sGoldOrderDownBlackMarket:", sGoldOrderDownBlackMarket);
			console.log("S2C_gold_orderdownblackmarket sGoldOrderDownBlackMarket.pid", sGoldOrderDownBlackMarket.pid);

		}
	}
	export class S2C_refresh_goldorderstate {
		public pid: number;
		public state: number;


		public static read(self: S2C_refresh_goldorderstate, data: ByteArray): void {
			var sRefreshGoldOrderState = Network._instance.protoTypePool.SRefreshGoldOrderState.decode(data);
			self.pid = sRefreshGoldOrderState.pid;
			self.state = sRefreshGoldOrderState.state;

			console.log("S2C_refresh_goldorderstate sRefreshGoldOrderState:", sRefreshGoldOrderState);
			console.log("S2C_refresh_goldorderstate sRefreshGoldOrderState.pid", sRefreshGoldOrderState.pid);
			console.log("S2C_refresh_goldorderstate sRefreshGoldOrderState.state", sRefreshGoldOrderState.state);

		}
	}

	export class S2C_gold_orderupblackmarket {
		public order: any;


		public static read(self: S2C_gold_orderupblackmarket, data: ByteArray): void {
			var sGoldOrderUpBlackMarket = Network._instance.protoTypePool.SGoldOrderUpBlackMarket.decode(data);
			self.order = sGoldOrderUpBlackMarket.order;

			console.log("S2C_gold_orderupblackmarket sGoldOrderUpBlackMarket:", sGoldOrderUpBlackMarket);
			console.log("S2C_gold_orderupblackmarket sGoldOrderUpBlackMarket.order", sGoldOrderUpBlackMarket.order);

		}
	}

	export class S2C_gold_orderbrowseblackmarket {
		public salelist: Array<any>;
		public buylist: Array<any>;

		public static read(self: S2C_gold_orderbrowseblackmarket, data: ByteArray): void {
			var sGoldOrderBrowseBlackMarket = Network._instance.protoTypePool.SGoldOrderBrowseBlackMarket.decode(data);
			self.salelist = sGoldOrderBrowseBlackMarket.salelist;
			self.buylist = sGoldOrderBrowseBlackMarket.buylist;

			console.log("S2C_gold_orderbrowseblackmarket sGoldOrderBrowseBlackMarket:", sGoldOrderBrowseBlackMarket);
			console.log("S2C_gold_orderbrowseblackmarket sGoldOrderBrowseBlackMarket.salelist", sGoldOrderBrowseBlackMarket.salelist);
			console.log("S2C_gold_orderbrowseblackmarket sGoldOrderBrowseBlackMarket.buylist", sGoldOrderBrowseBlackMarket.buylist);

		}
	}
	export class S2C_take_backtempmarketcontainerItem {
		public succ: number;

		public static read(self: S2C_take_backtempmarketcontainerItem, data: ByteArray): void {
			var sTakeBackTempMarketContainerItem = Network._instance.protoTypePool.STakeBackTempMarketContainerItem.decode(data);
			self.succ = sTakeBackTempMarketContainerItem.succ;
			console.log("S2C_take_backtempmarketcontainerItem sTakeBackTempMarketContainerItem:", sTakeBackTempMarketContainerItem);
			console.log("S2C_take_backtempmarketcontainerItem sTakeBackTempMarketContainerItem.succ", sTakeBackTempMarketContainerItem.succ);
		}
	}

	export class S2C_temp_marketcontainer {
		public goodslist: Array<any>;

		public static read(self: S2C_temp_marketcontainer, data: ByteArray): void {
			var sTempMarketContainer = Network._instance.protoTypePool.STempMarketContainer.decode(data);
			self.goodslist = sTempMarketContainer.goodslist;

			console.log("S2C_temp_marketcontainer sTempMarketContainer:", sTempMarketContainer);
			console.log("S2C_temp_marketcontainer sTempMarketContainer.goodslist", sTempMarketContainer.goodslist);
		}
	}
	export class S2C_marketItem_chatshow {
		public browsetype: number;
		public firstno: number;
		public twono: number;
		public threeno: Array<number>;
		public id: number;
		public currpage: number;
		public totalpage: number;
		public goodslist: Array<any>;

		public static read(self: S2C_marketItem_chatshow, data: ByteArray): void {
			var sMarketItemChatShow = Network._instance.protoTypePool.SMarketItemChatShow.decode(data);
			self.browsetype = sMarketItemChatShow.browsetype;
			self.firstno = sMarketItemChatShow.firstno;
			self.twono = sMarketItemChatShow.twono;
			self.threeno = sMarketItemChatShow.threeno;
			self.id = sMarketItemChatShow.id;
			self.currpage = sMarketItemChatShow.currpage;
			self.totalpage = sMarketItemChatShow.totalpage;
			self.goodslist = sMarketItemChatShow.goodslist;
			console.log("S2C_marketItem_chatshow sMarketItemChatShow:", sMarketItemChatShow);
			console.log("S2C_marketItem_chatshow sMarketItemChatShow.browsetype", sMarketItemChatShow.browsetype);
			console.log("S2C_marketItem_chatshow sMarketItemChatShow.firstno", sMarketItemChatShow.firstno);
			console.log("S2C_marketItem_chatshow sMarketItemChatShow.twono", sMarketItemChatShow.twono);
			console.log("S2C_marketItem_chatshow sMarketItemChatShow.threeno", sMarketItemChatShow.threeno);
			console.log("S2C_marketItem_chatshow sMarketItemChatShow.id", sMarketItemChatShow.id);
			console.log("S2C_marketItem_chatshow sMarketItemChatShow.currpage", sMarketItemChatShow.currpage);
			console.log("S2C_marketItem_chatshow sMarketItemChatShow.totalpage", sMarketItemChatShow.totalpage);
			console.log("S2C_marketItem_chatshow sMarketItemChatShow.goodslist", sMarketItemChatShow.goodslist);
		}
	}
	export class S2C_market_searchresult {
		public browsetype: number;	//浏览类型  1 我要购买 2公示物品
		public firstno: number;	//一级页签类型
		public twono: number;	//二级页签类型
		public threeno: Array<number> = [];	//三级页签类型
		public currpage: number;	//当前页
		public totalpage: number;	//总页数
		public goodslist: Array<any> = [];	//查看物品列表

		public static read(self: S2C_market_searchresult, data: ByteArray): void {
			self.browsetype = data.readInt32();
			self.firstno = data.readInt32();
			self.twono = data.readInt32();
			let threenoSize = data.readInt8();
			for (var i = 0; i < threenoSize; i++) {
				self.threeno.push(data.readInt32());
			}
			self.currpage = data.readInt32();
			self.totalpage = data.readInt32();
			let MarketGoodsVo: game.modules.sale.models.MarketGoodsVo;
			let goodlistSize = data.readInt8();
			for (var i = 0; i < goodlistSize; i++) {
				MarketGoodsVo = new game.modules.sale.models.MarketGoodsVo();
				MarketGoodsVo.fromByteArray(data);
				self.goodslist.push(MarketGoodsVo);
			}

		}
	}
	export class S2C_attention_goods {
		public attentype: number;
		public id: number;
		public attentiontype: number;
		public itemtype: number;

		public static read(self: S2C_attention_goods, data: ByteArray): void {
			self.attentype = data.readInt32();
			self.id = ByteArrayUtils.readLong(data);
			self.attentiontype = data.readInt32();
			self.itemtype = data.readInt32();
		}
	}
	/** 队员同意进入精英副本 */
	export class S2C_EnterFuBen {
		public taskid: number;

		public static read(self: S2C_EnterFuBen, data: ByteArray): void {
			self.taskid = data.readInt32();
		}
	}
}
