
module game.modules.roleinfo {
	export class RoleHuoliMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.RoleHuoliUI;
		/**活力消耗方式 */
		private arr: Array<any>;
		/**活力消耗 */
		private costArr: Array<any>;
		/**活力消耗名 */
		private costNameArr: Array<any>;
		/**按钮名 */
		private btnNameArr: Array<any>;
		/**技能格信息表 */
		private skillGridObj: Object;
		/**j技能显示表 */
		private skillObj: Object;
		private myData: createrole.models.RoleDetailVo;
		/** 图片路径 */
		private skinArr:Array<string> = [];
		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.RoleHuoliUI();
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this.isCenter = true;
			this._app = app;			
			this.registerEvent();
			this.eventListener();
			this.skinArr = ["common/icon/item/20101.png", "common/icon/item/20042.png", "common/icon/skill/233.png"];//第一个是打工图片路径，第二个是制作附魔卷轴的图片路径，第三个是生活技能的图片路径（该数据写死的）
		}
		/**初始化 */
		public initialize(): void {
			this.skillObj = game.modules.skill.models.SkillModel.getInstance().CSchoolSkillitemBinDic;
			this.skillGridObj = game.modules.skill.models.SkillModel.getInstance().AcupointInfoBinDic;
			var skillGridId = game.modules.skill.models.SkillModel.getInstance().EnhancementSkillId;//附魔技能格id
			//如果skillGridId为0，说明没学附魔技能
			if (skillGridId != 0) {
				var skillid = this.skillGridObj[skillGridId]["pointToSkillList"][0];//附魔技能id
				var levelNum = game.modules.skill.models.SkillModel.getInstance().makeEnhancementLevel;//附魔技能等级
				var cost = Math.floor(levelNum * this.skillObj[skillid]["paramA"] + this.skillObj[skillid]["paramB"]);//消耗数值公式：等级*paramA+paramB
				var str = this.skillObj[skillid]["costA"];
				this.costArr = [RoleEnum.WORK_COST, cost, ""];
			} else {
				this.costArr = [RoleEnum.WORK_COST, RoleEnum.NO_SKILL_COST, ""];
			}
			this.costNameArr = [models.RoleInfoModel.chineseStr.xiaohao_huoli, models.RoleInfoModel.chineseStr.xiaohao_huoli, ""];
			this.arr = [models.RoleInfoModel.chineseStr.dagong, models.RoleInfoModel.chineseStr.fumo, models.RoleInfoModel.chineseStr.life_skill];
			this.btnNameArr = [models.RoleInfoModel.chineseStr.dagong_btn, models.RoleInfoModel.chineseStr.zhizuo_btn, models.RoleInfoModel.chineseStr.zhizuo_btn];
			this.myData = LoginModel.getInstance().roleDetail;
			this._viewUI.huoliNum_tet.text = this.myData.energy + "/" + this.myData.enlimit;//初始化活力
		}
		/**注册点击监听 */
		public registerEvent(): void {
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
		}
		/**注册事件监听 */
		public eventListener(): void {
			mainhud.models.HudProxy.getInstance().on(mainhud.models.SRefreshRoleData_EVENT, this, this.onRefreshRoleData);
			models.RoleInfoProxy.getInstance().on(models.SLiveSkillMakeFarm_EVENT, this, this.onLiveSkillMakeFarm);
			skill.models.SkillProxy.getInstance().on(skill.models.EnergyNotEnough_EVENT, this, this.showEnergyNotEnoughTips);
		}
		/** 显示活力不足的提示信息 */
		private showEnergyNotEnoughTips():void{
			let _tipsMsg:string = ChatModel.getInstance().chatMessageTips[143432]["msg"];
			_tipsMsg = _tipsMsg.replace("$parameter1$", "100");
			this.show_distipsmsg(_tipsMsg);
		}
		/**打工赚钱返回
		 * @param addgold 打工所赚到的金币数量
		 */
		public onLiveSkillMakeFarm(addgold: number): void {
			let _tipsMsg:string = ChatModel.getInstance().chatMessageTips[160050]["msg"];
			_tipsMsg = _tipsMsg.replace("$parameter1$", addgold.toString());
			this.show_distipsmsg(_tipsMsg);
		}
		/** 显示飘窗 */
		private show_distipsmsg(msg:string):void{
			let _distipsmsg = new commonUI.DisappearMessageTipsMediator(this._app);
			_distipsmsg.onShow(msg);
		}
		/**刷新人物属性 */
		public onRefreshRoleData(e: any): void {
			if (HudModel.getInstance().enlimitNum != 0)
				this._viewUI.huoliNum_tet.text = HudModel.getInstance().energyNum + "/" + HudModel.getInstance().enlimitNum;//活力值
		}

		public show(): void {
			this._viewUI.tip_btn.on(LEvent.CLICK, this, this.showTips);
			this.initialize();
			super.show();
			this.getListData();
		}
		/** 显示出活力相关方面tips信息 */
		private showTips(): void {
			let tipsParame = new Laya.Dictionary();
			tipsParame.set("posY", 883);
			tipsParame.set("title", 10032);
			tipsParame.set("contentId", 10033);
			//参数为3+0.09*玩家等级
			let _roleLevel = HudModel.getInstance().levelNum;
			tipsParame.set("parame", [Math.round(3 + 0.09 * _roleLevel)]);
			let _tipsModule = new tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, tipsParame);
		}
		public hide(): void {
			this._viewUI.tip_btn.off(LEvent.CLICK, this, this.showTips);
			super.hide();
			models.RoleInfoModel.getInstance().currentKey = RoleEnum.SHUXING_KEY;
			ModuleManager.show(ModuleNames.ROLE_Info, this._app);
			if (LoginModel.getInstance().CommonPage != "") {
				ModuleManager.hide(ModuleNames.ROLE_Info);
				skill.models.SkillModel.getInstance().currenTabNum = SkillEnum.LIFE_KEY;//切换到生活技能界面
				ModuleManager.show(ModuleNames.SKILL, this._app);
				LoginModel.getInstance().CommonPage = ModuleNames.ROLE_Info;
			}

		}

		public getView(): Sprite {
			return this._viewUI;
		}

		/**初始化打工列表 */
		public getListData(): void {
			this._viewUI.dagong_list.vScrollBarSkin = "";
			this._viewUI.dagong_list.scrollBar.elasticBackTime = 200;
			this._viewUI.dagong_list.scrollBar.elasticDistance = 50;
			this._viewUI.dagong_list.repeatY = this.arr.length;
			this._viewUI.dagong_list.array = this.arr;
			this._viewUI.dagong_list.renderHandler = new Handler(this, this.onRender);
			this._viewUI.dagong_list.selectHandler = new Handler(this, this.onSelect);
			this._viewUI.dagong_list.selectedIndex = -1;
		}
		/**渲染打工列表 */
		public onRender(cell: Laya.Box, index: number): void {
			if (index > this.arr.length) return;
			var nameLab: Laya.Label = cell.getChildByName("typeName_lab") as Laya.Label;
			var costNumLab: Laya.Label = cell.getChildByName("costNum_lab") as Laya.Label;
			var costNameLab: Laya.Label = cell.getChildByName("costName_lab") as Laya.Label;
			var dagongBtn: Laya.Button = cell.getChildByName("dagong_btn") as Laya.Button;
			let skin_img: Laya.Image = cell.getChildByName("skin_img") as Laya.Image;
			skin_img.skin = this.skinArr[index];
			nameLab.changeText(this.arr[index]);
			costNameLab.changeText(this.costNameArr[index]);
			costNumLab.text = this.costArr[index];
			dagongBtn.label = this.btnNameArr[index];
		}
		/**处理打工列表点击 */
		public onSelect(index: number): void {
			if (index != -1) {
				//根据选中列表项下标处理
				switch (index) {
					case 0:
						RequesterProtocols._instance.c2s_CLiveSkillMakeFarm();//打工
						break;
					case 1:
						this.judgeSkill();						
						break;
					case 2:
						//跳转到生活技能界面
						LoginModel.getInstance().CommonPage = ModuleNames.SKILL;
						this.hide();
						break;
				}
				this._viewUI.dagong_list.selectedIndex = -1;
			}
		}
		/** 判断附魔的技能
		 * @describe 学了就发请求，没学就进行飘窗提示
		 */
		private judgeSkill():void{
			let _skillArr = skill.models.SkillModel.getInstance().skillArr;
			let _SchoolSkillitemBaseVo = _skillArr[6];
			//附魔技能id
			let _skillId = _SchoolSkillitemBaseVo.id;
			let _skillLevelDic = skill.models.SkillModel.getInstance().skillLevelDic;
			if(_skillLevelDic.get(_skillId)){
				RequesterProtocols._instance.c2s_CLiveSkillMakeEnhancement();//制作附魔卷轴（跟战斗技能中的一致）
			}
			else{
				let _tipsMsg:string = ChatModel.getInstance().chatMessageTips[150095]["msg"];
				let _skillName = _SchoolSkillitemBaseVo.skillname;
				if(!_skillName){
					console.log("-------------------------获取不到技能名字！------------------------");
					return;
				}
				_tipsMsg = _tipsMsg.replace("$parameter1$", _skillName);
				this.show_distipsmsg(_tipsMsg);
			}
		}
	}
}