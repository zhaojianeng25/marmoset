module game.modules.aliveordead {
    /** 生死战观战界面 */
    export class LiveDieWatchMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.LiveDieWatchUI;
        /** 观战列表数据 */
        private _watchLstData: Array<models.LDRoleInfoWatchDesVo>;
        /** 造型配置表 */
        private _shapeConfig: Object;

        constructor(app: AppBase) {
            super(app.uiRoot.general);
            this._viewUI = new ui.common.LiveDieWatchUI();
            this.isCenter = true;
            this._clientWidth = app.clientWidth;
            this._clientHeight = app.clientHeight;
            this._app = app;

            //获取造型配置表
            this._shapeConfig = LoginModel.getInstance().cnpcShapeInfo;
        }

        /** 供其它地方使用该界面 */
        public onShow(): void {
            this.registerEvent();
            this.requestWatchLstData();
            this.show();
        }

        /** 请求生死战观战列表数据 */
        private requestWatchLstData(): void {
            RequesterProtocols._instance.c2s_CLiveDieBattleWatchView();
        }

        public show() {
            this._watchLstData = [];
            super.show();
            this.init();
			mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
        }

        /** 界面的初始化 */
        private init(): void {
            let lst = this._viewUI.watch_lst;
            lst.vScrollBarSkin = "";
            lst.scrollBar.elasticBackTime = 100;
            lst.scrollBar.elasticDistance = 100;
            lst.array = this._watchLstData;
            lst.renderHandler = new Laya.Handler(this, this.watchLstRender);
            lst.selectHandler = new Laya.Handler(this, this.watchLstSelect);
            if (this._watchLstData.length == 0) {
                lst.visible = false;
                this._viewUI.noneDuel_box.visible = true;
            }
            else {
                lst.visible = true;
                this._viewUI.noneDuel_box.visible = false;
            }
        }

        /** 观战列表的点击处理 */
        private watchLstSelect(index: number): void {

        }

        /** 观战列表的渲染 */
        private watchLstRender(cell: Box, index: number): void {
            let _watchdata = this._watchLstData[index];
            let role1_box: Laya.Box = cell.getChildByName("role1_box") as Laya.Box;
            this.initRoleBox(role1_box, _watchdata.role1);
            let role2_box: Laya.Box = cell.getChildByName("role2_box") as Laya.Box;
            this.initRoleBox(role2_box, _watchdata.role2);

            let watch_btn: Laya.Button = cell.getChildByName("watch_btn") as Laya.Button;
            watch_btn.on(LEvent.CLICK, this, this.watchBattle, [_watchdata.battleId]);
        }

        /** 进行观战处理 */
        private watchBattle(battleId:number):void{
            RequesterProtocols._instance.c2s_CLiveDieBattleWatchFight(battleId);
        }

        /** 处理对手信息Box的显示 */
        private initRoleBox(rolebox: Laya.Box, roledata: models.LDRoleInfoDesVo): void {
            let role_img: Laya.Image = rolebox.getChildByName("role_img") as Laya.Image;
            let _littleheadID = this._shapeConfig[roledata.shape]["littleheadID"];
            role_img.skin = "common/icon/avatarrole/"+ _littleheadID +".png";

            let roleName_lab: Laya.Label = rolebox.getChildByName("roleName_lab") as Laya.Label;
            roleName_lab.text = roledata.rolename;

            let school_img: Laya.Image = rolebox.getChildByName("school_img") as Laya.Image;
            school_img.skin = "common/ui/tongyong/"+ roledata.school +".png";

            let selectType_lab: Laya.Label = rolebox.getChildByName("selectType_lab") as Laya.Label;
            let teamNum_lab: Laya.Label = rolebox.getChildByName("teamNum_lab") as Laya.Label;
            if(roledata.teamnum == 0 && roledata.teamnummax == 0){
                selectType_lab.text = "单人";
                teamNum_lab.visible = false;
            }
            else{
                selectType_lab.text = "组队";
                teamNum_lab.visible = true;
                teamNum_lab.text = roledata.teamnum + "/" + roledata.teamnummax;
            }
        }

        /** 事件注册 */
        private registerEvent(): void {
            //UI控件事件监听            
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
            this._viewUI.refresh_btn.on(LEvent.MOUSE_DOWN, this, this.requestWatchLstData);
            //消息事件监听
            models.AliveOrDeadProxy.getInstance().on(models.GetWatchData, this, this.dataInit);
        }

        /** 数据的初始化 */
        private dataInit(lst: Array<models.LDRoleInfoWatchDesVo>): void {
            this._watchLstData = [];
            if(lst){
                this._watchLstData = lst;
            }
            this.init();
        }

        public hide() {
            super.hide();
            this.removeEvent();
			mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
        }

        /** 移除事件 */
        private removeEvent(): void {
            this._viewUI.close_btn.off(LEvent.MOUSE_DOWN, this, this.hide);
            this._viewUI.refresh_btn.off(LEvent.MOUSE_DOWN, this, this.requestWatchLstData);
            models.AliveOrDeadProxy.getInstance().off(models.GetWatchData, this, this.dataInit);
        }

        public getView(): Sprite {
            return this._viewUI;
        }
    }
}