/**
* 首充及vip信息 
*/
module game.modules.reward {
    export class ChargeMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.RewardChargeUI;
        private _itemTips: game.modules.tips.tipsModule;
        private _petTips: game.modules.commonUI.PetMessageMediator;
        /** 当前显示的vip等级 */
        public showVipLevel: number;
        constructor(uiLayer: Sprite) {
            super(uiLayer);
            this._viewUI = new ui.common.RewardChargeUI();
            this._viewUI.mouseThrough = true;
            this.isCenter = false;

            //vip跳转充值按钮
            this._viewUI.vipGoCharge_btn.on(LEvent.MOUSE_DOWN, this, () => {
                ModuleManager.jumpPage(ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
                ModuleManager.hide(ModuleNames.REWARD);
            });
            //vip奖励领取按钮
            this._viewUI.getvipReward_btn.on(LEvent.MOUSE_DOWN, this, () => {
                RequesterProtocols._instance.c2s_CRequestVipJiangli(this.showVipLevel);
                RewardProxy.getInstance().once(models.VIP_EVENT, this, () => {
                    if (this.showVipLevel <= 10) {
                        this.init();
                    } else {
                        // RewardProxy.getInstance().event(models.REFRESH);
                        this._viewUI.vipGoCharge_btn.visible = false;
                        this._viewUI.getvipReward_btn.visible = false;
                    }
                });
            });
            //首充跳转充值按钮
            this._viewUI.GoCharge_btn.on(LEvent.MOUSE_DOWN, this, () => {
                ModuleManager.jumpPage(ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
                ModuleManager.hide(ModuleNames.REWARD);
            });
            //首充领取奖励按钮
            this._viewUI.getReward_btn.on(LEvent.MOUSE_DOWN, this, () => {
                RequesterProtocols._instance.c2s_CGetFirstPayReward();
                RewardProxy.getInstance().once(models.STATE_EVENT, this, () => {
                    this.init();
                });
            });
            this.btnListener();
        }
        /** 首充/vip数据加载 */
        public init(): void {
            var _shape = LoginModel.getInstance().roleDetail.shape - 1;
            var _vipInfoBinDic = ShopModel.getInstance().VipInfoBinDic;
            var _petAttrBinDic = PetModel.getInstance().petCPetAttrData;
            var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
            var _state = RewardModel.getInstance().state;
            var _shouChongLiBaoBinDic = RewardModel.getInstance().shouChongLiBaoBinDic;

            var skinArr: Array<any> = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
                "common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
                "common/ui/tongyong/jinkuang.png"];

            if (_state == 0) {  //显示首充窗口-奖励不可领取状态
                this.chargeBox(_shape, _petAttrBinDic, _itemAttrBinDic, _shouChongLiBaoBinDic, skinArr);
                this._viewUI.charge_box.visible = true;
                this._viewUI.vip_box.visible = false;
                this._viewUI.getReward_btn.visible = false;
                this._viewUI.GoCharge_btn.visible = true;
            } else if (_state == 1) {   //显示首充窗口-奖励可领取状态
                this.chargeBox(_shape, _petAttrBinDic, _itemAttrBinDic, _shouChongLiBaoBinDic, skinArr);
                this._viewUI.charge_box.visible = true;
                this._viewUI.vip_box.visible = false;
                this._viewUI.getReward_btn.visible = true;
                this._viewUI.GoCharge_btn.visible = false;
            } else {    //显示vip信息窗口
                this.vipBox(_itemAttrBinDic, _vipInfoBinDic, skinArr);
                this._viewUI.charge_box.visible = false;
                this._viewUI.vip_box.visible = true;
            }
        }
        /** vip特权窗口 */
        public vipBox(_itemAttrBinDic, _vipInfoBinDic, skinArr): void {
            var vipInfo = RewardModel.getInstance().vipInfo;
            var vipLevel: number = vipInfo.viplevel;
            var vipExp: number = vipInfo.vipexp;
            var bounus: number = vipInfo.bounus;
            var gotbounus: number = vipInfo.gotbounus;
            this.showVipLevel = Math.log(gotbounus + 1) / Math.log(2) + 1;
            if (this.showVipLevel >= 12) this.showVipLevel = 11;
            var _exp = _vipInfoBinDic[this.showVipLevel].exp;

            if (gotbounus < bounus) {
                this._viewUI.vipGoCharge_btn.visible = false;
                this._viewUI.getvipReward_btn.visible = true;
                this._viewUI.exp_pro.value = _exp / _exp;
                this._viewUI.numCharge_lab.text = "0";
            }
            else if (gotbounus == bounus && vipLevel == 11) {
                this._viewUI.vipGoCharge_btn.visible = false;
                this._viewUI.getvipReward_btn.visible = false;
                this._viewUI.exp_pro.value = _exp / _exp;
                this._viewUI.numCharge_lab.text = "0";
            } 
            else {
                this._viewUI.vipGoCharge_btn.visible = true;
                this._viewUI.getvipReward_btn.visible = false;
                this._viewUI.exp_pro.value = vipExp / _exp;
                this._viewUI.numCharge_lab.text = _exp - vipExp + "";
            }

            this._viewUI.vipLevel_img.skin = "common/ui/tongyong/VIP" + this.showVipLevel + ".png";
            this._viewUI.vipType_lab.text = "V" + this.showVipLevel + "特权奖励";
            if (_vipInfoBinDic[this.showVipLevel].type1 != "") {
                this._viewUI.vaiType_lab1.text = "1 " + _vipInfoBinDic[this.showVipLevel].type1;
            } else {
                this._viewUI.vaiType_lab1.text = "";
            }
            if (_vipInfoBinDic[this.showVipLevel].type2 != "") {
                this._viewUI.vaiType_lab2.text = "2 " + _vipInfoBinDic[this.showVipLevel].type2;
            } else {
                this._viewUI.vaiType_lab2.text = "";
            }
            if (_vipInfoBinDic[this.showVipLevel].type3 != "") {
                this._viewUI.vaiType_lab3.text = "3 " + _vipInfoBinDic[this.showVipLevel].type3;
            } else {
                this._viewUI.vaiType_lab3.text = "";
            }
            for (var i: number = 1; i <= 3; i++) {
                var num_lab = this._viewUI.vip_box.getChildByName("num_lab" + i) as Laya.Label;
                var icon_img = this._viewUI.vip_box.getChildByName("icon_img" + i) as Laya.Image;
                var diban_img = this._viewUI.vip_box.getChildByName("vipReward_img" + i) as Laya.Image;
                if (_vipInfoBinDic[this.showVipLevel].itemids[i - 1] != 0) {
                    num_lab.text = _vipInfoBinDic[this.showVipLevel].itemcounts[i - 1];
                    var _icon = _itemAttrBinDic[_vipInfoBinDic[this.showVipLevel].itemids[i - 1]].icon;
                    icon_img.skin = this.getSrc(_icon);
                    diban_img.skin = skinArr[_itemAttrBinDic[_vipInfoBinDic[this.showVipLevel].itemids[i - 1]].nquality - 1];
                } else {
                    num_lab.text = "";
                    icon_img.skin = "";
                    diban_img.skin = "";
                }
            }
            // if ((_exp - vipExp) === 0 && this._viewUI.exp_pro.value == 1) {
            //     this._viewUI.vipReward_btn.visible = true;
            //     this._viewUI.vipGoCharge_btn.visible = false;
            // }
        }
        /** 首充窗口 */
        public chargeBox(_shape, _petAttrBinDic, _itemAttrBinDic, _shouChongLiBaoBinDic, skinArr): void {
            var _npcShapeBinDic = LoginModel.getInstance().cnpcShapeInfo;
            for (var i: number = 1; i <= 11; i++) {
                var _num: number;
                var _icon: string;
                var _diban: string;
                var num_lab = this._viewUI.charge_box.getChildByName("num_lab" + i) as Laya.Label;
                var icon_img = this._viewUI.charge_box.getChildByName("icon_img" + i) as Laya.Image;
                var diban_img = this._viewUI.charge_box.getChildByName("reward_img" + i) as Laya.Image;
                if (_shouChongLiBaoBinDic[i].itemnum[_shape] == undefined) {
                    _num = _shouChongLiBaoBinDic[i].petnum[_shape];
                    _icon = this.getSrc(_npcShapeBinDic[_petAttrBinDic[_shouChongLiBaoBinDic[i].petid[_shape]].modelid].littleheadID);
                    _diban = skinArr[_petAttrBinDic[_shouChongLiBaoBinDic[i].petid[_shape]].quality - 1];
                } else {
                    _num = _shouChongLiBaoBinDic[i].itemnum[_shape];
                    _icon = this.getSrc(_itemAttrBinDic[_shouChongLiBaoBinDic[i].itemid[_shape]].icon);
                    _diban = skinArr[_itemAttrBinDic[_shouChongLiBaoBinDic[i].itemid[_shape]].nquality - 1];
                }
                if (_num > 1) {
                    num_lab.text = "X" + _num;
                } else {
                    num_lab.text = "";
                }
                icon_img.skin = _icon;
                diban_img.skin = _diban;
            }

        }
        /** 物品弹窗按钮监听 */
        public btnListener(): void {
            this._viewUI.vipItem_btn1.on(LEvent.MOUSE_DOWN, this, this.getVipTips, [0]);
            this._viewUI.vipItem_btn2.on(LEvent.MOUSE_DOWN, this, this.getVipTips, [1]);
            this._viewUI.vipItem_btn3.on(LEvent.MOUSE_DOWN, this, this.getVipTips, [2]);
            this._viewUI.chargeItem_btn1.on(LEvent.MOUSE_DOWN, this, this.getChargeTips, [1]);
            this._viewUI.chargeItem_btn2.on(LEvent.MOUSE_DOWN, this, this.getChargeTips, [2]);
            this._viewUI.chargeItem_btn3.on(LEvent.MOUSE_DOWN, this, this.getChargeTips, [3]);
            this._viewUI.chargeItem_btn4.on(LEvent.MOUSE_DOWN, this, this.getChargeTips, [4]);
            this._viewUI.chargeItem_btn5.on(LEvent.MOUSE_DOWN, this, this.getChargeTips, [5]);
            this._viewUI.chargeItem_btn6.on(LEvent.MOUSE_DOWN, this, this.getChargeTips, [6]);
            this._viewUI.chargeItem_btn7.on(LEvent.MOUSE_DOWN, this, this.getChargeTips, [7]);
            this._viewUI.chargeItem_btn8.on(LEvent.MOUSE_DOWN, this, this.getChargeTips, [8]);
            this._viewUI.chargeItem_btn9.on(LEvent.MOUSE_DOWN, this, this.getChargeTips, [9]);
            this._viewUI.chargeItem_btn10.on(LEvent.MOUSE_DOWN, this, this.getChargeTips, [10]);
            this._viewUI.chargeItem_btn11.on(LEvent.MOUSE_DOWN, this, this.getChargeTips, [11]);
        }
        /** 首充物品弹窗 */
        public getChargeTips(index: number): void {
            var _shape = LoginModel.getInstance().roleDetail.shape - 1;
            var _shouChongLiBaoBinDic = RewardModel.getInstance().shouChongLiBaoBinDic;
            if (_shouChongLiBaoBinDic[index].itemid[_shape] != undefined) { //物品弹窗
                var itemId = _shouChongLiBaoBinDic[index].itemid[_shape];
                var parame: Dictionary = new Dictionary();
                parame.set("itemId", itemId);
                this._itemTips = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
            } else {    //宠物弹窗
                var petId = _shouChongLiBaoBinDic[index].petid[_shape];
                this._petTips = new game.modules.commonUI.PetMessageMediator(petId, this._app);
                ModuleManager.hide(ModuleNames.REWARD);
                this._petTips.show();
                this._petTips.once(commonUI.CLOSE_PET_TIPS, this, this.jumpToReward);
            }
        }
        /** vip物品弹窗 */
        public getVipTips(index: number): void {
            var _vipInfoBinDic = ShopModel.getInstance().VipInfoBinDic;
            var itemId = _vipInfoBinDic[this.showVipLevel].itemids[index];
            var parame: Dictionary = new Dictionary();
            parame.set("itemId", itemId);
            this._itemTips = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
        }
        /** 宠物弹窗关闭后跳转至奖励指定界面 */
        public jumpToReward(): void {
            this._petTips.off(commonUI.CLOSE_PET_TIPS, this, this.jumpToReward);
            ModuleManager.jumpPage(ModuleNames.REWARD, rewardBtnType.CHARGE, this._app);
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
        public show(): void {
            super.show();
            this.init();
        }
        public hide(): void {
            super.hide();
        }
        public getView(): Sprite {
            return this._viewUI;
        }
    }
}