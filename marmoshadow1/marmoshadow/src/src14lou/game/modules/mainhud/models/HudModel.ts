
enum ConfirmWindowType {
	/**确认邀请事件 */
	CONFIRM_INVITE = 1,
	/**确认队伍的归队 */
	CONFIRM_BACKTEAM = 2,
	/** 同意邀请并进行申请 */
	AGREE_RESPONSE = 3
}
/** 弹框语句说明 客户端提示表 */
enum PromptExplain {
	/**邀请玩家进入组队 */
	INVITE_JOIN_TEAM = 420000,
	/**同意 */
	AGREE = 420002,
	/**拒绝 */
	REJECT = 420001,
	/**召唤玩家归队 */
	CAME_BACK_TEAM = 420003,
	/**回归队伍 */
	RETURN_TO_RANKS = 420004,
	/**暂离队伍 */
	TEMPORARY_TO_TEAM = 420005,
	/**升为队长 */
	RISE_TO_CAPTAIN = 420006,
	/**召回队员 */
	RECALL_PLAYER = 420007,
	CREATE_TEAM_REPLY = 420008,        //请创建队伍或者申请入队
	ENSURE = 420009,        //确认
	LEADER_MEMBER_NUM = 420010,        //队长和队员人数
	CONFIRM_DROP = 140402,        //确认丢弃物品提示
	INPUT_MAX_LIMIT = 160044,        //输入数字超出范围
	FULL_OF_BAG = 120057,        //背包已满提示
	SALE_FULL_TIMES = 150505,        //出售上限提示
	CHARGE_TIPS = 150506,        //仙晶不足，请前往充值
	BUY_SUCCESS = 142587,		   //购买成功，花费XX
	FUSHI_NOT_ENOUGH = 142686,		   //浮石数量不足，无法购买
	UPLIMIT_SH = 160013,		   //商会限购购买数量上限
	UPLIMIT_SC = 160014,		   //商城限购购买数量上限
	COMLE_MAIN_PET_TASK = 170037,      //需完成主线宠物任务才可开启功能
	TUI_SONG = 160357,				   //推送消息--暂用
	NO_TARGET = 150023,		   //没有设置目标	
	ACHI_LEVELlIMIT = 160352,		   //该功能xx级开启
	SHORTAGEOF_GOLD_COINS = 160118,   //金币不足
	APPLICATION_FOR_ADMISSION = 144817,//申请入队提示
	RIGHT_ANSWER = 160414,			//回答正确
	ERROR_ANSWER = 160415,			//回答错误
	NO_FAMILY = 150027,				//你没有加入帮派
	CANNO_ANSWER_SELF = 190029,		//自己不可以回答自己求助的问题
	QUCUO_NO_ENOUGH = 190030,		//去错玉不足不可使用
	QUCUO_IMPERIAL_USE = 178004,	//去错玉只能在科举会试使用
	ZHENZHI_NO_ENOUGH = 190031,		//真知玉不足不可使用
	ZHENZHI_IMPERIAL_USE = 178005,	//真知玉只能在科举会试使用
	COMBAT_ASSISTANCE_UPLIMIT = 150001,	 //当前等级只能出战$parameter1$只宠物
	NO_EQUIP_STUNT = 150082,	 	//你当前装备没有特技
	NEXT_ROUND_MANUAL = 150221,  	//下回合进入手动操作
	BANGPAI_ZIJIN_UP = 160069,  	//帮派资金上限提示
	ACTIVITY_LEVEL_LIMIT = 160011,  //需要人物等级达到19级
	SHANGJIA_LIMIT = 420035,  //上架商品最多8个
	GUAJI_LITTLE_LEVEL = 150149,	//挂机怪物太弱提示
	GUAJI_BIG_LEVEL = 150150,		//挂机怪物太强提示
	CHARACTER_IS_TOO_LONG = 150170, //聊天输入字符过长提示
	REPLACE_GEM_IN_NEWEQUIP = 420036, //是否将宝石替换上新装备？
	TEAMMEMBER_TEMPROARILY_PART = 141199,  //暂离了队伍
	TEAMMEMBER_REGRESSION = 162023,  //回归了队伍
	IN_TEAM_GROUP = 150030,         //处于组队状态，无法传送
	IN_TEAM_GROUP_CAPTAIN_OPERATE = 141216,//你在队伍中，无法传送。请队长操作
	LACK_OF_MATERIAL = 168004,		 //缺少材料
	NEXT_ROUND_AUTO = 420039,  	//下回合进入自动操作
	LACK_OF_ITEM = 150020,		//道具不足
	LACK_OF_VITALITY = 150100,	//活力不足
	DONATION_REQUEST = 160369,	//请求捐赠
	DONATION_RESPOND = 160370,	//已被捐赠
	SHENSHOU_CANT_FREE = 162116,	//神兽不能放生
	FIGHT_CANT_FREE = 150040,		//出战不能放生
	ZHUENGBEI_CANT_FREE = 191055,	//宠物身上有装备不能放升
	DEPOT_HOUSE_UNLOCK = 162143,	//仓库解锁成功
	MARKET_TIME_ITEM = 160447,		//物品冻结
	FLAGS_ITEM = 420042,			//物品绑定
	NOT_SELECT_ITEM = 190018,		//请选择关注物品
	ATTENTION_WIN = 190015,			//关注成功
	CANCEL_ATTENTION = 190016,		//取消关注
	GetYINBI = 140984,			//你获得了银币
	HECHONG_CONDITION = 150054,  //人物等级不足$parameter1$级，抓紧时间升级吧
	FRONT_NO_PARTNER = 160018,		//前面没有伙伴了
	BEHIND_NO_PARTNER = 160019,		//后面没有伙伴了
	AUCTION_DISPACK = 160057,		//30级开放拍卖功能
	PK_INVITATION = 160422,			//PK邀请

}
/** 程序内字符串表的提示语句 */
enum Intra_ProgramString {
	/** 科举乡试已经开始，您是否参加？ */
	XIANG_START = 11412,
	/** 科举会试已经开始，您是否参加？ */
	HUI_START = 11413,
	/** 科举殿试已经开始，您是否参加？ */
	DIAN_START = 11414,
	/** 有推送活动已经开始，您是否参加？ */
	ACT_START = 420033,
	/** 你确定要逃跑么？ */
	ESCAPE_CONFIRM = 1435,
	/** 确定 */
	ENSURE = 1556,
	/** 取消 */
	CANCLE = 2036
}
/** 获取活动推送信息 */
enum TuiSongMessage {
	/** 是否开启活动推送 */
	ISOPEN = 0,
	/** 是否已经推送完毕 */
	ISTUISONG = 1,
	/** 活动id */
	ACTID = 2,
}
/** 售卖类型 */
enum SellType {
	/** NPC普通商店 */
	NPC_GENERAL_STORE = 1,
	/** 商会 */
	SHANGHUI_STORE = 2,
	/** 摆摊（拍卖） */
	SALE_STORE = 3,
	/** 商城 */
	SHANGCHENG_STORE = 4
}
/**商店类型 */
enum shopType {
	/**药品商店 */
	DRUG_SHOP = 1,
	/**酒馆老板 */
	BAR_SHOP = 2,
	/**兵器铺 */
	WEAPON_SHOP = 3,
	/**宠物店 */
	PET_SHOP = 4,
	/**商会 */
	SHANGHUI_SHOP = 5,
	/**商城 */
	MALL_SHOP = 6,
	/**声望 */
	PRESTIGE_SHOP = 7,
	/**功勋值 */
	CREDIT_SHOP = 8,
	/**节日积分 */
	FEAST_SHOP = 9,
	/**良师值 */
	MASTER_SHOP = 10,
	/**神兽商店 */
	DIVINE_SHOP = 11,
	/**天梯（60-69） */
	LADDER1_SHOP = 12,
	/**天梯（60-69） */
	LADDER2_SHOP = 13,
	/**天梯（70-89） */
	LADDER3_SHOP = 14,
	/**天梯（70-89） */
	LADDER4_SHOP = 15,
	/**天梯（90-109） */
	LADDER5_SHOP = 16,
	/**天梯（90-109） */
	LADDER6_SHOP = 17,
	/** 拍卖行 */
	SALE_STORE = 18
}
/**人物属性 */
enum shuxing {
	/**体质 */
	CONS = 10,
	/**智力 */
	IQ = 20,
	/**力量 */
	STR = 30,
	/**耐力 */
	ENDU = 40,
	/**敏捷 */
	AGI = 50,
	/**最大生命 */
	MAX_HP = 60,
	/**当前生命上限（小于等于最大生命上限） */
	UP_LIMITED_HP = 70,
	/**当前生命 */
	HP = 80,
	/**最大法力 */
	MAX_MP = 90,
	/**当前法力 */
	MP = 100,
	/**最大怒气 */
	MAX_SP = 110,
	/**怒气 */
	SP = 120,
	/**物理攻击 */
	ATTACK = 130,
	/**物理防御 */
	DEFEND = 140,
	/**法术攻击 */
	MAGIC_ATTACK = 150,
	/**法术防御 */
	MAGIC_DEF = 160,
	/**治疗强度 */
	MEDICAL = 170,
	/**控制命中 */
	SEAL = 180,
	/**控制抗性 */
	UNSEAL = 190,
	/**速度 */
	SPEED = 200,
	/**命中值 */
	HIT_RATE = 210,
	/**躲避值 */
	DODGE_RATE = 220,
	/**物理暴击 */
	PHY_CRITC_LEVEL = 230,
	/**物理抗暴 */
	ANTI_PHY_CRITC_LEVEL = 240,
	/**物理暴击程度（初始为200%,即2倍普通伤害） */
	PHY_CRIT_PCT = 250,
	/**法术暴击 */
	MAGIC_CRITC_LEVEL = 260,
	/**法术抗暴 */
	ANTI_MAGIC_CRITC_LEVEL = 270,
	/**魔法暴击程度（初始为200%） */
	MAGIC_CRIT_PCT = 280,
	/**治疗暴击 */
	HEAL_CRIT_LEVEL = 290,
	/**治疗暴击程度 */
	HEAL_CRIT_PCT = 300,
	/**当前体力 */
	PHFORCE = 450,
	/**经验 */
	EXP = 470,
	/**下级经验 */
	NEXP = 480,
	/**人气值 */
	RENQI = 610,
	/**职业贡献度 */
	SCHOOLFUND = 850,
	/**物理穿透 */
	WULI_CHUANTOU = 950,
	/**物理抵抗 */
	WULI_DIKANG = 960,
	/**法术穿透 */
	FASHU_CHUANTOU = 970,
	/**法术抵抗 */
	FASHU_DIKANG = 980,
	/**治疗加深 */
	ZHILIAO_JIASHEN = 990,
	/**技能效果点 */
	EFFECT_POINT = 1010,
	/**临时怒气 */
	TEMP_SP = 1020,
	/**师徒声望 */
	MASTER_REPUTATION = 1080,
	/**宠物资质上限 */
	PET_XUEMAI_MAX = 1150,
	/**宠物低级技能数 */
	PET_LOW_SKILL = 1170,
	/**宠物高级技能数 */
	PET_HIGH_SKILL = 1180,
	/**宠物超级技能数 */
	PET_SUPER_SKILL = 1190,
	/**等级*/
	LEVEL = 1230,
	/**宠物寿命*/
	PET_LIFE = 1360,
	/**活跃度幸运星*/
	ACTIVESTAR = 1380,
	/**潜能*/
	POINT = 1400,
	/**气力值*/
	QILIZHI = 1410,
	/**气力值上限*/
	QILIZHI_LIMIT = 1420,
	/**宠物出战等级*/
	PET_FIGHT_LEVEL = 1430,
	/**宠物攻击资质*/
	PET_ATTACK_APT = 1440,
	/**宠物防御资质*/
	PET_DEFEND_APT = 1450,
	/**宠物体力资质*/
	PET_PHYFORCE_APT = 1460,
	/**宠物法力资质*/
	PET_MAGIC_APT = 1470,
	/**宠物速度资质*/
	PET_SPEED_APT = 1480,
	/**宠物躲闪资质*/
	PET_DODGE_APT = 1490,
	/**宠物成长率*/
	PET_GROW_RATE = 1500,
	/**活力上限 */
	ENLIMIT = 1520,
	/**体力上限 */
	PFLIMIT = 1530,
	/**宠物大小1-4 */
	PET_SCALE = 1810,
	/**活跃度值 */
	ACTIVENESS = 1820,
	/**暴击抗性等级 */
	ANTI_CRIT_LEVEL = 2090,
	/**控制加成 */
	KONGZHI_JIACHENG = 2130,
	/**控制免疫 */
	KONGZHI_MIANYI = 2140,
	/**当前活力 */
	ENERGY = 3010
}
/**主界面按钮坐标 */
enum pos {
	XPOS_1 = 525,
	XPOS_2 = 422,
	XPOS_3 = 314,
	XPOS_4 = 210,
	XPOS_5 = 105,
	YPOS_1 = -11,
	YPOS_2 = 104,
	YPOS_3 = 217,
	YPOS_4 = 336,
}
/** 功能解锁等级 */
enum unlock {
	/**初始等级 */
	START_LEVEL = 1,
	/**技能解锁等级 */
	SKILL_LEVEL = 14,
	/**帮派解锁等级 */
	BANGPAI_LEVEL = 16,
	/**助战解锁等级 */
	ZHUZHAN_LEVEL = 17,
	/**活动解锁等级 */
	ACTIVITY_LEVEL = 19,
	/**挂机解锁等级 */
	GUAJI_LEVEL = 25,
	/**排行解锁等级 */
	PAIHANG_LEVEL = 31,
	/**强化解锁等级 */
	QIANGHUA_LEVEL = 32,
	/**经验加成图片 */
	EXPUP_LEVEL = 35
}
/**人物通货 */
enum RoleCurrency {
	/**公会DKP */
	GUILD_DKP = 1,
	/**公会贡献 */
	GUILD_DED = 2,
	/**良师值 */
	TEACHER_SCORE = 3,
	/**活动积分 */
	ACTIVE_SCORE = 4,
	/**荣誉值 */
	HONOR_SCORE = 5,
	/**声望值 */
	POP_SCORE = 6,
	/**好友积分 */
	FRIEND_SCORE = 7,
	/**职业贡献 */
	PROF_CONTR = 9,
	/**信用点 */
	EREDITPOINT_SCORE = 10,
	/**天梯币 */
	TIANTI_COIN = 11,
	/**巧匠值 */
	QIAO_JIANG = 12
}
/**引导相关枚举 */
enum YinDaoEnum {
	/**一级引导提示 */
	RENWU_YINDAO_TIP = 31001,
	/**日常副本引导提示 */
	RICHANG_YINDAO_TIP = 33004,
	/**技能引导提示 */
	SKILL_YINDAO_TIP = 33140,
	/**背包引导提示 */
	BAG_YINDAO_TIP = 31043,
	/**宠物引导提示 */
	PET_YINDAO_TIP = 33150,
	/**装备引导穿戴提示 */
	CHUANDAI_YINDAO_TIP = 31044,
	/**宠物加点引导提示 */
	PETPOINT_YINDAO_TIP = 33150,
	/**组队引导提示 */
	ZUIDUI_YINDAO_TIP = 33005,
	/**自动匹配引导提示 */
	PIPEI_YINDAO_TIP = 33007,
	/**重置引导 */
	RESET_YINDAO = 0,
	/**一级引导 */
	RENWU_YINDAO = 1,
	/**日常副本引导 */
	RICHANG_YINDAO = 2,
	/**便捷组队引导 */
	ZUIDUI_YINDAO = 3,
	/**选择日常副本引导 */
	CHOOSE_RICHANG_YINDAO = 4,
	/**自动匹配引导 */
	PIPEI_YINDAO = 5,
	/**宠物头像点击引导 */
	CLICK_PET_YINDAO = 6,
	/**宠物加点方案引导 */
	PET_FANGAN_YINDAO = 7,
	/**技能引导 */
	SKILL_YINDAO = 8,
	/**生活技能点击引导 */
	LIFESKILL_YINDAO = 9,
	/**显示生活技能提示引导 */
	LIFESKILL_TIP_YINDAO = 10,
	/**专精技能点击引导 */
	ZHUANJING_CLICK_YINDAO = 11,
	/**背包引导 */
	BAG_YINDAO = 12,
	/**装备穿戴引导起始序号 */
	CHUANDAI_YINDAO = 100000,
}
module game.modules.mainhud.models {
	export class HudModel {
		public cNPCConfigData: Object = {};
		/** NPC对白配置 */
		public cNpcChatData: Object = {};
		/** NPC服务总表 */
		public cnpcServerConfigData: Object = {};
		/** NPC服务映射表 */
		public CNpcServiceMappingData: Object = {};
		public cNPCInfoData: Object = {};
		/**F服务器经验限制表 */
		public cserviceexpconfigData: Object = {};
		/**箭头效果 */
		public carroweffectData: Object = {};
		/**这个是用来提示有多种加经验的情况 */
		public SExpMessageTipsData: Laya.Dictionary;
		public sceneid: number;//调用地图用的场景ID
		public movesceneid: number;//人物移动地图的场景ID
		public pos: Vector2;
		public mapname: string;
		/**通知客户端刷新人物经验 */
		public SRefreshUserExpData: Laya.Dictionary;
		/** 符石(元宝数量) */
		public fuShiNum: number = 0;
		/**金币数量 */
		public goldNum: number = 0;
		/**银币数量 */
		public sliverNum: number = 0;
		/**职业贡献数量 */
		public zhiyeNum: number = 0;
		/**荣誉值数量 */
		public rongyuNum: number = 0;
		/**声望数量 */
		public shengwangNum: number = 0;
		/**节日积分数量 */
		public jieriNum: number = 0;
		/**良师值数量 */
		public liangshiNum: number = 0;
		/**信用点数量 */
		public xinyongNum: number = 0;
		/** 公会dkp*/
		public dkpNum: number = 0;
		/** 公会贡献*/
		public gonghuiNum: number = 0;
		/** 活动积分*/
		public activeNum: number = 0;
		/** 好友积分*/
		public friendNum: number = 0;
		/** 天梯币*/
		public tiantiNum: number = 0;
		/** 巧匠值*/
		public qiaojiangNum: number = 0;
		/**体质 */
		public tizhiNum: number = 0;
		/**智力 */
		public zhiliNum: number = 0;
		/**力量 */
		public liliangNum: number = 0;
		/**耐力 */
		public nailiNum: number = 0;
		/**敏捷 */
		public minjieNum: number = 0;
		/**最大生命 */
		public maxHpNum: number = 0;
		/**当前生命上限（小于等于最大生命上限） */
		public limitedHpNum: number = 0;
		/**当前生命 */
		public hpNum: number = 0;
		/**最大法力 */
		public maxMpNum: number = 0;
		/**当前法力 */
		public mpNum: number = 0;
		/**最大怒气 */
		public maxSpNum: number = 0;
		/**怒气 */
		public spNum: number = 0;
		/**物理攻击 */
		public attackNum: number = 0;
		/**物理防御 */
		public defendNum: number = 0;
		/**法术攻击 */
		public magicAttackNum: number = 0;
		/**法术防御 */
		public magicDefNum: number = 0;
		/**治疗强度 */
		public medicalNum: number = 0;
		/**控制命中 */
		public sealNum: number = 0;
		/**控制抗性 */
		public unSealNum: number = 0;
		/**速度 */
		public speedNum: number = 0;
		/**命中值 */
		public hitRateNum: number = 0;
		/**躲避值 */
		public dodgeRateNum: number = 0;
		/**物理暴击 */
		public phyCritcLevelNum: number = 0;
		/**物理抗暴 */
		public antiPhyCritcLevelNum: number = 0;
		/**物理暴击程度（初始为200%,即2倍普通伤害） */
		public phyCritPct: number = 0;
		/**法术暴击 */
		public magicCritcLevelNum: number = 0;
		/**法术抗暴 */
		public antiMagicCritcLevelNum: number = 0;
		/**魔法暴击程度（初始为200%） */
		public magicCritPctNum: number = 0;
		/**治疗暴击 */
		public healCritLevelNum: number = 0;
		/**治疗暴击程度 */
		public healCritPctNum: number = 0;
		/**当前体力 */
		public phforceNum: number = 0;
		/**经验 */
		public expNum: number = 0;
		/**下级经验 */
		public nexpNum: number = 0;
		/**人气值 */
		public renqiNum: number = 0;
		/**职业贡献度 */
		public schoolfundNum: number = 0;
		/**物理穿透 */
		public wulichuantouNum: number = 0;
		/**物理抵抗 */
		public wulidikangNum: number = 0;
		/**法术穿透 */
		public fashuchuantouNum: number = 0;
		/**法术抵抗 */
		public fashudikangNum: number = 0;
		/**治疗加深 */
		public zhiliaojiashenNum: number = 0;
		/**技能效果点 */
		public effectPointNum: number = 0;
		/**临时怒气 */
		public tempSpNum: number = 0;
		/**师徒声望 */
		public masterReputationNum: number = 0;
		/**宠物资质上限 */
		public petXuemaiMaxNum: number = 0;
		/**宠物低级技能数 */
		public petLowSkillNum: number = 0;
		/**宠物高级技能数 */
		public petHighSkillNum: number = 0;
		/**宠物超级技能数 */
		public petSuperSkillNum: number = 0;
		/**等级 */
		public levelNum: number = 0;

		/**宠物寿命 */
		public petLifenNum: number = 0;
		/**活跃度幸运星 */
		public activeStarNum: number = 0;
		/**潜能 */
		public pointNum: number = 0;
		/**气力值 */
		public qilizhiNum: number = 0;
		/**气力值上限 */
		public qilizhiLimitNum: number = 0;
		/**宠物出战等级 */
		public petFightLevelNum: number = 0;
		/**宠物攻击资质 */
		public petAttackAptNum: number = 0;
		/**宠物防御资质 */
		public petDefendAptNum: number = 0;
		/**宠物体力资质 */
		public petPhyforceAptNum: number = 0;
		/**宠物法力资质 */
		public petMagicAptNum: number = 0;
		/**宠物速度资质 */
		public petSpeedAptNum: number = 0;
		/**宠物躲闪资质 */
		public petDodgeAptNum: number = 0;
		/**宠物成长率 */
		public petGrowRateNum: number = 0;
		/**活力上限 */
		public enlimitNum: number = 0;
		/**体力上限 */
		public pflimitNum: number = 0;
		/**宠物大小1-4 */
		public petScaleNum: number = 0;
		/**活跃度值 */
		public activenessNum: number = 0;
		/**暴击抗性等级 */
		public antiCritLevelNum: number = 0;
		/**控制加成 */
		public kongzhiJiachengNum: number = 0;
		/**控制免疫 */
		public kongzhiMianyiNum: number = 0;
		/**当前活力 */
		public energyNum: number = 0;
		/**是否开启监听宠物 */
		public isListenerPetInfo: boolean = false;
		/**是否有公会 大于0则是有公会 */
		public clankey: number = 0;
		/**公会名称 */
		public clanname = "";
		/**服务器等级 */
		public serverLevel: number = 0;
		/**服务器开启新等级剩余天数 */
		public newleveldays: number = 0;
		/**当前引导id */
		public yindaoId: number;
		/** 战斗时存储的技能 */
		public battleSkill: any = -1;
		/** 战斗时存储的技能-宠物 */
		public battleSkill_pet: any = -1;
		//跳转问题
		/**任务跳转地图*/
		public jumpmapid: number;
		/**任务NPC坐标*/
		public desnpc: Vector2;
		/**任务npcid*/
		public npcid: number;
		/**读取配置表的任务ID*/
		public eventid: number;
		/**当前任务id（选择的ID）*/
		public taskid: number;
		/**使用道具的ID*/
		public useitemid: number;
		public ishide: number;
		/**任务类型，*/
		public tasktype: number;
		/**使用道具或者装备*/
		public itemstr: string;
		/**是否自动执行*/
		public autodo: number;
		/**任务NPC*/
		public npckey: number;
		/**剧情对话界面 */
		public dialog: game.modules.commonUI.JuQingMediator;
		/**NPC对话界面*/
		public npcui: game.modules.commonUI.NpcDialogMediator;
		/**使用道具界面*/
		public UseItem: game.modules.commonUI.UseToRemindCardMediator;
		/**制作进度条*/
		public makepro: game.modules.commonUI.MakeProgressMediator;
		/**客户端提示*/
		private tips: game.modules.commonUI.DisappearMessageTipsMediator;
		/**自动挂机任务*/
		public autobatt: game.modules.autohangup.AutoHangUpModuls;
		/** 当前要继承的UI节点 */
		public useUI: ui.common.MainHudUI;
		public useapp: AppBase
		/**巡逻状态*/
		public taskxl: number = 0;
		/**进入游戏后，有做任务才能刷新特效或者新任务才能刷新 */
		public joingame: number = 0;
		/**模型和任务一起刷完之后才算全部加载完成 2为两个都加载完毕 */
		public isrefreshall: number = 0;
		/** 目标id */
		public itemid: number = 0;//天机需要的道具
		/** 商店类型 */
		public shoptype: number = 0;//天机需要的类型
		/** 主线是否隐藏了主界面 */
		public hideMain: boolean = false;
		/** 挂机输赢 */
		public HangUpWin: boolean = true;
		/** 判断是否在匹配组队 */
		public isMatch: boolean = false;
		/** 存放上交对象天机仙令任务数据 */
		public tjxlData = [];
		/** 被观战的战斗id */
		public watchedBattleId = 0;
		/** 帮派求助倒计时 */
		public qiuzhuBP: number = 0;
		/** 全服求助倒计时 */
		public qiuzhuQF: number = 0;
		constructor() {
			HudModel._instance = this;
			this.pos = new Vector2();
			this.SRefreshUserExpData = new Laya.Dictionary();
			this.desnpc = new Vector2();
			this.SExpMessageTipsData = new Laya.Dictionary();
		}
		public static _instance: HudModel;
		public static getInstance(): HudModel {
			if (!this._instance) {
				this._instance = new HudModel();
			}
			return this._instance;
		}
		public static clearModelData(): void {
			mainhud.models.HudModel._instance.SExpMessageTipsData = new Laya.Dictionary();
			mainhud.models.HudModel._instance.sceneid = 0;
			mainhud.models.HudModel._instance.movesceneid = 0;
			mainhud.models.HudModel._instance.pos = new Vector2();
			mainhud.models.HudModel._instance.mapname = "";
			mainhud.models.HudModel._instance.SRefreshUserExpData = new Laya.Dictionary();
			mainhud.models.HudModel._instance.fuShiNum = 0;
			mainhud.models.HudModel._instance.goldNum = 0;
			mainhud.models.HudModel._instance.sliverNum = 0;
			mainhud.models.HudModel._instance.zhiyeNum = 0;
			mainhud.models.HudModel._instance.rongyuNum = 0;
			mainhud.models.HudModel._instance.shengwangNum = 0;
			mainhud.models.HudModel._instance.jieriNum = 0;
			mainhud.models.HudModel._instance.liangshiNum = 0;
			mainhud.models.HudModel._instance.xinyongNum = 0;
			mainhud.models.HudModel._instance.dkpNum = 0;
			mainhud.models.HudModel._instance.gonghuiNum = 0;
			mainhud.models.HudModel._instance.activeNum = 0;
			mainhud.models.HudModel._instance.friendNum = 0;
			mainhud.models.HudModel._instance.tiantiNum = 0;
			mainhud.models.HudModel._instance.qiaojiangNum = 0;
			mainhud.models.HudModel._instance.tizhiNum = 0;
			mainhud.models.HudModel._instance.zhiliNum = 0;
			mainhud.models.HudModel._instance.liliangNum = 0;
			mainhud.models.HudModel._instance.nailiNum = 0;
			mainhud.models.HudModel._instance.minjieNum = 0;
			mainhud.models.HudModel._instance.maxHpNum = 0;
			mainhud.models.HudModel._instance.limitedHpNum = 0;
			mainhud.models.HudModel._instance.hpNum = 0;
			mainhud.models.HudModel._instance.maxMpNum = 0;
			mainhud.models.HudModel._instance.mpNum = 0;
			mainhud.models.HudModel._instance.maxSpNum = 0;
			mainhud.models.HudModel._instance.spNum = 0;
			mainhud.models.HudModel._instance.attackNum = 0;
			mainhud.models.HudModel._instance.defendNum = 0;
			mainhud.models.HudModel._instance.magicAttackNum = 0;
			mainhud.models.HudModel._instance.magicDefNum = 0;
			mainhud.models.HudModel._instance.medicalNum = 0;
			mainhud.models.HudModel._instance.sealNum = 0;
			mainhud.models.HudModel._instance.unSealNum = 0;
			mainhud.models.HudModel._instance.speedNum = 0;
			mainhud.models.HudModel._instance.hitRateNum = 0;
			mainhud.models.HudModel._instance.dodgeRateNum = 0;
			mainhud.models.HudModel._instance.phyCritcLevelNum = 0;
			mainhud.models.HudModel._instance.antiPhyCritcLevelNum = 0;
			mainhud.models.HudModel._instance.phyCritPct = 0;
			mainhud.models.HudModel._instance.magicCritcLevelNum = 0;
			mainhud.models.HudModel._instance.antiMagicCritcLevelNum = 0;
			mainhud.models.HudModel._instance.magicCritPctNum = 0;
			mainhud.models.HudModel._instance.healCritLevelNum = 0;
			mainhud.models.HudModel._instance.healCritPctNum = 0;
			mainhud.models.HudModel._instance.phforceNum = 0;
			mainhud.models.HudModel._instance.expNum = 0;
			mainhud.models.HudModel._instance.nexpNum = 0;
			mainhud.models.HudModel._instance.renqiNum = 0;
			mainhud.models.HudModel._instance.schoolfundNum = 0;
			mainhud.models.HudModel._instance.wulichuantouNum = 0;
			mainhud.models.HudModel._instance.wulidikangNum = 0;
			mainhud.models.HudModel._instance.fashuchuantouNum = 0;
			mainhud.models.HudModel._instance.fashudikangNum = 0;
			mainhud.models.HudModel._instance.zhiliaojiashenNum = 0;
			mainhud.models.HudModel._instance.effectPointNum = 0;
			mainhud.models.HudModel._instance.tempSpNum = 0;
			mainhud.models.HudModel._instance.masterReputationNum = 0;
			mainhud.models.HudModel._instance.petXuemaiMaxNum = 0;
			mainhud.models.HudModel._instance.petLowSkillNum = 0;
			mainhud.models.HudModel._instance.petHighSkillNum = 0;
			mainhud.models.HudModel._instance.petSuperSkillNum = 0;
			mainhud.models.HudModel._instance.levelNum = 0;
			mainhud.models.HudModel._instance.petLifenNum = 0;
			mainhud.models.HudModel._instance.activeStarNum = 0;
			mainhud.models.HudModel._instance.pointNum = 0;
			mainhud.models.HudModel._instance.qilizhiNum = 0;
			mainhud.models.HudModel._instance.qilizhiLimitNum = 0;
			mainhud.models.HudModel._instance.petFightLevelNum = 0;
			mainhud.models.HudModel._instance.petAttackAptNum = 0;
			mainhud.models.HudModel._instance.petDefendAptNum = 0;
			mainhud.models.HudModel._instance.petPhyforceAptNum = 0;
			mainhud.models.HudModel._instance.petMagicAptNum = 0;
			mainhud.models.HudModel._instance.petSpeedAptNum = 0;
			mainhud.models.HudModel._instance.petDodgeAptNum = 0;
			mainhud.models.HudModel._instance.petGrowRateNum = 0;
			mainhud.models.HudModel._instance.enlimitNum = 0;
			mainhud.models.HudModel._instance.pflimitNum = 0;
			mainhud.models.HudModel._instance.petScaleNum = 0;
			mainhud.models.HudModel._instance.activenessNum = 0;
			mainhud.models.HudModel._instance.antiCritLevelNum = 0;
			mainhud.models.HudModel._instance.kongzhiJiachengNum = 0;
			mainhud.models.HudModel._instance.kongzhiMianyiNum = 0;
			mainhud.models.HudModel._instance.energyNum = 0;
			mainhud.models.HudModel._instance.isListenerPetInfo = false;
			mainhud.models.HudModel._instance.clankey = 0;
			mainhud.models.HudModel._instance.clanname = "";
			mainhud.models.HudModel._instance.serverLevel = 0;
			mainhud.models.HudModel._instance.newleveldays = 0;
			mainhud.models.HudModel._instance.yindaoId;
			mainhud.models.HudModel._instance.battleSkill = -1;
			mainhud.models.HudModel._instance.battleSkill_pet = -1;
			mainhud.models.HudModel._instance.jumpmapid = 0;
			mainhud.models.HudModel._instance.desnpc = new Vector2();
			mainhud.models.HudModel._instance.npcid = 0;
			mainhud.models.HudModel._instance.eventid = 0;
			mainhud.models.HudModel._instance.taskid = 0;
			mainhud.models.HudModel._instance.useitemid = 0;
			mainhud.models.HudModel._instance.tasktype = -1;
			mainhud.models.HudModel._instance.npckey = 0;
			mainhud.models.HudModel._instance.taskxl = 0;
			mainhud.models.HudModel._instance.joingame = 0;
			mainhud.models.HudModel._instance.isrefreshall = 0;
			mainhud.models.HudModel._instance.itemid = 0;
			mainhud.models.HudModel._instance.shoptype = 0;
			mainhud.models.HudModel._instance.hideMain = false;
			mainhud.models.HudModel._instance.isMatch = false;
			mainhud.models.HudModel._instance.tjxlData = [];
			mainhud.models.HudModel._instance.watchedBattleId = 0;
			mainhud.models.HudModel._instance.qiuzhuBP = 0;
			mainhud.models.HudModel._instance.qiuzhuQF = 0;
		}
		/** 提示语句组装返回 */
		public promptAssembleBack(promptId: number, param?: Array<any>): string {
			let promptData: string = ChatModel.getInstance().chatMessageTips[promptId].msg;
			if (typeof (param) != "undefined") {/** 这里将参数一一替换 */
				for (let paramIndex = 0; paramIndex < param.length; paramIndex++) {
					if (typeof (param[paramIndex]) == "undefined") {/** 如果是undefined则特殊处理数据 */
						promptData = promptData.replace("$parameter" + [(paramIndex + 1)] + "$", " ");
					} else
						promptData = promptData.replace("$parameter" + [(paramIndex + 1)] + "$", param[paramIndex]);
				}
			}
			promptData = this.promptSpecialProcess(promptData);
			return promptData;
		}
		/** 对参数替换完的提示语句再次特殊处理 */
		private promptSpecialProcess(promptData: string): string {
			if (promptData.indexOf("<P t=") != -1 && promptData.indexOf("</P>") != -1) {//特殊处理类似为消息id为162099，消息内容为<span style='color:#00c6ff;fontSize:24'>$parameter1$</span><span style='fontSize:24'>接受了</span><span style='color:#00c6ff;fontSize:24'>$parameter2$</span><span style='fontSize:24'>的挑战，一场为了荣耀和尊严的战斗正式开始。</span><P t="查看" type="13" key="$parameter3$</P>
				let target_1 = '<P t=';
				let targetIndex_1 = promptData.indexOf(target_1);
				let target_2 = '</P>';
				let targetIndex_2 = promptData.indexOf(target_2);
				let targetStr = promptData.substring(targetIndex_1, targetIndex_2 + target_2.length);//截取出类似这种<P t="查看" type="13" key="$parameter3$</P>字符串
				if (targetStr.indexOf(DisplayType.DISPLAY_LIVEDIE.toString())) {//如果是生死战的链接
					let target_3 = '<P t="';
					let targetIndex_3 = targetStr.indexOf(target_3);
					let target_4 = '" type="';
					let targetIndex_4 = targetStr.indexOf(target_4);
					let clickTarget = targetStr.substring(targetIndex_3 + target_3.length, targetIndex_4);//所要点击的目标
					let target_5 = 'key="';
					let targetIndex_5 = targetStr.indexOf(target_5);
					let target_6 = '</P>';
					let targetIndex_6 = targetStr.indexOf(target_6);
					this.watchedBattleId = Number(targetStr.substring(targetIndex_5 + target_5.length, targetIndex_6));//获得能被观战的战斗id
					let _needStr = "<span style='color:#13ff00;fontSize:24;underline:false' href='onClickTarget'>" + "[" + clickTarget + "]" + "</span>";
					promptData = promptData.replace(targetStr, _needStr);
				}
			}
			promptData = FriendModel.getInstance().replaceSpecialMsgContentText(promptData);
			return promptData;
		}
		/**任务语句组装返回*/
		public taskAssembleBack(promptData: string, param?: any, type?: number): any {
			if (typeof (param) != "undefined") {/** 这里将参数一一替换 */
				switch (type) {
					case 1:
						promptData = promptData.replace("$name$", param);
						break;
					case 2:
						promptData = promptData.replace("$number$", param);
						promptData = promptData.replace("$Number$", param);
						break;
					case 3:
						promptData = promptData.replace("$MapName$", param);
						break;
					case 4:
						promptData = promptData.replace("$NPCName$", param);
						break;
					case 5:
						promptData = promptData.replace("$PetName$", param);
						break;
					case 6:
						promptData = promptData.replace("$ItemName$", param);
						break;
					case 7:
						promptData = promptData.replace("$Number1$", param);
						break;
					case 8:
						promptData = promptData.replace("$Number2$", param);
						break;
					case 9:
						promptData = promptData.replace("$Number3$", param);
						break;
					case 10:
						promptData = promptData.replace("$NAME$", param);
						break;
					case 11:
						promptData = promptData.replace("$parameter1$", param);
						break;
					case 12:
						promptData = promptData.replace("$dot$", param);
						break;
					case 13:
						promptData = promptData.replace("$parameter2$", param);
						break;
					case 14:
						promptData = promptData.replace("$Number4$", param);
						break;
					case 15:
						promptData = promptData.replace("$mapName10$", param);
						break;
					case 16:
						promptData = promptData.replace("$time$", param);
						break;
					default:
						break;
				}
			}
			return promptData;

		}
		/** 
		 * 判断是否显示聊天内容
		 * @param type 频道类型
		 */
		public whertherShow(type: number): boolean {
			let SysConfigDic = game.modules.setBasics.models.SetBasicsModel.getInstance().SysConfigDic;
			if (type == ChannelType.CHANNEL_CLAN) {/** 帮派消息 */
				let familySet = SysConfigDic.get(ChannelSet.SET_FAMILY_CHANNEL);
				if (familySet == InterfaceSwitch.INTERFACE_CLOSE) return false
				return true;
			} else if (type == ChannelType.CHANNEL_CURRENT) {/** 当前频道 */
				let currentSet = SysConfigDic.get(ChannelSet.SET_CURRENT_CHANNEL);
				if (currentSet == InterfaceSwitch.INTERFACE_CLOSE) return false;
				return true;
			} else if (type == ChannelType.CHANNEL_PROFESSION) {/** 门派消息 */
				let sectsSet = SysConfigDic.get(ChannelSet.SET_SECTS_CHANNEL);
				if (sectsSet == InterfaceSwitch.INTERFACE_CLOSE) return false;
				return true;
			} else if (type == ChannelType.CHANNEL_TEAM) {/** 队伍消息 */
				let teamSet = SysConfigDic.get(ChannelSet.SET_TEAM_CHANNEL);
				if (teamSet == InterfaceSwitch.INTERFACE_CLOSE) return false;
				return true;
			} else if (type == ChannelType.CHANNEL_WORLD) {/** 世界频道 */
				let worldSet = SysConfigDic.get(ChannelSet.SET_WORLD_CHANNEL);
				if (worldSet == InterfaceSwitch.INTERFACE_CLOSE) return false;
				return true;
			} else if (type == ChannelType.TEAM_APPLY) {/** 组队申请 */
				let zuduiSet = SysConfigDic.get(ChannelSet.SET_ZUDUI_CHANNEL);
				if (zuduiSet == InterfaceSwitch.INTERFACE_CLOSE) return false;
				return true;
			}

		}
		public getpost(mapid: number) {//跳地图随机坐标
			let MapData: WorldMapConfigBaseVo = MapModel.getInstance().WorldMapConfigData[mapid]
			let mainUnit: Unit = this.useapp.sceneObjectMgr.mainUnit
			let x, y: number;
			x = (Math.random() * (MapData.bottomx - MapData.topx) + MapData.topx)
			y = (Math.random() * (MapData.bottomy - MapData.topy) + MapData.topy)
			mainUnit.SetPosX(x);
			mainUnit.SetPosY(y);
			mainUnit.SetPos(x, y);

		}
		/**任务执行 */
		public taskstart(): void {
			game.scene.models.SceneProxy.getInstance().event(game.scene.models.NPC_SELECT, ["", 0])
			game.scene.models.SceneProxy.getInstance().event(game.scene.models.ROLE_SELECT, ["", 0])
			let role: game.scene.models.RoleBasicVo = game.scene.models.SceneModel.getInstance().rolelist.get(game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);
			let team: game.scene.models.TeamOctetsVo = role.rolebasicOctets.datas.get(2);
			if (team) {
				if (team.teamindexstate > 0) {//在队伍中 暂离的话值为负数
					if ((team.teamindexstate >> 4) != 1) {//141216
						let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[PromptExplain.IN_TEAM_GROUP_CAPTAIN_OPERATE];
						this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(this.useapp);
						this.tips.onShow(chattext.msg);
						return;
					}
				}
			}
			if (this.jumpmapid != 0 && (this.tasktype != 22 || (this.desnpc.x != 0 && this.desnpc.y != 0)) && this.tasktype != 90 && this.tasktype != 80) {
				if (this.jumpmapid == 1711) {//帮派地图ID，需要帮派系统才能判断
					if (this.clankey == 0) {//无工会
						return;
					}
					if (game.modules.mainhud.models.HudModel.getInstance().sceneid != this.jumpmapid) {
						this.getpost(this.jumpmapid)
						let mainUnit: Unit = this.useapp.sceneObjectMgr.mainUnit;
						game.scene.models.SceneProxy.getInstance().once(game.scene.models.AUTO_MOVE, this, this.changjing)
						RequesterProtocols._instance.c2s_CEnterClanMap()
					}
					else {
						this.automove();
					}
				}
				//如果需要跳转地图则先跳转再移动，若在同一个地图则直接移动
				else if (game.modules.mainhud.models.HudModel.getInstance().sceneid != this.jumpmapid) {
					this.getpost(this.jumpmapid)
					let mainUnit: Unit = this.useapp.sceneObjectMgr.mainUnit;
					game.scene.models.SceneProxy.getInstance().once(game.scene.models.AUTO_MOVE, this, this.changjing)
					RequesterProtocols._instance.c2s_req_goto(this.jumpmapid, parseInt(mainUnit.pos.x.toFixed(0)), parseInt(mainUnit.pos.y.toFixed(0)));
				}
				else {//同地图，若npcid有，则直接找寻地图NPC
					this.automove();
				}
			}
			else {//不需要跳转地图，需要打开界面的
				if (this.tasktype == 58) {//等级限制
					ModuleManager.show(ModuleNames.ACTIVITY, this.useapp)
				}
				else if (this.tasktype == 80) {//学习技能
					ModuleManager.show(ModuleNames.SKILL, this.useapp)
				}
				else if (this.eventid == 500101) {//帮派建立
					//提示弹窗
					if (this.clankey == 0) {//弹出未建帮派的提示框
						let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[145077];
						this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(this.useapp);
						this.tips.onShow(chattext.msg);
					}
				}
				else if (this.eventid == 1080000) {//暗夜任务
					ModuleManager.show(ModuleNames.TIAN_JI_XIAN_LING, this.useapp)
				}
				else if (this.eventid == 500502) {//宝石合成
					ModuleManager.show(ModuleNames.STRENG_THENING, this.useapp)
				}
				else if (this.eventid == 500504) {//宝石镶嵌
					ModuleManager.show(ModuleNames.STRENG_THENING, this.useapp)
				}
				else if (this.eventid >= 2100202 && this.eventid <= 2511202) {//天机仙令
					this.automove()
				}
				else if (this.eventid < 190000 && this.eventid > 180000) {//主线任务,是否使用道具  战斗和使用道具的判断
					this.directuse();
				}
				else if (this.eventid >= 1010000 && this.eventid <= 1150005) {//门派任务or 推荐任务 循环任务
					//当地图ID为零需要跳转地图时
					let schoolinfo: CRepeatTaskBaseVo = Taskmodels.getInstance().cRepeatTaskData[this.eventid];
					if (schoolinfo.etasktype == 5) {//购买宠物
						let info: game.modules.task.models.SRefreshSpecialQuestVo = Taskmodels.getInstance().schooltask.get(schoolinfo.eactivetype);
						if (info.queststate != 3) {//如果没有该宠物则将NPCid改为灵兽异人
							this.npcid = 19040;
						}
						let npcinfo: CNPCConfigBaseVo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[this.npcid];
						if (game.modules.mainhud.models.HudModel.getInstance().sceneid != npcinfo.mapid) {
							this.getpost(npcinfo.mapid)
							let mainUnit: Unit = this.useapp.sceneObjectMgr.mainUnit;
							game.scene.models.SceneProxy.getInstance().once(game.scene.models.AUTO_MOVE, this, this.changjing)
							RequesterProtocols._instance.c2s_req_goto(npcinfo.mapid, parseInt(mainUnit.pos.x.toFixed(0)), parseInt(mainUnit.pos.y.toFixed(0)));
						}
						else {
							this.automove();//同地图就直接行走
						}
					}
					else if (schoolinfo.etasktype == 1) {//送信
						let npcinfo: CNPCConfigBaseVo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[this.npcid];
						if (game.modules.mainhud.models.HudModel.getInstance().sceneid != npcinfo.mapid) {
							game.scene.models.SceneProxy.getInstance().once(game.scene.models.AUTO_MOVE, this, this.changjing)
							RequesterProtocols._instance.c2s_req_goto(npcinfo.mapid, parseInt(npcinfo.xPos.toFixed(0)), parseInt(npcinfo.yPos.toFixed(0)));
						}
						else {
							this.automove();
						}
					}
					else if (schoolinfo.etasktype == 4) {//购买药材 						
						let info: game.modules.task.models.SRefreshSpecialQuestVo = Taskmodels.getInstance().schooltask.get(schoolinfo.eactivetype);
						if (info.queststate != 3) {//药店老板
							switch (info.questtype) {
								case 1060002:
									this.npcid = 19037;
									break;
								case 1060004:
									this.npcid = 19037;
									break;
								case 1060005:
									this.npcid = 19041;
									break;
								case 1060007:
									this.npcid = 19039;
									break;
								case 1060009://拍卖界面
									this.npcid = 0
									ModuleManager.show(ModuleNames.SALE, this.useapp)
									break;
								case 1060014://拍卖界面
									this.npcid = 0
									ModuleManager.show(ModuleNames.SALE, this.useapp)
									break;
								default:
									break;
							}

						}
						if (this.npcid == 0)
							return;
						let npcinfo: CNPCConfigBaseVo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[this.npcid];
						if (game.modules.mainhud.models.HudModel.getInstance().sceneid != npcinfo.mapid) {
							game.scene.models.SceneProxy.getInstance().once(game.scene.models.AUTO_MOVE, this, this.changjing)
							RequesterProtocols._instance.c2s_req_goto(npcinfo.mapid, parseInt(npcinfo.xPos.toFixed(0)), parseInt(npcinfo.yPos.toFixed(0)));
						}
						else {
							this.automove();
						}
					}
					else if (schoolinfo.etasktype == 9) {//挑战
						let info: game.modules.task.models.SRefreshSpecialQuestVo = Taskmodels.getInstance().schooltask.get(schoolinfo.eactivetype);
						let npcinfo: CNPCConfigBaseVo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[this.npcid];
						if (game.modules.mainhud.models.HudModel.getInstance().sceneid != npcinfo.mapid) {
							game.scene.models.SceneProxy.getInstance().once(game.scene.models.AUTO_MOVE, this, this.changjing)
							RequesterProtocols._instance.c2s_req_goto(npcinfo.mapid, parseInt(npcinfo.xPos.toFixed(0)), parseInt(npcinfo.yPos.toFixed(0)));

						}
						else {
							this.automove();
						}
					}
				}
			}
		}
		/** 场景加载完毕*/
		public changjing() {
			game.modules.mainhud.models.HudProxy.getInstance().once(game.modules.mainhud.models.CHNANGJING_PRO, this, this.automove)
		}
		/**自动行走 */
		public automove(): void {
			if (this.npcid == 0) {// 需区分主线和推荐任务		
				this.useapp.sceneObjectMgr.mainUnit.goto(this.desnpc.x, this.desnpc.y);
				if ((this.taskid >= 180000 && this.taskid <= 190000) || (this.taskid >= 500101 && this.taskid <= 600078)) {//主线 支线					
					let maininfo: MissionCMainMissionInfoBaseVo = Taskmodels.getInstance().missionCMainMissionInfoData[this.taskid]
					if (maininfo.MissionType == 56) {//区域触发/护送
						if (this.jumpmapid >= 1801 && this.jumpmapid <= 1830) {
							this.useapp.sceneObjectMgr.mainUnit.xunluo = 1
						}
						else {
							this.useapp.sceneObjectMgr.mainUnit.autowalk = 1
						}
						if (this.desnpc.x == game.modules.mainhud.models.HudModel.getInstance().pos.x && this.desnpc.y == game.modules.mainhud.models.HudModel.getInstance().pos.y) {
							this.talkdialog(this.taskid)
						}
						else {
							game.scene.models.SceneProxy.getInstance().once(game.scene.models.MOVE_STOP, this, this.talkdialog, [this.taskid])
							console.log("-------------------move 3");
							RequesterProtocols._instance.c2s_role_move(this.useapp.sceneObjectMgr.mainUnit.pos, this.desnpc, game.modules.mainhud.models.HudModel.getInstance().movesceneid);

						}
					}
					else if (maininfo.MissionType == 22) {
						this.useapp.sceneObjectMgr.mainUnit.autowalk = 1
						if (this.desnpc.x == game.modules.mainhud.models.HudModel.getInstance().pos.x && this.desnpc.y == game.modules.mainhud.models.HudModel.getInstance().pos.y) {
							this.useapp.sceneObjectMgr.mainUnit.stopwalk = 1
							this.directuse()
						}
						else {
							console.log("-------------------move 4");
							RequesterProtocols._instance.c2s_role_move(this.useapp.sceneObjectMgr.mainUnit.pos, this.desnpc, game.modules.mainhud.models.HudModel.getInstance().movesceneid);
							game.scene.models.SceneProxy.getInstance().once(game.scene.models.MOVE_STOP, this, this.directuse)
						}
					}
					else if (maininfo.MissionType == 60) {
						this.useapp.sceneRoot.hangup = 1
						this.taskxl = 1//巡逻状态
						this.useapp.sceneObjectMgr.mainUnit.xunluo = 1
					}
				}
				else if (this.taskid >= 2100202 && this.taskid <= 2511202) {
					this.useapp.sceneRoot.hangup = 1
					this.taskxl = 1//巡逻状态
					this.useapp.sceneObjectMgr.mainUnit.xunluo = 1
				}
				else {
					let info: game.modules.task.models.SRefreshSpecialQuestVo = Taskmodels.getInstance().schooltask.get(this.taskid);
					let taskrepeat: CRepeatTaskBaseVo = game.modules.task.models.TaskModel.getInstance().cRepeatTaskData[info.questtype]
					if (taskrepeat.etasktype == 2) {	//使用道具						
						if (this.desnpc.x == game.modules.mainhud.models.HudModel.getInstance().pos.x && this.desnpc.y == game.modules.mainhud.models.HudModel.getInstance().pos.y) {
							this.useitem();
						}
						else {
							this.useapp.sceneObjectMgr.mainUnit.autowalk = 1
							game.scene.models.SceneProxy.getInstance().once(game.scene.models.MOVE_STOP, this, this.useitem)
						}
					}
					else if (taskrepeat.etasktype == 6 || taskrepeat.etasktype == 3) {
						this.useapp.sceneObjectMgr.mainUnit.xunluo = 1
						this.useapp.sceneRoot.hangup = 1
						this.taskxl = 1//巡逻状态										
					}
				}
			}
			else {//	有目标NPC，寻找NPC，跳至NPC所在的地图			
				for (let key in game.scene.models.SceneModel.getInstance().npclist.keys) {
					let npcinfo: game.scene.models.NpcBasicVo = game.scene.models.SceneModel.getInstance().npclist.get(game.scene.models.SceneModel.getInstance().npclist.keys[key]);
					if (npcinfo.id == this.npcid) {
						game.scene.models.SceneProxy.getInstance().event(game.scene.models.NPC_SELECT, [npcinfo.npckey, 1])
						if (Math.abs(game.modules.mainhud.models.HudModel.getInstance().pos.x - parseInt(npcinfo.pos.x.toFixed(0))) < 1 && Math.abs(game.modules.mainhud.models.HudModel.getInstance().pos.y - parseInt(npcinfo.pos.y.toFixed(0))) < 1) {
							//若是在该NPC点则直接进行对话
							this.useapp.sceneObjectMgr.mainUnit.stopwalk = 1
							this.movestop(npcinfo.id, npcinfo.npckey);
						}
						else {//若不在NPC附近直接开始行走
							this.useapp.sceneObjectMgr.mainUnit.autowalk = 1
							console.log("-------------------move 5");
							RequesterProtocols._instance.c2s_role_move(this.useapp.sceneObjectMgr.mainUnit.pos, npcinfo.pos, game.modules.mainhud.models.HudModel.getInstance().movesceneid);
							game.scene.models.SceneProxy.getInstance().once(game.scene.models.MOVE_STOP, this, this.movestop, [npcinfo.id, npcinfo.npckey]);
							this.useapp.sceneObjectMgr.mainUnit.goto(parseInt(npcinfo.pos.x.toFixed(0)), parseInt(npcinfo.pos.y.toFixed(0)));
						}
						break;
					}
				}
			}
		}
		/**直接使用 */
		public directuse(): void {
			if ((this.desnpc.x == game.modules.mainhud.models.HudModel.getInstance().pos.x && this.desnpc.y == game.modules.mainhud.models.HudModel.getInstance().pos.y) || this.npcid == 0) {
				this.UseItem = new game.modules.commonUI.UseToRemindCardMediator(this.useapp);
				let schoolinfo: MissionCMainMissionInfoBaseVo = Taskmodels.getInstance().missionCMainMissionInfoData[this.eventid];
				this.useitemid = this.getEquipItemIdForSex(schoolinfo.ActiveInfoUseItemID);
				let _ActiveInfoUseItemID: number = this.getEquipItemIdForSex(schoolinfo.ActiveInfoUseItemID);
				game.modules.task.models.TaskProxy.getInstance().once(game.modules.task.models.USEITEM, this, this.useitems);
				let strinfo: CStringResBaseVo
				if (this.tasktype == 22) {
					strinfo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[2668]
				}
				else if (this.tasktype == 90) {
					strinfo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[2666]
				}
				this.UseItem.hide()
				this.UseItem.init(_ActiveInfoUseItemID, strinfo.msg);
			}
		}
		/** 区分男女角色来获取所使用的武器道具id */
		private getEquipItemIdForSex(activeInfoUseItemID: string): number {
			let _equipId: number = 0;
			let _index = activeInfoUseItemID.indexOf(";");
			if (_index == -1) {
				_equipId = Number(activeInfoUseItemID);
				return _equipId;
			}
			let _roleShape = LoginModel.getInstance().roleDetail.shape;//获取当前玩家角色的人物模型
			let _createRoleConfigBinDic = LoginModel.getInstance().createRoleConfigBinDic;//获得创建角色配置表
			let _sex = _createRoleConfigBinDic[_roleShape]["sex"];//获取性别
			if (_sex == RoleSex.MAN) {//如果性别为男的
				_equipId = Number(activeInfoUseItemID.substring(0, _index));
			}
			else {//如果性别为女的
				_equipId = Number(activeInfoUseItemID.substring(_index + 1, activeInfoUseItemID.length));
			}
			return _equipId;
		}
		/**主线区域触发护送 */
		public talkdialog(taskid: number): void {
			if (taskid != this.taskid)
				return;
			if (this.desnpc.x == game.modules.mainhud.models.HudModel.getInstance().pos.x && this.desnpc.y == game.modules.mainhud.models.HudModel.getInstance().pos.y) {
				this.useapp.sceneObjectMgr.mainUnit.stopwalk = 1
				let maininfo: MissionCMainMissionInfoBaseVo = Taskmodels.getInstance().missionCMainMissionInfoData[this.taskid]
				if (maininfo.ProcessBarText) {
					this.makepro = new game.modules.commonUI.MakeProgressMediator(this.useapp)
					this.makepro.init(null, maininfo.ProcessBarText)
					game.modules.task.models.TaskProxy.getInstance().once(game.modules.task.models.MAKESUCCESS, this, this.makesucess);
				}
				else {
					ModuleManager.hide(ModuleNames.MAIN_MENU);
					this.hideMain = true;
					models.HudProxy.getInstance().event(models.OPEN_EVENT);
					this.dialog = new game.modules.commonUI.JuQingMediator(this.useapp);
					this.dialog.init(this.taskid, 0, maininfo.ScenarioInfoFinishConversationList, maininfo.ScenarioInfoFinishNpcID);
				}
			}
		}
		/**使用模型道具*/
		public useitem(): void {
			if (this.desnpc.x == game.modules.mainhud.models.HudModel.getInstance().pos.x && this.desnpc.y == game.modules.mainhud.models.HudModel.getInstance().pos.y) {
				if (this.UseItem) this.UseItem.hide();
				//道具使用
				this.useapp.sceneObjectMgr.mainUnit.stopwalk = 1;
				let info: game.modules.task.models.SRefreshSpecialQuestVo = Taskmodels.getInstance().schooltask.get(this.taskid);
				this.useitemid = info.dstitemid
				this.UseItem = new game.modules.commonUI.UseToRemindCardMediator(this.useapp);
				let strinfo: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[2668]
				this.UseItem.init(this.useitemid, strinfo.msg);
				game.modules.task.models.TaskProxy.getInstance().once(game.modules.task.models.USEITEM, this, this.useitems);
			}
		}
		public useitems(): void {//最终道具的使用			
			if (this.useitemid >= 110000 && this.useitemid < 111000) {
				game.modules.task.models.TaskProxy.getInstance().once(game.modules.task.models.MAKESUCCESS, this, this.makesucess)
				this.makepro = new game.modules.commonUI.MakeProgressMediator(this.useapp);
				this.makepro.init(this.useitemid);
			}
			else {
				let baginfo: game.modules.bag.models.BagVo = game.modules.bag.models.BagModel.getInstance().bagMap[1];
				for (var index = 0; index < baginfo.items.length; index++) {
					let iteminfo: game.modules.bag.models.ItemVo = baginfo.items[index]
					if (iteminfo.id == this.useitemid) {
						if (this.tasktype == 22)//道具
							RequesterProtocols._instance.c2s_CAppend_Item(iteminfo.key, 0, game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);
						else if (this.tasktype == 90) {//装备
							let equipinfo: EquipEffectBaseVo = StrengTheningModel.getInstance().equipEffectData[iteminfo.id]
							RequesterProtocols._instance.c2s_CPutOn_Equip(iteminfo.key, equipinfo.eequiptype);
						}
					}
				}
			}
		}
		/**进度条制作*/
		private makesucess(issucess: number): void {//制作成功 issucess为1 否则判定为失败
			if (issucess == 1) {//制作成功
				let itemid: number;
				if (this.taskid >= 180000 && this.taskid <= 190000) {//主线
					let info: MissionCMainMissionInfoBaseVo = Taskmodels.getInstance().missionCMainMissionInfoData[this.taskid];
					itemid = this.getEquipItemIdForSex(info.ActiveInfoUseItemID);
				}
				else {//推荐任务
					let info: game.modules.task.models.SRefreshSpecialQuestVo = Taskmodels.getInstance().schooltask.get(this.taskid);
					itemid = info.dstitemid
				}
				if (itemid == 0) {
					this.dialog = new game.modules.commonUI.JuQingMediator(this.useapp);
					this.dialog.init(this.taskid, 0)
				}
				else {
					let baginfo: game.modules.bag.models.BagVo = game.modules.bag.models.BagModel.getInstance().bagMap[5];
					for (var index = 0; index < baginfo.items.length; index++) {
						let iteminfo: game.modules.bag.models.ItemVo = baginfo.items[index]
						if (iteminfo.id == itemid) {
							RequesterProtocols._instance.c2s_CAppend_Item(iteminfo.key, 0, game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);
							break;
						}
					}
				}
			}
		}
		/**角色停止后与NPC交流*/
		public movestop(npcid: number, npckey: number): void {//npcid npckey
			if (this.useapp.sceneRoot.istask == 0 || this.useapp.sceneRoot.istask == 1)
				return;
			let npcinfo: game.scene.models.NpcBasicVo = game.scene.models.SceneModel.getInstance().npclist.get(npckey);
			if (npcinfo) {
				if (Math.abs(game.modules.mainhud.models.HudModel.getInstance().pos.x - parseInt(npcinfo.pos.x.toFixed(0))) < 1 && Math.abs(game.modules.mainhud.models.HudModel.getInstance().pos.y - parseInt(npcinfo.pos.y.toFixed(0))) < 1) {
					RequesterProtocols._instance.c2s_visit_npc(npckey);
					this.useapp.sceneObjectMgr.mainUnit.stopwalk = 1
					game.scene.models.SceneProxy.getInstance().once(game.scene.models.NPC_DIALOG, this, this.initnpc);
					console.log("-------------------move 6");
					RequesterProtocols._instance.c2s_role_move(this.useapp.sceneObjectMgr.mainUnit.target, this.useapp.sceneObjectMgr.mainUnit.target, game.modules.mainhud.models.HudModel.getInstance().movesceneid);
				}
			}
		}
		/**NPC数据*/
		public initnpc(npckey: number, services: Array<number>, scenarioquests: Array<number>): void {//npckey  服务的内容 情景对话 后面两个参数可为空
			this.npckey = npckey
			let npc: game.scene.models.NpcBasicVo = game.scene.models.SceneModel.getInstance().npclist.get(npckey);
			let npcinfo: CNPCConfigBaseVo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[npc.id];
			if (this.taskid > 180000 && this.taskid < 190000 && scenarioquests && scenarioquests[0] > 180000 && scenarioquests[0] < 190000) {//主线  
				//若是战斗的则先进入NPC对话框再进入剧情狂
				let maininfo: MissionCMainMissionInfoBaseVo = Taskmodels.getInstance().missionCMainMissionInfoData[this.taskid]
				if (maininfo.MissionType == 40 || maininfo.MissionType == 12) {
					this.npcui = new game.modules.commonUI.NpcDialogMediator(this.useapp);
					this.npcui.init(npckey, services, scenarioquests, null, null, null, maininfo.BattlePreString);
				}
				else {
					ModuleManager.hide(ModuleNames.MAIN_MENU);
					this.hideMain = true;
					models.HudProxy.getInstance().event(models.OPEN_EVENT);
					this.dialog = new game.modules.commonUI.JuQingMediator(this.useapp);
					this.dialog.init(scenarioquests[0], npckey);
				}
			}
			else if (this.taskid > 500000 && this.taskid < 600000) {//支线
				let task: game.modules.task.models.MissionInfoVo = Taskmodels.getInstance().accepttask.get(this.taskid)
				if (task.missionstatus == 3) {//任务完成
					this.dialog = new game.modules.commonUI.JuQingMediator(this.useapp);
					this.dialog.init(this.taskid, npckey);
				}
				else {//任务未完成
					this.npcui = new game.modules.commonUI.NpcDialogMediator(this.useapp);
					this.npcui.init(npckey, services, scenarioquests);
				}
			}
			else if (this.taskid >= 1010000 && this.taskid <= 1200000) {//推荐任务or可接任务
				//判断下任务类型				
				let info: game.modules.task.models.SRefreshSpecialQuestVo = Taskmodels.getInstance().schooltask.get(this.taskid);
				let acceptableid: number = 0;
				if (info) {//推荐
					let task: CRepeatTaskBaseVo = game.modules.task.models.TaskModel.getInstance().cRepeatTaskData[info.questtype];
					if (task.etasktype == 1) {//送信聊天
						//循环任务对话配置表
						let curnum: number;
						for (var index = 0; index < services.length; index++) {
							if (services[index] == 100035 || services[index] == 100183) {//自动完成
								curnum = index;
								break;
							}
						}
						let talkinfo: CRepeatTaskChatBaseVo = game.modules.task.models.TaskModel.getInstance().cRepeatTaskChatData[task.nnpcchatid]
						this.npcui = new game.modules.commonUI.NpcDialogMediator(this.useapp);
						this.npcui.init(npckey, services, scenarioquests, talkinfo.strmsg, null, curnum + scenarioquests.length);
					}
					else if (task.etasktype == 5) {//寻找宠物	任务结束后对话类型8
						let curnum: number;
						game.modules.task.models.TaskModel.getInstance().chattype = 8;
						this.npcui = new game.modules.commonUI.NpcDialogMediator(this.useapp);
						this.npcui.init(npckey, services, scenarioquests, "petshop", info.dstitemid, 0 + scenarioquests.length);
					}
					else if (task.etasktype == 4) {//寻找药品
						this.npcui = new game.modules.commonUI.NpcDialogMediator(this.useapp);
						this.npcui.init(npckey, services, scenarioquests, "yaopin", info.dstitemid, 0 + scenarioquests.length);
					}
					else if (task.etasktype == 7 || task.etasktype == 9) {//切磋
						this.npcui = new game.modules.commonUI.NpcDialogMediator(this.useapp);
						this.npcui.init(npckey, services, scenarioquests);
					}
				}
				else {//可接任务
					this.npcui = new game.modules.commonUI.NpcDialogMediator(this.useapp);
					this.npcui.init(npckey, services, scenarioquests);
				}
			}
			else {//通用NPC对话
				this.dialog = new game.modules.commonUI.JuQingMediator(this.useapp);
				this.dialog.init(this.taskid, npckey);
			}
		}
		//** 不属于任务的跳转//
		public jumpmap(mapid: number, npcid: number, itemid?: number, shoptype?: number) {//传送的地图id，npcid 便于在寻路中找到该NPC
			if (itemid) {
				this.itemid = itemid
				this.shoptype = shoptype
			}
			else {
				this.itemid = 0
				this.shoptype = 0
			}
			if (game.modules.mainhud.models.HudModel.getInstance().sceneid != mapid) {
				this.getpost(mapid)
				let mainUnit: Unit = this.useapp.sceneObjectMgr.mainUnit;
				game.scene.models.SceneProxy.getInstance().once(game.scene.models.AUTO_MOVE, this, this.findnpc, [npcid])
				RequesterProtocols._instance.c2s_req_goto(mapid, parseInt(mainUnit.pos.x.toFixed(0)), parseInt(mainUnit.pos.y.toFixed(0)));
			}
			else {
				this.findnpc(npcid)
			}
		}
		/**寻找NPC*/
		public findnpc(npcid: number): void {// 将地图中的NPC与NPCid进行对比
			this.useapp.sceneObjectMgr.mainUnit.autowalk = 1
			for (let key in game.scene.models.SceneModel.getInstance().npclist.keys) {
				let _npclist = game.scene.models.SceneModel.getInstance().npclist;
				let npcinfo: game.scene.models.NpcBasicVo = _npclist.get(_npclist.keys[key]);
				if (npcinfo.id == npcid) {
					if (Math.abs(game.modules.mainhud.models.HudModel.getInstance().pos.x - parseInt(npcinfo.pos.x.toFixed(0))) < 1 && Math.abs(game.modules.mainhud.models.HudModel.getInstance().pos.y - parseInt(npcinfo.pos.y.toFixed(0))) < 1) {
						//若是在该NPC点则直接进行对话
						this.movestops(npcinfo.id, npcinfo.npckey);
					}
					else {
						console.log("-------------------move 7");
						console.log("-------自动寻路坐标：", this.useapp.sceneObjectMgr.mainUnit.pos);
						console.log("-------自动寻路坐标：", npcinfo.pos);
						RequesterProtocols._instance.c2s_role_move(this.useapp.sceneObjectMgr.mainUnit.pos, npcinfo.pos, game.modules.mainhud.models.HudModel.getInstance().movesceneid);
						game.scene.models.SceneProxy.getInstance().once(game.scene.models.MOVE_STOP, this, this.movestops, [npcinfo.id, npcinfo.npckey]);
						this.useapp.sceneObjectMgr.mainUnit.goto(parseInt(npcinfo.pos.x.toFixed(0)), parseInt(npcinfo.pos.y.toFixed(0)));
					}
					break;
				}
			}
		}
		/**人物停止移动*/
		public movestops(npcid: number, npckey: number): void {//停止时候的判断
			this.useapp.sceneObjectMgr.mainUnit.stopwalk = 1
			if (this.useapp.sceneRoot.istask == 0 || this.useapp.sceneRoot.istask == 1)//判断停止时是有任务点击触发还是点击场景触发
				return;
			let _npclist = game.scene.models.SceneModel.getInstance().npclist;
			let npcinfo: game.scene.models.NpcBasicVo = _npclist.get(npckey);
			console.log("-------自动寻路坐标x：", game.modules.mainhud.models.HudModel.getInstance().pos.x);
			console.log("-------自动寻路坐标x：", parseInt(npcinfo.pos.x.toFixed(0)));
			console.log("-------自动寻路坐标x：", Math.abs(game.modules.mainhud.models.HudModel.getInstance().pos.x - parseInt(npcinfo.pos.x.toFixed(0))));
			console.log("-------自动寻路坐标y：", Math.abs(game.modules.mainhud.models.HudModel.getInstance().pos.y - parseInt(npcinfo.pos.y.toFixed(0))));
			if (npcinfo) {
				if (Math.abs(game.modules.mainhud.models.HudModel.getInstance().pos.x - parseInt(npcinfo.pos.x.toFixed(0))) < 1 && Math.abs(game.modules.mainhud.models.HudModel.getInstance().pos.y - parseInt(npcinfo.pos.y.toFixed(0))) < 1) {
					RequesterProtocols._instance.c2s_visit_npc(npckey);
					game.scene.models.SceneProxy.getInstance().once(game.scene.models.NPC_DIALOG, this, this.initnpcs);
					console.log("-------------------move 8");
					RequesterProtocols._instance.c2s_role_move(this.useapp.sceneObjectMgr.mainUnit.target, this.useapp.sceneObjectMgr.mainUnit.target, game.modules.mainhud.models.HudModel.getInstance().movesceneid);
				}
			}
		}
		/**访问NPC*/
		public initnpcs(npckey: number, services: Array<number>, scenarioquests: Array<number>): void {
			this.npcui = new game.modules.commonUI.NpcDialogMediator(this.useapp);
			if (this.itemid != 0) {
				this.directOpenShop(this.itemid, this.shoptype);
			}
			else {
				this.npcui.init(npckey, services, scenarioquests);
			}
		}
		/** 
		 * 不通过NPC打开不同类型的商店
		 * @param itemid 目标id
		 * @param shoptype 目标所能被购买到的商店的类型
		 */
		public directOpenShop(itemid: number, shoptype: number): void {
			switch (shoptype) {
				case shopType.DRUG_SHOP://药品商店
					var _yaopinShop = new game.modules.roleinfo.RoleShopMediator(this.useapp, shopType.DRUG_SHOP);
					_yaopinShop.onShow(itemid);
					break;
				case shopType.BAR_SHOP://酒馆
					var _jiuguan = new game.modules.roleinfo.RoleShopMediator(this.useapp, shopType.BAR_SHOP);
					_jiuguan.onShow(itemid);
					break;
				case shopType.WEAPON_SHOP://兵器铺（装备商店）
					var _bingqipu = new game.modules.roleinfo.RoleShopMediator(this.useapp, shopType.WEAPON_SHOP);
					_bingqipu.onShow(itemid);
					break;
				case shopType.PET_SHOP://宠物商店
					var _petshop = new game.modules.commonUI.PetShopMediator(this.useapp);
					_petshop.init(itemid, 1);
					break;
				case shopType.SHANGHUI_SHOP://商会
					shop.models.ShopModel.getInstance().itemId = itemid;
					ModuleManager.show(ModuleNames.SHOP, this.useapp);
					break;
				case shopType.MALL_SHOP://商城
					shop.models.ShopModel.getInstance().scItemId = itemid;
					ModuleManager.jumpPage(ModuleNames.SHOP, shopMediatorType.SHANGCHANG, this.useapp);
					break;
				case shopType.SALE_STORE://拍卖行
					ModuleManager.show(ModuleNames.SALE, this.useapp);
					sale.models.SaleModel.getInstance().saleTargetId = itemid;
					game.modules.sale.models.SaleProxy._instance.event(game.modules.sale.models.SearchItemResult);
					break;
			}
		}

		/** 设置特殊按钮位置信息
		 * @param lastword 组装语句最后一个子节点长度-1
		 * @param apply_btn 组装语句按钮
		 * @param chatContent 组装语句富文本框
		 * @param speakForYourself 是否是自己发
		 */
		public setApplyBtnPos(lastword: number, apply_btn: Laya.Button, content: Laya.HTMLDivElement): void {
			apply_btn.x = content._childs[lastword]._text.words[content._childs[lastword]._text.words.length - 1]._x + content._childs[lastword]._text.words[content._childs[lastword]._text.words.length - 1]._w + content.x;
			// apply_btn.y = content.y + content._childs[2]._text.words[content._childs[2]._text.words.length - 1]._y;
			let contentwidth = content._childs[lastword]._text.words[content._childs[lastword]._text.words.length - 1]._x + content._childs[lastword]._text.words[content._childs[lastword]._text.words.length - 1]._w + apply_btn.width; //加入按钮后的实际宽度
			/** 判断按钮显示位置，是否需要换行 */
			if (contentwidth > content.width) {
				let hang = content.contextHeight / 27; //行数行高27 = 字体大小24+行间距3
				{/** 换行处理 */
					content.contextHeight = content.contextHeight + apply_btn.height + content.style.leading;
					apply_btn.x = content.x;
					apply_btn.y = content.y + (content.style.leading + 24) * hang;
				}
			}
			else {/** 不需要特殊处理 */
				apply_btn.y = content.y + content._childs[lastword]._text.words[content._childs[lastword]._text.words.length - 1]._y
			}
		}

		/** 
		 * 申请组队事件
		 * @param leaderid 队长Id
		 */
		public onApplyJoinTeam(leaderid: number): void {
			RequesterProtocols._instance.c2s_CRequestJoinTeam(leaderid);
		}
		/** 点击红包 
		 * @param data 所需参数
		*/
		public onRedPacketEvent(data: any): void {
			redPacket.models.RedPacketModel.getInstance().qiangRedPack(data[3], data[2]);
		}
		/** 获取聊天频道的资源 
		 * @param logo 设置的ui
		 * @param messageType 频道类型
		*/
		public getChannelImg(logo: Laya.Image, messageType: number): void {
			switch (messageType) {
				case 1:   //当前频道
					logo.skin = "ui/liaotian/liaotian_dangqian.png";
					break;
				case 2:   //队伍频道
					logo.skin = "ui/liaotian/liaotian_duiwu.png";
					break;
				case 3:   //职业频道
					logo.skin = "ui/liaotian/liaotian_zhiye.png";
					break;
				case 4:   //公会频道
					logo.skin = "ui/liaotian/liaotian_gonghui.png";
					break;
				case 5:   //世界频道
					logo.skin = "ui/liaotian/liaotian_shijie.png";
					break;
				case 6:   //系统频道
					logo.skin = "ui/liaotian/liaotian_xitong.png";
					break;
				case 7:   //消息频道

					break;
				case 14:   //组队申请频道 
					logo.skin = "ui/liaotian/yijianhanhua.png";
					break;
				default:   //默认是系统频道
					logo.skin = "ui/liaotian/liaotian_xitong.png";
					break;
			}
		}
		/** 判断当前是否处于队伍中 状态为正常
		 * @param _teamflag 是否处于队伍中
		*/
		public chargeInGroup(_teamflag: boolean = true): boolean {
			let roleid = game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid;
			let role: game.scene.models.RoleBasicVo = game.scene.models.SceneModel.getInstance().rolelist.get(roleid);
			let team: game.scene.models.TeamOctetsVo = role.rolebasicOctets.datas.get(2);
			let leaderid = TeamModel.getInstance().teamMemberBasic.keys[0];
			if (!_teamflag) {
				if (team) return false;
			}
			//如果是队长
			if (roleid == leaderid) return false;
			if (team) {
				if (team.teamindexstate > 0) {//在队伍中 暂离的话值为负数
					if ((team.teamindexstate >> 4) != 1) {//141216
						return true;
					}
				}
			}
			return false;
		}
		/** 是否处于挂机地图 */
		public static InHandUpMap(): boolean {
			return game.modules.mainhud.models.HudModel.getInstance().sceneid >= 1801
				&& game.modules.mainhud.models.HudModel.getInstance().sceneid <= 1830;
		}
	}
}