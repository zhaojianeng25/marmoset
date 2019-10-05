
module game.modules.tips {
    /** 装备洗练 */
    export class EquipWashPractiseMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.component.EquipWashPractiseUI;

        /**洗炼的装备id */
        xilianArr: Array<any> = [];
        /**拥有的装备 */
        haveEquipArr: Array<any> = [];
        /**复合表 */
        itemAttrData = BagModel.getInstance().itemAttrData;
        /**装备洗练表 */
        equipRefineInfoData = game.modules.tips.models.TipsModel._instance.equipRefineInfoData;
        /**装备的属性和附加属性 */
        equipTips = StrengTheningModel.getInstance().equipTips;
        /**装备生成基本属性表 */
        equipIteminfoData = StrengTheningModel.getInstance().equipIteminfoData;
        /**属性效果id表 */
        attributeDesConfigData = StrengTheningModel.getInstance().attributeDesConfigData;
        /**程序内字符串表 */
        cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
        // /**洗练后的属性预览 */
        // equipWashAttr = tipsModel._instance.equipWashAttr;
        /**储存装备之前的属性 */
        oldAttr: Dictionary = new Dictionary();
        /** 洗练所需要的物品id */
        public itemId: number = 0;
        /** 金币补足界面 */
        private _jinBiTips: commonUI.JinBiBuZuViewMediator;
        /** 元宝补足界面 */
        private _remindViewMediator: commonUI.RemindViewMediator;
        /** 被选中装备列表选项 */
        private selectedDiTu: any;
        /** 需要洗炼的装备（毕竟是从该装备进入到装备洗炼界面）在洗炼界面的装备列表的位置 */
        private equipPos: number;

        constructor(app: AppBase) {
            super(app.uiRoot.general);
            this._viewUI = new ui.common.component.EquipWashPractiseUI();
            this.isCenter = true;
            this._app = app;
            this._jinBiTips = new commonUI.JinBiBuZuViewMediator(this._viewUI, this._app);
            this._remindViewMediator = commonUI.RemindViewMediator.getInstance(this._viewUI, this._app);
            this._jinBiTips.on(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.jinbibuzu);
            this.init();
        }

        /**初始化 */
        public init() {
            this._viewUI.saveBox.visible = false;
            this._viewUI.attrBox.visible = false;
            this.initXilianArr();
            this.showSilverNumber();
            this.initEvent();
            this.initBtn();
        }

        /**事件接收 */
        public initEvent() {
            game.modules.createrole.models.LoginProxy.getInstance().on(game.modules.createrole.models.GetItemTips_EVENT, this, this.flushAttr);
            game.modules.bag.models.BagProxy.getInstance().on(game.modules.bag.models.REFRESH_CURRENCY_EVENT, this, this.flush);
            models.TipsProxy.getInstance().on(models.WASHATTR, this, this.showWashAttr);
        }

        /**按钮事件 */
        public initBtn() {
            this._viewUI.ok_btn.on(LEvent.MOUSE_DOWN, this, this.onOkBtn);
            this._viewUI.save_btn.on(LEvent.MOUSE_DOWN, this, this.onSaveBtn);
            this._viewUI.notSave_btn.on(LEvent.MOUSE_DOWN, this, this.showNoWashAttr);
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.onCloseBtn);
        }

        /**刷新 */
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

        /**点击关闭按钮 */
        public onCloseBtn() {
            // models.TipsProxy.getInstance().event(models.CLOSE_TIPS);
            this.hide();
        }

        /**刷新属性 */
        public flushAttr() {
            var index = this._viewUI.equip_list.selectedIndex;
            if (index < 0) { index = 0 }
            this.showEquipAttr(index);
        }

        /**初始化装备列表 */
        public initEquipList() {
            var equiplist = this._viewUI.equip_list;
            for (var i = 0; i < this.xilianArr.length; i++) {
                var id = this.xilianArr[i].id;
                var name = this.itemAttrData[id].name;
                var nquality = this.itemAttrData[id].nquality;
                var iconid = this.itemAttrData[id].icon;
                var itemIcon = SaleModel.getInstance().getIcon(iconid);  //icon
                var itemnquality = StrengTheningModel._instance.frameSkinArr[nquality - 1];
                var level = this.itemAttrData[id].level + "级";
                this.haveEquipArr.push({ name_lab: name, level_lab: level, frame_img: itemnquality, icon_img: itemIcon });

            }
            SaleModel.getInstance().showList(equiplist, this.haveEquipArr);
            this._viewUI.equip_list.renderHandler = new Handler(this, this.equiplistRender);
            equiplist.selectHandler = new Handler(this, this.equiplistSelect);
        }
        /** 装备列表的渲染 */
        private equiplistRender(cell: Box, index: number): void {
            let bgDiTu_img: Laya.Image = cell.getChildByName("bgDiTu_img") as Laya.Image;
            bgDiTu_img.skin = "common/ui/tongyong/common_list_3textbg.png";
            if (this.selectedDiTu) {
                this.selectedDiTu.skin = "common/ui/tongyong/common_list_3textbg2.png";
            }
        }

        /**装备选择 */
        public equiplistSelect(index) {
            let _bgDiTu_img: Laya.Image = this._viewUI.equip_list.getCell(index).getChildByName("bgDiTu_img") as Laya.Image;
            _bgDiTu_img.skin = "common/ui/tongyong/common_list_3textbg2.png";
            this.selectedDiTu = _bgDiTu_img;
            if (this.xilianArr.length == 0) return;
            this.itemId = this.xilianArr[index].id;
            var id = this.xilianArr[index].id;
            if ( id == "null") return;
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
            var cailiaoid = this.equipRefineInfoData[id].cailiaoid;  //洗练材料id
            var cailiaonum = this.equipRefineInfoData[id].cailiaonum;  //消耗材料数量
            var moneytype = this.equipRefineInfoData[id].moneytype;  //货币类型
            var moneynum = this.equipRefineInfoData[id].moneynum;    //消耗货币数量
            var cailiaoIconid = this.itemAttrData[cailiaoid].icon;
            var cailiaoqualityid = this.itemAttrData[cailiaoid].nquality;
            var cailiaoIcon = SaleModel.getInstance().getIcon(cailiaoIconid);  //icon
            var cailiaoquality = StrengTheningModel._instance.frameSkinArr[cailiaoqualityid - 1];
            this._viewUI.itemFrame_img.skin = cailiaoquality;
            this._viewUI.itemIcon_img.skin = cailiaoIcon;
            this._viewUI.itemIcon_img.on(LEvent.CLICK, this, this.showItemTips, [cailiaoid]);
            var str = game.utils.MoneyU.number2Thousands(moneynum);
            this._viewUI.needMoney_label.text = str;
            this.showEquipAttr(index);
            this.showCailiaoNum(cailiaonum, cailiaoid);
        }
        /** 显示洗炼所需消耗的材料信息tips */
        private showItemTips(itemid:number):void{
            let parame = new Laya.Dictionary();
            parame.set("itemId",itemid);
            let _tipsModule = new tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
        }

        /**
         * @param index 当前点击的装备列表的index
         */
        public showEquipAttr(index) {
            var equipTips = StrengTheningModel.getInstance().equipTips;
            var packid = this.xilianArr[index].packid;
            var key = this.xilianArr[index].key;
            var html = "";
            let baseNum = 0;
            let baseAttrKsys = [];
            let greenArrowImgSkin = [];
            for (var i = 0; i < equipTips.length; i++) {
                var keyinpack = equipTips[i].keyinpack;  //装备的key
                var tipsPackid = equipTips[i].packid;  //背包id
                if (packid == tipsPackid && key == keyinpack) {
                    var tips = equipTips[i].tips;
                    var baseAttr = tips.baseAttr;
                    baseAttrKsys = baseAttr.keys;
                    this.oldAttr.clear();
                    baseNum = baseAttrKsys.length;//基础属性个数                    
                    for (var k = 0; k < baseAttrKsys.length; k++) {
                        greenArrowImgSkin.push({
                            greenArrow_img: { skin: "common/ui/tongyong/rightline.png" }
                        });
                        var baseid = baseAttrKsys[k];   //属性id
                        var attrValue = baseAttr.get(baseid);  //值
                        this.oldAttr.set(baseid + k, attrValue);
                        var numpositivedes = this.attributeDesConfigData[baseid].numpositivedes;  //属性描述
                        var attrDesc = numpositivedes.replace("$parameters$", attrValue);
                        html += "<span style='fontSize:24;color:#361A0F'>" + attrDesc + "</span><br>";
                        html += "<span style='fontSize:20'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br>";
                    }
                }

            }
            this._viewUI.greenArrow_lst.array = greenArrowImgSkin;
            this._viewUI.greenArrow_lst.repeatY = baseNum;
            this._viewUI.equipAttr_html.innerHTML = html;
            this.showNoWashAttr(index);
        }
        public showNoWashAttr(index: number) {
            this._viewUI.saveBox.visible = false;
            let html = "";
            let _equipTips = StrengTheningModel.getInstance().equipTips;
            let _equipId = this.xilianArr[index]["id"];//装备id
            let _packId = this.xilianArr[index]["packid"];//所在背包id
            let _keyInPack = this.xilianArr[index]["key"];//所在背包中key
            let baseAttr = new Laya.Dictionary();
            for (let i = 0; i < _equipTips.length; i++) {
                let _equipTip = _equipTips[i];
                let packid = _equipTip.packid;
                let keyinpack = _equipTip.keyinpack;
                if (packid == _packId && keyinpack == _keyInPack) {
                    let tips: strengThening.models.TipsVo = _equipTip.tips;
                    baseAttr = tips.baseAttr;//获取到该装备的基础属性数据
                    break;
                }
            }
            for (let i = 0; i < baseAttr.keys.length; i++) {
                let _baseId = baseAttr.keys[i];//获取基础属性的id
                let _numpositivedes = this.attributeDesConfigData[_baseId].numpositivedes;//属性中文描述
                _numpositivedes = _numpositivedes.replace("+$parameters$", "");
                html += "<span style='fontSize:24;color:#361A0F'>" + _numpositivedes + "&nbsp;&nbsp;0</span><span style='color:#13FF00;fontSize:24'>&nbsp;&nbsp;+0</span><br>";
                html += "<span style='fontSize:20'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br>";
            }
            this._viewUI.equipWashAttr_html.innerHTML = html;
        }

        /**
         * 显示洗练之后的属性预览
         */
        public showWashAttr() {
            /**洗练预览属性 */
            var equipWashAttr = tipsModel._instance.equipWashAttr;
            var equipTips = StrengTheningModel.getInstance().equipTips;
            var attr = equipWashAttr[equipWashAttr.length - 1].attr;
            var washpackid = equipWashAttr[equipWashAttr.length - 1].packid;  //背包id
            var washkeyinpack = equipWashAttr[equipWashAttr.length - 1].keyinpack; // key
            var html = "";
            for (var i = 0; i < equipTips.length; i++) {
                var keyinpack = equipTips[i].keyinpack;  //装备的key
                var tipsPackid = equipTips[i].packid;  //背包id
                if (washpackid == tipsPackid && washkeyinpack == keyinpack) {
                    var washAttrKeys = attr.keys;
                    for (var k = 0; k < washAttrKeys.length; k++) {
                        var washId = washAttrKeys[k];
                        var washValue = attr.get(washId);    //刷新的属性值
                        var oldAttr = this.oldAttr.get(washId + k);  //原属性值
                        var diff = washValue - oldAttr;
                        var showdiff = "";
                        if (diff >= 0) {
                            showdiff = "+" + diff;
                        } else {
                            showdiff = diff + "";
                        }
                        var numpositivedes = this.attributeDesConfigData[washId].numpositivedes;  //属性描述
                        var attrDesc = numpositivedes.replace("$parameters$", washValue);
                        html += "<span style='fontSize:24;color:#361A0F'>" + attrDesc + "</span><span style='color:#13FF00;fontSize:24'>&nbsp;&nbsp;" + showdiff + "</span><br>";
                        html += "<span style='fontSize:20'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br>";
                    }
                }
            }
            this._viewUI.equipWashAttr_html.innerHTML = html;
            this._viewUI.saveBox.visible = true;
        }


        /**
         * 洗练的装备
         */
        public initXilianArr() {
            var bagTyps1 = BagTypes.BAG;
            var bagTyps2 = BagTypes.EQUIP;
            this.getxilianid(bagTyps1);
            this.getxilianid(bagTyps2);
        }

        /**获取装备 */
        public getxilianid(bagTyps) {
            var bag: game.modules.bag.models.BagVo = BagModel.getInstance().getBagGameItemData(bagTyps);
            var items = bag.items;
            let _equipRefineInfoData = tips.models.TipsModel._instance.equipRefineInfoData;//装备洗炼表
            for (var i = 0; i < items.length; i++) {
                var id = items[i].id;
                var key = items[i].key;
                var nquality = this.itemAttrData[id].nquality;
                if (nquality >= 4) {   //装备的品质大于等于4才能洗练
                    if (!_equipRefineInfoData[id]) continue;
                    if (bagTyps == BagTypes.BAG) {
                        this.xilianArr.push({ id: id, packid: BagTypes.BAG, key: key });
                    } else if (bagTyps == BagTypes.EQUIP) {
                        this.xilianArr.push({ id: id, packid: BagTypes.EQUIP, key: key });
                    }
                }
            }
        }

        /**
         * 点击洗练按钮
         */
        public onOkBtn() {
            if (this._viewUI.saveBox.visible) {
                return;
            }
            var cailiaoid: number = this.equipRefineInfoData[this.itemId].cailiaoid;    //洗练材料id
            var cailiaonum: number = this.equipRefineInfoData[this.itemId].cailiaonum;  //消耗材料数量
            var moneynum: number = this.equipRefineInfoData[this.itemId].moneynum;      //消耗货币数量
            let bag: game.modules.bag.models.BagVo = BagModel.getInstance().getBagGameItemData(BagTypes.BAG);
            var isHave: boolean = false;
            for (var i: number = 0; i < bag.items.length; i++) {
                if (bag.items[i].id == cailiaoid && bag.items[i].number >= cailiaonum) {
                    isHave = true;
                    continue;
                }
            }
            if (!isHave) {
                var param = [this.itemAttrData[cailiaoid].name];
                var msg = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.LACK_OF_MATERIAL, param);
                game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, msg);
                return;
            }
            var global: number = BagModel.getInstance().globalIcon;
            if (global < moneynum) {
                this.needJinBi = moneynum - global;
                this._jinBiTips.onShow(true, this.needJinBi + "", Math.ceil(this.needJinBi / 100) + "");
                return;
            }
            this.refineEquip();
        }
        /** 洗练达成条件发送请求 */
        public refineEquip(): void {
            var index = this._viewUI.equip_list.selectedIndex;
            if (index < 0) { index = 0 }
            var packid = this.xilianArr[index].packid;
            var key = this.xilianArr[index].key;
            RequesterProtocols._instance.c2s_CRefineEquip_Base(packid, key);
        }
        /** 元宝兑换金币 */
        public needJinBi: number = 0;
        public jinbibuzu(): void {
            this._jinBiTips.hide();
            if (Math.ceil(this.needJinBi / 100) < game.modules.mainhud.models.HudModel.getInstance().fuShiNum) {
                RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_HearthStone, MoneyTypes.MoneyType_GoldCoin, Math.ceil(this.needJinBi / 100));
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
         * 保存
         */
        public onSaveBtn() {
            var index = this._viewUI.equip_list.selectedIndex;
            if (index < 0) { index = 0 }
            var packid = this.xilianArr[index].packid;
            var key = this.xilianArr[index].key;
            RequesterProtocols._instance.c2s_CSaveRefine_Data(packid, key);
            this._viewUI.saveBox.visible = false;
            this.showNoWashAttr(index);
        }

        /**
         * 材料数量
         */
        public getCailiaoNum(cailiaoId) {
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
            this._viewUI.havaMoney_lab.text = str;
        }
        /** 供其它地方显示装备洗炼界面提供接口
         * @param equipId 装备id
         * @param equipKey 装备key
         */
        public onShow(equipId: number, equipKey:number): void {
            this.show();
            for (let i = 0; i < this.xilianArr.length; i++) {
                let _equipId = this.xilianArr[i]["id"];
                let _equipKey = this.xilianArr[i]["key"];
                if (_equipId == equipId && _equipKey == equipKey) {
                    this.equipPos = i;
                    break;
                }
            }
            this.initEquipList();
            this.equiplistSelect(this.equipPos);
            this._viewUI.equip_list.scrollTo(this.equipPos);
        }
        public show() {
            super.show();
        }

        public hide(): void {
            if (LoginModel.getInstance().CommonPage != "") {
                ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                LoginModel.getInstance().CommonPage = "";
            }
            super.hide();
            if (this.selectedDiTu) {
                this.selectedDiTu.skin = "common/ui/tongyong/common_list_3textbg.png";
            }
        }

        public getView(): Sprite {
            return this._viewUI;
        }
    }
}