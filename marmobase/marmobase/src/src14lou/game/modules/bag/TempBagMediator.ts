
module game.modules.bag {
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
        /** 服务器中的kry */
        key: number;
        /** 装备类型表，不为装备为-1 */
        equipType: number;
        /** 战斗外使用对象 */
        outbattleuse: number;
        /** 商城Id */
        shopId: number;
    }
    /** 临时背包最大格子数 */
    export const Temp_BAG_MAX_NUM = 15;
    export class TempBagMediator extends game.modules.UiMediator {
        /**仓库选择界面 */
        private _viewUI: ui.common.BagTemporaryUI;
        // 仓库按钮是否解锁，名称等数据
        private _tempBagListData: Array<any> = [];
        /**仓库个数 */
        private _tempBagListDataLength: number;
        /**临时背包中道具位置*/
        private _bagGameItemListPos: Laya.Dictionary;
        /**临时背包中道具数据*/
        private _bagGameItemListData = [];
        /** 弹出Tips界面 */
        private _tipsModule: game.modules.tips.tipsModule;
        constructor(uiLayer: Sprite, app: AppBase) {
            super(uiLayer);
            this._viewUI = new ui.common.BagTemporaryUI()
            this._viewUI.mouseThrough = true;
            this.isCenter = false;
            this._app = app;
        }

        private onLoad() {
            this.controlTempBagList();
            this.registBtnEvent();

        }

        // 实现的接口
        public show(): void {
            this.onLoad();
            super.show();
        }
        /** 初始化点击事件 */
        private registBtnEvent(): void {
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
            this._viewUI.oneKeyBack_btn.on(LEvent.MOUSE_DOWN, this, this.oneKeyBack);
            models.BagProxy.getInstance().on(models.REFRESH_BAG_COUNT, this, this.controlTempBagList);
        }
        /** 一键取回 */
        private oneKeyBack(): void {
            /** 物品key,-1表示所有物品 */
            let srckey = 1;
            /** 数量,-1表示全部 */
            let number = 1;
            /** 目标位置,-1,自动选择 */
            let dstpos = 1;
            /**  */
            let npcid = 1;

            RequesterProtocols._instance.c2s_COneKeyMoveTempTo_Bag(srckey, number, dstpos, npcid);
            bag.models.BagProxy.getInstance().once(bag.models.REFRESH_TEMP_BAG, this, this.hide);
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
        private controlTempBagList(): void {

            this._viewUI.tempbag_list.spaceX = 5;
            this._viewUI.tempbag_list.spaceY = 5;
            this.getTempBagistData();
            this._viewUI.tempbag_list.repeatX = 5;
            this._viewUI.tempbag_list.repeatY = 3;
            this.listScroll(this._viewUI.tempbag_list);
        }
        /**
         * @describe  获取临时背包list数据
         */
        private getTempBagistData(): void {
            let bag: game.modules.bag.models.BagVo = BagModel.getInstance().getBagGameItemData(BagTypes.TEMP);
            // 数据为空则返回
            if (!bag) return;
            // 置空
            this._bagGameItemListData = [];
            let items = bag.items;
            /**临时存储服务端发送的道具数组 */
            let arr: Array<ListItem> = [];
            let posArray: Array<number> = [];
            let listItem: ListItem;
            this._bagGameItemListPos = new Laya.Dictionary();
            //插入Item到arr数组
            for (let index = 0; index < items.length; index++) {
                // let id = bag.getItem(index).id;
                let id = items[index].id;
                this._bagGameItemListPos.set(id, items[index].key);
                let obj = BagModel.getInstance().getItemAttrData(id);
                try {
                    var equipType = StrengTheningModel.getInstance().equipEffectData[id].eequiptype;
                } catch (error) {
                    equipType = -1;
                }

                let icon = obj.icon;
                let nquality = obj.nquality;
                let outbattleuse = obj.outbattleuse;
                let number = items[index].number;
                let pos = items[index].position;
                let key = bag.items[index].key;
                let shopId = obj.bCanSaleToNpc;
                // equipType = typeof(equipType) == "undefined"?-1:equipType;
                listItem = {
                    ID: id,
                    icon: icon,
                    number: number,
                    position: pos,
                    nquality: nquality,
                    isLock: false,
                    key: key,
                    equipType: equipType,
                    outbattleuse: outbattleuse,
                    shopId: shopId,
                };
                arr.push(listItem);
                posArray.push(pos);
            }
            for (let index = 0; index < Temp_BAG_MAX_NUM; index++) {
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
                        equipType: -1,
                        outbattleuse: -1,
                        shopId: -1,
                    };
                }
                this._bagGameItemListData.push(listItem);
            }

            this._viewUI.tempbag_list.array = this._bagGameItemListData;

        }
        /**
         * @describe  List控件的滚动回弹效果
         * @param list  list控件
         */
        private listScroll(list: Laya.List): void {
            list.selectEnable = true;
            list.renderHandler = new Handler(this, this.onRenderListItem);
            list.selectHandler = new Handler(this, this.onSelectedListItem);
        }
        /**
         * @describe 渲染List中的单元格
         * @param cell  Laya.Box
         * @param index  number
         */
        private onRenderListItem(cell: Laya.Box, index: number): void {
            if (index >= this._tempBagListDataLength) return;
            let itemData: ListItem = this._bagGameItemListData[index];
            let gameItemBgImg: Laya.Image = cell.getChildByName("gameItemBg_img") as Laya.Image;
            let gameItemImg: Laya.Image = cell.getChildByName("gameItem_Img") as Laya.Image;
            let gameItemNumberLabel: Laya.Label = cell.getChildByName("gameItemNumber_lab") as Laya.Label;
            let zhenpin_img: Laya.Image = cell.getChildByName("zhenpin_img") as Laya.Image;
            if (itemData.ID != -1) {
                gameItemNumberLabel.visible = true;
                let str: string = itemData.number > 1 ? itemData.number.toString() : "";
                gameItemBgImg.skin = BagSystemModule.getGameItemFrameColorResource(itemData.nquality);
                gameItemImg.skin = "common/icon/item/" + itemData.icon + ".png";
                gameItemNumberLabel.changeText(str);
                zhenpin_img.visible = false;
                // if(itemData.equipType != -1) gameItemImg.on(LEvent.DOUBLE_CLICK,this,this.opEquip,[OpEquip.PUTON,itemData.key,itemData.equipType]);
            }
            else {
                gameItemBgImg.skin = "common/ui/tongyong/kuang94.png";
                gameItemImg.skin = "";
                gameItemNumberLabel.visible = false;
                zhenpin_img.visible = false;
            }

        }
        /**
         * @describe 选中仓库下标时判断事件
         * @param cell  Laya.Box
         * @param index  number
         */
        private onSelectedListItem(index: number): void {
            if (index == -1) return;
            let itemData = this._bagGameItemListData[index];
            if (itemData.ID != -1) {
                var parame: Dictionary = new Dictionary();
                parame.set("itemId", itemData.ID);
                parame.set("key", itemData.key);
                parame.set("packid", BagTypes.TEMP);
                parame.set("outbattleuse", itemData.outbattleuse);//("packid",1)
                parame.set("shopid", itemData.shopId);
                parame.set("number", itemData.number);
                parame.set("equiptype", itemData.equipType);
                parame.set("purposetype", ItemPurpose.ITEM_TRANSFER);
                this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame);
            }
            this._viewUI.tempbag_list.selectedIndex = -1;
        }
    }
}