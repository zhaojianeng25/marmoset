/** 循环任务状态 */
enum SpecialQuestState {
	/** 已成功，(已提交) */
	SUCCESS = 1,
	/** 已失败 */
	FAIL = 2,
	/** 已完成 */
	DONE = 3,
	/** 未完成 */
	UNDONE = 4,
	/** 已放弃 */
	ABANDONED = 5,
	/** 回收 */
	RECYCLE = 6,
	/** 副本中放弃 */
	INSTANCE_ABANDONED = 7
};

/** 刷新任务的数据字段枚举值 */
enum RefreshDataType {
	/** 任务状态 */
	STATE = 1,
	/** 目的npckey */
	DEST_NPD_KEY = 2,
	/** 目的npcid */
	DEST_NPD_ID = 3,
	/** 目的地图id */
	DEST_MAP_ID = 4,
	/** 目的x坐标 */
	DEST_XPOS = 5,
	/** 目的y坐标 */
	DEST_YPOS = 6,
	/** 目的道具id */
	DEST_ITEM_ID = 7,
	/** 累计次数 */
	SUMNUM = 8,
	/** 目的道具1的数量 */
	DEST_ITEM1_NUM = 9,
	/** 目的道具2id */
	DEST_ITEM2_ID = 10,
	/** 目的道具2的数量 */
	DEST_ITEM2_NUM = 11,
	/** 任务类型 */
	QUEST_TYPE = 12
}

module game.modules.task.models {
	/** 任务model */
	export class TaskModel {
		/**限时任务*/
		public tracktask: Laya.Dictionary;
		/**支线 key 为任务id*/
		public accepttask: Laya.Dictionary;
		/**推荐 key为任务类型id*/
		public schooltask: Laya.Dictionary;
		/**主线 key 为任务id*/
		public maintask: Laya.Dictionary;
		/**可接任务ID*/
		public acceptableTask: Array<number>;
		/**主线加支线*/
		public missionCMainMissionInfoData: Object = {};
		/**循环任务配置表*/
		public cRepeatTaskData: Object = {};
		/**循环总表*/
		public cSchoolTaskData: Object = {};
		/**循环总表通过type赋值*/
		public cSchoolTaskDataByType: Laya.Dictionary = new Laya.Dictionary;
		/**任务表//师门任务*/
		public acceptableTaskData: Object = {}
		/**任务聊天*/
		public cRepeatTaskChatData: Object = {}
		/**所有已接任务ID(暂时只放推荐任务)，通过任务ID去找相关的NPC key为任务id*/
		public renwuid: Laya.Dictionary;
		/**任务结束后对话类型*/
		public chattype: number;
		/**天机仙令探索任务ID*/
		public tjxltansuo: number;
		/**任务完成情况 */
		public taskStateDic: Laya.Dictionary;/**引导 key为引导ID*/
		/** 天机仙令探索任务所要跳转的地图id */
		public tjxlExploreMapId: number;
		/** 刷新的任务数据 */
		public datas = new Laya.Dictionary();
		/** 根据活动任务id作为key来存放刷新的任务数据 */
		public refreshTaskDatas = new Laya.Dictionary();
		/** 用来判断日常副本是否主动放弃 */
		public isAbandon: boolean = false;
		/** 判断是否先接取了循环任务 */
		public isRefreshSpecialQuest: boolean = false;
		constructor() {
			this.tracktask = new Laya.Dictionary();
			this.accepttask = new Laya.Dictionary();
			this.maintask = new Laya.Dictionary();
			this.acceptableTask = [];
			this.schooltask = new Laya.Dictionary();
			this.renwuid = new Laya.Dictionary();
			this.taskStateDic = new Laya.Dictionary();
			TaskModel._instance = this;
		}
		public static _instance: TaskModel;
		public static getInstance(): TaskModel {
			if (!this._instance) {
				this._instance = new TaskModel();
			}
			return this._instance;
		}
		public static clearModelData(): void {
			task.models.TaskModel._instance.tracktask = new Laya.Dictionary();
			task.models.TaskModel._instance.accepttask = new Laya.Dictionary();
			task.models.TaskModel._instance.maintask = new Laya.Dictionary();
			task.models.TaskModel._instance.acceptableTask = [];
			task.models.TaskModel._instance.schooltask = new Laya.Dictionary();
			task.models.TaskModel._instance.renwuid = new Laya.Dictionary();
			task.models.TaskModel._instance.taskStateDic = new Laya.Dictionary();
			task.models.TaskModel._instance.chattype = 0;
			task.models.TaskModel._instance.tjxltansuo = -1;
			task.models.TaskModel._instance.tjxlExploreMapId = 0;
			task.models.TaskModel._instance.datas = new Laya.Dictionary();
			task.models.TaskModel._instance.refreshTaskDatas = new Laya.Dictionary();
			task.models.TaskModel._instance.isAbandon = false;
			task.models.TaskModel._instance.isRefreshSpecialQuest = false;
		}
		/** 获取该副本的单轮最大环数-用于任务刷新判断 */
		public getRound(questid: number): number {
			var schoolTasks: Array<CSchoolTaskBaseVo> = this.cSchoolTaskDataByType.get(questid);
			for (var i: number = 0; i < schoolTasks.length; i++) {
				if (HudModel.getInstance().levelNum >= schoolTasks[i].levelmin && HudModel.getInstance().levelNum <= schoolTasks[i].levelmax) {
					return schoolTasks[i].maxnum;
				}
			}
		}
	}
}