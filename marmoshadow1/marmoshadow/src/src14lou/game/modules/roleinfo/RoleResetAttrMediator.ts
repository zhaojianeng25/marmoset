
import RoleInfoModel = game.modules.roleinfo.models.RoleInfoModel;
module game.modules.roleinfo {
	/**洗点道具商城id */
	enum XIDIAN {
		/**回天残卷体 */
		TI = 4013,
		/**回天残卷智 */
		ZHI = 4014,
		/**回天残卷力 */
		LI = 4015,
		/**回天残卷耐 */
		NAI = 4016,
		/**回天残卷敏 */
		MIN = 4017,
		/**回天神书 */
		QUAN = 4046
	}
	/** 人物洗点界面 */
	export class RoleResetAttrMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.RoleResetAttrUI;
		/**快捷购买界面 */
		private _BuyKuaiJieMediator: commonUI.BuyKuaiJieMediator;
		/**洗点道具道具名 */
		private nameArr: Array<any>;
		/**洗点道具道具类型 */
		private typeArr: Array<any>;
		/** 洗点道具效果*/
		private xidianArr: Array<any>;
		/** 特殊道具效果*/
		private specialArr: Array<any>;
		/**当前已分配属性点数 */
		private shuxingNumArr: Array<any>;
		/**洗点道具图片 */
		private imageArr: Array<any>;
		/**洗点道具id */
		private itemIdArr: Array<number>;
		/**洗点道具商城id */
		private shopIdArr: Array<number>;
		/**背包物品 */
		private bagItemArr: Array<any>;
		/**洗点道具数量 */
		private itemNumArr: Array<any>;
		/**x洗点道具配置表 */
		private addObj: Object;
		/**sMT3商品表 */
		private goodsObj: Object;
		/**d道具表-复合 */
		private itemAttrObj: Object;
		/**当前选中列表项下标 */
		private selectNum: number = 0;
		/**人物初始属性*/
		private myData: createrole.models.RoleDetailVo;
		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.RoleResetAttrUI();
			this._BuyKuaiJieMediator = new commonUI.BuyKuaiJieMediator(app);
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this.isCenter = true;
			this._app = app;
			this.initialize();
			this.init();
			this.registerEvent();
			this.eventListener();
		}
		/**注册事件监听 */
		public eventListener(): void {
			models.RoleInfoProxy.getInstance().on(models.SRefreshPointType_EVENT, this, this.onRefreshDian);
			mainhud.models.HudProxy.getInstance().on(mainhud.models.SRefreshRoleData_EVENT, this, this.onRefreshRoleData);
			shop.models.ShopProxy.getInstance().on(shop.models.BUYSUCCESS_EVENT, this, this.onNotifyBuySuccess);
		}
		/**注册点击监听 */
		private registerEvent(): void {
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
			this._viewUI.use_btn.on(LEvent.MOUSE_DOWN, this, this.use);
		}
		/**初始化 */
		public initialize(): void {
			this.bagItemArr = new Array<any>();
			this.itemNumArr = new Array<any>();
			this.itemIdArr = new Array<number>();
			this.imageArr = new Array<any>();
			this.nameArr = new Array<any>();
			this.xidianArr = new Array<any>();
			var tip = tips.models.TipsModel.getInstance().cstringResConfigData;//程序内字符串表
			this.typeArr = [{ Label: tip[RoleEnum.TIZHI].msg }, { Label: tip[RoleEnum.ZHILI].msg }, { Label: tip[RoleEnum.LILIANG].msg }, { Label: tip[RoleEnum.NAILI].msg }, { Label: tip[RoleEnum.MINJIE].msg }, { Label: "" }];
			this.specialArr = [{ Label: "" }, { Label: "" }, { Label: "" }, { Label: "" }, { Label: "" }, { Label: tip[RoleEnum.RESET_ALL].msg }];
			this.addObj = RoleInfoModel.getInstance().addPointResetItemConfigBinDic;
			this.goodsObj = ShopModel.getInstance().GoodsBinDic;
			this.itemAttrObj = BagModel.getInstance().itemAttrData;
			this.shopIdArr = [XIDIAN.TI, XIDIAN.ZHI, XIDIAN.LI, XIDIAN.NAI, XIDIAN.MIN, XIDIAN.QUAN];
			for (var i: number = 0; i < this.shopIdArr.length; i++) {
				this.itemIdArr.push(this.goodsObj[this.shopIdArr[i]]["itemId"]);//洗点道具id
			}
			for (var i: number = 0; i < this.itemIdArr.length; i++) {
				this.nameArr.push({ Label: this.itemAttrObj[this.itemIdArr[i]]["name"] });//洗点道具名
				this.imageArr.push({ img: "common/icon/item/" + this.itemAttrObj[this.itemIdArr[i]]["icon"] + ".png" });//洗点道具图片
			}
			this.xidianArr = [{ Label: this.addObj[this.itemIdArr[0]].tizhi }, { Label: this.addObj[this.itemIdArr[1]].moli }, { Label: this.addObj[this.itemIdArr[2]].liliang }, { Label: this.addObj[this.itemIdArr[3]].naili }, { Label: this.addObj[this.itemIdArr[4]].minjie }, { Label: "" }];
		}
		/**使用物品 */
		public use(): void {
			var currentNumLab: Laya.Label = this._viewUI.juanzhou_list.getCell(this.selectNum).getChildByName("currentNum_lab") as Laya.Label;
			//如果物品数量够
			if (this.initNum(this.itemIdArr[this.selectNum]) > 0) {
				if (currentNumLab.text != ""){//如果不是选中回天神书
					//判断已分配属性点是否大于0
					if (parseInt(currentNumLab.text) > 0)
						RequesterProtocols._instance.c2s_CAppend_Item(this.initPosition(this.itemIdArr[this.selectNum]), 0, this.myData["roleid"]);//使用物品
					else {//如果未分配任何属性点，弹窗飘窗提示
						this.showDisTips();
						return;
					}
				}
				else{//如果是选回天神书
					//先判断是否有属性点点上了
					let totalNum = 0;
					for(let i = 0; i < 5; i ++){
						let currentNumLab: Laya.Label = this._viewUI.juanzhou_list.getCell(i).getChildByName("currentNum_lab") as Laya.Label;
						totalNum += Number(currentNumLab.text);
					}
					if(totalNum != 0){
						RequesterProtocols._instance.c2s_CAppend_Item(this.initPosition(this.itemIdArr[this.selectNum]), 0, this.myData["roleid"]);//使用物品
					}
					else{
						this.showDisTips();
						return;
					}
				}
			} else if (this.initNum(this.itemIdArr[this.selectNum]) == 0)
				this._BuyKuaiJieMediator.init(this.shopIdArr[this.selectNum]);//快捷购买
		}
		/** 显示飘窗提示 */
		private showDisTips(): void {
			let msg = ChatModel.getInstance().chatMessageTips[150109]["msg"];
			let disMsgTips = new commonUI.DisappearMessageTipsMediator(this._app);
			disMsgTips.onShow(msg);
		}
		/**快捷购买成功 */
		public onNotifyBuySuccess(e: any): void {
			this.itemNumArr.length = 0;
			//物品数量
			for (var i: number = 0; i < this.itemIdArr.length; i++) {
				this.itemNumArr.push({ Label: this.initNum(this.itemIdArr[i]) });
			}
			this.getListData();
		}
		/**刷新人物加点后的加点面板数值 */
		public onRefreshDian(e: any): void {
			var data: hanlder.s2c_SRefreshPointType = RoleInfoModel.getInstance().SRefreshPointTypeData.get("data");
			// 已分配点数
			this.shuxingNumArr = [{ Label: data.bfp["cons_save"].get(data.pointscheme) }, { Label: data.bfp["iq_save"].get(data.pointscheme) }, { Label: data.bfp["str_save"].get(data.pointscheme) }, { Label: data.bfp["endu_save"].get(data.pointscheme) }, { Label: data.bfp["agi_save"].get(data.pointscheme) }, { Label: "" }];
			this.itemNumArr.length = 0;
			//物品数量
			for (var i: number = 0; i < this.itemIdArr.length; i++) {
				this.itemNumArr.push({ Label: this.initNum(this.itemIdArr[i]) });
			}
			this._viewUI.qianLI_tet.text = data.point.get(data.pointscheme);//潜力点
			this.getListData();
		}

		/**刷新人物属性 */
		public onRefreshRoleData(e: any): void {
			if (HudModel.getInstance().maxHpNum != 0)
				this._viewUI.hp_lab.text = HudModel.getInstance().maxHpNum.toString();//生命值
			if (HudModel.getInstance().attackNum != 0)
				this._viewUI.damage_lab.text = HudModel.getInstance().attackNum.toString();//物理攻击
			if (HudModel.getInstance().magicDefNum != 0)
				this._viewUI.magicDef_lab.text = HudModel.getInstance().magicDefNum.toString();//法术防御
			if (HudModel.getInstance().speedNum != 0)
				this._viewUI.speed_lab.text = HudModel.getInstance().speedNum.toString();//速度
			if (HudModel.getInstance().maxMpNum != 0)
				this._viewUI.mp_lab.text = HudModel.getInstance().maxMpNum.toString();//魔法值
			if (HudModel.getInstance().magicAttackNum != 0)
				this._viewUI.magicAttack_lab.text = HudModel.getInstance().magicAttackNum.toString();//法术攻击
			if (HudModel.getInstance().defendNum != 0)
				this._viewUI.defend_lab.text = HudModel.getInstance().defendNum.toString();//物理防御
		}
		/**获取道具数量 */
		public initNum(itemid: number): number {
			var bag = game.modules.bag.models.BagModel.getInstance().bagMap;
			this.bagItemArr.length = 0;
			for (var i: number = 0; i < bag[1]["items"].length; i++) {
				this.bagItemArr.push(bag[1]["items"][i]);
			}
			for (var i: number = 0; i < this.bagItemArr.length; i++) {
				if (itemid == this.bagItemArr[i]["id"]) {
					return this.bagItemArr[i]["number"];
				}
			}
			return 0;
		}

		/**获得道具在背包中的key */
		public initPosition(itemid: number): number {

			for (var i: number = 0; i < this.bagItemArr.length; i++) {
				if (itemid == this.bagItemArr[i]["id"]) {
					return this.bagItemArr[i]["key"];
				}
			}
			return 0;
		}
		/**初始化界面数据 */
		public init(): void {
			this.myData = createrole.models.LoginModel.getInstance().roleDetail;
			this._viewUI.hp_lab.text = this.myData.maxhp.toString();//生命值
			this._viewUI.mp_lab.text = this.myData.maxmp.toString();//魔法值
			this._viewUI.damage_lab.text = this.myData.damage.toString();//物理攻击
			this._viewUI.magicAttack_lab.text = this.myData.magicattack.toString();//法术攻击
			this._viewUI.speed_lab.text = this.myData.speed.toString();//速度
			this._viewUI.defend_lab.text = this.myData.defend.toString();//物理防御
			this._viewUI.magicDef_lab.text = this.myData.magicdef.toString();//法术防御
			this._viewUI.qianLI_tet.text = this.myData.point.get(this.myData.pointscheme);//潜力点
			this.shuxingNumArr = [{ Label: this.myData.bfp["cons_save"].get(this.myData.pointscheme) }, { Label: this.myData.bfp["iq_save"].get(this.myData.pointscheme) }, { Label: this.myData.bfp["str_save"].get(this.myData.pointscheme) }, { Label: this.myData.bfp["endu_save"].get(this.myData.pointscheme) }, { Label: this.myData.bfp["agi_save"].get(this.myData.pointscheme) }, { Label: "" }];//初始化已分配点数

		}
		/**如果这些属性在界面打开之前有变化，重新初始化这些属性 */
		public initShuxing(): void {
			if (HudModel.getInstance().maxHpNum != 0)
				this._viewUI.hp_lab.text = HudModel.getInstance().maxHpNum.toString();//生命值
			if (HudModel.getInstance().attackNum != 0)
				this._viewUI.damage_lab.text = HudModel.getInstance().attackNum.toString();//物理攻击
			if (HudModel.getInstance().magicDefNum != 0)
				this._viewUI.magicDef_lab.text = HudModel.getInstance().magicDefNum.toString();//法术防御
			if (HudModel.getInstance().speedNum != 0)
				this._viewUI.speed_lab.text = HudModel.getInstance().speedNum.toString();//速度
			if (HudModel.getInstance().maxMpNum != 0)
				this._viewUI.mp_lab.text = HudModel.getInstance().maxMpNum.toString();//魔法值
			if (HudModel.getInstance().magicAttackNum != 0)
				this._viewUI.magicAttack_lab.text = HudModel.getInstance().magicAttackNum.toString();//法术攻击
			if (HudModel.getInstance().defendNum != 0)
				this._viewUI.defend_lab.text = HudModel.getInstance().defendNum.toString();//物理防御
			var data: hanlder.s2c_SRefreshPointType = models.RoleInfoModel.getInstance().SRefreshPointTypeData.get("data");
			if (data != undefined) {
				// 已分配点数
				this.shuxingNumArr = [{ Label: data.bfp["cons_save"].get(data.pointscheme) }, { Label: data.bfp["iq_save"].get(data.pointscheme) }, { Label: data.bfp["str_save"].get(data.pointscheme) }, { Label: data.bfp["endu_save"].get(data.pointscheme) }, { Label: data.bfp["agi_save"].get(data.pointscheme) }, { Label: "" }];
				this._viewUI.qianLI_tet.text = data.point.get(data.pointscheme);//潜力点
			}
			this.itemNumArr.length = 0;
			//物品数量
			for (var i: number = 0; i < this.itemIdArr.length; i++) {
				this.itemNumArr.push({ Label: this.initNum(this.itemIdArr[i]) });
			}
		}
		/**初始化回天卷轴列表 */
		public getListData(): void {
			this._viewUI.juanzhou_list.vScrollBarSkin = "";
			this._viewUI.juanzhou_list.scrollBar.elasticBackTime = 200;
			this._viewUI.juanzhou_list.scrollBar.elasticDistance = 50;
			this._viewUI.juanzhou_list.repeatY = this.nameArr.length;
			this._viewUI.juanzhou_list.array = this.nameArr;
			this._viewUI.juanzhou_list.renderHandler = new Handler(this, this.onRender);
			this._viewUI.juanzhou_list.selectHandler = new Handler(this, this.onSelect);
			this._viewUI.juanzhou_list.selectedIndex = -1;
		}
		/**处理回天卷轴列表点击 */
		public onSelect(index: number): void {
			if (index != -1) {
				this.selectNum = index;
				var juanzhouBtn: Laya.Button = this._viewUI.juanzhou_list.getCell(this.selectNum).getChildByName("juanzhou_btn") as Laya.Button;
				juanzhouBtn.skin = "common/ui/tongyong/btn1.png";
				this._viewUI.juanzhou_list.selectedIndex = -1;
			}
		}
		/**渲染回天卷轴列表 */
		public onRender(cell: Laya.Box, index: number): void {
			if (index > this.nameArr.length) return;
			var nameLab: Laya.Label = cell.getChildByName("juanzhouName_lab") as Laya.Label;
			var typeLab: Laya.Label = cell.getChildByName("typeName_lab") as Laya.Label;
			var xidianLab: Laya.Label = cell.getChildByName("xidianNum_lab") as Laya.Label;
			var specialLab: Laya.Label = cell.getChildByName("special_lab") as Laya.Label;
			var currentNumLab: Laya.Label = cell.getChildByName("currentNum_lab") as Laya.Label;
			var itemImg: Laya.Image = cell.getChildByName("item_img") as Laya.Image;
			var itemNunLab: Laya.Label = cell.getChildByName("itemNum_lab") as Laya.Label;
			var juanzhouBtn: Laya.Button = cell.getChildByName("juanzhou_btn") as Laya.Button;
			//渲染除选中按钮外，列表其他按钮的颜色
			if (index != this.selectNum) {
				juanzhouBtn.skin = "common/ui/tongyong/btn2.png";
			}
			nameLab.changeText(this.nameArr[index].Label);
			typeLab.changeText(this.typeArr[index].Label);
			xidianLab.changeText(this.xidianArr[index].Label);
			specialLab.changeText(this.specialArr[index].Label);
			currentNumLab.changeText(this.shuxingNumArr[index].Label);
			itemNunLab.changeText(this.itemNumArr[index].Label + "/1");
			itemImg.skin = this.imageArr[index].img;
		}


		public show(): void {
			super.show();
			this.initShuxing();
			this.getListData();
			this.onSelect(0);
		}
		public hide(): void {
			super.hide();
			models.RoleInfoModel.getInstance().currentKey = 3;
			ModuleManager.show(ModuleNames.ROLE_Info, this._app);
		}

		public getView(): Sprite {
			return this._viewUI;
		}
	}
}