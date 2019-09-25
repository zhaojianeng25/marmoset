import AnYeTaskVo = game.modules.tianjixianling.models.AnYeTaskVo;
module game.modules.tianjixianling {
    /** 天机仙令主界面 */
    export class TianJiXianLingMediator extends game.modules.UiMediator {
        /** 天机仙令的UI */
        private _viewUI: ui.common.TianXianJiLingUI;
        /** 天机仙令随机任务配置数据 */
        private _tjxlConfigData: Object = {};
        /** 玩家当前等级 */
        private _myLevel: number;
        /** 存放8个随机小任务数据的数组 */
        private _anyetasks: any;
        /** 天机仙令的信息数据 */
        private _tjxlInfoData: any;
        /** 造型数据 */
        private _shapeData: any;
        /** 各种道具表的复合数据 */
        private _itemAttrData: any;
        /** 宠物详细信息数据 */
        private _petInfoData: any;
        /** NPC详细信息数据 */
        private _NPCConfigData: any;
        /** 奖励道具id数组 */
        private _vrewardid: any;
        /** 放方法按钮文本内容的数组 */
        private _methodLabArray: any;
        /** tips界面 */
        private _tipsModule: game.modules.tips.tipsModule;
        /** 金币不足，显示兑换界面 */
        private _jinBiBuZuViewMediator: game.modules.commonUI.JinBiBuZuViewMediator;
        /** 被点击的天机仙令随机任务索引位置 */
        private _pos: number;
        /** 飘窗 */
        private _disappearMessageTipsMediator: DisappearMessageTipsMediator;
        /** 要进行探索的任务任务栏位 */
        private _taskPos: number;
        /** 用于判断是否元宝不足 */
        private _isEnough: boolean = false;

        constructor(app: AppBase) {
            super(app.uiRoot.general);
            this._viewUI = new ui.common.TianXianJiLingUI();
            this._clientWidth = app.clientWidth;
            this._clientHeight = app.clientHeight;
            this._app = app;

            this._tjxlConfigData = models.TianJiXianLingModel._instance.tjxlConfig;
            this._shapeData = createrole.models.LoginModel.getInstance().cnpcShapeInfo;
            this._itemAttrData = bag.models.BagModel._instance.itemAttrData;
            this._petInfoData = pet.models.PetModel._instance.petCPetAttrData;
            this._NPCConfigData = mainhud.models.HudModel.getInstance().cNPCConfigData;
        }
        /**
         * UI界面的初始化
         */
        private _initUI(): void {
            //部分UI初始化
            /** 天机仙令随机任务累积完成次数 */
            var _taskCount = this._tjxlInfoData.times;
            /** 临时计数 */
            var _num: number = Math.ceil(_taskCount / 8);//计算的是天机仙令任务当前处于的轮数值
            if (_taskCount % 8 == 0 && _taskCount < 160) {
                this._viewUI.tjxlTitle_lab.text = "天机仙令(" + (_num + 1) + "/20)";
            }
            else if (_taskCount == 160) {
                this._viewUI.tjxlTitle_lab.text = "天机仙令(20/20)";
            }
            else {
                this._viewUI.tjxlTitle_lab.text = "天机仙令(" + _num + "/20)";
            }
            game.modules.task.models.TaskProxy.getInstance().event(game.modules.task.models.TAKSREFRESH);
            //天机仙令随机任务列表初始化
            this._viewUI.tasks_lst.array = this._anyetasks;
            this._viewUI.tasks_lst.hScrollBarSkin = "";
            this._viewUI.tasks_lst.scrollBar.elasticBackTime = 100;
            this._viewUI.tasks_lst.scrollBar.elasticDistance = 100;
            this._viewUI.tasks_lst.renderHandler = new Handler(this, this.onRenderTasksLst);
            this.showTaskDetailInfo(0);//默认显示第一个任务
        }
        /**
         * 渲染天机仙令随机任务列表
         */
        private onRenderTasksLst(cell: Box, index: number): void {
            if (index < 0 || index >= this._anyetasks.length) {
                return;
            }
            /** 任务按钮 */
            var rw_btn: Laya.Button = cell.getChildByName("rw_btn") as Laya.Button;
            /** 任务id */
            var rwId = this._anyetasks[index]["id"];
            /** 任务名字 */
            var _strtasknameui = this._tjxlConfigData[rwId]["strtasknameui"];
            /** 任务名字文本 */
            var rwName_lab: Laya.Label = rw_btn.getChildByName("rwName_lab") as Laya.Label;
            rwName_lab.text = _strtasknameui;
            /** 任务小图标 */
            var rwIcon_img: Laya.Image = rw_btn.getChildByName("rwIcon_img") as Laya.Image;
            /** 任务小图标索引id */
            var _strtasktypeicon = this._tjxlConfigData[rwId]["strtasktypeicon"];
            rwIcon_img.skin = "common/icon/item/" + _strtasktypeicon + ".png";
            /** 任务图片（显示目标的图标） */
            var RenWuItem_img: Laya.Image = rw_btn.getChildByName("RenWuItem_img") as Laya.Image;
            /** 探索按钮 */
            var explore_btn: Laya.Button = cell.getChildByName("explore_btn") as Laya.Button;
            /** 边框图片 */
            var frame_img: Laya.Image = rw_btn.getChildByName("frame_img") as Laya.Image;
            /** 任务类型 */
            var _tasktype = this._tjxlConfigData[rwId]["tasktype"];
            /** 道具的品质色 */
            var _nquality: number;
            /** 目标id */
            var _dstitemid = this._anyetasks[index]["dstitemid"];
            //添加事件监听
            explore_btn.on(LEvent.CLICK, this, this.goToExplore, [index]);
            if (_tasktype == TaskType.Pet || _tasktype == TaskType.NPC) {//如果任务类型是寻宠或者挑战
                //explore_btn.visible = false;//就隐藏起探索按钮
                frame_img.skin = "common/ui/tongyong/kuang94.png";//不根据品质色显示相应边框
            }
            else {//如果任务类型是与道具相关
                //explore_btn.visible = true;//就显示起探索按钮
                _nquality = this._itemAttrData[_dstitemid]["nquality"];
                frame_img.skin = game.modules.bag.BagSystemModule.getGameItemFrameColorResource(_nquality);//还需要根据品质色显示相应边框
            }
            /** 目标NPC的id */
            var _dstnpcid = this._anyetasks[index]["dstnpcid"];
            RenWuItem_img.skin = this.showGoalImg(_tasktype, _dstitemid, _dstnpcid);
            /** 任务的简单描述的富文本框 */
            var renwuDesc_htm: Laya.HTMLDivElement = rw_btn.getChildByName("renwuDesc_htm") as Laya.HTMLDivElement;
            /** 目标的数量 */
            var _dstitemnum = this._anyetasks[index]["dstitemnum"];
            renwuDesc_htm.innerHTML = this.showDesc(rwId, _tasktype, _dstitemid, _dstitemnum, _dstnpcid);
            //为任务按钮添加点击事件
            rw_btn.on(LEvent.CLICK, this, this.showTaskDetailInfo, [index]);
            /** 任务状态 */
            var _state = this._anyetasks[index]["state"];
            /** 探索状态 */
            var _legend = this._anyetasks[index]["legend"];
            /** 任务状态图片 */
            var rwState_img: Laya.Image = rw_btn.getChildByName("rwState_img") as Laya.Image;
            this.reSetUI(_state, _legend, explore_btn, rwState_img);
            cell.visible = true;
        }
        /**
         * 前往探索
         * @param index 任务栏位
         */
        private goToExplore(index: number): void {
            this._taskPos = index;
            //先判断是否有任务正处于探索的状态下
            /** 处于探索的状态下的任务栏位 */
            var _legendpos = models.TianJiXianLingModel._instance.tjxlInfoData.legendpos;
            if (_legendpos < 0 || _legendpos > 7) {//如果当前并无正在探索的任务
                RequesterProtocols._instance.c2s_CLengendAnYetask(index);
                this.hide();
            }
            else {
                //弹出是否要放弃当前正探索的任务的提示窗口
                var _parame = new Laya.Dictionary();
                _parame.set("contentId", 166117);
                this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, _parame);
                tips.models.TipsProxy.getInstance().once(tips.models.TIPS_ON_OK, this, this.sureOnOK);
            }
        }
        /**
         * 跳转到探索地图
         * @describe 根据任务id找到任务类型下标，到寻找物品类分表中用与任务类型下标相对应的寻找物品组对应上寻找物品类id，最后再去收集物品类分表找到对应的地图id
         */
        private goToExploreMap(): void {
            let inTeamGroup = HudModel.getInstance().chargeInGroup();
            if (inTeamGroup) //处于组队
            {
                this._showInTeamTips();
                return;
            }
            /** 所要探索的地图id */
            var _mapId: number = models.TianJiXianLingModel._instance.getExploreTaskMapId(this._taskPos);
            //对当前场景进行判断
            if (game.modules.mainhud.models.HudModel.getInstance().sceneid != _mapId) {//如果当前场景不是要探索的场景，就进行位置跳转，并开启自动巡逻
                game.modules.mainhud.models.HudModel.getInstance().useapp = this._app
                game.modules.mainhud.models.HudModel.getInstance().getpost(_mapId);
                let mainUnit: Unit = this._app.sceneObjectMgr.mainUnit;
                RequesterProtocols._instance.c2s_req_goto(_mapId, parseInt(mainUnit.pos.x.toFixed(0)), parseInt(mainUnit.pos.y.toFixed(0)));
                this._app.sceneObjectMgr.mainUnit.xunluo = 1;
                this._app.sceneRoot.hangup = 1;
                mainhud.models.HudModel.getInstance().taskxl = 1;
                this.hide();
            }
            else {//如果正好在所要探索的场景，就开启自动巡逻
                this._app.sceneObjectMgr.mainUnit.xunluo = 1;
                this._app.sceneRoot.hangup = 1;
                mainhud.models.HudModel.getInstance().taskxl = 1;
            }
        }
        /**
         * 显示天机仙令随机任务的详细信息
         * @param index 被点击的任务索引位置
         */
        private showTaskDetailInfo(index: number): void {
            this._pos = index;
            /** 任务id */
            var rwId = this._anyetasks[index]["id"];
            /** 任务小图标索引id */
            var _strtasktypeicon = this._tjxlConfigData[rwId]["strtasktypeicon"];
            this._viewUI.rwIcon_img.skin = "common/icon/item/" + _strtasktypeicon + ".png";
            /** 任务名字 */
            var _strtasknameui = this._tjxlConfigData[rwId]["strtasknameui"];
            this._viewUI.rwName_lab.text = _strtasknameui;
            /** 任务类型 */
            var _tasktype = this._tjxlConfigData[rwId]["tasktype"];
            /** 目标id */
            var _dstitemid = this._anyetasks[index]["dstitemid"];
            if (_tasktype == TaskType.Item) {//任务类型是跟道具相关的
                /** 道具的品质色 */
                var _nquality = this._itemAttrData[_dstitemid]["nquality"];
                this._viewUI.frame_img.skin = game.modules.bag.BagSystemModule.getGameItemFrameColorResource(_nquality);//就需要根据品质色显示相应的边框
            }
            else {
                this._viewUI.frame_img.skin = "common/ui/tongyong/kuang94.png";
            }
            if (_tasktype == TaskType.NPC) {//任务类型是跟NPC相关的
                this._viewUI.finishStyle_lab.text = "挑战";
            }
            else {
                this._viewUI.finishStyle_lab.text = "购买";
            }
            /** 目标NPC的id */
            var _dstnpcid = this._anyetasks[index]["dstnpcid"];
            this._viewUI.RenWuItem_img.skin = this.showGoalImg(_tasktype, _dstitemid, _dstnpcid);
            /** 目标的数量 */
            var _dstitemnum = this._anyetasks[index]["dstitemnum"];
            this._viewUI.renwuDesc_htm.innerHTML = this.showDesc(rwId, _tasktype, _dstitemid, _dstitemnum, _dstnpcid, true);
            this._vrewardid = this._tjxlConfigData[rwId]["vrewardid"];
            this.showJiangLiItemLst();
            this._viewUI.JiangLiEXP_lab.text = this._tjxlInfoData.awardexp + "";
            /** 任务状态 */
            var _state = this._anyetasks[index]["state"];
            /** 探索状态 */
            var _legend = this._anyetasks[index]["legend"];
            this.reSetUI(_state, _legend, this._viewUI.finishStyle_btn, this._viewUI.finish_img, index);
        }
        /**
         * 重新设置UI界面
         * @param state 任务状态
         * @param legend 探索状态
         * @param btn 可能要被要重新设置的按钮
         * @param img 可能要被要重新设置的图片
         * @describe 根据任务状态的不同，UI显示也会有所不同
         */
        private reSetUI(state: number, legend: number, btn: Laya.Button, img: Laya.Image, index?: number): void {
            if (state == TaskState.SUCCESS) {//当任务成功，按钮隐藏，图片（完成的图片）显示
                if (!btn.name) {//区分下是在任务列表的按钮还是在详细任务信息栏的按钮
                    btn.visible = false;
                    img.visible = true;
                    //任性一下与寻求帮助的按钮变灰和不接受鼠标事件
                    this._viewUI.renxing_btn.gray = true;
                    this._viewUI.renxing_btn.mouseEnabled = false;
                    this._viewUI.askHelp_btn.gray = true;
                    this._viewUI.askHelp_btn.mouseEnabled = false;
                }
                else {
                    btn.visible = false;
                    img.skin = "common/ui/tianjixiangl/wancheng.png";
                    img.visible = true;
                }
            }
            else if (state == TaskState.DONE) {//任务完成，就是满足了任务所要求的目的
                if (!btn.name) {
                    //还需做判断，是否目标存在，可能该目标丢弃了或者用于其它任务的提交，例如：门派、帮派的任务
                    //任务类型
                    let _taskType = this._anyetasks[index]["kind"];
                    //目标id
                    let _id = this._anyetasks[index]["dstitemid"];
                    //目标数量
                    let _ownedTargetNum = 0;
                    if (_taskType == TaskType.Item) {
                        _ownedTargetNum = game.modules.bag.models.BagModel._instance.chargeItemNum(_id);//获取该道具的拥有数量
                    }
                    else if (_taskType == TaskType.Pet) {
                        _ownedTargetNum = models.TianJiXianLingModel.getInstance().checkOwnPetNum(_id);//获取该宠物的拥有数量
                    }
                    if (_ownedTargetNum == 0) {
                        this.reSetUI(TaskState.UNDONE, legend, btn, img);
                        return;
                    }
                    this._viewUI.finishStyle_lab.text = "交货";
                    btn.visible = true;
                    img.visible = false;
                    //关闭原来的事件监听
                    btn.off(LEvent.CLICK, this, this.carryOutProgram);
                    //开启新的事件监听，只执行一次
                    btn.once(LEvent.CLICK, this, this.submitTarget);
                    //任性一下与寻求帮助的按钮不变灰和接受鼠标事件
                    this._viewUI.renxing_btn.gray = false;
                    this._viewUI.renxing_btn.mouseEnabled = true;
                    this._viewUI.askHelp_btn.gray = false;
                    this._viewUI.askHelp_btn.mouseEnabled = true;
                }
                else {
                    btn.visible = true;
                    img.visible = false;
                }
            }
            else if (state == TaskState.UNDONE) {//任务未完成
                if (!btn.name) {
                    btn.visible = true;
                    img.visible = false;
                    //this._viewUI.finishStyle_lab.text = "购买";
                    //关闭交货的事件监听
                    btn.off(LEvent.CLICK, this, this.submitTarget);
                    //开启购买的事件监听
                    btn.on(LEvent.CLICK, this, this.carryOutProgram);
                    //任性一下与寻求帮助的按钮不变灰和接受鼠标事件
                    this._viewUI.renxing_btn.gray = false;
                    this._viewUI.renxing_btn.mouseEnabled = true;
                    this._viewUI.askHelp_btn.gray = false;
                    this._viewUI.askHelp_btn.mouseEnabled = true;
                }
                else {
                    this.showStateImg(legend, img, btn);
                }
            }
        }
        /**
         * 提交目标（道具、装备、宠物等）
         */
        private submitTarget(): void {
            /** 任务类型 */
            var _tasktype = this._anyetasks[this._pos]["kind"];
            /** 存放道具id */
            var itemid = [this._anyetasks[this._pos]["dstitemid"]];
            /** 任务id */
            var _taskId = this._anyetasks[this._pos]["id"];
            let _dstitemnum = this._anyetasks[this._pos]["dstitemnum"];
            HudModel.getInstance().tjxlData = [];
            HudModel.getInstance().tjxlData.push({ id: _taskId, dstitemnum: _dstitemnum });
            tianjixianling.models.TianJiXianLingModel.getInstance().taskPos = this._pos;
            models.TianJiXianLingModel.getInstance().submitTarget(itemid, _taskId, this._app, this._viewUI);
        }
        /**
         * 显示不同的状态下的图片
         * @param legend 探索状态
         * @param img 可能要被要重新设置的图片
         * @param btn 可能要被要重新设置的按钮
         */
        private showStateImg(legend: number, img: Laya.Image, btn: Laya.Button): void {
            switch (legend) {
                case LegendState.NoLegend://不可探索
                    btn.visible = false;
                    img.visible = false;
                    break;
                case LegendState.CanLegend://可探索
                    btn.visible = true;
                    img.visible = false;
                    break;
                case LegendState.Legend://正处于探索中
                    img.skin = "common/ui/tianjixiangl/tansuozhong.png";
                    btn.visible = false;
                    img.visible = true;
                    break;
                case LegendState.LegendFailure://探索失败
                    img.skin = "common/ui/tianjixiangl/tansuoshibai.png";
                    btn.visible = false;
                    img.visible = true;
                    break;
                case LegendState.LegendSuccess://探索成功
                    img.skin = "common/ui/tianjixiangl/tansuowancheng.png";
                    btn.visible = false;
                    img.visible = true;
                    break;
            }
        }
        /**
         * 显示奖励道具列表
         */
        private showJiangLiItemLst(): void {
            this._viewUI.JiangLiItem_lst.array = this._vrewardid;
            this._viewUI.JiangLiItem_lst.vScrollBarSkin = "";
            this._viewUI.JiangLiItem_lst.renderHandler = new Handler(this, this.onJiangLiItemLst);
        }
        /**
         * 渲染奖励道具列表
         */
        private onJiangLiItemLst(cell: Box, index: number): void {
            /** 奖励道具的图片 */
            var JiangLiItem_img: Laya.Image = cell.getChildByName("JiangLiItem_img") as Laya.Image;
            /** 奖励道具的id */
            var JLitemImgId = this._vrewardid[index];
            JiangLiItem_img.skin = "common/icon/item/" + this._itemAttrData[JLitemImgId]["icon"] + ".png";
            /** 边框图片 */
            var frame_img: Laya.Image = cell.getChildByName("frame_img") as Laya.Image;
            /** 道具的品质色 */
            var _nquality = this._itemAttrData[JLitemImgId]["nquality"];
            frame_img.skin = game.modules.bag.BagSystemModule.getGameItemFrameColorResource(_nquality);//根据品质色显示相应的边框
            //添加事件监听
            JiangLiItem_img.on(LEvent.CLICK, this, this.showItemDesc, [index]);
        }
        /**
         * 显示道具描述
         */
        private showItemDesc(index: number): void {
            /** 道具的id */
            var itemId = this._vrewardid[index];
            var _parame = new Laya.Dictionary();
            _parame.set("itemId", itemId);
            this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, _parame);
        }
        /**
         * 显示随机的天机仙令任务描述
         * @param taskid 任务id
         * @param tasktype 任务类型
         * @param dstitemid 目标id
         * @param dstitemnum 所要求目标的数量
         * @param dstnpcid 目标NPC
         * @param flag 有值，就是需要详细的描述
         */
        private showDesc(taskid: number, tasktype: number, dstitemid: number, dstitemnum: number, dstnpcid: number, flag?: boolean): string {
            //如果任务id、任务类型、目标id和目标的数量都没有有效值，直接返回空
            if (!taskid && !tasktype && !dstitemid && !dstitemnum) return null;
            /** 任务描述 */
            var _desc: string;
            if (flag) {
                _desc = this._tjxlConfigData[taskid]["strtaskdesc"];//获取详细任务描述
            }
            else {
                _desc = this._tjxlConfigData[taskid]["strtaskdescui"];//获取简短任务描述
            }
            /** 目标的名字 */
            var _targetName: string;
            /** 所拥有的目标的数量 */
            var ownedTargetNum: number;
            switch (tasktype) {//根据任务类型的不同
                case TaskType.Item:
                    _targetName = this._itemAttrData[dstitemid]["name"];//获取道具名字
                    ownedTargetNum = game.modules.bag.models.BagModel._instance.chargeItemNum(dstitemid);//获取该道具的拥有数量
                    //参数替换
                    _desc = _desc.replace("$ItemName$", _targetName);
                    _desc = _desc.replace("$Number2$", ownedTargetNum + "");
                    _desc = _desc.replace("$Number3$", dstitemnum + "");
                    break;
                case TaskType.Pet:
                    _targetName = this._petInfoData[dstitemid]["name"];//获取宠物名字
                    ownedTargetNum = models.TianJiXianLingModel.getInstance().checkOwnPetNum(dstitemid);//获取该宠物的拥有数量
                    //参数替换
                    _desc = _desc.replace("$PetName$", _targetName);
                    _desc = _desc.replace("$Number2$", ownedTargetNum + "");
                    _desc = _desc.replace("$Number3$", dstitemnum + "");
                    break;
                case TaskType.NPC:
                    _targetName = this._NPCConfigData[dstnpcid]["name"];//获取NPC名字
                    //参数替换
                    _desc = _desc.replace("$NPCName$", _targetName);
                    break;
            }
            return _desc;
        }

        /**
         * 显示目标图标
         * @param tasktype 任务类型
         * @param dstitemid 目标id
         * @param dstnpcid 目标NPC的id
         */
        private showGoalImg(tasktype: any, dstitemid: number, dstnpcid: number): any {
            //如果任务类型、目标id和目标NPC的id都没有有效值，直接返回空
            if (!tasktype && !dstitemid && !dstnpcid) return null;
            /** 图片id */
            var imgId: number;
            /** 图片路径地址 */
            var imgPath: string;
            switch (tasktype) {//根据任务类型的不同
                case TaskType.Item:
                    imgId = this._itemAttrData[dstitemid]["icon"];
                    imgPath = "common/icon/item/";
                    break;
                case TaskType.Pet:
                    imgId = this._shapeData[this._petInfoData[dstitemid]["modelid"]]["littleheadID"];
                    imgPath = "common/icon/avatarpet/";
                    break;
                case TaskType.NPC:
                    imgId = this._shapeData[this._NPCConfigData[dstnpcid]["modelID"]]["littleheadID"];
                    imgPath = "common/icon/avatarrole/";
                    break;
            }
            imgPath = imgPath + imgId + ".png";//组装出相应的图片资源路径
            return imgPath;
        }
        public show(): void {
            super.show();
            //初始化           
            this._init();
            //注册事件
            this.registerEvent();
            mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
        }
        /**
         * 注册事件
         */
        private registerEvent(): void {
            //按钮UI事件监听
            this._viewUI.close_btn.on(LEvent.CLICK, this, this.hide);
            this._viewUI.renxing_btn.on(LEvent.CLICK, this, this.showMethodLst, [this._viewUI.renxing_btn]);
            this._viewUI.askHelp_btn.on(LEvent.CLICK, this, this.showMethodLst, [this._viewUI.askHelp_btn]);
            //this._viewUI.finishStyle_btn.on(LEvent.CLICK, this, this.carryOutProgram);
            //图片事件监听
            this._viewUI.hideBg_img.on(LEvent.CLICK, this, this.hideUI);
            //消息监听
            models.TianJiXianLingProxy.getInstance().on(models.GET_TIANJIXIANLING_DATA, this, this.onRefreshData);
            models.TianJiXianLingProxy.getInstance().on(models.ALREADY_JOIN_TJXL, this, this.onRefreshData);

            models.TianJiXianLingProxy.getInstance().on(models.OPEN_EXPLORE_MODE, this, this.goToExploreMap);
        }
        /**
         * 点击提示窗口的确定，放弃当前正探索的任务，开启另一个任务的探索
         */
        private sureOnOK(): void {
            if (this._isEnough) {
                ModuleManager.jumpPage(ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
                this._isEnough = true;
            }
            else {
                RequesterProtocols._instance.c2s_CLengendAnYetask(this._taskPos);
                this.hide();
            }
        }

        /**
         * 执行方案
         * @describe 任务类型不同，执行的也有所不同
         */
        private carryOutProgram(): void {
            let inTeamGroup = HudModel.getInstance().chargeInGroup();
            if (inTeamGroup) //处于组队
            {
                this._showInTeamTips();
                this.hide();
                return;
            }
            /** 任务类型 */
            var _tasktype = this._anyetasks[this._pos].kind;
            /** 地图id */
            var _mapId: any;
            game.modules.mainhud.models.HudModel.getInstance().useapp = this._app;
            game.modules.mainhud.models.HudModel.getInstance().useapp.sceneRoot.istask = 2;
            switch (_tasktype) {
                case TaskType.Item://与道具相关
                    /** 道具id */
                    var _itemId = this._anyetasks[this._pos]["dstitemid"];
                    /** 售卖道具相应NPC的id */
                    var _itemNPCid = this._itemAttrData[_itemId]["npcid2"];
                    /** 临时商店类型 */
                    var tempShopType: number = models.TianJiXianLingModel.getInstance().getShopType(_itemId);
                    //获取售卖道具相应NPC所在地图id
                    _mapId = this._NPCConfigData[_itemNPCid]["mapid"];
                    //进行位置跳转
                    game.modules.mainhud.models.HudModel.getInstance().jumpmap(_mapId, _itemNPCid, _itemId, tempShopType);//购买道具
                    break;
                case TaskType.Pet://与宠物相关
                    /** 宠物id */
                    var _petId = this._anyetasks[this._pos]["dstitemid"];
                    /** 售卖宠物NPC的id */
                    var _petNPCid = this._petInfoData[_petId]["nshopnpcid"];
                    //获取售卖宠物NPC所在的地图id
                    _mapId = this._NPCConfigData[_petNPCid]["mapid"];
                    //进行位置跳转
                    game.modules.mainhud.models.HudModel.getInstance().jumpmap(_mapId, _petNPCid, _petId, shopType.PET_SHOP);//购买宠物
                    break;
                case TaskType.NPC://与NPC相关（挑战任务）
                    /** 目标NPC的id */
                    var _NPCid = this._anyetasks[this._pos]["dstnpcid"];
                    //获取目标NPC所在的地图id
                    _mapId = this._NPCConfigData[_NPCid]["mapid"];
                    //进行位置跳转
                    game.modules.mainhud.models.HudModel.getInstance().jumpmap(_mapId, _NPCid);
                    break;
            }
            this.hide();
        }
        /**
         * 显示提示飘窗消息
         */
        private showTipsMsg(msg: any): void {
            this._disappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
            this._disappearMessageTipsMediator.onShow(msg);
        }
        /**
         * 隐藏某些UI
         */
        private hideUI(): void {
            if (this._viewUI.method_lst.visible) {
                this._viewUI.method_lst.visible = false;
            }
            this._viewUI.hideBg_img.mouseThrough = true;
        }
        /**
         * 显示出方法列表
         * @describe 根据不同的按钮，显示出相对应的内容，Y轴位置也会相应调整
         *          这块有写死的数据，是认为用代码实现UI会更方便些
         * @param btn 按钮
         */
        private showMethodLst(btn: any): void {
            this._viewUI.method_lst.visible = true;
            this._viewUI.hideBg_img.mouseThrough = false;
            switch (btn) {
                case this._viewUI.renxing_btn://如果是任性一下按钮被点击
                    this._viewUI.method_lst.y = btn.y;
                    this._methodLabArray = [];
                    this._methodLabArray = ["5000金币完成", "800声望完成"];
                    break;
                case this._viewUI.askHelp_btn://如果是寻求帮助按钮被点击
                    this._viewUI.method_lst.y = btn.y;
                    this._methodLabArray = [];
                    this._methodLabArray = ["全服求助", "帮派求助"];
                    break;
            }
            this._viewUI.method_lst.array = this._methodLabArray;
            this._viewUI.method_lst.vScrollBarSkin = "";
            this._viewUI.method_lst.renderHandler = new Handler(this, this.onMethodLst);
        }
        /**
         * 渲染方法列表
         */
        private onMethodLst(cell: Box, index: number): void {
            /** 方法按钮 */
            var method_btn: Laya.Button = cell.getChildByName("method_btn") as Laya.Button;
            /** 方法文本 */
            var method_lab: Laya.Label = method_btn.getChildByName("method_lab") as Laya.Label;
            method_lab.text = this._methodLabArray[index];
            method_btn.on(LEvent.CLICK, this, this.checkFactor, [method_btn]);
        }
        /**
         * 检查是否满足实现该方法所要求的因素
         * @param btn 被点击的按钮
         */
        private checkFactor(btn: Laya.Button): void {
            //隐藏方法按钮列表
            this._viewUI.method_lst.visible = false;
            /** 被点击按钮的文本 */
            var method_lab: Laya.Label = btn.getChildByName("method_lab") as Laya.Label;
            /** 文本内容 */
            var _labText = method_lab.text;
            switch (_labText) {
                case "5000金币完成":
                    /** 金币数量 */
                    var _globalIcon: number = game.modules.mainhud.models.HudModel._instance.goldNum;
                    //先检查背包是否有足够的金币
                    if (_globalIcon >= 5000) {
                        RequesterProtocols._instance.c2s_CRenXingAnYeTask(this._pos, MoneyTypes.MoneyType_GoldCoin);
                    }
                    else {//金币不足时，弹出金币兑换窗口
                        this._jinBiBuZuViewMediator = new game.modules.commonUI.JinBiBuZuViewMediator(this._viewUI, this._app);
                        //因为元宝兑换金币比例是1：100，所以要向上取整修正
                        this._jinBiBuZuViewMediator.onShow(true, Math.ceil((5000 - _globalIcon) / 100) * 100 + "", Math.ceil((5000 - _globalIcon) / 100) + "");
                        /** 金币兑换界面使用元宝兑换 */
                        this._jinBiBuZuViewMediator.once(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this._exchange, [Math.ceil((5000 - _globalIcon) / 100)]);
                    }
                    break;
                case "800声望完成":
                    // /** 声望值 */
                    // var _shengwangNum = game.modules.mainhud.models.HudModel._instance.shengwangNum;
                    RequesterProtocols._instance.c2s_CRenXingAnYeTask(this._pos, MoneyTypes.MoneyType_ShengWang);
                    break;
                case "全服求助":
                    /** 求助信息 */
                    var _message = this.setHelpMessage();
                    /** 屏蔽非法字符后的消息文本 */
                    var _checkshiedmessage = this.shieldIllegalCharacter(_message);
                    let helpData = [{
                        type1: ChannelType.CHANNEL_TEAM_APPLY,
                        msg: _message,
                        noMsg: _checkshiedmessage,
                        type2: FunModelType.QIU_ZHU,
                        taskPos: this._pos
                    }]
                    //判断是否时挑战类型的天机仙令随机任务
                    if (this._anyetasks[this._pos].kind != TaskType.NPC) {
                        this.sendHelpRequest(helpData);
                        break;
                    }
                    /** 角色人物列表 */
                    var _rolelist = game.scene.models.SceneModel.getInstance().rolelist;
                    /** 角色基本数据 */
                    var _roleBasicData: game.scene.models.RoleBasicVo = _rolelist.get(game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid) as game.scene.models.RoleBasicVo;
                    /** 队伍信息数据 */
                    var _teaminfo = _roleBasicData.rolebasicOctets.datas.get(2);
                    if (!_teaminfo) {//如果没有创建队伍
                        team.models.TeamProxy.getInstance().once(team.models.CREATE_TEAM_SUCC,this, this.sendHelpRequest, [helpData]);
                        //先创建一个队伍
                        RequesterProtocols._instance.c2s_CCreateTeam();
                    }
                    else {//要是有了队伍的话
                        //就直接在组队申请频道发起求助信息
                        this.sendHelpRequest(helpData);
                    }
                    this.hide();
                    break;
                case "帮派求助":
                    /** 帮派id */
                    var _clankey = game.modules.mainhud.models.HudModel._instance.clankey;
                    //先判断是否有帮派
                    if (_clankey > 0) {//如果有帮派，就会有帮派id，值就是大于0
                        /** 求助信息 */
                        var _message = this.setHelpMessage();
                        /** 屏蔽非法字符后的消息文本 */
                        var _checkshiedmessage = this.shieldIllegalCharacter(_message);
                        let helpData = [{
                            type1: ChannelType.CHANNEL_CLAN,
                            msg: _message,
                            noMsg: _checkshiedmessage,
                            type2: FunModelType.QIU_ZHU,
                            taskPos: this._pos
                        }]
                        //判断是否时挑战类型的天机仙令随机任务
                        if (this._anyetasks[this._pos].kind != TaskType.NPC) {
                            this.sendHelpRequest(helpData);
                            break;
                        }
                        /** 角色基本数据 */
                        var _roleBasicData: game.scene.models.RoleBasicVo = game.scene.models.SceneModel.getInstance().rolelist.get(game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid) as game.scene.models.RoleBasicVo;
                        /** 队伍信息数据 */
                        var _teaminfo = _roleBasicData.rolebasicOctets.datas.get(2);
                        //还需要判断是否有队伍
                        if (!_teaminfo) {//如果没有创建队伍
                            team.models.TeamProxy.getInstance().once(team.models.CREATE_TEAM_SUCC,this, this.sendHelpRequest, [helpData]);
                            //先创建一个队伍
                            RequesterProtocols._instance.c2s_CCreateTeam();
                        }
                        else {//要是有了队伍的话
                            //就可以在帮派聊天频道发起求助信息
                            this.sendHelpRequest(helpData);
                        }
                    }
                    else {//没有加入帮派的话，就弹出消息飘窗 150027
                        var _msg = game.modules.chat.models.ChatModel._instance.chatMessageTips[150027]["msg"];
                        this.showTipsMsg(_msg);
                    }
                    this.hide();
                    break;
            }
        }
        /**
         * 发起求助请求
         * @param helpData 求助信息的数据
         */
        private sendHelpRequest(helpData): void {
            let type1 = helpData[0].type1;//聊天频道类型
            let msg = helpData[0].msg;//求助信息
            let noMsg = helpData[0].noMsg;//屏蔽了非法字符后的求助信息
            let type2 = helpData[0].type2;//聊天消息的功能类型
            let taskPos = helpData[0].taskPos;//在8个天机仙令中的任务位置
            RequesterProtocols._instance.c2s_CTransChatMessage2Serv(type1, msg, noMsg, [], type2, taskPos);
            if(type1 == ChannelType.CHANNEL_CLAN){
                ChatModel.getInstance().Firstchannel = 4;
            }
            else if(type1 == ChannelType.TEAM_APPLY){
                ChatModel.getInstance().Firstchannel = 6;
            }
			ModuleManager.show(ModuleNames.Chat,this._app);
        }
        /**
         * 仙晶(元宝)兑换 
         */
        public _exchange(yuanbao: any) {
            var fuShiNum = HudModel.getInstance().fuShiNum;
            if (fuShiNum < yuanbao) {
                this._isEnough = true;
                var _TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                _TipsMessageMediator.show();
                var param: Dictionary = new Dictionary();
                param.set("contentId", 150506);
                _TipsMessageMediator.showContent(param);
                tips.models.TipsProxy.getInstance().once(tips.models.TIPS_ON_OK, this, this.sureOnOK);
            } else {
                RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_HearthStone, MoneyTypes.MoneyType_GoldCoin, yuanbao);
            }
        }
        /**
         * 屏蔽非法字符
         */
        private shieldIllegalCharacter(text: string): string {
            var _chatConfigBinDic = game.modules.chat.models.ChatModel._instance.chatConfigBinDic;
            var _dicKeys = Object.keys(_chatConfigBinDic);
            /** 存放该被屏蔽字的数组 */
            var _shield_word = [];
            for (let i = 0; i < _dicKeys.length; i++) {
                _shield_word.push(_chatConfigBinDic[_dicKeys[i]]);
            }
            for (var i = 0; i < _shield_word.length; i++) {
                var index: number = text.search(_shield_word[i]);
                if (index != -1) {
                    text = text.replace(_shield_word[i], "**");
                }
            }
            return text;
        }
        /**
         * 设置求助信息
         * @describe 需要设置参数counterid、roleid、displaytype、uniqid
         */
        private setHelpMessage(): string {
            var _helpMessage: string = "";
            /** 任务名字 */
            var _taskName = this._tjxlConfigData[this._anyetasks[this._pos]["id"]]["strtaskname"];
            /** 任务类型 */
            var _tasktype = this._tjxlConfigData[this._anyetasks[this._pos]["id"]]["tasktype"];
            if (_tasktype != TaskType.NPC) {
                /** 目标id */
                var _dstitemid = this._anyetasks[this._pos]["dstitemid"];
                // /** 目标名称 */
                // var _targetName = this._itemAttrData[_dstitemid]["name"];
                /** 目标的数量 */
                var _dstitemnum = this._anyetasks[this._pos]["dstitemnum"];
                _helpMessage = this._anyetasks[this._pos]["id"] + "^"//任务id
                    + DisplayType.DISPLAY_TASK + "^"
                    + ShopId.ANYE_TASK + "^"
                    + 2 + "^"
                    + this._pos + "^"
                    + this._tjxlInfoData.times + "^"
                    + _dstitemid + "^";
                + _dstitemnum + "^";
            }
            else {
                // _helpMessage = "<_taskName=" + _taskName + ","
                //     + "leaderid=" + LoginModel.getInstance().roleDetail.roleid + ">";
                _helpMessage = this._anyetasks[this._pos]["id"] + "^"//任务id
                    + LoginModel.getInstance().roleDetail.roleid;//队长id
            }
            return _helpMessage;
        }
        /**
         * 刷新数据
         * @param anyetasks 8个随机小任务数据
         * @param infoData 天机仙令信息数据
         */
        private onRefreshData(anyetasks: any, infoData: any): void {
            if (!anyetasks && !infoData) {//如果全是undfine，说明已经参加了天机仙令了
                this._anyetasks = models.TianJiXianLingModel._instance.someRoundTasks;//获取之前保存在model里的随机任务数据
            }
            else if (anyetasks.length == 1) {//如果传过来的数据长度为1，说明刷新某一轮的随机任务数据中某个随机任务数据
                /** 临时存放随机任务数据 */
                var _tempTaskData = anyetasks;
                /** 原来8个随机任务数据 */
                var _someRoundTasks = models.TianJiXianLingModel._instance.someRoundTasks;
                if (_someRoundTasks[_tempTaskData[0]["pos"]]["id"] == _tempTaskData[0]["id"]) {//如果任务id相同
                    //把该任务最新数据刷新到原来的数据中去(任务栏位正好对应数组的下标)
                    _someRoundTasks[_tempTaskData[0]["pos"]] = _tempTaskData[0];
                }
                this._anyetasks = _someRoundTasks;
            }
            else {
                this._anyetasks = anyetasks;
            }
            if (infoData) {
                this._tjxlInfoData = infoData;
            }
            else {
                this._tjxlInfoData = models.TianJiXianLingModel._instance.tjxlInfoData;
            }
            //UI界面的初始化
            this._initUI();

            this.onShow();
        }
        /**
         * 显示界面
         */
        public onShow(): void {
            this._viewUI.visible = true;
        }
        /**
         * 初始化
         */
        private _init(): void {
            this.dataInit();
            //this._initUI();
        }
        /**
         * 数据初始化
         */
        private dataInit(): void {
            this.levelInit();
            this.configDataInit();
        }
        /**
         * 配置数据初始化
         */
        private configDataInit(): void {

        }
        /**
         * 玩家等级初始化
         */
        private levelInit(): void {
            if (mainhud.models.HudModel.getInstance().levelNum) {
                this._myLevel = mainhud.models.HudModel.getInstance().levelNum;
            }
            else {
                this._myLevel = createrole.models.LoginModel.getInstance().roleDetail.level;
            }
        }
        /** 飘窗提示处于组队状态 */
        private _showInTeamTips(): void {
            let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[PromptExplain.IN_TEAM_GROUP];
            let tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
            tips.onShow(chattext.msg);
        }

        public hide(): void {
            this.hideUI();
            super.hide();
            mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
        }

        public getView(): Sprite {
            return this._viewUI;
        }
    }
}