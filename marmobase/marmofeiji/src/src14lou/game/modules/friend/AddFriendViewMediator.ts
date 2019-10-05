/**
 * 添加好友类
 * @author  TXX
 */
// import AddFriendUI = ui.common.FriendAddUI;
module game.modules.friend {
    export class AddFriendViewMediator extends game.modules.UiMediator {
        /**当前UI界面 */
        private _viewUI: ui.common.FriendAddUI;  
        /**头像数组 */
        private touxiangImgArr:Array<any>;
        /**职业图标数组 */
        private zhiyeImgArr:Array<any>;
        /**好友名字 */
        private friendNameArr:Array<any>;
        /**好友等级 */
        private friendLevelArr:Array<number>;
        /**好友账号 */
        private friendIdArr:Array<number>;
        /**选中列表下标 */
        private selectNum:number=0;
        constructor(app:AppBase){
			super(app.uiRoot.general);
            this._viewUI = new ui.common.FriendAddUI();
            this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
            this.isCenter = true;
            this._app = app;                       
        }
          /**注册事件监听 */
		public eventListener():void{
            //监听服务器返回推荐好友列表
            models.FriendProxy.getInstance().on(models.SRecommendFriend_EVENT,this,this.onRecommendFriend);
            //监听搜索好友返回结果
            models.FriendProxy.getInstance().on(models.SSearchFriend_EVENT,this,this.onSearchFriend);
            //监听添加好友结果
            models.FriendProxy.getInstance().on(models.SAddFriend_EVENT,this,this.onAddFriend);
        }
        	/**初始化 */
		public initialize():void{
            this.touxiangImgArr = new Array<any>();
            this.zhiyeImgArr = new Array<any>();
            this.friendNameArr = new Array<any>();
            this.friendLevelArr = new Array<number>();
            this.friendIdArr = new Array<number>();
        }
        /**添加好友成功S-->C */
        public onAddFriend(e:any):void{
            var addBtn:Laya.Button = this._viewUI.friend_list.getCell(this.selectNum).getChildByName("add_btn") as Laya.Button;
            addBtn.skin = "common/ui/tongyong/common_checkbox1.png";
        }
        /**搜索好友成功S-->C */
        public onSearchFriend(e:any):void{
            var data:hanlder.S2C_SSearchFriend = models.FriendModel.getInstance().SSearchFriendData.get("data");
            this.selectNum = 0;
            this.touxiangImgArr.length = 0;
            this.zhiyeImgArr.length = 0;
            this.friendNameArr.length = 0;
            this.friendLevelArr.length = 0;
            this.friendIdArr.length = 0;
            this.touxiangImgArr.push({img:"common/icon/avatarrole/"+(FriendEnum.ROLE_IMG_ID+data.FriendInfoBean["shape"])+".png"});
            this.setFriendZhiyeImg(data.FriendInfoBean["school"]);
            this.friendNameArr.push(data.FriendInfoBean["name"]);
            this.friendLevelArr.push(data.FriendInfoBean["roleLevel"]);
            this.friendIdArr.push(data.FriendInfoBean["roleId"])
            this.getListData();
        }
        /** 服务器返回推荐好友*/
        public onRecommendFriend(e:any):void{
            this.touxiangImgArr.length = 0;
            this.zhiyeImgArr.length = 0;
            this.friendNameArr.length = 0;
            this.friendLevelArr.length = 0;
            this.friendIdArr.length = 0;
            var data:hanlder.S2C_SRecommendFriend = models.FriendModel.getInstance().SRecommendFriendData.get("data");
                for(var i=0;i<data.friendInfoBeanList.length;i++){
                    this.touxiangImgArr.push({img:"common/icon/avatarrole/"+(FriendEnum.ROLE_IMG_ID+data.friendInfoBeanList[i]["shape"])+".png"});
                    this.setFriendZhiyeImg(data.friendInfoBeanList[i]["school"]);
                    this.friendNameArr.push(data.friendInfoBeanList[i]["name"]);
                    this.friendLevelArr.push(data.friendInfoBeanList[i]["roleLevel"]);
                    this.friendIdArr.push(data.friendInfoBeanList[i]["roleId"]);
            }
            this.getListData();
        }
          /**设置好友职业图标 */
        public setFriendZhiyeImg(school:number):void{
            //按照职业设置职业图标
            switch(school){
                case zhiye.yunxiao:
                        this.zhiyeImgArr.push({img:"common/ui/tongyong/11.png"});
                        break;
                case zhiye.dahuang:
                        this.zhiyeImgArr.push({img:"common/ui/tongyong/12.png"});
                        break;
                case zhiye.cangyu:
                        this.zhiyeImgArr.push({img:"common/ui/tongyong/13.png"});
                        break;
                case zhiye.feixue:
                        this.zhiyeImgArr.push({img:"common/ui/tongyong/14.png"});
                        break;
                case zhiye.tianlei:
                        this.zhiyeImgArr.push({img:"common/ui/tongyong/15.png"});
                        break;
                case zhiye.wuliang:
                        this.zhiyeImgArr.push({img:"common/ui/tongyong/16.png"});
                        break;
                case zhiye.xuanming:
                        this.zhiyeImgArr.push({img:"common/ui/tongyong/17.png"});
                        break;
                case zhiye.qixing:
                        this.zhiyeImgArr.push({img:"common/ui/tongyong/18.png"});
                        break;
                case zhiye.danyang:
                        this.zhiyeImgArr.push({img:"common/ui/tongyong/19.png"});
                        break;
            }
        }
         /**初始化添加好友列表 */
        public getListData():void{
			this._viewUI.friend_list.vScrollBarSkin = "";
			this._viewUI.friend_list.scrollBar.elasticBackTime = 200;
            this._viewUI.friend_list.scrollBar.elasticDistance = 50;
			this._viewUI.friend_list.array = this.friendNameArr;
			this._viewUI.friend_list.renderHandler = new Handler(this,this.onRender);
		}

        /**渲染添加好友列表 */
        public onRender(cell:Laya.Box,index:number):void{
        	var nameLab:Laya.Label = cell.getChildByName("roleName_lab") as Laya.Label;
            var levelLab:Laya.Label = cell.getChildByName("level_lab") as Laya.Label;
            var roleContentImg:Laya.Image = cell.getChildByName("roleContent_img") as Laya.Image;
            var schoolImg:Laya.Image = cell.getChildByName("school_img") as Laya.Image;
            var addBtn:Laya.Button = cell.getChildByName("add_btn") as Laya.Button;
            addBtn.on(LEvent.MOUSE_DOWN,this,this.clickAddFriendBtn,[index]);
           	nameLab.text = this.friendNameArr[index];
            levelLab.text = this.friendLevelArr[index].toString();
            roleContentImg.skin = this.touxiangImgArr[index].img;
            schoolImg.skin = this.zhiyeImgArr[index].img;
            let isMyfriendFlag = models.FriendModel.getInstance().isMyFriend(this.friendIdArr[index]);
            if(isMyfriendFlag == FriendEnum.STRANGE_KEY){
                addBtn.skin = "common/ui/tongyong/renwu_jiahao1.png";
                addBtn.mouseEnabled = true;
            }
            else{
                addBtn.skin = "common/ui/tongyong/common_checkbox1.png";
                addBtn.mouseEnabled = false;
            }
        }

        /**注册事件 */
        private registerEvent(): void {
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN,this,this.clickCloseBtnEvent);
            this._viewUI.search_btn.on(LEvent.MOUSE_DOWN,this,this.clickSearchBtnEvent);
            this._viewUI.change_btn.on(LEvent.MOUSE_DOWN,this,this.clickChangeBtnEvent);
        }

        /**添加好友 */
        private clickAddFriendBtn(index:number): void {
            this.selectNum = index;
            RequesterProtocols._instance.c2s_CRequestAddFriend(this.friendIdArr[index]);
        }

        /**关闭界面 */
        private clickCloseBtnEvent(): void {
            this.hide();
        }
        /**查找指定id的好友 */
        private clickSearchBtnEvent(): void {
            RequesterProtocols._instance.c2s_CRequestSearchFriend(this._viewUI.idInput_tex.text);//搜索好友C-->S
        }

        /**请求推荐好友 */
        private clickChangeBtnEvent(): void {
            RequesterProtocols._instance.c2s_CRecommendFriend();//客户端请求推荐好友
        }

        public show(): void {
            this.initialize(); 
            this.registerEvent();
            this.eventListener();
            super.show();
            RequesterProtocols._instance.c2s_CRecommendFriend();//客户端请求推荐好友
        }
        /** 移除事件监听 */
        private removeEvent():void{
            this._viewUI.close_btn.off(LEvent.MOUSE_DOWN,this,this.clickCloseBtnEvent);
            this._viewUI.search_btn.off(LEvent.MOUSE_DOWN,this,this.clickSearchBtnEvent);
            this._viewUI.change_btn.off(LEvent.MOUSE_DOWN,this,this.clickChangeBtnEvent);
            models.FriendProxy.getInstance().off(models.SRecommendFriend_EVENT,this,this.onRecommendFriend);
            models.FriendProxy.getInstance().off(models.SSearchFriend_EVENT,this,this.onSearchFriend);
            models.FriendProxy.getInstance().off(models.SAddFriend_EVENT,this,this.onAddFriend);
        }
        public hide(): void {
            super.hide();
            if(LoginModel.getInstance().CommonPage != "")
            {
                 ModuleManager.show(LoginModel.getInstance().CommonPage,this._app);
                 LoginModel.getInstance().CommonPage = "";
            }
           
        }

        public getView(): Sprite {
            return this._viewUI;
        }

    }
}