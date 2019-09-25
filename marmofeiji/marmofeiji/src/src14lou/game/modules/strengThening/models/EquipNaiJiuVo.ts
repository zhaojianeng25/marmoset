/**
* 装备耐久度 
*/
module game.modules.strengThening.models {
	export class EquipNaiJiuVo {
		/**物品key */
		public keyinpack: number;
		/**耐久度 */
		public endure: number;
		constructor() {
		}
		public fromByteArray(bytes: ByteArray): void {
			this.keyinpack = bytes.readUint32();
			this.endure = bytes.readUint32();
		}
	}
}