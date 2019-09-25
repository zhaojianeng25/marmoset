
module game.modules.commonUI {
	/** 选择宠物事件 */
	export const CALL_PET: string = "selectBackPetEvent";
	/** 宠物战斗召唤 或者 选择要被重置的神兽 */
	export class PetBattleChangeMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.PetBattleChangeUI;
		/**宠物品质*/
		public colour: Array<string> = ["baikuang.png", "lvkuang.png", "lankuang.png", "zikuang.png", "jinkuang.png"];
		/**程序内字符串表 */
		cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
		/**所有能召唤的宠物KEY*/
		public petkey: Array<number>
		/**上次选择宠物*/
		public lastbox: Box;
		/**当前选择宠物 */
		public currentselect: number;
		/** 当前召唤次数 */
		private calltime: number = 0;
		/** 召唤次数上限 */
		private upLimittime: number = 0;
		/** 存放人物身上持有的神兽数据(key:神兽对应的宠物key， value:神兽的数据) */
		private _shenshouDic: Laya.Dictionary;
		/** 宠物数据配置表 */
		private _petAttrData: Object;
		/** 造型配置表 */
		private _shapeCpnfig: Object;
		/** 宠物技能显示配置表 */
		private _petSkillConfigData: Object;
		/** 被选中的按钮 */
		private selectedBtn: Laya.Button;
		/** 神兽列表被选中的索引 */
		private shenshouSelectedIndex: number = -1;
		/** 某只神兽的技能 */
		private shenshouSkillsArr: Array<pet.models.PetSkillVo>;


		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.PetBattleChangeUI();
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide)
			this._viewUI.zhaohuan_btn.on(LEvent.MOUSE_DOWN, this, this.selectchuzhan);

			this._petAttrData = PetModel.getInstance().petCPetAttrData;//宠物数据表
			this._shapeCpnfig = createrole.models.LoginModel.getInstance().cnpcShapeInfo;//造型配置表
			this._petSkillConfigData = PetModel.getInstance().petSkillConfigData;//宠物技能显示配置表
		}
		/** 
		 * @param calltime 当前宠物召唤次数
		 */
		public show(calltime?: Laya.Dictionary) {
			super.show();
			this.show_and_hide_UI(false);
			var data: Array<any> = []
			this.petkey = []
			this._viewUI.zhaohuan_btn.gray = true;
			this._viewUI.zhaohuan_btn.mouseEnabled = false;
			let currentfightkey = game.modules.createrole.models.LoginModel.getInstance().roleDetail.petIndex;
			let callpet = this.setCallTimes(calltime);
			for (let key in PetModel.getInstance().pets.keys) {
				let petinfo: game.modules.pet.models.PetInfoVo = PetModel._instance.pets.get(PetModel._instance.pets.keys[key])
				if (petinfo.key == currentfightkey || callpet.get(petinfo.key) != null)	//是否是已出战宠物
					continue;
				let allpetbase: PetCPetAttrBaseVo = this._petAttrData[petinfo.id];
				let icondata: CNpcShapeBaseVo = this._shapeCpnfig[allpetbase.modelid] as CNpcShapeBaseVo;
				data.push({ petname_lab: petinfo.name, petlv_lab: petinfo.level + this.cstringResConfigData[3].msg, coloricon_img: "common/ui/tongyong/" + this.colour[allpetbase.quality - 1], icon_img: "common/icon/avatarpet/" + icondata.littleheadID + ".png", pet_id: petinfo.id });
				this.petkey.push(petinfo.key)

			}
			this._viewUI.pet_list.array = data
			this._viewUI.pet_list.repeatY = data.length
			this._viewUI.pet_list.vScrollBarSkin = ""
			this._viewUI.pet_list.scrollBar.elasticDistance = 200
			this._viewUI.pet_list.scrollBar.elasticBackTime = 100
			this._viewUI.pet_list.renderHandler = new Laya.Handler(this, this.initbtn)
		}
		/**初始化响应事件*/
		public initbtn(cell: Box, index: number) {
			let btn: Button = cell.getChildByName("petselect_btn") as Button
			let icon_img = cell.getChildByName("icon_img") as Laya.Image;
			icon_img.on(LEvent.CLICK, this, this.showPetDetail, [index]);
			btn.on(LEvent.MOUSE_DOWN, this, this.selectpet, [cell, index])
		}
		/** 点击显示宠物详情 */
		private showPetDetail(index: number): void {
			let _petId = this._viewUI.pet_list.array[index].pet_id;
			let _petTips = new game.modules.commonUI.PetMessageMediator(_petId, this._app, true);
			_petTips.show();
			//  _petTips.once(commonUI.CLOSE_PET_TIPS, this, this.showdetail);
		}
		/**选择宠物 */
		public selectpet(cell: Box, index: number) {
			if (this.lastbox) {//是否多次选择
				let lastbtn: Button = this.lastbox.getChildByName("petselect_btn") as Button
				lastbtn.selected = false
			}
			let btn: Button = cell.getChildByName("petselect_btn") as Button
			btn.selected = true
			this.lastbox = cell
			this.currentselect = index
			this._viewUI.zhaohuan_btn.gray = false;
			this._viewUI.zhaohuan_btn.mouseEnabled = true
		}
		/**选择召唤*/
		public selectchuzhan() {
			console.log(this.petkey[this.currentselect]);
			if (this.calltime < this.upLimittime) {
				this.event(CALL_PET, this.petkey[this.currentselect]);
				this.hide();
			} else {
				let param = [this.upLimittime];
				let prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.COMBAT_ASSISTANCE_UPLIMIT, param);
				let disappearTipsMessage = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
				disappearTipsMessage.onShow(prompt);
			}

		}
		/** 设置当前的召唤次数*/
		private setCallTimes(callPet: Laya.Dictionary): Dictionary {
			let roleLevel = HudModel.getInstance().levelNum;
			let upLimit;//= parseInt(((roleLevel % 100)/10).toString()); //计算十位数
			/** 策划给的规则是1-50级上限2只,60-79上限3只,80-99级4只 */
			if (roleLevel < 60) {
				upLimit = 2;
			} else if (roleLevel < 80) {
				upLimit = 3;
			} else if (roleLevel < 100) {
				upLimit = 4;
			}
			if (callPet.keys.length <= 1) {
				let callPets = LocalStorage.getJSON(LoginModel.getInstance().roleDetail.roleid + "_callPetTimes");
				if (callPets && callPets instanceof Object) {
					for (var _index = 0; _index < callPets._keys.length; _index++) {
						callPet.set(callPets._keys[_index], callPets._values[_index])
					}
				}
			}
			this.calltime = callPet.keys.length;
			this.upLimittime = upLimit;
			this._viewUI.count_lab.text = (this.calltime + " / " + upLimit);
			return callPet;
		}
		public hide() {
			super.hide();
			this.shenshouSelectedIndex = -1;
			this.selectedBtn = undefined;
			this._viewUI.reset_btn.off(LEvent.CLICK, this, this.resetShenShou);
		}
		public getView(): Sprite {
			return this._viewUI;
		}

		/** 选择要被重置的神兽 */
		public onShow(): void {
			if (this.checkHaveShenShou()) {
				return;
			}
			super.show();
			this.show_and_hide_UI(true);
			this.shenShouLstInt();
			this._viewUI.shenShou_lst.selectedIndex = 0;//默认选中第一位神兽要被重置
			this._viewUI.reset_btn.on(LEvent.CLICK, this, this.resetShenShou);
		}
		/** 重置神兽 */
		private resetShenShou(): void {
			let _PetChooseMediator = new commonUI.PetChooseMediator(this._app);
			let _shenShouId = this._shenshouDic.get(this._shenshouDic.keys[this.shenshouSelectedIndex]).id;
			_PetChooseMediator.onShow(_shenShouId, this._shenshouDic.keys[this.shenshouSelectedIndex]);
			this.hide();
		}
		/** 神兽列表初始化 */
		private shenShouLstInt(): void {
			this._viewUI.shenShou_lst.vScrollBarSkin = "";
			this._viewUI.shenShou_lst.scrollBar.elasticBackTime = 100;
			this._viewUI.shenShou_lst.scrollBar.elasticDistance = 100;
			this._viewUI.shenShou_lst.array = this._shenshouDic.keys;
			this._viewUI.shenShou_lst.renderHandler = new Laya.Handler(this, this.shenShouLstRend);
			this._viewUI.shenShou_lst.selectHandler = new Laya.Handler(this, this.shenShouLstSelect);
		}
		/** 神兽列表选择 */
		private shenShouLstSelect(index: number): void {
			let petselect_btn: Laya.Button = this._viewUI.shenShou_lst.getCell(index).getChildByName("petselect_btn") as Laya.Button;
			petselect_btn.skin = "common/ui/tongyong/common_list_3textbg2.png";
			if (this.selectedBtn) {
				this.selectedBtn.skin = "common/ui/tongyong/common_list_3textbg.png";
			}
			this.shenshouSelectedIndex = index;
			this.selectedBtn = petselect_btn;
		}
		/** 神兽列表渲染 */
		private shenShouLstRend(cell: Box, index: number): void {
			let petname_lab: Laya.Label = cell.getChildByName("petname_lab") as Laya.Label;
			let petLevel_lab: Laya.Label = cell.getChildByName("petLevel_lab") as Laya.Label;
			let incCount_lab: Laya.Label = cell.getChildByName("incCount_lab") as Laya.Label;
			let _shenShouInfo: pet.models.PetInfoVo = this._shenshouDic.get(this._shenshouDic.keys[index]);
			petname_lab.text = this._petAttrData[_shenShouInfo.id]["name"];
			petLevel_lab.text = _shenShouInfo.level.toString();
			incCount_lab.text = _shenShouInfo.shenshouinccount.toString();
			let coloricon_img: Laya.Image = cell.getChildByName("coloricon_img") as Laya.Image;
			let icon_img: Laya.Image = cell.getChildByName("icon_img") as Laya.Image;
			coloricon_img.skin = bag.BagSystemModule.getGameItemFrameColorResource(this._petAttrData[_shenShouInfo.id]["quality"]);
			let _shapeid = this._petAttrData[_shenShouInfo.id]["modelid"];
			let _shenshouiconid = this._shapeCpnfig[_shapeid]["littleheadID"];
			icon_img.skin = "common/icon/avatarpet/" + _shenshouiconid + ".png";
			let petselect_btn: Laya.Button = cell.getChildByName("petselect_btn") as Laya.Button;
			if (this.selectedBtn == petselect_btn) {
				petselect_btn.skin = "common/ui/tongyong/common_list_3textbg2.png";
			}
			else {
				petselect_btn.skin = "common/ui/tongyong/common_list_3textbg.png";
			}
			let petSkills_lst: Laya.List = cell.getChildByName("petSkills_lst") as Laya.List;
			this.shenShouSkillsLstInit(petSkills_lst, _shenShouInfo.skills);
		}
		/** 神兽技能列表初始化
		 * @param lst
		 * @param skills 存放神兽技能的数值
		 */
		private shenShouSkillsLstInit(lst: Laya.List, skills: Array<pet.models.PetSkillVo>): void {
			lst.array = skills;
			this.shenshouSkillsArr = [];
			this.shenshouSkillsArr = skills;
			lst.renderHandler = new Laya.Handler(this, this.shenShouSkillsLstRender);
			lst.selectHandler = new Laya.Handler(this, this.shenShouSkillsLstSelect);
		}
		/** 神兽技能列表点击 */
		private shenShouSkillsLstSelect(index: number): void {
			let _skill: pet.models.PetSkillVo = this.shenshouSkillsArr[index];
			let _parame:Laya.Dictionary = new Laya.Dictionary();
			_parame.set("itemId", _skill.skillId);
			let _tipsmod = new tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.SKILL, _parame);
		}
		/** 神兽技能列表渲染 */
		private shenShouSkillsLstRender(cell: Box, index: number): void {
			let petSkill_img: Laya.Image = cell.getChildByName("petSkill_img") as Laya.Image;					//技能头像
			let petSkillFrame_img: Laya.Image = cell.getChildByName("petSkillFrame_img") as Laya.Image;
			let _skill: pet.models.PetSkillVo = this.shenshouSkillsArr[index];
			let _skillCofig: PetSkillConfigBaseVo = this._petSkillConfigData[_skill.skillId];
			let _skillIconId = _skillCofig.icon;		//技能头像
			let _skillInitiative = _skillCofig.skilltype;		//宠物技能：1.被动 2.主动
			petSkill_img.skin = "common/icon/skill/" + _skillIconId + ".png";
			if (_skillInitiative == 1) petSkillFrame_img.skin = "common/ui/pet/beiji" + _skillCofig.color + ".png";
			else petSkillFrame_img.skin = "common/ui/pet/zhuji" + _skillCofig.color + ".png";
		}

		/** 检查人物身上神兽数量 */
		private checkHaveShenShou(): boolean {
			let _haveOneOrNot: boolean = false;
			this._shenshouDic = new Laya.Dictionary();
			this._shenshouDic = PetModel.getInstance().getShenshouDatas();
			if (this._shenshouDic.keys.length == 1) {//身上只有一只神兽，直接进入选择重置神兽的界面
				let _PetChooseMediator = new commonUI.PetChooseMediator(this._app);
				let _shenShouId = this._shenshouDic.get(this._shenshouDic.keys[0]).id;
				_PetChooseMediator.onShow(_shenShouId, this._shenshouDic.keys[0]);
				_haveOneOrNot = true;
			}
			else if (this._shenshouDic.keys.length == 0) {//身上没有神兽,弹出提示飘窗
				let _tipsStr2 = ChatModel.getInstance().chatMessageTips[162104]["msg"];
				game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, _tipsStr2);
				_haveOneOrNot = true;
			}
			return _haveOneOrNot;
		}
		/** 显示与隐藏部分UI
		 * @param isReset true:是神兽重置，false:不是神兽重置
		 */
		private show_and_hide_UI(isReset: boolean): void {
			if (isReset) {
				this._viewUI.title_lab.text = "神兽重置";
				this._viewUI.tips_lab.text = "请选择要被重置神兽物";
				this._viewUI.count_lab.visible = false;
				this._viewUI.pet_list.visible = false;
				this._viewUI.zhaohuan_btn.visible = false;
				this._viewUI.reset_btn.visible = true;
				this._viewUI.shenShou_lst.visible = true;
			}
			else {
				this._viewUI.title_lab.text = "选择宠物";
				this._viewUI.tips_lab.text = "请选择出战的宠物";
				this._viewUI.count_lab.visible = true;
				this._viewUI.pet_list.visible = true;
				this._viewUI.zhaohuan_btn.visible = true;
				this._viewUI.reset_btn.visible = false;
				this._viewUI.shenShou_lst.visible = false;
			}
		}
	}

}