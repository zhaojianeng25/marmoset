/**
* name 
*/
module game.modules.commonUI{
	export class TextTipsMediator extends game.modules.UiMediator{
		private _viewUI:ui.common.component.TextTipsUI;
		constructor(app:AppBase){
			super(app.uiRoot.general);
			this._viewUI = new ui.common.component.TextTipsUI();
			this._viewUI.mouseThrough = true;
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
		}
		public init(textstr:string,x:number,y:number){
			this.show();
			this._viewUI.tips_lab.text = textstr
			this._viewUI.tips_img.height = this._viewUI.tips_lab.height+12
			if(textstr.length*20<282){
				this._viewUI.tips_box.width = textstr.length*20+12
			}
			else{
				this._viewUI.tips_box.width = 297 
			}
			if(x-this._viewUI.tips_box.width<0){
				this._viewUI.tips_box.x =x+20
			}
			else{
				this._viewUI.tips_box.x = x-this._viewUI.tips_box.width-20
			}
			
			this._viewUI.tips_box.y = y - this._viewUI.tips_img.height/2
		}
		public show() {
			super.show();
		}
		public hide():void {
			super.hide();
		}
		
		public getView():Sprite {
			return this._viewUI;
		}
	}
}