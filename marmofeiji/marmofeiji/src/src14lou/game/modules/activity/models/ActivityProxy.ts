/**
* ActivityProxy 
*/
module game.modules.activity.models {
	/** 双倍点数领取-冻结 */
	export const ROLEHOOKEXP_EVENT: string = "roleHookExpEvent";
	/** 活动数据 */
	export const REFRESHACTIVITYLIST_EVENT: string = "refreshActivityListEvent";
	/** 刷新需要推送的内容 */
	export const TUISONG_EVENT: string = "tuiSongEvent";
	/** 活动消息推送事件派发 */
	export const TUISONG_TIAOZHUAN_EVENT: string = "tuiSongTiaoZhuanEvent";
	/** 精英副本 */
	export const JINGYINGFUBEN_EVENT: string = "jingYingFuBenEvent";
	/** 评级 */
	export const PINGJI_EVENT: string = "pingJiEvent";
	/** 队长副本进度同步 */
	export const DEFINETEAM: string = "defineTeamEvent";
	export class ActivityProxy extends hanlder.ProxyBase {
		constructor() {
			super();
			ActivityProxy._instance = this;
			this.init();
		}
		public static _instance: ActivityProxy;
		public static getInstance(): ActivityProxy {
			if (!this._instance) {
				this._instance = new ActivityProxy();
			}
			return this._instance;
		}

		public init(): void {
			ActivityModel.getInstance();
			this.addNetworkListener();

			//活跃度奖励
			Laya.loader.load("common/data/temp/mission.cactivegiftbox.bin", Handler.create(this, this.onloadedActiveGiftBoxComplete), null, Loader.BUFFER);
			//周历
			Laya.loader.load("common/data/temp/mission.cweeklist.bin", Handler.create(this, this.onloadedWeekListComplete), null, Loader.BUFFER);
			//消息推送
			Laya.loader.load("common/data/temp/SysConfig.ctuisongsetting.bin", Handler.create(this, this.onloadedTuiSongSettingComplete), null, Loader.BUFFER);
			//活动配置表
			Laya.loader.load("common/data/temp/mission.cactivitynew.bin", Handler.create(this, this.onloadedActivityNewComplete), null, Loader.BUFFER);
			//定时活动配置
			Laya.loader.load("common/data/temp/timer.cscheculedactivity.bin", Handler.create(this, this.onloadedCheculedActivityComplete), null, Loader.BUFFER);
			//活动地图对应表
			Laya.loader.load("common/data/temp/mission.cactivitymaplist.bin", Handler.create(this, this.onloadedActivityMapList), null, Loader.BUFFER);
			//精英副本
			Laya.loader.load("common/data/temp/mission.cshiguangzhixueconfig.bin", Handler.create(this, this.onloadedShiGuangZhiXueConfig), null, Loader.BUFFER);
			//精英副本npc
			Laya.loader.load("common/data/temp/instance.cshiguangzhixuenpc.bin", Handler.create(this, this.onloadedJingYingNpc), null, Loader.BUFFER);
		}
		onloadedJingYingNpc(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/instance.cshiguangzhixuenpc.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillMap(data, size, ActivityModel._instance.JingYingNpc, game.data.template.JingyingConfigBaseVo, "mapid");
		}
		onloadedShiGuangZhiXueConfig(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.cshiguangzhixueconfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, ActivityModel._instance.ShiGuangZhiXueBinDic, game.data.template.ShiGuangZhiXueConfigBaseVo, "id");
			data.pos = 0;
			size = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillMap(data, size, ActivityModel._instance.ShiGuangZhiXueByFuBenId, game.data.template.ShiGuangZhiXueConfigBaseVo, "fubenId");
		}
		onloadedActivityMapList(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.cactivitymaplist.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, ActivityModel._instance.ActivityMapListBinDic, game.data.template.ActivityMapListBaseVo, "id");
		}
		onloadedCheculedActivityComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/timer.cscheculedactivity.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillMap(data, size, ActivityModel._instance.CheculedActivityBinDicAtActId, game.data.template.CScheculedActivityBaseVo, "activityid");
		}
		onloadedActivityNewComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.cactivitynew.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillMap(data, size, ActivityModel._instance.ActivityNewBinDicAtType, game.data.template.ActivityNewBaseVo, "type");
			data.pos = 0;
			size = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, ActivityModel._instance.ActivityNewBinDic, game.data.template.ActivityNewBaseVo, "id");
			ActivityModel._instance.setActivityInfo();
		}
		onloadedTuiSongSettingComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/SysConfig.ctuisongsetting.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, ActivityModel._instance.TuiSongSettingBinDic, game.data.template.TuiSongSettingBaseVo, "id");
		}
		onloadedWeekListComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.cweeklist.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, ActivityModel._instance.WeekListBinDic, game.data.template.WeekListBaseVo, "id");
		}
		onloadedActiveGiftBoxComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.cactivegiftbox.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, ActivityModel._instance.ActiveGiftBoxBinDic, game.data.template.ActiveGiftBoxBaseVo, "id");
		}
		/** 添加监听 */
		private addNetworkListener(): void {
			Network._instance.addHanlder(ProtocolsEnum.SRefreshRoleHookExpData, this, this.onRefreshRoleHookExpData);
			Network._instance.addHanlder(ProtocolsEnum.SRefreshActivityListFinishTimes, this, this.onRefreshActivityListFinishTimes);
			Network._instance.addHanlder(ProtocolsEnum.SGetLineState, this, this.onGetLineState);

			Network._instance.addHanlder(ProtocolsEnum.SRefreshActiveQuest, this, this.onRefreshActiveQuest);
			Network._instance.addHanlder(ProtocolsEnum.SNotifyTuiSongList, this, this.onNotifyTuiSong);
			Network._instance.addHanlder(ProtocolsEnum.SGetActivityInfo, this, this.onGetActivityInfo);
			Network._instance.addHanlder(ProtocolsEnum.SPingJi, this, this.onPingJi);
			Network._instance.addHanlder(ProtocolsEnum.SDefineTeam, this, this.onDefineTeam);
		}
		/** 移除监听 */
		private removeNetworkListener(): void {
			Network._instance.removeHanlder(ProtocolsEnum.SRefreshRoleHookExpData, this, this.onRefreshRoleHookExpData);
			Network._instance.removeHanlder(ProtocolsEnum.SRefreshActivityListFinishTimes, this, this.onRefreshActivityListFinishTimes);
			Network._instance.removeHanlder(ProtocolsEnum.SGetLineState, this, this.onGetLineState);

			Network._instance.removeHanlder(ProtocolsEnum.SRefreshActiveQuest, this, this.onRefreshActiveQuest);
			Network._instance.removeHanlder(ProtocolsEnum.SNotifyTuiSongList, this, this.onNotifyTuiSong);
			Network._instance.removeHanlder(ProtocolsEnum.SGetActivityInfo, this, this.onGetActivityInfo);
			Network._instance.removeHanlder(ProtocolsEnum.SPingJi, this, this.onPingJi);
			Network._instance.removeHanlder(ProtocolsEnum.SDefineTeam, this, this.onDefineTeam);
		}
		/** 精英副本队长进度弹窗 */
		private onDefineTeam(optcode: number, msg: hanlder.S2C_SDefineTeam): void {
			this.event(models.DEFINETEAM, [msg.instid, msg.mystep, msg.tlstep]);
		}
		/** 评级 */
		private onPingJi(optcode: number, msg: hanlder.S2C_ping_ji): void {
			modules.activity.models.ActivityModel.getInstance().isOver = true;
			modules.activity.models.ActivityModel.getInstance().grade = msg.grade;
			models.ActivityProxy._instance.event(models.PINGJI_EVENT);
			// game.modules.task.models.TaskProxy.getInstance().event(game.modules.task.models.NEWTASK);
		}
		/** 精英副本完成信息 */
		private onGetLineState(optcode: number, msg: hanlder.s2c_get_line_state): void {
			ActivityModel.getInstance().instances = msg.instances;
			console.log("-----精英副本完成信息:", msg.instances);
			models.ActivityProxy._instance.event(models.JINGYINGFUBEN_EVENT);
		}
		/** 活跃度和任务次数 */
		private onRefreshActivityListFinishTimes(optcode: number, msg: hanlder.s2c_refresh_activity_listfinish_times): void {
			ActivityModel.getInstance().activevalue = msg.activevalue;
			ActivityModel.getInstance().activities = msg.activities;
			ActivityModel.getInstance().chests = msg.chests;
			models.ActivityProxy._instance.event(models.REFRESHACTIVITYLIST_EVENT);
		}
		/** 双倍点数 */
		private onRefreshRoleHookExpData(optcode: number, msg: hanlder.S2C_SRefreshRoleHookExpData): void {
			ActivityModel.getInstance().RoleHookExpData = msg.RoleHookExpData;
			models.ActivityProxy._instance.event(models.ROLEHOOKEXP_EVENT);
		}
		/** 精英副本环节 */
		private onRefreshActiveQuest(optcode: number, msg: hanlder.s2c_SRefreshActiveQuest): void {
			// models.ActivityModel.getInstance().questdata = msg.questdata;
			// if (!game.scene.models.SceneModel.getInstance().newnpclist.get(msg.questdata.dstnpckey)) {
			// 	let npclist: Laya.Dictionary = new Laya.Dictionary()
			// 	let npcinfo: CNPCConfigBaseVo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[msg.questdata.dstnpcid] as CNPCConfigBaseVo;
			// 	let npc: game.scene.models.NpcBasicVo = new game.scene.models.NpcBasicVo();
			// 	npc.npckey = msg.questdata.dstnpckey;
			// 	npc.id = msg.questdata.dstnpcid;
			// 	npc.name = npcinfo.name;
			// 	npc.pos = new Vector2(msg.questdata.dstx, msg.questdata.dsty);
			// 	npclist.set(msg.questdata.dstnpckey, npc);
			// 	game.scene.models.SceneModel.getInstance().npclist.set(msg.questdata.dstnpckey, npc);
			// 	game.scene.models.SceneModel.getInstance().newnpclist = npclist;
			// 	game.scene.models.SceneProxy.getInstance().event(game.scene.models.MODEL_CREATE);
			// }
			// game.modules.task.models.TaskProxy.getInstance().event(game.modules.task.models.NEWTASK);
		}
		private onNotifyTuiSong(optcode: number, msg: hanlder.s2c_notify_tuisong_list): void {
			console.log("activityProxy-s2c_notify_tuisong_list:", msg.notifyList);
		}
		private onGetActivityInfo(optcode: number, msg: hanlder.s2c_get_activity_info): void {
			console.log("activityProxy-s2c_get_activity_info:", msg.activityinfos);
		}
	}
}