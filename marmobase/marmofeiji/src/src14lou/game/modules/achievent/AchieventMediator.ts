/**
* LJM 
*/
 import AchieventModel = game.modules.achievent.models.AchieventModel;
 import AchieventInfoVo = game.modules.achievent.models.AchieventInfoVo;
module game.modules.achievent
{
	export class AchieventMediator extends game.modules.UiMediator
	{
		private _viewUI:ui.common.AchievementUI;
		/**成就等级标签  */
		private _achieventLevel : Object; 
		/** 成就等级 渲染数据 */
		private _achieventLevelArray :Array<any> = [];
		/** 成就等级分类字典容器 */
		private _achieventContentArray :Laya.Dictionary = new Laya.Dictionary;
		/** 当前选中标签 */
		private selectIndex: number = 0;
		/** 配置表初始化标志位 */
		private initTableFlag :boolean = false;
		/** 存储服务端成就进程数据 */
		private AchieventInfoArray:Array<any> ;
		/**  */
		private achiNoFinished :Array<any> = [];
		/** 存储已完成的成就id */
		private achiFinished :Array<any> = [];
		/** 存储已领取的成就Id */
		private achiHasGet :Array<any> = [];
		/** 当前选中的等级按钮 */
		private saveLevelChannel :number = 1;
		/** 是否选中 */
		private chooseFlag:boolean = false;
		/** 二级菜单选中对象 */
		private MainselectIndex:number = -1;
		/** 存储配置表等级数据 */
 		private achieventContent : any;
		/** 成就id百位数 */ 
		private isPercentIle :Array<any>= [];
		/** 已经显示过红点等级标签 不显示第二次 */
		private levelRedDot: Array<any> = [];
		/** 存储成就等级分类数据 */
		private Group1 :Array<GuideCourseBaseVo> = [];
		private Group2 :Array<GuideCourseBaseVo> = [];
		private Group3 :Array<GuideCourseBaseVo> = [];
		private Group4 :Array<GuideCourseBaseVo> = [];
		private Group5 :Array<GuideCourseBaseVo> = [];
		private Group6 :Array<GuideCourseBaseVo> = [];
		private Group7 :Array<GuideCourseBaseVo> = [];
		private Group8 :Array<GuideCourseBaseVo> = [];
		/** 飘窗提示 */
		private DisappearMessageTipsMediator: game.modules.commonUI.DisappearMessageTipsMediator;
		constructor(uiLayer: Sprite,app:AppBase)
		{
			super(uiLayer);
			this._viewUI = new ui.common.AchievementUI();
			this._app = app;
			this.isCenter =  false;
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN,this,this.hide);
			this._initAchidata();
		}
		/** 初始化等级数据 */
		private initLevel():void
		{
			console.log("achieventLevelArray.length"+this._achieventLevelArray);
			if(this._achieventLevelArray.length == 0) return;
			this._viewUI.achievementLevel_list.visible = true;
			this._viewUI.achievementLevel_list.vScrollBarSkin = "";
			this._viewUI.achievementLevel_list.repeatX = 2;
			this._viewUI.achievementLevel_list.repeatY = this._achieventLevelArray.length/2+this._achieventLevelArray.length%2;
			this._viewUI.achievementLevel_list.array = this._achieventLevelArray;
			this._viewUI.achievementLevel_list.spaceX = 5;
			this._viewUI.achievementLevel_list.spaceY = 1;
			this._viewUI.achievementLevel_list.scrollBar.elasticBackTime = 200;
			this._viewUI.achievementLevel_list.scrollBar.elasticDistance = 100;
			this._viewUI.achievementLevel_list.scrollTo(this.selectIndex);
			this._viewUI.achievementLevel_list.renderHandler = new Handler(this,this._showAchievenmentLevelRender);
		}
		/** 渲染等级数据 */
		private _showAchievenmentLevelRender(cell:Box,index:number):void
		{
			var achvLv_btn :Laya.Button = cell.getChildByName("achvLv_btn") as Laya.Button;
			let red_dot_img: Laya.Image = cell.getChildByName("red_dot_img") as Laya.Image;
			red_dot_img.visible = false;
			if(this.selectIndex != index) achvLv_btn.selected = false;
			if(!this.chooseFlag && index == 0)  achvLv_btn.selected = true;
			this.isShowRedPot( index , red_dot_img );
			achvLv_btn.on(LEvent.CLICK,this,this.selectButton,[achvLv_btn,index]);
			achvLv_btn.label = this._achieventLevelArray[index];
		}

		/** p判断红点并显示 
		 * @param _index 等级下标
		 * @param red_dot_img 红点ui
		*/
		private isShowRedPot( _lev_index:number , red_dot_img:Laya.Image ):void
		{
			if(  _lev_index != -1 && red_dot_img) // 渲染传值
			{
				for (var _index = 0; _index < this.achiFinished.length; _index++) 
				{
					let digit = this.getGroup(this.achiFinished[_index]);
					if (_lev_index == (digit - 1)) 
					{ /** 当前等级下标存在一个已完成数据 */
						red_dot_img.visible = true;
						break;
					}
				}
			 } 
			
		}
		/** 选中等级按钮 */
		private selectButton(btn:Button,index:number):void
		{
			console.log("鼠标点击的index....."+index);
			if(this.MainselectIndex != -1) this.MainselectIndex = -1;
			this.chooseFlag = true;
			this.selectIndex = index;
			this.initLevel();
			btn.selected  = true ;
			/** 每次点击刷新数据 */
			RequesterProtocols._instance.c2s_get_archive_info();
			this.saveLevelChannel = index+1;
			
		}
		/** 初始化配置表 */
		private initTable():void
		{
			this.initTableFlag  = true;
			var  achieventLevel =  models.AchieventModel.getInstance().guideCourseLabelDic;
			console.log("achieventLevel..."+achieventLevel);
			/** 初始化成就等级标签 */
			let levellimit = HudModel.getInstance().levelNum + 10;
			this._achieventLevelArray = [];
			for (var index = 1; index <= Object.keys(achieventLevel).length; index++) {
				let level = achieventLevel[index].level;
				if(levellimit >= level) // 只显示 <= 当前等级+10的等级数据
				this._achieventLevelArray.push(achieventLevel[index].name);
			}
			
			
		}
		/** 成就配置表分类 */
		private _initAchidata():void
		{
			var  achieventData: GuideCourseBaseVo  =  models.AchieventModel.getInstance().guideCourseDic as GuideCourseBaseVo;
			/** 初始化成就等级内容标签 */
			for (let i in achieventData) 
			{
				switch (Number(achieventData[i].group)) 
				{
					case 1:
						this.Group1.push(achieventData[i]);
						this._achieventContentArray.set(Number(achieventData[i].group),this.Group1);
						break;
					case 2:
						this.Group2.push(achieventData[i]);
						this._achieventContentArray.set(Number(achieventData[i].group),this.Group2);
						break;
					case 3:
						this.Group3.push(achieventData[i]);
						this._achieventContentArray.set(Number(achieventData[i].group),this.Group3);
						break;
					case 4:
						this.Group4.push(achieventData[i]);
						this._achieventContentArray.set(Number(achieventData[i].group),this.Group4);
						break;
					case 5:
						this.Group5.push(achieventData[i]);
						this._achieventContentArray.set(Number(achieventData[i].group),this.Group5);
						break;
					case 6:
						this.Group6.push(achieventData[i]);
						this._achieventContentArray.set(Number(achieventData[i].group),this.Group6);
						break;
					case 7:
						this.Group7.push(achieventData[i]);
						this._achieventContentArray.set(Number(achieventData[i].group),this.Group7);
						break;
					case 8:
						this.Group8.push(achieventData[i]);
						this._achieventContentArray.set(Number(achieventData[i].group),this.Group8);
						break;
					default:
						break;
				}
			}
		}
		/** 初始化成就内容 */
		private initContent(index:number):void
		{
			this._viewUI.achivContent_list.array = [];
			this.achieventContent  =  this._achieventContentArray.get(index);
			if(this.achieventContent.length == 0) return;
			this._viewUI.achivContent_list.visible = true;
			this._viewUI.achivContent_list.vScrollBarSkin = "";
			this._viewUI.achivContent_list.repeatY = this.achieventContent.length;
			this._viewUI.achivContent_list.array = this.achieventContent;
			this._viewUI.achivContent_list.scrollBar.elasticBackTime = 200;
			this._viewUI.achivContent_list.scrollBar.elasticDistance = 100;
			 if(this.MainselectIndex && this.MainselectIndex != -1)
			{
				this._viewUI.achivContent_list.scrollTo(this.MainselectIndex);
			}
			this._viewUI.achivContent_list.renderHandler = new Handler(this,this._showAchievenmentContentRender);
		}
		/** 渲染成就数据 */
		private _showAchievenmentContentRender(cell:Box,index:number):void
		{
			var  isFinish_img    :Laya.Image = cell.getChildByName("isFinish_img") as Laya.Image;
			var  achv_btn	     :Laya.Button =cell.getChildByName("achv_btn")   as Laya.Button;
			var  achvDetails_lab :Laya.Label = cell.getChildByName("achvDetails_lab") as Laya.Label;
			var  achvReward_lab  :Laya.Label = cell.getChildByName("achvReward_lab") as Laya.Label;
			var  achvName_lab    :Laya.HTMLDivElement = cell.getChildByName("achvName_lab") as Laya.HTMLDivElement;
			var  achvIcon_img 	 :Laya.Image = cell.getChildByName("whiteBg_img").getChildByName("achvIcon_img") as Laya.Image;
			achvDetails_lab.text = this.achieventContent[index].info;
			if(achvDetails_lab.text.length <=11)
			{/** 一行 */
				achvDetails_lab.top = 50;
			}else if( achvDetails_lab.text.length >11 && achvDetails_lab.text.length <=22)
			{
				achvDetails_lab.top = 40;
			}else if(achvDetails_lab.text.length > 22)
			{
				achvDetails_lab.top = 37;
			}
			achvName_lab.innerHTML    = this.achieventContent[index].name;
			/** 奖励数据填充 */
			for (var num = 0; num < this.achieventContent[index].itemtexts.length; num++) 
			{ 
				if(this.achieventContent[index].itemtexts[num] != "0" )
				{
					var reward = this.achieventContent[index].itemtexts[num];
					break;
				}
			}		
				 if(this.achiHasGet.length!= 0 && this.achiHasGet.indexOf(this.achieventContent[index].id)!= -1)
				 {
					console.log("已领奖...");	
					achv_btn.visible = false;
					isFinish_img.visible = true;
				}else if(this.achiFinished.length!= 0 && this.achiFinished.indexOf(this.achieventContent[index].id)!= -1)
				{
					achv_btn.visible = true;
					achv_btn.label = "领取奖励";
					isFinish_img.visible = true;
					let state = 1;
					achv_btn.off(LEvent.MOUSE_UP,this,this.goLogic);
					achv_btn.on(LEvent.MOUSE_UP,this,this.AskReward,[this.achieventContent[index].id]);
				}else
				{
					achv_btn.visible = true;
					achv_btn.label = "前往";
					isFinish_img.visible = false;
					let state = 0;
					achv_btn.off(LEvent.MOUSE_UP,this,this.AskReward);
					achv_btn.on(LEvent.MOUSE_UP,this,this.goLogic,[this.achieventContent[index],index]);
				}
			achvReward_lab.text  = "奖励:  " + reward;
			achvReward_lab.y = 100; 
			var  icon :number =  Number(this.achieventContent[index].image);
			if(icon>0 && icon<=10000){//技能区间
				achvIcon_img.skin = "icon/skill/"+this.achieventContent[index].image+".png";
			}else if(icon> 20000 && icon <= 30000){//物品区间
				achvIcon_img.skin = "icon/item/"+this.achieventContent[index].image+".png";
			}else if(icon> 30000 && icon <= 30500){//主角，NPC
				achvIcon_img.skin = "icon/avatarrole/"+this.achieventContent[index].image+".png";
			}else if(icon> 30500 && icon <= 31000){//怪物
				achvIcon_img.skin = "icon/avatarmonster/"+this.achieventContent[index].image+".png";
			}else if(icon> 31000 && icon <= 31100){//助战
				achvIcon_img.skin = "icon/avatarpartner/"+this.achieventContent[index].image+".png";
			}else if(icon> 31100 && icon <= 31200 ){//坐骑
				achvIcon_img.skin = "icon/avatarmount/"+this.achieventContent[index].image+".png";
			}else if(icon> 31200 && icon <= 32000 ){//宠物
				achvIcon_img.skin = "icon/avatarpet/"+this.achieventContent[index].image+".png";
			}
	}
			
		/** 完成成就 领取奖励请求 
		 * @param AchiId 成就ID
		*/
		private AskReward(AchiId:number):void
		{
			console.log("请求的成就Id......"+AchiId);
			RequesterProtocols._instance.c2s_get_archive_award(AchiId);
		}
		/** 刷新数据 */
		public refreshData():void
		{
			// this.isPercentIle = [];
			this.AchieventInfoArray =   AchieventModel._instance.AchieventInfo;//
			if(this.AchieventInfoArray == undefined) return;
			this._isclear(this.AchieventInfoArray.length);
			console.log("this.AchieventInfoArray.length....vv."+this.AchieventInfoArray.length);
			console.log("this.AchieventInfoArray....vv."+this.AchieventInfoArray);
			for (var index = 0; index < this.AchieventInfoArray.length; index++) {
				console.log("this.AchieventInfoArray[index].state..refreshData....."+this.AchieventInfoArray[index].state);
				if(this.AchieventInfoArray[index].state == 1){//已完成
				   this.achiFinished.push(this.AchieventInfoArray[index].archiveid);
				   console.log('this.achiFinished===================='+this.achiFinished);
				   let hasGetId = this.AchieventInfoArray[index].archiveid;
				   this.updateGet(hasGetId);
				}else if(this.AchieventInfoArray[index].state == 2){//已领奖
					this.achiHasGet.push(this.AchieventInfoArray[index].archiveid);
					console.log("this.achiHasGet..refreshData..."+this.achiHasGet);
					var hasRewardId = this.AchieventInfoArray[index].archiveid; //101
					this.updataRewarded(hasRewardId);
					this.judgeIsTips(hasRewardId);
				    console.log("hasRewardId+++++++++"+hasRewardId);
				}
			
			}
			this.initLevel();
			/** 刷新等级红点 */
			this.initContent(this.saveLevelChannel);	
		}

		/** 判断是否是银币奖励并弹窗。客户端组装 */
		private judgeIsTips(hasRewardId:number):void
		{
			if( this.AchieventInfoArray.length > 1 ) return ;
			let  achieventData: GuideCourseBaseVo  =  models.AchieventModel.getInstance().guideCourseDic as GuideCourseBaseVo;
			let isYinBi:string = achieventData[hasRewardId].itemtexts[9];   //9是银币专属值
			if( isYinBi == "0" ) return;
			let _yinbi = isYinBi.split("银币");
			let disappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
			let chatdata = HudModel.getInstance().promptAssembleBack(PromptExplain.GetYINBI,_yinbi);
			disappearMessageTipsMediator.onShow(chatdata)

		}
		/** 根据成就数据判断刷新已完成和已领奖数组 */
		private  _isclear(len:number):void
		{
			if(len == 1) //刷新单条数据
			{
				let hasGetId = this.AchieventInfoArray[0].archiveid;
				let state    = this.AchieventInfoArray[0].state;
				let index    = this.achiFinished.indexOf(hasGetId)
				/** 条件变为已领奖，移除在已完成的数组的位置 */
				if(state == 2 && index != -1) this.achiFinished.splice(index,1);
			}else
			{
				this.achiHasGet = [];
				this.achiFinished = [];
			}

		}
		/** 更新已领取的奖励位置 */
		private updataRewarded(hasGetId:number):void
		{ 
				console.log("hasRewarded+++++++++"+hasGetId);		
				// this.percentIle(hasGetId);
				/**  判断组别*/
				 let digit = this.getGroup(hasGetId);
				 if(this.selectIndex != (digit-1) ) return;
				/** 数组中的位置 */
				var num = hasGetId%10 -1;
					  switch (digit) 
					  {
						case 1:
								for (var gp1 = 0; gp1 <  this.Group1.length; gp1++) {if(Number(this.Group1[gp1].id) == hasGetId){num = gp1;}}
								var moveDom = this.Group1[num]; 
								if(typeof(moveDom) != "undefined") {this.Group1.splice(num,1);  this.Group1.push(moveDom);} 
								break;
						case 2:
								for (var gp2 = 0; gp2 <  this.Group2.length; gp2++) {if(Number(this.Group2[gp2].id) == hasGetId) num = gp2;}
								var moveDom = this.Group2[num]  ; 
								if(typeof(moveDom) != "undefined"){this.Group2.splice(num,1);  this.Group2.push(moveDom);}
								break;
						case 3:
								for (var gp3 = 0; gp3 <  this.Group3.length; gp3++) {if(Number(this.Group3[gp3].id) == hasGetId) num = gp3;}
								var moveDom = this.Group3[num]  ;
								if(typeof(moveDom) != "undefined"){this.Group3.splice(num,1);  this.Group3.push(moveDom);} 
								break;
						case 4:
								for (var gp4 = 0; gp4 <  this.Group4.length; gp4++) {if(Number(this.Group4[gp4].id) == hasGetId) num = gp4;}
								var moveDom = this.Group4[num]  ; 
								if(typeof(moveDom) != "undefined"){this.Group4.splice(num,1);  this.Group4.push(moveDom);} 
								break;
						case 5:
								for (var gp5 = 0; gp5 <  this.Group5.length; gp5++) {if(Number(this.Group5[gp5].id) == hasGetId) num = gp5;}
								var moveDom = this.Group5[num]  ; 
								if(typeof(moveDom) != "undefined"){this.Group5.splice(num,1);  this.Group5.push(moveDom);} 
								break;
						case 6:
								for (var gp6 = 0; gp6 <  this.Group6.length; gp6++) {if(Number(this.Group6[gp6].id) == hasGetId) num = gp6;}
								var moveDom = this.Group6[num]  ; 
								if(typeof(moveDom) != "undefined"){this.Group6.splice(num,1);  this.Group6.push(moveDom);} 
							 	break;
						case 7:
								for (var gp7 = 0; gp7 <  this.Group7.length; gp7++) {if(Number(this.Group7[gp7].id) == hasGetId) num = gp7;}
								var moveDom = this.Group7[num]  ; 
								if(typeof(moveDom) != "undefined"){this.Group7.splice(num,1);  this.Group7.push(moveDom);} 
								break;
						case 8:
								for (var gp8 = 0; gp8 <  this.Group8.length; gp8++) {if(Number(this.Group8[gp8].id) == hasGetId) num = gp8;}
								var moveDom = this.Group8[num]  ; 
								if(typeof(moveDom) != "undefined"){this.Group8.splice(num,1);  this.Group8.push(moveDom);} 
								break;
						  default:
						  break;
					}
				
			
		}
		/** 根据成就Id 获取成就的组别
		 * @param getId 成就id
		 */
		private getGroup(getId:number):number
		{
			 do
			{
				getId = parseInt((getId/10).toString()) ;
			}
			while(getId >= 10)
			return getId;
		}
		/** 更新已完成奖励的位置 */
		private updateGet(hasGetId:number):void
		{
			console.log("hasGet+++++++++"+hasGetId);	
				// this.percentIle(hasGetId);
				/**  判断组别*/
				let digit = this.getGroup(hasGetId);
				if(this.selectIndex != (digit-1) ) return;
				/** 在数组位置 */
				var num = hasGetId%10 -1;
					  switch (digit) 
					  {
						case 1:
						     for (var gp1 = 0; gp1 <  this.Group1.length; gp1++) {if(Number(this.Group1[gp1].id) == hasGetId) num = gp1;}
						     var moveDom = this.Group1[num]  ;if(typeof(moveDom) != "undefined") {this.Group1.splice(num,1);  this.Group1.splice(0,0,moveDom); }break;
						case 2:
							 for (var gp2 = 0; gp2 <  this.Group2.length; gp2++) {if(Number(this.Group2[gp2].id) == hasGetId) num = gp2;}
						     var moveDom = this.Group2[num]  ;if(typeof(moveDom) != "undefined"){this.Group2.splice(num,1);  this.Group2.splice(0,0,moveDom); }break;
						case 3:
							 for (var gp3 = 0; gp3 <  this.Group3.length; gp3++) {if(Number(this.Group3[gp3].id) == hasGetId) num = gp3;}
						     var moveDom = this.Group3[num]  ;if(typeof(moveDom) != "undefined"){this.Group3.splice(num,1);  this.Group3.splice(0,0,moveDom); }break;
						case 4:
							 for (var gp4 = 0; gp4 <  this.Group4.length; gp4++) {if(Number(this.Group4[gp4].id) == hasGetId) num = gp4;}
						     var moveDom = this.Group4[num]  ;if(typeof(moveDom) != "undefined"){this.Group4.splice(num,1);  this.Group4.splice(0,0,moveDom);}break;
						case 5:
							 for (var gp5 = 0; gp5 <  this.Group5.length; gp5++) {if(Number(this.Group5[gp5].id) == hasGetId) num = gp5;}
						     var moveDom = this.Group5[num]  ; if(typeof(moveDom) != "undefined") {this.Group5.splice(num,1);  this.Group5.splice(0,0,moveDom);}break;
						case 6:
							 for (var gp6 = 0; gp6 <  this.Group6.length; gp6++) {if(Number(this.Group6[gp6].id) == hasGetId) num = gp6;}
						     var moveDom = this.Group6[num]  ; if(typeof(moveDom) != "undefined") {this.Group6.splice(num,1);  this.Group6.splice(0,0,moveDom);}break;
						case 7:
							 for (var gp7 = 0; gp7 <  this.Group7.length; gp7++) {if(Number(this.Group7[gp7].id) == hasGetId) num = gp7;}
						     var moveDom = this.Group7[num]  ; if(typeof(moveDom) != "undefined") {this.Group7.splice(num,1);  this.Group7.splice(0,0,moveDom);}break;
						case 8:
							 for (var gp8 = 0; gp8 <  this.Group8.length; gp8++) {if(Number(this.Group8[gp8].id) == hasGetId) num = gp8;}
						     var moveDom = this.Group8[num]  ; if(typeof(moveDom) != "undefined") {this.Group8.splice(num,1);  this.Group8.splice(0,0,moveDom);}break;
						  default:
						  break;
					  }					


		}
		/** 元素去重 */
		private duplicateRemoval(array:Array<any>):any
		{
			var temp:Array<any> = [];
					for (var temps = 0; temps < array.length; temps++) 
					{
						if(temp.indexOf(array[temps]) == -1){
							temp.push(array[temps]);
						}
					}
					return temp;
		}
		// /** 计算个位数 */
		// private percentIle(hasGetId:number):void
		// {
		// 			if(hasGetId/10 >=10)
		// 			{
		// 				this.percentIle(hasGetId/10);
		// 			}else
		// 			{
		// 			var integer = Math.floor(hasGetId/10) ;
		// 			this.isPercentIle.push(integer);
		// 			}
		// }


		public show():void 
		{
			super.show();
			console.log("AchieventMediator show() :::初始化界面时向服务端请求成就数据~");
			RequesterProtocols._instance.c2s_get_archive_info();
			this._achieventLevel = models.AchieventModel.getInstance().guideCourseLabelDic;
			// if(!this.initTableFlag){
				this.initTable();
			// }else{
			// 	console.log("已经初始化过成就类表格，不再初始化~");
			// }	
			// this.initLevel();
			if(!this.chooseFlag) this.initContent(1);

			mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
		}
		/** 前往逻辑事件 */
		private goLogic(guidebasevo:GuideCourseBaseVo,index:number):void
		{
			this.MainselectIndex = this._viewUI.achivContent_list.startIndex;
			/** 前往逻辑 */
			let enterlgic = guidebasevo.enter;
			/** 完成逻辑 */
			let finish    = guidebasevo.finish;
			let enterlink = guidebasevo.enterlink;
			/** 前往等级 */
			let enterlevel = guidebasevo.enterlevel;
			let currentlevel = HudModel.getInstance().levelNum; //LoginModel.getInstance().roleDetail.level;
			/** 当前等级小于前往等级 弹窗提示 */
			if(currentlevel < enterlevel)
			{
				let arr =  [];
				arr.push(enterlevel);
				let prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.ACHI_LEVELlIMIT,arr);
				this.DisappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
				this.DisappearMessageTipsMediator.onShow(prompt);
				return;
			}
			if(enterlgic == AchieventGoLogic.OPEN_INTERFACE)
			{/** 打开界面 */
				
				if(finish == 2)
				{/** 好友界面添加 */
					this.onLoadAddFriendsSystem();
				}else if(finish == 4)
				{/** 助战界面 */
					this.onLoadZhuZhanSystem();
				}else if(finish == 7 || finish == 19)
				{/** 战斗技能 */
					this.onLoadSkillSystem(1);
				}else if(finish == 24)
				{/** 红包界面 */
					this.onLoadRedPacketSystem();
				}else if(finish == 26)
				{/** 好友界面 */
					this.onLoadFriendSystem();
				}else if(finish == 8 )
				{/** 聊天界面 */
					this.onLoadWorldCaht();
				}else if(finish == 10 )
				{/** 活动表中的内容 */
					this.onLoadActivitySystem();
				}else if(finish == 25)
				{/** 好友赠送礼物 */
					this.onLoadGiftView();
				}else if(finish == 27 || finish == 33 || finish == 34 || finish == 40)
				{/** 骑坐骑 背包界面 */
					this.onLoadBagSystem();
				}else if(finish == 13 || finish == 32 )
				{/** 打造界面 */
					this.onLoadStrengthSystem(0);
				}else if(finish == 14 || finish == 46)
				{/** 镶嵌界面 */
					this.onLoadStrengthSystem(1);
				}else if(finish == 15)
				{/** 排行榜界面 */
					this.onLoadRankingListView();
				}else if(finish == 29)
				{/** 周历 */
					this.onLoadZhouLiView();
				}else if(finish == 30)
				{/** 练宠界面 */
					this.onLoadPetSystem(1);
				}else if(finish == 28 )
				{/** 属性界面 */
					this.onLoadPetSystem(0);
				}else if(finish == 48)
				{/** 积分兑换 */
					this.onLoadExchangeView();
				}else if(finish == 16)
				{/** 专精技能 */
					this.onLoadSkillSystem(2);
				}else if(finish == 47)
				{/** 工会副本 */

				}else if(finish == 38 || finish == 20)
				{/** 镶嵌界面 */
					this.onLoadStrengthSystem(1);
				}else if(finish == 39)
				{/** 角色信息 */
					this.onLoadRoleInfo();
				}else if(finish == 35)
				{/**援助战斗20次 练宠？ */
					this.onLoadPetSystem(1);
				}else if(finish == 1)
				{/** 宠物图鉴 */
					this.onLoadPetSystem(3);
				}else if(finish == 36 || finish == 37)
				{/** 宠物学习技能 或 法术认证*/
					this.onLoadPetSystem(1);
				}else if(finish == 41)
				{/** 练宠界面 合宠子界面 */
					this.onLoadPetSystem(1);
				}else if(finish == 47 )
				{/** 装备修理 */
					this.onLoadStrengthSystem(3);
				}else if(finish == 42)
				{/** 生活技能 */
					this.onLoadSkillSystem(1);
				}else if(finish == 31)
				{/** 宠物 属性界面 */
					this.onLoadPetSystem(0);
				}else if(finish == 21 )
				{/** 宠物图鉴 */
					this.onLoadPetSystem(3);
				}else if(finish == 44)
				{/** 练宠 的合宠 */
					this.onLoadPetSystem(1);
				}
				ModuleManager.hide(ModuleNames.ACHIEVENT);
				LoginModel.getInstance().CommonPage = "Achievement";
			}else if(enterlgic == AchieventGoLogic.FIND_NPC)
			{/** 找NPC */
				let isinteam = this._isInTeam();
				if( isinteam ) return;
				let npcinfo:CNPCInfoBaseVo = game.modules.mainhud.models.HudModel.getInstance().cNPCInfoData[enterlink];
				if(typeof(npcinfo) == "undefined" )
				{
					ModuleManager.hide(ModuleNames.ACHIEVENT);
					return;
				}
				let mapId = npcinfo.mapid;
				HudModel.getInstance().useapp = this._app;
				this._app.sceneRoot.istask = 2;
				HudModel.getInstance().jumpmap(mapId,enterlink);
				ModuleManager.hide(ModuleNames.ACHIEVENT);
			}else if(enterlgic == AchieventGoLogic.CONTAIN_MAIN_TASK)
			{/** 继续主线任务 */
				let isinteam = this._isInTeam();
				if( isinteam ) return;
				let currentMainTaskKey = Taskmodels.getInstance().maintask.keys;
				let info: MissionCMainMissionInfoBaseVo = game.modules.task.models.TaskModel.getInstance().missionCMainMissionInfoData[currentMainTaskKey[0]]			
				HudModel.getInstance().jumpmapid = info.ActiveInfoMapID;
				HudModel.getInstance().tasktype = info.MissionType;
				HudModel.getInstance().desnpc.x = info.ActiveInfoLeftPos;
				HudModel.getInstance().desnpc.y = info.ActiveInfoTopPos;
				HudModel.getInstance().npcid = info.ActiveInfoNpcID;
				HudModel.getInstance().eventid = info.id;
				HudModel.getInstance().useapp = this._app;
				HudModel.getInstance().taskid = currentMainTaskKey[0];
				this._app.sceneRoot.istask = 2;
				HudModel.getInstance().taskstart();
				ModuleManager.hide(ModuleNames.ACHIEVENT);
			}else if(enterlgic == AchieventGoLogic.FIND_NPC_MASTER)
			{/** 找师傅Npc */
				let isinteam = this._isInTeam();
				if( isinteam ) return;
				let school = LoginModel.getInstance().roleDetail.school;
				let masterId = AchieventModel.getInstance().MasterNpcDic[school].masterid;
				var schoolInfo = createrole.models.LoginModel.getInstance().schoolInfo[school] as SchoolInfoBaseVo;//z职业配置表中的内容
				let MapId = schoolInfo.schoolmapid;
				HudModel.getInstance().useapp = this._app;
				this._app.sceneRoot.istask = 2;
				HudModel.getInstance().jumpmap(MapId,masterId);
				ModuleManager.hide(ModuleNames.ACHIEVENT);
			}else if(enterlgic == AchieventGoLogic.FAMILY_EVENT)
			{/** 帮会相关 */
				/** 首先判断是否加入工会，有跳到相关界面 没有则跳到帮派申请界面 */
				let clanNum = HudModel.getInstance().clankey;
				let flag:boolean = false;
				flag = clanNum > 0? true:false;
				if(!flag)
				{/** 没有帮派 */
					let FamilyJoinViewMediator : family.FamilyJoinViewMediator;
					FamilyJoinViewMediator =  new family.FamilyJoinViewMediator(this._app);
					ModuleManager.hide(ModuleNames.ACHIEVENT);
					LoginModel.getInstance().CommonPage = "Achievement";
					FamilyJoinViewMediator.show();
				}else 
				{/** 有帮派 判断相应的逻辑线 */
					if(finish == 5)
					{/** 帮派发言 */
						ChatModel.getInstance().Firstchannel = 4;
						ModuleManager.show(ModuleNames.Chat,this._app);
						ModuleManager.hide(ModuleNames.ACHIEVENT);
					}else if(finish == 43)
					{/** 工会符文 */
						let FamilyFuWenViewMediator: family.FamilyFuWenViewMediator;
						FamilyFuWenViewMediator =  new family.FamilyFuWenViewMediator(this._app);
						FamilyFuWenViewMediator.show();
						ModuleManager.hide(ModuleNames.ACHIEVENT);
						LoginModel.getInstance().CommonPage = "Achievement";
					}
				}
			}

		}

		/** 判断组队状态 */
		private _isInTeam():boolean
		{
			let inTeamGroup =  HudModel.getInstance().chargeInGroup();
            if( inTeamGroup ) //处于组队
			{
				let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[PromptExplain.IN_TEAM_GROUP];
				let tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
				tips.onShow(chattext.msg);
				return true;
			}else return false;
		}
		/** 角色信息界面 */
		private onLoadRoleInfo():void
		{
			ModuleManager.show(ModuleNames.ROLE_Info,this._app);
			RoleInfoModel.getInstance().currentKey = 2;
		}
		/** 积分兑换 */
		private onLoadExchangeView():void
		{
			 let RoleJiFenDuiHuanMediator :game.modules.roleinfo.RoleJiFenDuiHuanMediator;
			 RoleJiFenDuiHuanMediator =  new game.modules.roleinfo.RoleJiFenDuiHuanMediator(this._app);
			 RoleJiFenDuiHuanMediator.show();
		}
		/** 宠物界面 */
		private onLoadPetSystem(index:number):void
		{
			let petNum = game.modules.pet.models.PetModel.getInstance().pets.keys.length;
			if(petNum == 0)
			{/** 没有宠物弹窗 */
			
				let promptId = PromptExplain.COMLE_MAIN_PET_TASK;
				let prompt = HudModel.getInstance().promptAssembleBack(promptId);
				this.DisappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
				this.DisappearMessageTipsMediator.onShow(prompt);
			}else
			{
				PetModel.getInstance().tabnum = index;
				ModuleManager.show(ModuleNames.PET,this._app);
			}
			
		}
		/** 周历界面 */
		private onLoadZhouLiView():void
		{
			let ActivityZhouLiMediator :game.modules.activity.ActivityZhouLiMediator;
			ActivityZhouLiMediator =  new game.modules.activity.ActivityZhouLiMediator(this._app);
			ActivityZhouLiMediator.show();

		}
		/** 排行榜界面 */
		private onLoadRankingListView():void
		{
			ModuleManager.show(ModuleNames.RANKING_LIST,this._app);
		}
		/** 强化界面 */
		private onLoadStrengthSystem(index:number):void
		{
			StrengTheningModel.getInstance().tabNum = index;
			ModuleManager.show(ModuleNames.STRENG_THENING,this._app);
			LoginModel.getInstance().transferInterface = ModuleNames.STRENG_THENING;
		}
		/** 背包界面 */
		private onLoadBagSystem():void
		{
			ModuleManager.show(ModuleNames.BAG,this._app);
		}
		/** 好友赠送礼物 */
		private onLoadGiftView():void
		{
			let GiveGiftViewMediator : game.modules.friend.GiveGiftViewMediator;
			GiveGiftViewMediator = new game.modules.friend.GiveGiftViewMediator(this._app);
			GiveGiftViewMediator.show(true);
		}
		/** 活动表中的内容 */
		private onLoadActivitySystem():void
		{
			ActivityModel.getInstance().firstInterface = 1;
			ModuleManager.show(ModuleNames.ACTIVITY,this._app);
		}
		/** 世界聊天频道 */
		private onLoadWorldCaht():void
		{
			ChatModel.getInstance().Firstchannel = 1;
			ModuleManager.show(ModuleNames.Chat,this._app);
		}
		/** 好友界面 */
		private onLoadFriendSystem():void
		{
			ModuleManager.show(ModuleNames.FRIEND,this._app);
		}
		/** 红包界面 */
		private onLoadRedPacketSystem():void
		{
			ModuleManager.show(ModuleNames.RED_PACKET,this._app);
		}
		/** 战斗技能 */
		private onLoadSkillSystem(index:number):void
		{
			game.modules.skill.models.SkillModel.getInstance().currenTabNum = index;
			ModuleManager.show(ModuleNames.SKILL,this._app);
		}
		/** 助战界面 */
		private onLoadZhuZhanSystem():void
		{
			ModuleManager.show(ModuleNames.HUOBAN,this._app);
		}

		/** 好友界面 */
		private onLoadAddFriendsSystem():void
		{
			let AddFriendViewMediator: game.modules.friend.AddFriendViewMediator;
			AddFriendViewMediator = new game.modules.friend.AddFriendViewMediator(this._app);
			AddFriendViewMediator.show();

		}
		public hide():void 
		{	
			super.hide();
			ModuleManager.hide(ModuleNames.ACHIEVENT);
	
		}
		
		public getView():Sprite 
		{
			return this._viewUI;
		}
	}
}