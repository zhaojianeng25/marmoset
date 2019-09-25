/**Rename.ui */
// import RenWuShuoMingUI = ui.common.component.RenWuShuoMingUI;
module game.modules.commonUI {
    export class TaskDescriberMediators extends game.modules.UiMediator {
        /**提示界面选择界面 */
        private _viewUI: ui.common.component.RenWuShuoMingUI;
        /** 飘窗提示界面 */
        private DisappearMessageTipsMediator:game.modules.commonUI.DisappearMessageTipsMediator;
        /**提示界面的单例 */
        public static _instance: TaskDescriberMediators;
        /** 改名符的key */
        private renameKey:number;
        constructor(app: AppBase)
        {
            super(app.uiRoot.general);
            this.uiLayer = app.uiRoot.general;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
            this._app = app; 
			this._viewUI = new ui.common.component.RenWuShuoMingUI();
            this._viewUI.mouseThrough = true;
            this.isCenter = true;
        }
        public static getInstance(app: AppBase): TaskDescriberMediators {
            if (!this._instance) {
                this._instance = new TaskDescriberMediators(app);
            }
            return this._instance;
        }

        ////////////////
        ///业务逻辑
        ////////////////
        /**
         * @describe  改名卡
         *  
         */
        public onShow(displayInfo:any): void {
           
            super.show();
            this.onLoad(displayInfo);
            this.registEvent();
        }
        /** 初始化数据 */
        private onLoad(displayInfo:chat.models.DisplayInfoVo):void
        {
            let taskId = displayInfo.uniqid;
            if(taskId >= 1010000 && taskId <= 2000000)
            {/** 师门任务 */
                let info:game.modules.task.models.SRefreshSpecialQuestVo = Taskmodels.getInstance().schooltask.get(taskId);
				let schoolinfo:CRepeatTaskBaseVo = Taskmodels.getInstance().cRepeatTaskData[info.questtype];	
				let titleinfo:string = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(schoolinfo.strtasktitletrack,info.round,2);
				let allcount:CSchoolTaskBaseVo = game.modules.task.models.TaskModel.getInstance().cSchoolTaskData[schoolinfo.nacceptchatid]	;
                let mapinfo:WorldMapConfigBaseVo = game.modules.mapworld.models.MapModel.getInstance().WorldMapConfigData[info.dstmapid]
				let npcinfo:CNPCConfigBaseVo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[info.dstnpcid];
				let petinfo:PetCPetAttrBaseVo = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[info.dstitemid]	
				let iteminfo:ItemAttrBaseVo = game.modules.bag.models.BagModel.getInstance().itemAttrData[info.dstitemid]
                let content:string = schoolinfo.strtaskdes;
                let title:string = schoolinfo.strtasktitle;
				if(allcount)
				 {
					titleinfo =game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(titleinfo,allcount.maxnum,7);
				 }
                 this._viewUI.taskname_lab.text = titleinfo;
                 if(mapinfo){//地图
						title=game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(title,mapinfo.mapName,3);
						content=game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content,mapinfo.mapName,3);	
					}
					if(npcinfo){//npc
                        title = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(title,npcinfo.name,4);
						content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content,npcinfo.name,4);	
					}	
					if(petinfo){//宠物
						title = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(title,petinfo.name,5);
						content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content,petinfo.name,5);	
					}	
					if(iteminfo){//道具
						title = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(title,iteminfo.name,6);
						content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content,iteminfo.name,6);	
						if(info.dstitemid2!=0){
							content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content,info.dstitemid2,9);
							//去背包查看是否有该道具
							
							let ishave:number = 0;
							console.log(game.modules.bag.models.BagModel.getInstance().bagMap[1])
							if(iteminfo.itemtypeid == 25){
								let bag:game.modules.bag.models.BagVo = game.modules.bag.models.BagModel.getInstance().bagMap[5]
								for (var index = 0; index < bag.items.length; index++) {
									let item:game.modules.bag.models.ItemVo = bag.items[index]
									if(item.id==info.dstitemid){
									content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content,item.number,8);
									ishave =1 ;
									break;
									}
								}
							}
							else{
								let bag:game.modules.bag.models.BagVo = game.modules.bag.models.BagModel.getInstance().bagMap[1]
								for (var index = 0; index < bag.items.length; index++) {
									let item:game.modules.bag.models.ItemVo = bag.items[index]
									if(item.id==info.dstitemid){
									content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content,item.number,8);
									ishave =1 ;
									break;
									}
								}
							}
							if(ishave==0){
								content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content,0,8);
							}
						}							
					}	
                    this._viewUI.taskjieshao_lab.innerHTML = title;
                    this._viewUI.taskmiaoshu_lab.innerHTML = content;
            }else
            {/** 主线和支线任务 */
				// this._viewUI.taskname_lab.text = info.MissionName;
                let maintasks:MissionCMainMissionInfoBaseVo = Taskmodels.getInstance().missionCMainMissionInfoData[taskId];
				let accept:game.modules.task.models.MissionInfoVo = Taskmodels.getInstance().maintask.get(taskId);
				this._viewUI.taskname_lab.text = maintasks.MissionName;
				this._viewUI.taskmiaoshu_lab.innerHTML  = maintasks.TaskInfoDescriptionListA; // game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(maintasks.TaskInfoTraceListA,accept.missionvalue,2);
				this._viewUI.taskjieshao_lab.innerHTML  =  maintasks.TaskInfoPurposeListA ;//game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(maintasks.TaskInfoDescriptionListA,accept.missionvalue,2);
				
			
					
				
            }
          
        }
        private registEvent():void
        {
           this._viewUI.close_btn.on(LEvent.MOUSE_DOWN,this,this.hide);
        }
        
       
        public hide(): void {
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }
       
        ////////////////
        ///UI
        ////////////////

        /**
         * @describe  设置提示语
         * @param prompt   提示语
         */

      

       


        ////////////////
        ///事件
        ////////////////

       
    }
}