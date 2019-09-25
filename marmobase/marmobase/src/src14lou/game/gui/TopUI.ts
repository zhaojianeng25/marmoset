/**
* 顶层ui
*/
module game.gui {
	export class TopUI extends game.gui.base.PageContainer {

		constructor(app: AppBase) {
			super(app);
		}

		//显示等待
		public showLoading(): void {
			if (!this.getPage(PageDef.LOAD)) {
				this.open(PageDef.LOAD);
			}
		}

		//关闭等待
		public closeLoading(): void {
			if (this.getPage(PageDef.LOAD)) {
				this.close(PageDef.LOAD);
			}
		}
	}
}