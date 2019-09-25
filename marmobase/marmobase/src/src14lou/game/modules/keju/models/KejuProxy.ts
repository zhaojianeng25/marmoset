/**
* name 
*/
/** 操作答题确认 */
enum OpAnswer {
	/** 愿意参加 */
	WillingAttend = 0,
	/** 放弃参加 */
	GiveUp = 1,
}
module game.modules.keju.models {
	/** 进入游戏的时候发起的确认答题框 */
	export const CONFIRM_IMP_EXAM: string = "confirm_impexam";
	/** 开始考试 */
	export const START_IMP_EXAM: string = "start_impexam";
	/** 结束考试 */
	export const OVER_IMP_EXAM: string = "over_impexam";
	/** 使用道具删除错误题目 */
	export const PROP_DELETE_TOPIC: string = "prop_delete_topic";

	export class KejuProxy extends hanlder.ProxyBase {
		constructor() {
			super();
			KejuProxy._instance = this;
			this.init();
		}

		public init(): void {
			this.addNetworkListener();
			Laya.loader.load("common/data/temp/game.wisdomtrialprov.bin", Handler.create(this, this.onloadedWisdomtrialProvComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/game.wisdomtrialstate.bin", Handler.create(this, this.onloadedWisdomtrialStateComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/game.wisdomtrialvill.bin", Handler.create(this, this.onloadedWisdomtrialVillComplete), null, Loader.BUFFER);

		}
		private addNetworkListener() {
			Network._instance.addHanlder(ProtocolsEnum.SAttendImpExam, this, this.onSAttendImpExam);
			Network._instance.addHanlder(ProtocolsEnum.SSendImpExamVill, this, this.onSSendImpExamVill);
			Network._instance.addHanlder(ProtocolsEnum.SSendImpExamProv, this, this.onSSendImpExamProv);
			Network._instance.addHanlder(ProtocolsEnum.SImpExamHelp, this, this.onSImpExamHelp);
			Network._instance.addHanlder(ProtocolsEnum.SSendImpExamState, this, this.onSSendImpExamState);
			Network._instance.addHanlder(ProtocolsEnum.SSendImpExamStart, this, this.onSSendImpExamStart);
			Network._instance.addHanlder(ProtocolsEnum.SSendImpExamAssist, this, this.onSSendImpExamAssist);

		}
		/** 殿试考试确认 */
		private onSSendImpExamStart(optcode: number, msg: hanlder.S2C_send_impexamstart): void {
			KejuModel.getInstance().impexamtype = msg.impexamtype;
			this.event(CONFIRM_IMP_EXAM, KejuModel.getInstance().impexamtype);
		}
		/** 删除科举错误题目 */
		private onSSendImpExamAssist(optcode: number, msg: hanlder.S2C_send_impexamassist): void {
			KejuModel.getInstance().assisttype = msg.assisttype;		//协助类型
			this.event(PROP_DELETE_TOPIC);
		}
		/** 寻求帮助 */
		private onSImpExamHelp(optcode: number, msg: hanlder.S2C_imp_examhelp): void {
			KejuModel.getInstance().helpcnt = msg.helpcnt;
		}
		/** 乡试题目 */
		private onSSendImpExamVill(optcode: number, msg: hanlder.S2C_send_impexamvill): void {
			if (msg.isover == 0) {/** 没结束 */
				KejuModel.getInstance().ExamVill.set(msg.impexamdata.questionnum, msg);
				this.event(START_IMP_EXAM);
			} else this.event(OVER_IMP_EXAM, msg.impexamdata.lastright);
		}
		/** 会试题目 */
		private onSSendImpExamProv(optcode: number, msg: hanlder.S2C_send_impexamprov): void {
			if (msg.lost == 0) {
				KejuModel.getInstance().ExamProv.set(msg.impexamdata.questionnum, msg);
				if (KejuModel.getInstance().assisttype != -1) KejuModel.getInstance().assisttype = -1;
				this.event(START_IMP_EXAM);
			} else this.event(OVER_IMP_EXAM, msg.impexamdata.lastright);
		}
		private onSSendImpExamState(optcode: number, msg: hanlder.S2C_send_impexamstate): void {
			if (msg.lost == 0) {
				KejuModel.getInstance().ExamState.set(msg.impexamdata.questionnum, msg);
				this.event(START_IMP_EXAM);
			} else this.event(OVER_IMP_EXAM, msg.impexamdata.lastright);
		}
		/** 监听科举是否开启 */
		private onSAttendImpExam(optcode: number, msg: hanlder.S2C_attend_impexam): void {
			KejuModel.getInstance().impexamtype = msg.impexamtype;
			game.modules.activity.models.ActivityProxy._instance.event(game.modules.activity.models.TUISONG_EVENT);
			// /** 事件监听 */
			// this.event(CONFIRM_IMP_EXAM,KejuModel.getInstance().impexamtype);

		}
		/** 会试表 */
		onloadedWisdomtrialProvComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/game.wisdomtrialprov.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, KejuModel.getInstance().wisdomtrialProvData, WisdomTrialVillBaseVo, "id");
		}
		/** 殿试表 */
		onloadedWisdomtrialStateComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/game.wisdomtrialstate.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, KejuModel.getInstance().wisdomtrialStateData, WisdomTrialVillBaseVo, "id");
		}
		/** 乡试表 */
		onloadedWisdomtrialVillComplete(): void {
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/game.wisdomtrialvill.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, KejuModel.getInstance().wisdomtrialVillData, WisdomTrialVillBaseVo, "id");
		}

		private static _instance: KejuProxy;
		public static getInstance(): KejuProxy {
			if (!this._instance) {
				this._instance = new KejuProxy();
			}
			return this._instance;
		}
	}
}