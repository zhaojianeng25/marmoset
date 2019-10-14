enum onLineType
{
    onLine     = 1,     //有在线好友
    noOnLine   = 2,     //无在线好友
}
enum jumpType
{
    FROM_TEAM = 1,     //来自队伍界面
}


/**Remind.ui */
// import InviteFriendsUI = ui.common.component.TeamInviteFriendsUI;

module game.modules.commonUI {
    /**打开队伍*/
    export const OPEN_TEAM: string = "openTeamEvent";
    /**左边按钮接受的事件 */
    export const LEFT_BUTTON_EVENT1: string = "leftButtonEvent";

    export class InviteFriendsMediator extends game.modules.UiMediator {
        /**提示界面选择界面 */
        private _viewUI: ui.common.component.TeamInviteFriendsUI;
        /** 邀请类型 */
        private invite_type: number;
        /**提示界面的单例 */
        public static _instance: InviteFriendsMediator;
        /** 我的好友_帮派成员列表 */
        private myFriends_Sider:  Array<any> = [] ;
        /** 角色基本数据用来取icon */
        private roleinfo:   Array<any> = [];
         /** 角色基本数据用来取门派*/
        private schoolInfo: any ;
        constructor(uiLayer: Sprite,app: AppBase){
            super(uiLayer);
            this.uiLayer = app.uiRoot.general;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
            this._app = app; 


			this._viewUI = new ui.common.component.TeamInviteFriendsUI()
            this._viewUI.mouseThrough = true;
            // 默认居中
            this.isCenter = true;
        }
        
        public static getInstance(uiLayer: Sprite,app: AppBase): InviteFriendsMediator {
            if (!this._instance) {
                this._instance = new InviteFriendsMediator(uiLayer,app);
            }
            return this._instance;
        }


        /**  */
        public onShow(type: number): void { 
            this.invite_type  =  type;
            this.onLoad();
            super.show();
        }

        public hide(): void 
        {
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }
        /**
         * @describe  开始加载
         * @param prompt   提示语句   
         */
        private onLoad() 
        {
            this.RenameUI();
            this.myFriends_Sider = [];
            this.roleinfo  = [];
            this.registEvent();
            if(this.invite_type == InviteType.INVITE_FRIEND)
            {
                /** 好友的数据 */
                var data: hanlder.S2C_SFriendsInfoInit = game.modules.friend.models.FriendModel.getInstance().SFriendsInfoInitData.get("data");
                for (var online = 0; online < data.friends.length; online++) {
                    if (data.friends[online].online = 1) {
                        this.myFriends_Sider.push((data.friends[online]));
                    }
                }
            }else if(this.invite_type == InviteType.INVITE_FAMILY)
            {
                /** 成员数据 */
                var memberlist =  game.modules.family.models.FamilyModel.getInstance().memberlist;
                let roleid =  LoginModel.getInstance().roleDetail.roleid;
                for (let _index = 0; _index < memberlist.length; _index++) 
                {
                    var lastonlinetime = memberlist[_index].lastonlinetime; //离线时间
                    let inviteId = memberlist[_index].roleid;
                    if(lastonlinetime == 0 && roleid != inviteId ) //只存放在线并且不是自己的成员
                    this.myFriends_Sider.push(memberlist[_index]);
                }
            }
           
            if(this.myFriends_Sider.length == 0 ) 
            {
                this.UI_Switch(onLineType.noOnLine);
                return;
            }
            this.UI_Switch(onLineType.onLine);
            var roleIcon    =    _LoginModel.getInstance().cnpcShapeInfo;
            this.schoolInfo =    _LoginModel.getInstance().schoolInfo;
			for(let index in roleIcon)
            {
				  this.roleinfo.push(roleIcon[index].littleheadID);
			} 
            
            
            this.refreshMyfriend();
        }
        /** ui重新命名 */
        private RenameUI():void
        {
            if(this.invite_type == InviteType.INVITE_FRIEND)
            {
                this._viewUI.title_lab.text = "邀请好友";
                this._viewUI.invite_lab.text = "暂时没有好友在线";
            }else if(this.invite_type == InviteType.INVITE_FAMILY)
            {
                this._viewUI.title_lab.text = "邀请帮派成员";
                this._viewUI.invite_lab.text = "暂时没有成员在线";
            }
        }
        /** 在没有在线好友的情况下执行 */
        private UI_Switch(type:number):void
        {
            if(type == onLineType.noOnLine)
            {
                this._viewUI.friendsNoOnline_box.visible = true;
                this._viewUI.myFriend_list.visible =  false;
            }else if(type == onLineType.onLine)
            {
                this._viewUI.friendsNoOnline_box.visible = false;
                this._viewUI.myFriend_list.visible =  true;
            }
            
        }
        /** 刷新好友数据 */
        private refreshMyfriend():void
        {
              this._viewUI.myFriend_list.vScrollBarSkin = "";
			  this._viewUI.myFriend_list.repeatY = this.myFriends_Sider.length;
			  this._viewUI.myFriend_list.array = this.myFriends_Sider;
			  this._viewUI.myFriend_list.scrollBar.elasticBackTime = 200;
			  this._viewUI.myFriend_list.scrollBar.elasticDistance = 100;
			  this._viewUI.myFriend_list.renderHandler = new Handler(this,this.onRendemyFriends_Sider);  
			//   this._viewUI.myFriend_list.scrollTo(this.currentFirstSelectIndex);
        }
        /** 好友数据渲染 */
        private onRendemyFriends_Sider(cell:Box,index:number):void
        {
            if(index > this.myFriends_Sider.length - 1 ) return;
            let roleName : Laya.Label = cell.getChildByName("roleInfo_img").getChildByName("friendsName_lab") as Laya.Label ; //
            let roleLevel: Laya.Label =  cell.getChildByName("roleInfo_img").getChildByName("friendsLv_lab") as Laya.Label;
            let friendsSect: Laya.Label  = cell.getChildByName("roleInfo_img").getChildByName("friendsSect_lab") as Laya.Label;
            let invite_btn:Laya.Button  = cell.getChildByName("roleInfo_img").getChildByName("invite_btn") as Laya.Button;
            let roleLogo_img:Laya.Image =  cell.getChildByName("roleInfo_img").getChildByName("roleLogo_img") as Laya.Image;
            let  roleId;
            if( this.invite_type == InviteType.INVITE_FRIEND )
            {
                let shape = this.myFriends_Sider[index].FriendInfoBean.shape;
                // let shapeId = this.roleinfo[shape];
                roleName.text = this.myFriends_Sider[index].FriendInfoBean.name;
                roleLevel.text = this.myFriends_Sider[index].FriendInfoBean.roleLevel;
                let school = this.myFriends_Sider[index].FriendInfoBean.school;
                friendsSect.text = this.schoolInfo[school].name;
                roleLogo_img.skin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + shape) + ".png";
                roleId = this.myFriends_Sider[index].FriendInfoBean.roleId;
            }else if( this.invite_type == InviteType.INVITE_FAMILY )
            {
                 let shape = this.myFriends_Sider[index].shapeid;
                //  let shapeId = this.roleinfo[shape];
                 roleName.text = this.myFriends_Sider[index].rolename;
                 roleLevel.text = this.myFriends_Sider[index].rolelevel;
                 let school = this.myFriends_Sider[index].school;
                 friendsSect.text = this.schoolInfo[school].name;
                 roleLogo_img.skin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + shape) + ".png";
                 roleId = this.myFriends_Sider[index].roleid;
            }
            invite_btn.on(LEvent.MOUSE_DOWN,this,this.onInvite,[roleId]);
            
        }
        /** 邀请好友点击事件 */
        private onInvite(roleId:number):void
        {
            if(roleId != 0)
            {
                RequesterProtocols._instance.c2s_CInviteJoinTeam(roleId,0);
            }

        }




        /** 按钮的注册事件 */
        private registEvent():void
        {
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN,this,this._CloseBtn);
        }

        private _CloseBtn():void
        {
            // if(this.jump_page == jumpType.FROM_TEAM)
            // this.event(OPEN_TEAM);
            let moduleName =  LoginModel.getInstance().CommonPage;
            if(moduleName &&  moduleName != "")
            {
                 ModuleManager.show(moduleName,this._app);
                 LoginModel.getInstance().CommonPage = "";
            }
            this.hide();
        }


       

        /**
         * @describe  设置右侧按钮的名称
         * @param btnName   按钮名称
         */
       



        ////////////////
        ///事件
        ////////////////

        /**
         * @describe  
         */
       
        /**
         * @describe  
         */
        
    }
}