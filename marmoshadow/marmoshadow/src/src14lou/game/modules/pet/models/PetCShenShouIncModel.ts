/**
*神兽提升
*/
module game.modules.pet.models {
	export class PetCShenShouIncModel {
		/**属性ID*/
		public id: number;
		/**宠物id*/
		public petid: number;
		/**提升次数*/
		public inccount: number;
		/**成长提升*/
		public attinc: number;
		/**攻击资质提升*/
		public atkinc: number;
		/**防御资质提升*/
		public definc: number;
		/**体力资质提升*/
		public hpinc: number;
		/**法力资质提升*/
		public mpinc: number;
		/**速度资质提升*/
		public spdinc: number;
		/**提升等级*/
		public inclv: number;
		/**神兽提升表*/
		public petCShenShouIncData: Object = {};
		constructor() {
			PetCShenShouIncModel._instance = this;
		}
		public static _instance: PetCShenShouIncModel;
		public static getInstance(): PetCShenShouIncModel {
			if (!this._instance) {
				this._instance = new PetCShenShouIncModel();
			}
			return this._instance;
		}
	}
}