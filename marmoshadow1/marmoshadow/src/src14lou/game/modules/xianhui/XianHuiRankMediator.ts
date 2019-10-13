/**
* 战仙会PVP3排行榜
*/
module game.modules.xianhui {
	export class XianHuiRankMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.ZhanXianHuiPaiHangUI;
		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.ZhanXianHuiPaiHangUI();
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
			this._viewUI.btns_tab.selectHandler = new Handler(this, this.cutView);
			models.XianHuiProxy._instance.on(models.REFRESH_PVP3RANKING_EVENT, this, this.getData);
		}
		/** 设置界面，默认本次排行 */
		public cutView(index: number) {
			RequesterProtocols._instance.c2s_CPvP3RankingList(index);
			this._viewUI.btns_tab.selectedIndex = index;
		}
		/** 设置界面数据 */
		public getData() {
			this._viewUI.ranking_list.visible = false;
			this._viewUI.rankingNum_lab.text = "";
			this._viewUI.name_lab.text = "";
			this._viewUI.level_lab.text = "";
			if (!models.XianHuiModel._instance.PvP3Ranking) return;
			var rankings = models.XianHuiModel._instance.PvP3Ranking.get(this._viewUI.btns_tab.selectedIndex);

			//自己的名次
			var myScore = rankings[1][0];
			//排行数据
			var roleScores = rankings[0];
			if (!myScore || !roleScores) return;
			this._viewUI.ranking_list.visible = true;
			this._viewUI.rankingNum_lab.text = myScore.index + "";
			this._viewUI.name_lab.text = myScore.rolename + "";
			this._viewUI.level_lab.text = myScore.score + "";

			var data: Array<any> = [];
			for (var i = 0; i < roleScores.length; i++) {
				var tubiaoVisi: boolean = false;
				var tubiaoSkin: string = "common/ui/paihangbang/diyiditu.png";
				var rankingNumVisi: boolean = true;
				var rankingNum: string = i + 1 + "";
				var ditu1Visi: boolean = false;
				var ditu2Visi: boolean = false;
				if (i < 3) {
					tubiaoVisi = true;
					rankingNumVisi = false;
					if (i == 1) tubiaoSkin = "common/ui/paihangbang/dierditu.png";
					if (i == 2) tubiaoSkin = "common/ui/paihangbang/disanditu.png";
				}
				if (i == 0 || i % 2 == 0) {
					ditu1Visi = true;
				} else {
					ditu2Visi = true;
				}
				data.push({
					tubiao_img: { visible: tubiaoVisi, skin: tubiaoSkin },
					rankingNum_lab: { visible: rankingNumVisi, text: rankingNum },
					name_lab: { text: roleScores[i].rolename },
					jifen_lab: { text: roleScores[i].score },
					ditu1_img: { visible: ditu1Visi },
					ditu2_img: { visible: ditu2Visi }
				});
			}
			this._viewUI.ranking_list.array = data;
			this._viewUI.ranking_list.repeatX = 1;
		}
		public show() {
			super.show();
			this.cutView(0);
			game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.OPEN_EVENT);
		}
		public hide() {
			game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.CLOSEVIEW_EVENT);
			super.hide()
			if (LoginModel.getInstance().CommonPage != "") {
				ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
				LoginModel.getInstance().CommonPage = "";
			}
		}
		public getView(): Sprite {
			return this._viewUI;
		}
	}
}