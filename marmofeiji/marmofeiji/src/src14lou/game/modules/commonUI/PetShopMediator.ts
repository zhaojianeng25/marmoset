/**
* 宠物商店
*/
module game.modules.commonUI {
	export class PetShopMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.PetShopUI;
		/**兑换界面*/
		private change: game.modules.commonUI.JinBiBuZuViewMediator;
		/**消息提示*/
		private tips: game.modules.commonUI.DisappearMessageTipsMediator;
		/**宠物等级类型*/
		private idlist: Array<number> = [0, 15, 25, 35, 45, 55, 65, 75, 80, 85, 90, 95]
		/**弹出类型的tips */
		private _TipsMessageMediator: game.modules.tips.TipsMessageMediator;
		/**当前选择级别*/
		public currentselect: number = 0;
		/**模型*/
		public model: ModelsCreate;
		/**上次选择级别*/
		private lastbox: Box = null;
		/**商品id列表*/
		private goodsidlist: Array<number> = [];
		/**购买的宠物id*/
		private selectbuypet: number = -1;
		/**上次选择的宠物*/
		private lastpetbox: Box = null;
		/**当前选择的宠物*/
		public currentpetselect: number = -1;
		/**任务宠物id*/
		public taskpetid: number = null;
		/**第几个宠物*/
		public nums: number = null
		/**延迟时间*/
		public delaytimer: number
		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.PetShopUI();
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this._viewUI.close_btn.on(LEvent.CLICK, this, this.hide);
			this._viewUI.buy_btn.on(LEvent.CLICK, this, this.buypet)
			this.model = new ModelsCreate()
			this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
		}
		modelcreate(modelid: number, pos: number): void {//第几个
			this.model.modelcreate(modelid + "", -100, -110, -80, 90)
			this.model.mouseEnabled = false;
			this.model.mouseThrough = true;
			this._viewUI.addChild(this.model)
		}
		public init(petid?: number, nums?: number): void {	//若有任务宠物要求，则需要传宠物id  判断是否需要显示需求图标
			this.show();
			mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
			if (petid) {//若有任务宠则设置
				this.taskpetid = petid;
				this.nums = nums
				this.setcurrentselect(petid);
			}
			this._viewUI.havemoney_lab.text = game.modules.bag.models.BagModel.getInstance().sliverIcon + "";
			var levellist: Array<any> = []
			for (var index = 0; index < this.idlist.length; index++) {
				let petdata: CPetShopBaseVo = game.modules.pet.models.PetModel.getInstance().cPetShopData[this.idlist[index]]
				if (petdata.limitLookLv > game.modules.mainhud.models.HudModel.getInstance().levelNum)
					break;
				let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[3]
				levellist.push({ petlevel_btn: petdata.showLv + chattext.msg })
			}
			this._viewUI.petlevel_list.array = levellist;
			this._viewUI.petlevel_list.vScrollBarSkin = "";
			this._viewUI.petlevel_list.repeatY = levellist.length / 2
			this._viewUI.petlevel_list.scrollBar.elasticBackTime = 200;
			this._viewUI.petlevel_list.scrollBar.elasticDistance = 50;
			this._viewUI.petlevel_list.renderHandler = new Laya.Handler(this, this.selectlevel);
			this._viewUI.petlevel_list.scrollBar.setScroll(0, 91 * levellist.length / 2, 91 * (this.currentselect - 1) / 2)
			if (AutoHangUpModels.getInstance().autotask == 1) {//自动任务
				this.delaytimer = 0
				Laya.timer.loop(1000, this, this.delaybuypet)
			};
		}
		/**当前任务的宠物ID*/
		public setcurrentselect(petid: number): void {
			let petinfo: PetCPetAttrBaseVo = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[petid];
			for (var index = 0; index < this.idlist.length; index++) {
				if (petinfo.uselevel == this.idlist[index]) {
					this.currentselect = index;
					break;
				}
			}
		}
		public selectlevel(cell: Box, index: number) {
			let btn: Button = cell.getChildByName("petlevel_btn") as Button;
			if (index == this.currentselect) {
				this.showpet(cell, index);
				this.currentselect = -1;
			}
			btn.on(LEvent.MOUSE_DOWN, this, this.showpet, [cell, index]);
		}
		/**选择要购买的宠物*/
		public showpet(cell: Box, index: number): void {
			this.selectbuypet = -1;
			let petinfo: Array<any> = []
			this._viewUI.cosmoney_lab.text = 0 + "";
			if (this.lastpetbox) {
				let lastbtn: Button = this.lastpetbox.getChildByName("pet_btn") as Button
				lastbtn.selected = false
				this.lastpetbox = null;
			}
			if (this.lastbox) {
				let lastbtn: Button = this.lastbox.getChildByName("petlevel_btn") as Button;
				lastbtn.selected = false;
			}
			let btn: Button = cell.getChildByName("petlevel_btn") as Button;
			btn.selected = true;
			this.lastbox = cell;
			let shopinfo: CPetShopBaseVo = game.modules.pet.models.PetModel.getInstance().cPetShopData[this.idlist[index]]
			this.goodsidlist = shopinfo.goodsids;
			for (var num = 0; num < shopinfo.goodsids.length; num++) {
				let goodsinfo: CGoodsBaseVo = ShopModel.getInstance().GoodsBinDic[shopinfo.goodsids[num]]
				let petdata: PetCPetAttrBaseVo = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[goodsinfo.itemId];
				if (goodsinfo.itemId == this.taskpetid) {
					if (this.currentselect != -1) {
						this.currentpetselect = num;
					}
					if (this.nums)
						petinfo.push({ petname_lab: petdata.name, cos_lab: goodsinfo.prices[0], needpet_img: "common/ui/tongyong/shop_xuqiu.png" })
					else
						petinfo.push({ petname_lab: petdata.name, cos_lab: goodsinfo.prices[0], needpet_img: "" })
				}
				else {
					petinfo.push({ petname_lab: petdata.name, cos_lab: goodsinfo.prices[0], needpet_img: "" })
				}
				this._viewUI.pet_list.addChild(this.model)
			}
			this._viewUI.pet_list.array = petinfo;
			this._viewUI.pet_list.hScrollBarSkin = "";
			this._viewUI.pet_list.repeatX = petinfo.length
			this._viewUI.pet_list.scrollBar.elasticBackTime = 200;
			this._viewUI.pet_list.scrollBar.elasticDistance = 50;
			this._viewUI.pet_list.renderHandler = new Laya.Handler(this, this.selectpetinit);
			this._viewUI.pet_list.scrollBar.setScroll(0, 216 * petinfo.length, 216 * this.currentpetselect)
		}
		/**响应事件处理*/
		public selectpetinit(cell: Box, index: number): void {
			let btn: Button = cell.getChildByName("pet_btn") as Button
			if (index == this.currentpetselect) {//是否是当前选择
				this.selectpet(cell, index);
				this.currentpetselect = -1;
			}
			btn.on(LEvent.MOUSE_DOWN, this, this.selectpet, [cell, index]);
		}
		/**按钮响应*/
		public selectpet(cell: Box, index: number): void {
			if (this.lastpetbox) {
				let lastbtn: Button = this.lastpetbox.getChildByName("pet_btn") as Button
				lastbtn.selected = false
			}
			let btn: Button = cell.getChildByName("pet_btn") as Button
			btn.selected = true;
			this.lastpetbox = cell;
			this.selectbuypet = index;
			let goodsinfo: CGoodsBaseVo = ShopModel.getInstance().GoodsBinDic[this.goodsidlist[index]]
			this._viewUI.cosmoney_lab.text = goodsinfo.prices[0] + "";
		}
		/**购买宠物*/
		public buypet(): void {
			if (this.selectbuypet == undefined || this.selectbuypet == -1) {
				let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[150500];
				this.tips.onShow(chattext.msg);
				return;
			}
			let goodsinfo: CGoodsBaseVo = ShopModel.getInstance().GoodsBinDic[this.goodsidlist[this.selectbuypet]]
			let petdata: PetCPetAttrBaseVo = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[goodsinfo.itemId];
			if (HudModel.getInstance().levelNum < petdata.uselevel) {
				let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[160250];
				this.tips.onShow(chattext.msg);
			} else if (parseInt(this._viewUI.cosmoney_lab.text) <= parseInt(this._viewUI.havemoney_lab.text) && parseInt(this._viewUI.havemoney_lab.text) != 0) {//可以购买
				if (this.taskpetid) {
					this.hide()
				}
				game.modules.pet.models.PetProxy.getInstance().off(game.modules.pet.models.ADD_EVENT, this, this.refresh)
				game.modules.pet.models.PetProxy.getInstance().once(game.modules.pet.models.ADD_EVENT, this, this.refresh)
				RequesterProtocols._instance.c2s_buy_npcshop(4, this.goodsidlist[this.selectbuypet], 1, 2);
			} else {//银币不够需跳转到银币兑换界面
				this.change = new game.modules.commonUI.JinBiBuZuViewMediator(this._viewUI, this._app);
				var duihuanMoney = parseInt(this._viewUI.cosmoney_lab.text) - parseInt(this._viewUI.havemoney_lab.text)
				this.change.onShow(false, duihuanMoney.toString(), Math.ceil(duihuanMoney / 10000).toString(), Math.ceil(duihuanMoney / 100).toString())
				this.change.once(commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.buySliverFromYuanBao, [Math.ceil(duihuanMoney / 10000)]);
				this.change.once(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.goCharge, [Math.ceil(duihuanMoney / 10000)]);
				this.change.once(commonUI.USE_GOLD_EXCHANGE_EVENT, this, this.jinbiDuihuan);
			}
		}
		/**刷新*/
		public refresh(): void {
			let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[150501];
			let goodsinfo: CGoodsBaseVo = ShopModel.getInstance().GoodsBinDic[this.goodsidlist[this.selectbuypet]]
			let petdata: PetCPetAttrBaseVo = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[goodsinfo.itemId];
			this.tips.onShow(game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(chattext.msg, petdata.name, 11));
			this._viewUI.havemoney_lab.text = game.modules.bag.models.BagModel.getInstance().sliverIcon + "";
		}
		/**金币兑换银币成功 */
		public jinbiDuihuan() {
			//直接购买宠物		
			RequesterProtocols._instance.c2s_buy_npcshop(4, this.goodsidlist[this.selectbuypet], 1, 2);
		}
		/**仙晶兑换 */
		public goCharge(yuanbao) {
			var fuShiNum = HudModel.getInstance().fuShiNum;
			if (fuShiNum < yuanbao) {
				this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
				this._TipsMessageMediator.show();
				var param: Dictionary = new Dictionary();
				param.set("contentId", 150506);
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
				param.set("contentId", 150506);
				this._TipsMessageMediator.showContent(param);
				game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
			} else {
				RequesterProtocols._instance.c2s_exchange_currency(3, 1, yuanbao);
				//直接购买宠物			
				RequesterProtocols._instance.c2s_buy_npcshop(4, this.goodsidlist[this.selectbuypet], 1, 2);
			}

		}
		/**充值 */
		public goRecharge() {
			this.change.hide();
			ModuleManager.jumpPage(ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
			game.modules.shop.models.ShopProxy._instance.event(game.modules.shop.models.Go_Charge);   //前往充值界面。关闭当前界
		}
		public show() {
			super.show();
		}
		public hide(): void {
			super.hide();
			game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.CLOSEVIEW_EVENT);
			this.taskpetid = null
			if (game.modules.createrole.models.LoginModel.getInstance().CommonPage) {
				ModuleManager.show(game.modules.createrole.models.LoginModel.getInstance().CommonPage, this._app)
				game.modules.createrole.models.LoginModel.getInstance().CommonPage = "";
			}
			else {
				if (AutoHangUpModels.getInstance().autotask == 0) {
					AutoHangUpModels.getInstance().notaketimer = 0
					AutoHangUpModels.getInstance().istaskwalk = 0
				}
				game.modules.mainhud.models.HudModel.getInstance().autobatt.init()
			}
		}
		public getView(): Sprite {
			return this._viewUI;
		}
		public delaybuypet(): void {
			this.delaytimer++
			if (this.delaytimer >= 2) {
				Laya.timer.clear(this, this.delaybuypet)
				this.buypet()
			}
		}
	}
}