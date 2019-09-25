/**
* name 
*/
module game.gui.page {

	/**
	* 加载界面 
	*/
	export class Loading extends game.gui.base.Page {
		
		private _add: number = 0;
		private _max: number = -1;
		private _skin:string;

		constructor(app: AppBase, onOpenFunc?: Function, onCloseFunc?: Function) {
			super(app, onOpenFunc, onCloseFunc);
			this._skin = Path.ui + 'load/loading' + Math.floor(Math.random()*3)+'.jpg';
			// this._skin = Path.ui + "load/Feige.png";
			this._asset = [
				this._skin,
				Path.atlas_ui + "load.atlas"
			];
		}


		// 页面初始化函数
		protected init(): void {
			this._view = new ui.common.Loading_UI();
			if (this._view instanceof ui.common.Loading_UI) {
				this._view.label_txt.text = '';
				this._view.progress_1.value = 0;
				let box_TipsVisible = true;
				this._view.box_Tips.visible = box_TipsVisible;

			}
			this.addChild(this._view);
			this.resize(this._clientWidth, this._clientHeight);

		}

		protected onOpen(): void {
			super.onOpen();
			if (this._view instanceof ui.common.Loading_UI) {
				
				if (this._view.image_Bg.skin != this._skin) {
					this._view.image_Bg.skin = this._skin;
				}
				if(this._view.txtAge){
					this._view.txtAge.text = ""
				}
			}
			Laya.timer.loop(50, this, this.update);
		
		}

		setProgress(str: string, value: number = -1, add: number = 0, max: number = -1): void {
			if (this._view instanceof ui.common.Loading_UI) {
				this._view.label_txt.text = str;
				this._view.label_txt.autoSize = true;
				this._view.progress_1.value = value;
				this._add = add;
				this._max = max;
			}
		}

		// 重新布局
		protected layout(): void {
			super.layout();
			if (!this._view) {
				return;
			}
			this.graphics.clear();
			this.graphics.drawRect(0, 0, this._clientWidth, this._clientHeight, "#000");
			this.drawWhite();
		}

		private drawWhite(): void {
			if (this._view && this._view.image_Bg) {
				let image: LImage = this._view.image_Bg as LImage;
				if (!image.height) {
					image.timerOnce(1, this, () => {
						this.drawWhite();
					})
					return;
				}
				let height = image.height + 2;
				let top = (this._clientHeight - height) / 2;
				this.graphics.drawRect(0, top, this._clientWidth, height, "#000000");
			}
		}

		private update(): void {
			if (this._add > 0 && this._view instanceof ui.common.Loading_UI) {
				if (this._max != -1 && this._view.progress_1.value >= this._max) {
					this._view.progress_1.value = 0;
					return;
				}
				this._view.progress_1.value += this._add;
			}
		}

		// 页面关闭
		close(): void {
			Laya.timer.clear(this, this.update);
			
			super.close();
		}

		createdLoadEffect(): void {
			// 不需要加载特效
		}
	}
}