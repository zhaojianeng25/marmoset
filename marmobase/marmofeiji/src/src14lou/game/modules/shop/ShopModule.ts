
import ShopModel = game.modules.shop.models.ShopModel
import ShopProxy = game.modules.shop.models.ShopProxy
module game.modules.shop {
    /** 商城主界面 */
    export class ShopModule extends game.modules.ModuleMediator {
        private _viewUI: ui.common.ShopUI;
        private _shangHuiMediator: ShangHuiMediator;
        private _shangChengMediator: ShangChengMediator;
        private _chongZhiMediator: ChongZhiMediator;
        /** 商会一级菜单-跳转用 */
        public firstType: number;
        /** 商会二级菜单-跳转用 */
        public secondType: number;
        /** 商会跳转后物品所在位置-需要设置选中状态 */
        public selectNum: number;
        /** 商城页面类型-跳转用 */
        public scViewType: number;
        constructor(app: AppBase) {
            super();
            this.uiLayer = app.uiRoot.general;
            this._viewUI = new ui.common.ShopUI();
            this._clientWidth = app.clientWidth;
            this._clientHeight = app.clientHeight;
            this._app = app;

            this._viewUI.cutView_tab.selectHandler = new Handler(this, this.cutView);

            this._shangHuiMediator = new ShangHuiMediator(this._viewUI, this._app);
            this._shangChengMediator = new ShangChengMediator(this._viewUI, this._app);
            this._chongZhiMediator = new ChongZhiMediator(this._viewUI);

            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, () => {
                this.clickCloseBtn();
            });
        }
        public init(index: number): void {
            RequesterProtocols._instance.c2s_CRequestVipInfo();
            //点击物品跳转商会菜单列表检擦
            if (index == 0 && ShopModel.getInstance().itemId != undefined && ShopModel.getInstance().itemId != 0) {
                for (var secondId in ShopModel.getInstance().CommerceSecondMenuBinDic) {
                    var _goodsids = ShopModel.getInstance().CommerceSecondMenuBinDic[secondId].goodsids;
                    for (var i: number = 0; i < _goodsids.length; i++) {
                        if (ShopModel.getInstance().itemId == ShopModel.getInstance().GoodsBinDic[_goodsids[i]].itemId) {
                            this.selectNum = i;
                            for (var firstId in ShopModel.getInstance().CommerceFirstMenuBinDic) {
                                var _secondmenu = ShopModel.getInstance().CommerceFirstMenuBinDic[firstId].secondmenu;
                                for (var j: number = 0; j < _secondmenu.length; j++) {
                                    if (_secondmenu[j] == secondId) {
                                        this.firstType = parseInt(firstId);
                                        this.secondType = j;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            //点击物品跳转商城页面类型检擦
            if (index == 1 && ShopModel.getInstance().scItemId != undefined && ShopModel.getInstance().scItemId != 0) {
                for (var scId in ShopModel.getInstance().MallShopBinDic) {
                    var scItemId = ShopModel.getInstance().GoodsBinDic[scId].itemId;
                    if (ShopModel.getInstance().scItemId == scItemId) {
                        this.scViewType = ShopModel.getInstance().MallShopBinDic[scId].type;
                        break;
                    }
                }
            }
            this.show();
            this.cutView(index);
        }
        /** 页面加载 */
        private cutView(index: number): void {
            this._viewUI.cutView_tab.selectedIndex = index;
            switch (index) {
                case 0: //商会
                    RequesterProtocols._instance.c2s_requst_shopprice(shopType.SHANGHUI_SHOP);
                    game.modules.pet.models.PetProxy.getInstance().once(game.modules.pet.models.SHOPPRICE_EVENT, this, () => {
                        ShopModel.getInstance().scItemId = 0;
                        if (ShopModel.getInstance().itemId != undefined && ShopModel.getInstance().itemId != 0) {
                            this._shangHuiMediator.selectIndex = this.selectNum;
                            this._shangHuiMediator.init(this.firstType, this.secondType, ShopModel.getInstance().itemId);
                            this._shangHuiMediator.btnHandler(this.selectNum);
                        } else {
                            this._shangHuiMediator.selectIndex = -1;
                            this._shangHuiMediator.init(firstMenuType.BAOSHI, 0, 0);
                        }
                        this._shangChengMediator.hide();
                        this._chongZhiMediator.hide();
                    });
                    break;
                case 1: //商城
                    this.clear_SH_Select(1);
                    ShopModel.getInstance().itemId = 0;
                    var _mallShopAtType = ShopModel.getInstance().MallShopAtType;
                    this._shangChengMediator.viewArr1 = this.setData(_mallShopAtType.get(1));
                    this._shangChengMediator.viewArr2 = this.setData(_mallShopAtType.get(2));
                    this._shangChengMediator.viewArr3 = this.setData(_mallShopAtType.get(3));
                    if (ShopModel.getInstance().scItemId != undefined && ShopModel.getInstance().scItemId != 0) {
                        var arr;
                        if (this.scViewType == 1) {
                            arr = this._shangChengMediator.viewArr1;
                        } else if (this.scViewType == 2) {
                            arr = this._shangChengMediator.viewArr2;
                        } else if (this.scViewType == 3) {
                            arr = this._shangChengMediator.viewArr3;
                        }
                        var _goodsBinDic = ShopModel.getInstance().GoodsBinDic;
                        for (var i: number = 0; i < arr.length; i++) {
                            var _goodsVo = _goodsBinDic[arr[i].id];
                            if (_goodsVo.itemId == ShopModel.getInstance().scItemId) {
                                this._shangChengMediator.init(this.scViewType);
                                this._shangChengMediator.btnHandler(i, arr);
                                break;
                            }
                        }
                    } else {
                        this._shangChengMediator.selectIndex = -1;
                        this._shangChengMediator.init(1);
                    }
                    this._shangHuiMediator.hide();
                    this._chongZhiMediator.hide();
                    break;
                case 2: //充值
                    this.clear_SH_Select(2);
                    RequesterProtocols._instance.c2s_CReqCharge();
                    game.modules.shop.models.ShopProxy.getInstance().once(game.modules.shop.models.REGCHARGE_EVENT, this, () => {
                        ShopModel.getInstance().itemId = 0;
                        ShopModel.getInstance().scItemId = 0;
                        this._shangHuiMediator.hide();
                        this._shangChengMediator.hide();
                        this._chongZhiMediator.show();
                    });
                    break;
            }
        }
        /** 商城所有物品筛选 */
        public setData(arr: Array<any>): Array<any> {
            for (var i: number = 0; i < arr.length - 1; i++) {
                for (var j: number = 0; j < arr.length - 1 - i; j++) {
                    if (arr[j].order > arr[j + 1].order) {
                        var vo = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = vo;
                    }
                }
            }

            for (var i: number = arr.length - 1; i >= 0; i--) {
                if (arr[i].viplevel > game.modules.reward.models.RewardModel.getInstance().vipInfo) {
                    arr.splice(i, 1);
                }
            }
            return arr;
        }
        /** 清除商会选中编号 */
        public clear_SH_Select(num: number): void {
            if (num != 1) {
                this._shangHuiMediator.selectIndex = -1;
                this._shangHuiMediator.firstId = firstMenuType.BAOSHI;
                this._shangHuiMediator.selectNum = 0;
            }
        }
        protected onShow(event: Object): void {
            this._app.uiRoot.closeLoadProgress();
            this.init(0);
            mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
        }
        public clickCloseBtn(): void {
            mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
            this.hide();
        }
        public hide(): void {
            super.hide();
            this.clear_SH_Select(0);
            ShopModel.getInstance().itemId = 0;
            ShopModel.getInstance().scItemId = 0;
            if (LoginModel.getInstance().transferInterface != "") {
                if (LoginModel.getInstance().transferInterface == ModuleNames.STRENG_THENING)
                    StrengTheningModel.getInstance().tabNum = 1;
                ModuleManager.show(LoginModel.getInstance().transferInterface, this._app);
                LoginModel.getInstance().transferInterface = "";
            } else if (LoginModel.getInstance().CommonPage != "") {
                ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                LoginModel.getInstance().CommonPage = "";
            }
        }
        public getView(): Sprite {
            return this._viewUI;
        }
        public onJump(event: Object): void {
            this.jumpPage(event);
        }
        public jumpPage(index: any): void {
            this.init(index);
            mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
        }
    }
}