/**
* name 
*/
module game.modules{
	export class ModuleMediator extends UiMediator implements IUiMediator {
		constructor(){
			super(null);
			this.on(ModuleEvent.SHOW, this, this.onShow);
			this.on(ModuleEvent.HIDE, this, this.onHide);
			this.on(ModuleEvent.SWAP, this, this.onSwap);
			this.on(ModuleEvent.JUMP, this, this.onJump);
			this.on(ModuleEvent.FLUSH_DATA, this, this.onFlushData);
		}
		/*public ModuleMediator() {
			super(null);
			this.on(ModuleEvent.SHOW, this, this.onShow);
			this.on(ModuleEvent.HIDE, this, this.onHide);
			this.on(ModuleEvent.SWAP, this, this.onSwap);
			this.on(ModuleEvent.JUMP, this, this.onJump);
			this.on(ModuleEvent.FLUSH_DATA, this, this.onFlushData);
		}*/
		
		protected onFlushData(event:Object):void {
			this.flushData();
		}
		
		protected onSwap(event:Object):void {
			this.swap();
		}
		
		protected onHide(event:Object):void {
			this.hide();
		}
		
		protected onShow(event:Object):void {
			this.show();
		}
		
		public onJump(event:Object):void {
			this.jumpPage(event);
		}
		
		public jumpPage(index:any):void {
			this.show();
		}
	}
}