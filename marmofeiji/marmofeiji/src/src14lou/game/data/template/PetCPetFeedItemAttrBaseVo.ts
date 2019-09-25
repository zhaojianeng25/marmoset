/**
* name c宠物物品表
*/
module game.data.template{
	export class PetCPetFeedItemAttrBaseVo{
		public id:number;//编号	
		public addpetexp:number;//增加宠物经验
		public addpetlife:number;//增加宠物寿命

		constructor(){

		}
		
		public parse(data:Byte){
			this.id = data.getUint32();
			this.addpetexp = data.getUint32();
			this.addpetlife = data.getUint32();
		}
	}
}