/**
* 手机关联验证 
*/
module game.modules.reward {
    export class BindTelMediator extends game.modules.ModuleMediator {
        public static PHONEASSOCIATION_EVENT: string = "phoneAssociationEvent";
        private _viewUI: ui.common.component.PhoneAssociationUI;
        constructor(app: AppBase) {
            super();
            this._viewUI = new ui.common.component.PhoneAssociationUI();
            this.uiLayer = app.uiRoot.general;
            this._clientWidth = app.clientWidth;
            this._clientHeight = app.clientHeight;
            this._app = app;
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, () => {
                ModuleManager.jumpPage(ModuleNames.REWARD, null, this._app);
                this.hide();
            });
            this._viewUI.getPin_btn.on(LEvent.MOUSE_DOWN, this, this.getPin);
            this._viewUI.PhoneAssociation_btn.on(LEvent.MOUSE_DOWN, this, this.PhoneAssociation);
        }
        /** 手机格式验证 */
        public getPin(): void {
            var tel = this._viewUI.phoneNumber_textinput.text;
            if (!(/^1[34578]\d{9}$/.test(tel))) {
                //提示手机格式不正确
                return;
            }
            RequesterProtocols._instance.c2s_CGetCheckCode(parseInt(tel));
            RewardProxy.getInstance().on(models.FINISHTIME_EVENT, this, () => {
                //验证码倒计时完成时间点
            });
        }
        /** 手机关联按钮 */
        public PhoneAssociation(): void {
            var tel = parseInt(this._viewUI.phoneNumber_textinput.text);
            var code = this._viewUI.pin_textinput.text;

            RequesterProtocols._instance.c2s_CBindTel(tel, code);
            RewardProxy.getInstance().on(models.BINDTEL_EVENT, this, () => {
                //确认关联手机返回状态1成功0失败
                var state = 1;
                if (state != 0) {

                }
            });
        }

        public onShow(): void {
            super.show();
        }
        public hide(): void {
            super.hide();
        }
        public getView(): Sprite {
            return this._viewUI;
        }
        public jumpPage(index: any): void {
            this.show();
        }
    }
}