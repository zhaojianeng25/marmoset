/**
* LJM 
*/

module game.modules.achievent
{
	export class AchieventModule extends game.modules.ModuleMediator
	{
		private _viewUI:ui.common.AchievementUI;
		private _achieventMediator:AchieventMediator;
		constructor(app:AppBase)
		{
			super();
			this.uiLayer = app.uiRoot.general;
			this._viewUI = new ui.common.AchievementUI();
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			//this.isCenter = true;
			this._achieventMediator = new AchieventMediator(this._viewUI,app);
			console.log("成就Module.....初始化")
			Network._instance.addHanlder(ProtocolsEnum.SGetArchiveInfo, this, this.onOpArchi);

		}
		public show():void 
		{
			super.show();
			this._achieventMediator.show();
		}
		protected onShow(event:Object):void 
		{
			this.show();
		}
		public hide():void 
		{
			super.hide();
			mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
		}
		
		public getView():Sprite 
		{
			return this._viewUI;
		}
		/** 同步数据刷新 */
		private onOpArchi(optcode:number, msg:hanlder.s2c_get_archive_info):void
		{
		    console.log("AchieventModule--监听到服务端下发的成就数据...开始刷新数据...");
			if(msg.archiveinfos.length == 0) return;
			this._achieventMediator.refreshData();
		}
	}
}