
module game.modules.strengThening.models {
	export const STRENG_EVENT: string = "strengTheningEvent";
	/**物品数量改变 */
	export const STRENG_EVENT_ITEM: string = "strengTheningItemEvent";
	/**打造 */
	export const onProductMadeUp: string = "onProductMadeUp";
	/**打造异常返回 */
	export const onErrorCode: string = "onErrorCode";
	/**宝石镶嵌红点 */
	export const insertRedDot: string = "insertRedDot";
	/**宝石合成返回i */
	export const SHeChengItem: string = "SHeChengItem";
	/**修理结果 */
	export const SRepairResult: string = "SRepairResult";
	/**修理失败次数 */
	export const SXiuLiFailTimes: string = "SXiuLiFailTimes";
	/**刷新耐久 */
	export const SRefreshMaxNaiJiu: string = "SRefreshMaxNaiJiu";
	/**合成宝石 */
	export const SRideUpdate: string = "SRideUpdate";
	/** 打开遮罩 */
	export const OPENZHEZHAO:string = "Open_ZheZhao";
	/** 打开遮罩 */
	export const CLOSEZHEZHAO:string = "Close_ZheZhao";
	/** 强化模块的中转服务Proxy */
	export class StrengTheningProxy extends hanlder.ProxyBase {
		constructor() {
			super();
			StrengTheningProxy._instance = this;
			this.init();
		}
		private static _instance: StrengTheningProxy;
		public static getInstance(): StrengTheningProxy {
			if (!this._instance) {
				this._instance = new StrengTheningProxy();
			}
			return this._instance;
		}

		public init(): void {
			StrengTheningModel.getInstance();
			this.addNetworkListener();
			/**装备打造列表 */
			Laya.loader.load("common/data/temp/item.cequipmakeinfo.bin", Handler.create(this, this.onloadedEquipMakeInfoComplete), null, Loader.BUFFER);
			/**z装备表 */
			Laya.loader.load("common/data/temp/item.cequipeffect.bin", Handler.create(this, this.onloadedEquipEffectComplete), null, Loader.BUFFER);
			/**z装备表2 */
			Laya.loader.load("common/data/temp/item.cequipitemattr.bin", Handler.create(this, this.onloadedEquipItemAttrComplete), null, Loader.BUFFER);
			/**宝石表 */
			Laya.loader.load("common/data/temp/item.cgemeffect.bin", Handler.create(this, this.onloadedGemEffectComplete), null, Loader.BUFFER);
			/**杂货表 */
			Laya.loader.load("common/data/temp/item.cgroceryeffect.bin", Handler.create(this, this.onloadedGroceryEffectComplete), null, Loader.BUFFER);
			/**道具类型表 */
			Laya.loader.load("common/data/temp/item.citemtype.bin", Handler.create(this, this.onloadedItemTypeComplete), null, Loader.BUFFER);
			/**宝石类型表 */
			Laya.loader.load("common/data/temp/item.cgemtype.bin", Handler.create(this, this.onloadedGemTypeComplete), null, Loader.BUFFER);
			/**装备部件对应表 */
			Laya.loader.load("common/data/temp/item.cequipposname.bin", Handler.create(this, this.onloadedEquipPosNameComplete), null, Loader.BUFFER);
			/**道具合成表 */
			Laya.loader.load("common/data/temp/item.cequipcombin.bin", Handler.create(this, this.onloadedCequipCombinComplete), null, Loader.BUFFER);
			/**装备附加属性库 */
			Laya.loader.load("common/data/temp/item.cequipaddattributelib.bin", Handler.create(this, this.onloadedEquipAddattributelibComplete), null, Loader.BUFFER);
			/**装备生成基础属性表 */
			Laya.loader.load("common/data/temp/item.cequipiteminfo.bin", Handler.create(this, this.onloadedEquipIteminfoComplete), null, Loader.BUFFER);
			/**属性效果id表 */
			Laya.loader.load("common/data/temp/item.cattributedesconfig.bin", Handler.create(this, this.onloadedAttributeDesConfigComplete), null, Loader.BUFFER);
			/**获取途径表 */
			Laya.loader.load("common/data/temp/item.ccomefrom.bin", Handler.create(this, this.onloadedComeFromComplete), null, Loader.BUFFER);
		}

		public onloadedEquipMakeInfoComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipmakeinfo.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, StrengTheningModel.getInstance().equipMakeInfoData, game.data.template.EquipMakeInfoBaseVo, "id");
			StrengTheningModel.getInstance().id = 120017;
		}

		public onloadedEquipEffectComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipeffect.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, StrengTheningModel.getInstance().equipEffectData, game.data.template.EquipEffectBaseVo, "id");
		}

		public onloadedEquipItemAttrComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipitemattr.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, StrengTheningModel.getInstance().equipItemAttrData, game.data.template.EquipItemAttrBaseVo, "id");
		}

		public onloadedGemEffectComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cgemeffect.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, StrengTheningModel.getInstance().gemEffectData, game.data.template.GemEffectBaseVo, "id");
		}

		public onloadedGroceryEffectComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cgroceryeffect.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, StrengTheningModel.getInstance().groceryEffectData, game.data.template.GroceryEffectBaseVo, "id");
		}

		public onloadedItemTypeComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.citemtype.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, StrengTheningModel.getInstance().itemTypeData, game.data.template.ItemTypeBaseVo, "id");
		}

		public onloadedGemTypeComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cgemtype.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, StrengTheningModel.getInstance().gemTypeData, game.data.template.GemTypeBaseVo, "id");
		}

		public onloadedEquipPosNameComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipposname.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, StrengTheningModel.getInstance().equipPosNameData, game.data.template.EquipPosNameBaseVo, "id");
		}

		public onloadedCequipCombinComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipcombin.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, StrengTheningModel.getInstance().cequipCombinData, game.data.template.EquipCombinBaseVo, "id");
		}

		public onloadedEquipAddattributelibComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipaddattributelib.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, StrengTheningModel._instance.equipAddattributelibData, game.data.template.EquipAddattributelibBaseVo, "id");
			data.pos = 0;
            size = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, StrengTheningModel._instance.equipAddattributelibDataBySkill, game.data.template.EquipAddattributelibBaseVo, "skillid");
		}

		public onloadedEquipIteminfoComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipiteminfo.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, StrengTheningModel._instance.equipIteminfoData, game.data.template.EquipIteminfoBaseVo, "id");
		}

		public onloadedAttributeDesConfigComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cattributedesconfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, StrengTheningModel._instance.attributeDesConfigData, game.data.template.AttributeDesConfigBaseVo, "id");
		}

		public onloadedComeFromComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.ccomefrom.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, StrengTheningModel._instance.comeFromData, game.data.template.ComeFromBaseVo, "id");
		}

		//  添加监听
		private addNetworkListener(): void {
			/**打造 */
			Network._instance.addHanlder(ProtocolsEnum.SProductMadeUp, this, this.onProductMadeUp);
			/**打造失败监听 */
			Network._instance.addHanlder(ProtocolsEnum.SErrorCode, this, this.onErrorCode);
			/**合成宝石 */
			Network._instance.addHanlder(ProtocolsEnum.SRideUpdate, this, this.onSRideUpdate);
			/**刷新最大耐久 */
			Network._instance.addHanlder(ProtocolsEnum.SRefreshMaxNaiJiu, this, this.onSRefreshMaxNaiJiu);
			/**修理失败次数 */
			Network._instance.addHanlder(ProtocolsEnum.SXiuLiFailTimes, this, this.onSXiuLiFailTimes);
			/**修理结果 */
			Network._instance.addHanlder(ProtocolsEnum.SRepairResult, this, this.onSRepairResult);
			/**刷新耐久度 */
			Network._instance.addHanlder(ProtocolsEnum.SRefreshNaiJiu, this, this.onSRefreshNaiJiu);
			/**合成 */
			Network._instance.addHanlder(ProtocolsEnum.SHeChengItem, this, this.onSHeChengItem);
		}

		private onProductMadeUp(optcode: number, msg: hanlder.S2C_product_madeup): void {
			models.StrengTheningProxy._instance.event(models.onProductMadeUp);
		}

		private onErrorCode(optcode: number, msg: hanlder.S2C_error_code): void {
			models.StrengTheningProxy._instance.event(models.onErrorCode, msg.errorCode);
		}

		private onSRideUpdate(optcode: number, msg: hanlder.S2C_SRide_Update): void {
			models.StrengTheningProxy._instance.event(models.SRideUpdate);
		}

		private onSRefreshMaxNaiJiu(optcode: number, msg: hanlder.S2C_SRefresh_MaxNaiJiu): void {
			models.StrengTheningProxy._instance.event(models.SRefreshMaxNaiJiu)
		}

		private onSXiuLiFailTimes(optcode: number, msg: hanlder.S2C_SXiuLiFail_Times): void {
			models.StrengTheningProxy._instance.event(models.SXiuLiFailTimes, msg.failtimes);
		}

		private onSRepairResult(optcode: number, msg: hanlder.S2C_SRepair_Result): void {
			models.StrengTheningProxy._instance.event(models.SRepairResult, msg.ret);
		}

		private onSItemNumChange(optcode: number, msg: hanlder.S2C_SItemNum_Change): void {
			var bag = bagModel.getInstance().bagMap[msg.packid];
			var items = bag.items;
			for (var i = 0; i < items.length; i++) {
				var keyinpack = items[i].key;
				if (keyinpack == msg.keyinpack) {
					items[i].number = msg.curnum;
				}
			}
			models.StrengTheningProxy.getInstance().event(models.STRENG_EVENT_ITEM);
		}

		private onSRefreshNaiJiu(optcode: number, msg: hanlder.S2C_SRefresh_NaiJiu): void {
		}

		private onSDelItem(optcode: number, msg: hanlder.S2C_SDel_Item): void {
			var bag = bagModel.getInstance().bagMap[msg.packid];
			var items: Array<any> = bag.items;
			for (var i = 0; i < items.length; i++) {
				var keyinpack = msg.itemKey;
				if (keyinpack == items[i].key) {
					items.splice(i, 1);
				}
			}
			models.StrengTheningProxy.getInstance().event(models.STRENG_EVENT_ITEM);
		}

		private onSHeChengItem(optcode: number, msg: hanlder.S2C_SHeCheng_Item): void {
			models.StrengTheningProxy._instance.event(models.SHeChengItem);
		}
	}
}