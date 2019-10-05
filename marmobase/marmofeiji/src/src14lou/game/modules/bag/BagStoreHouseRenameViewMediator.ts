
module game.modules.bag {

    /**最大的输入字数控制 */
    export class BagStoreHouseRenameViewMediator extends game.modules.UiMediator {
        /**仓库选择界面 */
        private _viewUI: ui.common.BagStorehouseRenameUI;
        /**修改的名称 */
        private _storeHouseName: string;
        /**当前pageId */
        private _pageId: number;

        constructor(uiLayer: Sprite, app: AppBase){
			super(uiLayer);
			this._viewUI = new ui.common.BagStorehouseRenameUI()
            this._viewUI.mouseThrough = false;
            this.isCenter = false;
            this._app = app;
            // 显示5个字，UTF-8编码下，一个字占据3个字符
            this._viewUI.storehouseRename_text.maxChars = models.BagModel.getInstance().getStoreHouseRenameNumber();            
        }

        

        
        ////////////////
        ///业务逻辑
        ////////////////

        // 实现的接口
        public onShow(nowPage: number): void {
            this.getNowPageInfo(nowPage);
            this.onLoad();
            super.show();
        }

        public hide(): void {
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }
        private onLoad() {
            // 初始化提示符
            this.initUI();
            // this.setEnsueBtnIsOrNotClick(false);
            // this._viewUI.storehouseRename_text.
            this.registerEvent();
        }
        /**
         * @describe  初始化UI
         */
        private initUI(): void {
            this._viewUI.storehouseRename_text.prompt = models.BagModel.getInstance().getStoreHouseRenamePrompt();
            this._viewUI.storehouseRename_text.text = "";
        }
        private getNowPageInfo(nowPage: number): void {
            this._pageId = nowPage;
        } 

        
        ////////////////
        ///事件
        ////////////////
        /**
         * @describe  注册事件
         */
        private registerEvent(): void {
            this._viewUI.cancel_btn.on(LEvent.MOUSE_DOWN,this,this.clickCancelBtnEvent);
            this._viewUI.enSure_btn.on(LEvent.MOUSE_DOWN,this,this.clickEnsureBtnEvent);
            // this._viewUI.on(LEvent.MOUSE_DOWN,this,this.clickUIEvent);

        }
        /**
         * @describe  取消按钮点击事件
         */
        private clickCancelBtnEvent(): void {
            models.BagProxy.getInstance().event(models.STOREHOUSE_RENAME_EVENT);
        }
        /**
         * @describe  确定按钮点击事件1
         */
        private clickEnsureBtnEvent(): void {
            let tempName: string = "";
            this._storeHouseName = this.getStoreHouseRenameText();
            let isPanel: boolean = false;       // 判断界面隐藏还是显示

            if (this._storeHouseName != tempName) {
                RequesterProtocols._instance.c2s_CModifyDepot_Name(this._pageId, this._storeHouseName);
                models.BagProxy.getInstance().event(models.STOREHOUSE_RENAME_EVENT, isPanel);
                // 对输入的仓库的名称进行关键词的筛选 如果含有敏感字，则提示
                // let isBadWorld = modules.chat.models.ChatModel.getInstance().judgeBanWords(this._storeHouseName);
                // if (isBadWorld == false) {

                // } else {
                //     let prompt = HudModel.getInstance().promptAssembleBack(142260);
                //     let disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                //     disappearMsgTips.onShow(prompt);
                // }
            }
        }



        ////////////////
        ///UI
        ////////////////

        /**
         * @describe  返回输入框的内容
         * @return  输入内容
         */
        private getStoreHouseRenameText(): string {
            return this._viewUI.storehouseRename_text.text;
        }
    }
}