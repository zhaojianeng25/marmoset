/**
* name 
*/
import TeamOrganizeMediator = game.modules.team.TeamOrganizeMediator;
import TeamViewLeaderMediators = game.modules.commonUI.TeamViewLeaderMediators;
import TeamViewMyselfMediators = game.modules.commonUI.TeamViewMyselfMediators;
import TeamViewMainMediators = game.modules.commonUI.TeamViewMainMediators;
import HudModel = game.modules.mainhud.models.HudModel;
module game.modules.mainhud.models {
	/**获得位置*/
	export const GETPOST_EVENT: string = "getpost_event";
	/**跳转地图*/
	export const MAPCHANGE_EVENT: string = "mapchange_event";
	/**设置位置*/
	export const SETPOST_EVENT: string = "setpost_event";
	/**当前经验 */
	export const SRefreshUserExp_EVENT: string = "SRefreshUserExp";
	/**刷新人物货币 */
	export const SRefreshCurrency_EVENT: string = "SRefreshCurrency";
	/**通知客户端刷新符石的数量 */
	export const SReqFushiNum_EVENT: string = "SReqFushiNum";
	/**刷新人物通货的消息 */
	export const SRefreshRoleCurrency_EVENT: string = "SRefreshRoleCurrency";
	/**刷新人物属性的消息 */
	export const SRefreshRoleData_EVENT: string = "SRefreshRoleData";
	/**这个是用来提示有多种加经验的情况 */
	export const SExpMessageTips_EVENT: string = "SExpMessageTips";
	/**是否有公会 */
	export const SRefreshRoleClan: string = "SRefreshRoleClan";
	/**服务器等级 */
	export const SServerLevel_EVENT: string = "SServerLevel";
	/**关闭界面 */
	export const CLOSEVIEW_EVENT: string = "closeview";
	/**打开界面 */
	export const OPEN_EVENT: string = "openview";
	/**金币兑换界面返回 */
	export const changeMoneyReturn: string = "changeMoneyReturn";
	/**人物小窗口 */
	export const ROLE: string = "role";
	/**刷新队伍界面的ui */
	export const UPDATA_TEAM_UI: string = "updateTeamui";
	/** 返回登陆，主界面UI移除 */
	export const MAINHUD_UI_HIDE: string = "mainHudHide";
	/**场景加载进度 */
	export const CHNANGJING_PRO: string = "changjing_pro";
	/**人物升级 */
	export const LevelUp_EVENT: string = "levelup";
	/** 主线-重新显示主界面 */
	export const SHOW_MAINHUD_AGAIN: string = "showMainHudAgain";
	/** 通知获取到了服务器时间 */
	export const SERVER_TIME: string = "servertime_event";
	/** 通知表现出属性变化了多少的提示飘窗 */
	export const SHOW_CHANGE_DIFFERENCE: string = "showChangeDifference";
	/** 通知刷新求助倒计时 */
	export const REFRESH_TIME: string = "refreshTime";

	export class HudProxy extends hanlder.ProxyBase {

		constructor() {
			super();
			HudProxy._instance = this;
			this.init();
		}
		public static _instance: HudProxy;
		public static getInstance(): HudProxy {
			if (!this._instance) {
				this._instance = new HudProxy();
			}
			return this._instance;
		}

		public init(): void {

			HudModel.getInstance();
			this.addNetworkListener();

			//CNPCConfig
			Laya.loader.load("common/data/temp/npc.cnpcconfig.bin", Handler.create(this, this.onloadedCNPCConfigComplete), null, Loader.BUFFER);
			//CNpcChat
			Laya.loader.load("common/data/temp/npc.cnpcchat.bin", Handler.create(this, this.onloadedcNpcChatComplete), null, Loader.BUFFER);
			//CNpcServerConfig
			Laya.loader.load("common/data/temp/npc.cnpcserverconfig.bin", Handler.create(this, this.onloadedcNpcServerConfigComplete), null, Loader.BUFFER);
			//CMainMissionInfo
			//加载NPC服务映射表
			Laya.loader.load("common/data/temp/npc.cnpcservicemapping.bin", Handler.create(this, this.onloadedCNpcServiceMappingComplete), null, Loader.BUFFER);

			Laya.loader.load("common/data/temp/npc.cnpcinfo.bin", Handler.create(this, this.onloadedcNPCInfoComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/role.cserviceexpconfig.bin", Handler.create(this, this.onloadedServiceExpConfigComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/mission.carroweffect.bin", Handler.create(this, this.onloadedArrowEffectComplete), null, Loader.BUFFER);
		}
		/**
		 * 加载NPC服务映射表
		 */
		onloadedCNpcServiceMappingComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/npc.cnpcservicemapping.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, HudModel._instance.CNpcServiceMappingData, CNpcServiceMappingBaseVo, "id");
		}
		/**箭头效果 */
		onloadedArrowEffectComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.carroweffect.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, HudModel._instance.carroweffectData, ArrowEffectBaseVo, "id");
		}
		/**F服务器经验限制表 */
		onloadedServiceExpConfigComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/role.cserviceexpconfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, HudModel._instance.cserviceexpconfigData, ServiceExpConfigBaseVo, "id");
		}
		onloadedcNPCInfoComplete(): void {
			console.log("cNPCInfoNPC-复合/npc表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/npc.cnpcinfo.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, HudModel._instance.cNPCInfoData, CNPCInfoBaseVo, "id");
		}
		onloadedcNpcServerConfigComplete(): void {
			console.log("cNPCInfoNPC-复合/npc对白配置 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/npc.cnpcserverconfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, HudModel._instance.cnpcServerConfigData, CNpcServerConfigBaseVo, "id");
		}
		onloadedcNpcChatComplete(): void {
			console.log("cNPCInfoNPC-复合/npc对白配置 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/npc.cnpcchat.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, HudModel._instance.cNpcChatData, CNpcChatBaseVo, "id");
		}
		onloadedCNPCConfigComplete(): void {
			console.log("CNPCConfigNPC-复合/npc表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/npc.cnpcconfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, HudModel._instance.cNPCConfigData, CNPCConfigBaseVo, "id");
		}
		// 添加监听
		private addNetworkListener(): void {
			Network._instance.addHanlder(ProtocolsEnum.SRoleEnterScene, this, this.onGetPost);
			Network._instance.addHanlder(ProtocolsEnum.SRefreshUserExp, this, this.onRefreshUserExp);
			Network._instance.addHanlder(ProtocolsEnum.SRefreshCurrency, this, this.onRefreshCurrency);
			Network._instance.addHanlder(ProtocolsEnum.SReqFushiNum, this, this.onRefreshFushi);
			Network._instance.addHanlder(ProtocolsEnum.SRefreshRoleCurrency, this, this.onRefreshRoleCurrency);
			Network._instance.addHanlder(ProtocolsEnum.SRefreshRoleData, this, this.onRefreshRoleData);
			Network._instance.addHanlder(ProtocolsEnum.SRefreshRoleClan, this, this.onSRefreshRoleClan);
			Network._instance.addHanlder(ProtocolsEnum.SServerLevel, this, this.onServerLevel);
			Network._instance.addHanlder(ProtocolsEnum.SExpMessageTips, this, this.onExpMessageTips);
			Network._instance.addHanlder(ProtocolsEnum.SGameTime, this, this.onGameTime);
		}

		// 移除监听
		private removeNetworkListener(): void {
		}
		/** 获取服务器时间 */
		public onGameTime(optcode: number, msg: hanlder.S2C_SGameTime): void {
			models.HudProxy.getInstance().event(models.SERVER_TIME, [msg.servertime]);
		}
		/**这个是用来提示有多种加经验的情况 */
		public onExpMessageTips(optcode: number, msg: hanlder.S2C_exp_messagetips): void {
			HudModel.getInstance().SExpMessageTipsData.set("data", msg);
			HudProxy.getInstance().event(models.SExpMessageTips_EVENT);
		}
		private onGetPost(optcode: number, msg: hanlder.s2c_role_enter_scene): void {
			models.HudModel.getInstance().movesceneid = msg.sceneID
			if (msg.sceneID > 9999) {
				// if (msg.sceneID > 8589936583 && msg.sceneID != 12884903842) {
				// 	models.HudModel.getInstance().sceneid = 1711;
				// }
				// else if (msg.sceneID == 12884903842) {
				// 	models.HudModel.getInstance().sceneid = 1954
				// }
				// else if (msg.sceneID <= 8589936583) {
				// 	models.HudModel.getInstance().sceneid = 1991 - (8589936583 - msg.sceneID)
				// }
				models.HudModel.getInstance().sceneid = msg.sceneID & 0x00000000FFFFFFFF;
			}
			else {
				models.HudModel.getInstance().sceneid = msg.sceneID;
			}
			//重置挂机输赢
			game.modules.mainhud.models.HudModel.getInstance().HangUpWin = true;
			let MapData: WorldMapConfigBaseVo = MapModel.getInstance().WorldMapConfigData[models.HudModel.getInstance().sceneid]
			game.modules.mainhud.models.HudModel.getInstance().mapname = MapData.mapName;
			game.modules.mainhud.models.HudModel.getInstance().pos = msg.destPos;
			models.HudProxy.getInstance().event(models.GETPOST_EVENT, msg.destPos);
			game.modules.task.models.TaskProxy.getInstance().event(game.modules.task.models.NEWTASK);
			// models.HudProxy.getInstance().event(models.SETPOST_EVENT);
		}
		/**服务器等级 */
		public onServerLevel(optcode: number, msg: hanlder.S2C_SServerLevel): void {
			HudModel.getInstance().serverLevel = msg.slevel;
			HudModel.getInstance().newleveldays = msg.newleveldays;
			HudProxy.getInstance().event(SServerLevel_EVENT);
		}
		/**通知客户端刷新人物经验 */
		public onRefreshUserExp(optcode: number, msg: hanlder.S2C_SRefreshUserExp): void {
			HudModel.getInstance().expNum = msg.curexp;
			HudProxy.getInstance().event(SRefreshUserExp_EVENT);
		}

		/**刷新身上货币 */
		public onRefreshCurrency(optcode: number, msg: hanlder.S2C_SRefresh_Currency): void {
			//银币
			if (msg.currency.get(MoneyTypes.MoneyType_SilverCoin) != null)
				HudModel.getInstance().sliverNum = msg.currency.get(MoneyTypes.MoneyType_SilverCoin);
			//金币
			if (msg.currency.get(MoneyTypes.MoneyType_GoldCoin) != null)
				HudModel.getInstance().goldNum = msg.currency.get(MoneyTypes.MoneyType_GoldCoin);
			//职业贡献
			if (msg.currency.get(MoneyTypes.MoneyType_ProfContribute) != null)
				HudModel.getInstance().zhiyeNum = msg.currency.get(MoneyTypes.MoneyType_ProfContribute);
			//荣誉值
			if (msg.currency.get(MoneyTypes.MoneyType_RongYu) != null)
				HudModel.getInstance().rongyuNum = msg.currency.get(MoneyTypes.MoneyType_RongYu);
			//声望
			if (msg.currency.get(MoneyTypes.MoneyType_ShengWang) != null)
				HudModel.getInstance().shengwangNum = msg.currency.get(MoneyTypes.MoneyType_ShengWang);
			//节日积分
			if (msg.currency.get(MoneyTypes.MoneyType_FestivalPoint) != null)
				HudModel.getInstance().jieriNum = msg.currency.get(MoneyTypes.MoneyType_FestivalPoint);
			//良师值
			if (msg.currency.get(MoneyTypes.MoneyType_GoodTeacherVal) != null)
				HudModel.getInstance().liangshiNum = msg.currency.get(MoneyTypes.MoneyType_GoodTeacherVal);
			//信用点
			if (msg.currency.get(MoneyTypes.MoneyType_EreditPoint) != null)
				HudModel.getInstance().xinyongNum = msg.currency.get(MoneyTypes.MoneyType_EreditPoint);
			HudProxy.getInstance().event(SRefreshCurrency_EVENT);
		}
		/** 刷新拥有的元宝数量  */
		private onRefreshFushi(optcode: number, msg: hanlder.S2C_SReqFushiNum): void {
			HudModel.getInstance().fuShiNum = msg.num;
			HudProxy.getInstance().event(SReqFushiNum_EVENT);
		}
		//刷新人物通货的消息
		public onRefreshRoleCurrency(optcode: number, msg: hanlder.s2c_SRefreshRoleCurrency): void {
			//公会DKP
			if (msg.datas.get(RoleCurrency.GUILD_DKP) != null)
				HudModel.getInstance().dkpNum = msg.datas.get(RoleCurrency.GUILD_DKP);
			//公会贡献
			if (msg.datas.get(RoleCurrency.GUILD_DED) != null)
				HudModel.getInstance().gonghuiNum = msg.datas.get(RoleCurrency.GUILD_DED);
			//良师值
			if (msg.datas.get(RoleCurrency.TEACHER_SCORE) != null)
				HudModel.getInstance().liangshiNum = msg.datas.get(RoleCurrency.TEACHER_SCORE);
			//活动积分
			if (msg.datas.get(RoleCurrency.ACTIVE_SCORE) != null)
				HudModel.getInstance().activeNum = msg.datas.get(RoleCurrency.ACTIVE_SCORE);
			//荣誉值
			if (msg.datas.get(RoleCurrency.HONOR_SCORE) != null)
				HudModel.getInstance().rongyuNum = msg.datas.get(RoleCurrency.HONOR_SCORE);
			//声望值
			if (msg.datas.get(RoleCurrency.POP_SCORE) != null)
				HudModel.getInstance().shengwangNum = msg.datas.get(RoleCurrency.POP_SCORE);
			//好友积分
			if (msg.datas.get(RoleCurrency.FRIEND_SCORE) != null)
				HudModel.getInstance().friendNum = msg.datas.get(RoleCurrency.FRIEND_SCORE);
			//职业贡献
			if (msg.datas.get(RoleCurrency.PROF_CONTR) != null)
				HudModel.getInstance().zhiyeNum = msg.datas.get(RoleCurrency.PROF_CONTR);
			//信用点
			if (msg.datas.get(RoleCurrency.EREDITPOINT_SCORE) != null)
				HudModel.getInstance().xinyongNum = msg.datas.get(RoleCurrency.EREDITPOINT_SCORE);
			//天梯币
			if (msg.datas.get(RoleCurrency.TIANTI_COIN) != null)
				HudModel.getInstance().tiantiNum = msg.datas.get(RoleCurrency.TIANTI_COIN);
			//巧匠值
			if (msg.datas.get(RoleCurrency.QIAO_JIANG) != null)
				HudModel.getInstance().qiaojiangNum = msg.datas.get(RoleCurrency.QIAO_JIANG);
			HudProxy.getInstance().event(SRefreshRoleCurrency_EVENT);
		}
		/**刷新人物属性 */
		public onRefreshRoleData(optcode: number, msg: hanlder.s2c_SRefreshRoleData): void {
			//体质
			if (msg.datas.get(shuxing.CONS) != null)
				HudModel.getInstance().tizhiNum = msg.datas.get(shuxing.CONS);
			//智力
			if (msg.datas.get(shuxing.IQ) != null)
				HudModel.getInstance().zhiliNum = msg.datas.get(shuxing.IQ);
			//力量
			if (msg.datas.get(shuxing.STR) != null)
				HudModel.getInstance().liliangNum = msg.datas.get(shuxing.STR);
			//耐力
			if (msg.datas.get(shuxing.ENDU) != null)
				HudModel.getInstance().nailiNum = msg.datas.get(shuxing.ENDU);
			//敏捷
			if (msg.datas.get(shuxing.AGI) != null)
				HudModel.getInstance().minjieNum = msg.datas.get(shuxing.AGI);
			//最大生命
			if (msg.datas.get(shuxing.MAX_HP) != null) {
				this.compareRoleProper(HudModel.getInstance().maxHpNum, msg.datas.get(shuxing.MAX_HP), shuxing.MAX_HP);
				HudModel.getInstance().maxHpNum = msg.datas.get(shuxing.MAX_HP);
			}
			//当前生命上限（小于等于最大生命上限）
			if (msg.datas.get(shuxing.UP_LIMITED_HP) != null)
				HudModel.getInstance().limitedHpNum = msg.datas.get(shuxing.UP_LIMITED_HP);
			//当前生命
			if (msg.datas.get(shuxing.HP) != null)
				HudModel.getInstance().hpNum = msg.datas.get(shuxing.HP);
			//最大法力
			if (msg.datas.get(shuxing.MAX_MP) != null) {
				this.compareRoleProper(HudModel.getInstance().maxMpNum, msg.datas.get(shuxing.MAX_MP), shuxing.MAX_MP);
				HudModel.getInstance().maxMpNum = msg.datas.get(shuxing.MAX_MP);
			}
			//当前法力
			if (msg.datas.get(shuxing.MP) != null)
				HudModel.getInstance().mpNum = msg.datas.get(shuxing.MP);
			//最大怒气
			if (msg.datas.get(shuxing.MAX_SP) != null)
				HudModel.getInstance().maxSpNum = msg.datas.get(shuxing.MAX_SP);
			//怒气
			if (msg.datas.get(shuxing.SP) != null)
				HudModel.getInstance().spNum = msg.datas.get(shuxing.SP);
			//物理攻击
			if (msg.datas.get(shuxing.ATTACK) != null) {
				this.compareRoleProper(HudModel.getInstance().attackNum, msg.datas.get(shuxing.ATTACK), shuxing.ATTACK);
				HudModel.getInstance().attackNum = Math.floor(msg.datas.get(shuxing.ATTACK));
			}
			//物理防御
			if (msg.datas.get(shuxing.DEFEND) != null) {
				this.compareRoleProper(HudModel.getInstance().defendNum, msg.datas.get(shuxing.DEFEND), shuxing.DEFEND);
				HudModel.getInstance().defendNum = Math.floor(msg.datas.get(shuxing.DEFEND));
			}
			//法术攻击
			if (msg.datas.get(shuxing.MAGIC_ATTACK) != null) {
				this.compareRoleProper(HudModel.getInstance().magicAttackNum, msg.datas.get(shuxing.MAGIC_ATTACK), shuxing.MAGIC_ATTACK);
				HudModel.getInstance().magicAttackNum = Math.floor(msg.datas.get(shuxing.MAGIC_ATTACK));
			}
			//法术防御
			if (msg.datas.get(shuxing.MAGIC_DEF) != null) {
				this.compareRoleProper(HudModel.getInstance().magicDefNum, msg.datas.get(shuxing.MAGIC_DEF), shuxing.MAGIC_DEF);
				HudModel.getInstance().magicDefNum = Math.floor(msg.datas.get(shuxing.MAGIC_DEF));
			}
			//治疗强度
			if (msg.datas.get(shuxing.MEDICAL) != null) {
				this.compareRoleProper(HudModel.getInstance().medicalNum, msg.datas.get(shuxing.MEDICAL), shuxing.MEDICAL);
				HudModel.getInstance().medicalNum = msg.datas.get(shuxing.MEDICAL);
			}
			//控制命中
			if (msg.datas.get(shuxing.SEAL) != null) {
				this.compareRoleProper(HudModel.getInstance().sealNum, msg.datas.get(shuxing.SEAL), shuxing.SEAL);
				HudModel.getInstance().sealNum = msg.datas.get(shuxing.SEAL);
			}
			//控制抗性
			if (msg.datas.get(shuxing.UNSEAL) != null) {
				this.compareRoleProper(HudModel.getInstance().unSealNum, msg.datas.get(shuxing.UNSEAL), shuxing.UNSEAL);
				HudModel.getInstance().unSealNum = msg.datas.get(shuxing.UNSEAL);
			}
			//速度
			if (msg.datas.get(shuxing.SPEED) != null) {
				this.compareRoleProper(HudModel.getInstance().speedNum, msg.datas.get(shuxing.SPEED), shuxing.SPEED);
				HudModel.getInstance().speedNum = Math.floor(msg.datas.get(shuxing.SPEED));
			}
			//命中值
			if (msg.datas.get(shuxing.HIT_RATE) != null)
				HudModel.getInstance().hitRateNum = msg.datas.get(shuxing.HIT_RATE);
			//躲避值
			if (msg.datas.get(shuxing.DODGE_RATE) != null)
				HudModel.getInstance().dodgeRateNum = msg.datas.get(shuxing.DODGE_RATE);
			//物理暴击
			if (msg.datas.get(shuxing.PHY_CRITC_LEVEL) != null)
				HudModel.getInstance().phyCritcLevelNum = msg.datas.get(shuxing.PHY_CRITC_LEVEL);
			//物理抗暴
			if (msg.datas.get(shuxing.ANTI_PHY_CRITC_LEVEL) != null)
				HudModel.getInstance().antiPhyCritcLevelNum = msg.datas.get(shuxing.ANTI_PHY_CRITC_LEVEL);
			//物理暴击程度（初始为200%,即2倍普通伤害）
			if (msg.datas.get(shuxing.PHY_CRIT_PCT) != null)
				HudModel.getInstance().phyCritPct = msg.datas.get(shuxing.PHY_CRIT_PCT);
			//法术暴击
			if (msg.datas.get(shuxing.MAGIC_CRITC_LEVEL) != null)
				HudModel.getInstance().magicCritcLevelNum = msg.datas.get(shuxing.MAGIC_CRITC_LEVEL);
			//法术抗暴
			if (msg.datas.get(shuxing.ANTI_MAGIC_CRITC_LEVEL) != null)
				HudModel.getInstance().antiMagicCritcLevelNum = msg.datas.get(shuxing.ANTI_MAGIC_CRITC_LEVEL);
			//魔法暴击程度（初始为200%）
			if (msg.datas.get(shuxing.MAGIC_CRIT_PCT) != null)
				HudModel.getInstance().magicCritPctNum = msg.datas.get(shuxing.MAGIC_CRIT_PCT);
			//治疗暴击
			if (msg.datas.get(shuxing.HEAL_CRIT_LEVEL) != null)
				HudModel.getInstance().healCritLevelNum = msg.datas.get(shuxing.HEAL_CRIT_LEVEL);
			//治疗暴击程度
			if (msg.datas.get(shuxing.HEAL_CRIT_PCT) != null)
				HudModel.getInstance().healCritPctNum = msg.datas.get(shuxing.HEAL_CRIT_PCT);
			//当前体力
			if (msg.datas.get(shuxing.PHFORCE) != null)
				HudModel.getInstance().phforceNum = msg.datas.get(shuxing.PHFORCE);
			//经验
			if (msg.datas.get(shuxing.EXP) != null)
				HudModel.getInstance().expNum = msg.datas.get(shuxing.EXP);
			//下级经验
			if (msg.datas.get(shuxing.NEXP) != null)
				HudModel.getInstance().nexpNum = msg.datas.get(shuxing.NEXP);
			//人气值
			if (msg.datas.get(shuxing.RENQI) != null)
				HudModel.getInstance().renqiNum = msg.datas.get(shuxing.RENQI);
			//职业贡献度
			if (msg.datas.get(shuxing.SCHOOLFUND) != null)
				HudModel.getInstance().schoolfundNum = msg.datas.get(shuxing.SCHOOLFUND);
			//物理穿透
			if (msg.datas.get(shuxing.WULI_CHUANTOU) != null)
				HudModel.getInstance().wulichuantouNum = msg.datas.get(shuxing.WULI_CHUANTOU);
			//物理抵抗
			if (msg.datas.get(shuxing.WULI_DIKANG) != null)
				HudModel.getInstance().wulidikangNum = msg.datas.get(shuxing.WULI_DIKANG);
			//法术穿透
			if (msg.datas.get(shuxing.FASHU_CHUANTOU) != null)
				HudModel.getInstance().fashuchuantouNum = msg.datas.get(shuxing.FASHU_CHUANTOU);
			//法术抵抗
			if (msg.datas.get(shuxing.FASHU_DIKANG) != null)
				HudModel.getInstance().fashudikangNum = msg.datas.get(shuxing.FASHU_DIKANG);
			//治疗加深
			if (msg.datas.get(shuxing.ZHILIAO_JIASHEN) != null)
				HudModel.getInstance().zhiliaojiashenNum = msg.datas.get(shuxing.ZHILIAO_JIASHEN);
			//技能效果点
			if (msg.datas.get(shuxing.EFFECT_POINT) != null)
				HudModel.getInstance().effectPointNum = msg.datas.get(shuxing.EFFECT_POINT);
			//临时怒气
			if (msg.datas.get(shuxing.TEMP_SP) != null)
				HudModel.getInstance().tempSpNum = msg.datas.get(shuxing.TEMP_SP);
			//师徒声望
			if (msg.datas.get(shuxing.MASTER_REPUTATION) != null)
				HudModel.getInstance().masterReputationNum = msg.datas.get(shuxing.MASTER_REPUTATION);
			//宠物资质上限
			if (msg.datas.get(shuxing.PET_XUEMAI_MAX) != null)
				HudModel.getInstance().petXuemaiMaxNum = msg.datas.get(shuxing.PET_XUEMAI_MAX);
			//宠物低级技能数
			if (msg.datas.get(shuxing.PET_LOW_SKILL) != null)
				HudModel.getInstance().petLowSkillNum = msg.datas.get(shuxing.PET_LOW_SKILL);
			//宠物高级技能数
			if (msg.datas.get(shuxing.PET_HIGH_SKILL) != null)
				HudModel.getInstance().petHighSkillNum = msg.datas.get(shuxing.PET_HIGH_SKILL);
			//宠物超级技能数
			if (msg.datas.get(shuxing.PET_SUPER_SKILL) != null)
				HudModel.getInstance().petSuperSkillNum = msg.datas.get(shuxing.PET_SUPER_SKILL);
			//等级
			if (msg.datas.get(shuxing.LEVEL) != null) {
				HudModel.getInstance().levelNum = msg.datas.get(shuxing.LEVEL);
				HudProxy.getInstance().event(models.LevelUp_EVENT);
				game.modules.activity.models.ActivityProxy._instance.event(game.modules.activity.models.TUISONG_EVENT);
			}
			//宠物寿命
			if (msg.datas.get(shuxing.PET_LIFE) != null)
				HudModel.getInstance().petLifenNum = msg.datas.get(shuxing.PET_LIFE);
			//活跃度幸运星
			if (msg.datas.get(shuxing.ACTIVESTAR) != null)
				HudModel.getInstance().activeStarNum = msg.datas.get(shuxing.ACTIVESTAR);
			//潜能
			if (msg.datas.get(shuxing.POINT) != null)
				HudModel.getInstance().pointNum = msg.datas.get(shuxing.POINT);
			//气力值
			if (msg.datas.get(shuxing.QILIZHI) != null)
				HudModel.getInstance().qilizhiNum = msg.datas.get(shuxing.QILIZHI);
			//气力值上限
			if (msg.datas.get(shuxing.QILIZHI_LIMIT) != null)
				HudModel.getInstance().qilizhiLimitNum = msg.datas.get(shuxing.QILIZHI_LIMIT);
			//宠物出战等级
			if (msg.datas.get(shuxing.PET_FIGHT_LEVEL) != null)
				HudModel.getInstance().petFightLevelNum = msg.datas.get(shuxing.PET_FIGHT_LEVEL);
			//宠物攻击资质
			if (msg.datas.get(shuxing.PET_ATTACK_APT) != null)
				HudModel.getInstance().petAttackAptNum = msg.datas.get(shuxing.PET_ATTACK_APT);
			//宠物防御资质
			if (msg.datas.get(shuxing.PET_DEFEND_APT) != null)
				HudModel.getInstance().petDefendAptNum = msg.datas.get(shuxing.PET_DEFEND_APT);
			//宠物体力资质
			if (msg.datas.get(shuxing.PET_PHYFORCE_APT) != null)
				HudModel.getInstance().petPhyforceAptNum = msg.datas.get(shuxing.PET_PHYFORCE_APT);
			//宠物法力资质
			if (msg.datas.get(shuxing.PET_MAGIC_APT) != null)
				HudModel.getInstance().petMagicAptNum = msg.datas.get(shuxing.PET_MAGIC_APT);
			//宠物速度资质
			if (msg.datas.get(shuxing.PET_SPEED_APT) != null)
				HudModel.getInstance().petSpeedAptNum = msg.datas.get(shuxing.PET_SPEED_APT);
			//宠物躲闪资质
			if (msg.datas.get(shuxing.PET_DODGE_APT) != null)
				HudModel.getInstance().petDodgeAptNum = msg.datas.get(shuxing.PET_DODGE_APT);
			//宠物成长率
			if (msg.datas.get(shuxing.PET_GROW_RATE) != null)
				HudModel.getInstance().petGrowRateNum = msg.datas.get(shuxing.PET_GROW_RATE);
			//活力上限
			if (msg.datas.get(shuxing.ENLIMIT) != null)
				HudModel.getInstance().enlimitNum = msg.datas.get(shuxing.ENLIMIT);
			//体力上限
			if (msg.datas.get(shuxing.PFLIMIT) != null)
				HudModel.getInstance().pflimitNum = msg.datas.get(shuxing.PFLIMIT);
			//宠物大小1-4
			if (msg.datas.get(shuxing.PET_SCALE) != null)
				HudModel.getInstance().petScaleNum = msg.datas.get(shuxing.PET_SCALE);
			//活跃度值
			if (msg.datas.get(shuxing.ACTIVENESS) != null)
				HudModel.getInstance().activenessNum = msg.datas.get(shuxing.ACTIVENESS);
			//暴击抗性等级
			if (msg.datas.get(shuxing.ANTI_CRIT_LEVEL) != null)
				HudModel.getInstance().antiCritLevelNum = msg.datas.get(shuxing.ANTI_CRIT_LEVEL);
			//控制加成
			if (msg.datas.get(shuxing.KONGZHI_JIACHENG) != null)
				HudModel.getInstance().kongzhiJiachengNum = msg.datas.get(shuxing.KONGZHI_JIACHENG);
			//控制免疫
			if (msg.datas.get(shuxing.KONGZHI_MIANYI) != null)
				HudModel.getInstance().kongzhiMianyiNum = msg.datas.get(shuxing.KONGZHI_MIANYI);
			//当前活力
			if (msg.datas.get(shuxing.ENERGY) != null)
				HudModel.getInstance().energyNum = msg.datas.get(shuxing.ENERGY);
			HudProxy.getInstance().event(models.SRefreshRoleData_EVENT);
		}

		/** 比较属性变化前后相差多少
		 * @param oldNum 存放属性变化前的属性值
		 * @param newNum 存放属性变化后的属性值
		 * @param shuxingType 属性类型
		 */
		private compareRoleProper(oldNum: number, newNum: number, shuxingType: number): void {
			if (battle.BattleProxy.inBattle) return;
			if (oldNum != 0) {
				let difference = newNum - oldNum;
				if (difference >= 1) {//属性值增加
					this.event(models.SHOW_CHANGE_DIFFERENCE, [difference, true, shuxingType]);
				}
				else if (difference <= -1) {//属性值减少
					difference = Math.abs(difference);
					this.event(models.SHOW_CHANGE_DIFFERENCE, [difference, false, shuxingType]);
				}
			}
		}

		/**是否有公会 */
		public onSRefreshRoleClan(optcode: number, msg: hanlder.S2C_SRefreshRoleClan) {
			if (msg.clankey > 0) {
				models.HudModel.getInstance().clankey = msg.clankey;
				models.HudModel.getInstance().clanname = msg.clanname;
				RequesterProtocols._instance.c2s_COpenClan();//请求帮派信息
			}
			console.log("-----------公会返回")
			// HudProxy.getInstance().event(models.SRefreshRoleClan);
		}
	}
}