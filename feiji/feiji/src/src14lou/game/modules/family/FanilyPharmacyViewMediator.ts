
module game.modules.family {
	/** 帮派药房 */
	export class FanilyPharmacyViewMediator extends game.modules.ModuleMediator {
		private _viewUI: ui.common.FamilyYaoFangUI;//ui.common.CreateRoleUI;
		DisappearMessageTipsMediator: game.modules.commonUI.DisappearMessageTipsMediator;
		tipsModule: game.modules.tips.tipsModule;
		/**药品购买配置表 */
		clanCFactionYaoFangData = models.FamilyModel.getInstance().clanCFactionYaoFangData;
		/**g公会药房数据表 */
		clanCFactionDrugStoreData = models.FamilyModel.getInstance().clanCFactionDrugStoreData;
		/**
         * 杂货等表的复合表
         */
		itemAttrData = BagModel.getInstance().itemAttrData;
		/**客户端信息提示表 */
		chatMessageTips = game.modules.chat.models.ChatModel._instance.chatMessageTips;
		/**程序内字符串表 */
		cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
		/**公会药房数据 */
		pharmacyInfoArr = [];
		/** 上一次被选中的产药倍率索引 */
		private lastRateSelectedIndex: number = 0;
		/** 上次药品列表被选中的索引 */
		private yaoPinLstSelectedIndex: number = -1;

		constructor(app: AppBase) {
			super();
			this.uiLayer = app.uiRoot.general;
			this._viewUI = new ui.common.FamilyYaoFangUI();
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.closePharmacyView);
			this.COpenClanMedic();
			this.DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
			models.FamilyProxy._instance.on(models.SOpenClanMedic, this, this.showPharmacyView);
			game.modules.createrole.models.LoginProxy.getInstance().on(game.modules.createrole.models.SRefreshCurrency_EVENT, this, this.showHaveMoney);
			this._viewUI.reduce_btn.on(LEvent.MOUSE_DOWN, this, this.onReduceBtn);
			this._viewUI.add_btn.on(LEvent.MOUSE_DOWN, this, this.onAddBtn);
			this._viewUI.buy_btn.on(LEvent.MOUSE_DOWN, this, this.BuyMedic);
			this._viewUI.TipsYaoFang_btn.on(LEvent.MOUSE_DOWN, this, this.onTips);

			this._viewUI.banggong1_img.skin = "common/icon/item/20108.png";
			this._viewUI.banggong2_img.skin = "common/icon/item/20108.png";
		}
		/**显示拥有的钱 */
		public showHaveMoney() {
			let haveYinBiNum = HudModel.getInstance().sliverNum;
			if (haveYinBiNum > 9999999) {
				this._viewUI.haveyinbi1_lab.visible = true;
				this._viewUI.haveyinbi1_lab.text = models.FamilyModel.getInstance().showMoney(haveYinBiNum);
				this._viewUI.haveyinbi_lab.visible = false;
			}
			else {
				this._viewUI.haveyinbi1_lab.visible = false;
				this._viewUI.haveyinbi_lab.visible = true;
				this._viewUI.haveyinbi_lab.text = models.FamilyModel.getInstance().showMoney(haveYinBiNum);
			}
		}

		/**提示弹窗 */
		public onTips() {
			var parameArr: Dictionary = new Dictionary();
			parameArr.set("title", 11319);
			parameArr.set("contentId", 11320);
			var clanInfo = models.FamilyModel.getInstance().clanInfo;
			var house = clanInfo[0].house;
			var yaofangLevel = house.get(clanHouse.BuildYaoFang);
			var medicNum = this.clanCFactionDrugStoreData[yaofangLevel].dragnummax;
			var doublemoney = this.clanCFactionDrugStoreData[yaofangLevel].doublemoney / 10000;
			var trimoney = this.clanCFactionDrugStoreData[yaofangLevel].trimoney / 10000;
			var parame = [yaofangLevel, medicNum, doublemoney, trimoney];
			parameArr.set("parame", parame);
			this.tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, parameArr);
		}
		/** 权限不足，不能设置产药倍率 */
		private onlySelectType():void{
			this.setSelectType(this.lastRateSelectedIndex);
			this.CRequestSelectType(this.lastRateSelectedIndex);
		}
		/**显示药房信息 */
		public showPharmacyView() {
			var skinArr: Array<any> = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
				"common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
				"common/ui/tongyong/jinkuang.png"];
			var pharmacyInfo = models.FamilyModel.getInstance().pharmacyInfo;
			var medicitemlist = pharmacyInfo.get("medicitemlist");
			var selecttype = pharmacyInfo.get("selecttype");   //选择类型
			var buyitemnum = pharmacyInfo.get("buyitemnum");  //已经购买的数量
			var clanInfo = models.FamilyModel.getInstance().clanInfo;
			var house = clanInfo[0].house;
			var yaofangLevel = house.get(clanHouse.BuildYaoFang);
			this._viewUI.lvYaoFang_lab.text = yaofangLevel; //药房等级
			this._viewUI.selecttype_radio.selectedIndex = selecttype;  //类型
			this.lastRateSelectedIndex = selecttype;
			if(this.isCanSwitch()){
				this._viewUI.selecttype_radio.selectHandler = new Handler(this, this.selectType);
			}
			else{
				for(let i = 0; i < 3; i ++){
					let item: Laya.Radio = this._viewUI.selecttype_radio.getChildAt(i) as Laya.Radio;
					item.on(LEvent.CLICK, this, this.onlySelectType);
				}
			}
			this.showHaveMoney();
			var rolecontribution = HudModel.getInstance().gonghuiNum;   //公会贡献度
			if (rolecontribution > 99999) {
				this._viewUI.havegongxian1_lab.visible = true;
				this._viewUI.havegongxian1_lab.text = models.FamilyModel.getInstance().showMoney(rolecontribution);
				this._viewUI.havegongxian_lab.visible = false;
			}
			else {
				this._viewUI.havegongxian1_lab.visible = false;
				this._viewUI.havegongxian_lab.visible = true;
				this._viewUI.havegongxian_lab.text = models.FamilyModel.getInstance().showMoney(rolecontribution);
			}
			var pharmacyInfoArr = [];
			for (var i in medicitemlist) {
				var itemid = medicitemlist[i].itemid;
				var itemnum = medicitemlist[i].itemnum;
				var icon = this.itemAttrData[itemid].icon;
				var m_icon = SaleModel._instance.getIcon(icon);
				var name = this.clanCFactionYaoFangData[itemid].name;
				var money = this.clanCFactionYaoFangData[itemid].money;
				var banggong = this.clanCFactionYaoFangData[itemid].banggong;
				var skin = skinArr[BagModel.getInstance().itemAttrData[itemid].nquality - 1];
				pharmacyInfoArr.push({ itemid: itemid, yaoPinName_lab: name, kuang_img: skin, yaoPinIcon_img: m_icon, number_lab: itemnum, spendGongXian_lab: money, needGongXian_lab: banggong });
			}
			this.pharmacyInfoArr = pharmacyInfoArr;
			SaleModel._instance.showList(this._viewUI.yaoPin_list, pharmacyInfoArr);
			this._viewUI.yaoPin_list.selectHandler = new Handler(this, this.yaoPinListSelect, [pharmacyInfoArr]);
			this._viewUI.yaoPin_list.renderHandler = new Handler(this, this.yaoPinListRender, [pharmacyInfoArr]);
			//this.yaoPinListSelect(pharmacyInfoArr, 0);
			if(this.yaoPinLstSelectedIndex == -1){
				this.noYaoPinSelect();
			}
			else{
				this._viewUI.yaoPin_list.selectedIndex = this.yaoPinLstSelectedIndex;
				this._viewUI.yaoPin_list.scrollTo(this.yaoPinLstSelectedIndex);
			}
		}
		/** 没有选中药品，界面的初始化 */
		private noYaoPinSelect(): void {
			this._viewUI.needyinbi_lab.text = models.FamilyModel.getInstance().showMoney(0);
			this._viewUI.needgongxian_lab.text = models.FamilyModel.getInstance().showMoney(0);
		}

		/**选择药品 */
		public yaoPinListSelect(pharmacyInfoArr, index: number) {
			var money = pharmacyInfoArr[index].spendGongXian_lab;
			var banggong = pharmacyInfoArr[index].needGongXian_lab;
			this._viewUI.needyinbi_lab.text = models.FamilyModel.getInstance().showMoney(money);
			this._viewUI.needgongxian_lab.text = models.FamilyModel.getInstance().showMoney(banggong);
			let selectYaoPin_btn: Laya.Button = this._viewUI.yaoPin_list.getCell(index).getChildByName("selectYaoPin_btn") as Laya.Button;
			selectYaoPin_btn.skin = "common/ui/tongyong/common_list_3textbg2.png";
			this.yaoPinLstSelectedIndex = index;
			this.roleOneIsEnough(money, banggong);
		}

		/** 判断人物角色身上的银币、帮贡是否足够
		 * @param yinbi 购买药品所需的银币
		 * @param banggong 购买药品所需的帮贡
		 */
		private roleOneIsEnough(yinbi: number, banggong: number): void {
			//判断银币是否足够
			let _haveYinBiNum = BagModel.getInstance().sliverIcon;
			let yinblab: Laya.Label;
			if (this._viewUI.haveyinbi1_lab.visible) {
				yinblab = this._viewUI.haveyinbi1_lab
			}
			else{
				yinblab = this._viewUI.haveyinbi_lab
			}
			if (yinbi > _haveYinBiNum) {
				yinblab.stroke = 4;
				yinblab.strokeColor = "#FF2800";
			}
			else{
				yinblab.stroke = 0;
				yinblab.strokeColor = "#FF2800";
			}
			//判断帮贡是否足够
			let currHaveBanggong = HudModel.getInstance().gonghuiNum;
			let banggonglab: Laya.Label;
			if (this._viewUI.havegongxian1_lab.visible) {
				banggonglab = this._viewUI.havegongxian1_lab
			}
			else{
				banggonglab = this._viewUI.havegongxian_lab
			}
			if (banggong > currHaveBanggong) {
				banggonglab.stroke = 4;
				banggonglab.strokeColor = "#FF2800";
			}
			else{
				banggonglab.stroke = 0;
				banggonglab.strokeColor = "#FFFFFF";
			}
		}

		/**显示药品信息 */
		public yaoPinListRender(pharmacyInfoArr, cell: Box, index: number) {
			var spendGongXianlab = cell.getChildByName("spendGongXian_lab") as Label;
			var needGongXianlab = cell.getChildByName("needGongXian_lab") as Label;
			spendGongXianlab.text = models.FamilyModel.getInstance().showMoney(pharmacyInfoArr[index].spendGongXian_lab);
			needGongXianlab.text = models.FamilyModel.getInstance().showMoney(pharmacyInfoArr[index].needGongXian_lab);
			let selectYaoPin_btn: Laya.Button = this._viewUI.yaoPin_list.getCell(index).getChildByName("selectYaoPin_btn") as Laya.Button;
			if (this.yaoPinLstSelectedIndex != -1 && this.yaoPinLstSelectedIndex == index) {
				selectYaoPin_btn.skin = "common/ui/tongyong/common_list_3textbg2.png";
			}
			else {
				selectYaoPin_btn.skin = "common/ui/tongyong/huodongdi.png";
			}
			let banggong_img: Laya.Image = cell.getChildByName("banggong_img") as Laya.Image;
			banggong_img.skin = "common/icon/item/20108.png";
		}

		/**减少药品数量 */
		public onReduceBtn() {
			this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[160353].msg)
		}

		/**增加药品数量 */
		public onAddBtn() {
			this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[160353].msg)
		}

		/**购买药品 */
		public BuyMedic() {
			var itemnum = parseInt(this._viewUI.neednumber_lab.text);
			var index = this._viewUI.yaoPin_list.selectedIndex;
			if (index >= 0) {
				var itemid = this.pharmacyInfoArr[index].itemid;
				this.CBuyMedic(itemid, itemnum);
			}
		}

		/**选择产药类型 */
		public selectType(index: number) {
			models.FamilyProxy._instance.once(models.SRequestSelectType, this, this.setSelectType);
			var _tempType: number = 0;
			switch (index) {
				case 0:
					_tempType = ProduceDrugRate.SELECT_BASE;
					this.lastRateSelectedIndex = index;
					this.CRequestSelectType(_tempType);
					break;
				case 1:
					_tempType = ProduceDrugRate.SELECT_DOUBLE;
					this.secondaryConfirm(_tempType);
					break;
				case 2:
					_tempType = ProduceDrugRate.SELECT_THREE;
					this.secondaryConfirm(_tempType);
					break;
			}
		}

		/** 是否有权限切换产药倍率
		 * @descibe 是帮主或者副帮主就返回true，其余一律返回false
		 */
		private isCanSwitch():boolean{
			let isCan: boolean = false;
			let _selfInClanInfo = family.models.FamilyModel.getInstance()._selfInClanInfo;
			if(_selfInClanInfo.position == ClanPositionType.ClanMaster || _selfInClanInfo.position == ClanPositionType.ClanViceMaster){
				isCan = true;
			}
			return isCan;
		}

		/** 显示二级确认界面 */
		private secondaryConfirm(type: number): void {
			var clanInfo = models.FamilyModel.getInstance().clanInfo;
			var house: Dictionary = clanInfo[0].house; //公会的建筑
			//当前药房等级
			var yaofangLevel = house.get(3);
			var parameter1 = type + 1;//产药的倍率
			var parameter2: number = 0;//所需花费的帮贡资金
			if (type == ProduceDrugRate.SELECT_DOUBLE) {
				parameter2 = this.clanCFactionDrugStoreData[yaofangLevel]["doublemoney"] / 10000;
			}
			else if (type == ProduceDrugRate.SELECT_THREE) {
				parameter2 = this.clanCFactionDrugStoreData[yaofangLevel]["trimoney"] / 10000;
			}
			var _parame = new Laya.Dictionary();
			_parame.set("contentId", 11334);
			_parame.set("parame", [parameter1, parameter2]);
			//game.modules.chat.models.ChatProxy.getInstance().once(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, this, this.isShowClanYaoFangDescription,[type]);
			tips.models.TipsProxy.getInstance().once(tips.models.TIPS_ON_OK, this, this.isShowClanYaoFangDescription, [type]);
			tips.models.TipsProxy.getInstance().once(tips.models.TIPS_ON_CANCEL, this, this.setSelectType, [this.lastRateSelectedIndex]);
			var _tipsModule = new tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, _parame);
		}

		/** 是否显示帮派药房说明 */
		private isShowClanYaoFangDescription(type: number): void {
			var currClanMoney = models.FamilyModel.getInstance().clanInfo[0].money//获得当前帮派资金
			var _flag = false;
			switch (type) {
				case ProduceDrugRate.SELECT_DOUBLE:
					if (currClanMoney < 8000000) {
						_flag = true;
					}
					break;
				case ProduceDrugRate.SELECT_THREE:
					if (currClanMoney < 10000000) {
						_flag = true;
					}
					break;
			}
			if (_flag) {//当前帮派资金不足以作为保底的帮派资金
				var msg = ChatModel.getInstance().chatMessageTips[160244]["msg"];
				var distips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
				distips.onShow(msg);
				this.CRequestSelectType(ProduceDrugRate.SELECT_BASE);//全默认选中正常倍率
			}
			else {
				this.CRequestSelectType(type);
			}
		}

		/**设置产药类型 */
		public setSelectType(selecttype) {
			this._viewUI.selecttype_radio.selectedIndex = selecttype;
		}

		/**关闭界面 */
		public closePharmacyView() {
			this.hide();
			ModuleManager.show(ModuleNames.haveFamily, this._app);
		}

		/**选择产药的倍数 */
		public CRequestSelectType(selecttype) {
			RequesterProtocols._instance.c2s_CRequestSelectType(selecttype);
		}

		/**请求药房信息 */
		public COpenClanMedic() {
			RequesterProtocols._instance.c2s_COpenClanMedic();
		}

		/**购买药房的药品 */
		public CBuyMedic(itemid, itemnum) {
			RequesterProtocols._instance.c2s_CBuyMedic(itemid, itemnum);
		}

		protected onShow(event: Object): void {
			this.show();
		}


		public hide(): void {
			if (this.yaoPinLstSelectedIndex != -1) {
				let _selectYaoPin_btn: Laya.Button = this._viewUI.yaoPin_list.getCell(this.yaoPinLstSelectedIndex).getChildByName("selectYaoPin_btn") as Laya.Button;
				_selectYaoPin_btn.skin = "common/ui/tongyong/huodongdi.png";
				this.yaoPinLstSelectedIndex = -1;
			}
			super.hide();
		}

		public getView(): Sprite {
			return this._viewUI;
		}

	}
}