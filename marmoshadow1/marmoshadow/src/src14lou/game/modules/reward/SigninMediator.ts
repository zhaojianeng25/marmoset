/**
* 每日签到 
*/
module game.modules.reward {
    export class SigninMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.RewardSigninUI;
        private _tipsModule: game.modules.tips.tipsModule;
        /** 特效 */
        public ani: Laya.Animation = new Laya.Animation();
        /** 已签到次数 */
        public _times: number;
        /** 当日是否已经签到 0-未签到，1-已签到 */
        public _rewardflag: number;
        constructor(uiLayer: Sprite) {
            super(uiLayer);
            this._viewUI = new ui.common.RewardSigninUI();
            this._viewUI.mouseThrough = true;
            this.isCenter = false;

            this._viewUI.SignReward_list.renderHandler = new Handler(this, this.renderHandler);
        }
        public monthArr: Array<any>;
        /** 每日签到数据加载 */
        public init(): void {
            this.fillData();
            var list = this._viewUI.SignReward_list;
            var regData = RewardModel.getInstance().regData;
            var _month = regData.month;
            this._times = regData.times;
            this._rewardflag = regData.rewardflag;
            //可补签的次数-与当前vip等级相关
            var _suppregtimes = regData.suppregtimes;
            //可补签的次数-与创号日期有关
            var _cansuppregtimes = regData.cansuppregtimes;

            var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
            var _qianDaoJiangLiBinDic = RewardModel.getInstance().qianDaoJiangLiBinDic;

            list.repeatX = 4;
            list.vScrollBarSkin = "";

            // var date = new Date();
            // var nowMonth = date.getMonth() + 1;
            this.monthArr = [];
            for (var i: number = 1; i <= this.getDays(_month); i++) {
                if (i < 10) {
                    this.monthArr.push(_qianDaoJiangLiBinDic[_month + "0" + i]);
                } else {
                    this.monthArr.push(_qianDaoJiangLiBinDic[_month + "" + i]);
                }
            }

            var skinArr: Array<any> = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
                "common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
                "common/ui/tongyong/jinkuang.png"];

            var buQianNum: number = 0;
            var addLength: number = 0;
            if (_suppregtimes > 0 && _cansuppregtimes > 0) {
                if (this._rewardflag != 1) {
                    buQianNum = this._times + 1;
                } else {
                    buQianNum = this._times;
                }
                if (_suppregtimes < _cansuppregtimes) {
                    addLength = _suppregtimes;
                } else {
                    addLength = _cansuppregtimes;
                }
            }
            if (this._rewardflag != 1) {
                this.ani.loadAtlas("common/res/atlas/ui/texiao.atlas", Laya.Handler.create(this, this.onCreateFrame));
                var img = this._viewUI.SignReward_list.getCell(this._times).getChildByName("signin_img") as Laya.Image;
                img.addChild(this.ani);
                this.ani.scaleX = 0.47;
                this.ani.scaleY = 0.48;
            }
            var data: Array<any> = [];
            for (var i: number = 1; i <= this.getDays(_month); i++) {
                var _itemNum: string;
                var _signinSkin: string;
                var _showImgVisible: boolean = false;
                var _buQianVisi: boolean = false;
                var _nqualitySkin: string = skinArr[_itemAttrBinDic[this.monthArr[i - 1].itemId].nquality - 1];
                var _icon: number = _itemAttrBinDic[this.monthArr[i - 1].itemId].icon;

                if (_suppregtimes > 0 && _cansuppregtimes > 0) {
                    if (buQianNum < i && i <= buQianNum + addLength) {
                        _buQianVisi = true;
                    }
                }
                if (i <= this._times) {
                    _showImgVisible = true;
                }
                if (this.monthArr[i - 1].itemNum > 1) {
                    _itemNum = "X" + this.monthArr[i - 1].itemNum;
                } else {
                    _itemNum = "";
                }
                if (this.monthArr[i - 1].borderpic != null && this.monthArr[i - 1].borderpic !== "") {
                    _signinSkin = "common/ui/reward/hong.png";
                } else {
                    _signinSkin = "common/ui/reward/lan.png";
                }
                data.push({
                    day_lab: { text: i + "天" },
                    show_img: { visible: _showImgVisible },
                    signin_img: { skin: _signinSkin },
                    day_img: { skin: _nqualitySkin },
                    icon_img: { skin: "common/icon/item/" + _icon + ".png" },
                    num_lab: { text: _itemNum },
                    buQian_img: { visible: _buQianVisi },
                });
            }
            list.array = data;
        }
        /** 当月已签次数显示 */
        public fillData(): void {
            var regData = RewardModel.getInstance().regData;
            this._viewUI.times_lab.text = "本月累计签到" + regData.times + "天";
            this._viewUI.canSuppregTimes_lab.text = "本月剩余补签次数" + regData.suppregtimes + "次";
        }
        /** 每日签到-获取当月总天数 */
        public getDays(month: number): number {
            var date = new Date();
            var y = date.getFullYear();
            if (month == 2) {
                return y % 4 == 0 ? 29 : 28;
            } else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
                return 31;
            } else {
                return 30;
            }
        }
        /** 每日签到-数据操作 */
        public renderHandler(cell: Laya.Box, index: number): void {
            var btn: Laya.Button = cell.getChildByName("day_btn") as Laya.Button;
            btn.on(LEvent.MOUSE_DOWN, this, this.signinLoda, [cell, index]);
        }
        /** 领取奖励或物品信息弹窗 */
        public signinLoda(cell: Laya.Box, index: number): void {
            var times = RewardModel.getInstance().regData.times;
            var suppregtimes = RewardModel.getInstance().regData.suppregtimes;
            var cansuppregtimes = RewardModel.getInstance().regData.cansuppregtimes;
            var rewardflag = RewardModel.getInstance().regData.rewardflag;
            if (index < times || times + 1 <= index) {  //信息弹窗
                var num = -1;
                if (times + 1 <= index) {
                    num = index - times + 1;
                }
                var parame: Dictionary = new Dictionary();
                parame.set("itemId", this.monthArr[index].itemId);
                parame.set("parame", [num])
                this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
            } else {    //领取奖励
                if (rewardflag == 1 && suppregtimes == 0) return;
                if (rewardflag == 1 && cansuppregtimes == 0) return;
                RequesterProtocols._instance.c2s_CReg(RewardModel.getInstance().regData.month);
                RewardProxy.getInstance().on(models.REGDATA_EVENT, this, () => {
                    if (this._rewardflag != 1) {
                        var img = this._viewUI.SignReward_list.getCell(this._times).getChildByName("signin_img") as Laya.Image;
                        img.removeChild(this.ani);
                    }
                    this.init();
                    RewardModel.getInstance().pointDic.set(0, 0);
                    RewardProxy.getInstance().event(models.EVERYDAY_EVENT);//发送每日签到
                });
            }
        }
        /** 创建领取特效 */
        public onCreateFrame(ani): void {
            let effecthPath = this.getEffectUrls("", 20);
            Laya.Animation.createFrames(effecthPath, "texiao");
            this.ani.play(0, true, "texiao");
            this.ani.interval = 112;
        }
        /** 获取特效资源 */
        public getEffectUrls(aniName: string, length: number): any {
            var urls: any = [];
            for (var index = 1; index <= length; index++) {
                urls.push("common/ui/texiao/" + aniName + index + ".png");
            }
            return urls;
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