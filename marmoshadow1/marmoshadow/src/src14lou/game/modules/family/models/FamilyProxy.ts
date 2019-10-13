
module game.modules.family.models {
    /**打开公会列表 */
    export const SOpenClanList: string = "SOpenClanList";
    /**公会宗旨返回 */
    export const SClanAim: string = "SClanAim";
    /**公会申请 */
    export const SApplyClanList: string = "SApplyClanList";
    /**公会查询 */
    export const SSearchClan: string = "SSearchClan";
    /**打开公会 */
    export const SOpenClan: string = "SOpenClan";
    /**修改公会宗旨 */
    export const SChangeClanAim: string = "SChangeClanAim";
    /**修改公会名称 */
    export const SChangeClanName: string = "SChangeClanName";
    /**关闭界面 */
    export const CloseModule: string = "CloseModule";
    /**公会升级 */
    export const SClanLevelup: string = "SClanLevelup";
    /**刷新成员列表 */
    export const SRefreshMemberList: string = "SRefreshMemberList";
    /**请求加入公会 */
    export const SRequestApply: string = "SRequestApply";
    /**公会事件 */
    export const CRequestEventInfo: string = "CRequestEventInfo";
    /**公会邀请 */
    export const SClanInvitationView: string = "SClanInvitationView";
    /**公会邀请加入 */
    export const SClanInvitation: string = "SClanInvitation";
    /** 弹劾界面返回*/
    export const SRequestImpeachMentView: string = "SRequestImpeachMentView";
    /**移除主界面的tips */
    export const removeMainTips: string = "removeMainTips";
    /**离开公会 */
    export const SLeaveClan: string = "SLeaveClan";
    /**显示提出公会原因 */
    export const showFireMemberReason: string = "showFireMemberReason";
    /**符文请求信息 */
    export const SRequestRuneInfo: string = "SRequestRuneInfo";
    /**返回请求符文界面 */
    export const SRuneRequestView: string = "SRuneRequestView";
    /**符文统计 */
    export const SRequestRuneCount: string = "SRequestRuneCount";
    /**药房信息 */
    export const SOpenClanMedic: string = "SOpenClanMedic";
    /**返回修改产药倍数 */
    export const SRequestSelectType: string = "SRequestSelectType";
    /**查询公会分红 */
    export const SBonusQuery: string = "SBonusQuery";
    /**返回对战列表 */
    export const SGetClanFightList: string = "SGetClanFightList";
    /**公会竞技  下次清零时间 */
    export const SGetClearTime: string = "SGetClearTime";
    /**显示红点 */
    export const isShowFamilyRedDot: string = "isShowFamilyRedDot";
    /**是否有红点 */
    export const SClanRedTip: string = "SClanRedTip";
    /**关闭申请加入公会界面 */
    export const CloseJoinView: string = "CloseJoinView";


    /** familyProxy 帮派的相关协议*/
    export class FamilyProxy extends hanlder.ProxyBase {
        constructor() {
            super();
            FamilyProxy._instance = this;
            this.init();
        }
        public static _instance: FamilyProxy;
        public static getInstance(): FamilyProxy {
            if (!this._instance) {
                this._instance = new FamilyProxy();
            }
            return this._instance;
        }

        public init(): void {
            FamilyModel.getInstance();
            this.addNetworkListener();
            Laya.loader.load("common/data/temp/clan.cfactionposition.bin", Handler.create(this, this.onloadedClanCFactionPositionComplete), null, Loader.BUFFER);
            Laya.loader.load("common/data/temp/clan.cfactionlobby.bin", Handler.create(this, this.onloadedClanCFactionLobbyComplete), null, Loader.BUFFER);
            Laya.loader.load("common/data/temp/clan.cfactiongoldbank.bin", Handler.create(this, this.onloadedClanClanCFactionGoldBankComplete), null, Loader.BUFFER);
            Laya.loader.load("common/data/temp/clan.cfactionhotel.bin", Handler.create(this, this.onloadedClanCFactionHotelComplete), null, Loader.BUFFER);
            Laya.loader.load("common/data/temp/clan.cfactiondrugstore.bin", Handler.create(this, this.onloadedClanCFactionDrugStoreComplete), null, Loader.BUFFER);
            Laya.loader.load("common/data/temp/clan.cfactionfuli.bin", Handler.create(this, this.onloadedClanCFactionFuLiComplete), null, Loader.BUFFER);
            Laya.loader.load("common/data/temp/clan.cruneset.bin", Handler.create(this, this.onloadedClanCRuneSetComplete), null, Loader.BUFFER);
            Laya.loader.load("common/data/temp/clan.cfactionyaofang.bin", Handler.create(this, this.onloadedClanCFactionYaoFangComplete), null, Loader.BUFFER);
            Laya.loader.load("common/data/temp/clan.cfactionhuodong.bin", Handler.create(this, this.onloadedClanCFactionHuoDongComplete), null, Loader.BUFFER);
            Laya.loader.load("common/data/temp/instance.cinstaceconfig.bin", Handler.create(this, this.onloadedInstanceCInstaceConfigComplete), null, Loader.BUFFER);
        }

        //g公会职务以及权限表
        public onloadedClanCFactionPositionComplete(): void {
            var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactionposition.bin");
            var data: Byte = new Byte(arrayBuffer);
            var size: number = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, FamilyModel.getInstance().clanCFactionPositionData, game.data.template.ClanCFactionPositionBaseVo, "id");
        }


        //g公会大厅数据表
        public onloadedClanCFactionLobbyComplete(): void {
            var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactionlobby.bin");
            var data: Byte = new Byte(arrayBuffer);
            var size: number = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, FamilyModel.getInstance().clanCFactionLobbyData, game.data.template.ClanCFactionLobbyBaseVo, "id");
        }

        //g公会大厅金库数据表
        public onloadedClanClanCFactionGoldBankComplete(): void {
            var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactiongoldbank.bin");
            var data: Byte = new Byte(arrayBuffer);
            var size: number = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, FamilyModel.getInstance().clanCFactionGoldBankData, game.data.template.ClanCFactionGoldBankBaseVo, "id");
        }

        //g公会旅馆数据表
        public onloadedClanCFactionHotelComplete(): void {
            var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactionhotel.bin");
            var data: Byte = new Byte(arrayBuffer);
            var size: number = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, FamilyModel.getInstance().clanCFactionHotelData, game.data.template.ClanCFactionHotelBaseVo, "id");
        }
        //g公会药房数据表
        public onloadedClanCFactionDrugStoreComplete(): void {
            var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactiondrugstore.bin");
            var data: Byte = new Byte(arrayBuffer);
            var size: number = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, FamilyModel.getInstance().clanCFactionDrugStoreData, game.data.template.ClanCFactionDrugStoreBaseVo, "id");
        }

        //g公会福利表
        public onloadedClanCFactionFuLiComplete(): void {
            var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactionfuli.bin");
            var data: Byte = new Byte(arrayBuffer);
            var size: number = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, FamilyModel.getInstance().clanCFactionFuLiData, game.data.template.ClanCFactionFuLiBaseVo, "id");
        }

        //g公会符文配置
        public onloadedClanCRuneSetComplete(): void {
            var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/clan.cruneset.bin");
            var data: Byte = new Byte(arrayBuffer);
            var size: number = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, FamilyModel.getInstance().clanCRuneSetData, game.data.template.ClanCRuneSetBaseVo, "id");
        }

        //y药品购买配置
        public onloadedClanCFactionYaoFangComplete(): void {
            var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactionyaofang.bin");
            var data: Byte = new Byte(arrayBuffer);
            var size: number = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, FamilyModel.getInstance().clanCFactionYaoFangData, game.data.template.ClanCFactionYaoFangBaseVo, "id");
        }

        //g公会活动表
        public onloadedClanCFactionHuoDongComplete(): void {
            var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactionhuodong.bin");
            var data: Byte = new Byte(arrayBuffer);
            var size: number = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, FamilyModel.getInstance().clanCFactionHuoDongData, game.data.template.ClanCFactionHuoDongBaseVo, "id");
        }

        //公会副本参数
        public onloadedInstanceCInstaceConfigComplete(): void {
            var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/instance.cinstaceconfig.bin");
            var data: Byte = new Byte(arrayBuffer);
            var size: number = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, FamilyModel.getInstance().instanceCInstaceConfigData, game.data.template.InstanceCInstaceConfigBaseVo, "id");
        }

        public addNetworkListener(): void {
            /**服务端响应客户端请求公会列表协议：没有加入公会 */
            Network._instance.addHanlder(ProtocolsEnum.SOpenClanList, this, this.onSOpenClanList);
            /**服务端返回公会宗旨 */
            Network._instance.addHanlder(ProtocolsEnum.SClanAim, this, this.onSClanAim);
            /**返回申请过的公会列表 */
            Network._instance.addHanlder(ProtocolsEnum.SApplyClanList, this, this.onSApplyClanList);
            /**取消公会申请返回 */
            Network._instance.addHanlder(ProtocolsEnum.SCancelApplyClan, this, this.onSCancelApplyClan);
            /**搜索公会返回 */
            Network._instance.addHanlder(ProtocolsEnum.SSearchClan, this, this.onSSearchClan);
            /**有工会登陆返回公会信息 */
            Network._instance.addHanlder(ProtocolsEnum.SOpenClan, this, this.onSOpenClan);
            /**公会职位返回 */
            Network._instance.addHanlder(ProtocolsEnum.SRefreshPosition, this, this.onSRefreshPosition);
            /**修改宗旨返回 */
            Network._instance.addHanlder(ProtocolsEnum.SChangeClanAim, this, this.onSChangeClanAim);
            /**修改名称返回 */
            Network._instance.addHanlder(ProtocolsEnum.SChangeClanName, this, this.onSChangeClanName);
            /**升级 */
            Network._instance.addHanlder(ProtocolsEnum.SClanLevelup, this, this.onSClanLevelup);
            /**成员列表 */
            Network._instance.addHanlder(ProtocolsEnum.SRefreshMemberList, this, this.onSRefreshMemberList);
            /**申请列表 */
            Network._instance.addHanlder(ProtocolsEnum.SRequestApply, this, this.onSRequestApply);
            /**公会事件 */
            Network._instance.addHanlder(ProtocolsEnum.SRequestEventInfo, this, this.onSRequestEventInfo);
            /**申请拒绝返回 */
            Network._instance.addHanlder(ProtocolsEnum.SRefuseApply, this, this.onSRefuseApply);
            /**申请同意返回 */
            Network._instance.addHanlder(ProtocolsEnum.SAcceptApply, this, this.onSAcceptApply);
            /**公会邀请 */
            Network._instance.addHanlder(ProtocolsEnum.SClanInvitationView, this, this.onSClanInvitationView);
            /**公会邀请加入 */
            Network._instance.addHanlder(ProtocolsEnum.SClanInvitation, this, this.onSClanInvitation);
            /**搜索好成功 */
            Network._instance.addHanlder(ProtocolsEnum.SRequestSearchRole, this, this.onSRequestSearchRole);
            /**弹劾界面返回 */
            Network._instance.addHanlder(ProtocolsEnum.SRequestImpeachMentView, this, this.onSRequestImpeachMentView);
            /**主动离开公会 */
            Network._instance.addHanlder(ProtocolsEnum.SLeaveClan, this, this.onSLeaveClan);
            /**是否开启自动接收入会 */
            Network._instance.addHanlder(ProtocolsEnum.SOpenAutoJoinClan, this, this.onSOpenAutoJoinClan);
            /**禁言 */
            Network._instance.addHanlder(ProtocolsEnum.SBannedtalk, this, this.onSBannedtalk);
            /**踢人 */
            Network._instance.addHanlder(ProtocolsEnum.SFireMember, this, this.onSFireMember);
            /**符文请求信息 */
            Network._instance.addHanlder(ProtocolsEnum.SRequestRuneInfo, this, this.onSRequestRuneInfo);
            /**返回请求符文界面 */
            Network._instance.addHanlder(ProtocolsEnum.SRuneRequestView, this, this.onSRuneRequestView);
            /**请求符文 */
            Network._instance.addHanlder(ProtocolsEnum.SRuneRequest, this, this.onSRuneRequest);
            /** 符文统计 */
            Network._instance.addHanlder(ProtocolsEnum.SRequestRuneCount, this, this.onSRequestRuneCount);
            /** 药房信息 */
            Network._instance.addHanlder(ProtocolsEnum.SOpenClanMedic, this, this.onSOpenClanMedic);
            /** 返回购买药房的药品 */
            Network._instance.addHanlder(ProtocolsEnum.SBuyMedic, this, this.onSBuyMedic);
            /** 返回修改产药倍数 */
            Network._instance.addHanlder(ProtocolsEnum.SRequestSelectType, this, this.onSRequestSelectType);
            /** 查询公会分红 */
            Network._instance.addHanlder(ProtocolsEnum.SBonusQuery, this, this.onSBonusQuery);
            /** 领取公会分红 */
            Network._instance.addHanlder(ProtocolsEnum.SGrabBonus, this, this.onSGrabBonus);

            /**************************************** */
            /** 公会竞技  下次清零时间 */
            Network._instance.addHanlder(ProtocolsEnum.SGetClearTime, this, this.onSGetClearTime);
            /** 返回对战列表 */
            Network._instance.addHanlder(ProtocolsEnum.SGetClanFightList, this, this.onSGetClanFightList);
            /** 是否有红点 */
            Network._instance.addHanlder(ProtocolsEnum.SClanRedTip, this, this.onSClanRedTip);

        }

        public onSOpenClanList(optcode: number, msg: hanlder.s2c_SOpenClanList) {
            models.FamilyModel.getInstance().clanlist.set(msg.currpage, msg.clanlist);
            models.FamilyProxy._instance.event(SOpenClanList);

        }

        public onSClanAim(optcode: number, msg: hanlder.S2C_SClanAim) {
            FamilyModel.getInstance().clanid = msg.clanid;
            FamilyModel.getInstance().clanaim = msg.clanaim;
            FamilyModel.getInstance().oldclanname = msg.oldclanname;
            FamilyProxy._instance.event(SClanAim);
        }

        public onSApplyClanList(optcode: number, msg: hanlder.S2C_SApplyClanList) {
            FamilyModel.getInstance().applyClanList.set(msg.roleid, msg.applyClanList);
            FamilyProxy._instance.event(SApplyClanList);
        }

        public onSCancelApplyClan(optcode: number, msg: hanlder.S2C_SCancelApplyClan) {
            var applyClanList = FamilyModel.getInstance().applyClanList;
            var applyClanListKeys = applyClanList.keys;
            var applyList: Array<any> = applyClanList.get(applyClanListKeys[0]);
            for (var i = 0; i < applyList.length; i++) {
                var clankey = applyList[i].clankey;  //公会key
                if (msg.clanid == clankey) {
                    applyList[i].applystate = 0;    //申请状态 0取消  1申请中
                }
            }
            FamilyModel.getInstance().applyClanList.set(applyClanListKeys[0], applyList);
            FamilyProxy._instance.event(SApplyClanList);
        }

        public onSSearchClan(optcode: number, msg: hanlder.S2C_SSearchClan) {
            if (msg.clanSummaryInfo[0].clanmastername != undefined) {
                FamilyModel.getInstance().searchClanlist = msg.clanSummaryInfo;
            } else {
                FamilyModel.getInstance().searchClanlist = [];
            }
            FamilyProxy._instance.event(SSearchClan);
        }

        public onSOpenClan(optcode: number, msg: hanlder.s2c_SOpenClan) {
            var clanInfo = [];
            clanInfo.push({
                index: msg.index, clanname: msg.clanname, clanid: msg.clanid, clanlevel: msg.clanlevel, membersnum: msg.membersnum, clanmaster: msg.clanmaster,
                masterid: msg.masterid, vicemasterid: msg.vicemasterid, clancreator: msg.clancreator, clanaim: msg.clanaim, memberlist: msg.memberlist, money: msg.money,
                house: msg.house, oldclanname: msg.oldclanname, clancreatorid: msg.clancreatorid, autostate: msg.autostate, requestlevel: msg.requestlevel,
                applylevel: msg.applylevel, costeverymoney: msg.costeverymoney, costmax: msg.costmax, claninstservice: msg.claninstservice
            })
            FamilyModel.getInstance().clanInfo = clanInfo;

            var roleid = game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid;
            var memberlist = msg.memberlist;
            for (var i in memberlist) {
                var m_roleid = memberlist[i].roleid;
                if (m_roleid == roleid) {
                    game.modules.family.models.FamilyModel.getInstance().myclanInfo = [];
                    game.modules.family.models.FamilyModel.getInstance().myclanInfo.push(memberlist[i]);
                }
            }
            game.modules.mainhud.models.HudModel.getInstance().clankey = msg.clanid;
            game.modules.mainhud.models.HudModel.getInstance().clanname = msg.clanname;
            FamilyProxy._instance.event(SOpenClan);
        }

        public onSRefreshPosition(optcode: number, msg: hanlder.s2c_SRefreshPosition) {
            FamilyModel.getInstance().RefreshPosition.set(msg.roleid, msg.position);
            var memberlist = models.FamilyModel.getInstance().memberlist;
            for (var i = 0; i < memberlist.length; i++) {
                var roleid = memberlist[i].roleid;
                if (roleid == msg.roleid) {
                    memberlist[i].position = msg.position;
                }
            }
            models.FamilyModel.getInstance().memberlist = memberlist;
            models.FamilyProxy._instance.event(SRefreshMemberList);
        }

        public onSChangeClanAim(optcode: number, msg: hanlder.s2c_SChangeClanAim) {
            FamilyProxy._instance.event(SChangeClanAim, msg.newaim);

        }

        public onSChangeClanName(optcode: number, msg: hanlder.S2C_SChangeClanName) {
            FamilyProxy._instance.event(SChangeClanName, msg.newname);

        }

        public onSClanLevelup(optcode: number, msg: hanlder.S2C_SClanLevelup) {
            // FamilyProxy._instance.event(SChangeClanName, msg.newname);
            var clanInfo = FamilyModel.getInstance().clanInfo;
            var house: Dictionary = clanInfo[0].house;
            var change = msg.change;
            var keys = change.keys;
            for (var i = 0; i < keys.length; i++) {
                var value = change.get(keys[i]);
                if (keys[i] == 1) {
                    models.FamilyModel.getInstance().clanInfo[0].clanlevel = value;
                } else {
                    house.set(keys[i], value);
                }
            }
            FamilyModel.getInstance().clanInfo[0].house = house;
            FamilyModel.getInstance().clanInfo[0].money = msg.money;
            FamilyModel.getInstance().clanInfo[0].costmax = msg.costmax;
            FamilyProxy._instance.event(SClanLevelup);
        }

        public onSRefreshMemberList(optcode: number, msg: hanlder.S2C_SRefreshMemberList) {
            models.FamilyModel.getInstance().memberlist = msg.memberlist;
            models.FamilyProxy._instance.event(SRefreshMemberList);
        }

        public onSRequestApply(optcode: number, msg: hanlder.s2c_SRequestApply) {
            FamilyModel.getInstance().applylist = msg.applylist;
            models.FamilyProxy._instance.event(SRequestApply);
        }

        public onSRequestEventInfo(optcode: number, msg: hanlder.S2C_SRequestEventInfo) {
            FamilyModel.getInstance().eventlist = msg.eventlist;
            models.FamilyProxy._instance.event(CRequestEventInfo);
        }

        public onSRefuseApply(optcode: number, msg: hanlder.s2c_SRefuseApply) {
            var applylist = FamilyModel.getInstance().applylist;
            for (var i = 0; i < applylist.length; i++) {
                var roleid = applylist[i].roleid;
                if (roleid == msg.applyroleid) {
                    applylist.splice(i, 1)
                }
            }
            FamilyModel.getInstance().applylist = applylist;
            models.FamilyProxy._instance.event(SRequestApply);
        }

        public onSAcceptApply(optcode: number, msg: hanlder.S2C_SAcceptApply) {
            var memberlist = models.FamilyModel.getInstance().memberlist;
            memberlist.push(msg.memberinfo[0]);
            models.FamilyModel.getInstance().memberlist = memberlist;
            models.FamilyProxy._instance.event(SRefreshMemberList);

            var applylist = FamilyModel.getInstance().applylist;
            for (var i = 0; i < applylist.length; i++) {
                var roleid = applylist[i].roleid;
                if (roleid == msg.memberinfo[0].roleid) {
                    applylist.splice(i, 1)
                }
            }
            FamilyModel.getInstance().applylist = applylist;
            models.FamilyProxy._instance.event(SRequestApply);
        }

        public onSClanInvitationView(optcode: number, msg: hanlder.S2C_SClanInvitationView) {
            models.FamilyModel.getInstance().invitationroleinfolist = msg.invitationroleinfolist;
            models.FamilyProxy.getInstance().event(SClanInvitationView);
        }

        public onSClanInvitation(optcode: number, msg: hanlder.s2c_SClanInvitation) {
            var ClanInvitation: Dictionary = new Dictionary();
            ClanInvitation.set("hostroleid", msg.hostroleid)
            ClanInvitation.set("hostrolename", msg.hostrolename)
            let _flag = friend.models.FriendModel.getInstance().isMyBlackList(0, msg.hostrolename);//判断邀请入帮派的角色名字是否是玩家自己黑名单存在
            if (_flag) return;
            ClanInvitation.set("clanlevel", msg.clanlevel)
            ClanInvitation.set("clannname", msg.clannname)
            ClanInvitation.set("invitetype", msg.invitetype)
            models.FamilyModel.getInstance().ClanInvitation = ClanInvitation;
            models.FamilyProxy._instance.event(SClanInvitation);
        }

        public onSRequestSearchRole(optcode: number, msg: hanlder.S2C_SRequestSearchRole) {
            models.FamilyModel.getInstance().invitationroleinfolist = msg.invitationroleinfolist;
            models.FamilyProxy.getInstance().event(SClanInvitationView);
        }

        public onSRequestImpeachMentView(optcode: number, msg: hanlder.S2C_SRequestImpeachMentView) {
            var RequestImpeachMent: Dictionary = new Dictionary();
            RequestImpeachMent.set("impeachstate", msg.impeachstate);
            RequestImpeachMent.set("maxnum", msg.maxnum);
            RequestImpeachMent.set("impeachname", msg.impeachname);
            RequestImpeachMent.set("impeachtime", msg.impeachtime);
            RequestImpeachMent.set("curnum", msg.curnum);
            models.FamilyProxy._instance.event(SRequestImpeachMentView, RequestImpeachMent);
        }

        public onSLeaveClan(optcode: number, msg: hanlder.s2c_SLeaveClan) {
            var roleid = game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid;
            if (roleid == msg.memberid) {
                game.modules.mainhud.models.HudModel.getInstance().clankey = 0;
                game.modules.mainhud.models.HudModel.getInstance().clanname = "";
                models.FamilyProxy.getInstance().event(SLeaveClan);
            }
        }

        public onSOpenAutoJoinClan(optcode: number, msg: hanlder.S2C_SOpenAutoJoinClan) {
            var clanInfo = models.FamilyModel.getInstance().clanInfo;
            clanInfo[0].autostate = msg.autostate;
            clanInfo[0].requestlevel = msg.requestlevel;
            clanInfo[0].applylevel = msg.applylevel;
        }

        public onSBannedtalk(optcode: number, msg: hanlder.S2C_SBannedtalk) {
            var memberlist = models.FamilyModel.getInstance().memberlist;
            for (var i = 0; i < memberlist.length; i++) {
                var roleid = memberlist[i].roleid;
                if (roleid == msg.memberid) {
                    memberlist[i].isbannedtalk = msg.flag;
                }
            }
            models.FamilyModel.getInstance().memberlist = memberlist;
        }

        public onSFireMember(optcode: number, msg: hanlder.s2c_SFireMember) {
            var memberlist = models.FamilyModel.getInstance().memberlist;
            for (var i = 0; i < memberlist.length; i++) {
                var roleid = memberlist[i].roleid;
                if (roleid == msg.memberroleid) {
                    memberlist.splice(i, 1);
                }
            }
            models.FamilyProxy._instance.event(SRefreshMemberList);
            var m_roleid = game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid;  //当前玩家id
            if (m_roleid == msg.memberroleid) {
                game.modules.mainhud.models.HudModel.getInstance().clankey = 0;
                game.modules.mainhud.models.HudModel.getInstance().clanname = "";
                models.FamilyProxy.getInstance().event(SLeaveClan);
            }
        }

        public onSRequestRuneInfo(optcode: number, msg: hanlder.S2C_SRequestRuneInfo) {
            var requestRuneInfo: Dictionary = new Dictionary();
            requestRuneInfo.set("requestnum", msg.requestnum);
            requestRuneInfo.set("useenergy", msg.useenergy);
            requestRuneInfo.set("runeinfolist", msg.runeinfolist);
            models.FamilyProxy._instance.event(SRequestRuneInfo, requestRuneInfo);
        }

        public onSRuneRequestView(optcode: number, msg: hanlder.S2C_SRuneRequestView) {
            var runerequestinfolist: Dictionary = new Dictionary();
            runerequestinfolist.set("requestnum", msg.requestnum);
            runerequestinfolist.set("runerequestinfolist", msg.runerequestinfolist);
            models.FamilyModel.getInstance().runerequestinfolist = runerequestinfolist;
            models.FamilyProxy._instance.event(SRuneRequestView);
        }

        public onSRuneRequest(optcode: number, msg: hanlder.S2C_SRuneRequest) {
            var runerequestinfolist: Dictionary = new Dictionary();
            runerequestinfolist.set("requestnum", msg.requestnum);
            runerequestinfolist.set("runerequestinfolist", msg.runerequestinfolist);
            models.FamilyModel.getInstance().runerequestinfolist = runerequestinfolist;
            models.FamilyProxy._instance.event(SRuneRequestView);
        }

        public onSRequestRuneCount(optcode: number, msg: hanlder.S2C_SRequestRuneCount) {
            models.FamilyModel.getInstance().runecountinfolist = msg.runecountinfolist;
            models.FamilyProxy._instance.event(SRequestRuneCount);
        }

        public onSOpenClanMedic(optcode: number, msg: hanlder.s2c_SOpenClanMedic) {
            var pharmacyInfo: Dictionary = new Dictionary();
            pharmacyInfo.set("selecttype", msg.selecttype);
            pharmacyInfo.set("buyitemnum", msg.buyitemnum);
            pharmacyInfo.set("medicitemlist", msg.medicitemlist);
            models.FamilyModel.getInstance().pharmacyInfo = pharmacyInfo;
            models.FamilyProxy._instance.event(SOpenClanMedic);
        }

        public onSBuyMedic(optcode: number, msg: hanlder.S2C_SBuyMedic) {
            var pharmacyInfo = models.FamilyModel.getInstance().pharmacyInfo;
            pharmacyInfo.set("buyitemnum", msg.buyitemnum);
            var medicitemlist = pharmacyInfo.get("medicitemlist");
            for (var i = 0; i < medicitemlist.length; i++) {
                if (medicitemlist[i].itemid == msg.itemid) {
                    medicitemlist[i].itemnum = msg.itemnum;
                }
            }
            pharmacyInfo.set("medicitemlist", medicitemlist);
            models.FamilyProxy._instance.event(SOpenClanMedic);
        }

        public onSRequestSelectType(optcode: number, msg: hanlder.S2C_SRequestSelectType) {
            models.FamilyProxy._instance.event(SRequestSelectType, msg.selecttype);
        }

        public onSBonusQuery(optcode: number, msg: hanlder.S2C_SBonusQuery) {
            models.FamilyModel.getInstance().bonus = msg.bonus;
            models.FamilyProxy._instance.event(SBonusQuery);
        }

        public onSGrabBonus(optcode: number, msg: hanlder.S2C_SGrabBonus) {
            models.FamilyModel.getInstance().bonus = 0;
            models.FamilyProxy._instance.event(SBonusQuery);
        }

        public onSGetClearTime(optcode: number, msg: hanlder.S2C_SGetClearTime) {
            models.FamilyProxy._instance.event(SGetClearTime, msg.cleartime);
        }

        public onSGetClanFightList(optcode: number, msg: hanlder.S2C_SGetClanFightList) {
            var ClanFightList: Dictionary = new Dictionary();
            ClanFightList.set("clanfightlist", msg.clanfightlist)
            ClanFightList.set("curweek", msg.curweek)
            ClanFightList.set("over", msg.over)
            models.FamilyModel.getInstance().ClanFightList = ClanFightList;
            models.FamilyProxy._instance.event(SGetClanFightList);
        }

        public onSClanRedTip(optcode: number, msg: hanlder.S2C_SClanRedTip) {
            models.FamilyProxy._instance.event(models.SClanRedTip, [msg.redtips]);
        }

    }
}