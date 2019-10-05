/**
* 选择合成宠物
*/
module game.modules.pet {
	export class PetSelectMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.PetSelectUI;
		/**宠物品质框*/
		public colour: Array<string> = ["lvkuang.png", "lankuang.png", "zikuang.png", "jinkuang.png"];
		/**宠物数据*/
		public petbasedata: game.modules.pet.models.PetInfoVo;
		/**宠物技能*/
		public petskill: Array<game.modules.pet.models.PetSkillVo>;
		/**提示信息*/
		private tips: game.modules.commonUI.DisappearMessageTipsMediator;
		/**是否法术认证*/
		public iscerfication: number;
		/**第一只宠物key*/
		public pet1key: number = -1;
		/**第二只宠物key*/
		public pet2key: number = -1;
		/**当前选择*/
		public currentselect: number;
		/**上次选择的宠物*/
		public lastbox: Box;
		/**当前选择的宠物key*/
		public currentselectpetkey: number;
		/*当前选择宠物id*/
		public currentselectpet: number;
		/**所有宠物的key*/
		public allkey: Array<number> = []
		/**选择的宠物key*/
		public showkey: number;
		/**tips信息*/
		private _tipsModule: game.modules.tips.tipsModule;
		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.PetSelectUI();
			this._viewUI.mouseThrough = true;
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this.pet1key = -1;
			this.pet2key = -1;
			this._app = app;
			this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
		}
		public show(): void {
			super.show();
		}
		/**初始化数据*/
		public initpetbase(): void {
			let petbaseinfo: game.modules.pet.models.PetInfoVo = this.petbasedata;
			let allpetabseinfo: PetCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[petbaseinfo.id];
			if (allpetabseinfo != null) {//数据是否为空
				this._viewUI.gongji_lab.text = petbaseinfo.attackapt + "";
				this._viewUI.fangyu_lab.text = petbaseinfo.defendapt + "";
				this._viewUI.speed_lab.text = petbaseinfo.speedapt + "";
				this._viewUI.tili_lab.text = petbaseinfo.phyforceapt + "";
				this._viewUI.fashu_lab.text = petbaseinfo.magicapt + "";
				this._viewUI.petgrow_lab.text = (petbaseinfo.growrate / 1000).toFixed(3) + "";
				this._viewUI.attack_pro.value = (petbaseinfo.attackapt - allpetabseinfo.attackaptmin) / (allpetabseinfo.attackaptmax - allpetabseinfo.attackaptmin)
				this._viewUI.def_pro.value = (petbaseinfo.defendapt - allpetabseinfo.defendaptmin) / (allpetabseinfo.defendaptmax - allpetabseinfo.defendaptmin)
				this._viewUI.phy_pro.value = (petbaseinfo.phyforceapt - allpetabseinfo.phyforceaptmin) / (allpetabseinfo.phyforceaptmax - allpetabseinfo.phyforceaptmin)
				this._viewUI.magic_pro.value = (petbaseinfo.magicapt - allpetabseinfo.magicaptmin) / (allpetabseinfo.magicaptmax - allpetabseinfo.magicaptmin)
				this._viewUI.speed_pro.value = (petbaseinfo.speedapt - allpetabseinfo.speedaptmin) / (allpetabseinfo.speedaptmax - allpetabseinfo.speedaptmin)
				this._viewUI.petgrow_progressbar.value = (petbaseinfo.growrate - allpetabseinfo.growrate[0]) / (allpetabseinfo.growrate[6] - allpetabseinfo.growrate[0]);
			}
			else {
				this._viewUI.gongji_lab.text = 0 + "";
				this._viewUI.fangyu_lab.text = 0 + "";
				this._viewUI.speed_lab.text = 0 + "";
				this._viewUI.tili_lab.text = 0 + "";
				this._viewUI.fashu_lab.text = 0 + "";
				this._viewUI.petgrow_lab.text = 0 + "";
				this._viewUI.petgrow_progressbar.value = 0;
				this.petskill = null;
			}
			this.initpetskill();
		}
		/**初始化宠物列表*/
		public initpetlist(): void {
			this.allkey = []
			var data: Array<any> = [];
			let score: string = "";
			let isfight: string = "";
			let petnum: number = 0;
			for (let p in PetModel.getInstance().pets.keys) {
				let petinfo: game.modules.pet.models.PetInfoVo = PetModel._instance.pets.get(PetModel.getInstance().pets.keys[p]);
				if (this.pet1key == petinfo.key)//是否为已经选择
					continue;
				if (this.pet2key == petinfo.key)//是否为已经选择
					continue;
				let allpetbase: PetCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[petinfo.id];
				let icondata: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[allpetbase.modelid];
				if (petinfo.petscore >= allpetbase.treasureScore)//是否为珍品
					score = "common/ui/tongyong/zhenpin.png";
				else
					score = "";
				if (LoginModel.getInstance().roleDetail.petIndex == PetModel.getInstance().pets.keys[p])//出战
					isfight = "common/ui/pet/chongwu_zhan.png";
				else
					isfight = "";
				if (this.currentselect == 1 && this.showkey != -1 && this.showkey == petinfo.key) {//当前选择的第一只宠物
					this.petbasedata = petinfo;
					this.petskill = this.petbasedata.skills;
					this.currentselectpetkey = petinfo.key
					this.currentselectpet = petnum
				}
				else if (this.currentselect == 2 && this.showkey != -1 && this.showkey == petinfo.key) {//当前选择的第二只宠物
					this.petbasedata = petinfo;
					this.petskill = this.petbasedata.skills;
					this.currentselectpetkey = petinfo.key
					this.currentselectpet = petnum
				}
				else if (petnum == 0) {//剩余选择的宠物为0
					this.petbasedata = petinfo;
					this.petskill = this.petbasedata.skills;
					this.currentselectpetkey = petinfo.key
					this.currentselectpet = petnum
				}
				this.allkey.push(petinfo.key)
				data.push({ kuang_img: "common/ui/tongyong/" + this.colour[allpetbase.quality - 2], peticon_img: "common/icon/avatarpet/" + icondata.littleheadID + ".png", petname_lab: petinfo.name, petlv_lab: "LV." + petinfo.level, chuzhan_img: isfight, zhenpin_img: score });
				petnum += 1;//剩余宠物数量
			}
			this._viewUI.pet_list.array = data;
			this._viewUI.pet_list.vScrollBarSkin = "";
			this._viewUI.pet_list.repeatY = data.length
			this._viewUI.pet_list.scrollBar.elasticBackTime = 200;
			this._viewUI.pet_list.scrollBar.elasticDistance = 50;
			this._viewUI.pet_list.renderHandler = new Laya.Handler(this, this.initselectpet);
			this._viewUI.pet_list.scrollBar.setScroll(0, 96 * data.length, 96 * this.currentselectpet)
			this.initpetbase()
		}
		/**初始化当前宠物技能*/
		public initpetskill(): void {
			let iscertification: string = "";
			var data: Array<any> = [];
			for (var index = 0; index < 12; index++) {
				if (index < this.petskill.length) {//是否是有效技能栏
					let petskill: game.modules.pet.models.PetSkillVo = this.petskill[index];
					let petskills: PetSkillConfigBaseVo = PetModel.getInstance().petSkillConfigData[this.petskill[index].skillId] as PetSkillConfigBaseVo;
					let petdata: PetCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[PetModel.getInstance().petbasedata.id] as PetCPetAttrBaseVo;
					if (petskill.certification == 1) {//认证
						iscertification = "common/ui/pet/renzheng.png";
						this.iscerfication = 1;
					}
					else
						iscertification = "";
					if (petskills.skilltype == 1) {//技能类型 1为被动 2主动
						data.push({ skillpane_img: "common/ui/pet/beiji" + petskills.color + ".png", skillicon_img: "common/icon/skill/" + petskills.icon + ".png", renzheng_img: iscertification });
					}
					else {
						data.push({ skillpane_img: "common/ui/pet/zhuji" + petskills.color + ".png", skillicon_img: "common/icon/skill/" + petskills.icon + ".png", renzheng_img: iscertification });
					}
				}
				else
					data.push({ skillpane_img: "common/ui/tongyong/kuang94.png", skillicon_img: "", renzheng_img: "" });
			}
			this._viewUI.skill_list.array = data;
			this._viewUI.skill_list.vScrollBarSkin = "";
			this._viewUI.skill_list.repeatY = data.length
			this._viewUI.skill_list.scrollBar.elasticBackTime = 200;
			this._viewUI.skill_list.scrollBar.elasticDistance = 50;
			this._viewUI.skill_list.renderHandler = new Laya.Handler(this, this.iniskill)
		}
		/**技能栏响应事件*/
		public iniskill(cell: Box, index: number): void {
			let skill: Laya.Image = cell.getChildByName("skillicon_img") as Laya.Image
			skill.on(LEvent.MOUSE_DOWN, this, this.skillstips, [index])
		}
		/**技能tips*/
		public skillstips(index: number): void {
			if (index < this.petskill.length) {//是否是有效技能栏
				var parame: Dictionary = new Dictionary();
				parame.set("itemId", this.petskill[index].skillId)
				this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.SKILL, parame);
			}
		}
		/**选择技能*/
		public selectpet(cell: Box, index: number): void {
			let btn: Button = cell.getChildByName("select_btn") as Button
			if (this.lastbox) {//是否多次选择
				let lastbtn: Button = this.lastbox.getChildByName("select_btn") as Button
				lastbtn.selected = false
			}
			btn.selected = true;
			this.lastbox = cell
			this.iscerfication = 0;
			this.petbasedata = PetModel._instance.pets.get(this.allkey[index]);
			this.petskill = this.petbasedata.skills;
			this.currentselectpetkey = this.allkey[index]
			this.currentselectpet = index
			this.initpetbase();
		}
		/**选择合成的宠物*/
		public select(): void {
			//战斗不能合成
			if (LoginModel.getInstance().roleDetail.petIndex == this.petbasedata.key) {
				let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[150056];
				this.tips.onShow(chattext.msg);
				return;
			}
			//野生不能合成
			if (this.petbasedata.kind == 1) {
				let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[150085];
				this.tips.onShow(chattext.msg);
				return;
			}
			//神兽不能合成
			if (this.petbasedata.kind == 4) {
				let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[150086];
				this.tips.onShow(chattext.msg);
				return;
			}
			//绑定不能合成
			if (this.petbasedata.flag == 1) {
				let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[150048];
				this.tips.onShow(chattext.msg);
				return;
			}
			//锁定不能合成
			if (this.petbasedata.flag == 2) {
				let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[150049];
				this.tips.onShow(chattext.msg);
				return;
			}
			//法术认证不能合成
			if (this.iscerfication == 1) {
				let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[150068];
				this.tips.onShow(chattext.msg);
				return;
			}
			//有装备的不能合成
			let bag: Laya.Dictionary = game.modules.bag.models.BagModel.getInstance().bagMap[9]
			let baginfo: game.modules.bag.models.BagVo = bag.get(this.petbasedata.key)
			if (baginfo) {
				if (baginfo.items != 0) {
					let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[191055];
					this.tips.onShow(chattext.msg);
					return;
				}
			}
			if (this.currentselect == 1)//第一栏添加宠物
				this.pet1key = this.petbasedata.key;
			else
				this.pet2key = this.petbasedata.key;
			let petkey: Array<number> = [];
			petkey[0] = this.pet1key;
			petkey[1] = this.pet2key;
			models.PetProxy.getInstance().event(models.REFRESHSELECT_EVNT, petkey);//将选中的可以返回
			super.hide();
		}
		/**宠物选择*/
		public petselect(key1: number, key2: number, currentselect: number): void {
			super.show();
			this.iscerfication = 0;
			this.petbasedata = new game.modules.pet.models.PetInfoVo();
			if (this.lastbox) {//是否多次选择
				let lastbtn: Button = this.lastbox.getChildByName("select_btn") as Button
				lastbtn.selected = false
			}
			this.lastbox = null
			this._viewUI.close_btn.clickHandler = new Laya.Handler(this, this.hide);
			this._viewUI.selectpet_btn.clickHandler = new Laya.Handler(this, this.select);
			if (currentselect == 1 && key1 != -1) {//当前选择且未曾选择
				this.showkey = key1
				this.pet1key = -1;
			}
			else {
				this.pet1key = key1
			}
			if (currentselect == 2 && key2 != -1) {//当前选择且未曾选择
				this.showkey = key2
				this.pet2key = -1;
			}
			else {
				this.pet2key = key2
			}
			this.currentselect = currentselect;
			this._viewUI.skill_list.vScrollBarSkin = "";
			this.initpetlist();
		}
		/**选择的宠物*/
		public initselectpet(cell: Box, index: number): void {
			let btn: Button = cell.getChildByName("select_btn") as Button
			if (this.currentselectpet == index) {//选择的哪个宠物
				if (this.lastbox) {
					let lastbtn: Button = this.lastbox.getChildByName("select_btn") as Button
					lastbtn.selected = false
				}
				btn.selected = true;
				this.lastbox = cell
			}
			btn.on(LEvent.MOUSE_DOWN, this, this.selectpet, [cell, index])
		}
		public hide(): void {
			super.hide();
		}
		public getView(): Sprite {
			return this._viewUI;
		}
	}
}