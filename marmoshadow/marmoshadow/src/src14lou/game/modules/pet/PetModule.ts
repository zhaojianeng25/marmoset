/**
* 通用地板
*/
module game.modules.pet {
	export class PetModule extends game.modules.ModuleMediator {
		/**炼宠界面*/
		private petLianChongMediator: PetLianChongMediator;
		/**图鉴界面*/
		private petTuJianMediator: PetTuJianMediator;
		/**培养界面*/
		private petPeiYangMediator: PetPeiYangMediator;
		/**基础界面*/
		private petAttriButeNewMediator: PetAttriButeNewMediator;
		/**记录当前选中的属性面板次数 */
		private selectedNum : number = 0; 
		private _viewUI: ui.common.PetGongYongDiBanUI;
		constructor(app: AppBase) {
			super();
			this.uiLayer = app.uiRoot.general;
			this._viewUI = new ui.common.PetGongYongDiBanUI();
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this.petAttriButeNewMediator = new PetAttriButeNewMediator(this._viewUI);
			this.petAttriButeNewMediator.app = app;
			this.petLianChongMediator = new PetLianChongMediator(this._viewUI);
			this.petLianChongMediator.app = app;
			this.petTuJianMediator = new PetTuJianMediator(this._viewUI);
			this.petTuJianMediator.app = app;
			this.petPeiYangMediator = new PetPeiYangMediator(this._viewUI);
			this.petPeiYangMediator.app = app;
			this._viewUI.button_tab.selectHandler = new Laya.Handler(this, this.onselects);
			this._viewUI.close_btn.clickHandler = new Laya.Handler(this, this.close);
			this._viewUI.petbk_img.on(LEvent.MOUSE_UP, this, this.hidedata)
			this.accept();
			this.init();
		}
		public static _instance: PetModule;
		public static getInstance(app:AppBase): PetModule {
			if (!this._instance) {
				this._instance = new PetModule(app);
			}
			return this._instance;
		}
		/**修改名字*/
		public accept(): void {
			models.PetProxy.getInstance().on(models.CHANGEUI_EVENT, this, this.change);
		}
		/**切换界面*/
		public change(e: any): void {
			this._viewUI.button_tab.selectedIndex = 2;
		}
		/**隐藏提示框*/
		public hidedata() {
			switch (this._viewUI.button_tab.selectedIndex) { // 0属性界面 1为炼宠界面 2为培养界面
				case 0:
					this.petAttriButeNewMediator.hidedata()
					break;
				case 1:
					this.petLianChongMediator.hidedata()
					break;
				case 2:
					this.petPeiYangMediator.hidedata()
					break;
				default:
					break;
			}
		}
		/**初始化数据*/
		public init(): void {
			let top: number;		
			PetModel.getInstance().petbasedata = PetModel.getInstance().pets.get(PetModel.getInstance().pets.keys[0]);
			PetModel.getInstance().petskill = PetModel.getInstance().petbasedata.skills;
			PetModel.getInstance().petinitfight = PetModel.getInstance().petbasedata.initbfp;
			PetModel.getInstance().petbasicfight = PetModel.getInstance().petbasedata.bfp;
		}
		/**选择显示哪个窗口*/
		public onselects(index: number): void {
			if (index != -1) {//关闭界面是为-1
				PetModel.getInstance().tabnum = index;
			}
			switch (index) {//0属性界面 1炼宠界面 2培养界面 3图鉴界面
				case 0: 
					var isxuanzhe = this.judgepet();
					if (isxuanzhe) {
						this.onselects(3);
						return;
					}
					this.petAttriButeNewMediator.show();
					this.petLianChongMediator.hide();
					this.petPeiYangMediator.hide();
					this.petTuJianMediator.hide();
					break;
				case 1: 
					var isxuanzhe = this.judgepet();
					if (isxuanzhe) {
						this.onselects(3);
						return;
					}
					this.petAttriButeNewMediator.hide();
					this.petLianChongMediator.show();
					this.petPeiYangMediator.hide();
					this.petTuJianMediator.hide();
					break;
				case 2: 
					var isxuanzhe = this.judgepet();
					if (isxuanzhe) {
						this.onselects(3);
						return;
					}
					this.petAttriButeNewMediator.hide();
					this.petLianChongMediator.hide();
					this.petPeiYangMediator.show();
					this.petTuJianMediator.hide();
					break;
				case 3: 
					this.petAttriButeNewMediator.hide();
					this.petLianChongMediator.hide();
					this.petPeiYangMediator.hide();
					this.petTuJianMediator.show();
					break;
				default:
					break;
			}
		}
		protected onShow(event: Object): void {
			super.onShow(event);
			//通知主界面开启蒙版
			mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
			if (this._viewUI.button_tab.selectedIndex == PetModel.getInstance().tabnum) {//当前选择的界面
				this._viewUI.button_tab.selectedIndex = 0;
				PetModel.getInstance().tabnum = 0;
			}
			else {
				this._viewUI.button_tab.selectedIndex = PetModel.getInstance().tabnum;
			}
		}
		/**判断宠物为空 */
		private judgepet(): boolean{
			if(PetModel.getInstance().pets.keys.length == 0){
				this._viewUI.button_tab.selectedIndex = 3;
				this.selectedNum++;
				if(this.selectedNum >= 2){
					let prompt = HudModel.getInstance().promptAssembleBack(420037);
					let disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
					disappearMsgTips.onShow(prompt);
				}
			}
			return PetModel.getInstance().pets.keys.length == 0 ? true : false;
		}

		public hide(): void {
			this._viewUI.button_tab.selectedIndex = -1;
			mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
			super.hide();
		}
		public getView(): Sprite {
			return this._viewUI;
		}
		/**关闭宠物界面*/
		public close(): void {
			super.hide();
			//通知主界面关闭黑色蒙版
			mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
			this.petAttriButeNewMediator.hide();
			this.petLianChongMediator.hide();
			this.petPeiYangMediator.hide();
			this.petTuJianMediator.hide();
			PetModel._instance.tabnum = 0;
			PetModel._instance.changexilian = -1;
			this._viewUI.button_tab.selectedIndex = -1;
			if (LoginModel.getInstance().CommonPage != "") {//是否从其他界面跳转过来
				ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
				LoginModel.getInstance().CommonPage = "";
			}
		}
	}
}