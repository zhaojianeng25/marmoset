/**wanjiazhuangbei.ui */
// import KejuHelpUI = ui.common.ShiLianQiuZhuUI;


module game.modules.keju {
    
    export class KejuHelpMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.ShiLianQiuZhuUI;
        /** 装备的数据 */
        private _equipGameItemListData: any;
        /**装备背包中道具个数 */
        private _equipGameItemListLength: number = 5;
        /** 考题 */
        public questionId: number = -1;
        /** 科举类型 */
        public examtype: number = -1;
        /** 被帮人名称 */
        public rolename: string = "";
        /** 配置表数据 */
		private testQuestionData;
        /** 选项数据 */
		private chooseData:Array<any>;
        constructor(app: AppBase) {
            super(app.uiRoot.general);
            this._viewUI = new ui.common.ShiLianQiuZhuUI();
            this._viewUI.mouseThrough = true;
            this.isCenter = true;
            this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
            this.registerEvent();
            this.eventListener();
        }
        /**注册事件监听 */
        public eventListener(): void {
            // game.modules.sale.models.SaleProxy._instance.on(game.modules.sale.models.SMarketPetTips, this, this.showPetDetails);
        }
        /** 单例对象 */
		public static _instance:KejuHelpMediator;
		public static getInstance(app:AppBase):KejuHelpMediator {
			if(!this._instance) {
				this._instance = new KejuHelpMediator(app);
			}
			return this._instance;
		}
        /** 显示
         * @param question 题目Id
         * @param examtype 考试类型
         * @param rolename 角色名称
         */
        public onShow(question:number,examtype:number,rolename:string): void {
            super.show();
            this.questionId = question;
            this.examtype = examtype;
            this.rolename = rolename;
            this.showTitle();
            /** 刷新四个选项数据 */
			this.refreshchoose();
        }
        /** 刷新四个选项数据 */
		private refreshchoose():void
		{
			this._viewUI.answer_list.vScrollBarSkin = "";	 
			this._viewUI.answer_list.repeatX = 2;
			this._viewUI.answer_list.repeatY = 2;
			this._viewUI.answer_list.array = this.chooseData;
			this._viewUI.answer_list.scrollBar.elasticBackTime = 200;
			this._viewUI.answer_list.scrollBar.elasticDistance = 100;
			this._viewUI.answer_list.renderHandler = new Handler(this,this.onRenderChoose);  
		}
        /** 四个选项渲染 */
		private onRenderChoose(cell:Box,index:number):void
		{
			if( index<0 || index >= this.chooseData.length ) return;
			let answer_btn :Laya.Button =  cell.getChildByName("answer_btn")as Laya.Button;
			let answer_lab :Laya.Label  =  answer_btn.getChildByName("answer_lab")as Laya.Label;
			let chooseIndex = KejuModel.getInstance().getchooseIndex(index); 
			answer_btn.on(LEvent.CLICK,this,this.onSelectChoose,[this.chooseData[index]]);
			if(typeof (chooseIndex) == null) return;
			answer_lab.text =  chooseIndex + " " +this.chooseData[index];
		}
        /** 选中答案发送聊天 
         * @param answer 答案
        */
		private onSelectChoose(answer:string):void
		{
			let type = KejuModel.getInstance().impexamtype;
            let msg =  "#ff6600*split"+this.rolename+"["+answer+"]";
            let displayInfo = [];
            let funType = 0;
            let taskId = 0;
            RequesterProtocols._instance.c2s_CTransChatMessage2Serv(ChannelType.CHANNEL_CLAN,msg,msg,displayInfo,funType,taskId);
            this.hide();
			
		}
        /** 显示题目 */
        private showTitle():void
        {
            if(this.questionId == -1 || this.examtype == -1) return;
            this.testQuestionData =  KejuModel.getInstance().getExamConfigData(this.examtype);
            this.chooseData = this.testQuestionData[this.questionId].optioins;
            this._viewUI.title_lab.text =  this.testQuestionData[this.questionId].name;
            this.randomOption();

        }
        /** 打乱顺序 */
		private randomOption():void
		{
			/** 生成随机1~4的数 */
			let rightAnswers = parseInt((Math.random()*4+1).toString());
			let rightAnswer = this.chooseData[0];
			this.chooseData.splice(rightAnswers,0,rightAnswer);
			this.chooseData.splice(0,1);
		}

        public hide(): void {
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }

       
        /**
         * @describe  注册事件
         */
        private registerEvent(): void {
            /** 发送信息 */
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.closeEvent);


        }


        private closeEvent(): void {
            this.hide();
            if (LoginModel.getInstance().CommonPage != "") {
                ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                LoginModel.getInstance().CommonPage = "";
            }

        }













       
        
    }
}