/**
* 帮派活动界面
*/
module game.modules.family {
    export class FamilyActivityViewMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.FamilyHuoDongUI;
        FamilyBattleViewMediator: FamilyBattleViewMediator;
        FamilyFuBenManagerViewMediator: FamilyFuBenManagerViewMediator;
        /**g公会活动表 */
        clanCFactionHuoDongData = models.FamilyModel.getInstance().clanCFactionHuoDongData;
        constructor(uiLayer: Sprite, app: AppBase) {
            super(uiLayer);
            this._viewUI = new ui.common.FamilyHuoDongUI();
            this._app = app;
            this.isCenter = false;
        }

        /**显示活动列表 */
        public showActivityView() {
            var activityArr = [];
            for (var i in this.clanCFactionHuoDongData) {
                var name = this.clanCFactionHuoDongData[i].name;
                var icon = this.clanCFactionHuoDongData[i].icon;
                var leveldesc = this.clanCFactionHuoDongData[i].leveldesc;
                var opentimedesc = this.clanCFactionHuoDongData[i].opentimedesc;
                var huodongdesc = this.clanCFactionHuoDongData[i].huodongdesc;
                var id = this.clanCFactionHuoDongData[i].id;
                var m_icon = "common/ui/family/" + icon + ".png";
                activityArr.push({ id: id, huoDongName_lab: name, huoDongIcon_img: m_icon, lv_lab: leveldesc, activityTime_label: opentimedesc, activityDesc_label: huodongdesc });
            }
            SaleModel._instance.showList(this._viewUI.clanActivity_list, activityArr);
            this._viewUI.clanActivity_list.renderHandler = new Handler(this, this.clanActivityListRender, [activityArr]);
        }

        /**公会活动显示 */
        public clanActivityListRender(activityArr, cell: Box, index: number) {
            var id = activityArr[index].id;
            var openBtn = cell.getChildByName("open_btn") as Button;
            var guanLiBtn = cell.getChildByName("guanLi_btn") as Button;
            guanLiBtn.visible = false;
            if (id == 2) { //活动显示管理弹窗
                guanLiBtn.visible = true;
                guanLiBtn.on(LEvent.MOUSE_DOWN, this, this.onGuanli);
            }
            if (id == 3) { //活动显示传送或者打开
                openBtn.label = models.FamilyModel.activityOpenOrTransfer.open;
            } else {
                openBtn.label = models.FamilyModel.activityOpenOrTransfer.transfer;
            }
            openBtn.on(LEvent.MOUSE_DOWN, this, this.onOpenBtn, [cell, index, activityArr]);
        }

        /**管理 */
        public onGuanli() {
            this.FamilyFuBenManagerViewMediator = new FamilyFuBenManagerViewMediator(this._viewUI, this._app);
            this.FamilyFuBenManagerViewMediator.show();
        }

        /**打开 / 传送 */
        public onOpenBtn(cell, index, activityArr) {
            var openBtn = cell.getChildByName("guanLi_btn") as Button;
            if (activityArr[index].id == 3) { //打开公会战界面
                this.FamilyBattleViewMediator = new FamilyBattleViewMediator(this._app);
                ModuleManager.hide(ModuleNames.haveFamily);
                this.FamilyBattleViewMediator.show();
            } else {  //传送指定位置
                let inTeamGroup =  HudModel.getInstance().chargeInGroup();
                 if(inTeamGroup) //未处于组队
                 {
                     this.showDisappTips(PromptExplain.IN_TEAM_GROUP);
                     return;
                 }
                this._app.sceneRoot.istask = 2
                mainhud.models.HudModel.getInstance().useapp = this._app
                if (activityArr[index].id == 1) {   //任务 找赵副管
                    mainhud.models.HudModel.getInstance().jumpmap(1711, 19032)
                } else if (activityArr[index].id == 2) {  //副本  找张副管
                    mainhud.models.HudModel.getInstance().jumpmap(1711, 19034)
                }
                ModuleManager.hide(ModuleNames.haveFamily);
            }
        }
        /** 弹窗飘字提示
         * @param id 提示语句id
         */
        private showDisappTips(id:number):void
        {
            let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[id];
            let tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
            tips.onShow(chattext.msg);
        }

        /**跳转地图 */
        public getpost(mapid: number) {//跳地图随机坐标
            let MapData: WorldMapConfigBaseVo = MapModel.getInstance().WorldMapConfigData[mapid]
            let mainUnit: Unit = this._app.sceneObjectMgr.mainUnit;
            let x, y: number;
            x = (Math.random() * (MapData.bottomx - MapData.topx) + MapData.topx)
            y = (Math.random() * (MapData.bottomy - MapData.topy) + MapData.topy)
            mainUnit.SetPosX(x);
            mainUnit.SetPosY(y);
            mainUnit.SetPos(x, y);
        }

        public show() {
            this.showActivityView();
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