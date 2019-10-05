/**
* 充值界面 
*/
module game.modules.shop {
    export class ChongZhiMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.ShopChongZhiUI;
        private _tipsModule: game.modules.tips.tipsModule;

        /** 当前的vip等级-会根据vip详情界面的切换变动 */
        public levelNum: number;
        /** 当前vip等级-不会变动 */
        public vipLevel: number;
        /** vip的经验 */
        public vipExp: number;
        /** 服务器返回的充值列表信息 */
        public _goods: Array<models.GoodInfoVo> = [];
        constructor(uiLayer: Sprite) {
            super(uiLayer);
            this._viewUI = new ui.common.ShopChongZhiUI();
            this._viewUI.mouseThrough = true;
            this.isCenter = false;

            this._viewUI.left_btn.on(LEvent.MOUSE_DOWN, this, this.leftBtn);
            this._viewUI.right_btn.on(LEvent.MOUSE_DOWN, this, this.rightBtn);
            this._viewUI.vip_tab.selectHandler = new Handler(this, this.cutView);
            this._viewUI.money_list.renderHandler = new Handler(this, this.onSelect);

            this._viewUI.vipTips_btn1.on(LEvent.MOUSE_DOWN, this, this.getTips, [0]);
            this._viewUI.vipTips_btn2.on(LEvent.MOUSE_DOWN, this, this.getTips, [1]);
            this._viewUI.vipTips_btn3.on(LEvent.MOUSE_DOWN, this, this.getTips, [2]);
        }
        /** 初始化界面 */
        public init(): void {
            this._goods = ShopModel.getInstance().goods;
            this.hadFushiNum();
            this._viewUI.vip_tab.selectedIndex = 0;
            this.cutView(0);
            this.chongZhiBox();
        }
        /** 充值按钮监听 */
        public onSelect(cell: Laya.Box, index: number): void {
            var btn = cell.getChildByName("chongZhi_btn") as Laya.Button;
            btn.on(LEvent.CLICK, this, this.btnHandler, [cell, index]);
        }
        /** 当前点击的充值按钮 */
        public btnHandler(cell: Laya.Box, index: number): void {
            RequesterProtocols._instance.c2s_CConfirmCharge(this._goods[index].goodid, 1, "T0");
            game.modules.shop.models.ShopProxy.getInstance().once(game.modules.shop.models.FUSHINUM_EVENT, this, () => {
                this.hadFushiNum();
            });
        }
        /** 充值列表信息加载 */
        public chongZhiBox(): void {
            this._viewUI.money_list.vScrollBarSkin = "";
            this._viewUI.money_list.repeatX = 2;
            this._viewUI.money_list.scrollBar.elasticBackTime = 500;
            this._viewUI.money_list.scrollBar.elasticDistance = 20;

            var skinArr: Array<string> = ["common/ui/shopui/money1.png", "common/ui/shopui/money2.png",
                "common/ui/shopui/money3.png", "common/ui/shopui/money4.png",
                "common/ui/shopui/money5.png", "common/ui/shopui/money6.png",
                "common/ui/shopui/money7.png", "common/ui/shopui/money8.png",];

            var data: Array<any> = [];
            for (var i: number = 0; i < this._goods.length; i++) {
                var _goodInfo = this._goods[i];
                var _fushi: string;
                var _present: string;
                var _presentVisi: boolean = true;
                var _zengSongVisi: boolean = true;
                _fushi = _goodInfo.fushi + "";
                if (_goodInfo.present == 0) {
                    _presentVisi = false;
                    _zengSongVisi = false;
                } else {
                    _present = _goodInfo.present + "";
                }
                data.push({
                    money_lab1: { text: _fushi },
                    money_lab2: { text: "￥ " + _goodInfo.price },
                    money_lab3: { text: _present, visible: _presentVisi },
                    zengSong_box: { visible: _zengSongVisi },
                    chongZhi_btn: { skin: skinArr[i] }
                });
            }
            this._viewUI.money_list.array = data;
        }
        /** 拥有的元宝数量加载 */
        public hadFushiNum(): void {
            var _fushiNum = game.modules.mainhud.models.HudModel.getInstance().fuShiNum;
            this._viewUI.yuanBaoNum_lab.text = this.setNumStyle(_fushiNum);
        }
        /** 设置元宝数字显示样式 */
        public setNumStyle(num: number): string {
            var _num = num.toString();
            var len = _num.length;
            if (len <= 3 || num == 0) return _num;
            var r = len % 3;
            return r > 0 ? _num.slice(0, r) + "," + _num.slice(r, len).match(/\d{3}/g).join(",") : _num.slice(r, len).match(/\d{3}/g).join(",");
        }
        /** 界面切换 */
        private cutView(index: number): void {
            switch (index) {
                case 0:
                    this._viewUI.chongZhi_box.visible = true;
                    this._viewUI.teQuan_box.visible = false;
                    break;
                case 1:
                    RequesterProtocols._instance.c2s_CRequestVipInfo();
                    game.modules.reward.models.RewardProxy.getInstance().once(game.modules.reward.models.VIP_EVENT, this, this.setVipData);
                    break;
            }
        }
        /** vip信息加载 */
        public setVipData(): void {
            var vipInfo = game.modules.reward.models.RewardModel.getInstance().vipInfo;
            this.vipLevel = vipInfo.viplevel;
            this.levelNum = vipInfo.viplevel;
            this.vipExp = vipInfo.vipexp;
            this._viewUI.chongZhi_box.visible = false;
            this._viewUI.teQuan_box.visible = true;
            this.vipBox();
        }
        /** vip信息展示 */
        public vipBox(): void {
            var _vipInfoBinDic = ShopModel.getInstance().VipInfoBinDic;
            var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
            var skinArr: Array<any> = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
                "common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
                "common/ui/tongyong/jinkuang.png"];
            var _exp: number;
            if (this.levelNum == 11) {
                _exp = _vipInfoBinDic[this.levelNum].exp;
            } else {
                _exp = _vipInfoBinDic[this.levelNum + 1].exp;
            }

            this._viewUI.tq_lab.text = "贵" + this.levelNum + "特权奖励";
            this._viewUI.vaiType_lab1.text = "1 " + _vipInfoBinDic[this.levelNum].type1;
            this._viewUI.vaiType_lab2.text = "2 " + _vipInfoBinDic[this.levelNum].type2;
            this._viewUI.vaiType_lab3.text = "3 " + _vipInfoBinDic[this.levelNum].type3;
            if (_vipInfoBinDic[this.levelNum].type3 != "") {
                this._viewUI.vaiType_lab1.visible = true;
                this._viewUI.vaiType_lab2.visible = true;
                this._viewUI.vaiType_lab3.visible = true;
            } else if (_vipInfoBinDic[this.levelNum].type2 != "") {
                this._viewUI.vaiType_lab1.visible = true;
                this._viewUI.vaiType_lab2.visible = true;
                this._viewUI.vaiType_lab3.visible = false;
            } else {
                this._viewUI.vaiType_lab1.visible = true;
                this._viewUI.vaiType_lab2.visible = false;
                this._viewUI.vaiType_lab3.visible = false;
            }

            if (this.levelNum == 0) {
                this._viewUI.item_box.visible = false;
                this._viewUI.left_btn.visible = false;
                this._viewUI.right_btn.visible = true;
                this._viewUI.dj1_lab.text = "贵" + this.levelNum;
                this._viewUI.dj2_lab.visible = true;
                this._viewUI.dj2_lab.text = "贵" + (this.levelNum + 1);
            } else if (this.levelNum == 11) {
                this._viewUI.item_box.visible = true;
                this._viewUI.left_btn.visible = true;
                this._viewUI.right_btn.visible = false;
                this._viewUI.dj1_lab.text = "贵" + this.levelNum;
                this._viewUI.dj2_lab.visible = false;
                for (var i: number = 1; i <= 3; i++) {
                    var num_lab = this._viewUI.item_box.getChildByName("num_lab" + i) as Laya.Label;
                    var icon_img = this._viewUI.item_box.getChildByName("icon_img" + i) as Laya.Image;
                    var diban_img = this._viewUI.item_box.getChildByName("diban_img" + i) as Laya.Image;
                    if (_vipInfoBinDic[this.levelNum].itemcounts[i - 1] <= 1) {
                        num_lab.text = "";
                    } else {
                        num_lab.text = "X" + _vipInfoBinDic[this.levelNum].itemcounts[i - 1];
                    }
                    var _icon = _itemAttrBinDic[_vipInfoBinDic[this.levelNum].itemids[i - 1]].icon;
                    icon_img.skin = models.ShopModel.getInstance().getSrc(_icon);
                    diban_img.skin = skinArr[_itemAttrBinDic[_vipInfoBinDic[this.levelNum].itemids[i - 1]].nquality - 1];
                }
            } else {
                this._viewUI.item_box.visible = true;
                this._viewUI.left_btn.visible = true;
                this._viewUI.right_btn.visible = true;
                this._viewUI.dj1_lab.text = "贵" + this.levelNum;
                this._viewUI.dj2_lab.visible = true;
                this._viewUI.dj2_lab.text = "贵" + (this.levelNum + 1);
                for (var i: number = 1; i <= 3; i++) {
                    var num_lab = this._viewUI.item_box.getChildByName("num_lab" + i) as Laya.Label;
                    var icon_img = this._viewUI.item_box.getChildByName("icon_img" + i) as Laya.Image;
                    var diban_img = this._viewUI.item_box.getChildByName("diban_img" + i) as Laya.Image;
                    if (_vipInfoBinDic[this.levelNum].itemcounts[i - 1] <= 1) {
                        num_lab.text = "";
                    } else {
                        num_lab.text = "X" + _vipInfoBinDic[this.levelNum].itemcounts[i - 1];
                    }
                    var _icon = _itemAttrBinDic[_vipInfoBinDic[this.levelNum].itemids[i - 1]].icon;
                    icon_img.skin = models.ShopModel.getInstance().getSrc(_icon);
                    diban_img.skin = skinArr[_itemAttrBinDic[_vipInfoBinDic[this.levelNum].itemids[i - 1]].nquality - 1];
                }
            }
            if (this.levelNum < this.vipLevel) {
                this._viewUI.money_box.visible = true;
                this._viewUI.jinYan_img.visible = true;
                this._viewUI.jinYan_lab.text = _exp + "/" + _exp;
                this._viewUI.jinYan_lab.color = "#efdcdc";
                this._viewUI.jinYan_lab.align = "center";
                this._viewUI.num_lab.text = "还需要再充值: 0";
            } else if (this.levelNum == this.vipLevel && this.vipLevel == 11) {
                this._viewUI.money_box.visible = false;
                this._viewUI.jinYan_img.visible = false;
                this._viewUI.jinYan_lab.text = "累积充值数量: " + this.vipExp;
                this._viewUI.jinYan_lab.color = "#000000";
                this._viewUI.jinYan_lab.align = "left";
            } else {
                this._viewUI.money_box.visible = true;
                this._viewUI.jinYan_img.visible = true;
                this._viewUI.jinYan_lab.text = this.vipExp + "/" + _exp;
                this._viewUI.jinYan_lab.color = "#efdcdc";
                this._viewUI.jinYan_lab.align = "center";
                this._viewUI.num_lab.text = "还需要再充值: " + (_exp - this.vipExp);
            }
        }
        /** 物品信息弹窗 */
        public getTips(index: number): void {
            var _vipInfoBinDic = ShopModel.getInstance().VipInfoBinDic;
            var itemId = _vipInfoBinDic[this.levelNum].itemids[index];
            var parame: Dictionary = new Dictionary();
            parame.set("itemId", itemId);
            this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
        }
        /** 上一级vip信息查看 */
        public leftBtn(): void {
            if (this.levelNum - 1 < 0) return;
            this.levelNum -= 1;
            this.vipBox();
        }
        /** 下一级vip信息查看 */
        public rightBtn(): void {
            if (this.levelNum + 1 > 12) return;
            this.levelNum += 1;
            this.vipBox();
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