/**
* name 
*/
module game.modules.reward.models {
	/**每日签到信息*/
	export const REGDATA_EVENT: string = "regDataEvent";
	/**月卡信息*/
	export const MONTH_EVENT: string = "monthEvent";
	/**vip奖励领取状态*/
	export const VIP_EVENT: string = "vipEvent";
	/**七日签到领取*/
	export const MULDAY_EVENT: string = "mulDayEvent";
	/**领取手机关联奖励*/
	export const GETBINDTEL_EVENT: string = "getBindTelEvent";
	export const BINDTELAWARD_EVENT: string = "bindTelAwardEvent";
	export const BINDTEL_EVENT: string = "bindTelEvent";
	/**手机验证码*/
	export const FINISHTIME_EVENT: string = "finishTimePointEvent";
	/**首充领取状态*/
	export const STATE_EVENT: string = "stateEvent";
	/**新手奖励事件*/
	export const TIMEAWARD_EVENT: string = "timeArardEvent";
	/**新手礼包红点*/
	export const NEWPLAYERPOINT_EVENT: string = "newplayerPoint";
	/**新手礼包领取 */
	export const NEWPLAYERGET_EVENT: string = "newplayerGet";
	/**每日签到领取 */
	export const EVERYDAY_EVENT: string = "everyDay";
	/**七日签到领取*/
	export const SEVENDAY_EVENT: string = "sevenDay";
	/**奖励系统红点 */
	export const REWARDPOINT_EVENT: string = "rewardPoint";
	/**升级礼包领取 */
	export const LEVELUP_EVENT: string = "levelup";
	export const REFRESH: string = "refresh";
	export class RewardProxy extends hanlder.ProxyBase {
		/**新手奖励领取倒计时 */
		private newplayerTime: number;
		constructor() {
			super();
			RewardProxy._instance = this;
			this.init();
		}
		public static _instance: RewardProxy;
		public static getInstance(): RewardProxy {
			if (!this._instance) {
				this._instance = new RewardProxy();
			}
			return this._instance;
		}

		public init(): void {
			RewardModel.getInstance();
			this.addNetworkListener();
			//每日签到
			Laya.loader.load("common/data/temp/game.cqiandaojiangli.bin", Handler.create(this, this.onloadedQianDaoJiangLiComplete), null, Loader.BUFFER);
			//首充礼包
			Laya.loader.load("common/data/temp/game.cshouchonglibao.bin", Handler.create(this, this.onloadedShouChongLiBaoComplete), null, Loader.BUFFER);
			//月卡奖励
			Laya.loader.load("common/data/temp/fushi.cmonthcardconfig.bin", Handler.create(this, this.onloadedMonthCardConfigComplete), null, Loader.BUFFER);
			//七日签到
			Laya.loader.load("common/data/temp/game.cloginaward.bin", Handler.create(this, this.onloadedLoginAwardComplete), null, Loader.BUFFER);
			//新手奖励
			Laya.loader.load("common/data/temp/item.conlinegift.bin", Handler.create(this, this.onloadedOnLineGiftComplete), null, Loader.BUFFER);
			//升级大礼包
			Laya.loader.load("common/data/temp/item.cpresentconfig.bin", Handler.create(this, this.onloadedPresentConfigComplete), null, Loader.BUFFER);
			//手机绑定
			Laya.loader.load("common/data/temp/game.cbindtelaward.bin", Handler.create(this, this.onloadedBindTelAwardComplete), null, Loader.BUFFER);
		}
		onloadedBindTelAwardComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/game.cbindtelaward.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, RewardModel._instance.bindTelAwardBinDic, game.data.template.BindTelAwardBaseVo, "id");
			// console.log("onloadedBindTelAwardComplete:",RewardModel._instance.bindTelAwardBinDic);
		}
		onloadedPresentConfigComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cpresentconfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, RewardModel._instance.presentConfigBinDic, game.data.template.PresentConfigBaseVo, "id");
			data.pos = 0;
			size = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillMap(data, size, RewardModel._instance.presentConfigBinDicAtDutyallow, game.data.template.PresentConfigBaseVo, "dutyallow");
			console.log("presentConfigBinDicAtDutyallow:", RewardModel._instance.presentConfigBinDicAtDutyallow);
		}
		onloadedOnLineGiftComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.conlinegift.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, RewardModel._instance.onLineGiftBinDic, game.data.template.OnLineGiftBaseVo, "id");
			// console.log("onloadedOnLineGiftComplete:",RewardModel._instance.onLineGiftBinDic);
		}
		onloadedLoginAwardComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/game.cloginaward.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, RewardModel._instance.loginawardBinDic, game.data.template.CloginawardBaseVo, "id");
			// console.log("onloadedLoginAwardComplete:",RewardModel._instance.loginawardBinDic);
		}
		onloadedMonthCardConfigComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cmonthcardconfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, RewardModel._instance.monthCardConfigBinDic, game.data.template.MonthCardConfigBaseVo, "id");
			// console.log("onloadedMonthCardConfigComplete:",RewardModel._instance.monthCardConfigBinDic);
		}
		onloadedShouChongLiBaoComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/game.cshouchonglibao.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, RewardModel._instance.shouChongLiBaoBinDic, game.data.template.CshouchonglibaoBaseVo, "id");
			// console.log("onloadedShouchonglibaoComplete:",RewardModel._instance.shouChongLiBaoBinDic);
		}
		onloadedQianDaoJiangLiComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/game.cqiandaojiangli.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, RewardModel._instance.qianDaoJiangLiBinDic, game.data.template.CqiandaojiangliBaseVo, "id");
			// console.log("onloadedQianDaoJiangLiComplete:",RewardModel._instance.qianDaoJiangLiBinDic);
		}
		// 添加监听
		private addNetworkListener(): void {
			Network._instance.addHanlder(ProtocolsEnum.SQueryRegData, this, this.onQueryRegData);
			Network._instance.addHanlder(ProtocolsEnum.SSendVipInfo, this, this.onSendVipInfo);
			Network._instance.addHanlder(ProtocolsEnum.SMonthCard, this, this.onMonthCard);
			Network._instance.addHanlder(ProtocolsEnum.SMulDayLogin, this, this.onMulDayLogin);
			Network._instance.addHanlder(ProtocolsEnum.SGetBindTel, this, this.onGetBindTel);
			Network._instance.addHanlder(ProtocolsEnum.SGetBindTelAward, this, this.onGetBindTelAward);
			Network._instance.addHanlder(ProtocolsEnum.SBindTel, this, this.onBindTel);
			Network._instance.addHanlder(ProtocolsEnum.SCheckCodeFinishTime, this, this.onCheckCodeFinishTime);
			Network._instance.addHanlder(ProtocolsEnum.SRefreshChargeState, this, this.onRefreshChargeState);
			Network._instance.addHanlder(ProtocolsEnum.SGetTimeAward, this, this.onGetTimeAward);
		}
		// 移除监听
		private removeNetworkListener(): void {
			Network._instance.removeHanlder(ProtocolsEnum.SQueryRegData, this, this.onQueryRegData);
			Network._instance.removeHanlder(ProtocolsEnum.SSendVipInfo, this, this.onSendVipInfo);
			Network._instance.removeHanlder(ProtocolsEnum.SMonthCard, this, this.onMonthCard);
			Network._instance.removeHanlder(ProtocolsEnum.SMulDayLogin, this, this.onMulDayLogin);
			Network._instance.removeHanlder(ProtocolsEnum.SGetBindTel, this, this.onGetBindTel);
			Network._instance.removeHanlder(ProtocolsEnum.SGetBindTelAward, this, this.onGetBindTelAward);
			Network._instance.removeHanlder(ProtocolsEnum.SBindTel, this, this.onBindTel);
			Network._instance.removeHanlder(ProtocolsEnum.SCheckCodeFinishTime, this, this.onCheckCodeFinishTime);
			Network._instance.removeHanlder(ProtocolsEnum.SRefreshChargeState, this, this.onRefreshChargeState);
			Network._instance.removeHanlder(ProtocolsEnum.SGetTimeAward, this, this.onGetTimeAward);
		}
		private onGetTimeAward(optcode: number, msg: hanlder.S2C_SGetTime_Award): void {
			var date = new Date();
			RewardModel.getInstance().awardid = msg.awardid;
			RewardModel.getInstance().endtime = date.getTime() + msg.waittime;
			this.newplayerTime = msg.waittime;
			if (msg.waittime == 0) {
				RewardModel.getInstance().pointDic.set(4, 1);
				RewardProxy.getInstance().event(models.NEWPLAYERPOINT_EVENT);//发送新手礼包红点事件
			}
			else {
				Laya.timer.loop(1000, this, this.onLoop);
			}
			if (msg.awardid == -1) {
				RewardProxy.getInstance().event(models.REFRESH);
			} else {
				RewardProxy.getInstance().event(models.TIMEAWARD_EVENT);
			}
		}
		/**奖励领取定时器 */
		public onLoop(): void {
			this.newplayerTime -= 1000;
			if (this.newplayerTime <= 0) {
				RewardModel.getInstance().pointDic.set(4, 1);
				RewardProxy.getInstance().event(models.NEWPLAYERPOINT_EVENT);//发送新手礼包红点事件
				Laya.timer.clear(this, this.onLoop);
			}
		}
		private onRefreshChargeState(optcode: number, msg: hanlder.S2C_SRefreshChargeState): void {
			RewardModel.getInstance().state = msg.state;
			console.log("---------首充奖励领取状态：", msg.state);
			RewardProxy.getInstance().event(models.STATE_EVENT);
		}
		private onCheckCodeFinishTime(optcode: number, msg: hanlder.S2C_SCheckCodeFinishTime): void {
			RewardModel.getInstance().finishTimePoint = msg.finishTimePoint;
			console.log("-------验证码---", msg.finishTimePoint);
			RewardProxy.getInstance().event(models.FINISHTIME_EVENT);
		}
		private onBindTel(optcode: number, msg: hanlder.S2C_SBindTel): void {
			RewardModel.getInstance().bindTelStatus = msg.status;
			RewardModel.getInstance().bindTelTime = msg.bindTelTime;
			console.log("-------手机奖励相关1---", msg.status);
			RewardProxy.getInstance().event(models.BINDTEL_EVENT);
		}
		private onGetBindTelAward(optcode: number, msg: hanlder.S2C_SGetBindTelAward): void {
			RewardModel.getInstance().status = msg.status;
			console.log("-------手机奖励相关2---", msg.status);
			RewardProxy.getInstance().event(models.BINDTELAWARD_EVENT);
		}
		private onGetBindTel(optcode: number, msg: hanlder.S2C_SGetBindTel): void {
			let bindTel: BindTelVo = new BindTelVo();
			bindTel.tel = msg.tel;
			bindTel.createDate = msg.createDate;
			bindTel.isFistLoginOfDay = msg.isFistLoginOfDay;
			bindTel.isGetBindTelAward = msg.isGetBindTelAward;
			bindTel.isBindTelAgain = msg.isBindTelAgain;
			bindTel.bindTelTime = msg.bindTelTime;
			console.log("-------手机绑定相关1", msg.tel);
			console.log("-------手机绑定相关2", msg.createDate);
			console.log("-------手机绑定相关3", msg.isFistLoginOfDay);
			console.log("-------手机绑定相关4", msg.isGetBindTelAward);
			console.log("-------手机绑定相关5", msg.isBindTelAgain);
			console.log("-------手机绑定相关6", msg.bindTelTime);

			RewardModel.getInstance().bindTel = bindTel;
			RewardProxy.getInstance().event(models.GETBINDTEL_EVENT);
		}
		private onMulDayLogin(optcode: number, msg: hanlder.S2C_SMulDayLogin): void {
			let mulDayLogin: MulDayLoginVo = new MulDayLoginVo();
			mulDayLogin.logindays = msg.logindays;
			mulDayLogin.rewardmap = msg.rewardmap;
			console.log("-------------七日签到累积登陆天数", mulDayLogin.logindays);
			console.log("-------------七日签到累积登陆map:", mulDayLogin.rewardmap);
			//根据奖励领取情况判断是否取消红点
			for (var i: number = 0; i < 8; i++) {
				if (msg.rewardmap.get(i) == 0) {
					RewardModel.getInstance().pointDic.set(3, 1);
					break;
				} else
					RewardModel.getInstance().pointDic.set(3, 0);
			}
			var key = RewardModel.getInstance().pointDic.get(3);
			if (key != 1) {
				RewardProxy.getInstance().event(models.SEVENDAY_EVENT);
			}
			RewardModel.getInstance().mulDayLogin = mulDayLogin;
			RewardProxy.getInstance().event(models.MULDAY_EVENT);
		}
		private onMonthCard(optcode: number, msg: hanlder.S2C_SMonthCard): void {
			let monthCard: MonthCardVo = new MonthCardVo();
			monthCard.endtime = msg.endtime;
			monthCard.grab = msg.grab;
			console.log("-------月卡msg.endtime", msg.endtime);
			console.log("-------月卡msg.grab", msg.grab);
			RewardModel.getInstance().monthCard = monthCard;
			RewardProxy.getInstance().event(models.MONTH_EVENT);
		}
		private onSendVipInfo(optcode: number, msg: hanlder.S2C_SSendVipInfo): void {
			let vipInfo: VipInfoVo = new VipInfoVo();
			vipInfo.vipexp = msg.vipexp;
			vipInfo.viplevel = msg.viplevel;
			vipInfo.bounus = msg.bounus;
			vipInfo.gotbounus = msg.gotbounus;
			vipInfo.viprights = msg.viprights;
			console.log("-------------vip相关-可领奖励:", vipInfo);
			console.log("-------------vip相关-可领奖励:", msg.bounus);
			console.log("-------------vip相关-已领奖励:", msg.gotbounus);

			RewardModel.getInstance().vipInfo = vipInfo;
			RewardProxy.getInstance().event(models.VIP_EVENT);
		}
		public onQueryRegData(optcode: number, msg: hanlder.s2c_SQueryRegData): void {
			let regData: RegDataVo = new RegDataVo();
			regData.month = msg.month;
			regData.times = msg.times;
			regData.suppregtimes = msg.suppregtimes;
			regData.cansuppregtimes = msg.cansuppregtimes;
			regData.suppregdays = msg.suppregdays;
			regData.rewardflag = msg.rewardflag;
			/**每日签到 */
			if (msg.rewardflag == 0) {
				RewardModel.getInstance().pointDic.set(0, 1);
			}
			RewardModel.getInstance().regData = regData;
			RewardProxy.getInstance().event(models.REGDATA_EVENT);
		}
	}
}