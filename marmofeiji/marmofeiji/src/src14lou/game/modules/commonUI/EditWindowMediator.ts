/**messageTips.ui */

// import EditWindow = ui.common.component.EditWindowUI;

module game.modules.commonUI {

    export class EditWindowMediator extends game.modules.UiMediator {

        /**提示界面选择界面 */
        private _viewUI: ui.common.component.EditWindowUI;
        private DisappearMessageTipsMediator :DisappearMessageTipsMediator;
        /** 副本名称 */
        private targetName:string;
        /** 最小级 */
        private minLevel:number;
        /** 最大级 */
        private maxLevel:number;
        constructor(uiLayer: Sprite,app: AppBase)
        {
            super(uiLayer);
            this.uiLayer = app.uiRoot.general;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
            this._app = app; 
			this._viewUI = new ui.common.component.EditWindowUI();
            this.DisappearMessageTipsMediator = new DisappearMessageTipsMediator(app);
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
        public onShow(targetName:string,minlevel:number,maxlevel:number): void {
            this.targetName = targetName;
            this.minLevel = minlevel;
            this.maxLevel = maxlevel;
            this.registEvent();
            this.iniUI();
           
            super.show();
        }

        public hide(): void {
            mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }
        
        /**
         * @describe   初始化ui控件
         *    
         */
        private iniUI() 
        {
            this.refreshUI();
            this._viewUI.text_Input.multiline   = true;
            this._viewUI.text_Input.maxChars    = 24;
            this._viewUI.text_Input.prompt      = "点击这里输入消息内容";
            this._viewUI.text_Input.promptColor ="#ffffff";
        }
        /** 每次点击刷新单选框*/
        private refreshUI():void
        {
            this._viewUI.zuDui_checkBox.selected   = false;
            this._viewUI.current_checkBox.selected = false;
            this._viewUI.family_checkBox.selected  = false;
        }
        /** 注册事件 和通信事件 */
        private registEvent():void
        {
            this._viewUI.closeBtn_btn.on(LEvent.MOUSE_DOWN,this,this.closeEditWindow);
            this._viewUI.zuDui_checkBox.on(LEvent.MOUSE_DOWN,this,this.onTeamCheckBox);
            this._viewUI.family_checkBox.on(LEvent.MOUSE_DOWN,this,this.onTeamCheckBox);
            this._viewUI.current_checkBox.on(LEvent.MOUSE_DOWN,this,this.onTeamCheckBox);
            this._viewUI.clear_btn.on(LEvent.MOUSE_DOWN,this,this.clearChars);
            this._viewUI.sendBtn_btn.on(LEvent.MOUSE_DOWN,this,this.sendContent);
            game.modules.team.models.TeamProxy.getInstance().on(game.modules.team.models.ONE_KEY_YELL_SUCC,this,this.hide);
            

        }
        /** 发送事件 */
        private sendContent():void
        {
            let channel :number = -1;
            let inputText =  this._viewUI.text_Input.text;
            switch (true) {
                case this._viewUI.zuDui_checkBox.selected:
                    channel = ChannelType.TEAM_APPLY;      break;
                case this._viewUI.current_checkBox.selected:
                    channel = ChannelType.CURRENR_CHANNEL; break;
                case this._viewUI.family_checkBox.selected:
                    channel = ChannelType.FAMILY_CHANNEL;  break;
                default:   break;
            }
            if(channel != -1)
            {
//<RQ t="[精英副本-废矿(30级)（1/5），等级32-36开组了!" teamid="266241" c="ff50321a"></RQ><T t="成败在此以刺激]" c="ff50321a"></T><R t="[申请加入]" leaderid="4280321" c="FFFFFF00"></R>

                 let realInput =  "<span style='color:#f6f6f4;fontSize:24'>"+this.targetName+"</span>";
                 let teamdata = TeamModel.getInstance().TeamRoleInfoStorage;
                 let SCreateTeamVo = TeamModel.getInstance().screateTeam as team.models.SCreateTeamVo;
                 let teamid = SCreateTeamVo.teamid;
                 realInput += "<span style='color:#f6f6f4;fontSize:24'>("+teamdata.length+"/5)</span>";
                 realInput += "<span style='color:#f6f6f4;fontSize:24'>等级"+this.minLevel+"-"+this.maxLevel+"开组了</span>";
                 realInput += "<span style='color:#f6f6f4;fontSize:24'>"+inputText+"</span>";
                 realInput += "<span style='color:#f6f6f4;fontSize:24'>[申请加入]"+teamdata[0].roleid+"</span>";
                 let data = this.targetName + "#,"+teamdata.length+"#,"+ this.minLevel+"#,"+this.maxLevel+"#,"+inputText+"#,"+teamdata[0].roleid +"#,"+teamid;
                 RequesterProtocols._instance.c2s_COneKeyTeamMatch(channel,data);
            }else
            {
                let data = "请选择输入频道"
                this.DisappearMessageTipsMediator.onShow(data);
            }
           

        }
        /** 清空字符串 */
        private clearChars():void
        {
            this._viewUI.text_Input.text = "";
        }
        /** 点击组队复选框 */
        private onTeamCheckBox():void
        {
            this.refreshUI();
        }
        private closeEditWindow():void
        {
            
            if(LoginModel.getInstance().CommonPage != "")
            {
                ModuleManager.show(LoginModel.getInstance().CommonPage,this._app);
                LoginModel.getInstance().CommonPage = "";
            }
            this.hide();
        }


        ////////////////
        ///UI
        ////////////////

        private hideTips():void
        {
           
        }
       


        ////////////////
        ///事件
        ////////////////

        
    }
}