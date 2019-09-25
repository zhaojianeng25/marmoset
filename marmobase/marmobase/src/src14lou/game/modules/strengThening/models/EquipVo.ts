/**
* 装备tips 
*/
module game.modules.strengThening.models {
	export class EquipVo {
		/**背包id */
		public packid: number;
		/**物品的key */
		public keyinpack: number;
		/**tips */
		public tips: Object = {};
		constructor() {
		}
		public fromByteArray(bytes: ByteArray): void {
		}
	}
}