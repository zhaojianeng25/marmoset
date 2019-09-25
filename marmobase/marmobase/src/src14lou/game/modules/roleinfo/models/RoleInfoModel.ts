
module game.modules.roleinfo.models{
	/** 角色系统数据存放类 */
	export class RoleInfoModel{
		/**x洗点道具配置表 */
		public addPointResetItemConfigBinDic:Object = {};
		/**s升级经验限制表 */
		public CResMoneyConfigBinDic:Object = {};
		/**y一级属性转换表 */
		public CAttrModDataBinDic:Object = {};
		/**NPCMT3买卖物品表 */
		public CNpcSaleBinDic:Object = {};
		/**z职业转盘表 */
		public CSchoolWheelBinDic:Object = {};
		/**人物称谓表 */
		public CRoleTitleBinDic:Object = {};
		/**j加点方案切换消耗 */
		public CaddpointchangeDic:Object = {};
		/**刷新人物加点后的加点面板数值字典key:"data",value:服务器返回的信息  */
		public SRefreshPointTypeData:Laya.Dictionary;
		/**人物信息界面回复字典key:"data",value:服务器返回的信息  */
		public SRspRoleInfoData:Laya.Dictionary;
		/**转盘开始字典key:"data",value:服务器返回的信息  */
		public SBeginSchoolWheelData:Laya.Dictionary;
		/**打工赚钱返回字典key:"data",value:服务器返回的信息  */
		public SLiveSkillMakeFarmData:Laya.Dictionary;
		/**制作附魔道具返回字典key:"data",value:服务器返回的信息  */
		public SLiveSkillMakeEnhancementData:Laya.Dictionary;
		/**商品限购次数查询字典key:"data",value:服务器返回的信息  */
		public SQueryLimitData:Laya.Dictionary;
		/**援助统计面板字典key:"data",value:服务器返回的信息  */
		public SReqHelpCountViewData:Laya.Dictionary;
		/**援助声望当前值字典key:"data",value:服务器返回的信息  */
		public SSendHelpSWData:Laya.Dictionary;
		/**返回人物切换加点方案次数字典key:"data",value:服务器返回的信息  */
		public SReqPointSchemeTimeData:Laya.Dictionary;
		/**服务器回复角色盈福经验字典key:"data",value:服务器返回的信息  */
		public SApplyYingFuExprience:number;
		/** 战斗中人物的属性发生改变 */
		public battleRoleAttr:Laya.Dictionary = new Laya.Dictionary;
		public appBase:AppBase;
		/**当前页码 */
		public currentKey:number=1;
		constructor(){
			RoleInfoModel._instance = this;
			this.SRefreshPointTypeData = new Laya.Dictionary();
			this.SRspRoleInfoData = new Laya.Dictionary();
			this.SBeginSchoolWheelData = new Laya.Dictionary();
			this.SLiveSkillMakeFarmData = new Laya.Dictionary();
			this.SLiveSkillMakeEnhancementData = new Laya.Dictionary();
			this.SQueryLimitData = new Laya.Dictionary();
			this.SReqHelpCountViewData = new Laya.Dictionary();
			this.SSendHelpSWData = new Laya.Dictionary();
			this.SReqPointSchemeTimeData = new Laya.Dictionary();
		}
		private static _instance:RoleInfoModel;
		public static getInstance():RoleInfoModel {
			if(!this._instance) {
				this._instance = new RoleInfoModel();
			}
			return this._instance;
		}
		public static clearModelData(): void {
			roleinfo.models.RoleInfoModel._instance.SRefreshPointTypeData = new Laya.Dictionary();
			roleinfo.models.RoleInfoModel._instance.SRspRoleInfoData = new Laya.Dictionary();
			roleinfo.models.RoleInfoModel._instance.SBeginSchoolWheelData = new Laya.Dictionary();
			roleinfo.models.RoleInfoModel._instance.SLiveSkillMakeFarmData = new Laya.Dictionary();
			roleinfo.models.RoleInfoModel._instance.SLiveSkillMakeEnhancementData = new Laya.Dictionary();
			roleinfo.models.RoleInfoModel._instance.SQueryLimitData = new Laya.Dictionary();
			roleinfo.models.RoleInfoModel._instance.SReqHelpCountViewData = new Laya.Dictionary();
			roleinfo.models.RoleInfoModel._instance.SSendHelpSWData = new Laya.Dictionary();
			roleinfo.models.RoleInfoModel._instance.SReqPointSchemeTimeData = new Laya.Dictionary();
			roleinfo.models.RoleInfoModel._instance.SApplyYingFuExprience = 0;
			roleinfo.models.RoleInfoModel._instance.battleRoleAttr = new Laya.Dictionary();
		}
		/** 获得职业图标路径 */
		public setZhiyeImg(school:number):string{
			let skinStr = "";
			switch(school){
				case zhiye.yunxiao:
					skinStr = "common/ui/tongyong/11.png";
					break;
				case zhiye.dahuang:
					skinStr = "common/ui/tongyong/12.png";
					break;
				case zhiye.cangyu:
					skinStr = "common/ui/tongyong/13.png";
					break;
				case zhiye.feixue:
					skinStr = "common/ui/tongyong/14.png";
					break;
				case zhiye.tianlei:
					skinStr = "common/ui/tongyong/15.png";
					break;
				case zhiye.wuliang:
					skinStr = "common/ui/tongyong/16.png";
					break;
				case zhiye.xuanming:
					skinStr = "common/ui/tongyong/17.png";
					break;
				case zhiye.qixing:
					skinStr = "common/ui/tongyong/18.png";
					break;
				case zhiye.danyang:
					skinStr = "common/ui/tongyong/19.png";
					break;
			}
			return skinStr;
		}

		/**中文字符串存放 */
		public static chineseStr ={
			/**消耗活力 */
			xiaohao_huoli:"消耗活力",
			/**打工（100金币） */
			dagong:"打工（100金币）",
			/**制作附魔卷轴 */
			fumo:"制作附魔卷轴",
			/**生活技能 */
			life_skill:"生活技能",
			/**打工 */
			dagong_btn:"打工",
			/**制作 */
			zhizuo_btn:"制作",
			/**加点方案1 */
			fangan_one:"加点方案-1",
			/**加点方案2 */
			fangan_two:"加点方案-2",
			/**加点方案3 */
			fangan_three:"加点方案-3",
			/**推荐加点 */
			tuijian_jiadian:"推荐加点",
			/**加点方案- */
			fangan:"加点方案-",
			/**未到开放等级 */
			unlock_level:"未到开发等级",
			/**生命提示 */
			life_tip:"增加体质点可以增加生命上限。战斗结束后可以从生命储备中自动补充至上限",
			/**魔法提示 */
			mofa_tip:"增加智力点可以增加魔法上限。战斗结束后可以从魔法储备中自动补充至上限",
			/**愤怒提示 */
			fennu_tip:"进入战斗最多可以带入70点愤怒",
			/**活力提示 */
			huoli_tip:"参加各种活动可以增长活跃度哦",
			/**物理攻击提示 */
			damage_tip:"增强物理攻击的效果",
			/**物理防御提示 */
			defend_tip:"降低收到物理攻击的效果",
			/**法术攻击提示 */
			magicattack_tip:"增强法术攻击的效果",
			/**法术防御提示 */
			magicdef_tip:"降低收到法术攻击的效果",
			/**速度提示 */
			speed_tip:"速度快的单位更早出手",
			/**治疗强度提示 */
			medical_tip:"增强治疗单位的效果",
			/**回 */
			hui:"回",
			/**物理暴击: */
			wuli_baoji:"物理暴击:",
			/**物理抗暴: */
			wuli_kangbao:"物理抗暴:",
			/**法术暴击: */
			fashu_baoji:"法术暴击:",
			/**法术抗暴: */
			fashu_kangbao:"法术抗暴:",
			/**治疗暴击: */
			zhiliao_baoji:"治疗暴击:",
			/**治疗加深: */
			zhiliao_jiashen:"治疗加深:",
			/**物理穿透: */
			wuli_chuantou:"物理穿透:",
			/**物理抵抗: */
			wuli_dikang:"物理抵抗:",
			/**法术穿透: */
			fashu_chuantou:"法术穿透:",
			/**法术抵抗: */
			fashu_dikang:"法术抵抗:",
			/**控制加成: */
			kongzhi_jiacheng:"控制加成:",
			/**控制免疫: */
			kongzhi_mianyi:"控制免疫:",
			/**控制命中: */
			kongzhi_mingzhong:"控制命中:",
			/**控制抗性: */
			kongzhi_kangxing:"控制抗性:",
			/**物理暴击提示 */
			wuli_baoji_tip:"提高物理攻击暴击的几率",
			/**物理抗暴提示 */
			wuli_kangbao_tip:"降低受到物理攻击暴击的几率",
			/**法术暴击提示 */
			fashu_baoji_tip:"提高法术攻击暴击的几率",
			/**法术抗暴提示 */
			fashu_kangbao_tip:"降低受到法术攻击暴击的几率",
			/**治疗暴击提示 */
			zhiliao_baoji_tip:"提高治疗时暴击的几率",
			/**治疗加深提示 */
			zhiliao_jiashen_tip:"增加治疗效果",
			/**物理穿透提示 */
			wuli_chuantou_tip:"提高物理攻击造成的伤害",
			/**物理抵抗提示 */
			wuli_dikang_tip:"降低物理攻击造成的伤害",
			/**法术穿透提示 */
			fashu_chuantou_tip:"提高法术攻击造成的伤害",
			/**法术抵抗提示 */
			fashu_dikang_tip:"降低法术攻击造成的伤害",
			/**控制加成提示 */
			kongzhi_jiacheng_tip:"提高控制技能的命中率",
			/**控制免疫提示 */
			kongzhi_mianyi_tip:"降低被技能控制的几率",
			/**控制命中提示 */
			kongzhi_mingzhong_tip:"增加控制命中率",
			/**控制抗性提示*/
			kongzhi_kangxing_tip:"降低受到控制的几率",

		}
	}
}