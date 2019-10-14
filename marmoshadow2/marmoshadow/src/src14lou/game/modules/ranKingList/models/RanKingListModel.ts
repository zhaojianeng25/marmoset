/**
 * @describe 排行榜类型
 */
enum RankType{
	/** 等级排行 */
	LEVEL_RANK = 1,
	/** 宠物综合能力（评分）排行榜 */
	PET_GRADE_RANK = 9,
	/** 公会排行榜 */
	FACTION_RANK = 31,
	/** 人物综合实力排行榜 */
	ROLE_ZONGHE_RANK =32,

	//冰封王座暂时未开放
	// /** 冰封王座单人副本40-49级 */
	// SINGLE_COPY_RANK1 = 21,
	// /** 冰封王座单人副本50-69级 */
	// SINGLE_COPY_RANK2 = 22,
	// /** 冰封王座单人副本70-89级 */
	// SINGLE_COPY_RANK3 = 23,
	// /** 冰封王座单人副本90级 */
	// SINGLE_COPY_RANK4 = 24,
	// /** 冰封王座组队副本50-69级 */
	// TEAM_COPY_RANK1 = 27,
	// /** 冰封王座组队副本70-89级 */
	// TEAM_COPY_RANK2 = 28,

	/** 角色评分  */
	ROLE_RANK = 38,
	/** 战士 云霄殿 */
	PROFESSION_WARRIOR_RANK = 43,
	/** 法师 天雷狱 */
	PROFESSION_MAGIC_RANK =44,
	/** 牧师 无量宫 */
	PROFESSION_PRIEST_RANK = 45,
	/** 圣骑 大荒岭 */
	PROFESSION_PALADIN_RANK = 46,	
	/** 猎人 苍羽宫 */
	PROFESSION_HUNTER_RANK = 47,
	/** 德鲁伊 飞雪崖 */
	PROFESSION_DRUID_RANK = 48,

	/** 公会等级 即帮派等级*/
	FACTION_RANK_LEVEL = 49,
	/** 公会综合实力 即帮派综合实力 */
	FACTION_ZONGHE = 50,

	/** 熔火之心 */
	FACTION_MC = 51,
	/** 纳克萨玛斯 */
	FACTION_NAXX =52,

	/** 盗贼 七星观 */
	PROFESSION_ROGUE_RANK = 60,
	/** 萨满 玄冥池 */
	PROFESSION_SAMAN_RANK = 61,
	/** 术士 丹阳观 */
	PROFESSION_WARLOCK_RANK = 62,

	/** 公会副本 即帮派副本 */
	FACTION_COPY = 70,

	/** 5v5竞技场上届初级组，上届精英组 */
	PVP5_LAST_GRADE1 = 81,
	/** 5v5竞技场上届中级组，上届神威组 */
	PVP5_LAST_GRADE2 = 82,
	/** 5v5竞技场上届高级组，上届王者组 */
	PVP5_LAST_GRADE3 = 83,
	/** 5v5竞技场历史初级组，历史精英组 */
	PVP5_HISTORY_GRADE1 = 84,
	/** 5v5竞技场历史中级组，历史神威组 */
	PVP5_HISTORY_GRADE2 = 85,
	/** 5v5竞技场历史高级组，历史王者组 */
	PVP5_HISTORY_GRADE3 = 86,

	/** 红包榜 普通服 */
	RED_PACK_1 = 101,
	/** 红包榜 点卡服 */
	RED_PACK_2 = 102,

	/** 收花榜 */
	FLOWER_RECEIVE = 111,
	/** 送花榜 */
	FLOWER_GIVE = 112,
	/**
	 * 排行榜配置表最多到送花榜为止
	 */

	/** 公会战竞赛排名周二那场 */
	CLAN_FIGHT_2 = 120,
	/** 公会战竞赛排名周四那场 */
	CLAN_FIGHT_4 = 121,
	/** 公会战竞赛排名本轮 */
	CLAN_FIGHT_WEEK = 122,
	/** 公会战历史排名 */
	CLAN_FIGHT_HISTROY = 123,
}

module game.modules.ranKingList.models{
    export class RanKingListModel{
		/** 排行榜配置信息  字典 */		
		public paiHangBangDic:Object = {};
		/** 统一放各种排行榜列表信息数据 */
		public rankListInfoData : Array<any> = [];
		/** 放榜单上某排名的玩家信息查看数据 */
		public zonghepingfen_info : Laya.Dictionary = new Dictionary();
		/** 放玩家自己在排行榜相关信息数据 */
		public myRankInfoData:any;
		/** 放在等级榜查看玩家信息所需的相关信息数据 */
		public lookRoleInfoDat:any;
		/** 存放帮派详情数据的数组 */
		public clanDetailArr:Array<any> = [];
		
		public static Vo_index:Array<number>;		
		Vo_index = [
                RankType.LEVEL_RANK,
                RankType.PET_GRADE_RANK,
                //RankType.FACTION_RANK,
                RankType.ROLE_ZONGHE_RANK,
                RankType.ROLE_RANK,
                RankType.PROFESSION_WARRIOR_RANK,
                RankType.PROFESSION_MAGIC_RANK,
                RankType.PROFESSION_PRIEST_RANK,
                RankType.PROFESSION_PALADIN_RANK,
                RankType.PROFESSION_HUNTER_RANK,
                RankType.PROFESSION_DRUID_RANK,
                RankType.FACTION_RANK_LEVEL,
                RankType.FACTION_ZONGHE,
                RankType.FACTION_MC,
                RankType.FACTION_NAXX,
                RankType.PROFESSION_ROGUE_RANK,
                RankType.PROFESSION_SAMAN_RANK,
                RankType.PROFESSION_WARLOCK_RANK,
                RankType.FACTION_COPY,
                RankType.PVP5_LAST_GRADE1,
                RankType.PVP5_LAST_GRADE2,
                RankType.PVP5_LAST_GRADE3,
                RankType.PVP5_HISTORY_GRADE1,
                RankType.PVP5_HISTORY_GRADE2,
                RankType.PVP5_HISTORY_GRADE3,
                RankType.RED_PACK_1,
				//RankType.RED_PACK_2,
                RankType.FLOWER_RECEIVE,
                RankType.FLOWER_GIVE
                ];


		
		constructor(){
			RanKingListModel._instance = this;
		}
		public static _instance:RanKingListModel;
		public static getInstance():RanKingListModel {
			if(!this._instance) {
				this._instance = new RanKingListModel();
			}
			return this._instance;
		}
		public static clearModelData(): void {
			ranKingList.models.RanKingListModel._instance.rankListInfoData = [];
			ranKingList.models.RanKingListModel._instance.zonghepingfen_info = new Laya.Dictionary();
			ranKingList.models.RanKingListModel._instance.myRankInfoData = new models.MyRankInfoVo();
			ranKingList.models.RanKingListModel._instance.lookRoleInfoDat = new models.RankRoleInfoVo();
			ranKingList.models.RanKingListModel._instance.clanDetailArr = [];
		}

    }
}