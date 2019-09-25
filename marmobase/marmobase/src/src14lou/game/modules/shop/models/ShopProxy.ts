module game.modules.shop.models {
    export const REGCHARGE_EVENT: string = "reqChargeEvent";
    export const CHARGESTATE_EVENT: string = "chargeStateEvent";
    export const FUSHINUM_EVENT: string = "fushiNumEvent";
    export const SHANGHUIBUYSUCCESS_EVENT: string = "notifyBuySuccessEvent";
    export const BUYSUCCESS_EVENT: string = "refreshCurrencyEvent";
    export const ITEMNUM_EVENT: string = "itemNumEvent";
    export const QUERYLIMIT_EVENT: string = "QueryLimitEvent";
    export const Go_Charge: string = "Go_Charge";
    export class ShopProxy extends hanlder.ProxyBase {
        constructor() {
            super();
            ShopProxy._instance = this;
            this.init();
        }
        public static _instance: ShopProxy;
        public static getInstance(): ShopProxy {
            if (!this._instance) {
                this._instance = new ShopProxy();
            }
            return this._instance;
        }

        public init(): void {
            ShopModel.getInstance();
            this.addNetworkListener();
            //vip奖励
            Laya.loader.load("common/data/temp/fushi.cvipinfo.bin", Handler.create(this, this.onloadedVipInfoComplete), null, Loader.BUFFER);
            //商品配置表
            Laya.loader.load("common/data/temp/shop.cmallshop.bin", Handler.create(this, this.onloadedMallShop), null, Loader.BUFFER);
            //商品表
            Laya.loader.load("common/data/temp/shop.cgoods.bin", Handler.create(this, this.onloadedGoods), null, Loader.BUFFER);
            //商会一级菜单
            Laya.loader.load("common/data/temp/shop.ccommercefirstmenu.bin", Handler.create(this, this.onloadedCommerceFirstMenu), null, Loader.BUFFER);
            //商会二级菜单
            Laya.loader.load("common/data/temp/shop.ccommercesecondmenu.bin", Handler.create(this, this.onloadedCommerceSecondMenu), null, Loader.BUFFER);
            //充值配置表
            Laya.loader.load("common/data/temp/fushi.caddcashlua.bin", Handler.create(this, this.onloadedAddCashlua), null, Loader.BUFFER);
            //加载妖魂玉商店（神兽商店）的商品配置表
            Laya.loader.load("common/data/temp/shop.cshenshoushop.bin", Handler.create(this, this.onloadcShenShouShop), null, Loader.BUFFER);
        }
        /** 加载妖魂玉商店（神兽商店）的商品配置表 */
        private onloadcShenShouShop():void{            
            var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.cshenshoushop.bin");
            var data: Byte = new Byte(arrayBuffer);
            var size: number = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, ShopModel._instance.cShenShouShop, game.data.template.CShenShouShopBaseVo, "id");
        }
        onloadedAddCashlua(): void {
            var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/fushi.caddcashlua.bin");
            var data: Byte = new Byte(arrayBuffer);
            var size: number = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, ShopModel._instance.CashluaBinDic, game.data.template.AddCashluaBaseVo, "id");
            // console.log("onloadedAddCashlua:", ShopModel._instance.CashluaBinDic);
        }
        onloadedCommerceSecondMenu(): void {
            var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.ccommercesecondmenu.bin");
            var data: Byte = new Byte(arrayBuffer);
            var size: number = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, ShopModel._instance.CommerceSecondMenuBinDic, game.data.template.CCommerceSecondMenuBaseVo, "id");
            // console.log("onloadedCommerceSecondMenu:", ShopModel._instance.CommerceSecondMenuBinDic);
        }
        onloadedCommerceFirstMenu(): void {
            var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.ccommercefirstmenu.bin");
            var data: Byte = new Byte(arrayBuffer);
            var size: number = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, ShopModel._instance.CommerceFirstMenuBinDic, game.data.template.CCommerceFirstMenuBaseVo, "id");
            // console.log("onloadedCommerceFirstMenu:", ShopModel._instance.CommerceFirstMenuBinDic);
        }
        onloadedGoods(): void {
            var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.cgoods.bin");
            var data: Byte = new Byte(arrayBuffer);
            var size: number = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, ShopModel._instance.GoodsBinDic, game.data.template.CGoodsBaseVo, "id");
            data.pos = 0;
            size = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, ShopModel.getInstance().cGoodsDataForItemId, game.data.template.CGoodsBaseVo, "itemId");
            data.pos = 0;
            size = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillMap(data, size, ShopModel._instance.GoodsAtLimitType, game.data.template.CGoodsBaseVo, "limitType");
            ShopModel.getInstance().setShopArr();
            // console.log("onloadedGoods:", ShopModel._instance.GoodsBinDic);
        }
        onloadedMallShop(): void {
            var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.cmallshop.bin");
            var data: Byte = new Byte(arrayBuffer);
            var size: number = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, ShopModel._instance.MallShopBinDic, game.data.template.CMallShopBaseVo, "id");
            data.pos = 0;
            size = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillMap(data, size, ShopModel._instance.MallShopAtType, game.data.template.CMallShopBaseVo, "type");
            // console.log("onloadedMallShop:", ShopModel._instance.MallShopAtType);
        }
        onloadedVipInfoComplete(): void {
            var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cvipinfo.bin");
            var data: Byte = new Byte(arrayBuffer);
            var size: number = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, ShopModel.getInstance().VipInfoBinDic, game.data.template.VipInfoBaseVo, "id");
            // console.log("onloadedVipInfoComplete:",ShopModel._instance.VipInfoBinDic);
        }

        /**添加监听*/
        private addNetworkListener(): void {
            Network._instance.addHanlder(ProtocolsEnum.SReqCharge, this, this.onReqCharge);
            Network._instance.addHanlder(ProtocolsEnum.SRefreshChargeState, this, this.onRefreshChargeState);
            Network._instance.addHanlder(ProtocolsEnum.SReqFushiNum, this, this.onReqFushiNum);
            Network._instance.addHanlder(ProtocolsEnum.SRequestChargeReturnProfit, this, this.onRequestChargeReturnProfit);
            Network._instance.addHanlder(ProtocolsEnum.SNotifyBuySuccess, this, this.onNotifyBuySuccess);
            Network._instance.addHanlder(ProtocolsEnum.SRefreshCurrency, this, this.onRefreshCurrency);
            Network._instance.addHanlder(ProtocolsEnum.SItemNumChange, this, this.onItemNumChange);
            Network._instance.addHanlder(ProtocolsEnum.SQueryLimit, this, this.onQueryLimit);
        }
        /*移除监听*/
        private removeNetworkListener(): void {
            Network._instance.removeHanlder(ProtocolsEnum.SReqCharge, this, this.onReqCharge);
            Network._instance.removeHanlder(ProtocolsEnum.SRefreshChargeState, this, this.onRefreshChargeState);
            Network._instance.removeHanlder(ProtocolsEnum.SReqFushiNum, this, this.onReqFushiNum);
            Network._instance.removeHanlder(ProtocolsEnum.SRequestChargeReturnProfit, this, this.onRequestChargeReturnProfit);
            Network._instance.removeHanlder(ProtocolsEnum.SNotifyBuySuccess, this, this.onNotifyBuySuccess);
            Network._instance.removeHanlder(ProtocolsEnum.SRefreshCurrency, this, this.onRefreshCurrency);
            Network._instance.removeHanlder(ProtocolsEnum.SItemNumChange, this, this.onItemNumChange);
            Network._instance.removeHanlder(ProtocolsEnum.SQueryLimit, this, this.onQueryLimit);
        }
        /**限购返回*/
        private onQueryLimit(optcode: number, msg: hanlder.S2C_query_limit): void {
            if (msg.querytype == queryType.SHOP_BUY_TIMES) {
                if (ShopModel.getInstance().goodslimitsBinDic != null) {
                    for (var i: number = 0; i < msg.goodslimits.length; i++) {
                        ShopModel.getInstance().goodslimitsBinDic.set(msg.goodslimits[i].goodsid, msg.goodslimits[i].number);
                    }
                } else {
                    let _goodslimit = new Laya.Dictionary();
                    for (var i: number = 0; i < msg.goodslimits.length; i++) {
                        _goodslimit.set(msg.goodslimits[i].goodsid, msg.goodslimits[i].number);
                    }
                    ShopModel.getInstance().goodslimitsBinDic = _goodslimit;
                }
                ShopProxy.getInstance().event(models.QUERYLIMIT_EVENT);
            } else if (msg.querytype == queryType.SHOP_SALE_TIMES) {/** 限售数据 */
                let _goodslimits = new Laya.Dictionary();
                for (var i: number = 0; i < msg.goodslimits.length; i++) {
                    _goodslimits.set(msg.goodslimits[i].goodsid, msg.goodslimits[i].number);
                }
                ShopModel.getInstance().goodsSaleLimit = _goodslimits;
            }
        }
        /**商会物品购买成功返回*/
        private onItemNumChange(optcode: number, msg: hanlder.S2C_SItemNum_Change): void {
            let itemNumVo = new ItemNumVo();

            itemNumVo.packid = msg.packid;
            itemNumVo.keyinpack = msg.keyinpack;
            itemNumVo.curnum = msg.curnum;

            ShopModel.getInstance().itemNumVo = itemNumVo;
            ShopProxy.getInstance().event(models.ITEMNUM_EVENT);
        }
        /**商会物品购买成功返回*/
        private onRefreshCurrency(optcode: number, msg: hanlder.S2C_SRefresh_Currency): void {
            ShopModel.getInstance().currency = msg.currency;
            ShopProxy.getInstance().event(models.SHANGHUIBUYSUCCESS_EVENT);
        }
        /**商城购买成功返回*/
        private onNotifyBuySuccess(optcode: number, msg: hanlder.S2C_notify_buysuccess): void {
            let notifyBuySuccessVo = new NotifyBuySuccessVo();

            notifyBuySuccessVo.notifytype = msg.notifytype;
            notifyBuySuccessVo.name = msg.name;
            notifyBuySuccessVo.number = msg.number;
            notifyBuySuccessVo.money = msg.money;
            notifyBuySuccessVo.currency = msg.currency;
            notifyBuySuccessVo.itemorpet = msg.itemorpet;
            notifyBuySuccessVo.units = msg.units;

            ShopModel.getInstance().notifyBuySuccessVo = notifyBuySuccessVo;
            ShopProxy.getInstance().event(models.BUYSUCCESS_EVENT);
        }
        /**充值成功后的返回*/
        private onRequestChargeReturnProfit(optcode: number, msg: hanlder.S2C_SRequestChargeReturnProfit): void {
            ShopModel.getInstance().listchargereturnprofit = msg.listchargereturnprofit;
        }
        /**充值成功后-浮石数量刷新返回*/
        private onReqFushiNum(optcode: number, msg: hanlder.S2C_SReqFushiNum): void {
            let fushiNumVo = new FushiNumVo();
            fushiNumVo.num = msg.num;
            fushiNumVo.bindNum = msg.bindNum;
            fushiNumVo.totalnum = msg.totalnum;

            ShopModel.getInstance().fushiNumVo = fushiNumVo;
            ShopProxy.getInstance().event(models.FUSHINUM_EVENT);
        }
        /**充值成功后返回*/
        private onRefreshChargeState(optcode: number, msg: hanlder.S2C_SRefreshChargeState): void {
            let chargeStateVo = new ChargeStateVo();
            chargeStateVo.state = msg.state;
            chargeStateVo.flag = msg.flag;

            ShopModel.getInstance().chargeStateVo = chargeStateVo;
            ShopProxy.getInstance().event(models.CHARGESTATE_EVENT);
        }
        /**点击充值返回可购买的种类*/
        private onReqCharge(optcode: number, msg: hanlder.S2C_SReqCharge): void {
            ShopModel.getInstance().goods = msg.goods;
            ShopProxy.getInstance().event(models.REGCHARGE_EVENT);
        }
    }
}