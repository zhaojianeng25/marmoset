/**
* 下架详情界面 
*/
module game.modules.sale {
    export class SaleXiajiaViewMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.SaleXiajiaUI;
        private _AuctionSell: SaleSellViewMediator;
        private _AuctionGongshi: SaleGongshiViewMediator;
        /**复合表 */
        itemAttrData = BagModel.getInstance().itemAttrData;
        /**装备附加属性库by skill */
        equipAddattributelibDataBySkill = StrengTheningModel.getInstance().equipAddattributelibDataBySkill;
        /**装备附加属性库 */
        equipAddattributelibData = StrengTheningModel.getInstance().equipAddattributelibData;
        /**属性效果id表 */
        attributeDesConfigData = StrengTheningModel.getInstance().attributeDesConfigData;
        /**食品表 */
        foodAndDrugEffectData = SaleModel._instance.foodAndDrugEffectData;
        /**食品公示表 */
        foodAndDrugFormulaData = SaleModel._instance.foodAndDrugFormulaData;
        /**宠物信息表 */
        petCPetAttrData = game.modules.pet.models.PetModel._instance.petCPetAttrData;
        /**npc造型表 */
        cnpcShapeData = game.modules.createrole.models.LoginModel.getInstance().cnpcShapeInfo;
        /**程序内字符串表 */
        cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
        /** 三级摆摊配置表 通过物品 id 取值 */
        cMarketThreeTableDataForItemid = SaleModel._instance.cMarketThreeTableDataForItemid;
        /**上架物品的摊位费、价格等信息 */
        PriceDic: Dictionary = new Dictionary();
        /**物品的价格 */
        oneMarketUpPice: number;
        /**物品的描述 */
        str: string = "";
        constructor(uiLayer: Sprite) {
            super(uiLayer);
            this._viewUI = new ui.common.SaleXiajiaUI();
            this.isCenter = false;
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
            this._viewUI.cancel_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
            this._viewUI.buyItemNum_box.visible = false;
        }

        /**显示物品信息 */
        public showItem(itemDetail, SOtherItemTipsDsc) {
            var html = "";
            var id = itemDetail.id;     //数据库id
            var itemId = itemDetail.itemId;   //物品id
            var itemNum = itemDetail.itemNum_label;  //数量
            var pirce = itemDetail.pirce_label;  //多少钱
            var itemtype = this.cMarketThreeTableDataForItemid[itemId].itemtype;  // 物品类型
            var name = this.itemAttrData[itemId].name;  //名称
            var iconId = this.itemAttrData[itemId].icon;
            var nquality = this.itemAttrData[itemId].nquality;  //品质
            var frameImg = StrengTheningModel._instance.frameSkinArr[nquality - 1];
            var currentTime = (new Date()).valueOf();           // 当前系统时间
            var expiretime = itemDetail.expiretime;     // 物品过期时间
            var itemIcon = SaleModel._instance.getIcon(iconId);
            this._viewUI.frame_img.skin = frameImg;
            this._viewUI.itemIcon_img.skin = itemIcon + "";
            this._viewUI.itemName_label.text = name;
            var roleid = itemDetail.roleid;
            var key = itemDetail.key;
            this._viewUI.onePrice_label.text = itemDetail.pirce_label;
            if (itemNum > 1) {
                this._viewUI.numAndPrice_box.visible = true;
            } else {
                this._viewUI.numAndPrice_box.visible = false;
            }
           
            var destribe = this.itemAttrData[itemId].destribe;  //描述
            if (120000 <= itemId && itemId <= 126675 || 140000 <= itemId && itemId <= 140005 || 10000 <= itemId && itemId <= 10009 || 111000 <= itemId && itemId <= 111053) {  //装备 食物
                if (SOtherItemTipsDsc != "") {
                    var tips = SOtherItemTipsDsc.get("tips")
                    if (111000 <= itemId && itemId <= 111053) {   //食物
                        var quality = tips.quality;
                        this._viewUI.itemLevel_label.text = this.cstringResConfigData[11131].msg + quality;
                        var effectdescribe = this.foodAndDrugEffectData[itemId].effectdescribe;
                        var strformula = this.foodAndDrugFormulaData[itemId].strformula;
                        var str = strformula.replace(this.cstringResConfigData[11131].msg, quality);
                        this.str = effectdescribe;
                        for (var i = 1; i < 5; i++) {
                            var parameter = parseInt(eval(str));
                            this.str = this.str.replace("$parameter" + i + "$", parameter + "");
                        }
                        html += "<span style='fontSize:24;color:#50321A'>" + this.str + "</span>";
                        html += "<span style='fontSize:24;color:#50321A'>" + destribe + "</span>";
                    } else {        //装备
                        var level = itemDetail.level_label;
                        this._viewUI.itemLevel_label.text = this.cstringResConfigData[1].msg + level;
                        html += "<span style='color:#FBDC47;fontSize:24'>"+ this.cstringResConfigData[122].msg +"</span><br/>";
                        var baseAttr = tips.baseAttr;
                        if (baseAttr != null) {
                            var baseAttrKeys = baseAttr.keys;
                            for (var j = 0; j < baseAttrKeys.length; j++) {
                                var baseAttrId = baseAttrKeys[j];   //基础属性的id
                                var baseAttrValue = baseAttr.get(baseAttrId);  //值
                                var baseAttrName = this.attributeDesConfigData[baseAttrKeys[j]].name + "+" + baseAttrValue;
                                html += "<span style='fontSize:24;color:#fff2df'>&nbsp;&nbsp;" + baseAttrName + "</span><br/>";
                            }
                        }
                        var addAttr = tips.addAttr;
                        if (addAttr != null) {
                            var addAttrKeys = addAttr.keys;
                            for (var k = 0; k < addAttrKeys.length; k++) {
                                var addAttrId = addAttrKeys[k];
                                var addAttrValue = addAttr.get(addAttrId);
                                var name = this.equipAddattributelibData[addAttrId].name;
                                var tipname = name + addAttrValue;
                                var color = this.equipAddattributelibData[addAttrId].namecolour;
                                html += "<span style='fontSize:24;color:" + color + "'>&nbsp;&nbsp;" + tipname + "</span><br/>";
                            }
                        }
                        var skill = tips.skill;
                        if (skill != 0) {
                            var name = this.equipAddattributelibDataBySkill[skill].name;
                            var color = this.equipAddattributelibDataBySkill[skill].namecolour;
                            html += "<span style='fontSize:24;color:" + color + "'>&nbsp;&nbsp;"+ this.cstringResConfigData[11002].msg +"&nbsp;" + name + "</span><br/>";
                        }
                        var effect = tips.effect;
                        if (effect != 0) {
                            var name = this.equipAddattributelibDataBySkill[effect].name;
                            var color = this.equipAddattributelibDataBySkill[skill].namecolour;
                            html += "<span style='fontSize:24;color:" + color + "'>&nbsp;&nbsp;"+ this.cstringResConfigData[11003].msg +"&nbsp;" + name + "</span><br/>";
                        }
                        var endure = tips.endure; //耐久
                        html += "<span style='color:#FBDC47;fontSize:24'>" + this.cstringResConfigData[11000].msg + ":" + endure + "</span><br/>";
                        var equipscore = tips.equipscore;//评分
                        html += "<span style='color:#FBDC47;fontSize:24'>" + this.cstringResConfigData[111].msg + ":" + equipscore + "</span><br/>";
                        var destribe = this.itemAttrData[itemId].destribe; //描述
                        html += "<span style='color:#FBDC47;fontSize:24'>" + destribe + "</span><br/>";
                    }
                }
            } else {
                if (this._viewUI.numAndPrice_box.visible) {
                    this._viewUI.number_label.text = itemNum;
                    var price = itemDetail.pirce_label;
                    this._viewUI.totalPrice_label.text = price * itemNum + "";
                }
                html += "<span style='fontSize:24;color:#50321A'>" + destribe + "</span>";
            }
            this._viewUI.itemDetails_html.innerHTML = html;
            if ((expiretime - currentTime) > 0) {       //物品是否过期
                this._viewUI.xiajia_btn.on(LEvent.MOUSE_DOWN, this, this.onXiajiaBtn, [key]);
            } else {
                this._viewUI.xiajia_btn.label = this.cstringResConfigData[11196].msg;
                this._viewUI.cancel_btn.label = this.cstringResConfigData[11197].msg;
                this._viewUI.xiajia_btn.off(LEvent.MOUSE_DOWN, this, this.onXiajiaBtn);
                this._viewUI.cancel_btn.off(LEvent.MOUSE_DOWN, this, this.hide);
                this._viewUI.cancel_btn.on(LEvent.MOUSE_DOWN, this, this.onXiajiaBtn, [key]);
                this._viewUI.xiajia_btn.on(LEvent.MOUSE_DOWN, this, this.CReMarketUp, [itemtype, id, pirce]);
            }
        }


        /**
         * 购买物品详细信息显示
         * @param itemId id
         * @param num 总数量
         * @param price 单价
         */
        public showBuyItemDetails(itemId, num, price) {
            this._viewUI.buyItemNum_box.visible = true;
            this._viewUI.xiajiaItemNum_box.visible = false;
            this._viewUI.itemLevel_label.visible = false;
            this._viewUI.xiajia_btn.label = this.cstringResConfigData[480].msg;
            var name = this.itemAttrData[itemId].name;  //名称
            var iconId = this.itemAttrData[itemId].icon;
            var nquality = this.itemAttrData[itemId].nquality;  //品质
            var frameImg = StrengTheningModel._instance.frameSkinArr[nquality - 1];
            var itemIcon = SaleModel._instance.getIcon(iconId);
            this._viewUI.frame_img.skin = frameImg;
            this._viewUI.itemIcon_img.skin = itemIcon + "";
            this._viewUI.itemName_label.text = name;
            var destribe = this.itemAttrData[itemId].destribe;  //描述
            this._viewUI.itemDetails_html.innerHTML = "<span style='fontSize:24;color:#50321A'>" + destribe + "</span>";
            this._viewUI.itemNum.text = "1";
            this._viewUI.totalPrice_label.text = price;
            this._viewUI.onePrice_label.text = price;
            this._viewUI.additemNum_btn.on(LEvent.MOUSE_DOWN, this, this.onAddNum, [num, price]);
            this._viewUI.lessItemNum_btn.on(LEvent.MOUSE_DOWN, this, this.onLessNum, [num, price]);
            this._viewUI.xiajia_btn.on(LEvent.MOUSE_DOWN, this, this.onBuy);
        }
        /**增加数量 */
        public onAddNum(num, price) {
            var itemNumtext = this._viewUI.itemNum.text;
            var itemNum = parseInt(itemNumtext);
            if (itemNum < num) {
                itemNum += 1;
                this._viewUI.itemNum.text = itemNum + "";
                var totalPrice = itemNum * price;
                this._viewUI.totalPrice_label.text = totalPrice + "";
            }
        }

        /**减少数量 */
        public onLessNum(num, price) {
            var itemNumtext = this._viewUI.itemNum.text;
            var itemNum = parseInt(itemNumtext);
            if (itemNum > 1) {
                itemNum -= 1;
                this._viewUI.itemNum.text = itemNum + "";
                var totalPrice = itemNum * price;
                this._viewUI.totalPrice_label.text = totalPrice + "";
            }
        }

        /**购买 */
        public onBuy() {
            var itemNumtext = this._viewUI.itemNum.text;
            var itemNum = parseInt(itemNumtext);
            var totalPrice = this._viewUI.totalPrice_label.text;
            this.hide();
            models.SaleProxy._instance.event(models.buyItemTipsBtn, [itemNum, parseInt(totalPrice)]);
        }

        /**
         * 物品下架
         * @param key 
         */
        public onXiajiaBtn(key) {
            this.hide();
            RequesterProtocols._instance.c2s_market_down(1, key);
        }

        /**
         * 拍卖行重新上架
         * @param itemtype 物品类型
         * @param id 数据库唯一id
         * @param money 价钱
         */
        public CReMarketUp(itemtype, id, money) {
            this.hide();
            RequesterProtocols._instance.c2s_re_marketup(itemtype, id, money);
        }

        public show(): void {
            super.show();
        }

        public hide(): void {
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }
    }
}