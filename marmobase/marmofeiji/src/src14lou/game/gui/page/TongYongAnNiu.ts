module game.gui.page {
    /**
     * 宠物
     */
    export class TongYongAnNiu extends game.gui.base.Page {
        private _viewUI:ui.common.PetGongYongDiBanUI;     //UI

        constructor(app: AppBase, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(app, onOpenFunc, onCloseFunc);
            this._isNeedBlack = true;
            this._asset = [
                Path.atlas_ui + "pet.atlas",			
				Path.atlas_ui + "tongyong.atlas"	
            ];
        }
        // 页面初始化函数
        protected init(): void {
            this._view = this._viewUI = new ui.common.PetGongYongDiBanUI();
            // this._viewUI.mouseEnabled = false;
            // this._viewUI.mouseThrough = true;
            
            this.addChild(this._view);
    
        }
        // 页面打开时执行函数
        protected onOpen(): void {
            super.onOpen();
            this.updateView();
        }
        //页面关闭函数
        // public close(): void {
        //     super.close();
        //     this.onExit();
        // }
        //添加事件侦听
        // protected set addListener(isAdd: boolean) {
        //     DisplayU.setMouseListener(this._viewUI.btnExit, isAdd, this, this.onClickHandler);
        // }
        //更新界面
        private updateView():void{
            
        }
        //退出战斗场景
        // private onExit():void{
        //     this._app.battleMgr.battleEvent(BattleMgr.BATTLE_EXIT);
        // }
        //各种点击事件
        // private onClickHandler(e: LEvent): void {
        //     TweenBtnEff.BtnTween(e.currentTarget);
        //     switch (e.currentTarget) {
        //         case this._viewUI.btnExit://退出
        //             this.onExit();
        //             break;
        //     }
        // }
    }
}


