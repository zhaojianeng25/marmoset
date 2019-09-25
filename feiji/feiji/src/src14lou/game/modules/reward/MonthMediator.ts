/**
* 月卡奖励 
*/
module game.modules.reward {
    export class MonthMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.RewardMonthUI;
        private _tipsModule: game.modules.tips.tipsModule;
        constructor(uiLayer: Sprite) {
            super(uiLayer);
            this._viewUI = new ui.common.RewardMonthUI();
            this._viewUI.mouseThrough = true;
            this.isCenter = false;

            this._viewUI.buyCard_btn.on(LEvent.MOUSE_DOWN, this, this.buyCardHandler);
            this._viewUI.getReward_btn.on(LEvent.MOUSE_DOWN, this, this.getRewardHandler);
            this.btnListener();
        }
        /** 月卡奖励数据加载 */
        private init(): void {
            this.btnHandler();
            this.monthDay();

            var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
            var _monthCardConfigBinDic = RewardModel.getInstance().monthCardConfigBinDic;

            var skinArr: Array<any> = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
                "common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
                "common/ui/tongyong/jinkuang.png"];

            for (var i: number = 1; i <= 5; i++) {
                var img = this._viewUI.month_box.getChildByName("month_img" + i) as Laya.Image;
                var icon = this._viewUI.month_box.getChildByName("icon_img" + i) as Laya.Image;
                var lab = this._viewUI.month_box.getChildByName("num_lab" + i) as Laya.Label;
                img.skin = skinArr[_itemAttrBinDic[_monthCardConfigBinDic[i].itemid].nquality - 1];
                icon.skin = this.getSrc(_itemAttrBinDic[_monthCardConfigBinDic[i].itemid].icon);
                if (_monthCardConfigBinDic[i].itemnum > 1) {
                    lab.text = "X" + _monthCardConfigBinDic[i].itemnum;
                } else {
                    lab.text = "";
                }
            }

        }
        /** 月卡天数计算 */
        public monthDay(): void {
            var date = new Date();
            var nowtime = date.getTime();
            var endTime = RewardModel.getInstance().monthCard.endtime;
            var time = Math.floor((endTime - nowtime) / (1000 * 60 * 60 * 24));
            if (time < 0) {
                time = 0;
            }
            this._viewUI.remainDay_lab.text = "月卡剩余：" + time + "天";
        }
        /** 奖励领取按钮样式判断 */
        public btnHandler(): void {
            var grab = RewardModel.getInstance().monthCard.grab;
            if (grab == 0) {
                this._viewUI.getReward_btn.disabled = true;
                this._viewUI.getReward_btn.label = "已领取";
            } else {
                this._viewUI.getReward_btn.disabled = false;
                this._viewUI.getReward_btn.label = "领取奖励";
            }
        }
        /** 购买月卡 */
        public buyCardHandler(): void {
            RequesterProtocols._instance.c2s_CBuyMonthCard();
            RewardProxy.getInstance().once(models.MONTH_EVENT, this, () => {
                this.monthDay();
                this.btnHandler();
            });
        }
        /** 领取月卡奖励 */
        public getRewardHandler(): void {
            RequesterProtocols._instance.c2s_CGrabMonthCardRewardAll();
            RewardProxy.getInstance().once(models.MONTH_EVENT, this, () => {
                this.btnHandler();
            });
        }
        /** 物品弹窗按钮监听 */
        public btnListener(): void {
            this._viewUI.month_btn1.on(LEvent.MOUSE_DOWN, this, this.getTips, [1]);
            this._viewUI.month_btn2.on(LEvent.MOUSE_DOWN, this, this.getTips, [2]);
            this._viewUI.month_btn3.on(LEvent.MOUSE_DOWN, this, this.getTips, [3]);
            this._viewUI.month_btn4.on(LEvent.MOUSE_DOWN, this, this.getTips, [4]);
            this._viewUI.month_btn5.on(LEvent.MOUSE_DOWN, this, this.getTips, [5]);
        }
        /** 物品信息弹窗 */
        public getTips(index: number): void {
            var _monthCardConfigBinDic = RewardModel.getInstance().monthCardConfigBinDic;
            var itemId = _monthCardConfigBinDic[index].itemid;
            var parame: Dictionary = new Dictionary();
            parame.set("itemId", itemId);
            this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
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