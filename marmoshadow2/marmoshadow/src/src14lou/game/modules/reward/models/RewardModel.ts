module game.modules.reward.models {
	export class RewardModel {
		/** 签到奖励 */
		public qianDaoJiangLiBinDic: Object = {};	
		/** 首充奖励*/
		public shouChongLiBaoBinDic: Object = {};		
		/** 月卡奖励 */
		public monthCardConfigBinDic: Object = {};	
		/** 七日签到 */
		public loginawardBinDic: Object = {};		
		/** 新手奖励 */
		public onLineGiftBinDic: Object = {};		
		/** 升级礼包 */
		public presentConfigBinDic: Object = {};	
		/** 手机绑定 */
		public bindTelAwardBinDic: Object = {};		
		/** 升级礼包通过角色赋值 */ 
		public presentConfigBinDicAtDutyallow: Laya.Dictionary = new Laya.Dictionary;
		/** 每日签到数据 */
		public regData: RegDataVo;
		/** vip数据 */
		public vipInfo: VipInfoVo;
		/** 月卡数据 */
		public monthCard: MonthCardVo;
		/** 七日签到数据 */
		public mulDayLogin: MulDayLoginVo;
		/** 手机绑定信息 */
		public bindTel: BindTelVo;
		/** 手机绑定奖励领取 */
		public status: number;
		/** 手机关联状态 */
		public bindTelStatus: number;
		public bindTelTime: number;
		/** 验证码时间 */
		public finishTimePoint: number;
		/** 首充奖励领取状态 */
		public state: number;
		/** 新手礼包id */
		public awardid: number;
		/** 新手礼包奖励领取时间 */
		public endtime: number;
		/**红点状态map */
		public pointDic: Laya.Dictionary = new Laya.Dictionary;
		public rewardType: Laya.Dictionary = new Laya.Dictionary;
		constructor() {
			RewardModel._instance = this;
			// RewardProxy.getInstance();
			var rewardName: Array<string> = ["每日签到", "贵礼包", "月卡奖励", "七日签到", "新手奖励", "手机关联", "升级礼包"];
			var skinArr: Array<any> = ["common/ui/reward/richang.png",
				"common/ui/reward/zuanshibao.png", "common/ui/reward/zuanshibao.png",
				"common/ui/reward/mingke.png", "common/ui/reward/zuanshdiai.png",
				"common/ui/reward/zuanshibao.png", "common/ui/reward/zuanshibao.png"];
			for (var i: number = 0; i < 7; i++) {
				let _rewardType = new RewardType();
				_rewardType.type = i;
				_rewardType.isShow = 1;
				_rewardType.name = rewardName[i];
				_rewardType.skin = skinArr[i];
				this.rewardType.set(i, _rewardType);
				this.pointDic.set(i, 0);
			}
		}
		public static _instance: RewardModel;
		public static getInstance(): RewardModel {
			if (!this._instance) {
				this._instance = new RewardModel();
			}
			return this._instance;
		}
		public static clearModelData(): void {
			reward.models.RewardModel._instance.regData = new RegDataVo();
			reward.models.RewardModel._instance.vipInfo = new VipInfoVo();
			reward.models.RewardModel._instance.monthCard = new MonthCardVo();
			reward.models.RewardModel._instance.mulDayLogin = new MulDayLoginVo();
			reward.models.RewardModel._instance.bindTel = new BindTelVo();
			reward.models.RewardModel._instance.status = 0;
			reward.models.RewardModel._instance.bindTelStatus = 0;
			reward.models.RewardModel._instance.bindTelTime = 0;
			reward.models.RewardModel._instance.finishTimePoint = 0;
			reward.models.RewardModel._instance.state = 0;
			reward.models.RewardModel._instance.awardid = 0;
			reward.models.RewardModel._instance.endtime = 0;
			reward.models.RewardModel._instance.pointDic = new Laya.Dictionary();
		}
	}
}