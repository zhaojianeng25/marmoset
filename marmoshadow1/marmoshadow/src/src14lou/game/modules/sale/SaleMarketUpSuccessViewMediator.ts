/**
* 上架成功 
*/
module game.modules.sale {
    export class SaleMarketUpSuccessViewMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.SaleShelfSuccessUI;
        private ispitch: boolean = false;               //是否选中七天不提示
        constructor(uiLayer: Sprite, israrity) {
            super(uiLayer);
            this._viewUI = new ui.common.SaleShelfSuccessUI();
            this.isCenter = false;
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
            this._viewUI.confirm_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
            this._viewUI.noHint_check.on(LEvent.CLICK, this, this.onHintcheck);
            this.showDetails(israrity);
        }
        /**显示上架成功信息 */
        public showDetails(israrity) {
            if (israrity == 1) {
                this._viewUI.rarity_label.visible = true;
                this._viewUI.noRarity_label.visible = false;
            } else {
                this._viewUI.rarity_label.visible = false;
                this._viewUI.noRarity_label.visible = true;
            }

        }

        /**七天不在提示 */
        public onHintcheck(): void {
            if (this._viewUI.noHint_check.selected) this.ispitch = true;
            else this.ispitch = false;
        }

        public show(): void {
            let isshow: boolean = this.exanineTime();
            if (isshow) return;
            super.show();
        }

        /**返回物品七天是否显示 */
        private exanineTime(): boolean {
            let isAuctionTime = LoginModel.getInstance().isAuctionTime;
            if (isAuctionTime != "") {
                let currentTime: number = (new Date()).valueOf();
                // 隐藏7天提示
                if (Number(isAuctionTime) > currentTime)  return true; 
                else return false;
            }
        }

        public hide(): void {
            if (this.ispitch) { this.pitchPast(); super.hide(); }
            super.hide();
        }

        /**七天过期时间 */
        private pitchPast(): void {
            var currentTime: number = (new Date()).valueOf() + 604800000;    // 过期的毫秒  
            LoginModel.getInstance().isAuctionTime = currentTime.toString();   // 赋值给login里面的时间
            let currRoleId: number = LoginModel.getInstance().roleDetail.roleid;  // 角色id
            let currAccount: string = LoginModel.getInstance().userLoginAccount;  // 账号
            LocalStorage.setItem(currAccount + currRoleId.toString() + "timeStr", currentTime.toString());  // 写入缓存
        }

        public getView(): Sprite {
            return this._viewUI;
        }
    }
}