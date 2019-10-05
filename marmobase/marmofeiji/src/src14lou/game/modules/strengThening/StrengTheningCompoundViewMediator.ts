
import ComposeGemInfoBeanVo = game.modules.strengThening.models.ComposeGemInfoBeanVo;
module game.modules.strengThening {
	/** 宝石合成 */
	export class StrengTheningCompoundViewMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.StrengTheningCompoundUI;
		private ChangeMoneyViewMediator: game.modules.commonUI.ChangeMoneyViewMediator;
		/**宝石表 */
		gemEffectData = StrengTheningModel.getInstance().gemEffectData;
		/**宝石类型表 */
		gemTypeData = StrengTheningModel.getInstance().gemTypeData;
		/**装备-宝石-复合表 */
		itemAttrData = BagModel.getInstance().itemAttrData;
		/** 道具合成表*/
		cequipCombinData = StrengTheningModel.getInstance().cequipCombinData;
		/**商品表、根据物品id存储的 */
		cGoodsDataForItemId = ShopModel.getInstance().cGoodsDataForItemId;
		/**选择拥有的宝石 */
		haveGemDictionary: Dictionary = new Dictionary();
		/**选择购买的宝石 */
		buyGemDictionary: Dictionary = new Dictionary();//key是宝石类型，例如：0为一级宝石，1为二级宝石；value是[需要个数, 剩余个数]
		/**宝石类型列表数据 */
		gemTypeArr: Array<any> = [];
		/**合成宝石 */
		hcgemArr: Array<any> = [];
		/**拥有宝石列表 */
		haveGemArr: Array<any> = [];
		allSelectNum = 0;
		// selectGem = 0;
		selectBuyGem = 0;
		/**商会购买宝石列表 */
		GemShopArr: Array<any> = [];
		allShopGemNum = 0;
		/**拥有的宝石 */
		m_gem = [];
		/**当前先择合成的宝石类型 */
		gemType = 0;
		/**当前先择合成的宝石定位id */
		nitemid = 0;
		/**当前选择的宝石类型的列表的index */
		gemTypeListIndex = 0;
		/** 当前先择的宝石列表的cell，用于显示点击特效 */
		bgBtn: Laya.Box = null;
		// /** 判断在购买宝石是否减少 */
		// private isReduce:boolean = false;
		/** 当前正使用的融合剂道具id */
		private mixItemid: number = 0;

		constructor(uiLayer: Sprite, app: AppBase) {
			super(uiLayer);
			this._viewUI = new ui.common.StrengTheningCompoundUI();
			this.isCenter = false;
			this._app = app;
			this.initGemTypeListsData();
			this._viewUI.gemType_box.visible = false;
			this._viewUI.material_box.visible = false;
			this._viewUI.compound_box.x = 66;
			this.getGentype(0);
			this._viewUI.selectGem_btn.on(LEvent.MOUSE_DOWN, this, this.onSelectGemBtn);
			this._viewUI.compound_btn.on(LEvent.MOUSE_DOWN, this, this.onCompoundBtn);
			this._viewUI.addMoney_btn.on(LEvent.MOUSE_DOWN, this, this.addMoney);
			this._viewUI.hcitem3_img.on(LEvent.MOUSE_DOWN, this, this.showItemIfo);
			StrengTheningModel._instance.inintHaveMoney(this._viewUI.haveMoney_lab);
			this.CRequstShopPrice();
		}
		/** 显示道具的信息 */
		private showItemIfo(): void {
			if (this.mixItemid != 0) {
				let parame = new Laya.Dictionary();
				parame.set("itemId", this.mixItemid);
				let _tipsModule = new tips.tipsModule(this._viewUI,this._app,TIPS_TYPE.commonItem,parame);
			}
		}
		/** 刷新银币 */
		private redreshYinBi(): void {
			StrengTheningModel._instance.inintHaveMoney(this._viewUI.haveMoney_lab);
			this.judgeMoneyIsEnough(this._viewUI.needMoney_lab);
		}

		/**显示兑换银币界面 */
		public addMoney() {
			this.ChangeMoneyViewMediator = new game.modules.commonUI.ChangeMoneyViewMediator(this._viewUI, this._app);
			this.ChangeMoneyViewMediator.onShowInModule(ModuleNames.STRENG_THENING, false, game.modules.bag.models.BagModel.getInstance().yuanbaoIcon, game.modules.bag.models.BagModel.getInstance().globalIcon);
		}

		/**初始化宝石类型列表 */
		public initGemTypeListsData(): void {
			// this._viewUI.gemType_box.visible = true;
			for (let i: number = 1; i <= 9; i++) {
				let strname = this.gemTypeData[i].strname;  //宝石类型名称
				let stradddes = this.gemTypeData[i].stradddes;  //提升文本
				let nicon = this.gemTypeData[i].nicon;   //图标
				let gemIcon = "common/icon/item/" + nicon + ".png";    //资源路径
				let nitemid = this.gemTypeData[i].nitemid;       //定位物品id
				let ngemtype = this.gemEffectData[nitemid].ngemtype   //宝石类型
				this.gemTypeArr.push({ gemName_label: strname, gemAttribute_label: stradddes, gemIcon_img: gemIcon, nitemid: nitemid, ngemtype: ngemtype });
			}
		}

		/**选择宝石 */
		public onSelectGemBtn(): void {
			if (this._viewUI.gemType_box.visible) {
				this._viewUI.gemType_box.visible = false;
			} else {
				this._viewUI.gemType_box.visible = true;
			}
			let gemType_list = this._viewUI.gemType_list;
			this.showList(gemType_list, this.gemTypeArr);
			this._viewUI.gemType_list.selectHandler = new Handler(this, this.gemTypeSelect);
		}

		/**宝石类型选择 */
		public gemTypeSelect(index: number): void {
			this.initHaveEqu();
			this.requestShopLimit();
			this.gemTypeListIndex = index;
			this.clean();
			this.getGentype(index);
			this._viewUI.gemType_box.visible = false;
			let nitemid = this.gemTypeArr[index].nitemid;   //定位物品id
			let gemIcon_img = this.gemTypeArr[index].gemIcon_img;  //皮肤
			this.hcgemArr = [];
			for (let i: number = 1; i <= 12; i++) {
				let gemid = nitemid + i;
				//  console.log("宝石id：",gemid);
				let gemEffect = this.gemEffectData[gemid];
				let name = gemEffect.name;   //宝石显示名
				let effectdes = gemEffect.effectdes;  //功能说明
				let nquality = this.itemAttrData[gemid].nquality;   //宝石颜色品质
				let frame_img = StrengTheningModel._instance.frameSkinArr[nquality - 1];
				let level = gemEffect.level;
				this.hcgemArr.push({ name_lab: name, attribute_lab: effectdes, gemIcon_img: gemIcon_img, frame_img: frame_img, gemId: gemid, level: level });
			}
			this.showbuyGem_list(index, nitemid);
			this.showHaveGemLsit(index);
			this.showList(this._viewUI.hcOneTypeGem_lsit, this.hcgemArr);
			this._viewUI.hcOneTypeGem_lsit.selectHandler = new Handler(this, this.onHcOneTypeGemlist, [index, nitemid]);
			let _ngemtype = this.gemTypeArr[index].ngemtype;
			this._viewUI.hcOneTypeGem_lsit.renderHandler = new Handler(this, this.HcOneTypeGemlistRender, [_ngemtype]);
			this.nitemid = nitemid;
			this.gemType = index;
			//game.modules.shop.models.ShopProxy._instance.once(game.modules.shop.models.QUERYLIMIT_EVENT, this, this.showbuyGem_list, [index, nitemid]);
			this.onHcOneTypeGemlist(index, nitemid, 0);
			this._viewUI.hcOneTypeGem_lsit.selectedIndex = 0;
			this.onBgBtn(0, this._viewUI.hcOneTypeGem_lsit.getCell(0));
		}

		/**显示同一类型的宝石 */
		public HcOneTypeGemlistRender(ngemtype, cell: Box, index) {
			let bgBtn = cell.getChildByName("gem_btn") as Button;
			let point_img = cell.getChildByName("point_img") as Laya.Image;
			point_img.visible = false;
			bgBtn.on(LEvent.MOUSE_DOWN, this, this.onBgBtn, [index, cell]);
			let gemid = this.hcgemArr[index].gemId;   //当前宝石id
			let hcNeedGemid = this.cequipCombinData[gemid].lastequipid;   //合成当前宝石需要的宝石id
			let haveGem = this.getTypeHaveGemList(ngemtype);  //拥有的当前类型的宝石
			for (let i in haveGem) {
				let itemid = haveGem[i].itemId;
				if (hcNeedGemid == itemid) {
					let itemNum = haveGem[i].itemNum;
					if (itemNum >= 2) {
						point_img.visible = true;
					}
				}
			}
		}

		/**点击特效 */
		public onBgBtn(index, cell) {
			let bgBtn: Button = cell.getChildByName("gem_btn") as Button;
			bgBtn.selected = true;
			if (this.bgBtn == null) {
				this.bgBtn = cell;
				return;
			}
			if (this.bgBtn != cell) {
				let btnLeft: Button = this.bgBtn.getChildByName("gem_btn") as Button;
				btnLeft.selected = false;
				this.bgBtn = cell;
			}
		}

		/**宝石选择 */
		public onHcOneTypeGemlist(gemType, nitemid, index: number) {
			this.clean();
			// if(index == 0){
			// 	let gem_btn:Button = this._viewUI.hcOneTypeGem_lsit.getCell(index).getChildByName("gem_btn") as Button;
			// 	gem_btn.selected = true;
			// }
			// else{
			// 	let gem_btn:Button = this._viewUI.hcOneTypeGem_lsit.getCell(0).getChildByName("gem_btn") as Button;
			// 	gem_btn.selected = false;
			// }
			this._viewUI.hcframe_img.skin = this.hcgemArr[index].frame_img;
			this._viewUI.gemIcon_img.skin = this.hcgemArr[index].gemIcon_img;
			this._viewUI.hcgemName_label.text = this.hcgemArr[index].name_lab;
			let gemid = this.hcgemArr[index].gemId;   //当前宝石id
			let level = this.hcgemArr[index].level;
			let hcNeedGemid = this.cequipCombinData[gemid].lastequipid;   //合成当前宝石需要的宝石id
			let needgemData = this.gemEffectData[hcNeedGemid];
			let name = needgemData.name;
			let nquality = this.itemAttrData[hcNeedGemid].nquality;   //宝石颜色品质
			let frame_img = StrengTheningModel._instance.frameSkinArr[nquality - 1];
			let hechengrate = this.cequipCombinData[hcNeedGemid].hechengrate;  //合成当前宝石需要的宝石的合成概率
			let ngemtype = this.gemEffectData[hcNeedGemid].ngemtype;
			let nicon = this.gemTypeData[ngemtype].nicon;
			let gemIcon_img = "common/icon/item/" + nicon + ".png";
			this._viewUI.hcframe2_img.skin = frame_img;
			this._viewUI.gemIcon2_img.skin = gemIcon_img;
			this._viewUI.hcgemName2_label.text = name;
			this._viewUI.rate_label.text = hechengrate + "%";
			this._viewUI.needhammernum_label.visible = false;
			this._viewUI.slash_lab.visible = false;
			this._viewUI.havehammernum_label.visible = false;
			this._viewUI.hcitem3_img.skin = "";
			this._viewUI.hcframe3_img.skin = "common/ui/tongyong/baikuang.png";
			let needGemNum = Math.round(Math.pow(2, level - 1));
			this._viewUI.hcneedNum_lab.text = needGemNum + "";
			let havegemNum = this.getHaveGemNum(hcNeedGemid);
			if (havegemNum > 0) {
				this._viewUI.gemHaveNum_label.text = havegemNum;         //当前合成拥有的宝石的数量
			} else {
				this._viewUI.gemHaveNum_label.text = "0";
			}
			this.hcNeedhammer(gemid, hechengrate);
			this._viewUI.hchaveNum_label.text = "0";
			this.selectCompoundGem(gemType, nitemid, hcNeedGemid)
		}

		/**自动选择合成当前宝石需要的宝石
		 * @param gemType
		 * @param nitemid
		 * @param hcNeedGemid 合成目标高级宝石所需最近的低一级宝石的id
		 */
		public selectCompoundGem(gemType, nitemid, hcNeedGemid) {
			/** 宝石类型 */
			let _ngemtype = this.gemTypeArr[gemType].ngemtype;
			/** 玩家拥有这一类型的所有宝石数据 */
			let returnHaveGem = this.getTypeHaveGemList(_ngemtype);
			/** 合成宝石需要1级宝石的数量 */
			let hcneedNum = parseInt(this._viewUI.hcneedNum_lab.text);
			/** 合成所需最近低一级宝石的等级 */
			let needGemLevel = this.gemEffectData[hcNeedGemid]["level"];
			/** 宝石表字典的key的数组 */
			let gemDicKeys = Object.keys(this.gemEffectData);
			/** 临时存放宝石道具数据的数组 */
			let gemItemData = [];
			for (let k = 0; k < gemDicKeys.length; k++) {//遍历宝石表
				if (this.gemEffectData[gemDicKeys[k]]["ngemtype"] == _ngemtype) {//如果与合成所需用的宝石类型相等
					gemItemData.push(this.gemEffectData[gemDicKeys[k]]);
				}
			}
			if (returnHaveGem.length > 0) {  //有宝石
				this.countIsEnough(needGemLevel, hcneedNum, gemItemData, returnHaveGem);
			} else { //没有当前类型的宝石，通过商会购买宝石合成
				this.countIsLack_and_revise(needGemLevel, this.getGemNum(this.gemEffectData[hcNeedGemid]["level"] + 1), gemItemData);
			}
		}
		/**
		 * 计算商店补足合成宝石所缺少的并修正
		 * @param needGemLevel 合成所需最高的宝石的等级
		 * @param hcneedNum 还需要多少一级宝石来合成的数量
		 * @param gemItemData	某一类的宝石数据
		 */
		private countIsLack_and_revise(needGemLevel: number, hcneedNum: number, gemItemData: any): void {
			if (hcneedNum <= 0) {//可能需要商会补足的一级宝石数量小于等于0，因为背包有足够的宝石用来合成
				hcneedNum = 0;
			}
			for (let index = 0; index < 3; index++) {
				this.initGemSelectState(this._viewUI.buyGem_list.getCell(index));
			}
			this.GemShopArr;
			let _cell;
			for (let i = this.GemShopArr.length - 1; i > -1; i--) {
				_cell = this._viewUI.buyGem_list.getCell(i);
				let gemlevel = this.GemShopArr[i]["level"];//从高等级宝石开始获得其对应的宝石等级
				//预计需要购买到的数量
				let wantBuyNum = parseInt((hcneedNum / this.getGemNum(gemlevel)).toString());
				if (gemlevel == needGemLevel + 1) {//排除特殊情况，例如：还需要2个一级宝石合成，恰好又是要合成2级宝石，拿2级宝石来计算过后要把wantBuyNum的值设为零
					wantBuyNum = 0;
				}
				//商会能购买的数量
				let lastNum = this.GemShopArr[i]["haveGemNum_lab"];
				if (wantBuyNum != 0) {
					wantBuyNum = wantBuyNum < lastNum ? wantBuyNum : lastNum;
				}
				hcneedNum = hcneedNum - wantBuyNum * this.getGemNum(gemlevel);
				//this.buyGemDictionary.set(gemlevel - 1, [wantBuyNum, lastNum]);
				for (let j = 0; j < wantBuyNum; j++) {
					this.onGemBtn(i, _cell, this.buyGemDictionary, this.GemShopArr, false, false, true);
				}
				if (hcneedNum <= 0) {
					break;
				}
			}
			//this.showbuyGem_list(gemItemData[0]["ngemtype"] - 1, gemItemData[0]["id"]);
		}
		/**
		 * 返回以2为底数的对数值
		 */
		private getLog2(num: number): number {
			return Math.log(num) / Math.log(2);
		}

		/**
		 * 计算本人所拥有的宝石是否满足合成所需
		 * @param needGemLevel 
		 * @param hcneedNum 合成所需的一级宝石数量
		 * @param gemItemData	某一类的宝石数据
		 * @param returnHaveGem 所拥有宝石的数据
		 */
		private countIsEnough(needGemLevel: number, hcneedNum: number, gemItemData: any, returnHaveGem: any): void {
			for (let i = returnHaveGem.length - 1; i > -1; i--) {
				let _cell = this._viewUI.haveGem_list.getCell(i);
				this.initGemSelectState(_cell);
				for (let j = 0; j < needGemLevel; j++) {
					if (needGemLevel - j == 0) {
						break;
					}
					for (let k = 0; k < gemItemData.length; k++) {//遍历某一个类型宝石
						if (gemItemData[k]["level"] == needGemLevel - j && gemItemData[k]["id"] == returnHaveGem[i]["itemId"]) {//如果与合成所需用的这一级宝石等级相等，并且背包有这个宝石
							let inBagGemNum = BagModel.getInstance().chargeItemNum(gemItemData[k]["id"]);//获得其在背包中数量
							// /** 花费掉背包里拥有的宝石数量 */	
							// let costBagGemNum = 2 >= inBagGemNum ? inBagGemNum : 2;
							// this.haveGemDictionary.set(needGemLevel - j - 1,[costBagGemNum,inBagGemNum]);
							// hcneedNum = hcneedNum - this.getGemNum(needGemLevel - j) * costBagGemNum;	
							hcneedNum = hcneedNum - this.getGemNum(needGemLevel - j) * inBagGemNum;
							for (let l = 0; l < inBagGemNum; l++) {
								this.onGemBtn(i, _cell, this.haveGemDictionary, this.haveGemArr, false, false);
							}
						}
					}
				}
			}
			this.countIsLack_and_revise(needGemLevel, hcneedNum, gemItemData);
		}
		/**
		 * 初始化下某列表下某种类型的宝石们被选的状态
		 */
		private initGemSelectState(cell: any): void {
			let reduce_btn: Button = cell.getChildByName("reduce_btn") as Button;
			let gem_btn: LImage = cell.getChildByName("gem_btn") as LImage;
			let number_lab: Label = cell.getChildByName("needGemNum_lab") as Label;
			reduce_btn.visible = false;
			gem_btn.skin = "common/ui/tongyong/common_list_3textbg.png";
			number_lab.text = "0";
		}

		/**当前等级的宝石一个能够兑换多少个一级宝石 */
		public getGemNum(level) {
			return Math.pow(2, level - 1);
		}

	    /**
		 * 获取拥有宝石的数量
		 */
		public getHaveGemNum(hcNeedGemid) {
			let haveGemIdArr = this.m_gem;
			for (let i = 0; i < haveGemIdArr.length; i++) {
				if (haveGemIdArr[i].itemId == hcNeedGemid) {
					return haveGemIdArr[i].itemNum;
				}
			}
			return -1;
		}

		/**显示合成宝石
		 * @param hcNeedGemid 所要合成目标的宝石
		 * @param hechengrate 合成概率
		 */
		public hcNeedhammer(gemid, hechengrate): void {
			let hammerid = this.cequipCombinData[gemid].hammerid;  //合成当前宝石需要的宝石的强化道具id
			let hammerrate = 0;
			let hammernum = 0;
			if (hammerid) {
				this._viewUI.material_box.visible = true;
				this._viewUI.compound_box.x = 0;
				this._viewUI.check_checkbox.selected = false;
				hammerrate = this.cequipCombinData[gemid].hammerrate; //强化之后的成功率
				hammernum = this.cequipCombinData[gemid].hammernum;  //强化道具的数量
			} else {
				this._viewUI.material_box.visible = false;
				this._viewUI.compound_box.x = 66;
			}
			this._viewUI.check_checkbox.on(LEvent.MOUSE_DOWN, this, this.onCheckBox, [hammerrate, hechengrate, hammerid, hammernum]);
		}

		/**是否选择使用强化剂
		 * @param hammerrate 加入融合剂后的合成宝石概率
		 * @param hechengrate 不加入融合剂后的合成宝石概率
		 * @param hammerid 融合剂道具id
		 * @param hammernum 融合剂所需数量
		 */
		public onCheckBox(hammerrate, hechengrate, hammerid, hammernum: number) {
			let isCheck = this._viewUI.check_checkbox.selected;
			if (!isCheck) {
				let _mixItemNum = BagModel.getInstance().chargeItemNum(hammerid);
				this._viewUI.rate_label.text = hammerrate + "%";   //强化概率
				this._viewUI.needhammernum_label.visible = true;
				this._viewUI.slash_lab.visible = true;
				this._viewUI.havehammernum_label.visible = true;
				this._viewUI.needhammernum_label.text = hammernum.toString();//合成所需融合剂的数量
				this._viewUI.havehammernum_label.text = _mixItemNum.toString();//身上持有融合剂的数量
				this._viewUI.havehammernum_label.color = "#ffffff";
				this._viewUI.hcitem3_img.skin = "common/icon/item/" + BagModel.getInstance().itemAttrData[hammerid]["icon"] + ".png"
				let _nquality = BagModel.getInstance().itemAttrData[hammerid]["nquality"];
				this._viewUI.hcframe3_img.skin = bag.BagSystemModule.getGameItemFrameColorResource(_nquality);
				if (_mixItemNum == 0) {//如果所需融合剂道具在背包了没有，就弹出提示
					this._viewUI.havehammernum_label.color = "#ff0000";
					let _tipsMsg = ChatModel.getInstance().chatMessageTips["162206"]["msg"];
					let _disappTips = new commonUI.DisappearMessageTipsMediator(this._app);
					_disappTips.onShow(_tipsMsg);
					this._viewUI.check_checkbox.selected = false;
					return;
				}
				this.mixItemid = hammerid;
			} else {
				this._viewUI.rate_label.text = hechengrate + "%";  //普通概率
				this._viewUI.needhammernum_label.visible = false;
				this._viewUI.slash_lab.visible = false;
				this._viewUI.havehammernum_label.visible = false;
				this._viewUI.hcitem3_img.skin = "";
				this._viewUI.hcframe3_img.skin = "common/ui/tongyong/baikuang.png";
				this.mixItemid = 0;
			}
		}

		/**获取宝石类型 */
		public getGentype(index: number) {
			let strname = this.gemTypeArr[index].gemName_label;
			let stradddes = this.gemTypeArr[index].gemAttribute_label;
			let gemIcon = this.gemTypeArr[index].gemIcon_img;
			this._viewUI.hcGemName_label.text = strname;
			this._viewUI.hcGemAttribute_label.text = stradddes;
			this._viewUI.hcGemIcon_img.skin = gemIcon;
		}

		/**显示列表 */
		public showList(list: Laya.List, arr: Array<any>): void {
			list.vScrollBarSkin = "";
			list.scrollBar.elasticBackTime = 200;
			list.scrollBar.elasticDistance = 50;
			list.repeatY = arr.length;
			list.array = arr;
		}

        /**
		 * 购买宝石列表  gemType:宝石类型  nitemid:宝石定位id
		 */
		public showbuyGem_list(gemType, nitemid): void {
			let shop = game.modules.bag.models.BagModel._instance.getGoods;
			let goodslimitsBinDic = game.modules.shop.models.ShopModel._instance.goodslimitsBinDic;
			let buyGem_list = this._viewUI.buyGem_list;
			this.GemShopArr = [];
			let gemIcon_img = this.gemTypeArr[gemType].gemIcon_img;   //宝石icon
			for (let i: number = 0; i < 3; i++) {
				let gemId = nitemid + i;  //id
				let name = this.gemEffectData[gemId].name;    //名称
				let nquality = this.itemAttrData[gemId].nquality;   //宝石颜色品质
				let frame_img = StrengTheningModel._instance.frameSkinArr[nquality - 1];
				let level = this.gemEffectData[gemId].level;
				let shopGemId = this.cGoodsDataForItemId[gemId].id;
				let gemPrice = 0;
				if (shop.get(shopGemId) != undefined) {
					gemPrice = shop.get(shopGemId).price;
				} else {
					gemPrice = this.cGoodsDataForItemId[gemId].prices[0];
				}
				let limitNum = this.cGoodsDataForItemId[gemId].limitNum;
				let buyNum = goodslimitsBinDic.get(shopGemId);
				let m_limitNum = limitNum - buyNum;
				this.GemShopArr.push({
					shopGemIcon_img: gemIcon_img, name_lab: name, frame_img: frame_img,
					level: level, moneyNum_lab: gemPrice, gemId: shopGemId, haveGemNum_lab: m_limitNum
				})
			}
			this.showList(buyGem_list, this.GemShopArr);
			buyGem_list.renderHandler = new Handler(this, this.buyGemLsitRender)
		}

		/**显示购买宝石 */
		public buyGemLsitRender(cell: Box, index: number) {
			let gem_btn: Button = cell.getChildByName("gem_btn") as Button;
			let reduce_btn: Button = cell.getChildByName("reduce_btn") as Button;
			let needGemNum_lab = cell.getChildByName("needGemNum_lab") as Label;
			gem_btn.on(LEvent.MOUSE_UP, this, this.onGemBtn, [index, cell, this.buyGemDictionary, this.GemShopArr, false, true, true])
			reduce_btn.on(LEvent.MOUSE_UP, this, this.onReduceBtn, [index, cell, this.buyGemDictionary, this.GemShopArr])
			if (this.buyGemDictionary.get(index) == null) {
				reduce_btn.visible = false;
				needGemNum_lab.text = "0";
			}
			// else {
			// 	this.onGemBtn(index, cell, this.buyGemDictionary, this.GemShopArr, true, false, true);
			// }
		}

		/**购买宝石选择 */
		public buyGemLsitSelect(index: number) {
			let cell = this._viewUI.buyGem_list.getCell(index);
			let buyNum_lab: Label = cell.getChildByName("buyNum_lab") as Label;
		}


        /**
		 * 拥有宝石列表
		 */
		public showHaveGemLsit(gemType): void {
			let haveGem_list = this._viewUI.haveGem_list;
			this.haveGemArr = [];
			let gemIcon_img = this.gemTypeArr[gemType].gemIcon_img;   //宝石icon
			let _ngemtype = this.gemTypeArr[gemType].ngemtype;       //宝石类型
			let returnHaveGem = this.getTypeHaveGemList(_ngemtype);
			for (let i = 0; i < returnHaveGem.length; i++) {
				let gemId = returnHaveGem[i].itemId;   //宝石id
				let name = this.gemEffectData[gemId].name;  //名称
				let nquality = this.itemAttrData[gemId].nquality; //品质
				let frame_img = StrengTheningModel._instance.frameSkinArr[nquality - 1];
				let effectdes = this.itemAttrData[gemId].effectdes; //描述
				let haveGemNum_lab = returnHaveGem[i].itemNum;   //宝石数量
				let level = this.itemAttrData[gemId].level;  //等级
				this.haveGemArr.push({
					name_lab: name, attribute_lab: effectdes, frame_img: frame_img,
					gemIcon_img: gemIcon_img, haveGemNum_lab: haveGemNum_lab, level: level,
					moneyNum_lab: 0, gemId: gemId
				});
			}
			this.showList(haveGem_list, this.haveGemArr);
			haveGem_list.renderHandler = new Handler(this, this.haveGemlistRender);
		}


		/**显示拥有宝石 */
		public haveGemlistRender(cell: Box, index: number) {
			let disboard_btn: Button = cell.getChildByName("disboard_btn") as Button;
			let reduce_btn: Button = cell.getChildByName("reduce_btn") as Button;
			disboard_btn.visible = false;
			let needNumber_lab: Label = cell.getChildByName("needGemNum_lab") as Label;
			let gem_btn: Laya.Image = cell.getChildByName("gem_btn") as Laya.Image;
			gem_btn.on(LEvent.MOUSE_UP, this, this.onGemBtn, [index, cell, this.haveGemDictionary, this.haveGemArr, false, true]);
			reduce_btn.on(LEvent.MOUSE_UP, this, this.onReduceBtn, [index, cell, this.haveGemDictionary, this.haveGemArr]);
			if (this.haveGemDictionary.get(index) == null) {
				reduce_btn.visible = false;
				needNumber_lab.text = "0";
			}
		}

		/**
		 * 点击宝石
		 * @param isClick 用来判断是否被点击了
		 * @param flag 用来判断是从商会购买宝石列表来的
		 */
		public onGemBtn(index, cell, gemDictionary, gemArr, isSelect, isClick: boolean, flag?: boolean) {
			let number_lab: Label = cell.getChildByName("needGemNum_lab") as Label;
			let reduce_btn: Button = cell.getChildByName("reduce_btn") as Button;
			let gem_btn: LImage = cell.getChildByName("gem_btn") as LImage;
			let hchaveNum = parseInt(this._viewUI.hchaveNum_label.text);
			let hcneedNum = parseInt(this._viewUI.hcneedNum_lab.text);
			let selectedIndex = this._viewUI.hcOneTypeGem_lsit.selectedIndex;
			let gmLevel = this.hcgemArr[selectedIndex].level;
			let level = gemArr[index].level;
			if (level >= gmLevel) return;
			if (hchaveNum >= hcneedNum) return;//当所需的宝石数量被满足或者被超过，就不再接受增加宝石数量的点击事件
			let haveGemNum = parseInt(gemArr[index].haveGemNum_lab);
			let selectNum = parseInt(number_lab.text);
			if (gemArr == this.haveGemArr && selectNum == haveGemNum) {//如果是拥有宝石的列表进入此方法，点击选中的宝石不能大于等于自己所拥有
				return;
			}
			else if (gemArr == this.GemShopArr && (haveGemNum == 0 || selectNum == haveGemNum)) {//如果是商会宝石的列表进入此方法，点击选中的宝石剩余数量为0或者已达到商会购买限制
				return;
			}
			let clickedValue = gemDictionary.get(index);
			if (!clickedValue) {
				gemDictionary.set(index, [1, haveGemNum]);//默认先选1个低级宝石
			}
			else {
				let addNum = clickedValue[0];
				addNum++;
				if (addNum > haveGemNum) {
					return;
				}
				gemDictionary.set(index, [addNum, haveGemNum]);
			}
			// if (gemDictionary.get(index) == null) {
			// 	if(flag && !isClick){//商会列表，但为被鼠标点击
			// 		gemDictionary.set(index, [2, haveGemNum]);//默认直接购买2个低级宝石
			// 	}
			// 	else if(flag && isClick){
			// 		gemDictionary.set(index, [1, haveGemNum]);
			// 	}
			// 	else{//背包宝石列表
			// 		gemDictionary.set(index, [1, haveGemNum]);//默认先选1个低级宝石
			// 	}
			// } else {
			// 	let addnum = gemDictionary.get(index)[0];
			// 	if (flag) {//如果是购买商会宝石列表
			// 		if(isClick && addnum < haveGemNum){//点击了购买宝石，并且数量符合限制
			// 			addnum += 1;
			// 		}
			// 	}
			// 	else if (addnum < haveGemNum) {
			// 		addnum += 1;
			// 	}
			// 	if (!isSelect) {
			// 		gemDictionary.set(index, [addnum, haveGemNum]);
			// 	}
			// }
			number_lab.text = gemDictionary.get(index)[0];
			// if(gemDictionary.get(index)[0] >= haveGemNum) return;
			if (gemDictionary.get(index)[0] > 0) {
				reduce_btn.visible = true;
				gem_btn.skin = "common/ui/tongyong/common_list_3textbg2.png";
			}
			else {
				reduce_btn.visible = false;
				gem_btn.skin = "common/ui/tongyong/common_list_3textbg.png";
			}
			this.hcAllSelectAddNum(index, gemArr, gemDictionary);
			let shopNum = gemArr[index].moneyNum_lab;
			this.allShopGemNum += shopNum;
			this._viewUI.needMoney_lab.text = this.allShopGemNum + "";
			this.judgeMoneyIsEnough(this._viewUI.needMoney_lab);
			// this.showhcNeedGem(gemDictionary);
		}
		/**
		 * 判断背包里银币是否满足购买商会里的宝石所需要的银币
		 * @param moneylab 所需要的银币数量的文本
		 */
		private judgeMoneyIsEnough(moneylab: Laya.Label): void {
			/** 所需银币数量 */
			let yinbiNum = Number(moneylab.text);
			/** 角色本人持有的银币数量 */
			let roleHaveYinbiNum = HudModel.getInstance().sliverNum;
			if (yinbiNum > roleHaveYinbiNum) {//如果银币不足
				moneylab.color = "#ff0400";//文本变红
			}
			else {
				moneylab.color = "#610500";//文本变黑
			}
		}

		/**点击去掉宝石 */
		public onReduceBtn(index, cell, gemDictionary, gemArr) {
			let number_lab: Label = cell.getChildByName("needGemNum_lab") as Label;
			let haveGemNum_lab: Label = cell.getChildByName("haveGemNum_lab") as Label;
			let reduce_btn: Button = cell.getChildByName("reduce_btn") as Button;
			let gem_btn: LImage = cell.getChildByName("gem_btn") as LImage;
			let needGemNum = parseInt(number_lab.text);
			let haveGemNum = parseInt(haveGemNum_lab.text);
			if (gemDictionary.get(index) == null) return;
			let num = gemDictionary.get(index)[0];
			num -= 1;
			if (num < 0) {
				for (let i = 0; i < gemDictionary.keys.length; i++) {
					gemDictionary.set(gemDictionary.keys[i], [0, gemDictionary.get(gemDictionary.keys[i])[1]]);
				}
			}
			else {
				gemDictionary.set(index, [num, haveGemNum]);
			}
			number_lab.text = gemDictionary.get(index)[0];
			if (gemDictionary.get(index)[0] <= 0) {
				reduce_btn.visible = false;
				gem_btn.skin = "common/ui/tongyong/common_list_3textbg.png";
			}
			this.hcAllSelectReduceNum(index, gemArr, gemDictionary);
			let shopNum = gemArr[index].moneyNum_lab;
			this.allShopGemNum -= shopNum;
			if (this.allShopGemNum < 0) {
				this.allShopGemNum = 0;
			}
			this._viewUI.needMoney_lab.text = this.allShopGemNum + "";
			this.judgeMoneyIsEnough(this._viewUI.needMoney_lab);
		}

		/**增加时显示选择宝石的总数 */
		public hcAllSelectAddNum(index, gemArr, gemDictionary): void {
			// if (this.isReduce && gemDictionary == this.buyGemDictionary) {//如果是在购买宝石因减少宝石间接进入此方法，就返回
			// 	this.isReduce = false
			// 	return;
			// }
			let level = gemArr[index].level;  //选择宝石的等级
			let num = Math.pow(2, level - 1);
			let needNum = parseInt(this._viewUI.hcneedNum_lab.text);  //需要的个数
			if (this.allSelectNum < needNum) {
				this.allSelectNum += num;
			}
			let dicKeys = gemDictionary.keys;
			let limitNum = gemDictionary.get(index)[1];
			if (limitNum == 0) {//如果商会已经没有宝石可以购买
				this.allSelectNum = 0;
			}
			this._viewUI.hchaveNum_label.text = this.allSelectNum.toString();
		}

		// /**增加或者减少选择的宝石时，显示的总数 */
		// public showhcNeedGem(gemDictionary){
		// 	let keys = gemDictionary.keys();
		// 	for(let i=0; i < keys; i++){
		// 		if(keys[1]){

		// 		}

		// 	}

		// }

		/**减少时显示选择宝石总数 */
		public hcAllSelectReduceNum(index, gemArr, gemDictionary): void {
			let level = gemArr[index].level;
			let num = Math.pow(2, level - 1);
			if (this.allSelectNum > 0) {
				this.allSelectNum -= num;
			}
			// if(gemDictionary == this.buyGemDictionary){
			// 	this.isReduce = true;
			// }
			// else{
			// 	this.isReduce = false;
			// }
			this._viewUI.hchaveNum_label.text = this.allSelectNum.toString();
		}

		/**根据当前选择的宝石类型筛选出拥有的同类型宝石
		 * @param ngemtype 宝石类型
		 * @describe 根据宝石类型，先到宝石表找出同类型所有宝石对应的道具id，放到临时数组中去
		 * 			再从那临时数组取出道具id到背包中遍历查找搜索
		 */
		public getTypeHaveGemList(ngemtype: number): any {
			let haveGemIdArr = [];
			/** 宝石表字典的key的数组 */
			let gemDicKeys = Object.keys(this.gemEffectData);
			/** 临时存放宝石道具id的数组 */
			let gemItemId = [];
			for (let i = 0; i < gemDicKeys.length; i++) {//遍历宝石表
				if (this.gemEffectData[gemDicKeys[i]]["ngemtype"] == ngemtype) {//如果与所选择的宝石类型相等
					gemItemId.push(this.gemEffectData[gemDicKeys[i]]["id"]);//就放入宝石对应道具id
				}
			}
			for (let i = 0; i < gemItemId.length; i++) {
				/** 宝石道具数量 */
				let itemNum: number = bag.models.BagModel.getInstance().chargeItemNum(gemItemId[i]);
				if (itemNum > 0) {//如果数量大于零
					//宝石对应的道具id
					let _itemid = gemItemId[i];
					//宝石显示的名字
					let _name = this.gemEffectData[gemItemId[i]]["name"];
					//宝石的品质
					let _nquality = this.itemAttrData[gemItemId[i]].nquality;
					//宝石的功能描述
					let _effectdes = this.gemEffectData[gemItemId[i]]["effectdes"];
					//宝石的数量
					let _itemNum = itemNum;
					//宝石的等级
					let _level = this.gemEffectData[gemItemId[i]]["level"];
					haveGemIdArr.push({ itemId: _itemid, name: _name, nquality: _nquality, effectdes: _effectdes, itemNum: _itemNum, level: _level });
				}
			}
			return haveGemIdArr;
		}

		/**初始化拥有的装备 */
		public initHaveEqu() {
			this.m_gem = [];
			let bag1 = bagModel.getInstance().bagMap[BagTypes.BAG].items;
			let returnBag1 = this.getItems(bag1);
			this.pushToArr(returnBag1, BagTypes.BAG);
		}

		/**获取背包的物品 */
		public getItems(bag) {
			let idArr: Array<any> = []
			for (let i: number = 0; i < bag.length; i++) {
				let itemId = bag[i].id;      //item id
				let itemNum = bag[i].number;      //item id
				idArr.push({ itemId: itemId, itemNum: itemNum, key: bag[i].key });
			}
			return idArr;
		}

		/**获取宝石 */
		public pushToArr(returnBag, packid) {
			if (returnBag.length == 0) return;
			for (let i: number = 0; i < returnBag.length; i++) {
				if (108000 <= returnBag[i].itemId && returnBag[i].itemId <= 108812) {   //宝石
					this.m_gem.push({ itemId: returnBag[i].itemId, itemNum: returnBag[i].itemNum, key: returnBag[i].key, packid: packid })
				}
			}
		}

        /**
		 * 点击合成按钮
		 */
		public onCompoundBtn(): void {
			if (this._viewUI.needMoney_lab.color == "#ff0000") {//如果所持银币文本字颜色为红色，说明本人角色身上银币不足
				let tipsMessage = ChatModel.getInstance().chatMessageTips["120025"]["msg"];//获得提示身上银币不足的提示语句
				let piaochuang = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
				piaochuang.onShow(tipsMessage);//飘窗显示提示语句
				return;
			}
			//合成请求
			let selectedIndex = this._viewUI.hcOneTypeGem_lsit.selectedIndex;
			let hcGemId = -1;
			if (selectedIndex != -1) {
				hcGemId = this.hcgemArr[selectedIndex].gemId;
			}
			let checkboxSelected = this._viewUI.check_checkbox.selected;
			let useItem = 0;  //使用融合剂
			let _gemLevel = Number(this.gemEffectData[hcGemId]["level"]);
			if (checkboxSelected && _gemLevel > 8) {
				let _mixItemNum = Number(this._viewUI.havehammernum_label.text);
				let _needRongHeJiNum = Math.pow(2, _gemLevel - 8) - 1;//合成9级至13级宝石所需的融合剂数量
				if(_mixItemNum < _needRongHeJiNum){
					let _tipsMsg = ChatModel.getInstance().chatMessageTips["162206"]["msg"];
					let _disappTips = new commonUI.DisappearMessageTipsMediator(this._app);
					_disappTips.onShow(_tipsMsg);
					return;
				}
				useItem = 1;
			}
			let bagGems = [];
			let havegemkeys = this.haveGemDictionary.keys;
			for (let i = 0; i < havegemkeys.length; i++) {
				let index = havegemkeys[i];
				let gemid = this.haveGemArr[index].gemId;
				let gemNum = this.haveGemDictionary.get(index)[0];
				if (gemNum > 0) {
					let ComposeGemInfoBean: ComposeGemInfoBeanVo = new ComposeGemInfoBeanVo();
					ComposeGemInfoBean.itemIdOrGoodId = gemid;
					ComposeGemInfoBean.num = gemNum;
					bagGems.push(ComposeGemInfoBean);
				}
			}
			let shopGems = [];
			let buygemkeys = this.buyGemDictionary.keys;
			for (let j = 0; j < buygemkeys.length; j++) {
				let index = buygemkeys[j];
				let gemid = this.GemShopArr[index].gemId;
				let gemNum = this.buyGemDictionary.get(index)[0];
				if (gemNum > 0) {
					let ComposeGemInfoBean: ComposeGemInfoBeanVo = new ComposeGemInfoBeanVo();
					ComposeGemInfoBean.itemIdOrGoodId = gemid;
					ComposeGemInfoBean.num = gemNum;
					shopGems.push(ComposeGemInfoBean);
				}
			}
			this.flushGem();
			RequesterProtocols._instance.c2s_CCompose_Gem(useItem, hcGemId, bagGems, shopGems);
		}

		/**刷新宝石 */
		public flushGem() {
			models.StrengTheningProxy.getInstance().on(models.SHeChengItem, this, this.gemTypeSelect, [this.gemTypeListIndex]);
		}

		/**清除数据 */
		public clean(): void {
			this.haveGemDictionary.clear();
			this.buyGemDictionary.clear();
			this.allSelectNum = 0;
			this.allShopGemNum = 0;
			this.mixItemid = 0;
		}

		/**请求宝石价格 */
		public requestShopLimit() {
			let shop = game.modules.bag.models.BagModel._instance.getGoods;
			let shopkeys = shop.keys;
			this.CQueryLimit(shopkeys);
		}

		/**请求商品价格 */
		public CRequstShopPrice() {
			RequesterProtocols._instance.c2s_requst_shopprice(5);
		}

		/**查询商品限购次数 */
		public CQueryLimit(goodsids) {
			RequesterProtocols._instance.c2s_query_limit(1, goodsids);
		}

		public show(): void {
			this.registerEvent();
			this.gemTypeSelect(0);
			super.show();
		}
		/** 注册事件 */
		private registerEvent(): void {
			game.modules.bag.models.BagProxy.getInstance().on(game.modules.bag.models.REFRESH_CURRENCY_EVENT, this, this.redreshYinBi);
			game.modules.pet.models.PetProxy.getInstance().on(game.modules.pet.models.SHOPPRICE_EVENT, this, this.requestShopLimit);
		}
		public hide(): void {
			super.hide();
			this.removeEvent();
		}
		/** 移除事件 */
		private removeEvent(): void {
			game.modules.bag.models.BagProxy.getInstance().off(game.modules.bag.models.REFRESH_CURRENCY_EVENT, this, this.redreshYinBi);
			game.modules.pet.models.PetProxy.getInstance().off(game.modules.pet.models.SHOPPRICE_EVENT, this, this.requestShopLimit);
			models.StrengTheningProxy.getInstance().off(models.SHeChengItem, this, this.gemTypeSelect);
		}
		public getView(): Sprite {
			return this._viewUI;
		}
	}
}