/**
* 宠物合成结果
*/
module game.modules.pet {
	export class PetHechongResultMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.PetHechongResultUI;
		/**宠物key*/
		public petkey: number;
		/**模型*/
		public model: ModelsCreate;
		/**tips信息*/
		private _tipsModule: game.modules.tips.tipsModule;
		/**当前宠物技能信息*/
		public skillinfo: Array<game.modules.pet.models.PetSkillVo>
		/**模型场景*/
		private scene2DPanel: TestRole2dPanel;
		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.PetHechongResultUI();
			this._viewUI.mouseThrough = true;
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this.model = new ModelsCreate()
			this.scene2DPanel = new TestRole2dPanel()
			this._viewUI.addChild(this.scene2DPanel)
		}
		public show(): void {
			super.show();
		}
		/**创建模型*/
		modelcreate(modelid: number): void {
			if (this.model.role3d) {//是否已经创建过模型
				this.scene2DPanel.removeSceneChar(this.model.role3d)
			}
			this.model.role3d = new YxChar3d();
			this.model.role3d.setRoleUrl(getRoleUrl(modelid + ""));
			this.model.role3d.set2dPos((this._viewUI.petbk_img.x + this._viewUI.pet_img.width / 2 + this._viewUI.pet_img.x) * this._viewUI.globalScaleX, (this._viewUI.petbk_img.y + this._viewUI.pet_img.height / 3 * 2 + this._viewUI.pet_img.y) * this._viewUI.globalScaleY);  //坐标
			this.model.role3d.scale = 1;
			this.model.role3d.rotationX = 0
			this.model.role3d.rotationY = 135
			this.scene2DPanel.addSceneChar(this.model.role3d)
		}
		/**初始化合宠宠物信息*/
		public init(petkey: number): void {//宠物key
			super.show();
			mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
			this.scene2DPanel.ape.x = this._viewUI.x * this._viewUI.globalScaleX
			this.scene2DPanel.ape.y = this._viewUI.y * this._viewUI.globalScaleY
			let petbasedata: game.modules.pet.models.PetInfoVo = PetModel._instance.pets.get(petkey);
			if (petbasedata == null)
				return;
			let petCPetAttrBaseVo: PetCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[petbasedata.id] as PetCPetAttrBaseVo;
			let shape: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[petCPetAttrBaseVo.modelid]
			this.modelcreate(parseInt(shape.shape))
			this.petkey = petkey;
			this._viewUI.gongji_lab.text = petbasedata.attackapt + "";
			this._viewUI.fangyu_lab.text = petbasedata.defendapt + "";
			this._viewUI.tili_lab.text = petbasedata.phyforceapt + "";
			this._viewUI.speed_lab.text = petbasedata.speedapt + "";
			this._viewUI.fali_lab.text = petbasedata.magicapt + "";
			this._viewUI.petgrowgrate_lab.text = (petbasedata.growrate / 1000).toFixed(3) + "";
			this._viewUI.petname_lab.text = petbasedata.name;
			this._viewUI.petlv_lab.text = PetModel.chineseStr.dengji + petbasedata.level;
			this._viewUI.petscore_lab.text = PetModel.chineseStr.pingjia + petbasedata.petscore + "";
			this.skillinfo = [];
			let petskill: Array<game.modules.pet.models.PetSkillVo> = petbasedata.skills;
			this.skillinfo = petskill
			var data: Array<any> = [];
			if (petskill != null) {
				for (var index = 0; index < 12; index++) {
					if (index < petskill.length) {
						let petskillbase: PetSkillConfigBaseVo = PetModel._instance.petSkillConfigData[petskill[index].skillId] as PetSkillConfigBaseVo;
						if (petskillbase.skilltype == 1) {//被动
							data.push({ kuang_img: "common/ui/pet/beiji" + petskillbase.color + ".png", petskill_img: "common/icon/skill/" + petskillbase.icon + ".png" });
						}
						else {
							data.push({ kuang_img: "common/ui/pet/zhuji" + petskillbase.color + ".png", petskill_img: "common/icon/skill/" + petskillbase.icon + ".png" });
						}
					}
					else {
						data.push({ kuang_img: "common/ui/tongyong/kuang94.png", petskill_img: "" });
					}
				}

			}
			else {
				for (var index = 0; index < 12; index++) {
					data.push({});
				}
			}
			this._viewUI.petskill_list.array = data;
			this._viewUI.petskill_list.vScrollBarSkin = "";
			this._viewUI.petskill_list.scrollBar.elasticBackTime = 200;
			this._viewUI.petskill_list.scrollBar.elasticDistance = 50;
			this._viewUI.petskill_list.renderHandler = new Laya.Handler(this, this.initskill)
			this._viewUI.close_btn.clickHandler = new Laya.Handler(this, this.hide);
			this._viewUI.uiclose_btn.clickHandler = new Laya.Handler(this, this.hide);
			this._viewUI.chakanxq_btn.clickHandler = new Laya.Handler(this, this.chakanxq);
		}


		/**初始化技能响应事件*/
		public initskill(cell: Box, index: number): void {
			let img: Laya.Image = cell.getChildByName("petskill_img") as Laya.Image
			img.on(LEvent.MOUSE_DOWN, this, this.skilltips, [index])
		}
		/**技能tips*/
		public skilltips(index: number): void {
			if (index < this.skillinfo.length) {
				var parame: Dictionary = new Dictionary();
				parame.set("itemId", this.skillinfo[index].skillId)
				this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.SKILL, parame);
			}
		}
		/**查看详情*/
		public chakanxq(): void {
			PetModel.getInstance().currentselect = this.petkey
			ModuleManager.show(ModuleNames.PET, this._app);
			this.hide();
			game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.CLOSEVIEW_EVENT);
		}
		public hide(): void {
			this.model.modeldelt()
			super.hide();
			//通知主界面关闭黑色蒙版
			mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
		}
		public getView(): Sprite {
			return this._viewUI;
		}
	}
}