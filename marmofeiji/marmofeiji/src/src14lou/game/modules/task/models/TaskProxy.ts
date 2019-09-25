
module game.modules.task.models {
	/**使用道具*/
	export const USEITEM: string = "useitem";
	/**打断*/
	export const INTERRUPT: string = "interrupt"
	/**制作成功*/
	export const MAKESUCCESS: string = "makesucess"
	/**宠物或者道具提交*/
	export const ITEMORPETSUBMIT: string = "itemorpetsubmit"
	/**任务刷新*/
	export const TAKSREFRESH: string = "taskrefresh"
	/**新的任务*/
	export const NEWTASK: string = "newtask"
	/**领取多倍点数*/
	export const GETDPOINT: string = "getDPoint";
	/** 接受下一轮日常副本任务 */
	export const ACCEPTNEXTROUNDTASK: string = "acceptNextRoundTask";
	/**选择宠物*/
	export const SELECTPET: string = "selectpet";
	/** 接受下一轮门派任务 */
	export const ACCEPTNEXTROUND_SCHOOLTASK: string = "acceptNextRound_schoolTask";

	/** 任务相关的协议 */
	export class TaskProxy extends hanlder.ProxyBase {
		constructor() {
			super();
			TaskProxy._instance = this;
			this.init();
		}
		public init(): void {
			this.addNetworkListener();
			Laya.loader.load("common/data/temp/mission.cmainmissioninfo.bin", Handler.create(this, this.onloadedMissionCMainMissionInfoComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/circletask.crepeattask.bin", Handler.create(this, this.onloadedCRepeatTaskComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/circletask.cschooltask.bin", Handler.create(this, this.onloadedCSchoolTaskComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/mission.cacceptabletask.bin", Handler.create(this, this.onloadedAcceptableTaskComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/circletask.crepeattaskchat.bin", Handler.create(this, this.onloadedCRepeatTaskChatComplete), null, Loader.BUFFER);
		}
		private addNetworkListener() {
			/**活动任务列表*/
			Network._instance.addHanlder(ProtocolsEnum.SSendActiveQuestList, this, this.onLoadTask);
			/**加载主线*/
			Network._instance.addHanlder(ProtocolsEnum.STrackedMissions, this, this.onMainOrGuideTask);
			/**加载师门任务*/
			Network._instance.addHanlder(ProtocolsEnum.SRefreshSpecialQuest, this, this.onSchoolTask);
			/**获取循环任务*/
			Network._instance.addHanlder(ProtocolsEnum.SRefreshSpecialQuestState, this, this.onRefreshSchoolTask);
			/**获得可接受任务id*/
			Network._instance.addHanlder(ProtocolsEnum.SReqMissionCanAccept, this, this.onAcceptableTask);
			/**获取已接受任务*/
			Network._instance.addHanlder(ProtocolsEnum.SAcceptMission, this, this.onAcceptMission);
			/**刷新任务状态*/
			Network._instance.addHanlder(ProtocolsEnum.SRefreshMissionState, this, this.onRefreshMissionstate);
			/**刷新任务信息*/
			Network._instance.addHanlder(ProtocolsEnum.SRefreshMissionValue, this, this.onRefreshMissValue);
			/**npc服务*/
			Network._instance.addHanlder(ProtocolsEnum.SSendNpcService, this, this.onNpcSerivceInfo)
			/**刷新上交后NPC位置*/
			Network._instance.addHanlder(ProtocolsEnum.SSubmit2Npc, this, this.onSubMit2Npc);
			//刷新任务数据下发返回
			Network._instance.addHanlder(ProtocolsEnum.SRefreshQuestData, this, this.onRefreshTaskDatas);
		}
		/**x循环任务/x循环任务对话配置 */
		onloadedCRepeatTaskChatComplete(): void {
			console.log("CRepeatTaskChat表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/circletask.crepeattaskchat.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, TaskModel.getInstance().cRepeatTaskChatData, CRepeatTaskChatBaseVo, "id");
		}
		/**r任务相关/k可接任务信息*/
		onloadedAcceptableTaskComplete(): void {
			console.log("AcceptableTaskData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.cacceptabletask.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, TaskModel.getInstance().acceptableTaskData, AcceptableTaskBaseVo, "id");
		}
		/**x循环任务/x循环任务总表 */
		onloadedCSchoolTaskComplete(): void {
			console.log("CSchoolTask表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/circletask.cschooltask.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, TaskModel.getInstance().cSchoolTaskData, CSchoolTaskBaseVo, "id");
			data.pos = 0;
			size = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillMap(data, size, TaskModel.getInstance().cSchoolTaskDataByType, CSchoolTaskBaseVo, "type");
		}
		/**x循环任务/x循环任务配置表 */
		onloadedCRepeatTaskComplete(): void {
			console.log("CRepeatTask表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/circletask.crepeattask.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, TaskModel.getInstance().cRepeatTaskData, CRepeatTaskBaseVo, "id");
		}
		/**r任务相关/z主任务配置 */
		onloadedMissionCMainMissionInfoComplete(): void {
			console.log("MissionCMainMissionInfo表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.cmainmissioninfo.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, TaskModel.getInstance().missionCMainMissionInfoData, MissionCMainMissionInfoBaseVo, "id");
		}
		//上交物品
		private onSubMit2Npc(optcode: number, msg: hanlder.s2c_submit_2npc): void {
			this.event(ITEMORPETSUBMIT, [msg.questid, msg.npckey, msg.submittype, msg.availableIds, msg.availablePos]);
		}
		/** 获取刷新的任务数据 */
		private onRefreshTaskDatas(optcode: number, msg: hanlder.s2c_SRefreshQuestData): void {
			if (models.TaskModel.getInstance().datas != msg.datas) {
				var _keys = msg.datas.keys;
				for (let i = 0; i < _keys.length; i++) {
					models.TaskModel.getInstance().datas.set(_keys[i], msg.datas.get(_keys[i]));
				}
			}
			var tempdatas = models.TaskModel.getInstance().datas;
			models.TaskModel.getInstance().refreshTaskDatas.set(msg.questid, tempdatas);
			if (msg.questid == 1030000 && msg.datas.get(RefreshDataType.DEST_ITEM1_NUM)) {//日常副本任务
				var _isAbandon = game.modules.task.models.TaskModel.getInstance().isAbandon;
				if (_isAbandon) {//如果是主动放弃日常副本任务，则不跳出是否接受下一轮的日常副本任务的客户端确认弹窗
					game.modules.task.models.TaskModel.getInstance().isAbandon = false;
				}
				if (msg.datas.get(RefreshDataType.DEST_ITEM1_NUM) == 1) {
					let _schooltask: models.SRefreshSpecialQuestVo = game.modules.task.models.TaskModel.getInstance().schooltask.get(msg.questid);
					if (_schooltask && _schooltask.sumnum >= 9 && _schooltask.sumnum < 12) {
						//是否接收下一轮日常副本弹窗
						this.event(ACCEPTNEXTROUNDTASK, msg.questid);
					}
					let info: game.modules.task.models.SRefreshSpecialQuestVo = game.modules.task.models.TaskModel.getInstance().schooltask.get(msg.questid);
					game.modules.task.models.TaskModel.getInstance().schooltask.remove(msg.questid);
					game.modules.task.models.TaskModel.getInstance().renwuid.remove(info.dstnpcid);
					//通知移除任务栏日常副本信息
					this.event(TAKSREFRESH);
				}
			}
		}
		private onRefreshMissValue(optcode: number, msg: hanlder.s2c_refresh_mission_value): void {
			if ((msg.missionid > 500000 && msg.missionid < 600000)) {
				let task: game.modules.task.models.MissionInfoVo = TaskModel.getInstance().accepttask.get(msg.missionid);
				if (task) {
					task.missionround = msg.missionidround
					task.missionvalue = msg.missionidvalue
					TaskModel.getInstance().accepttask.set(msg.missionid, task)
				}
			}
			else if (msg.missionid > 180000 && msg.missionid < 190000) {
				let task: game.modules.task.models.MissionInfoVo = TaskModel.getInstance().maintask.get(msg.missionid);
				if (task) {
					task.missionround = msg.missionidround
					task.missionvalue = msg.missionidvalue
					TaskModel.getInstance().maintask.set(msg.missionid, task)
				}
			}
			else {
				let task: game.modules.task.models.SRefreshSpecialQuestVo = TaskModel.getInstance().schooltask.get(msg.missionid);
				task.round = msg.missionidround
				task.sumnum = msg.missionidvalue
				TaskModel.getInstance().accepttask.set(msg.missionid, task)
			}
			this.event(TAKSREFRESH)
		}
		private onRefreshMissionstate(optcode: number, msg: hanlder.s2c_refresh_mission_state): void {//刷新任务完成状态
			if ((msg.missionid > 500000 && msg.missionid < 600000)) {
				if (msg.missionstatus == 1) {
					TaskModel.getInstance().taskStateDic.set(msg.missionid, msg.missionstatus);
					TaskModel.getInstance().accepttask.remove(msg.missionid)
				}
				else {
					let task: game.modules.task.models.MissionInfoVo = TaskModel.getInstance().accepttask.get(msg.missionid);
					task.missionstatus = msg.missionstatus
					TaskModel.getInstance().accepttask.set(msg.missionid, task)
				}
			}
			else if (msg.missionid > 180000 && msg.missionid < 190000) {//主线任务
				if (msg.missionstatus == 1) {
					TaskModel.getInstance().maintask.remove(msg.missionid)
				}
				else {
					let task: game.modules.task.models.MissionInfoVo = TaskModel.getInstance().maintask.get(msg.missionid);
					if (task) {
						task.missionstatus = msg.missionstatus
						TaskModel.getInstance().maintask.set(msg.missionid, task)
					}
				}
			}
			this.event(TAKSREFRESH)
		}
		private onAcceptMission(optcode: number, msg: hanlder.s2c_accept_mission): void {//已接受的任务	
			if (msg.missioninfo.missionid >= 500301 && msg.missioninfo.missionid <= 500306) {
				return;
			}
			if (msg.missioninfo.missionid > 180000 && msg.missioninfo.missionid < 190000) {// 主线任务
				TaskModel.getInstance().maintask.set(msg.missioninfo.missionid, msg.missioninfo);
			}
			else if ((msg.missioninfo.missionid > 500000 && msg.missioninfo.missionid < 600000)) {//支线
				TaskModel.getInstance().accepttask.set(msg.missioninfo.missionid, msg.missioninfo);
				// 取出所有，再进行排序
				var alltaskinfo: Array<game.modules.task.models.MissionInfoVo> = []
				for (let key in TaskModel.getInstance().accepttask.keys) {
					alltaskinfo.push(TaskModel.getInstance().accepttask.get(TaskModel.getInstance().accepttask.keys[key]));
				}
				for (var index = 0; index < alltaskinfo.length - 1; index++) {
					for (var num = index + 1; num < alltaskinfo.length; num++) {
						if (alltaskinfo[index].missionid > alltaskinfo[num].missionid) {//前一个任务是否大于后一个任务id
							let missioninfo: game.modules.task.models.MissionInfoVo = alltaskinfo[num]
							alltaskinfo[num] = alltaskinfo[index]
							alltaskinfo[index] = missioninfo
						}
					}
				}
				for (var index = 0; index < alltaskinfo.length; index++) {
					TaskModel.getInstance().accepttask.set(alltaskinfo[index].missionid, alltaskinfo[index]);
				}
			}
			this.event(TAKSREFRESH)
		}
		private onLoadTask(optcode: number, msg: hanlder.s2c_SSendActiveQuestList): void {
			console.log("暂未使用");
		}
		private onMainOrGuideTask(optcode: number, msg: hanlder.s2c_tracked_missions): void {
			for (let k in msg.trackedmissions.keys) {
				TaskModel.getInstance().tracktask.set(msg.trackedmissions.keys[k], msg.trackedmissions.get(msg.trackedmissions.keys[k]));
			}
		}
		private onSchoolTask(optcode: number, msg: hanlder.s2c_SRefreshSpecialQuest): void {
			if (msg.menpaitaks.questtype != 0) {//任务类型不为0
				models.TaskModel.getInstance().isRefreshSpecialQuest = true;
				game.modules.task.models.TaskModel.getInstance().schooltask.set(msg.menpaitaks.questid, msg.menpaitaks);
				// game.modules.task.models.TaskModel.getInstance().renwuid.set(msg.menpaitaks.dstnpcid, msg.menpaitaks.questtype)
				game.modules.task.models.TaskModel.getInstance().renwuid.set(msg.menpaitaks.dstnpcid, msg.menpaitaks);
				this.event(NEWTASK)
				if (msg.menpaitaks.questid == 1030000) {//如果接取的任务类型是日常活动副本
					/** 已领取的多倍点数 */
					var _getdpoint = activity.models.ActivityModel.getInstance().RoleHookExpData.getdpoint;
					/** 可领取的多倍点数 */
					var _canGetDPoint = activity.models.ActivityModel.getInstance().RoleHookExpData.cangetdpoint;
					if (_canGetDPoint > 0 && _getdpoint == 0) {//并且有多倍点数，还处于未领取多倍点数的状态
						this.event(GETDPOINT);
					}
				}
			}
		}
		private onRefreshSchoolTask(optcode: number, msg: hanlder.s2c_SRefreshSpecialQuestState): void {
			if (msg.questid >= 3010010 && msg.questid <= 3010035 && msg.questid % 5 == 0) {
				this.event(TAKSREFRESH, [false, true]);
			}
			let info: game.modules.task.models.SRefreshSpecialQuestVo = game.modules.task.models.TaskModel.getInstance().schooltask.get(msg.questid);
			let isRemoveFlag: boolean = true;
			if (info) {
				if (msg.state == SpecialQuestState.SUCCESS || msg.state == SpecialQuestState.ABANDONED || msg.state == SpecialQuestState.INSTANCE_ABANDONED) {//完成或者放弃
					if (msg.state == SpecialQuestState.ABANDONED) {//放弃
						models.TaskModel.getInstance().isAbandon = true;
					}
					let _schooltask: models.SRefreshSpecialQuestVo = game.modules.task.models.TaskModel.getInstance().schooltask.get(msg.questid);
					if (msg.questid == 1030000 && msg.state == SpecialQuestState.SUCCESS) {//如果是循环任务中门派任务
						isRemoveFlag = false;
					}
					if (msg.questid == 1010000 && msg.state == SpecialQuestState.SUCCESS) {//如果是循环任务中门派任务
						if (_schooltask.round != 10) {//如果任务环数不等于10
							isRemoveFlag = false;//不进行移除门派一系列任务的操作
						}
						else {
							this.event(models.ACCEPTNEXTROUND_SCHOOLTASK, msg.questid);
						}
					}
					if (isRemoveFlag) {
						game.modules.task.models.TaskModel.getInstance().schooltask.remove(msg.questid);
						game.modules.task.models.TaskModel.getInstance().renwuid.remove(info.dstnpcid);
					}
				}
				else {
					info.queststate = msg.state
					game.modules.task.models.TaskModel.getInstance().schooltask.set(info.questid, info);
					game.modules.task.models.TaskModel.getInstance().renwuid.set(info.dstnpcid, info)
				}
				this.event(TAKSREFRESH)
			}
		}
		private onAcceptableTask(optcode: number, msg: hanlder.s2c_req_mission_can_accept): void {
			game.modules.task.models.TaskModel.getInstance().acceptableTask = msg.missions;
			// for (let i = 0; i < msg.missions.length; i++) {
			// 	if (msg.missions[i] == 1030000) {//日常副本任务
			// 		var _isAbandon = game.modules.task.models.TaskModel.getInstance().isAbandon;
			// 		if (_isAbandon) {//如果是主动放弃日常副本任务，则不跳出是否接受下一轮的日常副本任务的客户端确认弹窗
			// 			game.modules.task.models.TaskModel.getInstance().isAbandon = false;
			// 			break;
			// 		}
			// 		var _refreshTaskDatas = game.modules.task.models.TaskModel.getInstance().refreshTaskDatas;
			// 		var _keys = _refreshTaskDatas.keys;
			// 		if (_keys.length == 0) {
			// 			break;
			// 		}
			// 		if (_refreshTaskDatas.get(msg.missions[i]).get(RefreshDataType.DEST_ITEM1_NUM) == 1) {
			// 			game.modules.task.models.TaskModel.getInstance().schooltask.remove(msg.missions[i]);
			// 			this.event(TAKSREFRESH);
			// 		} else {
			// 			this.event(ACCEPTNEXTROUNDTASK, msg.missions[i]);
			// 		}
			// 		break;
			// 	}
			// }
		}
		private onNpcSerivceInfo(optcode: number, msg: hanlder.S2C_send_npcservice): void {
			console.log(msg.npckey, msg.service, msg.title)
		}
		private static _instance: TaskProxy;
		public static getInstance(): TaskProxy {
			if (!this._instance) {
				this._instance = new TaskProxy();
			}
			return this._instance;
		}
	}
}