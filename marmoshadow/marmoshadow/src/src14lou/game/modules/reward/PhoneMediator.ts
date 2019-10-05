/**
* 手机关联显示 
*/
module game.modules.reward {
    export class PhoneMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.RewardPhoneUI;
        constructor(uiLayer: Sprite) {
            super(uiLayer);
            this._viewUI = new ui.common.RewardPhoneUI();
            this._viewUI.mouseThrough = true;
            this.isCenter = false;
            this._viewUI.goRelationPhone_btn.on(LEvent.MOUSE_DOWN, this, this.cutView);
            this._viewUI.getPhoneReward_btn.on(LEvent.MOUSE_DOWN, this, () => {
                RequesterProtocols._instance.c2s_CGetBindTelAward();
                RewardProxy.getInstance().on(models.BINDTELAWARD_EVENT, this, () => {
                    this.hide();
                });
            });
        }
        /** 手机关联数据加载 */
        private init(): void {
            var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
            var _bindTelAwardBinDic = RewardModel.getInstance().bindTelAwardBinDic;
            if (RewardModel.getInstance().bindTel.tel != 0) {
                this._viewUI.getPhoneReward_btn.visible = true;
                this._viewUI.goRelationPhone_btn.visible = false;
            } else {
                this._viewUI.getPhoneReward_btn.visible = false;
                this._viewUI.goRelationPhone_btn.visible = true;
            }
            if (RewardModel.getInstance().bindTel.isGetBindTelAward != 0) {
                this._viewUI.getPhoneReward_btn.disabled = true;
                this._viewUI.getPhoneReward_btn.label = "已领取";
            } else {
                this._viewUI.getPhoneReward_btn.disabled = false;
                this._viewUI.getPhoneReward_btn.label = "领取奖励";
            }

            var skinArr: Array<any> = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
                "common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
                "common/ui/tongyong/jinkuang.png"];

            var _icon = _itemAttrBinDic[_bindTelAwardBinDic[1].itemid[1]].icon;
            var _diban = skinArr[_itemAttrBinDic[_bindTelAwardBinDic[1].itemid[1]].nquality - 1];
            this._viewUI.diban_img.skin = _diban;
            this._viewUI.icon_img.skin = this.getSrc(_icon);
            if (_bindTelAwardBinDic[1].itemnum[1] > 1) {
                this._viewUI.num_lab.text = "X" + _bindTelAwardBinDic[1].itemnum[1];
            } else {
                this._viewUI.num_lab.text = "";
            }

            this._viewUI.getPhoneReward_btn.visible = false;
        }
        public cutView(): void {
            ModuleManager.hide(ModuleNames.REWARD);
            // ModuleManager.jumpPage(ModuleNames.PHONE, null, this._app);
        }
        public getSrc(index: number): string {
            var src: string = "";
            if (index <= 10000) { src = "common/icon/skillicon/" + index + ".png"; }
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