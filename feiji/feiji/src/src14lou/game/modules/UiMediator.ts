/**
* name 
*/
module game.modules{
	export class UiMediator extends Laya.EventDispatcher implements IUiMediator {
		constructor(uiLayer:Sprite){
			super();
			this.uiLayer = uiLayer;
            Laya.stage.on(LEvent.RESIZE, this, this.onResize);
		}
    	onResize(): void {
			this.layout();
		}
		public uiLayer:Sprite;
		public isTweenShow:Boolean = false;
		protected hasSound:Boolean = true;
		protected isCenter:Boolean = true;
		protected _clientWidth:number;
		protected _clientHeight:number;
		protected _app:AppBase;
		
		public isShow():Boolean {
			return this.getView() && this.getView().parent && this.getView().parent == this.uiLayer;
		}
		
		public isShowInStage():Boolean {
			return this.getView() && this.getView().stage != null;
		}
		
		
		public show():void {
			this.uiLayer.addChild(this.getView());
			this.layout();
		}
		// 重新布局
		protected layout(layoutView:any = this.getView()): void {
			if (this._app) {				
				this._clientWidth = this._app.clientWidth;
				this._clientHeight = this._app.clientHeight;
			}
			if (layoutView && this.isCenter) {
				//let scaleX = this._clientWidth / layoutView.width;
				//let scaleY = this._clientHeight / this.getView().height;
				let scale = 1//Math.min(scaleX, scaleY);
				layoutView.scale(scale, scale);
				layoutView.x = (this._clientWidth - layoutView.width * scale) / 2;
				layoutView.y = (this._clientHeight - layoutView.height * scale) / 2;
				//console.log("UiMediator layout!", layoutView);
			}
		}
		public hide():void {
				//try {
					this.uiLayer.removeChild(this.getView());
				//} catch(e:Error) {

				//}
		}
		set app(value:AppBase) {
			this._app = value;
		}
		public swap():void {
			if(this.isShow()){
				this.hide();
			}
			else{
				this.show();
			}
		}
		
		public flushData():void {
			
		}
		
		public getView():Sprite {
			return null;
		}
	}
}