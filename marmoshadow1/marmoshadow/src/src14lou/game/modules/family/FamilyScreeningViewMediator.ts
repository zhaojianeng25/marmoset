/**
* 公会搜索筛选
*/
module game.modules.family {
    export class FamilyScreeningViewMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.FamilyScreenUI;
        private _XiaoJianPanMediator: game.modules.tips.XiaoJianPanMediator;
        /**保存小键盘输入的数字 */
        totalNum = "";
        constructor(uiLayer: Sprite, app: AppBase) {
            super(uiLayer);
            this._viewUI = new ui.common.FamilyScreenUI();
            this._app = app;
            this.isCenter = false;
            this._viewUI.close_img.on(LEvent.MOUSE_DOWN, this, this.hide);
            this._viewUI.okSearch_btn.on(LEvent.MOUSE_DOWN, this, this.searchView);
            this._viewUI.level_btn.on(LEvent.MOUSE_DOWN, this, this.onLevelBtn);
            game.modules.tips.models.TipsProxy.getInstance().on(game.modules.tips.models.ON_KRYBOARD, this, this.getNumber);
        }

        /**开始搜索 */
        public searchView() {
            var level = this._viewUI.level_btn.label;
            var school = this.selectMenPai();
            if(school == 0){
                school = -1;
            }
            var selectSex = this._viewUI.sex_redio.selectedIndex;
            var sex = -1;
            if(selectSex == 0 ){
                sex = 1;
            }else if(selectSex == 1){
                sex = 2;
            }
            this.CClanInvitationView(parseInt(level),school,sex);
            this.hide();
        }

        public onLevelBtn() {
            this.totalNum = "";
            this._XiaoJianPanMediator = new game.modules.tips.XiaoJianPanMediator(this._viewUI);
            this._XiaoJianPanMediator.show();
        }

        /**选择门派 */
        public selectMenPai() {
            var menPaiNum = 0;
            if (this._viewUI.yunxiao.selected) {
                menPaiNum += schooleType.yunxiao;
            }
            if (this._viewUI.tianlei.selected) {
                menPaiNum += schooleType.tianlei;
            }
            if (this._viewUI.danyang.selected) {
                menPaiNum += schooleType.danyang;
            }
            if (this._viewUI.xuanming.selected) {
                menPaiNum += schooleType.xuanming;
            }
            if (this._viewUI.dahuang.selected) {
                menPaiNum += schooleType.dahuang;
            }
            if (this._viewUI.wuliang.selected) {
                menPaiNum += schooleType.wuliang;
            }
            if (this._viewUI.cangyu.selected) {
                menPaiNum += schooleType.cangyu;
            }
            if (this._viewUI.feixue.selected) {
                menPaiNum += schooleType.feixue;
            }
            if (this._viewUI.qixing.selected) {
                menPaiNum += schooleType.qixing;
            }
            return menPaiNum;
        }


        /** 点击键盘数字*/
        public getNumber(num) {
            if (num == -2) {  //点击了ok
                if (this.totalNum == "" || this.totalNum.charAt(0) == "0") {
                    this.totalNum = "1";
                }
            }
            if (num == -1) {  //点击了删除
                this.totalNum = this.totalNum.substring(0, this.totalNum.length - 1);
                if (this.totalNum.length <= 0) {
                    this.totalNum = "1";
                }
            }
            var level_btn = this._viewUI.level_btn;
            if (num >= 0) {
                var oneChar = this.totalNum.charAt(0);
                if (oneChar != '0') {
                    this.totalNum += num;
                } else {
                    this.totalNum = num;
                }
            }
            if (this.totalNum.length <= 2) {
                level_btn.label = "";
                level_btn.label = this.totalNum;
            } else {
                level_btn.label = 99 + "";
                this.totalNum = 99 + "";
            }

        }

        /**
         * 客户端请求邀请界面
         * @param type_level 等级删选  -1表示所有
         * @param type_school 职业删选  -1表示所有
         * @param type_sex 性别删选  1男  2女  -1表示所有
         */
        public CClanInvitationView(type_level, type_school, type_sex) {
            RequesterProtocols._instance.c2s_CClanInvitationView(type_level, type_school, type_sex);
        }

        public offTipsListener(){
            game.modules.tips.models.TipsProxy.getInstance().off(game.modules.tips.models.ON_KRYBOARD, this, this.getNumber);
        }

        public show() {
            super.show();
        }

        public hide(): void {
            this.offTipsListener();
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }
    }
}