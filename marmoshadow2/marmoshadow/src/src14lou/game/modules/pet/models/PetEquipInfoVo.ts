/**
* 宠物装备信息
*/
module game.modules.pet.models {
	export class PetEquipInfoVo {
		/**宠物装备信息 key为宠物装备key*/
		public petequipinfo: Laya.Dictionary
		constructor() {
			this.petequipinfo = new Laya.Dictionary();
		}
	}
}