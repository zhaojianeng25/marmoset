/**
* 页面定义
*/
module game.gui.page {
	interface ClassMap {
		[index: string]: Object;
	}

	export class PageDef {
		// 加载界面
		static LOADING: number = 0;
		// 等待数据界面
		static LOAD: number = 1;
		/** 飘字提示 */
		public static TIPS: number = 2;
		/**hud主界面*/
		public static HUD_MAIN_PAGE:number = 3;
		/**HUD战斗界面*/
		public static HUD_FIGHT_PAGE:number = 4;
		/**战斗胜利 */
		public static BATTLE_WIN_PAGE: number = 5;
		/**战斗失败 */
		public static BATTLE_FAIL_PAGE: number = 6;
		/**提示弹框界面 */
		public static PROMPT_PAGE: number = 7;

		/**战场位置计算界面 */
		public static SCENE_BATTLE_PAGE: number = 999;


		/**创建角色 */
		public static CREATE_ROLE:string = "CreaterRole"//创建角色
		public static PET:number = 11;


		//页面集合
		private static _pageClassMap: ClassMap = {};

		public static init(): void {
			PageDef._pageClassMap[PageDef.LOADING] = Loading;
			PageDef._pageClassMap[PageDef.LOAD] = Load;
			// PageDef._pageClassMap[PageDef.TIPS] = Tips;
			PageDef._pageClassMap[PageDef.HUD_MAIN_PAGE] = HudMainPage;
			PageDef._pageClassMap[PageDef.HUD_FIGHT_PAGE] = battle.BattlePage;
			// PageDef._pageClassMap[PageDef.BATTLE_WIN_PAGE] = BattleWinPage;
			// PageDef._pageClassMap[PageDef.BATTLE_FAIL_PAGE] = BattleFailPage;
			// PageDef._pageClassMap[PageDef.PROMPT_PAGE] = PromptPage;

			// PageDef._pageClassMap[PageDef.SCENE_BATTLE_PAGE] = SceneBattlePage;
			PageDef._pageClassMap[PageDef.PET] = TongYongAnNiu;

			//PageDef._pageClassMap[PageDef.PROMPT_PAGE] = game.modules.createrole;


		}

		public static getPageClass(key: number): Object {
			return PageDef._pageClassMap[key];
		}
	}
}
