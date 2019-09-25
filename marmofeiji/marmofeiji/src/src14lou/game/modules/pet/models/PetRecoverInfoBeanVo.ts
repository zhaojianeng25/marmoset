/**
* 宠物找回
*/
module game.modules.pet.models {
	export class PetRecoverInfoBeanVo {
		/**宠物id*/
		public petId: number;
		/**找回的id*/
		public uniqId: number;
		/**剩余找回时间*/
		public remainTime: number;
		/**花费多少*/
		public cost: number;
		constructor() {
		}
		public fromByteArray(bytes: ByteArray): void {
			this.petId = bytes.readInt32();
			this.uniqId = bytes.readLong();
			this.remainTime = bytes.readInt32();
			this.cost = bytes.readInt32();
		}
	}
}