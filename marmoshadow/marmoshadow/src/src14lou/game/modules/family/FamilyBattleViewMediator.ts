/**
* 竞技排名
*/
module game.modules.family {
    export class FamilyBattleViewMediator extends game.modules.ModuleMediator {
        private _viewUI: ui.common.FamilyBattleUI;//ui.common.CreateRoleUI;
		tipsModule:game.modules.tips.tipsModule;
        constructor(app: AppBase) {
            super();
            this.uiLayer = app.uiRoot.general;
            this._viewUI = new ui.common.FamilyBattleUI();
            this._clientWidth = app.clientWidth;
            this._clientHeight = app.clientHeight;
            this._app = app;
            this._viewUI.selectbtn_tab.selectHandler = new Handler(this, this.dataRequest);
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
            this._viewUI.tishi_btn.on(LEvent.MOUSE_DOWN,this,this.showTips);
            this._viewUI.battle_btn.on(LEvent.MOUSE_DOWN,this,this.onBattle);
            this.dataRequest(0);
            this.CGetClearTime();
        }
        
        /**显示弹窗 */
        public showTips(){
            var parameArr:Dictionary = new Dictionary();
			parameArr.set("contentId",11605);
			this.tipsModule = new game.modules.tips.tipsModule(this._viewUI,this._app,TIPS_TYPE.CLIENTMESSAGE,parameArr);
        }

        public dataRequest(index: number) {
            this._viewUI.list_vstack.selectedIndex = index;
            switch (index) {
                case 0:
                    this.DuiZhenTab();
                    break;
                case 1:
                    this.JingSaiRank();
                    break;
                case 2:
                    this.liShiZhanJi();
                    break;
            }

        }

        /**
         * 对阵表
         */
        public DuiZhenTab() {
            this._viewUI.duizhan_list.visible = false;
            this._viewUI.timeOne_btn.on(LEvent.MOUSE_DOWN, this, this.duizhanTimeListSelect, [0]);
            this._viewUI.timeTwo_btn.on(LEvent.MOUSE_DOWN, this, this.duizhanTimeListSelect, [1]);
            this.duizhanTimeListSelect(0);

        }
        
        /**对阵表选择 */
        public duizhanTimeListSelect(which) {
            this.CGetClanFightList(-1, which);
            models.FamilyProxy._instance.on(models.SGetClanFightList, this, this.showDuiZhanList);
        }

        /**显示对阵列表 */
        public showDuiZhanList() {
            var ClanFightList = models.FamilyModel.getInstance().ClanFightList;
            var m_clanfightlist = ClanFightList.get("clanfightlist");
            var duizhenArr = [];
            if (m_clanfightlist.length > 0) {
                this._viewUI.duizhan_list.visible = true;
                for (var i = 0; i < m_clanfightlist.length; i++) {
                    var clanid1 = m_clanfightlist[i].clanid1;
                    var clanname1 = m_clanfightlist[i].clanname1;
                    var clanid2 = m_clanfightlist[i].clanid2;
                    var clanname2 = m_clanfightlist[i].clanname2;

                    duizhenArr.push({ clanIdOne_label: clanid1, clanNameOne_label: clanname1, clanNameTwo_label: clanname2, clanIdTwo_label: clanid2 });
                }
                SaleModel._instance.showList(this._viewUI.duizhan_list, duizhenArr);
            }
        }

        /**
         * 竞赛排名
         */
        public JingSaiRank() {
            this._viewUI.jingsai1_btn.on(LEvent.MOUSE_DOWN, this, this.onjingsaiBtn, [0, RankType.CLAN_FIGHT_2]);
            this._viewUI.jingsai2_btn.on(LEvent.MOUSE_DOWN, this, this.onjingsaiBtn, [0, RankType.CLAN_FIGHT_4]);
            this._viewUI.tongji_btn.on(LEvent.MOUSE_DOWN, this, this.onjingsaiBtn, [1, RankType.CLAN_FIGHT_WEEK]);
            this._viewUI.jingSaiRank_list.visible = false;
            this._viewUI.tongji_list.visible = false;
            this.onjingsaiBtn(0, RankType.CLAN_FIGHT_2);

        }
        
        /**点击竞赛按钮 */
        public onjingsaiBtn(index, ranktype) {
            this._viewUI.jingSaiList_vstack.selectedIndex = index;
            this.CRequestRankList(ranktype, 0);
            game.modules.ranKingList.models.RanKingListProxy.getInstance().once(game.modules.ranKingList.models.GET_RANKLIST_INFODATA_EVENT, this, this.showJingSaiList);
        }
        
        /**显示竞赛列表 */
        public showJingSaiList(ranktype, hasMore) {
            var rankListInfoData = game.modules.ranKingList.models.RanKingListModel._instance.rankListInfoData;
            if (rankListInfoData.length > 0) {  //有竞赛信息
                if (ranktype == RankType.CLAN_FIGHT_2 || ranktype == RankType.CLAN_FIGHT_4) { //公会战周2和周4那场
                    this._viewUI.jingSaiRank_list.visible = true;
                    var jingsaiArr = [];
                    for (var i = 0; i < rankListInfoData.length; i++) {
                        var rank = rankListInfoData[i].rank;
                        var clanname = rankListInfoData[i].clanname;
                        var clanlevel = rankListInfoData[i].clanlevel;
                        var scroe = rankListInfoData[i].scroe;
                        jingsaiArr.push({ rank: rank, clanName: clanname, clanLevel: clanlevel, clanJifen: scroe });
                    }
                    SaleModel._instance.showList(this._viewUI.jingSaiRank_list, jingsaiArr);
                } else if (ranktype == RankType.CLAN_FIGHT_WEEK) { //公会战本轮竞赛排名
                    var tongjiArr = [];
                    this._viewUI.tongji_list.visible = true;
                    for (var i = 0; i < rankListInfoData.length; i++) {
                        var rank = rankListInfoData[i].rank;
                        var clanname = rankListInfoData[i].clanname;
                        var fightcount = rankListInfoData[i].fightcount;
                        var wincount = rankListInfoData[i].wincount;
                        var scroe = rankListInfoData[i].scroe;
                        var winRate = (wincount / fightcount).toFixed(2);
                        tongjiArr.push({ rank: rank, clanName: clanname, canZhanNum: fightcount, score: scroe, winRate: winRate })
                    }
                    SaleModel._instance.showList(this._viewUI.tongji_list, tongjiArr);
                }
            }

        }

        /**
         * 历史战绩
         */
        public liShiZhanJi() {
            this._viewUI.clanHistroyRank_list.visible = false;
            this.CRequestRankList(RankType.CLAN_FIGHT_HISTROY, 0);
            game.modules.ranKingList.models.RanKingListProxy.getInstance().once(game.modules.ranKingList.models.GET_RANKLIST_INFODATA_EVENT, this, this.showClanFightHistroyRank);


        }
        
        /**公会战历史排名 */
        public showClanFightHistroyRank(ranktype, hasMore) {
            var rankListInfoData = game.modules.ranKingList.models.RanKingListModel._instance.rankListInfoData;
            if (rankListInfoData.length > 0) {  /**是否有信息 */
                var FightHistroyArr = [];
                this._viewUI.clanHistroyRank_list.visible = true;
                for (var i = 0; i < rankListInfoData.length; i++) {
                    var rank = rankListInfoData[i].rank;
                    var clanname = rankListInfoData[i].clanname;
                    var fightcount = rankListInfoData[i].fightcount;
                    var wincount = rankListInfoData[i].wincount;
                    var scroe = rankListInfoData[i].scroe;
                    var clanlevel = rankListInfoData[i].clanlevel;
                    var winRate = (wincount / fightcount).toFixed(2);
                    FightHistroyArr.push({ rank: rank, clanname: clanname, clanLevel: clanlevel, fightcount: fightcount, wincount: wincount, scroe: scroe, winRate: winRate });
                }
                SaleModel._instance.showList(this._viewUI.clanHistroyRank_list, FightHistroyArr);
            }
        }
        
        /**显示清除时间 */
        public showClearTime(clearTime){
            this._viewUI.clearTime_label.text = this.time2date(clearTime);
        }
        
        /**转换时间 */
        public time2date(time){
            var mytime = new Date(time);
            var y = mytime.getFullYear();
            var m = mytime.getMonth() + 1;
            var d = mytime.getDate();
            return m + "月" + d + "日";
        }

        public onBattle(){
            this.CNpcService(139,910030);
            this.hide();
        }

        /**
         * 下次清零时间
         */
        public CGetClearTime() {
            RequesterProtocols._instance.c2s_CGetClearTime();
            models.FamilyProxy._instance.on(models.SGetClearTime,this,this.showClearTime);
        }

        /**得到对战列表 */
        public CGetClanFightList(whichweek, which) {
            RequesterProtocols._instance.c2s_CGetClanFightList(whichweek, which);
        }

        /**请求竞技排名 */
        public CRequestRankList(ranktype, page) {
            RequesterProtocols._instance.c2s_request_ranklist(ranktype, page)
        }

        /**通用向服务器发送NPC服务消息（不带参数） */
        public CNpcService(npckey,serviceid){
            RequesterProtocols._instance.c2s_npc_service(npckey,serviceid)
        }

        protected onShow(event: Object): void {
            this.show();
        }

        public hide(): void {
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }

    }
}