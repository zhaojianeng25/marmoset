/**
* 商城 
*/
module game.modules.shop {
    export class ShangChengMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.ShopShangChengUI;
        public _xiaoJianPanMediator: game.modules.tips.XiaoJianPanMediator;
        private _tipsModule: game.modules.tips.tipsModule;
        private _yinBiTips: commonUI.JinBiBuZuViewMediator;
        private _remindViewMediator: commonUI.RemindViewMediator;
        /** 杂货商品 */
        public viewArr1: Array<CMallShopBaseVo> = [];
        /** 强化材料 */
        public viewArr2: Array<CMallShopBaseVo> = [];
        /** 每周限购 */
        public viewArr3: Array<CMallShopBaseVo> = [];
        /** 模拟元宝数量 */
        public hadYuanBao: number;
        /** 模拟金币数量 */
        public hadJinBi: number;
        /** 模拟银币数量 */
        public hadYinBi: number;
        /** 购买数量 */
        public buyNum: number;
        /** 已经购买数量 */
        public hadBuyNum: number;
        /** 是否显示小键盘 */
        public isShowKeyboard: number = 0;
        /** 跳转界面显示该物品的标签 */
        public scItemId: number;

        constructor(uiLayer: Sprite, app: AppBase) {
            super(uiLayer);
            this._viewUI = new ui.common.ShopShangChengUI();
            this._viewUI.mouseThrough = true;
            this.isCenter = false;
            this._app = app;

            this._xiaoJianPanMediator = new game.modules.tips.XiaoJianPanMediator(this._viewUI);
            this._yinBiTips = new commonUI.JinBiBuZuViewMediator(this._viewUI, this._app);
            this._remindViewMediator = commonUI.RemindViewMediator.getInstance(this._viewUI, app);

            this._viewUI.showList_list.renderHandler = new Handler(this, this.onSelect);
            this._viewUI.shangCheng_tab.selectHandler = new Handler(this, this.tebBtnOn);

            this._viewUI.showKeyboard_btn.on(LEvent.MOUSE_DOWN, this, () => {
                this._xiaoJianPanMediator.show();
                this.isShowKeyboard = 1;
                this.selectTimes = 0;
                this._xiaoJianPanMediator.getView().x = 48;
                this._xiaoJianPanMediator.getView().y = 446;
                game.modules.tips.models.TipsProxy.getInstance().on(game.modules.tips.models.ON_KRYBOARD, this, this.setKeyboardBtns);
            });

            this._viewUI.reduceNum_btn.on(LEvent.MOUSE_DOWN, this, this.reduceNumBtnHandler);
            this._viewUI.addNum_btn.on(LEvent.MOUSE_DOWN, this, this.addNumBtnHandler);
            this._viewUI.buy_btn.on(LEvent.MOUSE_DOWN, this, this.buyBtnHandler);

            
        }
        /**
         * @describe 商会窗口初始化 
         * @param  viewType 页面类型   
         */
        public init(viewType: number): void {
            this.show();
            this._yinBiTips.on(commonUI.USE_GOLD_EXCHANGE_EVENT, this, this.jinbijiesuo);
            this._yinBiTips.on(commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.yuanbaojiesuo);
            this._yinBiTips.on(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.jinbibuzu);
            this._remindViewMediator.on(commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
            this._remindViewMediator.on(commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);
            this._viewUI.buySuccess_box.visible = false;
            this.scItemId = models.ShopModel.getInstance().scItemId;
            //获取玩家银币，金币，元宝数量
            this.hadYuanBao = game.modules.mainhud.models.HudModel.getInstance().fuShiNum;
            this.hadYinBi = game.modules.mainhud.models.HudModel.getInstance().sliverNum;
            this.hadJinBi = game.modules.mainhud.models.HudModel.getInstance().goldNum;
            this._viewUI.hadNum_lab.text = this.setNumStyle(this.hadYinBi);
            this._viewUI.spendNum_lab.text = "0";
            this._viewUI.num_lab.text = "0";

            this._viewUI.shangCheng_tab.selectedIndex = viewType - 1;
            this.cutView(viewType - 1);
        }
        /** 选中物品的按钮监听 */
        public onSelect(cell: Laya.Box, index: number): void {
            var arr: Array<CMallShopBaseVo> = [];
            switch (this._viewUI.shangCheng_tab.selectedIndex) {
                case 0:
                    arr = this.viewArr1;
                    break;
                case 1:
                    arr = this.viewArr2;
                    break;
                case 2:
                    arr = this.viewArr3;
                    break;
            }
            var btn = cell.getChildByName("cell_btn") as Laya.Button;
            btn.on(LEvent.MOUSE_DOWN, this, this.btnHandler, [index, arr]);

            var getTips = cell.getChildByName("getTips_btn") as Laya.Button;
            getTips.on(LEvent.MOUSE_DOWN, this, this.getTips, [index, arr]);
        }
        /** 物品信息弹窗 */
        public getTips(index: number, arr: Array<CMallShopBaseVo>): void {
            var _goodsBinDic = ShopModel.getInstance().GoodsBinDic;
            var itemId = _goodsBinDic[arr[index].id].itemId;
            var parame: Dictionary = new Dictionary();
            parame.set("itemId", itemId);
            this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
        }
        /** 选中的物品编号 */
        public selectIndex: number;
        /** 选中后的按钮样式 */
        public setBtnStyle(index: number) {
            if (this.selectIndex != index) {
                if (this.selectIndex != -1) {
                    var data = { cell_btn: { selected: false } };
                    this._viewUI.showList_list.setItem(this.selectIndex, data);
                }
                var data = { cell_btn: { selected: true } };
                this._viewUI.showList_list.setItem(index, data);
                this.selectIndex = index;
            } else {
                var data = { cell_btn: { selected: true } };
                this._viewUI.showList_list.setItem(index, data);
                this.selectIndex = -1;
            }
        }
        /** 选中的物品的相关信息 */
        public goodsBaseVo: game.data.template.CGoodsBaseVo;
        /** 为当前选中物品的后续操作准备 */
        public btnHandler(index: number, arr: Array<CMallShopBaseVo>): void {
            if (this.selectIndex == index) {
                this.addNumBtnHandler();
                return;
            }
            this.setBtnStyle(index);
            this._viewUI.showKeyboard_btn.visible = true;
            var _goodsBinDic = ShopModel.getInstance().GoodsBinDic;
            var _goodslimitsBinDic = ShopModel.getInstance().goodslimitsBinDic;
            this.goodsBaseVo = _goodsBinDic[arr[index].id];

            var _currencys = this.goodsBaseVo.currencys[0];     //货币类型
            this.setMoneyStyle(_currencys);

            if (_goodslimitsBinDic != undefined) {
                this.hadBuyNum = _goodslimitsBinDic.get(arr[index].id);
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
            if (this.goodsBaseVo.limitType > 0 && (this.goodsBaseVo.limitNum - ShopModel.getInstance().goodslimitsBinDic.get(this.viewArr3[this.selectIndex].id)) <= this.buyNum) return;
            this.buyNum = parseInt(this.buyNum + "") + 1;
            this.setBuyNum(this.buyNum);
        }
        /** 0表示刚开启键盘，点击按钮不与原显示数字叠加（1+1→11）*/
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
                (this.goodsBaseVo.limitNum - ShopModel.getInstance().goodslimitsBinDic.get(this.viewArr3[this.selectIndex].id)) <= this.buyNum) {
                var num = this.goodsBaseVo.limitNum - ShopModel.getInstance().goodslimitsBinDic.get(this.viewArr3[this.selectIndex].id);
                if (num <= 0) {
                    this.buyNum = 1;
                } else {
                    this.buyNum = this.goodsBaseVo.limitNum - ShopModel.getInstance().goodslimitsBinDic.get(this.viewArr3[this.selectIndex].id);
                }
                // game.modules.tips.models.TipsProxy.getInstance().off(game.modules.tips.models.ON_KRYBOARD, this, this.setKeyboardBtns);
            }
            this.setBuyNum(this.buyNum);
        }
        /** 点击购买按钮 */
        public buyBtnHandler() {
            if (bagModel.getInstance().chargeBagIsFull()) {
                let promoto = HudModel.getInstance().promptAssembleBack(PromptExplain.FULL_OF_BAG);
                let disappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                disappearMessageTipsMediator.onShow(promoto);

            } else if (this.goodsBaseVo.limitType > 0 &&
                (this.goodsBaseVo.limitNum - ShopModel.getInstance().goodslimitsBinDic.get(this.viewArr3[this.selectIndex].id)) <= 0) {
                let promoto = HudModel.getInstance().promptAssembleBack(PromptExplain.UPLIMIT_SC);
                let disappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                disappearMessageTipsMediator.onShow(promoto);

            } else if (this.goodsBaseVo.currencys[0] == 1 && this.goodsBaseVo.prices[0] * this.buyNum > this.hadYinBi) {
                var wantYinBi = this.goodsBaseVo.prices[0] * this.buyNum - this.hadYinBi;
                this._yinBiTips.onShow(false, wantYinBi + "", Math.ceil(wantYinBi / 10000) + "", Math.ceil(wantYinBi / 100) + "");
                // this._yinBiTips.once(commonUI.USE_GOLD_EXCHANGE_EVENT, this, this.jinbijiesuo, [Math.ceil(wantYinBi / 100)]);
                // this._yinBiTips.once(commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.yuanbaojiesuo, [Math.ceil(wantYinBi / 10000)]);
                this.needJinBi = Math.ceil(wantYinBi / 100);
                this.needYuanBao = Math.ceil(wantYinBi / 10000);

            } else if (this.goodsBaseVo.currencys[0] == 2 && this.goodsBaseVo.prices[0] * this.buyNum > this.hadJinBi) {
                var wantJinBi = this.goodsBaseVo.prices[0] * this.buyNum - this.hadJinBi;
                this._yinBiTips.onShow(true, wantJinBi + "", Math.ceil(wantJinBi / 100) + "");
                // this._yinBiTips.once(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.jinbibuzu, [Math.ceil(wantJinBi / 100)]);
                this.wantYuanBao = Math.ceil(wantJinBi / 100);

            } else if (this.goodsBaseVo.currencys[0] == 3 && this.goodsBaseVo.prices[0] * this.buyNum > this.hadYuanBao) {
                let prompto = HudModel.getInstance().promptAssembleBack(PromptExplain.CHARGE_TIPS);
                let cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
                let rightBtnName =  cstringResConfigData[Intra_ProgramString.ENSURE].msg;
                this._remindViewMediator.onShow(prompto,rightBtnName);
                this._remindViewMediator.once(commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
                this._remindViewMediator.once(commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);

            } else {
                RequesterProtocols._instance.c2s_buy_mallshop(6, 0, this.goodsBaseVo.id, this.buyNum);
            }
            game.modules.shop.models.ShopProxy.getInstance().once(game.modules.shop.models.BUYSUCCESS_EVENT, this, this.shopOn);
        }
        /** 金币兑换银币 */
        public needJinBi: number = 0;
        public jinbijiesuo(): void {
            this._yinBiTips.hide();
            if (this.needJinBi < this.hadJinBi) {
                RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_GoldCoin, MoneyTypes.MoneyType_SilverCoin, this.needJinBi);
                bag.models.BagProxy.getInstance().once(bag.models.REFRESH_CURRENCY_EVENT, this, () => {
                    RequesterProtocols._instance.c2s_buy_mallshop(6, 0, this.goodsBaseVo.id, this.buyNum);
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
                    RequesterProtocols._instance.c2s_buy_mallshop(6, 0, this.goodsBaseVo.id, this.buyNum);
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
                    RequesterProtocols._instance.c2s_buy_mallshop(6, 0, this.goodsBaseVo.id, this.buyNum);
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
            this._viewUI.buySuccess_box.visible = true;
            this._viewUI.buyNum_lab.text = "你购买了" + this.buyNum + "个" + BagModel.getInstance().itemAttrData[this.goodsBaseVo.itemId].name;
            Laya.timer.once(2000, this, this.clearTime);
            if (this.goodsBaseVo.limitType > 0) {
                this.setList(this.viewArr3);
            }
            var _currencys = this.goodsBaseVo.currencys[0];     //货币类型
            this.setMoneyStyle(_currencys);
            this.buyNum = 1;
            this.setBuyNum(this.buyNum);
        }
        /** 清除定时器-隐藏购买成功提示 */
        public clearTime() {
            this._viewUI.buySuccess_box.visible = false;
            Laya.timer.clear(this, this.clearTime);
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
            this._viewUI.spendNum_lab.text = this.setNumStyle(this.goodsBaseVo.prices[0] * num);
            if (this.goodsBaseVo.currencys[0] == 1 && this.goodsBaseVo.prices[0] * num > this.hadYinBi) {
                this._viewUI.spendNum_lab.stroke = 5;
                this._viewUI.spendNum_lab.strokeColor = "#f46563";
            } else if (this.goodsBaseVo.currencys[0] == 2 && this.goodsBaseVo.prices[0] * num > this.hadJinBi) {
                this._viewUI.spendNum_lab.stroke = 5;
                this._viewUI.spendNum_lab.strokeColor = "#f46563";
            } else if (this.goodsBaseVo.currencys[0] == 3 && this.goodsBaseVo.prices[0] * num > this.hadYuanBao) {
                this._viewUI.spendNum_lab.stroke = 5;
                this._viewUI.spendNum_lab.strokeColor = "#f46563";
            } else {
                this._viewUI.spendNum_lab.stroke = 0;
                this._viewUI.spendNum_lab.strokeColor = "#000000";
            }
        }
        /** 页签类型按钮监听 */
        public tebBtnOn(index: number) {
            this.selectIndex = -1;
            this._viewUI.showKeyboard_btn.visible = false;
            // this.btnHandler();
            this.cutView(index);
        }
        /** 切换界面 */
        public cutView(index: number): void {
            this.buyNum = 0;
            this.setBuyNum(0);
            this._viewUI.hadNum_lab.text = this.setNumStyle(this.hadYuanBao);
            this._viewUI.spendNum_lab.text = "0";
            this._viewUI.num_lab.text = "0";

            var arr: Array<any> = [];
            switch (index) {
                case 0:
                    arr = this.viewArr1;
                    break;
                case 1:
                    arr = this.viewArr2;
                    break;
                case 2:
                    arr = this.viewArr3;
                    break;
            }
            this.setList(arr);
            this._viewUI.showList_list.vScrollBarSkin = "";
            this._viewUI.showList_list.repeatX = 1;
            this._viewUI.showList_list.scrollBar.elasticBackTime = 500;
            this._viewUI.showList_list.scrollBar.elasticDistance = 20;
        }
        /** 商品列表设置数据 */
        public setList(arr): void {
            var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
            var _goodsBinDic = ShopModel.getInstance().GoodsBinDic;
            var _goodslimitsBinDic = ShopModel.getInstance().goodslimitsBinDic;

            var skinArr: Array<any> = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
                "common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
                "common/ui/tongyong/jinkuang.png"];

            var data: Array<any> = [];
            for (var i: number = 0; i < arr.length - 1; i++) {
                var _goodsVo = _goodsBinDic[arr[i].id];
                var _numText: string;
                var _remaiVisi: boolean = false;
                var _remaiSkin: string = "";
                var _daZheVisi: boolean = false;
                var _daZheText: string = "";
                var _cellBtn: boolean = false;

                //是否显示标签
                if (this.scItemId != 0 && _goodsVo.itemId == this.scItemId) {
                    _remaiVisi = true;
                    _remaiSkin = "common/ui/tongyong/shop_xuqiu.png";
                } else if (arr[i].cuxiaotype == 1) {
                    _remaiVisi = true;
                    _remaiSkin = "common/ui/shopui/shop_xinpin.png";
                } else if (arr[i].cuxiaotype == 2) {
                    _remaiVisi = true;
                    _remaiSkin = "common/ui/shopui/shop_remai.png";
                }
                //是否显示打折
                var daZhe = _goodsVo.prices[0] / _goodsVo.oldprices[0];
                if (daZhe != 1) {
                    _daZheVisi = true;
                    var text: string = (Math.round(daZhe * 1000) / 100) + "";
                    _daZheText = (text.substring(0, text.indexOf(".") + 2)) + " 折";
                }
                //剩余数量设置
                if (_goodsVo.limitType == 0 && _goodsVo.limitNum == 0) {
                    _numText = "";
                } else {
                    //限购
                    if (_goodsVo.limitNum <= _goodslimitsBinDic.get(arr[i].id)) {
                        _numText = "";
                        _remaiVisi = true;
                        _remaiSkin = "common/ui/shopui/shop_shoukong.png";
                    } else {
                        if (_goodsVo.limitNum - _goodslimitsBinDic.get(arr[i].id) == 1) {
                            _numText = "1";
                        } else {
                            _numText = _goodsVo.limitNum - _goodslimitsBinDic.get(arr[i].id) + "";
                        }
                    }
                }
                if (this.selectIndex == i) {
                    _cellBtn = true;
                }
                data.push({
                    cell_btn: { selected: _cellBtn },
                    num_lab: { text: _numText },
                    icon_img: { skin: models.ShopModel.getInstance().getSrc(_itemAttrBinDic[_goodsVo.itemId].icon) },
                    diban_img: { skin: skinArr[_itemAttrBinDic[_goodsVo.itemId].nquality - 1] },
                    name_lab: { text: _itemAttrBinDic[_goodsVo.itemId].name },
                    biaoQian_img: { visible: _remaiVisi, skin: _remaiSkin },
                    money_lab: { text: this.setNumStyle(_goodsVo.prices[0]) },    //0为现价1
                    money_img: { skin: this.getHuoBi(_goodsVo.currencys[0]) },
                    daZhe_lab: { text: _daZheText },
                    daZhe_img: { visible: _daZheVisi },
                });
            }
            this._viewUI.showList_list.array = data;
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