
module game.modules.family {
    export class FamilyLevelUpViewMediator extends game.modules.ModuleMediator {
        private _viewUI: ui.common.FamilyShengJiUI;//
        cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
        clanCFactionLobbyData = models.FamilyModel.getInstance().clanCFactionLobbyData;
        clanCFactionGoldBankData = models.FamilyModel.getInstance().clanCFactionGoldBankData;
        clanCFactionHotelData = models.FamilyModel.getInstance().clanCFactionHotelData;
        clanCFactionDrugStoreData = models.FamilyModel.getInstance().clanCFactionDrugStoreData;
        /**当前公会等级 */
        clanLevel = 0;
        /**公会建筑 */
        clanBuildArr = [];
        /**当前列表点击的按钮背景 */
        bgBtn: Laya.Box = null;
        /** 当前帮派的持有资金 */
        private currHaveMoney: number = 0;

        constructor(app: AppBase) {
            super();
            this.uiLayer = app.uiRoot.general;
            this._viewUI = new ui.common.FamilyShengJiUI();
            this._clientWidth = app.clientWidth;
            this._clientHeight = app.clientHeight;
            this._app = app;
            models.FamilyProxy._instance.on(models.SClanLevelup, this, this.showClanView);
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.CloseLevelUpView);
            this._viewUI.shengJi_btn.on(LEvent.MOUSE_DOWN, this, this.LevelUp);
            this.showClanView();
            var clanInfo = models.FamilyModel.getInstance().clanInfo;
            var house: Dictionary = clanInfo[0].house;
            this.showClanBiud(house);
            this.showBangGong();
        }

        /**初始化界面 */
        public showClanView() {
            this.showBangGong();
            var clanInfo = models.FamilyModel.getInstance().clanInfo;
            var house: Dictionary = clanInfo[0].house;
            var clanlevel = clanInfo[0].clanlevel;
            this.clanLevel = clanlevel;
            var clanBuildArr = [];
            var m_clanlevel = this.cstringResConfigData[1].msg + clanlevel;
            var buildImg = "common/ui/family/family_dating.png";
            var buildName = this.cstringResConfigData[11243].msg;
            clanBuildArr.push({ jianZhuLv_lab: m_clanlevel, jianZhuIcon_img: buildImg, jianZhuName_lab: buildName, type: clanHouse.BuildDating });
            var houseKeys = house.keys;
            for (var i = 0; i < houseKeys.length; i++) {
                var key = houseKeys[i];
                var clanBuildName = "";
                var clanBuildImg = "";
                var clanBuildLevel = this.cstringResConfigData[1].msg + house.get(key);
                var type = -1;
                if (key == clanHouse.BuildJinKu) {
                    clanBuildName = this.cstringResConfigData[11244].msg;
                    clanBuildImg = "common/ui/tongyong/family_jinku.png";
                    type = clanHouse.BuildJinKu;
                } else if (key == clanHouse.BuildYaoFang) {
                    clanBuildName = this.cstringResConfigData[11245].msg;
                    clanBuildImg = "common/ui/family/family_yaofang.png";
                    type = clanHouse.BuildYaoFang;
                } else if (key == clanHouse.BuildLvDian) {
                    clanBuildName = this.cstringResConfigData[11246].msg;
                    clanBuildImg = "common/ui/family/family_lvguan.png";
                    type = clanHouse.BuildLvDian;
                }
                clanBuildArr.push({ jianZhuLv_lab: clanBuildLevel, jianZhuIcon_img: clanBuildImg, jianZhuName_lab: clanBuildName, type: type });
            }
            this.clanBuildArr = clanBuildArr;
            SaleModel._instance.showList(this._viewUI.jianzhu_list, clanBuildArr);
            this._viewUI.jianzhu_list.selectHandler = new Handler(this, this.jianzhuSelect, [house]);
            this._viewUI.jianzhu_list.renderHandler = new Handler(this, this.jianzhuRender);
            this.jianzhuSelect(house, 0);


        }

        public jianzhuRender(cell: Box, index: number) {
            var select_btn = cell.getChildByName("select_btn") as Button;
            select_btn.on(LEvent.MOUSE_UP, this, this.onSelectBtn, [index, cell]);
        }

        public onSelectBtn(index, cell) {
            var select_btn = cell.getChildByName("select_btn") as Button;
            select_btn.selected = true;
            if (this.bgBtn == null) {
                this.bgBtn = cell;
                return;
            }
            if (this.bgBtn != cell) {
                var btnLeft: Button = this.bgBtn.getChildByName("select_btn") as Button;
                btnLeft.selected = false;
                this.bgBtn = cell;
            }
        }

        /**选择公会建筑 */
        public jianzhuSelect(house, index: number) {
            switch (index) {
                case 0:
                    this.showClanBiud(house);
                    break;
                case 1:
                    this.showJinKu(house);
                    break;
                case 2:
                    this.showYaofang(house);
                    break;
                case 3:
                    this.showLvGuan(house);
                    break;
            }
        }

        /**显示公会大厅 */
        public showClanBiud(house) {
            var clanInfo = models.FamilyModel.getInstance().clanInfo;
            var clanlevel = clanInfo[0].clanlevel;
            this._viewUI.familylv_lab.text = clanlevel + this.cstringResConfigData[3].msg + this.cstringResConfigData[11243].msg;
            this._viewUI.xiaoguo_label.innerHTML = this.cstringResConfigData[11239].msg;
            var othersum = this.clanCFactionLobbyData[clanlevel].othersum;
            var condition = this.cstringResConfigData[11238].msg;
            var m_condition = condition.replace("$parameter1$", othersum);
            this._viewUI.tiaoJian_lab.text = m_condition;
            this.DaTingLevelUpCost(house);
        }

        /**公会金库 */
        public showJinKu(house) {
            var jinKuLevel = house.get(clanHouse.BuildJinKu);
            this.buildDetail(jinKuLevel, 11244, 11247, 11240);
            this.JinKuLevelUpCost(house);
        }

        /**公会药房 */
        public showYaofang(house) {
            var yaofangLevel = house.get(clanHouse.BuildYaoFang);
            this.buildDetail(yaofangLevel, 11245, 11247, 11241);
            this.YaoFangLevelUpCost(house);
        }

        /**公会旅店 */
        public showLvGuan(house) {
            var lvdianLevel = house.get(clanHouse.BuildLvDian);
            this.buildDetail(lvdianLevel, 11246, 11247, 11242);
            this.lvGuanLevelUpCost(house);
        }

        /**公会详情 */
        public buildDetail(level, nameid, conditionid, xioaguoid) {
            this._viewUI.familylv_lab.text = level + this.cstringResConfigData[3].msg + this.cstringResConfigData[nameid].msg;
            this._viewUI.xiaoguo_label.innerHTML = this.cstringResConfigData[xioaguoid].msg;
            var condition = this.cstringResConfigData[conditionid].msg;
            var m_condition = condition.replace("$parameter1$", level + 1);
            this._viewUI.tiaoJian_lab.text = m_condition;
        }

        /**公会大厅显示消耗金钱 */
        public DaTingLevelUpCost(house) {
            var cost = this.clanCFactionLobbyData[this.clanLevel].levelupcost;
            this._viewUI.costXiaoHao_lab.text = cost.toLocaleString();
            var clanInfo = models.FamilyModel.getInstance().clanInfo;
            var zijin = clanInfo[0].costmax.get(clanHouse.BuildDating);
            this._viewUI.ziJin_lab.text = zijin.toLocaleString();
            this.showLevelUpbtn(zijin, this.currHaveMoney, clanHouse.BuildDating);
        }

        /**金库 */
        public JinKuLevelUpCost(house) {
            var cost = this.clanCFactionGoldBankData[house.get(clanHouse.BuildJinKu)].levelupcost;
            this._viewUI.costXiaoHao_lab.text = cost.toLocaleString();
            var clanInfo = models.FamilyModel.getInstance().clanInfo;
            var zijin = clanInfo[0].costmax.get(clanHouse.BuildJinKu);
            this._viewUI.ziJin_lab.text = zijin.toLocaleString();
            this.showLevelUpbtn(zijin, this.currHaveMoney, clanHouse.BuildJinKu);
        }

        /**药房 */
        public YaoFangLevelUpCost(house) {
            var cost = this.clanCFactionDrugStoreData[house.get(clanHouse.BuildYaoFang)].levelupcost;
            this._viewUI.costXiaoHao_lab.text = cost.toLocaleString();
            var clanInfo = models.FamilyModel.getInstance().clanInfo;
            var zijin = clanInfo[0].costmax.get(clanHouse.BuildYaoFang);
            this._viewUI.ziJin_lab.text = zijin.toLocaleString();
            this.showLevelUpbtn(zijin, this.currHaveMoney, clanHouse.BuildYaoFang);
        }

        /**旅馆 */
        public lvGuanLevelUpCost(house) {
            var cost = this.clanCFactionHotelData[house.get(clanHouse.BuildLvDian)].levelupcost;
            this._viewUI.costXiaoHao_lab.text = cost.toLocaleString();
            var clanInfo = models.FamilyModel.getInstance().clanInfo;
            var zijin = clanInfo[0].costmax.get(clanHouse.BuildLvDian);
            this._viewUI.ziJin_lab.text = zijin.toLocaleString();
            this.showLevelUpbtn(zijin, this.currHaveMoney, clanHouse.BuildLvDian);
        }

        /**公会升级按钮 */
        public showLevelUpbtn(levelUpZijin, haveZijin: number, houseType) {
            var buildLevel = 0;
            var clanInfo = models.FamilyModel.getInstance().clanInfo;
            var house = clanInfo[0].house;
            if (houseType == clanHouse.BuildJinKu) {
                buildLevel = house.get(clanHouse.BuildJinKu);
            } else if (houseType == clanHouse.BuildYaoFang) {
                buildLevel = house.get(clanHouse.BuildYaoFang);
            } else if (houseType == clanHouse.BuildLvDian) {
                buildLevel = house.get(clanHouse.BuildLvDian);
            }
            if (houseType == clanHouse.BuildDating) {
                if (levelUpZijin > haveZijin) {
                    this._viewUI.shengJi_btn.disabled = true;
                    this.labChange(true);
                } else {
                    this._viewUI.shengJi_btn.disabled = false;
                    this.labChange(false);
                }
            } else {
                if (buildLevel >= this.clanLevel) {
                    this._viewUI.shengJi_btn.disabled = true;
                } else {
                    if (levelUpZijin > haveZijin) {
                        this._viewUI.shengJi_btn.disabled = true;
                        this.labChange(true);
                    } else {
                        this._viewUI.shengJi_btn.disabled = false;
                        this.labChange(false);
                    }
                }
            }
        }

        /** 帮派持有资金文本变化
         * @param isBuZu 帮派持有资金是否不足
         */
        private labChange(isBuZu: boolean): void {
            if (isBuZu) {//是，文本变化
                this._viewUI.haveZiJin_lab.stroke = 4;
                this._viewUI.haveZiJin_lab.strokeColor = "#FF2800";
                this._viewUI.haveZiJin_lab.color = "#FFFFFF";
            }
            else {
                this._viewUI.haveZiJin_lab.stroke = 0;
                this._viewUI.haveZiJin_lab.strokeColor = "#13FF00";
                this._viewUI.haveZiJin_lab.color = "#13FF00";
            }
        }

        /**显示帮贡 */
        public showBangGong() {
            var clanInfo = models.FamilyModel.getInstance().clanInfo;
            this._viewUI.haveZiJin_lab.text = clanInfo[0].money.toLocaleString();
            this.currHaveMoney = clanInfo[0].money;
        }

        /**升级 */
        public LevelUp() {
            var clanInfo = models.FamilyModel.getInstance().clanInfo;
            var money = clanInfo[0].money;
            var ziJin_box = this._viewUI.ziJin_lab.text;
            var needFunds = parseInt(ziJin_box);
            if (money >= needFunds) {  //钱是否足够
                var index = this._viewUI.jianzhu_list.selectedIndex;
                if (index == -1) {
                    index = 0;
                }
                var id = this.clanBuildArr[index].type;
                this.CRequestClanLevelup(id);
            }
        }

        /**关闭升级界面 */
        public CloseLevelUpView() {
            this.hide();
            game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.CLOSEVIEW_EVENT);
            ModuleManager.show(ModuleNames.haveFamily, this._app);
        }

        /**升级 */
        public CRequestClanLevelup(id) {
            RequesterProtocols._instance.c2s_CRequestClanLevelup(id);

        }

        protected onShow(event: Object): void {
            this.show();
        }
        public show(): void {
            super.show();
            game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.OPEN_EVENT);
        }

        public hide(): void {
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }

    }
}