/**
* 场景 
*/
enum DataType {
	/**展示宠物*/
	SHOW_PET = 1,
	/**组队信息*/
	TEAM_INFO = 2,
	/**称谓id*/
	TITLE_ID = 3,
	/**称谓名字*/
	TITLE_NAME = 4,
	/**招牌名称 */
	STALL_NAME = 5,
	/**人物造型模板 */
	MODEL_TEMPLATE = 6,
	/**头饰造型 */
	HEADRESS_SHAPE = 7,
	/**地图状态 */
	SCENE_STATE = 8,
	/**当前装备武器的baseID int 没装备则为0 */
	WEAPON_BASEID = 9,
	/**当前装备武器的颜色 byte 1为白色，2为绿色。。。6为暗金色 */
	WEAPON_COLOR = 10,
	/**角色变造型时的造型 */
	ROLE_ACTUALLY_SHAPE = 12,
	/**角色正在做的持续性动作 */
	PLAYING_ACTION = 13,
	/**摊位招牌id */
	STALL_BOARD = 14,
	/**logo id */
	FOOT_LOGO_ID = 15,
	/**觉醒状态 */
	AWAKE_STATE = 16,
	/**跟随npc */
	FOLLOW_NPC = 17,
	/**巡游id int,0为没有巡游，非0为巡游表的id */
	CRUISE = 18,
	/**装备特效 */
	EFFECT_EQUIP = 19,
	/**巡游id2 int,路线id */
	CRUISE2 = 20,
	/**巡游id3 int,路线id */
	CRUISE3 = 21
}
module game.scene.models {
	export class SceneModel {
		public fighterList: Array<game.scene.models.FighterInfoVo>;
		public fighterList0: Array<game.scene.models.FighterInfoVo>;//我方
		public fighterList1: Array<game.scene.models.FighterInfoVo>;//敌方
		/**总的人物列表 key为roleid*/
		public rolelist: Laya.Dictionary;
		/**总的NPC列表 key为npckey*/
		public npclist: Laya.Dictionary;
		/**新进地图的人物列表key为roleid*/
		public newnpclist: Laya.Dictionary;
		/**新进地图的NPC列表key为npckey*/
		public newrolelist: Laya.Dictionary;
		/**小地图NPC key为npckey*/
		public smallallnpc: Laya.Dictionary;
		/**NPCkey*/
		public npckey: number;
		/**NPC服务ID*/
		public npcservices: Array<number>;
		/**剧情任务ID*/
		public scenarioquests: Array<number>;
		/** 包含傀儡的职业 */
		public kuileiOccupation:Array<number> = [zhiye.tianlei,zhiye.xuanming];
		/** 场景角色状态 */
		public roleStateInScene:Laya.Dictionary = new Laya.Dictionary();
		constructor() {
			SceneModel._instance = this;
			this.rolelist = new Laya.Dictionary();
			this.npclist = new Laya.Dictionary();
			this.newrolelist = new Laya.Dictionary();
			this.newnpclist = new Laya.Dictionary();
			this.smallallnpc = new Laya.Dictionary();
		}
		public static clearModelData(): void {
           SceneModel.getInstance().roleStateInScene.clear();
        }
		private static _instance: SceneModel;
		public static getInstance(): SceneModel {
			if (!this._instance) {
				this._instance = new SceneModel();
			}
			return this._instance;
		}
	}
}