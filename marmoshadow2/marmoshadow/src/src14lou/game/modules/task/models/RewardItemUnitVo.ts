/**
* 奖励列表
*/
module game.modules.task.models {
	export class RewardItemUnitVo {
		/**奖励id*/
		public baseid: number;
		/**奖励数量*/
		public num: number;
		constructor() {
		}
		public fromByteArray(bytes: ByteArray): void {
			this.baseid = bytes.readInt32();
			this.num = bytes.readInt32();
		}
	}
}