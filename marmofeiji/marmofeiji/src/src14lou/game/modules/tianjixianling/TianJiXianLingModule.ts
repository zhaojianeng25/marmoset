/** 天机仙令 */
module game.modules.tianjixianling{
    /** 天机仙令moudle*/
    export class TianJiXianLingModule extends game.modules.ModuleMediator{
        /** 天机仙令的UI */
        private _viewUI:ui.common.TianXianJiLingUI;
        /** 天机仙令主界面 */
        private _tianJiXianLingMediator:TianJiXianLingMediator;

        constructor(app:AppBase){
            super();
            this.uiLayer = app.uiRoot.general;
            this._viewUI = new ui.common.TianXianJiLingUI();
            this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;

            this._tianJiXianLingMediator = new TianJiXianLingMediator(this._app);
        }
        protected onShow(event:Object):void {
            this.checkRounds();
			this._app.uiRoot.closeLoadProgress();
		}
        /**
         * 检查轮数
         */
        private checkRounds():void{
            /** 首次参加天机仙令的时间 */
            var _jointime = models.TianJiXianLingModel._instance.tjxlInfoData.jointime;
            if(!_jointime){
                let inTeamGroup =  HudModel.getInstance().chargeInGroup();
                if(!inTeamGroup) //未处于组队
                {
                    /** 天机仙令使者所在的地图 */
                    var _mapId = mainhud.models.HudModel.getInstance().cNPCConfigData[19030]["mapid"];
                    game.modules.mainhud.models.HudModel.getInstance().useapp = this._app;
                    game.modules.mainhud.models.HudModel.getInstance().useapp.sceneRoot.istask = 2;
                    //到天机仙令使者请求参加天机仙令任务
                    game.modules.mainhud.models.HudModel.getInstance().jumpmap(_mapId, 19030);
                }else if(inTeamGroup) this.showDisappTips(PromptExplain.IN_TEAM_GROUP);
                
            }
            else{
                this._tianJiXianLingMediator.show();
                models.TianJiXianLingProxy.getInstance().event(models.ALREADY_JOIN_TJXL);
            }
        }
        /** 弹窗飘字提示
         * @param id 提示语句id
         */
        private showDisappTips(id:number):void
        {
            let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[id];
            let tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
            tips.onShow(chattext.msg);
        }
		public hide():void {
			super.hide();
		}
		
		public getView():Sprite {
			return this._viewUI;
		}
    }
}