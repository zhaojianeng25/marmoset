
/**背包系统底板UI */
// import BagSystemUI = ui.common.BagSystemUI;
/**背包系统仓库UI */
// import BagStoreHouseUI = ui.common.BagStoreHouseUI;
/**背包UI */
// import BagsUI = ui.common.BagsUI;
/**选择仓库UI */
// import BagSelected = ui.common.BagSelectUI;
/**临时背包 */
// import TempBag = ui.common.BagTemporaryUI;
/**出售UI */
// import BagSaleUI = ui.common.BagSaleUI;
/**修改仓库名称UI*/
// import BagStoreHouseRenameUI = ui.common.BagStorehouseRenameUI;
/**背包Model */
import BagModel = game.modules.bag.models.BagModel;

/**背包类型 */
// import BagTypes = game.modules.bag.models


module game.modules.bag {

    enum ButtonType {
        BAGS_BTN         = 0,
        STOREHOUSE_BTN   = 1,
        SALE_BTN         = 2
    }
    /**方框颜色资源图 */
    const FrameColor = [
        /**橙框 */
        {url:"common/ui/tongyong/jinkuang.png",nquality:5},
        /**紫框 */
        {url:"common/ui/tongyong/zikuang.png",nquality:4},
        /**蓝框 */
        {url:"common/ui/tongyong/lankuang.png",nquality:3},
        /**绿框 */
        {url:"common/ui/tongyong/lvkuang.png",nquality:2},
        /**白框 */
        {url:"common/ui/tongyong/baikuang.png",nquality:1},
    ]

    /**标题名称 */
    const TitleName = [
        /**背包界面 */
        {name: "背包"},
        /**仓库 */
        {name: "仓库"},
        /**出售 */
        {name: "出售"},
    ]

    
    export class BagSystemModule extends game.modules.ModuleMediator {
         /**底板 */
        private _viewUI: ui.common.BagSystemUI;
        /**bag */
        private _bagsViewMediator: BagsViewMediator;
        /**仓库 */
        private _bagStoreHouseViewMediator: BagStoreHouseViewMediator;
        /**背包出售 */
        private _bagSaleViewMediator: BagSaleViewMediator;
       


        constructor(app: AppBase) {
            super();
            this.uiLayer = app.uiRoot.general;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
            this._app = app; 
            this._viewUI = new ui.common.BagSystemUI();
            
            this._bagsViewMediator = new BagsViewMediator(this._viewUI,app);
            this._bagStoreHouseViewMediator = new BagStoreHouseViewMediator(this._viewUI,app);
            this._bagSaleViewMediator = new BagSaleViewMediator(this._viewUI,app);

        }


        ////////////////
        ///业务逻辑
        ////////////////
		public show():void 
        {/** 创建模型的时候这里有个雷 需要先创建底板的ui才才能创建子界面ui，顺序如果乱掉会导致子界面的父节点偏移量为1 show() 顺序不能偏差！！*/
			super.show();
            this.onLoad();
		}

		protected onShow(event:Object):void {
			this._app.uiRoot.closeLoadProgress();
            this.show();
            //通知主界面打开蒙版
            mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
            //背包界面打开，设为false
            models.BagModel.getInstance().bagkey = false;
		}
		public hide():void {
			super.hide();
            if(LoginModel.getInstance().CommonPage != "")
            {
                ModuleManager.show(LoginModel.getInstance().CommonPage,this._app);
                LoginModel.getInstance().CommonPage = "";
            }
           
		}
		
		public getView():Sprite {
			return this._viewUI;
		}

        /**
         * @describe  游戏开始加载
         */
        private onLoad(): void {
            //显示bag界面
            this.switchChildUI(ButtonType.BAGS_BTN);
            this.registerEvent();
        }










        ////////////////
        ///事件
        ////////////////
        
        /**
         * @describe  注册事件
         */
        private registerEvent(): void {
            // 界面控件注册事件
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN,this,this.clickCloseBtnEvent);
            this._viewUI.bags_btn.on(LEvent.MOUSE_DOWN,this,this.clickBagsBtnEvent);
            this._viewUI.storeHouse_btn.on(LEvent.MOUSE_DOWN,this,this.clickStoreHouseBtnEvent);
            this._viewUI.sale_btn.on(LEvent.MOUSE_DOWN,this,this.clickSaleBtnEvent);

        }




        /**
         * @describe  关闭背包系统事件
         */
        private clickCloseBtnEvent(): void {
            // console.log("关闭窗口");
            //通知主界面关闭蒙版
            mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
            //背包界面关闭，设为true
            models.BagModel.getInstance().bagkey = true;
            this.hide();
            this._bagsViewMediator.hide();
            this._bagStoreHouseViewMediator.hide();
            this._bagSaleViewMediator.hide();
        }
        /**
         * @describe  点击背包按钮事件
         */
        private clickBagsBtnEvent(): void {
            if (!this._viewUI.bags_btn.selected) {
                this.switchChildUI(ButtonType.BAGS_BTN);
            }
        }
        /**
         * @describe  点击仓库按钮事件
         */
        private clickStoreHouseBtnEvent(): void {
            if (!this._viewUI.storeHouse_btn.selected) {
                this.switchChildUI(ButtonType.STOREHOUSE_BTN);
            }
        }
        /**
         * @describe  点击出售按钮事件
         */
        private clickSaleBtnEvent(): void {
            if (!this._viewUI.sale_btn.selected) {
                this.switchChildUI(ButtonType.SALE_BTN);
            }
        }

        /**
         * @describe  切换子界面UI
         * @param index   按钮类型
         */
        private switchChildUI(index: ButtonType) {
            //初始化button的select状态
            this._viewUI.bags_btn.selected = false;
            this._viewUI.storeHouse_btn.selected = false;
            this._viewUI.sale_btn.selected = false;

            let tileName: string = "";

            switch(index) {
                case ButtonType.BAGS_BTN:
                    this._bagsViewMediator.show();
                    this._bagStoreHouseViewMediator.hide();
                    this._bagSaleViewMediator.hide();
                    this._viewUI.bags_btn.selected = true;
                    tileName = TitleName[ButtonType.BAGS_BTN].name;
                    break;
                case ButtonType.STOREHOUSE_BTN:
                    this._bagsViewMediator.hide();
                    this._bagStoreHouseViewMediator.show();
                    this._bagSaleViewMediator.hide();
                    this._viewUI.storeHouse_btn.selected = true;   
                    tileName = TitleName[ButtonType.STOREHOUSE_BTN].name;
                    break;
                case ButtonType.SALE_BTN:
                    this._bagsViewMediator.hide();
                    this._bagStoreHouseViewMediator.hide();
                    this._bagSaleViewMediator.show();
                    this._viewUI.sale_btn.selected = true;   
                    tileName = TitleName[ButtonType.SALE_BTN].name;
                    break;
                default:
                    console.log("bagsystemModule.switchButton error");             
            }

            this.setTileName(tileName);
        }




        ////////////////
        ///UI
        ////////////////

        /**
         * @describe  设置标题名称
         * @param name   标题名称
         */ 
        private setTileName(name: string) {
            this._viewUI.title_lab.text = name;
        }




        ////////////////
        ///工具类
        ////////////////

        /**
         * @describe  根据道具名颜色，改变方框的颜色
         * @param nquality  品质颜色
         * @return  string 方框资源位置 
         */
        public static getGameItemFrameColorResource(nquality: number):string {

            for(let value of FrameColor) {
                if (value.nquality == nquality) {
                    return value.url;
                }
            }
            console.log("BagSystemModule getGameItemFrameColorResource");
            return "error";
        }
    }
}