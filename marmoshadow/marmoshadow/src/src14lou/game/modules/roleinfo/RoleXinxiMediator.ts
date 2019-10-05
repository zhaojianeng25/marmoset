/**
 * 人物信息类
 */
module game.modules.roleinfo{
	export class RoleXinxiMediator extends game.modules.UiMediator{
		public _viewUI:ui.common.RoleXinxiUI;
		/**称谓界面 */
		private _RoleChenweiMediator:RoleChenweiMediator;
		/**提示界面 */
		private _RoleTipMediator:RoleTipMediator;
		/**酒馆老板 */
		private _RoleShopMediator:RoleShopMediator;
		/**积分兑换界面 */
		private _RoleJiFenDuiHuanMediator:RoleJiFenDuiHuanMediator;
		/**援助界面 */
		private _RoleYuanZhuMediator:RoleYuanZhuMediator;
		/**提示界面 */
		private _tipsModule: game.modules.tips.tipsModule;
		/**模型相关 */
		public model:ModelsCreate;
		/**模型相关 */
		private scene2DPanel:TestRole2dPanel;
		/**人物初始属性*/
		private myData:createrole.models.RoleDetailVo;
		/**s升级经验限制表 */
		private resObj:Object;
		/**称谓字典key:称谓表id,value:称谓名 */
		private roleTitleData:Laya.Dictionary;
		constructor(uiLayer: Sprite){
			super(uiLayer);
			this._viewUI = new ui.common.RoleXinxiUI();
			this._RoleChenweiMediator = new RoleChenweiMediator(RoleInfoModel.getInstance().appBase);
			this._RoleTipMediator = new RoleTipMediator(this._viewUI);
			this._RoleShopMediator = new RoleShopMediator(RoleInfoModel.getInstance().appBase);
			this._RoleJiFenDuiHuanMediator = new RoleJiFenDuiHuanMediator(RoleInfoModel.getInstance().appBase);
			this._RoleYuanZhuMediator = new RoleYuanZhuMediator(this._viewUI);
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
			mainhud.models.HudProxy.getInstance().on(mainhud.models.SRefreshRoleCurrency_EVENT,this,this.onRefreshRoleCurrency);
			models.RoleInfoProxy.getInstance().on(models.SApplyYingFuExprience_EVENT,this,this.onApplyYingFuExprience);
			models.RoleInfoProxy.getInstance().on(models.SRspRoleInfo_EVENT,this,this.refresh);
		}
		/**刷新盈福经验值 */
		public onApplyYingFuExprience():void{
			this._viewUI.yingfu_tet.text = RoleInfoModel.getInstance().SApplyYingFuExprience.toString();
		}
		/**初始化 */
		public initialize():void{
			this.resObj = RoleInfoModel.getInstance().CResMoneyConfigBinDic;
			this.model = new ModelsCreate();
		}
			/**注册点击监听 */
		private registerEvent():void{
			this._viewUI.chenwei_btn.on(LEvent.MOUSE_DOWN,this, this.showChenwei);
			this._viewUI.tip_btn.on(LEvent.MOUSE_DOWN,this, this.showTip);
			this._viewUI.hongAdd_btn.on(LEvent.MOUSE_DOWN,this, this.showJiuguan);
			this._viewUI.lanAdd_btn.on(LEvent.MOUSE_DOWN,this, this.showJiuguan);
			this._viewUI.jifen_btn.on(LEvent.MOUSE_DOWN,this, this.showJifen);
			this._viewUI.yuanzhu_btn.on(LEvent.MOUSE_DOWN,this, this.showYuanzhu);
			this._viewUI.tishi_btn.on(LEvent.MOUSE_DOWN,this, this.showTishi);
		}
		/**显示弹窗信息 */
		public showTishi():void{
			var param: Dictionary = new Dictionary();
			param.set("title", RoleEnum.CREDIT_LINE);
			param.set("contentId", RoleEnum.CREDIT_LINE_TIP);
			this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, param);
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
			this.setZhiyeImg(this.myData.school);
		}
		/**如果这些属性在界面打开之前有变化，重新初始化这些属性 */
		public initNum():void{
			this._viewUI.zhiye_tet.text = HudModel.getInstance().zhiyeNum.toString();//职业贡献
			this._viewUI.gonghui_tet.text = HudModel.getInstance().gonghuiNum.toString();//公会DKP
			this._viewUI.shengwang_tet.text = HudModel.getInstance().shengwangNum.toString();//声望值
			this._viewUI.xinyong_tet.text = HudModel.getInstance().xinyongNum.toString();//信用值
			this._viewUI.rongyu_tet.text = HudModel.getInstance().rongyuNum.toString();//荣誉值
			if(HudModel.getInstance().levelNum != 0)
				this._viewUI.level_tet.text ="LV." + HudModel.getInstance().levelNum;//等级
			if(HudModel.getInstance().expNum != 0){
				if(HudModel.getInstance().levelNum != 0)
					this._viewUI.nextExp_lab.text = HudModel.getInstance().expNum + "/" + this.resObj[HudModel.getInstance().levelNum].nextexp;//经验
				else
					this._viewUI.nextExp_lab.text = HudModel.getInstance().expNum + "/" + this.resObj[this.myData.level].nextexp;//经验
			}
		}
		/**发送协议 */
		private sendProto(): void {
			RequesterProtocols._instance.c2s_CReqRoleInfo(1);//请求人物信息界面（主要是 几个积分以及大红大蓝的剩余量）1表示请求人物信息界面，2表示战斗结束
		}
		/** 便利称谓配置表的数据 */
		private getRoleTitleData(data:any):void
		{  this.roleTitleData = new Laya.Dictionary();
			for (var key in data) 
			{
			  this.roleTitleData.set(key,data[key].titlename);
			}
			
		}
		public show():void {
			super.show();
			var parentui:any=this._viewUI.parent;
			this.scene2DPanel.ape.x=parentui.x*parentui.globalScaleX;
		    this.scene2DPanel.ape.y=parentui.y*parentui.globalScaleY;
			this.sendProto();
			this.initNum();
			var data = LoginModel.getInstance().createRoleConfigBinDic;//角色创建配置表
			/** 读的是创角配置表的模型 由于创角配置表被改过，原Id是将首个2换成1 比如2010101 原1010101 */
			let modelId =  data[this.myData.shape]["model"]
            modelId = parseInt((modelId+"").replace("2","1"));
			this.modelcreate(modelId);
			let  title = this.roleTitleData.get(this.myData.title);
			//显示称谓
			if(typeof (title) != "undefined" && title != null) 
			 {
				 this._viewUI.title_tet.text = title;
			 }else
			 {
				 this._viewUI.title_tet.text = "";
			 }
            models.RoleInfoProxy.getInstance().on(models.OPEN_ZHEZHAO,this,this.openZheZhao);
            models.RoleInfoProxy.getInstance().on(models.CLOSE_ZHEZHAO,this,this.closeZheZhao);
		}
		
        /** 打开遮罩 */
        private openZheZhao():void{
            this._viewUI.zhezhao_img.visible = true;
        }
        /** 关闭遮罩 */
        private closeZheZhao():void{
            this._viewUI.zhezhao_img.visible = false;
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
				this.model.role3d.set2dPos((this._viewUI.xinxi_box.x+this._viewUI.bg_img.width/1.6+this._viewUI.bg_img.x)*parentui.globalScaleX,(this._viewUI.xinxi_box.y+this._viewUI.bg_img.height+this._viewUI.bg_img.y)*parentui.globalScaleY);  //坐标
				this.model.role3d.scale=1.5;
				this.model.role3d.rotationY=180;
				this.scene2DPanel.addSceneChar(this.model.role3d);
				BagModel.chargeToWeapon(this.model.role3d);		
			}
		}
		/**人物信息界面回复 */
		public refresh(e:any):void{
			var data:hanlder.S2C_SRspRoleInfo = models.RoleInfoModel.getInstance().SRspRoleInfoData.get("data");
			this._viewUI.hp_tet.text = data.hpMpStore.get(RoleEnum.HP_STORE) + "/"+RoleEnum.MAX_STORE_VALUE ;//生命储备
			this._viewUI.mp_tet.text = data.hpMpStore.get(RoleEnum.MP_STORE) + "/"+RoleEnum.MAX_STORE_VALUE ;//魔法储备
			this._viewUI.hp_bar.value = data.hpMpStore.get(RoleEnum.HP_STORE)/RoleEnum.MAX_STORE_VALUE;//生命条
			this._viewUI.mp_bar.value = data.hpMpStore.get(RoleEnum.MP_STORE)/RoleEnum.MAX_STORE_VALUE;//魔法条
		}
			/**刷新人物属性 */
		public onRefreshRoleData(e:any):void{
			if(HudModel.getInstance().levelNum != 0)
				this._viewUI.level_tet.text ="LV." + HudModel.getInstance().levelNum;//等级
			this._viewUI.nextExp_lab.text = HudModel.getInstance().expNum + "/" + this.resObj[HudModel.getInstance().levelNum].nextexp;//经验
		}
			/**刷新人物通货的消息 */
		public onRefreshRoleCurrency(e:any): void {
			if(HudModel.getInstance().zhiyeNum != 0)
				this._viewUI.zhiye_tet.text = HudModel.getInstance().zhiyeNum.toString();//职业贡献
			if(HudModel.getInstance().gonghuiNum != 0)
				this._viewUI.gonghui_tet.text = HudModel.getInstance().gonghuiNum.toString();//帮派贡献
			if(HudModel.getInstance().shengwangNum != 0)
				this._viewUI.shengwang_tet.text = HudModel.getInstance().shengwangNum.toString();//声望值
			if(HudModel.getInstance().xinyongNum != 0)
				this._viewUI.xinyong_tet.text = HudModel.getInstance().xinyongNum.toString();//信用值
			if(HudModel.getInstance().rongyuNum != 0)
				this._viewUI.rongyu_tet.text = HudModel.getInstance().rongyuNum.toString();//荣誉值
		}
		/**设置职业图标 */
		public setZhiyeImg(school:number):void{
			//根据职业设置职业图标
			switch(school){
				case zhiye.yunxiao:
					this._viewUI.zhiye_img.skin = "common/ui/tongyong/11.png";
					break;
				case zhiye.dahuang:
					this._viewUI.zhiye_img.skin = "common/ui/tongyong/12.png";
					break;
				case zhiye.cangyu:
					this._viewUI.zhiye_img.skin = "common/ui/tongyong/13.png";
					break;
				case zhiye.feixue:
					this._viewUI.zhiye_img.skin = "common/ui/tongyong/14.png";
					break;
				case zhiye.tianlei:
					this._viewUI.zhiye_img.skin = "common/ui/tongyong/15.png";
					break;
				case zhiye.wuliang:
					this._viewUI.zhiye_img.skin = "common/ui/tongyong/16.png";
					break;
				case zhiye.xuanming:
					this._viewUI.zhiye_img.skin = "common/ui/tongyong/17.png";
					break;
				case zhiye.qixing:
					this._viewUI.zhiye_img.skin = "common/ui/tongyong/18.png";
					break;
				case zhiye.danyang:
					this._viewUI.zhiye_img.skin = "common/ui/tongyong/19.png";
					break;
			}
		}
		public hide():void {
			super.hide();			
            models.RoleInfoProxy.getInstance().off(models.OPEN_ZHEZHAO,this,this.openZheZhao);
            models.RoleInfoProxy.getInstance().off(models.CLOSE_ZHEZHAO,this,this.closeZheZhao);
		}
		
		public getView():Sprite {
			return this._viewUI;
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
		/**打开酒馆界面 */
		public showJiuguan():void{
			this._RoleShopMediator.show();
			ModuleManager.hide(ModuleNames.ROLE_Info);
		}
		/**打开积分兑换界面 */
		public showJifen():void{
			this._RoleJiFenDuiHuanMediator.show();
			ModuleManager.hide(ModuleNames.ROLE_Info);
			LoginModel.getInstance().CommonPage = ModuleNames.ROLE_Info;
		}
		/**打开援助统计界面 */
		public showYuanzhu():void{
			RequesterProtocols._instance.c2s_CReqHelpCountView();//客户端请求援助统计面板
			this._RoleYuanZhuMediator.show();
		}
	}
}