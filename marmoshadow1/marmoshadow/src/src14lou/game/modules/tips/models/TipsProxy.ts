/**
* tips的数据加载 
*/
module game.modules.tips.models {
	/**关闭tips */
	export const CLOSE_TIPS = "closeTips";
	/**点击小键盘ok键 */
	export const ON_KRYBOARD = "onKeyBoard";
	/**装备洗练，预览属性 */
	export const WASHATTR = "warshAttr";
	/**装备洗练，保存属性 */
	export const WASHATTR_SAVE = "warshAttrSave";
	/**弹窗类tips点击ok按钮*/
	export const TIPS_ON_OK = "onOkBtn";
	/**弹窗类tips点击cancel按钮 */
	export const TIPS_ON_CANCEL = "onCancelBtn";
	/**宠物tips*/
	export const PETEQUIPTIPS = "peteqiuptips";
	/**点击获取途径按钮 */
	export const onComeformBtn = "onComeformBtn";
	/**重铸 */
	export const SRefineEquipResult = "SRefineEquipResult"
	export class TipsProxy extends hanlder.ProxyBase {
		constructor() {
			super();
			TipsProxy._instance = this;
			this.init();
		}
		private static _instance: TipsProxy;
		public static getInstance(): TipsProxy {
			if (!this._instance) {
				this._instance = new TipsProxy();
			}
			return this._instance;
		}

		/**添加监听 */
		private addNetworkListener(): void {
			/**洗练 */
			Network._instance.addHanlder(ProtocolsEnum.SRefineEquipBase, this, this.onSRefineEquipBase);
			/**重铸 */
			Network._instance.addHanlder(ProtocolsEnum.SRefineEquipResult, this, this.onSRefineEquipResult);
			/**宠物装备tips */
			Network._instance.addHanlder(ProtocolsEnum.SGetPetEquipTips, this, this.onAddPetEquiptips)
			//装备附魔成功返回
			Network._instance.addHanlder(ProtocolsEnum.SUseEnhancementItem, this, this.onGetFuMoSucc);
		}
		/** 获得装备附魔成功下发消息 */
		private onGetFuMoSucc(optcode: number, msg: hanlder.S2C_SUseEnhancement_Item):void{
			let _equipBag = BagModel.getInstance().bagMap[BagTypes.EQUIP];
			let _equipItems = _equipBag.items;
			let _fumoEquipKey;//附魔装备的key
			for(let i = 0; i < _equipItems.length; i ++){
				let _equipItem:bag.models.ItemVo = _equipItems[i];
				if(_equipItem.position == msg.equippos){
					_fumoEquipKey = _equipItem.key;
					break;
				}
			}
			if(_fumoEquipKey){
				RequesterProtocols._instance.c2s_CGetItem_Tips(BagTypes.EQUIP, _fumoEquipKey);
			}
		}

		/**宠物装备tips */
		public onAddPetEquiptips(optcode: number, msg: hanlder.S2C_SGetPetEquip_Tips): void {
			StrengTheningModel.getInstance().equipTips.push({ packid: 9, keyinpack: msg.keyinpack, tips: msg.tips })
			this.event(PETEQUIPTIPS)
		}

		/**洗练 */
		public onSRefineEquipBase(optcode: number, msg: hanlder.S2C_SRefineEquip_Base) {
			if (msg.freshtype == 0) { //预览
				models.TipsModel._instance.equipWashAttr = [];
				models.TipsModel._instance.equipWashAttr.push({ packid: msg.packid, keyinpack: msg.keyinpack, attr: msg.attr });
				models.TipsProxy._instance.event(WASHATTR)
			} else if (msg.freshtype == 1) {  //保存
			}
		}

		/**重铸 */
		public onSRefineEquipResult(optcode: number, msg: hanlder.S2C_SRefineEquip_Result) {
			models.TipsProxy._instance.event(models.SRefineEquipResult);
		}

		public init() {
			TipsModel.getInstance();
			this.addNetworkListener();
			/**程序内字符串表 */
			Laya.loader.load("common/data/temp/message.cstringres.bin", Handler.create(this, this.onloadedCStringResConfigComplete), null, Loader.BUFFER);  
			/**装备洗练表 */
			Laya.loader.load("common/data/temp/item.cequiprefineinfo.bin", Handler.create(this, this.onloadedEquipRefineInfoComplete), null, Loader.BUFFER);  
			/**装备洗特技表 */
			Laya.loader.load("common/data/temp/item.cequiprefineskillinfo.bin", Handler.create(this, this.onloadedEquipRefineSkillInfoDataComplete), null, Loader.BUFFER);
			/**t特技特效显示表 */
			Laya.loader.load("common/data/temp/skill.cequipskill.bin", Handler.create(this, this.onloadedEquipSkillComplete), null, Loader.BUFFER); 
			//附魔效果配置表
			Laya.loader.load("common/data/temp/item.cfumoeffectformula.bin", Handler.create(this, this.onloadedFumoeffectformula), null, Loader.BUFFER); 
		}

		public onloadedFumoeffectformula(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cfumoeffectformula.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, TipsModel.getInstance().cfumoeffectformulaConfigData, game.data.template.FumoEffectFormulaBaseVo, "id");
		}

		public onloadedCStringResConfigComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/message.cstringres.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, TipsModel.getInstance().cstringResConfigData, game.data.template.CStringResBaseVo, "id");
		}

		public onloadedEquipRefineInfoComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cequiprefineinfo.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, TipsModel._instance.equipRefineInfoData, game.data.template.EquipRefineInfoBaseVo, "id");
		}

		public onloadedEquipRefineSkillInfoDataComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cequiprefineskillinfo.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, TipsModel._instance.equipRefineSkillInfoData, game.data.template.EquipRefineSkillInfoBaseVo, "partid_quality");
		}

		public onloadedEquipSkillComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.cequipskill.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, TipsModel._instance.equipSkillData, game.data.template.EquipSkillBaseVo, "id");
		}
	}
}