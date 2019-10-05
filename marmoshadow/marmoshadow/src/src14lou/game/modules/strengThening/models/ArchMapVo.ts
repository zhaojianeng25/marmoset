/**
* 藏宝图的属性 
*/
module game.modules.strengThening.models {
	export class ArchMapVo {
		/**地图id */
		public mapId: number;
		/**坐标x*/
		public posX: number;
		/**坐标y */
		public posY: number;

		constructor() {

		}
		public fromByteArray(bytes: ByteArray): void {
			let head: number = ByteArrayUtils.uncompact_uint32(bytes);
			this.mapId = bytes.readInt32();
			this.posX = bytes.readInt32();
			this.posY = bytes.readInt32();
		}
	}
}