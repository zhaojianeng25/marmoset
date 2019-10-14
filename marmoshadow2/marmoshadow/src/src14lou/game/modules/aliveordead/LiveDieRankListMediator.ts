module game.modules.aliveordead {
    /** 生死战排行榜 */
    export class LiveDieRankListMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.LiveDieRankUI;
        /** 造型配置表 */
        private _shapeConfig: Object;
        /** 生死榜类型名字数组 */
        private _LDRankNameArr: Array<string>;
        /** 生死榜类型字典 */
        private _LDRankTypeDic: Laya.Dictionary;
        /** 生死榜列表的数据 */
        private _LDRankLstData: Array<models.LDVideoRoleInfoDesVo>;
        /** 上一次被选中的生死榜类型按钮 */
        private _lastSelectTypeBtn: Laya.Button;
        /** 装着顺序数字的字典 */
        private _numDic: Laya.Dictionary;
        /** 当前点赞的生死战是在生死榜列表里第几个 */
        private _LDRankLstIndex: number;

        constructor(app: AppBase) {
            super(app.uiRoot.general);
            this._viewUI = new ui.common.LiveDieRankUI();
            this.isCenter = true;
            this._clientWidth = app.clientWidth;
            this._clientHeight = app.clientHeight;
            this._app = app;

            //获取造型配置表
            this._shapeConfig = LoginModel.getInstance().cnpcShapeInfo;

            this._LDRankNameArr = ["本日决斗", "本周决斗", "历史决斗", "我的决斗"];

            this._numDic = new Laya.Dictionary();
        }

        /** 供其它地方使用该界面 */
        public onShow(): void {
            this.registerEvent();
            this.show();
            this._viewUI.rankType_lst.selectedIndex = LDmodelType.DAY_FIGHT - 1;//默认先显示本日的生死战排行榜
        }

        /** 请求生死战排行榜 */
        private requestLDRankLstData(modeltype: number): void {
            RequesterProtocols._instance.c2s_CLiveDieBattleRankView(modeltype);
        }

        /** 事件注册 */
        private registerEvent(): void {
            //UI控件事件监听            
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
            //消息事件监听
            models.AliveOrDeadProxy.getInstance().on(models.GetLDRankLstData, this, this.LDRankLstDataInit);
            models.AliveOrDeadProxy.getInstance().on(models.RoseSuccess, this, this.roseDataInit);
        }

        /** 点赞成功返回的数据处理
         * @param vedioid 某场生死场的录像id
         * @param rosenum 点赞次数
         * @param roseflag 是否还能点赞
         */
        private roseDataInit(vedioid: string, rosenum: number, roseflag: number):void{
            this._LDRankLstData = models.AliveOrDeadModel.getInstance()._rolefightlist;
            for(let i = 0; i < this._LDRankLstData.length; i ++){
                let rolefight: models.LDVideoRoleInfoDesVo = this._LDRankLstData[i];
                if(rolefight.videoid == vedioid){
                    rolefight.rosenum = rosenum;
                    rolefight.roseflag = roseflag;
                }
            }
            this.rankLstInit();
            this._viewUI.rank_lst.scrollTo(this._LDRankLstIndex);
        }

        /** 生死战排行榜数据初始化 */
        private LDRankLstDataInit(rolefightlist: Array<models.LDVideoRoleInfoDesVo>): void {
            this._LDRankLstData = [];
            this._LDRankLstData = rolefightlist;
            this.rankLstInit();
        }

        /** 界面的初始化 */
        private init(): void {
            this._LDRankTypeDic = new Laya.Dictionary();
            this._LDRankTypeDic.set("本日决斗", LDmodelType.DAY_FIGHT);
            this._LDRankTypeDic.set("本周决斗", LDmodelType.WEEK_FIGHT);
            this._LDRankTypeDic.set("历史决斗", LDmodelType.HIS_FIGHT);
            this._LDRankTypeDic.set("我的决斗", LDmodelType.SELF_FIGHT);
            this._LDRankLstData = [];
            this.rankTypeLstInit();
            this.rankLstInit();
        }

        /** 生死榜列表初始化 */
        private rankLstInit(): void {
            let lst  = this._viewUI.rank_lst;            
            lst.vScrollBarSkin = "";
            lst.scrollBar.elasticBackTime = 100;
            lst.scrollBar.elasticDistance = 100;
            lst.array = this._LDRankLstData;
            lst.renderHandler = new Laya.Handler(this, this.rankLstRender);
            lst.selectHandler = new Laya.Handler(this, this.rankLstSelect);
        }

        /** 生死榜的点击 */
        private rankLstSelect(index: number):void{

        }

        /** 顺序列表初始化
         * @param lst 顺序列表
         * @param ranking 第几个
         */
        private rankingLstInit(lst: Laya.List, ranking: number):void{
            let _numArr = [];
            ranking ++;
            if(ranking < 10){
                _numArr.push(ranking);
            }
            else {
                let rankingStr:string = ranking.toString();
                for(let i = 0; i < rankingStr.length; i ++){
                    _numArr.push(Number(rankingStr[i]));
                }
            }
            lst.array = _numArr;
            this._numDic.set(lst, _numArr);
            lst.renderHandler = new Laya.Handler(this, this.rankingLstRender, [lst]);
        }

        /** 顺序列表的渲染 */
        private rankingLstRender(lst : Laya.List, cell: Box, index: number):void{
            let num_img: Laya.Image = cell.getChildByName("num_img") as Laya.Image;
            num_img.skin = "common/ui/guanghuan/" + this._numDic.get(lst)[index] + ".png";
        }

        /** 生死榜的渲染 */
        private rankLstRender(cell: Box, index: number):void{
            if(index < 0 || index > this._LDRankLstData.length - 1) return;
            let _rolefight: models.LDVideoRoleInfoDesVo = this._LDRankLstData[index];
            let ranking_lst: Laya.List = cell.getChildByName("ranking_lst") as Laya.List;
            this.rankingLstInit(ranking_lst, index);

            let role1_box: Laya.Box = cell.getChildByName("role1_box") as Laya.Box;
            this.roleBoxInit(role1_box, _rolefight.role1, _rolefight.teamlist1);
            let role2_box: Laya.Box = cell.getChildByName("role2_box") as Laya.Box;
            this.roleBoxInit(role2_box, _rolefight.role2, _rolefight.teamlist2);

            let rosenum_lab: Laya.Label = cell.getChildByName("rosenum_lab") as Laya.Label;
            rosenum_lab.text = _rolefight.rosenum.toString();

            let result_img: Laya.Image = cell.getChildByName("result_img") as Laya.Image;
            if(_rolefight.battleresult == LDBattleResult.victory){//胜利
                result_img.skin = "common/ui/tongyong/sheng.png";
            }
            else if(_rolefight.battleresult == LDBattleResult.failure) {//失败
                result_img.skin = "common/ui/tongyong/bai.png";
            }
            else{//平局
                result_img.skin = "common/ui/tongyong/ping.png";
            }

            let rose_btn: Laya.Button = cell.getChildByName("rose_btn") as Laya.Button;
            if(_rolefight.roseflag == RoseFlag.can){
                rose_btn.mouseEnabled = true;
                rose_btn.on(LEvent.CLICK, this, this.requestRose, [_rolefight.videoid, index]);
            }
            else{
                rose_btn.mouseEnabled = false;
                rose_btn.off(LEvent.CLICK, this, this.requestRose);
            }
        }


        /** 请求点赞 */
        private requestRose(vedioid: string, index: number):void{
            this._LDRankLstIndex = index;
            RequesterProtocols._instance.c2s_CLiveDieBattleGiveRose(vedioid);
        }

        /** 对手盒子初始化
         * @param rolebox 角色盒子
         * @param roleinfo 角色信息
         * @param teaminfo 队伍信息
         */
        private roleBoxInit(rolebox: Laya.Box, roleinfo: models.LDRoleInfoDesVo, teaminfo: Array<models.LDTeamRoleInfoDesVo>):void{
            let role_img: Laya.Image = rolebox.getChildByName("role_img") as Laya.Image;
            let _littleheadID = this._shapeConfig[roleinfo.shape]["littleheadID"];
            role_img.skin = "common/icon/avatarrole/"+ _littleheadID +".png";

            let roleName_lab: Laya.Label = rolebox.getChildByName("roleName_lab") as Laya.Label;
            roleName_lab.text = roleinfo.rolename;

            let school_img: Laya.Image = rolebox.getChildByName("school_img") as Laya.Image;
            school_img.skin = "common/ui/tongyong/"+ roleinfo.school +".png";

            let selectType_lab: Laya.Label = rolebox.getChildByName("selectType_lab") as Laya.Label;
            let teamNum_lab: Laya.Label = rolebox.getChildByName("teamNum_lab") as Laya.Label;
            if(roleinfo.teamnum == 0 && roleinfo.teamnummax == 0){
                selectType_lab.text = "单人";
                teamNum_lab.visible = false;
            }
            else{
                selectType_lab.text = "组队";
                teamNum_lab.visible = true;
                teamNum_lab.text = roleinfo.teamnum + "/" + roleinfo.teamnummax;
            }
        }

        /** 生死榜类型列表初始化 */
        private rankTypeLstInit(): void {
            let lst = this._viewUI.rankType_lst;
            lst.repeatY = this._LDRankNameArr.length;
            lst.array = this._LDRankNameArr;
            lst.renderHandler = new Laya.Handler(this, this.rankTypeLstRender);
            lst.selectHandler = new Laya.Handler(this, this.rankTypeLstSelect);
        }

        /** 生死战类型列表点击 */
        private rankTypeLstSelect(index: number): void {
            let rankType_btn: Laya.Button = this._viewUI.rankType_lst.getCell(index).getChildByName("rankType_btn") as Laya.Button;
            let _LDRankTpye = this._LDRankTypeDic.get(rankType_btn.label);
            this.requestLDRankLstData(_LDRankTpye);
            rankType_btn.skin = "common/ui/tongyong/common_list_3textbg2.png";
            if(this._lastSelectTypeBtn){
               rankType_btn.skin = "common/ui/tongyong/common_list_3textbg.png";
            }            
            this._lastSelectTypeBtn = rankType_btn;
        }

        /** 生死榜类型列表渲染 */
        private rankTypeLstRender(cell: Box, index: number): void {
            if(index < 0 || index > this._LDRankNameArr.length - 1) return;
            let rankType_btn: Laya.Button = cell.getChildByName("rankType_btn")  as Laya.Button;
            rankType_btn.label = this._LDRankNameArr[index];
            rankType_btn.skin = "common/ui/tongyong/common_list_3textbg.png";
            if(this._lastSelectTypeBtn && this._lastSelectTypeBtn == rankType_btn){
               rankType_btn.skin = "common/ui/tongyong/common_list_3textbg2.png";
            }
        }

        public show() {
            super.show();
            this.init();
			mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
        }

        public hide() {
            super.hide();
            this.removeEvent();
			mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
        }

        /** 移除事件 */
        private removeEvent(): void {
            this._viewUI.close_btn.off(LEvent.MOUSE_DOWN, this, this.hide);            
            models.AliveOrDeadProxy.getInstance().off(models.GetLDRankLstData, this, this.LDRankLstDataInit);
            models.AliveOrDeadProxy.getInstance().off(models.RoseSuccess, this, this.roseDataInit);
        }

        public getView(): Sprite {
            return this._viewUI;
        }
    }
}