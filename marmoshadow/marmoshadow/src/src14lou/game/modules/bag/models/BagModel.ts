/**
 * @describe  背包类型
 */
enum BagTypes {
	/**背包为空 */
	EMPTY = 0,
	/**背包 */
	BAG = 1,
	/**仓库 */
	DEPOT = 2,
	/**装备背包 */
	EQUIP = 3,
	/**临时背包 */
	TEMP = 4,
	/**任务背包 */
	QUEST = 5,
	/**拍卖背包 */
	MARKET = 6,
	/**黑市背包 */
	BLACKMARKET = 7,
	/**拍卖临时背包 */
	MARKETTEMP = 8,
	/**宠物装备 */
	PETEQUIP = 9,
	/**天梯背包 */
	TIANTI = 10,
}
/** 
 * op装备
 */
enum OpEquip {
	/** 穿上装备 */
	PUTON = 1,
	/** 脱下装备 */
	TAKEOFF = 2,
}

/**
 * @describe  钱币类型
 */
enum MoneyTypes {
	/**无效类型 */
	MoneyType_None = 0,
	/**银币 */
	MoneyType_SilverCoin = 1,
	/**金币 */
	MoneyType_GoldCoin = 2,
	/**符石 */
	MoneyType_HearthStone = 3,
	/**职业贡献 */
	MoneyType_ProfContribute = 4,
	/**荣誉值 */
	MoneyType_RongYu = 5,
	/**公会贡献 */
	MoneyType_FactionContribute = 6,
	/**声望 */
	MoneyType_ShengWang = 7,
	/**节日积分 */
	MoneyType_FestivalPoint = 8,
	/**良师值 */
	MoneyType_GoodTeacherVal = 9,
	/**角色经验 */
	MoneyType_RoleExp = 10,
	/**活跃度 */
	MoneyType_Activity = 11,
	/**活力 */
	MoneyType_Energy = 12,
	/**信用点 */
	MoneyType_EreditPoint = 13,
	/** 天梯币 */
	MoneyType_TianTiCoin = 14,
	/**巧匠值 */
	MoneyType_QiaoJiang = 15,
	/**道具 */
	MoneyType_Item = 99,
	/**类型数量 */
	MoneyType_Num = 17,
	/** 自己定义使用的金币类型，使用与3类型一致 */
	MoneyType_SupFushi = 20,
};

enum RefreshRoleScore {
	/**综合评分 */
	TOTAL_SCORE = 1,
	/**装备评分 */
	EQUIP_SCORE = 2,
	/**多宠物评分 */
	MANY_PET_SCORE = 3,
	/**单宠物评分 */
	PET_SCORE = 4,
	/**等级评分 */
	LEVEL_SCORE = 5,
	/**修炼评分 */
	XIULIAN_SCORE = 6,
	/**人物评分 */
	ROLE_SCORE = 7,
	/**技能评分 */
	SKILL_SCORE = 8
}
/** tips 用途 */
enum ItemPurpose {
	/** 转移 */
	ITEM_TRANSFER = 1
}
/** 战斗背包药品类型 */
enum FightDrugType {
	/** 恢复 */
	RECOVER = 1,
	/** 解控 */
	CONTROL = 2,
	/** 复活 */
	RESURRECTION = 3,
	/** 显彰 */
	OBVIOUS = 4,
	/** 怒气 */
	ANGER = 5,
}

/** 角色换装枚举 */
enum SpriteComponents {
	/** 武器 */
	SPRITE_WEAPON = 1,
	/** 头饰 */
	SPRITE_HEADDRESS = 2,
	/** 背饰 */
	SPRITE_BACKDRESS = 3,
	/** 面饰1 */
	SPRITE_FACEDRESS1 = 4,
	/** 面饰2 */
	SPRITE_FACEDRESS2 = 5,
	/** 坐骑 */
	SPRITE_HORSEDRESS = 6,
	/**  武器颜色	byte 1为白色，2为绿色。。4为紫色 5为橙色*/
	SPRITE_WEAPONCOLOR = 7,
	/** 时装 */
	SPRITE_FASHION = 8,
	/** 染色部位1 */
	ROLE_COLOR1 = 50,
	/**  染色部位2*/
	ROLE_COLOR2 = 51,
	/** 装备特效 */
	SPRITE_EQUIP_EFFECT = 60,
}
//标志，叠加的时候，flags 也 OR 叠加。
enum FlagsType {
	/** 不可交易给玩家，不可卖店 */
	BIND = 1,
	/** 用符石购买而来 */
	FUSHI = 2,
	/** 摆摊出售中 */
	ONSTALL = 4,
	/** 在商会中上架 */
	ONCOFCSELL = 8,
	/** 不能卖店 */
	CANNOTONSTALL = 16,
	/** 类型17 */
	BIND_CANNOTONSTALL = 17,
	/** 锁定 */
	LOCK = 32,
	/** 时效物品 */
	TIMEOUT = 64,
}
/** 装备部位类型 */
enum EquipType {
	/** 武器 */
	ARMS = 0,
	/** 头盔 */
	HELMET = 1,
	/** 项链 */
	NECKLACE = 2,
	/** 衣服 */
	CLOTHES = 3,
	/** 腰带 */
	BELT = 4,
	/** 鞋子 */
	SHOES = 5,
}
/** 道具总类型 */
enum ItemTotalType {
	/** 宠物道具 */
	PetItem = 1,
	/** 食品道具 */
	FoodItem = 2,
	/** 药品道具 */
	DrugItem = 3,
	/** 宝石 */
	GemItem = 5,
	/** 杂货道具 */
	GroceriesItem = 6,
	/** 装备道具 */
	EquipItem = 8,
	/** 任务道具 */
	TaskItem = 9,
	/** 宠物装备 */
	PetEquipItem = 10
}
/** 装备品质 */
enum EquipNquality {
	/** 白色 */
	White = 1,
	/** 绿色 */
	Green = 2,
	/** 蓝色 */
	Blue = 3,
	/** 紫色 */
	Purple = 4,
	/** 橙色 */
	Orange = 5
}
/** 使用物品（对某对象进行使用）,例如：在c2s_CAppend_Item所需参数会用到该枚举类 */
enum IDType {
	/** 人物 */
	ROLE = 0,
	/** 宠物 */
	PET = 1,
	/** 物品 */
	ITEM = 2
}

module game.modules.bag.models {

	/**仓库数最大上限 */
	const MAX_STOREHOUSE_NUMBER = 10;
	export class BagModel {
		/**宝石表、r任务物品表、s食品表、z杂货表、z装备表、c宠物物品表的复合表 */
		public itemAttrData: Object = {};
		/**c宠物物品表 */
		public petItemEffectData: Object = {};
		/**b背包扩充价格表 */
		public bagTableData: Object = {};
		/**c仓库扩充价格 */
		public depottableData: Object = {};
		/**r任务物品表 */
		public taskRelativeData: Object = {};


		/**装备id */
		public id: number;
		/**人物评分 */
		public roleScore: number = 0;
		/** 符石(元宝数量) */
		public fuShiIcon: number = 0;
		/**金币数量 */
		public globalIcon: number = 0;
		/**银币数量 */
		public sliverIcon: number = 0;
		/**荣誉值*/
		public honnorIcon: number = 0;
		/** 帮贡 */
		public FactionContribute: number = 0;
		/**	现有的浮石数量 绑定+非绑定 */
		public yuanbaoIcon: number = 0;
		/** 总的充值符石数量 */
		public totalnum: number = 0;
		/**key是depotid,value是格子數(如果是默认的就不存了) */
		public depotnameinfo: Laya.Dictionary;
		/**key是depotid,value是depot名(如果是默认的就不存了) */
		public depotName: Laya.Dictionary;
		/**仓库名称数据 */
		public storeHouseBtnName = [];
		/**服务端存储的仓库名称数据 */
		public server_storeHouseBtnName = [];
		/**修改仓库名称的最大的字数 */
		private _storeHouseRenameNumber: number = 5;
		/**修改仓库界面；输入提示 */
		private _storeHouseRenamePrompt: string = "点击这里输入";
		/** 仓库的最小值 */
		public minDeptNum: number = 50;
		/** 背包格子的最小值 */
		public minBagNum: number = 60;
		/** 实际背包的格子数 */
		public actBagNum: number = 60;
		/** 当前所在仓库的Id */
		public currDepotId: number = -1;
		/**仓库按钮是否打开 */
		public _isStoreHouseBtnOpen: boolean = false;
		/**bagVo */
		public bagMap: Object = {};
		/**1金币可换取100银币 */
		public exchangeRateOfGold: number = 100;
		/**1元宝可以换取10000银币 */
		public exchangeRateOfYuanBao: number = 10000;
		/**当前骑乘的坐骑Id */
		public currentRideId: number = -1;
		/**BagModel的单例对象 */
		public static _instance: BagModel;
		/**宠物装备 */
		public petequip: Laya.Dictionary;
		/**商品 */
		public getGoods: Dictionary;
		/** 角色换装信息 */
		public roleComponentsChange: Laya.Dictionary;
		/** 角色是否穿装备 0 脱 其他 穿  */
		public rolePutOn = -1;
		/** 新加物品使用提示  */
		public addItemUseGuide: Laya.Dictionary;
		/** 新增物品滑动过场数据 */
		public SlideItem: Array<any> = [];
		/** 道具使用提示表 */
		public ItemUseTip: Object = {};
		/** z战斗中药品类型表.xlsx */
		public FightDrugTypeData: { [key: number]: FightDrugTypeBaseVo } = {};
		/**背包界面开关情况 */
		public bagkey = true;
		/** 背包装备替换前存储的数据 key装备类型 value key */
		public equipRelace: Dictionary = new Laya.Dictionary;
		/** 存储被借出道具key key：道具id  value：道具是否要被删除 */
		public lendItemsDic: Laya.Dictionary = new Laya.Dictionary();
		/** 存储珍品回收信息数据 */
		public itemRecoverInfoData: Array<any> = [];
		/** 存放珍品回收中装备道具信息数据 */
		public equipItemRecoverInfoTips: any;

		constructor() {
			this.roleScore = 0;
			this.globalIcon = 0;
			this.sliverIcon = 0;
			this.honnorIcon = 0;
			this.yuanbaoIcon = 0;
			this.depotnameinfo = new Laya.Dictionary();
			this.depotName = new Laya.Dictionary();
			this.petequip = new Laya.Dictionary();
			this.getGoods = new Laya.Dictionary();
			this.roleComponentsChange = new Laya.Dictionary();
			this.addItemUseGuide = new Laya.Dictionary();
			this.initListener();
		}

        /**
		 * @describe  获取BagModel的单例
		 */
		public static getInstance(): BagModel {

			if (!this._instance) {
				this._instance = new BagModel();
			}
			return this._instance;
		}
		public static clearModelData(): void {
			bag.models.BagModel._instance.id = 0;
			bag.models.BagModel._instance.roleScore = 0;
			bag.models.BagModel._instance.fuShiIcon = 0;
			bag.models.BagModel._instance.globalIcon = 0;
			bag.models.BagModel._instance.sliverIcon = 0;
			bag.models.BagModel._instance.honnorIcon = 0;
			bag.models.BagModel._instance.FactionContribute = 0;
			bag.models.BagModel._instance.yuanbaoIcon = 0;
			bag.models.BagModel._instance.totalnum = 0;
			bag.models.BagModel._instance.depotnameinfo = new Laya.Dictionary();
			bag.models.BagModel._instance.depotName = new Laya.Dictionary();
			bag.models.BagModel._instance.storeHouseBtnName = [];
			bag.models.BagModel._instance.server_storeHouseBtnName = [];
			bag.models.BagModel._instance._storeHouseRenameNumber = 5;
			bag.models.BagModel._instance._storeHouseRenamePrompt = "点击这里输入";
			bag.models.BagModel._instance.minDeptNum = 50;
			bag.models.BagModel._instance.minBagNum = 60;
			bag.models.BagModel._instance.actBagNum = 60;
			bag.models.BagModel._instance.currDepotId = -1;
			bag.models.BagModel._instance._isStoreHouseBtnOpen = false;
			bag.models.BagModel._instance.bagMap = {};
			bag.models.BagModel._instance.exchangeRateOfGold = 100;
			bag.models.BagModel._instance.exchangeRateOfYuanBao = 10000;
			bag.models.BagModel._instance.currentRideId = -1;
			bag.models.BagModel._instance.petequip = new Laya.Dictionary();
			bag.models.BagModel._instance.getGoods = new Laya.Dictionary();
			bag.models.BagModel._instance.roleComponentsChange = new Laya.Dictionary();
			bag.models.BagModel._instance.rolePutOn = -1;
			bag.models.BagModel._instance.addItemUseGuide = new Laya.Dictionary();
			bag.models.BagModel._instance.SlideItem = [];
			bag.models.BagModel._instance.bagkey = true;
			bag.models.BagModel._instance.equipRelace = new Laya.Dictionary();
			bag.models.BagModel._instance.lendItemsDic = new Laya.Dictionary();
			bag.models.BagModel._instance.itemRecoverInfoData = [];
			bag.models.BagModel._instance.equipItemRecoverInfoTips = undefined;
		}

		/**
		 * @describe  从复合表中取出数据
		 * @param id  编号
		 * @return  该条id信息
		 */
		public getItemAttrData(id: number) {
			if (this.itemAttrData) {
				return this.itemAttrData[id] as ItemAttrBaseVo;
			}
		}
		/**
		 * @describe  解析背包数据，比如获取准备背包数据
		 * @param bagTypes 背包类型
		 */
		public getBagGameItemData(bagType: BagTypes): BagVo {
			let bag: BagVo = this.bagMap[bagType] as BagVo;
			console.log("--------------------------------------------------BagTypes = " + BagTypes + ",bag = " + bag);
			return bag;
		}
		/**
		 * @describe  获取服务端的roleDetail.depotNameInfo（仓库名称、个数储存）对象的长度
		 * @return  仓库个数，如果为0则仓库个数为2（赠送两个免费仓库），如果大于0（实际仓库数要加2）
		 */
		public getDepotNumber(): number {
			var isModifiedflag: boolean = this.server_storeHouseBtnName.length == 0 ? false : true;
			this.storeHouseBtnName = [
				{ label: "免费仓库" },
				{ label: "免费仓库1" },
			];

			if (this.depotnameinfo) {
				let length = this.depotnameinfo.keys.length;
				console.log('depotnameinfo.keys.length========' + this.depotnameinfo.keys.length);
				let judgeNumFlag: boolean = false;
				//需要向this.storeHouseBtnName插入数据
				for (let deptNum = 0; deptNum < length; deptNum++) {
					this.storeHouseBtnName.push({ label: "仓库" + (deptNum + 1) });
				}
				if (length < MAX_STOREHOUSE_NUMBER) {/** 小于仓库数最大值时才添加后面两个 */
					if (length % 2 == 0) judgeNumFlag = true;
					for (let index = 0; index < (judgeNumFlag == true ? 2 : 1); index++) {
						this.storeHouseBtnName.push({ label: "" });
					}
				}

				/** 將改名後的倉庫數據進行覆蓋 */
				if (this.depotName.keys.length != 0) {
					let keys: Array<any> = this.depotName.keys;
					for (let deptRemaneIndex = 0; deptRemaneIndex < keys.length; deptRemaneIndex++) {
						let label = this.depotName.get(keys[deptRemaneIndex]);
						this.storeHouseBtnName[keys[deptRemaneIndex]].label = label;
					}
				}
				return this.storeHouseBtnName.length;
			} else {
				/** 是否有改名,有就进 */
				// if(isModifiedflag) this.fullModified_DepotName(1);
				for (var a = 0; a < 2; a++) {
					this.storeHouseBtnName.push({ label: "" });
				}
			}
			if (this.depotName.keys.length != 0) {
				let keys: Array<any> = this.depotName.keys;
				for (let deptRemaneIndex = 0; deptRemaneIndex < keys.length; deptRemaneIndex++) {
					let label = this.depotName.get(keys[deptRemaneIndex]);
					this.storeHouseBtnName[keys[deptRemaneIndex]].label = label;
				}
			}

			return this.storeHouseBtnName.length;
		}
		/**
		 * @describe 获取某个仓库的数据
		 * @param 	pageId	仓库编号
		 * @return  baginfo
		 */
		public getDepotData(pageId: number) {
			let depotBag: Object = this.bagMap[BagTypes.DEPOT];
			if (typeof (depotBag) == "undefined") depotBag = {};
			let bag: BagVo = depotBag[pageId] as BagVo;
			return bag;
		}
		/**
		 * @describe  获得修改仓库名称的最大字数
		 * @return number   字数
		 */
		public getStoreHouseRenameNumber(): number {
			return this._storeHouseRenameNumber
		}
		/**
		 * @describe  获得修改仓库界面的提示符
		 * @return  string
		 */
		public getStoreHouseRenamePrompt(): string {
			return this._storeHouseRenamePrompt;
		}

		/**
		 * @describe  获取扩展仓库需要的银币
		 * @param depotitem  已有仓库格
		 * @return  sliverNumber 银币数量	
		 */
		public getDeblockingDepotSilverNumber(depotItem: number): number {
			for (let index in this.depottableData) {
				if (this.depottableData[index].haveCount == depotItem) {
					return this.depottableData[index].needyinbi;
				}
			}
			return 0;
		}
		/**
		 * @describe  获取解锁背包需要的银币
		 * @param   itemNum	已有的背包格子	
		 * @return  所需要的银币数两	
		 */
		public getDeblockingBagSilverNumber(itemNum: number): number {
			for (let index in this.bagTableData) {
				if (this.bagTableData[index].haveCount == itemNum) {
					return this.bagTableData[index].needyinbi;
				}
			}
			return 0;
		}
		/** 仓库改名的数据填充 */
		private fullModified_DepotName(type: number): void {
			if (type == 1) {
				console.log('this.storeHouseBtnName' + this.storeHouseBtnName);
				this.storeHouseBtnName = this.server_storeHouseBtnName;
				console.log('this.storeHouseBtnName' + this.storeHouseBtnName);
			} else {
				this.server_storeHouseBtnName = this.storeHouseBtnName;
			}

		}
		/** 
		 * @describe 判断当前背包数据是否已满
		 * @param true 当前背包数据已满
		 * @param false 当前背包数据未满
		 */
		public chargeBagIsFull(): boolean {
			let bag: game.modules.bag.models.BagVo = BagModel.getInstance().getBagGameItemData(BagTypes.BAG);
			let capacity = bag.capacity;
			let itemlength = bag.items.length;
			/** 格子数与物品数量判断 */
			return capacity > itemlength ? false : true;
		}
		/** 
	 * @describe 判断当前背包还有几个位置
	 * 
	 */
		public chargeSurplusLattice(): number {
			let bag: game.modules.bag.models.BagVo = BagModel.getInstance().getBagGameItemData(BagTypes.BAG);
			let capacity = bag.capacity;
			let itemlength = bag.items.length;
			return (capacity - itemlength)

		}
		/** 判断物品数量 */
		public chargeItemNum(itemId: number): number {
			let bag: game.modules.bag.models.BagVo = BagModel.getInstance().getBagGameItemData(BagTypes.BAG);
			let item = bag.items;
			let num = 0;
			for (let itemIndex = 0; itemIndex < item.length; itemIndex++) {
				if (item[itemIndex].id == itemId) {
					num = num + item[itemIndex].number;
				}
			}
			return num;
		}
		/** 返回道具数量唯一的物品信息 */
		public chargeItem(itemId: number): any {
			let bag: game.modules.bag.models.BagVo = BagModel.getInstance().getBagGameItemData(BagTypes.BAG);
			let item = bag.items;
			for (let itemIndex = 0; itemIndex < item.length; itemIndex++) {
				if (item[itemIndex].id == itemId) {
					return item[itemIndex];
				}
			}
			return 0;
		}
		/** 返回道具信息数据 ItemVo
		 * @param packid 背包类型id 具体参见BagTypes
		 * @param itemId 道具id
		 * @param key 道具在对应背包里的key
		 * @param depotid 仓库的id 当packid等于BagTypes.DEPOT才有值
		 */
		public getItemInfoData(packid: number, itemId: number, key: number, depotid?:number): any {
			let items;
			if (packid == BagTypes.PETEQUIP) {
				let petEquipBag = this.bagMap[packid];
				let petKey = PetModel.getInstance().petbasedata.key;
				items = petEquipBag.get(petKey).items;
			}
			else if(packid == BagTypes.DEPOT){
				let depotBag = this.bagMap[packid];
				items = depotBag[depotid].items;
			}
			else {
				let bag: game.modules.bag.models.BagVo = BagModel.getInstance().getBagGameItemData(packid);//道具所在背包
				if( !bag ) return null;
				items = bag.items;//所在背包的所有道具
			}
			for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
				if (items[itemIndex].id == itemId && items[itemIndex].key == key) {
					return items[itemIndex];//返回道具相对应的信息数据
				}
			}
			return null;
		}
		/** 判断物品key */
		public chargeItemKey(bagType: number, itemId: number): number {
			let bag: game.modules.bag.models.BagVo = BagModel.getInstance().getBagGameItemData(bagType);
			let item = bag.items;
			for (let itemIndex = 0; itemIndex < item.length; itemIndex++) {
				if (item[itemIndex].id == itemId) {
					return item[itemIndex].key;
				}
			}
			return -1;
		}
		/** 
		 * 判断物品在背包中的位置
		 * @param bagType 背包类型 @param itemId 物品id
		 */
		public chargeItemPos(bagType: number, itemId: number): number {
			let bag: game.modules.bag.models.BagVo = BagModel.getInstance().getBagGameItemData(bagType);
			let item = bag.items;
			for (let itemIndex = 0; itemIndex < item.length; itemIndex++) {
				if (item[itemIndex].id == itemId) {
					return item[itemIndex].position;
				}
			}
			return -1;
		}

		/** 
		 * 获取特效路径
		 * @param aniName 特效名称 @param length 长度
		 */
		public getEffectUrls(aniName: string, length: number): any {
			var urls: any = [];
			for (var index = 1; index <= length; index++) {
				urls.push("common/ui/tuji/" + aniName + index + ".png");
			}
			return urls;
		}
		/** 获取装备特效路径 */
		public getEquipEffectPath(id: number): any {
			switch (id) {
				case 10: //体质
					break;

				default:
					break;
			}
		}

		/** 判断当前的物品是否可以直接使用 */
		public isCanDirectUse(itemId: number): boolean {
			let item = BagModel.getInstance().getItemAttrData(itemId);
			let roleId = LoginModel.getInstance().roleDetail.roleid;
			let itemtypeid = item.itemtypeid;
			for (let i in this.ItemUseTip) {
				let idnum = this.ItemUseTip[i].idnum;
				/** 如果表中有该类型或者改Id 则显示 */
				if (idnum == itemtypeid) {
					return true;
				} else if (itemId == idnum) {/** 升级礼包 判断使用等级 */
					let singleDigit: number = itemId % 10 * 10;
					let rolelevel = HudModel.getInstance().levelNum;
					if (singleDigit > rolelevel) return false;
					return true;

				}
			}
			return false;
			/** 不可使用，战斗中使用 */
			// if (outbattle == 0 || outbattle == 2) return false;
			// else if (item.itemtypeid == 3750) return false;
			// else if (item.itemtypeid == 166) return false;
			// else if (item.itemtypeid == ItemTypeId.TuzhiItem) return false;
			// else if (item.itemtypeid == ItemTypeId.OtherItem && itemId <= 100005) return false;
			// else if (item.itemtypeid == ItemTypeId.OtherItem && itemId <= 101453) return false;
			// else if (item.itemtypeid == ItemTypeId.Present && itemId <= 100023) return false;
			// else if (item.itemtypeid == ItemTypeId.ForgeStone || item.itemtypeid == ItemTypeId.TailorDye || item.itemtypeid == ItemTypeId.SmeltFusion) return false;
			// else if (item.itemtypeid == ItemTypeId.TuzhiMake) return false;
			// else if (item.itemtypeid == ItemTypeId.TimeReturn || itemId == 339107) return false;
			// else if (item.itemtypeid == ItemTypeId.AttrUpItem) return false;
			// else if (item.itemtypeid == ItemTypeId.FormBookHalf) return false;
			// else if (item.itemtypeid == ItemTypeId.FormBook) return false;
			// else if (item.itemtypeid == ItemTypeId.RoleParticleBook || item.itemtypeid == ItemTypeId.PetParticleBook) return false;
			// else if (item.itemtypeid == ItemTypeId.RoleColorItem || item.itemtypeid == ItemTypeId.PetColorItem) return false;
			// else if (item.itemtypeid == ItemTypeId.SilverKeyItem) return false;
			// else if (item.itemtypeid == ItemTypeId.GoldKeyItem) return false;
			// else if (item.itemtypeid == ItemTypeId.RenameCardItem) return false;
			// else if (item.itemtypeid == ItemTypeId.ShenShouExchangeItem) return false;
			// else if ((item.itemtypeid == ItemTypeId.Present && itemId >= 337939 && itemId <= 337940) || item.itemtypeid == ItemTypeId.PetSkillItem) return false;
			// else if (item.itemtypeid == ItemTypeId.GemItem) return false;
			// else return true;
		}
		/** 响应事件监听 */
		private initListener(): void {
			BagProxy.getInstance().on(INSPECT_EQUIP, this, this.onChargeEquip);

		}
		/** 检测背包数据，引导装备 */
		private onChargeEquip(): void {
			let bagItem: game.modules.bag.models.BagVo = this.getBagGameItemData(BagTypes.BAG);
			let equipArr = new Laya.Dictionary;   //存储类型
			let _equipItem: game.modules.bag.models.BagVo = this.getBagGameItemData(BagTypes.EQUIP);
			for (let _equindex = 0; _equindex < _equipItem.items.length; _equindex++) {
				let id = _equipItem.items[_equindex].id;
				let equipType = StrengTheningModel.getInstance().equipEffectData[id].eequiptype;
				equipArr.set(equipType, id);
			}
			if (!bagItem || !_equipItem) return;
			let level = HudModel.getInstance().levelNum;
			let shape = LoginModel.getInstance().roleDetail.shape;
			let school = LoginModel.getInstance().roleDetail.school;
			let sex = shape % 2 == 0 ? Sex.woman : Sex.man;
			for (let _bagItem = 0; _bagItem < bagItem.items.length; _bagItem++) {
				let _bagitem = bagItem.items[_bagItem] as game.modules.bag.models.ItemVo;
				if (120000 <= _bagitem.id && _bagitem.id <= 130099)//装备数据
				{
					let equipType = StrengTheningModel.getInstance().equipEffectData[_bagitem.id].eequiptype;
					if (equipArr.keys.indexOf(equipType) != -1) {//检测到同部位装备
						let equid = equipArr.get(equipType);
						let equobj = BagModel.getInstance().getItemAttrData(equid);
						let bagobj = BagModel.getInstance().getItemAttrData(_bagitem.id);
						let equlevel = equobj.level;
						let baglevel = bagobj.level;
						//判断等级
						if (level < baglevel) continue;
						let daya = game.modules.strengThening.models.StrengTheningModel.getInstance().equipEffectData;
						let needsex = game.modules.strengThening.models.StrengTheningModel.getInstance().equipEffectData[_bagitem.id].sexNeed;
						//判断性别
						if (needsex != Sex.ManOrWomen && needsex != sex) continue;
						let needSchool: string = game.modules.strengThening.models.StrengTheningModel.getInstance().equipEffectData[_bagitem.id].needCareer;
						let canschool = needSchool.split(";");
						//判断职业
						if (needSchool != "0" && canschool.indexOf(school.toString()) == -1) continue;
						{
							let allequLev = equlevel + equobj.nquality * 10;
							let allbagLev = baglevel + bagobj.nquality * 10;
							if (allbagLev > allequLev) {
								BagModel.getInstance().addItemUseGuide.set(_bagitem.id, _bagitem);
								/** 如果容器中存在指定物品才刷新界面 */
								let str = "装备";
								BagProxy.getInstance().event(ADDITEM_USE_GUIDE, str);
								return;
							}
						}


					}
				}
			}
		}
		/**获取当前位置是否存在装备数据
		 * @param equipType 位置
		  */
		public _getequipTypeisEquipped(equipType: number): boolean {
			let bag: game.modules.bag.models.BagVo = BagModel.getInstance().getBagGameItemData(BagTypes.EQUIP);
			let items = bag.items as game.modules.bag.models.ItemVo[];
			if (items.length == 0) return false;
			for (let _index = 0; _index < items.length; _index++) {
				let id = items[_index].id;
				let _equipType = StrengTheningModel.getInstance().equipEffectData[id].eequiptype;
				if (equipType == _equipType) return true;
			}
			return false;

		}

		/** 临时处理删除东西
		 * @param itemkey 要从背包删除掉的道具key
		 * @param flag true:进行记录数据  false：删除记录数据
		 * @describe 当服务端下发移除道具的协议时，客户端若没有可以移除的道具，进入此方法，暂时字典记录下这个道具key，标记是要移除掉该道具
		 * 			后续服务端要有下发增加该道具的协议，再把该道具移除掉，字典也删掉这条记录，不给背包添加该道具
		 * 			此方法只为暂时处理客户端会先接收到服务端下发删除道具的协议，但实际上客户端背包这边并没有该道具的数据
		 */
		public tempBankBag(itemkey: any, flag: boolean): void {
			if (flag && !this.lendItemsDic.get(itemkey)) {//如果是要借出道具，并且没有该道具被借出的记录				
				this.lendItemsDic.set(itemkey, true);//则新建一条记录
			}
			else {//如果是还道具回来
				let value = this.lendItemsDic.get(itemkey);
				if (value) {
					this.lendItemsDic.remove(itemkey);//移除记录
				}
			}
		}

		/** 获得道具总类型
		 * @param itemid 道具id
		 * @describe 除16所得余数对应道具类型的大类
		 */
		public getItemTotalType(itemid: number): number {
			let itemtypeid = this.itemAttrData[itemid]["itemtypeid"];//道具类型id
			return itemtypeid % 16;
		}
		/** 判断该道具所在的背包里是否为绑定
		 * @param flags 判断是否为绑定的标识，该参数可能有多种值来判断是否为绑定
		 */
		public itemIsBind(flags: number): boolean {
			if (flags == FlagsType.BIND_CANNOTONSTALL || flags == FlagsType.BIND) {
				return true;//返回是绑定状态的判断
			}
			else {
				return false;//返回不是绑定状态的判断
			}

		}
		//模型设置武器
		static chargeToWeapon(char3D: YxChar3d): void {
			let school = LoginModel.getInstance().roleDetail.school;
			let shape = LoginModel.getInstance().roleDetail.shape;
			let sex = shape % 2 == 0 ? Sex.woman : Sex.man;
			let weaponName = LoginModel.getweaponBySchool(school, sex);
			let bag: game.modules.bag.models.BagVo = BagModel.getInstance().getBagGameItemData(BagTypes.EQUIP);
			let items = bag.items as bag.models.ItemVo[];
			for (var _i = 0; _i < items.length; _i++) {
				let id = bag.items[_i].id;
				let obj = BagModel.getInstance().getItemAttrData(id);
				let equipType = StrengTheningModel.getInstance().equipEffectData[id].eequiptype;
				if (equipType != EquipType.ARMS) continue
				let weaponNum = StrengTheningModel.getInstance().equipEffectData[id].weaponid;
				char3D.setWeaponSlotByAvatar(weaponNum, weaponName);
				return;
			}
			char3D.setWeapon(-1);
		}
		//设置unit武器
		static UnitWeapon(unit:Unit):void
		{
			if( unit.School < 0 ) unit.School = LoginModel.getInstance().roleDetail.school;
			if( unit.Shape < 0 ) unit.Shape = LoginModel.getInstance().roleDetail.shape;
			let bag: game.modules.bag.models.BagVo = BagModel.getInstance().getBagGameItemData(BagTypes.EQUIP);
			if( !bag ) return;
			let items = bag.items as bag.models.ItemVo[];
			if( !items ) return;
			for (var _i = 0; _i < items.length; _i++) {
				let id = bag.items[_i].id;
				let obj = BagModel.getInstance().getItemAttrData(id);
				let equipType = StrengTheningModel.getInstance().equipEffectData[id].eequiptype;
				if (equipType != EquipType.ARMS) continue
				let weaponNum = StrengTheningModel.getInstance().equipEffectData[id].weaponid;
				unit.Weapon = weaponNum;
				return;
			}
			
		}
	}
}
