/**
* by LJM 
*/
 
module game.modules.bag{

	export class BagItemFlyToBagMediator extends game.modules.UiMediator{
		private _viewUI:ui.common.BagItemFlyToBagUI;
		constructor(app:AppBase){
			super(app.uiRoot.general);
			this._viewUI = new ui.common.BagItemFlyToBagUI();
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;			
			
		}
		 /**战斗背包界面的单例 */
        public static _instance: BagItemFlyToBagMediator;
		public static getInstance(app: AppBase): BagItemFlyToBagMediator {
            if (!this._instance) {
                this._instance = new BagItemFlyToBagMediator(app);
            }
            return this._instance;
        }
		
		
		
		
		/** 初始化UI */
		private ItemSlide():void
		{
			this._viewUI.slideItemBg_img.visible = true;
			let itemid  = BagModel.getInstance().SlideItem[0];
			let obj = BagModel.getInstance().getItemAttrData(itemid);
			let quality = obj.nquality;
			let icon = obj.icon;
			let xpos = 630;
			let ypos = 1005; 
			this._viewUI.slideItemBg_img.skin = game.modules.bag.BagSystemModule.getGameItemFrameColorResource(quality);
			this._viewUI.ownGameItem_img.skin = "common/icon/item/" + icon + ".png";
			Laya.Tween.to(this._viewUI.slideItemBg_img,{x: xpos, y: ypos},1000,Laya.Ease.linearIn,Laya.Handler.create(this,this.resetUI ),null,true);
		}
        /** 重置新增物品飘窗的ui */
		private resetUI():void
		{
			this._viewUI.slideItemBg_img.x = 279;
			this._viewUI.slideItemBg_img.y = 1130;
			this._viewUI.slideItemBg_img.visible = false;
			BagModel.getInstance().SlideItem.splice(0,1);
			if(BagModel.getInstance().SlideItem.length != 0)
            {
                this.ItemSlide();
            } else
            {
                this.hide();
            }
			
		}
		public show() 
		{
			super.show();
			/** 初始化事件 */		
			this.ItemSlide();	
		}
		public hide()
		{
			super.hide()
		}
		public getView():Sprite {
			return this._viewUI;
		}
	}
}