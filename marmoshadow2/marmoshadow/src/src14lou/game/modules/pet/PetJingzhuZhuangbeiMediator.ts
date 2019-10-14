/**
* 宠物精铸装备 
*/
module game.modules.pet {
	export class PetJingzhuZhuangbeiMediator extends game.modules.UiMediator {
		/**给list列表添加控件名字*/
		buweidata: Array<any> = [];
		/**宠物装备名字*/
		data: Array<string> = [];
		/**装备类型ID 0为全部 42为护环 58为宝坠 74项圈 106头冠*/
		typeid: Array<number> = [0, 106, 58, 74, 42];
		/**货币类型*/
		public huobiicon: Array<string> = ["common_yinb.png", "common_jinb.png", "yuanbao.png"];
		/**宠物地板图片*/
		public colour: Array<string> = ["baikuang.png", "lvkuang.png", "lankuang.png", "zikuang.png", "jinkuang.png"];
		/**精铸装备界面*/
		private _viewUI: ui.common.PetJingzhuZhuangbeiUI;
		/**兑换金币界面*/
		private change: game.modules.commonUI.ChangeMoneyViewMediator;
		/**消息提示*/
		private tips: game.modules.commonUI.DisappearMessageTipsMediator;
		/**所有装备的ID*/
		public equipid: Array<number> = [];
		/**所有装备的KEY*/
		public equipkey: Array<number> = [];
		/**所有装备的品质*/
		public equipnq: Array<number> = [];
		/**所有装备的部位ID*/
		public equipbuwei: Array<number> = [];
		/**第一件装备的ID*/
		public equip1id: number;
		/**第一件装备的KEY*/
		public equip1key: number;
		/**第一件装备的render*/
		public equip1box: Box;
		/**装备品质*/
		public equip1nq: number;
		/**部位ID*/
		public equip1buwei: number;
		/**第二件装备的ID*/
		public equip2id: number;
		/**第二件装备的KEY*/
		public equip2key: number;
		/**第二件装备的render*/
		public equip2box: Box;
		/**装备品质*/
		public equip2nq: number;
		/**部位ID*/
		public equip2buwei: number;
		/**上一次选择的box*/
		public scell: Box;
		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.PetJingzhuZhuangbeiUI();
			this._viewUI.mouseThrough = true;
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
			this._viewUI.select_box.on(LEvent.MOUSE_DOWN, this, this.yincang)
		}
		/**隐藏选择部位类型选项*/
		public yincang(): void {
			this._viewUI.select_box.visible = false
		}
		/**显示*/
		public show(): void {
			super.show();
			game.modules.bag.models.BagProxy.getInstance().on(game.modules.bag.models.REFRESH_CURRENCY_EVENT, this, this.showMoneyNumber);
			this.addbuweiname()
			this.init()
			this._viewUI.jingzhu_btn.clickHandler = new Laya.Handler(this, this.jingzhupetequip);
			this._viewUI.dhjinbi_btn.on(LEvent.MOUSE_DOWN, this, this.duihuan)
			game.modules.pet.models.PetProxy.getInstance().on(game.modules.pet.models.JINZHURESULT, this, this.result)
		}
		/**填充宠物装备部位名字*/
		public addbuweiname() {
			this.data = []
			this.buweidata = []
			for (var index = 11739; index <= 11743; index++) {
				let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[index]
				this.data.push(chattext.msg)
				this.buweidata.push({ buweiselect_btn: chattext.msg })
			}
		}
		/**初始化数据*/
		public init(): void {
			this.initequiplist();
			this._viewUI.buwei_list.array = this.buweidata;
			this._viewUI.buwei_list.vScrollBarSkin = "";
			this._viewUI.buwei_list.renderHandler = new Laya.Handler(this, this.initbuwei);
			this.equip1id = -1;
			this.equip1key = -1;
			this.equip2id = -1;
			this.equip2key = -1;
			this.equip1nq = -1;
			this.equip2nq = -1;
			this.equip1buwei = -1;
			this.equip2buwei = -1;
			this.equip1box = null;
			this.equip2box = null;
			this.scell = null;
			this._viewUI.needusejinbi_lab.text = 0 + "";
			this._viewUI.havejinbi_lab.text = game.modules.bag.models.BagModel.getInstance().globalIcon + ""
			this._viewUI.lvzhuang1_img.skin = "";
			this._viewUI.lvzhuang2_img.skin = "";
			this._viewUI.equip1_lab.text = "";
			this._viewUI.equip2_lab.text = "";
			this._viewUI.xiaochuzhuangbei1_btn.visible = false;
			this._viewUI.xiaochuzhuangbei2_btn.visible = false;
		}
		/**初始化装备*/
		public initequiplist(): void {
			let bag: game.modules.bag.models.BagVo = BagModel.getInstance().bagMap[BagTypes.BAG];
			this.equipid = [];
			this.equipkey = [];
			this.equipnq = [];
			this.equipbuwei = [];
			var data: Array<any> = [];
			let itemArrConfig = BagModel.getInstance().itemAttrData;
			for (let index in bag.items) {
				let item: ItemAttrBaseVo = itemArrConfig[bag.items[index].id];
				let itemtypeid = item["itemtypeid"];
				let itemtype: ItemTypeBaseVo = StrengTheningModel.getInstance().itemTypeData[itemtypeid] as ItemTypeBaseVo;
				if (this.typeid.indexOf(itemtypeid) != -1) {
					data.push({ kuang_img: "common/ui/tongyong/" + this.colour[item.nquality - 1], item_img: "common/icon/item/" + item.icon + ".png", name_lab: item.name, LV_lab: item.level, buweiname_lab: itemtype.name });
					this.equipid.push(item.id);
					this.equipkey.push(bag.items[index].key);
					this.equipnq.push(item.nquality);
					this.equipbuwei.push(itemtypeid);
				}
			}
			this.initPetZBList(data);
			this._viewUI.xiaochuzhuangbei1_btn.clickHandler = new Laya.Handler(this, this.delequip1);
			this._viewUI.xiaochuzhuangbei2_btn.clickHandler = new Laya.Handler(this, this.delequip2);
			this._viewUI.close_btn.clickHandler = new Laya.Handler(this, this.hide);
			this._viewUI.select_btn.clickHandler = new Laya.Handler(this, this.selectlist);
			this._viewUI.select_img.on(Laya.Event.MOUSE_DOWN, this, this.quitselect);
		}
		/** 宠物装备列表初始化 */
		private initPetZBList(data: Array<any>): void {
			this._viewUI.petzb_list.array = data;
			this._viewUI.petzb_list.repeatY = data.length;
			this._viewUI.petzb_list.vScrollBarSkin = "";
			this._viewUI.petzb_list.scrollBar.elasticBackTime = 200;
			this._viewUI.petzb_list.scrollBar.elasticDistance = 50;
			this._viewUI.petzb_list.renderHandler = new Laya.Handler(this, this.selectequip);
		}
		public hide(): void {
			super.hide();
			ModuleManager.show(ModuleNames.PET, this._app);
		}
		/**装备选择响应事件*/
		public selectequip(cell: Box, index: number): void {
			var petequip: Button = cell.getChildByName("hc_btn") as Button;
			var img: Laya.Image = cell.getChildByName("item_img") as Laya.Image;
			petequip.on(Laya.Event.CLICK, this, this.equipselect, [cell, index]);
		}
		/**宠物装备选择*/
		public equipselect(cell: Box, index: number): void {
			var img: Laya.Image = cell.getChildByName("item_img") as Laya.Image;
			var petequip: Button = cell.getChildByName("hc_btn") as Button;
			petequip.selected = true;
			if (this.scell != null) {
				var btn: Button = this.scell.getChildByName("hc_btn") as Button;
				btn.selected = false;
			}
			this.scell = cell;
			//选择两件装备key不能一样 当其中一个key为-1时说明该位置上没有选择装备
			if (this.equip1key == -1 && this.equipkey[index] != this.equip2key && (this.equipnq[index] == this.equip2nq || this.equip2nq == -1) && (this.equipbuwei[index] == this.equip2buwei || this.equip2buwei == -1)) {
				img.gray = true;
				this.equip1box = cell;
				this.equip1key = this.equipkey[index];
				this.equip1id = this.equipid[index];
				this.equip1nq = this.equipnq[index];
				this.equip1buwei = this.equipbuwei[index];
				let item: ItemAttrBaseVo = BagModel.getInstance().itemAttrData[this.equip1id];
				this._viewUI.normal1_img.skin = "common/ui/tongyong/" + this.colour[item.nquality - 1];
				this._viewUI.lvzhuang1_img.skin = "common/icon/item/" + item.icon + ".png";
				this._viewUI.equip1_lab.text = item.name;
				this._viewUI.xiaochuzhuangbei1_btn.visible = true;
			}
			else if (this.equip2key == -1 && this.equipkey[index] != this.equip1key && (this.equipnq[index] == this.equip1nq || this.equip1nq == -1) && (this.equipbuwei[index] == this.equip1buwei || this.equip1buwei == -1)) {
				img.gray = true;
				this.equip2box = cell;
				this.equip2key = this.equipkey[index];
				this.equip2id = this.equipid[index];
				this.equip2nq = this.equipnq[index];
				this.equip2buwei = this.equipbuwei[index];
				let item: ItemAttrBaseVo = BagModel.getInstance().itemAttrData[this.equip2id];
				this._viewUI.normal2_img.skin = "common/ui/tongyong/" + this.colour[item.nquality - 1];
				this._viewUI.lvzhuang2_img.skin = "common/icon/item/" + item.icon + ".png";
				this.equip2id = this.equipid[index];
				this._viewUI.equip2_lab.text = item.name;
				this._viewUI.xiaochuzhuangbei2_btn.visible = true;
			} else {
				if (img.gray) return;				// 如果选中变暗的则不提示
				let prompt = HudModel.getInstance().promptAssembleBack(191053);
				let disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
				disappearMsgTips.onShow(prompt);
			}
			this.cost();
		}
		/**删除选择的第一个装备*/
		public delequip1(): void {
			var img1: Laya.Image = this.equip1box.getChildByName("item_img") as Laya.Image;
			img1.gray = false;
			this.equip1key = -1;
			this.equip1id = -1;
			this.equip1nq = -1;
			this.equip1buwei = -1;
			this._viewUI.normal1_img.skin = "common/ui/tongyong/kuang94.png";
			this._viewUI.lvzhuang1_img.skin = "";
			this._viewUI.equip1_lab.text = "";
			this._viewUI.xiaochuzhuangbei1_btn.visible = false;
			this.cost();
		}
		/**删除选择的第二个装备*/
		public delequip2(): void {
			var img2: Laya.Image = this.equip2box.getChildByName("item_img") as Laya.Image;
			img2.gray = false;
			this.equip2key = -1;
			this.equip2id = -1;
			this.equip2nq = -1;
			this.equip2buwei = -1;
			this._viewUI.lvzhuang2_img.skin = "";
			this._viewUI.normal2_img.skin = "common/ui/tongyong/kuang94.png";
			this._viewUI.equip2_lab.text = "";
			this._viewUI.xiaochuzhuangbei2_btn.visible = false;
			this.cost();
		}
		/**精铸需要花费的金币*/
		public cost(): void {
			if (this.equip1key != -1 && this.equip2key != -1) {
				let equiphc: PetEquipHeChengBaseVo = PetModel.getInstance().petEquipHeChengData[this.equip1id] as PetEquipHeChengBaseVo;
				if (equiphc)
					this._viewUI.needusejinbi_lab.text = equiphc.money + "";
				else
					this._viewUI.needusejinbi_lab.text = 0 + "";
			}
			else {
				this._viewUI.needusejinbi_lab.text = 0 + "";
			}
		}
		public getView(): Sprite {
			return this._viewUI;
		}
		/**显示选择部位类型的列表*/
		public selectlist(): void {
			this._viewUI.select_box.visible = true;
		}
		/**隐藏选择部位类型的列表*/
		public quitselect(): void {
			this._viewUI.select_box.visible = false;
		}
		/**初始化所有宠物装备*/
		public initbuwei(cell: Box, index): void {
			let btn = cell.getChildByName("buweiselect_btn") as Button
			btn.on(LEvent.MOUSE_DOWN, this, this.selectbuwei, [index])
		}
		/**选择部位对应的所有宠物装备*/
		public selectbuwei(index: number): void {
			this._viewUI.select_box.visible = false;
			this._viewUI.select_btn.label = this.data[index];
			this.refreshdata(index);
		}
		/**刷新精铸装备的数据*/
		public refreshdata(index: number): void {
			this._viewUI.petzb_list.selectedIndex = -1;
			if (this.equip1box != null) {
				this.delequip1();
			}
			if (this.equip2box != null) {
				this.delequip2();
			}
			this.equip1box = null;
			this.equip2box = null;
			this.scell = null;
			this._viewUI.needusejinbi_lab.text = 0 + "";
			if (index == 0) {//0为显示全部装备数据
				this.initequiplist();
			}
			else {
				this.equipid = [];
				this.equipkey = [];
				this.equipnq = [];
				this.equipbuwei = [];
				let bag: game.modules.bag.models.BagVo = BagModel.getInstance().bagMap[BagTypes.BAG];				
				let data: Array<any> = [];
				for (var id = 0; id < bag.items.length; id++) {
					let item: ItemAttrBaseVo = BagModel.getInstance().itemAttrData[bag.items[id].id];
					if (item.itemtypeid == this.typeid[index]) {
						let itemtype: ItemTypeBaseVo = StrengTheningModel.getInstance().itemTypeData[item.itemtypeid] as ItemTypeBaseVo;
						data.push({ kuang_img: "common/ui/tongyong/" + this.colour[item.nquality - 1], item_img: "common/icon/item/" + item.icon + ".png", name_lab: item.name, LV_lab: item.level, buweiname_lab: itemtype.name });
						this.equipid.push(item.id);
						this.equipkey.push(bag.items[id].key);
						this.equipnq.push(item.nquality);
						this.equipbuwei.push(item.itemtypeid);
					}
				}
				this.initPetZBList(data);
			}
		}
		/**精铸装备*/
		public jingzhupetequip(): void {
			if (parseInt(this._viewUI.needusejinbi_lab.text) == 0) {//精铸金币显示为0时
				let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[150167];
				this.tips.onShow(chattext.msg);
				return;
			}
			if (parseInt(this._viewUI.needusejinbi_lab.text) > parseInt(this._viewUI.havejinbi_lab.text)) {//精铸金币不够时跳转
				//金币不足跳转金币兑换界面
				this.change = new game.modules.commonUI.ChangeMoneyViewMediator(this._viewUI, this._app);
				this.change.once(commonUI.CHANGEMONEY_CONFIRM_EVENT, this, this.onClickChangeMoneyConfirmBtnEvent)
				this.change.onShow(true, game.modules.bag.models.BagModel.getInstance().yuanbaoIcon, 100)
				return;
			}
			if (this.equip1key != -1 && this.equip2key != -1) {//key都不为-1时对应的装备显示灰色
				var img1: Laya.Image = this.equip1box.getChildByName("item_img") as Laya.Image;
				var img2: Laya.Image = this.equip2box.getChildByName("item_img") as Laya.Image;
				img1.gray = false
				img2.gray = false
				game.modules.bag.models.BagProxy.getInstance().once(game.modules.bag.models.REFRESH_BAG_DEPOT_COUNT, this, this.show)
				RequesterProtocols._instance.c2s_CHeChengPet_Equip(this.equip1key, this.equip2key);
			}
		}
		/**兑换界面*/
		public duihuan(): void {
			this.change = new game.modules.commonUI.ChangeMoneyViewMediator(this._viewUI, this._app);
			this.change.once(commonUI.CHANGEMONEY_CONFIRM_EVENT, this, this.onClickChangeMoneyConfirmBtnEvent)
			this.change.onShow(true, game.modules.bag.models.BagModel.getInstance().yuanbaoIcon, 100)
		}
		/**兑换界面*/
		private onClickChangeMoneyConfirmBtnEvent(parame): void {
			let type = parame.get("changetype");
			let changeNum = parame.get("changenum");
			if (type == MoneyTypes.MoneyType_SupFushi) {/** 元宝兑换金币 */
				RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_HearthStone, MoneyTypes.MoneyType_GoldCoin, changeNum);
			} else if (type == MoneyTypes.MoneyType_GoldCoin) {/** 金币兑换银币 */
				RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_GoldCoin, MoneyTypes.MoneyType_SilverCoin, changeNum);
			} else if (type == MoneyTypes.MoneyType_HearthStone) {/** 元宝兑换银币 */
				RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_HearthStone, MoneyTypes.MoneyType_SilverCoin, changeNum);
			}

		}
		/**精铸需要的金币数量*/
		public showMoneyNumber(): void {
			this._viewUI.havejinbi_lab.text = game.modules.bag.models.BagModel.getInstance().globalIcon + ""
		}
		public result(): void {
			this.init()
		}
	}
}