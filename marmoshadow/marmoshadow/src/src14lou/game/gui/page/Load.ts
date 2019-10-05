module game.gui.page {
    /**
     * 等待数据界面,带进度条的
     */
	export class Load extends game.gui.base.Page {
		private _loadImg: LImage;

		private _loadJindu: LImage[];

		//当前进度
		private _curJindu: number = -1;

		constructor(app: AppBase, onOpenFunc?: Function, onCloseFunc?: Function) {
			super(app, onOpenFunc, onCloseFunc);
			this._asset = [
				Path.atlas_ui + "hud.atlas"
			];
		}

		// 页面初始化函数
		protected init(): void {
			const loadImg = Path.ui_tongyong+"load.png";
			if (!Laya.loader.getRes(loadImg)) {
				return;
			}
			this._loadImg = new LImage(loadImg);
			this._loadImg.anchorX = this._loadImg.anchorY = .5;
			this._loadImg.centerX = this._loadImg.centerY = 0;
			this._loadImg.scale(1.5, 1.5);

			this.addChild(this._loadImg);
			this._loadImg.timerLoop(33, this._loadImg, () => {
				this._loadImg && (this._loadImg.rotation += 5);
			});
		}

		// 清理下页面
		protected clear(): void {
			if (this._loadImg) {
				this._loadImg.destroy(true);
				this._loadImg = null;
			}
			if (this._loadJindu) {
				for (let loadjindu of this._loadJindu) {
					if (loadjindu) loadjindu.destroy(true);
				}
				this._loadJindu = null;
			}
		}

		// 显示进度
		showJindu(step: number): void {
			if (!this._loadImg) return;
			if (step > this._curJindu) this._curJindu = step;
			else return;
			if (!this._loadJindu) this._loadJindu = [];
			let loadjindu: LImage = new LImage();
			loadjindu.skin = Path.ui + "hud/image_ts.png";
			loadjindu.scale(0.4, 0.4);
			loadjindu.pos(this._loadImg.x - loadjindu.width + 15 * step, this._loadImg.y - this._loadImg.height / 2 + 20);
			this._loadJindu.push(loadjindu);
			this.addChild(loadjindu);
		}
	}
}