module game.modules.commonUI{
	export class AppearRedPackMediator extends game.modules.UiMediator{
        private _viewUI : ui.common.component.AppearRedPackUI;
        private _disappearMessageTipsMediator : DisappearMessageTipsMediator;
        private px;
        private py;
        /** 小红包图标被点击事件 */
        public static IMAGE_CLICKED_EVENT:string = "imageClicked";

        constructor(app:AppBase){
			super(app.uiRoot.general);
			this._viewUI = new ui.common.component.AppearRedPackUI();
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
            
            this._viewUI.mouseThrough = true;
            this.isCenter = true;
            this.regestEvent();
		}


        /**
         * 显示小红包图标
         * @param roleName  玩家名字
         * @param redpackid 红包id
         * @param modeltype 红包类型
         * @param UI 用于判断是否当前玩家是否有打开其他UI
         */
        public onShow(roleName:string,redpackid:string,modeltype:number,UI?:any):void{
            super.show();
            this.initPos();
            this.onLoad(roleName,redpackid,modeltype);            
            if(UI){
                this._viewUI.visible = false;
            }
            else{
                this._viewUI.visible = true;
            }
        }

        /** 初始化小红包出现的位置 */
        private initPos():void{
            this.px = this._viewUI.xiaoRedPack_box.x;
			this.py = this._viewUI.xiaoRedPack_box.y
        }

        /**
         * @describe 加载出小红包图标
         * @param roleName  玩家名字
         * @param redpackid 红包id
         * @param modeltype 红包类型
         */
        private onLoad(roleName:string,redpackid:string,modeltype:number):void{
            this._viewUI.roleName_label.text = roleName;            
            this._viewUI.xiaoRedPack_image.once(LEvent.CLICK,this,this.qiang_hongbao,[modeltype,redpackid]);
        }
        /**
         * 响应抢红包事件
         */
        private qiang_hongbao(modeltype:number,redpackid:string):void{
            RequesterProtocols._instance.c2s_CGetRedPack(modeltype,redpackid);
            this._viewUI.xiaoRedPack_image.event(AppearRedPackMediator.IMAGE_CLICKED_EVENT);
        }

        public hide():void{
            this.removeEvent();
            super.hide();
        }

        /** 移除事件 */
        private removeEvent():void{
            this._viewUI.xiaoRedPack_image.off(AppearRedPackMediator.IMAGE_CLICKED_EVENT,this,this.hide);
            this._viewUI.xiaoRedPack_image.off(LEvent.CLICK,this,this.qiang_hongbao);
            redPacket.models.RedPacketProxy.getInstance().off(redPacket.models.GET_REDPACK_SUCCESS, this, this.hide);
        }

        public getView():Sprite {
			return this._viewUI;
		}
        /** 添加监听事件 */
        private regestEvent():void
        {
            this._viewUI.xiaoRedPack_image.on(AppearRedPackMediator.IMAGE_CLICKED_EVENT,this,this.hide);
            redPacket.models.RedPacketProxy.getInstance().on(redPacket.models.GET_REDPACK_SUCCESS, this, this.hide);
        }
    }
}