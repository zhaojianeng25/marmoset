/**
* 修改宗旨界面
*/
module game.modules.family {
    export class FamilyChangeAimViewMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.FamilyXiuGaiZongZhiUI;

        constructor(uiLayer: Sprite, app: AppBase) {
            super(uiLayer);
            this._viewUI = new ui.common.FamilyXiuGaiZongZhiUI();
            this._app = app;
            this.isCenter = false;

            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
            this._viewUI.enter_btn.on(LEvent.MOUSE_DOWN, this, this.ChangeAim);
            this._viewUI.exit_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
        }

        /**修改公会宗旨,显示老宗旨 */
        public changeClanAim(oldAim) {
            this._viewUI.zongZhi_input.text = oldAim;
        }

        /**修改公会宗旨 */
        public ChangeAim() {
            var newAim = this._viewUI.zongZhi_input.text;
            this.hide();
            this.CChangeClanAim(newAim);
        }

        /**x修改宗旨请求 */
        public CChangeClanAim(newAim) {
            RequesterProtocols._instance.c2s_CChangeClanAim(newAim)
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