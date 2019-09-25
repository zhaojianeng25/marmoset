/**
* 宠物基础属性 
*/
module game.modules.pet.models {
	export class BasicFightPropertiesVo {
		/**体质*/
		public cons: number;
		/**智力*/
		public iq: number;
		/**力量*/
		public str: number;
		/**耐力*/
		public endu: number;
		/**速度*/
		public agi: number;
		constructor() {
		}
		public fromByteArray(bytes: ByteArray): void {
			this.cons = bytes.readInt16();
			this.iq = bytes.readInt16();
			this.str = bytes.readInt16();
			this.endu = bytes.readInt16();
			this.agi = bytes.readInt16();
		}
	}
}