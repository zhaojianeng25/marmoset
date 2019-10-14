
enum actiontype {
	/**容器 */
	rongqi = 1,
	/**购买关注 */
	buy = 2,
	/**公示关注 */
	gongshi = 3,
	/**搜索返回 */
	search = 4,
}

/**
 * 关注类型
 */
enum attentype {
	/**购买关注 */
	buy = 1,
	/**公示关注 */
	gongshi = 2,
}

/**
 * 关注 或 取消关注
 */
enum attention {
	/**关注 */
	attent = 1,
	/**取消关注 */
	cancelAttent = 2
}

/**逻辑类型 */
enum m_logictype {
	/**逻辑类型为0：表示不显示区间列表 */
	zero = 0,
	/**逻辑类型为1：表示显示等级、物品id */
	one = 1,
	/**逻辑类型为2：表示显示等级、物品id */
	two = 2,
	/**逻辑类型为3：表示显示品质区间、等级区间 */
	three = 3,
	/**逻辑类型为4：表示显示品质区间、等级区间 */
	four = 4
}

/** 拍卖行页面索引 */
enum ViewIndex {
	/** 购买 */
	BUY = 0,
	/** 出售 */
	SELL = 1,
	/** 公示 */
	PUBLICITY = 2
}

/** 拍卖行品质索引*/
enum NqualityType {
	WHILE = 1,		//白色
	GREEN = 2,      //绿色
	BLUE = 3,		//蓝色
	VLOLET = 4,		//紫色
	ORANGE = 5,		//橙色
}

/** 拍卖装备类型索引*/
enum EquipTypeIndex {
	GEM = 2,		//珍品装备
	TASK = 3,		//任务装备
	PET = 13,		//宠物装备
	PUBLICITYPET = 6,	//公示宠物装备
}

/** 拍卖行品质下标索引*/
enum TraitIndex {
	zero = 0,		// 紫色	白色   绿色
	one = 1,		// 橙色   绿色   蓝色
	two = 2,		// 蓝色   紫色
}

/** 品质筛选单选框下标索引*/
enum ScreenIndex {
	checkone = 1,
	checktwo = 2,
	checkthree = 3,
}

module game.modules.sale.models {
	export class SaleModel {
		/**bMT3摆摊一级表 */
		public cMarketFirstTableData: Object = {};
		/**bMT3摆摊二级表 */
		public cMarketSecondTableData: Object = {};
		/**bMT3摆摊三级表 */
		public cMarketThreeTableData: Object = {};
		/**bMT3摆摊三级表以name为key */
		public cMarketThreeTableDataForName: Object = {};
		/**bMT3摆摊三级表以itemid为key */
		public cMarketThreeTableDataForItemid: Object = {};
		/**重新排序之后的一级摆摊列表 */
		public m_cMarketFirstTableData = [];
		/**食品表 */
		public foodAndDrugEffectData: Object = {};
		/**食品公式表 */
		public foodAndDrugFormulaData: Object = {};
		/**上架物品信息 */
		public GoodList: Laya.Dictionary = new Laya.Dictionary();
		/**存储上架物品点击时的物品id,以备返回tips时使用 */
		public itemId: number = -1;
		/**购买界面返回的物品信息 */
		public bugGoodlist: Array<any> = [];
		/**筛选返回的当前页数 */
		public currPage = 1;
		/**筛选返回的总的页数 */
		public totalPage = 1;
		/** 在拍卖行搜索目标id */
		public saleTargetId: number;
		/**搜索历史纪录 */
		public searchRecordArr: Array<any> = [];
		/**购买记录 */
		public buyRecordArr: Array<any> = [];
		/**出售记录 */
		public saleRecordArr: Array<any> = [];
		/**宠物技能 */
		petSkillIndexArr = [];
		/**宠物信息 */
		public SMarketPetTipsData: Laya.Dictionary;
		/**公示关注信息 */
		public GongshiGuanZhuData: Laya.Dictionary;
		/**购买关注信息 */
		public GoumaiGuanZhuData: Laya.Dictionary;
		/**拍卖行存放tips信息 */
		public SOtherItemTipsDsc: Laya.Dictionary;
		/**拍卖行珍品装备和珍品宠物搜索返回信息 */
		public AuctionSearchData: Laya.Dictionary;
		/**搜索结果 */
		public SearchResultData: Laya.Dictionary;

		isJumpItemid = -1;
		/** 跳转哪个子界面 0：购买 1：出售 2：公示 */
		tiaozhuanid = 0;
		/**存储当前上架物品的id */
		saleItmeId = -1;
		/** 判断搜索数据返回是否有值 */
		isSeekback: boolean = false;

		constructor() {
			this.SMarketPetTipsData = new Laya.Dictionary();
			this.GongshiGuanZhuData = new Laya.Dictionary();
			this.GoumaiGuanZhuData = new Laya.Dictionary();
			this.SOtherItemTipsDsc = new Laya.Dictionary();
			this.AuctionSearchData = new Laya.Dictionary();
			this.SearchResultData = new Laya.Dictionary();
		}
		/**上架或者下架 */
		public static salePetMarketUpOrDown = {
			/**上架 */
			MarketUp: "上架",
			/**下架 */
			MarketDown: "下架",
		}
		/**基础属性 */
		equBaseAttrArr = [{ name: "物理攻击", id: 130 }, { name: "法术攻击", id: 150 }, { name: "治疗强度", id: 170 }, { name: "速度", id: 200 },
		{ name: "生命", id: 60 }, { name: "魔法", id: 90 }, { name: "物理防御", id: 140 }, { name: "法术防御", id: 140 }];
		/**装备附加属性 */
		equAddAttr = [{ name: "体质", id: 10 }, { name: "智力", id: 20 }, { name: "力量", id: 30 }, { name: "耐力", id: 40 }, { name: "敏捷", id: 50 }];
		/**宠物资质评分 */
		petZizhiArr = [{ name: "生命资质", id: 1460 }, { name: "法术资质", id: 1470 }, { name: "物攻资质", id: 1440 }, { name: "防御资质", id: 1450 }, { name: "速度资质", id: 1480 }];
		/**宠物基础属性 */
		petBaseAttr = [{ name: "生命", id: 60 }, { name: "物理攻击", id: 130 }, { name: "物理防御", id: 140 }, { name: "法术攻击", id: 150 }, { name: "法术防御", id: 160 }, { name: "速度", id: 200 }];

		public static _instance: SaleModel;
		public static getInstance(): SaleModel {
			if (!this._instance) {
				this._instance = new SaleModel();
			}
			return this._instance;
		}
		public static clearModelData(): void {
			sale.models.SaleModel._instance.m_cMarketFirstTableData = [];
			sale.models.SaleModel._instance.GoodList = new Laya.Dictionary();
			sale.models.SaleModel._instance.SMarketPetTipsData = new Laya.Dictionary();
			sale.models.SaleModel._instance.GoumaiGuanZhuData = new Laya.Dictionary();
			sale.models.SaleModel._instance.GongshiGuanZhuData = new Laya.Dictionary();
			sale.models.SaleModel._instance.SOtherItemTipsDsc = new Laya.Dictionary();
			sale.models.SaleModel._instance.AuctionSearchData = new Laya.Dictionary();
			sale.models.SaleModel._instance.SearchResultData = new Laya.Dictionary();
			sale.models.SaleModel._instance.itemId = -1;
			sale.models.SaleModel._instance.bugGoodlist = [];
			sale.models.SaleModel._instance.currPage = 1;
			sale.models.SaleModel._instance.totalPage = 1;
			sale.models.SaleModel._instance.saleTargetId = 0;
			sale.models.SaleModel._instance.searchRecordArr = [];
			sale.models.SaleModel._instance.buyRecordArr = [];
			sale.models.SaleModel._instance.saleRecordArr = [];
			sale.models.SaleModel._instance.petSkillIndexArr = [];
			sale.models.SaleModel._instance.isJumpItemid = -1;
			sale.models.SaleModel._instance.tiaozhuanid = 0;
			sale.models.SaleModel._instance.saleItmeId = -1;
			sale.models.SaleModel._instance.isSeekback = false;
		}

		/**根据iconId获取图片地址 */
		public getIcon(iconId: number) {
			if (20001 <= iconId && iconId <= 30000) {
				return "common/icon/item/" + iconId + ".png";
			} else if (30001 <= iconId && iconId <= 30500) {
				return "common/icon/avatarrole/" + iconId + ".png";
			} else if (31201 <= iconId && iconId <= 32000) {
				return "common/icon/avatarpet/" + iconId + ".png";
			} else if (1 <= iconId && iconId <= 10000) {
				return "common/icon/skill/" + iconId + ".png";
			}
			return "";
		}

		/**显示列表 */
		public showList(list: Laya.List, arr: Array<any>): void {
			list.vScrollBarSkin = "";
			list.scrollBar.elasticBackTime = 200;
			list.scrollBar.elasticDistance = 50;
			list.repeatY = arr.length;
			list.array = arr;
		}

        /**
		 * 获取tips
		 * @param packid 
		 * @param key 
		 */
		public getItemTips(packid, key) {
			var tips = game.modules.strengThening.models.StrengTheningModel._instance.equipTips;
			for (var i = 0; i < tips.length; i++) {
				if (packid == tips[i].packid && key == tips[i].keyinpack) {
					return tips[i].tips;
				}
			}
			return -1;
		}
	}
}