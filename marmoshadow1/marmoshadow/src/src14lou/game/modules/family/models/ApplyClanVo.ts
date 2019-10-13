/**
* 角色申请公会状态 
*/
module game.modules.family.models {
	export class ApplyClanVo {
		/**公会key */
		public clankey: number;
		/**申请状态 0取消  1申请中 */
		public applystate: number;

		constructor() {

		}
		public fromByteArray(bytes: ByteArray): void {
			this.clankey = bytes.readLong();
			this.applystate = bytes.readInt32();

		}
	}
}