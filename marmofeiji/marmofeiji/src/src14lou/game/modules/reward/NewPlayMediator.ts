/**
* NewPlayMediator 
*/
module game.modules.reward {
    export class NewPlayMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.RewardNewPlayUI;
        private _tipsModule: game.modules.tips.tipsModule;
        constructor(uiLayer: Sprite) {
            super(uiLayer);
            this._viewUI = new ui.common.RewardNewPlayUI();
            this._viewUI.mouseThrough = true;
            this.isCenter = false;

            this._viewUI.getNewPlayerReward_btn.on(LEvent.MOUSE_DOWN, this, this.getTimeReward);
            this._viewUI.timeTips_btn.on(LEvent.MOUSE_DOWN, this, this.getTips);
        }
        /** 领取新手奖励 */
        public getTimeReward(): void {
            RequesterProtocols._instance.c2s_CGetTime_Award(this.timeNum);
            RewardProxy.getInstance().once(models.TIMEAWARD_EVENT, this, () => {
                this.timeOut();
                RewardModel.getInstance().pointDic.set(4, 0);
                //发送新手礼包领取事件
                RewardProxy.getInstance().event(models.NEWPLAYERGET_EVENT);
            });
        }
        //新手奖励-倒计时
        private minutes: number;     //分钟
        private seconds: number;     //秒
        private timeNum: number = 1; //领取的次数,从1开始
        /** 新手奖励数据加载 */
        public timeOut(): void {
            var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
            var _onLineGiftBinDic = RewardModel.getInstance().onLineGiftBinDic;
            this.timeNum = RewardModel.getInstance().awardid;
            var skinArr: Array<any> = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
                "common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
                "common/ui/tongyong/jinkuang.png"];
            var _waittime: number;
            if (this.timeNum == -1) {
                this.timeNum = 7;
                this._viewUI.getNewPlayerReward_btn.disabled = true;
                this._viewUI.getNewPlayerReward_btn.label = "已领取";
            } else {
                var nowTime = new Date().getTime();
                if (RewardModel.getInstance().endtime - nowTime <= 0) {
                    _waittime = 0;
                } else {
                    _waittime = RewardModel.getInstance().endtime - nowTime;
                }
                if (Math.floor(_waittime / 60000) < 1) {
                    this.minutes = 0;
                    this.seconds = Math.floor(_waittime / 1000);
                } else {
                    this.minutes = Math.floor(_waittime / 60000);
                    this.seconds = Math.floor((_waittime - this.minutes * 60000) / 1000);
                }
                this._viewUI.getNewPlayerReward_btn.label = "领取奖励";
                if (_waittime == 0) {
                    this._viewUI.getNewPlayerReward_btn.disabled = false;
                } else {
                    this._viewUI.getNewPlayerReward_btn.disabled = true;
                }
                Laya.timer.loop(1000, this, this.onLoop);
            }
            var _num: string;
            if (_onLineGiftBinDic[this.timeNum].itemnum1 > 1) {
                _num = "" + _onLineGiftBinDic[this.timeNum].itemnum1;
            } else {
                _num = "";
            }
            var _icon = _itemAttrBinDic[_onLineGiftBinDic[this.timeNum].itemidnew1].icon;
            var _diban = skinArr[_itemAttrBinDic[_onLineGiftBinDic[this.timeNum].itemidnew1].nquality - 1];
            this._viewUI.icon_img.skin = this.getSrc(_icon);
            this._viewUI.num_lab.text = _num;
            this._viewUI.diban_img.skin = _diban;
        }
        /** 倒计时显示设置 */
        public onLoop(): void {
            if (this.minutes <= -1) {
                this.seconds = 0;
                Laya.timer.clear(this, this.onLoop);
                this._viewUI.getNewPlayerReward_btn.disabled = false;
                return;
            }
            var _minutes: string;
            var _seconds: string;
            if (this.minutes < 10) {
                _minutes = "0" + this.minutes;
            } else {
                _minutes = "" + this.minutes;
            }
            if (this.seconds < 10) {
                _seconds = "0" + this.seconds;
            } else {
                _seconds = "" + this.seconds;
            }
            this._viewUI.daojishi_label.text = _minutes + ":" + _seconds;
            if (this.seconds <= 0) {
                this.minutes--;
                this.seconds = 60;
            }
            this.seconds--;
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
        /** 物品信息弹窗 */
        public getTips(): void {
            var _onLineGiftBinDic = RewardModel.getInstance().onLineGiftBinDic;
            var itemId = _onLineGiftBinDic[this.timeNum].itemidnew1;
            var parame: Dictionary = new Dictionary();
            parame.set("itemId", itemId);
            this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
        }

        public show(): void {
            super.show();
            this.timeOut();
        }
        public hide(): void {
            super.hide();
        }
        public getView(): Sprite {
            return this._viewUI;
        }
    }
}