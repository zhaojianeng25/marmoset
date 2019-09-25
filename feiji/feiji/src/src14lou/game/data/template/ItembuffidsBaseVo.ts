/**
* name 
*/
module game.data.template {
	export class ItembuffidsBaseVo {
		public id: number;
		public buffids: Array<number>;
		constructor() {

		}
		public parse(data: Byte) {
			this.id = data.getUint32();
			let buffidsLength: number = data.getUint32();
			this.buffids = [];
			for (var index = 0; index < buffidsLength; index++) {
				this.buffids.push(data.getUint32());
			}
		}
	}
}