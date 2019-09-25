/**
* 人物提示类
*/
module game.modules.roleinfo{
	export class RoleTipMediator extends game.modules.UiMediator{
		private _viewUI:ui.common.RoleTipUI;
		constructor(uiLayer: Sprite){
			super(uiLayer);
			this._viewUI = new ui.common.RoleTipUI();
			this._viewUI.mouseThrough = true;
			this.isCenter = false;
			this._viewUI.tip_box.on(LEvent.MOUSE_DOWN,this, this.swap)
		}
		public show():void {
			super.show();
		}
		public hide():void {
			super.hide();
		}

		public swap():void{
			super.swap();
		}
		
		public getView():Sprite {
			return this._viewUI;
		}
	}
}