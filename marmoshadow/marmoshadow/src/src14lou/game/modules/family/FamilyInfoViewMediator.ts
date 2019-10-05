
module game.modules.family {
    /** 帮派信息界面 */
    export class FamilyInfoViewMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.FamilyInfoUI;
        public _FamilyChangeAimViewMediator: FamilyChangeAimViewMediator;
        public _FamilyChangeClanNameViewMediator: FamilyChangeClanNameViewMediator;
        public _FamilyLevelUpViewMediator: FamilyLevelUpViewMediator;
        public FamilyMemberViewMediator: FamilyMemberViewMediator;
        private DisappearMessageTipsMediator: game.modules.commonUI.DisappearMessageTipsMediator;
        /**职业配置表 */
        schoolInfo = LoginModel.getInstance().schoolInfo;
        /**权限表 */
        clanCFactionPositionData = models.FamilyModel.getInstance().clanCFactionPositionData;
        /**公会宗旨 */
        currentClanAim = "";
        /** 在线成员的信息数据 */
        private _onlineMemberInfoData: Array<models.ClanMemberVo>;
        /** 本人角色id */
        private _selfRoleId = LoginModel.getInstance().roleDetail.roleid;
        /** 被选中的成员按钮 */
        private selectedMemberBtn: Laya.Button;
        /** 鼠标点击时，当前x位置 */
        private _xPos: number;
        /** 鼠标点击时，当前y位置 */
        private _yPos: number;

        constructor(uiLayer: Sprite, app: AppBase) {
            super(uiLayer);
            this._app = app;
            this._viewUI = new ui.common.FamilyInfoUI();
            this.isCenter = false;

            this._viewUI.familyTiShi_box.visible = false;
            this._viewUI.familyInfoBtn_tab.selectHandler = new Handler(this, this.showClan);
            /**修改宗旨 */
            this._viewUI.modifyZongZhi_btn.on(LEvent.MOUSE_DOWN, this, this.ChangeAim);
            /**修改名称 */
            this._viewUI.familyTiShi_btn.on(LEvent.MOUSE_DOWN, this, this.ChangeClanName);
            /**帮派升级 */
            this._viewUI.clanShengji_btn.on(LEvent.MOUSE_DOWN, this, this.clanLevelUp);
            /**帮派领地 */
            this._viewUI.familylingdi_btn.on(LEvent.MOUSE_DOWN, this, this.goFamilyMap);
            models.FamilyProxy._instance.on(models.SOpenClan, this, this.flushClanInfo);
            models.FamilyProxy._instance.on(models.SChangeClanAim, this, this.flushClanAim);
            /**修改名称返回  */
            models.FamilyProxy._instance.on(models.SChangeClanName, this, this.flushClanName);
            models.FamilyProxy._instance.on(models.SClanLevelup, this, this.flushData);

            this._viewUI.ziJinTips_btn.on(LEvent.MOUSE_DOWN, this, this.ziJinTips);
        }

        /**刷新数据 */
        public flushData() {
            this._viewUI.familyInfoBtn_tab.selectedIndex = 0;
            this.showClan(0);
        }

        public showClan(index: number) {
            this._viewUI.familyInfo_view.selectedIndex = index;
            switch (index) {
                case 0:
                    this.showClanInfo();
                    break;
                case 1:
                    this.ClanManager();
                    break;
            }

        }

        /**刷新公会信息 */
        public flushClanInfo() {
            this.showClanInfo();
            this.showClanMember();
        }

        /**
         * 帮派信息
         */
        public showClanInfo() {
            var clanInfo = models.FamilyModel.getInstance().clanInfo;
            var clanname = clanInfo[0].clanname;  //名称
            var clanid = clanInfo[0].clanid;  //id
            var clanlevel = clanInfo[0].clanlevel;  //等级
            var membersnum = clanInfo[0].membersnum;  //成员数量
            var clanmaster = clanInfo[0].clanmaster;  //现任会长
            var clanaim = clanInfo[0].clanaim;  //宗旨
            this.currentClanAim = clanaim;
            this._viewUI.familyName_lab.text = clanname;
            this._viewUI.familyId_lab.text = clanid;
            this._viewUI.familyLv_lab.text = clanlevel;
            this._viewUI.familyNumber_lab.text = membersnum + "/100";
            this._viewUI.familyBangZhu_lab.text = clanmaster;
            this._viewUI.familyZongZhi_lab.text = clanaim;
        }

        /**
         * 帮派管理
         */
        public ClanManager() {
            var clanInfo = models.FamilyModel.getInstance().clanInfo;
            var house: Dictionary = clanInfo[0].house; //公会的建筑
            var houseKeys = house.keys;
            var money = clanInfo[0].money; //公会的钱
            var costeverymoney = clanInfo[0].costeverymoney;  //公会每天花费的钱
            var jinkuLevel = 0;  //金库等级
            var yaofangLevel = 0;  //药房等级
            var lvguanLevel = 0;  //旅店等级
            for (var i = 0; i < houseKeys.length; i++) {
                var houseId = houseKeys[i];
                var level = house.get(houseId);
                if (houseId == 2) {  //公会金库
                    jinkuLevel = level;
                } else if (houseId == 3) {  //公会药房
                    yaofangLevel = level;
                } else if (houseId == 4) {  //公会旅馆
                    lvguanLevel = level;
                }
            }
            this._viewUI.lvJinKu_lab.text = jinkuLevel + "";
            this._viewUI.lvYaoFang_lab.text = yaofangLevel + "";
            this._viewUI.lvLvguan_lab.text = lvguanLevel + "";
            this._viewUI.familyZiJin_lab.text = money.toLocaleString();
            this._viewUI.costWeiHu_lab.text = costeverymoney.toLocaleString() + "/天";
        }

        public ziJinTips(): void {
            var clanInfo = models.FamilyModel.getInstance().clanInfo;
            //公会的建筑
            var house: Dictionary = clanInfo[0].house;
            var houseKeys = house.keys;
            //金库等级
            var jinkuLevel = 0;
            for (var i = 0; i < houseKeys.length; i++) {
                if (houseKeys[i] == 2) {  //公会金库
                    jinkuLevel = house.get(houseKeys[i]);
                }
            }
            var param: Array<any> = [];
            param.push((10000000 + jinkuLevel * 15000000) / 10000);
            let promoto = HudModel.getInstance().promptAssembleBack(PromptExplain.BANGPAI_ZIJIN_UP, param);
            this.DisappearMessageTipsMediator = new modules.commonUI.DisappearMessageTipsMediator(this._app);
            this.DisappearMessageTipsMediator.onShow(promoto);
        }

        /**
         * 显示公会成员
         */
        public showClanMember() {
            var clanInfo = models.FamilyModel.getInstance().clanInfo;
            var memberlist = clanInfo[0].memberlist;
            var member = [];
            this._onlineMemberInfoData = [];
            let _tempDic = new Laya.Dictionary();
            for (var i = 0; i < memberlist.length; i++) {
                let memberinfo: models.ClanMemberVo = memberlist[i];
                if (memberinfo.roleid == this._selfRoleId) {
                    family.models.FamilyModel.getInstance()._selfInClanInfo = memberinfo;
                }
                if (memberinfo.lastonlinetime == 0) {
                    _tempDic.set(memberinfo.roleid, memberinfo);
                    this._onlineMemberInfoData.push(memberinfo);
                    var rolename = memberinfo.rolename;  //名称
                    var rolelevel = memberinfo.rolelevel;  //等级
                    var school = memberinfo.school;  //职业
                    var m_school = this.schoolInfo[school].name;
                    var position = memberinfo.position;  //职位
                    var m_position = this.clanCFactionPositionData[position].posname;
                    member.push({ lName_lab: rolename, lLv_lab: rolelevel, lZhiWu_lab: m_position, lZhiYe_lab: m_school });
                }
            }
            models.FamilyModel.getInstance().menmbersInfoDic = _tempDic;
            this.selectedMemberBtn = undefined;
            SaleModel._instance.showList(this._viewUI.online_list, member);
            this._viewUI.online_list.renderHandler = new Laya.Handler(this, this.onlineLstRender);
            this._viewUI.online_list.selectHandler = new Laya.Handler(this, this.onlineLstSelect);
            this._viewUI.numberZaiXian_lab.text = member.length.toString();
        }

        /** 在线成员列表的点击 */
        private onlineLstSelect(index: number): void {
            let remenber_btn: Laya.Button = this._viewUI.online_list.getCell(index).getChildByName("remenber_btn") as Laya.Button;
            remenber_btn.skin = "common/ui/tongyong/common_list_3textbg_dwn.png";
            this.selectedMemberBtn = remenber_btn;
        }

        /** 在线成员列表的渲染 */
        private onlineLstRender(cell: Box, index: number): void {
            let memberinfo: models.ClanMemberVo = this._onlineMemberInfoData[index];
            let lName_lab: Laya.Label = cell.getChildByName("lName_lab") as Laya.Label;
            let lLv_lab: Laya.Label = cell.getChildByName("lLv_lab") as Laya.Label;
            let lZhiWu_lab: Laya.Label = cell.getChildByName("lZhiWu_lab") as Laya.Label;
            let lZhiYe_lab: Laya.Label = cell.getChildByName("lZhiYe_lab") as Laya.Label;
            if (memberinfo.roleid == this._selfRoleId) {
                lName_lab.color = "#13ff00";
                lLv_lab.color = "#13ff00";
                lZhiWu_lab.color = "#13ff00";
                lZhiYe_lab.color = "#13ff00";
            }
            else {
                lName_lab.color = "#50321A";
                lLv_lab.color = "#50321A";
                lZhiWu_lab.color = "#50321A";
                lZhiYe_lab.color = "#50321A";
            }
            let remenber_btn: Laya.Button = cell.getChildByName("remenber_btn") as Laya.Button;
            if (index % 2 == 0) {
                remenber_btn.skin = "common/ui/tongyong/common_list_3textbg2.png";
            }
            else {
                remenber_btn.skin = "common/ui/tongyong/common_list_3textbg.png";
            }
            if (this.selectedMemberBtn && this.selectedMemberBtn == remenber_btn) {
                remenber_btn.skin = "common/ui/tongyong/common_list_3textbg_dwn.png";
            }
            remenber_btn.on(Laya.Event.CLICK, this, this.getMousePos, [index]);
        }

        /** 获取当前鼠标点击位置 */
        private getMousePos(index: number, e): void {
            if (e) {
                this._xPos = e.currentTarget.mouseX;
                this._yPos = e.currentTarget.mouseY;
            }
            let memberinfo: models.ClanMemberVo = this._onlineMemberInfoData[index];
            if (memberinfo.roleid != this._selfRoleId) {
                let _FamilyContactCharacterViewMediator = new FamilyContactCharacterViewMediator(this._viewUI, this._app, index, this._xPos, this._yPos);
            }
        }

        /**
         * 修改宗旨
         */
        public ChangeAim() {
            var clanInfo = models.FamilyModel.getInstance().clanInfo;
            var roleId = LoginModel.getInstance().roleDetail.roleid;
            var position = models.FamilyModel.getInstance().RefreshPosition.get(roleId);
            var changeidea = this.clanCFactionPositionData[position].changeidea;
            if (changeidea == ClanPermissions.OK) {
                this._FamilyChangeAimViewMediator = new FamilyChangeAimViewMediator(this._viewUI, this._app);
                this._FamilyChangeAimViewMediator.show();
                this._FamilyChangeAimViewMediator.changeClanAim(this.currentClanAim);
            }
            else {
                var _tipsMsg = ChatModel.getInstance().chatMessageTips[150127]["msg"];
                this.showTipsMsg(_tipsMsg);
            }
        }

        /**
         * 新的宗旨
         */
        public flushClanAim(newAim) {
            this.currentClanAim = newAim;
            this._viewUI.familyZongZhi_lab.text = newAim;
        }

        /**
         * 修改名称
         */
        public ChangeClanName() {
            this._viewUI.familyTiShi_box.visible = true;
            var clanInfo = models.FamilyModel.getInstance().clanInfo;
            var clancreator = clanInfo[0].clancreator;
            var clancreatorid = clanInfo[0].clancreatorid;
            var oldclanname = clanInfo[0].oldclanname;
            var clanname = clanInfo[0].clanname;

            this._viewUI.createRole_lab.text = clancreator;
            this._viewUI.createId_lab.text = clancreatorid;
            this._viewUI.familyOldName_lab.text = oldclanname;
            this._viewUI.bg_img.on(LEvent.MOUSE_DOWN, this, this.onBgImg);
            this._viewUI.changeClanName_btn.on(LEvent.MOUSE_DOWN, this, this.onChangeName, [clanname]);
        }

        public onChangeName(clanname) {
            this.onBgImg();
            var clanInfo = models.FamilyModel.getInstance().clanInfo;
            var roleId = LoginModel.getInstance().roleDetail.roleid;
            var position = models.FamilyModel.getInstance().RefreshPosition.get(roleId);
            var changefactionname = this.clanCFactionPositionData[position].changefactionname;
            if (changefactionname == ClanPermissions.OK) {
                this._FamilyChangeClanNameViewMediator = new FamilyChangeClanNameViewMediator(this._viewUI, this._app);
                this._FamilyChangeClanNameViewMediator.show();
                this._FamilyChangeClanNameViewMediator.showChangeNameCost(clanname);
            }
            else {
                var _tipsMsg = ChatModel.getInstance().chatMessageTips[150127]["msg"];
                this.showTipsMsg(_tipsMsg);
            }
        }
        /** 显示飘窗提示信息消息 */
        private showTipsMsg(msg: any): void {
            var _disapperTipsMsg = new commonUI.DisappearMessageTipsMediator(this._app);
            _disapperTipsMsg.onShow(msg);
        }

        public flushClanName(newName) {
            this._viewUI.familyName_lab.text = newName;

        }

        public onBgImg() {
            this._viewUI.familyTiShi_box.visible = false;
        }


        /**
         * 帮派升级
         */
        public clanLevelUp() {
            models.FamilyProxy._instance.event(models.CloseModule);
            this._FamilyLevelUpViewMediator = new FamilyLevelUpViewMediator(this._app);
            this._FamilyLevelUpViewMediator.show();
        }

        /**公会地图 */
        public goFamilyMap() {
            // game.modules.mainhud.models.HudModel._instance.jumpmap(1711)
            game.modules.mainhud.models.HudModel._instance.useapp = this._app
            game.modules.mainhud.models.HudModel._instance.getpost(1711);
            let mainUnit: Unit = this._app.sceneObjectMgr.mainUnit;
            RequesterProtocols._instance.c2s_CEnterClanMap()
            // RequesterProtocols._instance.c2s_req_goto(1711, parseInt(mainUnit.pos.x.toFixed(0)), parseInt(mainUnit.pos.y.toFixed(0)));
            ModuleManager.hide(ModuleNames.haveFamily);
        }

        /**显示红点 */
        public showRedDot() {
            this.FamilyMemberViewMediator = new FamilyMemberViewMediator(this._viewUI, this._app);
            this.FamilyMemberViewMediator.CRequestApplyList();
        }

        /*************************************************************************************** */

        /**
         * 公会信息请求
         */
        public COpenClan() {
            RequesterProtocols._instance.c2s_COpenClan();
        }

        public show() {
            this.COpenClan();
            this.showRedDot();
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