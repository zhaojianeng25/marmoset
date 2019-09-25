/**
*宠物技能
*/
module game.modules.pet.models {
	export class PetSkillVo {
		/**技能id*/
		public skillId: number;
		/**技能经验*/
		public skillexp: number;
		/**0=先天技能，1=打书学习*/
		public skilltype: number;
		/**0=未认证，1=认证*/
		public certification: number;
		constructor() {
		}
		public fromByteArray(bytes: ByteArray): void {
			this.skillId = bytes.readInt32();
			this.skillexp = bytes.readInt32();
			this.skilltype = bytes.readByte();
			this.certification = bytes.readByte();
		}
	}
}