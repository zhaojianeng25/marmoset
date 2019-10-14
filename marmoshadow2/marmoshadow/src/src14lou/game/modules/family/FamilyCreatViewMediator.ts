module game.modules.family {
    /** 创建公会 */
    export class FamilyCreatViewMediator extends game.modules.ModuleMediator {
        private _viewUI: ui.common.FamilyBuildUI;//ui.common.CreateRoleUI;
        public jinbiduihuan: commonUI.JinBiBuZuViewMediator;
        private _TipsMessageMediator: game.modules.tips.TipsMessageMediator;
        /**客户端信息提示表 */
        chatMessageTips = game.modules.chat.models.ChatModel._instance.chatMessageTips;
        constructor(app: AppBase) {
            super();
            this.uiLayer = app.uiRoot.general;
            this._viewUI = new ui.common.FamilyBuildUI();
            this._clientWidth = app.clientWidth;
            this._clientHeight = app.clientHeight;
            this._app = app;
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.close);
            this._viewUI.cos_btn.on(LEvent.MOUSE_DOWN, this, this.createFamily);
        }

        /**
         * 创建公会
         */
        public createFamily() {
            var familyname = this._viewUI.familyname_input.text;
            var familyzongzhi = this._viewUI.familyzongzhi_input.text;
            var globalIcon = game.modules.bag.models.BagModel._instance.globalIcon;
            if (globalIcon < 10000) {
                this.jinbiduihuan = new commonUI.JinBiBuZuViewMediator(this._viewUI, this._app);
                var yinbi = 10000 - globalIcon;
                var yuanbao = yinbi / 100;
                var jinbi = yinbi / 100;
                if (yuanbao > parseInt(yuanbao.toFixed(0))) {
                    yuanbao = parseInt(yuanbao.toFixed(0)) + 1;
                }
                else {
                    yuanbao = parseInt(yuanbao.toFixed(0));
                }
                if (jinbi > parseInt(jinbi.toFixed(0))) {
                    jinbi = parseInt(jinbi.toFixed(0)) + 1;
                }
                else {
                    jinbi = parseInt(jinbi.toFixed(0));
                }
                this.jinbiduihuan.onShow(true, yinbi + "", yuanbao + "", jinbi + "");
                this.jinbiduihuan.once(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.goCharge, [yuanbao, familyname, familyzongzhi]);
            }
            else {
                this.CCreateClan(familyname, familyzongzhi);
                game.modules.createrole.models.LoginModel.getInstance().CommonPage = "";
                models.FamilyProxy._instance.event(models.CloseJoinView);
            }
        }

        /**仙晶兑换 */
        public goCharge(yuanbao, familyname, familyzongzhi) {
            var yuanbaoIcon = game.modules.bag.models.BagModel._instance.yuanbaoIcon;
            if (yuanbaoIcon < yuanbao) {
                this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                this._TipsMessageMediator.show();
                var param: Dictionary = new Dictionary();
                param.set("contentId", 150506);
                this._TipsMessageMediator.showContent(param);
                game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
            } else {
                bag.models.BagProxy.getInstance().once(bag.models.REFRESH_CURRENCY_EVENT,this,this.judgeGoldIsEnough);
                RequesterProtocols._instance.c2s_exchange_currency(3, 2, yuanbao);
            }
        }

        /**创建帮派 */
        public create(familyname, familyzongzhi) {
            this.CCreateClan(familyname, familyzongzhi);
        }

        /**前往充值界面 */
        public goRecharge() {
            ModuleManager.jumpPage(ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
            game.modules.shop.models.ShopProxy._instance.event(game.modules.shop.models.Go_Charge);   //前往充值界面。关闭当前界面
            this.hide();
        }

        /**
         * 关闭创建公会界面 
         */
        public close() {
            var CommonPage = game.modules.createrole.models.LoginModel.getInstance().CommonPage;
            if (CommonPage != "") {
                ModuleManager.show(CommonPage, this._app);
                game.modules.createrole.models.LoginModel.getInstance().CommonPage = "";
            }
            this.hide();
        }

        /**
         * 客户端请求创建公会
         * @param clanname 公会名字
         * @param clanaim 公会宗旨（公告）
         */
        public CCreateClan(clanname, clanaim) {
            chat.models.ChatProxy.getInstance().once(chat.models.SHOW_DISSAPEAR_MSG_TIPS, this, this.showDisTipsMsg);
            RequesterProtocols._instance.c2s_CCreateClan(clanname, clanaim);
        }
        /** 显示提示信息 */
        private showDisTipsMsg(msg: any): void {
            if(msg == ChatModel.getInstance().chatMessageTips[145068]["msg"]){
                this.hide();
                return;
            }
            var _DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
            _DisappearMessageTipsMediator.onShow(msg);
        }

        public show() {
            this.judgeGoldIsEnough();
            super.show();
        }
        /** 判断金币是否足够 */
        private judgeGoldIsEnough():void{
            var globalIcon = game.modules.bag.models.BagModel._instance.globalIcon;
            if (globalIcon < 10000) {
                this._viewUI.cos_btn.labelStrokeColor = "#ff0000";
            }
            else{
                this._viewUI.cos_btn.labelStrokeColor = "#50321a";
            }
        }

        public hide(): void {
            mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }
    }
}