/**
* ActivityZhouLiMediator 
*/
module game.modules.activity {
    export class ActivityTuiSongMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.ActivityTuiSongUI;
        constructor(app: AppBase) {
            super(app.uiRoot.general);
            this._viewUI = new ui.common.ActivityTuiSongUI();
            this._viewUI.mouseThrough = true;
            this._clientWidth = app.clientWidth;
            this._clientHeight = app.clientHeight;
            this._app = app;

            this._viewUI.close_btn.on(LEvent.CLICK, this, () => {
                ModuleManager.jumpPage(ModuleNames.ACTIVITY, 1, this._app);
                this.hide();
            });
        }
        public init(): void {
            var _tuiSongSettingBinDic = ActivityModel.getInstance().TuiSongSettingBinDic;
            var dateSize = Object.getOwnPropertyNames(_tuiSongSettingBinDic).length;

            var data: Array<any> = [];
            var account = LocalStorage.getItem("daowang_userLoginAccount");
            for (var num in _tuiSongSettingBinDic) {
                var diban1Visi: boolean;
                var diban2Visi: boolean;
                var tuiSongX: number = 83;
                var tuiSongVal: number = 1;
                if (parseInt(num) % 2 === 0) {
                    diban1Visi = true;
                    diban2Visi = false;
                } else {
                    diban1Visi = false;
                    diban2Visi = true;
                }
                if (LocalStorage.getItem(account + num) != null && LocalStorage.getItem(account + num).split("_")[0] == "0") {
                    tuiSongX = 38;
                    tuiSongVal = 0;
                }
                data.push({
                    diban1_img: { visible: diban1Visi },
                    diban2_img: { visible: diban2Visi },
                    tuiSong_img: { x: tuiSongX },
                    tuiSong_bar: { value: tuiSongVal },
                    huoDongName_lab: { text: _tuiSongSettingBinDic[num].name },
                    huoDongWeek_lab: { text: _tuiSongSettingBinDic[num].day.split("每周").join("") },
                    huoDongTime_lab: { text: _tuiSongSettingBinDic[num].time },
                    huoDongPeople_lab: { text: _tuiSongSettingBinDic[num].pcount },
                });
            }
            this._viewUI.showList_list.array = data;
            this._viewUI.showList_list.vScrollBarSkin = "";
            this._viewUI.showList_list.repeatX = 1;
            this._viewUI.showList_list.scrollBar.elasticBackTime = 500;
            this._viewUI.showList_list.scrollBar.elasticDistance = 20;
            this._viewUI.showList_list.renderHandler = new Handler(this, this.dataLoad);
        }
        //数据操作
        public dataLoad(cell: Box, index: number): void {
            var btn: Laya.Button = cell.getChildByName("pro_btn") as Laya.Button;
            btn.on(LEvent.MOUSE_DOWN, this, this.onBtn, [cell, index]);
        }
        //消息推送-0为关闭
        public onBtn(cell: Box, index: number): void {
            var num = index + 2;
            var img: Laya.Image = cell.getChildByName("tuiSong_img") as Laya.Image;
            var pro: Laya.ProgressBar = cell.getChildByName("tuiSong_bar") as Laya.ProgressBar;
            var lab: Laya.Label = cell.getChildByName("huoDongName_lab") as Laya.Label;
            var account = LocalStorage.getItem("daowang_userLoginAccount");
            var view2 = ActivityModel.getInstance().ActivityNewBinDicAtType.get(2);
            if (LocalStorage.getItem(account + num) != null && LocalStorage.getItem(account + num).split("_")[0] != "0") {
                var isTuiSong = LocalStorage.getItem(account + num).split("_")[1];
                var id = LocalStorage.getItem(account + num).split("_")[2];
                img.x = 38;
                pro.value = 0;
                LocalStorage.setItem(account + num, "0_" + isTuiSong + "_" + id);
            } else {
                img.x = 83;
                pro.value = 1;
                if (LocalStorage.getItem(account + num) != null) {
                    var isTuiSong = LocalStorage.getItem(account + num).split("_")[1];
                    var id = LocalStorage.getItem(account + num).split("_")[2];
                    LocalStorage.setItem(account + num, "1_" + isTuiSong + "_" + id);
                } else {
                    var newId: number;
                    for (var i: number = 0; i < view2.length; i++) {
                        if (view2[i].name == lab.text) {
                            newId = view2[i].id;
                            LocalStorage.setItem(account + num, "1_0_" + newId);
                        }
                    }
                }
                models.ActivityProxy.getInstance().event(models.TUISONG_EVENT);
            }
        }

        public show(): void {
            super.show();
            this.init();
        }
        public hide(): void {
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }
    }
}