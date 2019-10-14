/**
* 基础栈 
*/
module game.cotrl{
	export class BaseStack {
		
		private  _isFinalize:boolean = false;

		protected _controller:ACotrller;
		protected _sceneObjectMgr:SceneObjectMgr;
		
		// 应用程序引用
		protected _app: AppBase;
		constructor(app: AppBase) {
			this._app = app;
			
			this._sceneObjectMgr = this._app.sceneObjectMgr;
			this._controller = this._app.aCotrller;
		}
		
		public  doReady():void{
			
		}
		
		/**
		 * 是否已经释放
		 */		
		public get isFinalize():boolean{
			return this._isFinalize;
		}
		
		public  finalize():void{
			if(this._isFinalize)
				return;
			this._isFinalize = true;
			
		}
		
		public  initialize():boolean{
			
			return true;
		}
		
		/**
		 * 插入新栈
		 * @param controller
		 * @param newStack
		 * @return			 是否成功插入
		 */		
		protected  stack(controller:ACotrller,newStack:BaseStack):boolean{
			return controller.stack(newStack);
		}
		
		public  update(diff:number):boolean{
			return this._isFinalize;
		}
	}
}