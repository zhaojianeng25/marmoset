/**Remind.ui */
// import JinBiBuZuUI = ui.common.component.JinBiBuZuUI;

module game.modules.commonUI {
    /**银币兑换界面中，使用金币兑换按钮事件*/
    export const USE_GOLD_EXCHANGE_EVENT: string = "useGoldExchangeEvent";
    /**银币兑换界面中，使用符石兑换按钮事件 */
    export const USE_SILVER_EXCHANGE_EVENT: string = "useSilverExchangeEvent";
    /**金币补助界面，使用符石兑换按钮事件 */
    export const USE_YUANBAO_EXCHANGE_EVENT: string = "useYuanBaoExchangeEvent";


    export class JinBiBuZuViewMediator extends game.modules.UiMediator {

        /**提示界面选择界面 */
        private _viewUI: ui.common.component.JinBiBuZuUI;
        constructor(uiLayer: Sprite, app: AppBase) {
            super(uiLayer);
            this.uiLayer = app.uiRoot.general;
            this._clientWidth = app.clientWidth;
            this._clientHeight = app.clientHeight;
            this._app = app;

            this._viewUI = new ui.common.component.JinBiBuZuUI()
            this._viewUI.mouseThrough = false;
            this.isCenter = true;
        }



        ////////////////
        ///业务逻辑
        ////////////////
        /**
         * @describe  显示提示UI
         * @param isShowGold   是否显示金币不足界面 true：不显示金币不足界面 false: 显示银币不足界面
         * @param needMoney 还需要多少钱（不够多少钱）
         * @param yuanBaoNumber 还需要钱换算成仙晶（元宝）的数量
         * @param goldNumber 还需要钱换算成金币的数量
         */
        public onShow(isShowGold: boolean, needMoney: string, yuanBaoNumber: string, goldNumber?: string): void {
            this.onLoad(isShowGold, needMoney, yuanBaoNumber, goldNumber);
            super.show();
        }

        public hide(): void {
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }
        /**
         * @describe  开始加载
         * @param prompt   提示语句   
         */
        private onLoad(isShowGold: boolean, needMoney: string, YuanBaoNumber: string, goldNumber?: string) {
            this._viewUI.gold_box.visible = false;
            this._viewUI.silver_box.visible = false;
            if (isShowGold) {   //显示金币不足界面
                this._viewUI.gold_box.visible = true;
                this.setLackGoldNumber(needMoney);
                this.setYuanBaoOfGoldNumber(YuanBaoNumber);
            } else {
                this._viewUI.silver_box.visible = true;
                this.setLackSilverNumber(needMoney);
                this.setGoldNumber(goldNumber);
                this.setYuanBaoNumber(YuanBaoNumber);
            }
            this.redJInBiYunBaoBuZu(YuanBaoNumber,goldNumber);      // 判断一下金币 和元宝是否显示红色按钮
            this.registerEvent(needMoney, YuanBaoNumber, goldNumber);
        }

        /**
         * @describe  注册事件
         */
        private registerEvent(needMoney, YuanBaoNumber, goldNumber): void {
            this._viewUI.useGold_btn.on(LEvent.MOUSE_DOWN, this, this.onClickUseGoldBtnEvent, [needMoney, YuanBaoNumber, goldNumber]);
            this._viewUI.useYuanBaoOfSilver_btn.on(LEvent.MOUSE_DOWN, this, this.onClickUseYuanBaoOfSilverBtnEvent);
            this._viewUI.useYuanBaoOfGold_btn.on(LEvent.MOUSE_DOWN, this, this.onClickUseYuanBaoOfGoldBtnEvent);
            this._viewUI.close_btn.on(LEvent.CLICK, this, this.hide);
            this._viewUI.mengban_img.visible = true;
        }


        ////////////////
        ///UI
        ////////////////


        /**
         * @describe   兑换金币界面，设置需要金币数量
         * @param   num     数量
         */
        private setLackGoldNumber(num: string): void {
            this._viewUI.lackGloalNumber_lab.text = num;
        }
        /**
         * @describe  兑换金币界面，设置使用符石的数量
         * @param num   数量
         */
        private setYuanBaoOfGoldNumber(num: string): void {
            this._viewUI.yuanBaoOfGoldNumber_lab.text = num;
        }
        /**
         * @describe   兑换银币界面，设置需要银币数量
         * @param   num     数量
         */
        private setLackSilverNumber(num: string): void {
            this._viewUI.lackSilverNumber_lab.text = num;
        }

        /**
         * @describe  兑换银币界面，设置使用符石兑换的数量
         * @param num 数量  
         */
        private setYuanBaoNumber(num: string): void {
            this._viewUI.yuanBaoNumber_lab.text = num;
        }

        /**
         * @describe  兑换银币界面，设置可以代替的金币数量
         * @param num   数量
         */
        private setGoldNumber(num?: string): void {
            if (typeof (num) != "undefined") {
                this._viewUI.goldNumber_lab.text = num;
            }
        }
       
        ////////////////
        ///事件
        ////////////////

        /**
         * @describe  银币补助界面，点击使用金币代替按钮事件
         */
        private onClickUseGoldBtnEvent(needMoney, YuanBaoNumber, goldNumber): void {
            var globalIcon = game.modules.bag.models.BagModel._instance.globalIcon;  //金币
            if (globalIcon < goldNumber) {
                this.onLoad(true, goldNumber, YuanBaoNumber, goldNumber);
            } else {
                bag.models.BagProxy.getInstance().once(bag.models.REFRESH_CURRENCY_EVENT, this, this.sendEvent);
                RequesterProtocols._instance.c2s_exchange_currency(2, 1, goldNumber);
                this.hide();
            }
            // this.hide();
        }
        /** 派发事件消息 */
        private sendEvent(): void {
            this.event(commonUI.USE_GOLD_EXCHANGE_EVENT);
        }
        /**
        * @describe  金币元宝不足，设置按钮显示红色的
        * @param YuanBaoNumber 元宝  
        * @param goldNumber 金币
        */
        private redJInBiYunBaoBuZu(YuanBaoNumber, goldNumber) {
            var yuanbao = game.modules.bag.models.BagModel._instance.yuanbaoIcon;       //元宝
            var global = game.modules.bag.models.BagModel._instance.globalIcon;     //金币
            if (YuanBaoNumber > yuanbao) {
                this._viewUI.yuanBaoNumber_lab.stroke = 4;
                this._viewUI.yuanBaoNumber_lab.strokeColor = "#FF2800";
            } else {
                this._viewUI.yuanBaoNumber_lab.stroke = 1;
                this._viewUI.yuanBaoNumber_lab.strokeColor = "#ffffff";
            }
            if (goldNumber > global) {
                this._viewUI.goldNumber_lab.stroke = 4;
                this._viewUI.goldNumber_lab.strokeColor = "#FF2800";
            } else {
                this._viewUI.goldNumber_lab.stroke = 1;
                this._viewUI.goldNumber_lab.strokeColor = "#ffffff";
            }
        }
        /**
         * @describe  银币补足界面，点击使用符石兑换按钮事件
         */
        private onClickUseYuanBaoOfSilverBtnEvent(): void {
            this.event(commonUI.USE_SILVER_EXCHANGE_EVENT);
            this.hide();
        }

        /**
         * @describe  金币补助界面，点击使用符石兑换按钮事件
         */
        private onClickUseYuanBaoOfGoldBtnEvent(): void {
            this.event(commonUI.USE_YUANBAO_EXCHANGE_EVENT);
            this.hide();
        }
    }
}