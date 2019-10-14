
module game.modules.bag {
    enum ButtonType {
        UP_BTN = 1,
        DOWN_BTN = 2,
    }
    interface ListItem {
        /**道具唯一ID */
        ID: number;
        /**造型ID */
        icon: number;
        /**道具数量 */
        number: number;
        /**位置 */
        position: number;
        /**颜色品质*/
        nquality: number;
        /**是否解锁 */
        isLock?: boolean;
        /** key */
        key: number;
        /**  */
        flags: number;
    }
    /**免费仓库个数 */
    const FREE_STOREHOUSE_NUMBER = 2;
    /**仓库中可存储的道具个数 */
    const STOREHOUSE_GAMEITEM_NUMBER = 25;

    export class BagStoreHouseViewMediator extends game.modules.UiMediator {
        /**修改仓库名称界面 */
        private _bagStoreHouseRenameViewMediator: BagStoreHouseRenameViewMediator;
        /**解锁仓库UI */
        private _bagSelectedViewMediator: BagSelectedViewMediator;
        /**仓库UI */
        private _viewUI: ui.common.BagStoreHouseUI;
        /**当前所在仓库id */
        private _nowPage: number = 1;
        /**总共的仓库数量 */
        private _totalPage: number;
        /**每个仓库可存放的道具个数 */
        private _storeHouseGameItemNumber: number;
        /**当前仓库的道具个数 */
        private _curStoreHouseGameItemNumber: number;
        /**仓库List数据 */
        private _storeHouseListData = [];
        /**bagGameItemList的子单元个数 */
        private _bagGameItemListLength: number;
        /** bagGameItemList的数据*/
        private _bagGameItemListData = [];
        /**提示界面 */
        private _remindViewMediator: commonUI.RemindViewMediator;
        /**金币补足界面 */
        private _jinBiBuZuViewMediator: commonUI.JinBiBuZuViewMediator;
        /**修改的仓库名称 */
        private _curStoreHouseName: string;
        /**解锁一个仓库需要银币 */
        private _deblockingSilverNumber: number;
        /**解锁一个仓库需要金币 */
        private _deblockingGoldNumber: number;
        /** 解锁有个仓库需要的符石 */
        private _deblockingFuShiNumber: number;
        /**解锁一个背包列（5个）需要的银币 */
        private _deblockingBagSilverNumber: number;
        /**解锁一个背包列（5个）需要的金币 */
        private _deblockingBagGoldNumber: number;
        /**解锁一个背包列（5个）需要的符石 */
        private _deblockingBagFuShiNumber: number;
        /**记录提示界面出现，1：解锁背包，2：解锁仓库 */
        private _recordRemindViewMediator: number = -1;
        /** 背包格子达到上限 */
        private bagLatticereachUpperLimit: boolean = false;
        /** tips界面 */
        private _tipsModule: game.modules.tips.tipsModule;
        /** 动画特效 */
        private ani: Laya.Animation;

        constructor(uiLayer: Sprite, app: AppBase) {
            super(uiLayer);
            this._viewUI = new ui.common.BagStoreHouseUI();
            this._app = app;
            this._bagSelectedViewMediator = new BagSelectedViewMediator(this._viewUI, app);
            this._bagStoreHouseRenameViewMediator = new BagStoreHouseRenameViewMediator(this._viewUI, this._app);
            // this._remindViewMediator = new commonUI.RemindViewMediator(app.uiRoot.topUnder,app);
            this._remindViewMediator = commonUI.RemindViewMediator.getInstance(app.uiRoot.topUnder, app);
            this._jinBiBuZuViewMediator = new commonUI.JinBiBuZuViewMediator(app.uiRoot.topUnder, app);
            this.ani = new Laya.Animation();
            this._viewUI.mouseThrough = true;
            this.isCenter = false;
        }





        ///////////////////////////
        //////业务逻辑
        ///////////////////////////
        public show(): void {
            this.onLoad();
            super.show();
        }

        public hide(): void {
            /** 移除通讯事件 */
            this._remindViewMediator.off(commonUI.RIGHT_BUTTON_EVENT, this, this.clickEnSureBtnEvent);
            this._remindViewMediator.off(commonUI.LEFT_BUTTON_EVENT, this, this.clickCancelBtnEvent);
            this._remindViewMediator.off(commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
            this._remindViewMediator.off(commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }

        private onLoad(): void {
            this.initStoreHouse();
            this.initUI();
            this.registerEvent();
            this.controlBagGameItemList();
            if (this.ani) {
                this.ani.clear()
            }
        }
        /**
         * @describe  初始化仓库
         */
        private initStoreHouse(): void {
            this._storeHouseGameItemNumber = STOREHOUSE_GAMEITEM_NUMBER;
            /** 初始化倉庫 */
            game.modules.bag.models.BagModel.getInstance().getDepotNumber();
            //初始化仓库总个数
            let depotNumber = game.modules.bag.models.BagModel.getInstance().depotnameinfo.keys.length;//0
            this._totalPage = depotNumber > 0 ? depotNumber + FREE_STOREHOUSE_NUMBER : FREE_STOREHOUSE_NUMBER;
            RequesterProtocols._instance.c2s_CGetDepot_Info(this._nowPage);
        }
        /**
         * @describe  初始化UI界面
         */
        private initUI(): void {
            this.setNowPage(this._nowPage);
            this.setStoreHouseBtnName(bagModel.getInstance().storeHouseBtnName[this._nowPage - 1].label);
            this.setTotalPage(this._totalPage);
        }
        /**
         * @describe  List控件的滚动回弹效果
         * @param list  list控件
         */
        private listScrollOfBagGameItem(list: Laya.List): void {
            list.vScrollBarSkin = "";
            list.scrollBar.elasticBackTime = 200;
            list.scrollBar.elasticDistance = 50;
            list.selectEnable = true;

            list.renderHandler = new Handler(this, this.onRenderListItemOfBagGameItem);
            list.selectHandler = new Handler(this, this.onSeletListItemOfBagItem);
        }
        /**
        * @describe  List控件的滚动回弹效果
        * @param list  list控件
        */
        private listScrollOfStoreHouse(list: Laya.List): void {
            list.selectEnable = true;

            list.renderHandler = new Handler(this, this.onRenderListItemOfStoreHouse);
            list.selectHandler = new Handler(this, this.onSeletListItemOfStoreHouseItem);
        }
        /**
         * @describe  获取bagGameItemList背包数据
         */
        private getBagGameItemListData(bagType: BagTypes): void {
            let bag: game.modules.bag.models.BagVo = BagModel.getInstance().getBagGameItemData(bagType);
            // 数据为空则返回
            if (!bag) return;
            // 置空
            this._bagGameItemListData = [];
            let items = bag.items;
            /**临时存储服务端发送的道具数组 */
            let arr: Array<ListItem> = [];
            let posArray: Array<number> = [];
            let listItem: ListItem;
            //插入Item到arr数组
            for (let index = 0; index < items.length; index++) {
                // let id = bag.getItem(index).id;

                let id = items[index].id;
                let obj = BagModel.getInstance().getItemAttrData(id);
                let icon = obj.icon;
                let nquality = obj.nquality;
                let number = items[index].number;
                let posKey = items[index].key;
                let pos = items[index].position;
                let flags = items[index].flags;
                listItem = {
                    ID: id,
                    icon: icon,
                    number: number,
                    position: pos,
                    nquality: nquality,
                    isLock: false,
                    key: posKey,
                    flags: flags
                };
                arr.push(listItem);
                // 1，4，5，7，12
                // 0, 1, 2, 3, 4
                posArray.push(pos);
            }

            // let listItem: ListItem;
            for (let index = 0; index < this._bagGameItemListLength; index++) {
                /** 背包格子未达到上限并且位置在后十个格子 */
                if (!this.bagLatticereachUpperLimit && index >= this._bagGameItemListLength - 10) {
                    listItem = {
                        ID: -1,
                        icon: -1,
                        number: -1,
                        position: -1,
                        nquality: -1,
                        isLock: true,
                        key: -1,
                        flags: -1
                    };
                } else {
                    let tempIndex = posArray.indexOf(index)
                    // 找到
                    if (tempIndex != -1) {
                        listItem = arr[tempIndex];
                    } else {
                        listItem = {
                            ID: -1,
                            icon: -1,
                            number: -1,
                            position: -1,
                            nquality: -1,
                            isLock: false,
                            key: -1,
                            flags: -1
                        };
                    }
                }

                this._bagGameItemListData.push(listItem);
            }

            this._viewUI.bagGameItem_list.array = this._bagGameItemListData;
        }
        /**
     * @describe  获得仓库数据
     */
        private getStoreHoustGameItemListData(pageId: number): void {
            let bag: models.BagVo = BagModel.getInstance().getDepotData(pageId);
            if (!bag) return;
            // 置空
            this._storeHouseListData = [];

            let items = bag.items;
            /**临时存储服务端发送的道具数组 */
            let arr: Array<ListItem> = [];
            let posArray: Array<number> = [];
            let listItem: ListItem;
            //插入Item到arr数组
            for (let index = 0; index < items.length; index++) {
                // let id = bag.getItem(index).id;

                let id = items[index].id;
                let obj = BagModel.getInstance().getItemAttrData(id);
                let icon = obj.icon;
                let nquality = obj.nquality;
                let posKey = items[index].key;
                let number = items[index].number;
                // 服务器发回的postion
                // 比如第一个仓库有25个道具，position[1-25]
                // 第二个发回2个道具，position[26-27]
                let pos = items[index].position % 25;
                let flags = items[index].flags;
                listItem = {
                    ID: id,
                    icon: icon,
                    number: number,
                    position: pos,
                    nquality: nquality,
                    key: posKey,
                    flags: flags
                };
                arr.push(listItem);
                posArray.push(pos);
            }

            for (let index = 0; index < this._storeHouseGameItemNumber; index++) {

                let tempIndex = posArray.indexOf(index)
                // 找到
                if (tempIndex != -1) {
                    listItem = arr[tempIndex];
                } else {
                    listItem = {
                        ID: -1,
                        icon: -1,
                        number: -1,
                        position: -1,
                        nquality: -1,
                        key: -1,
                        flags: -1
                    };

                }

                this._storeHouseListData.push(listItem);
            }
            this._viewUI.storeHouse_list.array = this._storeHouseListData;
        }

        /**
         * @describe 渲染Bag List中的单元格
         * @param cell  Laya.Box
         * @param index  number
         */
        private onRenderListItemOfBagGameItem(cell: Laya.Box, index: number): void {
            if (index >= this._bagGameItemListLength) return;
            let itemData: ListItem = this._bagGameItemListData[index];
            let lockImg: Laya.Image = cell.getChildByName("gameItemLock_Img") as Laya.Image;
            lockImg.skin = "";
            let lockImg2: Laya.Image = cell.getChildByName("lockimg_img") as Laya.Image;
            lockImg2.visible = false;
            let gameItemBgImg: Laya.Image = cell.getChildByName("gameItemBg_img") as Laya.Image;
            let gameItemImg: Laya.Image = cell.getChildByName("gameItem_Img") as Laya.Image;
            let gameItemNumberLabel: Laya.Label = cell.getChildByName("gameItemNumber_lab") as Laya.Label;
            if (itemData.ID != -1) {
                let str: string = itemData.number > 1 ? itemData.number.toString() : "";
                gameItemBgImg.skin = BagSystemModule.getGameItemFrameColorResource(itemData.nquality);
                gameItemImg.skin = "common/icon/item/" + itemData.icon + ".png";
                gameItemNumberLabel.changeText(str);
                gameItemImg.on(LEvent.DOUBLE_CLICK, this, this.cTranceItem, [BagTypes.BAG, itemData.key, -1, BagTypes.DEPOT, -1, this._nowPage, -1, index]);
                if (itemData.flags != -1 && BagModel.getInstance().itemIsBind(itemData.flags)){
                    lockImg2.visible = true;
                }
            } else if (itemData.isLock) {
                lockImg.skin = "common/ui/tongyong/suo.png";
            } else {
                gameItemBgImg.skin = "common/ui/tongyong/kuang94.png";
                gameItemImg.skin = "";
                gameItemNumberLabel.changeText("");
            }

        }
        /**
         * @describe 渲染仓库 List中的单元格
         * @param cell  Laya.Box
         * @param index  number
         */
        private onRenderListItemOfStoreHouse(cell: Laya.Box, index: number): void {
            if (index > this._storeHouseGameItemNumber) return;
            let itemData: ListItem = this._storeHouseListData[index];
            let gameItemBgImg: Laya.Image = cell.getChildByName("gameItemBg_img") as Laya.Image;
            let gameItemImg: Laya.Image = cell.getChildByName("gameItem_Img") as Laya.Image;
            let lockimg_img: Laya.Image = cell.getChildByName("lockimg_img") as Laya.Image;
            lockimg_img.visible = false;
            let gameItemNumberLabel: Laya.Label = cell.getChildByName("gameItemNumber_lab") as Laya.Label;
            if (itemData.ID != -1) {
                let str: string = itemData.number > 1 ? itemData.number.toString() : "";
                gameItemBgImg.skin = BagSystemModule.getGameItemFrameColorResource(itemData.nquality);
                gameItemImg.skin = "common/icon/item/" + itemData.icon + ".png";
                gameItemNumberLabel.changeText(str);
                gameItemImg.on(LEvent.DOUBLE_CLICK, this, this.cTranceItem, [BagTypes.DEPOT, itemData.key, -1, BagTypes.BAG, -1, this._nowPage, -1, index]);
                if(itemData.flags != -1 && BagModel.getInstance().itemIsBind(itemData.flags)){
                    lockimg_img.visible = true;
                }
            } else {
                gameItemBgImg.skin = "common/ui/tongyong/kuang94.png";
                gameItemImg.skin = "";
                gameItemNumberLabel.changeText("");
            }

        }

        /**
         * @describe  修改当前仓库的名称
         * @param text 修改的名称
         */
        private refreshStoreHouseName(): void {

        }
        /**
         * @describe  显示提示窗口
         */
        private showRemindViewMediatorEvent(): void {
            let prompt = this.calculateNeedSilverNumber();
            let rightButtonName = "确定";
            //关闭选择仓库界面
            bagModel.getInstance()._isStoreHouseBtnOpen = false;
            this._bagSelectedViewMediator.hide();
            this.skewStroeHouseSign(false);
            // 显示提示界面
            this._recordRemindViewMediator = 2;
            this._remindViewMediator.onShow(prompt, rightButtonName);
            // 公共界面
            this._remindViewMediator.once(commonUI.RIGHT_BUTTON_EVENT, this, this.clickEnSureBtnEvent);
            this._remindViewMediator.once(commonUI.LEFT_BUTTON_EVENT, this, this.clickCancelBtnEvent);
            /** 银币兑换界面使用金币兑换 */
            this._jinBiBuZuViewMediator.once(commonUI.USE_GOLD_EXCHANGE_EVENT, this, this.onClickUseGoldBtnEvent);
            /** 银币兑换界面使用元宝兑换 */
            this._jinBiBuZuViewMediator.once(commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.onClickUseYuanBaoOfSilverBtnEvent);//onClickUseYuanBaoOfSilverBtnEvent
            /** 金币兑换界面使用元宝兑换 */
            this._jinBiBuZuViewMediator.once(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.onClickUseYuanBaoBtnEvent);


        }
        /**
         * @describe  计算解锁一个仓库需要的银币
         * @return 提示信息
         */
        private calculateNeedSilverNumber(): string {
            let depotItem = this._totalPage * 25;
            this._deblockingSilverNumber = BagModel.getInstance().getDeblockingDepotSilverNumber(depotItem);
            this._deblockingGoldNumber = this._deblockingSilverNumber / 100;
            this._deblockingFuShiNumber = this._deblockingSilverNumber / 10000;
            let prompt: string = "解锁一个仓库，需要话费" + this._deblockingSilverNumber + "银币";
            return prompt;
        }
        /**
         * @describe  计算解锁一个背包格子（5个）需要多少银币
         * @return  提示信息
         */
        private calculateNeedOfLockBagSilverNumber(): string {
            //有10格是锁着的
            let bagItem = this._bagGameItemListLength - 10;
            this._deblockingBagSilverNumber = BagModel.getInstance().getDeblockingBagSilverNumber(bagItem);
            this._deblockingBagGoldNumber = this._deblockingBagSilverNumber / 100;
            this._deblockingBagFuShiNumber = this._deblockingBagSilverNumber / 10000;
            let prompt: string = "增加5个包裹格，需要花费" + this._deblockingBagSilverNumber + "银币";
            return prompt;
        }
        /**
         * @describe  选择背包中的单元格
         * @param index   下标
         */
        private onSeletListItemOfBagItem(index: number): void {
            if (index == -1) return;
            let itemData = this._bagGameItemListData[index];
            //锁
            if (itemData.isLock) {
                let prompt: string = this.calculateNeedOfLockBagSilverNumber();
                this._recordRemindViewMediator = 1;
                this._remindViewMediator.onShow(prompt, "确定");
                // 公共界面
                this._remindViewMediator.once(commonUI.RIGHT_BUTTON_EVENT, this, this.clickEnSureBtnEvent);
                this._remindViewMediator.once(commonUI.LEFT_BUTTON_EVENT, this, this.clickCancelBtnEvent);
                /** 银币兑换界面使用金币兑换 */
                this._jinBiBuZuViewMediator.once(commonUI.USE_GOLD_EXCHANGE_EVENT, this, this.onClickUseGoldBtnEvent);
                /** 银币兑换界面使用元宝兑换 */
                this._jinBiBuZuViewMediator.once(commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.onClickUseYuanBaoOfSilverBtnEvent);//onClickUseYuanBaoOfSilverBtnEvent
                /** 金币兑换界面使用元宝兑换 */
                this._jinBiBuZuViewMediator.once(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.onClickUseYuanBaoBtnEvent);

            } else {
                /** 播放选中特效 */
                this.PlayEffect(this._viewUI.bagGameItem_list, index);
            }
            if (itemData.ID != -1) {
                var parame: Dictionary = new Dictionary();
                parame.set("itemId", itemData.ID);
                parame.set("key", itemData.key);
                parame.set("packid", 1);
                parame.set("outbattleuse", itemData.outbattleuse);//("packid",1)
                parame.set("shopid", itemData.shopId);
                parame.set("number", itemData.number);
                parame.set("equiptype", itemData.equipType);
                parame.set("currdepot", this._nowPage);
                let notShow = true;
                let access = true;
                //gameItemImg.on(LEvent.DOUBLE_CLICK,this,this.cTranceItem,[BagTypes.BAG,itemData.key,-1,BagTypes.DEPOT,-1,this._nowPage,-1]);
                this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame, notShow, access);
            }

            this._viewUI.bagGameItem_list.selectedIndex = -1;
        }
        private onSeletListItemOfStoreHouseItem(index: number): void {
            if (index == -1) return;
            let itemData = this._storeHouseListData[index];
            if (itemData.ID != -1) {
                var parame: Dictionary = new Dictionary();
                parame.set("itemId", itemData.ID);
                parame.set("key", itemData.key);
                parame.set("packid", BagTypes.DEPOT);
                parame.set("outbattleuse", itemData.outbattleuse);//("packid",1)
                parame.set("shopid", itemData.shopId);
                parame.set("number", itemData.number);
                parame.set("equiptype", itemData.equipType);
                parame.set("currdepot", this._nowPage);
                let notShow = true;
                let access = false;
                this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame, notShow, access);
            }
            /** 播放选中特效 */
            this.PlayEffect(this._viewUI.storeHouse_list, index);
            this._viewUI.storeHouse_list.selectedIndex = -1;
        }





        ////////////////
        ///事件
        ////////////////
        /**
         * @describe  注册事件
         */
        private registerEvent(): void {
            // 界面UI事件
            this._viewUI.StoreHouse_btn.on(LEvent.MOUSE_DOWN, this, this.clickStoreHouseBtnEvent);
            this._viewUI.changeStoreHouseName_btn.on(LEvent.MOUSE_DOWN, this, this.clickChangeStoreHouseNameBtnEvent);
            this._viewUI.upPage_btn.on(LEvent.MOUSE_DOWN, this, this.clickUpPageBtnEvent);
            this._viewUI.downPage_btn.on(LEvent.MOUSE_DOWN, this, this.clickDownPageEvent);
            this._viewUI.arrangeBag_btn.on(LEvent.MOUSE_DOWN, this, this.clickArrangeBagEvent);
            this._viewUI.arrangeStoreHouse_btn.on(LEvent.MOUSE_DOWN, this, this.clickArrangeStoreHouseBtnEvent);
            // 通讯事件
            models.BagProxy.getInstance().on(models.ACCPET_STOREHOUSE_DATA_EVENT, this, this.controlStoreHouseList);//原this.controlStoreHouseList
            models.BagProxy.getInstance().on(models.ACCPET_STOREHOUSE_NUM_EVENT, this, this.refreshDepotNum);
            models.BagProxy.getInstance().on(models.STOREHOUSE_RENAME_EVENT, this, this.closeStoreHouseViewMediatorEvent);
            models.BagProxy.getInstance().on(models.CLOSE_SELETED_STOREHOUSE_EVENT, this, this.seletedStoreHouseEvent);
            models.BagProxy.getInstance().on(models.ARRANGE_BAG, this, this.controlBagGameItemList);
            models.BagProxy.getInstance().on(models.DEBLOCKING_EVENT, this, this.showRemindViewMediatorEvent);
            models.BagProxy.getInstance().on(models.DEPOTNAME_EVENT, this, this.setStoreHouseBtnName);
            models.BagProxy.getInstance().on(models.REFRESH_BAG_COUNT, this, this.controlBagGameItemList);
            models.BagProxy.getInstance().on(models.REFRESH_BAG_DEPOT_COUNT, this, this.RefreshBagAndDepot);
            models.BagProxy.getInstance().on(models.ACCPET_CURRENT_EVENT, this, this.accpetCurrent);

        }


        /**
         * @describe  点击仓库按钮的事件
         */
        public clickStoreHouseBtnEvent(): void {

            if (!bagModel.getInstance()._isStoreHouseBtnOpen) {
                bagModel.getInstance()._isStoreHouseBtnOpen = true;
                this._bagSelectedViewMediator.show();
                this.skewStroeHouseSign(true);
            } else {
                bagModel.getInstance()._isStoreHouseBtnOpen = false;
                this._bagSelectedViewMediator.hide();
                this.skewStroeHouseSign(false);
            }
            // this._viewUI.once(LEvent.MOUSE_DOWN,this,this.closeSelectedStoreHouse)
        }
        /**
         * @describe  修改仓库名称事件
         */
        private clickChangeStoreHouseNameBtnEvent(): void {
            // 派发事件
            this._bagStoreHouseRenameViewMediator.onShow(this._nowPage);
        }
        /**
         * @describe  跳转到上个仓库
         */
        private clickUpPageBtnEvent(): void {
            this.switchNowPage(ButtonType.UP_BTN);
        }
        /**
         * @describe  跳转到下一个仓库
         */
        private clickDownPageEvent(): void {
            this.switchNowPage(ButtonType.DOWN_BTN);
        }
        /**
         * @describe  整理背包
         */
        private clickArrangeBagEvent(): void {
            RequesterProtocols._instance.c2s_CList_Pack(BagTypes.BAG, 0);
        }
        /**
         * @describe  整理仓库事件
         */
        private clickArrangeStoreHouseBtnEvent(): void {
            // Protocols._instance.c2s_CGetDepot_Info(this._nowPage);

            // 如果连续点击多次则会有相应的提示
            //发送当前的编号
            RequesterProtocols._instance.c2s_CList_Depot(this._nowPage);
        }
        /**
         * 仓库重命名UI关闭的回调事件
         * @param storeHouseName 修改仓库的名称
         * @param isPanel 判断是否关闭修改界面
         */
        private closeStoreHouseViewMediatorEvent(isPanel: Boolean): void {
            //获取服务端传回的消息，修改对应的仓库名称
            //this.refreshStoreHouseName();
            if (isPanel == false) return;
            this._bagStoreHouseRenameViewMediator.hide();
        }
        /**
         * @describe  选中仓库按钮的回调事件
         * @describe  选中并加仓库数据
         * @param pageId   仓库id
         */
        private seletedStoreHouseEvent(pageId: number): void {
            // 传回的List控件下标从0开始
            pageId += 1;
            // 关闭seletedUI
            this.clickStoreHouseBtnEvent();
            if (this._nowPage != pageId && pageId <= this._totalPage) {
                this._nowPage = pageId;
                RequesterProtocols._instance.c2s_CGetDepot_Info(this._nowPage);
                this.setNowPage(this._nowPage);
                this.setStoreHouseBtnName(bagModel.getInstance().storeHouseBtnName[this._nowPage - 1].label);
            }
        }
        /**
         * @describe  在提示界面(解锁仓库时候)时候的确定按钮事件    
         */
        private clickEnSureBtnEvent(): void {
            if (this._recordRemindViewMediator == BagTypes.DEPOT) {
                this.clickEnSureBtnOfDeblockingDepotEvnt(BagTypes.DEPOT);
            } else if (this._recordRemindViewMediator == BagTypes.BAG) {
                // this.clickEnSureBtnOfDeblockingBagEvnt();
                this.clickEnSureBtnOfDeblockingDepotEvnt(BagTypes.BAG);
            }
            // this._recordRemindViewMediator = -1;
            /** 移除取消事件 */
            this._remindViewMediator.off(commonUI.LEFT_BUTTON_EVENT, this, this.clickCancelBtnEvent);
        }

        /**
         * @describe  解锁仓库和背包按钮时,判断银币是否足够
         */
        private clickEnSureBtnOfDeblockingDepotEvnt(type: number): void {
            let sliverIcon = models.BagModel.getInstance().sliverIcon;
            if (type == BagTypes.BAG) {
                var diff = this._deblockingBagSilverNumber - sliverIcon;
            } else if (type == BagTypes.DEPOT) {
                var diff = this._deblockingSilverNumber - sliverIcon;
            }
            if (typeof (diff) == "undefined") return;
            this._remindViewMediator.hide();
            // 银币足够
            if (diff <= 0) {
                RequesterProtocols._instance.c2s_CExtpack_Size(type);

                //银币不够，调用银币补助界面
            } else {
                let isShowGold: boolean = false;
                let needSilverNumber: string = game.utils.MoneyU.number2Thousands(diff); //银币500000
                let needGoldNumber: string = Math.ceil(diff / models.BagModel.getInstance().exchangeRateOfGold).toString();//game.utils.MoneyU.number2Thousands(diff / models.BagModel.getInstance().exchangeRateOfGold);//金币5000
                let needYuanBaoNumber: string = this._deblockingFuShiNumber.toString();//game.utils.MoneyU.number2Thousands(diff / models.BagModel.getInstance().exchangeRateOfYuanBao);//元宝50
                this._jinBiBuZuViewMediator.onShow(isShowGold, needSilverNumber, needYuanBaoNumber, needGoldNumber);
            }
        }
        /**
         * @describe  刷新背包和仓库数据交互
         */
        private RefreshBagAndDepot(): void {
            this.controlStoreHouseList(this._nowPage);
            this.controlBagGameItemList();
        }

        /**
         * @describe   
         */
        private clickCancelBtnEvent(): void {
            /** 移除右键事件 */
            this._remindViewMediator.off(commonUI.RIGHT_BUTTON_EVENT, this, this.clickEnSureBtnEvent);
            this._remindViewMediator.hide();
        }
        /**
         * @describe  银币补助界面，点击使用金币代替按钮事件
         */
        private onClickUseGoldBtnEvent(): void {
            /** 玩家拥有的金币 */
            let Gold = models.BagModel.getInstance().globalIcon;
            switch (this._recordRemindViewMediator) {
                case BagTypes.BAG:
                    var isEnough = this._deblockingBagGoldNumber - Gold; break;
                case BagTypes.DEPOT:
                    var isEnough = this._deblockingGoldNumber - Gold; break;
                default:
                    break;
            }
            this._jinBiBuZuViewMediator.hide();
            if (typeof (isEnough) == "undefined") return;
            if (isEnough <= 0)/** 金币足够 */ {
                /** 先请求钱币兑换 -->金币转银币 */
                RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_GoldCoin, MoneyTypes.MoneyType_SilverCoin, this._deblockingGoldNumber);
                RequesterProtocols._instance.c2s_CExtpack_Size(this._recordRemindViewMediator);
            } else {
                let isShowGold: boolean = true;
                let needSilverNumber: string = game.utils.MoneyU.number2Thousands(isEnough);
                let needGoldNumber: string = Math.ceil(isEnough / models.BagModel.getInstance().exchangeRateOfGold).toString();//game.utils.MoneyU.number2Thousands(isEnough / models.BagModel.getInstance().exchangeRateOfGold);
                let needYuanBaoNumber: string = this._deblockingFuShiNumber.toString();//game.utils.MoneyU.number2Thousands(isEnough / models.BagModel.getInstance().exchangeRateOfYuanBao * 100);
                this._jinBiBuZuViewMediator.onShow(isShowGold, needSilverNumber, needYuanBaoNumber, needGoldNumber);
            }

        }
        /** 
         * 金币补足界面，点击使用元宝代替按钮事件
         */
        private onClickUseYuanBaoBtnEvent(): void {
            /** 玩家拥有的符石数 */
            let FuShi_Num = models.BagModel.getInstance().yuanbaoIcon;
            switch (this._recordRemindViewMediator) {
                case BagTypes.BAG:
                    var isEnough = this._deblockingBagFuShiNumber - FuShi_Num; break;
                case BagTypes.DEPOT:
                    var isEnough = this._deblockingFuShiNumber - FuShi_Num; break;
                default:
                    break;
            }
            this._jinBiBuZuViewMediator.hide();
            if (typeof (isEnough) == "undefined") return;
            if (isEnough <= 0)/** 符石足够 */ {
                /** 先请求钱币兑换 -->符石转金币 */
                RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_HearthStone, MoneyTypes.MoneyType_GoldCoin, this._deblockingFuShiNumber);
                // RequesterProtocols._instance.c2s_CExtpack_Size(this._recordRemindViewMediator);
            } else {
                let prompto = HudModel.getInstance().promptAssembleBack(PromptExplain.CHARGE_TIPS);
                this._remindViewMediator.onShow(prompto);
                this._remindViewMediator.once(commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
                this._remindViewMediator.once(commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);
            }

        }



        /**
         * @describe  银币补足界面，点击使用符石兑换按钮事件
         */
        private onClickUseYuanBaoOfSilverBtnEvent(): void {
            /** 玩家拥有的符石数 */
            let FuShi_Num = models.BagModel.getInstance().yuanbaoIcon;
            switch (this._recordRemindViewMediator) {
                case BagTypes.BAG:
                    var isEnough = this._deblockingBagFuShiNumber - FuShi_Num; break;
                case BagTypes.DEPOT:
                    var isEnough = this._deblockingFuShiNumber - FuShi_Num; break;
                default:
                    break;
            }
            this._jinBiBuZuViewMediator.hide();
            if (typeof (isEnough) == "undefined") return;
            if (isEnough <= 0)/** 符石足够 */ {
                /** 先请求钱币兑换 -->符石转银币 */
                RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_HearthStone, MoneyTypes.MoneyType_SilverCoin, this._deblockingFuShiNumber);
                RequesterProtocols._instance.c2s_CExtpack_Size(this._recordRemindViewMediator);
            } else {
                let prompto = HudModel.getInstance().promptAssembleBack(PromptExplain.CHARGE_TIPS);
                this._remindViewMediator.onShow(prompto);
                this._remindViewMediator.once(commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
                this._remindViewMediator.once(commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);
            }

        }
        /** 
         * 点击进行仓库和背包里的数据交换请求
         */
        private cTranceItem(Id: number, itemKey: number, num: number, saveType: number, dstPos: number, depotId: number, npcId: number, index: number): void {
            /** 加一层判断 从仓库来数据可能是错的*/
            if (Id == BagTypes.DEPOT) {
                let itemId = this._storeHouseListData[index].ID;
                /**当前仓库没有所选道具  */
                if (itemId == -1) return;
            }
            /** 将当前所在的仓库存入Model中 */
            bagModel.getInstance().currDepotId = this._nowPage;
            depotId = this._nowPage;
            if (Id == BagTypes.DEPOT) depotId == -1;
            RequesterProtocols._instance.c2s_CTrans_Item(Id, itemKey, num, saveType, dstPos, depotId, npcId);
        }
        /** 跳到充值界面 */
        private jumpToCharge(): void {
            /** 移除左键事件 */
            this._remindViewMediator.off(commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);
            /** 跳转到充值界面 */
            ModuleManager.jumpPage(ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
            ModuleManager.hide(ModuleNames.BAG);
            LoginModel.getInstance().CommonPage = "Bag";
        }
        /** 取消不跳转 */
        private cancleToJump(): void {
            /** 移除右键事件 */
            this._remindViewMediator.off(commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
            this._remindViewMediator.hide();
        }





        ////////////////
        ///UI
        ////////////////
        /**
          * @describe  控制storeHouse_list
          */
        private controlStoreHouseList(pageId: number): void {
            this.refreshDepotNum(false);
            this._viewUI.storeHouse_list.spaceX = 5;
            this._viewUI.storeHouse_list.spaceY = 5;
            this._viewUI.storeHouse_list.repeatX = 5;
            this._viewUI.storeHouse_list.repeatY = this._storeHouseGameItemNumber / this._viewUI.storeHouse_list.repeatX;
            this.getStoreHoustGameItemListData(pageId);
            this.listScrollOfStoreHouse(this._viewUI.storeHouse_list);
        }

        /**
         * @describe  控制myGameItem_list
         */
        private controlBagGameItemList(): void {
            if (models.BagModel.getInstance().actBagNum < 100)
                this._bagGameItemListLength = models.BagModel.getInstance().actBagNum + 10;
            else {
                this._bagGameItemListLength = models.BagModel.getInstance().actBagNum;
                this.bagLatticereachUpperLimit = true;
            }
            this._viewUI.bagGameItem_list.spaceX = 5;
            this._viewUI.bagGameItem_list.spaceY = 5;
            //每次滑动，系统会自行计算
            this._viewUI.bagGameItem_list.repeatX = 5;
            this._viewUI.bagGameItem_list.repeatY = this._bagGameItemListLength / this._viewUI.bagGameItem_list.repeatX;
            this.getBagGameItemListData(BagTypes.BAG);
            this.listScrollOfBagGameItem(this._viewUI.bagGameItem_list);
        }
        /**
         * @describe  设置当前总共的仓库数量
         * @param num 总共的仓库数量
         */
        private setTotalPage(num: number): void {
            this._viewUI.pages_lab.text = num.toString();
        }
        /**
         * @describe  设置当前的仓库数
         * @param num   当前的仓库
         */
        private setNowPage(num: number): void {
            this._viewUI.nowPage_lab.text = num.toString();
        }
        /**
         * @describe  仓库按钮上的三角形图片翻转
         * @param bool   是否翻，转默认false为down状态
         */
        private skewStroeHouseSign(bool: boolean): void {
            if (bool) {
                this._viewUI.stroeHouseSign_img.skewX = 180;
            } else {
                this._viewUI.stroeHouseSign_img.skewX = 0;
            }
        }
        /**
         * @describe  设置当前所在仓库
         * @param type 按钮类型
         */
        private switchNowPage(type: ButtonType) {
            switch (type) {
                case ButtonType.UP_BTN:
                    this._nowPage -= 1;
                    break;
                case ButtonType.DOWN_BTN:
                    this._nowPage += 1;
                    break;
                default:
                    console.log("BagsStoreHouseViewMediator file setNowPageNumber function error ");
                    break;
            }

            if (this._nowPage > this._totalPage) {
                this._nowPage = 1;
            } else if (this._nowPage < 1) {
                this._nowPage = this._totalPage;
            }
            RequesterProtocols._instance.c2s_CGetDepot_Info(this._nowPage);
            //切换list
            // this.controlStoreHouseList(this._nowPage-1)
            this.setNowPage(this._nowPage);
            this.setStoreHouseBtnName(bagModel.getInstance().storeHouseBtnName[this._nowPage - 1].label);
        }

        /**
         * @describe  设置仓库名称
         * @param name   仓库名
         */
        private setStoreHouseBtnName(name: string): void {
            this._viewUI.StoreHouse_btn.label = name;
        }

        /** 
         * 刷新倉庫數量
         * @param isTips 是否弹窗刷新仓库
         */
        private refreshDepotNum(isTips: boolean = true): void {
            let depotNumber = game.modules.bag.models.BagModel.getInstance().depotnameinfo.keys.length;//0
            this._totalPage = depotNumber > 0 ? depotNumber + FREE_STOREHOUSE_NUMBER : FREE_STOREHOUSE_NUMBER;
            this.setTotalPage(this._totalPage);
            /** 初始化倉庫 */
            game.modules.bag.models.BagModel.getInstance().getDepotNumber();
            if (!isTips) return;
            let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[PromptExplain.DEPOT_HOUSE_UNLOCK];
            // let disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
            // disappearMsgTips.onShow(chattext.msg);
            chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, chattext.msg);
        }
        /** 播放特效 */
        private PlayEffect(list: Laya.List, index: number): void {
            let cell = list.getCell(index);
            let selectItem: Laya.Image = cell.getChildByName("gameItemBg_img") as Laya.Image;
            this.ani.loadAtlas("common/res/atlas/ui/tuji.atlas", Laya.Handler.create(this, this.onCreateFrame));
            selectItem.addChild(this.ani);
            this.ani.scaleX = 0.9;
            this.ani.scaleY = 0.9;
        }
        /** 创建动画 */
        public onCreateFrame() {
            let effecthPath = bagModel.getInstance().getEffectUrls("xuanzhong", 9);
            Laya.Animation.createFrames(effecthPath, "xuanzhong");
            this.ani.play(0, true, "xuanzhong");
            this.ani.interval = 112;
        }
        /**修改完成仓库名字飘窗 */
        public accpetCurrent() {
            let prompt = HudModel.getInstance().promptAssembleBack(162176);
            let disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
            disappearMsgTips.onShow(prompt);
        }
    }
}