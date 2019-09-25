/**
* 伙伴解锁
*/

module game.modules.huoban {
	export class HuoBanJieSuoMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.HuoBanJieSuoUI;
		/**二次确认*/
		public commonui: commonUI.RemindViewMediator;
		/**金币兑换*/
		public jinbiduihuan: commonUI.JinBiBuZuViewMediator;
		/**弹出类型的tips */
		private _TipsMessageMediator: game.modules.tips.TipsMessageMediator;
		/**拥有的银币数量*/
		public yinbinumber: number;
		/**拥有的荣誉*/
		public rongyunumber: number;
		/**伙伴名字*/
		public huobanname: string;
		/**花费的银币*/
		public needyinbi: number;
		/*花费的荣誉*/
		public needrongyu: number;
		/**伙伴id*/
		public huobanid: number;
		/**当前选择的伙伴*/
		public currentselect: number;
		/**需要兑换的金币*/
		public exchangejinbi: number;
		/**兑换的元宝*/
		public exchangeyuanbao: number;
		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.HuoBanJieSuoUI();
			this._viewUI.mouseThrough = true;
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
		}
		/**初始化数据伙伴ID */
		public init(huobanid: number) {
			super.show();
			this._viewUI.rongyu_img.skin = "common/icon/item/20107.png";
			this._viewUI.msgTips1_img.visible = false;
			this.huobanid = huobanid;
			var data: Array<any> = [];
			var rongyudata: Array<any> = [];
			let huobanalldata: CHeroBaseInfoBaseVo = HuoBanModel.getInstance().cheroBaseInfoData[huobanid];
			this.huobanname = huobanalldata.name;
			let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11821]
			data.push({ huobanico_img: "common/icon/avatarpartner/" + huobanalldata.headid + ".png", spendMoney_lab: huobanalldata.day7_money[1], dayMoney_lab: chattext.msg });
			rongyudata.push({ huobanico_img: "common/icon/avatarpartner/" + huobanalldata.headid + ".png", spendRongYu_lab: huobanalldata.day7_money[0], dayRongYu_lab: chattext.msg, tubiaoicon_img: "common/icon/item/20107.png" });
			chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11822]
			data.push({ huobanico_img: "common/icon/avatarpartner/" + huobanalldata.headid + ".png", spendMoney_lab: huobanalldata.day30_money[1], dayMoney_lab: chattext.msg });
			rongyudata.push({ huobanico_img: "common/icon/avatarpartner/" + huobanalldata.headid + ".png", spendRongYu_lab: huobanalldata.day30_money[0], dayRongYu_lab: chattext.msg, tubiaoicon_img: "common/icon/item/20107.png" });
			chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11823]
			data.push({ huobanico_img: "common/icon/avatarpartner/" + huobanalldata.headid + ".png", spendMoney_lab: huobanalldata.forever_money[1], dayMoney_lab: chattext.msg });
			rongyudata.push({ huobanico_img: "common/icon/avatarpartner/" + huobanalldata.headid + ".png", spendRongYu_lab: huobanalldata.forever_money[0], dayRongYu_lab: chattext.msg, tubiaoicon_img: "common/icon/item/20107.png" });
			this._viewUI.yinbijiesuo_list.array = data;
			this._viewUI.rongyujiesuo_list.array = rongyudata;
			this._viewUI.yinbijiesuo_list.renderHandler = new Laya.Handler(this, this.jiesuodate);
			this._viewUI.close_btn.clickHandler = new Laya.Handler(this, this.hide);
			this._viewUI.rongyujiesuo_list.renderHandler = new Laya.Handler(this, this.rongyu);
			this._viewUI.money_lab.text = BagModel.getInstance().sliverIcon + "";
			this._viewUI.rongyu_lab.text = BagModel.getInstance().honnorIcon + "";
			this.yinbinumber = BagModel.getInstance().sliverIcon;
			this.rongyunumber = BagModel.getInstance().honnorIcon;
		}
		/**解锁数据*/
		public jiesuodate(cell: Box, index: number): void {
			let yinbi: Label = cell.getChildByName("spendMoney_lab") as Label;
			if (parseInt(yinbi.text) < this.yinbinumber)//银币是否足够
				yinbi.color = "#ffffff";
			else
				yinbi.color = "#ff0000";
			let selectbtn: Button = cell.getChildByName("selectjiesuo_btn") as Button;
			selectbtn.clickHandler = new Laya.Handler(this, this.selectjiesuo, [cell, index]);
		}
		/**选择解锁的伙伴*/
		public selectjiesuo(cell: Box, index: number): void {
			// this.commonui = new commonUI.RemindViewMediator(this._viewUI, this._app);
			// this.commonui.once(commonUI.RIGHT_BUTTON_EVENT, this, this.jiesuohuoban);
			let yinbi: Label = cell.getChildByName("spendMoney_lab") as Label;			
			let unlockCostText = "<br/><span style='color:#50321A;fontSize:24'>" + yinbi.text + "</span>";
			this.needyinbi = parseInt(yinbi.text);
			let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11122]
			let right: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[1556]
			this.currentselect = index;
			let parameArr: Array<any> = []
			parameArr.push(this.huobanname)
			parameArr.push(chattext.msg)
			parameArr.push(unlockCostText)
			var contentId: number;
			switch (index) {//0为七天 1为1个月 2为永久
				case 0:
					contentId = 150122;
					// var cstring: string
					// cstring = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(150122, arr)
					// console.log("----------伙伴数据：", arr);
					// console.log("----------伙伴数据：", cstring);
					// this.commonui.onhtmlShow(cstring, right.msg);
					break;
				case 1:
					contentId = 150145;
					// var cstring: string
					// cstring = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(150145, arr)
					// this.commonui.onhtmlShow(cstring, right.msg);
					break;
				case 2:
					contentId = 150146;
					// var cstring: string
					// cstring = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(150146, arr)
					// this.commonui.onhtmlShow(cstring, right.msg);
					break;
				default:
					break;
			}
			this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
			this._TipsMessageMediator.show();
			var param: Dictionary = new Dictionary();
			param.set("contentId", contentId);
			param.set("parame", parameArr);
			this._TipsMessageMediator.showContent(param);
			game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.jiesuohuoban);
		}
		/**荣誉解锁响应事件初始化*/
		public rongyu(cell: Box, index: number): void {
			let rongyu: Label = cell.getChildByName("spendRongYu_lab") as Label;
			if (parseInt(rongyu.text) < this.rongyunumber)//荣誉是否足够
				rongyu.color = "#ffffff";
			else
				rongyu.color = "#ff0000";
			let selectbtn: Button = cell.getChildByName("selectrongyu_btn") as Button;
			selectbtn.clickHandler = new Laya.Handler(this, this.rongyujiesuo, [cell, index]);
		}
		/**荣誉解锁*/
		public rongyujiesuo(cell: Box, index: number): void {
			// this.commonui = new commonUI.RemindViewMediator(this._viewUI, this._app);
			// this.commonui.once(commonUI.RIGHT_BUTTON_EVENT, this, this.rongyujiesuohuoban);
			let rongyu: Label = cell.getChildByName("spendRongYu_lab") as Label;
			let unlockCostText = "<br/><span style='color:#50321A;fontSize:24'>" + rongyu.text + "</span>";
			this.needrongyu = parseInt(rongyu.text);
			this.currentselect = index;
			let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11123]
			let right: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[1556]
			let parameArr: Array<any> = []
			parameArr.push(this.huobanname)
			parameArr.push(chattext.msg)
			parameArr.push(unlockCostText)
			var contentId: number;
			switch (index) {//0为七天 1为1个月 2为永久
				case 0:
					contentId = 150122;
					// var cstring: string
					// cstring = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(150122, arr)
					// this.commonui.onhtmlShow(cstring, right.msg);
					break;
				case 1:
					contentId = 150145;
					// var cstring: string
					// cstring = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(150145, arr)
					// this.commonui.onhtmlShow(cstring, right.msg);
					break;
				case 2:
					contentId = 150146;
					// var cstring: string
					// cstring = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(150146, arr)
					// this.commonui.onhtmlShow(cstring, right.msg);
					break;
				default:
					break;
			}
			this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
			this._TipsMessageMediator.show();
			var param: Dictionary = new Dictionary();
			param.set("contentId", contentId);
			param.set("parame", parameArr);
			this._TipsMessageMediator.showContent(param);
			game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.rongyujiesuohuoban);
		}
		/**银币解锁*/
		public jiesuohuoban(): void {
			if (this.needyinbi > parseInt(this._viewUI.money_lab.text)) {// 银币解锁
				this.jinbiduihuan = new commonUI.JinBiBuZuViewMediator(this._viewUI, this._app);
				let yuanbao: number = (this.needyinbi - this.yinbinumber) / 10000;
				let jinbi: number = (this.needyinbi - this.yinbinumber) / 100;
				if (yuanbao > parseInt(yuanbao.toFixed(0))) {//银币元宝比例兑换
					yuanbao = parseInt(yuanbao.toFixed(0)) + 1;
				}
				else {
					yuanbao = parseInt(yuanbao.toFixed(0));
				}
				if (jinbi > parseInt(jinbi.toFixed(0))) {//银币金币比例兑换
					jinbi = parseInt(jinbi.toFixed(0)) + 1;
				}
				else {
					jinbi = parseInt(jinbi.toFixed(0));
				}
				this.exchangejinbi = jinbi;
				this.exchangeyuanbao = yuanbao;
				this.jinbiduihuan.onShow(false, (this.needyinbi - this.yinbinumber) + "", yuanbao + "", jinbi + "");
				this.jinbiduihuan.once(commonUI.USE_GOLD_EXCHANGE_EVENT, this, this.buyyinbi);
				this.jinbiduihuan.once(commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.yuanbaojiesuo);
				this.jinbiduihuan.once(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.buyjinbi);
			}
			else {
				RequesterProtocols._instance.c2s_CActive_HuoBan(this.huobanid, 1, this.currentselect);
				this.hide();
			}
		}
		/**荣誉解锁*/
		public rongyujiesuohuoban(): void {
			if (this.needrongyu > parseInt(this._viewUI.rongyu_lab.text)) {//荣誉是否足够
				this.tishi(150148);
			}
			else {
				RequesterProtocols._instance.c2s_CActive_HuoBan(this.huobanid, 0, this.currentselect);
				this.hide();
			}
		}
		/**
		 * 银币解锁伙伴
		 */
		public buyyinbi(): void {
			if (this.exchangejinbi <= BagModel.getInstance().globalIcon) {//银币是否足够
				RequesterProtocols._instance.c2s_exchange_currency(2, 1, this.exchangejinbi);
				bag.models.BagProxy.getInstance().once(bag.models.REFRESH_CURRENCY_EVENT, this, this.yinbijiesuo);
			}
			else {//调到其他元宝购买金币界面				
				this.exchangeyuanbao = (this.exchangejinbi - BagModel.getInstance().globalIcon) / 100;
				if (this.exchangeyuanbao >= parseInt(this.exchangeyuanbao.toFixed(0))) {//比例兑换
					this.exchangeyuanbao = parseInt(this.exchangeyuanbao.toFixed(0)) + 1;
				}
				else {
					this.exchangeyuanbao = parseInt(this.exchangeyuanbao.toFixed(0));
				}
				this.jinbiduihuan.onShow(true, (this.exchangejinbi - BagModel.getInstance().globalIcon) + "", this.exchangeyuanbao + "");
			}
		}
		/**银币解锁*/
		public yinbijiesuo(): void {
			RequesterProtocols._instance.c2s_CActive_HuoBan(this.huobanid, 1, this.currentselect);
			this.tishi(160403);
			this.hide();
		}
		/**
		 * 元宝解锁伙伴
		 */
		public yuanbaojiesuo(): void {
			if (this.exchangeyuanbao <= BagModel.getInstance().yuanbaoIcon) {//元宝是否足够
				RequesterProtocols._instance.c2s_exchange_currency(3, 1, this.exchangeyuanbao);
				bag.models.BagProxy.getInstance().once(bag.models.REFRESH_CURRENCY_EVENT, this, this.yinbijiesuo);
				RequesterProtocols._instance.c2s_CActive_HuoBan(this.huobanid, 1, this.currentselect);
			}
			else {//跳转到充值界面
				this.jinbiduihuan.hide();
				ModuleManager.jumpPage(ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
				game.modules.shop.models.ShopProxy._instance.event(game.modules.shop.models.Go_Charge);
			}
		}
		/**
		 * 金币兑换银币
		 */
		public buyjinbi(): void {
			var fuShiNum = HudModel.getInstance().fuShiNum;
			if (fuShiNum < this.exchangeyuanbao) {//元宝是否够
				this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
				this._TipsMessageMediator.show();
				var param: Dictionary = new Dictionary();
				param.set("contentId", 150506);
				this._TipsMessageMediator.showContent(param);
				game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
			} else {
				RequesterProtocols._instance.c2s_exchange_currency(3, 2, this.exchangeyuanbao);
			}
		}
		/**充值 */
		public goRecharge() {
			this.jinbiduihuan.hide();
			ModuleManager.jumpPage(ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
			game.modules.shop.models.ShopProxy._instance.event(game.modules.shop.models.Go_Charge);   //前往充值界面。关闭当前界
		}
		public show(): void {
			super.show();
		}
		/**不足提示*/
		public tishi(tishiid: number): void {
			var data = ChatModel.getInstance().chatMessageTips[tishiid];
			this._viewUI.msgTips_lab.text = data.msg;
			this._viewUI.msgTips1_img.visible = true;
			Laya.Tween.to(this._viewUI.msgTips1_img, { y: 450 }, 1000, null, Laya.Handler.create(this, function () {
				this._viewUI.msgTips1_img.visible = false; this._viewUI.msgTips1_img.x = 180; this._viewUI.msgTips1_img.y = 638;
			}), null, false);
		}
		/**兑换提示*/
		public duihuantishi(): void {
			this.tishi(160403);
		}
		public hide(): void {
			models.HuoBanProxy.getInstance().event(models.JIEMIANCHANGE_EVENT);
			super.hide();
		}
		public getView(): Sprite {
			return this._viewUI;
		}
	}
}