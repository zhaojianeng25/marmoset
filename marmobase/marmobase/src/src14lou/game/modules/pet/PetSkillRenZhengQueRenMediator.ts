/**
* 认证确认
*/
module game.modules.pet {
	export class PetSkillRenZhengQueRenMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.component.renzhengquerenUI;
		/**兑换金钱界面*/
		private change: game.modules.commonUI.ChangeMoneyViewMediator;
		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.component.renzhengquerenUI;
			this._viewUI.mouseThrough = true;
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this._viewUI.cancel_btn.on(LEvent.MOUSE_DOWN, this, this.hide)
		}
		//**初始化数据*/
		public init(skillid: number, rznumber: number): void {//0为取消认证 1 为认证
			this.show();
			let petinfo: game.modules.pet.models.PetInfoVo = game.modules.pet.models.PetModel.getInstance().pets.get(PetModel._instance.petbasedata.key)
			let petdata: PetCPetAttrBaseVo = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[PetModel._instance.petbasedata.id]
			let skillinfo: PetSkillConfigBaseVo = game.modules.pet.models.PetModel.getInstance().petSkillConfigData[skillid]
			let str: Array<any> = []
			str.push(petinfo.name)
			str.push(petinfo.level)
			for (var index = 0; index < petinfo.skills.length; index++) {
				let skillsinfo: game.modules.pet.models.PetSkillVo = petinfo.skills[index]
				if (skillsinfo.certification == 1) {//是否已经认证 1为认证
					let skills: PetSkillConfigBaseVo = game.modules.pet.models.PetModel.getInstance().petSkillConfigData[petinfo.skills[index].skillId]
					str.push(skills.skillname)
					break;
				}
			}
			str.push(skillinfo.skillname)
			if (rznumber == 1) {//1为法术认证 2为取消认证
				this._viewUI.text_html.innerHTML = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(150065, str)
				this._viewUI.costyinbi_lab.text = petdata.certificationcost + ""
			}
			else {
				this._viewUI.text_html.innerHTML = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(150066, str)
				this._viewUI.costyinbi_lab.text = petdata.cancelcertificationcost + ""
			}
			this._viewUI.queding_btn.on(LEvent.MOUSE_DOWN, this, this.renzheng, [skillid, rznumber])
		}
		/**认证确定*/
		public renzheng(skillid: number, rznumber: number): void {
			if (parseInt(this._viewUI.costyinbi_lab.text) <= game.modules.bag.models.BagModel.getInstance().sliverIcon) {//认证
				RequesterProtocols._instance.c2s_pet_skillcertification(PetModel._instance.petbasedata.key, skillid, rznumber);
			}
			else {//否则兑换银币
				this.change = new game.modules.commonUI.ChangeMoneyViewMediator(this._viewUI, this._app);
				this.change.onShow(false, game.modules.bag.models.BagModel.getInstance().globalIcon, parseInt(this._viewUI.costyinbi_lab.text))
			}
			this.hide()
		}
		public show(): void {
			super.show();
		}
		public hide(): void {
			super.hide();
		}
		public getView(): Sprite {
			return this._viewUI;
		}
	}
}