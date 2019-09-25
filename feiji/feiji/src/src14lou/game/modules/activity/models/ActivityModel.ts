
module game.modules.activity.models {
	/** ActivityModel 活动相关数据存储 */
	export class ActivityModel {
		/** 活跃度奖励表 */
		public ActiveGiftBoxBinDic: Object = {};
		/** 周历 */
		public WeekListBinDic: Object = {};
		/** 推送设置 */
		public TuiSongSettingBinDic: Object = {};
		/** 活动配置表 */
		public ActivityNewBinDic: Object = {};
		/** 活动配置表通过type赋值 */
		public ActivityNewBinDicAtType: Laya.Dictionary = new Laya.Dictionary;
		/** 定时活动配置表通过活动id赋值 */
		public CheculedActivityBinDicAtActId: Laya.Dictionary = new Laya.Dictionary;
		/** 活动-跳转地图 */
		public ActivityMapListBinDic: Object = {};
		/** 精英副本参数表 */
		public ShiGuangZhiXueBinDic: Object = {};
		/** 精英副本参数表 */
		public ShiGuangZhiXueByFuBenId: Laya.Dictionary = new Laya.Dictionary;
		/** 双倍点数 */
		public RoleHookExpData: RoleHookExpVo;
		/** 活跃度值 */
		public activevalue: number;
		/** 各项活动完成信息 */
		public activities: Laya.Dictionary;
		/** 各项活动完成次数-key为活动id，value为次数 */
		public activityInfos: Laya.Dictionary = new Laya.Dictionary;
		/** 活跃度领取信息 */
		public chests: Laya.Dictionary;
		/** 当前活动页面 */
		public firstInterface: number = -1;
		/** 活动推送相关信息 */
		public actTuiSongInfos: Laya.Dictionary = new Laya.Dictionary;
		/** 精英副本可否挑战状态 */
		public instances: Laya.Dictionary = new Laya.Dictionary;
		/** 精英副本参数刷新表 */
		public JingYingNpc: Laya.Dictionary = new Laya.Dictionary;
		/** 精英副本怪物信息 */
		public questdata: game.modules.task.models.ActiveQuestDataVo;
		/** 评分 */
		public grade: number;
		/** 评级界面是否开启 */
		public isShowPingJi: boolean = false;
		/** 精英副本完成提示 */
		public isOver: boolean = false;
		constructor() {
			ActivityModel._instance = this;
			// ActivityProxy.getInstance();
		}
		public static _instance: ActivityModel;
		public static getInstance(): ActivityModel {
			if (!this._instance) {
				this._instance = new ActivityModel();
			}
			return this._instance;
		}
		public static clearModelData(): void {
			activity.models.ActivityModel._instance.RoleHookExpData = new models.RoleHookExpVo();
			activity.models.ActivityModel._instance.activevalue = 0;
			activity.models.ActivityModel._instance.activities = new Laya.Dictionary();
			activity.models.ActivityModel._instance.activityInfos = new Laya.Dictionary();
			activity.models.ActivityModel._instance.chests = new Laya.Dictionary();
			activity.models.ActivityModel._instance.firstInterface = -1;
			activity.models.ActivityModel._instance.actTuiSongInfos = new Laya.Dictionary();
			activity.models.ActivityModel._instance.instances = new Laya.Dictionary();
			activity.models.ActivityModel._instance.questdata = null;
			activity.models.ActivityModel._instance.grade = 0;
			activity.models.ActivityModel._instance.isShowPingJi = false;
			activity.models.ActivityModel._instance.isOver = false;
		}
		/** 设置默认活动已完成次数 */
		public setActivityInfo(): void {
			for (var i in this.ActivityNewBinDic) {
				this.activityInfos.set(this.ActivityNewBinDic[i].id, 0);
			}
		}
        /** 
		 * 设置活动默认全部推送
		 * @param key 账号名加活动推送表的活动编号 
		 * @param value 是否开启推送+是否已经推送+活动id
		 * 响应事件
		 */
		public setTuiSongState(): void {
			for (var num in this.TuiSongSettingBinDic) {
				var name = this.TuiSongSettingBinDic[num].name;
				var account = LocalStorage.getItem("daowang_userLoginAccount");
				if (LocalStorage.getItem(account + num) != null) {
					var arr = LocalStorage.getItem(account + num).split("_");
					var tuiSong = arr[0];
					var id = arr[2];
					var str = tuiSong + "_0_" + id;
					LocalStorage.setItem(account + num, str);
				} else {
					var view2 = this.ActivityNewBinDicAtType.get(2);
					var newId: number;
					for (var i: number = 0; i < view2.length; i++) {
						if (view2[i].name == name) {
							newId = view2[i].id;
							var str = "1_0_" + newId;
							LocalStorage.setItem(account + num, str);
						}
					}
				}
			}
		}
	}
}