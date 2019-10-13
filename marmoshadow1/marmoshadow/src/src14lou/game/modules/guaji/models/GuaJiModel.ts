/**
 * 是否自动战斗
 */
enum IsAutoFight{
	/** 否 */
	NO = 0,
	/** 是 */
	YES = 1
};
/**
 * 是否选中智能设置中选项
 */
enum isSelect{
	/** 否 */
	NO = 0,
	/** 是 */
	YES = 1
};
/**
 * 挂机设置操作类型
 */
enum GuaJiOpeType{
	/** 普通攻击 */
	ATTACK = 1,
	/** 施放技能 */
	FIRESKILL = 2,
	/** 防御 */
	DEFENSE = 4
};


module game.modules.guaji.models{
	/** 挂机系统的model */    
	export class GuaJiModel{
		/** 练功区怪物表（挂机区域怪物表） */
		public monstersDic:Object = {};
		/** 挂机设置配置表 */
		public roleFightAIDic:Object = {};
		/** 死亡提醒表 */
		public deatNote:{[key:number]:CDeathNoteBaseVo} = {}
        // /** 判断是否自动战斗的选择指向 */
        // public flag:boolean = true;
		/** 挂机辅助AI数据 */
		public autoFightData:Array<number>;
		/** 服务器刷新挂机战斗相关数据 */
		public hookBattleData:game.modules.guaji.models.HookBattleDataVo;

		/** 挂机系统宠物技能选择窗口是否改变过 */
		public isChangeFlag:boolean = false;
		/** 自动辅助挂机 */
		public fuzhuGuaji:boolean = false;

        constructor(){
			GuaJiModel._instance = this;
		}
        public static _instance:GuaJiModel;
		public static getInstance():GuaJiModel {
			if(!this._instance) {
				this._instance = new GuaJiModel();
			}
			return this._instance;
		}
		public static clearModelData(): void {
			guaji.models.GuaJiModel._instance.autoFightData = [];
			guaji.models.GuaJiModel._instance.hookBattleData = new models.HookBattleDataVo();
			guaji.models.GuaJiModel._instance.isChangeFlag = false;
			guaji.models.GuaJiModel._instance.fuzhuGuaji = false;
		}
    }
}