/**
* HUD
*/
module game.gui{
	export class HUD extends game.gui.base.PageContainer {
		constructor(app: AppBase){
			super(app);
		}

		public closeAll():void{
			//除了某个页面
			for (let key in this._pages) {
				let pageid:number = Number(key);
				this.close(pageid);
			}
		}
	}
}