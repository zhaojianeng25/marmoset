/**
* 群发消息
*/
module game.modules.family {
    export class FamilySendNewsViewMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.FamilyQunFaInfoUI;
        private DisappearMessageTipsMediator: game.modules.commonUI.DisappearMessageTipsMediator;
        /**程序内字符串表 */
        cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
        constructor(uiLayer: Sprite, app: AppBase) {
            super(uiLayer);
            this._viewUI = new ui.common.FamilyQunFaInfoUI();
            this._app = app;
            this.isCenter = false;
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
            this._viewUI.fasong_btn.on(LEvent.MOUSE_DOWN, this, this.sendNews);
        }
        
        /**发送消息 */
        public sendNews() {
            var message = this._viewUI.text_input.text;
            if (message != "") {
                this.CClanMessage(message);
                this.hide();
            } else {
                this.DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                this.DisappearMessageTipsMediator.onShow(this.cstringResConfigData[11531].msg);
            }
        }

        /**
         * 发布公会群消息
         * @param message 
         */
        public CClanMessage(message) {
            RequesterProtocols._instance.c2s_CClanMessage(message);
        }

        public show() {
            super.show();
        }

        public hide(): void {
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }
    }
}