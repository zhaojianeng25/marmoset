/**
 * @describe  背包系统的中转服务
 * @author  LQW
 */
module game.modules.bag.models {
	/**修改仓库名称事件 */
	export const STOREHOUSE_RENAME_EVENT: string = "storeHouseRenameEvent";
	/**接受仓库数据事件 */
	export const ACCPET_STOREHOUSE_DATA_EVENT: string = "accpetStorehouseDataEvent";
	/**刷新仓库数個數 */
	export const ACCPET_STOREHOUSE_NUM_EVENT: string = "accpetStorehouseNumEvent";
	/**接受背包数据事件 */
	export const ACCPET_BAG_DATA_EVENT: string = "accpetBagDataEvent";
	/**背包整理事件 */
	export const ARRANGE_BAG: string = "arrangeBag";
	/**关闭seletedUI界面事件*/
	export const CLOSE_SELETED_STOREHOUSE_EVENT: string = "closeSeletedStoreHouseEvent";
	/**bagStoreHouse界面传递当前仓库编号给bagStoreHouseRename界面事件 */
	export const TRANSMIT_NOWPAGE_DATA_EVENT: string = "transmitNowPageDataEvent";
	/**解锁仓库事件 */
	export const DEBLOCKING_EVENT: string = "deblockingEvent";
	/**刷新元宝显示 */
	export const REFRESH_YUANBAO_EVENT: string = "refreshyuanbao_event";
	/**刷新按钮名称事件 */
	export const DEPOTNAME_EVENT: string = "depotNameEvent";
	/**刷新金币显示 */
	export const REFRESH_CURRENCY_EVENT: string = "refreshCurrencyEvent";
	/**刷新背包格子 */
	export const REFRESH_BAG_COUNT: string = "refreshBagEvent";
	/**刷新背包出售界面的item数据 */
	export const REFRESH_SALE_COUNT: string = "refreshSaleEvent";
	/**刷新背包和仓库的数据交互 */
	export const REFRESH_BAG_DEPOT_COUNT: string = "refreshBagAndDepotEvent";
	/** 刷新临时背包ui */
	export const REFRESH_TEMP_BAG: string = "refreshBagOfTempEvent";
	/** 角色穿脱装备刷新 */
	export const ROLE_PUT_OFF: string = "rolePutOffEvent";
	/** 物品使用指引 */
	export const ADDITEM_USE_GUIDE: string = "addItemUseGuideEvent";
	/** 删除使用指引 */
	export const DELET_USE_GUIDE: string = "deletItemUseGuideEvent";
	/** 新增物品过场滑动事件 */
	export const ITEM_SLIDE: string = "itemSlideEvent";
	/**任务评分 */
	// export const REFRESH_ROLESCORE_EVENT: string = "refreshRoleScoreEvent";
	/** 物品增加或者减少或者改变 */
	export const ITEMADD_OR_DEL: string = "itemAddOrDel";
	/**背包引导事件 */
	export const BAG_YINDAO: string = "bagyindao";
	/**装备某装备时检查当前装备数据 */
	export const INSPECT_EQUIP: string = "inspectEquipEvent";
	/**装备某装备镶嵌宝石信息 */
	export const INSPECT_EQUIP_GEM: string = "inspectEquipGemEvent";
	/**刷新仓库数個數 */
	export const ACCPET_CURRENT_EVENT: string = "accpetCurrentEvent";
	/**显示评级所点中的物品 */
	export const SHOW_PINGJIITEM_EVENT: string = "showPingJiItemEvent";
	/** 获得珍品找回列表数据 */
	export const GET_ITEMRECOVERDATA: string = "getItemRecoverData";
	/** 找回珍品操作成功 */
	export const RECOVER_ITEM_SUCCESS: string = "recoverItemSuccess";
	/** 获得查看所要找回道具的信息数据 */
	export const GET_RECOVERITEM_INFODATA: string = "getRecoverItemInfoData";
	/** 当前玩家角色名字更改了 */
	export const CURR_ROLENAME_CHANGE: string = "currRoleNameChange";
	/** 卸下装备设置模型武器检查 */
	export const UNLOADING_EQUIP_CHECK: string = "unloadingEquipCheckEvent";

	export class BagProxy extends hanlder.ProxyBase {
		/**BagProxy单例对象 */
		private static _instance: BagProxy;

		constructor() {
			super();
			BagProxy._instance = this;
			this.init();
		}
		/**
		 * @describe  获取BagProxy单例对象，如果不存在则生成
		 */
		public static getInstance(): BagProxy {
			if (!this._instance) {
				this._instance = new BagProxy();
			}
			return this._instance;
		}

		public init(): void {
			// 初始化Model
			BagModel.getInstance();
			// 注册网络协议
			this.addNetworkListener();
			// bin
			this.onLoadBinFile();
		}

		/**
		 * @describe  加载配合表的bin文件
		 */
		private onLoadBinFile(): void {
			Laya.loader.load("common/data/temp/item.citemattr.bin", Handler.create(this, this.onloadedItemAttrComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/item.cpetitemeffect.bin", Handler.create(this, this.onloadedPetItemEffectComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/item.cbagtable.bin", Handler.create(this, this.onloadedBagTableComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/item.cdepottable.bin", Handler.create(this, this.onloadedDepottableComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/item.ctaskrelative.bin", Handler.create(this, this.onloadedTaskRelativeComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/item.citemusetip.bin", Handler.create(this, this.onloadedCitemUseTipComplete), null, Loader.BUFFER); //d道具使用提示表
			Laya.loader.load("common/data/temp/item.cfightdrugtype.bin", Handler.create(this, this.onloadedFightDrugTypeComplete), null, Loader.BUFFER);
		}

		public onloadedCitemUseTipComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.citemusetip.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, BagModel.getInstance().ItemUseTip, ItemUseTipBaseVo, "id");
		}
		public onloadedItemAttrComplete(): void {
			//console.log("ItemAttr表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.citemattr.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, BagModel.getInstance().itemAttrData, ItemAttrBaseVo, "id");
			//console.log("ItemattrData:", this.itemAttrData);
		}
		/**
		 * @describe  读取c宠物物品表；common/data/temp/item.cpetitemeffect.bin
		 */
		public onloadedPetItemEffectComplete(): void {
			//console.log("PetItemEffectData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cpetitemeffect.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, BagModel.getInstance().petItemEffectData, PetItemEffectBaseVo, "id");
			//console.log("PetItemEffectData:", this.petItemEffectData);
		}
		/**
		 * @describe  读取b背包扩充价格表；common/data/temp/item.cbagtable.bin
		 */
		public onloadedBagTableComplete(): void {
			//console.log("BagTableData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cbagtable.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, BagModel.getInstance().bagTableData, BagTableBaseVo, "id");
			//console.log("BagTableData:", this.bagTableData);
		}
		/**
		 * @describe  读出c仓库扩充价格；common/data/temp/item.cdepottable.bin
		 */
		public onloadedDepottableComplete(): void {
			//console.log("DepottableData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cdepottable.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, BagModel.getInstance().depottableData, DepottableBaseVo, "id");
			//console.log("DepottableData:", this.depottableData);
		}
		/**
		 * @describe  r任务物品表；common/data/temp/item.ctaskrelative.bin
		 */
		public onloadedTaskRelativeComplete(): void {
			//console.log("TaskRelativeData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.ctaskrelative.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, BagModel.getInstance().taskRelativeData, TaskRelativeBaseVo, "id");
			//console.log("TaskRelativeData:", this.taskRelativeData);
		}

		private onloadedFightDrugTypeComplete(): void {
			console.log("cfightdrugtype 表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cfightdrugtype.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, BagModel.getInstance().FightDrugTypeData, FightDrugTypeBaseVo, "id");
		}


		/**
		 * @describe  添加监听
		 */
		private addNetworkListener(): void {
			// 未测试
			Network._instance.addHanlder(ProtocolsEnum.SRefreshRoleScore, this, this.onRefreshRoleScore)
			Network._instance.addHanlder(ProtocolsEnum.SGetDepotInfo, this, this.onGetDepotInfo);
			Network._instance.addHanlder(ProtocolsEnum.SModifyDepotName, this, this.onModifyDepotName);
			Network._instance.addHanlder(ProtocolsEnum.SGetPackInfo, this, this.onGetPackInfo);
			Network._instance.addHanlder(ProtocolsEnum.SRefreshCurrency, this, this.onRefreshCurrency);
			Network._instance.addHanlder(ProtocolsEnum.SRefreshPackSize, this, this.onRefreshPackSize);
			Network._instance.addHanlder(ProtocolsEnum.SAddItem, this, this.onAddItem);
			Network._instance.addHanlder(ProtocolsEnum.SDelItem, this, this.onDelItem);
			Network._instance.addHanlder(ProtocolsEnum.SItemAdded, this, this.onItemAdded);
			Network._instance.addHanlder(ProtocolsEnum.SPetEquipAddItem, this, this.onSPetEquipAddItem);
			Network._instance.addHanlder(ProtocolsEnum.SItemNumChange, this, this.onSItemNumChange);
			Network._instance.addHanlder(ProtocolsEnum.SReqFushiNum, this, this.onRefreshFushi);
			Network._instance.addHanlder(ProtocolsEnum.SRideUpdate, this, this.onSRideUpdate); //坐骑乘骑更新
			Network._instance.addHanlder(ProtocolsEnum.SAddTitle, this, this.onSAddTitle); //人物称谓
			Network._instance.addHanlder(ProtocolsEnum.SModifyRoleName, this, this.onSModifyRoleName); //人物改名
			Network._instance.addHanlder(ProtocolsEnum.SGetPetEquipInfo, this, this.onAddPetEquip);
			Network._instance.addHanlder(ProtocolsEnum.SPetEquipDelItem, this, this.onPetEquipDelItem);
			Network._instance.addHanlder(ProtocolsEnum.SRoleComponentsChange, this, this.onRoleComponentsChange);
			Network._instance.addHanlder(ProtocolsEnum.SRefreshItemFlag, this, this.onSRefreshItemFlag);
			Network._instance.addHanlder(ProtocolsEnum.SItemRecoverList, this, this.onSItemRecoverList);
			Network._instance.addHanlder(ProtocolsEnum.SItemRecover, this, this.onSItemRecover);
			Network._instance.addHanlder(ProtocolsEnum.SRecoverItemInfo, this, this.onSRecoverItemInfo);
		}
		/** 查看所要找回赠品的信息数据下发 */
		private onSRecoverItemInfo(optcode: number, msg: hanlder.S2C_SRecoverItem_Info): void {
			bag.models.BagModel.getInstance().equipItemRecoverInfoTips = msg.tips;
			this.event(models.GET_RECOVERITEM_INFODATA, [msg.uniqId, msg.tips]);
		}
		/** 进行珍品找回操作返回 */
		private onSItemRecover(optcode: number, msg: hanlder.S2C_SItem_Recover): void {
			this.event(models.RECOVER_ITEM_SUCCESS, [msg.itemId, msg.uniqId]);
		}
		/** 请求珍品找回列表下发返回数据接收 */
		private onSItemRecoverList(optcode: number, msg: hanlder.S2C_SItemRecover_List): void {
			bag.models.BagModel.getInstance().itemRecoverInfoData = [];
			bag.models.BagModel.getInstance().itemRecoverInfoData = msg.items;
			this.event(models.GET_ITEMRECOVERDATA, [msg.items]);
		}
		/**
		 * @describe  移除所有的监听
		 */
		private removeNetworkListener(): void {
			Network._instance.removeHanlder(ProtocolsEnum.SGetDepotInfo, this, this.onGetDepotInfo);
			Network._instance.removeHanlder(ProtocolsEnum.SRefreshRoleScore, this, this.onRefreshRoleScore)
			Network._instance.removeHanlder(ProtocolsEnum.SGetDepotInfo, this, this.onGetDepotInfo);
			Network._instance.removeHanlder(ProtocolsEnum.SModifyDepotName, this, this.onModifyDepotName);
			Network._instance.removeHanlder(ProtocolsEnum.SGetPackInfo, this, this.onGetPackInfo);
			Network._instance.removeHanlder(ProtocolsEnum.SRefreshCurrency, this, this.onRefreshCurrency);
			Network._instance.removeHanlder(ProtocolsEnum.SRefreshPackSize, this, this.onRefreshPackSize);
			Network._instance.removeHanlder(ProtocolsEnum.SAddItem, this, this.onAddItem);
			Network._instance.removeHanlder(ProtocolsEnum.SDelItem, this, this.onDelItem);
			Network._instance.removeHanlder(ProtocolsEnum.SItemAdded, this, this.onItemAdded);
			Network._instance.removeHanlder(ProtocolsEnum.SPetEquipAddItem, this, this.onSPetEquipAddItem);
			Network._instance.removeHanlder(ProtocolsEnum.SItemNumChange, this, this.onSItemNumChange);
			Network._instance.removeHanlder(ProtocolsEnum.SReqFushiNum, this, this.onRefreshFushi);
			Network._instance.removeHanlder(ProtocolsEnum.SRideUpdate, this, this.onSRideUpdate); //坐骑乘骑更新
			Network._instance.removeHanlder(ProtocolsEnum.SAddTitle, this, this.onSAddTitle); //人物称谓
			Network._instance.removeHanlder(ProtocolsEnum.SModifyRoleName, this, this.onSModifyRoleName); //人物改名
			Network._instance.removeHanlder(ProtocolsEnum.SGetPetEquipInfo, this, this.onAddPetEquip);
			Network._instance.removeHanlder(ProtocolsEnum.SPetEquipDelItem, this, this.onPetEquipDelItem);
			Network._instance.removeHanlder(ProtocolsEnum.SRoleComponentsChange, this, this.onRoleComponentsChange);
			Network._instance.removeHanlder(ProtocolsEnum.SItemRecoverList, this, this.onSItemRecoverList);
			Network._instance.removeHanlder(ProtocolsEnum.SItemRecover, this, this.onSItemRecover);
			Network._instance.removeHanlder(ProtocolsEnum.SRecoverItemInfo, this, this.onSRecoverItemInfo);
		}
		/** 服务器通知客户端刷新道具的flag */
		private onSRefreshItemFlag(optcode: number, msg: hanlder.S2C_SRefresh_ItemFlag) {
			let packid = msg.packid;
			let flag = msg.flag;
			let key = msg.itemkey;
			let item = BagModel.getInstance().bagMap[packid].items;
			for (let _index = 0; _index < item.length; _index++) {
				if (item[_index].key == key) {
					item[_index].flags = flag;
					break;
				}

			}
		}
		/** 角色换装信息 */
		private onRoleComponentsChange(optcode: number, msg: hanlder.s2c_role_components_change): void {
			let roleid = msg.roleid;
			let spritetype = msg.spritetype;
			bagModel.getInstance().roleComponentsChange.clear();
			bagModel.getInstance().roleComponentsChange = msg.components;
			if (msg.components.get(SpriteComponents.SPRITE_FASHION) != null) {/** 角色进行了脱穿 */
				bagModel.getInstance().rolePutOn = msg.components.get(SpriteComponents.SPRITE_FASHION);
				this.event(ROLE_PUT_OFF, bagModel.getInstance().rolePutOn);
			}

		}
		/**
		 * 宠物背包
		 */
		private onAddPetEquip(optcode: number, msg: hanlder.S2C_SGetPetEquipInfo): void {
			BagModel.getInstance().bagMap[9] = msg.mydata.petequipinfo
			console.log(BagModel.getInstance().bagMap[9])
			console.log(BagModel.getInstance().bagMap)
			console.log("加载结束")
		}
		/**
		 * @describe  道具数量改变
		 */
		private onSItemNumChange(optcode: number, msg: hanlder.S2C_SItemNum_Change): void {
			let packid = msg.packid;
			let keyinpack = msg.keyinpack;
			let curnum = msg.curnum;
			let item = BagModel.getInstance().bagMap[packid].items;
			for (var keyindex = 0; keyindex < item.length; keyindex++) {
				if (item[keyindex].key == keyinpack) {/** 找到当前物品 */
					BagModel.getInstance().bagMap[packid].items[keyindex].number = curnum;
					/** 存在指引字典里的物品 */
					let itemKey = bagModel.getInstance().addItemUseGuide.keys;
					for (var index = 0; index < itemKey.length; index++) {
						let itemId = itemKey[index];
						if (packid == BagTypes.BAG && BagModel.getInstance().bagMap[packid].items[keyindex].id == itemId) {
							BagModel.getInstance().addItemUseGuide.set(itemId, item[keyindex]);
							/** 如果容器中存在指定物品才并且是第一个刷新界面 */
							if (index == 0) this.event(ADDITEM_USE_GUIDE);
						}
					}
				}
			}
			models.BagProxy.getInstance().event(models.REFRESH_SALE_COUNT);
			models.BagProxy.getInstance().event(models.REFRESH_BAG_COUNT);
			BagProxy.getInstance().event(models.REFRESH_BAG_DEPOT_COUNT);
			BagProxy.getInstance().event(models.ITEMADD_OR_DEL);
		}
		/**
		 * @describe  删除bag中的道具信息
		 */
		private onDelItem(optcode: number, msg: hanlder.S2C_SDel_Item): void {
			// // console.log("数据："+msg.itemKey+","+msg.packid);
			// let bag:game.modules.bag.models.BagVo = BagModel.getInstance().bagMap[msg.packid];
			// // bag.items.reduce(msg.itemKey);

			let packid = msg.packid;
			let itemKey = msg.itemKey;
			let bag = BagModel.getInstance().bagMap[packid] as BagVo;
			// let item = bag.items;
			if (packid == BagTypes.BAG) {
				//用来判断要被删除道具确实在背包存在
				let bagIsHaveFlag = false;
				for (let itemIndex = 0; itemIndex < bag.items.length; itemIndex++) {
					if (bag.items[itemIndex].key == itemKey) {
						bagIsHaveFlag = true;
						let delitItemId = bag.items[itemIndex].id;
						/** 删除 */
						BagModel.getInstance().bagMap[packid].items.splice(itemIndex, 1);
						/** 判断是不是指引字典里的数据 */
						let itemKey = bagModel.getInstance().addItemUseGuide.keys;
						for (var index = 0; index < itemKey.length; index++) {
							let itemId = itemKey[index];
							if (delitItemId == itemId) {
								BagModel.getInstance().addItemUseGuide.remove(itemId);
								/** 如果容器中存在指定物品才并且是第一个刷新界面 */
								if (index == 0) this.event(DELET_USE_GUIDE);
							}
						}
					}
				}
				if (!bagIsHaveFlag) {
					models.BagModel.getInstance().tempBankBag(itemKey, true);
				}
				models.BagProxy.getInstance().event(models.REFRESH_SALE_COUNT);
			} else if (packid == BagTypes.DEPOT) {
				let currDepot = bagModel.getInstance().currDepotId;
				for (let itemIndex = 0; itemIndex < bag[currDepot].items.length; itemIndex++) {
					if (bag[currDepot].items[itemIndex].key == itemKey) {
						BagModel.getInstance().bagMap[packid][currDepot].items.splice(itemIndex, 1);
					}
				}

			} else if (packid == BagTypes.EQUIP) {
				for (let itemIndex = 0; itemIndex < bag.items.length; itemIndex++) {
					if (bag.items[itemIndex].key == itemKey) {
						//当前装备镶嵌的宝石
						let gemarr = StrengTheningModel.getInstance().equGem(packid, bag.items[itemIndex].key);
						let id = bag.items[itemIndex].id;
						if (gemarr.length != 0) {
							//专门为装备替换而存
							var equipType = StrengTheningModel.getInstance().equipEffectData[id].eequiptype;
							BagModel.getInstance().equipRelace.set(equipType, id);
						}
						BagModel.getInstance().bagMap[packid].items.splice(itemIndex, 1);
						//移除装备检查模型武器
						models.BagProxy.getInstance().event(models.UNLOADING_EQUIP_CHECK,id);
					}
				}
			} else if (packid == BagTypes.TEMP) {
				//用来判断要被删除道具确实在临时背包存在
				let tempbagIsHaveFlag = false;
				for (let itemIndex = 0; itemIndex < bag.items.length; itemIndex++) {
					if (bag.items[itemIndex].key == itemKey) {
						tempbagIsHaveFlag = true;
						BagModel.getInstance().bagMap[packid].items.splice(itemIndex, 1);
					}
				}
				if (!tempbagIsHaveFlag) {
					models.BagModel.getInstance().tempBankBag(itemKey, true);
				}
				if (BagModel.getInstance().bagMap[packid].items.length == 0)
					this.event(REFRESH_TEMP_BAG);
			} else if (packid == BagTypes.QUEST) {
				for (let itemIndex = 0; itemIndex < bag.items.length; itemIndex++) {
					if (bag.items[itemIndex].key == itemKey) {
						BagModel.getInstance().bagMap[packid].items.splice(itemIndex, 1);
					}
				}
			}

			models.BagProxy.getInstance().event(models.REFRESH_BAG_COUNT);
			models.BagProxy.getInstance().event(models.ITEMADD_OR_DEL);
			// 重新赋值
			// item.id = -1;
			// // 重新赋值
			// bag.items[itemKey] = item;
			// BagModel.getInstance().bagMap[packid] = bag;


		}
		/**
		 * @describe  宠物装备增加
		 */
		private onSPetEquipAddItem(optcode: number, msg: hanlder.S2C_SPetEquip_AddItem): void {
			console.log("装备增加");
			console.log(game.modules.bag.models.BagModel.getInstance().bagMap)
			let petequipinfo: Laya.Dictionary = game.modules.bag.models.BagModel.getInstance().bagMap[msg.packid]
			let petbag: BagVo = petequipinfo.get(msg.petkey)
			let ishave = 0;
			if (petbag != null) {//有该宠物装备信息
				for (var index = 0; index < petbag.items.length; index++) {
					let item: ItemVo = petbag.items[index]
					let iteminfo: ItemAttrBaseVo = game.modules.bag.models.BagModel.getInstance().itemAttrData[item.id]
					let newiteminfo: ItemAttrBaseVo = game.modules.bag.models.BagModel.getInstance().itemAttrData[msg.data[0].id]
					if (iteminfo.itemtypeid == newiteminfo.itemtypeid) {
						petbag.items[index] = msg.data[0]
						ishave = 1;
						break;
					}
				}
				if (ishave == 0) {
					petbag.items.push(msg.data[0])
				}
			}
			else {// 无时则重新创建一个
				let newpetbag: BagVo = new BagVo()
				newpetbag.items = [];
				newpetbag.items.push(msg.data[0])
				petbag = newpetbag
			}
			petequipinfo.set(msg.petkey, petbag)
			console.log(game.modules.bag.models.BagModel.getInstance().bagMap[msg.packid])
		}
		/**
		 * 宠物装备删除
		 */
		private onPetEquipDelItem(optcode: number, msg: hanlder.S2C_SPetEquip_DelItem): void {
			let bag: Laya.Dictionary = game.modules.bag.models.BagModel.getInstance().bagMap[msg.packid]
			let baginfo: BagVo = bag.get(msg.petkey)
			for (var index = 0; index < baginfo.items.length; index++) {
				let item: ItemVo = baginfo.items[index]
				if (item.key == msg.itemKey) {
					baginfo.items.splice(index, 1)
					break;
				}
			}
			bag.set(msg.petkey, baginfo)
		}
		/**
		 * @describe  为了新增物品滑动效果而设 添加道具
		 */
		private onItemAdded(optcode: number, msg: hanlder.S2C_SItem_Added): void {
			if (activity.models.ActivityModel._instance.isShowPingJi) {
				this.event(SHOW_PINGJIITEM_EVENT, msg.items);
			}
			let len = msg.items.length;
			bagModel.getInstance().SlideItem = [];
			for (let addItemIndex = 0; addItemIndex < len; addItemIndex++) {
				let itemid = msg.items[addItemIndex].itemid;
				bagModel.getInstance().SlideItem.push(itemid);
			}
			if (bagModel.getInstance().SlideItem.length != 0) this.event(ITEM_SLIDE);

		}
		/**
		 * @describe  刷新人物评分的消息
		 * @param optcode   
		 * @param msg  读取数据的方法
		 */

		// <enum name="TOTAL_SCORE" value="1" /> 综合评分
		// <enum name="EQUIP_SCORE" value="2" /> 装备评分
		// <enum name="MANY_PET_SCORE" value="3" /> 多宠物评分
		// <enum name="PET_SCORE" value="4" /> 单宠物评分
		// <enum name="LEVEL_SCORE" value="5" /> 等级评分
		// <enum name="XIULIAN_SCORE" value="6" /> 修炼评分
		// <enum name="ROLE_SCORE" value="7" /> 人物评分
		// <enum name="SKILL_SCORE" value="8" /> 技能评分

		private onRefreshRoleScore(optcode: number, msg: hanlder.s2c_SRefreshRoleScore): void {
			// let roleScore: RoleScoreVo = new RoleScoreVo();
			// // 获取全部的评分
			// for(let key in msg.datas) {
			// 	let vaule = msg.datas[key] as number;
			// 	roleScore.score.set(key,vaule);
			// }
			let roleScore = msg.datas.get(7);

			if (roleScore != null) {
				BagModel.getInstance().roleScore = roleScore;
			} else if (roleScore == null) {
				BagModel.getInstance().roleScore = 0;
			}

			// models.BagProxy.getInstance().event(models.REFRESH_ROLESCORE_EVENT);
		}


		/**
		 * @describe  获取背包数据
		 */
		private onGetDepotInfo(optcode: number, msg: hanlder.S2C_SGetDepot_Info): void {
			// // console.log("***************************************获取背包数据",msg)
			// let bag: BagVo = msg.baginfo as BagVo;
			// let pageId: number = msg.pageid;
			// bag.currency = bag.currency as Object;
			// bag.capacity = bag.capacity as number;

			// for(let index in bag.items) {
			// 	bag.items[index] = bag.items[index] as ItemVo;
			// }

			// let tempBag:Object = BagModel.getInstance().bagMap[BagTypes.DEPOT];
			// if (typeof(tempBag) == "undefined") tempBag = {};
			// tempBag[pageId] = bag;

			// BagModel.getInstance().bagMap[BagTypes.DEPOT] = tempBag;
			// console.log("---------------------------------------------BagModel.getInstance().bagMap[BagTypes.DEPOT] = ",BagModel.getInstance().bagMap[BagTypes.DEPOT]);


			let pageId: number = msg.pageid;
			let tempBag: Object = BagModel.getInstance().bagMap[BagTypes.DEPOT];
			if (typeof (tempBag) == "undefined") tempBag = {};
			tempBag[pageId] = msg.baginfo;
			let capacity = msg.baginfo.capacity;
			if (capacity < BagModel.getInstance().minDeptNum) return;
			let depotKey = capacity / 25 - 2;

			for (let keyNum = 0; keyNum < depotKey; keyNum++) {
				BagModel.getInstance().depotnameinfo.set(keyNum, 25);
			}
			BagModel.getInstance().bagMap[BagTypes.DEPOT] = tempBag;

			BagProxy.getInstance().event(ACCPET_STOREHOUSE_DATA_EVENT, pageId);
		}
		/**
		 * @describe  修改仓库名称
		 */
		private onModifyDepotName(optcode: number, msg: hanlder.S2C_SModify_DepotName): void {
			let depotId = msg.depotIndex;
			let modifyName = msg.depotName;
			let error = msg.errcode;
			let isPanel: boolean = true;

			BagModel.getInstance().depotName.set(depotId - 1, modifyName);
			BagProxy.getInstance().event(models.DEPOTNAME_EVENT, modifyName);
			BagProxy.getInstance().event(models.STOREHOUSE_RENAME_EVENT, isPanel);
			BagProxy.getInstance().event(models.ACCPET_CURRENT_EVENT);
		}
		/**
		 * @describe  获取包裹信息（比如获取背包消息）
		 */
		private onGetPackInfo(optcode: number, msg: hanlder.S2C_SGetPack_Info): void {
			// let packid: number = msg.packid;
			// let baginfo: BagVo = msg.baginfo as BagVo;

			// //去读到达BagMap上
			// baginfo.currency = baginfo.currency as Object;
			// baginfo.capacity = baginfo.capacity as number;
			// for(let index in baginfo.items) {
			// 	baginfo.items[index] = baginfo.items[index] as ItemVo;
			// }
			// BagModel.getInstance().bagMap[packid] = baginfo;
			// if (packid == BagTypes.BAG) {
			// 	BagProxy.getInstance().event(ARRANGE_BAG);
			// }

			let packid = msg.packid;
			BagModel.getInstance().bagMap[msg.packid] = msg.baginfo;
			if (msg.packid == BagTypes.BAG) {
				bagModel.getInstance().actBagNum = msg.baginfo.capacity;
				BagProxy.getInstance().event(ARRANGE_BAG, BagTypes.BAG);
			} else if (msg.packid == BagTypes.QUEST) {
				BagProxy.getInstance().event(ARRANGE_BAG, BagTypes.QUEST);
			}
		}

		/** 添加物品 */
		private onAddItem(optcode: number, msg: hanlder.S2C_SAdd_Item) {
			let packid = msg.packid;
			let item = msg.data;
			let bagVo1 = BagModel.getInstance().bagMap[1] as BagVo;
			let bagVo = BagModel.getInstance().bagMap[msg.packid] as BagVo;
			if (packid == BagTypes.BAG) {
				for (var index = 0; index < item.length; index++) {
					//道具的key
					let itemkey = item[index].key;
					let _lendItemsDic = bagModel.getInstance().lendItemsDic;
					if (_lendItemsDic.get(itemkey) != undefined) {
						bagModel.getInstance().tempBankBag(itemkey, false);
						return;
					}
					/** 判断当前物品在背包中的数量 */
					let num = BagModel.getInstance().chargeItemNum(item[index].id);
					/** 判断当前的物品是否能直接使用 */
					let canDirUse = BagModel.getInstance().isCanDirectUse(item[index].id);
					if (num == 0 && canDirUse) {
						BagModel.getInstance().addItemUseGuide.set(item[index].id, item[index]);
						/** 如果容器中存在指定物品才刷新界面 */
						this.event(ADDITEM_USE_GUIDE);
					}
					BagModel.getInstance().bagMap[msg.packid].items.push(item[index]);
					//当得到这三个物品是开启背包引导且背包界面没有开启,并且传入下一个引导需要的物品id
					if (item[index].id == 105002 && models.BagModel.getInstance().bagkey)
						models.BagProxy.getInstance().event(models.BAG_YINDAO, [126601]);
					else if (item[index].id == 105003 && models.BagModel.getInstance().bagkey)
						models.BagProxy.getInstance().event(models.BAG_YINDAO, [126502]);
					else if (item[index].id == 105004 && models.BagModel.getInstance().bagkey)
						models.BagProxy.getInstance().event(models.BAG_YINDAO, [126618]);
				}
				models.BagProxy.getInstance().event(models.REFRESH_BAG_COUNT);

			} else if (packid == BagTypes.DEPOT) {
				let currDepot = bagModel.getInstance().currDepotId;
				if (currDepot == -1) return; //当前所在的仓库Id为-1时返回
				for (var index = 0; index < item.length; index++) {
					BagModel.getInstance().bagMap[msg.packid][currDepot].items.push(item[index]);
				}

			} else if (packid == BagTypes.EQUIP) {
				for (var index = 0; index < item.length; index++) {
					BagModel.getInstance().bagMap[msg.packid].items.push(item[index]);
					this.event(INSPECT_EQUIP_GEM, item[index]);
				}
				this.event(INSPECT_EQUIP);
				models.BagProxy.getInstance().event(models.REFRESH_BAG_COUNT);
			} else if (packid == BagTypes.MARKET) {
				for (var index = 0; index < item.length; index++) {
					BagModel.getInstance().bagMap[msg.packid].items.push(item[index]);
				}
			} else if (packid == BagTypes.QUEST) {
				for (var index = 0; index < item.length; index++) {
					BagModel.getInstance().bagMap[msg.packid].items.push(item[index]);
				}
			} else if (packid == BagTypes.TEMP) {
				for (var index = 0; index < item.length; index++) {
					//道具的key
					let itemkey = item[index].key;
					let _lendItemsDic = bagModel.getInstance().lendItemsDic;
					if (_lendItemsDic.get(itemkey) != undefined) {
						bagModel.getInstance().tempBankBag(itemkey, false);
						return;
					}
					BagModel.getInstance().bagMap[msg.packid].items.push(item[index]);
				}
				BagProxy.getInstance().event(models.REFRESH_TEMP_BAG, true);

			}
			BagProxy.getInstance().event(models.REFRESH_BAG_DEPOT_COUNT);
			BagProxy.getInstance().event(models.ITEMADD_OR_DEL);

			for (var i = 0; i < item.length; i++) {
				var key = item[i].key;
				console.log("-------请求属性key:", key)
				RequesterProtocols._instance.c2s_CGetItem_Tips(packid, key);
			}
		}

		/**
		 * @describe  刷新背包（10种，看BagTypes的信息）种的钱币数量
		 */
		private onRefreshCurrency(optcode: number, msg: hanlder.S2C_SRefresh_Currency): void {
			if (msg.packid == BagTypes.BAG) {
				let flag = false;
				let gold = msg.currency.get(MoneyTypes.MoneyType_GoldCoin);
				let silver = msg.currency.get(MoneyTypes.MoneyType_SilverCoin);
				if (msg.currency.get(MoneyTypes.MoneyType_GoldCoin) != null) {
					models.BagModel.getInstance().globalIcon = msg.currency.get(MoneyTypes.MoneyType_GoldCoin);
					flag = true;
				}
				if (msg.currency.get(MoneyTypes.MoneyType_SilverCoin) != null) {
					models.BagModel.getInstance().sliverIcon = msg.currency.get(MoneyTypes.MoneyType_SilverCoin);
					flag = true;
				}
				if (msg.currency.get(MoneyTypes.MoneyType_RongYu) != null) {
					models.BagModel.getInstance().honnorIcon = msg.currency.get(MoneyTypes.MoneyType_RongYu);
					flag = true;
				} if (msg.currency.get(MoneyTypes.MoneyType_FactionContribute) != null) {
					models.BagModel.getInstance().FactionContribute = msg.currency.get(MoneyTypes.MoneyType_FactionContribute);
					flag = true;
				}
				if (flag) {
					models.BagProxy.getInstance().event(models.REFRESH_CURRENCY_EVENT);
				}
			}
		}
		/**
		 * @describe  刷新仓库的大小
		 */
		private onRefreshPackSize(optcode: number, msg: hanlder.S2C_SRefreshPack_Size): void {
			let packid: number = msg.packid;
			let cap: number = msg.cap;
			let depotKey: number;
			if (packid == BagTypes.BAG) {
				if (cap <= BagModel.getInstance().minBagNum) return;
				bagModel.getInstance().actBagNum = cap;
				models.BagProxy.getInstance().event(models.REFRESH_BAG_COUNT);
			} else if (packid == BagTypes.DEPOT) {
				if (cap <= BagModel.getInstance().minDeptNum) return;
				depotKey = cap / 25 - 2;
				for (let keyNum = 0; keyNum < depotKey; keyNum++) {
					BagModel.getInstance().depotnameinfo.set(keyNum, 25);
				}
				/** 此处更改本来是刷新的是接受仓库事件，改为只刷新仓库大小 */
				models.BagProxy.getInstance().event(models.ACCPET_STOREHOUSE_NUM_EVENT);
			}
		}
		/**
		 *  刷新拥有的元宝数量 
		 */
		private onRefreshFushi(optcode: number, msg: hanlder.S2C_SReqFushiNum): void {
			models.BagModel.getInstance().yuanbaoIcon = msg.bindNum + msg.num;
			models.BagModel.getInstance().totalnum = msg.totalnum;
			models.BagProxy.getInstance().event(REFRESH_YUANBAO_EVENT);
		}
		/** 
		 * 坐骑乘骑数据更新
		 */
		private onSRideUpdate(optcode: number, msg: hanlder.S2C_SRide_Update): void {
			console.log("---------------onSRideUpdate- itemkey：", msg.itemkey);
			console.log("---------------onSRideUpdate- itemid：", msg.itemid);
			console.log("---------------onSRideUpdate- rideid：", msg.rideid);
			/** 只取乘骑的id */
			ModuleManager.hide(ModuleNames.BAG);
			bagModel.getInstance().currentRideId = msg.itemid;
			/** 这边应该还有骑乘模型 */


		}
		/** 
		 * 坐骑乘骑数据更新
		 */
		private onSAddTitle(optcode: number, msg: hanlder.S2C_add_title): void {
			let data = msg.Titleinfo;
			LoginModel.getInstance().roleDetail.title = data.titleid;
			LoginModel.getInstance().roleDetail.titles.set(data.titleid, data);
			//客户端请求佩戴称谓
			RequesterProtocols._instance.c2s_COnTitle(data.titleid);
		}

		/** 人物改名 */
		private onSModifyRoleName(optcode: number, msg: hanlder.S2C_SModifyRoleName): void {
			let roleId = msg.roleid;
			let roleName = msg.newName;
			LoginModel.getInstance().roleDetail.rolename = roleName;
			this.event(models.CURR_ROLENAME_CHANGE, roleName);
		}

	}
}