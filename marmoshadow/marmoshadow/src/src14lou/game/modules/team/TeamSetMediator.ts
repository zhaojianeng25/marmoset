/**
* name 
*/
module game.modules.team{
	enum TeamSetType
	{
		STORY_TASK = 1,			//剧情任务
		DAILY_FUBEN = 3,		//日常副本
		SUPERIOR_FUBEN = 4,		//精英副本
		TIME_ACTIVITY = 5,		//定时活动
		FAMILY_ACTIVITY = 6,	//帮派活动
		YUANGU_MOXIANG = 7,		//远古魔像
		LEVEL_TASK = 8,			//等级任务
		SHANGGU_SHEN = 9,		//上古之神
		DiroBS = 10,			//迪奥布斯-选拔
		ZHANGJIE_TASK = 11,		//章节任务
	}
	export class TeamSetMediator extends game.modules.UiMediator{
		public _viewUI:ui.common.TeamSetUI;
		// private _RoleChenweiMediator:RoleChenweiMediator;
		// private _RoleTipMediator:RoleTipMediator;
		// private _RoleShopMediator:RoleShopMediator;
		// private _RoleJiFenDuiHuanMediator:RoleJiFenDuiHuanMediator;
		/** 菜单数据 */
		private MenuData:	Laya.Dictionary;
		/** 一级菜单数据 */
		private firstMenu:  Array<any> = [];
		/** 二级菜单数据 */
		private secondMenu: Array<any> = [];
		/** 是否初始化 */
		private initFlag: 	boolean    = false;
		/** 左侧最小等级 */
		private leftLvel: 	number;
		/** 右侧最大等级 */
		private rightLevel: number;
		/** 目标Id */
		private targetId:   number;
		/** 目标名称 */
		private target:		string;
		/** 等级最小限制 */
		private _levelLimitMin:number  = 10;
		/** 等级最大限制 */
		private _levelLimitMax:number  = 10;
		/** 左等级限制数据源 */
		private _lefleveltData: Array<any> = [] ;
		/** 右等级限制数据源 */
		private _rightleveltData: Array<any> = [] ;
		/** 当前二级类型 */
		private currentSecondType : number = 1;
		/** 当前二级选中下标 */
		private currentSecondSelectIndex: number = 0;
		/** 当前一级选中下标 */
		private currentFirstSelectIndex: number = 0;
		/** 进入条件 */
		private requirement: string;
		/** 开放时间 */
		private opentime: string;
		/** 当前选中的二级菜单按钮 */
		private currentSelectSecondButton:Laya.Button;
		/** 当前选中的一级级菜单按钮 */
		private currentSelectFirstButton:Laya.Button;
		constructor(app: AppBase){
			super(app.uiRoot.general);
			this._viewUI = new ui.common.TeamSetUI();
			this._viewUI.mouseThrough = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
            this.isCenter = true;
			// this._RoleChenweiMediator = new RoleChenweiMediator(this._viewUI);
			this.MenuData = new Laya.Dictionary();
			// models.RoleInfoProxy.getInstance().on(models.SRspRoleInfo_EVENT,this,this.refresh);
			this.registerEvent();
			
		}
		/** 
		 * 注册事件
		 */
		private registerEvent():void
		{
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN,this,this.closeTeamSet);
			this._viewUI.ok_btn.on(LEvent.MOUSE_DOWN,this,this._EnsureEvent);
			
		}
		/** 刷新一级菜单数据源 */
		private refreshFirstMenuData():void
		{
			  this._viewUI.firstMenu_list.vScrollBarSkin = "";
			  this._viewUI.firstMenu_list.repeatY = this.firstMenu.length;
			  this._viewUI.firstMenu_list.array = this.firstMenu;
			  this._viewUI.firstMenu_list.scrollBar.elasticBackTime = 200;
			  this._viewUI.firstMenu_list.scrollBar.elasticDistance = 100;
			  this._viewUI.firstMenu_list.renderHandler = new Handler(this,this.onRendeFirstMenu);  
			//   this._viewUI.firstMenu_list.scrollTo(this.currentFirstSelectIndex);

		}
		/** 刷新二级菜单数据源 
		 * @param type 类型
		 * @param requirement 需求条件
		 * @param opentime 开启时间
		 * @param selectBtn 选中按钮
		 * @param selectIndex 选中下标
		*/
		private refreshSecondMenuData(type:number,requirement?:string,opentime?:string,selectBtn?:Button,selectIndex?:number):void
		{
			  this.currentSecondType = type;
			  this._viewUI.match_image.visible = true;
			  this.secondMenu = this.MenuData.get(type);
			  if( this.secondMenu == null ) this.secondMenu = [];
			  if(typeof(requirement) != "undefined")
			  {
				  this.requirement = requirement;
				  this.opentime = opentime;
				  this.refreshConditionLabel(requirement,opentime);
				 
			  } 
			  /** 只选中一级菜单 */
			  if( this.secondMenu.length > 0 )
			  {
				  this.targetId = this.secondMenu[0].id;
				  this.target = this.secondMenu[0].target;
			  }
			  if(typeof(selectBtn) != "undefined")
			  {/** 选中二级菜单某选项 */
				  this.currentFirstSelectIndex = selectIndex;
				  this.currentSecondSelectIndex = 0;
				  if(this.currentSelectFirstButton && this.currentSelectFirstButton.selected)
				  this.currentSelectFirstButton.selected = false;
				  this.currentSelectFirstButton = selectBtn;
				  this.currentSelectFirstButton.selected = true;
				  this.refreshLevelSilder(this.secondMenu[0].minlevel,this.secondMenu[0].maxlevel,this.secondMenu[0].id,this.secondMenu[0].target);
			  }
			  this._viewUI.secondMenu_list.vScrollBarSkin = "";
			  this._viewUI.secondMenu_list.repeatY = this.secondMenu.length;
			  this._viewUI.secondMenu_list.array = this.secondMenu;
			  this._viewUI.secondMenu_list.scrollBar.elasticBackTime = 200;
			  this._viewUI.secondMenu_list.scrollBar.elasticDistance = 100;
			  this._viewUI.secondMenu_list.renderHandler = new Handler(this,this.onRendeSecondMenu); 
			//   this._viewUI.secondMenu_list.scrollTo(this.currentSecondSelectIndex); 

		}
		/** 二级菜单渲染 */
		private onRendeSecondMenu(cell:Box,index:number):void
		{
			if(index > (this.secondMenu.length-1 ) || index < 0) return; 
			let secondMenu_btn : Laya.Button = cell.getChildByName("secondMenu_btn") as Laya.Button;
			secondMenu_btn.label = this.secondMenu[index].target;
			let minLevel  = this.secondMenu[index].minlevel;
			let maxLevel  = this.secondMenu[index].maxlevel;
			let target  = this.secondMenu[index].target; 
			let targetId  = this.secondMenu[index].id; 
			if(this.currentSecondSelectIndex != index) 
			{
				secondMenu_btn.selected  = false;
			}else
			{
				this.currentSelectSecondButton = secondMenu_btn;
				this.currentSelectSecondButton.selected  = true;
				/** 如果选中框未选中则选中它 */
				if( !this._viewUI.match_checkboc.selected)
				this._viewUI.match_checkboc.selected =  true;
			}
			secondMenu_btn.on(LEvent.CLICK,this,this.refreshLevelSilder,[minLevel,maxLevel,targetId,target,secondMenu_btn,index]);

		}

		/** 一级菜单渲染 */
		private onRendeFirstMenu(cell:Box,index:number):void
		{
			if(index > (this.firstMenu.length-1 ) || index < 0) return; 
			let firstMenu_btn : Laya.Button = cell.getChildByName("firstMenu_btn") as Laya.Button;
			firstMenu_btn.label = this.firstMenu[index].content;
			let type = this.firstMenu[index].type;
			let requirement = this.firstMenu[index].requirement;
			let opTime   =	this.firstMenu[index].opentime;
			if(this.currentFirstSelectIndex != index) 
			{
				firstMenu_btn.selected  = false;
			}else
			{
				this.currentSelectFirstButton = firstMenu_btn;
				this.currentSelectFirstButton.selected  = true;
			}
			
			firstMenu_btn.on(LEvent.MOUSE_DOWN,this,this.refreshSecondMenuData,[type,requirement,opTime,firstMenu_btn,index]);

		}
		/** 
		 * 刷新副本条件
		 *  @param requirement 进入条件
		 *  @param opentime    开放时间
		 */
		private refreshConditionLabel(requirement: string , opentime: string):void
		{
			this._viewUI.condition_label.text = requirement;
			this._viewUI.openTime_label.text = opentime;

		}
		private closeTeamSet():void
		{
			this.hide();

		}
		/** 初始化数据 */
		private init():void
		{
			let tempData1 : Array<any> =[];
			let tempData2 : Array<any> =[];
			let tempData3 : Array<any> =[];
			let tempData4 : Array<any> =[];
			let tempData5 : Array<any> =[];
			let tempData6 : Array<any> =[];
			let tempData7 : Array<any> =[];
			let tempData8 : Array<any> =[];
			let tempData9 : Array<any> =[];
			let tempData10: Array<any> =[];
			let data =  TeamModel.getInstance().teamListConfig;
			let _roleLevel = HudModel.getInstance().levelNum;
			for (var index in data ) 
			{
			  if( _roleLevel < data[index].minlevel ) continue;
			  if(data[index].type == TeamSetType.STORY_TASK) 
			  {
				  tempData1.push(data[index]);
			  }else if(data[index].type == TeamSetType.DAILY_FUBEN)
			  {
				   tempData2.push(data[index]);
			  }else if(data[index].type == TeamSetType.SUPERIOR_FUBEN)
			  {
				   tempData3.push(data[index]);
			  }else if(data[index].type == TeamSetType.TIME_ACTIVITY)
			  {
				   tempData4.push(data[index]);
			  }else if(data[index].type == TeamSetType.FAMILY_ACTIVITY)
			  {
				   tempData5.push(data[index]);
			  }else if(data[index].type == TeamSetType.YUANGU_MOXIANG)
			  {
				   tempData6.push(data[index]);
			  }else if(data[index].type == TeamSetType.LEVEL_TASK)
			  {
				   tempData7.push(data[index]);
			  }else if(data[index].type == TeamSetType.SHANGGU_SHEN)
			  {
				   tempData8.push(data[index]);
			  }else if(data[index].type == TeamSetType.DiroBS)
			  {
				   tempData9.push(data[index]);
			  }else if(data[index].type == TeamSetType.ZHANGJIE_TASK)
			  {
				   tempData10.push(data[index]);
			  }	
			}
			this.MenuData.clear();
			if( tempData10.length != 0 )
			this.MenuData.set(TeamSetType.ZHANGJIE_TASK,tempData10);
			if( tempData9.length != 0 )
			this.MenuData.set(TeamSetType.DiroBS,tempData9);
			if( tempData8.length != 0 )
			this.MenuData.set(TeamSetType.SHANGGU_SHEN,tempData8);
			if( tempData7.length != 0 )
			this.MenuData.set(TeamSetType.LEVEL_TASK,tempData7);
			if( tempData6.length != 0 )
			this.MenuData.set(TeamSetType.YUANGU_MOXIANG,tempData6);
			if( tempData5.length != 0 )
			this.MenuData.set(TeamSetType.FAMILY_ACTIVITY,tempData5);
			if( tempData4.length != 0 )
			this.MenuData.set(TeamSetType.TIME_ACTIVITY,tempData4);
			if( tempData3.length != 0 )
			this.MenuData.set(TeamSetType.SUPERIOR_FUBEN,tempData3);
			if( tempData2.length != 0 )
			this.MenuData.set(TeamSetType.DAILY_FUBEN,tempData2);
			if( tempData1.length != 0 )
			this.MenuData.set(TeamSetType.STORY_TASK,tempData1);
			this.firstMenu = [];
			for (var temp = 1; temp <= 11; temp++) 
			{
			 let typeData  = this.MenuData.get(temp);
			 if(typeData == null ) continue;
			 this.firstMenu.push(typeData[0]);
			}
			if( this.firstMenu.length == 0 ) this._viewUI.notarget_btn.visible = true;
			else this._viewUI.notarget_btn.visible = false;
				
				

		}
		public show():void {
			super.show();
			this.init();
			this.refreshFirstMenuData();
			this.controUI();
		}
		/** 初始化左边的等级数据 */
		private leftLevelData():void
		{
			this._lefleveltData = [];
			for (var index = this._levelLimitMin; index <= this._levelLimitMax ; index++) 
			{
				if(index == this._levelLimitMin )
				{
					for (let emptyIndex = 0; emptyIndex < 2; emptyIndex++) 
					{
						this._lefleveltData.push({level:""});
					}
					
				}
				this._lefleveltData.push({level:index});
				if(index == 150 )
				{
					for (let emptyIndexs = 0; emptyIndexs < 2; emptyIndexs++) 
					{
						this._lefleveltData.push({level:""});
					}	
				}
			}
			this._viewUI.numLeft_list.vScrollBarSkin = "";
			this._viewUI.numLeft_list.repeatY = this._lefleveltData.length;
			this._viewUI.numLeft_list.array = this._lefleveltData;
			this._viewUI.numLeft_list.scrollBar.elasticBackTime = 200;
			//  this._viewUI.numLeft_list.scrollBar.changeHandler = new Handler(this,this.onChangeValue);
			// this._viewUI.numLeft_list.scrollBar.tick
			this._viewUI.numLeft_list.scrollBar.scrollSize = 20;
			this._viewUI.numLeft_list.scrollBar.elasticDistance = 100;
			// this._viewUI.numLeft_list.scrollBar.setScroll(0,this._lefleveltData.length,this._lefleveltData.length);
			this._viewUI.numLeft_list.scrollBar.on(LEvent.END,this,this.ongetLeftlevelValue);
			this._viewUI.numLeft_list.renderHandler = new Handler(this,this.onRenderLeftLevelData);
		}
		/** 初始化右边的等级数据 */
		private rightLevelData():void
		{
			this._rightleveltData = [];
			for (var index = this._levelLimitMin; index <= this._levelLimitMax ; index++) 
			{
				if(index == this._levelLimitMin )
				{
					for (let emptyIndex = 0; emptyIndex < 2; emptyIndex++) 
					{
						this._rightleveltData.push({level:""});
					}
					
				}
				this._rightleveltData.push({level:index});
				if(index == this._levelLimitMax )
				{
					for (let emptyIndexs = 0; emptyIndexs < 2; emptyIndexs++) 
					{
						this._rightleveltData.push({level:""});
					}
					
				}
				
			}
			this._viewUI.numRight_list.vScrollBarSkin = "";
			this._viewUI.numRight_list.repeatY = this._rightleveltData.length;
			this._viewUI.numRight_list.array = this._rightleveltData;
			this._viewUI.numRight_list.scrollBar.elasticBackTime = 200;
			this._viewUI.numRight_list.scrollBar.elasticDistance = 100;
			this._viewUI.numRight_list.scrollTo(this._rightleveltData.length);
			this._viewUI.numRight_list.scrollBar.on(LEvent.END,this,this.ongetRightlevelValue);
			this._viewUI.numRight_list.renderHandler = new Handler(this,this.onRenderRightLevelData);
		}
		/** 渲染左边数据 */
		private onRenderLeftLevelData(cell:Box,index:number):void
		{
			if(index < 0 || index >= this._lefleveltData.length) return;
			let levelleft_lab:Laya.Label =  cell.getChildByName("levelleft_lab") as Laya.Label;
			levelleft_lab.text = this._lefleveltData[index].level;
		}
		/** 渲染右边数据 */
		private onRenderRightLevelData(cell:Box,index:number):void
		{
			if(index < 0 || index >= this._rightleveltData.length) return;
			let levelright_lab:Laya.Label =  cell.getChildByName("levelright_lab") as Laya.Label;
			levelright_lab.text = this._rightleveltData[index].level;
		}
		/** 左等级滑动停止选中 */
		private ongetLeftlevelValue():void
		{
			let startIndex = this._viewUI.numLeft_list.startIndex;
			this._viewUI.numLeft_list.tweenTo(startIndex);
			/** 选中对象为(startindex+2) 显示区域的下两条 */ 
			this.leftLvel = this._lefleveltData[startIndex+2].level;
		}
		/** 右等级滑动停止选中 */
		private ongetRightlevelValue():void
		{
			let startIndex = this._viewUI.numRight_list.startIndex;
			this._viewUI.numRight_list.tweenTo(startIndex);
			/** 选中对象为(startindex+2) 显示区域的下两条 */ 
			this.rightLevel = this._rightleveltData[startIndex+2].level;
		}

		/** 点击确认按钮事件 */
		private _EnsureEvent():void
		{
			let minlevel =  this.leftLvel;
			let maxlevel =  this.rightLevel;
			// this._TeamModule  = new TeamModule(this.app);
			if(this.targetId == 0)
			{/** 没有选中目标 */
				RequesterProtocols._instance.c2s_CRequestSetTeamMatchInfo(this.targetId,minlevel,maxlevel);
				
			
			}else if(this._viewUI.match_checkboc.selected == true)
			{/** 目标不为空并且自动匹配 typemactch类型为0是个人组队匹配1是队伍匹配 3是只设置队伍目标 */
				RequesterProtocols._instance.c2s_CRequestTeamMatch(1,this.targetId,minlevel,maxlevel);
				
			}else if(this._viewUI.match_checkboc.selected == false)
			{/** 目标不为空但是未勾选自动匹配 */
				RequesterProtocols._instance.c2s_CRequestSetTeamMatchInfo(this.targetId,minlevel,maxlevel);
				
			}
			models.TeamProxy.getInstance().event(models.REFRESH_TARGET,[minlevel,maxlevel,this.target,this.targetId]);
			this.hide();

		}
		/** 初始化UI */
		private controUI():void
		{
			this._viewUI.match_image.visible = false;
			if(this.requirement != "") this.refreshSecondMenuData(this.currentSecondType,this.requirement,this.opentime); 
			else this.refreshSecondMenuData(this.currentSecondType,"无限制","全天");
			this.refreshLevelSilder(10,150,0,"无");
		}
		/** 等级限制滑动条(暂替) */
		private refreshLevelSilder(minlevel:number,maxlevel:number,targetId:number,target: string,selectBtn?:Button , selectIndex?:number):void
		{
			if(typeof(selectBtn) != "undefined")
			{
				selectBtn.selected = true ;
				this.currentSecondSelectIndex = selectIndex;
				if(this.currentSelectSecondButton && this.currentSelectSecondButton.selected )
				this.currentSelectSecondButton.selected = false;
				this.currentSelectSecondButton = selectBtn;
				this.currentSelectSecondButton.selected = true;
				/** 如果选中框未选中则选中它 */
				if( !this._viewUI.match_checkboc.selected)
				this._viewUI.match_checkboc.selected =  true;
			} 
			// this.refreshSecondMenuData(this.currentSecondType);
			if(targetId != 0)
			{
				this.targetId = targetId;
				this.target   = target;
			}
			this._levelLimitMin = minlevel;
			this._levelLimitMax = maxlevel;
			this.leftLvel = minlevel;
			this.rightLevel = maxlevel;
			this.leftLevelData();
			this.rightLevelData();
		}


		// 人物信息界面回复
		public refresh(e:any):void
		{
			// var data:hanlder.S2C_SRspRoleInfo = models.RoleInfoModel.getInstance().SRspRoleInfoData.get("data");
		}
		public hide():void {
			super.hide();
		}
		
		public getView():Sprite {
			return this._viewUI;
		}
		protected onShow(event:Object):void {
			this.show();
		}

		public showChenwei():void{
			// this._RoleChenweiMediator.show();
		}

		public showTip():void{
			// this._RoleTipMediator.show();
		}

		public showJiuguan():void{
			// this._RoleShopMediator.show();
		}
		public showJifen():void{
			// this._RoleJiFenDuiHuanMediator.show();
		}
	}
}