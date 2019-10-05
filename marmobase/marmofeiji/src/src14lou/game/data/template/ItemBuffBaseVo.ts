/**
* name 
*/
module game.data.template {
	export class ItemBuffBaseVo {
			public id:number;
			public monsterids:Array<number> //怪物id1,怪物id2,怪物id3,怪物id4,怪物id5,怪物id6,怪物id7,怪物id8,怪物id9,怪物id10"/>
			public msgid:number; //未命中提示号
		constructor() {

		}
		public parse(data: Byte) {
			this.id = data.getUint32();
			let monsteridsLength: number = data.getUint32();
			this.monsterids = [];
			for (var index = 0; index < monsteridsLength; index++) {
				this.monsterids.push(data.getUint32());
			}
			this.msgid = data.getUint32();
		}
	}
}