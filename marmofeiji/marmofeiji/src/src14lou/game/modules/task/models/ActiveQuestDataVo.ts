/**
* 任务信息
*/
module game.modules.task.models {
	export class ActiveQuestDataVo {
		/**任务ID*/
		public questid: number;
		/**任务状态*/
		public queststate: number;
		/**npckey*/
		public dstnpckey: number;
		/**npcid*/
		public dstnpcid: number;
		/**任务地图*/
		public dstmapid: number;
		/**任务坐标*/
		public dstx: number;
		/**任务坐标*/
		public dsty: number;
		/**任务道具ID*/
		public dstitemid: number;
		/**总环数*/
		public sumnum: number;
		/**NPC名字*/
		public npcName: String;
		/**经验奖励*/
		public rewardexp: number;
		/**银币奖励*/
		public rewardmoney: number;
		/**金币奖励*/
		public rewardsmoney: number;
		/**道具奖励*/
		public rewarditems: Array<RewardItemUnitVo>;
		constructor() {
		}
		public fromByteArray(bytes: ByteArray): void {
			this.questid = bytes.readInt32();
			this.queststate = bytes.readInt32();
			this.dstnpckey = bytes.readLong();
			this.dstnpcid = bytes.readUint32();
			this.dstmapid = bytes.readUint32();
			this.dstx = bytes.readInt32();
			this.dsty = bytes.readInt32();
			this.dstitemid = bytes.readInt32();
			this.sumnum = bytes.readInt32();
			this.npcName = ByteArrayUtils.readUtf16String(bytes);
			this.rewardexp = bytes.readLong();
			this.rewardmoney = bytes.readLong();
			this.rewardsmoney = bytes.readLong();
			this.rewarditems = [];
			let rewardsize = ByteArrayUtils.uncompact_uint32(bytes);
			for (var index = 0; index < rewardsize; index++) {
				let reward: RewardItemUnitVo = new RewardItemUnitVo();
				reward.fromByteArray(bytes);
				this.rewarditems.push(reward);
			}
		}
	}
}