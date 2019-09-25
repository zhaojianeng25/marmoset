/**
 * 好友系统的中转服务
 * @author  TXX
 */
import FriendModel = game.modules.friend.models.FriendModel;
/**好友系统枚举 */
enum FriendEnum {
    /**离线状态 */
    OFFLINE_STATE = 0,
    /** 在线状态 */
    ONLINE_STATE = 1,
    /**灰色头像序号起始区间 */
    GRAY_ROLE_IMG_ID = 40000,
    /**列表开头添加元素 */
    PAIXU_QIAN = 0,
    /**列表末尾添加元素 */
    PAIXU_HOU = 1,
    /**头像序号起始区间 */
    ROLE_IMG_ID = 30000,
    /** 初始好友度*/
    FRIEND_DRGREE = 1,
    /**暂无帮派 */
    NO_FACTION = 11523,
    /**邀请入队 */
    INVITE_TEAM = 2738,
    /**申请入队 */
    APPLY_TEAM = 2740,
    /**未组队 */
    NO_TEAM = 0,
    /**已组队 */
    HAVE_TEAM = 1,
    /**删除好友 */
    DELETE_FRIEND = 2741,
    /**添加好友 */
    ADD_FRIEND = 11528,
    /** 观战 */
    WATCH_FIGHT = 2810,
    /** 切磋一下 */
    COMPAR_FIGCHT = 2809,
    /**好友关系 */
    FRIEND_KEY = 1,
    /**陌生人关系 */
    STRANGE_KEY = 2,
    /**无 */
    NOTHING = 3148,
    /**系统好友 */
    SYSTEM_FRIEND = 0,
    /**输入点内容再发送吧 */
    INPUT_SOMTHING = 1446,
    /**师门任务序号起始区间 */
    SCHOOL_TASK_START = 1010000,
    /**师门任务序号结束区间 */
    SCHOOL_TASK_END = 2000000,
    /**师门任务类型 */
    SHIMEN_TYPE = 2,
    /**主线任务类型 */
    ZHUXIAN_TYPE = 1,
    /**可赠送道具序号起始 */
    SCENE_START = 111004,
    /**可赠送道具序号结束 */
    SCENE_END = 111019,
}
module game.modules.friend.models {
    /**系统好友消息 */
    export const SSendSystemMessageToRole_EVENT: string = "SSendSystemMessageToRole";
    /**服务器返回推荐好友*/
    export const SRecommendFriend_EVENT: string = "SRecommendFriend";
    /**搜索好友成功S-->C */
    export const SSearchFriend_EVENT: string = "SSearchFriend";
    /**添加好友成功S-->C */
    export const SAddFriend_EVENT: string = "SAddFriend";
    /**陌生人聊天S-->C */
    export const SStrangerMessageToRole_EVENT: string = "SStrangerMessageToRole";
    /**好友信息初始化加载 */
    export const SFriendsInfoInit_EVENT: string = "SFriendsInfoInit";
    /**服务器返回搜索的角色信息 */
    export const SSearchBlackRoleInfo_EVENT: string = "SSearchBlackRoleInfo";
    /**服务器返回黑名单列表信息 */
    export const SBlackRoles_EVENT: string = "SBlackRoles";
    /**好友聊天聊天S-->C */
    export const SFriendMessageToRole_EVENT: string = "SFriendMessageToRole";
    /**角色上线客户端收到 离线消息 */
    export const SOffLineMsgMessageToRole_EVENT: string = "SOffLineMsgMessageToRole";
    /**返回服务器id */
    export const SRspServerId_EVENT: string = "SRspServerId";
    /**请求招募大转盘信息结果 */
    export const SReqRecruitWheel_EVENT: string = "SReqRecruitWheel";
    /**服务器发送抽奖 */
    export const SReqFortuneWheel_EVENT: string = "SReqFortuneWheel";
    /**通知客户端刷新邮件 */
    export const SMailInfo_EVENT: string = "SMailInfo";
    /**通知客户端刷新邮件状态 */
    export const SMailState_EVENT: string = "SMailState";
    /**通知客户端邮件列表 */
    export const SMailList_EVENT: string = "SMailList";
    /**赠送礼物结果 */
    export const SGiveGift_EVENT: string = "SGiveGift";
    /**服务器通知客户端刷新好友度 */
    export const SUpdateFriendLevel_EVENT: string = "SUpdateFriendLevel";
    /**赠送道具结果 */
    export const SGiveItem_EVENT: string = "SGiveItem";
    /**删除好友成功 */
    export const SBreakOffRelation_EVENT: string = "SBreakOffRelation";
    /**返回玩家请求的其他玩家的组队情况 */
    export const SAnswerRoleTeamState_EVENT: string = "SAnswerRoleTeamState";
    /**举报返回 */
    export const SRoleAccusationCheck_EVENT: string = "SRoleAccusationCheck";
    /**返回玩家信息 */
    export const SRequestUpdateRoleInfo_EVENT: string = "SRequestUpdateRoleInfo";
    /**人物弹窗发送消息 */
    export const transMessage_EVENT: string = "transMessage";
    /**收到消息 */
    export const receiveMessage_EVENT: string = "receiveMessage";
    /**阅读消息 */
    export const readMessage_EVENT: string = "readMessage";
    /**未读邮件 */
    export const receiveMail_EVENT: string = "receiveMail";
    /**邮件全部阅读 */
    export const readMail_EVENT: string = "readMail";
    /**切磋弹窗 */
    export const PK_EVENT: string = "PK";
    export class FriendProxy extends hanlder.ProxyBase {
        constructor() {
            super();
            FriendProxy._instance = this;
            this.init();
        }

        /**FriendProxy单例对象 */
        private static _instance: FriendProxy;
        public static getInstance(): FriendProxy {
            if (!this._instance) {
                this._instance = new FriendProxy();
            }
            return this._instance;
        }

        /** 初始化 */
        public init(): void {
            FriendProxy.getInstance();
            this.addNetworkListener();

            Laya.loader.load("common/data/temp/friends.crecruitreward.bin", Handler.create(this, this.onloadedRecruitRewardComplete), null, Loader.BUFFER);
            //加载好友赠送道具配置表
            Laya.loader.load("common/data/temp/friends.cfriendgiveitem.bin", Handler.create(this, this.onloadedCFriendGiveItemComplete), null, Loader.BUFFER);
        }
        /** 加载好友赠送道具配置表 */
        private onloadedCFriendGiveItemComplete(): void {
            var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/friends.cfriendgiveitem.bin");
            var data: Byte = new Byte(arrayBuffer);
            var size: number = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, FriendModel.getInstance().CFriendsGiveItemConfigDic, game.data.template.FriendGiveItemBaseVo, "id");
        }

        /**Z招募/招募奖励 */
        private onloadedRecruitRewardComplete(): void {
            var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/friends.crecruitreward.bin");
            var data: Byte = new Byte(arrayBuffer);
            var size: number = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, FriendModel.getInstance().CRecruitRewardBinDic, game.data.template.RecruitRewardBaseVo, "id");
        }

        /**添加监听 */
        private addNetworkListener(): void {
            //监听系统好友消息
            Network._instance.addHanlder(ProtocolsEnum.SSendSystemMessageToRole, this, this.onSendSystemMessageToRole);
            //监听服务器返回推荐好友列表
            Network._instance.addHanlder(ProtocolsEnum.SRecommendFriend, this, this.onRecommendFriend);
            //监听搜索好友返回结果
            Network._instance.addHanlder(ProtocolsEnum.SSearchFriend, this, this.onSearchFriend);
            //监听添加好友结果
            Network._instance.addHanlder(ProtocolsEnum.SAddFriend, this, this.onAddFriend);
            //监听与陌生人之间的对话消息
            Network._instance.addHanlder(ProtocolsEnum.SStrangerMessageToRole, this, this.onStrangerMessageToRole);
            //监听好友列表初始化信息
            Network._instance.addHanlder(ProtocolsEnum.SFriendsInfoInit, this, this.onFriendsInfoInit);
            //监听搜索黑名单返回的角色信息
            Network._instance.addHanlder(ProtocolsEnum.SSearchBlackRoleInfo, this, this.onSearchBlackRoleInfo);
            //监听服务器返回的黑名单列表
            Network._instance.addHanlder(ProtocolsEnum.SBlackRoles, this, this.onBlackRoles);
            //监听与好友之间的对话信息
            Network._instance.addHanlder(ProtocolsEnum.SFriendMessageToRole, this, this.onFriendMessageToRole);
            //监听角色下线期间收到的对话信息
            Network._instance.addHanlder(ProtocolsEnum.SOffLineMsgMessageToRole, this, this.onOffLineMsgMessageToRole);
            //监听服务器id信息
            Network._instance.addHanlder(ProtocolsEnum.SRspServerId, this, this.onRspServerId);
            //监听招募转盘抽奖结果
            Network._instance.addHanlder(ProtocolsEnum.SReqRecruitWheel, this, this.onReqRecruitWheel);
            //监听服务器发送抽奖
            Network._instance.addHanlder(ProtocolsEnum.SReqFortuneWheel, this, this.onReqFortuneWheel);
            //监听服务器发送的邮件信息
            Network._instance.addHanlder(ProtocolsEnum.SMailInfo, this, this.onMailInfo);
            //监听服务器发送的刷新邮件状态信息
            Network._instance.addHanlder(ProtocolsEnum.SMailState, this, this.onMailState);
            //监听邮件列表信息
            Network._instance.addHanlder(ProtocolsEnum.SMailList, this, this.onMailList);
            //监听赠送礼物结果
            Network._instance.addHanlder(ProtocolsEnum.SGiveGift, this, this.onGiveGift);
            //监听好友度变化
            Network._instance.addHanlder(ProtocolsEnum.SUpdateFriendLevel, this, this.onUpdateFriendLevel);
            //监听赠送道具结果
            Network._instance.addHanlder(ProtocolsEnum.SGiveItem, this, this.onGiveItem);
            //监听删除好友结果
            Network._instance.addHanlder(ProtocolsEnum.SBreakOffRelation, this, this.onBreakOffRelation);
            //监听玩家请求的其他玩家的组队情况
            Network._instance.addHanlder(ProtocolsEnum.SAnswerRoleTeamState, this, this.onAnswerRoleTeamState);
            //监听举报结果
            Network._instance.addHanlder(ProtocolsEnum.SRoleAccusationCheck, this, this.onRoleAccusationCheck);
            //监听玩家信息变化
            Network._instance.addHanlder(ProtocolsEnum.SRequestUpdateRoleInfo, this, this.onRequestUpdateRoleInfo);
            //监听切磋邀请
            Network._instance.addHanlder(ProtocolsEnum.SInvitationPlayPK, this, this.onInvitationPlayPK);
        }

        /**移除监听 */
        private removeNetworkListener(): void {
            Network._instance.removeHanlder(ProtocolsEnum.SSendSystemMessageToRole, this, this.onSendSystemMessageToRole);
            Network._instance.removeHanlder(ProtocolsEnum.SRecommendFriend, this, this.onRecommendFriend);
            Network._instance.removeHanlder(ProtocolsEnum.SSearchFriend, this, this.onSearchFriend);
            Network._instance.removeHanlder(ProtocolsEnum.SAddFriend, this, this.onAddFriend);
            Network._instance.removeHanlder(ProtocolsEnum.SStrangerMessageToRole, this, this.onStrangerMessageToRole);
            Network._instance.removeHanlder(ProtocolsEnum.SFriendsInfoInit, this, this.onFriendsInfoInit);
            Network._instance.removeHanlder(ProtocolsEnum.SSearchBlackRoleInfo, this, this.onSearchBlackRoleInfo);
            Network._instance.removeHanlder(ProtocolsEnum.SBlackRoles, this, this.onBlackRoles);
            Network._instance.removeHanlder(ProtocolsEnum.SFriendMessageToRole, this, this.onFriendMessageToRole);
            Network._instance.removeHanlder(ProtocolsEnum.SOffLineMsgMessageToRole, this, this.onOffLineMsgMessageToRole);
            Network._instance.removeHanlder(ProtocolsEnum.SRspServerId, this, this.onRspServerId);
            Network._instance.removeHanlder(ProtocolsEnum.SReqRecruitWheel, this, this.onReqRecruitWheel);
            Network._instance.removeHanlder(ProtocolsEnum.SReqFortuneWheel, this, this.onReqFortuneWheel);
            Network._instance.removeHanlder(ProtocolsEnum.SMailInfo, this, this.onMailInfo);
            Network._instance.removeHanlder(ProtocolsEnum.SMailState, this, this.onMailState);
            Network._instance.removeHanlder(ProtocolsEnum.SMailList, this, this.onMailList);
            Network._instance.removeHanlder(ProtocolsEnum.SGiveGift, this, this.onGiveGift);
            Network._instance.removeHanlder(ProtocolsEnum.SUpdateFriendLevel, this, this.onUpdateFriendLevel);
            Network._instance.removeHanlder(ProtocolsEnum.SGiveItem, this, this.onGiveItem);
            Network._instance.removeHanlder(ProtocolsEnum.SBreakOffRelation, this, this.onBreakOffRelation);
            Network._instance.removeHanlder(ProtocolsEnum.SAnswerRoleTeamState, this, this.onAnswerRoleTeamState);
            Network._instance.removeHanlder(ProtocolsEnum.SRoleAccusationCheck, this, this.onRoleAccusationCheck);
            Network._instance.removeHanlder(ProtocolsEnum.SRequestUpdateRoleInfo, this, this.onRequestUpdateRoleInfo);
            Network._instance.removeHanlder(ProtocolsEnum.SFriendsOnline, this, this.onSFriendsOnline);
        }
        /** 切磋邀请 */
        private onInvitationPlayPK(optcode: number, msg: hanlder.s2c_SInvitationPlayPK): void {
            this.event(PK_EVENT, [msg.sourceid, msg.rolename, msg.rolelevel]);
        }
        /** 好友上下线 */
        private onSFriendsOnline(optcode: number, msg: hanlder.S2C_SFriendsOnline): void {
            var _friendIdArr = models.FriendModel.getInstance().friendIdArr;
            for (let i = 0; i < _friendIdArr.length; i++) {
                if (_friendIdArr[i] == msg.roleid) {
                    models.FriendModel.getInstance().friendIdArr.splice(i, 1);
                    models.FriendModel.getInstance().friendIsOnline.splice(i, 1);
                }
            }
            if (msg.online == FriendEnum.OFFLINE_STATE) {
                models.FriendModel.getInstance().friendIdArr.push(msg.roleid);
                models.FriendModel.getInstance().friendIsOnline.push(msg.online);
            }
            else {
                models.FriendModel.getInstance().friendIdArr.unshift(msg.roleid);
                models.FriendModel.getInstance().friendIsOnline.unshift(msg.online);
            }
        }

        /** * 陌生人聊天S-->C */
        public onStrangerMessageToRole(optcode: number, msg: hanlder.S2C_SStrangerMessageToRole): void {
            models.FriendModel.getInstance().SStrangerMessageToRoleData.set("data", msg);
            models.FriendProxy.getInstance().event(models.SStrangerMessageToRole_EVENT);
        }

        /** * 系统好友消息 */
        public onSendSystemMessageToRole(optcode: number, msg: hanlder.S2C_SSendSystemMessageToRole): void {
            models.FriendModel.getInstance().SSendSystemMessageToRoleData.set("data", msg);
            //根据协议中的contentid，查找配置表中的消息
            var str = ChatModel.getInstance().chatMessageTips[msg.contentId]["msg"];
            //如果是0 表示是系统消息 大于0的一定是好友发的消息
            if (msg.systemRoleId == FriendEnum.SYSTEM_FRIEND) {
                //将配置表中的参数用协议中的数字替代
                for (var i: number = 0; i < msg.contentParam.length; i++) {
                    var ch = "$parameter" + (i + 1) + "$";
                    str = str.replace(ch, msg.contentParam[i]);
                }
                //将系统消息存入本地
                var account = LocalStorage.getItem("daowang_userLoginAccount");
                if (LocalStorage.getItem(account + "_MessageLength") != null) {
                    var length: number = parseInt(LocalStorage.getItem(account + "_MessageLength"));
                    length += 1;
                    LocalStorage.setItem(account + "_MessageLength", length + "");
                    for (var i: number = length; i > 0; i--) {
                        if (i > 20) {
                            LocalStorage.removeItem(account + "_Message" + i);
                            LocalStorage.setItem(account + "_MessageLength", length - 1 + "");
                        } else if (i == 1) {
                            LocalStorage.setItem(account + "_Message" + i, msg.time + "_" + str);
                        } else {
                            LocalStorage.setItem(account + "_Message" + i, LocalStorage.getItem(account + "_Message" + (i - 1)));
                        }
                    }
                } else {
                    LocalStorage.setItem(account + "_Message1", msg.time + "_" + str);
                    LocalStorage.setItem(account + "_MessageLength", "1");
                }
                //以下判断是写死
                if (msg.contentId == 180028) {//如果系统好友消息是好友赠送道具，代表好友曾在玩家角色离线期间赠送道具给了自己，玩家重新上线，会用系统消息代为提示玩家
                    let itemid = msg.contentParam[2];//服务器传到客户端的msg.contentParam第三个参数是道具id，180028这条客户端消息提示信息，要求的第三个参数就是道具名字，需要替换一下
                    let itemname = bag.models.BagModel.getInstance().itemAttrData[itemid]["name"];
                    str = str.replace(itemid, itemname);
                    models.FriendModel.getInstance().duringOfflineFriendGiveItem.push({ itemid: itemid, time: msg.time });
                }
                if (msg.contentId == 191046) {
                    str = FriendModel.getInstance().replaceSpecialMsgContentText(str);
                }
                /** 只有为类型为1的提示类型才飘窗 */
                let data = ChatModel.getInstance().chatMessageTips[msg.contentId];
                let dataType = data.type;
                var arr: Array<string> = dataType.split(",");
                for (var key of arr) {
                    if ((Number(key) == TipsMsgType.TIPS_POPMSG)) {
                        game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, str);
                    }
                }



                //从本地取出消息列表
                models.FriendModel.getInstance().setSystemMessageRecord();
            }
            models.FriendProxy.getInstance().event(models.SSendSystemMessageToRole_EVENT);
        }

        /** * 服务器返回推荐好友 */
        public onRecommendFriend(optcode: number, msg: hanlder.S2C_SRecommendFriend): void {
            models.FriendModel.getInstance().SRecommendFriendData.set("data", msg);
            models.FriendProxy.getInstance().event(models.SRecommendFriend_EVENT);
        }

        /** * 搜索好友成功S-->C */
        public onSearchFriend(optcode: number, msg: hanlder.S2C_SSearchFriend): void {
            models.FriendModel.getInstance().SSearchFriendData.set("data", msg);
            models.FriendProxy.getInstance().event(models.SSearchFriend_EVENT);
        }

        /** * 添加好友成功S-->C */
        public onAddFriend(optcode: number, msg: hanlder.S2C_SAddFriend): void {
            FriendModel.getInstance().SAddFriendData.set("data", msg);
            //添加好友成功，按照好友在线状态，进行排序，在线好友在前，离线好友在后
            if (msg.FriendInfoBean.online == FriendEnum.OFFLINE_STATE) {
                FriendModel.getInstance().touxiangImgArr.push({ img: "common/icon/grayavatarrole/" + (FriendEnum.GRAY_ROLE_IMG_ID + msg.FriendInfoBean.shape) + ".png" });
                this.setFriendZhiyeImg(msg.FriendInfoBean.school, FriendEnum.PAIXU_HOU);
                FriendModel.getInstance().friendNameArr.push(msg.FriendInfoBean.name);
                FriendModel.getInstance().friendLevelArr.push(msg.FriendInfoBean.roleLevel);
                FriendModel.getInstance().friendIdArr.push(msg.FriendInfoBean.roleId);
                FriendModel.getInstance().touxiangIdArr.push(msg.FriendInfoBean.shape);
                FriendModel.getInstance().zhiyeIdArr.push(msg.FriendInfoBean.school);
                FriendModel.getInstance().friendIsOnline.push(FriendEnum.OFFLINE_STATE);
                FriendModel.getInstance().friendDegreeDic.set(msg.FriendInfoBean.roleId, FriendEnum.FRIEND_DRGREE);//初始好友度
                FriendProxy.getInstance().event(models.SAddFriend_EVENT);
            } else {
                FriendModel.getInstance().touxiangImgArr.unshift({ img: "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + msg.FriendInfoBean.shape) + ".png" });
                this.setFriendZhiyeImg(msg.FriendInfoBean.school, FriendEnum.PAIXU_QIAN);
                FriendModel.getInstance().friendNameArr.unshift(msg.FriendInfoBean.name);
                FriendModel.getInstance().friendLevelArr.unshift(msg.FriendInfoBean.roleLevel);
                FriendModel.getInstance().friendIdArr.unshift(msg.FriendInfoBean.roleId);
                FriendModel.getInstance().touxiangIdArr.unshift(msg.FriendInfoBean.shape);
                FriendModel.getInstance().zhiyeIdArr.unshift(msg.FriendInfoBean.school);
                FriendModel.getInstance().friendIsOnline.unshift(FriendEnum.ONLINE_STATE);
                FriendModel.getInstance().friendDegreeDic.set(msg.FriendInfoBean.roleId, FriendEnum.FRIEND_DRGREE);//初始好友度
                FriendProxy.getInstance().event(models.SAddFriend_EVENT);
            }

        }

        /** * 好友信息初始化加载*/
        public onFriendsInfoInit(optcode: number, msg: hanlder.S2C_SFriendsInfoInit): void {
            FriendModel.getInstance().SFriendsInfoInitData.set("data", msg);
            //按在线状态排序
            for (var i = 0; i < msg.friends.length; i++) {
                if (msg.friends[i]["FriendInfoBean"]["online"] == FriendEnum.OFFLINE_STATE) {
                    FriendModel.getInstance().touxiangImgArr.push({ img: "common/icon/grayavatarrole/" + (FriendEnum.GRAY_ROLE_IMG_ID + msg.friends[i]["FriendInfoBean"]["shape"]) + ".png" });
                    FriendModel.getInstance().touxiangIdArr.push(msg.friends[i]["FriendInfoBean"]["shape"]);
                    FriendModel.getInstance().zhiyeIdArr.push(msg.friends[i]["FriendInfoBean"]["school"]);
                    this.setFriendZhiyeImg(msg.friends[i]["FriendInfoBean"]["school"], FriendEnum.PAIXU_HOU);
                    FriendModel.getInstance().friendNameArr.push(msg.friends[i]["FriendInfoBean"]["name"]);
                    FriendModel.getInstance().friendLevelArr.push(msg.friends[i]["FriendInfoBean"]["roleLevel"]);
                    FriendModel.getInstance().friendIdArr.push(msg.friends[i]["FriendInfoBean"]["roleId"]);
                    FriendModel.getInstance().friendIsOnline.push(FriendEnum.OFFLINE_STATE);
                    FriendModel.getInstance().friendDegreeDic.set(msg.friends[i]["FriendInfoBean"]["roleId"], msg.friends[i]["friendLevel"]);//初始化好友度
                } else {
                    FriendModel.getInstance().touxiangImgArr.unshift({ img: "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + msg.friends[i]["FriendInfoBean"]["shape"]) + ".png" });
                    FriendModel.getInstance().touxiangIdArr.unshift(msg.friends[i]["FriendInfoBean"]["shape"]);
                    FriendModel.getInstance().zhiyeIdArr.unshift(msg.friends[i]["FriendInfoBean"]["school"]);
                    this.setFriendZhiyeImg(msg.friends[i]["FriendInfoBean"]["school"], FriendEnum.PAIXU_QIAN);
                    FriendModel.getInstance().friendNameArr.unshift(msg.friends[i]["FriendInfoBean"]["name"]);
                    FriendModel.getInstance().friendLevelArr.unshift(msg.friends[i]["FriendInfoBean"]["roleLevel"]);
                    FriendModel.getInstance().friendIdArr.unshift(msg.friends[i]["FriendInfoBean"]["roleId"]);
                    FriendModel.getInstance().friendIsOnline.unshift(FriendEnum.ONLINE_STATE);
                    FriendModel.getInstance().friendDegreeDic.set(msg.friends[i]["FriendInfoBean"]["roleId"], msg.friends[i]["friendLevel"]);//初始化好友度
                }

            }
            FriendProxy.getInstance().event(models.SFriendsInfoInit_EVENT);
        }
        /**删除好友成功 */
        public onBreakOffRelation(optcode: number, msg: hanlder.S2C_SBreakOffRelation): void {
            FriendModel.getInstance().SBreakOffRelationData.set("data", msg);
            //删除好友成功后，移除好友列表中对应的好友
            FriendModel.getInstance().removeFriend(msg.roleid);
            FriendProxy.getInstance().event(models.SBreakOffRelation_EVENT, msg.roleid);
        }

        /**服务器通知客户端刷新好友度 */
        public onUpdateFriendLevel(optcode: number, msg: hanlder.S2C_SUpdateFriendLevel): void {
            FriendModel.getInstance().SUpdateFriendLevelData.set("data", msg);
            FriendModel.getInstance().friendDegreeDic.set(msg.friendid, msg.currentFriendLevel);
            FriendProxy.getInstance().event(models.SUpdateFriendLevel_EVENT);
        }

        /** * 服务器返回搜索的角色信息*/
        public onSearchBlackRoleInfo(optcode: number, msg: hanlder.S2C_search_blackroleinfo): void {
            models.FriendModel.getInstance().SSearchBlackRoleInfoData.set("data", msg);
            models.FriendProxy.getInstance().event(models.SSearchBlackRoleInfo_EVENT);
        }

        /** * 服务器返回黑名单列表信息*/
        public onBlackRoles(optcode: number, msg: hanlder.S2C_black_roles): void {
            models.FriendModel.getInstance().SBlackRolesData.set("data", msg);
            models.FriendProxy.getInstance().event(models.SBlackRoles_EVENT);
        }

        /** * 好友聊天聊天S-->C*/
        public onFriendMessageToRole(optcode: number, msg: hanlder.S2C_SFriendMessageToRole): void {
            models.FriendModel.getInstance().SFriendMessageToRoleData.set("data", msg);
            models.FriendProxy.getInstance().event(models.SFriendMessageToRole_EVENT);
        }

        /** * 角色上线客户端收到 离线消息*/
        public onOffLineMsgMessageToRole(optcode: number, msg: hanlder.S2C_SOffLineMsgMessageToRole): void {
            models.FriendModel.getInstance().SOffLineMsgMessageToRoleData.set("data", msg);
            models.FriendProxy.getInstance().event(models.SOffLineMsgMessageToRole_EVENT);
        }

        /** * 返回服务器id*/
        public onRspServerId(optcode: number, msg: hanlder.S2C_SRspServerId): void {
            models.FriendModel.getInstance().SRspServerIdData.set("data", msg);
            models.FriendProxy.getInstance().event(models.SRspServerId_EVENT);
        }

        /** * 请求招募大转盘信息结果*/
        public onReqRecruitWheel(optcode: number, msg: hanlder.S2C_req_recruitwheel): void {
            models.FriendModel.getInstance().SReqRecruitWheelData.set("data", msg);
            models.FriendProxy.getInstance().event(models.SReqRecruitWheel_EVENT);
        }

        /** * 服务器发送抽奖*/
        public onReqFortuneWheel(optcode: number, msg: hanlder.s2c_req_fortune_wheel): void {
            models.FriendModel.getInstance().SReqFortuneWheelData.set("data", msg);
            models.FriendProxy.getInstance().event(models.SReqFortuneWheel_EVENT);
            if (modules.activity.models.ActivityModel.getInstance().isOver) {
                modules.activity.models.ActivityProxy._instance.event(modules.activity.models.PINGJI_EVENT);
            }
        }

        /**通知客户端刷新邮件 */
        public onMailInfo(optcode: number, msg: hanlder.S2C_SMail_Info): void {
            models.FriendModel.getInstance().SMailInfoData.set("data", msg);
            models.FriendProxy.getInstance().event(models.SMailInfo_EVENT);
        }

        /**通知客户端刷新邮件状态 */
        public onMailState(optcode: number, msg: hanlder.S2C_SMail_State): void {
            models.FriendModel.getInstance().SMailStateData.set("data", msg);
            models.FriendProxy.getInstance().event(models.SMailState_EVENT);
        }

        /**通知客户端邮件列表 */
        public onMailList(optcode: number, msg: hanlder.S2C_SMail_List): void {
            models.FriendModel.getInstance().SMailListData.set("data", msg);
            models.FriendProxy.getInstance().event(models.SMailList_EVENT);
        }

        /**赠送礼物结果 */
        public onGiveGift(optcode: number, msg: hanlder.S2C_give_gift): void {
            models.FriendModel.getInstance().SGiveGiftData.set("data", msg);
            models.FriendProxy.getInstance().event(models.SGiveGift_EVENT, [msg.result]);
        }

        /**赠送道具结果 */
        public onGiveItem(optcode: number, msg: hanlder.S2C_give_item): void {
            models.FriendModel.getInstance().SGiveItemData.set("data", msg);
            models.FriendProxy.getInstance().event(models.SGiveItem_EVENT);
        }

        /**返回玩家请求的其他玩家的组队情况 */
        public onAnswerRoleTeamState(optcode: number, msg: hanlder.S2C_SAnswerRoleTeamState): void {
            models.FriendModel.getInstance().SAnswerRoleTeamStateData.set("data", msg);
            models.FriendProxy.getInstance().event(models.SAnswerRoleTeamState_EVENT);
        }

        /**举报返回 */
        public onRoleAccusationCheck(optcode: number, msg: hanlder.S2C_SRoleAccusationCheck): void {
            models.FriendModel.getInstance().SRoleAccusationCheckData.set("data", msg);
            models.FriendProxy.getInstance().event(models.SRoleAccusationCheck_EVENT);
        }

        /**返回玩家信息 */
        public onRequestUpdateRoleInfo(optcode: number, msg: hanlder.S2C_SRequestUpdateRoleInfo): void {
            models.FriendModel.getInstance().SRequestUpdateRoleInfoData.set("data", msg);
            var index = FriendModel.getInstance().friendIdArr.indexOf(msg.FriendInfoBean.roleId);
            models.FriendModel.getInstance().currRoleIsNotMyFriend = false;
            //重新排序好友列表，按照在线和离线
            if (index > -1) {
                //先将该好友从好友列表中移除
                FriendModel.getInstance().touxiangImgArr.splice(index, 1);
                FriendModel.getInstance().zhiyeImgArr.splice(index, 1);
                FriendModel.getInstance().friendNameArr.splice(index, 1);
                FriendModel.getInstance().friendLevelArr.splice(index, 1);
                FriendModel.getInstance().friendIdArr.splice(index, 1);
                FriendModel.getInstance().touxiangIdArr.splice(index, 1);
                FriendModel.getInstance().zhiyeIdArr.splice(index, 1);
                if (msg.FriendInfoBean.online == FriendEnum.OFFLINE_STATE) {
                    FriendModel.getInstance().touxiangImgArr.push({ img: "common/icon/grayavatarrole/" + (FriendEnum.GRAY_ROLE_IMG_ID + msg.FriendInfoBean.shape) + ".png" });
                    this.setFriendZhiyeImg(msg.FriendInfoBean.school, FriendEnum.PAIXU_HOU);
                    FriendModel.getInstance().friendNameArr.push(msg.FriendInfoBean.name);
                    FriendModel.getInstance().friendLevelArr.push(msg.FriendInfoBean.roleLevel);
                    FriendModel.getInstance().friendIdArr.push(msg.FriendInfoBean.roleId);
                    FriendModel.getInstance().touxiangIdArr.push(msg.FriendInfoBean.shape);
                    FriendModel.getInstance().zhiyeIdArr.push(msg.FriendInfoBean.school);
                    FriendProxy.getInstance().event(models.SAddFriend_EVENT);
                } else {
                    FriendModel.getInstance().touxiangImgArr.unshift({ img: "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + msg.FriendInfoBean.shape) + ".png" });
                    this.setFriendZhiyeImg(msg.FriendInfoBean.school, FriendEnum.PAIXU_QIAN);
                    FriendModel.getInstance().friendNameArr.unshift(msg.FriendInfoBean.name);
                    FriendModel.getInstance().friendLevelArr.unshift(msg.FriendInfoBean.roleLevel);
                    FriendModel.getInstance().friendIdArr.unshift(msg.FriendInfoBean.roleId);
                    FriendModel.getInstance().touxiangIdArr.unshift(msg.FriendInfoBean.shape);
                    FriendModel.getInstance().zhiyeIdArr.unshift(msg.FriendInfoBean.school);
                    FriendProxy.getInstance().event(models.SAddFriend_EVENT);
                }
            }
            else {
                models.FriendModel.getInstance().currRoleIsNotMyFriend = true;
            }
            models.FriendProxy.getInstance().event(models.SRequestUpdateRoleInfo_EVENT);
        }

        /**设置好友职业图标
         * pos决定从数组开头插入数据还是末尾插入数据
         */
        public setFriendZhiyeImg(school: number, pos: number): void {
            switch (school) {
                case zhiye.yunxiao:
                    if (pos == FriendEnum.PAIXU_QIAN)
                        FriendModel.getInstance().zhiyeImgArr.unshift("common/ui/tongyong/11.png");
                    else
                        FriendModel.getInstance().zhiyeImgArr.push("common/ui/tongyong/11.png");
                    break;
                case zhiye.dahuang:
                    if (pos == FriendEnum.PAIXU_QIAN)
                        FriendModel.getInstance().zhiyeImgArr.unshift("common/ui/tongyong/12.png");
                    else
                        FriendModel.getInstance().zhiyeImgArr.push("common/ui/tongyong/12.png");
                    break;
                case zhiye.cangyu:
                    if (pos == FriendEnum.PAIXU_QIAN)
                        FriendModel.getInstance().zhiyeImgArr.unshift("common/ui/tongyong/13.png");
                    else
                        FriendModel.getInstance().zhiyeImgArr.push("common/ui/tongyong/13.png");
                    break;
                case zhiye.feixue:
                    if (pos == FriendEnum.PAIXU_QIAN)
                        FriendModel.getInstance().zhiyeImgArr.unshift("common/ui/tongyong/14.png");
                    else
                        FriendModel.getInstance().zhiyeImgArr.push("common/ui/tongyong/14.png");
                    break;
                case zhiye.tianlei:
                    if (pos == FriendEnum.PAIXU_QIAN)
                        FriendModel.getInstance().zhiyeImgArr.unshift("common/ui/tongyong/15.png");
                    else
                        FriendModel.getInstance().zhiyeImgArr.push("common/ui/tongyong/15.png");
                    break;
                case zhiye.wuliang:
                    if (pos == FriendEnum.PAIXU_QIAN)
                        FriendModel.getInstance().zhiyeImgArr.unshift("common/ui/tongyong/16.png");
                    else
                        FriendModel.getInstance().zhiyeImgArr.push("common/ui/tongyong/16.png");
                    break;
                case zhiye.xuanming:
                    if (pos == FriendEnum.PAIXU_QIAN)
                        FriendModel.getInstance().zhiyeImgArr.unshift("common/ui/tongyong/17.png");
                    else
                        FriendModel.getInstance().zhiyeImgArr.push("common/ui/tongyong/17.png");
                    break;
                case zhiye.qixing:
                    if (pos == FriendEnum.PAIXU_QIAN)
                        FriendModel.getInstance().zhiyeImgArr.unshift("common/ui/tongyong/18.png");
                    else
                        FriendModel.getInstance().zhiyeImgArr.push("common/ui/tongyong/18.png");
                    break;
                case zhiye.danyang:
                    if (pos == FriendEnum.PAIXU_QIAN)
                        FriendModel.getInstance().zhiyeImgArr.unshift("common/ui/tongyong/19.png");
                    else
                        FriendModel.getInstance().zhiyeImgArr.push("common/ui/tongyong/19.png");
                    break;
            }
        }
    }
}