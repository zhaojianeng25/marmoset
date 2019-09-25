/**
* 宠物详情界面
*/
module game.modules.pet{
	export class PetXiangQingMediator  extends game.modules.UiMediator{
		private _viewUI:ui.common.PetXiangQingUI;
		/**宠物种类图片*/
		public kind:Array<string>=["common/ui/pet/chongwu_yesheng.png","common/ui/pet/chongwu_bb.png",
									"common/ui/pet/chongwu_bianyi.png","common/ui/pet/baobaolingshou.png",
									"common/ui/pet/bianyilingshou.png","common/ui/pet/chongwu_shenshou.png"];
		/**模型创建*/
		public model:ModelsCreate;
		/**tips信息*/
		private _tipsModule:game.modules.tips.tipsModule;
		/**所有技能信息*/
		public skillinfo:Array<game.modules.pet.models.PetSkillVo>
		/**模型场景*/
		private scene2DPanel:TestRole2dPanel
		constructor(app:AppBase){
			super(app.uiRoot.general);
			this._viewUI = new ui.common.PetXiangQingUI();
			this._viewUI.mouseThrough = true;
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN,this,this.hide)
			this.model = new ModelsCreate()
			this.scene2DPanel=new TestRole2dPanel()
			this._viewUI.pet_img.addChild(this.scene2DPanel)
			this.scene2DPanel.ape.x=100
			this.scene2DPanel.ape.y=200
		}
		/**模型创建*/
		modelcreate(modelid:number):void{
			if(this.model.role3d){//是否已有模型
				this.scene2DPanel.removeSceneChar(this.model.role3d)
			}			
			this.model.role3d = new YxChar3d();
			this.model.role3d.setRoleUrl(getRoleUrl(modelid+""));
			this.model.role3d.set2dPos((this._viewUI.pet_img.x+this._viewUI.bk_img.width/2*1.5+this._viewUI.bk_img.x)*this._viewUI.globalScaleX,(this._viewUI.pet_img.y+this._viewUI.bk_img.height/4*3.5+this._viewUI.bk_img.y)*this._viewUI.globalScaleY);  //坐标
			this.model.role3d.scale=1;
			this.model.role3d.rotationX = 0
			this.model.role3d.rotationY=135				
			this.scene2DPanel.addSceneChar(this.model.role3d)	
		}
		/**初始化宠物信息*/
		public init(petinfo:game.modules.pet.models.PetInfoVo):void{
			this.show()	
			this.scene2DPanel.ape.x=this._viewUI.x*this._viewUI.globalScaleX
		    this.scene2DPanel.ape.y=this._viewUI.y*this._viewUI.globalScaleY
			let chattext:CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[1]
			let petdata:PetCPetAttrBaseVo = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[petinfo.id]
			this.modelcreate(petdata.modelid)
			this._viewUI.pingfen_lab.text = petinfo.petscore+""
			this._viewUI.petlv_lab.text = chattext.msg+petinfo.level
			if(petinfo.unusualid==1)//是否稀有
				this._viewUI.petbb_img.skin=this.kind[petinfo.kind+petdata.unusualid];
			else
				this._viewUI.petbb_img.skin=this.kind[petinfo.kind+petdata.unusualid-1];
			this._viewUI.shengming_lab.text = petinfo.hp+""
			this._viewUI.wulishanghai_lab.text = petinfo.attack+""
			this._viewUI.wulifangyu_lab.text = petinfo.defend + ""
			this._viewUI.fashushanghai_lab.text = petinfo.magicattack +""
			this._viewUI.fashufangyu_lab.text = petinfo.magicdef + ""
			this._viewUI.speed_lab.text = petinfo.speed +""
			this._viewUI.tizhi_lab.text = petinfo.initbfp.cons + ""
			this._viewUI.zhili_lab.text = petinfo.initbfp.iq + ""
			this._viewUI.power_lab.text = petinfo.initbfp.str + ""
			this._viewUI.naili_lab.text = petinfo.initbfp.endu + ""
			this._viewUI.minjie_lab.text = petinfo.initbfp.agi + ""
			this._viewUI.qianli_lab.text = petinfo.point + ""
			this._viewUI.tizhiadd_lab.text = petinfo.bfp.cons - petinfo.initbfp.cons + ""
			this._viewUI.zhiliadd_lab.text = petinfo.bfp.iq - petinfo.initbfp.iq + ""
			this._viewUI.poweradd_lab.text = petinfo.bfp.str - petinfo.initbfp.str + ""
			this._viewUI.nailiadd_lab.text = petinfo.bfp.endu - petinfo.initbfp.endu + ""
			this._viewUI.minjieadd_lab.text = petinfo.bfp.agi - petinfo.initbfp.agi + ""
			this._viewUI.gongji_lab.text = petinfo.attackapt + ""
			this._viewUI.fangyu_lab.text = petinfo.defendapt + ""
			this._viewUI.fashu_lab.text = petinfo.magicapt + ""
			this._viewUI.speedzizhi_lab.text = petinfo.speedapt + ""
			this._viewUI.tili_lab.text = petinfo.phyforceapt + ""
			this._viewUI.chengzhang_lab.text = petinfo.growrate/1000+""
			this._viewUI.attack_pro.value = (petinfo.attackapt-petdata.attackaptmin)/(petdata.attackaptmax-petdata.attackaptmin)
			this._viewUI.def_pro.value = (petinfo.defendapt-petdata.defendaptmin)/(petdata.defendaptmax-petdata.defendaptmin)
			this._viewUI.magic_pro.value = (petinfo.magicapt-petdata.magicaptmin)/(petdata.magicaptmax-petdata.magicaptmin)
			this._viewUI.phy_pro.value = (petinfo.phyforceapt-petdata.phyforceaptmin)/(petdata.phyforceaptmax-petdata.phyforceaptmin)
			this._viewUI.speed_pro.value = (petinfo.speedapt-petdata.speedaptmin)/(petdata.speedaptmax-petdata.speedaptmin)
			if(petdata.growrate[6]==petdata.growrate[0]){//是否满成长
				this._viewUI.progress_pro.value = 1
			}
			else{
				this._viewUI.progress_pro.value = (petinfo.growrate-petdata.growrate[0])/(petdata.growrate[6]-petdata.growrate[0])
			}			
			if(petinfo.life==-1){//永生
				chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11548]
				this._viewUI.petshouming_lab.text = chattext.msg
			}
			else{
				this._viewUI.petshouming_lab.text = petinfo.life+""
			}
			this._viewUI.zizhiyingsha_lab.text = petinfo.aptaddcount+""
			this._viewUI.shouwanggangyao_lab.text = petinfo.growrateaddcount + ""
			this.skillinfo = petinfo.skills
			this.initpetlist(petinfo.skills)
		}
		/**初始化技能列表*/
		public initpetlist(skills:Array<game.modules.pet.models.PetSkillVo>):void{
			var data:Array<any>=[]
			for (var index = 0; index < 12; index++) {
				if(index<skills.length){//是否拥有技能
					let petskill:PetSkillConfigBaseVo = PetModel.getInstance().petSkillConfigData[skills[index].skillId] as PetSkillConfigBaseVo;
					if(petskill.skilltype==1){	//1被动 2主动			
						data.push({skillkuang_img:"common/ui/pet/beiji"+petskill.color+".png",skillicon_img:"common/icon/skill/"+petskill.icon+".png",bangding_img:""});
					}						
					else{				
						data.push({skillkuang_img:"common/ui/pet/zhuji"+petskill.color+".png",skillicon_img:"common/icon/skill/"+petskill.icon+".png",bangding_img:""});
					}
				}
				else{
					data.push({skillkuang_img:"common/ui/tongyong/kuang94.png",skillicon_img:""});	
				}				
			}
			this._viewUI.skill_list.array = data
			this._viewUI.skill_list.repeatY = data.length
			this._viewUI.skill_list.vScrollBarSkin = ""
			this._viewUI.skill_list.scrollBar.elasticBackTime = 200
			this._viewUI.skill_list.scrollBar.elasticDistance = 100
			this._viewUI.skill_list.renderHandler = new Laya.Handler(this,this.initskill)
		}
		public show():void {
			super.show();
		}
		public hide():void {
			super.hide();
			if(LoginModel.getInstance().CommonPage != "")//是否从其他界面跳转
			{
				ModuleManager.show(LoginModel.getInstance().CommonPage,this._app);
				LoginModel.getInstance().CommonPage = "";
			}
		}		
		public getView():Sprite {
			return this._viewUI;
		}
		/**初始化技能响应事件*/
		public initskill(cell:Box,index:number):void{
			let img:Laya.Image = cell.getChildByName("skillicon_img") as Laya.Image
			img.on(LEvent.MOUSE_DOWN,this,this.skilltips,[index])
		}
		/**技能tips*/
		public skilltips(index:number):void{
			if(index<this.skillinfo.length){//是否有效技能栏
				var parame:Dictionary = new Dictionary();
				parame.set("itemId",this.skillinfo[index].skillId)
				this._tipsModule = new game.modules.tips.tipsModule(this._viewUI,this._app,TIPS_TYPE.SKILL,parame);
			}		
		}
	}
}