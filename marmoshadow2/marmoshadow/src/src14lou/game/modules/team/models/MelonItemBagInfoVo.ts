/**
* name 
*/
module game.modules.team.models {
	export class MelonItemBagInfoVo {
		public itemkey: number;
		public bagid: number;
		constructor() {

		}
		public fromByteArray(bytes: ByteArray): void {
			this.itemkey = bytes.readInt32();
			this.bagid = bytes.readInt32();
		}
	}
}