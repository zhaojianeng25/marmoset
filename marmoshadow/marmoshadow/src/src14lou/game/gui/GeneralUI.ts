/**
* 一般ui 
*/
module game.gui {
	export class GeneralUI extends game.gui.base.PageContainer {
		private _blackSprite: Sprite;

		constructor(app: AppBase) {
			super(app);
		}

		//显示提示
		public showTip(mess: string): void {
			// this.open(PageDef.ALERT_TIP, (page: AlertTip) => {
			// 	page.setInfo(mess);
			// });
		}
	}
}