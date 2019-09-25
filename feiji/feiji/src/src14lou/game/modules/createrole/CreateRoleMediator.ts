module game.modules.createrole{
    /** 创建角色界面 */
	export class CreateRoleMediator extends game.modules.UiMediator{
        private _viewUI:ui.common.CreateRoleUI;//ui.common.CreateRoleUI;
		//private _loginView:ui.common.LoginUI;
		private _renameMediators:commonUI.RenameMediators;
		public model:ModelsCreate;
		private scene2DPanel:TestRole2dPanel;
		/** 飘窗 */
        private _disappearMessageTipsMediator : DisappearMessageTipsMediator;
		/** 服务器选择界面 */
		private _serverSelectMediator:ServerSelectMediator;
		/** 指被选中职业 */
		private _school:number;
		/** 指被选中的职业按钮 */
		private _btn:Laya.Button;
		/** 指当前角色性别 */
		private _sex:number;
		/** 角色字典 */
		private _roleDic:any;
		/** 存储备选模型 */
		private readyModel = [];
		/** 职业1 */
		private left_occupation:Laya.Button;
		/** 职业2 */
		private middle_occupation:Laya.Button;
		/** 职业3 */
		private right_occupation:Laya.Button;
		/** 名字输入框 */
		private nameinputText = new Laya.TextInput;
		/** 名称 */
		private roleName :Label;
		/** 职业 */
		private occupation :Label;
		/** 职业描述 */
		private occupationdesc1:Label;
		private occupationdesc2:Label;
		private occupationdesc3:Label;
		/** 傀儡 */
		private kuilei:YxChar3d;
        constructor(uiLayer: Sprite,app:AppBase){
			super(uiLayer);
			this._viewUI = new ui.common.CreateRoleUI();
			this._app = app;
			this.scene2DPanel=new TestRole2dPanel();
			this._viewUI.addChild(this.scene2DPanel);
            this.isCenter = false;

			this._roleDic = LoginModel.getInstance().createRoleConfigBinDic;

            this._init();
			this.registerEvent();			
		}
        /**
         * 初始化创造角色界面
         */
        private _init():void{
			let job_img:Laya.Image;
			for (var index = 1; index <= 6; index++) {
				job_img = this._viewUI["job" + index +"_img"] as Laya.Image;
				job_img.on(LEvent.MOUSE_DOWN,this, this.jobImgClick);
			}
			// //默认随机角色被选中
			// this.randomSelectJob();
        }
		// /**
		//  * 默认随机角色被选中
		//  */
		// private randomSelectJob():void{
		// 	this.job = Math.floor(Math.random()*RoleType.MONV);
		// 	if(this.job > RoleType.MONV || this.job < RoleType.RENNAN){
		// 		this.randomSelectJob();
		// 	}
		// 	else if(this.lastRandomJob != undefined && this.job == this.lastRandomJob){
		// 		this.randomSelectJob();
		// 	}
		// 	else{
		// 		this.updateJobView(this.job);
		// 		this.lastRandomJob = this.job;
		// 	}
		// }
		/**
		 * 根据不同的角色id，显示不同的门派（职业）选择图片
		 * @param roleid 角色id
		 */
		private _showSchoolSelect(roleid:number):void{
			var _roleConfigVo:CreateRoleConfigBaseVo = LoginModel.getInstance().createRoleConfigBinDic[roleid] as CreateRoleConfigBaseVo;						
			var _schools = _roleConfigVo.schools;
			for(let i = 1; i < 4; i++){
				let skill_btn:Laya.Button = this._viewUI["skill" + i + "_btn"] as Laya.Button;
				skill_btn.skin = "common/ui/createrole/screen"+_schools[i-1]+".png";
				skill_btn.on(LEvent.MOUSE_DOWN,this,this.schoolBeSelect,[skill_btn,_schools[i-1]]);	
			}
			if(this._btn != undefined){
				this.schoolBeSelect(this._btn,_schools[parseInt(this._btn.name)-1]);
			}
			else{
				//默认该角色选中第一个门派
				this._btn = this._viewUI.skill1_btn;
				this.schoolBeSelect(this._btn,_schools[parseInt(this._btn.name)-1]);
			}
		}
		/**
		 * 显示职业描述
		 * @param school 职业
		 */
		private _showSchoolDescribe(school?:number):void{
			if(school == null){
				this._viewUI.schoolDescribe1_lab.text = "";
				this._viewUI.schoolDescribe2_lab.text = "请选择门派";
				this._viewUI.schoolDescribe3_lab.text = "";
				this._viewUI.schoolicon_img.skin = "";
			}			
			else{
				this._school = school;
				let _schoolInfoVo:SchoolInfoBaseVo = LoginModel.getInstance().schoolInfo[school] as SchoolInfoBaseVo;
				var _describe = _schoolInfoVo.describe;
				_describe = _describe.replace(/\s*/g,"");//去除门派描述中的所有空格
				this._viewUI.schoolDescribe1_lab.text = _describe.slice(0,4);
				this._viewUI.schoolDescribe2_lab.text = _describe.slice(4,8);
				this._viewUI.schoolDescribe3_lab.text = _describe.slice(8,12);
				var _schoolicon = _schoolInfoVo.schoolicon;
				this._viewUI.schoolicon_img.skin = "common/ui/createrole/character_img_shuxing_"+_schoolicon+".png"
				this._viewUI.skill_lab.text = _schoolInfoVo.name;
			}
		}
		////////////////
        ///事件
        ////////////////
        /**注册事件
         * @describe  UI的事件监听注册与消息监听注册
         */
		private registerEvent():void{
			//按钮事件
			this._viewUI.return_btn.on(LEvent.CLICK,this, this.returnLoginHandler);
			this._viewUI.start_btn.on(LEvent.MOUSE_DOWN,this, this.toCreatRoleHandler);
			this._viewUI.left_btn.on(LEvent.MOUSE_DOWN,this, this.leftJobHandler);
			this._viewUI.right_btn.on(LEvent.MOUSE_DOWN,this, this.rightJobHandler);
			this._viewUI.random_btn.on(LEvent.CLICK,this,this.makeRandomName);
			//输入角色名字文本域添加监听事件
			this._viewUI.job_input.on(LEvent.MOUSE_MOVE,this,this.setText,[this._viewUI.job_input]);
			//消息事件
			models.LoginProxy.getInstance().on(models.LOGIN_EVENT,this, this.onLogin);
			Network._instance.addHanlder(ProtocolsEnum.SEnterWorld, this, this.onEnterWorld);
			models.LoginProxy.getInstance().on(models.GET_RANDOM_NAME,this, this.setRandomName);
			models.LoginProxy.getInstance().on(models.CREATE_ROLE_ERROE,this,this.showTipsMsg);
		}
		/**
		 * 设置角色随机的名字
		 */
		private setRandomName(name:string):void{
			if(name.length<=3){
				RequesterProtocols._instance.c2s_CRequestName(this._sex);
			}
			else{
				this.nameinputText.text = name;
			}
		}
		/**
		 * 生成随机角色名字
		 */
		private makeRandomName():void{
			RequesterProtocols._instance.c2s_CRequestName(this._sex);
		}
		/**
		 * 置空提示信息
		 */
		private setText(input:any):void{
			input.prompt = "";
		}
		private onLogin(e:any):void{
			//默认随机角色被选中
			//this.randomSelectJob();
			//默认选中人男
			this.job = RoleType.RENNAN;
			this.selectedJobImg = null;
			this.updateJobView(this.job);
			this.show();
		}
		
		/** 指向被选中的角色 */
		private job:number = 1;
		/** 上一次随机的默认选中角色 */
		private lastRandomJob:number;
		/** 指向被选中的单选框 */
		private selectedJobImg:Laya.Image;
		private jobImgClick(e:LEvent):void{
			let job_img:Laya.Image = e.currentTarget as Laya.Image;
			this.job = parseInt(job_img.name);
			this.updateJobView(this.job);
		}
		/**
		 * 选择门派按钮被点击
		 * @param btn 门派按钮的索引
		 * @param school 职业，即门派
		 * @param e 
		 */
		private schoolBeSelect(btn:any,school?:number):void{
			this._btn = btn;
			switch(btn){
				case this._viewUI.skill1_btn:
					this._viewUI.skill1_btn.selected = true;
					this._viewUI.skill2_btn.selected = false;
					this._viewUI.skill3_btn.selected = false;
					break;
				case this._viewUI.skill2_btn:
					this._viewUI.skill1_btn.selected = false;
					this._viewUI.skill2_btn.selected = true;
					this._viewUI.skill3_btn.selected = false;
					break;
				case this._viewUI.skill3_btn:
					this._viewUI.skill1_btn.selected = false;
					this._viewUI.skill2_btn.selected = false;
					this._viewUI.skill3_btn.selected = true;
					break;
			}
			if(school){
				this._showSchoolDescribe(school);
			}
		}

		private leftJobHandler(e:any):void{
			if (this.job > RoleType.RENNAN) {
				this.job--;
			}else{
				this.job = RoleType.MONV;
			}
			this.updateJobView(this.job);
		}
		private rightJobHandler(e:any):void{
			if (this.job < RoleType.MONV) {				
				this.job++;
			}else{
				this.job = RoleType.RENNAN;
			}
			this.updateJobView(this.job);
		}

		private pointJob(job:number = 1):void
		{
			if( this.job == job ) return ;
			this.job = job;
			this.updateJobView(this.job);
		}
		/**
		 * 更改创建角色界面的视图
		 * @param job 游戏角色的id
		 */
		private updateJobView(job:number):void{
			let job_img:Laya.Image = this._viewUI["job" + job +"_img"] as Laya.Image;

			job_img.skin = "common/ui/createrole/jobcheck.png";
			if(this.selectedJobImg){
				this.selectedJobImg.skin = "common/ui/createrole/jobcircle.png";
			}
			this.selectedJobImg = job_img;			
			let createRoleConfigBaseVo:CreateRoleConfigBaseVo = LoginModel.getInstance().createRoleConfigBinDic[job] as CreateRoleConfigBaseVo;
			this._viewUI.job_lab.text = createRoleConfigBaseVo.name;
			this.model = new ModelsCreate();
			//显示人物3d模型
			this.showRoleModel(createRoleConfigBaseVo);

			if((job+2)%2 != 0){
				this._sex = RoleSex.MAN;
			}
			else{
				this._sex = RoleSex.WOMAN;
			}

			this._showSchoolSelect(job);
		}
		/**
		 * 显示人物3d模型
		 */
		private showRoleModel(data:any):void{
			var referui:any=models.LoginModel.getInstance().referUI;
			this.scene2DPanel.ape.x=referui.x*referui.globalScaleX;
		    this.scene2DPanel.ape.y=referui.y*referui.globalScaleY;
			this.modelcreate(data["model"]);
		}
		/**人物模型创建 */
		modelcreate(modelid:number):void{
            this.model.role3d = models.LoginModel.getInstance().role3dModel;
			if(this.model.role3d){
				//先清除
				Laya.timer.clear(this,this.createModel);
				let action = this.model.role3d.play("jump_02", 2);
				let timer = LoginModel.getActionTime(this.job,"jump_02");
				Laya.timer.once(timer, this, this.createModel,[modelid])
			}else this.createModel(modelid);
		}
		private createModel(modelid: number): void {
			if(this.model.role3d){
			this.scene2DPanel.removeSceneChar(this.model.role3d);
			for (var _index = 0; _index < this.readyModel.length; _index++) {
				this.scene2DPanel.removeSceneChar(this.readyModel[_index]);
			}
			}
			var referui: any = models.LoginModel.getInstance().referUI;
			if (referui) {
				this.model.role3d = new YxChar3d();
				// let scene = new YxChar3d();
				// scene.setRoleUrl(getRoleUrl(10001 + ""));
				this.model.role3d.setRoleUrl(getRoleUrl(modelid + ""));
				// scene.set2dPos((this._viewUI.selectRole_box.x+ this._viewUI.selectRole_box.width*0.5) * referui.globalScaleX, (this._viewUI.selectRole_box.y+ this._viewUI.selectRole_box.height*2.8) * referui.globalScaleY)
				//this.model.role3d.set2dPos(50,420);  //坐标
				this.model.role3d.set2dPos((this._viewUI.selectRole_box.x+ this._viewUI.selectRole_box.width*0.5) * referui.globalScaleX,(this._viewUI.selectRole_box.y+ this._viewUI.selectRole_box.height*2.7) * referui.globalScaleY)
				//(this._viewUI.selectRole_box.y+this._viewUI.roleModel_img.height/4*3+this._viewUI.roleModel_img.y)*referui.globalScaleY
				//(this._viewUI.selectRole_box.x+this._viewUI.roleModel_img.width/2+this._viewUI.roleModel_img.x)*referui.globalScaleX
				// scene.scale = 1.5;
				this.model.role3d.scale = 1.5;
				// scene.rotationY = 180;
				// scene.rotationX = -27;
				// scene.rotationX=170;
				// this.model.role3d.rotationZ = 30
				this.model.role3d.rotationY = 180;
				this.model.role3d.rotationX = -25;
				
				// this.scene2DPanel.addSceneChar(scene)
				this.scene2DPanel.addSceneChar(this.model.role3d);
				this.addReadyChar(modelid, referui);
				let action = this.model.role3d.play("jump_01", 1);
				let actiontime =  LoginModel.getActionTime(this.job,"jump_01");
		// 		Laya.timer.once(actiontime, this, () => { //不调用下面的统一动作处理，因为默认初始动作是rest01
		// 			this.model.role3d.play("rest_01", 1);
		// 			this.model.role3d.setWeaponSlotByAvatar(5008001, "weapon_dao");
		// 			let actionTimer = LoginModel.getActionTime(this.job, "rest_01");
		// 			Laya.timer.once(actionTimer,this,this.SatandAction,null,true);
		// })// this, this.chooseOccupation,["rest_01","weapon_dao"])
			let weapon = LoginModel.getweaponName(this.job);
			let weaponNum1 = LoginModel.getweapon(this.job,weapon[0]);
			Laya.timer.once(actiontime,this,this.chooseOccupation,["rest_01",weapon[0],weaponNum1,this.left_occupation])
			}
			models.LoginModel.getInstance().role3dModel = this.model.role3d;
		}
		/** 增加备选模型
		 * @param modelid 当前模型
		 * @param referui 参照ui
		 */
		private addReadyChar(modelid:number,referui:any):void
		{
			this.readyModel = [];
			for (var _index = 2010101; _index <= 2010106; _index++) {
				if(_index != modelid )
				{
					let model = new YxChar3d();
					model.setRoleUrl(getRoleUrl(_index + ""));
					model.set2dPos((this._viewUI.selectRole_box.x+ this._viewUI.selectRole_box.width*0.55) * referui.globalScaleX,(this._viewUI.selectRole_box.y+ this._viewUI.selectRole_box.height*2.7) * referui.globalScaleY)
					model.scale = 1.5;
					model.rotationY = 180;
					model.rotationX = -25;
					this.scene2DPanel.addSceneChar(model);
					this.readyModel.push(model);
				}
			}
			if(this.scene2DPanel.numChildren <= 2)
			{
				// var leftCharbtn = this.addFunctionbutton(referui,100,1100,"common/ui/beijingtu/character_btn1_zuo.png"); //common/ui/beijingtu/character_btn1_zuo.png
				// var rightCharbtn =this.addFunctionbutton(referui,800,1100,"common/ui/beijingtu/character_btn1_you.png");
				var _roleConfigVo: CreateRoleConfigBaseVo = LoginModel.getInstance().createRoleConfigBinDic[this.job] as CreateRoleConfigBaseVo;
				var _schools = _roleConfigVo.schools;
				this.left_occupation = this.addFunctionbutton(referui,635,971,"common/ui/createrole/screen"+_schools[0]+".png");
				this.middle_occupation =this.addFunctionbutton(referui,560,1046,"common/ui/createrole/screen"+_schools[1]+".png");
				this.right_occupation =this.addFunctionbutton(referui,635,1121,"common/ui/createrole/screen"+_schools[2]+".png");
				let rennan = this.addFunctionbutton(referui,37,822,"common/ui/createrole/xiaoanniu.png","人男");
				let rennv = this.addFunctionbutton(referui,75,897,"common/ui/createrole/xiaoanniu.png","人女");
				let xiannan = this.addFunctionbutton(referui,112,971,"common/ui/createrole/xiaoanniu.png","仙男");
				let xiannv = this.addFunctionbutton(referui,112,1046,"common/ui/createrole/xiaoanniu.png","仙女");
				let monan = this.addFunctionbutton(referui,75,1120,"common/ui/createrole/xiaoanniu.png","魔男");
				let monv = this.addFunctionbutton(referui,37,1196,"common/ui/createrole/xiaoanniu.png","魔女");
				this.setBtnFont(rennan,"SimHei",28,"#000000");
				this.setBtnFont(rennv,"SimHei",28,"#000000");	
				this.setBtnFont(xiannan,"SimHei",28,"#000000");	
				this.setBtnFont(xiannv,"SimHei",28,"#000000");	
				this.setBtnFont(monan,"SimHei",28,"#000000");	
				this.setBtnFont(monv,"SimHei",28,"#000000");						
				// leftCharbtn.on(LEvent.CLICK, this, this.leftJobHandler);
				// rightCharbtn.on(LEvent.CLICK, this, this.rightJobHandler);
				rennan.on(LEvent.CLICK,this,this.pointJob,[1]);
				rennv.on(LEvent.CLICK,this,this.pointJob,[2]);
				xiannan.on(LEvent.CLICK,this,this.pointJob,[3]);
				xiannv.on(LEvent.CLICK,this,this.pointJob,[4]);
				monan.on(LEvent.CLICK,this,this.pointJob,[5]);
				monv.on(LEvent.CLICK,this,this.pointJob,[6]);
				let weapon = LoginModel.getweaponName(this.job);
			let weaponNum1 = LoginModel.getweapon(this.job, weapon[0]);
			let weaponNum2 = LoginModel.getweapon(this.job, weapon[1]);
			let weaponNum3 = LoginModel.getweapon(this.job, weapon[2]);
			this.left_occupation.on(LEvent.CLICK, this, this.chooseOccupation, ["rest_01", weapon[0], weaponNum1,this.left_occupation]);
			this.middle_occupation.on(LEvent.CLICK, this, this.chooseOccupation, ["rest_02", weapon[1], weaponNum2,this.middle_occupation]);
			this.right_occupation.on(LEvent.CLICK, this, this.chooseOccupation, ["rest_03", weapon[2], weaponNum3,this.right_occupation]);
			/** 增加其他ui信息 */
			this.addUiDetail(referui);
		}else
		{
			this.left_occupation.off(LEvent.CLICK,this,this.chooseOccupation)
			this.middle_occupation.off(LEvent.CLICK,this,this.chooseOccupation)
			this.right_occupation.off(LEvent.CLICK,this,this.chooseOccupation)
			let weapon = LoginModel.getweaponName(this.job);//武器
			let weaponNum1 = LoginModel.getweapon(this.job, weapon[0]);//武器造型
			let weaponNum2 = LoginModel.getweapon(this.job, weapon[1]);
			let weaponNum3 = LoginModel.getweapon(this.job, weapon[2]);
			var _roleConfigVo:CreateRoleConfigBaseVo = LoginModel.getInstance().createRoleConfigBinDic[this.job] as CreateRoleConfigBaseVo;						
			var _schools = _roleConfigVo.schools;
			this.left_occupation.skin = "common/ui/createrole/screen"+_schools[0]+".png";
			this.left_occupation.on(LEvent.CLICK, this, this.chooseOccupation, ["rest_01", weapon[0], weaponNum1,this.left_occupation]);
			this.middle_occupation.skin = "common/ui/createrole/screen"+_schools[1]+".png";
			this.middle_occupation.on(LEvent.CLICK, this, this.chooseOccupation, ["rest_02", weapon[1], weaponNum2,this.middle_occupation]);
			this.right_occupation.skin = "common/ui/createrole/screen"+_schools[2]+".png";
			this.right_occupation.on(LEvent.CLICK, this, this.chooseOccupation, ["rest_03", weapon[2], weaponNum3,this.right_occupation]);
		}
		
		}
		/** 职业转换 */
		private chooseOccupation(action:string,weapon:string,weaponNum:number,job_Button:Laya.Button):void
		{
			// this.model.role3d.curentAction = action;
			//选中职业
			this._occupationSelect(job_Button);
			if(action == this.model.role3d.curentAction) return;
			
			this.model.role3d.play(action,1);
			this.model.role3d.setWeaponSlotByAvatar(weaponNum,weapon);
			let actionTimer = LoginModel.getActionTime(this.job,action);
			if( weapon == "weapon_kuilei" ) 
			{
				let kuilei = new YxChar3d();
				if( this.kuilei)
				{
					kuilei = this.kuilei
				}else
				{
					kuilei.setRoleUrl(getRoleUrl(5003010 + ""));
					var referui: any = models.LoginModel.getInstance().referUI;
					kuilei.set2dPos((this._viewUI.selectRole_box.x + this._viewUI.selectRole_box.width * 0.5) * referui.globalScaleX, (this._viewUI.selectRole_box.y + this._viewUI.selectRole_box.height * 2.8) * referui.globalScaleY)
					kuilei.scale = 1.5;
					kuilei.rotationY = 180;
					kuilei.rotationX = -25;
					this.scene2DPanel.addSceneChar(kuilei);
					this.readyModel.push(kuilei);
					this.kuilei = kuilei;
				}
				if(this.job == RoleType.MONAN) 	kuilei.play("rest_02",1);
				else if( this.job == RoleType.RENNV)  kuilei.play("rest_01",1);
				let time = actionTimer;
				Laya.timer.once(time,this,()=>{ kuilei.play("stand_02",0); },null,true)
			}else if( this.kuilei)
			{
				this.scene2DPanel.removeSceneChar(this.kuilei);
				this.kuilei = null;
			}
			Laya.timer.once(actionTimer,this,this.SatandAction,null,true); //this.model.role3d.play("stand_02",0);},null,false);
			let createRoleConfigBaseVo:CreateRoleConfigBaseVo = LoginModel.getInstance().createRoleConfigBinDic[this.job] as CreateRoleConfigBaseVo;
			this.roleName.text =  createRoleConfigBaseVo.name;					
			var _schools = createRoleConfigBaseVo.schools;
			let _schoolInfoVo:SchoolInfoBaseVo
			if( action == "rest_01")
			{
				 this._school = _schools[0];
				 _schoolInfoVo = LoginModel.getInstance().schoolInfo[_schools[0]] as SchoolInfoBaseVo;
				 var _describe = _schoolInfoVo.describe;
				_describe = _describe.replace(/\s*/g,"");//去除门派描述中的所有空格		
				 this.occupationdesc1.text =  _describe.slice(0,4);
				 this.occupationdesc2.text =  _describe.slice(4,8);
				 this.occupationdesc3.text =  _describe.slice(8,12);
			}else if( action == "rest_02")
			{
				this._school = _schools[1];
				_schoolInfoVo = LoginModel.getInstance().schoolInfo[_schools[1]] as SchoolInfoBaseVo;
				 var _describe = _schoolInfoVo.describe;
				_describe = _describe.replace(/\s*/g,"");//去除门派描述中的所有空格		
				this.occupationdesc1.text =  _describe.slice(0,4);
				 this.occupationdesc2.text =  _describe.slice(4,8);
				 this.occupationdesc3.text =  _describe.slice(8,12);
			} else if( action == "rest_03" )
			{
				 this._school = _schools[2];
				_schoolInfoVo = LoginModel.getInstance().schoolInfo[_schools[2]] as SchoolInfoBaseVo;
				 var _describe = _schoolInfoVo.describe;
				_describe = _describe.replace(/\s*/g,"");//去除门派描述中的所有空格		
				 this.occupationdesc1.text =  _describe.slice(0,4);
				 this.occupationdesc2.text =  _describe.slice(4,8);
				 this.occupationdesc3.text =  _describe.slice(8,12);
			}
			else return ;
 			this.occupation.text = _schoolInfoVo.name;
			
		}

		/** 职业选中状态 
		 * @param job_Button 选中职业
		*/
		private _occupationSelect(job_Button:Laya.Button):void
		{
			
			if (this.left_occupation)
				this.left_occupation.selected = false;
			if (this.middle_occupation)
				this.middle_occupation.selected = false;
			if (this.right_occupation)
				this.right_occupation.selected = false;
			if(job_Button)
				job_Button.selected = true;
		}
		/** 设置按钮字体 */
		private setBtnFont(btn:Button, font:string,fontsize:number,color:string):void
		{
			btn.labelFont = font;
			btn.labelSize = fontsize;
			btn.labelColors = color+","+color+","+color+","+color;
		}

		/** 增加其他ui */
		private addUiDetail(referui:any):void
		{
			//返回按钮
			let return_btn = this.addFunctionbutton(referui,37,60,"common/ui/createrole/character_btn1_fanhui_2.png","");
			return_btn.on(LEvent.CLICK,this,this.returnLoginHandler);
			let _nameBg = this.addFunctionImage(referui,149,82,"common/ui/createrole/shadow1.png");
			let name = this.addLabel(27,"#ea221f","SimHei")
			name.text ="人男"
			name.pos(52,15);
			let school = this.addLabel(27,"#ffffff","SimHei");
			school.text = "七星观";
			school.pos(149,15);
			_nameBg.addChild(name);
			this.roleName = name;
			_nameBg.addChild(school);
			this.occupation = school;
			let introduceImg = this.addFunctionImage(referui,186,934,"common/ui/createrole/character_img_diban.png");
			var _roleConfigVo:CreateRoleConfigBaseVo = LoginModel.getInstance().createRoleConfigBinDic[this.job] as CreateRoleConfigBaseVo;	
			var _schools = _roleConfigVo.schools;
			let _schoolInfoVo:SchoolInfoBaseVo = LoginModel.getInstance().schoolInfo[_schools[0]] as SchoolInfoBaseVo;
			var _describe = _schoolInfoVo.describe;
				_describe = _describe.replace(/\s*/g,"");//去除门派描述中的所有空格					
			
			let descLab1 = this.addLabel(25,"#000000","SimHei")
			let descLab2 = this.addLabel(25,"#000000","SimHei")
			let descLab3 = this.addLabel(25,"#000000","SimHei")
			descLab1.text = _describe.slice(0,4);
			descLab2.text = _describe.slice(4,8);
			descLab3.text = _describe.slice(8,12);
			descLab1.pos(150,75)
			descLab2.pos(150,110)
			descLab3.pos(150,145)
			this.occupationdesc1 = descLab1;
			this.occupationdesc2 = descLab2;
			this.occupationdesc3 = descLab3;
			let textinput = new Laya.TextInput;
			textinput.prompt = "请输入名字";
			textinput.color = "#ffffff";
			textinput.promptColor =  "#13FF00";
			textinput.font = "SimHei";
			textinput.fontSize = 25;
			textinput.align = "center";
			textinput.width = 220;
			textinput.height = 46;
			introduceImg.addChild(textinput)
			introduceImg.addChild(descLab1)
			introduceImg.addChild(descLab2)
			introduceImg.addChild(descLab3)
			textinput.pos(50,270);
			this.nameinputText = textinput;
			let startgame_btn = this.addFunctionbutton(referui,262,1270,"common/ui/createrole/btn_start_game.png","开始游戏");
			startgame_btn.stateNum = 1;
			startgame_btn.labelSize = 30;
			startgame_btn.on(LEvent.CLICK,this,this.toCreatRoleHandler);
			let randomnameBtn = this.addFunctionbutton(referui,471,1177,"common/ui/createrole/team_shaizi.png","");
			randomnameBtn.on(LEvent.CLICK,this,this.makeRandomName);
		}
		/** 站立动作 */
		private SatandAction():void
		{
			this.model.role3d.play("stand_02",0);
		}
		/** 增加按钮 */
		private addFunctionbutton(referui:any,xradio:number,yradio:number,url:string,name:string = ""):Button
		{
			let button = new Laya.Button;
			button.pos(xradio,yradio );
			button.skin = url;
			button.stateNum = 2;
			button.label = name;
			this.scene2DPanel.addChildAt(button, this.scene2DPanel.numChildren);
			return button;
		}
		/** 增加图片 */
		private addFunctionImage(referui:any,xpos:number,ypos:number,url:string):LImage
		{
			let image =  new Laya.Image;
			image.pos(xpos , ypos );
			image.skin = url;	
			this.scene2DPanel.addChildAt(image, this.scene2DPanel.numChildren);
			return image;
		}
		/** 增加Label */
		private addLabel(fontsize:number,color:string,font:string):Label
		{
			let label  = new Laya.Label;
			label.font = font;
			label.fontSize = fontsize;
			label.color = color;
			return label;
		}
		private toCreatRoleHandler(e:any):void{
			let nickName:string = this.nameinputText.text;//this._viewUI.job_input.text;
			if(nickName.length <=3  || nickName.length >= 15){//名字过短或名字过长
				this.show_Msg(chat.models.ChatModel._instance.chatMessageTips[420015].msg);
				return;
			}
			this._renameMediators = new commonUI.RenameMediators(this._viewUI,this._app);
			let flag = this._renameMediators.chargeCharacter(nickName);//判断名字是否合法
			if(!flag){
				if(/^d+$/.test(nickName)){//命名必须包含一个汉字或者字母
					this.show_Msg(chat.models.ChatModel._instance.chatMessageTips[420020].msg);
					return;
				}
				else{//只能输入2-7个中文，4-14个英文或者、数字并且不能含有非法字符
					this.show_Msg(chat.models.ChatModel._instance.chatMessageTips[420018].msg);
					return;
				}
			}

			//判断玩家是否选中了职业
			if(this._school){
				//发送创角请求
				RequesterProtocols._instance.c2s_create_role(nickName, this._school, this.job);
			}
			else{
				this.show_Msg(chat.models.ChatModel._instance.chatMessageTips[420023].msg);
			}
		}
		/**
		 * 根据创建角色时发生错误，来显示提示信息
		 * @param errcode 错误类型
		 */
		private showTipsMsg(errcode:number):void{
			switch(errcode){
				case CreateErrCode.CREATE_OK:
					break;
				case CreateErrCode.CREATE_ERROR:
					break;
				case CreateErrCode.CREATE_INVALID://特殊字符过多
					this.show_Msg(chat.models.ChatModel._instance.chatMessageTips[420019].msg);
					break;
				case CreateErrCode.CREATE_DUPLICATED://角色名已重复
					this.show_Msg(chat.models.ChatModel._instance.chatMessageTips[420022].msg);
					break;
				case CreateErrCode.CREATE_OVERCOUNT://创建的新角色数量过多
					this.show_Msg(chat.models.ChatModel._instance.chatMessageTips[420021].msg);
					break;
				case CreateErrCode.CREATE_OVERLEN:
				case CreateErrCode.CREATE_SHORTLEN:
					this.show_Msg(chat.models.ChatModel._instance.chatMessageTips[420015].msg);
					break;
				case CreateErrCode.CREATE_CREATE_GM_FORBID://GM已经关闭创建角色!!!
					this.show_Msg(chat.models.ChatModel._instance.chatMessageTips[420017].msg);
					break;
			}
		}
		/**
         * 弹出消息气泡飘窗
         */
        private show_Msg(msg:any):void{
            this._disappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
            this._disappearMessageTipsMediator.onShow(msg);
        }
		private returnLoginHandler(e:any):void{
			this._btn = undefined;
			console.log("show returnLogin", e);
			//this.hide();
			//this.uiLayer.addChild(this._loginView);
			//this.layout(this._loginView);
			////////////////断开连接服务器/////////////////////////////////
			Network._instance.cleanSocket();
			this.hide();
			////////////////重新连接服务器/////////////////////////////////
        	Network._instance.connectByUrl(Browser.window.server);
			game.modules.createrole.models.LoginProxy.getInstance().linkState = 0;
			this._serverSelectMediator = new ServerSelectMediator(this._app);
			this._serverSelectMediator.show();
		}
        public show():void{
			super.show();
		}

		public hide():void {
			super.hide();
		}
		
		public getView():Sprite {
			return this._viewUI;
		}

		// 进入场景返回
		private onEnterWorld(optcode: number, msg: hanlder.S2C_SEnterWorld): void {
			console.log("onEnterWorld", msg.roleDetail);
			console.log("我的职业", msg.roleDetail.school);
			 game.modules.mainhud.models.HudProxy.getInstance().once(game.modules.mainhud.models.GETPOST_EVENT,this,this.changepost);
			// let schoolInfoBaseVo:SchoolInfoBaseVo = LoginModel.getInstance().schoolInfo[msg.roleDetail.school] as SchoolInfoBaseVo;
			//let schooljobmapid = schoolInfoBaseVo.schooljobmapid;
			RequesterProtocols._instance.c2s_requst_shopprice(shopType.SHANGHUI_SHOP);
			
			//请求系统设置信息
			RequesterProtocols._instance.c2s_CGetSysConfig();

			//Laya.timer.loop()
			//Laya.timer.frameLoop()


			//this._viewUI.xx_txt.text = LoginModel._instance.roleDetail.rolename
		}
		changepost():void{
			let schooljobmapid = game.modules.mainhud.models.HudModel.getInstance().sceneid;
			console.log("职业地图id", schooljobmapid);
			let mapinfo:MapConfigBaseVo = game.modules.mapworld.models.MapModel.getInstance().MapConfigData[schooljobmapid]
			this._app.uiRoot.toLoadMainPlayerData();//UIRoot加载完预加载数据common.atlas、hud.atlas、tongyong.atlas进入场景sceneObjectMgr.joinFakeMap,然后CreateObject、mapInfo.firstUpdate
        	this._app.sceneObjectMgr.init(parseInt(mapinfo.resdir))//WaitTeleteportStack、加载完load/loading0.jpg然后callTeleport(){_sceneObjectMgr.joinFakeMap}


			this.hide();
			models.LoginProxy.getInstance().event(models.PRELOAD_END);

			//显示主界面
			
			ModuleManager.show(ModuleNames.MAIN_MENU,this._app );
		}
    }
}