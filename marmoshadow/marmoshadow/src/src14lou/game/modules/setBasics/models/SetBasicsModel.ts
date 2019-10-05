/** 道具安全锁状态类型 */
enum GoodLockState{
	/** 关闭 */
	CLOSE = 0,
	/** 开启 */
	OPEN = 1
};

/** 离线类型 */
enum OffLineType{
	/** 主动下线，退出游戏 */
	OFFLINE = 1,
	/** 被动断线 */
	LINK_BROKEN = 2,
	/** 返回人物选择界面 */
	CHOSEE_ROLE = 3,
	/** 返回登录界面 */
	RETURN_LOGIN = 4
};

/** 系统设置类型 */
enum SysConfigType{
	/** 音乐 */
	Music = 1,
	/** 音量 */
	Volume = 2,
	/** 音效 */
	SoundSpecEffect = 3,
	/** 场景特效 */
	SceneEffect = 4,
	/** 设置同屏最大显示人数 */
	MaxScreenShowNum = 5,
	/** 画面刷新频率 */
	ScreenRefresh = 6,
	/** 自动语音--公会频道 */
	AutoVoiceGang = 7,
	/** 自动语音--世界频道 */
	AutoVoiceWorld = 8,
	/** 自动语音--组队频道 */
	AutoVoiceTeam = 9,
	/** 自动语音--职业频道 */
	AutoVoiceSchool = 10,
	/** 拒绝好友邀请 */
	RefuseFriend = 11,
	/** 世界频道 */
	WorldChannel = 12,
	/** 公会频道 */
	GangChannel = 13,
	/** 职业频道 */
	SchoolChannel = 14,
	/** 当前频道 */
	CurrentChannel = 15,
	/** 组队频道 */
	TeamChannel = 16,
	/** PVPNotify */
	PVPNotify = 17,
	/** 好友聊天记录加密 */
	friendchatencrypt = 18,
	/** 只接受好友消息 */
	friendmessage = 19,
	/** rolePointAdd */
	rolePointAdd = 20,
	/** petPointAdd */
	petPointAdd = 21,
	/** skillPointAdd */
	skillPointAdd = 22,
	/** huoyueduAdd */
	huoyueduAdd = 23,
	/** zhenfaAdd */
	zhenfaAdd = 24,
	/** 技能开放 */
	skillopen = 25,
	/** 公会开放 */
	factionopen = 26,
	/** 宠物开放 */
	petopen = 27,
	/** 助战开放 */
	patopen = 28,
	/** 组队频道 */
	zuduichannel = 29,
	/** 挂机开放 */
	guajiopen = 30,
	/** 指引开放 */
	zhiyinopen = 31,
	/** 活动开放 */
	huodongopen = 32,
	/** 切磋 */
	refuseqiecuo = 33,
	/** 推送巨龙护卫 */
	ts_julonghuwei = 34,
	/** 推送巨龙军团 */
	ts_julongjuntuan = 35,
	/** 推送冠军试炼 */
	ts_guanjunshilian = 36,
	/** 推送人文探索 */
	ts_renwentansuo = 37,
	/** 推送1v1 */
	ts_1v1 = 38,
	/** 推送工会副本 */
	ts_gonghuifuben = 39,
	/** 推送3v3 */
	ts_3v3 = 40,
	/** 推送智慧试炼 */
	ts_zhihuishilian = 41,
	/** 拒绝公会邀请 */
	refuseclan = 42,
	/** 拒绝别人查看装备 */
	refuseotherseeequip = 43,
	/** 录屏功能 */
	screenrecord = 44,
	/** 装备耐久 */
	equipendure = 45,
	/** 工会战 */
	ts_gonghuizhan = 46,
	/** ROLL点设置 */
	rolldianshezhi = 47,
	/** 界面简化 */
	framesimplify = 48
}


module game.modules.setBasics.models{
	/** 系统设置的models */
	export class SetBasicsModel{
		/** 道具安全锁信息 */
		public itemLockInfo:ItemLockInfoVo = new ItemLockInfoVo();
		/** 系统设置加点字典 */
		public SysConfigDic:Laya.Dictionary;
		/** 重新设置后系统设置加点字典 */
		public resetSysConfigDic:Laya.Dictionary;
		/** 用于判断是否是游戏中主动请求返回到登陆界面 */
        public _isRrturnLoginflag:boolean; 
		/** 设置自动进入副本选项配置 */
		public setLineConfig:Laya.Dictionary;
		/** 判断是否要关了场景音乐 */
		public isCloseMusic:boolean;

        constructor(){
			SetBasicsModel._instance = this;

			this.SysConfigDic = new Laya.Dictionary();//key：参考SysConfigType，即系统设置类型枚举类，value:0--关闭；1--开启。除了设置同屏最大人数是50与10
			this.resetSysConfigDic = new Laya.Dictionary();

			this._isRrturnLoginflag = false;
		}
		public static _instance:SetBasicsModel;
		public static getInstance():SetBasicsModel {
			if(!this._instance) {
				this._instance = new SetBasicsModel();
			}
			return this._instance;
		}
		public static clearModelData(): void {
			setBasics.models.SetBasicsModel._instance.itemLockInfo = new ItemLockInfoVo();
			setBasics.models.SetBasicsModel._instance.SysConfigDic = new Laya.Dictionary();
			setBasics.models.SetBasicsModel._instance.resetSysConfigDic = new Laya.Dictionary();
			setBasics.models.SetBasicsModel._instance.setLineConfig = new Laya.Dictionary();
		}
    }
}