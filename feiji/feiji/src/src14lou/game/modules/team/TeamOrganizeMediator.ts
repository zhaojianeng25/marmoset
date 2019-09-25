/**
* name 
*/
/** 一级副本菜单 */
enum TeamSetType {
	STORY_TASK = 1,			//剧情任务
	DAILY_FUBEN = 3,		//日常副本
	SUPERIOR_FUBEN = 4,		//精英副本
	TIME_ACTIVITY = 5,		//定时活动
	FAMILY_ACTIVITY = 6,	//帮派活动
	YUANGU_MOXIANG = 7,		//远古魔像
	LEVEL_TASK = 8,			//等级任务
	SHANGGU_SHEN = 9,		//上古之神
	DiroBS = 10,			//迪奥布斯-选拔
	ZHANGJIE_TASK = 11,		//章节任务
}
module game.modules.team {
	export class TeamOrganizeMediator extends game.modules.UiMediator {
		public _viewUI: ui.common.TeamOrganizeUI;
		// private _RoleChenweiMediator:RoleChenweiMediator;
		// private _RoleTipMediator:RoleTipMediator;
		// private _RoleShopMediator:RoleShopMediator;
		// private _RoleJiFenDuiHuanMediator:RoleJiFenDuiHuanMediator;
		/** 菜单数据 */
		private MenuData: Laya.Dictionary;
		/** 一级菜单数据 */
		private firstMenu: Array<any> = [];
		/** 二级菜单数据 */
		private secondMenu: Array<any> = [];
		/** 是否初始化界面 */
		private initFlag: boolean = false;
		/** 队伍数据配置 */
		private teamListConfig: any;
		/** 队伍详情信息 */
		private teamInfoList: any;
		/** 最低等级 */
		private minLvel: number = -1;
		/** 最高等级 */
		private maxLevel: number = -1;
		/** 目标Id */
		private targetId: number = -1;
		/** 显示等待的目标Id */
		private waittargetId: number = -1;
		/** 目标名称 */
		private target: string = "";
		/** 当前 二级类型 */
		private currentSecondType: number = 1;
		/** 当前二级菜单选中的下标 */
		private currentSecondSelectIndex: number = -1;
		/** 当前一级菜单选中的下标 */
		private currentFirstSelectIndex: number = -1;
		/** 造型数据 */
		private shapeInfo: Array<any> = [];
		/** 当前选中的二级菜单按钮 */
		private currentSelectSecondButton: Laya.Button;
		/** 当前选中的一级级菜单按钮 */
		private currentSelectFirstButton: Laya.Button;
		/**动画 */
		private ani: Laya.Animation;
		/**手指图标 */
		private dianImg: Laya.Image;
		/**当前引导编号 */
		private yindaoId: number;
		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.TeamOrganizeUI();
			this._viewUI.mouseThrough = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this.isCenter = true;
			this.MenuData = new Laya.Dictionary();
			this._initShape();
			this.init();
			this.initialize();
			this.registerEvent();
		}
		/**初始化 */
		public initialize(): void {
			this.ani = new Laya.Animation();
			this.dianImg = new Laya.Image();
		}
		/** 
		 * 注册事件
		 */
		private registerEvent(): void {
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.closeTeamOrgangize);
			this._viewUI.flash_btn.on(LEvent.MOUSE_DOWN, this, this.CRequestTeamMatchList);
			this._viewUI.creatTeam_btn.on(LEvent.MOUSE_DOWN, this, this.createTeam);
			this._viewUI.zidongpipei_btn.on(LEvent.CLICK, this, this.autoMatch, [0])
			team.models.TeamProxy.getInstance().on(team.models.WAIT_MATCH_EVENT, this, this.refreshWaitMatch);
			team.models.TeamProxy.getInstance().on(team.models.REFRESH_TEAMINFO_EVENT, this, this.refresTeamInfo);
			team.models.TeamProxy.getInstance().on(team.models.OPEN_TEAM_EVENT, this, this.openTeam);
			team.models.TeamProxy.getInstance().on(models.MAINHUD_UPDATE_TEAM_STATE, this, this.showWait);

		}
		/** 初始化不需要更改的东西 */
		private _initShape(): void {
			this.teamListConfig = TeamModel.getInstance().teamListConfig;
			let shapeInfo = LoginModel.getInstance().cnpcShapeInfo;
			for (let index in shapeInfo) {/** 造型表数据放入 */
				this.shapeInfo.push(shapeInfo[index].littleheadID);
			}
		}
		/** 显示组队状态提示 */
		private showWait(data: Dictionary): void {
			let match_data = data.get("data") as Array<any>;
			if (match_data[0] == true) {
				this.waittargetId = this.targetId;
			} else if (match_data[0] == false) {
				this.waittargetId = -1;
			}
			this.refreshSecondMenuData(this.currentSecondType);
		}
		/** 打开队伍界面 */
		private openTeam(): void {
			ModuleManager.show(ModuleNames.Team, this._app);
			this.hide();
		}
		/** 刷新   队伍  数据信息 */
		private refresTeamInfo(): void {
			this.teamInfoList = TeamModel.getInstance().SRequestTeamMatchList.get("TeamMatchList");
			if (this.teamInfoList.tteamlist.length == 0) {
				this._viewUI.applyList_list.visible = false;
				return;
			} else {
				this._viewUI.applyList_list.visible = true;
			}
			this._viewUI.applyList_list.vScrollBarSkin = "";
			/** this.teamInfoList.tteamlist.length  和 this.teamInfoList.tteamlist  长度和数据源要同步*/
			this._viewUI.applyList_list.repeatY = this.teamInfoList.tteamlist.length;//实际队伍的长度
			this._viewUI.applyList_list.array = this.teamInfoList.tteamlist; // 如果用this.teamInfoList将进不去渲染
			this._viewUI.applyList_list.scrollBar.elasticBackTime = 200;
			this._viewUI.applyList_list.scrollBar.elasticDistance = 100;
			this._viewUI.applyList_list.renderHandler = new Handler(this, this.onRenderTeamList);

		}

		/** 增加或去掉点击事件监听 */
		private onOrOffEvent(teamMemberId: number, teamMemberImg: Laya.Image):void{
			if(teamMemberImg.visible && teamMemberId != 0){
				teamMemberImg.on(LEvent.CLICK, this, this.showContactCharacterMediator, [teamMemberId]);
			}
			else{
				teamMemberImg.off(LEvent.CLICK, this, this.showContactCharacterMediator);
			}
		}

		/** 显示人物功能弹窗 */
		private showContactCharacterMediator(teamMemberId: number, e: LEvent):void{
			RequesterProtocols._instance.c2s_CRequestUpdateRoleInfo(teamMemberId);
			RequesterProtocols._instance.c2s_CReqRoleTeamState(teamMemberId);
			var isFriendFlag = FriendModel.getInstance().isMyFriend(teamMemberId);
            let _ContactCharacterMediator = new friend.ContactCharacterMediator(this._viewUI,this._app);
			_ContactCharacterMediator.onShow(e.target.mouseX, e.target.mouseY, isFriendFlag);
		}

		/** 渲染队伍list */
		private onRenderTeamList(cell: Box, index: number): void {
			if (index < 0 || index > this.teamInfoList.tteamlist.length - 1) return;
			let teamLeaderName_lab: Laya.Label = cell.getChildByName("teamCard").getChildByName("teamLeaderName_lab") as Laya.Label;
			let leaderLevel_lab: Laya.Label = cell.getChildByName("teamCard").getChildByName("leaderLevel_lab") as Laya.Label;
			let storyName_lab: Laya.Label = cell.getChildByName("teamCard").getChildByName("storyName_lab") as Laya.Label;
			let subTaskName_lab: Laya.Label = cell.getChildByName("teamCard").getChildByName("subTaskName_lab") as Laya.Label;
			let apply_btn: Laya.Button = cell.getChildByName("teamCard").getChildByName("apply_btn") as Laya.Button;
			let applyOver_btn: Laya.Button = cell.getChildByName("teamCard").getChildByName("applyOver_btn") as Laya.Button;
			let LeaderId = this.teamInfoList.tteamlist[index].TeamInfoBasicVo.leaderid;
			apply_btn.on(LEvent.CLICK, this, this.applyForTeam, [LeaderId, apply_btn, applyOver_btn]);			
			/** 队长 */
			let icon1_img: Laya.Image = cell.getChildByName("teamCard").getChildByName("teamOne_img").getChildByName("icon1_img") as Laya.Image;
			let positionIcon1_img: Laya.Image = cell.getChildByName("teamCard").getChildByName("teamOne_img").getChildByName("positionIcon1_img") as Laya.Image;
			let school1_img: Laya.Image = cell.getChildByName("teamCard").getChildByName("teamOne_img").getChildByName("school1_img") as Laya.Image;
			/** 第二个队员 */
			let icon2_img: Laya.Image = cell.getChildByName("teamCard").getChildByName("teamTwo_img").getChildByName("icon2_img") as Laya.Image;
			let positionIcon2_img: Laya.Image = cell.getChildByName("teamCard").getChildByName("teamTwo_img").getChildByName("positionIcon2_img") as Laya.Image;
			let school2_img: Laya.Image = cell.getChildByName("teamCard").getChildByName("teamTwo_img").getChildByName("school2_img") as Laya.Image;
			icon2_img.visible = false; positionIcon2_img.visible = false; school2_img.visible = false;
			/** 第三个队员 */
			let icon3_img: Laya.Image = cell.getChildByName("teamCard").getChildByName("teamThree_img").getChildByName("icon3_img") as Laya.Image;
			let positionIcon3_img: Laya.Image = cell.getChildByName("teamCard").getChildByName("teamThree_img").getChildByName("positionIcon3_img") as Laya.Image;
			let school3_img: Laya.Image = cell.getChildByName("teamCard").getChildByName("teamThree_img").getChildByName("school3_img") as Laya.Image;
			icon3_img.visible = false; positionIcon3_img.visible = false; school3_img.visible = false;
			/** 第四个队员 */
			let icon4_img: Laya.Image = cell.getChildByName("teamCard").getChildByName("teamFour_img").getChildByName("icon4_img") as Laya.Image;
			let positionIcon4_img: Laya.Image = cell.getChildByName("teamCard").getChildByName("teamFour_img").getChildByName("positionIcon4_img") as Laya.Image;
			let school4_img: Laya.Image = cell.getChildByName("teamCard").getChildByName("teamFour_img").getChildByName("school4_img") as Laya.Image;
			icon4_img.visible = false; positionIcon4_img.visible = false; school4_img.visible = false;
			/** 第五个队员 */
			let icon5_img: Laya.Image = cell.getChildByName("teamCard").getChildByName("teamFive_img").getChildByName("icon5_img") as Laya.Image;
			let positionIcon5_img: Laya.Image = cell.getChildByName("teamCard").getChildByName("teamFive_img").getChildByName("positionIcon5_img") as Laya.Image;
			let school5_img: Laya.Image = cell.getChildByName("teamCard").getChildByName("teamFive_img").getChildByName("school5_img") as Laya.Image;
			icon5_img.visible = false; positionIcon5_img.visible = false; school5_img.visible = false;
			leaderLevel_lab.text = this.teamInfoList.tteamlist[index].TeamInfoBasicVo.leaderlevel;
			teamLeaderName_lab.text = this.teamInfoList.tteamlist[index].TeamInfoBasicVo.leadername;
			let targetId = this.teamInfoList.tteamlist[index].TeamInfoBasicVo.targetid;
			storyName_lab.text = this.teamListConfig[targetId].content;
			subTaskName_lab.text = this.teamListConfig[targetId].target;
			let teamLength = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo.length;
			if (teamLength > 0) {/** 队伍只有一人 队长 */
				let school = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index].school;
				let shape = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index].shape;
				let shapeId = this.shapeInfo[shape];
				icon1_img.skin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + shape) + ".png"
				let schoolImgUrl = TeamModel.getInstance().getSchoolImgBack(school);
				school1_img.skin = schoolImgUrl;
				positionIcon1_img.visible = true;
				let roleId = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index].roleid;
				this.onOrOffEvent(roleId, icon1_img);
			}
			this.onOrOffEvent(0, icon2_img);
			this.onOrOffEvent(0, icon3_img);
			this.onOrOffEvent(0, icon4_img);
			this.onOrOffEvent(0, icon5_img);
			if (teamLength > 1) {/** 两个人 */
				let shape = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index + 1].shape;
				let school = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index + 1].school;
				let shapeId = this.shapeInfo[shape];
				icon2_img.visible = true;
				icon2_img.skin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + shape) + ".png";
				let schoolImgUrl = TeamModel.getInstance().getSchoolImgBack(school);
				school2_img.visible = true;
				school2_img.skin = schoolImgUrl;
				positionIcon2_img.visible = false;
				let roleId = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index + 1].roleid;
				this.onOrOffEvent(roleId, icon2_img);
			}
			if (teamLength > 2) {/** 三个人 */

				icon3_img.visible = true;
				school3_img.visible = true;
				let shape = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index + 2].shape;
				let school = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index + 2].school;
				let shapeId = this.shapeInfo[shape];
				icon3_img.skin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + shape) + ".png"
				let schoolImgUrl = TeamModel.getInstance().getSchoolImgBack(school);
				school3_img.skin = schoolImgUrl;
				positionIcon3_img.visible = false;
				let roleId = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index + 2].roleid;
				this.onOrOffEvent(roleId, icon3_img);
			}
			if (teamLength > 3) {/** 四个人 */
				icon4_img.visible = true;
				school4_img.visible = true;
				let shape = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index + 3].shape;
				let school = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index + 3].school;
				let shapeId = this.shapeInfo[shape];
				icon4_img.skin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + shape) + ".png"
				let schoolImgUrl = TeamModel.getInstance().getSchoolImgBack(school);
				school4_img.skin = schoolImgUrl;
				positionIcon4_img.visible = false;
				let roleId = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index + 3].roleid;
				this.onOrOffEvent(roleId, icon4_img);
			}
			if (teamLength > 4) {/** 五个人 */
				icon5_img.visible = true;
				school5_img.visible = true;
				let shape = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index + 4].shape;
				let school = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index + 4].school;
				let shapeId = this.shapeInfo[shape];
				icon5_img.skin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + shape) + ".png"
				let schoolImgUrl = TeamModel.getInstance().getSchoolImgBack(school);
				school5_img.skin = schoolImgUrl;
				positionIcon5_img.visible = false;
				let roleId = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index + 4].roleid;
				this.onOrOffEvent(roleId, icon5_img);
			}

		}
		/** 队伍申请 
		 * @param roleId 角色Id
		 * @param applyBtn 申请按钮
		 * @param applyOverBtn 已申请按钮
		*/
		private applyForTeam(roleId: number, applyBtn: Button, applyOverBtn: Button): void {

			RequesterProtocols._instance.c2s_CRequestJoinTeam(roleId);
			this.hide();
			// applyBtn.visible = false;
			// applyOverBtn.visible = true;
		}


		/** 刷新一级菜单数据源 */
		private refreshFirstMenuData(): void {
			this._viewUI.firstMenu2_list.vScrollBarSkin = "";
			this._viewUI.firstMenu2_list.repeatY = this.firstMenu.length;
			this._viewUI.firstMenu2_list.array = this.firstMenu;
			if (this.firstMenu.length > 0 && this.currentFirstSelectIndex == -1) this.currentFirstSelectIndex = 0;
			this._viewUI.firstMenu2_list.scrollBar.elasticBackTime = 200;
			this._viewUI.firstMenu2_list.scrollBar.elasticDistance = 100;
			this._viewUI.firstMenu2_list.renderHandler = new Handler(this, this.onRendeFirstMenu);
			this._viewUI.firstMenu2_list.scrollTo(this.currentFirstSelectIndex);

		}
		/** 刷新二级菜单数据源 
		 * @param type 类型
		 * @param requirement  需求条件
		 * @param opentime 开启时间
		 * @param selectBtn 选中按钮
		 * @param selectIndex 选中下标
		*/
		private refreshSecondMenuData(type: number, requirement?: string, opentime?: string, selectBtn?: Button, selectIndex?: number): void {
			this.currentSecondType = type;
			//   this._viewUI.match_image.visible = true;

			if (typeof (selectBtn) != "undefined") {
				this.currentFirstSelectIndex = selectIndex;
				if (this.currentSelectFirstButton && this.currentSelectFirstButton.selected)
					this.currentSelectFirstButton.selected = false;
				this.currentSelectFirstButton = selectBtn;
				this.currentSelectFirstButton.selected = true;
				if(this.currentSecondSelectIndex == -1){
					this.currentSecondSelectIndex = 0;
				}
				this._viewUI.zidongpipei_btn.visible = true;
			}
			this.secondMenu = this.MenuData.get(type);
			if (this.secondMenu == null) this.secondMenu = [];
			this._viewUI.secondMenu2_list.vScrollBarSkin = "";
			this._viewUI.secondMenu2_list.repeatY = this.secondMenu.length;
			this._viewUI.secondMenu2_list.array = this.secondMenu;
			this._viewUI.secondMenu2_list.scrollBar.elasticBackTime = 200;
			this._viewUI.secondMenu2_list.scrollBar.elasticDistance = 100;
			this._viewUI.secondMenu2_list.renderHandler = new Handler(this, this.onRendeSecondMenu);
			this._viewUI.secondMenu2_list.scrollTo(this.currentSecondSelectIndex);
			if (this.currentFirstSelectIndex == 1 && this.yindaoId == YinDaoEnum.CHOOSE_RICHANG_YINDAO) {
				this.closeAni();
				this.pipeiYindao();
			}
		}
		/** 二级菜单渲染 */
		private onRendeSecondMenu(cell: Box, index: number): void {
			if (index > (this.secondMenu.length - 1) || index < 0) return;
			let secondMenu_btn: Laya.Button = cell.getChildByName("secondMenu_btn") as Laya.Button;
			let tar_wait_img = cell.getChildByName("tar_wait_img") as Laya.Image;
			secondMenu_btn.label = this.secondMenu[index].target;
			let minLevel = this.secondMenu[index].minlevel;
			let maxLevel = this.secondMenu[index].maxlevel;
			let target = this.secondMenu[index].target;
			let targetId = this.secondMenu[index].id;
			if (targetId == this.waittargetId) {
				tar_wait_img.skin = "common/ui/team/team_deng.png";
			} else {
				tar_wait_img.skin = "";
			}

			if (this.currentSecondSelectIndex != index) {
				secondMenu_btn.selected = false;
			} else {
				this.currentSelectSecondButton = secondMenu_btn;
				this.currentSelectSecondButton.selected = true;
				this.targetId = targetId;
				this.target = target;
				this.minLvel = minLevel;
				this.maxLevel = maxLevel;
			}
			secondMenu_btn.on(LEvent.CLICK, this, this.getTargetMenu, [minLevel, maxLevel, targetId, secondMenu_btn, index, target]);

		}

		/** 一级菜单渲染 */
		private onRendeFirstMenu(cell: Box, index: number): void {
			if (index > (this.firstMenu.length - 1) || index < 0) return;
			let firstMenu_btn: Laya.Button = cell.getChildByName("firstMenu_btn") as Laya.Button;
			firstMenu_btn.label = this.firstMenu[index].content;
			let type = this.firstMenu[index].type;
			let requirement = this.firstMenu[index].requirement;
			let opTime = this.firstMenu[index].opentime;
			//当前渲染下标不是选中的一级菜单
			if (this.currentFirstSelectIndex != index) {
				firstMenu_btn.selected = false;
			} else {
				this.currentSelectFirstButton = firstMenu_btn;
				this.currentSelectFirstButton.selected = true;
			}

			firstMenu_btn.on(LEvent.MOUSE_DOWN, this, this.refreshSecondMenuData, [type, requirement, opTime, firstMenu_btn, index]);

		}
		/** 
		 * 点击二级菜单
		 *  @param targetId  目标Id
		 *  @param secondMenu_btn    二级菜单按钮
		 *  @param index       选中下标
		 */
		private getTargetMenu(minLevel: number, maxLevel: number, targetId: number, secondMenu_btn: Button, index: number, target: string): void {
			this.targetId = targetId;
			this.target = target;
			if (this.currentSelectSecondButton && this.currentSelectSecondButton.selected)
				this.currentSelectSecondButton.selected = false;
			this.currentSelectSecondButton = secondMenu_btn;
			this.currentSelectSecondButton.selected = true;
			this.currentSecondSelectIndex = index;
			this.minLvel = minLevel;
			this.maxLevel = maxLevel;
			// this.refreshSecondMenuData(this.currentSecondType);
			if (!this._viewUI.zidongpipei_btn.visible) {
				this._viewUI.zidongpipei_btn.visible = true;
			}

		}
		/** 刷新匹配的数据
		 * @param teammatchnum 匹配的队伍数
		 * @param playermatchnum 匹配的人数
		 */
		private refreshWaitMatch(teammatchnum: number, playermatchnum: number): void {
			let prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.LEADER_MEMBER_NUM, [teammatchnum, playermatchnum]);
			this._viewUI.waitMatch_lab.text = prompt;
		}
		private createTeam(): void {
			this.hide();
			RequesterProtocols._instance.c2s_CCreateTeam();
			let minlevel = this.minLvel;
			let maxlevel = this.maxLevel;
			if (minlevel != -1 && this.targetId != -1)
				models.TeamProxy.getInstance().event(models.REFRESH_TARGET, [minlevel, maxlevel, this.target, this.targetId]);
		}
		private closeTeamOrgangize(): void {
			// this.event(SHOW_TEAM);
			this.hide();

		}
		/** 自动匹配 
		 * @param  type 匹配类型
		*/
		private autoMatch(type: number): void {
			let flag = models.TeamModel.getInstance().matchFlag;
			if (flag == false) {/** 未匹配 */
				RequesterProtocols._instance.c2s_CRequestMatchInfo();
				let isCreateTeam = models.TeamModel.getInstance().screateTeam;
				if (type == 1) {/**
				* @param 0 个人组队匹配 @param 1 组队匹配
				*/
					this._viewUI.zidongpipei_btn.label = "取消匹配";
					RequesterProtocols._instance.c2s_CRequestTeamMatch(1, this.targetId, this.minLvel, this.maxLevel);
				} else {
					this._viewUI.zidongpipei_btn.label = "取消匹配";
					RequesterProtocols._instance.c2s_CRequestTeamMatch(0, this.targetId, this.minLvel, this.maxLevel);
				}
				TeamModel.getInstance().currMatchTarget = this.target;
			} else if (flag) {/** 已经在匹配 点击取消匹配 */
				RequesterProtocols._instance.c2s_CRequestStopTeamMatch();
				this._viewUI.zidongpipei_btn.label = "自动匹配";
			}
			if (this.yindaoId == YinDaoEnum.PIPEI_YINDAO)
				this.closeAni();

		}
		private init(): void {
			let tempData1: Array<any> = [];
			let tempData2: Array<any> = [];
			let tempData3: Array<any> = [];
			let tempData4: Array<any> = [];
			let tempData5: Array<any> = [];
			let tempData6: Array<any> = [];
			let tempData7: Array<any> = [];
			let tempData8: Array<any> = [];
			let tempData9: Array<any> = [];
			let tempData10: Array<any> = [];
			let _rolelevel = HudModel.getInstance().levelNum;
			for (var index in this.teamListConfig) {
				if (_rolelevel < this.teamListConfig[index].minlevel) continue;
				if (this.teamListConfig[index].type == TeamSetType.STORY_TASK) {

					tempData1.push(this.teamListConfig[index]);
				} else if (this.teamListConfig[index].type == TeamSetType.DAILY_FUBEN) {
					tempData2.push(this.teamListConfig[index]);
				} else if (this.teamListConfig[index].type == TeamSetType.SUPERIOR_FUBEN) {
					tempData3.push(this.teamListConfig[index]);
				} else if (this.teamListConfig[index].type == TeamSetType.TIME_ACTIVITY) {
					tempData4.push(this.teamListConfig[index]);
				} else if (this.teamListConfig[index].type == TeamSetType.FAMILY_ACTIVITY) {
					tempData5.push(this.teamListConfig[index]);
				} else if (this.teamListConfig[index].type == TeamSetType.YUANGU_MOXIANG) {
					tempData6.push(this.teamListConfig[index]);
				} else if (this.teamListConfig[index].type == TeamSetType.LEVEL_TASK) {
					tempData7.push(this.teamListConfig[index]);
				} else if (this.teamListConfig[index].type == TeamSetType.SHANGGU_SHEN) {
					tempData8.push(this.teamListConfig[index]);
				} else if (this.teamListConfig[index].type == TeamSetType.DiroBS) {
					tempData9.push(this.teamListConfig[index]);
				} else if (this.teamListConfig[index].type == TeamSetType.ZHANGJIE_TASK) {
					tempData10.push(this.teamListConfig[index]);
				}
			}
			this.MenuData.clear();
			if (tempData10.length != 0)
				this.MenuData.set(TeamSetType.ZHANGJIE_TASK, tempData10);
			if (tempData9.length != 0)
				this.MenuData.set(TeamSetType.DiroBS, tempData9);
			if (tempData8.length != 0)
				this.MenuData.set(TeamSetType.SHANGGU_SHEN, tempData8);
			if (tempData7.length != 0)
				this.MenuData.set(TeamSetType.LEVEL_TASK, tempData7);
			if (tempData6.length != 0)
				this.MenuData.set(TeamSetType.YUANGU_MOXIANG, tempData6);
			if (tempData5.length != 0)
				this.MenuData.set(TeamSetType.FAMILY_ACTIVITY, tempData5);
			if (tempData4.length != 0)
				this.MenuData.set(TeamSetType.TIME_ACTIVITY, tempData4);
			if (tempData3.length != 0)
				this.MenuData.set(TeamSetType.SUPERIOR_FUBEN, tempData3);
			if (tempData2.length != 0)
				this.MenuData.set(TeamSetType.DAILY_FUBEN, tempData2);
			if (tempData1.length != 0)
				this.MenuData.set(TeamSetType.STORY_TASK, tempData1);
			this.firstMenu = [];
			for (var temp = 1; temp <= 11; temp++) {
				let typeData = this.MenuData.get(temp);
				if (typeData == null) continue;
				this.firstMenu.push(typeData[0]);
			}
			if( this.firstMenu.length == 0 ) this._viewUI.notarget_btn.visible = true;
			else this._viewUI.notarget_btn.visible = false;



		}
		/** 请求某个目标的数量和并且刷新队长和队员的数量请求 */
		private CRequestTeamMatchList(type?: number): void {
			let num = 5;  //取起始队伍id后面的num个数据
			// if(typeof(this.targetId) != "undefined")
			// {
			// 	RequesterProtocols._instance.c2s_CRequestTeamMatchList(this.targetId,0,num);
			// }else
			// {
			// 	RequesterProtocols._instance.c2s_CRequestTeamMatchList(0,0,num);
			// }
			if (type == 1) {/** 定时请求数据 */
				Laya.timer.loop(5000, this, this.CRequestMatchInfo, null, true);
				RequesterProtocols._instance.c2s_CRequestTeamMatchList(0, 0, num);
			} else {
				this.CRequestMatchInfo();
				RequesterProtocols._instance.c2s_CRequestTeamMatchList(this.targetId, 0, num);
			}




		}
		/** 请求队伍匹配和个人匹配数量 */
		private CRequestMatchInfo(): void {
			RequesterProtocols._instance.c2s_CRequestMatchInfo();
		}

		//发送协议
		private sendProto(): void {
			// RequesterProtocols._instance.c2s_CReqRoleInfo(1);//请求人物信息界面（主要是 几个积分以及大红大蓝的剩余量）1表示请求人物信息界面，2表示战斗结束
		}

		public show(): void {
			super.show();
			this.init();
			this.refreshFirstMenuData();
			this.CRequestTeamMatchList(1);
			this.CRequestMatchInfo();
			this.controUI();
			if (HudModel.getInstance().yindaoId == YinDaoEnum.ZUIDUI_YINDAO)
				this.richangYindao();
		}
		/**自动匹配引导 */
		public pipeiYindao(): void {
			var x1 = this._viewUI.zidongpipei_btn.x + this._viewUI.zidongpipei_btn.width;
			var y1 = this._viewUI.zidongpipei_btn.y;
			var x2 = x1 - 180;
			var y2 = y1 + 80;
			this.setAniPos(x2, y2);
			this.setTipPos(x1, y1);
			this.startYindao(YinDaoEnum.PIPEI_YINDAO_TIP);
			this.yindaoId = YinDaoEnum.PIPEI_YINDAO;
			HudModel.getInstance().yindaoId = YinDaoEnum.RESET_YINDAO;
		}
		/**点击日常副本引导 */
		public richangYindao(): void {
			var x1 = this._viewUI.firstMenu2_list.x + this._viewUI.firstMenu2_list.width;
			var y1 = this._viewUI.selectPanel.y + this._viewUI.firstMenu2_list.y;
			var x2 = x1 - 80;
			var y2 = y1 + 30;
			this.setAniPos(x2, y2);
			this.setTipPos(x1, y1);
			this.startYindao(0);
			this.yindaoId = YinDaoEnum.CHOOSE_RICHANG_YINDAO;
		}
		/**引导开始 */
		public startYindao(tipid: number): void {
			var tip = HudModel._instance.carroweffectData;
			this.onload();
			Laya.timer.loop(1000, this, this.moveImg);
			Laya.timer.loop(5000, this, this.closeAni);
			if (tipid != 0) {
				this._viewUI.yindaoTip_htm.text = tip[tipid].text;
				this._viewUI.yindaoTip_img.visible = true;
			}
			this._viewUI.addChild(this.ani);
			this._viewUI.addChild(this.dianImg);

		}
		/**设置引导提示位置 */
		public setTipPos(x: number, y: number) {
			this._viewUI.yindaoTip_img.x = x;
			this._viewUI.yindaoTip_img.y = y;
		}
		/**设置动画位置*/
		public setAniPos(x: number, y: number) {
			this.ani.x = x;
			this.ani.y = y;
			this.dianImg.x = x;
			this.dianImg.y = y;
		}
		/**关闭动画 */
		public closeAni(): void {
			this.ani.clear();
			Laya.timer.clear(this, this.closeAni);
			Laya.timer.clear(this, this.moveImg);
			this._viewUI.yindaoTip_img.visible = false;
			this.dianImg.visible = false;
			this.dianImg.mouseThrough = false;
		}
		/**播放动画 */
		public onload() {
			Laya.Animation.createFrames(this.anUrls("", 9), "yindao")
			this.ani.play(0, true, "yindao");
			this.ani.interval = 112;
			this.dianImg.skin = "common/ui/mainhud/dian.png";
			this.ani.mouseThrough = true;
			this.dianImg.mouseThrough = true;
		}
		/**移动手指图标 */
		public moveImg(): void {
			this.dianImg.visible = true;
			if (this.dianImg.y <= this.ani.y)
				Laya.Tween.to(this.dianImg, { x: this.ani.x + 25, y: this.ani.y + 25 }, 1000, null, Laya.Handler.create(this, function () { }), null, false);
			else
				Laya.Tween.to(this.dianImg, { x: this.ani.x - 5, y: this.ani.y - 5 }, 1000, null, Laya.Handler.create(this, function () { }), null, false);
		}
		public anUrls(aniName: string, length: number): any {
			var urls: any = []
			for (var index = 1; index <= length; index++) {
				urls.push("common/ui/yindao/" + aniName + index + ".png")
			}
			return urls
		}

		/** 初始化UI */
		private controUI(): void {
			// this._viewUI.match_image.visible = false;
			this.refreshSecondMenuData(this.currentSecondType);
			if (typeof (this.currentSecondSelectIndex) == "undefined" || this.currentSecondSelectIndex == -1) {/** 当前二级菜单未选中的情况下 */
				this._viewUI.zidongpipei_btn.visible = false;
			} else {
				this._viewUI.zidongpipei_btn.visible = true;
			}
			mainhud.models.HudProxy.getInstance().once(mainhud.models.UPDATA_TEAM_UI, this, this.autoMatch);
			// mainhud.models.HudProxy.getInstance().on(models.MATCH_EVENT,this,this.autoMatch);
		}
		/** 跳转目标副本
		 * @param type1 一级按钮类型
		 * @param type2 二级按钮类型
		 */
		public onshow(type1: number, type2?: number): void {
			switch (type1) {
				case TeamSetType.STORY_TASK:
					this.currentFirstSelectIndex = 0;
					break;
				case TeamSetType.DAILY_FUBEN:
					this.currentFirstSelectIndex = 1;
					break;
				case TeamSetType.SUPERIOR_FUBEN:
					this.currentFirstSelectIndex = 2;
					break;
				case TeamSetType.TIME_ACTIVITY:
					this.currentFirstSelectIndex = 3;
					break;
				case TeamSetType.FAMILY_ACTIVITY:
					this.currentFirstSelectIndex = 4;
					break;
				case TeamSetType.YUANGU_MOXIANG:
					this.currentFirstSelectIndex = 5;
					break;
				case TeamSetType.LEVEL_TASK:
					this.currentFirstSelectIndex = 6;
					break;
				case TeamSetType.SHANGGU_SHEN:
					this.currentFirstSelectIndex = 7;
					break;
				case TeamSetType.DiroBS:
					this.currentFirstSelectIndex = 8;
					break;
				case TeamSetType.ZHANGJIE_TASK:
					this.currentFirstSelectIndex = 9;
					break;
				default:
					break;
			}
			if (type2) {
				this.currentSecondSelectIndex = type2;
			}
			let _firstMenu_btn: Laya.Button = this._viewUI.firstMenu2_list.getCell(this.currentFirstSelectIndex).getChildByName("firstMenu_btn") as Laya.Button;
			let _type = this.firstMenu[this.currentFirstSelectIndex].type;
			let _requirement = this.firstMenu[this.currentFirstSelectIndex].requirement;
			let _opTime = this.firstMenu[this.currentFirstSelectIndex].opentime;
			this.refreshSecondMenuData(_type, _requirement, _opTime, _firstMenu_btn, this.currentFirstSelectIndex);
			this.show();
		}


		public hide(): void {
			if (LoginModel.getInstance().CommonPage != "") {
				ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
				LoginModel.getInstance().CommonPage = "";
			}
			team.models.TeamProxy.getInstance().off(team.models.OPEN_TEAM_EVENT, this, this.openTeam);
			// mainhud.models.HudProxy.getInstance().off(mainhud.models.UPDATA_TEAM_UI,this,this.autoMatch);
			// mainhud.models.HudProxy.getInstance().off(models.MATCH_EVENT,this,this.autoMatch);			
			Laya.timer.clear(this, this.CRequestMatchInfo);
			super.hide();
		}

		public getView(): Sprite {
			return this._viewUI;
		}
		protected onShow(event: Object): void {
			this.show();
		}

		public showChenwei(): void {
			// this._RoleChenweiMediator.show();
		}

		public showTip(): void {
			// this._RoleTipMediator.show();
		}

		public showJiuguan(): void {
			// this._RoleShopMediator.show();
		}
		public showJifen(): void {
			// this._RoleJiFenDuiHuanMediator.show();
		}
	}
}