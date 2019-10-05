
module game.modules.roleinfo {
	/**
 	* 酒馆、武器铺、药品商店复合
 	*/
	export class RoleShopMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.RoleShopUI;
		/**小键盘界面 */
		private _XiaoJianPanMediator: tips.XiaoJianPanMediator;
		/**飘窗提示 */
		private tips: game.modules.commonUI.DisappearMessageTipsMediator;
		/**银币不足界面 */
		private _JinBiBuZuViewMediator: commonUI.JinBiBuZuViewMediator;
		/** 页面提示*/
		private _TipsMessageMediator: game.modules.tips.TipsMessageMediator;
		/**商品名  */
		private nameArr: Array<any>;
		/**商品图片 */
		private imageArr: Array<any>;
		/**NPCMT3买卖物品表 */
		private CNpcSaleObj: Object;
		/**sMT3商品表 */
		private CGoodsObj: Object;
		/**d道具表-复合 */
		private CItemAttrObj: Object;
		/**商品id */
		private goodsIdArr: Array<number>;
		/**道具id */
		private itemIdArr: Array<number>;
		/**道具价格 */
		private moneyArr: Array<any>;
		/**当前选择列表项下标 */
		private selectNum: number = 0;
		/**购买数量字典key:物品在列表中的下标,value:购买数量 */
		private buyNumDic: Dictionary;
		/**小键盘字典key:药品商店,value:购买数量*/
		private keyNumDic: Dictionary;
		/**当前页面是否打开 */
		private key: boolean;
		/** 商店类型 */
		private shoptype: number;
		/** 目标id */
		private targetId: number;
		/** 目标所处列表的位置 */
		private targetPos: number;
		/** 物品信息弹窗 */
		private _tipsModule: game.modules.tips.tipsModule;

		/**
 		* 酒馆、武器铺、药品商店复合
 		*/
		constructor(app: AppBase, shoptype?: number) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.RoleShopUI();
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this.isCenter = true;
			this._app = app;
			this._XiaoJianPanMediator = new tips.XiaoJianPanMediator(this._viewUI);
			this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
			this._JinBiBuZuViewMediator = new commonUI.JinBiBuZuViewMediator(this._viewUI, this._app);
			if (shoptype) {
				this.shoptype = shoptype;
			}
			this.initialize();
			this.registerEvent();
			this.init();
		}
		/**事件监听 */
		public eventListener(): void {
			mainhud.models.HudProxy.getInstance().on(mainhud.models.SRefreshCurrency_EVENT, this, this.onRefreshCurrency);
			tips.models.TipsProxy.getInstance().on(tips.models.ON_KRYBOARD, this, this.onKeyboard);
		}
		/**初始化 */
		public initialize(): void {
			this.nameArr = new Array<any>();
			this.imageArr = new Array<any>();
			this.goodsIdArr = new Array<number>();
			this.itemIdArr = new Array<number>();
			this.moneyArr = new Array<any>();
			this.buyNumDic = new Dictionary();
			this.keyNumDic = new Dictionary();
		}
		/**注册点击监听 */
		public registerEvent(): void {
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
			this._viewUI.buy_btn.on(LEvent.MOUSE_DOWN, this, this.buy);
			this._viewUI.jia_btn.on(LEvent.MOUSE_DOWN, this, this.jia);
			this._viewUI.jian_btn.on(LEvent.MOUSE_DOWN, this, this.jian);
			this._viewUI.haveNum_lab.on(LEvent.MOUSE_DOWN, this, this.xiaojianPan);
		}
		/**
		 * 其它地方显示该界面
		 * @param id 要显示目标的id
		 */
		public onShow(id?: number): void {
			if (id) {
				this.targetId = id;
			}
			this.show();
			// this.showTargetInShopPos();
		}
		/**
		 * 显示出物品在商店里的位置
		 */
		private showTargetInShopPos(): void {
			if (this.targetPos) {
				this._viewUI.wupin_list.scrollTo(this.targetPos);
				this.clickItem(this.targetPos);
			}
		}
		public show(): void {
			super.show();
			this.key = true;
			this.getListData();
			var num = this.targetPos ? this.targetPos : 0;
			this.clickItem(num);
			this.eventListener();
		}
		/**打开小键盘 */
		public xiaojianPan(e: LEvent): void {
			var xPos = e.currentTarget.mouseX + 130;
			var yPos = e.currentTarget.mouseY + 800;
			this._XiaoJianPanMediator.onShow(xPos, yPos);
		}
		/**接收小键盘输入 */
		public onKeyboard(num): void {
			if (this.key) {
				if (num != -2) {
					//点击清除按钮
					if (num == -1) {
						var yinbiTet: Laya.Label = this._viewUI.wupin_list.getCell(this.selectNum).getChildByName("wupin_btn").getChildByName("yinbiNum_lab") as Laya.Label;
						var str = this.keyNumDic.get(RoleEnum.DRUG_SHOP);
						//判断小键盘输入字符串长度
						if (str.length == 1) {
							str = (num + 2).toString();
							this.keyNumDic.set(RoleEnum.DRUG_SHOP, "");
						} else if (str.length == 2) {
							str = str.substring(0, str.length - 1);
							this.keyNumDic.set(RoleEnum.DRUG_SHOP, str);
						} else
							return;
						this._viewUI.cost_lab.text = (parseInt(yinbiTet.text) * parseInt(str)).toString();
						this._viewUI.haveNum_lab.text = str;
						this.buyNumDic.set(this.selectNum, parseInt(str));
					} else {
						var yinbiTet: Laya.Label = this._viewUI.wupin_list.getCell(this.selectNum).getChildByName("wupin_btn").getChildByName("yinbiNum_lab") as Laya.Label;
						var str = this.keyNumDic.get(RoleEnum.DRUG_SHOP);
						if (str.length < 2) {
							//第一个输入的数字不能为0
							if (num == 0 && str.length == 0)
								return;
							str += num.toString();
							this.keyNumDic.set(RoleEnum.DRUG_SHOP, str);
						} else if (str.length == 2) {
							str = RoleEnum.MAXINPUT_VALUE.toString();
							this.keyNumDic.set(RoleEnum.DRUG_SHOP, str);
							let prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.INPUT_MAX_LIMIT);
							this.tips.onShow(prompt);
						}
						this._viewUI.cost_lab.text = (parseInt(yinbiTet.text) * parseInt(str)).toString();
						this._viewUI.haveNum_lab.text = str;
						this.buyNumDic.set(this.selectNum, parseInt(str));
					}
				} else {
					//关闭小键盘，清空记录
					this.keyNumDic.set(RoleEnum.DRUG_SHOP, "");
				}
			}
		}
		/**购买*/
		public buy(): void {
			//如果银币不够
			var needMoney = parseInt(this._viewUI.cost_lab.text);
			if (needMoney > HudModel.getInstance().sliverNum) {
				/** 需要兑换的银币 */
				var duihuanMoney = needMoney - HudModel.getInstance().sliverNum;
				/** 兑换所需的仙晶 */
				var _needFuShi: number;
				if ((Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI) - HudModel.getInstance().fuShiNum) <= 0) {
					_needFuShi = Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI);
				}
				else {
					_needFuShi = (Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI) - HudModel.getInstance().fuShiNum);
				}
				/** 兑换所需的金币 */
				var _needGold: number;
				if ((Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI) - HudModel.getInstance().goldNum) <= 0) {
					_needGold = Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI);
				}
				else {
					_needGold = (Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI) - HudModel.getInstance().goldNum);
				}
				this._JinBiBuZuViewMediator.onShow(false, duihuanMoney.toString(), _needFuShi.toString(), _needGold.toString());
				this._JinBiBuZuViewMediator.once(commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.buySliverFromYuanBao, [_needFuShi]);
				this._JinBiBuZuViewMediator.once(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.goCharge, [_needFuShi]);
				this._JinBiBuZuViewMediator.once(commonUI.USE_GOLD_EXCHANGE_EVENT, this, this.jinbiDuihuan);
			} else
				/**
				 * 酒馆购买协议
				 * 商店序号
				 * 商品id
				 * 买卖数量
				 * 购买类型
				 */
				RequesterProtocols._instance.c2s_exchange_shop(this.shoptype, this.goodsIdArr[this.selectNum], this.buyNumDic.get(this.selectNum), RoleEnum.BUY_TYPE);
		}
		/**金币兑换银币成功 */
		public jinbiDuihuan() {
			//金币数量足够兑换银币，直接购买
			RequesterProtocols._instance.c2s_exchange_shop(this.shoptype, this.goodsIdArr[this.selectNum], this.buyNumDic.get(this.selectNum), RoleEnum.BUY_TYPE);//商店购买协议
		}
		/**仙晶兑换 */
		public goCharge(yuanbao) {
			var fuShiNum = HudModel.getInstance().fuShiNum;
			if (fuShiNum < yuanbao) {
				this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
				this._TipsMessageMediator.show();
				var param: Dictionary = new Dictionary();
				param.set("contentId", RoleEnum.XIANJIN_TIP);
				this._TipsMessageMediator.showContent(param);
				game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
			} else {
				RequesterProtocols._instance.c2s_exchange_currency(3, 2, yuanbao);
			}
		}
		/**通过元宝购买物品 */
		public buySliverFromYuanBao(yuanbao) {
			var fuShiNum = HudModel.getInstance().fuShiNum;
			if (fuShiNum < yuanbao) {
				this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
				this._TipsMessageMediator.show();
				var param: Dictionary = new Dictionary();
				param.set("contentId", RoleEnum.XIANJIN_TIP);
				this._TipsMessageMediator.showContent(param);
				game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
			} else {
				RequesterProtocols._instance.c2s_exchange_currency(3, 1, yuanbao);
				//元宝数量足够兑换银币，直接购买
				RequesterProtocols._instance.c2s_exchange_shop(this.shoptype, this.goodsIdArr[this.selectNum], this.buyNumDic.get(this.selectNum), RoleEnum.BUY_TYPE);//商店购买协议
			}

		}
		/**充值 */
		public goRecharge() {
			ModuleManager.jumpPage(ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
			game.modules.shop.models.ShopProxy._instance.event(game.modules.shop.models.Go_Charge);   //前往充值界面。关闭当前界
		}

		/**刷新银币 */
		public onRefreshCurrency(e: any): void {
			this._viewUI.moneyNum_lab.text = HudModel.getInstance().sliverNum.toString();//银币
		}
		/**初始化数据 */
		public init(): void {
			this.CNpcSaleObj = RoleInfoModel.getInstance().CNpcSaleBinDic;
			this.CGoodsObj = ShopModel.getInstance().GoodsBinDic;
			this.CItemAttrObj = BagModel.getInstance().itemAttrData;
			this.goodsIdArr.length = 0;
			this.itemIdArr.length = 0;
			this.moneyArr.length = 0;
			this.imageArr.length = 0;
			this.nameArr.length = 0;
			if (this.shoptype) {//如果商店类型有值，说明是通过NPC打开该界面
				if (this.shoptype == shopType.WEAPON_SHOP) {//是兵器铺的类型
					for (var i: number = 0; i < this.CNpcSaleObj[shopType.WEAPON_SHOP]["goodsids"].length; i++) {
						this.goodsIdArr.push(this.CNpcSaleObj[shopType.WEAPON_SHOP]["goodsids"][i]);//获取兵器铺的商品信息
					}
					this._viewUI.title_lab.text = "兵器铺";
				}
				else if (this.shoptype == shopType.BAR_SHOP) {//是酒馆的类型
					for (var i: number = 0; i < this.CNpcSaleObj[shopType.BAR_SHOP]["goodsids"].length; i++) {
						this.goodsIdArr.push(this.CNpcSaleObj[shopType.BAR_SHOP]["goodsids"][i]);//获取酒馆的商品信息
					}
					this._viewUI.title_lab.text = "酒馆老板";
				}
				else if (this.shoptype == shopType.DRUG_SHOP) {//是药品商店类型
					for (var i: number = 0; i < this.CNpcSaleObj[shopType.DRUG_SHOP]["goodsids"].length; i++) {
						this.goodsIdArr.push(this.CNpcSaleObj[shopType.DRUG_SHOP]["goodsids"][i]);//获取药品商店的商品信息
					}
					this._viewUI.title_lab.text = "药品商店";
				}
			}
			else {//没有则是通过人物属性界面打开该界面
				for (var i: number = 0; i < this.CNpcSaleObj[shopType.BAR_SHOP]["goodsids"].length; i++) {
					this.goodsIdArr.push(this.CNpcSaleObj[shopType.BAR_SHOP]["goodsids"][i]);//获取酒馆的商品信息
				}
				this.shoptype = shopType.BAR_SHOP;//并且给上商店类型
				this._viewUI.title_lab.text = "酒馆老板";
			}
			for (var i: number = 0; i < this.goodsIdArr.length; i++) {
				this.itemIdArr.push(this.CGoodsObj[this.goodsIdArr[i]]["itemId"]);
			}

			//初始化商店物品兑换价格
			for (var i: number = 0; i < this.goodsIdArr.length; i++) {
				var data: any = {};
				data[i] = { Label: this.CGoodsObj[this.goodsIdArr[i]]["prices"][0] };
				this.moneyArr.push(data[i]);
			}

			//初始化商店物品名称
			for (var i: number = 0; i < this.itemIdArr.length; i++) {
				var data: any = {};
				data[i] = { Label: this.CItemAttrObj[this.itemIdArr[i]]["name"] };
				this.nameArr.push(data[i]);
				this.imageArr.push({ img: "common/icon/item/" + this.CItemAttrObj[this.itemIdArr[i]]["icon"] + ".png" });
			}
			//初始化物品购买数量
			for (var i: number = 0; i < this.nameArr.length; i++) {
				this.buyNumDic.set(i, 0);
			}
			//初始化小键盘map
			this.keyNumDic.set(RoleEnum.DRUG_SHOP, "");
			this.getListData();
			this._viewUI.moneyNum_lab.text = HudModel.getInstance().sliverNum.toString();//银币	
		}
		/**初始化物品列表 */
		public getListData(): void {
			this._viewUI.wupin_list.vScrollBarSkin = "";
			this._viewUI.wupin_list.scrollBar.elasticBackTime = 200;
			this._viewUI.wupin_list.scrollBar.elasticDistance = 50;
			this._viewUI.wupin_list.array = this.nameArr;
			this._viewUI.wupin_list.renderHandler = new Handler(this, this.onRender);
			this._viewUI.wupin_list.selectHandler = new Handler(this, this.clickItem);
			this._viewUI.wupin_list.selectedIndex = -1;
		}
		/**渲染物品列表 */
		public onRender(cell: Laya.Box, index: number): void {
			if (index > this.nameArr.length) return;
			var nameLab: Laya.Label = cell.getChildByName("wupin_btn").getChildByName("name_lab") as Laya.Label;
			var itemImg: Laya.Image = cell.getChildByName("wupin_btn").getChildByName("item_img") as Laya.Image;
			var yinbiTet: Laya.Label = cell.getChildByName("wupin_btn").getChildByName("yinbiNum_lab") as Laya.Label;
			var xuqiu: Laya.Image = cell.getChildByName("wupin_btn").getChildByName("shopxuqiu_img") as Laya.Image;
			var wupinBtn: Laya.Button = cell.getChildByName("wupin_btn") as Laya.Button;
			var tipsBtn: Laya.Button = cell.getChildByName("tips_btn") as Laya.Button;
			tipsBtn.on(LEvent.CLICK, this, this.getItemTips, [index]);
			//渲染除选中按钮外，列表其他按钮的颜色
			if (index != this.selectNum) {
				wupinBtn.skin = "common/ui/tongyong/common_list_textbg.png";
			}
			nameLab.changeText(this.nameArr[index].Label);
			itemImg.skin = this.imageArr[index].img;
			yinbiTet.changeText(this.moneyArr[index].Label);
			if (this.itemIdArr[index] == this.targetId) {
			// 	xuqiu.skin = "common/ui/shopui/shop_xuqiu.png"
				this.targetPos = index;
			// 	//获取默认被选中的按钮
			// 	var wupinBtn_default: Laya.Button = this._viewUI.wupin_list.getCell(this.selectNum).getChildByName("wupin_btn") as Laya.Button;
			// 	//更换其按钮图片
			// 	wupinBtn_default.skin = "common/ui/tongyong/common_list_textbg.png";
			// 	//当前这个目标按钮背景图为选中的背景图
			// 	wupinBtn.skin = "common/ui/tongyong/common_list_textbg2.png";
			}
			else {
				xuqiu.skin = "";
			}
		}
		/**处理物品列表点击 */
		public clickItem(index: number): void {
			if (index != -1) {
				this.selectNum = index;
				var yinbiTet: Laya.Label = this._viewUI.wupin_list.getCell(this.selectNum).getChildByName("wupin_btn").getChildByName("yinbiNum_lab") as Laya.Label;
				var wupinBtn: Laya.Button = this._viewUI.wupin_list.getCell(this.selectNum).getChildByName("wupin_btn") as Laya.Button;
				//点击更换按钮图片
				wupinBtn.skin = "common/ui/tongyong/common_list_textbg2.png";
				//初始化每个物品的购买数量
				var tempNum = this.buyNumDic.get(this.selectNum);
				//如果没有超过最大值
				if (RoleEnum.MAXINPUT_VALUE > tempNum) {
					tempNum++;
					this.buyNumDic.set(index, tempNum);
					for (var i: number = 0; i < this.nameArr.length; i++) {
						if (i != this.selectNum)
							this.buyNumDic.set(i, 0);
					}
					this._viewUI.cost_lab.text = (parseInt(yinbiTet.text) * tempNum).toString();
					this._viewUI.haveNum_lab.text = tempNum.toString();
				}
				this._viewUI.wupin_list.selectedIndex = -1;
			}
		}
		public getItemTips(index: number) {
			var ypos = index <= 0 ? 100 : Math.ceil(this._viewUI.bg_img.mouseY);
			var parame: Dictionary = new Dictionary();
			parame.set("itemId", this.itemIdArr[index]);
			parame.set("xpos", 250);
			parame.set("ypos", ypos);
			this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
		}
		/**增加按钮 */
		public jia(): void {
			var yinbiTet: Laya.Label = this._viewUI.wupin_list.getCell(this.selectNum).getChildByName("wupin_btn").getChildByName("yinbiNum_lab") as Laya.Label;
			var tempNum = this.buyNumDic.get(this.selectNum);
			//如果没有超过最大值
			if (RoleEnum.MAXINPUT_VALUE > tempNum) {
				tempNum++;
				this.buyNumDic.set(this.selectNum, tempNum);
				for (var i: number = 0; i < this.nameArr.length; i++) {
					if (i != this.selectNum)
						this.buyNumDic.set(i, 0);
				}
				this._viewUI.cost_lab.text = (parseInt(yinbiTet.text) * tempNum).toString();
				this._viewUI.haveNum_lab.text = tempNum.toString();
			}

		}
		/**减少按钮 */
		public jian(): void {
			var tempNum = this.buyNumDic.get(this.selectNum);
			if (tempNum > 1) {
				var yinbiTet: Laya.Label = this._viewUI.wupin_list.getCell(this.selectNum).getChildByName("wupin_btn").getChildByName("yinbiNum_lab") as Laya.Label;
				tempNum--;
				this.buyNumDic.set(this.selectNum, tempNum);
				for (var i: number = 0; i < this.nameArr.length; i++) {
					if (i != this.selectNum)
						this.buyNumDic.set(i, 0);
				}
				this._viewUI.cost_lab.text = (parseInt(yinbiTet.text) * tempNum).toString();
				this._viewUI.haveNum_lab.text = tempNum.toString();
			}
		}
		public hide(): void {
			tips.models.TipsProxy.getInstance().off(tips.models.ON_KRYBOARD, this, this.onKeyboard);
			this.key = false;
			super.hide();
			models.RoleInfoModel.getInstance().currentKey = RoleEnum.XINXI_KEY;
			if (this.shoptype) {//如果是通过NPC打开该界面，则不做任何操作

			}
			else {//如果是从查看人物信息购买生命存储或者法力存储跳到该界面，关闭后重新打开人物属性界面
				ModuleManager.show(ModuleNames.ROLE_Info, this._app);
			}
			//初始化物品购买数量
			for (var i: number = 0; i < this.nameArr.length; i++) {
				this.buyNumDic.set(i, 0);
			}
			//通知主界面关闭蒙版
			mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
		}

		public getView(): Sprite {
			return this._viewUI;
		}
	}
}