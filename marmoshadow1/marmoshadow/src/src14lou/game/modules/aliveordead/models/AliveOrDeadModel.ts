/** 下战书所选择的类型 */
enum LiveDeadSelectType{
    /** 单人 */
    OnePerson = 0,
    /** 组队 */
    MultiplePerson = 1
}

/** 生死决斗榜类型 */
enum LDmodelType{
    /** 本日生死战排行 */
    DAY_FIGHT = 1,
    /** 本周生死战排行 */
    WEEK_FIGHT = 2,
    /** 历史生死战排行 */
    HIS_FIGHT = 3,
    /** 自己 */
    SELF_FIGHT = 4
}

/** 生死斗的结果 */
enum LDBattleResult {
    /** 胜利 */
    victory = 1,
    /** 失败 */
    failure = -1,
    /** 平局 */
    draw = 0
}

/** 是否可以点赞 */
enum RoseFlag {
    /** 可以 */
    can = 0,
    /** 不可以 */
    no = 1
}

/** 是否接受生死战 */
enum isAccept {
    /** 拒绝 */
    refuse = 0,
    /** 确认接受 */
    confirm = 1
}

module game.modules.aliveordead.models{
    /** 战仙会（生死战）数据存放 model */
    export class AliveOrDeadModel{
        /** 生死榜列表数据 */
        public  _rolefightlist: Array<LDVideoRoleInfoDesVo>;

        constructor() {
			AliveOrDeadModel._instance = this;
		}
		public static _instance: AliveOrDeadModel;
		public static getInstance(): AliveOrDeadModel {
			if (!this._instance) {
				this._instance = new AliveOrDeadModel();
			}
			return this._instance;
		}
    }
}