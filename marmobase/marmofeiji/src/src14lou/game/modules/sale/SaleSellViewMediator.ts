
module game.modules.sale {
    /** 出售页面 */
    export class SaleSellViewMediator extends game.modules.UiMediator {
        public static AUCTION_EVENT: string = "auctionEvent";
        private _viewUI: ui.common.SaleChuShouUI;
        /**出售 */
        private _AuctionBuy: SaleViewMediator;
        /**公示 */
        private _AuctionGongshi: SaleGongshiViewMediator;
        /**上架 */
        private _SaleShelf: SaleShelfViewMediator;
        /**下架 */
        private _SaleXiajiaViewMediator: SaleXiajiaViewMediator;
        /**宠物 */
        private _SalePetViewMediator: SalePetViewMediator;
        /**购买 */
        private _SaleBuyRecordViewMediator: SaleBuyRecordViewMediator;
        /**飘窗 */
        private DisappearMessageTipsMediator: game.modules.commonUI.DisappearMessageTipsMediator;
        /**上架成功界面 */
        private SaleMarketUpSuccessViewMediator: SaleMarketUpSuccessViewMediator;
        /**复合表 */
        itemAttrData = BagModel.getInstance().itemAttrData;
        /**杂货表 */
        groceryEffectData = StrengTheningModel.getInstance().groceryEffectData;
        /**宠物信息表 */
        petCPetAttrData = game.modules.pet.models.PetModel._instance.petCPetAttrData;
        /**
       * 三级摆摊配置表 通过物品 id 取值
       */
        cMarketThreeTableDataForItemid = SaleModel._instance.cMarketThreeTableDataForItemid;
        /**npc造型表 */
        cnpcShapeData = game.modules.createrole.models.LoginModel.getInstance().cnpcShapeInfo;
        /**程序内字符串表 */
        cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
        /**客户端信息提示表 */
        chatMessageTips = game.modules.chat.models.ChatModel._instance.chatMessageTips;
        /**排序后的一级摆摊配置表 */
        m_cMarketFirstTableData = [];
        /**没有排序的一级摆摊配置表 */
        cMarketFirstTableData = SaleModel._instance.cMarketFirstTableData;
        /**二级摆摊配置表 */
        cMarketSecondTableData = SaleModel._instance.cMarketSecondTableData;
        /**三级摆摊配置表 */
        cMarketThreeTableData = SaleModel._instance.cMarketThreeTableData;
        /**可以摆摊上架的物品 */
        CanSaleArr: Array<any> = [];
        /**可以上架物品详细信息 */
        daojuArr: Array<any> = [];
        /**当前选择的物品 */
        item;
        /**上架物品详细信息 */
        detailsArr: Array<any> = [];
        /**当前列表点击的按钮 */
        bgSelectBtn: Laya.Box;

        constructor(uiLayer: Sprite, app: AppBase) {
            super(uiLayer);
            this._viewUI = new ui.common.SaleChuShouUI();
            this.isCenter = false;
            this._app = app;
            this._SaleShelf = new SaleShelfViewMediator(this._viewUI, this._app);
            this.DisappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
            this.init();
        }

        /**初始化数据 */
        public init() {
            this.CMarketGoods();
            this.getPaimaiItem();
            this.loadView(0);
            this._viewUI.daojuBtn_tab.selectedIndex = 0;
            this._viewUI.daojuBtn_tab.selectHandler = new Handler(this, this.loadView)
            this._viewUI.daoju_list.selectHandler = new Handler(this, this.daojuListSelect);
            this._viewUI.btnJiaoY.on(LEvent.MOUSE_DOWN, this, this.onbtnJiaoY);
            models.SaleProxy._instance.on(models.SMarketContainerBrowse, this, this.showBooth);
            /**物品删除刷新 */
            game.modules.bag.models.BagProxy.getInstance().on(game.modules.bag.models.REFRESH_BAG_COUNT, this, this.flushItem);
            /**物品数量改变刷新 */
            game.modules.bag.models.BagProxy.getInstance().on(game.modules.bag.models.REFRESH_SALE_COUNT, this, this.flushItem);
            /**物品添加刷新 */
            game.modules.bag.models.BagProxy.getInstance().on(game.modules.bag.models.REFRESH_BAG_DEPOT_COUNT, this, this.flushItem);
            /**拥有宠物栏增加刷新 */
            game.modules.pet.models.PetProxy.getInstance().on(game.modules.pet.models.ADD_EVENT, this, this.showPet);
            /**拥有宠物栏删除刷新 */
            game.modules.pet.models.PetProxy.getInstance().on(game.modules.pet.models.DEL_PET, this, this.showPet);
            /**上架成功 */
            models.SaleProxy._instance.on(models.SMarketUpSucc, this, this.showSuccessView);
        }

        /**数据刷新 */
        public flushItem() {
            this.getPaimaiItem();
            this.CMarketContainerBrowse();
            this.loadView(0);
        }

        /**选择显示道具还是宠物 */
        public loadView(index: number): void {
            this._viewUI.daojuView_ViewStack.selectedIndex = index;
            if (index == 1) { this.showPet() } else { this.onDaoju() }
        }

        /**获取拍卖的物品 */
        public getPaimaiItem() {
            this.CanSaleArr = [];
            let bag1: game.modules.bag.models.BagVo = BagModel.getInstance().getBagGameItemData(BagTypes.BAG).items;
            if (bag1 != null) {
                this.addCanSale(bag1, BagTypes.BAG)
            }
        }

        /**将能拍卖的物品存起来 */
        public addCanSale(bag, bagType) {
            for (var i = 0; i < bag.length; i++) {
                var itemId = bag[i].id; //物品id
                var key = bag[i].key;  //key
                var number = bag[i].number;  //数量
                var flags = bag[i].flags;  //是否被绑定
                var markettime = bag[i].markettime; //冻结时间
                var bCanSale = this.itemAttrData[itemId].bCanSale;  //可否上架摆摊
                if (bCanSale == 1) {
                    this.CanSaleArr.push({ itemId: itemId, packid: bagType, key: key, number: number, flags: flags, markettime: markettime });
                }
            }
        }

        /**
         * 宠物
         */
        public showPet(): void {
            var pets = game.modules.pet.models.PetModel._instance.pets;
            var petKeys = pets.keys;
            var petArr = [];
            if (petKeys.length <= 0) { this._viewUI.pet_list.visible = false; return; } else { this._viewUI.pet_list.visible = true }
            for (var i = 0; i < petKeys.length; i++) {
                var key = petKeys[i];
                var pet = pets.get(key);
                if (pet.flag > 0) continue; //绑定或锁定的宠物不能出售
                var petId = pet.id;   //宠物id
                var petKey = pet.key;  //key
                var petName = pet.name;    //名称
                var petLevel = pet.level;    //等级
                var petuseLevel = pet.useLevel;  //参战等级
                var quality = this.petCPetAttrData[petId].quality;   //品质
                var modelid = this.petCPetAttrData[petId].modelid; //造型id
                var petIconId = this.cnpcShapeData[modelid].littleheadID;  //iconid
                var petIcon = SaleModel._instance.getIcon(petIconId);
                var frameImg = StrengTheningModel._instance.frameSkinArr[quality - 1];
                petArr.push({
                    petName_label: petName, petLevel_label: petLevel + this.cstringResConfigData[3].msg,
                    petIcon_img: petIcon, bs_img: frameImg,
                    key: petKey, pet: pet
                })
            }
            var petIndex = game.modules.createrole.models.LoginModel.getInstance().roleDetail.petIndex;         // 当前出战宠物的key
            var canzhanPetId = -1;
            if (petIndex != -1) {
                canzhanPetId = pets.get(petIndex).id;  //参战宠物id
            }
            SaleModel._instance.showList(this._viewUI.pet_list, petArr);
            this._viewUI.pet_list.selectHandler = new Handler(this, this.petlistSelect, [petIndex, petArr]);
            this._viewUI.pet_list.renderHandler = new Handler(this, this.petlistRender, [petIndex, petArr]);
        }

        /**宠物列表显示 */
        public petlistRender(petIndex, petArr, cell: Box, index) {
            var zp_img = cell.getChildByName("zp_img") as Laya.Image;
            var isCanZhan_img = cell.getChildByName("isCanZhan_img") as Laya.Image;
            zp_img.visible = false;
            isCanZhan_img.visible = false;
            var petId = petArr[index].pet.id;
            var petkey = petArr[index].key;
            if (petIndex != -1) {
                if (petIndex == petkey) {  // 出战的宠物
                    isCanZhan_img.visible = true;
                }
            }
            var petscore = petArr[index].pet.petscore;
            var treasureScore = this.petCPetAttrData[petId].treasureScore;
            if (petscore >= treasureScore) {
                zp_img.visible = true
            }
        }

        /**宠物列表选择 */
        public petlistSelect(petIndex, petArr, index: number) {
            if (this._viewUI.pet_list.selectedIndex != -1) {
                var petId = petArr[index].pet.id;
                var petkey = petArr[index].pet.key;
                var uselevel = this.petCPetAttrData[petId].uselevel;        //当前宠物的参战等级
                var kind = this.petCPetAttrData[petId].kind;
                var unusualid = this.petCPetAttrData[petId].unusualid;
                var marketfreezeexpire = petArr[index].pet.marketfreezeexpire; //冻结时间
                if (marketfreezeexpire == 0) { //是否是拍卖上购买的宠物
                    if (petIndex != petkey) { //是否参战
                        if (kind == 4 || unusualid == 1) { //神兽
                            this._SalePetViewMediator = new SalePetViewMediator(this._viewUI, this._app);
                            this._SalePetViewMediator.show();
                            this._SalePetViewMediator.showPetDetails(SaleModel.salePetMarketUpOrDown.MarketUp, petArr[index].pet);
                        } else {
                            if (uselevel < 35) {  //参战等级是否大于35
                                let prompt = this.chatMessageTips[150511].msg.replace("$parameter1$", 35);
                                this.DisappearMessageTipsMediator.onShow(prompt);
                            } else {
                                var petscore = petArr[index].pet.petscore;
                                var treasureScore = this.petCPetAttrData[petId].treasureScore;
                                if (petscore >= treasureScore) { //是否珍品
                                    this._SalePetViewMediator = new SalePetViewMediator(this._viewUI, this._app);
                                    this._SalePetViewMediator.show();
                                    this._SalePetViewMediator.showPetDetails(SaleModel.salePetMarketUpOrDown.MarketUp, petArr[index].pet);
                                } else {
                                    let prompt = this.chatMessageTips[160056].msg;
                                    this.DisappearMessageTipsMediator.onShow(prompt);
                                }
                            }
                        }
                    } else {
                        let prompt = this.chatMessageTips[150509].msg;
                        this.DisappearMessageTipsMediator.onShow(prompt);
                    }
                } else {
                    let prompt = this.chatMessageTips[190021].msg;
                    var currentTime = (new Date()).valueOf();
                    var day = this.times2day(marketfreezeexpire - currentTime);
                    var m_prompt = prompt.replace("$parameter1$", day).replace("$parameter2$", day);
                    this.DisappearMessageTipsMediator.onShow(m_prompt);
                }
                this._viewUI.pet_list.selectedIndex = -1;
            }
        }

        /**时间转换为天数 */
        public times2day(time) {
            var mm = 60 * 1000;
            var hh = 60 * mm;
            var dd = hh * 24;
            var day = parseInt((time / dd) + "");
            return day;
        }

        /**
         * 出售道具列表
         */
        public onDaoju(): void {
            this.daojuArr = [];
            if (this.CanSaleArr.length <= 0) { this._viewUI.daoju_list.visible = false; return; } else { this._viewUI.daoju_list.visible = true }
            for (var i: number = 0; i < this.CanSaleArr.length; i++) {
                var itemId = this.CanSaleArr[i].itemId;
                var flags = this.CanSaleArr[i].flags;           //是否绑定
                var markettime = this.CanSaleArr[i].markettime;    //冻结时间
                var nquality = this.itemAttrData[itemId].nquality;  //品质
                var icon = this.itemAttrData[itemId].icon;  //图标id
                var itemIcon = SaleModel._instance.getIcon(icon);
                var frameImg = StrengTheningModel._instance.frameSkinArr[nquality - 1];
                var number = this.CanSaleArr[i].number;
                var level = this.itemAttrData[itemId].level;
                this.daojuArr.push({ itemIcon_img: itemIcon, bs_img: frameImg, itemNum_label: number, level: level, itemId: itemId, flags: flags, markettime: markettime });
            }
            SaleModel._instance.showList(this._viewUI.daoju_list, this.daojuArr);
            this._viewUI.daoju_list.renderHandler = new Handler(this, this.daojuListRender);
            this._viewUI.daoju_list.selectHandler = new Handler(this, this.daojuListSelect);
        }

        /**显示物品信息 */
        public showShelf() {
            this._SaleShelf.show();
        }

        /**物品选择 */
        public daojuListSelect(index: number) {
            if (index >= 0 && index <= this.daojuArr.length - 1) {
                var item = this.CanSaleArr[index];
                SaleModel._instance.saleItmeId = item.itemId;
                this.item = item;
                var flags = this.daojuArr[index].flags;
                var markettime = this.daojuArr[index].markettime;
                var isflags = BagModel.getInstance().itemIsBind(flags);    //是否绑定
                if (!isflags) {
                    if (markettime <= 0) {       //是否有冻结时间
                        RequesterProtocols._instance.c2s_get_marketupprice(item.packid, item.key);
                        models.SaleProxy._instance.on(models.SGetMarketUpPrice, this, this.showSaleItem);
                    } else {
                        var currentTime = (new Date()).valueOf();           // 当前系统时间
                        var marketresidue = markettime - currentTime;           // 冻结时间剩余天数
                        var time = this.times2day(marketresidue);
                        let promptarr: Array<number> = [time];
                        let prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.MARKET_TIME_ITEM, promptarr);
                        this.DisappearMessageTipsMediator.onShow(prompt);
                    }
                } else {
                    let prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.FLAGS_ITEM);
                    this.DisappearMessageTipsMediator.onShow(prompt);
                }
                this._viewUI.daoju_list.selectedIndex = -1;
            }
        }

        /** 查找在可出售道具中的索引位置 */
        public findItemIndex(): void {
            let _currItemId = tips.models.TipsModel.getInstance().currItemId;
            let _currItemKey = tips.models.TipsModel.getInstance().currItemKey;
            if (_currItemId != -1 && _currItemKey != -1) {
                for (let i = 0; i < this.CanSaleArr.length; i++) {
                    if (_currItemId == this.CanSaleArr[i].itemId && _currItemKey == this.CanSaleArr[i].key) {
                        this.daojuListSelect(i);
                        tips.models.TipsModel.getInstance().currItemId = -1;
                        tips.models.TipsModel.getInstance().currItemKey = -1;
                        sale.models.SaleModel.getInstance().tiaozhuanid = ViewIndex.BUY;
                        break;
                    }
                }
            }
        }

        /**显示出售物品 */
        public showSaleItem(SGetMarketUpPriceDic) {
            this._SaleShelf = new SaleShelfViewMediator(this._viewUI, this._app);
            this._SaleShelf.show();
            this._SaleShelf.showSaleItem(this.item, SGetMarketUpPriceDic);
        }

        /**道具列表显示 */
        public daojuListRender(cell: Box, index: number) {
            if (index < this.daojuArr.length) {
                var itemNum_label: Label = cell.getChildByName("itemNum_label") as Label;
                var level_lab: Label = cell.getChildByName("level_lab") as Label;
                var lockimg_img: Laya.Image = cell.getChildByName("lockimg_img") as Laya.Image;
                var number = this.daojuArr[index].itemNum_label;
                var itemId = this.daojuArr[index].itemId;
                var level = this.daojuArr[index].level;
                var flags = this.daojuArr[index].flags;
                var markettime = this.daojuArr[index].markettime;
                var isflags = BagModel.getInstance().itemIsBind(flags);    //是否绑定
                if (120000 <= itemId && itemId <= 126675 || 140000 <= itemId && itemId <= 140005 || 10000 <= itemId && itemId <= 10009 || 111000 <= itemId && itemId <= 111053) {  //装备 食物
                    itemNum_label.visible = false;
                    level_lab.visible = true;
                    if (111000 <= itemId && itemId <= 111053) {
                        var item = this.CanSaleArr[index];
                        var packid = item.packid;
                        var key = item.key;
                        var tips = SaleModel._instance.getItemTips(packid, key);
                        if (tips != -1) {
                            level_lab.text = this.cstringResConfigData[1].msg + tips.quality;
                        }
                    } else {
                        level_lab.text = this.cstringResConfigData[1].msg + level;
                    }
                } else {
                    itemNum_label.visible = true;
                    level_lab.visible = false;
                    if (number > 1) {
                        itemNum_label.text = number;
                    } else {
                        itemNum_label.text = "";
                    }
                }
                if (isflags || markettime > 0) lockimg_img.visible = true;
                else lockimg_img.visible = false;
            }
        }

        /**
         * 显示上架的物品列表
         */
        public showBooth() {
            var pets = game.modules.pet.models.PetModel._instance.pets;
            var boothList = this._viewUI.booth_list;
            var GoodList = models.SaleModel._instance.GoodList;
            /**上架物品 */
            var itemArr = GoodList.get(actiontype.gongshi);
            if (itemArr == null) return;
            this.detailsArr = [];
            var goodNum = itemArr.length;   //上架物品的数量
            this._viewUI.num_lab.text = goodNum + "/8";
            for (var i = 0; i < itemArr.length; i++) {
                var itemId = itemArr[i].itemid;    //上架物品配置表 id
                var id = itemArr[i].id;           //服务器数据库唯一id
                var num = itemArr[i].num;        // 物品数量
                var level = itemArr[i].level;   // 物品的等级
                var roleid = itemArr[i].saleRoleid;  //角色id
                var key = itemArr[i].key;     // 物品的key值
                var price = itemArr[i].price;   // 上架物品的价格
                var showtime = itemArr[i].showtime; //公示时间
                var expiretime = itemArr[i].expiretime; //物品过期时间
                if (43050 <= itemId && itemId <= 43519) {
                    var petName = this.petCPetAttrData[itemId].name;
                    var num = itemArr[i].num;
                    var quality = this.petCPetAttrData[itemId].quality;   //品质
                    var modelid = this.petCPetAttrData[itemId].modelid; //造型id
                    var petIconId = this.cnpcShapeData[modelid].littleheadID;  //iconid
                    var petIcon = SaleModel._instance.getIcon(petIconId);
                    var frameImg = StrengTheningModel._instance.frameSkinArr[quality - 1];
                    this.detailsArr.push({
                        bs_img: frameImg, itemIcon_img: petIcon,
                        itemName_label: petName, pirce_label: price,
                        level_label: level, itemNum_label: num,
                        itemId: itemId, id: id, key: key, roleid: roleid,
                        showtime: showtime, expiretime: expiretime,

                    })
                } else {
                    var iconid = this.itemAttrData[itemId].icon;    //icon图
                    var nquality = this.itemAttrData[itemId].nquality;  //品质
                    var frameImg = StrengTheningModel._instance.frameSkinArr[nquality - 1]; //图片地址
                    var itemIcon = SaleModel._instance.getIcon(iconid);
                    var name = this.itemAttrData[itemId].name;
                    this.detailsArr.push({
                        bs_img: frameImg, itemIcon_img: itemIcon,
                        itemName_label: name, pirce_label: price,
                        level_label: level, itemNum_label: num,
                        itemId: itemId, id: id, key: key, roleid: roleid,
                        showtime: showtime, expiretime: expiretime,
                    });
                }
            }
            SaleModel._instance.showList(boothList, this.detailsArr);
            boothList.renderHandler = new Handler(this, this.boothListRender);          // 鼠标点击监听事件
            boothList.selectHandler = new Handler(this, this.boothListSelect);
        }

        /**摆摊物品 */
        public boothListRender(cell: Box, index: number) {
            if (index < this.detailsArr.length) {
                var itemNumlabel = cell.getChildByName("itemNum_label") as Label;
                var level_label = cell.getChildByName("level_label") as Label;
                var gongshi_img = cell.getChildByName("gongshi_img") as Laya.Image;
                var gongshiTime_label = cell.getChildByName("gongshiTime_label") as Label;
                var bg_btn = cell.getChildByName("bg_btn") as Button;
                var guoqi_img = cell.getChildByName("guoqi_img") as Laya.Image;
                bg_btn.on(LEvent.MOUSE_UP, this, this.onBgBtn, [index, cell]);
                gongshi_img.visible = false;        // 公示图片
                guoqi_img.visible = false;          // 过期图片
                gongshiTime_label.visible = false;  // 公式计时时间 文字

                var num = this.detailsArr[index].itemNum_label;         // 数量
                var itemId = this.detailsArr[index].itemId;             // 物品id
                var showtime = this.detailsArr[index].showtime;         // 公示时间
                var israrity = this.cMarketThreeTableDataForItemid[itemId].israrity;  // 是否珍品

                if (israrity > 0) {  //是否是珍品
                    gongshi_img.visible = true;
                    gongshiTime_label.visible = true;
                    var currentTime = (new Date()).valueOf();           // 当前系统时间
                    var gongshiTime = showtime - currentTime;           // 公示时间剩余多少
                    var expiretime = this.detailsArr[index].expiretime; // 物品过期时间
                    if (gongshiTime > 0) {
                        var time = this.time2date(gongshiTime);
                        gongshiTime_label.text = time;
                    } else {
                        gongshiTime_label.visible = false;
                        gongshi_img.visible = false;
                        if ((expiretime - currentTime) > 0) {
                            guoqi_img.visible = false;
                        } else {
                            guoqi_img.visible = true;
                        }
                    }
                } else {
                    var currentTime = (new Date()).valueOf();
                    var expiretime = this.detailsArr[index].expiretime;

                    var yitianTime = expiretime - currentTime;
                    if (yitianTime > 0) {
                        guoqi_img.visible = false;
                        gongshiTime_label.visible = true;
                        var time = this.time2date(yitianTime);
                        gongshiTime_label.text = time;
                    } else {
                        guoqi_img.visible = true;
                        gongshiTime_label.visible = false;
                    }
                }
                //装备 宠物
                if (120000 <= itemId && itemId <= 126675 || 140000 <= itemId && itemId <= 140005 || 10000 <= itemId && itemId <= 10009 || 43050 <= itemId && itemId <= 43519 || 111000 <= itemId && 111053) {
                    itemNumlabel.visible = false;
                    level_label.visible = true;
                    var level = this.detailsArr[index].level_label;
                    level_label.text = this.cstringResConfigData[1].msg + level;
                } else {
                    level_label.visible = false;
                    itemNumlabel.visible = true;
                    if (num > 1) {
                        itemNumlabel.text = num;
                    } else {
                        itemNumlabel.text = "";
                    }
                }
            }
        }
        /**点击效果 */
        public onBgBtn(index, cell) {
            var equip_btn: Button = cell.getChildByName("bg_btn") as Button;
            equip_btn.selected = true;
            if (this.bgSelectBtn == null) {
                this.bgSelectBtn = cell;
                return;
            }
            if (this.bgSelectBtn != cell) {
                var btnLeft: Button = this.bgSelectBtn.getChildByName("bg_btn") as Button;
                btnLeft.selected = false;
                this.bgSelectBtn = cell;
            }
        }

        /**转换时间戳 */
        public time2date(time) {
            var mytime = new Date(time);
            var mm = 60 * 1000;
            var h = 60 * 60 * 1000;
            var hours = parseInt((time / h) + "");//小时
            var minutes = parseInt((time % h) / mm + ""); //分钟
            if (minutes < 10) return hours + ":" + ("0" + minutes); //如果分钟小于10 表示时间不会显示两位数
            return hours + ":" + minutes;
        }

        /**
         * 摊位物品点击
         * @param index 
         */
        public boothListSelect(index: number) {
            if (this._viewUI.booth_list.selectedIndex != -1) {
                var itemDetail = this.detailsArr[index];
                var itemId = itemDetail.itemId;
                var roleid = itemDetail.roleid;
                var key = itemDetail.key;
                SaleModel._instance.itemId = itemId;
                if (43050 <= itemId && itemId <= 43519) {  //宠物
                    this._SalePetViewMediator = new SalePetViewMediator(this._viewUI, this._app);
                    RequesterProtocols._instance.c2s_market_pettips(roleid, key, 1);
                    this._SalePetViewMediator.show();
                    var price = itemDetail.pirce_label;
                    this._SalePetViewMediator.getPetPrice(price);
                    // 装备   食品
                } else if (120000 <= itemId && itemId <= 126675 || 140000 <= itemId && itemId <= 140005 || 10000 <= itemId && itemId <= 10009 || 43050 <= itemId && itemId <= 43519 || 111000 <= itemId && 111053) {
                    RequesterProtocols._instance.c2s_COtherItem_Tips(roleid, BagTypes.MARKET, key);
                    models.SaleProxy._instance.on(models.SOtherItemTips, this, this.showSaleItemDetails, [itemDetail]);
                } else {
                    this._SaleXiajiaViewMediator = new game.modules.sale.SaleXiajiaViewMediator(this._viewUI);
                    this._SaleXiajiaViewMediator.show();
                    var SOtherItemTipsDsc = "";
                    this._SaleXiajiaViewMediator.showItem(itemDetail, SOtherItemTipsDsc);
                }
                this._viewUI.booth_list.selectedIndex = -1;
            }
        }

        /**请求摆摊信息 */
        public CMarketContainerBrowse() {
            RequesterProtocols._instance.c2s_market_containerbrowse();
        }

        /**显示上架成功*/
        public showSuccessView(israrity) {
            this.SaleMarketUpSuccessViewMediator = new SaleMarketUpSuccessViewMediator(this._viewUI, israrity);
            this.SaleMarketUpSuccessViewMediator.show();
        }

        /**
         * 获取摆摊物品信息
         */
        public CMarketGoods() {
            RequesterProtocols._instance.c2s_market_containerbrowse();
        }

        /**
         * 显示上架物品的详细信息
         * @param SOtherItemTipsDsc 
         */
        public showSaleItemDetails(itemDetail, SOtherItemTipsDsc) {
            this._SaleXiajiaViewMediator = new game.modules.sale.SaleXiajiaViewMediator(this._viewUI);
            this._SaleXiajiaViewMediator.show();
            this._SaleXiajiaViewMediator.showItem(itemDetail, SOtherItemTipsDsc);
        }

        /**显示交易记录 */
        public onbtnJiaoY() {
            this._SaleBuyRecordViewMediator = new SaleBuyRecordViewMediator(this._viewUI);
            this._SaleBuyRecordViewMediator.show();
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
            /**上架界面搜索物品 */
            RequesterProtocols._instance.c2s_market_browse(attentype.buy, firstno, twono, threeno, itemtype, limitmin, limitmax, currpage, priceSort, issearch);
        }

        public show(): void {
            this.CMarketContainerBrowse();   //请求摆摊信息
            this.init();                    //初始化
            super.show();
            this.findItemIndex();
        }

        public hide(): void {
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }

    }
}