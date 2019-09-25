
module game.modules.friend {
    /** 好友系统主界面 */
    export class FriendViewMediator extends game.modules.UiMediator {
        /**当前UI界面 */
        private _viewUI: ui.common.FriendUI;
        /**添加好友界面 */
        private _addFriendViewViewMediator: AddFriendViewMediator;
        /**好友属性面板 */
        private _ContactCharacterMediator: ContactCharacterMediator;
        /**物品提示 */
        private _tipsModule: game.modules.tips.tipsModule;
        /**任务详情 */
        private TaskDescriberMediators: game.modules.commonUI.TaskDescriberMediators;
        /**宠物详情 */
        private PetXiangQingMediator: game.modules.pet.PetXiangQingMediator;
        /**系统消息时间 */
        // private systemMessageTimeArr: Array<any>;//
        /**系统消息内容 */
        // private systemMessageContentParamArr: Array<any>;//
        /**黑名单用户名 */
        private blacklistuserNameArr: Array<any>;
        /** 黑名单用户等级 */
        private blacklistuserLevelArr: Array<number>;
        /**黑名单用户头像 */
        private blacklistuserHeadImgArr: Array<any>;
        /**黑名单用户职业图标 */
        private blacklistuserZhiyeImgArr: Array<any>;
        /**黑名单用户账号 */
        private blacklistuserIdArr: Array<number>;
        /**陌生人名 */
        private recentContactNameArr: Array<any>;
        /** 陌生人等级 */
        private recentContactLevelArr: Array<number>;
        /**陌生人头像id */
        private recentContactHeadIdArr: Array<number>;
        /**陌生人头像 */
        private recentContactHeadImgArr: Array<any>;
        /**陌生人职业图标 */
        private recentContactZhiyeImgArr: Array<any>;
        /**陌生人职业id */
        private recentContactZhiyeIdArr: Array<number>;
        /**陌生人账号 */
        private recentContactIdArr: Array<number>;
        /**聊天表情 */
        private faceList: Array<any>;
        /**常用语 */
        private quickChat: Array<any>;
        /**任务 */
        private task: Array<any> = [];
        /**历史输入 */
        private historyInput: Array<any>;
        /**没有历史输入 */
        private nohistory: Array<any> = [];
        /**屏蔽字 */
        private shield_word: Array<string>;
        /**敏感字 */
        private banWords: Object;
        /**选中列表下标 */
        private selectNum: number = -1;
        /**选中黑名单用户列表下标 */
        private selectBlackListNum: number = 0;
        /**选中陌生人下标 */
        private selectRecentContactNum: number = -1;
        /**用户输入 */
        private repstr: string;
        /**历史消息 */
        private historyMsg: string;
        /**提示坐标原点 */
        private px;
        /**提示坐标原点 */
        private py;
        /**用户ID */
        private roleId: number;
        /**消息内容 */
        private chatContent: Laya.HTMLDivElement;
        /**自己发出消息 */
        private myMsgArr: Array<any>;
        /**自己发出附件 */
        private myDisplayinfoArr: Array<any>;
        /**好友发出消息 */
        private friendMsgArr: Array<any>;
        /**自己发出消息时间 */
        private sendTimeArr: Array<any>;
        /**好友发出消息时间 */
        private friendTimeArr: Array<any>;
        /**好友发出附件 */
        private friendDisplayinfoArr: Array<any>;
        /**发出消息字典key:用户id,value:已发消息数组 */
        private myMsgData: Laya.Dictionary;
        /**自己发出附件字典key:用户id,value:已发附件数组 */
        public myDisplayinfoData: Laya.Dictionary;
        /**收到好友消息字典key:好友id,value:好友消息数组 */
        private friendMsgData: Laya.Dictionary;
        /**自己发出消息时间字典key:用户id,value:发送时间数组 */
        private sendTimeData: Laya.Dictionary;
        /**好友发出消息字典key:好友id,value:好友发送时间数组 */
        private friendTimeData: Laya.Dictionary;
        /**好友发出附件字典key:好友id,value:好友附件数组 */
        private friendDisplayinfoData: Laya.Dictionary;
        /**给陌生人的消息 */
        private torecentContactMsgArr: Array<any>;
        /**给陌生人的附件 */
        private torecentContactDisplayinfoArr: Array<any>;
        /**陌生人发出消息 */
        private recentContactMsgArr: Array<any>;
        /**陌生人发出附件 */
        private recentContactDisplayinfoArr: Array<any>;
        /**给陌生人发出消息时间 */
        private torecentContactTimeArr: Array<any>;
        /**陌生人发出消息时间 */
        private recentContactTimeArr: Array<any>;
        /**给陌生人消息字典key:用户id,value:已发消息数组 */
        private torecentContactMsgData: Laya.Dictionary;
        /**给陌生人附件字典key:用户id,value:已发附件数组 */
        private torecentContactDisplayinfoData: Laya.Dictionary;
        /**收到陌生人消息字典key:陌生人id,value:陌生人消息数组 */
        private recentContactMsgData: Laya.Dictionary;
        /**收到陌生人附件字典key:陌生人id,value:陌生人附件数组 */
        private recentContactDisplayinfoData: Laya.Dictionary;
        /**给陌生人消息时间字典key:用户id,value:发送时间数组 */
        private torecentContactTimeData: Laya.Dictionary;
        /**陌生人发出消息时间字典key:陌生人id,value:陌生人发送时间数组*/
        private recentContactTimeData: Laya.Dictionary;
        /**客户端提示配置表数据 */
        private cMessageTipObj: Object;
        /**本人头像 */
        private shape: number;
        /**选择按钮名数组 */
        private selectNameArr: Array<string>;
        /**刷新好友状态排序 */
        private refreshNum: number = 0;
        /**当前页面是否打开 */
        private key: boolean;
        /**聊天初始化标志 */
        // private initFlag: boolean = false;
        /**登录信息 */
        private _loginModel: LoginModel;
        /**角色头像 */
        private roleinfo: Array<any> = [];
        /**宠物列表 */
        private petLits: Array<any> = [];
        /**物品列表 */
        private itemList: Array<any> = [];
        /** 分享的道具名称 */
        private shareItem: string;
        /**附加信息 */
        private displayInfo: Array<any> = [];
        /** 当前数字小键盘输入的文本内容 */
        private currInputText: string;
        /** 是否加载过存储在本地的最近联系人数据 */
        private isLoadRecentContactIdData: boolean = false;
        /** 存放离线好友消息提示UI相关数据 */
        private offlineFriendTipsUIData: Laya.Dictionary = new Laya.Dictionary();
        /** 上一次被点击的按钮 */
        private lastBtn: Laya.Button;

        constructor(uiLayer: Sprite, app: AppBase) {
            super(uiLayer);
            this._viewUI = new ui.common.FriendUI;
            this._app = app;
            this._addFriendViewViewMediator = new AddFriendViewMediator(this._app);
            this._ContactCharacterMediator = new ContactCharacterMediator(this._viewUI, app);
            this._viewUI.mouseThrough = true;
            this.isCenter = false;
            this.initialize();
            this.initUI();
            this.registerEvent();
        }
        /** 加载出最近联系人 */
        private loadRecentContact(): void {
            if (this.isLoadRecentContactIdData) {//防止重复加载最近联系人
                return;
            }
            this.isLoadRecentContactIdData = true;
            let roleid = LoginModel.getInstance().roleDetail.roleid;
            let rolename = LoginModel.getInstance().roleDetail.rolename;
            let recentContactIdCount = LocalStorage.getItem(roleid + "_" + rolename + "_" + "recentContactIdCount");
            if (recentContactIdCount != null && recentContactIdCount != undefined) {
                for (let i = 0; i < Number(recentContactIdCount); i++) {
                    let recentContactId = Number(LocalStorage.getItem(roleid + "_" + rolename + "_" + "recentContactId" + "_" + i));
                    if (recentContactId != undefined) {
                        let _flag = models.FriendModel.getInstance().isMyFriend(recentContactId);
                        if (_flag == FriendEnum.FRIEND_KEY) {
                            this.recentContactIdArr.push(recentContactId);
                        }
                    }
                }
                let _tempIdArr = [];
                let _friendIdArr = FriendModel.getInstance().friendIdArr;
                let _friendIsOnline = FriendModel.getInstance().friendIsOnline;
                let _friendNameArr = FriendModel.getInstance().friendNameArr
                let _friendLevelArr = FriendModel.getInstance().friendLevelArr;
                let _touxiangIdArr = FriendModel.getInstance().touxiangIdArr;
                let _touxiangImgArr = FriendModel.getInstance().touxiangImgArr;
                let _zhiyeImgArr = FriendModel.getInstance().zhiyeImgArr;
                for (let i = 0; i < this.recentContactIdArr.length; i++) {
                    let _id = this.recentContactIdArr[i];
                    for (let j = 0; j < _friendIdArr.length; j++) {
                        if (_friendIdArr[j] == _id) {
                            let name = _friendNameArr[j];
                            let level = _friendLevelArr[j];
                            let touxiangid = _touxiangIdArr[j];
                            let touxiangimg = _touxiangImgArr[j];
                            let zhiyeimg = _zhiyeImgArr[j];
                            if (_friendIsOnline[i] == FriendEnum.OFFLINE_STATE) {
                                _tempIdArr.push(_friendIdArr[j]);
                                this.recentContactNameArr.push(name);
                                this.recentContactLevelArr.push(level);
                                this.recentContactHeadIdArr.push(touxiangid);
                                this.recentContactHeadImgArr.push(touxiangimg);
                                this.recentContactZhiyeImgArr.push(zhiyeimg);
                            }
                            else {
                                _tempIdArr.unshift(_friendIdArr[j]);
                                this.recentContactNameArr.unshift(name);
                                this.recentContactLevelArr.unshift(level);
                                this.recentContactHeadIdArr.unshift(touxiangid);
                                this.recentContactHeadImgArr.unshift(touxiangimg);
                                this.recentContactZhiyeImgArr.unshift(zhiyeimg);
                            }
                        }
                    }
                }
                this.recentContactIdArr = _tempIdArr;
                //判断下离线好友消息对应的好友是否在最近联系人里有过
                let keys = this.offlineFriendTipsUIData.keys;
                for (let i = 0; i < keys.length; i++) {
                    for (let j = 0; j < this.recentContactIdArr.length; j++) {
                        if (this.recentContactIdArr[j] == keys[i]) {
                            let index = this.offlineFriendTipsUIData.get(keys[i]);
                            this.switchRedPoint(keys[i], index);
                        }
                    }
                }
            }
        }
        /**注册事件监听 */
        public eventListener(): void {
            //监听查看物品信息事件
            chat.models.ChatProxy.getInstance().on(chat.models.SHOW_ITEM_TIPS, this, this._ShowTips);
            //监听查看别人分享物品事件
            chat.models.ChatProxy.getInstance().on(chat.models.VIWE_OTHER_ITEM, this, this._ViewOtherItem);
            //监听查看别人任务事件
            chat.models.ChatProxy.getInstance().on(chat.models.VIWE_SHARE_TASK, this, this._ViewShareTask);
            //监听查看宠物详情事件
            pet.models.PetProxy.getInstance().on(pet.models.GETPETINFO, this, this.OpPetInfo);
        }
        /**初始化 */
        public initialize(): void {
            this.blacklistuserNameArr = new Array<any>();
            this.blacklistuserLevelArr = new Array<number>();
            this.blacklistuserHeadImgArr = new Array<any>();
            this.blacklistuserZhiyeImgArr = new Array<any>();
            this.blacklistuserIdArr = new Array<number>();
            this.faceList = new Array<any>();
            this.quickChat = new Array<any>();
            this.historyInput = new Array<any>();
            this.shield_word = new Array<any>();
            this.myMsgArr = new Array<any>();
            this.friendMsgArr = new Array<any>();
            this.sendTimeArr = new Array<any>();
            this.friendTimeArr = new Array<any>();
            // this.systemMessageTimeArr = new Array<any>();
            // this.systemMessageContentParamArr = new Array<any>();
            this.recentContactNameArr = new Array<any>();
            this.recentContactLevelArr = new Array<number>();
            this.recentContactHeadImgArr = new Array<any>();
            this.recentContactZhiyeImgArr = new Array<any>();
            this.recentContactZhiyeIdArr = new Array<number>();
            this.recentContactIdArr = new Array<number>();
            this.torecentContactMsgArr = new Array<any>();
            this.recentContactMsgArr = new Array<any>();
            this.torecentContactTimeArr = new Array<any>();
            this.recentContactTimeArr = new Array<any>();
            this.recentContactHeadIdArr = new Array<number>();
            this.myMsgData = new Laya.Dictionary();
            this.friendMsgData = new Laya.Dictionary();
            this.sendTimeData = new Laya.Dictionary();
            this.friendTimeData = new Laya.Dictionary();
            this.torecentContactMsgData = new Laya.Dictionary();
            this.recentContactMsgData = new Laya.Dictionary();
            this.torecentContactTimeData = new Laya.Dictionary();
            this.recentContactTimeData = new Laya.Dictionary();
            this.selectNameArr = new Array<string>();
            this.selectNameArr = [models.FriendModel.chineseStr.recent_contact, models.FriendModel.chineseStr.contact];
            this.banWords = chat.models.ChatModel.getInstance().chatConfigBinDic;
            this.myDisplayinfoArr = new Array<any>();
            this.friendDisplayinfoArr = new Array<any>();
            this.myDisplayinfoData = new Laya.Dictionary();
            this.friendDisplayinfoData = new Laya.Dictionary();
            this.torecentContactDisplayinfoArr = new Array<any>();
            this.recentContactDisplayinfoArr = new Array<any>();
            this.torecentContactDisplayinfoData = new Laya.Dictionary();
            this.recentContactDisplayinfoData = new Laya.Dictionary();
        }
        /**好友列表刷新 */
        public onRequestUpdateRoleInfo(e: any) {
            let _currRoleIsNotMyFriend = friend.models.FriendModel.getInstance().currRoleIsNotMyFriend;
            if (!_currRoleIsNotMyFriend) {
                if (this.key) {
                    this.refreshNum++;
                    //全部好友状态刷新完毕，刷新列表
                    if (this.refreshNum == FriendModel.getInstance().friendIdArr.length) {
                        this.refreshNum = 0;
                        this.getListData();
                    }
                }
            }
            else {
                let _sRequestUpdateRoleInfo: models.InfoBeanVo = models.FriendModel.getInstance().SRequestUpdateRoleInfoData.get("data").FriendInfoBean;
                let _roleinfodata = [{
                                        roleId: _sRequestUpdateRoleInfo.roleId, 
                                        name: _sRequestUpdateRoleInfo.name, 
                                        roleLevel: _sRequestUpdateRoleInfo.roleLevel, 
                                        shape: _sRequestUpdateRoleInfo.shape,
                                        school: _sRequestUpdateRoleInfo.school,
                                        online: _sRequestUpdateRoleInfo.online
                                    }];
                this.ontransMessage(_roleinfodata[0]);
            }
        }
        /**发送消息给指定账号
         * @param roleinfodata 所要发送消息给的对象角色信息数据
         * @describe 取角色id 角色名字 角色等级时，做了判断，可能是从等级排行榜那边要发送消息 
         */
        public ontransMessage(roleinfodata: any): void {
            let roleid;
            if (roleinfodata.roleid) {
                roleid = roleinfodata.roleid;//等级排行榜的
            }
            else {
                roleid = roleinfodata.roleId;
            }
            let rolename;
            if (roleinfodata.rolename) {
                rolename = roleinfodata.rolename;//等级排行榜的
            }
            else {
                rolename = roleinfodata.name;
            }
            let rolelevel;
            if (roleinfodata.roleLevel) {
                rolelevel = roleinfodata.roleLevel;
            }
            else {
                rolelevel = roleinfodata.level;//等级排行榜的
            }

            let isFriendIndex = FriendModel.getInstance().friendIdArr.indexOf(roleid);
            let isRecentContactIndex = this.recentContactIdArr.indexOf(roleid);
            if (isRecentContactIndex != -1) {
                if (isFriendIndex != -1) {//并且还是好友
                    this.onSelect(isFriendIndex);
                }
                else {
                    this.onRecentContactSelect(isRecentContactIndex);
                }
                let _recentContactRoleInfo_btn: Laya.Button = this._viewUI.recentContact_list.getCell(isRecentContactIndex).getChildByName("recentContactRoleInfo_btn") as Laya.Button;
                this.showSelected(_recentContactRoleInfo_btn, isRecentContactIndex);
                return;
            }

            //是最新的谈话，不是最近联系过（指玩家当前角色在线期间）
            if (roleinfodata.online == FriendEnum.OFFLINE_STATE) {
                this.recentContactIdArr.push(roleid);
                this.recentContactNameArr.push(rolename);
                this.recentContactLevelArr.push(rolelevel);
                this.recentContactHeadIdArr.push(roleinfodata.shape);
                this.recentContactHeadImgArr.push({ img: "common/icon/grayavatarrole/" + (FriendEnum.GRAY_ROLE_IMG_ID + roleinfodata.shape) + ".png" });
                this.setRecentContactZhiyeImg(roleinfodata.school);
            }
            else {
                this.recentContactIdArr = this.arrayHeadInsert(roleid, this.recentContactIdArr);
                this.recentContactNameArr = this.arrayHeadInsert(rolename, this.recentContactNameArr);
                this.recentContactLevelArr = this.arrayHeadInsert(rolelevel, this.recentContactLevelArr);
                this.recentContactHeadIdArr = this.arrayHeadInsert(roleinfodata.shape, this.recentContactHeadIdArr);
                this.recentContactHeadImgArr = this.arrayHeadInsert({ img: "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + roleinfodata.shape) + ".png" }, this.recentContactHeadImgArr);
                this.recentContactZhiyeImgArr = this.arrayHeadInsert(roleinfodata.school, this.recentContactZhiyeImgArr, roleinfodata.school);
            }
            this.getRecentContactListData();
            if (isFriendIndex != -1) {
                this.onSelect(isFriendIndex);
            }
            else {
                isRecentContactIndex = this.recentContactIdArr.indexOf(roleid);
                this.onRecentContactSelect(isRecentContactIndex);

            }
            let _recentContactRoleInfo_btn: Laya.Button = this._viewUI.recentContact_list.getCell(0).getChildByName("recentContactRoleInfo_btn") as Laya.Button;
            this.showSelected(_recentContactRoleInfo_btn, isRecentContactIndex);
            this.chatDataWriteToLocalStorage(this.recentContactIdArr);
        }
        /** 将数据写入到本地文件 */
        private chatDataWriteToLocalStorage(idarr: Array<number>): void {
            let recentContactIdCount = idarr.length;
            let roleid = LoginModel.getInstance().roleDetail.roleid;
            let rolename = LoginModel.getInstance().roleDetail.rolename;
            let flag;
            for (let i = 0; i < recentContactIdCount; i++) {
                let recentContactId = idarr[i];
                //判断是否好友
                flag = models.FriendModel.getInstance().isMyFriend(recentContactId);
                if (flag == FriendEnum.STRANGE_KEY) continue;//是陌生人关系，跳过，继续循环
                //判断是否聊过天
                if (this.myMsgData.get(recentContactId) == undefined && this.friendMsgData.get(recentContactId) == undefined) continue;//没有就跳过
                LocalStorage.setItem(roleid + "_" + rolename + "_" + "recentContactId" + "_" + i, idarr[i].toString());//再将最近联系人角色id写入本地存储
            }
            if (recentContactIdCount == 0) {//当最近联系人又都没有时
                let last_recentContactIdCount = LocalStorage.getItem(roleid + "_" + rolename + "_" + "recentContactIdCount");
                for (let i = 0; i < Number(last_recentContactIdCount); i++) {
                    LocalStorage.removeItem(roleid + "_" + rolename + "_" + "recentContactId" + "_" + i);//清空本地存储的最近联系人角色id
                }
            }
            LocalStorage.setItem(roleid + "_" + rolename + "_" + "recentContactIdCount", recentContactIdCount.toString());//将最近联系人角色id的总数量写入本地存储，用角色id和角色名字做为标识
        }
        /** 将某数据插入到数组的首位
         * @param arrData 需要头插入的数据
         * @param array 被插入的数组
         */
        private arrayHeadInsert(arrData: any, array: any, isschool?): any {
            let tempArr = [];
            if (!isschool) {
                tempArr.push(arrData);
            }
            else {
                this.setRecentContactZhiyeImg(arrData);
                tempArr.push(array[array.length - 1].img);
                array.pop();
            }
            for (let i: number = 0; i < array.length; i++) {
                tempArr.push(array[i]);
            }
            array = tempArr;
            return array;
        }
        /**删除好友成功
         * @param roleid 被删除的好友角色id
         */
        public onBreakOffRelation(roleid: number): void {
            this._viewUI.myFriend_btn.label = models.FriendModel.chineseStr.friend + FriendModel.getInstance().friendNameArr.length + models.FriendModel.chineseStr.friendNum;//好友数量
            this.friendsChatMsgs_insert_strangersChatMsgs(roleid);
            this.getListData();
        }
        /** 好友关系的聊天消息内容插入到陌生人的聊天消息内容中去
         * @param roleid 关系从好友变成陌生人的角色id
         */
        private friendsChatMsgs_insert_strangersChatMsgs(roleid: number): void {
            if (this.friendMsgData.get(roleid) == null && this.friendMsgData.get(roleid) == undefined && this.myMsgData.get(roleid) == null && this.myMsgData.get(roleid) == undefined) {
                return;
            }
            this.torecentContactMsgData.set(roleid, this.myMsgData.get(roleid));
            this.recentContactMsgData.set(roleid, this.friendMsgData.get(roleid));
            this.torecentContactTimeData.set(roleid, this.sendTimeData.get(roleid));
            this.recentContactTimeData.set(roleid, this.friendTimeData.get(roleid));
            this.torecentContactDisplayinfoData.set(roleid, this.myDisplayinfoData.get(roleid));
            this.recentContactDisplayinfoData.set(roleid, this.friendDisplayinfoData.get(roleid));
        }
        /**服务器通知客户端刷新好友度 */
        public onUpdateFriendLevel(e: any): void {
            this.onSelect(this.selectNum);//手动刷新
        }
        /**陌生人聊天S-->C */
        public onStrangerMessageToRole(e: any): void {
            let data: hanlder.S2C_SStrangerMessageToRole = models.FriendModel.getInstance().SStrangerMessageToRoleData.get("data");
            let roleid = data.strangerMessage.FriendInfoBean.roleId;
            let _isBlackListFlag = models.FriendModel.getInstance().isMyBlackList(roleid);
            if (_isBlackListFlag) return;//如果对方时在自己的黑名单中，就返回
            this.updateRecentChat(roleid);
            let time = this.getNowTime();
            let torecentcontactmsgarr = [];//暂存发出消息
            let recentContactmsgarr = [];//陌生人消息
            let torecentContacttimearr = [];//发出消息时间
            let recentContacttimearr = [];//收到消息时间
            let torecentcontactdisplayinfoarr = [];//给陌生人附件
            let recentcontactdisplayinfoarr = [];//陌生人附件
            this.torecentContactMsgArr.push("");
            this.recentContactMsgArr.push(data.strangerMessage.content);
            this.torecentContactTimeArr.push("");
            this.recentContactTimeArr.push(time);
            this.torecentContactDisplayinfoArr.push("");
            //是否有附件
            if (data.strangerMessage.displayinfo.length > 0)
                this.recentContactDisplayinfoArr.push(data.strangerMessage.displayinfo[0]);
            else
                this.recentContactDisplayinfoArr.push("");
            for (let i: number = 0; i < this.torecentContactMsgArr.length; i++) {
                torecentcontactmsgarr.push(this.torecentContactMsgArr[i]);
            }
            for (let i: number = 0; i < this.recentContactMsgArr.length; i++) {
                recentContactmsgarr.push(this.recentContactMsgArr[i]);
            }
            for (let i: number = 0; i < this.torecentContactTimeArr.length; i++) {
                torecentContacttimearr.push(this.torecentContactTimeArr[i]);
            }
            for (let i: number = 0; i < this.recentContactTimeArr.length; i++) {
                recentContacttimearr.push(this.recentContactTimeArr[i]);
            }
            for (let i: number = 0; i < this.torecentContactDisplayinfoArr.length; i++) {
                torecentcontactdisplayinfoarr.push(this.torecentContactDisplayinfoArr[i]);
            }
            for (let i: number = 0; i < this.recentContactDisplayinfoArr.length; i++) {
                recentcontactdisplayinfoarr.push(this.recentContactDisplayinfoArr[i]);
            }
            this.torecentContactMsgData.set(roleid, torecentcontactmsgarr);
            this.recentContactMsgData.set(roleid, recentContactmsgarr);
            this.torecentContactTimeData.set(roleid, torecentContacttimearr);
            this.recentContactTimeData.set(roleid, recentContacttimearr);
            this.torecentContactDisplayinfoData.set(roleid, torecentcontactdisplayinfoarr);
            this.recentContactDisplayinfoData.set(roleid, recentcontactdisplayinfoarr);
            //初始化陌生人列表
            let key = true;
            for (let i: number = 0; i < this.recentContactIdArr.length; i++) {
                //筛选重复id
                if (this.recentContactIdArr[i] == roleid)
                    key = false;
            }
            //如果是不在陌生人列表中的陌生人发来的消息，将该陌生人添加到陌生人列表中
            if (key) {
                this.recentContactNameArr.push(data.strangerMessage.FriendInfoBean.name);
                this.recentContactLevelArr.push(data.strangerMessage.FriendInfoBean.roleLevel);
                this.recentContactIdArr.push(data.strangerMessage.FriendInfoBean.roleId);
                if (data.strangerMessage.FriendInfoBean.online == FriendEnum.OFFLINE_STATE) {
                    this.recentContactHeadImgArr.push({ img: "common/icon/grayavatarrole/" + (FriendEnum.GRAY_ROLE_IMG_ID + data.strangerMessage.FriendInfoBean.shape) + ".png" });
                } else {
                    this.recentContactHeadImgArr.push({ img: "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + data.strangerMessage.FriendInfoBean.shape) + ".png" });
                }
                this.recentContactHeadIdArr.push(data.strangerMessage.FriendInfoBean.shape);
                this.setRecentContactZhiyeImg(data.strangerMessage.FriendInfoBean.school);
                this.recentContactZhiyeIdArr.push(data.strangerMessage.FriendInfoBean.school);
            }
            //收到陌生人列表中的人发来消息，在该发消息人的头像上加红点，并通知主界面加红点
            for (let i: number = 0; i < this.recentContactIdArr.length; i++) {
                if (this.recentContactIdArr[i] == roleid) {
                    let contactRolePointImg: Laya.Image =
                        this._viewUI.recentContact_list.getCell(i).getChildByName("recentContactRolePoint_img") as Laya.Image;//联系人红点
                    let selectPoint = this._viewUI.select_list.getCell(0).getChildByName("selectPoint_img") as Laya.Image;//选择按钮红点
                    selectPoint.visible = true;
                    contactRolePointImg.visible = true;
                    models.FriendProxy.getInstance().event(models.receiveMessage_EVENT);//收到消息事件
                }
            }
            //如果与发送消息的人正在聊天，不显示消息红点
            if (this.recentContactIdArr[this.selectRecentContactNum] == roleid && this.selectNum == -1) {
                this.getRecentChatData();
                let contactRolePointImg: Laya.Image = this._viewUI.recentContact_list.getCell(this.selectRecentContactNum).getChildByName("recentContactRolePoint_img") as Laya.Image;//联系人红点
                let selectPoint = this._viewUI.select_list.getCell(0).getChildByName("selectPoint_img") as Laya.Image;//选择按钮红点
                selectPoint.visible = false;
                models.FriendProxy.getInstance().event(models.readMessage_EVENT);
                contactRolePointImg.visible = false;
            }
            this.getRecentContactListData();
        }
        /**角色上线客户端收到 离线消息*/
        public onOffLineMsgMessageToRole(e: any): void {
            let data: hanlder.S2C_SOffLineMsgMessageToRole = models.FriendModel.getInstance().SOffLineMsgMessageToRoleData.get("data");
            if (data != null) {
                for (let m: number = data.offLineMsgList.length - 1; m >= 0; m--) {
                    let roleid = data.offLineMsgList[m]["strangerMessage"]["FriendInfoBean"]["roleId"];//发送人id
                    let name = data.offLineMsgList[m]["strangerMessage"]["FriendInfoBean"]["name"];//发送人名字
                    let roleLevel = data.offLineMsgList[m]["strangerMessage"]["FriendInfoBean"]["roleLevel"];//发送人等级
                    let time = data.offLineMsgList[m]["time"];//发送时间
                    let content = data.offLineMsgList[m]["strangerMessage"]["content"];//发送内容
                    let disPlayInfo = data.offLineMsgList[m]["strangerMessage"]["displayinfo"];//发送附件   
                    let recentContactKey = true;
                    //好友发送的离线消息
                    for (let k: number = 0; k < FriendModel.getInstance().friendIdArr.length; k++) {
                        if (FriendModel.getInstance().friendIdArr[k] == roleid) {
                            recentContactKey = false;
                            this.updateMyChat(roleid);
                            let mymsgarr = [];//暂存发出消息
                            let friendmsgarr = [];//好友消息
                            let sendtimearr = [];//发出消息时间
                            let friendtimearr = [];//收到消息时间
                            let mydisplayinfoarr = [];//发出附件
                            let frienddisplayinfoarr = [];//好友附件
                            this.myMsgArr.push("");
                            this.friendMsgArr.push(content);
                            this.sendTimeArr.push("");
                            this.friendTimeArr.push(time);
                            this.myDisplayinfoArr.push("");
                            if (disPlayInfo.length > 0)
                                this.friendDisplayinfoArr.push(disPlayInfo[0]);
                            else
                                this.friendDisplayinfoArr.push("");
                            for (let i: number = 0; i < this.myMsgArr.length; i++) {
                                mymsgarr.push(this.myMsgArr[i]);
                            }
                            for (let i: number = 0; i < this.friendMsgArr.length; i++) {
                                friendmsgarr.push(this.friendMsgArr[i]);
                            }
                            for (let i: number = 0; i < this.sendTimeArr.length; i++) {
                                sendtimearr.push(this.sendTimeArr[i]);
                            }
                            for (let i: number = 0; i < this.friendTimeArr.length; i++) {
                                friendtimearr.push(this.friendTimeArr[i]);
                            }
                            for (let i: number = 0; i < this.myDisplayinfoArr.length; i++) {
                                mydisplayinfoarr.push(this.myDisplayinfoArr[i]);
                            }
                            for (let i: number = 0; i < this.friendDisplayinfoArr.length; i++) {
                                frienddisplayinfoarr.push(this.friendDisplayinfoArr[i]);
                            }
                            this.myMsgData.set(roleid, mymsgarr);
                            this.friendMsgData.set(roleid, friendmsgarr);
                            this.sendTimeData.set(roleid, sendtimearr);
                            this.friendTimeData.set(roleid, friendtimearr);
                            this.myDisplayinfoData.set(roleid, mydisplayinfoarr);
                            this.friendDisplayinfoData.set(roleid, frienddisplayinfoarr);
                            //显示消息红点
                            for (let i: number = 0; i < FriendModel.getInstance().friendIdArr.length; i++) {
                                if (FriendModel.getInstance().friendIdArr[i] == roleid) {
                                    let contactRolePointImg: Laya.Image = this._viewUI.contact_list.getCell(i).getChildByName("contactRoleInfo_btn").getChildByName("contactRolePoint_img") as Laya.Image;//联系人红点
                                    let selectPoint = this._viewUI.select_list.getCell(1).getChildByName("selectPoint_img") as Laya.Image;//选择按钮红点
                                    selectPoint.visible = true;
                                    contactRolePointImg.visible = true;
                                    models.FriendProxy.getInstance().event(models.receiveMessage_EVENT);//收到消息事件
                                    this.offlineFriendTipsUIData.set(roleid, i);
                                }
                            }
                            break;
                        }
                    }
                    //收到陌生人的离线消息
                    if (recentContactKey) {
                        this.updateRecentChat(roleid);
                        let torecentcontactmsgarr = [];//暂存发出消息
                        let recentContactmsgarr = [];//陌生人消息
                        let torecentContacttimearr = [];//发出消息时间
                        let recentContacttimearr = [];//收到消息时间
                        let torecentcontactdisplayinfoarr = [];//给陌生人附件
                        let recentcontactdisplayinfoarr = [];//陌生人附件
                        this.torecentContactMsgArr.push("");
                        this.recentContactMsgArr.push(content);
                        this.torecentContactTimeArr.push("");
                        this.recentContactTimeArr.push(time);
                        this.torecentContactDisplayinfoArr.push("");
                        if (disPlayInfo.length > 0)
                            this.recentContactDisplayinfoArr.push(disPlayInfo[0]);
                        else
                            this.recentContactDisplayinfoArr.push("");
                        for (let i: number = 0; i < this.torecentContactMsgArr.length; i++) {
                            torecentcontactmsgarr.push(this.torecentContactMsgArr[i]);
                        }
                        for (let i: number = 0; i < this.recentContactMsgArr.length; i++) {
                            recentContactmsgarr.push(this.recentContactMsgArr[i]);
                        }
                        for (let i: number = 0; i < this.torecentContactTimeArr.length; i++) {
                            torecentContacttimearr.push(this.torecentContactTimeArr[i]);
                        }
                        for (let i: number = 0; i < this.recentContactTimeArr.length; i++) {
                            recentContacttimearr.push(this.recentContactTimeArr[i]);
                        }
                        for (let i: number = 0; i < this.torecentContactDisplayinfoArr.length; i++) {
                            torecentcontactdisplayinfoarr.push(this.torecentContactDisplayinfoArr[i]);
                        }
                        for (let i: number = 0; i < this.recentContactDisplayinfoArr.length; i++) {
                            recentcontactdisplayinfoarr.push(this.recentContactDisplayinfoArr[i]);
                        }
                        this.torecentContactMsgData.set(roleid, torecentcontactmsgarr);
                        this.recentContactMsgData.set(roleid, recentContactmsgarr);
                        this.torecentContactTimeData.set(roleid, torecentContacttimearr);
                        this.recentContactTimeData.set(roleid, recentContacttimearr);
                        this.torecentContactDisplayinfoData.set(roleid, torecentcontactdisplayinfoarr);
                        this.recentContactDisplayinfoData.set(roleid, recentcontactdisplayinfoarr);
                        //初始化陌生人
                        let key = true;
                        for (let i: number = 0; i < this.recentContactIdArr.length; i++) {
                            if (this.recentContactIdArr[i] == roleid)
                                key = false;
                        }
                        if (key) {
                            if (data.offLineMsgList[m]["strangerMessage"]["FriendInfoBean"]["online"] == 0) {
                                this.recentContactHeadImgArr.push({ img: "common/icon/grayavatarrole/" + (FriendEnum.GRAY_ROLE_IMG_ID + data.offLineMsgList[m]["strangerMessage"]["FriendInfoBean"]["shape"]) + ".png" });
                            } else {
                                this.recentContactHeadImgArr.push({ img: "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + data.offLineMsgList[m]["strangerMessage"]["FriendInfoBean"]["shape"]) + ".png" });
                            }
                            this.setRecentContactZhiyeImg(data.offLineMsgList[m]["strangerMessage"]["FriendInfoBean"]["school"]);
                            this.recentContactNameArr.push(name);
                            this.recentContactLevelArr.push(roleLevel);
                            this.recentContactIdArr.push(roleid);
                            this.recentContactHeadIdArr.push(data.offLineMsgList[m]["strangerMessage"]["FriendInfoBean"]["shape"]);
                            this.recentContactZhiyeIdArr.push(data.offLineMsgList[m]["strangerMessage"]["FriendInfoBean"]["school"]);
                        }
                        //显示消息红点
                        for (let i: number = 0; i < this.recentContactIdArr.length; i++) {
                            if (this.recentContactIdArr[i] == roleid) {
                                let contactRolePointImg: Laya.Image =
                                    this._viewUI.recentContact_list.getCell(i).getChildByName("recentContactRolePoint_img") as Laya.Image;//联系人红点
                                let selectPoint = this._viewUI.select_list.getCell(0).getChildByName("selectPoint_img") as Laya.Image;//选择按钮红点
                                selectPoint.visible = true;
                                contactRolePointImg.visible = true;
                                models.FriendProxy.getInstance().event(models.receiveMessage_EVENT);//收到消息事件
                            }
                        }
                        this.getRecentContactListData();
                    }
                }
            }
        }
        /**好友聊天聊天S-->C */
        public onFriendMessageToRole(e: any): void {
            let data: hanlder.S2C_SFriendMessageToRole = models.FriendModel.getInstance().SFriendMessageToRoleData.get("data");
            //判断自己的记录并将记录保存在指定存放历史记录的数组里
            if (data.roleid == this.roleId) {
                this.historyInput.push({ context: this.historyMsg });
            } else if (data.roleid != 0) {
                this.updateMyChat(data.roleid);
                let time = this.getNowTime();
                let mymsgarr = [];//暂存发出消息
                let friendmsgarr = [];//好友消息
                let sendtimearr = [];//发出消息时间
                let friendtimearr = [];//收到消息时间
                let mydisplayinfoarr = [];//发出附件
                let frienddisplayinfoarr = [];//好友附件
                this.myMsgArr.push("");
                this.friendMsgArr.push(data.content);
                this.sendTimeArr.push("");
                this.friendTimeArr.push(time);
                this.myDisplayinfoArr.push("");
                if (data.displayinfo.length > 0)
                    this.friendDisplayinfoArr.push(data.displayinfo[0]);
                else
                    this.friendDisplayinfoArr.push("");
                for (let i: number = 0; i < this.myMsgArr.length; i++) {
                    mymsgarr.push(this.myMsgArr[i]);
                }
                for (let i: number = 0; i < this.friendMsgArr.length; i++) {
                    friendmsgarr.push(this.friendMsgArr[i]);
                }
                for (let i: number = 0; i < this.sendTimeArr.length; i++) {
                    sendtimearr.push(this.sendTimeArr[i]);
                }
                for (let i: number = 0; i < this.friendTimeArr.length; i++) {
                    friendtimearr.push(this.friendTimeArr[i]);
                }
                for (let i: number = 0; i < this.myDisplayinfoArr.length; i++) {
                    mydisplayinfoarr.push(this.myDisplayinfoArr[i]);
                }
                for (let i: number = 0; i < this.friendDisplayinfoArr.length; i++) {
                    frienddisplayinfoarr.push(this.friendDisplayinfoArr[i]);
                }
                this.myMsgData.set(data.roleid, mymsgarr);
                this.friendMsgData.set(data.roleid, friendmsgarr);
                this.sendTimeData.set(data.roleid, sendtimearr);
                this.friendTimeData.set(data.roleid, friendtimearr);
                this.myDisplayinfoData.set(data.roleid, mydisplayinfoarr);
                this.friendDisplayinfoData.set(data.roleid, frienddisplayinfoarr);
                //显示消息红点
                for (let i: number = 0; i < FriendModel.getInstance().friendIdArr.length; i++) {
                    //收到好友列表中的好友发来消息，在该好友头像上加红点，并通知主界面加红点
                    if (FriendModel.getInstance().friendIdArr[i] == data.roleid) {
                        let contactRolePointImg: Laya.Image = this._viewUI.contact_list.getCell(i).getChildByName("contactRoleInfo_btn").getChildByName("contactRolePoint_img") as Laya.Image;//联系人红点
                        let selectPoint = this._viewUI.select_list.getCell(1).getChildByName("selectPoint_img") as Laya.Image;//选择按钮红点
                        selectPoint.visible = true;
                        contactRolePointImg.visible = true;
                        models.FriendProxy.getInstance().event(models.receiveMessage_EVENT);//收到消息事件
                    }
                    this.switchRedPoint(data.roleid, i);
                }
                //如果与发送消息的人正在聊天，不显示消息红点
                if (FriendModel.getInstance().friendIdArr[this.selectNum] == data.roleid && this.selectRecentContactNum == -1) {
                    this.getMyChatData();
                    let contactRolePointImg: Laya.Image = this._viewUI.contact_list.getCell(this.selectNum).getChildByName("contactRoleInfo_btn").getChildByName("contactRolePoint_img") as Laya.Image;//联系人红点
                    let selectPoint = this._viewUI.select_list.getCell(1).getChildByName("selectPoint_img") as Laya.Image;//选择按钮红点
                    selectPoint.visible = false;
                    models.FriendProxy.getInstance().event(models.readMessage_EVENT);
                    contactRolePointImg.visible = false;
                }
            } else {
                //当好友下线
                this.historyInput.push({ context: this.historyMsg });
            }
            this.repstr = "";
            this._viewUI.chatInput_tex.text = "";
        }
        /** 联系人切换到最近联系显示红点
         * @param roleid 发起聊天的对方角色id
         * @param index 联系人那边索引位置
         * @describe 判断对方角色id是否添加到最近联系人
         *          如果有，就切换到最近联系那显示红点
         */
        private switchRedPoint(roleid: number, index: number): void {
            for (let i = 0; i < this.recentContactIdArr.length; i++) {
                if (this.recentContactIdArr[i] == roleid) {
                    //联系人那边不显示红点
                    let contactRolePointImg1: Laya.Image = this._viewUI.contact_list.getCell(index).getChildByName("contactRoleInfo_btn").getChildByName("contactRolePoint_img") as Laya.Image;//联系人红点
                    let selectPoint1 = this._viewUI.select_list.getCell(1).getChildByName("selectPoint_img") as Laya.Image;//联系人选择按钮红点
                    selectPoint1.visible = false;
                    contactRolePointImg1.visible = false;
                    //最近联系人那边显示红点
                    let contactRolePointImg2: Laya.Image =
                        this._viewUI.recentContact_list.getCell(i).getChildByName("recentContactRolePoint_img") as Laya.Image;//最近联系人红点
                    let selectPoint2 = this._viewUI.select_list.getCell(0).getChildByName("selectPoint_img") as Laya.Image;//最近联系人选择按钮红点
                    selectPoint2.visible = true;
                    contactRolePointImg2.visible = true;
                    let recentContactRoleInfo_btn: Laya.Button = this._viewUI.recentContact_list.getCell(i).getChildByName("recentContactRoleInfo_btn") as Laya.Button;
                    recentContactRoleInfo_btn.once(LEvent.CLICK, this, this.hideRedPoint, [selectPoint2, contactRolePointImg2]);
                    this.getRecentChatData();
                }
            }
        }
        /** 隐藏红点 */
        private hideRedPoint(img1: Laya.Image, img2: Laya.Image): void {
            if (img1.visible == true && img2.visible == true) {
                img1.visible = false;
                img2.visible = false;
                models.FriendProxy.getInstance().event(models.readMessage_EVENT);
            }
        }
        /**更新陌生人聊天 */
        public updateRecentChat(roleid: number): void {
            //如果与陌生人对话的字典中有数据，取出，赋给当前陌生人对话数组
            if (this.recentContactMsgData.get(roleid) != null) {
                this.torecentContactMsgArr.length = 0;
                this.recentContactMsgArr.length = 0;
                this.torecentContactTimeArr.length = 0;
                this.recentContactTimeArr.length = 0;
                this.torecentContactDisplayinfoArr.length = 0;
                this.recentContactDisplayinfoArr.length = 0;
                for (let i: number = 0; i < this.torecentContactMsgData.get(roleid).length; i++) {
                    this.torecentContactMsgArr.push(this.torecentContactMsgData.get(roleid)[i]);
                }
                for (let i: number = 0; i < this.recentContactMsgData.get(roleid).length; i++) {
                    this.recentContactMsgArr.push(this.recentContactMsgData.get(roleid)[i]);
                }
                for (let i: number = 0; i < this.torecentContactTimeData.get(roleid).length; i++) {
                    this.torecentContactTimeArr.push(this.torecentContactTimeData.get(roleid)[i]);
                }
                for (let i: number = 0; i < this.recentContactTimeData.get(roleid).length; i++) {
                    this.recentContactTimeArr.push(this.recentContactTimeData.get(roleid)[i]);
                }
                for (let i: number = 0; i < this.torecentContactDisplayinfoData.get(roleid).length; i++) {
                    this.torecentContactDisplayinfoArr.push(this.torecentContactDisplayinfoData.get(roleid)[i]);
                }
                for (let i: number = 0; i < this.recentContactDisplayinfoData.get(roleid).length; i++) {
                    this.recentContactDisplayinfoArr.push(this.recentContactDisplayinfoData.get(roleid)[i]);
                }
            } else if (this.recentContactMsgData.get(roleid) == null) {
                this.torecentContactMsgArr.length = 0;
                this.recentContactMsgArr.length = 0;
                this.torecentContactTimeArr.length = 0;
                this.recentContactTimeArr.length = 0;
                this.torecentContactDisplayinfoArr.length = 0;
                this.recentContactDisplayinfoArr.length = 0;
            }
        }
        /**更新好友聊天 */
        public updateMyChat(roleid: number): void {
            //如果与好友对话的字典中有数据，取出，赋给当前好友对话数组
            if (this.friendMsgData.get(roleid) != null) {
                this.myMsgArr.length = 0;
                this.sendTimeArr.length = 0;
                this.friendMsgArr.length = 0;
                this.friendTimeArr.length = 0;
                this.myDisplayinfoArr.length = 0;
                this.friendDisplayinfoArr.length = 0;
                for (let i: number = 0; i < this.myMsgData.get(roleid).length; i++) {
                    this.myMsgArr.push(this.myMsgData.get(roleid)[i]);
                }
                for (let i: number = 0; i < this.friendMsgData.get(roleid).length; i++) {
                    this.friendMsgArr.push(this.friendMsgData.get(roleid)[i]);
                }
                for (let i: number = 0; i < this.sendTimeData.get(roleid).length; i++) {
                    this.sendTimeArr.push(this.sendTimeData.get(roleid)[i]);
                }
                for (let i: number = 0; i < this.friendTimeData.get(roleid).length; i++) {
                    this.friendTimeArr.push(this.friendTimeData.get(roleid)[i]);
                }
                for (let i: number = 0; i < this.myDisplayinfoData.get(roleid).length; i++) {
                    this.myDisplayinfoArr.push(this.myDisplayinfoData.get(roleid)[i]);
                }
                for (let i: number = 0; i < this.friendDisplayinfoData.get(roleid).length; i++) {
                    this.friendDisplayinfoArr.push(this.friendDisplayinfoData.get(roleid)[i]);
                }
            } else if (this.friendMsgData.get(roleid) == null) {
                this.myMsgArr.length = 0;
                this.sendTimeArr.length = 0;
                this.friendMsgArr.length = 0;
                this.friendTimeArr.length = 0;
                this.myDisplayinfoArr.length = 0;
                this.friendDisplayinfoArr.length = 0;
            }
        }
        /**与陌生人聊天列表初始化 */
        public getRecentChatData(): void {
            this._viewUI.recentChatInfo_list.vScrollBarSkin = "";
            this._viewUI.recentChatInfo_list.scrollBar.elasticBackTime = 200;
            this._viewUI.recentChatInfo_list.scrollBar.elasticDistance = 50;
            this._viewUI.recentChatInfo_list.array = this.torecentContactMsgArr;
            this._viewUI.recentChatInfo_list.renderHandler = new Handler(this, this.onRenderRecentChatItem);
            //保持输入的值在第一视角
            if (this.torecentContactMsgArr.length > 2)
                this._viewUI.recentChatInfo_list.scrollTo(this.torecentContactMsgArr.length - 1);
        }
        /**陌生人聊天列表渲染 */
        public onRenderRecentChatItem(cell: Laya.Box, index: number): void {
            //渲染自己发出的消息
            let weChat: Laya.Image = cell.getChildByName("weChatLogo_img") as Laya.Image;
            weChat.visible = true;
            if (this.torecentContactMsgArr[index] == "") {
                weChat.visible = false;
            }
            let roleLogo: Laya.Image = cell.getChildByName("weChatLogo_img").getChildByName("roleLogo_img") as Laya.Image;
            this.chatContent = cell.getChildByName("weChatLogo_img").getChildByName("chat0_txtarea") as Laya.HTMLDivElement;
            let weChat_img: Laya.Image = cell.getChildByName("weChatLogo_img").getChildByName("weChat_img") as Laya.Image;
            let timeLab1: Laya.Label = cell.getChildByName("weChatLogo_img").getChildByName("time_lab") as Laya.Label;
            timeLab1.text = this.torecentContactTimeArr[index];
            this.chatContent.innerHTML = "<span style='font:24px ;color:#50321a'>" + ChatModel.getInstance().getFaceHtmlText(this.torecentContactMsgArr[index]) + "</span>";
            this.chatContent.style.width = 380;
            if (this.chatContent.contextWidth >= 370) {
                this.chatContent.style.align = "left";
            } else {
                this.chatContent.style.align = "right";
            }
            weChat_img.height = this.chatContent.contextHeight + 15;
            weChat_img.width = this.chatContent.contextWidth + 20;
            roleLogo.skin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + this.shape) + ".png";
            //如果发送的是道具，给文本添加监听事件，可以弹出信息
            if (this.torecentContactDisplayinfoArr[index] != "" && this.torecentContactDisplayinfoArr[index].displaytype == DisplayType.DISPLAY_ITEM)
                this.chatContent.on(LEvent.MOUSE_DOWN, this, this.showItemTips, [this.torecentContactDisplayinfoArr[index]]);
            else if (this.torecentContactDisplayinfoArr[index] != "")
                this.chatContent.on(LEvent.MOUSE_DOWN, this, this.otherOnItem, [this.torecentContactDisplayinfoArr[index], this.torecentContactMsgArr[index]]);
            let otherChat: Laya.Image = cell.getChildByName("otherChatLogo_img") as Laya.Image;
            otherChat.visible = true;
            if (this.recentContactMsgArr[index] == "") {
                otherChat.visible = false;
            }
            this.chatContent = cell.getChildByName("otherChatLogo_img").getChildByName("chat0_txtarea") as Laya.HTMLDivElement;
            let img: Laya.Image = cell.getChildByName("otherChatLogo_img").getChildByName("otherChat_img") as Laya.Image;
            let otherRoleLogo: Laya.Image = cell.getChildByName("otherChatLogo_img").getChildByName("roleLogo_img") as Laya.Image;
            let timeLab: Laya.Label = cell.getChildByName("otherChatLogo_img").getChildByName("time_lab") as Laya.Label;
            timeLab.text = this.recentContactTimeArr[index];
            this.chatContent.innerHTML = "<span style='font:24px ;color:#50321a; SimHei'> " + ChatModel.getInstance().getFaceHtmlText(this.recentContactMsgArr[index]) + "</span>";
            img.height = this.chatContent.contextHeight + 15;
            img.width = this.chatContent.contextWidth + 25;
            otherRoleLogo.skin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + this.recentContactHeadIdArr[this.selectRecentContactNum]) + ".png";
            //如果发送的是道具，给文本添加监听事件，可以弹出信息
            if (this.recentContactDisplayinfoArr[index] != "") {
                this.chatContent.on(LEvent.MOUSE_DOWN, this, this.otherOnItem, [this.recentContactDisplayinfoArr[index], this.recentContactMsgArr[index]]);
            }
        }
        /**好友聊天列表初始化 */
        public getMyChatData(): void {
            this._viewUI.mychatInfo_list.vScrollBarSkin = "";
            this._viewUI.mychatInfo_list.scrollBar.elasticBackTime = 200;
            this._viewUI.mychatInfo_list.scrollBar.elasticDistance = 50;
            this._viewUI.mychatInfo_list.array = this.myMsgArr;
            this._viewUI.mychatInfo_list.renderHandler = new Handler(this, this.onRenderMyChatItem);
            //保持输入的值在第一视角
            if (this.myMsgArr.length > 2)
                this._viewUI.mychatInfo_list.scrollTo(this.myMsgArr.length - 1);
            if (this.myMsgArr.length != 0 || this.friendMsgArr.length != 0) {
                this.addRecentContacts();
                this.chatDataWriteToLocalStorage(this.recentContactIdArr);
            }
        }
        /** 将接受到好友最近聊天消息的对应好友添加到最近联系人中去 */
        private addRecentContacts(): void {
            //定义临时角色id，角色名字，角色等级，角色模型id，角色职业id的变量，角色在线状态
            let roleid, rolename, rolelevel, roleshape, roleschool, rolelinestate;
            let friendModel = FriendModel.getInstance();
            roleid = friendModel.friendIdArr[this.selectNum];
            rolename = friendModel.friendNameArr[this.selectNum];
            rolelevel = friendModel.friendLevelArr[this.selectNum];
            roleshape = friendModel.touxiangIdArr[this.selectNum];
            roleschool = friendModel.zhiyeIdArr[this.selectNum];
            rolelinestate = friendModel.friendIsOnline[this.selectNum];
            for (let i = 0; i < this.recentContactIdArr.length; i++) {
                if (this.recentContactIdArr[i] == roleid) {
                    this.recentContactIdArr.splice(i, 1);
                    this.recentContactNameArr.splice(i, 1);
                    this.recentContactLevelArr.splice(i, 1);
                    this.recentContactHeadImgArr.splice(i, 1);
                    this.recentContactZhiyeImgArr.splice(i, 1);
                }
            }
            this.recentContactIdArr.unshift(roleid);
            this.recentContactNameArr.unshift(rolename);
            this.recentContactLevelArr.unshift(rolelevel);
            //this.recentContactHeadIdArr.unshift(roleshape);
            if (rolelinestate != FriendEnum.OFFLINE_STATE) {
                this.recentContactHeadImgArr.unshift({ img: "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + roleshape) + ".png" });//在线的小头像
            }
            else {
                this.recentContactHeadImgArr.unshift({ img: "common/icon/grayavatarrole/" + (FriendEnum.GRAY_ROLE_IMG_ID + roleshape) + ".png" });//不在线的小头像
            }
            this.recentContactZhiyeImgArr = this.arrayHeadInsert(roleschool, this.recentContactZhiyeImgArr, roleschool);
            // this.getRecentContactListData();
            // this.onRecentContactSelect(0);
        }
        /**好友聊天列表渲染 */
        public onRenderMyChatItem(cell: Laya.Box, index: number): void {
            //渲染自己发出的消息
            let weChat: Laya.Image = cell.getChildByName("weChatLogo_img") as Laya.Image;
            weChat.visible = true;
            if (this.myMsgArr[index] == "") {
                weChat.visible = false;
            }
            let roleLogo: Laya.Image = cell.getChildByName("weChatLogo_img").getChildByName("roleLogo_img") as Laya.Image;
            this.chatContent = cell.getChildByName("weChatLogo_img").getChildByName("chat0_txtarea") as Laya.HTMLDivElement;
            let weChat_img: Laya.Image = cell.getChildByName("weChatLogo_img").getChildByName("weChat_img") as Laya.Image;
            let timeLab1: Laya.Label = cell.getChildByName("weChatLogo_img").getChildByName("time_lab") as Laya.Label;
            timeLab1.text = this.sendTimeArr[index];
            this.chatContent.innerHTML = "<span style='font:24px ;color:#50321a'>" + ChatModel.getInstance().getFaceHtmlText(this.myMsgArr[index]) + "</span>";
            this.chatContent.style.width = 380;
            if (this.chatContent.contextWidth >= 370) {
                this.chatContent.style.align = "left";
            } else {
                this.chatContent.style.align = "right";
            }
            weChat_img.height = this.chatContent.contextHeight + 15;
            weChat_img.width = this.chatContent.contextWidth + 20;
            roleLogo.skin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + this.shape) + ".png";
            if (this.myDisplayinfoArr[index] != "" && this.myDisplayinfoArr[index].displaytype == DisplayType.DISPLAY_ITEM)
                this.chatContent.on(LEvent.MOUSE_DOWN, this, this.showItemTips, [this.myDisplayinfoArr[index]]);
            else if (this.myDisplayinfoArr[index] != "")
                this.chatContent.on(LEvent.MOUSE_DOWN, this, this.otherOnItem, [this.myDisplayinfoArr[index], this.myMsgArr[index]]);
            let otherChat: Laya.Image = cell.getChildByName("otherChatLogo_img") as Laya.Image;
            otherChat.visible = true;
            if (this.friendMsgArr[index] == "") {
                otherChat.visible = false;
            }
            this.chatContent = cell.getChildByName("otherChatLogo_img").getChildByName("chat0_txtarea") as Laya.HTMLDivElement;
            let img: Laya.Image = cell.getChildByName("otherChatLogo_img").getChildByName("otherChat_img") as Laya.Image;
            let otherRoleLogo: Laya.Image = cell.getChildByName("otherChatLogo_img").getChildByName("roleLogo_img") as Laya.Image;
            let timeLab: Laya.Label = cell.getChildByName("otherChatLogo_img").getChildByName("time_lab") as Laya.Label;
            timeLab.text = this.friendTimeArr[index];
            this.chatContent.innerHTML = "<span style='font:24px ;color:#50321a; SimHei'> " + ChatModel.getInstance().getFaceHtmlText(this.friendMsgArr[index]) + "</span>";
            img.height = this.chatContent.contextHeight + 15;
            img.width = this.chatContent.contextWidth + 25;
            otherRoleLogo.skin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + FriendModel.getInstance().touxiangIdArr[this.selectNum]) + ".png";
            if (this.friendDisplayinfoArr[index] != "") {
                this.chatContent.on(LEvent.MOUSE_DOWN, this, this.otherOnItem, [this.friendDisplayinfoArr[index], this.friendMsgArr[index]]);
            }
        }

        /**获取时间戳 */
        public getNowTime(): any {
            let date = new Date();
            let str1 = "-";
            let str2 = ":";
            let strMonth = (date.getMonth() + 1).toString();
            let strDate = (date.getDate()).toString();
            let strHour = (date.getHours()).toString();
            let strMinute = (date.getMinutes()).toString();
            let strSeconds = (date.getSeconds()).toString();
            if (parseInt(strMonth) >= 1 && parseInt(strMonth) <= 9) {
                strMonth = "0" + strMonth;
            }
            if (parseInt(strDate) >= 1 && parseInt(strDate) <= 9) {
                strDate = "0" + strDate;
            }
            if (parseInt(strHour) >= 1 && parseInt(strHour) <= 9) {
                strHour = "0" + strHour;
            }
            if (parseInt(strMinute) >= 1 && parseInt(strMinute) <= 9) {
                strMinute = "0" + strMinute;
            }
            if (parseInt(strSeconds) >= 1 && parseInt(strSeconds) <= 9) {
                strSeconds = "0" + strSeconds;
            }
            let currentdate = date.getFullYear() + str1 + strMonth + str1 + strDate
                + " " + strHour + str2 + strMinute
                + str2 + strSeconds;
            return currentdate;
        }
        /**服务器返回黑名单列表信息-->C */
        public onBlackRoles(e: any): void {
            this.blacklistuserNameArr.length = 0;
            this.blacklistuserLevelArr.length = 0;
            this.blacklistuserHeadImgArr.length = 0;
            this.blacklistuserZhiyeImgArr.length = 0;
            this.blacklistuserIdArr.length = 0;
            let data: hanlder.S2C_black_roles = models.FriendModel.getInstance().SBlackRolesData.get("data");
            for (let i: number = 0; i < data.blackRoles.length; i++) {
                this.blacklistuserNameArr.push(data.blackRoles[i]["name"]);
                this.blacklistuserLevelArr.push(data.blackRoles[i]["level"]);
                this.blacklistuserHeadImgArr.push({ img: "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + data.blackRoles[i]["shape"]) + ".png" });
                this.setBlacklistuserZhiyeImg(data.blackRoles[i]["school"]);
                this.blacklistuserIdArr.push(data.blackRoles[i]["roleId"]);
                //判断是否还遗留在好友列表中
                let _pos = models.FriendModel.getInstance().friendIdArr.indexOf(data.blackRoles[i]["roleId"]);
                if (_pos > -1) {
                    FriendModel.getInstance().removeFriend(data.blackRoles[i]["roleId"]);
                    this.getListData();
                }
            }
            this.getBlackListData();
            this._viewUI.blacklistNum_lab.text = this.blacklistuserNameArr.length.toString();//黑名单人数
        }
        /**服务器返回搜索的角色信息-->C */
        public onSearchBlackRoleInfo(e: any): void {
            let data: hanlder.S2C_search_blackroleinfo = models.FriendModel.getInstance().SSearchBlackRoleInfoData.get("data");
            this.blacklistuserNameArr.length = 0;
            this.blacklistuserLevelArr.length = 0;
            this.blacklistuserHeadImgArr.length = 0;
            this.blacklistuserZhiyeImgArr.length = 0;
            this.blacklistuserIdArr.length = 0;
            this.blacklistuserNameArr.push(data.searchBlackRole["name"]);
            this.blacklistuserLevelArr.push(data.searchBlackRole["roleLevel"]);
            if (data.searchBlackRole["online"] == 0) {
                this.blacklistuserHeadImgArr.push({ img: "common/icon/grayavatarrole/" + (FriendEnum.GRAY_ROLE_IMG_ID + data.searchBlackRole["shape"]) + ".png" });
            } else {
                this.blacklistuserHeadImgArr.push({ img: "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + data.searchBlackRole["shape"]) + ".png" });
            }
            this.setBlacklistuserZhiyeImg(data.searchBlackRole["school"]);
            this.blacklistuserIdArr.push(data.searchBlackRole["roleId"]);
            this._viewUI.addBlackList_list.visible = true;
            this.getAddBlackListData();
        }
        /**添加好友成功S-->C */
        public onAddFriend(e: any): void {
            this._viewUI.myFriend_btn.label = models.FriendModel.chineseStr.friend + FriendModel.getInstance().friendNameArr.length + models.FriendModel.chineseStr.friendNum;//好友数量
            this.onRecentContactSelect(this.selectRecentContactNum);
            this.getListData();
        }
        /**好友信息初始化加载 */
        public onFriendsInfoInit(e: any): void {
            this._viewUI.myFriend_btn.label = models.FriendModel.chineseStr.friend + FriendModel.getInstance().friendNameArr.length + models.FriendModel.chineseStr.friendNum;//好友数量
            let myData = createrole.models.LoginModel.getInstance().roleDetail;
            this.roleId = myData.roleid;  //本人id
            this.shape = myData.shape;
            this.getListData();
        }

        /** 系统消息 */
        public onSendSystemMessageToRole(): void {
            let data: hanlder.S2C_SSendSystemMessageToRole = models.FriendModel.getInstance().SSendSystemMessageToRoleData.get("data");
            if (data != undefined) {
                //如果是0 表示是系统消息 大于0的一定是好友发的消息
                if (data.systemRoleId == FriendEnum.SYSTEM_FRIEND) {
                    //显示红点
                    this._viewUI.systemMsgPoing_img.visible = true;
                    this._viewUI.systemMsgPoint2_img.visible = true;
                    let selectPoint = this._viewUI.select_list.getCell(0).getChildByName("selectPoint_img") as Laya.Image;//选择按钮红点
                    selectPoint.visible = true;
                    models.FriendProxy.getInstance().event(models.receiveMessage_EVENT);//收到消息事件
                }
            }
            this.getSystemMessagePanelData();
        }


        /** 点击名字
         * @param contentText 消息内容
         */
        private onClickName(contentText): void {
            let dicValue = models.FriendModel.getInstance().needClickNameDic.get(contentText);
            if (dicValue) {
                let npcid = dicValue[0].targetid;
                let mapid = HudModel.getInstance().cNPCConfigData[npcid]["mapid"];
                HudModel.getInstance().useapp = this._app;
                HudModel.getInstance().useapp.sceneRoot.istask = 2;
                game.modules.mainhud.models.HudModel.getInstance().jumpmap(mapid, npcid);
                ModuleManager.hide(ModuleNames.FRIEND);
            }
        }

        /**注册点击事件 */
        private registerEvent(): void {
            this._viewUI.addFriend_btn.on(LEvent.MOUSE_DOWN, this, this.showAddFriendView);
            this.setBtnImg(this._viewUI.systemMsg_btn);
            this._viewUI.systemMsg_btn.on(LEvent.MOUSE_DOWN, this, this.showNotification, [this._viewUI.systemMsg_btn]);
            this.setBtnImg(this._viewUI.systemMsg2_btn);
            this._viewUI.systemMsg2_btn.on(LEvent.MOUSE_DOWN, this, this.showNotification, [this._viewUI.systemMsg2_btn]);
            this._viewUI.blacklist_btn.on(LEvent.MOUSE_DOWN, this, this.showBlacklist);
            this._viewUI.myFriend_btn.on(LEvent.MOUSE_DOWN, this, this.showMyFriend);
            this._viewUI.give_btn.on(LEvent.MOUSE_DOWN, this, this.sendRequest);
            this._viewUI.add_friend_btn.on(LEvent.MOUSE_DOWN, this, this.addFriend);
            this._viewUI.addBlackListFind_btn.on(LEvent.MOUSE_DOWN, this, this.addBlackListFind);
            this._viewUI.face_btn.on(LEvent.MOUSE_DOWN, this, this.openFace);
            this._viewUI.close2_btn.on(LEvent.MOUSE_DOWN, this, this.closeFace);
            this._viewUI.send_btn.on(LEvent.MOUSE_UP, this, this.sendChat);
            this._viewUI.clean_btn.on(LEvent.MOUSE_UP, this, this.cleanChat);
            this._viewUI.addBlackId_lab.on(LEvent.MOUSE_UP, this, this.showKeypad);

            //监听系统好友消息
            models.FriendProxy.getInstance().on(models.SSendSystemMessageToRole_EVENT, this, this.onSendSystemMessageToRole);
            //监听添加好友结果
            models.FriendProxy.getInstance().on(models.SAddFriend_EVENT, this, this.onAddFriend);
            //监听人物弹窗发出消息事件
            models.FriendProxy.getInstance().on(models.transMessage_EVENT, this, this.ontransMessage);
            //监听玩家信息变化
            models.FriendProxy.getInstance().on(models.SRequestUpdateRoleInfo_EVENT, this, this.onRequestUpdateRoleInfo);
            //监听搜索黑名单返回的角色信息
            models.FriendProxy.getInstance().on(models.SSearchBlackRoleInfo_EVENT, this, this.onSearchBlackRoleInfo);
            //监听服务器返回的黑名单列表
            models.FriendProxy.getInstance().on(models.SBlackRoles_EVENT, this, this.onBlackRoles);
            //监听与好友之间的对话信息
            models.FriendProxy.getInstance().on(models.SFriendMessageToRole_EVENT, this, this.onFriendMessageToRole);
            //监听与陌生人之间的对话消息
            models.FriendProxy.getInstance().on(models.SStrangerMessageToRole_EVENT, this, this.onStrangerMessageToRole);
            //监听好友列表初始化信息
            models.FriendProxy.getInstance().on(models.SFriendsInfoInit_EVENT, this, this.onFriendsInfoInit);
            //监听角色下线期间收到的对话信息
            models.FriendProxy.getInstance().on(models.SOffLineMsgMessageToRole_EVENT, this, this.onOffLineMsgMessageToRole);
            //监听好友度变化
            models.FriendProxy.getInstance().on(models.SUpdateFriendLevel_EVENT, this, this.onUpdateFriendLevel);
            //监听删除好友结果
            models.FriendProxy.getInstance().on(models.SBreakOffRelation_EVENT, this, this.onBreakOffRelation);
        }
        /** 显示小键盘 */
        private showKeypad(): void {
            this._viewUI.addBlackId_lab.text = "";
            this.currInputText = "";
            tips.models.TipsProxy.getInstance().on(tips.models.ON_KRYBOARD, this, this.onKeyboard);
            let _XiaoJianPanMediator = new tips.XiaoJianPanMediator(this._viewUI);
            _XiaoJianPanMediator.onShow(this._viewUI.addBlackId_lab.x + this._viewUI.addBlackId_lab.width, this._viewUI.addBlackId_lab.y + this._viewUI.addBlackList_box.y + 40);
        }
        /** 
         * 接收小键盘输入
         * @param num  接收的小键盘值
         */
        private onKeyboard(num: number): void {
            if (num != -2) {//点击了ok

            }
            if (num == -1) {//点击了删除
                this.currInputText = this.currInputText.substring(0, this.currInputText.length - 1);
                if (this.currInputText.length <= 0) {
                    this.currInputText = "";
                }
            }
            if (num >= 0) {//点击了其它数字
                let oneChar = this.currInputText.charAt(0);
                if (oneChar != '0') {
                    this.currInputText += num.toString();
                }
                else if (this.currInputText.length > 10) {
                    this.currInputText = num.toString();
                }
            }
            this._viewUI.addBlackId_lab.text = this.currInputText;
        }
        /** 添加好友 */
        private addFriend(): void {
            RequesterProtocols._instance.c2s_CRequestAddFriend(this.recentContactIdArr[this.selectRecentContactNum]);
        }

        /**清空当前聊天记录 */
        public cleanChat(): void {
            if (this._viewUI.select_list.selectedIndex == 1) {//联系人界面
                let roleid = FriendModel.getInstance().friendIdArr[this.selectNum];
                this.myMsgData.set(roleid, "");
                this.friendMsgData.set(roleid, "");
                this.sendTimeData.set(roleid, "");
                this.friendTimeData.set(roleid, "");
                this.myMsgArr.length = 0;
                this.sendTimeArr.length = 0;
                this.friendMsgArr.length = 0;
                this.friendTimeArr.length = 0;
                this.getMyChatData();
            }
            else {//最近人联系人界面
                let recentRoleId = this.recentContactIdArr[this.selectRecentContactNum];
                let _isFriendFlag = models.FriendModel.getInstance().isMyFriend(recentRoleId);
                if (_isFriendFlag == FriendEnum.FRIEND_KEY) {
                    this.myMsgData.set(recentRoleId, "");
                    this.friendMsgData.set(recentRoleId, "");
                    this.sendTimeData.set(recentRoleId, "");
                    this.friendTimeData.set(recentRoleId, "");
                    this.myMsgArr.length = 0;
                    this.sendTimeArr.length = 0;
                    this.friendMsgArr.length = 0;
                    this.friendTimeArr.length = 0;
                    this.getMyChatData();
                }
                this.torecentContactMsgData.set(recentRoleId, "");
                this.torecentContactTimeData.set(recentRoleId, "");
                this.recentContactMsgData.set(recentRoleId, "");
                this.recentContactTimeData.set(recentRoleId, "");
                this.torecentContactMsgArr.length = 0;
                this.torecentContactTimeArr.length = 0;
                this.recentContactMsgArr.length = 0;
                this.recentContactTimeArr.length = 0;
                this.getRecentChatData();
            }
        }
        /**添加黑名单查找 */
        public addBlackListFind(): void {
            RequesterProtocols._instance.c2s_search_blackrole(parseInt(this._viewUI.addBlackId_lab.text));
        }
        /**初始化陌生人列表*/
        public getRecentContactListData(): void {
            this._viewUI.recentContact_list.vScrollBarSkin = "";
            this._viewUI.recentContact_list.scrollBar.elasticBackTime = 200;
            this._viewUI.recentContact_list.scrollBar.elasticDistance = 50;
            this._viewUI.recentContact_list.array = this.recentContactNameArr;
            this._viewUI.recentContact_list.repeatY = this.recentContactNameArr.length;
            this._viewUI.recentContact_list.repeatX = 1;
            this._viewUI.recentContact_list.renderHandler = new Handler(this, this.onRecentContactRender);
            this._viewUI.recentContact_list.selectHandler = new Handler(this, this.onRecentContactSelect);
            this._viewUI.recentContact_list.selectedIndex = -1;
        }
        /**渲染陌生人列表 */
        public onRecentContactRender(cell: Laya.Box, index: number): void {
            let recentContactRoleInfo_btn: Laya.Button = cell.getChildByName("recentContactRoleInfo_btn") as Laya.Button;
            recentContactRoleInfo_btn.on(LEvent.CLICK, this, this.showSelected, [recentContactRoleInfo_btn, index]);
            this.setBtnImg(recentContactRoleInfo_btn);
            let nameLab: Laya.Label = cell.getChildByName("recentContactName_lab") as Laya.Label;
            let levelLab: Laya.Label = cell.getChildByName("recentContactLevel_lab") as Laya.Label;
            let contactContentImg: Laya.Image = cell.getChildByName("recentContactContent_img") as Laya.Image;
            let contactSchoolImg: Laya.Image = cell.getChildByName("recentContactSchool_img") as Laya.Image;
            let recentContactCheckBtn: Laya.Button = cell.getChildByName("recentContactCheck_btn") as Laya.Button;
            nameLab.text = this.recentContactNameArr[index];
            levelLab.text = this.recentContactLevelArr[index].toString();
            contactContentImg.skin = this.recentContactHeadImgArr[index].img;
            contactSchoolImg.skin = this.recentContactZhiyeImgArr[index].img;
            recentContactCheckBtn.on(LEvent.MOUSE_DOWN, this, this.showContact, [this.recentContactIdArr[index], FriendEnum.STRANGE_KEY]);
        }
        /** 陌生人关系时聊天消息内容插入到好友关系的聊天消息内容中去
         * @param roleid 关系从陌生人变成好友的角色id
         */
        private strangersChatMsgs_insert_friendsChatMsgs(roleid: number): void {
            if (this.recentContactMsgData.get(roleid) == null && this.recentContactMsgData.get(roleid) == undefined && this.torecentContactMsgData.get(roleid) == null && this.torecentContactMsgData.get(roleid) == undefined) {
                return;
            }
            this.myMsgData.set(roleid, this.torecentContactMsgData.get(roleid));
            this.friendMsgData.set(roleid, this.recentContactMsgData.get(roleid));
            this.sendTimeData.set(roleid, this.torecentContactTimeData.get(roleid));
            this.friendTimeData.set(roleid, this.recentContactTimeData.get(roleid));
            this.myDisplayinfoData.set(roleid, this.torecentContactDisplayinfoData.get(roleid));
            this.friendDisplayinfoData.set(roleid, this.recentContactDisplayinfoData.get(roleid));
        }
        /**陌生人列表点击处理 */
        public onRecentContactSelect(index: number): void {
            if (index != -1) {
                this.selectRecentContactNum = index;
                //判断是否变成了好友
                for (let i: number = 0; i < FriendModel.getInstance().friendIdArr.length; i++) {
                    if (FriendModel.getInstance().friendIdArr[i] == this.recentContactIdArr[index]) {//如果变成好友，还要把之前对方处于陌生人关系时聊天消息内容插入到好友关系的聊天消息内容中去
                        this.strangersChatMsgs_insert_friendsChatMsgs(this.recentContactIdArr[index]);
                        this.onSelect(i);
                        this._viewUI.recentContact_list.selectedIndex = -1;
                        return;
                    }
                }
                this._viewUI.friendChat_box.visible = true;
                this._viewUI.relation_box.visible = true;
                this._viewUI.add_friend_btn.visible = true;
                this._viewUI.mychatInfo_list.visible = false;
                this._viewUI.chatButton_box.visible = true;
                this._viewUI.notification_panel.visible = false;
                this._viewUI.recentChatInfo_list.visible = true;
                this._viewUI.friendDegree_lab.text = "0";
                this._viewUI.relation_lab.text = "陌生人";
                let roleid = this.recentContactIdArr[this.selectRecentContactNum];
                this.updateRecentChat(roleid);
                this.getRecentChatData();
                this._viewUI.recentContact_list.selectedIndex = -1;
            }
        }
        /**初始化联系人列表 */
        public getListData(): void {
            this._viewUI.contact_list.vScrollBarSkin = "";
            this._viewUI.contact_list.scrollBar.elasticBackTime = 200;
            this._viewUI.contact_list.scrollBar.elasticDistance = 50;
            this._viewUI.contact_list.array = FriendModel.getInstance().friendIdArr;
            this._viewUI.contact_list.repeatY = FriendModel.getInstance().friendNameArr.length;
            this._viewUI.contact_list.repeatX = 1;
            this._viewUI.contact_list.renderHandler = new Handler(this, this.onRender);
            this._viewUI.contact_list.selectHandler = new Handler(this, this.onSelect);
            this._viewUI.contact_list.selectedIndex = -1;
        }
        /**渲染联系人列表 */
        public onRender(cell: Laya.Box, index: number): void {
            let contactRoleInfo_btn: Laya.Button = cell.getChildByName("contactRoleInfo_btn") as Laya.Button;
            contactRoleInfo_btn.on(LEvent.CLICK, this, this.showSelected, [contactRoleInfo_btn]);
            this.setBtnImg(contactRoleInfo_btn);
            let nameLab: Laya.Label = contactRoleInfo_btn.getChildByName("contactName_lab") as Laya.Label;
            let levelLab: Laya.Label = contactRoleInfo_btn.getChildByName("contactlevel_lab") as Laya.Label;
            let contactContentImg: Laya.Image = contactRoleInfo_btn.getChildByName("contactContent_img") as Laya.Image;
            let contactSchoolImg: Laya.Image = contactRoleInfo_btn.getChildByName("contactSchool_img") as Laya.Image;
            let contactCheckBtn: Laya.Button = contactRoleInfo_btn.getChildByName("contactCheck_btn") as Laya.Button;
            nameLab.text = FriendModel.getInstance().friendNameArr[index];
            levelLab.text = FriendModel.getInstance().friendLevelArr[index].toString();
            contactContentImg.skin = FriendModel.getInstance().touxiangImgArr[index].img;
            contactSchoolImg.skin = FriendModel.getInstance().zhiyeImgArr[index];
            contactCheckBtn.on(LEvent.MOUSE_DOWN, this, this.showContact, [FriendModel.getInstance().friendIdArr[index], FriendEnum.FRIEND_KEY]);
        }
        /** 设置按钮的底图显示 */
        private setBtnImg(btn): void {
            if (this.lastBtn && this.lastBtn == btn) {
                btn.skin = "common/ui/tongyong/common_list_3textbg2.png";
            }
            else {
                btn.skin = "common/ui/tongyong/common_list_3textbg.png";
            }
        }
        /** 显示出被选中的效果
         * @param btn 被选中的按钮
         * @param index 最近联系列表中第几个按钮被选中
         */
        private showSelected(btn, index?: number): void {
            if (this.lastBtn) {
                this.lastBtn.skin = "common/ui/tongyong/common_list_3textbg.png";
            }
            btn.skin = "common/ui/tongyong/common_list_3textbg2.png";
            this.lastBtn = btn;
            if (index != undefined && this._viewUI.select_list.selectedIndex == 0) {//最近联系页面
                let contactRolePointImg2: Laya.Image =
                    this._viewUI.recentContact_list.getCell(index).getChildByName("recentContactRolePoint_img") as Laya.Image;//最近联系人红点
                let selectPoint2 = this._viewUI.select_list.getCell(0).getChildByName("selectPoint_img") as Laya.Image;//最近联系人选择按钮红点
                if (selectPoint2.visible == true && contactRolePointImg2.visible == true) {//如果有显示红点，被点击后，红点消失
                    selectPoint2.visible = false;
                    contactRolePointImg2.visible = false;
                    models.FriendProxy.getInstance().event(models.readMessage_EVENT);
                }
            }
        }
        /**联系人列表点击处理 */
        public onSelect(index: number): void {
            if (index != -1) {
                this.selectNum = index;
                this._viewUI.friendChat_box.visible = true;
                this._viewUI.relation_box.visible = true;
                this._viewUI.add_friend_btn.visible = false;
                this._viewUI.mychatInfo_list.visible = true;
                this._viewUI.chatButton_box.visible = true;
                this._viewUI.notification_panel.visible = false;
                this._viewUI.recentChatInfo_list.visible = false;
                this._viewUI.relation_lab.text = "普通好友";
                let friendid = FriendModel.getInstance().friendIdArr[this.selectNum];//当前选中好友id
                let _friendDegreeDic = FriendModel.getInstance().friendDegreeDic;
                if (_friendDegreeDic.get(friendid) != undefined)
                    this._viewUI.friendDegree_lab.text = _friendDegreeDic.get(friendid);//好友度
                let contactRolePointImg: Laya.Image = this._viewUI.contact_list.getCell(index).getChildByName("contactRoleInfo_btn").getChildByName("contactRolePoint_img") as Laya.Image;
                let selectPoint = this._viewUI.select_list.getCell(1).getChildByName("selectPoint_img") as Laya.Image;
                if (contactRolePointImg.visible == true) {
                    selectPoint.visible = false;
                    contactRolePointImg.visible = false;
                    models.FriendProxy.getInstance().event(models.readMessage_EVENT);//读完当前消息，发送事件，通知主界面隐藏好友红点
                }
                this.updateMyChat(friendid);
                this.getMyChatData();
                this._viewUI.contact_list.selectedIndex = -1;
            }
        }
        /**显示好友弹窗 */
        public showContact(id: number, key: number, e: LEvent): void {
            let xPos = e.currentTarget.mouseX;
            let yPos = e.currentTarget.mouseY;
            RequesterProtocols._instance.c2s_CRequestUpdateRoleInfo(id);//请求玩家信息
            RequesterProtocols._instance.c2s_CReqRoleTeamState(id);//客户端请求其他玩家的组队情况
            let isFriendFlag = FriendModel.getInstance().isMyFriend(id);
            this._ContactCharacterMediator.onShow(xPos, yPos, isFriendFlag);
        }
        /**初始化黑名单列表 */
        public getBlackListData() {
            this._viewUI.blackList_list.vScrollBarSkin = "";
            this._viewUI.blackList_list.scrollBar.elasticBackTime = 200;
            this._viewUI.blackList_list.scrollBar.elasticDistance = 50;
            this._viewUI.blackList_list.array = this.blacklistuserNameArr;
            this._viewUI.blackList_list.renderHandler = new Handler(this, this.onBlackListRender);
        }
        /**渲染黑名单列表 */
        public onBlackListRender(cell: Laya.Box, index: number): void {
            let nameLab: Laya.Label = cell.getChildByName("blackListRoleInfo_btn").getChildByName("blackListName_lab") as Laya.Label;
            let levelLab: Laya.Label = cell.getChildByName("blackListRoleInfo_btn").getChildByName("blackListLevel_lab") as Laya.Label;
            let reduceBtn: Laya.Button = cell.getChildByName("blackListRoleInfo_btn").getChildByName("blackListReduce_btn") as Laya.Button;
            let blackListContentImg: Laya.Image = cell.getChildByName("blackListRoleInfo_btn").getChildByName("blackListContent_img") as Laya.Image;
            let blackListSchoolImg: Laya.Image = cell.getChildByName("blackListRoleInfo_btn").getChildByName("blackListSchool_img") as Laya.Image;
            reduceBtn.on(LEvent.MOUSE_DOWN, this, this.reduce, [index]);
            nameLab.text = this.blacklistuserNameArr[index];
            levelLab.text = this.blacklistuserLevelArr[index].toString();
            blackListContentImg.skin = this.blacklistuserHeadImgArr[index].img;
            blackListSchoolImg.skin = this.blacklistuserZhiyeImgArr[index].img;
        }
        /**客户端请求移除黑名单 */
        public reduce(index: number): void {
            RequesterProtocols._instance.c2s_remove_blackrole(this.blacklistuserIdArr[index]);
        }
        /**初始化添加黑名单列表 */
        public getAddBlackListData() {
            this._viewUI.addBlackList_list.vScrollBarSkin = "";
            this._viewUI.addBlackList_list.scrollBar.elasticBackTime = 200;
            this._viewUI.addBlackList_list.scrollBar.elasticDistance = 50;
            this._viewUI.addBlackList_list.array = this.blacklistuserNameArr;
            this._viewUI.addBlackList_list.renderHandler = new Handler(this, this.onAddBlackListRender);
            this._viewUI.addBlackList_list.selectedIndex = 0;
        }
        /**渲染添加黑名单列表 */
        public onAddBlackListRender(cell: Laya.Box, index: number): void {
            if (index > this.blacklistuserNameArr.length) return;
            let roleInfo_btn: Laya.Button = cell.getChildByName("roleInfo_btn") as Laya.Button;
            roleInfo_btn.on(LEvent.CLICK, this, this.showSelected, [roleInfo_btn]);
            this.setBtnImg(roleInfo_btn);
            let nameLab: Laya.Label = roleInfo_btn.getChildByName("name_lab") as Laya.Label;
            let levelLab: Laya.Label = roleInfo_btn.getChildByName("level_lab") as Laya.Label;
            let addBtn: Laya.Button = roleInfo_btn.getChildByName("add_btn") as Laya.Button;
            let contentImg: Laya.Image = roleInfo_btn.getChildByName("content_img") as Laya.Image;
            let schoolImg: Laya.Image = roleInfo_btn.getChildByName("school_img") as Laya.Image;
            addBtn.on(LEvent.MOUSE_DOWN, this, this.addBlackListUser);
            nameLab.text = this.blacklistuserNameArr[index];
            levelLab.text = this.blacklistuserLevelArr[index].toString();
            contentImg.skin = this.blacklistuserHeadImgArr[index].img;
            schoolImg.skin = this.blacklistuserZhiyeImgArr[index].img;
        }

        /**客户端请求屏蔽玩家 */
        public addBlackListUser(): void {
            let _blackId = parseInt(this._viewUI.addBlackId_lab.text);
            let _flag = models.FriendModel.getInstance().isMyFriend(_blackId);
            if (_flag == FriendEnum.FRIEND_KEY) {//如果添加黑名单的对象是自己的好友，就需要飘窗提示并且返回
                let msg = chat.models.ChatModel.getInstance().chatMessageTips[141405]["msg"];
                let disMsgTips = new commonUI.DisappearMessageTipsMediator(this._app);
                disMsgTips.onShow(msg);
                return;
            }
            RequesterProtocols._instance.c2s_add_blackrole(_blackId);
            this.blacklistuserNameArr.length = 0;
            this.blacklistuserLevelArr.length = 0;
            this.blacklistuserHeadImgArr.length = 0;
            this.blacklistuserZhiyeImgArr.length = 0;
            this.blacklistuserIdArr.length = 0;
            this.getAddBlackListData();
        }
        /**设置陌生人职业图标 */
        public setRecentContactZhiyeImg(school: number): void {
            //根据职业设置职业图标
            switch (school) {
                case zhiye.yunxiao:
                    this.recentContactZhiyeImgArr.push({ img: "common/ui/tongyong/11.png" });
                    break;
                case zhiye.dahuang:
                    this.recentContactZhiyeImgArr.push({ img: "common/ui/tongyong/12.png" });
                    break;
                case zhiye.cangyu:
                    this.recentContactZhiyeImgArr.push({ img: "common/ui/tongyong/13.png" });
                    break;
                case zhiye.feixue:
                    this.recentContactZhiyeImgArr.push({ img: "common/ui/tongyong/14.png" });
                    break;
                case zhiye.tianlei:
                    this.recentContactZhiyeImgArr.push({ img: "common/ui/tongyong/15.png" });
                    break;
                case zhiye.wuliang:
                    this.recentContactZhiyeImgArr.push({ img: "common/ui/tongyong/16.png" });
                    break;
                case zhiye.xuanming:
                    this.recentContactZhiyeImgArr.push({ img: "common/ui/tongyong/17.png" });
                    break;
                case zhiye.qixing:
                    this.recentContactZhiyeImgArr.push({ img: "common/ui/tongyong/18.png" });
                    break;
                case zhiye.danyang:
                    this.recentContactZhiyeImgArr.push({ img: "common/ui/tongyong/19.png" });
                    break;
            }
        }

        /**设置黑名单用户职业图标 */
        public setBlacklistuserZhiyeImg(school: number): void {
            //根据职业设置职业图标
            switch (school) {
                case zhiye.yunxiao:
                    this.blacklistuserZhiyeImgArr.push({ img: "common/ui/tongyong/11.png" });
                    break;
                case zhiye.dahuang:
                    this.blacklistuserZhiyeImgArr.push({ img: "common/ui/tongyong/12.png" });
                    break;
                case zhiye.cangyu:
                    this.blacklistuserZhiyeImgArr.push({ img: "common/ui/tongyong/13.png" });
                    break;
                case zhiye.feixue:
                    this.blacklistuserZhiyeImgArr.push({ img: "common/ui/tongyong/14.png" });
                    break;
                case zhiye.tianlei:
                    this.blacklistuserZhiyeImgArr.push({ img: "common/ui/tongyong/15.png" });
                    break;
                case zhiye.wuliang:
                    this.blacklistuserZhiyeImgArr.push({ img: "common/ui/tongyong/16.png" });
                    break;
                case zhiye.xuanming:
                    this.blacklistuserZhiyeImgArr.push({ img: "common/ui/tongyong/17.png" });
                    break;
                case zhiye.qixing:
                    this.blacklistuserZhiyeImgArr.push({ img: "common/ui/tongyong/18.png" });
                    break;
                case zhiye.danyang:
                    this.blacklistuserZhiyeImgArr.push({ img: "common/ui/tongyong/19.png" });
                    break;
            }
        }
        /**初始化聊天界面数据 */
        public initChatData(): void {
            models.FriendModel.getInstance().initFlag = true;
            let objKeys = chat.models.ChatModel.getInstance().chatQuickChat;
            for (let i = 1; i <= Object.keys(objKeys).length; i++) {
                this.quickChat.push(chat.models.ChatModel.getInstance().chatQuickChat[i].tips);
            }

            for (let a = 1; a < 33; a++) {
                this.shield_word.push(this.banWords[a].tips);
            }
            //表情素材加载
            for (let a = 1; a <= 53; a++) {
                this.faceList.push({ url: "ui/liaotian/1384592709_" + a + ".png" });
            }
            this._loginModel = game.modules.createrole.models.LoginModel.getInstance();
            let roleIcon = this._loginModel.cnpcShapeInfo;
            for (let index in roleIcon) {
                this.roleinfo.push(roleIcon[index].littleheadID);
            }
        }
        /**开启表情 */
        private openFace(): void {
            if (this._viewUI.content_img.visible == false) {
                this._viewUI.content_img.visible = true;
            } else return;
            for (let i = 1; i <= 6; i++) {
                let btn: Button = this._viewUI.friend_box.getChildByName("content_img").getChildByName("facebox_box").getChildByName("facebtn" + [i] + "_btn") as Button;
                let name = "facebtn" + [i] + "_btn";
                btn.on(LEvent.MOUSE_UP, this, this.opFaceContent, [name]);
            }
            this.Face();

        }
        /**聊天表情的初始化 */
        private opFaceContent(name): void {
            for (let i = 1; i <= 6; i++) {
                let img: Laya.Image = this._viewUI.friend_box.getChildByName("content_img").getChildByName("facebox_box").getChildByName("facebtn" + [i] + "_btn").getChildByName("state" + [i] + "_img") as Laya.Image;
                img.visible = false;
            }
            //点击不同按钮，初始化不同列表
            switch (name) {
                case "facebtn1_btn": //表情 
                    this.Face();
                    break;
                case "facebtn2_btn": //常用语
                    this._viewUI.state2_img.visible = true
                    this._viewUI.contentlist1_list.visible = true;
                    this._viewUI.contentlist2_list.visible = false;
                    this._viewUI.contentlist3_list.visible = false;
                    this._viewUI.contentlist4_list.visible = false;
                    this._viewUI.contentlist5_list.visible = false;
                    this._viewUI.face_list.visible = false;
                    this.CommonLanguage();
                    break;
                case "facebtn3_btn":  //任务
                    this._viewUI.state3_img.visible = true
                    this._viewUI.contentlist1_list.visible = false;
                    this._viewUI.contentlist2_list.visible = true;
                    this._viewUI.contentlist3_list.visible = false;
                    this._viewUI.contentlist4_list.visible = false;
                    this._viewUI.contentlist5_list.visible = false;
                    this._viewUI.face_list.visible = false;
                    this.Task();
                    break;
                case "facebtn4_btn":   //历史输入
                    this._viewUI.state4_img.visible = true
                    this._viewUI.contentlist1_list.visible = false;
                    this._viewUI.contentlist2_list.visible = false;
                    this._viewUI.contentlist3_list.visible = true;
                    this._viewUI.contentlist4_list.visible = false;
                    this._viewUI.contentlist5_list.visible = false;
                    this._viewUI.face_list.visible = false;
                    this.HistoryInput();
                    break;
                case "facebtn5_btn":   // 物品分享
                    this._viewUI.state5_img.visible = true
                    this._viewUI.contentlist1_list.visible = false;
                    this._viewUI.contentlist2_list.visible = false;
                    this._viewUI.contentlist3_list.visible = false;
                    this._viewUI.contentlist4_list.visible = true;
                    this._viewUI.contentlist5_list.visible = false;
                    this._viewUI.face_list.visible = false;
                    this.Item();
                    break;
                case "facebtn6_btn":  //宠物分享
                    this._viewUI.state6_img.visible = true
                    this._viewUI.contentlist1_list.visible = false;
                    this._viewUI.contentlist2_list.visible = false;
                    this._viewUI.contentlist3_list.visible = false;
                    this._viewUI.contentlist4_list.visible = false;
                    this._viewUI.contentlist5_list.visible = true;
                    this._viewUI.face_list.visible = false;
                    this.Pet();
                    break;
                default:
                    break;
            }

        }
		/** 
		 * 计算页数
		 * @param pageNum 每页显示的数量  @param 数据源长度 @param ratio 滚动条比例
		 */
        private calculationNumPage(pageNum: number, length: number, ratio?: number): void {
            /** 总页码 */
            let totalPage = Math.ceil(length / pageNum);
            /** 总共5个小球 */
            let allBall = 5;
            for (let pageIndex = 1; pageIndex <= allBall; pageIndex++) {
                /** 先隐藏所有 */
                let indexBall: Laya.Image = this._viewUI.content_img.getChildByName("darkball" + pageIndex + "_img") as Laya.Image;
                indexBall.visible = false;
            }
            for (let nowpage = 1; nowpage <= totalPage; nowpage++) {
                /** 显示 */
                let nowBall: Laya.Image = this._viewUI.content_img.getChildByName("darkball" + nowpage + "_img") as Laya.Image;
                nowBall.visible = true;
            }
            if (ratio) {
                let ball = Math.ceil(totalPage * ratio);
                for (let index = 1; index <= totalPage; index++) {
                    let allball: Laya.Image = this._viewUI.content_img.getChildByName("darkball" + index + "_img").getChildByName("greenball" + index + "_img") as Laya.Image;
                    allball.visible = false;
                }
                if (ball <= 0) ball = 1;
                if (ball > totalPage) ball = totalPage;
                let nowball: Laya.Image = this._viewUI.content_img.getChildByName("darkball" + ball + "_img").getChildByName("greenball" + ball + "_img") as Laya.Image;
                nowball.visible = true;
            }
        }
		/** 
		 * 滑动到指定页码
		 * @param viewNum 单页的数量 @param datasourceLength 数据源长度 @param list 指定ui
		 */
        private countCurrentPage(viewNum: number, datasourceLength: number, list: Laya.List): void {
            let val = list.scrollBar.value;
            let max = list.scrollBar.max;
            let ratio = val / max;
            /** 首先计算页数 */
            this.calculationNumPage(viewNum, datasourceLength, ratio)
        }
        /**表情 */
        private Face(): void {
            /** 首先计算页数 */
            this.calculationNumPage(35, this.faceList.length);
            this._viewUI.state1_img.visible = true
            this._viewUI.contentlist1_list.visible = false;
            this._viewUI.contentlist2_list.visible = false;
            this._viewUI.contentlist3_list.visible = false;
            this._viewUI.contentlist4_list.visible = false;
            this._viewUI.contentlist5_list.visible = false;
            this._viewUI.face_list.visible = true;
            let face: number = 0;
            this._viewUI.face_list.hScrollBarSkin = "";
            if (this.faceList.length <= 7) {
                this._viewUI.face_list.repeatX = this.faceList.length;
                this._viewUI.face_list.repeatY = 1;
            } else {
                this._viewUI.face_list.repeatX = this.faceList.length;
                this._viewUI.face_list.repeatY = 5;
            }
            this._viewUI.face_list.array = this.faceList;
            this._viewUI.face_list.spaceX = 22;
            this._viewUI.face_list.scrollBar.elasticBackTime = 200;
            this._viewUI.face_list.scrollBar.elasticDistance = 100;
            this._viewUI.face_list.on(LEvent.MOUSE_UP, this, this.countCurrentPage, [35, this.faceList.length, this._viewUI.face_list]);
            this._viewUI.face_list.renderHandler = new Handler(this, this.onContentListRender, [face]);
        }

        /** 常用语 */
        private CommonLanguage(): void {
            /** 首先计算页数 */
            this.calculationNumPage(8, this.quickChat.length);
            let commonLanageArg: number = 1;
            this._viewUI.contentlist1_list.hScrollBarSkin = "";
            this._viewUI.contentlist1_list.repeatX = this.quickChat.length;
            this._viewUI.contentlist1_list.array = this.quickChat;
            this._viewUI.contentlist1_list.scrollBar.elasticBackTime = 200;
            this._viewUI.contentlist1_list.scrollBar.elasticDistance = 100;
            this._viewUI.contentlist1_list.on(LEvent.MOUSE_UP, this, this.countCurrentPage, [8, this.quickChat.length, this._viewUI.contentlist1_list]);
            this._viewUI.contentlist1_list.renderHandler = new Handler(this, this.onContentListRender, [commonLanageArg], false);
        }
        /** 任务 */
        private Task(): void {
            let taskArg: number = 2;
            this._viewUI.contentlist2_list.hScrollBarSkin = "";
            let accepttask = Taskmodels.getInstance().accepttask;
            let schooltask = Taskmodels.getInstance().schooltask;
            let maintask = Taskmodels.getInstance().maintask;
            /** 每次点击清空数据 */
            this.task = [];
            for (let accepttaskIndex = 0; accepttaskIndex < accepttask.keys.length; accepttaskIndex++) {
                /** 存推荐任务的 key 任务iD */
                this.task.push(accepttask.keys[accepttaskIndex]);
            }
            for (let schooltaskIndex = 0; schooltaskIndex < schooltask.keys.length; schooltaskIndex++) {
                /** 存师门任务的 value 任务iD */
                this.task.push(Taskmodels.getInstance().schooltask.keys[schooltaskIndex]);
            }
            for (let maintaskIndex = 0; maintaskIndex < maintask.keys.length; maintaskIndex++) {
                /** 存主任务的 key 任务iD */
                this.task.push(maintask.keys[maintaskIndex]);
            }
            /** 首先计算页数 */
            this.calculationNumPage(8, this.task.length);
            this._viewUI.contentlist2_list.repeatX = this.task.length;
            this._viewUI.contentlist2_list.array = this.task;
            this._viewUI.contentlist2_list.scrollBar.elasticBackTime = 200;
            this._viewUI.contentlist2_list.scrollBar.elasticDistance = 100;
            this._viewUI.contentlist2_list.on(LEvent.MOUSE_UP, this, this.countCurrentPage, [8, this.task.length, this._viewUI.contentlist2_list]);
            this._viewUI.contentlist2_list.renderHandler = new Handler(this, this.onContentListRender, [taskArg]);
        }
        /** 宠物 */
        private Pet(): void {
            let petKeys = PetModel.getInstance().pets.keys;
            if (petKeys.length <= 0) {
                this._viewUI.contentlist5_list.visible = false;
                return;
            } else {
                this.petLits = [];
                for (let petKey = 0; petKey < petKeys.length; petKey++) {
                    this.petLits.push(PetModel.getInstance().pets.get(petKeys[petKey]));
                }

            }
            let petArg: number = 5;
            this._viewUI.contentlist5_list.hScrollBarSkin = "";
            /** 首先计算页数 */
            this.calculationNumPage(4, this.petLits.length);
            if (this.petLits.length <= 2) {
                this._viewUI.contentlist5_list.repeatX = this.petLits.length;
                this._viewUI.contentlist5_list.repeatY = 1;
            } else {
                this._viewUI.contentlist5_list.repeatX = this.petLits.length;
                this._viewUI.contentlist5_list.repeatY = 2;
            }
            this._viewUI.contentlist5_list.array = this.petLits;
            this._viewUI.contentlist5_list.scrollBar.elasticBackTime = 200;
            this._viewUI.contentlist5_list.scrollBar.elasticDistance = 10;
            this._viewUI.contentlist5_list.on(LEvent.MOUSE_UP, this, this.countCurrentPage, [4, this.petLits.length, this._viewUI.contentlist5_list]);
            this._viewUI.contentlist5_list.renderHandler = new Handler(this, this.onContentListRender, [petArg]);
        }
        /** 背包道具 */
        private Item(): void {
            this.itemList = bagModel.getInstance().getBagGameItemData(BagTypes.BAG).items;
            if (this.itemList.length <= 0) {
                this._viewUI.contentlist4_list.visible = false;
                return;
            }
            let itemArg: number = 4;
            /** 首先计算页数 */
            this.calculationNumPage(24, this.itemList.length);
            this._viewUI.contentlist4_list.hScrollBarSkin = "";
            if (this.itemList.length <= 6) {
                this._viewUI.contentlist4_list.repeatX = this.itemList.length;
                this._viewUI.contentlist4_list.repeatY = 1;
            } else {
                this._viewUI.contentlist4_list.repeatX = this.itemList.length;
                this._viewUI.contentlist4_list.repeatY = 4;
            }
            this._viewUI.contentlist4_list.array = this.itemList;
            this._viewUI.contentlist4_list.scrollBar.elasticBackTime = 200;
            this._viewUI.contentlist4_list.scrollBar.elasticDistance = 10;
            this._viewUI.contentlist4_list.on(LEvent.MOUSE_UP, this, this.countCurrentPage, [24, this.itemList.length, this._viewUI.contentlist4_list]);
            this._viewUI.contentlist4_list.renderHandler = new Handler(this, this.onContentListRender, [itemArg]);
        }
        /** 历史输入 */
        private HistoryInput(): void {
            let historyInputArg: number = 3;
            this._viewUI.contentlist3_list.hScrollBarSkin = "";
            if (this.historyInput != null) {
                this._viewUI.contentlist3_list.repeatX = this.historyInput.length;
                this._viewUI.contentlist3_list.array = this.historyInput;
            } else {
                this._viewUI.contentlist3_list.repeatX = this.nohistory.length;
                this._viewUI.contentlist3_list.array = this.nohistory;
            }
            /** 首先计算页数 */
            this.calculationNumPage(8, this.itemList.length);
            this._viewUI.contentlist3_list.scrollBar.elasticBackTime = 200;
            this._viewUI.contentlist3_list.scrollBar.elasticDistance = 100;
            this._viewUI.contentlist3_list.on(LEvent.MOUSE_UP, this, this.countCurrentPage, [8, this.itemList.length, this._viewUI.contentlist3_list]);
            this._viewUI.contentlist3_list.renderHandler = new Handler(this, this.onContentListRender, [historyInputArg]);
        }

        /**聊天列表渲染 */
        private onContentListRender(arg: number, cell: Box, index: number): void {
            //根据不同按钮点击来分开处理
            switch (arg) {
                //渲染聊天表情列表
                case 0:
                    let img: Laya.Image = cell.getChildByName("faceimg_img") as Laya.Image;
                    img.skin = this.faceList[index].url;
                    img.on(Laya.Event.CLICK, this, this.onFaceClick, ["@" + index + "@"]);
                    break;
                //渲染聊天常用语列表
                case 1:
                    let contentbox1_lab: Label = cell.getChildByName("contentbox1_img").getChildByName("contentbox1_lab") as Label;
                    contentbox1_lab.text = this.quickChat[index];
                    contentbox1_lab.on(LEvent.CLICK, this, this.getCommonInput, [contentbox1_lab.text])

                    break;
                //渲染聊天任务列表
                case 2: /** 任务点击 */
                    let contentbox2_lab: Label = cell.getChildByName("contentbox2_img").getChildByName("contentbox2_lab") as Label;
                    let taskType;
                    if (this.task[index] >= FriendEnum.SCHOOL_TASK_START && this.task[index] <= FriendEnum.SCHOOL_TASK_END) {
                        /** 师门任务 */
                        let info: game.modules.task.models.SRefreshSpecialQuestVo = Taskmodels.getInstance().schooltask.get(this.task[index]);
                        let schoolinfo: CRepeatTaskBaseVo = Taskmodels.getInstance().cRepeatTaskData[info.questtype];
                        let titleinfo: string = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(schoolinfo.strtasktitletrack, info.round, 2);
                        let allcount: CSchoolTaskBaseVo = game.modules.task.models.TaskModel.getInstance().cSchoolTaskData[schoolinfo.nacceptchatid];
                        if (allcount) {
                            titleinfo = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(titleinfo, allcount.maxnum, 7)
                            contentbox2_lab.text = titleinfo;
                        }
                        taskType = FriendEnum.SHIMEN_TYPE;//师门任务
                    } else {
                        let info: MissionCMainMissionInfoBaseVo = game.modules.task.models.TaskModel.getInstance().missionCMainMissionInfoData[this.task[index]]
                        contentbox2_lab.text = info.MissionName;
                        taskType = FriendEnum.ZHUXIAN_TYPE;//主线任务
                    }
                    contentbox2_lab.on(LEvent.MOUSE_DOWN, this, this.onTask, [index, contentbox2_lab.text, taskType, this.task[index]]);
                    break;
                //渲染聊天历史输入列表
                case 3:
                    let contentbox3_lab: Label = cell.getChildByName("contentbox3_img").getChildByName("contentbox3_lab") as Label;
                    if (this.historyInput != null) {
                        contentbox3_lab.text = this.historyInput[index].context;
                        contentbox3_lab.on(LEvent.CLICK, this, this.getHistoryInput, [contentbox3_lab.text]);
                    } else
                        contentbox3_lab.text = this.nohistory[index].context;
                    break;
                //渲染聊天道具列表
                case 4:
                    if (index > this.itemList.length) return;
                    let id = this.itemList[index].id;
                    let itemDatas = BagModel.getInstance().getItemAttrData(id);
                    let itemName = itemDatas.name;
                    let gameItemBgImg: Laya.Image = cell.getChildByName("gameItemBg_img") as Laya.Image;
                    let gameItemImg: Laya.Image = cell.getChildByName("gameItem_Img") as Laya.Image;
                    let gameItemNumberLabel: Laya.Label = cell.getChildByName("gameItemNumber_lab") as Laya.Label;
                    if (itemDatas != null) {
                        let str: string = this.itemList[index].number > 1 ? this.itemList[index].number.toString() : "";
                        gameItemNumberLabel.visible = true;
                        gameItemBgImg.skin = game.modules.bag.BagSystemModule.getGameItemFrameColorResource(itemDatas.nquality);
                        gameItemImg.skin = "common/icon/item/" + itemDatas.icon + ".png";
                        gameItemNumberLabel.changeText(str);
                        let type = 1;
                        let shopId = 0;
                        /** 道具分享发送 */
                        gameItemBgImg.on(LEvent.MOUSE_UP, this, this.onItem, [itemName, this.itemList[index].key, type, shopId]);
                    } else {
                        gameItemBgImg.skin = "";
                        gameItemImg.skin = "";
                        gameItemNumberLabel.visible = false;
                    }
                    break;
                //渲染聊天宠物列表
                case 5:
                    if (index > this.petLits.length) return;
                    let petAttr = PetModel.getInstance().petCPetAttrData;
                    let shapeId = LoginModel.getInstance().cnpcShapeInfo;
                    let pet: Laya.Image = cell.getChildByName("contentbox3_img") as Laya.Image;
                    let petName: Laya.Label = cell.getChildByName("contentbox3_img").getChildByName("petName_lab") as Laya.Label;
                    let petlevel: Laya.Label = cell.getChildByName("contentbox3_img").getChildByName("petLevel_lab") as Laya.Label;
                    let petScore: Laya.Label = cell.getChildByName("contentbox3_img").getChildByName("petScore_lab") as Laya.Label;
                    let petIcon: Laya.Image = cell.getChildByName("contentbox3_img").getChildByName("petBg_img").getChildByName("pet_img") as Laya.Image;
                    let petQuality: Laya.Image = cell.getChildByName("contentbox3_img").getChildByName("petBg_img") as Laya.Image;
                    let petId = this.petLits[index].id;
                    petName.color = petAttr[petId].colour;
                    let Quality = petAttr[petId].quality;
                    let modelid = petAttr[petId].modelid;
                    petName.text = this.petLits[index].name;
                    petlevel.text = this.petLits[index].level;
                    petScore.text = this.petLits[index].petscore;
                    let littleShapeId = LoginModel.getInstance().cnpcShapeInfo[modelid];
                    petIcon.skin = "common/icon/avatarpet/" + littleShapeId.littleheadID + ".png";
                    petQuality.skin = game.modules.bag.BagSystemModule.getGameItemFrameColorResource(Quality);
                    let type = 2;
                    pet.on(LEvent.MOUSE_DOWN, this, this.onItem, [this.petLits[index].name, this.petLits[index].key, type, petId])
                    break;
                default:
                    break;
            }

        }
        /**发送道具 */
        private onItem(ItemName: string, key: number, type: number, petId): void {
            let shareItem = "[" + ItemName + "]";
            this._viewUI.chatInput_tex.text = shareItem;
            this.shareItem = shareItem;
            let disPlayInfo: chat.models.DisplayInfoVo;
            disPlayInfo = new chat.models.DisplayInfoVo();
            disPlayInfo.displaytype = type;
            disPlayInfo.roleid = this._loginModel.roleDetail.roleid;
            disPlayInfo.shopid = petId;
            disPlayInfo.counterid = 1;
            disPlayInfo.uniqid = key;
            disPlayInfo.teamid = 0;
            disPlayInfo.crosstt = 0;
            disPlayInfo.serverid = 0;
            this.displayInfo = [];
            this.displayInfo.push(disPlayInfo);
            if (type == 1)
                RequesterProtocols._instance.c2s_CChatItemTips(disPlayInfo);
        }

        /**表情点击 */
        private onFaceClick(str: string): void {
            this.closeFace();
            this._viewUI.chatInput_tex.text += str;
        }

        /** 点击任务栏 */
        private onTask(index: number, taskTitle: string, tasktype: number, taskid: number): void {
            taskTitle = "[" + taskTitle + "]";
            let disPlayInfo: chat.models.DisplayInfoVo;
            disPlayInfo = new chat.models.DisplayInfoVo();
            disPlayInfo.displaytype = DisplayType.DISPLAY_TASK;
            disPlayInfo.roleid = this._loginModel.roleDetail.roleid;
            disPlayInfo.shopid = tasktype;
            disPlayInfo.counterid = 1;
            disPlayInfo.uniqid = taskid;
            disPlayInfo.teamid = 0;/** 任务类型为师门时，这里 */
            disPlayInfo.crosstt = 0;
            disPlayInfo.serverid = 0;
            this.displayInfo = [];
            this.displayInfo.push(disPlayInfo);
            this._viewUI.chatInput_tex.text = taskTitle;
            this.sendChat();
            this._viewUI.content_img.visible = false;
        }
        private getHistoryInput(historyInput: string): void {
            this._viewUI.chatInput_tex.text = historyInput;
            this.closeFace();
        }
        private getCommonInput(commonInput: string): void {
            this._viewUI.chatInput_tex.text = commonInput;
            this.closeFace();
        }
        /**发送消息 */
        public sendChat(): void {
            if (this._viewUI.chatInput_tex.text != "") {
                this._viewUI.chatInput_tex.maxChars = 44;
                this.repstr = this._viewUI.chatInput_tex.text;
                //關鍵字屏蔽
                for (let i = 0; i < this.shield_word.length; i++) {
                    let index: number = this.repstr.search(this.shield_word[i]);
                    if (index != -1) {
                        this.repstr = this.repstr.replace(this.shield_word[i], "**");
                    }
                }
                this.historyMsg = this.repstr;
                let msg = this.repstr;
                //与好友聊天
                if (this._viewUI.mychatInfo_list.visible == true) {
                    let roleid = FriendModel.getInstance().friendIdArr[this.selectNum]//当前聊天好友id
                    RequesterProtocols._instance.c2s_CSendMessageToRole(roleid, msg, this.repstr, this.displayInfo);
                    let time = this.getNowTime();
                    let mymsgarr = [];//暂存发出消息
                    let friendmsgarr = [];//好友消息
                    let sendtimearr = [];//发出消息时间
                    let friendtimearr = [];//收到消息时间
                    let mydisplayinfoarr = [];//发出附件
                    let frienddisplayinfoarr = [];//好友附件
                    this.myMsgArr.push(msg);
                    this.friendMsgArr.push("");
                    this.sendTimeArr.push(time);
                    this.friendTimeArr.push("");
                    if (this.displayInfo.length > 0)
                        this.myDisplayinfoArr.push(this.displayInfo[0]);
                    else
                        this.myDisplayinfoArr.push("");
                    this.friendDisplayinfoArr.push("");
                    for (let i: number = 0; i < this.myMsgArr.length; i++) {
                        mymsgarr.push(this.myMsgArr[i]);
                    }
                    for (let i: number = 0; i < this.friendMsgArr.length; i++) {
                        friendmsgarr.push(this.friendMsgArr[i]);
                    }
                    for (let i: number = 0; i < this.sendTimeArr.length; i++) {
                        sendtimearr.push(this.sendTimeArr[i]);
                    }
                    for (let i: number = 0; i < this.friendTimeArr.length; i++) {
                        friendtimearr.push(this.friendTimeArr[i]);
                    }
                    for (let i: number = 0; i < this.myDisplayinfoArr.length; i++) {
                        mydisplayinfoarr.push(this.myDisplayinfoArr[i]);
                    }
                    for (let i: number = 0; i < this.friendDisplayinfoArr.length; i++) {
                        frienddisplayinfoarr.push(this.friendDisplayinfoArr[i]);
                    }
                    this.myMsgData.set(roleid, mymsgarr);
                    this.friendMsgData.set(roleid, friendmsgarr);
                    this.sendTimeData.set(roleid, sendtimearr);
                    this.friendTimeData.set(roleid, friendtimearr);
                    this.myDisplayinfoData.set(roleid, mydisplayinfoarr);
                    this.friendDisplayinfoData.set(roleid, frienddisplayinfoarr);
                    this.getMyChatData();
                }
                //与陌生人聊天
                else if (this._viewUI.recentChatInfo_list.visible == true) {
                    let roleid = this.recentContactIdArr[this.selectRecentContactNum];//当前聊天对象id
                    RequesterProtocols._instance.c2s_CSendMessageToRole(roleid, msg, this.repstr, this.displayInfo);
                    let time = this.getNowTime();
                    let torecentcontactmsgarr = [];//暂存发出消息
                    let recentContactmsgarr = [];//陌生人消息
                    let torecentContacttimearr = [];//发出消息时间
                    let recentContacttimearr = [];//收到消息时间
                    let torecentcontactdisplayinfoarr = [];//给陌生人附件
                    let recentcontactdisplayinfoarr = [];//陌生人附件
                    this.torecentContactMsgArr.push(msg);
                    this.recentContactMsgArr.push("");
                    this.torecentContactTimeArr.push(time);
                    this.recentContactTimeArr.push("");
                    if (this.displayInfo.length > 0)
                        this.torecentContactDisplayinfoArr.push(this.displayInfo[0]);
                    else
                        this.torecentContactDisplayinfoArr.push("");
                    this.recentContactDisplayinfoArr.push("");
                    for (let i: number = 0; i < this.torecentContactMsgArr.length; i++) {
                        torecentcontactmsgarr.push(this.torecentContactMsgArr[i]);
                    }
                    for (let i: number = 0; i < this.recentContactMsgArr.length; i++) {
                        recentContactmsgarr.push(this.recentContactMsgArr[i]);
                    }
                    for (let i: number = 0; i < this.torecentContactTimeArr.length; i++) {
                        torecentContacttimearr.push(this.torecentContactTimeArr[i]);
                    }
                    for (let i: number = 0; i < this.recentContactTimeArr.length; i++) {
                        recentContacttimearr.push(this.recentContactTimeArr[i]);
                    }
                    for (let i: number = 0; i < this.torecentContactDisplayinfoArr.length; i++) {
                        torecentcontactdisplayinfoarr.push(this.torecentContactDisplayinfoArr[i]);
                    }
                    for (let i: number = 0; i < this.recentContactDisplayinfoArr.length; i++) {
                        recentcontactdisplayinfoarr.push(this.recentContactDisplayinfoArr[i]);
                    }
                    this.torecentContactMsgData.set(roleid, torecentcontactmsgarr);
                    this.recentContactMsgData.set(roleid, recentContactmsgarr);
                    this.torecentContactTimeData.set(roleid, torecentContacttimearr);
                    this.recentContactTimeData.set(roleid, recentContacttimearr);
                    this.torecentContactDisplayinfoData.set(roleid, torecentcontactdisplayinfoarr);
                    this.recentContactDisplayinfoData.set(roleid, recentcontactdisplayinfoarr);
                    this.getRecentChatData();
                }
            }
            else {
                this.tipsTweenTo(tips.models.TipsModel.getInstance().cstringResConfigData[FriendEnum.INPUT_SOMTHING].msg);
            }
            this._viewUI.chatInput_tex.text = "";//清空输入框
        }
        /** 关闭表情 */
        private closeFace(): void {
            this._viewUI.content_img.visible = false;
            for (let i = 1; i <= 6; i++) {
                let img: Laya.Image = this._viewUI.friend_box.getChildByName("content_img").getChildByName("facebox_box").getChildByName("facebtn" + [i] + "_btn").getChildByName("state" + [i] + "_img") as Laya.Image;
                img.visible = false;
            }
        }

        /** 显示背包道具Tips */
        private _ShowTips(): void {
            let parame: any;
            let selectItem = this.getItemBack();
            if (selectItem) {
                parame = new Laya.Dictionary();
                let obj = BagModel.getInstance().getItemAttrData(selectItem.id);
                let equipType;
                try {
                    equipType = StrengTheningModel.getInstance().equipEffectData[selectItem.id].eequiptype;
                } catch (error) {
                    equipType = -1;
                }
                parame.set("itemId", selectItem.id);
                parame.set("key", selectItem.key);
                parame.set("packid", 1);
                parame.set("outbattleuse", obj.outbattleuse);//("packid",1)
                parame.set("shopid", obj.bCanSaleToNpc);
                parame.set("number", selectItem.number);
                parame.set("equiptype", equipType);
                let isShow = true;
                this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame, isShow);
            }
        }

        /** 其他人点击的道具分享 */
        public otherOnItem(displayinfo: chat.models.DisplayInfoVo, ItemName: string): void {
            if (displayinfo.displaytype == DisplayType.DISPLAY_ITEM) {/** 道具相关 */
                ItemName = ItemName.replace("[", "");
                ItemName = ItemName.replace("]", "");
                let itemID;
                let itemAttrData = BagModel.getInstance().itemAttrData;
                for (let itemId in itemAttrData) {
                    if (itemAttrData[itemId].name == ItemName) {
                        itemID = itemAttrData[itemId].id;
                        break;
                    }
                }
                if (itemID != 0) {
                    ChatModel.getInstance().viewItemId = itemID;
                }
                RequesterProtocols._instance.c2s_CChatItemTips(displayinfo);
            } else if (displayinfo.displaytype == DisplayType.DISPLAY_PET) {/** 宠物相关 */
                RequesterProtocols._instance.c2s_get_petinfo(displayinfo.roleid, displayinfo.uniqid);
            } else if (displayinfo.displaytype == DisplayType.DISPLAY_TASK) {/** 任务相关 */
                RequesterProtocols._instance.c2s_CChatItemTips(displayinfo);
            }
        }

        /** 查看别人的Tips */
        public _ViewOtherItem(viewUI?, app?: AppBase): void {
            let parame;
            if (ChatModel.getInstance().viewItemId != 0) {
                let ItemId = ChatModel.getInstance().viewItemId;
                let obj = BagModel.getInstance().getItemAttrData(ItemId);
                parame = new Laya.Dictionary();
                let equipType;
                try {
                    equipType = StrengTheningModel.getInstance().equipEffectData[ItemId].eequiptype;
                } catch (error) {
                    equipType = -1;
                }
                parame.set("itemId", ItemId);
                parame.set("key", ChatModel.getInstance().chatTips[ChatModel.getInstance().chatTips.length - 1].uniqid);
                parame.set("packid", -1);
                parame.set("outbattleuse", obj.outbattleuse);
                parame.set("shopid", obj.bCanSaleToNpc);
                parame.set("number", 1);
                parame.set("equiptype", equipType);
                let isShow = true;
                if (!viewUI) {
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame, isShow);
                } else {
                    /** 方便主界面调用 */
                    this._tipsModule = new game.modules.tips.tipsModule(viewUI, app, TIPS_TYPE.BAG, parame, isShow);
                }
            }
        }

        /** 打开任务说明 */
        private _ViewShareTask(displayInfo: chat.models.DisplayInfoVo): void {
            this.TaskDescriberMediators = game.modules.commonUI.TaskDescriberMediators.getInstance(this._app);
            this.TaskDescriberMediators.onShow(displayInfo);
        }

        /** 打开宠物详情界面 */
        public OpPetInfo(petinfo: game.modules.pet.models.PetInfoVo, nowPage?: boolean): void {
            ModuleManager.hide(ModuleNames.FRIEND);
            let isShowInStage = super.isShow();
            this.PetXiangQingMediator = new game.modules.pet.PetXiangQingMediator(this._app);
            this.PetXiangQingMediator.init(petinfo);
            LoginModel.getInstance().CommonPage = ModuleNames.FRIEND;
        }
        /**根据 item key 获取选中的道具信息 */
        private getItemBack(chatkey?: number, fromBag?: boolean): any {
            let TipsLength = ChatModel.getInstance().chatTips.length;
            let key;
            if (chatkey) {
                key = chatkey;
            }
            else {
                key = ChatModel.getInstance().chatTips[TipsLength - 1].uniqid;
            }
            if (!fromBag) {
                for (let itemListIndex = 0; itemListIndex < this.itemList.length; itemListIndex++) {
                    if (this.itemList[itemListIndex].key == key) {
                        return this.itemList[itemListIndex];
                    }
                }
            } else {
                let itemList = bagModel.getInstance().getBagGameItemData(BagTypes.BAG).items;
                for (let itemListIndex = 0; itemListIndex < itemList.length; itemListIndex++) {
                    if (itemList[itemListIndex].key == key) {
                        return itemList[itemListIndex];
                    }

                }
            }
            return false;
        }

        /** 聊天频道点击显示物品的Tips */
        public showItemTips(displayinfo, fromBag?: boolean, app?: AppBase, viewUI?): void {
            /** 代码复用，后面是主界面的聊天点击传过来的参数 */
            let chatkey = displayinfo.uniqid;
            let item;
            if (!fromBag) {
                item = this.getItemBack(chatkey);
            } else {
                item = this.getItemBack(chatkey, fromBag);
            }
            if (item) {
                let parame: any;
                parame = new Laya.Dictionary();
                let obj = BagModel.getInstance().getItemAttrData(item.id);
                let equipType
                try {
                    equipType = StrengTheningModel.getInstance().equipEffectData[item.id].eequiptype;
                } catch (error) {
                    equipType = -1;
                }
                parame.set("itemId", item.id);
                parame.set("key", item.key);
                parame.set("packid", 1);
                parame.set("outbattleuse", obj.outbattleuse);//("packid",1)
                parame.set("shopid", obj.bCanSaleToNpc);
                parame.set("number", item.number);
                parame.set("equiptype", equipType);
                let isShow = true;
                if (!app) {
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame, isShow);
                } else {
                    this._tipsModule = new game.modules.tips.tipsModule(viewUI, app, TIPS_TYPE.BAG, parame, isShow);
                }

            }
        }

        /** 提示信息缓动*/
        public tipsTweenTo(data: any): void {
            let terminalY: number = 0;
            this._viewUI.msgTips1_img.visible = true;
            this._viewUI.msgTips_lab.visible = true;
            this._viewUI.msgTips_lab.text = data;
            Laya.Tween.to(this._viewUI.msgTips1_img, { y: terminalY }, 500, null, Laya.Handler.create(this, function () {
                this._viewUI.msgTips1_img.visible = false; this._viewUI.msgTips1_img.x = this.px; this._viewUI.msgTips1_img.y = this.py;
            }), null, false);
        }

        /**初始化界面 */
        private initUI(): void {
            this._viewUI.contact_box.visible = false;
            this._viewUI.friendChat_box.visible = false;
            this._viewUI.addBlackList_box.visible = false;
            this._viewUI.recentContact_list.visible = true;
            this._viewUI.systemMsg_img.skin = "common/icon/avatarrole/30040.png";
            this._viewUI.systemMsg2_img.skin = "common/icon/avatarrole/30040.png";
            this.getRecentContactListData();
            this._viewUI.myFriend_btn.label = models.FriendModel.chineseStr.friend + FriendModel.getInstance().friendNameArr.length + models.FriendModel.chineseStr.friendNum;//好友数量
            this.getListData();
            this.getBlackListData();
            this._viewUI.blacklistNum_lab.text = this.blacklistuserNameArr.length.toString();//黑名单人数
            this.getAddBlackListData();
        }

        /** * 打开添加好友界面 */
        private showAddFriendView() {
            this._addFriendViewViewMediator.show();
            ModuleManager.hide(ModuleNames.FRIEND);
            LoginModel.getInstance().CommonPage = ModuleNames.FRIEND;
        }

        /**初始化选择列表 */
        public getSelectListData(): void {
            this._viewUI.select_list.vScrollBarSkin = "";
            this._viewUI.select_list.scrollBar.elasticBackTime = 200;
            this._viewUI.select_list.scrollBar.elasticDistance = 50;
            this._viewUI.select_list.array = this.selectNameArr;
            this._viewUI.select_list.renderHandler = new Handler(this, this.onselectRender);
            this._viewUI.select_list.selectHandler = new Handler(this, this.onselectlist);
            this._viewUI.select_list.selectedIndex = 0;
        }
        /**渲染选择列表 */
        public onselectRender(cell: Laya.Box, index: number): void {
            let selectBtn: Laya.Button = cell.getChildByName("select_btn") as Laya.Button;
            selectBtn.label = this.selectNameArr[index];
        }
        /**处理选择列表点击 */
        public onselectlist(index: number): void {
            let selectBtn: Laya.Button = this._viewUI.select_list.getCell(index).getChildByName("select_btn") as Laya.Button;
            selectBtn.selected = true;
            for (let i: number = 0; i < this.selectNameArr.length; i++) {
                if (i != index) {
                    let otherBtn: Laya.Button = this._viewUI.select_list.getCell(i).getChildByName("select_btn") as Laya.Button;
                    otherBtn.selected = false;
                }
            }
            //默认打开最近联系人面板
            if (this._viewUI.select_list.selectedIndex == 0) {
                this._viewUI.recentContact_box.visible = true;
                this._viewUI.friendChat_box.visible = false;
                this._viewUI.contact_box.visible = false;
                this._viewUI.addBlackList_box.visible = false;
                this.selectNum = -1;
                this.selectRecentContactNum = -1;
                this.getRecentContactListData();
            } else {
                this._viewUI.recentContact_box.visible = false;
                this._viewUI.friendChat_box.visible = false;
                this._viewUI.contact_box.visible = true;
                this.selectNum = -1;
                this.selectRecentContactNum = -1;
                this.showMyFriend();
            }
            if (this.lastBtn) {
                this.lastBtn.skin = "common/ui/tongyong/common_list_3textbg.png";
                if (this.lastBtn && this.lastBtn != this._viewUI.systemMsg2_btn) {
                    this.lastBtn = undefined;
                }
            }
        }

        /** 显示黑名单*/
        public showBlacklist(): void {
            this._viewUI.addBlackList_box.visible = true;
            this._viewUI.blackList_list.visible = true;
            this._viewUI.addBlackList_list.visible = false;
            this._viewUI.contact_list.visible = false;
            this._viewUI.systemMsg2_btn.visible = false;
            this._viewUI.friendChat_box.visible = false;
            this._viewUI.blacklist_btn.y = 45;
        }
        /**显示系统消息 */
        public showNotification(btn?): void {
            if (btn) this.showSelected(btn);
            this._viewUI.friendChat_box.visible = true;
            this._viewUI.relation_box.visible = false;
            this._viewUI.mychatInfo_list.visible = false;
            this._viewUI.chatButton_box.visible = false;
            this._viewUI.notification_panel.visible = true;
            this._viewUI.recentChatInfo_list.visible = false;
            if (this._viewUI.systemMsgPoing_img.visible == true) {
                this._viewUI.systemMsgPoing_img.visible = false;
                this._viewUI.systemMsgPoint2_img.visible = false;
                let selectPoint = this._viewUI.select_list.getCell(0).getChildByName("selectPoint_img") as Laya.Image;//选择按钮红点
                selectPoint.visible = false;
                models.FriendProxy.getInstance().event(models.readMessage_EVENT);//读完当前消息，发送事件，通知主界面取消好友红点
            }
            this.getSystemMessagePanelData();
        }
        /** 初始化系统消息的面板 */
        private getSystemMessagePanelData(): void {
            for (let i = 1; ; i++) {
                let render: Laya.Box = this._viewUI.notification_panel.getChildByName("render" + i) as Laya.Box;
                if (render) {
                    this._viewUI.notification_panel.removeChild(render);
                }
                else {
                    break;
                }
            }
            this._viewUI.notification_panel.vScrollBarSkin = "";
            this._viewUI.notification_panel.vScrollBar.elasticBackTime = 200;
            this._viewUI.notification_panel.vScrollBar.elasticDistance = 50;
            let render0: Laya.Box = this._viewUI.notification_panel.getChildByName("render0") as Laya.Box;
            this.onSystemMsgRender(render0, 0);
            let _systemMessageTimeArr = models.FriendModel.getInstance().systemMessageTimeArr;
            for (let i = 1; i < _systemMessageTimeArr.length; i++) {
                let render: Laya.Box = new Laya.Box;
                render = this.copyUIComponent(render, render0, i);
                render.name = "render" + i;
                this._viewUI.notification_panel.addChild(render);
                this.onSystemMsgRender(render, i);
            }
            this._viewUI.notification_panel.scrollTo(null, 1);//每次显示系统好友消息的最新消息
        }
        /** 拷贝一个UI组件 */
        private copyUIComponent(newUI: any, oldUI: any, index: number): any {
            //拷贝系统好友头像边框
            let old_notificationFrame_img: Laya.Image = oldUI.getChildByName("notificationFrame_img") as Laya.Image;
            let new_notificationFrame_img: Laya.Image = new Laya.Image;
            new_notificationFrame_img.name = "notificationFrame_img";
            newUI.addChild(new_notificationFrame_img);
            this.setCopyedUIComponent(new_notificationFrame_img, old_notificationFrame_img, Laya.Image);
            //拷贝系统好友头像
            let old_contentImg: Laya.Image = oldUI.getChildByName("notificationContent_img") as Laya.Image;
            let new_contentImg: Laya.Image = new Laya.Image;
            new_contentImg.name = "notificationContent_img";
            newUI.addChild(new_contentImg);
            this.setCopyedUIComponent(new_contentImg, old_contentImg, Laya.Image);
            //拷贝系统消息时间文本
            let old_TimeLab: Laya.Label = oldUI.getChildByName("notificationTime_lab") as Laya.Label;
            let new_TimeLab: Laya.Label = new Laya.Label;
            new_TimeLab.name = "notificationTime_lab";
            newUI.addChild(new_TimeLab);
            this.setCopyedUIComponent(new_TimeLab, old_TimeLab, Laya.Label);
            //拷贝系统消息文本背景图
            let old_notificationBgImg: Laya.Image = oldUI.getChildByName("notificationBg_img") as Laya.Image;
            let new_notificationBgImg: Laya.Image = new Laya.Image;
            new_notificationBgImg.name = "notificationBg_img";
            newUI.addChild(new_notificationBgImg);
            this.setCopyedUIComponent(new_notificationBgImg, old_notificationBgImg, Laya.Image);
            //拷贝系统消息富文本
            let old_notificationContentHtm = oldUI.getChildByName("notificationContent_htm") as Laya.HTMLDivElement;
            let new_notificationContentHtm: Laya.HTMLDivElement = new Laya.HTMLDivElement;
            new_notificationContentHtm.name = "notificationContent_htm";
            newUI.addChild(new_notificationContentHtm);
            this.setCopyedUIComponent(new_notificationContentHtm, old_notificationContentHtm, Laya.HTMLDivElement);
            return newUI;
        }
        /** 设置所拷贝出来UI组件各属性值 */
        private setCopyedUIComponent(newUI, oldUI, uiType): void {
            newUI.x = oldUI.x;
            newUI.y = oldUI.y;
            newUI.width = oldUI.width;
            newUI.height = oldUI.height;
            if (uiType == Laya.Image) {
                newUI.skin = oldUI.skin;
                newUI.sizeGrid = oldUI.sizeGrid;
            }
            else if (uiType == Laya.Label) {
                newUI.color = oldUI.color;
                newUI.bold = oldUI.bold;
                newUI.font = oldUI.font;
                newUI.fontSize = oldUI.fontSize;
            }
        }
        /** 渲染系统消息 */
        private onSystemMsgRender(render: Laya.Box, index: number): void {
            let systemMessageTime = models.FriendModel.getInstance().systemMessageTimeArr[index];
            if (systemMessageTime == undefined) {
                render.visible = false;
                return;
            }
            else {
                render.visible = true;
            }
            let contentImg: Laya.Image = render.getChildByName("notificationContent_img") as Laya.Image;
            let TimeLab: Laya.Label = render.getChildByName("notificationTime_lab") as Laya.Label;
            let notificationBgImg: Laya.Image = render.getChildByName("notificationBg_img") as Laya.Image;
            let notificationContentHtm = render.getChildByName("notificationContent_htm") as Laya.HTMLDivElement;
            let systemMessageContentText = models.FriendModel.getInstance().systemMessageContentParamArr[index];
            TimeLab.text = systemMessageTime;
            notificationContentHtm.innerHTML = "<span style='font:24px ;color:#50321a; SimHei'> " + systemMessageContentText + "</span>";
            notificationBgImg.height = notificationContentHtm.contextHeight + 15;
            contentImg.skin = "common/icon/avatarrole/30040.png";
            notificationContentHtm.on(LEvent.LINK, this, this.onClickName, [systemMessageContentText]);
            let diffHeight = notificationBgImg.height - 56;//56这个值是消息背景图原本的高
            if (diffHeight < 0) {
                diffHeight = 0;
            }
            if (index != 0) {
                //上一条消息的格子
                let preMsgBox: Laya.Box = this._viewUI.notification_panel.getChildByName("render" + (index - 1)) as Laya.Box;
                //上一条消息格子的y轴坐标
                let preMsgY = preMsgBox.y;
                //上一条消息格子的height高
                let preMsgHeight = preMsgBox.height;
                //当前消息格子的y轴坐标
                render.y = preMsgY + preMsgHeight;
                if (diffHeight >= 0) {
                    render.height = 81 + diffHeight;//81这个值是消息容器Box原本的高
                }
            }
            else {
                render.y = 0;
                if (diffHeight >= 0) {
                    render.height = 81 + diffHeight;//81这个值是消息容器Box原本的高
                }
            }
        }
        /** 发起请求 */
        private sendRequest(): void {
            let _roleid;
            if (this._viewUI.select_list.selectedIndex == 1) {
                _roleid = FriendModel.getInstance().friendIdArr[this.selectNum];
            }
            else {
                _roleid = this.recentContactIdArr[this.selectRecentContactNum];
            }
            RequesterProtocols._instance.c2s_CReqRoleTeamState(_roleid);
            friend.models.FriendProxy.getInstance().once(friend.models.SRequestUpdateRoleInfo_EVENT, this, this.showGive);
            RequesterProtocols._instance.c2s_CRequestUpdateRoleInfo(_roleid);
        }
        /**打开赠送礼物界面 */
        public showGive(): void {
            let _roleInfoBean: game.modules.friend.models.InfoBeanVo = FriendModel.getInstance().SRequestUpdateRoleInfoData.get("data").FriendInfoBean;
            let data = [];
            if (this._viewUI.select_list.selectedIndex == 1) {//联系人界面
                data.push(FriendModel.getInstance().friendIdArr[this.selectNum], FriendModel.getInstance().friendNameArr[this.selectNum], FriendModel.getInstance().friendLevelArr[this.selectNum], FriendModel.getInstance().touxiangIdArr[this.selectNum], FriendModel.getInstance().zhiyeImgArr[this.selectNum], _roleInfoBean.online);
            }
            else {//最近联系人界面
                let roleid = this.recentContactIdArr[this.selectRecentContactNum];
                let _flag = models.FriendModel.getInstance().isMyFriend(roleid);
                if (_flag == FriendEnum.STRANGE_KEY) {
                    data.push(this.recentContactIdArr[this.selectRecentContactNum], this.recentContactNameArr[this.selectRecentContactNum], this.recentContactLevelArr[this.selectRecentContactNum], this.recentContactHeadIdArr[this.selectRecentContactNum], this.recentContactZhiyeImgArr[this.selectRecentContactNum], _roleInfoBean.online);
                }
                else {
                    let _i = models.FriendModel.getInstance().friendIdArr.indexOf(roleid);
                    data.push(FriendModel.getInstance().friendIdArr[_i], FriendModel.getInstance().friendNameArr[_i], FriendModel.getInstance().friendLevelArr[_i], FriendModel.getInstance().touxiangIdArr[_i], FriendModel.getInstance().zhiyeImgArr[_i], _roleInfoBean.online);
                }
            }
            //ModuleManager.hide(ModuleNames.FRIEND);
            this.hide();
            let _GiveGiftViewMediator = new GiveGiftViewMediator(this._app);
            _GiveGiftViewMediator.onShow(data);
            LoginModel.getInstance().CommonPage = ModuleNames.FRIEND;
        }

        /**我的好友按钮点击事件 */
        public showMyFriend(): void {
            this._viewUI.addBlackList_box.visible = false;
            this._viewUI.blackList_list.visible = false;
            this._viewUI.contact_list.visible = true;
            this._viewUI.systemMsg2_btn.visible = true;
            this._viewUI.friendChat_box.visible = false;
            this._viewUI.blacklist_btn.y = 322;
        }

        public show(): void {
            this.eventListener();
            super.show();
            //this.lastBtn = undefined;
            this._viewUI.addBlackId_lab.text = "";
            this.px = this._viewUI.msgTips1_img.x;
            this.py = this._viewUI.msgTips1_img.y;
            this.key = true;
            for (let i: number = 0; i < FriendModel.getInstance().friendIdArr.length; i++) {
                RequesterProtocols._instance.c2s_CRequestUpdateRoleInfo(FriendModel.getInstance().friendIdArr[i]);//请求玩家信息
            }
            //如果界面没有初始化
            if (!models.FriendModel.getInstance().initFlag)
                this.initChatData();
            this.getSelectListData();
            //加载出最近联系人
            this.loadRecentContact();
            if (this.lastBtn && this.lastBtn != this._viewUI.systemMsg_btn && this.lastBtn != this._viewUI.systemMsg2_btn) {
                this.showSelected(this.lastBtn);
            }
            else if (this.lastBtn == this._viewUI.systemMsg_btn) {
                this.showSelected(this._viewUI.systemMsg_btn);
                this.showNotification();
            }
            else if (this.lastBtn == this._viewUI.systemMsg2_btn) {
                this._viewUI.select_list.selectedIndex = 1;
                this.showSelected(this._viewUI.systemMsg2_btn);
                this.showNotification();
            }
        }
        public getView(): Sprite {
            return this._viewUI;
        }
        public hide(): void {
            models.FriendModel.getInstance().initFlag = false;
            if (this._viewUI.friendChat_box.visible && this.lastBtn == this._viewUI.systemMsg_btn) {
                this.selectRecentContactNum = -1;
            }
            super.hide();
            this.key = false;
            this._viewUI.content_img.visible = false;
            chat.models.ChatProxy.getInstance().off(chat.models.SHOW_ITEM_TIPS, this, this._ShowTips);
            chat.models.ChatProxy.getInstance().off(chat.models.VIWE_OTHER_ITEM, this, this._ViewOtherItem);
            pet.models.PetProxy.getInstance().off(pet.models.GETPETINFO, this, this.OpPetInfo);
            tips.models.TipsProxy.getInstance().off(tips.models.ON_KRYBOARD, this, this.onKeyboard);
        }
    }
}