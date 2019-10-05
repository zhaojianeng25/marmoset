/**
* list弹窗
*/
module game.modules.sale {
    export class SaleSearchBtnListViewMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.SaleSearchBtnListUI;

        itemAttrData = BagModel.getInstance().itemAttrData;//复合表
        /**装备附加属性库by skill */
        equipAddattributelibDataBySkill = StrengTheningModel.getInstance().equipAddattributelibDataBySkill;
        /**装备附加属性库 */
        equipAddattributelibData = StrengTheningModel.getInstance().equipAddattributelibData;
        /**属性效果id表 */
        attributeDesConfigData = StrengTheningModel.getInstance().attributeDesConfigData;

        constructor(uiLayer: Sprite) {
            super(uiLayer);
            this._viewUI = new ui.common.SaleSearchBtnListUI();
            this.isCenter = false;
            this._viewUI.bg_img.on(LEvent.MOUSE_DOWN, this, this.hide);
        }
        /**显示查询列表 */
        public showSearchList(posX, posY, listArr, num) {
            var listbox = this._viewUI.list_box;
            listbox.pos(posX, posY);
            var btnlist = this._viewUI.btn_list;
            SaleModel._instance.showList(btnlist, listArr);
            btnlist.renderHandler = new Handler(this, this.btnlistRender, [listArr, num]);
        }

        /**列表渲染 */
        public btnlistRender(listArr: Array<any>, num, cell: Box, index: number) {
            var onebtn = cell.getChildByName("onebtn") as Button;
            onebtn.label = listArr[index].name;
            onebtn.on(LEvent.MOUSE_UP, this, this.onOneBtn, [listArr, cell, index, num]);

        }

        /**点击列表按钮 */
        public onOneBtn(listArr, cell, index, num) {
            var onebtn = cell.getChildByName("onebtn") as Button;
            this.hide();
            switch (num) {
                case 1:
                    models.SaleProxy._instance.event(models.onSaleListTipsbtn, index);  //装备部件
                    break;
                case 2:
                    models.SaleProxy._instance.event(models.onSaleListEqulevelbtn, index);  //搜索装备等级
                    break;
                case 3:
                    models.SaleProxy._instance.event(models.onSaleListEquBastAttrbtn1, index); //搜索装备基础属性1
                    break;
                case 4:
                    models.SaleProxy._instance.event(models.onSaleListEquBastAttrbtn2, index);  //搜索装备基础属性2
                    break;
                case 5:
                    models.SaleProxy._instance.event(models.onSaleListEquBastAttrbtn3, index);  //搜索装备基础属性3
                    break;
                case 6:
                    models.SaleProxy._instance.event(models.onSaleListEquTeXiao, index); //搜索装备特效
                    break;
                case 7:
                    models.SaleProxy._instance.event(models.onSaleListEquTeJi, index);  //搜索装备特技
                    break;
                case 8:
                    models.SaleProxy._instance.event(models.onSaleListEquAddAttr, index); //搜索装备附加属性
                    break;
                case 9:
                    models.SaleProxy._instance.event(models.onSalePetZizhi1, index); //宠物资质1
                    break;
                case 10:
                    models.SaleProxy._instance.event(models.onSalePetZizhi2, index);  //宠物资质2
                    break;
                case 11:
                    models.SaleProxy._instance.event(models.onSalePetZizhi3, index);  //宠物资质3
                    break;
                case 12:
                    models.SaleProxy._instance.event(models.onSalePetBaseAttr1, index);  //宠物基础属性1
                    break;
                case 13:
                    models.SaleProxy._instance.event(models.onSalePetBaseAttr2, index);  //宠物基础属性2
                    break;
                case 14:
                    models.SaleProxy._instance.event(models.onSalePetBaseAttr3, index);  //宠物基础属性3
                    break;
            }
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