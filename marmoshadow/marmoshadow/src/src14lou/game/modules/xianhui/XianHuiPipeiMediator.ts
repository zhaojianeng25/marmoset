/**
* 战仙会匹配
*/
module game.modules.xianhui {
	export class XianHuiPipeiMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.PiPeiUI;
		public rolesNum: number;
		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.PiPeiUI();
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
			this._viewUI.cancel_btn.on(LEvent.CLICK, this, this.hide);
			models.XianHuiProxy._instance.on(models.REFRESH_MATCHRESULE_EVENT, this, this.setOtherTeam);
		}
		/** 设置自身匹配信息 */
		public init(index: number) {
			super.show();
			this.rolesNum = index;
			index == 1 ? this._viewUI.otherTeam_list.x = 530 : this._viewUI.otherTeam_list.x = 329;
			game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.OPEN_EVENT);
			//队伍信息
			var _teaminfo = modules.team.models.TeamModel.getInstance().teamMemberBasic.values;
			var data: Array<any> = [];
			for (var i = 0; i < this.rolesNum; i++) {
				var roleVisi: boolean = false;
				var roleSkin: string = "";
				var levelVisi: boolean = false;
				var levelText: string = "";
				var schoolVisi: boolean = false;
				var schoolSkin: string = "";
				if (_teaminfo.length > 0 && i < _teaminfo.length) {
					roleVisi = true;
					roleSkin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + _teaminfo[i].shape) + ".png";
					levelVisi = true;
					levelText = "Lv." + _teaminfo[i].level;
					schoolVisi = true;
					schoolSkin = RoleInfoModel.getInstance().setZhiyeImg(_teaminfo[i].school);
				} else if (i < 1) {
					let roleDetail = game.modules.createrole.models.LoginModel.getInstance().roleDetail;
					roleVisi = true;
					roleSkin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + roleDetail.shape) + ".png";
					levelVisi = true;
					levelText = "Lv." + roleDetail.level;
					schoolVisi = true;
					schoolSkin = RoleInfoModel.getInstance().setZhiyeImg(roleDetail.school);
				}
				data.push({
					role_img: { visible: roleVisi, skin: roleSkin },
					level_lab: { visible: levelVisi, text: levelText },
					school_img: { visible: schoolVisi, skin: schoolSkin }
				});
			}
			this._viewUI.myteam_list.array = data;
			this._viewUI.myteam_list.repeatY = 1;
			this.setOtherTeam();
			Laya.timer.loop(1000, this, this.setOtherTeam);
		}
		/** 获取其他队伍信息数据 */
		public setOtherTeam(targets?: Array<any>) {
			var _targets: Array<any> = [];
			if (!targets) {
				let roleDetail = game.modules.createrole.models.LoginModel.getInstance().roleDetail;
				for (var i = 0; i < this.rolesNum; i++) {
					//产生随机数
					var shape = Math.floor(Math.random() * 6 + 1);
					var school = Math.floor(Math.random() * 3);
					let createRoleConfigBaseVo: CreateRoleConfigBaseVo = LoginModel.getInstance().createRoleConfigBinDic[shape] as CreateRoleConfigBaseVo;
					let PvP3RoleSingleMatch = new models.PvP3RoleSingleMatchVo();
					PvP3RoleSingleMatch.roleId = 0;
					PvP3RoleSingleMatch.level = roleDetail.level;
					PvP3RoleSingleMatch.shape = shape;
					PvP3RoleSingleMatch.school = createRoleConfigBaseVo.schools[school];
					_targets.push(PvP3RoleSingleMatch);
				}
			} else {
				Laya.timer.clear(this, this.setOtherTeam);
				Laya.timer.once(3000, this, this.hide);
				_targets = targets;
			}
			this.getOtherTeam(_targets);
		}
		/** 设置其他队伍信息 */
		public getOtherTeam(targets: Array<any>) {
			var data: Array<any> = [];
			for (var i = this.rolesNum - 1; i >= 0; i--) {
				var roleVisi: boolean = false;
				var roleSkin: string = "";
				var levelVisi: boolean = false;
				var levelText: string = "";
				var schoolVisi: boolean = false;
				var schoolSkin: string = "";
				if (i < targets.length) {
					roleVisi = true;
					roleSkin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + targets[i].shape) + ".png";
					levelVisi = true;
					levelText = "Lv." + targets[i].level;
					schoolVisi = true;
					schoolSkin = RoleInfoModel.getInstance().setZhiyeImg(targets[i].school);
				}
				data.push({
					role_img: { visible: roleVisi, skin: roleSkin },
					level_lab: { visible: levelVisi, text: levelText },
					school_img: { visible: schoolVisi, skin: schoolSkin }
				});
			}
			this._viewUI.otherTeam_list.array = data;
			this._viewUI.otherTeam_list.repeatY = 1;
		}
		public hide() {
			RequesterProtocols._instance.c2s_CPvP3ReadyFight(0);
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