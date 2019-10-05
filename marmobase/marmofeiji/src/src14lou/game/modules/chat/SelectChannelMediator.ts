/**messageTips.ui */

// import SelectChannelUI = ui.common.XuanZePingDaoUI;

module game.modules.chat {

    export class SelectChannelMediator extends game.modules.UiMediator {

        /**提示界面选择界面 */
        private _viewUI: ui.common.XuanZePingDaoUI;
        private SysConfigDic:any;
        private currentSet:any;
        private teamSet:any;
        private sectsSet:any;
        private familySet:any;
        private worldSet:any;
        private zuduiSet:any;
        constructor(app: AppBase){
            super(app.uiRoot.general);
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
            this._app = app; 
			this._viewUI = new ui.common.XuanZePingDaoUI();
            this._viewUI.mouseThrough = true;
            this.isCenter = true;
            
        }
        public static _instance: SelectChannelMediator;
		public static getInstance(app:AppBase): SelectChannelMediator {
			if (!this._instance) {
				this._instance = new SelectChannelMediator(app);
			}
			return this._instance;
		}
        





        ////////////////
        ///业务逻辑
        ////////////////
        /**
         * @describe  
         * @param    
         * 
         */
        public onShow(): void 
        {
            super.show();
            this.regestEvent(); 
            this.refreshUI();
        }
        public show():void
        {
            super.show();
        }
        public hide(): void {
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }
        /** 刷新UI */
        private refreshUI():void
        {
            this.SysConfigDic = game.modules.setBasics.models.SetBasicsModel.getInstance().SysConfigDic;
            this.currentSet = this.SysConfigDic.get(ChannelSet.SET_CURRENT_CHANNEL);
            this.teamSet = this.SysConfigDic.get(ChannelSet.SET_TEAM_CHANNEL);
            this.sectsSet = this.SysConfigDic.get(ChannelSet.SET_SECTS_CHANNEL);
            this.familySet = this.SysConfigDic.get(ChannelSet.SET_FAMILY_CHANNEL);
            this.worldSet = this.SysConfigDic.get(ChannelSet.SET_WORLD_CHANNEL);
            this.zuduiSet = this.SysConfigDic.get(ChannelSet.SET_ZUDUI_CHANNEL);
            if(this.currentSet != null && this.currentSet == 1 && this._viewUI.current_checkBox.selected == false)
            {
                this._viewUI.current_checkBox.selected = true;
            }else if(this._viewUI.current_checkBox.selected &&  this.currentSet == 0)
            {
                this._viewUI.current_checkBox.selected = false;
            }if(this.teamSet != null && this.teamSet == 1 && this._viewUI.team_checkBox.selected == false)
            {
                this._viewUI.team_checkBox.selected = true;
            }else if(this._viewUI.team_checkBox.selected && this.teamSet == 0)
            {
                this._viewUI.team_checkBox.selected = false;
            } if(this.sectsSet != null && this.sectsSet == 1 && this._viewUI.sects_checkBox.selected == false)
            {
                this._viewUI.sects_checkBox.selected = true;
            }else if(this._viewUI.sects_checkBox.selected && this.sectsSet == 0)
            {
                this._viewUI.sects_checkBox.selected = false;
            }if(this.familySet != null && this.familySet == 1 && this._viewUI.family_checkBox.selected == false )
            {
                this._viewUI.family_checkBox.selected = true;
            }else if(this._viewUI.family_checkBox.selected && this.familySet == 0 )
            {
                this._viewUI.family_checkBox.selected = false;
            }if(this.worldSet != null && this.worldSet == 1 && this._viewUI.world_checkBox.selected == false)
            {
                this._viewUI.world_checkBox.selected = true;
            }else if(this._viewUI.world_checkBox.selected && this.worldSet == 0 )
            {
                this._viewUI.world_checkBox.selected = false;
            }if(this.zuduiSet != null && this.zuduiSet == 1 && this._viewUI.zuDui_checkBox.selected == false)
            {
                this._viewUI.zuDui_checkBox.selected = true;
            }else if(this._viewUI.zuDui_checkBox.selected && this.zuduiSet == 0 )
            {
                this._viewUI.zuDui_checkBox.selected = false;
            }
                
            

           
            
        }
        /** 注册事件和通讯事件监听 */
        private regestEvent():void
        {
            this._viewUI.confirm_btn.on(LEvent.MOUSE_DOWN,this,this.hide);
            this._viewUI.close_bth.on(LEvent.MOUSE_DOWN,this,this.hide);
            // this._viewUI.world_checkBox.on(LEvent.MOUSE_DOWN,this,this.controlWorldMsg,[this._viewUI.world_checkBox]);
            this._viewUI.world_checkBox.clickHandler = new Laya.Handler(this,this.controlWorldMsg);
            this._viewUI.family_checkBox.clickHandler = new Laya.Handler(this,this.controlFamilyMsg);
            this._viewUI.sects_checkBox.clickHandler = new Laya.Handler(this,this.controlSectsMsg);
            this._viewUI.current_checkBox.clickHandler = new Laya.Handler(this,this.controlCurrentMsg);
            this._viewUI.team_checkBox.clickHandler = new Laya.Handler(this,this.controlTeamMsg);
            this._viewUI.zuDui_checkBox.clickHandler = new Laya.Handler(this,this.controlZuDuiMsg);
            // this._viewUI.family_checkBox.on(LEvent.MOUSE_DOWN,this,this.controlFamilyMsg,[this._viewUI.family_checkBox]);
            // this._viewUI.sects_checkBox.on(LEvent.MOUSE_DOWN,this,this.controlSectsMsg,[this._viewUI.sects_checkBox]);
            // this._viewUI.current_checkBox.on(LEvent.MOUSE_DOWN,this,this.controlCurrentMsg,[this._viewUI.current_checkBox]);
            // this._viewUI.team_checkBox.on(LEvent.MOUSE_DOWN,this,this.controlTeamMsg,[this._viewUI.team_checkBox]);
            // this._viewUI.zuDui_checkBox.on(LEvent.MOUSE_DOWN,this,this.controlZuDuiMsg,[this._viewUI.zuDui_checkBox]);
           

        }
        
        /** 世界频道设置 
         * @param 0 关闭接收 @param 1 打开接收 
        */
        private controlWorldMsg():void
        {
            let dictionary: Laya.Dictionary;
            dictionary = new Laya.Dictionary();
            if(this.worldSet == 1 )
            {/** 选中按钮 发送协议——》取消*/
                dictionary.set(ChannelSet.SET_WORLD_CHANNEL,0);
                RequesterProtocols._instance.c2s_CResetSysConfig(dictionary);
            }else if(this.worldSet == 0)
            {/** 取消选中 */
                dictionary.set(ChannelSet.SET_WORLD_CHANNEL,1);
                RequesterProtocols._instance.c2s_CResetSysConfig(dictionary);
            }
             /** 通讯事件 */
            setBasics.models.SetBasicsProxy.getInstance().once(setBasics.models.GET_RESET_SYSCONFIG_INFO_EVENT,this,this.refreshUI);
        }
        /** 帮派频道设置 
         * @param 0 关闭接收 @param 1 打开接收 
        */
        private controlFamilyMsg(box:CheckBox):void
        {
            let dictionary: Laya.Dictionary;
            dictionary = new Laya.Dictionary();
            if(this.familySet == 1)
            {/** 选中按钮 发送协议*/
                dictionary.set(ChannelSet.SET_FAMILY_CHANNEL,0);
                RequesterProtocols._instance.c2s_CResetSysConfig(dictionary);
            }else if(this.familySet == 0)
            {/** 取消选中 */
                dictionary.set(ChannelSet.SET_FAMILY_CHANNEL,1);
                RequesterProtocols._instance.c2s_CResetSysConfig(dictionary);
            }
             /** 通讯事件 */
            setBasics.models.SetBasicsProxy.getInstance().once(setBasics.models.GET_RESET_SYSCONFIG_INFO_EVENT,this,this.refreshUI);
        }
        /** 门派频道设置 
         * @param 0 关闭接收 @param 1 打开接收 
        */
        private controlSectsMsg(box:CheckBox):void
        {
            let dictionary: Laya.Dictionary;
            dictionary = new Laya.Dictionary();
            if(this.sectsSet == 1)
            {/** 选中按钮 发送协议*/
                dictionary.set(ChannelSet.SET_SECTS_CHANNEL,0);
                RequesterProtocols._instance.c2s_CResetSysConfig(dictionary);
            }else if(this.sectsSet == 0)
            {/** 取消选中 */
                dictionary.set(ChannelSet.SET_SECTS_CHANNEL,1);
                RequesterProtocols._instance.c2s_CResetSysConfig(dictionary);
            }
             /** 通讯事件 */
            setBasics.models.SetBasicsProxy.getInstance().once(setBasics.models.GET_RESET_SYSCONFIG_INFO_EVENT,this,this.refreshUI);
        }
        /** 当前频道设置 
         * @param 0 关闭接收 @param 1 打开接收 
        */
        private controlCurrentMsg(box:CheckBox):void
        {
            let dictionary: Laya.Dictionary;
            dictionary = new Laya.Dictionary();
            if(this.currentSet == 1)
            {/** 选中按钮 发送协议*/
                dictionary.set(ChannelSet.SET_CURRENT_CHANNEL,0);
                RequesterProtocols._instance.c2s_CResetSysConfig(dictionary);
            }else if(this.currentSet == 0)
            {/** 取消选中 */
                dictionary.set(ChannelSet.SET_CURRENT_CHANNEL,1);
                RequesterProtocols._instance.c2s_CResetSysConfig(dictionary);
            }
             /** 通讯事件 */
            setBasics.models.SetBasicsProxy.getInstance().once(setBasics.models.GET_RESET_SYSCONFIG_INFO_EVENT,this,this.refreshUI);
        }
        /** 队伍频道设置 
         * @param 0 关闭接收 @param 1 打开接收 
        */
        private controlTeamMsg(box:CheckBox):void
        {
            let dictionary: Laya.Dictionary;
            dictionary = new Laya.Dictionary();
            if(this.teamSet == 1)
            {/** 选中按钮 发送协议*/
                dictionary.set(ChannelSet.SET_TEAM_CHANNEL,0);
                RequesterProtocols._instance.c2s_CResetSysConfig(dictionary);
            }else if(this.teamSet == 0)
            {/** 取消选中 */
                dictionary.set(ChannelSet.SET_TEAM_CHANNEL,1);
                RequesterProtocols._instance.c2s_CResetSysConfig(dictionary);
            }
             /** 通讯事件 */
            setBasics.models.SetBasicsProxy.getInstance().once(setBasics.models.GET_RESET_SYSCONFIG_INFO_EVENT,this,this.refreshUI);
        }
        /** 组队频道设置 
         * @param 0 关闭接收 @param 1 打开接收 
        */
        private controlZuDuiMsg(box:CheckBox):void
        {
            let dictionary: Laya.Dictionary;
            dictionary = new Laya.Dictionary();
            if(this.zuduiSet == 1)
            {/** 选中按钮 发送协议*/
                dictionary.set(ChannelSet.SET_ZUDUI_CHANNEL,0);
                RequesterProtocols._instance.c2s_CResetSysConfig(dictionary);
            }else if(this.zuduiSet == 0)
            {/** 取消选中 */
                dictionary.set(ChannelSet.SET_ZUDUI_CHANNEL,1);
                RequesterProtocols._instance.c2s_CResetSysConfig(dictionary);
            }
             /** 通讯事件 */
            setBasics.models.SetBasicsProxy.getInstance().once(setBasics.models.GET_RESET_SYSCONFIG_INFO_EVENT,this,this.refreshUI);
        }
        
        


        ////////////////
        ///UI
        ////////////////

        
       

       

        
    }
}