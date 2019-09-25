/**
* 七日签到 
*/
module game.modules.reward {
    enum type {
        CAREER = 0, //职业
        ITEMID = 1,	//物品ID
        DIBAN = 0,  //底板
        ICON = 1,   //图标
    }
    export class SevenDayMediator extends game.modules.UiMediator {
        private _tipsModule: game.modules.tips.tipsModule;
        private _viewUI: ui.common.RewardSevenDayUI;
        private _petTips: game.modules.commonUI.PetMessageMediator;
        constructor(uiLayer: Sprite) {
            super(uiLayer);
            this._viewUI = new ui.common.RewardSevenDayUI();
            this._viewUI.mouseThrough = true;
            this.isCenter = false;
            this._viewUI.SigninSevenReward_list.renderHandler = new Handler(this, this.signinSevenLoad);
        }
        /** 七日签到数据加载 */
        private init(): void {
            var list = this._viewUI.SigninSevenReward_list;
            var _mulDayLogin = RewardModel.getInstance().mulDayLogin;
            var _shape = LoginModel.getInstance().roleDetail.shape - 1;    //角色
            var _school = LoginModel.getInstance().roleDetail.school;      //职业
            var _loginawardBinDic = RewardModel.getInstance().loginawardBinDic;

            list.repeatX = 1;
            list.vScrollBarSkin = "";

            var data: Array<any> = [];
            for (var i: number = 1; i <= 7; i++) {
                var haveImgVisible: boolean = false;
                var getRewardBtnVisible: boolean = true;
                var getRewardBtnDisabled: boolean = false;
                if (i <= _mulDayLogin.logindays && _mulDayLogin.rewardmap.get(i) != 0) {
                    haveImgVisible = true;
                    getRewardBtnVisible = false;
                }
                if (i > _mulDayLogin.logindays) {
                    getRewardBtnDisabled = true;
                }
                for (var j: number = 1; j <= 3; j++) {
                    var num_lab = list.getCell(i - 1).getChildByName("num_lab" + j) as Laya.Label;
                    var icon_img = list.getCell(i - 1).getChildByName("icon_img" + j) as Laya.Image;
                    var diban_img = list.getCell(i - 1).getChildByName("diban_img" + j) as Laya.Image;

                    var _petId = this.getPetId(j, _shape, _loginawardBinDic[i]);
                    var items = this.getItems(j, _shape, _loginawardBinDic[i]);
                    var _itemId = this.getItemId(_school, items);

                    diban_img.skin = this.getSkin(_itemId, _petId)[type.DIBAN];
                    num_lab.text = this.getNum(j, _shape, _loginawardBinDic[i]);
                    icon_img.skin = this.getSkin(_itemId, _petId)[type.ICON];
                }
                data.push({
                    sevenDay_lab: { skin: "common/ui/reward/di" + i + "tian.png" },
                    have_img: { visible: haveImgVisible },
                    getReward_btn: { visible: getRewardBtnVisible, disabled: getRewardBtnDisabled }
                });
            }
            list.array = data;
        }
        /** 获取底板品质类型 */
        public getSkin(_itemId: number, _petId: number): Array<string> {
            var _petAttrBinDic = PetModel.getInstance().petCPetAttrData;
            var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
            var _npcShapeBinDic = LoginModel.getInstance().cnpcShapeInfo;
            var skinArr: Array<any> = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
                "common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
                "common/ui/tongyong/jinkuang.png"];
            var diban: string;
            var icon: string;
            if (_itemId != undefined && _itemId != 0) {
                diban = skinArr[_itemAttrBinDic[_itemId].nquality - 1];
                icon = this.getSrc(_itemAttrBinDic[_itemId].icon);
            } else if (_petId != undefined && _petId != 0) {
                diban = skinArr[_petAttrBinDic[_petId].quality - 1];
                icon = this.getSrc(_npcShapeBinDic[_petAttrBinDic[_petId].modelid].littleheadID);
            } else {
                diban = "";
                icon = "";
            }
            return [diban, icon];
        }
        /** 获取物品数量 */
        public getNum(index: number, shape: number, _loginawardBinDic: any): string {
            var num: number;
            switch (index) {
                case 1:
                    num = _loginawardBinDic.item1num[shape];
                    break;
                case 2:
                    num = _loginawardBinDic.item2num[shape];
                    break;
                case 3:
                    num = _loginawardBinDic.item3num[shape];
                    break;
            }
            if (num > 1) {
                return "X" + num;
            }
            return "";
        }
        /** 获取宠物id */
        public getPetId(index: number, shape: number, _loginawardBinDic: any): number {
            var petId: number;
            switch (index) {
                case 1:
                    petId = _loginawardBinDic.pet1id[shape];
                    break;
                case 2:
                    petId = _loginawardBinDic.pet2id[shape];
                    break;
                case 3:
                    petId = _loginawardBinDic.pet3id[shape];
                    break;
            }
            return petId;
        }
        /** 获取物品集合 */
        public getItems(index: number, shape: number, _loginawardBinDic: any): string {
            var items: string;
            switch (index) {
                case 1:
                    items = _loginawardBinDic.item1id[shape];
                    break;
                case 2:
                    items = _loginawardBinDic.item2id[shape];
                    break;
                case 3:
                    items = _loginawardBinDic.item3id[shape];
                    break;
            }
            return items;
        }
        /** 获取物品id */
        public getItemId(career: number, idStr: string): number {
            var ids: Array<string> = idStr.split(";");
            if (ids.length > 1) {
                for (var i: number = 0; i < ids.length; i++) {
                    if (ids[i].split(",")[type.CAREER] === (career + "")) {
                        return parseInt(ids[i].split(",")[type.ITEMID]);
                    }
                }
            } else {
                return parseInt(ids[type.CAREER].split(",")[type.ITEMID]);
            }
        }
        /** 物品操作监听-物品弹窗或奖励领取 */
        public signinSevenLoad(cell: Box, index: number) {
            var getReward: Laya.Button = cell.getChildByName("getReward_btn") as Laya.Button;
            getReward.on(LEvent.MOUSE_DOWN, this, this.getReward, [cell, index]);

            var getTips1: Laya.Button = cell.getChildByName("sevenDay_btn1") as Laya.Button;
            var getTips2: Laya.Button = cell.getChildByName("sevenDay_btn2") as Laya.Button;
            var getTips3: Laya.Button = cell.getChildByName("sevenDay_btn3") as Laya.Button;
            getTips1.on(LEvent.MOUSE_DOWN, this, this.getTips, [cell, 1, index + 1]);
            getTips2.on(LEvent.MOUSE_DOWN, this, this.getTips, [cell, 2, index + 1]);
            getTips3.on(LEvent.MOUSE_DOWN, this, this.getTips, [cell, 3, index + 1]);
        }
        /** 领取奖励 */
        public getReward(cell: Box, index: number): void {
            var logindays = RewardModel.getInstance().mulDayLogin.logindays;
            if (logindays <= index) return;
            RequesterProtocols._instance.c2s_CGetMulDayLogin_Gift(index + 1);
            RewardProxy.getInstance().once(models.MULDAY_EVENT, this, () => {
                this.init();
            });
        }
        /** 物品信息弹窗 */
        public getTips(cell: Box, num: number, index: number): void {
            var _shape = LoginModel.getInstance().roleDetail.shape - 1;    //角色
            var _school = LoginModel.getInstance().roleDetail.school;      //职业
            var _loginawardBinDic = RewardModel.getInstance().loginawardBinDic;

            var _petId = this.getPetId(num, _shape, _loginawardBinDic[index]);
            var items = this.getItems(num, _shape, _loginawardBinDic[index]);
            var _itemId = this.getItemId(_school, items);

            if (_itemId != undefined && _itemId != 0) {
                var parame: Dictionary = new Dictionary();
                parame.set("itemId", _itemId);
                this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
            } else if (_petId != undefined && _petId != 0) {
                this._petTips = new game.modules.commonUI.PetMessageMediator(_petId, this._app);
                ModuleManager.hide(ModuleNames.REWARD);
                this._petTips.show();
                this._petTips.once(commonUI.CLOSE_PET_TIPS, this, this.jumpToReward);
            } else {
                var btn: Laya.Button = cell.getChildByName("sevenDay_btn" + num) as Laya.Button;
                btn.visible = false;
            }
        }
        /** 宠物信息弹窗关闭后跳转会七日签到模块 */
        public jumpToReward(): void {
            this._petTips.off(commonUI.CLOSE_PET_TIPS, this, this.jumpToReward);
            ModuleManager.jumpPage(ModuleNames.REWARD, rewardBtnType.SEVENDAY, this._app);
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