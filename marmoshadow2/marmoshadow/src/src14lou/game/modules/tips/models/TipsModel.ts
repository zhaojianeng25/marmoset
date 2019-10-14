
enum TIPS_TYPE {
	/**
	 * 背包
	 */
	BAG = 1,
	/**
	 * 强化
	 */
	QIANGHUA = 2,
	/**
	 * 宠物的技能
	 */
	SKILL = 3,
	/**
	 * 通用的物品tips
	 */
	commonItem = 4,
	/**
	 * 活动
	 */
	ACTIVITY = 5,
	/**
	 * 客户端说明类型提示信息
	 */
	CLIENTMESSAGE = 6,
	/**
	 * 伙伴技能
	 */
	HUOBANSKILL = 7,
	/**
	 * 客户端弹窗类型tips
	 */
	CLIENT_TIPS_MESSAGE = 8,
	/**
	 * 宠物装备背包
	 */
	PETEQUIP = 9,
	/**
	 * 拍卖行tips
	 */
	AUCTION = 10,
}
/** 物品对应的详细类型 只针对页面的跳转，直接使用不算计 */
enum ItemTypeId {
	/**打造材料 */
	TuzhiItem = 2470,
	/**杂货*/
	OtherItem = 150,
	/**奖励 */
	Present = 4262,
	/**武器制造材料 */
	ForgeStone = 310,
	/**裁缝制造材料 */
	TailorDye = 326,
	/**炼金制造材料 */
	SmeltFusion = 342,
	/**打造图纸*/
	TuzhiMake = 422,
	/**洗点道具 */
	TimeReturn = 294,
	/**临时符 */
	AttrUpItem = 358,
	/**藏宝图 */
	TreasuremapItem = 118,
	/**高级藏宝图 */
	SuperTreasureMapItem = 198,
	/**巨龙残骸(合成藏宝图)*/
	SynthesisTresureMap = 374,
	/**光环碎片(合成光环卷轴) */
	FormBookHalf = 262,
	/**光环卷轴)*/
	FormBook = 278,
	/**人物专精道具 */
	RoleParticleBook = 566,
	/**宠物专精道具*/
	PetParticleBook = 550,
	/**人物染色 */
	RoleColorItem = 4534,
	/**人物染色*/
	PetColorItem = 4550,
	/**瑟银钥匙 */
	SilverKeyItem = 4566,
	/**氪金钥匙*/
	GoldKeyItem = 4582,
	/**更名卡 */
	RenameCardItem = 4614,
	/**礼物 */
	ShenShouExchangeItem = 4630,
	/**宠物技能&*/
	PetSkillItem = 49,
	/**宝石 */
	GemItem = 5,

}
/**itemTips的培新 */
enum ITEM_TYPE {
	/**背包 */
	BAG_ITEM = 1,
	/**强化 */
	QIANGHUA_ITEM = 2,
	/**签到*/
	QIANDAO_ITEM = 3,
	/**技能*/
	SKILL_ITEM = 4,
	/**奖励 */
	REWARD_ITEM = 5,
	/**活动 */
	ACTIVITY_ITEM = 6,
}

module game.modules.tips.models {
	export class TipsModel {
		/**程序内字符串表 */
		public cstringResConfigData: Object = {};
		/**装备洗练表 */
		public equipRefineInfoData: Object = {};
		/**装备洗特技表 */
		public equipRefineSkillInfoData: Object = {};
		/**附魔效果配置表 */
		public cfumoeffectformulaConfigData: Object = {};
		/**暂时存储洗练返回的属性 */
		public equipWashAttr: Array<any> = [];
		/** 存放是哪个界面打开了查看道具信息tips,供查看道具信息tips跳转拍卖行使用 */
		public whichView: string = "";
		/** 存放当前被查看信息的道具id */
		public currItemId: number = -1;
		/** 存放当前被查看信息的道具key */
		public currItemKey: number = -1;
		/**t特技特效显示表 */
		public equipSkillData: Object = {};
		/**按钮的名称 */
		static stringType = {
			fenjie: "分解",
			shanghui: "商会出售",
			paimai: "拍卖",
			hecheng: "合成",
			drop: "丢弃",
			xiangqian: "镶嵌",
			xilian: "洗炼",
			chongzhu: "重铸",
			xiteji: "洗特技",
			equipType: "类型:",
			cishu: "次数:",
			huoyuedu: "活跃度奖励:",
			huodongshijian: "活动时间:",
			roleNum: "人数要求:",
			levelNum: "等级要求:",
			zhiliao: "治疗强度",
			zhudong: "主动",
			itemNotEnough: "卷轴碎片不足5个，无法合成阵法卷轴",
		}
		public static _instance: TipsModel;
		public static getInstance(): TipsModel {
			if (!this._instance) {
				this._instance = new TipsModel();
			}
			return this._instance;
		}
		public static clearModelData(): void {
			tips.models.TipsModel._instance.equipWashAttr = [];
			tips.models.TipsModel._instance.whichView = "";
			tips.models.TipsModel._instance.currItemId = -1;
			tips.models.TipsModel._instance.currItemKey = -1;
		}
        /**
		 * 获取背包中装备的key
		 */
		public getKey(bag, equId) {
			var items = bag.items;  //物品列表
			for (var i = 0; i < items.length; i++) {
				var id = items[i].id;   //物品id
				if (equId == id) {
					var keyinpack = items[i].key;
					return keyinpack;
				}
			}
			return -1;
		}
		/**显示需要银币的数量，改变颜色 */
		public showNeedNum(needNum: number, haveNum: number, label: Label, isMoney: boolean): void {
			if (isMoney) {
				label.text = needNum + "";
				if (haveNum >= needNum) {
					label.color = "#FFF2DF";
				} else {
					label.color = "#FF2800";
				}
			} else {
				var iHaveNum = 0;
				if (haveNum > 0) {
					iHaveNum = haveNum;
				}
				label.text = iHaveNum + "/" + needNum;
				if (haveNum >= needNum) {
					label.color = "#0A6404";
				} else {
					label.color = "#FF2800";
				}
			}
		}

		/**当前装备是否是宠物装备 */
		public isPetEquip(equipId) {
			var isPetEquip = false;
			if (equipId >= 130000 && equipId <= 130100) {  //当前装备是否为宠物装备
				isPetEquip = true;
			}
			return isPetEquip;
		}

		/**
		 * 
		 * @param bagType 背包类型
		 * @param keyinpack key
		 * @param data 
		 */
		public ss(bagType, keyinpack, data) {
			var tipsVo: game.modules.strengThening.models.TipsVo = new game.modules.strengThening.models.TipsVo();
			var foodVo: game.modules.strengThening.models.FoodVo = new game.modules.strengThening.models.FoodVo();
			var bag = BagModel.getInstance().getBagGameItemData(BagTypes.BAG);
			var items = bag.items;
			for (var i = 0; i < items.length; i++) {
				var key = items[i].key;
				if (key == keyinpack) {
					var id = items[i].id;
					if (120000 <= id && id <= 126675 || 140000 <= id && id <= 140005 || 10000 <= id && id <= 10009) {   //装备  
						tipsVo.fromByteArray(data);
						return tipsVo;
					} else if (111000 <= id && id <= 111053) {
						foodVo.fromByteArray(data);
						return foodVo;
					}
				}
			}
		}

		/**
		* 返回装备背包特技信息
		*/
		public getEquipStunt() {
			var equipTips = StrengTheningModel.getInstance().equipTips;
			let equipStunt = [];
			for (var i = 0; i < equipTips.length; i++) {
				var tipsKey = equipTips[i].keyinpack;
				var tipsPackid = equipTips[i].packid;
				var tips = equipTips[i].tips;
				var baseAttr = tips.baseAttr; //基础属性
				var addAttr = tips.addAttr; //附加属性
				var effect = tips.effect;  //特效
				var skill = tips.skill;  //特技

				if (skill && skill != 0)
					equipStunt.push(equipTips[i]);
			}
			return equipStunt;
		}

		/** 获得装备附魔属性的中文名字
		 * @param shuxingid 属性id
		 */
		public getEquipFuMoName(shuxingid: number): string {
			let shuxingName = "";
			if (shuxingid) {
				switch (shuxingid) {
					case shuxing.MAX_HP:
						shuxingName = "生命";
						break;
					case shuxing.ATTACK:
						shuxingName = "物理攻击";
						break;
					case shuxing.MAGIC_ATTACK:
						shuxingName = "法术攻击";
						break;
					case shuxing.DEFEND:
						shuxingName = "物理防御";
						break;
					case shuxing.MAGIC_DEF:
						shuxingName = "法术防御";
						break;
					case shuxing.SP:
						shuxingName = "怒气";
						break;
					case shuxing.ATTACK:
						shuxingName = "治疗强度";
						break;
					case shuxing.SEAL:
						shuxingName = "控制命中和控制抗性";
						break;
					case shuxing.SPEED:
						shuxingName = "速度";
						break;
				}
			}
			return shuxingName;
		}

		/** 获得附魔临时加上属性的文本内容
		 * @param fuMoShuXingData 附魔临时加属性的数据
		 */
		public getFuMoHtmlStr(fuMoShuXingData): string {
			let html = "";
			if (fuMoShuXingData.length != 0) {
				let _enhancementAttr: Laya.Dictionary = fuMoShuXingData[0].enhancementAttr;//当时附魔的属性数据
				let _keys = _enhancementAttr.keys;//附魔的属性id
				let _value = _enhancementAttr.get(_keys[0]);//附魔的属性值
				let _shuxingName = this.getEquipFuMoName(_keys[0]);
				let _endTime = fuMoShuXingData[0].enhancementtime;//临时附魔结束的时间戳
				let _currTime = (new Date()).valueOf();//当前时间的时间戳
				let _lastTime = Number(_endTime) - Number(_currTime);
				if (_lastTime > 0) {
					_lastTime = Math.round(_lastTime / 1000 / 60 / 60 % 24);
					let _lastTimeStr = "&nbsp;" + this.cstringResConfigData[2162].msg + _lastTime + this.cstringResConfigData[318].msg;
					html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
					html += "<span style='color:#13FF00;fontSize:24'>" + this.cstringResConfigData[11286].msg + _shuxingName + "&nbsp;+&nbsp;" + _value + _lastTimeStr + "</span><br/>";
				}
			}
			return html;
		}
	}
}