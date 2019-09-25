/**Remind.ui */
// import ReminUI = ui.common.component.RemindUI;

module game.modules.commonUI {
    /**右边按钮(确定、重试)接受的事件*/
    export const RIGHT_BUTTON_EVENT: string = "rightButtonEvent";
    /**左边按钮接受的事件 */
    export const LEFT_BUTTON_EVENT: string = "leftButtonEvent";

    export class RemindViewMediator extends game.modules.UiMediator {
        /**提示界面选择界面 */
        private _viewUI: ui.common.component.RemindUI;
        /** 当前时间 */
        private currentSecond: number;
        /**提示界面的单例 */
        public static _instance: RemindViewMediator;
        constructor(uiLayer: Sprite,app: AppBase){
            super(uiLayer);
            this.uiLayer = app.uiRoot.general;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
            this._app = app; 


			this._viewUI = new ui.common.component.RemindUI()
            this._viewUI.mouseThrough = false;
            // 默认居中
            this.isCenter = true;
        }
        
        public static getInstance(uiLayer: Sprite,app: AppBase): RemindViewMediator {
            if (!this._instance) {
                this._instance = new RemindViewMediator(uiLayer,app);
            }
            return this._instance;
        }


        ////////////////
        ///业务逻辑
        ////////////////
        /**
         * @describe  显示提示UI
         * @param prompt   提示语句
         * @param rightButtonName 右边按钮名称，默认是重试
         */
        public onShow(prompt: string,rightButtonName?: string,leftButtonName?:string): void {

            this.onLoad(prompt,rightButtonName,leftButtonName);
            this._viewUI.tips_html.visible = false
            this._viewUI.tip_lab.visible = true
            super.show();
        }
        //html格式的显示
        public onhtmlShow(prompt: string,rightButtonName?: string,leftButtonName?:string):void{
            this.onhtmlLoad(prompt,rightButtonName,leftButtonName);
            this._viewUI.tips_html.visible = true
            this._viewUI.tip_lab.visible = false
            super.show();
        }
        /** 特殊情况，计时需要 */
        public addSecond(time:number):void
        {
            this.currentSecond = time;
            Laya.timer.loop(1000,this,this.updataTime);
            

        }
        private updataTime():void
        {
            this.currentSecond--;
            if(this.currentSecond < 0)
            {
                Laya.timer.clear(this,this.updataTime);
                this.hide();
            }else{
                let prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.REJECT);
                this._viewUI.cancel_btn.label = prompt+"("+this.currentSecond+")";
            }
            
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
        private onLoad(prompt: string,rightButtonName?: string,leftButtonName?: string) {
            this.setPromptString(prompt);
            this.setButtonName(rightButtonName,leftButtonName);
            // 注册事件
            this._viewUI.cancel_btn.on(LEvent.MOUSE_DOWN,this,this.onClickLeftBtnEvent);
            this._viewUI.retry_btn.on(LEvent.MOUSE_DOWN,this,this.onClickRightBtnEvent);
        }
        private onhtmlLoad(prompt: string,rightButtonName?: string,leftButtonName?: string){
            this.setPrompthtmlString(prompt);
            this.setButtonName(rightButtonName,leftButtonName);
            // 注册事件
            this._viewUI.cancel_btn.on(LEvent.MOUSE_DOWN,this,this.onClickLeftBtnEvent);
            this._viewUI.retry_btn.on(LEvent.MOUSE_DOWN,this,this.onClickRightBtnEvent);
        }
        ////////////////
        ///UI
        ////////////////

        /**
         * @describe  设置提示语
         * @param prompt   提示语
         */

        public setPromptString(prompt: string): void {
            this._viewUI.tip_lab.text = prompt;
        }
        public setPrompthtmlString(prompt: string):void{
            this._viewUI.tips_html.innerHTML = prompt
            this._viewUI.tips_html.style.align ="center"   
            this._viewUI.tips_html.style.valign ="middle"   
        }
        /**
         * @describe  设置右侧按钮的名称
         * @param btnName   按钮名称
         */
        public setButtonName(righttBtnName?: string,leftBtnName?:string): void {
            if (typeof(righttBtnName) != "undefined") 
            {
                this._viewUI.retry_btn.label = righttBtnName;
            }
            if(typeof(leftBtnName) != "undefined")
            {
                this._viewUI.cancel_btn.label = leftBtnName;
            }
        }



        ////////////////
        ///事件
        ////////////////

        /**
         * @describe  左侧按钮点击事件
         */
        private onClickLeftBtnEvent(): void {
            this.event(commonUI.LEFT_BUTTON_EVENT);
             this.hide();
        }

        /**
         * @describe  右侧按钮事件
         */
        private onClickRightBtnEvent(): void {
            this.event(commonUI.RIGHT_BUTTON_EVENT);
            this.hide();
        }
    }
}