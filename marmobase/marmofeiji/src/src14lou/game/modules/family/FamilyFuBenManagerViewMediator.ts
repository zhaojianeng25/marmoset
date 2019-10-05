/**
* 副本管理
*/
module game.modules.family {
    export class FamilyFuBenManagerViewMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.FamilyFuBenManagerUI;
        tipsModule: game.modules.tips.tipsModule;
        /**公会副本参数表 */
        instanceCInstaceConfigData = models.FamilyModel.getInstance().instanceCInstaceConfigData;
        /**选择的副本 */
        selectFuben: Laya.CheckBox = null;
        /**公会副本数据 */
        fubenArr = [];
        /**保存当前点击的副本列表的index */
        index = 0;

        constructor(uiLayer: Sprite, app: AppBase) {
            super(uiLayer);
            this._viewUI = new ui.common.FamilyFuBenManagerUI();
            this._app = app;
            this.isCenter = false;

            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
            this._viewUI.save_btn.on(LEvent.MOUSE_DOWN, this, this.saveSet);
            this.showThisView();
        }

        public showThisView() {
            var fubenArr = [];
            for (var i in this.instanceCInstaceConfigData) {
                var serversid = this.instanceCInstaceConfigData[i].serversid;
                var name = this.instanceCInstaceConfigData[i].name;
                var claninstservice = models.FamilyModel.getInstance().clanInfo[0].claninstservice;
                if (claninstservice.get(serversid) != undefined) {
                    var value = claninstservice.get(serversid);
                    fubenArr.push({ serversid: serversid, fubenname_lab: name, value: value });
                }
            }
            this.fubenArr = fubenArr;

            SaleModel._instance.showList(this._viewUI.fuben_list, fubenArr);
            this._viewUI.fuben_list.renderHandler = new Handler(this, this.fubenlistRender);
        }

        public fubenlistRender(cell: Box, index: number) {
            var gouxuantishiBtn = cell.getChildByName("gouxuantishi_btn") as Button;
            var ischeck_check = cell.getChildByName("ischeck_check") as Laya.CheckBox;

            var value = this.fubenArr[index].value;
            if (value == 1) {
                this.index = index;
                this.selectFuben = ischeck_check;
            }
            this.selectFuben.selected = true;
            ischeck_check.clickHandler = new Handler(this, this.clickCheck, [cell, index]);
            gouxuantishiBtn.on(LEvent.MOUSE_DOWN, this, this.onGouxuantishi, [index, this.fubenArr]);
        }

        /**提示 */
        public onGouxuantishi(index, fubenArr) {
            var name = fubenArr[index].fubenname_lab;
            this.showTips(name);
        }

        /**选择副本 */
        public clickCheck(cell, index) {
            var ischeck_check = cell.getChildByName("ischeck_check") as Laya.CheckBox;
            if (this.selectFuben != ischeck_check) {
                this.selectFuben.selected = false;
                this.fubenArr[index].value = 1;
                this.fubenArr[this.index].value = 0;
                this.index = index;
                this.selectFuben = ischeck_check;
            } else {
                this.selectFuben.selected = true;
            }
        }
        
        /**显示提示弹窗 */
        public showTips(name) {
            var parameArr: Dictionary = new Dictionary();
            parameArr.set("title", 11513);
            parameArr.set("contentId", 11512);
            var parame = [name];
            parameArr.set("parame", parame);
            this.tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, parameArr);
        }
        
        /**保存设置 */
        public saveSet() {
            var claninstservice = models.FamilyModel.getInstance().clanInfo[0].claninstservice;
            var serversid = this.fubenArr[this.index].serversid;
            if(claninstservice.get(serversid) != 1){
                this.CChangeClanInst(serversid);
            }
            this.hide();
        }

        /**
         * 改变公会副本
         * @param claninstservice 进入副本服务编号
         */
        public CChangeClanInst(claninstservice) {
            RequesterProtocols._instance.c2s_CChangeClanInst(claninstservice);
        }

        public show() {
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