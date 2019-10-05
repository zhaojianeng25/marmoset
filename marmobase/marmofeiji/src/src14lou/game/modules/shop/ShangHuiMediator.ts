/**
* 商会 
*/
module game.modules.shop {
    export class ShangHuiMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.ShopShangHuiUI;
        public _xiaoJianPanMediator: game.modules.tips.XiaoJianPanMediator;
        private _tipsModule: game.modules.tips.tipsModule;
        private _yinBiTips: commonUI.JinBiBuZuViewMediator;
        private _remindViewMediator: commonUI.RemindViewMediator;
        /** 已经购买数量 */
        public hadBuyNum: number = 0;
        /** 元宝数量 */
        public hadYuanBao: number = 0;
        /** 金币数量 */
        public hadJinBi: number = 0;
        /** 银币数量 */
        public hadYinBi: number = 0;
        /** 当前购买数量 */
        public buyNum: number = 0;
        /** 是否显示小键盘 */
        public isShowKeyboard: number = 0;
        /** 商会的商品种类合集 */
        public shopInfoBinDic: Laya.Dictionary = new Laya.Dictionary();
        /** 一级菜单 */
        public _commerceFirstMenuBinDic: Object = {};
        /** 二级菜单 */
        public _commerceSecondMenuBinDic: Object = {};
        /** 当前选中的一级菜单 */
        public firstId: number;
        /** 当前选中的二级菜单的ID */
        public secondId: number;
        /** 跳转界面显示该物品的标签 */
        public itemId: number;
        constructor(uiLayer: Sprite, app: AppBase) {
            super(uiLayer);
            this._viewUI = new ui.common.ShopShangHuiUI();
            this._viewUI.mouseThrough = true;
            this.isCenter = false;
            this._app = app;

            this._viewUI.dataList_list.renderHandler = new Handler(this, this.onSelect);

            this._xiaoJianPanMediator = new game.modules.tips.XiaoJianPanMediator(this._viewUI);
            this._yinBiTips = new commonUI.JinBiBuZuViewMediator(this._viewUI, this._app);
            this._remindViewMediator = commonUI.RemindViewMediator.getInstance(this._viewUI, app);

            this._viewUI.showKeyboard_btn.on(LEvent.MOUSE_DOWN, this, () => {
                this._xiaoJianPanMediator.show();
                this.isShowKeyboard = 1;
                this.selectTimes = 0;
                this._xiaoJianPanMediator.getView().x = 48;
                this._xiaoJianPanMediator.getView().y = 446;
                game.modules.tips.models.TipsProxy.getInstance().on(game.modules.tips.models.ON_KRYBOARD, this, this.setKeyboardBtns);
            });

            this._commerceFirstMenuBinDic = ShopModel.getInstance().CommerceFirstMenuBinDic;
            this._commerceSecondMenuBinDic = ShopModel.getInstance().CommerceSecondMenuBinDic;
            this._viewUI.baoShi_btn.on(LEvent.MOUSE_DOWN, this, this.firstBtnOn, [firstMenuType.BAOSHI]);
            this._viewUI.zhuangBei_btn.on(LEvent.MOUSE_DOWN, this, this.firstBtnOn, [firstMenuType.ZHUANGBEI]);
            this._viewUI.chongWu_btn.on(LEvent.MOUSE_DOWN, this, this.firstBtnOn, [firstMenuType.PET]);
            this._viewUI.qiTa_btn.on(LEvent.MOUSE_DOWN, this, this.firstBtnOn, [firstMenuType.QITA]);
            this._viewUI.menu_list.renderHandler = new Handler(this, this.menuSelect);

            this._viewUI.reduceNum_btn.on(LEvent.MOUSE_DOWN, this, this.reduceNumBtnHandler);
            this._viewUI.addNum_btn.on(LEvent.MOUSE_DOWN, this, this.addNumBtnHandler);
            this._viewUI.buy_btn.on(LEvent.MOUSE_DOWN, this, this.buyBtnHandler);

           
        }
        /**
         * 商会窗口初始化 
         * @param  firstType 一级菜单类型   
         * @param  secondNum 二级菜单位置
         * @param  itemId    跳转时的物品ID 默认为0
         */
        public init(firstType: number, secondNum: number, itemId: number): void {
            this.show();
             this._yinBiTips.on(commonUI.USE_GOLD_EXCHANGE_EVENT, this, this.jinbijiesuo);
            this._yinBiTips.on(commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.yuanbaojiesuo);
            this._yinBiTips.on(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.jinbibuzu);
            this._remindViewMediator.once(commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
            this._remindViewMediator.once(commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);
            this.itemId = itemId;
            this.selectNum = secondNum;
            var _shopInfo = game.modules.pet.models.PetModel.getInstance().shopinfo;
            for (var i: number = 0; i < _shopInfo.length; i++) {
                this.shopInfoBinDic.set(_shopInfo[i].goodsid, _shopInfo[i]);
            }

            //获取玩家银币，金币，元宝数量
            this.hadYuanBao = game.modules.mainhud.models.HudModel.getInstance().fuShiNum;
            this.hadYinBi = game.modules.mainhud.models.HudModel.getInstance().sliverNum;
            this.hadJinBi = game.modules.mainhud.models.HudModel.getInstance().goldNum;
            this._viewUI.hadNum_lab.text = this.setNumStyle(this.hadYinBi);

            this._viewUI.dataList_list.vScrollBarSkin = "";
            this._viewUI.dataList_list.repeatX = 1;
            this._viewUI.dataList_list.scrollBar.elasticBackTime = 500;
            this._viewUI.dataList_list.scrollBar.elasticDistance = 20;

            //菜单栏
            this._viewUI.btn_panel.vScrollBarSkin = "";
            this.setSecondMenu(firstType);
        }
        /** 一级菜单按钮监听 */
        public firstBtnOn(index: number): void {
            this.selectIndex = -1;
            if (this.firstId == index) {
                this._viewUI.menu_list.visible = false;
                this.firstId = 0;
                this.setAllBtnY(0, 0);
            } else if (this.firstId == 0) {
                this.setSecondMenu(index);
            } else {
                this.selectNum = 0;
                this.setSecondMenu(index);
            }
        }
        /** 设置二级菜单 */
        public setSecondMenu(index: number): void {
            this._viewUI.spendNum_lab.text = "0";
            this._viewUI.num_lab.text = "0";
            this._viewUI.menu_list.visible = true;
            var secondmenu: Array<number> = this._commerceFirstMenuBinDic[index].secondmenu;
            var data: Array<any> = [];
            for (var i: number = 0; i < secondmenu.length; i++) {
                var btnSele: boolean = false;
                if (i == this.selectNum) {
                    btnSele = true;
                }
                data.push({
                    menu_btn: { selected: btnSele, label: this._commerceSecondMenuBinDic[secondmenu[i]].name }
                });
            }
            this._viewUI.menu_list.array = data;
            this._viewUI.menu_list.height = secondmenu.length * 58;
            this._viewUI.menu_list.y = 85 + (index - 1) * 85;
            this.setAllBtnY(index, secondmenu.length * 58);
            this.firstId = index;
            this.secondId = this._commerceSecondMenuBinDic[secondmenu[this.selectNum]].id;
            this.cutView();
        }
        /** 二级菜单按钮选中监听 */
        public menuSelect(cell: Laya.Box, index: number): void {
            var btn = cell.getChildByName("menu_btn") as Laya.Button;
            btn.on(LEvent.MOUSE_DOWN, this, this.menuHandler, [cell, index]);
        }
        /** 二级菜单按钮选中操作 */
        public menuHandler(cell: Laya.Box, index: number): void {
            var secondmenu: Array<number> = this._commerceFirstMenuBinDic[this.firstId].secondmenu;
            this.secondId = this._commerceSecondMenuBinDic[secondmenu[index]].id;
            this.setMenuStyle(cell, index);
            this.selectIndex = -1;
            this.cutView();
        }
        /** 选中的二级菜单按钮编号 */
        public selectNum: number;
        /** 设置二级菜单选中效果 */
        public setMenuStyle(cell: Laya.Box, index: number): void {
            if (this.selectNum != index) {
                if (this.selectNum != -1) {
                    var btn1 = this._viewUI.menu_list.getCell(this.selectNum).getChildByName("menu_btn") as Laya.Button;
                    btn1.selected = false;
                }
                var btn2 = cell.getChildByName("menu_btn") as Laya.Button;
                btn2.selected = true;
                this.selectNum = index;
            }
        }
        /** 初始化一级菜单样式 */
        public setAllBtnY(index: number, length: number): void {
            var lengthArr: Array<number> = [];
            switch (index) {
                case 0:
                    this._viewUI.baoShi_btn.selected = false;
                    this._viewUI.zhuangBei_btn.selected = false;
                    this._viewUI.chongWu_btn.selected = false;
                    this._viewUI.qiTa_btn.selected = false;
                    for (var i: number = 0; i < 3; i++) {
                        lengthArr.push(length);
                    }
                    break;
                case 1:
                    this._viewUI.baoShi_btn.selected = true;
                    this._viewUI.zhuangBei_btn.selected = false;
                    this._viewUI.chongWu_btn.selected = false;
                    this._viewUI.qiTa_btn.selected = false;
                    for (var i: number = 0; i < 3; i++) {
                        lengthArr.push(length);
                    }
                    break;
                case 2:
                    this._viewUI.baoShi_btn.selected = false;
                    this._viewUI.zhuangBei_btn.selected = true;
                    this._viewUI.chongWu_btn.selected = false;
                    this._viewUI.qiTa_btn.selected = false;
                    for (var i: number = 0; i < 3; i++) {
                        if (i <= 0) {
                            lengthArr.push(0);
                        } else {
                            lengthArr.push(length);
                        }
                    }
                    break;
                case 3:
                    this._viewUI.baoShi_btn.selected = false;
                    this._viewUI.zhuangBei_btn.selected = false;
                    this._viewUI.chongWu_btn.selected = true;
                    this._viewUI.qiTa_btn.selected = false;
                    for (var i: number = 0; i < 3; i++) {
                        if (i <= 1) {
                            lengthArr.push(0);
                        } else {
                            lengthArr.push(length);
                        }
                    }
                    break;
                case 4:
                    this._viewUI.baoShi_btn.selected = false;
                    this._viewUI.zhuangBei_btn.selected = false;
                    this._viewUI.chongWu_btn.selected = false;
                    this._viewUI.qiTa_btn.selected = true;
                    for (var i: number = 0; i < 3; i++) {
                        if (i <= 2) {
                            lengthArr.push(0);
                        } else {
                            lengthArr.push(length);
                        }
                    }
                    break;
            }
            this._viewUI.zhuangBei_btn.y = 85 + lengthArr[0];
            this._viewUI.chongWu_btn.y = 170 + lengthArr[1];
            this._viewUI.qiTa_btn.y = 255 + lengthArr[2];
        }
        /** 选中物品的按钮监听 */
        public onSelect(cell: Laya.Box, index: number): void {
            var btn = cell.getChildByName("data_btn") as Laya.Button;
            btn.on(LEvent.MOUSE_DOWN, this, this.btnOn, [cell, index]);

            var getTips = cell.getChildByName("getTips_btn") as Laya.Button;
            getTips.on(LEvent.MOUSE_DOWN, this, this.getTips, [index]);
        }
        /** 物品信息弹窗 */
        public getTips(index: number): void {
            var _goodsBinDic = ShopModel.getInstance().GoodsBinDic;
            var _goodsVo = _goodsBinDic[this._commerceSecondMenuBinDic[this.secondId].goodsids[index]];
            var itemId = _goodsVo.itemId;
            var parame: Dictionary = new Dictionary();
            parame.set("itemId", itemId);
            this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
        }
        /** 选中的物品编号 */
        public selectIndex: number = -1;
        /** 选中后的按钮样式 */
        public setBtnStyle(cell: Laya.Box, index: number) {
            if (this.selectIndex != index) {
                if (this.selectIndex != -1) {
                    var data = { data_btn: { selected: false } };
                    this._viewUI.dataList_list.setItem(this.selectIndex, data);
                }
                var btn = cell.getChildByName("data_btn") as Laya.Button;
                btn.selected = true;
                this.selectIndex = index;
            }
        }
        /** 当前选中的数据集goods,goodids */
        public goodsBaseVo: game.data.template.CGoodsBaseVo;
        public _goodsids: Array<number> = [];
        /** 选中物品按钮监听 */
        public btnOn(cell: Laya.Box, index: number): void {
            if (this.selectIndex == index) {
                this.addNumBtnHandler();
                return;
            }
            this.setBtnStyle(cell, index);
            this.btnHandler(index);
        }
        /** 为当前选中物品的后续操作准备 */
        public btnHandler(index: number): void {
            this._viewUI.showKeyboard_btn.visible = true;
            var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
            var _goodsBinDic = ShopModel.getInstance().GoodsBinDic;
            var _goodslimitsBinDic = ShopModel.getInstance().goodslimitsBinDic;

            this._goodsids = this._commerceSecondMenuBinDic[this.secondId].goodsids;
            this.goodsBaseVo = _goodsBinDic[this._goodsids[index]];

            //货币样式
            var _currencys = this.goodsBaseVo.currencys[0];     //货币类型
            this.setMoneyStyle(_currencys);

            //限购
            if (_goodslimitsBinDic != undefined) {
                this.hadBuyNum = _goodslimitsBinDic.get(this._goodsids[index]);
            } else {
                this.hadBuyNum = 0;
            }
            //购买数量和花费金额
            this.buyNum = 1;
            this.setBuyNum(this.buyNum);
        }
        /** 设置货币样式 */
        public setMoneyStyle(_currencys: number): void {
            this.hadYuanBao = game.modules.mainhud.models.HudModel.getInstance().fuShiNum;
            this.hadYinBi = game.modules.mainhud.models.HudModel.getInstance().sliverNum;
            this.hadJinBi = game.modules.mainhud.models.HudModel.getInstance().goldNum;
            this._viewUI.money_img2.skin = this.getHuoBi(_currencys);
            this._viewUI.money_img3.skin = this.getHuoBi(_currencys);
            if (_currencys == 1) {
                this._viewUI.hadNum_lab.text = this.setNumStyle(this.hadYinBi);
            } else if (_currencys == 2) {
                this._viewUI.hadNum_lab.text = this.setNumStyle(this.hadJinBi);
            } else if (_currencys == 3) {
                this._viewUI.hadNum_lab.text = this.setNumStyle(this.hadYuanBao);
            } else {
                this._viewUI.hadNum_lab.text = "0";
            }
        }
        /** 减少购买物品数量 */
        public reduceNumBtnHandler() {
            if (this.buyNum == 1 || this.selectIndex == -1 || this.selectIndex == undefined) return;
            this.buyNum = parseInt(this.buyNum + "") - 1;
            this.setBuyNum(this.buyNum);
        }
        /** 添加购买物品数量 */
        public addNumBtnHandler() {
            if (this.selectIndex == -1 || this.selectIndex == undefined) return;
            if (this.goodsBaseVo.limitType > 0 && (this.goodsBaseVo.limitNum - ShopModel.getInstance().goodslimitsBinDic.get(this._goodsids[this.selectIndex])) <= this.buyNum) return;
            this.buyNum = parseInt(this.buyNum + "") + 1;
            this.setBuyNum(this.buyNum);
        }
        /** 0表示刚开启键盘，点击按钮不与原显示数字叠加（1+1→11） */
        public selectTimes: number = 0;
        /** 小键盘点击数据显示 */
        public setKeyboardBtns(index: number) {
            if (index == 0) {
                if (this.selectTimes == 0) {
                    this.buyNum = 1;
                    this.selectTimes += 1;
                } else if (this.selectTimes == 1 || this.selectTimes == 2) {
                    this.buyNum *= 10;
                    this.selectTimes += 1;
                } else {
                    this.buyNum = 999;
                }
            } else if (index > 0) {
                if (this.selectTimes == 0) {
                    this.buyNum = index;
                    this.selectTimes += 1;
                } else if (this.selectTimes == 1 || this.selectTimes == 2) {
                    this.buyNum += index;
                    this.selectTimes += 1;
                } else {
                    this.buyNum = 999;
                }
            } else if (index == -1) {
                var length = (this.buyNum + "").length;
                if (length == 3) {
                    this.buyNum = parseInt((this.buyNum + "").substr(0, length - 1));
                    this.selectTimes = length - 1;
                } else if (length == 2) {
                    this.buyNum = parseInt((this.buyNum + "").substr(0, length - 1));
                    this.selectTimes = length - 1;
                } else {
                    this.buyNum = 1;
                    this.selectTimes = 0;
                }
            }
            if (this.goodsBaseVo.limitType > 0 &&
                (this.goodsBaseVo.limitNum - ShopModel.getInstance().goodslimitsBinDic.get(this._goodsids[this.selectIndex])) <= this.buyNum) {
                var num = this.goodsBaseVo.limitNum - ShopModel.getInstance().goodslimitsBinDic.get(this._goodsids[this.selectIndex]);
                if (num <= 0) {
                    this.buyNum = 1;
                } else {
                    this.buyNum = this.goodsBaseVo.limitNum - ShopModel.getInstance().goodslimitsBinDic.get(this._goodsids[this.selectIndex]);
                }
            }
            this.setBuyNum(this.buyNum);
        }
        /** 点击购买按钮 */
        public buyBtnHandler() {
            var _price: number;
            if (this.shopInfoBinDic.get(this._goodsids[this.selectIndex]) != null) {
                _price = this.shopInfoBinDic.get(this._goodsids[this.selectIndex]).price;
            } else {
                _price = this.goodsBaseVo.prices[0];
            }
            console.log("-------货币类型:", this.goodsBaseVo.currencys[0]);
            if (bagModel.getInstance().chargeBagIsFull()) {
                let promoto = HudModel.getInstance().promptAssembleBack(PromptExplain.FULL_OF_BAG);
                let disappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                disappearMessageTipsMediator.onShow(promoto);

            } else if (this.goodsBaseVo.limitType > 0 &&
                (this.goodsBaseVo.limitNum - ShopModel.getInstance().goodslimitsBinDic.get(this._goodsids[this.selectIndex])) <= 0) {
                let promoto = HudModel.getInstance().promptAssembleBack(PromptExplain.UPLIMIT_SH);
                let disappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                disappearMessageTipsMediator.onShow(promoto);

            } else if (this.goodsBaseVo.currencys[0] == 1 && _price * this.buyNum > this.hadYinBi) {
                var wantYinBi = _price * this.buyNum - this.hadYinBi;
                this._yinBiTips.onShow(false, wantYinBi + "", Math.ceil(wantYinBi / 10000) + "", Math.ceil(wantYinBi / 100) + "");
                this.needJinBi = Math.ceil(wantYinBi / 100);
                this.needYuanBao = Math.ceil(wantYinBi / 10000);

                // this._yinBiTips.once(commonUI.USE_GOLD_EXCHANGE_EVENT, this, this.jinbijiesuo, [Math.ceil(wantYinBi / 100)]);
                // this._yinBiTips.once(commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.yuanbaojiesuo, [Math.ceil(wantYinBi / 10000)]);

            } else if (this.goodsBaseVo.currencys[0] == 2 && _price * this.buyNum > this.hadJinBi) {
                var wantJinBi = _price * this.buyNum - this.hadJinBi;
                this._yinBiTips.onShow(true, wantJinBi + "", Math.ceil(wantJinBi / 100) + "");
                this.wantYuanBao = Math.ceil(wantJinBi / 100);
                // this._yinBiTips.once(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.jinbibuzu, [Math.ceil(wantJinBi / 100)]);

            } else if (this.goodsBaseVo.currencys[0] == 3 && _price * this.buyNum > this.hadYuanBao) {
                let prompto = HudModel.getInstance().promptAssembleBack(PromptExplain.CHARGE_TIPS);
                this._remindViewMediator.onShow(prompto);
                // this._remindViewMediator.once(commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
                // this._remindViewMediator.once(commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);

            } else {
                RequesterProtocols._instance.c2s_chamber_ofcommerceshop(shopType.SHANGHUI_SHOP, 0, this.goodsBaseVo.id, this.buyNum, 4);
            }
            game.modules.shop.models.ShopProxy.getInstance().once(game.modules.shop.models.QUERYLIMIT_EVENT, this, this.shopOn);
        }
        /** 金币兑换银币 */
        public needJinBi: number = 0;
        public jinbijiesuo(): void {
            this._yinBiTips.hide();
            if (this.needJinBi < this.hadJinBi) {
                RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_GoldCoin, MoneyTypes.MoneyType_SilverCoin, this.needJinBi);
                bag.models.BagProxy.getInstance().once(bag.models.REFRESH_CURRENCY_EVENT, this, () => {
                    RequesterProtocols._instance.c2s_chamber_ofcommerceshop(shopType.SHANGHUI_SHOP, 0, this.goodsBaseVo.id, this.buyNum, 4);
                });
            } else {
                this._yinBiTips.onShow(true, this.needJinBi - this.hadJinBi + "", Math.ceil((this.needJinBi - this.hadJinBi) / 100) + "");
                this._yinBiTips.once(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.jinbibuzu, [Math.ceil((this.needJinBi - this.hadJinBi) / 100)]);
            }
        }
        /** 元宝兑换银币 */
        public needYuanBao: number = 0;
        public yuanbaojiesuo(): void {
            this._yinBiTips.hide();
            if (this.needYuanBao < this.hadYuanBao) {
                RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_HearthStone, MoneyTypes.MoneyType_SilverCoin, this.needYuanBao);
                bag.models.BagProxy.getInstance().once(bag.models.REFRESH_CURRENCY_EVENT, this, () => {
                    RequesterProtocols._instance.c2s_chamber_ofcommerceshop(shopType.SHANGHUI_SHOP, 0, this.goodsBaseVo.id, this.buyNum, 4);
                });
            } else {
                let prompto = HudModel.getInstance().promptAssembleBack(PromptExplain.CHARGE_TIPS);
                this._remindViewMediator.onShow(prompto, "确定");
                this._remindViewMediator.once(commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
                this._remindViewMediator.once(commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);
            }
        }
        /** 元宝兑换金币 */
        public wantYuanBao: number = 0;
        public jinbibuzu(): void {
            this._yinBiTips.hide();
            if (this.wantYuanBao < this.hadYuanBao) {
                RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_HearthStone, MoneyTypes.MoneyType_GoldCoin, this.wantYuanBao);
                bag.models.BagProxy.getInstance().once(bag.models.REFRESH_CURRENCY_EVENT, this, () => {
                    this.setMoneyStyle(this.goodsBaseVo.currencys[0]);
                });
            } else {
                let prompto = HudModel.getInstance().promptAssembleBack(PromptExplain.CHARGE_TIPS);
                this._remindViewMediator.onShow(prompto, "确定");
                this._remindViewMediator.once(commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
                this._remindViewMediator.once(commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);
            }
        }
        /** 元宝补足跳转至充值界面 */
        public jumpToCharge(): void {
            this._remindViewMediator.off(commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);
            ModuleManager.hide(ModuleNames.SHOP);
            ModuleManager.jumpPage(ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
        }
        /** 元宝补足界面按钮操作监听 */
        public cancleToJump(): void {
            this._remindViewMediator.off(commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
            this._remindViewMediator.hide();
        }
        /** 购买物品成功后的商品列表刷新 */
        public shopOn(): void {
            if (this.goodsBaseVo.limitType > 0) {
                var _goodsids: Array<number> = this._commerceSecondMenuBinDic[this.secondId].goodsids;
                this.setList(_goodsids);
            }
            var _currencys = this.goodsBaseVo.currencys[0];     //货币类型
            this.setMoneyStyle(_currencys);
            this.buyNum = 1;
            this.setBuyNum(this.buyNum);
        }
        /** 购买数量，花费金额显示 */
        public setBuyNum(num: number): void {
            this._viewUI.num_lab.text = num + "";
            if (num == 0) {
                this._viewUI.spendNum_lab.text = "0";
                this._viewUI.spendNum_lab.stroke = 0;
                this._viewUI.spendNum_lab.strokeColor = "#000000";
                return;
            }
            var _price: number;
            if (this.shopInfoBinDic.get(this._goodsids[this.selectIndex]) != null) {
                _price = this.shopInfoBinDic.get(this._goodsids[this.selectIndex]).price;
            } else {
                _price = this.goodsBaseVo.prices[0];
            }
            this._viewUI.spendNum_lab.text = this.setNumStyle(_price * num);
            if (this.goodsBaseVo.currencys[0] == 1 && _price * num > this.hadYinBi) {
                this._viewUI.spendNum_lab.stroke = 5;
                this._viewUI.spendNum_lab.strokeColor = "#f46563";
            } else if (this.goodsBaseVo.currencys[0] == 2 && _price * num > this.hadJinBi) {
                this._viewUI.spendNum_lab.stroke = 5;
                this._viewUI.spendNum_lab.strokeColor = "#f46563";
            } else if (this.goodsBaseVo.currencys[0] == 3 && _price * num > this.hadYuanBao) {
                this._viewUI.spendNum_lab.stroke = 5;
                this._viewUI.spendNum_lab.strokeColor = "#f46563";
            } else {
                this._viewUI.spendNum_lab.stroke = 0;
                this._viewUI.spendNum_lab.strokeColor = "#000000";
            }
        }
        /** 切换界面 */
        public cutView(): void {
            this.buyNum = 0;
            this.setBuyNum(0);
            this._viewUI.hadNum_lab.text = this.setNumStyle(this.hadYinBi);
            this._viewUI.showKeyboard_btn.visible = false;
            var _goodsids: Array<number> = this._commerceSecondMenuBinDic[this.secondId].goodsids;
            this.setList(_goodsids);
        }
        /** 商品列表设置数据 */
        public setList(_goodsids: Array<number>): void {
            var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
            var _goodsBinDic = ShopModel.getInstance().GoodsBinDic;
            var _goodslimitsBinDic = ShopModel.getInstance().goodslimitsBinDic;

            var skinArr: Array<any> = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
                "common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
                "common/ui/tongyong/jinkuang.png"];

            var data: Array<any> = [];
            for (var i: number = 0; i < _goodsids.length; i++) {
                var _goodsVo = _goodsBinDic[_goodsids[i]];
                var _price: number = 0;
                var _priorperiodprice: number = 0;
                var _numText: string = "剩余" + _goodsVo.limitNum;
                var _numTextColor: string = "#50321a";
                var _floatText = "--";
                var _floatVisi: boolean = false;
                var _floatSkin: string = "";
                var _floatColor: string = "#50321a";
                var _levelVisi: boolean = true;
                var _xuQiuVisi: boolean = false;
                var _xuQiuSkin: string;
                var _data_btn: boolean = false;
                //限购
                if (_goodsVo.limitType > 0 && _goodslimitsBinDic != undefined) {
                    var itemNum = _goodsVo.limitNum - _goodslimitsBinDic.get(_goodsids[i]);
                    _numText = "剩余" + itemNum;
                    if (itemNum == 0) {
                        _numTextColor = "#FF2800";
                        _xuQiuVisi = true;
                        _xuQiuSkin = "common/ui/shopui/shop_shoukong.png";
                    }
                }
                if (this.shopInfoBinDic.get(_goodsids[i]) != null) {
                    //price为现价，priorperiodprice为原价
                    _price = this.shopInfoBinDic.get(_goodsids[i]).price;
                    _priorperiodprice = this.shopInfoBinDic.get(_goodsids[i]).priorperiodprice;
                    var chaJia = _priorperiodprice - _price;
                    if (chaJia > 0) {
                        var daZhe = chaJia / _priorperiodprice;
                        _floatVisi = true;
                        var text: string = (Math.round(daZhe * 1000) / 100) + "";
                        _floatText = (text.substring(0, text.indexOf(".") + 2)) + "";
                        _floatSkin = "common/ui/tongyong/shop_down.png";
                        _floatColor = "#FF2800";
                    } else if (chaJia < 0) {
                        var daZhe = -(chaJia / _priorperiodprice);
                        _floatVisi = true;
                        var text: string = (Math.round(daZhe * 1000) / 100) + "";
                        _floatText = (text.substring(0, text.indexOf(".") + 2)) + "";
                        _floatSkin = "common/ui/tongyong/shop_up.png";
                        _floatColor = "#0A6404";
                    }
                } else {
                    _price = _goodsVo.prices[0];
                }
                if (this.firstId == firstMenuType.PET || this.firstId == firstMenuType.QITA) {
                    _levelVisi = false;
                }
                if (this.itemId != undefined && this.itemId != 0 && this.itemId == _goodsVo.itemId) {
                    _xuQiuVisi = true;
                    _xuQiuSkin = "common/ui/tongyong/shop_xuqiu.png";
                }
                if (this.selectIndex == i) {
                    _data_btn = true;
                }
                data.push({
                    data_btn: { selected: _data_btn },
                    num_lab: { text: _numText, color: _numTextColor },
                    icon_img: { skin: models.ShopModel.getInstance().getSrc(_itemAttrBinDic[_goodsVo.itemId].icon) },
                    diban_img: { skin: skinArr[_itemAttrBinDic[_goodsVo.itemId].nquality - 1] },
                    name_lab: { text: _itemAttrBinDic[_goodsVo.itemId].name },
                    money_lab: { text: this.setNumStyle(_price) },
                    money_img: { skin: this.getHuoBi(_goodsVo.currencys[0]) },
                    level_lab: { text: "Lv." + _itemAttrBinDic[_goodsVo.itemId].level, visible: _levelVisi },
                    float_lab: { text: _floatText, color: _floatColor },
                    float_img: { skin: _floatSkin, visible: _floatVisi },
                    xuQiu_img: { visible: _xuQiuVisi, skin: _xuQiuSkin }
                });
            }
            this._viewUI.dataList_list.array = data;
        }
        /** 设置钱的数量显示样式 */
        public setNumStyle(num: number): string {
            var _num = num.toString();
            var len = _num.length;
            if (len <= 3 || num == 0) return _num;
            var r = len % 3;
            return r > 0 ? _num.slice(0, r) + "," + _num.slice(r, len).match(/\d{3}/g).join(",") : _num.slice(r, len).match(/\d{3}/g).join(",");
        }
        /** 获取货币样式 */
        public getHuoBi(index: number): string {
            switch (index) {
                case 1:     //银币
                    return "common/ui/tongyong/common_yinb.png";
                case 2:     //金币
                    return "common/ui/tongyong/common_jinb.png";
                case 3:     //元宝
                    return "common/ui/tongyong/yuanbao.png";
            }
        }
        public show(): void {
            super.show();
            // this.init(1);
        }
        public hide(): void {
            super.hide();
            this._yinBiTips.off(commonUI.USE_GOLD_EXCHANGE_EVENT, this, this.jinbijiesuo);
            this._yinBiTips.off(commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.yuanbaojiesuo);
            this._yinBiTips.off(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.jinbibuzu);
            this._remindViewMediator.off(commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
            this._remindViewMediator.off(commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);
        }
        public getView(): Sprite {
            return this._viewUI;
        }
    }
}