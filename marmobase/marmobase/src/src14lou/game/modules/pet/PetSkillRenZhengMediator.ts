/**
*法术认证
*/
module game.modules.pet {
	export class PetSkillRenZhengMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.PetSkillRenZhengUI;
		/**技能信息，key从 0开始 key为选择的第几个技能*/
		public skilinfo: Laya.Dictionary;
		/**认证确定界面*/
		private rzqueding: game.modules.pet.PetSkillRenZhengQueRenMediator
		/**认证id*/
		public rznum: number;
		/**上次选择的技能*/
		public lastbox: Box
		/**当前选择的技能*/
		public currentselect: number;
		/**tips信息*/
		private _tipsModule: game.modules.tips.tipsModule;
		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.PetSkillRenZhengUI();
			this._viewUI.mouseThrough = true;
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this._viewUI.haveyinbi_lab.text = game.modules.bag.models.BagModel.getInstance().sliverIcon + ""
			this.skilinfo = new Laya.Dictionary();
			this.lastbox = null;
		}
		public show(): void {
			super.show();
			this.init();
		}
		/**初始化数据*/
		public init(): void {//认证	
			this.currentselect = 0
			let petskill: Array<game.modules.pet.models.PetSkillVo> = PetModel._instance.petskill;
			let num: number = 0;
			var data: Array<any> = [];
			for (var index: number = 0; index < petskill.length; index++) {
				let allskillinfo: PetSkillupgradeBaseVo = PetModel._instance.petSkillupgradeData[petskill[index].skillId] as PetSkillupgradeBaseVo;
				if (allskillinfo.iscancertification == 1) {//已认证
					let skillcolor: PetSkillConfigBaseVo = PetModel._instance.petSkillConfigData[petskill[index].skillId] as PetSkillConfigBaseVo;
					if (num == 0)
						data.push({ skillicon_img: "common/icon/skill/" + skillcolor.icon + ".png", skillkuang_img: "common/ui/pet/zhuji" + skillcolor.color + ".png", skillname_lab: skillcolor.skillname });
					else
						data.push({ skillicon_img: "common/icon/skill/" + skillcolor.icon + ".png", skillkuang_img: "common/ui/pet/zhuji" + skillcolor.color + ".png", skillname_lab: skillcolor.skillname });
					this.skilinfo.set(num, petskill[index]);
					num += 1;
				}
			}
			let petbase: PetCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[PetModel._instance.petbasedata.id] as PetCPetAttrBaseVo;
			this._viewUI.cosyinb_lab.text = petbase.certificationcost + "";
			this._viewUI.petskill_list.array = data;
			this._viewUI.petskill_list.vScrollBarSkin = "";
			this._viewUI.petskill_list.repeatY = data.length
			this._viewUI.petskill_list.scrollBar.elasticBackTime = 200;
			this._viewUI.petskill_list.scrollBar.elasticDistance = 50;
			this._viewUI.petskill_list.renderHandler = new Laya.Handler(this, this.initskill);
			this._viewUI.close_btn.clickHandler = new Laya.Handler(this, this.hide);
			let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11121]
			this._viewUI.fsrenzheng_btn.label = chattext.msg;
			this._viewUI.fsrenzheng_btn.clickHandler = new Laya.Handler(this, this.renzheng);
			this.rznum = 1;
		}
		/**取消认证*/
		public cancaleinit(): void {
			super.show();
			this.currentselect = 0
			let petskill: Array<game.modules.pet.models.PetSkillVo> = PetModel._instance.petskill;
			let num: number = 0;
			var data: Array<any> = [];
			for (var index: number = 0; index < petskill.length; index++) {
				let allskillinfo: PetSkillupgradeBaseVo = PetModel._instance.petSkillupgradeData[petskill[index].skillId] as PetSkillupgradeBaseVo;
				if (allskillinfo.iscancertification != 1) {//是否法术认证
					let skillcolor: PetSkillConfigBaseVo = PetModel._instance.petSkillConfigData[petskill[index].skillId] as PetSkillConfigBaseVo;
					if (num == 0)//可取消认证的技能数量
						data.push({ skillicon_img: "common/icon/skill/" + skillcolor.icon + ".png", skillkuang_img: "common/ui/pet/zhuji" + skillcolor.color + ".png", skillname_lab: skillcolor.skillname });
					else
						data.push({ skillicon_img: "common/icon/skill/" + skillcolor.icon + ".png", skillkuang_img: "common/ui/pet/zhuji" + skillcolor.color + ".png", skillname_lab: skillcolor.skillname });
					this.skilinfo.set(num, petskill[index]);
					num += 1;
				}
			}
			let petbase: PetCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[PetModel._instance.petbasedata.id] as PetCPetAttrBaseVo;
			this._viewUI.cosyinb_lab.text = petbase.cancelcertificationcost + "";
			this._viewUI.petskill_list.array = data;
			this._viewUI.petskill_list.vScrollBarSkin = "";
			this._viewUI.petskill_list.repeatY = data.length
			this._viewUI.petskill_list.scrollBar.elasticBackTime = 200;
			this._viewUI.petskill_list.scrollBar.elasticDistance = 50;
			this._viewUI.petskill_list.renderHandler = new Laya.Handler(this, this.initskill);
			this._viewUI.close_btn.clickHandler = new Laya.Handler(this, this.hide);
			let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11120]
			this._viewUI.fsrenzheng_btn.label = chattext.msg;
			this._viewUI.fsrenzheng_btn.clickHandler = new Laya.Handler(this, this.renzheng);
			this.rznum = 0;
		}
		/**技能按钮响应事件*/
		public initskill(cell: Box, index: number): void {
			let btn: Button = cell.getChildByName("selectskill_btn") as Button
			btn.on(LEvent.MOUSE_DOWN, this, this.selectskill, [cell, index])
			let img: Laya.Image = cell.getChildByName("skillicon_img") as Laya.Image
			img.on(LEvent.MOUSE_DOWN, this, this.skillstips, [index])
			if (index == this.currentselect) {//是否为当前选择
				this.selectskill(cell, index)
			}
		}
		/**技能提示*/
		public skillstips(index: number): void {
			if (index < this.skilinfo.keys.length) {//是否有效技能栏
				let skill: game.modules.pet.models.PetSkillVo = this.skilinfo.get(index)
				var parame: Dictionary = new Dictionary();
				parame.set("itemId", skill.skillId)
				this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.SKILL, parame);
			}
		}
		/**法术认证选择*/
		public selectskill(cell: Box, index: number): void {
			if (this.lastbox == cell)//是否选择同样的技能
				return;
			if (this.lastbox) {//是否多次选择
				let lastbtn: Button = this.lastbox.getChildByName("selectskill_btn") as Button
				lastbtn.selected = false
			}
			let btn: Button = cell.getChildByName("selectskill_btn") as Button
			btn.selected = true;
			this.lastbox = cell
			this.currentselect = index
		}
		public hide(): void {
			super.hide();
		}
		public getView(): Sprite {
			return this._viewUI;
		}
		/**确定认证*/
		public renzheng(): void {
			if (PetModel._instance.petbasedata.kind == 4)//神兽不能认证
				return;
			let petskill: game.modules.pet.models.PetSkillVo = this.skilinfo.get(this.currentselect);
			if (petskill) {//认证技能信息
				this.rzqueding = new game.modules.pet.PetSkillRenZhengQueRenMediator(this._app)
				this.rzqueding.init(petskill.skillId, this.rznum)
				super.hide();
			}
		}
	}
}