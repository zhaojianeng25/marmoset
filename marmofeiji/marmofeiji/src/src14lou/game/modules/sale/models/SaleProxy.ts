/**
* name 
*/
module game.modules.sale.models {
	/**上架物品返回的推荐价格、摊位费等 */
	export const SGetMarketUpPrice: string = "SGetMarketUpPrice";
	/**摊位物品信息 */
	export const SMarketContainerBrowse: string = "onSMarketContainerBrowse";
	/**摊位宠物tips信息返回 */
	export const SMarketPetTips: string = "SMarketPetTips";
	/**摊位物品tips信息返回 */
	export const SOtherItemTips: string = "SOtherItemTips";
	/**购买界面获取物品*/
	export const SMarketBrowse: string = "SMarketBrowse";
	/**购买关注 */
	export const SAttentionGoods: string = "SAttentionGoods";
	/**公示关注 */
	export const SGongShiAttentionGoods: string = "SGongShiAttentionGoods";
	/**多个物品购买时的弹窗购买按钮*/
	export const buyItemTipsBtn: string = "buyItemTipsBtn";
	/**购买搜索 */
	export const buySearch: string = "buySearch";
	/**购买装备宠物搜索 */
	export const buyGemEguipPetSeek: string = "buyGemEguipPetSeek";
	/**关注搜索 */
	export const attentionSearch: string = "attentionSearch";
	/**关注装备宠物搜索 */
	export const attentionGemEguipPetSeekSearch: string = "attentionGemEguipPetSeekSearch";
	/**交易记录 */
	export const SMarketTradeLog: string = "SMarketTradeLog";
	export const onSaleListTipsbtn: string = "onSaleListTipsbtn";
	/**搜所装备等级 */
	export const onSaleListEqulevelbtn: string = "onSaleListEqulevelbtn";
	/**搜索装备基础属性 */
	export const onSaleListEquBastAttrbtn1: string = "onSaleListEquBastAttrbtn1";
	/**搜索装备基础属性 */
	export const onSaleListEquBastAttrbtn2: string = "onSaleListEquBastAttrbtn2";
	/**搜索装备基础属性 */
	export const onSaleListEquBastAttrbtn3: string = "onSaleListEquBastAttrbtn3";
	/**搜所装备特效 */
	export const onSaleListEquTeXiao: string = "onSaleListEquTeXiao";
	/**搜索装备特技 */
	export const onSaleListEquTeJi: string = "onSaleListEquTeJi";
	/**搜索装备附加属性 */
	export const onSaleListEquAddAttr: string = "onSaleListEquAddAttr";
	/**搜索普通宠物 */
	export const onSaleListordinaryPet: string = "onSaleListordinaryPet";
	/**搜索灵宠列表 */
	export const onSaleListlingchong: string = "onSaleListlingchong";
	/***宠物技能 */
	export const onSalePetSkill: string = "onSalePetSkill";
	/***宠物资质1 */
	export const onSalePetZizhi1: string = "onSalePetZizhi1";
	/***宠物资质2 */
	export const onSalePetZizhi2: string = "onSalePetZizhi2";
	/***宠物资质3 */
	export const onSalePetZizhi3: string = "onSalePetZizhi3";
	/***宠物基础属性1 */
	export const onSalePetBaseAttr1: string = "onSalePetBaseAttr1";
	/***宠物基础属性2 */
	export const onSalePetBaseAttr2: string = "onSalePetBaseAttr2";
	/***宠物基础属性3 */
	export const onSalePetBaseAttr3: string = "onSalePetBaseAttr3";
	/**上架宠物 */
	export const SMarketUpSucc: string = "SMarketUpSucc";
	/**搜索结果 */
	export const SearchItemResult: string = "SearchItemResult";
	/**购买宠物 */
	export const butPet: string = "butPet";
	/**购买返回 */
	export const SMarketBuy: string = "SMarketBuy";
	/**通知主界面拍卖加载完毕 */
	export const SaleIsInit: string = "SaleIsInit";
	/**搜索返回的数据 */
	export const SMarketSearchResult: string = "SMarketSearchResult";

	export class SaleProxy extends hanlder.ProxyBase {
		constructor() {
			super();
			SaleProxy._instance = this;
			this.init();
		}
		public static _instance: SaleProxy;
		public static getInstance(): SaleProxy {
			if (!this._instance) {
				this._instance = new SaleProxy();
			}
			return this._instance;
		}

		public init(): void {
			LoginModel.getInstance();
			this.addNetworkListener();
			//三级摆摊表
			Laya.loader.load("common/data/temp/shop.cmarketthreetable.bin", Handler.create(this, this.onloadedCMarketThreeTableComplete), null, Loader.BUFFER);
			/**一级摆摊表 */
			Laya.loader.load("common/data/temp/shop.cmarketfirsttable.bin", Handler.create(this, this.onloadedCMarketFirstTableComplete), null, Loader.BUFFER);
			/**二级摆摊表 */
			Laya.loader.load("common/data/temp/shop.cmarketsecondtable.bin", Handler.create(this, this.onloadedCMarketSecondTableComplete), null, Loader.BUFFER);
			/**食品表 */
			Laya.loader.load("common/data/temp/item.cfoodanddrugeffect.bin", Handler.create(this, this.onloadedFoodAndDrugEffectComplete), null, Loader.BUFFER);
			/**食品公式表 */
			Laya.loader.load("common/data/temp/item.cfoodanddrugformula.bin", Handler.create(this, this.onloadedFoodAndDrugFormulaComplete), null, Loader.BUFFER);
		}
		/**三级摆摊表(根据id、name与itemid作为字典key) */
		onloadedCMarketThreeTableComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.cmarketthreetable.bin");
			var data: Byte = new Byte(arrayBuffer);
			let size1: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size1, SaleModel.getInstance().cMarketThreeTableData, game.data.template.CMarketThreeTableBaseVo, "id");
			data.pos = 0;
			let size2: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size2, SaleModel.getInstance().cMarketThreeTableDataForName, game.data.template.CMarketThreeTableBaseVo, "name");
			data.pos = 0;
			let size3: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size3, SaleModel.getInstance().cMarketThreeTableDataForItemid, game.data.template.CMarketThreeTableBaseVo, "itemid");
		}

		onloadedCMarketFirstTableComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.cmarketfirsttable.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, SaleModel.getInstance().cMarketFirstTableData, game.data.template.CMarketFirstTableBaseVo, "id");
		}


		onloadedCMarketSecondTableComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.cmarketsecondtable.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, SaleModel.getInstance().cMarketSecondTableData, game.data.template.CMarketSecondTableBaseVo, "id");
		}

		onloadedFoodAndDrugEffectComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cfoodanddrugeffect.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, SaleModel.getInstance().foodAndDrugEffectData, game.data.template.FoodAndDrugEffectBaseVo, "id");
		}

		onloadedFoodAndDrugFormulaComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cfoodanddrugformula.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, SaleModel.getInstance().foodAndDrugFormulaData, game.data.template.FoodAndDrugFormulaBaseVo, "id");
		}

		public addNetworkListener(): void {
			/**摊位信息 */
			Network._instance.addHanlder(ProtocolsEnum.SMarketContainerBrowse, this, this.onSMarketContainerBrowse);
			/**上架物品价格返回 */
			Network._instance.addHanlder(ProtocolsEnum.SGetMarketUpPrice, this, this.onSGetMarketUpPrice);
			/**上架物品详细信息tips返回*/
			Network._instance.addHanlder(ProtocolsEnum.SOtherItemTips, this, this.onSOtherItemTips);
			/**上架宠物详细信息tips返回 */
			Network._instance.addHanlder(ProtocolsEnum.SMarketPetTips, this, this.onSMarketPetTips);
			/**上架宠物成功返回*/
			Network._instance.addHanlder(ProtocolsEnum.SMarketUpSucc, this, this.onSMarketUpSucc);
			/**购买界面筛选物品返回 */
			Network._instance.addHanlder(ProtocolsEnum.SMarketBrowse, this, this.onSMarketBrowse);
			/**关注 */
			Network._instance.addHanlder(ProtocolsEnum.SAttentionGoods, this, this.onSAttentionGoods);
			/**购买 */
			Network._instance.addHanlder(ProtocolsEnum.SMarketBuy, this, this.onSMarketBuy);
			/**交易记录 */
			Network._instance.addHanlder(ProtocolsEnum.SMarketTradeLog, this, this.onSMarketTradeLog);
			/**查询结果 */
			Network._instance.addHanlder(ProtocolsEnum.SMarketSearchResult, this, this.onSMarketSearchResult);

		}

		/**拍卖行请求被关注的物品信息 */
		public onSMarketContainerBrowse(optcode: number, msg: hanlder.S2C_market_containerbrowse) {
			models.SaleModel._instance.GoodList.set(msg.actiontype, msg.goodslist);
			models.SaleProxy._instance.event(models.SMarketContainerBrowse);
		}

		public onSGetMarketUpPrice(optcode: number, msg: hanlder.S2C_get_marketupprice) {
			var SGetMarketUpPriceDic: Dictionary = new Dictionary();
			SGetMarketUpPriceDic.set("containertype", msg.containertype);
			SGetMarketUpPriceDic.set("price", msg.price);
			SGetMarketUpPriceDic.set("stallprice", msg.stallprice);
			SGetMarketUpPriceDic.set("recommendations", msg.recommendations);
			models.SaleProxy._instance.event(models.SGetMarketUpPrice, SGetMarketUpPriceDic);
		}

		public onSOtherItemTips(optcode: number, msg: hanlder.S2C_SOther_ItemTips) {
			var SOtherItemTipsDsc: Dictionary = new Dictionary();
			SOtherItemTipsDsc.set("roleid", msg.roleid);
			SOtherItemTipsDsc.set("packid", msg.packid);
			SOtherItemTipsDsc.set("keyinpack", msg.keyinpack);
			SOtherItemTipsDsc.set("tips", msg.tips);
			models.SaleProxy._instance.event(models.SOtherItemTips, SOtherItemTipsDsc);
		}

		public onSMarketPetTips(optcode: number, msg: hanlder.S2C_market_pettips) {
			SaleModel.getInstance().SMarketPetTipsData.set("data", msg);
			models.SaleProxy._instance.event(models.SMarketPetTips, msg.pettips);

		}

		public onSMarketUpSucc(optcode: number, msg: hanlder.S2C_market_upsucc) {
			models.SaleProxy._instance.event(SMarketUpSucc, [msg.israrity]);
		}

		public onSMarketBrowse(optcode: number, msg: hanlder.S2C_market_browse) {
			SaleModel._instance.currPage = msg.currpage;
			SaleModel._instance.totalPage = msg.totalpage;
			SaleModel._instance.bugGoodlist = msg.goodslist;
			models.SaleProxy._instance.event(SMarketBrowse, actiontype.gongshi);
		}

		/**
		 * 关注服务器下发协议
		 * @param msg 
		 */
		public onSAttentionGoods(optcode: number, msg: hanlder.S2C_attention_goods) {
			if (msg.attentype == 1) {
				SaleModel.getInstance().GoumaiGuanZhuData.set("data", msg);
				models.SaleProxy._instance.event(SAttentionGoods);
			} else {
				SaleModel.getInstance().GongshiGuanZhuData.set("data", msg);
				models.SaleProxy._instance.event(SGongShiAttentionGoods);
			}
		}

		public onSMarketBuy(optcode: number, msg: hanlder.S2C_market_buy) {
			var goodslist = SaleModel._instance.bugGoodlist;
			for (var i = 0; i < goodslist.length; i++) {
				var goodId = goodslist[i].id;
				if (goodId == msg.id) {
					if (msg.surplusnum > 0) {
						goodslist[i].num = msg.surplusnum;
					} else {
						goodslist.splice(i, 1);
					}
				}
			}
			SaleModel._instance.bugGoodlist = goodslist;
			models.SaleProxy._instance.event(models.SMarketBuy, actiontype.gongshi);
		}

		public onSMarketTradeLog(optcode: number, msg: hanlder.S2C_market_tradelog) {
			if (msg.buylog[0] != undefined) {
				SaleModel._instance.buyRecordArr = msg.buylog;
			}
			if (msg.salelog[0] != undefined) {
				SaleModel._instance.saleRecordArr = msg.salelog;
			}
			models.SaleProxy._instance.event(SMarketTradeLog);
		}
		/** 珍品装备宠物搜索数据返回*/
		public onSMarketSearchResult(optcode: number, msg: hanlder.S2C_market_searchresult) {
			SaleModel._instance.SearchResultData.set("firstno", msg.firstno);
			SaleModel._instance.SearchResultData.set("twono", msg.twono);
			SaleModel._instance.SearchResultData.set("browsetype", msg.browsetype);
			SaleModel._instance.SearchResultData.set("goodslist", msg.goodslist);
			models.SaleProxy._instance.event(SMarketSearchResult);
		}
	}
}