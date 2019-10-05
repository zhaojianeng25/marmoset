
/**修改宗旨权限 */
enum ClanPermissions {
    /**可以修改 */
    OK = 1,
    /**不可以 */
    NO = 0
}

/**公会建筑 */
enum clanHouse {
    /**大厅 */
    BuildDating = 1,
    /**金库 */
    BuildJinKu = 2,
    /**药房 */
    BuildYaoFang = 3,
    /**旅店 */
    BuildLvDian = 4
}

/**同意或者拒绝 */
enum AcceptOrRefuseApply {
    refuse = 0,
    accept = 1
}

/**性别 */
enum Sex {
    /** 男女通用 客户端用 */
    ManOrWomen = 0,
    /**男的 */
    man = 1,
    /**女的 */
    woman = 2,
    /**不分男女的 服务端用*/
    allman = -1
}

/**弹劾类型 */
enum Cmdtype {
    /**请求弹劾界面 */
    requestView = 0,
    /**发起弹劾 */
    requestImp = 1,
    /**响应弹劾 */
    responseImp = 2
}

/**门派类型 */
enum schooleType {
    /**云霄 */
    yunxiao = 11,
    /**大荒 */
    dahuang = 12,
    /**苍羽 */
    cangyu = 13,
    /**飞雪 */
    feixue = 14,
    /**天雷 */
    tianlei = 15,
    /**无量 */
    wuliang = 16,
    /**玄冥 */
    xuanming = 17,
    /**七星 */
    qixing = 18,
    /**丹阳 */
    danyang = 19
}

/**禁言 */
enum Bannedtalk {
    /**禁言 */
    BanTalk = 1,
    /**取消禁言 */
    BanTalkCancel = 2
}

/** 帮派职位 */
enum ClanPositionType{
    /** 会长 */
    ClanMaster = 1,
    /** 副会长 */
    ClanViceMaster = 2,
    /** 第一军团长 */
    ClanArmyGroup1 = 3,
    /** 第二军团长 */
    ClanArmyGroup2 = 4,
    /** 第三军团长 */
    ClanArmyGroup3 = 5,
    /** 第四军团长 */
    ClanArmyGroup4 = 6,
    /** 第一军团精英 */
    ClanArmyGroupElite1 = 7,
    /** 第二军团精英 */
    ClanArmyGroupElite2 = 8,
    /** 第三军团精英 */
    ClanArmyGroupElite3 = 9,
    /** 第四军团精英 */
    ClanArmyGroupElite4 = 10,
    /** 成员 */
    ClanMember = 11
}

/** 帮派权限等级 */
enum ClanPosLevel{
    /** 等级一（会长，即帮主） */
    LEVEL1 = 1,
    /** 等级一（副会长，即副帮主） */
    LEVEL2 = 2,
    /** 等级一（军团长，即堂主） */
    LEVEL3 = 3,
    /** 等级四（精英、成员） */
    LEVEL4 = 4,
}

/** 帮派福利中药房产药倍率 */
enum ProduceDrugRate{
    /** 正常产药 */
    SELECT_BASE=0,
    /** 双倍产药 */
    SELECT_DOUBLE=1,
    /** 三倍产药 */
    SELECT_THREE=2
}

/** 捐赠符文的方式 */
enum FuWenSeletType {
    /** 活力 */
    HuoLi = 0,
    /** 符文道具 */
    FuWen = 1
}

module game.modules.family.models {
    /** FamilyModel 帮派相关数据存储 */
    export class FamilyModel {
        /**加入帮派界面返回的公会列表 */
        public clanlist: Dictionary = new Dictionary();
        /**搜索公会返回的数据 */
        searchClanlist = [];

        /**加入帮派界面 当前选择公会 服务端返回公会宗旨 */
        /**id */
        clanid = 0;
        /**公会宗旨 */
        clanaim = "";
        /**公会曾用名 */
        oldclanname = "";
        /**申请过的公会列表 */
        applyClanList: Dictionary = new Dictionary();
        /**有公会 返回的数据 */
        clanInfo = [];
        /**当前玩家有工会时的数据 */
        myclanInfo = [];

        /**当前玩家的公会职位 */
        RefreshPosition: Dictionary = new Dictionary();

        /**公会权限表 */
        clanCFactionPositionData: Object = {};

        /**公会大厅数据表 */
        clanCFactionLobbyData: Object = {};

        /**g公会大厅金库数据表 */
        clanCFactionGoldBankData: Object = {};

        /**g公会旅馆数据表 */
        clanCFactionHotelData: Object = {};

        /**g公会药房数据表 */
        clanCFactionDrugStoreData: Object = {};

        /**y药品购买配置 */
        clanCFactionYaoFangData: Object = {};

        /**g公会活动表 */
        clanCFactionHuoDongData: Object = {};

        /**公会副本参数 */
        instanceCInstaceConfigData: Object = {};

        /**公会福利表 */
        clanCFactionFuLiData: Object = {};

        /**g公会符文配置 */
        clanCRuneSetData: Object = {};

        /**成员列表 */
        memberlist = [];

        /**申请列表 */
        applylist = [];

        /**公会事件 */
        eventlist = [];

        /**公会邀请数据 */
        invitationroleinfolist = [];

        /**公会邀请加入数据返回 */
        ClanInvitation: Dictionary = new Dictionary();

        /**自动入会数据 */
        OpenAutoJoinClan: Dictionary = new Dictionary();

        /**返回请求符文界面数据 */
        runerequestinfolist: Dictionary = new Dictionary();

        /**符文统计 */
        runecountinfolist = [];

        /**药房信息 */
        pharmacyInfo: Dictionary = new Dictionary();

        /**公会分红 */
        bonus = 0;

        /**公会对战列表 */
        ClanFightList: Dictionary = new Dictionary();

        /** 存放帮派成员信息的字典（用帮派成员id作为key） */
        public menmbersInfoDic:Laya.Dictionary = new Laya.Dictionary();
        /** 帮派当前的子界面选择 */
		public clanCurrenTabNum:number  = -1;
        /** 当前玩家角色在帮派中的信息数据 */
        public _selfInClanInfo: models.ClanMemberVo = new models.ClanMemberVo();

        constructor() {
            FamilyModel._instance = this;
        }
        private static _instance: FamilyModel;
        public static getInstance(): FamilyModel {
            if (!this._instance) {
                this._instance = new FamilyModel();
            }
            return this._instance;
        }
        public static clearModelData(): void {
            family.models.FamilyModel._instance.clanlist = new Laya.Dictionary();
            family.models.FamilyModel._instance.searchClanlist = [];
            family.models.FamilyModel._instance.clanid = 0;
            family.models.FamilyModel._instance.clanaim = "";
            family.models.FamilyModel._instance.oldclanname = "";
            family.models.FamilyModel._instance.applyClanList = new Laya.Dictionary();
            family.models.FamilyModel._instance.clanInfo = [];
            family.models.FamilyModel._instance.myclanInfo = [];
            family.models.FamilyModel._instance.RefreshPosition = new Laya.Dictionary();
            family.models.FamilyModel._instance.memberlist = [];
            family.models.FamilyModel._instance.applylist = [];
            family.models.FamilyModel._instance.eventlist = [];
            family.models.FamilyModel._instance.invitationroleinfolist = [];
            family.models.FamilyModel._instance.ClanInvitation = new Laya.Dictionary();
            family.models.FamilyModel._instance.OpenAutoJoinClan = new Laya.Dictionary();
            family.models.FamilyModel._instance.runerequestinfolist = new Laya.Dictionary();
            family.models.FamilyModel._instance.runecountinfolist = [];
            family.models.FamilyModel._instance.pharmacyInfo = new Laya.Dictionary();
            family.models.FamilyModel._instance.bonus = 0;
            family.models.FamilyModel._instance.ClanFightList = new Laya.Dictionary();
            family.models.FamilyModel._instance.menmbersInfoDic = new Laya.Dictionary();
            family.models.FamilyModel._instance.clanCurrenTabNum = -1;
            family.models.FamilyModel._instance._selfInClanInfo = new models.ClanMemberVo();
        }

        /**
        * 显示拥有的钱
        */
        public showMoney(money) {
            let str: string;

            if (!isNaN(money)) {
                str = game.utils.MoneyU.number2Thousands(money);
            } else {
                str = "0";
            }
            // label.text = str;
            return str;
        }

        /**活动打开或者是传送 */
        static activityOpenOrTransfer = {
            open: "打开",
            transfer: "传送"
        }

    }
}