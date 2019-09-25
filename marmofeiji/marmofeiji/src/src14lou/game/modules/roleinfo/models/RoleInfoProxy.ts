
/**角色系统枚举 */
enum RoleEnum{
	/**永久称谓 */
	PERMANENT_TITLE = 11470,
	/**隐藏称谓 */
	HIDE_TITLE = 11325,
	/**称谓描述 */
	TITLE_DESCRIBE = 11326,
	/**时间毫秒数 */
	TIME_MILLISCOND = 1000,
	/**打工消耗活力 */
	WORK_COST = 100,
	/**没有附魔技能消耗活力 */
	NO_SKILL_COST = 0,
	/**人物属性界面key */
	SHUXING_KEY = 1,
	/**人物信息界面key */
	XINXI_KEY = 2,
	/**人物加点界面key */
	JIADIAN_KEY = 3,
	/**加点说明*/
	JIADIAN_EXPLAIN = 11796,
	/**加点提示 */
	JIADIAN_TIP = 420014,
	/**属性滑动条宽度 */
	SLIDER_WIDTH = 163,
	/**基础属性条值 */
	BASIC_VALUE = 1/6,
	/**升级属性点加上基本属性点 */
	SHUING_POINT = 6,
	/**元宝兑换银币 */
	YUANBAO_YINBI = 10000,
	/**金币兑换银币 */
	JINBI_YINBI = 100,
	/**仙晶不足提示 */
	XIANJIN_TIP = 150506,
	/**首次切换方案 */
	FIRST_SWITCH = 150011,
	/**切换方案提示 */
	SWITCH_TIP = 150012,
	/**人物基础生命 */
	BASIC_LIFE = 212,
	/**人物基础物攻 */
	BASIC_ATTACK = 100,
	/**人物基础法力 */
	BASIC_MP = 206,
	/**人物基础法攻 */
	BASIC_MAGIC_ATTACK = 82,
	/**人物基础物防 */
	BASIC_DEFEND = 53,
	/**人物基础速度 */
	BASIC_SPEED = 31,
	/**人物基础法防 */
	BASIC_MAGIC_DEF = 42,
	/**声望值 */
	SHENGWANG_TITLE = 11277,
	/**声望提示 */
	SHENGWANG_TIP = 11795,
	/**援助声望上限 */
	MAX_YUANZHU = 2000,
	/**荣誉值 */
	RONGYU_TITLE = 11278,
	/**荣誉提示 */
	RONGYU_TIP = 11793,
	/**门派贡献 */
	SCHOOL_TITLE = 11352,
	/**门派贡献提示 */
	SCHOOL_TIP = 11792,
	/**声望商店 */
	SHENGWANG_SHOP = 1,
	/**荣誉商店 */
	RONGYU_SHOP = 2,
	/**每日限购数量 */
	LIMIT_NUM = 10,
	/**转盘花费门派贡献 */
	COST_SCHOOL_NUM = 60,
	/**体质 */
	TIZHI = 2186,
	/**智力 */
	ZHILI = 2188,
	/**力量 */
	LILIANG = 2185,
	/**耐力 */
	NAILI = 2189,
	/**敏捷 */
	MINJIE = 2187,
	/**重置全属性 */
	RESET_ALL = 10022,
	/**药品商店 */
	DRUG_SHOP = 1,
	/**小键盘输入最大值 */
	MAXINPUT_VALUE = 99,
	/**无帮派 */
	NO_FACTION = 11290,
	/**公会地图id */
	GONGHUI_MAP = 1711,
	/**信用度 */
	CREDIT_LINE = 11619,
	/**信用度提示 */
	CREDIT_LINE_TIP = 11620,
	/**生命储备 */
	HP_STORE = 500009,
	/**魔法储备 */
	MP_STORE = 500010,
	/**最大储备值 */
	MAX_STORE_VALUE = 100000,
	/**援助战斗 */
	YUANZHU_ZHANDOU = 11313,
	/**援助战斗提示 */
	YUANZHU_ZHANDOU_TIP = 11301,
	/**援助物品 */
	YUANZHU_WUPIN = 11473,
	/**援助物品提示 */
	YUANZHU_WUPIN_TIP = 11471,
	/**求助物品 */
	QIUZHU_WUPIN = 11474,
	/**求助物品提示 */
	QIUZHU_WUPIN_TIP = 11472,
	/**声望商店序号 */
	SHENGWANG_SHOP_ID = 7,
	/**荣誉商店序号 */
	RONGYU_SHOP_ID = 8,
	/**购买类型 */
	BUY_TYPE = 6,
	/**酒馆序号 */
	JIUGUAN_SHOP_ID = 2,
}
module game.modules.roleinfo.models{
	/**人物信息界面回复 */
	export const SRspRoleInfo_EVENT:string = "SRspRoleInfo";
	/**转盘开始 */
	export const SBeginSchoolWheel_EVENT:string = "SBeginSchoolWheel";
	/**刷新人物加点后的加点面板数值 */
	export const SRefreshPointType_EVENT:string = "SRefreshPointType";
	/**打工赚钱返回 */
	export const SLiveSkillMakeFarm_EVENT:string = "SLiveSkillMakeFarm";
	/**制作附魔道具返回 */
	export const SLiveSkillMakeEnhancement_EVENT:string = "SLiveSkillMakeEnhancement";
	/**商品限购次数查询 */
	export const SQueryLimit_EVENT:string = "SQueryLimit";
	/**援助统计面板 */
	export const SReqHelpCountView_EVENT:string = "SReqHelpCountView";
	/**援助声望当前值 */
	export const SSendHelpSW_EVENT:string = "SSendHelpSW";
	/**返回人物切换加点方案次数 */
	export const SReqPointSchemeTime_EVENT:string = "SReqPointSchemeTime";
	/**服务器回复角色盈福经验 */
	export const SApplyYingFuExprience_EVENT:string = "SApplyYingFuExprience";
	/** 打开遮罩 */
	export const OPEN_ZHEZHAO:string = "OpenZheZhao";
	/** 打开遮罩 */
	export const CLOSE_ZHEZHAO:string = "CloseZheZhao";
	/** 角色系统的中转服务Proxy*/
	export class RoleInfoProxy extends hanlder.ProxyBase{
		constructor(){
			super();
			RoleInfoProxy._instance = this;
			this.init();
		}
		private static _instance:RoleInfoProxy;
		public static getInstance():RoleInfoProxy {
			if(!this._instance) {
				this._instance = new RoleInfoProxy();
			}
			return this._instance;
		}
		
		public init():void {
			RoleInfoProxy.getInstance();
			this.addNetworkListener();
			Laya.loader.load("common/data/temp/role.caddpointresetitemconfig.bin",Handler.create(this,this.onloadedAddPointResetItemConfigComplete),null,Loader.BUFFER);
			Laya.loader.load("common/data/temp/role.cresmoneyconfig.bin",Handler.create(this,this.onloadedCResMoneyConfigComplete),null,Loader.BUFFER);
			Laya.loader.load("common/data/temp/role.cattrmoddata.bin",Handler.create(this,this.onloadedCAttrModDataComplete),null,Loader.BUFFER);
			Laya.loader.load("common/data/temp/shop.cnpcsale.bin",Handler.create(this,this.onloadedCNpcSaleComplete),null,Loader.BUFFER);
			Laya.loader.load("common/data/temp/game.cschoolwheel.bin",Handler.create(this,this.onloadedCSchoolWheelComplete),null,Loader.BUFFER);
			Laya.loader.load("common/data/temp/title.ctitleconfig.bin",Handler.create(this,this.onloadedCTitleComplete),null,Loader.BUFFER);/** 称谓表 */
			Laya.loader.load("common/data/temp/role.caddpointchange.bin",Handler.create(this,this.onloadedCaddpointchangeComplete),null,Loader.BUFFER);
		}
		/**j加点方案切换消耗 */
		private onloadedCaddpointchangeComplete():void {
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/role.caddpointchange.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data,size,RoleInfoModel.getInstance().CaddpointchangeDic,game.data.template.CaddpointchangeBaseVo,"id");
		}
		/**x洗点道具配置表 */
		private onloadedAddPointResetItemConfigComplete():void {
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/role.caddpointresetitemconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data,size,RoleInfoModel.getInstance().addPointResetItemConfigBinDic,game.data.template.AddPointResetItemConfigBaseVo,"id");
		}
		/**s升级经验限制表 */
		private onloadedCResMoneyConfigComplete():void {
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/role.cresmoneyconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data,size,RoleInfoModel.getInstance().CResMoneyConfigBinDic,game.data.template.ResMoneyConfigBaseVo,"id");
		}
		/**y一级属性转换表 */
		private onloadedCAttrModDataComplete():void {
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/role.cattrmoddata.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data,size,RoleInfoModel.getInstance().CAttrModDataBinDic,game.data.template.AttrModDataBaseVo,"id");
		}
		/**NPCMT3买卖物品表 */
		private onloadedCNpcSaleComplete():void {
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.cnpcsale.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data,size,RoleInfoModel.getInstance().CNpcSaleBinDic,game.data.template.CNpcSaleBaseVo,"id");
		}
		/**z职业转盘表 */
		private onloadedCSchoolWheelComplete():void {
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/game.cschoolwheel.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data,size,RoleInfoModel.getInstance().CSchoolWheelBinDic,game.data.template.CSchoolWheelBaseVo,"id");
		}
		/**c称谓表 */
		private onloadedCTitleComplete():void {
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/title.ctitleconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data,size,RoleInfoModel.getInstance().CRoleTitleBinDic,game.data.template.CTitleConfigBaseVo,"id");
		}
		 /**添加监听 */
		private addNetworkListener(): void {
			//监听人物信息界面生命储备和魔法储备的变化值
			Network._instance.addHanlder(ProtocolsEnum.SRspRoleInfo, this, this.onRspRoleInfo);
			//监听职业贡献转盘开始消息
			Network._instance.addHanlder(ProtocolsEnum.SBeginSchoolWheel, this, this.onBeginSchoolWheel);
			//监听人物加点后的加点面板值
			Network._instance.addHanlder(ProtocolsEnum.SRefreshPointType, this, this.onRefreshDian);
			//监听打工返回
			Network._instance.addHanlder(ProtocolsEnum.SLiveSkillMakeFarm, this, this.onLiveSkillMakeFarm);
			//监听制作附魔道具返回
			Network._instance.addHanlder(ProtocolsEnum.SLiveSkillMakeEnhancement, this, this.onLiveSkillMakeEnhancement);
			//监听商品限购次数改变
			Network._instance.addHanlder(ProtocolsEnum.SQueryLimit, this, this.onQueryLimit);
			//监听援助统计面板值
			Network._instance.addHanlder(ProtocolsEnum.SReqHelpCountView, this, this.onReqHelpCountView);
			//监听援助声望值
			Network._instance.addHanlder(ProtocolsEnum.SSendHelpSW, this, this.onSendHelpSW);
			//监听人物加点方案切换次数
			Network._instance.addHanlder(ProtocolsEnum.SReqPointSchemeTime, this, this.onReqPointSchemeTime);
			//监听角色盈福经验
			Network._instance.addHanlder(ProtocolsEnum.SApplyYingFuExprience, this, this.onApplyYingFuExprience);
			//使用称谓返回
			Network._instance.addHanlder(ProtocolsEnum.SOnTitle, this, this.onSOnTitle);
			//移除称谓返回
			Network._instance.addHanlder(ProtocolsEnum.SOffTitle, this, this.onSOffTitle);
			

		}

		/**移除监听 */
		private removeNetworkListener(): void {
			Network._instance.addHanlder(ProtocolsEnum.SRspRoleInfo, this, this.onRspRoleInfo);
			Network._instance.addHanlder(ProtocolsEnum.SBeginSchoolWheel, this, this.onBeginSchoolWheel);
			Network._instance.addHanlder(ProtocolsEnum.SRefreshPointType, this, this.onRefreshDian);
			Network._instance.addHanlder(ProtocolsEnum.SLiveSkillMakeFarm, this, this.onLiveSkillMakeFarm);
			Network._instance.addHanlder(ProtocolsEnum.SLiveSkillMakeEnhancement, this, this.onLiveSkillMakeEnhancement);
			Network._instance.addHanlder(ProtocolsEnum.SQueryLimit, this, this.onQueryLimit);
			Network._instance.addHanlder(ProtocolsEnum.SReqHelpCountView, this, this.onReqHelpCountView);
			Network._instance.addHanlder(ProtocolsEnum.SSendHelpSW, this, this.onSendHelpSW);
			Network._instance.addHanlder(ProtocolsEnum.SReqPointSchemeTime, this, this.onReqPointSchemeTime);
			Network._instance.addHanlder(ProtocolsEnum.SApplyYingFuExprience, this, this.onApplyYingFuExprience);
		}
		/** 服务器返回佩戴的称号 */
		private onSOnTitle(optcode:number,msg:hanlder.S2C_on_title):void
		{
			let OnTitle =  new Laya.Dictionary;
			let roleTitle = new Laya.Dictionary;
			/** key 角色id value 称谓id */
			roleTitle.set(msg.roleid,msg.titleid);
			OnTitle.set("OnTitle",roleTitle);
			game.scene.models.SceneProxy.getInstance().event(game.scene.models.TEAM_STATE,OnTitle);
		}
		/** 服务器返回删除称谓 */
		private onSOffTitle(optcode:number,msg:hanlder.S2C_off_title):void
		{
			let OnTitle =  new Laya.Dictionary;
			let roleTitle = new Laya.Dictionary;
			/** key 角色id value 称谓id */
			roleTitle.set(msg.roleid,-1);
			OnTitle.set("OnTitle",roleTitle);
			game.scene.models.SceneProxy.getInstance().event(game.scene.models.TEAM_STATE,OnTitle);
		}
		/**服务器回复角色盈福经验 */
		public onApplyYingFuExprience(optcode: number, msg: hanlder.s2c_SApplyYingFuExprience): void {
			RoleInfoModel.getInstance().SApplyYingFuExprience = msg.exprience;
			RoleInfoProxy.getInstance().event(models.SApplyYingFuExprience_EVENT);
		}
		/**人物信息界面回复 */
		public onRspRoleInfo(optcode: number, msg: hanlder.S2C_SRspRoleInfo): void {
			RoleInfoModel.getInstance().SRspRoleInfoData.set("data",msg);
			RoleInfoProxy.getInstance().event(models.SRspRoleInfo_EVENT);
		}
		/**转盘开始 */
		public onBeginSchoolWheel(optcode: number, msg: hanlder.S2C_SBeginSchoolWheel): void {
			RoleInfoModel.getInstance().SBeginSchoolWheelData.set("data",msg);
			RoleInfoProxy.getInstance().event(models.SBeginSchoolWheel_EVENT);
		}

		/**刷新人物加点后的加点面板数值 */
		public onRefreshDian(optcode: number, msg: hanlder.s2c_SRefreshPointType): void {
			RoleInfoModel.getInstance().SRefreshPointTypeData.set("data",msg);
			RoleInfoProxy.getInstance().event(models.SRefreshPointType_EVENT);
		}

		/**打工赚钱返回 */
		public onLiveSkillMakeFarm(optcode: number, msg: hanlder.S2C_live_skillmakefarm): void {
			RoleInfoModel.getInstance().SLiveSkillMakeFarmData.set("data",msg);
			RoleInfoProxy.getInstance().event(models.SLiveSkillMakeFarm_EVENT, msg.addgold);
		}
		/**制作附魔道具返回 */
		public onLiveSkillMakeEnhancement(optcode: number, msg: hanlder.S2C_live_skillmakeenhancement): void {
			RoleInfoModel.getInstance().SLiveSkillMakeEnhancementData.set("data",msg);
			RoleInfoProxy.getInstance().event(models.SLiveSkillMakeEnhancement_EVENT);
		}
		/**商品限购次数查询 */
		public onQueryLimit(optcode: number, msg: hanlder.S2C_query_limit): void {
			RoleInfoModel.getInstance().SQueryLimitData.set("data",msg);
			RoleInfoProxy.getInstance().event(models.SQueryLimit_EVENT);
		}
		/**援助统计面板 */
		public onReqHelpCountView(optcode: number, msg: hanlder.S2C_SReqHelpCountView): void {
			RoleInfoModel.getInstance().SReqHelpCountViewData.set("data",msg);
			RoleInfoProxy.getInstance().event(models.SReqHelpCountView_EVENT);
		}
		/**援助声望当前值 */
		public onSendHelpSW(optcode: number, msg: hanlder.S2C_SSendHelpSW): void {
			RoleInfoModel.getInstance().SSendHelpSWData.set("data",msg);
			RoleInfoProxy.getInstance().event(models.SSendHelpSW_EVENT);
		}
		/**返回人物切换加点方案次数 */
		public onReqPointSchemeTime(optcode: number, msg: hanlder.S2C_SReqPointSchemeTime): void {
			RoleInfoModel.getInstance().SReqPointSchemeTimeData.set("data",msg);
			RoleInfoProxy.getInstance().event(models.SReqPointSchemeTime_EVENT);
		}
	}
}