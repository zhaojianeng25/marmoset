
module game.modules.pet{	
	/*** 宠物洗练确认 */
	export class PetXiLianQueRenMediator  extends game.modules.UiMediator{
		private _viewUI:ui.common.PetXiLianQueRenUI;
		/**消息提示*/
		private _tipsModule:game.modules.tips.tipsModule;
		constructor(uiLayaer:Sprite){
			super(uiLayaer);
			this._viewUI = new ui.common.PetXiLianQueRenUI();
			this._viewUI.mouseThrough = true;
			this.isCenter = false;
		}
		public show():void {
			super.show();
		}
		/**初始化数据*/
		public init(textid:number,parame?:string):void{//文本id
			this.show()
			this._viewUI.queding_btn.on(LEvent.MOUSE_DOWN,this,this.queren);
			this._viewUI.quxiao_btn.on(LEvent.MOUSE_DOWN,this,this.quxiao);
			if(textid==11532){//是否为满技能洗练 11532满技能提示
				let chattext:CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[textid]
				//let text:CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11401]
				let petdata:PetInfoVo = PetModel._instance.petbasedata
				let pets:PetCPetAttrBaseVo = PetModel._instance.petCPetAttrData[petdata.id]
				// if(petdata.kind==5 || (pets.unusualid==1 && petdata.kind == 4)){//变异的
				// 	this._viewUI.text1_html.innerHTML = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(chattext.msg,petdata.name,11)
				// }
				// else{
				// 	this._viewUI.text1_html.innerHTML = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(chattext.msg,text.msg+petdata.name,11)
				// }
				this._viewUI.text1_html.innerHTML = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(chattext.msg,petdata.name,11);				
				this._viewUI.text_html.visible = false
				this._viewUI.text1_html.visible = true
				this._viewUI.skill_list.visible = true
				let petCPetAttrBaseVo:PetCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[PetModel._instance.petbasedata.id] as PetCPetAttrBaseVo;
				//所有技能ID
				var data:Array<any>=[]
				for (var index = 0; index < petCPetAttrBaseVo.skillid.length; index++) {
					let petskill:PetSkillConfigBaseVo = PetModel.getInstance().petSkillConfigData[petCPetAttrBaseVo.skillid[index]] as PetSkillConfigBaseVo;
					data.push({skill_img:"common/icon/skill/"+petskill.icon+".png"})
				}
				this._viewUI.skill_list.array = data
				this._viewUI.skill_list.repeatX = data.length
				this._viewUI.skill_list.renderHandler = new Laya.Handler(this,this.initskill)
			}
			else{				
				this._viewUI.text_html.visible = true
				this._viewUI.text1_html.visible = false
				this._viewUI.skill_list.visible = false
				let chattext:CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[textid];
				this._viewUI.text_html.innerHTML = chattext.msg
			}		
		}
		/**初始化技能响应事件*/
		public initskill(cell:Box,index:number):void{
			let img:Laya.Image = cell.getChildByName("skill_img") as Laya.Image
			img.on(LEvent.MOUSE_DOWN,this,this.skilltips,[index])	
		}
		/**技能tips*/
		public skilltips(index:number):void{
			let petdata:PetInfoVo = PetModel._instance.petbasedata
			let pets:PetCPetAttrBaseVo = PetModel._instance.petCPetAttrData[petdata.id]
			var parame:Dictionary = new Dictionary();
			parame.set("itemId", pets.skillid[index])
			this._tipsModule = new game.modules.tips.tipsModule(this._viewUI,this._app,TIPS_TYPE.SKILL,parame);
		}
		public hide():void {
			super.hide();
		}		
		public getView():Sprite {
			return this._viewUI;
		}
		/**取消洗练*/
		public quxiao():void{
			game.modules.pet.models.PetProxy.getInstance().event(game.modules.pet.models.CANCEL)
			this.hide()
		}
		/**确定洗练*/
		public queren():void{
			game.modules.pet.models.PetProxy.getInstance().event(game.modules.pet.models.QUEDING)
			this.hide()
		}
	}
}