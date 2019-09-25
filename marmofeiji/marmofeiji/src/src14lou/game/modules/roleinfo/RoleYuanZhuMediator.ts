/**
 * 援助统计类
 */
module game.modules.roleinfo{
	export class RoleYuanZhuMediator extends game.modules.UiMediator{
		private _viewUI:ui.common.RoleYuanZhuUI;
		/**提示界面 */
		private _tipsModule: game.modules.tips.tipsModule;
		constructor(uiLayer: Sprite){
			super(uiLayer);
			this._viewUI = new ui.common.RoleYuanZhuUI();
			this._viewUI.mouseThrough = true;
			this.isCenter = false;
			this.registerEvent();
			this.eventListener();
		}
			/**注册事件监听 */
		public eventListener():void{
			models.RoleInfoProxy.getInstance().on(models.SReqHelpCountView_EVENT,this,this.onReqHelpCountView);
		}

		/**援助统计面板 */
		public onReqHelpCountView(e:any):void{
			var data:hanlder.S2C_SReqHelpCountView = models.RoleInfoModel.getInstance().SReqHelpCountViewData.get("data");
			this._viewUI.yuanZhuBattle_lab.text = data.expvalue + "/" + data.expvaluemax;//援助战斗次数
			this._viewUI.yuanZhuItem_lab.text = data.helpgiveitemnum + "/" + data.helpgiveitemnummax;//援助物品次数
			this._viewUI.qiuZhuItem_lab.text = data.helpitemnum + "/" + data.helpitemnummax;//求助物品次数
		}
		/**注册点击监听 */
		private registerEvent():void{
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN,this, this.hide);
			this._viewUI.tip1_btn.on(LEvent.MOUSE_DOWN,this, this.showTip1);
			this._viewUI.tip2_btn.on(LEvent.MOUSE_DOWN,this, this.showTip2);
			this._viewUI.tip3_btn.on(LEvent.MOUSE_DOWN,this, this.showTip3);
		}
		/**援助战斗次数提示 */
		public showTip1():void{
			var param: Dictionary = new Dictionary();
			param.set("title", RoleEnum.YUANZHU_ZHANDOU);
			param.set("contentId", RoleEnum.YUANZHU_ZHANDOU_TIP);
			this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, RoleInfoModel.getInstance().appBase, TIPS_TYPE.CLIENTMESSAGE, param);
		}
		/**援助物品次数提示 */
		public showTip2():void{
			var param: Dictionary = new Dictionary();
			param.set("title", RoleEnum.YUANZHU_WUPIN);
			param.set("contentId", RoleEnum.YUANZHU_WUPIN_TIP);
			this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, RoleInfoModel.getInstance().appBase, TIPS_TYPE.CLIENTMESSAGE, param);
		}
		/**求助物品次数提示 */
		public showTip3():void{
			var param: Dictionary = new Dictionary();
			param.set("title", RoleEnum.QIUZHU_WUPIN);
			param.set("contentId", RoleEnum.QIUZHU_WUPIN_TIP);
			this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, RoleInfoModel.getInstance().appBase, TIPS_TYPE.CLIENTMESSAGE, param);
		}
		public show():void {
			models.RoleInfoProxy.getInstance().event(models.OPEN_ZHEZHAO);
			super.show();
		}
		public hide():void {
			models.RoleInfoProxy.getInstance().event(models.CLOSE_ZHEZHAO);
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