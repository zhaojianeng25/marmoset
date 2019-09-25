
module game.modules.sale {
	/** 上架详情界面 */
	export class SaleShelfViewMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.SaleItemShelfUI;
		private _AuctionSell: SaleSellViewMediator;
		private _AuctionGongshi: SaleGongshiViewMediator;
		private XiaoJianPanMediator: game.modules.tips.XiaoJianPanMediator;
		private _tipsModule: game.modules.tips.tipsModule;
		private DisappearMessageTipsMediator: game.modules.commonUI.DisappearMessageTipsMediator;
		private _ItemDetailsTipsMediator: game.modules.tips.ItemDetailsTipsMediator;
		private tipsModule: game.modules.tips.tipsModule;
		/**复合表 */
		itemAttrData = BagModel.getInstance().itemAttrData;
		/**上架物品的摊位费、价格等信息 */
		PriceDic: Dictionary = new Dictionary();
		/**物品的价格 */
		oneMarketUpPice: number;
		/**食品表 */
		foodAndDrugEffectData = SaleModel._instance.foodAndDrugEffectData;
		/**食品公示表 */
		foodAndDrugFormulaData = SaleModel._instance.foodAndDrugFormulaData;
		/**装备的属性和附加属性 */
		equipTips = StrengTheningModel.getInstance().equipTips;
		/**装备附加属性库by skill */
		equipAddattributelibDataBySkill = StrengTheningModel.getInstance().equipAddattributelibDataBySkill;
		/**装备附加属性库 */
		equipAddattributelibData = StrengTheningModel.getInstance().equipAddattributelibData;
		/**属性效果id表 */
		attributeDesConfigData = StrengTheningModel.getInstance().attributeDesConfigData;
		/**客户端信息提示表 */
		chatMessageTips = game.modules.chat.models.ChatModel._instance.chatMessageTips;
		/**程序内字符串表 */
		cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
		/**宠物信息表 */
		petCPetAttrData = game.modules.pet.models.PetModel._instance.petCPetAttrData;
		/**npc造型表 */
		cnpcShapeData = game.modules.createrole.models.LoginModel.getInstance().cnpcShapeInfo;
		/**排序后的一级摆摊配置表 */
		m_cMarketFirstTableData = [];
		/**没有排序的一级摆摊配置表 */
		cMarketFirstTableData = SaleModel._instance.cMarketFirstTableData;
		/**二级摆摊配置表 */
		cMarketSecondTableData = SaleModel._instance.cMarketSecondTableData;
		/**三级摆摊配置表 */
		cMarketThreeTableData = SaleModel._instance.cMarketThreeTableData;
		/**物品推荐价格涨浮 */
		addNum: number = 10;
		/**食品描述 */
		str: string = "";
		/**小键盘输入的总数 */
		public totalNum = "";
		/**物品上架最高价格 */
		currentlimitNum = 999999999;
		/**最高摊位费 */
		boothPriceLimitMax = 100000;
		/**最低摊位费 */
		boothPriceLimitMin = 1000;
		/**其它玩家出售物品列表点击的物品背景 */
		bgBtn: Laya.Box = null;
		/**银币不足界面 */
		private _JinBiBuZuViewMediator: commonUI.JinBiBuZuViewMediator;
		/**弹出类型的tips */
		private _TipsMessageMediator: game.modules.tips.TipsMessageMediator;
		/**物品上架的最高数量 */
		itemMaxNum: number = 0;
		/**是装备还是物品在new小键盘 */
		isitemequip: number = -1;

		constructor(uiLayer: Sprite, app: AppBase) {
			super(uiLayer);
			this._viewUI = new ui.common.SaleItemShelfUI();
			this.isCenter = false;
			this._app = app;
			this._viewUI.saleTips_box.visible = false;
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
			this._viewUI.boothTips_btn.on(LEvent.MOUSE_DOWN, this, this.onBoothTipsBtn);
			this._JinBiBuZuViewMediator = new commonUI.JinBiBuZuViewMediator(this._viewUI, this._app);
			this.XiaoJianPanMediator = new game.modules.tips.XiaoJianPanMediator(this._viewUI);
		}

		/**显示提示信息 */
		public onBoothTipsBtn() {
			var parame: Dictionary = new Dictionary();
			parame.set("contentId", 150507)
			this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, parame);
		}



		/**上架物品的信息 */
		public SGetMarketUpPriceDic(SGetMarketUpPriceDic) {
			this.PriceDic.clear();
			this.PriceDic = SGetMarketUpPriceDic;
		}

	    /**
		 * 
		 * @param item 准备上架的物品、id、packid、key、number
		 */
		public showSaleItem(item, SGetMarketUpPriceDic) {
			this.addNum = 10;
			var html = "";
			this._viewUI.oneAddpercentage_label.text = "";
			var itemId = item.itemId;
			var packid = item.packid;
			var key = item.key;
			var number = item.number; //拥有的数量
			var containertype = SGetMarketUpPriceDic.get("containertype");   //需要存放的位置
			var price = SGetMarketUpPriceDic.get("price");   //推荐价格
			var stallprice = SGetMarketUpPriceDic.get("stallprice");   //摊位费
			var recommendations = SGetMarketUpPriceDic.get("recommendations"); //推荐价格
			this.oneMarketUpPice = price; //上架的物品价格
			var iconId = this.itemAttrData[itemId].icon;    //icon
			var itemIcon = SaleModel._instance.getIcon(iconId);
			var nquality = this.itemAttrData[itemId].nquality;  //品质
			var frameImg = StrengTheningModel._instance.frameSkinArr[nquality - 1];
			var destribe = this.itemAttrData[itemId].destribe;  //描述
			this._viewUI.itemFrame_img.skin = frameImg;
			this._viewUI.itemIcon_img.skin = itemIcon + "";
			this._viewUI.itemName_lab.text = this.itemAttrData[itemId].name;
			this._viewUI.itemLv_lab.text = this.cstringResConfigData[1].msg + this.itemAttrData[itemId].level;
			if (120000 <= itemId && itemId <= 126675 || 140000 <= itemId && itemId <= 140005 || 10000 <= itemId && itemId <= 10009 || 111000 <= itemId && itemId <= 111053) { //装备 食物
				this._viewUI.another_box.visible = false;
				this.showOrHideBox(number);
				if (this._viewUI.onePrice_box.visible) {
					if (price == -1) {
						this._viewUI.onePrice_label.text = "0";
						this._viewUI.onelessPrice_Btn.visible = false;
						this._viewUI.oneaddPrice_Btn.visible = false;
						this._viewUI.onNum_lab.visible = true;
						this._viewUI.tuijian_label.visible = false;
					} else {
						this._viewUI.onelessPrice_Btn.visible = true;
						this._viewUI.oneaddPrice_Btn.visible = true;
						this._viewUI.onePrice_label.text = price;
						this._viewUI.onNum_lab.visible = false;
						this._viewUI.tuijian_label.visible = true;
					}
					this._viewUI.oneBoothPrice_label.text = stallprice;
				}
				var tips = SaleModel._instance.getItemTips(packid, key);
				if (111000 <= itemId && itemId <= 111053) {     //食品
					if (tips != -1) {
						var quality = tips.quality;
						this._viewUI.itemLv_lab.text = this.cstringResConfigData[11131].msg + quality;
						var effectdescribe = this.foodAndDrugEffectData[itemId].effectdescribe;
						var strformula = this.foodAndDrugFormulaData[itemId].strformula;
						var str = strformula.replace(this.cstringResConfigData[11131].msg, quality);
						this.str = effectdescribe;
						for (var i = 1; i < 5; i++) {
							var parameter = parseInt(eval(str));
							this.str = this.str.replace("$parameter" + i + "$", parameter + "");
						}
						html += "<span style='fontSize:24;color:#50321A'>" + this.str + "</span><br/>";
						html += "<span style='fontSize:24;color:#50321A'>" + destribe + "</span><br/>";
					}
				} else {  //装备
					html += "<span style='color:#FBDC47;fontSize:24'>" + this.cstringResConfigData[122].msg + "</span><br/>";
					if (tips != -1) {
						var baseAttr = tips.baseAttr;
						var addAttr = tips.addAttr;
						var skill = tips.skill;
						var effect = tips.effect;
						if (baseAttr != null) {
							var baseAttrKeys = baseAttr.keys;
							for (var j = 0; j < baseAttrKeys.length; j++) {
								var baseAttrId = baseAttrKeys[j];   //基础属性的id
								var baseAttrValue = baseAttr.get(baseAttrId);  //值
								var baseAttrName = this.attributeDesConfigData[baseAttrKeys[j]].name + "+" + baseAttrValue;
								html += "<span style='fontSize:24;color:#fff2df'>&nbsp;&nbsp;" + baseAttrName + "</span><br/>";
							}
						}
						if (addAttr != null) { //附加属性
							var addAttrKeys = addAttr.keys;
							for (var k = 0; k < addAttrKeys.length; k++) {
								var addAttrId = addAttrKeys[k];
								var addAttrValue = addAttr.get(addAttrId);
								var name = this.equipAddattributelibData[addAttrId].name;
								var tipname = name + addAttrValue;
								var color = this.equipAddattributelibData[addAttrId].namecolour;
								html += "<span style='fontSize:24;color:" + color + "'>&nbsp;&nbsp;" + tipname + "</span><br/>";
							}
						}
						if (skill != 0) {  //技能
							var name = this.equipAddattributelibDataBySkill[skill].name;
							var color = this.equipAddattributelibDataBySkill[skill].namecolour;
							html += "<span style='fontSize:24;color:" + color + "'>&nbsp;&nbsp;" + this.cstringResConfigData[11002].msg + "&nbsp;" + name + "</span><br/>";
						}
						if (effect != 0) { //特效
							var name = this.equipAddattributelibDataBySkill[effect].name;
							var color = this.equipAddattributelibDataBySkill[skill].namecolour;
							html += "<span style='fontSize:24;color:" + color + "'>&nbsp;&nbsp;" + this.cstringResConfigData[11003].msg + "&nbsp;" + name + "</span><br/>";
						}
						var endure = tips.endure; //耐久
						html += "<span style='color:#FBDC47;fontSize:24'>" + this.cstringResConfigData[11000].msg + ":" + endure + "</span><br/>";
						var equipscore = tips.equipscore;//评分
						html += "<span style='color:#FBDC47;fontSize:24'>" + this.cstringResConfigData[111].msg + ":" + equipscore + "</span><br/>";
						var destribe = this.itemAttrData[itemId].destribe; //描述
						html += "<span style='color:#FBDC47;fontSize:24'>" + destribe + "</span><br/>";

					}
				}

			} else {
				this._viewUI.another_box.visible = true;
				this.requestOtherSaleItem(SaleModel._instance.saleItmeId);
				this.showOrHideBox(number);
				if (this._viewUI.onePrice_box.visible) {
					if (price == -1) {
						this._viewUI.onePrice_label.text = "0";
						this._viewUI.onelessPrice_Btn.visible = false;
						this._viewUI.oneaddPrice_Btn.visible = false;
						this._viewUI.tuijian_label.visible = false;
					} else {
						this._viewUI.onePrice_label.text = price;
						this._viewUI.onelessPrice_Btn.visible = true;
						this._viewUI.oneaddPrice_Btn.visible = true;
						this._viewUI.tuijian_label.visible = true;
					}
					this._viewUI.oneBoothPrice_label.text = stallprice;
				}
				if (this._viewUI.numPrice_box.visible) {
					this._viewUI.itemPrice_label.text = price;
					this._viewUI.totalPrice_label.text = price;
					this._viewUI.boothPrice_label.text = stallprice;
					this._viewUI.itemNum_label.text = "1"; //默认数量为1
					this._viewUI.oneBoothPrice_label.text = stallprice;  //摆摊费
					this._viewUI.itemNumberReduce_btn.on(LEvent.MOUSE_DOWN, this, this.onlessItemNumBtn, [number]);
					this._viewUI.itemNumberAdd_btn.on(LEvent.MOUSE_DOWN, this, this.onAddItemNumBtn, [number]);
					this._viewUI.itemPriceReduce_btn.on(LEvent.MOUSE_DOWN, this, this.onItemlessPrice, [price]);
					this._viewUI.itemPriceAdd_btn.on(LEvent.MOUSE_DOWN, this, this.onItemAddPrice, [price]);
					this._viewUI.itemNum_img.on(LEvent.MOUSE_DOWN, this, this.onItemNum, [number]);
				}
				html += "<span style='fontSize:24;color:#50321A'>" + destribe + "</span>";
			}
			this._viewUI.itemDetails_html.innerHTML = html;
			this._viewUI.shelf_btn.on(LEvent.MOUSE_DOWN, this, this.canCMarketUp, [packid, key]);
			this._viewUI.onelessPrice_Btn.on(LEvent.MOUSE_DOWN, this, this.onelessPriceBtn, [price]);
			this._viewUI.oneaddPrice_Btn.on(LEvent.MOUSE_DOWN, this, this.oneaddPriceBtn, [price]);
			if (price == -1) {		//没有推荐价格
				this._viewUI.onNum_lab.on(LEvent.MOUSE_DOWN, this, this.onNumlab);
			}
			this._viewUI.cancel_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
		}

		/**
         * 请求其它玩家正在出售的物品
         * @param mitemid 物品id
         */
		public requestOtherSaleItem(mitemid) {
			var twono = -1;
			var firstno = -1;
			var id = -1;
			var thirdmenus = [];
			for (var i in this.cMarketThreeTableData) {
				var itemid = this.cMarketThreeTableData[i].itemid;
				if (itemid == mitemid) {
					twono = this.cMarketThreeTableData[i].twono;
					firstno = this.cMarketThreeTableData[i].firstno;
					id = this.cMarketThreeTableData[i].id;
					thirdmenus = this.cMarketSecondTableData[twono].thirdmenus;
				}
			}
			if (twono != -1 && firstno != -1 && id != -1) {
				var itemtype = this.cMarketThreeTableData[id].itemtype;   //物品类型 
				var logictype = this.cMarketThreeTableData[id].logictype;  //逻辑类型
				if (logictype == 0) {
					this.CMarketBrowse(firstno, twono, [0], itemtype, 0, 0, 1, 1, 0);
				} else {
					this.CMarketBrowse(firstno, twono, [id], itemtype, 0, 0, 1, 1, 0);
				}
			}
			models.SaleProxy._instance.once(models.SMarketBrowse, this, this.showOtherSaleItem);
		}

		/**显示其它玩家正在出售的物品 */
		public showOtherSaleItem() {
			var goodList = SaleModel._instance.bugGoodlist;
			var otherSaleArr = [];
			if (goodList != undefined) {  //返回有物品信息
				this._viewUI.otherSale_list.visible = true;
				for (var i = 0; i < goodList.length; i++) {
					var itemid = goodList[i].itemid; //物品id
					var num = goodList[i].num; //数量
					var price = goodList[i].price;  //价格
					var name = "";
					var nquality = 0;
					var iconid = 0;
					if (43000 <= itemid && itemid < 43460) {  //宠物
						name = this.petCPetAttrData[itemid].name;
						var modelid = this.petCPetAttrData[itemid].modelid;
						iconid = this.cnpcShapeData[modelid].littleheadID;  //iconid
						nquality = this.petCPetAttrData[itemid].quality;
					} else {
						name = this.itemAttrData[itemid].name;
						iconid = this.itemAttrData[itemid].icon;
						nquality = this.itemAttrData[itemid].nquality;
					}
					var itemIcon = SaleModel._instance.getIcon(iconid);
					var frame = StrengTheningModel._instance.frameSkinArr[nquality - 1];
					otherSaleArr.push({
						pirce_label: price,
						itemNum_label: num,
						bs_img: frame,
						itemIcon_img: itemIcon,
						itemid: itemid,
						itemName_label: name
					});
				}
				SaleModel._instance.showList(this._viewUI.otherSale_list, otherSaleArr);
				this._viewUI.otherSale_list.renderHandler = new Handler(this, this.otherSaleListRender, [otherSaleArr]);

			} else {
				this._viewUI.otherSale_list.visible = false;
			}
		}

		/**物品icon添加点击事件 */
		public otherSaleListRender(otherSaleArr, cell: Box, index: number) {
			var itemIcon = cell.getChildByName("itemIcon_img") as Laya.Image;
			var bg_btn = cell.getChildByName("bg_btn") as Button;
			bg_btn.on(LEvent.MOUSE_UP, this, this.onBgBtn, [index, cell]);
			itemIcon.on(LEvent.MOUSE_UP, this, this.showItemDateils, [otherSaleArr, index]);
		}

		/**点击列表效果 */
		public onBgBtn(index, cell) {
			var nowBtnleft: Button = cell.getChildByName("bg_btn") as Button;
			nowBtnleft.selected = true;
			if (this.bgBtn == null) {
				this.bgBtn = cell;
				return;
			}
			if (this.bgBtn != cell) {
				var btnLeft: Button = this.bgBtn.getChildByName("bg_btn") as Button;
				btnLeft.selected = false;
				this.bgBtn = cell;
			}
		}

		/**点击物品icon显示物品详情 */
		public showItemDateils(otherSaleArr, index) {
			var itemid = otherSaleArr[index].itemid; //物品id
			var arr: Dictionary = new Dictionary();
			arr.set("itemId", itemid);
			arr.set("xpos", 240);
			arr.set("ypos", 720);
			this.tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, arr);
		}

		/**上架 */
		public canCMarketUp(packid, key) {
			var money = game.modules.bag.models.BagModel._instance.sliverIcon;
			var goods = models.SaleModel._instance.GoodList;				// 物品数量的长度
			var itemArr = goods.get(actiontype.gongshi);
			if (itemArr.length >= 8) {
				let goodshint = PromptExplain.SHANGJIA_LIMIT;
				let prompt = HudModel.getInstance().promptAssembleBack(goodshint);
				let disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
				disappearMsgTips.onShow(prompt);
			}
			if (this._viewUI.onePrice_box.visible) {
				var price = this._viewUI.onePrice_label.text;
				if (parseInt(price) > 0) {
					var boothPrice = this._viewUI.oneBoothPrice_label.text;			//摆摊费
					var level = HudModel.getInstance().levelNum;
					if (level >= 30) {   //角色等级大于等于30级
						if (parseInt(boothPrice) <= money) {   //金钱是否足够
							this.CMarketUp(packid, key, 1, price);
							this.hide();
						} else {  //银币不足兑换界面
							var duihuanMoney = parseInt(boothPrice) - HudModel.getInstance().sliverNum;//需要兑换的钱
							this._JinBiBuZuViewMediator.onShow(false, duihuanMoney.toString(), Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI).toString(), Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI).toString());
							this._JinBiBuZuViewMediator.once(commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.buySliverFromYuanBao, [Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI)]);
							this._JinBiBuZuViewMediator.once(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.goCharge, [Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI)]);
						}
					} else {  //提示等级不足
						let prompt = this.chatMessageTips[150022].msg;
						this.DisappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
						this.DisappearMessageTipsMediator.onShow(prompt);
					}
				} else {  //提示输入物品价格
					let prompt = this.chatMessageTips[150510].msg;
					this.DisappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
					this.DisappearMessageTipsMediator.onShow(prompt);
				}
			}
			if (this._viewUI.numPrice_box.visible) {
				var boothPrice = this._viewUI.oneBoothPrice_label.text;		//摆摊费
				if (parseInt(boothPrice) <= money) { //银币是否足够
					var price = this._viewUI.itemPrice_label.text;
					var num = this._viewUI.itemNum_label.text;
					this.CMarketUp(packid, key, parseInt(num), price);
					this.hide();
				} else {	//银币不足兑换
					var duihuanMoney = parseInt(boothPrice) - HudModel.getInstance().sliverNum;//需要兑换的钱
					this._JinBiBuZuViewMediator.onShow(false, duihuanMoney.toString(), Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI).toString(), Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI).toString());
					this._JinBiBuZuViewMediator.once(commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.buySliverFromYuanBao, [Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI)]);
					this._JinBiBuZuViewMediator.once(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.goCharge, [Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI)]);
				}
			}
		}

		/**元宝兑换金币 */
		public goCharge(yuanbao) {
			var fuShiNum = HudModel.getInstance().fuShiNum;			// 元宝的数量
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
			//如果元宝不够
			if (fuShiNum < yuanbao) {
				this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
				this._TipsMessageMediator.show();
				var param: Dictionary = new Dictionary();
				param.set("contentId", RoleEnum.XIANJIN_TIP);
				this._TipsMessageMediator.showContent(param);
				game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
			} else {
				RequesterProtocols._instance.c2s_exchange_currency(3, 1, yuanbao);
			}
		}

		/**充值 */
		public goRecharge() {
			this._JinBiBuZuViewMediator.hide();
			ModuleManager.jumpPage(ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
			game.modules.shop.models.ShopProxy._instance.event(game.modules.shop.models.Go_Charge);   //前往充值界面。关闭当前界
		}

		/**
		 * 物品上架
		 * @param containertype 背包类型
		 * @param key key
		 * @param num 数量
		 * @param price 价格
		 */
		public CMarketUp(containertype, key, num, price) {
			RequesterProtocols._instance.c2s_market_up(containertype, key, num, price);
		}

		public showOrHideBox(number) {
			if (number > 1) {
				this._viewUI.onePrice_box.visible = false;
				this._viewUI.numPrice_box.visible = true;
			} else {
				this._viewUI.numPrice_box.visible = false;
				this._viewUI.onePrice_box.visible = true;
			}
		}


		/**
		 * 物品数量减少按钮
		 */
		public onlessItemNumBtn(itemNumber) {
			var num = this._viewUI.itemNum_label.text;
			var price = this._viewUI.itemPrice_label.text;
			var onePrice = parseInt(price);
			var labNum = parseInt(num);
			if (labNum > 1) {
				labNum -= 1;
				this._viewUI.itemNum_label.text = labNum + "";
				this._viewUI.totalPrice_label.text = labNum * onePrice + "";
				this.showBoothPrice();
			}

		}

		/**
		 * 物品数量增加按钮
		 */
		public onAddItemNumBtn(itemNumber) {
			var num = this._viewUI.itemNum_label.text;
			var price = this._viewUI.itemPrice_label.text;
			var onePrice = parseInt(price);
			var labNum = parseInt(num);
			if (labNum < itemNumber) {
				labNum += 1;
				this._viewUI.itemNum_label.text = labNum + "";
				this._viewUI.totalPrice_label.text = labNum * onePrice + "";
				this.showBoothPrice();
			}
		}

        /**
		 * 多个物品的价格减少
		 */
		public onItemlessPrice(price) {
			this.addNum -= 1;
			if (price != -1) {
				if (this.addNum >= 5) {
					this.oneMarketUpPice = Math.floor(price * this.addNum * 0.1);
					this._viewUI.itemPrice_label.text = this.oneMarketUpPice + "";
					this.showBoothPrice();
				} else {
					this.addNum += 1;
				}
				if (this.addNum >= 10) {
					this.showMoreAddPercentageLabel(price, "+");
				} else {
					this.showMoreAddPercentageLabel(price, "-");
				}
			}
		}

		/**
		 * 多个物品时的价格增加
		 * @param price 
		 */
		public onItemAddPrice(price) {
			this.addNum += 1;
			if (price != -1) {
				if (this.addNum <= 15) {
					this.oneMarketUpPice = Math.floor(price * this.addNum * 0.1);
					this._viewUI.itemPrice_label.text = this.oneMarketUpPice + "";
					this.showBoothPrice();
				} else {
					this.addNum -= 1;
				}
				if (this.addNum >= 10) {
					this.showMoreAddPercentageLabel(price, "+");
				} else {
					this.showMoreAddPercentageLabel(price, "-");
				}
			}
		}

		/**
		 * 多个物品时价格涨幅百分比显示
		 * @param price 
		 * @param str 
		 */
		public showMoreAddPercentageLabel(price, str) {
			if (price != this.oneMarketUpPice) {
				this._viewUI.moreNumPercentage_lab.text = str + Math.abs((this.addNum - 10) * 10) + "%";
			} else {
				this._viewUI.moreNumPercentage_lab.text = "";
			}
			this._viewUI.itemPrice_label.text = this.oneMarketUpPice + "";
			this.showBoothPrice();
		}

		/**
		 *  摊位费
		 */
		public showBoothPrice() {
			var totalPrice = this._viewUI.totalPrice_label.text;
			var m_totalPrice = parseInt(totalPrice);
			if (1000 <= m_totalPrice && m_totalPrice <= 100000) {
				this._viewUI.boothPrice_label.text = m_totalPrice + "";
			} else if (m_totalPrice > 100000) {
				this._viewUI.boothPrice_label.text = 100000 + "";
			} else if (m_totalPrice < 1000) {
				this._viewUI.boothPrice_label.text = 1000 + "";
			}

			var num = this._viewUI.itemNum_label.text;
			var itemNum = parseInt(num);
			this._viewUI.totalPrice_label.text = this.oneMarketUpPice * itemNum + "";
		}

		/**
		 * 物品减价
		 * @param price 
		 */
		public onelessPriceBtn(price) {
			this.addNum -= 1;
			if (price != -1) {
				if (this.addNum >= 5) {
					this.oneMarketUpPice = Math.floor(price * this.addNum * 0.1);
					this._viewUI.onePrice_label.text = this.oneMarketUpPice + "";
				} else {
					this.addNum += 1;
				}
				if (this.addNum >= 10) {
					this.showOneAddPercentageLabel(price, "+");
				} else {
					this.showOneAddPercentageLabel(price, "-");
				}

			}
		}

		/**
		 * 物品加价
		 * @param price 
		 */
		public oneaddPriceBtn(price) {
			this.addNum += 1;
			if (price != -1) {
				if (this.addNum <= 15) {
					this.oneMarketUpPice = Math.floor(price * this.addNum * 0.1);
					this._viewUI.onePrice_label.text = this.oneMarketUpPice + "";
				} else {
					this.addNum -= 1;
				}
				if (this.addNum >= 10) {
					this.showOneAddPercentageLabel(price, "+");
				} else {
					this.showOneAddPercentageLabel(price, "-");
				}
			}

		}

        /**
		 * 单个物品推荐价格涨幅百分比
		 */
		public showOneAddPercentageLabel(price, str) {
			if (price != this.oneMarketUpPice) {
				this._viewUI.oneAddpercentage_label.text = str + Math.abs((this.addNum - 10) * 10) + "%";
			} else {
				this._viewUI.oneAddpercentage_label.text = "";
			}

			this._viewUI.oneBoothPrice_label.text = this.oneMarketUpPice + "";
		}

		/**
		 * 显示小键盘输入装备价格
		 */
		public onNumlab() {
			this.XiaoJianPanMediator = new game.modules.tips.XiaoJianPanMediator(this._viewUI);
			this.totalNum = "";
			this.isitemequip = 1;
			this.XiaoJianPanMediator.onShow(190, 370);
			game.modules.tips.models.TipsProxy.getInstance().on(game.modules.tips.models.ON_KRYBOARD, this, this.getNumber);
		}

		/**
		 * 小键盘物品增加数量
		 * @param itemNum 物品最大上架数量
		 */
		public onItemNum(itemNum) {
			this.XiaoJianPanMediator = new game.modules.tips.XiaoJianPanMediator(this._viewUI);
			this.totalNum = "";
			this.itemMaxNum = itemNum;
			this.isitemequip = 2;
			this.XiaoJianPanMediator.onShow(210, 300);
			game.modules.tips.models.TipsProxy.getInstance().on(game.modules.tips.models.ON_KRYBOARD, this, this.getNumber);
		}


		/** 点击键盘数字*/
		public getNumber(num) {
			if (num == -2) {  //点击了ok
				if (this.totalNum == "" || this.totalNum.charAt(0) == "0") {
					this.totalNum = "1";
				}
			}
			if (num == -1) {  //点击了删除
				if (this.totalNum.length > 0) {
					this.totalNum = this.totalNum.substring(0, this.totalNum.length - 1);
					if (this.totalNum.length <= 0) {
						this.totalNum = "0";
					}
				}
			}
			var onItemNum = this._viewUI.itemNum_label;
			var onePriceLabel = this._viewUI.onePrice_label;
			var oneBoothPriceLabel = this._viewUI.oneBoothPrice_label;

			if (num >= 0) {
				if (typeof (this.totalNum) === "number") {
					this.totalNum = "";
				}
				var oneChar = this.totalNum.charAt(0);
				if (oneChar != '0') {
					this.totalNum += num;
				} else {
					this.totalNum = num;
				}
			}
			if (this.isitemequip == 1) {
				if (parseInt(this.totalNum) <= this.currentlimitNum) {
					onePriceLabel.text = this.totalNum;
				} else {
					onePriceLabel.text = this.currentlimitNum + "";
					let prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.INPUT_MAX_LIMIT);
					this.DisappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
					this.DisappearMessageTipsMediator.onShow(prompt);
				}
			}
			if (this.isitemequip == 2) {
				if (parseInt(this.totalNum) <= this.itemMaxNum) {
					onItemNum.text = this.totalNum;
				} else {
					onItemNum.text = this.itemMaxNum + "";
					let prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.INPUT_MAX_LIMIT);
					this.DisappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
					this.DisappearMessageTipsMediator.onShow(prompt);
				}
			}
			if (parseInt(this.totalNum) <= this.boothPriceLimitMin) {
				oneBoothPriceLabel.text = this.boothPriceLimitMin + "";
			} else if (this.boothPriceLimitMin <= parseInt(this.totalNum) && parseInt(this.totalNum) <= this.boothPriceLimitMax) {
				oneBoothPriceLabel.text = this.totalNum;
			} else {
				oneBoothPriceLabel.text = this.boothPriceLimitMax + "";
			}
		}

		/**
         * 筛选物品请求
         * @param firstno 一级页签类型
         * @param twono 二级页签类型
         * @param threeno 三级页签类型
         * @param itemtype 物品类型
         * @param limitmin 条件下限
         * @param limitmax 条件上限
         * @param currpage 当前页
         * @param priceSort 价格排序  1升序  2降序
         * @param issearch 0筛选 1搜索
         */
		public CMarketBrowse(firstno, twono, threeno: Array<any>, itemtype, limitmin, limitmax, currpage, priceSort, issearch) {
			/**上架界面搜索物品 */
			RequesterProtocols._instance.c2s_market_browse(attentype.buy, firstno, twono, threeno, itemtype, limitmin, limitmax, currpage, priceSort, issearch);
		}

		public show(): void {
			super.show();
		}

		public hide(): void {
			game.modules.tips.models.TipsProxy.getInstance().off(game.modules.tips.models.ON_KRYBOARD, this, this.getNumber);
			super.hide();
		}

		public getView(): Sprite {
			return this._viewUI;
		}
	}
}