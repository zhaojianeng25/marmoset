/**
* 技能系统的中转服务
*/
/**技能系统枚举 */
enum SkillEnum {
	/**炼药成功 */
	LIANYAO_SUCCESS = 150105,
	/**活力不足 */
	HUOLI_BUZU = 150100,
	/**炼药所需银币 */
	LIANYAO_YINBI = 6000,
	/**药材序号起始 */
	DRUG_START = 111019,
	/**药材序号结束 */
	DRUG_END = 111023,
	/**食品序号起始 */
	FOOD_START = 111004,
	/**食品序号结束 */
	FOOD_END = 111012,
	/**食品图片序号起始 */
	FOOD_IMG_START = 20175,
	/**食品图片序号结束 */
	FOOD_IMG_END = 20183,
	/**武器模具序号起始 */
	WIQI_START = 100100,
	/**武器模具序号结束 */
	WIQI_END = 100110,
	/**防具模具序号起始 */
	FANGJU_START = 100115,
	/**防具模具序号结束 */
	FANGJU_END = 100125,
	/**饰品模具序号起始 */
	SHIPIN_START = 100130,
	/**饰品模具序号结束 */
	SHIPIN_END = 100140,
	/**10级 */
	TEN_LEVEL = 10,
	/**收获解锁等级 */
	SHOUHUO_LEVEL = 65,
	/**级 */
	JI_TEXT = 3,
	/**变身卡图片序号 */
	KAPIAN_IMG = 31000,
	/**收获技能最大级别 */
	MAX_SHOUHUO_LEVEL = 90,
	/**帮贡不足 */
	BANGGONG_BUZU = 150017,
	/**道具不足 */
	DAOJU_BUZU = 150058,
	/**生活引导提示 */
	YINDAO_TIP = 33142,
	/**引导持续时间 */
	YINDAO_TIME = 3000,
	/**结婚技能图标序号起始 */
	MARRY_START = 195000,
	/**结婚技能图标序号结束 */
	MARRY_END = 195003,
	/**云霄殿技能序号起始 */
	YUNXIAO_START = 110000,
	/**云霄殿技能序号结束 */
	YUNXIAO_END = 110008,
	/**云霄殿技能格序号起始 */
	YUNXIAO_GRID_START = 1111,
	/**云霄殿技能格序号结束 */
	YUNXIAO_GRID_END = 1119,
	/**大荒岭技能序号起始 */
	DAHUANG_START = 120000,
	/**大荒岭技能序号结束 */
	DAHUANG_END = 120008,
	/**大荒岭技能格序号起始 */
	DAHUANG_GRID_START = 1211,
	/**大荒岭技能格序号结束 */
	DAHUANG_GRID_END = 1219,
	/**苍羽宫技能序号起始 */
	CANGYU_START = 130000,
	/**苍羽宫技能序号结束 */
	CANGYU_END = 130008,
	/**苍羽宫技能格序号起始 */
	CANGYU_GRID_START = 1311,
	/**苍羽宫技能格序号结束 */
	CANGYU_GRID_END = 1319,
	/**飞雪涯技能序号起始 */
	FEIXUE_START = 140000,
	/**飞雪涯技能序号结束 */
	FEIXUE_END = 140008,
	/**飞雪涯技能格序号起始 */
	FEIXUE_GRID_START = 1411,
	/**飞雪涯技能格序号结束 */
	FEIXUE_GRID_END = 1419,
	/**天雷狱技能序号起始 */
	TIANLEI_START = 150000,
	/**天雷狱技能序号结束 */
	TIANLEI_END = 150008,
	/**天雷狱技能格序号起始 */
	TIANLEI_GRID_START = 1511,
	/**天雷狱技能格序号结束 */
	TIANLEI_GRID_END = 1519,
	/**无量宫殿技能序号起始 */
	WULIANG_START = 160000,
	/**无量宫技能序号结束 */
	WULIANG_END = 160008,
	/**无量宫技能格序号起始 */
	WULIANG_GRID_START = 1611,
	/**无量宫技能格序号结束 */
	WULIANG_GRID_END = 1619,
	/**玄冥池技能序号起始 */
	XUANMING_START = 161000,
	/**玄冥池技能序号结束 */
	XUANMING_END = 161008,
	/**玄冥池技能格序号起始 */
	XUANMING_GRID_START = 1711,
	/**玄冥池技能格序号结束 */
	XUANMING_GRID_END = 1719,
	/**七星观技能序号起始 */
	QIXING_START = 162000,
	/**七星观技能序号结束 */
	QIXING_END = 162008,
	/**七星观技能格序号起始 */
	QIXING_GRID_START = 1811,
	/**七星观技能格序号结束 */
	QIXING_GRID_END = 1819,
	/**丹阳观技能序号起始 */
	DANGYANG_START = 163000,
	/**丹阳观技能序号结束 */
	DANGYANG_END = 163008,
	/**丹阳观技能格序号起始 */
	DANGYANG_GRID_START = 1911,
	/**丹阳观技能格序号结束 */
	DANGYANG_GRID_END = 1919,
	/**战斗已经升到最高等级 */
	MAX_FIGHT_LEVEL = 141236,
	/**解锁 */
	UNLOCK = 2903,
	/**功效 */
	GONGXIA0 = 11038,
	/**升级 */
	SHENG_JI = 1659,
	/**附魔技能解锁等级 */
	UNLOCK_FUMO = 40,
	/**专精技能 */
	ZHUANGJING_TITLE = 11258,
	/**专精技能提示 */
	ZHUANGJING_TIP = 11259,
	/**属性说明 */
	SHUXING_TITLE = 11486,
	/**属性提示 */
	SHUXING_TIP = 11476,
	/**专精技能学习消耗银币 */
	ZHUANGJING_YINBI = 20000,
	/**幻化卡总数 */
	HUANHUA_NUM = 28,
	/**人物专精技能序号起始 */
	ROLE_ZHUANGJING_START = 360011,
	/**人物专精技能序号结束 */
	ROLE_ZHUANGJING_END = 360015,
	/**宠物专精技能序号起始 */
	PET_ZHUANGJING_START = 360020,
	/**宠物专精技能序号结束 */
	PET_ZHUANGJING_END = 360024,
	/**变身技能序号起始 */
	BIANSHEN_START = 360030,
	/**变身技能序号结束 */
	BIANSHEN_END = 360033,
	/**战斗界面 */
	ZHANDOU_KEY = 1,
	/**生活界面 */
	LIFE_KEY = 2,
	/**专精界面 */
	ZHUANGJING_KEY = 3,
	/**收获技能制作的变身卡序号起始 */
	VCARD_START = 100000,
}
module game.modules.skill.models {
	/**人物信息界面回复 */
	export const SRspRoleInfo_EVENT: string = "SRspRoleInfo";
	/**转盘开始 */
	export const SBeginSchoolWheel_EVENT: string = "SBeginSchoolWheel";
	/**服务器：升级到XX级 */
	export const SUpdateInborn_EVENT: string = "SUpdateInborn";
	/**生活技能升级 */
	export const SUpdateLearnLiveSkill_EVENT: string = "SUpdateLearnLiveSkill";
	/**返回已经学习的所有修炼技能 */
	export const SRequestParticleSkillList_EVENT: string = "SRequestParticleSkillList";
	/**如果修炼技能等级有变化会更新 */
	export const SUpdateLearnParticleSkill_EVENT: string = "SUpdateLearnParticleSkill";
	/**制作食物返回 */
	export const SLiveSkillMakeFood_EVENT: string = "SLiveSkillMakeFood";
	/**锻造返回 */
	export const SLiveSkillMakeStuff_EVENT: string = "SLiveSkillMakeStuff";
	/**服务器返回制作变身卡成功 */
	export const SLiveSkillMakeCard_EVENT: string = "SLiveSkillMakeCard";
	/**制作药品返回 */
	export const SLiveSkillMakeDrug_EVENT: string = "SLiveSkillMakeDrug";
	/**返回已经学习的所有生活技能 */
	export const SRequestLiveSkillList_EVENT: string = "SRequestLiveSkillList";
	/** 获得服务端下发的活力不足错误消息 */
	export const EnergyNotEnough_EVENT: string = "energyNotEnough_event";

	export class SkillProxy extends hanlder.ProxyBase {
		constructor() {
			super();
			SkillProxy._instance = this;
			this.init();
		}
		private static _instance: SkillProxy;
		public static getInstance(): SkillProxy {
			if (!this._instance) {
				this._instance = new SkillProxy();
			}
			return this._instance;
		}

		public init(): void {
			SkillProxy.getInstance();
			this.addNetworkListener();
			Laya.loader.load("common/data/temp/skill.cschoolskillitem.bin", Handler.create(this, this.onloadedSchoolSkillitemComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/role.acupointlevelup.bin", Handler.create(this, this.onloadedAcupointLevelUpComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/role.acupointinfo.bin", Handler.create(this, this.onloadedAcupointInfoComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/skill.clifeskill.bin", Handler.create(this, this.onloadedLifeSkillComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/skill.cinheritcost.bin", Handler.create(this, this.onloadedInheritCostComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/skill.clifeskillcost.bin", Handler.create(this, this.onloadedLifeSkillCostComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/skill.cparticeskilllevelup.bin", Handler.create(this, this.onloadedParticeSkillLevelupComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/skill.chuanhuause.bin", Handler.create(this, this.onloadedHuanhuaUseComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/skill.chuanhuainfo.bin", Handler.create(this, this.onloadedHuanhuaInfoComplete), null, Loader.BUFFER);
		}
		/**j技能显示表 */
		private onloadedSchoolSkillitemComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.cschoolskillitem.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, SkillModel.getInstance().CSchoolSkillitemBinDic, game.data.template.SchoolSkillitemBaseVo, "id");
		}
		/**技能格消耗表 */
		private onloadedAcupointLevelUpComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/role.acupointlevelup.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, SkillModel.getInstance().AcupointLevelUpBinDic, game.data.template.AcupointLevelUpBaseVo, "id");
		}
		/**技能格信息表 */
		private onloadedAcupointInfoComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/role.acupointinfo.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, SkillModel.getInstance().AcupointInfoBinDic, game.data.template.AcupointInfoBaseVo, "id");
		}
		/**s生活技能表 */
		private onloadedLifeSkillComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.clifeskill.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, SkillModel.getInstance().CLifeSkillBinDic, game.data.template.LifeSkillBaseVo, "id");
		}
		/**j继承消耗 */
		private onloadedInheritCostComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.cinheritcost.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, SkillModel.getInstance().CInheritCostBinDic, game.data.template.InheritCostBaseVo, "id");
		}
		/**s生活技能学习消耗 */
		private onloadedLifeSkillCostComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.clifeskillcost.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, SkillModel.getInstance().CLifeSkillCostBinDic, game.data.template.LifeSkillCostBaseVo, "id");
		}
		/**X修炼技能升级 */
		private onloadedParticeSkillLevelupComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.cparticeskilllevelup.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, SkillModel.getInstance().CParticeSkillLevelupBinDic, game.data.template.ParticeSkillLevelupBaseVo, "id");
		}
		/**h幻化使用配置表 */
		private onloadedHuanhuaUseComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.chuanhuause.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, SkillModel.getInstance().CHuanhuaUseBinDic, game.data.template.HuanhuaUseBaseVo, "id");
		}

		/**h幻化信息配置表 */
		private onloadedHuanhuaInfoComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.chuanhuainfo.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, SkillModel.getInstance().CHuanhuaInfoBinDic, game.data.template.HuanhuaInfoBaseVo, "id");
		}
		/**添加监听 */
		private addNetworkListener(): void {
			/**监听战斗技能升级信息 */
			Network._instance.addHanlder(ProtocolsEnum.SUpdateInborn, this, this.onUpdateInborn);
			/**监听生活技能升级信息 */
			Network._instance.addHanlder(ProtocolsEnum.SUpdateLearnLiveSkill, this, this.onUpdateLearnLiveSkil);
			/**监听请求已学习的专精技能信息 */
			Network._instance.addHanlder(ProtocolsEnum.SRequestParticleSkillList, this, this.onRequestParticleSkillList);
			/**监听专精技能升级信息 */
			Network._instance.addHanlder(ProtocolsEnum.SUpdateLearnParticleSkill, this, this.onUpdateLearnParticleSkill);
			/**监听烹饪返回 */
			Network._instance.addHanlder(ProtocolsEnum.SLiveSkillMakeFood, this, this.onLiveSkillMakeFood);
			/**监听锻造返回 */
			Network._instance.addHanlder(ProtocolsEnum.SLiveSkillMakeStuff, this, this.onLiveSkillMakeStuff);
			/**监听制作变身卡 */
			Network._instance.addHanlder(ProtocolsEnum.SLiveSkillMakeCard, this, this.onLiveSkillMakeCard);
			/**监听炼金返回 */
			Network._instance.addHanlder(ProtocolsEnum.SLiveSkillMakeDrug, this, this.onLiveSkillMakeDrug);
			/**监听请求已学习的生活技能信息 */
			Network._instance.addHanlder(ProtocolsEnum.SRequestLiveSkillList, this, this.onRequestLiveSkillList);
			/** 监听技能系统模块的错误下发 */
			Network._instance.addHanlder(ProtocolsEnum.SSkillError, this, this.onSkillError);
		}

		/**移除监听 */
		private removeNetworkListener(): void {
			Network._instance.removeHanlder(ProtocolsEnum.SUpdateInborn, this, this.onUpdateInborn);
			Network._instance.removeHanlder(ProtocolsEnum.SUpdateLearnLiveSkill, this, this.onUpdateLearnLiveSkil);
			Network._instance.removeHanlder(ProtocolsEnum.SRequestParticleSkillList, this, this.onRequestParticleSkillList);
			Network._instance.removeHanlder(ProtocolsEnum.SUpdateLearnParticleSkill, this, this.onUpdateLearnParticleSkill);
			Network._instance.removeHanlder(ProtocolsEnum.SLiveSkillMakeFood, this, this.onLiveSkillMakeFood);
			Network._instance.removeHanlder(ProtocolsEnum.SLiveSkillMakeStuff, this, this.onLiveSkillMakeStuff);
			Network._instance.removeHanlder(ProtocolsEnum.SLiveSkillMakeCard, this, this.onLiveSkillMakeCard);
			Network._instance.removeHanlder(ProtocolsEnum.SLiveSkillMakeDrug, this, this.onLiveSkillMakeDrug);
			Network._instance.removeHanlder(ProtocolsEnum.SRequestLiveSkillList, this, this.onRequestLiveSkillList);
			Network._instance.removeHanlder(ProtocolsEnum.SSkillError, this, this.onSkillError);
		}
		/** 服务器：升级到XX级 */
		public onUpdateInborn(optcode: number, msg: hanlder.S2C_update_inborn): void {
			SkillModel.getInstance().SUpdateInbornData.set("data", msg);
			//更新附魔技能的等级
			var fumo = [FUMO.YUNXIAO_SKILLID, FUMO.DAHUANG_SKILLID, FUMO.CANGYU_SKILLID, FUMO.FEIXUE_SKILLID, FUMO.TIANLEI_SKILLID, FUMO.WULIANG_SKILLID, FUMO.XUANMING_SKILLID, FUMO.QIXING_SKILLID, FUMO.DANYANG_SKILLID];
			for (var i: number = 0; i < 9; i++) {
				if (msg.inborns.get(fumo[i]) != undefined) {
					game.modules.skill.models.SkillModel.getInstance().makeEnhancementLevel = msg.inborns.get(fumo[i]);
					game.modules.skill.models.SkillModel.getInstance().EnhancementSkillId = fumo[i];
				}
			}
			this.updateSkillLevel();
			SkillProxy.getInstance().event(models.SUpdateInborn_EVENT);
		}
		/**生活技能升级 */
		public onUpdateLearnLiveSkil(optcode: number, msg: hanlder.S2C_update_learnliveskill): void {
			SkillModel.getInstance().SUpdateLearnLiveSkillData.set("data", msg);
			SkillModel.getInstance().LiveSkilllevelData.set(msg.skill.id, msg.skill.level);			//技能升级第一次的 key value
			SkillProxy.getInstance().event(models.SUpdateLearnLiveSkill_EVENT);
		}
		/**返回已经学习的所有修炼技能 */
		public onRequestParticleSkillList(optcode: number, msg: hanlder.S2C_request_particleskilllist): void {
			SkillModel.getInstance().SRequestParticleSkillListData.set("data", msg);
			SkillProxy.getInstance().event(models.SRequestParticleSkillList_EVENT);
		}

		/**如果修炼技能等级有变化会更新 */
		public onUpdateLearnParticleSkill(optcode: number, msg: hanlder.S2C_update_learnparticleskill): void {
			SkillModel.getInstance().SUpdateLearnParticleSkillData.set("data", msg);
			SkillProxy.getInstance().event(models.SUpdateLearnParticleSkill_EVENT);
		}

		/**制作食物返回 */
		public onLiveSkillMakeFood(optcode: number, msg: hanlder.S2C_live_skillsakefood): void {
			SkillModel.getInstance().SLiveSkillMakeFoodData.set("data", msg);
			SkillProxy.getInstance().event(models.SLiveSkillMakeFood_EVENT);
		}
		/**锻造返回 */
		public onLiveSkillMakeStuff(optcode: number, msg: hanlder.S2C_live_skillmakestuff): void {
			SkillModel.getInstance().SLiveSkillMakeStuffData.set("data", msg);
			SkillProxy.getInstance().event(models.SLiveSkillMakeStuff_EVENT);
		}
		/**服务器返回制作变身卡成功 */
		public onLiveSkillMakeCard(optcode: number, msg: hanlder.S2C_live_skillmakecard): void {
			SkillModel.getInstance().SLiveSkillMakeCardData.set("data", msg);
			SkillProxy.getInstance().event(models.SLiveSkillMakeCard_EVENT);
		}
		/**制作药品返回 */
		public onLiveSkillMakeDrug(optcode: number, msg: hanlder.S2C_live_skillmakedrug): void {
			SkillModel.getInstance().SLiveSkillMakeDrugData.set("data", msg);
			SkillProxy.getInstance().event(models.SLiveSkillMakeDrug_EVENT);
		}
		/**返回已经学习的所有生活技能 */
		public onRequestLiveSkillList(optcode: number, msg: hanlder.S2C_request_liveskilllist): void {
			SkillModel.getInstance().SRequestLiveSkillListData.set("data", msg);
			let arr = msg.skilllist;
			for (var index = 0; index < arr.length; index++) {
				SkillModel.getInstance().LiveSkilllevelData.set(arr[index].id, arr[index].level);		//技能所有的的 key value
			}
			SkillProxy.getInstance().event(models.SRequestLiveSkillList_EVENT);
		}
		/** 技能系统模块错误下发 */
		private onSkillError(optcode: number, msg: hanlder.S2C_skill_error): void {
			switch (msg.skillError) {
				case SkillError.EnergyNotEnough:
					this.event(models.EnergyNotEnough_EVENT);
					break;
			}
		}
		/**技能升级刷新 */
		public updateSkillLevel(): void {
			var data: hanlder.S2C_update_inborn = models.SkillModel.getInstance().SUpdateInbornData.get("data");
			//0：单个技能升级，1：一键升级
			switch (data.flag) {
				case 0:
					SkillModel.getInstance().skillLevelDic.set(data.inborns.keys[0], data.inborns.values[0]);
					break;
				case 1:
					for (var j: number = 0; j < skill.models.SkillModel.getInstance().skillArr.length; j++) {
						for (var i: number = 0; i < data.inborns.keys.length; i++) {
							if (skill.models.SkillModel.getInstance().skillGridArr[j]["id"] == data.inborns.keys[i]) {
								skill.models.SkillModel.getInstance().skillLevelDic.set(skill.models.SkillModel.getInstance().skillArr[j]["id"], data.inborns.values[i]);
							}
						}
					}
					break;
			}

		}
	}
}