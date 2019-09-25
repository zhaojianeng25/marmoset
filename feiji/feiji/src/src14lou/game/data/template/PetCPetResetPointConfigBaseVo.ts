/**
* name c宠物属性重置消耗
*/
module game.data.template{
	export class PetCPetResetPointConfigBaseVo{
		public id:number;//次数
		public cost:number;//消耗

		constructor(){

		}
		
		public parse(data:Byte){
			this.id = data.getUint32();
			this.cost = data.getUint32();
		}
	}
}