module game.modules.family {
	/** 加入帮派界面 (还没有公会) */
	export class FamilyJoinViewMediator extends game.modules.ModuleMediator {
		private _viewUI: ui.common.FamilyJiaRuUI;//ui.common.CreateRoleUI;
		private _FamilyCreatViewMediator: FamilyCreatViewMediator;
		private _TipsMessageMediator: game.modules.tips.TipsMessageMediator;
		private FriendSystemModule: game.modules.friend.FriendSystemModule;
		private DisappearMessageTipsMediator: game.modules.commonUI.DisappearMessageTipsMediator;
		/**客户端信息提示表 */
		chatMessageTips = game.modules.chat.models.ChatModel._instance.chatMessageTips;
		/**当前列表点击的按钮 */
		familyBtn: Laya.Box = null;
		/** 当前列表点击的按钮被点击前的皮肤路径 */
		private oldSkin: string = "";
		/**选择的取消申请公会id */
		selectClanid = -1;
		/** 申请公会列表页数 */
		private currPage: number = 1;//默认申请第一页
		/** 上一次数据刷新时，公会信息列表长度 */
		private clanListLength: number = 0;
		/** 数字小键盘 */
		public _xiaoJianPanMediator = new game.modules.tips.XiaoJianPanMediator(this._viewUI);
		/** 搜索时的帮派编号 */
		public bianHao: number = 0;
		/** 是否是打开小键盘后的第一次点击，是的话所有点击任意按键清除上一次的内容 */
		public isfirstClick: boolean;
		/** 是否更新了下一页的公会列表数据 */
		private isUpdateClanListData: boolean = false;
		/** 帮派列表当前被选中的帮派帮主id */
		private currClanMasterId:number = -1;

		constructor(app: AppBase) {
			super();
			this.uiLayer = app.uiRoot.general;
			this._viewUI = new ui.common.FamilyJiaRuUI();
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.clickCloseBtn);
			this._viewUI.chaZhao_btn.on(LEvent.MOUSE_DOWN, this, this.searchClan);    //查找公会
			this._viewUI.lianXiBangZhu_btn.on(LEvent.MOUSE_DOWN, this, this.onlianXiBangZhu);  //联系帮主
			this._viewUI.xiaoChu_lab.on(LEvent.MOUSE_DOWN, this, this.onXiaochu);
			this._viewUI.familyBuild_btn.on(LEvent.MOUSE_DOWN, this, this.familyBuild);
			models.FamilyProxy._instance.on(models.SOpenClanList, this, this.showFamily);
			models.FamilyProxy._instance.on(models.SApplyClanList, this, this.showFamily);
			models.FamilyProxy._instance.on(models.SClanAim, this, this.showClanAim);
			game.modules.tips.models.TipsProxy.getInstance().on(game.modules.tips.models.TIPS_ON_OK, this, this.onApplyClan);   //取消申请
			models.FamilyProxy._instance.on(models.SSearchClan, this, this.searchClanResult);   //搜索公会结果
			models.FamilyProxy._instance.on(models.CloseJoinView, this, this.hide);
			this._xiaoJianPanMediator = new game.modules.tips.XiaoJianPanMediator(this._viewUI);
			this._viewUI.familyBianHao_lab.on(LEvent.CLICK, this, () => {
				this.isfirstClick = true;
				this._xiaoJianPanMediator.show();
				this._xiaoJianPanMediator.getView().x = 48;
				this._xiaoJianPanMediator.getView().y = 446;
				game.modules.tips.models.TipsProxy.getInstance().on(game.modules.tips.models.ON_KRYBOARD, this, this.getKeyboardBtns);
			});

		}

		/**
		 * 显示所有帮派详细信息
		 */
		public showFamily() {
			var family = this._viewUI.family_list;
			var clanlist = models.FamilyModel.getInstance().clanlist;
			var clanlistKeys = clanlist.keys;
			if (clanlist.get(clanlistKeys[clanlistKeys.length - 1]) != undefined && clanlist.get(clanlistKeys[clanlistKeys.length - 1]).length != 0) {
				this.isUpdateClanListData = true;
			}
			if (clanlist.get(clanlistKeys[clanlistKeys.length - 1]) != undefined && clanlist.get(clanlistKeys[clanlistKeys.length - 1]).length == 0) {//如果最新一页的的帮派列表数据为空，则最新一页的页数的上一页，就代表是最后一页
				this.currPage = clanlistKeys[clanlistKeys.length - 2];
			}
			/** 临时存放公会列表信息数据 */
			var tempClanList: Array<any> = [];
			for (var i = 0; i < clanlistKeys.length; i++) {
				if (clanlist.get(clanlistKeys[i]) != undefined) {
					tempClanList = this.combineData(tempClanList, clanlist.get(clanlistKeys[i]));
				}
			}
			if (tempClanList.length != 0) {//如果存放帮派列表数据的数组长度不为零
				family.visible = true;
				this.showFamilyList(tempClanList);//就显示出列表
			} else {
				family.visible = false;
			}
		}
		/** 
         * 把最新一页的公会列表数据和上一页的公会列表数据结合
         */
		private combineData(lastData: any, newData: any): Array<any> {
			for (let index = 0; index < newData.length; index++) {
				lastData.push(newData[index]);
			}
			return lastData;
		}
		/**
         * 锁定公会信息列表视角
         * @describe 该函数方法体中的10是指帮派信息列表每一页10个数据
         */
		private onScrollTo(index: number): void {
			if (this._viewUI.family_list.array.length < 10) return;
			if (index != this._viewUI.family_list.array.length - 1) return;
			if (this._viewUI.family_list.array.length == 10) {
				this.clanListLength = 10;
				return;
			}
			//判断列表长度是否改变
			if (this._viewUI.family_list.array.length > this.clanListLength) {
				this._viewUI.family_list.scrollTo(this.clanListLength - 1);
			}
			this.clanListLength = this._viewUI.family_list.array.length;
		}

		/**显示公会列表 */
		public showFamilyList(list) {
			var applyClanList = models.FamilyModel.getInstance().applyClanList;   //申请过的列表
			var applyClanListKeys = applyClanList.keys;
			var applyList = applyClanList.get(applyClanListKeys[0]);  //申请过的列表
			//SaleModel._instance.showList(this._viewUI.family_list, list);
			this._viewUI.family_list.vScrollBarSkin = "";
			this._viewUI.family_list.scrollBar.elasticBackTime = 200;
			this._viewUI.family_list.scrollBar.elasticDistance = 50;
			this._viewUI.family_list.array = list;
			if (this._viewUI.family_list.array.length <= 10) {
				this._viewUI.family_list.repeatY = 10;
			}
			else {
				this._viewUI.family_list.repeatY = this._viewUI.family_list.array.length;
			}
			this._viewUI.family_list.spaceY = 10;
			this._viewUI.family_list.renderHandler = new Handler(this, this.FamilyRender, [list, applyList]);
			this._viewUI.family_list.selectHandler = new Handler(this, this.FamilySelect, [list]);
			this._viewUI.family_list.scrollBar.changeHandler = new Handler(this, this.onListScrollBarChange);
		}
		/**
		 * 判断滚动条位置是否到底部
		 */
		private onListScrollBarChange(value: number): void {
			if (value == this._viewUI.family_list.scrollBar.max) {//如果公会信息列表拉到底部
				if (this.isUpdateClanListData) {
					this.isUpdateClanListData = false;
					this.COpenClanList(this.currPage++);//申请新的数据
				}
			}
			if (value == this._viewUI.family_list.scrollBar.min) {
				this._viewUI.family_list.scrollTo(0);
			}
		}

		public FamilyRender(list, applyList, cell: Box, index: number) {
			var id = list[index].index;   //序号
			var clanname = list[index].clanname;  //公会名称
			var membernum = list[index].membernum;  //公会人数
			var clanlevel = list[index].clanlevel;    //公会等级
			var clanmastername = list[index].clanmastername;  //会长名字
			var oldclanname = list[index].oldclanname;   //公会曾用名
			var clanid = list[index].clanid;  //公会key
			var familyNolab = cell.getChildByName("familyNo_lab") as Label;
			familyNolab.text = id;
			var familyNamelab = cell.getChildByName("familyName_lab") as Label;
			familyNamelab.text = clanname;
			var familyLvlab = cell.getChildByName("familyLv_lab") as Label;
			familyLvlab.text = clanlevel;
			var familyNumberlab = cell.getChildByName("familyNumber_lab") as Label;
			familyNumberlab.text = membernum + "/" + "100";   //公会的总的人数 需要获取
			var familyBangZhulab = cell.getChildByName("familyBangZhu_lab") as Label;
			familyBangZhulab.text = clanmastername;
			var selectrolebtn = cell.getChildByName("selectrole_btn") as Laya.Button;
			if(cell == this.familyBtn) {
				selectrolebtn.skin = "common/ui/tongyong/common_list_3textbg_dwn.png";
			}
			else if (index % 2 == 0){				
				selectrolebtn.skin = "common/ui/tongyong/common_list_3textbg2.png";
			}
			else {
				selectrolebtn.skin = "common/ui/tongyong/common_xuanzhongkuang.png";
			}
			selectrolebtn.on(LEvent.MOUSE_UP, this, this.onSelectrolebtn, [cell, index]);
			var isApplyClanbtn = cell.getChildByName("isApplyClan_btn") as Laya.Button;
			isApplyClanbtn.visible = false;
			if (applyList != undefined) {  //是否有人申请
				for (var i = 0; i < applyList.length; i++) {
					var clankey = applyList[i].clankey;  //公会key
					var applystate = applyList[i].applystate;  //申请状态 0取消  1申请中
					if (clanid == clankey && applystate == 1) {
						isApplyClanbtn.visible = true;
					}
				}
			}
			isApplyClanbtn.on(LEvent.MOUSE_DOWN, this, this.onisApplyClanbtn, [clanid, clanname]);
			this.onScrollTo(index);
		}

		/**点击效果 */
		public onSelectrolebtn(cell, index) {
			var selectrolebtn = cell.getChildByName("selectrole_btn") as Laya.Button;
			this.oldSkin = selectrolebtn.skin;
			selectrolebtn.selected = true;
			if (this.familyBtn == null) {
				this.familyBtn = cell;
				return;
			}
			if (this.familyBtn != cell) {
				var oldFamilyBtn = this.familyBtn.getChildByName("selectrole_btn") as Laya.Button;
				oldFamilyBtn.selected = false;
				oldFamilyBtn.skin = this.oldSkin;
				this.familyBtn = cell;
			}

		}

		/**公会列表选择 */
		public FamilySelect(list, index: number) {
			if (this._viewUI.family_list.selectedIndex != -1) {
				var clanid = list[index].clanid;   //公会id
				this.CRequestClanAim(clanid);
				this._viewUI.familyApply_btn.disabled = false;
				var clanmasterid = list[index].clanmasterid; //会长id
				this.currClanMasterId = clanmasterid;
				var roleid = game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid;
				if (roleid != clanmasterid) {
					this._viewUI.lianXiBangZhu_btn.disabled = false;
				} else {
					this._viewUI.lianXiBangZhu_btn.disabled = true;
				}
				this._viewUI.familyApply_btn.on(LEvent.MOUSE_DOWN, this, this.applyClan, [clanid]);
				this._viewUI.family_list.selectedIndex = -1;
			}
		}

		/**
		 * 申请入会
		 */
		public applyClan(clanid) {
			this.CApplyClan(clanid);
		}

        /**
		 * 取消申请入会提示
		 */
		public onisApplyClanbtn(clanid: number, clanname: string) {
			this.selectClanid = clanid;
			var parame: Dictionary = new Dictionary();
			parame.set("contentId", 150138);
			var _paramArray: Array<string> = [clanname];
			parame.set("parame", _paramArray);
			this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
			this._TipsMessageMediator.show();
			this._TipsMessageMediator.showContent(parame);
		}

        /**
		 * 确定取消申请入会
		 */
		public onApplyClan() {
			this.CancelApplyClan(this.selectClanid);
		}

		/**
		 * 显示公会宗旨
		 */
		public showClanAim() {
			this._viewUI.aim_box.visible = true;
			var clanid = models.FamilyModel.getInstance().clanid;
			var clanaim = models.FamilyModel.getInstance().clanaim;
			var oldclanname = models.FamilyModel.getInstance().oldclanname;
			this._viewUI.familyZongZhi_lab.text = clanaim;
			this._viewUI.familyOldName_lab.text = oldclanname;

		}
		/** 小键盘按钮监听 */
		public getKeyboardBtns(index: number) {
			if (index == 0) {//数字键0
				if (this._viewUI.familyBianHao_lab.text == "0" || this._viewUI.familyBianHao_lab.text == "点击这里输入帮派编号" || this.isfirstClick) {
					this.bianHao = 0;
				} else {
					this.bianHao *= 10;
				}
			} else if (index > 0) {//数字键1-9
				if (this._viewUI.familyBianHao_lab.text == "0" || this._viewUI.familyBianHao_lab.text == "点击这里输入帮派编号" || this.isfirstClick) {
					this.bianHao = index;
				} else {
					this.bianHao += index;
				}
			} else if (index == -1) {//回退键
				if (this._viewUI.familyBianHao_lab.text == "0" || this._viewUI.familyBianHao_lab.text == "点击这里输入帮派编号" || this.isfirstClick) {
					this.bianHao = 0;
				} else {
					this.bianHao = Math.floor(this.bianHao / 10);
				}
			}
			if (index == -2 && this.isfirstClick && this._viewUI.familyBianHao_lab.text == "点击这里输入帮派编号") {
				return;
			}
			this.isfirstClick = false;
			this._viewUI.familyBianHao_lab.text = this.bianHao + "";
		}
        /**
		 * 查找公会
		 */
		public searchClan() {
			var familyBianHao_lab = this._viewUI.familyBianHao_lab.text;
			if (familyBianHao_lab != "点击这里输入帮派编号") {
				var clanid = parseInt(familyBianHao_lab);
				this.CSearchClan(clanid);
				this._viewUI.xiaoChu_lab.visible = true;
			} else {
				this.DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
				this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[160312].msg);
			}
		}

		/**
		 * 公会搜索结果显示
		 */
		public searchClanResult() {
			var searchClanResult = models.FamilyModel.getInstance().searchClanlist;
			if (searchClanResult.length > 0) {
				this._viewUI.family_list.visible = true;
				this._viewUI.nullFamily_box.visible = false;
				this.showFamilyList(searchClanResult);
			} else {
				this._viewUI.nullFamily_box.visible = true;
				this._viewUI.family_list.visible = false;
			}
		}

        /**
		 * 清除搜索文字
		 */
		public onXiaochu() {
			this._viewUI.familyBianHao_lab.text = "点击这里输入帮派编号";
			this._viewUI.xiaoChu_lab.visible = false;
			this._viewUI.nullFamily_box.visible = false;
			this.showFamily();
		}


		/******************************************************************************************** */

        /**
		 * 客户端请求公会列表：没有公会
		 * @param currpage 当前页
		 */
		public COpenClanList(currpage) {
			RequesterProtocols._instance.c2s_COpenClanList(currpage);
		}


		/**创建公会 */
		public familyBuild() {
			this._FamilyCreatViewMediator = new FamilyCreatViewMediator(this._app);
			this.hide();
			game.modules.createrole.models.LoginModel.getInstance().CommonPage = "family";
			this._FamilyCreatViewMediator.show();

		}

        /**
		 * 客户端请求公会宗旨
		 * @param clanid 公会id
		 */
		public CRequestClanAim(clanid) {
			RequesterProtocols._instance.c2s_CRequestClanAim(clanid);
		}

		/**
		 * 申请入会请求
		 * @param clanid 公会id
		 */
		public CApplyClan(clanid) {
			models.FamilyProxy._instance.once(models.SOpenClan, this, this.showClanInfo);
			RequesterProtocols._instance.c2s_CApplyClan(clanid);
		}

		/** 显示公会信息 */
		private showClanInfo(): void {
			if (this._viewUI.visible) {
				this.hide();
				ModuleManager.show(ModuleNames.haveFamily, this._app);
			}
		}

		/**
		 * 取消公会申请
		 * @param clanid 
		 */
		public CancelApplyClan(clanid) {
			RequesterProtocols._instance.c2s_CCancelApplyClan(clanid);
		}

        /**
		 * 搜索公会
		 * @param clanid 
		 */
		public CSearchClan(clanid) {
			RequesterProtocols._instance.c2s_CSearchClan(clanid);
		}

		/**联系帮主 */
		public onlianXiBangZhu() {
			this.hide();
			if(this.currClanMasterId != -1){
				RequesterProtocols._instance.c2s_CRequestUpdateRoleInfo(this.currClanMasterId);
			}
			ModuleManager.show(ModuleNames.FRIEND,this._app);
		}


		public show() {
			this.COpenClanList(this.currPage);
			this._viewUI.aim_box.visible = false;
			this._viewUI.familyApply_btn.disabled = true;
			this._viewUI.lianXiBangZhu_btn.disabled = true;
			this._viewUI.nullFamily_box.visible = false;
			this._viewUI.xiaoChu_lab.visible = false;
			if (this.familyBtn != null) {
				var oldFamilyBtn = this.familyBtn.getChildByName("selectrole_btn") as Laya.Button;
				oldFamilyBtn.selected = false;
				this.familyBtn = null;
			}
			var clankey = game.modules.mainhud.models.HudModel._instance.clankey;
			if (clankey > 0) {
				this.hideBtn();
			}
			else{
				this.reShowBtn();
			}
			super.show();
			mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
		}
		/** 当没有帮派的情况下，重新显现部分按钮 */
		private reShowBtn():void{
			this._viewUI.familyApply_btn.visible = true;
			this._viewUI.familyBuild_btn.visible = true;
		}
		/** 有帮派的情况下，隐藏部分按钮 */
		private hideBtn() {
			this._viewUI.familyApply_btn.visible = false;
			this._viewUI.familyBuild_btn.visible = false;
		}

		public clickCloseBtn(): void {
			mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
			if (LoginModel.getInstance().CommonPage != "") {
				models.FamilyModel.getInstance().clanCurrenTabNum = 1;
				ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
				LoginModel.getInstance().CommonPage = "";
			}
			this.hide();
		}
		public hide(): void {
			this.currPage = 1;
			this.clanListLength = 0;
			super.hide();
			if (this.familyBtn != null) {
				var oldFamilyBtn = this.familyBtn.getChildByName("selectrole_btn") as Laya.Button;
				oldFamilyBtn.selected = false;
				oldFamilyBtn.skin = this.oldSkin;
			}
		}

		public getView(): Sprite {
			return this._viewUI;
		}
	}
}