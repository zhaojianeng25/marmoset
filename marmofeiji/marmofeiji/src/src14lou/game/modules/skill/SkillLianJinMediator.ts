
module game.modules.skill {
	export class SkillLianJinMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.SkillLianJinUI;
		/**药店 */
		private _SkillShopMediator: game.modules.roleinfo.RoleShopMediator;
		/** 飘窗提示*/
		private tips: game.modules.commonUI.DisappearMessageTipsMediator;
		/**银币不足界面 */
		private _JinBiBuZuViewMediator: commonUI.JinBiBuZuViewMediator;
		/**页面提示 */
		private _TipsMessageMediator: game.modules.tips.TipsMessageMediator;
		/**活力 */
		private huoliNum: number = 0;
		/**当前选择下标 */
		private selectNum: number = 0;
		/**d道具表-复合 */
		private drugObj: Object;
		/** s食品表*/
		private foodObj: Object;
		/**药材 */
		private drugArr: Array<any>;
		/**背包物品*/
		private bagItemArr: Array<any>;
		/**药材图片 */
		private drugImgArr: Array<any>;
		/**药材数量 */
		private drugNumArr: Array<any>;
		/**拥有药材 */
		private haveDrugArr: Array<any>;
		/**拥有药材图片 */
		private hechengImgArr: Array<any>;
		/**合成栏物品 */
		private hechengArr: Array<any>;
		/**开关 */
		private flag: boolean = false;
		/** 用作存储合成药材数据的字典（所在合成药材列表位置作为字典的key，合成药材列表位置上的药材道具id作为字典的value） */
		private hechengDrugDataDic: Laya.Dictionary;
		/** 用作存储拥有药材数据的字典（药材道具id作为字典的key，所在拥有药材列表的位置以及当前药材剩余的数量作为字典的value） */
		private haveDrugDataDic: Laya.Dictionary;

		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.SkillLianJinUI();
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this.isCenter = true;
			this._app = app;
			this._SkillShopMediator = new game.modules.roleinfo.RoleShopMediator(this._app, shopType.DRUG_SHOP);
			this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
			this._JinBiBuZuViewMediator = new commonUI.JinBiBuZuViewMediator(this._viewUI, this._app);
			this.initialize();
			this.registerEvent();
			this.eventListener();
		}
		/**初始化 */
		public initialize(): void {
			this.drugArr = new Array<any>();
			this.bagItemArr = new Array<any>();
			this.drugImgArr = new Array<any>();
			this.drugNumArr = new Array<any>();
			this.haveDrugArr = new Array<any>();
			this.hechengImgArr = new Array<any>();
			this.hechengArr = new Array<any>();
			this.drugObj = BagModel.getInstance().itemAttrData;
			this.foodObj = SaleModel.getInstance().foodAndDrugEffectData;
			this.hechengDrugDataDic = new Laya.Dictionary();
			this.haveDrugDataDic = new Laya.Dictionary();
		}
		/**注册点击监听 */
		public registerEvent(): void {
			this._viewUI.lianJin_btn.on(LEvent.MOUSE_DOWN, this, this.clickLianJin);
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.close);
			this._viewUI.lock_btn.on(LEvent.CLICK, this, this.onLock);
			this._viewUI.select1_btn.on(LEvent.MOUSE_DOWN, this, this.onselect1);
			this._viewUI.select2_btn.on(LEvent.MOUSE_DOWN, this, this.onselect2);
		}
		/**注册事件监听 */
		public eventListener(): void {
			mainhud.models.HudProxy.getInstance().on(mainhud.models.SRefreshRoleData_EVENT, this, this.onRefreshRoleData);
			models.SkillProxy.getInstance().on(models.SLiveSkillMakeDrug_EVENT, this, this.onLiveSkillMakeDrug);
			bag.models.BagProxy.getInstance().on(bag.models.REFRESH_BAG_COUNT, this, this.initItem);
		}
		/**方式一 */
		public onselect1(): void {
			switch (this._viewUI.select1_btn.selected) {
				case true:
					this._viewUI.select2_btn.selected = true;
				case false:
					this._viewUI.select2_btn.selected = false;
			}
		}
		/**方式二 */
		public onselect2(): void {
			switch (this._viewUI.select2_btn.selected) {
				case true:
					this._viewUI.select1_btn.selected = true;
				case false:
					this._viewUI.select1_btn.selected = false;
			}
		}
		/**一键添加 */
		private onLock(): void {
			if (!this.flag) {/** 左关-->右开 */
				this._viewUI.opLock.play(null, false);
				this.flag = true;
				this.autoAddNeedDrug();
			} else if (this.flag) {/** 开-->关 */
				this._viewUI.clsoeLock.play(null, false);
				this.flag = false;
			}
			models.SkillModel.getInstance().isAutoAddNeedDrug = this.flag;
		}
		/** 自动添加炼金所需的药材 */
		private autoAddNeedDrug(): void {
			var _drugNumCount: number = 0;
			for (let i = 0; i < this.drugNumArr.length; i++) {
				_drugNumCount += this.drugNumArr[i];
				if (_drugNumCount >= 4) {
					break;
				}
			}
			let hechengNum:number = 0
			for(let i = 0; i < this.hechengArr.length; i++){
				if(this.hechengArr[i] != ""){
					hechengNum ++ ;
				}
			}
			let totalNum = hechengNum + Number(_drugNumCount);
			if (totalNum < 4) {
				return;
			}
			let stillNeedNum = totalNum - hechengNum;
			for (let i = 0; i < stillNeedNum; i++) {
				this.onSelect(0);
			}
		}
		/**刷新活力 */
		public onRefreshRoleData(e: any): void {
			this.huoliNum = HudModel.getInstance().energyNum;//活力
			this._viewUI.dangQianHuoLi_lab.text = this.huoliNum.toString();
		}
		// 制作药品返回
		public onLiveSkillMakeDrug(e: any): void {
			var data: hanlder.S2C_live_skillmakedrug = models.SkillModel.getInstance().SLiveSkillMakeDrugData.get("data");
			if (data.itemid != 0) {
				//生成栏显示获得物品图标
				this._viewUI.item5_img.skin = "common/icon/item/" + this.drugObj[data.itemid]["icon"] + ".png";
				//显示获得食物名称
				var param = [this.foodObj[data.itemid].name];
				let prompt = HudModel.getInstance().promptAssembleBack(SkillEnum.LIANYAO_SUCCESS, param);
				this.tips.onShow(prompt);
			}
			this.initItem()
		}
		/**初始化活力消耗 */
		public init(huoli: number): void {
			this._viewUI.xiaoHaoHuoLi_lab.text = huoli.toString();//消耗活力
			this.initItem();
		}

		/**点击炼金 */
		public clickLianJin(): void {
			var dangqianhuoli = parseInt(this._viewUI.dangQianHuoLi_lab.text);//当前活力
			var xiaohaohuoli = parseInt(this._viewUI.xiaoHaoHuoLi_lab.text);//消耗活力
			//活力不足
			if (dangqianhuoli < xiaohaohuoli) {
				let prompt = HudModel.getInstance().promptAssembleBack(SkillEnum.HUOLI_BUZU);
				this.tips.onShow(prompt);
			}
			//方式一
			if (this._viewUI.select1_btn.selected == true) {
				var data = [];
				for (var i: number = 0; i < this.hechengArr.length; i++) {
					if (this.hechengArr[i] != null) {
						data.push(this.hechengArr[i]["id"])
					}
				}
				if (data.length == 0 || data.length == 1) {//过滤掉没放材料，防止被服务器判断为消耗金币的炼金；也过滤掉只放一个材料，服务器会吞掉该材料，并下发协议告诉客户端炼金产生错误（参考SkillError）
					var msg = ChatModel.getInstance().chatMessageTips[160304]["msg"];
					var _disTipsMsg = new commonUI.DisappearMessageTipsMediator(this._app);
					_disTipsMsg.onShow(msg);
				}
				else {
					RequesterProtocols._instance.c2s_CLiveSkillMakeDrug(data);
				}
			}
			//方式二
			else if (this._viewUI.select2_btn.selected == true) {
				var needMoney = SkillEnum.LIANYAO_YINBI;
				//如果银币不够
				if (needMoney > HudModel.getInstance().sliverNum) {
					var duihuanMoney = needMoney - HudModel.getInstance().sliverNum;//需要兑换的钱
					this._JinBiBuZuViewMediator.onShow(false, duihuanMoney.toString(), Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI).toString(), Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI).toString());
					this._JinBiBuZuViewMediator.once(commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.buySliverFromYuanBao, [Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI)]);
					this._JinBiBuZuViewMediator.once(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.goCharge, [Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI)]);
				} else
					RequesterProtocols._instance.c2s_CLiveSkillMakeDrug([]);
			}
		}
		/**仙晶兑换 */
		public goCharge(yuanbao) {
			var fuShiNum = HudModel.getInstance().fuShiNum;
			//元宝不足
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
			//元宝不足
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
			ModuleManager.jumpPage(ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
			game.modules.shop.models.ShopProxy._instance.event(game.modules.shop.models.Go_Charge);   //前往充值界面。关闭当前界
		}
		/**初始化相关数据 */
		public initItem(): void {
			this.drugArr.length = 0;
			this.drugImgArr.length = 0;
			this.drugNumArr.length = 0;
			this.haveDrugArr.length = 0;
			this.hechengArr.length = 0;
			this.hechengImgArr.length = 0
			//存放药材信息
			for (var i: number = SkillEnum.DRUG_START; i < SkillEnum.DRUG_END; i++) {
				this.drugArr.push(this.drugObj[i]);
			}
			//初始化药材数量和图片
			for (var i: number = 0; i < this.drugArr.length; i++) {
				if (BagModel.getInstance().chargeItemNum(this.drugArr[i]["id"]) != 0) {
					this.haveDrugArr.push(this.drugArr[i]);
				}
			}
			for (var i: number = 0; i < this.haveDrugArr.length; i++) {
				this.drugImgArr.push({ img: "common/icon/item/" + this.haveDrugArr[i]["icon"] + ".png" });
				this.drugNumArr.push(BagModel.getInstance().chargeItemNum(this.haveDrugArr[i]["id"]));
			}
			//初始化剩余的格子图片
			for (var i: number = this.drugImgArr.length; i < 15; i++) {
				if (i == this.drugImgArr.length) {
					this.drugImgArr.push({ img: "common/ui/tongyong/huoban_jiahao.png" });
					this.drugNumArr.push("");
				}
				this.drugImgArr.push({ img: "" });
				this.drugNumArr.push("");
			}
			for (var i = 0; i < 4; i++) {
				this.hechengImgArr.push({ img: "" });
			}
			this.getListData();
			this.getHechengListData();
			this.flag = !models.SkillModel.getInstance().isAutoAddNeedDrug;
			this.onLock();
		}
		/**初始化药材列表 */
		public getListData(): void {
			this._viewUI.item_list.vScrollBarSkin = "";
			this._viewUI.item_list.scrollBar.elasticBackTime = 200;
			this._viewUI.item_list.scrollBar.elasticDistance = 50;
			this._viewUI.item_list.array = this.drugImgArr;
			this._viewUI.item_list.renderHandler = new Handler(this, this.onRender);
			this._viewUI.item_list.selectHandler = new Handler(this, this.onSelect);
		}
		/**渲染药材列表 */
		public onRender(cell: Laya.Box, index: number): void {
			var numLab: Laya.Label = cell.getChildByName("num_lab") as Laya.Label;
			var tubiaoImg: Laya.Image = cell.getChildByName("icon_img") as Laya.Image;
			tubiaoImg.skin = this.drugImgArr[index].img;
			if (this.drugNumArr[index] != 0)
				numLab.text = this.drugNumArr[index];
			else
				numLab.text = "";
		}
		/**处理药材列表点击 */
		public onSelect(index: number): void {
			if (index != -1) {
				if (this.drugImgArr[index].img == "") {
					return;
				}
				//如果点击加号图片，跳转到药材商店
				if (this.drugImgArr[index].img == "common/ui/tongyong/huoban_jiahao.png") {
					this._SkillShopMediator.show();
				}
			}
			//点击药材图片
			if (index != -1 && this.drugImgArr[index].img != "common/ui/tongyong/huoban_jiahao.png") {
				this.selectNum = index;
				var numLab: Laya.Label = this._viewUI.item_list.getCell(index).getChildByName("num_lab") as Laya.Label;
				var tubiaoImg: Laya.Image = this._viewUI.item_list.getCell(index).getChildByName("icon_img") as Laya.Image;
				//添加材料
				for (var i = 0; i < 4; i++) {
					if (this.hechengImgArr[i].img == "") {
						this.hechengImgArr[i] = { img: tubiaoImg.skin };
						this.hechengArr[i] = this.haveDrugArr[index];
						this.drugNumArr[index] -= 1;
						this.hechengDrugDataDic.set(i, this.hechengArr[i]["id"]);//保存下合成材料列表所添加的药材id
						break;
					}
					else if (i == 3 && this.hechengImgArr[3].img != "") {
						this.replaceDrug(index);
					}
				}
				//当前数量改变
				if (this.drugNumArr[index] == 0) {
					this.haveDrugArr[index] = null;
				}
				this.sort();
				this.getListData();
				this.getHechengListData();

			}
			this._viewUI.item_list.selectedIndex = -1;
		}
		/** 替换药草（当合成材料列表满的时候）
		 * @param index 最新点击拥有药材列表里的药材所在列表的位置索引
		 * @describe 先把合成材料列表中的药材依次点击下架
		 * 			再根据之前保存在字典hechengDrugDataDic中的药材id到haveDrugDataDic取出位置，除了第一个材料，是要被替换下来
		 * 			接着用位置点击拥有药材列表重新上架
		 * 			最后上架，替换上最新点击拥有药材列表里的药材
		 */
		private replaceDrug(index: number): void {
			for (let i = 3; i > -1; i--) {
				this.onHechengSelect(i);
			}
			var _tempDrugIdArr = [];
			for (let i = 1; i < this.hechengDrugDataDic.keys.length; i++) {
				_tempDrugIdArr.push(this.hechengDrugDataDic.get(this.hechengDrugDataDic.keys[i]));
			}
			var _tempHaveDrugLstPos;
			for (let i = 0; i < _tempDrugIdArr.length; i++) {
				_tempHaveDrugLstPos = this.haveDrugDataDic.get(_tempDrugIdArr[i])["listpos"];
				this.onSelect(_tempHaveDrugLstPos);
			}
			this.onSelect(index);
		}
		/**初始化合成材料列表 */
		public getHechengListData(): void {
			this._viewUI.drug_list.vScrollBarSkin = "";
			this._viewUI.drug_list.scrollBar.elasticBackTime = 200;
			this._viewUI.drug_list.scrollBar.elasticDistance = 50;
			this._viewUI.drug_list.array = this.hechengImgArr;
			this._viewUI.drug_list.renderHandler = new Handler(this, this.onHechengRender);
			this._viewUI.drug_list.selectHandler = new Handler(this, this.onHechengSelect);
		}
		/**渲染材料列表 */
		public onHechengRender(cell: Laya.Box, index: number): void {
			var tubiaoImg: Laya.Image = cell.getChildByName("drug_img") as Laya.Image;
			tubiaoImg.skin = this.hechengImgArr[index].img;
			if (index == 0 && tubiaoImg.skin != "") {
				this._viewUI.item5_img.skin = "";
			}
		}
		/**处理材料列表点击 */
		public onHechengSelect(index: number): void {
			//减少材料
			if (index != -1) {
				if (this.hechengImgArr[index].img == "") {
					return;
				}
				var key = false;
				for (var i: number = 0; i < this.drugImgArr.length; i++) {
					//将材料列表的材料退回到对应的药材列表中
					if (this.hechengImgArr[index].img == this.drugImgArr[i].img) {
						this.drugNumArr[i] += 1;
						this.haveDrugDataDic.set(this.hechengArr[index]["id"], { listpos: i, lastnum: this.drugNumArr[i] });
						key = true;
					}
				}
				if (!key) {
					for (var i: number = 0; i < this.haveDrugArr.length; i++) {
						if (this.haveDrugArr[i] == null) {
							this.haveDrugArr[i] = this.hechengArr[index];
							this.drugNumArr[i] += 1;
							this.haveDrugDataDic.set(this.hechengArr[index]["id"], { listpos: i, lastnum: this.drugNumArr[i] });
							break;
						}
					}
				}
				this.hechengImgArr[index] = { img: "" };
				this.hechengArr[index] = null;
				this.sort();
				this.sortHecheng();
				this.getHechengListData();
				this.getListData();
				this._viewUI.drug_list.selectedIndex = -1;
			}
		}
		/**拥有药材排序 */
		public sort(): void {
			this.drugImgArr.length = 0;
			for (var i: number = 0; i < this.haveDrugArr.length; i++) {
				if (this.haveDrugArr[i] == null) {
					if (i + 1 < this.haveDrugArr.length) {
						this.haveDrugArr[i] = this.haveDrugArr[i + 1];
						this.haveDrugArr[i + 1] = null;
						this.drugNumArr[i] = this.drugNumArr[i + 1];
						this.drugNumArr[i + 1] = 0;
					}
				}
			}
			for (var i: number = 0; i < this.haveDrugArr.length; i++) {
				if (this.haveDrugArr[i] != null)
					this.drugImgArr.push({ img: "common/icon/item/" + this.haveDrugArr[i]["icon"] + ".png" });
			}
			for (var i: number = this.haveDrugArr.length; i < this.haveDrugArr.length + 15; i++) {
				if (i == this.haveDrugArr.length) {
					this.drugImgArr.push({ img: "common/ui/tongyong/huoban_jiahao.png" });
					this.drugNumArr.push("");
				}
				this.drugImgArr.push({ img: "" });
				this.drugNumArr.push("");
			}
		}
		/**合成列表排序 */
		public sortHecheng(): void {
			for (var i = 0; i < 4; i++) {
				if (this.hechengImgArr[i].img == "") {
					if (i + 1 < 4) {
						this.hechengImgArr[i].img = this.hechengImgArr[i + 1].img;
						this.hechengImgArr[i + 1].img = "";
						this.hechengArr[i] = this.hechengArr[i + 1];
						this.hechengArr[i + 1] = null;
					}
				}
			}
		}
		public hide(): void {
			this._viewUI.item5_img.skin = "";
			super.hide();
		}
		public close(): void {
			this.hide();
			skill.models.SkillModel.getInstance().currenTabNum = SkillEnum.LIFE_KEY;
			ModuleManager.show(ModuleNames.SKILL, this._app);
		}
		public show(): void {
			super.show();
		}
		public getView(): Sprite {
			return this._viewUI;
		}
	}
}