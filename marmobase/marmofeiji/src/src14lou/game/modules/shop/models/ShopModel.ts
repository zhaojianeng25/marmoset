/**
* ShopModel 
*/

/** 商城标签 */
enum shopMediatorType {
    /** 商会 */
    SHANGHUI = 0,
    /** 商城 */
    SHANGCHANG = 1,
    /** 充值 */
    CHONGZHI = 2,
}
/** 商会一级菜单 */
enum firstMenuType {
    /** 宝石 */
    BAOSHI = 1,
    /** 装备 */
    ZHUANGBEI = 2,
    /** 宠物 */
    PET = 3,
    /** 其它 */
    QITA = 4,
}
/** 查询商品购售类型 */
enum queryType {
    /** 1商品限购次数查询 */
    SHOP_BUY_TIMES = 1, //   
    /** 2商品限售次数查询*/
    SHOP_SALE_TIMES = 2
}
/** shop购买类型 */
enum ShopBuyType {
        /** 普通商店 */
        NORMAL_SHOP = 1,
        /** 宠物商店 */
        PET_SHOP = 2,
        /** 商城 */
        MALL_SHOP =3,
        /** 商会买 */
        CHAMBER_OF_COMMERCE_SHOP_BUY = 4,
        /** 商会卖 */
        CHAMBER_OF_COMMERCE_SHOP_SALE = 5,
        /** 兑换商店 */
        EXCHANGE_BUY = 6,
        /** 神兽商店 */
        SHENSHOU_SHOP =7,
        /** 天梯商店买 */
        TIANTI_SHOP_BUY = 8,
        /** 天梯商店卖 */
        TIANTI_SHOP_SALE = 9
}
module game.modules.shop.models {

    export class ShopModel {
        /** vip奖励 */
        public VipInfoBinDic: Object = {};      
        /** 商品表 */
        public GoodsBinDic: Object = {};
		/**商品表、根据类型对应itemId取值 */
		public cGoodsDataForItemId: Object = {};
        /** 妖魂玉商店的商品配置表 */   
        public cShenShouShop: Object = {};
        /** 商品表通过type取值 */
        public GoodsAtLimitType: Laya.Dictionary = new Laya.Dictionary;
        /** 一级菜单 */
        public CommerceFirstMenuBinDic: Object = {};        
        /** 二级菜单 */
        public CommerceSecondMenuBinDic: Object = {};      
        /** 充值配置表 */
        public CashluaBinDic: Object = {};       
        /** 商品分类表 */
        public MallShopBinDic: Object = {};      
        /** 商品分类表通过type取值 */
        public MallShopAtType: Laya.Dictionary = new Laya.Dictionary(); 
        /** 充值列表信息 */
        public goods: Array<GoodInfoVo> = [];

        public chargeStateVo: ChargeStateVo;
        public fushiNumVo: FushiNumVo;
        public listchargereturnprofit: Array<ChargeReturnProfitVo>;

        /** 商城购买成功后的相关信息 */
        public notifyBuySuccessVo: NotifyBuySuccessVo;
        /** 商会物品购买成功返还的物品详细信息 */
        public itemNumVo: ItemNumVo;
        public currency: Laya.Dictionary;
        /** 商品购买限制 */
        public goodslimitsBinDic: Laya.Dictionary;
        /** 商品出售限制 */
        public goodsSaleLimit: Laya.Dictionary;
        /** 商会物品id，跳转时使用-显示需求标签 */
        public itemId: number = 0;
        /** 商城物品id, 跳转时使用-显示需求标签 */
        public scItemId: number = 0;
        constructor() {
            ShopModel._instance = this;

            game.modules.pet.models.PetProxy.getInstance().on(game.modules.pet.models.SHOPPRICE_EVENT, this, this.setShangHuiData);
            this.goodsSaleLimit = new Laya.Dictionary();
        }
        public static _instance: ShopModel;
        public static getInstance(): ShopModel {
            if (!this._instance) {
                this._instance = new ShopModel();
            }
            return this._instance;
        }
        public static clearModelData(): void {
            shop.models.ShopModel._instance.goods = [];
            shop.models.ShopModel._instance.chargeStateVo = new ChargeStateVo();
            shop.models.ShopModel._instance.fushiNumVo = new FushiNumVo();
            shop.models.ShopModel._instance.listchargereturnprofit = [];
            shop.models.ShopModel._instance.notifyBuySuccessVo = new NotifyBuySuccessVo();
            shop.models.ShopModel._instance.itemNumVo = new ItemNumVo();
            shop.models.ShopModel._instance.currency = new Laya.Dictionary();
            shop.models.ShopModel._instance.goodslimitsBinDic = new Laya.Dictionary();
            shop.models.ShopModel._instance.goodsSaleLimit = new Laya.Dictionary();
            shop.models.ShopModel._instance.itemId = 0;
            shop.models.ShopModel._instance.scItemId = 0;
        }

        /** 把商会数据以map形式存储 key-商品id,val-商品详细信息 */
        public shopInfoBinDic: Laya.Dictionary = new Laya.Dictionary();
        public setShangHuiData(): void {
            var _shopInfo = game.modules.pet.models.PetModel.getInstance().shopinfo;
            for (var i: number = 0; i < _shopInfo.length; i++) {
                this.shopInfoBinDic.set(_shopInfo[i].goodsid, _shopInfo[i]);
            }
        }
        /** 商会商城商品id加载，用于查询商品已购数量 */
        public shangHuiArr: Array<number> = [];
        public shangChengArr: Array<number> = [];
        public shopArr: Array<number> = [];
        public setShopArr(): void {
            var arr1: Array<CGoodsBaseVo> = this.GoodsAtLimitType.get(1);
            for (var i in arr1) {
                this.shangHuiArr.push(arr1[i].id);
            }
            for (var bin in this.GoodsBinDic) {
                if (this.GoodsBinDic[bin].id >= 4000 && this.GoodsBinDic[bin].id < 5000) {
                    if (this.GoodsBinDic[bin].limitType > 0 || this.GoodsBinDic[bin].id == 4040) {
                        this.shangChengArr.push(this.GoodsBinDic[bin].id);
                    }
                }
                if (this.GoodsBinDic[bin].limitType > 0) {
                    this.shopArr.push(this.GoodsBinDic[bin].id);
                }
            }
        }
        
        /** 获取物品图标 */
        public getSrc(index: number): string {
            var src: string = "";
            if (index <= 10000) { src = "common/icon/skill/" + index + ".png"; }
            else if (index <= 10500) { src = "common/icon/bustrole/" + index + ".png"; }
            else if (index <= 11000) { src = "common/icon/bustmonster/" + index + ".png"; }
            else if (index <= 11100) { src = "common/icon/bustpartner/" + index + ".png"; }
            else if (index <= 11200) { src = "common/icon/bustmount/" + index + ".png"; }
            else if (index <= 12000) { src = "common/icon/bustpet/" + index + ".png"; }
            else if (index <= 30000) { src = "common/icon/item/" + index + ".png"; }
            else if (index <= 30500) { src = "common/icon/avatarrole/" + index + ".png"; }
            else if (index <= 31000) { src = "common/icon/avatarmonster/" + index + ".png"; }
            else if (index <= 31100) { src = "common/icon/avatarpartner/" + index + ".png"; }
            else if (index <= 31200) { src = "common/icon/avatarmount/" + index + ".png"; }
            else if (index <= 32000) { src = "common/icon/avatarpet/" + index + ".png"; }
            else if (index <= 40500) { src = "common/icon/grayavatarrole/" + index + ".png"; }
            else if (index <= 41000) { src = "common/icon/grayavatarmonster/" + index + ".png"; }
            else if (index <= 41100) { src = "common/icon/grayavatarpartner/" + index + ".png"; }
            else if (index <= 41200) { src = "common/icon/grayavatarmount/" + index + ".png"; }
            else if (index <= 42000) { src = "common/icon/grayavatarpet/" + index + ".png"; }
            return src;
        }
    }
}