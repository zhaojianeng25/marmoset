/**Remind.ui */
// import TeammateViewUI = ui.common.component.TeammateViewUI;
// import wanjiazhuangbeiUI = ui.common.component.wanjiazhuangbeiUI;
// import TeammateMyselfViewUI = ui.common.component.TeammateMyselfViewUI;
module game.modules.commonUI {
   


    export class TeamViewMyselfMediators extends game.modules.UiMediator {

        /**队伍按钮Tips */
        private _viewUI: ui.common.component.TeammateMyselfViewUI;
         /**选中角色的下标 */
        private selectIndex: number = -1;
         /**队伍信息 */
        private roleInfo: Array<any> = [];
        /** 队员处于离队 */
        private inLeaveState =  false;
        constructor(app: AppBase){
            super(app.uiRoot.general);
            this._viewUI = new ui.common.component.TeammateMyselfViewUI();
            this.uiLayer = app.uiRoot.general;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
            this._app = app;
            this._viewUI.mouseThrough = true;
            this.isCenter = true;
            // this._wanjiazhuangbeiUI = new ViewEquipMediator(app.uiRoot.general,this._app);
        }
        





        ////////////////
        ///业务逻辑
        ////////////////
        /**
         * @describe  显示提示UI
         * @param xPos   x轴位置 @param yPos   y轴位置 @param index   队伍中该对象的位置
         * 
         */
        public onShow(xPos:number,yPos:number,index,roleinfo:Array<any>): void {
            super.show();
            this.roleInfo = roleinfo;
            this.selectIndex = index;
            this.registerEvent();
            this.setGroupBtnPos(xPos,yPos);
            this.chargeIndex(index);
            
        }

        public hide(): void {
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }
       
       /** 根据传过来的坐标判断按钮的使用 */
       private chargeIndex(index:number):void
       {
        //    let roleid = LoginModel.getInstance().roleDetail.roleid;
           let capatinId = this.roleInfo[0].roleid ;
           let teamMemberStateKeys = TeamModel.getInstance().updateMemberState.keys;
           let tempot = HudModel.getInstance().promptAssembleBack(PromptExplain.TEMPORARY_TO_TEAM);
           if(teamMemberStateKeys.length != 0)
           {/** 队员状态需要更新 */
               for (var teamMemberStateKeysIndex = 0; teamMemberStateKeysIndex <teamMemberStateKeys.length; teamMemberStateKeysIndex++) 
               {
                 let  teamMemberState = TeamModel.getInstance().updateMemberState.get(teamMemberStateKeys[teamMemberStateKeysIndex]);
                 if(teamMemberState == TeamMemberState.eTeamAbsent && this.roleInfo[index].roleid == teamMemberStateKeys[teamMemberStateKeysIndex] )
                 {/** 队员是暂离状态 */
                     let tempots = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.RETURN_TO_RANKS);
                     this._viewUI.LeaveSoon_btn.label = tempots;
                    this.inLeaveState = true;
                 }else if(teamMemberState == TeamMemberState.eTeamNormal && this.roleInfo[index].roleid == teamMemberStateKeys[teamMemberStateKeysIndex] )
                 {/** 归队状态 */
                    
                     this._viewUI.LeaveSoon_btn.label = tempot;
                     this.inLeaveState = false;
                 }
                   
               }
              
           }else
           { 
               let roleid  = this.roleInfo[index].roleid ;
               let teamMemberBasic:game.modules.team.models.TeamMemberBasicVo = TeamModel.getInstance().teamMemberBasic.get(roleid);
               if( teamMemberBasic && teamMemberBasic.state == TeamMemberState.eTeamAbsent )
               {
                    let tempots = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.RETURN_TO_RANKS);
                    this._viewUI.LeaveSoon_btn.label = tempots;
                    TeamModel.getInstance().updateMemberState.set(this.roleInfo[index].roleid,this.roleInfo[index].state);
                    this.inLeaveState = true;
               }else
               {
                   this._viewUI.LeaveSoon_btn.label = tempot;
                   this.inLeaveState = false;
               }
              
           }
           
           
       }

        /**
         * @describe  注册事件
         */
        private registerEvent(): void {
           
            /** 离开队伍 */
            this._viewUI.leaveTeam_btn.on(LEvent.MOUSE_DOWN,this,this.onLeaveTeam);
            /** 暂离队伍 */
            this._viewUI.LeaveSoon_btn.on(LEvent.MOUSE_DOWN,this,this.onLeaveSoon);
            /** 遮罩层 */
            this._viewUI.mask_img.on(LEvent.MOUSE_DOWN,this,this.hide);
            
        }
        /** 暂离队伍 */
        private onLeaveSoon():void
        {
             if(!this.inLeaveState)
             {/** 离队请求 */
                RequesterProtocols._instance.c2s_CAbsentReturnTeam(TeamMemberApply.LEAVE_SOON);
                this.hide();
             }else
             {/** 归队请求 */
                RequesterProtocols._instance.c2s_CAbsentReturnTeam(TeamMemberState.eTeamAbsent);
                this.hide();
             }
             
        }
        /** 离开队伍 */
        private onLeaveTeam():void
        {
            RequesterProtocols._instance.c2s_CQuitTeam();
            this.hide();
        }
        private  _OpenEquip():void
        {
            this.hide();
            
            
           
        }
        /** 调整站位 */
        private adjustmentStand():void
        {
            if(this.selectIndex !=0)
            game.modules.team.models.TeamModel.getInstance().swapPosIndex =  this.selectIndex;
            game.modules.team.models.TeamProxy.getInstance().event( game.modules.team.models.REFRESH_FRIEND_ACCEPT_TEAM);
            this.hide();
        }
        /** 升为队长 */
        private promotedToCaption():void
        {
            let roleid  =  this.roleInfo[this.selectIndex].roleid;
            RequesterProtocols._instance.c2s_CSetTeamLeader(roleid);
            // game.modules.team.models.TeamModel.getInstance().entrustCaptain = roleid;
            this.hide();
        }
        /** 委任指挥 */
        private setCommander():void
        {
            /** 指挥者Id */
            let commanderId = game.modules.team.models.TeamModel.getInstance().commanderRoleid;
            /** 队长Id */
            let capatinId = this.roleInfo[0].roleid ;
            /** 选中的角色Id */
            let roleid  =  this.roleInfo[this.selectIndex].roleid;
            /** 如果指挥的玩家存在并且不是队长 (取消指挥) */
            if(typeof(commanderId) != "undefined" && commanderId != capatinId )
            {
                RequesterProtocols._instance.c2s_CSetCommander(1,capatinId);
            }else {/** 委任指挥 */
                 RequesterProtocols._instance.c2s_CSetCommander(0,roleid);
            }
            this.hide();
           
        }
        /** 结为好友 */
        private addFriend():void
        {
            if(this.selectIndex != -1)
            {
            
              let roleid  =  this.roleInfo[this.selectIndex].roleid;
              RequesterProtocols._instance.c2s_CRequestAddFriend(roleid);
            }
            this.hide();
        }

        /** 聊天 */
        private chatWith():void
        {
            ModuleManager.show(ModuleNames.FRIEND,this._app);
            this.hide();
            ModuleManager.hide(ModuleNames.Team);
            LoginModel.getInstance().CommonPage = "team";
        }


       private setGroupBtnPos(xPos:number,yPos:number):void
       {
           
           let realX = 295 ;
           let realY = 880;
           this._viewUI.groupBtn_btn.pos(realX,realY);

       }
       
        

        




        ////////////////
        ///事件
        ////////////////

        /**
         * @describe  银币补助界面，点击使用金币代替按钮事件
         */
        private onClickUseGoldBtnEvent(): void {
            this.event(commonUI.USE_GOLD_EXCHANGE_EVENT);
            
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