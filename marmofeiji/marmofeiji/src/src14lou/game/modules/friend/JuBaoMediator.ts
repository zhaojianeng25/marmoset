/**
 * 举报类
 */
// import JuBaoUI = ui.common.JuBaoUI;
module game.modules.friend {
    export class JuBaoMediator extends game.modules.UiMediator {
        /**当前UI界面 */
        private _viewUI: ui.common.JuBaoUI;  
        /**举报原因 */
        private reasonArr:Array<any>;
        /**选中列表下标 */
        private selectNum:number=0;
        constructor(uiLayer: Sprite){
			super(uiLayer);
			this._viewUI = new ui.common.JuBaoUI();
            this.isCenter = false;
            this.initialize();
            this.registerEvent();
            this.eventListener();
           
        }
          	/**初始化 */
		public initialize():void{
            this.reasonArr = new Array<any>();
            //举报原因
            this.reasonArr = [models.FriendModel.chineseStr.nicheng_buya,models.FriendModel.chineseStr.yanxing_buya,models.FriendModel.chineseStr.waigua_jubao,models.FriendModel.chineseStr.xianxia_jiaoyi,models.FriendModel.chineseStr.jubao_zhanpian,models.FriendModel.chineseStr.qita_jubao];
        }
          /**注册事件监听 */
		public eventListener():void{
             models.FriendProxy.getInstance().on(models.SRoleAccusationCheck_EVENT,this,this.onRoleAccusationCheck);
        }
           /**举报返回 */
        public onRoleAccusationCheck(e:any):void{
            var data:hanlder.S2C_SRoleAccusationCheck = models.FriendModel.getInstance().SRoleAccusationCheckData.get("data");
        }
        public getListData():void{
            this._viewUI.reason_list.vScrollBarSkin = "";
			this._viewUI.reason_list.scrollBar.elasticBackTime = 200;
            this._viewUI.reason_list.scrollBar.elasticDistance = 50;
			this._viewUI.reason_list.array = this.reasonArr;
			this._viewUI.reason_list.renderHandler = new Handler(this,this.onRender);
        }

        public onRender(cell:Laya.Box,index:number):void{
            var reasonBtn:Laya.Button = cell.getChildByName("reason_btn")as Laya.Button;
            reasonBtn.label = this.reasonArr[index];
            reasonBtn.on(LEvent.MOUSE_DOWN,this,this.change,[index]);
        }

        public change(index:number):void{
            var reasonBtn:Laya.Button = this._viewUI.reason_list.getCell(index).getChildByName("reason_btn")as Laya.Button;
            reasonBtn.selected = true;
            for(var i:number =0;i<this.reasonArr.length;i++){
                if(i!=index){
                    var otherBtn:Laya.Button = this._viewUI.reason_list.getCell(i).getChildByName("reason_btn")as Laya.Button;
                    otherBtn.selected = false;
                }
            }
        }
        /**注册事件 */
        private registerEvent(): void {
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN,this,this.hide);
            this._viewUI.reason_tet.once(LEvent.MOUSE_DOWN,this,this.clean);
            this._viewUI.cancle_btn.on(LEvent.MOUSE_DOWN,this,this.hide);
            this._viewUI.confirm_btn.on(LEvent.MOUSE_DOWN,this,this.confirm);
        }
        public confirm():void{
            RequesterProtocols._instance.c2s_CRoleAccusationCheck();//举报时候客户端给服务器发消息,用于扣费
            this.hide();
        }
        /**初始化界面*/
        public onShow(name:string):void{
            this.show();
            this.getListData();
            this._viewUI.rolename_lab.text = name;
            
        }
        public clean():void{
            this._viewUI.reason_tet.text = "";
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