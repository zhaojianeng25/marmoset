/**
* name 
*/
module game.modules.team.models {
	export class RollMelonVo {
		public melonid: number;
		public itemid: number;
		public itemnum: number;
		constructor() {

		}
		public fromByteArray(bytes: ByteArray): void {
			this.melonid = bytes.readLong();
			this.itemid = bytes.readInt32();
			this.itemnum = bytes.readInt32();
		}
	}
}