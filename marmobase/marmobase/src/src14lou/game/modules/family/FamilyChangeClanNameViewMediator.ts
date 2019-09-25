/**
* 修改公会名称
*/
module game.modules.family {
    export class FamilyChangeClanNameViewMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.FamilyChangeClanNameUI;
        public jinbiduihuan: commonUI.JinBiBuZuViewMediator;
        private _TipsMessageMediator: game.modules.tips.TipsMessageMediator;
        constructor(uiLayer: Sprite, app: AppBase) {
            super(uiLayer);
            this._viewUI = new ui.common.FamilyChangeClanNameUI();
            this._app = app;
            this.isCenter = false;
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
        }
        
        /**显示改名花费 */
        public showChangeNameCost(oldName) {
            var yuanbao = game.modules.bag.models.BagModel._instance.yuanbaoIcon;
            this._viewUI.mYuanbao_label.text = yuanbao + "";
            this._viewUI.oldName_label.text = oldName;
            this._viewUI.cos_btn.on(LEvent.MOUSE_DOWN, this, this.changeClanName, [yuanbao]);
        }

        /**改名 */
        public changeClanName(yuanbao) {
            var newName = this._viewUI.familyname_input.text;
            if (newName != "") {
                if (yuanbao < 100) {
                    this.goCharge();
                } else {
                    this.CChangeClanName(newName);
                }
            }
        }

        /**仙晶兑换 */
        public goCharge() {
            this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI,this._app);
            this._TipsMessageMediator.show();
            var param: Dictionary = new Dictionary();
            param.set("contentId", 150506);
            this._TipsMessageMediator.showContent(param);
            game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
        }
        
        /**前往充值 */
        public goRecharge() {
            ModuleManager.jumpPage(ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
            game.modules.shop.models.ShopProxy._instance.event(game.modules.shop.models.Go_Charge);   //前往充值界面。关闭当前界面
            models.FamilyProxy._instance.event(models.CloseModule);
            this.hide();
        }

        public CChangeClanName(newName) {
            this.hide();
            RequesterProtocols._instance.c2s_CChangeClanName(newName);
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