/**
* 选择技能书
*/
module game.modules.pet {
	export class PetSelectSkillMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.PetSelectSkillUI;
		/**上次选择的技能书*/
		public lastbox: Box
		/**tips信息*/
		private _tipsModule: game.modules.tips.tipsModule;
		/**技能书id*/
		private itemid: Array<number>;
		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.PetSelectSkillUI();
			this._viewUI.mouseThrough = true;
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			models.PetProxy.getInstance().on(models.REFRESH_EVENT, this, this.init);
		}
		public show(): void {
			super.show();
			this.init()
		}
		/**初始化可用技能技能书*/
		public init() {
			this.lastbox = null;
			var data: Array<any> = [];
			this.itemid = []
			let bag: game.modules.bag.models.BagVo = BagModel.getInstance().bagMap[1];//获取背包中技能书
			let petSkillConfigData: PetSkillConfigBaseVo = PetModel.getInstance().petSkillConfigData as PetSkillConfigBaseVo;
			for (var id = 0; id < bag.items.length; id++) {
				let item: game.modules.bag.models.ItemVo = bag.items[id];
				// let skillbase: PetItemEffectBaseVo = BagModel.getInstance().petItemEffectData as PetItemEffectBaseVo;
				for (let skillid in BagModel.getInstance().petItemEffectData) {
					if (item.id == parseInt(skillid) && item.id >= 109008) {//道具ID范围且是否拥有该道具
						this.itemid.push(item.id)
						data.push({ skillname_lab: petSkillConfigData[BagModel.getInstance().petItemEffectData[skillid].petskillid].skillname, skillicon_img: "common/icon/item/20139.png" });
						break;
					}
				}
			}
			this._viewUI.skill_list.array = data;
			this._viewUI.skill_list.vScrollBarSkin = "";
			this._viewUI.skill_list.scrollBar.elasticBackTime = 200;
			this._viewUI.skill_list.scrollBar.elasticDistance = 50;
			this._viewUI.skill_list.renderHandler = new Laya.Handler(this, this.initskillbook);
			this._viewUI.close_btn.clickHandler = new Laya.Handler(this, this.hide);
		}
		/**初始化技能列表响应事件*/
		public initskillbook(cell: Box, index: number): void {
			let btn: Button = cell.getChildByName("selectskill_btn") as Button;
			let color: number = PetModel.getInstance().petSkillConfigData[BagModel.getInstance().petItemEffectData[this.itemid[index]].petskillid].color;
			let skillname_lab: Label = cell.getChildByName("skillname_lab") as Laya.Label;
			this.SkillLabColor(color,skillname_lab);
			btn.on(LEvent.MOUSE_DOWN, this, this.selectskillbook, [cell, index])
			let skill: Laya.Image = cell.getChildByName("skillicon_img") as Laya.Image
			skill.on(LEvent.MOUSE_DOWN, this, this.skillstips, [index])
		}
		/** 更改技能名称颜色 
		 * @param color 颜色
		 * @param name 技能名称ui
		*/
		private SkillLabColor(color:number,name:Label):void
		{
			switch (color) {
				case 1:
					name.color = "#06cc11"
					break;
				case 2:
					name.color = "#00b1ff"
					break;
				case 3:
					name.color = "#ff46f0"
					break;
				case 4:
					name.color = "#ffa500"
					break;
			
				default :
					name.color = "#06cc11"	
					break;
			}
		}
		/**技能书tips*/
		public skillstips(index: number): void {
			if (index < this.itemid.length) {//是否有效tips
				var parame: Dictionary = new Dictionary();
				parame.set("itemId", this.itemid[index])
				this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame);
			}
		}
		/**选择技能书*/
		public selectskillbook(cell: Box, index: number): void {
			let num: Array<number> = [];
			let bag: game.modules.bag.models.BagVo = BagModel.getInstance().bagMap[1];//获取背包中技能书		
			if (this.lastbox) {//是否多次选择
				let lastbtn: Button = this.lastbox.getChildByName("selectskill_btn") as Button
				lastbtn.selected = false
			}
			let btn: Button = cell.getChildByName("selectskill_btn") as Button;
			btn.selected = true
			this.lastbox = cell
			for (var id = 0; id < bag.items.length; id++) {
				let item: game.modules.bag.models.ItemVo = bag.items[id];
				let skillbase: PetItemEffectBaseVo = BagModel.getInstance().petItemEffectData[this.itemid[index]];
				if (item.id == this.itemid[index] && item.id >= 109008) {//是否拥有该道具
					num[0] = skillbase.petskillid;
					num[1] = item.key;
					break;
				}
			}
			models.PetProxy.getInstance().event(models.STUDYPETSELECT_EVENT, [num[0], num[1]]);
		}
		public hide(): void {
			if (this.lastbox) {
				let lastbtn: Button = this.lastbox.getChildByName("selectskill_btn") as Button
				lastbtn.selected = false
			}
			models.PetProxy.getInstance().off(models.REFRESH_EVENT, this, this.init);
			super.hide();
		}
		public getView(): Sprite {
			return this._viewUI;
		}
	}
}