/**Remind.ui */
// import TeammateViewUI = ui.common.component.TeammateViewUI;
// import wanjiazhuangbeiUI = ui.common.component.wanjiazhuangbeiUI;
// import TeammateMainViewUI = ui.common.component.TeammateMainViewUI;
module game.modules.commonUI {
    export class TeamViewMainMediators extends game.modules.UiMediator {

        /**队伍按钮Tips */
        private _viewUI: ui.common.component.TeammateMainViewUI;
        /**选中角色的下标 */
        private selectIndex: number = -1;
        /**玩家装备 */
        private _wanjiazhuangbeiUI: ViewEquipMediator;
        private roleInfo: Array<any> = [];
        constructor(app: AppBase){
            super(app.uiRoot.general);
            this._viewUI = new ui.common.component.TeammateMainViewUI();
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
           
            /** 查看装备 */
            this._viewUI.watchEquip_btn.on(LEvent.MOUSE_DOWN,this,this.onViewEquip);
          
            this._viewUI.mask_img.on(LEvent.MOUSE_DOWN,this,this.hide);
            game.modules.team.models.TeamProxy.getInstance().once( game.modules.team.models.REFRESH_VIEW_EQUIP,this,this._OpenEquip);
            
        }
        /** 查看装备 */
        private onViewEquip():void
        {
              let roleid  =  this.roleInfo[this.selectIndex].roleid;
              RequesterProtocols._instance.c2s_CGetRoleEquip(roleid,0);
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
           
        }


       private setGroupBtnPos(xPos:number,yPos:number):void
       {
           
           let realX= 295;
           let realY= 815;
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