/**
* 任务上交宠物
*/
module game.modules.task {
	export class TaskPetChooseMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.TaskPetChooseUI;
		/**可上交宠物key */
		public allpetkey: Array<number>;
		/**上次选择的宠物*/
		public lastbox: Box;
		/**当前选择的第几个宠物*/
		public currentselect: number;
		/**任务id*/
		private taskid: number;
		/**npckey*/
		private npckey: number;
		/**上交类型*/
		private submittype: number;
		/**等待时间*/
		public waittime: number
		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.TaskPetChooseUI();
			this._viewUI.mouseThrough = true;
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide)
			this._viewUI.confirm_btn.on(LEvent.MOUSE_DOWN, this, this.confirm)
		}
		/**任务id npckey 提交的类型*/
		public init(taskid: number, npckey: number, submittype: number, petid?: any): void {
			this.show();
			this.waittime = 0
			let strinfo: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[3]
			this.taskid = taskid
			this.npckey = npckey
			this.submittype = submittype
			this.allpetkey = [];
			this.lastbox = null;
			var data: Array<any> = []
			if (taskid == 1010000) {//师门任务
				let taskinfo: game.modules.task.models.SRefreshSpecialQuestVo = game.modules.task.models.TaskModel.getInstance().schooltask.get(taskid);
				//遍历已有的宠物
				for (let p in game.modules.pet.models.PetModel.getInstance().pets.keys) {
					let petinfo: game.modules.pet.models.PetInfoVo = game.modules.pet.models.PetModel.getInstance().pets.get(game.modules.pet.models.PetModel.getInstance().pets.keys[p]);
					let allpetbase: PetCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[petinfo.id];
					let icondata: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[allpetbase.modelid] as CNpcShapeBaseVo;
					if (taskinfo.dstitemid == petinfo.id && game.modules.createrole.models.LoginModel.getInstance().roleDetail.petIndex != petinfo.key) {//是否拥有该宠物
						this.allpetkey.push(petinfo.key);
						data.push({ petChooseName_lab: petinfo.name, petChooseLv_lab: petinfo.level + strinfo.msg, peticon_img: "common/icon/avatarpet/" + icondata.littleheadID + ".png" });
					}
				}
			}
			else if (taskid != 0 && taskid != undefined) {//如果任务id不为零和无值
				//获取天机仙令任务配置表
				var _tjxlConfig = tianjixianling.models.TianJiXianLingModel.getInstance().tjxlConfig;
				if (_tjxlConfig[taskid]) {//如果是属于天机仙令的任务
					if (petid) {
						let _petIndex = game.modules.createrole.models.LoginModel.getInstance().roleDetail.petIndex;
						//遍历已有的宠物
						for (let p in game.modules.pet.models.PetModel.getInstance().pets.keys) {
							let petinfo: game.modules.pet.models.PetInfoVo = game.modules.pet.models.PetModel.getInstance().pets.get(game.modules.pet.models.PetModel.getInstance().pets.keys[p]);
							let allpetbase: PetCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[petinfo.id];
							let icondata: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[allpetbase.modelid] as CNpcShapeBaseVo;
							if (petid[0] == petinfo.id && _petIndex != petinfo.key) {//是否拥有该宠物
								this.allpetkey.push(petinfo.key);
								data.push({ petChooseName_lab: petinfo.name, petChooseLv_lab: petinfo.level + strinfo.msg, peticon_img: "common/icon/avatarpet/" + icondata.littleheadID + ".png" });
							}
						}
					}
				}
			}
			this._viewUI.pet_list.array = data;
			this._viewUI.pet_list.vScrollBarSkin = "";
			this._viewUI.pet_list.repeatY = data.length;
			this._viewUI.pet_list.scrollBar.elasticBackTime = 200;
			this._viewUI.pet_list.scrollBar.elasticDistance = 50;
			this._viewUI.pet_list.renderHandler = new Laya.Handler(this, this.initselect);
			if (AutoHangUpModels.getInstance().autotask == 1) {//自动任务 延迟提交
				Laya.timer.loop(1000, this, this.submit)
			}
		}
		/**选择宠物初始化列表响应事件*/
		public initselect(cell: Box, index: number): void {
			let btn: Button = cell.getChildByName("petselect_btn") as Button;
			if (index == 0) {
				this.selectpet(cell, index);
			}
			btn.on(LEvent.MOUSE_DOWN, this, this.selectpet, [cell, index])
		}
		/**选择提交宠物*/
		public selectpet(cell: Box, index: number): void {
			this.currentselect = index;
			if (this.lastbox) {//是否多次选择
				let lastbtn: Button = this.lastbox.getChildByName("petselect_btn") as Button;
				lastbtn.selected = false
			}
			let btn: Button = cell.getChildByName("petselect_btn") as Button;
			btn.selected = true;
			this.lastbox = cell;
			let strinfo: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[3]
			let petinfo: game.modules.pet.models.PetInfoVo = game.modules.pet.models.PetModel.getInstance().pets.get(this.allpetkey[index]);
			let allpetbase: PetCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[petinfo.id];
			let icondata: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[allpetbase.modelid] as CNpcShapeBaseVo;
			this._viewUI.petName_lab.text = petinfo.name
			this._viewUI.petLv_lab.text = petinfo.level + strinfo.msg
			this._viewUI.attack_lab.text = petinfo.attackapt + ""
			this._viewUI.defense_lab.text = petinfo.defendapt + ""
			this._viewUI.hp_lab.text = petinfo.phyforceapt + ""
			this._viewUI.mp_lab.text = petinfo.magicapt + ""
			this._viewUI.speed_lab.text = petinfo.speedapt + ""
			this._viewUI.life_lab.text = petinfo.life + ""
			this._viewUI.growup_lab.text = petinfo.growrate / 1000 + ""
			this._viewUI.skill_lab.text = petinfo.skills.length + ""
			this._viewUI.peticon_img.skin = "common/icon/avatarpet/" + icondata.littleheadID + ".png"
		}
		/**上交道具或宠物*/
		public confirm(): void {
			//上交道具或宠物
			let petinfo: game.modules.pet.models.PetInfoVo = game.modules.pet.models.PetModel.getInstance().pets.get(this.allpetkey[this.currentselect]);
			let submit: game.modules.task.models.SubmitUnitVo = new game.modules.task.models.SubmitUnitVo();
			let submitinfo: Array<game.modules.task.models.SubmitUnitVo> = [];
			submit.key = petinfo.key
			submit.num = 1
			submitinfo[0] = submit
			if (this.npckey != 0) {//是否上交给NPC
				RequesterProtocols._instance.c2s_submit_2npc(this.taskid, this.npckey, this.submittype, submitinfo);
			}
			else {//从天机仙令界面上交宠物，不需要NPC，所要NPC的id为0
				game.modules.tianjixianling.models.TianJiXianLingProxy.getInstance().event(game.modules.tianjixianling.models.SUBMIT_PET, [submitinfo]);
			}
			this.hide();
		}
		public show(): void {
			super.show();
		}
		public hide(): void {
			Laya.timer.clear(this, this.submit)
			if (AutoHangUpModels.getInstance().autotask == 0) {//非自动任务清楚其他状态
				AutoHangUpModels.getInstance().istaskwalk = 0
				AutoHangUpModels.getInstance().notaketimer = 0
			}
			super.hide();
		}
		/**延迟提交*/
		public submit() {
			this.waittime++
			if (this.waittime >= 3) {//是否超过3秒
				this.confirm()
				Laya.timer.clear(this, this.submit)
			}
		}
		public getView(): Sprite {
			return this._viewUI;
		}
	}
}