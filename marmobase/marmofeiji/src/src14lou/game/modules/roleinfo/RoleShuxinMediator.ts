/**
 * 人物属性类
 */
module game.modules.roleinfo{
	export class RoleShuxinMediator extends game.modules.UiMediator{
		private _viewUI:ui.common.RoleShuxinUI;
		/**称谓界面 */
		private _RoleChenweiMediator:RoleChenweiMediator;
		/**提示界面 */
		private _RoleTipMediator:RoleTipMediator;
		/**活力兑换界面 */
		private _RoleHuoliMediator:RoleHuoliMediator;
		/**飘窗提示 */
		private tips:game.modules.commonUI.DisappearMessageTipsMediator;
		/**悬浮提示 */
		private texttips:game.modules.commonUI.TextTipsMediator;
		/**模型相关 */
		public model:ModelsCreate;
		/**模型相关 */
		private scene2DPanel:TestRole2dPanel;
		/**s升级经验限制表 */
		private resObj:Object;
		/**高级属性名 */
		private arrtNameArr:Array<any>;
		/**高级属性值 */
		private arrtNumArr:Array<number>;
		/**高级属性提示 */
		private arrtTipArr:Array<any>;
		/**高级属性字典key:列表下标，value:属性值 */
		private arrtNumDic:Dictionary;
		/**人物初始属性*/
		private myData:createrole.models.RoleDetailVo;
		/**称谓字典key:称谓表id,value:称谓名 */
		private roleTitleData:Laya.Dictionary;
		/**门派地图id */
		private zhiyeMapId:number;
		constructor(uiLayer: Sprite){
			super(uiLayer);
			this._viewUI = new ui.common.RoleShuxinUI();
			this._RoleChenweiMediator = new RoleChenweiMediator(RoleInfoModel.getInstance().appBase);
			this._RoleTipMediator = new RoleTipMediator(this._viewUI);
			this._RoleHuoliMediator = new RoleHuoliMediator(RoleInfoModel.getInstance().appBase);
			this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(RoleInfoModel.getInstance().appBase);
			this.texttips = new game.modules.commonUI.TextTipsMediator(RoleInfoModel.getInstance().appBase);
			this.scene2DPanel=new TestRole2dPanel();
			this._viewUI.bg_img.addChild(this.scene2DPanel);
			this._viewUI.mouseThrough = true;
			this.isCenter = false;
			this.initialize();
			this.init();
			this.registerEvent();
			this.eventListener();
		}
			/**注册事件监听 */
		public eventListener():void{
			mainhud.models.HudProxy.getInstance().on(mainhud.models.SRefreshRoleData_EVENT,this,this.onRefreshRoleData);
			models.RoleInfoProxy.getInstance().on(models.SApplyYingFuExprience_EVENT,this,this.onApplyYingFuExprience);
		}
		/**刷新盈福经验值 */
		public onApplyYingFuExprience():void{
			this._viewUI.yingfu_tet.text = RoleInfoModel.getInstance().SApplyYingFuExprience.toString();
		}

			/**注册点击监听 */
		private registerEvent():void{
			this._viewUI.chenwei_btn.on(LEvent.MOUSE_DOWN,this, this.showChenwei);
			this._viewUI.tip_btn.on(LEvent.MOUSE_DOWN,this, this.showTip);
			this._viewUI.huoliUse_btn.on(LEvent.MOUSE_DOWN,this, this.showHuoli);
			this._viewUI.rolesx_tab.selectHandler = new Handler(this,this.change);
			this._viewUI.tomenpai_btn.on(LEvent.MOUSE_DOWN,this, this.mapChange,[this.zhiyeMapId]);
			this._viewUI.togonghui_btn.on(LEvent.MOUSE_DOWN,this, this.mapChange,[RoleEnum.GONGHUI_MAP]);
			this._viewUI.shuxing_box.on(LEvent.MOUSE_UP,this,this.hidedata);
			this._viewUI.on(LEvent.MOUSE_OUT,this,this.hidedata);
			this._viewUI.life_tet.on(LEvent.MOUSE_DOWN,this,this.showdata,[models.RoleInfoModel.chineseStr.life_tip]);
			this._viewUI.mofa_tet.on(LEvent.MOUSE_DOWN,this,this.showdata,[models.RoleInfoModel.chineseStr.mofa_tip]);
			this._viewUI.fennu_tet.on(LEvent.MOUSE_DOWN,this,this.showdata,[models.RoleInfoModel.chineseStr.fennu_tip]);
			this._viewUI.huoli_tet.on(LEvent.MOUSE_DOWN,this,this.showdata,[models.RoleInfoModel.chineseStr.huoli_tip]);
			this._viewUI.damage_btn.on(LEvent.MOUSE_DOWN,this,this.showdata,[models.RoleInfoModel.chineseStr.damage_tip]);
			this._viewUI.defend_btn.on(LEvent.MOUSE_DOWN,this,this.showdata,[models.RoleInfoModel.chineseStr.defend_tip]);
			this._viewUI.magicattack_btn.on(LEvent.MOUSE_DOWN,this,this.showdata,[models.RoleInfoModel.chineseStr.magicattack_tip]);
			this._viewUI.magicdef_btn.on(LEvent.MOUSE_DOWN,this,this.showdata,[models.RoleInfoModel.chineseStr.magicdef_tip]);
			this._viewUI.speed_btn.on(LEvent.MOUSE_DOWN,this,this.showdata,[models.RoleInfoModel.chineseStr.speed_tip]);
			this._viewUI.medical_btn.on(LEvent.MOUSE_DOWN,this,this.showdata,[models.RoleInfoModel.chineseStr.medical_tip]);

		}
		/**弹出悬浮提示 */
		public showdata(text:string):void{
			this.texttips.init(text,this._viewUI.mouseX,this._viewUI.mouseY);
		}
		/**收起悬浮提示 */
		public hidedata():void{
			this.texttips.hide();
		}
		/**初始化 */
		public initialize():void{
			this.resObj = RoleInfoModel.getInstance().CResMoneyConfigBinDic;
			this.arrtNumDic = new Dictionary();
			this.model = new ModelsCreate();
		}
		public show():void {
			super.show();
			RequesterProtocols._instance.c2s_CApplyYingFuExprience();//客户端申请角色盈福经验
			var parentui:any=this._viewUI.parent;
			this.scene2DPanel.ape.x=parentui.x*parentui.globalScaleX;
		    this.scene2DPanel.ape.y=parentui.y*parentui.globalScaleY;
			this.initShuxing();
			var data = LoginModel.getInstance().createRoleConfigBinDic;//角色创建配置表
			/** 读的是创角配置表的模型 由于创角配置表被改过，原Id是将首个2换成1 比如2010101 原1010101 */
			let modelId =  data[this.myData.shape]["model"]
            modelId = parseInt((modelId+"").replace("2","1"));
			this.modelcreate(modelId);
			if(family.models.FamilyModel.getInstance().clanInfo.length>0){
				this._viewUI.gonghui_tet.text = family.models.FamilyModel.getInstance().clanInfo[0].clanname;//公会名
				this._viewUI.togonghui_btn.disabled = false;
			}else{
				this._viewUI.gonghui_tet.text = tips.models.TipsModel.getInstance().cstringResConfigData[RoleEnum.NO_FACTION].msg;
				this._viewUI.togonghui_btn.disabled = true;
			}
			let  title = this.roleTitleData.get(this.myData.title);
				//称谓显示
			if(typeof (title) != "undefined" && title != null) 
			 {
				 this._viewUI.title_tet.text = title;
			 }else
			 {
				 this._viewUI.title_tet.text = "";
			 }
		}
		/**人物模型 */
		modelcreate(modelid:number):void{
			if(this.model.role3d){
				this.scene2DPanel.removeSceneChar(this.model.role3d)
			}
			var parentui:any=this._viewUI.parent;
			if(parentui){
				this.model.role3d = new YxChar3d();
				this.model.role3d.setRoleUrl(getRoleUrl(modelid+""));
				this.model.role3d.set2dPos((this._viewUI.shuxing_box.x+this._viewUI.bg_img.width/1.6+this._viewUI.bg_img.x)*parentui.globalScaleX,(this._viewUI.shuxing_box.y+this._viewUI.bg_img.height+this._viewUI.bg_img.y)*parentui.globalScaleY);  //坐标
				this.model.role3d.scale=1.5;
				this.model.role3d.rotationY=180;				
				this.scene2DPanel.addSceneChar(this.model.role3d);
				BagModel.chargeToWeapon(this.model.role3d);	
			}
		}
		/**初始化界面数据*/
		public init():void{
			this.myData = createrole.models.LoginModel.getInstance().roleDetail;
			let RoleTitle  = game.modules.roleinfo.models.RoleInfoModel.getInstance().CRoleTitleBinDic;
			this.getRoleTitleData(RoleTitle);
			var school = createrole.models.LoginModel.getInstance().schoolInfo;//z职业配置表中的内容
			this._viewUI.roleid_tet.text = "ID "+this.myData.roleid;//ID
			this._viewUI.rolename_tet.text = this.myData.rolename;//姓名
			this._viewUI.level_tet.text ="LV." + this.myData.level;//等级;
			this._viewUI.nextExp_lab.text = this.myData.exp + "/" + this.myData.nexp;//经验
			this._viewUI.hp_tet.text = this.myData.hp + "/" + this.myData.maxhp;//生命值
			this._viewUI.mp_tet.text = this.myData.mp + "/" + this.myData.maxmp;//魔法值
			this._viewUI.sp_tet.text = this.myData.sp + "/" + this.myData.maxsp//愤怒值
			this._viewUI.energy_tet.text = this.myData.energy + "/" + this.myData.enlimit;//活力值
			this._viewUI.hp_bar.value = this.myData.hp/this.myData.maxhp;//生命条
			this._viewUI.mp_bar.value = this.myData.mp/this.myData.maxmp;//魔法条
			this._viewUI.sp_bar.value = this.myData.sp/this.myData.maxsp;//愤怒条
			this._viewUI.energy_bar.value = this.myData.energy/this.myData.enlimit;//活力条
			this._viewUI.damage_tet.text = this.myData.damage.toString();//物理攻击
			this._viewUI.magicattack_tet.text = this.myData.magicattack.toString();//法术攻击
			this._viewUI.speed_tet.text = this.myData.speed.toString();//速度
			this._viewUI.defend_tet.text = this.myData.defend.toString();//物理防御
			this._viewUI.magicdef_tet.text = this.myData.magicdef.toString();//法术防御
			this._viewUI.medical_tet.text = this.myData.medical.toString();//治疗强度
			this._viewUI.school_tet.text = school[this.myData.school]["name"];//职业
			this._viewUI.tomenpai_btn.label = models.RoleInfoModel.chineseStr.hui + school[this.myData.school]["name"];//回门派按钮
			this.zhiyeMapId = school[this.myData.school]["schoolmapid"];//职业地图id
			this.arrtNameArr = [models.RoleInfoModel.chineseStr.wuli_baoji,models.RoleInfoModel.chineseStr.wuli_kangbao,models.RoleInfoModel.chineseStr.fashu_baoji,models.RoleInfoModel.chineseStr.fashu_kangbao,models.RoleInfoModel.chineseStr.zhiliao_baoji,models.RoleInfoModel.chineseStr.zhiliao_jiashen,models.RoleInfoModel.chineseStr.wuli_chuantou,models.RoleInfoModel.chineseStr.wuli_dikang,models.RoleInfoModel.chineseStr.fashu_chuantou,models.RoleInfoModel.chineseStr.fashu_dikang,models.RoleInfoModel.chineseStr.kongzhi_jiacheng,models.RoleInfoModel.chineseStr.kongzhi_mianyi,models.RoleInfoModel.chineseStr.kongzhi_mingzhong,models.RoleInfoModel.chineseStr.kongzhi_kangxing]; 
			this.arrtTipArr = [models.RoleInfoModel.chineseStr.wuli_baoji_tip,models.RoleInfoModel.chineseStr.wuli_kangbao_tip,models.RoleInfoModel.chineseStr.fashu_baoji_tip,models.RoleInfoModel.chineseStr.fashu_kangbao_tip,models.RoleInfoModel.chineseStr.zhiliao_baoji_tip,models.RoleInfoModel.chineseStr.zhiliao_jiashen_tip,models.RoleInfoModel.chineseStr.wuli_chuantou_tip,models.RoleInfoModel.chineseStr.wuli_dikang_tip,models.RoleInfoModel.chineseStr.fashu_chuantou_tip,models.RoleInfoModel.chineseStr.fashu_dikang_tip,models.RoleInfoModel.chineseStr.kongzhi_jiacheng_tip,models.RoleInfoModel.chineseStr.kongzhi_mianyi_tip,models.RoleInfoModel.chineseStr.kongzhi_mingzhong_tip,models.RoleInfoModel.chineseStr.kongzhi_kangxing_tip];
			this.arrtNumArr = [this.myData.phy_critc_level,this.myData.anti_phy_critc_level,this.myData.magic_critc_level,this.myData.anti_magic_critc_level,this.myData.heal_critc_level,this.myData.zhiliaojiashen,this.myData.wulichuantou,this.myData.wulidikang,this.myData.fashuchuantou,this.myData.fashudikang,this.myData.kongzhijiacheng,this.myData.kongzhimianyi,this.myData.seal,this.myData.unseal];
			//初始化高级属性
			for(var i:number=0;i<this.arrtNameArr.length;i++){
				this.arrtNumDic.set(i,this.arrtNumArr[i]);
			}
			this.getListData();
			this._viewUI.zhiye_img.skin = RoleInfoModel.getInstance().setZhiyeImg(this.myData.school);
		}
		/**如果这些属性在界面打开之前有变化，重新初始化这些属性 */
		public initShuxing():void{
			this._viewUI.level_tet.text ="LV." + HudModel.getInstance().levelNum;//等级
			this._viewUI.nextExp_lab.text = HudModel.getInstance().expNum + "/" + this.resObj[HudModel.getInstance().levelNum].nextexp;//经验
			this._viewUI.hp_tet.text = HudModel.getInstance().hpNum+ "/" + HudModel.getInstance().maxHpNum;//生命值
			this._viewUI.mp_tet.text = HudModel.getInstance().mpNum + "/" + HudModel.getInstance().maxMpNum;//魔法值
			this._viewUI.sp_tet.text = HudModel.getInstance().spNum + "/" + HudModel.getInstance().maxSpNum;//愤怒值
			this._viewUI.energy_tet.text = HudModel.getInstance().energyNum + "/" + HudModel.getInstance().enlimitNum ;//活力值
			this._viewUI.hp_bar.value = HudModel.getInstance().hpNum / HudModel.getInstance().maxHpNum;//生命条
			this._viewUI.mp_bar.value = HudModel.getInstance().mpNum / HudModel.getInstance().maxMpNum;//魔法条
			this._viewUI.sp_bar.value = HudModel.getInstance().spNum/HudModel.getInstance().maxSpNum;//愤怒条
			this._viewUI.energy_bar.value = HudModel.getInstance().energyNum / HudModel.getInstance().enlimitNum ;//活力条
			this._viewUI.damage_tet.text = HudModel.getInstance().attackNum.toString();//物理攻击
			this._viewUI.magicattack_tet.text = HudModel.getInstance().magicAttackNum.toString() ;//法术攻击
			this._viewUI.speed_tet.text = HudModel.getInstance().speedNum.toString();//速度
			this._viewUI.defend_tet.text = HudModel.getInstance().defendNum.toString();//物理防御
			this._viewUI.magicdef_tet.text = HudModel.getInstance().magicDefNum.toString();//法术防御
			this._viewUI.medical_tet.text = HudModel.getInstance().medicalNum.toString();//治疗强度
			this.arrtNumDic.set(0,HudModel.getInstance().phyCritcLevelNum);//物理暴击
			this.arrtNumDic.set(1,HudModel.getInstance().antiPhyCritcLevelNum);//物理抗暴
			this.arrtNumDic.set(2,HudModel.getInstance().magicCritcLevelNum);//法术暴击
			this.arrtNumDic.set(3,HudModel.getInstance().antiMagicCritcLevelNum);//法术抗暴
			this.arrtNumDic.set(4,HudModel.getInstance().healCritLevelNum);//治疗暴击
			this.arrtNumDic.set(5,HudModel.getInstance().zhiliaojiashenNum);//治疗加深
			this.arrtNumDic.set(6,HudModel.getInstance().wulichuantouNum);//物理穿透
			this.arrtNumDic.set(7,HudModel.getInstance().wulidikangNum);//物理抵抗
			this.arrtNumDic.set(8,HudModel.getInstance().fashuchuantouNum);//法术穿透
			this.arrtNumDic.set(9,HudModel.getInstance().fashudikangNum);//法术抵抗
			this.arrtNumDic.set(10,HudModel.getInstance().kongzhiJiachengNum);//控制加成
			this.arrtNumDic.set(11,HudModel.getInstance().kongzhiMianyiNum);//控制免疫
			this.arrtNumDic.set(12,HudModel.getInstance().sealNum);//控制命中
			this.arrtNumDic.set(13,HudModel.getInstance().unSealNum);//控制抗性
			this.ChangeBattleAttr();
			this.getListData();
		}
		/**切换地图 */
		public mapChange(mapid:number):void{
			//如果有队伍切不是队长切未暂离则不可跳图
			let role:game.scene.models.RoleBasicVo = game.scene.models.SceneModel.getInstance().rolelist.get(game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);
			let team:game.scene.models.TeamOctetsVo = role.rolebasicOctets.datas.get(2);
			if(team){
				if(team.teamindexstate>0){//在队伍中 暂离的话值为负数
					if((team.teamindexstate>>4)!=1){//141216
						let chattext:CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[141216];
						this.tips.onShow(chattext.msg);
						return;
					}
				}
			}
			if(mapid==RoleEnum.GONGHUI_MAP){
				RequesterProtocols._instance.c2s_CEnterClanMap();
			}
			else{
				this.getpost(mapid);
				let mainUnit: Unit = RoleInfoModel.getInstance().appBase.sceneObjectMgr.mainUnit;
				RequesterProtocols._instance.c2s_req_goto(mapid,parseInt(mainUnit.pos.x.toFixed(0)),parseInt(mainUnit.pos.y.toFixed(0)));
			}
			
			ModuleManager.hide(ModuleNames.ROLE_Info);
			mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
		}	

		public getpost(mapid:number){
			let MapData:WorldMapConfigBaseVo = MapModel.getInstance().WorldMapConfigData[mapid]
			let mainUnit: Unit = RoleInfoModel.getInstance().appBase.sceneObjectMgr.mainUnit;		
			let x,y:number;
			x=(Math.random()*(MapData.bottomx - MapData.topx)+MapData.topx)
			y=(Math.random()*(MapData.bottomy - MapData.topy)+MapData.topy)
			mainUnit.SetPosX(x);
			mainUnit.SetPosY(y);	
			mainUnit.SetPos(x,y);
		}
		/**刷新人物属性 */
		public onRefreshRoleData(e:any):void{
			this._viewUI.level_tet.text ="LV." + HudModel.getInstance().levelNum;//等级
			this._viewUI.nextExp_lab.text = HudModel.getInstance().expNum + "/" + this.resObj[HudModel.getInstance().levelNum].nextexp;//经验
			this._viewUI.hp_tet.text = HudModel.getInstance().hpNum+ "/" + HudModel.getInstance().maxHpNum;//生命值
			this._viewUI.mp_tet.text = HudModel.getInstance().mpNum + "/" + HudModel.getInstance().maxMpNum;//魔法值
			this._viewUI.sp_tet.text = HudModel.getInstance().spNum + "/" + HudModel.getInstance().maxMpNum;//愤怒值
			this._viewUI.energy_tet.text = HudModel.getInstance().energyNum + "/" + HudModel.getInstance().enlimitNum ;//活力值
			this._viewUI.hp_bar.value = HudModel.getInstance().hpNum / HudModel.getInstance().maxHpNum;//生命条
			this._viewUI.mp_bar.value = HudModel.getInstance().mpNum / HudModel.getInstance().maxMpNum;//魔法条
			this._viewUI.sp_bar.value = HudModel.getInstance().spNum/HudModel.getInstance().maxSpNum;//愤怒条			
			this._viewUI.energy_bar.value = HudModel.getInstance().energyNum / HudModel.getInstance().enlimitNum ;//活力条
			this._viewUI.damage_tet.text = HudModel.getInstance().attackNum.toString();//物理攻击
			this._viewUI.magicattack_tet.text = HudModel.getInstance().magicAttackNum.toString() ;//法术攻击
			this._viewUI.speed_tet.text = HudModel.getInstance().speedNum.toString();//速度
			this._viewUI.defend_tet.text = HudModel.getInstance().defendNum.toString();//物理防御
			this._viewUI.magicdef_tet.text = HudModel.getInstance().magicDefNum.toString();//法术防御
			this._viewUI.medical_tet.text = HudModel.getInstance().medicalNum.toString();//治疗强度
			this.arrtNumDic.set(0,HudModel.getInstance().phyCritcLevelNum);//物理暴击
			this.arrtNumDic.set(1,HudModel.getInstance().antiPhyCritcLevelNum);//物理抗暴
			this.arrtNumDic.set(2,HudModel.getInstance().magicCritcLevelNum);//法术暴击
			this.arrtNumDic.set(3,HudModel.getInstance().antiMagicCritcLevelNum);//法术抗暴
			this.arrtNumDic.set(4,HudModel.getInstance().healCritLevelNum);//治疗暴击
			this.arrtNumDic.set(5,HudModel.getInstance().zhiliaojiashenNum);//治疗加深
			this.arrtNumDic.set(6,HudModel.getInstance().wulichuantouNum);//物理穿透
			this.arrtNumDic.set(7,HudModel.getInstance().wulidikangNum);//物理抵抗
			this.arrtNumDic.set(8,HudModel.getInstance().fashuchuantouNum);//法术穿透
			this.arrtNumDic.set(9,HudModel.getInstance().fashudikangNum);//法术抵抗
			this.arrtNumDic.set(10,HudModel.getInstance().kongzhiJiachengNum);//控制加成
			this.arrtNumDic.set(11,HudModel.getInstance().kongzhiMianyiNum);//控制免疫
			this.arrtNumDic.set(12,HudModel.getInstance().sealNum);//控制命中
			this.arrtNumDic.set(13,HudModel.getInstance().unSealNum);//控制抗性
			this.getListData();
		}
		
		/** 判断战斗中的属性值是否改变 */
		private ChangeBattleAttr():void
		{
			if(RoleInfoModel.getInstance().battleRoleAttr.keys.length != 0)
			{
				let roleAttr = RoleInfoModel.getInstance().battleRoleAttr;
				for (var attrIndex = 0; attrIndex < RoleInfoModel.getInstance().battleRoleAttr.keys.length; attrIndex++) 
				{
					let attrId = roleAttr.keys[attrIndex];
					let val = roleAttr.get(attrId);
					this.updateBattleAttr(attrId,val);
				}
			}
		}
		/** 刷新指定属性
		 * @param attrId 属性Id
		 * @param val 值
		 */
		private updateBattleAttr(attrId:number,val:number):void
		{
			if(attrId == 60 || attrId == 80)
			{//生命值
				this._viewUI.hp_tet.text = val +"/" + HudModel.getInstance().maxHpNum;//生命值
				this._viewUI.hp_bar.value = val / HudModel.getInstance().maxHpNum;
			}else if(attrId == 90 || attrId == 100)
			{//魔法值
				this._viewUI.mp_tet.text = val +"/" + HudModel.getInstance().maxMpNum;//魔法值
				this._viewUI.mp_bar.value = val / HudModel.getInstance().maxMpNum;
			}else if(attrId == 110 || attrId == 120)
			{//怒气值
				this._viewUI.sp_tet.text = val +"/" + HudModel.getInstance().maxSpNum;//怒气值
				this._viewUI.sp_bar.value = val / HudModel.getInstance().maxSpNum;
			}else if(attrId == 130)
			{//物理攻击
				this._viewUI.damage_tet.text = val.toString();;
			}else if(attrId == 150)
			{//法术攻击
				this._viewUI.magicattack_tet.text = val.toString();
			}else if(attrId == 200)
			{//速度
				this._viewUI.speed_tet.text = val.toString();
			}else if(attrId == 140)
			{//物理防御
				this._viewUI.defend_tet.text = val.toString();
			}else if(attrId == 160)
			{//法术防御
				this._viewUI.magicdef_tet.text = val.toString();
			}else if(attrId == 170)
			{//治疗强度
				this._viewUI.medical_tet.text = val.toString();
			}
		}
		/**初始化属性列表 */
		public getListData():void{
			this._viewUI.shuxin_list.array = this.arrtNameArr;
			this._viewUI.shuxin_list.renderHandler = new Handler(this,this.onRender);
		}
		/**渲染属性列表 */
		public onRender(cell:Laya.Box,index:number):void{
			if(index > this.arrtNameArr.length)return;
			var nameLab:Laya.Button = cell.getChildByName("shuxin_btn") as Laya.Button;
			var numLab:Laya.Text = cell.getChildByName("shuxinNum_tet") as Laya.Text;
			nameLab.on(LEvent.MOUSE_DOWN,this,this.showdata,[this.arrtTipArr[index]]);
           	nameLab.label = this.arrtNameArr[index];
			numLab.text = this.arrtNumDic.get(index);
		}
		public hide():void {
			super.hide();
			this.hidedata();
		}
		
		public getView():Sprite {
			return this._viewUI;
		}
	
		/** 切换属性面板 */
		public change(index:number):void{
			if(this._viewUI.rolesx_tab.selectedIndex == 0){
				this._viewUI.jichu_box.visible = true;
				this._viewUI.gaoji_box.visible = false;	
			}else{
				this._viewUI.gaoji_box.visible = true;	
				this._viewUI.jichu_box.visible = false;
			}
		}
		/** 便利称谓配置表的数据 */
		private getRoleTitleData(data:any):void
		{  
			this.roleTitleData = new Laya.Dictionary();
			for (var key in data) 
			{
			  this.roleTitleData.set(key,data[key].titlename);
			}
			
		}
		/**打开称谓界面 */
		public showChenwei():void{
			this._RoleChenweiMediator.show();
			ModuleManager.hide(ModuleNames.ROLE_Info);
		}
		/**打开人物提示界面 */
		public showTip():void{
			this._RoleTipMediator.show();
		}
		/**打开活力兑换界面 */
		public showHuoli():void{
			this._RoleHuoliMediator.show();
			ModuleManager.hide(ModuleNames.ROLE_Info);
		}
	}
}