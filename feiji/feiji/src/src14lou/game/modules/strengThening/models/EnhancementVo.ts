/**
* name 附魔
*/
module game.modules.strengThening.models {
	export class EnhancementVo {
		/**等级 */
		public level: number;
		constructor() {
		}
		public fromByteArray(bytes: ByteArray): void {
			let head: number = ByteArrayUtils.uncompact_uint32(bytes);
			this.level = bytes.readInt32();

		}
	}
}