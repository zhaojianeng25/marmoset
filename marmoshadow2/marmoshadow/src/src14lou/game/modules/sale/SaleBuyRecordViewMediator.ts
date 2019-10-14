/**
* 交易记录界面 
*/
module game.modules.sale {
    export class SaleBuyRecordViewMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.ShopTransactionRecordUI;
        private _AuctionSell: SaleSellViewMediator;
        private _AuctionGongshi: SaleGongshiViewMediator;
        /**复合表 */
        itemAttrData = BagModel.getInstance().itemAttrData;
        /**装备附加属性库by skill */
        equipAddattributelibDataBySkill = StrengTheningModel.getInstance().equipAddattributelibDataBySkill;
        /**装备附加属性库 */
        equipAddattributelibData = StrengTheningModel.getInstance().equipAddattributelibData;
        /**属性效果id表 */
        attributeDesConfigData = StrengTheningModel.getInstance().attributeDesConfigData;
        /**食品表 */
        foodAndDrugEffectData = SaleModel._instance.foodAndDrugEffectData;
        /**食品公示表 */
        foodAndDrugFormulaData = SaleModel._instance.foodAndDrugFormulaData;
        constructor(uiLayer: Sprite) {
            super(uiLayer);
            this._viewUI = new ui.common.ShopTransactionRecordUI();
            this.isCenter = false;
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
            models.SaleProxy._instance.on(models.SMarketTradeLog, this, this.showRecord);
        }

        /**显示购买记录 */
        public showRecord() {
            var buyRecord = SaleModel._instance.buyRecordArr;
            var saleRecord = SaleModel._instance.saleRecordArr;
            var saleRecordList = this._viewUI.sellRecord_list;
            var buyRecordList = this._viewUI.buyRecord_list;
            if (buyRecord.length > 0) {  //是否有购买记录
                this._viewUI.buyRecordNull_img.visible = false;
                var recordArr = this.showList(buyRecord)
                SaleModel._instance.showList(buyRecordList, recordArr);
            } else {
                buyRecordList.visible = false;
                this._viewUI.buyRecordNull_img.visible = true;
            }
            if (saleRecord.length > 0) { //是否有出售记录
                this._viewUI.sellRecordNull_img.visible = false;
                var recordArr = this.showList(saleRecord)
                SaleModel._instance.showList(saleRecordList, recordArr);
            } else {
                saleRecordList.visible = false;
                this._viewUI.sellRecordNull_img.visible = true;
            }
        }
        /**显示记录 */
        public showList(arr) {
            var recordArr: Array<any> = [];
            for (var i = 0; i < arr.length; i++) {
                var log = arr[i];
                var itemid = log.itemid;
                var level = log.level;
                var num = log.num;
                var price = log.price;
                var name = this.itemAttrData[itemid].name;
                var iconid = this.itemAttrData[itemid].icon;
                var itemIcon = SaleModel._instance.getIcon(iconid);
                var nquality = this.itemAttrData[itemid].nquality;
                var frame = StrengTheningModel._instance.frameSkinArr[nquality - 1];
                recordArr.push({ frame_img: frame, icon_img: itemIcon, name_label: name, price_label: price })
            }
            return recordArr;
        }

        public show(): void {
            RequesterProtocols._instance.c2s_market_tradelog();
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