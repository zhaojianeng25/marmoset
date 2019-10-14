/**
* 制作进度 
*/
module game.modules.commonUI {
	export class MakeProgressMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.component.MakeProgressUI
		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.component.MakeProgressUI();
			this._viewUI.mouseThrough = true;
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;

		}
		/**初始化*/
		public init(itemid?: number, text?: string): void {
			this.show();
			this._viewUI.makepro_progress.value = 0;
			if (itemid) {//是否有该高举
				let iteminfo: TaskRelativeBaseVo = game.modules.bag.models.BagModel.getInstance().taskRelativeData[itemid]
				this._viewUI.make_lab.text = iteminfo.readtext
			}
			else {
				this._viewUI.make_lab.text = text
			}
			game.modules.task.models.TaskProxy.getInstance().once(game.modules.task.models.INTERRUPT, this, this.suspend);
			this._app.sceneRoot.istask = 2;
			Laya.timer.loop(100, this, this.changeValue);
		}
		/**制作进度*/
		private changeValue(): void {
			if (this._viewUI.makepro_progress.value >= 1) {
				Laya.timer.clear(this, this.changeValue);
				game.modules.task.models.TaskProxy.getInstance().event(game.modules.task.models.MAKESUCCESS, [1]);
				this.hide();
			}
			this._viewUI.makepro_progress.value += 0.05;
		}
		/**打断制作*/
		private suspend(): void {
			Laya.timer.clear(this, this.changeValue);
			this._viewUI.make_lab.text = "打断"
			Laya.timer.loop(100, this, this.transparent)
		}
		/**打断后透明*/
		private transparent(): void {//打断后边透明
			if (this._viewUI.alpha <= 0) {//透明度
				Laya.timer.clear(this, this.transparent);
				game.modules.task.models.TaskProxy.getInstance().event(game.modules.task.models.MAKESUCCESS, [0]);
				this.hide()
			}
			this._viewUI.alpha -= 0.1;
		}
		public show() {
			super.show();
		}
		public hide(): void {
			super.hide();
		}
		public getView(): Sprite {
			return this._viewUI;
		}
	}
}