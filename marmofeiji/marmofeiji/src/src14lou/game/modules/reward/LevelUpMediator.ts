/**
* 升级礼包 
*/
module game.modules.reward {
    export class LevelUpMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.RewardLevelUpUI;
        private _tipsModule: game.modules.tips.tipsModule;
        /** 礼包数据 */
        public dataArr: Array<any> = [];
        constructor(uiLayer: Sprite) {
            super(uiLayer);
            this._viewUI = new ui.common.RewardLevelUpUI();
            this._viewUI.mouseThrough = true;
            this.isCenter = false;

            this._viewUI.LevelUpReward_list.renderHandler = new Handler(this, this.setData);
        }
        /** 升级礼包数据加载 */
        public init(itemId: number): void {
            var list = this._viewUI.LevelUpReward_list;
            list.repeatY = 1;
            list.hScrollBarSkin = "";
            var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
            var skinArr: Array<any> = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
                "common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
                "common/ui/tongyong/jinkuang.png"];

            var _shape = LoginModel.getInstance().roleDetail.shape;    //角色
            var _school = LoginModel.getInstance().roleDetail.school;  //职业
            var _level: number;   //等级
            if (HudModel.getInstance().levelNum != 0) {
                _level = HudModel.getInstance().levelNum;
            } else {
                _level = LoginModel.getInstance().roleDetail.level;
            }
            this.dataArr = RewardModel.getInstance().presentConfigBinDicAtDutyallow.get(_shape);
            for (var i: number = this.dataArr.length - 1; i >= 0; i--) {
                if (this.dataArr[i].careerallow != _school || this.dataArr[i].itemid < itemId || this.dataArr[i].itemid > 105009) {
                    this.dataArr.splice(i, 1);
                }
            }

            var data: Array<any> = [];
            for (var i: number = 0; i < this.dataArr.length; i++) {
                var _disabled: boolean = true;
                var _vipLevelName: string = _itemAttrBinDic[this.dataArr[i].itemid].name;
                if (this.dataArr[i].itemid == 105000) {
                    _vipLevelName = "1级大礼包";
                }
                if (i == 0 && _level >= _itemAttrBinDic[itemId].needLevel) {
                    _disabled = false;
                    RewardModel.getInstance().pointDic.set(5, 1);
                }
                data.push({
                    vipLevelName: { text: _vipLevelName },
                    get_btn: { disabled: _disabled }
                });
            }
            list.array = data;
        }
        /** 界面数据记载-及物品弹窗监听 */
        public setData(cell: Laya.Box, index: number): void {
            var list = this._viewUI.LevelUpReward_list;
            var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
            var skinArr: Array<any> = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
                "common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
                "common/ui/tongyong/jinkuang.png"];
            for (var j: number = 1; j <= 9; j++) {
                var icon_img = cell.getChildByName("icon_img" + j) as Laya.Image;
                var diban_img = cell.getChildByName("diban_img" + j) as Laya.Image;
                var getTips_btn = cell.getChildByName("levelTips_btn" + j) as Laya.Button;
                if (this.dataArr[index].itemids[j - 1] != undefined) {
                    icon_img.skin = this.getSrc(_itemAttrBinDic[this.dataArr[index].itemids[j - 1]].icon);
                    diban_img.skin = skinArr[_itemAttrBinDic[this.dataArr[index].itemids[j - 1]].nquality - 1];
                    getTips_btn.visible = true;
                } else {
                    icon_img.skin = "";
                    diban_img.skin = "";
                    getTips_btn.visible = false;
                }
            }
            var btn = cell.getChildByName("get_btn") as Laya.Button;
            btn.on(LEvent.MOUSE_DOWN, this, this.getReward);

            var getTips1 = cell.getChildByName("levelTips_btn1") as Laya.Button;
            var getTips2 = cell.getChildByName("levelTips_btn2") as Laya.Button;
            var getTips3 = cell.getChildByName("levelTips_btn3") as Laya.Button;
            var getTips4 = cell.getChildByName("levelTips_btn4") as Laya.Button;
            var getTips5 = cell.getChildByName("levelTips_btn5") as Laya.Button;
            var getTips6 = cell.getChildByName("levelTips_btn6") as Laya.Button;
            var getTips7 = cell.getChildByName("levelTips_btn7") as Laya.Button;
            var getTips8 = cell.getChildByName("levelTips_btn8") as Laya.Button;
            var getTips9 = cell.getChildByName("levelTips_btn9") as Laya.Button;
            getTips1.on(LEvent.MOUSE_DOWN, this, this.getTips, [0, index]);
            getTips2.on(LEvent.MOUSE_DOWN, this, this.getTips, [1, index]);
            getTips3.on(LEvent.MOUSE_DOWN, this, this.getTips, [2, index]);
            getTips4.on(LEvent.MOUSE_DOWN, this, this.getTips, [3, index]);
            getTips5.on(LEvent.MOUSE_DOWN, this, this.getTips, [4, index]);
            getTips6.on(LEvent.MOUSE_DOWN, this, this.getTips, [5, index]);
            getTips7.on(LEvent.MOUSE_DOWN, this, this.getTips, [6, index]);
            getTips8.on(LEvent.MOUSE_DOWN, this, this.getTips, [7, index]);
            getTips9.on(LEvent.MOUSE_DOWN, this, this.getTips, [8, index]);
        }
        /** 物品信息弹窗 */
        public getTips(num: number, index: number): void {
            var itemId = this.dataArr[index].itemids[num];
            var parame: Dictionary = new Dictionary();
            parame.set("itemId", itemId);
            this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
        }
        /** 奖励领取 */
        public getReward(): void {
            RequesterProtocols._instance.c2s_CAppend_Item(this.getBagItemKey(), 0, game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);
            RewardModel.getInstance().pointDic.set(5, 0);
            RewardProxy.getInstance().event(models.LEVELUP_EVENT);
            mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
            ModuleManager.hide(ModuleNames.REWARD);
        }
        /** 背包获取升级礼包物品id */
        public getBagItemKey(): number {
            var itemArr = game.modules.bag.models.BagModel.getInstance().getBagGameItemData(BagTypes.BAG).items;
            if (itemArr.length <= 0) return 0;
            for (var i: number = 0; i < itemArr.length; i++) {
                var id = itemArr[i].id;
                if (id >= 105000 && id <= 105009) {
                    return itemArr[i].key;
                }
            }
            return 0;

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
        }
        public hide(): void {
            super.hide();
        }
        public getView(): Sprite {
            return this._viewUI;
        }
    }
}