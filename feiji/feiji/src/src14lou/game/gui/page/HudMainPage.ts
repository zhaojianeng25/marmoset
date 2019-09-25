module game.gui.page{
    /**
     * hud主界面
     * name 王谦
     */
	export class HudMainPage extends game.gui.base.Page{
        //private _viewUI:ui.common.MainHudUI;	//UI

        constructor(app: AppBase, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(app, onOpenFunc, onCloseFunc);
            this._asset = [
                Path.atlas_ui + "mainhud.atlas"
            ];
        }
        // 页面初始化函数
        protected init(): void {
            // this._view = this._viewUI = new ui.common.MainHudUI();
            // this.addChild(this._viewUI);
        }
        // 页面打开时执行函数
        protected onOpen(): void {
            super.onOpen();
            //如果是战斗地图，隐藏挑战,任务
            let mapInfo: MapInfo = this._app.sceneObjectMgr.mapInfo;
            if (mapInfo && mapInfo.inBattle) {
                // this._viewUI.visible = false;
            }else{
                // Laya.timer.once(2000,this,()=>{this._app.battleMgr.start()});
            }
            this.updateView();
        }
        //页面关闭函数
        public close(): void {
            super.close();
        }
        //添加事件侦听
        protected set addListener(isAdd: boolean) {
            // DisplayU.setMouseListener(this._viewUI.btnFight, isAdd, this, this.onClickHandler);
            // DisplayU.setMouseListener(this._viewUI.btnBattlePos, isAdd, this, this.onClickHandler);
        }
        //更新界面
        private updateView():void{
        }
        //鼠标点击事件
        private onClickHandler(e: LEvent): void {
            TweenBtnEff.BtnTween(e.currentTarget);
            switch (e.currentTarget) {
                // case this._viewUI.btnFight://挑战
                //     this._app.battleMgr.start();
                //     break;
                // case this._viewUI.btnBattlePos://位置
                //     this._app.uiRoot.general.open(PageDef.SCENE_BATTLE_PAGE);
                //     break;
            }
        }
	}
}