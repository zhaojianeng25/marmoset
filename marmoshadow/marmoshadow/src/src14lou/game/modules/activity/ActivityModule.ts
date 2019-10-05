/**
* 活动主界面 
*/
import ActivityModel = game.modules.activity.models.ActivityModel;
import ActivityProxy = game.modules.activity.models.ActivityProxy;
enum viewType {
    VIEW1 = 1,	//日常活动
    VIEW2 = 2,	//限时活动
    VIEW3 = 3,  //即将开启
}
module game.modules.activity {
    export class ActivityModule extends game.modules.ModuleMediator {
        private _viewUI: ui.common.ActivityUI;
        private _activityZhouLiMediator: ActivityZhouLiMediator;
        private _activityTuiSongMediator: ActivityTuiSongMediator;
        /** 天机仙令界面模块 */
        private _tianJiXianLingModule: game.modules.tianjixianling.TianJiXianLingModule;
        /** 智慧试炼模块 */
        private _zhiHuiShiLianMediator: game.modules.keju.KejuModule;
        /** 物品弹窗 */
        private _tipsModule: game.modules.tips.tipsModule;
        /** 提示界面 */
        private _remindViewMediator: game.modules.commonUI.RemindViewMediator;
        /** 日常活动 */
        public arrView1: Array<game.data.template.ActivityNewBaseVo>;
        /** 限时活动 */
        public arrView2: Array<game.data.template.ActivityNewBaseVo>;
        /** 即将开启 */
        public arrView3: Array<game.data.template.ActivityNewBaseVo>;
        /** 星期天数 */
        public date = new Date();
        public day: number = this.date.getDay();
        /** 活跃度值 */
        public activeVal: number;
        /** 活跃度奖励领取信息 */
        public chests: Laya.Dictionary;
        /** 是否已经初始化 */
        public isInit: boolean = true;
        /** 活跃度奖励领取特效 */
        public ani1: Laya.Animation = new Laya.Animation();
        public ani2: Laya.Animation = new Laya.Animation();
        public ani3: Laya.Animation = new Laya.Animation();
        public ani4: Laya.Animation = new Laya.Animation();
        public ani5: Laya.Animation = new Laya.Animation();
        public allChests: Laya.Dictionary = new Laya.Dictionary;
        constructor(app: AppBase) {
            super();
            this.uiLayer = app.uiRoot.general;
            this._viewUI = new ui.common.ActivityUI();
            this._clientWidth = app.clientWidth;
            this._clientHeight = app.clientHeight;
            this._app = app;
            this._activityZhouLiMediator = new ActivityZhouLiMediator(this._app);
            this._activityTuiSongMediator = new ActivityTuiSongMediator(this._app);
            this._tianJiXianLingModule = new game.modules.tianjixianling.TianJiXianLingModule(this._app);
            this._remindViewMediator = new game.modules.commonUI.RemindViewMediator(this._viewUI, app);
            this._viewUI.activityChoose_btn.selectHandler = new Handler(this, this.showList);
            this._viewUI.noactivity_img.visible = false;
            this._viewUI.tiShi_btn.on(LEvent.MOUSE_DOWN, this, this.onLoad);
            this._viewUI.zhouLi_btn.on(LEvent.MOUSE_DOWN, this, () => {
                this._activityZhouLiMediator.show();
                this.hide();
            });
            this._viewUI.tuiSong_btn.on(LEvent.MOUSE_DOWN, this, () => {
                this._activityTuiSongMediator.show();
                this.hide();
            });
            this._viewUI.lingQu_btn.on(LEvent.MOUSE_DOWN, this, this.lingQu);
            this._viewUI.dongJie_btn.on(LEvent.MOUSE_DOWN, this, this.dongJie);
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, () => {
                mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
                this.hide();
            });

            this.activeGift();

            if (this.day == 0) {
                this.day = 7;
            }
            this._viewUI.renWu_list.renderHandler = new Handler(this, this.dataLoad);

            game.modules.activity.models.ActivityProxy.getInstance().on(models.REFRESHACTIVITYLIST_EVENT, this, this.activeValOn);
            //推送确定按钮监听
            game.modules.activity.models.ActivityProxy.getInstance().on(models.TUISONG_TIAOZHUAN_EVENT, this, this.onTuiSong);
            //监听科举类确认框
            game.modules.keju.models.KejuProxy.getInstance().on(keju.models.CONFIRM_IMP_EXAM, this, this.onConfirmImpExam);
            //答题
            game.modules.keju.models.KejuProxy.getInstance().on(keju.models.START_IMP_EXAM, this, this.onStartImpExam);
            //天机仙令第一次参加成功
            game.modules.tianjixianling.models.TianJiXianLingProxy.getInstance().on(tianjixianling.models.JOIN_TJXL_SUCCESS, this, this.showTJXL);
        }
        /** 显示天机仙令界面 */
        private showTJXL(): void {
            ModuleManager.show(ModuleNames.TIAN_JI_XIAN_LING, this._app);
            this.hide();
        }
        /** 确认提示框 */
        private onConfirmImpExam(type: number): void {
            /**程序内字符串表 */
            let cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
            let prompt;
            let id;
            if (type == ImpExamType.IMPEXAM_VILL) {
                id = Intra_ProgramString.XIANG_START;
            } else if (type == ImpExamType.IMPEXAM_PROV) {
                id = Intra_ProgramString.HUI_START;
            } else if (type == ImpExamType.IMPEXAM_STATE) {
                id = Intra_ProgramString.DIAN_START;
            }
            prompt = cstringResConfigData[id].msg;
            let rightBtnName = mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.AGREE);
            let leftBtnName = mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.REJECT);
            this._remindViewMediator.onShow(prompt, rightBtnName, leftBtnName);
            this._remindViewMediator.addSecond(20);
            this._remindViewMediator.once(game.modules.commonUI.LEFT_BUTTON_EVENT, this, this.onResponseImpExam, [type, false]);
            this._remindViewMediator.once(game.modules.commonUI.RIGHT_BUTTON_EVENT, this, this.onResponseImpExam, [type, true]);
        }
        /** 
		 * @param type 答题类型 @param isAnswer 是否作答
		 * 响应事件
		 */
        private onResponseImpExam(type: number, isAnswer: boolean): void {
            if (isAnswer == true) {/** 拒绝不响应 */
                RequesterProtocols._instance.c2s_apply_impexam(type, 0);
            }
        }
        /** 科举答题 */
        private onStartImpExam(): void {
            let KejuModule = game.modules.keju.KejuModule.getInstance(this._app);
            KejuModule.show();
        }
        /** 活动信息数据初始化 */
        public init(): void {
            var _activities = models.ActivityModel.getInstance().activities.values;
            if (_activities.length > 0) {
                for (var num in _activities) {
                    models.ActivityModel.getInstance().activityInfos.set(_activities[num].num, _activities[num].num2);
                }
            }
            this.isInit = false;
            this.arrView1 = [];
            this.arrView2 = [];
            this.arrView3 = [];
            for (var i: number = 0; i < ActivityModel.getInstance().ActivityNewBinDicAtType.get(viewType.VIEW1).length; i++) {
                this.arrView1.push(ActivityModel.getInstance().ActivityNewBinDicAtType.get(viewType.VIEW1)[i]);
            }
            for (var i: number = 0; i < ActivityModel.getInstance().ActivityNewBinDicAtType.get(viewType.VIEW2).length; i++) {
                this.arrView2.push(ActivityModel.getInstance().ActivityNewBinDicAtType.get(viewType.VIEW2)[i]);
            }
            this.arrView1 = this.listSort(this.setData(this.arrView1));
            this.arrView2 = this.listSort(this.setData(this.arrView2));
            //判断是否是节日活动，当前时间是否在节日活动周期
            for (var i: number = this.arrView2.length - 1; i >= 0; i--) {
                var actId: Array<any> = ActivityModel.getInstance().CheculedActivityBinDicAtActId.get(this.arrView2[i].id);
                if (actId[0].weekrepeat == 0) {
                    var startTime = new Date(actId[0].startTime2);
                    var endTime = new Date(actId[actId.length - 1].endTime);
                    if (this.date.getTime() <= startTime.getTime() || endTime.getTime() <= this.date.getTime()) {
                        this.arrView2.splice(i, 1);
                    }
                }
            }

            //显示日常活动
            this._viewUI.activityChoose_btn.selectedIndex = 0;
            this.showList(0);
            this.activeProgress();

            //显示双倍点数
            if (ActivityModel.getInstance().RoleHookExpData != undefined) {
                if (ActivityModel.getInstance().RoleHookExpData.getdpoint == 0) {
                    this._viewUI.dongJie_btn.visible = false;
                }
                this._viewUI.getdpoint_lab.text = ActivityModel.getInstance().RoleHookExpData.getdpoint + "";
                this._viewUI.cangetdpoint_lab.text = ActivityModel.getInstance().RoleHookExpData.cangetdpoint + "";
            } else {
                console.debug("活动双倍点数获取失败");
                this._viewUI.getdpoint_lab.text = "0";
                this._viewUI.cangetdpoint_lab.text = "0";
            }
        }
        /** 活动数据加载 */
        public setData(arr: Array<any>): Array<any> {
            var _level: number;   //等级
            if (HudModel.getInstance().levelNum != 0) {
                _level = HudModel.getInstance().levelNum;
            } else {
                _level = LoginModel.getInstance().roleDetail.level;
            }
            var _shape = LoginModel.getInstance().roleDetail.shape;
            var _activenesst = LoginModel.getInstance().roleDetail.activenesst;
            var _num: number = 0;           //模拟次数
            var _serverid: string = "0";    //模拟服务器id
            var newArr: Array<any> = [];
            for (var i: number = arr.length - 1; i >= 0; i--) {
                if (arr[i].level > _level && arr[i].serverid == _serverid) {
                    this.arrView3.push(arr[i]);
                    arr.splice(i, 1);
                    continue;
                }
                //是否超过等级上线
                if (arr[i].maxlevel < _level) { arr.splice(i, 1); continue; }
                //是否超过最大次数
                if (arr[i].maxnum <= _num && arr[i].maxnum != -1) { arr.splice(i, 1); continue; }
                var times: Array<number> = arr[i].times.split(",");
                for (var j: number = 0; j < times.length; j++) {
                    //判断当天是否在周期内
                    if (times[j] == this.day) {
                        newArr.push(arr[i]);
                    }
                }
            }
            return newArr;
        }
        /** 页面编号 */
        public viewNum: number = 0;
        /** 根据页面编号显示相关页签数据 */
        private showList(index: number) {
            if (ActivityModel.getInstance().firstInterface != -1) {
                index = ActivityModel.getInstance().firstInterface;
                ActivityModel.getInstance().firstInterface = -1;
            }
            switch (index) {
                case 0:
                    this.view1();
                    this.viewNum = 0;
                    break;
                case 1:
                    this.view2();
                    this.viewNum = 1;
                    break;
                case 2:
                    this.view3();
                    this.viewNum = 2;
                    break;
            }
        }
        /** 日常活动数据过滤 */
        public view1(): void {
            var _activityInfos = models.ActivityModel.getInstance().activityInfos;
            var data: Array<any> = [];
            for (var i: number = 0; i < this.arrView1.length; i++) {
                var _num: number = _activityInfos.get(this.arrView1[i].id);           //参与的次数
                var _activenesst: number = this.arrView1[i].actvalue * _num;          //获得的活跃
                var _maxNum: string = "无限制";
                var _maxAct: string = "无";
                var _isTuiJian: boolean = false;
                if (this.arrView1[i].maxnum > 0) {
                    _maxNum = _num + "/" + this.arrView1[i].maxnum;
                    if (_num > this.arrView1[i].maxnum) {
                        _maxNum = this.arrView1[i].maxnum + "/" + this.arrView1[i].maxnum;
                    }
                }
                if (this.arrView1[i].maxact > 0) {
                    _maxAct = _activenesst + "/" + this.arrView1[i].maxact;
                    if (_activenesst > this.arrView1[i].maxact) {
                        _maxAct = this.arrView1[i].maxact + "/" + this.arrView1[i].maxact;
                    }
                }
                if (this.arrView1[i].starttuijian == this.day) {
                    _isTuiJian = true;
                }
                data.push({
                    icon_img: { skin: this.getSrc(this.arrView1[i].imgid) },
                    huoDongName_lab: { text: this.arrView1[i].name },
                    huoDongTuiJian_img: { visible: _isTuiJian },
                    huoDongnNumber_lab: { text: _maxNum },
                    huoDongHuoYue_lab: { text: _maxAct },
                    shizhong_img: { visible: false },
                    kaiQITime_lab: { visible: false },
                    timeDiban_img: { visible: false },
                    huoDongJoin_btn: { visible: true }
                });
            }
            this.setList(data);
        }
        /** 限时活动数据过滤 */
        public view2(): void {
            var _activityInfos = models.ActivityModel.getInstance().activityInfos;

            var data: Array<any> = [];
            for (var i: number = 0; i < this.arrView2.length; i++) {
                var _num: number = _activityInfos.get(this.arrView2[i].id);           //参与的次数
                var _activenesst: number = this.arrView2[i].actvalue * _num;          //获得的活跃
                var _maxNum: string = "无限制";
                var _maxAct: string = "无";
                var _isTuiJian: boolean = false;
                var _kaiQITimeText: string;
                var _kaiQITimeVisi: boolean = true;
                var _huoDongJoinVisi: boolean = false;
                var _shiZhongVisi: boolean = false;
                if (this.arrView2[i].maxnum > 0) {
                    _maxNum = _num + "/" + this.arrView2[i].maxnum;
                    if (_num > this.arrView2[i].maxnum) {
                        _maxNum = this.arrView2[i].maxnum + "/" + this.arrView2[i].maxnum;
                    }
                }
                if (this.arrView2[i].maxact > 0) {
                    _maxAct = _activenesst + "/" + this.arrView2[i].maxact;
                    if (_activenesst > this.arrView2[i].maxact) {
                        _maxAct = this.arrView2[i].maxact + "/" + this.arrView2[i].maxact;
                    }
                }
                if (this.arrView2[i].starttuijian == this.day) {
                    _isTuiJian = true;
                }
                if (this.arrView2[i].link == 0 || this.arrView2[i].link == 12) {
                    _kaiQITimeText = this.arrView2[i].protext;
                } else {
                    var timeArr = this.compareTime(this.arrView2[i].id);
                    if (timeArr[0]) {
                        _kaiQITimeVisi = false;
                        _huoDongJoinVisi = true;
                    } else {
                        _kaiQITimeText = timeArr[1];
                        _shiZhongVisi = true;
                    }
                }
                data.push({
                    icon_img: { skin: this.getSrc(this.arrView2[i].imgid) },
                    huoDongName_lab: { text: this.arrView2[i].name },
                    huoDongTuiJian_img: { visible: _isTuiJian },
                    huoDongnNumber_lab: { text: _maxNum },
                    huoDongHuoYue_lab: { text: _maxAct },
                    shizhong_img: { visible: _shiZhongVisi },
                    kaiQITime_lab: { visible: _kaiQITimeVisi, text: _kaiQITimeText },
                    timeDiban_img: { visible: _kaiQITimeVisi },
                    huoDongJoin_btn: { visible: _huoDongJoinVisi }
                });
            }
            this.setList(data);
        }
        /** 即将开始活动数据 */
        public view3(): void {
            var data: Array<any> = [];
            for (var i: number = 0; i < this.arrView3.length; i++) {
                var _maxNum: string = "无限制";
                var _maxact: string = "无";
                if (this.arrView3[i].maxnum > 0) {
                    _maxNum = "0/" + this.arrView3[i].maxnum;
                }
                if (this.arrView3[i].maxact > 0) {
                    _maxact = "0/" + this.arrView3[i].maxact;
                }
                data.push({
                    icon_img: { skin: this.getSrc(this.arrView3[i].imgid) },
                    huoDongName_lab: { text: this.arrView3[i].name },
                    huoDongTuiJian_img: { visible: false },
                    huoDongnNumber_lab: { text: _maxNum },
                    huoDongHuoYue_lab: { text: _maxact },
                    shizhong_img: { visible: false },
                    kaiQITime_lab: { visible: true, text: this.arrView3[i].level + "级开启" },
                    timeDiban_img: { visible: true },
                    huoDongJoin_btn: { visible: false }
                });
            }
            this.setList(data);
        }
        /** 判断活动是否在开启时间段 */
        public compareTime(id: number): [boolean, string] {
            var actId: Array<any> = ActivityModel.getInstance().CheculedActivityBinDicAtActId.get(id);
            var date = new Date();
            var hours: number = date.getHours();
            var minutes: number = date.getMinutes();
            var time = date.toLocaleDateString();

            var timeArr: Array<any> = [];
            var startTime: number;
            var endTime: number;
            for (var i: number = 0; i < actId.length; i++) {
                if (actId[i].weekrepeat == this.day) {
                    timeArr = actId[i].startTime2.split(":");
                    startTime = new Date(time + " " + actId[i].startTime2).getTime();
                    endTime = new Date(time + " " + actId[i].endTime).getTime();
                }
            }
            if (startTime <= date.getTime() && date.getTime() <= endTime) {
                return [true, ""];
            } else {
                return [false, timeArr[0] + ":" + timeArr[1] + " 开启"];
            }
        }
        /** 设置数据格式 */
        public setList(data: Array<any>): void {
            this._viewUI.renWu_list.array = data;
            this._viewUI.renWu_list.vScrollBarSkin = "";
            this._viewUI.renWu_list.repeatX = 2;
            this._viewUI.renWu_list.scrollBar.elasticBackTime = 100;
            this._viewUI.renWu_list.scrollBar.elasticDistance = 0;
        }
        /** 活动参加，物品弹窗按钮监听加载 */
        public dataLoad(cell: Box, index: number): void {
            var arr: Array<any> = [];
            switch (this.viewNum) {
                case 0:
                    arr = this.arrView1;
                    break;
                case 1:
                    arr = this.arrView2;
                    break;
                case 2:
                    arr = this.arrView3;
                    break;
            }
            var btn: Laya.Button = cell.getChildByName("huoDongJoin_btn") as Laya.Button;
            btn.on(LEvent.MOUSE_DOWN, this, this.onBtn, [index, arr]);

            var getTips: Laya.Button = cell.getChildByName("getTips_btn") as Laya.Button;
            getTips.on(LEvent.MOUSE_DOWN, this, this.getTips, [index, arr]);
        }
        /** 推送弹窗后确定参加按钮监听 */
        public onTuiSong(id): void {
            var actVo = models.ActivityModel.getInstance().ActivityNewBinDic[id];
            var arr: Array<ActivityNewBaseVo> = [];
            arr.push(actVo);
            this.onBtn(0, arr);
        }
        /** 参加按钮监听 */
        public onBtn(index: number, arr: Array<any>): void {
            var npcList = game.scene.models.SceneModel.getInstance().npclist;
            if (arr[index].link > 0 && arr[index].link != undefined) {
                var _link = arr[index].link;
                var _linkid = arr[index].linkid1;
                let inTeamGroup = HudModel.getInstance().chargeInGroup();
                if (_link == 1 || _link == 7) {//
                    if (!inTeamGroup) //未处于组队
                    {
                        var _NPCConfigBinDic = HudModel._instance.cNPCConfigData;
                        var _linkid = arr[index].linkid1;
                        this._app.sceneRoot.istask = 2;
                        game.modules.mainhud.models.HudModel.getInstance().useapp = this._app;
                        game.modules.mainhud.models.HudModel.getInstance().jumpmap(_NPCConfigBinDic[_linkid].mapid, _linkid);
                    } else if (inTeamGroup) this.showDisappTips(PromptExplain.IN_TEAM_GROUP);

                } else if (_link == 2) {
                    if (arr[index].id == 121) {
                        //显示出天机仙令
                        ModuleManager.show(ModuleNames.TIAN_JI_XIAN_LING, this._app);
                        this.hide();
                    }
                } else if (_link == 5) {    //上古邪灵
                    if (!inTeamGroup) //未处于组队
                    {
                        var _ActivityMapListBinDic = ActivityModel.getInstance().ActivityMapListBinDic;
                        var _WorldMapConfigBinDic = MapModel.getInstance().WorldMapConfigData;
                        //var mapId = _ActivityMapListBinDic[arr[index].id].mapid;  //之前的做法取地图id
                        var rolelevel = HudModel.getInstance().levelNum;  //玩家当前等级
                        var mapId = this.deciderolelevel(rolelevel);   //地图Id
                        var x = Math.floor((_WorldMapConfigBinDic[mapId].topx + _WorldMapConfigBinDic[mapId].bottomx) / 2);
                        var y = Math.floor((_WorldMapConfigBinDic[mapId].topy + _WorldMapConfigBinDic[mapId].bottomy) / 2);
                        RequesterProtocols._instance.c2s_req_goto(mapId, x, y);
                    } else if (inTeamGroup) this.showDisappTips(PromptExplain.IN_TEAM_GROUP);

                } else if (_link == 6) {    //师门任务
                    mainhud.models.HudModel._instance.taskid = 1010000;
                    let info: game.modules.task.models.SRefreshSpecialQuestVo = Taskmodels.getInstance().schooltask.get(1010000);
                    this._app.sceneRoot.istask = 2;
                    mainhud.models.HudModel._instance.useapp = this._app;
                    if (info != undefined) {
                        let schoolinfo: CRepeatTaskBaseVo = Taskmodels.getInstance().cRepeatTaskData[info.questtype];

                        mainhud.models.HudModel._instance.jumpmapid = info.dstmapid;
                        mainhud.models.HudModel._instance.desnpc.x = info.dstx;
                        mainhud.models.HudModel._instance.desnpc.y = info.dsty;
                        mainhud.models.HudModel._instance.npcid = info.dstnpcid;
                        mainhud.models.HudModel._instance.eventid = schoolinfo.id;
                        mainhud.models.HudModel._instance.tasktype = schoolinfo.etasktype;

                        mainhud.models.HudModel._instance.taskstart();
                    } else {
                        var _school = LoginModel.getInstance().roleDetail.school;  //职业
                        var npcId = game.modules.achievent.models.AchieventModel.getInstance().MasterNpcDic[_school].masterid;
                        game.modules.mainhud.models.HudModel.getInstance().jumpmap(HudModel._instance.cNPCConfigData[npcId].mapid, npcId);
                    }
                } else if (_link == 8) {//帮派
                    var clankey = game.modules.mainhud.models.HudModel.getInstance().clankey;
                    if (clankey > 0) {
                        if (!inTeamGroup) //未处于组队
                        {   // 找npc
                            var _NPCConfigBinDic = HudModel._instance.cNPCConfigData;
                            var _linkid = arr[index].linkid1;
                            this._app.sceneRoot.istask = 2;
                            game.modules.mainhud.models.HudModel.getInstance().useapp = this._app;
                            game.modules.mainhud.models.HudModel.getInstance().jumpmap(_NPCConfigBinDic[_linkid].mapid, _linkid);
                        } else if (inTeamGroup) this.showDisappTips(PromptExplain.IN_TEAM_GROUP);
                    } else {
                        //加入帮派窗口
                        ModuleManager.show(ModuleNames.Family, this._app);
                    }
                } else if (_link == 11 || _link == 10) {//科举
                    /** 当前考试类型 */
                    let impexamtype = KejuModel.getInstance().impexamtype;
                    RequesterProtocols._instance.c2s_apply_impexam(impexamtype, 0);
                    this.hide();
                }
                ModuleManager.hide(ModuleNames.ACTIVITY);
            }
        }

        /**
         * 判断角色等级 跳转到那个地图
         * @param rolelevel 玩家当前等级  
         * @param return  返回地图id
         */
        private deciderolelevel(rolelevel: number): number {
            if (rolelevel >= 25 && rolelevel < 40) {//望锋亭
                return 1710;
            } else if (rolelevel >= 40 && rolelevel < 50) {//相思谷
                return 1709;
            } else if (rolelevel >= 50 && rolelevel < 60) {//柳林桃海
                return 1702;
            } else if (rolelevel >= 60 && rolelevel < 70) {//城宁道
                return 1701;
            } else if (rolelevel >= 70 && rolelevel < 80) {//天州驿站
                return 1703;
            } else if (rolelevel >= 80 && rolelevel < 90) {//黄岩岭
                return 1706;
            } else if (rolelevel >= 90) return 1705;//白沙小筑
        }

        /** 弹窗飘字提示
         * @param id 提示语句id
         */
        private showDisappTips(id: number): void {
            let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[id];
            let tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
            tips.onShow(chattext.msg);
        }
        /** 物品信息弹窗 */
        public getTips(index: number, arr: Array<any>): void {
            var id = arr[index].id;
            var parame: Dictionary = new Dictionary();
            parame.set("itemId", id);
            this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.ACTIVITY, parame);
        }
        /** 活动排序-按推荐度排名 */
        public listSort(arr: Array<any>): Array<any> {
            var _j: number = 0;
            for (var i: number = 0; i < arr.length; i++) {
                if (i != 0 && arr[i].starttuijian == this.day) {
                    var vo = arr[0];
                    arr[0] = arr[i];
                    arr[i] = vo;
                    _j = 1;
                }
            }
            for (var i: number = 0; i < arr.length - 1; i++) {
                for (var j: number = _j; j < arr.length - 1 - i; j++) {
                    if (arr[j].sort > arr[j + 1].sort) {
                        var vo = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = vo;
                    }
                }
            }
            return arr;
        }
        /** 活跃度奖励数据 */
        public activeGift(): void {
            var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
            var _activeGiftBox = ActivityModel.getInstance().ActiveGiftBoxBinDic;
            var skinArr: Array<any> = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
                "common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
                "common/ui/tongyong/jinkuang.png"];

            for (var i = 1; i <= 5; i++) {
                var diban_img = this._viewUI.rewardItem_img.getChildByName("rewardItem" + i + "_img") as Laya.Image;
                var icon_img = this._viewUI.rewardItem_img.getChildByName("icon" + i + "_img") as Laya.Image;
                if (this.activeVal >= 20 && this.chests.get(1) == 0) {
                    this.activeValOn();
                }
                diban_img.skin = skinArr[_itemAttrBinDic[_activeGiftBox[i].itemid].nquality - 1];
                icon_img.skin = this.getSrc(_itemAttrBinDic[_activeGiftBox[i].itemid].icon);
            }
            //活跃度按钮1
            this._viewUI.getReward_btn1.on(LEvent.MOUSE_DOWN, this, () => {
                if (this.activeVal >= 20 && this.allChests.get(1) == 0) {
                    RequesterProtocols._instance.c2s_draw_gift_box(1);
                    var img = this._viewUI.rewardItem_img.getChildByName("rewardItem1_img") as Laya.Image;
                    img.removeChild(this.ani1);
                } else {
                    var itemId = _activeGiftBox[1].itemid;
                    var parame: Dictionary = new Dictionary();
                    parame.set("itemId", itemId);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
                }
            });
            //活跃度按钮2
            this._viewUI.getReward_btn2.on(LEvent.MOUSE_DOWN, this, () => {
                if (this.activeVal >= 40 && this.allChests.get(2) == 0) {
                    RequesterProtocols._instance.c2s_draw_gift_box(2);
                    var img = this._viewUI.rewardItem_img.getChildByName("rewardItem2_img") as Laya.Image;
                    img.removeChild(this.ani2);
                } else {
                    var itemId = _activeGiftBox[2].itemid;
                    var parame: Dictionary = new Dictionary();
                    parame.set("itemId", itemId);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
                }
            });
            //活跃度按钮3
            this._viewUI.getReward_btn3.on(LEvent.MOUSE_DOWN, this, () => {
                if (this.activeVal >= 60 && this.allChests.get(3) == 0) {
                    RequesterProtocols._instance.c2s_draw_gift_box(3);
                    var img = this._viewUI.rewardItem_img.getChildByName("rewardItem3_img") as Laya.Image;
                    img.removeChild(this.ani3);
                } else {
                    var itemId = _activeGiftBox[3].itemid;
                    var parame: Dictionary = new Dictionary();
                    parame.set("itemId", itemId);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
                }
            });
            //活跃度按钮4
            this._viewUI.getReward_btn4.on(LEvent.MOUSE_DOWN, this, () => {
                if (this.activeVal >= 80 && this.allChests.get(4) == 0) {
                    RequesterProtocols._instance.c2s_draw_gift_box(4);
                    var img = this._viewUI.rewardItem_img.getChildByName("rewardItem4_img") as Laya.Image;
                    img.removeChild(this.ani4);
                } else {
                    var itemId = _activeGiftBox[4].itemid;
                    var parame: Dictionary = new Dictionary();
                    parame.set("itemId", itemId);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
                }
            });
            //活跃度按钮5
            this._viewUI.getReward_btn5.on(LEvent.MOUSE_DOWN, this, () => {
                if (this.activeVal >= 100 && this.allChests.get(5) == 0) {
                    RequesterProtocols._instance.c2s_draw_gift_box(5);
                    var img = this._viewUI.rewardItem_img.getChildByName("rewardItem5_img") as Laya.Image;
                    img.removeChild(this.ani5);
                } else {
                    var itemId = _activeGiftBox[5].itemid;
                    var parame: Dictionary = new Dictionary();
                    parame.set("itemId", itemId);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
                }
            });
        }
        /** 活跃度进度条 */
        public activeProgress(): void {
            this.activeVal = ActivityModel.getInstance().activevalue;
            var actPro = this._viewUI.huoYue_pro;
            var actLab = this._viewUI.huoYue_lab;
            var actBox = this._viewUI.pro_box;
            var _val = this.activeVal / 100 - 0.05;
            if (_val > 1) {
                actPro.value = 1;
                actBox.x = 100 * 4;
            } else {
                actPro.value = _val;
                actBox.x = this.activeVal * 4;
            }
            actLab.text = this.activeVal + "";

            this.activeValOn();
        }
        /** 活跃度领取监听 */
        public activeValOn(): void {
            this.chests = ActivityModel.getInstance().chests;
            if (this.isInit) return;
            for (var i = 1; i <= 5; i++) {
                if (this.chests.get(i) != 0 && this.chests.get(i) != undefined) {
                    this.allChests.set(i, 1);
                } else {
                    this.allChests.set(i, 0);
                }
            }
            if (this.activeVal >= 20 && this.allChests.get(1) == 0) {
                this.ani1.loadAtlas("common/res/atlas/ui/lan.atlas", Laya.Handler.create(this, this.onCreateFrame, [this.ani1]));
                var img = this._viewUI.rewardItem_img.getChildByName("rewardItem1_img") as Laya.Image;
                img.addChild(this.ani1);
                this.ani1.x = -8;
                this.ani1.y = -8;
                this.ani1.scaleX = 0.9;
                this.ani1.scaleY = 0.9;
            }
            if (this.activeVal >= 40 && this.allChests.get(2) == 0) {
                this.ani2.loadAtlas("common/res/atlas/ui/lan.atlas", Laya.Handler.create(this, this.onCreateFrame, [this.ani2]));
                var img = this._viewUI.rewardItem_img.getChildByName("rewardItem2_img") as Laya.Image;
                img.addChild(this.ani2);
                this.ani2.x = -8;
                this.ani2.y = -8;
                this.ani2.scaleX = 0.9;
                this.ani2.scaleY = 0.9;
            }
            if (this.activeVal >= 60 && this.allChests.get(3) == 0) {
                this.ani3.loadAtlas("common/res/atlas/ui/lan.atlas", Laya.Handler.create(this, this.onCreateFrame, [this.ani3]));
                var img = this._viewUI.rewardItem_img.getChildByName("rewardItem3_img") as Laya.Image;
                img.addChild(this.ani3);
                this.ani3.x = -8;
                this.ani3.y = -8;
                this.ani3.scaleX = 0.9;
                this.ani3.scaleY = 0.9;
            }
            if (this.activeVal >= 80 && this.allChests.get(4) == 0) {
                this.ani4.loadAtlas("common/res/atlas/ui/lan.atlas", Laya.Handler.create(this, this.onCreateFrame, [this.ani4]));
                var img = this._viewUI.rewardItem_img.getChildByName("rewardItem4_img") as Laya.Image;
                img.addChild(this.ani4);
                this.ani4.x = -8;
                this.ani4.y = -8;
                this.ani4.scaleX = 0.9;
                this.ani4.scaleY = 0.9;
            }
            if (this.activeVal >= 100 && this.allChests.get(5) == 0) {
                this.ani5.loadAtlas("common/res/atlas/ui/lan.atlas", Laya.Handler.create(this, this.onCreateFrame, [this.ani5]));
                var img = this._viewUI.rewardItem_img.getChildByName("rewardItem5_img") as Laya.Image;
                img.addChild(this.ani5);
                this.ani5.x = -8;
                this.ani5.y = -8;
                this.ani5.scaleX = 0.9;
                this.ani5.scaleY = 0.9;
            }
        }
        /** 领取特效 */
        public onCreateFrame(ani): void {
            let effecthPath = this.getEffectUrls("", 14);
            Laya.Animation.createFrames(effecthPath, "lan");
            ani.play(0, true, "lan");
            ani.interval = 112;
        }
        /** 特效资源加载 */
        public getEffectUrls(aniName: string, length: number): any {
            var urls: any = [];
            for (var index = 1; index <= length; index++) {
                urls.push("common/ui/lan/" + aniName + index + ".png");
            }
            return urls;
        }
        /** 提示按钮监听 */
        public onLoad(): void {
            var parameArr: Dictionary = new Dictionary();
            parameArr.set("title", 11134);
            parameArr.set("contentId", 11135);
            this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, parameArr);
        }
        /** 领取双倍点数 */
        public lingQu(): void {
            RequesterProtocols._instance.c2s_CGetDPoint();
            models.ActivityProxy.getInstance().on(models.ROLEHOOKEXP_EVENT, this, () => {
                this._viewUI.dongJie_btn.visible = true;
                this._viewUI.getdpoint_lab.text = ActivityModel.getInstance().RoleHookExpData.getdpoint + "";
                this._viewUI.cangetdpoint_lab.text = ActivityModel.getInstance().RoleHookExpData.cangetdpoint + "";
            });
        }
        /** 冻结双倍点数 */
        public dongJie(): void {
            RequesterProtocols._instance.c2s_CFreezeDPoint();
            models.ActivityProxy.getInstance().on(models.ROLEHOOKEXP_EVENT, this, () => {
                this._viewUI.dongJie_btn.visible = false;
                this._viewUI.getdpoint_lab.text = ActivityModel.getInstance().RoleHookExpData.getdpoint + "";
                this._viewUI.cangetdpoint_lab.text = ActivityModel.getInstance().RoleHookExpData.cangetdpoint + "";
            });
        }
        /** 获取物品图标 */
        public getSrc(index: number): string {
            var src: string = "";
            if (index <= 10000) { src = "common/icon/skillicon/" + index + ".png"; }
            else if (index <= 10500) { src = "common/icon/bustrole/" + index + ".png"; }
            else if (index <= 11000) { src = "common/icon/bustmonster/" + index + ".png"; }
            else if (index <= 11100) { src = "common/icon/bustpartner/" + index + ".png"; }
            else if (index <= 11200) { src = "common/icon/bustmount/" + index + ".png"; }
            else if (index <= 12000) { src = "common/icon/bustpet/" + index + ".png"; }
            else if (index <= 30000) { src = "common/icon/item/" + index + ".png"; }
            else if (index <= 30500) { src = "common/icon/avatarrole/" + index + ".png"; }
            else if (index <= 31000) { src = "common/icon/avatarmonster/" + index + ".png"; }
            else if (index <= 31100) { src = "common/icon/avatarpartner/" + index + ".png"; }
            else if (index <= 31200) { src = "common/icon/avatarmount/" + index + ".png"; }
            else if (index <= 32000) { src = "common/icon/avatarpet/" + index + ".png"; }
            else if (index <= 40500) { src = "common/icon/grayavatarrole/" + index + ".png"; }
            else if (index <= 41000) { src = "common/icon/grayavatarmonster/" + index + ".png"; }
            else if (index <= 41100) { src = "common/icon/grayavatarpartner/" + index + ".png"; }
            else if (index <= 41200) { src = "common/icon/grayavatarmount/" + index + ".png"; }
            else if (index <= 42000) { src = "common/icon/grayavatarpet/" + index + ".png"; }
            return src;
        }

        protected onShow(event: Object): void {
            this._app.uiRoot.closeLoadProgress();
            RequesterProtocols._instance.c2s_CQueryCircleTaskState(1050000);
            RequesterProtocols._instance.c2s_sGet_activity_info();
            RequesterProtocols._instance.c2s_sRefresh_activity_list_finish_times();
            game.modules.activity.models.ActivityProxy.getInstance().once(game.modules.activity.models.REFRESHACTIVITYLIST_EVENT, this, () => {
                // game.modules.activity.models.ActivityProxy.getInstance().on(game.modules.activity.models.ACTIVITYINFOS_EVENT, this, () => {
                this.init();
                this.show();
                // });
            });
            mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
        }
        public hide(): void {
            super.hide();
            if (LoginModel.getInstance().CommonPage != "") {
                ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                LoginModel.getInstance().CommonPage = "";
            }
            mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
        }

        public getView(): Sprite {
            return this._viewUI;
        }
        public jumpPage(index: any): void {
            this.show();
        }
    }
}