/** 战斗失败界面
* by ljm 
*/
module game.modules.commonUI{
	export class BattleFaildMediator extends game.modules.UiMediator{
		private _viewUI:ui.common.LoseUI;
		/** 死亡提醒 */
		private deatNote:{[key:number]:CDeathNoteBaseVo} = {}
		constructor(app:AppBase){
			super(app.uiRoot.general);
			this._viewUI = new ui.common.LoseUI();
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;	
			this._viewUI.mengban_img.on(LEvent.CLICK,this,this.hide);	
			this.deatNote = game.modules.guaji.models.GuaJiModel.getInstance().deatNote;
		}
		public show() {
			super.show();	
			this.suggestGo();	
		}
		suggestGo():void
		{
			let levelNum = HudModel.getInstance().levelNum;
			this.hideAll();
			let petNum = game.modules.pet.models.PetModel.getInstance().pets.keys.length;
			if(levelNum >=10 && levelNum <14)
			{//小于等于14
				this.setBtnAttr(this._viewUI.suggesst1_btn,this._viewUI.suggesst1_lab,"common/ui/mainhud/main_active.png",ModuleNames.ACTIVITY,1)
				this.setBtnAttr(this._viewUI.suggesst2_btn,this._viewUI.suggesst2_lab,"common/ui/mainhud/main_team.png",ModuleNames.Team,4)
				if(petNum >= 1)
				{
					this.setBtnAttr(this._viewUI.suggesst3_btn,this._viewUI.suggesst3_lab,"common/ui/mainhud/battle_call.png",ModuleNames.PET,5)
				}
			}else if(levelNum >= 14 && levelNum <= 31)
			{
				if(petNum >= 1)
				{
					this.setBtnAttr(this._viewUI.suggesst1_btn,this._viewUI.suggesst1_lab,"common/ui/mainhud/main_skill.png",ModuleNames.SKILL,2,1);
					this.setBtnAttr(this._viewUI.suggesst2_btn,this._viewUI.suggesst2_lab,"common/ui/mainhud/main_helper.png",ModuleNames.HUOBAN,3);
					this.setBtnAttr(this._viewUI.suggesst3_btn,this._viewUI.suggesst3_lab,"common/ui/mainhud/main_team.png",ModuleNames.Team,4);
					this.setBtnAttr(this._viewUI.suggesst4_btn,this._viewUI.suggesst4_lab,"common/ui/mainhud/battle_call.png",ModuleNames.PET,5);
				}else 
				{
					this.setBtnAttr(this._viewUI.suggesst2_btn,this._viewUI.suggesst2_lab,"common/ui/mainhud/main_skill.png",ModuleNames.SKILL,2,1);
					this.setBtnAttr(this._viewUI.suggesst3_btn,this._viewUI.suggesst3_lab,"common/ui/mainhud/main_helper.png",ModuleNames.HUOBAN,3);
					this.setBtnAttr(this._viewUI.suggesst4_btn,this._viewUI.suggesst4_lab,"common/ui/mainhud/main_team.png",ModuleNames.Team,4);
					this.setBtnAttr(this._viewUI.suggesst1_btn,this._viewUI.suggesst1_lab,"common/ui/mainhud/main_active.png",ModuleNames.ACTIVITY,1);
				}
			}else if(levelNum == 32)
			{
				if(petNum >= 1)
				{
					this.setBtnAttr(this._viewUI.suggesst3_btn,this._viewUI.suggesst3_lab,"common/ui/mainhud/battle_call.png",ModuleNames.PET,5);
					this.setBtnAttr(this._viewUI.suggesst1_btn,this._viewUI.suggesst1_lab,"common/ui/mainhud/main_helper.png",ModuleNames.HUOBAN,3);
					this.setBtnAttr(this._viewUI.suggesst2_btn,this._viewUI.suggesst2_lab,"common/ui/mainhud/main_team.png",ModuleNames.Team,4);
					this.setBtnAttr(this._viewUI.suggesst4_btn,this._viewUI.suggesst4_lab,"common/ui/mainhud/main_streng1.png",ModuleNames.STRENG_THENING,6,0);
				}else
				{
					this.setBtnAttr(this._viewUI.suggesst1_btn,this._viewUI.suggesst1_lab,"common/ui/mainhud/main_skill.png",ModuleNames.SKILL,2,1);
					this.setBtnAttr(this._viewUI.suggesst2_btn,this._viewUI.suggesst2_lab,"common/ui/mainhud/main_helper.png",ModuleNames.HUOBAN,3);
					this.setBtnAttr(this._viewUI.suggesst3_btn,this._viewUI.suggesst3_lab,"common/ui/mainhud/main_team.png",ModuleNames.Team,4);
					this.setBtnAttr(this._viewUI.suggesst4_btn,this._viewUI.suggesst4_lab,"common/ui/mainhud/main_streng1.png",ModuleNames.STRENG_THENING,6,0);
				}	
			}else if(levelNum >= 33 && levelNum < 40)
			{
				if(petNum >= 1)
				{
					this.setBtnAttr(this._viewUI.suggesst2_btn,this._viewUI.suggesst2_lab,"common/ui/mainhud/battle_call.png",ModuleNames.PET,5);
					this.setBtnAttr(this._viewUI.suggesst3_btn,this._viewUI.suggesst3_lab,"common/ui/mainhud/main_streng1.png",ModuleNames.STRENG_THENING,6,0);
					this.setBtnAttr(this._viewUI.suggesst1_btn,this._viewUI.suggesst1_lab,"common/ui/mainhud/main_team.png",ModuleNames.Team,4);
					this.setBtnAttr(this._viewUI.suggesst4_btn,this._viewUI.suggesst4_lab,"common/ui/mainhud/main_streng1.png",ModuleNames.STRENG_THENING,7,1);
				}else
				{
					this.setBtnAttr(this._viewUI.suggesst2_btn,this._viewUI.suggesst2_lab,"common/ui/mainhud/main_team.png",ModuleNames.Team,4);
					this.setBtnAttr(this._viewUI.suggesst1_btn,this._viewUI.suggesst1_lab,"common/ui/mainhud/main_helper.png",ModuleNames.HUOBAN,3);
					this.setBtnAttr(this._viewUI.suggesst3_btn,this._viewUI.suggesst3_lab,"common/ui/mainhud/main_streng1.png",ModuleNames.STRENG_THENING,6,0);
					this.setBtnAttr(this._viewUI.suggesst4_btn,this._viewUI.suggesst4_lab,"common/ui/mainhud/main_streng1.png",ModuleNames.STRENG_THENING,7,1);
				}	
			}else if(levelNum >= 40 && levelNum < 55 )
			{
				if(petNum >= 1)
				{
					this.setBtnAttr(this._viewUI.suggesst1_btn,this._viewUI.suggesst1_lab,"common/ui/mainhud/battle_call.png",ModuleNames.PET,5);
				}else
				{
					this.setBtnAttr(this._viewUI.suggesst1_btn,this._viewUI.suggesst1_lab,"common/ui/mainhud/main_team.png",ModuleNames.Team,4);
				}
				    this.setBtnAttr(this._viewUI.suggesst2_btn,this._viewUI.suggesst2_lab,"common/ui/mainhud/main_streng1.png",ModuleNames.STRENG_THENING,6,0);
					this.setBtnAttr(this._viewUI.suggesst3_btn,this._viewUI.suggesst3_lab,"common/ui/mainhud/main_streng1.png",ModuleNames.STRENG_THENING,7,1);
					this.setBtnAttr(this._viewUI.suggesst4_btn,this._viewUI.suggesst4_lab,"common/ui/mainhud/main_streng1.png",ModuleNames.STRENG_THENING,9,2);
			}else if(levelNum >= 55)
			{
				    this.setBtnAttr(this._viewUI.suggesst1_btn,this._viewUI.suggesst1_lab,"common/ui/mainhud/main_streng1.png",ModuleNames.STRENG_THENING,6,0);
					this.setBtnAttr(this._viewUI.suggesst2_btn,this._viewUI.suggesst2_lab,"common/ui/mainhud/main_streng1.png",ModuleNames.STRENG_THENING,7,1);
					this.setBtnAttr(this._viewUI.suggesst3_btn,this._viewUI.suggesst3_lab,"common/ui/mainhud/main_skill.png",ModuleNames.SKILL,8,3);
					this.setBtnAttr(this._viewUI.suggesst4_btn,this._viewUI.suggesst4_lab,"common/ui/mainhud/main_streng1.png",ModuleNames.STRENG_THENING,9,2);
			}

		}
		/** 设置按钮的事件和属性
		 * @param btn 设置目标
		 * @param label 设置Label
		 * @param skin 按钮skin
		 * @param _toModule 点击模块
		 * @param desc 描述编号
		 * @param ziInter 子页面
		 */
		setBtnAttr(btn:Laya.Button,label:Laya.Label,skin:string,_toModule:string,desc:number,ziInter?:number):void
		{
			btn.visible = true;
			btn.skin = skin;
			btn.on(LEvent.CLICK,this,this._toModule,[_toModule,ziInter]);
			label.text = this.deatNote[desc].text;
		}
		/** 显示模块
		 * @param _toModule 模块名称
		 * @param ziInter 子页面
		 */
		_toModule(_toModule:string,ziInter:number = -1):void
		{
		    let levelNum = HudModel.getInstance().levelNum;
			if(_toModule == ModuleNames.ACTIVITY)
			{
				if(levelNum < 19)
				{
					let disappear  = new DisappearMessageTipsMediator(this._app);
					let prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.ACTIVITY_LEVEL_LIMIT);
					disappear.onShow(prompt);
				}
				else ModuleManager.show(_toModule,this._app);
			}else if(_toModule == ModuleNames.SKILL && ziInter != -1 )
			{
				game.modules.skill.models.SkillModel.getInstance().currenTabNum = ziInter;
				ModuleManager.show(_toModule,this._app);
			}else if(_toModule == ModuleNames.STRENG_THENING && ziInter != -1)
			{
				strengThening.models.StrengTheningModel.getInstance().tabNum = ziInter;
				ModuleManager.show(_toModule,this._app);
			}else 
			ModuleManager.show(_toModule,this._app);
		}
		hideAll():void
		{
			this._viewUI.suggesst1_btn.visible = false;
			this._viewUI.suggesst2_btn.visible = false;
			this._viewUI.suggesst3_btn.visible = false;
			this._viewUI.suggesst4_btn.visible = false;
		}
		public hide(){
			super.hide()
		}
		public getView():Sprite {
			return this._viewUI;
		}
	}
}