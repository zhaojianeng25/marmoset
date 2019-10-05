/**
* name 
*/

module game.modules.createrole{
	/** 登陆创建模块 */
	export class CreateRoleModule extends game.modules.ModuleMediator{
		private _viewUI:ui.common.KongUI;
		/** 创建角色界面 */
		private _createRoleMediator:CreateRoleMediator;
		/** 登陆界面 */
		private _loginViewMediator:LoginViewMediator;
		/** 骨骼动画 */
		private _skeleton:Laya.Skeleton;

		constructor(app:AppBase){
			super();
			this.uiLayer = app.uiRoot.general;
			this._viewUI = new ui.common.KongUI();
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;

			this._createRoleMediator = new CreateRoleMediator(this._viewUI,this._app);
			this._loginViewMediator = new LoginViewMediator(this._app);
		}
		/**
		 * 移除动画
		 */
		private removeAnima():void{
			if(this._skeleton){
				this._viewUI.removeChild(this._skeleton);
			}
			this.hide();
		}
		/**
		 * 添加加载动画
		 */
		private loadingAnima():void{
			// this._skeleton = new Laya.Skeleton();
			// this._skeleton.load("res/loading_1/loading_000.sk");
			// this._skeleton.scale(1.175,1.175);
			// this._viewUI.addChild(this._skeleton);
			// this._skeleton.pos(330,665);
		}

		protected onShow(event:Object):void {
			models.LoginModel.getInstance().referUI = this._viewUI;
			//运行加载动画
			// this.loadingAnima();
			this.registerEvent();
			super.show();
			this._loginViewMediator.show();
			this._app.uiRoot.closeLoadProgress();
		}
		/**
         * 注册事件
         */
        private registerEvent():void{
			Network._instance.addHanlder(ProtocolsEnum.SEnterWorld, this, this.removeAnima);
			Network._instance.addHanlder(ProtocolsEnum.SReturnLogin, this, this.loadingAnima);
		}
		public hide():void {
			super.hide();
		}
		
		public getView():Sprite {
			return this._viewUI;
		}

	}
}