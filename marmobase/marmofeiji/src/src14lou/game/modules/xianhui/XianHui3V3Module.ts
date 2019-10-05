/**
* 战仙会3V3 
*/
module game.modules.xianhui {
	export class XianHui3V3Module extends game.modules.ModuleMediator {
		private _viewUI: ui.common.ZhanXianHui3v3UI;
		public PvP3MyInfo: modules.xianhui.models.PvP3MyInfoVo;
		public XianHuiRankMediator: modules.xianhui.XianHuiRankMediator;
		public XianHuiPipeiMediator: modules.xianhui.XianHuiPipeiMediator;
		/**选择特效*/
		private ani1: Laya.Animation;
		private ani2: Laya.Animation;
		private ani3: Laya.Animation;
		/** 时间分/秒 */
		public timeM: number;
		public timeS: number;
		/** 战况信息 */
		public battleInfos: Array<any> = [];
		constructor(app: AppBase) {
			super();
			this.uiLayer = app.uiRoot.general;
			this._viewUI = new ui.common.ZhanXianHui3v3UI();
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this.XianHuiRankMediator = new modules.xianhui.XianHuiRankMediator(this._app);
			this.XianHuiPipeiMediator = new modules.xianhui.XianHuiPipeiMediator(this._app);
			this.ani1 = new Laya.Animation();
			this.ani2 = new Laya.Animation();
			this.ani3 = new Laya.Animation();

			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
			models.XianHuiProxy.getInstance().on(models.REFRESH_PVP3_EVENT, this, this.getRoleInfo);
			models.XianHuiProxy.getInstance().on(models.REFRESH_PVP3BATTLE_EVENT, this, this.getBattleInfo);

			this._viewUI.roles_list.renderHandler = new Handler(this, this.rolesHandler);
			this._viewUI.start_btn.on(LEvent.CLICK, this, this.pipei);
			this._viewUI.firstwin_img.on(LEvent.CLICK, this, this.getReward, [0]);
			this._viewUI.tenfight_img.on(LEvent.CLICK, this, this.getReward, [1]);
			this._viewUI.fivewin_img.on(LEvent.CLICK, this, this.getReward, [2]);

			this._viewUI.paihang_btn.on(LEvent.CLICK, this, this.getRankingView);
			this._viewUI.battleinfo_list.renderHandler = new Handler(this, this.battleHandler);

			this._viewUI.battles_check.on(LEvent.CLICK, this, this.getBattleInfo);
		}
		public init() {
			this._viewUI.zhandoutimes_lab.text = "0";
			this._viewUI.wintimes_lab.text = "0";
			this._viewUI.liansheng_lab.text = "0";
			this._viewUI.firstwin_img.skin = "common/ui/tongyong/baoxiang1.png";
			this._viewUI.tenfight_img.skin = "common/ui/tongyong/baoxiang1.png";
			this._viewUI.fivewin_img.skin = "common/ui/tongyong/baoxiang1.png";

			this.getRoleInfo();
			this.getBattleInfo();
		}
		/** 获取时间 */
		public getTime(startTime: number) {
			var date = new Date();
			var date2 = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " 22:00:00";
			var endTime = new Date(date2).getTime();
			var time = endTime - startTime;
			var m = time / 1000 / 60 % 60;
			var s = time / 1000 % 60;
			if (time <= 0) {
				this._viewUI.shengyutime_lab.text = "00:00";
			} else {
				this.timeM = Math.floor(m);
				this.timeS = Math.ceil(s);
				Laya.timer.loop(1000, this, this.showTime);
			}
			this.timeM = Math.floor(m);
			this.timeS = Math.ceil(s);
			Laya.timer.loop(1000, this, this.showTime);
			this.init();
			RequesterProtocols._instance.c2s_CPvP3MyInfo();
			super.show();
		}
		/** 定时器刷新时间显示 */
		public showTime() {
			var m: string = this.timeM + "";
			var s: string = this.timeS + "";
			if (this.timeM < 10) {
				m = "0" + this.timeM;
			} else if (this.timeM <= 0) {
				m = "00";
			}
			if (this.timeS < 10) {
				s = "0" + this.timeS;
			} else if (this.timeS <= 0) {
				s = "00";
			}
			this._viewUI.shengyutime_lab.text = m + ":" + s;
			if (this.timeM <= 0 && this.timeS <= 0) {
				Laya.timer.clear(this, this.showTime);
				return;
			}
			this.timeS -= 1;
			if (this.timeS < 0) {
				this.timeM -= 1;
				this.timeS = 59;
			}
		}
		/** 获取界面信息 */
		public getRoleInfo() {
			this.PvP3MyInfo = models.XianHuiModel.getInstance().PvP3MyInfo;
			if (this.PvP3MyInfo) {
				this._viewUI.zhandoutimes_lab.text = this.PvP3MyInfo.battlenum + "";
				this._viewUI.wintimes_lab.text = this.PvP3MyInfo.winnum + "";
				this._viewUI.liansheng_lab.text = this.PvP3MyInfo.combowinnum + "";
				if (this.PvP3MyInfo.firstwin == 2) {
					this._viewUI.firstwin_img.skin = "common/ui/tongyong/baoxiang0.png";
				} else if (this.PvP3MyInfo.firstwin == 1) {
					if (this.ani1) {
						this.ani1.clear();
					}
					this.ani1.loadAtlas("common/res/atlas/ui/tuji.atlas", Laya.Handler.create(this, this.onload));
					this.ani1.scaleX = 0.96;
					this.ani1.scaleY = 0.96;
					this._viewUI.firstkuang_img.addChild(this.ani1);
				}
				if (this.PvP3MyInfo.tenfight == 2) {
					this._viewUI.tenfight_img.skin = "common/ui/tongyong/baoxiang0.png";
				} else if (this.PvP3MyInfo.tenfight == 1) {
					if (this.ani2) {
						this.ani2.clear();
					}
					this.ani2.loadAtlas("common/res/atlas/ui/tuji.atlas", Laya.Handler.create(this, this.onload));
					this.ani2.scaleX = 0.96;
					this.ani2.scaleY = 0.96;
					this._viewUI.tenkuang_img.addChild(this.ani2);
				}
				if (this.PvP3MyInfo.eightwin == 2) {
					this._viewUI.fivewin_img.skin = "common/ui/tongyong/baoxiang0.png";
				} else if (this.PvP3MyInfo.eightwin == 1) {
					if (this.ani3) {
						this.ani3.clear();
					}
					this.ani3.loadAtlas("common/res/atlas/ui/tuji.atlas", Laya.Handler.create(this, this.onload));
					this.ani3.scaleX = 0.96;
					this.ani3.scaleY = 0.96;
					this._viewUI.tenkuang_img.addChild(this.ani3);
				}
			}

			//队伍信息
			var _teaminfo = modules.team.models.TeamModel.getInstance().teamMemberBasic.values;
			var data: Array<any> = [];
			for (var i = 0; i < 3; i++) {
				var jiahaoVisi: boolean = true;
				var getteamVisi: boolean = true;
				var roleVisi: boolean = false;
				var roleSkin: string = "";
				var rolenameVisi: boolean = false;
				var rolenameText: string = "";
				var levelVisi: boolean = false;
				var levelText: string = "";
				var shapeimgVisi: boolean = false;
				var shapeimgSkin: string = "";
				var shapeVisi: boolean = false;
				var shapeText: string = "";
				if (_teaminfo.length > 0 && i < _teaminfo.length) {
					jiahaoVisi = false;
					getteamVisi = false;
					roleVisi = true;
					roleSkin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + _teaminfo[i].shape) + ".png";
					rolenameVisi = true;
					rolenameText = _teaminfo[i].rolename;
					levelVisi = true;
					levelText = _teaminfo[i].level;
					shapeimgVisi = true;
					shapeimgSkin = RoleInfoModel.getInstance().setZhiyeImg(_teaminfo[i].school);
					shapeVisi = true;
					shapeText = createrole.models.LoginModel.getInstance().schoolInfo[_teaminfo[i].school]["name"];
				} else if (i < 1) {
					let roleDetail = game.modules.createrole.models.LoginModel.getInstance().roleDetail;
					jiahaoVisi = false;
					getteamVisi = false;
					roleVisi = true;
					roleSkin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + roleDetail.shape) + ".png";
					rolenameVisi = true;
					rolenameText = roleDetail.rolename;
					levelVisi = true;
					levelText = roleDetail.level + "";
					shapeimgVisi = true;
					shapeimgSkin = RoleInfoModel.getInstance().setZhiyeImg(roleDetail.school);
					shapeVisi = true;
					shapeText = createrole.models.LoginModel.getInstance().schoolInfo[roleDetail.school]["name"];
				}
				data.push({
					jiahao_img: { visible: jiahaoVisi },
					getteam_btn: { visible: getteamVisi },
					role_img: { visible: roleVisi, skin: roleSkin },
					rolename_lab: { visible: rolenameVisi, text: rolenameText },
					level_lab: { visible: levelVisi, text: levelText },
					shape_img: { visible: shapeimgVisi, skin: shapeimgSkin },
					shape_lab: { visible: shapeVisi, text: shapeText }
				});
			}
			this._viewUI.roles_list.array = data;
			this._viewUI.roles_list.repeatX = 1;
		}
		/** 获取战况信息 */
		public getBattleInfo() {
			this._viewUI.battleinfo_list.visible = false;
			var arr: Array<any> = [];
			if (this._viewUI.battles_check.selected) {	//只显示自己的战况
				arr = models.XianHuiModel.getInstance().PvP3BattleInfos.get(1);
			} else {
				arr = models.XianHuiModel.getInstance().PvP3BattleInfos.get(0);
			}
			this.battleInfos = [];
			if (arr && arr.length > 0) {
				//反转数据的顺序
				for (var i = arr.length - 1; i >= 0; i--) {
					this.battleInfos.push(arr[i]);
				}
				this._viewUI.battleinfo_list.visible = true;
				this._viewUI.battleinfo_list.array = this.battleInfos;
				this._viewUI.battleinfo_list.vScrollBarSkin = "";
			}
		}
		/** 战况渲染 */
		public battleHandler(cell: Laya.Box, index: number) {
			var battleHtml = cell.getChildByName("battleinfo_html") as Laya.HTMLDivElement;
			if (this.battleInfos.length > 0 && this.battleInfos[index]) {
				battleHtml.innerHTML = HudModel._instance.promptAssembleBack(this.battleInfos[index].msgId, this.battleInfos[index].parameters);
			}
		}
		/** 打开队伍界面 */
		public getTeamView() {
			let _TeamOrganizeMediator = new game.modules.team.TeamOrganizeMediator(this._app);
			this.hide();
			LoginModel.getInstance().CommonPage = "zhanxianhui";
			_TeamOrganizeMediator.onshow(TeamSetType.TIME_ACTIVITY);
		}
		/** 打开排行 */
		public getRankingView() {
			this.hide();
			LoginModel.getInstance().CommonPage = "zhanxianhui";
			this.XianHuiRankMediator.show();
		}
		/** 角色列表渲染 */
		public rolesHandler(cell: Laya.Box, index: number): void {
			var btn = cell.getChildByName("getteam_btn") as Laya.Button;
			btn.on(LEvent.CLICK, this, this.getTeamView);
		}
		/** 获取奖励 */
		public getReward(index: number) {
			if (!this.PvP3MyInfo) return;
			switch (index) {
				case 0:
					if (this.PvP3MyInfo.firstwin != 1) return;
					this.ani1.clear();
					RequesterProtocols._instance.c2s_CPvP3OpenBox(1);
					this._viewUI.firstwin_img.skin = "common/ui/tongyong/baoxiang0.png";
					break;
				case 1:
					if (this.PvP3MyInfo.tenfight != 1) return;
					this.ani2.clear();
					RequesterProtocols._instance.c2s_CPvP3OpenBox(2);
					this._viewUI.tenfight_img.skin = "common/ui/tongyong/baoxiang0.png";
					break;
				case 2:
					if (this.PvP3MyInfo.eightwin != 1) return;
					this.ani3.clear();
					RequesterProtocols._instance.c2s_CPvP3OpenBox(3);
					this._viewUI.fivewin_img.skin = "common/ui/tongyong/baoxiang0.png";
					break;
			}
		}
		/** 点击匹配 */
		public pipei() {
			this.hide();
			RequesterProtocols._instance.c2s_CPvP3ReadyFight(1);
			models.XianHuiProxy._instance.once(models.REFRESH_MATCHSTATE_EVENT, this, this.XianHuiPipeiMediator.init, [3]);
		}
		/**特效*/
		public onload() {
			Laya.Animation.createFrames(this.anUrls("xuanzhong", 9), "xuanzhong");
			this.ani1.play(0, true, "xuanzhong");
			this.ani1.interval = 112;
		}
		/**特效路径*/
		public anUrls(aniName: string, length: number): any {
			var urls: any = [];
			for (var index = 1; index <= length; index++) {
				urls.push("common/ui/tuji/" + aniName + index + ".png");
			}
			return urls;
		}
		protected onShow(event: Object): void {
			this.show();
		}
		public show() {
			RequesterProtocols._instance.c2s_CGameTime();
			modules.mainhud.models.HudProxy.getInstance().once(modules.mainhud.models.SERVER_TIME, this, this.getTime);
			game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.OPEN_EVENT);
		}
		public hide() {
			super.hide()
			if (LoginModel.getInstance().CommonPage != "") {
				ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
				LoginModel.getInstance().CommonPage = "";
			}
			game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.CLOSEVIEW_EVENT);
		}
		public getView(): Sprite {
			return this._viewUI;
		}
	}
}