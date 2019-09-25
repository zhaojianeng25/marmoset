/**
* name 
*/
module game.modules {
	export class ModuleNames {
		public static CREATE_ROLE: string = "CreateRole"		//创建角色
		public static MAIN_MENU: string = "mainhud"				//主界面
		public static HI_MAIN_MENU: string = "Menu"				//主界面- 底部，头部菜单
		public static NPC_TALK: string = "NpcTalk"				//Npc对话界面
		public static MISSION: string = "Mission"				//任务界面
		public static ROLE_Info: string = "RoleInfo"			//角色系统
		public static Chat: string = "liaotian"			    	//聊天
		public static SKILL: string = "skill"					//技能
		public static MAP_WORLD: string = "mapworld"			//世界地图
		public static REWARD: string = "reward";			    //奖励系统
		public static ACTIVITY: string = "huodong";				//活动系统
		//_NR 表示不需要加载url 资源文件					
		public static BAG_SMELT: string = "BagSmelt_NR"; 		//背包-熔炼
		public static ACHIEVENT: string = "Achievement";        //成就界面
		public static STRENG_THENING: string = "qianghua";   	//强化系统
		public static SALE: string = "sale";                 //拍卖
		public static TIPS: string = "tongyong";               //tips
		public static SystemSetting: string = "tongyong";   //系统设置
		public static Team: string = "team";   				//队伍界面
		public static DisapperTips: string = "tongyong";   	//弹窗飘动提示
		public static Family: string = "family";                 //没有帮派
		public static haveFamily: string = "havefamily";             //拥有帮派
		public static SHOP: string = "shopui";					//商城系统
		//by：lqw
		public static BAG: string = "Bag";
		public static FRIEND: string = "friend";     			//好友
		public static PET: string = "pet";
		public static HUOBAN: string = "huoban";
		//by: cwp
		public static RANKING_LIST: string = "paihangbang";   //排行榜系统		
		public static RED_PACKET: string = "redpacket";	//红包系统
		public static SET_BASICS: string = "tongyong";	//系统设置
		public static GUA_JI: string = "guaJi";//挂机系统
		public static TIAN_JI_XIAN_LING = "tianjixiangl";//天机仙令

		public static TASK: string = "task";
		public static XIANHUI: string = "zhanxianhui";
		constructor() {
			ModuleNames._instance = this;
			this.init();
		}
		public static getInstance(): ModuleNames {
			if (!this._instance) {
				this._instance = new ModuleNames();
			}
			return this._instance;
		}
		private static _instance: ModuleNames;
		public moduleClassDic: Laya.Dictionary;
		public init(): void {
			this.moduleClassDic = new Laya.Dictionary();
			this.moduleClassDic[ModuleNames.CREATE_ROLE] = game.modules.createrole.CreateRoleModule;

			this.moduleClassDic[ModuleNames.ROLE_Info] = game.modules.roleinfo.RoleInfoModule;
			this.moduleClassDic[ModuleNames.SKILL] = game.modules.skill.SkillModule;
			//sugq
			this.moduleClassDic[ModuleNames.MAIN_MENU] = game.modules.mainhud.MainHudModule;
			this.moduleClassDic[ModuleNames.MAP_WORLD] = game.modules.mapworld.MapWorldModule;

			this.moduleClassDic[ModuleNames.REWARD] = game.modules.reward.RewardModule;
			this.moduleClassDic[ModuleNames.ACTIVITY] = game.modules.activity.ActivityModule;

			//by：lqw
			this.moduleClassDic[ModuleNames.FRIEND] = game.modules.friend.FriendSystemModule;
			this.moduleClassDic[ModuleNames.BAG] = game.modules.bag.BagSystemModule;
			this.moduleClassDic[ModuleNames.Chat] = game.modules.chat.ChatModule;
			this.moduleClassDic[ModuleNames.PET] = game.modules.pet.PetModule;
			this.moduleClassDic[ModuleNames.ACHIEVENT] = game.modules.achievent.AchieventModule;
			this.moduleClassDic[ModuleNames.STRENG_THENING] = game.modules.strengThening.StrengTheningModule;
			this.moduleClassDic[ModuleNames.HUOBAN] = game.modules.huoban.HuoBanModule;
			this.moduleClassDic[ModuleNames.Team] = game.modules.team.TeamModule;
			this.moduleClassDic[ModuleNames.SALE] = game.modules.sale.SaleModule;
			this.moduleClassDic[ModuleNames.TIPS] = game.modules.tips.tipsModule;
			this.moduleClassDic[ModuleNames.DisapperTips] = game.modules.commonUI.DisappearMessageTipsMediator;
			this.moduleClassDic[ModuleNames.TASK] = game.modules.task.TaskModule;
			this.moduleClassDic[ModuleNames.Family] = game.modules.family.FamilyJoinViewMediator;
			this.moduleClassDic[ModuleNames.haveFamily] = game.modules.family.FamilyModule;
			//by: cwp
			this.moduleClassDic[ModuleNames.RANKING_LIST] = game.modules.ranKingList.RanKingListModule;
			this.moduleClassDic[ModuleNames.RED_PACKET] = game.modules.redPacket.RedPacketModule;
			this.moduleClassDic[ModuleNames.SET_BASICS] = game.modules.setBasics.SetBasicsModule;
			this.moduleClassDic[ModuleNames.GUA_JI] = game.modules.guaji.GuaJiModule;
			this.moduleClassDic[ModuleNames.TIAN_JI_XIAN_LING] = game.modules.tianjixianling.TianJiXianLingModule;

			this.moduleClassDic[ModuleNames.SHOP] = game.modules.shop.ShopModule;
			this.moduleClassDic[ModuleNames.XIANHUI] = game.modules.xianhui.XianHui3V3Module;

		}

	}

}