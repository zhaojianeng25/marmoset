
module game.modules.xianhui.models {
	export class XianHuiModel {
		/** 3v3证道战信息 */
		public PvP3MyInfo: models.PvP3MyInfoVo;
		/** 3v3证道战战况 */
		public PvP3BattleInfos: Laya.Dictionary = new Laya.Dictionary;
		/** 3v3证道战排行 */
		public PvP3Ranking: Laya.Dictionary = new Laya.Dictionary;
		public history: number;
		/** 判断点击服务是否是3v3或5v5 */
		public _serviceid: number;
		
		/** 5v5证道战信息 */
		public PvP5MyInfo: models.PvP5MyInfoVo;
		/** 3v3证道战战况 */
		public PvP5BattleInfos: Laya.Dictionary = new Laya.Dictionary;
		/** 5v5证道战排行 */
		public roleScores1: Array<game.modules.xianhui.models.PvP5RoleSingleScoreVo> = [];
		public roleScores2: Array<game.modules.xianhui.models.PvP5RoleSingleScoreVo> = [];
		public myScore: game.modules.xianhui.models.PvP5RoleSingleScoreMidVo;
		
		constructor() {
			XianHuiModel._instance = this;
		}
		public static _instance: XianHuiModel;
		public static getInstance(): XianHuiModel {
			if (!this._instance) {
				this._instance = new XianHuiModel();
			}
			return this._instance;
		}
		public static clearModelData(): void {
			xianhui.models.XianHuiModel._instance.PvP3MyInfo = null;
			xianhui.models.XianHuiModel._instance.PvP3BattleInfos = new Laya.Dictionary;
			xianhui.models.XianHuiModel._instance.PvP3Ranking = new Laya.Dictionary;
			xianhui.models.XianHuiModel._instance.history = 0;
			xianhui.models.XianHuiModel._instance._serviceid = 0;

			xianhui.models.XianHuiModel._instance.PvP5MyInfo = null;
			xianhui.models.XianHuiModel._instance.PvP5BattleInfos = new Laya.Dictionary;
			xianhui.models.XianHuiModel._instance.roleScores1 = [];
			xianhui.models.XianHuiModel._instance.roleScores2 = [];
			xianhui.models.XianHuiModel._instance.myScore = null;
		}

	}
}