
enum SErrorCode {
	/**
	 * 寒铁不足
	 */
	TIE_NOT_ENOUGH = -3,
	/**
	 * 图纸不足
	 */
	TUZHI_NOT_ENOUGH = -4,
	/**
	 * 金钱不足
	 */
	MONEY_NOT_ENOUGH = -5,
	/**
	 * 制造符不足
	 */
	ZHI_ZHAO_FU_NOT_ENOUGH = -11,
	/**
	 * 强化石不足
	 */
	QIANG_HUA_SHI_NOT_ENOUGH = -12,
	/**
	 * 修理材料不足
	 */
	XIU_LI_CAI_LIAO_NOT_ENOUGH = -13
}

enum repairResult {
	/**修理成功 */
	REPAIR_SUCCESS = 1,
	/**修理失败 */
	REPAIR_FAIL = 0
}

module game.modules.strengThening.models {
	export class StrengTheningModel {
		/**装备id */
		public id: number;
		/**装备打造表 */
		public equipMakeInfoData: Object = {};
		/**装备表1 */
		public equipEffectData: Object = {};
		/**装备表-宝石-修理 */
		public equipItemAttrData: Object = {};
		/**宝石表 */
		public gemEffectData: Object = {};
		/**杂货表 */
		public groceryEffectData: Object = {};
		/**道具类型表 */
		public itemTypeData: Object = {};
		/**宝石类型表 */
		public gemTypeData: Object = {};
		/**装备部件对应表 */
		public equipPosNameData: Object = {};
		/**道具合成表 */
		public cequipCombinData: Object = {};
		/**装备附加属性库 */
		public equipAddattributelibData: Object = {};
		/**装备附加属性库by skillid */
		public equipAddattributelibDataBySkill: Object = {};
		/**装备生成基础属性表 */
		public equipIteminfoData: Object = {};
		/**属性效果id表 */
		public attributeDesConfigData: Object = {};
		/**获取途径表 */
		public comeFromData: Object = {};
		/**强化信息 */
		public StrengTheningDatail: StrengTheningDatailVo;
		/**拥有的装备id */
		public haveEquIdArr: Array<any> = [];
		/**拥有的杂货id */
		public havegroceryEffectArr: Array<any> = [];
		/**玩家拥有的宝石id、数量 */
		public haveGemIdArr: Array<any> = [];
		/** 镶嵌列表要显示的装备 */
		public insetEquipment: Dictionary = new Laya.Dictionary;
        /**
		 * 物品边框
		 */
		public frameSkinArr: Array<any> = [
			"common/ui/tongyong/baikuang.png",    //白
			"common/ui/tongyong/lvkuang.png",     //绿框
			"common/ui/tongyong/lankuang.png",    //蓝框
			"common/ui/tongyong/zikuang.png",     //紫框
			"common/ui/tongyong/jinkuang.png"];   //金框
        /**
		 * 装备tips
		 */
		public equipTips: Array<any> = [];
		public tabNum: number = 0;
		/**强化id */
		public strengTheningId = -1;
		/**强化提示 */
		public static makeType = {
			make_qinghua: "强化打造不同品质装备概率",
			make_putong: "强化打造不同品质装备概率"
		}
		constructor() {
		}
		/**
		 * 显示界面的拥有银币数量
		 */
		public inintHaveMoney(haveMoneylab): void {
			var sliverIcon = bagModel.getInstance().sliverIcon;  //银币
			if (sliverIcon == undefined) {
				haveMoneylab.text = "0";
			} else {
				haveMoneylab.text = sliverIcon + "";
			}
		}
		public static _instance: StrengTheningModel;
		public static getInstance(): StrengTheningModel {
			if (!this._instance) {
				this._instance = new StrengTheningModel();
			}
			return this._instance;
		}
		public static clearModelData(): void {
			strengThening.models.StrengTheningModel._instance.StrengTheningDatail = new StrengTheningDatailVo();
			strengThening.models.StrengTheningModel._instance.haveEquIdArr = [];
			strengThening.models.StrengTheningModel._instance.havegroceryEffectArr = [];
			strengThening.models.StrengTheningModel._instance.haveGemIdArr = [];
			strengThening.models.StrengTheningModel._instance.insetEquipment = new Laya.Dictionary();
		}
		/**获取当前装备镶嵌的宝石 
		 * @param packid 背包Id
		 * @param key  key
		*/
		public equGem(packid, key) {
			var diamondID = [];
			var equipTips = models.StrengTheningModel._instance.equipTips;
			for (var i in equipTips) {
				var equPackid = equipTips[i].packid;   //背包id
				var equKey = equipTips[i].keyinpack;  //装备的key
				if (packid == equPackid && key == equKey) {
					diamondID = equipTips[i].tips.diamondID;
					return diamondID;
				}
			}
			return diamondID;
		}
		/** 获取当前需要镶嵌的装备在先前界面初始化后的位置 */
		public getInsertEquipPos(equarr:Array<any> = []):number
		{
			let  packid_key = this.insetEquipment.keys[0];
			let  key_value = this.insetEquipment.get(packid_key);
			for (let _index = 0; _index < equarr.length; _index++) 
			{
				if(equarr[_index].packid == packid_key && equarr[_index].key == key_value)
				{
					this.insetEquipment.clear();
					return _index;
				}
			}
			return -1;
		}
		/**当前装备是否是已经装备的
		 * @param equipId 装备id
		 * @param equipKey 装备key
		 */
		public isWearEquip(equipId:number, equipKey:number) {
			var isWear = false;
			var bag3 = bagModel.getInstance().bagMap[BagTypes.EQUIP];
			let items = [];
			if(bag3){
				items = bag3.items;
			}
			for (let i in items) {
				let id = items[i].id;
				let key = items[i].key;
				if (id == equipId && key == equipKey) {
					isWear = true;
				}
			}
			return isWear;
		}
	}
}