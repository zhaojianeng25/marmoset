/**生活技能 */
enum lifeSkill{
	/**锻炼 */
	DUANLIAN = 320103,
	/**观想 */
	GUANXIANG = 320104,
	/**烹饪 */
	PENGREN = 310201,
	/**炼金 */
	LIANJIN = 310101,
	/**锻造 */
	DUANZAO = 300101,
	/**裁缝 */
	CAIFENG = 300201,
	/**珠宝 */
	ZHUBAO = 300301,
	/**收获 */
	SHOUHUO = 320105,
}
/**职业序号 */
enum zhiye{
	/**云霄殿 */
	yunxiao = 11,
	/**大荒岭 */
	dahuang = 12,
	/**苍羽宫 */
	cangyu = 13,
	/**飞雪崖 */
	feixue = 14,
	/**天雷狱 */
	tianlei = 15,
	/**无量宫 */
	wuliang = 16,
	/**玄冥池 */
	xuanming = 17,
	/**七星观 */
	qixing = 18,
	/**丹阳观 */
	danyang = 19
}
/**药品 */
enum drug{
	/**仙露酒 */
	XIANLUJIU = 111012,
	/**洗尘丹 */
	XICHENDAN = 111015,
	/**还命药 */
	HUANMINGYAO = 111016,
	/**聚灵浆 */
	JULINGJIANG = 111014,
	/**血气丹 */
	XUEQIDAN = 111013,
	/**破妄尘 */
	POWANGCHEN = 111018,
	/**仙露酒图片 */
	XIANLUJIU_IMG = 20183,
	/**洗尘丹图片 */
	XICHENDAN_IMG = 20186,
	/**还命药图片 */
	HUANMINGYAO_IMG = 20187,
	/**聚灵浆图片 */
	JULINGJIANG_IMG = 20185,
	/**血气丹图片 */
	XUEQIDAN_IMG = 20184,
	/**破妄尘图片 */
	POWANGCHEN_IMG = 20189
}
enum dazao{
	/**武器模具图片 */
	WUQI_IMG = 20011,
	/**防具模具图片 */
	FANGJU_IMG = 20012,
	/**饰品模具图片 */
	SHIPIN_IMG = 20013
}
/**附魔技能格id */
enum FUMO{
	/**生命附魔卷轴-云霄殿 */
	YUNXIAO_SKILLID = 1117,
	/**速度附魔卷轴-大荒岭 */
	DAHUANG_SKILLID = 1217,
	/**愤怒附魔卷轴-苍羽宫 */
	CANGYU_SKILLID = 1317,
	/**法防附魔卷轴-飞雪崖 */
	FEIXUE_SKILLID = 1417,
	/**物攻附魔卷轴-天雷狱 */
	TIANLEI_SKILLID = 1517,
	/**法攻附魔卷轴-无量宫 */
	WULIANG_SKILLID = 1617,
	/**控制附魔卷轴-玄冥池 */
	XUANMING_SKILLID = 1717,
	/**治疗附魔卷轴-七星观 */
	QIXING_SKILLID = 1817,
	/**物防附魔卷轴-丹阳观 */
	DANYANG_SKILLID = 1917,

}
/** 附魔卷轴类型 */
enum ENHANCEMENT_TYPE{
	/** 生命(凌云注灵卷) */
	LIVE_SKILL_ENHANCEMENT_TYPE_HP = 1,
	/** 物攻(炼狱注灵卷) */
	LIVE_SKILL_ENHANCEMENT_TYPE_PY_ATT = 2,
	/** 法攻(上古注灵卷) */
	LIVE_SKILL_ENHANCEMENT_TYPE_IMAGE_ATT = 3,
	/** 物防(魔王注灵卷) */
	LIVE_SKILL_ENHANCEMENT_TYPE_PHY_DEF = 4,
	/** 法防(碧雪注灵卷) */
	LIVE_SKILL_ENHANCEMENT_TYPE_IMAGE_DEF = 5,
	/** 愤怒(苍穹注灵卷) */
	LIVE_SKILL_ENHANCEMENT_TYPE_ANGER = 6,
	/** 治疗(星辰注灵卷) */
	LIVE_SKILL_ENHANCEMENT_TYPE_HEAL = 7,
	/** 控制(神魔注灵卷) */
	LIVE_SKILL_ENHANCEMENT_TYPE_CONTROL = 8,
	/** 速度(洪荒注灵卷) */
	LIVE_SKILL_ENHANCEMENT_TYPE_SPEED = 9
}
/** 服务器返回技能系统的Error信息 */
enum SkillError{
	/** 该技能不属于你的职业 */
	WrongSchool = 1,
	/** 人物等级不够,不能领悟主技能 */
	MainSBCantLearn = 2,
	/** 依赖的技能等级不够,不能领悟 */
	SBCantLearn = 3,
	/** 当前技能已学到最高等级,不能继续学习 */
	MainSBLimit = 4,
	/** 请先升级主技能 */
	SBLimit = 5,
	/** 当前经验不足,不能学习 */
	SBExpLimit = 6,
	/** 当前金钱不足,不能学习 */
	SBMoneyLimit = 7,
	/** 当前行动力不足,不能学习 */
	SBActivityLimit = 8,
	/** 未知错误 */
	UnkownError = 9,
	/** 生活技能ID错误 */
	LiveSkillIdError = 10,
	/** 金钱不足 */
	MoneyNotEnough = 11,
	/** 公会贡献不足 */
	ContributeNotEnough = 12,
	/** 等级不够不能学习 */
	LevelNotEnough = 13,
	/** 需要公会(帮派) */
	NeedFaction = 14,
	/** 技能已经最大了 */
	SkillMaxLimit = 15,
	/** 道具不存在 */
	ItemNotExist = 16,
	/** 一个道具不能炼药 */
	OneStuffCannot = 17,
	/** 技能等级不足 */
	SkillLevelNotEnough = 18,
	/** 没有可以烹饪的食物 */
	NoCookingFood = 19,
	/** 活力不足 */
	EnergyNotEnough = 20
}
module game.modules.skill.models{
	/**
 * 技能系统数据存放类
 */
	export class SkillModel{
		/**j技能显示表 */
		public CSchoolSkillitemBinDic:Object = {};
		/**技能格消耗表 */
		public AcupointLevelUpBinDic:Object = {};
		/**技能格信息表 */
		public AcupointInfoBinDic:Object = {};
		/**s生活技能表 */
		public CLifeSkillBinDic:Object = {};
		/**j继承消耗 */
		public CInheritCostBinDic:Object = {};
		/**s生活技能学习消耗 */
		public CLifeSkillCostBinDic:Object = {};
		/**X修炼技能升级 */
		public CParticeSkillLevelupBinDic:Object = {};
		/**h幻化使用配置表 */
		public CHuanhuaUseBinDic:Object = {};
		/**h幻化信息配置表 */
		public CHuanhuaInfoBinDic:Object = {};
		/**人物信息界面回复字典key:"data",value:服务器返回的信息 */
		public SRspRoleInfoData:Laya.Dictionary;
		/**人物属性刷新字典key:"data",value:服务器返回的信息 */
		public SRetRolePropData:Laya.Dictionary;
		/**转盘开始字典key:"data",value:服务器返回的信息 */
		public SBeginSchoolWheelData:Laya.Dictionary;
		/**服务器：升级到XX级字典key:"data",value:服务器返回的信息 */
		public SUpdateInbornData:Laya.Dictionary;
		/**生活技能升级字典key:"data",value:服务器返回的信息 */
		public SUpdateLearnLiveSkillData:Laya.Dictionary;
		/**返回已经学习的所有修炼技能字典key:"data",value:服务器返回的信息*/
		public SRequestParticleSkillListData:Laya.Dictionary;
		/**如果修炼技能等级有变化会更新字典key:"data",value:服务器返回的信息 */
		public SUpdateLearnParticleSkillData:Laya.Dictionary;
		/**制作食物返回字典key:"data",value:服务器返回的信息 */
		public SLiveSkillMakeFoodData:Laya.Dictionary;
		/**锻造返回字典key:"data",value:服务器返回的信息 */
		public SLiveSkillMakeStuffData:Laya.Dictionary;
		/**服务器返回制作变身卡成功字典key:"data",value:服务器返回的信息 */
		public SLiveSkillMakeCardData:Laya.Dictionary;
		/**制作药品返回字典key:"data",value:服务器返回的信息 */
		public SLiveSkillMakeDrugData:Laya.Dictionary;
		/**返回已经学习的所有生活技能字典key:"data",value:服务器返回的信息 */
		public SRequestLiveSkillListData:Laya.Dictionary;
		/**制作附魔卷轴等级字典key:"data",value:服务器返回的信息 */
		public makeEnhancementLevel:number=0;
		/**制作附魔卷轴技能格id字典key:"data",value:服务器返回的信息 */
		public EnhancementSkillId:number=0;
		/**当前的子界面选择 */
		public currenTabNum:number  = 1;
		/**保存app */
		public appBase:AppBase;
		/**技能数组 */
		public skillArr:Array<any>;
		/**技能图片数组 */
		public skillImgArr:Array<any>;
		/**技能格*/
		public skillGridArr:Array<any>;
		/**技能等级字典key:技能id,value:技能等级 */		
		public skillLevelDic:Laya.Dictionary;
		/** 是否从帮派福利点击生活技能跳转 */
		public isFromClanWelfareJump:boolean = false;
		/** 是否自动添加炼金所需的药材 */
		public isAutoAddNeedDrug:boolean = false;
		/**生活技能等级数据 */
		public LiveSkilllevelData: Laya.Dictionary;

		constructor(){
			SkillModel._instance = this;
			this.SRspRoleInfoData = new Laya.Dictionary();
			this.SRetRolePropData = new Laya.Dictionary();
			this.SBeginSchoolWheelData = new Laya.Dictionary();
			this.SUpdateInbornData = new Laya.Dictionary();
			this.SUpdateLearnLiveSkillData = new Laya.Dictionary();
			this.SRequestParticleSkillListData = new Laya.Dictionary();
			this.SUpdateLearnParticleSkillData = new Laya.Dictionary();
			this.SLiveSkillMakeFoodData = new Laya.Dictionary();
			this.SLiveSkillMakeStuffData = new Laya.Dictionary();
			this.SLiveSkillMakeCardData = new Laya.Dictionary();
			this.SLiveSkillMakeDrugData = new Laya.Dictionary();
			this.SRequestLiveSkillListData = new Laya.Dictionary();		
			this.LiveSkilllevelData = new Laya.Dictionary();
			this.skillArr = new Array<any>();
			this.skillImgArr = new Array<any>();
			this.skillGridArr = new Array<any>();
			this.skillLevelDic = new Laya.Dictionary();
			
		}
		private static _instance:SkillModel;
		public static getInstance():SkillModel {
			if(!this._instance) {
				this._instance = new SkillModel();
			}
			return this._instance;
		}
		public static clearModelData(): void {			
			skill.models.SkillModel._instance.SRspRoleInfoData = new Laya.Dictionary();
			skill.models.SkillModel._instance.SRetRolePropData = new Laya.Dictionary();
			skill.models.SkillModel._instance.SBeginSchoolWheelData = new Laya.Dictionary();
			skill.models.SkillModel._instance.SUpdateInbornData = new Laya.Dictionary();
			skill.models.SkillModel._instance.SUpdateLearnLiveSkillData = new Laya.Dictionary();
			skill.models.SkillModel._instance.SRequestParticleSkillListData = new Laya.Dictionary();
			skill.models.SkillModel._instance.SUpdateLearnParticleSkillData = new Laya.Dictionary();
			skill.models.SkillModel._instance.SLiveSkillMakeFoodData = new Laya.Dictionary();
			skill.models.SkillModel._instance.SLiveSkillMakeStuffData = new Laya.Dictionary();
			skill.models.SkillModel._instance.SLiveSkillMakeCardData = new Laya.Dictionary();
			skill.models.SkillModel._instance.SLiveSkillMakeDrugData = new Laya.Dictionary();
			skill.models.SkillModel._instance.SRequestLiveSkillListData = new Laya.Dictionary();		
			skill.models.SkillModel._instance.skillArr = new Array<any>();
			skill.models.SkillModel._instance.skillImgArr = new Array<any>();
			skill.models.SkillModel._instance.skillGridArr = new Array<any>();
			skill.models.SkillModel._instance.skillLevelDic = new Laya.Dictionary();
			skill.models.SkillModel._instance.isFromClanWelfareJump = false;
			skill.models.SkillModel._instance.isAutoAddNeedDrug = false;			
		}
		/**  */
		public getEquipPosType(tempType:number):number{
			let _pos = -1;
			switch(tempType){
				case ENHANCEMENT_TYPE.LIVE_SKILL_ENHANCEMENT_TYPE_HP:
					_pos = EquipType.CLOTHES;//给衣服附魔生命
					break;
				case ENHANCEMENT_TYPE.LIVE_SKILL_ENHANCEMENT_TYPE_PY_ATT:
					_pos = EquipType.ARMS;//给武器附魔物攻
					break;
				case ENHANCEMENT_TYPE.LIVE_SKILL_ENHANCEMENT_TYPE_IMAGE_ATT:
					_pos = EquipType.NECKLACE;//给项链附魔法攻
					break;
				case ENHANCEMENT_TYPE.LIVE_SKILL_ENHANCEMENT_TYPE_PHY_DEF:
					_pos = EquipType.HELMET;//给头盔附魔物防
					break;
				case ENHANCEMENT_TYPE.LIVE_SKILL_ENHANCEMENT_TYPE_IMAGE_DEF:
					_pos = EquipType.SHOES;//给鞋子附魔魔防
					break;
				case ENHANCEMENT_TYPE.LIVE_SKILL_ENHANCEMENT_TYPE_ANGER:
					_pos = EquipType.BELT;//给腰带附魔愤怒
					break;
				case ENHANCEMENT_TYPE.LIVE_SKILL_ENHANCEMENT_TYPE_HEAL:
					_pos = EquipType.ARMS;//给武器附魔治疗
					break;
				case ENHANCEMENT_TYPE.LIVE_SKILL_ENHANCEMENT_TYPE_CONTROL:
					_pos = EquipType.CLOTHES;//给衣服附魔控制
					break;
				case ENHANCEMENT_TYPE.LIVE_SKILL_ENHANCEMENT_TYPE_SPEED:
					_pos = EquipType.SHOES;//给鞋子附魔速度
					break;
			}
			return _pos;
		}
		/**中文字符串存放 */
		public static chineseStr ={
			/**等级 */
			dengji:"等级.",
			/**40级解锁 */
			forty_jiesuo:"40级解锁",
			/**50级解锁 */
			fifty_jiesuo:"50级解锁",
			/**级解锁 */
			level_jiesuo:"级解锁",
			/**到达 */
			dadao:"达到",
			/**红色 */
			red:"#ff2800",
			/**棕色 */
			brown:"#50321a",
			/**绿色 */
			green:"#13ff00",
			/**好友度解锁 */
			haoyoudu_unlock:"好友度解锁",
			/**不带#号的红色 */
			red_two:"ff2800",
			/**不带#好的绿色 */
			green_two:"13ff00",
		}
	}
}