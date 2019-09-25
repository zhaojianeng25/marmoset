/**
* 食物
*/
module game.modules.strengThening.models {
	export class FoodVo {
		/**品质 */
		public quality: number;
		constructor() {
		}
		public fromByteArray(bytes: ByteArray): void {
			let head: number = ByteArrayUtils.uncompact_uint32(bytes);
			this.quality = bytes.readInt32();
		}
	}
}