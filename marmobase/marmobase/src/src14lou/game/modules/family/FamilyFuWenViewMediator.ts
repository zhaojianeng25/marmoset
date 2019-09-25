
module game.modules.family {
    /** 帮派符文 */
    export class FamilyFuWenViewMediator extends game.modules.ModuleMediator {
        private _viewUI: ui.common.FamilyFuWenUI;//ui.common.CreateRoleUI;
        private DisappearMessageTipsMediator: game.modules.commonUI.DisappearMessageTipsMediator;
        /**g公会符文配置 */
        clanCRuneSetData = models.FamilyModel.getInstance().clanCRuneSetData;
        /**客户端信息提示表 */
        chatMessageTips = game.modules.chat.models.ChatModel._instance.chatMessageTips;
        /**程序内字符串表 */
        cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
        /**职业配置表 */
        schoolInfo = LoginModel.getInstance().schoolInfo;
        /**权限表 */
        clanCFactionPositionData = models.FamilyModel.getInstance().clanCFactionPositionData;
        /**
         * 杂货等表的复合表
         */
        itemAttrData = BagModel.getInstance().itemAttrData;

        selectRequestRuneArr = [];

        constructor(app: AppBase) {
            super();
            this.uiLayer = app.uiRoot.general;
            this._viewUI = new ui.common.FamilyFuWenUI();
            this._clientWidth = app.clientWidth;
            this._clientHeight = app.clientHeight;
            this._app = app;
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.closeThisView);
            this._viewUI.btn_tab.selectHandler = new Handler(this, this.btnTabSelect);
            this._viewUI.requrstRune_btn.on(LEvent.MOUSE_DOWN, this, this.requestRuneInfo);
            this.CRequestRuneInfo();
            models.FamilyProxy._instance.on(models.SRequestRuneInfo, this, this.showRequestMsg);
            models.FamilyProxy._instance.on(models.SRuneRequestView, this, this.requestMsg);
            models.FamilyProxy._instance.on(models.SRequestRuneCount, this, this.fuwenTongji);
        }

        public btnTabSelect(index: number) {
            this._viewUI.detail_vstack.selectedIndex = index;
            switch (index) {
                case 0:
                    this.CRequestRuneInfo();
                    break;
                case 1:
                    this.CRuneRequestView();
                    break;
                case 2:
                    this.CRequestRuneCount();
                    break;
            }

        }
        public runeinfolist: Array<any> = [];

        /**请求信息 */
        public showRequestMsg(requestRuneInfo) {
            this.runeinfolist = requestRuneInfo.get("runeinfolist");
            var enlimitNum = game.modules.mainhud.models.HudModel._instance.enlimitNum;  //活力上限
            if (enlimitNum <= 0) {
                enlimitNum = game.modules.createrole.models.LoginModel.getInstance().roleDetail.enlimit;
            }
            var energyNum = game.modules.mainhud.models.HudModel._instance.energyNum;  //当前活力
            if (energyNum <= 0) {
                energyNum = game.modules.createrole.models.LoginModel.getInstance().roleDetail.energy;
            }
            this._viewUI.numberHuoLi_lab.text = energyNum + "/" + enlimitNum;
            if (this.runeinfolist.length <= 0) {
                this._viewUI.requestFuWen_list.visible = false;
                this._viewUI.noInfo_box.visible = true;
            } else {
                this._viewUI.requestFuWen_list.visible = true;
                this._viewUI.noInfo_box.visible = false;
                var runeinfoArr = [];
                var selfRoleId = game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid
                for (var i = 0; i < this.runeinfolist.length; i++) {
                    //actiontype为1时表示该请求已被捐赠
                    var itemid = this.runeinfolist[i].itemid;
                    var icon = this.itemAttrData[itemid].icon;
                    var m_icon = SaleModel._instance.getIcon(icon);
                    var itemname = this.itemAttrData[itemid]["name"] + "[" + this.clanCRuneSetData[itemid]["name"] + "]";
                    //var desc = this.clanCRuneSetData[itemid].desc;
                    var m_requestDesc = "";
                    if (this.runeinfolist[i].actiontype == 0) {
                        var role = "你";
                        if (selfRoleId != this.runeinfolist[i].roleid) {
                            role = this.runeinfolist[i].rolename;
                        }
                        var requestDesc = this.chatMessageTips[PromptExplain.DONATION_REQUEST].msg;
                        m_requestDesc = requestDesc.replace("$parameter1$", role).replace("$parameter2$", itemname);
                    } else {
                        var role = "你";
                        if (selfRoleId != this.runeinfolist[i].targetroleid) {
                            role = this.runeinfolist[i].targetrolename;
                        }
                        var role2 = "你";
                        if (selfRoleId != this.runeinfolist[i].roleid) {
                            role2 = this.runeinfolist[i].rolename;
                        }
                        var requestDesc = this.chatMessageTips[PromptExplain.DONATION_RESPOND].msg;
                        m_requestDesc = requestDesc.replace("$parameter1$", role).replace("$parameter2$", itemname).replace("$parameter3$", role2);
                    }

                    var requesttime = this.runeinfolist[i].requesttime; //时间
                    var time = Math.ceil(requesttime / (1000 * 60));
                    var m_requesttime = this.cstringResConfigData[11554].msg.replace("$parameter1$", time);

                    runeinfoArr.push({ requestIcon_img: m_icon, requestDesc: m_requestDesc, requestTime_lab: m_requesttime });
                }
                SaleModel._instance.showList(this._viewUI.requestFuWen_list, runeinfoArr);
                this._viewUI.requestFuWen_list.renderHandler = new Handler(this, this.requestFuWenListRender, [runeinfoArr]);
            }

        }
        /** 显示请求文本，并设置是否显示捐赠按钮 */
        public requestFuWenListRender(runeinfoArr, cell: Box, index: number) {
            var requestJuanZeng_btn = cell.getChildByName("requestJuanZeng_btn") as Button;
            if (this.runeinfolist[index].actiontype != 1 && this.runeinfolist[index].roleid != game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid) {
                requestJuanZeng_btn.visible = true;
                // var itemArr = game.modules.bag.models.BagModel.getInstance().getBagGameItemData(BagTypes.BAG).items;
                // if (itemArr.length > 0) {
                //     for (var i: number = 0; i < itemArr.length; i++) {
                //         var id = itemArr[i].id;
                //         if (itemArr[i].id == this.runeinfolist[index].itemid) {
                //             requestJuanZeng_btn.disabled = false;
                //         } else {
                //             requestJuanZeng_btn.disabled = true;
                //         }
                //     }
                // } else {
                //     requestJuanZeng_btn.disabled = true;
                // }
                requestJuanZeng_btn.on(LEvent.CLICK, this, this.juanZhen, [this.runeinfolist[index].roleid, this.runeinfolist[index].itemid]);
            } else {
                requestJuanZeng_btn.visible = false;
            }
            var requestDesc = cell.getChildByName("requestDesc") as Laya.HTMLDivElement;
            requestDesc.innerHTML = runeinfoArr[index].requestDesc;
        }
        /** 点击捐赠 */
        public juanZhen(roleid: number, itemid: number) {
            let _familyFuWenJZMediator = new FamilyFuWenJZMediator(this._app);
            _familyFuWenJZMediator.init(roleid, itemid);
        }

        /** 发起请求 */
        public requestMsg() {
            var fuWenArr = [];
            this.selectRequestRuneArr = [];
            for (let i in this.clanCRuneSetData) {
                let _ClanCRuneSetBase: ClanCRuneSetBaseVo = this.clanCRuneSetData[i];
                var id = _ClanCRuneSetBase.id;
                var name = this.itemAttrData[id]["name"];
                let name1 = this.clanCRuneSetData[id]["name"];
                fuWenArr.push({ id: id, name: name + "[" + name1 + "]", desc: _ClanCRuneSetBase.desc });

            }
            SaleModel._instance.showList(this._viewUI.fuwen_list, fuWenArr);
            var runerequestinfolist = models.FamilyModel.getInstance().runerequestinfolist.get("runerequestinfolist");
            var requestnum = models.FamilyModel.getInstance().runerequestinfolist.get("requestnum");
            this._viewUI.shengYu_lab.text = 50 - requestnum + "";
            this._viewUI.fuwen_list.renderHandler = new Handler(this, this.fuwenRender, [fuWenArr, runerequestinfolist]);

        }

        /**符文列表渲染 */
        public fuwenRender(fuWenArr, runerequestinfolist, cell: Box, index: number) {
            var fuWenIcon = cell.getChildByName("fuWenIcon_img") as Laya.Image;
            var icon = this.itemAttrData[fuWenArr[index].id].icon;
            var m_icon = SaleModel._instance.getIcon(icon);
            var fuwenName = cell.getChildByName("fuwenName_label") as Label;
            fuwenName.text = fuWenArr[index].name;
            fuWenIcon.skin = m_icon;
            var isRequest = cell.getChildByName("isRequest_img") as Laya.Image;
            isRequest.visible = false;
            var RuneCheck = cell.getChildByName("fuWenCheck_btn") as Laya.CheckBox;
            if (runerequestinfolist.length > 0) {
                for (var i = 0; i < runerequestinfolist.length; i++) {
                    if (fuWenArr[index].id == runerequestinfolist[i].itemid) {
                        isRequest.visible = true;
                    }
                }
            }
            if (isRequest.visible) {
                RuneCheck.off(LEvent.CLICK, this, this.RuneCheckSelect);
                RuneCheck.on(LEvent.CLICK, this, this.notCanSelect, [RuneCheck]);
            }
            else {
                RuneCheck.on(LEvent.CLICK, this, this.RuneCheckSelect, [cell, index, fuWenArr, runerequestinfolist]);
                RuneCheck.off(LEvent.CLICK, this, this.notCanSelect);
            }
            RuneCheck.selected = false;
        }

        /** 不能进行符文选中，并弹出提示飘窗 */
        private notCanSelect(checkbox: Laya.CheckBox): void {
            checkbox.selected = false;
            let _tipsMsg = ChatModel.getInstance().chatMessageTips[160253]["msg"];
            chat.models.ChatProxy.getInstance().event(chat.models.SHOW_DISSAPEAR_MSG_TIPS, _tipsMsg);
        }

        /**符文选择 */
        public RuneCheckSelect(cell, index, fuWenArr, runerequestinfolist) {
            var RuneCheck = cell.getChildByName("fuWenCheck_btn") as Laya.CheckBox;
            if (RuneCheck.selected) {
                if (runerequestinfolist.length > 0) {
                    for (var i = 0; i < runerequestinfolist.length; i++) {
                        if (fuWenArr[index].id == runerequestinfolist[i].itemid) {
                            RuneCheck.selected = false;
                            var mid = this.selectRequestRuneArr.indexOf(fuWenArr[index].id);
                            if (mid >= 0) {
                                this.selectRequestRuneArr.splice(mid, 1);
                            }
                        }
                        else {
                            if (this.selectRequestRuneArr.indexOf(fuWenArr[index].id) < 0) {
                                this.selectRequestRuneArr.push(fuWenArr[index].id);
                            }
                        }
                    }
                } else {
                    this.selectRequestRuneArr.push(fuWenArr[index].id);
                }

            } else {
                var mid = this.selectRequestRuneArr.indexOf(fuWenArr[index].id);
                if (mid >= 0) {
                    this.selectRequestRuneArr.splice(mid, 1);
                }
            }

        }

        /**请求符文 */
        public requestRuneInfo() {
            if (this.selectRequestRuneArr.length > 0) {
                this.CRuneRequest(this.selectRequestRuneArr);
            } else {
                this.DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[160252].msg);
            }
        }

        /**打符统计 */
        public fuwenTongji() {
            var runecountinfolist = models.FamilyModel.getInstance().runecountinfolist;
            if (runecountinfolist.length > 0) {
                this._viewUI.role_list.visible = true;
                var fuwenTongjiArr = [];
                for (var i = 0; i < runecountinfolist.length; i++) {
                    var rolename = runecountinfolist[i].rolename;
                    var level = runecountinfolist[i].level;
                    var school = runecountinfolist[i].school;
                    var position = runecountinfolist[i].position;
                    var givenum = runecountinfolist[i].givenum;
                    var acceptnum = runecountinfolist[i].acceptnum;
                    var givenum = runecountinfolist[i].givenum;
                    var acceptnum = runecountinfolist[i].acceptnum;
                    var givelevel = runecountinfolist[i].givelevel;
                    var m_position = this.clanCFactionPositionData[position].posname;
                    var m_school = this.schoolInfo[school].name;
                    var diban1_visi = true;
                    var diban2_visi = true;
                    if (i == 0 || i % 2 == 0) {
                        diban2_visi = false;
                    } else {
                        diban1_visi = false
                    }
                    fuwenTongjiArr.push({
                        diban1_img: { visible: diban1_visi },
                        diban2_img: { visible: diban2_visi },
                        roleName_lab: { text: rolename },
                        roleLv_lab: { text: level },
                        zhiYe_lab: { text: m_school },
                        zhiWu_lab: { text: m_position },
                        itemJuanZeng_lab: { text: givenum },
                        itemShouQu_lab: { text: acceptnum },
                        fuWenLv_lab: { text: givelevel }
                    })
                }
                this._viewUI.role_list.vScrollBarSkin = "";
                this._viewUI.role_list.scrollBar.elasticBackTime = 200;
                this._viewUI.role_list.scrollBar.elasticDistance = 50;
                this._viewUI.role_list.repeatY = fuwenTongjiArr.length;
                this._viewUI.role_list.array = fuwenTongjiArr;
            } else {
                this._viewUI.role_list.visible = false;
            }

        }

        /**************************************************************************** */

        /**
         * 请求符文请求信息
         */
        public CRequestRuneInfo() {
            RequesterProtocols._instance.c2s_CRequestRuneInfo();
        }

        /**
         * 请求符文界面
         */
        public CRuneRequestView() {
            RequesterProtocols._instance.c2s_CRuneRequestView();
        }

        /**请求符文 */
        public CRuneRequest(runerequestinfolist) {
            RequesterProtocols._instance.c2s_CRuneRequest(runerequestinfolist);
        }

        /**请求符文统计 */
        public CRequestRuneCount() {
            RequesterProtocols._instance.c2s_CRequestRuneCount();
        }


        public closeThisView() {
            this.hide();
            mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
            ModuleManager.show(ModuleNames.haveFamily, this._app);
        }

        public show(): void {
            super.show();
            mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
        }
        protected onShow(event: Object): void {
            this.show();
        }

        public hide(): void {
            super.hide();
            if (LoginModel.getInstance().CommonPage != "") {
                ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                LoginModel.getInstance().CommonPage = "";
            }
        }

        public getView(): Sprite {
            return this._viewUI;
        }

    }
}