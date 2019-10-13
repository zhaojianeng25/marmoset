
/** 是否强行赠送标识 */
enum isForceGive {
	/** 否 */
	NO = 0,
	/** 是 */
	YES = 1
};
/** 赠送结果 */
enum GiveResult {
	/** 成功 */
	SUCCESS = 0,
	/** 双方不是双向好友 */
	FAIL = 1
}
module game.modules.friend.models {
	/**
 * 好友系统数据存放类
 * @author  TXX
 */
	export class FriendModel {
		/**系统好友消息字典key:"data",value:服务器返回的信息 */
		public SSendSystemMessageToRoleData: Laya.Dictionary;
		/**服务器返回推荐好友字典key:"data",value:服务器返回的信息 */
		public SRecommendFriendData: Laya.Dictionary;
		/**搜索好友成功字典key:"data",value:服务器返回的信息 */
		public SSearchFriendData: Laya.Dictionary;
		/**添加好友成功字典key:"data",value:服务器返回的信息 */
		public SAddFriendData: Laya.Dictionary;
		/**陌生人聊天字典key:"data",value:服务器返回的信息 */
		public SStrangerMessageToRoleData: Laya.Dictionary;
		/**好友信息初始化加载字典key:"data",value:服务器返回的信息 */
		public SFriendsInfoInitData: Laya.Dictionary;
		/**服务器返回搜索的角色信息字典key:"data",value:服务器返回的信息 */
		public SSearchBlackRoleInfoData: Laya.Dictionary;
		/**服务器返回黑名单列表信息字典key:"data",value:服务器返回的信息 */
		public SBlackRolesData: Laya.Dictionary;
		/**好友聊天聊天字典key:"data",value:服务器返回的信息*/
		public SFriendMessageToRoleData: Laya.Dictionary;
		/**角色上线客户端收到 离线消息字典key:"data",value:服务器返回的信息 */
		public SOffLineMsgMessageToRoleData: Laya.Dictionary;
		/**返回服务器id字典key:"data",value:服务器返回的信息 */
		public SRspServerIdData: Laya.Dictionary;
		/**请求招募大转盘信息结果字典key:"data",value:服务器返回的信息 */
		public SReqRecruitWheelData: Laya.Dictionary;
		/**服务器发送抽奖字典key:"data",value:服务器返回的信息 */
		public SReqFortuneWheelData: Laya.Dictionary;
		/**通知客户端刷新邮件字典key:"data",value:服务器返回的信息 */
		public SMailInfoData: Laya.Dictionary;
		/**通知客户端刷新邮件状态字典key:"data",value:服务器返回的信息 */
		public SMailStateData: Laya.Dictionary;
		/**通知客户端邮件列表字典key:"data",value:服务器返回的信息 */
		public SMailListData: Laya.Dictionary;
		/**赠送礼物结果字典key:"data",value:服务器返回的信息 */
		public SGiveGiftData: Laya.Dictionary;
		/**服务器通知客户端刷新好友度字典key:"data",value:服务器返回的信息 */
		public SUpdateFriendLevelData: Laya.Dictionary;
		/**赠送道具结果字典key:"data",value:服务器返回的信息 */
		public SGiveItemData: Laya.Dictionary;
		/**删除好友成功字典key:"data",value:服务器返回的信息 */
		public SBreakOffRelationData: Laya.Dictionary;
		/**返回玩家请求的其他玩家的组队情况字典key:"data",value:服务器返回的信息 */
		public SAnswerRoleTeamStateData: Laya.Dictionary;
		/**举报返回字典key:"data",value:服务器返回的信息 */
		public SRoleAccusationCheckData: Laya.Dictionary;
		/**返回玩家信息字典key:"data",value:服务器返回的信息 */
		public SRequestUpdateRoleInfoData: Laya.Dictionary;
		/**Z招募/招募奖励 */
		public CRecruitRewardBinDic: Object = {};
		/** 好友赠送道具配置表 */
		public CFriendsGiveItemConfigDic: Object = {};
		/**头像id数组 */
		public touxiangIdArr: Array<number>;
		/**头像图片路径数组 */
		public touxiangImgArr: Array<any>;
		/**职业图标路径数组 */
		public zhiyeImgArr: Array<any>;
		/**职业id数组 */
		public zhiyeIdArr: Array<number>;
		/**好友名字 */
		public friendNameArr: Array<any>;
		/**好友等级 */
		public friendLevelArr: Array<number>;
		/**好友账号 */
		public friendIdArr: Array<number>;
		/** 好友是否在线 */
		public friendIsOnline: Array<number>;
		/**好友度字典 key:好友id, value:好友度  */
		public friendDegreeDic: Laya.Dictionary;
		/**存放好友系统的appbase */
		public appBase: AppBase;
		/** 好友系统是否加载 */
		public initFlag: boolean = false;
		/**系统消息时间 */
		public systemMessageTimeArr: Array<any> = [];
		/**系统消息内容 */
		public systemMessageContentParamArr: Array<any> = [];
		/** 好友在自己离线期间赠送的道具 */
		public duringOfflineFriendGiveItem: Array<any> = [];
		/** 判断是否显示过离线系统好友消息 */
		public isShowSystemFriendMsg: boolean = false;
		/** 需要被点击的名字 */
		public needClickNameDic: Laya.Dictionary;
		/** 判断发起联系的对象角色是否自己的好友 */
		public currRoleIsNotMyFriend: boolean = false;

		constructor() {
			FriendModel._instance = this;
			this.SSendSystemMessageToRoleData = new Laya.Dictionary();
			this.SRecommendFriendData = new Laya.Dictionary();
			this.SSearchFriendData = new Laya.Dictionary();
			this.SAddFriendData = new Laya.Dictionary();
			this.SStrangerMessageToRoleData = new Laya.Dictionary();
			this.SFriendsInfoInitData = new Laya.Dictionary();
			this.SSearchBlackRoleInfoData = new Laya.Dictionary();
			this.SBlackRolesData = new Laya.Dictionary();
			this.SFriendMessageToRoleData = new Laya.Dictionary();
			this.SOffLineMsgMessageToRoleData = new Laya.Dictionary();
			this.SRspServerIdData = new Laya.Dictionary();
			this.SReqRecruitWheelData = new Laya.Dictionary();
			this.SReqFortuneWheelData = new Laya.Dictionary();
			this.SMailInfoData = new Laya.Dictionary();
			this.SMailStateData = new Laya.Dictionary();
			this.SMailListData = new Laya.Dictionary();
			this.SGiveGiftData = new Laya.Dictionary();
			this.SUpdateFriendLevelData = new Laya.Dictionary();
			this.SGiveItemData = new Laya.Dictionary();
			this.SBreakOffRelationData = new Laya.Dictionary();
			this.SAnswerRoleTeamStateData = new Laya.Dictionary();
			this.SRoleAccusationCheckData = new Laya.Dictionary();
			this.SRequestUpdateRoleInfoData = new Laya.Dictionary();
			this.touxiangImgArr = new Array<any>();
			this.touxiangIdArr = new Array<number>();
			this.zhiyeImgArr = new Array<any>();
			this.zhiyeIdArr = new Array<number>();
			this.friendNameArr = new Array<any>();
			this.friendLevelArr = new Array<number>();
			this.friendIdArr = new Array<number>();
			this.friendIsOnline = new Array<number>();
			this.friendDegreeDic = new Laya.Dictionary();
			this.appBase = new AppBase();
			this.needClickNameDic = new Laya.Dictionary();
		}

		/**FriendModel的单利对象 */
		public static _instance: FriendModel;

		/**获取FriendModel的单例 */
		public static getInstance(): FriendModel {
			if (!this._instance) {
				this._instance = new FriendModel();
			}
			return this._instance;
		}
		public static clearModelData(): void {
			friend.models.FriendModel._instance.SSendSystemMessageToRoleData = new Laya.Dictionary();
			friend.models.FriendModel._instance.SRecommendFriendData = new Laya.Dictionary();
			friend.models.FriendModel._instance.SSearchFriendData = new Laya.Dictionary();
			friend.models.FriendModel._instance.SAddFriendData = new Laya.Dictionary();
			friend.models.FriendModel._instance.SStrangerMessageToRoleData = new Laya.Dictionary();
			friend.models.FriendModel._instance.SFriendsInfoInitData = new Laya.Dictionary();
			friend.models.FriendModel._instance.SSearchBlackRoleInfoData = new Laya.Dictionary();
			friend.models.FriendModel._instance.SBlackRolesData = new Laya.Dictionary();
			friend.models.FriendModel._instance.SFriendMessageToRoleData = new Laya.Dictionary();
			friend.models.FriendModel._instance.SOffLineMsgMessageToRoleData = new Laya.Dictionary();
			friend.models.FriendModel._instance.SRspServerIdData = new Laya.Dictionary();
			friend.models.FriendModel._instance.SReqRecruitWheelData = new Laya.Dictionary();
			friend.models.FriendModel._instance.SReqFortuneWheelData = new Laya.Dictionary();
			friend.models.FriendModel._instance.SMailInfoData = new Laya.Dictionary();
			friend.models.FriendModel._instance.SMailStateData = new Laya.Dictionary();
			friend.models.FriendModel._instance.SMailListData = new Laya.Dictionary();
			friend.models.FriendModel._instance.SGiveGiftData = new Laya.Dictionary();
			friend.models.FriendModel._instance.SUpdateFriendLevelData = new Laya.Dictionary();
			friend.models.FriendModel._instance.SGiveItemData = new Laya.Dictionary();
			friend.models.FriendModel._instance.SBreakOffRelationData = new Laya.Dictionary();
			friend.models.FriendModel._instance.SAnswerRoleTeamStateData = new Laya.Dictionary();
			friend.models.FriendModel._instance.SRoleAccusationCheckData = new Laya.Dictionary();
			friend.models.FriendModel._instance.SRequestUpdateRoleInfoData = new Laya.Dictionary();
			friend.models.FriendModel._instance.touxiangImgArr = new Array<any>();
			friend.models.FriendModel._instance.touxiangIdArr = new Array<number>();
			friend.models.FriendModel._instance.zhiyeImgArr = new Array<any>();
			friend.models.FriendModel._instance.zhiyeIdArr = new Array<number>();
			friend.models.FriendModel._instance.friendNameArr = new Array<any>();
			friend.models.FriendModel._instance.friendLevelArr = new Array<number>();
			friend.models.FriendModel._instance.friendIdArr = new Array<number>();
			friend.models.FriendModel._instance.friendIsOnline = new Array<number>();
			friend.models.FriendModel._instance.friendDegreeDic = new Laya.Dictionary();
			friend.models.FriendModel._instance.appBase = new AppBase();
			friend.models.FriendModel._instance.initFlag = false;
			friend.models.FriendModel._instance.systemMessageTimeArr = [];
			friend.models.FriendModel._instance.systemMessageContentParamArr = [];
			friend.models.FriendModel._instance.duringOfflineFriendGiveItem = [];
			friend.models.FriendModel._instance.isShowSystemFriendMsg = false;
			friend.models.FriendModel._instance.needClickNameDic = new Laya.Dictionary();
			friend.models.FriendModel._instance.currRoleIsNotMyFriend = false;
		}

		/**中文字符串存放 */
		public static chineseStr = {
			/**最近联系 */
			recent_contact: "最近联系",
			/**联系人 */
			contact: "联系人",
			/**我的好友( */
			friend: "我的好友(",
			/**"/100) */
			friendNum: "/100)",
			/**赠送礼物 */
			give_gift: "赠送礼物",
			/**赠送道具 */
			give_daoju: "赠送道具",
			/**昵称不雅 */
			nicheng_buya: "昵称不雅",
			/**言行不雅 */
			yanxing_buya: "言行不雅",
			/**外挂举报 */
			waigua_jubao: "外挂举报",
			/**线下交易 */
			xianxia_jiaoyi: "线下交易",
			/**举报诈骗 */
			jubao_zhanpian: "举报诈骗",
			/**其他举报 */
			qita_jubao: "其他举报",
			/**已领取 */
			yilingqu: "已领取",
			/**领取 */
			lingqu: "领取",
		}

		/** 判断对方角色是否是自己的好友
		 * @param roleid 对方角色id
		 */
		public isMyFriend(roleid: number): number {
			if (this.friendIdArr.indexOf(roleid) != -1) {
				return FriendEnum.FRIEND_KEY;
			}
			return FriendEnum.STRANGE_KEY;
		}

		/** 判断对方角色是否在自己的黑名单中
		 * @param roleid 对方角色id
		 * @param rolename 对方角色名字
		 */
		public isMyBlackList(roleid: number, rolename?: string): boolean {
			let _sBlackRolesData = this.SBlackRolesData.get("data");
			let _blackRoles = _sBlackRolesData.blackRoles;
			if (rolename != undefined) {
				for (let i = 0; i < _blackRoles.length; i++) {
					if (rolename == _blackRoles[i]["name"]) {
						return true;
					}
				}
				return false;
			}
			else {
				for (let i = 0; i < _blackRoles.length; i++) {
					if (roleid == _blackRoles[i]["roleId"]) {
						return true;
					}
				}
				return false;
			}
		}
		/** 好友相关信息数据移除 */
		public removeFriend(roleid: number): void {
			var index = FriendModel.getInstance().friendIdArr.indexOf(roleid);
			if (index > -1) {
				FriendModel.getInstance().friendIdArr.splice(index, 1);
				FriendModel.getInstance().friendNameArr.splice(index, 1);
				FriendModel.getInstance().friendLevelArr.splice(index, 1);
				FriendModel.getInstance().touxiangIdArr.splice(index, 1);
				FriendModel.getInstance().zhiyeIdArr.splice(index, 1);
				FriendModel.getInstance().touxiangImgArr.splice(index, 1);
				FriendModel.getInstance().zhiyeImgArr.splice(index, 1);
				FriendModel.getInstance().friendDegreeDic.remove(roleid);
				FriendModel.getInstance().friendIsOnline.splice(index, 1);
			}
		}
		/** 从本地取出消息列表 */
		public setSystemMessageRecord(): void {
			models.FriendModel.getInstance().systemMessageTimeArr = [];
			models.FriendModel.getInstance().systemMessageContentParamArr = [];
			var account = LocalStorage.getItem("daowang_userLoginAccount");
			var length = parseInt(LocalStorage.getItem(account + "_MessageLength"));
			if (length == null) return;
			for (var i: number = 1; i <= length; i++) {
				//位置0为消息时间，位置1为消息内容
				var arr = LocalStorage.getItem(account + "_Message" + i).split("_");
				if(arr.length == 2){//arr[0],装的是系统消息收到的时间  arr[1]装消息内容
					arr[1] = models.FriendModel.getInstance().replaceSpecialMsgContentText(arr[1]);
				}
				else if(arr.length == 3){//当出现了arr[2]，是因为ui/tongyong/common_jinb.png，该图片路径中有“_”，被split("_")给分割了，以至于多出了一个arr[2],是针对客户端提示表消息id为172008
					let str1:string = arr[1];
					let str2:string = arr[2];
					let str3:string = str1 + "_" + str2;//代码进行修正这个消息内容
					arr[1] = str3;
				}
				models.FriendModel.getInstance().systemMessageTimeArr.push(arr[0]);
				models.FriendModel.getInstance().systemMessageContentParamArr.push(arr[1]);
			}
			console.log("----系统消息时间---：", models.FriendModel.getInstance().systemMessageTimeArr);
			console.log("----系统消息内容---：", models.FriendModel.getInstance().systemMessageContentParamArr);
		}
		/** 替换掉特殊的消息内容文本 */
		public replaceSpecialMsgContentText(msg: string): string {
			let targetStr_1 = "<G";
			let targetIndex_1 = msg.indexOf(targetStr_1);
			let targetStr_2 = "G>";
			let targetIndex_2 = msg.indexOf(targetStr_2);
			let targetStr: string = "";
			let needShowStr: string = "";
			let needShowName: string = "";
			let targetid: number;
			if (targetIndex_1 != -1 && targetIndex_2 != -1) {
				targetStr = msg.substring(targetIndex_1, targetIndex_2 + 2);
				let targetStr_npc = 'npcid="';
				let targetIndex_npc = targetStr.indexOf(targetStr_npc);
				let targetStr_3 = "</";
				let targetIndex_3 = targetStr.indexOf(targetStr_3);
				if (targetIndex_npc != -1) {
					let npcid = targetStr.substring(targetIndex_npc + targetStr_npc.length, targetIndex_3);
					targetid = Number(npcid);
					if (/^[0-9]+$/.test(npcid)) {//判断这个id是否是有效的纯数字id
						let npcinfo: CNPCConfigBaseVo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[npcid] as CNPCConfigBaseVo;
						let npcname = npcinfo.name;
						needShowName = npcname;
						needShowStr = "<span style='color:#13ff00;fontSize:24;underline:false' href='onClickName'>" + npcname + "</span>";
					}
				}
				else {//另外处理这种<G t="$parameter1$" m="$parameter2$" x="$parameter3$" y="$parameter4$ c=33FF33;</G>
					let target_t = 't="';
					let targetIndex_t = targetStr.indexOf(target_t);
					let target_m = '" m="';
					let targetIndex_m = targetStr.indexOf(target_m);
					let target_x = '" x="';
					let targetIndex_x = targetStr.indexOf(target_x);
					let target_y = '" y="';
					let targetIndex_y = targetStr.indexOf(target_y);
					let target_c = ' c=33FF33';
					let targetIndex_c = targetStr.indexOf(target_c);
					let targetname = targetStr.substring(targetIndex_t + target_t.length, targetIndex_m);//目标名字
					needShowName = targetname;
					let targetmapid = targetStr.substring(targetIndex_m + target_m.length, targetIndex_x);//目标所在地图id
					let targetxPos = targetStr.substring(targetIndex_x + target_x.length, targetIndex_y);//目标所在地图里坐标x的值
					let targetyPos = targetStr.substring(targetIndex_y + target_y.length, targetIndex_c);//目标所在地图里坐标y的值
					needShowStr = "<span style='color:#13ff00;fontSize:24'>" + targetname + "</span>";
				}
			}
			msg = msg.replace(targetStr, needShowStr);
			if (needShowName != "" && targetid) {
				models.FriendModel.getInstance().needClickNameDic.set(msg, [{ needShowName: needShowName, targetid: targetid }]);
			}
			return msg;
		}
	}
}