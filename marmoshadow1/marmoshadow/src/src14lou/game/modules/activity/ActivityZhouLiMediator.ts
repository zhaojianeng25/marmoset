/**
* ActivityZhouLiMediator 
*/
module game.modules.activity {
    export class ActivityZhouLiMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.ActivityZhouLiUI;
        private _tipsModule: game.modules.tips.tipsModule;
        public day: number;
        constructor(app: AppBase) {
            super(app.uiRoot.general);
            this._viewUI = new ui.common.ActivityZhouLiUI();
            this._viewUI.mouseThrough = true;
            this._clientWidth = app.clientWidth;
            this._clientHeight = app.clientHeight;
            this._app = app;

            this._viewUI.close_btn.on(LEvent.CLICK, this, () => {
                ModuleManager.jumpPage(ModuleNames.ACTIVITY, 1, this._app);
                this.hide();
            });
            var date1 = new Date();
            this.day = date1.getDay();
            Laya.timer.loop(1000, this, () => {
                var date2 = new Date();
                if (date2.getDay() == this.day) return;
                this.day = date2.getDay();
                this.init();
            });

            this._viewUI.huoDongMon_List.renderHandler = new Handler(this, this.getTips1);
            this._viewUI.huoDongTue_List.renderHandler = new Handler(this, this.getTips2);
            this._viewUI.huoDongWed_List.renderHandler = new Handler(this, this.getTips3);
            this._viewUI.huoDongThu_List.renderHandler = new Handler(this, this.getTips4);
            this._viewUI.huoDongFri_List.renderHandler = new Handler(this, this.getTips5);
            this._viewUI.huoDongSat_List.renderHandler = new Handler(this, this.getTips6);
            this._viewUI.huoDongSun_List.renderHandler = new Handler(this, this.getTips7);
        }
        public init(): void {
            var _weekListBinDic = ActivityModel.getInstance().WeekListBinDic;
            var _activityNewBinDic = ActivityModel.getInstance().ActivityNewBinDic;

            for (var i: number = 1; i <= 7; i++) {
                var list = this.getList(i);
                var data: Array<any> = [];
                for (var j: number = 1; j <= 5; j++) {
                    var id = this.getId(j, _weekListBinDic[i]);
                    var bgVisi: boolean = true;
                    var name: string;
                    var btn = list.getCell(j - 1).getChildByName("getTips_btn" + i) as Laya.Button;
                    if (_activityNewBinDic[id] != undefined && _activityNewBinDic[id] != null) {
                        name = _activityNewBinDic[id].name;
                        btn.visible = true;
                    } else {
                        name = "";
                        btn.visible = false;
                    }
                    if (i == this.day) {
                        var time_lab = this._viewUI.time_list.getCell(j - 1).getChildByName("time_lab") as Laya.Label;
                        time_lab.text = this.getTime(j, _weekListBinDic[i]);
                        bgVisi = false;
                    }
                    data.push({
                        huoDongBg_img: { visible: bgVisi },
                        huoDongName_lab: { text: name }
                    });
                }
                list.array = data;
            }
        }
        public getList(index): Laya.List {
            var list: Laya.List;
            switch (index) {
                case 1:
                    list = this._viewUI.huoDongMon_List;
                    break;
                case 2:
                    list = this._viewUI.huoDongTue_List;
                    break;
                case 3:
                    list = this._viewUI.huoDongWed_List;
                    break;
                case 4:
                    list = this._viewUI.huoDongThu_List;
                    break;
                case 5:
                    list = this._viewUI.huoDongFri_List;
                    break;
                case 6:
                    list = this._viewUI.huoDongSat_List;
                    break;
                case 7:
                    list = this._viewUI.huoDongSun_List;
                    break;
            }
            return list;
        }
        public getId(index: number, _weekListBinDic: any): string {
            var time: string;
            switch (index) {
                case 1:
                    time = _weekListBinDic.time1;
                    break;
                case 2:
                    time = _weekListBinDic.time2;
                    break;
                case 3:
                    time = _weekListBinDic.time3;
                    break;
                case 4:
                    time = _weekListBinDic.time4;
                    break;
                case 5:
                    time = _weekListBinDic.time5;
                    break;
            }
            return time;
        }
        public getTime(index: number, _weekListBinDic: any): string {
            var text: string;
            switch (index) {
                case 1:
                    text = _weekListBinDic.text1;
                    break;
                case 2:
                    text = _weekListBinDic.text2;
                    break;
                case 3:
                    text = _weekListBinDic.text3;
                    break;
                case 4:
                    text = _weekListBinDic.text4;
                    break;
                case 5:
                    text = _weekListBinDic.text5;
                    break;
            }
            return text;
        }
        public getTips1(cell: Laya.Box, index: number): void {
            var btn = cell.getChildByName("getTips_btn1") as Laya.Button;
            btn.on(LEvent.MOUSE_DOWN, this, this.btnHandler, [cell, index, 1]);
        }
        public getTips2(cell: Laya.Box, index: number): void {
            var btn = cell.getChildByName("getTips_btn2") as Laya.Button;
            btn.on(LEvent.MOUSE_DOWN, this, this.btnHandler, [cell, index, 2]);
        }
        public getTips3(cell: Laya.Box, index: number): void {
            var btn = cell.getChildByName("getTips_btn3") as Laya.Button;
            btn.on(LEvent.MOUSE_DOWN, this, this.btnHandler, [cell, index, 3]);
        }
        public getTips4(cell: Laya.Box, index: number): void {
            var btn = cell.getChildByName("getTips_btn4") as Laya.Button;
            btn.on(LEvent.MOUSE_DOWN, this, this.btnHandler, [cell, index, 4]);
        }
        public getTips5(cell: Laya.Box, index: number): void {
            var btn = cell.getChildByName("getTips_btn5") as Laya.Button;
            btn.on(LEvent.MOUSE_DOWN, this, this.btnHandler, [cell, index, 5]);
        }
        public getTips6(cell: Laya.Box, index: number): void {
            var btn = cell.getChildByName("getTips_btn6") as Laya.Button;
            btn.on(LEvent.MOUSE_DOWN, this, this.btnHandler, [cell, index, 6]);
        }
        public getTips7(cell: Laya.Box, index: number): void {
            var btn = cell.getChildByName("getTips_btn7") as Laya.Button;
            btn.on(LEvent.MOUSE_DOWN, this, this.btnHandler, [cell, index, 7]);
        }
        public btnHandler(cell: Laya.Box, index: number, day: number): void {
            var _weekListBinDic = ActivityModel.getInstance().WeekListBinDic;
            var _activityNewBinDic = ActivityModel.getInstance().ActivityNewBinDic;
            var id = this.getId(index + 1, _weekListBinDic[day]);
            var parame: Dictionary = new Dictionary();
            parame.set("itemId", id);
            this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.ACTIVITY, parame);
        }
        public show(): void {
            super.show();
            this.init();
        }
        public hide(): void {
            super.hide();
            if(LoginModel.getInstance().CommonPage != "")
            {    
                ModuleManager.show(LoginModel.getInstance().CommonPage,this._app);
                LoginModel.getInstance().CommonPage = "";
            }
        }

        public getView(): Sprite {
            return this._viewUI;
        }
    }
}