/**
* 角色系统底板类
*/
module game.modules.roleinfo{
	enum ButtonType {
        /**属性按钮 */
        shuxing_btn  = 1,
        /**信息按钮 */
        xinxi_btn    = 2,
        /**加点按钮 */
        jiadian_btn = 3
    }
	export class RoleInfoModule extends game.modules.ModuleMediator{
		private _viewUI:ui.common.RoleDibanUI;
		private _RoleShuxinMediator:RoleShuxinMediator;
		private _RoleXinxiMediator:RoleXinxiMediator;
		private _RoleJiadianMediator:RoleJiadianMediator;
		constructor(app:AppBase){
			super();
			this.uiLayer = app.uiRoot.general;
			this._viewUI = new ui.common.RoleDibanUI();
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
            RoleInfoModel.getInstance().appBase = this._app;
			//人物属性界面
            this._RoleShuxinMediator = new RoleShuxinMediator(this._viewUI);
            //人物信息界面
            this._RoleXinxiMediator = new RoleXinxiMediator(this._viewUI);
            //人物加点界面
            this._RoleJiadianMediator = new RoleJiadianMediator(this._viewUI);
			this.registerEvent();

		}

		public show():void {
			super.show();
            //通知主界面开启蒙版
            mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
		}
		
		protected onShow(event:Object):void {
			this._app.uiRoot.closeLoadProgress();
			this.show();
            this.switchButton(models.RoleInfoModel.getInstance().currentKey);
			this.switchChildUI(models.RoleInfoModel.getInstance().currentKey);
		}

		public getView():Sprite {
			return this._viewUI;
		}
		public hide():void {
			super.hide();
            this._RoleShuxinMediator.hide();
            this._RoleXinxiMediator.hide();
            this._RoleJiadianMediator.hide();
            models.RoleInfoModel.getInstance().currentKey = RoleEnum.SHUXING_KEY;//打开角色系统，显示属性界面
            if(LoginModel.getInstance().CommonPage != "")
			{
				ModuleManager.show(LoginModel.getInstance().CommonPage,this._app);
				LoginModel.getInstance().CommonPage = "";
			}
		}

        /**注册点击事件 */
        private registerEvent(): void {
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN,this, this.clickCloseBtnEvent);
			this._viewUI.shuxin_btn.on(LEvent.MOUSE_DOWN,this, this.clickShuxinBtnEvent);
			this._viewUI.xinxi_btn.on(LEvent.MOUSE_DOWN,this, this.clickXinxiBtnEvent);
			this._viewUI.jiadian_btn.on(LEvent.MOUSE_DOWN,this, this.clickJiadianBtnEvent);
        }
	
        /**点击关闭按钮 */
        private clickCloseBtnEvent(): void {
            //通知主界面关闭蒙版
            mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
            this.hide();
        }
        /**点击属性按钮 */
        private clickShuxinBtnEvent(): void {
            if (!this._viewUI.shuxin_btn.selected) {
                this.switchButton(ButtonType.shuxing_btn);
                this.switchChildUI(ButtonType.shuxing_btn);
            }
        }
        /**点击信息按钮 */
        private clickXinxiBtnEvent(): void {
            if (!this._viewUI.xinxi_btn.selected) {
                this.switchButton(ButtonType.xinxi_btn);
                this.switchChildUI(ButtonType.xinxi_btn);
            }
        }
        /**点击加点按钮 */
        private clickJiadianBtnEvent(): void {
            if (!this._viewUI.jiadian_btn.selected) {
                this.switchButton(ButtonType.jiadian_btn);
                this.switchChildUI(ButtonType.jiadian_btn);
            }
        }

        /**
         * 点击一个按钮后，其余按钮的状态
         * @param index : button的类型
         */
        private switchButton(index: ButtonType) {
            //初始化button的select状态
            this._viewUI.shuxin_btn.selected = false;
            this._viewUI.xinxi_btn.selected = false;
            this._viewUI.jiadian_btn.selected = false;
            switch(index) {
                case ButtonType.shuxing_btn:
                    this._viewUI.shuxin_btn.selected = true;
                    break;
                case ButtonType.xinxi_btn:
                    this._viewUI.xinxi_btn.selected = true;   
                    break;
                case ButtonType.jiadian_btn:
                    this._viewUI.jiadian_btn.selected = true;   
                    break;
                default:
                    console.log("RoleInfoModule.switchButton error");             
            }
        }
        /**
         * 切换子界面
         * @param index : button的类型
         */
        private switchChildUI(index: ButtonType) {
            switch(index) {
                case ButtonType.shuxing_btn:
                    this._RoleShuxinMediator.show();
                    this._RoleXinxiMediator.hide();
                    this._RoleJiadianMediator.hide();
                    break;
                case ButtonType.xinxi_btn:
                    this._RoleShuxinMediator.hide();
                    this._RoleXinxiMediator.show();
                    this._RoleJiadianMediator.hide();
                    break;
                case ButtonType.jiadian_btn:
                    this._RoleShuxinMediator.hide();
                    this._RoleXinxiMediator.hide();
                    this._RoleJiadianMediator.show();
                    break;
                default:
                console.log("RoleInfoModule.switchChildUI error");             
            }
        }
	}
}