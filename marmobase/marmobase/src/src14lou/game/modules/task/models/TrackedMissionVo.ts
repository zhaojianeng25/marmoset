/**
* 可接任务信息
*/
module game.modules.task.models {
	export class TrackedMissionVo {
		/**任务id*/
		public acceptdate: number;
		constructor() {
		}
		public fromByteArray(bytes: ByteArray): void {
			this.acceptdate = bytes.readLong();
		}
	}
}