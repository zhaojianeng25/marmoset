/**
* 物品获取途径 
*/
module game.modules.strengThening {
	export class StrengTheningComefromViewMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.StrengTheningGainUI;

		/**装备生成基本属性表 */
		equipIteminfoData = StrengTheningModel.getInstance().equipIteminfoData;
		/**属性效果id表 */
		attributeDesConfigData = StrengTheningModel.getInstance().attributeDesConfigData;
		/**复合表 */
		itemAttrData = BagModel.getInstance().itemAttrData;
		/**装备表-宝石-修理 */
		equipItemAttrData = StrengTheningModel.getInstance().equipItemAttrData;
		/**道具类型表 */
		itemTypeData = StrengTheningModel.getInstance().itemTypeData;
		/**装备打造表 */
		equipMakeInfoData = StrengTheningModel.getInstance().equipMakeInfoData;
		/**程序内字符串表 */
		cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
		/**获取途径表 */
		comeFromData = models.StrengTheningModel._instance.comeFromData;

		constructor(uiLayer: Sprite, app: AppBase, itemId) {
			super(uiLayer);
			this._viewUI = new ui.common.StrengTheningGainUI();
			this.isCenter = false;
			this._app = app;
			this._viewUI.close_img.on(LEvent.MOUSE_DOWN, this, this.hide);
			this.showBaseItem(itemId);
		}

		/**
			 * 显示物品tips中的名称、类型、功能、图标、边框
			 * @param itemId 
			 */
		public showBaseItem(itemId) {
			var destribe = this.itemAttrData[itemId].destribe;   //描述
			var effectdes = this.itemAttrData[itemId].effectdes;  //功能说明
			var itemName = this.itemAttrData[itemId].name; //物品名称
			var itemtypeid = this.itemAttrData[itemId].itemtypeid;  //类型
			var itemtypeName = this.itemTypeData[itemtypeid].name;  //类型名
			var iconid = this.itemAttrData[itemId].icon;  //iconid
			var itemIcon = SaleModel.getInstance().getIcon(iconid);  //icon
			var nquality = this.itemAttrData[itemId].nquality;   //品质
			var itemnquality = StrengTheningModel._instance.frameSkinArr[nquality - 1];

			this._viewUI.name_lab.text = itemName;
			this._viewUI.typeName_lab.text = tipsModel.stringType.equipType + itemtypeName;
			if (100100 <= itemId && itemId <= 100352) {
				this._viewUI.number_lab.text = this.cstringResConfigData[1].msg + this.itemAttrData[itemId].level;
			} else {
				this._viewUI.number_lab.text = this.cstringResConfigData[11032].msg + effectdes;
			}
			this._viewUI.icon_img.skin = itemIcon + "";
			this._viewUI.frame_img.skin = itemnquality;
			var tishi = this.cstringResConfigData[11029].msg;
			this._viewUI.comefromDesc_label.text = tishi.replace("$parameter1$", itemName);
			this.getWay(itemId);
		}

		/**获取途径 */
		public getWay(itemid) {
			var vcomefrom = this.itemAttrData[itemid].vcomefrom;
			var comefromArr = [];
			for (var i = 0; i < vcomefrom.length; i++) {
				var strname = this.comeFromData[vcomefrom[i]].strname;
				var stricon2 = this.comeFromData[vcomefrom[i]].stricon2;
				var nuiidornpcid = this.comeFromData[vcomefrom[i]].nuiidornpcid;
				var etype = this.comeFromData[vcomefrom[i]].etype;
				var m_icon = SaleModel.getInstance().getIcon(stricon2);
				comefromArr.push({ content_img: m_icon, name_lab: strname, etype: etype, nuiidornpcid: nuiidornpcid });
			}
			SaleModel._instance.showList(this._viewUI.way_list, comefromArr);
			this._viewUI.way_list.selectHandler = new Handler(this, this.waylistSelect, [comefromArr, itemid]);

		}

		/**物品获取途径选择 */
		public waylistSelect(comefromArr, itemid, index) {
			var nuiidornpcid = comefromArr[index].nuiidornpcid;
			switch (nuiidornpcid) {
				case 1:
					this.goShanghui(itemid);  //商会
					break;
				case 2:
					this.goSale(itemid);   //拍卖
					break;
				case 3:
					this.goLifeSkill();   //生活技能
					break;
				case 4:
					this.goShop(itemid);  //商城
					break;
				case 161521:
					this.goBingfengwangzuo();  //冰封王座
					break;
				case 64:
					this.goJifenDuihuan();  //积分兑换
					break;
			}
		}

		/**商会 */
		public goShanghui(itemid) {
			var tabNum = game.modules.strengThening.models.StrengTheningModel._instance.tabNum;
			game.modules.shop.models.ShopModel._instance.itemId = itemid;
			ModuleManager.show(ModuleNames.SHOP, this._app);
			ModuleManager.hide(ModuleNames.STRENG_THENING);
			this.hide();
			LoginModel.getInstance().CommonPage = ModuleNames.STRENG_THENING;
			game.modules.strengThening.models.StrengTheningModel._instance.tabNum = tabNum;
		}

		/**拍卖 */
		public goSale(itemid) {
			var tabNum = game.modules.strengThening.models.StrengTheningModel._instance.tabNum;
			ModuleManager.show(ModuleNames.SALE, this._app);
			ModuleManager.hide(ModuleNames.STRENG_THENING);
			sale.models.SaleModel.getInstance().saleTargetId = itemid;
			game.modules.sale.models.SaleProxy._instance.event(game.modules.sale.models.SearchItemResult);
			this.hide();
			LoginModel.getInstance().CommonPage = ModuleNames.STRENG_THENING;
			game.modules.strengThening.models.StrengTheningModel._instance.tabNum = tabNum;
		}

		/**生活技能 */
		public goLifeSkill() {
			var tabNum = game.modules.strengThening.models.StrengTheningModel._instance.tabNum;
			skill.models.SkillModel.getInstance().currenTabNum = 2;//切换到生活技能界面
			ModuleManager.show(ModuleNames.SKILL, this._app);
			ModuleManager.hide(ModuleNames.STRENG_THENING);
			this.hide();
			LoginModel.getInstance().CommonPage = ModuleNames.STRENG_THENING;
			game.modules.strengThening.models.StrengTheningModel._instance.tabNum = tabNum;
		}

		/**商城 */
		public goShop(itemid) {
			var tabNum = game.modules.strengThening.models.StrengTheningModel._instance.tabNum;
			game.modules.shop.models.ShopModel._instance.scItemId = itemid;
			ModuleManager.hide(ModuleNames.STRENG_THENING);
			ModuleManager.jumpPage(ModuleNames.SHOP, shopMediatorType.SHANGCHANG, this._app);
			this.hide();
			LoginModel.getInstance().CommonPage = ModuleNames.STRENG_THENING;
			game.modules.strengThening.models.StrengTheningModel._instance.tabNum = tabNum;
		}

		/**冰封王座 */
		public goBingfengwangzuo() {
			this.hide();
		}

		/**积分兑换 */
		public goJifenDuihuan() {
			var tabNum = game.modules.strengThening.models.StrengTheningModel._instance.tabNum;
			var RoleJiFenDuiHuanMediator: game.modules.roleinfo.RoleJiFenDuiHuanMediator = new game.modules.roleinfo.RoleJiFenDuiHuanMediator(this._app);
			RoleJiFenDuiHuanMediator.show();
			ModuleManager.hide(ModuleNames.STRENG_THENING);
			this.hide();
			LoginModel.getInstance().CommonPage = ModuleNames.STRENG_THENING;
			game.modules.strengThening.models.StrengTheningModel._instance.tabNum = tabNum;
		}

		public show(): void {
			super.show();
		}

		public hide(): void {
			super.hide();
		}

		public getView(): Sprite {
			return this._viewUI;
		}
	}
}