/**Remind.ui */
// import ChangeMoney = ui.common.component.ChangeMoneyUI;

module game.modules.commonUI {
    /**点击取消按钮事件 */
    export const CHANGEMONEY_CANL_EVENT: string = "changeMoneyCanlEvent";
    /**兑换按钮事件 */
    export const CHANGEMONEY_CONFIRM_EVENT: string = "changeMoneyConfirmEvent";

    export class ChangeMoneyViewMediator extends game.modules.UiMediator {

        /**提示界面选择界面 */
        private _viewUI: ui.common.component.ChangeMoneyUI;
        /**兑换银币界面显示中的金币 */
        private _exchangeGold: number;
        /**兑换银币界面显示元宝 */
        private _exchangeYuanBao: number;
        /** 兑换类型 */
        private changeType: number;
        /**tips界面 */
        private _tipsModule: game.modules.tips.tipsModule;
        /**程序内字符串表 */
        cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
        /**小键盘 */
        private _XiaoJianPanMediator: game.modules.tips.XiaoJianPanMediator;
        /** 弹窗 */
        private DisappearMessageTipsMediator: game.modules.commonUI.DisappearMessageTipsMediator;
        /**存储总的兑换数量 */
        totalNum: string = "";
        /**玩家元宝数量 */
        m_yuanbao:number = 0;
        /** 跳转模块名称 */
        private moduleName:string = "";

        constructor(uiLayer: Sprite, app: AppBase) {
            super(uiLayer);
            this.uiLayer = app.uiRoot.general;
            this._viewUI = new ui.common.component.ChangeMoneyUI()
            this._clientWidth = app.clientWidth;
            this._clientHeight = app.clientHeight;
            this._app = app;
            this._viewUI.mouseThrough = false;
            this.isCenter = true;
        }







        ////////////////
        ///业务逻辑
        ////////////////
        /**
         * @describe  显示提示UI
         * @param isShowGold   是否显示金币兑换界面；true：显示金币兑换界面，false: 显示银币兑换界面
         * @param yuanBaoNumber 元宝
         * @param goldNumber 金币 （兑换金币不需要）
         * 
         */
        public onShow(isShowGold: boolean, yuanBaoNumber: number, goldNumber?: number): void {
            game.modules.tips.models.TipsProxy.getInstance().on(game.modules.tips.models.ON_KRYBOARD, this, this.getNum)
            this.onLoad(isShowGold, yuanBaoNumber, goldNumber);
            super.show();
        }
        /** 模块显示 */
         public onShowInModule(moduleName:string,isShowGold: boolean, yuanBaoNumber: number, goldNumber?: number): void {
            this.moduleName = moduleName;
            game.modules.tips.models.TipsProxy.getInstance().on(game.modules.tips.models.ON_KRYBOARD, this, this.getNum)
            this.onLoad(isShowGold, yuanBaoNumber, goldNumber);
            super.show();
        }

        public show(): void {
            this.registerEvent(true);
            super.show();
        }
        public hide(): void {
            /** 移除监听 */
            game.modules.tips.models.TipsProxy.getInstance().off(game.modules.tips.models.ON_KRYBOARD, this, this.getNum)
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }
        /**
         * @describe  开始加载
         */
        private onLoad(isShowGold: boolean, YuanBaoNumber: number, goldNumber?: number) {
            this.initUI(isShowGold, YuanBaoNumber, goldNumber);
            this.registerEvent(isShowGold);
        }
        /**
         * @describe  初始化UI
         * @param    isShowGold   是否显示金币兑换界面；true：显示金币兑换界面，false: 显示银币兑换界面
         */
        private initUI(isShowGold: boolean, YuanBaoNumber: number, goldNumber?: number): void {
            this._viewUI.exchangeGold_box.visible = false;
            this._viewUI.exchangeSilver_box.visible = false;
            this.m_yuanbao = YuanBaoNumber;

            //显示金币补足界面
            if (isShowGold) {
         
                this._viewUI.exchangeGold_box.visible = true;
                this.setExchangeGoldOfMyYuanBao(YuanBaoNumber);
                this.setExchageGoldOfGetGold(100);
                this.setExchangeGoldOfNumber(1);
                /**特殊定义  */
                this.changeType = MoneyTypes.MoneyType_SupFushi;
            } else {
                this._exchangeYuanBao = YuanBaoNumber;
                this._exchangeGold = goldNumber;

                this._viewUI.exchangeSilver_box.visible = true;
                //默认第二个
                this._viewUI.chooseMoney_rag.selectedIndex = 0;
                this.onSelctItem(false);
            }
        }
        /**
         * @describe  兑换银币，切换金币和元宝
         * @param isSelectGold   是否选择金币
         */
        private onSelctItem(isSelectGold: boolean): void {
            let getSilverNumber: number;
            let goodNumber: number;
            //选中金币兑换
            if (isSelectGold) {
                this._viewUI.explainOfGood_lab.visible = true;
                this._viewUI.Gold_img.visible = true;
                this._viewUI.explainOfGood1_lab.visible = false;
                this._viewUI.yuanBao_img.visible = false;
                getSilverNumber = this._exchangeGold;
                if (this._viewUI.chooseMoney_rag.selectedIndex != 0) {/** 切换时将所选值退1 */
                    this._viewUI.exchangeSilverOfNumber_lab.text = "1";
                }
                goodNumber = game.modules.bag.models.BagModel.getInstance().globalIcon;
                this.setExchangeSilverOfGetSilver(100);
            } else {
                /** 选中元宝兑换 */
                this._viewUI.explainOfGood_lab.visible = false;
                this._viewUI.Gold_img.visible = false;
                this._viewUI.explainOfGood1_lab.visible = true;
                this._viewUI.yuanBao_img.visible = true;
                if (this._viewUI.chooseMoney_rag.selectedIndex != 1) {/** 切换时将所选值退1 */
                    this._viewUI.exchangeSilverOfNumber_lab.text = "1";
                }
                getSilverNumber =  this._exchangeGold;
                goodNumber = game.modules.bag.models.BagModel.getInstance().yuanbaoIcon;
                this.setExchangeSilverOfGetSilver(10000);
            }
            
            this.setExchangeSilverOfGood(goodNumber);
            this.controlRadioGroup(this._viewUI.chooseMoney_rag);

        }
        /**
         * @describe  控制RadioGroup
         */
        private controlRadioGroup(rad: Laya.RadioGroup): void {
            rad.selectHandler = new Handler(this, this.onSelectedRadioGroupEvent);
        }
        /**
         * @describe  选择raddioGroup的事件
         */
        private onSelectedRadioGroupEvent(index: number): void {
            if (index == 0) {
                this.onSelctItem(false);
            } else if (index == 1) {
                this.onSelctItem(true);
            }
        }




        ////////////////
        ///事件
        ////////////////

        /**
         * @describe  注册事件
         * @param isShowGold    是否显示金币兑换界面；true：显示金币兑换界面，false: 显示银币兑换界面
         */
        private registerEvent(isShowGold: boolean): void {
            this._viewUI.cancel_btn.on(LEvent.MOUSE_DOWN, this, this.onClickCancelBtnEvent);
            this._viewUI.confirm_btn.on(LEvent.MOUSE_DOWN, this, this.onClickConfirmBtnEvent);
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.onClickCancelBtnEvent);
            if (isShowGold) {
                this._viewUI.exchangeGoldOfExplain_btn.on(LEvent.MOUSE_DOWN, this, this.onClickExchangeGoldOfExplainBtnEvent);
                this._viewUI.exchangeGoldOfNumber_btn.on(LEvent.MOUSE_DOWN, this, this.onClickExchanngeGoldOfNumberBtnEvent);
            } else {
                this._viewUI.exchangeSilverOfExplain_btn.on(LEvent.MOUSE_DOWN, this, this.onClickExchangeSilverOfExplainBtnEvent);
                this._viewUI.exchangeSilverOfNumber_btn.on(LEvent.MOUSE_DOWN, this, this.onClickExchangeSilverOfNumerBtnEvent);
            }
        }

        /**
         * @describe  点击取消按钮事件
         */
        private onClickCancelBtnEvent(): void {
            this.event(CHANGEMONEY_CANL_EVENT);
            this.hide();
        }

        /**
         * @describe  点击兑换按钮
         */
        private onClickConfirmBtnEvent(): void {
            let num;
            if (this._viewUI.exchangeSilver_box.visible) {/** 兑换银币 */
                this.changeType = this._viewUI.chooseMoney_rag.selectedIndex == 0 ? MoneyTypes.MoneyType_HearthStone : MoneyTypes.MoneyType_GoldCoin;
                num = this._viewUI.exchangeSilverOfNumber_lab.text;
            } else if (this._viewUI.exchangeGold_box.visible) {
                num = this._viewUI.exchangeGoldOfNumber_lab.text;
            }
            this.hide();
            num = parseInt(num);
            // let parame: Laya.Dictionary;
            // parame = new Laya.Dictionary();
            // parame.set("changetype", this.changeType);
            // parame.set("changenum", num);
            // this.event(CHANGEMONEY_CONFIRM_EVENT, parame);

            if (this.changeType == MoneyTypes.MoneyType_SupFushi) {/** 元宝兑换金币 */
                if (this.m_yuanbao < num) {
                    if(this.moduleName != "")
                    {
                        game.modules.mainhud.models.HudProxy._instance.event(game.modules.mainhud.models.changeMoneyReturn,this.moduleName);  //元宝不足显示充值
                        this.moduleName = "";
                    }else game.modules.mainhud.models.HudProxy._instance.event(game.modules.mainhud.models.changeMoneyReturn);  //元宝不足显示充值
                } else {
                    RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_HearthStone, MoneyTypes.MoneyType_GoldCoin, num);
                }
            } else if (this.changeType == MoneyTypes.MoneyType_GoldCoin) {/** 金币兑换银币 */
                let globalIcon = game.modules.bag.models.BagModel.getInstance().globalIcon;
                let changeNum = this._viewUI.exchangeSilverOfNumber_lab.text;
                if(parseInt(changeNum) > globalIcon )
                {/** 超出玩家拥有的金币 */
                    let disappearMessageTipsMediator =  new  DisappearMessageTipsMediator(this._app);
                    let prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.SHORTAGEOF_GOLD_COINS);
                    disappearMessageTipsMediator.onShow(prompt);
                    return;
                }
                RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_GoldCoin, MoneyTypes.MoneyType_SilverCoin, num);
            } else if (this.changeType == MoneyTypes.MoneyType_HearthStone) {/** 元宝兑换银币 */
                let yuanbaoIcon = game.modules.bag.models.BagModel.getInstance().yuanbaoIcon;
                let changeNum = this._viewUI.exchangeSilverOfNumber_lab.text;
                if(parseInt(changeNum) > yuanbaoIcon)
                {/** 超出玩家拥有的元宝 */
                    if(this.moduleName != "")
                    {
                        game.modules.mainhud.models.HudProxy._instance.event(game.modules.mainhud.models.changeMoneyReturn,this.moduleName);  //元宝不足显示充值
                        this.moduleName = "";
                    }else game.modules.mainhud.models.HudProxy._instance.event(game.modules.mainhud.models.changeMoneyReturn);  //元宝不足显示充值
                    return;
                }
                RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_HearthStone, MoneyTypes.MoneyType_SilverCoin, num);
            }

           
        }

        // 兑换金币界面
        /**
         * @describe  点击解释按钮事件
         */
        private onClickExchangeGoldOfExplainBtnEvent(): void {
            console.log("----------------------------------------onClickExchangeGoldOfExplainBtnEvent")
            var parame: Dictionary = new Dictionary();
            parame.set("title", 11616);
            parame.set("contentId", 11617)
            this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, parame);

        }
        /**
         * @describe  点击数字按钮事件
         */
        private onClickExchanngeGoldOfNumberBtnEvent(): void {
            this._XiaoJianPanMediator = new game.modules.tips.XiaoJianPanMediator(this._viewUI);
            this.totalNum = "";
            this._XiaoJianPanMediator.show();
        }
        // 兑换银币界面
        /**
         * @describe  点击解释按钮事件
         */
        private onClickExchangeSilverOfExplainBtnEvent(): void {
            console.log("----------------------------------------onClickExchangeSilverOfExplainBtnEvent")
            var parame: Dictionary = new Dictionary();
            parame.set("title", 11615);
            parame.set("contentId", 11613)
            this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, parame);
        }
        /**
         * @describe  点击数字按钮事件
         */
        private onClickExchangeSilverOfNumerBtnEvent(): void {
            this._XiaoJianPanMediator = new game.modules.tips.XiaoJianPanMediator(this._viewUI);
            this.totalNum = "";
            this._XiaoJianPanMediator.show();
        }

        /**
         * 接收小键盘点击的按钮
         * @param num 
         */
        public getNum(num) {
            if (num == -2) {  //点击了ok
                if (this.totalNum == "" || this.totalNum.charAt(0) == "0") {
                    this.totalNum = "1";
                }
            }
            if (num == -1) {  //点击了删除
                this.totalNum = this.totalNum.substring(0, this.totalNum.length - 1);
                if (this.totalNum.length <= 0) {
                    this.totalNum = "0";
                }
            }
            if (this._viewUI.exchangeGold_box.visible) {
                var exchangeGoldOfNumber_lab = this._viewUI.exchangeGoldOfNumber_lab;
                if (num >= 0) {
                    var oneChar = this.totalNum.charAt(0);
                    if (oneChar != '0') {
                        this.totalNum += num.toString();
                    } else {
                        this.totalNum = num.toString();
                    }
                }
                if (this.totalNum.length <= 4) {
                    exchangeGoldOfNumber_lab.text = "";
                    exchangeGoldOfNumber_lab.text = this.totalNum;
                } else {
                    exchangeGoldOfNumber_lab.text = 10000 + "";
                    this.totalNum = 10000 + "";
                    if (num != -2) {/** 只有在点击数字键盘超出的情况下 */
                        let prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.INPUT_MAX_LIMIT);
                        this.DisappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
                        this.DisappearMessageTipsMediator.onShow(prompt);
                    }
                }

                var exchangeGoldGetGold_lab = this._viewUI.exchangeGoldGetGold_lab;
                var duihuanNum = exchangeGoldOfNumber_lab.text;
                var dhNum = parseInt(duihuanNum);
                exchangeGoldGetGold_lab.text = dhNum * 100 + "";
            } else if (this._viewUI.exchangeSilver_box.visible) {
                var exchangeSilverOfNumber_lab = this._viewUI.exchangeSilverOfNumber_lab;
                if (num >= 0) {
                    var oneChar = this.totalNum.charAt(0);
                    if (oneChar != '0') {
                        this.totalNum += num.toString();
                    } else {
                        this.totalNum = num.toString();
                    }
                }
                if (this.totalNum.length <= 4) {
                    exchangeSilverOfNumber_lab.text = "";
                    exchangeSilverOfNumber_lab.text = this.totalNum;
                } else {
                    exchangeSilverOfNumber_lab.text = 10000 + "";
                    this.totalNum = 10000 + "";
                    if (num != -2) {/** 只有在点击数字键盘超出的情况下 */
                        let prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.INPUT_MAX_LIMIT);
                        this.DisappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
                        this.DisappearMessageTipsMediator.onShow(prompt);
                    }
                }

                var exchangeSilverOfGetSilver_lab = this._viewUI.exchangeSilverOfGetSilver_lab;
                var duihuanNum = exchangeSilverOfNumber_lab.text;
                var dhNum = parseInt(duihuanNum);
                if (this._viewUI.chooseMoney_rag.selectedIndex == 0) {
                    exchangeSilverOfGetSilver_lab.text = dhNum * 10000 + "";
                } else if (this._viewUI.chooseMoney_rag.selectedIndex == 1) {
                    exchangeSilverOfGetSilver_lab.text = dhNum * 100 + "";
                }


            }
        }
        ////////////////
        ///UI
        ////////////////

        //兑换金币界面

        /**
         * @describe  设置我的元宝数量
         * @param yuanBaoNumber 元宝数量
         */
        private setExchangeGoldOfMyYuanBao(yuanBaoNumber: number): void {
            let str = game.utils.MoneyU.number2Thousands(yuanBaoNumber);
            this._viewUI.exchangeGoldOfMyYuanBao_lab.text = str;
        }
        /**
         * @describe  设置兑换数量
         * @param num   数量
         */
        private setExchangeGoldOfNumber(num: number): void {
            this._viewUI.exchangeGoldOfNumber_lab.text = num.toString();
        }
        /**
         * @describe  设置获得金币的数量
         * @param goldNumber   数量
         */
        private setExchageGoldOfGetGold(goldNumber: number): void {
            let str = game.utils.MoneyU.number2Thousands(goldNumber);
            this._viewUI.exchangeGoldGetGold_lab.text = str;
        }

        //兑换银币

        /**
         * @describe  设置我的金币(元宝)
         * @param    num    数量
         */
        private setExchangeSilverOfGood(num: number): void {

            let str = game.utils.MoneyU.number2Thousands(num);
            this._viewUI.exchangeSilverOfGood_lab.text = str;
        }
        /**
         * @describe  设置兑换数量  
         * @param  num 数量 
         */
        private setExchangeSilverOfNumber(num: number): void {
            this._viewUI.exchangeSilverOfNumber_lab.text = num.toString();
        }
        /**
         * @describe  设置获得银币
         */
        private setExchangeSilverOfGetSilver(num: number): void {
            let str = game.utils.MoneyU.number2Thousands(num);
            this._viewUI.exchangeSilverOfGetSilver_lab.text = str;
        }


    }
}