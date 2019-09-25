/**messageTips.ui */

// import BattleInstructionUI = ui.common.TeamEditCommandUI;

module game.modules.commonUI {

    export class BattleInstructionMediator extends game.modules.UiMediator {

        /**提示界面选择界面 */
        private _viewUI: ui.common.TeamEditCommandUI;
        private content :Array<any> = [{label:"hhh0"},{label:"hhh1"},{label:"hhh2"},{label:"hhh3"},{label:"hhh4"},{label:"添加"},];
        private py;
        constructor(uiLayer: Sprite,app: AppBase){
            super(uiLayer);
            this.uiLayer = app.uiRoot.general;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
            this._app = app; 

			this._viewUI = new ui.common.TeamEditCommandUI()
            this._viewUI.mouseThrough = true;
            this.isCenter = true;
            
        }
        





        ////////////////
        ///业务逻辑
        ////////////////
        /**
         * @describe  显示提示UI
         * @param    
         * 
         */
        public onShow(): void 
        {
            super.show();
            this.onLoad(); 
        }

        public hide(): void {
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }
       
        /**
         * @describe  
         * @param  data 提示语句   
         */
        private onLoad() 
        {
           this.regestEvent();
           this.getData();
           this.InitUI(0);
           this._viewUI.instruction_img.visible =  false;
        }
        private regestEvent():void
        {
            // game.modules.chat.models.ChatProxy.getInstance().on(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS,this,this.onShow);
            this._viewUI.close0_btn.on(LEvent.MOUSE_DOWN,this,this.hideView);
            this._viewUI.close1_btn.on(LEvent.MOUSE_DOWN,this,this.hideInstruction);
            this._viewUI.difang_btn.on(LEvent.MOUSE_DOWN,this,this.InitUI,[0]);
            this._viewUI.wofang_btn.on(LEvent.MOUSE_DOWN,this,this.InitUI,[1]);
        }
        private InitUI(camp:number):void
        {
            if(camp == 0)
            {
                this._viewUI.commandList_list.visible = true;
                this._viewUI.we_commandList_list.visible = false;
            }else if(camp == 1)
            {
                this._viewUI.commandList_list.visible = false;
                this._viewUI.we_commandList_list.visible = true;
            }
        
        }
        


        ////////////////
        ///UI
        ////////////////

        private hideInstruction():void
        {
            if(this._viewUI.instruction_img.visible)
            {
                this._viewUI.instruction_img.visible =  false;
            }
        }
       private hideView():void
       {
           if(LoginModel.getInstance().CommonPage != "")
           {
               ModuleManager.show(LoginModel.getInstance().CommonPage,this._app);
               LoginModel.getInstance().CommonPage = "";
           }
           this.hide();
       }
       private getData():void
       {
            this._viewUI.commandList_list.vScrollBarSkin = "";
			this._viewUI.commandList_list.repeatX = 2;
			this._viewUI.commandList_list.repeatY = 3;
			this._viewUI.commandList_list.array = this.content;
			this._viewUI.commandList_list.scrollBar.elasticBackTime = 200;
			this._viewUI.commandList_list.scrollBar.elasticDistance = 100;
			this._viewUI.commandList_list.renderHandler = new Handler(this,this.onRenderBattleInstruction);  
       }

        private onRenderBattleInstruction(cell:Box,index:number):void
        {
            if(index > this.content.length-1) return;
            let instructipnBtn :Laya.Button = cell.getChildByName("command_btn") as Laya.Button;
            instructipnBtn.label = this.content[index].label;
            if(index == this.content.length -1)
            {
                instructipnBtn.on(LEvent.CLICK,this,this.openInstruction);
            }
        }
        private openInstruction():void
        {
            if(!this._viewUI.instruction_img.visible)
            {
                this._viewUI.instruction_img.visible =  true;
            }
        }

        
    }
}