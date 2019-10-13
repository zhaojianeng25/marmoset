/**
* 弹劾会长
*/
module game.modules.family {
    export class FamilyImpeachmentViewMediator extends game.modules.ModuleMediator {
        private _viewUI: ui.common.FamilyTanHeUI;//ui.common.CreateRoleUI;
        private _tipsModule:game.modules.tips.tipsModule;
        /**程序内字符串表 */
        cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
        constructor(app: AppBase) {
            super();
            this.uiLayer = app.uiRoot.general;
            this._viewUI = new ui.common.FamilyTanHeUI();
            this._clientWidth = app.clientWidth;
            this._clientHeight = app.clientHeight;
            this._app = app;
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.closeThisView);
            this._viewUI.faqitanhe_btn.on(LEvent.MOUSE_DOWN,this,this.impeachment);
            models.FamilyProxy._instance.on(models.SRequestImpeachMentView,this,this.showImpeachView);
			game.modules.tips.models.TipsProxy.getInstance().on(game.modules.tips.models.TIPS_ON_OK,this,this.okTips);
        }

        /**弹劾界面 */
        public showImpeachView(RequestImpeachMent) {
            var maxnum = RequestImpeachMent.get("maxnum");
            var rulehtml = this.cstringResConfigData[11608].msg;
            var m_rulehtml = rulehtml.replace("$parameter1$",maxnum);
            this._viewUI.rule_html.innerHTML = m_rulehtml;
            var tishiHtml = this.cstringResConfigData[11609].msg;
            this._viewUI.tishi_html.innerHTML = tishiHtml;

        }

        /**弹劾 */
        public impeachment(){
            var param:Dictionary = new Dictionary();
            param.set("contentId",172049);
            this._tipsModule = new game.modules.tips.tipsModule(this._viewUI,this._app,TIPS_TYPE.CLIENT_TIPS_MESSAGE,param);
        }
        
        /**关闭当前界面 */
        public closeThisView() {
            this.hide();
            ModuleManager.show(ModuleNames.haveFamily, this._app);
        }

        /**
         * 请求弹劾
         * @param cmdtype 0请求弹劾界面   1发起弹劾   2响应弹劾
         */
        public CRequestImpeachMentView(cmdtype) {
            RequesterProtocols._instance.c2s_CRequestImpeachMentView(cmdtype);
        }
        
        /**移除弹劾tips监听 */
        public offEvent(){
            game.modules.tips.models.TipsProxy.getInstance().off(game.modules.tips.models.TIPS_ON_OK,this,this.okTips);
        }
        
        /**确定弹劾 */
        public okTips(){
            this.CRequestImpeachMentView(Cmdtype.requestImp);
        }

        public show() {
            this.CRequestImpeachMentView(Cmdtype.requestView);
            super.show();
        }

        public hide(): void {
            this.offEvent();
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }
    }
}