/**
* 点击成员显示成员头像 和 按钮
*/
module game.modules.family {
    export class FamilyContactCharacterViewMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.FamilyContactCharacterUI;
        private _TipsMessageMediator: game.modules.tips.TipsMessageMediator;
        private _wanjiazhuangbeiUI: game.modules.commonUI.ViewEquipMediator;
        /**权限表 */
        clanCFactionPositionData = models.FamilyModel.getInstance().clanCFactionPositionData;
        /**程序内字符串表 */
        cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
        /**禁言角色id */
        BanTalkroleId = -1;
        /**是否禁言 */
        BanTalkFlag = -1;
        constructor(uiLayer: Sprite, app: AppBase, index, xpos?: number, ypos?: number) {
            super(uiLayer);
            this._viewUI = new ui.common.FamilyContactCharacterUI();
            this._app = app;
            this.isCenter = false;
            this._viewUI.listimg_img.visible = false;
            this._viewUI.close_img.on(LEvent.MOUSE_DOWN, this, this.hide);
            game.modules.tips.models.TipsProxy.getInstance().on(game.modules.tips.models.TIPS_ON_OK, this, this.okTips);
            this.show();
            this.showThisView(index);
            if(xpos && ypos){
                this._viewUI.view_box.x = xpos + 240;
                this._viewUI.view_box.y = ypos + 600;
            }
        }

        /**显示人物 */
        public showThisView(index) {
            this.BanTalkFlag = -1;
            this.BanTalkroleId = -1;
            var memberlist = models.FamilyModel.getInstance().memberlist;
            if(!memberlist || memberlist.length == 0){
                let clanInfo = models.FamilyModel.getInstance().clanInfo[0];
                memberlist = clanInfo.memberlist;
            }
            var _membersInfoDic = models.FamilyModel.getInstance().menmbersInfoDic;
            /** 当前角色id */
            var _currRoleId = game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid;
            var _currRolePosition = _membersInfoDic.get(_currRoleId)["position"];
            /** 当前角色，就是正在查看帮派其它成员信息的角色，其所拥有的帮派权限等级 */
            var _currRole_poslevel = this.clanCFactionPositionData[_currRolePosition].poslevel;
            /** 被查看角色id */
            let memberArr = _membersInfoDic.get(_membersInfoDic.keys[index]);
            var roleid = memberArr.roleid;
            var rolePosition = _membersInfoDic.get(roleid)["position"];//获得被查看角色的帮派权限
            var isbannedtalk = memberArr.isbannedtalk;  //是否禁言
            var rolename = memberArr.rolename; //名称
            var lastonlinetime = memberArr.lastonlinetime;  //是否在线
            var rolelevel = memberArr.rolelevel; //等级
            var shapeid = memberArr.shapeid; //头像id
            if (_currRole_poslevel != ClanPosLevel.LEVEL4) {  //是否是帮派权限4
                this._viewUI.moreBtn_box.visible = true;
                this._viewUI.view_box.height = 540;
                this._viewUI.bg_img.height = 540;
            } else {
                this._viewUI.moreBtn_box.visible = false;
                this._viewUI.view_box.height = 350;
                this._viewUI.bg_img.height = 350;
            }
            this.BanTalkroleId = roleid;
            if (isbannedtalk == 0 || isbannedtalk == 2) { //禁言
                this._viewUI.jinyan_btn.label = this.cstringResConfigData[11293].msg;
                this._viewUI.jinyan_btn.on(LEvent.MOUSE_DOWN, this, this.jinYanMember, [rolename, Bannedtalk.BanTalk]);
                this.BanTalkFlag = Bannedtalk.BanTalk;
            } else if (isbannedtalk == 1) { //取消禁言
                this._viewUI.jinyan_btn.label = this.cstringResConfigData[11294].msg;
                this._viewUI.jinyan_btn.on(LEvent.MOUSE_DOWN, this, this.jinYanMember, [rolename, Bannedtalk.BanTalkCancel]);
                this.BanTalkFlag = Bannedtalk.BanTalkCancel;
            }
            if (lastonlinetime > 0) { //是否在线
                this._viewUI.online_label.text = this.cstringResConfigData[353].msg;
            } else {
                this._viewUI.online_label.text = this.cstringResConfigData[354].msg;
            }
            this._viewUI.name_label.text = rolename;
            this._viewUI.level_label.text = rolelevel;
            this._viewUI.icon_img.skin = "common/icon/avatarrole/3000" + shapeid + ".png";
            this._viewUI.zhuchu_btn.on(LEvent.MOUSE_DOWN, this, this.zhuChuMember, [roleid, rolename]);
            this._viewUI.renming_btn.on(LEvent.MOUSE_DOWN, this, this.renMingMember, [roleid, _currRolePosition, rolePosition]);
            this._viewUI.showEquip_btn.on(LEvent.MOUSE_DOWN, this, this.onEquipBtn, [roleid]);
            this._viewUI.addFriend_btn.on(LEvent.MOUSE_DOWN, this, this.addFriend, [roleid]);
            this._viewUI.chat_btn.on(LEvent.MOUSE_DOWN, this, this.showChat, [roleid]);
        }
        /** 聊天 */
        public showChat(roleid): void {
            this.hide();
            RequesterProtocols._instance.c2s_CRequestUpdateRoleInfo(roleid);
            game.modules.friend.models.FriendProxy.getInstance().once(game.modules.friend.models.SRequestUpdateRoleInfo_EVENT, this, () => {
                var data: hanlder.S2C_SRequestUpdateRoleInfo = game.modules.friend.models.FriendModel.getInstance().SRequestUpdateRoleInfoData.get("data");
                ModuleManager.hide(ModuleNames.haveFamily);
                var isFriendFlag = FriendModel.getInstance().isMyFriend(roleid);
                game.modules.friend.models.FriendProxy.getInstance().event(game.modules.friend.models.transMessage_EVENT, [data.FriendInfoBean]);
                ModuleManager.show(ModuleNames.FRIEND, this._app);
            });
        }

        /**逐出 */
        public zhuChuMember(roleid, roleName) {
            this._viewUI.listimg_img.visible = false;
            this.hide();
            var fireArr: Dictionary = new Dictionary();
            fireArr.set("roleid", roleid)
            fireArr.set("roleName", roleName)
            models.FamilyProxy._instance.event(models.showFireMemberReason, fireArr);
        }

        /**任命
         * @param roleid 被任命帮派成员id
         * @param currrolePosition 任命帮派成员的角色帮派职位
         * @param rolePosition 被任命帮派成员的帮派职位
         */
        public renMingMember(roleid, currrolePosition: number, rolePosition: number) {
            this._viewUI.listimg_img.visible = true;
            var positionDicKeys = Object.keys(this.clanCFactionPositionData);
            var _poslevel = this.clanCFactionPositionData[currrolePosition].poslevel;
            var positionBtnArr = [];
            switch (currrolePosition) {
                case ClanPositionType.ClanMaster:
                    for (var i = ClanPositionType.ClanMaster; i <= positionDicKeys.length; i++) {
                        positionBtnArr = this.positionOper(i, positionBtnArr);
                    }
                    break;
                case ClanPositionType.ClanViceMaster:
                    for (var i = ClanPositionType.ClanViceMaster; i <= positionDicKeys.length; i++) {
                        if (this.clanCFactionPositionData[i].poslevel != _poslevel) {
                            positionBtnArr = this.positionOper(i, positionBtnArr);
                        }
                    }
                    break;
                case ClanPositionType.ClanArmyGroup1:
                    if (rolePosition == ClanPositionType.ClanArmyGroupElite1 || rolePosition == ClanPositionType.ClanMember) {
                        positionBtnArr = this.positionOper(ClanPositionType.ClanArmyGroupElite1, positionBtnArr);
                        positionBtnArr = this.positionOper(ClanPositionType.ClanMember, positionBtnArr);
                    }
                    else {
                        this.showDisapperMsgTips(150127);
                        return;
                    }
                    break;
                case ClanPositionType.ClanArmyGroup2:
                    if (rolePosition == ClanPositionType.ClanArmyGroupElite2 || rolePosition == ClanPositionType.ClanMember) {
                        positionBtnArr = this.positionOper(ClanPositionType.ClanArmyGroupElite2, positionBtnArr);
                        positionBtnArr = this.positionOper(ClanPositionType.ClanMember, positionBtnArr);
                    }
                    else {
                        this.showDisapperMsgTips(150127);
                        return;
                    }
                    break;
                case ClanPositionType.ClanArmyGroup3:
                    if (rolePosition == ClanPositionType.ClanArmyGroupElite3 || rolePosition == ClanPositionType.ClanMember) {
                        positionBtnArr = this.positionOper(ClanPositionType.ClanArmyGroupElite3, positionBtnArr);
                        positionBtnArr = this.positionOper(ClanPositionType.ClanMember, positionBtnArr);
                    }
                    else {
                        this.showDisapperMsgTips(150127);
                        return;
                    }
                    break;
                case ClanPositionType.ClanArmyGroup4:
                    if (rolePosition == ClanPositionType.ClanArmyGroupElite4 || rolePosition == ClanPositionType.ClanMember) {
                        positionBtnArr = this.positionOper(ClanPositionType.ClanArmyGroupElite4, positionBtnArr);
                        positionBtnArr = this.positionOper(ClanPositionType.ClanMember, positionBtnArr);
                    }
                    else {
                        this.showDisapperMsgTips(150127);
                        return;
                    }
                    break;
            }
            var positionBtnList = this._viewUI.positionBtn_list;
            this._viewUI.listimg_img.height = positionBtnList.getCell(0).height * positionBtnArr.length;
            positionBtnList.height = positionBtnList.getCell(0).height * positionBtnArr.length;
            positionBtnList.repeatY = positionBtnArr.length;
            SaleModel._instance.showList(positionBtnList, positionBtnArr);
            // positionBtnList.selectHandler = new Handler(this, this.positionListSelect, [roleid, positionBtnArr]);
            positionBtnList.renderHandler = new Handler(this, this.onSelect, [roleid, positionBtnArr]);

        }
        /** 任命职位选中 */
        public onSelect(roleid, positionBtnArr, cell: Laya.Box, index: number): void {
            var btn = cell.getChildByName("position_btn") as Laya.Button;
            btn.on(LEvent.MOUSE_DOWN, this, this.positionListSelect, [roleid, positionBtnArr, index]);
        }
        /** 显示提示消息飘窗 */
        private showDisapperMsgTips(msgid: number): void {
            var msg = ChatModel.getInstance().chatMessageTips[msgid]["msg"];
            var disMsgTips = new commonUI.DisappearMessageTipsMediator(this._app);
            disMsgTips.onShow(msg);
        }
        /** 职位数据操作 */
        private positionOper(position: number, arr: Array<any>): any {
            var posname = this.clanCFactionPositionData[position].posname;
            var id = this.clanCFactionPositionData[position].id;
            arr.push({ position_btn: posname, id: id })
            return arr;
        }

        /**任命 */
        public positionListSelect(roleid, positionBtnArr, index: number) {
            var positionId = positionBtnArr[index].id;
            if (positionId == ClanPositionType.ClanMaster) {
                var _parame = new Laya.Dictionary();
                _parame.set("contentId", 150139);
                tips.models.TipsProxy.getInstance().once(tips.models.TIPS_ON_OK, this, this.CChangePosition, [roleid, positionId]);
                var _tipsModule = new tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, _parame);
                return;
            }
            this.CChangePosition(roleid, positionId);
        }

        /**禁言 */
        public jinYanMember(roleName, flag) {
            this._viewUI.listimg_img.visible = false;
            if (flag == 0 || flag == 2) {
                this.isBannedtalkTips(11296, roleName);
            } else if (flag == 1) {
                this.isBannedtalkTips(11295, roleName);
            }
        }

        /**是否确定 禁言/解除禁言 tips */
        public isBannedtalkTips(contentId, roleName) {
            var param: Dictionary = new Dictionary();
            param.set("contentId", contentId);
            var paramArr = [roleName];
            param.set("parame", paramArr);
            this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
            this._TipsMessageMediator.show();
            this._TipsMessageMediator.showContent(param);
        }

        /**确定禁言 */
        public okTips() {
            this.hide();
            this.CBannedtalk(this.BanTalkroleId, this.BanTalkFlag);
        }

        /**点击查看装备 */
        public onEquipBtn(roleid) {
            this._viewUI.listimg_img.visible = false;
            this.CGetRoleEquip(roleid, 0);
            game.modules.team.models.TeamProxy.getInstance().once(game.modules.team.models.REFRESH_VIEW_EQUIP, this, this.showEquip);
        }

        /**显示装备 */
        public showEquip() {
            this._wanjiazhuangbeiUI = new game.modules.commonUI.ViewEquipMediator(this._app);
            this._wanjiazhuangbeiUI.onShow();
        }

        /**加为好友 */
        public addFriend(roleid) {
            this._viewUI.listimg_img.visible = false;
            this.hide();
            this.CRequestAddFriend(roleid);
        }

        /************************************************************************************************************************** */
        /**
         * 禁言
         * @param memberid 角色id
         * @param flag 操作标示：1禁言  2解禁
         */
        public CBannedtalk(memberid, flag) {
            RequesterProtocols._instance.c2s_CBannedtalk(memberid, flag);
        }

        /**
         * 更改职务
         * @param memberroleid 公会成员的id
         * @param position 申请的新职位
         */
        public CChangePosition(memberroleid, position) {
            RequesterProtocols._instance.c2s_CChangePosition(memberroleid, position);
            this.hide();
        }

        /** 
         * 查看装备
        */
        public CGetRoleEquip(roleid, sendmsg) {
            RequesterProtocols._instance.c2s_CGetRoleEquip(roleid, sendmsg);
        }

        /**加为好友 */
        public CRequestAddFriend(roleId) {
            RequesterProtocols._instance.c2s_CRequestAddFriend(roleId)
        }

        public offListener() {
            game.modules.tips.models.TipsProxy.getInstance().off(game.modules.tips.models.TIPS_ON_OK, this, this.okTips);
        }

        public show() {
            super.show();
        }

        public hide(): void {
            this.offListener();
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }
    }
}