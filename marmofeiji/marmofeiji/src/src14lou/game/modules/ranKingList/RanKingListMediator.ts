
import RanKingListModel = game.modules.ranKingList.models.RanKingListModel;
import RanKingList_renzong_InfoVo = game.modules.ranKingList.models.RanKingList_renzong_InfoVo;
import LevelRank_infoVo = game.modules.ranKingList.models.LevelRank_infoVo;
import PetGradeRank_infoVo = game.modules.ranKingList.models.PetGradeRank_infoVo;
import BingFengRank_infoVo = game.modules.ranKingList.models.BingFengRank_infoVo;
import FactionRank_infoVo = game.modules.ranKingList.models.FactionRank_infoVo;
import FactionRaidRank_infoVo = game.modules.ranKingList.models.FactionRaidRank_infoVo;
import FactionRankRecordEx_infoVo = game.modules.ranKingList.models.FactionRankRecordEx_infoVo;
import RoleProfessionRankRecord_infoVo = game.modules.ranKingList.models.RoleProfessionRankRecord_infoVo;
import RedPackRankRecord_infoVo = game.modules.ranKingList.models.RedPackRankRecord_infoVo;
import FlowerRankRecord_infoVo = game.modules.ranKingList.models.FlowerRankRecord_infoVo;
import PvP5RankData_infoVo = game.modules.ranKingList.models.PvP5RankData_infoVo;
import ClanFightRaceRank_infoVo = game.modules.ranKingList.models.ClanFightRaceRank_infoVo;
import ClanFightHistroyRank_infoVo = game.modules.ranKingList.models.ClanFightHistroyRank_infoVo;
import PetInfoVo = game.modules.pet.models.PetInfoVo;
import BagVo = game.modules.bag.models.BagVo;
import ZongHePingFenVo = game.modules.ranKingList.models.ZongHePingFenVo;
module game.modules.ranKingList {
    /** 排行榜主界面 */
    export class RanKingListMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.RanKingListUI;
        private _viewUI_petInfo: ui.common.PetXiangQingUI;
        /** 综合评分界面 */
        private _ZongHePingFenMediator: ZongHePingFenMediator;
        /** 被选中的榜按钮，默认每次打开都是人综榜被选中 */
        private is_selected_btn = RankType.ROLE_ZONGHE_RANK;
        /** 当前所显示排行榜列表样式 */
        private curr_list: Laya.List;
        /** 去指向被选中的榜按钮的排行榜类型 */
        private btn_flag: number;
        /** 存放好友账号 */
        private _friendIdArr: Array<any> = [];
        /** 存放好友账号的字典，用于查询 */
        private _FriendIdDic: Laya.Dictionary;
        /**好友属性面板 */
        private _contactCharacterMediator: friend.ContactCharacterMediator;
        /** 存放一级某榜按钮的字典 */
        private _rankBtnDic: Laya.Dictionary;
        /** 存放点击某一级榜按钮，生成的二级按钮数目的字典 */
        private _createBtnNumDic: Laya.Dictionary;
        /** 临时存放二级榜菜单按钮的数组 */
        private _tempBtnArray: Array<any> = [];
        /** 存放榜名字的字典 */
        private _rankNameDic: Laya.Dictionary;
        /** 存放榜类型的字典 */
        private _rankTypeDic: Laya.Dictionary;
        /** 指向上一次一级菜单按钮的name属性 */
        private _lastFirstBtnName: string = '';
        /** 指向上一次二级菜单按钮的name属性 */
        private _lastSecondaryBtnName: string = '';
        /** 指向上一次刷新时所获取到的某个排行榜列表信息数据 */
        private _lastRankListInfoData: Array<any> = [];
        /** 判断当前排行榜列表后续是否还有页数 */
        private _hasMore: number = 0;//0：后面还有也是，1：已经是最后一页
        /** 表示向服务器请求的排行榜列表页数 */
        private _requestPageNum: number = 0;//默认先从0开始，也就是第一页开始
        /** 指向上一次刷新列表数据时，排行榜列表内容个数 */
        private _rankListLength: number = 0;
        /** 飘窗 */
        private _disappearMessageTipsMediator: DisappearMessageTipsMediator;
        /** 存放榜单上某排名的宠物信息查看数据 */
        private _petInfoData: any;
        /** 宠物详细信息查看界面 */
        private _petXiangQingMediator: modules.pet.PetXiangQingMediator;
        /** 鼠标点击时，当前x位置 */
        private _xPos: number;
        /** 鼠标点击时，当前y位置 */
        private _yPos: number;
        /** 玩家自己排名信息数据 */
        private _myRankInfoData: any;
        /** 玩家当前等级 */
        private _myLevel: number;
        /** 各类排行榜的列表数据 */
        private _list_data: Array<any>;
        /** 综合评分界面所需要用到信息数据 */
        private _zonghe_pingfen_data: Laya.Dictionary = new Dictionary();
        /** 职业配置信息数据 */
        private _schoolInfo: Object = {};
        /** 当前使用的列名宽度 */
        private curr_kuandu_arr: Array<any> = [];
        /** 存放上一次被选中的排行榜某个名次 */
        private lastSelectDataArr: Array<any> = [];

        constructor(app: AppBase) {
            super(app.uiRoot.general);
            this._viewUI = new ui.common.RanKingListUI();
            this._viewUI_petInfo = new ui.common.PetXiangQingUI();
            this._clientWidth = app.clientWidth;
            this._clientHeight = app.clientHeight;
            this._app = app;
        }


        public show(): void {
            super.show();
            this.lastSelectDataArr = [];
            //排行榜的初始化           
            this._init();
            //注册事件
            this.registerEvent();
            mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
        }
        ///////////////
        ///事件
        ////////////////
        /**注册事件
         * @describe  UI的事件监听注册与消息监听注册
         */
        private registerEvent(): void {
            //UI事件
            this._viewUI.close_btn.on(LEvent.CLICK, this, this.clickCloseBtn);
            this._viewUI.roleInfoRank_btn.on(LEvent.CLICK, this, this.createBtnList, [this._viewUI.roleInfoRank_btn]);
            this._viewUI.schoolRank_btn.on(LEvent.CLICK, this, this.createBtnList, [this._viewUI.schoolRank_btn]);
            this._viewUI.factionRank_btn.on(LEvent.CLICK, this, this.createBtnList, [this._viewUI.factionRank_btn]);
            this._viewUI.bPFubrnRacingRank_btn.on(LEvent.CLICK, this, this.createBtnList, [this._viewUI.bPFubrnRacingRank_btn]);
            this._viewUI.PKRank_btn.on(LEvent.CLICK, this, this.createBtnList, [this._viewUI.PKRank_btn]);
            this._viewUI.redPackRank_btn.on(LEvent.CLICK, this, this.createBtnList, [this._viewUI.redPackRank_btn]);
            this._viewUI.flowerRank_btn.on(LEvent.CLICK, this, this.createBtnList, [this._viewUI.flowerRank_btn]);
            //消息事件
            models.RanKingListProxy.getInstance().on(models.GET_RANKLIST_INFODATA_EVENT, this, this.refreshData_1);
            models.RanKingListProxy.getInstance().on(models.GET_ROLE_RANKLIS_INFO2DATA_EVENT, this, this.refreshData_2);
            sale.models.SaleProxy._instance.on(sale.models.SMarketPetTips, this, this.refreshData_3);
            models.RanKingListProxy.getInstance().on(models.GET_ROLE_RANKLIS_INFODATA_EVENT, this, this.reqShowUI);
            mainhud.models.HudProxy.getInstance().on(mainhud.models.SRefreshRoleData_EVENT, this, this.updateMyRankInfo);
            models.RanKingListProxy.getInstance().on(models.GET_CLANDATA, this, this.showClanDetails);
        }
        /** 显示帮派详情 */
        private showClanDetails(): void {
            let _gonghuiDetails = new GongHuiXiangQingMediator(this._app);
            let dataArr = models.RanKingListModel.getInstance().clanDetailArr;
            if (dataArr) {
                _gonghuiDetails.onShow(dataArr);
            }
        }
        /**
         * 更新玩家在排行榜的信息
         */
        private updateMyRankInfo(): void {
            if (mainhud.models.HudModel.getInstance().levelNum) {
                this._myLevel = mainhud.models.HudModel.getInstance().levelNum;
            }
            else {
                this._myLevel = createrole.models.LoginModel.getInstance().roleDetail.level;
            }
        }
        /**
         * 发请请求
         * @describe 在等级排行榜处，显示查看玩家信息的UI窗口
         * @param roleid 所要查看玩家信息对应的玩家id
         * @param lookRoleInfoDat 等级排行榜上某名名次玩家信息查看下发数据
         */
        private reqShowUI(roleid: number, lookRoleInfoDat: any): void {
            RequesterProtocols._instance.c2s_CReqRoleTeamState(roleid);
            friend.models.FriendProxy.getInstance().once(friend.models.SRequestUpdateRoleInfo_EVENT,this,this.showContactUI,[roleid,lookRoleInfoDat]);
            RequesterProtocols._instance.c2s_CRequestUpdateRoleInfo(roleid);            
        }
        /** 显示查看界面UI */
        private showContactUI(roleid: number, lookRoleInfoDat: any):void{
            let _roleInfoBean:game.modules.friend.models.InfoBeanVo = FriendModel.getInstance().SRequestUpdateRoleInfoData.get("data").FriendInfoBean;
            let xPos = this._xPos;
            let yPos = this._yPos;
            this._contactCharacterMediator = new modules.friend.ContactCharacterMediator(this._viewUI, this._app);
            this._contactCharacterMediator.onUpdataRoleInfo(lookRoleInfoDat, _roleInfoBean.online);
            //判断当前查看的是不是自己好友
            if (this._FriendIdDic.get(roleid) != undefined) {
                this._contactCharacterMediator.onShow(xPos, yPos, FriendEnum.FRIEND_KEY);
            }
            else {
                this._contactCharacterMediator.onShow(xPos, yPos, FriendEnum.STRANGE_KEY);
            }
        }
        /**
         * 刷新宠物排行榜榜上某排名的宠物信息数据
         * @describe 刷新完数据，并显示宠物详细信息数据的UI窗口
         * @param pettips 宠物信息数据
         */
        private refreshData_3(pettips: any): void {
            this._petInfoData = pettips;
            this._petXiangQingMediator = new modules.pet.PetXiangQingMediator(this._app);
            this._petXiangQingMediator.init(this._petInfoData);
        }

        /**
         * 点击一级菜单按钮，生成二级菜单按钮
         * @describe 
         * @param btn 当前被选中的第一级某个榜单按钮
         */
        private createBtnList(btn: Laya.Button): void {
            //临时存放二级榜按钮数组不为空或者不是未定义的
            if (this._tempBtnArray.length != 0) {
                for (let i = 0; i < this._tempBtnArray.length - 1; i++) {
                    //面板就删除该数组里存放的元素
                    this._viewUI.rankBtn_panel.removeChildByName(i + "");
                }
                //二级按钮删除后，置空
                this._lastSecondaryBtnName = '';
                //获取上一次被选择的一级按钮
                let _tempbtn: Laya.Button = this._viewUI.rankBtn_panel.getChildByName(this._lastFirstBtnName) as Laya.Button;
                //将其设为不选中状态
                _tempbtn.selected = false;
                //临时放二级按钮的数组置空，以便存放新的一组二级按钮
                this._tempBtnArray = [];
                //删除二级按钮后，进行一级按钮状态调整以及位置调整
                for (let index = this._rankBtnDic.keys.length; index > 0; index--) {//索引从最末尾开始
                    if (this._rankBtnDic.get(index) != _tempbtn) {//如果不是上一次被选中的一级按钮
                        let _btn = this._rankBtnDic.get(index);
                        //就对其Y轴位置进行调整                        
                        _btn.y = _btn.y - 80 * this._createBtnNumDic.get(_tempbtn) - 2;
                    }
                    else {//如果是上一次被选中的一级按钮，就跳出当前删除二级按钮的for循环
                        break;
                    }
                }
                //如果最新的被点击按钮跟上一次的相同，则返回==》达到点击同一个一级按钮收起二级菜单按钮
                if (btn == _tempbtn) {
                    return;
                }
            }
            //将当前被选中的一级按钮设为被选中状态
            btn.selected = true;
            //将当前被选中的一级按钮的name属性赋值给_lastFirstBtnName，以便其它地方能快速索引到该按钮
            this._lastFirstBtnName = btn.name;
            /** 存放被选中的一级按钮，要生成几个二级按钮的个数 */
            let createBtnNum: number = this._createBtnNumDic.get(btn);
            /** 存放被选中的一级按钮下的各个二级按钮的名字 */
            let rankNameArray = this._rankNameDic.get(btn);
            /** 存放被选中的一级按钮下各个二级按钮所对应的某个排行榜类型 */
            let rankTypeArray = this._rankTypeDic.get(btn);
            for (let i = 0; i < createBtnNum; i++) {
                /** 新生成的二级按钮 */
                let newBtn: Laya.Button = new Laya.Button();
                newBtn.width = 200;
                newBtn.height = 80;
                newBtn.skin = "common/ui/tongyong/ButtonSort1.png"
                newBtn.stateNum = 2;
                //生成的二级按钮的name属性赋值为i，能在要删除二级按钮的时候快速索引到
                newBtn.name = i.toString();//i是number类型，所以使其string化
                newBtn.label = rankNameArray[i];
                newBtn.labelColors = "#50321a,#50321a";
                newBtn.labelFont = "SimHei";
                newBtn.labelSize = 28;
                this._viewUI.rankBtn_panel.addChild(newBtn);
                this._tempBtnArray.push(newBtn);
                //二级按钮位置调整
                newBtn.x = 16;
                newBtn.y = 80 * i + btn.height + 2 + btn.y;
                //为生成的二级菜单按钮添加事件监听
                newBtn.on(LEvent.CLICK, this, this.sendRequest, [rankTypeArray[i], newBtn.name]);
                //默认被选中的发起请求
                if (i == 0) {
                    this.sendRequest(rankTypeArray[i], i + "");
                }
            }
            // //视角锁定在被选中的一级按钮那
            this._viewUI.rankBtn_panel.scrollTo(null, btn.y);
            //在临时存放按钮的数组里再放一个被选择的一级按钮
            this._tempBtnArray.push(btn);
            //修正一级按钮的位置
            for (let index = this._rankBtnDic.keys.length; index > 0; index--) {//索引从最末尾开始
                if (this._rankBtnDic.get(index) != btn) {//如果不是被选中的一级按钮
                    let _btn = this._rankBtnDic.get(index);
                    //就对其Y轴进行调整
                    _btn.y = _btn.y + 80 * createBtnNum + 2;
                }
                else {//如果是，就返回
                    return;
                }
            }
        }
        /**
         * 向服务器发起请求，索取该二级按钮所对应排行榜类型的数据
         * @describe 二级菜单按钮被点击，即某个二级榜按钮被点击，就发起请求
         * @param _rankType 排行榜类型
         * @param _btnName 二级按钮的name属性
         */
        private sendRequest(_rankType: number, _btnName: string): void {
            //先判断_lastSecondaryBtnName是否为空
            if (this._lastSecondaryBtnName != "") {
                //判断当前被点击的二级按钮是否与上一次被点击的一样
                if (_btnName == this._lastSecondaryBtnName) {//是，就返回，以免重复发起请求
                    return;
                }
                else {//不是
                    let _lastbtn: Laya.Button = this._viewUI.rankBtn_panel.getChildByName(this._lastSecondaryBtnName) as Laya.Button;
                    //就将上一次被点击选中的二级按钮设为没被选中的状态
                    _lastbtn.selected = false;
                }
            }
            //发起请求,请求的页数需重新置零，以防其他地方数据干扰
            this._requestPageNum = 0;
            //当新的按钮被选中，数据置空
            this._lastRankListInfoData = [];
            //当新的按钮被选中，榜内列表数据长度置零            
            this._rankListLength = 0;
            RequesterProtocols._instance.c2s_request_ranklist(_rankType, this._requestPageNum);
            this._rank_listUI_init(_rankType);
            //this._list_init(_rankType);
            let xiaoBtn: Laya.Button = this._viewUI.rankBtn_panel.getChildByName(_btnName) as Laya.Button;
            //将当前被点击二级按钮设为被选中的状态
            xiaoBtn.selected = true;
            //将上一次按的按钮name赋值为当前的name值
            this._lastSecondaryBtnName = _btnName;
        }

        /**
         * 更新好友信息数据
         */
        private updateFriendData(): void {
            let _friendIdArr = friend.models.FriendModel._instance.friendIdArr;
            this._FriendIdDic = new Laya.Dictionary();
            for (let i = _friendIdArr.length; i > 0; i--) {
                this._FriendIdDic.set(_friendIdArr[i], true);//好友id为该字典的id，true为该字典的key，意思是好友
            }
        }

        /**
         * 排行榜的初始化
         * @describe 第一次打开排行榜，默认是显示个人信息榜初始榜
         */
        private _init(): void {
            //获取职业配置信息数据
            this._schoolInfo = createrole.models.LoginModel.getInstance().schoolInfo;
            //获取友好，在某些排行榜里查看角色信息时，需要用到好友信息数据
            this.updateFriendData();
            //榜按钮初始化            
            this._rank_btnUI_init();
        }


        /**
         * 排行榜信息盒子重新刷状态
         * @param btn 选择显示盒子样式
         */
        private _rank_box_refresh(btn: number): void {
            switch (btn) {
                case 1://五个列名的盒子显示
                    this._viewUI.personal_box.visible = true;
                    this._viewUI.personalChongWu_box.visible = false;
                    this._viewUI.bangPaiFuBenJingSu_box.visible = false;
                    break;
                case 2://四个列名的盒子显示
                    this._viewUI.personal_box.visible = false;
                    this._viewUI.personalChongWu_box.visible = true;
                    this._viewUI.bangPaiFuBenJingSu_box.visible = false;
                    break;
                case 3://六个列名的盒子显示
                    this._viewUI.personal_box.visible = false;
                    this._viewUI.personalChongWu_box.visible = false;
                    this._viewUI.bangPaiFuBenJingSu_box.visible = true;
                    break;
            }
        }

        /**
         * 榜的一级按钮UI初始化
         * @describe UI数据的存放与获取
         */
        private _rank_btnUI_init(): void {
            this._viewUI.rankBtn_panel.vScrollBarSkin = '';
            this._viewUI.rankBtn_panel.vScrollBar.elasticBackTime = 200;
            this._viewUI.rankBtn_panel.vScrollBar.elasticDistance = 100;
            /** 存放一级榜按钮到数组 */
            let rankBtnArray: Array<any> = [this._viewUI.roleInfoRank_btn, this._viewUI.schoolRank_btn, this._viewUI.factionRank_btn, this._viewUI.bPFubrnRacingRank_btn, this._viewUI.PKRank_btn, this._viewUI.redPackRank_btn, this._viewUI.flowerRank_btn];
            /** 存放生成二级榜按钮数目的数组 */
            let createBtnNumArray: Array<any> = [4, 9, 2, 1, 6, 1, 2];//写死的，并没有相关配置表可读取
            this._rankBtnDic = new Laya.Dictionary();
            this._createBtnNumDic = new Laya.Dictionary();
            for (let i = rankBtnArray.length; i > 0; i--) {
                this._rankBtnDic.set(i, rankBtnArray[i - 1]);
                this._createBtnNumDic.set(rankBtnArray[i - 1], createBtnNumArray[i - 1]);
            }
            this._pickUPRankName(rankBtnArray);
            this.createBtnList(this._viewUI.roleInfoRank_btn);//默认每次打开都是一级按钮--个人信息榜被选中
        }
        /**
         * 获取榜名字
         * @describe 从RanKingListModel里的paiHangBangDic提取出各个二级菜单按钮的label，即榜名称
         *          并存放到字典中去
         * @param _array 存放一级按钮的数据
         */
        private _pickUPRankName(_array: Array<any>): void {
            let _dic = models.RanKingListModel.getInstance().paiHangBangDic;
            /** 人物综合实力 */
            let _rankName_1 = _dic[RankType.ROLE_ZONGHE_RANK]["leixing"];
            /** 等级 */
            let _rankName_2 = _dic[RankType.LEVEL_RANK]["leixing"];
            /** 人物 */
            let _rankName_3 = _dic[RankType.ROLE_RANK]["leixing"];
            /** 宠物 */
            let _rankName_4 = _dic[RankType.PET_GRADE_RANK]["leixing"];
            /** 云霄殿 */
            let _rankName_5 = _dic[RankType.PROFESSION_WARRIOR_RANK]["leixing"];
            /** 天雷狱 */
            let _rankName_6 = _dic[RankType.PROFESSION_MAGIC_RANK]["leixing"];
            /** 无量宫 */
            let _rankName_7 = _dic[RankType.PROFESSION_PRIEST_RANK]["leixing"];
            /** 大荒岭 */
            let _rankName_8 = _dic[RankType.PROFESSION_PALADIN_RANK]["leixing"];
            /** 苍羽宫 */
            let _rankName_9 = _dic[RankType.PROFESSION_HUNTER_RANK]["leixing"];
            /** 飞雪崖 */
            let _rankName_10 = _dic[RankType.PROFESSION_DRUID_RANK]["leixing"];
            /** 七星观 */
            let _rankName_11 = _dic[RankType.PROFESSION_ROGUE_RANK]["leixing"];
            /** 玄冥池 */
            let _rankName_12 = _dic[RankType.PROFESSION_SAMAN_RANK]["leixing"];
            /** 丹阳观 */
            let _rankName_13 = _dic[RankType.PROFESSION_WARLOCK_RANK]["leixing"];
            /** 帮派等级 */
            let _rankName_14 = _dic[RankType.FACTION_RANK_LEVEL]["leixing"];
            /** 帮派综合实力 */
            let _rankName_15 = _dic[RankType.FACTION_ZONGHE]["leixing"];
            /** 帮派副本竞速 */
            let _rankName_16 = _dic[RankType.FACTION_COPY]["leixing"];
            /** 上届精英组 */
            let _rankName_17 = _dic[RankType.PVP5_LAST_GRADE1]["leixing"];
            /** 上届神威组 */
            let _rankName_18 = _dic[RankType.PVP5_LAST_GRADE2]["leixing"];
            /** 上届王者组 */
            let _rankName_19 = _dic[RankType.PVP5_LAST_GRADE3]["leixing"];
            /** 历史精英组 */
            let _rankName_20 = _dic[RankType.PVP5_HISTORY_GRADE1]["leixing"];
            /** 历史神威组 */
            let _rankName_21 = _dic[RankType.PVP5_HISTORY_GRADE2]["leixing"];
            /** 历史王者组 */
            let _rankName_22 = _dic[RankType.PVP5_HISTORY_GRADE3]["leixing"];
            /** 世界红包 */
            let _rankName_23 = _dic[RankType.RED_PACK_1]["leixing"];
            /** 魅力收花 */
            let _rankName_24 = _dic[RankType.FLOWER_RECEIVE]["leixing"];
            /** 魅力送花 */
            let _rankName_25 = _dic[RankType.FLOWER_GIVE]["leixing"];
            /** 存放个人信息榜下的二级菜单按钮名字的数组 */
            let _rankNameArray_1 = [_rankName_1, _rankName_2, _rankName_3, _rankName_4];
            /** 存放个人信息榜下的二级菜单按钮排行榜类型的数组 */
            let _rankTypeArray_1 = [RankType.ROLE_ZONGHE_RANK, RankType.LEVEL_RANK, RankType.ROLE_RANK, RankType.PET_GRADE_RANK];
            /** 存放门派榜下的二级菜单按钮名字的数组 */
            let _rankNameArray_2 = [_rankName_5, _rankName_6, _rankName_7, _rankName_8, _rankName_9, _rankName_10, _rankName_11, _rankName_12, _rankName_13];
            /** 存放门派榜下的二级菜单按钮排行榜类型的数组 */
            let _rankTypeArray_2 = [RankType.PROFESSION_WARRIOR_RANK, RankType.PROFESSION_MAGIC_RANK, RankType.PROFESSION_PRIEST_RANK, RankType.PROFESSION_PALADIN_RANK, RankType.PROFESSION_HUNTER_RANK, RankType.PROFESSION_DRUID_RANK, RankType.PROFESSION_ROGUE_RANK, RankType.PROFESSION_SAMAN_RANK, RankType.PROFESSION_WARLOCK_RANK];
            /** 存放帮派榜下的二级菜单按钮名字的数组 */
            let _rankNameArray_3 = [_rankName_14, _rankName_15];
            /** 存放帮派榜下的二级菜单按钮排行榜类型的数组 */
            let _rankTypeArray_3 = [RankType.FACTION_RANK_LEVEL, RankType.FACTION_ZONGHE];
            /** 存放帮派副本竞速榜下的二级菜单按钮名字的数组 */
            let _rankNameArray_4 = [_rankName_16];
            /** 存放帮派副本竞速榜下的二级菜单按钮排行榜类型的数组 */
            let _rankTypeArray_4 = [RankType.FACTION_COPY];
            /** 存放大道排行榜下的二级菜单按钮名字的数组 */
            let _rankNameArray_5 = [_rankName_17, _rankName_18, _rankName_19, _rankName_20, _rankName_21, _rankName_22];
            /** 存放大道排行榜下的二级菜单按钮排行榜类型的数组 */
            let _rankTypeArray_5 = [RankType.PVP5_LAST_GRADE1, RankType.PVP5_LAST_GRADE2, RankType.PVP5_LAST_GRADE3, RankType.PVP5_HISTORY_GRADE1, RankType.PVP5_HISTORY_GRADE2, RankType.PVP5_HISTORY_GRADE3];
            /** 存放世界红包榜下的二级菜单按钮名字的数组 */
            let _rankNameArray_6 = [_rankName_23];
            /** 存放世界红包榜下的二级菜单按钮排行榜类型的数组 */
            let _rankTypeArray_6 = [RankType.RED_PACK_1];
            /** 存放鲜花速榜下的二级菜单按钮名字的数组 */
            let _rankNameArray_7 = [_rankName_24, _rankName_25];
            /** 存放鲜花速榜下的二级菜单按钮排行榜类型的数组 */
            let _rankTypeArray_7 = [RankType.FLOWER_RECEIVE, RankType.FLOWER_GIVE];
            /** 存放榜名字数组的数组 */
            let _rankNameArray = [_rankNameArray_1, _rankNameArray_2, _rankNameArray_3, _rankNameArray_4, _rankNameArray_5, _rankNameArray_6, _rankNameArray_7];
            /** 存放榜类型数组的数组 */
            let _rankTypeArray = [_rankTypeArray_1, _rankTypeArray_2, _rankTypeArray_3, _rankTypeArray_4, _rankTypeArray_5, _rankTypeArray_6, _rankTypeArray_7];
            this._rankNameDic = new Laya.Dictionary();
            this._rankTypeDic = new Laya.Dictionary();
            for (let i = _array.length; i > 0; i--) {
                //用一级按钮来作为字典的id，分别用二级按钮的名字与其对应榜的类型作为字典value
                this._rankNameDic.set(_array[i - 1], _rankNameArray[i - 1]);
                this._rankTypeDic.set(_array[i - 1], _rankTypeArray[i - 1]);
            }
        }

        /**
         * 排行榜的列名初始化
         @param btn 排行榜类型
         */
        private _rank_listUI_init(btn: number): void {
            /** 获取加载了排行榜配置表的_Dic */
            //dic=map<id,vo>
            //dic[id] = vo
            let _rankUI_label_vo: CpaihangbangBaseVo = models.RanKingListModel.getInstance().paiHangBangDic[btn];
            /** 存放排行榜列名 */
            let _label_name: Array<string> = [_rankUI_label_vo.name1, _rankUI_label_vo.name2, _rankUI_label_vo.name3, _rankUI_label_vo.name4, _rankUI_label_vo.name5, _rankUI_label_vo.name6];
            /** 存放排行榜列名所占的宽度 */
            let _label_kuandu: Array<number> = [_rankUI_label_vo.kuandu1, _rankUI_label_vo.kuandu2, _rankUI_label_vo.kuandu3, _rankUI_label_vo.kuandu4, _rankUI_label_vo.kuandu5, _rankUI_label_vo.kuandu6];
            this.curr_kuandu_arr = _label_kuandu;
            /** 要显示排行榜样式盒子的类型 */
            let _btn_type: number = 0;
            if (_label_name[4] != "" && _label_name[5] != "") {            //6个列名的情况
                _btn_type = 3;
                this._rank_box_refresh(_btn_type);
                let _rankUI_label_box: Laya.Box = this._viewUI.bangPaiFuBenJingSu_box.getChildByName("title_box") as Laya.Box;
                for (let index: number = _rankUI_label_box.numChildren - 1; index > -1; index--) {
                    let _UIlabel: Laya.Label = _rankUI_label_box.getChildAt(index) as Laya.Label;
                    _UIlabel.text = _label_name[index];
                    _UIlabel.width = 444 * _label_kuandu[index];
                    this.initColumnX(_UIlabel, _label_kuandu, index, true);
                }
            } else if (_label_name[4] != "" && _label_name[5] === "") {     //5个列名的情况
                _btn_type = 1;
                this._rank_box_refresh(_btn_type);
                let _rankUI_label_box: Laya.Box = this._viewUI.personal_box.getChildByName("title_box") as Laya.Box;
                for (let index: number = _rankUI_label_box.numChildren - 1; index > -1; index--) {
                    let _UIlabel: Laya.Label = _rankUI_label_box.getChildAt(index) as Laya.Label;
                    _UIlabel.text = _label_name[index];
                    _UIlabel.width = 444 * _label_kuandu[index];
                    this.initColumnX(_UIlabel, _label_kuandu, index, true);
                }
            } else if (_label_name[4] === "" && _label_name[5] === "") {    //4个列名的情况
                _btn_type = 2;
                this._rank_box_refresh(_btn_type);
                let _rankUI_label_box: Laya.Box = this._viewUI.personalChongWu_box.getChildByName("title_box") as Laya.Box;
                for (let index: number = _rankUI_label_box.numChildren - 1; index > -1; index--) {
                    let _UIlabel: Laya.Label = _rankUI_label_box.getChildAt(index) as Laya.Label;
                    _UIlabel.text = _label_name[index];
                    _UIlabel.width = 444 * _label_kuandu[index];
                    this.initColumnX(_UIlabel, _label_kuandu, index, true);
                }
            }

        }
        /** 初始化列名的x坐标
         * @param _UIlabel 列名UI
         * @param _label_kuandu 列名宽度
         * @param index 第几列名
         * @param flag 是否需要初始化第一个列名的X坐标
         */
        private initColumnX(_UIlabel: Laya.Label, _label_kuandu: Array<any>, index: number, flag: boolean): void {
            if (index != 0) {
                let x_scale: number = 0;
                for (let j = 0; j < index; j++) {
                    x_scale += _label_kuandu[j];
                }
                _UIlabel.x = 444 * x_scale;
            }
            else if (flag) {
                _UIlabel.x = 0;
            }
        }
        /**
         * 初始化排行榜列表
         * @param btn 排行榜类型
         * @describe 根据排行榜类型来选择以哪种列表样式来显示
         */
        private _list_init(btn: number): void {
            switch (btn) {
                case RankType.LEVEL_RANK:
                case RankType.PET_GRADE_RANK:
                case RankType.PROFESSION_WARRIOR_RANK:
                case RankType.PROFESSION_MAGIC_RANK:
                case RankType.PROFESSION_PRIEST_RANK:
                case RankType.PROFESSION_PALADIN_RANK:
                case RankType.PROFESSION_HUNTER_RANK:
                case RankType.PROFESSION_DRUID_RANK:
                case RankType.FACTION_RANK_LEVEL:
                case RankType.FACTION_ZONGHE:
                case RankType.PROFESSION_ROGUE_RANK:
                case RankType.PROFESSION_SAMAN_RANK:
                case RankType.PROFESSION_WARLOCK_RANK:
                case RankType.PVP5_LAST_GRADE1:
                case RankType.PVP5_LAST_GRADE2:
                case RankType.PVP5_LAST_GRADE3:
                case RankType.PVP5_HISTORY_GRADE1:
                case RankType.PVP5_HISTORY_GRADE2:
                case RankType.PVP5_HISTORY_GRADE3:
                case RankType.RED_PACK_1:
                //case RankType.RED_PACK_2:
                case RankType.FLOWER_RECEIVE:
                case RankType.FLOWER_GIVE:
                    this.curr_list = this._viewUI.ranking_pet_list;
                    this.showMyRank_2();
                    break;
                case RankType.ROLE_ZONGHE_RANK:
                case RankType.ROLE_RANK:
                    this.curr_list = this._viewUI.ranking_personal_list;
                    this.showMyRank_1();
                    break;
                case RankType.FACTION_MC:
                case RankType.FACTION_NAXX:
                case RankType.FACTION_COPY:
                    this.curr_list = this._viewUI.ranking_fuben_list;
                    this.showMyRank_3();
                    break;
                default:
                    break;
            }
            this.showList(this.curr_list);
            let data: Array<any> = [];
            for (let i = 0; i < this._list_data.length; i++) {
                let str;
                if (i % 2 != 0) {
                    str = "common/ui/tongyong/common_list_3textbg2.png";
                }
                else {
                    str = "common/ui/tongyong/common_xuanzhongkuang.png";
                }
                data.push({ select_btn: { skin: str } });
            }
            this.curr_list.array = data;
            this.curr_list.repeatX = 1;
            if (this.curr_list.array.length <= 12) {
                this.curr_list.repeatY = 12;
            }
            else {
                this.curr_list.repeatY = this.curr_list.array.length;
            }
            this.curr_list.vScrollBarSkin = '';
            this.curr_list.scrollBar.elasticBackTime = 200;
            this.curr_list.scrollBar.elasticDistance = 100;
            this.btn_flag = btn;
            switch (btn) {
                case RankType.LEVEL_RANK:
                    this.curr_list.renderHandler = new Laya.Handler(this, this.onListRender_1);
                    break;
                case RankType.PET_GRADE_RANK:
                    this.curr_list.renderHandler = new Laya.Handler(this, this.onListRender_2);
                    break;
                case RankType.PROFESSION_WARRIOR_RANK:
                case RankType.PROFESSION_MAGIC_RANK:
                case RankType.PROFESSION_PRIEST_RANK:
                case RankType.PROFESSION_PALADIN_RANK:
                case RankType.PROFESSION_HUNTER_RANK:
                case RankType.PROFESSION_DRUID_RANK:
                case RankType.PROFESSION_ROGUE_RANK:
                case RankType.PROFESSION_SAMAN_RANK:
                case RankType.PROFESSION_WARLOCK_RANK:
                    this.curr_list.renderHandler = new Laya.Handler(this, this.onListRender_3);
                    break;
                case RankType.PVP5_LAST_GRADE1:
                case RankType.PVP5_LAST_GRADE2:
                case RankType.PVP5_LAST_GRADE3:
                case RankType.PVP5_HISTORY_GRADE1:
                case RankType.PVP5_HISTORY_GRADE2:
                case RankType.PVP5_HISTORY_GRADE3:
                    this.curr_list.renderHandler = new Laya.Handler(this, this.onListRender_4);
                    break;
                case RankType.RED_PACK_1:
                //case RankType.RED_PACK_2:
                case RankType.FLOWER_RECEIVE:
                case RankType.FLOWER_GIVE:
                    this.curr_list.renderHandler = new Laya.Handler(this, this.onListRender_5);
                    break;
                case RankType.ROLE_ZONGHE_RANK:
                case RankType.ROLE_RANK:
                    this.curr_list.renderHandler = new Laya.Handler(this, this.onListRender_6);
                    break;
                case RankType.FACTION_MC:
                case RankType.FACTION_NAXX:
                    this.curr_list.renderHandler = new Laya.Handler(this, this.onListRender_7);
                case RankType.FACTION_COPY:
                    this.curr_list.renderHandler = new Laya.Handler(this, this.onListRender_8);
                    break;
                case RankType.FACTION_RANK_LEVEL:
                case RankType.FACTION_ZONGHE:
                    this.curr_list.renderHandler = new Laya.Handler(this, this.onListRender_9);
                    break;
                default:
                    break;
            }
            //判断滚动条是否拉到底部
            this.curr_list.scrollBar.changeHandler = new Handler(this, this.onChange);
            // //判断列表长度是否改变
            // if(this._rankListLength !=0 || this.curr_list.array.length > this._rankListLength){
            //     this.curr_list.scrollTo(this._rankListLength);
            // }
            // this._rankListLength = this.curr_list.array.length;
        }
        /** 显示用哪个list */
        private showList(lst): void {
            switch (lst) {
                case this._viewUI.ranking_pet_list:
                    this._viewUI.ranking_pet_list.visible = true;
                    this._viewUI.ranking_personal_list.visible = false;
                    this._viewUI.ranking_fuben_list.visible = false;
                    break;
                case this._viewUI.ranking_personal_list:
                    this._viewUI.ranking_pet_list.visible = false;
                    this._viewUI.ranking_personal_list.visible = true;
                    this._viewUI.ranking_fuben_list.visible = false;
                    break;
                case this._viewUI.ranking_fuben_list:
                    this._viewUI.ranking_pet_list.visible = false;
                    this._viewUI.ranking_personal_list.visible = false;
                    this._viewUI.ranking_fuben_list.visible = true;
                    break;
            }
        }
        /** 4个列名排行榜列表的点击查看某个名次信息 */
        private onSelectRender_1(index: number): void {
            let id: any;
            switch (this.btn_flag) {
                case RankType.LEVEL_RANK:
                case RankType.ROLE_ZONGHE_RANK:
                case RankType.ROLE_RANK:
                case RankType.PROFESSION_WARRIOR_RANK:
                case RankType.PROFESSION_MAGIC_RANK:
                case RankType.PROFESSION_PRIEST_RANK:
                case RankType.PROFESSION_PALADIN_RANK:
                case RankType.PROFESSION_HUNTER_RANK:
                case RankType.PROFESSION_DRUID_RANK:
                case RankType.PROFESSION_ROGUE_RANK:
                case RankType.PROFESSION_SAMAN_RANK:
                case RankType.PROFESSION_WARLOCK_RANK:
                case RankType.RED_PACK_1:
                //case RankType.RED_PACK_2:
                case RankType.FLOWER_RECEIVE:
                case RankType.FLOWER_GIVE:
                    id = this._list_data[index]["roleid"];
                    break;
                case RankType.PET_GRADE_RANK:
                    id = this._list_data[index]["uniquePetId"];
                    break;
                case RankType.FACTION_RANK_LEVEL:
                case RankType.FACTION_ZONGHE:
                    id = this._list_data[index]["factionid"];
                    break;
                case RankType.PVP5_LAST_GRADE1:
                case RankType.PVP5_LAST_GRADE2:
                case RankType.PVP5_LAST_GRADE3:
                case RankType.PVP5_HISTORY_GRADE1:
                case RankType.PVP5_HISTORY_GRADE2:
                case RankType.PVP5_HISTORY_GRADE3:
                    break;
            }
            if (!id) {
                return;
            }
            this.rank_info_see(id, index);
        }
        /**
         * 锁定排行榜视角
         * @describe 该函数方法体中的20是指排行榜每一页20个数据
         */
        private onScrollTo(index: number): void {
            if (this.curr_list.array.length < 20) return;
            if (index != this.curr_list.array.length - 1) return;
            if (this.curr_list.array.length == 20) {
                this._rankListLength = 20;
                return;
            }
            //判断列表长度是否改变
            if (this.curr_list.array.length > this._rankListLength) {
                this.curr_list.scrollTo(this._rankListLength - 1);
            }
            this._rankListLength = this.curr_list.array.length;
        }
        /**
         * 判断滚动条位置是否到底部
         */
        private onChange(value: number): void {
            if (value == this.curr_list.scrollBar.max) {
                this._requestPageNum = this._requestPageNum + 0.5;
                if (Math.ceil(this._requestPageNum) % 2 != 0) return;
                if (this._requestPageNum != Math.ceil(this._requestPageNum)) return;
                if (this._hasMore != 1) {
                    RequesterProtocols._instance.c2s_request_ranklist(this.btn_flag, Math.ceil(this._requestPageNum) / 2);
                }
            }
            if (value == this.curr_list.scrollBar.min) {
                this.curr_list.scrollTo(0);
            }
        }
        /** 排行榜列表每行列名X坐标与宽度的初始化
         * @param lab_box 文本容器
         */
        private rankListRowsInit(lab_box: Laya.Box): void {
            let childsNum = lab_box.numChildren;
            for (let i = 0; i < childsNum; i++) {
                let child_lab: Laya.Label = lab_box.getChildAt(i) as Laya.Label
                child_lab.width = 444 * this.curr_kuandu_arr[i];
                this.initColumnX(child_lab, this.curr_kuandu_arr, i, false);
            }
        }
        /** 等级榜所对应的列表信息渲染 */
        private onListRender_1(cell: Box, index: number): void {
            if (index < 0 || index >= this.curr_list.array.length) {
                return;
            }
            let lab_box: Laya.Box = cell.getChildByName("lab_box") as Laya.Box;
            this.rankListRowsInit(lab_box);
            let tubiao_img: Laya.Image = cell.getChildByName("tubiao_img") as Laya.Image;
            let rankingNumber_lab: Laya.Label = lab_box.getChildByName("rankingNumber_lab") as Laya.Label;
            let name_lab: Laya.Label = lab_box.getChildByName("name_lab") as Laya.Label;
            let zhiye_lab: Laya.Label = lab_box.getChildByName("masterName_lab") as Laya.Label;
            let level_lab: Laya.Label = lab_box.getChildByName("grade_lab") as Laya.Label;
            tubiao_img.skin = this.show_rank_tubiao(this._list_data[index]["rank"]);
            if (index == 0 || index == 1 || index == 2) {
                rankingNumber_lab.text = "";
            }
            else {
                rankingNumber_lab.text = this._list_data[index]["rank"];
            }
            name_lab.text = this._list_data[index]["nickname"];
            zhiye_lab.text = this.show_school_name(this._list_data[index]["school"]);
            level_lab.text = this._list_data[index]["level"];
            let select_btn: Laya.Button = cell.getChildByName("select_btn") as Laya.Button;
            select_btn.on(Laya.Event.CLICK, this, this.getMousePos, [select_btn, index]);
            this.setBtnSkin(select_btn);
            cell.visible = true;
            this.onScrollTo(index);
        }
        /** 判断排行榜该行是被选中，如果是就换上为是被选中的图片 */
        private setBtnSkin(btn): void {
            if (this.lastSelectDataArr.length == 0) return;
            let last_btn = this.lastSelectDataArr[0].select_btn
            if (last_btn == btn) {
                btn.skin = "common/ui/tongyong/common_list_3textbg_dwn.png";
            }
        }
        /** 宠物所对应的排行榜列表数据渲染 */
        private onListRender_2(cell: Box, index: number): void {
            if (index < 0 || index >= this.curr_list.array.length) {
                return;
            }
            let lab_box: Laya.Box = cell.getChildByName("lab_box") as Laya.Box;
            this.rankListRowsInit(lab_box);
            let tubiao_img: Laya.Image = cell.getChildByName("tubiao_img") as Laya.Image;
            let rankingNumber_lab: Laya.Label = lab_box.getChildByName("rankingNumber_lab") as Laya.Label;
            let name_lab: Laya.Label = lab_box.getChildByName("name_lab") as Laya.Label;
            let masterName_lab: Laya.Label = lab_box.getChildByName("masterName_lab") as Laya.Label;
            let grade_lab: Laya.Label = lab_box.getChildByName("grade_lab") as Laya.Label;
            tubiao_img.skin = this.show_rank_tubiao(this._list_data[index]["rank"]);
            if (index == 0 || index == 1 || index == 2) {
                rankingNumber_lab.text = "";
            }
            else {
                rankingNumber_lab.text = this._list_data[index]["rank"];
            }
            name_lab.text = this._list_data[index]["petname"];
            masterName_lab.text = this._list_data[index]["nickname"];
            grade_lab.text = this._list_data[index]["petgrade"];
            let select_btn: Laya.Button = cell.getChildByName("select_btn") as Laya.Button;
            select_btn.on(Laya.Event.CLICK, this, this.getMousePos, [select_btn, index]);
            this.setBtnSkin(select_btn);
            cell.visible = true;
            this.onScrollTo(index);
        }
        /**
         * 门派各类排行榜的列表渲染
         */
        private onListRender_3(cell: Box, index: number): void {
            if (index < 0 || index > this.curr_list.array.length) {
                return;
            }
            let lab_box: Laya.Box = cell.getChildByName("lab_box") as Laya.Box;
            this.rankListRowsInit(lab_box);
            let tubiao_img: Laya.Image = cell.getChildByName("tubiao_img") as Laya.Image;
            let rankingNumber_lab: Laya.Label = lab_box.getChildByName("rankingNumber_lab") as Laya.Label;
            let name_lab: Laya.Label = lab_box.getChildByName("name_lab") as Laya.Label;
            let level_lab: Laya.Label = lab_box.getChildByName("masterName_lab") as Laya.Label;
            let score_lab: Laya.Label = lab_box.getChildByName("grade_lab") as Laya.Label;
            tubiao_img.skin = this.show_rank_tubiao(this._list_data[index]["rank"]);
            if (index == 0 || index == 1 || index == 2) {
                rankingNumber_lab.text = "";
            }
            else {
                rankingNumber_lab.text = this._list_data[index]["rank"];
            }
            name_lab.text = this._list_data[index]["rolename"];
            level_lab.text = this._list_data[index]["rolelevel"];
            score_lab.text = this._list_data[index]["score"];
            let select_btn: Laya.Button = cell.getChildByName("select_btn") as Laya.Button;
            select_btn.on(Laya.Event.CLICK, this, this.getMousePos, [select_btn, index]);
            this.setBtnSkin(select_btn);
            cell.visible = true;
            this.onScrollTo(index);
        }
        /** 获取当前鼠标点击位置 */
        private getMousePos(btn, index: number, e): void {
            this.onSelectRender_1(index);
            if (e) {
                this._xPos = e.currentTarget.mouseX;
                this._yPos = e.currentTarget.mouseY;
            }
            //清除上一次的选中特效
            if (this.lastSelectDataArr.length != 0) {
                let last_select_btn = this.lastSelectDataArr[0].select_btn;
                last_select_btn.skin = this.lastSelectDataArr[0].skin;
            }
            //给当前被选中是需要添加选中特效记录下来
            let _tempArr = [];
            index % 2 != 0 ? _tempArr.push({ select_btn: btn, skin: "common/ui/tongyong/common_list_3textbg2.png" }) : _tempArr.push({ select_btn: btn, skin: "common/ui/tongyong/common_xuanzhongkuang.png" });
            this.lastSelectDataArr = _tempArr;
        }
        /**
         * 大道排行榜各类排行榜的列表渲染，即PK榜的列表渲染
         */
        private onListRender_4(cell: Box, index: number): void {
            if (index < 0 || index > this.curr_list.array.length) {
                return;
            }
            let lab_box: Laya.Box = cell.getChildByName("lab_box") as Laya.Box;
            this.rankListRowsInit(lab_box);
            let tubiao_img: Laya.Image = cell.getChildByName("tubiao_img") as Laya.Image;
            let rankingNumber_lab: Laya.Label = lab_box.getChildByName("rankingNumber_lab") as Laya.Label;
            let name_lab: Laya.Label = lab_box.getChildByName("name_lab") as Laya.Label;
            let school_lab: Laya.Label = lab_box.getChildByName("masterName_lab") as Laya.Label;
            let score_lab: Laya.Label = lab_box.getChildByName("grade_lab") as Laya.Label;
            tubiao_img.skin = this.show_rank_tubiao(this._list_data[index]["rank"]);
            if (index == 0 || index == 1 || index == 2) {
                rankingNumber_lab.text = "";
            }
            else {
                rankingNumber_lab.text = this._list_data[index]["rank"];
            }
            name_lab.text = this._list_data[index]["rolename"];
            school_lab.text = this._list_data[index]["school"];
            score_lab.text = this._list_data[index]["score"];
            cell.visible = true;
            this.onScrollTo(index);
        }
        /**
         * 红包榜以及鲜花榜的列表渲染，即PK榜的列表渲染
         */
        private onListRender_5(cell: Box, index: number): void {
            if (index < 0 || index > this.curr_list.array.length) {
                return;
            }
            let lab_box: Laya.Box = cell.getChildByName("lab_box") as Laya.Box;
            this.rankListRowsInit(lab_box);
            let tubiao_img: Laya.Image = cell.getChildByName("tubiao_img") as Laya.Image;
            let rankingNumber_lab: Laya.Label = lab_box.getChildByName("rankingNumber_lab") as Laya.Label;
            let name_lab: Laya.Label = lab_box.getChildByName("name_lab") as Laya.Label;
            let school_lab: Laya.Label = lab_box.getChildByName("masterName_lab") as Laya.Label;
            let num_lab: Laya.Label = lab_box.getChildByName("grade_lab") as Laya.Label;
            tubiao_img.skin = this.show_rank_tubiao(this._list_data[index]["rank"]);
            if (index == 0 || index == 1 || index == 2) {
                rankingNumber_lab.text = "";
            }
            else {
                rankingNumber_lab.text = this._list_data[index]["rank"];
            }
            name_lab.text = this._list_data[index]["rolename"];
            school_lab.text = this.show_school_name(this._list_data[index]["school"]);
            num_lab.text = this._list_data[index]["num"];
            cell.visible = true;
            this.onScrollTo(index);
        }
        /**
         * 综合实力榜和人物评分榜的列表渲染
         */
        private onListRender_6(cell: Box, index: number): void {
            if (index < 0 || index > this.curr_list.array.length || index == this.curr_list.array.length) {
                return;
            }
            let lab_box: Laya.Box = cell.getChildByName("lab_box") as Laya.Box;
            this.rankListRowsInit(lab_box);
            let tubiao_img: Laya.Image = cell.getChildByName("tubiao_img") as Laya.Image;
            let rankingNumber_lab: Laya.Label = lab_box.getChildByName("rankingNumber_lab") as Laya.Label;
            let name_lab: Laya.Label = lab_box.getChildByName("name_lab") as Laya.Label;
            let zhiYe_lab: Laya.Label = lab_box.getChildByName("zhiYe_lab") as Laya.Label;
            let lv_lab: Laya.Label = lab_box.getChildByName("lv_lab") as Laya.Label;
            let zongHeZhanLi_lab: Laya.Label = lab_box.getChildByName("zongHeZhanLi_lab") as Laya.Label;
            tubiao_img.skin = this.show_rank_tubiao(this._list_data[index]["rank"]);
            if (index == 0 || index == 1 || index == 2) {
                rankingNumber_lab.text = "";
            }
            else {
                rankingNumber_lab.text = this._list_data[index]["rank"];
            }
            name_lab.text = this._list_data[index]["rolename"];
            zhiYe_lab.text = this.show_school_name(this._list_data[index]["school"]);
            lv_lab.text = this._list_data[index]["rolelevel"];
            zongHeZhanLi_lab.text = this._list_data[index]["score"];
            let select_btn: Laya.Button = cell.getChildByName("select_btn") as Laya.Button;
            select_btn.on(LEvent.CLICK, this, this.getMousePos, [select_btn, index]);
            this.setBtnSkin(select_btn);
            cell.visible = true;
            this.onScrollTo(index);
        }
        /**
         * 信息查看
         * @param index 排名
         * @param id 玩家、宠物或者帮派的id
         */
        private rank_info_see(id: number, index: number): void {
            if (index == 0 || index > 0) {//查看排行榜列表内的玩家
                RequesterProtocols._instance.c2s_rank_getinfo(this.btn_flag, index, id);
            }
            else {//查看自己的
                RequesterProtocols._instance.c2s_rank_getinfo(this.btn_flag, -1, id);
            }
        }
        /** 公会副本竞速排行榜 */
        private onListRender_7(cell: Box, index: number): void {
            if (index < 0 || index > this.curr_list.array.length) {
                return;
            }
            let lab_box: Laya.Box = cell.getChildByName("lab_box") as Laya.Box;
            this.rankListRowsInit(lab_box);
            let tubiao_img: Laya.Image = cell.getChildByName("tubiao_img") as Laya.Image;
            let rankingNumber_lab: Laya.Label = lab_box.getChildByName("rankingNumber_lab") as Laya.Label;
            let bangPaiName_lab: Laya.Label = lab_box.getChildByName("bangPaiName_lab") as Laya.Label;
            let fuBenName_lab: Laya.Label = lab_box.getChildByName("fuBenName_lab") as Laya.Label;
            let time_lab: Laya.Label = lab_box.getChildByName("cengShu_lab") as Laya.Label;
            let cengShu_lab: Laya.Label = lab_box.getChildByName("daGuiJinDu_lab") as Laya.Label;
            let daGuiJinDu_lab: Laya.Label = lab_box.getChildByName("time_lab") as Laya.Label;
            tubiao_img.skin = this.show_rank_tubiao(this._list_data[index]["rank"]);
            if (index == 0 || index == 1 || index == 2) {
                rankingNumber_lab.text = "";
            }
            else {
                rankingNumber_lab.text = this._list_data[index]["rank"];
            }
            bangPaiName_lab.text = this._list_data[index]["factionname"];
            fuBenName_lab.text = this._list_data[index]["factioncopyname"];
            time_lab.text = this._list_data[index]["progressstime"];
            cengShu_lab.text = this._list_data[index]["progresss"];
            daGuiJinDu_lab.text = this._list_data[index]["bosshp"];
            cell.visible = true;
            this.onScrollTo(index);
        }
        /** 公会副本排行榜 */
        private onListRender_8(cell: Box, index: number): void {
            if (index < 0 || index > this.curr_list.array.length) {
                return;
            }
            let lab_box: Laya.Box = cell.getChildByName("lab_box") as Laya.Box;
            this.rankListRowsInit(lab_box);
            let tubiao_img: Laya.Image = cell.getChildByName("tubiao_img") as Laya.Image;
            let rankingNumber_lab: Laya.Label = lab_box.getChildByName("rankingNumber_lab") as Laya.Label;
            let bangPaiName_lab: Laya.Label = lab_box.getChildByName("bangPaiName_lab") as Laya.Label;
            let fuBenName_lab: Laya.Label = lab_box.getChildByName("fuBenName_lab") as Laya.Label;
            let cengShu_lab: Laya.Label = lab_box.getChildByName("cengShu_lab") as Laya.Label;
            let daGuiJinDu_lab: Laya.Label = lab_box.getChildByName("daGuiJinDu_lab") as Laya.Label;
            let time_lab: Laya.Label = lab_box.getChildByName("time_lab") as Laya.Label;
            tubiao_img.skin = this.show_rank_tubiao(this._list_data[index]["rank"]);
            if (index == 0 || index == 1 || index == 2) {
                rankingNumber_lab.text = "";
            }
            else {
                rankingNumber_lab.text = this._list_data[index]["rank"];
            }
            bangPaiName_lab.text = this._list_data[index]["factionname"];
            fuBenName_lab.text = this._list_data[index]["factioncopyname"];
            cengShu_lab.text = this._list_data[index]["progresss"];
            daGuiJinDu_lab.text = this._list_data[index]["bosshp"];
            time_lab.text = this._list_data[index]["progressstime"];
            cell.visible = true;
            this.onScrollTo(index);
        }
        /** 公会等级、综合实力排行榜 */
        private onListRender_9(cell: Box, index: number): void {
            if (index < 0 || index > this.curr_list.array.length) {
                return;
            }
            let lab_box: Laya.Box = cell.getChildByName("lab_box") as Laya.Box;
            this.rankListRowsInit(lab_box);
            let tubiao_img: Laya.Image = cell.getChildByName("tubiao_img") as Laya.Image;
            let rankingNumber_lab: Laya.Label = lab_box.getChildByName("rankingNumber_lab") as Laya.Label;
            let bangPaiName_lab: Laya.Label = lab_box.getChildByName("name_lab") as Laya.Label;
            let bangPaiLevel_lab: Laya.Label = lab_box.getChildByName("masterName_lab") as Laya.Label;
            let externdata_lab: Laya.Label = lab_box.getChildByName("grade_lab") as Laya.Label;
            tubiao_img.skin = this.show_rank_tubiao(this._list_data[index]["rank"]);
            if (index == 0 || index == 1 || index == 2) {
                rankingNumber_lab.text = "";
            }
            else {
                rankingNumber_lab.text = this._list_data[index]["rank"];
            }
            bangPaiName_lab.text = this._list_data[index]["factionname"];
            bangPaiLevel_lab.text = this._list_data[index]["factionlevel"].toString();
            if (this.btn_flag == RankType.FACTION_ZONGHE) {
                externdata_lab.text = this._list_data[index]["externdata"].toString();
            }
            else {
                //当前帮派人数
                let currMembers = this._list_data[index]["externdata"];
                let _clanCFactionHotelData = family.models.FamilyModel.getInstance().clanCFactionHotelData;
                //旅馆等级
                let _buildLvDianLevel = this._list_data[index]["hotellevel"];
                //帮派人数上限
                let _maxMembers = _clanCFactionHotelData[_buildLvDianLevel]["peoplemax"];
                externdata_lab.text = currMembers + "/" + _maxMembers;
            }
            let select_btn: Laya.Button = cell.getChildByName("select_btn") as Laya.Button;
            select_btn.on(Laya.Event.CLICK, this, this.getMousePos, [select_btn, index]);
            this.setBtnSkin(select_btn);
            cell.visible = true;
            this.onScrollTo(index);
        }
        /**
         * 关闭排行榜主界面
         */
        public clickCloseBtn(): void {
            mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
            this.hide();
        }
        public hide(): void {
            super.hide();
            this.removeSecondaryBtn();
            this._viewUI.rankBtn_panel.vScrollBar.value = 0;
            this._tempBtnArray = [];
            this._lastFirstBtnName = "";
            this._lastSecondaryBtnName = "";
            this._rankListLength = 0;
            this._list_data = [];
        }
        /**
         * 删除二级榜按钮，调整一级榜按钮位置
         */
        private removeSecondaryBtn(): void {
            if (this._tempBtnArray.length != 0) {
                for (let i = 0; i < this._tempBtnArray.length - 1; i++) {
                    this._viewUI.rankBtn_panel.removeChildByName(i + "");
                }
                //二级按钮删除后，置空
                this._lastSecondaryBtnName = '';
                //获取上一次被选择的一级按钮
                let _tempbtn: Laya.Button = this._viewUI.rankBtn_panel.getChildByName(this._lastFirstBtnName) as Laya.Button;
                _tempbtn.selected = false;
                //临时放二级按钮的数组置空，以便存放新的一组二级按钮
                this._tempBtnArray = [];
                //删除二级按钮后，进行一级按钮状态调整以及位置调整
                for (let index = this._rankBtnDic.keys.length; index > 0; index--) {
                    if (this._rankBtnDic.get(index) != _tempbtn) {
                        let _btn = this._rankBtnDic.get(index);
                        _btn.y = _btn.y - 80 * this._createBtnNumDic.get(_tempbtn) - 2;
                    }
                    else {
                        break;
                    }
                }
            }
        }

        public getView(): Sprite {
            return this._viewUI;
        }
        /**
         * 刷新某个排行榜列表信息的数据
         * @param ranktype 排行榜类型
         * @param hasMore 是否还有后续页数
         */
        public refreshData_1(ranktype: number, hasMore: number): void {
            this._myRankInfoData = models.RanKingListModel._instance.myRankInfoData;
            this.updateMyRankInfo();
            this._hasMore = hasMore;
            this._list_data = models.RanKingListModel._instance.rankListInfoData;
            this._list_data = this.combineData(this._lastRankListInfoData, this._list_data);
            this._lastRankListInfoData = this._list_data;
            //this._rank_listUI_init(ranktype);
            this._list_init(ranktype);
        }
        /** 
         * 把最新刷新的数据和上一次刷新的数据结合
         */
        private combineData(lastData: any, newData: any): Array<any> {
            for (let index = 0; index < newData.length; index++) {
                lastData.push(newData[index]);
            }
            return lastData;
        }
        /** 刷新查看某排行榜某排名的信息数据
         * @param ranktype 排行榜类型
         * @param rank 排名
         */
        public refreshData_2(ranktype: number, rank: number): void {
            this._zonghe_pingfen_data = models.RanKingListModel._instance.zonghepingfen_info;
            //显示综合评分界面 
            this._ZongHePingFenMediator = new ZongHePingFenMediator(this._app);
            this._ZongHePingFenMediator.info_see(rank, this._zonghe_pingfen_data, this._list_data[rank]["school"], this._viewUI);
        }
        /**
         * 头三名，显示特殊名字图标
         * @param rankingNumber 名次
         */
        private show_rank_tubiao(rankingNumber: number): string {
            let image_skin: string;
            switch (rankingNumber) {
                case 1:
                    image_skin = 'common/ui/paihangbang/diyiditu.png';
                    break;
                case 2:
                    image_skin = 'common/ui/paihangbang/dierditu.png';
                    break;
                case 3:
                    image_skin = 'common/ui/paihangbang/disanditu.png';
                    break;
                default:
                    image_skin = ''
                    break;
            }
            return image_skin;
        }
        /**
         * 职业id改为显示职业中文名字(门派名字)
         * @param school 职业对应的id
         */
        private show_school_name(school: number): string {
            let school_name: string;
            school_name = this._schoolInfo[school]["name"];
            return school_name;
        }
        /** 在6个列名的排行榜里显示自己的排名 */
        private showMyRank_3(): void {
            this.rankListRowsInit(this._viewUI.clanLab_box);
            if (this._myRankInfoData == undefined) {
                return;
            }
            if (this._myRankInfoData["myrank"] != 0) {
                this._viewUI.myRankNum3_lab.text = this._myRankInfoData["myrank"].toString();
            }
            else {
                this._viewUI.myRankNum3_lab.text = "榜外";
                this._viewUI.fubenRankTB_img.visible = false;
            }
            switch (this._myRankInfoData["ranktype"]) {
                case RankType.FACTION_COPY:
                    //if(this._myRankInfoData["myTitle"] == undefined){//没加入帮派
                    this._viewUI.bangPaiName_lab.text = "";
                    this._viewUI.fuBenName_lab.text = "";
                    this._viewUI.cengShu_lab.text = "";
                    this._viewUI.daGuiJinDu_lab.text = "";
                    this._viewUI.time_lab.text = "";
                    // }
                    // else{

                    // }
                    break;
            }
        }
        /**
         * 在5个列名的排行榜里显示自己的排名
         */
        private showMyRank_1(): void {
            this.rankListRowsInit(this._viewUI.personalLab_box);
            if (this._myRankInfoData == undefined) {
                return;
            }
            if (this._myRankInfoData["myrank"] != 0) {
                this._viewUI.myRankNum1_lab.text = this._myRankInfoData["myrank"].toString();
            }
            else {
                this._viewUI.myRankNum1_lab.text = "榜外";
            }
            switch (this._myRankInfoData["ranktype"]) {
                case RankType.ROLE_ZONGHE_RANK:
                case RankType.ROLE_RANK:
                    this._viewUI.myName1_lab.text = createrole.models.LoginModel.getInstance().roleDetail.rolename;
                    this._viewUI.myZhiYe1_lab.text = this.show_school_name(createrole.models.LoginModel.getInstance().roleDetail.school);
                    this._viewUI.myLevel1_lab.text = this._myLevel.toString();
                    this._viewUI.myScore1_lab.text = this._myRankInfoData["extdata"].toString();
                    break;
            }
            this._viewUI.select1_btn.on(LEvent.CLICK, this, this.rank_info_see, [createrole.models.LoginModel.getInstance().roleDetail.roleid, -1]);
        }
        /**
         * 在4个列名的排行榜里显示自己的排名
         */
        private showMyRank_2(): void {
            this.rankListRowsInit(this._viewUI.petLab_box);
            if (this._myRankInfoData == undefined) {
                return;
            }
            if (this._myRankInfoData["myrank"] != 0) {
                this._viewUI.myRankNum2_lab.text = this._myRankInfoData["myrank"].toString();
            }
            else {
                this._viewUI.myRankNum2_lab.text = "榜外";
            }
            //可能指向宠物id、角色id或者帮派id
            let id;
            //排行榜类型
            let _ranktype = this._myRankInfoData["ranktype"];
            switch (_ranktype) {
                case RankType.PET_GRADE_RANK:
                    //获取当前出战宠物的索引
                    let _petIndex = createrole.models.LoginModel.getInstance().roleDetail.petIndex;
                    let _petbasedata = pet.models.PetModel._instance.pets.get(_petIndex);
                    if (_petbasedata == null || _petbasedata == undefined) {//如果玩家角色当前没有宠物的话
                        this._viewUI.name1_lab.text = "";
                        this._viewUI.number_lab.text = "0";
                    }
                    else {
                        this._viewUI.name1_lab.text = _petbasedata.name;
                        this._viewUI.number_lab.text = _petbasedata.petscore.toString();
                    }
                    this._viewUI.name2_lab.text = createrole.models.LoginModel.getInstance().roleDetail.rolename;
                    break;
                case RankType.LEVEL_RANK:
                    this._viewUI.name1_lab.text = createrole.models.LoginModel.getInstance().roleDetail.rolename;
                    this._viewUI.name2_lab.text = this.show_school_name(createrole.models.LoginModel.getInstance().roleDetail.school);
                    this._viewUI.number_lab.text = this._myLevel.toString();
                    break;
                case RankType.PROFESSION_WARRIOR_RANK:
                case RankType.PROFESSION_MAGIC_RANK:
                case RankType.PROFESSION_PRIEST_RANK:
                case RankType.PROFESSION_PALADIN_RANK:
                case RankType.PROFESSION_HUNTER_RANK:
                case RankType.PROFESSION_DRUID_RANK:
                case RankType.PROFESSION_ROGUE_RANK:
                case RankType.PROFESSION_SAMAN_RANK:
                case RankType.PROFESSION_WARLOCK_RANK:
                    this._viewUI.name1_lab.text = createrole.models.LoginModel.getInstance().roleDetail.rolename;
                    this._viewUI.name2_lab.text = this._myLevel.toString();
                    this._viewUI.number_lab.text = this._myRankInfoData["extdata"].toString();
                    break;
                case RankType.FACTION_RANK_LEVEL:
                case RankType.FACTION_ZONGHE:
                    let _clanname = HudModel.getInstance().clanname;
                    if (_clanname != "") {
                        this._viewUI.name1_lab.text = _clanname;
                        let _clanData = family.models.FamilyModel.getInstance().clanInfo;
                        this._viewUI.name2_lab.text = _clanData[0].clanlevel
                        if (_ranktype == RankType.FACTION_RANK_LEVEL) {
                            //当前帮派人数
                            let currMembers = _clanData[0].membersnum;
                            let _clanCFactionHotelData = family.models.FamilyModel.getInstance().clanCFactionHotelData;
                            //旅馆等级
                            let _buildLvDianLevel = _clanData[0].house.get(clanHouse.BuildLvDian);
                            //帮派人数上限
                            let _maxMembers = _clanCFactionHotelData[_buildLvDianLevel]["peoplemax"];
                            this._viewUI.number_lab.text = currMembers + "/" + _maxMembers;
                        }
                        else {
                            this._viewUI.number_lab.text = this._myRankInfoData.extdata.toString();
                        }
                        id = _clanData[0].clanid;
                    }
                    else {
                        this._viewUI.name1_lab.text = "";
                        this._viewUI.name2_lab.text = "";
                        this._viewUI.number_lab.text = "";
                    }
                    break;
                case RankType.PVP5_LAST_GRADE1:
                case RankType.PVP5_LAST_GRADE2:
                case RankType.PVP5_LAST_GRADE3:
                case RankType.PVP5_HISTORY_GRADE1:
                case RankType.PVP5_HISTORY_GRADE2:
                case RankType.PVP5_HISTORY_GRADE3:
                    this._viewUI.name1_lab.text = createrole.models.LoginModel.getInstance().roleDetail.rolename;
                    this._viewUI.name2_lab.text = this.show_school_name(createrole.models.LoginModel.getInstance().roleDetail.school);
                    this._viewUI.number_lab.text = this._myRankInfoData.extdata.toString();
                    break;
                case RankType.RED_PACK_1:
                    this._viewUI.name1_lab.text = createrole.models.LoginModel.getInstance().roleDetail.rolename;
                    this._viewUI.name2_lab.text = this.show_school_name(createrole.models.LoginModel.getInstance().roleDetail.school);
                    this._viewUI.number_lab.text = this._myRankInfoData.extdata.toString();
                    break;
                case RankType.FLOWER_RECEIVE:
                case RankType.FLOWER_GIVE:

                    break;
            }
            if (id) {
                this._viewUI.select2_btn.on(LEvent.CLICK, this, this.rank_info_see, [id, -1]);
            }
        }
    }

}

