
module game.modules.friend {
    /** 人物弹窗类  */
    export class ContactCharacterMediator extends game.modules.UiMediator {
        /**当前UI界面 */
        private _viewUI: ui.common.component.ContactCharacterUI;
        /**查看装备界面 */
        private _ViewEquipMediator: game.modules.commonUI.ViewEquipMediator;
        /**举报界面 */
        private _JuBaoMediator: JuBaoMediator;
        /** 场景角色状态 */
        private rolestate:number = 0;
        constructor(uiLayer: Sprite, app?: AppBase) {
            super(uiLayer);
            this._viewUI = new ui.common.component.ContactCharacterUI();
            this._app = app;
            this._JuBaoMediator = new JuBaoMediator(this._viewUI);
            this.isCenter = false;
        }
        /**注册事件监听 */
        public eventListener(): void {
            //监听装备刷新事件
            game.modules.team.models.TeamProxy.getInstance().once(game.modules.team.models.REFRESH_VIEW_EQUIP, this, this._OpenEquip);
            //监听玩家请求的其他玩家的组队情况
            models.FriendProxy.getInstance().on(models.SAnswerRoleTeamState_EVENT, this, this.onAnswerRoleTeamState);
            //监听玩家信息变化
            models.FriendProxy.getInstance().on(models.SRequestUpdateRoleInfo_EVENT, this, this.onRequestUpdateRoleInfo);
        }
        /**返回玩家信息 */
        public onRequestUpdateRoleInfo(e: any): void {
            var _school = createrole.models.LoginModel.getInstance().schoolInfo;//z职业配置表中的内容            
            var data: hanlder.S2C_SRequestUpdateRoleInfo = models.FriendModel.getInstance().SRequestUpdateRoleInfoData.get("data");
            this._viewUI.name_lab.text = data.FriendInfoBean.name;//名字
            this._viewUI.level_lab.text = data.FriendInfoBean.roleLevel.toString();//等级
            this._viewUI.touXiang_img.skin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + data.FriendInfoBean.shape) + ".png";//头像
            this.setFriendZhiyeImg(data.FriendInfoBean.school);//职业图标
            this._viewUI.account_lab.text = data.FriendInfoBean.roleId.toString();//账号id
            this._viewUI.menPaiName_lab.text = _school[data.FriendInfoBean.school]["name"];//职业名
            //是否有帮派
            this.onUpdataClanInfo(data.FriendInfoBean, false);
            var roledata = [data.FriendInfoBean.roleId, data.FriendInfoBean.name, data.FriendInfoBean.roleLevel, data.FriendInfoBean.shape, this._viewUI.tubiao_img.skin, data.FriendInfoBean.online];//当前好友的信息
            this._viewUI.watchEquip_btn.on(LEvent.MOUSE_DOWN, this, this.watchEquip, [data.FriendInfoBean.roleId]);
            this._viewUI.giveGift_btn.on(LEvent.MOUSE_DOWN, this, this.giveGift, [roledata]);
            this._viewUI.tipOff_btn.on(LEvent.MOUSE_DOWN, this, this.tipOff, [data.FriendInfoBean.name]);
            this._viewUI.fight_btn.on(LEvent.MOUSE_DOWN, this, this.fight, [data.FriendInfoBean.roleId]);
            this._viewUI.transMessage_btn.on(LEvent.MOUSE_DOWN, this, this.transMessage, [data.FriendInfoBean]);

        }
        /** 刷新查看人物属性时所显示的帮派相关信息
         * @param data 角色信息数据
         * @param isLevelRank 判断是否从等级排行榜而来的
         */
        private onUpdataClanInfo(data:any, isLevelRank:boolean):void{
            // let currRoleLevel = HudModel.getInstance().levelNum;//获得人物角色当前等级
            // if(currRoleLevel < unlock.BANGPAI_LEVEL) {
            //     this._viewUI.inviteMeet_btn.visible = false;
            //     this._viewUI.fight_btn.y = 183;
            //     return;
            // }
            // else{
            //     this._viewUI.inviteMeet_btn.visible = true;
            //     this._viewUI.fight_btn.y = 245;
            // }
            var roleid;
            if(isLevelRank){
                roleid = data.roleid;
            }
            else{
                roleid = data.roleId;
            }
            if (data.factionname != "" && data.factionname != undefined) {
                this._viewUI.inviteMeet_btn.label = "申请入会";
                this._viewUI.isBangPai_lab.text = data.factionname;//帮派名
                this._viewUI.inviteMeet_btn.off(LEvent.MOUSE_DOWN, this, this.inviteMeet);
                this._viewUI.inviteMeet_btn.on(LEvent.MOUSE_DOWN, this, this.applyJiaRuClan, [data.factionid]);
            }
            else {
                this._viewUI.inviteMeet_btn.label = "邀请入会";
                this._viewUI.isBangPai_lab.text = tips.models.TipsModel.getInstance().cstringResConfigData[FriendEnum.NOTHING].msg;
                this._viewUI.inviteMeet_btn.off(LEvent.MOUSE_DOWN, this, this.applyJiaRuClan);
                this._viewUI.inviteMeet_btn.on(LEvent.MOUSE_DOWN, this, this.inviteMeet, [roleid]);
            }
        }
        /** 专门处理排行榜那边等级榜查看玩家信息所返回的玩家信息 */
        public onUpdataRoleInfo(roleInfoData: any, onLine:number): void {
            var _school = createrole.models.LoginModel.getInstance().schoolInfo;//z职业配置表中的内容  
            this._viewUI.name_lab.text = roleInfoData.rolename;
            this._viewUI.level_lab.text = roleInfoData.level;
            this._viewUI.touXiang_img.skin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + roleInfoData.shape) + ".png";//头像
            this.setFriendZhiyeImg(roleInfoData.school);//职业图标
            this._viewUI.account_lab.text = roleInfoData.roleid.toString();//账号id
            this._viewUI.menPaiName_lab.text = _school[roleInfoData.school]["name"];//职业名
            this.onUpdataClanInfo(roleInfoData, true);
            var _roledata = [roleInfoData.roleid, roleInfoData.rolename, roleInfoData.level, roleInfoData.shape, this._viewUI.tubiao_img.skin, onLine];
            this._viewUI.watchEquip_btn.on(LEvent.MOUSE_DOWN, this, this.watchEquip, [roleInfoData.roleid]);
            this._viewUI.giveGift_btn.on(LEvent.MOUSE_DOWN, this, this.giveGift, [_roledata]);
            this._viewUI.tipOff_btn.on(LEvent.MOUSE_DOWN, this, this.tipOff, [roleInfoData.rolename]);
            this._viewUI.fight_btn.on(LEvent.MOUSE_DOWN, this, this.fight, [roleInfoData.roleid]);
            this._viewUI.transMessage_btn.on(LEvent.MOUSE_DOWN, this, this.transMessage, [roleInfoData]);
        }
        /**返回玩家请求的其他玩家的组队情况 */
        public onAnswerRoleTeamState(e: any): void {
            var data: hanlder.S2C_SAnswerRoleTeamState = models.FriendModel.getInstance().SAnswerRoleTeamStateData.get("data");
            //根据组队状态显示不同按钮文本
            switch (data.teamstate) {
                case FriendEnum.NO_TEAM:
                    this._viewUI.inviteTeam_btn.label = tips.models.TipsModel.getInstance().cstringResConfigData[FriendEnum.INVITE_TEAM].msg;
                    break;
                case FriendEnum.HAVE_TEAM:
                    this._viewUI.inviteTeam_btn.label = tips.models.TipsModel.getInstance().cstringResConfigData[FriendEnum.APPLY_TEAM].msg;
                    break;
            }
            this._viewUI.inviteTeam_btn.on(LEvent.MOUSE_DOWN, this, this.inviteTeam, [data.teamstate, data.roleid]);
        }
        /**发送消息
         * @param roleInfoData 角色信息数据
         */
        public transMessage(roleInfoData:any): void {
			ModuleManager.show(ModuleNames.FRIEND, this._app);
            //发送消息事件
            models.FriendProxy.getInstance().event(models.transMessage_EVENT, [roleInfoData]);
            this._viewUI.role_box.visible = false;
            this._viewUI.yincang_box.visible = false;
        }
        /**邀请入队 */
        public inviteTeam(key: number, id: number): void {
            switch (key) {
                case FriendEnum.NO_TEAM:
                    RequesterProtocols._instance.c2s_CCreateTeam();//角色请求建立队伍
                    RequesterProtocols._instance.c2s_CInviteJoinTeam(id, 0);//邀请对方组队
                    break;
                case FriendEnum.HAVE_TEAM:
                    RequesterProtocols._instance.c2s_CRequestJoinTeam(id);//申请入队
                    break;
            }
            this._viewUI.role_box.visible = false;
            this._viewUI.yincang_box.visible = false;
        }
        /**打开查看装备界面 */
        private _OpenEquip(): void {
            this._ViewEquipMediator = new game.modules.commonUI.ViewEquipMediator(this._app);
            this._ViewEquipMediator.onShow();
        }
        /**注册事件 */
        private registerEvent(): void {
            this._viewUI.yincang_box.on(LEvent.MOUSE_DOWN, this, this.hide);
        }
        /**初始化*/
        public onShow(xPos: number, yPos: number, key: number,state:number = 0): void {
            this.show();
            this.registerEvent();
            this.eventListener();
            this._viewUI.role_box.visible = true;
            this._viewUI.yincang_box.visible = true;
            this._viewUI.role_box.x = xPos + 245;
            this._viewUI.role_box.y = yPos + 150;
            this.rolestate = state;
            //区分是否是好友
            if (key == FriendEnum.FRIEND_KEY)
                this._viewUI.addFriend_btn.label = tips.models.TipsModel.getInstance().cstringResConfigData[FriendEnum.DELETE_FRIEND].msg;
            else
                this._viewUI.addFriend_btn.label = tips.models.TipsModel.getInstance().cstringResConfigData[FriendEnum.ADD_FRIEND].msg;

            if( state && state == 1) this._viewUI.fight_btn.label = tips.models.TipsModel.getInstance().cstringResConfigData[FriendEnum.WATCH_FIGHT].msg;
            else this._viewUI.fight_btn.label = tips.models.TipsModel.getInstance().cstringResConfigData[FriendEnum.COMPAR_FIGCHT].msg;
            this._viewUI.addFriend_btn.on(LEvent.MOUSE_DOWN, this, this.addFriend, [key]);
        }
        /** 申请入会 */
        private applyJiaRuClan(clanid:number):void{
            RequesterProtocols._instance.c2s_CApplyClan(clanid);
            this._viewUI.role_box.visible = false;
            this._viewUI.yincang_box.visible = false;
        }

        /**邀请入会 */
        public inviteMeet(id: number): void {
            RequesterProtocols._instance.c2s_CClanInvitation(id);
            this._viewUI.role_box.visible = false;
            this._viewUI.yincang_box.visible = false;
        }
        /**切磋 */
        public fight(id: number): void {
            if(this.rolestate == 1)
            {
                RequesterProtocols._instance.c2s_CSendWatchBattle(id);
            }else
            {
                RequesterProtocols._instance.c2s_CInvitationPlayPK(id);
                this._viewUI.role_box.visible = false;
                this._viewUI.yincang_box.visible = false;
            }
           
        }
        /**举报 */
        public tipOff(name: string): void {
            this._JuBaoMediator.onShow(name);
            this._viewUI.role_box.visible = false;
            this._viewUI.yincang_box.visible = false;
        }
        /**赠送礼物 */
        public giveGift(data: Array<any>): void {
            this._viewUI.role_box.visible = false;
            this._viewUI.yincang_box.visible = false;
            ModuleManager.hide(ModuleNames.FRIEND);
            let _GiveGiftViewMediator = new GiveGiftViewMediator(this._app);
            _GiveGiftViewMediator.onShow(data);
            LoginModel.getInstance().CommonPage = ModuleNames.FRIEND;
        }
        /** 查看装备*/
        public watchEquip(id: number): void {
            RequesterProtocols._instance.c2s_CGetRoleEquip(id, 0);
            this._viewUI.role_box.visible = false;
            this._viewUI.yincang_box.visible = false;
        }
        /**添加好友 */
        public addFriend(key: number): void {
            var id = parseInt(this._viewUI.account_lab.text);
            if (key == FriendEnum.FRIEND_KEY)
                RequesterProtocols._instance.c2s_CBreakOffRelation(id);//发送删除好友请求
            else
                RequesterProtocols._instance.c2s_CRequestAddFriend(id);//发送添加好友请求
            this._viewUI.role_box.visible = false;
            this._viewUI.yincang_box.visible = false;
        }

        /**设置好友职业图标 */
        public setFriendZhiyeImg(school: number): void {
            //根据职业设置职业图标
            switch (school) {
                case zhiye.yunxiao:
                    this._viewUI.tubiao_img.skin = "common/ui/tongyong/11.png";
                    break;
                case zhiye.dahuang:
                    this._viewUI.tubiao_img.skin = "common/ui/tongyong/12.png";
                    break;
                case zhiye.cangyu:
                    this._viewUI.tubiao_img.skin = "common/ui/tongyong/13.png";
                    break;
                case zhiye.feixue:
                    this._viewUI.tubiao_img.skin = "common/ui/tongyong/14.png";
                    break;
                case zhiye.tianlei:
                    this._viewUI.tubiao_img.skin = "common/ui/tongyong/15.png";
                    break;
                case zhiye.wuliang:
                    this._viewUI.tubiao_img.skin = "common/ui/tongyong/16.png";
                    break;
                case zhiye.xuanming:
                    this._viewUI.tubiao_img.skin = "common/ui/tongyong/17.png";
                    break;
                case zhiye.qixing:
                    this._viewUI.tubiao_img.skin = "common/ui/tongyong/18.png";
                    break;
                case zhiye.danyang:
                    this._viewUI.tubiao_img.skin = "common/ui/tongyong/19.png";
                    break;
            }
        }
        public show(): void {
            super.show();
        }

        public hide(): void {
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }
    }
}