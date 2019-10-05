/**
* 红包模板
*/

module game.modules.redPacket{
	export class RedPacketModule extends game.modules.ModuleMediator{
		private _viewUI : ui.common.RedPacketUI;
		private _redPacketMediator : RedPacketMediator;
		private _redPacketRecordMediator : RedPacketRecordMediator;
        /** 出现小红包图标 */
        private _appearRedPackMediator : modules.commonUI.AppearRedPackMediator;
		/** 临时放小红包图标所需角色名字 */
        private _tempRoleName:string;
        /** 临时放小红包图标所需红包id */
        private _tempRedPackId:string;
        /** 临时放小红包图标所需红包类型 */
        private _tempRedPackType:number;
		/** 判断是否玩家有发新的红包 */
        private _isSendNewRedPack:boolean = false;
		constructor(app:AppBase){
			super();
			this.uiLayer = app.uiRoot.general;
			this._viewUI = new ui.common.RedPacketUI();
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;

			this._redPacketMediator = new RedPacketMediator(app);
			this._redPacketRecordMediator = new RedPacketRecordMediator(app);

			this.network();			
		}
		
		protected onShow(event:Object):void {
			this._redPacketMediator.show();
			this._app.uiRoot.closeLoadProgress();
		}
		public hide():void {
			super.hide();
		}
		
		public getView():Sprite {
			return this._viewUI;
		}
		private network():void{
			//Network._instance.addHanlder(ProtocolsEnum.SSendRedPackView, this, this.onOpArchi_1);			
            models.RedPacketProxy.getInstance().on(models.NOTICE_REPACK_EVENT,this,this.onShowImage);
		}
		
		
		// private onOpArchi_1(optcode:number, msg:hanlder.S2C_SSendRedPackView):void{
		//     console.log("RedPacketModule--监听到服务端下发的红包数据...开始刷新数据...");
		// 	if( !msg.redpackinfolist || msg.redpackinfolist.length == 0) return;
		// 	this._redPacketMediator.refreshData_1();
		// }
		/**
         * 显示红包图标
         */
        private onShowImage(roleName?:string,redpackid?:string,modeltype?:number):void{
            if(!roleName) return;
            this._appearRedPackMediator = new modules.commonUI.AppearRedPackMediator(this._app);
            this._appearRedPackMediator.onShow(roleName,redpackid,modeltype);
        }
	}
}