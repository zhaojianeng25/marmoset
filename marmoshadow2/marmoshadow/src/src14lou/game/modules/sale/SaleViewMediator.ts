/**
* 购买界面 
*/
import SaleModel = game.modules.sale.models.SaleModel;
module game.modules.sale {
    export class SaleViewMediator extends game.modules.UiMediator {
        public static AUCTION_EVENT: string = "auctionEvent";
        private _viewUI: ui.common.SalePaiMaiUI;
        private _AuctionSell: SaleSellViewMediator;
        private _AuctionGongshi: SaleGongshiViewMediator;
        private _SaleXiajiaViewMediator: SaleXiajiaViewMediator;
        private _SaleSearchViewMediator: SaleSearchViewMediator;
        private _TipsMessageMediator: game.modules.tips.TipsMessageMediator;
        private DisappearMessageTipsMediator: game.modules.commonUI.DisappearMessageTipsMediator;
        private SalePetViewMediator: SalePetViewMediator;
        public jinbiduihuan: commonUI.JinBiBuZuViewMediator;
        private tipsModule: game.modules.tips.tipsModule;
        /**客户端信息提示表 */
        chatMessageTips = game.modules.chat.models.ChatModel._instance.chatMessageTips;
        /**程序内字符串表 */
        cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
        /**兑换界面*/
        private _ChangeMoneyViewMediator: commonUI.ChangeMoneyViewMediator;
        /**
         * 排序后的一级摆摊配置表
         */
        m_cMarketFirstTableData = [];
        /**
         * 没有排序的一级摆摊配置表
         */
        cMarketFirstTableData = SaleModel._instance.cMarketFirstTableData;
        /**
         * 二级摆摊配置表
         */
        cMarketSecondTableData = SaleModel._instance.cMarketSecondTableData;
        /**
         * 三级摆摊配置表
         */
        cMarketThreeTableData = SaleModel._instance.cMarketThreeTableData;
        /**
        * 三级摆摊配置表 通过物品 id 取值
        */
        cMarketThreeTableDataForItemid = SaleModel._instance.cMarketThreeTableDataForItemid;
        /**食品表 */
        foodAndDrugEffectData = SaleModel._instance.foodAndDrugEffectData;
        /**食品公示表 */
        foodAndDrugFormulaData = SaleModel._instance.foodAndDrugFormulaData;
        /**装备的属性和附加属性 */
        equipTips = StrengTheningModel.getInstance().equipTips;
        /**装备附加属性库by skill */
        equipAddattributelibDataBySkill = StrengTheningModel.getInstance().equipAddattributelibDataBySkill;
        /**装备附加属性库 */
        equipAddattributelibData = StrengTheningModel.getInstance().equipAddattributelibData;
        /**属性效果id表 */
        attributeDesConfigData = StrengTheningModel.getInstance().attributeDesConfigData;
        /**复合表 */
        itemAttrData = BagModel.getInstance().itemAttrData;
        /**宠物信息表 */
        petCPetAttrData = game.modules.pet.models.PetModel._instance.petCPetAttrData;
        /**npc造型表 */
        cnpcShapeData = game.modules.createrole.models.LoginModel.getInstance().cnpcShapeInfo;
        /**物品数据 */
        goodArr: Array<any> = [];
        /**区间list的数据 */
        qujianArr: Array<any> = [];
        /**一级列表点击背景特效 */
        isOnLeftbtn: Laya.Box = null;
        /**三级列表点击背景特效 */
        threeListSelectBgBtn: Laya.Box = null;
        /**当前购买物品的数量 */
        itemNum = -1;
        /**当前购买物品的价格 */
        totalPrice = -1;
        /**物品唯一id */
        id = -1;
        /**卖家id */
        saleRoleid = -1;
        /**物品id */
        itemId = -1;
        /** 存放一级菜单名字的数组 */
        private _firstlistArr: Array<any>;
        /** 存放二级菜单数据的数组 */
        private _secondListArr: Array<any>;
        /** 一级菜单选中index */
        private _oneindex: number = -1;
        /** map中存储是每个类型的默认显示名，key是装备表的类型+等级，value是装备 */
        private resultMap: Laya.Dictionary = new Laya.Dictionary();
        /** 逻辑类型*/
        private _logictype: number;
        /** 品质选择index下标 */
        private _qualityIndex: number = 0;

        constructor(uiLayer: Sprite, app: AppBase) {
            super(uiLayer);
            this._viewUI = new ui.common.SalePaiMaiUI();
            this.isCenter = false;
            this._viewUI.qujian_box.visible = false;
            this._viewUI.gsTishi_label.visible = false;
            this._viewUI.level_btn.visible = false;
            this._app = app;
            this._ChangeMoneyViewMediator = new commonUI.ChangeMoneyViewMediator(app.uiRoot.topUnder, app);
            this.initData();
            models.SaleProxy._instance.on(models.SMarketBrowse, this, this.showThreeList);
            models.SaleProxy._instance.on(models.SMarketBuy, this, this.showThreeList);
            models.SaleProxy._instance.on(models.SAttentionGoods, this, this.flushAttent);
            models.SaleProxy._instance.on(models.buyItemTipsBtn, this, this.onBuyMoreItem);
            models.SaleProxy._instance.on(models.buySearch, this, this.onSearch);
            models.SaleProxy._instance.on(models.buyGemEguipPetSeek, this, this.onequippetseek);
            models.SaleProxy._instance.on(models.SearchItemResult, this, this.getItemDetails);
            models.SaleProxy._instance.on(models.SMarketContainerBrowse, this, this.showThreeList[1]);
            game.modules.bag.models.BagProxy.getInstance().on(game.modules.bag.models.REFRESH_CURRENCY_EVENT, this, this.showSilverNumber);
            this.registerMonitor();      //注册监听事件
            this.initqualityUI();         //初始化品质筛选界面
            this.showSilverNumber();
        }

        /**注册监听事件 */
        private registerMonitor(): void {
            //品质选择单选框点击
            this._viewUI.first_box.clickHandler = new Laya.Handler(this, this.isCheckBox, [ScreenIndex.checkone]);
            this._viewUI.second_box.clickHandler = new Laya.Handler(this, this.isCheckBox, [ScreenIndex.checktwo]);
            this._viewUI.third_box.clickHandler = new Laya.Handler(this, this.isCheckBox, [ScreenIndex.checkthree]);
            //按钮点击事件
            this._viewUI.level_btn.on(LEvent.MOUSE_DOWN, this, this.onlevelBtn);
            this._viewUI.btnGuanZ.on(LEvent.MOUSE_DOWN, this, this.Attention);
            this._viewUI.btnBuy.on(LEvent.MOUSE_DOWN, this, this.buyItem);
            this._viewUI.btnSouS.on(LEvent.MOUSE_DOWN, this, this.onbtnSouS);
            this._viewUI.addMoney_btn.on(LEvent.MOUSE_DOWN, this, this.exchangeGold);
            this._viewUI.closeQujianBox_img.on(LEvent.MOUSE_DOWN, this, this.oncloseQujianBox);
            /**匿名方法 按钮点击事件*/
            this._viewUI.closepriceBox_img.on(LEvent.MOUSE_DOWN, this, () => { this._viewUI.price_box.visible = false; });
            this._viewUI.price_btn.on(LEvent.MOUSE_DOWN, this, () => { this._viewUI.price_box.visible = true; })
        }

        /**关闭筛选界面监听*/
        private oncloseQujianBox(): void {
            this._viewUI.qujian_box.visible = false;
            this._viewUI.qujian_list.selectedIndex = this._qualityIndex;
            this.showqujianBox(false);
        }

        /**
         * 判断单选框是否选中
         * @param index 点击的index是第几个选中
         */
        private isCheckBox(index: number): void {
            var firstCheck = this._viewUI.first_box.selected;
            var secondCheck = this._viewUI.second_box.selected;
            var thirdCheck = this._viewUI.third_box.selected;

            switch (index) {
                case ScreenIndex.checkone:
                    if (secondCheck) this._viewUI.second_box.selected = true;
                    else if (thirdCheck) this._viewUI.third_box.selected = true;
                    else this._viewUI.first_box.selected = true;
                    break;
                case ScreenIndex.checktwo:
                    if (firstCheck) this._viewUI.first_box.selected = true;
                    else if (thirdCheck) this._viewUI.third_box.selected = true;
                    else this._viewUI.second_box.selected = true;
                    break;
                case ScreenIndex.checkthree:
                    if (firstCheck) this._viewUI.first_box.selected = true;
                    else if (secondCheck) this._viewUI.second_box.selected = true;
                    else this._viewUI.third_box.selected = true;
                    break;
            }
        }

        /**点击等级按钮 */
        public onlevelBtn(): void {
            if (this._viewUI.qujian_box.visible) {
                this._viewUI.qujian_box.visible = false;
            } else {
                this._viewUI.qujian_box.visible = true;
            }
        }

        /**搜索按钮 */
        public onbtnSouS() {
            this._SaleSearchViewMediator = new SaleSearchViewMediator(this._app);
            this._SaleSearchViewMediator.show();
            ModuleManager.hide(ModuleNames.SALE);
        }

        /**兑换金币 */
        public exchangeGold() {
            let isShowGold = true;
            let yuanBao = bagModel.getInstance().yuanbaoIcon;
            this._ChangeMoneyViewMediator.onShowInModule(ModuleNames.SALE, isShowGold, yuanBao);
        }

        /**充值 */
        public goRecharge() {
            ModuleManager.jumpPage(ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
            ModuleManager.hide(ModuleNames.SALE);
        }

        /**
         * 一级菜单列表
         */
        public initFirstList() {
            this._viewUI.first_list.selectedIndex = 0;
            this._viewUI.second_list.visible = false;
            this._viewUI.itemType_box.visible = false;
            this._viewUI.price_btn.visible = false;
            this._viewUI.three_list.visible = false;  //先不显示三级菜单列表
            var firstList = this._viewUI.first_list;
            var firstlistArr: Array<any> = [];
            for (var i = 0; i < this.m_cMarketFirstTableData.length; i++) {
                var name = this.m_cMarketFirstTableData[i].cMarketFirstTableData.name;
                firstlistArr.push({ typeName_label: name });
            }
            firstlistArr.unshift(this.cstringResConfigData[11194].msg);
            this._firstlistArr = firstlistArr;
            SaleModel._instance.showList(firstList, firstlistArr);
            firstList.renderHandler = new Handler(this, this.firstListRender);
            firstList.selectHandler = new Handler(this, this.firstlistSelect, [firstlistArr]);
            this.firstlistSelect(firstlistArr, 0);
        }

        /***
         * 获取一级摆摊配置表数据
         */
        public initData() {
            var cMarketFirstTableData = SaleModel._instance.cMarketFirstTableData;  //一级摆摊配置表
            var m_FirstTableData = [];
            for (var i = 2; i <= Object.keys(cMarketFirstTableData).length + 1; i++) {
                var order = cMarketFirstTableData[i].order;
                m_FirstTableData.push({ order: order, cMarketFirstTableData: cMarketFirstTableData[i] });
            }
            var compare = function (prop) {
                return function (obj1, obj2) {
                    var val1 = obj1[prop];
                    var val2 = obj2[prop];
                    if (val1 < val2) {
                        return -1;
                    } else if (val1 > val2) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            }
            this.m_cMarketFirstTableData = m_FirstTableData.sort(compare("order"));
            SaleModel._instance.m_cMarketFirstTableData = this.m_cMarketFirstTableData; //存到model中，关注中使用
        }

        /**
         * 二级菜单列表
         */
        public firstlistSelect(firstlistArr, index: number) {
            if (this._viewUI.first_list.selectedIndex != -1) {
                this._viewUI.name_label.text = firstlistArr[index].typeName_label;
                if (index - 1 < 0) { //点击关注，
                    this.guanzhu();
                } else {
                    var secondmenu = this.m_cMarketFirstTableData[index - 1].cMarketFirstTableData.secondmenus;
                    var secondListArr: Array<any> = [];
                    for (var i = 0; i < secondmenu.length; i++) {
                        var secondName = this.cMarketSecondTableData[secondmenu[i]].name;
                        var secondIconid = this.cMarketSecondTableData[secondmenu[i]].iconid;
                        var secondIcon = SaleModel.getInstance().getIcon(secondIconid);
                        var thirdmenus = this.cMarketSecondTableData[secondmenu[i]].thirdmenus;
                        secondListArr.push({ articlesLevel_label: secondName, icon_img: secondIcon, thirdmenus: thirdmenus });
                    }
                    SaleModel._instance.showList(this._viewUI.second_list, secondListArr);
                    this._secondListArr = secondListArr;
                    this._viewUI.second_list.selectHandler = new Handler(this, this.secondListSelect, [secondListArr]);
                    this._viewUI.second_list.visible = true;
                    this._oneindex = index;			//当前选中的一级栏目是什么
                    this._viewUI.first_list.selectedIndex = -1;
                    this._viewUI.three_list.visible = false;
                    this.InitItemNumerical();
                    this._viewUI.itemType_box.visible = true;
                }
            }
        }

        /**一级列表渲染 */
        public firstListRender(cell: Box, index: number) {
            var btnLeft: Button = cell.getChildByName("btnLeft") as Button;
            btnLeft.on(LEvent.MOUSE_UP, this, this.onBtnLeft, [index, cell]);
        }

        /**
         * 一级列表中点击关注按钮
         */
        public guanzhu() {
            this._viewUI.second_list.visible = false;
            this._viewUI.level_btn.visible = false;
            this._viewUI.qujian_box.visible = false;
            this._viewUI.itemType_box.visible = false;
            this._viewUI.price_btn.visible = false;
            this.CMarketAttentionBrowse();
        }

        /**
         * 点击二级列表
         */
        public secondListSelect(secondListArr, index: number) {
            if (this._viewUI.second_list.selectedIndex != -1) {
                this._viewUI.second_list.visible = false;
                this._viewUI.three_list.visible = true;
                this._viewUI.itemType_box.visible = false;
                this._viewUI.second_list.selectedIndex = -1;
                var thirdmenus = secondListArr[index].thirdmenus;   //二级菜单id
                var thirdnum = thirdmenus[0];  //默认第一个
                var firstno = this.cMarketThreeTableData[thirdnum].firstno;   //1级菜单id
                var twono = this.cMarketThreeTableData[thirdnum].twono;   //2级菜单id
                var itemtype = this.cMarketThreeTableData[thirdnum].itemtype;   //物品类型
                var logictype = this.cMarketThreeTableData[thirdnum].logictype;  //逻辑类型
                var isfloating = this.cMarketFirstTableData[firstno].isfloating;  //浮动开关，控制价格按钮的显示和隐藏,1：不显示  0：显示
                this._logictype = logictype;  // 逻辑类型
                switch (logictype) {
                    case m_logictype.zero:
                        this.logicZero(firstno, twono, thirdnum, itemtype);
                        break;
                    case m_logictype.one:
                    case m_logictype.two:
                        this._viewUI.level_btn.visible = true;
                        this.resultMap = this.logicTwoRank(thirdmenus, firstno, twono, itemtype);
                        break;
                    case m_logictype.three:
                    case m_logictype.four:
                        this._viewUI.level_btn.visible = true;
                        this.resultMap = this.logicThree(thirdmenus, firstno, twono, itemtype);
                        break;
                }
                this.isfloating(isfloating);
                this.registerBtnEvent(firstno, twono, [thirdnum], itemtype);
                this.showqujianBox(true);
            }
        }

        /**
         * 价格排序是否显示
         * @param isfloating 是否显示价格
         */
        private isfloating(isfloating: number): void {
            if (isfloating == 0) this._viewUI.price_btn.visible = true;
            else this._viewUI.price_btn.visible = false;
        }

        /**没有区间 */
        private logicZero(firstno: number, twono: number, threeno: Array<any>, itemtype: number): void {
            this._viewUI.level_btn.visible = false;
            this._viewUI.qujian_box.visible = false;
            var screenVo: game.modules.sale.models.ScreenVo = new game.modules.sale.models.ScreenVo;
            this.screenDemand(firstno, twono, threeno, itemtype, screenVo.limitmin, screenVo.limitmax, screenVo.currpage, screenVo.priceSort, screenVo.issearch);
        }

        /**
         * logic1,2装备,等级类型的map组装
         * @param thirdmenus 
         * @param screenVo 
         */
        private logicTwoRank(thirdmenus: Array<number>, firstno: number, twono: number, itemtype: number): Laya.Dictionary {
            // map中存储是每个类型的默认显示名，key是装备表的类型+等级，value是装备
            var resultMap: Laya.Dictionary = new Laya.Dictionary();
            // map中存储是每个类型下的装备，key是装备表的类型+等级，value是装备
            var tempMap: Laya.Dictionary = new Laya.Dictionary();
            // thirdmenus配置的是所有的三级数据id
            for (var i = 0; i < thirdmenus.length; i++) {
                var id = thirdmenus[i];
                var name = this.cMarketThreeTableData[id].name;
                //获取具体道具id判断品质，品质白装就是要放在分类显示的名字
                var itemid = this.cMarketThreeTableData[id].itemid;
                var itemAttrData = this.itemAttrData[itemid];
                if (!itemAttrData) continue;
                // 获取品质
                var arrVo: Array<game.modules.sale.models.ScreenVo> = [];
                var screenVo: game.modules.sale.models.ScreenVo = new game.modules.sale.models.ScreenVo;
                screenVo.firstno = firstno;
                screenVo.twono = twono;
                screenVo.itemtype = itemtype;
                screenVo.id = id;
                screenVo.name = name;
                screenVo.subType = itemAttrData.itemtypeid;
                screenVo.level = itemAttrData.level;
                // 判断一级菜单选中的 index是什么
                switch (this._oneindex) {
                    case EquipTypeIndex.GEM:
                        screenVo.typeName = itemAttrData.nquality == NqualityType.VLOLET ? name : "";
                        var k = itemAttrData.itemtypeid + "_" + itemAttrData.level;
                        break;
                    case EquipTypeIndex.TASK:
                        screenVo.typeName = itemAttrData.nquality == NqualityType.WHILE ? name : "";
                        var k = itemAttrData.itemtypeid + "_" + itemAttrData.level;
                        break;
                    case EquipTypeIndex.PET:
                        screenVo.typeName = itemAttrData.nquality == NqualityType.GREEN ? name : "";
                        var k = itemAttrData.itemtypeid + "_" + itemAttrData.name + "_" + itemAttrData.level;
                        break;
                    default:
                        screenVo.typeName = name;
                        var k = itemAttrData.itemtypeid + "_" + itemAttrData.name + "_" + itemAttrData.level;
                        break;
                }
                // 判断k值 装备类型等级 是否有相同的
                if (tempMap.indexOf(k) < 0) {
                    tempMap.set(k, [screenVo]);
                } else {
                    arrVo = tempMap.get(k);
                    // 防止策划没按品质顺序配置导致丢失类型名
                    screenVo.typeName = arrVo[0].typeName;
                    arrVo.push(screenVo);
                }
            }
            // result重整方便上层使用
            for (let j in tempMap.keys) {
                var v = tempMap.get(tempMap.keys[j]);
                resultMap.set(v[0].typeName, v);
            }
            // 把三级菜单id取出来
            var result = resultMap.get(resultMap.keys[0]);
            var threen: Array<number> = [];
            for (var index = 0; index < result.length; index++) {
                threen.push(result[index].id);
            }
            this.screenDemand(firstno, twono, threen, itemtype, screenVo.limitmin, screenVo.limitmax, screenVo.currpage, screenVo.priceSort, screenVo.issearch);
            return resultMap;
        }


        /**logic3物品区间的map组装 */
        private logicThree(thirdmenus: Array<number>, firstno: number, twono: number, itemtype: number): Laya.Dictionary {
            var resultMap: Laya.Dictionary = new Laya.Dictionary();
            var id = thirdmenus[0];         //三级菜单id
            var valuerange = this.cMarketThreeTableData[id].valuerange;
            var limitmin = valuerange[0] + 1;
            var limitmax = valuerange[1];
            var screenVo: game.modules.sale.models.ScreenVo = new game.modules.sale.models.ScreenVo;
            screenVo.id = id;
            screenVo.twono = twono;
            screenVo.firstno = firstno;
            screenVo.itemtype = itemtype;
            screenVo.valuerange = valuerange;
            screenVo.limitmin = limitmin;
            screenVo.limitmax = limitmax;
            for (var i = 0; i < screenVo.valuerange.length - 1; i++) {
                let k = screenVo.valuerange[i] + 1 + "~" + screenVo.valuerange[i + 1];
                resultMap.set(k, screenVo);
            }
            this.screenDemand(firstno, twono, [id], itemtype, limitmin, limitmax, screenVo.currpage, screenVo.priceSort, screenVo.issearch);
            return resultMap;
        }

        /** 筛选请求  价格上限和下限监听 */
        private screenDemand(firstno, twono, threeno: Array<any>, itemtype, limitmin, limitmax, currpage, priceSort, issearch): void {
            this.CMarketBrowse(firstno, twono, threeno, itemtype, limitmin, limitmax, currpage, priceSort, issearch);
            this._viewUI.priceUp_btn.on(LEvent.MOUSE_DOWN, this, this.priceUpSort, [firstno, twono, threeno, itemtype, limitmin, limitmax, currpage, issearch]);
            this._viewUI.priceDown_btn.on(LEvent.MOUSE_DOWN, this, this.priceDownSort, [firstno, twono, threeno, itemtype, limitmin, limitmax, currpage, issearch]);
        }

        /**注册翻页监听事件 */
        private registerBtnEvent(firstno, twono, [thirdnum], itemtype) {
            this._viewUI.btnLess.on(LEvent.MOUSE_DOWN, this, this.onbtnLess, [firstno, twono, [thirdnum], itemtype, 0, 0, 1, 0]);
            this._viewUI.btnAdd.on(LEvent.MOUSE_DOWN, this, this.onbtnAdd, [firstno, twono, [thirdnum], itemtype, 0, 0, 1, 0]);
        }

        /**价格排序升序 */
        public priceUpSort(firstno, twono, threeno: Array<any>, itemtype, limitmin, limitmax, currpage, issearch) {
            this.CMarketBrowse(firstno, twono, threeno, itemtype, limitmin, limitmax, currpage, 1, issearch);
            this._viewUI.price_box.visible = false;
            this._viewUI.peice_img.skin = "common/ui/tongyong/up.png";
        }

        /**价格排序降序 */
        public priceDownSort(firstno, twono, threeno: Array<any>, itemtype, limitmin, limitmax, currpage, issearch) {
            this.CMarketBrowse(firstno, twono, threeno, itemtype, limitmin, limitmax, currpage, 2, issearch);
            this._viewUI.price_box.visible = false;
            this._viewUI.peice_img.skin = "common/ui/tongyong/dowm.png";
        }

        /**页数向上翻页选择 */
        private onbtnLess(firstno, twono, threeno: Array<any>, itemtype, limitmin, limitmax, priceSort, issearch): void {
            var totalPage: number = SaleModel._instance.totalPage;  //总页数
            var currpage: number = SaleModel._instance.currPage;   //当前页
            if (totalPage > 1 && currpage >= totalPage) {
                this.CMarketBrowse(firstno, twono, threeno, itemtype, limitmin, limitmax, currpage - 1, priceSort, issearch);
            }
        }

        /**页数向下翻页选择 */
        private onbtnAdd(firstno, twono, threeno: Array<any>, itemtype, limitmin, limitmax, priceSort, issearch): void {
            var totalPage: number = SaleModel._instance.totalPage;  //总页数
            var currpage: number = SaleModel._instance.currPage;   //当前页
            if (totalPage > 1 && currpage < totalPage) {
                this.CMarketBrowse(firstno, twono, threeno, itemtype, limitmin, limitmax, currpage + 1, priceSort, issearch);
            }
        }

        /**
         * 三级菜单列表
         * @param goodslist 返回的物品
         */
        public showThreeList(num) {
            this._viewUI.three_list.visible = true;
            this._viewUI.second_list.visible = false;
            this._viewUI.itemType_box.visible = false;
            this.goodArr = [];
            var goodslist = [];

            if (num == actiontype.gongshi) {  //物品数据返回
                goodslist = SaleModel._instance.bugGoodlist;
            } else if (num == actiontype.search) { //搜索数据返回
                goodslist = SaleModel._instance.SearchResultData.get("goodslist");
            } else {   //购买栏目上架物品信息
                goodslist = SaleModel._instance.GoodList.get(attentype.buy);
            }

            if (goodslist != undefined) {
                for (var i = 0; i < goodslist.length; i++) {
                    var good = goodslist[i];
                    var itemid = good.itemid;
                    var price = good.price;
                    var num = good.num;
                    var level = good.level;
                    var id = good.id;
                    var attentionnumber = good.attentionnumber;
                    var saleRoleid = good.saleRoleid
                    var name = "";
                    var nquality = 0;
                    var iconid = 0;
                    var key = good.key;
                    if (43000 <= itemid && itemid < 43460) {
                        name = this.petCPetAttrData[itemid].name;
                        var modelid = this.petCPetAttrData[itemid].modelid;
                        iconid = this.cnpcShapeData[modelid].littleheadID;  //iconid
                        nquality = this.petCPetAttrData[itemid].quality;
                    } else {
                        name = this.itemAttrData[itemid].name;
                        iconid = this.itemAttrData[itemid].icon;
                        nquality = this.itemAttrData[itemid].nquality;
                        var destribe = this.itemAttrData[itemid].destribe;         //描述
                        var effectdes = this.itemAttrData[itemid].effectdes;       //功能
                    }
                    var itemIcon = SaleModel._instance.getIcon(iconid);
                    var frame = StrengTheningModel._instance.frameSkinArr[nquality - 1];
                    this.goodArr.push({
                        name_label: name, price_label: price, level_label: level, id: id,
                        num_label: num, bs_img: frame, icon_img: itemIcon, itemId: itemid,
                        attentionnumber: attentionnumber, saleRoleid: saleRoleid, key: key,
                    });
                }
                SaleModel._instance.showList(this._viewUI.three_list, this.goodArr);
                this._viewUI.three_list.renderHandler = new Handler(this, this.threelistRender);
                this._viewUI.three_list.selectHandler = new Handler(this, this.threelistSelect);
                this.buypresentpage();
            } else {
                this._viewUI.three_list.visible = false;
            }
        }

        /**购买页数显示 */
        private buypresentpage(): void {
            if (this.goodArr.length > 0) {
                var currpage = SaleModel._instance.currPage;
                var totalpage = SaleModel._instance.totalPage;
                this._viewUI.selectPage_label.text = currpage + "/" + totalpage;
            } else {
                this._viewUI.selectPage_label.text = 0 + "/" + 0;
            }
        }

        /**三级菜单显示 */
        public threelistRender(cell: Box, index: number) {
            if (index < this.goodArr.length) {
                var levellabel = cell.getChildByName("level_label") as Label;
                var numlabel = cell.getChildByName("num_label") as Label;
                var guanzhu = cell.getChildByName("guanzhu_img") as Laya.Image;
                var bg_btn = cell.getChildByName("bg_btn") as Button;
                var zhenpin_img = cell.getChildByName("treasure_img") as Laya.Image;
                var icon_img = cell.getChildByName("icon_img") as Laya.Image;

                var key = this.goodArr[index].key;   //key
                var itemId = this.goodArr[index].itemId;  //物品id
                var num = this.goodArr[index].num_label;    //数量
                var level = this.goodArr[index].level_label;    //等级
                var saleRoleid = this.goodArr[index].saleRoleid;    //拥有人角色id
                var attentionnumber = this.goodArr[index].attentionnumber;  // 0关注 1取消关注
                var israrity = this.cMarketThreeTableDataForItemid[itemId].israrity;  // 是否珍品   100100
                if (this.itemAttrData[itemId]) {
                    var itemtypeid = this.itemAttrData[itemId]["itemtypeid"];  // 物品描述类型id
                    var itemtypedescibe: ItemTypeBaseVo = StrengTheningModel.getInstance().itemTypeData[itemtypeid].name as ItemTypeBaseVo;   //物品描述类型名字
                }
                this.chickmonitor(icon_img, bg_btn, index, cell, itemId, saleRoleid, key, itemtypeid);

                if (attentionnumber > 0) {
                    guanzhu.visible = true;
                } else {
                    guanzhu.visible = false;
                }
                if (num > 1) {
                    numlabel.text = num;
                } else {
                    numlabel.text = "";
                }
                if (israrity > 0) {
                    levellabel.text = "";
                    zhenpin_img.visible = true;
                } else {
                    levellabel.text = this.cstringResConfigData[1].msg + level;
                    zhenpin_img.visible = false;
                }
            }
        }

        /**三级菜单里面的点击事件 */
        private chickmonitor(icon_img, bg_btn, index, cell, itemId, saleRoleid, key, itemtypeid): void {
            if (itemtypeid) icon_img.on(LEvent.MOUSE_UP, this, this.onIconchick, [itemId, saleRoleid, key, itemtypeid]);
            bg_btn.on(LEvent.MOUSE_UP, this, this.onBgBtn, [index, cell]);
        }

        /**三级菜单点击效果 */
        public onBgBtn(index, cell) {
            var equip_btn: Button = cell.getChildByName("bg_btn") as Button;
            equip_btn.selected = true;
            if (this.threeListSelectBgBtn == null) {
                this.threeListSelectBgBtn = cell;
                return;
            }
            if (this.threeListSelectBgBtn != cell) {
                var btnLeft: Button = this.threeListSelectBgBtn.getChildByName("bg_btn") as Button;
                btnLeft.selected = false;
                this.threeListSelectBgBtn = cell;
            }
        }

        /**icon点击tips */
        private onIconchick(itemId, saleRoleid, key, itemtypeid): void {
            var itemDetail: Array<any> = [];
            SaleModel._instance.itemId = itemId;
            itemDetail.push({ itemId: itemId, saleRoleid: saleRoleid, key: key, itemtypeid: itemtypeid });
            //装备                                                                                                                                                                宠物装备
            if (120000 <= itemId && itemId <= 126675 || 140000 <= itemId && itemId <= 140005 || 10000 <= itemId && itemId <= 10009 || 111000 <= itemId && 111053 || 130000 <= itemId && itemId <= 130099) {
                RequesterProtocols._instance.c2s_COtherItem_Tips(saleRoleid, BagTypes.MARKET, key);
                models.SaleProxy._instance.on(models.SOtherItemTips, this, this.iconitemtips, [itemDetail]);
            } else {
                var parame: Dictionary = new Dictionary();
                parame.set("itemId", itemDetail[0].itemId);
                this.tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame, true);
            }
        }

        /**icontips显示 */
        private iconitemtips(itemDetail, SOtherItemTipsDsc): void {
            game.modules.sale.models.SaleModel.getInstance().SOtherItemTipsDsc = SOtherItemTipsDsc;
            var tips = SOtherItemTipsDsc.get("tips");
            var packid = SOtherItemTipsDsc.get("packid");
            var key = SOtherItemTipsDsc.get("keyinpack");
            var parame: Dictionary = new Dictionary();
            parame.set("itemId", itemDetail[0].itemId);
            parame.set("equiptype", itemDetail[0].itemtypeid);
            parame.set("packid", packid);      //背包id
            parame.set("key", key);            //key值
            this.tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.AUCTION, parame, true);
        }

        /**一级菜单点击效果 */
        public onBtnLeft(index, cell) {
            var nowBtnleft: Button = cell.getChildByName("btnLeft") as Button;
            nowBtnleft.selected = true;
            if (this.isOnLeftbtn == null) {
                this.isOnLeftbtn = cell;
                return;
            }
            if (this.isOnLeftbtn != cell) {
                var btnLeft: Button = this.isOnLeftbtn.getChildByName("btnLeft") as Button;
                btnLeft.selected = false;
                this.isOnLeftbtn = cell;
            }
        }
        /**
         * 显示选择区间的box
         */
        public showqujianBox(isquality: boolean, searchName?) {
            var qujianlist = this._viewUI.qujian_list;
            if (this._logictype == m_logictype.one || this._logictype == m_logictype.two) {   //等级  物品id
                if (searchName != undefined) {
                    this._viewUI.level_btn.label = searchName;
                } else {
                    this._viewUI.level_btn.label = this.resultMap.keys[0];
                }
            } else if (this._logictype == m_logictype.three || this._logictype == m_logictype.four) {
                var valuerange = this.resultMap.keys[0];
                this._viewUI.level_btn.label = valuerange;
            }
            if (isquality) this.qualityUI();
            SaleModel._instance.showList(qujianlist, this.resultMap.keys);
            qujianlist.selectHandler = new Handler(this, this.LogictypeSelect);
            qujianlist.renderHandler = new Handler(this, this.LogictypeRender);

        }

        /**是否显示品质筛选界面*/
        private qualityUI(): void {
            switch (this._oneindex) {           // 一级菜单选中的index
                case EquipTypeIndex.GEM:
                    this.gemqualityquip();
                    break;
                case EquipTypeIndex.TASK:
                    this.gemqualitytask();
                    break;
                case EquipTypeIndex.PET:
                    this.gemqualityPet();
                    break;
                default:
                    this._viewUI.quality.visible = false;
                    break;
            }
        }

        /**区间列表显示 */
        public LogictypeRender(cell: Box, index: number) {
            var onebtn: Button = cell.getChildByName("onebtn") as Button;
            onebtn.label = this.resultMap.keys[index];
        }

        /**区间列表选择 */
        public LogictypeSelect(index: number) {
            if (this._viewUI.qujian_list.selectedIndex != -1) {
                if (this._logictype == m_logictype.one || this._logictype == m_logictype.two) {
                    var name = this.resultMap.keys[index];
                    this._viewUI.level_btn.label = name;
                    var resultMap = this.resultMap.get(name);
                    this._qualityIndex = index;
                    this.qualitySelect(resultMap);
                } else if (this._logictype == m_logictype.three || this._logictype == m_logictype.four) {
                    var valuerange = this.resultMap.keys[index];
                    this._viewUI.level_btn.label = valuerange;
                    var resultMap = this.resultMap.get(valuerange);
                    this.CMarketBrowse(resultMap.firstno, resultMap.twono, [resultMap.id], resultMap.itemtype, resultMap.limitmin, resultMap.limitmax, resultMap.currpage, resultMap.priceSort, resultMap.issearch);
                }
                this._viewUI.qujian_box.visible = false;
                this._viewUI.qujian_list.selectedIndex = -1;
            }
        }

        /**品质筛选选择*/
        private qualitySelect(resultMap): void {
            switch (this._oneindex) {
                case EquipTypeIndex.GEM:            //珍品装备品质筛选
                    var violetRadio: boolean = this._viewUI.first_box.selected;
                    var orangeRadio: boolean = this._viewUI.second_box.selected;
                    if (!violetRadio) this._viewUI.second_box.selected = true;
                    if (!orangeRadio) this._viewUI.first_box.selected = true;
                    if (violetRadio && orangeRadio) {
                        var violetid = resultMap[TraitIndex.zero].id;
                        var orangeid = resultMap[TraitIndex.one].id;
                        var threeno: Array<number> = [violetid, orangeid];
                        this.qualityCMarketBrowse(resultMap, threeno);
                    } else if (violetRadio) {
                        var violetid = resultMap[TraitIndex.zero].id;
                        this.qualityCMarketBrowse(resultMap, [violetid]);
                    } else if (orangeRadio) {
                        var orangeid = resultMap[TraitIndex.one].id;
                        this.qualityCMarketBrowse(resultMap, [orangeid]);
                    }
                    break;
                case EquipTypeIndex.TASK:          //任务装备品质筛选
                case EquipTypeIndex.PET:           //宠物装备品质筛选
                    var whiteRadio: boolean = this._viewUI.first_box.selected;          //任务装备白色   宠物装备绿色
                    var greenRadio: boolean = this._viewUI.second_box.selected;         //任务装备绿色   宠物装备蓝色
                    var blueRadio: boolean = this._viewUI.third_box.selected;           //任务装备蓝色   宠物装备紫色
                    if (whiteRadio && greenRadio && blueRadio) {//三种品质全部选中
                        var whiteid = resultMap[TraitIndex.zero].id;
                        var greenid = resultMap[TraitIndex.one].id;
                        var blueid = resultMap[TraitIndex.two].id;
                        var threeno: Array<number> = [whiteid, greenid, blueid];
                        this.qualityCMarketBrowse(resultMap, threeno);
                    } else if (whiteRadio && greenRadio) {//<白、绿>品质选中  或者 <绿、蓝>品质选中   
                        var whiteid = resultMap[TraitIndex.zero].id;
                        var greenid = resultMap[TraitIndex.one].id;
                        var threeno: Array<number> = [whiteid, greenid];
                        this.qualityCMarketBrowse(resultMap, threeno);
                    } else if (whiteRadio && blueRadio) {//<白、蓝>品质选中 或者 <绿、紫>品质选中
                        var whiteid = resultMap[TraitIndex.zero].id;
                        var blueid = resultMap[TraitIndex.two].id;
                        var threeno: Array<number> = [whiteid, blueid];
                        this.qualityCMarketBrowse(resultMap, threeno);
                    } else if (greenRadio && blueRadio) {//<绿、蓝>品质选中 或者 <蓝、紫>品质选中
                        var greenid = resultMap[TraitIndex.one].id;
                        var blueid = resultMap[TraitIndex.two].id;
                        var threeno: Array<number> = [greenid, blueid];
                        this.qualityCMarketBrowse(resultMap, threeno);
                    } else if (whiteRadio) {//只选中第一个单选框 
                        var whiteid = resultMap[TraitIndex.zero].id;
                        this.qualityCMarketBrowse(resultMap, [whiteid]);
                    } else if (greenRadio) {//只选中第二个单选框
                        var greenid = resultMap[TraitIndex.one].id;
                        this.qualityCMarketBrowse(resultMap, [greenid]);
                    } else if (blueRadio) {//只选中第三个单选框
                        var blueid = resultMap[TraitIndex.two].id;
                        this.qualityCMarketBrowse(resultMap, [blueid]);
                    }
                    break;
                default:
                    this.CMarketBrowse(resultMap[0].firstno, resultMap[0].twono, [resultMap[0].id], resultMap[0].itemtype, resultMap[0].limitmin, resultMap[0].limitmax, resultMap[0].currpage, resultMap[0].priceSort, resultMap[0].issearch);
                    break;
            }
        }

        /**品质请求筛选 */
        private qualityCMarketBrowse(resultMap, threeno: Array<number>): void {
            this.CMarketBrowse(resultMap[0].firstno, resultMap[0].twono, threeno, resultMap[0].itemtype, resultMap[0].limitmin, resultMap[0].limitmax, resultMap[0].currpage, resultMap[0].priceSort, resultMap[0].issearch);
        }

        /**获取物品详情 */
        public getItemDetails() {
            var mitemid = sale.models.SaleModel.getInstance().saleTargetId;
            sale.models.SaleModel.getInstance().saleTargetId = 0;
            this.showSearchItem(mitemid);
        }

        /**显示搜索物品 */
        public showSearchItem(mitemid) {
            //获得以物品id作为字典key的拍卖配置数据
            var _dicForItemid = models.SaleModel.getInstance().cMarketThreeTableDataForItemid;
            //获得所搜索物品在拍卖的一级菜单ID
            var _firstMenuID = _dicForItemid[mitemid]["firstno"];
            //获得所搜索物品在拍卖的二级菜单ID
            var _secondMenuId = _dicForItemid[mitemid]["twono"];
            //获得该物品一级菜单ID在一级菜单中的排序
            var _firstMenuOrder = this.cMarketFirstTableData[_firstMenuID]["order"];
            this.firstlistSelect(this._firstlistArr, _firstMenuOrder);//进行一级按钮选择
            this.setFirstListIndex(_firstMenuID);
            /** 一级菜单下二级菜单ID的数组 */
            var _secondmenu = this.cMarketFirstTableData[_firstMenuID]["secondmenus"];
            /** 该物品二级菜单ID在二级菜单ID的数组里排序 */
            var _secondMenuOrder: number;
            for (let i = 0; i < _secondmenu.length; i++) {
                if (_secondmenu[i] == _secondMenuId) {
                    _secondMenuOrder = i;
                }
            }
            this._viewUI.second_list.selectedIndex = _secondMenuOrder;
            this.secondListSelect(this._secondListArr, _secondMenuOrder);
        }


        /**
         * 筛选物品请求
         * @param firstno 一级页签类型
         * @param twono 二级页签类型
         * @param threeno 三级页签类型
         * @param itemtype 物品类型
         * @param limitmin 条件下限
         * @param limitmax 条件上限
         * @param currpage 当前页
         * @param priceSort 价格排序  1升序  2降序
         * @param issearch 0筛选 1搜索
         */
        public CMarketBrowse(firstno, twono, threeno: Array<any>, itemtype, limitmin, limitmax, currpage, priceSort, issearch) {
            RequesterProtocols._instance.c2s_market_browse(attentype.buy, firstno, twono, threeno, itemtype, limitmin, limitmax, currpage, priceSort, issearch);
        }

        /**
         * 三级表物品选择
         * @param index 选中物品的index
         */
        public threelistSelect(index: number) {
            var threelist = this._viewUI.three_list;
            if (threelist.visible) {
                var good = this.goodArr[index];
                var id = good.id;
                var itemid = good.itemId;
                var attentionnumber = good.attentionnumber;
                var israrity = this.cMarketThreeTableDataForItemid[itemid].israrity;        // 是否珍品
                if (israrity !== 0) {
                    if (attentionnumber > 0) {  // 取消关注
                        this._viewUI.btnGuanZ.label = this.cstringResConfigData[11454].msg;
                    } else {
                        this._viewUI.btnGuanZ.label = this.cstringResConfigData[11194].msg;
                    }
                }
            }
        }
        /**
         *  购买关注  或者  取消关注
         */
        public Attention() {
            var threelist = this._viewUI.three_list;
            var selectedIndex = threelist.selectedIndex;
            if (selectedIndex >= 0) {
                var good = this.goodArr[selectedIndex];
                var id = good.id;
                var itemid = good.itemId;
                var attentionnumber = good.attentionnumber;
                var itemtype = this.cMarketThreeTableDataForItemid[itemid].itemtype;      //物品类型
                var israrity = this.cMarketThreeTableDataForItemid[itemid].israrity;      //是否珍品
                if (israrity !== 0) {
                    if (attentionnumber > 0) {  //取消关注
                        this.CAttentionGoods(attentype.buy, id, attention.cancelAttent, itemtype);
                    } else { //关注
                        this.CAttentionGoods(attentype.buy, id, attention.attent, itemtype);
                    }
                } else {
                    this.DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                    this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[190023].msg);         // 不是珍品
                }
            } else {
                this.DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[190018].msg);         //未选中物品
            }
        }

        /**初始化一些选中的数据 */
        private InitItemNumerical(): void {
            if (this._viewUI.three_list.selectedIndex != -1) {
                //清除选中的btn显示   
                let index = this._viewUI.three_list.selectedIndex;
                let bg_btn = this._viewUI.three_list.getCell(index).getChildByName("bg_btn") as Button;
                bg_btn.selected = false;
            }
            this._viewUI.three_list.selectedIndex = -1;
            this._viewUI.btnGuanZ.label = this.cstringResConfigData[11194].msg;			// 关注
            this.initqualityUI();
        }

        /**购买栏目关注成功刷新 */
        public flushAttent(): void {
            var data: hanlder.S2C_attention_goods = SaleModel.getInstance().GoumaiGuanZhuData.get("data");
            var index = this._viewUI.three_list.selectedIndex;
            var guanzhu: Laya.Image = this._viewUI.three_list.getCell(index).getChildByName("guanzhu_img") as Laya.Image;			// 关注img
            if (data !== null) {
                if (data.attentype === 1) {               //购买关注
                    if (data.attentiontype === 1) {       //关注
                        guanzhu.visible = true;
                        this._viewUI.btnGuanZ.label = this.cstringResConfigData[11454].msg;			// 取消关注
                        this.goodArr[index].attentionnumber = 1;
                        this.baywindows(PromptExplain.ATTENTION_WIN);
                    } else {
                        guanzhu.visible = false;
                        this._viewUI.btnGuanZ.label = this.cstringResConfigData[11194].msg;			// 关注
                        this.goodArr[index].attentionnumber = 0;
                        this.baywindows(PromptExplain.CANCEL_ATTENTION);
                    }
                }
            }
        }

        /**
         * 飘窗方法
         * @param count 配置表里面的id
         */
        public baywindows(count: number) {
            let prompt = HudModel.getInstance().promptAssembleBack(count);
            let disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
            disappearMsgTips.onShow(prompt);
        }

        /**购买 */
        public buyItem() {
            var threelist = this._viewUI.three_list;
            var selectedIndex = threelist.selectedIndex;
            if (selectedIndex >= 0) {
                var good = this.goodArr[selectedIndex];
                var id = good.id;
                var saleRoleid = good.saleRoleid;
                var itemId = good.itemId;
                var num = good.num_label;
                var price = good.price_label;
                var key = good.key;
                var mRoleId = game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid;
                var rolelevel = HudModel._instance.levelNum; //人物等级
                if (rolelevel >= 30) {
                    if (mRoleId != saleRoleid) {
                        if (43000 <= itemId && itemId <= 43460) {  // 宠物
                            RequesterProtocols._instance.c2s_market_pettips(saleRoleid, key, 1);
                            this.SalePetViewMediator = new SalePetViewMediator(this._viewUI, this._app, true);
                            this.SalePetViewMediator.show();
                            this.SalePetViewMediator.getPetPrice(price);
                            models.SaleProxy._instance.once(models.butPet, this, this.buyPet, [id, saleRoleid, itemId, num, price]);
                        } else {    // 物品
                            this._SaleXiajiaViewMediator = new SaleXiajiaViewMediator(this._viewUI);
                            this._SaleXiajiaViewMediator.show();
                            this._SaleXiajiaViewMediator.showBuyItemDetails(itemId, num, price);
                        }
                    } else {
                        let prompt = this.chatMessageTips[150508].msg;              //不能购买自己上架的商品
                        this.DisappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
                        this.DisappearMessageTipsMediator.onShow(prompt);
                    }
                } else {  // 玩家等级不足不能购买
                    let prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.AUCTION_DISPACK, [30]);
                    let disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                    disappearMsgTips.onShow(prompt);
                }
            }
        }
        /**宠物购买 */
        public buyPet(id, saleRoleid, itemId, num, price) {
            var globalIcon = BagModel.getInstance().globalIcon; //金币
            if (price <= globalIcon) {
                this.CMarketBuy(id, saleRoleid, itemId, num);
            } else {
                let isShowGold = true;
                let yuanBao = bagModel.getInstance().yuanbaoIcon;
                this._ChangeMoneyViewMediator.onShowInModule(ModuleNames.SALE, isShowGold, yuanBao);
            }
        }
        /**
         * 物品购买
         * @param itemNum 
         */
        public onBuyMoreItem(itemNum, totalPrice) {
            this.itemNum = itemNum;
            this.totalPrice = totalPrice;
            var threelist = this._viewUI.three_list;
            var selectedIndex = threelist.selectedIndex;
            var globalIcon = BagModel.getInstance().globalIcon; //金币
            if (selectedIndex >= 0) {
                var good = this.goodArr[selectedIndex];
                var id = good.id;
                var saleRoleid = good.saleRoleid;
                var itemId = good.itemId;
                this.id = id;
                this.saleRoleid = saleRoleid;
                this.itemId = itemId;
                if (totalPrice <= globalIcon) {
                    this.CMarketBuy(id, saleRoleid, itemId, itemNum);
                } else {
                    this.showdDuiHuanJinBi(globalIcon, totalPrice);     // 金币不足方法
                }
            }
        }

        /**
         * 显示金币不足
         * @param globalIcon 拥有金币
         * @param totalPrice 物品价格
         */
        public showdDuiHuanJinBi(globalIcon, totalPrice) {
            this.jinbiduihuan = new commonUI.JinBiBuZuViewMediator(this._viewUI, this._app);
            var needGlobal = totalPrice - globalIcon;
            var yuanbao = needGlobal / 100;
            if (yuanbao > parseInt(yuanbao.toFixed(0))) {
                yuanbao = parseInt(yuanbao.toFixed(0)) + 1;
            }
            else {
                yuanbao = parseInt(yuanbao.toFixed(0));
            }
            this.jinbiduihuan.onShow(true, needGlobal + "", yuanbao + "");
            this.jinbiduihuan.once(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.goCharge, [yuanbao]);
        }

        /**仙晶兑换 */
        public goCharge(yuanbao) {
            var yuanbaoIcon = game.modules.bag.models.BagModel._instance.yuanbaoIcon;
            if (yuanbaoIcon < yuanbao) {
                this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                this._TipsMessageMediator.show();
                var param: Dictionary = new Dictionary();
                param.set("contentId", 150506);
                this._TipsMessageMediator.showContent(param);
                game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
            } else {
                RequesterProtocols._instance.c2s_exchange_currency(3, 2, yuanbao);
                this.CMarketBuy(this.id, this.saleRoleid, this.itemId, this.itemNum);
            }
        }

        /**初始化栏目 品质筛选*/
        private initqualityUI(): void {
            this._viewUI.qualitybg_img.height = 90;
            this._viewUI.third_img.visible = false;
            this._viewUI.third_box.selected = false;
            this.gemqualityquip();
        }

        /**珍品装备栏目品质筛选*/
        private gemqualityquip(): void {
            this._viewUI.first_label.color = "#c730db";
            this._viewUI.first_label.text = "紫色品质";
            this._viewUI.second_label.color = "#f38520";
            this._viewUI.second_label.text = "橙色品质";
            this._viewUI.quality.visible = true;
            this._viewUI.first_box.selected = true;
            this._viewUI.second_box.selected = true;
        }

        /**任务装备栏目品质筛选*/
        private gemqualitytask(): void {
            this._viewUI.first_label.color = "#e2f3f3";
            this._viewUI.first_label.text = "白色品质";
            this._viewUI.second_label.color = "#00a32d";
            this._viewUI.second_label.text = "绿色品质";
            this._viewUI.third_label.color = "#00d9d9";
            this._viewUI.third_label.text = "蓝色品质";
            this._viewUI.quality.visible = true;
            this._viewUI.third_img.visible = true;
            this._viewUI.qualitybg_img.height = 140;
            this._viewUI.first_box.selected = true;
            this._viewUI.second_box.selected = true;
            this._viewUI.third_box.selected = true;
        }

        /**宠物装备栏目品质筛选*/
        private gemqualityPet(): void {
            this._viewUI.first_label.color = "#00a32d";
            this._viewUI.first_label.text = "绿色品质";
            this._viewUI.second_label.color = "#00d9d9";
            this._viewUI.second_label.text = "蓝色品质";
            this._viewUI.third_label.color = "#c730db";
            this._viewUI.third_label.text = "紫色品质";
            this._viewUI.quality.visible = true;
            this._viewUI.third_img.visible = true;
            this._viewUI.qualitybg_img.height = 140;
            this._viewUI.first_box.selected = true;
            this._viewUI.second_box.selected = true;
            this._viewUI.third_box.selected = true;
        }

        /**
         * 搜索处理
         */
        public onSearch(searchResult: Dictionary) {
            this._viewUI.second_list.visible = false;
            this._viewUI.three_list.visible = true;
            var id = searchResult.get("id");
            var firstno = searchResult.get("firstno");
            var twono = searchResult.get("twono");
            var name = searchResult.get("name");
            var itemid = searchResult.get("itemid");
            var itemtype = searchResult.get("itemtype");
            var valuerange = searchResult.get("valuerange");
            var logictype = searchResult.get("logictype");
            var limitmin = 0;
            var limitmax = 0;
            if (logictype == m_logictype.zero) {
                this.CMarketBrowse(firstno, twono, [0], itemtype, limitmin, limitmax, 1, 1, 1);
            } else {
                this.CMarketBrowse(firstno, twono, [id], itemtype, limitmin, limitmax, 1, 1, 1);
            }
            this.setFirstListIndex(firstno);
        }

        /**
         * 珍品装备 珍品宠物 搜索处理
         * @param firstno 一级菜单
         */
        public onequippetseek(searchResult: Laya.Dictionary): void {
            var firstno = SaleModel._instance.SearchResultData.get("firstno");
            this.setFirstListIndex(firstno);
            this.showThreeList(4);
        }

        /**
         * 一级菜单显示重新设置
         * @param firstno 
         */
        public setFirstListIndex(firstno) {
            for (var i = 0; i < this.m_cMarketFirstTableData.length; i++) {
                if (firstno == this.m_cMarketFirstTableData[i].cMarketFirstTableData.id) {
                    var cell = this._viewUI.first_list.getCell(firstno - 1);
                    if (this.isOnLeftbtn != null) {
                        var btnLeft: Button = this.isOnLeftbtn.getChildByName("btnLeft") as Button;
                        btnLeft.selected = false;
                    }
                    this.isOnLeftbtn = cell;
                    var newBtnLeft = cell.getChildByName("btnLeft") as Button;
                    newBtnLeft.selected = true;
                }
            }
        }

        /**
         * 关注或者取消关注商品请求
         * @param attentype 关注状态 1购买，2公示
         * @param id 唯一id(是服务器数据库的id)
         * @param attentiontype 关注类型 1关注  2取消关注
         * @param itemtype 1普通道具 2宠物 3装备
         */
        public CAttentionGoods(attentype, id, attentiontype, itemtype) {
            RequesterProtocols._instance.c2s_attention_goods(attentype, id, attentiontype, itemtype);
        }

        /**请求关注道具信息 */
        public CMarketAttentionBrowse() {
            RequesterProtocols._instance.c2s_CMarketAttentionBrowse(attentype.buy);
        }

        /**
         * 购买
         * @param id 唯一id(浏览时候发给的id)
         * @param saleRoleid 卖家角色id
         * @param itemid 道具id
         * @param num 数量
         */
        public CMarketBuy(id, saleRoleid, itemid, num) {
            RequesterProtocols._instance.c2s_market_buy(id, saleRoleid, itemid, num);
        }

        /**
         * 显示拥有的钱
         */
        private showSilverNumber() {
            let str: string;
            let score = BagModel.getInstance().globalIcon;

            if (!isNaN(score)) {
                str = game.utils.MoneyU.number2Thousands(score);
            } else {
                str = "0";
            }
            this._viewUI.haveMoney_label.text = str;
        }

        public show(): void {
            if (!SaleModel.getInstance().isSeekback) {
                this.initFirstList();
                this.CMarketAttentionBrowse();
            }
            super.show();
            SaleModel.getInstance().isSeekback = false;
            if (sale.models.SaleModel.getInstance().saleTargetId) {
                models.SaleProxy.getInstance().event(models.SaleIsInit);
            }
        }

        public hide(): void {
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }
    }
}