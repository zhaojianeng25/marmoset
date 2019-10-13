/**Remind.ui */
// import TeammateViewUI = ui.common.component.TeammateViewUI;
// import wanjiazhuangbeiUI = ui.common.component.wanjiazhuangbeiUI;
// import TeammateLeaderViewUI = ui.common.component.TeammateLeaderViewUI;
module game.modules.commonUI {
   


    export class TeamViewLeaderMediators extends game.modules.UiMediator {

        /**队伍按钮Tips */
        private _viewUI: ui.common.component.TeammateLeaderViewUI;
        /**选中角色的下标 */
        private selectIndex: number = -1;
        /**队伍信息 */
        private roleInfo: Array<any> = [];
        /**玩家装备 */
        private _wanjiazhuangbeiUI: ViewEquipMediator;
        private isInAbsent = false;
        constructor(app: AppBase){
            super(app.uiRoot.general);
            this._viewUI = new ui.common.component.TeammateLeaderViewUI();
            this.uiLayer = app.uiRoot.general;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
            this._app = app;
            this._viewUI.mouseThrough = true;
            this.isCenter = true;
            this._wanjiazhuangbeiUI = new ViewEquipMediator(this._app);
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
            this.chargeMemberState(index);
            
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
            this._viewUI.sendMessage_btn.on(LEvent.MOUSE_DOWN,this,this.chatWith);
            /** 添加为朋友 */
            this._viewUI.addFriend_btn.on(LEvent.MOUSE_DOWN,this,this.addFriend);
            /** 升为队长 */
            this._viewUI.upgradeCaptain_btn.on(LEvent.MOUSE_DOWN,this,this.promotedToCaption);
           
            /** 请离队伍 */
            this._viewUI.leaveTeam_btn.on(LEvent.MOUSE_DOWN,this,this.onPleaseOut);
            /** 查看装备 */
            this._viewUI.watchEquip_btn.on(LEvent.MOUSE_DOWN,this,this.onViewEquip);
           
            /** 遮罩层 */
            this._viewUI.mask_img.on(LEvent.MOUSE_DOWN,this,this.hide);
            game.modules.team.models.TeamProxy.getInstance().once( game.modules.team.models.REFRESH_VIEW_EQUIP,this,this._OpenEquip);
            
        }
        /** 判断队员的状态 */
        private chargeMemberState(index:number)
        {
           let teamMemberStateKeys = TeamModel.getInstance().updateMemberState.keys;
           let tempot = HudModel.getInstance().promptAssembleBack(PromptExplain.RISE_TO_CAPTAIN);
           if(teamMemberStateKeys.length != 0)
           {/** 队员状态需要更新 */
               for (var teamMemberStateKeysIndex = 0; teamMemberStateKeysIndex <teamMemberStateKeys.length; teamMemberStateKeysIndex++) 
               {
                 let  teamMemberState = TeamModel.getInstance().updateMemberState.get(teamMemberStateKeys[teamMemberStateKeysIndex]);
                 if(teamMemberState == TeamMemberState.eTeamAbsent && this.roleInfo[index].roleid == teamMemberStateKeys[teamMemberStateKeysIndex] )
                 {/** 队员是暂离状态 */
                     let tempots = HudModel.getInstance().promptAssembleBack(PromptExplain.RECALL_PLAYER);                     
                     this._viewUI.upgradeCaptain_btn.label = tempots;
                     this.isInAbsent = true;
                 }else if(teamMemberState == TeamMemberState.eTeamNormal && this.roleInfo[index].roleid == teamMemberStateKeys[teamMemberStateKeysIndex] )
                 {/** 归队状态 */
                     this._viewUI.upgradeCaptain_btn.label = tempot;
                     this.isInAbsent = false;
                 }
                   
               }
              
           }else
           { 
               let roleid  = this.roleInfo[index].roleid ;
               let teamMemberBasic:game.modules.team.models.TeamMemberBasicVo = TeamModel.getInstance().teamMemberBasic.get(roleid);
               if( teamMemberBasic && teamMemberBasic.state == TeamMemberState.eTeamAbsent )
               {
                    let tempots = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.RETURN_TO_RANKS);
                    this._viewUI.upgradeCaptain_btn.label = tempots;
                    TeamModel.getInstance().updateMemberState.set(this.roleInfo[index].roleid,this.roleInfo[index].state);
                    this.isInAbsent = true;
               }else
               {
                    this._viewUI.upgradeCaptain_btn.label = tempot;
                    this.isInAbsent = false;
               }
             
           }
        }
        /** 查看装备 */
        private onViewEquip():void
        {
              let roleid  =  this.roleInfo[this.selectIndex].roleid;
              RequesterProtocols._instance.c2s_CGetRoleEquip(roleid,0);
              this.hide();
        }
        /** 请离队伍 */
        private onPleaseOut():void
        {
            let roleid  =  this.roleInfo[this.selectIndex].roleid;
            RequesterProtocols._instance.c2s_CExpelMember(roleid);
            this.hide();
        }
        private  _OpenEquip():void
        {
            this.hide();
           this._wanjiazhuangbeiUI.onShow();
            
           
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
            if(!this.isInAbsent)
            {/** 队员正常，队长执行升为队长功能 */
             RequesterProtocols._instance.c2s_CSetTeamLeader(roleid);
             
            }else if(this.isInAbsent)
            {/** 队员处于离队状态，队长可以执行召回队员的功能 */
                RequesterProtocols._instance.c2s_CCallbackMember(roleid);
            }
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
           
        }


       private setGroupBtnPos(xPos:number,yPos:number):void
       {
           
           let realX= 295;
           let realY= 705;
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