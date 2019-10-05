/**
* 宠物加点方案
*/
module game.modules.pet {
	export class PetJiaDianFanganMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.PetJiaDianFanganUI;
		/**模型场景*/
		private scene2DPanel: TestRole2dPanel
		/**模型*/
		public model: ModelsCreate;
		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.PetJiaDianFanganUI();
			this._viewUI.mouseThrough = true;
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this.model = new ModelsCreate()
			this.scene2DPanel = new TestRole2dPanel()
			this._viewUI.petbk_img.addChild(this.scene2DPanel)
		}
		public show(): void {
			super.show();
			this.init();
		}
		/**创建模型*/
		modelcreate(modelid: number): void {//模型创建 模型ID
			if (this.model.role3d) {
				this.scene2DPanel.removeSceneChar(this.model.role3d)
			}
			this.model.role3d = new YxChar3d();
			this.model.role3d.setRoleUrl(getRoleUrl(modelid + ""));
			this.model.role3d.set2dPos((this._viewUI.petbk_img.x + this._viewUI.petbk_img.width / 2 + this._viewUI.bk_img.x) * this._viewUI.globalScaleX, (this._viewUI.petbk_img.y + this._viewUI.petbk_img.height / 4 * 3 + this._viewUI.bk_img.y) * this._viewUI.globalScaleY);  //坐标
			this.model.role3d.scale = 1;
			this.model.role3d.rotationY = 135
			this.model.role3d.rotationX = 0
			this.scene2DPanel.addSceneChar(this.model.role3d)
		}
		/**初始化宠物数据*/
		public init(): void {
			this.scene2DPanel.ape.x = this._viewUI.x * this._viewUI.globalScaleX
			this.scene2DPanel.ape.y = this._viewUI.y * this._viewUI.globalScaleY
			let petdata: game.modules.pet.models.PetInfoVo = PetModel.getInstance().petbasedata;
			let petCPetAttrBaseVo: PetCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[petdata.id] as PetCPetAttrBaseVo;
			this.modelcreate(petCPetAttrBaseVo.modelid)
			this._viewUI.py_lab.changeText(petdata.autoaddcons + "");
			this._viewUI.iq_lab.changeText(petdata.autoaddiq + "");
			this._viewUI.str_lab.changeText(petdata.autoaddstr + "");
			this._viewUI.endu_lab.changeText(petdata.autoaddendu + "");
			this._viewUI.speed_lab.changeText(petdata.autoaddagi + "");
			let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel.getInstance().cstringResConfigData[11828]
			this._viewUI.petlevel_lab.changeText(chattext.msg + petdata.level);
			this.initaddbtn();
			this.initreducebtn();
			this.click();
		}
		/**按钮响应事件*/
		public click() {
			this._viewUI.close_btn.clickHandler = new Laya.Handler(this, this.hide);
			this._viewUI.tpyadd_btn.clickHandler = new Laya.Handler(this, this.addpypoint);
			this._viewUI.tiqadd_btn.clickHandler = new Laya.Handler(this, this.addiqpoint);
			this._viewUI.tenduadd_btn.clickHandler = new Laya.Handler(this, this.addendupoint);
			this._viewUI.tstradd_btn.clickHandler = new Laya.Handler(this, this.addstrpoint);
			this._viewUI.tspeedadd_btn.clickHandler = new Laya.Handler(this, this.addspeedpoint);
			this._viewUI.tpyreduce_btn.clickHandler = new Laya.Handler(this, this.reducepypoint);
			this._viewUI.tiqreduce_btn.clickHandler = new Laya.Handler(this, this.reduceiqpoint);
			this._viewUI.tendureduce_btn.clickHandler = new Laya.Handler(this, this.reduceendupoint);
			this._viewUI.tstrreduce_btn.clickHandler = new Laya.Handler(this, this.reducestrpoint);
			this._viewUI.tspeedreduce_btn.clickHandler = new Laya.Handler(this, this.reducespeedpoint);
		}
		/**体质加点*/
		public addpypoint() {
			this._viewUI.py_lab.changeText(parseInt(this._viewUI.py_lab.text) + 1 + "");
			this.initaddbtn();
			this.initreducebtn();
		}
		/**智力加点*/
		public addiqpoint() {
			this._viewUI.iq_lab.changeText(parseInt(this._viewUI.iq_lab.text) + 1 + "");
			this.initaddbtn();
			this.initreducebtn();
		}
		/**耐力加点*/
		public addendupoint() {
			this._viewUI.endu_lab.changeText(parseInt(this._viewUI.endu_lab.text) + 1 + "");
			this.initaddbtn();
			this.initreducebtn();
		}
		/**力量加点*/
		public addstrpoint() {
			this._viewUI.str_lab.changeText(parseInt(this._viewUI.str_lab.text) + 1 + "");
			this.initaddbtn();
			this.initreducebtn();
		}
		/**速度加点*/
		public addspeedpoint() {
			this._viewUI.speed_lab.changeText(parseInt(this._viewUI.speed_lab.text) + 1 + "");
			this.initaddbtn();
			this.initreducebtn();
		}
		/**体质减少*/
		public reducepypoint() {
			this._viewUI.py_lab.changeText(parseInt(this._viewUI.py_lab.text) - 1 + "");
			this.initaddbtn();
			this.initreducebtn();
		}
		/**智力减少*/
		public reduceiqpoint() {
			this._viewUI.iq_lab.changeText(parseInt(this._viewUI.iq_lab.text) - 1 + "");
			this.initaddbtn();
			this.initreducebtn();
		}
		/**耐力减少*/
		public reduceendupoint() {
			this._viewUI.endu_lab.changeText(parseInt(this._viewUI.endu_lab.text) - 1 + "");
			this.initaddbtn();
			this.initreducebtn();
		}
		/**力量减少*/
		public reducestrpoint() {
			this._viewUI.str_lab.changeText(parseInt(this._viewUI.str_lab.text) - 1 + "");
			this.initaddbtn();
			this.initreducebtn();
		}
		/**速度减少*/
		public reducespeedpoint() {
			this._viewUI.speed_lab.changeText(parseInt(this._viewUI.speed_lab.text) - 1 + "");
			this.initaddbtn();
			this.initreducebtn();

		}
		/**刷新可加点数值*/
		public initaddbtn() {
			let py = parseInt(this._viewUI.py_lab.text);
			let iq = parseInt(this._viewUI.iq_lab.text);
			let str = parseInt(this._viewUI.str_lab.text);
			let endu = parseInt(this._viewUI.endu_lab.text);
			let speed = parseInt(this._viewUI.speed_lab.text);
			if (py + iq + str + endu + speed < 5) {//加点方案值最多为5
				this._viewUI.tpyadd_btn.visible = true;
				this._viewUI.tiqadd_btn.visible = true;
				this._viewUI.tstradd_btn.visible = true;
				this._viewUI.tenduadd_btn.visible = true;
				this._viewUI.tspeedadd_btn.visible = true;
				this._viewUI.fpyadd_btn.visible = false;
				this._viewUI.fiqadd_btn.visible = false;
				this._viewUI.fstradd_btn.visible = false;
				this._viewUI.fenduadd_btn.visible = false;
				this._viewUI.fspeedadd_btn.visible = false;
			}
			else {
				this._viewUI.tpyadd_btn.visible = false;
				this._viewUI.tiqadd_btn.visible = false;
				this._viewUI.tstradd_btn.visible = false;
				this._viewUI.tenduadd_btn.visible = false;
				this._viewUI.tspeedadd_btn.visible = false;
				this._viewUI.fpyadd_btn.visible = true;
				this._viewUI.fiqadd_btn.visible = true;
				this._viewUI.fstradd_btn.visible = true;
				this._viewUI.fenduadd_btn.visible = true;
				this._viewUI.fspeedadd_btn.visible = true;
			}
		}
		/**刷新可减少数值的按钮*/
		public initreducebtn() {
			//判断是否有值
			if (this._viewUI.py_lab.text != "0") {//体质
				this._viewUI.tpyreduce_btn.visible = true;
				this._viewUI.fpyreduce_btn.visible = false;
			}
			else {
				this._viewUI.tpyreduce_btn.visible = false;
				this._viewUI.fpyreduce_btn.visible = true;
			}

			if (this._viewUI.iq_lab.text != "0") {//智力
				this._viewUI.tiqreduce_btn.visible = true;
				this._viewUI.fiqreduce_btn.visible = false;
			}
			else {
				this._viewUI.tiqreduce_btn.visible = false;
				this._viewUI.fiqreduce_btn.visible = true;
			}

			if (this._viewUI.str_lab.text != "0") {//力量
				this._viewUI.tstrreduce_btn.visible = true;
				this._viewUI.fstrreduce_btn.visible = false;
			}
			else {
				this._viewUI.tstrreduce_btn.visible = false;
				this._viewUI.fstrreduce_btn.visible = true;
			}

			if (this._viewUI.endu_lab.text != "0") {//耐力
				this._viewUI.tendureduce_btn.visible = true;
				this._viewUI.fendureduce_btn.visible = false;
			}
			else {
				this._viewUI.tendureduce_btn.visible = false;
				this._viewUI.fendureduce_btn.visible = true;
			}
			if (this._viewUI.speed_lab.text != "0") {//敏捷
				this._viewUI.tspeedreduce_btn.visible = true;
				this._viewUI.fspeedreduce_btn.visible = false;
			}
			else {
				this._viewUI.tspeedreduce_btn.visible = false;
				this._viewUI.fspeedreduce_btn.visible = true;
			}
		}
		public hide(): void {
			let petdata: game.modules.pet.models.PetInfoVo = PetModel.getInstance().petbasedata;
			if (petdata.autoaddcons != parseInt(this._viewUI.py_lab.text) || petdata.autoaddiq != parseInt(this._viewUI.iq_lab.text) || petdata.autoaddstr != parseInt(this._viewUI.str_lab.text)
				|| petdata.autoaddendu != parseInt(this._viewUI.endu_lab.text) || petdata.autoaddagi != parseInt(this._viewUI.speed_lab.text)) {
				var param: Array<string> = [this._viewUI.py_lab.text, this._viewUI.iq_lab.text, this._viewUI.str_lab.text, this._viewUI.endu_lab.text, this._viewUI.speed_lab.text];
				var str = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(150108, param);
				let _tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
				_tips.onShow(str);
			}
			PetModel.getInstance().petbasedata.autoaddcons = parseInt(this._viewUI.py_lab.text);
			PetModel.getInstance().petbasedata.autoaddiq = parseInt(this._viewUI.iq_lab.text);
			PetModel.getInstance().petbasedata.autoaddstr = parseInt(this._viewUI.str_lab.text);
			PetModel.getInstance().petbasedata.autoaddendu = parseInt(this._viewUI.endu_lab.text);
			PetModel.getInstance().petbasedata.autoaddagi = parseInt(this._viewUI.speed_lab.text);
			PetModel.getInstance().pets.set(PetModel.getInstance().petbasedata.id, PetModel.getInstance().petbasedata);
			RequesterProtocols._instance.c2s_pet_setautoaddpoint(PetModel._instance.petbasedata.key, PetModel._instance.petbasedata.autoaddstr, PetModel._instance.petbasedata.autoaddiq,
				PetModel._instance.petbasedata.autoaddcons, PetModel._instance.petbasedata.autoaddendu, PetModel._instance.petbasedata.autoaddagi);
			super.hide();
		}
		public getView(): Sprite {
			return this._viewUI;
		}
	}
}