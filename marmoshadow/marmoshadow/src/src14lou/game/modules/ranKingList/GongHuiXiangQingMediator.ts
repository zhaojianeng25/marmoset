module game.modules.ranKingList {
    /** 帮派详情界面 */
    export class GongHuiXiangQingMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.GongHuiXiangQingUI;
        /** 帮派的key */
        private _factionkey:number;
        /** 帮派的曾用名 */
        private _lastname:string;
        /** 帮派宣言 */
        private _title:string;
        /** 帮主id */
        private _factionmasterid:number;
        constructor(app: AppBase) {
            super(app.uiRoot.general);
            this._viewUI = new ui.common.GongHuiXiangQingUI();
            this._clientWidth = app.clientWidth;
            this._clientHeight = app.clientHeight;
            this._app = app;
        }
        public onShow(dataArr:Array<any>):void{
            this._factionkey = dataArr[0].factionkey;
            this._lastname = dataArr[0].lastname;
            this._title = dataArr[0].title;
            this._factionmasterid = dataArr[0].factionmasterid;
            this.show();
        }
        public show(): void {            
            this._init();
            super.show();
            //注册事件
            this.registerEvent();
        }
        /** 初始化界面 */
        private _init():void{
            //判断要联系的帮主就是自己本人
            if(this._factionmasterid == LoginModel.getInstance().roleDetail.roleid){
                this._viewUI.contact_btn.visible = false;
            }
            else{
                this._viewUI.contact_btn.visible = true;
            }
            this._viewUI.lastClanName_lab.text = this._lastname;
            this._viewUI.xuanyan_lab.text = this._title;
        }
        /** 事件注册 */
        private registerEvent():void{
            this._viewUI.close_btn.on(LEvent.CLICK,this,this.hide);
            this._viewUI.applyClan_btn.on(LEvent.CLICK,this,this.applyClan);
            this._viewUI.contact_btn.on(LEvent.CLICK,this,this.contactClanMaster);
        }
        /** 联系帮主 */
        private contactClanMaster():void{
            let xPos = -20;
			let yPos = 80;
			RequesterProtocols._instance.c2s_CRequestUpdateRoleInfo(this._factionmasterid);//请求玩家信息
			RequesterProtocols._instance.c2s_CReqRoleTeamState(this._factionmasterid);//客户端请求其他玩家的组队情况
			var isFriendFlag = FriendModel.getInstance().isMyFriend(this._factionmasterid);
            let _ContactCharacterMediator = new friend.ContactCharacterMediator(this._viewUI,this._app);
			_ContactCharacterMediator.onShow(xPos, yPos, isFriendFlag);
        }
        /** 申请帮派 */
        private applyClan():void{
            RequesterProtocols._instance.c2s_CApplyClan(this._factionkey);;
        }

        public getView(): Sprite {
            return this._viewUI;
        }

        public hide(): void {
            super.hide();
            this.removeEvent();            
        }
        /** 移除事件 */
        private removeEvent():void{
            this._viewUI.close_btn.off(LEvent.CLICK,this,this.hide);            
        }
    }
}