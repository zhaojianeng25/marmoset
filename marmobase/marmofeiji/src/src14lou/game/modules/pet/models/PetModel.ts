/** 宠物种类图片 */
const PetKind = [
	//野生
	{ url: "common/ui/pet/chongwu_yesheng.png", kind: 1 },
	//宝宝
	{ url: "common/ui/pet/chongwu_bb.png", kind: 2 },
	//变异
	{ url: "common/ui/pet/chongwu_bianyi.png", kind: 3 },
	//神兽
	{ url: "common/ui/pet/chongwu_shenshou.png", kind: 4 },
	//灵兽
	{ url: "common/ui/pet/baobaolingshou.png", kind: 5 },
	//变异灵兽
	{ url: "common/ui/pet/bianyilingshou.png", kind: 6 }
]
/** 宠物栏类型 */
enum PetColumnTypes {
	/** 人物身上的宠物栏 */
	PET = 1,
	/** 人物的仓库宠物栏 */
	DEPOT = 2,
	/** 找宝网寄售宠物栏 */
	XUNBAOSELLPET = 3,
	/** 找宝网买入宠物栏 */
	XUNBAOBUYPET = 4,
	/** 拍卖宠物栏 */
	MARKETPET = 5,
	/** 黑市宠物栏 */
	BLACKMARKETPET = 6,
	/** 拍卖临时宠物栏 */
	MARKETPETTEMP = 7
}
/** 宠物相关操作出错 */
enum PetError {
	/** 未知错误 */
	UnkownError = -1,
	/** key错误。找不到对应宠物 */
	KeyNotFound = -2,
	/** 添加宠物，或者存取宠物时，宠物栏已经满了 */
	PetcolumnFull = -3,
	/** 同背包内宠物不能移动 */
	WrongDstCol = -4,
	/** 展示宠物不能入仓 */
	ShowPetCantMoveErr = -5,
	/** 参战宠物不能入仓 */
	FightPetCantMoveErr = -6,
	/** 宠物名称过长 */
	PetNameOverLen = -7,
	/** 宠物名称过短 */
	PetNameShotLen = -8,
	/** 宠物名字非法 */
	PetNameInvalid = -9,
	/** 展示的宠物不能放生 */
	ShowPetCantFree = -10,
	/** 正在参战的宠物不能放生 */
	FightPetCantFree = -11,
	/** 错误的放生随机码 */
	WrongFreeCode = -12,
	/** 有宠物装备 */
	HasEquip = -13
}
/** 宠物种类 */
enum PetTypeEnum {
	/** 野生 */
	WILD =1,
	/** 宝宝 */
	BABY =2,
	/** 变异 */
	VARIATION = 3,
	/** 神兽 */
	SACREDANIMAL = 4
}

module game.modules.pet.models {
	/** 存放宠物相关数据 PetModel */
	export class PetModel {
		/**当前宠物名字*/
		public petName: string;
		/**所有宠物信息 key为宠物key*/
		public pets: Laya.Dictionary;
		/**当前选择宠物的信息*/
		public petbasedata: PetInfoVo;
		/**当前选择宠物的技能*/
		public petskill: Array<PetSkillVo>;
		/**当前选择宠物的基础加点*/
		public petinitfight: BasicFightPropertiesVo;
		/**当前选择宠物的属性点*/
		public petbasicfight: BasicFightPropertiesVo;
		/**数据表*/
		public petCPetAttrData: Object = {};
		/**神兽数据表*/
		public petCPetShenShouIncdata: Object = {};
		/**宠物食品表*/
		public petCPetFeedItemListData: Object = {};
		/**宠物升级经验*/
		public petCPetNextExpData: Object = {};
		/**重置属性*/
		public petCPetResetPointConfigData: Object = {};
		/**仓库扩充价格*/
		public petCPetDepotPriceData: Object = {};
		/**c宠物一级属性转换表*/
		public petCPetAttrModDataData: Object = {};
		/**c宠物套装BUFF表*/
		public petEquipSuitBuffData: Object = {};
		/**C宠物装备精铸表*/
		public petEquipHeChengData: Object = {};
		/**c宠物技能显示表*/
		public petSkillConfigData: Object = {};
		/**宠物认证*/
		public petSkillupgradeData: Object = {};
		/**物品表*/
		public petCPetFeedItemAttrData: Object = {};
		/** 宠物套装Buff配置表 */
		public petSuitBuffData: Object = {};
		/**当前选择的第几个宠物*/
		public currentselect: number;
		/**合宠后查看详情*/
		public hechognresultck = 0;
		/**合宠查看详情*/
		public ischakanxq = 0;
		/** 快捷购买表*/
		public cQuickBuyData: Object = {};
		/**宠物商店数据*/
		public cPetShopData: Object = {};
		/**快捷购买信息*/
		public shopinfo: Array<GoodsVo>;
		/**当前选择tab选项 */
		public tabnum: number = 0;
		/**选择图鉴的第几项*/
		public tujiannum: number = 0
		/**合宠结果*/
		public resultkey: number = -1;
		/**是否跳到洗练界面 */
		public changexilian: number = -1;
		/**技能学习界面*/
		public studyskill: number = -1;
		/** 战斗宠物属性刷新 */
		public battlePetAttr: Dictionary = new Laya.Dictionary();
		/** 可回收的野生宠物 */
		public yeShengPet: Array<game.modules.pet.models.PetRecoveryInfo>;
		/** 可找回珍宠的列表数据 */
		public recoverPets:Array<any> = [];

		constructor() {
			PetModel._instance = this;
			this.petName = "";
			this.petbasedata = new PetInfoVo();
			this.pets = new Laya.Dictionary();
			this.currentselect = 0;
		}
		public static _instance: PetModel;
		public static getInstance(): PetModel {
			if (!this._instance) {
				this._instance = new PetModel();
			}
			return this._instance;
		}
		public static clearModelData(): void {
			pet.models.PetModel._instance.petName = "";
			pet.models.PetModel._instance.pets = new Laya.Dictionary();
			pet.models.PetModel._instance.petbasedata = new models.PetInfoVo();
			pet.models.PetModel._instance.petskill = [];
			pet.models.PetModel._instance.petinitfight = new models.BasicFightPropertiesVo();
			pet.models.PetModel._instance.petbasicfight = new models.BasicFightPropertiesVo();
			pet.models.PetModel._instance.currentselect = 0;
			pet.models.PetModel._instance.hechognresultck = 0;
			pet.models.PetModel._instance.ischakanxq = 0;
			pet.models.PetModel._instance.shopinfo = [];
			pet.models.PetModel._instance.tabnum = 0;
			pet.models.PetModel._instance.tujiannum = 0;
			pet.models.PetModel._instance.resultkey = -1;
			pet.models.PetModel._instance.changexilian = -1;
			pet.models.PetModel._instance.studyskill = -1;
			pet.models.PetModel._instance.battlePetAttr = new Laya.Dictionary();
			pet.models.PetModel._instance.yeShengPet = [];
			pet.models.PetModel._instance.recoverPets = [];
		}
		/**是否是主动技能 参数为宠物key值*/
		public petskilllist(petkey?: number) {
			let zhudonglist: Array<PetSkillVo> = []
			let petskey: number
			if (petkey) {//是否有选择其他宠物
				petskey = petkey
			}
			else {//默认为参战宠物
				petskey = game.modules.createrole.models.LoginModel.getInstance().roleDetail.petIndex
			}
			let pet: PetInfoVo = this.pets.get(petskey)
			let petskillinfo: Array<PetSkillVo> = pet.skills
			for (var index = 0; index < petskillinfo.length; index++) {
				let petskill: PetSkillConfigBaseVo = PetModel.getInstance().petSkillConfigData[petskillinfo[index].skillId] as PetSkillConfigBaseVo;
				if (petskill.skilltype == 2) {//宠物技能类型 1 为被动 2为主动
					zhudonglist.push(petskillinfo[index])
				}
			}
			return zhudonglist;
		}
		/**中文字符串存放 */
		public static chineseStr = {
			/**等级 */
			dengji: "等级.",
			/**评价 */
			pingjia: "评价 "
		}
		/**资质枚举*/
		public static zizhi = {
			/**体质 */
			tizhi: 1460,
			/**速度*/
			speed: 1480,
			/**攻击*/
			attack: 1440,
			/**法术*/
			magic: 1470,
			/**防御*/
			defence: 1450
		}
		/**当前选择的宠物的最大数量 */
		public static petnum = {
			/**普宠*/
			normal: 31,
			/**灵兽*/
			lingshou: 13,
			/**神兽*/
			shenshou: 7
		}
		/**显示第一只宠物的id */
		public static petid = {
			/**普宠*/
			normal: 43000,
			/**灵兽*/
			lingshou: 43150,
			/**神兽*/
			shenshou: 43194
		}
		/**普宠类型 */
		public static normal = {
			/**野生 */
			yesheng: 43000,
			/**宝宝*/
			baobao: 43050,
			/**变异*/
			bianyi: 43100
		}
		/**灵兽类型id*/
		public static lingshou = {
			/**宝宝*/
			baobao: 43150,
			/**变异*/
			bianyi: 43172
		}
		/**宠物类型*/
		public static pettype = {
			/**野生 */
			yesheng: 0,
			/**宝宝 */
			baobao: 1,
			/**普宠变异*/
			puchongbianyi: 2,
			/**神兽 */
			shenshou: 3,
			/**灵兽 */
			lingshou: 4,
			/**灵兽变异 */
			bianyi: 5
		}
		/**宠物装备id范围 */
		public static petequipid = {
			/**宠物装备开始的id */
			start: 130000,
			/**宠物装备结束的id*/
			end: 130099
		}
		/** 获取宠物的头像图
		 * @param petid 宠物id
		 */
		public getPetAvatarImg(petid: number): string {
			//该宠物基本数据
			let petBaseData: PetCPetAttrBaseVo = this.petCPetAttrData[petid];
			//造型id
			let petModelId = petBaseData.modelid;
			//小头像id
			let avatarId = LoginModel.getInstance().cnpcShapeInfo[petModelId]["littleheadID"];
			if (avatarId != undefined && avatarId != null) {
				return "common/icon/avatarpet/" + avatarId + ".png";
			}
			else {
				return null;
			}
		}
		/** 获取宠物的品质边框图
		 * @param petid 宠物id
		 */
		public getPetQualityFrameImg(petid: number): string {
			//该宠物基本数据
			let petBaseData: PetCPetAttrBaseVo = this.petCPetAttrData[petid];
			//品质
			let petQuality = petBaseData.quality;
			if (petQuality != undefined && petQuality != null) {
				return bag.BagSystemModule.getGameItemFrameColorResource(petQuality);
			}
			else {
				return null;
			}
		}

		/** 获取宠物的种类图
		 * @param petKind 宠物的种类
		 */
		public getPetKindImg(petKind: number): string {
			for (let value of PetKind) {
				if (value.kind == petKind) {
					return value.url;
				}
			}
			return null;
		}
		/** 判断是否珍品
		 * @param petid 宠物id
		 */
		public isZhenPin(petid: number): boolean {
			//该宠物基本数据
			let petBaseData: PetCPetAttrBaseVo = this.petCPetAttrData[petid];
			//是否珍品
			let unusualid = petBaseData.unusualid;
			if (unusualid == 1 || unusualid == 2) {
				return true;
			}
			else {
				return false;
			}
		}
		/** 获得玩家角色身上的神兽数据 */
		public getShenshouDatas(): Laya.Dictionary {
			let _dic = new Laya.Dictionary();
			let _petsKeys = this.pets.keys;
			for (let i = 0; i < _petsKeys.length; i++) {
				let _pet: pet.models.PetInfoVo = this.pets.get(_petsKeys[i]);
				if (_pet.kind == PetTypeEnum.SACREDANIMAL) {
					_dic.set(_petsKeys[i], _pet);
				}
			}
			return _dic;
		}
	}
}