/**
* 顶层下面的ui
*/
module game.gui {
	export class TopunderUI extends game.gui.base.PageContainer {
		//飘字队列
		private _tipQueue: string[];

		constructor(app: AppBase) {
			super(app);
			this._tipQueue = [];
		}

		public checkQueue(): void {
			if (this._tipQueue.length != 0) {
				let message = this._tipQueue.shift();
				let page = this.getPage(PageDef.TIPS) as game.gui.page.Tips;
				if (page) {
					page.setText(message);
				} else
					this.open(PageDef.TIPS, (page: game.gui.page.Tips) => {
						page.setText(message);
					}, null, null, true);
			}
		}

		//显示提示
		public showTips(value: string): void {
			if (!value || value.length <= 0) return;
			if (this._tipQueue)
				this._tipQueue.push(value);
		}

		//加载条置顶
		public setLoadingTop(): void {
			//判断下是否有加载条
			let haveLoading: boolean = this.getPage(PageDef.LOADING) ? true : false;
			//把加载条置顶
			if (haveLoading) {
				this.open(PageDef.LOADING);
			}
		}

		public resize(w: number, h: number): void {
			super.resize(w, h);
			//重置一下广播的位置
			let broadcast = this.getChildByName("broadcast") as Box;
			if (broadcast)
				broadcast.centerX = 0;
		}
	}
}