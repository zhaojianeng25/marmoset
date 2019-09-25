/**
* 宝石修理 
*/
import bagModel = game.modules.bag.models.BagModel
module game.modules.strengThening {
	export class StrengTheningFixViewMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.StrengTheningFixUI;
		private ChangeMoneyViewMediator: game.modules.commonUI.ChangeMoneyViewMediator;
		private DisappearMessageTipsMediator: game.modules.commonUI.DisappearMessageTipsMediator;
		private StrengTheningComefromViewMediator: StrengTheningComefromViewMediator;
		/**tips */
		private _tipsModule: game.modules.tips.tipsModule;
		/**装备-宝石表-修理  道具耐久 修理材料id等 */
		equipItemAttrData = StrengTheningModel.getInstance().equipItemAttrData;
		/**复合表 道具名称   颜色品质X */
		itemAttrData = BagModel.getInstance().itemAttrData;
		/**当前拥有的装备 */
		m_haveEqu = [];
		/**拥有的杂货 */
		m_havegroceryEffectArr = [];
		/**装备附加属性库 */
		equipAddattributelibData = StrengTheningModel.getInstance().equipAddattributelibData;
		/**装备基础属性表 */
		equipIteminfoData = StrengTheningModel.getInstance().equipIteminfoData;
		/**属性效果id表 */
		attributeDesConfigData = StrengTheningModel.getInstance().attributeDesConfigData;
		/**装备表 */
		equipEffectData = game.modules.strengThening.models.StrengTheningModel._instance.equipEffectData;
		/**职业创建表 */
		createRoleConfigBinDic = game.modules.createrole.models.LoginModel.getInstance().createRoleConfigBinDic;
		/**程序内字符串表 */
		cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
		/**客户端信息提示表 */
		chatMessageTips = game.modules.chat.models.ChatModel._instance.chatMessageTips;
		/** 当前先择的宝石列表的cell，用于显示点击特效 */
		bgBtn: Laya.Box = null;
		constructor(uiLayer: Sprite, app: AppBase) {
			super(uiLayer);
			this._viewUI = new ui.common.StrengTheningFixUI();
			this.isCenter = false;
			this._app = app;
			this.initLists();
			this._viewUI.tishi_label.visible = false;
			this._viewUI.fix_btn.on(LEvent.MOUSE_DOWN, this, this.onFixBtn);
			this._viewUI.addMoney_btn.on(LEvent.MOUSE_DOWN, this, this.addMoney)
			this._viewUI.isUse_check.on(LEvent.MOUSE_DOWN, this, this.onUseCheckBox);
			StrengTheningModel._instance.inintHaveMoney(this._viewUI.haveMoney_lab);
			game.modules.bag.models.BagProxy.getInstance().on(game.modules.bag.models.REFRESH_CURRENCY_EVENT, this, StrengTheningModel._instance.inintHaveMoney, [this._viewUI.haveMoney_lab]);
			game.modules.bag.models.BagProxy.getInstance().on(game.modules.bag.models.ITEMADD_OR_DEL, this, this.initLists);
		}
        
		/**显示兑换银币界面 */
		public addMoney() {
			this.ChangeMoneyViewMediator = new game.modules.commonUI.ChangeMoneyViewMediator(this._viewUI, this._app);
			this.ChangeMoneyViewMediator.onShowInModule(ModuleNames.STRENG_THENING,false, game.modules.bag.models.BagModel.getInstance().yuanbaoIcon, game.modules.bag.models.BagModel.getInstance().globalIcon);
		}
        
		/**初始化数据 */
		public initLists(): void {
			this.initHaveEqu();
			var equip_list = this._viewUI.equip_list;
			var equArr: Array<any> = [];
			for (var i: number = 0; i < this.m_haveEqu.length; i++) {
				var equId = this.m_haveEqu[i].itemId;
				var name_lab = this.itemAttrData[equId].name; //名称
				var nquality = this.itemAttrData[equId].nquality; //品质
				var equIcon = this.itemAttrData[equId].icon;   //icon id
				var naijiuratio = this.equipItemAttrData[equId].naijiuratio;    //耐久
				var frameImg = StrengTheningModel._instance.frameSkinArr[nquality - 1];  //边框skin
				var icon = this.itemAttrData[equId].icon;
				var iconSkin = "common/icon/item/" + icon + ".png";
				equArr.push({ name_lab: name_lab, number_lab: naijiuratio, frame_img: frameImg, equIcon_img: iconSkin, equId: equId });
			}
			this.showList(equip_list, equArr);
			equip_list.selectHandler = new Handler(this, this.equipListSelect);
			equip_list.renderHandler = new Handler(this, this.equipRender, [equArr]);
			this.equipListSelect(0);
		}
        
		/**显示装备 */
		public equipRender(equArr, cell: Box, index: number) {
			var mark_img = cell.getChildByName("mark_img") as Laya.Image;
			var equip_btn = cell.getChildByName("equip_btn") as Laya.Button;
			mark_img.visible = false;
			var equId = equArr[index].equId;
			var iscanWear = this.equipIsCanWear(equId);
			if (iscanWear) {
				mark_img.visible = true;
			}
			equip_btn.on(LEvent.MOUSE_UP, this, this.onEquipBtn, [index, cell]);
		}
        
		/**列表点击效果 */
		public onEquipBtn(index, cell) {
			var bgBtn: Button = cell.getChildByName("equip_btn") as Button;
			bgBtn.selected = true;
			if (this.bgBtn == null) {
				this.bgBtn = cell;
				return;
			}
			if (this.bgBtn != cell) {
				var equip_btn: Button = this.bgBtn.getChildByName("equip_btn") as Button;
				equip_btn.selected = false;
				this.bgBtn = cell;
			}
		}
        
		/**装备是否能装备 */
		public equipIsCanWear(itemId) {
			var iscanWear = false;
			var mLevel = game.modules.createrole.models.LoginModel.getInstance().roleDetail.level;  //玩家等级
			var equLevel = this.itemAttrData[itemId].level;  //装备等级
			var needCareer = this.equipEffectData[itemId].needCareer;  //装备职业需求
			var school = game.modules.createrole.models.LoginModel.getInstance().roleDetail.school;  //职业
			var carrerArr = needCareer.split(";");
			var sexNeed = this.equipEffectData[itemId].sexNeed;
			var shape = game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape;  //角色id
			var sex = this.createRoleConfigBinDic[shape].sex
			if (mLevel >= equLevel && sexNeed == sex || sexNeed == 0 || needCareer == "0") {
				if (carrerArr.indexOf(school + "") > 0 || needCareer == "0") {
					iscanWear = true;
				}
			}
			return iscanWear;
		}
        
		/**选择装备 */
		public equipListSelect(index: number) {
			var equId = this.m_haveEqu[index].itemId; //装备id
			this._viewUI.equName_label.text = this.itemAttrData[equId].name;
			var nquality = this.itemAttrData[equId].nquality;  //装备品质
			this._viewUI.frame_img.skin = StrengTheningModel._instance.frameSkinArr[nquality - 1];
			var equipItemAttrData = this.equipItemAttrData[equId]
			var ptxlmoneytype = equipItemAttrData.ptxlmoneytype; //修理需要的金钱类型
			var ptxlmoneynum = equipItemAttrData.ptxlmoneynum;  //修理需要的金钱
			var tsxlcailiaoid = equipItemAttrData.tsxlcailiaoid;  //特殊材料id
			var tsxlcailiaonum = equipItemAttrData.tsxlcailiaonum;  //特殊材料数量
			var tsxlcailiaoIcon = this.itemAttrData[tsxlcailiaoid].icon;
			var cailiaoQuality = this.itemAttrData[tsxlcailiaoid].nquality;  //材料品质
			var equIcon = this.itemAttrData[equId].icon;
			this._viewUI.equIcon_img.skin = "common/icon/item/" + equIcon + ".png";
			var commonidlist = equipItemAttrData.commonidlist;  //装备修理材料id arr
			var commonnumlist = equipItemAttrData.commonnumlist;  //装备修理材料数量 arr
			this._viewUI.needMoney_label.text = ptxlmoneynum;
			this._viewUI.tsxlcailiaoIcon_img.skin = "common/icon/item/" + tsxlcailiaoIcon + ".png";
			this._viewUI.tsxlcailiaoFrame_img.skin = StrengTheningModel._instance.frameSkinArr[cailiaoQuality - 1];
			this._viewUI.tsxlcailiaoIcon_img.on(LEvent.MOUSE_DOWN, this, this.onItemBtn, [tsxlcailiaoid]);   //tips

			var cailiaoArr = this.getCailiao(commonidlist, commonnumlist);
			if (cailiaoArr.length > 0) {
				var needCailiaoNum = cailiaoArr[2];
				var icon = this.itemAttrData[cailiaoArr[0]].icon;
				var haveCailiaoNum = cailiaoArr[1];
				this._viewUI.cailaoIcon_img.skin = "common/icon/item/" + icon + ".png";
				this.showNeedNum(needCailiaoNum, haveCailiaoNum, this._viewUI.cailiaoNum_label, false);
				this._viewUI.cailaoIcon_img.on(LEvent.MOUSE_DOWN, this, this.onItemBtn, [cailiaoArr[0]])
			} else {   //没有材料。默认显示材料列表中的第一个材料icon
				var icon = this.itemAttrData[commonidlist[0]].icon;
				this._viewUI.cailaoIcon_img.skin = "common/icon/item/" + icon + ".png";
				this.showNeedNum(commonnumlist[0], 0, this._viewUI.cailiaoNum_label, false);
				this._viewUI.cailaoIcon_img.on(LEvent.MOUSE_DOWN, this, this.onItemBtn, [commonidlist[0]])
			}
			this.attributeList(equId);
		}
        
		/**获取材料 */
		public getCailiao(commonidlist, commonnumlist) {
			var arr: Array<any> = [];
			for (var i = 0; i < commonidlist.length; i++) {
				for (var j = 0; j < this.m_havegroceryEffectArr.length; j++) {
					if (commonidlist[i] == this.m_havegroceryEffectArr[j].itemId) {
						arr.push(commonidlist[i], this.m_havegroceryEffectArr[j].itemNum, commonnumlist[i]);    //id haveNum needNum
						return arr;
					}
				}
			}
			return arr;
		}

        /**
		 * 显示装备属性list
		 */
		public attributeList(equId) {
			var packid = 0;
			var keyinpack = 0;
			var curEquipTips: Array<any> = [];
			var bag1 = bagModel.getInstance().bagMap[BagTypes.BAG];  //获取背包1
			var bag3 = bagModel.getInstance().bagMap[BagTypes.EQUIP];  //获取背包3
			var keyinpack1 = this.getKey(bag1, equId);
			var keyinpack3 = this.getKey(bag3, equId);
			if (keyinpack1 > 0) {
				packid = 1;
				keyinpack = keyinpack1;
			}
			if (keyinpack3 > 0) {
				packid = 3;
				keyinpack = keyinpack3;
			}
			var equipTips = StrengTheningModel.getInstance().equipTips;  //装备属性信息
			for (var i = 0; i < equipTips.length; i++) {
				if (packid == equipTips[i].packid && keyinpack == equipTips[i].keyinpack) {
					if (equipTips[i].tips.baseAttr != null) {
						var baseAttrkeys = equipTips[i].tips.baseAttr.keys;
						for (var l = 0; l < baseAttrkeys.length; l++) {
							var kay = baseAttrkeys[l];  //基础属性id
							var value = equipTips[i].tips.baseAttr.get(baseAttrkeys[l]);  //基础属性值
							var name = this.attributeDesConfigData[baseAttrkeys[l]].name
							var baseAttrName = name + "+" + value;
							curEquipTips.push({ attribute_label: baseAttrName });
						}
					}
					if (equipTips[i].tips.addAttr != null) {
						var addAttrkeys = equipTips[i].tips.addAttr.keys;
						for (var k = 0; k < addAttrkeys.length; k++) {
							var key = addAttrkeys[k];  //附加属性id
							var value = equipTips[i].tips.addAttr.get(addAttrkeys[k]);
							var name = this.equipAddattributelibData[key].name;
							var tipname = name + value;
							var color = this.equipAddattributelibData[key].namecolour;
							curEquipTips.push({ attribute_label: tipname, color: color });
						}
					}
					var endure = equipTips[i].tips.endure; //耐久
					curEquipTips.push({ attribute_label: this.cstringResConfigData[11000].msg + endure });
					var repairtimes = equipTips[i].tips.repairtimes;  //修理失败次数
					curEquipTips.push({ attribute_label: this.cstringResConfigData[11007].msg + repairtimes });
				}
			}
			var attributelist = this._viewUI.attribute_list;
			this.showList(attributelist, curEquipTips);
			attributelist.renderHandler = new Handler(this, this.attributeListRender, [curEquipTips]);
		}

		/**
		 * 修改装备属性label颜色
		 */
		public attributeListRender(arr: Array<any>, cell: Box, index: number) {
			var label: Label = cell.getChildByName("attribute_label") as Label;
			if (arr[index].color != null) {
				label.color = arr[index].color;
			} else {
				label.color = "#391104";
			}
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
		 * 改变显示材料数量label颜色
		 */
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

        /**
		 * 修理按钮
		 */
		public onFixBtn() {
			var packid = 0;
			var keyinpack = 0;
			var repairtype = 0;  //装备修理类型
			if (this._viewUI.isUse_check.selected) {
				repairtype = 1;
			}
			var selectIndex = this._viewUI.equip_list.selectedIndex;
			var equId = StrengTheningModel._instance.haveEquIdArr[selectIndex].itemId; //装备id
			var bag1 = bagModel.getInstance().bagMap[BagTypes.BAG];  //获取背包1
			var bag3 = bagModel.getInstance().bagMap[BagTypes.EQUIP];  //获取背包3
			var keyinpack1 = this.getKey(bag1, equId);
			var keyinpack3 = this.getKey(bag3, equId);
			if (keyinpack1 > 0) {
				packid = 1;
				keyinpack = keyinpack1;
			}
			if (keyinpack3 > 0) {
				packid = 3;
				keyinpack = keyinpack3;
			}
			RequesterProtocols._instance.c2s_CXiuLiEquip_Item(repairtype, packid, keyinpack);
			models.StrengTheningProxy.getInstance().once(models.onErrorCode, this, this.showError);
		}
        
		/**获取物品的key */
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
        
		/**是否使用强化剂 */
		public onUseCheckBox() {
			if (!this._viewUI.isUse_check.selected) {
				this._viewUI.tishi_label.visible = true;
			} else {
				this._viewUI.tishi_label.visible = false;
			}
		}
        
		/**点击物品 显示详情*/
		public onItemBtn(itemId: number) {
			var parame: Dictionary = new Dictionary();
			parame.set("itemId", itemId)
			this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.QIANGHUA, parame);
			game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.onComeformBtn, this, this.showComefrom)
		}
		
		/**显示物品的获取途径 */
		public showComefrom(equipid) {
			this.StrengTheningComefromViewMediator = new StrengTheningComefromViewMediator(this._viewUI, this._app, equipid);
			this.StrengTheningComefromViewMediator.show();
		}
        
		/**修理异常返回 */
		public showError(errorCode) {
			this.DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
			if (errorCode == SErrorCode.MONEY_NOT_ENOUGH) {
				this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[420025].msg);
			} else if (errorCode == SErrorCode.QIANG_HUA_SHI_NOT_ENOUGH) {
				this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[420026].msg);
			} else if (errorCode == SErrorCode.TIE_NOT_ENOUGH) {
				this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[420027].msg);
			} else if (errorCode == SErrorCode.TUZHI_NOT_ENOUGH) {
				this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[420028].msg);
			} else if (errorCode == SErrorCode.XIU_LI_CAI_LIAO_NOT_ENOUGH) {
				this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[420029].msg);
			} else if (errorCode == SErrorCode.ZHI_ZHAO_FU_NOT_ENOUGH) {
				this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[420030].msg);
			}
		}

        /**获取拥有的装备id  宝石id */
		public initHaveEqu() {  
			this.m_haveEqu = [];
			this.m_havegroceryEffectArr = [];
			var bag1 = bagModel.getInstance().bagMap[BagTypes.BAG].items;
			var bag3 = bagModel.getInstance().bagMap[BagTypes.EQUIP].items;
			var returnBag3 = this.getItems(bag3);
			var returnBag1 = this.getItems(bag1);
			this.pushToArr(returnBag3, BagTypes.EQUIP);
			this.pushToArr(returnBag1, BagTypes.BAG);
		}
        
		/**获取背包数据 */
		public getItems(bag) {
			var idArr: Array<any> = []
			for (var i: number = 0; i < bag.length; i++) {
				var itemId = bag[i].id;      //item id
				var itemNum = bag[i].number;      //item id
				idArr.push({ itemId: itemId, itemNum: itemNum, key: bag[i].key });
			}
			return idArr;
		}

        /**将背包中的物品分类 */
		public pushToArr(returnBag, packid) {  
			if (returnBag.length == 0) return;
			for (var i: number = 0; i < returnBag.length; i++) {
				if (120000 <= returnBag[i].itemId && returnBag[i].itemId <= 126675) {  //装备
					this.m_haveEqu.push({ itemId: returnBag[i].itemId, itemNum: returnBag[i].itemNum, key: returnBag[i].key, packid: packid })
				} else if (140000 <= returnBag[i].itemId && returnBag[i].itemId <= 140005) {  //策划装备
					this.m_haveEqu.push({ itemId: returnBag[i].itemId, itemNum: returnBag[i].itemNum, key: returnBag[i].key, packid: packid })
				} else if (100000 <= returnBag[i].itemId && returnBag[i].itemId <= 107044) {  //杂货
					StrengTheningModel._instance.havegroceryEffectArr.push({ itemId: returnBag[i].itemId, itemNum: returnBag[i].itemNum })
					this.m_havegroceryEffectArr.push({ itemId: returnBag[i].itemId, itemNum: returnBag[i].itemNum })
				}
			}
		}

		public show(): void {
			this.initHaveEqu();
			super.show();
			//console.log("LoginViewMediator show");

		}
		public hide(): void {
			super.hide();
		}

		public getView(): Sprite {
			return this._viewUI;
		}
	}
}