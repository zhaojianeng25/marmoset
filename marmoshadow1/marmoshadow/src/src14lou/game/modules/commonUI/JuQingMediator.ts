/**
* 任务进行对话
*/
module game.modules.commonUI{
	export class JuQingMediator extends game.modules.UiMediator{
		private _viewUI:ui.common.component.juqingUI;
		/**宠物选择界面*/
		private petselectUI:game.modules.commonUI.PetChooseMediator;
		//对话内容	
		public dialoglist:Array<string>=[];
		//对话NPCid
		public npcidlist:Array<number>=[];
		/**当前对话id*/
		public currentid:number = 0;
		/**npckey*/
		public npckey:number;
		/**服务id*/
		public serviceid:number;
		/**任务上交界面*/
		private itemsubmit:game.modules.task.TaskItemChooseMediator;
		/**任务类型*/
		public tasktype:number;
		/**任务提交id*/
		public tasksubmit:number;
		/**对话延迟时间*/
		public timersecond:number;
		/**是否点击进行下一次对话*/
		public isclick:number
		constructor(app:AppBase){
			super(app.uiRoot.general);
			this._viewUI = new ui.common.component.juqingUI();
			this._viewUI.mouseThrough = true;
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;			
			this._viewUI.bk_img.on(LEvent.MOUSE_DOWN,this,this.continue);
		}
		public init(service:number,npckey:number,tasktalk?:Array<string>,tasknpcid?:Array<number>):void{//服务ID,npckey,对话，对话NPC  有些对话需要战斗后才能进行的
			this.show();
			//从服务中初始化
			this.tasksubmit= 0
			this.timersecond = 0
			this.isclick = 0
			this.npckey = npckey;
			this.serviceid = service;
			if(tasktalk && tasktalk.length!=0){//有数据不需要从服务对话表里面取
				this.dialoglist= tasktalk
				this.npcidlist = tasknpcid
				this.tasksubmit= 0
			}
			else{
				this.tasksubmit= 1
				let mission:MissionCMainMissionInfoBaseVo = game.modules.task.models.TaskModel.getInstance().missionCMainMissionInfoData[service];
				if(mission.ScenarioInfoFinishConversationList.length!=0){
					this.dialoglist = mission.ScenarioInfoFinishConversationList;
					this.npcidlist = mission.ScenarioInfoFinishNpcID
				}
				else{
					this.dialoglist = mission.ScenarioInfoNpcConversationList;
					this.npcidlist = mission.ScenarioInfoNpcID
				}
				this.tasktype = mission.MissionType
			}			
			if(this.dialoglist.length!=0){//对话内容
				this._viewUI.juqing_html.innerHTML = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(this.dialoglist[0],game.modules.createrole.models.LoginModel.getInstance().roleDetail.rolename,10) ;		
				 this._viewUI.juqing_html.y = (this._viewUI.juqing_html.height - this._viewUI.juqing_html.contextHeight)/2;
			}
			this.currentid = 0;		
			if(this.npcidlist.length==0 && this.tasktype == 40){//进入战斗
				RequesterProtocols._instance.c2s_active_mission_ai_battle(this.serviceid,this.npckey,0);
				this.hide();
				return
			}
			if(this.npcidlist.length==0 &&(this.tasktype==56 || this.tasktype == 12)){//上交物品不需要对话
				RequesterProtocols._instance.c2s_commit_mission(this.serviceid,this.npckey,0);
				this.hide();
				return
			}
			if(this.npcidlist[0]==1){//主角ICON
				console.log(game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape)
				this._viewUI.roleicon_img.skin ="common/icon/bustrole/"+(game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape+10000)+".png"
				this._viewUI.npcname_lab.text = game.modules.createrole.models.LoginModel.getInstance().roleDetail.rolename
			}//NPCicon
			else{			
				let npcinfo:CNPCConfigBaseVo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[this.npcidlist[0]];
				let npcshape:CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[npcinfo.modelID];
				if(npcshape.headID<10500){
					this._viewUI.roleicon_img.skin = "common/icon/bustrole/"+npcshape.headID+".png"
				}
				else if(npcshape.headID <11000){
					this._viewUI.roleicon_img.skin = "common/icon/bustmonster/"+npcshape.headID+".png"
				}
				else if(npcshape.headID<11200){
					this._viewUI.roleicon_img.skin = "common/icon/bustpartner/"+npcshape.headID+".png"
				}
				else{
					this._viewUI.roleicon_img.skin = "common/icon/bustpet/"+npcshape.headID+".png"
				}			
				this._viewUI.npcname_lab.text = npcinfo.name
			}			
			
			this._viewUI.move1_box.y +=400
			Laya.Tween.to(this._viewUI.move1_box,{y:906},1000,null,Laya.Handler.create(this,function(){}),null,false)
			this._viewUI.move2_box.y +=400
			Laya.Tween.to(this._viewUI.move2_box,{y:969},1000,null,Laya.Handler.create(this,function(){}),null,false)
			this._viewUI.neirong_box.y +=400
			Laya.Tween.to(this._viewUI.neirong_box,{y:1035},1000,null,Laya.Handler.create(this,function(){}),null,false)
			this._viewUI.iconmove_box.x -=200
			Laya.Tween.to(this._viewUI.iconmove_box,{x:5},1000,null,Laya.Handler.create(this,function(){Laya.timer.loop(1000,this,this.delayplay);this.isclick=1}),null,false)
		}
		public continue():void{//剧情谈话
			if(this.isclick==0)
				return;
			this.currentid+=1;
			this.timersecond = 0
			if(this.currentid>=this.dialoglist.length || this.currentid>=this.npcidlist.length){//判断对话到哪个地步
				if(this.serviceid >=180000&& this.serviceid<=190000){//主线任务服务
					let info:MissionCMainMissionInfoBaseVo = Taskmodels.getInstance().missionCMainMissionInfoData[this.serviceid]
					if(info.RewardOption==2){
						game.modules.task.models.TaskProxy.getInstance().on(game.modules.task.models.SELECTPET,this,this.selectaddpet)
						this.petselectUI = new game.modules.commonUI.PetChooseMediator(this._app);
						this.petselectUI.init(info.RewardItemIDList[0],info.RewardItemIDList[1]);
					}
					else if(info.MissionType==40){//进入战斗。。现跳过战斗
						RequesterProtocols._instance.c2s_active_mission_ai_battle(this.serviceid,this.npckey,0);		
					}
					else if(info.MissionType == 12){//显示提交道具的界面		
						if(this.tasksubmit ==0){
							this.itemsubmit = new game.modules.task.TaskItemChooseMediator(this._app)
							let itemidlist:Array<number>=[]						
							itemidlist.push(info.ActiveInfoTargetID)
							this.itemsubmit.init(itemidlist)
						}				
						else{
							RequesterProtocols._instance.c2s_commit_mission(this.serviceid,this.npckey,0);
						}
					}
					else{
						RequesterProtocols._instance.c2s_commit_mission(this.serviceid,this.npckey,0);
					}
				}
				else{
					RequesterProtocols._instance.c2s_commit_mission(this.serviceid,this.npckey,0);
				}				
				this.hide();
				game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.SHOW_MAINHUD_AGAIN);
				game.modules.mainhud.models.HudModel.getInstance().autobatt.stop()
				Laya.timer.clear(this,this.delayplay)
			}
			else{
				this._viewUI.juqing_html.innerHTML = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(this.dialoglist[this.currentid],game.modules.createrole.models.LoginModel.getInstance().roleDetail.rolename,10)
				 this._viewUI.juqing_html.y = (this._viewUI.juqing_html.height - this._viewUI.juqing_html.contextHeight)/2;
				if(this.npcidlist[this.currentid]==1){//主角ICON
					this._viewUI.roleicon_img.skin ="common/icon/bustrole/"+(game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape+10000)+".png"
					this._viewUI.npcname_lab.text = game.modules.createrole.models.LoginModel.getInstance().roleDetail.rolename
				}//NPCicon
				else{
					let npcinfo:CNPCConfigBaseVo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[this.npcidlist[this.currentid]];				
					let npcshape:CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[npcinfo.modelID];
					if(npcshape.headID<10500){
						this._viewUI.roleicon_img.skin = "common/icon/bustrole/"+npcshape.headID+".png"
					}
					else if(npcshape.headID <11000){
						this._viewUI.roleicon_img.skin = "common/icon/bustmonster/"+npcshape.headID+".png"
					}
					else if(npcshape.headID<11200){
						this._viewUI.roleicon_img.skin = "common/icon/bustpartner/"+npcshape.headID+".png"
					}
					else{
						this._viewUI.roleicon_img.skin = "common/icon/bustpet/"+npcshape.headID+".png"
					}					
					this._viewUI.npcname_lab.text = npcinfo.name	
				}
			}
		}

		/**剧情添加宠物 */
		public selectaddpet(petid:number):void{
			this.petselectUI.hide();
			RequesterProtocols._instance.c2s_commit_mission(this.serviceid,this.npckey,petid);
		}
		public show() {
			super.show();
		}
		public hide():void {
			super.hide();
		}
		
		public getView():Sprite {
			return this._viewUI;
		}
		//对话几秒进行一次
		public delayplay(){
			this.timersecond+=1
			if(this.timersecond>=5){
				this.continue();
			}
		}
	}
}