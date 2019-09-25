/**
* name 
*/
module game.data.template {
	export class FightDrugTypeBaseVo {
		public id: number; //编号id
		public typeid: number; //战斗中使用类型
		constructor() {

		}
		public parse(data: Byte) {
			this.id = data.getUint32();
			this.typeid = data.getUint32();
		}
	}
}