/** 成就前往逻辑 */
enum  AchieventGoLogic
{
 /** 打开界面 */
 OPEN_INTERFACE = 1,
 /** 找NPC */
 FIND_NPC = 2,
 /** 继续主线任务（根据主线不同变化） */
 CONTAIN_MAIN_TASK = 3,
 /** 找师傅NPC（不同职业不同NPC） */
 FIND_NPC_MASTER = 4,
 /** 帮会。判断是否加入帮会？  是，打开帮会聊天频道  否，打开申请帮会界面*/
 FAMILY_EVENT = 5,
 /** 领取任务 */
 GET_REWARD = 6,
}
module game.modules.achievent.models{

	export class AchieventModel
	{
		public userLoginAccount:string;
		/** 成就指引等级标签 */
		public guideCourseLabelDic:Object = {};
		public guideCourseDic:Object = {};
		public AchieventInfo:Array<AchieventInfoVo>=[];
		/** 师傅职业Npc配置表 */
		public MasterNpcDic:Object = {};
		/**成就map */
		public achieventDic:Laya.Dictionary = new Laya.Dictionary();
		constructor()
		{
			AchieventModel._instance = this;
		}
		public static _instance:AchieventModel;
		public static getInstance():AchieventModel 
		{
			if(!this._instance)
			 {
				this._instance = new AchieventModel();
			}
			return this._instance;
		}
		public static clearModelData(): void {
			achievent.models.AchieventModel._instance.userLoginAccount = "";
			achievent.models.AchieventModel._instance.AchieventInfo = [];
			achievent.models.AchieventModel._instance.achieventDic = new Laya.Dictionary();			
		}
	}
}