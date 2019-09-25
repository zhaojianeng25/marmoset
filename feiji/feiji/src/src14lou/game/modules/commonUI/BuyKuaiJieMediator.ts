/**
* 快捷购买
*/
module game.modules.commonUI {
	export class BuyKuaiJieMediator extends game.modules.UiMediator {
		//	public static LOGIN_EVENT:string = "loginEvent";
		private _viewUI: ui.common.component.FastTransactionUI;
		private XiaoJianPanMediator: game.modules.tips.XiaoJianPanMediator;
		private _TipsMessageMediator: game.modules.tips.TipsMessageMediator;
		public jinbiduihuan: commonUI.JinBiBuZuViewMediator;
		public currentitemid: number;
		public currentlimitNum: number = -1;
		public currentprice: number;
		public huobiicon: Array<any> = ["common_yinb.png", "common_jinb.png", "yuanbao.png"];
		public textlab: Array<any> = ["银币", "金币", "元宝"];
		public itemshopid: number;//商品序号
		/** 出售时界面显示的最大值 */
		public maxNum: number;
		public totalNum = "";
		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.component.FastTransactionUI();
			this._viewUI.mouseThrough = true;
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
		}
		public show(sale?: string) {
			super.show();
			if (sale) {//快捷出售
				this.initSaleUI();
			}
			this._viewUI.close_btn.clickHandler = new Laya.Handler(this, this.hide);
			this._viewUI.add_btn.clickHandler = new Laya.Handler(this, this.addcount, [sale]);
			this._viewUI.reduce_btn.clickHandler = new Laya.Handler(this, this.reducecount, [sale]);
			this._viewUI.showXiaojianpan_btn.on(LEvent.CLICK, this, this.ShowXiaoJianpan);
			game.modules.pet.models.PetProxy.getInstance().on(game.modules.pet.models.SHOPPRICE_EVENT, this, this.refreshprice);


		}
		public init(index: number): void {
			this.show();
			if (index >= 1000 && index <= 1142)
				this.itemshopid = 5;
			this.currentitemid = index;
			let cGoodsData: CGoodsBaseVo = ShopModel.getInstance().GoodsBinDic[index] as CGoodsBaseVo;
			if (cGoodsData.limitNum <= 0) {
				this.currentlimitNum = 99;
			} else {
				var goodslimitsBinDic = modules.shop.models.ShopModel._instance.goodslimitsBinDic.get(index);
				this.currentlimitNum = cGoodsData.limitNum - goodslimitsBinDic;
			}
			let item: ItemAttrBaseVo = BagModel.getInstance().itemAttrData[cGoodsData.itemId] as ItemAttrBaseVo;
			this._viewUI.itemBuyName_lab.changeText(item.name);
			this._viewUI.itemBuyEffect_lab.changeText(item.effectdes);
			this._viewUI.number_lab.text = 1 + "";
			this._viewUI.itemBuyIcon_img.skin = "common/icon/item/" + item.icon + ".png";
			this.currentprice = cGoodsData.prices[0];
			this._viewUI.huobiicon_img.skin = "common/ui/tongyong/" + this.huobiicon[cGoodsData.currencys[0] - 1];
			this._viewUI.huobiicon_img1.skin = "common/ui/tongyong/" + this.huobiicon[cGoodsData.currencys[0] - 1];
			this._viewUI.text_lab.text = "我的" + this.textlab[cGoodsData.currencys[0] - 1];
			this._viewUI.totalPrice_lab.text = this.currentprice + "";
			this._viewUI.buyTips_lab.changeText("身上的" + item.name + "不足，你可以快捷购买");
			this._viewUI.transaction_btn.clickHandler = new Laya.Handler(this, this.buyitem, [cGoodsData.currencys[0]]);
			this._viewUI.sale_box.visible = false;
			this._viewUI.buy_box.visible = true;
			if (cGoodsData.currencys[0] - 1 == 0) {//使用银币
				if (HudModel.getInstance().sliverNum != null) {
					this._viewUI.haveMoney_lab.text = HudModel.getInstance().sliverNum + "";
				}
				else {
					this._viewUI.haveMoney_lab.text = 0 + "";
				}
			} else if (cGoodsData.currencys[0] == 3) {
				//使用符石
				this._viewUI.haveMoney_lab.text = HudModel.getInstance().fuShiNum.toString();
			}
			else {
				if (HudModel.getInstance().goldNum != null) {
					this._viewUI.haveMoney_lab.text = HudModel.getInstance().goldNum + "";
				}
				else {
					this._viewUI.haveMoney_lab.text = 0 + "";
				}
			}
		}
		public buyitem(currencys): void {
			// models.PetProxy.getInstance().event(models.BUYPETFEED_EVENT);
			//刷新物品数量并关闭购买窗口
			if (parseInt(this._viewUI.totalPrice_lab.text) <= parseInt(this._viewUI.haveMoney_lab.text)) {
				if (this.itemshopid == 5) {
					RequesterProtocols._instance.c2s_chamber_ofcommerceshop(this.itemshopid, 0, this.currentitemid, parseInt(this._viewUI.number_lab.text), 4)
				}
				else {
					RequesterProtocols._instance.c2s_buy_mallshop(this.itemshopid, 0, this.currentitemid, parseInt(this._viewUI.number_lab.text));
				}

				super.hide();
			}
			else {
				if (currencys - 1 == 0) {  //银币
					console.log("--------------显示银币")
					var totalPrice = parseInt(this._viewUI.totalPrice_lab.text);
					var haveMoney = parseInt(this._viewUI.haveMoney_lab.text);
					this.jinbiduihuan = new commonUI.JinBiBuZuViewMediator(this._viewUI, this._app);
					var yinbi = totalPrice - haveMoney;
					var yuanbao = yinbi / 10000;
					var jinbi = yinbi / 100;
					if (yuanbao > parseInt(yuanbao.toFixed(0))) {
						yuanbao = parseInt(yuanbao.toFixed(0)) + 1;
					}
					else {
						yuanbao = parseInt(yuanbao.toFixed(0));
					}
					if (jinbi > parseInt(jinbi.toFixed(0))) {
						jinbi = parseInt(jinbi.toFixed(0)) + 1;
					}
					else {
						jinbi = parseInt(jinbi.toFixed(0));
					}
					this.jinbiduihuan.onShow(false, yinbi + "", yuanbao + "", jinbi + "");
					this.jinbiduihuan.once(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.goCharge, [yuanbao]);
					this.jinbiduihuan.once(commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.buySliverFromYuanBao, [yuanbao]);
					this.jinbiduihuan.once(commonUI.USE_GOLD_EXCHANGE_EVENT, this, this.hide);


				} else if (currencys == 3) {
					this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
					this._TipsMessageMediator.show();
					var param: Dictionary = new Dictionary();
					param.set("contentId", 150506);
					this._TipsMessageMediator.showContent(param);
					game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);

				}
			}

		}

		/**仙晶兑换 */
		public goCharge(yuanbao) {
			console.log("_------------仙晶不足，前往充值 需要的元宝:", yuanbao);
			var yuanbaoIcon = game.modules.bag.models.BagModel._instance.yuanbaoIcon;
			if (yuanbaoIcon < yuanbao) {
				this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
				this._TipsMessageMediator.show();
				var param: Dictionary = new Dictionary();
				param.set("contentId", 150506);
				this._TipsMessageMediator.showContent(param);
				game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
			} else {
				RequesterProtocols._instance.c2s_exchange_currency(3, 2, yuanbao);
				this.hide();
			}


		}

		/**通过元宝购买物品 */
		public buySliverFromYuanBao(yuanbao) {
			var yuanbaoIcon = game.modules.bag.models.BagModel._instance.yuanbaoIcon;
			if (yuanbaoIcon < yuanbao) {
				this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
				this._TipsMessageMediator.show();
				var param: Dictionary = new Dictionary();
				param.set("contentId", 150506);
				this._TipsMessageMediator.showContent(param);
				game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
			} else {
				RequesterProtocols._instance.c2s_exchange_currency(3, 1, yuanbao);
				this.hide();
			}

		}

		public goRecharge() {
			ModuleManager.jumpPage(ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
			game.modules.shop.models.ShopProxy._instance.event(game.modules.shop.models.Go_Charge);   //前往充值界面。关闭当前界面
			this.hide();
		}

		public refreshprice(e: any): void {
			// console.log("价格："+PetModel._instance.shopinfo);

			for (var index = 0; index < PetModel._instance.shopinfo.length; index++) {
				// console.log("价格：+"+PetModel._instance.shopinfo[0]);				
				let goods: game.modules.pet.models.GoodsVo = PetModel._instance.shopinfo[index] as game.modules.pet.models.GoodsVo;
				if (goods.goodsid == this.currentitemid) {
					this._viewUI.totalPrice_lab.text = goods.price + "";
					this.currentprice = goods.price;

					break;
				}
			}
		}
		public hide(): void {
			game.modules.tips.models.TipsProxy.getInstance().off(game.modules.tips.models.ON_KRYBOARD, this, this.getNumber);
			super.hide();
		}

		public getView(): Sprite {
			return this._viewUI;
		}

		public addcount(sale?: string): void {
			var num: number = parseInt(this._viewUI.number_lab.text);
			if (!sale) {/** 购买 */
				let cGoodsData: CGoodsBaseVo = ShopModel.getInstance().GoodsBinDic[this.currentitemid] as CGoodsBaseVo;
				if (cGoodsData.limitType == 0 || num < cGoodsData.limitNum) {
					num = num + 1
					if (num > this.currentlimitNum) {
						let promoto = HudModel.getInstance().promptAssembleBack(PromptExplain.UPLIMIT_SH);
						let disappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
						disappearMessageTipsMediator.onShow(promoto);
						return;
					}
					this._viewUI.number_lab.changeText(num + "");
					this._viewUI.totalPrice_lab.text = this.currentprice * num + "";
				}
			} else {/** 出售 */
				if (num < this.maxNum) {/** 小于创库存在的最大值才做操作 */
					this._viewUI.number_lab.changeText(num + 1 + "");
					num = num + 1;
					this._viewUI.totalPrice_lab.text = this.currentprice * num + "";
				}

			}


		}
		public reducecount(sale?: string): void {
			var num: number = parseInt(this._viewUI.number_lab.text);
			if (!sale) {/** 购买 */
				if (num > 1) {
					num = num - 1
					this._viewUI.number_lab.changeText(num + "");
					this._viewUI.totalPrice_lab.text = this.currentprice * num + "";
				}
			} else {/** 出售 */

				if (num > 1) {
					this._viewUI.number_lab.changeText(num - 1 + "");
					num = num - 1;
					this._viewUI.totalPrice_lab.text = this.currentprice * num + "";
				}
			}

		}
		/** 初始化出售界面的UI */
		private initSaleUI(): void {
			this._viewUI.fastTransaction_lab.text = "快捷出售";
			this._viewUI.buy_box.visible = false;
			this._viewUI.sale_box.visible = true;

		}
		/** 初始化出售界面的数据 */
		public initSaleData(itemId: number, itemNum: number, shopId: number, key: number): void {
			let itemcishu = ShopModel.getInstance().goodsSaleLimit.get(shopId);
			if (itemcishu == null) RequesterProtocols._instance.c2s_query_limit(2, [shopId]);
			this.itemshopid = shopId;
			this._viewUI.transaction_btn.clickHandler = new Laya.Handler(this, this.onSeleItem, [itemId, shopId, key]);
			let item = BagModel.getInstance().getItemAttrData(itemId);
			this._viewUI.itemSaleEffect_lab.changeText("功能:" + item.effectdes);
			this._viewUI.itemSaleName_lab.changeText(item.name);
			this._viewUI.itemSaleIcon_img.skin = "common/icon/item/" + item.icon + ".png";
			this._viewUI.transaction_btn.label = "出售";
			let saleLab = "出售数量";
			//匹配一下Id，读出对应的价格
			let Goods: pet.models.GoodsVo = bagModel.getInstance().getGoods.get(shopId);
			let price;
			if (Goods == null) {
				let data: CGoodsBaseVo = ShopModel.getInstance().GoodsBinDic[shopId];
				price = data.prices[0];
			} else
				price = Goods.price;
			if (typeof (price) != "undefined") {
				price = SELLING_RATIO * price;
			}
			this.currentprice = parseInt(price.toString());
			this._viewUI.itemEquality_img.skin = game.modules.bag.BagSystemModule.getGameItemFrameColorResource(item.nquality);
			this._viewUI.totalPrice_lab.changeText(this.currentprice.toString());
			this._viewUI.haveMoney_lab.changeText(HudModel.getInstance().sliverNum.toString());
			this._viewUI.itemSaleDetails_html.innerHTML = "<span style='font:25px ;color:#99ff99; SimHei'>" + item.destribe + "</span>";
			this.maxNum = itemNum;
			this._viewUI.transactionNumber_lab.changeText(saleLab);
			this._viewUI.number_lab.changeText("1");
			this._viewUI.huobiicon_img.skin = "common/ui/tongyong/" + this.huobiicon[0];
			this._viewUI.huobiicon_img1.skin = "common/ui/tongyong/" + this.huobiicon[0];
		}
		/** 快捷出售点击 */
		private onSeleItem(item: number, shopId: number, key: number): void {
			let selectNum: number = parseInt(this._viewUI.number_lab.text);
			let itemcishu = ShopModel.getInstance().goodsSaleLimit.get(shopId);				// 商会已出售的次数
			let baoshibiao = ShopModel.getInstance().GoodsBinDic[shopId].limitSaleNum;		// 物品只能出售的次数
			if (selectNum > baoshibiao) return;		// 如果输入框里面的值大于能出售的次数 return
			if (itemcishu >= baoshibiao) {
				let promptarr: Array<number> = [baoshibiao];
				let prompt = HudModel.getInstance().promptAssembleBack(150505, promptarr);
				let disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
				disappearMsgTips.onShow(prompt);
			} else {
				RequesterProtocols._instance.c2s_chamber_ofcommerceshop(5, key, shopId, selectNum, 5);
			}
			this.hide();
		}
		/**显示小键盘 */
		private ShowXiaoJianpan() {
			this.XiaoJianPanMediator = new game.modules.tips.XiaoJianPanMediator(this._viewUI);
			this.totalNum = "";
			this.XiaoJianPanMediator.onShow(200, 520);
			/** 每次打开小键盘判断剩余出售数量 */

			let itemcishu = ShopModel.getInstance().goodsSaleLimit.get(this.itemshopid);
			if (itemcishu)			// 商会已出售的次数
			{
				let limitSaleNum;
				let GoodsBinDic = ShopModel.getInstance().GoodsBinDic[this.itemshopid];	// 物品只能出售的次数
				if (GoodsBinDic) limitSaleNum = ShopModel.getInstance().GoodsBinDic[this.itemshopid].limitSaleNum;
				this.currentlimitNum = Math.abs(limitSaleNum - itemcishu);
			}
			game.modules.tips.models.TipsProxy.getInstance().on(game.modules.tips.models.ON_KRYBOARD, this, this.getNumber);
		}

		/** 点击键盘数字*/
		public getNumber(num) {
			if (num == -2) {  //点击了ok
				if (this.totalNum == "" || this.totalNum.charAt(0) == "0") {
					this.totalNum = "1";
				}
				// if(parseInt(this.totalNum) > this.currentlimitNum){
				// 	label.text = this.currentlimitNum + "";
				// 	this.totalNum = this.currentlimitNum + "";
				// }
			}
			if (num == -1) {  //点击了删除
				this.totalNum = this.totalNum.substring(0, this.totalNum.length - 1);
				if (this.totalNum.length <= 0) {
					this.totalNum = "0";
				}
			}
			var label = this._viewUI.number_lab;

			if (num >= 0) {
				if (this.totalNum == "") this.totalNum = "0";
				var oneChar = this.totalNum.charAt(0);
				if (oneChar != '0') {
					this.totalNum += num;
				} else if (oneChar == '0') {
					this.totalNum = num;
				}
			}
			if (this.currentlimitNum && this.currentlimitNum != -1) {
				if (parseInt(this.totalNum) <= this.currentlimitNum) {
					label.text = "";
					label.text = this.totalNum == "0" ? "1" : this.totalNum;
				} else {
					label.text = this.currentlimitNum + "";
					this.totalNum = this.currentlimitNum + "";
					let prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.INPUT_MAX_LIMIT);
					let disappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
					disappearMessageTipsMediator.onShow(prompt);
					// this.totalNum = this.totalNum.substring(0, this.totalNum.length - 1);
					this._viewUI.totalPrice_lab.text = this.currentprice * parseInt(this._viewUI.number_lab.text) + "";
					return;
				}
			} else {
				if (parseInt(this.totalNum) > this.maxNum) {
					let prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.INPUT_MAX_LIMIT);
					let disappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
					disappearMessageTipsMediator.onShow(prompt);
					this.totalNum = this.totalNum.substring(0, this.totalNum.length - 1);
					return;
				}
				label.text = this.totalNum;
				if (label.text == "0") label.text = "1";
				// this.totalNum = this.currentlimitNum + "";
			}

			this._viewUI.totalPrice_lab.text = this.currentprice * parseInt(this._viewUI.number_lab.text) + "";
		}
	}
}