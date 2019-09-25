
module game.modules.tips {
    /** 装备重铸 */
    export class EquipRecastMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.component.EquipWashPractiseUI;
        /**重铸的装备id */
        chongzhuArr: Array<any> = [];
        /**拥有的装备 */
        haveEquipArr: Array<any> = [];
        /**复合表 */
        itemAttrData = BagModel.getInstance().itemAttrData;
        /**装备洗练表 */
        equipRefineInfoData = game.modules.tips.models.TipsModel._instance.equipRefineInfoData;
        /**属性效果id表 */
        attributeDesConfigData = StrengTheningModel.getInstance().attributeDesConfigData;
        /**装备附加属性库 */
        equipAddattributelibData = StrengTheningModel.getInstance().equipAddattributelibData;
        /**装备附加属性库by skill */
        equipAddattributelibDataBySkill = StrengTheningModel.getInstance().equipAddattributelibDataBySkill;
        /**程序内字符串表 */
        cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
        /**显示装备的属性 */
        attrArr: Array<any> = [];
        /** 洗练所需要的物品id */
        public itemId: number = 0;
        /** 金币补足界面 */
        private _yinBiTips: commonUI.JinBiBuZuViewMediator;
        /** 元宝补足界面 */
        private _remindViewMediator: commonUI.RemindViewMediator;
        /** 钱币补足所需的数量 */
        public needYinBi: number = 0;
        public needJinBi: number = 0;
        public needYuanBao: number = 0;
        /** 被选中装备列表选项 */
        private selectedDiTu: any;

        constructor(app: AppBase) {
            super(app.uiRoot.general);
            this._viewUI = new ui.common.component.EquipWashPractiseUI();
            this.isCenter = true;
            this._app = app;
            this._yinBiTips = new commonUI.JinBiBuZuViewMediator(this._viewUI, this._app);
            this._remindViewMediator = commonUI.RemindViewMediator.getInstance(this._viewUI, this._app);
            
            this._yinBiTips.on(commonUI.USE_GOLD_EXCHANGE_EVENT, this, this.jinbijiesuo);
            this._yinBiTips.on(commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.yuanbaojiesuo);
            this._yinBiTips.on(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.jinbibuzu);
            this.init();
        }

        /**初始化数据 */
        public init() {
            this.initChongzhu();
            this.showSilverNumber();
            this._viewUI.saveBox.visible = false;
            this._viewUI.title_lab.text = this.cstringResConfigData[11778].msg;
            this.initEvent();
            this.initBtn();
        }

        /**按钮点击事件 */
        public initBtn() {
            this._viewUI.ok_btn.on(LEvent.MOUSE_DOWN, this, this.onOkBtn);
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.onCloseBtn);
        }

        /**事件接收 */
        public initEvent() {
            game.modules.createrole.models.LoginProxy.getInstance().on(game.modules.createrole.models.GetItemTips_EVENT, this, this.flushAttr);
            game.modules.bag.models.BagProxy.getInstance().on(game.modules.bag.models.REFRESH_CURRENCY_EVENT, this, this.flush);
        }

        /**数据刷新 */
        public flush() {
            this.showSilverNumber();
            this.flushCailiao();
        }

        /**刷新材料 */
        public flushCailiao() {
            var index = this._viewUI.equip_list.selectedIndex;
            if (index < 0) { index = 0 };
            this.equiplistSelect(index);
        }

        /**刷新属性 */
        public flushAttr() {
            var index = this._viewUI.equip_list.selectedIndex;
            if (index < 0) { index = 0 }
            this.showAttr(index);
        }

        /**初始化装备列表 */
        public initEquipList() {
            /**装备属性tips */
            var equipTips = StrengTheningModel.getInstance().equipTips;
            for (var i = 0; i < this.chongzhuArr.length; i++) {
                var equipId = this.chongzhuArr[i].id;
                var name = this.itemAttrData[equipId].name;
                var nquality = this.itemAttrData[equipId].nquality;
                var iconid = this.itemAttrData[equipId].icon;
                var itemIcon = SaleModel.getInstance().getIcon(iconid);  //icon
                var itemnquality = StrengTheningModel._instance.frameSkinArr[nquality - 1];
                var level = this.itemAttrData[equipId].level + this.cstringResConfigData[3].msg;
                this.haveEquipArr.push({ name_lab: name, level_lab: level, frame_img: itemnquality, icon_img: itemIcon });

            }
            SaleModel.getInstance().showList(this._viewUI.equip_list, this.haveEquipArr);            
            this._viewUI.equip_list.renderHandler = new Handler(this, this.equiplistRender);
            this._viewUI.equip_list.selectHandler = new Handler(this, this.equiplistSelect);
        }
        /** 装备列表的渲染 */
        private equiplistRender(cell: Box, index: number): void {
            let bgDiTu_img: Laya.Image = cell.getChildByName("bgDiTu_img") as Laya.Image;
            bgDiTu_img.skin = "common/ui/tongyong/common_list_3textbg.png";
            if (this.selectedDiTu) {
                this.selectedDiTu.skin = "common/ui/tongyong/common_list_3textbg2.png";
            }
        }

        /**选择装备 */
        public equiplistSelect(index: number) {
            let _bgDiTu_img: Laya.Image = this._viewUI.equip_list.getCell(index).getChildByName("bgDiTu_img") as Laya.Image;
            _bgDiTu_img.skin = "common/ui/tongyong/common_list_3textbg2.png";
            this.selectedDiTu = _bgDiTu_img;
            if (this.chongzhuArr.length == 0) return;
            this.itemId = this.chongzhuArr[index].id;
            var id = this.chongzhuArr[index].id;
            var nquality = this.itemAttrData[id].nquality;
            var iconid = this.itemAttrData[id].icon;
            var itemIcon = SaleModel.getInstance().getIcon(iconid);  //icon
            var itemnquality = StrengTheningModel._instance.frameSkinArr[nquality - 1];
            this._viewUI.equipFrame_img.skin = itemnquality;
            this._viewUI.equipIcon_img.skin = itemIcon;
            if (this.equipRefineInfoData[id] == null) {
                this._viewUI.ok_btn.visible = false;
                return;
            } else {
                this._viewUI.ok_btn.visible = true;
            }
            var allcailiaoid = this.equipRefineInfoData[id].allcailiaoid;  //洗练材料id
            var allcailiaonum = this.equipRefineInfoData[id].allcailiaonum;  //消耗材料数量
            var allmoneytype = this.equipRefineInfoData[id].allmoneytype;  //货币类型
            var allmoneynum = this.equipRefineInfoData[id].allmoneynum;    //消耗货币数量
            var cailiaoIconid = this.itemAttrData[allcailiaoid].icon;
            var cailiaoqualityid = this.itemAttrData[allcailiaoid].nquality;
            var cailiaoIcon = SaleModel.getInstance().getIcon(cailiaoIconid);  //icon
            var cailiaoquality = StrengTheningModel._instance.frameSkinArr[cailiaoqualityid - 1];
            this._viewUI.itemFrame_img.skin = cailiaoquality;
            this._viewUI.itemIcon_img.skin = cailiaoIcon;
            this._viewUI.itemIcon_img.on(LEvent.CLICK, this, this.showItemTips, [allcailiaoid]);
            this._viewUI.needMoney_label.text = allmoneynum;
            if (allmoneytype == 1) {
                this._viewUI.needMeoneyIcon_img.skin = "common/ui/tongyong/common_yinb.png";
                this._viewUI.haveMeoneyIcon_img.skin = "common/ui/tongyong/common_yinb.png";
            } else if (allmoneytype == 2) {
                this._viewUI.needMeoneyIcon_img.skin = "common/ui/tongyong/common_jinb.png";
                this._viewUI.haveMeoneyIcon_img.skin = "common/ui/tongyong/common_jinb.png";
            }
            this.showAttr(index);
            this.showCailiaoNum(allcailiaonum, allcailiaoid);
        }
        /** 显示重铸所需消耗的材料信息tips */
        private showItemTips(itemid:number):void{
            let parame = new Laya.Dictionary();
            parame.set("itemId",itemid);
            let _tipsModule = new tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
        }

        /**
         * 显示属性
         */
        public showAttr(index) {
            var equipTips = StrengTheningModel.getInstance().equipTips;
            var packid = this.chongzhuArr[index].packid;
            var key = this.chongzhuArr[index].key;
            this.attrArr = [];
            for (var i = 0; i < equipTips.length; i++) {
                var tipsKey = equipTips[i].keyinpack;
                var tipsPackid = equipTips[i].packid;
                if (tipsKey == key && tipsPackid == packid) {  //获取装备属性
                    var tips = equipTips[i].tips;
                    var baseAttr = tips.baseAttr; //基础属性
                    var addAttr = tips.addAttr; //附加属性
                    var effect = tips.effect;  //特效
                    var skill = tips.skill;  //特技
                    if (baseAttr != null) {
                        var baseAttrKeys = baseAttr.keys;
                        for (var j = 0; j < baseAttrKeys.length; j++) {
                            var baseAttrId = baseAttrKeys[j];
                            var baseAttrValue = baseAttr.get(baseAttrId);
                            var numpositivedes = this.attributeDesConfigData[baseAttrId].numpositivedes;  //属性描述
                            var attrDesc = numpositivedes.replace("$parameters$", baseAttrValue);
                            this.attrArr.push({ attr_lab: attrDesc, color: "#391104" });
                        }
                    }
                    if (addAttr != null) {
                        var addAttrKeys = addAttr.keys;
                        for (var k = 0; k < addAttrKeys.length; k++) {
                            var addAttrId = addAttrKeys[k];
                            var addAttrValue = addAttr.get(addAttrId);
                            var name = this.equipAddattributelibData[addAttrId].name;
                            var addAttrDesc = name + addAttrValue;
                            var color = this.equipAddattributelibData[addAttrId].namecolour;
                            this.attrArr.push({ attr_lab: addAttrDesc, color: color });
                        }
                    }
                    if (skill != 0) {
                        var name = this.equipAddattributelibDataBySkill[skill].name;
                        var color = this.equipAddattributelibDataBySkill[skill].namecolour;
                        this.attrArr.push({ attr_lab: "" + this.cstringResConfigData[11002].msg + "  " + name, color: color });
                    }
                    if (effect != 0) {
                        var name = this.equipAddattributelibDataBySkill[effect].name;
                        var color = this.equipAddattributelibDataBySkill[skill].namecolour;
                        this.attrArr.push({ attr_lab: "" + this.cstringResConfigData[11003].msg + "  " + name, color: color });
                    }
                }
            }
            SaleModel._instance.showList(this._viewUI.attr_list, this.attrArr);
        }

        /**属性列表渲染 */
        public attrlistRender(cell: Box, index: number) {
            var label = cell.getChildByName("attr_lab") as Label;
            if (this.attrArr[index].color != null) {
                label.color = this.attrArr[index].color;
            }
        }

        /**
         * 使用按钮
         */
        public onOkBtn() {
            var allcailiaoid = this.equipRefineInfoData[this.itemId].allcailiaoid;    //洗练材料id
            var allcailiaonum = this.equipRefineInfoData[this.itemId].allcailiaonum;  //消耗材料数量
            var allmoneynum = this.equipRefineInfoData[this.itemId].allmoneynum;      //消耗货币数量
            let bag: game.modules.bag.models.BagVo = BagModel.getInstance().getBagGameItemData(BagTypes.BAG);
            var isHave: boolean = false;
            for (var i: number = 0; i < bag.items.length; i++) {
                if (bag.items[i].id == allcailiaoid && bag.items[i].number >= allcailiaonum) {
                    isHave = true;
                    continue;
                }
            }
            if (!isHave) {
                var param = [this.itemAttrData[allcailiaoid].name];
                var msg = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.LACK_OF_MATERIAL, param);
                game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, msg);
                return;
            }
            var sliver: number = BagModel.getInstance().sliverIcon;
            if (sliver < allmoneynum) {
                this.needYinBi = allmoneynum - sliver;
                this.needJinBi = Math.ceil(this.needYinBi / 100);
                this.needYuanBao = Math.ceil(this.needYinBi / 10000);
                this._yinBiTips.onShow(false, this.needYinBi + "", this.needYuanBao + "", this.needJinBi + "");
                return;
            }
            this.refineEquip();
        }
        /** 重铸达成条件发送请求 */
        public refineEquip() {
            var index = this._viewUI.equip_list.selectedIndex;
            if (index < 0) { index = 0 }
            var packid = this.chongzhuArr[index].packid;
            var key = this.chongzhuArr[index].key;
            RequesterProtocols._instance.c2s_CRefineEquip_All(packid, key);
        }
        /** 金币兑换银币 */
        public jinbijiesuo(): void {
            this._yinBiTips.hide();
            let hadJinBi = game.modules.mainhud.models.HudModel.getInstance().goldNum;
            if (this.needJinBi < hadJinBi) {
                RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_GoldCoin, MoneyTypes.MoneyType_SilverCoin, this.needJinBi);
                this.refineEquip();
            } else {
                this._yinBiTips.onShow(true, this.needJinBi - hadJinBi + "", Math.ceil((this.needJinBi - hadJinBi) / 100) + "");
                this._yinBiTips.once(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.jinbibuzu, [Math.ceil((this.needJinBi - hadJinBi) / 100)]);
            }
        }
        /** 元宝兑换银币 */
        public yuanbaojiesuo(): void {
            this._yinBiTips.hide();
            if (this.needYuanBao < game.modules.mainhud.models.HudModel.getInstance().fuShiNum) {
                RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_HearthStone, MoneyTypes.MoneyType_SilverCoin, this.needYuanBao);
                this.refineEquip();
            } else {
                let prompto = HudModel.getInstance().promptAssembleBack(PromptExplain.CHARGE_TIPS);
                this._remindViewMediator.onShow(prompto, "确定");
                this._remindViewMediator.once(commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
                this._remindViewMediator.once(commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);
            }
        }
        /** 元宝兑换金币 */
        public jinbibuzu(): void {
            this._yinBiTips.hide();
            if (this.needYuanBao < game.modules.mainhud.models.HudModel.getInstance().fuShiNum) {
                RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_HearthStone, MoneyTypes.MoneyType_GoldCoin, this.needYuanBao);
                RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_GoldCoin, MoneyTypes.MoneyType_SilverCoin, this.needJinBi);
                this.refineEquip();
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
            this.hide();
            ModuleManager.hide(ModuleNames.BAG);
            ModuleManager.jumpPage(ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
        }
        /** 元宝补足界面取消按钮监听 */
        public cancleToJump(): void {
            this._remindViewMediator.off(commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
            this._remindViewMediator.hide();
        }
        /**
         * 重铸的装备
         */
        public initChongzhu() {
            var bagTyps1 = BagTypes.BAG;
            var bagTyps2 = BagTypes.EQUIP;
            this.getxilianid(bagTyps1);
            this.getxilianid(bagTyps2);
        }

        /**获取装备id */
        public getxilianid(bagTyps) {
            var bag: game.modules.bag.models.BagVo = BagModel.getInstance().getBagGameItemData(bagTyps);
            var items = bag.items;
            for (var i = 0; i < items.length; i++) {
                var id = items[i].id;
                var key = items[i].key;
                var nquality = this.itemAttrData[id].nquality;
                if (120000 <= id && id <= 126675 || 140000 <= id && id <= 140005 || 10000 <= id && id <= 10009) {   //获取背包中所有的装备
                    if (nquality >= 4) {  //装备的品质大于4才能重铸
                        if (bagTyps == BagTypes.BAG) {
                            this.chongzhuArr.push({ id: id, packid: BagTypes.BAG, key: key });
                        } else if (bagTyps == BagTypes.EQUIP) {
                            this.chongzhuArr.push({ id: id, packid: BagTypes.EQUIP, key: key });
                        }
                    }
                }
            }
        }

        /**
         * 显示拥有的钱
         */
        private showSilverNumber() {
            let str: string;
            let score = BagModel.getInstance().sliverIcon;

            if (!isNaN(score)) {
                str = game.utils.MoneyU.number2Thousands(score);
            } else {
                str = "0";
            }
            this._viewUI.havaMoney_lab.text = str;
            this._viewUI.needMeoneyIcon_img.skin = "common/ui/tongyong/common_yinb.png";
            this._viewUI.haveMeoneyIcon_img.skin = "common/ui/tongyong/common_yinb.png";
        }

        /**
        * 材料数量
        */
        public getCailiaoNum(cailiaoId: number) {
            var allNum = 0;
            var bagitems = bagModel.getInstance().bagMap[BagTypes.BAG].items;
            for (var i: number = 0; i < bagitems.length; i++) {
                var id = bagitems[i].id;
                if (id == cailiaoId) {
                    allNum += bagitems[i].number;
                }
            }
            return allNum;
        }

        /**显示材料数量 */
        public showCailiaoNum(needcailiaoNum, cailiaoid) {
            var num = this.getCailiaoNum(cailiaoid);
            tipsModel._instance.showNeedNum(needcailiaoNum, num, this._viewUI.num_label, false)
        }

        public onCloseBtn() {
            this.hide();
        }
        /** 供其它地方显示装备洗炼界面提供接口
         * @param equipId 装备id
         * @param equipKey 装备key
         */
        public onShow(equipId: number, equipKey:number): void {
            this.show();
            let equipPos = 0;
            for (let i = 0; i < this.chongzhuArr.length; i++) {
                let _equipId = this.chongzhuArr[i]["id"];
                let _equipKey = this.chongzhuArr[i]["key"];
                if (_equipId == equipId && _equipKey == equipKey) {
                    equipPos = i;
                    break;
                }
            }
            this.initEquipList();
            this.equiplistSelect(equipPos);
            this._viewUI.equip_list.scrollTo(equipPos);
        }
        public show() {
            super.show();
        }

        public hide(): void {
            super.hide();
            if (LoginModel.getInstance().CommonPage != "") {
                ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                LoginModel.getInstance().CommonPage = "";
            }
            if (this.selectedDiTu) {
                this.selectedDiTu.skin = "common/ui/tongyong/common_list_3textbg.png";
            }
        }

        public getView(): Sprite {
            return this._viewUI;
        }
    }
}