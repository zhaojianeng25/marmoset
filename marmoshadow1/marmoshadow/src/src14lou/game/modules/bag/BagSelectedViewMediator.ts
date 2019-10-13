
module game.modules.bag {
    export class BagSelectedViewMediator extends game.modules.UiMediator {
        /**仓库选择界面 */
        private _viewUI: ui.common.BagSelectUI;
        // 仓库按钮是否解锁，名称等数据
        private _storeHousListData : Array<any> = [];
        /**仓库个数 */
        private _storeHousListDataLength: number;
        private BagStoreHouseViewMediator: BagStoreHouseViewMediator;
        constructor(uiLayer: Sprite,app:AppBase){
			super(uiLayer);
			this._viewUI = new ui.common.BagSelectUI()
            this._viewUI.mouseThrough = true;
            this.isCenter = false;
            this._app = app;
        }

        private onLoad() 
        {
            this.controlStoreHouseBtnList();
            this.registBtnEvent();

        }

        // 实现的接口
        public show(): void {
            this.onLoad();
            super.show();
        }
        /** 初始化点击事件 */
        private registBtnEvent():void
        {
             this._viewUI.mask_img.on(LEvent.MOUSE_DOWN,this,this.clickStoreHouseBtnEvent);
        }
        private clickStoreHouseBtnEvent():void
        {
            bagModel.getInstance()._isStoreHouseBtnOpen  = false;
            this.hide();
        }

        public hide(): void {
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }
        
       //UI 特效控制 获取UI中属性
        /**
         * @describe  控制滚动列表
         */
        private controlStoreHouseBtnList(): void {

            this._viewUI.storeHouseBtn_list.spaceX = 5;
            this._viewUI.storeHouseBtn_list.spaceY = 5;
            if(true)
            {
                this.getStoreHouseBtnListData();
            }
            this._viewUI.storeHouseBtn_list.repeatX = 2;
            // let repeatY = Math.ceil(this._storeHousListData.length/2);
            this._viewUI.storeHouseBtn_list.repeatY = this._storeHousListData.length/2;
            this._viewUI.bg_img.height = this._storeHousListData.length/2 * 75;
            this.listScroll(this._viewUI.storeHouseBtn_list);
        }
        /**
         * @describe  获取仓库按钮list数据
         */
        private getStoreHouseBtnListData(): void {
            let num  =   models.BagModel.getInstance().getDepotNumber();
            this._storeHousListData = models.BagModel.getInstance().storeHouseBtnName;
            this._viewUI.storeHouseBtn_list.array = this._storeHousListData;
            this._storeHousListDataLength = this._storeHousListData.length;
        }
        /**
         * @describe  List控件的滚动回弹效果
         * @param list  list控件
         */
        private listScroll(list: Laya.List): void {
            list.selectEnable = true;

            list.renderHandler = new Handler(this,this.onRenderListItem);
            list.selectHandler = new Handler(this,this.onSelectedListItem);
        }
        /**
         * @describe 渲染List中的单元格
         * @param cell  Laya.Box
         * @param index  number
         */
        private onRenderListItem(cell: Laya.Box,index: number): void {
            if (index > this._storeHousListDataLength) return;
            let label = this._storeHousListData[index].label;
            let lockImg: Laya.Image = cell.getChildByName("lock_img") as Laya.Image;
            if(label != "") {
                let lockBtn: Laya.Button = cell.getChildByName("lock_btn") as Laya.Button;
                lockBtn.label = label;
                lockImg.visible = false;
            } else {
                lockImg.visible = true;
            }
        }
        /**
         * @describe 选中仓库下标时判断事件
         * @param cell  Laya.Box
         * @param index  number
         */
        private onSelectedListItem(index: number): void {
            console.log("-----------------------------------------------onSelectedListItem: ",index);
            if (index == -1) return;
            let depotNum:number =  models.BagModel.getInstance().depotnameinfo.keys.length +2;
              
            if (index < depotNum && index > -1 ) {
                let pageId = index;
                models.BagProxy.getInstance().event(models.CLOSE_SELETED_STOREHOUSE_EVENT,pageId);
            }
            else if(index >= depotNum) 
            {
                models.BagProxy.getInstance().event(models.DEBLOCKING_EVENT);
                
                // this._viewUI.storeHouseBtn_list.selectedIndex = -1;
            }
            this._viewUI.storeHouseBtn_list.selectedIndex = -1;
        }
    }
}